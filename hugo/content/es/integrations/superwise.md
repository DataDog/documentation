---
app_id: superwise
app_uuid: 814d45d4-bf11-46c9-98a2-5fab9c997c94
assets:
  dashboards:
    Superwise: assets/dashboards/superwise.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: superwise.metric.overall.quantity
      metadata_path: metadata.csv
      prefix: superwise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10246
    source_type_name: Superwise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Superwise
  sales_email: support@superwise.ai
  support_email: support@superwise.ai
categories:
- rum
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/superwise/README.md
display_on_public_website: true
draft: false
git_integration_title: superwise
integration_id: superwise
integration_title: Superwise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: superwise
public_title: Superwise
short_description: Plataforma de observabilidad de modelos de Machine Learning en
  producción
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Incidentes
  - Categoría::IA/ML
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Plataforma de observabilidad de modelos de Machine Learning en producción
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
  support: README.md#Soporte
  title: Superwise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general
[Superwise][1] proporciona una observabilidad de los modelos para operaciones de Machine Learning (ML) de gran escala.
La observabilidad de los modelos de Superwise te ofrece una visibilidad y un contexto de los comportamientos de tus modelos, para que puedas monitorizar fácilmente los riesgos de los modelos en función de los distintos casos de uso. Con Superwise, los científicos de datos, los ingenieros de ML y las operaciones empresariales logran una observabilidad de los modelos sin fatiga de alertas, para que puedas confiar en la gestión de tus modelos.

![Dashboard de Superwise][2]

Las métricas de modelos y la integración de los incidentes de Superwise envía métricas de modelos predefinidas, incluyendo deriva, actividad, incidentes y métricas personalizadas, directamente a Datadog. Podrás obtener información general de qué modelos no están prediciendo los resultados esperados, algo que puede configurarse para cualquier caso de uso, lógica, segmentación, umbral y sensibilidad.

Con la integración Datadog configurada en Superwise, las métricas de modelos estándar se envían a Datadog y los usuarios obtienen dashboards de observabilidad de modelos en Datadog. Puedes configurar cualquier métrica de modelo específica y política de incidentes y enviarlas a Datadog para obtener una observabilidad del modelo adaptada a tu caso de uso.

## Configuración

1. Ve al [portal Superwise][3] y selecciona **Integrations** (Integraciones).

2. Haz clic en **Create a new channel** (Crear un nuevo canal) y selecciona **Datadog**.

   ![Superwise - Añadir nueva integración][4]

3. Introduce tu Datadog y tus claves de la aplicación API y haz clic en **Test**. Se enviará una solicitud de test a tu cuenta de Datadog para validar la integración. Si la solicitud se ha enviado correctamente, aparecerá un mensaje en Superwise indicando que el test se ha realizado correctamente. Para finalizar la configuración, haz clic en **Create channel** (Crear canal).

   ![Superwise - Añadir nuevo canal de Datadog][5]

4. Una vez finalizada la configuración, estará disponible el widget de la nueva integración Datadog:

    ![Integración Superwise][6]

### Validación
En Datadog, ve al **Explorador de métricas** y busca la métrica `superwise.integration.test` para verificar que la integración entre Superwise y Datadog funciona correctamente.

![Gráfica de superwise.integration.test en Datadog][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "superwise" >}}


### Eventos

La integración Superwise no incluye eventos.

### Checks de servicio

La integración Superwise no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Consulta la [documentación de Superwise][9].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización del rendimiento de modelos con la oferta de Superwise en el Marketplace de Datadog][10]

[1]: https://www.superwise.ai/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/5.png
[3]: https://portal.superwise.ai/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/2.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/6.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/3.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/4.png
[8]: https://github.com/DataDog/integrations-extras/blob/master/superwise/metadata.csv
[9]: https://docs.superwise.ai
[10]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/