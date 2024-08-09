---
aliases:
- /ja/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: ドキュメント
  text: カスタムの重大度値を公式のログステータスに再マップする方法について説明します。
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースについて
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: ドキュメント
  text: ログのパースに関する問題を調査する方法
title: ログが警告やエラーの情報ステータスを表示する
---

## 概要

デフォルトでは、Datadog の Intake API がログを受信すると、`INFO` ステータスが生成され、`status` 属性として自身を追加します。

{{< img src="logs/guide/original_log.png" alt="ログパネルに情報ステータスのログが表示され、メッセージは警告を表示しています。" style="width:50%;">}}

このデフォルトの `status` は、ログ自体に含まれる実際のステータスを必ずしも反映しているとは限りません。このガイドでは、実際のステータスでデフォルト値をオーバーライドする方法を説明します。

## 生ログ

Datadog で生ログが正しいステータスを表示していない場合、生ログから正しいログステータスを[抽出](#extract-the-status-value-with-a-parser)して、それを正しいステータスに[リマップ](#define-a-log-status-remapper)します。

### パーサーでステータス値を抽出する

Grok パーサーを利用して、[`word()` マッチャー][1]でルールを定義し、実際のログのステータスを抽出します。

1. [Logs Pipelines][2] に移動し、ログを処理するパイプラインをクリックします。
2. **Add Processor** をクリックします。
3. プロセッサーの種類で **Grok Parser** を選択します。
4. [`word()` マッチャー][1]を使用してステータスを抽出し、それをカスタムの `log_status` 属性に渡します。

例えば、ログは次のようになります。

```
WARNING: John disconnected on 09/26/2017
```

以下のようなルールを追加します。

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

`MyParsingRule` の抽出の出力:

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### ログステータスリマッパーを定義する

`log_status` 属性は正しいステータスを含んでいます。[ログステータスリマッパーを追加][3]して、`log_status` 属性のステータス値がデフォルトのログステータスをオーバーライドすることを確認します。

1. [Logs Pipelines][2] に移動し、ログを処理するパイプラインをクリックします。
2. **Add Processor** をクリックします。
3. プロセッサーの種類で Status remapper を選択します。
4. プロセッサーの名前を入力します。
5. Set status attribute(s) セクションに **log_status** を追加します。
6. **作成**をクリックします。

{{< img src="logs/guide/log_post_processing.png" alt="重大度属性の値が警告に一致するステータスを持つログを表示するログパネル" style="width:50%;">}}

パイプラインの修正は、すべての処理が取り込みプロセスで行われるため、新しいログにのみ影響します。

## JSON ログ

JSON ログは Datadog で自動的にパースされます。ログの `status` 属性は[予約属性][4]なので、JSON ログのための前処理操作を通過します。

この例では、ログの実際のステータスは、デフォルトの `INFO` ログステータスではなく、`logger_severity` 属性の値です。

{{< img src="logs/guide/new_log.png" alt="ログパネルに情報ステータスのログが表示されるが、logger_severity 属性の値はエラーである" style="width:50%;">}}

`logger_severity` 属性の値がデフォルトのログステータスをオーバーライドするようにするには、`logger_severity` をステータス属性のリストに追加します。

1. [Logs Pipelines][2] に移動し、ログを処理するパイプラインをクリックします。
2. Preprocessing for JSON Logs にカーソルを合わせ、鉛筆のアイコンをクリックします。
3. ステータス属性のリストに `logger_severity` を追加します。ステータスリマッパーは予約されたすべての属性をリストの順番に探します。ステータスが `logger_severity` 属性に由来していることを確認するために、リストの最初に置きます。
4. **保存**をクリックします。

{{< img src="logs/guide/new_log_remapped.png" alt="logger_severity 属性の値がエラーに一致するステータスを持つログを表示するログパネル" style="width:50%;">}}

パイプラインの修正は、すべての処理が取り込みプロセスで行われるため、新しいログにのみ影響します。新しいログは `logger_severity` 属性値で正しく構成されます。

リマップが機能するためには、[プロセッサードキュメント][3]で指定されているステータスフォーマットを遵守する必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /ja/logs/log_configuration/processors/#log-status-remapper
[4]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes