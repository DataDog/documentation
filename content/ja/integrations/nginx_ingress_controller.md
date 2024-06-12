---
app_id: nginx-ingress-controller
app_uuid: f84e3ebf-848b-4894-a5b0-9abbd21d4189
assets:
  dashboards:
    nginx_ingress_controller: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nginx_ingress.nginx.process.count
      metadata_path: metadata.csv
      prefix: nginx_ingress.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10050
    source_type_name: nginx-ingress-controller
  logs:
    source: nginx-ingress-controller
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
- ログの収集
- ネットワーク
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: nginx_ingress_controller
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
integration_version: 2.6.0
is_public: true
manifest_version: 2.0.0
name: nginx_ingress_controller
public_title: nginx-ingress-controller
short_description: NGINX Ingress Controller と埋め込み NGINX に関するメトリクスを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: NGINX Ingress Controller と埋め込み NGINX に関するメトリクスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: nginx-ingress-controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックでは、Kubernetes の [NGINX Ingress Controller][1] を監視します。F5 NGINX Ingress Controller を監視するには、[NGINX Prometheus Exporter][3] が提供するリストから目的のメトリクスを監視するように [Datadog Prometheus インテグレーション][2]をセットアップしてください。


## 計画と使用

### インフラストラクチャーリスト

`nginx-ingress-controller` チェックは [Datadog Agent][4] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

Agent がホストで実行されている場合は、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `nginx_ingress_controller.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nginx_ingress_controller.d/conf.yaml][1] を参照してください。次に、[Agent を再起動][2]します。

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### メトリクスの収集

デフォルトでは、NGINX のメトリクスは `nginx-ingress-controller` チェックによって収集されますが、Ingress Controller に対して標準の `nginx` チェックを実行できると便利な場合があります。

これは、Agent から NGINX のステータスページに到達できるようにすることで実現できます。それには、コントローラーで `nginx-status-ipv4-whitelist` 設定を使用し、コントローラーポッドにオートディスカバリーアノテーションを追加します。

たとえば、以下のアノテーションは、`nginx` および `nginx-ingress-controller` のチェックとログ収集を共に有効にします。

| パラメーター            | 値                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<INIT_CONFIG>`      | `[{},{}]`                                                                                                          |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

使用可能なすべての構成オプションの詳細については、[sample nginx_ingress_controller.d/conf.yaml][5] を参照してください。

**注**: `nginx-ingress-controller` の 0.23.0 以降のバージョンでは、ポート`18080` でリッスンしている `nginx` サーバーは削除されました。構成 ConfigMap に次の `http-snippet` を追加することで復元できます。

```text
  http-snippet: |
    server {
      listen 18080;

      location /nginx_status {
        allow all;
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

#### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][6]を参照してください。

| パラメーター      | 値                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `nginx_ingress_controller` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### ヘルプ

NGINX Ingress Controller には、イベントは含まれません。

### ヘルプ

NGINX Ingress Controller には、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/prometheus/
[3]: https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/