---
description: Datadog と Oracle Cloud Infrastructure 環境をインテグレーションし、包括的な監視を実現する
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: ブログ
  text: Datadog で Oracle Cloud Infrastructure を監視する
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: ブログ
  text: Datadog OCI QuickStart で Oracle Cloud Infrastructure の監視を加速する
- link: /integrations/oracle-cloud-infrastructure
  tag: ドキュメント
  text: Oracle Cloud Infrastructure インテグレーション
- link: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: ガイド
  text: クラウド インスタンスに Datadog Agent をインストールすべき理由
title: Oracle Cloud Infrastructure (OCI) の利用開始
---

{{< jqmath-vanilla >}}

## 概要

このガイドでは、Oracle Cloud Infrastructure (OCI) 環境の監視を始める手順を紹介します。Datadog の QuickStart セットアップを使うと、インテグレーション作業をシンプルに進められ、OCI テナンシからメトリクス、ログ、リソース データを収集するために必要な基盤を自動で用意できます。

{{% collapse-content title="前提条件" level="h4" expanded=false id="prerequisites" %}}

### OCI 側

OCI ユーザー アカウントには、以下が必要です:

- **Identity Domain Administrator** ロール
- Identity Domain でユーザー、ユーザー グループ、動的グループを作成できること
- ルート コンパートメントでポリシーを作成できること

さらに、次の条件も満たしてください:
- インテグレーション対象のテナンシにログインしていること
- OCI コンソールで Home Region が選択されていること

**注**: OCI インテグレーションは、1 つのテナンシにつき 1 つまでに制限されています。2026 年 1 月 1 日時点で存在していた OCI Commercial リージョン (OC1 realm) はすべてサポートされています。

### Datadog 側

[API キーおよびアプリケーション キーを作成する権限][30] を持つ [Datadog アカウント][1]。

{{% /collapse-content %}}

## セットアップ

OCI 向け Datadog QuickStart は、必要な基盤をテナンシ内に一式展開するフル マネージドのセットアップ方式です。このセットアップでは、Oracle Service Connector Hub を自動作成してメトリクスとログを Datadog にストリーミングし、環境の拡大にあわせて新しいリソースやコンパートメントも継続的に検出します。

**注**: 開始前に、Service Connector Hub の [サービス制限引き上げを申請する][4] ことを検討してください。必要なおおよその数は次のとおりです:

$$\\text"Service Connector Hubs" = \text"テナンシ内のコンパートメント数" / \text"5"\$$

### Datadog OCI インテグレーション タイルを設定する

1. [Datadog OCI インテグレーション タイル][3] に移動し、**Add New Tenancy** をクリックします。

2. インテグレーションで使用する Datadog API キーを選択するか、新しく作成します。
3. Datadog アプリケーション キーを作成します。
4. トグルを使ってログを有効または無効にします。
5. **Create OCI Stack** をクリックします。OCI コンソールの Oracle Resource Manager が開き、デプロイを完了できます。

   **注**: このスタックのデプロイは、テナンシごとに 1 回だけ実行してください。

### QuickStart ORM スタックをデプロイする

1. OCI コンソールで Oracle Terms of Use に同意します。
2. カスタム Terraform プロバイダーを使うオプションはチェックしないままにします。
3. 既定の作業ディレクトリをそのまま使うか、必要に応じて別のものを選びます。
4. **Next** をクリックします。
5. **(Optional) Choose specific subnet(s)** セクションは空欄のままにします。QuickStart は各リージョンに新しい Virtual Cloud Network (VCN) とサブネットを自動で作成するため、これが最も簡単な構成です。

   **高度なオプション**: 既存のサブネットを使う場合 (OCI リージョンごとに最大 1 つ)、サブネットの OCID を 1 行に 1 つずつ指定します。カンマは不要です。形式: `ocid1.subnet.oc[0-9].*`。例: `ocid1.subnet.oc1.iad.abcedfgh`。
   既存のサブネットを使う場合は、各 VCN に対して、NAT Gateway 経由の HTTP 外向き通信、"All Services In Oracle Services Network" 向けの Service Gateway、適切なルート テーブル ルール、HTTP リクエストを許可するセキュリティ ルールが設定されていることを確認してください。

6. **(Optional) Choose a User** セクションは空欄のままにします。QuickStart が現在の OCI Identity Domain に新しい Group と User を作成するため、IAM の設定を簡単に進められます。

   **高度なオプション**: 既存の Group と User を使う場合は、**Group ID** と **User ID** の両方の OCID を入力します。このユーザーは、指定したグループのメンバーである必要があります。

7. **(Optional) Advanced configuration** セクションは、多くのケースでは空欄のままで問題ありません。

   **高度なオプション**:
   - **Compartment**: Datadog が作成するリソースの配置先として既存のコンパートメントを指定します (既定では新しい "Datadog" コンパートメントが作成されます)。
   - **Domain**: User と Group の作成先を上書きする Identity Domain の OCID を指定します。その Domain で **Identity Domain Administrator** ロールが必要です。

8. **Next** をクリックします。
9. **Create** をクリックし、デプロイが完了するまで最大 30 分待ちます。

### Datadog 側でセットアップを完了する

[Datadog OCI インテグレーション タイル][3] に戻り、**Ready!** をクリックします。

### 検証

データの収集が始まるまで最大 10 分待ってから、Datadog の [OCI インテグレーション概要ダッシュボード][5] または [Metrics Explorer ページ][6] で `oci.*` メトリクスを確認します。

{{< img src="getting_started/integrations/oci/oci-dashboard.png" alt="Datadog の OCI 概要ダッシュボード。Oracle Cloud Infrastructure サービスの各種メトリクスとグラフが表示されている">}}

<div class="alert alert-info">OCI Functions のメトリクス (<code>oci.faas</code> ネームスペース) とコンテナ インスタンスのメトリクス (<code>oci_computecontainerinstance</code> ネームスペース) は Preview 提供中です。</div>

## 設定

セットアップが完了すると、[Datadog OCI インテグレーション タイル][3] の左側で、そのテナンシ用の設定タブが使えるようになります。以下の手順に沿って、テナンシ全体のデータ収集設定を適用してください。

### リージョンを追加する

**General** タブで、**Regions** チェック ボックスの一覧からデータ収集対象のリージョンを選択します。ここでのリージョン選択は、メトリクスとログの両方について、テナンシ全体に適用されます。

**注**: QuickStart セットアップを使った後で新しい OCI リージョンをサブスクライブした場合は、ORM で初回セットアップ スタックを再適用してください。すると、その新しいリージョンが Datadog OCI タイルで利用できるようになります。

### メトリクスとログの収集

**Metric collection** タブと **Log collection** タブでは、どのメトリクスとログを Datadog に送るかを設定できます。

**注**: フィルターは次の順序で評価されます。まず **Selected Services** がサービスごとのデータ収集の主スイッチとして機能し、その後にコンパートメント タグ フィルター、最後にリソース タグ フィルターが適用されます。

#### すべての収集を有効または無効にする

メトリクス収集タブとログ収集タブのどちらにも、そのデータ種別についてテナンシ全体の収集を無効にできるメイン トグルがあります。

#### 特定の OCI サービスに収集対象を絞る

**Selected Services** セクションでは、個々の OCI サービスごとに収集を有効または無効にできます。あるサービスを無効にすると、そのサービスについては、設定済みのリソース タグ フィルターの内容にかかわらず、すべての収集が停止します。サービスが有効になっている場合は、リソース タグ フィルターで、そのサービス内の特定リソースだけに収集対象をさらに絞り込めます。一致する包含タグがないリソースは除外されます。

**注**: サービス トグルの変更が反映されるまで、最大 5 分かかる場合があります。

{{% collapse-content title="タグ フィルターの構文" level="h5" id="tag-filter-syntax" %}}

**Compartment Tags** セクションと **Limit Collection to Specific Resources** セクションでは、カンマ区切りの `key:value` 形式の OCI タグを指定できます。否定条件にする場合は、タグの先頭に `!` を付けます。カンマ区切りの解釈は、使用しているタグの種類によって異なります:

- **正のタグのみ**: OR 条件 - 一覧にあるタグの **いずれか** を OCI オブジェクトが持っていれば含めます。
- **負のタグのみ** (`!` を接頭辞として付与): OR 条件 - 否定したタグの **いずれか** が存在すれば除外します。
- **正のタグと負のタグを混在**: AND 条件 - 含めるには、列挙した条件を **すべて** 満たす必要があります。

例:
- `datadog:monitored,env:prod*`: **いずれか** のタグがあれば含めます。
- `!env:staging,!testing:true`: **いずれか** のタグがあれば除外します。
- `datadog:monitored,!region:us-phoenix-1`: `datadog:monitored` タグが存在し、かつ `region:us-phoenix-1` タグがない場合にのみ含めます。

{{% /collapse-content %}}

#### コンパートメント単位で収集を絞り込む

**Compartment Tags** セクションでは、OCI コンパートメントのタグに基づいて、特定のコンパートメントを含めたり除外したりできます。構文については、[タグ フィルターの構文](#tag-filter-syntax) を参照してください。

**注**: OCI では、タグは子コンパートメントに継承されません。各コンパートメントに個別にタグを付ける必要があります。OCI 側でタグを変更してから Datadog に反映されるまで、最大 15 分かかる場合があります。

#### 特定のリソースだけを収集対象にする

**Limit Collection to Specific Resources** セクションでは、どのリソースからメトリクスまたはログを Datadog に送るかを定義できます。ドロップダウンから OCI サービスを選び、対象にしたいリソース タグを指定します。構文については、[タグ フィルターの構文](#tag-filter-syntax) を参照してください。

### リソース収集

[Datadog OCI インテグレーション タイル][3] の **Resource Collection** タブで、**Enable Resource Collection** トグルをクリックします。収集されたリソースは [Datadog Resource Catalog][7] で確認できます。

## Datadog プラットフォームをさらに活用する

### Agent を導入して可視性をさらに高める

OCI インテグレーションでは Oracle Cloud Monitoring を通じてサービス レベルのメトリクスを自動収集できますが、コンピュート インスタンスに [Datadog Agent][8] をインストールすると、インフラとアプリケーションをより深く把握できるようになります:

- **システム レベルのメトリクス**: CPU、メモリ、ディスク、ネットワークをサブ秒粒度で確認できます。
- **プロセス レベルの可視化**: アプリケーションごとのリソース消費を把握できます。
- **カスタム メトリクス**: [DogStatsD][12] を通じてアプリケーションから送信できます。
- **分散トレース**: リクエストをエンド ツー エンドで追跡できます。
- **ログ**: メトリクスと関連付けて、トラブルシュートをより素早く進められます。

Agent は、Oracle Linux を含むほとんどの OS で単一コマンドでインストールできます。手順は [Agent インストール ページ][9] を参照してください。導入メリットの詳細は、[クラウド インスタンスに Agent をインストールすべき理由][13] で確認できます。

### OCI Kubernetes Engine (OKE) で Datadog Agent を使う

OKE 上のコンテナ化された環境では、[Kubernetes 向け Datadog Agent][14] を利用できます。専用の Kubernetes ドキュメントを参照し、OKE クラスターに Agent をデプロイして、コンテナ化されたアプリケーションからメトリクス、ログ、トレースを収集してください。

## 関連サービスを確認する

### GPU 監視

OCI の GPU インスタンスを監視することは、高性能コンピューティング ワークロードの性能と信頼性を最適な状態に保つうえで重要です。[OCI GPU インテグレーション][22] では、`gpu_infrastructure_health` ネームスペースを通じて包括的な GPU メトリクスを取得でき、[GPU インスタンス][23] の健全性、容量、スループット、ステータス、パフォーマンスを追跡できます。

OCI インテグレーションを設定した後は、GPU 関連のネームスペースがメトリクス収集設定に含まれていることを確認してください。GPU 基盤の全体像は、[OCI GPU Overview ダッシュボード][29] を参照してください (このダッシュボードは OCI GPU インテグレーションのセットアップ時に自動作成されます)。

### Cloud Cost Management

Datadog の [Oracle Cloud Cost Management][24] を使うと、インフラ変更がコストに与える影響をエンジニアリング チームや財務チームが把握しやすくなり、組織全体への支出配分や改善余地の特定に役立ちます。

OCI で Cloud Cost Management を有効にするには:
1. 上記の説明に従って OCI インテグレーションを構成済みであることを確認します。
2. コスト データ収集を有効にするため、[Oracle Cloud Cost Management ドキュメント][24] にあるセットアップ手順に従います。

### Cloud SIEM

Cloud SIEM は、すぐに使えるインテグレーションとルールを活用し、運用ログとセキュリティ ログをリアルタイムに分析して脅威を検出・調査します。

OCI 環境で Cloud SIEM を使うには:
1. OCI インテグレーションの設定で、ログ収集が有効になっていることを確認します。
2. 脅威検出を設定するため、[Cloud SIEM の利用開始][25] を確認します。
3. OCI 向けの個別ログ ソースとセキュリティ ルールを設定するため、[Cloud SIEM 向け OCI 構成ガイド][26] に従います。

Cloud SIEM は、OCI のログを分析して次のような事象を検出します:
- 未許可のアクセス試行
- 不審な API コール
- セキュリティ リスクを招く可能性のある設定変更
- コンプライアンス違反

## トラブルシューティング

OCI インテグレーションで問題が発生した場合は、[OCI インテグレーションのトラブルシューティング ガイド][27] を参照してください。

サポートが必要な場合は、[Datadog サポート][28] にお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[4]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
[5]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[6]: https://app.datadoghq.com/metric/explorer
[7]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/
[8]: /ja/getting_started/agent/
[9]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /ja/developers/dogstatsd/?tab=hostagent
[13]: /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[14]: /ja/agent/kubernetes/?tab=helm
[22]: /ja/integrations/oci_gpu/
[23]: https://www.oracle.com/cloud/compute/#gpu
[24]: /ja/cloud_cost_management/setup/oracle/
[25]: /ja/getting_started/cloud_siem/
[26]: /ja/security/cloud_siem/guide/oci-config-guide-for-cloud-siem/
[27]: /ja/integrations/guide/oci-integration-troubleshooting
[28]: /ja/help/
[29]: https://app.datadoghq.com/dash/integration/31744/oci-gpu-overview
[30]: /ja/account_management/rbac/permissions/#api-and-application-keys