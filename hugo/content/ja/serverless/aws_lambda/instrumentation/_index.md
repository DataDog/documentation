---
aliases:
- /ja/serverless/installation/installing_the_library/
- /ja/serverless/installation
- /ja/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: Serverless Monitoring を構成する
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: ラーニングセンター
  text: Datadog による Serverless Monitoring のための AWS Lambda の構成
- link: /mcp_server/tools/#serverless_onboarding
  tag: ドキュメント
  text: 'Datadog MCP Server: serverless_onboarding ツール'
title: AWS Lambda アプリケーションのインスツルメンテーション
---
## 概要 {#overview}

Datadog Lambda Extension を使用して AWS Lambda アプリケーションをインスツルメンテーションし、トレース、拡張メトリクス、カスタムメトリクスを収集します。Datadog Lambda Extension は、ホストベースのインフラストラクチャーやアプリケーションで Datadog Agent や Datadog SDK を使用することに相当します。

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog がインスツルメンテーションされた AWS Lambda アプリケーションからテレメトリを受信する仕組みを示す図。Datadog Lambda Library でインスツルメンテーションされた Lambda アプリケーションは、ログ、トレース、拡張メトリクス、カスタムメトリクスを Datadog Lambda Extension に送信し、そのデータは Datadog にプッシュされます。" style="width:100%;" >}}

## クイックスタート {#quick-start}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この機能は、選択された <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

開始するには、Datadog アカウントを持っていない場合は [Datadog アカウントにサインアップ][1] してください。次に、AWS Lambda の [Fleet Automation のアプリ内インストールフロー][8] に従って、Lambda 関数をインスツルメンテーションします。このクイックスタート構成により、関数から Datadog へリアルタイムのメトリクス、ログ、トレースを送信できるようになります。

サンプルアプリケーションが [GitHub で利用可能][6] で、複数のランタイムや infrastructure-as-code ツールを使用してデプロイする方法が記載されています。

クイックスタートプロセスは、Lambda 関数をその場で構成します。Lambda 関数を永続的にインスツルメンテーションするには、以下のエージェント型オンボーディングまたは手動インスツルメンテーションのセクションを参照してください。

## エージェント型オンボーディングでセットアップする {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この機能は、選択された <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

エージェント型オンボーディングを使用して、AI アシスタンスによる Lambda 関数のモニタリングをセットアップします。エージェント型オンボーディングは、プロジェクトのフレームワークを検出し、必要な設定をその場で適用し、データが流れていることを確認します。2 つの補完的なパスで同じ Datadog アカウントを使用します。

- **AI セットアップ CLI**: スタンドアロンのターミナルツール。MCP サーバーをインストールしたくない場合に使用します。
- **MCP サーバー**: Claude Code や Cursor などのコーディングアシスタントを通じて、IDE からセットアップします。

{{< tabs >}}
{{% tab "AI セットアップ CLI" %}}

プロジェクトディレクトリで CLI を実行します (Node.js 22+ が必要)。Datadog アカウントをリンクし、Lambda 関数をインスツルメンテーションします。

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda
```

対話形式で実行する場合は `--product` を省略し、Datadog サイトを指定する場合は `--site` を追加します。

{{% /tab %}}
{{% tab "MCP サーバー" %}}

Datadog MCP サーバーの [`serverless_onboarding`](https://docs.datadoghq.com/ja/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) ツールを使用して、AI アシスタンスによる Lambda 関数のモニタリングをセットアップします。接続後、次のようなプロンプトを試します。

```
Help me monitor my AWS Lambda functions with Datadog.
```

{{% /tab %}}
{{< /tabs >}}

## 手動インストルメンテーション {#manual-instrumentation}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## 高度な構成 {#advanced-configurations}

インストルメンテーションが完了し、テレメトリ収集の設定が済んだら、[AWS Lambda の Serverless Monitoring を構成する][3] を使用して、以下のことができます。

- タグを使用して、メトリクス、トレース、ログを接続する
- API Gateway、AppSync、Step Functions などの AWS リソースからテレメトリを収集する
- 個々の Lambda 呼び出しのリクエストおよびレスポンスのペイロードをキャプチャする
- Lambda 関数のエラーをソースコードにリンクする
- ログやトレースから機密情報をフィルタリングまたは削除する

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /ja/serverless/aws_lambda/configuration/
[4]: /ja/serverless/aws_lambda/fips-compliance/
[5]: /ja/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /ja/mcp_server/tools/#serverless_onboarding