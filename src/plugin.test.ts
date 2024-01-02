import { describe, expect, it } from "vitest";
import { format, getPluginCss } from "./plugin.utils";
import type { GridAreasOptions } from "./types";

describe("gridAreas", () => {
  const html = String.raw;

  it("it should be possible to generate utility classes", async () => {
    // Definition of areas for the template grid
    const areas: GridAreasOptions = {
      header: ["menu nav", "search search"],
    };

    // Expected CSS structure
    const expected = `
    .grid-areas-header {
      grid-template-areas: "menu nav" "search search";
    }
    .area-search {
      grid-area: search;
    }
  `;

    // Generate CSS using the utility and areas provided
    const css = await getPluginCss(
      {
        content: [
          {
            raw: html`<div class="grid-areas-header">
              <input class="area-search" />
            </div>`,
          },
        ],
      },
      areas,
    );

    // Verify that the generated CSS matches the expected structure
    expect(css).toBe(await format(expected));
  });

  it("utility classes should be generated with media queries", async () => {
    // Definition of areas for the template grid with media queries
    const areas: GridAreasOptions = {
      header: {
        base: ["ham search"],
        sm: ["ham logo actions", "search search"],
        lg: ["logo nav search actions"],
      },
    };

    // Expected CSS structure with media queries
    const expected = `
    .grid-areas-header {
      grid-template-areas: "ham search";
    }
    @media (min-width: 640px) {
      .grid-areas-header {
        grid-template-areas: "ham logo actions" "search search";
      }
    }
    @media (min-width: 1024px) {
      .grid-areas-header {
        grid-template-areas: "logo nav search actions";
      }
    }
    .area-ham {
      grid-area: ham;
    }
    .area-search {
      grid-area: search;
    }
    .area-logo {
      grid-area: logo;
    }
    .area-actions {
      grid-area: actions;
    }
    .area-nav {
      grid-area: nav;
    }
  `;

    // Generate CSS using the utility and areas provided with media queries
    const css = await getPluginCss(
      {
        content: [
          {
            raw: html`<div class="grid-areas-header">
            <span class="area-ham"></span>
            <span class="area-logo"></span>
            <nav class="area-nav"></nav>
            <input class="area-search"></input>
            <div class="area-actions"></div>
          </div>`,
          },
        ],
      },
      areas,
    );

    // Verify that the generated CSS matches the expected structure
    expect(css).toBe(await format(expected));
  });

  it("If a breakpoint is not defined in the Tailwind configuration (theme.screens) it should generate an error", async () => {
    // Definition of areas for the template grid with media queries
    const areas: GridAreasOptions = {
      header: {
        base: ["ham search"],
        sm: ["ham logo actions", "search search"],
        "3xl": ["logo nav search actions"], // 3xl don´t exist in the default config
      },
    };

    // Expected CSS structure with media queries
    const expectedErrorMessage = `The screen 3xl not exist in your screens list of Tailwind Config, to solve add "3xl" to screens list`;

    await expect(
      getPluginCss(
        {
          content: [
            {
              raw: html`<div class="grid-areas-header"></div>`,
            },
          ],
        },
        areas,
      ),
    ).rejects.toThrowError(expectedErrorMessage);
  });

  it("works with arbitraries values", async () => {
    // Expected CSS structure
    const expected = `
    .area-auto {
      grid-area: auto;
    }
    .area-\\[1_\\/_2_\\/_1_\\/_2\\] {
      grid-area: 1 / 2 / 1 / 2;
    }
    .area-\\[ham\\] {
      grid-area: ham;
    }
    .area-\\[logo\\] {
      grid-area: logo;
    }
    .grid-areas-\\[ham_logo\\] {
      grid-template-areas: "ham logo";
    }   
  `;

    // Generate CSS
    const css = await getPluginCss({
      content: [
        {
          raw: html`<div class="grid-areas-[ham_logo]">
            <span class="area-[ham]"></span>
            <a class="area-[logo]"></a>
            <div class="area-auto"></div>
            <div class="area-[1_/_2_/_1_/_2]"></div>
          </div>`,
        },
      ],
    });

    // Verify that the generated CSS matches the expected structure
    expect(css).toBe(await format(expected));
  });

  it("works with arbitraries values and responsive", async () => {
    // Expected CSS structure
    const expected = `
   .area-\\[ham\\] {
      grid-area: ham;
    }
    .area-\\[logo\\] {
      grid-area: logo;
    }
    .grid-areas-\\[ham_logo\\] {
      grid-template-areas: "ham logo";
    }
    @media (min-width: 768px) {
      .md\\:grid-areas-\\[ham_logo_actions\\] {
        grid-template-areas: "ham logo actions";
      }
    }
  `;

    // Generate CSS using arbitaries values in the classNames
    const css = await getPluginCss({
      content: [
        {
          raw: html`<div class="grid-areas-[ham_logo] md:grid-areas-[ham_logo_actions]">
            <span class="area-[ham]"></span>
            <a class="area-[logo]"></a>
          </div>`,
        },
      ],
    });

    // Verify that the generated CSS matches the expected structure
    expect(css).toBe(await format(expected));
  });
});
