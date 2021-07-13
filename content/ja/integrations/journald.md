---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/journald/README.md'
display_name: journald
draft: false
git_integration_title: journald
guid: 845431ef-9092-4254-a188-138fc9273fa5
integration_id: journald
integration_title: journald
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: journald.
metric_to_check: ''
name: journald
public_title: journald
short_description: Datadog を使用して systemd-journald ログを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Systemd-journald は、ログデータを収集して保管するシステムサービスです。
さまざまなソースからのログ情報に基づいて、構造化およびインデックス化されたジャーナルを作成し、維持します。

## セットアップ

### インストール

journald チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

ジャーナルファイルは、デフォルトでは、systemd-journal システムグループによって所有され、読み取られます。ジャーナルログの収集を開始するには、以下のようにします。

1. ジャーナルを実行しているインスタンスに [Agent をインストールします][2]。
2. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。
    ```text
     usermod -a -G systemd-journal dd-agent
    ```

{{< tabs >}}
{{% tab "Host" %}}

ホストで実行中の Agent に対してこのチェックを構成するには:

ログの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `journald.d/conf.yaml` ファイルを編集します。

#### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

```yaml
logs_enabled: true
```

ログの収集を開始するには、次の構成ブロックを `journald.d/conf.yaml` ファイルに追加します。

```yaml
logs:
    - type: journald
      container_mode: true
```

`source` および `service` 属性の値を埋めるために、Agent は `SYSLOG_IDENTIFIER`、`_SYSTEMD_UNIT`、`_COMM` を収集し、最初に検出した空でない値に設定します。インテグレーションのパイプラインを活用するため、Datadog は `systemd` サービスファイルまたは `systemd` サービスオーバーライドファイルに `SyslogIdentifier` パラメーターを直接設定することをおすすめしています。これらの場所はお使いのディストリビューションにより異なりますが、`systemctl show -p FragmentPath <unit_name>` コマンドを使って `systemd` サービスファイルの場所を検索することができます。

**注**: Agent 7.17 以降では、`container_mode` が `true` に設定されている場合、Docker コンテナに基づいてログのデフォルトの動作変更が行われます。ログの `source` 属性は、単に `docker` ではなく、対応するコンテナの短いイメージ名に自動的に設定されます。

[Agent を再起動します][2]。


{{% /tab %}}
{{% tab "Containerized" %}}

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][5]のガイドを参照して、次のパラメーターを適用してください。

#### ログの収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][6]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "journald", "service": "<YOUR_APP_NAME>"}` |

{{% /tab %}}
{{< /tabs >}}


#### 高度な機能

##### ジャーナルの場所の変更

Agent は、デフォルトで次の場所でジャーナルを探します。

- `/var/log/journal`
- `/run/log/journal`

ジャーナルがこれ以外の場所にある場合は、`path` パラメーターに、対応するジャーナルのパスを追加します。

##### ジャーナルユニットの絞り込み

以下のパラメーターを使用して、特定のユニットに絞り込んだり除外することができます。

- `include_units`: 指定されたすべてのユニットを含めます。
- `exclude_units`: 指定されたすべてのユニットを除外します。

例:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

##### コンテナタグの収集

高度に動的なコンテナ環境において情報を見つける際にタグは重要です。Agent が journald ログからコンテナタグを収集できる理由はここにあります。

Agent がホストから実行されている場合、これは自動的に機能します。Datadog Agent のコンテナバージョンを使用している場合は、ジャーナルパスと次のファイルをマウントしてください。

- `/etc/machine-id`: これで、Agent は、ホストに格納されたジャーナルに確実に問い合わせることができます。

### 検証

Agent の [status サブコマンド][3]を実行し、ログ Agent セクションで ``journald`` を探します。

## 収集データ

### メトリクス

journald には、メトリクスは含まれません。

### サービスのチェック

journald には、サービスのチェック機能は含まれません。

### イベント

journald には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/