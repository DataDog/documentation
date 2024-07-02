---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-box"
"app_uuid": "3de78642-7136-41a8-9df9-48d65ed46251"
"assets":
  "dashboards":
    "RapDev Box Overview": assets/dashboards/rapdev_box_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.box.users.count
      "metadata_path": metadata.csv
      "prefix": rapdev.box.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10278"
    "source_type_name": RapDev Box
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- cloud
- log collection
- marketplace
- metrics
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_box"
"integration_id": "rapdev-box"
"integration_title": "Box"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_box"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.box
  "product_id": box
  "short_description": Unit price per user
  "tag": user_login
  "unit_label": Box Registered Users
  "unit_price": !!int "1"
"public_title": "Box"
"short_description": "Monitor your Box Enterprise Users and Storage"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Marketplace"
  - "Category::Metrics"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor your Box Enterprise Users and Storage
  "media":
  - "caption": Box Integration Overview Dashboard - Overview
    "image_url": images/dashboard_overview_1_4.jpg
    "media_type": image
  - "caption": Box Integration Overview Dashboard - Users
    "image_url": images/dashboard_overview_2_4.jpg
    "media_type": image
  - "caption": Box Integration Overview Dashboard - Storage
    "image_url": images/dashboard_overview_3_4.jpg
    "media_type": image
  - "caption": Box Integration Overview Dashboard - Logs
    "image_url": images/dashboard_overview_4_4.jpg
    "media_type": image
  - "caption": Example of the Box UI
    "image_url": images/box_ui_16_9.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Box
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## Overview
 This integration reports metrics about user storage in your [Box Enterprise Account](https://box.com/) and collects Box Admin Logs using the `admin_logs_streaming` endpoint. The following triggers are submitted to Datadog as logs:
 + [User Source Object](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 + [Shield Events](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 + [Sign Events](https://developer.box.com/guides/events/event-triggers/sign-events/)
### メトリクス
This integration collects storage metrics about users in your Box enterprise account.
The following metrics are submitted:
```
rapdev.box.users.count
rapdev.box.users.storage.max
rapdev.box.users.storage.used
```
### Logs
This integration collects Box Admin Logs using the `admin_logs_streaming` endpoint.
The following triggers are submitted to Datadog as logs:
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
### ダッシュボード
This integration provides an out-of-the-box dashboard named **Box Integration Overview**. The dashboard populates as metrics and logs are collected. 

In order for the Agent to collect logs, set `logs_enabled: true` in the main `datadog.yaml` file.

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222
---
Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-box" target="_blank">Click Here</a> to purchase this application.
