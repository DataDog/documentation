---
aliases:
- /es/tracing/java
- /es/tracing/languages/java
- /es/agent/apm/java/
- /es/tracing/setup/java
- /es/tracing/setup_overview/java
- /es/tracing/setup_overview/setup/java
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centro de aprendizaje
  text: Configure y administre el SDK de APM para sus aplicaciones
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: Blog
  text: Instrumente y haga un seguimiento de flujos de integración de Boomi con OpenTelemetry
    y Datadog
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente de Datadog Java APM
title: Rastreo de aplicaciones Java
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

El Java Tracer más reciente es compatible con todas las JVM de la versión 8 en adelante. Para obtener información adicional sobre versiones de JVM inferiores a 8, lea [Runtimes de JVM compatibles][10].

Para obtener una lista completa de la compatibilidad de versiones y frameworks de Java de Datadog (incluidas las versiones heredadas y de mantenimiento), lea [Requisitos de compatibilidad][1].

## Primeros pasos {#getting-started}

<div class="alert alert-tip">Datadog recomienda <a href="/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> (SSI), que instala el SDK de Java y gestiona su versión desde la configuración de su Datadog Agent, sin realizar cambios en el código de su aplicación. Utilice la configuración manual en esta página si <a href="/tracing/trace_collection/single-step-apm/compatibility/">SSI no es compatible con su entorno</a> o si necesita gestionar el SDK en el código de su aplicación.</div>

Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][18].

### Instrumente su aplicación {#instrument-your-application}

Después de instalar y configurar su Datadog Agent, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lea más sobre la [información de compatibilidad][1].

Para comenzar a rastrear sus aplicaciones:

1. Descargue `dd-java-agent.jar`, que contiene los archivos de clase más recientes del tracer, en una carpeta a la que pueda acceder su usuario de Datadog:

{{< tabs >}}
{{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Nota:** Para descargar la compilación más reciente de una **versión principal** específica, utilice el enlace `https://dtdg.co/java-tracer-vX` en su lugar, donde `X` es la versión principal deseada.
   Por ejemplo, utilice `https://dtdg.co/java-tracer-v1` para la compilación más reciente de la versión 1. No se deben incluir los números de versión menor. Alternativamente, consulte el [repositorio de Maven][3] de Datadog para cualquier versión específica.

   **Nota**: Las versiones candidatas a lanzamiento (Release Candidate) están disponibles en [DataDog/dd-trace-java releases][21] de GitHub. Estas tienen "RC" en la versión y se recomiendan para realizar pruebas fuera de su entorno de producción. Puede [suscribirse a las notificaciones de versiones de GitHub][20] para recibir información cuando haya nuevas versiones candidatas (Release Candidates) disponibles para pruebas. Si experimenta algún problema con las versiones candidatas (Release Candidates), comuníquese con el [soporte de Datadog][22].

2. Para ejecutar su aplicación desde un IDE, un script de aplicación de Maven o Gradle, o un comando `java -jar`, con el Continuous Profiler, el seguimiento de despliegue y la inyección de registros (si está enviando registros a Datadog), agregue el argumento de JVM `-javaagent` y las siguientes opciones de configuración, según corresponda:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **Note**: If you have a strong need to reduce the size of your image and omit modules, you can use the [`jdeps`][19] command to identify dependencies. However, required modules can change over time, so do this at your own risk.

    **Note**: When running the SDK with Java 24+, you may see warnings related to JNI native access. Suppress these warnings by adding the `--enable-native-access=ALL-UNNAMED` flag. See [JEP 472][23] for more details.

    <div class="alert alert-warning">Habilitar la generación de perfiles puede afectar su factura según su paquete de APM. Consulte la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">página de precios</a> para obtener más información.</div>

| Variable de entorno      | Propiedad del sistema                     | Descripción|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | El entorno de su aplicación (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Habilite la inyección automática de claves MDC para los ID de traza y de tramo de Datadog. Consulte [Uso avanzado][6] para obtener más detalles. <br><br>A partir de la versión 1.18.3, si [Agent Remote Configuration][16] está habilitada donde se ejecuta este servicio, puede establecer `DD_LOGS_INJECTION` en la interfaz de usuario de [Catalog][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Habilite el [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | El nombre de un conjunto de procesos que realizan el mismo trabajo. Se utiliza para agrupar estadísticas de su aplicación. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Establezca una tasa de muestreo en la raíz de la traza para todos los servicios. <br><br> A partir de la versión 1.18.3, si [Agent Remote Configuration][16] está habilitada donde se ejecuta este servicio, puede establecer `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario de [Catalog][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Establezca una tasa de muestreo en la raíz de la traza para los servicios que coincidan con la regla especificada.    |
| `DD_VERSION` | `dd.version` |  La versión de su aplicación (por ejemplo, `2.5`, `202003181415` o `1.3-alpha`) |

A continuación se describen [opciones de configuración](#configuration) adicionales.


### Agregue el SDK de Java a la JVM {#add-the-java-sdk-to-the-jvm}

Utilice la documentación de su servidor de aplicaciones para determinar la forma correcta de pasar `-javaagent` y otros argumentos de la JVM. Aquí hay instrucciones para algunos frameworks de uso común:

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si su aplicación se llama `my_app.jar`, cree un `my_app.conf`, que contenga:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Para obtener más información, consulte la [documentación de Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux {#linux}

Para habilitar el rastreo al ejecutar Tomcat en Linux:

1. Abra su archivo de script de inicio de Tomcat, por ejemplo `setenv.sh`.
2. Agregue lo siguiente a `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat como servicio de Windows) {#windows-tomcat-as-a-windows-service}

Para habilitar el rastreo al ejecutar Tomcat como servicio de Windows:

1. Abra la utilidad de mantenimiento "tomcat@VERSION_MAJOR@w.exe" ubicada en el directorio `./bin` de la carpeta del proyecto Tomcat.
2. Vaya a la pestaña {{< ui >}}Java{{< /ui >}} y agregue lo siguiente a `Java Options`:

```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Reinicie sus servicios de Tomcat para que los cambios surtan efecto.

{{% /tab %}}
{{% tab "JBoss" %}}

- En modo standalone:

  Agregue la siguiente línea al final de `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En modo standalone y en Windows, agregue la siguiente línea al final de `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En modo de dominio:

  Agregue la siguiente línea en el archivo `domain.xml`, debajo de la etiqueta server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Para obtener más detalles, consulte la [documentación de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si utiliza `jetty.sh` para iniciar Jetty como servicio, edítelo para agregar:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si utiliza `start.ini` para iniciar Jetty, agregue la siguiente línea (debajo de `--exec`, o agregue la línea `--exec` si aún no está allí):

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

En la consola administrativa:

1. Seleccione {{< ui >}}Servers{{< /ui >}}. En {{< ui >}}Server Type{{< /ui >}}, seleccione {{< ui >}}WebSphere application servers{{< /ui >}} y seleccione su servidor.
2. Seleccione {{< ui >}}Java and Process Management{{< /ui >}} > {{< ui >}}Process Definition{{< /ui >}}.
3. En la sección {{< ui >}}Additional Properties{{< /ui >}}, haga clic en {{< ui >}}Java Virtual Machine{{< /ui >}}.
4. En el campo de texto {{< ui >}}Generic JVM arguments{{< /ui >}}, ingrese:

```text
-javaagent:/path/to/dd-java-agent.jar
```

Para obtener detalles y opciones adicionales, consulte la [documentación de WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Nota**

- Si está agregando el argumento `-javaagent` a su comando `java -jar`, debe agregarse _antes_ del argumento `-jar`, como una opción de JVM, no como un argumento de la aplicación. Por ejemplo:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- Nunca agregue `dd-java-agent` a su classpath. Puede causar un comportamiento inesperado.

## Instrumentación automática {#automatic-instrumentation}

La instrumentación automática para Java utiliza las capacidades de instrumentación `java-agent` [proporcionadas por la JVM][8]. Cuando se registra un `java-agent`, puede modificar archivos de clase en el momento de la carga.

**Nota:** Las clases cargadas con un ClassLoader remoto no se instrumentan automáticamente.

La instrumentación puede provenir de la instrumentación automática, la API de OpenTracing o una mezcla de ambas. La instrumentación generalmente captura la siguiente información:

- La duración se captura utilizando el reloj NanoTime de la JVM, a menos que se proporcione una marca de tiempo desde la API de OpenTracing
- Pares clave-valor de etiquetas
- Errores y trazas de pila que la aplicación no controla
- Un conteo total de trazas (solicitudes) que fluyen a través del sistema

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][9] para obtener detalles.

### Remote Configuration {#remote-configuration}

Remote Configuration permite que el Datadog Agent configure dinámicamente los ajustes de rastreo sin requerir reinicios de la aplicación. De forma predeterminada, Remote Configuration está habilitada. Para deshabilitarla, establezca la variable de entorno:

```
DD_REMOTE_CONFIG_ENABLED=false
```

O agregue la propiedad del sistema JVM:

```
-Ddd.remote_config.enabled=false
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /es/account_management/billing/apm_tracing_profiler/
[5]: /es/profiler/
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /es/tracing/trace_collection/library_config/java/
[10]: /es/tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /es/tracing/trace_collection/library_injection_local/
[16]: /es/tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/es/getting_started/support/
[23]: https://openjdk.org/jeps/472