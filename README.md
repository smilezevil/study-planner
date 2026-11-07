# Study Planner

Планувальник навчальних завдань на React.

- **Лабораторна №8** — компоненти, JSX, props, стан, події та списки.
- **Лабораторна №9** — Context API, useReducer, useEffect, localStorage і власні hooks.

**Стек:** React 19, TypeScript, Vite, SCSS (BEM), ESLint.

## Можливості

- додавання, редагування й видалення завдань;
- позначення завдання виконаним і повернення в стан «не виконано»;
- Undoable Delete: після видалення 5 секунд, щоб натиснути «Скасувати»;
- «Очистити виконані» з можливістю скасування;
- «Скинути дані» до початкового списку;
- статистика та фільтри «Всі», «Виконані», «Не виконані» з лічильниками;
- пошук за назвою і сортування за пріоритетом;
- Toast-повідомлення після створення, редагування, видалення і при помилках;
- збереження завдань, фільтра і теми в localStorage;
- заголовок вкладки з кількістю невиконаних завдань;
- світла та темна тема.

## Запуск

Потрібен Node.js 22.22 або новіший.

```sh
npm install
npm run dev      # режим розробки
npm run build    # перевірка типів і збірка
npm run lint     # ESLint
```

## Організація стану

- **`reducers/taskReducer.ts`** — чистий reducer для списку завдань. Дії: `add`, `toggle`, `update`, `requestDelete`, `confirmDelete`, `undoDelete`, `clearCompleted`, `reset`.
- **`context/TaskProvider.tsx`** — тримає reducer, фільтр, пошук і toast. Надає компонентам дані та операції через `TaskContext`. Тут живуть побічні ефекти:
    - таймер Undoable Delete;
    - автозакриття toast;
    - збереження в localStorage.
- **`context/ThemeProvider.tsx`** — окремий контекст для теми.
- **`hooks/useTaskContext.ts`, `hooks/useTheme.ts`** — доступ до контекстів зі зрозумілою помилкою поза провайдером.
- **`hooks/useLocalStorage.ts`** — універсальний хук для збереження значення (фільтр, тема).
- **Статистика й видимий список** не зберігаються окремо, а рахуються під час рендеру.

## Структура

```
src/
├── components/   # Header, TaskForm, TaskStats, TaskFilters, TaskList, TaskItem, Toast, ToastRegion (+ .scss)
├── context/      # TaskContext, TaskProvider, ThemeContext, ThemeProvider
├── hooks/        # useTaskContext, useTheme, useLocalStorage
├── reducers/     # taskReducer
├── types/        # task, toast, theme
├── utils/        # tasks (фільтр, пошук, сортування, статистика), storage (localStorage)
├── data/         # initialTasks
├── styles/       # спільні змінні та мінімальні глобальні стилі
├── constants.ts  # тривалість таймерів
├── App.tsx
└── main.tsx
```