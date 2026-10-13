# MultiTool

MultiTool to aplikacja webowa z dwoma narzędziami: przelicznikiem składników
kuchennych i licznikiem przerw pomiędzy seriami treningowymi.

## Funkcje

- **Converter** (`/converter`) — przelicza ilości masła, oleju i margaryny
  z uwzględnieniem stężeń i gęstości zapisanych w kodzie. Obsługuje gramy,
  mililitry i szklanki o pojemności 250 ml. Wynik ma dwa miejsca po przecinku.
- **Workout Timer** (`/workouttimer`) — pozwala ustawić liczbę serii oraz czas
  przerwy, oznaczać wykonane serie i odliczać odpoczynek. Domyślne ustawienia
  to 5 serii i 60 sekund. Koniec przerwy sygnalizuje alarm oraz wibracja,
  jeśli urządzenie ją obsługuje. Utrzymywanie włączonego ekranu zależy od
  obsługi Screen Wake Lock przez przeglądarkę.
- **Home** (`/`) — strona powitalna. Menu dostosowuje się do szerokości ekranu.

Aplikacja działa w przeglądarce, bez backendu i kont użytkowników.
Ustawienia oraz postęp treningu nie są zapisywane po odświeżeniu strony.

## Uruchomienie

Projekt używa React 18, TypeScript, Material UI i Create React App.
Wymaga Node.js oraz npm.

```sh
npm ci
npm start
```

Serwer deweloperski domyślnie udostępnia aplikację pod adresem
http://localhost:3000.

## Weryfikacja i build

```sh
npm test -- --watchAll=false
npm run test:ci
npm run build
```

Testy sprawdzają stronę startową, nawigację, przeliczanie składników
we wszystkich jednostkach docelowych oraz czyszczenie formularza. Testy licznika
treningowego obejmują minimalne ustawienia, odliczanie i zatrzymywanie przerw,
alarm oraz zakończenie i ponowne rozpoczęcie treningu. Dźwięk jest zastępowany
mockiem, a odliczanie korzysta z kontrolowanego zegara testowego.
Build produkcyjny trafia do katalogu `build`.

Repozytorium zawiera workflow wdrożenia do Azure Static Web Apps uruchamiany
przy pushu na `main` i obsłudze pull requestów do tej gałęzi.
Przed wdrożeniem workflow instaluje zależności przez `npm ci` i uruchamia
`npm run test:ci` na Node.js 22. Nieudane testy blokują krok wdrożenia.
Testy uruchamiają się dla pushów na `main` oraz otwieranych, aktualizowanych
i ponownie otwieranych pull requestów do `main`.
Konfiguracja `public/staticwebapp.config.json` zapewnia obsługę tras SPA.

Pliki tekstowe używają końców linii LF, zgodnie z `.gitattributes`.
