# Nacimiento - Memory Egg

Nacimiento - Memory Egg is a gamified journaling web application where users take care of a mysterious egg by writing blog posts, completing quests, and earning credits called **Will**.

The egg changes over time through the accumulation of memories, reflections, and daily writing. Users can spend Will on egg appearance, background themes, music, and other care-related items.

> The egg does not hatch from time.  
> It hatches from what is remembered.

## Project Purpose

This project is not only about a game. 
The egg represents something forgotten and fragile that the user chooses to care for.

The application encourages users to spend small moments of their busy lives writing, reflecting, and recording memories. Through this habit, the egg gradually changes, symbolizing the user's own process of remembering and taking care of themselves.

## Core Features

### 1. Authentication

- Register
- Login
- Protected user pages
- Each user owns their own egg, posts, inventory, and progression data

### 2. Egg Dashboard

After logging in, the user sees their personal egg dashboard.

The dashboard includes:

- Current egg stage
- Will balance
- Egg stats: Glow, Warmth, and Weight
- Today’s quests
- Quick links to write posts, view archive, shop, and inventory

### 3. Notebook / Blog Posts

Users can write posts in the notebook.

Post features:

- Title
- Content
- Optional image URL/upload
- Visibility setting: private, public, or anonymous
- Word count display
- Will reward based on writing activity

### 4. Quest / To-Do List

Users receive daily quests from the notebook.

Example quests:

- Write 500+ words today
- Write about what you studied
- Write about food
- Upload a photo memory
- Return for 3 days in a row

Completing quests rewards Will.

### 5. Egg Stats

The egg has three main stats.

| Stat | Source | Visual / Gameplay Effect |
|---|---|---|
| Glow | Study-related posts | Ambient glow around the egg and bonus Will for study quests |
| Warmth | Applied decoration | Warmer atmosphere and bonus Will for word-count quests |
| Weight | Food-related posts | Shown as a stat and gives bonus Will for food quests |

### 6. Shop and Inventory

Users can spend Will in the shop.

Shop categories:

- Egg appearance
- Background themes
- Music
- Simple decorations

Purchased items are stored in the user's inventory and can be equipped or unequipped.

### 7. AI/CV Quest Verification

Some quests may use AI/CV verification to classify posts or images.

For example:

- A food-related quest may check whether the post or uploaded image is related to food.
- A study-related quest may check whether the post content is related to studying.

If verification fails, the post can be classified as `general`.

## Tech Stack

Planned stack:

- Frontend: React
- Backend: Node.js + Express
- Database: TBD
- Authentication: TBD
- API Documentation: Swagger / OpenAPI
- Testing: Jest / Supertest
- CI: GitHub Actions

## Repository Structure

```text
nacimiento-memory-egg/
  backend/
    src/
      controllers/
      routes/
      models/
      services/
      middleware/
      validators/
      tests/
    package.json
    .env.example

  frontend/
    src/
      components/
      pages/
      api/
      hooks/
      assets/
    package.json

  docs/
    proposal/
    api/
    wireframes/

  .github/
    workflows/
      test.yml

  README.md
  LICENSE
  ASSET-LICENSE.md
  .gitignore

```

| Folder        | Meaning                                  |
| ------------- | ---------------------------------------- |
| `controllers` | Handles API request/response             |
| `routes`      | Defines API URLs                         |
| `models`      | Database entities/queries                |
| `services`    | Main business/game logic                 |
| `middleware`  | Checks before request reaches controller |
| `validators`  | Validates user input                     |
| `tests`       | Automated tests                          |
| `components`  | Reusable frontend UI pieces              |
| `pages`       | Full frontend screens                    |
| `api`         | Frontend backend-call functions          |
| `hooks`       | Reusable React logic                     |
| `assets`      | Images, icons, music, static files       |
| `wireframes`  | UI sketches for planning/docs            |

