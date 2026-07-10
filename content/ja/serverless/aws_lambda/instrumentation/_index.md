---
aliases:
- /ja/serverless/installation/installing_the_library/
- /ja/serverless/installation
- /ja/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
title: AWS Lambda アプリケーションのインスツルメンテーション
---
## 概要 {#overview}

Datadog Lambda Extension を使用して、トレース、拡張メトリクス、およびカスタムメトリクスを収集するために、AWS Lambda アプリケーションをインスツルメントします。Datadog Lambda Extension は、ホストベースのインフラストラクチャーおよびアプリケーションに対して Datadog Agent と Datadog SDK を用いる場合と同様の機能を提供します。

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog がインスツルメンテーション済みの AWS Lambda アプリケーションからテレメトリを受信する方法を示す図。Datadog Lambda Library でインスツルメントされた Lambda アプリケーションからログ、トレース、拡張メトリクス、およびカスタムメトリクスが Datadog Lambda Extension に送信され、そのデータが Datadog にプッシュされます。" style="width:100%;" >}}

## クイックスタート {#quick-start}

最初に、まだアカウントがない場合は [Datadog アカウントに登録][1]します。次に、AWS Lambda の [Fleet Automation のアプリ内インストールフロー][8]に従って、Lambda 関数をインスツルメントします。このクイックスタート構成により、関数でリアルタイムのメトリクス、ログ、およびトレースを Datadog に送信できるようになります。

サンプルアプリケーションが [GitHub][6] で提供されており。複数のランタイムと Infrastructure-as-Code ツールを使用してデプロイする方法が紹介されています。

クイックスタートプロセスでは、Lambda 関数をその場で構成します。Lambda 関数を恒久的にインスツルメントするには、次のセクションの詳細な手順を参照してください。

## Datadog MCP サーバーを使用する {#use-the-datadog-mcp-server}

[Datadog MCP サーバー][9]を使用して、AI のサポートを活用して AWS Lambda コンテナのモニターを設定します。接続したら、次のようなプロンプトを試してください。

```shell
Help me monitor my AWS Lambda functions with Datadog
```

## インスツルメンテーション手順 {#instrumentation-instructions}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## 高度な構成 {#advanced-configurations}

インスツルメンテーションが完了し、テレメトリ収集のセットアップが終わったら、[AWS Lambda のためのサーバーレスモニタリングの構成][3]に従って次のことが可能です。

- タグを使ってメトリクス、トレース、ログを接続する
- API Gateway、AppSync、Step Functions などの AWS リソースからテレメトリを収集する
- 個々の Lambda 呼び出しのリクエストとレスポンスのペイロードを取得する
- Lambda 関数のエラーをソースコードにリンクする
- ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /ja/serverless/aws_lambda/configuration/
[4]: /ja/serverless/aws_lambda/fips-compliance/
[5]: /ja/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /ja/agentic_onboarding/setup