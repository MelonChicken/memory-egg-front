import { useEffect, useMemo, useRef, useState } from "react";
import { useEgg } from "../hooks/useEgg";
import { getMusicAsset } from "../assets/assetRegistry";
import "./MusicPlayer.css";

const MUSIC_DISPLAY_NAMES = {
  eternity_in_moments: "Eternity in Moments",
  gold_phenomenon: "Gold Phenomenon",
  mi_querido: "Mi Querido",
};

const PLAYER_SIZE = {
  width: 280,
  height: 280,
};

const PLAYER_MARGIN = 16;

function getMusicName(musicKey) {
  return MUSIC_DISPLAY_NAMES[musicKey] || "No music selected";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDefaultPosition() {
  return {
    x: Math.max(PLAYER_MARGIN, window.innerWidth - PLAYER_SIZE.width - PLAYER_MARGIN),
    y: Math.max(PLAYER_MARGIN, window.innerHeight - PLAYER_SIZE.height - PLAYER_MARGIN),
  };
}

function getSavedPosition() {
  const savedPosition = localStorage.getItem("memory_egg_music_player_position");

  if (!savedPosition) {
    return getDefaultPosition();
  }

  try {
    const parsed = JSON.parse(savedPosition);

    return {
      x: clamp(
        Number(parsed.x) || PLAYER_MARGIN,
        PLAYER_MARGIN,
        window.innerWidth - PLAYER_SIZE.width - PLAYER_MARGIN
      ),
      y: clamp(
        Number(parsed.y) || PLAYER_MARGIN,
        PLAYER_MARGIN,
        window.innerHeight - PLAYER_SIZE.height - PLAYER_MARGIN
      ),
    };
  } catch {
    return getDefaultPosition();
  }
}

export default function MusicPlayer() {
  const { egg, loading, reloadEgg } = useEgg();

  const audioRef = useRef(null);
  const dragStateRef = useRef(null);
  const movedDuringDragRef = useRef(false);

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("memory_egg_music_player_collapsed") === "true"
  );
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = Number(localStorage.getItem("memory_egg_music_volume"));
    return Number.isFinite(savedVolume) ? savedVolume : 0.6;
  });
  const [position, setPosition] = useState(getSavedPosition);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedMusicKey = egg?.selected_music || egg?.selectedMusic || null;

  const selectedMusicSrc = useMemo(() => {
    if (!selectedMusicKey) {
      return null;
    }

    return getMusicAsset(selectedMusicKey);
  }, [selectedMusicKey]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;
    }

    localStorage.setItem("memory_egg_music_volume", String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem(
      "memory_egg_music_player_collapsed",
      String(collapsed)
    );
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem(
      "memory_egg_music_player_position",
      JSON.stringify(position)
    );
  }, [position]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [selectedMusicSrc]);

  useEffect(() => {
    function handleInventoryOrEggUpdate() {
      reloadEgg().catch((error) => {
        console.warn("Failed to refresh music player egg state:", error);
      });
    }

    window.addEventListener("memory-egg:inventory-updated", handleInventoryOrEggUpdate);
    window.addEventListener("memory-egg:egg-updated", handleInventoryOrEggUpdate);

    return () => {
      window.removeEventListener(
        "memory-egg:inventory-updated",
        handleInventoryOrEggUpdate
      );
      window.removeEventListener("memory-egg:egg-updated", handleInventoryOrEggUpdate);
    };
  }, [reloadEgg]);

  useEffect(() => {
    function handleResize() {
      setPosition((currentPosition) => ({
        x: clamp(
          currentPosition.x,
          PLAYER_MARGIN,
          window.innerWidth - PLAYER_SIZE.width - PLAYER_MARGIN
        ),
        y: clamp(
          currentPosition.y,
          PLAYER_MARGIN,
          window.innerHeight - PLAYER_SIZE.height - PLAYER_MARGIN
        ),
      }));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handlePointerDown(event) {
    const interactiveElement = event.target.closest(
        "button, input, a, audio, label"
    );

    if (interactiveElement && !collapsed) {
        return;
    }

    movedDuringDragRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
        pointerId: event.pointerId,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        startX: position.x,
        startY: position.y,
    };
  }

  function handlePointerMove(event) {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const nextX = dragState.startX + event.clientX - dragState.startPointerX;
    const nextY = dragState.startY + event.clientY - dragState.startPointerY;

    const movedDistance =
      Math.abs(event.clientX - dragState.startPointerX) +
      Math.abs(event.clientY - dragState.startPointerY);

    if (movedDistance > 4) {
      movedDuringDragRef.current = true;
    }

    const collapsedSize = window.innerWidth <= 680 ? 46 : 52;
    const currentWidth = collapsed ? collapsedSize : PLAYER_SIZE.width;
    const currentHeight = collapsed ? collapsedSize : PLAYER_SIZE.height;

    setPosition({
      x: clamp(
        nextX,
        PLAYER_MARGIN,
        window.innerWidth - currentWidth - PLAYER_MARGIN
      ),
      y: clamp(
        nextY,
        PLAYER_MARGIN,
        window.innerHeight - currentHeight - PLAYER_MARGIN
      ),
    });
  }

  function handlePointerUp(event) {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
    }

    const wasMoved = movedDuringDragRef.current;

    dragStateRef.current = null;
    movedDuringDragRef.current = false;

    if (collapsed && !wasMoved) {
        setCollapsed(false);
    }
  }

  async function handleTogglePlay() {
    if (!selectedMusicSrc || !audioRef.current) {
      return;
    }

    try {
      setErrorMessage("");

      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
        return;
      }

      audioRef.current.volume = volume;
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.warn("Failed to play music:", error);
      setPlaying(false);
      setErrorMessage("Click play again or check browser audio permission.");
    }
  }

  function handleEnded() {
    setPlaying(false);
  }

  if (loading) {
    return null;
  }

  return (
    <aside
      className={`music-player ${collapsed ? "music-player-collapsed" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-label="Music player"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <audio
        ref={audioRef}
        src={selectedMusicSrc || undefined}
        loop
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onEnded={handleEnded}
      />

      {collapsed ? (
        <div
            className="music-mini-button"
            role="button"
            tabIndex={0}
            aria-label="Open music player"
            onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setCollapsed(false);
            }
            }}
        >
            ♪
        </div>
      ) : (
        <div className="music-player-main">
          <div className="music-player-drag-hint">Drag empty panel to move</div>

          <div className="music-player-disc" aria-hidden="true">
            ♪
          </div>

          <div className="music-player-text">
            <span>Now Playing</span>
            <strong>{getMusicName(selectedMusicKey)}</strong>
            {!selectedMusicSrc && <small>Equip music from Inventory.</small>}
            {errorMessage && <small>{errorMessage}</small>}
          </div>

          <div className="music-volume-control">
            <label htmlFor="music-volume">Volume</label>
            <input
              id="music-volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </div>

          <div className="music-player-actions">
            <button
              type="button"
              onClick={handleTogglePlay}
              disabled={!selectedMusicSrc}
            >
              {playing ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Minimize music player"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}