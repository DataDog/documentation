---
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: ドキュメント
  text: AAP の 脅威検知 OOTB ルールを確認する
- link: /security/application_security/policies/custom_rules/
  tag: ドキュメント
  text: カスタム AAP 脅威検知ルールを構成する
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: ドキュメント
  text: AAP 脅威インテリジェンス
title: セキュリティ シグナルを調査する
---

## 概要

AAP セキュリティ シグナルは、検知ルールに基づいて Datadog が脅威を検出したときに作成されます。 [Signals Explorer][2] でセキュリティ シグナルを表示、検索、フィルタ、調査するか、[Notification Rules][8] を構成してサード パーティ ツールにシグナルを送信します。

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Signals Explorer で脅威を調査する概要と詳細サイド パネル" >}}

## Signals Explorer の列

Signals Explorer には次の列が表示されます。

Severity
: 重大度には 5 つの状態があります: **Info**、**Low**、**Medium**、**High**、**Critical**。**High** と **Critical** は、サービスの可用性への重大な影響、または進行中の侵害を示します。

Title
: シグナルの名前。新しいデータが相関されるとタイトルが更新され、攻撃の評価された影響が変わることがあります。

Service/Env
: 攻撃で特定されたサービスと環境。サービス名にカーソルを合わせると、そのサービス ページやコード リポジトリへのリンク、さらにそのサービスのオン コール担当者を確認できます。

Entities
: 攻撃者と被害者。攻撃者は IP アドレスで識別され、被害者は認証済みユーザーとして識別されます。IP リストにカーソルを合わせ、IP をクリックすると、**Threat Intelligence** や **Security Activity** などの詳細が表示されます。

Triage State
: 担当者を割り当て、シグナルのトリアージ状態を設定できます。使用可能な状態は **Open**、**Under Review**、**Archived** です。

Creation Date
: シグナルが最初に作成された日付。シグナルは既定で日付順にソートされています。

## セキュリティ シグナルをフィルタする

[Signals Explorer][2] 内のセキュリティ シグナルをフィルタするには、検索クエリ `@workflow.triage.state:<status>` を使用します。ここで `<status>` はフィルタ対象の状態です (`open`、`under_review`、`archived`)。また、ファセット パネルの **Signal State** ファセットも使用できます。

## シグナルをトリアージする

追加調査のため、シグナルをユーザーに割り当ててトリアージできます。割り当てられたユーザーは、シグナルの状態を更新してレビューを追跡できます。

1. [Signals Explorer][2] ページで、**Triage State** 列のユーザー プロファイル アイコンをクリックします。
2. シグナルを割り当てるユーザーを選択します。
3. セキュリティ シグナルの状態を更新するには、トリアージ ステータスのドロップダウン メニューをクリックし、ステータスを選択します。既定の状態は **Open** です。
    - **Open**: シグナルはまだ解決されていません。
    - **Under Review**: シグナルが積極的に調査されています。**Under Review** 状態から、必要に応じてシグナルを **Archived** または **Open** に移動できます。
    - **Archived**: シグナルを引き起こした検知が解決されています。**Archived** 状態から、シグナルが最初に検出された時点から 30 日以内であれば **Open** に戻すことができます。

**注**: セキュリティ シグナルを変更するには、`security_monitoring_signals_write` 権限が必要です。App and API Protection で利用可能な Datadog の既定のロールや、きめ細かなロール ベース アクセス制御の権限については、[Role Based Access Control][9] を参照してください。

## インシデントを宣言する

セキュリティ シグナルに対するインシデントを作成するには、[Incident Management][4] を使用します。

次の場合はインシデントを宣言してください:

- 問題が顧客に影響している、または影響する可能性がある。
- 問題が (内部的なものでも) 緊急対応を要すると考えられる。

宣言すべきか判断がつかない場合は、他のユーザーに通知し、適切に重大度を引き上げてください。

1. [Signals Explorer][2] ページで、セキュリティ シグナルを選択して詳細パネルを開きます。
2. シグナル パネルで **Declare Incident** をクリックするか、ドロップダウンの矢印を選択して **Add to an existing incident** を選択します。
3. 新しいインシデントを宣言する場合、**Declare Incident** 設定で、重大度レベルや **Incident Commander** などの詳細を指定してインシデントを構成します。
   1. 影響を見積もります。重大度レベルは SEV-1 (重大) から SEV-5 (軽微) までです。判断に迷う場合は、常に高い重大度を選択してください。
4. **Declare Incident** をクリックします。

## ワークフローを実行する

セキュリティ シグナルに対してワークフローを手動でトリガーするには、[Workflow Automation][5] を使用します。

1. 実行したいワークフローにセキュリティ トリガーが設定されていることを確認します。
2. [Signals Explorer][2] ページで、セキュリティ シグナルを開きます。
3. **Respond** セクションで **Run Workflow** をクリックします。
4. **Run a workflow** で、実行するワークフローを選択するか、**New Workflow** をクリックします。
   - 選択したワークフローによっては、追加の入力パラメーターの入力が必要になる場合があります。
   - **New Workflow** を選択した場合、Run a Security Workflow が開きます。ワークフローの詳細については、[Workflow Automation][5] を参照してください。
5. **Run** をクリックします。

## レビューと修復

1. [Signals Explorer][2] ページで、セキュリティ シグナルを開きます。
2. シグナルの詳細で、**What Happened**、**Activity Summary**、**Detection Rule** など各セクションを確認します。
3. **Next Steps** を確認し、次のアクションを実行します:
    -  **Block all Attacking IPs** をクリックします (特定の期間または恒久的にブロック)。
    -  **Automated Attacker Blocking** をクリックします ( [検知ルール][10] に基づく)。この設定には App and API Protection の **Protect Write** 権限が必要です。
    -  **[Block with Edge WAF][11]** をクリックします。

## 一括アクション

1 つ以上のシグナルを選択すると、**Bulk Actions** を使用して次の操作を実行できます。

### 状態の設定

トリアージ状態を **Open**、**Under Review**、**Archived** に設定します。

### シグナルをユーザーに割り当てる

**Assign selection** を選択し、シグナルに割り当てるユーザーを選択します。

**Remove all assignments** を選択すると、シグナルの割り当てをなしにリセットします。

### ケース管理

Datadog の [Case Management][6] は、Datadog やサード パーティ統合で検出された問題をトリアージ、追跡、修復するための一元的な場所を提供します。

1. [Signals Explorer][2] ページで、セキュリティ シグナルを選択します。
2. **Bulk Actions** で **Create a case** を選択します。
3. **Create a case** または **Add to an existing case** を選択します。
4. タイトルと任意の説明を入力します。
5. **Create Case** をクリックします。

**Create Case** をクリックすると、Case Management と選択したプロジェクトに遷移します。

## 保存ビュー

Signals Explorer の設定をビューとして保存できます。たとえば、未割り当てのシグナルだけが表示されるようにフィルタして、その状態をビューとして保存できます。

設定がビューとして保存されると、あなたとチーム メイトが後で利用できます。

ビューには、エクスプローラーの現在の選択内容が含まれます:

- 時間範囲とクエリ
- 表示列とソート
- Analytics の集計設定
- Timeline の可視性
- 表示されるファセット
- 検知ルールによる集約

1. ビューを保存するには、目的の表示になるように Signals Explorer を構成してから **Save** をクリックします。
2. ビューの名前を入力し、共有先のチームを選択します。
3. **Save** をクリックします。

保存ビューをすべて表示するには、**Signals Explorer** ページ タイトルの横にある **Views** をクリックします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ja/service_management/incident_management/
[5]: /ja/service_management/workflows/
[6]: /ja/service_management/case_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ja/security/notifications/rules/
[9]: /ja/account_management/rbac/permissions/#cloud-security-platform
[10]: /ja/security/application_security/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /ja/security/application_security/policies/#blocking-attack-attempts-with-in-app-waf
