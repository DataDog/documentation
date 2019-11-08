---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Collaboration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/postfix/README.md'
display_name: Postfix
git_integration_title: postfix
guid: 7f03c5b7-ee54-466e-8854-5896d62c82b4
integration_id: postfix
integration_title: Postfix
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postfix.
metric_to_check: postfix.queue.size
name: postfix
process_signatures:
  - postfix start
  - sendmail -bd
public_title: Datadog-Postfix インテグレーション
short_description: すべての Postfix キューのサイズを監視
support: コア
supported_os:
  - linux
  - mac_os
---
![Postfix Graph][1]

## 概要

このチェックは、すべての Postfix キューのサイズを監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Postfix チェックは [Datadog Agent][3] パッケージに含まれています。Postfix サーバーに追加でインストールする必要はありません。

## コンフィグレーション
このチェックは、`find` コマンドを使用するように構成できます。このコマンドを使用するには、`incoming`、`active`、および `deferred` メールキュー内のメッセージカウントを取得するために、dd-agent ユーザーの sudo アクセスを許可する必要があります。

オプションで、組み込みの `postqueue -p` コマンドを使用して `active`、`hold`、および `deferred` メールキュー内のメッセージカウントを取得するようにエージェントを構成できます。`postqueue` に sudo は必要なく、設定されたグループ ID の権限で実行されます。

**警告**: `postqueue` を使用してメールキューを監視する場合、`incoming` キューのメッセージカウントは報告されません。

### sudo を使用する場合
[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `postfix.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル postfix.d/conf.yaml][5] を参照してください。

```
init_config:
  postfix_user: postfix

instances:
  # 追跡する postfix サービスごとにインスタンスを 1 つ追加します
  - directory: /var/spool/postfix
    queues:
      - incoming
      - active
      - deferred
#   タグ:
#     - optional_tag1
#     - optional_tag2
```

`queues` 内の各メールキューに対して、Agent は、そのディレクトリ上で `find` をフォークします。
これは、Postfix ユーザーの権限で `sudo` を使用して実行されます。そのため、
Agent のユーザー `dd-agent` の `/etc/sudoers` に以下の行を追加する必要があります。
Postfix は `postfix` として実行されているとします。
```
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
```

### postqueue を使用する場合
[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `postfix.d/conf.yaml` ファイルを編集します。

```
init_config:
  postqueue: true

instances:
  # config_directory オプションは、`postqueue: true` の場合にのみ適用されます。
  # config_directory は、Postfix 構成ディレクトリの場所であり、
  # ここに main.cf が置かれます。
  - config_directory: /etc/postfix
#   タグ:
#     - optional_tag
#     - optional_tag0
```
`instances` 内の各 `config_directory` について、Agent は、Postfix 構成ディレクトリに対して `postqueue -c` をフォークします。

Postfix には、メールキューに対するアクティビティを内部アクセス制御によって制限しています。デフォルトでは、Postfix は `anyone` にキューの表示を許可します。実稼働システムの Postfix インストールで、より厳密なアクセス制御が構成されている場合は、dd-agent ユーザーにメールキューの表示アクセスを許可する必要があることがあります。

```
postconf -e "authorized_mailq_users = dd-agent"
```
http://www.postfix.org/postqueue.1.html
```
authorized_mailq_users (static:anyone)
```
キューの表示を許可されたユーザーのリスト。

[Agent を再起動][6]すると、Datadog への Postfix メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

Postfix は syslog デーモンにログを送信し、そのログがファイルシステムに書き込まれます。

命名規則とログファイルの送信先は構成可能です。

```
/etc/syslog.conf:
    mail.err                                    /dev/console
    mail.debug                                  /var/log/maillog
```

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. 次の構成ブロックを `postfix.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル postfix.d/conf.yaml][6] を参照してください。

    ```yaml
      logs:
        - type: file
          path: /var/log/mail.log
          source: postfix
          service: myapp
    ```

3. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `postfix` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "postfix" >}}


### イベント
Postfix チェックには、イベントは含まれません。

### サービスのチェック
Postfix チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Postfix キューのパフォーマンスの監視][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://www.datadoghq.com/blog/monitor-postfix-queues
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[11]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}