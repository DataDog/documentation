---
app_id: jboss-wildfly
app_uuid: 4ad5a2e9-106b-43a2-820a-f146c7effffe
assets:
  dashboards:
    JBoss WildFly: assets/dashboards/jboss_wildfly.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jboss.jdbc_connections.count
      metadata_path: metadata.csv
      prefix: jboss.
    process_signatures:
    - java jboss-modules.jar
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10060
    source_type_name: JBoss/WildFly
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md
display_on_public_website: true
draft: false
git_integration_title: jboss_wildfly
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: jboss_wildfly
public_title: JBoss/WildFly
short_description: Recopila varias métricas de JMX de aplicaciones JBoss y WildFly
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
  description: Recopila varias métricas de JMX de aplicaciones JBoss y WildFly
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: JBoss/WildFly
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza aplicaciones de [JBoss][1] y [WildFly][2].

## Configuración

### Instalación

El check de JBoss/WildFly está incluido en el paquete del [Datadog Agent][3] por lo que no necesitas instalar nada más en tu host de JBoss/WildFly.

### Configuración

Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][4]. Puedes especificar las métricas que te interesen editando la configuración a continuación. Para saber cómo personalizar las métricas recopiladas, consulta la [documentación de checks de JMX][5] para obtener instrucciones más detalladas. Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog][6].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `jboss_wildfly.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar los datos de rendimiento de tu servidor de aplicaciones de JBoss o WildFly. Consulta el [ejemplo jboss_wildfly.d/conf.yaml][1] para ver todas las opciones disponibles de configuración.

   Según la configuración de tu servidor (particularmente cuando utilices el esquema de JMX `remote+http`), puede que necesites especificar un JAR personalizado para conectarte al servidor. Coloca el JAR en la misma máquina que tu Agent, y añade su ruta a la opción `custom_jar_paths` de tu archivo `jboss_wildfly.d/conf.yaml`.

    **Nota**: El esquema URL de JMX es diferente según la versión de WildFly:

   - Para Wildfly 9 y posteriores: `service:jmx:http-remoting-jmx://<HOST>:<PORT> `
   - Para Wildfly 10+: `service:jmx:remote+http://<HOST>:<PORT>`

    Consulta la [página de configuración del subsistema de WildFly JMX][2] para obtener más información.

2. [Reinicia el Agent][3].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. A continuación, edita `jboss_wildfly.d/conf.yaml` descomentando las líneas `logs` de la parte inferior. Actualiza la `path` de logs con la ruta correcta a tus archivos de log de JBoss.

   ```yaml
   logs:
     - type: file
       path: /opt/jboss/wildfly/standalone/log/*.log
       source: jboss_wildfly
       service: '<APPLICATION_NAME>'
   ```

3. [Reinicia el Agent][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[2]: https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

##### Recopilación de métricas

Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][1].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `jboss_wildfly` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "jboss_wildfly" >}}


### Eventos

La integración JBoss/WildFly no incluye ningún evento.

### Checks de servicios
{{< get-service-checks-from-git "jboss_wildfly" >}}


### Recopilación de métricas con JMXFetch

Puedes configurar el Datadog Agent para recopilar métricas de aplicación de Java a través de [JMXFetch][7]. Para recopilar las métricas predeterminadas configuradas para la integración de JBoss/Wildfly y Datadog, establece la propiedad del sistema
`Ddd.jmxfetch.jboss_wildfly.enabled=true`. 

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/integrations/java/
[6]: https://docs.datadoghq.com/es/help/
[7]: https://docs.datadoghq.com/es/integrations/java