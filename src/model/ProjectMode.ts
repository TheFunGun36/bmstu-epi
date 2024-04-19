export enum ProjectMode {
  DEFAULT,
  INTERMEDIATE,
  INTEGRAL
}

export function projectModeFromKloc(kloc: number) {
  if (kloc > 500)
    return ProjectMode.INTEGRAL;
  if (kloc > 50)
    return ProjectMode.INTERMEDIATE;
  return ProjectMode.DEFAULT;
}

export function projectModeDisplayName(mode: ProjectMode) {
  switch (mode) {
    case ProjectMode.DEFAULT:
      return 'Обычный'
    case ProjectMode.INTERMEDIATE:
      return 'Промежуточный'
    case ProjectMode.INTEGRAL:
      return 'Встроенный'
  }
}

export function laborCosts(mode: ProjectMode, eaf: number, kloc: number) {
  switch (mode) {
    case ProjectMode.DEFAULT:
      return 3.2 * eaf * Math.pow(kloc, 1.05);
    case ProjectMode.INTERMEDIATE:
      return 3.0 * eaf * Math.pow(kloc, 1.12);
    case ProjectMode.INTEGRAL:
      return 2.8 * eaf * Math.pow(kloc, 1.2);
  }
}

export function projectTime(mode: ProjectMode, laborCosts: number) {
  switch (mode) {
    case ProjectMode.DEFAULT:
      return 2.5 * Math.pow(laborCosts, 0.38);
    case ProjectMode.INTERMEDIATE:
      return 2.5 * Math.pow(laborCosts, 0.35);
    case ProjectMode.INTEGRAL:
      return 2.5 * Math.pow(laborCosts, 0.32);
  }
}

export default ProjectMode;
