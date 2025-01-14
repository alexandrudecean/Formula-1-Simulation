# Formula 1 Simulation

## Scopul site-ului
Acest proiect este o aplicație web interactivă care permite utilizatorilor să simuleze performanțele monoposturilor de Formula 1 pe diverse circuite. Simularea ia în considerare factori precum echipa, modelul monopostului, condițiile meteo, tipul de pneuri și nivelul de downforce, oferind rezultate precum timpul pe tur și viteza maximă estimată.

De asemenea, aplicația oferă informații detaliate despre piloții și circuitele din Formula 1, utilizând date preluate dintr-un API extern.

## Caracteristici principale
- Simulare realistă a performanțelor monoposturilor.
- Informații despre piloții Formula 1 din ultimii 3 ani.
- Galerie de imagini și descrieri pentru diverse circuite și pneuri.
- Explicarea unor termeni specifici, cum ar fi downforce.
- Validare avansată a formularelor pentru o experiență utilizator optimizată.

## Instrucțiuni de instalare/rulare

### Cerințe preliminare
1. Asigură-te că ai instalate următoarele:
   - [Node.js](https://nodejs.org/) (versiune 14 sau mai mare)
   - [Git](https://git-scm.com/)
   - [Git LFS](https://git-lfs.com/) pentru gestionarea fișierelor mari.

2. Clonează repository-ul:
   ```bash
   git clone https://github.com/alexandrudecean/Formula-1-Simulation.git
   cd Formula-1-Simulation

## Instalare
### Backend
1. Navighează în directorul `backend`:
   - cd backend
        - pentru instalarea dependentelor: `npm install`
        - pentru rularea serverului: `node server.js`
        - Serverul va rula pe http://localhost:5000

2. Navighează în directorul `frontend`:
    - cd frontend
        - pentru instalarea dependentelor: `npm install`
        - pentru rularea aplicatiei: `npm start`
        - Aplicația va fi disponibilă pe http://localhost:3000

## Utilizare
- Accesează pagina principală (http://localhost:3000).
- Navighează prin paginile aplicației:
- Acasă: Informații generale despre Formula 1 .
- Simulare: Completează formularul pentru a simula performanța unui monopost.
- Informații: Află detalii despre circuite, pneuri și piloți.

## Structură proiect
- `backend/` - Conține serverul și logica backend, inclusiv conexiunea cu API-uri externe.
- `frontend/` - Conține aplicația React pentru interfața utilizatorului.
- `tests/` - Conține testele pentru funcționalitățile principale.
- `package.json` - Fișier de configurare pentru dependențe.


## Bibliografie folosită
1. Date API externe: Ergast Developer API
2. Framework și biblioteci utilizate:
    - React.js
    - Bootstrap
    - React Multi Carousel
    - Axios
3. Fonturi: Google Fonts - Poppins