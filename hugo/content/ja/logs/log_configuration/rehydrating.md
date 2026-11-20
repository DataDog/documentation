---
aliases:
- /ja/logs/historical-views
- /ja/logs/archives/rehydrating/
description: ログイベントをアーカイブから取得し、Datadog に戻します。
further_reading:
- link: logs/archives
  tag: ドキュメント
  text: ログアーカイブのドキュメント
- link: /logs/explorer/archive_search/
  tag: ドキュメント
  text: Archive Search
title: アーカイブからのリハイドレート
---
<div class="alert alert-info">
<strong><a href="/logs/explorer/archive_search/">Archive Search</a> は、アーカイブされたログにアクセスするための推奨される方法です。</strong><br>
インデックスを作成し直さずにアーカイブから直接リアルタイムで結果をストリーミングし、スキャンされたデータだけが課金されます。プラットフォームへのフルアクセスや長期保存が必要な場合は、Archive Search の <strong>検索およびリハイドレート</strong>モードを使用してください。
</div>

## 概要{#overview}

Log Rehydration* を使用すると、顧客所有の、ストレージに最適化されたアーカイブからログイベントを取得して、Datadog の検索に最適化された[ログエクスプローラー][1]に戻すことができます。これにより、古いログイベントや、インデックスから除外されたログイベントを、Datadog を使用して分析または調査することが可能になります。

### 履歴ビュー{#historical-views}

履歴ビューを使用すると、チームはアーカイブされたログイベントを時間枠やクエリフィルターを指定してリハイドレートし、特定の予期せぬユースケースに効率的に対応できます。特定のクエリ (例: 1 つ以上のサービス、URL エンドポイント、または顧客 ID にわたる) を使用して履歴ビューを作成することで、ログのリハイドレートにかかる時間とコストを削減できます。これは、より広い時間範囲にわたってリハイドレートする場合に特に役立ちます。

**主な特徴:**
- 履歴ビューごとに最大 10 億件のログイベントをリハイドレート可能
- インデックス除外フィルターは履歴ビューには適用されないため、アーカイブからリハイドレートするときに除外フィルターを変更する必要はありません
- 履歴ビューを CSV としてダウンロードする場合、データは過去 90 日間に限定されます

## 前提条件{#prerequisites}

アーカイブからログをリハイドレートするには、事前に以下のセットアップ手順を完了する必要があります。

### アーカイブ構成{#archive-configuration}

データをリハイドレートするには、外部アーカイブが構成されている必要があります。利用可能な宛先 (Amazon S3、Azure Storage、または Google Cloud Storage) にログをアーカイブするには、[ログアーカイブ][8]を参照してください。

### 権限と認証{#permissions-and-authentication}

Datadog がコンテンツをリハイドレートするには、アーカイブから読み取るための権限が必要です。アーカイブには適切な認証が構成されている必要があります。

- **S3**: ロール委任 (IAM ロール) を使用する必要があります
- **Azure Storage**: Storage Blob Data Contributor ロールを持つ Microsoft Entra ID を使用する必要があります。
- **Google Cloud Storage**: Storage Object Viewer ロールを持つサービスアカウントを使用する必要があります。

適切な認証が設定されているアーカイブのみが、リハイドレートに使用可能です。詳細なセットアップ手順については、[クラウド固有の権限](#cloud-specific-permissions)を参照してください。

## 履歴ビューを使ったログのリハイドレート{#rehydrating-logs-with-historical-views}

1. [[Rehydration][3]] (リハイドレート) ページに移動します。
2. [{{< ui >}}New Historical View{{< /ui >}}] (新規履歴ビュー) をクリックします。
3. リハイドレートの期間を選択します。
4. ログイベントのリハイドレート元のアーカイブを選択します。[ロール委任を使用するように構成された](#permissions)アーカイブのみが、リハイドレートに使用可能です。
5. (オプション) スキャンサイズを見積もり、選択した期間のアーカイブに含まれる圧縮データの総量を取得します。
6. 履歴ビューに名前を付けます。名前の先頭は小文字にする必要があります。また、小文字、数字、および `-` 文字のみを含めることができます。
7. [ログエクスプローラーの検索構文][4] を使用してインデックス作成クエリを設定します。リハイドレートクエリでタグ (`env:prod` や `version:x.y.z` など) を使用する場合は、ログが[タグ付きでアーカイブされている][5]ことを確認してください。
8. ログの制限 (リハイドレートするログの最大数) を定義します。リハイドレートの制限に達するとログの再読み込みは停止しますが、リハイドレートされたログには引き続きアクセスできます。
9. リハイドレートされたログの保持期間を設定します。これは、リハイドレートされたログが検索可能な状態を維持する期間を定義します。利用可能な保持期間は契約に基づきます。デフォルトは 15 日間です。
10. (オプション) @handle 構文を使用して、[インテグレーション][6]からの[完了通知を構成](#rehydration-notifications)します。

リハイドレートのスキャンサイズについて詳しくは、[リハイドレートのスキャンサイズについて](#understanding-rehydration-scan-sizes)を参照してください。


## 履歴ビューの管理 {#historical-views-management}

### 履歴ビューのコンテンツの表示{#viewing-historical-view-content}

**履歴ビューページから**:
[Rehydrate from Archive] (アーカイブからりハイドレート) を選択すると、コンテンツをクエリできる状態になるまで履歴ビューに「PENDING」(保留中) のマークが付きます。

コンテンツがリハイドレートされると、履歴ビューに「ACTIVE」(アクティブ) のマークが表示され、クエリ列のリンクによってログエクスプローラーの履歴ビューに移動できるようになります。

**ログエクスプローラーから**:
ログエクスプローラーで、インデックスセレクターの {{< ui >}}Index{{< /ui >}} ファセットを開きます。検索に含める履歴インデックスを選択します。

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="ログエクスプローラー" width="90%">}}

### 進行中の履歴ビューをキャンセルする{#canceling-ongoing-historical-views}

[[Rehydration][3]] (リハイドレート) ページで進行中のリハイドレートをキャンセルして、時間範囲が間違っていたり、インデックスクエリにタイプミスがあったりするジョブを停止できます。

すでにインデックス作成済みのログは、履歴ビューで選択された保持期間が終了するまでクエリ可能です。スキャンおよびインデックス作成されたすべてのログは、引き続き課金されます。

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration_settings.png" alt="Datadog で履歴ビューの進行中のリハイドレートをキャンセルする" width="90%" >}}

### 履歴ビューの削除{#deleting-historical-views}

履歴ビューは、手動で削除を選択しない限り、選択した保持期間を超えるまで Datadog に残ります。履歴ビューを手動で削除するには、ビューの右端にある削除アイコンを選択し、操作を確定します。

履歴ビューは、削除が開始されてから 1 日後に完全に削除されます。それまでの間、チームは削除をキャンセルできます。

### 削除された履歴ビューを表示する{#viewing-deleted-historical-views}

[{{< ui >}}View{{< /ui >}}] (表示) ドロップダウンメニューを使用して、削除された過去 1 年の履歴ビューを表示することができます。

{{< img src="logs/archives/log_archives_deleted_rehydrations_settings.png" alt="削除された履歴ビューを Datadog で表示する" width="90%" >}}

## 高度な構成{#advanced-configuration}

### リハイドレート通知{#rehydration-notifications}

リハイドレートが開始および終了する時には、イベントが自動的にトリガーされます。これらのイベントは、[イベントエクスプローラー][7]で確認できます。

組み込みのテンプレート変数を使用して、リハイドレートの最後にトリガーされる通知をカスタマイズできます。

| 変数                      | 説明                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Name of the archives used for the rehydration.                           |
| `{{from}}`                    | Start of the time range selected for the rehydration.                    |
| `{{to}}`                      | End of the time range selected for the rehydration.                      |
| `{{scan_size}}`               | Total size of the files processed during the rehydration.                |
| `{{number_of_indexed_logs}}`  | Total number of rehydrated logs.                                         |
| `{{explorer_url}}`            | リハイドレートされたログへの直接リンク。                                     |

### 履歴ビューのデフォルト制限 {#default-limit-for-historical-views}

`Logs Write Archives` 権限を持つ管理者は、チーム間での Log Rehydration* の効率的な使用を確保するためにデフォルトの制御を構成できます。[{{< ui >}}Settings{{< /ui >}}] (設定) をクリックして、以下に従って構成します。

- {{< ui >}}Default Rehydration volume limit{{< /ui >}} (デフォルトのリハイドレート量制限): 履歴ビューごとにリハイドレートできるログのデフォルト数 (百万単位) を定義します。制限に達した場合、リハイドレートは自動的に停止しますが、すでにリハイドレートされたログには引き続きアクセスできます。管理者は、ビューの作成中にこの制限をオーバーライドすることも許可できます。

- {{< ui >}}Rehydration retention periods{{< /ui >}} (リハイドレートの保持期間): リハイドレートの作成時に利用可能な保持期間を選択します。選択された期間 (たとえば、3、7、15、30、45、60、90、または 180 日) のみが、Datadog でログを検索可能な期間を選択する際のドロップダウンメニューに表示されます。

### クラウド特有の権限{#cloud-specific-permissions}

アーカイブからコンテンツをリハイドレートするために、Datadog にはアーカイブを読み取る権限が必要です。この権限はいつでも変更できます。

{{< tabs >}}
{{% tab "Amazon S3" %}}

ログイベントをアーカイブからリハイドレートするために、Datadog は [AWS インテグレーション][1]で構成する AWS アカウントの IAM ロールを使用します。このロールをまだ作成していない場合は、[こちらの手順に従って作成してください][2]。そのロールに [アーカイブ権限の設定][4] のポリシーが含まれている場合は、以下のステートメントをスキップしてください。そうでない場合は、以下の権限ステートメントをそのロールの IAM ポリシーに追加してください。バケット名を編集し、必要であればログアーカイブへのパスを指定してください。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogRehydrateLogArchives",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1>",
        "arn:aws:s3:::<MY_BUCKET_NAME_2>"
      ]
    }
  ]
}
```

#### ロールの委任を S3 アーカイブに追加する{#adding-role-delegation-to-s3-archives}

Datadog は、ロールの委任を使用してアクセス権を付与するアーカイブからのリハイドレートのみをサポートしています。Datadog IAM ロールに先ほどの IAM ポリシーを含めた後で、[アーカイブ構成ページ][3]にある各アーカイブが、AWS アカウントとロールの正しい組み合わせで構成されていることを確認してください。

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="ロールの委任を S3 アーカイブに追加する" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /ja/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
[4]: /ja/logs/log_configuration/archives/?tab=awss3#set-permissions
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog は、アーカイブのストレージアカウントのスコープを持つ Storage Blob Data Contributor ロールが割り当てられた Microsoft Entra ID グループを使用して、ログイベントをリハイドレートします。このロールを Datadog のサービスアカウントに付与するには、ストレージアカウントの [Access Control (IAM)] (アクセス制御) ページで、[Storage Blob Data Contributor ロールを Datadog インテグレーションアプリに割り当て][1]ます。

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Azure Storage からのリハイドレートには、Storage Blob Data Contributor ロールが必要" style="width:75%;">}}


[1]: /ja/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

アーカイブからログイベントをリハイドレートするため、Datadog は Storage Object Viewer ロールが割り当てられたサービスアカウントを使用します。このロールを Datadog のサービスアカウントに付与するには、[Google Cloud IAM 管理者ページ][1]でサービスアカウントの権限を編集し、ロールを 1 つ追加してから {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}} の順に選択します。

{{< img src="logs/archives/log_archives_gcs_role.png" alt="GCS からのリハイドレートには、Storage Object Viewer ロールが必要" style="width:75%;">}}

{{< ui >}}Storage Object Viewer{{< /ui >}} ロールは、Datadog が推奨する構成です。組織で最小権限のカスタムロールが必要な場合、リハイドレートには以下の個別権限が必要です。

- `storage.objects.get`
- `storage.objects.list`

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}


## リハイドレートのスキャンサイズについて{#understanding-rehydration-scan-sizes}

クエリは、期間に一致するファイルがアーカイブからダウンロードされた_後で_適用されます。その結果、リハイドレートのスキャンサイズは、クエリに一致するログの数ではなく、**アーカイブから取得されるログの総容量**に基づきます。アーカイブストレージは時間ベースであるため、特定のフィルター (`service:A` など) にスコープされたクエリでも、選択した期間内のすべてのログが取得されます。これには、他のサービス (`service:A` と `service:B` など) からのログが含まれます。

クエリフィルターはデータがダウンロードされた後に適用されるため、日付範囲を短縮することが、スキャンサイズを制限し、クラウドデータ転送コストを最小限に抑える最も効果的な方法です。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /ja/logs/explorer/search/
[5]: /ja/logs/archives/?tab=awss3#datadog-tags
[6]: /ja/integrations/#cat-notification
[7]: /ja/events/
[8]: /ja/logs/archives/