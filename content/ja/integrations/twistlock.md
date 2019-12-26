---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - ログの収集
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/twistlock/README.md'
display_name: Twistlock
git_integration_title: twistlock
guid: 59082b73-62f4-48d4-83f8-af3d5576eae1
integration_id: twistlock
integration_title: Twistlock
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twistlock.
metric_to_check: twistlock.images.cve.details
name: twistlock
public_title: Datadog-Twistlock インテグレーション
short_description: Twistlock はコンテナセキュリティスキャナ
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Twistlock][1] はセキュリティスキャナです。コンテナ、ホスト、パッケージをスキャンして、脆弱性やコンプライアンス上の問題を発見します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Twistlock チェックは [Datadog Agent][3] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### コンフィグレーション

twistlock のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `twistlock.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル twistlock.d/conf.yaml][3] を参照してください。

Kubernetes を使用している場合は、デプロイ前に twistlock_console.yaml の replication controller セクションに構成を追加してください。

```yaml
...
apiVersion: v1
kind: ReplicationController
metadata:
  name: twistlock-console
  namespace: twistlock
spec:
  replicas: 1
  selector:
    name: twistlock-console
  template:
    metadata:
      annotations:
        ad.datadoghq.com/twistlock-console.check_names: '["twistlock"]'
        ad.datadoghq.com/twistlock-console.init_configs: '[{}]'
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"USERNAME", "password": "PASSWORD"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
...
```


[Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `twistlock` を探します。

#### ログの収集

**Agent 6.0 以上で使用可能**

##### Kubernetes

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset 構成][6]でこれを有効にします。

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

2. [こちらのマニフェスト][7]のように、Docker ソケットを Datadog Agent にマウントします。

3. ディフェンダーのポッドアノテーションにログセクションを追加します。コンテナ名は、ポッド仕様の直下にあります。

    ```yaml
      ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
    ```

4. [Agent を再起動します][4]。

##### Docker

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。次のように、環境変数を使用してこれを有効にします。

    ```
      DD_LOGS_ENABLED=true
    ```

2. ディフェンダーコンテナにラベルを追加します。

    ```yaml
      ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
    ```

3. Docker ソケットを Datadog Agent にマウントします。Datadog Agent を使用してログを収集するための構成については、[Docker のドキュメント][8]を参照してください。

4. [Agent を再起動します][4]。

## 収集データ

### メトリクス
{{< get-metrics-from-git "twistlock" >}}


### イベント

Twistlock は、新しい CVE が見つかると、イベントを送信します。

### サービスのチェック

Twistlock は、スキャンに失敗すると、サービスチェックを送信します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.twistlock.com
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[8]: https://docs.datadoghq.com/ja/logs/log_collection/docker/?tab=containerinstallation
[9]: https://github.com/DataDog/integrations-core/blob/master/twistlock/metadata.csv
[10]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}