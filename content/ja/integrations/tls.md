---
app_id: tls
app_uuid: 347d6721-fe59-4215-a4f6-415feb4dda0c
assets:
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tls.seconds_left
      metadata_path: metadata.csv
      prefix: tls.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10058
    source_type_name: TLS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tls/README.md
display_on_public_website: true
draft: false
git_integration_title: tls
integration_id: tls
integration_title: TLS
integration_version: 2.17.0
is_public: true
manifest_version: 2.0.0
name: tls
public_title: TLS
short_description: Monitor TLS for protocol version, certificate expiration & validity,
  etc.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor TLS for protocol version, certificate expiration & validity,
    etc.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TLS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [TLS][1] protocol versions, certificate expiration and validity, etc.

**Notes**:

1. Only TCP is supported.
2. Only leaf / end user certificates are verified (not intermediate and root certificates).

## セットアップ

### インストール

The TLS check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

1. Edit the `tls.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your TLS data. See the [sample tls.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `tls`                                  |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port":"443"}` |

**Note**: If you are using internal certificates that are not from a well-known, trusted CA, certain metrics may not report to Datadog. Use `tls_verify: false` in your integration template to report all metrics in this instance.

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `tls` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "tls" >}}


### イベント

TLS does not include any events.

### サービスチェック
{{< get-service-checks-from-git "tls" >}}


## トラブルシューティング

Need help? Contact [Datadog support][4].



[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/