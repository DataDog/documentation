---
aliases:
- /es/synthetics/cicd_integrations/gitlab
description: Configuraa tu instancia de GitLab para ejecutar tests de Continuous Testing
  en tus pipelines de CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Ejecutar los tests de Datadog Synthetic en tus pipelines de GitLab
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentación
  text: Configurar el rastreo en un pipeline de GitLab
title: GitLab
---

## Información general

Ejecuta tests de Continuous Testing en tus pipelines de [GitLab][1], bloquea despliegues y desencadena retrocesos para garantizar que tu código se agrega en producción cuando tus flujos de trabajo empresariales esenciales funcionan como se espera.

Para integrar los tests de Continuous Testing con un [pipeline de GitLab][2], puedes utilizar el [paquete datadog-ci npm][3].

## Ajustes

Para empezar:

1. Añade tu API de Datadog y las claves de la aplicación como variables en tu proyecto de GitLab.
2. Asegúrate de que tu ejecutor de GitLab tiene instalada una versión de Node.js >= 10.24.1.

Para más información, consulta la [configuración de integraciones de CI/CD][4].

## Configuración simple

### Ejecutar tests utilizando IDs de test

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --public-id xtf-w5p-z5n --public-id eif-van-tu7
{{< /code-block >}}

### Ejecutar tests con etiquetas

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests'
{{< /code-block >}}

### Ejecutar tests utilizando anulaciones de variables

Si tienes diferentes usuarios de test o datos específicos para tu entorno de CI/CD, puedes anular estas variables con el comando `-v`. Para obtener más información, [consulta el comando de Synthetics](https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics) en el paquete `datadog-ci` NPM.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests' -v PASSWORD="$PASSWORD"
{{< /code-block >}}

## Configuración avanzada

### Ejecutar tests utilizando un archivo de configuración personalizado

Añade un archivo `config.json` personalizado a tu repositorio de pipelines y accede a él en tu configuración de pipeline.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --config synthetics_global.json -f synthetic_test.json
{{< /code-block >}}

### Resultado del test

Este ejemplo demuestra que el pipeline ha identificado el archivo de configuración y está ejecutando el test:

{{< img src="synthetics/cicd_integrations/gitlab/synthetic_test_run.png" alt="Un test de Synthetic que se ejecuta en GitLab" style="width:100%;" >}}

Una salida de test correcta devuelve lo siguiente en GitLab:

{{< img src="synthetics/cicd_integrations/gitlab/successful_test_run.png" alt="Una ejecución de test de Synthetic exitosa en un pipeline de GitLab" style="width:100%;" >}}


## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/gitlab/
[2]: https://docs.gitlab.com/ee/ci/pipelines/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /es/synthetics/cicd_integrations/configuration