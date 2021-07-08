---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    nginx_ingress_controller: assets/dashboards/overview.json
  logs:
    source: nginx-ingress-controller
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - オーケストレーション
  - コンテナ
  - ログの収集
  - web
  - ネットワーク
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md'
display_name: nginx-ingress-controller
draft: false
git_integration_title: nginx_ingress_controller
guid: 27f6a498-6b3e-41b0-bec4-68db4d3322c3
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nginx_ingress.
metric_to_check: nginx_ingress.nginx.process.count
name: nginx_ingress_controller
public_title: Datadog-nginx-ingress-controller インテグレーション
short_description: NGINX Ingress Controller と埋め込み NGINX に関するメトリクスを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Kubernetes の [NGINX Ingress Controller][1] を監視します。

## セットアップ

### インストール

`nginx-ingress-controller` チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

Agent がホストで実行されている場合に NGINX Ingress Controller のメトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `nginx_ingress_controller.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nginx_ingress_controller.d/conf.yaml][1] を参照してください。次に、[Agent を起動][2]します。

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

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
| `<インテグレーション名>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<初期コンフィギュレーション>`      | `[{},{}]`                                                                                                          |
| `<インスタンスコンフィギュレーション>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

使用可能なすべての構成オプションの詳細については、[sample nginx_ingress_controller.d/conf.yaml][2] を参照してください。

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

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

| パラメーター      | 値                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `nginx_ingress_controller` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### イベント

NGINX Ingress Controller には、イベントは含まれません。

### サービスのチェック

NGINX Ingress Controller には、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/