---
app_id: java
categories:
- languages
- network
- oracle
- tracing
custom_kind: integración
description: Recopilar métricas personalizadas de tus aplicaciones utilizando métricas
  de Yammer library.
further_reading:
- link: https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
  tag: FAQ
  text: Tengo un Bean para mi integración JMX pero nada en Collect.
- link: https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: FAQ
  text: Ver los datos de JMX en jConsole y configurar tu jmx.yaml para recopilarlos
- link: https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/
  tag: FAQ
  text: 'jmx.yaml error: Include Section'
- link: https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/
  tag: FAQ
  text: Recopilación de atributos JMX de tipo compuesto
- link: https://docs.datadoghq.com/integrations/guide/running-jmx-commands-in-windows/
  tag: Guía
  text: Ejecución de comandos JMX en Windows
- link: https://docs.datadoghq.com/integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags/
  tag: Guía
  text: Utilizar expresiones regulares (regex) de Bean para filtrar tus métricas de
    JMX y suministrar etiquetas adicionales
title: JMX
---
## Información general

La integración de Java te permite recopilar métricas, trazas (traces) y logs desde tu aplicación de Java.

## Configuración

### Recopilación de métricas

<div class="alert alert-danger">
Los checks de JMX tiene un límite de 350 métricas por instancia. Consulta <a href="/integrations/java/?tab=host#configuration-options">las opciones de configuración</a>. Si necesitas más métricas, ponte en contacto con <a href="https://docs.datadoghq.com/help/">el soporte de Datadog.</a>
</div>

Si tu aplicación expone métricas de [JMX](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory), un complemento ligero de Java llamado JMXFetch (sólo compatible con Java >= v1.7.) es llamado por el Datadog Agent para conectarse con el servidor MBean y recopilar tus métricas de aplicación. También envía checks de servicio que informan sobre el estado de tus instancias monitorizadas. Este complemento envía métricas al Datadog Agent utilizando el servidor [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd) que se ejecuta en el Agent. Estas integraciones también utilizan las métricas de JMX:

- ActiveMQ
- Cassandra
- Solr
- Tomcat
- Kafka

**Nota**: Al enviar un tipo de métrica RATE a través de DogStatsD, la métrica aparece como GAUGE en la aplicación para garantizar una comparación relevante entre diferentes Agents. Para obtener más información, consulta la [documentación Envío de métricas: DogStatsD](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml).

#### Instalación

Asegúrate de que [puedes abrir una conexión remota de JMX](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml). Se necesita una conexión remota para que el Datadog Agent se conecte a la máquina virtual Java (JVM), incluso cuando ambos están en el mismo host. Por razones de seguridad, se recomienda no utilizar `0.0.0.0` para la dirección de escucha, y utilizar `com.sun.management.jmxremote.host=127.0.0.1` para una máquina virtual Java (JVM) y un Agent colocados.

#### Configuración

Si ejecutas el Agent como binario en un host, configura tu check de JMX como cualquier [otra integración del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent). Si ejecutas el Agent como DaemonSet en Kubernetes, configura tu check de JMX utilizando la [detección automática](https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=operator).

{{< tabs >}}

{{% tab "Host" %}}

- Configura el Agent para conectarse a JMX. Edita el archivo `jmx.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta las [opciones de configuración](#configuration-options) a continuación o la [init_config](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml) y las plantillas de la [instancia](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml) para ver todas las opciones de configuración disponibles.

  ```yaml
    init_config:
      is_jmx: true
      collect_default_metrics: true
      # custom_jar_paths:
      #  - <CUSTOM_JAR_FILE_PATH>.jar

    instances:
      - host: localhost
        port: port
        user: username
        password: password
        name: jmx_instance_name
  ```

- [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

**Nota**: Para ejecutar más de un check de JMX, crea archivos de configuración con el formato `jmx_<INDEX>.d/conf.yaml`, por ejemplo: `jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc. Cada carpeta debe almacenarse en el directorio `conf.d`, con la opción `is_jmx` establecida en `true` en el archivo de configuración.

{{% /tab %}}

{{% tab "Docker" %}}

La imagen estándar `gcr.io/datadoghq/agent:latest` para ejecutar el [contenedor del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) no tiene JMX instalado. **Utiliza la imagen `gcr.io/datadoghq/agent:latest-jmx`**. Esta imagen está basada en `gcr.io/datadoghq/agent:latest`, pero incluye una máquina virtual Java (JVM), que el Agent necesita para ejecutar [jmxfetch](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml).

Para ejecutar un check de JMX en uno de tus contenedores:

1. Crea un archivo de configuración del check de JMX haciendo referencia al [host](?tab=host), o utilizando un archivo de configuración del check de JMX para una de las integraciones de Datadog compatibles oficialmente:

   - [ActiveMQ](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml)
   - [Cassandra](https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml)
   - [Solr](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)
   - [Tomcat](https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example)
   - [Kafka](https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example)

1. Monta este archivo dentro de la carpeta `conf.d/` de tu Datadog Agent : `-v <HOST_FOLDER_PATH>:/conf.d`. Para obtener más infomación, consulta la documentación [Configuración de plantillas de checks](https://docs.datadoghq.com/agent/docker/integrations/?tab=file#configuration).

**Nota**: El uso de `%%port%%` ha demostrado generar problemas en la práctica. Si experimentas algún problema, la mejor solución es sustituir `%%port%%` por un puerto de JMX codificado.

{{% /tab %}}

{{< /tabs >}}

##### Opciones de configuración

| Opción                                        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | No       | Permite especificar jars personalizados que se añaden a la ruta de clase de la JVM del Agent.                                                                                                                                                                                                                                                                                                                                       |
| `jmx_url`                                     | No       | Si el Agent necesita conectarse a una URL de JMX no predeterminada, especifícala aquí en lugar de un host y el puerto. Si utilizas esto, deberás especificar un `name` para la instancia.                                                                                                                                                                                                                                                      |
| `is_jmx`                                      | No       | Permite crear archivos de configuración diferentes para cada aplicación en lugar de utilizar un único archivo de JMX largo. Incluye la opción en cada archivo de configuración como se explica en la nota de la sección [Configuración](#configuration).                                                                                                                                                                                   |
| `collect_default_jvm_metrics`                 | No       | Indica la integración que recopila las métricas de JVM por defecto (`jvm.*`). Por defecto es true. </br>      **Nota**: Si estás utilizando una integración que no necesita métricas de JMX específicas, establece `collect_default_jvm_metrics: false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `collect_default_metrics`                     | No       | Cada integración contiene un archivo `metrics.yaml` que contiene una lista de beans por defecto para recopilar. Cuando se configura como `True`, se recopilan automáticamente esas métricas sin agregarlas explícitamente al archivo yaml. Esto se utiliza normalmente para definir la configuración con Autodiscovery para reducir el tamaño del objeto de configuración. Esto no es aplicable a la recopilación de [métricas JMX con Java Tracing Agent](https://docs.datadoghq.com/tracing/setup_overview/setup/java/#ddjmxfetchconfigdir-and-ddjmxfetchconfig). |
| `java_bin_path`                               | No       | Especifica la ruta a tu archivo ejecutable o binario de Java si el Agent no puede encontrarlo, por ejemplo: `C:/path/to/java.exe` o `/etc/alternatives/java`                                                                                                                                                                                                                                                                          |
| `java_options`                                | No       | Opciones de JVM de Java                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`                                        | No       | Se utiliza junto con `jmx_url`.                                                                                                                                                                                                                                                                                                                                                                                     |
| `new_gc_metrics`                              | No       | Establécelo en true para utilizar mejores nombres de métrica para las métricas de recopilación de elementos no usados. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                               |
| `process_name_regex`                          | No       | En lugar de especificar un host y un puerto o `jmx_url`, el Agent puede conectarse utilizando la API adjunta. Para ello es necesario tener instalado el JDK y establecer la ruta a `tools.jar`.                                                                                                                                                                                                                                            |
| `refresh_beans`                               | No       | Periodo de actualización para actualizar la lista de MBeans coincidentes. Por defecto es 600 segundos. La disminución de este valor puede resultar en un mayor uso de la CPU.                                                                                                                                                                                                                                                                                |
| `refresh_beans_initial`                       | No       | Periodo de actualización para actualizar la lista de MBeans coincidentes inmediatamente después de la inicialización. Por defecto es el valor de `refresh_beans`.                                                                                                                                                                                                                                                                                        |
| `rmi_connection_timeout`                      | No       | El tiempo de espera de la conexión, en milisegundos, cuando se conecta a una JVM utilizando `host` y `port` o una `jmx_url`.                                                                                                                                                                                                                                                                                                               |
| `rmi_client_timeout`                          | No       | Especifica la duración sin respuesta de la JVM conectada, en milisegundos, tras la cual el Agent abandona una conexión existente y vuelve a intentarlo.                                                                                                                                                                                                                                                                      |
| `service`                                     | No       | Adjunta una etiqueta `service:<SERVICE>` a cada métrica, evento y check de servicio emitidos por esta integración.                                                                                                                                                                                                                                                                                                                 |
| `service_check_prefix`                        | No       | Prefijo personalizado del check de servicio, por ejemplo `my_prefix`, para obtener un check de servicio llamado `my_prefix.can_connect`. El nombre de la integración se utiliza por defecto si no se establece.                                                                                                                                                                                                                                                                |
| `tools_jar_path`                              | No       | Debe definirse cuando se configura `process_name_regex`.                                                                                                                                                                                                                                                                                                                                                                             |
| `trust_store_path` y `trust_store_password` | No       | Debe establecerse si SSL está activado.                                                                                                                                                                                                                                                                                                                                                                                        |

El parámetro `conf` es un lista de diccionarios. Sólo se permiten 2 claves en este diccionario:

| Clave       | Obligatorio | Descripción                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | Sí      | Un diccionario de filtros: se recopila cualquier atributo que coincida con estos filtros, a menos que también coincida con los filtros de "exclusión" (véase más abajo). |
| `exclude` | No       | Un diccionario de filtros: los atributos que coincidan con estos filtros no se recopilarán.                                                           |

Las etiquetas se añaden automáticamente a métricas basándose en el nombre real del MBean. Puedes especificar explícitamente etiquetas suplementarias. Por ejemplo, asumiendo que el siguiente MBean es expuesto por tu aplicación monitorizada:

```text
mydomain:attr0=val0,attr1=val1
```

Crearía una métrica llamada `mydomain` (o alguna variación según el atributo dentro del bean) con etiquetas: `attr0:val0, attr1:val1, domain:mydomain, simple:val0, raw_value:my_chosen_value, multiple:val0-val1`.

Si especificas un alias en una clave `include` con formato _camel case_, se convierte a _snake case_. Por ejemplo, `MyMetricName` aparece en Datadog como `my_metric_name`.

##### Descripción de los filtros

Cada diccionario `include` o `exclude` admite las siguientes claves:

| Clave                   | Descripción                                                                                                                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | Un nombre de dominio o lista de nombres de dominio, por ejemplo: `java.lang`.                                                                                                                                                        |
| `domain_regex`        | Un patrón de expresión regular (regex) o lista de patrones que coincidan con el nombre de dominio, por ejemplo: `java\.lang.*`.                                                                                                                              |
| `bean` o `bean_name` | Un nombre de bean o lista de nombres completos de bean, por ejemplo: `java.lang:type=Compilation`.                                                                                                                                      |
| `bean_regex`          | Un patrón de expresión regular (regex) o lista de patrones que coincidan con los nombres completos de los beans, por ejemplo: `java\.lang.*[,:]type=Compilation.*`. Puedes utilizar grupos de captura en tu expresión regular (regex) para suministrar como valores de etiqueta. Consulta el ejemplo de configuración anterior. |
| `class`               | Una clase de lista de nombres de clase, por ejemplo: `org.datadog.jmxfetch.SimpleTestJavaApp`.                                                                                                                                  |
| `class_regex`         | Un patrón de expresión regular (regex) o lista de patrones que coincidan con los nombres de las clases, por ejemplo: `org\.datadog\.jmxfetch\.SimpleTestJavaApp`.                                                                                                 |
| `exclude_tags`        | Un lista de claves de etiqueta para eliminar las métricas finales. Esto puede utilizarse para mejorar la cardinalidad de la etiqueta de métrica, por ejemplo: `["attr1", "id", "partition-id"]`.                                                            |
| `attribute`           | Una lista o un diccionario de nombres de atributos (consulta más abajo para más detalles).                                                                                                                                                 |

**Notas**:

- Las expresiones regulares (regex) definidas en `domain_regex` y `bean_regex` deben ajustarse al [formato de expresiones regulares de Java](https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example). Estos filtros fueron añadidos en la versión 5.5.0.
- Excepto los patrones de expresión regular (regex), todos los valores distinguen entre mayúsculas y minúsculas.

Además de estos parámetros, los filtros admiten claves "personalizadas" que permiten filtrar por parámetros de bean. Por ejemplo, si deseas recopilar métricas en relación con la caché de Cassandra, podrías utilizar el filtro `type: - Caches`:

```yaml
conf:
    - include:
          domain: org.apache.cassandra.db
          type:
              - Caches
```

#### Filtro de atributos

El filtro `attribute` puede aceptar dos tipos de valores:

- Un diccionario cuyas claves coinciden con los nombres de los atributos de destino:

  ```yaml
  conf:
      - include:
            attribute:
                maxThreads:
                    alias: tomcat.threads.max
                    metric_type: gauge
                currentThreadCount:
                    alias: tomcat.threads.count
                    metric_type: gauge
                bytesReceived:
                    alias: tomcat.bytes_rcvd
                    metric_type: counter
  ```

  - Puedes especificar un `alias` para el atributo que se convierte en el nombre de la métrica en Datadog.
  - También puedes especificar el tipo de métrica: `gauge`, `histogram`, `counter`/`rate` o `monotonic_count`. Si eliges `counter`, se calcula una `rate` por segundo para la métrica y se envía como `gauge`.

- Una lista de nombres de atributos de destino:

  ```yaml
  conf:
      - include:
            domain: org.apache.cassandra.db
            attribute:
                - BloomFilterDiskSpaceUsed
                - BloomFilterFalsePositives
                - BloomFilterFalseRatio
                - Capacity
                - CompressionRatio
                - CompletedTasks
                - ExceptionCount
                - Hits
                - RecentHitRate
  ```

  - El tipo de métrica es por defecto gauge.
  - El nombre de métrica es `jmx.<DOMAIN_NAME>.<ATTRIBUTE_NAME>`.

He aquí otro ejemplo de filtrado:

```yaml
instances:
    - host: 127.0.0.1
      name: jmx_instance
      port: 9999

init_config:
    conf:
        - include:
              bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
              attribute:
                  - OneMinuteRate
                  - 75thPercentile
                  - 95thPercentile
                  - 99thPercentile
```

#### Validación

[Ejecuta el subcomando de estado del Agent](https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example) y busca tu check de JMX en la sección JMXFetch.

Además, los checks de JMX tienen una configuración por defecto que recopila métricas de tu aplicación JMX. Comprueba el [Explorador de métricas](https://docs.datadoghq.com/agent/docker/integrations/?tab=file#configuration) en búsqueda de: `jvm.heap_memory`, `jvm.non_heap_memory` o `jvm.gc.cms.count`.

### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Consulta la documentación específica sobre cómo [configurar la recopilación de logs Java](https://docs.datadoghq.com/logs/log_collection/java/) para reenviar tus logs a Datadog.

### Recopilación de trazas

Luego de [activar la recopilación de trazas con tu Agent](https://docs.datadoghq.com/tracing/send_traces/), consulta la documentación exclusiva para [instrumentar tu aplicación Java](https://docs.datadoghq.com/tracing/setup/java/) para enviar sus trazas a Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **jvm.heap_memory** <br>(gauge) | Total de memoria heap Java utilizada.<br>_Se muestra como byte_ |
| **jvm.heap_memory_committed** <br>(gauge) | Total de memoria heap Java comprometida para su uso.<br>_Se muestra como byte_ |
| **jvm.heap_memory_init** <br>(gauge) | Total de memoria heap Java asignada.<br>_Se muestra como byte_ |
| **jvm.heap_memory_max** <br>(gauge) | Máxima memoria heap Java disponible.<br>_Se muestra como byte_ |
| **jvm.loaded_classes** <br>(gauge) | Número de clases cargadas actualmente.|
| **jvm.non_heap_memory** <br>(gauge) | Total de memoria no-heap Java utilizada. La memoria no-heap se calcula de la siguiente manera: `Metaspace + CompressedClassSpace + CodeCache`<br>_Se muestra como byte_ |
| **jvm.non_heap_memory_committed** <br>(gauge) | Total de memoria no-heap Java comprometida para su uso.<br>_Se muestra como byte_ |
| **jvm.non_heap_memory_init** <br>(gauge) | Memoria inicial no-heap Java asignada.<br>_Se muestra como byte_ |
| **jvm.non_heap_memory_max** <br>(gauge) | Máxima memoria no-heap Java disponible.<br>_Se muestra como byte_ |
| **jvm.thread_count** <br>(count) | Número de subprocesos activos.<br>_Se muestra como subproceso_ |
| **jvm.gc.cms.count** <br>(count) | El número total de recopilaciones de elementos no usados que se han producido.|
| **jvm.gc.major_collection_count** <br>(gauge) | El índice de las principales recopilaciones de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica.|
| **jvm.gc.minor_collection_count** <br>(gauge) | La tasa de recopilaciones secundarias de elementos no usados. Establece `new_gc_metrics: true` para recibir esta métrica.|
| **jvm.gc.parnew.time** <br>(gauge) | Tiempo acumulado aproximado de recopilación de basura transcurrido.<br>_Se muestra como milisegundo_ |
| **jvm.gc.major_collection_time** <br>(gauge) | Fracción de tiempo empleada en la recopilación de basura principal. Configura `new_gc_metrics: true` para recibir esta métrica.<br>_Se muestra como permille_. |
| **jvm.gc.minor_collection_time** <br>(gauge) | Fracción de tiempo empleada en la recopilación de basura menor. Configura `new_gc_metrics: true` para recibir esta métrica.<br>_Se muestra como permille_. |

### Checks de servicio

**jmx.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de máquina virtual Java (JVM) monitorizada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, crítico, advertencia_

## Solucionar problemas

Consulta la lista de [FAQ y comandos de resolución de problemas de JMX](https://docs.datadoghq.com/integrations/faq/troubleshooting-jmx-integrations/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}