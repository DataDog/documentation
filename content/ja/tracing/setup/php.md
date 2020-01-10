---
title: PHP アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/languages/php
  - /ja/agent/apm/php/
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-php-performance/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した PHP の監視
  - link: 'https://github.com/DataDog/dd-trace-php'
    tag: GitHub
    text: ソースコード
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: Documentation
    text: 高度な使用方法
---
## インストールと利用開始

<div class="alert alert-info">Datadog アカウントをお持ちの場合、アプリ内ガイドで<a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=php" target=_blank>ホストベース</a>の設定や<a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=php" target=_blank>コンテナベース</a>の設定に関する詳細な手順をご確認いただけます。</div>

APM で使用される用語の説明は、[公式ドキュメント][1]を参照してください。

PHP トレーサーのオープンソースに対する貢献に関しては、[コントリビューションガイド][2]を参照してください。

### Datadog Agent の設定

PHP APM トレーサーは、Datadog Agent を使用してトレースデータを送信します。

[Datadog Agent のインストールと構成][3]。詳細については、[Docker アプリケーションのトレース][4] または [Kubernetes アプリケーション][5]を参照してください。

Agent の **[APMが有効である][3]**ことを確認します。

### 拡張機能をインストール

[対応するディストリビューション用にプリコンパイルされたパッケージ][6]の 1 つを使用して PHP 拡張機能をインストールします。

ダウンロードしたら、次のコマンドを使いパッケージをインストールします。

```bash
# RPM パッケージを使用 (RHEL/Centos 6+、Fedora 20+)
$ rpm -ivh datadog-php-tracer.rpm

# DEB パッケージを使用 (Debian Jessie+、対応するバージョンの PHP がインストールされた Ubuntu 14.04+ )
$ dpkg -i datadog-php-tracer.deb

# APK パッケージを使用 (Alpine)
$ apk add datadog-php-tracer.apk --allow-untrusted
```

PHP (PHP-FPM または Apache SAPI) を再起動し、アプリケーションのトレース可能なエンドポイントにアクセスします。[APM UI][7]でトレースを確認できます。

**注**: UI にトレースが表示されるまでに時間がかかる場合があります。数分経ってもトレースが表示されない場合は、ホストマシンで[dd-doctor.php 診断スクリプトを実行][8]し問題を見つけます。

ディストリビューションが見つからない場合は、PHP 拡張機能を[手動でインストール][9]します。

## 自動でデータと収集

トレースは自動的にインスツルメントされます。拡張機能がインストールされると、**ddtrace**はアプリケーションをトレースし、Agent へトレースを送ります。

Datadog が公式にはサポートしていない Web フレームワークでも、手動でインスツルメントしなくていい場合もあります。Datadog は一般的な Web リクエストを記録し、その一般的なトレースを作成します。ただし、サポートされるフレームワークの場合、Datadog はより適切なメタデータを設定できるため、サービスを円滑に進めることができます。

自動インスツルメンテーションは、特定の関数やメソッドをトレースするためにラップするよう PHP のランタイムを変更しことで実行されます。PHP トレーサーは、[複数のライブラリ](#ライブラリの互換性)の自動インスツルメンテーションをサポートします。

自動インスツルメンテーションは以下を取得します。

* メソッド実行時間
* Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
* 未処理の例外（該当する場合スタックトレースを含む）
* Web リクエストなど、システムを通過するトレースの合計数

**注**: アプリケーションが Composer や `spl_autoload_register()` で登録されたオートローダーを使用しない場合、環境変数を `DD_TRACE_NO_AUTOLOADER=true` と設定し、自動インスツルメンテーションを有効にします。

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを設定し、以下のカスタム Agent ホスト名にトレースを送信します。

PHP トレーサーが自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

変数の設定方法については、[トレーサーコンフィギュレーション][10]を参照してください。

## 互換性

PHP APM は以下のバージョンの PHP に対応しています。

| バージョン | サポートの種類    |
|:--------|:----------------|
| 7.3.x   | 完全対応 |
| 7.2.x   | 完全対応 |
| 7.1.x   | 完全対応 |
| 7.0.x   | 完全対応 |
| 5.6.x   | 完全対応 |
| 5.4.x   | 完全対応 |

PHP APM は以下の SAPI に対応しています。

| SAPI           | サポートの種類    |
|:---------------|:----------------|
| apache2handler | 完全対応 |
| cli            | 完全対応 |
| fpm            | 完全対応 |

### インテグレーション

#### Web フレームワークの互換性

以下のリストにない Web フレームワークでも、UI で Web リクエストのトレースを確認できます。ただし、特定の Web フレームワークに固有のメタデータやスパンが表示されない場合もあります。

| モジュール         | バージョン      | サポートの種類    |
|:---------------|:--------------|:----------------|
| CakePHP        | 2.x           | 完全対応 |
| CodeIgniter    | 2.x           | PHP 7           |
| Laravel        | 4.2, 5.x      | 完全対応 |
| Lumen          | 5.2+          | 完全対応 |
| Slim           | 3.x           | 完全対応 |
| Symfony        | 3.3, 3.4, 4.x | 完全対応 |
| WordPress      | 4.x           | PHP 7           |
| Zend Framework | 1.12          | 完全対応 |
| Yii            | 2.0           | 完全対応 |
| CodeIgniter    | 3.x           | _近日公開予定_   |
| Drupal         |               | _近日公開予定_   |
| Magento        | 2             | _近日公開予定_   |
| Phalcon        | 1.3、3.4      | _近日公開予定_   |
| Slim           | 2.x           | _近日公開予定_   |
| Yii            | 1.1           | _近日公開予定_   |

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。[Datadog チーム][11]までお気軽にお問い合わせください。

#### CLI ライブラリの互換性

デフォルトで、CLI SAPI からのトレースは無効になっています。PHP CLI スクリプトのトレースを有効にするには、`DD_TRACE_CLI_ENABLED=true` とします。

| モジュール          | バージョン | サポートの種類    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | 完全対応 |
| Laravel Artisan | 5.x      | 完全対応 |
| Symfony Console |          | _近日公開予定_   |

希望する CLI ライブラリが見つかりませんか？Datadog では継続的にサポートを追加しています。[Datadog チーム][11]までお気軽にお問い合わせください。

#### データストアの互換性

| モジュール                           | バージョン                   | サポートの種類    |
|:---------------------------------|:---------------------------|:----------------|
| Amazon RDS (PDO または MySQLi 使用) | *(対応する PHP)*      | 完全対応 |
| Elasticsearch                    | 1.x                        | 完全対応 |
| Eloquent                         | Laravel 対応バージョン | 完全対応 |
| Memcached                        | *(対応する PHP)*      | 完全対応 |
| MongoDB                          | 1.4.x                      | 完全対応 |
| MySQLi                           | *(対応する PHP)*      | 完全対応 |
| PDO (MySQL、PostgreSQL、MariaDB) | *(対応する PHP)*      | 完全対応 |
| Predis                           | 1.1                        | 完全対応 |
| AWS Couchbase                    | AWS PHP SDK 3              | _近日公開予定_   |
| AWS DynamoDB                     | AWS PHP SDK 3              | _近日公開予定_   |
| AWS ElastiCache                  | AWS PHP SDK 3              | _近日公開予定_   |
| Doctrine ORM                     | 2                          | _近日公開予定_   |
| ODBC                             | *(対応する PHP)*      | _近日公開予定_   |
| PHPredis                         | 4                          | _近日公開予定_   |
| Solarium                         | 4.2                        | _近日公開予定_   |

希望するデータストアが見つかりませんか？Datadog では継続的にサポートを追加しています。[Datadog チーム][11]までお気軽にお問い合わせください。

#### ライブラリの互換性

| モジュール     | バージョン              | サポートの種類    |
|:-----------|:----------------------|:----------------|
| Curl       | *(対応する PHP)* | 完全対応 |
| Guzzle     | 5.x                   | 完全対応 |
| Guzzle     | 6.x                   | 完全対応 |
| Beanstalkd |                       | _近日公開予定_   |
| ReactPHP   |                       | _近日公開予定_   |

希望するライブラリが見つかりませんか？Datadog では継続的にサポートを追加しています。[Datadog チーム][11]までお気軽にお問い合わせください。

## コンフィグレーション

PHP トレーサーは環境変数で設定できます。

**注**: コードの自動インスツルメンテーションを使用する場合（推奨されるアプローチ）、インスツルメンテーションコードはどのユーザーコードよりも先に実行されることに注意してください。そのため、以下の環境変数はサーバーレベルで設定し、ユーザーコードが実行される前に PHP ランタイムで使用できるようにします。たとえば、`putenv()` や `.env` ファイルは機能しません。

### Apache

サーバー設定、バーチャルホスト、ディレクトリ、**.htaccess** ファイルから [`SetEnv`][12] を使用して設定。

```
SetEnv DD_TRACE_DEBUG true
```

### NGINX

`http`、`server`、`location` コンテキストから[`fastcgi_param`][13] を使用して設定します。

```
fastcgi_param DD_TRACE_DEBUG true;
```

### PHP CLI サーバー

コマンドラインで設定しサーバーを起動します。

```
DD_TRACE_DEBUG=true php -S localhost:8888
```

### 環境変数コンフィギュレーション

| 環境変数                              | デフォルト     | 注                                                                                                              |
|-------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | Agent のホスト名                                                                                               |
| `DD_AUTOFINISH_SPANS`                     | `false`     | トレーサーがフラッシュされた時点でスパンを自動終了させるかどうか                                               |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | 分散型トレーシングの有効にするかどうか                                                                             |
| `DD_INTEGRATIONS_DISABLED`                | `null`      | 無効な拡張機能一覧（CSV 形式）。例、`curl,mysqli`                                                              |
| `DD_PRIORITY_SAMPLING`                    | `true`      | 優先度付きサンプリングを有効にするかどうか                                                                               |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | トレースのサンプリングレート。`0.0`〜`1.0` (デフォルト)。 v0.36.0 以前では `DD_SAMPLING_RATE`。     |
| `DD_SERVICE_NAME`                         | ``          | デフォルトのアプリ名                                                                                              |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | IPC ベースの構成可能なサーキットブレーカーの再試行時間（ミリ秒）                                               |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Agent の接続設定に使える最大時間（ミリ秒）                                             |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Agent の接続タイムアウト（ミリ秒）                                                                    |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | IPC ベースの構成可能なサーキットブレーカーの連続エラー最大数                                                   |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | Agent ポート番号                                                                                             |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | Agent リクエストの転送タイムアウト（ミリ秒）                                                              |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Web インテグレーションで関連するスパンに対するApp Analytics を有効にするためのフラグ                                               |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | CLI から PHP スクリプトのトレースを有効にする                                                                        |
| `DD_TRACE_DEBUG`                          | `false`     | トレーサーの[デバッグモード](#カスタム URL からリソースへのマッピング)を有効にする                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | トレーサーをグローバルに有効にする                                                                                        |
| `DD_TRACE_GLOBAL_TAGS`                    | ``          | すべてのスパンに設定されるタグ。例、`key1:value1,key2:value2`                                                      |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | オートローダーを使用しないアプリケーションには、`true` に設定して自動インスツルメンテーションを有効にします。                       |
| `DD_TRACE_REPORT_HOSTNAME`                | `false`     | ルートスパンでホスト名レポートを有効にする                                                                        |
| `DD_TRACE_RESOURCE_URI_MAPPING`           | `null`      | URLからリソース名のマッピング規則の CSV：例、`/foo/*,/bar/$*/baz`。[「カスタム URL からリソースへのマッピング」を参照してください](#カスタム URL からリソースへのマッピング) |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `false`     | リソース名として URL を有効にします。[「リソース名を正規化された URI にマッピング」を参照してください](#リソース名を正規化された URI にマッピング)                                  |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`      | `false`     | 特定のインテグレーションで関連するスパンの App Analytics を有効にするためのフラグ                                         |

#### リソース名を正規化された URI にマッピング

<div class="alert alert-warning">
本機能は公開ベータ版です。詳細は、<a href="/help">Datadog サポート</a>にお問い合わせください。
</div>

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=true` の場合、クエリ文字列は URL から削除された状態で、`<HTTP_REQUEST_METHOD> <NORMALIZED_URL>` 形式のトレースリソース名を作成するために URL は使用されます。これにより、URL を正規化し 1 つのリソースの下に一般的なエンドポイントをグループ化しても自動インスツルメンテーションされないカスタムフレームワークの可視性が向上します。

| HTTP リクエスト                       | リソース名 |
|:-----------------------------------|:--------------|
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

数値 ID、UUID (ダッシュの有無不問)、32〜512 ビットの 16 進数ハッシュは、自動的に `?` に置換されます。

| URL (GET リクエスト）                              | リソース名      |
|:-----------------------------------------------|:-------------------|
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

##### カスタム URL からリソースマッピング

[URL リソース名が有効になる](#map-resource-names-to-normalized-uri)と、カスタム URL マッピングはマッピング規則一覧（CSV）を採用する `DD_TRACE_RESOURCE_URI_MAPPING` を使用して設定されます。ワイルドカードの `*` や `$*` に対応するため、`DD_TRACE_RESOURCE_URI_MAPPING=/foo/*,/bar/$*/baz`となります。ここでは、`*` は置換文字 `?` で貪欲マッチを行い、`$*` は置換なしの貪欲マッチを行います。

規則は `DD_TRACE_RESOURCE_URI_MAPPING` で表示される順番で適用されます。貪欲な規則より非貪欲な規則の方が先に表示されます。例、`/foo/$*/bar,/foo/*`

ワイルドカード `*` は `?` で置換されます。

| マッピング規則 | URL (GET リクエスト）  | リソース名    |
|:-------------|:-------------------|:-----------------|
| `/foo/*`     | `/foo/bar`         | `GET /foo/?`     |
| `/foo/*/bar` | `/foo/baz/faz/bar` | `GET /foo/?/bar` |
| `/foo-*-bar` | `/foo-secret-bar`  | `GET /foo-?-bar` |

ワイルドカード `$*` は置換無しにマッチされます。

| マッピング規則        | URL (GET リクエスト）           | リソース名              |
|:--------------------|:----------------------------|:---------------------------|
| `/state/$*/show`    | `/state/kentucky/show`      | `GET /state/kentucky/show` |
| `/widget/*/type/$*` | `/widget/foo-id/type/green` | `GET /widget/?/type/green` |

## アップグレード

PHP トレーサーをアップグレードするには、[最新のリリースをダウンロード][6]し、[拡張機能のインストール](#拡張機能のインストール)と同じ手順に従います。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /ja/tracing/send_traces
[4]: /ja/tracing/setup/docker
[5]: /ja/agent/kubernetes/daemonset_setup/#trace-collection
[6]: https://github.com/DataDog/dd-trace-php/releases/latest
[7]: https://app.datadoghq.com/apm/services
[8]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[9]: /ja/tracing/faq/php-tracer-manual-installation
[10]: /ja/tracing/setup/php/#environment-variable-configuration
[11]: /ja/help
[12]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[13]: http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param