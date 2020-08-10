---
aliases:
  - /ja/integrations/phpfpm
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
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
kind: インテグレーション
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
short_description: プロセスの状態、低速なリクエスト、受け付けたリクエストを監視.
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

### インストール

PHP-FPM チェックは [Datadog Agent][2] パッケージに含まれています。PHP-FPM を使用するサーバーに追加でインストールする必要はありません。

### 構成

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

#### ホスト

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `php_fpm.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[php_fpm.d/conf.yaml のサンプル][5]を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param status_url - string - required
     ## Get metrics from your FPM pool with this URL
     ## The status URLs should follow the options from your FPM pool
     ## See http://php.net/manual/en/install.fpm.configuration.php
     ##   * pm.status_path
     ## You should configure your fastcgi passthru (nginx/apache) to catch these URLs and
     ## redirect them through the FPM pool target you want to monitor (FPM `listen`
     ## directive in the config, usually a UNIX socket or TCP socket.
     #
     - status_url: http://localhost/status

       ## @param ping_url - string - required
       ## Get a reliable service check of your FPM pool with `ping_url` parameter
       ## The ping URLs should follow the options from your FPM pool
       ## See http://php.net/manual/en/install.fpm.configuration.php
       ##   * ping.path
       ## You should configure your fastcgi passthru (nginx/apache) to
       ## catch these URLs and redirect them through the FPM pool target
       ## you want to monitor (FPM `listen` directive in the config, usually
       ## a UNIX socket or TCP socket.
       #
       ping_url: http://localhost/ping

       ## @param use_fastcgi - boolean - required - default: false
       ## Communicate directly with PHP-FPM using FastCGI
       #
       use_fastcgi: false

       ## @param ping_reply - string - required
       ## Set the expected reply to the ping.
       #
       ping_reply: pong
   ```

2. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<インテグレーション名>` | `php_fpm`                                                                                                                |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                                            |
| `<インスタンスコンフィギュレーション>`  | `{"status_url":"http://%%host%%/status", "ping_url":"http://%%host%%/ping", "use_fastcgi": false, "ping_reply": "pong"}` |

#### 追加情報

##### 複数のプール

Kubernetes で実行されている場合は、同じプロキシサーバー、共通のシナリオを使用して複数の PHP-FPM プールを監視することができます。それには、別の PHP-FPM インスタンスを指すようにサーバーのルートを変更します。以下に NGINX コンフィギュレーションの例を示します。

```text
server {
    ...

    location ~ ^/(status1|ping1)$ {
        access_log off;
        fastcgi_pass instance1_ip:instance1_port;
        include fastcgi_params;
        fastcgi_param スクリプトのファイル名 $document_root$fastcgi_script_name;
    }

    location ~ ^/(status2|ping2)$ {
        access_log off;
        fastcgi_pass instance2_ip:instance2_port;
        include fastcgi_params;
        fastcgi_param スクリプトのファイル名 $document_root$fastcgi_script_name;
    }
}
```

規模が大きいためにこの方法で手間がかかりすぎる場合は、`use_fastcgi` を `true` に設定して、チェックがプロキシサーバーをバイパスし、FastCGI を使用して直接 PHP-FPM と通信するようにします。`status_url` または `ping_url` からポート番号が省略された場合、デフォルトのポートは `9000` です。

##### Unix ソケット

PHP-FPM インストールが Unix ソケットを使用する場合、`status_url` と `ping_url` に対して以下の構文を使用して、`use_fastcgi` を有効にする必要があります。

| パラメーター     | 値                             |
| ------------- | --------------------------------- |
| `status_url`  | `unix:///<ファイル_パス>.sock/status` |
| `ping_url`    | `unix:///<ファイル_パス>.sock/ping`   |
| `ping_reply`  | `pong`                            |
| `use_fastcgi` | `true`                            |

**注**: オートディスカバリーを使用する場合、個別のコンテナ/タスク/ポッドで稼働する Agent は、FPM プールの Unix ソケットファイルにアクセスできません。アクセスするためには、Agent をサイドカーとして実行する必要があります。

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

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/