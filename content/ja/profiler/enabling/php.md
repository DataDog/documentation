---
title: Enabling the PHP Profiler
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: getting_started/profiler
      tag: Documentation
      text: Getting Started with Profiler
    - link: profiler/profile_visualizations
      tag: Documentation
      text: Learn more about available profile visualizations
    - link: profiler/profiler_troubleshooting/php
      tag: Documentation
      text: Fix problems you encounter while using the profiler
aliases:
  - /tracing/profiler/enabling/php/
---

## 要件

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][14]をお読みください。

Datadog Profiler を使用するには、64 ビットの Linux で、少なくとも PHP 7.1 が必要です。

PHP ZTS builds are supported since `dd-trace-php` version 0.99+, while PHP debug builds are **not** supported.

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

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

|      機能              | Required `dd-trace-php` version          |
|---------------------------|------------------------------------------|
| [Code Hotspots][12]       | 0.71+                                    |
| [Endpoint Profiling][13]  | 0.79.0+                                  |
| [Timeline][15]            | 0.98.0+ (beta since 0.89.0+)             |

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. [GitHub リリースページ][3]から `datadog-setup.php` スクリプトをダウンロードします。バージョン 0.69.0 は、このインストーラーを含む最初のトレーサーのリリースです。

3. トレーサーとプロファイラーの両方をインストールするために、例えば `php datadog-setup.php --enable-profiling` のようにインストーラーを実行します。このスクリプトは対話型で、検出された PHP の位置のどれにインストールするかを尋ねます。スクリプトの最後には、今後の使用のために非対話型バージョンのコマンド引数を出力します。

4. Configure the profiler using config mode through the `datadog-setup.php`:

    ```
    # `datadog.profiling.enabled` is not required for v0.82.0+.
    php datadog-setup.php config set -d datadog.profiling.enabled=1

    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2

    php hello.php
    ```

    Apache, PHP-FPM and other servers require a restart after changing the INI
settings.

    See the [configuration docs][4] for more INI settings.

5. リクエストを受け取ってから 1～2 分後、[APM > Profiler ページ][5]にプロファイルが表示されます。

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
[15]: /profiler/profile_visualizations/#timeline-view
