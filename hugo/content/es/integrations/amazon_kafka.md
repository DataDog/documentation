---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws.msk.go.threads
      metadata_path: metadata.csv
      prefix: aws.msk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10080
    source_type_name: Amazon Kafka
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_kafka
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: amazon_kafka
public_title: Amazon MSK (Agent)
short_description: Monitoriza el estado y el rendimiento de tus clústeres Amazon MSK.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  - Product::Data Streams Monitoring
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de tus clústeres Amazon MSK.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-amazon-msk/
  support: README.md#Soporte
  title: Amazon MSK (Agent)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Amazon Managed Streaming for Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y la ejecución de aplicaciones que utilizan Apache Kafka para procesar la transmisión de datos.

Puedes recopilar métricas de esta integración de dos formas: con el [Datadog Agent](#setup) o con un [rastreador][1] que recopile métricas de CloudWatch. 

## Configuración

El check del Agent monitoriza Amazon Managed Streaming for Apache Kafka ([Amazon MSK][2]) a través del Datadog Agent.

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. En el caso de entornos contenedorizados, consulta las [plantillas de la integración Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

Esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: verdadero) y un modo heredado (`use_openmetrics`: falso). Para obtener todas las funciones más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics][4].

### Instalación

1. [Crea una máquina de cliente][5] si aún no existe.
2. Asegúrate de que a la máquina de cliente se le haya [concedido][6] la política de permisos [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][7] o que dispone de [credenciales][8] equivalentes.
3. Habilita la [monitorización abierta con Prometheus][9] en el lado MSK para habilitar JmxExporter y NodeExporter.
4. Instala el [Datadog Agent][10] en la máquina de cliente que acabas de crear.

### Configuración

1. Edita el archivo `amazon_msk.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del directorio de configuración de tu Agent para comenzar a recopilar datos de rendimiento de Amazon MSK. 

   Incluye [etiquetas (tags)][11] personalizadas para adjuntar a cada métrica y check de servicio proporcionados por esta integración.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   Para ver todas las opciones de configuración disponibles para el modo más reciente, consulta el [ejemplo amazon_msk.d/conf.yaml][12]. Para ver el modo heredado de esta integración, consulta el [ejemplo heredado][13].

2. [Reinicia el Agent][14].

### Validación

[Ejecuta el subcomando de estado del Agent][15] y busca `amazon_msk` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-kafka" >}}


### Eventos

El check de Amazon MSK no incluye eventos.

### Checks de servicios

Para ver una lista de los checks de servicios proporcionados por esta integración, consulta [service_checks.json][17].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][18].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Amazon Managed Streaming for Apache Kafka con Datadog][19]

[1]: https://docs.datadoghq.com/es/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[7]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[8]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[9]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[10]: https://docs.datadoghq.com/es/agent/
[11]: https://docs.datadoghq.com/es/getting_started/tagging/
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[17]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[18]: https://docs.datadoghq.com/es/help/
[19]: https://www.datadoghq.com/blog/monitor-amazon-msk/