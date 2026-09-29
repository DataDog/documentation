---
aliases:
- /ja/security/application_security/security_signals/
- /ja/security/application_security/threats/security_signals
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: ドキュメント
  text: AAP 脅威検知の標準ルールを確認する
- link: /security/application_security/threat_protection/policies/custom_rules/
  tag: ドキュメント
  text: カスタム AAP 脅威検知ルールを設定する
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: ドキュメント
  text: AAP 脅威インテリジェンス
title: セキュリティシグナルを調査する
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト (US1-FED) でプレビュー版として提供されています。
</div>
{{< /site-region >}}

## 概要{#overview}

AAP セキュリティシグナルは、Datadog が検知ルールに基づいて脅威を検出した際に生成されます。[Signals Explorer][2]でセキュリティシグナルの表示、検索、フィルタリング、調査を行ったり、[通知ルール][8]を設定してサードパーティツールにシグナルを送信したりできます。

<!-- {{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Signals Explorer での脅威調査と詳細サイドパネルの概要">}} -->

## Signals Explorer の列{#signals-explorer-columns}

Signals Explorer には、以下の列が表示されます。

{{< ui >}}Severity{{< /ui >}}
: 重大度には、以下の 5 つの状態があります:  {{< ui >}}Info{{< /ui >}}、{{< ui >}}Low{{< /ui >}}、{{< ui >}}Medium{{< /ui >}}、{{< ui >}}High{{< /ui >}}、および {{< ui >}}Critical{{< /ui >}}。{{< ui >}}High{{< /ui >}} および {{< ui >}}Critical{{< /ui >}} は、サービスの可用性への重大な影響、または現在進行中の侵害を示します。

{{< ui >}}Title{{< /ui >}}
: シグナルの名前です。新しいデータが関連付けられ、攻撃による影響の評価が変更された場合、名前が更新されることがあります。

{{< ui >}}Service/Env{{< /ui >}}
: 攻撃の対象として特定されたサービスおよび環境です。サービス名にカーソルを合わせると、サービスページやコードリポジトリへのリンクが表示されるほか、そのサービスのオンコール担当者を確認できます。

{{< ui >}}Entities{{< /ui >}}
: 攻撃者および攻撃の被害者です。攻撃者は IP アドレスによって識別されます。被害者は認証済みユーザーとして識別されます。IP のリストにカーソルを合わせ、特定の IP をクリックすると、{{< ui >}}Threat Intelligence{{< /ui >}} や {{< ui >}}Security Activity{{< /ui >}} などの詳細情報を確認できます。

{{< ui >}}Triage State{{< /ui >}}
: シグナルに対して担当者を割り当て、トリアージ状態を設定できます。利用可能な状態は、{{< ui >}}Open{{< /ui >}}、{{< ui >}}Under Review{{< /ui >}}、および {{< ui >}}Archived{{< /ui >}} です。

{{< ui >}}Creation Date{{< /ui >}}
: シグナルが最初に作成された日付です。シグナルはデフォルトで日付順に並べ替えられます。

## セキュリティシグナルのフィルタリング{#filter-security-signals}

[Signals Explorer][2] でセキュリティシグナルをフィルタリングするには、検索クエリ `@workflow.triage.state:<status>` を使用します。ここで `<status>` はフィルタリング対象の状態 (`open`、`under_review`、または `archived`) です。また、ファセットパネルの [{{< ui >}}Signal State{{< /ui >}}] ファセットを使用することもできます。

## シグナルのトリアージ{#triage-a-signal}

シグナルをユーザーに割り当てて、詳細な調査を行うようにトリアージできます。割り当てられたユーザーは、シグナルのステータスを更新することで、自身のレビュー状況を追跡できます。

1. [Signals Explorer][2] ページで、[{{< ui >}}Triage State{{< /ui >}}] 列にあるユーザープロファイルアイコンをクリックします。
2. シグナルを割り当てるユーザーを選択します。
3. セキュリティシグナルのステータスを更新するには、トリアージステータスのドロップダウンメニューをクリックし、ステータスを選択します。デフォルトのステータスは {{< ui >}}Open{{< /ui >}} です。
    - {{< ui >}}Open{{< /ui >}}: シグナルはまだ解決されていません。
    - {{< ui >}}Under Review{{< /ui >}}: シグナルは現在調査中です。{{< ui >}}Under Review{{< /ui >}} 状態から、必要に応じてシグナルを {{< ui >}}Archived{{< /ui >}} または{{< ui >}}Open{{< /ui >}} に変更できます。
    - {{< ui >}}Archived{{< /ui >}}: シグナルの原因となった検出は解決済みです。シグナルが最初に検出されてから 30 日以内であれば、シグナルを {{< ui >}}Archived{{< /ui >}} 状態から {{< ui >}}Open{{< /ui >}} に戻すことができます。

**注**: セキュリティシグナルを変更するには、`security_monitoring_signals_write` 権限が必要です。Datadog のデフォルトロールおよび App and API Protection で利用可能な詳細なロールベースのアクセス制御の権限についての詳細は、「[ロールベースアクセス制御][9]」を参照してください。

## インシデントを宣言する{#declare-an-incident}

[Incident Management][4] を使用して、セキュリティシグナルのインシデントを作成します。

次の場合にインシデントを宣言します。

- Issue が顧客に影響を与えている、または影響を与える可能性がある場合。
- (内部的なものであっても) 緊急に対処すべき Issue であると判断した場合。

インシデントを宣言すべきかどうかわからない場合は、他のユーザーに通知し、必要に応じて重大度を上げてください。

1. [Signals Explorer][2] ページで、セキュリティシグナルを選択して詳細パネルを開きます。
2. シグナルパネルで、[{{< ui >}}Declare Incident{{< /ui >}}] をクリックするか、ドロップダウン矢印を選択して [{{< ui >}}Add to an existing incident{{< /ui >}}] を選択します。
3. 新しいインシデントを宣言する際は、[{{< ui >}}Declare Incident{{< /ui >}}] 設定で、重大度レベルやインシデントコマンダーなどの詳細を指定します。
   1. 影響範囲を推定します。重大度レベルは、SEV-1 (重大) から SEV-5 (軽微な影響) まであります。判断に迷う場合は、より高い重大度レベルを選択してください。
4. [{{< ui >}}Declare Incident{{< /ui >}}] をクリックします。

## ワークフローを実行する{#run-a-workflow}

[Workflow Automation][5] を使用して、セキュリティシグナルに対するワークフローを手動でトリガーします。

1. 実行するワークフローにセキュリティトリガーがあることを確認してください。
2. [Signals Explorer][2] ページで、セキュリティシグナルを開きます。
3. [{{< ui >}}Respond{{< /ui >}}] セクションで、[{{< ui >}}Run Workflow{{< /ui >}}] をクリックします。
4. [{{< ui >}}Run a workflow{{< /ui >}}] で、実行するワークフローを選択するか、[{{< ui >}}New Workflow{{< /ui >}}] をクリックします。
   - 選択したワークフローによっては、追加の入力パラメーターの入力が必要になる場合があります。
   - [{{< ui >}}New Workflow{{< /ui >}}] を選択した場合、[Run a Security Workflow] が開きます。ワークフローの詳細については、「[Workflow Automation][5]」を参照してください。
5. [{{< ui >}}Run{{< /ui >}}] をクリックします。

## 確認して対処する{#review-and-remediate}

1. [Signals Explorer][2] ページで、セキュリティシグナルを開きます。
2. シグナルの詳細で、[{{< ui >}}What Happened{{< /ui >}}]、[{{< ui >}}Activity Summary{{< /ui >}}]、[{{< ui >}}Detection Rule{{< /ui >}}] などの各セクションを表示します。
3. [{{< ui >}}Next Steps{{< /ui >}}] を確認し、以下のアクションを実行します。
    -  [{{< ui >}}Block all Attacking IPs{{< /ui >}}] をクリックします (特定の期間、または永続的に)。
    -  [{{< ui >}}Automated Attacker Blocking{{< /ui >}}] をクリックします ([検出][10]ルールに基づく)。この設定には、App and API Protection の [`Protect Write`] 権限が必要です。
    -  [{{< ui >}}Block with Edge WAF{{< /ui >}}][11] をクリックします。

## 一括アクション{#bulk-actions}

1 つ以上のシグナルを選択すると、{{< ui >}}Bulk Actions{{< /ui >}} を使用して以下を実行できます。

### 状態を設定する{#set-state}

トリアージ状態を {{< ui >}}Open{{< /ui >}}、{{< ui >}}Under Review{{< /ui >}}、または {{< ui >}}Archived{{< /ui >}} に設定します。

### ユーザーにシグナルを割り当てる{#assign-the-signal-to-users}

[{{< ui >}}Assign selection{{< /ui >}}] を選択し、シグナルに割り当てるユーザーを選択します。

シグナルの割り当てをリセットするには [{{< ui >}}Remove all assignments{{< /ui >}}] を選択します。

### Case Management{#case-management}

Datadog [Case Management][6] は、Datadog およびサードパーティの統合によって検出された Issue をトリアージ、追跡、および修復するための一元化された場所を提供します。

1. [Signals Explorer][2] ページで、セキュリティシグナルを選択します。
2. [{{< ui >}}Bulk Actions{{< /ui >}}] で、[{{< ui >}}Create a case{{< /ui >}}] を選択します。
3. [{{< ui >}}Create a case{{< /ui >}}] または [{{< ui >}}Add to an existing case{{< /ui >}}] を選択して、シグナルを既存のケースに追加します。
4. タイトルと (必要に応じて) 説明を入力します。
5. [{{< ui >}}Create Case{{< /ui >}}] をクリックします。

[{{< ui >}}Create Case{{< /ui >}}] をクリックすると、Case Management で選択したプロジェクトに移動します。

## 保存されたビュー{#saved-views}

Signals Explorer のさまざまな設定をビューとして保存できます。たとえば、未割り当てのシグナルのみを表示するようにフィルタリングし、その状態をビューとして保存するといったことが可能です。

設定をビューとして保存すると、自分やチームメンバーが後でそのビューを利用できるようになります。

表示には、エクスプローラーの以下の現在の設定が含まれます。

- 時間とクエリ
- 表示する列と並べ替え
- 分析の集計設定
- タイムラインの表示設定
- 表示するファセット
- 検知ルールごとの集計

1. ビューを保存するには、エクスプローラーで目的のビュー (表示状態) を設定してから、[{{< ui >}}Save{{< /ui >}}] をクリックします。
2. ビューの名前を入力し、そのビューを共有するチームを選択します。
3. [{{< ui >}}Save{{< /ui >}}] をクリックします。

保存されたすべてのビューを表示するには、{{< ui >}}Signals Explorer{{< /ui >}}のページタイトルの横にある [{{< ui >}}Views{{< /ui >}}] をクリックします。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ja/incident_response/incident_management/
[5]: /ja/actions/workflows/
[6]: /ja/incident_response/work_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ja/security/notifications/rules/
[9]: /ja/account_management/rbac/permissions/#cloud-security-platform
[10]: /ja/security/application_security/threat_protection/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /ja/security/application_security/threat_protection/policies/#blocking-attack-attempts-with-in-app-waf