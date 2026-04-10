<!--
Installation steps for Java profiler (steps 2-3 and closing).
Parent page provides shared step 1 (Agent) and declares: prog_lang, runtime filters.
-->

<!-- JVM -->
{% if equals($runtime, "jvm") %}

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

   {% tabs %}

   {% tab label="Wget" %}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="cURL" %}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="Dockerfile" %}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {% /tab %}

   {% /tabs %}

3. Enable the profiler and specify your service, environment, and version:

   {% tabs %}

   {% tab label="Command arguments" %}
   ```shell
   java \
       -javaagent:dd-java-agent.jar \
       -Ddd.service=<YOUR_SERVICE> \
       -Ddd.env=<YOUR_ENVIRONMENT> \
       -Ddd.version=<YOUR_VERSION> \
       -Ddd.profiling.enabled=true \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_SERVICE=<YOUR_SERVICE>
   export DD_ENV=<YOUR_ENV>
   export DD_VERSION=<YOUR_VERSION>
   export DD_PROFILING_ENABLED=true
   java \
       -javaagent:dd-java-agent.jar \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% /tabs %}

   {% alert %}
   The `-javaagent` argument needs to be before `-jar`. This adds it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][1].
   {% /alert %}

4. Optional: Set up [Source Code Integration][2] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][3].

For more information on available profile types, see [Profile Types][4].

{% alert %}
For GraalVM native-image applications, switch the **Runtime** filter above to **GraalVM Native Image**.
{% /alert %}

{% /if %}

<!-- GraalVM Native Image -->
{% if equals($runtime, "graalvm_native_image") %}

2. Follow the [Tracer Setup Instructions][5] to build your GraalVM native image with the Datadog Java Profiler instrumentation.

3. Run with profiling enabled:

   ```shell
   export DD_SERVICE=<YOUR_SERVICE>
   export DD_ENV=<YOUR_ENV>
   export DD_VERSION=<YOUR_VERSION>
   export DD_PROFILING_ENABLED=true
   export DD_PROFILING_DIRECTALLOCATION_ENABLED=true
   ./my_service
   ```

4. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][3].

## Limitations

- Only JFR-based profiling is supported for GraalVM native-image applications.
- Wallclock and live heap profiling are not available.

{% /if %}

[1]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[2]: /integrations/guide/source-code-integration/?tab=java
[3]: https://app.datadoghq.com/profiling
[4]: /profiler/profile_types/?tab=java
[5]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
