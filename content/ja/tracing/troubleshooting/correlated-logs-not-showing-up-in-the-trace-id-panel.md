---
aliases:
- /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
- /ja/tracing/troubleshooting/correlating-logs-not-showing-up-in-the-trace-id-panel/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: ドキュメント
  text: トレースとログの関連付け
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ドキュメント
  text: クロスプロダクト相関で容易にトラブルシューティング
title: 関連するログがトレース ID パネルに表示されない
---

## 概要

[トレース][1]パネルには、トレース、ホスト、および相関ログに関する情報が表示されます。

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="空のログセクションを表示するトレースの詳細画面" style="width:90%;">}}

[トレース][1]に現れるログは 4 種類あります。

- `trace_id`: 対応するトレース ID を持つログを表示します。
- `host`: トレースの時間枠内で、トレースのホストからのログを表示します。
- `container_id`: トレースの時間枠内で、トレースのコンテナからのログを表示します。
- `pod_name`: トレースの時間枠内で、トレースのポッドからのログを表示します。

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="トレースのログドロップダウンメニューにトレース ID とホストオプションが表示されます" style="width:80%;">}}

トレースパネルの **Logs** セクションが空になることがあります。このガイドでは、この問題を解決する方法を説明します。

## インフラストラクチャーオプション

`host`、`container_id`、または `pod_name` オプションの **Log** セクションが空の場合、[Log エクスプローラー][2]に移動し、以下の条件を確認します。

1. トレースを発行したホスト/コンテナ/ポッドからログが送信されている。
2. トレースの時間枠内にそのホストのログがある。
3. ログのタイムスタンプが正しく設定されている。詳しくは、[ログに期待したタイムスタンプが表示されない][3]をご覧ください。

## トレース ID オプション

もし **Log** セクションが `trace_id` オプションに対して空の場合、ログに標準的な `trace_id` 属性があることを確認してください。ログに `trace_id` が含まれていない場合、以下を行うために[トレースとログの相関付け][4]を行ってください。

1. ログ属性に含まれるトレース ID を抽出します。
2. この属性を予約された `trace_id` 属性にリマップします。

   {{< tabs >}}
   {{% tab "JSON ログ" %}}

   JSON ログの場合、ステップ 1、2 は自動で行われます。トレーサーは、[トレース][1]と[スパン][2]の ID をログに注入し、これらは[予約属性リマッパー][3]によって自動的にリマップされます。

   このプロセスが期待通りに動作しない場合、トレース ID を含むログ属性の名前が `dd.trace_id` であることを確認し、その属性が[予約属性][4]の Trace ID セクションに正しく設定されていることを検証してください。

   {{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="Trace Id セクションがハイライトされた JSON ログの前処理ページ" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/tracing/glossary/#spans
[3]: /ja/logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
   {{% /tab %}}
   {{% tab "ログインテグレーションあり" %}}

生のログ (特定の言語の [ログインテグレーション][1]を使ってログを収集している場合) については、`source` 属性に `java`、`python`、`ruby` などの言語を設定します。インテグレーションは、トレースとログを自動的に相関付けます。

この例では、Java インテグレーションパイプラインを紹介します。

   {{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="Trace Id リマッパーがハイライトされた Java ログパイプライン" style="width:90%;">}}

ログのフォーマットがインテグレーションパイプラインによって認識されていない可能性があります。この場合、パイプラインを複製し、[パーストラブルシューティングガイド][2]に従って、パイプラインがログ形式を受け入れることを確認します。

[1]: /ja/logs/log_collection/?tab=application#setup
[2]: /ja/logs/faq/how-to-investigate-a-log-parsing-issue/
   {{% /tab %}}
   {{% tab "カスタム" %}}

ログを収集するためのインテグレーションを使用していない生のログの場合

   1. カスタムパースルールが、次の例のように、[トレース][1]と[スパン][2]の ID を文字列として抽出することを確認してください。

      {{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="サンプルログ、パースルール、抽出セクションでトレース ID がハイライトされたカスタムパーサー" style="width:90%;">}}

   2. そして、抽出した属性に[トレースリマッパー][3]を定義して、ログの公式トレース ID にリマップします。

[1]: /ja/tracing/glossary/#trace
[2]: /ja/tracing/glossary/#spans
[3]: /ja/logs/log_configuration/processors/#trace-remapper
   {{% /tab %}}
   {{< /tabs >}}

ID が正しく挿入され、ログにリマップされると、トレースパネルでトレースと相関のあるログを見ることができます。

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="関連するログを含むログセクションを表示するトレースページ" style="width:90%;">}}

**注**: ログまたは UI のログ属性には、トレース ID およびスパン ID は表示されません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: https://app.datadoghq.com/logs
[3]: /ja/logs/guide/logs-not-showing-expected-timestamp/
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/