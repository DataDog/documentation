---
description: AWS 組織の Datadog AWS インテグレーションを設定するためのステップ
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Architecture Center
  text: 100 以上の AWS アカウントを Datadog に統合するためのガイド
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: ガイド
  text: AWS インテグレーションのトラブルシューティング
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: ブログ
  text: AWS を監視するための重要なメトリクス
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
## 概要 {#overview}

このガイドでは、AWS 組織内の複数のアカウントで [AWS インテグレーション][8]を設定するためのプロセスの概要を説明します。

Datadog が提供する CloudFormation StackSet テンプレートは、組織または組織単位 (OU) 下のすべての AWS アカウントで必要な IAM ロールと関連ポリシーの作成を自動化し、Datadog 内でアカウントを構成することで、手動設定が不要になります。セットアップが完了すると、インテグレーションが AWS メトリクスとイベントの収集を自動的に開始するため、インフラストラクチャーの監視を開始できます。

Datadog CloudFormation StackSet は、以下のステップを実行します。

1. AWS 組織または組織単位の下にあるすべてのアカウントで Datadog AWS CloudFormation Stack をデプロイします。
2. 対象アカウントに必要な IAM ロールとポリシーを自動作成します。
3. アカウント内の AWS リソースから、AWS CloudWatch のメトリクスやイベントの取り込みを自動的に開始します。
4. オプションで、AWS インフラストラクチャーのメトリクス収集を無効にします。これは、Cloud Cost Management (CCM) や Cloud Security Misconfigurations に固有のユースケースで役立ちます。
5. オプションで、Cloud Security Misconfigurations を構成して、AWS アカウントのリソースの誤構成を監視します。

**注**: StackSet は AWS アカウント内のログ転送を設定しません。ログを設定するには、[ログ収集][2]ガイドの手順に従ってください。


## 前提条件 {#prerequisites}

1. **Access to the management account**: AWS ユーザーは AWS 管理アカウントにアクセスできる必要があります。
2. **An account administrator has enabled Trusted Access with AWS Organizations**: [AWS 組織との信頼されたアクセスを有効にする][3]を参照して、StackSet と組織間の信頼されたアクセスを有効にし、サービス管理権限を使用してスタックを作成およびデプロイします。

**注**: AWS Organizations のマルチアカウントセットアップは、個別に構成された既存の AWS アカウントインテグレーションへのデプロイをサポートしていません。StackSet が、すでに個別に Datadog とインテグレーションされているアカウントを対象としている場合、既存のアカウントインテグレーションは削除されます。

## セットアップ {#setup}

まずは Datadog の [AWS インテグレーション構成ページ][1]で、**Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet** をクリックします。

**Launch CloudFormation StackSet** をクリックします。これにより AWS コンソールが開き、新しい CloudFormation StackSet が読み込まれます。`Service-managed permissions` のデフォルトの選択肢である on AWS をそのままにします。 
  
AWS コンソールで以下の手順で StackSet を作成し、デプロイします。

1. **テンプレートを選択する** 
Datadog AWS インテグレーション構成ページから Template URL をコピーし、StackSet の `Specify Template` パラメーターで使用します。


2. **StackSet の詳細を指定する**
    - Datadog AWS インテグレーション構成ページで Datadog API キーを選択し、StackSet の `DatadogApiKey` パラメーターに使用します。
    - Datadog AWS インテグレーション構成ページで Datadog APP キーを選択し、StackSet の `DatadogAppKey` パラメーターに使用します。

    - *オプションで次の操作を行います。*  
        1. 必要に応じて、[Cloud Security Misconfigurations][5] を有効にして、クラウド環境、ホスト、コンテナをスキャンし、誤構成やセキュリティリスクを検出します。 
        1. AWS インフラストラクチャーを監視しない場合は、メトリクス収集を無効にします。これは、[Cloud Cost Management][6] (CCM) または [Cloud Security Misconfigurations][5] に固有のユースケースでのみ推奨されます。

3. **StackSet オプションを構成する** 
StackSet が一度に 1 つの操作を実行するように、**Execution configuration** オプションを `Inactive` にしておきます。

4. **デプロイオプションを設定する**
    - `Deployment targets` は、組織全体または 1 つ以上の組織単位に Datadog インテグレーションをデプロイするように設定できます。


    - 組織または OU に追加された新しいアカウントに Datadog AWS インテグレーションを自動的にデプロイするには、`Automatic deployment` を有効にしておきます。

    - **Specify regions** で、各 AWS アカウントにインテグレーションをデプロイするリージョンを 1 つ選択します。  
      **注**: StackSet は、リージョン固有ではないグローバルな IAM リソースを作成します。このステップで複数のリージョンが選択されている場合、デプロイは失敗します。

    - **Deployment options** のデフォルト設定をシーケンシャルにして、StackSet の操作が一度に 1 つのリージョンにデプロイされるようにします。

5. **レビュー** 
    **Review** ページに移動し、**Submit** をクリックします。これにより、Datadog StackSet の作成プロセスが開始されます。インテグレーションが必要なアカウントの数によっては、数分かかる場合があります。続行する前に、StackSet がすべてのリソースを正常に作成したことを確認してください。

    スタックが作成されたら、Datadog の AWS インテグレーション構成ページに戻り、**Done** をクリックします。新しく統合された AWS アカウントからメトリクスとイベントが報告され、表示されるまで、数分かかる場合があります。

6. *(オプション)* **AWS 管理アカウントをインテグレーションする**

   [サービス管理権限][10]に関する AWS の制限により、この StackSet のセットアップ後、AWS 管理アカウントは自動的にデプロイされません。
   [Datadog-Amazon Cloudformation][9] の手順に従って、AWS 管理アカウントをインテグレーションします。


## 個々の AWS サービスに対するインテグレーションを有効にする{#enable-integrations-for-individual-aws-services}

各監視対象 AWS アカウントで有効にできるサブインテグレーションの全リストについては、[インテグレーションページ][4]を参照してください。Datadog にデータを送信するサブインテグレーションは、インテグレーションからデータが受信されると自動的にインストールされます。

## ログを送信する {#send-logs}

StackSet は、AWS アカウントでのログ転送を設定しません。ログを設定するには、[ログ収集][2]ガイドの手順に従ってください。

## AWS インテグレーションのアンインストール{#uninstall-aws-integration}

組織内のすべての AWS アカウントおよびリージョンから AWS インテグレーションをアンインストールするには、まずすべての StackInstances を削除してから、StackSet を削除します。[スタックセットを削除する][7]に記載されている手順に従って、作成した StackInstances と StackSet を削除します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /ja/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /ja/integrations/#cat-aws
[5]: /ja/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/ja/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/ja/integrations/guide/amazon_cloudformation/
[10]: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_DeploymentTargets.html