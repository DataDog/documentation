---
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: ドキュメント
  text: 検出ルールの条件ロジックについて学ぶ
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password を監視
title: セキュリティシグナルの調査
---

## 概要

Cloud SIEM セキュリティシグナルは、Datadog が検出ルールに基づいてログを分析し、脅威を検出した際に作成されます。専用のクエリ言語を習得しなくても、シグナルエクスプローラーでセキュリティシグナルの表示、検索、フィルタリング、相関を行うことができます。また、Datadog プラットフォームで、セキュリティシグナルを自分自身または別のユーザーに割り当てることもできます。シグナルエクスプローラーに加え、[通知ルール][1]を構成して、特定の個人またはチームにシグナルを送信し、問題を通知することができます。

[Audit Trail][2] で状態を変更したり、シグナルのアクション履歴を表示したりするなど、セキュリティシグナルを変更するには、`Security Signals Write` 権限が必要です。Datadog のデフォルトロールと、Cloud Security で利用できる Datadog Security の詳細なロールベースアクセス制御権限については、 [ロールベースのアクセス制御][3]を参照してください。

## シグナルエクスプローラー

シグナルエクスプローラーでは、ファセットパネルまたは検索バーを使用してシグナルをグループ化およびフィルタリングします。例えば、[重大度](#view-signals-by-severity)、[検出ルール](#view-signals-by-detection-rules)、[MITRE ATT&CK](#view-signals-by-mitre-attck)でシグナルを表示できます。シグナルをユースケースに合わせてフィルタリングしたら、[保存ビュー][4]を作成し、後でクエリを再読み込みできるようにします。

### 重大度別にシグナルを表示

`open` または `under review` のトリアージ状態にあり、`HIGH` や `CRITICAL` などの特定の重大度に属するすべてのシグナルを表示するには、以下のいずれかを実行します。

- ファセットパネルの **Severity** セクションで、**Critical**、**High**、**Medium** を選択します。**Signal State** セクションで、**open** と **under_reviewed** のみが選択されていることを確認します。
- 検索バーに`status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`  と入力します。

**Signal State** 列を追加するには、テーブルの右上にある **Options** ボタンを選択し、ファセット: `@workflow.triage.state` を追加します。これにより、シグナルの状態が表示され、ヘッダーからステータスで分類できるようになります。

環境内の脅威アクティビティを調査するには、さまざまな視覚化を使用します。例えば、**Visualize by** フィールドでは、シグナルを以下のようにグループ化できます。

- **Rules List** では、さまざまな検出ルールのボリュームと警告の傾向を確認できます。
- **Timeseries** で長期的なシグナルの傾向を見ることができます。
- **Top List** では、発生回数が多い順にシグナルを確認できます。
- **Table** では、指定されたタグキー (例えば、`source` 、`technique` など) によるシグナルが確認できます。
- **Pie Chart** で各検出ルールの相対ボリュームを確認できます。

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="シグナルエクスプローラーには、検出ルールごとに分類されたシグナルが表示されます。" style="width:100%;" >}}

### 検出ルール別にシグナルを表示

検出ルールに基づくシグナルを表示するには、検索バー下の **Visualize as** フィールドで **Rules List** を選択します。ルールをクリックすると、そのルールに関連するシグナルが一覧表示されます。シグナルをクリックすると詳細が表示されます。

### MITRE ATT&CK によるシグナル表示

MITRE ATT&CK の Tactic および Technique でシグナルを表示するには:
1. 検索バーの下の **Visualize as** フィールドで **Table** を選択し、**Tactic** でグループ化します。
1. 最初のグループ `by` の隣にあるプラスアイコンをクリックして、2 つ目のグループ `by` を追加し、そのグループに対して **Technique** を選択します。
1. 表の中で、戦術やテクニックのいずれかをクリックすると、シグナルをさらに調査し、フィルタリングするためのオプションが表示されます。例えば、戦術やテクニックに関連するシグナルを表示したり、特定の戦術やテクニックを検索したり除外したりすることができます。

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="シグナルエクスプローラーに、戦術およびテクニックのリストが表示されます。" style="width:100%;" >}}

### 単一シグナルのトリアージ

1. [Cloud SIEM][5] に移動します。
1. ページ上部の **Signals** タブをクリックします。
1. 表からセキュリティシグナルをクリックします。
1. **What Happened** セクションで、クエリに一致したログを参照します。クエリにカーソルを合わせると、クエリの詳細が表示されます。
    - ユーザー名やネットワーク IP のような特定の情報を見ることもできます。**Rule Details** で、ファネルアイコンをクリックして抑制ルールを作成するか、既存の抑制に情報を追加します。詳細については、 [抑制ルールの作成][11]を参照してください。
1. **Next Steps** のセクションで:
  a. **Triage** で、ドロップダウンをクリックしてシグナルのトリアージステータスを変更します。デフォルトのステータスは `OPEN` です。
      - `Open`: Datadog セキュリティがルールに基づいて検出をトリガーし、その結果発生したシグナルがまだ解決されていません。
      - `Under Review`: 調査を進めている間は、トリアージステータスを `Under Review` に変更します。`Under Review` の状態から必要に応じて `Archived` または `Open` に戻すことができます。
      - `Archived`: シグナルの原因となった検出が解決された場合、ステータスを `Archived` に更新します。シグナルがアーカイブされた場合、今後の参考のために理由と説明を記述できます。アーカイブされた問題が再浮上した場合、またはさらなる調査が必要な場合、ステータスを　`Open` に戻すことができます。すべてのシグナルは、作成から 30 日後にロックされます。</ul>
  b. **Assign Signal** をクリックして、自分自身または他の Datadog ユーザーにシグナルを割り当てます。  
  c. **Take Action** では、ケースの作成、インシデントの宣言、抑制の編集、またはワークフローの実行ができます。ケースを作成すると、自動的にシグナルが割り当てられ、トリアージステータスが `Under Review` に設定されます。

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="侵害された AWS IAM ユーザーのアクセスキーに関するシグナルのサイドパネルには、2 つの IP アドレスと所在地が表示されます。" style="width:90%;" >}}

### 複数のシグナルのトリアージ

一括アクションを使用して複数のシグナルをトリアージできます。使用するには、まずシグナルエクスプローラーでシグナルを検索・フィルタリングし、その後に以下の手順を実行します。

1. 一括アクションを実行したいシグナルの左側にあるチェックボックスをクリックします。シグナルエクスプローラーリストの全シグナルを選択するには、**Status** 列ヘッダーの横にあるチェックボックスを選択します。
1. シグナル表の上にある **Bulk Actions** ドロップダウンメニューをクリックし、実行したいアクションを選択します。

**注**: シグナルエクスプローラーは、一括アクションを実行すると動的な更新を停止します。

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="シグナルエクスプローラーに、一括アクションのオプションが表示されます。" style="width:55%;" >}}

### ワークフロー自動化の実行

ワークフローオートメーションを使用して、シグナルの調査と修復に役立つアクションを実行します。これらのアクションには以下が含まれます。
- Block an IP address from your environment.
- Disable a user account.
- Look up an IP address with a third-party threat intelligence provider.
- Send Slack messages to your colleagues to get help with your investigation.

Click the **Workflows** tab in the signal side panel to see which workflows were triggered for the signal and suggested Workflows to run. If you want to run a suggested Workflow, click **Run Workflow**. See [How suggested Workflows are selected](#how-suggested-workflows-are-selected) for more information. If the workflow requires additional input variables, a dialog box appears and prompts you to enter any required values before proceeding.

If you don't see the Workflow you want to run in the list, click **Search and Run Workflow**. In the workflow browser, search and select a workflow to run.

Alternatively, you can also select **Run Workflows** in the **Next Steps** section to search for and run a Workflow.

任意のセキュリティシグナルでワークフローを自動トリガーする方法については、 [セキュリティシグナルからワークフローをトリガーする][8]および[ワークフロー自動化でセキュリティワークフローを自動化する][9]を参照してください。

#### How suggested Workflows are selected

To streamline incident response and reduce friction during triage, Cloud SIEM suggests Workflows that are relevant to the signal. The suggested Workflows are selected based on which ones have the highest tag similarity with the signal. Cloud SIEM uses the following information to suggest Workflows for a signal:

- **Tags automatically added from Blueprints, which are preconfigured flows**<br>
Workflows are a set of actions that are relevant to the platform, such as AWS CloudTrail. Workflows created from a Blueprint automatically have tags applied based on the source. For example, a workflow action such as "Shutdown virtual machine on AWS" has the `source` tag AWS CloudTrail.
- **Tags you added manually**<br>
You can customize which workflows are prioritized by manually adding tags to both Blueprint-derived and custom workflows.To ensure correct contextual matching, these tags should match those found on the signal, the logs that generated the alert, or the detection rule itself.
- **Tagging strategy**<br>
To ensure a workflow appears for a given signal, the workflow must include tags similar to those of the signal. A common signal tag is the signal's source or service. For example, signals from AWS resources are typically tagged with `source:cloudtrail`. By tagging a workflow with `source:cloudtrail`, the workflow is associated with signals related to AWS activity.<br>
If you want a Workflow to be suggested for a specific detection rule, tag the Workflow with that detection rule ID (for example, `ruleId:abc-123-xyz`).

When a signal is created:

- **Signals and workflows are matched using tags**<br>
When a security signal is created, Cloud SIEM checks the signal's tags, and matches them against tags defined in your existing workflows.
- **Relevant suggestions are made**<br>
A **Suggested Workflows** section appears in the side panel. It shows the top three workflows based on tags that match closest to the tags on the signal. This ensures that suggested actions are context-aware and operationally relevant.

## 調査

シグナルには、検出された脅威が悪意のあるものかどうかを判断するための重要な情報が含まれています。さらに、Case Management のケースにシグナルを追加し、追加調査を行えます。

### ログ

シグナルに関連するログを表示するには、**Logs** タブをクリックします。**View All Related Logs** をクリックすると、ログエクスプローラーで関連ログを確認できます。

### エンティティ

エンティティを調査するには:

1. **Entities** タブをクリックすると、ユーザーや IP アドレスなど、シグナルに関連するエンティティが表示されます。
1. **View Related Logs** の横にある下向き矢印をクリックし、次のいずれかを選択します。
    - **View IP Dashboard** を選択すると、IP Investigation ダッシュボードでその IP アドレスの詳細を確認できます。
    - **View Related Signals** を選択すると、シグナルエクスプローラーが開き、IP アドレスに関連する他のシグナルが表示されます。
1. 想定ロールや IAM ユーザーなどのクラウド環境エンティティの場合は、アクティビティグラフを表示して、そのユーザーが実行した他のアクションを確認できます。**View in Investigator** をクリックすると、インベスティゲーターに移動して詳細を確認できます。

### 関連シグナル

**Related Signals** タブをクリックすると、関連シグナルと、それらが共有するフィールドや属性などの情報が表示されます。**View All Related Activity** をクリックすると、シグナルエクスプローラーでシグナルを確認できます。

### 抑制

シグナルを生成した検出ルールの抑制ルールを表示するには、以下のいずれかを実行します。

- **What Happened** セクションで、ファネルアイコンにマウスを合わせ、**Add Suppression** をクリックします。
- **Next Steps** セクションで、**Edit Suppressions** をクリックすると、検出ルールエディタでそのルールの抑制セクションが表示されます。
- 抑制がある場合は、**Suppressions** タブをクリックして抑制のリストを表示します。**Edit Suppressions** をクリックすると、検出ルールエディタに移動し、そのルールの抑制セクションが表示されます。

## コラボレーション

### ケース管理

シグナルを調査する際に、1 つのシグナルだけでは情報が不足する場合があります。 [Case Management][6] を使って複数のシグナルを収集し、タイムラインを作成し、同僚と議論し、分析結果をノートに記録します。

セキュリティシグナルからケースを作成するには:

1. 新しいケースを作成するには、**Next Steps** セクションの **Create Case** をクリックします。既存のケースにシグナルを追加する場合は、**Create Case** の隣にある下向き矢印をクリックし、**Add to an existing case** を選択します。
1. ケースに情報を入力します。
1. **Create Case** をクリックします。

このシグナルはケースを作成したユーザーに自動的に割り当てられ、トリアージ ステータスも `Under Review` に変更されます。

ケースを作成した後、**Case** ボタンにカーソルを合わせると、そのシグナルに関連するケースが表示されます。

**注**: 追加調査の結果、ケースが重大と判断された場合は、ケース内の **Declare Incident** をクリックしてインシデントにエスカレートします。

### インシデントの宣言

それが単一のシグナルに基づくものであろうと、ケースの調査後であろうと、特定の悪意ある活動には対応が求められます。Datadog でインシデントを宣言することで、開発、運用、セキュリティの Teams を結集し、重大なセキュリティイベントに対応することができます。[Incident Management][7]は、インシデントを効果的に特定し、緩和するためのフレームワークとワークフローを Teams に提供します。

シグナルパネルでインシデントを宣言するには:

1. **Next Steps** セクションの **Declare Incident** をクリックします。
1. インシデントテンプレートに入力します。

シグナルをインシデントに追加したい場合は、**Declare Incident** の横にある下向き矢印をクリックし、シグナルを追加したいインシデントを選択してから **Confirm** をクリックします。

### 脅威インテリジェンス

Datadog Cloud SIEM は、当社の脅威インテリジェンスパートナーによって提供された統合脅威インテリジェンスを表示します。これらのフィードは常に更新され、既知の不審な活動に関するデータ（例えば、悪意のある行為者によって使用されていることが知られているIPアドレスなど）が含まれているため、対処すべき潜在的な脅威を迅速に特定することができます。

Datadog は、脅威インテリジェンスフィードからの侵害指標 (IOC) について、取り込まれたすべてのログを自動的に強化します。ログが既知の IOC に一致する場合、 `threat_intel` 属性がログイベントに追加され、利用可能なインテリジェンスに基づく追加的なインサイトが提供されます。

セキュリティシグナルエクスプローラーで一致したすべての脅威インテリジェンスを表示するためのクエリは`@threat_intel.indicators_matched:*` です。以下は、脅威インテリジェンスをクエリするための追加属性です。

- `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="シグナルエクスプローラーでは、residential proxy、corp_vpn、cryptomining、malware といった脅威カテゴリ別に分類され、棒グラフで表示されます" style="width:80%;" >}}

脅威インテリジェンスフィードの詳細については、[脅威インテリジェンス][10]のドキュメントを参照してください。

### ネットワーク IP 属性で検索

ログから不審なアクティビティが検出されたら、そのネットワーク IP を検索して、不審な行為者がシステムを操作したかどうかを判断します。ログエクスプローラーで IP 属性を使って検索するには、次のクエリを使用します。`@network.ip.list:<IP address>` このクエリは、タグ、属性、エラー、メッセージなどログ内の任意の場所で IP を検索します。

このクエリはシグナルパネルから直接起動することもできます。
1. **IPS** セクションの IP アドレスをクリックします。
2. **View Logs with @network.client.ip:<ip_address>** を選択します。

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="シグナルエクスプローラーに、選択された IP アドレスに対する脅威オプションが表示されます。" style="width:90%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/rules/
[2]: /ja/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /ja/account_management/rbac/
[4]: /ja/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/home
[6]: /ja/service_management/case_management/
[7]: /ja/service_management/incident_management/
[8]: /ja/service_management/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /ja/security/cloud_security_management/workflows/
[10]: /ja/security/threat_intelligence
[11]: /ja/security/suppressions/#create-a-suppression-rule