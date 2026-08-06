---
"app_id": "solr"
"app_uuid": "3733c24e-8466-4f3b-8411-59ef85c28302"
"assets":
  "dashboards":
    "solr": "assets/dashboards/solr_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "solr.searcher.numdocs"
      "metadata_path": "metadata.csv"
      "prefix": "solr."
    "process_signatures":
    - "solr start"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "42"
    "source_type_name": "Solr"
  "saved_views":
    "solr_processes": "assets/saved_views/solr_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/solr/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "solr"
"integration_id": "solr"
"integration_title": "Solr"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "solr"
"public_title": "Solr"
"short_description": "Monitoriza tasa de solicitudes, errores de gestor, fallos de caché y desalojos y más."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Monitoriza tasa de solicitudes, errores de gestor, fallos de caché y desalojos y más."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Solr"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Gráfico de Solr][1]

## Información general

El check de Solr realiza un seguimiento del estado y el rendimiento de un clúster de Solr. Recopila métricas del número de documentos indexados, los aciertos y desalojos de la caché, los tiempos medios de solicitud, las solicitudes medias por segundo, etc.

## Configuración

### Instalación

El check de Solr está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus nodos de Solr.

Este check está basado en JMX, por lo que necesitas habilitar JMX Remote en tus servidores de Solr. Consulta la [documentación del check de JMX][3] para obtener más información.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `solr.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [solr.d/conf.yaml de ejemplo][2].

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
     ## Solr host to connect to.
     - host: localhost

       ## @param port - integer - required
       ## Solr port to connect to.
       port: 9999
   ```

2. [Reinicia el Agent][3].

#### Lista de métricas

El parámetro `conf` es una lista de métricas que recopilará la integración. Solo se admiten 2 claves:

- `include` (**obligatorio**): un diccionario de filtros, cualquier atributo que coincida con estos filtros se recopila a menos que también coincida con los filtros `exclude` (ver más abajo).
- `exclude` (**opcional**): un diccionario de filtros, los atributos que coinciden con estos filtros no se recopilan.

Para un bean dado, las métricas se etiquetan de la siguiente manera:

```text
mydomain:attr0=val0,attr1=val1
```

En este ejemplo, tu métrica es `mydomain` (o alguna variación según el atributo dentro del bean) y tiene las etiquetas `attr0:val0`, `attr1:val1` y `domain:mydomain`.

Si especificas un alias en una clave `include` con formato _camel case_, se convierte a _snake case_. Por ejemplo, `MyMetricName` aparece en Datadog como `my_metric_name`.

##### El filtro de atributos

El filtro `attribute` puede aceptar dos tipos de valores:

- Un diccionario cuyas claves son nombres de atributos (ver más adelante). Para este caso, puedes especificar un alias para la métrica que se convierte en el nombre de métrica en Datadog. También puedes especificar el tipo de métrica como gauge o count. Si eliges count, se calcula una tasa por segundo para la métrica.

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

- Una lista de nombres de atributos (ver más abajo). Para este caso, el tipo de métrica es un gauge y el nombre de métrica es `jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]`.

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

#### Versiones anteriores

La lista de filtros solo se admite en el Datadog Agent > 5.3.0. Si utilizas una versión anterior, utiliza singletons y varias sentencias `include` en su lugar.

```yaml
# Datadog Agent > 5.3.0
  conf:
    - include:
      domain: domain_name
      bean:
        - first_bean_name
        - second_bean_name
# Older Datadog Agent versions
  conf:
    - include:
      domain: domain_name
      bean: first_bean_name
    - include:
      domain: domain_name
      bean: second_bean_name
```

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][1].

##### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

      ```yaml
       logs_enabled: true
     ```

2. Solr utiliza el registrador `log4j` por defecto. Para personalizar el formato de registro, edita el archivo [`server/resources/log4j2.xml`][2]. Por defecto, el pipeline de la integración de Datadog admite el siguiente [patrón][3] de conversión:

   ```text
   %maxLen{%d{yyyy-MM-dd HH:mm:ss.SSS} %-5p (%t) [%X{collection} %X{shard} %X{replica} %X{core}] %c{1.} %m%notEmpty{ =>%ex{short}}}{10240}%n
   ```

    Clona y edita el [pipeline de integración][4] si tienes un formato diferente.


3. Anula los comentarios y edita el bloque de configuración de logs en tu archivo `solr.d/conf.yaml`. Cambia los valores de los parámetros `type`, `path` y `service` en función de tu entorno. Consulta [solr.d/solr.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración.

      ```yaml
       logs:
         - type: file
           path: /var/solr/logs/solr.log
           source: solr
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

4. [Reinicia el Agent][6].

Para habilitar logs para entornos de Kubernetes, consulta [Recopilación de log de Kubernetes][7].

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://lucene.apache.org/solr/guide/configuring-logging.html#permanent-logging-settings
[3]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[4]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[5]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `solr` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "solr" >}}


### Eventos

El check de Solr no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "solr" >}}


## Solucionar problemas

### Comandos para ver las métricas disponibles

El comando `datadog-agent jmx` se añadió en la versión 4.1.0.

- Mostrar una lista de atributos que coincidan con, al menos, una de tus configuraciones de instancias:
  `sudo datadog-agent jmx list matching`
- Mostrar una lista de atributos que coinciden con una de tus configuraciones de instancias, pero no se recopilan porque se superaría el número de métricas que es posible recopilar.
  `sudo datadog-agent jmx list limited`
- Mostrar una lista de atributos que se espera que recopile tu configuración de instancias actual:
  `sudo datadog-agent jmx list collected`
- Mostrar una lista de atributos que no coincidan con ninguna de tus configuraciones de instancias:
  `sudo datadog-agent jmx list not-matching`
- Mostrar cada atributo disponible que tenga un tipo compatible con JMXFetch:
  `sudo datadog-agent jmx list everything`
- Iniciar la recopilación de métricas según tu configuración actual y mostrarlas en la consola:
  `sudo datadog-agent jmx collect`

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

### Parseo de un valor de cadena en un número

Si tu jmxfetch devuelve solo valores de cadena como **false** y **true** y quieres transformarlo en una métrica gauge de Datadog para usos avanzados. Por ejemplo, si deseas la siguiente equivalencia para tu jmxfetch:

```text
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

Puedes utilizar el filtro `attribute` como se indica a continuación:

```yaml
# ...
attribute:
  myJmxfetch:
    alias: your_metric_name
    metric_type: gauge
    values:
      "false": 0
      "true": 1
```


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
