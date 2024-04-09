---
aliases:
- /ja/tracing/python/
- /ja/tracing/languages/python/
- /ja/agent/apm/python/
- /ja/tracing/setup/python
- /ja/tracing/setup_overview/python
- /ja/tracing/setup_overview/setup/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: API ドキュメント
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: Python アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件
最新の Python トレーサーは、CPython バージョン 2.7 と 3.5-3.11 に対応しています。

Datadog の Python バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## はじめに

作業を始める前に、[Agent のインストールと構成][13]が済んでいることを確認してください。

### インスツルメンテーション方法の選択

Datadog Agent をデプロイまたはインストールして構成したら、次はアプリケーションをインスツルメンテーションします。アプリが動作するインフラストラクチャー、書かれている言語、必要な構成のレベルに応じて、以下の方法でこれを行うことができます。

サポートされるデプロイシナリオと言語については、次のページを参照してください。

- [インスツルメンテーションライブラリをローカル挿入する][11] (Agent で)。
- [Datadog UI からインスツルメンテーションライブラリを挿入する][12] (ベータ版)、または
- [トレーサーをインストールする](#install-the-tracer)セクションで説明したように、アプリケーションに直接トレーシングライブラリを追加する。[互換性情報][1]を参照してください。

### アプリケーションをインスツルメントする

<div class="alert alert-info">Kubernetes アプリケーションからトレースを収集する場合、以下の説明の代わりに、Cluster Agent Admission Controller を使用してアプリケーションにトレーシングライブラリを挿入することができます。手順については、<a href="/tracing/trace_collection/library_injection_local">Admission Controller を使用したライブラリの挿入</a>をお読みください。</div>

Agent をインストールしたら、Python で記述されたアプリケーションのトレースを開始するには、Datadog トレーシングライブラリ `ddtrace` を、pip を使用してインストールします。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /ja/tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[11]: /ja/tracing/trace_collection/library_injection_local/
[12]: /ja/tracing/trace_collection/library_injection_remote/
[13]: /ja/tracing/trace_collection#install-and-configure-the-agent