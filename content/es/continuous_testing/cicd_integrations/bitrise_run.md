---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests/blob/main/README.md
title: Continuous Testing y Bitrise
---
![Lanzamiento de GitHub](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-run-tests)
[![Estado de compilación](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4/status.svg?token=480MdFpG78E6kZASg5w1dw&branch=main)](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4)
[![Licencia](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con el paso `synthetics-test-automation-bitrise-step-run-tests`, puedes ejecutar tests Synthetic durante tu Bitrise CI, asegurándote de que todos tus equipos que utilizan Bitrise puedan beneficiarse de los tests Synthetic en cada etapa del ciclo de vida del software.

Para obtener más información sobre la configuración disponible, consulta la [ documentación de`datadog-ci synthetics run-tests`][2].

## Configuración

Este paso no está disponible en la Biblioteca de pasos oficial de Bitrise.
Para empezar:

1. Añade la siguiente URL git a tu flujo de trabajo. Consulta la [documentación oficial de Bitrise][3] sobre cómo hacerlo a través de la aplicación Bitrise. También la puedes configurar localmente haciendo referencia a la URL git en tu archivo `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
```

2. Añade tus claves de API y de aplicación a tus [secretos en Bitrise][4].
3. [Configurar tus entradas de pasos][5]. También puedes configurarlas en tu archivo `bitrise.yml`. Las únicas entradas requeridas son los dos secretos que configuraste anteriormente. Para obtener una lista completa de entradas, consulta la [Sección de entradas](#inputs).

Cuando se ejecuta el paso localmente con la Bitrise CLI, los secretos deben almacenarse en un archivo `.bitrise.secrets.yml`. Consulta [Gestión local de secretos][6].

## Uso sencillo

### Ejemplo de uso de identificadores públicos

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - public_ids: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### Ejemplo de tarea utilizando los archivos `synthetics.json` existentes

```yaml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - files: 'e2e-tests/*.synthetics.json'
```

Para ver un archivo de test de ejemplo, consulta este [archivo `test.synthetics.json`][7].

## Uso complejo

### Ejemplo de tarea utilizando la `testSearchQuery`

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
```

### Ejemplo de tarea que utiliza `testSearchQuery` y sustituciones de variables

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

### Ejemplo de tarea que utiliza una sobrescritura global de configuración con `configPath`

Esta tarea sobrescribe la ruta del archivo global `global.config.json`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
```

### Ejemplo con todas las configuraciones posibles

Como referencia, este es un ejemplo de una configuración completo:

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@v3.8.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - batch_timeout: 4200000
   - config_path: './global.config.json'
   - datadog_site: 'datadoghq.com'
   - device_ids: |
      apple iphone se (2022),15.4.1
      apple iphone 14 pro,16.1
   - fail_on_critical_errors: true
   - fail_on_missing_tests: true
   - fail_on_timeout: true
   - files: 'e2e-tests/*.synthetics.json'
   - junit_report: 'e2e-test-junit'
   - locations: 'aws:us-west-1'
   - mobile_application_version: '01234567-8888-9999-abcd-efffffffffff'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - public_ids: 'abc-d3f-ghi,jkl-mn0-pqr'
   - selective_rerun: true
   - subdomain: 'myorg'
   - test_search_query: 'tag:e2e-tests'
   - tunnel: true
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

## Entradas

Para obtener más información sobre la configuración disponible, consulta la [ documentación de`datadog-ci synthetics run-tests`][2].

| Nombre                                   | Descripción                                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                              | (**Obligatorio**) Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][9] y debe almacenarse como secreto.                                                                                                                                                                                     |
| `app_key`                              | (**Obligatorio**) Tu clave de aplicación Datadog. Esta clave se [crea en tu organización Datadog][9] y debe almacenarse como secreto.                                                                                                                                                                             |
| `batch_timeout`                        | Especifica la duración del tiempo de espera en milisegundos para el lote CI. Cuando se agota el tiempo de espera de un lote, el trabajo CI falla y no se activan nuevas ejecuciones de tests, pero las ejecuciones de tests en curso finalizan normalmente. <br><sub>**Por defecto:** `1800000` (30 minutos)</sub>                                                                        |
| `config_path`                          | La ruta al [archivo de configuración global][10] que configura datadog-ci. <br><sub>**Por defecto:** `datadog-ci.json`</sub>                                                                                                                                                                                        |
| `datadog_site`                         | Tu sitio Datadog. Los valores posibles se enumeran [en esta tabla][16]. <br><sub>**Por defecto:** `datadoghq.com`</sub> <br><br> Configúralo como {{< region-param key="dd_site" code="true" >}} (asegurarse de seleccionar el SITIO correcto a la derecha).                                                  |
| `device_ids`                           | Sustituye la lista de dispositivos en los que ejecutar tests Synthetic, separados por nuevas líneas. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                                                                       |
| `fail_on_critical_errors`              | Falla el trabajo CI si se produce un error crítico que suele ser transitorio, como límites de frecuencia, fallos de autenticación o problemas de infraestructura de Datadog. <br><sub>**Por defecto:** `false`</sub>                                                                                                                      |
| `fail_on_missing_tests`                | Falla el trabajo CI si la lista de tests a ejecutar está vacía o si faltan algunos tests explícitamente mencionados. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                         |
| `fail_on_timeout`                      | Falla el trabajo CI si el lote CI falla por tiempo de espera excedido. <br><sub>**Por defecto:** `true`</sub>                                                                                                                                                                                                                           |
| `files`                                | Patrones globales para detectar [archivos de configuración de tests][7] Synthetic, separados por nuevas líneas. <br><sub>**Por defecto:** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                   |
| `junit_report`                         | El nombre de archivo de un informe JUnit si quieres generar uno. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                                                                                                    |
| `locations`                            | Sustituye la lista de localizaciones desde las que ejecutar el test, separadas por nuevas líneas o comas. Los valores posibles se enumeran [en esta respuesta de API][20]. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                               |
| `mobile_application_version_file_path` | Sustituye la versión de la aplicación móvil para [tests de aplicación móvil Synthetic][19] por una aplicación local o creada recientemente. Puedes utilizar `$BITRISE_IPA_PATH` o `$BITRISE_APK_PATH` de los pasos de compilación anteriores. <br><sub>**Por defecto:** ninguno</sub>                                                         |
| `mobile_application_version`           | Sustituye la versión de la aplicación móvil para [tests de aplicación móvil Synthetic][19]. La versión debe estar cargada y disponible en Datadog. Puedes utilizar el [paso de Bitrise para cargar una aplicación][11] y utilizar su salida `DATADOG_UPLOADED_APPLICATION_VERSION_ID` aquí. <br><sub>**Por defecto:** ninguno</sub> |
| `public_ids`                           | ID públicos de tests Synthetic que se van a ejecutar, separados por nuevas líneas o comas. Si no se proporciona ningún valor, los tests se detectan en los [archivos de configuración de tests][7] Synthetic. <br><sub>**Por defecto:** ninguno</sub>                                                                                                               |
| `selective_rerun`                      | Si solo se vuelven a ejecutar tests fallidos. Si un test ya ha pasado para una confirmación dada, no se vuelve a ejecutar en los siguientes lotes de CI. Por defecto, se utiliza la configuración predeterminada de tu organización. Configúralo como `false` para forzar ejecuciones completas cuando tu configuración lo permita por defecto. <br><sub>**Por defecto:** ninguno</sub>     |
| `subdomain`                            | El subdominio personalizado para acceder a tu organización Datadog. Si la URL utilizada para acceder a Datadog es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`. <br><sub>**Por defecto:** `app`</sub>                                                                                                                         |
| `test_search_query`                    | Utiliza una [consulta de búsqueda][12] para seleccionar los tests Synthetic a ejecutar. Utiliza la barra de búsqueda de la página con la lista de tests Synthetic][15] para elaborar tu consulta, y luego cópiala y pégala. <br><sub>**Por defecto:** ninguno</sub>                                                                                                              |
| `tunnel`                               | Utiliza el [túnel de Continuous Testing][14] para iniciar tests en entornos internos. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                                       |
| `variables`                            | Sustituye las existentes o inyecta nuevas variables locales y [globales][21] en tests Synthetic como pares clave-valor, separados por nuevas líneas o comas. Por ejemplo: `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Por defecto:** ninguno</sub>                                                                    |

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Empezando con Continuous Testing][17]
- [Continuous Testing y configuración de CI/CD][13]
- [Prácticas recomendadas para Continuous Testing con Datadog][18]

[2]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://devcenter.bitrise.io/en/bitrise-cli/managing-secrets-locally.html
[7]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[11]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application
[12]: https://docs.datadoghq.com/es/synthetics/search/#search
[13]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[14]: https://docs.datadoghq.com/es/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[17]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[18]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[19]: https://docs.datadoghq.com/es/synthetics/mobile_app_testing/
[20]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[21]: https://docs.datadoghq.com/es/synthetics/platform/settings/?tab=specifyvalue#global-variables