---
description: 自動化された推奨事項を確認し、ボリュームの多いログパターンを除外、サンプリング、またはメトリクスに変換して、ログボリュームを最適化します。
further_reading:
- link: logs/log_configuration/indexes/#exclusion-filters
  tag: ドキュメント
  text: 除外フィルター
- link: logs/log_configuration/logs_to_metrics/
  tag: ドキュメント
  text: Logs to Metrics
title: Log Optimizer
---
## 概要 {#overview}

Log Optimizer は、大量の反復データやノイズの多いデータを生成するログパターンを特定するのに役立ちます。Datadog はインデックス化されたログを分析し、ログの除外、サンプリング、メトリクスへの変換などのアクションを推奨するため、ログボリュームを最適化し、トラブルシューティングや分析との関連性が最も高い情報に集中できます。

この機能は [Logging without Limits™][1] を基に作成されており、[除外フィルター][2]や [Logs to Metrics][3] などのツールを補完します。

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_main.png" alt="Datadog の Log Optimizer ランディングページで、ログボリュームとノイズを削減するための推奨事項を表示します。" style="width:100%;" >}}

## 仕組み {#how-it-works}

Datadog は、**インデックス化された**ログを継続的にレビューして、大量のデータや反復的なデータを生成するパターンを検出します。Log Optimizer は 1 日に 1 回、これらのパターンを Datadog のベストプラクティスと照らし合わせて評価し、最適化が有効である可能性のあるログを特定します。

続けて Log Optimizer は、重要なイベントの可視性を失うことなくノイズを削減できるように、アクション (デバッグレベルのメッセージの除外、ルーチンログのサンプリング、静的メッセージのメトリクスへの変換など) を提案します。

<div class="alert alert-danger">Log Optimizer は、既存の除外フィルターやログのメトリクスへの変換を考慮しません。重複を避けるために、新しいアクションを適用する前に設定を確認してください。</div>

### Datadog の分析対象 {#what-datadog-analyzes}

* **インデックス化されたログ:** この分析は、標準および Flex インデックスに保存されたログが対象です。
* **高ボリュームパターン:** Datadog は、合計ログボリュームの大部分を占めるパターンを検出します。
* **メッセージの一貫性とコンテンツ:** 繰り返しが多い、またはばらつきの少ないメッセージを含むログは、最適化の候補として評価されます。たとえば、ログメッセージに操作が成功したこと (「process executed successfully」(プロセスは正常に実行されました) など) が示されている場合、Log Optimizer はノイズを減らすためにそれらのログを除外することを推奨します。
* **プラットフォーム全体での使用状況の監視:** Datadog は、推奨されるパターンをアクティブなモニターのリストと照らし合わせて確認し、ログが使用されている場所を表示します。

### 推奨アクション {#recommended-actions}

各推奨事項には、説明と推奨されるアクションが含まれています。

| 推奨事項 | 説明 | 典型的な例 |
| :---- | :---- | :---- |
| {{< ui >}}Exclude{{< /ui >}} (除外) | ノイズを増やし、重要なシグナルへの集中を妨げるログのインデックス化を停止します。| デバッグレベルのメッセージまたは冗長なシステム出力。|
| {{< ui >}}Sample{{< /ui >}} (サンプル) | 可視性を損なうことなくノイズを削減するために、反復的なログの割合を下げます。| ほとんど変化のないログ (タイムスタンプや ID などのフィールドのみが変更されている場合) |
| {{< ui >}}Convert to metric{{< /ui >}} (メトリクスへの変換) | 繰り返されるログをメトリクスに置き換えて、一定期間における件数や傾向を追跡します。| 常に同じメッセージやステータスを表示するログ。|

## 推奨事項を確認して適用する {#review-and-apply-recommendations}

[[{{< ui >}}Log Optimizer{{< /ui >}}]][4] ページに移動して、ログパターン、サンプルメッセージ、ボリュームデータ、および各推奨事項の平易な言葉を使った説明を表示します。

推奨事項を適用するには、次のようにします。

1. 推奨事項をクリックしてサイドパネルを開きます。
2. アクションボタン ([{{< ui >}}Exclude Logs{{< /ui >}}] (ログの除外)、[{{< ui >}}Sample Logs{{< /ui >}}] (ログのサンプリング)、または [{{< ui >}}Create Metric{{< /ui >}}] (メトリクスの作成)) をクリックします。

変更は即座に構成に反映されます。ただし、[Log Optimizer] ページは次回の日次分析が実行されるまで更新されないため、推奨事項が一時的に表示され続ける場合があります。

さらに、チケットを作成して、組織内の他のチームとのレビューを開始します。Jira チケットを開くか、Datadog Work Management でワークアイテムを作成します。対処済みの推奨事項は解決済みとしてマークし、推奨事項フィードで非表示にします。

{{% collapse-content title="ケーススタディ: Log Optimizer を使用して重複するログデータを除外する" level="h3" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="アクションとパターンの詳細が表示されている Log Optimizer の推奨事項サイドパネル" style="width:100%;" >}}

[{{< ui >}}Log Optimizer{{< /ui >}}]ページを確認すると、`shopist-support` サービスに高ボリュームパターンがあることがわかります。「Verifying ticket」(チケットの検証) というメッセージが、複数のホストで 1 日に 130 万回以上表示されています。

Datadog はこれを変化のない反復的なパターンとして検出し、これをメトリクスに変換してログをインデックス化の対象から除外することを推奨します。推奨事項を確認し、これらのログが反復的であることを確認した上で、[{{< ui >}}Recommendation{{< /ui >}}] (推奨事項) サイドパネルから直接除外を適用します。

同じサービスの重大なエラーログは引き続き表示されるため、監視可能性を損なうことなく重要なシグナルに集中できます。次回の日次分析後、更新された構成にインデックス化されたボリュームの削減が示されます。
{{% /collapse-content %}}

## 適用された変更を追跡する {#track-applied-changes}

推奨事項を適用すると、ログから除外フィルターまたはメトリクスが作成されます。そのフィルターやメトリクスの定義を確認、変更、または削除するには、対応するページに移動してください。

* **除外フィルター**: [[{{< ui >}}Logs Indexes{{< /ui >}}] (ログインデックス)][5] ページ
* **ログからメトリクスへの変換**: [[{{< ui >}}Metrics Configuration{{< /ui >}}] (メトリクス構成)][6] ページ

これらの構成は、それぞれのページからいつでも編集または削除できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/logging_without_limits/
[2]: /ja/logs/indexes/#exclusion-filters
[3]: /ja/logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer
[5]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: https://app.datadoghq.com/logs/pipelines/generate-metrics