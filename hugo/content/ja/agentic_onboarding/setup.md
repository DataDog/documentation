---
description: AI Setup CLI または Datadog MCP Server を使用して、Datadog でアプリケーションをインスツルメントします。
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: ブログ
  text: エージェントによるオンボーディングでサーバーレスアプリをインスツルメントする
title: エージェントによるオンボーディングのセットアップ
---
## 概要 {#overview}

エージェントによるオンボーディングは、アプリケーションとインフラストラクチャーの Datadog インスツルメンテーションを自動化する AI 駆動型ツールセットです。

- [AI Setup CLI](#ai-setup-cli): コーディングアシスタントを使用せずに、ターミナルから Datadog をセットアップします。
- [Datadog MCP Server](#mcp-server): コーディングアシスタント (Claude Code や Cursor など) を介して Datadog をセットアップします。IDE からフレームワークの検出と構成を処理します。

これら 2 つのパスは補完的なものであり、同じ Datadog アカウントを使用します。IDE で Datadog MCP Server をインストールし、ターミナルで CLI を実行できます。

## AI Setup CLI {#ai-setup-cli}

Datadog AI Setup CLI は、スタンドアロンのターミナルツールです。MCP Server をインストールしたくない場合や、Datadog アカウントの作成など、MCP セットアップがサポートしていないタスクを実行する場合に使用します。

CLI では以下が可能です。

- ターミナルから Datadog アカウントをエンドツーエンドで作成する
- 既存の Datadog アカウントをローカル環境にリンクする
- ファイルを直接編集してローカル Infrastructure as Code (Terraform、Helm、Kustomize、Ansible、Pulumi、生の Kubernetes マニフェスト、Docker Compose ファイル) をインスツルメントする
- サポートされているフロントエンドおよびバックエンドの SDK 初期化および構成を追加して、ローカルのアプリケーションコードをインスツルメントする

### 前提条件 {#prerequisites}

- Node.js 22 以降

### 対応製品 {#supported-products}

CLI では以下の製品をセットアップできます。

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

### CLI をインストールして実行する {#install-and-run-the-cli}

`npx` を使用して CLI を実行し、`--site`を渡して [Datadog サイト][16]をターゲットにします ({{< region-param key=dd_site code="true" >}})。Datadog アカウントをすでに持っているかどうかに応じて 2 つのオプションがあります。

   {{< tabs >}}
   {{% tab "インタラクティブなセットアップ" %}}
1. Datadog アカウントを持っていない場合、またはコード分析に基づいて CLI に製品を推奨してもらいたい場合は、このオプションを使用します。CLI が、アカウントのセットアップ、リポジトリの分析、製品の推奨手順を案内します。

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com
   ```
   `--site` の値をアカウントの Datadog サイトに置き換えます ({{< region-param key=dd_site code="true" >}})。

1. ウェルカム画面で <kbd>Enter</kbd> を押し、Datadog アカウントを持っているかどうかを選択します。OAuth (またはまだアカウントを持っていない場合はアカウントの作成) 用にブラウザが開きます。フローを完了し、Datadog アカウントへのアクセスを許可してください。
1. インスツルメントするリポジトリへのパスを入力します。
1. 同意すると、CLI は読み取り専用モードでリポジトリを分析し、スタックを検出します。
1. 検出されたスタックに基づいて、CLI は対応している Datadog プロダクトを最大で 3 つ推奨します。推奨事項はデフォルトで選択されています。個別の推奨事項の選択を解除するか、選択内容を確認するか、または**すべてのセットアップオプションを表示する**を選択して、代わりにセットアップオプションの全リストを使用します。
   
   {{% /tab %}}
   
   {{% tab "直接セットアップ" %}}
1. Datadog アカウントをすでに持っていて、インストールする製品が決まっている場合は、このオプションを使用します。`--product` フラグを追加すると、リポジトリ分析と製品の推奨事項をスキップして、直接セットアップに進むことができます。

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
   ```

   - `--site` の値をアカウントの Datadog サイトに置き換えます ({{< region-param key=dd_site code="true" >}})。
   - [対応製品](#supported-products)セクションに記載されている製品のいずれかに `<PRODUCT>` を置き換えます。

1. ウェルカム画面で <kbd>Enter</kbd> を押し、Datadog アカウントを持っているかどうかを選択します。OAuth (またはまだアカウントを持っていない場合はアカウントの作成) 用にブラウザが開きます。フローを完了し、Datadog アカウントへのアクセスを許可してください。

   {{% /tab %}}
   {{< /tabs >}}

#### セットアップを構成して検証する {#configure-and-verify-your-setup}

1. CLI が推奨事項を生成できない場合、または高い精度で一致するものがリポジトリに見つからない場合は、セットアップオプションの全リストが表示されます。`--product` による直接セットアップでは、このメニューから開始します。
   {{< img src="agentic_onboarding/product-selection.png" alt="CLI メニュー「What would you like to set up?」は、インフラストラクチャーおよびバックエンドモニタリング、フロントエンドモニタリング、LLM ベースのアプリケーション、および CI テストごとにグループ化されています。" style="width:80%;" >}}
1. CLI はプロジェクトのフレームワークを検出し、必要な構成を適用し、必要な環境変数をプロビジョニングします。進捗状況が段階的に報告されます。
   {{< img src="agentic_onboarding/setup-example.png" alt="進捗ステップで「Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring)」と表示された CLI。" style="width:80%;" >}}
1. セットアップが完了すると、CLI はインスツルメントした製品を表示し、受信データを確認するために Datadog UI にリンクします。

1. 変更内容をリポジトリにコミットします。特定の環境に合わせて Datadog の環境変数 (API キー、アプリケーション ID) を編集できます。

CLI が完了したら、[次のステップ](#next-steps)セクションを参照して、データが流れていることを確認してください。

### ヘッドレスモード {#headless-mode}

ヘッドレスモードは、無人セットアップ用に設計されています。AI コーディングエージェント、CI ジョブ、またはスクリプトは、リポジトリで直接 CLI を実行し、Datadog インスツルメンテーションを自動的に完了させることができます。プロンプトの承認や対話形式の選択を行うために、人が立ち会う必要はありません。

`--headless` を使用して、対話型 UI をスキップします。これには `--site` と `--product` の両方が必要です。

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/ai-setup-cli \
  --headless \
  --site datadoghq.com \
  --product rum
```

ユーザーの操作なしで認証を行うには、`DD_API_KEY` と `DD_APP_KEY` の[環境変数][19]を設定します。両方の変数を一緒に指定してください。

あるいは、API キーとアプリケーションキーを省略して、ブラウザの OAuth で認証することも可能です。OAuth はヘッドレスの実行においてユーザーの操作が必要となる可能性のある唯一の部分であり、ローカルホストのコールバックが必要です。リモート環境や完全に無人の環境では、代わりに `DD_API_KEY` と `DD_APP_KEY` の環境変数を使用してください。

`--headless` を使用することで、ソースコードのアップロードと自動コマンド実行が対象プロジェクトに対して許可されていることを確認したことになります。

## MCP Server {#mcp-server}

Datadog MCP Server は、MCP 互換のコーディングアシスタントに対して `onboarding` ツールセットを公開します。サーバーのインストールと認証が完了したら、1 行のプロンプトを入力してプロジェクトをインスツルメントします。エージェントはコードを読み取り、(許可を得て) MCP ツールを呼び出し、変更を適用し、結果を検証します。

### 前提条件 {#prerequisites-1}

-  [Claude Code][17] や [Cursor][18] などの MCP 対応コーディングアシスタント
- Datadog アカウント

### 対応フレームワーク {#supported-frameworks}

| 製品 | フレームワーク |
|---------|------------|
| Error Tracking、RUM、Product Analytics | Android、Angular、iOS、Next.js、React、Svelte、Vanilla JS、Vue |
| Kubernetes Observability | Helm、Kustomize、raw manifests、Terraform、Pulumi、Ansible (GKE、EKS、AKS、minikube、および kind、k3s、OpenShift など) |
| Docker Observability | `docker-compose` およびサイドカー (`docker run`) デプロイメント。Terraform、Ansible、およびその他の IaC (Pulumi、CloudFormation、Puppet、Chef) |
| Linux Observability | Terraform、Ansible、その他の IaC (Pulumi、CloudFormation、Puppet、Chef)、および plain-shell install |
| Serverless Monitoring (AWS Lambda) | AWS SAM、AWS CDK、Serverless Framework、Terraform、`datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run および Cloud Run Functions) | Terraform、`gcloud run deploy`、Cloud Run YAML、Dockerfile、Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform、Bicep、ARM テンプレート、`azure.yaml` (azd)、`az containerapp` CLI |
| Agent Observability | OpenAI、Anthropic、LangChain、Vercel AI SDK (プロジェクトの依存関係から自動検出) |
| OpenTelemetry | Node.js / サーバーサイド TS、Browser JS / React / Vite、Python (Django、Flask、FastAPI)、Java、Go |
| App and API Protection | Python、Node.js、Java、Go、Ruby、.NET、PHP、および Linux、Windows、Kubernetes、Docker、GCP Cloud Run、AWS Lambda、AWS Fargate/ECS 用のプロキシ (Envoy、HAProxy) |
| Code Coverage, Test Optimization | Jest、Vitest、Mocha、Playwright、Cypress、pytest、unittest、JUnit、TestNG、RSpec、minitest、xUnit、NUnit、MSTest v2、`go test`、XCTest / Swift Testing |

### ステップ 1: MCP Server をインストールする {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
アクティブな Claude Code セッションで、以下を実行します。

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**オプション 1: ディープリンクをインストールする (推奨)**

使用している [Datadog サイト][1]のインストールディープリンクをクリックし、カーソルが開いたら `datadog-onboarding-` サーバーの {{< ui >}}Install{{< /ui >}}{{< region-param key="dd_datacenter_lowercase" >}}を確認します。

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

HTTP トランスポートをサポートする MCP クライアントは、Datadog MCP Server に接続できます。[Datadog サイト][1]のエンドポイントでそれを指定します。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /ja/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### ステップ 2: MCP Server を認証する {#step-2-authenticate-the-mcp-server}

1. MCP Server をインストールすると、コーディングアシスタントが認証を求めてきます。<kbd>Enter</kbd> を押して、ブラウザで Datadog OAuth 画面を開きます。
1. 認証が完了したら、{{< ui >}}Open{{< /ui >}} を選択して IDE に戻り、MCP Server に Datadog アカウントへのアクセス権を付与します。
1. MCP ツールが `datadog-onboarding- サーバーの下に表示されることを{{< region-param key="dd_datacenter_lowercase" >}}確認します。

### ステップ 3: プロジェクトをインスツルメントする {#step-3-instrument-your-project}

セットアップする製品に一致するプロンプトを送信します。

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

{{% tab "App and API Protection" %}}
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

エージェントがスタックを検出し、ツール呼び出しのたびに許可を求め、変更をローカルに適用し (コミットは行いません)、検証手順を出力します。

エージェントの完了後、変更をリポジトリにコミットし、新しい環境変数 (API キー、アプリケーション ID) を本番環境に設定します。その後、[次のステップ](#next-steps)セクションを参照して、データが流れていることを確認してください。

## 次のステップ {#next-steps}

セットアップした製品について、Datadog UI でデータが流れていることを確認してください。

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /ja/getting_started/site/
[17]: https://claude.com/product/claude-code
[18]: https://cursor.com/
[19]: /ja/account_management/api-app-keys/