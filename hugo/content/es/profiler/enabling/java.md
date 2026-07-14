---
aliases:
- /es/tracing/profiler/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con Profiler
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/java
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
title: Activación de Java Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, puedes omitir la instalación de biblioteca e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][13].

A partir de dd-trace-java 1.0.0, tienes dos opciones para el motor que genera datos de perfil para las aplicaciones de Java: [Java Flight Recorder (JFR)][2] o el Datadog Profiler. A partir de dd-trace-java 1.7.0, Datadog Profiler es el predeterminado. Cada motor de generador de perfiles tiene diferentes efectos secundarios, requisitos, configuraciones disponibles y limitaciones, y esta página describe cada uno. Puedes activar uno o ambos motores. Activando ambos se capturan los dos tipos de perfil al mismo tiempo.

{{< tabs >}}
{{% tab "Datadog Profiler" %}}

Sistemas operativos compatibles:
- Linux

Versiones mínimas de JDK:
- OpenJDK 8u352 o posterior, 11.0.17 o posterior, 17.0.5 o posterior, 21 o posterior (incluidas las primeras compilaciones: Amazon Corretto, Azul Zulu y otras).
- Oracle JDK 8u351 o posterior, 11.0.17 o posterior, 17.0.5 o posterior, 21 o posterior
- OpenJ9 JDK 8u372 o posterior, 11.0.18 o posterior, 17.0.6 o posterior (utilizado en Eclipse OpenJ9, IBM JDK, IBM Semeru Runtime).

**Nota:** El generador de perfiles está deshabilitado por defecto para OpenJ9 debido a la posibilidad de fallos de la JVM causados por un sutil error en la implementación de JVTMI. Si **no** experimentas ningún fallo, puedes habilitar el generador de perfiles añadiendo `-Ddd.profiling.ddprof.enabled=true` o `DD_PROFILING_DDPROF_ENABLED=true`.
- Azul Platform Prime 23.05.0.0 o posterior (antes Azul Zing)


**Nota:** El Datadog Profiler está inactivado en el compilador GraalVM (JVMCI) y necesita ser habilitado explícitamente con `-Ddd.profiling.ddprof.enabled=true` o `DD_PROFILING_DDPROF_ENABLED=true`.

El Datadog Profiler utiliza la función `AsyncGetCallTrace` de JVMTI, en la que existe un [problema conocido][1] anterior a la versión 17.0.5 del JDK. Esta corrección se ha trasladado a la versión 11.0.17 y 8u352. El Datadog Profiler no está habilitado a menos que la JVM en la que se despliega el generador de perfiles tenga esta corrección. Actualiza al menos a 8u352, 11.0.17, 17.0.5 o a la última versión de JVM que no sea LTS para utilizar el Datadog Profiler.

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

Sistemas operativos compatibles:
- Linux
- Windows

Versiones mínimas de JDK:
- OpenJDK [1.8.0.262/8u262 o posterior][3], 11+ (incluidas las versiones basadas en él: Amazon Corretto y otras)
- Oracle JDK 11 o posterior (la activación del JFR puede requerir una licencia comercial de Oracle. Ponte en contacto con tu representante de Oracle para confirmar si esto forma parte de tu licencia).
- Azul Zulu 8 (versión 1.8.0.212/8u212 o posterior), 11 o posterior
- GraalVM 17 o posterior - ambas versiones, JIT y AOT (imagen nativa)

Dado que las versiones de JDK que no son LTS pueden no contener correcciones de estabilidad y rendimiento relacionadas con la biblioteca del Datadog Profiler, utiliza las versiones 8, 11 y 17 del JDK de soporte a largo plazo.

Requisitos adicionales para la formación de perfiles [trace (traza) to integración de perfil][12]:
 - OpenJDK 17.0.5 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior.
 - OpenJDK 11.0.17 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior
 - OpenJDK 8 8u352 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior
 - OpenJ9 17.0.6 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior
 - OpenJ9 11.0.18 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior
 - OpenJ9 8.0.362 o posterior y `dd-trace (traza)-java` versión 1.17.0 o posterior

[3]: /es/profiler/profiler_troubleshooting/java/#java-8-support
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

Todos los lenguajes basados en JVM, como Java, Scala, Groovy, Kotlin y Clojure son compatibles.

Continuous Profiler no es compatible con algunas plataformas serverless, como AWS Lambda.

## Instalación

Para empezar a crear perfiles de aplicaciones:

1. Asegúrate de que Datadog Agent v6 o posterior está instalado y en ejecución. Datadog recomienda utilizar [Datadog Agent v7 o posterior][4]. Si no tienes APM habilitado para configurar tu aplicación para enviar datos a Datadog, en tu Agent, configura la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.

2. Descarga `dd-java-agent.jar`, que contiene los archivos de clase de Java Agent:

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

   **Nota**: Profiler está disponible en la biblioteca `dd-java-agent.jar` para las versiones 0.55 o posterior.

3. Habilita el generador de perfiles configurando el indicador `-Ddd.profiling.enabled` o la variable de entorno `DD_PROFILING_ENABLED` en `true`. Especifica `dd.service`, `dd.env` y `dd.version` para poder filtrar y agrupar tus perfiles a través de estas dimensiones:
   {{< tabs >}}
{{% tab "Argumentos del comando" %}}

Invoca tu servicio:
```diff
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.profiling.enabled=true \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{% tab "Variables de entorno" %}}

```diff
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="(Opcional) Construir y ejecutar una imagen nativa de Graal" level="h4" %}}

Sigue las [Instrucciones de configuración del rastreador][14] para construir tu imagen nativa de Graal con el Datadog Java Profiler.

Cuando se crea el archivo binario de servicio, puedes utilizar variables de entorno para habilitar y configurar el Datadog Java Profiler:

   ```shell
   DD_PROFILING_ENABLED=true DD_PROFILING_DIRECTALLOCATION_ENABLED=true ./my_service
   ```

**Nota**: Solo se admiten los perfiles basados en JFR para las aplicaciones de imagen nativa de GraalVM. Ninguna de las opciones de configuración relacionadas con <code>DDPROF</code> son efectivas.
{{% /collapse-content %}}

   **Nota**: El argumento `-javaagent` debe estar antes de `-jar`. Esto lo añade como una opción de JVM en lugar de como un argumento de aplicación. Por ejemplo, `java -javaagent:dd-Java-Agent.jar ... -jar my-servicio.jar -more-flags`. Para más información, consulta la [documentación de Oracle][6].

4. Opcional: configura [la integración de código fuente][7] para conectar tus datos de perfiles con tus repositorios Git.

5. Después de uno o dos minutos, visualizarás tus perfiles en la página [Datadog APM > Perfiles][8].

### Activación de las opciones de motor del generador de perfiles de CPU

Desde la versión 1.5.0 de dd-trace-java, tienes dos opciones para el generador de perfiles de CPU utilizado, Datadog o Java Flight Recorder (JFR). Desde la versión 1.7.0, Datadog es el predeterminado, pero también puedes habilitar opcionalmente JFR para los perfiles de CPU. Puedes activar uno o ambos motores. Activando ambos se capturan los dos tipos de perfiles al mismo tiempo.

El Datadog Profiler registra el span (tramo) activo en cada muestra, lo que mejora la fidelidad de la integración de la trace (traza) a Profiling y las funciones de perfilado de endpoint. Habilitar este motor admite una integración mucho mejor con el rastreo de APM.

El Datadog Profiler consta de varios motores de perfiles, incluidos los generadores de perfiles de CPU, tiempo real, asignación y fugas de memoria.


{{< tabs >}}
{{% tab "Datadog Profiler" %}}
_Consulta los requisitos mínimos de la versión JDK para activar el Datadog Profiler._

El Datadog Profiler está activado por defecto en las versiones 1.7.0 o posterior de dd-trace-java. El perfil de CPU de Datadog se programa a través de eventos perf y es más preciso que el perfil de CPU de JFR. Para habilitar la generación de perfiles de CPU:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_CPU_ENABLED=true
```

o:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.cpu.enabled=true
```

Para los usuarios de JDK Mission Control (JMC), el evento de ejemplo de CPU de Datadog es `datadog.ExecutionSample`.

#### Configuración de Linux

El motor de CPU funciona en la mayoría de los sistemas, pero si el valor de `/proc/sys/kernel/perf_event_paranoid` se establece en `3`, el generador de perfiles no puede utilizar eventos perf para programar el muestreo de la CPU. Esto da como resultado una calidad de perfil degradada, volviendo a utilizar `itimer`. Establece `/proc/sys/kernel/perf_event_paranoid` en `2` o inferior con el siguiente comando:

```
sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'
```

{{% /tab %}}

{{% tab "JFR" %}}

Para la versión 1.7.0 o posterior, para cambiar del perfil por defecto de Datadog al perfil de CPU de JFR:

```
export DD_PROFILING_DDPROF_CPU_ENABLED=false
```
o:
```
-Ddd.profiling.ddprof.cpu.enabled=false
```
Para los usuarios de JDK Mission Control (JMC), el evento de ejemplo de CPU de JFR es `jdk.ExecutionSample`.

{{% /tab %}}
{{< /tabs >}}


### Motor de tiempo real del Datadog Profiler

El motor de perfil de tiempo real es útil para perfilar la latencia y se integra estrechamente con el rastreo de APM. El motor muestrea todos los subprocesos, dentro o fuera de la CPU, con actividad de rastreo activa y puede utilizarse para diagnosticar la latencia de traza o tramo. El motor está activado por defecto desde la versión 1.7.0.

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.wall.enabled=true
```

Para la versión 1.7.0 o posterior, para desactivar el generador de perfiles de tiempo real:

```
export DD_PROFILING_DDPROF_WALL_ENABLED=false
```
o:
```
-Ddd.profiling.ddprof.wall.enabled=false
```

Para los usuarios de JMC, el evento `datadog.MethodSample` se emite para las muestras de tiempo real.

El motor de tiempo real no depende de la configuración de `/proc/sys/kernel/perf_event_paranoid`.

### Motor de asignación del generador de perfiles

{{< tabs >}}
{{% tab "JFR" %}}
El motor de perfiles de asignación basado en JFR está habilitado por defecto desde JDK 16.
La razón por la que no está habilitado por defecto para JDK 8 y 11 es que varias asignaciones
puede llevar a una gran sobrecarga y grandes tamaños de registro.
Para habilitarlo para JDK 8 y 11, añade lo siguiente:

```
export DD_PROFILING_ENABLED_EVENTS=jdk.ObjectAllocationInNewTLAB,jdk.ObjectAllocationOutsideTLAB
```

o:

```
-Ddd.profiling.enabled.events=jdk.ObjectAllocationInNewTLAB,jdk.ObjectAllocationOutsideTLAB
```
{{% /tab %}}

{{% tab "Datadog Profiler" %}}

El motor de perfiles de asignación de Datadog contextualiza los perfiles de asignación, lo que admite perfiles de asignación filtrados por endpoint.
En dd-java-agent anterior a v1.28.0 está **deshabilitado** por defecto. El generador de perfiles de asignación se basa en APIs de JVMTI que podrían fallar antes de OpenJDK 21.0.3 y está deshabilitado en versiones de JDK más antiguas. Habilítalo
con:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true # this is the default in v1.28.0+ on OpenJDK 21.0.3+
```

o:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.alloc.enabled=true # this is the default in v1.17.0+
```

Para los usuarios de JMC, los eventos de asignación de Datadog son `datadog.ObjectAllocationInNewTLAB` y `datadog.ObjectAllocationOutsideTLAB`.

El motor del generador de perfiles de asignación no depende de la configuración de `/proc/sys/kernel/perf_event_paranoid`.
{{% /tab %}}

{{< /tabs >}}

### Motor del generador de perfiles live-heap

_A partir de: v1.39.0. Requiere JDK 11.0.23 o posterior, 17.0.11 o posterior, 21.0.3 o posterior, o 22 o posterior._

El motor del generador de perfiles live-heap en directo es útil para investigar el uso general de memoria de tu servicio e identificar posibles fugas de memoria.
El motor muestrea las asignaciones y mantiene un registro de si esas muestras sobrevivieron al ciclo de recopilación de elementos no usados más reciente. El número de muestras que sobreviven se utiliza para estimar el número de objetos activos en el stack.
El número de muestras rastreadas está limitado para evitar un crecimiento ilimitado del uso de memoria del generador de perfiles.

El motor está desactivado por defecto, pero puedes activarlo con:

```
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true
```

o:

```
-Ddd.profiling.ddprof.liveheap.enabled=true
```

Para los usuarios de JMC, el evento de heap en directo de Datadog es `datadog.HeapLiveObject`.

El motor de asignación no depende de la configuración de `/proc/sys/kernel/perf_event_paranoid`.

### Recopilación de stack traces nativas

Si los motores de CPU o tiempo real del Datadog Profiler están activados, puedes recopilar stack traces nativas. Estas incluyen cosas como las internas de la JVM, las bibliotecas nativas utilizadas por tu aplicación o la JVM, y syscalls.

<div class="alert alert-danger">Las stack traces nativas no se recopilan de forma predeterminada, ya que normalmente no proporcionan información procesable y analizarlas puede afectar potencialmente a la estabilidad de la aplicación. Prueba esta configuración en un entorno que no sea de producción antes de intentar utilizarla en producción.</a></div>

Para habilitar la recopilación de stack traces nativas, entendiendo que puede desestabilizar tu aplicación, establece:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

o:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.cstack=dwarf
```



## Configuración

Puedes configurar el generador de perfiles utilizando las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Booleano       | Alternativa para el argumento `-Ddd.profiling.enabled`. Establece la opción en `true` para habilitar el generador de perfiles.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Booleano       | Alternativa para el argumento `-Ddd.profiling.allocation.enabled`. Establece la opción en `true` para habilitar el generador de perfiles de asignación. Requiere que el generador de perfiles ya esté habilitado. |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][10], por ejemplo: `production`. |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][10], por ejemplo, `web-backend`. |
| `DD_VERSION`                                     | Cadena        | La [versión][10] de tu servicio. |
| `DD_TAGS`                                        | Cadena        | Las etiquetas para aplicar a un perfil cargado. Debe ser una lista de `<key>:<value>` separados por comas como: `layer:api, team:intake`.  |

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el Profiler][11] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /es/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: /es/integrations/guide/source-code-integration/?tab=java
[8]: https://app.datadoghq.com/profiling
[9]: /es/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[10]: /es/getting_started/tagging/unified_service_tagging
[11]: /es/getting_started/profiler/
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /es/profiler/enabling/supported_versions/
[14]: /es/tracing/trace_collection/compatibility/java/?tab=graalvm#setup
[15]: https://docs.datadoghq.com/es/profiler/enabling/java/?tab=datadogprofiler#