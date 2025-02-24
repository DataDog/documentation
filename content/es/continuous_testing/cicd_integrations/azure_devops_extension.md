---
aliases:
- /es/synthetics/cicd_integrations/azure_devops_extension
dependencies:
- https://github.com/DataDog/datadog-ci-azure-devops/blob/main/README.md
description: Utiliza la extensión de CI de Synthetics y Datadog para crear tareas
  que puedas utilizar en un pipeline de CI.
title: Continuous Testing y extensión de Datadog CI Azure DevOps
---
[![Versión de Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/Datadog.datadog-ci)][1]
[![Estado de compilación](https://dev.azure.com/Datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_apis/build/status%2FDevelopment?branchName=main)](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_build/latest?definitionId=4&branchName=main)
[![Licencia](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con Datadog Continuous Testing Azure DevOps Extension, puedes ejecutar tests de Synthetic dentro de tu configuración de pipeline de Azure y asegurarte de que todos tus equipos que utilizan Azure DevOps puedan beneficiarse de los tests de Synthetic en cada etapa del ciclo de vida del software. Puedes ejecutar [`SyntheticsRunTests`][3] como una tarea.

## Autenticación

### Conexión del servicio

Para conectarte a tu [sitio de Datadog][11], Datadog recomienda configurar una conexión personalizada al servicio al configurar la tarea de Synthetics Run Test. 

Debes proporcionar los siguientes datos:

- Sitio de Datadog: a qué [sitio de Datadog][11] conectarte y enviar datos. 
- Subdominio personalizado (por defecto: `app`): el nombre del subdominio personalizado establecido para acceder a tu aplicación de Datadog. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, este valor debe establecerse en `myorg`.
- Clave de API: tu clave de API de Datadog. Esta clave la crea tu [organización de Datadog][6].
- Clave de aplicación: tu clave de aplicación de Datadog. Esta clave la crea tu [organización de Datadog][6].


### Claves de API y de aplicación

- Clave de API: tu clave de API de Datadog. Esta clave es creada por tu [organización de Datadog][6] y se accede a ella como una variable de entorno.
- Clave de aplicación: tu clave de aplicación de Datadog. Esta clave es creada por tu [organización de Datadog][6] y se accede a ella como una variable de entorno.
- Sitio de Datadog: el [sitio de Datadog][11] para conectarte y enviar datos. 
- Subdominio personalizado (opcional): el nombre del subdominio personalizado establecido para acceder a tu aplicación de Datadog. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, este valor debe establecerse en `myorg`.

## Ajustes

Para conectarte a tu cuenta de Datadog, [crea una conexión del servicio de Datadog CI][5] en tu proyecto de pipelines de Azure. Una vez creado, todo lo que necesitas es el nombre de la conexión del servicio en las tareas.

1. Instala la [extensión de Datadog Continuous Testing del Visual Studio Marketplace][1] en tu organización de Azure.
2. Añade tu API de Datadog y las claves de la aplicación en la conexión [del servicio de Datadog CI](#authentication), o como [secretos de tu proyecto de pipelines de Azure][7].
3. En tu pipeline de Azure DevOps, utiliza la tarea `SyntheticsRunTests`.

Tu tarea puede ser [simple](#simple-usage) o [compleja](#complex-usage).

## Uso sencillo

> **Nota**: Recientemente hemos cambiado la versión principal de la tarea de `SyntheticsRunTests@0` a `SyntheticsRunTests@1`.
>
> Esto es **NO un cambio de ruptura**, sino una alineación entre la versión de la tarea y la versión de la extensión.

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

> **Nota**: Recientemente hemos cambiado la versión principal de la tarea de `SyntheticsRunTests@0` a `SyntheticsRunTests@1`.
>
> Esto es **NO un cambio de ruptura**, sino una alineación entre la versión de la tarea y la versión de la extensión.

### Ejemplo de tarea utilizando la `testSearchQuery`

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
```

### Ejemplo de tarea que utiliza `testSearchQuery` y anulaciones de variables

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

Por defecto, la ruta al archivo de configuración global es `datadog-ci.json`. Puedes anular esta ruta con la entrada `config_path`.

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    configPath: './global.config.json'
    connectedService: 'my-datadog-ci-connected-service'
```

Para ver un ejemplo de archivo de configuración global, consulta este [archivo `global.config.json`][13].

## Entradas

| Nombre                   | Requisito | Descripción                                                                                                                                                                                                                                     |
| ---------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`               | _obligatorio_  | Tu clave de API de Datadog cuando utilices el tipo de autenticación `apiAppKeys`. Esta clave la crea tu [organización de Datadog][6] y debe guardarse como [secreto][7].                                                                              |
| `appKey`               | _obligatorio_  | Tu clave de aplicación de Datadog cuando utilices el tipo de autenticación `apiAppKeys`. Esta clave la crea tu [organización de Datadog][6] y debe guardarse como [secreto][7].                                                                      |
| `authenticationType`   | _obligatorio_  | El tipo de autenticación que deseas que utilice Datadog, ya sea `connectedService` o `apiAppKeys`.                                                                                                                                                  |
| `connectedService`     | _obligatorio_  | El nombre de la [conexión de servicio de Datadog CI](#setup) a utilizar cuando se usa el tipo de autenticación `connectedService`.                                                                                                                           |
| `configPath`           | _opcional_  | La [configuración global de JSON][9] utilizada al lanzar los tests. Para más información, consulta la [configuración de ejemplo][9]. **Por defecto:** `datadog-ci.json`.                                                                                         |
| `datadogSite`          | _opcional_  | El [sitio de Datadog][11] cuando se utiliza el tipo de autenticación `apiAppKeys`. **Por defecto:** `datadoghq.com`.                                                                                                                                           |
| `failOnCriticalErrors` | _opcional_  | Falla el trabajo de CI si no se dispara ningún test, o si los resultados no se pueden obtener de Datadog. **Por defecto:** `false`.                                                                                                                                 |
| `failOnMissingTests`   | _opcional_  | Falla el trabajo de CI si al menos un test especificado con un ID público (usando `publicIds` o publicados en un [archivo de test][14]) falta en una ejecución (por ejemplo, si ha sido borrado programáticamente o en el sitio de Datadog). **Por defecto:** `false`.     |
| `failOnTimeout`        | _opcional_  | Falla el trabajo de CI si al menos un test excede el tiempo de espera de test por defecto. **Por defecto:** `true`.                                                                                                                                                     |
| `files`                | _opcional_  | Patrón global para detectar los archivos de configuración de los tests de Synthetic. **Por defecto:** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                                   |
| `jUnitReport`          | _opcional_  | El nombre de archivo para un informe JUnit si deseas generar uno.                                                                                                                                                                                    |
| `pollingTimeout`       | _opcional_  | **OBSOLETO**: La duración (en milisegundos) tras la cual la tarea deja de sondear los resultados de los tests. En el nivel de CI, los resultados de los tests completados después de esta duración se consideran fallidos. **Predeterminado:** 30 minutos.                                                 |
| `publicIds`            | _opcional_  | Una lista de IDs de tests para tests de Synthetic que deseas activar, separada por nuevas líneas o comas. Si no se proporciona ningún valor, la tarea busca archivos con el nombre `synthetics.json`.                                                                       |
| `subdomain`            | _opcional_  | El nombre del subdominio personalizado establecido para acceder a tu aplicación de Datadog cuando se utiliza el tipo de autenticación `apiAppKeys`. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, este valor debe establecerse en `myorg`. **Por defecto:** `app`. |
| `testSearchQuery`      | _opcional_  | Activa los tests correspondientes a una consulta de [búsqueda][8]. Esto puede ser útil si estás etiquetando tus configuraciones de test. Para obtener más información, consulta [reglas y prácticas recomendadas para nombrar etiquetas][10].                                                   |
| `variables`            | _opcional_  | Una lista de variables globales a utilizar para los tests de Synthetic, separada por nuevas líneas o comas. Por ejemplo: `START_URL=https://example.org,MY_VARIABLE=My title`. **Por defecto:** `[]`.                                                                  |

## Leer más

Más enlaces, artículos y documentación útiles:

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
[9]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[10]: https://docs.datadoghq.com/es/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[11]: https://docs.datadoghq.com/es/getting_started/site/
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[14]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files