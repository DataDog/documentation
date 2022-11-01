---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- aws
- cloud
- コスト管理
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md
display_name: AWS Pricing
draft: false
git_integration_title: aws_pricing
guid: fce760ae-979a-4c35-aa4e-5a05c24e2ce3
integration_id: aws-pricing
integration_title: AWS Pricing
integration_version: 1.0.0
is_public: true
kind: インテグレーション
maintainer: tsein@brightcove.com
manifest_version: 1.0.0
metric_prefix: aws.pricing.
metric_to_check: aws.pricing.amazonecs
name: aws_pricing
public_title: AWS Pricing
short_description: サービスの AWS Pricing 情報をレートコードごとに収集
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、[AWS から公開されている][1]料金情報を取得して、Datadog 内でリソース使用のコスト測定を容易にします。

## セットアップ

AWS Pricing チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い AWS Pricing チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-aws_pricing==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. AWS Pricing データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `aws_pricing.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、サンプル [aws_pricing.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `aws_pricing` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aws_pricing" >}}


### イベント

AWS Pricing には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "aws_pricing" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://aws.amazon.com/pricing/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/