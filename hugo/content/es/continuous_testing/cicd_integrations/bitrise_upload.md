---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application/blob/main/README.md
title: Pruebas continuas y Bitrise
---
![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-upload-application)
[![Build Status](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1/status.svg?token=CiGeaNblC2veLBtAbTgmLQ&branch=main)](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con el paso `synthetics-test-automation-bitrise-step-upload-application`, puedes cargar una nueva versión de tu aplicación en Datadog para ejecutar tests Synthetic durante tu Bitrise CI, asegurándote de que todos tus equipos que utilizan Bitrise puedan beneficiarse de los tests Synthetic en cada etapa del ciclo de vida del software.

Este paso requiere que tu aplicación ya exista en Datadog.

Para obtener más información sobre la configuración disponible, consulta la [documentación de `datadog-ci upload-application`][2].

## Configuración

Este paso no está disponible en la Biblioteca de pasos oficial de Bitrise.
Para empezar:

1. Añade la siguiente URL git a tu flujo de trabajo. Consulta la [documentación oficial de Bitrise][3] sobre cómo hacerlo a través de la aplicación Bitrise. También la puedes configurar localmente haciendo referencia a la URL git en tu archivo `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.7.0:
```

2. Añade tus claves de API y de aplicación a tus [secretos en Bitrise][4].
3. [Configurar tus entradas de pasos][5]. También puedes configurarlas en tu archivo `bitrise.yml`. Las únicas entradas requeridas son los dos secretos que configuraste anteriormente. Para obtener una lista completa de entradas, consulta la [Sección de entradas](#inputs).

Cuando se ejecuta el paso localmente con la Bitrise CLI, los secretos deben almacenarse en un archivo `.bitrise.secrets.yml`. Consulta [Gestión local de secretos][6].

## Utilización

### Ejemplo de tarea que utiliza una anulación global de configuración con `configPath`

Esta tarea anula la ruta del archivo global `datadog-ci.config.json`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.7.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './synthetics-config.json'
```

### Ejemplo con todas las configuraciones posibles

Como referencia, este es un ejemplo de una configuración completo:

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@v2.7.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
   - datadog_site: 'datadoghq.com'
   - latest: true
   - mobile_application_id: '123-123-123'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - version_name: 'example 1.0'
```

## Entradas

Para obtener más información sobre la configuración disponible, consulta la [documentación de `datadog-ci upload-application`][2].

| Nombre                                   | Descripción                                                                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                              | (**Obligatorio**) Tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][8] y debe almacenarse como secreto.                                                                                                                                     |
| `app_key`                              | (**Obligatorio**) Tu clave de aplicación Datadog. Esta clave se [crea en tu organización Datadog][8] y debe almacenarse como secreto.                                                                                                                             |
| `config_path`                          | La ruta al [archivo de configuración global][9] que configura datadog-ci. <br><sub>**Por defecto:** `datadog-ci.json`</sub>                                                                                                                                         |
| `datadog_site`                         | Tu sitio Datadog. Los valores posibles se enumeran [en esta tabla][14]. <br><sub>**Por defecto:** `datadoghq.com`</sub> <br><br> Configúralo como {{< region-param key="dd_site" code="true" >}} (asegurarse de seleccionar el SITIO correcto a la derecha).  |
| `latest`                               | Marca la nueva versión como `latest`. Cualquier test que se ejecute en la versión más reciente utilizará esta versión en su próxima ejecución. <br><sub>**Por defecto:** `false`</sub>                                                                                                          |
| `mobile_application_id`                | (**Obligatorio**) El ID de la aplicación a la que quieres cargar la nueva versión.                                                                                                                                                                                  |
| `mobile_application_version_file_path` | (**Obligatorio**) La ruta a la nueva versión de tu aplicación móvil (`.apk` o `.ipa`). Puedes utilizar `$BITRISE_IPA_PATH` o `$BITRISE_APK_PATH` de los pasos de compilación anteriores.                                                                                 |
| `version_name`                         | (**Obligatorio**) El nombre de la nueva versión. Tiene que ser único.                                                                                                                                                                                                 |

## Salidas

| Nombre                                      | Descripción                                                                                                                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_UPLOADED_APPLICATION_VERSION_ID` | El ID de la versión de la aplicación que se acaba de cargar. Pásalo al [paso de Bitrise para ejecutar tests][10] con la entrada `mobile_application_version` para probar esta versión de la aplicación. |

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Empezando con pruebas continuas][13]
- [Pruebas continuas y configuración de CI/CD][11]
- [Mejores prácticas para pruebas continuas con Datadog][12]

[2]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#upload-application-command
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://devcenter.bitrise.io/en/bitrise-cli/managing-secrets-locally.html
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[9]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[10]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests
[11]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[14]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site