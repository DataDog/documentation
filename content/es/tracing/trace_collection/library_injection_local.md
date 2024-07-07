---
aliases:
- /es/tracing/trace_collection/admission_controller/
- /es/tracing/trace_collection/library_injection/
description: Inyección de bibliotecas de instrumentación en aplicaciones
title: Inyección local de bibliotecas
---

## Información general

Para instrumentar automáticamente tu aplicación puedes:

- Utilizar la instrumentación automática con inyección de bibliotecas locales, como se describe en esta página.
- Utilizar la [instrumentación en un solo paso][6].
- Utilizar las [bibliotecas de Datadog][7].

Para obtener más información, consulta [Instrumentación automática][5].

La forma de inyectar bibliotecas localmente, sin tocar para nada el código de la aplicación, varía en función de dónde y cómo están instalados tu Agent y tu aplicación. Selecciona el escenario que representa tu entorno:

{{< tabs >}}
{{% tab "Kubernetes" %}}

A través de la estrategia del [controlador de admisión][1], el Agent utiliza el controlador de admisión Kubernetes para interceptar las solicitudes a la API Kubernetes y mutar nuevos pods para inyectar las bibliotecas de instrumentación especificadas.

<div class="alert alert-warning">La inyección de bibliotecas sólo se aplica a los pods nuevos y no tiene ningún impacto en los pods en ejecución.</div>

Para obtener más información sobre el controlador de admisión Kubernetes, consulta la [referencia de los controladores de admisión Kubernetes][2].

## Requisitos

* Kubernetes v1.14 o posterior
* Datadog [Cluster Agent v7.40 o posterior][3], para Java, Python y NodeJS, y Datadog [Cluster Agent v7.44 o posterior][3], para .NET y Ruby.
* Controlador de admisión Datadog habilitado. **Nota**: En el chart de Helm v2.35.0 y posteriores, el controlador de admisión Datadog está habilitado por defecto en el Cluster Agent.
* Para Python, las aplicaciones uWSGI no son compatibles en este momento.
* Para Ruby, la compatibilidad de la inyección de bibliotecas está en fase Beta. La instrumentación sólo es compatible con Ruby en aplicaciones Rails con una versión de empaquetador superior a 2.3 y sin gemas vendidas (modo de despliegue o `BUNDLE_PATH`).
* Aplicaciones en Java, JavaScript, Python, .NET, o Ruby desplegadas en Linux con una arquitectura compatible. Para ver la lista completa de arquitecturas soportadas por lenguaje, consulta el [registro de contenedores correspondiente](#container-registries).

## Registros de contenedores

<div class="alert alert-warning">Docker Hub está sujeto a límites en la tasa de extracción de imágenes. Si no eres cliente de Docker Hub, Datadog recomienda que actualices tu configuración del Datadog Agent y del Cluster Agent para extraer desde GCR o ECR. Para obtener instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambio de tu registro de contenedores</a>.</div>

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:
| Lenguaje   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][4]   | [hub.docker.com/r/datadog/dd-lib-java-init][5]   | [gallery.ecr.aws/datadog/dd-lib-java-init][6]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][7]     | [hub.docker.com/r/datadog/dd-lib-js-init][8]     | [gallery.ecr.aws/datadog/dd-lib-js-init][9]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][10] | [hub.docker.com/r/datadog/dd-lib-python-init][11] | [gallery.ecr.aws/datadog/dd-lib-python-init][12] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][13] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][14] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][15] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][23] | [hub.docker.com/r/datadog/dd-lib-ruby-init][24] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][25] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Cluster Agent especifica el registro utilizado por el controlador de admisión. El valor por defecto es `gcr.io/datadoghq`.

Puedes extraer la biblioteca de rastreo de un registro diferente cambiándolo por `docker.io/datadog`, `public.ecr.aws/datadog` u otra URL, si alojas las imágenes en un registro de contenedores local.

## Configuración de la inyección de bibliotecas de instrumentación

Para tus aplicaciones Kubernetes cuyas trazas quieres enviar a Datadog, configura el controlador de admisión Datadog para inyectar bibliotecas de instrumentación Java, JavaScript, Python, .NET o Ruby automáticamente. Desde un nivel superior, esto involucra los siguientes pasos, descritos en detalle a continuación:

1. Habilita el controlador de admisión para mutar tus pods.
2. Anota tus pods para seleccionar qué biblioteca de instrumentación inyectar.
3. Etiqueta tus pods con el etiquetado unificado de servicios para unir la telemetría de Datadog y navegar sin problemas por trazas, métricas y logs con etiquetas coherentes.
4. Aplica tu nueva configuración.

<div class="alert alert-info">No es necesario generar una nueva imagen de la aplicación para inyectar la biblioteca. La inyección de bibliotecas se realiza añadiendo la biblioteca de instrumentación, por lo que no es necesario realizar ningún cambio en la imagen de la aplicación.</div>

### Paso 1 - Habilitar el controlador de admisión Datadog para mutar tus pods

Por defecto, el controlador de admisión Datadog muta sólo los pods etiquetados con una etiqueta (label) específica. Para habilitar la mutación en tus pods, añade la etiqueta `admission.datadoghq.com/enabled: "true"` a las especificaciones del pod.

**Nota**: Puedes configurar el controlador de admisión Datadog para habilitar la configuración de inyección sin tener esta etiqueta (label) de pod, configurando el Cluster Agent con `clusterAgent.admissionController.mutateUnlabelled` (o `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) como `true`.

Para obtener más detalles sobre cómo configurarlo, consulta la [página del controlador de admisión Datadog][1].

Por ejemplo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Habilitar el controlador de admisión para mutar nuevos pods como parte de este despliegue
    spec:
      containers:
        - # (...)
```

### Paso 2 - Anotar tus pods para la biblioteca de inyección

Para seleccionar tus pods para la inyección de bibliotecas, utiliza las anotaciones proporcionadas en la siguiente tabla dentro de las especificaciones de tu pod:

| Lenguaje   | Anotación del pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

Las versiones de biblioteca disponibles se enumeran en cada registro de contenedores, así como en los repositorios de origen del rastreador para cada lenguaje:
- [Java][16]
- [JavaScript][17]
- [Python][18]
- [.NET][19]
  - **Nota**: Para la inyección de bibliotecas .NET, si el contenedor de la aplicación utiliza una distribución Linux basada en musl (como Alpine), debes especificar una etiqueta (tag) con el sufijo `-musl` para la anotación del pod. Por ejemplo, para utilizar una versión de biblioteca `v2.29.0`, especifica la etiqueta (tag) del contenedor `v2.29.0-musl`.
- [Ruby][20]

**Nota**: Si ya tienes una aplicación instrumentada utilizando la versión X de la biblioteca y luego utilizas la inyección de bibliotecas para la instrumentación utilizando la versión Y de la misma biblioteca del rastreador, este no se rompe. En su lugar, se utiliza la versión de biblioteca cargada en primer lugar. Dado que la inyección de bibliotecas se produce en el nivel del controlador de admisión antes del tiempo de ejecución, tiene prioridad sobre las bibliotecas configuradas de forma manual.

<div class="alert alert-warning"><strong>Nota</strong>: Se admite el uso de la <code>última</code> etiqueta, pero utilízala con precaución, ya que las principales versiones de bibliotecas pueden introducir cambios de última hora.</div>

Por ejemplo, para inyectar una biblioteca Java:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Habilitar el controlador de admisión para mutar nuevos pods en este despliegue
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # (...)
```

### Paso 3 - Etiquetar tus pods con etiquetas (tag) unificadas de servicios

Con [etiquetas (tags) de servicios unificadas][21], puedes unir la telemetría de Datadog y navegar sin problemas a través de trazas, métricas, y logs con etiquetas coherentes. Define el etiquetado unificado de servicios tanto en el objeto de despliegue como en las especificaciones de la plantilla del pod.
Define etiquetas de servicios unificadas utilizando las siguientes etiquetas:

```yaml
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```

**Nota**: No es necesario configurar las variables de entorno para el etiquetado unificado de servicios (`DD_ENV`, `DD_SERVICE`, `DD_VERSION`) en la especificación de la plantilla de pods, ya que el controlador de admisión propaga los valores de etiqueta como variables de entorno al inyectar la biblioteca.

Por ejemplo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod" # Etiqueta de servicio unificada - Etiqueta del entorno de despliegue
    tags.datadoghq.com/service: "my-service" # Etiqueta de servicio unificada - Etiqueta del servicio de despliegue
    tags.datadoghq.com/version: "1.1" # Etiqueta de servicio unificada - Etiqueta de la versión de despliegue
  # (...)
spec:
  template:
    metadata:
      labels:
        tags.datadoghq.com/env: "prod" # Etiqueta de servicio unificada - Etiqueta del entorno de pod
        tags.datadoghq.com/service: "my-service" # Etiqueta de servicio unificada - Etiqueta del servicio de pod
        tags.datadoghq.com/version: "1.1" # Etiqueta de servicio unificada - Etiqueta de la versión de pod
        admission.datadoghq.com/enabled: "true" # Habilitar el comtrolador de admisión para mutar nuevos pods como parte de este despliegue
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # (...)
```

### Paso 4 - Aplicar la configuración

Tus pods estarán listos para ser instrumentados cuando se les aplique la nueva configuración.

<div class="alert alert-warning">La biblioteca sólo se inyecta en los pods nuevos y no tiene ningún impacto en los pods en ejecución.</div>

## Comprobar que la inyección de bibliotecas ha sido exitosa

La inyección de bibliotecas aprovecha la inyección de un contenedor `init` exclusivo en los pods.
Si la inyección ha sido exitosa, podrás ver un contenedor `init` llamado `datadog-lib-init` en tu pod:

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="Página de detalles de un entorno Kubernetes que muestra el contenedor init en el pod.">}}

O ejecuta `kubectl describe pod <my-pod>` para ver el contenedor init `datadog-lib-init` listado.

La Instrumentación también comienza a enviar telemetría a Datadog (por ejemplo, trazas (traces) a [APM][22]).

### Solucionar problemas de instalación

Si el pod de la aplicación no se inicia, ejecuta `kubectl logs <my-pod> --all-containers` para imprimir los logs y compararlos con los problemas conocidos que se indican a continuación.

#### Problemas de instalación de .NET
##### `dotnet: error while loading shared libraries: libc.musl-x86_64.so.1: cannot open shared object file: No such file or directory`

- **Problema**: La anotación del pod para la versión de biblioteca dotnet incluía un sufijo `-musl`, pero el contenedor de la aplicación se ejecuta en una distribución Linux que utiliza glibc.
- **Solución**: Elimina el sufijo `-musl` de la versión de biblioteca dotnet.

##### `Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /datadog-lib/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so)`

- **Problema**: El contenedor de la aplicación se ejecuta en una distribución Linux que utiliza musl-libc (por ejemplo, Alpine), pero la anotación del pod no incluye el sufijo `-musl`.
- **Solución**: Añade el sufijo `-musl` a la versión de biblioteca dotnet.


#### Problemas de instalación de Python

##### Logs de biblioteca ruidosos

En Python `< 1.20.3` , los logs de inyección Python dan como resultado `stderr`. Actualiza a `1.20.3` o superior para suprimir los logs por defecto. Los logs se pueden habilitar configurando la variable de entorno `DD_TRACE_DEBUG` como `1`.


##### Versión de Python incompatible

El mecanismo de inyección de bibliotecas para Python sólo admite la inyección de bibliotecas Python en Python v3.7 o superior.

##### `user-installed ddtrace found, aborting`

- **Problema**: La biblioteca `ddtrace` ya está instalada en el sistema, por lo que la lógica de inyección aborta la inyección del bibliotecas para evitar introducir un cambio de última hora en la aplicación.
- **Solución**: Elimina la instalación de `ddtrace`, si quieres inyectar bibliotecas. En caso contrario, utiliza la biblioteca instalada ([consulta la documentación][26]), en lugar de la inyección de bibliotecas.


[1]: /es/containers/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[3]: /es/containers/kubernetes/installation/?tab=helm
[4]: http://gcr.io/datadoghq/dd-lib-java-init
[5]: http://hub.docker.com/r/datadog/dd-lib-java-init
[6]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[7]: http://gcr.io/datadoghq/dd-lib-js-init
[8]: http://hub.docker.com/r/datadog/dd-lib-js-init
[9]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[10]: http://gcr.io/datadoghq/dd-lib-python-init
[11]: http://hub.docker.com/r/datadog/dd-lib-python-init
[12]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[13]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[14]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[15]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[16]: https://github.com/DataDog/dd-trace-java/releases
[17]: https://github.com/DataDog/dd-trace-js/releases
[18]: https://github.com/DataDog/dd-trace-py/releases
[19]: https://github.com/DataDog/dd-trace-dotnet/releases
[20]: https://github.com/DataDog/dd-trace-rb/releases
[21]: /es/getting_started/tagging/unified_service_tagging/
[22]: https://app.datadoghq.com/apm/traces
[23]: http://gcr.io/datadoghq/dd-lib-ruby-init
[24]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[25]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[26]: /es/tracing/trace_collection/dd_libraries/python/
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">La inyección de bibliotecas de rastreo en hosts está en fase Beta.</div>

Cuando tanto el Agent como tus servicios se están ejecutando en un host, real o virtual, Datadog inyecta la biblioteca de rastreo utilizando una biblioteca precargada que anula las llamadas a `execve`. Cualquier proceso recién iniciado es interceptado y la biblioteca de instrumentación especificada se inyecta en los servicios.

**Nota**: La inyección en arm64 no es compatible.

## Instalación de la inyección de bibliotecas y del Datadog Agent

**Requisitos: Un host con Linux.

Si el host aún no tiene instalado el Datadog Agent o si quieres actualizar tu instalación del Datadog Agent, utiliza el script de instalación del Datadog Agent para instalar la inyección de bibliotecas y el Datadog Agent:

```shell
DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Por defecto, la ejecución del script instala la compatibilidad para Java, Node.js, Python, Ruby, y .NET. Si quieres especificar qué lenguaje instalar, configura también la variable de entorno`DD_APM_INSTRUMENTATION_LANGUAGES`. Los valores válidos son `java`, `js`, `python`, `ruby` y `dotnet`. Para especificar más de un lenguaje, utiliza una lista separada por comas: 

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Sal y abre un nuevo shell para utilizar la inyección de bibliotecas.

## Siguientes pasos

Si aún no lo has hecho, instala tu aplicación y cualquier lenguaje de compatibilidad o biblioteca que requiera. 

Cuando se inicia una aplicación escrita en un lenguaje compatible, se inyecta automáticamente con el rastreo activado.

## Configuración de la inyección

Configura la inyección en hosts de una de las siguientes maneras:
- Configura variables entorno en el proceso que se está iniciando.
- Especifica la configuración de la inyección en hosts en el archivo `/etc/datadog-agent/inject/host_config.yaml`.

Los valores de las variables de entorno anulan los parámetros del archivo de configuración para cada proceso individual.

### Archivo de configuración

| Nombre de la propiedad | Propósito | Valor por defecto | Valores válidos | 
| --------- | ----------- | ------------- | ----------- | 
|`log_level`  | Nivel de gestión de logs|`off`|`off`, `debug`, `info`, `warn`, `error`|
|`output_paths`|Localización donde se escribe el resultado de los logs |`stderr`|`stderr` o una URL `file://` |
|`env`|Entorno predeterminado asignado a un proceso|ninguno|n/a|
|`config_sources`|Configuración predeterminada para un proceso|`BASIC`|Consultar las [fuentes de configuración](#config-sources)|


#### Ejemplo

```yaml
---
log_level: debug
output_paths:
  - file:///tmp/host_injection.log
env: dev
config_sources: BASIC
```

### Variables de entorno

Las siguientes variables de entorno configuran la inyección de bibliotecas. Puedes pasarlas por `export`, a través de la línea de comandos (`export DD_CONFIG_SOURCES=BASIC`), la configuración de shells o el comando de inicio.

Cada uno de los campos del archivo de configuración corresponde a una variable de entorno. Esta variable de entorno es leída por el entorno del proceso que se está iniciando y sólo afecta al proceso que se está iniciando en ese momento. 

|Propiedad del archivo de configuración|Variable de entorno|
| --------- | ----------- |  
|`log_level`|`DD_APM_INSTRUMENTATION_DEBUG`|
|`output_paths`|`DD_APM_INSTRUMENTATION_OUTPUT_PATHS`|
|`env`|`DD_ENV`|
|`config_sources`|`DD_CONFIG_SOURCES`|

La variable de entorno `DD_APM_INSTRUMENTATION_DEBUG` se limita a los valores `true` y `false` (valor por defecto `false`). Si se configura como `true`, `log_level` se configura como `debug`, y si se configura como `false` (o no se configura en absoluto), se utiliza el `log_level` especificado en el archivo de configuración. La variable de entorno sólo puede definir el nivel del log como `debug`, no cualquier otro valor de nivel del log.

La variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` controla si se habilita o no la inyección. Su valor predeterminado es `TRUE`. Configúrala como `FALSE` para deshabilitar por completo la inyección de bibliotecas.

### Fuentes de configuración

Por defecto, los siguientes parámetros están habilitados en un proceso instrumentado:
- Rastreo
- La inyección de logs, suponiendo que la aplicación utiliza una gestión de logs estructurada (normalmente JSON). Para que aparezcan trazas en logs no estructurados, debes cambiar la configuración de los logs de tu aplicación para incluir parámetros para los ID de rastreo y de tramo (span) ID. Para obtener más información, consulta [Correlacionar logs y trazas][6].
- Métricas de estado
- Métricas de tiempo de ejecución

Puedes cambiar esta configuración para todos los procesos instrumentados, configurando la propiedad `config_sources` en el archivo de configuración, o para un único proceso, configurando la variable de entorno `DD_CONFIG_SOURCES` para el proceso. Los parámetros válidos para las fuentes de configuración son:

| Nombre de la fuente de configuración|Significado|
| --------- | ----------- |  
|`BASIC`|Aplica las configuraciones especificadas anteriormente. Si no se especifica ninguna fuente de configuración, esta es la predeterminada.|
|`LOCAL:PATH`|Aplica la configuración en la ruta especificada del sistema de archivos local. A continuación se describe el formato del archivo de configuración. Ejemplo: `LOCAL:/opt/config/my_process_config.yaml`|
|`BLOB:URL`| Aplica la configuración en la ruta especificada del almacén de objetos compatible con S3. A continuación se describen la URL de conexión y el formato del archivo de configuración. Ejemplo: `BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1` |

Las palabras `BASIC`, `LOCAL` y `BLOB` deben ir en mayúsculas.

Los valores de las fuentes de configuración pueden separarse con puntos y comas para indicar que existen varias localizaciones posibles. Se utiliza la primera configuración que se devuelve sin error. En la configuración no se combinan varias fuentes de configuración. En el siguiente ejemplo se comprueba la configuración de un bucket de S3, a continuación se comprueba el sistema de archivos local y, por último, se utiliza la configuración integrada predeterminada: 

```yaml
DD_CONFIG_SOURCES=BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

#### Compatibilidad del almacenamiento de blobs
Las soluciones de almacenamiento de blobs compatibles son:
- **Amazon S3** - Configura la URL con el prefijo `s3://`. Si te has autenticado con la CLI de AWS, utiliza esas credenciales.
Para obtener información sobre la configuración de credenciales con variables de entorno, consulta [la documentación del SDK de AWS][7].
- **GCP GCS** - Define la URL con el prefijo `gs://`. Utiliza las credenciales por defecto de la aplicación. Autentícate con `gcloud auth application-default login`. Para obtener más información sobre la configuración de credenciales con variables entorno, consulta [la documentación de autenticación de Google Cloud][8].
- **Azure Blob** - Define la URL con el prefijo `azblob://` y dirígela a un nombre de contenedor de almacenamiento. Utiliza las credenciales que se encuentran en `AZURE_STORAGE_ACCOUNT` (es decir, el nombre del bucket), junto al menos a una`AZURE_STORAGE_KEY` y un `AZURE_STORAGE_SAS_TOKEN`. Para obtener más información sobre la configuración de `BLOB` o `LOCAL`, consulta [Suministro de fuentes de configuración ](#supplying-configuration-source-host).

<a id="supplying-Configuración-source-host"></a>

### Suministro de la fuente de configuración 

El archivo de configuración de `LOCAL` y `BLOB` puede adoptar el formato JSON:

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}
```

O el formato YAML:

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

El valor de `version` es siempre `1`. Esto hace referencia a la versión del esquema de configuración en uso, no a la versión del contenido.

La siguiente tabla muestra cómo los valores de configuración de la inyección se asignan a las correspondientes [opciones de configuración de bibliotecas de rastreo][4]:

| Inyección | Rastreador Java | Rastreador NodeJS | Rastreador .NET | Rastreador Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  | n/a |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`    | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | n/a |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    | n/a |

La opciones de configuración de bibliotecas de rastreo que no se mencionan en la configuración de la inyección siguen estando disponibles para su uso a través de propiedades o variables de entorno, de la forma habitual.

### Parámetros de configuración básica

Los parámetros de configuración `BASIC` son equivalentes a los siguientes parámetros YAML:

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Para iniciar tus servicios

Inicia tus servicios indicando la configuración de biblioteca precargada en el comando de inicio. Si no se especifica `DD_CONFIG_SOURCES`, se utiliza el valor especificado para `config_sources` en el archivo de configuración `/etc/datadog-agent/inject/host_config.yaml`. Si este tampoco se especifica, `DD_CONFIG_SOURCES` es`BASIC` por defecto:

**Ejemplo de aplicación Java**:
```sh
java -jar <SERVICE_1>.jar &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC java -jar <SERVICE_2>.jar &
```

**Ejemplo de aplicación Node**:
```sh
node index.js &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC node index.js &
```

**Ejemplo de aplicación .NET**:
```sh
dotnet <SERVICE_1>.dll &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC dotnet <SERVICE_2>.dll &
```
**Ejemplo de aplicación Python**:
```sh
python <SERVICE_1>.py &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC python <SERVICE_2>.py &
```

Ejercita tu aplicación para empezar a generar datos de telemetría, que puedes ver como [trazas en APM][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /es/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}

{{% tab "Agent on host, app in containers" (Agent en host, aplicación en contenedor)%}}

<div class="alert alert-info">La inyección de bibliotecas de rastreo en hosts está en fase Beta.</div>


Cuando tu Agent se ejecuta en un host y tus servicios se ejecutan en contenedores, Datadog inyecta la biblioteca de rastreo interceptando la creación del contenedor y configurando el contenedor Docker.

Se intercepta cualquier proceso recién iniciado y la biblioteca de instrumentación especificada se inyecta en el servicio.

**Nota**: La inyección en arm64 no es compatible.

## Instalación de la inyección de bibliotecas y del Datadog Agent

**Requisitos**:
- Un host que ejecute Linux.
- [Docker Engine][2].

Si el host aún no tiene instalado el Datadog Agent o si quieres actualizar tu instalación del Datadog Agent, utiliza el script de instalación del Datadog Agent para instalar la inyección de bibliotecas y el Datadog Agent:

```shell
DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Por defecto, la ejecución del script instala la compatibilidad para Java, Node.js, Python, Ruby, y .NET. Si quieres especificar qué lenguaje instalar, configura también la variable de entorno`DD_APM_INSTRUMENTATION_LANGUAGES`. Los valores válidos son `java`, `js`, `python`, `ruby` y `dotnet`. Para especificar más de un lenguaje, utiliza una lista separada por comas: 

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

## Configurar la inyección Docker {#configure-docker-injection-2}

Si la configuración por defecto no satisface tus necesidades, puedes editar `/etc/datadog-agent/inject/docker_config.yaml` y añadir la siguiente configuración YAML a la inyección:

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Habilita o deshabilita la inyección de bibliotecas y especifica una lista ordenada, separada por punto y coma, de los lugares donde se almacena la configuración. Se utiliza el primer valor que se devuelve sin error. La configuración no se combina a lo largo de las fuentes de configuración. Los valores válidos son:
  - `BLOB:<URL>` - Carga la configuración desde un almacén de blobs (compatible con S3) situado en `<URL>`.
  - `LOCAL:<PATH>` - Carga la configuración desde un archivo del sistema de archivos local en `<PATH>`.
  - `BASIC` - Utiliza valores por defecto. Si no se especifica `config_sources`, se utiliza esta configuración.<br/>

Las palabras `BASIC`, `LOCAL`, y `BLOB` deben ir en mayúsculas.

Los valores de las fuentes de configuración pueden separarse con puntos y comas para indicar que existen varias localizaciones posibles. Se utiliza la primera configuración que se devuelve sin error. En la configuración no se combinan varias fuentes de configuración. En el siguiente ejemplo se comprueba la configuración de un bucket de S3, a continuación se comprueba el sistema de archivos local y, por último, se utiliza la configuración integrada predeterminada: 

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

Para obtener más información sobre la configuración de `BLOB` o `LOCAL`, consulta [Suministro de fuentes de configuración](#supplying-configuration-source-hc).

`log_level`
: Configura como `debug`, para registrar información detallada de lo que está sucediendo, o como `info`, `warn` o `error`, para registrar mucho menos información.<br>
**Por defecto**: `info`

`output_paths`
: Lista de uno o más lugares donde escribir logs.<br>
**Por defecto**: `stderr`

Opcional: `env`
: Especifica la etiqueta `DD_ENV` para los contenedores que se ejecutan en Docker, por ejemplo, `dev`, `prod`, `staging`. <br>
**Por defecto**: Nada.

<a id="supplying-configuration-source-hc"></a>

### Suministro de la fuente de configuración 

Si especificas la fuente configuración `BLOB` o `LOCAL`, crea un archivo JSON o YAML allí y proporciona la configuración como JSON:

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

O como YAML:
```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```


La siguiente tabla muestra cómo los valores de configuración de la inyección se asignan a las correspondientes [opciones de configuración de bibliotecas de rastreo][4]:

| Inyección | Rastreador Java | Rastreador NodeJS | Rastreador .NET | Rastreador Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  | n/a |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | n/a |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    | n/a |

La opciones de configuración de bibliotecas de rastreo que no se mencionan en la configuración de la inyección siguen estando disponibles para su uso a través de propiedades o variables de entorno, de la forma habitual.

#### Compatibilidad del almacenamiento de blobs
Las soluciones de almacenamiento de blobs compatibles son:
- **Amazon S3** - Configura la URL con el prefijo `s3://`. Si te has autenticado con la CLI de AWS, utiliza esas credenciales.
Para obtener información sobre la configuración de credenciales con variables de entorno, consulta [la documentación del SDK de AWS][7].
- **GCP GCS** - Define la URL con el prefijo `gs://`. Utiliza las credenciales por defecto de la aplicación. Autentícate con `gcloud auth application-default login`. Para obtener más información sobre la configuración de credenciales con variables entorno, consulta [la documentación de autenticación de Google Cloud][8].
- **Azure Blob** - Define la URL con el prefijo `azblob://` y dirígela a un nombre de contenedor de almacenamiento. Utiliza las credenciales que se encuentran en `AZURE_STORAGE_ACCOUNT` (es decir, el nombre del bucket), junto al menos a una`AZURE_STORAGE_KEY` y un `AZURE_STORAGE_SAS_TOKEN`. Para obtener más información sobre la configuración de `BLOB` o `LOCAL`, consulta [Suministro de fuentes de configuración ](#supplying-configuration-source-hc).

### Parámetros de configuración básica

Los parámetros de configuración `BASIC` son equivalentes a los siguientes parámetros YAML:

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Especificación de etiquetas de servicio unificadas en contenedores

Si las variables de entorno `DD_ENV` , `DD_SERVICE` o `DD_VERSION` se especifican en una imagen de contenedor de servicios, esos valores se utilizan para etiquetar la telemetría del contenedor.

Si no se especifican, `DD_ENV` utiliza el valor `env` definido en el archivo de configuración `/etc/datadog-agent/inject/docker_config.yaml`, si existe. `DD_SERVICE` se deriva del nombre de la imagen Docker. Una imagen con el nombre `my-service:1.0` se etiqueta con `DD_SERVICE` de `my-service`.

## Para iniciar tus servicios

Inicia tu Agent y tus servicios contenedorizados, como de costumbre.

Ejercita tu aplicación para empezar a generar datos de telemetría, que puedes ver como [trazas en APM][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /es/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts

{{% /tab %}}

{{% tab "Agent and app in separate containers" (El Agent y la aplicación en diferentes contenedores%}}

<div class="alert alert-info">La inyección de bibliotecas de rastreo en contenedores está en fase Beta.</div>

Cuando tu Agent y tus servicios se ejecutan en diferentes contenedores Docker, en el mismo host, Datadog inyecta la biblioteca de rastreo interceptando la creación del contenedor y configurando el contenedor Docker.

Se intercepta cualquier proceso recién iniciado y la biblioteca de instrumentación especificada se inyecta en el servicio.

**Requisitos**:
- [Docker Engine][1].

**Nota**: La inyección en arm64 no es compatible.

## Instalación de la biblioteca precargada

Utiliza el script de shell `install_script_docker_injection` para instalar automáticamente la compatibilidad de la inyección Docker. Para esto, Docker ya debe estar instalado en la máquina host.

```shell
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

Se instalan las bibliotecas de todos los lenguajes compatibles. Para instalar lenguajes específicos, define la variable `DD_APM_INSTRUMENTATION_LANGUAGES`. Los valores válidos son `java`, `js`, `python`, `ruby` y `dotnet`:

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

## Configuración de la inyección Docker

Edita `/etc/datadog-agent/inject/docker_config.yaml` y añade la siguiente configuración YAML para la inyección:

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Habilita o deshabilita la inyección de bibliotecas y especifica una lista ordenada, separada por punto y coma, de los lugares donde se almacena la configuración. Se utiliza el primer valor que se devuelve sin error. La configuración no se combina a lo largo de las fuentes de configuración. Los valores válidos son:
  - `BLOB:<URL>` - Carga la configuración desde un almacén de blobs (compatible con S3) situado en `<URL>`.
  - `LOCAL:<PATH>` - Carga la configuración desde un archivo del sistema de archivos local en `<PATH>`.
  - `BASIC` - Utiliza valores por defecto. Si no se especifica `config_sources`, se utiliza esta configuración.<br/>

Las palabras `BASIC`, `LOCAL` y `BLOB` deben ir en mayúsculas.

Los valores de las fuentes de configuración pueden separarse con puntos y comas para indicar que existen varias localizaciones posibles. Se utiliza la primera configuración que se devuelve sin error. En la configuración no se combinan varias fuentes de configuración. En el siguiente ejemplo se comprueba la configuración de un bucket de S3, a continuación se comprueba el sistema de archivos local y, por último, se utiliza la configuración integrada predeterminada: 

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```


Para obtener más información sobre la configuración de `BLOB` o `LOCAL`, consulta [Suministro de fuentes de configuración](#supplying-configuration-source-c).

`log_level`
: Configura como `debug`, para registrar información detallada de lo que está sucediendo, o como `info`, para registrar mucho menos información.

`output_paths`
: Lista de uno o más lugares donde escribir logs.<br>
**Por defecto**: `stderr`

Opcional: `env`
: Especifica la etiqueta `DD_ENV` para los contenedores que se ejecutan en Docker, por ejemplo, `dev`, `prod`, `staging`. <br>
**Por defecto**: Nada.

<a id="supplying-configuration-source-c"></a>

### Suministro de la fuente de configuración 

Si especificas la fuente configuración `BLOB` o `LOCAL`, crea un archivo JSON o YAML allí y proporciona la configuración como JSON:

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

O como YAML:
```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

En este archivo de configuración, el valor de `version` es siempre `1`. Esto hace referencia a la versión del esquema de configuración en uso, no a la versión del contenido.

La siguiente tabla muestra cómo los valores de configuración de la inyección se asignan a las correspondientes [opciones de configuración de bibliotecas de rastreo][4]:

| Inyección | Rastreador Java | Rastreador NodeJS | Rastreador .NET | Rastreador Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  | n/a |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | n/a |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    | n/a |

La opciones de configuración de bibliotecas de rastreo que no se mencionan en la configuración de la inyección siguen estando disponibles para su uso a través de propiedades o variables de entorno, de la forma habitual.

#### Compatibilidad del almacenamiento de blobs
Las soluciones de almacenamiento de blobs compatibles son:
- **Amazon S3** - Configura la URL con el prefijo `s3://`. Si te has autenticado con la CLI de AWS, utiliza esas credenciales.
Para obtener información sobre la configuración de credenciales con variables de entorno, consulta [la documentación del SDK de AWS][7].
- **GCP GCS** - Define la URL con el prefijo `gs://`. Utiliza las credenciales por defecto de la aplicación. Autentícate con `gcloud auth application-default login`. Para obtener más información sobre la configuración de credenciales con variables entorno, consulta [la documentación de autenticación de Google Cloud][8].
- **Azure Blob** - Define la URL con el prefijo `azblob://` y dirígela a un nombre de contenedor de almacenamiento. Utiliza las credenciales que se encuentran en `AZURE_STORAGE_ACCOUNT` (es decir, el nombre del bucket), junto al menos a una`AZURE_STORAGE_KEY` y un `AZURE_STORAGE_SAS_TOKEN`. Para obtener más información sobre la configuración de `BLOB` o `LOCAL`, consulta [Suministro de fuentesde configuración ](#supplying-configuration-source-c).

### Parámetros de configuración básica

Los parámetros de configuración `BASIC` son equivalentes a los siguientes parámetros YAML:

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Configuración del Agent

En el archivo de composición Docker que inicia tus contenedores, utiliza los siguientes parámetros pare el Agent, configurando de forma segura tu propia clave de API Datadog para `${DD_API_KEY}`:

```yaml
  dd-agent:
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket
      - DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket
    volumes:
      - /opt/datadog/apm:/opt/datadog/apm
      - /var/run/docker.sock:/var/run/docker.sock:ro
```

## Especificación de etiquetas de servicio unificadas en contenedores

Si las variables de entorno `DD_ENV` , `DD_SERVICE` o `DD_VERSION` se especifican en una imagen de contenedor de servicios, esos valores se utilizan para etiquetar la telemetría del contenedor.

Si no se especifican, `DD_ENV` utiliza el valor `env` definido en el archivo de configuración `/etc/datadog-agent/inject/docker_config.yaml`, si existe. `DD_SERVICE` se deriva del nombre de la imagen Docker. Una imagen con el nombre `my-service:1.0` se etiqueta con `DD_SERVICE` de `my-service`.

## Para iniciar el Agent en Docker

El contenedor `dd-agent` debe iniciarse antes que cualquier contenedor de servicios. Ejecuta:

```sh
docker-compose up -d dd-agent
```

## Para iniciar tus servicios

Inicia tus servicios contenedorizados, como de costumbre.

Ejercita tu aplicación para empezar a generar datos de telemetría, que puedes ver como [trazas en APM][5].



[1]: https://docs.docker.com/engine/install/ubuntu/
[2]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[3]: /es/tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}


{{< /tabs >}}

## Para deshabilitar la inyección de bibliotecas

### Eliminación de la instrumentación en servicios específicos

Para dejar de generar trazas para un servicio específico, ejecuta los siguientes comandos y reinicia el servicio:

{{< tabs >}}
{{% tab "Host" %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio del servicio: 

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

{{% /tab %}}

{{% tab "Agent and app in separate containers" (El Agent y la aplicación en diferentes contenedores%}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio del servicio: 
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. Reinicia el servicio.
{{% /tab %}}

{{< /tabs >}}

### Eliminar APM para todos los servicios de la infraestructura

Para dejar de producir trazas (traces), elimina los inyectores de bibliotecas y reinicia la infraestructura:


{{< tabs >}}
{{% tab "Host" %}}

1. Ejecuta:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicia tu host.

{{% /tab %}}

{{% tab "Agent and app in separate containers" (El Agent y la aplicación en diferentes contenedores%}}

1. Desinstala la inyección de bibliotecas local:
   ```shell
   dd-container-install --uninstall
   ```
2. Reinicia Docker:
   ```shell
   systemctl restart docker
   ```
   O utiliza el equivalente para tu entorno.

{{% /tab %}}

{{< /tabs >}}

## Configuración de la biblioteca

Las características compatibles y las opciones de configuración de la biblioteca de rastreo son las mismas para la inyección de bibliotecas y para otros métodos de instalación, y pueden establecerse con variables de entorno. Para obtener más detalles, consulta la [página de configuración de bibliotecas Datadog][2] de tu lenguaje.

Por ejemplo, puede habilitar [Application Security Monitoring][3] o [Continuous Profiler][4], cada uno de los cuales puede tener un impacto en tu facturación:

- Para **Kubernetes**, configura las variables de entorno `DD_APPSEC_ENABLED` o `DD_PROFILING_ENABLED` como `true` en el archivo de despliegue del pod de aplicación subyacente.

- Para **hosts y contenedores**, configura las variables de entorno de contenedor `DD_APPSEC_ENABLED` o `DD_PROFILING_ENABLED` como `true`, o en la [configuración de inyección](#supplying-configuration-source), especifica una sección `additional_environment_variables` como en el siguiente ejemplo de YAML:

  ```yaml
  additional_environment_variables:
  - key: DD_PROFILING_ENABLED
    value: true
  - key: DD_APPSEC_ENABLED
    value: true
  ```

  Sólo las claves de configuración que empiezan por `DD_` pueden definirse en la sección `additional_environment_variables` de la fuente de configuración de la inyección.


[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_collection/library_config/
[3]: /es/security/application_security/enabling/tracing_libraries/threat_detection/java
[4]: /es/profiler/enabling/java/?tab=environmentvariables#installation
[5]: /es/tracing/trace_collection/automatic_instrumentation/
[6]: /es/tracing/trace_collection/single-step-apm
[7]: /es/tracing/trace_collection/dd_libraries/