---
aliases:
- /es/synthetics/cicd_testing/ci_results_explorer
- /es/synthetics/ci_results_explorer
- /es/synthetics/explorer
description: Examina los trabajos de CI que ejecutan tests de Continuous Testing.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorpora las pruebas de Datadog Synthetic a tu pipeline de CI/CD
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Aprende a ejecutar tests de Synthetic en un pipeline de CI/CD
- link: /continuous_testing/explorer/search/
  tag: Documentación
  text: Aprende a buscar a través de tus lotes de tests
- link: /continuous_testing/explorer/search_runs/
  tag: Documentación
  text: Aprende a buscar en tus ejecuciones de tests
title: Explorador de monitorización Synthetic y resultados de tests
---

## Información general

El [Results Explorer][1] proporciona visibilidad de todas las ejecuciones de test y lotes de CI para **Monitorización Synthetic** y **Continuous Testing**. 

{{< tabs >}}
{{% tab "Lotes de CI" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Buscar y administrar tus lotes de CI en el Explorador de Monitorización Synthetic y resultados de tests" style="width:100%;">}}
{{% /tab %}}
{{% tab "Ejecuciones de test" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Buscar y administrar tus ejecuciones de tests en el Explorador de Monitorización Synthetic y resultados de tests" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

Puedes realizar las siguientes acciones:

* Comparar las ejecuciones de tests en varios dispositivos y navegadores para detectar problemas entre navegadores y dispositivos.
* Examinar los problemas de rendimiento con las facetas de temporización de resultados y filtrar las ejecuciones por códigos de estado de fallo.
* Prueba iniciar consultas de búsqueda para empezar a buscar en el Explorador.

## Crear una consulta de búsqueda

Navega hasta [**Digital Experience > Synthetic Monitoring & Testing** > **Continuous Testing**][1] y haz clic en una consulta de búsqueda para empezar a ver tus lotes o ejecuciones de tests y crear visualizaciones.

{{< img src="continuous_testing/explorer_search_query_1.png" alt="Consultas de búsqueda predefinidas disponibles en el Explorador" style="width:100%;">}}

- Ve los tests fallidos que se ejecutan en un pipeline de CI filtrando su estado de bloqueo y confirmando si están bloqueando tus nuevos lanzamientos.
- Analiza las ejecuciones de test fallidos con códigos de estado de error HTTP para identificar tests de API con códigos de estado inesperados.
- Examina las ejecuciones de tests que fallaron inicialmente y fueron exitosas después de un reintento.
- Accede a los ID de test para incluirlos en tu pipeline de CI. 

Para más información, consulta [Sintaxis de búsqueda][5].

## Explorar las ejecuciones de tests

El explorador de resultados muestra todas los tests realizados en [Monitorización Synthetic][7] y [Continuous Testing][8]. Cada test corresponde a una ejecución de test de un subtipo de test concreto, incluidos los reintentos rápidos. Haz clic en un test del Explorador de resultados para acceder a la página de ejecución del test.

{{< img src="continuous_testing/api_test_run.png" alt="Página de detalles de ejecución de test de API" style="width:100%;">}}

1. Haz clic en un test para ir a la página de resultados o detalles. 
2. Analiza el rendimiento de tu ejecución de tests, o el rendimiento de los tests de API y API multipaso.
3. Crea una visualización como un gráfico de series temporales, una lista de principales, o una tabla.

Para más información sobre las ejecuciones de tests, consulta [Buscar ejecuciones de tests][6].

## Explorar los lotes de tests

El Explorador de resultados muestra lotes de tests ejecutados por [Continuous Testing y tu proveedor de CI/CD][2]. Cada lote se corresponde con una llamada a la API de Datadog (a través de una de tus [integraciones de CI/CD][2], el paquete NPM [datadog-ci][3] o directamente a través del endpoint de la API) y desencadena una o varias ejecuciones de tests.

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="Panel lateral de un lote de CI de ejecuciones de tests en el Explorador de Monitorización Synthetic y resultados de test" style="width:100%;">}}

1. Haz clic en un lote para abrir un panel lateral que contiene los metadatos de CI/CD del lote y los resultados de los tests del lote. 
2. Explora las ejecuciones de tests realizados como parte del lote y localiza los fallos de los tests. 
3. Haz clic en un resultado de test erróneo para ver la página detallada **Resultado del test** e investigar la causa raíz del problema.

Para más información sobre los lotes de test, consulta [Buscar lotes de tests][4].

## Exportar

Exporta tu vista como una [vista guardada][9] en el Explorador de Monitorización Synthetic y resultados de tests.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /es/continuous_testing/explorer/search/
[5]: /es/continuous_testing/explorer/search_syntax/
[6]: /es/continuous_testing/explorer/search_runs/
[7]: /es/synthetics/
[8]: /es/continuous_testing/
[9]: /es/continuous_testing/explorer/saved_views/