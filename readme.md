# Nodejs, ExpressJs MongoDB Blog Api

## Installation
1. clone this repository
2. install package dependency via `npm install` command
3. Create `.env` envoirment variables file or mv `.env.example` .env

## How to run ?

1. If you need run application on development mode run `npm run dev`
2. If you need run application on production mode run `npm run start`


### Categroy CRUD
`_id, name, descrption, updatedAt, createdAt`

* GET `/api/blogs`
* GET `/api/blogs/:id`
* POST `/api/blogs`
* PUT `/api/blogs/:id`
* DELETE `/api/blogs/:id`


### Blog CRUD
`_id, name, text, tags, category, updatedAt, createdAt`

* GET `/api/blogs`
* GET `/api/blogs/:id`
* POST `/api/blogs`
* PUT `/api/blogs/:id`
* DELETE `/api/blogs/:id`
