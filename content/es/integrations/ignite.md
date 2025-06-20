---
app_id: ignite
app_uuid: 0e1f1ef2-ea62-4ae4-a99f-8c40171b729c
assets:
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ignite.received_messages
      metadata_path: metadata.csv
      prefix: ignite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10100
    source_type_name: Ignite
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ignite/README.md
display_on_public_website: true
draft: false
git_integration_title: ignite
integration_id: ignite
integration_title: ignite
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: ignite
public_title: ignite
short_description: Recopila métricas de tu servidor de Ignite.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas de tu servidor de Ignite.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ignite
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Ignite][1].

## Configuración

### Instalación

El check de Ignite está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

#### Configuración de Ignite

El exportador de métricas JMX se encuentra habilitado de manera predeterminada, pero es posible que debas elegir el puerto expuesto o habilitar la autenticación dependiendo de la seguridad de la red. La imagen de Docker oficial utiliza `49112` de forma predeterminada.

Para la generación de logs, se recomienda habilitar [log4j][3] para beneficiarse de un formato de log con fechas completas.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `ignite.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de Ignite. Consulta el [archivo de ejemplo ignite.d/conf.yaml][1] para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][2].
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar la recopilación de métricas, consulta la [documentación sobre los checks JMX][3].
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][4].

2. [Reinicia el Agent][5]

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `ignite.d/conf.yaml` para empezar a recopilar logs de Ignite:

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [archivo de ejemplo cassandra.d/conf.yaml][1] para conocer todas las opciones de configuración disponibles.

3. [Reinicia el Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/integrations/java/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

Para recopilar métricas con la integración de Datadog y Ignite, consulta la guía [Autodiscovery con JMX][2].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Docker][3].

| Parámetro      | Valor                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations/
[2]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/es/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][4] y busca `ignite` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ignite" >}}


### Eventos

La integración de Ignite no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "ignite" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].



[1]: https://ignite.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example