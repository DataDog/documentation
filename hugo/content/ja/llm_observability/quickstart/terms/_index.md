---
aliases:
- /ja/tracing/llm_observability/core_concepts
- /ja/llm_observability/core_concepts
- /ja/tracing/llm_observability/span_kinds
- /ja/llm_observability/span_kinds
- /ja/llm_observability/terms/
description: Agent Observability の主要な用語と概念 (スパン、トレース、評価など) のリファレンス ガイドです。
further_reading:
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability のセットアップ方法を学ぶ
- link: /llm_observability/investigate/evaluations
  tag: ガイド
  text: Agent Observability の評価オプション
title: Agent Observability の用語と概念
---
## 概要 {#overview}

Agent Observability UI には、会話のパフォーマンスをトラブルシューティングし、製品全体のデータを関連付けるためのツールが多数用意されています。これらを使用して、LLM (大規模言語モデル) の問題を特定し、解決することができます。

| 概念 | 説明 |
|---|---|
| [スパン](#spans) | スパンとは、LLM アプリケーション内で行われる操作を表す作業単位であり、トレースの構成要素です。|
| [トレース](#traces) | トレースは、LLM アプリケーションでのリクエスト処理にかかわる操作を表し、1 つ以上のネストされたスパンで構成されます。ルートスパンはトレース内の最初のスパンであり、トレースの開始と終了を示します。|
| [評価](#evaluations) | 評価は、LLM アプリケーションのパフォーマンスを測定する手法です。たとえば、回答がない場合やトピックの関連性といった品質チェックは、LLM アプリケーションで追跡できる評価の種類です。|

## スパン {#spans}

スパンは、以下の属性で構成されます。

- 名前
- 開始時間と継続時間
- エラーの種類、メッセージ、トレースバック
- LLM のプロンプトや補完などの入力と出力
- メタデータ (例: `temperature`、`max_tokens` などの LLM パラメーター)
- メトリクス (例: `input_tokens` や `output_tokens`)
- タグ

### スパンの種類 {#span-kinds}

Agent Observability では、スパンが実行している作業の種類を定義する、*スパン種別*によってスパンを分類します。これにより、LLM アプリケーションによってどのような操作が実行されているかについて、より詳細な洞察を得ることができます。

Agent Observability は、次のスパン種別をサポートしています。

| 種別      | 内容   | 有効なルートスパンかどうか  | 例 |
|-----------|--------------|--------------|-------------|
| [LLM](#llm-span)      | LLM への呼び出し。| はい | OpenAI GPT-4 などのモデルへの呼び出し。|
| [ワークフロー](#workflow-span)  | LLM の呼び出しやその周辺のコンテキスト操作を含む、あらかじめ決められた操作のシーケンス。| はい | URL を受け取り、ページの要約を返すサービス。これには、ページ取得のためのツール呼び出し、テキスト処理タスク、LLM による要約が含まれます。|
| [Agent](#agent-span)     | 自律エージェントによる一連の決定と操作。通常、ネストされたワークフロー、LLM、ツール、タスク呼び出しで構成されます。| はい | 顧客の質問に答えるチャットボット。
| [ツール](#tool-span)      | LLM が生成した引数で外部プログラムやサービスに呼び出しを行うこと。| いいえ | Web 検索 API や電卓への呼び出し。|
| [タスク](#task-span)      | 外部サービスを呼び出さないスタンドアロンのステップ。| いいえ | データの前処理ステップ。|
| [埋め込み](#embedding-span) | 埋め込みを返すモデルや関数への呼び出し。| いいえ | text-embedding-ada-002 への呼び出し。|
| [取得](#retrieval-span) | 外部のナレッジベースからデータを取得する操作。| いいえ | ベクトルデータベースへの呼び出しで、ランク付けされた文書の配列を返します。|

アプリケーションからスパンを作成する手順およびコード例は、Agent Observability SDK for Python のドキュメントで[スパンのトレース][2]を参照してください。

#### LLM スパン {#llm-span}

LLM スパンは、LLM への呼び出しを表し、入力と出力はテキストで表されます。

トレースには LLM スパンが 1 つ含まれることがあり、その場合は LLM の推論操作を表します。

LLM スパンは通常、子スパンを持たず、LLM への直接呼び出しを表すスタンドアロンの操作です。

#### ワークフロースパン {#workflow-span}

ワークフロースパンは、*静的な*操作のシーケンスを表します。ワークフローを使用して、LLM 呼び出しと、ツール呼び出し、データ取得、その他のタスクなどの呼び出しを補助するコンテキスト依存の操作をグループ化します。

ワークフロースパンの多くは、標準シーケンスで構成されるトレースのルートスパンとなります。たとえば、関数が arXiv の論文リンクを受け取り、要約を返すことができます。このプロセスには、論文を取得するためのツール呼び出し、テキスト処理タスク、および LLM による要約などが含まれます。

ワークフロースパンは、ワークフローシーケンス内の子ステップを表す任意のスパンを子として持つことができます。

#### エージェントスパン {#agent-span}

エージェントスパンは、大規模言語モデルが入力に基づいて操作を決定および実行する、動的な操作のシーケンスを表します。たとえば、エージェントスパンは、[ReAct エージェント][1]によって制御される一連のリーズニングステップを表すことができます。

エージェントスパンは、自律エージェントや推論エージェントを表すトレースのルートスパンとなることがよくあります。

エージェントスパンは、推論エンジンによって制御される子ステップを表す任意のスパンを子として持つことができます。

#### ツールスパン {#tool-span}

ツールスパンは、ワークフローやエージェントにおいて、Web API やデータベースなどの外部プログラムやサービスへの呼び出しを含むスタンドアロンステップを表します。

ツールスパンは通常、子スパンを持たず、ツールの実行を表すスタンドアロン操作です。

#### タスクスパン {#task-span}

タスクスパンは、ワークフローやエージェントにおいて、外部サービスへの呼び出しを伴わないスタンドアロンステップを表します。たとえば、プロンプトを LLM に送信する前のデータ無害化ステップなどです。

タスクスパンは通常、子スパンを持たず、ワークフローやエージェント内のスタンドアロンステップです。

#### 埋め込みスパン {#embedding-span}

埋め込みスパンはツールスパンのサブカテゴリであり、埋め込みを作成するための埋め込みモデルまたは関数へのスタンドアロンの呼び出しを表します。たとえば、埋め込みスパンを使用して、OpenAI の埋め込みエンドポイントへの呼び出しをトレースできます。

埋め込みスパンはタスクスパンを子として持つことができますが、通常は子を持ちません。

#### 取得スパン {#retrieval-span}

取得スパンはツールスパンのサブカテゴリであり、外部のナレッジベースから返されるドキュメントのリストを含むベクトル検索操作を表します。たとえば、取得スパンを使用して、特定のトピックに関するユーザープロンプトを補強する関連ドキュメントを収集するために、ベクトルストアに対する類似性検索をトレースすることができます。

埋め込みスパンと併用することで、取得スパンは、RAG (取得拡張生成) 操作の可視化を提供することができます。

取得スパンは通常、子スパンを持たず、スタンドアロンの取得ステップを表します。

## トレース {#traces}

Agent Observability は、複雑さが異なる LLM アプリケーションの可観測性をサポートします。トレースの構造と複雑さに応じて、Agent Observability の以下の機能を使用できます。

### LLM 推論のモニタリング {#llm-inference-monitoring}

LLM 推論トレースは単一の LLM スパンで構成されます。

{{< img src="llm_observability/llm-observability-llm-span.png" alt="単一の LLM スパン" style="width:100%;" >}}

個々の LLM 推論をトレースすると、Agent Observability の基本機能が有効になり、以下のことが可能になります。

1. LLM 呼び出しへの入力と出力を追跡します。
2. LLM 呼び出しのトークン使用状況、エラーレート、レイテンシーを追跡します。
3. モデルおよびモデルプロバイダー別に重要なメトリクスの内訳を示します。


詳細な例については、LLM 呼び出しの作成とトレース方法を示す [LLM モニタリング Jupyter ノートブック][7]をご覧ください。

SDK は、特定のプロバイダーへの LLM 呼び出しを自動的にキャプチャするための統合機能を提供します。詳細については、[自動インスツルメンテーション][3]を参照してください。サポートされていない LLM プロバイダーを使用している場合は、[アプリケーションを手動でインスツルメンテーション][4]する必要があります。

### LLM ワークフローのモニタリング {#llm-workflow-monitoring}

ワークフロートレースは、ネストされた LLM、タスク、ツール、埋め込み、および取得のスパンを持つルートワークフロースパンで構成されます。

{{< img src="llm_observability/llm-observability-workflow-trace.png" alt="より複雑な LLM ワークフローを可視化するトレース" style="width:100%;" >}}

ほとんどの LLM アプリケーションには、LLM 呼び出しを囲む操作が含まれており、たとえば外部 API へのツール呼び出しや前処理タスクステップなど、アプリケーション全体のパフォーマンスに大きな役割を果たします。

LLM 呼び出しとコンテキストのあるタスクまたはツール操作をワークフロースパンで一緒にトレースすることで、LLM アプリケーションのより詳細な洞察とより全体的なビューを得ることができます。

詳細な例については、ツール呼び出しと LLM への呼び出しを含む複雑で静的な一連のステップを作成し、トレースする方法を示す [LLM モニタリング Jupyter ノートブック][8]、または RAG ワークフローの作成、トレース、評価の方法を説明する [LLM モニタリング Jupyter ノートブック][10]をご覧ください。

### LLM エージェントのモニタリング {#llm-agent-monitoring}

エージェントモニタリングトレースは、ネストされた LLM、タスク、ツール、埋め込み、取得、およびワークフロースパンを持つルートエージェントスパンで構成されています。

{{< img src="llm_observability/llm-observability-agent-trace.png" alt="LLM エージェントを可視化するトレース" style="width:100%;" >}}

LLM アプリケーションに、意思決定などの静的なワークフローでは捕捉できない複雑な自律ロジックが含まれている場合、LLM エージェントを使用している可能性が高いです。エージェントは、ユーザーの入力に応じて複数の異なるワークフローを実行する場合があります。

LLM アプリケーションをインスツルメンテーションして、単一の LLM エージェントによって実行されたすべてのワークフローとコンテキスト操作をエージェントトレースとしてまとめてトレースすることができます。

詳細な例については、ツールを呼び出し、データに基づいて意思決定を行う LLM 搭載のエージェントを作成し、トレースする方法を示す [LLM モニタリング Jupyter ノートブック][9]をご覧ください。

## 評価 {#evaluations}

Agent Observability は、LLM 会話の品質、安全性、有効性を評価するためのマネージド評価および品質チェックを提供します。[評価][11]を使用することで、会話のパフォーマンスを把握し、LLM アプリケーションの応答を強化できます。これにより、ユーザーエクスペリエンスが向上し、価値のある正確な出力が保証されます。

Datadog は、評価のためのさまざまなオプションを提供しています。
- トレースで[マネージド評価][12]を使用する
- Agent Observability に[カスタム評価を送信する][6]
- [NeMo][13] などのフレームワークと統合する

さらに、Datadog の [Sensitive Data Scanner][5] は Agent Observability とネイティブに統合されているため、入力および出力に含まれる機密データを確実にスキャンして削除することができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react-lm.github.io/
[2]: /ja/llm_observability/setup/sdk/?tab=model#tracing-spans
[3]: /ja/llm_observability/setup/auto_instrumentation/
[4]: /ja/llm_observability/setup/?tab=decorators#instrument-your-llm-application
[5]: /ja/security/sensitive_data_scanner/
[6]: /ja/llm_observability/investigate/evaluations/external_evaluations
[7]: https://github.com/DataDog/llm-observability/blob/main/1-llm-span.ipynb
[8]: https://github.com/DataDog/llm-observability/blob/main/2-workflow-span.ipynb
[9]: https://github.com/DataDog/llm-observability/blob/main/3-agent-span.ipynb
[10]: https://github.com/DataDog/llm-observability/blob/main/4-custom-evaluations.ipynb
[11]: /ja/llm_observability/investigate/evaluations/
[12]: /ja/llm_observability/investigate/evaluations/managed_evaluations
[13]: /ja/llm_observability/investigate/evaluations/external_evaluations/nemo