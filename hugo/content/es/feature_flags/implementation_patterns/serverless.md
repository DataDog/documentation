---
description: Utilice los SDK de servidor de Feature Flags de Datadog en entornos serverless
  con o sin un Datadog Agent.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK de servidor
- link: /remote_configuration/
  tag: Documentación
  text: Remote Configuration
- link: /serverless/
  tag: Documentación
  text: Serverless Monitoring
title: Entornos serverless
---
## Descripción general {#overview}

Los SDK de Java, Node.js y Python de Feature Flags de Datadog pueden recibir la configuración de flags directamente desde la CDN administrada por Datadog. Esta fuente de configuración _sin agente_ simplifica la incorporación porque no requiere un Datadog Agent para la configuración de flags. También es compatible con aplicaciones serverless que no pueden conectarse a un Datadog Agent.

Después de cargar la configuración, la evaluación de flags ocurre localmente en la aplicación. El SDK no realiza una solicitud de red para cada evaluación.

La siguiente tabla muestra la funcionalidad de Feature Flags disponible en cada versión del SDK:

| SDK | Versión mínima | Configuración agentless y evaluación local | Eventos de exposición a experimentos | Eventos de evaluación de flags de Event Platform Proxy (EVP) | Entrega de eventos |
|---|---|---|---|---|---|
| Java `dd-openfeature` y `dd-java-agent` | 1.66.0 | Soportado | Soportado | Soportado | Prefiera un relay de telemetría local compatible; utilice fallback directo cuando no esté disponible |
| Node.js `dd-trace` | 6.12.0 | Soportado | Soportado | No soportado | Prefiera un relay de telemetría local compatible; utilice fallback directo cuando no esté disponible |
| Python `ddtrace` | 4.14.0 | Soportado | Soportado | Soportado | Relay de telemetría local compatible |

La entrega por CDN para Java requiere `dd-openfeature` y `dd-java-agent`. El entorno de ejecución de Java debe admitir la carga de `dd-java-agent` con la opción de JVM `-javaagent`. Puede pasar esta opción en el comando de Java o a través de `JAVA_TOOL_OPTIONS`.

Las versiones listadas proporcionan las capacidades mostradas en la tabla. Otros SDK de servidor utilizan Agent Remote Configuration para la entrega de flags.

La entrega agentless solo cambia la fuente de configuración de flags. Los eventos de Feature Flags utilizan una conexión separada a un relay de telemetría local compatible o a la ruta directa soportada.

## Arquitectura agentless {#agentless-architecture}

Utilice la entrega sin agente cuando el entorno de ejecución serverless pueda realizar solicitudes HTTPS salientes a Datadog. Para Java, el entorno de ejecución también debe permitirle establecer la opción de JVM `-javaagent`:

1. Utilice una [versión de SDK compatible](#overview).
2. Para Java, cargue `dd-java-agent` con `-javaagent` o `JAVA_TOOL_OPTIONS`. Consulte la configuración de Java para [Cloud Run Functions][7] o [Cloud Run containers][8] para ver ejemplos.
3. Configure la clave de API, el sitio de Datadog y el entorno en la aplicación serverless:

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. Inicialice o acceda al proveedor de OpenFeature de Datadog como se describe en la configuración de [Java][6], [Node.js][3] o [Python][9]. Esto inicia el sondeo de CDN. No se requiere la habilitación de Feature Flags ni la configuración de la fuente.
5. Almacene `DD_API_KEY` en el administrador de secretos de la plataforma serverless y expóngalo solo al proceso de la aplicación.

El SDK consulta la CDN administrada por Datadog cada 30 segundos de forma predeterminada y utiliza ETags para la configuración sin cambios. Conserva la última configuración aceptada durante errores temporales. Si no se ha aceptado ninguna configuración, las evaluaciones de OpenFeature devuelven el valor predeterminado proporcionado por el llamador.

La instalación e inicialización del trazador por sí solas no inician el sondeo de la CDN. Las solicitudes a la CDN contribuyen a la facturación de Feature Flags del servidor solo después de que el código de la aplicación activa el proveedor.

El modo agentless elimina la dependencia del Datadog Agent para la _configuración de flags_. No elimina los requisitos del trazador específicos del lenguaje. Tampoco configura ni habilita APM ni la telemetría serverless. Puede usar la Datadog Lambda Extension, `serverless-init`, un sidecar del Agent u otra ruta de telemetría compatible de forma independiente.

## Enviar telemetría de Feature Flags {#send-feature-flag-telemetry}

`serverless-init` es un relay de telemetría local compatible. No es una fuente de configuración de Feature Flags. Mantenga la fuente `agentless` predeterminada para cargar la configuración desde la CDN.

No utilice `serverless-init` como reemplazo del Datadog Agent cuando seleccione `remote_config`. Agent Remote Configuration requiere un Datadog Agent.

El fallback directo significa que el SDK envía eventos EVP autenticados a Datadog cuando no puede utilizar un relay local compatible.

Tenga en cuenta el siguiente comportamiento:

- Los eventos de exposición a experimentos se emiten solo para flags asociados con un experimento.
- Java y Python agregan eventos de evaluación de flags EVP y los envían de forma predeterminada.
- Para deshabilitar solo la ruta de eventos de evaluación de flags EVP, configure `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false`.

La métrica `feature_flag.evaluations` es una señal de OpenTelemetry (OTLP) independiente. La conexión `serverless-init` estándar en el puerto 8126 no configura el punto de conexión OTLP para esta métrica. Para entornos serverless sin agente, configure la ruta de telemetría serverless para su plataforma antes de habilitar esta métrica. Consulte [Configure las métricas de evaluación de flags del lado del servidor][10].

### Configure serverless-init {#configure-serverless-init}

1. Complete la configuración de [Serverless Monitoring][11] para su plataforma. Esas instrucciones proporcionan las configuraciones admitidas en contenedor y sidecar, las variables de entorno requeridas y los ajustes de red.

1. Aplique estos requisitos de Feature Flags:
   - Utilice `serverless-init` 1.9.13 o posterior. Las versiones anteriores no admiten la ruta EVP requerida.
   - Mantenga `DD_API_KEY` y `DD_SITE` en el entorno de la aplicación para la entrega de configuración de CDN Agentless. Un sidecar también los necesita para la salida de telemetría.
   - No configure un punto de conexión específico para Feature Flags. El SDK utiliza la conexión de tracer estándar configurada por la configuración de Serverless Monitoring.
   - Node.js y Java llaman a `GET /info` en la URL del tracer para descubrir el proxy EVP local. Python envía los eventos EVP admitidos a la misma URL sin esta solicitud de descubrimiento.

### Verifique la salida de telemetría {#verify-telemetry-egress}

1. Inicialice el proveedor de OpenFeature y confirme que alcance un estado listo.
2. Evalúe un flag asociado con un experimento, luego confirme que el experimento reciba un evento de exposición.
3. Cuando utilice un relay local, verifique los registros de la aplicación y de `serverless-init` en busca de errores de conexión al puerto 8126.
4. Para Java y Python, confirme que `DD_FLAGGING_EVALUATION_COUNTS_ENABLED` no esté configurado en `false` cuando necesite eventos de evaluación de flags EVP.
5. Si utiliza la métrica `feature_flag.evaluations`, valide su ruta OTLP independiente con [Configurar métricas de evaluación de flags del lado del servidor][10].

## Agent-backed Remote Configuration {#agent-backed-remote-configuration}

Establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` para usar explícitamente la Agent Remote Configuration existente:

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Para Java, utilice versiones compatibles de `dd-openfeature` y `dd-java-agent`. Utilice la versión 1.66.0 o posterior para ambos componentes.

Configure el Agent con Remote Configuration y la clave de API:

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

La carga de trabajo sin servidor debe poder comunicarse con el Agent en una red privada, y el Agent debe poder comunicarse con Datadog a través de HTTPS. No exponga públicamente la ingesta de trazas del Agent.

Seleccionar explícitamente `remote_config` habilita la suscripción a Remote Configuration de Feature Flags, incluso si el código de la aplicación no inicializa el proveedor. Estas solicitudes contribuyen a la facturación de Feature Flags del servidor.

## Consideraciones operativas {#operational-considerations}

- **Arranques en frío**: La inicialización del proveedor de bloqueo espera la primera configuración y puede agregar latencia de arranque en frío. Inicialice de forma asíncrona si es aceptable proporcionar valores predeterminados por parte del llamador durante el inicio.
- **Conectividad saliente**: La entrega agentless requiere acceso HTTPS saliente al servicio de configuración de flags administrado por Datadog.
- **Propiedad de la clave de API**: En el modo Agentless, la aplicación posee `DD_API_KEY` para la configuración. Un sidecar `serverless-init` también necesita la clave de API para la salida de telemetría. En el modo `remote_config`, el Agent es propietario de la clave de API.
- **Actualizaciones de flags**: La entrega es eventualmente consistente. Tenga en cuenta el intervalo de sondeo del SDK y el tiempo de inicio de la aplicación al probar cambios.
- **Comportamiento del último estado correcto conocido**: Después de que se ha aceptado una configuración, las fallas temporales de red o las respuestas mal formadas no la reemplazan.
- **Soporte de tiempo de ejecución**: Java requiere Java 11 o posterior. Para Node.js y Python, verifique los requisitos de compatibilidad de tiempo de ejecución del trazador.
- **Kill switch**: `DD_FEATURE_FLAGS_ENABLED` tiene como valor predeterminado `true`. Establézcalo en `false` para deshabilitar el proveedor y ambas rutas de entrega de configuración. Las evaluaciones devuelven entonces los valores predeterminados proporcionados por el llamador.

La entrega sin agente administrada por Datadog no está disponible para Datadog for Government en estas versiones. Utilice Remote Configuration del agente en ese sitio.

Si su implementación utiliza `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`, consulte [Migrar desde la configuración del proveedor heredado][5].

## Notas del entorno {#environment-notes}

### AWS Lambda {#aws-lambda}

Las funciones Lambda de Java, Node.js y Python pueden utilizar la entrega de configuración sin agente cuando ejecutan una versión mínima del SDK y pueden acceder a Datadog a través de HTTPS. Las funciones de Java deben cargar `dd-java-agent` con `-javaagent`, ya sea directamente o a través de `JAVA_TOOL_OPTIONS`. Una capa de trazador de Java puede proporcionar esta configuración. La Datadog Lambda Extension no es necesaria para la configuración de flags.

### Entornos serverless de Google Cloud {#google-cloud-serverless-environments}

Las cargas de trabajo de Java pueden usar la entrega de configuración sin agente en Java 11 o posterior cuando el runtime puede cargar `dd-java-agent`. La configuración de Java para [Cloud Run Functions][7] y [Cloud Run containers][8] utiliza `JAVA_TOOL_OPTIONS` para establecer `-javaagent`. Las cargas de trabajo de Node.js y Python requieren un runtime de trazador compatible. Todos los runtimes requieren acceso HTTPS saliente.

### Azure Functions {#azure-functions}

Las aplicaciones de funciones de Java pueden usar la entrega de configuración sin agente en Java 11 o posterior cuando el runtime puede cargar `dd-java-agent`. Las aplicaciones de funciones de Node.js y Python requieren un runtime de trazador compatible. Todos los runtimes requieren acceso HTTPS saliente. Un Datadog Agent externo solo es necesario cuando se selecciona `remote_config`.

### Edge runtimes {#edge-runtimes}

Algunos Edge runtimes no admiten las API del trazador de Node.js de Datadog requeridas por el proveedor de Feature Flags. Verifique la compatibilidad del trazador para la plataforma de destino antes de depender de la entrega de configuración sin agente.

## API pública y evaluación local {#public-api-and-local-evaluation}

La [Feature Flags API][4] pública está diseñada para administrar flags y entornos. No es una API de evaluación de flags por solicitud para aplicaciones del lado del servidor.

No consulte las API de Datadog desde cada invocación serverless para evaluar flags. Utilice el SDK del servidor, que carga periódicamente la configuración de flags y evalúa localmente.

## Valide su configuración {#validate-your-setup}

Antes de habilitar Feature Flags en producción:

1. Confirme que la aplicación utilice una [versión mínima de SDK compatible](#overview). Para Java, confirme que la JVM cargue `dd-java-agent`.
2. Para la entrega sin agente, confirme que la aplicación tenga `DD_API_KEY`, `DD_SITE` y `DD_ENV`. Para Remote Configuration del Agent, confirme que el Agent tenga su clave de API y Remote Configuration habilitados.
3. Inicialice el proveedor de OpenFeature y verifique que alcance un estado listo.
4. Cambie un flag que no sea de producción en Datadog y confirme que la carga de trabajo reciba el valor actualizado después del intervalo de sondeo.
5. Confirme que su aplicación maneje los valores predeterminados proporcionados por el llamador si la configuración no está disponible durante un arranque en frío.
6. Para la telemetría, configure un relay compatible y verifique cada señal requerida. Utilice la configuración OTLP independiente para `feature_flag.evaluations`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration/
[2]: /es/feature_flags/server/
[3]: /es/feature_flags/server/nodejs/
[4]: /es/api/latest/feature-flags/
[5]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[6]: /es/feature_flags/server/java/
[7]: /es/serverless/google_cloud_run/functions/java/?tab=maven
[8]: /es/serverless/google_cloud_run/containers/in_container/java/
[9]: /es/feature_flags/server/python/
[10]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[11]: /es/serverless/