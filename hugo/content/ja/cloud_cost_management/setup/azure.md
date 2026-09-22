---
aliases:
- /ja/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: ドキュメント
  text: AWS の請求に関する情報を得る
- link: /cloud_cost_management/setup/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する情報を得る
- link: /cloud_cost_management/oracle
  tag: ドキュメント
  text: Oracle の請求に関する情報を得る
title: Azure
---
## 概要 {#overview}

Datadog で Azure Cloud Cost Management を使用するには、Datadog Azure インテグレーションを構成し、Azure で **amortized** および **actual** のエクスポートを作成する必要があります。さらに、Datadog はコンテナからエクスポートを読み取る権限が必要です。

Datadog は、サブスクリプション、リソースグループ、および請求アカウントレベルでコストの可視性を提供します。Microsoft Customer Agreements (MCA) は、これら 3 つのすべてのスコープで設定できます。アカウントタイプを確認するには、[Azure ドキュメント][10] を参照してください。

<div class="alert alert-info">
<strong>従量課金制 (PAYG) アカウント</strong>
<p>Datadog Cloud Cost Management には、Azure からの <strong>Actual Cost</strong> および <strong>Amortized Cost</strong> のエクスポートが必要です。PAYG (Microsoft Online Services Program) サブスクリプションは通常、<strong>使用状況の詳細 (使用量のみ)</strong> のエクスポートのみを提供するため、CCM 用にセットアップすることはできません。各 Azure アカウントタイプで利用可能なエクスポートタイプについては、Microsoft の <a href="https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports">Cost Management エクスポートドキュメント</a>を参照してください。</p>
<p>サブスクリプションが PAYG の場合は、次のいずれかのオプションを検討してください。</p>
<ul>
<li>必要なエクスポートタイプをサポートしている Microsoft Customer Agreement (MCA) または Enterprise Agreement (EA) に移行します。</li>
<li>Microsoft Azure サポートに問い合わせて、サブスクリプションで利用可能なエクスポートタイプを確認します。</li>
</ul>
<p>Datadog CCM のセットアップに関するヘルプやオプションの検討については、<a href="/help/">Datadog サポート</a>までお問い合わせください。</p>
</div>

## セットアップ {#setup}

[API][13]、[Terraform][14]、または以下の手順に従って Datadog で直接セットアップできます。

{{% site-region region="us3" %}}
**注**: Datadog の **US3** サイトを使用している場合、Azure ポータルから [Datadog リソースメソッド][1] を使用して Datadog Azure Native インテグレーションをセットアップしている可能性があります。Cloud Cost Management をサポートするには、[アプリ登録を作成][2] する必要があります。


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /ja/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Azure インテグレーションを構成する {#configure-the-azure-integration}
[セットアップと構成][3] に移動し、Azure アカウントを追加し、Azure インテグレーションを構成する手順に従います。

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/azure_terraform_setup.png" alt="スコープとエクスポートの詳細を構成するために展開されたステップ 1 とステップ 2 が表示されている、Terraform オプションが選択された CCM セットアップページ。" style="width:100%" >}}

### スコープタイプを選択する {#select-scope-type}

ドロップダウンを使用して、アカウントのスコープタイプを選択します。CCM は、請求アカウント、サブスクリプション、およびリソースグループのスコープタイプをサポートします。

### 作成するリソースを選択する {#select-the-resources-to-create}

Terraform の構成は、既存の Azure リソースに応じて 3 つのセットアップをサポートしています。

* **新しいセットアップ**: {{< ui >}}Create storage account and container{{< /ui >}} を選択して、ストレージアカウント、コンテナ、およびコストエクスポートを作成します。
* **既存のストレージアカウントとコンテナ**: {{< ui >}}Create storage account and container{{< /ui >}} の選択を解除し、{{< ui >}}Create cost exports{{< /ui >}} を選択して、既存のストレージを使用しつつ新しいコストエクスポートを作成します。
* **既存のストレージアカウント、コンテナ、およびコストエクスポート**: 両方のオプションの選択を解除して、既存のストレージとコストエクスポートを使用します。

### スコープとエクスポートの詳細を構成する {#configure-the-scope-and-export-details}

構成のために以下の詳細を入力します。

* {{< ui >}}Billing account or Subscription ID{{< /ui >}}: ステップ 1 で選択されたスコープに応じた、関連する請求アカウント ID またはサブスクリプション ID。
* {{< ui >}}Resource group name{{< /ui >}}: 選択されたスコープ内にある既存のリソースグループの名前。Terraform のセットアップには、既存のリソースグループが必要です。
* {{< ui >}}Location{{< /ui >}}: リソースグループの Azure ロケーション。例: `East US 2`。
* {{< ui >}}Storage account and container name{{< /ui >}}: 作成するために選択されたリソースに応じた、新規または既存のストレージアカウントとコンテナの名前。
* {{< ui >}}Actual cost export name and path{{< /ui >}}: 実際のコストエクスポートの名前とパス。
* {{< ui >}}Amortized cost export name and path{{< /ui >}}: amortized コストエクスポートの名前とパス。
  * **注:** 次のプレフィックス形式はサポート対象外: 空白、`/` で始まるもの (`/` や `/cost` など)、または `/` で終わるもの (`cost/` など)。中間に `/` を含むプレフィックスはサポートされています (`cost/hourly` など)。

### 生成された Azure リソースの Terraform HCL をコピーし、変更を適用する {#copy-generated-azure-resource-terraform-hcl-and-apply-changes}

ステップ 2 のフィールドが完了すると、ステップ 3 が有効になり、生成された Terraform HCL が表示されます。指示に従い、このコードを使用して Terraform 構成ファイルをセットアップします。CCM に戻ってコストエクスポートを構成する前に、`terraform plan` または `terraform apply` を実行中に表示される問題を解決します。

### Azure コンソールにアクセスしてエクスポートを構成する {#access-azure-console-to-configure-exports}

{{< img src="cloud_cost/setup/azure_toggle_file_partitioning.png" alt="両方のエクスポートに対してファイルパーティショニングをオンにする" style="width:50%" >}}

Azure コンソールリンクを開いて、コストエクスポートの場所を確認します。必要に応じて、現在のスコープをエクスポートに適したものに変更します。actual エクスポートと amortized エクスポートの両方について、それらを選択し、{{< ui >}}Edit{{< /ui >}} をクリックして、まだ有効になっていない場合はファイルパーティショニングをオンにします。

{{< img src="cloud_cost/run_now.png" alt="エクスポートサイドパネルの [Run Now] ボタンをクリックして、エクスポートを生成する" style="width:50%" >}}

ファイルパーティショニングの変更を保存し、{{< ui >}}Run Now{{< /ui >}} をクリックします。両方のエクスポートの実行が成功したら、CCM に戻ります。

### 生成された Datadog HCL をコピーし、変更を適用する {#copy-generated-datadog-hcl-and-apply-changes}

{{< ui >}}Apply Datadog Terraform HCL{{< /ui >}} ステップの指示に従います。CCM に戻ってアカウント作成を確認する前に、`terraform plan` または `terraform apply` を実行中に表示される問題を解決します。

{{% /tab %}}

{{% tab "手動" %}}

{{< img src="cloud_cost/setup/azure_manual_setup.png" alt="スコープタイプを構成して既存のエクスポートを選択するために展開されたステップ 1 とステップ 2 が表示されている、手動オプションが選択された CCM セットアップページ。" style="width:100%" >}}

### コストエクスポートを生成する {#generate-cost-exports}

**actual** および **amortized** の 2 つのデータタイプについて、エクスポートを生成する必要があります。Datadog では、両方のエクスポートに同じストレージコンテナを使用することを推奨しています。

1. Azure ポータルの {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Cost Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} にある [Cost Management | Configuration][5] に移動し、{{< ui >}}Exports{{< /ui >}} をクリックします。
  {{< img src="cloud_cost/azure_export_path.png" alt="ナビゲーションの [エクスポート] オプションが強調表示されている Azure ポータル" style="width:100%" >}}
2. 検索フィルターの横にあるエクスポートスコープを選択します。

   **注:** スコープは {{< ui >}}billing account{{< /ui >}}、{{< ui >}}subscription{{< /ui >}}、または {{< ui >}}resource group{{< /ui >}} でなければなりません。
3. スコープを選択したら、{{< ui >}}Schedule export{{< /ui >}} をクリックします。

   {{< img src="cloud_cost/azure_exports_page.png" alt="エクスポートスコープとスケジュールボタンが強調表示されている Azure ポータル" style="width:100%" >}}

4. {{< ui >}}Cost and usage (actual + amortized){{< /ui >}} テンプレートを選択する
    {{< img src="cloud_cost/azure_new_export.png" alt="テンプレートと手動オプションが強調表示された新しいエクスポートページ" style="width:100%" >}}

5. 各エクスポートで {{< ui >}}Edit{{< /ui >}} をクリックし、以下の詳細を確認します。
    - 頻度: {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    - データセットバージョン:
      - サポートされるバージョン: `2021-10-01`、`2021-01-01`、`2020-01-01`
      - サポートされないバージョン: `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="メトリクス: Actual、エクスポートタイプ: Daily および Dataset Version のエクスポートの詳細" style="width:100%" >}}

6. 新しいエクスポートの「エクスポートプレフィックス」を入力します。たとえば、既存のエクスポートとの競合を避けるために `datadog` と入力します。

7. {{< ui >}}Destination{{< /ui >}} タブで、以下の詳細を選択します。
    - ストレージタイプとして {{< ui >}}Azure blob storage{{< /ui >}} を選択します。
    - エクスポートのためのストレージアカウント、コンテナ、およびディレクトリを選択します。
        - **注:** これらのフィールドには `.` のような特殊文字を使用しないでください。
        - **注:** 請求エクスポートは任意のサブスクリプションに保存できます。複数のサブスクリプションのエクスポートを作成する場合、Datadog はそれらを同じストレージアカウントに保存することを推奨しています。エクスポート名は一意でなければなりません。
    - 形式として {{< ui >}}CSV{{< /ui >}} または {{< ui >}}Parquet{{< /ui >}} を選択します。
    - 圧縮タイプを選択します。{{< ui >}}CSV{{< /ui >}} の場合: {{< ui >}}Gzip{{< /ui >}} および {{< ui >}}None{{< /ui >}} がサポートされます。{{< ui >}}Parquet{{< /ui >}} の場合: {{< ui >}}Snappy{{< /ui >}} および {{< ui >}}None{{< /ui >}} がサポートされます。
    - {{< ui >}}File partitioning{{< /ui >}} がチェックされていることを確認します。
    - {{< ui >}}Overwrite data{{< /ui >}} がチェックされていないことを確認します。
        - **注:** Datadog では {{< ui >}}Overwrite data{{< /ui >}} 設定はサポートされていません。設定が以前にチェックされていた場合は、ディレクトリ内のファイルをクリーンアップするか、別のディレクトリに移動してください。

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="ファイルパーティショニングおよびデータの上書き設定を含むエクスポート先" >}}

8. {{< ui >}}Review + create{{< /ui >}} タブで、{{< ui >}}Create{{< /ui >}} を選択します。
9. {{< ui >}}Run Now{{< /ui >}} をクリックして、最初のエクスポートを手動で生成します。続行する前に、正常に完了するまで待機します。

{{< img src="cloud_cost/run_now.png" alt="エクスポートサイドパネルの [Run Now] ボタンをクリックして、エクスポートを生成する" style="width:50%" >}}

### Datadog がエクスポートにアクセスできるようにする {#provide-datadog-access-to-your-exports}
エクスポートが保存されているストレージアカウントへの読み取りアクセス権を Datadog に付与します。

{{% collapse-content title="請求アカウント" level="h4" %}}

1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. {{< ui >}}Access Control (IAM){{< /ui >}} タブを選択し、{{< ui >}}Add{{< /ui >}} をクリックします。
5. {{< ui >}}Add role assignment{{< /ui >}} を選択します。
6. {{< ui >}}Storage Blob Data Reader{{< /ui >}} を選択し、{{< ui >}}Next{{< /ui >}} をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - {{< ui >}}Select members{{< /ui >}} をクリックし、App Registration の名前を選んで、{{< ui >}}Select{{< /ui >}} をクリックします。**注**: App Registration がリストに表示されない場合は、名前の入力を開始すると UI が更新され、利用可能な場合に表示されます。
    - {{< ui >}}Review + assign{{< /ui >}} を選択します。

エクスポートが別のコンテナに入っている場合は、他のコンテナについて手順 1〜7 を繰り返します。

{{% /collapse-content %}} 
{{% collapse-content title="サブスクリプションとリソースグループ" level="h4" %}}
1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. {{< ui >}}Access Control (IAM){{< /ui >}} タブを選択し、{{< ui >}}Add{{< /ui >}} をクリックします。
5. {{< ui >}}Add role assignment{{< /ui >}} を選択します。
6. {{< ui >}}Storage Blob Data Reader{{< /ui >}} を選択し、{{< ui >}}Next{{< /ui >}} をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - {{< ui >}}Select members{{< /ui >}} をクリックし、App Registration の名前を選んで、{{< ui >}}Select{{< /ui >}} をクリックします。
    - {{< ui >}}Review + assign{{< /ui >}} を選択します。

エクスポートが別のコンテナに入っている場合は、他のコンテナについて手順 1〜7 を繰り返します。
{{% /collapse-content %}}

### コストマネジメントリーダーへのアクセスを構成する {#configure-cost-management-reader-access}
**注:** スコープが {{< ui >}}Billing Account{{< /ui >}} の場合、このアクセスは構成する必要はありません。

1. [サブスクリプション][1] に移動し、サブスクリプションの名前をクリックします。
2. {{< ui >}}Access Control (IAM){{< /ui >}} タブを選択します。
3. {{< ui >}}Add{{< /ui >}} をクリックし、{{< ui >}}Add role assignment{{< /ui >}} をクリックします。
4. {{< ui >}}Cost Management Reader{{< /ui >}} を選択し、{{< ui >}}Next{{< /ui >}} をクリックします。
5. これらの権限をアプリ登録に割り当てます。

これにより、Microsoft Cost Management に対して定期的にコスト計算を行うことができ、完全なコスト精度を確保する上で役立ちます。

**注**: Datadog でデータが安定するまでに、セットアップ後最大 48～72 時間かかることがあります。

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}



**注**: アプリ登録に対して適切な権限があるにもかかわらず、ネットワークが Datadog の Webhook IP をブロックしている場合、権限に関連しているように見えるエラーが発生することがあります。

これを解決するには、`Webhooks` セクション (`https://ip-ranges.`) にアクセスして、Datadog の Webhook IP をネットワークの許可リストに追加してください{{< region-param key="dd_site" code="true" >}}。

### Datadog で Cloud Cost を構成する {#configure-cloud-cost-in-datadog}
[セットアップと構成][3] に移動し、手順に従います。

### EA から MCA にエクスポートを移行する {#migrate-exports-from-an-ea-to-an-mca}

Azure は、Enterprise Agreement (EA) から Microsoft Customer Agreement (MCA) へのコストエクスポート定義を自動的に移行しません。詳細については、Microsoft の [MCA オンボーディングドキュメント][15] を参照してください。

以下のプロセスでは、請求アカウント、サブスクリプション、またはリソースグループのスコープを使用する Datadog 構成の過去の EA データが保持されます。

1. actual および amortized EA エクスポートの両方について、以下の設定を記録します。
   * エクスポート名 (大文字と小文字の区別あり)
   * ストレージアカウント
   * ストレージコンテナ
   * ストレージディレクトリおよびエクスポートプレフィックス
   * データセットのバージョン、形式、および圧縮タイプ
1. 最終的な EA 期間のエクスポートが実行された後、スケジュールされた EA エクスポートを無効にしますが、その定義は保持してください。EA および MCA のスケジュールされたエクスポートが同時に同じ宛先に書き込まれないようにしてください。
1. Datadog の Azure Cloud Cost Management 構成は有効なまま変更しないでください。請求アカウントスコープの場合、Datadog は EA ID を保持します。
1. MCA がアクティブになった後、Terraform または Azure ポータルを使用して、対応する MCA スコープで actual および amortized エクスポートを再作成してください。EA エクスポートから記録したエクスポート名、ストレージアカウント、コンテナ、ディレクトリ、およびプレフィックスを使用してください。
   * Terraform の場合は、[Terraform セットアップフロー][19] に従い、Azure リソース HCL の手順を進めてください。新しい Datadog HCL を適用したり、既存の Cloud Cost Management 構成を置き換えたりしないでください。
   * Azure ポータルの場合は、[手動コストエクスポートの手順][17] に従ってください。

Datadog は既存の宛先から過去の EA ファイルを読み込み続け、同じコスト履歴に MCA データを追加します。

<div class="alert alert-warning">
<strong>MCA スコープから EA の日付をバックフィルしないでください</strong>
<p>MCA エクスポートには、以前の EA からのコストは含まれません。EA の日付範囲に対して 1 回限りの MCA エクスポートを実行すると、共有宛先に新しい空白のマニフェストが書き込まれる可能性があります。Datadog は各月の最新のエクスポートを読み取るため、空白のマニフェストによって以前に取り込まれた EA データがゼロになる可能性があります。</p>
</div>

EA から MCA への移行後にデータをバックフィルするには、要求された日付をカバーする契約を使用してください。

* MCA 発効日より前の日付については、以前の EA スコープから 1 回限りの actual および amortized エクスポートを実行してください。
* MCA 発効日以降の日付については、MCA スコープから 1 回限りの actual および amortized エクスポートを実行してください。

以前の EA スコープが利用できない場合は、Microsoft サポートに連絡して履歴エクスポートを要求してください。エクスポート名や宛先を変更した場合、または Datadog 構成を削除して再作成した場合は、[Datadog サポート][16] に連絡してください。Datadog サポートが構成を確認するまで、追加の 1 回限りまたはスケジュールされたエクスポートを作成しないでください。

### 履歴データの取得 {#getting-historical-data}

Azure は、エクスポートを作成した月からコストデータをエクスポートします。Datadog は、これらのエクスポートから最大 15 か月分の利用可能な履歴コストデータを自動的に取り込みます。Azure コストエクスポート UI を使用して、最大 12 か月分の Azure コストデータを手動でバックフィルできます。

**注**: EA から MCA への移行を行った場合は、履歴エクスポートを実行する前に [移行手順][18] に従ってください。

1. 上記の**セットアップ**および**Datadog での Cloud Cost の構成**セクションの手順を完了してください。
1. バックフィルプロセスを開始する前に、統合がエンドツーエンドで機能していることを確認するため、コストデータが Datadog に表示されるまで最大 24 時間待機してください。**注:** すでにセットアップが完了しており、Datadog にコストデータが表示されている場合は、以下のバックフィル手順に直接進むことができます。
1. 各暦月について、**actual** レポートと **amortized** レポートを手動でエクスポートします。例: 2025 年 6 月の場合:
    1. エクスポートを編集する
    2. エクスポートタイプを {{< ui >}}One-time export{{< /ui >}} に変更する
    3. {{< ui >}}From{{< /ui >}} を 2025-06-01 に設定する**注:**これは月の初日でなければなりません。
    4. {{< ui >}}End{{< /ui >}}を 2025-06-30 に設定する**注:**これは月の最終日でなければなりません。
    5. エクスポートを保存する**注:** これによりエクスポートが自動的に実行されます
    6. エクスポートの実行が完了するまで待つ
1. **actual** と **amortized** の両方のエクスポートを元の状態に戻し、日次エクスポートを再開します。
    1. エクスポートを編集する
    2. エクスポートタイプを {{< ui >}}Daily export of month-to-date costs{{< /ui >}} に変更する
    3. エクスポートを保存する

Datadog はこのデータを自動的に検出して取り込みます。データは 24 時間以内に Datadog に表示されるはずです。

[Microsoft API][6] を使用するか、[Microsoft へのサポートチケット][7] を作成して、ストレージアカウントに履歴データを作成することもできます。ファイル構造とパーティショニングがスケジュールされたエクスポートの形式に従っていることを確認してください。

### コストタイプ {#cost-types}

インジェストしたデータは、以下のコストタイプで可視化することができます。

| コストタイプ            | 説明           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | 適用される割引率に基づくコストと、割引期間中の使用量に応じたプリペイドの配分 (発生主義)。|
| `azure.cost.actual` | 使用時に請求される金額で表示されるコスト (現金主義)。実際のコストには、プライベート割引、リザーブドインスタンスやセービングプランの割引が別の料金タイプとして含まれています。|
| `azure.cost.discounted.ondemand` | 個別に交渉された割引後の、Azure が提供するリストレートに基づくコスト。真のオンデマンドコストを取得するには、このメトリクスを (1 - <negotiated_discount>) で割ります。たとえば、すべての Azure 製品で 5% の一律割引がある場合、このメトリクスを .95 (1-.05) で割ると、実際のオンデマンド価格が得られます。|

### すぐに使えるタグ {#out-of-the-box-tags}

Datadog は、複数のソースからのタグで Azure コストデータを自動的に強化します。コストデータにタグがどのように適用されるかの包括的な概要については、[タグ][12] を参照してください。

以下のすぐに使えるタグは、[使用量コストレポート][9] から派生しており、コストデータの発見と理解を容易にします。

| タグ名                         | タグの説明       |
| ---------------------------- | ----------------- |
| `accountname` | 行項目に関連付けられたアカウント名。|
| `accountownerid` | 行項目に関連付けられた所有者の ID。|
| `billingaccountid` | 行項目に関連付けられた請求アカウントの ID。|
| `billingaccountname` | 行項目に関連付けられた請求アカウントの名前。|
| `billingcurrency` | 請求アカウントに関連付けられた通貨。|
| `billingperiod` | 料金の請求期間。|
| `billingperiodenddate` | 請求期間の終了日。|
| `billingperiodstartdate` | 請求期間の開始日。|
| `billingprofileid` | Enterprise Agreement エンロールメントの一意の識別子。|
| `billingprofilename` | Enterprise Agreement エンロールメントの名前。|
| `chargetype` | 行項目をカバーする料金の種類 (`Usage`、`Purchase`、または `Refund`)。|
| `consumedservice` | 行項目に関連付けられたサービスの名前。|
| `costcenter` | コスト追跡のためにサブスクリプションに対して定義されたコストセンター。|
| `costinbillingcurrency` | クレジットや税金を適用する前の請求通貨でのコスト。|
| `costinpricingcurrency` | クレジットや税金を適用する前の価格設定通貨でのコスト。|
| `currency` | 請求アカウントに関連付けられた通貨。|
| `date` | 料金の利用日または購入日。|
| `effectiveprice` | 期間のブレンド単価。ブレンド価格は、数量の増加に伴って価格が下がる段階的なティアリングなど、単価の変動を平均化したものです。|
| `exchangeratedate` | 為替レートが設定された日付。|
| `exchangeratepricingtobilling` | 価格設定通貨のコストを請求通貨に換算するために使用される為替レート。|
| `frequency` | 料金が繰り返し発生するかどうかを示します。料金は、1 回限り (`OneTime`)、月次または年次で繰り返し (`Recurring`)、または使用量に基づく (`Usage`) 可能性があります |
| `InvoiceId` | 請求書 PDF に記載されている一意のドキュメント ID。|
| `invoicesectionid` | MCA 請求書セクションの ID。|
| `invoicesectionname` | Enterprise Agreement (EA) 部門の名前。|
| `isazurecrediteligible` | `true` 料金が Azure クレジットを使用して支払う対象である場合。|
| `location` | リソースが実行されているデータセンターの場所。|
| `metercategory` | この使用量が属する最上位サービス (例: `Networking`)。|
| `meterid` | メーターの一意の ID。|
| `metername` | 行項目の使用量の詳細 (例: `L8s v2` または `General Purpose Data Stored`)。|
| `meterregion` | 場所に基づいて価格が設定されるサービスのためのデータセンターの場所 (例: `West US 2`)。`resourcelocation` を使用して、`N/A` なしで場所データを表示します。|
| `metersubcategory` | メーターのサブ分類カテゴリの名前 (例: `General Purpose - Storage`)。`metername` または `metercategory` を使用して、`N/A` なしで最上位の分類を表示します。|
| `offerid` | 購入したオファーの名前。|
| `partnumber` | 特定のメーター価格を取得するために使用される ID。|
| `planname` | マーケットプレースを通じて購入された場合のマーケットプレースプラン名。|
| `PreviousInvoiceId` | この行項目が返金である場合の元の請求書への参照。|
| `PricingCurrency` | 交渉価格に基づいて評価する際に使用される通貨。|
| `pricingmodel` | 使用量の種類 (例: `Reservation`)。|
| `ProductId` | 特定の Azure 製品の識別子。|
| `productname` | VM やディスクの種類、リージョンなど、詳細レベルでの Azure 製品名。|
| `productorderid` | 製品オーダーの ID。`productname` を使用して、`N/A` なしで上位レベルの製品情報を表示します。|
| `productordername` | 製品オーダーの名前。`productname` を使用して、`N/A` なしで上位レベルの製品情報を表示します。|
| `publishername` | マーケットプレイスサービスのパブリッシャー。|
| `publishertype` | パブリッシャーの種類。Microsoft Customer Agreement アカウントの場合は `Microsoft`、Enterprise Agreement アカウントの場合は `Azure` となります。|
| `reservationid` | 購入した予約インスタンス ID。`N/A` の値が表示される場合、これらは `OnDemand` リソースであり、`pricingmodel` タグを使用して確認できます。|
| `reservationname` | 購入した予約インスタンスの名前。`N/A` の値が表示される場合、これらは `OnDemand` リソースであり、`pricingmodel` タグを使用して確認できます。|
| `resourcegroup` | リソースが含まれるリソースグループの名前。すべての料金がリソースグループにデプロイされたリソースから発生するわけではありません。|
| `resourceid` | Azure リソースの ID。|
| `resourcelocation` | リソースが実行されているデータセンターの場所 (`westus2` など)。|
| `resourcename` | リソースの名前。すべての料金がデプロイされたリソースから発生するわけではありません。|
| `resourcetype` | Azure リソースの種類。|
| `servicefamily` | サービスが属するサービスファミリー (`Compute` など)。`consumedservice` タグには、インフラストラクチャーの種類に関するより詳細な情報が含まれています。|
| `ServicePeriodEndDate` | Azure サービス期間の終了日。|
| `ServicePeriodStartDate` | Azure サービス期間の開始日。|
| `subscriptionid` | Azure サブスクリプションの ID。|
| `subscriptionname` | Azure サブスクリプションの名前。|
| `term` | 節約プランの期間を月単位で説明します (例: `12`)。|
| `unitofmeasure` | サービスの請求に関する測定単位。例えば、コンピューティングサービスは 1 時間単位で請求されます。|


#### コストと監視可能性の相関 {#cost-and-observability-correlation}

監視可能性データの文脈でコストを確認することは、インフラストラクチャーの変更がコストにどのように影響するかを理解し、コストが変動する理由を特定し、コストとパフォーマンスの両方のインフラストラクチャーを最適化するために重要です。Datadog は、監視可能性メトリクスとコストメトリクスの相関を簡素化するため、主要な Azure 製品のコストデータに `name` タグを追加します。

例えば、各 Azure VM のコストと使用状況を表示するには、`azure.cost.amortized` と `azure.vm.network_in_total` (または他の VM メトリクス) を使ってテーブルを作成し、`name` でグループ化できます。または、ストレージの使用量とコストを並べて表示するには、`metercategory:Storage` にフィルタリングし、`name` でグループ化した `azure.storage.transactions` と `azure.cost.amortized` をグラフ化します。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/ja/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[12]: /ja/cloud_cost_management/tags
[13]: /ja/api/latest/cloud-cost-management/#create-cloud-cost-management-azure-configs
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config
[15]: https://learn.microsoft.com/en-us/azure/cost-management-billing/microsoft-customer-agreement/onboard-microsoft-customer-agreement
[16]: /ja/help/
[17]: ?tab=manual#generate-cost-exports
[18]: #migrate-exports-from-an-ea-to-an-mca
[19]: ?tab=terraform