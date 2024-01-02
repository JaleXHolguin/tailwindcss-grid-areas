import { describe, expect, it } from "vitest";
import { processAreaMultiplier } from "./process-area-multiplier";

describe("processAreaMultiplier", () => {
  it("throw error if passed incorrect multiplier", () => {
    expect(() => processAreaMultiplier("area1*n area2*3")).toThrow("Invalid area count: n");
  });

  it("correctly handles area multipliers", () => {
    const result = processAreaMultiplier("area1*2 area2*3");
    expect(result).toBe("area1 area1 area2 area2 area2");
  });

  it("correctly handles area without multipliers", () => {
    const result = processAreaMultiplier("area1*2 area2");
    expect(result).toBe("area1 area1 area2");
  });
});
