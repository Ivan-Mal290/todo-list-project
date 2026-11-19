const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/script.js', 'utf8');

// Zastępuje elementy DOM na potrzeby sprawdzenia logiki bez przeglądarki.
class Element {
  constructor() { this.children = []; this.handlers = {}; this.value = ''; this.attrs = {}; }
  set textContent(value) { this.text = value; this.children = []; }
  get textContent() { return this.text; }
  appendChild(child) { this.children.push(child); }
  insertAdjacentElement(position, element) { this.after = element; }
  setAttribute(key, value) { this.attrs[key] = value; }
  addEventListener(key, fn) { this.handlers[key] = fn; }
  focus() { this.focused = true; }
  fire(key, props = {}) { this.handlers[key]?.({ preventDefault() {}, ...props }); }
}

// Uruchamia kod dla obu zestawów identyfikatorów HTML i kontrolowanego zapisu.
function boot(raw = null, options = {}) {
  const inputId = options.legacyHtml ? 'taskInput' : 'task-input';
  const listId = options.legacyHtml ? 'taskList' : 'task-list';
  const names = [inputId, listId, ...(options.legacyHtml ? ['taskForm'] : ['add-btn', 'counter']), ...(options.noClear ? [] : ['clear-done-btn'])];
  const ids = Object.fromEntries(names.map(id => [id, new Element()]));
  const button = ids['add-btn'] || new Element();
  if (options.legacyHtml) { ids.taskForm.querySelector = () => button; ids.taskInput.form = ids.taskForm; }
  const alerts = [];
  const storage = { value: raw, legacy: options.legacy ?? null, getItem(key) {
    if (options.blockRead) throw Error('Odczyt zablokowany');
    return key === 'todo-tasks' ? this.value : this.legacy;
  }, setItem(key, value) {
    assert.equal(key, 'todo-tasks');
    if (options.blockWrite) throw Error('Zapis zablokowany');
    this.value = value;
  } };
  const win = { alert: text => alerts.push(text), confirm: () => true };
  const document = { readyState: 'complete', getElementById: id => ids[id] || null, createElement: () => new Element() };
  vm.runInNewContext(source, { document, window: win, localStorage: storage });
  return { ids, alerts, storage, win, input: ids[inputId], counter: ids.counter || ids[listId].after,
    add(text, enter = false) { ids[inputId].value = text; (enter ? ids[inputId] : button).fire(enter ? 'keydown' : 'click', {key: 'Enter'}); },
    rows: () => ids[listId].children, data: () => JSON.parse(storage.value) };
}

// Sprawdza scenariusze akceptacyjne, błędne dane i starszą wersję HTML.
for (const legacyHtml of [false, true]) {
  const app = boot(null, {legacyHtml});
  assert.equal(app.rows()[0].textContent, 'Brak zadań');
  assert.equal(app.counter.textContent, 'Do zrobienia: 0 / Wszystkich: 0');
  app.add('   '); assert.equal(app.alerts.pop(), 'Wpisz treść zadania!');
  app.add('x'.repeat(101)); assert.equal(app.rows()[0].textContent, 'Brak zadań');
  app.add('  Kupić mleko  '); app.add('Drugie', true);
  assert.equal(app.data()[0].text, 'Kupić mleko');
  assert.equal(app.input.value, ''); assert.ok(app.input.focused);
  assert.equal(app.data().length, 2); assert.notEqual(app.data()[0].id, app.data()[1].id);
  app.add('KUPIĆ MLEKO'); assert.equal(app.data().length, 2);
  app.add('x'.repeat(100)); assert.equal(app.data().length, 3);
  app.add('<img src=x onerror=alert(1)>');
  assert.equal(app.rows()[3].children[1].textContent, '<img src=x onerror=alert(1)>');
  app.rows()[0].children[1].fire('click');
  assert.ok(app.data()[0].done); assert.equal(app.rows()[0].className, 'task task--done done');
  assert.equal(app.counter.textContent, 'Do zrobienia: 3 / Wszystkich: 4');
  const reload = boot(app.storage.value, {legacyHtml}); assert.ok(reload.data()[0].done);
  reload.win.confirm = () => false; reload.rows()[1].children[2].fire('click'); assert.equal(reload.data().length, 4);
  reload.win.confirm = () => true;
  const removedId = reload.data()[1].id;
  reload.rows()[1].children[2].fire('click'); assert.ok(!reload.data().some(task => task.id === removedId));
  reload.ids['clear-done-btn'].fire('click'); assert.equal(reload.data().length, 2); assert.ok(reload.data().every(task => !task.done));
  reload.rows()[0].children[0].fire('change'); assert.ok(reload.data()[0].done);
  reload.rows()[0].children[1].fire('keydown', {key: ' '}); assert.ok(!reload.data()[0].done);
  for (const raw of ['błędny JSON', '{}', 'null', '[null]', '[{"id":1}]', JSON.stringify([app.data()[0], app.data()[0]])]) assert.equal(boot(raw, {legacyHtml}).rows()[0].textContent, 'Brak zadań');
  assert.equal(boot(null, {legacyHtml, blockRead: true}).rows()[0].textContent, 'Brak zadań');
  const blocked = boot(null, {legacyHtml, blockWrite: true, noClear: true}); blocked.add('Próba'); assert.equal(blocked.rows()[0].children[1].textContent, 'Próba'); assert.match(blocked.alerts[0], /Nie udało/);
  const migrated = boot(null, {legacyHtml, legacy: JSON.stringify([{text: 'Starsze zadanie', done: true}])});
  assert.equal(migrated.data()[0].text, 'Starsze zadanie'); assert.ok(migrated.data()[0].done); assert.ok(Number.isSafeInteger(migrated.data()[0].id));
}
console.log('Wynik pozytywny: FR-1–FR-7, oba zestawy identyfikatorów HTML, granice długości, duplikaty, bezpieczny tekst, odczyt po ponownym uruchomieniu, błędne dane i przenoszenie starszych zadań.');
