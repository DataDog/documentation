---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    postfix: assets/dashboards/postfix_dashboard.json
  logs:
    source: postfix
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    postfix_processes: assets/saved_views/postfix_processes.json
  service_checks: assets/service_checks.json
categories:
  - Collaboration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/postfix/README.md
display_name: Postfix
draft: false
git_integration_title: postfix
guid: 7f03c5b7-ee54-466e-8854-5896d62c82b4
integration_id: postfix
integration_title: Postfix
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postfix.
metric_to_check: postfix.queue.size
name: postfix
process_signatures:
  - postfix start
  - sendmail -bd
public_title: Datadog-Postfix インテグレーション
short_description: すべての Postfix キューのサイズを監視する。
support: コア
supported_os:
  - linux
  - mac_os
---
![Postfix Graph][1]

## 概要

このチェックは、すべての Postfix キューのサイズを監視します。

## セットアップ

### インストール

Postfix チェックは [Datadog Agent][2] パッケージに含まれています。Postfix サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

このチェックは、`find` コマンドを使用するように構成できます。このコマンドを使用するには、`incoming`、`active`、および `deferred` メールキュー内のメッセージカウントを取得するために、`dd-agent` への `sudo` アクセスを許可する必要があります。

オプションで、組み込みの `postqueue -p` コマンドを使用して `active`、`hold`、および `deferred` メールキュー内のメッセージカウントを取得するように Agent を構成できます。`postqueue` に `sudo` は必要なく、設定されたグループ ID の権限で実行されます。

**警告**: `postqueue` を使用してメールキューを監視する場合、`incoming` キューのメッセージカウントは報告されません。

#### メトリクスの収集

##### sudo を使用する場合

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `postfix.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[postfix.d/conf.yaml のサンプル][4] を参照してください。

   ```yaml
   init_config:
     ## @param postfix_user - string - required
     ## The user running dd-agent must have passwordless sudo access for the find
     ## command to run the postfix check.  Here's an example:
     ## example /etc/sudoers entry:
     ##   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
     ##
     ## Redhat/CentOS/Amazon Linux flavours need to add:
     ##          Defaults:dd-agent !requiretty
     #
     postfix_user: postfix

   instances:
     ## @param directory - string - required
     ## Path to the postfix directory.
     #
     - directory: /var/spool/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. `queues` 内の各メールキューに対して、Agent は、そのディレクトリ上で `find` をフォークします。これは、Postfix ユーザーの権限で `sudo` を使用して実行されます。そのため、Agent のユーザーである `dd-agent` の `/etc/sudoers` に以下の行を追加する必要があります。Postfix は `postfix` として実行されているとします。

   ```text
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
   ```

3. [Agent を再起動します][5]。

##### postqueue を使用する場合

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `postfix.d/conf.yaml` ファイルを編集します。

   ```yaml
   init_config:
     ## @param postqueue - boolean - optional - default: false
     ## Set `postqueue: true` to gather mail queue counts using `postqueue -p`
     ## without the use of sudo. Postqueue binary is ran with set-group ID privileges,
     ## so that it can connect to Postfix daemon processes.
     ## Only `tags` keys are used from `instances` definition.
     ## Postfix has internal access controls that limit activities on the mail queue.
     ## By default, Postfix allows `anyone` to view the queue. On production systems
     ## where the Postfix installation may be configured with stricter access controls,
     ## you may need to grant the dd-agent user access to view the mail queue.
     ##
     ## postconf -e "authorized_mailq_users = dd-agent"
     ##
     ## http://www.postfix.org/postqueue.1.html
     ##
     ## authorized_mailq_users (static:anyone)
     ## List of users who are authorized to view the queue.
     #
     postqueue: true

   instances:
     ## @param config_directory - string - optional
     ## The config_directory option only applies when `postqueue: true`.
     ## The config_directory is the location of the Postfix configuration directory
     ## where main.cf lives.
     #
     - config_directory: /etc/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. `instances` 内の各 `config_directory` について、Agent は、Postfix コンフィギュレーションディレクトリに対して `postqueue -c` をフォークします。Postfix は、メールキューに対するアクティビティを内部アクセス制御によって制限しています。デフォルトでは、Postfix は `anyone` にキューの表示を許可します。実稼働システムの Postfix インストレーションで、より厳密にアクセス制御が構成されている場合は、`dd-agent` ユーザーにメールキューの表示アクセスを許可することが必要な場合があります（[postqueue Postfix のドキュメント][6]を参照してください）。

   ```shell
   postconf -e "authorized_mailq_users = dd-agent"
   ```

   キューの表示を許可されたユーザーのリスト。

   ```shell
   authorized_mailq_users (static:anyone)
   ```

3. [Agent を再起動します][5]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Postfix は syslog デーモンにログを送信し、そのログがファイルシステムに書き込まれます。命名規則とログファイルの送信先は構成可能です。

```text
/etc/syslog.conf:
    mail.err                                    /dev/console
    mail.debug                                  /var/log/mail.log
```

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次の構成ブロックを `postfix.d/conf.yaml` ファイルに追加します。それぞれの環境に応じて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[postfix.d/conf.yaml のサンプル][5] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/mail.log
       source: postfix
       service: myapp
   ```

3. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `postfix` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "postfix" >}}


### イベント

Postfix チェックには、イベントは含まれません。

### サービスのチェック

Postfix チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Postfix キューのパフォーマンスの監視][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: http://www.postfix.org/postqueue.1.html
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/monitor-postfix-queues