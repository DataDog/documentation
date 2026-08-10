---
further_reading:
- link: /integrations/google-cloud-run/
  tag: ドキュメント
  text: Google Cloud Run インテグレーション
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: ブログ
  text: Cloud Run サービスからのトレース、ログ、カスタムメトリクスの収集
- link: /serverless/google_cloud_run/containers/in_container/
  tag: ドキュメント
  text: インコンテナアプローチでコンテナをインスツルメントする
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: ドキュメント
  text: サイドカーアプローチでコンテナをインスツルメントする
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: ブログ
  text: 新しい Datadog Agent サイドカーを使用して Google Cloud Run アプリケーションをインスツルメントする
- link: /mcp_server/tools/#serverless_onboarding
  tag: ドキュメント
  text: 'Datadog MCP サーバー: serverless_onboarding ツール'
title: コンテナのインスツルメンテーション方法の選択
---
## Datadog MCP サーバーを使用する {#use-the-datadog-mcp-server}

[Datadog MCP サーバー][3]を使用し、AI のサポートを活用して Cloud Run コンテナのモニターを設定します。接続したら、次のようなプロンプトを試してください。

```shell
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

## 手動インスツルメンテーション {#manual-instrumentation}
Datadog を使用して Google Cloud Run コンテナをインスツルメントするには、次の 2 つのオプションのいずれかを選択します。

{{% gcr-container-options %}}

- [**インコンテナ**][1]: Datadog Agent でアプリケーションコンテナをラップします。より簡単なセットアップ、低コストオーバーヘッド、直接ログパイプを希望する場合は、このオプションを選択してください。
- [**サイドカー**][2]: アプリコンテナとは別のコンテナに Datadog Agent をデプロイします。単一のサービスに複数のコンテナがある場合、Datadog Agent の厳密な分離を希望する場合、またはパフォーマンス要件が厳しいワークロードがある場合は、このオプションを選択してください。

### 比較: インコンテナとサイドカーのインスツルメンテーション {#comparison-in-container-versus-sidecar-instrumentation}

| 側面                        | インコンテナ                                               | サイドカー                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| デプロイメント                    | 1 つのコンテナ (アプリ、Datadog Agent でラップ) | 2 つのコンテナ (アプリ、Datadog Agent)                                                                                                                    |
| 画像の変更                 | アプリの画像サイズが増加します。                               | アプリの画像に変更はありません。                                                                                                                                     |
| コストオーバーヘッド                 | サイドカーよりも少ない (追加コンテナなし)。                 | Extra vCPU / メモリ。サイドカーの過剰割り当てはコストを無駄にし、過少割り当てはプレマチュアスケーリングにつながります。                                                      |
| ログ                       | 直接 stdout / stderr アクセス。                            | ログファイルにルーティングする共有ボリューム + ログライブラリ。未処理のエラーには追加の処理が必要です。それらはロギングライブラリによって自動的に処理されないからです。|
| 障害の分離             | 稀なケースではありますが、Datadog Agent のバグがアプリに影響を与える可能性があります。  | Datadog Agent の障害は分離されます。                                                                                                                          |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/google_cloud_run/containers/in_container
[2]: /ja/serverless/google_cloud_run/containers/sidecar
[3]: /ja/agentic_onboarding/setup