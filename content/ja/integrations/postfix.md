---
app_id: postfix
app_uuid: 76293d0a-1cde-4f25-ae72-c3e6ef352273
assets:
  dashboards:
    postfix: assets/dashboards/postfix_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: postfix.queue.size
      metadata_path: metadata.csv
      prefix: postfix.
    process_signatures:
    - postfix start
    - sendmail -bd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 66
    source_type_name: Postfix
  logs:
    source: postfix
  saved_views:
    postfix_processes: assets/saved_views/postfix_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/postfix/README.md
display_on_public_website: true
draft: false
git_integration_title: postfix
integration_id: postfix
integration_title: Postfix
integration_version: 1.14.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: postfix
public_title: Postfix
short_description: すべての Postfix キューのサイズを監視する。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::macOS
  configuration: README.md#Setup
  description: すべての Postfix キューのサイズを監視する。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Postfix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Postfix Graph][1]

## 概要

このチェックは、すべての Postfix キューのサイズを監視します。

## 計画と使用

### インフラストラクチャーリスト

Postfix チェックは [Datadog Agent][2] パッケージに含まれています。Postfix サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

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
     ## @param directory - string - optional - default: /var/spool/postfix
     ## Path to the postfix directory. The directory option is required if `postqueue: false` is set. For more 
     ## information see https://docs.datadoghq.com/integrations/postfix/#using-sudo.
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

2. `instances` 内の各 `config_directory` について、Agent は、Postfix コンフィギュレーションディレクトリに対して `postqueue -c` をフォークします。Postfix は、メールキューに対するアクティビティを内部アクセス制御によって制限しています。デフォルトでは、Postfix は `anyone` にキューの表示を許可します。実稼働システムの Postfix インストレーションで、より厳密にアクセス制御が構成されている場合は、`dd-agent` ユーザーにメールキューの表示アクセスを許可することが必要な場合があります。詳しくは、[postqueue Postfix のドキュメント][6]を参照してください。

   ```shell
   postconf -e "authorized_mailq_users = dd-agent"
   ```

   キューの表示を許可されたユーザーのリスト。

   ```shell
   authorized_mailq_users (static:anyone)
   ```

3. [Agent を再起動します][5]。

#### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "postfix" >}}


### ヘルプ

Postfix チェックには、イベントは含まれません。

### ヘルプ

Postfix チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Postfix キューのパフォーマンスの監視][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: http://www.postfix.org/postqueue.1.html
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/monitor-postfix-queues