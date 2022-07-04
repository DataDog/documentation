---
aliases:
- /ja/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: ガイド
  text: カスタムの重大度値を公式のログステータスに再マップする方法について説明します。
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: よくあるご質問
  text: ログのパースに関する問題を調査する方法
kind: ガイド
title: ログが警告やエラーの情報ステータスを表示する
---

Datadog のインテーク API でログを受信すると、デフォルトではステータス (*Info*) が生成され、`status` 属性に付加されます。
しかし、このデフォルトの `status` は、ログ自体に含まれる可能性のある実際の値を必ずしも反映していません。この記事では、このデフォルト値をオーバーライドする方法について説明します。

{{< img src="logs/guide/original_log.png" alt="オリジナルログ" style="width:50%;">}}

## 生ログ

### パーサーでステータス値を抽出する

ログのパースルールを書くときに、特定の属性で `status` を抽出します。

上記のログに対して、`word()` [マッチャー][1]と共に以下のルールを使用してステータスを抽出し、それをカスタムの `log_status` 属性に渡します。

{{< img src="logs/guide/processor.png" alt="プロセッサー" style="width:50%;">}}

### ログステータスリマッパーを定義する

`log_status` 属性は正しいステータスを含んでいます。[ログステータスリマッパーを追加][2]して、`log_status` 属性のステータス値が公式のログステータスをオーバーライドすることを確認します。

{{< img src="logs/guide/source_attribute.png" alt="ソース属性" style="width:50%;">}}

**注**: すべての処理は取り込みプロセスで行われるため、パイプラインの変更は新しいログにのみ影響します。

{{< img src="logs/guide/log_post_processing.png" alt="ログの後処理" style="width:50%;">}}

## JSON ログ

**JSON ログは Datadog で自動的にパースされます**。
ログ `status` 属性は、Datadog の[予約属性][3]の 1 つで、これらの属性を使用する JSON ログは、その値が特別に扱われることを意味します。この場合、ログのステータスを導出するためです。[パイプライン][4]の先頭で、これらの属性のデフォルトリマッピングを変更します。
ログの実際のステータスが `logger_severity` 属性に含まれていると想像してください。

{{< img src="logs/guide/new_log.png" alt="新しいログ" style="width:50%;">}}

この属性値がログステータスをオーバーライドするようにするには、Status 属性のリストにこの属性を追加します。

ステータスリマッパーは予約属性のマッピングで構成された順番に、各予約属性を探します。ステータスが `logger_severity` 属性から派生していることを確認するために、リストの最初に置きます。

{{< img src="logs/guide/reserved_attribute.png" alt="予約属性" style="width:50%;">}}

**注**: すべての処理は取り込み時に行われるため、パイプラインの変更は新しいログにのみ影響します。

再マッピングが機能するためには、遵守しなければならない特定のステータス形式があります。認識されるステータス形式は、[ステータスリマッパーの説明][2]で説明されています。この特定のケースでは、いくつかのホストとサービスの再マッピングを追加することで、新しいログが正しく構成されています。

{{< img src="logs/guide/new_log_remapped.png" alt="新しいログの再マッピング" style="width:50%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/logs/log_configuration/processors/#log-status-remapper
[3]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /ja/logs/log_configuration/pipelines/?tab=date#preprocessing