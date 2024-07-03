---
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: Documentation
  text: Explore ASM threat detection OOTB rules
- link: /security/application_security/threats/custom_rules/
  tag: Documentation
  text: Configure custom ASM threat detection rules
- link: /security/application_security/threats/threat-intelligence/
  tag: Documentation
  text: ASM threat intelligence
title: Investigate Security Signals
---

## 概要

ASM セキュリティシグナルは、Datadog が検出ルールに基づいて脅威を検出すると作成されます。[Signals Explorer][4] でセキュリティシグナルを表示、検索、フィルター、調査したり、[通知ルール][1] を構成してサードパーティツールにシグナルを送信することができます。

[Signals Explorer][2] では、属性やファセットでフィルターをかけて重要な脅威を見つけます。シグナルをクリックすると、サービス所有者や攻撃情報など、シグナルの詳細を確認できます。攻撃情報には、認証ユーザーとその IP アドレス、トリガーしたルール、攻撃フロー、関連するトレースやその他のセキュリティシグナルが含まれます。このページから、IP アドレスやユーザーをブロックできるほか、クリックしてケースを作成し、インシデントを宣言することもできます。

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Signals Explorer での脅威の調査の概要と詳細サイドパネル">}}

## Filter security signals

[Signals Explorer][2] でセキュリティシグナルをフィルターするには、検索クエリ `@workflow.triage.state:<status>` を使用します。`<status>` はフィルターしたい状態 (`open`、`under_review`、`archived`) です。ファセットパネルの **Signal State** ファセットを使用することもできます。

## Triage a signal

You can triage a signal by assigning it to a user for further investigation. The assigned user can then track their review by updating the signal's status.

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. On the signal side panel, click the user profile icon and select a user.
3. To update the status of the security signal, click the triage status dropdown menu and select a status. The default status is **Open**.
    - **Open**: The signal has not yet been resolved.
    - **Under Review**: シグナルはアクティブに調査中です。**Under Review** の状態から、必要に応じてシグナルを **Archived** または **Open** に移動することができます。
    - **Archived**: The detection that caused the signal has been resolved. From the **Archived** state, you can move the signal back to **Open** if it's within 30 days of when the signal was originally detected.

**注**: セキュリティシグナルを変更するには、`security_monitoring_signals_write` 権限が必要です。Datadog のデフォルトロールと Application Security Management で利用可能な粒度の高いロールベースのアクセス制御権限については、[ロールベースのアクセス制御][3]を参照してください。

## ケースの作成

Use [Case Management][6] to track, triage, and investigate security signals.

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナルのサイドパネルで、**Create a case** ドロップダウンメニューを選択します。クリックし、**Create a new case** を選択するか、**Add to an existing case** を選択して、シグナルを既存のケースに追加します。
3. Enter a title and optional description.
4. Click **Create Case**.

## Declare an incident 

セキュリティシグナルのインシデントを作成するには、[Incident Management][4] を使用します。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナルのサイドパネルで、**Declare Incident** ドロップダウンメニューをクリックし、**Create an incident** または **Add to an existing incident** を選択します。
3. On the incident creation modal, configure the incident by specifying details such as the severity level and incident commander.
4. Click **Declare Incident**.

## Run a workflow

セキュリティシグナルでワークフローを手動でトリガーするには、[ワークフローの自動化][5]を使用します。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. **What is Workflow Automation** セクションまで下へスクロールします。
3. Click **Run Workflow**.
4. On the workflow modal, select the workflow you want to run. Depending on the workflow, you may be required to enter additional input parameters.
5. **Run** をクリックします。

## 確認と修正

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナルのサイドパネルで、**Attack Flow**、**Activity Summary**、**Rule Details** などの各タブをクリックし、情報を確認します。
3. **Suggested Next Steps** を確認し、アクションを起こします。
    -  **Block all Attacking IPs** をクリックする (指定した期間または恒久的)。
    -  **Automated Attacker Blocking** をクリックする ([検出][10]ルールに基づく)。
    -  **[Block with Edge WAF][11]** をクリックする。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ja/service_management/incident_management/
[5]: /ja/service_management/workflows/
[6]: /ja/service_management/case_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ja/security/notifications/rules/
[9]: /ja/account_management/rbac/permissions/#cloud-security-platform
[10]: /ja/security/application_security/threats/protection/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /ja/security/application_security/threats/protection/#blocking-attack-attempts-with-in-app-waf