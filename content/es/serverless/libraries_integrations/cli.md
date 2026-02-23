---
aliases:
- /es/serverless/datadog_lambda_library/
- /es/serverless/serverless_integrations/cli/
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/packages/plugin-lambda/README.md
title: Datadog Serverless CLI
---
Puedes utilizar la interfaz de línea de comandos (CLI) para instrumentar tus funciones de AWS Lambda con Datadog. La CLI habilita la instrumentación mediante la modificación de la configuración de las funciones de Lambda existentes y, por lo tanto, *no* requiere redistribución. Es la forma más rápida de empezar a trabajar con la monitorización serverless de Datadog.

También puedes añadir el comando a tus pipelines de CI/CD y así activar la instrumentación para *todas* tus aplicaciones serverless. Ejecuta el comando *después* del despliegue normal de tu aplicación serverless para evitar que los cambios del comando de la Datadog CLI se sobrescriban.

## Instalación

Para instrumentar tus funciones de Lambda con el comando `datadog-ci lambda instrument`, sigue las instrucciones de uno de los tiempos de ejecución específicos que se enumeran abajo:

- [.NET](https://docs.datadoghq.com/serverless/installation/dotnet/?tab=datadogcli)
- [Go](https://docs.datadoghq.com/serverless/installation/go/?tab=datadogcli)
- [Java](https://docs.datadoghq.com/serverless/installation/java/?tab=datadogcli)
- [Node.js](https://docs.datadoghq.com/serverless/installation/nodejs/?tab=datadogcli)
- [Python](https://docs.datadoghq.com/serverless/installation/python/?tab=datadogcli)
- [Ruby](https://docs.datadoghq.com/serverless/installation/ruby/?tab=datadogcli)

## Comandos

### `instrument`

Ejecuta `datadog-ci lambda instrument` para aplicar la instrumentación de Datadog a una función de Lambda. Este comando añade la biblioteca Lambda de Datadog o la Datadog Lambda Extension como capas de Lambda a las funciones de Lambda instrumentadas y modifica sus configuraciones.

```bash

datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49

# Instrument multiple functions specified by full ARNs
datadog-ci lambda instrument -f <lambda-arn> -f <another-lambda-arn> -f <a-third-lambda-arn> -v 81 -e 49

# Instrument function(s) in interactive mode
datadog-ci lambda instrument -i

# Instrument multiple functions that match a regex pattern
datadog-ci lambda instrument --functions-regex <valid-regex-pattern> -r us-east-1 -v 81 -e 49

# Dry run of all updates
datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49 --dry-run
```

### `uninstrument`

Ejecuta `datadog-ci lambda uninstrument` para revertir la instrumentación de Datadog en una función de Lambda. Este comando elimina automáticamente la configuración de Datadog, como las capas de la biblioteca Lambda de Datadog y la Datadog Lambda Extension, así como otras configuraciones aplicadas por la datadog-ci.

```bash
# Uninstrument multiple functions specified by names
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1

# Uninstrument function(s) in interactive mode
datadog-ci lambda uninstrument -i

# Uninstrument multiple functions that match a regex pattern
datadog-ci lambda uninstrument --functions-regex <valid-regex-pattern> -r us-east-1

# Dry run of all updates
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1 --dry-run
```

Consulta la sección de configuración para ver parámetros adicionales.

## Configuración

### Credenciales de AWS

Debes tener [credenciales de AWS][1] válidas configuradas con acceso a los servicios Lambda y CloudWatch en los que ejecutas cualquier comando `datadog-ci lambda`.

### Variables de entorno

Debes exponer estas variables de entorno en el entorno en el que ejecutas `datadog-ci lambda instrument`:

| Variable de entorno         | Descripción                                                                                                                                                                                                                                                                                                                                          | Ejemplo                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `DATADOG_API_KEY`            | La clave de la API de Datadog. Define la variable de entorno `DD_API_KEY` en la configuración de tu función de Lambda. Para obtener más información sobre cómo obtener una clave de la API de Datadog, consulta la [documentación sobre la clave de la API][5].                                                                                                                                                         | `export DATADOG_API_KEY=<API_KEY>`                                 |
| `DATADOG_API_KEY_SECRET_ARN` | El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Define `DD_API_KEY_SECRET_ARN` en la configuración de tu función de Lambda. Notas: `DD_API_KEY_SECRET_ARN` se ignora cuando se define `DD_KMS_API_KEY`. Añade el permiso `secretsmanager:GetSecretValue` al rol de ejecución de Lambda.                                           | `export DATADOG_API_KEY_SECRET_ARN=<SECRETS_MANAGER_RESOURCE_ARN>` |
| `DATADOG_KMS_API_KEY`        | La clave de la API de Datadog cifrada mediante KMS. Define la variable de entorno `DD_KMS_API_KEY` en la configuración de tu función de Lambda. Nota: `DD_API_KEY` se ignora cuando se define `DD_KMS_API_KEY`.                                                                                                                                                               | `export DATADOG_KMS_API_KEY=<KMS_ENCRYPTED_API_KEY>`               |
| `DATADOG_SITE`               | Establece el sitio de Datadog al que se enviarán los datos. Sólo es necesario cuando se utiliza la extensión de Lambda Datadog. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, `ap2.datadoghq.com` y `ddog-gov.com`. El valor por defecto es `datadoghq.com`. Establece la variable de entorno `DD_SITE` en las configuraciones de la función de Lambda. | `export DATADOG_SITE="datadoghq.com"`                              |


### Argumentos

Puedes llevar a cabo la configuración con argumentos de la línea de comandos o un archivo de configuración JSON (consulta la siguiente sección).

#### `instrument`
Puedes pasar los siguientes argumentos a `instrument` para especificar su comportamiento. Estos argumentos anularán los valores definidos en el archivo de configuración, si los hay.

| Argumento                       | Abreviatura | Descripción                                                                                                                                                                                                                                                                                                                                   | Valor por defecto |
|--------------------------------| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---------|
| `--function`                   | `-f`      | El ARN de la función de Lambda que se va a **instrumentar**, o el nombre de la función de Lambda (la región debe estar definida en `--region`).                                                                                                                                                                                                                       |         |
| `--functions-regex`            |           | Un patrón regex que debe coincidir con el nombre de la función de Lambda.                                                                                                                                                                                                                                                                                       |         |
| `--interactive`                | `-i`      | Permite al usuario elegir de forma interactiva cómo se instrumentará su función. No es necesario determinar ningún otro indicador si decides utilizar el modo interactivo, ya que se te pedirá la información en su lugar.                                                                                                                       |         |
| `--region`                     | `-r`      | La región por defecto que se va a utilizar, cuando `--function` se especifica mediante el nombre de la función en lugar del ARN.                                                                                                                                                                                                                                                |         |
| `--service`                    |           | Utiliza la etiqueta (tag) `--service` para agrupar funciones relacionadas pertenecientes a cargas de trabajo similares. Obtén más información sobre la etiqueta `service` [aquí][8].                                                                                                                                                                                                                      |         |
| `--version`                    |           | Añade la etiqueta `--version` para correlacionar picos en latencia, cargas o errores con nuevas versiones. Obtén más información sobre la etiqueta `version` [aquí][7].                                                                                                                                                                                                         |         |
| `--env`                        |           | Utiliza la etiqueta `--env` para separar tus entornos de staging, desarrollo y producción. Obtén más información sobre la etiqueta `env` [aquí][6].                                                                                                                                                                                                                 |         |
| `--extra-tags`                 |           | Añade etiquetas personalizadas a tu función de Lambda en Datadog. Debe ser un lista de `<key>:<value>` separados por comas como: `layer:api,team:intake`.                                                                                                                                                                                                   |         |
| `--profile`                    |           | Especifica las credenciales del perfil con nombre de AWS que se utilizarán para instrumentar. Obtén más información sobre los perfiles con nombre de AWS [aquí][11].                                                                                                                                                                                                                               |         |
| `--layer-version`              | `-v`      | La versión de la capa de la biblioteca Lambda de Datadog que se va a aplicar. Esto varía entre los tiempos de ejecución. Para ver la última versión de la capa, consulta las notas de versión del repositorio datadog-lambda-layer de [JS][2] o [Python][3].                                                                                                                                                 |         |
| `--extension-version`          | `-e`      | La versión de la capa de la Datadog Lambda Extension que se va a aplicar. Al definir `extension-version`, asegúrate de exportar `DATADOG_API_KEY` (o si está cifrada, `DATADOG_KMS_API_KEY` o `DATADOG_API_KEY_SECRET_ARN`) en tu entorno también. Si utilizas `extension-version`, omite `forwarder`. Obtén más información sobre la extensión de Lambda [aquí][4]. |         |
| `--tracing`                    |           | Lo utilizas si quieres habilitar el rastreo dd-trace en tu función de Lambda.                                                                                                                                                                                                                                                                                            | `true`  |
| `--merge-xray-traces`          |           | Lo utilizas si quieres unir las trazas (traces) de dd-trace con las trazas de AWS X-Ray. Es útil para rastrear tramos (spans) de API Gateway.                                                                                                                                                                                                                                                    | `false` |
| `--flush-metrics-to-logs`      |           | Lo utilizas si quieres enviar métricas a través del Datadog Forwarder [de forma asíncrona][10]. Si deshabilitas este parámetro, debes exportar `DATADOG_API_KEY` (o si está cifrada, `DATADOG_KMS_API_KEY` o `DATADOG_API_KEY_SECRET_ARN`).                                                                                                                    | `true`  |
| `--capture-lambda-payload`     |           | Lo utilizas si quieres capturar y almacenar la carga útil y la respuesta de una invocación de Lambda.                                                                                                                                                                                                                                                                 | `false` |
| `--forwarder`                  |           | El ARN del [Datadog Forwarder][9] al que se le adjuntará este LogGroup de la función.                                                                                                                                                                                                                                                                  |         |
| `--dry-run`                    | `-d`      | Lo utilizas si quieres previsualizar los cambios que se aplicarán al ejecutar el comando.                                                                                                                                                                                                                                                                                                  | `false` |
| `--logging`                    |           | Si deseas recopilar logs mediante la extensión de Lambda.                                                                                                                                                                                                                                                                                           | `true`  |
| `--log-level`                  |           | Configura `debug` para ver una salida adicional de la biblioteca Lambda de Datadog o la extensión de Lambda con fines de resolución de problemas.                                                                                                                                                                                                                 |         |
| `--source-code-integration`    | `-s`      | Lo utilizas si quieres habilitar la [integración del código fuente de Datadog][12]. Esto etiquetará tus funciones de Lambda con la URL del repositorio Git y el hash del último commit del directorio local actual. **Nota**: El repositorio Git no debe estar por delante del remoto, y no debe estar sucio.                                                                                     | `true`  |
| `--no-source-code-integration` |           | Deshabilita la integración del código fuente de Datadog.                                                                                                                                                                                                                                                                                                     |         |
| `--upload-git-metadata`        | `-u`      | Lo utilizas si quieres habilitar la carga de metadatos de Git, como parte de la integración del código fuente. La carga de metadatos de Git solo es necesaria si no tienes instalada la integración de Github de Datadog.                                                                                                                                                           | `true`  |
| `--no-upload-git-metadata`     |           | Deshabilita la carga de metadatos de Git, como parte de la integración del código fuente. Utiliza esta opción si tienes instalada la integración de Github de Datadog, ya que hace que la carga de metadatos de Git sea innecesaria.                                                                                                                                                  |         |
| `--apm-flush-deadline`         |           | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS Lambda es inferior al valor configurado, el rastreador intenta enviar los tramos (spans) activos actuales y todos los tramos finalizados. Compatible con NodeJS y Python. El valor por defecto es `100` milisegundos.                              |         |
| `--llmobs`                     |           | Si se especifica, habilita LLM Observability para las funciones instrumentadas con el nombre de aplicación de ML proporcionado.                                                                                                                                                                                                                               | `false` |
| `--lambda-fips`                |           | Habilita la compatibilidad con FIPS en las funciones de Lambda desplegadas mediante esta herramienta. Ten en cuenta que para el cumplimiento completo de FIPS, se requiere un endpoint FIPS como `ddog-gov.com`.                                                                                                                                                                                                                               |         |
<br />

#### `uninstrument`
Los siguientes argumentos se pasan a `uninstrument` para especificar su comportamiento. Estos argumentos anularán los valores definidos en el archivo de configuración, si los hay.

Cualquier otro argumento indicado en la tabla `instrument`, pero no debajo, se ignorará para permitir una reversión más rápida de la instrumentación, en caso de que sea necesario.

| Argumento            | Abreviatura | Descripción                                                                                                               | Valor predeterminado |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`        | `-f`      | El ARN de la función de Lambda cuya instrumentación se va a **revertir**, o el nombre de la función de Lambda (la región debe estar definida en `--region`). |         |
| `--functions-regex` |           | Un patrón regex que debe coincidir con el nombre de la función de Lambda cuya instrumentación se va a **revertir**.                                          |         |
| `--region`          | `-r`      | La región por defecto que se va a utilizar, cuando `--function` se especifica mediante el nombre de la función en lugar del ARN.                            |         |
| `--profile`         |           | Especifica las credenciales del perfil con nombre de AWS que se utilizarán para revertir la instrumentación. Obtén más información sobre los perfiles con nombre de AWS [aquí][11].         |         |
| `--forwarder`       |           | El ARN del [Datadog Forwarder][9] que se eliminará de esta función.                                                       |         |
| `--dry-run`         | `-d`      | Lo utilizas si quieres previsualizar los cambios que se aplicarán al ejecutar el comando.                                                                              | `false` |

<br/>

### Archivo de configuración

En lugar de suministrar argumentos, puedes crear un archivo de configuración en tu proyecto y simplemente ejecutar el comando `datadog-ci lambda {instrument|uninstrument} --config datadog-ci.json` en cada despliegue. Especifica el archivo `datadog-ci.json` mediante el argumento `--config` y utiliza esta estructura de archivo de configuración:

```json
{
    "lambda": {
        "layerVersion": 10,
        "extensionVersion": 8,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "captureLambdaPayload": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
        "logLevel": "debug",
        "service": "some-service",
        "version": "b17s47h3w1n",
        "profile": "my-credentials",
        "environment": "staging",
        "extraTags": "layer:api,team:intake"
    }
}
```

## Solucionar problemas de instrumentación de Lambda

Para solucionar los problemas relacionados con la monitorización de Datadog en tus funciones de Lambda, ejecuta el comando `datadog-ci lambda flare` en la raíz del directorio de tu proyecto. Este comando recopila datos importantes sobre una función de Lambda, como las variables de entorno y el archivo de configuración. Estos archivos luego se envían al equipo de asistencia de Datadog a través de un ticket que coincide con el ID del caso de Zendesk especificado.

**Nota**: Este comando funciona independientemente de si instrumentaste tus funciones de Lambda mediante `datadog-ci lambda instrument`.

**Ejemplos**
```bash
# Collect and send files to Datadog support for a single function
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id>

# Include recent CloudWatch logs
datadog-ci lambda flare -f <function-name> -r <AWS region> -c <case-id> -e <email-on-case-id> --with-logs

# Dry run: collect data, but don't send to Datadog support
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id> --with-logs --dry-run
```

**Argumentos**

| Argumento              | Abreviatura | Descripción                                                                                                                           | Valor predeterminado |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`          | `-f`      | El ARN de la función de Lambda para la cual se van a recopilar datos, o el nombre de la función de Lambda (la región debe estar definida en `--region`).                   |         |
| `--region`            | `-r`      | La región por defecto que se va a utilizar, cuando `--function` se especifica mediante el nombre de la función en lugar del ARN.                                        |         |
| `--case-id`           | `-c`      | El ID del caso de Datadog al que se enviarán los archivos.                                                                                             |         |
| `--email`             | `-e`      | El correo electrónico asociado con el ID del caso especificado.                                                                                      |         |
| `--with-logs`         |           | Recopila logs de CloudWatch recientes para la función especificada.                                                                            | `false` |
| `--start` y `--end` |           | Solo recopilan logs dentro del intervalo especificado (`--with-logs` debe estar incluido). Ambos argumentos son números en milisegundos de Unix Epoch. |         |
| `--dry-run`           | `-d`      | Vista previa de los datos recopilados que se enviarán al equipo de asistencia de Datadog.                                                                        | `false` |

**Permisos**

Para ejecutar este comando, debes tener los siguientes permisos de IAM:
- `lambda:GetFunction`
- `lambda:ListTags`
- `logs:DescribeLogStreams` (obligatorio si `--with-logs` está configurado)
- `logs:GetLogEvents` (obligatorio si `--with-logs` está configurado)

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://docs.datadoghq.com/es/serverless/datadog_lambda_library/extension
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[6]: https://docs.datadoghq.com/es/serverless/troubleshooting/serverless_tagging/#the-env-tag
[7]: https://docs.datadoghq.com/es/serverless/troubleshooting/serverless_tagging/#the-version-tag
[8]: https://docs.datadoghq.com/es/serverless/troubleshooting/serverless_tagging/#the-service-tag
[9]: https://docs.datadoghq.com/es/serverless/forwarder/
[10]: https://docs.datadoghq.com/es/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics
[11]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles
[12]: https://docs.datadoghq.com/es/integrations/guide/source-code-integration

<!--
  Esta página tiene una sola fuente:
  https://github.com/DataDog/documentation/blob/7007931530baf7da59310e7224a26dc9a71c53c5/local/bin/py/build/configurations/pull_config_preview.yaml#L301
-->