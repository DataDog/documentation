---
algolia:
  subcategory: Integraciones de Marketplace
app_id: fairwinds-insights
app_uuid: a488d774-fd45-4765-b947-e48792c6ab32
assets:
  dashboards:
    Insights Overview: assets/dashboards/overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: fairwinds.insights.action_items
      metadata_path: metadata.csv
      prefix: fairwinds.insights.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10112
    source_type_name: Fairwinds Insights
author:
  homepage: https://www.fairwinds.com
  name: Fairwinds
  sales_email: datadog-marketplace@fairwinds.com
  support_email: insights@fairwinds.com
  vendor_id: fairwinds
categories:
- contenedores
- cost management
- kubernetes
- marketplace
- suministración
- seguridad
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fairwinds_insights
integration_id: fairwinds-insights
integration_title: Fairwinds Insights
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: fairwinds_insights
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.fairwinds.insights
  product_id: insights
  short_description: Software de seguridad y gobernanza de Kubernetes
  tag: insights_node
  unit_label: Nodo de Kubernetes
  unit_price: 100
public_title: Fairwinds Insights
short_description: Protege y optimiza tus aplicaciones críticas de Kubernetes
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Cost Management
  - Categoría::Kubernetes
  - Categoría::Marketplace
  - Categoría::Suministración
  - Categoría::Seguridad
  - Oferta::Integración
  - SO compatible::Linux
  - SO compatible::Windows
  - SO compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  configuration: README.md#Setup
  description: Protege y optimiza tus aplicaciones críticas de Kubernetes
  media:
  - caption: Fairwinds Insights es un software de seguridad y gobernanza de Kubernetes
      que ofrece alertas de seguridad, medidas de protección y hallazgos de cumplimiento,
      además de asesoramiento para la optimización de costes. Fairwinds Insights se
      integra con Datadog para que cuentes con una única localización a fin de visualizar
      todos tus informes.
    image_url: images/Video_Front_Cover.png
    media_type: vídeo
    vimeo_id: 619368230
  - caption: El controlador de admisión (Admission Controller) de Fairwinds Insights
      se ejecuta cada vez que se añade un recurso nuevo al clúster. Si el recurso
      infringe las políticas de tu organización, el controlador de admisión lo rechazará
      y notificará al cliente.
    image_url: images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    media_type: imagen
  - caption: Fairwinds Insights monitoriza de manera continua varios clústeres en
      relación con las configuraciones de seguridad para reducir el riesgo y garantizar
      que se sigan las prácticas recomendadas. Insights identifica los riesgos de
      los contenedores y de Kubernetes, los prioriza, proporciona orientación para
      la solución y seguimiento del estado.
    image_url: images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    media_type: imagen
  - caption: Los equipos pueden crear y aplicar políticas personalizadas a través
      de OPA e integrarlas en cada parte de Fairwinds Insights, incluidos los pipelines
      de CI/CD, el controlador de admisión y el Agent en el clúster. Insights incluye
      una biblioteca de plantillas de OPA.
    image_url: images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    media_type: imagen
  - caption: Insights monitoriza el uso de CPU y memoria para proporcionar recomendaciones
      sobre los límites de recursos y solicitudes. Maximiza la eficiencia del uso
      de CPU y memoria para tus cargas de trabajo de Kubernetes.
    image_url: images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    media_type: imagen
  - caption: Fairwinds Insights se integra perfectamente en tu pipeline de CI/CD para
      mejorar y acelerar la seguridad. Los equipos de DevOps pueden evitar errores
      de configuración durante la CI/CD y proporcionar asesoramiento en cuanto a la
      solución a los desarrolladores, sin necesidad de intervención manual. Los desarrolladores
      tienen la libertad de desarrollar con redes de seguridad desplegadas.
    image_url: images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    media_type: imagen
  - caption: Fairwinds Insights ofrece monitorización del tiempo de ejecución de los
      contenedores y se integra en el proceso de CI/CD. Insights rastrea las vulnerabilidades
      conocidas en los contenedores, prioriza los hallazgos por gravedad y ofrece
      soluciones. Se integra con flujos de trabajo de asignación y emisión de tickets
      para realizar un seguimiento del estado de las soluciones.
    image_url: images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
  - resource_type: Documentación
    url: https://insights.docs.fairwinds.com/
  support: README.md#Support
  title: Fairwinds Insights
  uninstallation: README.md#Uninstallation
---

<!--  FUENTE https://github.com/DataDog/marketplace -->


## Información general

Software para proteger y optimizar tus aplicaciones críticas de Kubernetes

#### Optimizar las transferencias desde el desarrollo a las operaciones

* Definir y controlar políticas personalizadas en varios clústeres
* Aplicar medidas de seguridad y prácticas recomendadas con un controlador de admisión
* Integración del escaneo de contenedores y la validación de despliegues en flujos de trabajo de CI/CD

#### Monitorizar y optimizar los costes de Kubernetes

* Obtener visibilidad sobre el uso de los recursos de la carga de trabajo y los costes estimados
* Determinar la configuración de CPU y memoria correcta para las cargas de trabajo

#### Ahorrar tiempo

* Integrar las recomendaciones de configuración de Kubernetes con los dashboards de Datadog existentes
* Mejorar la colaboración con la integración de Slack

#### Reducir el riesgo

* Monitorizar los contenedores para detectar vulnerabilidades conocidas
* Validar las configuraciones de despliegue de Kubernetes

## Datos recopilados

### Métricas

Los elementos de acción de Fairwinds Insights aparecerán en Datadog con etiquetas (tags) para que puedas realizar cualquier análisis que necesites.

### Checks de servicio

Fairwinds Insights no incluye ningún check de servicio.

### Eventos

* Aparecerá un evento inicial cuando configures la integración por primera vez
* Un evento por cada elemento de acción nuevo en Fairwinds Insights
* Un evento por cada elemento de acción fijo de evento en Fairwinds Insights

## Compatibilidad

Para obtener asistencia o realizar solicitudes, ponte en contacto con Fairwinds a través de los siguientes canales:

- Teléfono: +1 617-202-3659 
- Correo electrónico: [sales@fairwinds.com][2]

### Preguntas frecuentes

**¿Cómo funciona Fairwinds Insights?**

Fairwinds Insights proporciona una vista unificada de varios clústeres en tres categorías de problemas de configuración de Kubernetes: seguridad, eficiencia y fiabilidad. Fairwinds Insights facilita el despliegue de varias herramientas de código abierto a través de una única instalación de Helm. Esta instalación única ayuda a los ingenieros a evitar el trabajo personalizado de instalación y configuración de cada herramienta. El software también añade funcionalidades de gestión de políticas con el fin de que los equipos de ingeniería puedan definir y aplicar medidas de seguridad para los despliegues en clústeres de Kubernetes.

**¿Qué es un complemento?**

Fairwinds Insights denomina «complementos» a las herramientas integradas en el software.

**¿Qué es un Agent?**

Fairwinds Insights denomina «Fairwinds Insights Agent» al Helm chart incluido.

**¿Qué pasa con mis datos?**

Fairwinds Insights agrega los hallazgos de cada complemento y los publica en una vista de varios clústeres para facilitar el consumo, la priorización y el seguimiento de problemas.

**¿Qué complementos incluye Fairwinds Insights?**

Fairwinds Insights proporciona integraciones para una gran variedad de herramientas de código abierto que usas en la actualidad, incluido [Polaris](https://github.com/FairwindsOps/polaris), [Goldilocks](https://github.com/FairwindsOps/goldilocks/), [Open Policy Agent](https://www.openpolicyagent.org/) y el [Escaneo de contenedores Trivy](https://github.com/aquasecurity/trivy). Para obtener la lista completa, visita el [Centro de documentación de Fairwinds Insights](https://insights.docs.fairwinds.com/). A continuación se enumeran algunos hallazgos de ejemplo:

* Vulnerabilidades de los contenedores
* Problemas de seguridad con los despliegues de Kubernetes (por ejemplo, despliegues configurados para ejecutarse como raíz)
* Debilidades a nivel de clúster (por ejemplo, pods expuestos y divulgaciones de información, entre otros)
* CVEs de Kubernetes
* Notificación automática sobre Helm charts que están desactualizados
* Políticas y checks de configuración de Kubernetes personalizados

### Política de reembolso

Política de cancelación y reembolso de Insights:

Fairwinds Insights se ofrece como una suscripción mensual que tú, el cliente, puedes cancelar en cualquier momento de las formas que se te ofrecen a través de tu cuenta de Datadog Marketplace. Si cancelas la suscripción, solo se te facturará por el resto del periodo de facturación mensual vigente en ese momento. Insights no ofrece reembolsos de ninguna tarifa que ya se haya pagado.

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Kubernetes con la oferta de Fairwinds Insights en Datadog Marketplace][2]
- [Documentación de Fairwinds Insights][3]

[1]: https://insights.fairwinds.com
[2]: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
[3]: https://insights.docs.fairwinds.com/
---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/fairwinds-insights" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.