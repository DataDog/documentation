---
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conectar logs de aplicaciones .NET con trazas
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentación
  text: Métricas de tiempo de ejecución
- link: /tracing/trace_collection/trace_context_propagation/dotnet/
  tag: Documentación
  text: Propagación del contexto de rastreo
- link: /serverless/azure_app_services/
  tag: Documentación
  text: Extensión del servicio de aplicaciones Microsoft Azure
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: Monitorización .NET con Datadog APM y rastreo distribuido
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitorización de aplicaciones contenedorizadas ASP.NET Core
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Monitorización de aplicaciones contenedorizadas de ASP.NET Core en AWS Fargate
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la librería de rastreo de .NET Framework
type: lenguaje de código múltiple
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [etiquetado de servicios unificado][4].

{{< img src="tracing/dotnet/dotnet_framework_configuration.png" alt="Establecer precedencia de la configuración del rastreador .NET Framework" style="width:100%" >}}

Puedes establecer parámetros de configuración en .NET Tracer utilizando cualquiera de los siguientes métodos:

{{< tabs >}}

{{% tab "Variables de entorno" %}}

Para configurar el rastreador utilizando variables de entorno, configura las variables antes de iniciar la aplicación instrumentada. Para saber cómo configurar las variables de entorno en diferentes entornos, consulta [Configuración de las variables de entorno de procesos][1].

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-framework/#configuring-process-environment-variables

{{% /tab %}}

{{% tab "Código" %}}

Para configurar el rastreador en el código de la aplicación, crea una instancia `TracerSettings` a partir de las fuentes de configuración predeterminadas. Define las propiedades de esta instancia `TracerSettings` antes de llamar a `Tracer.Configure()`. Por ejemplo:

<div class="alert alert-danger">
 <strong>Nota:</strong> Los parámetros deben configurarse en <code>TracerSettings</code> (Parámetros del rastreador) <em>antes</em> de crear el <code>rastreador</code>. Los cambios realizados en las propiedades de <code>TracerSettings</code> después de crear el <code>rastreador</code> se ignoran.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// lee las fuentes de configuración predeterminadas (variables de entorno, web.config, datadog.json)
parámetros de variables = TracerSettings.FromDefaultSources();

// cambia algunos parámetros
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.Exporter.AgentUri = new Uri("http://localhost:8126/");

// configura los parámetros globales del rastreador
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "web.config" %}}

Para configurar el rastreador utilizando un archivo `app.config` o `web.config`, utiliza la sección `<appSettings>`. Por ejemplo:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "Archivo JSON" %}}

Para configurar el rastreador utilizando un archivo JSON, crea `datadog.json` en el directorio de la aplicación instrumentada. El objeto JSON raíz debe ser un objeto con un par clave-valor para cada parámetro. Por ejemplo:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### Parámetros de configuración

Utilizando los métodos descritos anteriormente, personaliza tu configuración de rastreo con las siguientes variables. Utiliza el nombre de la variable de entorno (por ejemplo, `DD_TRACE_Agent_URL`) cuando configures las variables de entorno o los archivos de configuración. Utiliza la propiedad TracerSettings (por ejemplo, `Exporter.AgentUri`) cuando cambies la configuración en el código.

#### Etiquetado unificado de servicios

Para utilizar el [Etiquetado unificado de servicios][4], configura los siguientes parámetros para tus servicios:

`DD_ENV`
: **Propiedad TracerSettings**: `Environment`<br>
Si se especifica, añade la etiqueta (tag) `env` con el valor especificado a todos los tramos generados. Añadido en la versión 1.17.0.

`DD_SERVICE`
: **Propiedad TracerSettings**: `ServiceName`<br>
Si se especifica, define el nombre del servicio. De lo contrario, el rastreador .NET intenta determinar el nombre del servicio automáticamente a partir del nombre de la aplicación (nombre de la aplicación IIS, grupo de entrada de procesos o nombre de procesos). Añadido en la versión 1.17.0.

`DD_VERSION`
: **Propiedad TracerSettings**: `ServiceVersion`<br>
Si se especifica, define la versión del servicio. Añadido en la versión 1.17.0.

#### Configuración opcional

Las siguientes variables de configuración están disponibles tanto para la instrumentación automática como para la instrumentación personalizada:

`DD_TRACE_AGENT_URL`
: **Propiedad TracerSettings**: `Exporter.AgentUri`<br>
Define el endpoint de la URL al que se envían trazas. Sustituye a `DD_AGENT_HOST` y a`DD_TRACE_AGENT_PORT`, si están definidos. Si la [configuración del Agent][13] define`receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.<br>
Ten en cuenta que los sockets de dominio Unix (UDS) no son compatibles con .NET Framework.<br>
**Por defecto**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`, si están definidos, o `http://localhost:8126`.

`DD_AGENT_HOST`
: Define el host en que el Agent escucha conexiones. Puede ser un nombre de host o una dirección IP. Utiliza `DD_TRACE_AGENT_URL`, que tiene prioridad sobre este parámetro. <br>
**Por defecto**: `localhost`

`DD_TRACE_AGENT_PORT`
: Define el puerto TCP en que el Agent escucha conexiones. Utiliza `DD_TRACE_AGENT_URL`, que tiene prioridad sobre este parámetro. Si la [configuración del Agent][13] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto al predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.<br>
**Por defecto**: `8126`

`DD_TRACE_SAMPLE_RATE`
: **Propiedad en TracerSettings**: `GlobalSamplingRate` <br>
**Por defecto**: Se define por defecto según las frecuencias devueltas por el Datadog Agent<br>
Habilita el control de la frecuencia de consumo. Este parámetro es un valor flotante que representa el porcentaje de tramos a muestrear. Los valores válidos están comprendidos entre `0.0` y `1.0`.
Para obtener más información, consulta [Mecanismos de consumo][6].<br><br>
**Beta**: A partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes definir `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_TRACE_SAMPLING_RULES`
: **Propiedad en TracerSettings**: `CustomSamplingRules`<br>
**Por defecto**: `null`<br>
Una matriz de objetos JSON. Cada objeto debe tener una `sample_rate`. Los campos `name` y `service` son opcionales. El valor `sample_rate` debe estar comprendido entre `0.0` y `1.0` (inclusive). Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de la traza.
Para obtener más información, consulta [Mecanismos de consumo][6].<br>
**Ejemplos:**<br>
  - Configura la frecuencia de muestreo en 20%: `[{"sample_rate": 0.2}]`
  - Configura la frecuencia de muestreo en 10% para servicios que comienzan por 'a' y para el nombre del tramo que comienza por 'b', y configura la frecuencia de muestreo en 20% para todos los demás servicios: `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]`

`DD_TRACE_RATE_LIMIT`
: **Propiedad TracerSettings**: `MaxTracesSubmittedPerSecond` <br>
El número de trazas que se permite enviar por segundo (se discontinúa a `DD_MAX_TRACES_PER_SECOND`). <br>
**Por defecto**: `100`, cuando `DD_TRACE_SAMPLE_RATE` está definido. En caso contrario, delega la limitación de frecuencias al Datadog Agent.

`DD_TRACE_HEADER_TAGS`
: **Propiedad en TracerSettings**:`HeaderTags` <br>
Acepta un mapa de claves de cabecera sin distinción entre mayúsculas y minúsculas para etiquetar nombres y aplica automáticamente los valores de cabeceras coincidentes como etiquetas en trazas. También acepta entradas sin un nombre de etiqueta especificado, que se asignan automáticamente a etiquetas con los formatos `http.request.headers.<header-name>` y `http.response.headers.<header-name>`, respectivamente.<br><br>
**Ejemplo** (con nombres de etiqueta especificados): `User-ID:userId`<br>
Si la **Request** (Solicitud) tiene una cabecera `User-ID`, su valor se aplica como etiqueta `userId` a los tramos que produce el servicio.<br><br>
**Ejemplo** (sin nombres de etiqueta especificados): `User-ID`<br>
Si la **Request** (Solicitud) tiene una cabecera `User-ID`, su valor se aplica como etiqueta `http.request.headers.User-ID` .<br>
Si la **Answer** (Respuesta) tiene un encabezado `User-ID`, su valor se aplica como etiqueta `http.response.headers.User-ID` .<br><br>
Añadido en la versión 1.18.3.<br>
Compatibilidad con cabeceras de respuesta y entradas sin nombres de etiqueta añadidas en la versión 1.26.0.<br>
**Beta**: A partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes definir `DD_TRACE_HEADER_TAGS` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_TRACE_DEBUG`
: Habilita o deshabilita el registro de depuración. Los valores válidos son `true` o `false`.<br>
**Por defecto**: `false`

`DD_TRACE_HEADER_TAGS`
: **Propiedad TracerSettings**:`HeaderTags` <br>
Acepta un mapa de claves de cabeceras sin distinción entre mayúsculas y minúsculas a nombres de etiqueta y aplica automáticamente los valores de cabeceras coincidentes como etiquetas en trazas. También acepta entradas sin un nombre de etiqueta especificado, que se asignan automáticamente a etiquetas con los formatos `http.request.headers.<header-name>` y `http.response.headers.<header-name>`, respectivamente.<br><br>
**Ejemplo** (con nombres de etiqueta especificados): `User-ID:userId`<br>
Si la **Request** (Solicitud) tiene una cabecera`User-ID`, su valor se aplica como etiqueta `userId` a los tramos que produce el servicio.<br><br>
**Ejemplo** (sin nombres de etiqueta especificados): `User-ID`<br>
Si la **Request** (Solicitud) tiene una cabecera `User-ID`, su valor se aplica como etiqueta `http.request.headers.User-ID` .<br>
Si la **Answer** (Respuesta) tiene una cabecera `User-ID`, su valor se aplica como etiqueta `http.response.headers.User-ID` .<br><br>
Añadido en la versión 1.18.3.<br>
Compatibilidad con encabezados de respuesta y entradas sin nombres de etiqueta añadidos en la versión 1.26.0.<br>
**Fase beta**: a partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes establecer `DD_TRACE_HEADER_TAGS` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_TAGS`: **Propiedad TracerSettings**: `GlobalTags`<br>Si se especifica, añade todas las etiquetas especificadas a todos los tramos generados.<br>
**Ejemplo**: `layer:api, team:intake, key:value`<br> **Nota**: Se delimita mediante coma y espacio: `, `. Añadido en la versión 1.17.0. 5

`DD_TRACE_CLIENT_IP_HEADER`
: La cabecera IP que debe utilizarse para la recopilación de IP del cliente. Por ejemplo: `x-forwarded-for`. <br>
Añadido en la versión `2.19.0`.<br>
**Por defecto**: Datadog analiza los siguientes elementos: `x-forwarded-for`, `x-real-ip`, `true-client-ip`, `x-client-ip`, `x-forwarded`, `forwarded-for`, `x-cluster-client-ip`, `fastly-client-ip`, `cf-connecting-ip`, `cf-connecting-ipv6`. Si varios de ellos están presentes, no se informará ninguno.<br>

`DD_TAGS`
: **Propiedad TracerSettings**: `GlobalTags`<br>
Si se especifica, añade todas las etiquetas especificadas a todos los tramos generados. <br>
**Ejemplo**: `layer:api, team:intake, key:value` <br>
**Nota**: El delimitador es una coma y un espacio: `, `. <br>
Añadido en la versión 1.17.0. <br>

`DD_TRACE_LOG_DIRECTORY`
: Define el directorio para logs del rastreador .NET. <br>
**Por defecto**: `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOGFILE_RETENTION_DAYS`
: Durante el inicio del rastreador, esta configuración utiliza el directorio de logs actual del rastreador para borrar los archivos de logs que tienen la misma o una mayor antigüedad que el número de días dado. Añadido en la versión 2.19.0. <br>
**Por defecto**: `32`

`DD_TRACE_LOGGING_RATE`
: Define un límite de frecuencia para los mensajes de logs. Si se configura, las líneas de log únicas se escriben una vez cada `x` segundos. Por ejemplo, para registrar un mensaje determinado una vez cada 60 segundos, configura `60`. Si configuras `0`, se deshabilita la limitación de la frecuencia de los logs. Añadido en la versión 1.24.0. Deshabilitado por defecto.

`DD_TRACE_SERVICE_MAPPING`
: Renombra servicios utilizando la configuración. Acepta una lista separada por comas de pares clave-valor de las claves de nombres de servicios a renombrar, y el nombre a utilizar en su lugar, con el formato `[from-key]:[to-name]`. <br>
**Ejemplo**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
El valor `from-key` es específico del tipo integración y debe excluir el prefijo del nombre de la aplicación. Por ejemplo, para cambiar el nombre de `my-application-sql-server` a `main-db`, utiliza `sql-server:main-db`. Añadido en la versión 1.23.0

`DD_HTTP_SERVER_TAG_QUERY_STRING`
: Cuando se configura como `true`, la `http.url` incluye parámetros de cadena de consulta. Puedes obtener más detalles para [ocultar la consulta en la URL][14].
**Por defecto**: `true`

`DD_HTTP_SERVER_TAG_QUERY_STRING_SIZE`
: Cuando `DD_HTTP_SERVER_TAG_QUERY_STRING` es verdadero, define el tamaño máximo de la cadena de consulta a informar, antes de la ofuscación. Configúralo como 0 para no limitar el tamaño<br>
**Por defecto**: `5000`

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: Cuando `DD_HTTP_SERVER_TAG_QUERY_STRING` es verdadero, esta expresión regular (regex) oculta los datos confidenciales de la cadena de consulta de las solicitudes entrantes que aparecen en la etiqueta `http.url` (las coincidencias se sustituyen por `<redacted>`). Esta expresión regular se ejecuta para cada solicitud entrante.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: Datadog puede recopilar [información de entorno y de diagnóstico sobre tu sistema][15] para mejorar el producto. Si es falso, no se recopilarán estos datos de telemetría.<br>
**Por defecto**: `true`

`DD_TRACE_OTEL_ENABLED`
: Habilita o deshabilita el rastreo basado en OpenTelemetry, tanto para la instrumentación [personalizada][18] como para la [automática][19].
Los valores válidos son: `true` o `false`.<br>
**Por defecto**: `false`

#### Configuración opcional de la instrumentación automática

Las siguientes variables de configuración están disponibles **sólo** cuando se utiliza la instrumentación automática:

`DD_TRACE_ENABLED`
: **Propiedad TracerSettings**: `TraceEnabled`<br>
Habilita o deshabilita toda la instrumentación. Los valores válidos son: `true` o `false`.<br>
**Por defecto**: `true`
**Nota**: Configurar la variable de entorno como `false` deshabilita completamente la librería del cliente, que no puede habilitarse con otros métodos de configuración. Si se configura como `false`, con otro método de configuración (no una variable de entorno), la librería del cliente se sigue cargando, pero no se generarán trazas.

`DD_DBM_PROPAGATION_MODE`
: Permite la vinculación entre los datos enviados desde APM y el producto de Database Monitoring cuando se define como`service` o `full`. La opción `service` permite la conexión entre servicios DBM y APM. La opción `full` permite la conexión entre tramos de bases de datos y eventos de consulta de bases de datos. Disponible para Postgres y MySQL.<br>
**Por defecto**: `disabled`

`DD_HTTP_CLIENT_ERROR_STATUSES`
: Define los rangos de códigos de estado que harán que los tramos del cliente HTTP se marquen como error. <br>
**Por defecto**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: Define los rangos de códigos de estado que harán que los tramos del servidor HTTP se marquen como error. <br>
**Por defecto**: `500-599`

`DD_LOGS_INJECTION`
: **Propiedad en TracerSettings**: `LogsInjectionEnabled` <br>
Habilita o deshabilita la inyección automática de identificadores de correlación en los logs de aplicación. <br>
Tu gestor de logs necesita tener una `source` que defina la asignación de `trace_id` correctamente. La fuente por defecto para aplicaciones .NET, `csharp`, lo hace automáticamente. Para obtener más información, consulta [logs correlacionados en el panel de ID de rastreo][5].<br><br>
**Beta**: A partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes definir `DD_LOGS_INJECTION` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_RUNTIME_METRICS_ENABLED`
: Habilita las métricas de tiempo de ejecución de .NET. Los valores válidos son `true` o `false`. <br>
**Por defecto**: `false`<br>
Añadido en la versión 1.23.0.

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: Expande todos los parámetros de ruta en la aplicación para ASP.NET/ASP.NET Core (excepto los parámetros de ID).<br>
Esto puede ser útil si estás utilizando nombres de parámetros para diferenciar entre valores de formulario, o un slug, como en GraphQL.
**Por defecto**: `false`
Añadido en la versión 2.5.2

`DD_TRACE_METHODS`
: Lista de métodos a rastrear. Acepta una lista separada por punto y coma (`;`), donde cada entrada tiene el formato `TypeName[MethodNames]`, donde `MethodNames` es una lista separada por comas (`,`) de nombres de métodos, o el comodín `*`. Para los tipos genéricos, sustituye los corchetes angulares y los nombres de los parámetros de tipo por una comilla simple (`` ` ``) seguida por el número de parámetros de tipo genéricos. Por ejemplo, `Dictionary<TKey, TValue>` debe escribirse `` Dictionary`2 ``. Para los métodos genéricos, sólo es necesario especificar el nombre del método. <br>
**Ejemplo ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**Nota:** La compatibilidad del método del comodín (`[*]`) selecciona todos los métodos de un tipo, excepto constructores, getters y setters de propiedades, `Equals`, `Finalize`, `GetHashCode`, y `ToString`. <br>
Añadido en la versión 2.6.0.
Compatibilidad de comodines `[*]` añadida en la versión 2.7.0.

`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`
: Altera el comportamiento del tramo del consumidor Kafka<br>
**Por defecto**: `true`<br>
Cuando se configura como `true`, el tramo del consumidor se crea cuando se consume un mensaje y se cierra antes de consumir el siguiente mensaje. La duración del tramo es representativa del cálculo entre el consumo de un mensaje y el siguiente. Utiliza esta configuración cuando el consumo de mensajes se realiza en bucle. <br>
Cuando se configura como `false`, el tramo del consumidor se crea cuando se consume un mensaje y se cierra inmediatamente. Utiliza este parámetro cuando un mensaje no se procesa completamente antes de consumir el siguiente o cuando se consumen varios mensajes a la vez. Cuando este parámetro se configura como `false`, los tramos del consumidor se cierran inmediatamente. Si tienes tramos secundarios a rastrear, debes extraer el contexto manualmente. Para obtener más detalles, consulta [Extracción e inyección de cabeceras][12].

#### Configuración de la integración de instrumentación automática

La siguiente tabla enumera las variables de configuración que están disponibles **sólo** cuando se utiliza la instrumentación automática y que pueden configurarse para cada integración.

`DD_DISABLED_INTEGRATIONS`
: **Propiedad TracerSettings**: `DisabledIntegrationNames` <br>
Define una lista de integraciones para deshabilitar. Todas las otras integraciones permanecen habilitadas. Si no se define, se habilitan todas las integraciones. Admite varios valores separados por punto y coma. Los valores válidos son los nombres de integraciones listados en la sección [Integraciones][7].

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Propiedad TracerSettings**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
Habilita o deshabilita una integración específica. Los valores válidos son: `true` o `false`. Los nombres de integraciones están listados en la sección [Integraciones][7].<br>
**Por defecto**: `true`

#### Características experimentales

Las siguientes variables de configuración corresponden a funciones que están disponibles para su uso, pero que pueden cambiar en futuras versiones.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Permite la descarga incremental de trazas de gran tamaño al Datadog Agent, reduciendo la posibilidad de rechazo por parte del Agent. Utilízala sólo cuando tengas trazas de mucha antigüedad o trazas con muchos tramos. Los valores válidos son `true` o `false`. Añadido en la versión 1.26.0, solo compatible con el Datadog Agent 7.26.0 o posterior.<br>
**Por defecto**: `false`

#### Parámetros obsoletos

`DD_TRACE_LOG_PATH`
: Define la ruta para el archivo de logs de la instrumentación automática y determina el directorio de todos los demás archivos de logs del rastreador .NET. Se ignora si se define `DD_TRACE_LOG_DIRECTORY`.

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: Habilita nombres de recursos mejorados para los tramos web, cuando se configura como`true`. Utiliza información de plantilla de ruta, cuando está disponible. Añade un tramo adicional para integraciones de ASP.NET Core y habilita etiquetas adicionales. Añadido en la versión 1.26.0. Habilitado por defecto en 2.0.0<br>
**Por defecto**: `true`


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[3]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#head-based-sampling
[7]: /es/tracing/trace_collection/compatibility/dotnet-framework/#integrations
[8]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[12]: /es/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/tracing/configure_data_security/#redacting-the-query-in-the-url
[15]: /es/tracing/configure_data_security#telemetry-collection
[16]: /es/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /es/tracing/trace_collection/otel_instrumentation/dotnet/
[19]: /es/tracing/trace_collection/compatibility/dotnet-core/#opentelemetry-based-integrations
[20]: /es/opentelemetry/interoperability/environment_variable_support
