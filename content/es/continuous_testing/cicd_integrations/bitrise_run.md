---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests/blob/main/README.md
title: Continuous Testing y Bitrise
---
![Lanzamiento de GitHub](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-run-tests)
[![Estado de compilación](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4/status.svg?token=480MdFpG78E6kZASg5w1dw&branch=main)](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4)
[![Licencia](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con el paso `synthetics-test-automation-bitrise-step-run-tests`, puedes ejecutar tests de Synthetic durante tu Bitrise CI, asegurándote de que todos tus equipos que utilizan Bitrise pueden beneficiarse de los tests de Synthetic en cada etapa del ciclo de vida del software. Este paso utiliza el comando [Datadog CI Synthetics][2].

## Configuración

Este paso no está disponible en la Biblioteca de pasos oficial de Bitrise.
Para empezar:

1. Añade la siguiente URL git a tu flujo de trabajo. Consulta la [documentación oficial de Bitrise][3] sobre cómo hacerlo a través de la aplicación Bitrise. También la puedes configurar localmente haciendo referencia a la URL git en tu archivo `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
```

2. Añade tus claves de API y de aplicación a tus [secretos en Bitrise][4].
3. [Configurar tus entradas de pasos][5]. También puedes configurarlas en tu archivo `bitrise.yml`. Las únicas entradas requeridas son los dos secretos que configuraste anteriormente. Para obtener una lista completa de entradas, consulta la [Sección de entradas](#inputs).

## Cómo utilizar este paso a nivel local

Puedes ejecutar este paso directamente utilizando la [CLI de Bitrise][6].

Para ejecutar este paso localmente:

1. Abre tu terminal o línea de comandos.
2. `git clone` el [repositorio de Bitrise][6].
3. `cd` en el directorio del paso (el que acaba de `git clone`).
4. Crea un archivo `.bitrise.secrets.yml` en el mismo directorio que `bitrise.yml`. El archivo `.bitrise.secrets.yml` es un archivo ignorado por Git, por lo que puedes almacenar tus secretos en él.
5. Consulta el archivo `bitrise.yml` para cualquier secreto que debas establecer en `.bitrise.secrets.yml`.
6. Una vez que tengas los parámetros secretos necesarios en tu archivo `.bitrise.secrets.yml`, ejecuta este paso con la [CLI de Bitrise][6]: `bitrise run test`.

Un ejemplo de archivo `.bitrise.secrets.yml`:

```yml
envs:
- A_SECRET_PARAM_ONE: the value for secret one
- A_SECRET_PARAM_TWO: the value for secret two
```

## Uso sencillo

### Ejemplo de uso de identificadores públicos

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Ejemplo de tarea utilizando los archivos `synthetics.json` existentes

```yaml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - files: 'e2e-tests/*.synthetics.json'
```

Para ver un archivo de test de ejemplo, consulta este [archivo `test.synthetics.json`][7].

## Uso complejo

### Ejemplo de tarea utilizando la `testSearchQuery`

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
```

### Ejemplo de tarea que utiliza `testSearchQuery` y anulaciones de variables

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

### Ejemplo de tarea que utiliza una anulación global de configuración con `configPath`

Esta tarea anula la ruta del archivo global `datadog-ci.config.json`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './synthetics-config.json'
```

Para ver un ejemplo de archivo de configuración, consulta el [archivo `global.config.json`][8].

### Ejemplo con todas las configuraciones posibles

Como referencia, este es un ejemplo de una configuración completo:

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - batch_timeout: 4200000
   - config_path: './global.config.json'
   - device_ids: 'apple iphone se (2022),15.4.1, apple iphone 14 pro,16.1'
   - fail_on_critical_errors: true
   - fail_on_missing_tests: true
   - fail_on_timeout: true
   - files: 'e2e-tests/*.synthetics.json'
   - junit_report: 'e2e-test-junit'
   - locations: 'aws:us-west-1'
   - mobile_application_version: '01234567-8888-9999-abcd-efffffffffff'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
   - site: 'datadoghq.com'
   - subdomain: 'myorg'
   - test_search_query: 'tag:e2e-tests'
   - tunnel: true
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

## Entradas

| Nombre                               | Requisito | Descripción                                                                                                                                                                                                                         |
| -----------------------------------| :---------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`                           | _obligatorio_  | Tu clave de API de Datadog. Esta clave es creada por tu [organización de Datadog][9] y se accederá a ella como una variable de entorno.                                                                                                        |
| `appKey`                           | _obligatorio_  | Tu clave de aplicación de Datadog. Esta clave es creada por tu [organización de Datadog][9] y se accederá a ella como una variable de entorno.                                                                                                |
| `batchTimeout`                     | _opcional_  | La duración (en milisegundos) tras la cual el lote excede el tiempo de espera. El valor predeterminado es 30 minutos.                                                                                                                                 |
| `configPath`                       | _opcional_  | La configuración global de JSON se utiliza al lanzar los tests. Consulta el [ejemplo de configuración][10] para obtener más detalles.                                                                                                                   |
| `deviceIds`                        | _opcional_  | Anula el dispositivo o dispositivos móviles para ejecutar tu test móvil.                                                                                                                                                                              |
| `locations`                        | _opcional_  | Cadena de localizaciones separada por punto y coma para anular las localizaciones donde se ejecutan tus tests.                                                                                                                                         |
| `failOnCriticalErrors`             | _opcional_  | Un indicador booleano que falla el trabajo de CI si no se activa ningún test, o si los resultados no pueden obtenerse de Datadog. El valor predeterminado es `false`.                                                                                       |
| `failOnMissingTests`               | _opcional_  | Falla el trabajo de CI si al menos un test especificado con un ID público (usando `publicIds` o publicados en un [archivo de test][7]) falta en una ejecución (por ejemplo, si ha sido borrado programáticamente o en el sitio de Datadog).                |
| `failOnTimeout`                    | _opcional_  | Un indicador booleano que falla el trabajo de CI si al menos un test excede el tiempo de espera predeterminado. El valor predeterminado es `true`.                                                                                                           |
| `files`                            | _opcional_  | Patrones glob para detectar [archivos de configuración][2] del test de Synthetic.                                                                                                                                                                    |
| `jUnitReport`                      | _opcional_  | El nombre de archivo para un informe de JUnit si deseas generar uno.                                                                                                                                                                        |
| `mobileApplicationVersion`         | _opcional_  | Anula la versión predeterminada de la aplicación móvil para un test de aplicación móvil de Synthetic. La versión debe cargarse y estar disponible en Datadog. Esta versión también se genera en el [paso`datadog-mobile-app-upload` ][11].   |
| `mobileApplicationVersionFilePath` | _opcional_  | Anula la versión de la aplicación para [tests de aplicación móvil de Synthetic][15].                                                                                                                                                      |
| `pollingTimeout`                   | _opcional_  | **OBSOLETO** La duración (en milisegundos) tras la cual `datadog-ci` deja de sondear los resultados de los tests. Utiliza `--batchTimeout` en su lugar.                                                                                         |
| `publicIds`                        | _opcional_  | Cadena de IDs públicos separados por comas para los tests de Synthetic que deseas activar.                                                                                                                                                   |
| `site`                             | _opcional_  | El [sitio de Datadog][16] al que enviar los datos. Si la variable de entorno `DD_SITE` está activada, tiene prioridad.  Tu sitio de Datadog es {{< region-param key="dd_site" code="true" >}}.                           |
| `subdomain`                        | _opcional_  | El nombre del subdominio personalizado configurado para acceder a tu aplicación de Datadog. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, el valor `subdomain` debe establecerse en `myorg`.                                              |
| `testSearchQuery`                  | _opcional_  | Activa los tests correspondientes a una consulta de [búsqueda][12]. Esto puede ser útil si estás etiquetando tus configuraciones de test. Consulta las [prácticas recomendadas][15] para obtener más información sobre el etiquetado.                                                      |
| `tunnel`                           | _opcional_  | Activa [Entornos locales y de staging][14] para interactuar con la API de Datadog.                                                                                                                                                       |
| `variables`                        | _opcional_  | Pares de clave-valor para inyectar variables en los tests. Deben formatearse utilizando `KEY=VALUE`.                                                                                                                                            |

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Empezando con Continuous Testing][17]
- [Continuous Testing y configuración de CI/CD][13]
- [Prácticas recomendadas para Continuous Testing con Datadog][18]

[1]: https://bitrise.io/integrations/steps/datadog-mobile-app-run-tests
[2]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://github.com/bitrise-io/bitrise
[7]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[8]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[11]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application
[12]: https://docs.datadoghq.com/es/synthetics/search/#search
[13]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[14]: https://docs.datadoghq.com/es/continuous_testing/environments/multiple_env
[15]: https://docs.datadoghq.com/es/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[16]: https://docs.datadoghq.com/es/getting_started/site/
[17]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[18]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[19]: https://docs.datadoghq.com/es/synthetics/mobile_app_testing/