---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: twistlock
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - ログの収集
  - オートディスカバリー
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

[Twistlock][1] はセキュリティスキャナです。コンテナ、ホスト、パッケージをスキャンして、脆弱性やコンプライアンス問題を発見します。

## セットアップ

### インストール

Twistlock チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. twistlock のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `twistlock.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル twistlock.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][4]ガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `twistlock`                                                                         |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                       |
| `<インスタンスコンフィギュレーション>`  | `{"url":"http://%%host%%:8083", "username":"<ユーザー名>", "password": "<パスワード>"}` |

###### Kubernetes

Kubernetes を使用している場合は、デプロイ前に twistlock_console.yaml の replication controller セクションに構成を追加してください。

```yaml
---
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
        ad.datadoghq.com/twistlock-console.init_configs: "[{}]"
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<ユーザー名>", "password": "<パスワード>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
```

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][5]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### Kubernetes

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[DaemonSet コンフィギュレーション][6]でこれを有効にします。

   ```yaml
     #(...)
       env:
         #(...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     #(...)
   ```

2. [こちらのマニフェスト][7]のように、Docker ソケットを Datadog Agent にマウントします。

3. ディフェンダーのポッドアノテーションにログセクションを追加します。コンテナ名は、ポッド仕様の直下にあります。

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

4. [Agent を再起動します][3]。

###### Docker

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。次のように、環境変数を使用してこれを有効にします。

   ```shell
   DD_LOGS_ENABLED=true
   ```

2. ディフェンダーコンテナにラベルを追加します。

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

3. Docker ソケットを Datadog Agent にマウントします。Datadog Agent を使用してログを収集するための構成については、[Docker のドキュメント][8]を参照してください。

4. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `twistlock` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "twistlock" >}}


### イベント

Twistlock は、新しい CVE が見つかると、イベントを送信します。

### サービスのチェック

Twistlock は、スキャンに失敗すると、サービスチェックを送信します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://www.twistlock.com
[2]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[8]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/twistlock/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/