---
algolia:
  rank: 70
  tags:
  - flaky test
  - flaky tests
  - regresión de test
  - regresiones de test
  - servicio de test
  - servicios de test
aliases:
- /es/tests/search/
description: Obtén información sobre el rendimiento de los tests en tus repositorios.
further_reading:
- link: /continuous_integration/explorer
  tag: Documentación
  text: Buscar y filtrar ejecuciones de tests
- link: /continuous_integration/guides/flaky_test_management
  tag: Documentación
  text: Aprender a gestionar los flaky tests
title: Repositorios
---

## Información general

Utiliza la [página Repositories (Repositorios)][1] para conocer las tendencias de los tests de tus repositorios o investigar confirmaciones individuales para depurar problemas.

## Rendimiento y tendencias de los tests

La [vista Repositories (Repositorios)][1] muestra las métricas de estado agregadas para la rama predeterminada de cada repositorio. Esta vista es útil para obtener una visión general de alto nivel del rendimiento de los test y las tendencias en los repositorios de tu organización.

Utiliza la página Repositories (Repositorios) para hacer lo siguiente:
- Ver el número total de tests defectuosos en cada repositorio.
- Comprobar si los tests son más o menos fiables con el paso del tiempo.
- Consultar el estado del test de la confirmación más reciente en cada repositorio.
- Ver cuántos {{< tooltip glossary="servicios de test" >}} están asociados a cada repositorio.

<!-- vale Datadog.pronouns = NO -->

Para filtrar la lista a solo los repositorios que confirmaste, activa **My Repositories** (Mis repositorios) e ingresa la dirección de correo electrónico asociada a tu cuenta de GitHub. Puedes ingresar varias direcciones de correo electrónico. Luego, haz clic en **Edit Authors** (Editar autores) para editar tu dirección.

<!-- vale Datadog.pronouns = YES -->

### Investigar un repositorio

Selecciona un repositorio para obtener información detallada sobre el rendimiento de tus tests. Utiliza los menús desplegables **Branch** (Rama), **Test Service** (Servicio de test) y **Env** (Entorno) para filtrar los datos deseados. Si seleccionas el filtro comodín (**\***), obtendrás una vista agregada de esa categoría.

La página de un repositorio específico te da acceso a lo siguiente:
- **Latest Commit** (Última confirmación): el estado de los tests y el rendimiento de la última confirmación.
- **Commits** (Confirmaciones): una lista de confirmaciones recientes y sus estadísticas de tests.
- **Test Services** (Servicios de test): un resumen de cualquier servicio de test que hayas añadido al repositorio.
- **Flaky Tests** (Tests defectuosos): información sobre los [tests defectuosos][2] del repositorio.
- **Test Regressions** (Regresiones de tests): información sobre las {{< tooltip glossary="regresiones de tests" >}}.
- **Test Performance** (Rendimiento de los tests): mira qué tests se volvieron más rápidos o más lentos con el tiempo.
- **Common Error Types** (Tipos de errores comunes): consulta los tipos de errores más comunes del repositorio.
- **All Test Runs** (Todas las ejecuciones de tests): explora todas las ejecuciones de tests del repositorio.

### Parámetros del repositorio

La página [Test Optimization settings][3] (Parámetros de Test Optimization) te ofrece una visión general de las características habilitadas en cada uno de tus repositorios junto con cualquier anulación que hayas aplicado. Selecciona un repositorio para configurar las siguientes capacidades del repositorio:
- **[GitHub Comments][4]** (Comentarios de GitHub): muestra resúmenes de los resultados de tus tests directamente en las solicitudes de extracción.
- **[Auto Test Retries][5]** (Reintentos automáticos de tests): reintenta los tests que fallan para evitar que falle la compilación debido a tests defectuosos.
- **[Early Flake Detection][6]** (Detección temprana de defectos): identifica los tests defectuosos en las primeras fases del ciclo de desarrollo.
- **[Test Impact Analysis][7]** (Análisis del impacto de los tests): selecciona y ejecuta automáticamente solo los tests relevantes para una confirmación determinada en función del código que se está modificando.

#### Anulaciones de los servicios de test

Si tienes servicios de test que requieren su propia configuración, puedes anular los parámetros predeterminados del repositorio.

Para crear una anulación:
1. En la página [Test Optimization settings][3] (Parámetros de Test Optimization), selecciona un repositorio con un servicio de test.
1. Haz clic en **Edit Custom Settings** (Editar parámetros personalizados).
1. Selecciona el servicio de test al que deseas aplicar una anulación y amplíalo para ver los ajustes disponibles.
1. Selecciona los parámetros deseados.

Puedes ver el número de anulaciones vigentes en cada repositorio desde la página [settings][3] (parámetros).

## Depuración de confirmaciones

Utiliza la [vista Branches (Ramas)][9] para investigar y depurar los problemas introducidos a partir de confirmaciones individuales.

En la tabla de la vista **Branches** (Ramas), se muestra la actualización más reciente de cada una de tus ramas. Para cada rama, la tabla incluye lo siguiente:
- El repositorio, la rama, el servicio de test y el entorno asociados
- Contadores de tests fallidos, defectuoso por primera vez, omitidos y superados
- Un contador para las regresiones
- El tiempo total de las ejecuciones los tests
- La fecha de la última actualización de la rama

<!-- vale Datadog.pronouns = NO -->

Para filtrar la lista a solo las ramas que confirmaste, activa **My Branches** (Mis ramas) e ingresa la dirección de correo electrónico asociada a tu cuenta de GitHub. Puedes ingresar varias direcciones de correo electrónico. Luego, haz clic en **Edit Authors** (Editar autores) para editar tu dirección.

<!-- vale Datadog.pronouns = YES -->

### Depuración

Si quieres depurar una confirmación, selecciona una rama para abrir la página **Commit Overview** (Resumen de confirmaciones). En la descripción general de la confirmación, se muestran detalles como la solicitud de extracción en la que se introdujo la confirmación, así como los archivos modificados, el estado de un test y el rendimiento del test.

Desde esta página, también puedes acceder a lo siguiente:
- **Failed Tests** (Tests fallidos): una lista de tests fallidos. Selecciona un test para ver los detalles y las trazas (traces).
- **[Nuevos tests defectuosos][7]**: una lista de nuevos tests defectuosos introducidos en la confirmación.
- **Test Regressions** (Regresiones de tests): información sobre las {{< tooltip glossary="regresiones de tests" >}} introducidas a partir de una confirmación.
- **Test Performance** (Rendimiento de los tests): mira cómo la confirmación afecta al rendimiento de los tests.
- **Related Pipeline Executions** (Ejecuciones de pipeline relacionadas): consulta las ejecuciones de pipeline de CI para la confirmación.
- **All Test Runs** (Todas las ejecuciones de tests): explora todas las ejecuciones de tests de la confirmación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/test-repositories?view=repositories
[3]: /es/tests/flaky_test_management
[4]: https://app.datadoghq.com/ci/settings/test-optimization
[5]: /es/tests/developer_workflows/#test-summaries-in-github-pull-requests
[6]: /es/tests/flaky_test_management/auto_test_retries/
[7]: /es/tests/flaky_test_management/early_flake_detection/
[8]: /es/tests/test_impact_analysis/
[9]: https://app.datadoghq.com/ci/test-repositories?view=branches