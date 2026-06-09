import defaultBackground from "./background.png";
import defaultEgg from "./egg.PNG";
import defaultNest from "./nest.PNG";
import notebook from "./notebook.PNG";
import windowFrame from "./windowframe.PNG";

import fallBackground from "./background/fall-bg.PNG";
import grassBackground from "./background/grass-bg.PNG";
import nightStreetBackground from "./background/nightstreet-bg.png";

import angelic from "./cosmetics/Angelic.png";
import beard from "./cosmetics/Beard.png";
import dirtyBoots from "./cosmetics/DirtyBoots.png";
import flowerCrown from "./cosmetics/FlowerCrown.png";
import glasses from "./cosmetics/Glasses.png";
import lifeBuoy from "./cosmetics/LifeBuoy.png";
import onFire from "./cosmetics/OnFire.png";
import spinningHat from "./cosmetics/SpinningHat.png";
import topHat from "./cosmetics/TopHat.png";
import workOverall from "./cosmetics/WorkOverall.png";

import eternityInMoments from "./music/eternity-in-moments.m4a";
import goldPhenomenon from "./music/gold-phenomenon.m4a";
import miQuerido from "./music/mi-querido.m4a";

import eternityInMomentsCover from "./music-covers/eternity-in-moments.jpeg";
import miQueridoCover from "./music-covers/mi-querido.jpeg";
import goldPhenomenonCover from "./music-covers/gold-phenomenon.png";

export const baseAssets = {
  background: defaultBackground,
  egg: defaultEgg,
  nest: defaultNest,
  notebook,
  windowFrame,
};

export const backgroundAssets = {
  default: defaultBackground,
  fall_bg: fallBackground,
  grass_bg: grassBackground,
  nightstreet_bg: nightStreetBackground,
};

export const cosmeticAssets = {
  angelic,
  beard,
  dirty_boots: dirtyBoots,
  flower_crown: flowerCrown,
  glasses,
  life_buoy: lifeBuoy,
  on_fire: onFire,
  spinning_hat: spinningHat,
  top_hat: topHat,
  work_overall: workOverall,
};

export const musicAssets = {
  eternity_in_moments: eternityInMoments,
  gold_phenomenon: goldPhenomenon,
  mi_querido: miQuerido,
};

export const musicCoverAssets = {
  eternity_in_moments: eternityInMomentsCover,
  mi_querido: miQueridoCover,
  gold_phenomenon: goldPhenomenonCover,
};

export function getBackgroundAsset(backgroundKey) {
  return backgroundAssets[backgroundKey] || backgroundAssets.default;
}

export function getCosmeticAsset(cosmeticKey) {
  if (!cosmeticKey) {
    return null;
  }

  return cosmeticAssets[cosmeticKey] || null;
}

export function getMusicAsset(musicKey) {
  return musicAssets[musicKey] || null;
}

export function getMusicCoverAsset(assetKey) {
  return musicCoverAssets[assetKey] || null;
}