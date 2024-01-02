<div align="center">
 <h1>TailwindCSS Grid Areas</h1>
</div>

<div align="center">
  <a href="https://github.com/JaleXHolguin/tailwindcss-grid-areas/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/JaleXHolguin/tailwindcss-grid-areas" />
  </a>
  <br />
  <br />
</div>

A Tailwind CSS plugin that simplifies the creation of utility classes for defining grid areas in layouts. It streamlines the process of specifying grid areas by generating corresponding utility classes that seamlessly integrate with Tailwind styles.

- [Install](#install)
- [Working with Arbitrary Values](#working-with-arbitrary-values)
- [Using Custom Template Areas](#using-custom-template-areas)
- [Using Responsive Design](#using-responsive-design)

## Install

Install `tailwindcss-grid-areas` using npm package manager:

```shell
npm i -D tailwindcss-grid-areas
```

Import and add the plugin in your [Tailwind Config](https://tailwindcss.com/docs/configuration#plugins):

```ts
import type { Config } from "tailwindcss";
import gridAreas from "tailwindcss-grid-areas";

const config: Config = {
  plugins: [gridAreas()],
};

export default config;
```

### Working with arbitrary values

By default, you can use arbitrary values for **grid-template-areas** and **grid-areas**. Employ the utility class **grid-areas-[]** to configure **_grid-template-areas_** and use **area-[]** for styling the **_grid-area_** property.

```jsx
<header className="grid-areas-[ham_logo_actions]">
  <button> className="area-[ham]"</button>
</header>
```

```css
/* The class grid-areas-[ham_logo_actions] will generate */
grid-template-areas: "ham logo actions";
/* The class area-[ham] will generate */
grid-area: ham;
```

Employ commas to distinguish distinct areas and utilize underscores to subdivide those areas into multiple sections.

```jsx
<header className="grid-areas-[ham_logo_actions,search_search_search]"></header>
```

```css
/* The class grid-areas-[ham_logo_actions,search_search_search] will generate */
grid-template-areas: "ham logo actions" "search search search";
```

If you have multiple consecutive areas with the same name, as in the case of the "search" area in `grid-areas-[ham_logo_actions,search_search_search]`, you can simplify it using the notation **"search\*3"**. For example, `grid-areas-[ham_logo_actions,search*3]`.

### Using custom template areas

Within the configuration object, use the gridAreas plugin to specify custom template areas for different sections of your layout. For instance, let's consider a header section with specific areas:

```ts
import type { Config } from "tailwindcss";
import gridAreas from "@jalex/tailwind-grid-areas";

const config: Config = {
  plugins: [gridAreas({
    header: [
      "ham logo actions",
      "search search search"
    ]
  )],
};
export default config;
```

Now you can directly use the custom template areas as follows:

```jsx
<header className="grid-areas-header">
  <button className="area-ham"></button>
  <a className="area-logo"></a>
  <input className="area-search" />
  <div className="area-actions"></div>
</header>
```

```css
/* The class grid-areas-header will generate */
.grid-areas-header {
  grid-template-areas: "ham logo actions" "search search search";
}

/* And it automatically generates the utility classes for each area of the template.*/
.area-actions {
  grid-area: actions;
}
.area-ham {
  grid-area: ham;
}
.area-logo {
  grid-area: logo;
}
.area-search {
  grid-area: search;
}
```

#### Using Responsive Design

To define a custom template area with responsive behavior, specify the template name as a key, and its corresponding value should be an object containing breakpoints as keys. The values for these breakpoints are arrays that represent the areas and sections of the template:

```ts
import type { Config } from "tailwindcss";
import gridAreas from "@jalex/tailwind-grid-areas";

const config: Config = {
  plugins: [
    gridAreas({
      header: {
        // [breakpoint]: areas
        base: ["ham search"], // Used to define the base template
        md: ["ham logo actions", "search search search"],
        lg: ["logo nav search actions"],
      },
    }),
  ],
};

export default config;
```

When using this template:

```jsx
<header className="grid-areas-header"></header>
```

It will generate the following utility classes:

```css
.grid-areas-header {
  grid-template-areas: "ham search"; /* Base style */
}
@media (min-width: 768px) {
  .grid-areas-header {
    grid-template-areas: "ham logo actions" "search search search";
  }
}
@media (min-width: 1024px) {
  .grid-areas-header {
    grid-template-areas: "logo nav search actions";
  }
}

/* And the utility classes for each area of the template.*/
```

**Note:** The breakpoints used in the custom template area configuration must be defined in the Tailwind configuration. If you haven't modified the default screens, it will use those by default.
