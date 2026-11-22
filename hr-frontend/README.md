# People Studio

HR-only Vue 3 and TypeScript frontend built with Vite.

Use Node.js 22.12+ or 24 LTS. TypeScript 6 is pinned because the current Vue type checker depends on a compiler entry point removed in TypeScript 7.

```sh
npm ci
npm run dev
```

Open the URL shown in the terminal. Run `npm run build` to type-check and generate a production build in `dist/`. Use a web server to serve the build.

## Source structure

- `src/app/` contains the hash-route registry, sidebar configuration, and workspace layout.
- `src/features/` contains the auth, attendance, dashboard, employees, finance, leave, payroll, and workspace modules. Keep each feature's pages, data, and styles in its own folder.
- `src/shared/` contains common page UI, base styles, formatting, and browser storage utilities.
- `src/App.vue` selects the current page and its layout.

Employee and leave stores are shared across the screens that use them. To add a page, create it in the relevant feature and register it in `src/app/routes.ts`. Add its sidebar entry in `src/app/navigation.ts` when needed.

## Demo behavior

The demo includes an HR overview, a searchable employee directory, a leave approval queue, an events and holidays calendar, a gross salary register with CSV export, and reports. It starts with fictional records. Employee additions and leave decisions persist in localStorage on the same browser and origin. The salary history chart uses a fixed sample series, while the salary register and department counts reflect local changes.
The overview includes an income breakdown, stacked payroll bars, salary trends by unit, a persistent to-do list, employee performance, and employee structure. Income, payroll trends, and review scores are sample data.
Overview charts use Chart.js. Hover or tap to see values, select a legend item to toggle it, or change the period to update both payroll charts.

The frontend uses no authentication or backend. Keep demo data fictional. For a shared deployment, connect the views to API endpoints and enforce HR and payroll permissions on the server.
