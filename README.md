# Tafeltennistoernooi planner

Voor het organizeren en plannen van tafeltennistoernooien

## Setup

Installeer de applicatie:

```bash
# npm
npm install
```

## Installeer de database
Draai de SQL die in het [db.txt](db.txt) file staat

## Creeer een .env bestand
Maak een .env bestand in de root folder. Zet daar de volgende waardes in:

```
MYSQL_SERVER='localhost'
MYSQL_USER='root'
MYSQL_PASSWORD='xxxxxx'
MYSQL_DATABASE='tafeltennistoernooiplanner'
```

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