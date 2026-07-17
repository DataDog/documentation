---
aliases:
- /es/synthetics/cicd_integrations/azure_devops_extension
dependencies:
- https://github.com/DataDog/datadog-ci-azure-devops/blob/main/README.md
description: Utiliza la extensión de CI de Synthetic y Datadog para crear tareas que
  puedas utilizar en un pipeline de CI.
title: Continuous Testing y extensión de Datadog CI Azure DevOps
---
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Datadog.datadog-ci)][1]
[![Build Status](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_apis/build/status%2FDevelopment?branchName=main)](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_build/latest?definitionId=4&branchName=main)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con la tarea [`SyntheticsRunTests`][3], puedes ejecutar tests Synthetic dentro de la configuración de tu pipeline Azure y garantizar que todos tus equipos que utilizan Azure DevOps puedan beneficiarse de los tests Synthetic en cada etapa del ciclo de vida del software.

Para obtener más información sobre la configuración disponible, consulta la [documentación de `datadog-ci synthetics run-tests`][13].

## Autenticación

### Conexión al servicio

Para conectarte a tu [sitio Datadog][11], Datadog recomienda configurar una conexión personalizada al servicio al configurar la tarea [`SyntheticsRunTests`][3].

Debes proporcionar los siguientes datos:

- Sitio Datadog: Tu sitio Datadog. Los valores posibles se muestran [en esta tabla][11].
- Subdominio personalizado (por defecto: `app`): El subdominio personalizado para acceder a tu organización Datadog. Si tu URL es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`.
- Clave de API: Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][6].
- Clave de aplicación: Tu clave de aplicación Datadog. Esta clave se [crea en tu organización Datadog][6].


### Claves de API y de aplicación

- Clave de API: Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][6] y debe almacenarse como [secreto][7].
- Clave de aplicación: Tu clave de aplicación Datadog. Esta clave se [crea en tu organización Datadog][6] y debe almacenarse como [secreto][7].
- Sitio Datadog: Tu sitio Datadog. Los valores posibles se muestran [en esta tabla][11].
- Subdominio personalizado (opcional): El subdominio personalizado para acceder a tu organización Datadog. Si tu URL es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`.

## Configuración

Para conectarte a tu cuenta de Datadog, [crea una conexión al servicio Datadog CI][5] en tu proyecto de pipelines de Azure. Una vez creado, todo lo que necesitas es el nombre de la conexión al servicio en las tareas.

1. Instala la [extensión de Datadog Continuous Testing del Visual Studio Marketplace][1] en tu organización de Azure.
2. Añade tu API de Datadog y las claves de la aplicación en la conexión [al servicio Datadog CI](#authentication), o como [secretos de tu proyecto de pipelines de Azure][7].
3. En tu pipeline Azure DevOps, utiliza la tarea [`SyntheticsRunTests`][3].

Tu tarea puede ser [simple](#simple-usage) o [compleja](#complex-usage).

## Uso sencillo

### Ejemplo de tarea con identificadores públicos

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    publicIds: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### Ejemplo de tarea utilizando los archivos `synthetics.json` existentes

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    files: 'e2e-tests/*.synthetics.json'
```

Para ver un archivo de test de ejemplo, consulta este [archivo `test.synthetics.json`][14].

### Ejemplo de tarea que utiliza secretos de pipeline para la autenticación

```yaml
- task: SyntheticsRunTests@1
  inputs:
    authenticationType: 'apiAppKeys'
    apiKey: '$(DatadogApiKey)'
    appKey: '$(DatadogAppKey)'
    datadogSite: '$(DatadogSite)'
    subdomain: 'myorg'
```

## Uso complejo

### Ejemplo de tarea utilizando la `testSearchQuery`

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
```

### Ejemplo de tarea que utiliza `testSearchQuery` y sobreescritura de variables

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
    variables: |
      START_URL=https://staging.website.com
      PASSWORD=$(StagingPassword)
```

### Ejemplo de tarea utilizando un archivo de configuración global con `configPath`

Por defecto, la ruta al archivo de configuración global es `datadog-ci.json`. Puedes sobreescribir esta ruta con la entrada `config_path`.

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    configPath: './global.config.json'
    connectedService: 'my-datadog-ci-connected-service'
```

## Entradas

Para obtener más información sobre la configuración disponible, consulta la [documentación de `datadog-ci synthetics run-tests`][13].

| Nombre                   | Descripción                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`               | Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][6] y debe almacenarse como [secreto][7]. <br><sub>**Obligatoria** cuando `authenticationType == apiAppKeys`</sub>                                                                                                                             |
| `appKey`               | Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][6] y debe almacenarse como [secreto][7]. <br><sub>**Obligatoria** cuando `authenticationType == apiAppKeys`</sub>                                                                                                                     |
| `authenticationType`   | (**Obligatorio**) Almacenamiento y recuperación de credenciales. <br><sub>Debe ser `apiAppKeys` o `connectedService`</sub>                                                                                                                                                                                             |
| `batchTimeout`         | Especifica la duración del tiempo de espera en milisegundos para el lote CI. Cuando se agota el tiempo de espera de un lote, el trabajo de CI falla y no se activan nuevas ejecuciones de tests, pero las ejecuciones de tests en curso finalizan normalmente. <br><sub>**Por defecto:** `1800000` (30 minutos)</sub>                                                                          |
| `connectedService`     | El nombre de la [conexión al servicio Datadog CI](#setup). <br><sub>**Obligatorio** cuando `authenticationType == connectedService`</sub>                                                                                                                                                                                 |
| `configPath`           | La ruta al [archivo de configuración global][9] que configura datadog-ci. <br><sub>**Por defecto:** `datadog-ci.json`</sub>                                                                                                                                                                                           |
| `datadogSite`          | Tu sitio Datadog. Los valores posibles se muestran [en esta tabla][11]. <br><sub>**Por defecto:** `datadoghq.com`</sub> <br><br> Configúralo como{{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el SITIO correcto a la derecha).                                                    |
| `failOnCriticalErrors` | Genera la falla del trabajo de CI si se produce un error crítico que suele ser transitorio, como límites de frecuencia, fallos de autenticación o problemas en la infraestructura Datadog. <br><sub>**Por defecto:** `false`</sub>                                                                                                                        |
| `failOnMissingTests`   | Genera la falla del trabajo CI si la lista de tests a ejecutar está vacía o si faltan algunos tests explícitamente mencionados. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                           |
| `failOnTimeout`        | Genera la falla del trabajo CI si el lote CI falla debido al tiempo de espera. <br><sub>**Por defecto:** `true`</sub>                                                                                                                                                                                                                             |
| `files`                | Patrones glob para detectar [archivos de configuración de tests][14] Synthetic, separados por nuevas líneas. <br><sub>**Por defecto:** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                    |
| `jUnitReport`          | El nombre de archivo de un informe JUnit, si quieres generar uno. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                                                                                                      |
| `locations`            | Anula la lista de ubicaciones desde las que ejecutar el test, separadas por nuevas líneas o comas. Los valores posibles se muestran en [esta respuesta de API][19]. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                 |
| `publicIds`            | ID públicos de tests Synthetic a ejecutar, separados por nuevas líneas o comas. Si no se proporciona ningún valor, los tests se detectan en los [archivos de configuración de tests][14] Synthetic. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                |
| `selectiveRerun`       | Si solo se vuelven a ejecutar tests fallidos o no. Si un test ya ha aprobado un commit dado, no se vuelve a ejecutar en los siguientes lotes de CI. Por defecto, se utiliza la [configuración por defecto de tu organización][18]. Configúrala como `false` para forzar ejecuciones completas cuando tu configuración lo permite por defecto. <br><sub>**Por defecto:** ninguno</sub> |
| `subdomain`            | El subdominio personalizado para acceder a tu organización Datadog cuando `authenticationType == apiAppKeys`. Si tu URL es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`. <br><sub>**Por defecto:** `app`</sub>                                                                                                         |
| `testSearchQuery`      | Utiliza una [consulta de búsqueda][10] para seleccionar los tests Synthetic que se van a ejecutar. Utiliza la [barra de búsqueda de la página con la lista de tests Synthetic][15] para crear tu consulta, y luego cópiala y pégala. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                |
| `variables`            | Inyecta nuevas [variables locales y globales][16] o sobreescribe las existentes en tests Synthetic como pares clave-valor, separadas por nuevas líneas o comas. Por ejemplo: `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Por defecto:** ninguno</sub>                                                                      |

## Salidas

| Nombre                     | Descripción                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `batchUrl`               | La URL del lote CI.                                                             |
| `criticalErrorsCount`    | El número de errores críticos que se han producido durante el lote CI.                     |
| `failedCount`            | El número de resultados que han fallado durante el lote CI.                               |
| `failedNonBlockingCount` | El número de resultados que han fallado durante el lote CI sin bloquear el CI.       |
| `passedCount`            | El número de resultados que han sido aprobados durante el lote CI.                               |
| `previouslyPassedCount`  | El número de resultados que han sido aprobados en lotes CI anteriores en el mismo commit. |
| `testsNotFoundCount`     | El número de tests que no se han podido encontrar al iniciar el lote CI.              |
| `testsSkippedCount`      | El número de tests que se han omitido al iniciar el lote CI.                    |
| `timedOutCount`          | El número de resultados que han fallado debido a la superación del tiempo de espera del lote CI.                    |
| `rawResults`             | La matriz [`synthetics.Result[]`][20], como cadena codificada en JSON.                     |

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Empezando con Continuous Testing][17]
- [Configuración de Continuous Testing y CI/CD][4]
- [Prácticas recomendadas para tests continuos con Datadog][12]

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-ci
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci-azure-devops/tree/main/SyntheticsRunTestsTask
[4]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables
[8]: https://docs.datadoghq.com/es/synthetics/search/#search
[9]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[10]: https://docs.datadoghq.com/es/synthetics/explore/#search
[11]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[14]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/es/synthetics/platform/settings/?tab=specifyvalue#global-variables
[17]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[18]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[19]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[20]: https://github.com/DataDog/datadog-ci/blob/251299775d28b0535d0e5557fcc494a8124d3b11/src/commands/synthetics/interfaces.ts#L196-L227