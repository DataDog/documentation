---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: ブログ
  text: Storage Monitoring を使用して、大規模なクラウドストレージを最適化およびトラブルシューティングする
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: ブログ
  text: Datadog Storage Monitoring を使用して、クラウドストレージコストを削減し、運用効率を向上させる
title: Amazon S3 のストレージ管理
---
## セットアップ {#setup}

次のいずれかの方法で Amazon S3 のストレージ管理をセットアップします。

- **CloudFormation**: AWS インテグレーションを構成し、選択したバケットで S3 インベントリを有効にし、オプションで S3 アクセスログを有効にするガイド付きのプロダクト内設定。CloudFormation スタックは、変更を AWS アカウントに適用します。
- **Terraform**: 公式の Datadog ストレージ管理 Terraform モジュールを使用して、インベントリとアクセスログをコードとして構成します。
- **手動**: AWS コンソールで S3 インベントリと必要な権限を自分で設定し、その後ストレージ管理にインベントリのリンク先を登録します。

{{< tabs >}}
{{% tab "CloudFormation" %}}

プロダクト内設定は、AWS アカウントの構成、バケットの選択および S3 インベントリとアクセスログの有効化、セットアップの完了という 3 つのステップで構成されます。CloudFormation スタックは、必要な変更を AWS アカウントに適用します。

まず、**インフラストラクチャー** > [**ストレージ管理**][1]に移動し、**ストレージ管理を試す**をクリックします。

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. AWSアカウントを構成する" level="h4" expanded=false id="datadog-ui-step1" %}}

このステップでは、メトリクスとリソース収集が有効な Datadog AWS インテグレーションをセットアップします。

1. Datadog と統合済みの**既存の AWS アカウント**を使用するか、**新しいアカウントを追加する**かを選択します。
   - 新しいアカウントの場合、CloudFormation スタックが Datadog インテグレーションロールを作成し、メトリクスとリソース収集の両方を構成します。
   - 既存のアカウントの場合、**メトリクス収集**と**リソース収集**が有効になっていることを確認します。ストレージ管理は、リソース収集を使用して S3 バケットとその既存のインベントリ構成を検出します。
2. 構成したい AWS リージョンを選択します。1 回の実行で 1 つのリージョンが構成されます。追加のリージョンごとに手順を繰り返します。

リソース収集で使用される S3 関連の権限のリストについては、AWS 統合ページの[リソース収集][2]を参照してください。

[2]: /ja/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. ストレージ管理を構成する" level="h4" expanded=false id="datadog-ui-step2" %}}

このステップでは、モニターするバケットを選択し、インベントリのリンク先を設定し、オプションでアクセスログを有効にします。

<div class="alert alert-info">
    - ソースバケット: ストレージ管理でモニターしたい S3 バケット。<br>
    - リンク先バケット: インベントリレポートを保存するバケット (AWS リージョンごとに 1 つ、アカウント間で再利用可能)。
</div>

1. **バケットの選択**: ストレージ管理でモニターしたい S3 バケットを選択します。ストレージ管理のために既に有効になっているバケットは表示されません。既存の S3 インベントリがあるバケットは事前に選択され、現在のリンク先を保持します。

2. **インベントリのリンク先バケットの設定**: 既存のインベントリ構成がないバケットの場合、毎日のインベントリレポートが配信されるリンク先バケットを選択します。既存のバケットを選択するか、新しいバケットを指定できます。Datadog は`datadog-inventories` プレフィックスにインベントリファイルを書き込みます。

   **注**: ストレージ管理には CSV インベントリ形式が必要です。CloudFormation スタックがこれを構成します。

3. **S3 アクセスログを有効にする (オプション)**: アクセスログによって、コールドデータパターン、異常なアクセス、ストレージ階層の最適化機会が明らかになります。**S3 アクセスログを有効にする**を切り替えてから次を行います。

   - アクセスログのリンク先バケットを選択します。インベントリのリンク先と同じバケットを使用できます。
   - アカウントに Datadog Log Forwarder が検出された場合、それが再利用されます。そうでない場合、CloudFormation スタックが新しい Forwarder をデプロイします。
   - ストレージ管理のためだけに使用される場合、転送されたアクセスログはインデックスなしで取り込むことができます。詳細については、[除外フィルター][3]を参照してください。

   <div class="alert alert-warning">S3 アクセスログを Datadog に転送すると、Log Management の取り込みコストが発生します。コストを最小限に抑えるため、ストレージ管理のみに使用される場合は除外フィルターを使用してログが取り込まれるもののインデックスされないようにしてください。詳細については、<a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management 料金</a>をご覧ください。</div>

4. **CloudFormation テンプレートを起動**をクリックします。AWS Quick Create スタックが開きます。バケットマッピング、リンク先プレフィックス、統合ロール名、Datadog API キー、アプリケーションキー、および Log Forwarder パラメーターが事前入力されています。

5. AWS でスタックのパラメーターを確認し、スタックを作成します。スタック: 

   - 選択された各ソースバケットで毎日の S3 インベントリを有効にします。
   - リンクバケットから S3 インベントリレポートを読み取るためにストレージ管理の IAM 権限を追加します。
   - インベントリのリンク先バケットにバケットポリシーを追加して、S3 がインベントリオブジェクトを書き込むことができるようにします。
   - 選択さたバケットで S3 サーバーアクセスログを有効にします (アクセスログが有効な場合)。
   - Datadog Log Forwarder Lambda 関数をデプロイします (アクセスログが有効で、Forwarder が存在しない場合)。

[3]: /ja/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. セットアップを完了する" level="h4" expanded=false id="datadog-ui-step3" %}}

CloudFormation スタックが AWS で完了した後、ストレージ管理に戻り、**セットアップを完了**をクリックします。

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

公式の [Datadog ストレージ管理 Terraform モジュール][1]を使用して、S3 インベントリを構成し、S3 アクセスログを転送します。モジュール:

   - AWS インテグレーション IAM ロールに必要な権限を構成します。
   - リンク先バケットパスから Datadog がインベントリファイルを読み取ることを許可するバケットポリシーを追加します。
   - Datadog Log Forwarder がすでに設定されている場合は、S3 アクセスログの収集を有効にします。

以下の例を使用する方法:
- AWS リージョンで `<AWS_REGION>` を置き換えます。
- このモジュールインスタンスのユニーク名で `<MODULE_NAME>` を置き換えます。
- Datadog AWS インテグレーション IAM ロールの名前で `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` を置き換えます。
- モニターするバケットの名前を`<SOURCE_BUCKET_1>`、`<SOURCE_BUCKET_2>`、およびその他で置き換えます。
- インベントリファイルを受け取るバケットの名前で `<DESTINATION_BUCKET_NAME>` を置き換えます。
- Datadog Forwarder Lambda 関数の名前で `<DATADOG_FORWARDER_FUNCTION_NAME>` を置き換えます (アクセスログを有効にする場合のみ必要)。

詳細なオプションについては、[モジュールのドキュメント][1]を参照してください。

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure with environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

S3 インベントリを有効にした後、最初のインベントリレポートが生成されるまで最大 24 時間かかる場合があります。インベントリが生成されていることを確認するには、AWS コンソールでリンク先バケットに移動し、指定したリンク先プレフィックスにインベントリファイルが表示されていることを確認します。

インベントリファイルが存在することを確認した後、[**ストレージ管理**][2]に移動してリンク先バケットがリストされていることを確認することにより、バケットでストレージ管理が有効になっていることを確認します。

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "手動" %}}

必要な [Amazon S3 インベントリ][206]と関連する設定を手動で設定するには、次の手順に従います。

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. リンク先バケットを作成する" level="h4" expanded=false id="manual-setup-step1" %}}

1. [S3 バケットを作成][201]して、インベントリファイルを保存します。このバケットはインベントリレポートの中央の場所として機能します。
   **注**: AWS アカウント内で生成されるすべてのインベントリファイルに対して、1 つのリンク先バケットのみを使用します。
2. リンク先バケット内にプレフィックスを作成します (オプション)。

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. バケットと統合ロールポリシーを構成する" level="h4" expanded=false id="manual-setup-step2" %}}

1. Datadog AWS インテグレーションロールがリンク先バケットに対して `s3:GetObject` および `s3:ListBucket` の権限を持っていることを確認します。これらの権限により、Datadog は生成されたインベントリファイルを読み取ることができます。

2. リンク先バケットポリシーで S3 がインベントリファイルをリンク先バケットに書き込むことが許可されていることを確認します。

      バケットポリシーの例:
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. リンク先バケットにバケットポリシーを追加するため、[Amazon S3 ユーザーガイド][202]の手順に従い、ソースバケットまたは複数のソースバケットからインベントリオブジェクト (`s3:PutObject`) をAmazon S3 が書き込めるようにします。

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. インベントリ生成を構成する" level="h4" expanded=false id="manual-setup-step3" %}}

モニターしたい各バケット:
1. AWS コンソールの [Amazon S3 バケットページ][203]に移動し、バケットを選択します。
2. バケットの**管理**タブに移動します。
3. インベントリ構成を作成****をクリックします。
4. 次の設定を構成します。
   - 構成名を設定する
   - (オプション) ソースバケットのプレフィックスを指定する
   - **オブジェクトバージョン**: Datadog は**すべてのバージョンを含める**を選択することを推奨します (非最新バージョンのメトリクスを表示するために必要です)。

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Storage Monitoring を有効にするための宛先バケットを選択する" responsive="true">}}
   - **宛先**: AWS アカウント内のインベントリファイルの共通宛先バケットを選択します。例えば、バケットの名前が `destination-bucket` の場合、`s3://your-destination-bucket` を入力します。

      **注**: 宛先バケットにプレフィックスを使用する場合は、これも追加します。
   - **頻度**: Datadog は**日単位**を選択することを推奨します。この設定により、Datadog でプレフィックスレベルのメトリクスがどれくらいの頻度で更新されるかが決まります。
   - **出力形式**: CSV
   - **ステータス**: 有効
   - **サーバー側の暗号化**: 暗号化キーを指定しない
   - 利用可能なすべての**追加メタデータフィールド**を選択します。少なくとも以下のフィールドが必要です。

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="追加メタデータフィールド。サイズ、最終更新日、マルチパートアップロード、レプリケーションステータス、暗号化、オブジェクト ACL、ストレージクラス、インテリジェントティアリング: アクセス層、ETag、および Checksum 機能がすべて選択されています。バケットキーのステータス、オブジェクト所有者、およびすべてのオブジェクトロック構成は選択されていません。" responsive="true">}}

**注**: インベントリ生成に関連するコストについては、[Amazon S3の料金][204]を確認してください。

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. S3 アクセスログを有効にする (オプション)" level="h4" expanded=false id="manual-setup-step4" %}}

リクエスト数、サーバーサイドのレイテンシー、およびコールドデータの識別を含むプレフィックスレベルのアクセスメトリクスを取得するには、ソースバケットで S3 サーバーアクセスログを有効にし、それらのログを Datadog に転送します。ステップバイステップの手順については、Amazon S3 統合ドキュメントの [S3 アクセスログの有効化][208]を参照してください。

<div class="alert alert-warning">S3 アクセスログを Datadog に転送すると、Log Management の取り込みコストが発生します。コストを最小限に抑えるため、ストレージ管理のみに使用される場合は除外フィルターを使用してログが取り込まれるもののインデックスされないようにしてください。詳細については、<a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management 料金</a>をご覧ください。</div>

[208]: /ja/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### セットアップ後の手順 {#post-setup-steps}

インベントリファイルが宛先バケットに表示され始めたら、[バケットのストレージ管理を有効にする][209]エンドポイントを呼び出して、ストレージモニタリングに登録します。

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "aws",
      "type": "cloud_provider",
      "attributes": {
        "aws": {
          "aws_account_id": "<AWS_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

上記の例を使用する方法:
- 宛先バケットを所有する 12 桁の AWS アカウント ID で `<AWS_ACCOUNT_ID>` を置き換えます。
- インベントリレポートを保持する宛先バケット名で `<DESTINATION_BUCKET_NAME>` を置き換えます。
- 宛先バケットの AWS リージョンで `<DESTINATION_BUCKET_REGION>` を置き換えます。
- インベントリファイルが書き込まれる宛先バケット内のプレフィックスで `<DESTINATION_PREFIX>` を置き換えます。プレフィックスがない場合は、空の文字列を使用します。

`200` の応答は、宛先バケットのストレージ管理が有効であることを確認します。

[209]: /ja/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### 検証 {#validation}

セットアップを確認する方法:
1. 最初のインベントリレポートが生成されるまでお待ちください (日単位のインベントリの場合は最大 24 時間)。
2.  [**インフラストラクチャー**] > [**ストレージ管理**][3]の順に移動して、**モニターバケット**が選択されている場合に、構成したバケットがエクスプローラーリストに表示されるかどうかを確認します。

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="バケットがモニタリングで有効になっていることを検証する" responsive="true">}}

### ベストプラクティス {#best-practices}

ストレージ管理のセットアップを最適化するため、これらのベストプラクティスに従います。
- **インベントリ宛先バケットのライフサイクルポリシーを構成する**: S3 インベントリレポートは毎日生成され、宛先バケットに保存されます。古いインベントリファイルが蓄積されてストレージコストが発生するのを防ぐには、3 日以上前のインベントリレポートを自動的に削除するライフサイクルポリシーを追加します。

- **S3 アクセスログのライフサイクルポリシーを構成する**: プレフィックスレベルのリクエストメトリクスの S3 アクセスログを有効にしている場合、生ログファイルが宛先バケットに蓄積されます。これらのログが Datadog に転送された後、ストレージ管理のために生のファイルが必要になることはありません。Datadog への転送後にアクセスログファイルを自動的に削除するには、ライフサイクルルールを追加します。

  **注**: 自動削除を有効にする前に、特定の期間に生の S3 アクセスログを保持することを義務付けるコンプライアンスや監査要件が組織にないことを確認してください。

- **S3 アクセスログの除外フィルターを作成する**: ストレージ管理の目的でのみ S3 アクセスログが Datadog に転送されて検索や分析のためにインデックス化する必要がない場合は、インデックス化されたログボリュームから除外するために[除外フィルター][4]を追加します。

### トラブルシューティング {#troubleshooting}

ストレージ管理のために設定したバケットのデータが表示されない場合は、[ストレージ管理設定][9]ページを使用して、すべての構成されたバケット、そのインベントリステータス、および構成エラーを確認します。このページは、実行可能な修復ステップを伴う問題を表示します。
質問がある場合は、[Datadog にお問い合わせ][1]ください。

## Bits Chat でコスト節約を特定して対策を講じる {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
ストレージ管理のための Bits Chat はプレビュー中です。このスキルを試すには、アクセスをリクエストしてください。
{{< /callout >}} 


FinOps およびエンジニアリングチームは、Bits Chat とストレージ管理を使用して S3 のコスト節約の機会を特定し、Datadog Notebooks でレポートを生成し、推奨される変更を実施できます。ストレージ管理で Bits Chat を使用するには、Bits Chat 設定で `storage` スキルを有効にします。

Bits Chat で `storage` スキルが有効になっていると、次のことが可能です。

- **最大限の節約機会を見つける**: 自然言語で質問することで、ライフサイクルの変更が最もコストを削減する可能性のあるプレフィックス、ストレージクラス、またはバケットが明らかになります。
- **Notebooks を通じてレポートを作成する**: 発見、推定される節約、およびチームがレビューして共有するための推奨アクションを要約した Datadog Notebook を生成します。
- **変更を実施する**: [Bits Code][10] を使用して、ライフサイクルポリシーの適用、より安価なストレージ階層へのオブジェクトの移行、または最も節約の可能性が高いプレフィックス内の非最新バージョンの期限切れに関するステップバイステップのガイダンスを取得します。


## インベントリメトリクスを使用して詳細な S3 の使用状況を可視化する {#visualize-granular-s3-usage-with-inventory-metrics}

以下のメトリクスを可視化するための[ストレージ管理 S3 ダッシュボードテンプレート][8]が利用可能です。ニーズに合わせて複製およびカスタマイズできます。

| メトリクス名                                            | 注目タグ                                                                                  | 説明                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`、`prefix`、`region`、`storagetype`、`extension`、`delete_marker`、`is_latest`    | プレフィックスに保存されているデータの合計 (バイト単位)。                                                                                           |
| aws.s3.inventory.average_prefix_size                   | `bucketname`、`prefix`、`region`                                                              | プレフィックス内のオブジェクトの平均サイズ (バイト単位)。                                                                                       |
| aws.s3.inventory.prefix_object_count                   | `bucketname`、`prefix`、`region`、`storagetype`、`extension`、`delete_marker`、`is_latest`    | プレフィックスに保存されているオブジェクトの合計数。                                                                                               |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`、`prefixN*`、`region`、`storagetype`、`extension`、`delete_marker`               | 階層プレフィックスレベルに集約されたオブジェクト数で、ツリーマップの可視化に使用されます。                                                      |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`、`prefixN*`、`region`、`storagetype`、`extension`、`delete_marker`               | 階層プレフィックスレベルに集約されたプレフィックスサイズで、ツリーマップの可視化に使用されます。                                                        |
| aws.s3.inventory.prefix_age_days                       | `bucketname`、`prefix`、`region`                                                              | バケットまたはプレフィックス内で最も古いオブジェクトの経過日数 (日数)。                                                                                   |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`、`prefix`、`region`、`storagetype`                                               | プレフィックス内の 128KB 未満のオブジェクトの合計サイズ (バイト単位)。ストレージ階層 (Glacier や Standard-IA など) のオーバーヘッドコストを特定するのに役立ちます。  |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`、`prefix`、`region`、`storagetype`                                               | プレフィックス内の 128KB 未満のオブジェクトの数。ストレージ階層 (Glacier や Standard-IA など) のオーバーヘッドコストを特定するのに役立ちます。                  |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`、`prefix`、`region`、`method`                                                    | プレフィックス内のオブジェクトに対するリクエストの合計数。リクエストメソッド (例: GET や PUT) で分割することもできます。Datadog で S3 アクセスログが必要です。  |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`、`prefix`、`region`、`method`                                                    | プレフィックス内のリクエストに対するサーバーの応答時間。リクエストメソッドで分割することもできます。Datadog で S3 アクセスログが必要です。                         |

  *`prefixN` は、`prefix0`、`prefix1`、`prefix2` などのプレフィックスレベルを指します。

  **注:** 回答する質問に適したメトリクスを使用してください。
  - `aws.s3.inventory.prefix_object_count` および `aws.s3.inventory.total_prefix_size` (`prefix` タグを使用) は、フォルダー内およびサブフォルダー内のすべてを含みます。特定のフォルダーの合計数またはサイズを知りたい場合にこれを使用します (例:「`logs/2024/` はどれくらいですか」)。
  - `aws.s3.inventory.prefix_object_count.levels` および `aws.s3.inventory.total_prefix_size.levels` (`prefix1`、`prefix2`、`prefix3` など)。その正確な深さのオブジェクトのみの数またはそのサイズ。これを使用して、ツリーマップを構築したり、レベル間でフォルダーサイズを比較したりします (例:「どのトップレベルのフォルダーが最も大きいですか」)。

  **注:** 最も正確なモニタリングと視覚化を行うには、すべてのオブジェクトバージョンを含めて、非最新オブジェクトに関する推奨事項やメトリクスを確認してください。


## ストレージ管理の推奨事項に基づいて最適化を実行する {#act-on-optimizations-with-storage-management-recommendations}

ストレージ管理は、インベントリデータとアクセスログを分析して、S3 ストレージコストを削減するためのプレフィックスレベルの推奨事項を提示します。これらの推奨事項は、すべてのストレージ管理顧客が利用できます。潜在的な節約は、AWS のリスト価格を使用して推定されます。[Cloud Cost Management][7] が有効になっている場合、推奨事項はCloud Cost Recommendations にも表示され、最適化による実際の節約を追跡できます。

推奨事項は毎日実行され、推奨事項がリリースされるとすぐにアカウントで自動的に更新されます。

### 前提条件 {#prerequisites}
推奨事項を確認するには、以下の前提条件があります。
1. このページの上記の手順に従って、ストレージ管理のために S3 バケットを構成します。
2. プレフィックスごとに、アクセス頻度の低いデータをより安価な階層に移動するための推奨事項を確認するには、S3 アクセスログを有効にして Datadog に転送します (Datadog Log Management の料金が適用されます)。
3. プレフィックス内の非最新バージョンを特定するための推奨事項を確認するには、「すべてのバージョン」を S3 インベントリ構成に含めます。

### 利用可能な推奨事項 {#available-recommendations}
- プレフィックス内の未アクセス S3 データを低頻度アクセスに移行する
- S3 バケットプレフィックス内の非最新バージョンのオブジェクトを期限切れにする
- 小さなファイルをプレフィックス内で統合してオブジェクトごとのストレージコストを最小限に抑える

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="ストレージ管理の推奨事項" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /ja/logs/log_configuration/indexes/#exclusion-filters
[7]: /ja/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/ja/bits_ai/bits_ai_dev_agent/