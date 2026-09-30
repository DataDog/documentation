---
description: AI Setup CLI または Datadog MCP Server を使用して、アプリケーションに Datadog のインスツルメンテーションを行います。
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: ブログ
  text: Agentic Onboarding を使用してサーバーレスアプリにインスツルメンテーションを行う
title: Agentic Onboarding Setup
---
## 概要 {#overview}

エージェントによるオンボーディングは、アプリケーションとインフラストラクチャーの Datadog インスツルメンテーションを自動化する AI 駆動型ツールセットです。

- [AI Setup CLI](#ai-setup-cli): コーディングアシスタントを使用せずにターミナルから Datadog をセットアップします。
- [Datadog MCP Server](#mcp-server): コーディングアシスタント (Claude Code や Cursor など) を通じて Datadog をセットアップします。これにより、IDE からフレームワークの検出と構成が処理されます。

これら 2 つのパスは補完的なものであり、同じ Datadog アカウントを使用します。IDE に Datadog MCP Server をインストールし、ターミナルで CLI を実行できます。

## AI Setup CLI {#ai-setup-cli}

Datadog AI Setup CLI は、スタンドアロンのターミナルツールです。Datadog MCP Server をインストールしたくない場合や、Datadog アカウントの作成など、Datadog MCP セットアップがサポートしていないタスクに使用します。

CLI で実行できること:

- ターミナルから Datadog アカウントをエンドツーエンドで作成する
- 既存の Datadog アカウントをローカル環境にリンクする
- ファイルを直接編集してローカルのインフラストラクチャーをコード (Terraform、Helm、Kustomize、Ansible、Pulumi、生の Kubernetes マニフェスト、Docker Compose ファイル) としてインスツルメンテーションする
- サポートされているフロントエンドおよびバックエンドの SDK 初期化と構成を追加してローカルアプリケーションコードにインスツルメンテーションを行う

### 前提条件 {#prerequisites}

- Node.js 22 以降

### サポート対象製品 {#supported-products}

CLI で設定可能な製品は以下のとおりです。

| 製品 | 識別子 |
|---------|------------|
| App and API Protection | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Error Tracking | `error-tracking` |
| Infrastructure Monitoring | `infra-monitoring` |
| Linux | `linux` |
| Agent Observability | `llm-obs` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring (RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Test Optimization | `test-optimization` |

### CLI のインストールと実行 {#install-and-run-the-cli}

1. `npx` で CLI を実行し、`--site` を渡して [Datadog サイト][16] をターゲットにします。Datadog アカウントをすでにお持ちかどうかによって 2 つのオプションがあります。

    **オプション 1: 対話型セットアップ。**Datadog アカウントをまだお持ちでない場合、または製品を対話形式で選択したい場合は、`--product` フラグなしで実行します。CLI がアカウントのセットアップと製品の選択をガイドします。

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com
    ```

    Replace the value of `--site` with the [Datadog site][16] for your account: `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, or `ap2.datadoghq.com`.

    **Option 2: Direct setup.** If you already have a Datadog account and want to install a specific product, pass `--product` to skip product selection.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
    ```

    - Replace the value of `--site` with the [Datadog site][16] for your account.
    - Replace `<PRODUCT>` with one of the [supported products](#supported-products).

1. ウェルカム画面で <kbd>Enter</kbd> キーを押し、Datadog アカウントを持っているかどうかを選択します。OAuth (またはアカウントをまだお持ちでない場合はアカウント作成) 用にブラウザが開きます。フローを完了し、Datadog アカウントへのアクセスを許可します。

1. CLI を `--product` なしで実行した場合は、製品メニューからセットアップする項目を選択します。(`--product` を使用した直接セットアップでは、このメニューはスキップされます。)

   {{< img src="agentic_onboarding/product-selection.png" alt="CLI メニュー「何を設定したいですか?」Infrastructure and Backend monitoring、Frontend Monitoring、LLM-Based applications、CI Testing ごとにグループ化されています。" style="width:80%;" >}}

   CLI はプロジェクトのフレームワークを検出し、必要な構成を適用し、必要な環境変数をプロビジョニングします。進捗状況はステージごとに報告されます。

   {{< img src="agentic_onboarding/setup-example.png" alt="「アプリのインスツルメント、ステージ 1/3: Datadog RUM (Real User Monitoring)」と進捗ステップが表示されている CLI。" style="width:80%;" >}}

   セットアップが完了すると、CLI はインスツルメント化した製品を一覧表示し、Datadog UI へのリンクを表示して受信データを確認できるようにします。

   {{< img src="agentic_onboarding/success.png" alt="「セットアップが完了しました!」という表示と、RUM、Error Tracking、Product Analytics の横にチェックマークが付いている CLI。" style="width:80%;" >}}

1. 変更をリポジトリにコミットします。特定の環境に合わせて、Datadog の環境変数 (API キー、アプリケーション ID) を編集できます。

CLI が完了したら、[次のステップ](#next-steps) を参照します。

## MCP サーバー {#mcp-server}

Datadog MCP Server は、`onboarding` ツールセットを MCP 互換のコーディングアシスタントに公開します。サーバーをインストールして認証した後、1 行のプロンプトを入力してプロジェクトをインスツルメント化します。Agent がコードを読み取り、(許可を得て) MCP ツールを呼び出し、変更を適用して、結果を検証します。

### 前提条件 {#prerequisites-1}

- [Claude Code][17] や [Cursor][18] などの MCP 互換コーディングアシスタント
- Datadog アカウント

### サポートされているフレームワーク {#supported-frameworks}

| 製品 | フレームワーク |
|---------|------------|
| Error Tracking、RUM、Product Analytics | Android、Angular、iOS、Next.js、React、Svelte、Vanilla JS、Vue |
| Kubernetes Observability | Helm、Kustomize、raw manifests、Terraform、Pulumi、Ansible (GKE、EKS、AKS、minikube、および kind、k3s、OpenShift など)|
| Docker Observability | `docker-compose`およびサイドカー (`docker run`) デプロイメント。Terraform、Ansible、およびその他の IaC (Pulumi、CloudFormation、Puppet、Chef)|
| Linux Observability | Terraform、Ansible、その他の IaC (Pulumi、CloudFormation、Puppet、Chef)、およびプレーンシェルインストール |
| Serverless Monitoring (AWS Lambda) | AWS SAM、AWS CDK、Serverless Framework、Terraform、`datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run および Cloud Run Functions) | Terraform、`gcloud run deploy`、Cloud Run YAML、Dockerfile、Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform、Bicep、ARM テンプレート、`azure.yaml` (azd)、`az containerapp` CLI |
| Agent Observability | OpenAI、Anthropic、LangChain、Vercel AI SDK (プロジェクトの依存関係から自動検出) |
| OpenTelemetry | Node.js / サーバーサイド TS、ブラウザ JS / React / Vite、Python (Django、Flask、FastAPI)、Java、Go |
| App and API Protection | Python、Node.js、Java、Go、Ruby、.NET、PHP、および Linux、Windows、Kubernetes、Docker、GCP Cloud Run、AWS Lambda、AWS Fargate/ECS 用のプロキシ (Envoy、HAProxy)|
| Code Coverage, Test Optimization | Jest、Vitest、Mocha、Playwright、Cypress、pytest、unittest、JUnit、TestNG、RSpec、minitest、xUnit、NUnit、MSTest v2、`go test`、XCTest / Swift Testing |

### ステップ 1: MCP Server をインストールする {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
アクティブな Claude Code セッションで、以下を実行します。

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**オプション 1: ディープリンクのインストール (推奨)**

[Datadog サイト][1] のインストール用ディープリンクをクリックし、カーソルが開く際の 次の {{< ui >}}Install{{< /ui >}} を確認します。**datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** サーバー。

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**オプション 2: 手動構成**

`~/.cursor/mcp.json` にサーバーを追加します。

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>

[1]: /ja/getting_started/site/

{{% /tab %}}

{{% tab "その他の MCP クライアント" %}}

HTTP トランスポートをサポートする MCP クライアントであれば、Datadog MCP Server に接続できます。[Datadog サイト][1] のエンドポイントを指定します。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /ja/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### ステップ 2: MCP Server を認証する {#step-2-authenticate-the-mcp-server}

1. MCP Server をインストールした後、コーディングアシスタントが認証を求めます。<kbd>Enter</kbd> キーを押すと、ブラウザで Datadog OAuth 画面が開きます。
1. 認証が完了したら、{{< ui >}}Open{{< /ui >}} を選択して IDE に戻り、MCP Server に Datadog アカウントへのアクセス権を付与します。
1. 以下に MCP ツールが表示されることを確認します。**datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** サーバー。

### ステップ 3: プロジェクトをインスツルメントする {#step-3-instrument-your-project}

設定したい製品に対応するプロンプトを送信します。

{{< tabs >}}
{{% tab "Error Tracking" %}}
{{< code-block lang="text" >}}Add Datadog Error Tracking to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Real User Monitoring" %}}
{{< code-block lang="text" >}}Add Datadog Real User Monitoring to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Product Analytics" %}}
{{< code-block lang="text" >}}Add Datadog Product Analytics to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Infrastructure Monitoring" %}}

**Kubernetes**
{{< code-block lang="text" >}}Add Datadog for Kubernetes to my project{{< /code-block >}}

**Docker**
{{< code-block lang="text" >}}Add Datadog for Docker to my project{{< /code-block >}}

{{% /tab %}}

{{% tab "App and API Protection (プレビュー)" %}}
<div class="alert alert-info">App and API Protection のエージェントによるオンボーディングは、Public Preview 内にあります。</div>

{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**GCP Cloud Run コンテナ**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**GCP Cloud Run 関数**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

エージェントがスタックを検出し、ツール呼び出しのたびに許可を求め、変更をローカルに適用し (コミットは行いません)、検証手順を表示します。

エージェントの完了後、変更をリポジトリにコミットし、新しい環境変数 (API キー、アプリケーション ID) を本番環境に設定します。次に、[次のステップ](#next-steps) を参照して、データが送信されていることを確認します。

## 次のステップ {#next-steps}

設定した製品について、Datadog UI でデータが送信されていることを確認します。

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /ja/getting_started/site/
[17]: https://www.anthropic.com/claude-code
[18]: https://cursor.com/

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}