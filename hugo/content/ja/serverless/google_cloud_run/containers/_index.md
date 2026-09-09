---
further_reading:
- link: /integrations/google-cloud-run/
  tag: ドキュメント
  text: Google Cloud Run インテグレーション
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: ブログ
  text: Cloud Run サービスからトレース、ログ、カスタムメトリクスを収集する
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
  text: 'Datadog MCP Server: serverless_onboarding ツール'
title: コンテナのインスツルメンテーション方法の選択
---
## エージェント型オンボーディングを使用してセットアップする{#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

エージェント型オンボーディングを使用して、AI を活用した Cloud Run コンテナの監視を設定します。エージェント型オンボーディングは、プロジェクトのフレームワークを検出し、必要な構成を適用し、データが正常に送信されていることを確認します。同じ Datadog アカウントを使用する 2 つの補完的なパスがあります。

- **AI Setup CLI**: スタンドアロンのターミナルツールです。MCP サーバーをインストールしたくない場合に使用します。
- **MCP サーバー**: Claude Code や Cursor などのコーディングアシスタントを通じて、IDE からセットアップします。

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

プロジェクトディレクトリで CLI を実行します (Node.js 22 以降が必要です)。Datadog アカウントをリンクし、Cloud Run サービスをインスツルメントします。

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run
```

対話形式で実行する場合は、`--product` を省略します。対象とする Datadog サイトを指定する場合は、`--site` を追加します。

{{% /tab %}}
{{% tab "MCP サーバー" %}}

Datadog MCP Server の [`serverless_onboarding`](https://docs.datadoghq.com/ja/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) ツールを使用して、AI を活用した Cloud Run コンテナの監視を設定します。接続後、次のようなプロンプトを試してください。

```
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## 手動インスツルメンテーション {#manual-instrumentation}
Datadog を使用して Google Cloud Run コンテナをインスツルメントするには、次の 2 つのオプションのいずれかを選択します。

{{% gcr-container-options %}}

- [**インコンテナ**][1]: Datadog Agent でアプリケーションコンテナをラップします。セットアップをより簡単に行い、オーバーヘッドコストを削減し、直接ログパイプを使用する場合は、このオプションを選択します。
- [**サイドカー**][2]: アプリコンテナとは別のコンテナに Datadog Agent をデプロイします。単一のサービスに複数のコンテナがある場合、Datadog Agent の厳密な分離を希望する場合、またはパフォーマンス要件が厳しいワークロードがある場合は、このオプションを選択します。

### 比較: インコンテナとサイドカーのインスツルメンテーション {#comparison-in-container-versus-sidecar-instrumentation}

| 要素                        | インコンテナ                                               | サイドカー                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| デプロイメント                    | 1 つのコンテナ (アプリ、Datadog Agent でラップ) | 2 つのコンテナ (アプリ、Datadog Agent)                                                                                                                    |
| 画像の変更                 | アプリの画像サイズが増加します。                               | アプリの画像は変更されません。                                                                                                                                     |
| オーバーヘッドコスト                 | サイドカーより低コスト (追加コンテナなし)。                 | 追加の vCPU/メモリ。サイドカーに過剰に割り当てるとコストを浪費し、過少に割り当てると早すぎる段階でのスケーリングにつながります。                                                      |
| ログ                       | 直接の stdout/stderr 直接アクセス。                            | ログファイルにルーティングする共有ボリューム + ログライブラリ。捕捉されなかったエラーがログライブラリによって自動的に処理されることはないため、追加の処理が必要です。|
| 障害の分離             | 稀にしか発生しませんが、Datadog Agent のバグがアプリに影響を与えることがあります。  | Datadog Agent の障害は分離されます。                                                                                                                          |

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/google_cloud_run/containers/in_container
[2]: /ja/serverless/google_cloud_run/containers/sidecar
[3]: /ja/agentic_onboarding/setup