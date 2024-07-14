---
aliases:
- /es/tracing/java
- /es/tracing/languages/java
- /es/agent/apm/java/
- /es/tracing/setup/java
- /es/tracing/setup_overview/java
- /es/tracing/setup_overview/setup/java
- /es/tracing/trace_collection/dd_libraries/java/
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente APM de Java para Datadog
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
kind: documentación
title: Rastreo de aplicaciones Java
type: lenguaje de código múltiple
---
## Requisitos de compatibilidad

La última versión del rastreador Java es compatible con todas las máquinas virtuales Java a partir de la versión 8. Para obtener más información sobre las versiones anteriores a la v8, consulta [Tiempos de ejecución de máquinas virtuales Java compatibles][10].

Para ver la lista completa de versiones y marcos de trabajo Java compatibles con Datadog (incluidas las versiones heredadas y de mantenimiento) consulta los [requisitos de compatibilidad][1].

## Para empezar

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][18].

### Instrumentación de tu aplicación

Después de instalar y configurar tu Datadog Agent, el siguiente paso es añadir la biblioteca de rastreo directamente en la aplicación para instrumentarla. Consulta más bibliografía con [información sobre la compatibilidad][1].

Para empezar a rastrear tus aplicaciones:

1. Descarga `dd-java-agent.jar`, que contiene los últimos archivos de clase de rastreo, en una carpeta a la que tengas acceso con tu usuario de Datadog:

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
{{% tab "Dockerfile" (Archivo Docker) %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Nota:** Para descargar la última compilación de una versión **mayor** específica, utiliza el enlace `https://dtdg.co/java-tracer-vX`, donde `X` es la versión mayor deseada.
   Por ejemplo, utiliza `https://dtdg.co/java-tracer-v1` para la última versión 1 de compilación. No debe incluir los números de las versiones menores. Para obtener cualquier versión específica, también puedes consultar el [repositorio Maven][3] de Datadog.

   **Nota**: Las versiones candidatas (Release Candidate) están disponibles en GitHub  [DataDog/dd-trace-java releases][21]. Estas versiones tienen "RC" y se recomiendan para tests fuera de tu entorno de producción. Puedes [suscribirse a las notificaciones sobre versiones de GitHub][20] para recibir avisos cuando haya nuevas versiones candidatas disponibles para tests. Si tienes algún problema con las versiones candidatas, ponte en contacto con el [servicio de asistencia de Datadog][22].

2. Para ejecutar tu aplicación desde un script de aplicación IDE, Maven o Gradle, o desde un comando `java -jar`, con el Continuous Profiler, el rastreo de despliegues y la inyección de logs (si envías logs a Datadog), añade el argumento de máquina virtual Java `-javaagent` y las siguientes opciones de configuración, según corresponda:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
   Si tienes mucha necesidad de reducir el tamaño de tu imagen y omitir módulos, puedes utilizar el comando [jdeps][19] para identificar dependencias. Sin embargo, los módulos necesarios pueden cambiar con el tiempo, así que hazlo bajo tu propia responsabilidad.

    <div class="alert alert-danger">Habilitar la creación de perfiles puede afectar a tu factura en función de tu paquete APM. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">página de tarifas</a>.</div>

| Variable de entorno      | Propiedad del sistema                     | Descripción|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Tu entorno de aplicación (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Habilita la inyección automática de claves MDC para los ID de rastreo y de tramos (spans) de Datadog. Para ver más detalles, consulta [Uso avanzado][6]. <br><br>**Beta**: A partir de la versión 1.18.3, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes configurar `DD_LOGS_INJECTION` en la interfaz de usuario [Catálogo de servicios][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Activar el [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | Nombre de un conjunto de procesos que llevan a cabo la misma tarea. Se utiliza para agrupar estadísticas de tu aplicación. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Configura una frecuencia de muestreo en la raíz de la traza para todos los servicios. <br><br>**Beta**: A partir de la versión 1.18.3, si la [configuración remota del Agent][16] está habilitada donde se ejecuta este servicio, puedes configurar `DD_TRACE_SAMPLE_RATE` en la interfaz de usuario [Catálogo de servicios][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Configura una frecuencia de muestreo en la raíz de la traza para los servicios que coinciden con la regla especificada.    |
| `DD_VERSION` | `dd.version` |  La versión de tu aplicación (por ejemplo, `2.5`, `202003181415` o `1.3-alpha`) |

Las [opciones de configuración](#configuration) adicionales se describen a continuación.


### Añadir la versión del rastreador Java a la máquina virtual Java

Consulta la documentación de tu servidor de aplicaciones para saber cómo pasar `-javaagent` y otros argumentos de máquinas virtuales Java. Aquí encontrarás las instrucciones para algunos de los marcos de trabajo más frecuentes:

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si tu aplicación se denomina `my_app.jar`, crea un `my_app.conf` que contenga:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Para obtener más información, consulta la [documentación sobre Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux

Para habilitar el rastreo cuando se ejecuta Tomcat en Linux:

1. Abre tu archivo de script de inicio de Tomcat, por ejemplo `setenv.sh`.
2. Añade lo siguiente a `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat como servicio de Windows)

Para habilitar el rastreo cuando se ejecuta Tomcat como servicio de Windows:

1. Abre un Command Prompt.
1. Ejecuta el siguiente comando para actualizar la configuración de tu servicio Tomcat:
    ```shell
    tomcat8 //US//<SERVICE_NAME> --Environment="CATALINA_OPTS=%CATALINA_OPTS% -javaagent:\"c:\path\to\dd-java-agent.jar\""
    ```
   Sustituye `<SERVICE_NAME>` por el nombre de tu servicio Tomcat y sustituye la ruta por `dd-java-agent.jar`.
1. Reinicia tu servicio Tomcat para que los cambios se apliquen.

#### Windows (Tomcat con script de configuración de entorno)

Para habilitar el rastreo cuando se ejecuta Tomcat con un script de configuración de entorno:

1. Crea `setenv.bat` en el directorio `./bin` de la carpeta del proyecto Tomcat, si no existe.
1. Añade lo siguiente a `setenv.bat`:
   ```text
   set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
   ```
Si el paso anterior no funciona, intenta añadir lo siguiente:
```text
set JAVA_OPTS=%JAVA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```

{{% /tab %}}
{{% tab "JBoss" %}}

- En modalidad independiente:

  Añade la siguiente línea al final de `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En modalidad independiente y en Windows, añade la siguiente línea al final de `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En modalidad de dominio:

  Añade la siguiente línea en el archivo `domain.xml`, debajo de la etiqueta (tag) server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Para obtener más información, consulta la [documentación de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si utilizas `jetty.sh` para iniciar Jetty como servicio, edítalo y añade:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si utilizas `start.ini` para iniciar Jetty, añade la siguiente línea (debajo de `--exec` o añade la línea `--exec` si no está allí):

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

En la consola administrativa:

1. Selecciona **Servers** (Servidores). En **Server Type** (Tipo de Servidor), selecciona **WebSphere application servers** (Servidores de la aplicación WebSphere) y elige tu servidor.
2. Selecciona **Java and Process Management > Process Definition** (Java y Gestión de procesos > Definición de procesos).
3. En la sección **Additional Properties** (Propiedades adicionales), haz clic en **Java Virtual Machine** (Máquina virtual Java).
4. En el campo **Generic JVM arguments** (Argumentos de máquinas virtuales Java genéricos), introduce:

```text
-javaagent:/path/to/dd-java-agent.jar
```

Para ver más detalles y opciones, consulta la [documentación de WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Nota**

- Si quieres añadir el argumento `-javaagent` a tu comando `java -jar`, tienes que añadirlo antes del argumento `-jar` como opción de la máquina virtual Java y no como un argumento de aplicación. Por ejemplo:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     Para obtener más información, consulta la [documentación sobre Oracle][7].

- No añadas `dd-java-agent` a tu classpath, ya que podría provocar un comportamiento inesperado.

## Instrumentación automática

La instrumentación automática para Java utiliza las capacidades de instrumentación `java-agent` [que proporciona la máquina virtual Java][8]. Cuando se registra un `java-agent`, puede modificar archivos de clase durante la carga.

**Nota:** Las clases que se cargan con un ClassLoader remoto no se instrumentan de forma automática.

La instrumentación puede venir de la instrumentación automática, de la API OpenTracing o de una combinación de ambas. La instrumentación suele registrar los siguientes datos:

- La duración normalmente se registra con el reloj NanoTime de la máquina virtual Java, salvo si la API OpenTracing proporciona una marca de tiempo
- Pares de etiquetas clave/valor
- Errores y trazas de stacks tecnológicos que la aplicación no gestiona
- Número total de trazas (solicitudes) que circulan por el sistema

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, según sea necesario, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de bibliotecas][9].

## Leer más

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
[16]: /es/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/es/getting_started/support/