# Study Planner

Планувальник навчальних завдань на React + TypeScript + Vite.
Починаючи з лабораторної роботи №10, задачі завантажуються з REST API
[DummyJSON](https://dummyjson.com/docs/todos).

## Технології

- React 19, TypeScript, Vite
- SCSS (BEM)
- Context API, useReducer, власні хуки
- fetch + AbortController
- ESLint

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

Інші команди:

```bash
npm run lint
npm run build
npm run preview
```

## Змінні оточення

| Змінна         | Опис                    | Приклад                 |
| -------------- | ----------------------- | ----------------------- |
| `VITE_API_URL` | Базова адреса REST API  | `https://dummyjson.com` |

Файл `.env` не потрапляє в репозиторій (додано в `.gitignore`).
Шаблон змінних лежить у `.env.example`.

## Використані запити API

| Дія                    | Метод    | Адреса                         |
| ---------------------- | -------- | ------------------------------ |
| Список зі сторінками   | `GET`    | `/todos?limit=10&skip=0`       |
| Деталі задачі          | `GET`    | `/todos/:id`                   |
| Створення              | `POST`   | `/todos/add`                   |
| Зміна назви / стану    | `PATCH`  | `/todos/:id`                   |
| Видалення              | `DELETE` | `/todos/:id`                   |

## Архітектура

```
Компоненти  →  TaskProvider (Context)  →  taskRepository  →  httpClient  →  REST API
```

- **`src/api/httpClient.ts`** — єдина функція `request` над `fetch`: базова адреса з `.env`,
  JSON-заголовки, перевірка `response.ok`, підтримка `AbortSignal`.
- **`src/api/errors.ts`** — клас `ApiError` і централізоване перетворення помилок
  у зрозумілі повідомлення (`getErrorMessage`), перевірка скасування (`isAbortError`).
- **`src/repositories/taskRepository.ts`** — Repository Pattern: методи
  `getAll`, `getById`, `create`, `update`, `delete`. Перетворює DTO сервера (`ApiTodo`)
  у доменний тип `Task` і навпаки.
- **`src/types/api.ts`** — типи даних сервера (DTO), **`src/types/task.ts`** — типи застосунку.
- **`src/reducers/taskReducer.ts`** — server state: задачі, `total`, `status`, `error`.
- **`src/context/TaskProvider.tsx`** — завантаження сторінки, мутації, тости, UI state.
- **`src/hooks/useTaskDetails.ts`** — окремий запит деталей задачі зі скасуванням.

### Server state і UI state

| Server state (з API)                  | UI state (тільки інтерфейс)                    |
| ------------------------------------- | ---------------------------------------------- |
| список задач, `total`                 | номер сторінки, фільтр (зберігається в localStorage) |
| `status`: loading / success / error   | відкрита задача (`selectedTaskId`)             |
| текст помилки                         | тема, тост, режим редагування, підтвердження видалення |

Задачі не дублюються в localStorage: джерело правди — сервер.

## Стани інтерфейсу

- **Завантаження** — спінер і текст «Завантаження...», кнопки пагінації вимкнені.
- **Помилка** — повідомлення і кнопка «Спробувати ще» (повторний запит).
- **Порожньо** — «Завдань не знайдено.»
- **Успіх** — список задач, статистика, пагінація.

Модальне вікно деталей має власні стани завантаження та помилки з повтором.

## Скасування запитів

Запити `GET` списку і деталей отримують `signal` від `AbortController`.
У cleanup функції `useEffect` викликається `controller.abort()`, тому:

- при швидкому перемиканні сторінок старий запит не перезапише нові дані;
- при закритті вікна деталей незавершений запит скасовується.

Помилка `AbortError` не показується користувачу.

## Додаткові завдання

1. **Пагінація** — сторінки по 10 задач через параметри `limit` і `skip`.
2. **Optimistic update** — «Виконати / Повернути» змінює задачу одразу, а при помилці сервера
   стан повертається назад і з'являється тост з помилкою.
3. **Централізована обробка помилок** — `ApiError` + `getErrorMessage`
   (мережа, 404, 5xx, невідома помилка).

## Обмеження DummyJSON

DummyJSON — тестовий API: він відповідає на `POST`, `PATCH`, `DELETE`,
але **не зберігає зміни**. Після переходу на іншу сторінку чи оновлення вкладки
повертаються початкові дані.

Нові задачі сервер завжди повертає з `id: 255`, якого потім не існує для `PATCH`/`DELETE`.
Тому створені задачі позначаються `isLocal: true` і змінюються лише в стані застосунку.

## Структура

```
src/
├── api/              httpClient, обробка помилок
├── components/       компоненти + SCSS
├── context/          TaskContext / ThemeContext і провайдери
├── hooks/            useTaskContext, useTheme, useLocalStorage, useTaskDetails
├── reducers/         taskReducer
├── repositories/     taskRepository
├── styles/           змінні та глобальні стилі
├── types/            task, api, toast, theme
├── utils/            фільтрація, підрахунки, підписи
├── constants.ts
├── env.d.ts
├── App.tsx
└── main.tsx
```

## Гілки

- `feature/react-fundamentals` — лабораторна №8
- `feature/state-effects` — лабораторна №9
- `feature/rest-api` — лабораторна №10