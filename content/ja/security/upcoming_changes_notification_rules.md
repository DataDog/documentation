---
further_reading:
- link: /security/notifications/rules/
  tag: ドキュメント
  text: 通知の概要
- link: /security/notifications/
  tag: ドキュメント
  text: 通知ルール
is_beta: true
title: セキュリティ通知ルールの今後の変更点
---

This article outlines upcoming changes to how [notification rules][1] are configured. These changes impact [Cloud Security Management (CSM)][4], and more specifically cloud configuration and infrastructure configuration signals.

## CSM Misconfigurations におけるシグナルの廃止

現在、[CSM Misconfigurations][2] の通知は、以下の図に示すように、シグナルが有効な検出ルールに対してのみ設定できます。

**現在のワークフロー**:

{{< img src="security/csm/notification_rules_old_workflow.png" alt="CSM Misconfigurations で通知を有効にする現在のワークフローを示す図" width="80%">}}

通知ルールに対する今後の変更の一環として、通知を生成するためにシグナルを有効にする必要がなくなりました。新しいワークフローを下図に示します。

**新しいワークフロー**:

{{< img src="security/csm/notification_rules_new_workflow.png" alt="CSM Misconfigurations で通知を有効にする新しいワークフローを示す図" width="100%">}}

この変更は、CSM Misconfigurations で通知が生成される仕組みに以下のような影響を与えます。

1. 通知ルールを作成する際に、ソースタイプとして誤構成を指定できるようになりました。
2. CSM Misconfigurations では今後シグナルは生成されません。これは、通知を個別の検出ルールに対して有効にできなくなることも意味します。

<div class="alert alert-warning">Due to this change in behavior, you may notice an increase in the number of notifications generated. If the conditions set in a notification rule results in a high number of notifications, a warning message is displayed in the <strong>Preview of Matching Results</strong> panel. To help control noise, you can use the new time aggregation mechanism.</div>

3. Support for CSM Misconfigurations signals will be deprecated in early 2025. Legacy signals will be retained for 15 months from their trigger date (free of charge).

## 通知ルールのソースタイプセレクター

通知ルールを作成する際には、脆弱性および脅威 (シグナル) という 2 種類のソースタイプから選択する必要があります。

- 脆弱性とは、インフラストラクチャーにおける潜在的なセキュリティ上の欠陥のことです。
- 脅威 (シグナル) とは、インフラストラクチャーに対するアクティブな脅威となる不審なアクティビティを意味します。

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="通知ルールの新しいソースタイプ" width="75%">}}

## その他の変更

- Notification rules can now be configured for identity risks and attack paths, as well as container image vulnerabilities.
- CSM Misconfigurations の通知に、診断結果に関する完全なメタデータが含まれるようになりました。以前は、通知には限られたシグナルのメタデータしか含まれていませんでした。
- Terraformed custom detection rules using the legacy notifications attribute will no longer be supported after the final deprecation date (early 2025). Terraform support for Notification Rules will be available in late 2024. 

## 既存の通知の移行方法

### 検出ルールの通知

個別の検出ルールに設定されている通知を移行するには:

1. On the [Misconfiguration Rules page][3], select a detection rule that has notifications enabled for it.
2. **Set severity and notifications** セクションに表示されるバナーで、**Update in 1-Click** をクリックします。

   **Notification Rules** エディターページが表示され、フィールドにはルールの情報があらかじめ入力されています。

3. 必要に応じて設定を変更します。
4. **Save and Activate** をクリックします。

### Notification rules configured for cloud or infrastructure configuration signals

To migrate notification rules configured for cloud or infrastructure configuration signals, change the target from Cloud Configuration or Infrastructure Configuration to Vulnerability > Misconfiguration. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/rules/
[2]: /ja/security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29%20notification%3A%2A%20&deprecated=hide&groupBy=severity&sort=date
[4]: /ja/security/cloud_security_management/ 
[5]: /ja/security/application_security/
[6]: /ja/security/cloud_siem/