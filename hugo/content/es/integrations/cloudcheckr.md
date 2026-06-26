---
categories:
- cloud
- configuration & deployment
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/cloudcheckr.md
description: Habilita la integración para ver las métricas de Datadog en CloudCheckr.
doc_link: https://docs.datadoghq.com/integrations/cloudcheckr/
further_reading:
- link: https://www.datadoghq.com/blog/rightsizing-cloudcheckr/
  tag: Blog
  text: 'CloudCheckr + Datadog: redimensionar mejor los recursos de la nube'
has_logo: true
integration_id: cloudcheckr
integration_title: CloudCheckr
is_public: true
name: cloudcheckr
public_title: Integración de Datadog y CloudCheckr
short_description: Añade métricas de Datadog en CloudCheckr para monitorizar y optimizar
  tu uso de AWS.
---

## Información general

[CloudCheckr][1] es una plataforma basada en web que te permite monitorizar y optimizar tu infraestructura de AWS al brindar recomendaciones personalizadas sobre costos y rendimiento.

{{< img src="integrations/cloudcheckr/EC2_Right_Sizing_Report.png" alt="ec2 right sizing report">}}

Con la integración de Datadog y CloudCheckr, puedes tomar decisiones basadas en datos según el consumo de recursos actual y pasado para mantener una infraestructura ágil y rentable.

## Ajuste

Para conectar tu cuenta de Datadog a tu cuenta de CloudCheckr:

- Haz clic en tus extensiones de CloudCheckr.
- Añade tus [claves de API y de aplicación de Datadog][2].

[1]: https://spot.io/product/cloudcheckr/
[2]: https://app.datadoghq.com/organization-settings/api-keys