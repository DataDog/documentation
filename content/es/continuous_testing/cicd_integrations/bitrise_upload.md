---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application/blob/main/README.md
title: Pruebas continuas y Bitrise
---
![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-upload-application)
[![Build Status](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1/status.svg?token=CiGeaNblC2veLBtAbTgmLQ&branch=main)](https://app.bitrise.io/app/2d252b25-8c31-427b-98e8-1d0b2bc484c1)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Información general

Con el paso `synthetics-test-automation-bitrise-step-upload-application`, puedes cargar una nueva versión de tu aplicación a Datadog para ejecutar tests Sintético durante tu Bitrise CI, asegurándote de que todos tus equipos que utilizan Bitrise puedan beneficiarse con las tests Sintético en cada etapa del ciclo de vida del software. Este paso utiliza el comando [Datadog CI Synthetics][2] y requiere que tu aplicación ya exista.

## Configuración

Este paso no está disponible en la página oficial Bitrise Step Library.
Para empezar:

1. Añade la siguiente URL git a tu flujo de trabajo. Consulta la [documentación oficial de Bitrise][3] sobre cómo hacerlo a través de la aplicación Bitrise. También la puedes configurar localmente haciendo referencia a la URL git en tu archivo `bitrise.yml`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@1.10.0:
```

2. Añada tus claves API y de aplicación a tus [secretos en Bitrise][4].
3. [Configurar tus entradas de pasos][5]. También puedes configurarlas en ru archivo `bitrise.yml`. Las únicas entradas requeridas son los dos secretos que configuraste anteriormente. Para obtener una lista completa de entradas, consulta la [sección Entradas](#inputs).

## Cómo utilizar este paso a nivel local

Puedes ejecutar este paso directamente utilizando la [Bitrise CLI][6].

Para ejecutar este paso localmente:

1. Abre tu terminal o línea de comandos.
2. `git clone` el [repositorio Bitrise][6].
3. `cd` en el directorio del paso (el que acabas de `git clone`).
4. Crea un archivo `.bitrise.secrets.yml` en el mismo directorio que `bitrise.yml`. El archivo `.bitrise.secrets.yml` es un archivo ignorado por Git, por lo que puedes almacenar tus secretos en él.
5. Check el archivo `bitrise.yml` para cualquier secreto que debas configurar en `.bitrise.secrets.yml`.
6. Una vez que tengas los parámetros secretos necesarios en tu archivo `.bitrise.secrets.yml`, ejecuta este paso con la [Bitrise CLI][6] con `bitrise run test`.

Un ejemplo de archivo `.bitrise.secrets.yml`:

```yml
envs:
- A_SECRET_PARAM_ONE: the value for secret one
- A_SECRET_PARAM_TWO: the value for secret two
```

## Uso

### Ejemplo de tarea que utiliza una anulación global de configuración con `configPath`

Esta tarea anula la ruta al archivo global `datadog-ci.config.json`.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './synthetics-config.json'
```

Para ver un ejemplo de archivo de configuración, consulta el [ archivo`global.config.json` ][7].

### Ejemplo con todas las configuraciones posibles

Como referencia, este es un ejemplo de una configuración completa:

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application.git@1.10.0:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
   - latest: true
   - mobile_application_version_id: '123-123-123'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - site: 'datadoghq.com'
   - version_name: 'example 1.0'
```

## Entradas

| Nombre                               | Requisito | Descripción                                                                                                                             |
| -----------------------------------| :---------: | --------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                           | _required_  | Su clave de API Datadog. Esta clave es creada por tu [organización Datadog][8] y se accederá a ella como una variable de entorno.         |
| `appKey`                           | _required_  | Tu clave de aplicación Datadog. Esta clave es creada por tu [organización Datadog][8] y se accederá a ella como una variable de entorno. |
| `configPath`                       | _opcional_  | La configuración global de JSON se utiliza al lanzar las tests. Consulta el [ejemplo de configuración][9] para obtener más detalles.                     |
| `latest`                           | _opcional_  | Marca la aplicación como `latest`. Cualquier test que se ejecute en la última versión utilizará esta versión en la siguiente ejecución.                    |
| `mobileApplicationVersionId`       | _required_  | ID de la aplicación a la que quieres cargar la nueva versión.                                                                            |
| `mobileApplicationVersionFilePath` | _required_  | Anula la versión de la aplicación para [tests de la aplicación móvil Sintético][15].                                                                |
| `site`                             | _opcional_  | El [sitio Datadog][14] al que enviar los datos.  Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}. Si la variable de entorno`DD_SITE` está configurada, tiene prioridad.                                    |
| `versionName`                      | _required_  | Nombre de la nueva versión. Tiene que ser único.                                                                                           |

## Salidas

| Nombre                                      | Descripción                                                                                                                                                                                               |
| ------------------------------------------| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_UPLOADED_APPLICATION_VERSION_ID` | El ID de la versión de la aplicación que se acaba de cargar. Pásalo al paso [`datadog-mobile-app-run-tests` ][10] con la entrada `mobile_application_version` para hacer un test de esta versión de la aplicación. |

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Empezando con pruebas continuas][13]
- [Pruebas continuas y configuración de CI/CD][11]
- [Mejores prácticas para pruebas continuas con Datadog][12]

<!-- Links to Marketplace -->
[1]: https://bitrise.io/integrations/steps/datadog-mobile-app-upload
[2]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://github.com/bitrise-io/bitrise
[7]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[9]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[10]: https://bitrise.io/integrations/steps/datadog-mobile-app-run-tests
[11]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[14]: https://docs.datadoghq.com/es/getting_started/site/
[15]: https://docs.datadoghq.com/es/synthetics/mobile_app_testing/