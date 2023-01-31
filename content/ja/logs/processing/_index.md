---
title: 処理
kind: documentation
description: ログエクスプローラーで、ログをパースおよび加工して、有益なファセットとメトリクスを作成します。
aliases:
  - /ja/logs/faq/integration-pipeline-reference
further_reading:
  - link: /logs/processing/pipelines/
    tag: Documentation
    text: Datadog のパイプライン
  - link: /logs/processing/processors/
    tag: Documentation
    text: ログプロセッサー
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Datadog ログ属性命名規則
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
---
## 概要

[ログコンフィギュレーションのページ][1]で、ログの処理方法を制御します。

* [パイプライン][2]は、受信ログの一部を絞り込んで取得し、一連のプロセッサーを順次適用します。
* [プロセッサー][3]は、[パイプライン][2]の内部で実行し、ログに対してデータ構造化アクション ([属性の再マッピング][4]、[Grok パース][5]など) を完了します。

{{< img src="logs/processing/processors/processing_overview.png" alt="処理" >}}

パイプラインおよびプロセッサーは、あらゆるタイプのログに適用できます。ロギングコンフィギュレーションを変更したり、サーバー側の処理ルールに変更をデプロイする必要もありません。すべての処理は、[パイプラインコンフィギュレーションページ][1]で構成できます。

ログの処理戦略を実装すると、オーガニゼーションに[属性命名規則][6]を適用できるというメリットがあります。

## カスタムログ

カスタム処理ルールを定義し、ログ形式をカスタマイズできます。任意のログ構文を使用してすべての属性を抽出し、必要に応じてグローバルな属性や標準的な属性に再マップします。

たとえば、カスタム処理ルールで以下ログを変更できます。

{{< img src="logs/processing/log_pre_processing.png" alt="ログの前処理"  style="width:50%;">}}

以下のように変換できます。

{{< img src="logs/processing/log_post_processing.png" alt="ログの後処理"  style="width:50%;">}}

[パイプラインフィルター][7]を使用して、ログの一部にのみアクションを実行する方法については、[パイプラインに関するドキュメント][2]を参照してください。

利用可能なプロセッサーのリストについては、[プロセッサーに関するドキュメント][3]を参照してください。

パース機能に関する詳細は、[パース][8]の関するドキュメントをご参照ください。[パースのベストプラクティス][9]や[パースのトラブルシューティング][10]のためのガイドもあります。

**注**:

- ログ管理ソリューションを最適にご利用いただくため、Datadog では Grok プロセッサー内でパイプラインごとに最大 20 件のプロセッサーおよび 10 個のパース規則を使用することをおすすめします。

- Datadog はサービスのパフォーマンスに悪影響を与える可能性のあるパース規則、プロセッサー、パイプラインを無効化する権利を有しています。

## パイプラインの処理

パイプライン処理では、受信ログの一部を絞り込んで取得し、それらに一連のプロセッサーを順次適用します。JSON ログおよびインテグレーションパイプラインの処理に関する詳細は、[ログパイプラインに関するドキュメント][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /ja/logs/processing/pipelines/
[3]: /ja/logs/processing/processors/
[4]: /ja/logs/processing/processors/#attribute-remapper
[5]: /ja/logs/processing/processors/#grok-parser
[6]: /ja/logs/processing/attributes_naming_convention/
[7]: /ja/logs/processing/pipelines/#pipeline-filters
[8]: /ja/logs/processing/parsing/
[9]: /ja/logs/faq/log-parsing-best-practice/
[10]: /ja/logs/faq/how-to-investigate-a-log-parsing-issue/
[11]: /ja/logs/processing/pipelines/#special-pipelines