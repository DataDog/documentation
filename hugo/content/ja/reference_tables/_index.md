---
aliases:
- /ja/logs/guide/enrichment-tables/
- /ja/logs/guide/reference-tables/
- /ja/integrations/guide/reference-tables
description: CSV ファイルをアップロードするか、クラウドストレージを接続して、カスタムメタデータを Datadog データと組み合わせることで、ログ、セキュリティデータ、および分析を強化します。
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ルックアッププロセッサを使用して、リファレンステーブルからログをリッチ化する
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: ドキュメント
  text: リファレンステーブルに基づくログのフィルター
- link: /sheets/#lookup
  tag: ドキュメント
  text: Sheets ルックアップ
- link: /events/pipelines_and_processors/lookup_processor/
  tag: ドキュメント
  text: イベントのルックアッププロセッサー
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: ドキュメント
  text: リファレンステーブルを使用して、コストデータに複数のタグを追加する
- link: /metrics/reference_table_joins_with_metrics/
  tag: ドキュメント
  text: メトリクスを使用したリファレンステーブルの結合について学ぶ
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: ブログ
  text: リファレンステーブルを使用してログにさらにコンテキストを追加する
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: ブログ
  text: リファレンステーブルを使用してカスタムメタデータで既存の Datadog テレメトリを強化する
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: ブログ
  text: Datadog リファレンステーブルを使用して、Cloud SIEM の検出と調査にさらなるコンテキストを付与する
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: ブログ
  text: SIEM またはログツールにルーティングする前に ServiceNow CMDB コンテキストでログをリッチ化する
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines で MSSP のログ収集と集計を簡素化する
title: リファレンステーブル
---
## 概要 {#overview}

リファレンステーブルを使用すると、Datadog にすでにある情報にメタデータを結合することができます。情報のテーブルを含む CSV ファイルをアップロードすることで、顧客の詳細、サービス名と情報、または IP アドレスなどの新しいエンティティを定義することができます。エンティティは、リファレンステーブルの主キーと関連するメタデータによって表現されます。

{{< img src="reference_tables/reference_table.png" alt="org id、org name、parent org、account owner、csm の列にデータが格納されたリファレンステーブル" style="width:100%;">}}

たとえば、次のようなことができます。

- **迅速な調査のためにログとセキュリティデータを強化する:** 顧客名、アカウントオーナー、脅威インテリジェンス、エラーコードの説明など、最新のビジネスコンテキストでログ、トレース、およびセキュリティイベントを相関させて、トラブルシューティングと分析を加速します。
- **ターゲット分析やコスト管理のためにユーザーとリソースをセグメント化する:** ユーザー層、チーム、ビジネスユニットなどの意味のあるセグメントにユーザー、顧客、またはクラウドリソースをグループ化し、Tag Pipelines などのツールを使用して、より深い製品分析と正確なコスト帰属を実現します。
- **高度なクエリとレポートのためにデータを強化する:** Sheets、DDSQL エディター、または Notebooks でリファレンステーブルから外部データを結合して、技術的な専門知識なしで複雑なクエリ、集約を実行し、カスタムレポートを作成します。

## リファレンステーブルを作成する {#create-a-reference-table}

Datadog は、インテグレーションや手動 CSV アップロードを含む次のデータソースをサポートしています。

{{< tabs >}}
{{% tab "手動アップロード" %}}

**New Reference Table +** をクリックしてから、CSV ファイルをアップロードし、適切な列に名前を付けて、ルックアップのプライマリキーを定義します。

{{< img src="reference_tables/schema_setup.png" alt="Define the Schema セクションで、org_id を主キーとするテーブルと、org id、org name、parent org、account owner、および csm のデータを持つ列を表示しています " style="width:100%;">}}

**注**: CSV の手動アップロードは、4MB までのファイルをサポートしています。

{{% /tab %}}
{{% tab "クラウドストレージ" %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

リファレンステーブルは、Amazon S3 バケットから CSV ファイルを自動的にプルして、データを最新の状態に保つことができます。インテグレーションでは、S3 で CSV ファイルへの変更が検索され、ファイルが更新されると、リファレンステーブルが新しいデータに置き換えられます。初期リファレンステーブルを一度構成しておけば、S3 API を使用した API での更新も可能です。**注**: CSV ファイルの内容に変更がない場合は、リファレンステーブルは置き換えられません。

S3 からリファレンステーブルを更新するために、Datadog は [AWS インテグレーション][1]用に構成した AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順][2]で作成してください。このロールがリファレンステーブルを更新できるようにするには、次のアクセス許可ステートメントを IAM ポリシーに追加します。バケット名は、環境に合わせて編集します。

**注**: サーバーサイド暗号化を使用する場合、Amazon S3 管理キー (SSE-S3) または AWS Key Management Service キー (SSE-KMS) で暗号化されたリファレンステーブルをアップロードできます。

```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				// Grant KMS decrypt permissions if uploading KMS-encrypted object
				// "kms:Decrypt",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
				"arn:aws:s3:::<MY_BUCKET_NAME_2>"
			]
		}
	],
	"Version": "2012-10-17"
}
```
#### テーブルを定義する {#define-the-table}

**New Reference Table +** をクリックしてから、名前を追加し、Amazon S3 を選択し、すべてのフィールドに入力し、インポートをクリックして、ルックアップのプライマリキーを定義します。

{{< img src="reference_tables/s3_table.png" alt="Amazon S3 タイルを選択し、AWS Account、Bucket、Path のデータを記入した upload your data セクション" style="width:100%;">}}

**注**: S3 バケットからのアップロードは、200MB までのファイルをサポートしています。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h4" id="azure-storage" %}}

1. まだの場合は、リファレンステーブルをインポートするストレージアカウントを保持するサブスクリプション内で、[Azure インテグレーション][1]をセットアップしてください。これには、[Datadog がインテグレーションできるアプリ登録の作成][2]を伴います。
2. Azure Portal で、リファレンステーブルファイルを保存するストレージアカウントを選択します。
3. ストレージアカウント内で、**Access Control (IAM)** に移動し、**Add** > **Add Role Assignment** を選択します。
4. **Storage Blob Data Reader** ロールを入力し、選択します。[Storage Blob Data Reader ロール][3]は、Datadog がストレージコンテナや Blob を読み込んで一覧表示できるようにするものです。
5. **Members** タブで、**+ Select members** をクリックします。ステップ 1 で作成したアプリ登録を選択します。

   {{< img src="reference_tables/add_members.png" alt="Azure Portal の Members セクションで、メンバーが選択され、Name、Object ID、Type にデータが入力された状態" style="width:85%;">}}

ロールの確認と割り当てが完了したら、Azure からリファレンステーブルにインポートすることができます。Datadog で Azure の構成が更新されるまで、数分かかる場合があります。

{{< img src="reference_tables/azure_table.png" alt="新規リファレンステーブルのワークフローの Upload or import data セクションにある Azure Storage タイル" style="width:80%;">}}

詳しくは、[Azure インテグレーションドキュメント][4]を参照してください。

**注**: クラウドオブジェクトストレージからのアップロードは、200MB までのファイルをサポートしています。

[1]: https://app.datadoghq.com/integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /ja/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h4" id="google-cloud-storage" %}}

### Google Cloud Storage {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">リファレンステーブルは、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{% /site-region %}}

1. Datadog で Google Cloud インテグレーションをセットアップしていない場合、またはレガシー Google プロジェクト ID ファイル (レガシープロジェクトであることは GCP インテグレーションタイルに表示されています) を使用している場合は、[Google Cloud Platform インテグレーション][1]のセットアップ手順に従ってください。これには、[Google Cloud サービスアカウント][2]を作成する必要があります。

1. Google Cloud コンソールから、**Cloud Storage** ページに移動します。

1. アクセス権を与えたいバケットを見つけてクリックします。

1. **Permissions** タブをクリックします。"View By Principals" の下にある **Grant Access** ボタンをクリックします。

1. 表示されるウィンドウで、"New principals" フィールドの下に、ステップ 1 で作成して GCP タイルに追加したサービスアカウントのメールアドレスを入力します。"Assign roles" の下で、**Storage Object Viewer** ロールを選択します。**Save** をクリックします。

{{< img src="reference_tables/grant_access.png" alt="アクセスを許可する構成を示す Google Cloud コンソール" style="width:100%;" >}}

ロールの確認と割り当てが完了したら、Google Cloud からリファレンステーブルにインポートすることができます。Datadog で構成が更新されるまで、数分かかる場合があります。

{{< img src="reference_tables/gcp_table.png" alt="新しいリファレンステーブルを作成する際に、データのアップロードまたはインポートで GCP ストレージを選択します" style="width:100%;" >}}

**注**: クラウドオブジェクトストレージからのアップロードは、200MB までのファイルをサポートしています。

[1]: /ja/integrations/google_cloud_platform/#setup
[2]: /ja/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="terraform" %}}

[`datadog_reference_table`][9] リソースを使用して、Infrastructure as Code としてリファレンステーブルを管理します。テーブルスキーマ、プライマリキー、およびクラウドストレージアクセスの詳細でリソースを構成します。

**注**: Terraform はクラウドストレージのアップロードと同じファイルサイズ制限をサポートしています。詳細については、[リファレンステーブルの制限](#reference-table-limits)を参照してください。

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

[Datadog API][8] を使用して、プログラムでリファレンステーブルを作成します。

[Create Reference Table エンドポイント][10]を使用して、クラウドストレージまたはローカルファイルからリファレンステーブルを作成します。
- クラウドストレージソース (S3、Azure、GCS) の場合、クラウドストレージ内の CSV ファイルを指す `access_details` を `file_metadata` で指定します。
- ローカルファイルの場合、`POST /api/latest/reference-tables/uploads` を呼び出してアップロード ID を取得し、CSV データをアップロードします。その後、`upload_id` を `file_metadata` で指定して Create Reference Table エンドポイントを呼び出します。

**注**: API はクラウドストレージのアップロードと同じファイルサイズ制限をサポートしています。詳細については、[リファレンステーブルの制限](#reference-table-limits)を参照してください。

[8]: /ja/api/latest/reference-tables/
[10]: /ja/api/latest/reference-tables/#create-reference-table

{{% /tab %}}
{{% tab "インテグレーション" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

このリファレンステーブルを使用して、[ルックアッププロセッサー][1]でログに属性を追加できます。

## 検証ルール {#validation-rules}

リファレンステーブルの名前と列のヘッダーは、以下の命名規則で検証され、必要に応じて自動的に更新または正規化されます。

| ルール     | 正規化 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 名前とヘッダーは重複できません。											| 重複した名前は列挙されます。たとえば、`fileid` が名前として 2 回使用された場合、最初のインスタンスは `fileid1` に、2 番目のインスタンスは `fileid2` になります。名前またはヘッダーを列挙した際に、56 文字を超える場合は拒否され、名前を変更する必要があります。|
| 名前とヘッダーに大文字を含めることはできません。								| 大文字で書かれた名前は、小文字に変換されます。この変換の結果、名前が重複することがありますが、その場合は列挙されます。たとえば、`Fileid` と `FileID` は両方とも `fileid` となり、それぞれ `fileid1` と `fileid2` に列挙されます。|
| 名前とヘッダーにスペースを含めることはできません。											| 先頭と末尾のスペース以外のスペースは、アンダースコア `_` 文字に置き換えられます。先頭および末尾のスペースは削除されます。たとえば、`customer names` は `customer_names` に置き換えられます。|
| 名前とヘッダーは小文字で始める必要があります。							| 大文字は小文字に変換されます。文字以外の先頭の文字は削除されます。たとえば、`23Two_three` は `two_three` になります。	|
| 名前とヘッダーは、小文字のアルファベット、数字、および `_` 文字のみをサポートします。| サポートされていない文字はアンダースコア (`_`) に置き換えられます。ただし、上記のルールのいずれかに違反する場合は、その文字は該当するルールに従って正規化されます。				|
| 名前とヘッダーは 56 文字以内にする必要があります。									| 正規化は行われません。56 文字を超える名前とヘッダーは拒否され、名前を変更する必要があります。|

## リファレンステーブルを変更する {#modify-a-reference-table}

既存のリファレンステーブルを新しいデータで変更するには、テーブルを選択し、右上の **Update Config** をクリックします。
選択した CSV がテーブルにアップサートされます。つまり、次のようになります。

* 同じ主キーを持つ既存の行はすべて更新される
* すべての新しい行が追加される
* 新しいファイルに含まれない古い行はすべて削除される

テーブルが保存されると、アップサートされた行は非同期で処理され、プレビューで更新されます。更新が完了するまでには、最大で 10 分かかる場合があります。

## リファレンステーブルをエクスポートする {#export-a-reference-table}

リファレンステーブルをエクスポートするには、テーブルを選択し、**Query in DDSQL Editor** をクリックします。そこから、[DDSQL エディター][7]を使用して CSV、Dashboard などにエクスポートできます。

{{< img src="reference_tables/query_ddsql.png" alt="Table Preview の結果の上に Query in DDSQL Editor というラベルの青いボタンが表示されます" style="width:100%;" >}}

## リファレンステーブルを削除する {#delete-a-reference-table}

リファレンステーブルを削除するには、テーブルを選択し、右上の歯車アイコンをクリックし、**Delete Table** をクリックします。
テーブルと関連するすべての行が削除されます。

リファレンステーブルを使用しているルックアップ プロセッサーがある場合、ログエンリッチメントが停止します。エンリッチメントが停止するまで、最大で 10 分かかる場合があります。

## リファレンステーブルアクティビティの監視 {#monitor-reference-table-activity}

[監査証跡][2]または[変更イベント][3]でリファレンステーブルのアクティビティを監視することができます。特定のリファレンステーブルの監査証跡と変更イベントを表示するには、そのテーブルを選択し、**Update Config** の隣にある設定アイコンをクリックします。監査証跡を表示するには、組織の管理権限が必要です。

### 監査証跡 {#audit-trail}

リファレンステーブルの監査証跡を使用して、ユーザーをトリガーとするアクションを追跡することができます。監査証跡イベントは、ユーザーが最初に CSV ファイルをアップロードまたはインポートしたとき、またはユーザーがリファレンステーブルを作成、変更、または削除したときに送信されます。

`reference_table_file` アセットタイプはインポート/アップロードのイベントを表示し、`reference_table` アセットタイプはリファレンステーブルのイベントを表示します。監査証跡は、リファレンステーブルの内容の観測可能性を提供します。

### 変更イベント {#change-events}

リファレンステーブルの変更イベントを使用して、自動化またはユーザートリガーによるアクションを追跡します。イベントは、クラウドファイルがユーザーまたは自動更新からインポートされたときに送信されます(ローカルファイルのアップロード時は変更イベントは生成されません)。イベントはユーザートリガーのアクションを追跡できますが、主にリファレンステーブルが自動的に新しい CSV ファイルを取り込む際のトリガーインポートを追跡するために使用されます。

イベントには、インポートの成功ステータス、パス、テーブル名に関する情報が含まれます。エラーが発生した場合は、エラーの種類に関する情報が提供されます。

### アラート設定 {#alerting}

インポート中に発生したエラーについてアラートを受けるには、リファレンステーブルの変更イベントに[イベントモニター][4]を使用します。リファレンステーブルの変更イベントは `reference_tables` ソースから送信されます。

**Monitors** タブからモニターを作成するか、**New Reference Table +** の横にある設定アイコンをクリックすると、あらかじめ入力されたモニターを生成することができます。

## リファレンステーブルの制限 {#reference-table-limits}
- リファレンステーブルには最大 50 列まで含めることができます
- UI 経由でアップロードできるリファレンステーブルファイルのサイズは最大 4 MB です
- クラウドバケットファイルからアップロードできるリファレンステーブルファイルのサイズは最大 200 MB です
- インテグレーションを介してアップロードできるリファレンステーブルファイルのサイズは最大 200 MB です
- 1 つの組織につき、リファレンステーブルを最大 100 個まで作成できます

これらの制限を超えるユースケースがある場合は、[サポート][5]までお問い合わせください。

## 自動更新頻度 {#automatic-update-frequency}

リファレンステーブルは、データソースに応じて自動的に更新できます。

- **クラウドファイルストレージ** (Amazon S3、Azure Storage、Google Cloud Storage): 5 分ごと
- **Integrations**: 1 時間ごと
- **CSV 手動アップロード**: 自動更新非対応

## 権限 {#permissions}

### ロールベースのアクセス {#role-based-access}
リファレンステーブルを表示するには、`reference_tables_read` 権限が必要です。リファレンステーブルを作成または変更するには、`reference_tables_write` 権限が必要です。

権限の詳細については、[RBAC のドキュメント][6]を参照してください。

### きめ細かなアクセス制御 {#granular-access-controls}
個々のテーブルへのアクセスを制限するには、表示または編集を許可するチーム、ロール、またはユーザーのリストを指定します。

{{< img src="reference_tables/granular_permissions.png" alt="テーブルのきめ細かいアクセス権限の設定をサポートする Permissions 歯車オプション" style="width:100%;">}}

1. テーブルをクリックして詳細ページを開きます。
2. 右上隅の歯車アイコンをクリックします。
3. メニューから **Permissions** を選択します。
4. [**Restrict Access**] をクリックします。
5. ドロップダウンを使用して、チーム、ロール、またはユーザーを 1 つ以上選択します。
6. **Add** をクリックします。
7. **Editor** または **Viewer** を選択します。
8. **Save** をクリックして変更を適用します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/lookup_processor/
[2]: /ja/account_management/audit_trail/
[3]: /ja/events/
[4]: /ja/monitors/types/event/
[5]: /ja/help/
[6]: /ja/account_management/rbac/permissions/#reference-tables
[7]: /ja/ddsql_editor/#save-and-share-queries