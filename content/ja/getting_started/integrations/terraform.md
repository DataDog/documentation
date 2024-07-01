---
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: GitHub
  text: Datadog を Terraform で管理する
title: Terraform の概要
---

## 概要

Terraform を使用すると、Datadog リソースを作成し、プログラムで管理することができます。このガイドでは、Terraform を使い始めるための概要を説明し、特定のユースケースに対応した Terraform リソースやチュートリアルへのリンクも掲載しています。

## セットアップ

1. まだの場合は、[Terraform][1] をインストールします。
2. Terraform のコンフィギュレーションファイルがまだない場合は、Terraform のメインドキュメントの[構成セクション][3]を読み、ディレクトリとコンフィギュレーションファイルを作成します。
3. Datadog Provider の構成があるディレクトリから、`terraform init` を実行します。

## リソース

### クラウドインテグレーション

[AWS インテグレーションリソース][9]、[Azure インテグレーションリソース][10]、[Google Cloud Project インテグレーションリソース][11]は、それぞれ [AWS][12]、[Azure][13]、[Google Cloud][14] からデータを Datadog アカウントに素早く流し込む接続設定をすることができます。AWS インテグレーションを使用している場合、関連する IAM ロールや権限と一緒にインテグレーションを設定する例については、[AWS と Terraform のインテグレーション][27]ガイドを参照してください。

### アラート設定

Datadog アカウントに流れるデータで、予期せぬ変化や異常な動作について通知を受けるために、[Datadog モニターによるアラート][8]を実装します。モニターの作成と管理には[モニターリソース][4]を、モニターの JSON 定義には [モニター JSON リソース][5]を使用します。[Live Process モニター][7]を作成する `monitor.tf` ファイルの例については、Terraform のメインドキュメントの[モニターを作成する][6]のセクションを参照してください。

### アカウントの管理

チームや組織が大きくなっても、Terraform を使って Datadog をニーズに合わせて拡張することができます。[ユーザー][19]リソースでユーザーを作成し、[ロールリソース][20]でカスタマイズされた[権限セット][21]を割り当てます。また、[API キーリソース][23]と[アプリケーションキーリソース][24]でアカウントの [API キーとアプリケーションキー][22]を作成および管理し、[子組織のリソース][26]で[子組織][25]を追加することも可能です。

### ダッシュボード  

データをさらに分析したり、オーディエンスのために表示したりするには、[Datadog ダッシュボード][18]を作成します。Terraform はこのために[ダッシュボードリソース][15]を提供しますが、[ダッシュボード JSON リソース][16]を使用して JSON 定義でダッシュボードを作成することができます。また、制限付きロールを構成することで、[ダッシュボードの編集を制限する][17]ことができます。

### Webhook

[Webhook][29] を使って、Datadog アカウントのデータに応じて、独自のサービスにカスタム API リクエストとペイロードを送信することができます。これにより、サービスにアラートを出したり、インフラストラクチャーで自動化されたアクションを開始したりすることができます。Terraform の [Webhook リソース][30]を使用して、Terraform で Webhook を作成および管理します。

## Terraform でさらに上を目指す

Datadog Agent を搭載した Kubernetes アプリケーションの例や [Synthetic テスト][31]の作成など、Terraform による Datadog の実装と管理の詳しいウォークスルーは、[Terraform Datadog Provider][28] のチュートリアルをご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /ja/integrations/terraform/#configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor_json
[6]: /ja/integrations/terraform/#create-a-monitor
[7]: /ja/monitors/types/process/
[8]: /ja/monitors/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp
[12]: /ja/integrations/amazon_web_services/
[13]: /ja/integrations/azure/
[14]: /ja/integrations/google_cloud_platform/
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json
[17]: /ja/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[18]: /ja/dashboards/
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[21]: /ja/account_management/rbac/permissions/
[22]: /ja/account_management/api-app-keys/
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[25]: /ja/account_management/multi_organization/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[27]: /ja/integrations/guide/aws-terraform-setup
[28]: https://developer.hashicorp.com/terraform/tutorials/use-case/datadog-provider
[29]: /ja/integrations/webhooks/
[30]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
[31]: /ja/synthetics/