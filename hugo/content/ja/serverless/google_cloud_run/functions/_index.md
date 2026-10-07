---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: ブログ
  text: Cloud Functions は現在、Cloud Run functions に名称変更されています。統合された 1 つのサーバーレスプラットフォームでイベント駆動型プログラミングを実現します。
- link: /mcp_server/tools/#serverless_onboarding
  tag: ドキュメント
  text: 'Datadog MCP Server: serverless_onboarding ツール'
title: Cloud Run functions のインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">
<strong>第 1 世代の Cloud Run functions をお探しですか。</strong>Cloud Run functions (第 1 世代) (以前は Cloud Functions (第 1 世代) として知られていた) を使用する場合は、「<a href="/serverless/google_cloud_run/functions_1st_gen">第 1 世代 Cloud Run functions のインスツルメンテーション</a>」を参照してください。
</div>

## エージェント型オンボーディングを使用してセットアップする{#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

エージェント型オンボーディングを使用すると、AI の支援を受けながら、Cloud Run functions の監視をセットアップできます。エージェント型オンボーディングは、プロジェクトのフレームワークを検出し、必要な構成を適用し、データが正常に送信されていることを確認します。同じ Datadog アカウントを使用する 2 つの補完的なパスがあります。

- **AI Setup CLI**: スタンドアロンのターミナルツールです。MCP サーバーをインストールしたくない場合に使用します。
- **MCP サーバー**: Claude Code や Cursor などのコーディングアシスタントを通じて、IDE からセットアップします。

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

プロジェクトディレクトリで CLI を実行します (Node.js 22 以降が必要です)。Datadog アカウントをリンクし、Cloud Run 関数をインスツルメンテーションします。

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```

対話形式で実行する場合は、`--product` を省略します。対象とする Datadog サイトを指定する場合は、`--site` を追加します。

{{% /tab %}}
{{% tab "MCP サーバー" %}}

Datadog MCP サーバーの[`serverless_onboarding`](https://docs.datadoghq.com/ja/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) ツールを使用して、AI 支援を受けて Cloud Run functions の監視を設定します。接続後、次のようなプロンプトを試してください。

```
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## 手動インスツルメンテーション {#manual-instrumentation}

まず、[Datadog-Google Cloud Platform インテグレーション][1] を設定して、Google Cloud サービスからメトリクスとログを収集します。Google Cloud で、サービスアカウントに `cloud asset viewer` ロールを追加し、Cloud Asset Inventory API を有効にすることを忘れないでください。

次に、アプリケーションのインスツルメンテーションの方法について、以下から使用するランタイムを選択します。

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/google-cloud-platform/
[2]: /ja/agentic_onboarding/setup