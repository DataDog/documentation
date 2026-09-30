---
further_reading:
- link: /agent/basic_agent_usage/
  tag: ドキュメント
  text: 基本的な Agent の利用方法
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: サーバーレスモニタリングについて詳しく知ることができるインタラクティブなセッションに参加できます
title: AWS Lambda サーバーレスモニタリングの概要
---

## 概要

サーバーレスとは、開発者が自分でインフラストラクチャーを管理するのではなく、クラウドプロバイダーを使ってアプリケーションやサービスを構築し、実行するモデルです。Datadog [サーバーレスモニタリング][1]は、サーバーレスインフラクチャーからメトリクス、ログ、トレースを収集し、アプリケーションの健全性とパフォーマンスを監視することを可能にします。

このガイドでは、サーバーレスの[サンプルアプリ][2]を使用します。このサンプルアプリは、使い慣れたプログラミング言語と IaC (Infrastructure as Code) ツールを使って起動できます。アプリにはあらかじめ Serverless Monitoring が設定されているため、このガイドに沿ってサンプルアプリの問題をトラブルシューティングする方法や、Serverless Monitoring が提供する可視性の種類を確認してください。

### サンプルアプリをデプロイする

1. [サンプルアプリ][3]のリポジトリをローカルマシンに複製します。
2. 任意のランタイムおよび IaC ツールを選択し、該当するデプロイ手順のリンクを参照します。
3. [Datadog API キー][4]と [Datadog サイト][5] ({{< region-param key="dd_site" code="true" >}}) を確認し、次の手順で使用します。
4. 選択したランタイムと IaC の手順に従い、サンプルアプリケーションをデプロイします。
5. デプロイが完了したら、リポジトリのルートにある Postman コレクションを使用するか、[負荷テスト][6]を実行します。

[Serverless View でサンプルアプリの関数を確認できます][7]。

{{< img src="getting_started/serverless/serverless_view_2024_2.png" alt="サーバーレスモニタリング: サーバーレスビュー (エクスプローラーページ) " style="width:80%;">}}

## サーバーレスビュー

サーバーレスビューは、AWS 環境内のすべてのサーバーレスリソースからのテレメトリーを表示します。このページは、アプリケーションの監視、デバッグ、最適化のための出発点として使用できます。

サーバーレスビューでは、リソースは `SERVICE_NAME` ごとにグループ化されます。関数を少なくとも一度呼び出していれば、それぞれのバックエンドサービスが別々のサービスグループとして表示されます。

{{< img src="getting_started/serverless/functions_view_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

### サーバーレスインサイト
サーバーレスビューの最も右側の列は **Insights** と呼ばれ、[高いエラー率][8]や[高い処理時間][9]など、サーバーレスアプリケーションの潜在的な問題を Datadog が自動的にハイライトして表示します。

サーバーレスのサンプルアプリケーションでは、[コールドスタート][10]が検出されている可能性があります。コールドスタートは、サーバーレスアプリケーションが突然の大量トラフィックを受け取った場合などに発生します。これは、以前はリクエスト数が比較的一定だった関数が急に多くのリクエストを受け取った場合や、このように関数が非アクティブの状態から初めて呼び出された場合などに起こります。

## エラーを調査する

サンプルアプリケーションは定期的にエラーを発生させ、応答が遅くなるように設計されています。その結果、product pricing service (製品価格サービス) で Lambda タイムアウトが発生します。

{{< img src="getting_started/serverless/dd_serverless_view_error_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

`product-pricing-service` 下の 2 つのサービスでエラーが起こっていることに注目してください。サーバーレスビュー上部の Issues & Insights セクションでも、タイムアウトが発生しているサービスがあることが示されています。

{{< img src="getting_started/serverless/insights_and_issues.png" alt="サーバーレスビューでのインサイトと問題の表示" style="width:80%;">}}

## 関数の詳細
関数をクリックすると、呼び出しや最近のデプロイメントに関する詳細が表示されます。

{{< img src="getting_started/serverless/details_error_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

詳細ビューには 3 つのグラフが含まれ、利用可能な任意のメトリクスを設定できます。デフォルトでは 3 つの[拡張 Lambda メトリクス][11] (invocations、errors、duration) が表示されます。

Datadog は、拡張 Lambda メトリクスを低レイテンシーかつ数秒単位の粒度で収集し、コールドスタートやカスタムタグに関する詳細なメタデータを付与した状態で提供します。デフォルトの[拡張 Lambda メトリクスダッシュボード][12]もあわせてご確認ください。


### Invocations
**Invocations** タブには、関数の最新の呼び出しが表示されます。

各呼び出しは、トレースと関連付けられています。**Open Trace** をクリックすると、各呼び出しのトレースが表示されます。

{{< img src="getting_started/serverless/dd_flame_graph_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

**Flame Graph** タブでは、呼び出しの期間中にどのサービスが全体の実行時間のうち最大の割合を占めていたかなどが正確に分かります。Flame Graph では、API Gateway を経由して `create-product-function` に至るリクエストの流れを可視化します。

ズームアウトすると、下流のすべてのサービスを含むエンドツーエンドのトレース全体を確認できます。

{{< img src="getting_started/serverless/trace_map_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

**Trace Map** タブでは、サービスの流れや相互の接続を視覚化することができます。

エラーを含むトレースを表示している場合、詳細ビューの下部にエラーの内容が表示されます。

```
Error: Failure generating prices
  at PricingService.calculate (/var/task/index.js:94382:13)
  at ProductUpdatedEventHandler.handle (/var/task/index.js:95826:51)
  at handler (/var/task/index.js:95854:34)
```

その下で、Lambda のリクエストとレスポンスのペイロードを調べることもできます。Datadog は、Lambda の起動ごとにイベントペイロードを収集します。

### ログ

サーバーレスのサンプルアプリは、デフォルトでログが有効になっています。各関数のログは、その **Logs** タブで見ることができます。

{{< img src="getting_started/serverless/dd_logs_view_2.png" alt="2 つの関数をクローズアップした画像" style="width:80%;">}}

これらのログは、エラーのみを表示するようにフィルタリングしたり、[Log Explorer][13] で閲覧したりできます。


[1]: /ja/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://github.com/DataDog/serverless-sample-app?tab=readme-ov-file#implementations
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ja/getting_started/site
[6]: https://github.com/DataDog/serverless-sample-app/tree/main?tab=readme-ov-file#load-tests
[7]: https://app.datadoghq.com/functions?cloud=aws&text_search=product
[8]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-errors
[9]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-duration
[10]: https://docs.datadoghq.com/ja/serverless/guide/insights/#cold-starts
[11]: https://docs.datadoghq.com/ja/serverless/enhanced_lambda_metrics
[12]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[13]: https://docs.datadoghq.com/ja/logs/explorer/