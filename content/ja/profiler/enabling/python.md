---
aliases:
- /ja/tracing/profiler/enabling/python/
code_lang: python
code_lang_weight: 20
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: profiler/profiler_troubleshooting/python
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: Python プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

Datadog Profiler には Python 2.7+ と Agent バージョン [7.20.2][2] 以降または [6.20.2][3] 以降が必要です。

以下のプロファイリング機能は、お使いの Python のバージョンに応じて利用可能です。詳しくは、[プロファイルタイプ][7]をお読みください。

|      機能         | サポート対象の Python バージョン          |
|----------------------|------------------------------------|
| Wall Time プロファイリング  | Python 2.7 以降                      |
| CPU タイムプロファイリング   | POSIX プラットフォームの Python 2.7 以降   |
| 例外プロファイリング  | POSIX プラットフォームの Python 3.7 以降   |
| ロックプロファイリング       | Python 2.7 以降                      |
| メモリプロファイリング     | Python 3.5 以降                      |

インストールには pip バージョン 18 以上が必要です。

以下のプロファイリング機能は、`dd-trace-py` ライブラリの以下の最小バージョンで利用可能です。

|      機能         | 必要な `dd-trace-py` のバージョン          |
|----------------------|-----------------------------------------|
| [Code Hotspots][12]        | 0.44.0 以降                       |
| [エンドポイントプロファイリング][13]            | 0.54.0 以降                       |

## インストール

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

数分後、[Datadog APM > Profiler ページ][4]でプロファイルを視覚化します。

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

## コンフィギュレーション

[環境変数][5]を使用してプロファイラーを構成できます。

### コードプロベナンス

Python プロファイラーはコードプロベナンスレポートをサポートしており、コードを実行しているライブラリについての洞察を得ることができます。この機能はデフォルトでは無効になっていますが、`DD_PROFILING_ENABLE_CODE_PROVENANCE=1` を設定することで有効にすることができます。

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[6]: /ja/getting_started/profiler/
[7]: /ja/profiler/profile_types/?code-lang=python
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints