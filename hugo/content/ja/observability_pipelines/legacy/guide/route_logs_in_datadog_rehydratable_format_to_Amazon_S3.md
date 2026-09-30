---
aliases:
- /ja/observability_pipelines/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: ドキュメント
  text: 観測可能性パイプラインのデータの操作
- link: /logs/log_configuration/archives/
  tag: ドキュメント
  text: Log Archives について
- link: /logs/log_configuration/rehydrating/
  tag: ドキュメント
  text: ログアーカイブのリハイドレートについて
title: (レガシー) Datadog で再ハイドレート可能な形式でログを Amazon S3 にルーティングする
---

<div class="alert alert-danger">Observability Pipelines の Datadog Archives 宛先はベータ版です。</div>

## 概要

Observability Pipelines の `datadog_archives` 宛先は、ログを Datadog で再ハイドレート可能な形式にフォーマットし、[Log Archives][1] にルーティングします。これらのログは Datadog に取り込まれず、直接アーカイブにルーティングされます。必要なときに Datadog でアーカイブを再ハイドレートし、分析や調査が行えます。

Observability Pipelines の Datadog Archives 宛先は以下の場合に有用です。
- 大量のノイズを含むログがあるが、Log Management で臨時にインデックス化する必要がある場合。
- 保持ポリシーがある場合。

例えば、最初の図では、一部のログはアーカイブのためにクラウドストレージに送信され、他のログは分析と調査のために Datadog に送信されています。しかし、クラウドストレージに直接送信されたログは、調査が必要なときに Datadog で再ハイドレートできません。

{{< img src="observability_pipelines/guide/datadog_archives/op-cloud-storage.png" alt="クラウドストレージと Datadog にログが送られる図。" >}}

2 番目の図では、最初の図でクラウドストレージに送られたログを含むすべてのログが Datadog Agent に送られています。しかし、2 番目のシナリオでは、ログが Datadog に取り込まれる前に、`datadog_archives` 宛先がクラウドストレージに直接送られるはずだったログをフォーマットして Datadog Log Archives にルーティングします。Log Archive のログは必要に応じて Datadog で再ハイドレートできます。

{{< img src="observability_pipelines/guide/datadog_archives/op-datadog-archives.png" alt="すべてのログが Datadog に送られる図。" >}}

このガイドでは、以下の方法を説明します。

- [Log Archive を構成する](#configure-a-log-archive)
- [`datadog_archives` 宛先を構成する](#configure-the-datadog_archives-destination)
- [アーカイブを再ハイドレートする](#rehydrate-your-archive)

`datadog_archives` は Observability Pipelines Worker バージョン 1.5 以降で利用可能です。

## ログアーカイブを構成する

### Amazon S3 バケットを作成する

{{< site-region region="us,us3,us5" >}}
[AWS 料金][1]を参照して、リージョン間データ転送料金とクラウドストレージコストへの影響を確認してください。

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

1. [Amazon S3 バケット][2]に移動します。
1. **Create bucket** をクリックします。
1. バケットにわかりやすい名前を入力します。
1. バケットを公開読み取り可能にしないでください。
1. オプションで、タグを追加します。
1. **Create bucket** をクリックします。

### Worker が S3 バケットに書き込むことを許可する IAM ポリシーをセットアップする

1. [IAM コンソール][3]に移動します。
1. 左側のメニューで **Policies** を選択します。
1. **Create policy** をクリックします。
1. **Specify permissions** セクションで **JSON** をクリックします。
1. 以下のポリシーをコピーし、**Policy editor** に貼り付けます。`<MY_BUCKET_NAME>` と `<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>` を先ほど作成した S3 バケットの情報に置き換えてください。
{{< code-block lang="json">}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*"
        },
        {
            "Sid": "DatadogRehydrateLogArchivesListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
        }
    ]
}
{{< /code-block >}}
1. **Next** をクリックします。
1. わかりやすいポリシー名を入力します。
1. オプションで、タグを追加します。
1. **Create policy** をクリックします。

{{< tabs >}}
{{% tab "Docker" %}}

### IAM ユーザーを作成する

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. [IAM コンソール][1]に移動します。
1. 左側のメニューで **Users** を選択します。
1. **Create user** をクリックします。
1. ユーザー名を入力します。
1. **Next** をクリックします。
1. **Attach policies directly** を選択します。
1. 新しい IAM ユーザーに関連付けるために、先ほど作成した IAM ポリシーを選択します。
1. **Next** をクリックします。
1. オプションで、タグを追加します。
1. **Create user** をクリックします。

新しい IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY` と `AWS_SECRET_ACCESS_KEY` として保存します。

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "AWS EKS" %}}

### サービスアカウントを作成する

上記で作成したポリシーを使用するための[サービスアカウントを作成][1]します。Helm 構成では、`${DD_ARCHIVES_SERVICE_ACCOUNT}` をサービスアカウントの名前に置き換えてください。


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

### IAM ユーザーを作成する

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. [IAM コンソール][1]に移動します。
1. 左側のメニューで **Users** を選択します。
1. **Create user** をクリックします。
1. ユーザー名を入力します。
1. **Next** をクリックします。
1. **Attach policies directly** を選択します。
1. 新しい IAM ユーザーに関連付けるために、先ほど作成した IAM ポリシーを選択します。
1. **Next** をクリックします。
1. オプションで、タグを追加します。
1. **Create user** をクリックします。

新しい IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY` と `AWS_SECRET_ACCESS_KEY` として保存します。

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

### IAM ユーザーを作成する

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. [IAM コンソール][1]に移動します。
1. 左側のメニューで **Users** を選択します。
1. **Create user** をクリックします。
1. ユーザー名を入力します。
1. **Next** をクリックします。
1. **Attach policies directly** を選択します。
1. 新しい IAM ユーザーに関連付けるために、先ほど作成した IAM ポリシーを選択します。
1. **Next** をクリックします。
1. オプションで、タグを追加します。
1. **Create user** をクリックします。

新しい IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY` と `AWS_SECRET_ACCESS_KEY` として保存します。

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

### IAM インスタンスプロファイルにポリシーを関連付ける

Terraform で作成された IAM インスタンスプロファイルにポリシーを関連付けます。これは `iam-role-name` 出力で見つけることができます。

{{% /tab %}}
{{< /tabs >}}

### S3 バケットを Datadog Log Archives に接続する

1. Datadog の [Log Forwarding][4] に移動します。
1. **Add a new archive** をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログをフィルタリングして、それらのログがこのアーカイブに入らないようにするクエリを追加します。例えば、クエリ `observability_pipelines_read_only_archive` を追加します。これは、パイプラインを通過するログにそのタグが追加されていないと仮定しています。
1. **AWS S3** を選択します。
1. バケットが存在する AWS アカウントを選択します。
1. S3 バケットの名前を入力します。
1. オプションでパスを入力します。
1. 確認文をチェックします。
1. オプションで、タグを追加し、再ハイドレートのための最大スキャンサイズを定義します。詳細については、[高度な設定][5]を参照してください。
1. **Save** をクリックします。

追加情報については、[Log Archives ドキュメント][6]を参照してください。

## `datadog_archives` 宛先を構成する

`datadog_archives` 宛先は、[コンフィギュレーションファイル](#configuration-file)または[パイプラインビルダー UI](#configuration-file) を使用して構成できます。

<div class="alert alert-danger">Worker が Datadog Agent から来ていないログを取り込み、それらのログが Datadog Archives 宛先にルーティングされる場合、これらのログには<a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes">予約済み属性</a>がタグ付けされません。これは、Datadog のテレメトリーや<a href="https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes">統合サービスタグ付け</a>の利点を失うことを意味します。例えば、syslog が <code>datadog_archives</code> に送信され、そのログのステータスが予約済み属性の <code>status</code> ではなく <code>severity</code> としてタグ付けされ、ホストが予約済み属性の <code>host</code> ではなく <code>hostname</code> としてタグ付けされているとします。これらのログが Datadog で再ハイドレートされると、ログの <code>status</code> はすべて <code>info</code> に設定され、ログにはホスト名タグが付きません。</div>

### 構成ファイル

手動デプロイの場合、Datadog 用の[サンプルパイプラインコンフィギュレーションファイル][7]には、Datadog で再ハイドレート可能な形式でログを Amazon S3 に送信するためのシンクが含まれています。

{{< tabs >}}
{{% tab "Docker" %}}

サンプルパイプラインコンフィギュレーションファイルで、`AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を先ほど作成した AWS 資格情報に置き換えます。

{{% /tab %}}
{{% tab "AWS EKS" %}}

サンプルパイプラインコンフィギュレーションファイルで、`AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を先ほど作成した AWS 資格情報に置き換えます。

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

サンプルパイプラインコンフィギュレーションファイルで、`AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を先ほど作成した AWS 資格情報に置き換えます。

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

サンプルパイプラインコンフィギュレーションファイルで、`AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を先ほど作成した AWS 資格情報に置き換えます。

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

`${DD_ARCHIVES_BUCKET}` と `{DD_ARCHIVES_REGION}` のパラメーターを S3 の構成に基づいて置き換えます。

{{% /tab %}}
{{< /tabs >}}

### パイプラインビルダー UI

1. [パイプライン][8]に移動します。
1. (オプション) `datadog_archives` に送信されるすべてのログにタグを付けるために、リマップ変換を追加します。
  a. **Edit** をクリックし、次に **Add Transforms** で **Add More** をクリックします。
  b. **Remap** タイルをクリックします。
  c. コンポーネントにわかりやすい名前を入力します。
  d. **Inputs** フィールドで、この宛先に接続するソースを選択します。
  e. **Source** セクションに `.sender = "observability_pipelines_worker"` を追加します。
  f. **Save** をクリックします。
  g. パイプラインに戻ります。
1. **Edit** をクリックします。
1. **Add Destination** タイルで **Add More** をクリックします。
1. **Datadog Archives** タイルをクリックします。
1. コンポーネントにわかりやすい名前を入力します。
1. この宛先に接続するソースまたは変換を選択します。

{{< tabs >}}
{{% tab "AWS S3" %}}

7. **Bucket** フィールドに、先ほど作成した S3 バケットの名前を入力します。
8. **Service** フィールドに `aws_s3` を入力します。
9. **AWS S3** をトグルして、これらの特定の構成オプションを有効にします。
10. **Storage Class** フィールドで、ドロップダウンメニューからストレージクラスを選択します。
11. ユースケースに基づいて他の構成オプションを設定します。
12. **Save** をクリックします。

{{% /tab %}}
{{% tab "Azure Blob" %}}

7. **Bucket** フィールドに、先ほど作成した S3 バケットの名前を入力します。
8. **Service** フィールドに `azure_blob` を入力します。
9. **Azure Blob** をトグルして、これらの特定の構成オプションを有効にします。
10. Azure Blob Storage アカウントの接続文字列を入力します。
11. ユースケースに基づいて他の構成オプションを設定します。
12. **Save** をクリックします。

{{% /tab %}}
{{% tab "GCP Cloud Storage" %}}

7. **Bucket** フィールドに、先ほど作成した S3 バケットの名前を入力します。
8. **Service** フィールドに `gcp_cloud_storage` を入力します。
9. **GCP Cloud Storage** をトグルして、これらの特定の構成オプションを有効にします。
10. ユースケースに基づいて構成オプションを設定します。
11. **Save** をクリックします。

{{% /tab %}}
{{< /tabs >}}

Remote Configuration を使用している場合、UI でパイプラインへの変更をデプロイします。手動構成の場合、更新された構成をダウンロードし、Worker を再起動します。

すべての構成オプションの詳細については、[Datadog Archives リファレンス][9]を参照してください。

## アーカイブを再ハイドレートする

[アーカイブからの再ハイドレート][10]を参照して、Datadog でアーカイブを再ハイドレートし、これらのログの分析と調査を開始する手順を確認してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/archives/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /ja/logs/log_configuration/archives/#advanced-settings
[6]: /ja/logs/log_configuration/archives
[7]: /ja/observability_pipelines/legacy/setup/datadog_with_archiving#install-the-observability-pipelines-worker
[8]: https://app.datadoghq.com/observability-pipelines/
[9]: /ja/observability_pipelines/legacy/reference/sinks/#datadogarchivessink
[10]: /ja/logs/log_configuration/rehydrating/