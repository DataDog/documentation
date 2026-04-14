---
aliases:
- /ja/tracing/profiler/enabling/php/
code_lang: php
code_lang_weight: 70
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/profile_visualizations
  tag: ドキュメント
  text: 使用可能なプロファイルの視覚化の詳細
- link: profiler/profiler_troubleshooting/php
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
- link: https://www.datadoghq.com/blog/php-exception-profiling/
  tag: ブログ
  text: PHP で例外プロファイリングを行うべき理由
title: PHP プロファイラーの有効化
type: multi-code-lang
---

## 要件

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][14]をお読みください。

Datadog Profiler を使用するには、64 ビットの Linux で、少なくとも PHP 7.1 が必要です。

PHP ZTS ビルドは `dd-trace-php` バージョン 0.99 以降でサポートされていますが、PHP デバッグ ビルドは **サポートされていません**。

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

`dd-trace-php` ライブラリで次のプロファイリング機能を利用するには、以下の最小バージョンが必要です:

|      機能              | 必要な `dd-trace-php` バージョン          |
|---------------------------|------------------------------------------|
| [Code Hotspots][12]       | 0.71+                                    |
| [Endpoint Profiling][13]  | 0.79.0+                                  |
| [タイムライン][15]            | 0.98.0+            |

Continuous Profiler は、AWS Lambda などの一部のサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. Datadog Agent v6 以上がインストールされ、稼働していることを確認してください。Datadog は [Datadog Agent v7+][2] の使用を推奨しています。

2. [GitHub リリースページ][3]から `datadog-setup.php` スクリプトをダウンロードします。バージョン 0.69.0 は、このインストーラーを含む最初のトレーサーのリリースです。

3. トレーサーとプロファイラーの両方をインストールするために、例えば `php datadog-setup.php --enable-profiling` のようにインストーラーを実行します。このスクリプトは対話型で、検出された PHP の位置のどれにインストールするかを尋ねます。スクリプトの最後には、今後の使用のために非対話型バージョンのコマンド引数を出力します。

4. `datadog-setup.php` の config モードを使用してプロファイラを設定します:

    ```
    # `datadog.profiling.enabled` is not required for v0.82.0+.
    php datadog-setup.php config set -d datadog.profiling.enabled=1

    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2

    php hello.php
    ```

    Apache、PHP-FPM などのサーバーは、INI 設定を変更した後に再起動が
必要です。

    詳細な INI 設定については [構成ドキュメント][4] を参照してください。

5. リクエストを受け取ってから 1～2 分後、[APM > Profiler ページ][5]にプロファイルが表示されます。

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /ja/tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /ja/getting_started/profiler/
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /ja/profiler/enabling/supported_versions/
[15]: /ja/profiler/profile_visualizations/#timeline-view