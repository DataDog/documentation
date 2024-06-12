---
app_id: php-fpm
app_uuid: 34faabdb-8545-4a45-a8bd-be0f979e99e7
assets:
  dashboards:
    php-fpm: assets/dashboards/php-fpm_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_fpm.processes.total
      metadata_path: metadata.csv
      prefix: php_fpm.
    process_signatures:
    - php-fpm
    - 'php-fpm:'
    - php7.0-fpm
    - php7.0-fpm start
    - service php-fpm
    - php7.0-fpm restart
    - restart php-fpm
    - systemctl restart php-fpm.service
    - php7.0-fpm.service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 117
    source_type_name: PHP-FPM
  saved_views:
    php-fpm_processes: assets/saved_views/php-fpm_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md
display_on_public_website: true
draft: false
git_integration_title: php_fpm
integration_id: php-fpm
integration_title: PHP FPM
integration_version: 3.3.0
is_public: true
manifest_version: 2.0.0
name: php_fpm
public_title: PHP FPM
short_description: プロセスの状態、低速なリクエスト、受け付けたリクエストを監視.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  configuration: README.md#Setup
  description: プロセスの状態、低速なリクエスト、受け付けたリクエストを監視.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP FPM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![PHP 概要][1]

## 概要

PHP-FPM チェックは、FPM プールの状態を監視し、リクエストパフォーマンスを追跡します。

## 計画と使用

### インフラストラクチャーリスト

PHP-FPM チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `php_fpm.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[php_fpm.d/conf.yaml のサンプル][2]を参照してください。

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

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `php_fpm`                                                                                                                |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                                            |
| `<INSTANCE_CONFIG>`  | `{"status_url":"http://%%host%%/status", "ping_url":"http://%%host%%/ping", "use_fastcgi": false, "ping_reply": "pong"}` |

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

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `php_fpm` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "php_fpm" >}}


### ヘルプ

PHP-FPM チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "php_fpm" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/