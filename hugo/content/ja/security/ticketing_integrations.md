---
aliases:
- /ja/security/cloud_security_management/review_remediate/jira
description: セキュリティチケットインテグレーション
further_reading:
- link: /security/assignee_management/
  tag: ドキュメント
  text: Assignee Management
- link: /incident_response/work_management/
  tag: ドキュメント
  text: Work Management
- link: /api/latest/security-monitoring/#create-cases-for-security-findings
  tag: API
  text: チケットインテグレーション API
- link: https://www.datadoghq.com/blog/work-management/
  tag: ブログ
  text: Datadog Work Management で人間とエージェントの作業を一元化する
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
site_support_id: case_management
title: チケットインテグレーション
---
{{< product-availability >}}

[Datadog Work Management][1] を使用して、[Jira][2]、[ServiceNow][21]、[Linear][23] などのサードパーティツールでチケットを管理できます。詳細については、[サードパーティのチケット管理ツールとの Work Management インテグレーション][3] を参照してください。

このページでは、Datadog Security と Datadog Work Management を使用してチケットを管理する方法について説明します。

チケットを作成せずに Datadog ユーザーを検知結果に割り当てるには、[Assignee Management][30] を参照してください。


## Work Management と Security 製品 {#work-management-and-security-products}

Work Management は、シグナルまたは検知結果を使用するすべての Security 製品でサポートされています。

- Code Security ([Findings][5] 内)
- Cloud Security ([Findings][11] 内)
- Cloud SIEM ([Signals][4] 内)
- App and API Protection ([Signals][6] および [Findings][12] 内)
- Workload Protection ([Signals][7] および [Findings][13] 内)

これらの製品でシグナルまたは検知結果を開くか、エクスプローラーで検知結果を一括選択し、{{< ui >}}Create Ticket{{< /ui >}} ボタンを使用して Datadog でケースを作成します。


## 双方向チケット同期 {#bidirectional-ticket-syncing}

双方向同期により、Datadog で変更が発生した際にチケットを自動的に更新したり、チケットツールで変更が発生した際に Datadog の一部の情報を更新したりできます。

### 対応製品 {#supported-products}

双方向同期は、以下の Code Security および Cloud Security の検知結果カテゴリでサポートされています。

- Libraries (SCA)
- Static Code (SAST)
- Runtime Code (IAST)
- Secret Scanning 
- Infrastructure as Code (IaC)
- 誤構成
- アイデンティティリスク
- ホストおよびコンテナの脆弱性
- App and API Protection
- Workload Protection

### 信頼できる唯一の情報源 {#single-source-of-truth}

双方向同期により、チケットを Datadog ケースと同期できます。ただし、問題の検出と解決における信頼できる唯一の情報源は Datadog です。

Datadog の検知結果に関連するチケットは手動でクローズできます。ただし、Datadog が問題が修正されたことを確認できない場合、Datadog の検知結果はオープンなままになります。この制限により、関連チケットがクローズされたときに、検知結果がクローズされて削除されるのを防ぐことができます。

修復を行わずに Datadog ケースをクローズしても、検知結果はクローズされません。

Datadog で検知結果を修復するか、[検知結果をミュート][14] して例外を定義することが、検知結果をクローズする唯一の方法です。検知結果が修復されると、関連するケースとチケットがクローズされます。

### 双方向同期のセットアップ {#set-up-bidirectional-syncing}

{{< tabs >}}

{{% tab "Jira" %}}

以下の手順で Jira との双方向同期をセットアップし、セットアップが正常に完了したことを確認します。

1. Datadog アカウントで以下の前提条件をセットアップするか、すでにセットアップされていることを確認してください。前提条件は、セットアップ順に記載されています。
   1. [Datadog Jira インテグレーション][2]。
   2. [Jira インテグレーション用 webhook][8]。Webhook を構成すると、Work Management で作成されたケースから Jira に課題が自動的に作成され、両方のリソースが同期されます。
   3. [新しい Work Management プロジェクト][9]。プロジェクトは、一連のケースを保持するコンテナオブジェクトです。
   4. [Jira インテグレーションはプロジェクト内で構成されます][3]。
      1. {{< ui >}}Sync data between Work Management and Jira{{< /ui >}} オプションを有効にします。
      2. {{< ui >}}Title{{< /ui >}} で、{{< ui >}}Two-way sync{{< /ui >}} を選択します。
      3. 残りの設定を完了し、{{< ui >}}Save changes{{< /ui >}} をクリックします。
2. Jira との双方向 Work Management インテグレーションが機能していることを確認します
   1. [双方向チケット同期をサポートする任意の製品][20] を開きます。
   2. エクスプローラーまたは検知結果ページでチケットのドロップダウンオプションを見つけ、{{< ui >}}Jira{{< /ui >}} を選択します。このボタンをクリックすると、{{< ui >}}Jira Ticket{{< /ui >}} モーダルが開きます。
   3. {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} セクションが存在し、双方向同期が有効になっていることを確認します。

{{< img src="security/jira_modal-1.png" alt="双方向同期が有効な状態で、セキュリティ検知結果の Jira チケットを作成するために使用するモーダル。" responsive="true" style="width:50%;">}}

これで、双方向 Work Management チケットの作成を開始できます。

{{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} セクションが表示されない場合は、前提条件が完了していることを確認してください。

[2]: /ja/integrations/jira/
[3]: /ja/incident_response/work_management/notifications_integrations/#third-party-tickets
[8]: /ja/integrations/jira/#configure-a-jira-webhook
[9]: /ja/incident_response/work_management/projects/
[20]: /ja/security/ticketing_integrations/#supported-products

{{% /tab %}}

{{% tab "ServiceNow" %}}

以下の手順で ServiceNow との双方向同期をセットアップし、セットアップが正常に完了したことを確認します。

1. Datadog アカウントで以下の前提条件をセットアップするか、すでにセットアップされていることを確認してください。前提条件は、セットアップ順に記載されています。
   1. [Datadog ServiceNow インテグレーション][21]。
      1. {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}ServiceNow{{< /ui >}} > {{< ui >}}Work Management{{< /ui >}} に移動します。
      2. 双方向同期のケーステーブルとして `Datadog Cases ITSM` を選択します。
   2. 割り当てグループにリンクする [Work Management プロジェクト][9]。プロジェクトは、ServiceNow テーブルにリンクされた一連のケースを保持するコンテナです。リンクされたプロジェクトがない場合、Datadog はチケットの作成時にプロジェクトを作成します。
   3. ITSM の双方向同期を行うには、インシデントを更新する ServiceNow ユーザーが少なくとも `itil` ロールを持っていることを確認してください。詳細については、[ServiceNow ITOM/ITSM セットアップ][22] を参照してください。
2. ServiceNow との双方向 Work Management インテグレーションが機能していることを確認します。
   1. [双方向チケット同期をサポートする任意の製品][20] を開きます。    
   2. エクスプローラーまたは検知結果ページでチケットのドロップダウンオプションを見つけ、{{< ui >}}ServiceNow{{< /ui >}} を選択します。このボタンをクリックすると、{{< ui >}}ServiceNow Ticket{{< /ui >}} モーダルが開きます。
   3. 設定された {{< ui >}}Instance{{< /ui >}} と {{< ui >}}Assignment Group{{< /ui >}} に対して双方向同期が有効になっていることを確認します。

{{< img src="security/servicenow_modal.png" alt="双方向同期とステータスマッピングが有効な、セキュリティ検知結果用の ServiceNow チケットを作成するために使用されるモーダル。" responsive="true" style="width:50%;">}}

これで、双方向 Work Management チケットの作成を開始できます。

{{< ui >}}Work Management ↔ ServiceNow Integration{{< /ui >}} セクションが表示されない場合は、前提条件が完了していることを確認してください。

[3]: /ja/incident_response/work_management/notifications_integrations/#third-party-tickets
[9]: /ja/incident_response/work_management/projects/
[20]: /ja/security/ticketing_integrations/#supported-products
[21]: /ja/integrations/servicenow/
[22]: /ja/integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear チケットインテグレーションは、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

以下の手順で Linear との双方向同期をセットアップし、セットアップが正常に完了したことを確認します。

1. Datadog アカウントで以下の前提条件をセットアップするか、すでにセットアップされていることを確認してください。前提条件は、セットアップ順に記載されています。
   1. [Datadog Linear インテグレーション][23]。
   2. [Linear インテグレーション用 webhook][24]。Webhook を構成すると、Work Management で作成されたケースと Linear の課題の同期を維持できます。
   3. [新しい Work Management プロジェクト][9]。プロジェクトは、一連のケースを保持するコンテナオブジェクトです。
   4. [Linear インテグレーションはプロジェクト内で構成されます][3]。
      1. プロジェクトで Linear を有効にし、課題作成に使用する Linear アカウントとチームを選択します。
      2. 同期を維持する各フィールドについて、{{< ui >}}Two-way sync{{< /ui >}} を選択します。
      3. 残りの設定を完了し、変更を保存します。
2. Linear との双方向 Work Management インテグレーションが機能していることを確認します。
   1. [双方向チケット同期をサポートする任意の製品][20] を開きます。
   2. エクスプローラーまたは検知結果ページでチケットのドロップダウンオプションを見つけ、{{< ui >}}Linear{{< /ui >}} を選択します。このボタンをクリックすると、{{< ui >}}Linear Issue{{< /ui >}} モーダルが開きます。
   3. {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} セクションが存在し、双方向同期が有効になっていることを確認します。

{{< img src="security/linear_modal.png" alt="双方向同期が有効な状態で、Security 検知結果の Linear 課題を作成するために使用されるモーダル。" responsive="true" style="width:50%;">}}

これで、双方向 Work Management チケットの作成を開始できます。

{{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} セクションが表示されない場合は、前提条件が完了していることを確認してください。

[3]: /ja/incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /ja/incident_response/case_management/projects/
[20]: /ja/security/ticketing_integrations/#supported-products
[23]: /ja/integrations/linear/
[24]: /ja/integrations/linear/#configure-a-linear-webhook

{{% /tab %}}

{{< /tabs >}}

### 双方向チケットを作成する{#create-bidirectional-tickets}

次の手順では、Security 検知結果の双方向チケットを作成します。

1. [双方向チケット同期をサポートする任意の製品][20] を開きます。
2. エクスプローラー内、または検知結果ページの {{< ui >}}Next Steps{{< /ui >}} の下にある {{< ui >}}Ticketing{{< /ui >}} アイコンのドロップダウンオプションを見つけます。
3. 一度に最大 50 件の検知結果を選択して、複数のチケットを作成したり、複数の検知結果に対して 1 つのチケットを作成したりすることもできます。
4. ドロップダウンからサードパーティツールを選択します。
5. サポートされているサードパーティツール (以下のセクションを参照) のチケットを作成します。

{{% collapse-content title="Jira チケット" level="h4" expanded=false %}}
1. {{< ui >}}Jira Ticket{{< /ui >}} モーダルを開きます。新規または既存のチケットを使用できます。新しい Jira チケットの作成方法を見てみましょう。
2. 次の設定を構成します。
   1. {{< ui >}}Jira account{{< /ui >}}:** チケットを作成する Jira アカウントを選択します。
   2. {{< ui >}}Jira Project{{< /ui >}}:** 使用する Jira プロジェクトを選択します。
   3. {{< ui >}}Jira work type{{< /ui >}}:** 作成する Jira の作業タイプを選択します。
   4. {{< ui >}}Assignee and Priority{{< /ui >}}:** 必要に応じて、割り当てられたユーザーと優先度を選択します。
3. Datadog が作成する Jira チケットにフィールドを追加するには、{{< ui >}}Add Optional Field{{< /ui >}} を使用してフィールドを追加します。
4. {{< ui >}}Data Sync Settings{{< /ui >}} を表示して、リンクされている Work Management プロジェクトとフィールドごとの双方向同期設定を確認および更新します。
5. {{< ui >}}Create{{< /ui >}} をクリックします。

**注**:
- Jira との双方向同期は、ステータス、担当者、コメントなどの一部の Jira チケット属性で利用できますが、すべての Jira フィールドが利用できるわけではありません。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow チケット" level="h4" expanded=false %}}
1. {{< ui >}}ServiceNow Ticket{{< /ui >}} モーダルを開きます。新規または既存のチケットを使用できます。新しい ServiceNow チケットの作成方法を見てみましょう。
2. 次の設定を構成します。
   1. {{< ui >}}Instance{{< /ui >}}:** チケットを作成する ServiceNow インスタンスを選択します。
   2. {{< ui >}}Assignment group{{< /ui >}}:** チケットの割り当て先となる ServiceNow グループを選択します。
3. 複数の検知結果に対してチケットを作成する場合は、作成モードを選択します。
   - {{< ui >}}Single Ticket{{< /ui >}}:** 選択したすべての検知結果にリンクされた単一の集約チケットを作成します。
   - {{< ui >}}Multiple Tickets{{< /ui >}}:** 選択した各検知結果に対して個別のチケットを作成します。
4. {{< ui >}}Data Sync Settings{{< /ui >}} を表示して、リンクされている Work Management プロジェクトとフィールドごとの双方向同期設定を確認および更新します。
5. {{< ui >}}Create{{< /ui >}} をクリックします。

**注**:
- 双方向同期は `ITSM` モードでのみサポートされています。`ITOM` イベントは双方向同期をサポートしていません。
- 既存のチケットへの添付は `ITSM` モードでのみサポートされています。
- ServiceNow インシデントの URL のみがサポートされています。問題および変更リクエストの URL は受け付けられません。
{{% /collapse-content %}}

{{% collapse-content title="Linear の課題" level="h4" expanded=false %}}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear チケットインテグレーションは、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

1. {{< ui >}}Linear Issue{{< /ui >}} モーダルを開きます。新規または既存の課題を使用できます。
2. 次の設定を構成します。
   1. {{< ui >}}Linear account{{< /ui >}}:** 課題を作成する Linear アカウントを選択します。
   2. {{< ui >}}Linear team{{< /ui >}}:** 課題を作成する Linear チームを選択します。
3. 必要に応じて、Linear プロジェクト、ラベル、担当者、優先度を設定します。
4. {{< ui >}}Data Sync Settings{{< /ui >}} を表示して、リンクされている Work Management プロジェクトとフィールドごとの双方向同期設定を確認および更新します。
5. {{< ui >}}Create{{< /ui >}} をクリックします。

**注**:
- Linear との双方向同期は、ステータス、担当者、タイトル、説明、優先度、コメントなどの課題属性で利用できます。
- 既存の課題を使用するには、Linear の課題 URL を入力します。
{{% /collapse-content %}}

### 双方向 Work Management チケットを管理する {#manage-bidirectional-work-management-tickets}

**注**: 双方向同期の問題を解決するためのヘルプについては、[Work Management のトラブルシューティング][24] を参照してください。

{{< tabs >}}

{{% tab "Jira" %}}

既存の双方向 Jira チケットは、検知結果の {{< ui >}}Ticketing{{< /ui >}} または {{< ui >}}Next Steps{{< /ui >}} セクションに一覧表示されます。

Static Code (SAST) の検知結果の例を以下に示します。

{{< img src="security/bidir-jira-existing-1.png" alt="Jira チケットが存在する検知結果: [Next Steps] セクションの [Ticket Created] の下に、Jira ロゴと「CJT-16」というテキストが表示されたピルがあります。" responsive="true" style="width:100%;">}}

Jira チケットにカーソルを合わせると、詳細が表示されます。

{{< img src="security/bidir-jira-existing-hover-1.png" alt="前の画像のピルのマウスオーバー状態。Jira チケットの詳細が表示されたモーダル。" responsive="true" style="width:100%;">}}

担当者やステータスなどの詳細に加え、Jira 課題と Datadog ケースの変更履歴 (タイムライン) が提供されます。

クローズされた Jira チケットは緑色で表示されます。

{{< ui >}}Datadog Associated Case{{< /ui >}} に、関連する Datadog ケースが表示されます。ケース名をクリックすると、[Work Management][1] でケースを開きます。

[1]: /ja/incident_response/work_management/
{{% /tab %}}

{{% tab "ServiceNow" %}}

既存の双方向 ServiceNow チケットは、検知結果の {{< ui >}}Ticketing{{< /ui >}} または {{< ui >}}Next Steps{{< /ui >}} セクションに一覧表示されます。

{{< img src="security/bidir-servicenow-existing.png" alt="既存の ServiceNow チケットがある検知結果: [Next Steps] セクションの [Tracking] の下に、ServiceNow の View incident ピルがあります。" responsive="true" style="width:100%;">}}

ServiceNow チケットにカーソルを合わせると、ステータスや ServiceNow と Datadog 間で同期された変更のタイムラインなど、詳細を確認できます。

{{< img src="security/bidir-servicenow-existing-hover.png" alt="ServiceNow チケットのピルにカーソルを合わせると、インシデント番号、ステータス、および ServiceNow と Datadog 間で同期された変更のタイムラインが表示されます。" responsive="true" style="width:100%;">}}

{{< ui >}}Datadog Associated Case{{< /ui >}} に、関連する Datadog ケースが表示されます。ケース名をクリックすると、[Work Management][1] でケースを開きます。

[1]: /ja/incident_response/case_management/
{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear チケットインテグレーションは、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

既存の双方向 Linear 課題は、検出結果の {{< ui >}}Ticketing{{< /ui >}} または {{< ui >}}Next Steps{{< /ui >}} セクションに一覧表示されます。

{{< img src="security/bidir-linear-existing.png" alt="[Next Steps] セクションに既存の Linear 課題がある検出結果。" responsive="true" style="width:100%;">}}

Linear の課題にカーソルを合わせると、ステータス、担当者、および Linear と Datadog 間で同期された変更のタイムラインなど、詳細を確認できます。

{{< img src="security/bidir-linear-existing-hover.png" alt="Linear の課題のピルにカーソルを合わせたときに表示されるツールチップ。課題のステータス、担当者、および Linear と Datadog 間で同期された変更のタイムラインが表示されます。" responsive="true" style="width:100%;">}}

{{< ui >}}Datadog Associated Case{{< /ui >}} に、関連する Datadog ケースが表示されます。ケース名をクリックすると、[Work Management][1] でケースを開きます。

[1]: /ja/incident_response/work_management/
{{% /tab %}}

{{< /tabs >}}

#### 自動的な関連付け解除とチケットのオープン/クローズ{#automatic-detachment-and-ticket-openingclosing}

ケースをアーカイブしても関連するチケットは削除されませんが、ケースプロジェクトを削除すると、関連するすべての Security 検出結果からすべてのチケットの関連付けが解除されます。

セキュリティ検出結果からチケットの関連付けを解除しても、チケットは削除されません。

チケットに関連付けられた未解決の検出結果がなくなった場合 (すべての検出結果の関連付けが解除された、解決された、またはミュートされたため)、チケットは自動的にクローズされます。
同様に、クローズされたチケットに少なくとも 1 つの未解決の検出結果が関連付けられた場合 (関連付けられた、再検出された、またはミュート解除されたため)、チケットは自動的に再オープンされます。

### 双方向 Work Management ファセット {#bidirectional-work-management-facets}

{{< ui >}}Triage{{< /ui >}}の下には、以下を含む複数の Work Management ファセットがあります。

- ケースキー
- Jira キー
- Jira ステータス
- Linear 課題キー
- Linear ステータス
- ケースステータス
- チケットが関連付けられている

これらのファセットを使用して、属性をクエリしたり、ダッシュボードを作成したりできます。

## チケットインテグレーション API {#ticketing-integration-api}

Datadog ケースと既存の Security 検知結果とのリンクは、パブリック API で管理できます。

専用のエンドポイントを使用すると、[既存の Security 検知結果に対して Datadog ケースを作成][15] したり、[Security 検知結果を既存の Datadog ケースに関連付け][16] たり、[Security 検知結果とケースの関連付けを解除][17] したりできます。

ユーザーは、[Security 検知結果に対して Jira 課題を作成][18] したり、[Security 検知結果を Jira 課題に関連付け][19] たりすることもできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/work_management/
[2]: /ja/integrations/jira/
[3]: /ja/incident_response/work_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals
[5]: https://app.datadoghq.com/security/code-security
[6]: https://app.datadoghq.com/security/appsec/signals
[7]: https://app.datadoghq.com/security/workload-protection/signals
[8]: /ja/integrations/jira/#configure-a-jira-webhook
[9]: /ja/incident_response/work_management/projects/
[10]: /ja/security/ticketing_integrations/#prerequisites
[11]: https://app.datadoghq.com/security/compliance
[12]: https://app.datadoghq.com/security/appsec/inventory/finding
[13]: https://app.datadoghq.com/security/workload-protection/findings
[14]: https://app.datadoghq.com/security/automation_pipelines/mute
[15]: /ja/api/latest/security-monitoring/#create-cases-for-security-findings
[16]: /ja/api/latest/security-monitoring/#attach-security-findings-to-a-case
[17]: /ja/api/latest/security-monitoring/#detach-security-findings-from-their-case
[18]: /ja/api/latest/security-monitoring/#create-jira-issues-for-security-findings
[19]: /ja/api/latest/security-monitoring/#attach-security-findings-to-a-jira-issue
[20]: /ja/security/ticketing_integrations/#supported-products
[21]: /ja/integrations/servicenow/
[22]: /ja/integrations/guide/servicenow-itom-itsm-setup/
[23]: /ja/integrations/linear/
[24]: /ja/incident_response/case_management/troubleshooting/
[30]: /ja/security/assignee_management/