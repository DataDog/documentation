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
title: Instrumentación de un trabajo de Java Cloud Run
type: multi-code-lang
---

## Configuración

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/java">disponible en GitHub</a>.</div>
<div class="alert alert-info">
Para obtener visibilidad y acceso completos a todas las funciones de Datadog en Cloud Run Jobs,
asegúrate de haber <a href="http://localhost:1313/integrations/google_cloud_platform/">instalado la integración de Google Cloud</a>
y utiliza <a href="https://hub.docker.com/r/datadog/serverless-init">la versión 1.9.0 o posterior de serverless-init</a>.
</div>

1. **Instala el rastreador de Java Datadog**.

   1. Añade el rastreador de Datadog Java a tu archivo Docker:

      {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
ADD 'https://dtdg.co/latest-java-tracer' agent.jar
ENV JAVA_TOOL_OPTIONS="-javaagent:agent.jar"
{{< /code-block >}}

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

      Consulta las [versiones de dd-trace-java][1] para obtener la última versión del rastreador.

   **Nota**: Los Cloud Run Jobs se ejecutan hasta su finalización en lugar de servir peticiones, por lo que la instrumentación automática no creará un nivel superior "job (generic)" span (tramo). Para obtener visibilidad de extremo a extremo, cree su propia raíz span (tramo). Consulte las instrucciones de [Java Custom Instrumentation][2].

   Para más información, consulta [Rastreo de aplicaciones Java][2].

2. **Instalar serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"./mvnw\", \"spring-boot:run\"" cloudservice="jobs" %}}

3. **Configurar logs**.

   Para activar el registro, configura la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite a `serverless-init` leer logs de stdout y stderr.

   Datadog también recomienda configurar la variable de entorno `DD_LOGS_INJECTION=true` y `DD_SOURCE=java` para activar el parseo avanzado de logs de Datadog.

   Si deseas que los logs de varias líneas se conserven en un único mensaje de logs, Datadog te recomienda escribir tus logs en formato JSON *compacto*. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="Console"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   Para obtener más información, consulta [Correlación de logs y trazas de Java][4].

4. **Configurar tu aplicación**.

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente DogStatsD][5] y [consulta ejemplos de código][6]. En serverless, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-in-container language="java" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/tracing/trace_collection/custom_instrumentation/java/dd-api#adding-spans
[3]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[5]: /es/extend/dogstatsd/?tab=java#install-the-dogstatsd-client
[6]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5