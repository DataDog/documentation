---
app_id: causely
app_uuid: 0ac3b5eb-46d2-4091-a001-e95dc5782609
assets:
  dashboards:
    causely: assets/dashboards/causely_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18684278
    source_type_name: Causely
author:
  homepage: https://portal.causely.app
  name: Causely
  sales_email: early-access@causely.ai
  support_email: support@causely.ai
categories:
- ia/ml
- automatización
- nube
- rum
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/causely/README.md
display_on_public_website: true
draft: false
git_integration_title: causely
integration_id: causely
integration_title: Causely
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: causely
public_title: Causely
short_description: Causal AI identifica la causa raíz de las alertas y anomalías de
  Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Automation
  - Categoría::Nube
  - Category::Incidents
  - Category::Kubernetes
  - Offering::Integration
  - Queried Data Type::Metrics
  - Queried Data Type::Events
  - Queried Data Type::Traces
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Causal AI identifica la causa raíz de las alertas y anomalías de Datadog.
  media:
  - caption: Kubernetes Service Congested Causality
    image_url: images/Service_Congested_Causality.png
    media_type: imagen
  - caption: Application DB Connection Noisy Neighbor Causality
    image_url: images/DB_Connections_Causality.png
    media_type: imagen
  - caption: Causas raíz corregidas de Causely
    image_url: images/Causely_Remediated_RootCauses.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Causely
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La [plataforma Causal AI][1] potencia tu stack tecnológico de observabilidad aprovechando la inteligencia integrada para analizar tus datos de telemetría. Permite aplicaciones autogestionadas y resistentes mediante la integración de la observabilidad con la orquestación automatizada.

Causely ofrece un valor instantáneo sin necesidad de configuraciones complejas ni de configuración. Ayuda a tu organización a pasar de un modo de funcionamiento reactivo a otro proactivo. En lugar de una avalancha de alertas, Causely te dice exactamente lo que necesitas saber sobre todos los fallos activos y emergentes de las aplicaciones. Con Causely, entenderás por qué se ha producido un fallo, cuál ha sido la causa raíz y cómo solucionarlo.

Utiliza Causely para:

- **Asegurar la fiabilidad continua de las aplicaciones**: asegura que los KPIs, SLAs, SLOs y SLIs se cumplan de forma constante para mantener la fiabilidad y el rendimiento de la aplicación.
- **Mejorar la eficiencia operativa**: reduce los costes de mano de obra, datos y herramientas centrándote en un tiempo medio de reparación (MTTR) más rápido y aplicando procesos operativos eficaces.
- **Acelerar la entrega de funciones e innovaciones**: aumenta la velocidad y la fiabilidad del envío de nuevas funciones y servicios al mercado, garantizando una ventaja competitiva y satisfaciendo las demandas de los clientes con prontitud.

Causely se integra con Datadog para proporcionar un análisis automatizado de la causa raíz de los eventos de Datadog Watchdog. Causely utiliza la clave de API de Datadog para obtener los monitores configurados y utilizar los eventos de Watchdog activados como entrada para la plataforma de razonamiento Causal AI; Causely también identifica la causa raíz de anomalías y las alertas. Causely devuelve la causa raíz corregida como eventos a Datadog, que pueden consultarse en el dashboard de Causely Datadog.

## Configuración

Causely utiliza la [clave de API de Datadog][2] para obtener los monitores configurados y utilizar los eventos de Watchdog activados como entrada para la plataforma de razonamiento de Causal AI. Causely analiza los eventos e identifica la causa raíz de las anomalías y las alertas. Para saber cómo configurar la integración de Causely para Datadog, consulta la [documentación de Causely][3].

## Datos recopilados

### Eventos

Las causas raíz identificadas y corregidas por Causely se muestran en tu dashboard de Causely.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [soporte de Causely][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:
- [Solicita una demostración][5] para experimentar de primera mano el análisis automatizado de causas raíz con Causely.
- [Lee el blog][6]: DevOps may have cheated death, but do we all need to work for the king of the underworld?
- [Ve el vídeo][7]: Causely for asynchronous communication

[1]: https://www.causely.ai
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.causely.ai/getting-started/overview/
[4]: mailto:support@causely.ai
[5]: https://www.causely.ai/try
[6]: https://www.causely.ai/blog/devops-may-have-cheated-death-but-do-we-all-need-to-work-for-the-king-of-the-underworld/
[7]: https://www.causely.ai/blog/causely-for-asynchronous-communication