---
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles Java
type: lenguaje de código múltiple
---

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, activa el [modo de depuración][1] y [abre un ticket de asistencia][2]. En el ticket de asistencia, incluye los archivos de depuración junto con la siguiente información:

- Tipo y versión del sistema operativo (por ejemplo, Linux Ubuntu 20.04)
- Tipo de tiempo de ejecución, versión y proveedor (por ejemplo, Java OpenJDK 11 AdoptOpenJDK)


## Reducción de la sobrecarga de la configuración por defecto

Si la sobrecarga de configuración por defecto no es aceptable, puedes utilizar el generador de perfiles con parámetros de configuración mínimo. La configuración mínima presenta los siguientes cambios, en comparación con la configuración por defecto:

- Aumenta el umbral de muestreo a 500 ms para eventos `ThreadSleep`, `ThreadPark` y `JavaMonitorWait`, en comparación con los 100 ms por defecto.
- Deshabilita eventos `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount`

Para utilizar la configuración mínima, asegúrate de que dispones de `dd-java-agent` versión `0.70.0` y, a continuación, cambia la invocación de servicios por lo siguiente:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Aumento de la especificidad de la información del generador de perfiles

Si quieres obtener una mayor especificidad en tus datos de generación de perfiles, puedes especificar la configuración `comprehensive`. Ten en cuenta que para ofrecerte una mayor especificidad, esta estrategia aumentará la sobrecarga de tu generador de perfiles. Una configuración completa muestra los siguientes cambios, en comparación con la configuración por defecto:

- Reduce el umbral de muestreo a 10 ms para eventos `ThreadSleep`, `ThreadPark` y `JavaMonitorWait`, en comparación con los 100 ms por defecto
- Habilita eventos `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount`

Para utilizar la configuración completa, asegúrate de que dispones de `dd-trace-java` versión `0.70.0` y, a continuación, cambia la invocación de servicios por lo siguiente:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Habilitación del generador de perfiles de asignaciones

En Java 15 y versiones anteriores, el generador de perfiles de asignaciones está deshabilitado por defecto, ya que puede saturar el generador de perfiles en aplicaciones con muchas asignaciones.

Para habilitar el generador de perfiles de asignaciones, inicia tu aplicación con el parámetro de máquina virtual Java `-Ddd.profiling.allocation.enabled=true` o la variable de entorno `DD_PROFILING_ALLOCATION_ENABLED=true`.

También puedes habilitar los siguientes eventos en tu [archivo de plantillas de anulación](#creating-and-using-a-jfr-template-override-file) de `jfp`:

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[Aprende a utilizar las plantillas de anulación.](#creating-and-using-a-jfr-template-override-file).

## Habilitación del generador de perfiles de heap
<div class="aler alert-info">Esta función requiere al menos Java 11.0.12, 15.0.4, 16.0.2, 17.0.3 o 18 y posteriores.</div>
Para activar el perfilador de montón, inicia tu aplicación con la configuración de JVM `-Ddd.profiling.heap.enabled=true` o la variable de entorno `DD_PROFILING_HEAP_ENABLED=true`.

Alternativamente, puedes activar los siguientes eventos en tu `jfp` [archivo de plantilla de sustitución](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=true
```

[Aprende a utilizar las plantillas de sustitución](#creating-and-using-a-jfr-template-override-file)

## Activar métricas de histograma de montón
<div class="aler alert-info">Esta función requiere al menos Java 17.0.9 o posterior y no funciona con ZGC.</div>

Para activar métricas de histograma de montón, inicia tu aplicación con la configuración de JVM `-Ddd.profiling.heap.histogram.enabled=true` o la variable de entorno `DD_PROFILING_HEAP_HISTOGRAM_ENABLED=true`.

## Eliminación de información confidencial de los perfiles

Si las propiedades del sistema contienen información confidencial, como nombres de usuario o contraseñas, desactiva el evento de propiedad del sistema creando un [archivo de plantillas de anulación](#creating-and-using-a-jfr-template-override-file) de `jfp` con `jdk.InitialSystemProperty` deshabilitado:

```
jdk.InitialSystemProperty#enabled=false
```

[Aprende a utilizar las plantillas de anulación.](#creating-and-using-a-jfr-template-override-file).

## Eventos con grandes asignaciones que saturan el generador de perfiles

Para desactivar la generación de perfiles de asignaciones, deshabilita los siguientes eventos en tu [archivo de plantillas de anulación](#creating-and-using-a-jfr-template-override-file) de `jfp`:

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[Aprende a utilizar las plantillas de anulación.](#creating-and-using-a-jfr-template-override-file).

## La detección de fugas de memoria ralentiza el recopilador de basura
{{< tabs >}}
{{% tab "JFR" %}}
Para desactivar la detección de fugas de memoria, desactiva el siguiente evento en tu `jfp` [archivo de plantilla de sustitución](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=false
```

[Aprende a utilizar las plantillas de anulación.](#creating-and-using-a-jfr-template-override-file).

{{% /tab %}}
{{% tab "Datadog Profiler" %}}
Si estás utilizando la función alfa de perfiles de montón en vivo, puedes ajustar la sobrecarga cambiando el porcentaje
de las muestras de asignación rastreadas.
```shell
# track only 10% of the allocation samples
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.ddprof.liveheap.enabled=true -Ddd.profiling.ddprof.liveheap.sample_percent=10 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

## Excepciones que saturan el generador de perfiles

En condiciones normales, el generador de perfiles de excepciones de Datadog ocupa poco espacio y tiene poca sobrecarga. Si se crean y lanzan muchas excepciones, se puede causar una sobrecarga significativa para el generador de perfiles. Esto puede ocurrir cuando se utilizan excepciones para el flujo (flow) de control. Si tienes una tasa de excepciones inusualmente alta, desactiva temporalmente la generación de perfiles de excepciones hasta que soluciones la causa.

Para deshabilitar la generación de perfiles de excepciones, inicia el rastreador con la configuración de máquina virtual Java `-Ddd.integration.throwables.enabled=false`.

Recuerda volver a activar este ajuste, cuando hayas recuperado una tasa de excepciones más habitual.

## Compatibilidad con Java 8

Los siguientes proveedores de OpenJDK 8 son compatibles con la generación de perfiles continua, ya que incluyen JDK Flight Recorder en sus últimas versiones:

| Proveedor                      | Versión del JDK que incluye Flight Recorder |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212 (se recomienda u262)                |
| AdoptOpenJDK                | u262                                      |
| RedHat                      | u262                                      |
| Amazon (Corretto)           | u262                                      |
| Bell-Soft (Liberica)        | u262                                      |
| Versiones posteriores de todos los proveedores | u272                                      |

Si tu proveedor no está en la lista, [abre un ticket de asistencia][2], ya que otros proveedores pueden estar en desarrollo o disponibles en asistencia de Vista previa.

## Creación y uso de un archivo de anulación de plantillas JFR

Las plantillas de anulación te permiten especificar las propiedades de la generación de perfiles que quieres anular. Sin embargo, los parámetros predeterminados están equilibrados para lograr un buen balance entre la sobrecarga y la densidad de datos, presentes en la mayoría de los casos de uso. Para utilizar un archivo de anulación, sigue estos pasos:

1. Crea un archivo de anulación en un directorio accesible por `dd-java-agent`, durante la invocación del servicio:
    ```
    touch dd-profiler-overrides.jfp
    ```

2. Añade las anulaciones deseadas al archivo jfp. Por ejemplo, para deshabilitar la generación de perfiles de asignaciones y las propiedades del sistema de la máquina virtual Java, el archivo `dd-profiler-overrides.jfp` tendría el siguiente aspecto:

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. Cuando ejecutes tu aplicación con `dd-java-agent`, la invocación a tu servicio debe apuntar al archivo de anulación con `-Ddd.profiling.jfr-template-override-file=</path/to/override.jfp>`, por ejemplo:

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

## Gestión de problemas relacionados con la carpeta tmp

El Continuous Profiler puede encontrar errores relacionados con el uso del directorio del sistema `/tmp`, particularmente en entornos con seguridad estricta o permisos de ejecución limitados (por ejemplo, Docker, Kubernetes, o sistemas habilitados para SELinux). Estos problemas pueden dar lugar a:

- Perfilar los fallos de arranque
- Imposibilidad de cargar las bibliotecas nativas de `.so` 
- Acumulación de archivos temporales obsoletos tras reinicios o bloqueos de la JVM

A continuación, se indican los pasos básicos para resolver estos problemas:

- Utiliza dd-trace-java versión 1.47.0 o posterior
  A partir de la versión 1.47.0, Profiler utiliza subdirectorios específicos de PID dentro del directorio temporal configurado. Esto reduce el desorden y los conflictos potenciales de los archivos huérfanos cuando los procesos de JVM salen inesperadamente.

- Especificar un directorio temporal ejecutable personalizado
  Para garantizar un funcionamiento correcto en todos los entornos, configura explícitamente un directorio temporal ejecutable y con permisos de escritura mediante la siguiente opción de JVM:
   ```
   -Ddd.profiling.tempdir=<path_to_writable_exec_enabled_directory>
   ```
  Requisitos del directorio:
  -  Debe ser escribible por el proceso de JVM
  -  Debe tener permisos de ejecución en todos los niveles de la ruta
  -  Debe cumplir las políticas de SELinux, si se aplican

   Ejemplo:
    ```
    mkdir -p /opt/datadog-profiler-tmp
    chmod 755 /opt/datadog-profiler-tmp
    java -Ddd.profiling.tempdir=/opt/datadog-profiler-tmp -javaagent:/path/to/dd-java-agent.jar ...
    ```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/troubleshooting/#debugging-and-logging
[2]: /es/help/