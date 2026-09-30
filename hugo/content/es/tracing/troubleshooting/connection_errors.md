---
aliases:
- /es/tracing/faq/why-am-i-getting-errno-111-connection-refused-errors-in-my-application-logs/
title: Errores de conexión de APM
---

Si la aplicación con la librería de rastreo no puede alcanzar el Datadog Agent, busca errores de conexión en los [logs de inicio del rastreador][1] o [logs de depuración del rastreador][2], que puedes encontrar con tus logs de aplicación.

## Errores que indican un problema de conexión de APM

Si ves estos mensajes, significa que tus trazas (traces) no se están enviando al Datadog Agent.

### Errores de la librería de rastreo

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}
#### CLI de diagnóstico de Java

A partir de la versión 0.82.0+ del rastreador de Java, puedes utilizar un comando de diagnóstico donde esté instalado el rastreador de Java para detectar posibles problemas de conexión. Desde donde esté instalado `dd-java-agent.jar` (dentro del contenedor de la aplicación), ejecuta:

```bash
java -jar /path/to/dd-java-agent.jar sampleTrace -c 1
```

Resultado del ejemplo:

```text
[dd.trace 2021-08-24 18:38:01:501 +0000] [dd-task-scheduler] INFO datadog.trace.agent.core.StatusLogger - DATADOG TRACER CONFIGURATION {"version":"0.83.2~6bb3e09b2a","os_name":"Linux","os_version":"5.10.25-linuxkit","architecture":"amd64","lang":"jvm","lang_version":"1.8.0_232","jvm_vendor":"Oracle Corporation","jvm_version":"25.232-b09","java_class_version":"52.0","http_nonProxyHosts":"null","http_proxyHost":"null","enabled":true,"service":"dd-java-agent","agent_url":"http://localhost:8126","agent_error":true,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":true,"profiling_enabled":false,"dd_version":"0.83.2~6bb3e09b2a","health_checks_enabled":true,"configuration_file":"no config file present","runtime_id":"<ID>","logging_settings":{"levelInBrackets":false,"dateTimeFormat":"'[dd.trace 'yyyy-MM-dd HH:mm:ss:SSS Z']'","logFile":"System.err","configurationFile":"simplelogger.properties","showShortLogName":false,"showDateTime":true,"showLogName":true,"showThreadName":true,"defaultLogLevel":"INFO","warnLevelString":"WARN","embedException":false}}
[dd.trace 2021-08-24 18:38:02:164 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 1 (size=316B) traces to the DD agent. Total: 1, Received: 1, Sent: 0, Failed: 1. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```


#### Logs de inicio del rastreador

```text
[dd.trace 2021-08-17 17:59:29:234 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 9 (size=5KB) traces to the DD agent. Total: 9, Received: 9, Sent: 0, Failed: 9. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```

#### Logs de depuración del rastreador

```text
[dd.trace 2021-08-17 18:04:50:282 +0000] [dd-trace-processor] DEBUG datadog.communication.ddagent.DDAgentFeaturesDiscovery - Error querying info at http://localhost:8126/
java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126
    at okhttp3.internal.connection.RealConnection.connectSocket(RealConnection.java:249)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

#### Logs de inicio del rastreador

```text
2021-08-17 19:10:06,169 WARNING [ddtrace.tracer] [tracer.py:655] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - - DATADOG TRACER DIAGNOSTIC - Agent not reachable at http://localhost:8126. Exception raised: [Errno 99] Cannot assign requested address
```

#### Logs de depuración del rastreador

```text
2021-08-17 14:04:12,982 ERROR [ddtrace.internal.writer] [writer.py:466] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - failed to send traces to Datadog Agent at http://localhost:8126
Traceback (most recent call last):

```


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Logs de inicio del rastreador

```text
W, [2021-08-17T18:37:51.542245 #24]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126)
```

#### Logs de depuración del rastreador

```text
D, [2021-08-17T18:51:28.962389 #24] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:33:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /usr/local/lib/ruby/2.5.0/net/http.rb:939:in `rescue in block in connect'
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Logs de inicio del rastreador

```text
2021/08/17 17:46:22 Datadog Tracer v1.32.0 WARN: DIAGNOSTICS Unable to reach agent intake: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused
```

#### Logs de depuración del rastreador

```text
2021/08/17 17:47:42 Datadog Tracer v1.32.0 ERROR: lost 1 traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused (occurred: 17 Aug 21 17:46 UTC)
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

#### Logs de inicio del rastreador

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

#### Logs de depuración del rastreador

```text
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
    at ClientRequest.<anonymous> (/home/node-web-app/node_modules/dd-trace/packages/dd-trace/src/platform/node/request.js:51:33)
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Logs gestionados

Incluso si el modo de depuración no está activado, los logs gestionados contienen errores por problemas de conexión rechazada:

```
{ MachineName: ".", Process: "[114 sample-web-app]", AppDomain: "[1 sample-web-app]", TracerVersion: "1.28.2.0" }
2021-08-17 18:19:46.827 +00:00 [ERR] An error occurred while sending 1 traces to the agent at http://127.0.0.1:8126/v0.4/traces
System.Net.Http.HttpRequestException: Connection refused
 ---> System.Net.Sockets.SocketException (111): Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---

```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

#### Logs de inicio del rastreador

```
Failed to connect to localhost port 8126: Connection refused
```

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

#### Logs de aplicación

Cuando la aplicación no puede alcanzar el Datadog Agent, estos mensajes de log se emiten a donde tu aplicación envía logs:

```
Error sending traces to agent: Couldn't connect to server
Failed to connect to localhost port 8126: Connection refused
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Errores del Datadog Agent

Si el comando [`agent status`][3] (disponible en el Agent 6.20.0/7.20.0) muestra que APM no se está ejecutando o no es accesible en `localhost:8126`, tu Datadog Agent no tiene APM configurado y las trazas no se pueden enviar al backend de Datadog.

```text
APM Agent
=========
  Status: Not running or unreachable on localhost:8126.
```

## Solucionar problemas de conexión
Tanto si la librería de rastreo o el Datadog Agent muestran el error, hay algunas formas de solucionar el problema.

### Configuraciones basadas en host

Si tu aplicación y el Datadog Agent no están en contenedores, la aplicación con la librería de rastreo debería estar intentando enviar trazas a `localhost:8126` o `127.0.0.1:8126`, porque ahí es donde el Datadog Agent está escuchando.

Si el Datadog Agent muestra que APM no está escuchando, comprueba si el puerto entra en conflicto con el puerto 8126, que es el que utiliza por defecto el componente APM del Datadog Agent.

Si no puedes aislar la causa raíz, [ponte en contacto con el soporte de Datadog][4] con:
- Información sobre el entorno en el que vas a desplegar la aplicación y el Datadog Agent.
- Si utilizas proxies, información sobre cómo se han configurado.
- Si estás intentando cambiar el puerto por defecto de 8126 a otro puerto, la información sobre ese puerto.
- Un [flare de Datadog Agent][5].

### Instalaciones en contenedores

#### Configuración del check de red

En configuraciones en contenedores, enviar trazas a `localhost` o `127.0.0.1` suele ser incorrecto, ya que el Datadog Agent también está en un contenedor y se encuentra en otro lugar. **Nota**: Amazon ECS en Fargate y AWS EKS en Fargate son excepciones a esta regla.

Determina si la conexión de red entre la aplicación y el Datadog Agent coincide con lo que se necesita para esa configuración.

En particular, comprueba que el Datadog Agent tiene acceso al puerto `8126` (o al puerto que hayas definido) y que tu aplicación es capaz de dirigir trazas a la localización del Datadog Agent.
Para ello, puedes ejecutar el siguiente comando desde el contenedor de la aplicación, sustituyendo las variables `{agent_ip}` y `{agent_port}`:

```
curl -X GET http://{agent_ip}:{agent_port}/info
```

Si este comando falla, tu contenedor no puede acceder al Agent. Consulta las siguientes secciones para obtener pistas sobre lo que podría estar causando este problema.

Un buen punto de partida es la [documentación de configuración dentro de la aplicación de APM][6].

#### Revisar a dónde intenta enviar trazas tu biblioteca de rastreo

Utilizando los logs de error enumerados anteriormente para cada lenguaje, comprueba a dónde se dirigen tus trazas.

Consulta la tabla siguiente para ver ejemplos de configuración. Algunos requieren configuraciones adicionales de red, que se explican con más detalle en su documentación.

| Configuración   | `DD_AGENT_HOST`  |
|---------|------------------|
| [Amazon ECS en EC2][7] | Evaluar el endpoint de metadatos de Amazon EC2 |
| [Amazon ECS en Fargate][8] | No configures `DD_AGENT_HOST` |
| [AWS EKS en Fargate][9] | No configures `DD_AGENT_HOST` |
| [AWS Elastic Beanstalk - Contenedor único][10] | IP de la puerta de enlace (normalmente `172.17.0.1`) |
| [AWS Elastic Beanstalk - Contenedores múltiples][11] | Enlace que apunta al nombre de contenedor del Datadog Agent |
| [Kubernetes][12] | 1) [Unix Domain Socket][13], 2) [`status.hostIP`][14] añadido manualmente, o 3) a través del [Controlador de admisión (Admission Controller)][15]. Si utilizas TCP, comprueba las [políticas de red][21] aplicadas en tu contenedor |
| [AWS EKS (no Fargate)][16] | 1) [Unix Domain Socket][13], 2) [`status.hostIP`][14] añadido manualmente, o 3) a través del [Controlador de admisión (Admission Controller)][15] |
| [Datadog Agent y contenedores de aplicación de Docker][17] | Contenedor del Datadog Agent |


**Nota sobre servidores web**: Si la sección `agent_url` en los [logs de inicio del rastreador][1] no coinciden con la variable de entorno `DD_AGENT_HOST` enviada, revisa cómo se envían en cascada las variables de entorno para ese servidor específico. Por ejemplo, en PHP, hay un ajuste adicional para asegurar que [Apache][18] o [Nginx][19] recogen la variable de entorno `DD_AGENT_HOST` correctamente.

Si tu biblioteca de rastreo está enviando trazas correctamente según tu configuración, entonces procede al siguiente paso.

#### Revisa el estado y configuración de tu Datadog Agent

Si tu instalación no está en Fargate, puedes ingresar `exec` en el contenedor del Datadog Agent y ejecutar el comando de estado del Agent: `agent status`

**Nota**: Si utilizas Kubernetes con contenedores dedicados, ingresa `exec` en el contenedor dedicado del Trace Agent.

Busca la sección del Agent de APM para confirmar si está funcionando:

```text
=========
APM Agent
=========
  Status: Running
  Pid: <pid number>
  Uptime: <integer> seconds
  Mem alloc: <integer> bytes
  Hostname: <name of datadog agent container>
  Receiver: 0.0.0.0:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    No traces received in the previous minute.
    Default priority sampling rate: 100.0%
```

Si la configuración es correcta, pero sigues viendo errores de conexión, [ponte en contacto con el soporte de Datadog][4] con:
- Información sobre el entorno en el que vas a desplegar la aplicación y el Datadog Agent.
- Si utilizas proxies, información sobre cómo se han configurado.
- Cualquier archivo de configuración utilizado para configurar la aplicación y el Datadog Agent.
- Logs de inicio o depuración del rastreador en los que se describe el error de conexión.
- Un [flare][5] del Datadog Agent. Para contenedores dedicados, envía el flare desde el [contenedor dedicado del Trace Agent][20].


[1]: /es/tracing/troubleshooting/tracer_startup_logs/
[2]: /es/tracing/troubleshooting/tracer_debug_logs/
[3]: /es/agent/configuration/agent-commands/#agent-information
[4]: /es/help/
[5]: /es/agent/troubleshooting/send_a_flare/
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /es/agent/amazon_ecs/apm/?tab=ec2metadataendpoint
[8]: /es/integrations/ecs_fargate/#trace-collection
[9]: /es/integrations/eks_fargate/#traces-collection
[10]: /es/integrations/amazon_elasticbeanstalk/?tab=singlecontainer#trace-collection
[11]: /es/integrations/amazon_elasticbeanstalk/?tab=multiplecontainers#trace-collection
[12]: /es/agent/kubernetes/apm/
[13]: /es/containers/kubernetes/apm/?tabs=daemonsetuds#configure-the-datadog-agent-to-accept-traces
[14]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[15]: /es/agent/cluster_agent/admission_controller/
[16]: /es/integrations/amazon_eks/#setup
[17]: /es/agent/docker/apm/#tracing-from-other-containers
[18]: /es/tracing/trace_collection/dd_libraries/php/?tab=containers#apache
[19]: /es/tracing/trace_collection/dd_libraries/php/?tab=containers#nginx
[20]: /es/agent/troubleshooting/send_a_flare/?tab=agentv6v7#trace-agent
[21]: https://kubernetes.io/docs/concepts/services-networking/network-policies/
