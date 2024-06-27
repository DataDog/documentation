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
title: Cloud Security Management Identity Risks
---

Cloud Security Management Identity Risks (CSM Identity Risks) は、組織の IAM リスクを詳細に視覚化します。IAM ベースの攻撃からクラウドインフラストラクチャーを保護するために、プロアクティブかつ継続的にアイデンティティリスクを検出して解決することができます。

<div class="alert alert-info">現時点では、CSM Identity Risks は AWS でのみ利用可能です。</div>

## アイデンティティリスクの確認

[Identity Risks Explorer][1] で組織のアクティブなアイデンティティリスクを確認します。**Group by** オプションを使用して、**Identity Risks**、**Resources**、または **None** (個別のアイデンティティリスク) でフィルターをかけます。サイドパネルでその他の詳細を表示します。

CSM Identity Risk の検出対象には、ユーザー、ロール、グループ、ポリシー、EC2 インスタンス、Lambda 関数があります。

{{< img src="security/identity_risks/identity_risks_explorer_3.png" alt="CSM Identity Risks Explorers ページ" width="100%">}}

## アイデンティティリスクの修正

詳細な洞察と修正のヘルプについては、**Insights** タブをクリックしてください。次の例では、**Insights** タブにプロビジョニングされた権限の使用状況が表示されます。

{{< img src="security/identity_risks/side_panel_insights_tab.png" alt="アイデンティティリスクサイドパネルの Insights タブには、プロビジョニングされた権限の使用状況が表示されます" width="80%">}}

**View Suggested Policy** をクリックすると、実際の使用状況に基づいてポリシーの縮小案が表示されます。

{{< img src="security/identity_risks/downsized_policy.png" alt="Suggested downsized policy ダイアログでポリシー縮小の提案を確認します" width="100%">}}

アイデンティティリスクを修正するには、**Fix in AWS** をクリックして AWS IAM コンソールのリソースを更新します。Jira 課題を作成してチームに割り当てるには、**Create Jira issue** をクリックします。詳細については、[Cloud Security Management 課題のための Jira 課題の作成][2]を参照してください。

{{< img src="security/identity_risks/side_panel_action_buttons.png" alt="サイドパネルのアクションボタンを使用してアイデンティティリスクを修正" width="100%">}}

また、[Workflow Automation][3] を活用することで、アイデンティティリスクに対する自動化されたワークフローを作成することもできます (人の関与の有無は問いません)。詳細については、[Workflow Automation によるセキュリティワークフローの自動化][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /ja/security/cloud_security_management/guide/jira
[3]: /ja/security/cloud_security_management/workflows