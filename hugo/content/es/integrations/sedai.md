---
app_id: sedai
app_uuid: fa7de455-fef8-4cb2-af30-9baa50e351f2
assets:
  dashboards:
    Sedai Overview: assets/dashboards/sedai_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sedai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10249
    source_type_name: Sedai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sedai
  sales_email: praveen.prakash@sedai.io
  support_email: praveen.prakash@sedai.io
categories:
- automatización
- nube
- gestión de costes
- notificaciones
- orquestación
- aprovisionamiento
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md
display_on_public_website: true
draft: false
git_integration_title: sedai
integration_id: sedai
integration_title: Sedai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sedai
public_title: Sedai
short_description: Una plataforma autónoma para gestionar de forma inteligente tus
  aplicaciones en la nube
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Cost Management
  - Category::Notifications
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Una plataforma autónoma para gestionar de forma inteligente tus aplicaciones
    en la nube
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Sedai
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Sedai es una plataforma de nube autónoma que gestiona proactivamente entornos de producción para prevenir problemas y mejorar la disponibilidad, el rendimiento y los costes de la nube. Como piloto automático inteligente para las ingenierías de fiabilidad de sitios (SRE), Sedai detecta, prioriza y analiza de forma independiente los datos de monitorización para actuar de forma segura y autónoma en la producción sin umbrales.

Habilita esta integración para recibir notificaciones en Datadog sobre las acciones que Sedai ejecuta de forma autónoma en tus entornos de producción.

### Funcionamiento

* **Agentless:** Se conecta sin problemas a tus cuentas en la nube y detecta y comprende automáticamente entornos de producción.

* **No necesita configuración:** Se conecta fácilmente a la API Datadog e identifica, prioriza y aprende de forma inteligente el comportamiento de las métricas.

* **Acciones proactivas:** Actúa de forma segura en la producción en tu nombre para garantizar que los recursos eviten problemas de disponibilidad y funcionen de forma óptima en todo momento.

## Configuración

En Sedai:

1. Ve a Settings > Notifications > Add Integration > Datadog Icon (Parámetros > Notificaciones > Añadir integración > Icono de Datadog)

   ![Añadir integración Datadog][1]

2. Introduce un apodo y la clave de API de tu cuenta de Datadog. Habilita y prueba la integración.

   ![Configurar la clave de API Datadog][2]

3. Una vez que compruebes que el test funciona, haz clic en Save (Guardar).

   ![Guardar una integración Datadog en funcionamiento][3]

4. En Settings > Notifications (Configuración > Notificaciones), [selecciona las notificaciones][4] que quieres enviar a Datadog. 

   ![Activar notificaciones de Datadog][5]

## Datos recopilados

Esta integración envía eventos a Datadog.

## Soporte

Si necesitas ayuda con esta integración, ponte en contacto con el [servicio de asistencia de Datadog][6].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/es/help/