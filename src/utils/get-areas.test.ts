import { describe, expect, it } from "vitest";
import { getAreas } from "./get-areas";

describe("get-areas", () => {
  it("should return an empty string if parameter is an empty string", () => {
    expect(getAreas("")).toBe("");
  });

  it("correctly handles template", () => {
    const areas = getAreas("area1 area3,area2*2");
    expect(areas).toBe(`"area1 area3" "area2 area2"`);
  });

  it("correctly handles template with dots", () => {
    const areas = getAreas("area1 . .,. area2*2");
    expect(areas).toBe(`"area1 . ." ". area2 area2"`);
  });

  it("correctly handles area name with dash", () => {
    const areas = getAreas("area-1 area3,area-2*2");
    expect(areas).toBe(`"area-1 area3" "area-2 area-2"`);
  });
});
