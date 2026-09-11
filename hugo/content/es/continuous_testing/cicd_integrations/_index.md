---
aliases:
- /es/synthetics/ci
- /es/synthetics/cicd_testing
- /es/synthetics/cicd_integrations
description: Ejecuta tests de Continuous Testing a petición o a intervalos predefinidos
  en tus pipelines de CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorporar los tests de Datadog Synthetic a tu pipeline de CI/CD
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: Blog
  text: Prácticas recomendadas para los tests de desplazamiento a la izquierda
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Aprender a ejecutar tests de Synthetic en un pipeline de CI/CD
- link: /synthetics/api_tests/
  tag: Documentación
  text: Aprender a configurar un test de API
- link: /synthetics/multistep
  tag: Documentación
  text: Aprender a configurar un test de API de varios pasos
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Aprender a configurar un test de navegador
title: Continuous Testing y CI/CD
---

<div class="alert alert-info">Esta página trata sobre la ejecución de tests de Continuous Testing en tus pipelines de integración continua (CI) y de entrega continua (CD). Si deseas llevar tus métricas de CI/CD y los datos a dashboards de Datadog, consulta la sección <a href="/continuous_integration/" target="_blank">CI Visibility</a>.</div>

## Información general

Además de ejecutar tests a intervalos predefinidos, puedes reutilizar tus tests de Datadog Synthetic y ejecutarlos bajo demanda utilizando el paquete `@datadog/datadog-ci` o la API. Ejecuta tests de Datadog Continuous Testing en tus pipelines de integración continua (CI) para bloquear ramas y evitar que se desplieguen y rompan tu aplicación en producción.

Utiliza Continuous Testing y CI/CD para ejecutar también tests como parte de tu proceso de entrega continua (CD) y evaluar el estado de tus aplicaciones y servicios en producción inmediatamente después de que finalice un despliegue o esté recién lanzada una nueva versión. Puedes detectar posibles regresiones que puedan afectar a tus usuarios y activar automáticamente una reversión cuando falle un test crítico.

Esta funcionalidad reduce el tiempo dedicado a solucionar problemas en producción al detectar proactivamente errores y regresiones en una fase más temprana del proceso, lo que permite a tus equipos de ingeniería centrarse en tareas no urgentes. 

Para empezar, consulta [integraciones](#integrations) y [usa la API](#use-the-api) o el [paquete de CLI de código abierto](#use-the-cli).

## Integraciones

{{< whatsnext desc="With Continuous Testing and CI/CD, you can run Continuous Testing tests in any CI platform provider of choice. See the documentation for information about the following integrations, or read more about the Datadog CI NPM package:">}}
    {{< nextlink href="continuous_testing/cicd_integrations/azure_devops_extension" >}}Extensión de Azure DevOps{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/github_actions" >}}Acciones de GitHub{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/bitrise_upload" >}}Caragar aplicaciones con Bitrise{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/bitrise_run" >}}Ejecutar tests con Bitrise{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/configuration" >}}Paquete de NPM{{< /nextlink >}}
{{< /whatsnext >}}

## Utilizar la CLI

El [paquete `@datadog/datadog-ci`][1] te permite ejecutar tests de Continuous Testing directamente dentro de tu pipeline CI/CD. Para utilizar el [paquete de NPM `@datadog/datadog-ci`][2], consulta [Configuración][3].

Puedes activar los tests buscando con etiquetas (tags). Por ejemplo, utiliza `"ci": "datadog-ci synthetics run-tests --config fileconfig.json -s 'tag:staging'"`. Este comando funciona como argumento. No lo utilices en tus archivos de configuración.

## En la API

Los endpoints de la API de Synthetics te permiten lanzar tests en cualquier etapa de tu ciclo de vida de presentación y despliegue. Por ejemplo, después de un despliegue canary con una reversión automatizada.

Utiliza los endpoints de la API para verificar rápidamente que un nuevo despliegue no introduce ninguna regresión. Consulta los endpoints [Activar tests desde pipeline de CI/CD][4] y [Obtener detalles del lote][5] para utilizarlos en tu CI mediante cURL o un cliente compatible.

### Tests de activación de pipelines CI/CD

El endpoint de activación de tests admite hasta 100 tests en una solicitud.

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`
* **Método**: `POST`
* **Argumento**: un objeto JSON que contiene la lista de todos los tests a activar y tu anulación de configuración.

#### Estructura de datos de la solicitud

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

Los objetos `TEST_TO_TRIGGER` se componen de los campos `public_id` necesarios para el test que deseas activar y las anulaciones de campos opcionales de configuración. Para obtener descripciones de cada campo, consulta [Configurar tests][6].

El identificador público de un test es el identificador del test que se encuentra en la URL de la página de detalles de un test (por ejemplo: el identificador de `https://app.datadoghq.com/synthetics/details/abc-def-ghi` es `abc-def-ghi`) o la URL completa de la página de detalles de un test (por ejemplo: `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

Para más información, consulta la [Documentación del endpoint de la API Synthetics][4].

### Obtener detalles del lote

El endpoint Obtener detalles del lote recupera los resultados del grupo de tests activados en tu canal de CI/CD, también conocido como lote. Debes proporcionar la dirección `batch_id` para la ejecución de CI correspondiente.

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/ci/batch/{batch_id}`
* **Método**: `GET`
* **Parámetros**: la dirección `batch_id` para el lote de resultados de tests que deseas inspeccionar.

Para más información, consulta la [Documentación del endpoint de la API Synthetics][5].

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /es/continuous_testing/cicd_integrations/configuration
[4]: /es/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[5]: /es/api/latest/synthetics/#get-details-of-batch
[6]: /es/continuous_testing/cicd_integrations/configuration#configure-tests