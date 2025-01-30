---
app_id: hive
app_uuid: 827ff57e-83db-45b4-8a59-2f0270d389e8
assets:
  dashboards:
    Hive Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hive.server.memory.total.used
      metadata_path: metadata.csv
      prefix: hive.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10062
    source_type_name: Hive
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hive/README.md
display_on_public_website: true
draft: false
git_integration_title: hive
integration_id: hive
integration_title: Hive
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: hive
public_title: Hive
short_description: Recopila diversas métricas JMX de HiveServer2 y de Hive MetaStore
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila diversas métricas JMX de HiveServer2 y de Hive MetaStore
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza dos partes de [Hive][1]: Hive Metastore y HiveServer2.

## Configuración

### Instalación

El check de Hive está incluido en el paquete del [Datadog Agent][2]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Configuración de Hive

1. Edita el archivo de configuración de Hive en [`HIVE_HOME/conf/hive-site.xml`][3] para habilitar las métricas de Hive Metastore y HiveServer2 añadiendo estas propiedades:

   ```xml
   <property>
     <name>hive.metastore.metrics.enabled</name>
     <value>true</value>
   </property>
   <property>
     <name>hive.server2.metrics.enabled</name>
     <value>true</value>
   </property>
   ```

2. Habilita una conexión JMX remota para HiveServer2 o para Hive Metastore. Por ejemplo, configura la variable de entorno `HADOOP_CLIENT_OPTS`:

   ```conf
   export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
   -Dcom.sun.management.jmxremote.port=8808"
   ```

   A continuación, reinicia HiveServer2 o Hive Metastore. Hive Metastore y HiveServer2 no pueden compartir la misma conexión JMX.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

##### Recopilación de métricas

1. Edita el archivo `hive.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Hive. Para conocer todas las opciones de configuración disponibles, consulta el [hive.d/conf.yaml de ejemplo][1].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][2]. Puedes especificar las métricas que te interesan, editando la siguiente configuración.
   Para saber cómo personalizar las métricas que se van a recopilar, consulta la [documentación sobre checks JMX][3] para obtener instrucciones más detalladas. Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][4].

2. [Reinicia el Agent][5].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `hive.d/conf.yaml` para empezar a recopilar tus logs de Hive:

   ```yaml
     logs:
       - type: file
         path: /tmp/<USER>/hive.log
         source: hive
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [hive.d/conf.yaml de ejemplo][1] para conocer todas las opciones de configuración disponibles.

3. [Reinicia el Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/integrations/java/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

Para recopilar métricas con la integración de Datadog y Hive, consulta la guía [Autodiscovery con JMX][2].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][3].

| Parámetro      | Valor                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hive", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `Hive` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hive" >}}


### Eventos

El check de Hive no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "hive" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/