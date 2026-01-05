---
algolia:
  tags:
  - continuous testing
further_reading:
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Introducción a los tests de Synthetic en un pipeline de CI/CD
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: Blog
  text: Prácticas recomendadas para Continuous Testing con Datadog
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: Blog
  text: Utiliza Datadog Continuous Testing para publicar con confianza
- link: /continuous_testing/environments
  tag: Documentación
  text: Más información sobre los entornos locales y de staging
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre Continuous Testing y CI/CD
title: Empezando con Continuous Testing
---
{{< jqmath-vanilla >}}

## Información general

Los tests continuos te permiten ejecutar y monitorizar automáticamente los mismos [tests de Synthetic][1] que has configurado en tus [entornos de staging, control de calidad y preproducción][14], que alertan de manera proactiva a tu equipo y bloquean los despliegues de pipelines cuando los cambios de código causan fallas en los tests.

Tus tests de Continuous Testing pueden:

* [Lanzar solicitudes API en tus sistemas][2]
* [Simular escenarios de navegación dentro de tu aplicación web][3]
* [Probar la funcionalidad de tus aplicaciones para iOS y Android][4].

Puedes configurar la [paralelización][24], que te permite ejecutar varios tests en tus pipelines de CI/CD simultáneamente en lugar de secuencialmente para ayudar a acelerar los procesos de creación, testing y despliegue. Una vez que se ejecuten los tests, examina los resultados de los tests y los lotes de CI en el [Explorador de resultados de tests y Synthetic Monitoring][5].

Para mejorar el flujo de trabajo de tu desarrollador con Continuous Testing, puedes:

* Usa el [paquete NPM `datadog-ci`][6] para ejecutar tests directamente en tu pipeline CI.
* Utiliza la [Integración de Datadog Synthetics con VS Code][7] para ejecutar tests directamente en tu IDE.

Continuous Testing acelera el desarrollo de aplicaciones de tu organización al automatizar los tests de extremo a extremo durante todo el ciclo de vida del software. Puedes ejecutar tests en entornos locales y de staging, paralelizar ejecuciones de tests e integrar con proveedores de CI.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][8].

## Crear un test de Continuous Testing

Para configurar un test de Continuous Testing, primero crea un test de Synthetic en Datadog. En este ejemplo, crea un [test de navegador][3] en el sitio `https://www.shopist.io`, una aplicación web de comercio electrónico de prueba.

Los tests de navegador simulan el recorrido de un usuario a través de su aplicación web a partir de su **URL de inicio**. Si te aseguras de que tu **URL de inicio** sea un recurso en su entorno de staging, será más fácil probar los cambios antes de pasarlos a producción.

### Configurar los detalles de tu test

1. Ve a [**Digital Experience** > **Synthetic Monitoring & Testing** > **New Test**][26].
2. En la esquina superior derecha, haz clic en **New Test** > **Browser Test**.

   {{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:80%;" >}}

3. Define tu test de navegador:

    - Agrega la URL del sitio web que deseas monitorizar en el campo URL de inicio. Para este ejemplo, ingresa `https://www.shopist.io`.
    - Selecciona **Advanced Options** para configurar opciones de solicitud personalizadas, certificados, credenciales de autenticación y más. En este ejemplo, no se necesita ninguna opción avanzada específica.
    - Asigna un nombre a tu test y establece una etiqueta (tag) de equipo, como **team-checkout**. Las etiquetas te permiten mantener organizado tu conjunto de tests y encontrar los tests que te interesan con el Explorador de resultados de tests y Synthetic Monitoring.
    - Elige los navegadores y dispositivos que deseas probar.

4. Continúa [completando los detalles de tu test y tu grabación como lo harías normalmente][9].

## Integrar con un proveedor de CI o una herramienta de colaboración

Acelera el desarrollo de tu aplicación combinando testing y solución de problemas en Continuous Testing, agilizando tus flujos de trabajo y minimizando el cambio de contexto.

Para integrar con un proveedor de CI o una herramienta de colaboración como [Slack][28] o [Jira][29], consulta la documentación correspondiente:

{{< partial name="getting_started/continuous_testing/providers.html" >}}

</br>

## Ejecutar los tests de Continuous Testing

Para mejorar tu flujo de trabajo de desarrollo, puedes utilizar `datadog-ci` en tu CLI, como entorno de integración continua (CI), al configurar tu test. 

### Ejecución de tests en la CLI

Amplía el uso de Continuous Testing mediante el [paquete NPM `datadog-ci`][6]. `datadog-ci` te permite ejecutar comandos desde tus scripts de CI/CD para probar tu aplicación antes del despliegue. Puedes automatizar el bloqueo y la reversión de cambios cuando fallan los tests. Lee la [página de configuración de `datadog-ci` para obtener instrucciones de instalación y configuración][10].

Puedes utilizar `datadog-ci` para ejecutar solo los tests etiquetados con [etiquetas de equipos de Datadog][25] específicas. Por ejemplo, para ejecutar todos los tests etiquetados como `team-checkout`:

1. Navega hasta tu línea de comandos.
2. Ejecuta el siguiente comando:

   ```
   datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```

Para más información sobre la ejecución del comando Synthetics y el uso de informes, consulta la [documentación de configuración][11].

## Examinar los resultados en el Explorador de resultados de tests y Synthetic Monitoring

El Explorador de resultados de tests y Synthetic Monitoring te permite crear visualizaciones y filtrar [lotes de CI][22] y [ejecuciones de tests][23] para tus tests de Continuous Testing.

Ve a [**Digital Experience** > **Synthetic Monitoring & Testing** > **New Test**][26] y, luego, selecciona **CI Batches** o **Test Runs** para ver los resultados de tus lotes de CI o ejecuciones de tests en el explorador. Selecciona un lote de CI o un test de la lista para obtener una vista más detallada del resultado.

{{< tabs >}}
{{% tab "Lotes de CI" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Busca y gestiona tus lotes de CI en el Explorador de resultados de tests y Synthetic Monitoring" style="width:100%;">}}
{{% /tab %}}
{{% tab "Ejecucione de tests" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Busca y gestiona tus ejecuciones de tests en el Explorador de resultados de tests y Synthetic Monitoring" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

### Crear una consulta de búsqueda

Explora una de las siguientes consultas de búsqueda listas para usar para comenzar a filtrar tus lotes de CI o ejecuciones de tests.

{{< img src="continuous_testing/explorer/search_queries.png" alt="Consultas de búsqueda listas para usar en el Explorador de resultados de tests y Synthetic Monitoring" style="width:100%;" >}}

Opcionalmente, puedes crear una consulta para [buscar tus ejecuciones de tests][15]. Con el test de navegador que creaste anteriormente, localiza el ID de test y crea una consulta de búsqueda utilizando las facetas comunes de ejecución de test.

Para encontrar el ID de tu test de navegador:

{{< img src="continuous_testing/example_test_id.png" alt="El ID de test de navegador resaltado en la sección Properties de una ejecución de test" style="width:60%;" >}}

1. Ve a la página [**Tests**][19].
2. Selecciona un test.
3. Busca el ID del test en la sección **Propiedades**.

Para obtener más información sobre el uso de facetas en tu consulta de búsqueda, consulta [Buscar ejecuciones de test][17].

Para exportar tu vista del Explorador de resultados de tests y Synthetic Monitoring, haz clic en **> Views**. Para más información, consulta [Vistas guardadas][16].

## Establecer preferencias de paralelización

Por defecto, los tests Synthetic no están paralelizados. La paralelización permite ejecutar varios tests en tus canalizaciones de CI/CD simultáneamente. Si deseas paralelizar tus tests, puedes utilizar la calculadora **Estimar paralelización** para determinar tus necesidades.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

Navega a [**Digital Experience** > **Synthetic Monitoring & Testing** > **Settings**][27] para localizar la calculadora.

Por ejemplo, si tienes 24 tests por lote de CI, cada uno de los cuales tarda 2 minutos en completarse, y tu objetivo es que todos los tests se completen en 4 minutos, necesitas ejecutar 12 tests en paralelo.

$$\text"paralelización estimada" = {\text"24 tests por lote de CI"* \text"duración de 2 minutos"} / \text"duración estimada de 4 minutos en tu canalización de CI"$$

Una vez que hayas terminado de estimar tu paralelización, introduce el número de ejecuciones de test que deseas ejecutar al mismo tiempo en el modo de Paralelización. A continuación, haz clic en **Guardar selección**.

Para más información, consulta la [documentación sobre paralelización][18].

## Referencias adicionales

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
[14]: /es/continuous_testing/environments/
[15]: /es/continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /es/continuous_testing/explorer/saved_views/
[17]: /es/continuous_testing/explorer/search_runs/
[18]: /es/continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/tests
[22]: /es/glossary/?product=synthetic-monitoring#test-batch
[23]: /es/glossary/?product=synthetic-monitoring#test-run
[24]: /es/glossary/?product=synthetic-monitoring#parallelization
[25]: /es/account_management/teams/
[26]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.unhealthy%3Atrue&index=%2A&track=synthetics&viz=stream&from_ts=1713544430419&to_ts=1713548030419&live=true
[27]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[28]: /es/integrations/slack/
[29]: /es/integrations/jira/