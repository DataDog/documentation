---
integration_title: Journald
kind: インテグレーション
public_title: Datadog-Journald インテグレーション
categories:
  - ログの収集
description: ジャーナルから Datadog にログを転送
short_description: ジャーナルから Datadog にログを転送
has_logo: true
is_public: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/journald.md'
name: journald
ddtype: check
supported_os:
  - linux
further_reading:
  - link: logs/guide/docker-logs-collection-troubleshooting-guide
    tag: Documentation
    text: Docker ログ収集
---
## 概要

Systemd-journald は、ログデータを収集して保管するシステムサービスです。さまざまなソースから受け取ったログ情報に基づいて、構造化およびインデックス化されたジャーナルを作成し、維持します。

## セットアップ

### インストール

ジャーナルファイルは、デフォルトでは、`systemd-journal` システムグループによって所有され、読み取られます。ジャーナルログの収集を開始するには、以下のようにします。

1. ジャーナルを実行しているインスタンスに [Agent をインストールします][1]。
2. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。

```text
usermod -a -G systemd-journal dd-agent
```

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

ホストで実行中の Agent に対してこのチェックを構成するには:

Agent のディレクトリのルートにある Agent の `conf.d/` フォルダー内の `journald.d/conf.yaml` ファイルを編集します。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

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

最後に、[Agent を再起動][1]します。

[1]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

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
- `/var/run/journal`

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

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/help/