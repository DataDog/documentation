---
aliases:
- /ja/logs/languages/php
further_reading:
- link: https://www.datadoghq.com/blog/php-logging-guide
  tag: ブログ
  text: PHP ログの収集、カスタマイズ、分析方法
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: Documentation
  text: ログ分析の実行
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: ドキュメント
  text: ログ収集のトラブルシューティングガイド
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: PHP ログ収集
---

## 概要

PHP ログを Datadog に送信する場合は、ファイルにログを記録し、Datadog Agent を使用してそのファイルを[テール][14]します。このページでは、[Monolog][8]、[Zend-Log][9] および [Symfony][10] ログライブラリをセットアップする例を詳しく説明します。

## セットアップ

### インストール

{{< tabs >}}
{{% tab "PHP Monolog" %}}

このコマンドを実行すると、[Composer][1] を使用して Monolog を依存関係として追加することができます。

```text
composer require "monolog/monolog"
```

または、以下の方法で Monolog を手動でインストールします。

1. リポジトリから Monolog をダウンロードし、ライブラリに追加します。
2. アプリケーションのブートストラップ内に以下を追加し、インスタンスを初期化します。

    ```php
    <?php
      require __DIR__ . '/vendor/autoload.php';

      // load Monolog library
      use Monolog\Logger;
      use Monolog\Handler\StreamHandler;
      use Monolog\Formatter\JsonFormatter;
    ```

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-Log は、Zend フレームワークの一部です。このコマンドを実行すると、[Composer][1] を使って Zend-Log を追加することができます。

```text
composer require "zendframework/zend-log"
```

または、以下の方法で Zend-Log を手動でインストールします。

1. リポジトリからソースをダウンロードし、ライブラリに追加します。
2. アプリケーションのブートストラップ内に以下を追加し、インスタンスを初期化します。

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

以下を追加して、Monolog JSON Formatter をサービスとして宣言します。

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### ロガーの構成

{{< tabs >}}
{{% tab "PHP Monolog" %}}

以下の構成では、JSON フォーマットを有効にし、ログとイベントを `application-json.log` ファイルに書き込んでいます。コードで、Monolog インスタンスの初期化後に新しいハンドラーを追加します。

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

以下の構成では、JSON フォーマットを有効にし、ログとイベントを `application-json.log` ファイルに書き込んでいます。コードで、Zend-Log インスタンスの初期化後に新しいハンドラーを追加します。

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

{{% /tab %}}
{{% tab "PHP Symfony" %}}

Monolog 構成でフォーマッタを構成するには、以下のフォーマッタフィールドを宣言します。

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

### Datadog Agent の構成

[ログ収集が有効][11]になったら、以下を行ってログファイルを追跡して新しいログを Datadog に送信する[カスタムログ収集][12]を設定します。

1. `php.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][13]に作成します。
2. `php.d/` に以下の内容で `conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

## Log セクション
logs:

  - type: file
    path: "<path_to_your_php_application_json>.log"
    service: "<service_name>"
    source: php
    sourcecategory: sourcecode
```

## ログとトレースにおけるサービスを接続

このアプリケーションで APM が有効になっている場合、[APM PHP ロギングの指示に従って][2]ログにトレース ID とスパン ID を自動的に追加することで、アプリケーションログとトレース間の相関関係を改善できます。

## ログにコンテキストを追加する

{{< tabs >}}
{{% tab "PHP Monolog" %}}

ログやイベントに追加のコンテキストを追加すると便利なことがあります。Monolog は、スレッドローカルコンテキストを設定するメソッドを提供し、すべてのイベントと共に自動的に送信されます。例えば、コンテキストデータを含むイベントをログに記録するには

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog のプリプロセッサーには、単純なコールバックで、設定できるメタデータ (例えば、セッション ID やリクエスト ID など) でイベントをリッチ化する機能があります。

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

ログやイベントに追加のコンテキストを追加すると便利なことがあります。Zend-Log は、スレッドローカルコンテキストを設定するメソッドを提供し、すべてのイベントと共に自動的に送信されます。例えば、コンテキストデータを含むイベントをログに記録するには

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

ログに追加情報を与える方法については、 [Zend のプロセッサーのドキュメント][1]を参照してください。

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

セッションプロセッサーを使用してログに変数コンテキストを追加するには、以下の手順に従います。

1. セッションプロセッサーを実装します。
  次の例では、プロセッサーは現在のセッションを知っており、`requestId`、`sessionId` などの情報でログレコードの内容をリッチ化しています。

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

2. 以下を追加して、プロセッサーを Symfony とインテグレーションします。

    ```yaml
      services:
          monolog.processor.session_request:
              class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
              arguments:  [ @session ]
              tags:
                  - { name: monolog.processor, method: processRecord }
    ``` 

3. 生成された JSON ファイルを Datadog に[ストリーミング](#configure-the-datadog-agent)します。

{{% /tab %}}
{{< /tabs >}}

## Monolog フレームワークのインテグレーション

Monolog は、以下のフレームワークで使用することができます。

* [Symfony v2+/v3+][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]

Monolog をフレームワークとインテグレーションするために、以下を追加します。

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

次に、Monolog 用のロガーを構成します。

{{< tabs >}}
{{% tab "Symfony v2+/v3+" %}}

構成ディレクトリ `/path/to/config/directory/` にある `config_dev.yml` と `config_prod.yml` に以下を追加してください。開発環境と本番環境に合わせた構成になるように、サンプルを修正します。

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
            # ログレベルを設定します (例: debug、error、alert)
            level: debug
```

{{% /tab %}}
{{% tab "PPI" %}}

構成ディレクトリ `/path/to/config/directory/` にある `config_dev.yml` と `config_prod.yml` に以下を追加してください。開発環境と本番環境に合わせた構成になるように、サンプルを修正します。

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
            # ログレベルを設定します (例: debug、error、alert)
            level: debug
```

{{% /tab %}}
{{% tab "Laravel" %}}

<div class="alert alert-warning">
関数 <code>\DDTrace\current_context()</code> は、バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> で導入されています。
</div>

以下を追加します。

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
            $context = \DDTrace\current_context();
            if ($useJson === true) {
                $record['extra']['dd'] = [
                    'trace_id' => $context['trace_id'],
                    'span_id'  => $context['span_id'],
                ];
            } else {
                $record['message'] .= sprintf(
                    ' [dd.trace_id=%d dd.span_id=%d]',
                    $context['trace_id'],
                    $context['span_id']
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

{{% /tab %}}
{{% tab "Silex" %}}

以下を追加します。

```php
<?php
  // file: bootstrap
  $app->extend('monolog', function($monolog, $app) {
      $monolog->pushHandler(...);
      // 下記にロガーを構成
      return $monolog;
  });
```

{{% /tab %}}
{{% tab "Lumen" %}}

以下を追加します。

```php
<?php
  //file: bootstrap/app.php
  $app->configureMonologUsing(function($monolog) {
      $monolog->pushHandler(...);
      // 下記にロガーを構成
  });

  return $app;
```

{{< /tabs >}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/php/
[3]: https://symfony.com/doc/current/logging.html#monolog
[4]: https://github.com/ppi/ppi-monolog-module
[5]: https://laravel.com/docs/9.x/logging#introduction
[6]: https://github.com/silexphp/Silex
[7]: https://lumen.laravel.com/docs/9.x
[8]: https://seldaek.github.io/monolog/
[9]: https://framework.zend.com/
[10]: https://symfony.com/
[11]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[12]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[13]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[14]: /ja/glossary/#tail