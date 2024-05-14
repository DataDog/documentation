---
algolia:
  tags:
  - tests continuos
further_reading:
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic en una canalización de CI/CD
- link: /synthetics/api_tests
  tag: Documentación
  text: Más información sobre los tests de API
- link: /synthetics/multistep
  tag: Documentación
  text: Más información sobre los tests de API multipaso
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre los tests Synthetic en la canalización de integración
    continua (CI)
kind: documentación
title: Empezando con los tests continuos
---
{{< jqmath-vanilla >}}

## Información general

Los tests continuos te permiten ejecutar y monitorear los mismos [test Synthetic][1] que has configurado en los entornos de preparación, QA y preproducción de forma automática, para alertar bien a tu equipo y bloquear los despliegues de canalizaciones si los cambios de código causan errores de prueba.

Los tests sin código pueden servir para lo siguiente:
* [Lanzar solicitudes API en tus sistemas][2]
* [Simular escenarios de navegación dentro de tu aplicación web][3]
* [Probar la funcionalidad de tus aplicaciones para iOS y Android][4].

Una vez ejecutados los tests, mira los resultados y los lotes de CI en el [Explorador de monitorización Synthetic y tests continuos][5].

Mejora el flujo de trabajo de tus desarrolladores con los tests continuos:
* Utiliza el [Paquete NPM de `datadog-ci`][6] para ejecutar estos tests directamente en tu canalización de CI.
* Utiliza [Datadog Synthetics frente a la integración de código][7] para ejecutar tests en tu IDE.

Los test continuos también ofrecen [paralelización][24], que permite ejecutar varios tests en tus canalizaciones de CI/CD de forma simultánea, en lugar de en forma secuencial, para acelerar los procesos de creación, prueba y despliegue.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][8].

## Crear un test de Tests continuos

Para configurar un test de Tests continuos, primero crea un test Synthetic en Datadog. En este ejemplo, crea un [test de navegador][3] en el sitio `https://www.shopist.io`, una aplicación web de comercio electrónico de prueba.

Los tests de navegador simulan el recorrido de un usuario a través de su aplicación web comenzando en tu **URL de inicio**. Si garantizas que tu **URL de inicio** es un recurso del entorno de preparación, te resultará más fácil probar los cambios antes de pasarlos a producción.

### Configura los detalles de tu test

1. En el sitio de Datadog, sitúa el cursor sobre **Monitorización UX** y haz clic en **Tests continuos**.
2. En la esquina superior derecha, haz clic en **Nuevo test** > **Prueba de navegador**.
3. Define tu test de navegador:

    - Añade la URL del sitio web que desea monitorear en el campo URL de inicio. En este ejemplo, introduce `https://www.shopist.io`.
    - Selecciona **Opciones avanzadas** para establecer opciones de solicitud personalizadas, certificados, credenciales de autenticación, etc. En este ejemplo, no se necesita ninguna opción avanzada específica.
    - Nombra tu prueba y establece una etiqueta (tag) de equipo como **team-checkout**. Las etiquetas (tags) te permiten mantener tu conjunto de tests organizado y encontrar los tests que te interesan a través del Explorador de monitorización Synthetic y tests continuos.
    - Elija los navegadores y dispositivos que desea probar.

4. Continúa [rellenando los datos de test y tu grabación como lo haría normalmente][9].

{{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:100%;" >}}


## Ejecuta tus pruebas de Tests continuos

Para mejorar tu flujo de trabajo de desarrollo, puedes utilizar `datadog-ci` en tu CLI como un entorno de CI para configurar el test. A continuación, ejecuta el test directamente en tu IDE como un entorno de desarrollo.

### Ejecución de pruebas en la CLI

Amplía el uso de los tests continuos mediante el [paquete NPM de `datadog-ci`][6]. `datadog-ci` te permite ejecutar comandos desde tus scripts de CI/CD para probar tu aplicación antes del despliegue. Puedes automatizar el bloqueo y la reversión de cambios cuando las pruebas den error. Lee la página [página de Configuración de `datadog-ci` para instrucciones de instalación y configuración][10].

Puedes utilizar `datadog-ci` para ejecutar solo los tests etiquetados con [Etiquetas (tags) de equipo][25] específicas. Por ejemplo, para ejecutar todos los tests etiquetados como `team-checkout`:

1. Navega hasta la línea de comandos.
2. Ejecuta lo siguiente:

   ```
   datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```

Para obtener más información sobre la ejecución del comando Synthetics y el uso de reporteros, consulta la [Documentación de configuración][11].

### Ejecutar pruebas en tu IDE

Por separado, puedes utilizar la [Integración Datadog Synthetics frente a código][12] para ayudarte a:

* Utiliza una [Localización privada][13] o [Túnel][14] para acelerar el desarrollo a nivel local.
* Ejecuta tests de API HTTP y tests de navegador y ve tus resultados dentro de VS Code.
* Prueba solo lo importante ejecutando los tests pertinentes al mismo tiempo.

{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### Ejecución de pruebas en VS Code

1. Abre VS Code e instala la extensión Datadog desde la vista de extensiones de VS Code.
2. Abre la extensión Datadog Synthetics e inicia sesión cuando se indique.
3. Selecciona un test Synthetic para ejecutarlo.
4. Establece una URL de inicio.
5. Haz la prueba.

## Examina los resultados en el Explorador de monitorización Synthetic y tests continuos

El Explorador de monitorización Synthetic y los tests continuos te permite crear visualizaciones y filtrar [lotes de CI][22] y [ejecuciones de tests][23] para tus tests Tests continuos. Navega a **Monitorización UX** > **Tests continuos**.

Selecciona **Lotes de CI** o **Ejecuciones de test** para ver los resultados de tus lotes de CI o ejecutar tests en el Explorador. Selecciona un lote de CI o un test de la lista para obtener una vista más detallada del resultado.

{{< img src="continuous_testing/ci_explorer_test_results.png" alt="ci_explorer_test_results" style="width:100%;" >}}

### Crear una consulta de búsqueda

Haz clic en una de las siguientes consultas de búsqueda listas para usar para filtrar tus lotes de CI o ejecuciones de test:
- [Todas las pruebas fallidas][19]
- [Pruebas inicialmente fallidas pero ahora superadas][20]
- [Pruebas no utilizadas][21]

{{< img src="continuous_testing/example_search_queries.png" alt="example-search-queries" style="width:100%;" >}}

Opcionalmente, puedes crear una consulta para [Buscar tus ejecuciones de test][15]. Con el test de navegador que has creado anteriormente, localiza el ID del test y crea una consulta de búsqueda mediante las facetas comunes de ejecución de tests. Para encontrar el ID de tu test de navegador:
1. Ve a la página Test Synthetic.
2. Selecciona un test.
3. Busca el ID del test en la sección **Propiedades**.

{{< img src="continuous_testing/example_test_id.png" alt="example_test_id" style="width:70%;" >}}

Para exportar tu vista del Explorador de monitorización Synthetic y tests continuos, haz clic en **>Vistas** y haz clic en **Guardar**. Para obtener más información, consulta [Vistas guardadas][16].

Para obtener más información sobre el uso de facetas en te consulta de búsqueda, consulta [Buscar ejecuciones de test][17].

## Establecer preferencias de paralelización

Por defecto, los tests Synthetic no están paralelizados. La paralelización permite ejecutar varios tests en tus canalizaciones de CI/CD simultáneamente. Si deseas paralelizar tus tests, puedes utilizar la calculadora **Estimar paralelización** para determinar tus necesidades.

Navega a **Monitorización UX** > **Configuración** y haz clic en **Configuración de paralelización** para localizar la calculadora.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

Por ejemplo, si tienes 24 tests por lote de CI, cada uno de los cuales tarda 2 minutos en completarse, y su objetivo es que todos los tests se completen en 4 minutos, necesitas ejecutar 12 tests en paralelo.

$$\text"paralelización estimada" = {\text"24 tests por lote de CI"* \text"duración de 2 minutos"} / \text"duración estimada de 4 minutos en tu canalización de CI"$$

Una vez que hayas terminado de estimar tu paralelización, introduce el número de ejecuciones de test que deseas ejecutar al mismo tiempo en el modo de Paralelización. A continuación, haz clic en **Guardar selección**.

Consulta la [Documentación sobre paralelización][18] para obtener más detalles.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/
[2]: /es/getting_started/synthetics/api_test/
[3]: /es/getting_started/synthetics/browser_test/
[4]: /es/mobile_app_testing/
[5]: /es/synthetics/explorer?track=synbatch
[6]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm
[7]: /es/developers/ide_plugins/
[8]: https://datadoghq.com
[9]: /es/getting_started/synthetics/browser_test/#create-a-browser-test
[10]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#install-the-package
[11]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#reporters
[12]: /es/developers/ide_plugins/vscode/
[13]: /es/getting_started/synthetics/private_location/
[14]: /es/continuous_testing/
[15]: /es/continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /es/continuous_testing/explorer/saved_views/
[17]: /es/continuous_testing/explorer/search_runs/
[18]: /es/continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.httpStatusCode%3A%5B100%20TO%20399%5D%20%40result.result.passed%3Afalse&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=timeseries
[20]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20%40result.result.initialResultID%3A%2A%20%40result.status%3A0&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=stream
[21]: https://app.datadoghq.com/synthetics/explorer?query=%40ci.job.name%3A%2A&agg_m=count&agg_q=%40result.test_public_id&cols=&index=%2A&top_n=100&track=synbatch&viz=query_table
[22]: /es/glossary/?product=synthetic-monitoring#test-batch
[23]: /es/glossary/?product=synthetic-monitoring#test-run
[24]: /es/glossary/?product=synthetic-monitoring#parallelization
[25]: /es/account_management/teams/