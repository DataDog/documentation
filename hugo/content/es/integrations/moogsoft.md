---
algolia:
  subcategory: Integraciones del Marketplace
app_id: moogsoft
app_uuid: db3d32c6-1127-4bd5-b270-01aa573616b7
assets:
  dashboards:
    Moogsoft Overview: assets/dashboards/moogsoft_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: moogsoft.incident.count
      metadata_path: metadata.csv
      prefix: moogsoft.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10151
    source_type_name: Moogsoft
author:
  homepage: https://moogsoft.com
  name: Moogsoft
  sales_email: subscriptions@moogsoft.com
  support_email: support@moogsoft.com
  vendor_id: moogsoft
categories:
- automatización
- rum
- marketplace
- notificaciones
- ai/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: moogsoft
integration_id: moogsoft
integration_title: Moogsoft
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: moogsoft
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.moogsoft
  product_id: nube
  short_description: Niveles de precios basados en los volúmenes de evento/métrica
  tag: núcleo
  unit_label: Evento Moogsoft o 500 métricas de Moogsoft
  unit_price: 0.05
public_title: Moogsoft
short_description: Plataforma de observabilidad autoservicio avanzada basada en IA
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Incidentes
  - Categoría::Marketplace
  - Categoría::Notificaciones
  - Categoría::IA/ML
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Incidentes
  configuration: README.md#Configuración
  description: Plataforma de observabilidad autoservicio avanzada basada en IA
  media:
  - caption: Correlación Moogsoft
    image_url: images/moogsoft.correlation.png
    media_type: imagen
  - caption: Dashboard de Moogsoft
    image_url: images/moogsoft.dashboard.png
    media_type: imagen
  - caption: Correlación de incidentes de Moogsoft
    image_url: images/moogsoft.main.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Moogsoft
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Integra fácilmente Datadog y Moogsoft para obtener una potencia combinada de monitorización y observabilidad de IA. Tanto si tus aplicaciones son digitales como si son heredadas, o si utilizas un híbrido de ambas, esta solución reduce el ruido de las alertas y mejora la eficiencia operativa en todos los equipos y operaciones de TI.

Moogsoft proporciona una avanzada plataforma de observabilidad autoservicio basada en IA que permite a los ingenieros de software, a los desarrolladores y a las operaciones visualizar todo al instante, saber qué va mal y solucionar las cosas más rápidamente.

Moogsoft ofrece una plataforma nativa en la nube de clase empresarial que permite a los clientes impulsar la adopción a su propio ritmo a un coste mucho menor.

### Observar

Mejora la calidad de las entregas de servicios. Sólo elevamos las situaciones críticas, para que tú y tu equipo puedan actuar con rapidez, mantener la concentración y resolver los incidentes antes de que provoquen interrupciones.

### Monitor

Reduce el volumen de alertas y observa cómo aumenta la productividad. Nosotros ayudamos a eliminar la fatiga de evento con un panel de monitorización consolidado y correlacionando eventos similares para minimizar significativamente las alertas procesables.

### Colabora

Visualiza todo en una sola vista. Agrupamos todas tus alertas de aplicaciones, servicios e infraestructuras en una única consola para aumentar la agilidad, reducir el número de alertas y reducir los tiempos de resolución.

### Flujo (flow) de datos de Moogsoft

Los datos fluyen a través de Moogsoft ganando contexto y reduciendo el ruido en cada paso. Las métricas se convierten en eventos, los eventos se convierten en alertas de estado y las alertas se correlacionan en incidentes.

## Ayuda
Ponte en contacto con el servicio de asistencia de Moogsoft en [https://support.moogsoft.com][1].

[1]: https://support.moogsoft.com

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/moogsoft" target="_blank">adquiere esta aplicación en el Marketplace</a>.