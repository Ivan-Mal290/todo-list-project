# Zasady współpracy

## Fork i gałęzie

Każdy członek zespołu pracuje we własnym forku. Zmiany zgłaszamy z osobnych gałęzi, np. `feature/html`, `feature/css`, `feature/dodawanie-zadan` i `docs/readme`.

## Commity

Każdy commit opisuje rzeczywistą, spójną zmianę. Opisy piszemy po polsku, np.:

- funkcja: dodawanie zadań przyciskiem i klawiszem Enter
- funkcja: walidacja treści zadania
- funkcja: oznaczanie wykonania i usuwanie według identyfikatora
- funkcja: zapis localStorage i licznik
- dokumentacja: opis części JavaScript w README

Nie przepisujemy istniejących historycznych commitów.

## Pull Request

Pull Request kierujemy do głównego repozytorium. Tytuł i opis są po polsku oraz zawierają zakres zmian, rzeczywiste odnośniki do Trello, instrukcję sprawdzenia, wyniki i problemy lub ograniczenia.

## Podział odpowiedzialności

Programista JavaScript zmienia logikę aplikacji. Nie zmienia plików `index.html` i `style.css`; potrzebne elementy lub style zgłasza programiście HTML, programiście CSS lub kierownikowi projektu.

Kierownik projektu sprawdza PR i wykonuje scalenie. Autor zmian nie wykonuje scalenia w jego imieniu.

## Trello

Używamy istniejących kart zamiast tworzyć duplikaty. Nazwy tablic, kolumn, kart, opisy i listy kontrolne są po polsku. Kolumny: „Do zrobienia”, „W trakcie”, „Przegląd kodu”, „Gotowe”. Karty przenosimy do „Gotowe” dopiero po scaleniu PR.

## Język materiałów

Dokumentacja, komentarze, komunikaty interfejsu, wiadomości commitów, opisy PR i materiały do zaliczenia są po polsku. Zachowujemy poprawne identyfikatory kodu, nazwy API oraz nazwy techniczne, np. JavaScript, HTML, GitHub i localStorage.
