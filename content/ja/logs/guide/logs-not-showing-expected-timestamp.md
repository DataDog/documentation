---
aliases:
- /ja/logs/faq/why-do-my-logs-not-have-the-expected-timestamp
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: よくあるご質問
  text: ログのパースに関する問題を調査する方法
title: ログに期待されたタイムスタンプが表示されない
---

デフォルトでは、Datadog intake API によってログが受信されると、タイムスタンプが生成され、日付属性として付加されます。しかし、このデフォルトのタイムスタンプは、ログ自体に含まれる可能性のある実際のタイムスタンプを常に反映するわけではありません。このガイドでは、実際のタイムスタンプでデフォルトのタイムスタンプをオーバーライドする方法について説明します。

{{< img src="logs/guide/log_timestamp_1.png" alt="メッセージのタイムスタンプと異なるログのタイムスタンプを表示するログパネル" style="width:70%;">}}

## 表示されるタイムスタンプ

ログのタイムスタンプは、ログパネルのトップセクションにあります。タイムスタンプは UTC で保存され、ユーザーのローカルタイムゾーンで表示されます。上記のスクリーンショットでは、ローカルプロファイルが `UTC+1` に設定されているため、ログを受信した時刻は `11:06:16.807 UTC` となります。

タイムゾーンが正しく設定されていないため、タイムスタンプが期待通りの値を示さない場合があります。[Personal Settings > Preferences][1] の **Time zone** セクションで確認できます。

タイムゾーンが正しい場合、メッセージからタイムスタンプを抽出し、表示されているログのタイムスタンプをオーバーライドします。

## 生ログ

Datadog で生ログが期待したタイムスタンプを表示していない場合、生ログから正しいログタイムスタンプを[抽出](#extract-the-timestamp-value-with-a-parser)して、それを[リマップ](#define-a-log-date-remapper)します。

#### パーサーでタイムスタンプ値を抽出する

1. [ログパイプライン][2] に移動し、ログを処理するパイプラインをクリックします。
2. **Add Processor** をクリックします。
3. プロセッサーの種類で **Grok Parser** を選択します。
4. [date() matcher][3] を使って日付を抽出し、それをカスタムの日付属性に渡します。詳細は以下の例と[日付のパース例][4]を参照してください。

このようなログの例では

```
2017-12-13 11:01:03 EST | INFO | (tagger.go:80 in Init) | starting the tagging system
```

以下のようなパースルールを追加します。

```
MyParsingRule %{date("yyyy-MM-dd HH:mm:ss z"):date} \| %{word:severity} \| \(%{notSpace:logger.name}:%{integer:logger.line}[^)]*\) \|.*
``` 

`MyParsingRule` の抽出の出力:

```
{
  "date": 1513180863000,
  "logger": {
    "line": 80,
    "name": "tagger.go"
  },
  "severity": "INFO"
}
```

`date` 属性には `mytimestamp` 値が格納されます。

#### ログ日付リマッパーを定義する

[ログ日付リマッパー][5]を追加して、`date` 属性の値が現在のログのタイムスタンプをオーバーライドするようにします。

1. [ログパイプライン][2]に移動し、ログを処理するパイプラインをクリックします。
2. **Add Processor** をクリックします。
3. プロセッサーの種類で **Date remapper** を選択します。
4. プロセッサーの名前を入力します。
5. Set date attribute(s) セクションに **date** を追加します。
6. **作成**をクリックします。

`06:01:03 EST` (`11:01:03 UTC` に相当) に生成された以下のログは、12:01:03 (この場合、表示タイムゾーンは UTC+1) と正しく表示されます。

{{< img src="logs/guide/log_timestamp_5.png" alt="正しいタイムスタンプを表示するログパネル" style="width:70%;" >}}

**注**: すべての処理は取り込み時に行われるため、パイプラインの変更は新しいログにのみ影響します。

## JSON ログ

JSON ログは Datadog で自動的にパースされます。ログの `date` 属性は[予約属性][6]なので、JSON ログのための前処理操作を通過します。

下記の例では、ログの実際のタイムスタンプは `mytimestamp` 属性の値であり、ログのタイムスタンプ `Dec 13, 2017 at 14:16:45.158` ではありません。

{{< img src="logs/guide/log_timestamp_6.png" alt="メッセージ内の mytimestamp 属性値と異なるログタイムスタンプを表示するログパネル" style="width:50%;">}}

### サポートされている日付形式

`mytimestamp` 属性の値が、現在表示されているログのタイムスタンプをオーバーライドするようにするには、それを日付属性として追加する必要があります。

1. [ログパイプライン][2]に移動します。
2. Preprocessing for JSON Logs にカーソルを合わせ、鉛筆のアイコンをクリックします。
3. 日付属性のリストに `mytimestamp` を追加します。日付リマッパーは予約された各属性をリストの順番に探します。日付が `mytimestamp` 属性に由来していることを確認するために、リストの最初に置きます。
4. **保存**をクリックします。

リマップが機能するためには、特定の日付形式に従う必要があります。認識されている日付形式は [ISO8601][7]、[UNIX (ミリ秒 EPOCH 形式)][8]、[RFC3164][9] です。

別の日付形式を使用する場合は、[カスタム日付形式](#custom-date-format)を参照してください。

**注**: すべての処理は取り込み時に行われるため、パイプラインの変更は新しいログにのみ影響します。

### カスタム日付形式

リマッパーがデフォルトでサポートしていない日付形式は、[Grok パーサー][5]を使ってパースした後、サポートされている形式に変換することができます。

1. ログを処理している[パイプライン][2]に移動します。これらのログ用にまだパイプラインが構成されていない場合、そのパイプラインを新規に作成します。
2. **Add Processor** をクリックします。
3. プロセッサーの種類で **Grok Parser** を選択します。
4. 日付形式に基づいたパースルールを定義します。詳しくは、こちらの[日付のパース例][4]をご覧ください。
5. Advanced Settings セクションで、`mytimestamp` を `Extract from` セクションに追加して、このパーサーがカスタムの `mytimestamp` 属性にのみ適用されるようにします。
6. **作成**をクリックします。
7. [ログ日付リマッパー][5]を追加して、新しいログに正しいタイムスタンプをマッピングします。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /ja/logs/log_configuration/parsing
[4]: /ja/logs/log_configuration/parsing/#parsing-dates
[5]: /ja/logs/log_configuration/processors/?tabs=ui#log-date-remapper
[6]: /ja/logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt