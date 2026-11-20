---
description: Reduzca el tiempo de pruebas de CI distribuyendo archivos de prueba entre
  nodos o trabajadores de CI con datos de Test Optimization.
further_reading:
- link: https://www.datadoghq.com/blog/ci-cd-optimization/
  tag: Blog
  text: Entregue más rápido, mejore la confiabilidad y controle los costos de CI con
    Datadog CI/CD Optimization
title: Paralelización de pruebas
---
## Descripción general {#overview}

Test Parallelization le ayuda a acortar las ejecuciones de pruebas y a utilizar los recursos de CI de manera más eficiente al equilibrar los archivos de prueba entre los nodos de CI o los runners locales. Utiliza datos sobre la duración de la prueba de Test Optimization para equilibrar la carga de trabajo, de modo que los nodos de CI terminen aproximadamente al mismo tiempo.

Combine Test Parallelization con [Test Impact Analysis][1] para reducir aún más los costos de CI. Test Impact Analysis omite las pruebas que no se ven afectadas por el cambio de código. Test Parallelization reduce automáticamente la cantidad de nodos de CI para ajustarla a la carga de trabajo restante. Esto ahorra el costo y el tiempo de aprovisionar y configurar runners innecesarios.

## Configuración {#setup}

Antes de configurar Test Parallelization, configure [Test Optimization][2]. Opcionalmente, configure también [Test Impact Analysis][1] si planea usarlo con Test Parallelization. Luego, [elija su proveedor de CI, lenguaje y marco de trabajo][3] y siga las instrucciones.

## Compatibilidad {#compatibility}

Test Parallelization es compatible con los siguientes lenguajes y frameworks:

| Lenguaje | Marcos de trabajo | Versión mínima de la biblioteca |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.42.0` o posterior |
| Python   | pytest | `ddtrace` paquete `4.11.0` o posterior |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest, WebdriverIO | `dd-trace` paquete `6.14.0` o posterior |

[WebdriverIO](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio) requiere el runner local con Mocha o Jasmine.

## Cómo funciona {#how-it-works}

Test Parallelization utiliza la CLI de `ddtest` para planificar y ejecutar pruebas:

1. Ejecute `ddtest plan` una vez para crear un plan `.testoptimization/` nuevo para ese flujo de trabajo, conjunto y entorno de ejecución.
2. Comparta el directorio `.testoptimization/` con cada trabajo de CI que ejecute pruebas.
3. Ejecute `ddtest run --ci-node <CI_NODE_INDEX>` en cada trabajo de CI para ejecutar solo los archivos asignados a ese nodo de CI.

Para ejemplos de un solo nodo y de múltiples nodos, consulte [Configurar Test Parallelization][3].

## Próximos pasos {#next-steps}

{{< whatsnext desc="Instale ddtest, configure su proveedor de CI y personalice cómo Test Parallelization divide los archivos de prueba." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}Configure la paralelización de prueba{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}Configure la paralelización de prueba{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Prácticas recomendadas para Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Solución de problemas de paralelización de prueba{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/test_impact_analysis/
[2]: /es/tests/setup/
[3]: /es/tests/test_parallelization/setup/