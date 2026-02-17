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
git_integration_title: amazon_msk
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 6.7.0
is_public: true
manifest_version: 2.0.0
name: amazon_msk
public_title: Amazon MSK (Agent)
short_description: Monitoriza el estado y el rendimiento de tus clústeres Amazon MSK.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
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

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Amazon Managed Streaming para Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y ejecución de aplicaciones que utilizan Apache Kafka para procesar datos de streaming.

Puedes recopilar métricas de esta integración de dos formas: con el [Datadog Agent](#setup) o con un [rastreador][1] que recopile métricas de CloudWatch. 

Considera [Data Streams Monitoring][2] para mejorar tu integración MSK. Esta solución permite la visualización de los flujos y el seguimiento de los retrasos, ayudándote a identificar y resolver los cuellos de botella.

## Configuración

El check del Agent monitoriza Amazon Managed Streaming for Apache Kafka ([Amazon MSK][3]) a través del Datadog Agent.

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][4] para obtener orientación sobre la aplicación de estas instrucciones.

Esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: true) y un modo legacy (`use_openmetrics`: false). Para obtener todas las funciones más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y legacy de integraciones basadas en OpenMetrics][5].

### Instalación

1. [Crea una máquina cliente][6], si aún no existe.
2. Asegúrate de que la máquina cliente tiene [concedida][7] la política de permisos [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][8] o que dispones de [credenciales][9] equivalentes.
3. Activa la [monitorización abierta con Prometheus][10] en el lado de MSK para activar el JmxExporter y el NodeExporter.
4. Instala el [Datadog Agent][11] en la máquina cliente que acabas de crear.

### Configuración

1. Edita el archivo `amazon_msk.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del directorio de configuración de tu Agent para comenzar a recopilar datos de rendimiento de Amazon MSK. 

   Incluye [etiquetas (tags)][12] personalizadas que se adjunten a cada métrica y check de servicio proporcionados por esta integración.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   Para ver todas las opciones de configuración disponibles del modo más reciente, consulta el [ejemplo amazon_msk.d/conf.yaml][13]. Para ver el modo legacy de esta integración, consulta el [ejemplo legacy][14].

2. [Reinicia el Agent][15].

### Validación

[Ejecuta el subcomando de estado del Agent][16] y busca `amazon_msk` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_msk" >}}


### Eventos

El check de Amazon MSK no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "amazon_msk" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][19].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Amazon Managed Streaming para Apache Kafka con Datadog][20]

[1]: https://docs.datadoghq.com/es/integrations/amazon_msk
[2]: https://docs.datadoghq.com/es/data_streams/
[3]: https://aws.amazon.com/msk
[4]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[6]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[8]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[9]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[10]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[11]: https://docs.datadoghq.com/es/agent/
[12]: https://docs.datadoghq.com/es/getting_started/tagging/
[13]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[14]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[15]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[16]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[17]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[18]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[19]: https://docs.datadoghq.com/es/help/
[20]: https://www.datadoghq.com/blog/monitor-amazon-msk/