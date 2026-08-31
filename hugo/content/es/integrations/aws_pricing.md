---
app_id: aws-pricing
app_uuid: 74fb11c5-4dea-4b17-acac-2c2453ea6331
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: aws.pricing.amazonecs
      metadata_path: metadata.csv
      prefix: aws.pricing.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10085
    source_type_name: AWS Pricing
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: tsein@brightcove.com
  support_email: tsein@brightcove.com
categories:
- aws
- nube
- gestión de costes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md
display_on_public_website: true
draft: false
git_integration_title: aws_pricing
integration_id: aws-pricing
integration_title: AWS Pricing
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: aws_pricing
public_title: AWS Pricing
short_description: Recopila información de AWS Pricing para servicios por código de
  tarifa.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Gestión de costes
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila información de AWS Pricing para servicios por código de tarifa.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS Pricing
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check extrae información sobre precios [publicados por AWS][1] para facilitar la medición del coste del uso de recursos dentro de Datadog.

## Configuración

El check de AWS Pricing no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de AWS Pricing. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-aws_pricing==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `aws_pricing.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu AWS Pricing. Para conocer todas las opciones de configuración disponibles, consulta el [aws_pricing.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `aws_pricing` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "aws_pricing" >}}


### Eventos

AWS Pricing no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "aws_pricing" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://aws.amazon.com/pricing/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/