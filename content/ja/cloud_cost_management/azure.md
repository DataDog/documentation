---
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: ドキュメント
  text: AWS の請求に関する洞察を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する洞察を得る
title: Azure
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">クラウドコストマネジメントはこのサイトではサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog で Azure Cloud Cost Management を使用するには、Datadog Azure インテグレーションを設定し、Azure で **amortized** (償却) と **actual** (実際) のエクスポートをセットアップする必要があります。さらに、Datadog はコンテナからエクスポートを読み取る権限が必要です。

Datadog は、サブスクリプションレベル、リソースグループレベル、請求アカウントレベルでコストを視覚化します。Microsoft Customer Agreements (MCA) は、サブスクリプションレベルでのみセットアップできます。従量課金アカウントはサポートされていません。

## セットアップ


{{% site-region region="us3" %}}
**注**:
- Datadog の **US3** サイトを使用している場合、Azure ポータルから推奨される [Datadog リソース方法][1]を使用して Datadog Azure Native インテグレーションをセットアップしているかもしれません。クラウドコストマネジメントに対応するためには、[App Registration の作成][2]が必要です。
- Microsoft Customer Agreement のエクスポートは、サブスクリプションレベルで構成する必要があります。Enterprise プランの場合は、すべてのサブスクリプションにオンボードするように請求アカウントを構成できます。
- 従量課金制のアカウントには対応していません。

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /ja/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Azure インテグレーションの構成
[Setup & Configuration][3] に移動し、コストをプルする Azure アカウントをメニューから選択します。リストに Azure アカウントがない場合は、[Azure インテグレーション][4]を表示してアカウントを追加します。

### コストエクスポートの生成

**actual** (実際) と **amortized** (償却) の 2 つのデータタイプのエクスポートを生成する必要があります。Datadog は、両方のエクスポートに同じストレージコンテナを使用することを推奨しています。

1. Azure ポータルの *Cost Management + Billing* の下にある [Exports][5] に移動します。
2. エクスポートのスコープを選択します。**注:** スコープは *billing account*、*subscription* または *resource group* でなければなりません。
3. スコープを選択したら、**Add** をクリックします。

{{< img src="cloud_cost/exports_scope.png" alt="Azure ポータルで、ナビゲーションのエクスポートオプションとエクスポートスコープをハイライト表示" >}}

4. 次のエクスポートの詳細を選択します。
    - Metric: **Actual Cost (usage and purchases)** THEN  **Amortized Cost (usage and purchases)**
    - Export type: **Daily export of month-to-date costs**
    - File Partitioning: `On`

{{< img src="cloud_cost/new_export.png" alt="Metric: Actual、Export type: Daily、File Partitioning: On のエクスポートの詳細" >}}

5. エクスポート用のストレージアカウント、コンテナ、およびディレクトリを選択します。
    - **注:** これらのフィールドでは、`.` のような特殊文字は使用しないでください。
    - **注:** 請求エクスポートは、任意のサブスクリプションに保存できます。複数のサブスクリプションのエクスポートを作成する場合、Datadog は同じストレージアカウントに保存することを推奨しています。エクスポート名は一意でなければなりません。
7. **Create** を選択します。

より迅速な処理のために、**Run Now** をクリックして最初のエクスポートを手動で生成してください。
{{< img src="cloud_cost/run_now.png" alt="エクスポートのサイドパネルにある Run Now ボタンをクリックしてエクスポートを生成する" >}}

### Datadog がエクスポートにアクセスできるようにする

{{< tabs >}}
{{% tab "請求アカウント" %}}
**注**: Microsoft Customer Agreement の場合は、サブスクリプションレベルでセットアップします。

1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. Access Control (IAM) タブを選択し、**Add** をクリックします。
5. **Add role assignment** を選択します。
6. **Storage Blob Data Reader** を選択し、Next をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - **Select members** をクリックし、App Registration の名前を選んで、**Select** をクリックします。
    - *review + assign* を選択します。

エクスポートが別のコンテナに入っている場合は、他のコンテナについて手順 1〜7 を繰り返します。
{{% /tab %}}

{{% tab "サブスクリプションとリソースグループ" %}}

1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. Access Control (IAM) タブを選択し、**Add** をクリックします。
5. **Add role assignment** を選択します。
6. **Storage Blob Data Reader** を選択し、Next をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - **Select members** をクリックし、App Registration の名前を選んで、**Select** をクリックします。
    - *review + assign* を選択します。

エクスポートが別のコンテナに入っている場合は、他のコンテナについて手順 1〜7 を繰り返します。

### コストマネジメントリーダーへのアクセス構成
**注:** スコープが **Billing Account** の場合、このアクセスは構成する必要はありません。

1. [サブスクリプション][1]に移動し、サブスクリプションの名前をクリックします。
2. Access Control (IAM) タブを選択します。
3. **Add** をクリックし、次に **Add role assignment** をクリックします。
4. **Cost Management Reader** を選択し、Next をクリックします。
5. これらの権限を App Registration に割り当てます。

これにより、Microsoft Cost Management に対する定期的なコスト計算を許可することで、完全なコスト精度を確保することができます。

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

### Datadog でクラウドコストを構成する
[Setup & Configuration][3] に移動し、手順に従います。

### コストタイプ

インジェストしたデータは、以下のコストタイプで視覚化することができます。

| コストタイプ            | 説明           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | 適用される割引率に基づくコストと、割引期間中の使用量に応じたプリペイドの配分 (発生主義)。|
| `azure.cost.actual` | コストは、使用時に請求される金額で表示されます (現金主義)。実際のコストには、プライベート割引、リザーブドインスタンスやセービングプランの割引が別の料金タイプとして含まれています。|

### コストと観測可能性の相関
観測可能性データのコンテキストでコストを表示することは、インフラストラクチャーの変更がコストに与える影響を理解し、コストが変化する理由を特定し、コストとパフォーマンスの両方のためにインフラストラクチャーを最適化するために重要です。Datadog は、観測可能性とコストメトリクスの相関を簡素化するために、Azure のトップ製品のコストデータ上に `name` タグを追加します。

例えば、各 Azure VM のコストと利用率を表示するには、`azure.cost.amortized` と `azure.vm.network_in_total` (またはその他の VM メトリクス) でテーブルを作成し、`name` でグループ化します。また、Storage の使用量とコストを並べて見るには、`metercategory:Storage` でフィルタリングし、`azure.storage.transactions` と `azure.cost.amortized` を `name` でグループ化してグラフ化します。


### 履歴データの取得

[Microsoft API][6] を使用するか、[Microsoft にサポートチケット][7]を作成してコストデータをバックフィルしてもらうことで、ストレージアカウントに履歴データを作成することができます。Cloud Cost Management は、ファイル構造とパーティショニングがスケジュールされたエクスポートの形式に従っている限り、最大 15 か月分の履歴データを自動的に取り込みます。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: https://docs.datadoghq.com/ja/integrations/azure/?tab=azurecliv20#setup
[3]: https://app.datadoghq.com/cost/setup?cloud=azure
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Exports
[6]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]: https://support.microsoft.com