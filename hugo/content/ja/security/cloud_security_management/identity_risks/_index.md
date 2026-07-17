---
aliases:
- /ja/security/identity_risks/
further_reading:
- link: /security/cloud_security_management/
  tag: ドキュメント
  text: Cloud Security Management について
- link: /security/cloud_security_management/setup
  tag: ドキュメント
  text: Cloud Security Management の設定
- link: https://www.datadoghq.com/blog/datadog-ciem/
  tag: ブログ
  text: Datadog CIEM によるアイデンティティリスクの発見と修正
- link: /integrations/jira/
  tag: ドキュメント
  text: Jira インテグレーションについて
- link: /service_management/workflows/
  tag: ドキュメント
  text: Workflow Automation について
- link: https://www.datadoghq.com/blog/datadog-ciem-aws-iam-access-analyzer/
  tag: ブログ
  text: AWS の権限ギャップを Datadog CIEM と AWS IAM Access Analyzer で特定し、是正
title: Cloud Security Management Identity Risks
---

Cloud Security Management Identity Risks (CSM Identity Risks) は、クラウド全体での権限リスクを軽減する Cloud Infrastructure Entitlement Management (CIEM) 製品です。クラウドインフラストラクチャーを継続的にスキャンし、残存する管理権限、権限昇格、権限ギャップ、広範囲にわたる影響範囲、アカウント間アクセスなどの問題を検出します。また、IAM を介した攻撃からクラウドインフラストラクチャーを保護するため、継続的かつ積極的にアイデンティティリスクを解決することができます。迅速な是正策として、[縮小版ポリシー][4]、[Datadog Workflows][3] ベースの是正策、クラウドコンソールへのディープリンクを提案します。

<div class="alert alert-info">CSM Identity Risks は、AWS、Azure、GCP で利用可能です。</div>

## アイデンティティリスクの確認

[Identity Risks Explorer][1] で組織のアクティブなアイデンティティリスクを確認します。**Group by** オプションを使用して、**Identity Risks**、**Resources**、または **None** (個別のアイデンティティリスク) でフィルターをかけます。サイドパネルでその他の詳細を表示します。

CSM Identity Risk の検出対象には、ユーザー、ロール、グループ、ポリシー、EC2 インスタンス、Lambda 関数があります。

{{< img src="security/identity_risks/identity_risks_explorer_3.png" alt="CSM Identity Risks Explorers ページ" width="100%">}}

## アイデンティティリスクの是正

詳細な洞察や是正のヘルプは、**Remediation** タブをクリックしてください。次の例では、**Remediation** タブにプロビジョニングされた権限の使用状況が表示されています。

{{< img src="security/identity_risks/side_panel_remediation_tab.png" alt="アイデンティティリスクのサイドパネルにある Remediation タブでは、プロビジョニングされた権限の使用状況が表示されます" width="80%">}}

実際の使用状況に基づいて提案された縮小版ポリシーを確認するには、**View Suggested Policy** をクリックしてください。

{{< img src="security/identity_risks/downsized_policy.png" alt="Suggested downsized policy ダイアログでポリシーの縮小に関する提案を確認する" width="100%">}}

アイデンティティリスクを是正するには、**Fix in AWS** をクリックして AWS IAM コンソール内のリソースを更新します。Jira の問題を作成してチームに割り当てるには、**Add Jira issue** をクリックします。詳細は、[Cloud Security Management の問題に関する Jira 課題を作成する][2]を参照してください。

{{< img src="security/identity_risks/side_panel_action_buttons_2.png" alt="サイドパネルのアクションボタンを使ってアイデンティティリスクを是正する" width="100%">}}

Terraform の是正機能を利用して、根本的なアイデンティティリスクを修正するコード変更を GitHub でプルリクエストとして生成したり、[Workflow Automation][3] を活用して、アイデンティティリスクの自動ワークフロー (人間が関与する場合としない場合の両方) を作成したりすることも可能です。

## リスクのあるリソースに対して、誰がアクセス可能なのかを可視化する

設定ミスのあるリソースに直接または間接的にアクセス可能なプリンシパルをすべて確認するには、Misconfigurations、Identity Risks、Security Inbox のいずれかで **Access Insights** タブをクリックしてください。以下の例では、この EC2 インスタンスにアクセスできるすべてのプリンシパルが表示されています。

{{< img src="security/csm/access_insights.png" alt="Access Insights パネルには、高い特権を持つ IAM ロールが設定されたパブリックにアクセス可能な EC2 インスタンスのリストが表示されています。" width="100%">}}

**Risks** 列では各プリンシパルに関連するリスクを確認でき、プリンシパルがリソースへアクセスする際の経路 (直接または間接) については **Path** 列で確認できます。

プリンシパルは、名前、種類、パブリックアクセスの有無、管理者アクセスの有無などで検索できます。さらに、直接アクセスか間接アクセスかでフィルタリングすることも可能です。

各プリンシパルの横にある **Actions** ドロップダウンをクリックすると、Resource Catalog でそのプリンシパルを確認したり、AWS IAM コンソールで設定を更新したりできます。

## AWS IAM Access Analyzer インテグレーション

Datadog CIEM は、[AWS IAM Access Analyzer][5] と統合して、権限ギャップの検出精度を向上させます。AWS IAM Access Analyzer を使用している場合、Datadog CIEM は自動的に未使用のアクセス情報を活用し、権限ギャップの検出や縮小版ポリシーの提案を強化します。

<div class="alert alert-info">AWS IAM Access Analyzer を初めて有効にする場合、この有効化に関連して追加の AWS 費用が発生する可能性があり、AWS IAM Access Analyzer のインサイトが利用可能になるまで最大 2 時間かかる場合があります。</div>

{{< img src="security/identity_risks/aws_iam_access_analyzer.png" alt="権限ギャップの検出とポリシーの提案を強化する AWS IAM Access Analyzer に関するバナー" width="100%">}}

## ビデオウォークスルー

次のビデオでは、CSM Identity Risks を有効にして使用する方法の概要を説明しています。

{{< img src="security/csm/how-to-use-csm-identity-risks.mp4" alt="CSM Identity Risks のインストールと使用方法の概要を説明するビデオ" video=true >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /ja/security/cloud_security_management/guide/jira
[3]: /ja/security/cloud_security_management/workflows
[4]: /ja/security/cloud_security_management/identity_risks/#:~:text=Click%20View%20Suggested%20Policy%20to%20view%20a%20suggested%20downsized%20policy%20based%20on%20the%20actual%20usage.
[5]: https://aws.amazon.com/iam/access-analyzer/