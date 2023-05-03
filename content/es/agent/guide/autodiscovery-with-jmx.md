---
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

Aprovecha las anotaciones de Autodiscovery de integraciones o usa identificadores de contenedor de Autodiscovery para recopilar las métricas de tus aplicaciones JMX de tus pods en Kubernetes. Las anotaciones de Autodiscovery son la opción recomendada para configurar tu integración de Datadog y JMX. Si el conjunto de parámetros de configuración es demasiado largo y no cabe en las anotaciones, utiliza el método [Identificadores de contenedor de Autodiscovery](#autodiscovery-container-identifiers).

## Anotaciones de Autodiscovery

La lógica de las anotaciones de Autodiscovery consiste en aplicar los elementos de configuración para la verificación de JMX a tu pad a través de anotaciones para permitir que el Agent los "descubra automáticamente" y configure la verificación de JMX en consecuencia:

1. [Abre el Agent en tu clúster de Kubernetes][1] **con el nombre de imagen `gcr.io/datadoghq/agent:latest-jmx`** en lugar del `gcr.io/datadoghq/agent:latest` estándar.

2. Aplica las anotaciones de Autodiscovery a los contenedores donde está tu aplicación de JMX.

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: <POD_NAME>
        annotations:
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '["<INTEGRATION_NAME>"]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[{"host": "%%host%%","port":"<JMX_PORT>"}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[{"source":"<INTEGRATION_NAME>","service":"<INTEGRATION_NAME>"}]'
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
                  -Xms256m -Xmx6144m
                  -Dcom.sun.management.jmxremote
                  -Dcom.sun.management.jmxremote.authenticate=false
                  -Dcom.sun.management.jmxremote.ssl=false
                  -Dcom.sun.management.jmxremote.local.only=false
                  -Dcom.sun.management.jmxremote.port=<JMX_PORT>
                  -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
                  -Djava.rmi.server.hostname=$(POD_IP)
    ```

      Es necesario crear la variable del entorno `JAVA_OPTS`, de forma que el servidor JMX permita al Agent conectarse al registro RMI.

      **Nota**:
      - `<JMX_PORT>` hace referencia al puerto que expone las métricas de JMX.
      - En el ejemplo anterior, la conexión al registro RMI no está en SSL. Si quieres usar SSL, añade `"rmi_registry_ssl": true` a la anotación `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances` y elimina el correspondiente `Dcom.sun.management.jmxremote` de `JAVA_OPTS`.

La lista de integraciones listas para JMX con el nombre `<INTEGRATION_NAME>` son:

- [activemq][2]
- [cassandra][3]
- [confluent_platform][4]
- [hive][5]
- [jboss_wildfly][6]
- [kafka][7]
- [solr][8]
- [presto][9]
- [tomcat][10]

Por ejemplo, si tienes un tomcat ejecutándose que expone sus métricas JMX en el puerto `9012`, haz lo siguiente:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: tomcat-test
    annotations:
        ad.datadoghq.com/tomcat.check_names: '["tomcat"]'
        ad.datadoghq.com/tomcat.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
        ad.datadoghq.com/tomcat.instances: '[{"host": "%%host%%","port":"9012"}]'
        ad.datadoghq.com/tomcat.logs: '[{"source":"Tomcat","service":"Tomcat"}]'

spec:
    containers:
        - name: tomcat
          image: tomcat:8.0
          imagePullPolicy: Always
          ports:
              - containerPort: 9012
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP

            - name: JAVA_OPTS
              value: >-
                -Xms256m -Xmx6144m
                -Dcom.sun.management.jmxremote
                -Dcom.sun.management.jmxremote.authenticate=false
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.local.only=false
                -Dcom.sun.management.jmxremote.port=9012
                -Dcom.sun.management.jmxremote.rmi.port=9012
                -Djava.rmi.server.hostname=$(POD_IP)
```

## Identificadores de contenedor de Autodiscovery

Si necesitas una configuración más compleja para tu integración de Datadog y JMX, utiliza los [identificadores de contenedor de Autodiscovery][11] para pasar el archivo de configuración de integraciones personalizado o el archivo `metrics.yaml` personalizado.

### Preparación del Agent

Elige si tu Agent se ejecuta como un contenedor en tu clúster o directamente en tu host:

{{< tabs >}}
{{% tab "Container Agent" %}}

Si tu Agent se ejecuta en tu clúster y quieres descubrir automáticamente tu contenedor para recopilar métricas de JMX:

1. Asegúrate de ejecutar la imagen del Agent **`gcr.io/datadoghq/agent:latest-jmx`** en lugar de la imagen estándar `gcr.io/datadoghq/agent:latest`.

2. Obtén los archivos de configuración `conf.yaml` y `metrics.yaml` asociados a tu integración. A continuación tienes la lista de integraciones basada en Datadog y JMX con sus archivos asociados:

    | Nombre de la integración             | Archivo de métricas       | Archivo de configuración      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][1]           | [metrics.yaml][2]  | [conf.yaml.example][3]  |
    | [cassandra][4]          | [metrics.yaml][5]  | [conf.yaml.example][6]  |
    | [confluent_platform][7] | [metrics.yaml][8]  | [conf.yaml.example][9] |
    | [hive][10]              | [metrics.yaml][11] | [conf.yaml.example][12] |
    | [jboss_wildfly][13]     | [metrics.yaml][14] | [conf.yaml.example][15] |
    | [kafka][16]             | [metrics.yaml][17] | [conf.yaml.example][18] |
    | [solr][19]              | [metrics.yaml][20] | [conf.yaml.example][21] |
    | [presto][22]            | [metrics.yaml][23] | [conf.yaml.example][24] |
    | [tomcat][25]            | [metrics.yaml][26] | [conf.yaml.example][27] |

3. Cambia el nombre del archivo `conf.yaml.example` a `conf.yaml`.

4. Sustituye los valores de los parámetros de `conf.yaml` para que se ajusten a la lógica de Autodiscovery del Agent. Los archivos de configuración tienen valores de parámetros de host predeterminados, así que utiliza la lógica de [variables de plantilla de Autodiscovery][28]. En el siguiente ejemplo de verificación de Tomcat, el valor del parámetro `host` pasa de ser `localhost` a `%%host%%`:

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

5. Para especificar al Agent que quieres aplicar este archivo de configuración a tu contenedor de aplicaciones, configura un parámetro `ad_identifiers` al principio de tu archivo `conf.yaml`:

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Nota**: El ejemplo anterior utiliza un valor `ad_identifers` personalizado, pero puedes especificar la [imagen corta del contenedor][29] como `ad_identifiers` si es necesario.

6. Monta estos archivos de configuración (`conf.yaml` y `metrics.yaml`) en la carpeta `conf.d/<INTEGRATION_NAME>.d/` de tu Agent.

7. (Opcional) - Si no puedes montar esos archivos en el contenedor del Agent (como en AWS ECS), tendrás que volver a compilar la imagen del Docker del Agent con esos dos archivos de configuración dentro:

    ```conf
    FROM gcr.io/datadoghq/agent:latest-jmx
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

    Después, utiliza esta nueva imagen personalizada como Agent contenedorizado estándar.

[1]: /es/integrations/activemq/
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: /es/integrations/cassandra/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /es/integrations/confluent_platform/
[8]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[10]: /es/integrations/hive/
[11]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[13]: /es/integrations/jboss_wildfly/
[14]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[16]: /es/integrations/kafka/
[17]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[19]: /es/integrations/solr/
[20]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[22]: /es/integrations/presto/
[23]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[25]: /es/integrations/tomcat/
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[28]: /es/agent/faq/template_variables/
[29]: /es/agent/guide/ad_identifiers/#short-image-container-identifiers
{{% /tab %}}
{{% tab "Agent de host" %}}

Si tu Agent se ejecuta en un host y quieres descubrir automáticamente tu contenedor para recopilar métricas de JMX:

1. [Activar Autodiscovery para tu Agent][1].

2. Activa la integración de JMX que quieres usar cambiando el nombre del archivo `conf.yaml.example` correspondiente a `conf.yaml` en el [directorio de integraciones del Agent][2]. Por ejemplo, para tomcat, deberías cambiar el nombre de`/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example` a: `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

3. Sustituye los valores de los parámetros de `conf.yaml` para que se ajusten a la lógica de Autodiscovery del Agent. Los archivos de configuración tienen valores de parámetros de host predeterminados, así que utiliza las [variables de plantilla de Autodiscovery][3]. En el siguiente ejemplo de configuración de Tomcat, el valor del parámetro `host` pasa de ser `localhost` a `%%host%%`:

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

4. Para especificar al Agent que quieres aplicar este archivo de configuración a tus contenedores de aplicaciones, configura un parámetro `ad_identifiers` al principio de tu archivo `conf.yaml`:

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Nota**: El ejemplo anterior utiliza un valor `ad_identifers` personalizado, pero puedes especificar la [imagen corta del contenedor][4] como `ad_identifiers` si es necesario.
5. [Reinicia tu Agent][5]

[1]: /es/getting_started/agent/autodiscovery/#with-the-agent-on-a-host
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /es/agent/faq/template_variables/
[4]: /es/agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /es/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Preparación del contenedor

#### Docker

Una vez que el Agent esté configurado y ejecutándose, usa la etiqueta `com.datadoghq.ad.check.id:"<CUSTOM_AD_IDENTIFIER>"` para que tu contenedor de aplicaciones aplique la configuración de verificación a través de Autodiscovery:

**Archivo de Docker**:

```yaml
LABEL "com.datadoghq.ad.check.id"= '<CUSTOM_AD_IDENTIFIER>'
```

**docker-compose.yaml**:

```yaml
labels:
    com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check.id= '<CUSTOM_AD_IDENTIFIER>'
```

**Docker Swarm**:

Cuando uses el modo Swarm para Docker Cloud, las etiquetas deberán aplicarse a la imagen:

```yaml
version: '1.0'
services:
# ...
project:
    image: '<IMAGE_NAME>'
    labels:
        com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**Nota**: Si el Agent y tu contenedor de JMX están en el mismo puente de red, tendrás que crear una instancia de tu servidor JMX con  `-Djava.rmi.server.hostname=<CONTAINER_NAME>"` where `<CONTAINER_NAME>` es el nombre de tu contenedor de aplicaciones JMX.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/
[2]: /es/integrations/activemq/
[3]: /es/integrations/cassandra/
[4]: /es/integrations/confluent_platform/
[5]: /es/integrations/hive/
[6]: /es/integrations/jboss_wildfly/
[7]: /es/integrations/kafka/
[8]: /es/integrations/solr/
[9]: /es/integrations/presto/
[10]: /es/integrations/tomcat/
[11]: /es/agent/guide/ad_identifiers/