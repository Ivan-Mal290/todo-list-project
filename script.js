(() => {
  "use strict";

  const STORAGE_KEY = "todo-tasks";
  let tasks = [];
  let taskInput;
  let taskList;
  let counter;

  // Wczytuje zadania; odrzuca uszkodzone dane i powtarzające się identyfikatory.
  function loadTasks() {
    // Odczyt danych zostanie podłączony w etapie zapisu.
    return [];
  }

  // Zapisuje stan i informuje, jeśli przeglądarka blokuje zapis.
  function saveTasks() {
    // Zapis danych zostanie podłączony w etapie zapisu.
  }

  // Sprawdza treść, dodaje zadanie i przywraca fokus pola.
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
      window.alert("Wpisz treść zadania!");
      taskInput.focus();
      return;
    }
    if (Array.from(text).length > 100) {
      window.alert("Zadanie może mieć maksymalnie 100 znaków!");
      taskInput.focus();
      return;
    }
    if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase())) {
      window.alert("Takie zadanie już istnieje!");
      taskInput.focus();
      return;
    }
    const createdAt = getToday();
    // Kolejne dodania w tej samej milisekundzie otrzymują różne ID.
    let id = Date.now();
    while (tasks.some((task) => task.id === id)) {
      id = id === Number.MAX_SAFE_INTEGER ? 0 : id + 1;
    }
    tasks.push({ id, text, done: false, createdAt });
    saveTasks();
    render();
    taskInput.value = "";
    taskInput.focus();
  }

  // Zwraca datę według lokalnej strefy czasowej użytkownika.
  function getToday() {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  }

  // Przełącza wykonanie zadania o wskazanym ID.
  function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    task.done = !task.done;
    saveTasks();
    render();
  }

  // Usuwa zadanie według ID po potwierdzeniu.
  function deleteTask(id) {
    if (!tasks.some((task) => task.id === id)) return;
    if (!window.confirm("Usunąć zadanie?")) return;
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    render();
  }

  // Usuwa wszystkie wykonane zadania.
  function clearDoneTasks() {
    tasks = tasks.filter((task) => !task.done);
    saveTasks();
    render();
  }

  // Buduje listę bez interpretowania treści jako HTML.
  function render() {
    taskList.textContent = "";
    if (tasks.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "Brak zadań";
      taskList.appendChild(empty);
    }
    tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = task.done ? "task task--done done" : "task";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", `Wykonane: ${task.text}`);
      checkbox.addEventListener("change", () => toggleTask(task.id));
      const label = document.createElement("span");
      label.textContent = task.text;
      label.tabIndex = 0;
      label.setAttribute("role", "checkbox");
      label.setAttribute("aria-checked", String(task.done));
      label.addEventListener("click", () => toggleTask(task.id));
      label.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleTask(task.id);
        }
      });
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete";
      deleteButton.textContent = "Usuń";
      deleteButton.setAttribute("aria-label", `Usuń zadanie: ${task.text}`);
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      item.appendChild(checkbox);
      item.appendChild(label);
      item.appendChild(deleteButton);
      taskList.appendChild(item);
    });
    updateCounter();
  }

  // Pokazuje liczbę niewykonanych zadań i liczbę wszystkich zadań.
  function updateCounter() {
    // Licznik zostanie podłączony wraz z zapisem danych.
  }

  // Łączy logikę z wymaganymi elementami HTML po załadowaniu dokumentu.
  function init() {
    taskInput = document.getElementById("task-input") || document.getElementById("taskInput");
    taskList = document.getElementById("task-list") || document.getElementById("taskList");
    counter = document.getElementById("counter");
    const form = document.getElementById("taskForm") || (taskInput && taskInput.form);
    const addButton = document.getElementById("add-btn") ||
      (form && form.querySelector('button[type="submit"], button:not([type])'));
    if (!taskInput || !taskList || !addButton) {
      window.alert("Brakuje pola zadania, listy zadań lub przycisku Dodaj.");
      return;
    }
    // Uzupełnia brakujący licznik bez zmieniania pliku HTML.
    if (!counter) {
      counter = document.createElement("p");
      counter.id = "counter";
      taskList.insertAdjacentElement("afterend", counter);
    }
    counter.setAttribute("aria-live", "polite");
    if (form) {
      // Zapewnia polskie komunikaty zamiast natywnej walidacji przeglądarki.
      form.noValidate = true;
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask();
      });
    }
    addButton.addEventListener("click", (event) => {
      event.preventDefault();
      addTask();
    });
    taskInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        addTask();
      }
    });
    const clearDoneButton = document.getElementById("clear-done-btn");
    if (clearDoneButton) {
      clearDoneButton.addEventListener("click", (event) => {
        event.preventDefault();
        clearDoneTasks();
      });
    }
    tasks = loadTasks();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
