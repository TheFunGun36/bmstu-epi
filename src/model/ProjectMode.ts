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

export default ProjectMode;
