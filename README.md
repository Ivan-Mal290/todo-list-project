# Lista zadań — zarządzanie projektem

Prosta aplikacja do dodawania i zarządzania codziennymi zadaniami. Działa po otwarciu `index.html` bez serwera i bez bibliotek JavaScript.

## Uruchomienie

1. Pobierz repozytorium lub sklonuj je z GitHub.
2. Otwórz `index.html` w Chrome, Firefox lub Safari.
3. Dodaj zadanie przyciskiem „Dodaj” albo klawiszem Enter.

## Część JavaScript — Heorhi Kheladze (ojgog)

Plik `script.js` realizuje FR-1–FR-7:

- dodawanie na końcu listy, usuwanie białych znaków i przywracanie fokusu;
- walidację pustej treści, limitu 100 znaków i duplikatów bez uwzględniania wielkości liter;
- wyświetlanie tekstu przez `textContent` i komunikatu „Brak zadań”;
- przełączanie wykonania kliknięciem treści, polem wyboru lub klawiszami Enter i spacji;
- usuwanie według identyfikatora po potwierdzeniu oraz opcjonalne usuwanie wykonanych;
- odczyt i zapis w `localStorage` pod kluczem `todo-tasks`, obsługę uszkodzonych danych i błędów zapisu;
- licznik `Do zrobienia: X / Wszystkich: Y`.

Model zadania zawiera `id`, `text`, `done` i `createdAt`. Identyfikator opiera się na `Date.now()` z ochroną przed kolizjami. Data utworzenia odpowiada lokalnej dacie użytkownika. Zadania starszej wersji zapisane pod kluczem `tasks` są przenoszone do nowego formatu, gdy nowy klucz jeszcze nie istnieje.

## Zgodność z HTML i CSS

Skrypt obsługuje zarówno identyfikatory ze specyfikacji (`task-input`, `add-btn`, `task-list`, `counter`), jak i obecny formularz (`taskForm`, `taskInput`, `taskList`). Gdy brakuje licznika, tworzy element `p#counter` po liście. Obsługuje opcjonalny `clear-done-btn`.

Wykonane zadanie ma klasy `task--done` i `done`, aby współpracować z obecnym CSS. Przycisk usuwania ma klasę `delete`. Pliki `index.html` i `style.css` nie są zmieniane w części JavaScript. Docelowe identyfikatory oraz statyczny element licznika należy uzgodnić z programistą HTML i kierownikiem projektu.

## Sprawdzenie

Po dołączeniu gałęzi JavaScript uruchom:

```shell
node sprawdzenie.cjs
```

Sprawdzenie automatyczne używa zastępczych elementów DOM i obejmuje obie wersje identyfikatorów, walidację, wykonanie, usuwanie, zapis, odczyt i przenoszenie starszych danych. Nie zastępuje sprawdzenia interfejsu w rzeczywistej przeglądarce. Szczegóły i stan sprawdzenia opisuje [TESTOWANIE.md](TESTOWANIE.md).

Dokumentacja i kod są zgłaszane w osobnych gałęziach. Przed scaleniem obu propozycji plik sprawdzenia może być dostępny wyłącznie w gałęzi `feature/dodawanie-zadan`.

## Organizacja pracy

- [Osobista tablica JavaScript](https://trello.com/b/mWKiowOF)
- [Dodawanie zadań (JS)](https://trello.com/c/9wSV5S9N)
- [Usuwanie i zapis zadań (JS)](https://trello.com/c/jIsJaf3G)

Kolumny: „Do zrobienia”, „W trakcie”, „Przegląd kodu”, „Gotowe”. Do „Gotowe” zadania trafiają po scaleniu PR przez kierownika projektu.

## Technologie

HTML5, CSS3, JavaScript, Git, GitHub i Trello.

## Zespół

- Ivan Maliuk — kierownik projektu
- Vladyslav Pankratov — programista interfejsu
- Heorhi Kheladze — programista JavaScript
- Fedir Lisnychenko — osoba odpowiedzialna za testowanie

## Ograniczenia

Dane są lokalne dla przeglądarki i jej profilu. Dostępność `localStorage` dla plików lokalnych zależy od ustawień przeglądarki. Gdy zapis jest blokowany, aplikacja wyświetla polski komunikat; zmiany mogą zniknąć po ponownym otwarciu.

Poza zakresem pozostają: edycja treści, kategorie, terminy zadań, serwer, baza danych i logowanie.
