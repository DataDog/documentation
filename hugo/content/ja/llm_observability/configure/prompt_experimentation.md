---
aliases:
- /ja/llm_observability/monitoring/prompt_experimentation/
description: 管理されたプロンプトバージョンを A/B テストで比較し、ガイド付きロールアウトでバージョンをデプロイします。
further_reading:
- link: /llm_observability/configure/prompt_management
  tag: ドキュメント
  text: Prompt Management
- link: /experiments/defining_metrics/
  tag: ドキュメント
  text: 実験メトリクスの作成
- link: /experiments/reading_results/
  tag: ドキュメント
  text: 実験結果の読み取り
title: Prompt Experimentation
---
## 概要 {#overview}

プロンプトの変更をデフォルトにする前に、ライブトラフィックでテストします。**A/B テスト**を使用して、チェックアウトコンバージョンなどの成果に対してバージョンを比較します。**ガイド付きロールアウト** を使用してバージョンを段階的に導入し、Datadog が回帰を検出した場合は一時停止します。

<div class="alert alert-info"><strong>プレビュー:</strong> Prompt Experimentation はプレビューで利用可能です。アクセスをリクエストするには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>またはカスタマーサクセスマネージャーにお問い合わせください。A/B テストとガイド付きロールアウトへのアクセスは個別にリクエストできます。</div>

- **どちらのプロンプトのパフォーマンスが優れていますか?**[A/B テストを実行します](#run-an-ab-test)。
- **変更を段階的に導入するにはどうすればよいですか?**[ガイド付きロールアウトを使用します](#use-a-guarded-rollout)。

## はじめに {#before-you-begin}

少なくとも 2 つのバージョンを持つ管理されたプロンプト、使用する環境にデプロイされたバージョン、および成果を測定する [実験メトリクス][2] が必要です。ワークフローの[権限](#permissions)をチェックしてください。

**権限:** A/B テストには、LLM Observability に加えて、Product Analytics および Feature Flags での権限が必要です。プレビューアクセスでは、これらの権限は付与されません。開始する前に、Datadog 管理者にロールをチェックしてもらってください。

**初めてですか?**いずれかのワークフローを開始する前に、[1 回限りのアプリケーション設定](#set-up-your-application)を完了してください。これには、Python `ddtrace[openfeature]` 4.15.0 以降と、到達可能な Datadog Agent と、プロンプト要求および成果イベントにおける一致するユーザー識別子が必要です。Agentless モードはサポートされていません。

## A/B テストを実行する{#run-an-ab-test}

たとえば、チェックアウトアシスタントの 2 つのバージョンを比較して、どちらがより高いチェックアウトコンバージョン率を生み出すかを確認します。

1. プロンプトを開き、[{{< ui >}}Set up A/B test{{< /ui >}}] をクリックします。
1. 環境を選択し、[{{< ui >}}Create draft & continue{{< /ui >}}] をクリックします。これにより、Product Analytics でテストが開かれます。ドラフトを作成しても、ライブトラフィックには影響しません。
1. プロンプトのバージョン、対象ユーザー、トラフィック分割、および {{< ui >}}Primary metric{{< /ui >}} を選択します。[{{< ui >}}Calculate metrics by{{< /ui >}}] の下で、アプリケーションの `targeting_key` に一致するサブジェクトタイプを選択します。たとえば、ユーザー ID を渡す場合は **ユーザー** を選択します。
1. テストを開始します。{{< ui >}}Flag & Exposures{{< /ui >}} をチェックして割り当てが行われていることを確認し、[結果を比較][12]してください。

プロンプトページの {{< ui >}}A/B tests using this prompt{{< /ui >}} に戻り、結果を開くか、ドラフトを完了します。Product Analytics でテストを構成および終了します。詳細な手順については、[実験の計画と開始][11] を参照してください。

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="プロンプトを使用した A/B テスト。簡潔な回答と詳細な回答を比較する実行中のテスト、そのバージョン、主要指標と対象ユーザー、および [Finish Setup] (セットアップを完了) ボタンがあるドラフトが表示されています。" style="width:100%;" >}}

**勝者を選択しても、自動的にデプロイされるわけではありません。**テストを終了してからプロンプトに戻り、選択したバージョンをデプロイしてください。テストの対象ユーザー以外のユーザーは、引き続きその環境の他の配信ルールに従います。

## ガイド付きロールアウトを使用する{#use-a-guarded-rollout}

たとえば、チェックアウトのコンバージョンを監視しながら、更新されたチェックアウトアシスタントを導入します。デプロイされたバージョンが**ベースライン**となり、新しいバージョンが**候補**となります。環境にデプロイされたバージョンがない場合は、まず直ちに 1 つデプロイしてベースラインを確立してください。

1. 候補バージョンを開き、[{{< ui >}}Deploy Version{{< /ui >}}] をクリックします。
1. {{< ui >}}Deploy to{{< /ui >}} で環境を選択します。
1. [{{< ui >}}Deployment strategy{{< /ui >}}] を展開し、[{{< ui >}}Guarded rollout{{< /ui >}}] を選んで、{{< ui >}}Guardrail metric{{< /ui >}} を 1 つ選択します。
1. {{< ui >}}Inspect metric{{< /ui >}} を使用して定義をチェックし、値が高い方が良いか低い方が良いかを確認します。
1. 提案された変更を確認し、[{{< ui >}}Deploy Version{{< /ui >}}] をクリックしてロールアウトを開始します。

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="[Production] を選択し、ガイド付きロールアウトを有効にし、ガードレールメトリックとしてチェックアウト完了率を選択し、[Inspect metric] リンクを使用して、バージョン 3 のダイアログをデプロイします。" style="width:80%;" >}}

### その進捗状況を追跡します{#follow-its-progress}

プロンプトページで [{{< ui >}}Active rollouts{{< /ui >}}] を開き、候補のエクスポージャーを追跡します。ロールアウトの実行中、エクスポージャーは自動的に増加します。{{< ui >}}Pause{{< /ui >}} を使用して現在の分割を保持し、{{< ui >}}Resume{{< /ui >}} を使用して続行します。

ガードレールが回帰を検出した場合、ロールアウトは {{< ui >}}Needs attention{{< /ui >}} の下で一時停止します。調査するメトリックを開き、次を選択します。

- [{{< ui >}}Resume anyway{{< /ui >}}] で、候補の公開を続行します。
- [{{< ui >}}Stop{{< /ui >}}] で、ロールアウトを終了し、対象トラフィックをベースラインに戻します。

**一時停止しても候補はロールバックされません。**現在のトラフィック分割は、ユーザーが操作を行うまで維持されます。停止は、その環境のロールアウトのみに影響し、他の環境や A/B テストには影響しません。停止後に再開するには、再度バージョンをデプロイします。

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="[Needs Attention] の下にステージングロールアウトが表示され、バージョン 2 への公開が 25% で一時停止しているプロンプトページ。[Checkout Completion Rate] メトリックと、[Resume Anyway] および [Stop] アクションが表示されています。" style="width:100%;" >}}

ロールアウトが完了すると、候補はそのロールアウトの対象となるすべてのトラフィックを受け取り、{{< ui >}}Active rollouts{{< /ui >}} から消えます。他のターゲティングルールによって、異なるバージョンが提供される場合があります。

<div class="alert alert-warning">ガードレールは、利用可能な結果データに依存します。データがまばら、欠落、または不一致である場合、一時停止がトリガーされない可能性があります。完全なエクスポージャーに達したからといって、その候補がより優れている、または安全であるとは限りません。</div>

## アプリケーションをセットアップする {#set-up-your-application}

いずれかのワークフローについて、このセットアップを 1 回完了してください。アプリケーションがすでにプロンプトの割り当てと照合結果を送信している場合は、直接 [A/B テスト](#run-an-ab-test)または[ガイド付きロールアウト](#use-a-guarded-rollout)に進んでください。

### アプリケーションを接続する {#connect-the-application}

1. プロンプト管理の [前提条件][5] を完了してください。
1. サポートされている Python SDK をインストールします。`pip install --upgrade "ddtrace[openfeature]>=4.15.0"`
1. `DD_ENV` を、使用する環境に設定します。
1. アプリケーションが [Datadog Agent][14] に到達できることを確認してください。Prompt Experimentation は Agent 経由で割り当てデータを送信するため、Agentless モード (`DD_LLMOBS_AGENTLESS_ENABLED=1`) は有効にしないでください。

### プロンプトのリクエストと結果を照合する {#match-prompt-requests-to-outcomes}

プロンプトの取得時と結果の記録時には、同じユーザー ID を使用してください。これにより、Datadog はユーザーの結果と受け取ったプロンプトのバージョンを関連付けることができます。

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

`targeting_key` には、空ではない安定した文字列を使用してください。`version` そのものを渡さないでください。環境の割り当てがバイパスされ、実験のエクスポージャーが記録されなくなります。

たとえば、チェックアウトメトリクスで RUM イベントと **ユーザー** サブジェクトタイプを使用している場合は、同じ ID でブラウザユーザーを識別します。

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

RUM は、選択した結果を提供する場合にのみ必要です。その他の結果ソースの場合、またはユーザーではなく組織を比較する場合は、照合する [サブジェクトタイプ][7] を構成してください。結果は、ユーザーがプロンプトバージョンに最初に接触した後に発生したものでなければ、そのバージョンに起因するものとはみなされません。

### 結果メトリクスの選択 {#choose-an-outcome-metric}

[{{< ui >}}Product Analytics{{< /ui >}}] > [{{< ui >}}Experiments{{< /ui >}}] > [{{< ui >}}Metrics{{< /ui >}}][8] の下で、[実験メトリクス][2] を作成または選択してください。Metrics Explorer のメトリクスとモニターは、ここでは選択できません。

たとえば、チェックアウトコンバージョンメトリクスの場合は、[{{< ui >}}Desired metric direction{{< /ui >}}] を [{{< ui >}}Higher is better{{< /ui >}}] に設定します。結果イベントが、プロンプトリクエストと同じユーザー ID を使用していることを確認してください。バージョンを比較したりロールアウトを一時停止したりするためにメトリクスに依存する前に、結果イベントが到着していることを確認してください。

{{< agent-only >}}
**AI エージェントについての注記:** `targeting_key` には、実験のサブジェクトと一致する、アプリケーションの既存の安定したサブジェクト識別子を文字列として使用してください。ID または結果の収集元が不明な場合は、質問してください。結果で RUM を使用する場合を除き、RUM をインストールしないでください。既存のフォールバック、プロンプト変数、プロバイダー、モデル、およびアプリケーションの動作を保持してください。正確なプロンプトバージョンをリクエストしないでください。メトリクスの作成や編集、実験の開始、バージョンのデプロイ、ロールアウトの制御には、明示的なユーザーリクエストが必要です。コードの準備のみを求められた場合は、残りの Datadog UI での手順を報告してください。
{{< /agent-only >}}

## 権限 {#permissions}

[プロンプト管理の前提条件][5] に加えて、ロールには以下が必要です。

| アクション | 必要な権限 |
|--------|---------------------|
| プロンプトから A/B テストを設定する | Product Analytics 実験書き込み |
| ガード付きロールアウトを開始する | LLM Observability 書き込み、および Feature Flags 環境構成読み取り |
| ガード付きロールアウトを一時停止または再開する | Feature Flags 構成書き込み |
| ガード付きロールアウトを停止する | LLM Observability 読み取りおよび書き込み |

Product Analytics で A/B テストを構成および開始するには、[Product Analytics の権限][3] および [Feature Flags の権限][6] を参照してください。環境で承認が必要な場合は、ライブトラフィックを変更する前に Feature Flags で承認をリクエストしてください。

## トラブルシューティング {#troubleshooting}

### テストまたはロールアウトを開始できません {#i-cannot-start-a-test-or-rollout}

- **コントロールが見当たらないか、無効になっています。**関連するプレビューへのアクセス権と[必要な権限](#permissions)を確認してください。A/B テストの設定には、2 つのプロンプトバージョンと、提供構成を読み込める有効な環境も必要です。
- **ガード付きデプロイが拒否されました。**まずベースラインを確立してください。アクティブな全ユーザー実験や強制的なバージョンオーバーライドなど、環境に表示されている競合を解決してから、もう一度試してください。
- **ドラフトは作成できますが、テストの構成や開始はできません。**Datadog 管理者に[Product Analytics の権限][3]と [Feature Flags の権限][6]をチェックし、必要な環境承認も併せて確認してください。テストにプライマリメトリクスが選択されていることを確認してください。

### 割り当てや結果が表示されません{#i-do-not-see-assignments-or-results}

- **フォールバックのみが返されるか、割り当てが欠落しています。** SDK のインストール、`DD_ENV`、Agent の接続性をチェックし、取得時に `version` を指定していないことをチェックしてください。
- **結果が欠落しています。**一致するサブジェクト ID、メトリクスのスコープ、およびイベントがエクスポージャー後に発生していることをチェックしてください。十分なデータが蓄積されるまでお待ちください。[実験診断][13] を参照してください。

### ロールアウトを制御または検査できません{#i-cannot-control-or-inspect-a-rollout}

- **一時停止、再開、または停止が利用できません。** [権限](#permissions)をチェックしてください。停止には、一時停止や再開とは異なる権限が必要です。
- **ステータスを読み込めません。**更新してから、報告されたエラーをチェックするか、Datadog サポートにお問い合わせください。ステータスが利用できないからといって、ロールアウトが停止したわけではありません。

### 再デプロイ中、または複数の環境にデプロイしています{#i-am-deploying-again-or-to-several-environments}

各環境のデプロイ戦略を確認してください。保存されたガード設定がすでに選択されている可能性があります。即時環境は、ロールアウトなしで切り替わります。別のバージョンをデプロイすると、アクティブなロールアウトが置き換えられる可能性があります。確定する前に、置き換えに関する警告を確認してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/experiments/defining_metrics/
[3]: /ja/account_management/rbac/permissions/#product-analytics
[5]: /ja/llm_observability/configure/prompt_management/#prerequisites
[6]: /ja/account_management/rbac/permissions/#feature-flags
[7]: /ja/experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[11]: /ja/experiments/plan_and_launch_experiments/
[12]: /ja/experiments/reading_results/
[13]: /ja/experiments/diagnostics/
[14]: /ja/getting_started/agent/