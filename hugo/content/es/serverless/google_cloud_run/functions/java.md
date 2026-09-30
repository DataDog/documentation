---
code_lang: java
code_lang_weight: 40
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: Documentación
  text: Rastreo de aplicaciones Java
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentación
  text: Correlación de logs y trazas de Java
title: Instrumentación de una función de ejecución de Java Cloud
type: multi-code-lang
---

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/java">disponible en GitHub</a>.</div>

## Configuración

1. **Instalar el rastreador de Java de Datadog**.

   1. Descarga el rastreador de Java de Datadog y asegúrate de que se despliegue con tu función:

      {{< code-block lang="bash" disable_copy="false" >}}
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

      Añade la variable de entorno `JAVA_TOOL_OPTIONS: -javaagent:/path/to/dd-java-agent.jar` a tu aplicación.

   2. Añade los artefactos del rastreador.
      {{< tabs >}}
      {{% tab "Maven" %}}
{{< code-block lang="xml" disable_copy="false" >}}
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>DD_TRACE_JAVA_VERSION_HERE</version>
</dependency>
{{< /code-block >}}
      {{% /tab %}}

      {{% tab "Gradle" %}}
{{< code-block lang="groovy" disable_copy="false" >}}
implementation 'com.datadoghq:dd-trace-api:DD_TRACE_JAVA_VERSION_HERE'
{{< /code-block >}}
      {{% /tab %}}
      {{< /tabs >}}

      Consulta [versiones de dd-trace-java][1] para obtener la última versión del rastreador.

   3. Añade la anotación `@Trace` a todos los métodos que desees rastrear.

   Para obtener más información, consulta [Rastreo de aplicaciones Java][2].

2. **Instalar serverless-init como sidecar**.

   {{< tabs >}}

   {{% tab "CLI de Datadog" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Otros" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configurar logs**.

   En el step (UI) / paso (generic) anterior, creaste un volumen compartido. Es posible que también hayas configurado la variable de entorno `DD_SERVERLESS_LOG_PATH`, que en forma predeterminada es `/shared-volume/logs/app.log`.

   En este step (UI) / paso (generic), configura tu biblioteca de logging para escribir logs en el archivo configurado en `DD_SERVERLESS_LOG_PATH`. En Java, Datadog recomienda escribir logs en el formato JSON. Por ejemplo, puedes utilizar una biblioteca de logging de terceros como `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
    <File name="FileAppender" fileName="/shared-volume/logs/app.log">
      <JsonLayout compact="true" eventEol="true" properties="true"/>
    </File>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="FileAppender"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   Datadog recomienda configurar las variables de entorno `DD_LOGS_INJECTION=true` (en el contenedor principal) y `DD_SOURCE=java` (en el contenedor secundario) para permitir el análisis avanzado de logs de Datadog.

   Para obtener más información, consulta [Correlación de logs y traces (trazas) de Java][3].

4. {{% gcr-service-label %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente DogStatsD ][4] y [mira ejemplos de código][5]. En Serverless Monitoring, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-sidecar language="java" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /es/extend/dogstatsd/?tab=java#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5