---
description: Datadog のツールとインテグレーションを使用して、運用タスクを自動化するカスタム AI エージェントを構築、デプロイします。
further_reading:
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Action Catalog
- link: /actions/workflows/
  tag: ドキュメント
  text: Workflow Automation
- link: /account_management/billing/ai_credits/
  tag: ドキュメント
  text: AI クレジット
- link: /incident_response/case_management/ai/custom_agents/
  tag: ドキュメント
  text: Bits Agent Builder とのワークマネジメント統合
- link: https://www.datadoghq.com/knowledge-center/aiops/ai-agents/
  tag: ナレッジセンター
  text: AI エージェントとは何か、どのように機能するのでしょうか
- link: https://www.datadoghq.com/blog/bits-agent-builder/
  tag: ブログ
  text: 'Bits Agent Builder の紹介: アラート対応と修復のためのエージェントワークフローを構築する'
title: Bits Agent Builder
---
## 概要 {#overview}

Bits Agent Builder を使用すると、Datadog のツールとインテグレーションを活用して運用タスクを自動化するカスタム AI エージェントを作成できます。エージェントは、ログの検索、メトリクスのクエリ、作業項目の作成、メッセージの送信、または [Action Catalog][7] にあるあらゆるアクションの実行が可能です。

静的な自動化には複雑すぎる一方で、人間が行うには反復的すぎる作業をエージェントに処理させます。たとえば、エラーのトリアージ、インシデントへの対応、傾向の分析、問題のエスカレーションなどです。

<div class="alert alert-info">Bits Agent Builder は <a href="/account_management/billing/ai_credits/">AI クレジット</a> を消費します。</div>

{{< img src="/actions/agents/agent-builder-interface.png" alt="指示、モデル、ツール、自動化の設定を表示する Bits Agent Builder エディタ" style="width:100%;" >}}

## エージェントを作成する {#create-an-agent}

[Bits Agent Builder ページ][1] から、**[New Agent]** をクリックします。そこから、3 つの方法でエージェントを作成できます。

- **AI で構築**: エージェントに実行させたい内容を平易な言葉で記述します。Bits Agent Builder が指示を生成し、関連するツールを選択して、エージェントを構成します。
- **Blueprints から開始**: エラーのトリアージ、インシデント対応、セキュリティ分析、DevOps 支援などの一般的なユースケース向けに、構築済みのテンプレートを選択します。Blueprints には、指示、ツール、自動化があらかじめ構成されており、カスタマイズ可能です。
- **ゼロから開始**: エージェントを手動で構成します。指示の記述、モデルの選択、ツールの追加を行います。

{{< img src="/actions/agents/empty-state.png" alt="テキストフィールドと Blueprints のオプションを表示する Bits Agent Builder の新規エージェントインターフェイス" style="width:100%;" >}}

## エージェントの設定 {#configure-your-agent}

### 手順 {#instructions}

手順では、エージェントの実行時に行う処理を指定します。自然言語で記述し、目標、プロセス、および制約事項を説明します。手順を直接編集するか、チャットインターフェイスを使用して調整します。

具体的で、成果を重視した手順を記述します。たとえば、次のようにします。

```
You are an Incident Responder AI assistant specialized in managing
and coordinating incident response activities.

Your role involves:
- Guiding incident response procedures and best practices
- Helping assess incident severity and impact
- Coordinating communication between teams and stakeholders
- Managing incident lifecycle from detection to resolution
- Facilitating post-incident reviews and improvements

During incident response:
1. Use search_datadog_logs to pull recent error logs for the affected service
2. Help classify incident severity (P0/P1/P2/etc.)
3. Guide through incident response runbooks and procedures
4. Assist with stakeholder communication and updates
5. Track action items and follow-up tasks
6. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### モデル {#model}

エージェントの推論に使用する LLM を選択します。モデルによって性能、速度、コストが異なるため、エージェントのワークロードに応じて選択します。[OpenAI の比較ツール][6] および [Anthropic のモデル比較][5] を使用してモデルを比較できます。

### ツール {#tools}

ツールでは、エージェントが実行できるアクションを定義します。[Action Catalog][7] からツールを追加します。エージェントは、構成に追加されたツールのみを使用できます。

追加したツールをクリックして、そのパラメーターをハードコードします。たとえば、Slack ツールを特定のチャンネルに固定したり、ログクエリを特定のサービスに固定したりできます。

[Datadog MCP Server][8] はデフォルトで有効になっています。[カスタム HTTP アクション][12] を使用して、任意の API に接続できます。

### 自動化 {#automations}

[スケジュール][13] に従ってエージェントが自動的に実行されるように設定するか、Datadog の [モニター][14]、[インシデント][15]、または [セキュリティシグナル][16] からトリガーします。これらの自動化には [Workflow Automation][9] を使用します。

## エージェントのテスト {#test-your-agent}

組み込みのチャットインターフェイスを使用して、エージェントをテストします。メッセージを送信し、エージェントの推論を確認して、適切なアクションが実行されることを確認します。チャット履歴はセッション間で保持されます。

## エージェントのオーケストレーション {#agent-orchestration}

**Run Agent** アクションを使用して、[Workflow Automation][9] および [App Builder][10] でエージェントを使用します。これにより、AI の推論をあらゆるワークフローに組み込むことができます。

{{< img src="/actions/agents/run-agent-step.png" alt="ワークフロー内の Run Agent ステップの設定。エージェントの選択、実行手順、会話 ID、出力スキーマの各フィールドを表示" style="width:100%;" >}}

1. [Workflow Automation][9] でワークフローを開くか作成するか、[App Builder][10] でアプリを開くか作成します。
1. アクションカタログから **Run Agent** ステップを追加します。
1. 実行するエージェントを選択します。
1. **Run Instructions** を記述します。これは、エージェントが実行されるたびに受け取るプロンプトです。{{Source.form}} などの変数を使用して、トリガーデータを渡します。

**Run Agent** ステップでは、以下のオプションフィールドもサポートされています。

- **出力スキーマ**: エージェントの応答に対する JSON スキーマを定義します。設定すると、エージェントは後続のステップで使用できるように、スキーマに合わせて出力を構造化します。たとえば、`requestType` フィールドを持つスキーマを定義し、If 条件ステップで `Run Agent.finalResponse.requestType` に基づいて分岐させることができます。

  {{< img src="/actions/agents/output-schema-example.png" alt="エージェントの応答フィールドに基づいて分岐するために出力スキーマを使用するワークフロー" style="width:100%;" >}}

- **会話 ID**: デフォルトでは、各 Run Agent ステップの呼び出しは、スタンドアロンの単一ターン実行となります。会話 ID を渡すことで、エージェントは複数のワークフロー実行にわたってコンテキストを保持できます。マルチターンセッションには、チャット UI と同じコンテキストウィンドウの制限が適用されます。

エージェントは設定されたツールと指示に従って実行され、その出力をワークフローに返します。ルールベースの自動化と AI の推論を単一のワークフローで組み合わせることができます。

### エージェントを作業項目に自動的に割り当てる {#automatically-assign-agents-to-work-items}

[Work Management][17] は、人間やエージェントの作業を追跡するための Datadog の組み込みチケットツールです。カスタムエージェントを作成して作業のトリアージや解決を支援し、これらのエージェントを作業項目に自動的に割り当てることができます。

## トラブルシューティング{#troubleshooting}

**エージェントがツールを使用していない**: ツールがエージェントの構成に追加されていることを確認してください。エージェントは、明示的に追加されたツールのみを使用できます。

**自動化が実行されていない**: 自動化が公開されており、Run Agent ステップが完全に構成されていることを確認してください。

**会話の長さの制限**: 長い会話はコンテキストの長さの制限に達する可能性があります。これが発生した場合は、新しい会話を開始してください。

**予期しない構成変更**: [Audit Trail][11] をエージェントの ID でフィルタリングして、変更履歴を確認してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison
[6]: https://developers.openai.com/api/docs/models
[7]: /ja/actions/actions_catalog/
[8]: /ja/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /ja/account_management/audit_trail/
[12]: /ja/actions/actions_catalog/http-action/
[13]: /ja/actions/workflows/trigger/#scheduled-triggers
[14]: /ja/actions/workflows/trigger/#monitor-triggers
[15]: /ja/actions/workflows/trigger/#incident-triggers
[16]: /ja/actions/workflows/trigger/#security-triggers
[17]: /ja/incident_response/work_management/ai/custom_agents/