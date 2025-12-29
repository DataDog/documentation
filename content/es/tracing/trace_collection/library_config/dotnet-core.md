---
null
...
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [Etiquetado de servicios unificado][4].

{{< img src="tracing/dotnet/dotnet_core_configuration.png" alt="Establecer precedencia de la configuración del rastreador de .NET Core" style="width:100%" >}}

Puedes definir parámetros de configuración en el rastreador de .NET utilizando cualquiera de los siguientes métodos:

{{< tabs >}}

{{% tab "Environment variables" %}}

Para configurar el rastreador mediante variables de entorno, establece las variables antes de lanzar la aplicación instrumentada. Para saber cómo configurar las variables de entorno en diferentes entornos, consulta [Proceso de configuración de las variables de entorno][1].

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-core/#configuring-process-environment-variables
{{% /tab %}}

{{% tab "Code" %}}

Para configurar el rastreador en el código de la aplicación, crea una instancia `TracerSettings` a partir de las fuentes de configuración predeterminadas. Establece las propiedades de esta instancia `TracerSettings` antes de llamar a `Tracer.Configure()`. Por ejemplo:

<div class="alert alert-danger">
 <strong>Nota:</strong> La configuración debe establecerse en <code>TracerSettings</code> <em>antes de</em> crear el <code>rastreador</code>. Los cambios realizados en las propiedades de <code>TracerSettings</code> después de crear el <code>rastreador</code> se ignoran.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// fuentes de configuración de lectura por defecto (variables de entorno o datadog.json)
var settings = TracerSettings.FromDefaultSources();

// cambia algunos ajustes
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.Exporter.AgentUri = new Uri("http://localhost:8126/");

// configura los ajustes globales del rastreador
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "JSON file" %}}

Para configurar el rastreador mediante un archivo JSON, crea `datadog.json` en el directorio de la aplicación instrumentada. El objeto JSON raíz debe ser un objeto con un par clave-valor para cada ajuste. Por ejemplo:

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

### Ajustes de configuración

<div class="alert alert-danger">
 <strong>Nota:</strong> En Linux, los nombres de las variables de entorno distinguen entre mayúsculas y minúsculas.
</div>

Con los métodos descritos anteriormente, personaliza tu configuración de rastreo con las siguientes variables. Utiliza el nombre de la variable de entorno (por ejemplo, `DD_TRACE_AGENT_URL`) cuando configures las variables de entorno o los archivos de configuración. Utiliza la propiedad TracerSettings (por ejemplo, `Exporter.AgentUri`) cuando cambies la configuración en el código.

#### Etiquetado de servicios unificado

Para utilizar el [etiquetado de servicios unificado][4], configura los siguientes ajustes para tus servicios:

`DD_ENV`
: **Propiedad en TracerSettings**: `Environment`<br>
Si se especifica, añade la etiqueta `env` con el valor especificado a todos los tramos generados. Añadido en la versión 1.17.0.

`DD_SERVICE`
: **Propiedad en TracerSettings**: `ServiceName`<br>
Si se especifica, establece el nombre del servicio. De lo contrario, el rastreador de .NET intenta determinar el nombre del servicio automáticamente a partir del nombre de la aplicación (nombre de la aplicación IIS, ensamblador del proceso de entrada, o nombre del proceso). Añadido en la versión 1.17.0.

`DD_VERSION`
: **Propiedad en TracerSettings**: `ServiceVersion`<br>
Si se especifica, establece la versión del servicio. Añadido en la versión 1.17.0.

#### Configuración opcional

Las siguientes variables de configuración están disponibles tanto para la instrumentación automática como para la personalizada:

`DD_TRACE_AGENT_URL`
: **Propiedad en TracerSettings**: `Exporter.AgentUri`<br>
Establece el endpoint de la URL donde se envían trazas. Sustituye a `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` si están establecidos. Si la [configuración del Agent][13] establece `receiver_port` o `DD_APM_RECEIVER_PORT` a algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.<br>
Puede contener una ruta de Unix Domain Socket (UDS) anteponiendo la ruta `unix://`. <br>
Ten en cuenta que UDS solo es compatible con .NET Core 3.1 y versiones posteriores.<br>
**Predeterminado**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` si están configurados, `unix:///var/run/datadog/apm.socket` si el archivo existe, o `http://localhost:8126`.

`DD_AGENT_HOST`
: establece el host donde el Agent escucha conexiones. Puede ser un nombre de host o una dirección IP. Utiliza `DD_TRACE_AGENT_URL`, que tiene prioridad sobre este parámetro. <br>
**Predeterminado**: `localhost`

`DD_TRACE_AGENT_PORT`
: establece el puerto TCP en el que el Agent escucha conexiones. Utiliza `DD_TRACE_AGENT_URL`, que tiene prioridad sobre este parámetro. Si la [configuración del Agent][13] establece `receiver_port` o `DD_APM_RECEIVER_PORT` a algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.<br>
**Predeterminado**: `8126`

`DD_TRACE_SAMPLE_RATE`
: **Propiedad en TracerSettings**: `GlobalSamplingRate` <br>
**Predeterminado**: se establece por defecto en la tasa devuelta por el Datadog Agent<br>
Activa el control de la tasa de ingesta. Este parámetro es un valor flotante que representa el porcentaje de tramos a muestrear. Los valores válidos van de `0.0` a `1.0`.
Para más información, consulta [Mecanismos de ingesta][11].<br><br>
**Fase beta**: a partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes establecer `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_TRACE_SAMPLING_RULES`
: **Propiedad en TracerSettings**: `CustomSamplingRules`<br>
**Predeterminado**: `null`<br>
Una matriz de objetos JSON. Cada objeto debe tener una `sample_rate`. Los campos `name` y `service` son opcionales. El valor `sample_rate` debe estar comprendido entre `0.0` y `1.0` (ambos inclusive). Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de la traza.
Para más información, consulta [Mecanismos de ingesta][11].<br>
**Ejemplos:**<br>
  - Configura la frecuencia de muestreo en 20%: `[{"sample_rate": 0.2}]`
  - Ajusta la frecuencia de muestreo al 10% para servicios que empiece por 'a' y nombre de tramo 'b' y fija la frecuencia de muestreo en 20% para todos los demás servicios: `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]`

`DD_TRACE_RATE_LIMIT`
: **Propiedad en TracerSettings**: `MaxTracesSubmittedPerSecond` <br>
El número de trazas que se permite enviar por segundo (deja obsoleto a `DD_MAX_TRACES_PER_SECOND`). <br>
**Predeterminado**: `100` cuando `DD_TRACE_SAMPLE_RATE` está establecido. En caso contrario, delega el límite de frecuencia al Datadog Agent.

`DD_SPAN_SAMPLING_RULES`
: **Predeterminado**: `null`<br>
Una matriz de objetos JSON. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo del tramo. El valor de `sample_rate` debe estar comprendido entre 0,0 y 1,0 (ambos inclusive). Para más información, consulta [Mecanismos de ingesta][1].<br>
**Ejemplo**: Establece la frecuencia de muestreo del tramo en un 50% para el servicio `my-service` y el nombre de operación `http.request`, hasta 50 trazas por segundo: `[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]`

`DD_TRACE_DEBUG`
: activa o desactiva el registro de depuración. Los valores válidos son `true` o `false`.<br>
**Por defecto**: `false`

`DD_TRACE_HEADER_TAGS`
: **Propiedad en TracerSettings**:`HeaderTags` <br>
Acepta un mapa de claves de encabezado sin distinción entre mayúsculas y minúsculas a nombres de etiqueta, y aplica automáticamente los valores de encabezado coincidentes como etiquetas en trazas. También acepta entradas sin un nombre de etiqueta especificado que se asignan automáticamente a etiquetas de la forma `http.request.headers.<header-name>` y `http.response.headers.<header-name>`, respectivamente.<br><br>
**Ejemplo** (con nombres de etiqueta especificados): `User-ID:userId`<br>
Si la **Request** (Solicitud) tiene un encabezado `User-ID`, su valor se aplica como etiqueta `userId` a los tramos que produce el servicio.<br><br>
**Ejemplo** (sin nombres de etiqueta especificados): `User-ID`<br>
Si la **Request** (Solicitud) tiene un encabezado `User-ID`, su valor se aplica como etiqueta `http.request.headers.User-ID` .<br>
Si la **Answer** (Respuesta) tiene un encabezado `User-ID`, su valor se aplica como etiqueta `http.response.headers.User-ID` .<br><br>
Añadido en la versión 1.18.3.<br>
Compatibilidad con encabezados de respuesta y entradas sin nombres de etiqueta añadidos en la versión 1.26.0.<br>
**Fase beta**: a partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes establecer `DD_TRACE_HEADER_TAGS` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_TRACE_CLIENT_IP_ENABLED`
: permite recopilar la IP del cliente a partir de los encabezados de IP relevantes.<br>
Añadido en la versión `2.19.0`.<br>
**Predeterminado**: `false`<br>

`DD_TRACE_CLIENT_IP_HEADER`
: el encabezado IP que se utilizará para la recopilación de IP del cliente, por ejemplo: `x-forwarded-for`. <br>
Añadido en la versión `2.19.0`.<br>
**Predeterminado**: Datadog analiza lo siguiente: `x-forwarded-for`, `x-real-ip`, `true-client-ip`, `x-client-ip`, `x-forwarded`, `forwarded-for`, `x-cluster-client-ip`, `fastly-client-ip`, `cf-connecting-ip`, `cf-connecting-ipv6`. Si hay varios, se utilizará el primero de la lista que analice correctamente.<br>

`DD_TAGS`
: **Propiedad en TracerSettings**: `GlobalTags`<br>
Si se especifica, añade todas las etiquetas especificadas a todos los tramos generados. <br>
**Ejemplo**: `layer:api, team:intake, key:value` <br>
**Nota**: El delimitador es una coma y un espacio: `, `. <br>
Añadido en la versión 1.17.0. <br>

`DD_TRACE_LOG_DIRECTORY`
: establece el directorio para logs del rastreador de .NET. <br>
**Predeterminado**: `%ProgramData%\Datadog .NET Tracer\logs\` en Windows, `/var/log/datadog/dotnet` en Linux

`DD_TRACE_LOGFILE_RETENTION_DAYS`
: durante el inicio del rastreador, esta configuración utiliza el directorio de log actual del rastreador para borrar los archivos log de la misma antigüedad y más antiguos que el número de días dado. Añadido en la versión 2.19.0. <br>
**Predeterminado**: `32`

`DD_TRACE_LOGGING_RATE`
: establece un límite de frecuencia para los mensajes de log. Si se establece, las líneas de log únicas se escriben una vez cada `x` segundos. Por ejemplo, para loguear un mensaje determinado una vez cada 60 segundos, establece `60`. Si estableces `0`, se desactiva la limitación de frecuencia de log. Añadido en la versión 1.24.0. Desactivado por defecto.

`DD_TRACE_SERVICE_MAPPING`
: renombra servicios mediante la configuración. Acepta una lista separada por comas de pares clave-valor de las claves de nombre de servicio a renombrar, y el nombre a utilizar en su lugar, en el formato `[from-key]:[to-name]`. <br>
**Ejemplo**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
El valor `from-key` es específico del tipo de integración, y debe excluir el prefijo del nombre de la aplicación. Por ejemplo, para cambiar el nombre de `my-application-sql-server` a `main-db`, utiliza `sql-server:main-db`. Añadido en la versión 1.23.0

`DD_HTTP_SERVER_TAG_QUERY_STRING`
: cuando se establece en `true`, la `http.url` incluye parámetros de cadena de consulta. Puedes encontrar más detalles en [Redactar la consulta en la URL][14].
**Predeterminado**: `true`

`DD_HTTP_SERVER_TAG_QUERY_STRING_SIZE`
: cuando `DD_HTTP_SERVER_TAG_QUERY_STRING` es verdadero, se establece el tamaño máximo de la cadena de consulta a informar, antes del enmascaramiento. Establece 0 para no limitar el tamaño<br>
**Predeterminado**: `5000`

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: cuando `DD_HTTP_SERVER_TAG_QUERY_STRING` es true, esta expresión regular redacta los datos confidenciales de la cadena de consulta de las solicitudes entrantes que aparecen en la etiqueta `http.url` (las coincidencias se sustituyen por `<redacted>`). Esta expresión regular se ejecuta para cada solicitud entrante.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: Datadog puede recopilar [información de entorno y de diagnóstico sobre tu sistema][15] para mejorar el producto. Si es false, no se recopilarán estos datos de telemetría.<br>
**Predeterminado**: `true`

`DD_TRACE_OTEL_ENABLED`
: activa o desactiva el rastreo basado en OpenTelemetry, tanto para la instrumentación [personalizada][18] como para la [automática][19].
Los valores válidos son: `true` o `false`.<br>
**Predeterminado**: `false`

#### Configuración opcional de instrumentación automática

Las siguientes variables de configuración están disponibles **solo** cuando se utiliza la instrumentación automática:

`DD_TRACE_ENABLED`
: **Propiedad en TracerSettings**: `TraceEnabled`<br>
Activa o desactiva toda la instrumentación. Los valores válidos son: `true` o `false`.<br>
**Predeterminado**: `true`
**Nota**: Establecer la variable de entorno en `false` deshabilita completamente la librería del cliente, y no puede ser habilitada a través de otros métodos de configuración. Si se establece en `false` a través de otro método de configuración (no una variable de entorno), la librería del cliente se sigue cargando, pero no se generarán trazas.

`DD_DBM_PROPAGATION_MODE`
: permite la conexión entre los datos enviados desde APM y el producto de Database Monitoring cuando se establece en `service` o `full`. La opción `service` permite la conexión entre DBM y servicios de APM. La opción `full` permite la conexión entre los tramos de base de datos y los eventos de consulta de base de datos. Disponible para Postgres y MySQL.<br>
**Predeterminado**: `disabled`

`DD_HTTP_CLIENT_ERROR_STATUSES`
: establece los rangos de códigos de estado que harán que los tramos de cliente HTTP se marquen como error. <br>
**Predeterminado**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: establece los rangos de códigos de estado que harán que los tramos de servidor HTTP se marquen como error. <br>
**Predeterminado**: `500-599`

`DD_LOGS_INJECTION`
: **Propiedad en TracerSettings**: `LogsInjectionEnabled` <br>
Activa o desactiva la inyección automática de identificadores de correlación en los logs de aplicación. <br>
Tu registrador necesita tener una `source` que establezca la asignación de `trace_id` correctamente. La fuente por defecto para aplicaciones .NET, `csharp`, hace esto automáticamente. Para obtener más información, consulta [logs correlacionados en el panel de identificadores de traza][5].<br><br>
**Fase beta**: a partir de la versión 2.35.0, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes establecer `DD_LOGS_INJECTION` en la interfaz de usuario del [Catálogo de servicios][17].

`DD_RUNTIME_METRICS_ENABLED`
: activa las métricas de tiempo de ejecución de .NET. Los valores válidos son `true` o `false`. <br>
**Predeterminado**: `false`<br>
Añadido en la versión 1.23.0.

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: expande todos los parámetros de ruta en la aplicación para ASP.NET/ASP.NET Core (excepto los parámetros de ID).<br>
Esto puede ser útil si estás utilizando nombres de parámetro para diferenciar entre valores de formulario, o un slug, como en GraphQL.
**Predeterminado**: `false`
Añadido en la versión 2.5.1.

`DD_TRACE_METHODS`
: lista de métodos a rastrear. Acepta una lista separada por punto y coma (`;`) donde cada entrada tiene el formato `Namespace.TypeName[MethodNames]`, donde `MethodNames` es una lista separada por comas (`,`) de los nombres de métodos o el comodín `*`. Para los tipos genéricos, sustituye los corchetes angulares y los nombres de los parámetros de tipo por un apóstrofo (`` ` ``) followed by the number of generic type parameters. For example, `Dictionary<TKey, TValue>` must be written as `` Dictionary`2 ``. Para los métodos genéricos, solo es necesario especificar el nombre del método. <br>
**Ejemplo ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**Nota:** El soporte del método de comodín (`[*]`) selecciona todos los métodos de un tipo excepto constructores, getters y setters de propiedades, `Equals`, `Finalize`, `GetHashCode` y `ToString`. <br>
Añadido en la versión 2.6.0.
Soporte de comodines `[*]` añadido en la versión 2.7.0.

`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`
: altera el comportamiento del tramo del consumidor de Kafka<br>
**Predeterminado**: `true`<br>
Cuando se establece en `true`, el consumidor de tramo se crea cuando se consume un mensaje y se cierra antes de consumir el siguiente mensaje. La duración del tramo es representativa del cómputo entre el consumo de un mensaje y el siguiente. Utiliza esta configuración cuando el consumo de mensajes se realice en un bucle.<br>
Cuando se establece en `false`, el consumidor de tramo se crea cuando se consume un mensaje y se cierra inmediatamente. Utiliza este ajuste cuando un mensaje no se procesa completamente antes de consumir el siguiente, o cuando se consumen varios mensajes a la vez. Cuando se ajusta este parámetro en `false`, el consumidor de tramos se cierra inmediatamente. Si tienes tramos secundarios para rastrear, debes extraer el contexto manualmente. Lee [Extracción e inyección de encabezados][12] para más detalles.

#### Configuración de la integración de instrumentación automática

La siguiente tabla enumera las variables de configuración que están disponibles **solo** cuando se utiliza la instrumentación automática y que pueden configurarse para cada integración.

`DD_DISABLED_INTEGRATIONS`
: **Propiedad en TracerSettings**: `DisabledIntegrationNames` <br>
Establece una lista de integraciones para desactivar. Todas las otras integraciones permanecen habilitadas. Si no se establece, todas las integraciones están habilitadas. Admite varios valores separados por punto y coma. Los valores válidos son los nombres de integración listados en la sección [Integraciones][6].

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Propiedad en TracerSettings**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
Habilita o deshabilita una integración específica. Los valores válidos son: `true` o `false`. Los nombres de integración están listados en la sección [Integraciones][6].<br>
**Predeterminado**: `true`

#### Características experimentales

Las siguientes variables de configuración corresponden a funciones que están disponibles para su uso, pero que pueden cambiar en futuras versiones.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: permite la descarga incremental de trazas de gran tamaño al Datadog Agent, reduciendo la posibilidad de rechazo por parte del Agent. Utilízala solo cuando tengas trazas de mucha antigüedad o trazas con muchos tramos. Los valores válidos son `true` o `false`. Añadido en la versión 1.26.0, solo compatible con el Datadog Agent 7.26.0+.<br>
**Predeterminado**: `false`

#### Ajustes obsoletos

`DD_TRACE_LOG_PATH`
: establece la ruta para el archivo de log de la instrumentación automática y determina el directorio de todos los demás archivos de log del rastreador de .NET. Se ignora si se establece `DD_TRACE_LOG_DIRECTORY`.

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: habilita nombres de recursos mejorados para los tramos web cuando se establece en `true`. Utiliza información de plantilla de ruta cuando está disponible, añade un tramo adicional para integraciones de ASP.NET Core y habilita etiquetas adicionales. Añadido en la versión 1.26.0. Activado por defecto en 2.0.0<br>
**Predeterminado**: `true`


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /es/tracing/trace_collection/compatibility/dotnet-core#integrations
[7]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[8]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[11]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=net#pagetitle
[12]: /es/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/tracing/configure_data_security/#redacting-the-query-in-the-url
[15]: /es/tracing/configure_data_security#telemetry-collection
[16]: /es/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /es/tracing/trace_collection/otel_instrumentation/dotnet/
[19]: /es/tracing/trace_collection/compatibility/dotnet-core/#opentelemetry-based-integrations
[20]: /es/opentelemetry/interoperability/environment_variable_support
