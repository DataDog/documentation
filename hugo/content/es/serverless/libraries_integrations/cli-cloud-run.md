---
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/packages/plugin-cloud-run/README.md
title: CLI serverless de Datadog para Cloud Run
---
Puedes utilizar la CLI para [instrumentar tus servicios de Cloud Run](https://docs.datadoghq.com/serverless/google_cloud_run) con Datadog. La CLI permite la instrumentación mediante la modificación de la configuración de los servicios Cloud Run existentes.

## Comandos

### `instrument`

Ejecuta `datadog-ci cloud-run instrument` para aplicar la instrumentación de Datadog a un servicio de Cloud Run. Este comando añade un contenedor sidecar, un volumen compartido de log y añade las variables de entorno necesarias.

```bash

datadog-ci cloud-run instrument -p <gcp-project> -r us-central1 -s <service-name> -s <another-service-name>

# Instrument a service in interactive mode
datadog-ci cloud-run instrument -i

# Instrument a service with a pinned or custom sidecar image
datadog-ci cloud-run instrument -p <gcp-project> -r us-central1 -s <service-name> --sidecarImage gcr.io/datadoghq/serverless-init@sha256:<sha256>

# Dry run of all updates
datadog-ci cloud-run instrument -p <gcp-project> -r us-central1 -s <service-name> -d
```

### `uninstrument`

Ejecuta `datadog-ci cloud-run uninstrument` para revertir la instrumentación de Datadog desde un servicio de Cloud Run. Este comando actualiza la configuración mediante la eliminación del contenedor sidecar, el volumen compartido de log y las variables de entorno de Datadog.

```bash
# Uninstrument multiple services specified by names
datadog-ci cloud-run instrument -p <gcp-project> -r us-central1 -s <service-name> -s <another-service-name>

# Uninstrument a service in interactive mode
datadog-ci cloud-run uninstrument -i

# Dry run of all updates
datadog-ci cloud-run uninstrument -p <gcp-project> -r us-central1 -s <service-name> -d
```

## Configuración

### Credenciales de GCP

Debes tener [credenciales de GCP][1] válidas configuradas con acceso a los servicios de Cloud Run en los que estés ejecutando cualquier comando de `datadog-ci cloud-run`. Puedes configurar las credenciales ejecutando `gcloud auth application-default login` y siguiendo las indicaciones del navegador.

### Variables de entorno

Debes exponer estas variables de entorno en el entorno en el que estás ejecutando `datadog-ci cloud-run instrument`:

| Variable de entorno | Descripción | Ejemplo |
| -------------------- | ----------- | ------- |
| `DD_API_KEY`         | Clave de API de Datadog. Establece la variable de entorno `DD_API_KEY` en tu servicio de Cloud Run. | `export DD_API_KEY=<API_KEY>` |
| `DD_SITE`            | Establece el sitio Datadog al que se enviarán los datos. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, `ap2.datadoghq.com` y `ddog-gov.com`. El valor predeterminado es `datadoghq.com`. | `export DD_SITE=datadoghq.com` |

### Argumentos

La configuración puede realizarse utilizando argumentos de la línea de comandos.

#### `instrument`
Puedes pasar los siguientes argumentos a `instrument` para especificar su comportamiento.

<!-- BEGIN_USAGE:instrument -->
| Argumento | Abreviatura | Descripción | Predeterminado |
| -------- | --------- | ----------- | ------- |
| `--dry` o `--dry-run` | `-d` | Ejecuta el comando en modo ejecución en seco, sin realizar ningún cambio. Previsualiza los cambios que aplicaría la ejecución del comando. | `false` |
| `--extra-tags` o `--extraTags` |  | Añade tags (etiquetas) personalizadas a tu servicio de Cloud Run en Datadog. Debe ser una lista de `<key:><value>` separada por comas. |  |
| `--env-vars` | `-e` | Variables de entorno adicionales a configurar para el servicio de Cloud Run. Puedes especificar múltiples variables en el formato `--env-vars VAR1=VALUE1 --env-vars VAR2=VALUE2`. |  |
| `--project` | `-p` | Nombre del project (proyecto) de Google Cloud donde se aloja el servicio de Cloud Run. |  |
| `--service` o `--services` | `-s` | Servicio de Cloud Run a instrumentar |  |
| `--interactive` | `-i` | Selecciona en forma interactiva cuál servicio se instrumentará. No se necesitan otras marcas. | `false` |
| `--region` | `-r` | La región donde se aloja el servicio de Cloud Run. |  |
| `--log-level` o `--logLevel` |  | Especifica tu nivel de logs de Datadog. |  |
| `--source-code-integration` o `--sourceCodeIntegration` |  | Si se activa la integración del código fuente de Datadog. Esto etiqueta tu(s) servicio(s) con el repositorio de Git y el hash de confirmación más reciente del directorio local. Especifica `--no-source-code-integration` para desactivarlo. | `true` |
| `--upload-git-metadata` o `--uploadGitMetadata` |  | Si se activa la carga de metadatos de Git, como parte de la integración del código fuente. La carga de metadatos de Git solo es necesaria si no tienes instalada la integración de Datadog y GitHub. Especifica `--no-upload-git-metadata` para desactivarlo. | `true` |
| `--tracing` |  | Activa el rastreo de tu aplicación si el rastreador está instalado. Desactiva el rastreo configurando `--tracing false`. |  |
| `--service-tag` o `--serviceTag` |  | El valor para la tag (etiqueta) del servicio. Utiliza esto para agrupar servicios de Cloud Run relacionados que pertenezcan a cargas de trabajo similares. Por ejemplo, `my-service`. Si no se proporciona, se utiliza el nombre del servicio de Cloud Run. |  |
| `--version` |  | El valor para la tag (etiqueta) de la versión. Utiliza esto para correlacionar picos en la latencia, la carga o errores con nuevas versiones. Por ejemplo, `1.0.0`. |  |
| `--env` |  | El valor para la tag (etiqueta) de la variable de entorno. Utiliza esto para separar tus entornos de almacenamiento provisional, desarrollo y producción. Por ejemplo, `prod`. |  |
| `--llmobs` |  | Si se especifica, activa LLM Observability para los servicios instrumentados con el nombre de la aplicación de ML proporcionado. |  |
| `--image` o `--sidecar-image` |  | La imagen a utilizar para el contenedor de sidecar. | `gcr.io/datadoghq/serverless-init:latest` |
| `--sidecar-name` |  | (No recomendado) El nombre a utilizar para el contenedor de sidecar. | `datadog-sidecar` |
| `--shared-volume-name` |  | (No recomendado) Especifica un nombre de volumen compartido personalizado. | `shared-volume` |
| `--shared-volume-path` |  | (No recomendado) Especifica una ruta de acceso de volumen compartida personalizada. | `/shared-volume` |
| `--logs-path` |  | (No recomendada) Especifica una ruta de acceso de archivo de logs personalizada. Debe comenzar con la ruta de acceso de volumen compartida. | `/shared-volume/logs/*.log` |
| `--sidecar-cpus` |  | El número de CPU a asignar al contenedor de sidecar. | `1` |
| `--sidecar-memory` |  | La cantidad de memoria a asignar al contenedor de sidecar. | `512Mi` |
| `--language` |  | Configura el lenguaje utilizado en tu contenedor o función para el análisis avanzado de logs. Configura la variable de variable de entorno DD_SOURCE. Posibles valores: "nodejs", "python", "go", "java", "csharp", "ruby" o "php". |  |
<!-- END_USAGE:instrument -->

#### `uninstrument`
Puedes pasar los siguientes argumentos a `uninstrument` para especificar su comportamiento.

<!-- BEGIN_USAGE:uninstrument -->
| Argumento | Abreviatura | Descripción | Predeterminada |
| -------- | --------- | ----------- | ------- |
| `--dry` o `--dry-run` | `-d` | Ejecuta el comando en modo de ejecución en seco, sin realizar ningún cambio. Previsualiza los cambios que aplicaría la ejecución del comando. | `false` |
| `--project (proyecto)` | `-p` | El nombre del project (proyecto) de Google Cloud donde está alojado el servicio de Cloud Run. | |
| `--service` o `--services` | `-s` | Servicio(s) de Cloud Run para revertir la instrumentación | |
| `--interactive` | `-i` | Selecciona en forma interactiva qué servicio se instrumenta. No se necesitan otras marcas. | `false` 
| `--region` | `-r` | La región donde se aloja el servicio de Cloud Run. | |
| `--sidecar-name` | | El nombre del contenedor de sidecar a eliminar. Especifícalo si tienes un nombre de sidecar diferente. | `datadog-sidecar` |
| `--shared-volume-name` | | El nombre del volumen compartido a eliminar. Especifícalo si tienes un nombre de volumen compartido diferente. | `shared-volume` |
| `--env-vars` | `-e` | Variables de entorno adicionales a eliminar del servicio de Cloud Run. Puedes especificar múltiples variables en el formato `--env-vars VAR1=VALUE1 --env-vars VAR2=VALUE2`. | |
<!-- END_USAGE:uninstrument -->

#### `flare`
Puedes pasar los siguientes argumentos a `flare` para especificar su comportamiento.

<!-- BEGIN_USAGE:flare -->
| Argumento | Abreviatura | Descripción | Predeterminado |
| -------- | --------- | ----------- | ------- |
| `--dry` or `--dry-run` | `-d` | Previsualiza datos que se enviarán a la asistencia de Datadog. | `false` |
| `--with-logs` |  | Recopila logs recientes para el servicio especificado. | `false` |
| `--service` | `-s` | El nombre del servicio de Cloud Run. |  |
| `--project` | `-p` | El nombre del project (proyecto) de Google Cloud donde está alojado el servicio de Cloud Run. |  |
| `--region` o `--location` | `-r` o `-l` | La región en la que está alojado el servicio de Cloud Run. |  |
| `--case-id` | `-c` | El identificador de case (incidencia) de Datadog al que enviar los archivos. |  |
| `--email` | `-e` | El correo electrónico asociado al identificador de case (incidencia) especificado. |  |
| `--start` |  | Solo recopila logs después del tiempo en milisegundos desde Unix Epoch. (`--with-logs` se debe especificar.) |  |
| `--end` |  | Solo recopila logs antes del tiempo en milisegundos desde Unix Epoch. (`--with-logs` se debe especificar.) |  |
<!-- END_USAGE:flare -->

## Resolución de problemas de instrumentación de Cloud Run

Para solucionar los problemas que encuentres con la monitorización de Datadog en tus servicios de Cloud Run, ejecuta el comando `datadog-ci cloud-run flare` en la raíz de tu directorio de project (proyecto). Este comando recopila datos importantes sobre el servicio de Cloud Run, como variables de entorno y la configuración YAML. Estos archivos se envían a Datadog a través de un ticket que coincide con el identificador de case (incidencia) de Zendesk proporcionado.

**Nota**: Este comando funciona independientemente de si tus servicios de Cloud Run se instrumentaron con `datadog-ci cloud-run instrument`.

### Ejemplos
```bash
# Collect and send files to Datadog support for a single service
datadog-ci cloud-run flare -s <service> -p <project> -r <region/location> -c <case-id> -e <email-on-case-id>

# Include recent logs
datadog-ci cloud-run flare -s <service> -p <project> -r <region/location> -c <case-id> -e <email-on-case-id> --with-logs

# Dry run: collect data, but don't send to Datadog support
datadog-ci cloud-run flare -s <service> -p <project> -r <region/location> -c <case-id> -e <email-on-case-id> --with-logs --dry-run
```

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

[1]: https://cloud.google.com/sdk/gcloud/reference/auth/login
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Más información sobre la instrumentación de Google Cloud Run][1]

[1]: https://docs.datadoghq.com/es/serverless/google_cloud_run