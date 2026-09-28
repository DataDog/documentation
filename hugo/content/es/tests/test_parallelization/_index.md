---
description: Reduzca el tiempo de pruebas de CI distribuyendo archivos de prueba entre
  nodos o trabajadores de CI con datos de Test Optimization.
title: Paralelización de pruebas
---
## Descripción general {#overview}

La Paralelización de pruebas le ayuda a reducir el tiempo de pruebas de CI distribuyendo archivos de prueba entre nodos de CI o trabajadores locales. Utiliza datos de Test Optimization para detectar qué archivos de prueba deben ejecutarse, estimar su duración y crear un plan de ejecución.

La Paralelización de pruebas está diseñada para funcionar con [Test Impact Analysis][1]. Test Impact Analysis omite las pruebas que no se ven afectadas por un cambio de código. La Paralelización de pruebas divide los archivos de prueba restantes de manera uniforme entre los nodos de CI seleccionados.

Utilice la Paralelización de pruebas cuando su conjunto de pruebas tarde mucho tiempo en ejecutarse. Cuando se utiliza con Test Impact Analysis, la Paralelización de pruebas ejecuta solo los archivos con pruebas no omitidas. También ayuda a reducir los costos de CI al elegir solo la cantidad de nodos de CI necesarios, lo que puede disminuir los minutos totales de CPU.

## Configuración {#setup}

Antes de configurar la Paralelización de pruebas, configure [Test Optimization][2]. Opcionalmente, configure también [Test Impact Analysis][1] si planea usarlo con la Paralelización de pruebas. Luego siga [Configure la Paralelización de pruebas][3] para instalar `ddtest` y configurar su proveedor de CI.

## Compatibilidad {#compatibility}

La Paralelización de pruebas es compatible con los siguientes lenguajes y marcos de trabajo:

| Lenguaje | Marcos de trabajo | Versión mínima de la biblioteca |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.31.0` o posterior |
| Python   | pytest | `ddtrace` paquete `4.11.0` o posterior |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest | `dd-trace` paquete `5.111.0` o posterior para `v5` y `6.0.0` o posterior para `v6` |

Para JavaScript, `ddtest` requiere Cypress 12 o posterior, Mocha 8 o posterior, Playwright 1.18 o posterior y Vitest 1.6 o posterior. El soporte para Cucumber.js se prueba con las versiones 7 a 13. Estos marcos de trabajo requieren `ddtest` 1.6.0 o posterior. La versión de su marco de trabajo también debe cumplir con los [`dd-trace` requisitos de compatibilidad][4].

## Cómo funciona {#how-it-works}

La Paralelización de pruebas utiliza el CLI de `ddtest` para planificar y ejecutar pruebas:

1. Ejecute `ddtest plan` una vez para crear un `.testoptimization/` plan reutilizable.
2. Comparta el directorio `.testoptimization/` con cada trabajo de CI que ejecute pruebas.
3. Ejecute `ddtest run --ci-node <CI_NODE_INDEX>` en cada trabajo de CI para ejecutar solo los archivos asignados a ese nodo de CI.

Para ver ejemplos de nodo único y nodos múltiples, consulte [Configurar la Paralelización de pruebas][3].

## Próximos pasos {#next-steps}

{{< whatsnext desc="Instale ddtest, configure su proveedor de CI y personalice cómo la Paralelización de pruebas divide los archivos de prueba." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}Configure la paralelización de prueba{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}Configure la paralelización de prueba{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Prácticas recomendadas para la Paralelización de pruebas{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Solución de problemas de paralelización de prueba{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/tests/test_impact_analysis/
[2]: /es/tests/setup/
[3]: /es/tests/test_parallelization/setup/
[4]: /es/tests/setup/javascript/#compatibility