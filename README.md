# Nacimiento - Memory Egg
> This is the frontend repo.

Nacimiento - Memory Egg is a gamified journaling web application where users take care of a mysterious egg by writing blog posts, completing quests, and earning credits called **Will**.

The egg changes over time through the accumulation of memories, reflections, and daily writing. Users can spend Will on egg appearance, background themes, music, and other care-related items.

> The egg does not hatch from time.  
> It hatches from what is remembered.

## Project Purpose

This project is not only about a game. 
The egg represents something forgotten and fragile that the user chooses to care for.

The application encourages users to spend small moments of their busy lives writing, reflecting, and recording memories. Through this habit, the egg gradually changes, symbolizing the user's own process of remembering and taking care of themselves.

## Frontend repository

Frontend repository for **Nacimiento - Memory Egg**, a gamified journaling web application where users take care of a mysterious egg by writing notebook posts, completing quests, and earning credits called **Will**.

This repository contains the React frontend client.  
The backend REST API is managed in a separate repository.

## Related Repositories

- Frontend: `memory-egg-front`
- Backend: `memory-egg-back` 

## Frontend Responsibilities

This repository is responsible for:

- Opening story page
- Register page
- Login page
- Egg dashboard
- Notebook/write post page
- Memory archive page
- Quest UI
- Shop UI
- Inventory UI
- Profile/stat page
- API client functions that communicate with the backend
- Frontend assets such as egg images, background images, and icons
- Responsive design

## Main Pages

| Page | Purpose |
|---|---|
| Opening Story Page | Introduces the abandoned egg |
| Register Page | User chooses to take care of the egg |
| Login Page | Returning user comes back to the egg |
| Egg Dashboard | Main home page after login |
| Write Post Page | User writes notebook posts |
| Memory Archive Page | User views past posts |
| Quest Page | User views daily quests |
| Shop Page | User spends Will |
| Inventory Page | User equips purchased items |
| Profile Page | User views progress statistics |

## Planned Frontend Structure

```text
src/
  api/
    authApi.js
    eggApi.js
    postApi.js
    questApi.js
    shopApi.js
    inventoryApi.js

  assets/
    eggs/
    backgrounds/
    icons/
    music/

  components/
    Header.jsx
    Button.jsx
    EggView.jsx
    StatBar.jsx
    NotebookPanel.jsx
    QuestCard.jsx
    ShopItemCard.jsx
    InventoryItemCard.jsx
    PostCard.jsx

  hooks/
    useAuth.js
    useEgg.js
    usePosts.js
    useQuests.js

  pages/
    OpeningPage.jsx
    RegisterPage.jsx
    LoginPage.jsx
    EggDashboardPage.jsx
    WritePostPage.jsx
    MemoryArchivePage.jsx
    QuestPage.jsx
    ShopPage.jsx
    InventoryPage.jsx
    ProfilePage.jsx

