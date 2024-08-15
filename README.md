# Hi developers👋

- This repository will implement an infinite scrolling and searchable product list.
- Demo: https://locbui-burning-bros-test.netlify.app/

## Table Of Contents
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Unit Testing](#unit-testing)
- [Project Setup](#project-setup)

## Tech Stack

-   **Vue3**
-  **Vitest**
-   **TailwindCSS**
-   **Pinia**: Store library and state management framework for Vue.js.

## Folder Structure
Using atomic design pattern, more detail:
-   **assets**: Contains static resources like images, styles, also fonts if needed
-   **components**: 
	- **_tests_**: Includes the unit test for currency
	-  **atoms**: Includes smallest unit component, can’t be broken down further without losing their meaning
	-  **molecules**: Combination of two or more atoms held together
	- 	 **Icon**: Define the svg icon file
-   **composables**: Includes the unit test for currency
	-  toUSD: A custom functional to handle the display currency
-   **layout**:  Layout definement for  consistent using purpose
-   **router**:  Allows defining and managing routes.
-    **types**: Type definements to accurate type information when you are coding
- -  **views**:  Display the views components

## Unit Testing
**Vitest**: I am using Vitest for unit testing. You can find the spec file test in **_tests** folder i mention above

- **toUSD**:
	- **Should format integer values as USD without cents** 
		- (Ex: 1000 -> $1,000)
	- **Should format decimal values as USD with two decimal places** 
		- (Ex: 1000.5-> $1,000.50)

## Project Setup
### Create a .env file in the root directory of project.
- Add the following line to .env file:

  
```sh
VITE_BASE_URI='https://dummyjson.com'
```

![image](https://github.com/user-attachments/assets/23b6b2d4-9406-4cc3-a679-355fd1c7c010)

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```



### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
