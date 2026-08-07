---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-gmeet
app_uuid: 0aa39e5e-89dd-4437-8411-33ca5a69174f
assets:
  dashboards:
    Google Meet Dashboard: assets/dashboards/google_meet_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.gmeet.call_ended
      metadata_path: metadata.csv
      prefix: rapdev.gmeet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10434
    source_type_name: RapDev Gmeet
  monitors:
    Google Meets Integration Failed to Connect: assets/monitors/rapdev_google_meet_monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- colaboración
- gestión de eventos
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gmeet
integration_id: rapdev-gmeet
integration_title: Google Meet
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gmeet
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.gmeet
  product_id: gmeet
  short_description: Precio unitario por usuario activo
  tag: mostrar_nombre
  unit_label: Usuario activo
  unit_price: 1
public_title: Google Meet
short_description: Visualiza los detalles y el rendimiento de las reuniones de Google
  Meet como métricas y eventos.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Colaboración
  - Categoría::Gestión de eventos
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  configuration: README.md#Instalación
  description: Visualiza los detalles y el rendimiento de las reuniones de Google
    Meet como métricas y eventos.
  media:
  - caption: Dashboard de información general de RapDev Google Meet
    image_url: images/dashboard_example.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Google Meet
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Google Meet es un servicio de comunicación por vídeo para realizar reuniones y llamadas.

La integración Google Meet informa de métricas del rendimiento de las llamadas en cuanto finaliza una llamada. Esta integración monitoriza el rendimiento de las llamadas informando de la latencia del audio, del vídeo y de la difusión en pantalla. También se envía un evento a Datadog cuando los usuarios abandonan una reunión, lo que te permite visualizar datos demográficos de toda una organización.
La información recopilada incluye lo siguiente:
- Número de usuarios externos que participan en reuniones organizadas por tu organización
- Desglose de los tipos de dispositivos por región
- Desglose de la duración de las llamadas por usuario
- Desglose y resumen de las calificaciones de calidad de las llamadas

Nota: La configuración de tu cuenta interna de servicio para sondear esta información desde tu espacio de trabajo requiere que tu administrador de Google Workspace delegue la autoridad de todo el dominio a tu cuenta de servicio.

### Recopilación de métricas

Personaliza los parámetros que quieres notificar a Datadog en un archivo `conf.yaml`.

Esta integración envía métricas a Datadog en función de lo que informa la [API de actividades de Google][2]. Esta integración utiliza el [evento caller leaving][3]. 
Para extraer métricas adicionales, añade campos adicionales en `conf.yaml` como `network_recv_jitter_msec_max`.

Cada métrica incluye las siguientes etiquetas (tags):
  - `meeting_code`: Código de reunión de la conferencia de Google Meet (por ejemplo, "abc-hexp-tqy"). Las reuniones recurrentes tienen el mismo código de reunión.
  - `location_country`: País de procedencia del participante.
  - `organizer_email`: Dirección de correo electrónico del creador de la reunión.
  - `location_region`: Ciudad o región geográfica de un país desde la que se unió el participante. Por ejemplo: Boston.
  - `ip_address`: Dirección IP externa del participante.
  - `device_type`: Tipo de dispositivo del participante (por ejemplo: Android, Chromebox, iOS, Web, Jamboard, PSTN_IN).
  - `identifier`: Identificador único del participante (por ejemplo, una dirección de correo electrónico, un número de teléfono o el ID de un dispositivo).
  - `display_name`: Nombre legible del usuario que se muestra en la reunión.
  - `is_external`: Indica si el participante es externo a tu organización. Por defecto, la API de administración de Google enmascara algunos de los identificadores de los participantes externos.

Las métricas por defecto del archivo `conf.yaml` debería bastar para la mayoría de los casos.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][9]
- Ventas: [sales@rapdev.io][1]
- Chat: [rapdev.io][10]
- Teléfono: 855-857-0222
---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: mailto:sales@rapdev.io
[2]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet
[3]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet#call_ended
[4]: https://console.cloud.google.com/projectcreate
[5]: https://console.cloud.google.com/apis/library/admin.googleapis.com
[6]: https://console.cloud.google.com/iam-admin/serviceaccounts/create
[7]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: mailto:support@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-gmeet" target="_blank">adquiere esta aplicación en el Marketplace</a>.