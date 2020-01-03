---
aliases:
  - /ja/integrations/amazon_vpc/
categories:
  - クラウド
  - aws
  - ログの収集
ddtype: クローラー
dependencies: []
description: AWS VPC ログを収集
doc_link: 'https://docs.datadoghq.com/integrations/amazon_vpc/'
git_integration_title: amazon_vpc
has_logo: false
integration_title: Amazon VPC
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_vpc
public_title: Datadog-Amazon VPC インテグレーション
short_description: AWS VPC ログを収集
version: 1
---
## 概要

Amazon Virtual Private Cloud (Amazon VPC) を使用すると、仮想ネットワーク内で AWS リソースを起動できます。VPC フローログは、VPC 内のネットワークインターフェイスを行き来する IP トラフィックに関する情報をキャプチャできる機能です。

## セットアップ
### インストール

Datadog で [Amazon Web Services インテグレーション][1]がセットアップされている必要があります。

### メトリクスの収集

`aws.vpc.flowlogs.*` 以外の AWS VPC メトリクスを収集するために、追加の手順は必要ありません。`aws.vpc.flowlogs.*` で始まるメトリクスは、[Datadog VPC Flow Logs][6] インテグレーションによって生成されます。フローログメトリクスの収集を有効にする方法については、以下を参照してください。

###         - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP

#### VPC フローログ記録の有効化

VPC フローログは、S3 バケットまたは Cloudwatch ロググループに送信できます。リストで監視する VPC をクリックし、画面下部の Flow Logs タブにある `Create Flow logs` を選択します。

{{< img src="integrations/amazon_vpc/flow_logs.png" alt="flow logs"  style="width:75%;" >}}

`All` フィルターを選択して、許可された接続と拒否された接続の両方を取得します。次に、適切な S3 バケットまたはロググループを選択します。

{{< img src="integrations/amazon_vpc/flow_log_creation.png" alt="flow logs creation"  style="width:75%;" >}}

**注**: Lambda がログに `vpc` ソースを自動的に設定するようにするには、S3 ファイル名または CloudWatch ロググループ名のプレフィックスとして `vpc` を指定します。

#### Datadog へのログの送信

1. [Datadog ログコレクション AWS Lambda 関数][2]をまだセットアップしていない場合は、セットアップします。

2. Lambda 関数がインストールされたら、AWS コンソールから手動で、VPC フローログを含む S3 バケットまたは Cloudwatch ロググループにトリガーを追加します。次に、Lambda のトリガーリストで、S3 または CloudWatch をクリックします。

    {{< img src="integrations/amazon_vpc/s3_trigger_configuration.png" alt="S3 trigger configuration"  style="width:75%;" >}}

    AWS VPC ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更します。最後に、Add ボタンをクリックします。

    {{< img src="integrations/amazon_vpc/s3_lambda_trigger_configuration.png" alt="S3 lambda trigger"  style="width:75%;" >}}

終了したら、[Datadog ログエクスプローラー][3]を使用してログを確認します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_vpc" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント
AWS VPC インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS VPC インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[3]: https://docs.datadoghq.com/ja/logs/explorer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv
[5]: http://docs.datadoghq.com/help
[6]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs


{{< get-dependencies >}}