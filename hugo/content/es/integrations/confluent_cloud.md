---
app_id: rastreo
app_uuid: 406c781b-842d-4e0c-84dc-4b13b8e93fb6
assets:
  dashboards:
    confluent-cloud: assets/dashboards/confluent_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - confluent_cloud.kafka.received_bytes
      - confluent_cloud.connect.sent_records
      - confluent_cloud.ksql.streaming_unit_count
      - confluent_cloud.schema_registry.schema_count
      metadata_path: metadata.csv
      prefix: confluent_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 609
    source_type_name: Confluent Cloud
  monitors:
    Connector incoming throughput dropped to 0: assets/monitors/connector_no_input_data.json
    Connector outgoing throughput dropped to 0: assets/monitors/connector_no_output_data.json
    Kafka Consumer lag is increasing: assets/monitors/consumer_lag_monitor_rate_change_percent.json
    Mirror Kafka Consumer lag is increasing: assets/monitors/cluster_link_lag_rate_change_percent.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- gestión de costes
- métricas
- colas de mensajes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud
integration_id: rastreo
integration_title: Confluent Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud
public_title: Confluent Cloud
short_description: Recopila varias métricas de Kafka y datos de costes relacionados
  desde Confluent Cloud.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Metrics
  - Category::Message Queues
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Configuración
  description: Recopila varias métricas de Kafka y datos de costes relacionados desde
    Confluent Cloud.
  media:
  - caption: Información general del dashboard de Confluent Cloud
    image_url: images/confluent_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/confluent-cloud-monitoring-datadog/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  support: README.md#Soporte
  title: Confluent Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general


{{< site-region region="gov" >}}
**La integración de Confluent Cloud no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}**.
{{< /site-region >}}


Confluent Cloud es un servicio de transmisión de datos alojado en la nube y totalmente gestionado. Conecta Datadog con Confluent Cloud para visualizar y recibir alertas sobre métricas clave para tus recursos de Confluent Cloud.

El dashboard de Confluent Cloud listo para usar de Datadog te muestra métricas de clúster clave para monitorizar el estado y el rendimiento de tu entorno, incluida información como la tasa de cambio en las conexiones activas y tu relación entre el promedio de registros consumidos y producidos.

Puedes utilizar los monitores recomendados para notificar y alertar a tu equipo cuando el retraso del tema sea demasiado alto, o utilizar estas métricas para crear las tuyas propias.

## Configuración

### Instalación

Instala la integración con el [cuadro de integración de Confluent Cloud en Datadog][1].

### Configuración

1. En Confluent Cloud, haz clic en **+ Add API Key** para ingresar tu [clave y secreto de API de Confluent Cloud](#api-key-and-secret).
   - Crea una clave y un secreto de API **Cloud Resource Management**.
   - Haz clic en **Save**. Datadog busca las cuentas asociadas a esas credenciales.
   - En la configuración de la integración con Datadog, añade la clave y el secreto de API a los campos de **API Key and API Secret**.
2. Añade tu [ID de clúster](#cluster-id) o [ID de conector](#connector-id) de Confluent Cloud. Datadog rastrea las métricas de Confluent Cloud y las carga en cuestión de minutos.
3. Para recopilar tus etiquetas (tags) definidas en Confluent Cloud (opcional):
   - Crea una clave y un secreto de API **Schema Registry**. Obtén más información sobre [Gestión de esquemas en Confluent Cloud][2].
   - Haz clic en **Save**. Datadog recopila las etiquetas definidas en Confluent Cloud.
   - En la configuración de la integración con Datadog, añade la clave y el secreto de API a los campos de **Schema Registry API Key and Secret**.
4. Si utilizas Cloud Cost Management y habilitas la recopilación de datos de costes:
   - Asegúrate de que la clave de API tenga habilitado el [rol BillingAdmin][3].
   - Será visible en [Cloud Cost Management][4] dentro de 24 horas ([datos recopilados][5]).

Para obtener más información sobre los recursos de configuración, como clústeres y conectores, consulta la [documentación sobre la integración de Confluent Cloud][6].

#### Clave y secreto de API

Para crear tu clave y secreto de API de Confluent Cloud, consulta [Añadir el rol MetricsViewer a una nueva cuenta de servicio en la interfaz de usuario][7].

#### ID de clúster

Para encontrar tu ID de clúster de Confluent Cloud:

1. En Confluent Cloud, navega hasta **Environment Overview** y selecciona el clúster que desees monitorizar.
2. En la navegación de la izquierda, haz clic en **Cluster overview** > **Cluster settings**.
3. En **Identification**, copia el ID de clúster que empieza con `lkc`.

#### ID de conector

Para encontrar tu ID de conector de Confluent Cloud:

1. En Confluent Cloud, navega hasta **Environment Overview** y selecciona el clúster que desees monitorizar.
2. En la navegación de la izquierda, haz clic en **Data integration** > **Connectors**.
3. En **Connectors**, copia el ID de conector que empieza con `lcc`.

## Dashboards

Después de configurar la integración, consulta el dashboard de Confluent Cloud listo para usar para obtener información general de las métricas de conector y de clúster de Kafka.

Por defecto, se muestran todas las métricas recopiladas en Confluent Cloud.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "confluent_cloud" >}}


### Eventos

La integración de Confluent Cloud no incluye eventos.

### Checks de servicios

La integración de Confluent Cloud no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

- [Crear y gestionar cuentas de Confluent con Terraform][10]
- [Crear y gestionar recursos de Confluent con Terraform][11]

[1]: https://app.datadoghq.com/integrations/confluent-cloud
[2]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud
[3]: https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[4]: https://app.datadoghq.com/cost
[5]: https://docs.datadoghq.com/es/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected
[6]: https://docs.datadoghq.com/es/integrations/confluent_cloud/
[7]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[9]: https://docs.datadoghq.com/es/help/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource