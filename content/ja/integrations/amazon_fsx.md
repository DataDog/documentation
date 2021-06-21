---
categories:
  - cloud
  - AWS
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon FSx のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_fsx/'
draft: false
git_integration_title: amazon_fsx
has_logo: true
integration_id: amazon-fsx
integration_title: Amazon FSx
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_fsx
public_title: Datadog-Amazon FSx インテグレーション
short_description: Amazon FSx のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon FSx は、Windows File Server または Lustre にスケーラブルなストレージを提供するフルマネージド型のサービスです。

このインテグレーションを有効にすると、Datadog にすべての FSx メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`FSx` をオンにします。
2. AWS FSx のメトリクスを収集するために、以下のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可                          | 説明                                                                                                                                                                                                                                             |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | FSx カスタムタグを追加するために使用されます。                                                                                                                                                                                                                    |
    | `fsx:DescribeFileSystems`               | ストレージおよびスループット容量を提供するために使用されます。                                                                                                                                                                                    |

2. [Datadog - Amazon FSx インテグレーション][4]をインストールします。


### ログの収集

Amazon FSx は、ユーザー、ロール、または AWS サービスにより実行されたすべての FSx 操作を追跡する AWS CloudTrail と統合します。 
Datadogの [CloudTrail インテグレーション][5]を有効にすると、AWS アカウントのすべての FSx API 呼び出しを追跡できます。

### メトリクス
{{< get-metrics-from-git "amazon_fsx" >}}


### イベント

Amazon FSx インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon FSx インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/account/settings#integrations/amazon-fsx
[5]: https://docs.datadoghq.com/ja/integrations/amazon_cloudtrail/#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/