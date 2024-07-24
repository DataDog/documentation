---
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: ドキュメント
  text: すぐに使える ASM 脅威検出ルールの確認
- link: /security/application_security/threats/custom_rules/
  tag: ドキュメント
  text: カスタム ASM 脅威検出ルールの構成
- link: /security/application_security/threats/threat-intelligence/
  tag: ドキュメント
  text: ASM 脅威インテリジェンス
title: セキュリティシグナルの調査
---

## 概要

ASM セキュリティシグナルは、Datadog が検出ルールに基づいて脅威を検出すると作成されます。[Signals Explorer][4] でセキュリティシグナルを表示、検索、フィルター、調査したり、[通知ルール][1] を構成してサードパーティツールにシグナルを送信することができます。

[Signals Explorer][2] では、属性やファセットでフィルターをかけて重要な脅威を見つけます。シグナルをクリックすると、サービス所有者や攻撃情報など、シグナルの詳細を確認できます。攻撃情報には、認証ユーザーとその IP アドレス、トリガーしたルール、攻撃フロー、関連するトレースやその他のセキュリティシグナルが含まれます。このページから、IP アドレスやユーザーをブロックできるほか、クリックしてケースを作成し、インシデントを宣言することもできます。

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Signals Explorer での脅威の調査の概要と詳細サイドパネル">}}

## セキュリティシグナルのフィルター

[Signals Explorer][2] でセキュリティシグナルをフィルターするには、検索クエリ `@workflow.triage.state:<status>` を使用します。`<status>` はフィルターしたい状態 (`open`、`under_review`、`archived`) です。ファセットパネルの **Signal State** ファセットを使用することもできます。

## シグナルのトリアージ

シグナルをトリアージするには、そのシグナルをさらに調査するユーザーに割り当てます。割り当てられたユーザーは、シグナルのステータスを更新することで、そのレビューを追跡できます。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナル側のパネルで、ユーザープロファイルのアイコンをクリックし、ユーザーを選択します。
3. セキュリティシグナルのステータスを更新するには、トリアージステータスのドロップダウンメニューをクリックし、ステータスを選択します。デフォルトのステータスは **Open** です。
    - **Open**: シグナルはまだ解決していません。
    - **Under Review**: シグナルはアクティブに調査中です。**Under Review** の状態から、必要に応じてシグナルを **Archived** または **Open** に移動することができます。
    - **Archived**: シグナルの原因となった検出が解決されました。シグナルが最初に検出されてから 30 日以内であれば、**Archived** の状態からシグナルを **Open** に戻すことができます。

**注**: セキュリティシグナルを変更するには、`security_monitoring_signals_write` 権限が必要です。Datadog のデフォルトロールと Application Security Management で利用可能な粒度の高いロールベースのアクセス制御権限については、[ロールベースのアクセス制御][3]を参照してください。

## ケースの作成

[Case Management][6] を使用して、セキュリティシグナルの追跡、トリアージ、調査を行います。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナルのサイドパネルで、**Create a case** ドロップダウンメニューを選択します。クリックし、**Create a new case** を選択するか、**Add to an existing case** を選択して、シグナルを既存のケースに追加します。
3. タイトルとオプションで説明を入力します。
4. **Create Case** をクリックします。

## インシデントの宣言

セキュリティシグナルのインシデントを作成するには、[Incident Management][4] を使用します。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. シグナルのサイドパネルで、**Declare Incident** ドロップダウンメニューをクリックし、**Create an incident** または **Add to an existing incident** を選択します。
3. インシデント作成モーダルで、重大度レベルやインシデントコマンダーなどの詳細を指定することでインシデントを構成します。
4. **Declare Incident** をクリックします。

## ワークフローの実行

セキュリティシグナルでワークフローを手動でトリガーするには、[ワークフローの自動化][5]を使用します。

1. [Signals Explorer][2] ページでセキュリティシグナルを選択します。
2. **What is Workflow Automation** セクションまで下へスクロールします。
3. **Run Workflow** をクリックします。
4. ワークフローモーダルで、実行したいワークフローを選択します。ワークフローによっては、追加の入力パラメーターを要求されることがあります。
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