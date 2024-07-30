---
aliases:
- /ja/logs/guide/enrichment-tables/
- /ja/logs/guide/reference-tables/
beta: true
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ルックアッププロセッサを使用して、リファレンステーブルからログをリッチ化する
- link: /logs/explorer/analytics/#filter-logs-based-on-reference-tables
  tag: ドキュメント
  text: リファレンステーブルに基づくログのフィルター
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: ドキュメント
  text: リファレンステーブルを使用して、コストデータに複数のタグを追加する
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: ブログ
  text: リファレンステーブルを使用してログにさらにコンテキストを追加する
title: リファレンステーブルでカスタムメタデータを追加する
---

<div class="alert alert-warning">
リファレンステーブル機能は現在公開ベータ版です。リファレンステーブルを定義したりクエリを作成したりしても、請求内容には影響しません。詳細については、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。
ベータ版期間中は、1 アカウントにつき 100 個のリファレンステーブルという制限があります。
</div>

## 概要

リファレンステーブルを使用すると、Datadog にすでにある情報にメタデータを結合することができます。情報のテーブルを含む CSV ファイルをアップロードすることで、顧客の詳細、サービス名と情報、または IP アドレスなどの新しいエンティティを定義することができます。エンティティは、リファレンステーブルの主キーと関連するメタデータによって表現されます。

{{< img src="integrations/guide/reference-tables/reference-table.png" alt="org id、org name、parent org、account owner、csm の列にデータが格納されたリファレンステーブル" style="width:100%;">}}

## 検証ルール

リファレンステーブルの名前と列のヘッダーは、以下の命名規則で検証され、必要に応じて自動的に更新または正規化されます。

| ルール     | 正規化 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 名前とヘッダーは重複できません。                                          | 重複した名前は列挙されます。例えば、`fileid` が名前として 2 回使用された場合、最初のインスタンスは `fileid1` に、2 番目のインスタンスは `fileid2` になります。名前またはヘッダーを列挙した際に、56 文字を超える場合は拒否され、名前を変更する必要があります。 |
| 名前とヘッダーに大文字を含めることはできません。                               | 大文字で書かれた名前は、小文字に変換されます。この変換の結果、名前が重複することがありますが、その場合は列挙されます。例えば、`Fileid` と `FileID` は両方とも `fileid` となり、それぞれ `fileid1` と `fileid2` に列挙されます。 |
| 名前とヘッダーにスペースを含めることはできません。                                          | 先頭と末尾のスペース以外のスペースは、アンダースコア `_` 文字に置き換えられます。先頭と末尾のスペースは削除されます。例えば、`customer names` は `customer_names` に置き換えられます。 |
| 名前とヘッダーは小文字で始める必要があります。                             | 大文字は小文字に変換されます。文字以外の先頭の文字は削除されます。例えば、`23Two_three` は `two_three` となります。   |
| 名前とヘッダーは、小文字のアルファベットと数字、および `_` 文字のみをサポートします。 | サポートされていない文字は、上記のルールのいずれかを破らない限り、アンダースコア `_` 文字に置き換えられます。その場合、サポートされていない文字は、それぞれのルールによって正規化されます。               |
| 名前とヘッダーは 56 文字以内にする必要があります。                                  | 正規化は行われません。56 文字以上の名前とヘッダーは拒否され、名前を変更する必要があります。 |

## リファレンステーブルを作成する

{{< tabs >}}
{{% tab "手動アップロード" %}}

**New Reference Table +** をクリックしてから、CSV ファイルをアップロードし、適切な列に名前を付けて、ルックアップのプライマリキーを定義します。

{{< img src="integrations/guide/reference-tables/enrichment-table-setup.png" alt="Define the Schema セクションで、org_id を主キーとするテーブルと、org id、org name、parent org、account owner、および csm のデータを持つ列を表示しています " style="width:100%;">}}

**注**: CSV の手動アップロードは、4MB までのファイルをサポートしています。

{{% /tab %}}

{{% tab "Amazon S3" %}}

リファレンステーブルは、Amazon S3 バケットから CSV ファイルを自動的にプルして、データを最新の状態に保つことができます。インテグレーションでは、S3 で CSV ファイルへの変更が検索され、ファイルが更新されると、リファレンステーブルが新しいデータに置き換えられます。これにより、初期リファレンステーブルが構成されると、S3 API を使用した API 更新も可能になります。

S3 からリファレンステーブルを更新するために、Datadog は [AWS インテグレーション][1]用に構成した AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順][2]で作成してください。このロールがリファレンステーブルを更新できるようにするには、次のアクセス許可ステートメントを IAM ポリシーに追加します。バケット名は、環境に合わせて編集します。

**注**: サーバーサイドの暗号化を使用する場合、Amazon S3 が管理するキー (SSE-S3) で暗号化されたリファレンステーブルのみをアップロードすることができます。

```json
{
    "Statement": [
        {
            "Sid": "EnrichmentTablesS3",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
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
### テーブルを定義する

**New Reference Table +** をクリックしてから、名前を追加し、Amazon S3 を選択し、すべてのフィールドに入力し、インポートをクリックして、ルックアップのプライマリキーを定義します。

{{< img src="integrations/guide/reference-tables/configure-s3-reference-table.png" alt="Amazon S3 タイルを選択し、AWS Account、Bucket、Path のデータを記入した upload your data セクション" style="width:100%;">}}

**注**: S3 バケットからのアップロードは、200MB までのファイルをサポートしています。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}

{{% tab "Azure ストレージ" %}}

1. まだの場合は、リファレンステーブルをインポートするストレージアカウントを保持するサブスクリプション内で、[Azure インテグレーション][1]をセットアップしてください。これには、[Datadog がインテグレーションできるアプリ登録の作成][2]を伴います。
2. Azure Portal で、リファレンステーブルファイルを保存するストレージアカウントを選択します。
3. ストレージアカウント内で、**Access Control (IAM)** に移動し、**Add** > **Add Role Assignment** を選択します。
4. **Storage Blob Data Reader** ロールを入力し、選択します。[Storage Blob Data Reader ロール][3]は、Datadog がストレージコンテナや Blob を読み込んで一覧表示できるようにするものです。
5. **Members** タブで、**+ Select members** をクリックします。ステップ 1 で作成したアプリ登録を選択します。

   {{< img src="integrations/guide/reference-tables/add_members.png" alt="Azure Portal の Members セクションで、メンバーが選択され、Name、Object ID、Type にデータが入力された状態" style="width:85%;">}}

ロールの確認と割り当てが完了したら、Azure からリファレンステーブルにインポートすることができます。Datadog で Azure の構成が更新されるまで、数分かかる場合があります。

{{< img src="integrations/guide/reference-tables/azure_storage.png" alt="新規リファレンステーブルのワークフローの Upload or import data セクションにある Azure Storage タイル" style="width:80%;">}}

詳しくは、[Azure インテグレーションドキュメント][4]を参照してください。

**注**: クラウドオブジェクトストレージからのアップロードは、200MB までのファイルをサポートしています。

[1]: https://app.datadoghq.com/integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /ja/integrations/azure/

{{% /tab %}}

{{% tab "Google Cloud ストレージ" %}}

1. Datadog で Google Cloud インテグレーションをセットアップしていない場合、またはレガシー Google プロジェクト ID ファイル (レガシープロジェクトであることは GCP インテグレーションタイルに表示されています) を使用している場合は、[Google Cloud Platform インテグレーション][1]のセットアップ手順に従ってください。これには、[Google Cloud サービスアカウント][2]を作成する必要があります。

1. Google Cloud コンソールから、**Cloud Storage** ページに移動します。

1. アクセス権を与えたいバケットを見つけてクリックします。

1. **Permissions** タブをクリックします。"View By Principals" の下にある **Grant Access** ボタンをクリックします。

1. 表示されるウィンドウで、"New principals" フィールドの下に、ステップ 1 で作成して GCP タイルに追加したサービスアカウントのメールアドレスを入力します。"Assign roles" の下で、**Storage Object Viewer** ロールを選択します。**Save** をクリックします。


{{< img src="integrations/guide/reference-tables/grant_access.png" alt="アクセスを許可する構成を示す Google Cloud コンソール" style="width:100%;" >}}

ロールの確認と割り当てが完了したら、Google Cloud からリファレンステーブルにインポートすることができます。Datadog で構成が更新されるまで、数分かかる場合があります。

{{< img src="integrations/guide/reference-tables/gcp_upload_import_ui.png" alt="新しいリファレンステーブルを作成する際に、データのアップロードまたはインポートで GCP ストレージを選択します" style="width:100%;" >}}

**注**: クラウドオブジェクトストレージからのアップロードは、200MB までのファイルをサポートしています。

[1]: /ja/integrations/google_cloud_platform/#setup
[2]: /ja/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /tab %}}
{{< /tabs >}}

このリファレンステーブルを使用して、[Lookup Processor][1] でログに属性を追加できます。

## リファレンステーブルを変更する

既存のリファレンステーブルを新しいデータで変更するには、テーブルを選択し、右上の **Update Config** をクリックします。
選択した CSV がテーブルにアップサートされます。つまり、

* 同じ主キーを持つ既存の行はすべて更新される
* すべての新しい行が追加される
* 新しいファイルに含まれない古い行はすべて削除される

テーブルが保存されると、アップサートされた行は非同期で処理され、プレビューで更新されます。更新が完了するまでには、最大で 10 分かかる場合があります。

## リファレンステーブルを削除する

リファレンステーブルを削除するには、テーブルを選択し、右上の歯車アイコンをクリックし、 **Delete Table** をクリックします。
テーブルと関連するすべての行が削除されます。

リファレンステーブルを使用している Lookup Processor がある場合、ログエンリッチメントが停止します。エンリッチメントが停止するまで、最大で 10 分かかる場合があります。

## リファレンステーブルアクティビティの監視

[監査証跡][2]または[変更イベント][3]でリファレンステーブルのアクティビティを監視することができます。特定のリファレンステーブルの監査証跡と変更イベントを表示するには、そのテーブルを選択し、**Update Config** の隣にある設定アイコンをクリックします。監査証跡を表示するには、組織の管理権限が必要です。

### 監査証跡

リファレンステーブルの監査証跡を使用して、ユーザーをトリガーとするアクションを追跡することができます。監査証跡イベントは、ユーザーが最初に CSV ファイルをアップロードまたはインポートしたとき、またはユーザーがリファレンステーブルを作成、変更、または削除したときに送信されます。

`reference_table_file` アセットタイプはインポート/アップロードのイベントを表示し、`reference_table` アセットタイプはリファレンステーブルのイベントを表示します。監査証跡は、リファレンステーブルの内容の観測可能性を提供します。

### 変更イベント

リファレンステーブルの変更イベントを使用して、自動化またはユーザートリガーによるアクションを追跡します。イベントは、クラウドファイルがユーザーまたは自動更新からインポートされたときに送信されます。イベントはユーザートリガーのアクションを追跡できますが、主にリファレンステーブルが自動的に新しい CSV ファイルを取り込む際のトリガーインポートを追跡するために使用されます。

イベントには、インポートの成功ステータス、パス、テーブル名に関する情報が含まれます。エラーが発生した場合は、エラーの種類に関する情報が提供されます。

### アラート設定

インポート中に発生したエラーについてアラートを受けるには、リファレンステーブルの変更イベントに [イベントモニター][4] を使用します。リファレンステーブルの変更イベントは `reference_tables` ソースから送信されます。

**Monitors** タブからモニターを作成するか、**New Reference Table +** の横にある設定アイコンをクリックすると、あらかじめ入力されたモニターを生成することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/#lookup-processor
[2]: /ja/account_management/audit_trail/
[3]: /ja/events/
[4]: /ja/monitors/types/event/