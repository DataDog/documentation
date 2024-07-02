---
title: Tracing Go Applications
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
- /tracing/setup/go
- /tracing/setup_overview/go
- /tracing/setup_overview/setup/go
- /tracing/trace_collection/dd_libraries/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: ソースコード
  text: Source code
- link: "https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: 外部サイト
  text: Package page
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources and traces
---

## 互換性要件

Go トレーサーは、Go `1.18+` と Datadog Agent `>= 5.21.1` が必要です。Datadog の Go バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページを参照してください。

## はじめに

作業を始める前に、[Agent のインストールと構成][5]が済んでいることを確認してください。

### Go インテグレーションを有効にしてスパンを作成する

Datadog には、一連のライブラリとフレームワークをインスツルメントするためにすぐに使用できるサポートを提供する一連の接続可能パッケージがあります。このパッケージのリストは、[互換性要件][1]ページにあります。アプリケーションにこのパッケージをインポートし、各[インテグレーション][1]と併せて掲載されているコンフィギュレーション手順に従ってください。

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][3]を参照してください。

コンフィギュレーションおよび API の使用の詳細については、Datadog の [API ドキュメント][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
