---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: ブログ
  text: Cloud Functions は現在 Cloud Run 関数です — 統一されたサーバーレスプラットフォームでのイベント駆動型プログラミング
- link: /mcp_server/tools/#serverless_onboarding
  tag: ドキュメント
  text: 'Datadog MCP サーバー: サーバーレスオンボーディングツール'
title: Cloud Run 関数の計測
type: multi-code-lang
---
<div class="alert alert-info">
<strong>初代 Cloud Run 関数を探していますか？</strong>Cloud Run 関数（初代）を使用している場合、以前は Cloud Functions（初代）として知られていたものについては、<a href="/serverless/google_cloud_run/functions_1st_gen">初代 Cloud Run 関数の計測</a>を参照してください。
</div>

## Datadog MCP サーバーを使用する {#use-the-datadog-mcp-server}

[Datadog MCP サーバー][2]を使用して、AI の支援を受けて Cloud Run コンテナの監視を設定します。接続したら、次のようなプロンプトを試してください。

```shell
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

## 手動インスツルメンテーション {#manual-instrumentation}

まず、[Datadog-Google Cloud Platform 統合][1]を設定して、Google Cloud サービスからメトリクスとログを収集します。サービスアカウントに `cloud asset viewer` ロールを追加し、Google Cloud で Cloud Asset Inventory API を有効にすることを忘れないでください。

次に、アプリケーションの計測方法については、以下からランタイムを選択してください。

{{% container-languages path="google_cloud_run/functions" functions="true" %}}



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/google-cloud-platform/
[2]: /ja/agentic_onboarding/setup