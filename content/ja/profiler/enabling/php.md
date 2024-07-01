---
aliases:
- /ja/tracing/profiler/enabling/php/
code_lang: php
code_lang_weight: 70
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: profiler/profiler_troubleshooting/php
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: PHP プロファイラーの有効化
type: multi-code-lang
---

## 要件

Datadog Profiler を使用するには、64 ビットの Linux で、少なくとも PHP 7.1 が必要です。

以下は、**非対応**です。
- PHP ZTS ビルド
- PHP デバッグビルド
- Fibers (PHP 8.1+)

{{< tabs >}}
{{% tab "GNU C Linux" %}}

glibc 2.17 以降を搭載した OS が必要です。以下のバージョン以降がこの要件を満たしています。
  - CentOS 7
  - EOL (End of Life) を迎えた Debian 8
  - EOL となった Ubuntu 14.04

Datadog では、EOL ではない OS のバージョンを実行することを推奨しています。

{{% /tab %}}
{{% tab "Alpine Linux" %}}

プロファイラーは musl v1.2 に対してビルドされているため、Alpine Linux のバージョン 3.13 以降が必要です。

また、次のコマンドを使用して `libgcc_s` をインストールする必要があります。

```shell
apk add libgcc
```

{{% /tab %}}
{{< /tabs >}}

以下のプロファイリング機能は、`dd-trace-php` ライブラリの以下の最小バージョンで利用可能です。

|      機能         | 必要な `dd-trace-php` のバージョン          |
|----------------------|-----------------------------------------|
| [Code Hotspots][12]        | 0.71+                       |
| [Endpoint Profiling][13]            | 0.79.0+                       |

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][2] 以降にアップグレードしてください。

2. [GitHub リリースページ][3]から `datadog-setup.php` スクリプトをダウンロードします。バージョン 0.69.0 は、このインストーラーを含む最初のトレーサーのリリースです。

3. トレーサーとプロファイラーの両方をインストールするために、例えば `php datadog-setup.php --enable-profiling` のようにインストーラーを実行します。このスクリプトは対話型で、検出された PHP の位置のどれにインストールするかを尋ねます。スクリプトの最後には、今後の使用のために非対話型バージョンのコマンド引数を出力します。

   {{< tabs >}}
{{% tab "CLI" %}}

PHP を呼び出す前に環境変数を設定します。例:

```
# DD_PROFILING_ENABLED は バージョン 0.82.0 以上では不要です。
export DD_PROFILING_ENABLED=true

export DD_SERVICE=app-name
export DD_ENV=prod
export DD_VERSION=1.3.2

php hello.php
```

{{% /tab %}}
{{% tab "PHP-FPM" %}}

php-fpm の `www.conf` ファイルの `env` ディレクティブを使用します。次に例を示します。

```
; DD_PROFILING_ENABLED は バージョン 0.82.0 以上では不要です。
env[DD_PROFILING_ENABLED] = true

env[DD_SERVICE] = app-name
env[DD_ENV] = prod
env[DD_VERSION] = 1.3.2
```

{{% /tab %}}
{{% tab "Apache" %}}

サーバー構成、バーチャルホスト、ディレクトリ、または `.htaccess` ファイルから `SetEnv` を使用します。

```
# DD_PROFILING_ENABLED は バージョン 0.82.0 以上では不要です。
SetEnv DD_PROFILING_ENABLED true

SetEnv DD_SERVICE app-name
SetEnv DD_ENV prod
SetEnv DD_VERSION 1.3.2
```

{{% /tab %}}
{{< /tabs >}}

その他の環境変数については、[構成ドキュメント][4]を参照してください。

4. リクエストを受け取ってから 1～2 分後、[APM > Profiler ページ][5]にプロファイルが表示されます。

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /ja/tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /ja/getting_started/profiler/
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints