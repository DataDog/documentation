---
aliases:
- /ja/tracing/compatibility_requirements/php
- /ja/tracing/setup_overview/compatibility_requirements/php
code_lang: php
code_lang_weight: 50
description: PHP トレーサーの互換性要件です
further_reading:
- link: tracing/trace_collection/dd_libraries/php
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
title: PHP 互換性要件
type: multi-code-lang
---
<div class="alert alert-info">This documentation is for the PHP tracer v1.x. If you are looking for the PHP tracer v0.x documentation, see the legacy <a href="/tracing/trace_collection/compatibility/php_v0/">PHP Compatibility Requirements
</a> documentation.</div>

## PHP APM のランタイムサポートポリシー

PHP Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

Datadog APM for PHP は、ホスト OS や PHP ランタイム、特定の PHP ライブラリ、 Datadog Agent や API の特定のバージョンで定義される依存関係に基づいて構築されています。
これらのバージョンがメンテナによってサポートされなくなった場合、 Datadog APM for PHP はこれらのサポートにも制限をかけます。

#### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なご要望はカスタマーサポートチームにお問い合わせください][2]。                                                             |
| <span id="support-beta">ベータ版</span>                    |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                    |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                                              |
| <span id="support-legacy">レガシー</span>                |  レガシーな実装。機能は限定されますが、メンテナンスは提供されません。[特別なご要望がある場合は、サポートチームにお問い合わせください。 |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートなし。このバージョンはまだ使用可能ですが、バグ修正は提供されません。                                                                                                  |


PHP APM supports the following PHP versions (both ZTS and NTS):

<div class="alert alert-info">
<strong>Note:</strong>
PHP 5.x is not supported starting version 1.0.0. If you are using PHP 5, you can still use the PHP tracer up to version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0">0.99</a>.
<br>
If you are using PHP 5.x version in your application and have a feature request which is critical for your business needs, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a>.
<br>
It's recommended to use <a href="https://www.php.net/supported-versions">officially supported versions</a> of PHP, especially 8.0+.
</div>

| PHP バージョン    | サポートレベル        | パッケージバージョン |
|:---------------|:---------------------|:----------------|
| 8.3.x          | 一般提供 | > `0.93.0+`     |
| 8.2.x          | 一般提供 | > `0.82.0+`     |
| 8.1.x          | 一般提供 | > `0.66.0+`     |
| 8.0.x          | 一般提供 | > `0.52.0+`     |
| 7.4.x          | 一般提供 | All             |
| 7.3.x          | 一般提供 | All             |
| 7.2.x          | 一般提供 | All             |
| 7.1.x          | 一般提供 | All             |
| 7.0.x          | 一般提供 | All             |
| 5.6.x          | EOL                  | < `1.0.0`      |
| 5.5.x          | EOL                  | < `1.0.0`      |
| 5.4.x          | EOL                  | < `1.0.0`      |

PHP APM は以下の SAPI に対応しています。

| SAPI           | サポートの種類               |
|:---------------|:---------------------------|
| apache2handler | サポートされているすべての PHP バージョン |
| cli            | サポートされているすべての PHP バージョン |
| fpm-fcgi       | サポートされているすべての PHP バージョン |
| cgi-fcgi       | サポートされているすべての PHP バージョン |
| FrankenPHP     | サポートされているすべての PHP バージョン |


## 対応プロセッサアーキテクチャー

PHP APM は以下のアーキテクチャに対応しています。

| プロセッサアーキテクチャー                 | サポートレベル     | パッケージバージョン | サポートの種類               |
|-----------------------------------------|-------------------|---------------|----------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)    | [GA](#support-ga) | All           | サポートされているすべての PHP バージョン |
| Linux MUSL amd64 (`x86-64-linux-musl`)  | [GA](#support-ga) | All           | サポートされているすべての PHP バージョン |
| Linux GNU arm64 (`aarch64-linux-gnu`)   | [GA](#support-ga) | > `0.78.0`    | サポートされているすべての PHP バージョン |
| Linux MUSL arm64 (`aarch64-linux-musl`) | [GA](#support-ga) | > `0.78.0`    | サポートされているすべての PHP バージョン |
| Windows amd64 (`x86_64-windows`)        | [GA](#support-ga) | > `0.98.0`    | PHP 7.2+                   |

### インテグレーション

#### Web フレームワークの互換性

Datadog はデフォルトで、**すべての PHP Web フレームワークをサポート**し、フレームワークレベルのインスツルメンテーション、または一般的な Web トレースを行うことができます。

フレームワークレベルのインスツルメンテーションには、内部メソッドのトレースとフレームワーク固有のタグ付けが含まれます。

一般的な Web トレースには、データベースや HTTP クライアントなどのサポートされたライブラリのスパンに加えて、コールから発生したレイテンシーやエラーを追跡するための `web.request` スパンが含まれています。

次の表は、Datadog が正常にトレースするフレームワークとバージョンの一部を示しています。

**ウェブフレームワーク**:

| モジュール         | バージョン                                | サポートの種類                | インスツルメンテーションレベル           |
|:---------------|:----------------------------------------|:----------------------------|:--------------------------------|
| CakePHP        | 2.x                                     | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| CodeIgniter    | 2.x                                     | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| CodeIgniter    | 3.x                                     | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |
| Drupal         |                                         | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| FuelPHP        | 1.1                                     | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |
| Laminas        |                                         | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Laravel        | 4.2、5.x、6.x                           | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Laravel 8+     | 8.x, 9.x, 10.x, 11.x (tracer `0.52.0+`) | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Lumen          | 5.2+                                    | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Magento        | 1                                       | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |
| Magento        | 2                                       | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Neos Flow      | 1.1                                     | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |
| Phalcon        | 1.3、3.4                                | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |
| RoadRunner     | 2.x                                     | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Slim           | 2.x、3.x、4.x                           | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Symfony        | 2.x, 3.3, 3.4, 4.x, 5.x, 6.x, 7.x       | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| WordPress      | 4.x、5.x、6.x                           | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Yii            | 1.1、2.0                                | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Zend Framework | 1.12, 1.21                              | サポートされているすべての PHP バージョン  | フレームワークレベルのインスツルメンテーション |
| Zend Framework | 2.x                                     | サポートされているすべての PHP バージョン  | 一般的な Web トレース             |

このリストにウェブフレームワークがない場合でも、トレーサーの最新リリースではそのまま使用できます。

Datadog is continuously adding more support for in-depth tracing for PHP web-frameworks. To request support for additional span metadata and framework internals, contact our awesome [support team][3].

#### CLI ライブラリの互換性

デフォルトで、CLI SAPI からのトレースは無効になっています。PHP CLI スクリプトのトレースを有効にするには、`DD_TRACE_CLI_ENABLED=true` とします。

| モジュール          | バージョン            | サポートの種類               |
|:----------------|:--------------------|:---------------------------|
| CakePHP Console | 2.x                 | サポートされているすべての PHP バージョン |
| Laravel Artisan | 5.x、8.x、9.x、10.x | サポートされているすべての PHP バージョン |
| Symfony CLI     | 4.x、5.x、6.x       | サポートされているすべての PHP バージョン |

追加 CLI ライブラリに関するサポートをご希望の場合は、[サポートチーム][3]までお気軽にお問い合わせください。

#### データストアの互換性

| モジュール                                                                  | バージョン                   | サポートの種類               |
|-------------------------------------------------------------------------|----------------------------|----------------------------|
| Amazon RDS (PDO または MySQLi 使用)                                        | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| Elasticsearch                                                           | 1+                         | サポートされているすべての PHP バージョン |
| Eloquent                                                                | Laravel 対応バージョン | サポートされているすべての PHP バージョン |
| Laravel Queues                                                          | Laravel 対応バージョン | サポートされているすべての PHP バージョン |
| Memcache                                                                | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| Memcached                                                               | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| MongoDB - [mongo][4] 拡張機能を使用                                      | 1.4.x                      | サポートされているすべての PHP バージョン |
| MySQLi                                                                  | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| PDO                                                                     | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| PhpRedis                                                                | 3、4、5                    | サポートされているすべての PHP バージョン |
| Predis                                                                  | 1.1                        | サポートされているすべての PHP バージョン |
| SQLSRV                                                                  | *(対応する PHP)*      | サポートされているすべての PHP バージョン |

追加データストアに関するサポートをご希望の場合は、[サポートチーム][3]までお気軽にお問い合わせください。

#### ライブラリの互換性

| モジュール            | バージョン                   | サポートの種類               |
|:------------------|:---------------------------|:---------------------------|
| [php-amqplib][10] | 2.x、3.x                   | PHP 7.1+                   |
| Curl              | *(対応する PHP)*      | サポートされているすべての PHP バージョン |
| Guzzle            | 5.x, 6.x, 7.x              | サポートされているすべての PHP バージョン |
| Laravel Queue     | Laravel 対応バージョン | サポートされているすべての PHP バージョン |
| [OpenAI][11]      | OpenAI supported versions  | サポートされているすべての PHP バージョン |


ライブラリに関するサポートをご希望の場合は、[サポートチーム][3]までお気軽にお問い合わせください。

#### PHP 5 の深いコールスタック

コールスタックは PHP 5 のみに限定されます。詳細は[深いコールスタックのトラブルシューティングページ][5]を参照してください。 

### ジェネレータ

[ジェネレータ][6]のインスツルメントは、PHP 5 および PHP 7 ではサポートされていません。

### PCNTL

Datadog supports tracing forked processes using [pcntl][7]. When a call to `pcntl_fork` is detected, a dedicated span is created, and the forked process is instrumented. This can be disabled with `DD_TRACE_FORKED_PROCESS`. Refer to the [library configuration page][9] for more details.

アプリケーションが `pcntl_unshare(CLONE_NEWUSER);` を実行し、トレーサーがインストールされている場合、アプリケーションは致命的にクラッシュします。これは、`CLONE_NEWUSER` を持つ `unshare` がプロセスを[スレッド化しない][8]ことを要求し、PHP トレーサーが別スレッドを使用してメインプロセスをブロックせずに Datadog Agent にトレースを送信するために起こります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: https://www.datadoghq.com/support/
[3]: /ja/help
[4]: https://pecl.php.net/package/mongo
[5]: /ja/tracing/troubleshooting/php_5_deep_call_stacks
[6]: https://www.php.net/manual/en/language.generators.overview.php
[7]: https://www.php.net/manual/en/book.pcntl.php
[8]: https://man7.org/linux/man-pages/man2/unshare.2.html
[9]: /ja/tracing/trace_collection/library_config/php/#environment-variable-configuration
[10]: https://github.com/php-amqplib/php-amqplib
[11]: https://github.com/openai-php/client