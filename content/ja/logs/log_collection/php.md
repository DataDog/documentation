---
title: PHP ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/php
further_reading:
  - link: 'https://www.datadoghq.com/blog/php-logging-guide'
    tag: ブログ
    text: PHP ログの収集、カスタマイズ、分析方法
  - link: /logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
## 概要

PHP ログをファイルに書き込み、[Agent を使用して][1] PHP ログを Datadog に転送します。次のライブラリから選択できます。

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Composer を使用して Monolog を依存関係に追加します。

```
composer require "monolog/monolog"
```

または、手動でインストールします。

1. リポジトリから Monolog をダウンロードし、ライブラリに追加します。
2. アプリケーションのブートストラップでインスタンスを初期化します。

    ```php
    <?php

    require __DIR__ . '/vendor/autoload.php';

    // load Monolog library
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Monolog\Formatter\JsonFormatter;    
    ```

## セットアップ - Monolog を使用してファイルにログを記録

次の構成は JSON フォーマッタを有効にし、ログとイベントを `application-json.log` ファイルに書き込みます。Monolog インスタンスの初期化直後に新しいハンドラーを追加するように、コードを編集してください。

```php
 <?php

require __DIR__ . '/vendor/autoload.php';

// Monolog ライブラリをロードします
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;

// ログチャンネルを作成します
$log = new Logger('channel_name');

// Json フォーマッタを作成します
$formatter = new JsonFormatter();

// ハンドラーを作成します
$stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
$stream->setFormatter($formatter);

// バインドします
$log->pushHandler($stream);

// 例
$log->info('Adding a new user', array('username' => 'Seldaek'));
```

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `php.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

## ログセクション
logs:

    ## - type: file (必須) ログ入力ソースの種類 (tcp/udp/file)
    ##   port/path: (必須) type が tcp または udp の場合は、ポートを設定します。type が file の場合は、パスを設定します。
    ##   service: (必須) ログを所有しているサービスの名前
    ##   source: (必須) ログを送信しているインテグレーションを定義する属性
    ##   sourcecategory: (オプション) 複数値属性。ソース属性の絞り込みに使用できます。
    ##   tags: (オプション) 収集された各ログにタグを追加します。

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## メタフィールドとコンテキストの追加

コンテキストデータをログやイベントに追加しておくと役立ちます。
Monolog では、スレッドローカルなコンテキストデータを設定して、すべてのイベントと共に自動的に送信できるメソッドが提供されているため、これを簡単に行うことができます。いつでも、コンテキストデータ付きのイベントをログに記録できます。

```php
$logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog にはプリプロセッサー機能が付属しています。これは、イベントにメタデータ (セッション ID、リクエスト ID など) を設定して情報を補完できる簡単なコールバックです。

```php
 <?php 

$log->pushProcessor(function ($record) {

    // 現在のユーザーを記録します
    $user = Acme::getCurrentUser();
    $record['context']['user'] = array(
        'name' => $user->getName(),
        'username' => $user->getUsername(),
        'email' => $user->getEmail(),
    );

    // タグを追加します
    $record['ddtags'] = array('key' => 'value');

    // 一般的なコンテキストを追加します
    $record['extra']['key'] = 'value';

    return $record;
});
```

## フレームワークインテグレーション 

Monolog は次のフレームワークに含まれます。

* [Symfony2, Symfony3][1]
* [PPI][2]
* [Laravel 4 & 5][3]
* [Silex][4]
* [Lumen][5]
* [CakePHP][6]


Monolog をフレームワークに統合し、次にロガーを構成します。

```php
 <?php
// Monolog ライブラリが正常に読み込まれたかどうかをチェックします
//use Monolog\Logger;
//use Monolog\Handler\StreamHandler;
//use Monolog\Formatter\JsonFormatter;

// Monolog インスタンスを使用して
$monolog = ...

///// ログシッパー構成

$formatter = new JsonFormatter();
$stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$monolog->pushHandler($stream);
return $r;
```

### Symfony (v2+, v3+)

構成ディレクトリ `/path/to/config/directory/` にある `config_dev.yml` と `config_prod.yml` を編集して、それぞれ開発環境と生産環境のニーズに合わせてログ管理を構成します。

```yaml
# app/config/config.yml
monolog:

# プロセッサーを使用する場合は、以下のコメントを解除します 
#       Processor : 
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }


    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # ログシッパー構成
        to_json_files:
            # var/logs/(environment).log にログを記録します
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # すべてのチャンネル (doctrine、errors など) を追加します
            channels: ~
            # JSON フォーマッタを使用します
            formatter: monolog.json_formatter
            # すべてのイベント (debug から fatal まで) をログに記録します
            level: debug
```

### PPI

構成ディレクトリ `/path/to/config/directory/` にある `config_dev.yml` と `config_prod.yml` を編集して、それぞれ開発環境と生産環境のニーズに合わせてログ管理を構成します。

```yaml
monolog:
    handlers:

        # ログシッパー構成
        to_json_files:
            # var/logs/(environment).log にログを記録します
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # JSON フォーマッタを使用します
            formatter: monolog.json_formatter
            # すべてのイベント (debug から fatal まで) をログに記録します
            level: debug
```

### Laravel

```php
//ファイル: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);

  // 下でロガーを構成します
});

return $app;
```

### Silex

```php
// ファイル: bootstrap
$app->extend('monolog', function($monolog, $app) {
    $monolog->pushHandler(...);
    // 下でロガーを構成します
    return $monolog;
});
```

### Lumen

```php
//ファイル: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
    // 下でロガーを構成します
});

return $app;
```

### CakePHP

まず、この依存関係を `composer.json` ファイルに追加し、
`composer update` を実行します。

```json
{
    "require": {
        "cakephp/monolog": "*"
    }
}
```

次に、`app/Config/bootstrap.php` にインクルードするログ構成ファイル (例: `app/Config/log.php`) を作成します。

```php
include 'log.php';
```

基本的な構成 (Cake が行うことを Monolog で行う) は次のようになります。

```
CakePlugin::load('Monolog');
```

最後に、ファイルにログを記録します。

```
CakeLog::config('debug', array(
  'engine' => 'Monolog.Monolog',
  'channel' => 'app',
  'handlers' => array(
    'Stream' => array(
      LOGS . 'application-json.log',
      'formatters' => array(
        'Json' => array("")
      )
    )
  )
));
```

[1]: /ja/logs/log_collection/php/#symfony-v2-v3
[2]: /ja/logs/log_collection/php/#ppi
[3]: /ja/logs/log_collection/php/#laravel
[4]: /ja/logs/log_collection/php/#silex
[5]: /ja/logs/log_collection/php/#lumen
[6]: /ja/logs/log_collection/php/#cakephp
{{% /tab %}}
{{% tab "PHP Symfony" %}}

このセクションの内容

* Symfony 2 環境から Datadog にログを送信する
* JSON でログを送信するように Monolog を構成する
* セッションコンテキストデータでログイベントの情報を補完する

## セットアップ - Monolog を使用してファイルにログを記録

1. Monolog JSON フォーマッタをサービスとして宣言します。

    ```yaml
    services:
        monolog.json_formatter:
            class: Monolog\Formatter\JsonFormatter
    ```

2. Monolog 構成でフォーマッタを構成します。以下のフォーマッタフィールドを宣言します。

    ```yaml
     monolog:
        handlers:
            main:
                type:   stream
                path:   "%kernel.logs_dir%/%kernel.environment%.log"
                level:  debug
                formatter: monolog.json_formatter
    ```

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `php.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

## ログセクション
logs:

    ## - type: file (必須) ログ入力ソースの種類 (tcp/udp/file)
    ##   port / path: (必須) type が tcp または udp の場合は、ポートを設定します。type が file の場合は、パスを設定します。
    ##   service: (必須) ログを所有しているサービスの名前
    ##   source: (必須) ログを送信しているインテグレーションを定義する属性
    ##   sourcecategory: (オプション) 複数値属性。ソース属性の絞り込みに使用できます。
    ##   tags: (オプション) 収集された各ログにタグを追加します。

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## セッションプロセッサーを追加してさまざまなコンテキストをログに追加

1. セッションプロセッサーを実装します。
  以下は、プロセッサーの例です。プロセッサーは現在のセッションを認識し、ログレコードの内容を `requestId`、`sessionId` などの有益な情報で補完します。

    ```php
    <?php

    namespace Acme\Bundle\MonologBundle\Log;

    use Symfony\Component\HttpFoundation\Session\Session;

    class SessionRequestProcessor {
      private $session;
      private $sessionId;
      private $requestId;
      private $_server;
      private $_get;
      private $_post;

      public function __construct(Session $session) {
        $this->session = $session;
      }

      public function processRecord(array $record) {
        if (null === $this->requestId) {
          if ('cli' === php_sapi_name()) {
            $this->sessionId = getmypid();
          } else {
            try {
              $this->session->start();
              $this->sessionId = $this->session->getId();
            } catch (\RuntimeException $e) {
              $this->sessionId = '????????';
            }
          }
          $this->requestId = substr(uniqid(), -8);
          $this->_server = array(
            'http.url' => (@$_SERVER['HTTP_HOST']).'/'.(@$_SERVER['REQUEST_URI']),
            'http.method' => @$_SERVER['REQUEST_METHOD'],
            'http.useragent' => @$_SERVER['HTTP_USER_AGENT'],
            'http.referer' => @$_SERVER['HTTP_REFERER'],
            'http.x_forwarded_for' => @$_SERVER['HTTP_X_FORWARDED_FOR']
          );
          $this->_post = $this->clean($_POST);
          $this->_get = $this->clean($_GET);
        }
        $record['http.request_id'] = $this->requestId;
        $record['http.session_id'] = $this->sessionId;
        $record['http.url'] = $this->_server['http.url'];
        $record['http.method'] = $this->_server['http.method'];
        $record['http.useragent'] = $this->_server['http.useragent'];
        $record['http.referer'] = $this->_server['http.referer'];
        $record['http.x_forwarded_for'] = $this->_server['http.x_forwarded_for'];

        return $record;
      }

      protected function clean($array) {
        $toReturn = array();
        foreach(array_keys($array) as $key) {
          if (false !== strpos($key, 'password')) {
            // Do not add
          } else if (false !== strpos($key, 'csrf_token')) {
            // Do not add
          } else {
            $toReturn[$key] = $array[$key];
          }
        }

        return $toReturn;
      }
    }
    ```

2. プロセッサーを Symfony に接続します。
  ```yaml
   services:
      monolog.processor.session_request:
          class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
          arguments:  [ @session ]
          tags:
              - { name: monolog.processor, method: processRecord }
  ```

3. [生成された JSON ファイルを Datadog にストリーミングします][1]。


[1]: /ja/logs/log_collection
{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-log は Zend フレームワークに含まれます。[Composer][1] を使用して Zend-Log を追加します。

```
composer require "zendframework/zend-log"
```

または、手動でインストールします。

1. リポジトリからソースをダウンロードし、ライブラリに追加します。
2. アプリケーションのブートストラップでインスタンスを初期化します。

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Zend\Log\Logger;
use Zend\Log\Writer\Stream;
use Zend\Log\Formatter\JsonFormatter;
```

## セットアップ - Zend-log を使用してファイルにログを記録

次の構成は JSON フォーマッタを有効にし、ログとイベントを `application-json.log` ファイルに書き込みます。Zend-Log インスタンスの初期化直後に新しいハンドラーを追加するように、コードを編集してください。

```php
<?php

use Zend\Log\Logger;
use Zend\Log\Writer\Stream;
use Zend\Log\Formatter\JsonFormatter;


// ロガーを作成します
$logger = new Logger();

// ライターを作成します
$writer = new Stream('file://' . __DIR__ . '/application-json.log');

// Json フォーマッタを作成します
$formatter = new JsonFormatter();
$writer->setFormatter($formatter);

// バインドします
$logger->addWriter($writer);
Zend\Log\Logger::registerErrorHandler($logger);
```

次に、[ログファイルを Datadog にストリーミングします][2]。

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `php.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

## ログセクション
logs:

    ## - type: file (必須) ログ入力ソースの種類 (tcp/udp/file)
    ##   port/path: (必須) type が tcp または udp の場合は、ポートを設定します。type が file の場合は、パスを設定します。
    ##   service: (必須) ログを所有しているサービスの名前
    ##   source: (必須) ログを送信しているインテグレーションを定義する属性
    ##   sourcecategory: (オプション) 複数値属性。ソース属性の絞り込みに使用できます。
    ##   tags: (オプション) 収集された各ログにタグを追加します。

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## メタフィールドとコンテキストの追加

有益な情報の多くは、ログやイベントに追加されるコンテキストデータから得られます。Zend-Log では、スレッドローカルなコンテキストデータを設定して、すべてのイベントと共に自動的に送信できるメソッドが提供されているため、これをたいへん簡単に行うことができます。いつでも、コンテキストデータ付きのイベントをログに記録できます。

```php
$logger->info('Adding a new user', array('username' => 'Seldaek'));
```

ただし、このライブラリにはプロセッサー機能が付属しています。プロセッサーを使用すると、ログに自動的に追加情報を提供することができます。プロセッサーは、イベントがライターに渡される前にロガーから呼び出され、イベント配列を受け取り、完了時にイベント配列を返します。

次のような使用例があります。

* 例外バックトレース情報を提供する。
* メッセージに代替文字列を挿入する。
* リクエスト識別子を挿入する (後でログに特定の識別子がないかを調べるため)。

そのために、以下のようなコードを使用できます。

```php
$logger->addProcessor(new Zend\Log\Processor\Backtrace());
$logger->addProcessor(new Zend\Log\Processor\PsrPlaceholder());
$logger->addProcessor(new Zend\Log\Processor\ReferenceId());
$logger->addProcessor(new Zend\Log\Processor\RequestId());
```

独自のコードを開発する場合は、[Zend のドキュメントを参照してください][3]。


[1]: https://getcomposer.org
[2]: /ja/logs/log_collection
[3]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}




[1]: /ja/logs