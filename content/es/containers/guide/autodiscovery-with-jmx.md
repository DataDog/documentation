---
aliases:
- /es/agent/guide/autodiscovery-with-jmx
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
- link: /agent/guide/ad_identifiers/
  tag: Documentación
  text: Usa la plantilla de integración correspondiente a cada contenedor
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna y recopila las etiquetas (tags) de tu aplicación dinámicamente
kind: guía
title: Autodiscovery con JMX
---

En los entornos contenedorizados, existen algunas diferencias en la forma en que el Agent se conecta al servidor JMX. Las funciones de Autodiscovery permiten configurar dinámicamente estas integraciones. Utiliza integraciones basadas en JMX de Datadog para recopilar métricas de aplicaciones JMX de tus pods en Kubernetes. 

Si utilizas el trazador de Java para tus aplicaciones, puedes aprovechar la función [métricas de ejecución de Java][2] para enviar estas métricas al Agent.

## Instalación

### Utilizar un Agent habilitado por JMX
Las utilidades JMX no están instaladas por defecto en el Agent. Para configurar una integración JMX, añade `-jmx` to your Agent's image tag. For example, `gcr.io/datadoghq/agent:latest-jmx`.

Si utilizas Datadog Operator o Helm, las siguientes configuraciones añaden `-jmx` a la etiqueta de imagen de Agent:

{{< tabs >}}
{{% tab "Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agents:
  image:
    tagSuffix: jmx
```
{{% /tab %}}
{{< /tabs >}}



## Configuración

Utiliza uno de los siguientes métodos:

- [Anotaciones de Autodiscovery](#autodiscovery-annotations) (recomendado)
- [Archivos de configuración de Autodiscovery](#autodiscovery-configuration-files): para una amplia personalización de los parámetros de configuración

### Anotaciones de Autodiscovery

En este método, se aplica una configuración de check de JMX utilizando anotaciones en tus pods basados en Java. Esto permite al Agent configurar automáticamente el check de JMX cuando se inicia un nuevo contenedor. Asegúrate de que estas anotaciones están en el pod creado, y no en el objeto (Deployment, DaemonSet, etc.) que crea el pod. 

Utiliza la siguiente plantilla para las anotaciones de Autodiscovery:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <POD_NAME>
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "<JMX_PORT>"
          }]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
      # (...)
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=<JMX_PORT>
            -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
            -Djava.rmi.server.hostname=$(POD_IP)
```

En este ejemplo:
- `<POD_NAME>` es el nombre de tu pod.
- `<CONTAINER_IDENTIFIER>` coincide con el contenedor deseado dentro de tu pod.
- `<INTEGRATION_NAME>` es el nombre de la integración de JMX deseada. Consulta la lista de [integraciones de JMX disponibles](#available-jmx-integrations).
- Configura `<JMX_PORT>` como desees, siempre que coincida entre las anotaciones y `JAVA_OPTS`.

Con esta configuración, el Datadog Agent descubre este pod y hace una solicitud al servidor JMX sobre la [variable de plantilla de Autodiscovery][3] `%%host%%`; esta solicitud resuelve a la dirección IP del pod descubierto. Esta es la razón por la que `java.rmi.server.hostname` se establece en la dirección `POD_IP` previamente rellenada con la [API descendente de Kubernetes][5].

**Nota**: La variable de entorno `JAVA_OPTS` se utiliza habitualmente en las imágenes de contenedor basadas en Java como parámetro de inicio (por ejemplo, `java $Java_OPTS -jar app.jar`). Si utilizas una aplicación personalizada, o si tu aplicación no sigue este patrón, establece estas propiedades del sistema manualmente.


#### Ejemplo de anotación: Tomcat
La siguiente configuración ejecuta la integración de JMX de [Tomcat][81] contra el puerto `9012`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: tomcat-test
  annotations:
    ad.datadoghq.com/tomcat.checks: |
      {
        "tomcat": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "9012"
          }]
        }
      }
spec:
  containers:
    - name: tomcat
      image: tomcat:8.0
      imagePullPolicy: Always
      ports:
        - name: jmx-metrics
          containerPort: 9012
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=9012
            -Dcom.sun.management.jmxremote.rmi.port=9012
            -Djava.rmi.server.hostname=$(POD_IP)
```

#### Plantilla de anotación de métrica personalizada 
Si necesitas recopilar métricas adicionales de estas integraciones, añádelos a la sección `init_config`:

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": {
        "is_jmx": true,
        "collect_default_metrics": true,
        "conf": [{
          "include": {
            "domain": "java.lang",
            "type": "OperatingSystem",
            "attribute": {
               "FreePhysicalMemorySize": {
                 "metric_type": "gauge",
                 "alias": "jvm.free_physical_memory"
               } 
            }
          }
        }]
      },
      "instances": [{
        "host": "%%host%%",
        "port": "<JMX_PORT>"
      }]
    }
  }
```          

Consulta la documentación de la [integración de JMX][6] para obtener más información sobre el formato de estas métricas.

### Archivos de configuración de Autodiscovery

Si necesitas pasar una configuración personalizada más compleja para tu integración de Datadog y JMX, puedes utilizar [Identificadores de contenedor de Autodiscovery][1] para pasar archivos de configuración de integración personalizada, así como un archivo `metrics.yaml` personalizado.

#### 1. Componer el archivo de configuración

Cuando se utiliza este método, el Agent necesita un archivo de configuración y un archivo opcional `metrics.yaml` para que las métricas los recopile. Estos archivos pueden montarse en el pod del Agent o incorporarse a la imagen del contenedor. 

La convención de nomenclatura de archivos de configuración consiste en identificar primero el nombre de la integración deseada a partir de los [pasos previos de las integraciones disponibles](#available-jmx-integrations). Una vez determinado esto, el Agent necesita un archivo de configuración con un nombre relativo a esa integración; _o_ dentro del directorio de configuración de la integración.

Por ejemplo, para la integración de [Tomcat][81], cree _alguna de las siguientes opciones_:
- `/etc/datadog-agent/conf.d/tomcat.yaml`o
- `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

Si utilizas un archivo `metrics.yaml` personalizado, inclúyelo en el directorio de configuración de la integración. (Por ejemplo: `/etc/datadog-agent/conf.d/tomcat.d/metrics.yaml`).

Este archivo de configuración debe incluir `ad_identifiers`:

```yaml
ad_identifiers:
  - "<SHORT_IMAGE>"

init_config:
  is_jmx: true
  conf:
    <METRICS_TO_COLLECT>

instances:
  - host: "%%host%%"
    port: "<JMX_PORT>"
```

Sustituye `<SHORT_IMAGE>` por el nombre corto de imagen de tu contenedor deseado. Por ejemplo, la imagen de contenedor `gcr.io/CompanyName/my-app:latest` tiene un nombre de imagen corto `my-app`. Como el Datadog Agent descubre ese contenedor, establece la configuración de JMX como se describe en este archivo.

También puedes hacer referencia y especificar [identificadores personalizados para tus contenedores][4] si no deseas basarte en el nombre corto de la imagen.

Al igual que las anotaciones de Kubernetes, los archivos de configuración pueden utilizar [Variables de plantilla de Autodiscovery][3]. En este caso, la configuración del `host` utiliza `%%host%%` para resolver a la dirección IP del contenedor descubierto.

Consulta la documentación de la [integración de JMX][6] (así como las [configuraciones de ejemplo para las integraciones recibidas previamente](#available-jmx-integrations)) para obtener más información sobre cómo estructurar tu configuración `init_config` y `instances` para `<METRICS_TO_COLLECT>`.

#### 2. Montar el archivo de configuración 
{{< tabs >}}
{{% tab "Operator" %}}

Si utilizas Datadog Operator, añade una anulación:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - "<SHORT_IMAGE>"

            init_config:
              is_jmx: true

            instances:
              - host: "%%host%%"
                port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Helm" %}}

En Helm, utiliza la opción `datadog.confd`:

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |
      ad_identifiers:
        - "<SHORT_IMAGE>"

      init_config:
        is_jmx: true

      instances:
        - host: "%%host%%"
          port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Custom image" %}}
Si no puedes montar estos archivos en el contenedor del Agent (por ejemplo, en Amazon ECS) puedes crear una imagen de Docker del Agent que contenga los archivos de configuración deseados.

Por ejemplo:

```Dockerfile
FROM gcr.io/datadoghq/agent:latest-jmx
COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
```

A continuación, utiliza esta nueva imagen personalizada como tu Agent normal contenedorizado.
{{% /tab %}}

{{< /tabs >}}

#### 3. Exponer servidor de JMX
Configura el servidor de JMX de forma que el Agent pueda acceder a él:

```yaml
spec:
  containers:
    - # (...)
      env:
      - name: POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: JAVA_OPTS
        value: >-
          -Dcom.sun.management.jmxremote
          -Dcom.sun.management.jmxremote.authenticate=false
          -Dcom.sun.management.jmxremote.ssl=false
          -Dcom.sun.management.jmxremote.local.only=false
          -Dcom.sun.management.jmxremote.port=<JMX_PORT>
          -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
          -Djava.rmi.server.hostname=$(POD_IP)   
```          

## Integraciones de JMX disponibles
El Datadog Agent viene con varias integraciones de JMX preconfiguradas.

| Nombre de la integración         | Archivo de métricas       | Archivo de configuración      |
|--------------------------|--------------------|-------------------------|
| [activemq][41]           | [metrics.yaml][42] | [conf.yaml.example][43] |
| [cassandra][44]          | [metrics.yaml][45] | [conf.yaml.example][46] |
| [confluent_platform][47] | [metrics.yaml][48] | [conf.yaml.example][49] |
| [hazelcast][50]          | [metrics.yaml][51] | [conf.yaml.example][52] |
| [hive][53]               | [métricas.yaml][54] | [conf.yaml.example][55] |
| [hivemq][56]             | [metrics.yaml][57] | [conf.yaml.example][58] |
| [hudi][59]               | [metrics.yaml][60] | [conf.yaml.example][61] |
| [ignite][62]             | [metrics.yaml][63] | [conf.yaml.example][64] |
| [jboss_wildfly][66]      | [metrics.yaml][67] | [conf.yaml.example][68] |
| [kafka][69]              | [metrics.yaml][70] | [conf.yaml.example][71] |
| [presto][72]             | [metrics.yaml][73] | [conf.yaml.example][74] |
| [solr][75]               | [metrics.yaml][76] | [conf.yaml.example][77] |
| [sonarqube][78]          | [metrics.yaml][79] | [conf.yaml.example][80] |
| [tomcat][81]             | [metrics.yaml][82] | [conf.yaml.example][83] |
| [weblogic][84]           | [metrics.yaml][85] | [conf.yaml.example][86] |

Cada integración de la tabla anterior tiene un archivo `metrics.yaml` predefinido para coincidir con el patrón esperado de las métricas de JMX devueltas por aplicación. Utiliza los nombres de integración de la lista como `<INTEGRATION_NAME>` en tus anotaciones de Autodiscovery o archivos de configuración.

También puedes utilizar `jmx` como tu `<INTEGRATION_NAME>` para configurar una integración de JMX básica y recopilar solo las métricas `jvm.*` predeterminadas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/guide/ad_identifiers/?tab=kubernetes
[2]: /es/tracing/metrics/runtime_metrics/java/
[3]: /es/containers/guide/template_variables/
[4]: /es/containers/guide/ad_identifiers/?tab=kubernetes#custom-autodiscovery-container-identifiers
[5]: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/
[6]: /es/integrations/java/
[41]: /es/integrations/activemq/
[42]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[44]: /es/integrations/cassandra/
[45]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[47]: /es/integrations/confluent_platform/
[48]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[50]: /es/integrations/hazelcast/
[51]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/metrics.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[53]: /es/integrations/hive/
[54]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[56]: /es/integrations/hivemq/
[57]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/metrics.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[59]: /es/integrations/hudi/
[60]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/metrics.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[62]: /es/integrations/ignite/
[63]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/metrics.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[66]: /es/integrations/jboss_wildfly/
[67]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[69]: /es/integrations/kafka/
[70]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[72]: /es/integrations/presto/
[73]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[75]: /es/integrations/solr/
[76]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[78]: /es/integrations/sonarqube/
[79]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[81]: /es/integrations/tomcat/
[82]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[84]: /es/integrations/weblogic/
[85]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/metrics.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example