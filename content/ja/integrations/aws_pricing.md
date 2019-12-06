---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - aws
  - クラウド
  - コスト管理
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md'
display_name: AWS Pricing
git_integration_title: aws_pricing
guid: fce760ae-979a-4c35-aa4e-5a05c24e2ce3
integration_id: aws-pricing
integration_title: AWS Pricing
is_public: true
kind: インテグレーション
maintainer: tsein@brightcove.com
manifest_version: 1.0.0
metric_prefix: aws_pricing.
metric_to_check: ''
name: aws_pricing
public_title: Datadog-AWS Pricing インテグレーション
short_description: サービスの AWS Pricing 情報をレートコードごとに収集
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[AWS から公開されている][1]料金情報を取得して、Datadog 内でリソース使用のコスト測定を容易にします。

[www.flaticon.com](https://www.flaticon.com/) から提供される [Eucalyp](https://www.flaticon.com/authors/eucalyp) 作のアイコンは、[CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/) に基づいてライセンスされています。

## セットアップ

### インストール

AWS Pricing チェックは [Datadog Agent][2] パッケージに含まれていないため、[公式コミュニティのインテグレーションのインストール手順][7]に従ってインストールする必要があります。

### コンフィグレーション

1. AWS Pricing データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `aws_pricing.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル aws_pricing.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `aws_pricing` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aws_pricing" >}}


### サービスのチェック

`aws_pricing.status`:

Boto3 料金クライアントを使用してメトリクスを収集しているときに Agent がエラーを検出した場合は、`CRITICAL` を返します。

Boto3 料金クライアントを使用して見つけられないレートコードが `aws_pricing.d/conf.yaml` に定義されている場合は、`WARNING` を返します。

エラーが検出されず、目的のすべてのサービスレートコードの料金データが収集された場合は、`OK` を返します。

### イベント

AWS Pricing には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://aws.amazon.com/pricing/
[2]: https://github.com/DataDog/integrations-core/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
[5]: https://docs.datadoghq.com/ja/help
[6]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[7]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/


{{< get-dependencies >}}