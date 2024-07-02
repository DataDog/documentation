---
"app_id": "contrastsecurity"
"app_uuid": "8509e113-cf2e-42f1-b8d4-1261720498a5"
"assets":
  "dashboards":
    "Contrast Security Integration Overview": assets/dashboards/contrast_security_protect.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": contrastsecurity.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10084"
    "source_type_name": contrastsecurity
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Contrast Security
  "sales_email": kristiana.mitchell@contrastsecurity.com
  "support_email": kristiana.mitchell@contrastsecurity.com
"categories":
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "contrastsecurity"
"integration_id": "contrastsecurity"
"integration_title": "Contrast Security"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "contrastsecurity"
"public_title": "Contrast Security"
"short_description": "See attacks and vulnerabilities on Datadog from Contrast Security"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": See attacks and vulnerabilities on Datadog from Contrast Security
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Contrast Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The Datadog-Contrast integration allows you to get your Contrast logs into Datadog.

## セットアップ

### Log collection

Enable logs collection for Datadog Agent in `/etc/datadog-agent/datadog.yaml` on Linux platforms. On other platforms, see the [Agent Configuration Files guide][1] for the location of your configuration file:

```yaml
logs_enabled: true
```

- Add this configuration block to your `contrastsecurity.d/conf.yaml` file to start collecting your Contrast Logs:
- Create a new `conf.yaml` file.
- Add a custom log collection configuration group.

    ```yaml
    logs:
      - type: file
        path: /path/to/contrast/security.log
        service: contrast
        source: contrastsecurity
    ```

For more information on logs, see the [Contrast Security documentation][2].

- [Restart the Datadog Agent][3].

For more information, see the:
- [Datadog Logs documentation][4]
- [Datadog Dashboards API][5]

## 収集データ

### メトリクス

The Contrast integration does not include any metrics.

### イベント

The Contrast integration does not send any events.

### サービスチェック

The Contrast integration does not include any service checks.

## トラブルシューティング

Need help? Contact the [maintainer][6] of this integration.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/
[2]: https://docs.contrastsecurity.com/
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/logs/log_collection/
[5]: https://docs.datadoghq.com/api/#create-a-dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/manifest.json

