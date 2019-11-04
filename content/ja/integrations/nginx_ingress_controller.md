---
assets:
  dashboards: {}
  monitors: {}
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

### コンフィグレーション

#### メトリクスの収集

1. NGINX Ingress Controller のメトリクスの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `nginx_ingress_controller.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル nginx_ingress_controller.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### ログの収集

NGINX Ingress Controller から、Weave NPC、Weave Kube などのログを収集して Datadog へ送信します。

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset 構成][4]でこれを有効にします。

    ```
      (...)
        env:
          (...)
          - name: DD_LOGS_ENABLED
              value: "true"
          - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
      (...)
    ```

2. [こちらのマニフェスト][5]のように、Docker ソケットを Datadog Agent にマウントします。

3. [Agent を再起動します][3]。

### NGINX チェックのコンフィグレーション (オプション)

デフォルトでは、NGINX のメトリクスは `nginx-ingress-controller` チェックによって収集されますが、Ingress Controller に対して標準の `nginx` チェックを実行できると便利な場合があります。

これは、Agent から NGINX のステータスページに到達できるようにすることで実現できます。それには、コントローラーで `nginx-status-ipv4-whitelist` 設定を使用し、コントローラーポッドにオートディスカバリーアノテーションを追加します。

たとえば、以下のアノテーションは、`nginx` および `nginx-ingress-controller` のチェックとログ収集を共に有効にします。

```text
ad.datadoghq.com/nginx-ingress-controller.check_names: '["nginx","nginx_ingress_controller"]'
ad.datadoghq.com/nginx-ingress-controller.init_configs: '[{},{}]'
ad.datadoghq.com/nginx-ingress-controller.instances: '[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]'
ad.datadoghq.com/nginx-ingress-controller.logs: '[{"service": "controller", "source":"nginx-ingress-controller"}]'
```

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `nginx_ingress_controller` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### イベント

NGINX Ingress Controller には、イベントは含まれません。

### サービスのチェック

NGINX Ingress Controller には、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}