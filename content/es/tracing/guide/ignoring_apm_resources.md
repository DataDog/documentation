---
description: Aprende a excluir recursos no deseados como las verificaciones de salud
  de las trazas utilizando reglas de muestreo y filtrado para reducir el ruido y gestionar
  costos.
title: Ignorando Recursos No Deseados en APM
---
Los servicios a menudo manejan puntos de conexión cuyo tráfico puede que no desees trazar (por ejemplo, las verificaciones de salud). Esta guía explica los siguientes enfoques para excluir ese tráfico:

- **Muestreo**: Utiliza cuando deseas que las solicitudes permanezcan visibles en las métricas de traza, pero reducir el volumen de ingesta de traza.
- **Filtrado en el Agente de Datadog**: Utiliza para excluir solicitudes por completo (incluyendo de las métricas de traza) en todos los servicios que reportan al Agente.
- **Configuración del rastreador**: Utiliza cuando la lógica de filtrado debe aplicarse por servicio o depende del contexto específico de la aplicación (por ejemplo, atributos de solicitud o estado de ejecución).

Si necesitas asistencia para decidir cuál opción es la más relevante para tu caso de uso, contacta a [soporte de Datadog][1]. 

## Muestreo {#sampling}

Si deseas que el tramo esté incluido en las métricas de traza pero no quieres que sea ingerido, utiliza reglas de muestreo. Para más información sobre muestreo, consulta [Controles de Ingesta][4].

### Usando reglas de muestreo {#using-sampling-rules}

El enfoque recomendado es utilizar reglas de muestreo, que te permiten muestrear trazas basadas en nombres de recursos, nombres de servicios, etiquetas y nombres de operaciones:

```shell
DD_TRACE_SAMPLING_RULES='[{"resource": "GET healthcheck", "sample_rate": 0.0}]'
```

O muestrear basado en etiquetas de URL HTTP:

```shell
DD_TRACE_SAMPLING_RULES='[{"tags": {"http.url": "http://.*/healthcheck$"}, "sample_rate": 0.0}]'
```

<div class="alert alert-info">Las decisiones de muestreo se determinan utilizando el primer tramo en una traza. Si el tramo que contiene la etiqueta que deseas filtrar no es un {{< tooltip glossary="trace_root_span" case="sentence" >}}, esta regla no se aplica.</div>

## Filtrado en el Agente de Datadog {#filtering-in-the-datadog-agent}

Si no deseas que el tramo se ingeste o se refleje en las métricas de traza, utiliza el filtrado en el Agente de Datadog.

El componente Trace Agent dentro del Agente de Datadog tiene dos métodos para evitar que ciertas trazas sean enviadas: filtrado por etiquetas de tramo o filtrado por recursos. Si las trazas son descartadas debido a estas configuraciones, las métricas de traza excluyen estas solicitudes.

Configurar el Trace Agent para ignorar ciertas trazas o recursos se aplica a todos los servicios que envían trazas a este Agente de Datadog. Si tienes requisitos específicos de la aplicación, utiliza [la configuración del rastreador](#tracer-configuration) en su lugar.

<div class="alert alert-info">
Si ninguna de las opciones en esta guía cumple con tus requisitos, considera agregar una <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">etiqueta de tramo personalizada</a> en tu aplicación y usarla para descartar trazas en el Agente.
</div>

### Ignorando trazas basadas en etiquetas de tramo {#ignoring-traces-based-on-span-tags}

A partir de Datadog Agent 6.27.0/7.27.0, la opción **filter tags** descarta trazas con tramos raíz que coinciden con las etiquetas de tramo especificadas. Esta opción se aplica a todos los servicios que envían trazas a este Datadog Agent. Las trazas que son descartadas debido a las etiquetas de filtro no se incluyen en las métricas de traza.

<div class="alert alert-info">
Los tramos individuales dentro de una traza no pueden ser descartados selectivamente; si el tramo raíz coincide con los criterios de filtro, la traza completa es descartada.
</div>

**Comportamiento de coincidencia:**

La opción de filtrar etiquetas requiere una coincidencia exacta de cadena. Para filtrado basado en regex, consulte [Ignorando basado en recursos](#ignoring-traces-based-on-resources).

Cuando especificas múltiples etiquetas, el filtro utiliza **lógica OR**: las trazas son descartadas si el tramo raíz coincide con **cualquiera** de las etiquetas. Para coincidir múltiples condiciones simultáneamente, agrega una etiqueta personalizada que represente esos criterios combinados.

**Configuración:**

Puedes especificar etiquetas de tramo para requerir o rechazar utilizando una lista de claves y valores separados por espacios en las variables de entorno:

`DD_APM_FILTER_TAGS_REQUIRE`
: Recoge solo trazas que tienen tramos raíz con una coincidencia exacta para las etiquetas y valores de tramo especificados. Si no coincide con esta regla, la traza se descarta. Por ejemplo, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`. En Datadog Agent 7.49+, se pueden proporcionar expresiones regulares con `DD_APM_FILTER_TAGS_REGEX_REQUIRE`.

`DD_APM_FILTER_TAGS_REJECT`
: Rechaza trazas que tienen tramos raíz con una coincidencia exacta para las etiquetas y valores de tramo especificados. Si coincide con esta regla, la traza se descarta. Por ejemplo, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`. En Datadog Agent 7.49+, se pueden proporcionar expresiones regulares con `DD_APM_FILTER_TAGS_REGEX_REJECT`.

{{< tabs >}}

{{% tab "Kubernetes" %}}

#### Datadog Operator {#datadog-operator}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: DD_APM_FILTER_TAGS_REJECT
              value: tag_key1:tag_val2 tag_key2:tag_val2
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

#### Helm {#helm}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_FILTER_TAGS_REJECT
          value: tag_key1:tag_val2 tag_key2:tag_val2

{{< /code-block >}}

{{% k8s-helm-redeploy %}}

[1]: /es/agent/kubernetes/?tab=helm#installation

{{% /tab %}}

{{% tab "datadog.yaml" %}}

También puedes establecer estos valores en el archivo de configuración del Agent utilizando una lista separada por comas:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

Por ejemplo, para ignorar las verificaciones de salud donde la `http.url` coincide con este punto de conexión:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}


#### Etiquetas de tramo disponibles {#available-span-tags}

En el backend, Datadog crea las siguientes etiquetas de tramo en los tramos después de la ingestión. 

**Nota**: Estas etiquetas no se pueden usar para descartar trazas a nivel del Datadog Agent. El agente solo filtra en función de las etiquetas disponibles antes de la ingestión.

| Nombre                                    | Descripción                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | La ruta completa de URL desde la etiqueta `http.url`.        |
| `http.url_details.host`                 | La porción del nombre del servidor de la etiqueta `http.url`      |
| `http.url_details.path`                 | El objetivo completo de la solicitud tal como se pasa en una línea de solicitud HTTP o equivalente. |
| `http.url_details.scheme`               | El esquema de la solicitud de la etiqueta `http.url`.       |
| `http.url_details.queryString`          | La porción de la cadena de consulta de la etiqueta `http.url`. |
| `http.url_details.port`                 | El puerto HTTP de la etiqueta `http.url`.            |
| `http.useragent_details.os.family`      | La familia del sistema operativo reportada por el User-Agent.         |
| `http.useragent_details.browser.family` | La familia del navegador reportada por el User-Agent.    |
| `http.useragent_details.device.family`  | La familia del dispositivo reportada por el User-Agent.     |

<div class="alert alert-danger">A partir del 1 de octubre de 2022, el backend de Datadog aplica un remapeo para aplicar <a href="/tracing/trace_collection/tracing_naming_convention">la semántica de las etiquetas de tramo
</a> a través de los rastreadores en todos los tramos ingeridos. Si deseas descartar trazas basadas en etiquetas de tramo raíz a nivel del Agente de Datadog, utiliza etiquetas en la columna <strong>Remap from</strong>.</div>

##### Comunicaciones de red {#network-communications}

| **Nombre**                   | **Remap from**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - Todos los lenguajes  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - Todos los lenguajes  |

##### Solicitudes HTTP {#http-requests}

| **Nombre**                       | **Remap from**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

##### Base de datos {#database}

| **Nombre**                         | **Remap from**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java, Python, Node.js, Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - Todos los lenguajes                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python, .NET, Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python, PHP, Node.js, Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python, PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python, Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python, Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python, Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python, Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python, .NET, Ruby, PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

##### Cola de Mensajes {#message-queue}

| **Nombre**                               | **Remapear desde**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET, Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET, Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Node.js                                                  |
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js, Go, Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


##### Llamadas a procedimientos remotos {#remote-procedure-calls}

| **Nombre**                       | **Remapear desde**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python, .NET, Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python, Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

##### Errores {#errors}

| **Nombre**                       | **Remapear desde**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - Todos los lenguajes                      |

### Ignorando trazas basadas en recursos {#ignoring-traces-based-on-resources}

La opción **ignorar recursos** permite excluir recursos si el tramo raíz global de la traza coincide con ciertos criterios. Consulte [Excluir recursos de ser recolectados][5]. Esta opción se aplica a todos los servicios que envían trazas a este Agente de Datadog en particular. Las trazas que se descartan debido a recursos ignorados no se incluyen en las métricas de traza.

Puede especificar recursos a ignorar ya sea en el archivo de configuración del Agente, `datadog.yaml`, o con la variable de entorno `DD_APM_IGNORE_RESOURCES`. Consulte los ejemplos a continuación.

Usando `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

Usando `DD_APM_IGNORE_RESOURCES`:

```shell
DD_APM_IGNORE_RESOURCES="(GET|POST) /healthcheck,API::NotesController#index"
```

**Notas**:
- Al usar el formato de variable de entorno (`DD_APM_IGNORE_RESOURCES`), los valores deben proporcionarse como una lista de cadenas separadas por comas.
- La sintaxis regex que acepta el Agente de Trazas es evaluada por [regexp][6] de Go.
- Dependiendo de su estrategia de implementación, es posible que deba ajustar la regex escapando caracteres especiales.
- Si utiliza contenedores dedicados con Kubernetes, asegúrese de que la variable de entorno para la opción de recurso ignorado se esté aplicando al contenedor **trace-agent**.

#### Ejemplo {#example}

Considere una traza que contiene llamadas a `/api/healthcheck` de las que no desea trazas:

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Gráfico de llamas de un recurso que desea que el SDK ignore" style="width:90%;">}}

Tome nota del nombre del recurso del span raíz global.

- Nombre de la operación: `rack.request`
- Nombre del recurso: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

Para usar correctamente la opción de recurso ignorado, la regla regex escrita debe coincidir con el nombre del recurso, `Api::HealthchecksController#index`. Existen algunas opciones de regex, pero para filtrar rastros de este recurso tal como está, un regex potencial a utilizar es `Api::HealthchecksController#index$`.

Dependiendo de cómo lo implementes, la sintaxis se ve un poco diferente:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

Para múltiples valores:

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

En la lista de variables de entorno del contenedor del Agente de Datadog, agrega `DD_APM_IGNORE_RESOURCES` con un patrón como el ejemplo a continuación. Docker Compose tiene su propia [sustitución de variables][1] a considerar cuando usas caracteres especiales como `$`.

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

Para múltiples valores:

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

En tu comando de docker run para iniciar el Agente de Datadog, agrega `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="shell" >}}
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
              -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
{{< /code-block >}}

Para múltiples valores:

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

En el contenedor dedicado del trace-agent, agrega la variable de entorno `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "registry.datadoghq.com/agent:latest"
        imagePullPolicy: IfNotPresent
        command: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        resources: {}
        ports:
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: "datadog-secret"
              key: api-key
        - name: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: KUBERNETES
          value: "yes"
        - name: DOCKER_HOST
          value: unix:///host/var/run/docker.sock
        - name: DD_LOG_LEVEL
          value: "INFO"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
        - name: DD_APM_RECEIVER_PORT
          value: "8126"
        - name: DD_KUBELET_TLS_VERIFY
          value: "false"
        - name: DD_APM_IGNORE_RESOURCES
          value: "Api::HealthchecksController#index$"
{{< /code-block >}}

Para múltiples valores:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

En la sección `traceAgent` del archivo `values.yaml`, agrega `DD_APM_IGNORE_RESOURCES` en la sección `env`, luego [inicia helm como de costumbre][1].

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

Para múltiples valores:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

Alternativamente, puedes establecer `agents.containers.traceAgent.env` en el comando `helm install`:

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /es/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Definición de Tarea de Amazon ECS" %}}

Si usas Amazon ECS (como en EC2), en la definición de tu contenedor del Agente de Datadog, agrega la variable de entorno `DD_APM_IGNORE_RESOURCES` con los valores de tal manera que el JSON evalúe a algo como esto:

{{< code-block lang="json" >}}
    "environment": [
	// other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">Filtrar trazas de esta manera elimina estas solicitudes de <a href="/tracing/guide/metrics_namespace/">métricas de traza</a>. Para información sobre cómo reducir la ingestión sin afectar las métricas de traza, consulta <a href="/tracing/trace_ingestion/ingestion_controls">controles de ingestión</a>.</div>

## Configuración del trazador {#tracer-configuration}

Algunos trazadores para algunos lenguajes pueden descartar trazas antes de que sean enviadas al Agente de Datadog. Usa esta opción si tienes requisitos específicos de la aplicación.

<div class="alert alert-warning">
1. Si la solicitud está asociada con una traza distribuida, la traza resultante puede tener imprecisión de muestreo si se eliminan partes de ella debido a estas reglas de filtrado.<br> 
2. Filtrar las trazas de esta manera elimina estas solicitudes de <a href="/tracing/guide/metrics_namespace/">métricas de traza</a>. Para obtener información sobre cómo reducir la ingesta sin afectar las métricas de traza, consulte <a href="/tracing/trace_ingestion/ingestion_controls">controles de ingesta</a>.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

El rastreador de Ruby tiene una canalización de post-procesamiento que elimina las trazas que cumplen con ciertos criterios. Más información y ejemplos se pueden encontrar en [Post-procesamiento de trazas][1].

Por ejemplo, si el nombre del recurso es `Api::HealthchecksController#index`, use la clase `Datadog::Tracing::Pipeline::SpanFilter` para eliminar las trazas que contienen el nombre del recurso. Este filtro también se puede usar para filtrar otros metadatos disponibles para el [objeto de tramo][2].

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /es/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /es/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

El rastreador de Python proporciona una opción para filtrar trazas no deseadas:

### Usando filtros personalizados {#using-custom-filters}

Para casos de uso avanzados, puede crear filtros personalizados:

```py
from ddtrace.trace import tracer
from ddtrace.trace import TraceFilter
import re

class CustomFilter(TraceFilter):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def process_trace(self, trace):
        for span in trace:
            if span.get_tag('http.url') and self.pattern.match(span.get_tag('http.url')):
                return None  # Drop the trace
        return trace  # Keep the trace

# Configure the SDK with your custom filter
tracer.configure(trace_processors=[CustomFilter(r'http://.*/healthcheck$')])
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

Configure una lista de bloqueo en el plugin [Http][1]. Tenga en cuenta en qué coincide la lista de bloqueo según la documentación de la API. Por ejemplo, las solicitudes Http entrantes coinciden con las rutas de URL, así que si la etiqueta de tramo de la traza es `http.url` y es `http://<domain>/healthcheck`, escriba una regla que coincida con la `healthcheck` URL:


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // incoming http requests match on the path
  server: {
    blocklist: ['/healthcheck']
  },
  // outgoing http requests match on a full URL
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info">La configuración del SDK para la integración debe venir <em>antes</em> de que se importe ese módulo instrumentado.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

El rastreador de Java tiene una opción para un `TraceInterceptor` personalizado para filtrar ciertos tramos. Consulte [Extensión de trazadores][1].

Por ejemplo, si su nombre de recurso es `GET /healthcheck`, escriba un interceptor de traza que elimine las trazas que contengan este nombre de recurso. Ajuste la lógica para satisfacer su caso de uso.

```
public class GreetingController {
   static {
       // In a class static block to avoid initializing multiple times.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               for (MutableSpan span : trace) {
                   if ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       return Collections.emptyList();
                   }
               }
               return trace;
           }
           @Override
           public int priority() {
               return 200;  // Some unique number
           }
       });
   }
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


[1]: /es/help/
[2]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /es/tracing/guide/metrics_namespace/
[4]: /es/tracing/trace_ingestion/ingestion_controls
[5]: /es/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/