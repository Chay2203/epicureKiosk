
<p align="center">
    <h1 align="center">Epicure Kiosk Admin Dashboard</h1>
</p>

<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<br>
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat&logo=OpenAI&logoColor=white" alt="OpenAI">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>

</details>
<hr>

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️ | **Architecture**  | The project follows a modern architecture using Vite for frontend bundling and Express for backend API handling. It includes machine learning with TensorFlow and AI capabilities through OpenAI integration, facilitating real-time data analysis. |
| 🔩 | **Code Quality**  | The codebase maintains a good quality with linting using ESLint and follows best practices for React development. It uses modern JavaScript features and libraries ensuring clean and readable code. |
| 🧩 | **Modularity**    | The codebase exhibits modularity with clear separation between frontend and backend functionalities. Components are well-defined in the frontend, and backend services are organized into distinct modules, promoting reusability and maintainability. |
| 📦 | **Dependencies**  | Key external libraries and dependencies include Vite, Express, TensorFlow, OpenAI, React, and others listed in the repository contents. These libraries provide essential functionalities for the project's frontend and backend components. |

---

##  Repository Structure

```sh
└── epicureKiosk/
    ├── backend
    │   ├── .gitignore
    │   ├── index.js
    │   ├── package-lock.json
    │   └── package.json
    └── frontend
        ├── .gitignore
        ├── README.md
        ├── components.json
        ├── eslint.config.js
        ├── icon.svg
        ├── index.html
        ├── jsconfig.json
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── src
        ├── tailwind.config.js
        └── vite.config.js
```

---

##  Modules

<details closed><summary>backend</summary>

| File | Summary |
| --- | --- |
| [package.json](https://github.com/Chay2203/epicureKiosk/blob/main/backend/package.json) | Manages backend dependencies for the EpicureKiosk project, ensuring functionality of key features like machine learning with TensorFlow, API handling with Express, and AI capabilities through OpenAI integration. |
| [index.js](https://github.com/Chay2203/epicureKiosk/blob/main/backend/index.js) | Enables AI-powered insights generation for machine and sales data. Implements OpenAI GPT-4 model via Express API for real-time analysis. |
| [package-lock.json](https://github.com/Chay2203/epicureKiosk/blob/main/backend/package-lock.json) | Code File SummaryThe code file `index.js` in the `backend` directory of the repository `epicureKiosk` serves as the entry point for the backend functionality of the Epicure Kiosk project. It handles the core logic and functionalities of the backend system, facilitating communication with the frontend components to enable seamless user interaction through the kiosk interface. By orchestrating data processing, business logic, and API integrations, this file plays a pivotal role in delivering a robust and efficient backend architecture for the Epicure Kiosk project. |

</details>

<details closed><summary>frontend</summary>

| File | Summary |
| --- | --- |
| [jsconfig.json](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/jsconfig.json) | Enables path aliases for cleaner imports in the frontend codebase. Establishes base URL and maps @/ to the./src/ directory. Enhances code readability and maintainability by simplifying module imports. |
| [components.json](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/components.json) | Defines component configuration, sets styles & aliases for the frontend. Integrates Tailwind CSS, enabling color customization & CSS variables. Links component paths using aliases for easier referencing across the repository. |
| [index.html](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/index.html) | Defines the frontends HTML structure, setting up the viewport, icon, title, and script reference for the Epicure Admin Panel app. |
| [postcss.config.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/postcss.config.js) | Configures PostCSS with TailwindCSS and Autoprefixer plugins for styling in the frontend of the EpicureKiosk app. |
| [vite.config.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/vite.config.js) | Optimizes Vite configuration for React apps by setting up aliases and plugins. Enhances development workflow and module resolution within the frontend architecture of the Epicure Kiosk project. |
| [package.json](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/package.json) | Enables Vite development and build scripts, sets up linting, and integrates essential dependencies for the frontend of the food kiosk app in the EpicureKiosk repository. |
| [eslint.config.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/eslint.config.js) | Defines ESLint configuration with modern JavaScript features, React rules, and plugins. Ensures code quality in frontend development, setting ECMAScript version, React version, and custom rules. Complements Epicure Kiosks frontend architecture. |
| [tailwind.config.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/tailwind.config.js) | Defines Tailwind CSS theme with custom colors, animations, and keyframes for frontend styling in the EpicureKiosk app. Enables dark mode and applies configurable border radius. Integrates tailwindcss-animate plugin for animated effects. |
| [package-lock.json](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/package-lock.json) | The code file in question, `index.js`, within the `backend` directory of the `epicureKiosk` repository, serves as the main entry point for the backend functionality of the Epicure Kiosk project. It orchestrates the core business logic and communication with the frontend to provide a seamless and efficient experience for users interacting with the kiosk application. This file plays a vital role in handling requests, processing data, and ensuring the smooth operation of the backend services that power the Epicure Kiosk system. |

</details>

<details closed><summary>frontend.src</summary>

| File | Summary |
| --- | --- |
| [App.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/App.jsx) | Illustrates main UI logic by rendering the dashboard component. Facilitates user interaction and navigation within the frontend interface of the Epicure Kiosk application. |
| [App.css](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/App.css) | Defines styling for the root element and logo in the frontend UI. Implements hover effects, animations, and media query for reduced motion. Enhances visual appeal and user experience within the Epicure Kiosk frontend application. |
| [index.css](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/index.css) | The `index.css` file in the `frontend/src` directory of the Epicure Kiosk repository establishes the base styles and components using Tailwind CSS. This file plays a critical role in maintaining consistent styling and design across the frontend components of the application. |
| [mockData.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/mockData.js) | The `mockData.js` file located in `frontend/src/` within the `epicureKiosk` repository provides mock sales data for the kiosk applications frontend. It includes information such as recipe ID, machine name, quantity sold, and date to simulate sales data. This data is essential for testing and development purposes, enabling the frontend components to interact realistically with sales data without relying on actual transactions. |
| [main.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/main.jsx) | Enables rendering of the main application component with strict mode in a React environment to ensure best practices for performance and debugging, connected to the root element in the DOM. |

</details>

<details closed><summary>frontend.src.pages</summary>

| File | Summary |
| --- | --- |
| [DashBoard.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/pages/DashBoard.jsx) | The DashBoard.jsx file in the frontend/src/pages directory of the Epicure Kiosk repository serves as the main dashboard interface for managing machines, recipes, and sales data. It provides a visual representation of machine statuses, detailed machine information, recipe management functionalities, and dispenser control. The dashboard integrates mock data for quick visualization and includes icons for various actions and indicators. This component encapsulates a comprehensive view of the kiosk system's operations and functionalities. |

</details>

<details closed><summary>frontend.src.components</summary>

| File | Summary |
| --- | --- |
| [RecipieManagement.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/RecipieManagement.jsx) | The `RecipeManagement.jsx` file in the `frontend/src/components` directory of the EpicureKiosk repository focuses on facilitating recipe management within the kiosk application. It enables users to interact with a variety of UI components such as buttons, inputs, cards, tables, dialogs, labels, icons, and alert dialogs to efficiently manage recipes. This file plays a crucial role in enhancing the user experience by providing a seamless interface for creating, editing, and deleting recipes. |
| [DispenserManagement.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/DispenserManagement.jsx) | This code file `DispenserManagement.jsx` in the `frontend/src/components` directory of the Epicure Kiosk repository focuses on client-side interactions for managing dispensers. It provides a user interface for viewing and editing dispenser information, including functionalities like adding, updating, and deleting dispenser data. The file leverages various UI components such as buttons, inputs, cards, tables, dialogs, labels, and icons to facilitate an intuitive dispenser management experience for users accessing the kiosk frontend. |
| [MachineDetails.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/MachineDetails.jsx) | Displays detailed information about a machines status, name, and temperature using a card layout. Facilitates clear visualization and understanding of essential machine data in the frontend of the Epicure Kiosk application. |
| [MachineList.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/MachineList.jsx) | Display machine information dynamically, allowing users to select machines. Shows machine name, status with color indicators, and temperature. Supports seamless navigation for interacting with machines in the Epicure Kiosk frontend. |

</details>

<details closed><summary>frontend.src.components.ui</summary>

| File | Summary |
| --- | --- |
| [label.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/label.jsx) | Defines a custom Label component for UI styling in React frontend codebase, enhancing accessibility and user experience. Styled using class-variance-authority for consistent appearance and behavior across the application. |
| [dialog.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/dialog.jsx) | The `dialog.jsx` file within the `frontend/src/components/ui` directory of the Epicure Kiosk repository is crucial for managing dialog components using Radix UI library within the frontend architecture. It handles the rendering and behavior of dialogs, including triggers, portals, close buttons, and overlays. This code promotes a seamless user experience by encapsulating dialog functionality and ensuring a user-friendly interaction flow within the application. |
| [alert-dialog.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/alert-dialog.jsx) | This code file, **alert-dialog.jsx**, within the **frontend/src/components/ui/** directory of the *epicureKiosk* repository, is responsible for managing an alert dialog component in the frontend section of the application. It utilizes the **@radix-ui/react-alert-dialog** library to create and control the functionality of alert dialogs. The main features include triggering the display of the alert dialog, rendering the portal for the dialog content, and overlaying elements for better user interaction. It ensures a seamless user experience when presenting important information or notifications to users within the Epicure Kiosk application. |
| [table.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/table.jsx) | Defines customizable React components for creating tables with header, body, footer, rows, cells, and captions. Encapsulates styling and behavior, enhancing frontend modularity in the EpicureKiosk project architecture. |
| [tabs.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/tabs.jsx) | Defines UI tabs components for React app using @radix-ui/react-tabs. Includes TabsList, TabsTrigger, TabsContent for seamless navigation and content display. Integrates various styles and functionalities to enhance user experience. |
| [input.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/input.jsx) | Enables dynamically-styled input component for EpicureKiosk frontend. Uses React for custom styling and reusable input fields. Integration with utility functions streamlines classnames and enhances user experience. |
| [separator.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/separator.jsx) | Implements custom Separator UI component, enhancing visual hierarchy and layout in the frontend. Integrates Radix UI library for flexible orientation, styling, and decorative functionality, supporting seamless user experience in the Epicure Kiosk application. |
| [skeleton.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/skeleton.jsx) | Generates a skeleton loading effect for UI components, enhancing user experience by simulating content loading during data retrieval in the Epicure Kiosk frontend architecture. |
| [switch.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/switch.jsx) | Implements a reusable Switch component using React for UI in the frontend src. Integrates with @radix-ui/react-switch primitives for enhanced accessibility and styling, enhancing the repositorys frontend architecture. |
| [checkbox.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/checkbox.jsx) | Defines a custom Checkbox UI component integrated with Radix UI library. Supports dynamic styling and accessibility features. Enhances the frontend by encapsulating checkbox functionalities into a reusable component. |
| [card.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/card.jsx) | Defines reusable UI card components with various sections for frontend React application, promoting code modularity and consistency. Enhances user experience by facilitating easy creation of aesthetically cohesive card elements while maintaining clean and scalable codebase architecture. |
| [alert.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/alert.jsx) | Defines alert component variants for different styles in React. Exports Alert, AlertTitle, and AlertDescription components for displaying alerts with customizable styling. This file enhances frontend UI components in the repository architecture. |
| [button.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/button.jsx) | Defines button variants and styling with class variance authority for consistent UI across components. Supports different button sizes and styles, enhancing frontend accessibility and user experience in the Epicure Kiosk application. |
| [accordion.jsx](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/components/ui/accordion.jsx) | Enables customizable accordion components for interactive UI, integrating Radix UI for seamless user experience. Facilitates collapsible content sections with animated triggers and transitions. Discover smooth navigation and dynamic content display. |

</details>

<details closed><summary>frontend.src.lib</summary>

| File | Summary |
| --- | --- |
| [utils.js](https://github.com/Chay2203/epicureKiosk/blob/main/frontend/src/lib/utils.js) | Combines CSS class strings using Tailwind CSS utility classes, enhancing readability and maintainability in the frontend codebase. |

</details>

---

##  Getting Started

###  Installation

Build the project from source:

1. Clone the epicureKiosk repository:
```sh
❯ git clone https://github.com/Chay2203/epicureKiosk
```

2. Navigate to the project directory:
```sh
❯ cd epicureKiosk
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command:

### Frontend


```sh
cd frontend
```
```sh
npm run dev
```

 
### Backend

Create a .env file and insert your OPENAPI KEY


```sh
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
```

```sh
cd backend
```
```sh
node app.js
```
