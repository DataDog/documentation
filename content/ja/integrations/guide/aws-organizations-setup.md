---
description: AWS 組織の Datadog AWS インテグレーションを設定するためのステップ
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: ガイド
  text: AWS インテグレーションのトラブルシューティング
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: ブログ
  text: AWS 監視のための主要なメトリクス
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: ブログ
  text: Datadog クラウドセキュリティポスチャ管理
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: ブログ
  text: Datadog クラウドワークロードセキュリティでリアルタイムにインフラストラクチャーを保護する
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: ブログ
  text: Datadog セキュリティモニタリングが新登場
title: AWS 組織向け AWS インテグレーションマルチアカウント設定
---

## 概要

このガイドでは、AWS 組織内の複数のアカウントで [AWS インテグレーション][8]を設定するためのプロセスの概要を説明します。

Datadog が提供する CloudFormation StackSet テンプレートは、組織または組織単位 (OU) 下のすべての AWS アカウントに必要な IAM ロールと関連ポリシーを自動作成し、Datadog 内でアカウントを構成するため、手動で設定する必要がありません。セットアップが完了すると、インテグレーションは自動的に AWS メトリクスとイベントの収集を開始し、インフラストラクチャーの監視を開始することができます。

Datadog CloudFormation StackSet は、以下のステップを実行します。

1. AWS 組織または組織単位の下にあるすべてのアカウントで Datadog AWS CloudFormation Stack をデプロイします。
2. 対象アカウントに必要な IAM ロールとポリシーを自動作成します。
3. アカウント内の AWS リソースから、AWS CloudWatch のメトリクスやイベントの取り込みを自動的に開始します。
4. オプションで、AWS インフラストラクチャーのメトリクス収集を無効にします。これは、Cloud Cost Management (CCM) または Cloud Security Management Misconfigurations (CSM Misconfigurations) 固有のユースケースに有用です。
5. オプションで、CSM Misconfigurations を構成して、AWS アカウントのリソース誤構成を監視します。

**注**: StackSet では、AWS アカウントでのログ転送は設定されません。ログを設定するには、[ログ収集][2]のガイドの手順に従ってください。


## 前提条件

1. **Access to the management account**: AWS ユーザーは AWS 管理アカウントにアクセスできる必要があります。
2. **An account administrator has enabled Trusted Access with AWS Organizations**: [AWS 組織との信頼されたアクセスを有効にする][3]を参照し、StackSet と組織間の信頼されたアクセスを有効にし、サービス管理権限を使用してスタックを作成およびデプロイします。

## セットアップ

まずは Datadog の [AWS インテグレーション構成ページ][1]から、**AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet** をクリックします。

**Launch CloudFormation StackSet** をクリックします。これで AWS Console が開き、新しい CloudFormation StackSet がロードされます。AWS の `Service-managed permissions` のデフォルト選択のままにしておきます。

AWS コンソールで以下の手順で StackSet を作成し、デプロイします。

1. **テンプレートを選択する**  
Datadog AWS インテグレーション構成ページから Template URL をコピーし、StackSet の `Specify Template` パラメーターで使用します。


2. **StackSet の詳細を指定する**
    - Datadog AWS インテグレーション構成ページで Datadog API キーを選択し、StackSet の `DatadogApiKey` パラメーターに使用します。
    - Datadog AWS インテグレーション構成ページで Datadog APP キーを選択し、StackSet の `DatadogAppKey` パラメーターに使用します。

    - *オプションで:*  
       a. [Cloud Security Management Misconfigurations][5] (CSM Misconfigurations) を有効にして、クラウド環境、ホスト、コンテナをスキャンし、誤構成やセキュリティリスクを検出します。
        b. AWS インフラストラクチャーを監視したくない場合は、メトリクス収集を無効にします。これは、[Cloud Cost Management][6] (CCM) または [CSM Misconfigurations][5] 固有のユースケースにのみ推奨されます。

3. **StackSet オプションを構成する**
StackSet が一度に 1 つの操作を実行するように、**Execution configuration** オプションを `Inactive` にしておきます。

4. **デプロイオプションを設定する**
    - `Deployment targets` は、組織全体または 1 つ以上の組織単位に Datadog インテグレーションをデプロイするように設定することができます。


    - 組織や OU に追加された新しいアカウントに Datadog AWS Integration を自動的にデプロイするために、`Automatic deployment` を有効にしておきます。

    - **Specify regions** で、各 AWS アカウントでインテグレーションをデプロイするリージョンを 1 つ選択します。 
      **注**: StackSet は、リージョンに依存しないグローバルな IAM リソースを作成します。このステップで複数のリージョンが選択された場合、デプロイは失敗します。

    - **Deployment options** のデフォルト設定を sequential にすることで、StackSets の操作は一度に 1 つのリージョンにデプロイされるようになります。

5. **レビュー**  
   **Review** ページに移動し、**Submit** をクリックします。これで、Datadog StackSet の作成プロセスが開始されます。これは、インテグレーションが必要なアカウントの数に応じて、数分かかる場合があります。StackSet がすべてのリソースを正常に作成したことを確認してから次に進みます。

   &nbsp;スタックが作成されたら、Datadog の AWS インテグレーション構成ページに戻り、**Done** をクリックします。新しくインテグレーションされた AWS アカウントからのメトリクスやイベントレポートが表示されるまで、数分かかる場合があります。


## 個々の AWS サービスに対するインテグレーションを有効にする

監視対象の各 AWS アカウントで有効化できる利用可能なサブインテグレーションの全リストは、[インテグレーションページ][4]を参照してください。Datadog にデータを送信するサブインテグレーションは、インテグレーションからデータが受信されると自動的にインストールされます。

## ログを送信する

StackSet では、AWS アカウントでのログ転送は設定されません。ログを設定するには、[ログ収集][2]のガイドの手順に従ってください。

## AWS インテグレーションのアンインストール

組織内のすべての AWS アカウントおよびリージョンから AWS インテグレーションをアンインストールするには、まずすべての StackInstances を削除し、次に StackSet を削除します。[スタックセットの削除][7]で説明した手順で、作成した StackInstance と StackSet を削除します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /ja/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /ja/integrations/#cat-aws
[5]: /ja/security/misconfigurations/setup/
[6]: https://docs.datadoghq.com/ja/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/