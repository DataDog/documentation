---
algolia:
  tags:
  - logs processors
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
aliases:
- /ja/logs/processing/processors/
description: Datadog Log Management でプロセッサーを使用してログをパース、拡充、および構造化します。
further_reading:
- link: /logs/log_configuration/pipelines
  tag: よくあるご質問
  text: Datadog パイプラインの検出
- link: /logs/logging_without_limits/
  tag: よくあるご質問
  text: Logging without Limits*
- link: /logs/explorer/
  tag: よくあるご質問
  text: ログの調査方法
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: ビデオ
  text: 'ヒントとコツ: 小売エンドポイントからログにビジネスデータを追加'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインの構築と管理
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: ラーニングセンター
  text: インテグレーションパイプラインですぐに使えるログの処理
title: プロセッサー
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているプロセッサーは、クラウドベースのログ環境に特化しています。オンプレミスのログをパース、構造化、拡充するには、<a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a> を参照してください。</div>

プロセッサーは [パイプライン][1] の中で実行され、データ構造化アクションを完了し、ログを豊かにする属性を生成します。

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="プロセッサー" style="width:100%" >}}

[ログコンフィギュレーション設定][1] で、[Grok パーサー][3] や [日付リマッパー][4] などのプロセッサーを構成して、属性を抽出、作成、再マッピングし、ログを拡充してファセット検索を拡張することができます。

**注**:

- 構造化ログは有効な形式で送信する必要があります。構造にパースに無効な文字が含まれている場合は、[mask_sequences][2] 機能を使用して、これらを Agent レベルで削除する必要があります。

- ベストプラクティスとして、パイプラインごとのプロセッサー数は最大 20 で使用することが推奨されます。

## プロセッサーの種類 {#processor-types}

{{< whatsnext desc="プロセッサーを選択すると、詳細が表示されます。">}}
    {{< nextlink href="logs/log_configuration/processors/arithmetic_processor">}}<strong>算術演算プロセッサー</strong>: 既存の数値属性に適用された式の結果を持つ新しい属性をログに追加します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/array_processor">}}<strong>配列プロセッサー</strong>: ログ内の JSON 配列から値を抽出、集計、または変換します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/remapper">}}<strong>属性リマッパー</strong>: ソース属性またはタグを別のターゲット属性またはタグに再マッピングします。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/category_processor">}}<strong>カテゴリープロセッサー</strong>: グループ化および分類を行うために、検索クエリの一致に基づく新しい属性をログに追加します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/decoder_processor">}}<strong>デコーダープロセッサー</strong>: バイナリからテキストにエンコードされたフィールド (Base64 や Hex など) を元の表現に変換します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/geoip_parser">}}<strong>GeoIP パーサー</strong>: IP アドレス属性から大陸、国、行政区、または都市情報を抽出します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/grok_parser">}}<strong>Grok パーサー</strong>: ログメッセージや特定の属性からデータを抽出し、構造化するためのカスタムパースルールを作成します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_date_remapper">}}<strong>ログ日付リマッパー</strong>: ログの公式タイムスタンプとして 1 つ以上の属性を割り当てます。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_message_remapper">}}<strong>ログメッセージリマッパー</strong>: ログの公式メッセージとして 1 つ以上の属性を割り当てます。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_status_remapper">}}<strong>ログステータスリマッパー</strong>: ログの公式な重大度ステータスとして 1 つ以上の属性を割り当てます。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/lookup_processor">}}<strong>ルックアッププロセッサー</strong>: ログをリファレンステーブルまたはマッピングテーブルから人間が読める値にマッピングします。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/ocsf_processor">}}<strong>OCSF プロセッサー</strong>: セキュリティログを OCSF (Open Cybersecurity Schema Framework) に正規化します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/service_remapper">}}<strong>サービスリマッパー</strong>: ログの公式サービスとして 1 つ以上の属性を割り当てます。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/span_remapper">}}<strong>スパンリマッパー</strong>: アプリケーションスパンとログの関連付けを定義します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/string_builder_processor">}}<strong>ストリングビルダープロセッサー</strong>: 既存の属性および生の文字列のテンプレートから新しい属性を作成します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/threat_intel_processor">}}<strong>脅威インテリジェンスプロセッサー</strong>: IoC (Indicator of Compromise) テーブルと照合して、脅威インテリジェンス属性でログを拡充します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/trace_remapper">}}<strong>トレースリマッパー</strong>: アプリケーショントレースとログの関連付けを定義します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/url_parser">}}<strong>URL パーサー</strong>: URL 属性からクエリパラメーターやその他のコンポーネントを抽出します。{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/user_agent_parser">}}<strong>ユーザーエージェントパーサー</strong>: ユーザーエージェント属性をパースして、OS、ブラウザ、デバイス、その他のユーザーデータを抽出します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/pipelines/
[2]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /ja/logs/log_configuration/processors/grok_parser/
[4]: /ja/logs/log_configuration/processors/log_date_remapper/