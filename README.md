# Tafeltennistoernooi planner

Voor het organizeren en plannen van tafeltennistoernooien

## Setup

Installeer de applicatie:

```bash
# npm
npm install
```

## Creeer een .env bestand
Maak een .env bestand in de root folder. Zet daar de volgende waarde in:

```
DATABASE_URL="mysql://username:password@localhost:3306/my-database-name"
```

## Installeer de database

npx prisma migrate dev --name init

## Development Server

Start de server op `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Bouw de applicatie voor productie:

```bash
# npm
npm run build
```

Lokaal de productie versie bekijken:

```bash
# npm
npm run preview
```

Bekijk de [deploy documentatie](https://nuxt.com/docs/getting-started/deployment) voor meer informatie.