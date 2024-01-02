export const processAreaMultiplier = (area: string) => {
  const repeatArea = (areaName: string): string => {
    const [name, countStr] = areaName.split("*");

    if (!name) return "";
    if (!countStr) return name;

    const count = parseInt(countStr, 10);
    if (isNaN(count)) throw new Error(`Invalid area count: ${countStr}`);

    return `${name} `.repeat(count).trim();
  };

  const areaResolved = area
    .split(" ")
    .map((val) => (val.includes("*") ? repeatArea(val) : val))
    .join(" ");

  return areaResolved;
};
