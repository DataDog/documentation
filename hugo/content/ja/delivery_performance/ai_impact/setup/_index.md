---
description: AI 検出ソースと AI Impact 設定を構成して、Datadog がプルリクエストを AI 支援によるものとして分類できるようにします。
further_reading:
- link: /delivery_performance/ai_impact/
  tag: ドキュメント
  text: AI Impact について学ぶ
- link: /delivery_performance/dora_metrics/setup/
  tag: ドキュメント
  text: DORA Metrics のセットアップ
- link: /ai_agents_console/setup/
  tag: ドキュメント
  text: コーディングエージェント用に Agent Console をセットアップする
title: AI Impact をセットアップする
---
{{< callout url="#" btn_hidden="true" header="プレビューに参加しましょう。" >}}
AI Impact はプレビュー中で、Datadog のお客様すべてにご利用いただけます。
{{< /callout >}}

[AI Impact][1] は、AI コーディングツールに対して検出されたソースに基づいて、各プルリクエストを {{< ui >}}AI-assisted{{< /ui >}} または {{< ui >}}non-AI{{< /ui >}} に分類します。ソースとは、AI コーディングツールがコミットまたは PR に貢献したことを示すシグナルです。

[[{{< ui >}}Software Delivery{{< /ui >}}] > {{< ui >}}Delivery Performance{{< /ui >}}[] > [{{< ui >}}Settings{{< /ui >}}] > [{{< ui >}}AI Impact{{< /ui >}}]][2] で AI コーディングツールとソースを構成してください。Datadog は、各コーディングアシスタントの最も正確な分類のための推奨ソースを提示します。また、プリセットのマッピングルールにより、一般的なレビューエージェントや自律型エージェントからのアクティビティを検出できます。

## 前提条件{#prerequisites}

AI Impact を使用するには、デプロイメント、コミット、およびプルリクエストのデータを使用して [DORA Metrics][3] をセットアップする必要があります。

AI が共同作成したコミットや、AI レビューおよび自律型エージェントに起因する一部のアクティビティなど、初期データを表示するために AI 固有の構成は必要ありません。より完全な測定を行うには、以下で説明するように AI コーディングツールとソースを構成してください。

## AI 検出の仕組み {#how-ai-detection-works}

Datadog は、以下のタイプの AI ツールからの AI アクティビティを分類します。

| AI ツール | 検出の仕組み |
|---|---|
| [コーディングアシスタント](#set-up-coding-assistants) | 共同作成者のパターン、構成されたインテグレーション、プルリクエストのラベル、または AI ツールからの貢献を示すその他のデータによって検出されます。AI の帰属は、ツールのソースに応じて [直接的または推論的](#ai-attribution-modes-for-coding-assistants)になります。|
| [レビューエージェント](#set-up-review-agents) | プルリクエストのコメントと GitHub リアクションのマッピングルールを使用して検出されます。ルールがレビュー作成者を名前付きエージェントと照合した場合に、レビューエージェントはプルリクエストに起因するものと見なされます。|
| [自律型エージェント](#set-up-autonomous-agents) | コミット作成者のログイン、コミット作成者のメールアドレス、またはコミットトレーラーのマッピングルールを使用して検出されます。自律型エージェントがプルリクエスト (PR) の最初のコミットを作成した場合、その PR は自律型エージェントによるものと見なされます。|

### コーディングアシスタントの AI 帰属モード{#ai-attribution-modes-for-coding-assistants}

AI Impact は各プルリクエストを AI 支援ありまたは AI 支援なしに分類し、すべてのメトリクスはその分類に基づいて構築されます。PR のコミットの少なくとも 1 つが AI 支援によるものである場合、その PR は AI 支援ありです。

各ソースは、**直接的な帰属**、**ユーザーアクティビティから推論された帰属**、またはその両方を提供するシグナルを発信します。

| | 直接的な帰属 | ユーザーアクティビティから推論された帰属 |
|---|---|---|
| コミットが AI 支援によるものとなる条件 | ツールがその特定のコミットへの AI の貢献を報告している場合 (Cursor インテグレーションが AI 生成行を報告するなど)| コミットの作成者が、コミットが作成された当日に AI ツールを使用してコード行を作成した場合 |
| エビデンスの関連付け先 | コミット | 著者とカレンダー上の日付 |
| メトリクスが示す内容 | AI 支援なしで記述されたコードと比較した AI 支援コードのパフォーマンス、およびあるツールのユーザーと別のツールのユーザーの比較 | AI を使用して作業する開発者と AI を使用せずに作業する開発者のパフォーマンスの比較、およびあるツールのユーザーと別のツールのユーザーの比較 |

直接的な帰属は、シグナルが変更そのものに付随するため、より正確です。推論による帰属は、コミットごとの詳細なしに使用状況を報告するツールを対象としており、アクティブな作成者がその日に行ったすべてのコミットを AI 支援によるものとして分類します。ユーザーは、ツールがそのユーザーによって作成されたコード行を報告した日にのみアクティブと見なされます。

デフォルトでは、[AI Impact ダッシュボード][1]は、すべての[インテグレーションツール](#supported-ai-coding-assistants-and-sources)に共通する最も正確な帰属モードを使用してメトリクスを表示するため、ツール間でメトリクスを公平に比較できます。たとえば、Cursor のみを使用している場合、直接的な帰属が最も正確な方法であるため、メトリクスはこの方法を使用します。Cursor と Claude Code の両方を使用している場合、メトリクスはユーザーアクティビティから推論されます。Claude Code では直接的な帰属が利用できないためです。

[AI Impact ダッシュボード][1]でメトリクスが使用する帰属モードを選択するには、AI Impact 設定で [{{< ui >}}Default AI attribution UI filter{{< /ui >}}] を設定してください。この設定が影響するのは AI Impact UI でのデータの表示方法にのみで、Datadog が取り込むデータには影響しません。どちらのモードを選択しても、両方のモードでデータの収集は継続されます。

## コーディングアシスタントのセットアップ{#set-up-coding-assistants}

[{{< ui >}}AI Impact Settings{{< /ui >}}][2] は、Datadog が検出したコーディングアシスタントとソースを表示します。一部のコーディングアシスタントは、生成したコミットに[共同作成者](#co-author-signatures)として自身を追加すると、自動的に検出されます。AI コーディングアシスタントのアクティビティをより完全に把握するには、そのソースを構成してください。

### サポートされる AI コーディングアシスタントとソース {#supported-ai-coding-assistants-and-sources}

サポートされる各コーディングアシスタントには、コンテキストごとに推奨されるソースが 1 つあり、次の表に記載されています。推奨されるソースは、プルリクエストごとに手作業を行うことなくほとんどのユーザーが構成でき、セットアップ後に自動的にデータを取り込むことができる、最も正確なものです。

| コーディングアシスタント | 推奨ソース | 帰属モード |
|------------------|--------|-------------|
| Claude Code (API またはプラットフォーム) | [Anthropic の使用状況とコストインテグレーション][4] | 推論|
| Claude Code (エンタープライズプラン) | [Claude Enterprise User Analytics インテグレーション][5] | 推論|
| Claude Code (チームプラン) | [OpenTelemetry](#opentelemetry) | 推論|
| Claude Code (Amazon Bedrock または Google Vertex AI) | [OpenTelemetry](#opentelemetry) | 推論|
| Codex | [OpenAI Codex インテグレーション][6] | 推論|
| Cursor | [Cursor インテグレーション][7] | 直接|
| GitHub Copilot | [GitHub Copilot インテグレーション][8] | 推論|

他のコーディングアシスタントを追跡する場合や、サポートされているコーディングアシスタントで別のソースを使用する場合、すべてのコーディングアシスタントで利用可能なソースは以下の通りです。

- [PR ラベル](#pr-label-detection): (直接的な帰属) 指定されたラベルが付いた PR は、AI 支援ありとしてマークされます。
- [パブリック API](#datadog-public-api): (ユーザーアクティビティから推論) [Datadog パブリック API][11] を通じて独自のイベントデータを送信すると、Datadog はそこから AI の帰属を推論します。

### コーディングアシスタントのソースを構成する{#configure-a-source-for-a-coding-assistant}

1. [[{{< ui >}}AI Impact Settings{{< /ui >}}][2]] で [{{< ui >}}Coding assistants{{< /ui >}}] タブを開きます。このタブには、共同作成者の検出を通じて自動的に検出された AI ツールと、その他の構成されたアシスタントが一覧表示されます。
1. 追跡したいコーディングアシスタントがすでにリストにある場合は、それを選択してソースを構成します。それ以外の場合は、[{{< ui >}}Add a coding assistant{{< /ui >}}] をクリックして、コーディングアシスタントを選択します。
1. Claude Code の場合は、使用しているプランまたは経由するゲートウェイを選択します。[推奨されるソース](#supported-ai-coding-assistants-and-sources)はそれぞれ異なります。
1. UI のガイダンスに従ってソースをセットアップしてください。各ソースタイプの詳細については、以下のセクションを展開してください。

{{% collapse-content title="Datadog インテグレーション" level="h4" id="datadog-integrations" %}}
多くの場合、推奨されるソースはコーディングツール用の Datadog インテグレーションであり、AI の利用状況を Datadog に直接報告します。これらの中で、Cursor インテグレーションのみが、コミットごとに AI の貢献度を直接報告します。その他のインテグレーションはユーザーのアクティビティを報告し、Datadog はそれを使用して、アクティブな作成者がその日に作成したコミットに対する AI アシスタンスを推論します。

[{{< ui >}}AI Impact Settings{{< /ui >}}] でコーディングアシスタントを設定する際は、[{{< ui >}}Integration{{< /ui >}}] セクションの関連ボタンをクリックして Datadog のインテグレーションタイルを開き、セットアップを完了してください。
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" id="opentelemetry" %}}
OpenTelemetry を使用して、Claude Code の Teams プランなど、特定のコーディングアシスタントのデプロイメントから AI 利用データを報告してください。Claude Code が Amazon Bedrock や Google Vertex AI などの外部ゲートウェイ経由で実行されている場合は、追加の構成が必要です。

1. [Option 2: OpenTelemetry (OTLP)][9] または [Option 3: Forward data through the Datadog Agent][10] に従って、OpenTelemetry データを Datadog に送信するように Claude Code を設定します。
1. Amazon Bedrock または Google Vertex AI: Claude Code の設定ファイルでユーザーごとのリソース属性 (たとえば、`~/.claude/settings.json`) を設定します。

   ```json
   "OTEL_RESOURCE_ATTRIBUTES": "user.email=user@company.com"
   ```

   AI Impact には、アクティビティを個々の開発者に紐付け、その開発者のコミットに対する AI アシスタンスを推論するために、`user.email` が必要です。
1. Claude Code を再起動します。

`user.email` は開発者ごとに異なるため、単一の共有構成ファイルには含めることができません。モバイルデバイス管理 (MDM) システムや、ログイン時に値を書き込むプロビジョニングスクリプトを使用して、設定ファイルを配布してください。
{{% /collapse-content %}}

{{% collapse-content title="PR ラベル検出" level="h4" id="pr-label-detection" %}}
プルリクエストラベルは、Datadog インテグレーションがないアシスタントを含め、あらゆるコーディングアシスタントに対する直接的な帰属を提供します。Datadog は、ラベル付けされたプルリクエスト内のすべてのコミットを AI 支援ありとしてマークします。

1. コーディングアシスタントを [{{< ui >}}AI Impact Settings{{< /ui >}}] で構成する際は、[{{< ui >}}PR Labels{{< /ui >}}] セクションの [{{< ui >}}Set Up{{< /ui >}}] をクリックします。
1. チームが AI 支援プルリクエストを識別するために使用するラベルを 1 つ以上入力し、[{{< ui >}}Save{{< /ui >}}] をクリックします。

各ルールはプルリクエスト全体に適用されるため、AI 支援なしで記述されたコミットがあっても、それらは AI 支援ありとして分類されます。ラベル検出はチームによる一貫したラベル付けに依存しており、こうしたラベル付けを大規模な組織全体で維持するのは困難です。ラベル検出は Datadog インテグレーションのないコーディングアシスタントや、ラベル付けを維持できる単一のチームで使用してください。
{{% /collapse-content %}} 

{{% collapse-content title="Datadog パブリック API" level="h4" id="datadog-public-api" %}}
組織が AI コーディングツールを内部ゲートウェイ経由でルーティングする場合は、[Datadog パブリック API][11] を使用して、独自の AI 使用状況データを Datadog に送信してください。この API は、Datadog インテグレーションのないコーディングアシスタントを追跡するためのオプションでもあります。Datadog は、報告されたユーザーアクティビティから AI 支援を推測します。
{{% /collapse-content %}}

{{% collapse-content title="共同作成者の署名" level="h4" id="co-author-signatures" %}}
一部のコーディングアシスタントは、生成するコミットに自分自身を共同作成者として追加します。Datadog はこれらの共同作成者の署名を自動的に検出するため、追加の設定は不要です。署名はコミットに添付されるため、共同作成者の検出により直接的な帰属関係が示されます。

共同作成者の検出では、すべてのコーディングアシスタントが自分自身を共同作成者として追加するわけではなく、リベースやスカッシュによって共同作成者の署名が削除される可能性があるため、AI アクティビティが過小評価される可能性があります。より十分にコーディングアシスタントを測定するには、そのための別のソースを構成してください。
{{% /collapse-content %}}

## レビューエージェントをセットアップする{#set-up-review-agents}

レビューエージェントは、プルリクエスト内のコードを記述するのではなく、プルリクエストをレビューします。Datadog は、プルリクエストのコメントや GitHub のリアクションからレビューエージェントを検出し、マッピングルールによりレビュー作成者が指定されたエージェントと一致したときに、そのレビューエージェントをプルリクエストに割り当てます。

マッピングルールを使用してレビューエージェントを追跡するには、以下を実行します。

1. AI Impact 設定の [{{< ui >}}Review agents{{< /ui >}}] タブを開きます。
1. [{{< ui >}}Add Review Agent{{< /ui >}}] をクリックします。
1. UI 上でレビューエージェントを識別するため、[{{< ui >}}Agent name{{< /ui >}}] に入力します。
1. プルリクエスト上のレビューコメントやリアクションに関連付けられたエージェントの作成者ログインに一致するルールを 1 つ以上定義します。

## 自律型エージェントをセットアップする{#set-up-autonomous-agents}

自律型エージェントは、エディターで開発者を支援するのではなく、独自にプルリクエストを開きます。Datadog は、既知のエージェントパターンからほとんどの自律型エージェントを自動的に検出します。Datadog が自動的に検出しないエージェントを識別するために、マッピングルールを定義することもできます。

マッピングルールでエージェントを追跡するには、以下を実行します。

1. AI Impact 設定の [{{< ui >}}Autonomous agents{{< /ui >}}] タブを開きます。
1. [{{< ui >}}Add Autonomous Agent{{< /ui >}}] をクリックします。
1. UI 上で自律型エージェントを識別するため、[{{< ui >}}Agent name{{< /ui >}}] に入力します。
1. エージェントのプルリクエストを識別するルールを 1 つ以上定義します。

### 自動化ボットを識別する{#identify-automation-bots}

依存関係アップデーターやリリースボットなどの自動化ボットは AI エージェントではなく、そのアクティビティは AI Impact とは無関係です。ボットを識別することで、そのアクティビティが AI Impact メトリクスに影響を与えるのを防ぐことができます。

自動化ボットが作成したコミットやプルリクエストを検出するには、自動ボット検出 (GitHub 用) を有効にし、[配信パフォーマンス一般設定][12]でカスタムマッピングルールを定義してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora/ai-impact
[2]: https://app.datadoghq.com/ci/settings/dora/integrations
[3]: /ja/delivery_performance/dora_metrics/setup/
[4]: /ja/integrations/anthropic-usage-and-costs/
[5]: /ja/integrations/claude-enterprise-user-analytics/
[6]: /ja/integrations/openai-codex/
[7]: /ja/integrations/cursor/?tab=cursorintegrationindatadog#overview
[8]: /ja/integrations/github-copilot/
[9]: /ja/ai_agents_console/setup/#option-2-opentelemetry-otlp
[10]: /ja/ai_agents_console/setup/#option-3-forward-data-through-the-datadog-agent
[11]: /ja/api/latest/dora-metrics/send-ai-tool-user-activity/
[12]: https://app.datadoghq.com/ci/settings/dora