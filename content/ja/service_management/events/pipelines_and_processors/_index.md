---
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
title: パイプラインとプロセッサー
---

## 概要 

Datadog Event Management Pipelines は、さまざまなソースから取得したイベントを効率的に処理・管理するための機能です。パイプラインを利用することで、多様な処理ルールやフィルターを適用し、イベントの取り扱い方を柔軟にカスタマイズできます。これにより、大量の受信イベントを体系的に整理し、管理することが容易になります。

パイプラインを活用することで、以下のことが可能になります。
- **イベントの強化**: タグ付け、カスタム属性の追加、関連するメタデータとの相関付けなどを行うことで、イベントにさらなる文脈情報を付与し、より有益かつ行動しやすいものへと導きます。
- **イベントタグの正規化**: ルールを設定してタグを再マッピングすることで、すべてのイベントが標準化されたタグを持つようにします。
- **メッセージや属性をタグとしてパース**: カスタム Grok ルールを用いて、生のイベント全体のメッセージや特定の属性をパースし、調査時に参照可能な追跡型のタグや属性へと変換します。

Datadog Event Management Pipelines を活用すれば、組織はモニタリングプロセスを簡素化し、オペレーショナルなインサイトをより明確にし、最終的にはインシデントやアラートへの対応をより効果的に行えるようになります。

## 仕組み

パイプラインでは、イベントをプロセッサーで連続的に処理することで、半構造化テキストから意味のある情報や属性を抽出・付加します。パイプラインを経由する各イベントは、すべてのパイプラインフィルターで評価され、フィルター条件に一致した場合、そのパイプラインに含まれるすべてのプロセッサーが順番に適用されてから、次のパイプラインへと処理が移ります。

パイプラインとプロセッサーは、すべてのイベントに適用でき、[Event Management Pipelines][1] で構成が可能です。

## パイプラインを作成

特定のソースやタグなど、関心のあるイベントを抽出するパイプラインを作成します。

1. Datadog の [Event Management Pipelines][1] に移動します。
1. **Add a Pipeline** をクリックします。
1. ドロップダウンメニューからフィルターを選択するか、[Event Management Explorer][2] の `</>` アイコンから独自のフィルタークエリを作成します。このフィルターによって、パイプライン内のプロセッサーが特定のイベントに適用されます。**注**: パイプラインフィルターはパイプライン内のプロセッサー適用前に実行されるため、パイプラインで抽出した属性をフィルター条件として使用することはできません。
1. パイプラインに名称を付けます。
1. **Create** をクリックします。

## プロセッサーの追加

パイプライン作成後、以下のプロセッサーを追加できます。

- [Arithmetic Processor][3]
- [Date Remapper][4]
- [Category Processor][5]
- [Grok Parser][6]
- [Lookup Processor][7]
- [Remapper][8]
- [Service Remapper][9]
- [Status Remapper][10]
- [String Builder Processor][11]


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /ja/service_management/events/pipelines_and_processors/arithmetic_processor
[4]: /ja/service_management/events/pipelines_and_processors/date_remapper
[5]: /ja/service_management/events/pipelines_and_processors/category_processor
[6]: /ja/service_management/events/pipelines_and_processors/grok_parser
[7]: /ja/service_management/events/pipelines_and_processors/lookup_processor
[8]: /ja/service_management/events/pipelines_and_processors/remapper
[9]: /ja/service_management/events/pipelines_and_processors/service_remapper
[10]: /ja/service_management/events/pipelines_and_processors/status_remapper
[11]: /ja/service_management/events/pipelines_and_processors/string_builder_processor