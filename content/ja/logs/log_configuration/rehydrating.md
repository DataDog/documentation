---
aliases:
- /ja/logs/historical-views
- /ja/logs/archives/rehydrating/
description: ログイベントをアーカイブから取得し、Datadog に戻します。
title: アーカイブからのリハイドレート
---

## 概要

Log Rehydration* を使用すると、顧客が所有している、ストレージに最適化されたアーカイブからログイベントを取得して、検索に最適化された Datadog の[ログエクスプローラー][1]に戻すことができます。これにより、古いログイベントや、インデックス化から除外されたログイベントを、Datadog を使用して分析または調査することが可能になります。

## 履歴ビュー

履歴ビューでは、アーカイブされたログイベントを時間枠やフィルターで正確にリハイドレートし、予期せぬ特定のユースケースを効率的に満たすことができます。

履歴ビューを作成するには

1. Datadog アカウントの[構成ページ][2]に移動します。
2. [**Rehydrate From Archives**][3] タブを選択します。
3. **New Historical View** をクリックします。

インデックス除外フィルターは履歴ビューには適用されないため、アーカイブからリハイドレートするときに除外フィルターを変更する必要はありません。

履歴ビューを CSV でダウンロードする場合、データは過去 90 日間に限定されます。

### 新しい履歴ビューの追加

1. ログイベントをリハイドレートする **期間を選択** します。

2. ログイベントをリハイドレートする**アーカイブを選択**します。リハイドレートできるのは、[ロールの委任を使用するよう構成された](#アクセス許可)アーカイブだけです。

3. (オプション) **スキャンサイズを見積もり**、選択したタイムフレームのアーカイブに含まれる圧縮データの総量を取得します。

4. **履歴ビューに名前を付けます**。名前の先頭は小文字にする必要があります。また、小文字、数字、`-` だけを含めることができます。

5. **クエリを入力します**。クエリの構文は、[ログエクスプローラー検索][4]の構文と同じです。リハイドレートクエリでタグ (`env:prod` や `version:x.y.z` など) を使用する場合は、ログが[タグとともにアーカイブ][5]されていることを確認してください。

6. この履歴ビューでリハイドレートされるべきログの最大数を定義します。リハイドレートの限界に達した場合、リハイドレートは停止されますが、リハイドレートされたログにアクセスすることは可能です。

7. リハイドレートされたログの保存期間を定義します (利用可能な保存期間は契約次第ですが、デフォルトは 15 日です)。

8. (オプション) @handle 構文の[インテグレーション][6]を使用して、リハイドレート完了時にトリガー通知を**通知**します。

{{< img src="logs/archives/log_rehydration_setup.png" alt="アーカイブからのリロード" style="width:75%;">}}

**注**: クエリは、期間に一致するファイルがアーカイブからダウンロードされた後に適用されます。クラウドデータ転送コストを削減するには、選択した日付範囲を減らします。

#### クエリによるリハイドレート

クエリを指定して（たとえば 1 つ以上のサービス、URL エンドポイント、カスタマー ID など）履歴ビューを作成すると、ログのリハイドレートに必要な時間と費用を節約できます。これは、リハイドレートする期間の幅が広い場合に特に便利です。作成する履歴ビューごとに最大で 10 億のログイベントをリハイドレートできます。

#### 通知

リハイドレートが開始および終了すると、イベントが自動的にトリガーされます。
これらのイベントは、[イベントエクスプローラー][7]で利用できます。

履歴ビューの作成中に、組み込みのテンプレート変数を使用して、リハイドレートの最後にトリガーされる通知をカスタマイズできます。

| 変数                      | 説明                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | リハイドレートに使用されたアーカイブの名前。                           |
| `{{from}}`                    | リハイドレートに選択された時間範囲の始まり。                    |
| `{{to}}`                      | リハイドレートに選択された時間範囲の終わり。                      |
| `{{scan_size}}`               | リハイドレート中に処理されたファイルの合計サイズ。                |
| `{{number_of_indexed_logs}}`  | リハイドレートされたログの総数。                                         |
| `{{explorer_url}}`            | リハイドレートされたログへの直接リンク。                                      |

### 履歴ビューのコンテンツの表示

#### 履歴ビューのページから

"Rehydrate from Archive" を選択すると、コンテンツをクエリできる状態になるまで履歴ビューに "pending" のマークが付けられます。

コンテンツがリハイドレートされると、履歴ビューに active のマークが表示され、クエリ列のリンクによってログエクスプローラーの履歴ビューに移動できるようになります。

#### ログエクスプローラーから

また、ログエクスプローラーのインデックスセレクタから直接履歴ビューを探すこともできます。

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="ログエクスプローラー" width="75%">}}

### 進行中の履歴ビューをキャンセルする

Rehydrate from Archives ページで進行中のリハイドレートを直接キャンセルすることで、間違った時間範囲でリハイドレートを開始したり、インデックス作成クエリで誤ってタイプミスをしたりすることを避けることができます。

すでにインデックスが作成されたログは、その履歴表示で選択された保存期間の終了までクエリ可能であり、すでにスキャンされインデックスが作成されたすべてのログは、引き続き課金されます。

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration.png" alt="進行中のリハイドレートのキャンセル" width="75%" >}}

### 履歴ビューの削除

履歴ビューは、選択した保持期間を超えるまで Datadog に残ります。または、ビューが不要になった場合は、これより早く削除することを選択できます。履歴ビューの右端にある削除アイコンを選択して確認することで、履歴ビューを削除対象としてマークできます。

1 時間後に、履歴ビューが最終的に削除されます。それまでの間なら、削除をキャンセルすることができます。

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt="履歴ビューの削除" video="true" width="75%" >}}

### 削除された履歴ビューを表示する

削除された過去 1 年分の履歴を、`View` ドロップダウンメニューで表示することができます。

{{< img src="logs/archives/log_archives_deleted_rehydrations.png" alt="履歴ビューの削除" width="75%" >}}

## アーカイブのリハイドレートの設定

### Datadog のアーカイブの定義

外部のアーカイブからデータをリハイドレートするには、外部のアーカイブを構成する必要があります。ログを外部の使用可能な場所にアーカイブするには、[こちらのガイド][8]を参照してください。

### アクセス許可

Datadog は、アーカイブからコンテンツをリハイドレートするために、アーカイブに対して読み取りのアクセス許可を必要とします。このアクセス許可は、いつでも変更できます。

{{< tabs >}}
{{% tab "Amazon S3" %}}

ログイベントをアーカイブからリハイドレートするために、Datadog は [AWS インテグレーション][1]で構成する AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順に従って作成してください][2]。このロールに対してアーカイブからのログイベントのリハイドレートを許可するには、以下のアクセス許可ステートメントを IAM ポリシーに追加する必要があります。バケット名を編集し、必要であればログアーカイブへのパスを指定してください。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogUploadAndRehydrateLogArchives",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<バケット名_1_/_バケットへのパス_任意_1>/*",
        "arn:aws:s3:::<バケット名_2_/_バケットへのパス_任意_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<バケット名_1>",
        "arn:aws:s3:::<バケット名_2>"
      ]
    }
  ]
}
```

#### ロールの委任を S3 アーカイブに追加する

Datadog では、ロールの委任を使用してアクセスを許可するよう構成されたアーカイブだけをリハイドレートできます。Datadog IAM ロールに先ほどの IAM ポリシーを含めた後で、[アーカイブコンフィギュレーションのページ][3]にある各アーカイブが、AWS アカウントとロールの正しい組み合わせで構成されていることを確認してください。

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="ロールの委任を S3 アーカイブに追加" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /ja/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog は、アーカイブのストレージアカウントのスコープを持つ Storage Blob Data Contributor ロールが割り当てられた Azure AD グループを使用して、ログイベントをリハイドレートします。このロールを Datadog のサービスアカウントに付与するには、ストレージアカウントの Access Control (IAM) ページで、[Storage Blob Data Contributor ロールを Datadog インテグレーションアプリに割り当てる][1]必要があります。

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Azure Storage からのリハイドレートには Storage Blob Data Contributor ロールが必要" style="width:75%;">}}


[1]: /ja/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

アーカイブからログイベントをリハイドレートするために、Datadog は Storage Object Viewer ロールが割り当てられたサービスアカウントを使用します。このロールを Datadog のサービスアカウントに付与するには、[Google Cloud IAM 管理者ページ][1]でサービスアカウントのアクセス許可を編集し、ロールを 1 つ追加してから、Storage > Storage Object Viewer の順に選択します。

{{< img src="logs/archives/log_archives_gcs_role.png" alt="GCS からのリハイドレートには Storage Object Viewer ロールが必要" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/logs/explorer/
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /ja/logs/explorer/search/
[5]: /ja/logs/archives/?tab=awss3#datadog-tags
[6]: /ja/integrations/#cat-notification
[7]: /ja/events/
[8]: /ja/logs/archives/