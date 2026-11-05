---
aliases:
- /ja/llm_observability/monitoring/metrics/
description: Agent Observability データから生成できる有用なメトリクスについて学びます。
further_reading:
- link: llm_observability/
  tag: ドキュメント
  text: Agent Observability の詳細
- link: monitors/
  tag: ドキュメント
  text: 重要なときにチームに通知するためのモニターの作成および管理
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: ブログ
  text: Datadog LLM Observability を使用した LLM プロンプトの追跡、比較、最適化
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observability で調査します。
title: Agent Observability メトリクス
---
Agent Observability でアプリケーションをインスツルメントした後、ダッシュボードやモニターで使用する Agent Observability メトリクスにアクセスできます。これらのメトリクスは、LLM アプリケーションのスパン数、エラー数、トークン使用量、およびレイテンシーの測定値をキャプチャします。これらのメトリクスは、アプリケーションのトラフィックの 100% に基づいて計算されます。

<div class="alert alert-info">
このページの <code>ml_obs.*</code> エントリは <a href="/metrics/">Datadog メトリクス</a>です。これらは、LLM アプリケーションの各側面の推移を表す数値で、LLM スパン (カウント、コストの分布、トークン、レイテンシー、エラー) から導出されます。サンプリング率は 100% で、標準の <a href="/data_security/data_retention_periods/">Datadog メトリクス保持期間</a> (詳細な粒度で 15 か月) に従っており、他の Datadog メトリクスと同様にダッシュボード、モニター、ノートブックからクエリ可能です。
<br><br>
これらは、Agent Observability の以下の 2 つとは異なります。
<ul>
<li><strong>スパンごとの運用データ</strong> (個々のトレースまたはスパンのコスト、トークン、レイテンシー、エラー): これらのメトリクスが集計される元の生の値です。スパンと共に保存され、<a href="/llm_observability/data_governance/#traces-and-spans">Agent Observability のトレース保持期間</a>に従い、メトリクスとしてではなくトレース エクスプローラーからクエリされます。</li>
<li><strong><a href="/llm_observability/investigate/evaluations/">評価スコア</a></strong> (“evals”とも呼ばれます): 個々のスパンや実験行に付加された品質および安全性の判断 (例: ハルシネーション、忠実性、カスタム LLM-as-a-judge など)。これらは運用テレメトリに由来するものではなく、Datadog メトリクスの保持期間ではなく、<a href="/llm_observability/data_governance/">Agent Observability のトレースおよび実験の保持期間</a>に従います。</li>
</ul>
</div>

<div class="alert alert-info">スパンに設定されたその他のタグは、Agent Observability メトリクスのタグとしては使用できません。</div>

### スパンメトリクス {#span-metrics}

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.span` | スパンの種類ごとのスパンの合計数 | カウント | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`span_kind`、`version` |
| `ml_obs.span.duration` | スパンの合計期間 (秒) | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`span_kind`、`version` |
| `ml_obs.span.error` | スパン内で発生したエラーの数 | カウント | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`span_kind`、`version` |

### LLM トークンメトリクス {#llm-token-metrics}

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | LLM に送信された入力のトークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.output.tokens` | 出力のトークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.tokens` | 出力の推論トークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.prompt.tokens` | プロンプトで使用されたトークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.completion.tokens` | スパン中に補完として生成されたトークン | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.total.tokens` | スパン中に消費された合計トークン数 (入力 + 出力 + プロンプト) | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.tokens` | LLM スパン内でプロンプトキャッシュに書き込まれた入力トークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.tokens` | LLM スパン内でプロンプトキャッシュから提供された入力トークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.tokens` | LLM スパン内でプロンプトキャッシュとやり取りしなかった入力トークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.characters` | LLM に送信された入力の文字数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.output.characters` | 出力の文字数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |

### 埋め込みメトリクス {#embedding-metrics}

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | 埋め込みの生成に使用された入力トークン数 | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`matched_model_name`、`matched_model_provider` |

### LLM コストメトリクス {#llm-cost-metrics}

<div class="alert alert-info">
Agent Observability の推定コストメトリクスの単位は<strong>ナノドル</strong>です。
</div>

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | LLM スパンにおける推定入力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.embedding.input.cost` | 埋め込みスパンにおける推定入力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.cost` | LLM スパンにおける推定推論出力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.output.cost` | LLM スパンにおける推定出力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.total.cost` | LLM または埋め込みのスパンにおける推定合計コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.cost` | LLM スパンにおける推定キャッシュ書き込み入力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.cost` | LLM スパンにおける推定キャッシュ読み取り入力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.cost` | LLM スパンにおける推定非キャッシュ入力コスト | 分布 | `env`、`error`、`ml_app`、`model_name`、`model_provider`、`service`、`version`、`source`、`matched_model_name`、`matched_model_provider` |

### トレースメトリクス {#trace-metrics}

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | トレース数 | カウント | `env`、`error`、`ml_app`、`service`、`span_kind`、`version` |
| `ml_obs.trace.duration` | すべてのスパンにわたる全トレースの合計期間 | 分布 | `env`、`error`、`ml_app`、`service`、`span_kind`、`version` |
| `ml_obs.trace.error` | トレース中に発生したエラー数 | カウント | `env`、`error`、`ml_app`、`service`、`span_kind`、`version` |

### 推定使用量メトリクス {#estimated-usage-metrics}

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.input.tokens` | 推定入力トークン使用数 | 分布 | `evaluation_name`、`ml_app`、`model_name`、`model_provider`、`model_server` |

### 非推奨メトリクス {#deprecated-metrics}

<div class="alert alert-warning">
以下のメトリクスは非推奨であり、後方互換性のためにのみ維持されています。Datadog では、すべてのトークン使用量測定ユースケースにおいて、非推奨ではないトークンメトリクスを使用することを強く推奨しています。
</div>

| メトリクス名 | 説明 | メトリクスタイプ | タグ |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.output.tokens` | 推定出力トークン生成数 | 分布 | `evaluation_name`、`ml_app`、`model_name`、`model_provider`、`model_server` |
| `ml_obs.estimated_usage.llm.total.tokens` | 推定合計トークン使用数 (入力 + 出力) | 分布 | `evaluation_name`、`ml_app`、`model_name`、`model_provider`、`model_server` |

## 次のステップ {#next-steps}

{{< whatsnext desc="Agent Observability メトリクスを活用します。" >}}
    {{< nextlink href="dashboards/" >}}Agent Observability メトリクスの追跡と関連付けのためのダッシュボードを作成する{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}アラートと通知のためのモニターを作成する{{< /nextlink >}}
{{< /whatsnext >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}