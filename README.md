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

Workflow Azure Static Web Apps zawiera trzy osobne zadania wykonywane kolejno:

1. **Build** — instaluje zależności przez `npm ci`, wykonuje `npm run build`
   i zapisuje katalog `build` jako artefakt `production-build` na 7 dni.
2. **Test** — po poprawnym buildzie instaluje zależności i uruchamia
   `npm run test:ci`. Błąd builda lub testów blokuje wdrożenie.
3. **Deploy** — pobiera artefakt z tego samego uruchomienia workflow,
   sprawdza obecność `index.html` i `staticwebapp.config.json`, a następnie
   wdraża gotowe pliki do Azure bez ponownego budowania (`skip_app_build`).

Build i testy używają Node.js 22. Wszystkie zadania działają na `ubuntu-24.04`,
a akcje GitHub używają runtime Node.js 24. Checkout nie utrwala danych logowania
w konfiguracji Git (`persist-credentials: false`).
Workflow uruchamia się dla pushów na `main` oraz otwieranych, aktualizowanych
i ponownie otwieranych pull requestów do `main`. Push wdraża produkcję,
a pull request korzysta z dotychczasowego mechanizmu środowisk podglądu Azure.
Konfiguracja `public/staticwebapp.config.json` zapewnia obsługę tras SPA.

Pliki tekstowe używają końców linii LF, zgodnie z `.gitattributes`.

## Ikona instalowanej aplikacji

Manifest używa nazwy **MultiTool** i pomarańczowej ikony psa na kremowym tle z plakietką młotka
i klucza. Źródło wektorowe znajduje się w `public/multitool-icon.svg`.
Gotowe eksporty obejmują PNG 192×192 i 512×512, ikonę Apple 180×180,
favicon 16/32/48 px oraz osobną ikonę maskable 512×512. W wersji maskable
grafika jest skalowana do 58% i centrowana na kremowym tle, aby mieściła się
w bezpiecznym okręgu o promieniu 40% szerokości obrazu.

CI sprawdza nazwę aplikacji, wpisy manifestu, wymiary plików PNG,
metadane Apple i rozmiary ikon zawartych w faviconie. Pliki graficzne są
przechowywane w repozytorium; build nie wymaga ich generowania.

## Typografia

Aplikacja używa lokalnie hostowanego kroju Nunito Sans: tekst 400, etykiety
oraz przyciski 600, nagłówki 700–800. Pliki WOFF2 w `public/fonts` obejmują
łacinę oraz rozszerzoną łacinę z polskimi znakami. Font korzysta z `font-display: swap`, a licznik i wynik mają cyfry o jednakowej
szerokości (`tabular-nums`).
Pliki pochodzą z Google Fonts; licencja SIL OFL znajduje się w `public/fonts/OFL.txt`.
Podczas korzystania z aplikacji font nie wymaga połączenia z Google Fonts.

Pieski w liczniku używają `public/dog.svg`, z tą samą głową i pomarańczowym
kolorem co ikona PWA. Ich rozmiar pozostaje bez zmian.

Home wyświetla wspólny symbol SVG bez tła i cienia kafelka. Eksporty PNG oraz
favicon mają kremowe tło `#FFF7F0`, dopasowane do bazowego tła aplikacji.
