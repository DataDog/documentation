---
categories:
- languages
- network
- oracle
- tracing
custom_kind: integration
dependencies: []
description: Recopila métricas personalizadas de tus aplicaciones usando la biblioteca
  de métricas de Yammer.
doc_link: https://docs.datadoghq.com/integrations/java/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
  tag: FAQ
  text: Tengo un Bean coincidente para mi integración de JMX, pero no tengo nada en
    Collect.
- link: https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: FAQ
  text: Visualiza los datos de JMX en jConsole y configura tu jmx.yaml para recopilarlos
- link: https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/
  tag: FAQ
  text: 'jmx.yaml error: Include Section'
- link: https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/
  tag: FAQ
  text: Recopilación de atributos de JMX de tipo compuesto
- link: https://docs.datadoghq.com/integrations/guide/running-jmx-commands-in-windows/
  tag: Guía
  text: Ejecutar comandos de JMX en Windows
- link: https://docs.datadoghq.com/integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags/
  tag: Guía
  text: Utiliza expresiones regulares de Bean para filtrar tus métricas de JMX y suministrar
    etiquetas adicionales
git_integration_title: java
has_logo: true
integration_id: java
integration_title: JMX
integration_version: ''
is_public: true
manifest_version: '1.0'
name: java
public_title: Integración de Datadog y JMX
short_description: Recopila métricas personalizadas de tus aplicaciones usando la
  biblioteca de métricas de Yammer.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración de Java te permite recopilar métricas, trazas (traces) y logs desde tu aplicación de Java.

## Configuración

### Recopilación de métricas
<div class="alert alert-warning">
Los checks de JMX tiene un límite de 350 métricas por instancia. Consulta <a href="/integrations/java/?tab=host#configuration-options">las opciones de configuración</a>. Si necesitas más métricas, ponte en contacto con <a href="https://docs.datadoghq.com/help/">el soporte de Datadog.</a>
</div>

Si tu aplicación expone métricas de [JMX][1], un complemento ligero de Java llamado JMXFetch (sólo compatible con Java >= 1.7.) es llamado por el Datadog Agent para conectar con el servidor MBean y recopilar tus métricas de aplicación. También envía checks de servicio que informan sobre el estado de tus instancias monitorizadas. Este complemento envía métricas al Datadog Agent utilizando el servidor [DogStatsD][2] que se ejecuta dentro de Agent. Estas integraciones también utilizan las métricas de JMX:

- ActiveMQ
- Cassandra
- Solr
- Tomcat
- Kafka

**Nota**: Al enviar un tipo de métrica RATE (TASA) a través de DogStatsD, la métrica aparece como GAUGE en la aplicación para garantizar una comparación pertinente entre diferentes Agents. Para obtener más información, consulta la [documentación de envío de métricas: DogStatsD][3].

#### Instalación

Asegúrate de que [puedes abrir una conexión remota de JMX][4]. Se necesita una conexión remota para que Datadog Agent se conecte a la JVM, incluso cuando las dos están en el mismo host. Por razones de seguridad, es recomendado no utilizar `0.0.0.0` para la dirección de escucha, y utilizar `com.sun.management.jmxremote.host=127.0.0.1` para una JVM y Agent colocados.

#### Configuración

Si ejecutas el Agent como un binario en un host, configura tu check de JMX como cualquier [otra integración del Agent][5]. Si ejecutas el Agent como DaemonSet en Kubernetes, configura tu check de JMX utilizando [auto-discovery][6].

{{< tabs >}}
{{% tab "Host" %}}

- Configurar el Agent para conectarte a JMX. Edita `jmx.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][1]. Consulta las [opciones de configuración](#configuration-options) más abajo o ve las plantillas [init_config][2] e [instance][3] para todas las opciones disponibles de configuración.

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

- [Reiniciar el Agent][4]

**Nota**: Para ejecutar más de un check de JMX, crea archivos de configuración con el formato `jmx_<INDEX>.d/conf.yaml`, por ejemplo: `jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc. Cada carpeta debe almacenarse en el directorio `conf.d`, con la opción `is_jmx` establecida en `true` en el archivo de configuración.


[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

La imagen estándar `gcr.io/datadoghq/agent:latest` para ejecutar el [contenedor del Datadog Agent][1] no tiene JMX instalado. **Utiliza la imagen `gcr.io/datadoghq/agent:latest-jmx`**, esta imagen está basada en `gcr.io/datadoghq/agent:latest`, pero incluye una JVM, que el Agent necesita para ejecutar [jmxfetch][2].

Para ejecutar un check de JMX en uno de tus contenedores:

1. Crea un archivo de configuración del check de JMX haciendo referencia al [host](?tab=host), o utilizando un archivo de configuración del check de JMX para una de las integraciones de Datadog compatibles oficialmente:

    - [ActiveMQ][2]
    - [Cassandra][3]
    - [Solr][4]
    - [Tomcat][5]
    - [Kafka][6]

2. Integra este archivo dentro de la carpeta `conf.d/` de tu Datadog Agent: `-v <HOST_FOLDER_PATH>:/conf.d`. Consulta la documentación de [Configuración de plantillas de check][7] para obtener más información.

**Nota**: El uso de `%%port%%` ha demostrado generar problemas en la práctica. Si experimentas algún problema, la mejor solución es sustituir `%%port%%` por un puerto de JMX codificado.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/docker/integrations/?tab=file#configuration
{{% /tab %}}
{{< /tabs >}}

##### Opciones de configuración

| Opción                                        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | No       | Permite especificar jars personalizados que se añaden a la ruta de clase de la JVM del Agent.                                                                                                                                                                                                                                                                                                                                       |
| `jmx_url`                                     | No       | Si el Agent necesita conectarse a una URL de JMX no predeterminada, especifícala aquí en lugar de un host y el puerto. Si utilizas esto, deberás especificar un `name` para la instancia.                                                                                                                                                                                                                                                      |
| `is_jmx`                                      | No       | Permite crear archivos de configuración diferentes para cada aplicación en lugar de utilizar un único archivo de JMX largo. Incluye la opción en cada archivo de configuración como se explica en la nota de la sección [Configuración](#configuration).                                                                                                                                                                                   |
| `collect_default_jvm_metrics`                 | No       | Indica la integración que recopila las métricas de JVM por defecto (`jvm.*`). Por defecto es true. </br>      **Nota**: Si estás utilizando una integración que no necesita métricas de JMX específicas, establece `collect_default_jvm_metrics: false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `collect_default_metrics`                     | No       | Cada integración contiene un archivo `metrics.yaml` que incluye un lista de beans por defecto a recopilar. Configurando esto en `True` automáticamente recopila esas métricas sin agregarlas de forma explícita al archivo yaml. Esto se utiliza en general para la configuración con Autodiscovery a fin de reducir el tamaño del objeto de configuración. Esto no es aplicable para recopilar [métricas de JMX con el Java Tracing Agent][7]. |
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
| `tools_jar_path`                              | No       | Debe establecerse cuando se configura `process_name_regex`.                                                                                                                                                                                                                                                                                                                                                                             |
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

Si especifica un alias en una clave `include` con formato _camel case_, se convierte a _snake case_. Por ejemplo, `MyMetricName` aparece en Datadog como `my_metric_name`.

##### Descripción de los filtros

Cada diccionario `include` o `exclude` admite las siguientes claves:

| Clave                   | Descripción                                                                                                                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | Un nombre de dominio o lista de nombres de dominio, por ejemplo: `java.lang`.                                                                                                                                                        |
| `domain_regex`        | Un patrón de expresión regular o lista de patrones que coincidan con el nombre de dominio, por ejemplo: `java\.lang.*`.                                                                                                                              |
| `bean` o `bean_name` | Un nombre de bean o lista de nombres completos de bean, por ejemplo: `java.lang:type=Compilation`.                                                                                                                                      |
| `bean_regex`          | Un patrón de expresión regular o lista de patrones que coincidan con los nombres completos de los beans, por ejemplo: `java\.lang.*[,:]type=Compilation.*`. Puedes utilizar grupos de captura en tu expresión regular para suministrar como valores de etiqueta. Consulta el ejemplo de configuración anterior. |
| `class`               | Una clase de lista de nombres de clase, por ejemplo: `org.datadog.jmxfetch.SimpleTestJavaApp`.                                                                                                                                  |
| `class_regex`         | Un patrón de expresión regular o lista de patrones que coincidan con los nombres de las clases, por ejemplo: `org\.datadog\.jmxfetch\.SimpleTestJavaApp`.                                                                                                 |
| `exclude_tags`        | Un lista de claves de etiqueta para eliminar las métricas finales. Esto puede utilizarse para mejorar la cardinalidad de la etiqueta de métrica, por ejemplo: `["attr1", "id", "partition-id"]`.                                                            |
| `attribute`           | Una lista o un diccionario de nombres de atributos (consulta más abajo para más detalles).                                                                                                                                                 |

**Notas**:

- Las expresiones regulares definidas en `domain_regex` y `bean_regex` deben ajustarse al [formato de expresión regular de Java][8]. Estos filtros se añadieron en la versión 5.5.0.
- Excepto los patrones de expresión regular, todos los valores distinguen entre mayúsculas y minúsculas.

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

    - Puedes especificar un `alias` para el atributo que se convierte en el nombre de métrica en Datadog.
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

[Ejecuta el subcomando de estado del Agent][9] y busca tu check de JMX en la sección JMXFetch.

Además, los checks de JMX tienen una configuración predeterminada que recopila métricas de tu aplicación de JMX. Consulta el [Metric Explorer][10] para: `jvm.heap_memory`, `jvm.non_heap_memory`, o `jvm.gc.cms.count`.

### APM

Disponible para el Agent v6.0+_

Consulta la documentación específica sobre cómo [configurar la recopilación de logs de Java][11] para reenviar tus logs a Datadog.

### Recopilación de trazas

Después de [habilitar la recopilación de trazas con tu Agent][12], consulta la documentación dedicada a [instrumentar tu aplicación Java ][13] para enviar tus trazas a Datadog.

## Datos recopilados

### Métricas

{{< get-metrics-from-git >}}

**Nota**: Establece `new_gc_metrics: true` en tu [jmx.d/conf.yaml][14] para reemplazar las siguientes métricas:

```text
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

### Checks de servicio
{{< get-service-checks-from-git "java" >}}


## Resolución de problemas

Consulta la lista de [comandos para solucionar problemas de JMX y preguntas frecuentes][16].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/es/developers/dogstatsd
[3]: https://docs.datadoghq.com/es/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: https://docs.oracle.com/en/java/javase/14/management/monitoring-and-management-using-jmx-technology.html
[5]: https://docs.datadoghq.com/es/getting_started/integrations/#setting-up-an-integration
[6]: https://docs.datadoghq.com/es/containers/guide/autodiscovery-with-jmx/?tab=operator
[7]: https://docs.datadoghq.com/es/tracing/setup_overview/setup/java/#ddjmxfetchconfigdir-and-ddjmxfetchconfig
[8]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/metrics/explorer/
[11]: https://docs.datadoghq.com/es/logs/log_collection/java/
[12]: https://docs.datadoghq.com/es/tracing/send_traces/
[13]: https://docs.datadoghq.com/es/tracing/setup/java/
[14]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example
[15]: https://github.com/DataDog/dogweb/blob/prod/integration/java/service_checks.json
[16]: https://docs.datadoghq.com/es/integrations/faq/troubleshooting-jmx-integrations/