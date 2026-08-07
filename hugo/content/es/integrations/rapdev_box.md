---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-box
app_uuid: 3de78642-7136-41a8-9df9-48d65ed46251
assets:
  dashboards:
    RapDev Box Overview: assets/dashboards/rapdev_box_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.box.users.count
      metadata_path: metadata.csv
      prefix: rapdev.box.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10278
    source_type_name: RapDev Box
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- nube
- recopilación de logs
- marketplace
- métricas
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_box
integration_id: rapdev-box
integration_title: Box
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_box
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.box
  product_id: box
  short_description: Precio unitario por usuario
  tag: inicio_sesión_usuario
  unit_label: Usuarios Box registrados
  unit_price: 1
public_title: Box
short_description: Monitorizar tus usuarios y tu almacenamiento Box Enterprise
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Categoría::Marketplace
  - Categoría::Métricas
  - Categoría::Notificaciones
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar tus usuarios y tu almacenamiento Box Enterprise
  media:
  - caption: Dashboard de información general de la integración Box - Información
      general
    image_url: images/dashboard_overview_1_4.jpg
    media_type: imagen
  - caption: Dashboard de información general de la integración Box - Usuarios
    image_url: images/dashboard_overview_2_4.jpg
    media_type: imagen
  - caption: Dashboard de información general de la integración Box - Almacenamiento
    image_url: images/dashboard_overview_3_4.jpg
    media_type: imagen
  - caption: Dashboard de información general de la integración Box - Logs
    image_url: images/dashboard_overview_4_4.jpg
    media_type: imagen
  - caption: Ejemplo de interfaz de usuario de Box
    image_url: images/box_ui_16_9.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Box
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->

## Información general
 Esta integración genera métricas de almacenamiento de los usuarios en tu [cuenta de Box Enterprise](https://box.com/) y recopila logs de Box Admin utilizando el endpoint `admin_logs_streaming`. Los siguientes activadores se envían a Datadog como logs:
 + [Objeto fuente usuario](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 + [Eventos escudo](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 + [Eventos de señal](https://developer.box.com/guides/events/event-triggers/sign-events/)
### Métricas
Esta integración recopila métricas de almacenamiento de los usuarios de tu cuenta de Box Enterprise.
Se envían las siguientes métricas:
```
rapdev.box.users.count
rapdev.box.users.storage.max
rapdev.box.users.storage.used
```
### Logs
Esta integración recopila logs de Box Admin utilizando el endpoint `admin_logs_streaming`.
Los siguientes activadores se envían a Datadog como logs:
 + [Objeto fuente usuario](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 ```
 {
  "source": {
    "id": 11446498,
    "type": "user",
    "address": "900 Jefferson Ave, Redwood City, CA 94063",
    "avatar_url": "https://www.box.com/api/avatar/large/181216415",
    "created_at": "2012-12-12T10:53:43-08:00",
    "job_title": "CEO",
    "language": "en",
    "login": "ceo@example.com",
    "max_upload_size": 2147483648,
    "modified_at": "2012-12-12T10:53:43-08:00",
    "name": "Aaron Levie",
    "notification_email": {
      "email": "notifications@example.com",
      "is_confirmed": true
    },
    "phone": 6509241374,
    "space_amount": 11345156112,
    "space_used": 1237009912,
    "status": "active",
    "timezone": "Africa/Bujumbura"
  }
}
 ```
 + [Eventos escudo](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 ```
 {
  "source":null,
  "created_by":{
    "type":"user",
    "id":"2",
    "name":"Unknown User",
    "login":""
  },
  "action_by":null,
  "created_at":"2019-12-20T11:38:56-08:00",
  "event_id":"97f1b31f-f143-4777-81f8-1b557b39ca33",
  "event_type":"SHIELD_ALERT",
  "ip_address":"10.1.2.3",
  "type":"event",
  "session_id":null,
  "additional_details":{
    "..."
  }
}
 ```
 + [Eventos de señal](https://developer.box.com/guides/events/event-triggers/sign-events/)
 ```
 "additional_details": {
    "sign_request": {
        "sign_request_id": "123e4567-e89b-12d3-a456-426614174000",
        "sign_request_short_id": "426614174000",
        "status": "sent",
        "signer_ip_address": null,
        "requestor_ip_address": "",
        "files": [
            {
                "id": "1234567890",
                "type": "file",
                "name": "example_doc.pdf",
                "parent": {
                    "id": "987654321",
                    "type": "folder"
                }
            }
        ],
        "requestor": {
            "id": "13579246",
            "type": "user",
            "name": "John Doe",
            "login": "johndoe@box.com"
        },
        "signer": null,
        "template": {
            "id": "987abC5423",
            "template_type": "Signing",
            "name": "Work Contact"
        },
        "batch_send": {
            "id": "W23YVL46"
        },
        "sender_message": {
            "subject": "Can you please sign this document?",
            "message": "This document shows the terms agreed to on the phone."
        },
        "forward": null
    }
}
 ```
### Dashboards
Esta integración proporciona un dashboard "predefinido" llamado **Información general de la integración Box**. El dashboard se rellena a medida que se recopilan métricas y logs. 

Para que el Agent recopile logs, define `logs_enabled: true` en el archivo principal `datadog.yaml`.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222
---
Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-box" target="_blank">adquiere esta aplicación en el Marketplace</a>.