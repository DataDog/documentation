---
app_id: journald
app_uuid: 2ee4cbe2-2d88-435b-9ed9-dbe07ca1d059
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10167
    source_type_name: journald
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/journald/README.md
display_on_public_website: true
draft: false
git_integration_title: journald
integration_id: journald
integration_title: journald
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: journald
public_title: journald
short_description: Datadog を使用して systemd-journald ログを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  configuration: README.md#Setup
  description: Datadog を使用して systemd-journald ログを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: journald
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Systemd-journald は、ログデータを収集して保管するシステムサービスです。
さまざまなソースからのログ情報に基づいて、構造化およびインデックス化されたジャーナルを作成し、維持します。

## 計画と使用

### インフラストラクチャーリスト

journald チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

ジャーナルファイルは、デフォルトでは、systemd-journal システムグループによって所有され、読み取られます。ジャーナルログの収集を開始するには、以下のようにします。

1. ジャーナルを実行しているインスタンスに [Agent をインストールします][2]。
2. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。
    ```text
     usermod -a -G systemd-journal dd-agent
    ```

{{< tabs >}}
{{% tab "ホスト" %}}

ホストで実行中の Agent に対してこのチェックを構成するには

ログの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `journald.d/conf.yaml` ファイルを編集します。

#### 収集データ

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


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "journald", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}


#### 高度な機能

##### ジャーナルの場所の変更

Agent は、デフォルトで次の場所でジャーナルを探します。

- `/var/log/journal`
- `/run/log/journal`

ジャーナルがこれ以外の場所にある場合は、`path` パラメーターに、対応するジャーナルのパスを追加します。

##### ジャーナルユニットの絞り込み

これらのパラメーターを使用することで、特定の_システムレベル_ユニットをフィルターにかけることができます。

- `include_units`: 指定されたすべてのシステムレベルユニットを含めます。
- `exclude_units`: 指定されたすべてのシステムレベルユニットを除外します。


例:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

Datadog Agent バージョン `7.37.0`+ では、これらのパラメーターを使用して、_ユーザーレベル_ユニットをフィルターにかけることができます。

- `include_user_units`: 指定されたすべてのユーザーレベルユニットを含めます。
- `exclude_user_units`: 指定されたすべてのユーザーレベルユニットを除外します。

**注**: `exclude_units` または `exclude_user_units` でワイルドカード `*` を使用すると、特定の Journald ログを指定できます。ワイルドカード `*` は `include_units` では機能しません。デフォルトでは、システムにもユーザーにもユニットがなく、一致するものが定義されていない場合、すべてのジャーナルログが収集されます。

例:

```yaml
logs:
    # すべてのシステムレベルユニットログを収集します。
    - type: journald
      exclude_user_units:
          - '*'
```

##### ジャーナルメッセージのフィルター

Datadog Agent バージョン `7.39.0`+ では、これらのパラメーターを持つキー値ペアを使用して、任意のメッセージをフィルターにかけることができます。

- `include_matches`: `key=value` に一致するメッセージを含めます。
- `exclude_matches`: `key=value` に一致するメッセージを除外します。


例:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_matches:
          - _TRANSPORT=kernel
```

##### 同じジャーナルを複数回追跡する

異なるソースタグやサービスタグを持つユニットを報告したい場合、これらは別々の journald 構成に表示する必要があります。

これを行うには、ジャーナル構成を `config_id` で一意に識別する必要があります (Agent `7.41.0`+ で利用可能)。

```yaml
logs:
    - type: journald
      config_id: my-app1
      source: my-app1
      service: my-app1
      include_units:
          - my-app1.service

    - type: journald
      config_id: my-app2
      source: my-app2
      service: my-app2
      include_units:
          - my-app2.service
```

##### コンテナタグの収集

高度に動的なコンテナ環境において情報を見つける際にタグは重要です。Agent が journald ログからコンテナタグを収集できる理由はここにあります。

Agent がホストから実行されている場合、これは自動的に機能します。Datadog Agent のコンテナバージョンを使用している場合は、ジャーナルパスと次のファイルをマウントしてください。

- `/etc/machine-id`: これで、Agent は、ホストに格納されたジャーナルに確実に問い合わせることができます。

### 検証

Agent の [status サブコマンド][3]を実行し、ログ Agent セクションで ``journald`` を探します。

## リアルユーザーモニタリング

### データセキュリティ

journald には、メトリクスは含まれません。

### ヘルプ

journald には、サービスのチェック機能は含まれません。

### ヘルプ

journald には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/