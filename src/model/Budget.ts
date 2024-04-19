export interface Salaries {
    analyst: number;
    architect: number;
    developer: number;
    manager: number;
    qa: number;
    devOps: number;
}

export function calculateBudget(lifecycleLabor: number[], lifecycleTime: number[], salary: Salaries) {
    let result = 0;

    // Планирование и определение требований. Аналитик + менеджеры
    let staff = Math.round(lifecycleLabor[0] / lifecycleTime[0]);
    result += staff > 1 ?
      (staff - 1) * salary.manager + salary.analyst :
      staff * salary.analyst;

    // Проектирование продукта
    staff = Math.round(lifecycleLabor[1] / lifecycleTime[1]);
    result += staff > 1 ?
      (staff - 1) * salary.architect + salary.analyst :
      staff * salary.architect;

    // Детальное проектирование
    staff = Math.round(lifecycleLabor[2] / lifecycleTime[2]);
    if (staff > 2) {
      result += salary.manager + salary.analyst;
      staff -= 2;
    } else if (staff > 1) {
      result += salary.analyst;
      staff -= 1;
    }
    result += staff * salary.architect;

    // Кодирование и тестирование отдельных модулей
    staff = Math.round(lifecycleLabor[3] / lifecycleTime[3]);
    const developer = Math.round(staff * 0.7);
    let qa = staff - developer;
    result += developer * salary.developer + qa * salary.qa;

    // Интеграция и тестирование
    staff = Math.round(lifecycleLabor[4] / lifecycleTime[4]);
    const devOps = Math.round(staff * 0.6);
    qa = staff - devOps;
    result += devOps * salary.devOps + qa * salary.qa;

    return result;
  };
