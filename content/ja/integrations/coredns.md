---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
  logs:
    source: coredns
  metrics_metadata: metadata.csv
  monitors:
    '[CoreDNS] Cache hits count low': assets/monitors/coredns_cache_hits_low.json
    '[CoreDNS] Request duration high': assets/monitors/coredns_request_duration_high.json
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ネットワーク
  - オートディスカバリー
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/coredns/README.md'
display_name: CoreDNS
draft: false
git_integration_title: coredns
guid: 9b316155-fc8e-4cb0-8bd5-8af270759cfb
integration_id: coredns
integration_title: CoreDNS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: coredns.
metric_to_check: coredns.request_count
name: coredns
public_title: Datadog-CoreDNS インテグレーション
short_description: CoreDNS は、Kubernetes の DNS メトリクスを収集します。
support: コア
supported_os:
  - linux
---
## 概要

CoreDNS からリアルタイムにメトリクスを取得して、DNS エラーとキャッシュのヒット/ミスを視覚化および監視します。

## セットアップ

### インストール

CoreDNS チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

**注**:

- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする dd-agent に関連付けられます。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

#### ログの収集

ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[Docker ログ収集ドキュメント][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][2]を使用してテンプレートを構成することもできます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**注**:

- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

#### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][3]を参照してください。

次に、[ログインテグレーション][4]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][5]を使用してこれを構成することもできます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

**注**:

- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

##### ログの収集

ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[ECS ログ収集ドキュメント][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/ja/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `coredns` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "coredns" >}}


### イベント

CoreDNS チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "coredns" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: http://docs.datadoghq.com/help