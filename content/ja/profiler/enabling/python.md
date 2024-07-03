---
aliases:
- /ja/tracing/profiler/enabling/python/
code_lang: python
code_lang_weight: 20
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Getting Started with Profiler
- link: profiler/profile_visualizations
  tag: Documentation
  text: Learn more about available profile visualizations
- link: profiler/profiler_troubleshooting/python
  tag: Documentation
  text: Fix problems you encounter while using the profiler
title: Enabling the Python Profiler
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][14]をお読みください。

The Datadog Profiler requires Python 2.7+.

The following profiling features are available depending on your Python version. For more details, read [Profile Types][8]:

|      機能         | サポート対象の Python バージョン          |
|----------------------|------------------------------------|
| Wall Time プロファイリング  | Python 2.7 以降                      |
| CPU タイムプロファイリング   | POSIX プラットフォームの Python 2.7 以降   |
| 例外プロファイリング  | POSIX プラットフォームの Python 3.7 以降   |
| ロックプロファイリング       | Python 2.7 以降                      |
| メモリプロファイリング     | Python 3.5 以降                      |

インストールには pip バージョン 18 以上が必要です。

以下のプロファイリング機能は、`dd-trace-py` ライブラリの以下の最小バージョンで利用可能です。

| 機能                  | 必要な `dd-trace-py` のバージョン |
|--------------------------|--------------------------------|
| [Code Hotspots][12]      | 0.44.0 以降                        |
| [Endpoint Profiling][13] | 0.54.0 以降                        |

## インストール

Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

トレーシングとプロファイリング機能の双方を提供する `ddtrace` をインストールします。

```shell
pip install ddtrace
```

**注**: プロファイリングには `ddtrace` ライブラリのバージョン 0.40+ が必要です。

`ddtrace` のバイナリディストリビューションに対応していないプラットフォームを使用している場合は、まず開発環境をインストールしてください。

たとえば、Alpine Linux では以下を実行します。
```shell
apk install gcc musl-dev linux-headers
```

## 使用方法

コードを自動的にプロファイリングするには、`ddtrace-run` を使用する際に、`DD_PROFILING_ENABLED` 環境変数を `true` に設定します。

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

より高度な使い方については、[構成](#configuration)を参照してください。

Optionally, set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][5].

プロファイラーのライフサイクルを手動で制御するには、`ddtrace.profiling.Profiler` オブジェクトを使用します。

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # 指定しない場合は、環境変数 DD_ENV にフォールバックします
    service="my-web-app",  # 指定しない場合は、環境変数 DD_SERVICE にフォールバックします
    version="1.0.3",   # 指定しない場合は、環境変数 DD_VERSION にフォールバックします
)
prof.start()  # できるだけ早く、例えば他のインポートの前に、すべてのプロファイルを確保する必要があります
```

## 注意事項

プロセスが `os.fork` を使ってフォークするとき、プロファイラーは子プロセスで起動される必要があります。Python 3.7+ では、これは自動的に行われます。Python &lt; 3.7 では、子プロセスで新しいプロファイラーを手動で開始する必要があります。

```python
# ddtrace-run ユーザーの場合は、子プロセスでこれを呼び出します
ddtrace.profiling.auto.start_profiler()  # できるだけ早く、例えば他のインポートより前に、すべてのプロファイルを確保する必要があります

# また、手動でインスツルメンテーションを行う場合は、
# 子プロセスに新しいプロファイラーを作成します。
from ddtrace.profiling import Profiler

prof = Profiler(...)
prof.start()  # できるだけ早く、例えば他のインポートより前に、すべてのプロファイルを確保する必要があります
```

## 構成

You can configure the profiler using the [environment variables][6].

### コードプロベナンス

Python プロファイラーはコードプロベナンスレポートをサポートしており、コードを実行しているライブラリについての洞察を得ることができます。この機能はデフォルトでは無効になっていますが、`DD_PROFILING_ENABLE_CODE_PROVENANCE=1` を設定することで有効にすることができます。

## 次のステップ

[プロファイラーの概要][7]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /ja/integrations/guide/source-code-integration/?tab=python
[5]: https://app.datadoghq.com/profiling
[6]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[7]: /ja/getting_started/profiler/
[8]: /ja/profiler/profile_types/?code-lang=python
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /ja/profiler/enabling/supported_versions/