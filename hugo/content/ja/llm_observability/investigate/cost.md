---
aliases:
- /ja/llm_observability/monitoring/cost/
description: LLM のトークンとコストを監視します。
title: コスト
---
{{< img src="llm_observability/ao_cost_overview.png" alt="Agent Observability におけるコストの概要。" style="width:100%;" >}}

Agent Observability は、プロバイダーの公開価格モデルと LLM/埋め込みスパンに注釈付けされたトークン数を使用して、各 LLM リクエストの推定コストを自動的に計算します。

この情報をトレースおよびアプリケーション全体で集計することで、LLM モデルのユーザーパターンと、それが全体的な支出に与える影響についての洞察を得ることができます。

ユースケース:
- モデル、リクエスト、アプリケーションの各レベルで、LLM の支出元を確認および把握する
- トークン使用量とコストの経時的な変化を追跡し、将来の高額請求を未然に防ぐ
- LLM コストを、アプリケーション全体のパフォーマンス、モデルバージョン、モデルプロバイダー、プロンプトの詳細と関連付けて単一の画面に表示する

## コスト監視の設定 {#setting-up-cost-monitoring}

Datadog では、LLM コストを監視するために 2 つの方法を提供しています。
- [自動](#automatic): [サポートされている LLM プロバイダーの](#supported-providers)公開価格レートを使用します。
- [手動](#manual): カスタム価格レート、セルフホストモデル、またはサポートされていないプロバイダーの場合は、独自のコスト値を手動で指定します。

### 自動 {#automatic}
LLM リクエストに[リストされているサポート対象プロバイダー](#supported-providers)が含まれている場合、Datadog は以下に基づいて各リクエストのコストを自動的に計算します。

- [自動インスツルメンテーション][1] またはユーザーによる手動アノテーションのいずれかによって提供される、LLM/埋め込みスパンに付加されたトークン数
- モデルプロバイダーの公開価格レート

### 手動 {#manual}
コスト情報を手動で指定するには、[SDK リファレンス][2] または [API][3] で説明されているインスツルメンテーションの手順に従ってください。コストを手動で設定する場合 (例: `total_cost` の設定)、単位はドルである必要があります。ただし、保存される単位はナノドルとなります。

<div class="alert alert-info">コスト情報の一部を提供した場合、Datadog は不足している情報の推定を試みます。たとえば、合計コストを指定したものの、入力/出力コストの値を指定しなかった場合、Datadog はプロバイダーの価格情報と、スパンに注釈付けされたトークン値を使用して、入力/出力コストの値を計算します。これにより、手動で提供した合計コストと、Datadog が計算した入力/出力コストの合計との間に不一致が生じる可能性があります。これらの値が異なる場合でも、常に Datadog は提供された合計コストをそのまま表示します。</div>

#### トークン数の計算方法 {#how-token-counts-are-calculated}
トークン使用量フィールドには、以下の関係が適用されます。
{{< img src="llm_observability/llm_token_relationships.png" alt="Agent Observability がトークン数を計算する方法を示す図: total_tokens は input_tokens と output_tokens の合計です。input_tokens は non_cached_input_tokens、cache_read_input_tokens、および cache_write_input_tokens の合計です。reasoning_output_tokens は output_tokens のサブセットです。" style="width:100%;" >}}

トークンフィールドのすべてのサブコンポーネントが提供されている場合、Datadog は親トークンフィールドを自動的に計算するため、それを別個に送信する必要はありません。

たとえば、次のようになります。
- `input_tokens` は、`non_cached_input_tokens`、`cache_read_input_tokens`、および `cache_write_input_tokens` から算出できます
- `total_tokens` は、input_tokens と output_tokens から算出できます

キャッシュの使用状況に関する情報が利用可能な場合は、常にキャッシュトークンの内訳をすべて提供することを Datadog では推奨しています。Datadog は、キャッシュされた入力コストを計算する際、プロバイダー固有のキャッシュ読み取りおよびキャッシュ書き込みの料金レートを自動的に適用します。

`input_tokens` のみが提供されている場合、Datadog はすべての入力トークンを非キャッシュ入力トークンとして扱います。キャッシュの内訳を部分的にのみ提供すると、トークン数が不正確になったり、コストに不一致が生じたりする可能性があります。

## サポートされているプロバイダー {#supported-providers}
Datadog は、以下のサポートされているプロバイダーに対して行われた LLM リクエストのコストを、各公式ドキュメントで公開されている価格情報を使用して自動的に計算します。

Datadog は、OpenAI、Hugging Face、Gemini、Anthropic から OpenRouter によって提供されるモデルまで、[800 種類以上のモデル][4]の推定コストをサポートしています。

## メトリクス {#metrics}

利用可能なコストメトリクスとトークンメトリクスについては、[Agent Observability メトリクス][5]を参照してください。推定コストメトリクスは**ナノドル**単位で測定され、トークンメトリクスは**トークン**単位で測定されます。

コストメトリクスには、値の発生元を示す `source` タグが含まれています。
- `source:auto` — 自動的に計算されます
- `source:user` — 手動で提供されます

### コストとトークンの内訳{#cost-and-token-breakdowns}

`ml_obs.span.llm.cost` および `ml_obs.span.llm.tokens` は、以下のタグでコストとトークンの使用量を分割するカウントメトリクスです。コストには、LLM スパンと埋め込みスパン、およびユーザーが提供するツールスパンコストが含まれます。トークンの使用量には、LLM スパンのみが含まれます。埋め込みトークンの使用量については、`ml_obs.span.embedding.input.tokens` を使用してください。

OpenAI Realtime トークンの内訳を自動的に取得するには、Python では `ddtrace` 4.17.0以降が必要です。Node.js では、`dd-trace` 6.25.0以降 (v6) または 5.136.0 以降 (v5) を使用してください。サポートされているインテグレーションについては、[マルチモーダルインスツルメンテーション][11]を参照してください。

プロバイダーのツール料金とは、LLM スパンにおける Web 検索などの組み込みツールの料金のことです。ユーザーが提供するツールスパンのコストとは、ツールスパンに対して手動で指定するコストのことです。

| タグ | 値 | 説明 |
|-----|--------|-------------|
| `io_type` | `input`、`output`、`unknown` |  入力または出力の寄与。|
| `input_type` | `non_cached`、`cache_read`、`cache_write`、`unknown` | 入力値のキャッシュカテゴリ。その他の方向については省略されます。|
| `output_type` | `reasoning`、`non_reasoning`、`unknown` | データからカテゴリを判別できる場合の、出力値の推論カテゴリ。トークン以外のツール料金では、このタグは省略されます。|
| `token_modality` | `text`、`audio`、`image`、`unknown`、`other` | トークンのモダリティ。`other` は、プロバイダーのツール料金やユーザーが指定するツールスパンコストなど、トークン以外のコスト寄与にのみ適用されます。|
| `ttl` | `5m`、`1h` | その内訳が利用可能なキャッシュ書き込みの有効期間。その他の寄与では省略されます。|

該当する内訳タグについて、詳細が利用できない場合は `unknown` を使用します。`unknown` という値は、使用量がゼロであることを意味するものではありません。たとえば、プロバイダーからキャッシュ使用量が報告されない場合、入力トークンは `input_type:unknown` とタグ付けされます。キャッシュまたは推論の使用量を個々のモダリティに割り当てることができない場合、値は既知のカテゴリを維持し、`token_modality:unknown` を使用します。

### 合計メトリクスと内訳メトリクスのいずれかを選択する{#choose-between-total-and-breakdown-metrics}

スパンごとの統計には合計メトリクスを使用し、カテゴリ間の使用量を比較するには内訳メトリクスを使用します。

#### スパンごとの合計を分析する{#analyze-totals-per-span}

スパンごとの平均値とパーセンタイルを算出するには、`ml_obs.span.llm.total.cost` 分布と `ml_obs.span.llm.total.tokens` 分布を使用します。各分布は、該当するスパンごとに 1 つの合計観測結果を記録します。合計コストには、LLM スパンと埋め込みスパン、およびユーザーが提供するツールスパンコストが含まれます。合計トークンには、LLM スパンのみが含まれます。

たとえば、スパンごとの平均コストと平均トークン使用量をグラフ化します。

```text
avg:ml_obs.span.llm.total.cost{ml_app:my-app}
avg:ml_obs.span.llm.total.tokens{ml_app:my-app}
```

#### カテゴリ別に使用量を分析する{#analyze-usage-by-category}

カテゴリ間のコストとトークン使用量を比較するには、`ml_obs.span.llm.cost` と `ml_obs.span.llm.tokens` を使用します。寄与を集計するには、`sum` と `.as_count()` を使用します。これらのメトリクスでは、スパンごとの平均値やパーセンタイルは提供されません。

たとえば以下のクエリは、入力または出力とモダリティ別のコスト、およびキャッシュカテゴリとモダリティ別の入力トークンをグラフ化します。

```text
sum:ml_obs.span.llm.cost{ml_app:my-app} by {io_type,token_modality}.as_count()
sum:ml_obs.span.llm.tokens{ml_app:my-app,io_type:input} by {input_type,token_modality}.as_count()
```

有効な合計コストまたはトークン数を持つスパンの場合、その内訳値の合計は合計値と一致します。コストまたはトークンの合計が利用できない場合、内訳メトリクスは利用可能な入力値または出力値を保持します。対応する合計分布には観測結果が記録されません。

合計を計算する際に内訳メトリクスを対応する `.total.*` メトリクスに加算しないでください。これは、同じ使用量が二重にカウントされてしまうためです。

## コストおよびトークンメトリクスに関するカスタムタグ {#custom-tags-on-cost-and-tokens-metrics}

Datadog の LLM コストおよびトークンメトリクスには、`model_name`、`model_provider`、`ml_app` などの OOTB タグが付属しています。チーム、顧客層、機能など、アプリケーション固有の属性ごとに LLM の支出を内訳表示するには、スパンタグのサブセットを、生成されたコストおよびトークンメトリクスのカスタムタグとして昇格させることができます。

<div class="alert alert-info">カスタムタグは LLM <strong>コスト</strong> (<code>ml_obs.span.* cost</code>) および <strong>トークン</strong> (<code>ml_obs.span.* tokens</code>) メトリクスにのみ適用されます。その他のスパンメトリクス (例: <code>ml_obs.span.duration</code>) は影響を受けません。</div>

### 仕組み {#how-it-works}

1. SDK の `tags` パラメーター (または自動インスツルメンテーション) を使用して、支出の内訳を確認したい属性で LLM スパンにタグ付けします
2. 同じアノテーション内で、キーを `cost_tags` (Python) または `costTags` (Node.js) パラメーターに渡すことで、それらのタグキーのうちどれをコストメトリクスに反映させるかを指定します。インスツルメンテーションの完全な構文とタイミングルールについては、[SDK リファレンス][7]を参照してください
3. 反映されると、それらのタグキーは LLM コストおよびトークンメトリクスのタグとして表示されます。これらのメトリクスを使用する Datadog のあらゆる場所 (ダッシュボード、モニター、ノートブック、トレース検索など) で、それらを使用できます

<div class="alert alert-warning">値が限定的なタグのみを構成してください (例: <code>team</code>、<code>customer_tier</code>、または <code>feature</code>)。値が限定的でない、またはカーディナリティが高いタグ (ユーザー ID やリクエスト ID など) は完全にはサポートされておらず、結果として生成されるメトリクスでは値が切り詰められたり、タグが省略されたりする可能性があります。</div>

### ユースケース: アプリケーション属性で支出をフィルタリングおよびグループ化する {#use-case-filter-and-group-spend-by-an-application-attribute}

カスタムタグを使用して、OOTB メトリクスタグに含まれていない属性ごとに、支出を内訳表示します。`ml_obs.span.llm.total.cost` を `team` でグループ化したダッシュボードウィジェットを作成して、どのチームの LLM 使用量が時間の経過とともに消費を押し上げているかを確認し、同じクエリにメトリクスモニターを構成して、使用量がしきい値を超えたときに各チーム (または顧客層、機能、環境) について、個別にアラートを送信します。

### ユースケース: プロンプトキャッシングの有効性を追跡する {#use-case-track-prompt-caching-effectiveness}

多くの LLM プロバイダーは、繰り返し処理を減らすために、再利用されたプロンプトプレフィックスをキャッシュします。"prompt_version" や "prompt_template_id" などのプロンプト識別子でスパンにタグ付けし、それらのタグで内訳を表示することで、以下のことが可能になります。

- プロンプトのバリアントを、プロバイダーのキャッシュをどれだけ効果的に再利用しているかで比較できます。たとえば、以下の式を使用してキャッシュヒット率を追跡します: `ml_obs.span.llm.input.cache_read.tokens / ml_obs.span.llm.input.cache_write.tokens` 
- キャッシュにデータを格納するものの、そのキャッシュをめったに再利用しないプロンプトを特定できます。これは通常、プレフィックスが不安定であるか、無効化が過度に行われていることの兆候です
- プレフィックスが短すぎてキャッシュの対象外となるか、呼び出しのたびに変わるために、まったくキャッシュされないプロンプトを見つけられます。
- トークンメトリクスに現れるキャッシュ性能の低下について、コスト増加につながる前にアラートを送信できます。

{{< img src="llm_observability/cost_tags_cache.png" alt="カスタムの prompt_version タグでグループ化された、キャッシュ読み取り、キャッシュ書き込み、およびキャッシュされていない入力トークンを比較するダッシュボード。" style="width:100%;" >}}

## Agent Observability でコストを表示する {#view-costs-in-agent-observability}
Agent Observability で、左側のナビゲーションから [{{< ui >}}Cost{{< /ui >}}] (コスト) を選択し、_Cost Overview_ を開きます。このページでは、選択した期間におけるすべての LLM アプリケーション、プロバイダー、モデル全体での推定 AI 利用料金が表示されます。

Cost Overview には以下が含まれます。
- [{{< ui >}}Spend breakdown{{< /ui >}}] (支出内訳): {{< ui >}}Total Estimated Spend{{< /ui >}} (推定支出合計) のサンキー図 (前期間との比較)。[{{< ui >}}By app{{< /ui >}}] (アプリケーション別)、[{{< ui >}}By provider{{< /ui >}}] (プロバイダー別)、または [{{< ui >}}Custom Tags{{< /ui >}}] (カスタムタグ) を選択して、どのアプリケーション、プロバイダー、または[カスタムタグ](#custom-tags-on-cost-and-tokens-metrics)が利用料金を占めているかを分析します。各エントリには、利用金額、合計利用金額に占める割合、および前期間からの変化が表示されます。
- {{< ui >}}Cost Savings Opportunity{{< /ui >}} (コスト節約の機会): プロバイダーのプロンプトキャッシュを使用していないプロンプトなど、利用料金を削減するための具体的な方法を特定する [インサイト][8]。各インサイトには、影響を受けるアプリケーションと推定削減額が記載されています。[フロンティアモデルサイジング][9]では、低コストモデルでの試行を優先するために、プレミアムモデルへの支出に焦点が当てられます。
- [{{< ui >}}Cost Trend{{< /ui >}}] (コストの傾向): 1 つまたはすべてのアプリケーションにわたる利用料金の時系列データ。アプリケーション、サービス、モデル名、モデルプロバイダー、またはカスタムタグでグループ化し、フィルターを追加して結果を絞り込むことができます。
- [{{< ui >}}Wasted Spend{{< /ui >}}] (無駄な支出): アプリケーション別に分類された、失敗した呼び出し、低品質な応答、および [Insights][8] によって検出された問題への支出。Insights により特定された無駄について、該当する検出結果を開き、根本原因、影響を受けたトレース、推奨される修正方法を確認してください。[Insights が無駄な支出を測定する方法][10]をご覧ください。
- [{{< ui >}}Cache Efficiency{{< /ui >}}] (キャッシュ効率): プロンプトキャッシングによる正味の節約額。キャッシュヒット率、キャッシュ再利用率、およびキャッシュされない入力コストも併せて表示されます。正確なキャッシュメトリクスを取得するには、完全な[キャッシュトークンの内訳](#how-token-counts-are-calculated)を提供してください。

単一のアプリケーションのコストを表示するには、Cost Overview のサンキー図でそのアプリケーションをクリックしてください。または、[{{< ui >}}Applications{{< /ui >}}] (アプリケーション) から選択して [{{< ui >}}Cost{{< /ui >}}] (コスト) タブを開いてください。アプリケーションの_コストビュー_には、以下の機能があります。
- {{< ui >}}Filter{{< /ui >}} (フィルター): コストビューを特定の属性に絞り込むためのオプション
- [{{< ui >}}Total Cost (Estimated){{< /ui >}}] (コスト合計 (推定)) および [{{< ui >}}Total Tokens{{< /ui >}}] (トークン合計): 出力、キャッシュされない入力、キャッシュ読み取り入力、キャッシュ書き込み入力、埋め込みトークンなど、トークンタイプ別に分類された概要
- [{{< ui >}}Cost Trend{{< /ui >}}]: モデル、プロバイダー、トークンタイプ、またはカスタムタグごとにグループ化された、期間ごとの支出
- [{{< ui >}}Most Expensive LLM Calls{{< /ui >}}] (最もコストのかかる LLM 呼び出し): 最もコストのかかるリクエストのリスト

{{< img src="llm_observability/cost_tracking_trace_v2.png" alt="トレース詳細におけるコストデータ。" style="width:100%;" >}}

コストデータはアプリケーションのトレースやスパン内でも利用可能であり、リクエスト (トレース) レベルと操作 (スパン) レベルの両方でコストを把握できます。
いすれかのトレースまたはスパンをクリックすると、詳細なサイドパネルビューが開き、トレース全体および個々の LLM 呼び出しごとのコストメトリクスが表示されます。
トレースビューの上部にあるバナーには、推定コストや合計トークン数など、トレース全体の集計されたコスト情報が表示されます。これらの値にカーソルを合わせると、入力および出力のトークン/コストの内訳が表示されます。

個々の LLM スパンを選択すると、その LLM リクエストに固有の同様のコストメトリクスが表示されます。

Traces ページでコスト関連のデータをクエリするには、左側の [{{< ui >}}Cost{{< /ui >}}] (コスト) ファセットを使用してください。

または、以下のスパン属性を直接クエリしてください。
- `@metrics.input_tokens` / `@metrics.estimated_input_cost`
- `@metrics.output_tokens` / `@metrics.estimated_output_cost`
- `@metrics.total_tokens` / `@metrics.estimated_total_cost`
- `@metrics.non_cached_input_tokens` / `@metrics.estimated_non_cached_input_cost`
- `@metrics.cache_read_input_tokens` / `@metrics.estimated_cache_read_input_cost`
- `@metrics.cache_write_input_tokens` / `@metrics.estimated_cache_write_input_cost`
- `@metrics.reasoning_output_tokens` / `@metrics.estimated_reasoning_output_cost`

## LLM コスト監視のトラブルシューティング {#troubleshoot-llm-cost-monitoring}

トレースから LLM コスト値が欠落している場合や不正確に見える場合は、一般的な原因と修正方法について以下のセクションを参照してください。

### トレースに "PARTIAL COST" または "COST UNAVAILABLE" と表示されます {#trace-shows-partial-cost-or-cost-unavailable}

トレース内の各 LLM スパンのコストは個別に算出されます。この警告は、トレース内の 1 つ以上の LLM スパンでコスト見積もりが欠落している場合に表示されます。

- [{{< ui >}}PARTIAL COST{{< /ui >}}]: Datadog はトレース内の一部の LLM スパンのコストを計算しましたが、残りは計算できませんでした。[{{< ui >}}Estimated Cost{{< /ui >}}] (推定コスト) の値は、コストが計算されたスパンのみの合計を反映しています。
- [{{< ui >}}COST UNAVAILABLE{{< /ui >}}]: Datadog はトレース内のどの LLM スパンのコストも計算できませんでした。

警告にカーソルを合わせると、影響を受けるスパンの数、コストが欠落している理由、および影響を受けるスパンの名前が表示されます。理由は以下のいずれかのカテゴリに分類されます。

#### サポートされていないモデルプロバイダー {#unsupported-model-provider}

スパン上の LLM モデルプロバイダーが[サポートされているプロバイダーのリスト](#supported-providers)に含まれていないため、Datadog は適用する公開価格レートを持っていません。

修正方法:
- スパンの `model_provider` が、サポートされているプロバイダー識別子と一致することを確認してください。[サポートされているプロバイダーのリスト](#supported-providers)を参照してください。
- スパンにコスト値を手動で指定してください。[SDK リファレンス][2]または [API][3] を参照してください。

#### サポートされていないモデル名 {#unsupported-model-name}

LLM プロバイダーはサポートされていますが、スパン上の `model_name` がプロバイダーの [価格カタログ][4] のどのエントリとも一致しません。これは通常、モデル名にスペルミスがあるか、モデル名が短縮されているか、または内部エイリアスが使われている場合に発生します。

修正方法:
- スパンの `model_name` を更新して、プロバイダーの [価格カタログ][4] の正式名称と一致させてください。
- サポートされているモデルのプライベートデプロイ版やカスタマイズ版については、スパンにコスト値を手動で指定してください。[SDK リファレンス][2]または [API][3] を参照してください。

#### トークン数の欠落 {#missing-token-counts}

このスパンには `input_tokens` または `output_tokens` のアノテーションがないため、Datadog はコスト計算のためのトークン値を保持していません。(埋め込みスパンの場合、`input_tokens` のみが必要です。)

修正方法:
- [自動インスツルメンテーション][1]の場合、ご利用のプロバイダーと SDK バージョンがサポートされていることを確認してください。
- 手動インスツルメンテーションの場合、スパンに入力トークン数と出力トークン数をアノテーションしてください。[SDK リファレンス][2]または [API][3] を参照してください。

### プロンプトキャッシュが有効な場合にコストが不正確になる {#inaccurate-cost-when-prompt-caching-is-enabled}

スパンに集計値である `input_tokens`と `output_tokens` のみが含まれ、`cache_read_input_tokens`、`cache_write_input_tokens`、または `non_cached_input_tokens` が欠けている場合、Datadog は標準の入力レートを `input_tokens` 全体に適用します。

プロンプトキャッシュをサポートするプロバイダーでは、キャッシュ読み取り、キャッシュ書き込み、およびキャッシュされない入力は、それぞれ異なるレートで課金されます。この内訳がないと、入力コストの計算が不正確になる可能性があります。

修正方法:
- [自動インスツルメンテーション][1]の場合、ご利用のプロバイダーと SDK バージョンがキャッシュ固有のトークン数を出力することを確認してください。
- 手動インスツルメンテーションの場合、`cache_read_input_tokens`、`cache_write_input_tokens`、および `non_cached_input_tokens` を `input_tokens` に加えてアノテーションしてください。[SDK リファレンス][2]または [API][3] を参照してください。

[1]: /ja/llm_observability/instrument/auto_instrumentation
[2]: /ja/llm_observability/instrument/sdk/?tab=python#monitoring-costs
[3]: /ja/llm_observability/instrument/api/#metrics
[4]: https://github.com/pydantic/genai-prices/tree/main?tab=readme-ov-file#providers
[5]: /ja/llm_observability/investigate/metrics/#llm-cost-metrics
[7]: /ja/llm_observability/instrument/sdk/#adding-custom-tags-to-cost-and-tokens-metrics
[8]: /ja/llm_observability/investigate/insights/
[9]: /ja/llm_observability/investigate/insights/#frontier-model-sizing
[10]: /ja/llm_observability/investigate/insights/#wasted-spend
[11]: /ja/llm_observability/instrument/multimodal/#automatic-instrumentation