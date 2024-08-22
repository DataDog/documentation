---
title: パイプラインとプロセッサー
---

## 概要

Event Management は、パイプラインとプロセッサーを使って、イベントに処理を追加する機能を提供します。


### 一般的な使用例
- CMDB からの追加情報でイベントをリッチ化する
- イベントのタグを標準化する
- イベント内のコンテンツから新しいタグを作成する


### はじめに

まず、関心のあるイベント（例えば、ソースやタグ）にフィルターをかけるためのパイプラインを作成する必要があります。パイプラインを作成したら、次にプロセッサーを追加できます。利用可能なプロセッサーは以下の通りです。

- [算術プロセッサー][1]
- [日付リマッパー][2]
- [カテゴリプロセッサー][3］
- [Grok パーサー][4]
- [ルックアッププロセッサー][5]
- [リマッパー][6]
- [サービスリマッパー][7]
- [ステータスリマッパー][8]
- [ストリングビルダープロセッサー][9]




[1]: /ja/service_management/events/pipelines_and_processors/arithmetic_processor
[2]: /ja/service_management/events/pipelines_and_processors/date_remapper
[3]: /ja/service_management/events/pipelines_and_processors/category_processor
[4]: /ja/service_management/events/pipelines_and_processors/grok_parser
[5]: /ja/service_management/events/pipelines_and_processors/lookup_processor
[6]: /ja/service_management/events/pipelines_and_processors/remapper
[7]: /ja/service_management/events/pipelines_and_processors/service_remapper
[8]: /ja/service_management/events/pipelines_and_processors/status_remapper
[9]: /ja/service_management/events/pipelines_and_processors/string_builder_processor
