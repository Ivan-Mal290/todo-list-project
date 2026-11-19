# Realizacja części JavaScript — Heorhi Kheladze (ojgog)

**Projekt:** To-Do List – Zarządzanie projektem  
**Rola:** JavaScript Developer  
**Plik główny:** `script.js`

## Zakres wykonanych prac

Zaimplementowałem logikę aplikacji To-Do List w JavaScript (ES6+), bez zewnętrznych bibliotek i frameworków.

- **FR-1 – Dodawanie zadań:** obsługa przycisku „Dodaj” i klawisza Enter, usuwanie zbędnych spacji, czyszczenie pola i przywracanie fokusu.
- **FR-2 – Walidacja:** blokowanie pustych zadań, limit 100 znaków i sprawdzanie duplikatów bez rozróżniania wielkości liter.
- **FR-3 – Wyświetlanie:** dynamiczne tworzenie listy, komunikat „Brak zadań” i bezpieczne wyświetlanie treści przez `textContent`.
- **FR-4 – Oznaczanie wykonania:** zmiana statusu zadania oraz możliwość cofnięcia oznaczenia.
- **FR-5 – Usuwanie:** usuwanie zadania według identyfikatora po potwierdzeniu oraz obsługa opcjonalnego usuwania wykonanych zadań.
- **FR-6 – Trwałość danych:** zapis i odczyt z `localStorage` pod kluczem `todo-tasks`, obsługa błędnych danych oraz przenoszenie danych ze starszego formatu.
- **FR-7 – Licznik:** aktualizacja informacji `Do zrobienia: X / Wszystkich: Y` po każdej zmianie.

Każde zadanie zawiera pola `id`, `text`, `done` i `createdAt`. Identyfikatory są tworzone z wykorzystaniem `Date.now()` i zabezpieczone przed kolizjami.

## Współpraca z interfejsem

Skrypt współpracuje z istniejącymi elementami `taskForm`, `taskInput` i `taskList`, a także obsługuje identyfikatory ze specyfikacji (`task-input`, `add-btn`, `task-list`, `counter`). W razie braku licznika tworzy odpowiedni element podczas uruchomienia.

Dla wykonanych zadań używa klas `task--done` i `done`. W swojej części nie zmieniałem plików `index.html` ani `style.css`.

## Sprawdzenie działania

Przeprowadzono **31 automatycznych kontroli w przeglądarce Chrome** oraz testy logiki w środowisku Node.js. Kontrole objęły między innymi dodawanie, walidację, usuwanie, oznaczanie wykonania, licznik, przechowywanie danych i obsługę uszkodzonych zapisów.

Dodatkowo poprawiłem test przeglądarkowy, aby wykonywał się w izolowanym środowisku i nie usuwał danych użytkownika z głównej strony.

Testy Node.js można uruchomić w katalogu projektu poleceniem:

```sh
node sprawdzenie.cjs
```

Aplikację można uruchomić przez otwarcie pliku `index.html` w przeglądarce. Testów w Firefox i Safari nie potwierdzono.

## GitHub i Pull Requesty

Pracowałem na własnym forku głównego repozytorium i przesyłałem zmiany przez Pull Requesty.

- [Mój fork — ojgog/todo-list-project](https://github.com/ojgog/todo-list-project)
- [Repozytorium zespołu — Ivan-Mal290/todo-list-project](https://github.com/Ivan-Mal290/todo-list-project)
- [PR #5 — implementacja JavaScript](https://github.com/Ivan-Mal290/todo-list-project/pull/5): gałąź `feature/dodawanie-zadan`, **9 commitów**, scalony przez kierownika projektu.
- [PR #6 — dokumentacja i materiały testowe](https://github.com/Ivan-Mal290/todo-list-project/pull/6): gałąź `docs/readme`, **4 commity**, scalony przez kierownika projektu.

Zmiany dokumentacyjne dotyczące mojej części zostały wydzielone do niniejszego pliku, aby główny `README.md` pozostał ogólnym opisem zespołowego projektu.

## Trello

Wykorzystywałem osobistą i wspólną tablicę zespołu do dokumentowania postępów, terminów i etapów realizacji zadań.

- [Moja tablica JavaScript](https://trello.com/b/mWKiowOF)
- [Dodawanie zadań (JS)](https://trello.com/c/9wSV5S9N)
- [Usuwanie i zapis zadań (JS)](https://trello.com/c/jIsJaf3G)
- [Wspólna tablica projektowa](https://trello.com/b/dus1AXHf/to-do-list-zarzadzanie-projektem)

Po scaleniu PR #5 zadania JavaScript przeniesiono do kolumn zakończonych, a listy kontrolne oznaczono jako ukończone.

## Ograniczenia

Zadania są zapisywane lokalnie w przeglądarce, bez serwera i bazy danych. Aplikacja nie obejmuje logowania, edycji treści zadań ani kategorii. Dostępność `localStorage` podczas otwierania lokalnych plików może zależeć od ustawień przeglądarki.
