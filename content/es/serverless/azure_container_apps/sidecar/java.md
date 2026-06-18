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
title: Instrumentación de una aplicación en contenedor de Java con auxiliar
type: multi-code-lang
---

## Instalación

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

   3. Añade la anotación `@Trace` a cualquier método que desees rastrear.

   Para más información, consulta [Rastreo de aplicaciones Java][2].

2. **Instalar serverless-init como auxiliar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configurar logs**.

   En el paso anterior, creaste un volumen compartido. En este paso, configura tu biblioteca de registro para que escriba los logs en el archivo establecido en `DD_SERVERLESS_LOG_PATH`. En Java, recomendamos escribir los logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
    <File name="FileAppender" fileName="/LogFiles/app.log">
      <JsonLayout compact="true" eventEol="true" properties="true"/>
    </File>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="FileAppender"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   Datadog recomienda configurar las variables de entorno `DD_LOGS_INJECTION=true` (en el contenedor principal) y `DD_SOURCE=java` (en el contenedor secundario) para permitir el análisis avanzado de logs de Datadog.

   Para obtener más información, consulta [Correlación de logs y trazas de Java][3].

4. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente de DogStatsD][4] y [visualiza ejemplos de código][5]. En serverless, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-sidecar language="java" defaultSource="containerapp" %}}

{{% svl-tracing-env %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /es/extend/dogstatsd/?tab=java#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5