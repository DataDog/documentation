---
aliases:
  - /ja/integrations/awscloudtrail/
  - /ja/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
categories:
  - cloud
  - monitoring
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: 不審な AWS アカウントアクティビティを警告
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cloudtrail/'
git_integration_title: amazon_cloudtrail
has_logo: true
integration_title: Amazon CloudTrail
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Datadog-Amazon CloudTrail インテグレーション
short_description: 不審な AWS アカウントアクティビティを警告
version: '1.0'
---
## 概要

AWS CloudTrail は、AWS アカウントの監査証跡を提供します。Datadog は、この監査証跡を読み取ってイベントを作成します。Datadog のイベントストリームでイベントを検索し、ダッシュボードでの関連付けに使用します。次に CloudTrail イベントの例を示します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="cloudtrail event" responsive="true" popup="true">}}

他の AWS サービスについては、[Amazon Web Services インテグレーションのページ][1]を参照してください

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### イベント収集

1. Amazon Cloudtrail のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][2]に追加します。CloudTrail ポリシーの詳細については、[AWS Web サイトのガイド][3]を参照してください。CloudTrail の証跡にアクセスするには、S3 のアクセス許可もいくつか必要です。**このアクセス許可は CloudTrail バケットでのみ必要です**。Amazon S3 ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可              | 説明                                                     |
    |-----------------------------|-----------------------------------------------------------------|
    | `cloudtrail:DescribeTrails` | 証跡と、証跡が格納される S3 バケットをリストします。      |
    | `cloudtrail:GetTrailStatus` | 非アクティブな証跡をスキップします。                                        |
    | `s3:ListBucket`             | CloudTrail バケット内のオブジェクトをリストして、有効な証跡を取得します。|
    | `s3:GetBucketLocation`      | 証跡をダウンロードするバケットのリージョンを取得します。               |
    | `s3:GetObject`              | 有効な証跡を取得します。                                     |

   このポリシーを既存のメイン Datadog IAM ポリシーに追加します。

    ```json
    {
      "Sid": "AWSDatadogPermissionsForCloudtrail",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
      },
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
        "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
      ]
    }
    ```

    **注**: プリンシパル ARN は、[メイン AWS インテグレーションのインストールプロセス中][5]にリストされる ARN です。(新しいポリシーを追加するのではなく) ポリシーを更新する場合、`SID` または `Principal` は必要ありません。

2. [Datadog - AWS Cloudtrail インテグレーション][6]をインストールします。
    インテグレーションタイルで、Datadog のイベントストリームに標準の優先度 (デフォルトのフィルター) で表示するイベントのタイプを選択します。Amazon Web Services タイルで構成したアカウントもここに表示されます。ここに記載されていないイベントを確認したい場合は、[Datadog のサポートチーム][7]までお問い合わせください。

### ログの収集
#### Cloudtrail ログの有効化

証跡を定義する場合は、ログの書き込み先になる S3 バケットを選択します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Cloudtrail logging" responsive="true" responsive="true" popup="true" style="width:70%;">}}

#### Datadog へのログの送信

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで Cloudtrail ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
{{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" popup="true" style="width:70%;">}}
    Cloudtrail ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
{{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" responsive="true" popup="true" style="width:70%;">}}

終了すると、[Datadog のログエクスプローラー][9]にログが表示されます。

## 収集データ
### メトリクス
AWS Cloudtrail インテグレーションには、メトリクスは含まれません。

### イベント
AWS Cloudtrail インテグレーションは、AWS Cloudtrail の監査証跡に基づいて多種多様なイベントを作成します。すべてのイベントは、Datadog の[イベントストリーム][10]で `#cloudtrail` でタグ付けされます。

### サービスのチェック
AWS Cloudtrail インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
### CloudTrail タイルが表示されません。または、アカウントがリストされません

まず [Amazon Web Services タイル][11]を構成する必要があります。その後、CloudTrail タイルを構成することができます。


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_cloudtrail.html
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/ja/graphing/event_stream
[11]: https://docs.datadoghq.com/ja/integrations/aws


{{< get-dependencies >}}