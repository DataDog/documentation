---
aliases:
  - /ja/integrations/phpfpm
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md'
display_name: PHP-FPM
git_integration_title: php_fpm
guid: 47f2c337-83ac-4767-b460-1927d8343764
integration_id: php-fpm
integration_title: PHP FPM
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: php_fpm.
metric_to_check: php_fpm.processes.total
name: php_fpm
process_signatures:
  - php-fpm
  - php7.0-fpm
  - php7.0-fpm start
  - service php-fpm
  - php7.0-fpm restart
  - restart php-fpm
  - systemctl restart php-fpm.service
  - php7.0-fpm.service
public_title: Datadog-PHP FPM インテグレーション
short_description: プロセスの状態、低速なリクエスト、受け付けたリクエストを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![PHP 概要][1]

## 概要

PHP-FPM チェックは、FPM プールの状態を監視し、リクエストパフォーマンスを追跡します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

PHP-FPM チェックは [Datadog Agent][3] パッケージに含まれています。PHP-FPM を使用するサーバーに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `php_fpm.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル php_fpm.d/conf.yaml][5] を参照してください。

```
init_config:

instances:
  - status_url: http://localhost/status # または、PHP INI で pm.status_path に設定される内容
    ping_url: http://localhost/ping     # または、PHP INI で ping.path に設定される内容
    ping_reply: pong                    # ping からの想定される応答。デフォルトは 'pong'
 #  username: <YOUR_USERNAME> # ステータスと ping URL が HTTP Basic 認証を必要とする場合
 #  password: <YOUR_PASSWORD> # ステータスと ping URL が HTTP Basic 認証を必要とする場合
 #  http_host: <HOST>         # FPM プールに特定の HTTP vhost からのみアクセスできる場合
 #  タグ:
 #    - instance:foo
```

構成オプション

* `status_url` (必須) - fpm プール構成ファイルで定義された PHP FPM ステータスページの URL (pm.status_path)。
* `ping_url` (必須) - fpm プール構成ファイルで定義された PHP FPM ping ページの URL (ping.path)。
* `use_fastcgi` (オプション) - FastCGI を使用して直接 PHP-FPM と通信します。
* `ping_reply` (必須) - ping_url からの応答。応答を定義していない場合は、`pong` になります。
* `username` (オプション) - ステータスページおよび ping ページに基本認証が設定されている場合に使用されます。
* `password` (オプション) - ステータスページおよび ping ページに基本認証が設定されている場合に使用されます。
* `http_host` (オプション) - 特定の HTTP vhost からのみ FPM プールにアクセスできる場合は、ここに指定します。

[Agent を再起動][6]すると、Datadog への PHP-FPM メトリクスの送信が開始されます。

#### 複数のプール

Kubernetes で実行されている場合は、同じプロキシサーバー、共通のシナリオを使用して複数の PHP-FPM プールを監視することもできます。

それには、別の PHP-FPM インスタンスを指すようにサーバーのルートを変更します。以下に Nginx 構成の例を示します。

```
server {
    ...

    location ~ ^/(status1|ping1)$ {
        access_log off;
        fastcgi_pass instance1_ip:instance1_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ ^/(status2|ping2)$ {
        access_log off;
        fastcgi_pass instance2_ip:instance2_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

規模が大きいためにこの方法で手間がかかりすぎる場合は、`use_fastcgi` を `true` に設定して、チェックがプロキシサーバーをバイパスし、FastCGI を使用して直接 PHP-FPM と通信するようにします。`status_url` または `ping_url` からポート番号が省略された場合、デフォルトのポートは `9000` です。

### Unix ソケット

php-fpm インストールが Unix ソケットを使用する場合、`status_url` と `ping_url` に対して以下の構文を使用して、`use_fastcgi` を有効にする必要があります。

```
init_config:

instances:
  - status_url: unix:///path/to/file.sock/status
    ping_url: unix:///path/to/file.sock/ping
    ping_reply: pong
    use_fastcgi: true
```

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `php_fpm` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "php_fpm" >}}


### イベント
PHP-FPM チェックには、イベントは含まれません。

### サービスのチェック

`php_fpm.can_ping`:

構成された `ping_url` でエージェントが PHP-FPM を ping できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/metadata.csv
[9]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}