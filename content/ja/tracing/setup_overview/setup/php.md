---
aliases:
- /ja/tracing/languages/php
- /ja/agent/apm/php/
- /ja/tracing/php/
- /ja/tracing/setup/php
- /ja/tracing/setup_overview/php
- /ja/tracing/faq/php-tracer-manual-installation/
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した PHP の監視
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: ソースコード
- link: /tracing/visualization/
  tag: Documentation
  text: サービス、リソース、トレースを調査する
- link: /tracing/
  tag: Documentation
  text: 高度な使用方法
kind: documentation
title: PHP アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

サポート対象のライブラリと言語の一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中のすべてのトレースの取り込みを有効にします。

APM で使用される用語の説明は、[公式ドキュメント][3]を参照してください。

PHP トレーサーのオープンソースに対する貢献に関しては、[コントリビューションガイド][4]を参照してください。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{< tab "コンテナ" >}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

   `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

    変数の設定方法については、[環境変数のコンフィギュレーション](#environment-variable-configuration) を参照してください。
{{< site-region region="us3,us5,eu,gov" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{< /tab >}}
{{< tab "AWS Lambda" >}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{< /tab >}}
{{< tab "その他の環境" >}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{< /tab >}}
{{< /tabs >}}


### 拡張機能をインストール

公式インストーラーをダウンロードします。

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

インストーラーを実行します。

```shell
# フルインストール: APM + ASM + プロファイリング (ベータ版)
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM のみ
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + プロファイリング (ベータ版)
php datadog-setup.php --php-bin=all --enable-profiling
```

このコマンドは、ホストまたはコンテナで見つかったすべての PHP バイナリに拡張機能をインストールします。もし `--php-bin` が省略された場合、インストーラーはインタラクティブモードで実行され、インストールするバイナリを選択するようユーザーに要求します。このとき、`--php-bin` の値には、特定のバイナリへのパスを指定することができます。

PHP (PHP-FPM または Apache SAPI) を再起動し、アプリケーションのトレース可能なエンドポイントにアクセスします。トレースについては、[APM サービス一覧][5]を参照してください。

<div class="alert alert-info">
<strong>注:</strong>
UI にトレースが表示されるまでに数分かかることがあります。数分経ってもトレースが表示されない場合は、ホストマシンで <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> ページを作成し、`ddtrace` までスクロールダウンしてください。診断に失敗したチェックはこのセクションに表示され、問題を特定するのに役立ちます。
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
PHP CLI のバイナリが NTS (non thread-safe) でビルドされ、Apache が ZTS (Zend thread-safe) バージョンの PHP を使用している場合、 ZTS バイナリの拡張機能のロードを手動で変更する必要があります。<code>/path/to/php-zts --ini</code> を実行して Datadog の <code>.ini</code> ファイルがある場所を探し、ファイル名から <code>-zts</code> サフィックスを追加してください。例えば、<code>extension=ddtrace-20210902.so</code> から <code>extension=ddtrace-20210902-zts.so</code> になります。
</div>


## 自動インスツルメンテーション

トレースはデフォルトで自動的に有効になります。拡張機能がインストールされると、**ddtrace** はアプリケーションをトレースし、Agent へトレースを送ります。

Datadog はそのままの状態ですべてのウェブフレームワークをサポートします。自動インスツルメンテーションは、特定の関数やメソッドをトレースするためにラップするよう PHP のランタイムを変更しことで実行されます。PHP トレーサーは、複数のライブラリの自動インスツルメンテーションをサポートします。

自動インスツルメンテーションは以下を取得します。

* メソッド実行時間
* Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
* 未処理の例外（該当する場合スタックトレースを含む）
* Web リクエストなど、システムを通過するトレースの合計数

## コンフィギュレーション

PHP トレーサーは環境変数および INI 設定を使用して構成できます。

INI 設定は、`php.ini` ファイルで、または特定のウェブサーバーやバーチャルホストに対してなど、グローバルに構成できます。

**注**: コードの自動インスツルメンテーションを使用する場合（推奨されるアプローチ）、インスツルメンテーションコードはどのユーザーコードよりも先に実行されることに注意してください。そのため、以下の環境変数および INI 設定はサーバーレベルで設定し、ユーザーコードが実行される前に PHP ランタイムで使用できるようにします。たとえば、`putenv()` や `.env` ファイルは機能しません。

### Apache

php-fpm を使用する Apache の場合、`www.conf` コンフィギュレーションファイルの `env` ディレクトリを使用して php トレーサーを構成します。次に例を示します。

```
; ホスト環境変数 SOME_ENV を
; DD_AGENT_HOST として PHP プロセスへ渡す例
env[DD_AGENT_HOST] = $SOME_ENV
; 値 'my-app' を DD_SERVICE として PHP
; プロセスへ渡す例 
env[DD_SERVICE] = my-app
; または同等の INI 設定を使用
php_value datadog.service my-app```

サーバーコンフィギュレーション、仮想ホスト、ディレクトリ、または `.htaccess` ファイルから [`SetEnv`][6] を使用することも可能です。

```text
# バーチャルホストコンフィギュレーションで環境変数として
SetEnv DD_TRACE_DEBUG 1
# バーチャルホストコンフィギュレーションで INI 設定として
php_value datadog.service my-app
```

### NGINX と PHP-FPM

<div class="alert alert-warning">
<strong>注:</strong> PHP-FPM は <code>env[...]</code> ディレクティブの値として <code>false</code> をサポートしていません。<code>true</code> のかわりに <code>1</code> を、<code>false</code> のかわりに <code>0</code> を使用します。
</div>

NGINX の場合、php-fpm の `www.conf` ファイルの `env` ディレクティブを使用します。次に例を示します。

```
; ホスト環境変数 SOME_ENV を
; DD_AGENT_HOST として PHP プロセスへ渡す例
env[DD_AGENT_HOST] = $SOME_ENV
; 値 'my-app' を DD_SERVICE として PHP
; プロセスへ渡す例 
env[DD_SERVICE] = my-app
; または同等の INI 設定を使用
php_value[datadog.service] = my-app
```

**注**: NGINX サーバーで APM を有効にしている場合、分散トレースが正常に機能するように `opentracing_fastcgi_propagate_context` 設定を適切に構成してください。詳細は、[NGINX APM コンフィギュレーション][7]を参照してください。

### PHP CLI サーバー

コマンドラインで設定しサーバーを起動します。

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

### 環境変数コンフィギュレーション

以下のテーブルには、トレースの構成用の環境変数と、対応する INI 設定 (利用可能な場合) およびデフォルトが示されています。

`DD_AGENT_HOST`
: **INI**: `datadog.agent_host`<br>
**デフォルト**: `localhost` <br>
Agent ホスト名。

`DD_AUTOFINISH_SPANS`
: **INI**: `datadog.autofinish_spans`<br>
**デフォルト**: `0`<br>
トレーサーがフラッシュした際にスパンが自動的に終了するかどうか。

`DD_DISTRIBUTED_TRACING`
: **INI**: `datadog.distributed_tracing`<br>
**デフォルト**: `1`<br>
分散型トレーシングを有効にするかどうか。

`DD_ENV`
: **INI**: `datadog.env`<br>
**デフォルト**: `null`<br>
`prod`、`pre-prod`、`stage` など、アプリケーションの環境を設定します。バージョン `0.47.0` に追加されています。

`DD_PROFILING_ENABLED`
: **INI**: Not available<br>
**デフォルト**: `0`<br>
Datadog プロファイラーを有効にします。バージョン `0.69.0` に追加されています。[PHP プロファイラーの有効化][8]を参照。

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI**: Not available<br>
**デフォルト**: `0`<br>
試験的 CPU プロファイルタイプを有効にします。バージョン `0.69.0` に追加されています。

`DD_PROFILING_LOG_LEVEL`
: **INI**: Not available<br>
**デフォルト**: `off`<br>
プロファイラーのログレベルを設定します。許可される値は `off`、`error`、`warn`、`info`、`debug` です。プロファイラーのログは、プロセスの標準エラーストリームに書き込まれます。バージョン `0.69.0` に追加されています。

`DD_PRIORITY_SAMPLING`
: **INI**: `datadog.priority_sampling`<br>
**デフォルト**: `1`<br>
優先度付きサンプリングを有効にするかどうか。

`DD_SERVICE`
: **INI**: `datadog.service`<br>
**デフォルト**: `null`<br>
バージョン 0.47.0 以前では `DD_SERVICE_NAME` に相当します。

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**デフォルト**: `null`<br>
APM インテグレーションのデフォルト名を変更します。1 つ以上のインテグレーションの名前変更を同時に行うことができます。例: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` ([インテグレーション名](#integration-names)を参照してください)

`DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`
: **INI**: `datadog.trace.agent_attempt_retry_time_msec`<br>
**デフォルト**: `5000`<br>
IPC ベースの構成可能なサーキットブレーカーの再試行時間 (ミリ秒)

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI**: `datadog.trace.agent_connect_timeout`<br>
**デフォルト**: `100`<br>
Agent 接続のタイムアウト (ミリ秒)

`DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES`
: **INI**: `datadog.trace.agent_max_consecutive_failures`<br>
**デフォルト**: `3`<br>
IPC ベースの構成可能なサーキットブレーカーの連続エラー最大数

`DD_TRACE_AGENT_PORT`
: **INI**: `datadog.trace.agent_port`<br>
**デフォルト**: `8126`<br>
Agent ポート番号。

`DD_TRACE_AGENT_TIMEOUT`
: **INI**: `datadog.trace.agent_timeout`<br>
**デフォルト**: `500`<br>
Agent リクエスト転送のタイムアウト (ミリ秒)。

`DD_TRACE_AGENT_URL`
: **INI**: `datadog.trace.agent_url`<br>
**デフォルト**: `null`<br>
Agent の URL で、`DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` よりも優先されます。例: `https://localhost:8126`。バージョン `0.47.1` に追加されています

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**デフォルト**: `0`<br>
すべてのスパンが終了されたタイミングでトレーサーを自動的にフラッシュします。[長時間実行されるプロセス](#long-running-cli-scripts)をトレースするために、`DD_TRACE_GENERATE_ROOT_SPAN=0` と併せて `1` に設定されます。

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**デフォルト**: `0`<br>
CLI から送られた PHP スクリプトのトレーシングを有効にします。 [CLI スクリプトのトレーシング](#tracing-cli-scripts)を参照してください。

`DD_TRACE_DEBUG`
: **INI**: `datadog.trace.debug`<br>
**デフォルト**: `0`<br>
デバッグモードを有効にします。`1` の場合、ログメッセージは INI 設定の `error_log` で設定されたデバイスまたはファイルに送信されます。実際の `error_log` の値は PHP-FPM/Apache のコンフィギュレーションファイルで上書きされる可能性があるため、`php -i` の出力とは異なる場合があります。

`DD_TRACE_ENABLED`
: **INI**: `datadog.trace.enabled`<br>
**デフォルト**: `1`<br>
トレーサーをグローバルに有効化します

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI**: `datadog.trace.generate_root_span`<br>
**デフォルト**: `1`<br>
トップレベルのスパンを自動生成します。[長時間実行されるプロセス](#long-running-cli-scripts)をトレースするために、`DD_TRACE_AUTO_FLUSH_ENABLED=1` と併せて `0` に設定されます。

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**デフォルト**: `null`<br>
`key1:value1,key2:value2` など、すべてのスパンに設定されるタグ。バージョン `0.47.0` に追加されています

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**デフォルト**: `null`<br>
ルートスパンでタグとして報告されたヘッダー名の CSV。

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**デフォルト**: `0`<br>
HTTP リクエストのサービス名を `host-<hostname>` に設定します。例: `https://datadoghq.com` に対する `curl_exec()` コールのサービス名は、デフォルトのサービス名 `curl` ではなく `host-datadoghq.com` となります。

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**デフォルト**: `0`<br>
Redis クライアントオペレーションのサービス名を `redis-<hostname>` に設定します。バージョン `0.51.0` に追加されています　

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**デフォルト**: `1`<br>
インテグレーションを有効または無効にします。すべてのインテグレーションはデフォルトで有効になっています ([インテグレーション名](#integration-names)を参照してください)。バージョン `0.47.1` 以前の場合、このパラメーターは `DD_INTEGRATIONS_DISABLED` に相当し、無効にするインテグレーションの CSV リストを取得します (例: `curl,mysqli`)。

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**デフォルト**: `1`<br>
リクエストのコンパイル時間 (ミリ秒) をトップレベルのスパン上に記録します。

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI**: `datadog.trace.resource_uri_fragment_regex`<br>
**デフォルト**: `null`<br>
ID に対応するパスフラグメントを特定する正規表現のCSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI**: `datadog.trace.resource_uri_mapping_incoming`<br>
**デフォルト**: `null`<br>
受信リクエストのリソース名を正規化するための URI マッピングの CSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI**: `datadog.trace.resource_uri_mapping_outgoing`<br>
**デフォルト**: `null`<br>
発信リクエストのリソース名を正規化するための URI マッピングの CSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI**: `datadog.trace.retain_thread_capabilities`<br>
**デフォルト**: `0`<br>
Linux で動作します。`true` に設定すると、有効なユーザー ID を変更しても Datadog のバックグラウンドスレッド機能を維持することができます。このオプションはほとんどの設定には影響しませんが、一部のモジュールで影響が出る場合があります。現時点で Datadog が確認している限りでは、[Apache の mod-ruid2][9] で `setuid()` や類似の syscall を呼び出した場合に影響が生じ、クラッシュや機能の不具合につながる可能性があります。<br><br>
**注:** このオプションを有効にすると、セキュリティが損なわれる可能性があります。このオプションは単独ならセキュリティ上のリスクをもたらす心配はありません。しかし、Web サーバーや PHP がフル機能で起動されている場合はバックグラウンドスレッドが元の機能を維持しているため、攻撃者は PHP や Web サーバーの脆弱性を悪用して比較的容易に権限を昇格できる可能性があります。Datadog では、`setcap` ユーティリティを使用して Web サーバーの機能を制限することをお勧めしています。

`DD_TRACE_SAMPLE_RATE`
: **INI**: `datadog.trace.sample_rate`<br>
**デフォルト**: `1.0`<br>
トレースのサンプリングレート (デフォルトは `0.0` および `1.0`)。`0.36.0` 以前では、このパラメーターは `DD_SAMPLING_RATE` となります。

`DD_TRACE_SAMPLING_RULES`
: **INI**: `datadog.trace.sampling_rules`<br>
**デフォルト**: `null`<br>
JSON でエンコードされた文字列で、サンプリングレートを構成します。例: サンプルレートを 20% に設定する場合は `'[{"sample_rate": 0.2}]'` となります。'a' ではじまる、スパン名が 'b' のサービスのサンプルレートを 10% に、その他のサービスのサンプルレートを 20% に設定する場合は `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`  のようになります ([インテグレーション名](#integration-names) を参照してください) 。二重引用符 (`"`) のエスケープ処理による問題を防ぐため、JSON オブジェクトは**必ず**単一引用符 (`'`) で囲むようにしてください。

`DD_TRACE_SPANS_LIMIT`
: **INI**: `datadog.trace.spans_limit`
**Default**: `1000`<br>
1 つのトレース内で生成されるスパンの最大数。最大数に達すると、その後スパンは生成されなくなります。上限を増大すると、保留中のトレースに使用されるメモリの量が増加し、許可されるメモリの PHP 最大量に達する可能性があります。許可されるメモリの最大量は、PHP INI システム設定の `memory_limit`.limit で増加できます。

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI**: `datadog.trace.url_as_resource_names_enabled`<br>
**デフォルト**: `1`<br>
リソース名として URL を有効にします ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri)を参照してください)。

`DD_VERSION`
: **INI**: `datadog.version`<br>
**デフォルト**: `null`<br>
トレースとログで、アプリケーションのバージョン (例:  `1.2.3`、`6c44da20`、`2020.02.13`) を設定します。バージョン `0.47.0` で追加されています

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**デフォルト**: `*`<br>
URL の一部として収集するクエリパラメータのカンマ区切りリスト。パラメータを収集しない場合は空、すべてのパラメータを収集する場合は `*` を設定します。バージョン `0.74.0` で追加されました。

`DD_TRACE_CLIENT_IP_HEADER_DISABLED`
: **INI**: `datadog.trace.client_ip_header_disabled`<br>
**デフォルト**: `0`<br>
関連する IP ヘッダーからのクライアント IP 収集を無効にします。バージョン `0.76.0` で追加されました。

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `datadog.trace.client_ip_header`<br>
**デフォルト**: `null`<br>
クライアント IP の収集に使用する IP ヘッダー。例: `x-forwarded-for`。バージョン `0.76.0` で追加されました。

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**デフォルト**: 
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
 URL の一部として含まれるクエリ文字列を難読化するために使用される正規表現。バージョン `0.76.0` で追加されました。

#### インテグレーション名

以下の表は、各インテグレーションに紐付くデフォルトのサービス名をまとめたものです。サービス名は `DD_SERVICE_MAPPING` に変更してください。

インテグレーション固有のコンフィギュレーションを設定する場合は、`DD_TRACE_<INTEGRATION>_ENABLED` 形式で名前を付けてください。例: Laravel の場合、 `DD_TRACE_LARAVEL_ENABLED`。

| インテグレーション   | サービス名    |
| ------------- | --------------- |
| CakePHP       | `cakephp`       |
| CodeIgniter   | `codeigniter`   |
| cURL          | `curl`          |
| ElasticSearch | `elasticsearch` |
| Eloquent      | `eloquent`      |
| Guzzle        | `guzzle`        |
| Laravel       | `laravel`       |
| Lumen         | `lumen`         |
| Memcached     | `memcached`     |
| Mongo         | `mongo`         |
| Mysqli        | `mysqli`        |
| PDO           | `pdo`           |
| PhpRedis      | `phpredis`      |
| Predis        | `predis`        |
| Slim          | `slim`          |
| Symfony       | `symfony`       |
| WordPress     | `wordpress`     |
| Yii           | `yii`           |
| ZendFramework | `zendframework` |

#### リソース名を正規化された URI にマッピング

<div class="alert alert-warning">
<strong>非推奨のお知らせ:</strong> バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a> 以降、レガシー設定 <code>DD_TRACE_RESOURCE_URI_MAPPING</code> は非推奨となります。しばらくはまだ機能しますが、レガシーサポートが外された際の問題を回避するために、ここにある新しい設定を使用することを強くお勧めします。

以下の設定: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>、<code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>、<code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> は新しいリソース正規化アプローチをオプトインし、<code>DD_TRACE_RESOURCE_URI_MAPPING</code> の値はすべて無視されることに注意してください。
</div>

HTTP サーバーとクライアントインテグレーションでは、URL はクエリ文字列が URL から削除された状態で、トレースリソース名を作成するために `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>` の形式で使用されます。URL を正規化し 1 つのリソースの下に一般的なエンドポイントをグループ化することで、自動インスツルメンテーションされないカスタムフレームワークにおける可視性を向上することができます。

| HTTP リクエスト                       | リソース名 |
| :--------------------------------- | :------------ |
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

数値 ID、UUID (ダッシュの有無不問)、32〜512 ビットの 16 進数ハッシュは、自動的に `?` に置換されます。

| URL (GET リクエスト）                              | リソース名      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0` を使用してこの機能をオフにすることも可能です。

##### URL からリソースへのマッピングをカスタマイズ

適用された自動正規化ではカバーされないケースがいくつかあります。

| URL (GET リクエスト）                | 考えられるリソース名        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

自動正規化ではカバーされないシナリオには、次の 2 つのクラスがあります。

  - 正規化するパスフラグメントには再現可能なパターンがあり、URL の任意の部分で存在できます（上記の例では `id<number>`）。このシナリオは、次の `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` 設定でカバーされます。
  - 何でもパスフラグメントになれますが、前のパスフラグメントは値が正規化されるべきことを示します。たとえば `/cities/new-york` は、`new-york` は都市名のため正規化する必要があることが分かります。このシナリオは以下の設定でカバーされます `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`、 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`（それぞれ、受信リクエストと発信リクエスト）。 

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

この設定は、各パスフラグメントに個々に適用される正規表現の CSV です。たとえば、 `/using/prefix/id123/for/id` のパスとして `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` を `^id\d+$` に設定すると、各フラグメント（`using`、`prefix`、`id123`、`for`、`id`）に正規表現が適用されます。

| URL                          | 正規表現     | 考えられるリソース名       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

この変数の形式は CSV であるため、カンマ記号 `,` はエスケープされず、正規表現では使用できないことに注意してください。

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` および `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

この設定はワイルドカード `*` を含むことのできるパターンの CSV です。たとえば、パターン `cities/*` を追加すると、URL を分析中にフラグメント `cities` が見つかる度に、次のフラグメントがある場合 `?` に置き換えられます。パターンは深さを問わず適用されるため、次の規則を適用することで、上記の表の `/cities/new-york` と `/nested/cities/new-york` の両方が正規化されます。

パターンは特定のフラグメントの一部に適用することもできます。たとえば、`path/*-fix` は URL `/some/path/changing-fix/nested` を `/some/path/?-fix/nested` に正規化します。

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` は受信リクエスト（ウェブフレームワークなど）のみに適用され、`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` は発信リクエスト（`curl` や `guzzle` リクエストなど）のみに適用されることに、ご注意ください。

### `open_basedir` 制限

[`open_basedir`][10] 設定が使用される場合、許可されるディレクトリに `/opt/datadog-php` を追加する必要があります。
アプリケーションを Docker コンテナで実行する場合は、許可されるディレクトリにパス `/proc/self` も追加する必要があります。

## CLI スクリプトのトレーシング

### 短時間実行される CLI スクリプト

短時間実行のスクリプトは、通常、数秒から数分程度実行され、スクリプトが実行されるたびに 1 つのトレースを受け取ります。

デフォルトでは、コマンドラインから実行される PHP スクリプトのトレースは無効です。`DD_TRACE_CLI_ENABLED` を `1` に設定することで有効になります。

```
$ export DD_TRACE_CLI_ENABLED=1

# オプションとして、エージェントのホストとポートが localhost と 8126 と異なる場合はそれぞれ設定します
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

例えば、以下の `script.php` が Curl リクエストを実行するとします。

```php
<?php

sleep(1);

$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);

sleep(1);

```

スクリプトを実行します:

```
$ php script.php
```

実行するとトレースが生成され、スクリプトの終了時に Datadog のバックエンドに送信されます。

{{< img src="tracing/setup/php/short-running-cli.jpg" alt="短時間で実行される PHP CLI スクリプトのトレース" >}}

### 長時間実行される CLI スクリプト

長時間実行されるスクリプトは、数時間から数日にわたって実行されます。通常、このようなスクリプトは、新しい受信メッセージの処理やデータベースのテーブルに追加された新しい行の処理など、特定のタスクを繰り返し実行します。これにより、メッセージの処理など「作業単位」ごとに 1 つのトレースが生成されることが期待されます。

デフォルトでは、コマンドラインから実行される PHP スクリプトのトレースは無効です。`DD_TRACE_CLI_ENABLED` を `1` に設定することで有効になります。

```
$ export DD_TRACE_CLI_ENABLED=1
# この設定では、メソッドの実行が終了すると同時に、各「作業単位」のトレースが送信されます。
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1

# オプションとしてサービス名や env などを設定します...
$ export DD_SERVICE=my_service

# オプションとして、エージェントのホストとポートが localhost と 8126 と異なる場合は、それぞれ設定します
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

例えば、以下の `long_running.php` スクリプトを実行すると想定します。　 

```php
<?php


/* Datadog 固有のコード。別のファイルで準備し、このスクリプトで使用します。 */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;

trace_function('processMessage', function(SpanData $span, $args) {
    // メソッドの引数にアクセスし、リソース名を変更
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});

trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // リソース名のデフォルトは、完全に修飾されたメソッド名となります。
});

trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Datadog コード終了 */

/** 受信・処理対象のメッセージ */
class Message
{
    public $id;
    public $content;

    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}

/** 処理対象となる複数のステージのうちの 1 つ。それぞれがスパンを保有 */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}

/** 処理対象となる複数のステージのうちの 1 つ。それぞれがスパンを保有 */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}

/** 実際のアプリケーションでは、キューなどのソースから新しいメッセージを読み込みます。*/
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}

/** この関数は「仕事の単位」であり、その実行ごとに 1 つのシングルトレースを生成します */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}

$processors = [new ProcessingStage1(), new ProcessingStage2()];

/** 新しいメッセージを待つためにループを永続的に実行 */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

スクリプトを実行します:

```
$ php long_running.php
```

実行すると、新しいメッセージが処理されるたびに 1 つのトレースが生成され、Datadog のバックエンドに送信されます。

{{< img src="tracing/setup/php/long-running-cli.jpg" alt="長時間で実行される PHP CLI スクリプトのトレース" >}}

## アップグレード

PHP トレーサーをアップグレードするには、[最新のリリースをダウンロード][5]し、[拡張機能のインストール](#install-the-extension)と同じ手順に従います。

インストールが完了したら、PHP (PHP-FPM または Apache SAPI) を再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## 削除中

PHPトレーサーを削除するには:

1. php-fpm の場合は php-fpm サービスを停止し、それ以外の場合は Apache Web サーバーを停止します。
2. php コンフィギュレーションフォルダーから `98-ddtrace.ini` と `99-ddtrace-custom.ini` のファイルのリンクを外します。
3. php-fpm の場合は php-fpm サービスを再起動し、それ以外の場合は Apache Web サーバーを再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## アプリケーションクラッシュのトラブルシューティング

PHP トレーサーが原因でアプリケーションがクラッシュするという異常なイベントが発生した場合、通常はセグメンテーションフォールトが原因で、最善の対応はコアダンプや Valgrind トレースを取得し、Datadog サポートに連絡することです。

### デバッグシンボルをインストールする

コアダンプを読み取るためには、PHP を実行するシステムに PHP バイナリのデバッグシンボルがインストールされていなければなりません。

PHP や PHP-FPM にデバッグシンボルがインストールされているかどうかを確認するには、`gdb` を使用してください。

`gdb` をインストールします。

```
apt|yum install -y gdb
```

対象のバイナリで `gdb` を実行します。たとえば、PHP-FPM の場合は次のようになります。

```
gdb php-fpm
```

`gdb` で以下のような行が出力された場合、デバッグシンボルはすでにインストールされています。

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

`gdb` で以下のような行が出力された場合は、デバッグシンボルをインストールする必要があります。

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### CentOS

`debuginfo-install` プログラムを含む `yum-utils` パッケージをインストールします。

```
yum install -y yum-utils
```

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
yum list installed | grep php
```

デバッグシンボルをインストールします。`php-fpm` パッケージの場合は次のようになります。

```
debuginfo-install -y php-fpm
```

**注**: PHP バイナリを提供するリポジトリがデフォルトで有効になっていない場合は、`debuginfo-install` コマンドを実行する際に有効にすることができます。たとえば、次のようになります。

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### Sury Debian DPA から PHP をインストールした場合

PHP を [Sury Debian DPA][11] からインストールした場合は、DPA でデバッグデバッグシンボルを入手することができます。たとえば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### 異なるパッケージから PHP をインストールした場合

Debian プロジェクトでは、wiki ページに[デバッグシンボルのインストール手順][12]を掲載しています。

`/etc/apt/sources.list` ファイルを編集します。

```
# ... 既存のパッケージをすべてここに残す

# `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main を追加
# buster の場合の例
deb http://deb.debian.org/debian-debug/ buster-debug main
```

`apt` を更新します。　

```
apt update
```

デバッグシンボルには、まず標準パッケージ名をお試しください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティーツールの `find-dbgsym-packages` バイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、結果のパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu

##### `ppa:ondrej/php` から PHP をインストールした場合　

PHP を [`ppa:ondrej/php`][13] からインストールした場合は、`main/debug` コンポーネントを追加して apt ソースファイル `/etc/apt/sources.list.d/ondrej-*.list` を編集します。

以前:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

以降:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

デバッグシンボルを更新およびインストールします。たとえば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### 異なるパッケージから PHP をインストールした場合

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
apt list --installed | grep php
```

**注**: `php-fpm` は、実際のパッケージを参照するメタパッケージである場合もあります (例: PHP-FPM 7.2 の場合は `php7.2-fpm`)。この場合、パッケージ名は後者のようになります。

デバッグシンボルには、まず標準パッケージ名をお試しください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

`-dbg` および `-dbgsym` パッケージが見つからない場合は、`ddebs` リポジトリを有効にしてください。`ddebs` から[デバッグシンボルをインストールする方法][14]についての詳細は、Ubuntu のドキュメントを参照してください。

たとえば、Ubuntu 18.04 以降の場合、`ddebs` リポジトリを有効にします。

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

署名キーをインポートします ([署名キーが正しい][15]ことを確認してください)。

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

デバッグシンボルの正規のパッケージ名を追加してください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティツール `find-dbgsym-packages` を使用してバイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、結果のパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### コアダンプの取得

PHP アプリケーションのコアダンプを取得することは、特に PHP-FPM では難しい場合があります。コアダンプを取得するのに役立ついくつかのヒントを次に示します。

1. アプリケーションエラーログを調べて、PHP-FPM がコアダンプを生成したかどうかを確認します。
   - `(SIGSEGV - core dumped)` を検索します。これは、次のようなメッセージはダンプされたことを意味するためです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`
   - `(SIGSEGV)` を検索します。これは、次のようなメッセージはコアがダンプされなかったことを意味するためです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`
1. `cat /proc/sys/kernel/core_pattern` を実行して、コアダンプを見つけます。デフォルト値は通常 `core` です。これは、`core` という名前のファイルが Web ルートフォルダーに生成されることを意味します。

コアダンプが生成されなかった場合は、次のコンフィギュレーションを確認し、必要に応じて変更します。

1. `/proc/sys/kernel/core_pattern` にネストされたディレクトリを含むパスが含まれている場合は、完全なディレクトリパスが存在することを確認します。
1. PHP-FPM プールワーカーを実行しているユーザーが `root` 以外の場合 (一般的なユーザー名は `www-data`)、そのユーザーにコアダンプディレクトリへの書き込みアクセス許可を付与します。
1. `/proc/sys/fs/suid_dumpable` の値が `0` ではないことを確認します。PHP-FPM ワーカープールを `root` として実行しない限り、`1` または `2` に設定します。システム管理者にオプションを確認します。
1. PHP-FPM プールコンフィギュレーションセクションに適切な `rlimit_core` があることを確認します。これは unlimited に設定できます: `rlimit_core = unlimited`
1. システムに適切な `ulimit` が設定されていることを確認します。これは unlimited に設定できます: `ulimit -c unlimited`
1. アプリケーションが Docker コンテナで実行されている場合は、ホストマシンに対して `/proc/sys/*` への変更を行う必要があります。使用可能なオプションについては、システム管理者に問い合わせてください。可能であれば、テスト環境またはステージング環境で問題を再現してみてください。

### Valgrind トレースの取得

クラッシュの詳細を把握するために、Valgrind でアプリケーションを実行します。コアダンプとは異なり、このアプローチは常に非特権のコンテナで動作します。

<div class="alert alert-danger">
<strong>注</strong>: Valgrind を介して実行されるアプリケーションは、ネイティブで実行される場合に比べて極めて遅くなります。この方法は、本番ではない環境で使用することをお勧めします。
</div>

お使いのパッケージマネージャーで Valgrind をインストールします。アプリケーションを Valgrind で実行し、いくつかのリクエストを生成します。

CLI アプリケーションの場合は、次を実行します。
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
When running `php-fpm` run:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
When using Apache, run:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

結果として得られる Valgrind のトレースは、デフォルトでは標準エラーに出力されますが、[公式ドキュメント][16]に従って別のターゲットに出力することもできます。想定される出力は、PHP-FPM プロセスの場合、以下の例のようになります。

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### strace の取得

外的要因によって問題が引き起こされる場合もあるため、このような場合に `strace` は貴重な情報源となります。

<div class="alert alert-danger">
<strong>注</strong>: <code>strace</code> を介して実行されるアプリケーションは、ネイティブで実行される場合に比べて極めて遅くなります。この方法は、本番ではない環境で使用することをお勧めします。
</div>

お使いのパッケージマネージャーで `strace` をインストールしてください。Datadog サポートに送信する `strace` を生成する際には、`-f` オプションを使用して子プロセスを追跡します。

For a CLI application, run:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

`php-fpm` の場合は、次を実行します。
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Apache の場合は、次を実行します。
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /ja/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://app.datadoghq.com/apm/services
[6]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[7]: /ja/tracing/setup/nginx/#nginx-and-fastcgi
[8]: /ja/tracing/profiler/enabling/php/
[9]: https://github.com/mind04/mod-ruid2
[10]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[11]: https://packages.sury.org/php/
[12]: https://wiki.debian.org/HowToGetABacktrace
[13]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[14]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[15]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[16]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment