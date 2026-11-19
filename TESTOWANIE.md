# Sprawdzenie części JavaScript

Data sprawdzenia: 19 listopada 2026 r.

## Wyniki

| Sprawdzenie | Wynik |
| --- | --- |
| Składnia script.js | Pozytywny |
| Automatyczne scenariusze w Node.js z zastępczym DOM | Pozytywny |
| Formularz z obecnymi taskForm, taskInput i taskList | Pozytywny |
| Identyfikatory ze specyfikacji i opcjonalny clear-done-btn | Pozytywny w sprawdzeniu Node.js |
| Rzeczywisty Chrome, obecny index.html i style.css | 22 sprawdzenia zakończone pomyślnie |
| Firefox i Safari | Nie sprawdzono w tym środowisku |
| Dostęp przeglądarki do stron GitHub i Trello | Brak dostępu; próba otwarcia GitHub zakończyła się błędem rozwiązywania nazwy |
| Otwarcie PR przez połączenie GitHub | Odrzucone błędem 403 dla głównego repozytorium |
| Scalenie PR | Nie wykonano; należy do kierownika projektu |

## Powtórzenie sprawdzenia

Po pobraniu gałęzi JavaScript uruchom `node sprawdzenie.cjs`. Sprawdzenie obejmuje obie wersje identyfikatorów HTML, granice długości, duplikaty, wykonanie, usuwanie według id, licznik, odczyt po ponownym uruchomieniu, uszkodzone dane, blokadę zapisu i przenoszenie starszych zadań.

Plik `sprawdzenie-przegladarki.html` jest osobnym narzędziem sprawdzającym obecny `index.html` w ramce. Należy uruchamiać go wyłącznie w osobnym profilu przeglądarki przeznaczonym do sprawdzenia: **czyści dane zadań w localStorage tego profilu**. Używa fikcyjnych zadań. Dostęp między plikami lokalnymi w ramce może wymagać osobnego uruchomienia Chrome z opcją `--allow-file-access-from-files`; zwykłe uruchomienie aplikacji nie wymaga tej opcji.

Sprawdzenie w Chrome objęło:
- pustą listę i początkowy licznik;
- pustą treść, same spacje, 100 i 101 znaków oraz duplikaty;
- trim(), czyszczenie pola, fokus i Enter;
- tekst przypominający HTML wyświetlany bez interpretowania znaczników;
- wykonanie kliknięciem treści i polem wyboru, klasę task--done i przekreślenie z obecnego CSS;
- aktualizację licznika, zapis i odczyt po ponownym otwarciu;
- anulowanie oraz potwierdzenie usunięcia według id;
- uszkodzony JSON i przenoszenie danych spod starszego klucza tasks;
- brak zarejestrowanych błędów podczas wykonywania scenariuszy.

## Zgodność i ograniczenia

Nie zmieniono index.html ani style.css. Skrypt obsługuje obecne identyfikatory oraz identyfikatory ze specyfikacji, tworzy brakujący licznik przy uruchomieniu i zachowuje zgodność z klasą done w obecnym CSS.

Do sprawdzenia przez zespół pozostają Firefox i Safari, docelowe statyczne identyfikatory HTML oraz opcjonalny przycisk usuwania wykonanych w rzeczywistym interfejsie.

## Materiały do zaliczenia

Nie należy zastępować zrzutów rzeczywistych stron obrazami wygenerowanymi z danych API.

| Plik | Stan |
| --- | --- |
| 01-kopia-repozytorium.png | Do wykonania z rzeczywistej strony GitHub |
| 02-dokumentacja.png | Do wykonania z rzeczywistej strony GitHub |
| 03-galezie.png | Do wykonania z rzeczywistej strony GitHub |
| 04-historia-zmian.png | Do wykonania z rzeczywistej strony GitHub |
| 05-propozycja-zmian.png | Do wykonania po skutecznym otwarciu PR |
| 06-scalenie-zmian.png | Do wykonania przez zespół po scaleniu przez kierownika projektu |
| 07-tablica-trello.png | Do wykonania z rzeczywistej strony Trello |
| 08-karta-trello.png | Do wykonania z rzeczywistej strony Trello |
| 09-aplikacja.png | Rzeczywisty zrzut aplikacji w Chrome, materiał dodatkowy |

W bieżącym środowisku nie ma dostępnego narzędzia sterowania zalogowanym oknem przeglądarki. Próby wykonania zrzutów zewnętrznych stron w osobnej przeglądarce nie powiodły się. Zrzut scalenia nie może powstać przed decyzją kierownika projektu.
