---
app_id: rapdev-box
app_uuid: 3de78642-7136-41a8-9df9-48d65ed46251
assets:
  dashboards:
    RapDev Box Overview: assets/dashboards/rapdev_box_overview.json
  integration:
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
    source_type_name: RapDev Box
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- cloud
- log collection
- marketplace
- metrics
- notification
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_box
integration_id: rapdev-box
integration_title: Box
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_box
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.box
  product_id: box
  short_description: Prix unitaire par utilisateur
  tag: user_login
  unit_label: Utilisateurs enregistrés Box
  unit_price: 1
public_title: Box
short_description: Surveillez vos utilisateurs et votre stockage dans Box Enterprise
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Marketplace
  - Category::Metrics
  - Category::Notification
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez vos utilisateurs et votre stockage dans Box Enterprise
  media:
  - caption: Dashboard Box Integration Overview - Présentation
    image_url: images/dashboard_overview_1_4.jpg
    media_type: image
  - caption: Dashboard Box Integration Overview - Utilisateurs
    image_url: images/dashboard_overview_2_4.jpg
    media_type: image
  - caption: Dashboard Box Integration Overview - Stockage
    image_url: images/dashboard_overview_3_4.jpg
    media_type: image
  - caption: Dashboard Box Integration Overview - Logs
    image_url: images/dashboard_overview_4_4.jpg
    media_type: image
  - caption: Exemple d'interface utilisateur dans Box
    image_url: images/box_ui_16_9.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Box
  uninstallation: README.md#Uninstallation
---


## Présentation
 Cette intégration transmet des métriques sur le stockage des utilisateurs dans votre [compte Box Enterprise](https://box.com/). Elle recueille également les logs d'administration Box via l'endpoint `admin_logs_streaming`. Les déclencheurs suivants sont transmis à Datadog sous forme de logs :
 + [User Source Object](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 + [Shield Events](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 + [Sign Events](https://developer.box.com/guides/events/event-triggers/sign-events/)
### Métriques
Cette intégration recueille des métriques de stockage sur les utilisateurs de votre compte Box Enterprise.
Les métriques suivantes sont transmises :
```
rapdev.box.users.count
rapdev.box.users.storage.max
rapdev.box.users.storage.used
```
### Logs
Cette intégration recueille les logs d'administration Box via l'endpoint `admin_logs_streaming`.
Les déclencheurs suivants sont transmis à Datadog sous forme de logs :
 + [User Source Object](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
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
 + [Shield Events](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
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
 + [Sign Events](https://developer.box.com/guides/events/event-triggers/sign-events/)
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
Cette intégration contient un dashboard prêt à l'emploi intitulé **Box Integration Overview**. Le dashboard se remplit à mesure que les métriques et les logs sont recueillis.

Pour demander à l'Agent de recueillir les logs, définissez `logs_enabled: true` dans le fichier principal `datadog.yaml`.

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :
- Assistance : support@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222
---
Développé avec ❤️ à Boston *Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-box" target="_blank">Cliquez ici</a> pour l'acheter.