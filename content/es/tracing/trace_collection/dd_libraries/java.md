---
title: Rastreo de aplicaciones Java
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
    - /tracing/setup_overview/setup/java
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Código fuente APM de Java para Datadog'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explora tus servicios, recursos y trazas'
---
## Requisitos de compatibilidad

El último Java Tracer es compatible con todas las JVMs versión 8 y superior. Para obtener información adicional acerca de las versiones JVM por debajo de 8, lea Tiempos de [ejecución JVM compatibles][10].

Para ver la lista completa de versiones y marcos Java compatibles con Datadog (incluidas las versiones heredadas y de mantenimiento) consulta los [Requisitos de compatibilidad][1].

## Primeros pasos

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][18].

### Instrumentación de tu aplicación

Después de instalar y configurar tu Datadog Agent, el siguiente paso es añadir la biblioteca de rastreo directamente en la aplicación para instrumentarla. Lea más sobre la [información de compatibilidad][1].

Para empezar a rastrear tus aplicaciones:

1. Descarga `dd-java-agent.jar`, que contiene los últimos archivos de clase de rastreo, en una carpeta a la que tengas acceso con tu usuario de Datadog:

{{< tabs >}} {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}} {{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}} {{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}} {{< /tabs >}}

   **Nota:** Para descargar la última compilación de una versión **principal** específica, utilice el enlace `https://dtdg.co/java-tracer-vX` en su lugar, donde `X` es la versión principal deseada. Por ejemplo, utilice `https://dtdg.co/java-tracer-v1` para la última versión 1 compilación. No se deben incluir números de versión menores. Alternativamente, vea el [depósito Maven][3] de Datadog para cualquier versión específica.

   \*\*NOTA:** Las versiones candidatas están disponibles en las [versiones de DataDog/dd-trace-java][21] de GitHub. Estos tienen "RC" en la versión y se recomiendan para pruebas fuera de su entorno de producción. Puede [suscribirse a notificaciones][20] de lanzamiento de GitHub para recibir información cuando los nuevos candidatos de lanzamiento estén disponibles para pruebas. Si experimenta algún problema con Release Candidates, comuníquese con el [soporte de Datadog][22].

2. Para ejecutar tu aplicación desde un script de aplicación IDE, Maven o Gradle, o desde un comando `java -jar`, con el Continuous Profiler, el rastreo de despliegues y la inyección de logs (si envías logs a Datadog), añade el argumento de máquina `-javaagent` JVM y las siguientes opciones de configuración, según corresponda:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    \*\*NOTA:** Si tiene una gran necesidad de reducir el tamaño de su imagen y omitir módulos, puede usar el comando [`jdeps`][19] para identificar dependencias. Sin embargo, los módulos requeridos pueden cambiar con el tiempo, así que hazlo bajo tu propio riesgo.

    \*\*NOTA:** Al habilitar el trazador para Java 24+, es posible que vea advertencias relacionadas con el acceso nativo de JNI o el acceso a la memoria `sun.misc.Unsafe`. Suprima estas advertencias añadiendo las variables de entorno `--illegal-native-access=allow` y `--sun-misc-unsafe-memory-access=allow` justo antes del argumento `-javaagent:/path/to/dd-java-agent.jar`. Vea [JEP 472][23] y [JEP 498][24] para más información.

    <div class="alert alert-warning">Habilitar el perfil puede afectar su factura dependiendo de su paquete de APM. Para más información, consulte la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">página de precios</a>.</div>

| Variable de entorno      | Propiedad del sistema                     | Descripción|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Su entorno de aplicación (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Habilite la inyección automática de claves MDC para los ID de rastreo y expansión de Datadog. Consulte [Uso avanzado][6] para más detalles. <br><br>A partir de la versión 1.18.3, si la [configuración remota del][16] agente está habilitada donde se ejecuta este servicio, puede establecer `DD_LOGS_INJECTION` en la interfaz de usuario del [catálogo de software][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Activar el [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | El nombre de un conjunto de procesos que hacen el mismo trabajo. Utilizado para agrupar estadísticas para su aplicación. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Define una tasa de muestreo en la raíz de la traza para todos los servicios. <br><br> A partir de la versión 1.18.3, si la [configuración remota del][16] agente está habilitada donde se ejecuta este servicio, puede establecer `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario del [catálogo de software][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Configura una frecuencia de muestreo en la raíz de la traza para los servicios que coinciden con la regla especificada.    |
| `DD_VERSION` | `dd.version` |  La versión de tu aplicación (por ejemplo, `2.5`, `202003181415` o `1.3-alpha`) |

Las [opciones de configuración](#configuration) adicionales se describen a continuación.


### Añadir la versión del Java Tracer a la máquina virtual Java

Utilice la documentación de su servidor de aplicaciones para averiguar la forma correcta de introducir `-javaagent` y otros argumentos de JVM. Aquí hay instrucciones para algunos frameworks de uso común:

{{< tabs >}} {{% tab "Spring Boot" %}}

Si tu app se llama `my_app.jar`, crea una `my_app.conf` que contenga:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Para obtener más información, consulte la [documentación sobre Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}} {{% tab "Tomcat" %}}

#### Linux

Para habilitar el rastreo cuando se ejecuta Tomcat en Linux:

1. Abre tu archivo de script de inicio de Tomcat, por ejemplo `setenv.sh`.
2. Añádase lo siguiente a la `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat como servicio de Windows)

Para habilitar el rastreo cuando se ejecuta Tomcat como servicio de Windows:

1. Abra la utilidad de mantenimiento "tomcat@VERSION_MAJOR@w.exe" situada en el directorio `./bin` de la carpeta del proyecto Tomcat.
2. Vaya a la pestaña **Java** y añada lo siguiente a `Java Options`:
```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Reinicia tus servicios Tomcat para que los cambios surtan efecto.

{{% /tab %}} {{% tab "JBoss" %}}

- En modalidad independiente:

  Añádase la siguiente línea al final del `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En modalidad independiente y en Windows, añade la siguiente línea al final de `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En modalidad de dominio:

  Añada la siguiente línea en el archivo `domain.xml`, debajo de la etiqueta server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Para obtener más información, consulte la [documentación de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}} {{% tab "Jetty" %}}

Si utilizas `jetty.sh` para iniciar Jetty como servicio, edítalo y añade:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si usas `start.ini` para iniciar Jetty, agrega la siguiente línea (en `--exec` o agrega la línea de `--exec` si aún no está ahí):

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}} {{% tab "WebSphere" %}}

En la consola administrativa:

1. Seleccione **Servidores**. En **Servidor Type** (Tipo de Servidor), selecciona **WebSphere application servers** (Servidores de la aplicación WebSphere) y elige tu servidor.
2. Seleccione **Java and Process Management > Process Definition**.
3. En la sección **Propiedades adicionales**, haz clic en **Java Virtual Machine**.
4. En el campo **Generic JVM arguments** (Argumentos de máquinas virtuales Java genéricos), introduzca:

```text
-javaagent:/path/to/dd-java-agent.jar
```

Para ver más detalles y opciones, consulte los [documentos de WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}} {{< /tabs >}}

**Nota**

- Si quieres añadir el argumento `-javaagent` a tu comando `java -jar`, tienes que añadirlo _antes_ del argumento `-jar` como opción de la máquina virtual Java y no como un argumento de aplicación. Por ejemplo:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     Para obtener más información, consulte la [documentación sobre Oracle][7].

- Nunca agregues `dd-java-agent` a tu ruta de clase. Puede causar un comportamiento inesperado.

## Instrumentación automática

La instrumentación automática para Java utiliza las capacidades de instrumentación de `java-agent` [proporcionadas por la JVM][8]. Cuando se registra un `java-agent`, puede modificar los archivos de clase en el momento de la carga.

**Nota:** Las clases que se cargan con un ClassLoader remoto no se instrumentan de forma automática.

La instrumentación puede provenir de la autoinstrumentación, la API de OpenTracing o una mezcla de ambas. La instrumentación generalmente captura la siguiente información:

- La duración normalmente se registra con el reloj NanoTime de la máquina virtual Java, salvo si la API OpenTracing proporciona una marca de tiempo
- Pares de etiquetas clave/valor
- Errores y trazas de stacks tecnológicos que la aplicación no gestiona
- Número total de trazas (solicitudes) que circulan por el sistema

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, según sea necesario, incluida la configuración del etiquetado unificado de servicios. Lea [Configuración de biblioteca][9] para más detalles.

### Configuración remota

La configuración remota permite al agente Datadog configurar dinámicamente los ajustes de rastreo sin necesidad de reiniciar la aplicación. De forma predeterminada, Configuración remota está activada. Para desactivarlo, establezca la variable de entorno:

```
DD_REMOTE_CONFIG_ENABLED=false
```

O agregue la propiedad del sistema JVM:

```
-Ddd.remote_config.enabled=false
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[16]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/getting_started/support/
[23]: https://openjdk.org/jeps/472
[24]: https://openjdk.org/jeps/498
