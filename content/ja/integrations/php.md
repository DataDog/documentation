---
categories:
  - languages
  - log collection
ddtype: ライブラリ
dependencies: []
description: DogStatsD PHP を使用して、PHP アプリケーションからカスタムメトリクスを送信 client.
doc_link: 'https://docs.datadoghq.com/integrations/php/'
git_integration_title: php
has_logo: true
integration_title: PHP
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: php
public_title: Datadog-PHP インテグレーション
short_description: DogStatsD PHP を使用して、PHP アプリケーションからカスタムメトリクスを送信 PHP client.
version: '1.0'
---
{{< img src="integrations/php/phpgraph.png" alt="PHP Graph"  >}}

## 概要

PHP アプリケーションを Datadog に接続して、以下のことができます。

* アプリケーションのパフォーマンスを視覚化できます。
* アプリケーションのパフォーマンスを他のアプリケーションと関連付けることができます。
* 関連するメトリクスを監視できます。
* PHP のログを収集できます。

## セットアップ
PHP インテグレーションを使用すると、数行のコードのインスツルメンテーションでカスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスを設定できます。メトリクスの送信の詳細については、Datadog の[メトリクス][1]のドキュメントを参照してください。

### インストールオプション
Composer を使用するか、[GitHub リポジトリ][2]を使用して手動で、PHP Datadog StatsD クライアントをインストールします。

#### Composer によるインストール

`composer.json` に以下を追加します。

```
"datadog/php-datadogstatsd": "1.3.*"
```

**注**: Composer に付属している最初のバージョンは 0.0.3 です。

#### 手動インストール

[Git リポジトリ][2]を複製します。

```
git clone git@github.com:DataDog/php-datadogstatsd.git
```

セットアップ: `require './src/DogStatsd.php';`

###         - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP

**Agent 6 .0 以上で使用可能**

Datadog Agent を使用して PHP ログファイルを監視し、ログを Datadog へ転送します。ロギングライブラリを使用してログを生成する手順については、以下のライブラリごとのガイドを参照してください。

* [Monolog][3]
* [Symfony][4]
* [Zend-Log][5]

## 使用方法

### インスタンス化

`composer` を使用して DogStatsd オブジェクトをインスタンス化するには、以下を使用します。

```php
require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;
use DataDog\BatchedDogStatsd;

$statsd = new DogStatsd();
$statsd = new BatchedDogStatsd();
```

DogStatsd コンストラクタはコンフィグレーション配列を受け取ります。コンフィグレーションは、以下のオプション値を受け取ることができます。

| 値         | 説明                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------|
| `host`        | DogStatsd サーバーのホスト。デフォルトは `localhost` です。                                                                        |
| `port`        | DogStatsd サーバーのポート。デフォルトは `8125` です。                                                                             |
| `socket_path` | DogStatsd UNIX ソケットのパス (`host` と `port` を上書きします。`datadog-agent` 6 以降でのみサポートされます)。デフォルトは `null` です。 |
| `global_tags` | 送信されるすべてのメトリクスに適用されるタグ。                                                                                                |

### タグ

`tags` 引数は、配列または文字列にすることができます。この値は `null` に設定できます。

```php

$statsd->increment('<METRIC.NAME>', 1, array('app' => 'php1', 'beta' => null));
$statsd->increment('<METRIC.NAME>', 1, "app:php1,beta");
```

### インクリメント

メトリクスをインクリメントするには、以下のようにします。

``` php
$statsd->increment('<METRIC.NAME>');
$statsd->increment('<METRIC.NAME>', .5);
$statsd->increment('<METRIC.NAME>', 1, array('<TAG_KEY>' => '<VALUE>'));
```

### デクリメント

メトリクスをデクリメントするには、以下のようにします。

``` php
$statsd->decrement('<METRIC.NAME>');
```

### 時間

メトリクスの時間を設定するには、以下のようにします。

``` php
$start_time = microtime(true);
run_function();
$statsd->microtiming('<METRIC.NAME>', microtime(true) - $start_time);

$statsd->microtiming('<METRIC.NAME>', microtime(true) - $start_time, 1, array('<TAG_KEY>' => '<VALUE>'));
```

### イベント

イベントのパラメーターについては、Datadog の [API のページでイベントの項][6]を参照してください。

#### TCP と UDP によるイベント送信の違い

- **TCP** - 信頼性の高いイベント送信です。イベント送信のエラー時に、ログにエラーが記録されます。
- **UDP** - 「送りっ放し」式のイベント送信です。イベント送信のエラー時に、ログにエラーが**記録されません**。送信されたイベントに対する Datadog からの受信確認はありません。

`event` 関数は、TCP 転送と UDP 転送で同じ API を使用します。

#### ローカルの DogStatsD への UDP 送信

UDP 方式はローカルの DogStatsD インスタンスを使用するため、アプリケーション/API アクセスを追加でセットアップする必要はありません。

UDP の留意点

- デフォルトの方式
- 構成は不要
- TCP より高速
- TCP より信頼性が低い
- Datadog との通信エラーが記録されない

例:

```php
$statsd = new DogStatsd();
$statsd->event('<SUCCESS_EVENT_NAME>',
    array(
        'text'       => '<SUCCESS_EVENT_TEXT>',
        'alert_type' => 'success'
    )
);
```

#### Datadog API への TCP 送信

TCP でイベントを送信するには、最初に Datadog 資格情報を使用してライブラリを構成します。event 関数は、ローカルの DogStatsD インスタンスではなく、
Datadog に直接送信します。API キーとアプリケーションキーは、Datadog の [API タブ][7]にあります。

TCP の留意点

- UDP より低速
- UDP より信頼性が高い
- Datadog との通信エラーが記録される (API リクエストの cURL を使用)
- error_log によってログを記録し、try/catch ブロックによって API との通信の問題に関する警告/エラーを防止

TCP で `events` を送信する場合は、以下のオプションを使用できます。

| 値                  | 説明                                                           |
|------------------------|-----------------------------------------------------------------------|
| `api_key`              | TCP で `event` を送信するために必要です。                                    |
| `app_key`              | TCP で `event` を送信するために必要です。                                    |
| `curl_ssl_verify_host` | `CURLOPT_SSL_VERIFYHOST` のパススルーを設定します。デフォルトは `2` です。         |
| `curl_ssl_verify_peer` | `CURLOPT_SSL_VERIFYPEER` のパススルーを設定します。デフォルトは `1` です。         |
| `datadog_host`         | イベントの送信先。デフォルトは `https://app.datadoghq.com` です。 |

例:
```php
$statsd = new DogStatsd(
    array('api_key' => '<DD_API_KEY>',
          'app_key' => '<DD_APP_KEY>',
     )
  );

$statsd->event('<ERROR_EVENT_NAME>',
    array(
        'alert_type'      => 'error',
        'aggregation_key' => '<KEY>'
    )
);
$statsd->event('<SUCCESS_EVENT_NAME>',
    array(
        'alert_type'      => 'success',
        'aggregation_key' => '<KEY>'
    )
);
```

## 収集データ
### メトリクス

PHP インテグレーションには、デフォルトのメトリクスは含まれません。上の手順を使用して、カスタムメトリクスを送信します。

### イベント
PHP インテグレーションには、デフォルトのイベントは含まれません。上の手順を使用して、カスタムイベントを送信します。

### サービスのチェック
PHP インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/developers/metrics
[2]: https://github.com/DataDog/php-datadogstatsd
[3]: https://docs.datadoghq.com/ja/logs/log_collection/php/?tab=phpmonolog
[4]: https://docs.datadoghq.com/ja/logs/log_collection/php/?tab=phpsymfony
[5]: https://docs.datadoghq.com/ja/logs/log_collection/php/?tab=phpzendlog
[6]: https://docs.datadoghq.com/ja/api/#events
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}