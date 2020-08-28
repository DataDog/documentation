---
title: PHP アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/languages/php
  - /ja/agent/apm/php/
  - /ja/tracing/php/
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-php-performance/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した PHP の監視
  - link: 'https://github.com/DataDog/dd-trace-php'
    tag: GitHub
    text: ソースコード
  - link: /tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: /tracing/
    tag: Documentation
    text: 高度な使用方法
---
## 互換性要件

サポート対象のライブラリと言語の一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

すでに Datadog アカウントをお持ちの場合は、ホストベースまたはコンテナベースのセットアップ向けのアプリ内ガイドで[詳細な手順][2]をご確認いただけます。

APM で使用される用語の説明は、[公式ドキュメント][3]を参照してください。

PHP トレーサーのオープンソースに対する貢献に関しては、[コントリビューションガイド][4]を参照してください。

### Datadog Agent の設定

PHP APM トレーサーは、Datadog Agent を使用してトレースデータを送信します。

[Datadog Agent をインストール、構成][5]します。[Docker アプリケーションのトレース][6]または [Kubernetes アプリケーションのトレース][7]に関する追加ドキュメントを確認します。

Agent バージョン [7.18.0][8] 以降の場合、APM はすべての環境でデフォルトで有効になっており、これ以上の操作は必要ありません。
これより古いバージョンの Agent を実行している場合は、Agent で **[APM が有効][5]**になっていることを確認してください。

### 拡張機能をインストール

[対応するディストリビューション用にプリコンパイルされたパッケージ][9]の 1 つを使用して PHP 拡張機能をインストールします。

ダウンロードしたら、次のコマンドを使いパッケージをインストールします。

```shell
# RPM パッケージを使用 (RHEL/Centos 6 以降、Fedora 20 以降)
rpm -ivh datadog-php-tracer.rpm

# DEB パッケージを使用 (Debian Jessie 以降、対応するバージョンの PHP にインストールされた Ubuntu 14.04 以降)
dpkg -i datadog-php-tracer.deb

# APK パッケージを使用 (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted
```

デフォルトの PHP バージョンの拡張機能がインストールされます。特定の PHP バージョンの拡張機能をインストールするには、インストールを実施する前に `DD_TRACE_PHP_BIN` 環境変数を使用してターゲット PHP バイナリの場所を設定します。

```shell
export DD_TRACE_PHP_BIN=$(which php-fpm7)
```

PHP (PHP-FPM または Apache SAPI) を再起動し、アプリケーションのトレース可能なエンドポイントにアクセスします。[APM UI][10] でトレースを確認できます。

**注**: UI にトレースが表示されるまでに時間がかかる場合があります。数分経ってもトレースが表示されない場合は、ホストマシンで[dd-doctor.php 診断スクリプトを実行][11]し問題を見つけます。

ディストリビューションが見つからない場合は、PHP 拡張機能を[手動でインストール][12]します。

## 自動でデータと収集

トレースはデフォルトで自動的に有効になります。拡張機能がインストールされると、**ddtrace** はアプリケーションをトレースし、Agent へトレースを送ります。

Datadog はそのままの状態ですべてのウェブフレームワークをサポートします。自動インスツルメンテーションは、特定の関数やメソッドをトレースするためにラップするよう PHP のランタイムを変更しことで実行されます。PHP トレーサーは、複数のライブラリの自動インスツルメンテーションをサポートします。

自動インスツルメンテーションは以下を取得します。

* メソッド実行時間
* Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
* 未処理の例外（該当する場合スタックトレースを含む）
* Web リクエストなど、システムを通過するトレースの合計数

**注**: アプリケーションが Composer や `spl_autoload_register()` で登録されたオートローダーを使用しない場合、環境変数を `DD_TRACE_NO_AUTOLOADER=true` と設定し、自動インスツルメンテーションを有効にします。

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを設定し、以下のカスタム Agent ホスト名にトレースを送信します。

PHP トレーサーが自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

変数の設定方法については、[トレーサーコンフィギュレーション][13]を参照してください。

## 構成

PHP トレーサーは環境変数で設定できます。

**注**: コードの自動インスツルメンテーションを使用する場合（推奨されるアプローチ）、インスツルメンテーションコードはどのユーザーコードよりも先に実行されることに注意してください。そのため、以下の環境変数はサーバーレベルで設定し、ユーザーコードが実行される前に PHP ランタイムで使用できるようにします。たとえば、`putenv()` や `.env` ファイルは機能しません。

### Apache

php-fpm を使用する Apache の場合、`www.conf` コンフィギュレーションファイルの `env` ディレクトリを使用して php トレーサーを構成します。次に例を示します。

```
; ホスト環境変数 SOME_ENV を
; DD_AGENT_HOST として PHP プロセスへ渡す例
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

または、サーバーコンフィギュレーション、仮想ホスト、ディレクトリ、または `.htaccess` ファイルから [`SetEnv`][14] を使用できます。

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

NGINX の場合、php-fpm の `www.conf` ファイルの `env` ディレクティブを使用します。次に例を示します。

```
; ホスト環境変数 SOME_ENV を
; DD_AGENT_HOST として PHP プロセスへ渡す例
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

**注**: NGINX サーバーで APM を有効にしている場合、分散トレースが正常に機能するように `opentracing_fastcgi_propagate_context` 設定を適切に構成してください。詳細は、[NGINX APM コンフィギュレーション][15]を参照してください。

### PHP CLI サーバー

コマンドラインで設定しサーバーを起動します。

```text
DD_TRACE_DEBUG=true php -S localhost:8888
```

### 環境変数コンフィギュレーション

| 環境変数                              | デフォルト     | 注                                                                                                                                           |
|-------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | Agent のホスト名                                                                                                                            |
| `DD_AUTOFINISH_SPANS`                     | `false`     | トレーサーがフラッシュされた時点でスパンを自動終了させるかどうか                                                                            |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | 分散型トレーシングの有効にするかどうか                                                                                                          |
| `DD_ENV`                                  | `null`      | アプリケーションの環境 (例: `prod`、`pre-prod`、`stage`) を設定します。バージョン `0.47.0` で追加されました。                                         |
| `DD_PRIORITY_SAMPLING`                    | `true`      | 優先度付きサンプリングを有効にするかどうか                                                                                                            |
| `DD_SERVICE`                              | `null`      | デフォルトのアプリ名。バージョン 0.47.0 以降では、`DD_SERVICE_NAME` になります。                                                                          |
| `DD_SERVICE_MAPPING`                      | `null`      | APM インテグレーションのデフォルトの名前を変更します。一度に 1 つ以上のインテグレーションの名前を変更できます。例: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` ([インテグレーション名](#インテグレーション名)を参照してください) |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | IPC ベースの構成可能なサーキットブレーカーの再試行時間（ミリ秒）                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Agent の接続設定に使える最大時間（ミリ秒）                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Agent の接続タイムアウト（ミリ秒）                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | IPC ベースの構成可能なサーキットブレーカーの連続エラー最大数                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | Agent ポート番号                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | Agent リクエストの転送タイムアウト（ミリ秒）                                                                                           |
| `DD_TRACE_AGENT_URL`                      | `null`      | Agent の URL。`DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` よりも優先されます。例: `https://localhost:8126`。バージョン `0.47.1` で追加されました。 |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Web インテグレーションで関連するスパンに対するApp Analytics を有効にするためのフラグ                                                                            |
| `DD_TRACE_AUTO_FLUSH_ENABLED`             | `false`     | すべてのスパンが終了されたタイミングでトレーサーを自動でフラッシュします。長時間実行されるプロセスをトレースするために、`DD_TRACE_GENERATE_ROOT_SPAN=0` と併せて `true` に設定されます。 |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | CLI から PHP スクリプトのトレースを有効にする                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | トレーサーの[デバッグモード](#カスタム URL からリソースへのマッピング)を有効にする                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | トレーサーをグローバルに有効にする                                                                                                                     |
| `DD_TRACE_GENERATE_ROOT_SPAN`             | `true`      | トップレベルのスパンを自動生成します。長時間実行されるプロセスをトレースするために、`DD_TRACE_AUTO_FLUSH_ENABLED=1` と併せて `false` に設定されます    |
| `DD_TAGS`                                 | `null`      | すべてのスパンに設定されるタグ。例、`key1:value1,key2:value2`。バージョン `0.47.0` で追加されました。                                                 |
| `DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`    | `false`     | HTTP リクエストのサービス名を `host-<ホスト名>` に設定します。例: `https://datadoghq.com` に対する `curl_exec()` コールのサービス名は、デフォルトのサービス名 `curl` ではなく `host-datadoghq.com` となります。 |
| `DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED` | `false`    | 特定のインテグレーションで関連するスパンの App Analytics を有効にするためのフラグ ([インテグレーション名](#integration-names)を参照してください)。バージョン < `0.47.1` の場合、このパラメーターは `DD_<INTEGRATION>_ANALYTICS_ENABLED` です。 |
| `DD_TRACE_<INTEGRATION>_ANALYTICS_SAMPLE_RATE` | `1.0`  | 特定のインテグレーションで関連するスパンの App Analytics サンプルレートを設定するためのフラグ  ([インテグレーション名](#integration-names)を参照してください)。バージョン < `0.47.1` の場合、このパラメーターは `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE` です。 |
| `DD_TRACE_<INTEGRATION>_ENABLED`          | `true`      | インテグレーションを有効または無効にします。すべてのインテグレーションはデフォルトで有効になっています ([インテグレーション名](#integration-names)を参照してください)。バージョン < `0.47.1` の場合、このパラメーターは無効にするインテグレーションの CSV リストを取得する `DD_INTEGRATIONS_DISABLED` です (例: `curl,mysqli`)。 |
| `DD_TRACE_MEASURE_COMPILE_TIME`           | `true`      | リクエストのコンパイル時間 (ミリ秒) をトップレベルのスパン上に記録します。                                                               |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | オートローダーを使用しないアプリケーションには、`true` に設定して自動インスツルメンテーションを有効にします。                                                    |
| `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`    | `null`      | ID に対応するパスフラグメントを特定する正規表現のCSV（[リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください）。 |
| `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`  | `null`      | 受信リクエストのリソース名を正規化するための URI マッピングの CSV（[リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください）。 |
| `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`  | `null`      | 発信リクエストのリソース名を正規化するための URI マッピングの CSV（[リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください）。 |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | トレースのサンプリングレート (デフォルトは `0.0` および `1.0`)。 バージョン < `0.36.0` の場合、このパラメーターは `DD_SAMPLING_RATE` となります。           |
| `DD_TRACE_SAMPLING_RULES`                 | `null`      | JSON でエンコードされた文字列で、サンプリングレートを構成します。例: サンプルレートを 20% に設定する場合は `[{"sample_rate": 0.2}]` となります。'a' ではじまる、スパン名が 'b' のサービスのサンプルレートを 10% に、その他のサービスのサンプルレートを 20% に設定する場合は `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]` のようになります ([インテグレーション名](#integration-names) を参照してください) 。 |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `true`      | リソース名として URL を有効にします。([リソース名を正規化された URI にマッピング](#リソース名を正規化された URI にマッピング)を参照してください) 。                            |
| `DD_VERSION`                              | `null`      | トレースとログで、アプリケーションのバージョン（例: `1.2.3`, `6c44da20`, `2020.02.13`）を設定します。バージョン `0.47.0` で追加されました。                    |

#### インテグレーション名

以下の表は、各インテグレーションに紐付くデフォルトのサービス名をまとめたものです。サービス名は `DD_SERVICE_MAPPING` に変更してください。

インテグレーション固有のコンフィギュレーションを設定する場合は、`DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED` の形式で名前をつけてください。例: Laravel の場合、`DD_TRACE_LARAVEL_ANALYTICS_ENABLED`

| インテグレーション       | サービス名      |
|-------------------|-------------------|
| CakePHP           | `cakephp`         |
| CodeIgniter       | `codeigniter`     |
| cURL              | `curl`            |
| ElasticSearch     | `elasticsearch`   |
| Eloquent          | `eloquent`        |
| Guzzle            | `guzzle`          |
| Laravel           | `laravel`         |
| Lumen             | `lumen`           |
| Memcached         | `memcached`       |
| Mongo             | `mongo`           |
| Mysqli            | `mysqli`          |
| PDO               | `pdo`             |
| PhpRedis          | `phpredis`        |
| Predis            | `predis`          |
| Slim              | `slim`            |
| Symfony           | `symfony`         |
| WordPress         | `wordpress`       |
| Yii               | `yii`             |
| ZendFramework     | `zendframework`   |

#### リソース名を正規化された URI にマッピング

<div class="alert alert-warning">
<strong>非推奨のお知らせ:</strong> バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a> 以降、レガシー設定 <code>DD_TRACE_RESOURCE_URI_MAPPING</code> は非推奨となります。しばらくはまだ機能しますが、レガシーサポートが外された際の問題を回避するために、ここにある新しい設定を使用することを強くお勧めします。

以下の設定: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>、<code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>、<code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> は新しいリソース正規化アプローチをオプトインし、<code>DD_TRACE_RESOURCE_URI_MAPPING</code> の値はすべて無視されることに注意してください。
</div>

HTTP サーバーとクライアントインテグレーションでは、URL はクエリ文字列が URL から削除された状態で、トレースリソース名を作成するために `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>` の形式で使用されます。URL を正規化し 1 つのリソースの下に一般的なエンドポイントをグループ化することで、自動インスツルメンテーションされないカスタムフレームワークにおける可視性を向上することができます。

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

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=false` を使用してこの機能をオフにすることも可能です。

##### カスタム URL からリソースマッピング

適用された自動正規化ではカバーされないケースがいくつかあります。

| URL (GET リクエスト）                | 考えられるリソース名        |
|:---------------------------------|:------------------------------|
| `/using/prefix/id123/for/id`    | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

自動正規化ではカバーされないシナリオには、次の 2 つのクラスがあります。

  - 正規化するパスフラグメントには再現可能なパターンがあり、URL の任意の部分で存在できます（上記の例では `id<number>`）。このシナリオは、次の `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` 設定でカバーされます。
  - 何でもパスフラグメントになれますが、前のパスフラグメントは値が正規化されるべきことを示します。たとえば `/cities/new-york` は、`new-york` は都市名のため正規化する必要があることが分かります。このシナリオは以下の設定でカバーされます `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`、 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`（それぞれ、受信リクエストと発信リクエスト）。 

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

この設定は、各パスフラグメントに個々に適用される正規表現の CSV です。たとえば、最初の例、 `/using/prefix/id123/for/id` で `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` を `^id\d+$` に設定すると、すべてのフラグメント（`using`、`prefix`、`id123`、`for`、`id`）に正規表現が適用されます。最終的な正規化されたリソース名は、`GET /using/prefix/?/for/id` になります。

カンマで区切られた複数の正規表現を `^id\d+$,code\d+$` に追加することができますが、カンマ文字 `,` はエスケープされないので正規表現では使用できないことに注意してください。

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` および `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

この設定はワイルドカード `*` を含むことのできるパターンの CSV です。たとえば、パターン `cities/*` を追加すると、URL を分析中にフラグメント `cities` が見つかる度に、次のフラグメントがある場合 `?` に置き換えられます。パターンは深さを問わず適用されるため、次の規則を適用することで、上記の表の `/cities/new-york` と `/nested/cities/new-york` の両方が正規化されます。

パターンは特定のフラグメントの一部に適用することもできます。たとえば、`path/*-fix` は URL `/some/path/changing-fix/nested` を `/some/path/?-fix/nested` に正規化します。

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` は受信リクエスト（ウェブフレームワークなど）のみに適用され、`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` は発信リクエスト（`curl` や `guzzle` リクエストなど）のみに適用されることに、ご注意ください。

## アップグレード

PHP トレーサーをアップグレードするには、[最新のリリースをダウンロード][9]し、[拡張機能のインストール](#拡張機能のインストール)と同じ手順に従います。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## 削除中

PHPトレーサーを削除するには:

1. php-fpm の場合は php-fpm サービスを停止し、それ以外の場合は Apache Web サーバーを停止します。
2. php コンフィギュレーションフォルダーから `98-ddtrace.ini` と `99-ddtrace-custom.ini` のファイルのリンクを外します。
3. php-fpm の場合は php-fpm サービスを再起動し、それ以外の場合は Apache Web サーバーを再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/install
[3]: /ja/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: /ja/tracing/send_traces/
[6]: /ja/tracing/setup/docker/
[7]: /ja/agent/kubernetes/apm/
[8]: https://github.com/DataDog/datadog-agent/releases/tag/7.18.0
[9]: https://github.com/DataDog/dd-trace-php/releases/latest
[10]: https://app.datadoghq.com/apm/services
[11]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[12]: /ja/tracing/faq/php-tracer-manual-installation
[13]: /ja/tracing/setup/php/#environment-variable-configuration
[14]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[15]: /ja/tracing/setup/nginx/#nginx-and-fastcgi