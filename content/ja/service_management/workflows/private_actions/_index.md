---
disable_toc: false
further_reading:
- link: service_management/app_builder/connections
  tag: ドキュメント
  text: App Builder 接続
- link: service_management/workflows/connections
  tag: ドキュメント
  text: ワークフロー接続
- link: service_management/workflows/private_actions/use_private_actions
  tag: ドキュメント
  text: ワークフローで Private Actions を使用する
- link: service_management/app_builder/private_actions/use_private_actions
  tag: ドキュメント
  text: App Builder で Private Actions を使用する
- link: service_management/workflows/private_actions/private_action_credentials
  tag: ドキュメント
  text: Workflow Automation のプライベートアクション資格情報の処理
- link: service_management/app_builder/private_actions/private_action_credentials
  tag: ドキュメント
  text: App Builder のプライベートアクション資格情報の処理
title: Private Actions 概要
---

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header=" プレビューに参加しましょう！">}}
Private Actions は現在プレビュー版です。このフォームからアクセスを今すぐリクエストできます。
{{< /callout >}}

Private Actions を使用すると、Datadog のワークフローやアプリが、パブリックインターネットに公開することなく、プライベートネットワーク内でホストされるサービスとやり取りできるようになります。Private Actions を使用するには、Docker または [Kubernetes][1] を用いてネットワーク内のホストに Private Action Runner をインストールし、その Runner を[コネクション][2]とペアリングする必要があります。

Runner を初めて起動すると、Datadog サーバーとの認証に使用する秘密鍵が生成されます。この秘密鍵は Datadog からはアクセス不可で、あなただけが排他的に使用可能です。Datadog は、この秘密鍵から派生した公開鍵を用いて特定の Runner を認証します。

## モード

Private Action Runner は、App Builder、Workflow Automation、または両方で利用可能です。

以下は、Private Actions の全体的な概要を示す図です。

{{< img src="service_management/private_action_runner_-_diagram_general.png" alt="Private Actions が Datadog およびユーザーのブラウザと連携する様子を示した概要図" style="width:90%;" >}}

### モードによる違い

以下の表では、App Builder モードと Workflows モードのトリガーメカニズムや動作モデルなどの違いを示します。

| 区別点              | App Builder モード | Workflows モード |
|--------------------------| -----------------|----------------|
| **トリガー<br>メカニズム** | ユーザーがトリガー - 各アクションはアプリとのユーザー操作によって開始されます      | 人による直接介入なく自動実行が可能    |
| **トリガー<br>モデル**     | プッシュモデル - Runner 上の URL に直接アクセスすることでアクションがトリガー | プルモデル - 実行すべきタスクを定期的にポーリングして確認      |
| **データ<br>取り扱い**     | データはプライベート環境内に留まり、Datadog に送信されない       | Private Action の実行結果を Datadog に報告する |

これらのモデルの違いは、応答の遅延に影響する可能性があります。たとえば、App Builder モード (プッシュモデル) は比較的即応性が高いのに対し、Workflows モード (プルモデル) はポーリング間隔によって遅延が生じる場合があります。

### App Builder モード

Private Action Runner が App Builder モードで動作している場合、プライベートサービスへのリクエストはユーザーのブラウザから直接 Runner へ送られ、Runner はそれをプロキシして対象サービスへアクセスします。このモードではデータが Datadog に渡ることはありません。Runner は登録と認証に必要な場合のみ Datadog と通信します。

以下の図で、**App Management** は、アプリ削除など Runner とは無関係な App Builder のバックエンドアクションを指します。

{{< img src="service_management/private_action_runner_-_diagram_app_builder.png" alt="App Builder モードにおける Private Actions の動作 (認証を含む) を示す概要図" style="width:90%;" >}}

#### 認証

セキュアな通信を実現するため、Datadog のフロントエンドは、各リクエストに一回限り有効なスコープ付きトークンを付与し、Runner は秘密鍵を用いてこれを検証します。これにより、データはネットワーク内にとどまり、Datadog に送信されることなく、Private Actions の完全性とセキュリティが確保されます。

#### Runner のホスト名

App Builder モードでは、ユーザーのブラウザは直接 Runner にアクセスするため、Runner を指すカスタムドメインを指定する必要があります。この際、`A` または `CNAME` レコードをネットワークの Ingress に向け、Ingress 側で HTTPS 要求を終端し、ポート 9016 で Runner コンテナに転送できるようにします。なお、ドメインや Ingress は必ずしもインターネット上に公開する必要はなく、企業の VPN 経由のみでアクセス可能なロードバランサーを指すことも可能です。

### Workflow Automation モード

Runner が Workflows 専用モードで動作している場合、初回登録以外には特別な設定は必要ありません。Runner は Datadog アカウントからタスクを定期的にポーリングし、内部サービスで実行してその結果を Datadog に報告します。

{{< img src="service_management/private_action_runner_-_diagram_workflow.png" alt="Workflow Automation モードでの Private Actions の動作を示す概要図" style="width:90%;" >}}

### 両方

両方のモードを利用する設定にした場合、Runner は受け取るリクエストの種類に応じて動的に適切なモードで動作します。これにより、App リクエスト、Workflow Automation 実行、あるいは両者が混在する状況でも円滑に対応できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[2]: /ja/service_management/workflows/connections/