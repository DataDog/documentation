---
aliases:
- /ja/llm_observability/evaluations/end_user_feedback/
- /ja/llm_observability/configure/evaluations/end_user_feedback/
description: エンドユーザーからのフィードバックを Agent Observability に送信し、スパン、トレース、セッション、または外部エンティティに接続します。
further_reading:
- link: /llm_observability/instrument/api/#evaluations-api
  tag: ドキュメント
  text: Evaluations API について学ぶ
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: ドキュメント
  text: 外部評価の送信方法について学ぶ
- link: /llm_observability/investigate/annotation_queues
  tag: ドキュメント
  text: アノテーションキューについて学ぶ
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: ブログ
  text: Datadog Agent Observability を使用してコーディングエージェントから AI アプリをデバッグおよび評価する
title: エンドユーザーフィードバック
---
## 概要 {#overview}

エンドユーザーフィードバックは、Agent Observability で LLM アプリケーションのユーザーからの入力をキャプチャします。例としては、高評価や低評価、ユーザーがエージェントの変更を受け入れたかどうか、回答に関する自由記述のコメントなどがあります。

フィードバックは評価とは異なります。エンドユーザーから送信されたシグナルにフィードバックを使用します。[外部評価][1]は、評価の送信者が考慮されない、独自の評価ロジックによって生成された結果に使用します。[アノテーションキュー][2]は、チームが実行する構造化されたレビューワークフローに使用します。

送信されたフィードバックは、Agent Observability のセッション、トレース、またはスパンを表示する際に表示されます。

## フィードバックを送信する {#submit-feedback}

`event_kind` を `feedback` に設定し、[Evaluations API][3] でフィードバックを送信します。

フィードバックイベントには以下が必要です。

- `event_kind: "feedback"`
- `submitter.id`: フィードバックを送信したユーザーまたはエージェントを識別する
- 次のうち 1 つのみのターゲットフィールド: `span_id`、`trace_id`、`session_id`、または `feedback_join_key`
- `metric_type` と一致する値フィールド

フィードバックイベントに `join_on` を含めることはできません。`eval_scope` が省略された場合、Datadog はターゲットフィールドから推測します。`eval_scope` を指定する場合は、選択されたターゲットと一致する必要があります。

### フィードバックのターゲット {#target-feedback}

| ターゲット | フィールド | 使用する状況 |
|--------|-------|----------|
| スパン | `span_id` | 1 つのスパンにフィードバックを適用する場合。|
| トレース | `trace_id` | トレース全体にフィードバックを適用する場合。|
| セッション | `session_id` | セッション全体にフィードバックを適用する場合。|
| 外部エンティティ | `feedback_join_key` | インシデント ID、レポート ID、タスク ID、リリースチェック ID など、顧客が定義したエンティティにフィードバックを適用する場合。|

### フィードバック結合キーを使用する {#use-a-feedback-join-key}

フィードバックが単一のスパン、トレース、またはセッションに関連付けられていない場合は、`feedback_join_key` を使用します。まず、SDK の[スパンの拡張][4]ワークフローまたは [Spans API][5] を使用して、外部エンティティに関連する `feedback_join_key` タグでスパンを拡張します。次に、同じ `feedback_join_key` を使用してフィードバックを送信します。

## 例 {#examples}

### スパンに対する低評価フィードバックを送信する {#submit-thumbs-down-feedback-for-a-span}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "span_id": "20245611112024561111",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "categorical",
          "label": "thumbs",
          "categorical_value": "down",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

### フィードバック結合キーを使用して自由記述式フィードバックを送信する {#submit-free-text-feedback-with-a-feedback-join-key}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "feedback_join_key": "incident-123",
          "ml_app": "incident-agent",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The investigation missed the customer impact.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

## フィードバックを分析する {#analyze-feedback}

フィードバック用のダッシュボードウィジェットを作成するには、評価の場合と同様にウィジェットを作成し、専用の**フィードバック**データソースを選択します。Trace Explorer でフィードバックによってスパンやトレースを検索およびフィルタリングする方法については、「[フィードバッククエリ][6]」を参照してください。

{{< img src="llm_observability/evaluations/feedback_widget_query.png" alt="フィードバックデータソースが選択されている Datadog ウィジェットエディター。すべてのフィードバックの数が表示されています。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/investigate/evaluations/external_evaluations
[2]: /ja/llm_observability/investigate/annotation_queues
[3]: /ja/llm_observability/instrument/api/#evaluations-api
[4]: /ja/llm_observability/instrument/sdk/?tab=python#enriching-spans
[5]: /ja/llm_observability/instrument/api/?tab=model#spans-api
[6]: /ja/llm_observability/investigate/querying/#feedback-queries