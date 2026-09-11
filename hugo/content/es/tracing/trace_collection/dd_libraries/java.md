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
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente de Datadog Java APM
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: Centro de Aprendizaje
  text: Configura APM para aplicaciones Java
title: Rastreo de aplicaciones Java
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

El último Tracer de Java soporta todas las versiones de JVM 8 y superiores. Para información adicional sobre versiones de JVM anteriores a 8, lee [Runtimes de JVM soportados][10].

Para una lista completa del soporte de versiones y frameworks de Java de Datadog (incluyendo versiones heredadas y de mantenimiento), lee [Requisitos de Compatibilidad][1].

## Comenzando {#getting-started}

Antes de comenzar, asegúrate de haber [instalado y configurado el Datadog Agent][18].

### Instrumenta tu aplicación {#instrument-your-application}

Después de instalar y configurar tu Datadog Agent, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lee más sobre [información de compatibilidad][1].

Para comenzar a rastrear tus aplicaciones:

1. Descarga `dd-java-agent.jar` que contiene los últimos archivos de clase del tracer, a una carpeta que sea accesible por tu usuario de Datadog:

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

   **Nota:** Para descargar la última compilación de una versión **mayor** específica, utiliza el enlace `https://dtdg.co/java-tracer-vX` en su lugar, donde `X` es la versión mayor deseada.
   Por ejemplo, utiliza `https://dtdg.co/java-tracer-v1` para la última compilación de la versión 1. Los números de versión menor no deben incluirse. Alternativamente, consulta el [repositorio de Maven de Datadog][3] para cualquier versión específica.

   **Nota**: Las versiones de Release Candidate están disponibles en [DataDog/dd-trace-java releases][21] en GitHub. Estas tienen "RC" en la versión y se recomiendan para pruebas fuera de tu entorno de producción. Puedes [suscribirte a las notificaciones de lanzamientos de GitHub][20] para ser informado cuando nuevas Release Candidates estén disponibles para pruebas. Si experimentas algún problema con las Release Candidates, contacta a [soporte de Datadog][22].

2. Para ejecutar tu aplicación desde un IDE, script de aplicación de Maven o Gradle, o `java -jar` comando, con el Continuous Profiler, seguimiento de despliegue e inyección de registros (si estás enviando registros a Datadog), añade el `-javaagent` argumento JVM y las siguientes opciones de configuración, según corresponda:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **Note**: If you have a strong need to reduce the size of your image and omit modules, you can use the [`jdeps`][19] command to identify dependencies. However, required modules can change over time, so do this at your own risk.

    **Note**: When running the SDK with Java 24+, you may see warnings related to JNI native access. Suppress these warnings by adding the `--enable-native-access=ALL-UNNAMED` flag. See [JEP 472][23] for more details.

    <div class="alert alert-warning">Habilitar el perfilado puede afectar tu factura dependiendo de tu paquete APM. Consulta la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">página de precios</a> para más información.</div>

| Variable de Entorno      | Propiedad del Sistema                     | Descripción|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | El entorno de tu aplicación (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Habilitar la inyección automática de claves MDC para los IDs de traza y tramo de Datadog. Consulta [Uso Avanzado][6] para más detalles. <br><br>A partir de la versión 1.18.3, si [Agent Remote Configuration][16] está habilitado donde se ejecuta este servicio, puedes establecer `DD_LOGS_INJECTION` en la interfaz de usuario del [Software Catalog][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Habilita el [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | El nombre de un conjunto de procesos que realizan la misma tarea. Se utiliza para agrupar estadísticas de tu aplicación. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Establece una tasa de muestreo en la raíz de la traza para todos los servicios. <br><br> A partir de la versión 1.18.3, si [Agent Remote Configuration][16] está habilitado donde se ejecuta este servicio, puedes establecer `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario del [Software Catalog][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Establece una tasa de muestreo en la raíz de la traza para los servicios que coincidan con la regla especificada.    |
| `DD_VERSION` | `dd.version` |  La versión de tu aplicación (por ejemplo, `2.5`, `202003181415` o `1.3-alpha`) |

Opciones de [configuración](#configuration) adicionales se describen a continuación.


### Agrega el SDK de Java a la JVM {#add-the-java-sdk-to-the-jvm}

Utiliza la documentación de tu servidor de aplicaciones para determinar la forma correcta de pasar `-javaagent` y otros argumentos de la JVM. Aquí hay instrucciones para algunos marcos comúnmente utilizados:

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si tu aplicación se llama `my_app.jar`, crea un `my_app.conf`, que contenga:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Para más información, consulta la [documentación de Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux {#linux}

Para habilitar el rastreo al ejecutar Tomcat en Linux:

1. Abre tu archivo de script de inicio de Tomcat, por ejemplo `setenv.sh`.
2. Agrega lo siguiente a `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat como un servicio de Windows) {#windows-tomcat-as-a-windows-service}

Para habilitar el rastreo al ejecutar Tomcat como un servicio de Windows:

1. Abre la utilidad de mantenimiento "tomcat@VERSION_MAJOR@w.exe" ubicada en el directorio `./bin` de la carpeta del proyecto Tomcat.
2. Navega a la pestaña **Java**, y agrega lo siguiente a `Java Options`:

```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Reinicia tus servicios de Tomcat para que los cambios surtan efecto.

{{% /tab %}}
{{% tab "JBoss" %}}

- En modo independiente:

  Agrega la siguiente línea al final de `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En modo independiente y en Windows, agrega la siguiente línea al final de `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En modo de dominio:

  Agrega la siguiente línea en el archivo `domain.xml`, bajo la etiqueta server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Para más detalles, consulta la [documentación de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si usas `jetty.sh` para iniciar Jetty como un servicio, edítalo para agregar:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si usas `start.ini` para iniciar Jetty, agrega la siguiente línea (bajo `--exec`, o agrega la línea `--exec` si aún no está):

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

En la consola administrativa:

1. Selecciona **Servidores**. Bajo **Tipo de Servidor**, selecciona **Servidores de aplicaciones WebSphere** y selecciona tu servidor.
2. Selecciona **Java y Gestión de Procesos > Definición de Proceso**.
3. En la sección **Propiedades Adicionales**, haz clic en **Máquina Virtual de Java**.
4. En el campo de texto **Argumentos JVM Genéricos**, ingresa:

```text
-javaagent:/path/to/dd-java-agent.jar
```

Para más detalles y opciones, consulta la [documentación de WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Nota**

- Si estás agregando el `-javaagent` argumento a tu `java -jar` comando, debe ser agregado _antes_ del `-jar` argumento, como una opción de JVM, no como un argumento de aplicación. Por ejemplo:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- Nunca agregues `dd-java-agent` a tu classpath. Puede causar comportamientos inesperados.

## Instrumentación automática {#automatic-instrumentation}

La instrumentación automática para Java utiliza las `java-agent` capacidades de instrumentación [proporcionadas por la JVM][8]. Cuando un `java-agent` es registrado, puede modificar archivos de clase en el momento de carga.

**Nota:** Las clases cargadas con ClassLoader remoto no son instrumentadas automáticamente.

La instrumentación puede provenir de la auto-instrumentación, la API de OpenTracing, o una mezcla de ambas. La instrumentación generalmente captura la siguiente información:

- La duración del tiempo se captura utilizando el reloj NanoTime de la JVM a menos que se proporcione una marca de tiempo desde la API de OpenTracing.
- Pares de etiquetas clave/valor
- Errores y trazas de pila que no son manejados por la aplicación
- Un conteo total de trazas (solicitudes) que fluyen a través del sistema

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de unified service tagging. Lea [Configuración de la Biblioteca][9] para más detalles.

### Configuración remota {#remote-configuration}

La Configuración Remota permite que el Agente de Datadog configure dinámicamente los ajustes de rastreo sin requerir reinicios de la aplicación. Por defecto, la Configuración Remota está habilitada. Para deshabilitarla, establezca la variable de entorno:

```
DD_REMOTE_CONFIG_ENABLED=false
```

O agregue la propiedad del sistema JVM:

```
-Ddd.remote_config.enabled=false
```

## Lectura adicional {#further-reading}

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