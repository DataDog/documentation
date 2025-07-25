---
aliases:
- /ja/tracing/python/
- /ja/tracing/languages/python/
- /ja/agent/apm/python/
- /ja/tracing/setup/python
- /ja/tracing/setup_overview/python
- /ja/tracing/setup_overview/setup/python
- /ja/tracing/trace_collection/dd_libraries/python/
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-php
  tag: ソースコード
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: 外部サイト
  text: API ドキュメント
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: tracing/
  tag: ドキュメント
  text: 高度な使用方法
title: Python アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件
Datadog の Python バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## はじめに

作業を始める前に、[Agent のインストールと構成][13]が済んでいることを確認してください。

### アプリケーションをインスツルメントする

Datadog Agent をインストールして構成したら、次はアプリケーションに直接トレーシングライブラリを追加してインスツルメントします。[互換性情報][1]の詳細をお読みください。

Python で記述されたアプリケーションのトレーシングを開始するには、pip を使用して Datadog トレーシング ライブラリ `ddtrace` をインストールします:

```python
pip install ddtrace
```

**注:** このコマンドは pip バージョン `18.0.0` 以上が必要です。Ubuntu、Debian、またはその他のパッケージマネージャーをお使いの場合は、以下のコマンドで pip バージョンを更新してください。

```python
pip install --upgrade pip
```

Python アプリケーションをインスツルメントするには、記載されている `ddtrace-run` コマンドを使用します。これを使用するには、Python エントリーポイントコマンドを `ddtrace-run` でプレフィックスします。

たとえば、アプリケーションが `python app.py` で始まる場合、次のようになります。

```shell
ddtrace-run python app.py
```

セットアップが完了し、アプリケーションでトレーサーを実行したら、`ddtrace-run --info` を実行して、構成が期待通りに動作しているかどうかを確認することができます。このコマンドの出力は、実行中にコード内で行われた構成の変更を反映しないことに注意してください。

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][3]を参照してください。

トレース用の接続は、コードで構成することも可能です。

```python
from ddtrace import tracer

# ネットワークソケット
tracer.configure(
    https=False,
    hostname="custom-hostname",
    port="1234",
)

# Unix ドメインソケットの構成
tracer.configure(
    uds_path="/var/run/datadog/apm.socket",
)
```

統計用の接続は、コードで構成することも可能です。

```python
from ddtrace import tracer

# ネットワークソケット
tracer.configure(
  dogstatsd_url="udp://localhost:8125",
)

# Unix ドメインソケットの構成
tracer.configure(
  dogstatsd_url="unix:///var/run/datadog/dsd.socket",
)
```

### v1 へのアップグレード

ddtrace v1 にアップグレードする場合は、ライブラリドキュメントの[アップグレードガイド][4]と[リリースノート][5]で詳細を確認してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /ja/tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/v1.0.0/release_notes.html
[11]: /ja/tracing/trace_collection/library_injection_local/
[13]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent