---
title: PHP ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/php
further_reading:
  - link: 'https://www.datadoghq.com/blog/php-logging-guide'
    tag: ブログ
    text: PHP ログの収集、カスタマイズ、分析方法
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
## 概要

Monolog、Zend-Log、Symfony の各ロギングライブラリから選択して PHP ログをファイルに書き込み、[Agent を使用して][1] Datadog に転送します。

## セットアップ

### インストール

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Composer を使用して Monolog を依存関係として追加します。

```text
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

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-log は Zend フレームワークに含まれます。[Composer][1] を使用して Zend-Log を追加します。

```text
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

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Monolog JSON フォーマッタをサービスとして宣言します。

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### ロガーコンフィギュレーション

{{< tabs >}}
{{% tab "PHP Monolog" %}}

次の構成は JSON フォーマッタを有効にし、ログとイベントを `application-json.log` ファイルに書き込みます。Monolog インスタンスの初期化直後に新しいハンドラーを追加するように、コードを編集してください。

```php
 <?php
  require __DIR__ . '/vendor/autoload.php';

  // Monolog ライブラリをロード
  use Monolog\Logger;
  use Monolog\Handler\StreamHandler;
  use Monolog\Formatter\JsonFormatter;

  // ログチャネルを作成
  $log = new Logger('channel_name');

  // Json フォーマッタを作成
  $formatter = new JsonFormatter();

  // ハンドラーを作成
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  // バインド
  $log->pushHandler($stream);

  // 例
  $log->info('Adding a new user', array('username' => 'Seldaek'));```
 
 

 

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

次の構成は JSON フォーマッタを有効にし、ログとイベントを `application-json.log` ファイルに書き込みます。Zend-Log インスタンスの初期化直後に新しいハンドラーを追加するように、コードを編集してください。

```php
<?php
  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;

  // ロガーを作成
  $logger = new Logger();

  // ライターを作成
  $writer = new Stream('file://' . __DIR__ . '/application-json.log');

  // Json フォーマッタを作成
  $formatter = new JsonFormatter();
  $writer->setFormatter($formatter);

  // バインド
  $logger->addWriter($writer); Zend\Log\Logger::registerErrorHandler($logger);```

次に、[ログファイルを Datadog にストリーミングします][1]。

[1]: /ja/logs/log_collection/
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Monolog 構成でフォーマッタを構成します。以下のフォーマッタフィールドを宣言します。

```yaml
 monolog:
    handlers:
        main:
            type:   stream
            path:   "%kernel.logs_dir%/%kernel.environment%.log"
            level:  debug
            formatter: monolog.json_formatter
```

{{% /tab %}}
{{< /tabs >}}

**ログとトレースの接続**

このアプリケーションで APM が有効になっている場合、[APM PHP ロギングの指示に従って][2]ログにトレース ID とスパン ID を自動的に追加することで、アプリケーションログとトレース間の相関関係を改善できます。

### Agent 構成

`conf.d/` フォルダーに次の内容の `php.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

## Log セクション
logs:

  - type: file
    path: "/path/to/your/php/application-json.log"
    service: php
    source: php
    sourcecategory: sourcecode
```

## コンテキストをさらに追加する

{{< tabs >}}
{{% tab "PHP Monolog" %}}

コンテキストデータをログやイベントに追加すると便利です。Monolog では、これを簡単に行えるよう、スレッドローカルなコンテキストデータを設定すると、すべてのイベントと一緒に自動的に送信されるメソッドが提供されています。いつでもコンテキストデータを含むイベントを記録できます。

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog にはプリプロセッサー機能が付属しています。これは、イベントにメタデータ (セッション ID、リクエスト ID など) を設定して情報を補完できる簡単なコールバックです。

```php
 <?php
  $log->pushProcessor(function ($record) {

      // 現在のユーザーを記録
      $user = Acme::getCurrentUser();
      $record['context']['user'] = array(
          'name' => $user->getName(),
          'username' => $user->getUsername(),
          'email' => $user->getEmail(),
      );

      // さまざまなタグを追加
      $record['ddtags'] = array('key' => 'value');

      // さまざまな汎用コンテキストを追加
      $record['extra']['key'] = 'value';

      return $record; });```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

有益な情報の多くは、ログやイベントに追加できるコンテキストデータから得られます。Zend-Log では、これを簡単に行えるよう、スレッドローカルなコンテキストデータを設定すると、すべてのイベントと一緒に自動的に送信されるメソッドが提供されています。コンテキストデータを含むイベントをいつでも記録できます。

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

ただし、このライブラリにはプロセッサー機能が付属しています。プロセッサーを使用すると、ログに自動的に追加情報を提供することができます。プロセッサーは、イベントがライターに渡される前にロガーから呼び出され、イベント配列を受け取り、完了時にイベント配列を返します。

次のような使用例があります。

* 例外バックトレース情報を提供する。
* メッセージに代替文字列を挿入する。
* リクエスト識別子を挿入する (後でログに特定の識別子がないかを調べるため)。

そのために、以下のようなコードを使用できます。

```php
<?php
  $logger->addProcessor(new Zend\Log\Processor\Backtrace());
  $logger->addProcessor(new Zend\Log\Processor\PsrPlaceholder());
  $logger->addProcessor(new Zend\Log\Processor\ReferenceId());
  $logger->addProcessor(new Zend\Log\Processor\RequestId());
```

独自にコードを開発される場合は、[Zend ドキュメントをご参照ください][1]。

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

セッションプロセッサーを追加してさまざまなコンテキストをログに追加します。

1. セッションプロセッサーを実装します。
  下記にプロセッサーの例を示しました。プロセッサーは現在のセッションを認識し、ログレコードの内容を `requestId` や `sessionId` などの有益な情報で補完します。

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

[1]: /ja/logs/log_collection/
{{% /tab %}}
{{< /tabs >}}

## Monolog とフレームワークのインテグレーション

Monolog は次のフレームワークに含まれます。

* [Symfony2、Symfony3][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]
* [CakePHP][8]

Monolog をフレームワークに統合し、次にロガーを構成します。

```php
 <?php
  // Monolog ライブラリのロードが正常か確認
  //use Monolog\Logger;
  //use Monolog\Handler\StreamHandler;
  //use Monolog\Formatter\JsonFormatter;

  // monolog インスタンスを含む
  $monolog = ...

  ///// Log shipper configuration

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

# プロセッサーを使用する場合はこのセクションのコメントを解除
#       Processor :
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }

    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # ログシッパーのコンフィギュレーション
        to_json_files:
            # lvar/logs/(environment).log に記録
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # 全チャネル (ドクトリン、エラーなど) を含む
            channels: ~
            # json フォーマッタを使用
            formatter: monolog.json_formatter
            # 全イベント (致命的なエラーをデバッグ) を記録
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

<div class="alert alert-warning">
注: 関数 <code>\DDTrace\trace_id()</code> は、バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.53.0">0.53.0</a> で導入されています。
</div>

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Monolog インスタンスを取得
        $monolog = logger()->getLogger();
        if (!$monolog instanceof \Monolog\Logger) {
            return;
        }

        // オプション: JSON 形式を使用
        $useJson = false;
        foreach ($monolog->getHandlers() as $handler) {
            if (method_exists($handler, 'setFormatter')) {
                $handler->setFormatter(new \Monolog\Formatter\JsonFormatter());
                $useJson = true;
            }
        }

        // トレースおよびスパン ID を挿入してログエントリを APM トレースと接続
        $monolog->pushProcessor(function ($record) use ($useJson) {
            if ($useJson === true) {
                $record['dd'] = [
                    'trace_id' => \DDTrace\trace_id(),
                    'span_id'  => \dd_trace_peek_span_id(),
                ];
            } else {
                $record['message'] .= sprintf(
                    ' [dd.trace_id=%d dd.span_id=%d]',
                    \DDTrace\trace_id(),
                    \dd_trace_peek_span_id()
                );
            }
            return $record;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```

### Silex

```php
<?php
  // file: bootstrap
  $app->extend('monolog', function($monolog, $app) {
      $monolog->pushHandler(...);
      // 下記にロガーを構成
      return $monolog;
  });
```

### Lumen

```php
<?php
  //file: bootstrap/app.php
  $app->configureMonologUsing(function($monolog) {
      $monolog->pushHandler(...);
      // 下記にロガーを構成
  });

  return $app;
```

### CakePHP

まず、この依存関係を `composer.json` ファイルに追加し、
`composer update` を実行します。

```json
{"require": {"cakephp/monolog": "*"}}
```

次に、`app/Config/bootstrap.php` にインクルードするログ構成ファイル (例: `app/Config/log.php`) を作成します。

```php
<?php
  include 'log.php';
```

基本的な構成 (Cake が行うことを Monolog で行う) は次のようになります。

```text
CakePlugin::load('Monolog');
```

最後に、ファイルにログを記録します。

```text
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/
[2]: /ja/tracing/connect_logs_and_traces/php/
[3]: /ja/logs/log_collection/php/#symfony-v2-v3
[4]: /ja/logs/log_collection/php/#ppi
[5]: /ja/logs/log_collection/php/#laravel
[6]: /ja/logs/log_collection/php/#silex
[7]: /ja/logs/log_collection/php/#lumen
[8]: /ja/logs/log_collection/php/#cakephp