---
aliases:
- /ja/security/cloud_siem/investigate_security_signals
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: ドキュメント
  text: 検出ルールの条件ロジックについて学ぶ
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password をモニターする
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: ブログ
  text: 'Cloud SIEM の新機能: AI を活用した調査、強化された脅威インテリジェンス、スケーラブルなセキュリティオペレーション'
- link: /bits_ai/bits_security_analyst/
  tag: ドキュメント
  text: Bits Security Analyst
title: セキュリティシグナルの調査
---
## 概要 {#overview}

Cloud SIEM セキュリティシグナルは、Datadog が検出ルールに基づいてログを分析し、脅威を検出した際に作成されます。専用のクエリ言語を習得しなくても、Signals Explorer でセキュリティシグナルの表示、検索、フィルタリング、相関分析を行えます。Datadog プラットフォーム上で、セキュリティシグナルを自分自身や他のユーザーに割り当てることもできます。Signals Explorer に加えて、[通知ルール][1]を設定して特定の個人やチームにシグナルを送信し、問題を常に把握できるようにすることもできます。

セキュリティシグナルの変更 (状態の変更や [Audit Trail][2] でのシグナルアクション履歴の表示など) を行うには、`Security Signals Write` 権限が必要です。Datadog のデフォルトのロールおよび Datadog Security の Cloud Security で利用可能な、ロールベースのきめ細かいアクセス制御権限については、[ロールベースのアクセス制御][3]を参照してください。

Cloud SIEM セキュリティシグナルを調査する自律型 AI エージェントを使用したい場合は、[Bits Security Analyst][14] を参照してください。

## Signals Explorer {#signals-explorer}

Signals Explorer では、ファセットパネルまたは検索バーを使用して、シグナルをグループ化およびフィルタリングします。たとえば、[重大度](#view-signals-by-severity)、[検出ルール](#view-signals-by-detection-rules)、[MITRE ATT&CK](#view-signals-by-mitre-attck)ごとにシグナルを表示できます。ユースケースに合わせてシグナルをフィルタリングしたら、[保存済みビュー][4]を作成して、後でクエリを再読み込みできるようにします。

### 重大度別にシグナルを表示 {#view-signals-by-severity}

特定の重大度 (例: `HIGH` や `CRITICAL`) を持ち、`open` または `under review` トリアージ状態にあるすべてのシグナルを表示するには、次のいずれかを行います。

- ファセットパネルの {{< ui >}}Severity{{< /ui >}} セクションで、{{< ui >}}Critical{{< /ui >}}、{{< ui >}}High{{< /ui >}}、{{< ui >}}Medium{{< /ui >}} を選択します。{{< ui >}}Signal State{{< /ui >}} セクションで、{{< ui >}}open{{< /ui >}} と {{< ui >}}under_reviewed{{< /ui >}} のみが選択されていることを確認します。
- 検索バーに `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)` と入力します。

{{< ui >}}Signal State{{< /ui >}} 列を追加するには、テーブルの右上にある {{< ui >}}Options{{< /ui >}} ボタンを選択し、ファセット: `@workflow.triage.state` を追加します。これによりシグナルのステータスが表示され、ヘッダーからステータスで並べ替えることができます。

さまざまな視覚化を使用して、環境内の脅威アクティビティを調査します。たとえば、{{< ui >}}Visualize by{{< /ui >}} フィールドでは、シグナルを以下のようにグループ化できます。

- {{< ui >}}Rules List{{< /ui >}} では、さまざまな検出ルール全体のボリュームとアラートの傾向を確認できます。
- {{< ui >}}Timeseries{{< /ui >}}時間の経過に伴うシグナルの傾向を確認できます。
- {{< ui >}}Top List{{< /ui >}}発生回数が多い順にシグナルを確認できます。
- {{< ui >}}Table{{< /ui >}}指定したタグキー (例: `source`、`technique` など) 別にシグナルを確認できます。
- {{< ui >}}Pie Chart{{< /ui >}}各検出ルールの相対ボリュームを確認できます。

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="検出ルール別に分類されたシグナルを表示する Signals Explorer" style="width:100%;" >}}

### 検出ルール別にシグナルを表示 {#view-signals-by-detection-rules}

検出ルールに基づいてシグナルを表示するには、検索バーの下にある {{< ui >}}Visualize as{{< /ui >}} フィールドで {{< ui >}}Rules List{{< /ui >}} をクリックします。ルールをクリックして、そのルールに関連するシグナルを確認します。シグナルをクリックして、シグナルの詳細を確認します。

### MITRE ATT&CK 別にシグナルを表示 {#view-signals-by-mitre-attck}

MITRE ATT&CK の Tactic および Technique でシグナルを表示するには:
1. 検索バーの下にある {{< ui >}}Table{{< /ui >}} フィールドで {{< ui >}}Visualize as{{< /ui >}} を選択し、{{< ui >}}Tactic{{< /ui >}} でグループ化します。
1. 最初のグループ `by` の隣にあるプラスアイコンをクリックして、2 つ目のグループ `by` を追加し、そのグループに対して {{< ui >}}Technique{{< /ui >}} を選択します。
1. 表で戦術またはテクニックのいずれかをクリックすると、シグナルをさらに調査およびフィルタリングするためのオプションが表示されます。たとえば、その戦術やテクニックに関連するシグナルを表示したり、特定の戦術やテクニックを検索または除外したりできます。

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="戦術とテクニックのリストを表示する Signals Explorer テーブル" style="width:100%;" >}}

### 単一シグナルのトリアージ {#triage-a-single-signal}

1. Datadog で、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Signals{{< /ui >}}][5] に移動します。
1. 表からセキュリティシグナルをクリックします。
1. {{< ui >}}What Happened{{< /ui >}} セクションで、クエリに一致したログを確認します。クエリにカーソルを合わせると、クエリの詳細が表示されます。
    - ユーザー名やネットワーク IP などの特定の情報も確認できます。{{< ui >}}Rule Details{{< /ui >}} で、漏斗アイコンをクリックして抑制ルールを作成するか、既存の抑制に情報を追加します。詳細については、[抑制ルールを作成][11]を参照してください。
1. {{< ui >}}Next Steps{{< /ui >}} セクションで、次の操作を行います。
   1. {{< ui >}}Triage{{< /ui >}} で、ドロップダウンをクリックしてシグナルのトリアージステータスを変更します。デフォルトのステータスは `OPEN` です。
      - `Open`: Datadog Security がルールに基づいて検出をトリガーし、その結果発生したシグナルがまだ解決されていません。
      - `Under Review`: 調査が進行中の場合は、トリアージステータスを `Under Review` に変更します。`Under Review` 状態から、必要に応じてステータスを `Archived` または `Open` に変更できます。
      - `Archived`: シグナルの原因となった検出が解決されたら、ステータスを `Archived` に更新します。シグナルがアーカイブされると、将来の参照用に理由と説明を追加できます。アーカイブされた問題が再発した場合、またはさらなる調査が必要な場合は、ステータスを `Open` に戻すことができます。すべてのシグナルは、作成から 30 日後にロックされます。</ul>
   1. {{< ui >}}Assign Signal{{< /ui >}} をクリックして、自分自身または他の Datadog ユーザーにシグナルを割り当てます。
   1. {{< ui >}}Take Action{{< /ui >}} で、ケースの作成、インシデントの宣言、抑制の編集、ワークフローの実行を行うことができます。ケースを作成すると、トリアージステータスが自動的に `Under Review` に設定されます。ケースとシグナルの関連付けの詳細については、[Case Management](#case-management) を参照してください。

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="侵害された AWS IAM ユーザーアクセスキーのシグナルサイドパネル。2 つの IP アドレスとその場所が表示されています。" style="width:90%;" >}}

### 複数のシグナルのトリアージ {#triage-multiple-signals}

一括アクションを使用して、複数のシグナルをトリアージします。一括アクションを使用するには、まず Signals Explorer でシグナルを検索およびフィルタリングしてから、次の操作を行います。

1. 一括アクションを実行するシグナルの左側にあるチェックボックスをクリックします。Signals Explorer のリストにあるすべてのシグナルを選択するには、{{< ui >}}Status{{< /ui >}} 列ヘッダーの横にあるチェックボックスを選択します。
1. シグナル表の上にある {{< ui >}}Bulk Actions{{< /ui >}} ドロップダウンメニューをクリックし、実行したいアクションを選択します。

**注**: Signals Explorer は、一括アクションを実行すると動的な更新を停止します。

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="一括アクションオプションが表示されている Signals Explorer" style="width:55%;" >}}

### Workflow Automation の実行 {#run-workflow-automation}

Workflow Automation を使用して、シグナルの調査と修復に役立つアクションを実行します。これらのアクションには以下が含まれます。
- お使いの環境から IP アドレスをブロックします。
- ユーザーアカウントを無効にします。
- サードパーティの脅威インテリジェンスプロバイダーで IP アドレスを調査します。
- 同僚に Slack メッセージを送信して、調査への協力を依頼します。

シグナルのサイドパネルにある {{< ui >}}Workflows{{< /ui >}} タブをクリックすると、そのシグナルに対してトリガーされたワークフローと、実行が推奨されるワークフローを確認できます。推奨されるワークフローを実行する場合は、{{< ui >}}Run Workflow{{< /ui >}} をクリックします。詳細については、[推奨ワークフローの選択方法](#how-suggested-workflows-are-selected)を参照してください。ワークフローに追加の入力変数が必要な場合は、ダイアログボックスが表示され、続行する前に必要な値を入力するよう求められます。

実行したいワークフローがリストに表示されない場合は、{{< ui >}}Search and Run Workflow{{< /ui >}} をクリックします。ワークフローブラウザで、実行するワークフローを検索して選択します。

または、{{< ui >}}Run Workflows{{< /ui >}} セクションの {{< ui >}}Next Steps{{< /ui >}} を選択して、ワークフローを検索して実行することもできます。

任意のセキュリティシグナルでワークフローを自動トリガーする方法については、[セキュリティシグナルからワークフローをトリガーする][8]および[ワークフロー自動化でセキュリティワークフローを自動化する][9]を参照してください。

#### 推奨ワークフローの選択方法 {#how-suggested-workflows-are-selected}

インシデント対応を効率化し、トリアージ中の摩擦を軽減するために、Cloud SIEM はシグナルに関連するワークフローを提案します。推奨ワークフローは、シグナルとのタグの類似性が最も高いものに基づいて選択されます。Cloud SIEM は、以下の情報を使用してシグナルのワークフローを提案します。

- **事前構成されたフローである Blueprints から自動的に追加されたタグ**<br>
ワークフローは、AWS CloudTrail など、プラットフォームに関連する一連のアクションです。Blueprints から作成されたワークフローには、ソースに基づいてタグが自動的に適用されます。たとえば、「AWS 上の仮想マシンをシャットダウンする」といったワークフローアクションには、`source` タグ AWS CloudTrail が付けられます。
- **手動で追加したタグ**<br>
Blueprints から派生したワークフローとカスタムワークフローの両方に手動でタグを追加することで、優先されるワークフローをカスタマイズできます。正しいコンテキストマッチングを確実にするため、これらのタグは、シグナル、アラートを生成したログ、または検出ルール自体に付けられているタグと一致させる必要があります。
- **タグ付け戦略**<br>
特定のシグナルに対してワークフローが表示されるようにするには、そのワークフローにシグナルと同様のタグを含める必要があります。一般的なシグナルタグは、シグナルのソースまたはサービスです。たとえば、AWS リソースからのシグナルには通常 `source:cloudtrail` というタグが付けられます。ワークフローに `source:cloudtrail` というタグを付けることで、そのワークフローは AWS アクティビティに関連するシグナルと関連付けられます。<br>
特定の検出ルールに対してワークフローを提案させたい場合は、そのワークフローに検出ルール ID (例: `ruleId:abc-123-xyz`) のタグを付けます。

シグナルが作成されると、次のようになります。

- **シグナルとワークフローはタグを使用して照合されます**<br>
セキュリティシグナルが作成されると、Cloud SIEM はシグナルのタグを確認し、既存のワークフローで定義されているタグと照合します。
- **関連する提案が行われます**<br>
サイドパネルに {{< ui >}}Suggested Workflows{{< /ui >}} セクションが表示されます。シグナルのタグと最も一致するタグに基づいて、上位 3 つのワークフローが表示されます。これにより、提案されるアクションがコンテキストを認識し、運用上関連性の高いものになります。

## 調査 {#investigate}

シグナルには、検出された脅威が悪意のあるものかどうかを判断するための重要な情報が含まれています。さらに、詳細な調査のために、[Case Management](#case-management) のケースにシグナルを追加することもできます。

### ログ {#logs}

{{< ui >}}Logs{{< /ui >}} タブをクリックすると、シグナルに関連するログが表示されます。{{< ui >}}View All Related Logs{{< /ui >}} をクリックすると、Log Explorer で関連ログが表示されます。

### エンティティ {#entities}

エンティティを調査するには:

1. タブをクリックすると、ユーザーや IP アドレスなど、シグナルに関連するエンティティが表示されます。{{< ui >}}Entities{{< /ui >}}
1. {{< ui >}}View Related Logs{{< /ui >}} の横にある下矢印をクリックして、以下を選択します。
    - {{< ui >}}View IP Dashboard{{< /ui >}} を選択すると、IP Investigation ダッシュボードでその IP アドレスの詳細を表示できます。
    - {{< ui >}}View Related Signals{{< /ui >}} を選択すると、Signals Explorer が開き、IP アドレスに関連する他のシグナルが表示されます。
1. 想定ロールや IAM ユーザーなどのクラウド環境のエンティティについては、アクティビティグラフを表示して、そのユーザーが他にどのようなアクションを実行したかを確認します。{{< ui >}}View in Investigator{{< /ui >}} をクリックして Investigator に移動し、詳細を確認します。

### 関連シグナル {#related-signals}

{{< ui >}}Related Signals{{< /ui >}} タブをクリックすると、関連シグナルや、シグナル間で共有されているフィールドや属性などの情報が表示されます。{{< ui >}}View All Related Activity{{< /ui >}} をクリックすると、Signals Explorer でシグナルが表示されます。

### 抑制 {#suppressions}

シグナルを生成した検出ルールの抑制ルールを表示するには、以下のいずれかを実行します。

- {{< ui >}}What Happened{{< /ui >}} セクションで、ファネルアイコンにマウスを合わせ、{{< ui >}}Add Suppression{{< /ui >}} をクリックします。
- {{< ui >}}Next Steps{{< /ui >}} セクションで {{< ui >}}Edit Suppressions{{< /ui >}} をクリックすると、検出ルールエディターでそのルールの抑制セクションが表示されます。
-  タブをクリックすると、抑制のリスト (存在する場合) が表示されます。{{< ui >}}Suppressions{{< /ui >}}{{< ui >}}Edit Suppressions{{< /ui >}}をクリックして検出ルールエディターに移動し、そのルールの抑制セクションを表示します。

## コラボレーション {#collaborate}

### Case Management {#case-management}

シグナルを調査するために、単一のシグナルで利用できる情報だけでは不十分な場合があります。[Case Management][6] を使用して、複数のシグナルを収集し、タイムラインを作成し、同僚と議論し、分析や調査結果をノートブックに記録します。

#### Signals Explorer からケースを作成および管理する{#create-and-manage-cases-from-the-signals-explorer}

[Signals Explorer][5] で {{< ui >}}List{{< /ui >}} の視覚化を使用すると、{{< ui >}}Cases{{< /ui >}} 列にシグナルに関連付けられたケースに関する情報が表示されます。その列を使用して、それらのケースを管理できます。
- 単一のシグナルのケースを管理するには、{{< ui >}}Cases{{< /ui >}} 列を使用します。
  - シグナルにケースが関連付けられている場合は、ケース ID にカーソルを合わせると、その情報を表示したり、新しいウィンドウで開いたり、シグナルとのリンクを解除したりできます。
  - シグナルに関連付けられたケースがない場合は、{{< ui >}}Create Case{{< /ui >}} アイコンをクリックして、ケースを作成するか、既存のケースを選択してシグナルに関連付けます。[Create Case] ウィンドウが開きます。
    - ケースを作成するには、{{< ui >}}Create Case{{< /ui >}} ウィンドウで {{< ui >}}Project{{< /ui >}}、{{< ui >}}Title{{< /ui >}}、{{< ui >}}Description{{< /ui >}}、および {{< ui >}}Assignee{{< /ui >}} を入力し、{{< ui >}}Create Case{{< /ui >}} をクリックします。
    - 既存のケースを選択するには、{{< ui >}}Create Case{{< /ui >}} ウィンドウで {{< ui >}}Add to Existing Case{{< /ui >}} タブをクリックします。ケースを選択し、{{< ui >}}Attach to an Existing Case{{< /ui >}} をクリックします。
- 複数のシグナルのケースを管理するには、
  1. ケースにリンクするシグナルを選択します。
  1. 表示される {{< ui >}}Bulk Actions{{< /ui >}} リストで、{{< ui >}}Create a Case{{< /ui >}} または {{< ui >}}Add to Existing Case{{< /ui >}} をクリックします。[Create Case] ウィンドウが開きます。
     - ケースを作成するには、{{< ui >}}Create Case{{< /ui >}} ウィンドウで {{< ui >}}Project{{< /ui >}}、{{< ui >}}Title{{< /ui >}}、{{< ui >}}Description{{< /ui >}}、および {{< ui >}}Assignee{{< /ui >}} を入力し、{{< ui >}}Create Case{{< /ui >}} をクリックします。
     - 既存のケースを選択するには、{{< ui >}}Create Case{{< /ui >}} ウィンドウで {{< ui >}}Add to Existing Case{{< /ui >}} タブをクリックします。ケースを選択し、{{< ui >}}Attach to an Existing Case{{< /ui >}} をクリックします。

ユーザーがケースを作成すると、デフォルトで以下の自動変更が行われます。
- トリアージステータスが自動的に `Under Review` に設定されます。
- 担当者がそのユーザーに設定されます。

これらのデフォルト設定を変更するには、[シグナルおよびセキュリティケースのデフォルト動作の管理](#manage-default-behavior-for-signals-and-security-cases) を参照してください。

**注**: 追加調査の結果、ケースが重大と判断された場合は、ケース内の {{< ui >}}Declare Incident{{< /ui >}} をクリックしてインシデントにエスカレートします。

#### セキュリティ関連ケースの管理 {#manage-security-related-cases}

[Cases][12] ページでは、セキュリティプロジェクト専用のケースを表示できます。ケースをフィルタリングして、自分に割り当てられたケースや自分が作成したケースのみを表示したり、特定のステータスや特定のプロジェクトにあるケースのみを表示したりできます。また、プロジェクトにスターを付けることで、簡単に移動できるようになります。

ケースの {{< ui >}}Security Signals{{< /ui >}} セクションでは、それに関連付けられたシグナルを表示したり、{{< ui >}}Add Signals{{< /ui >}} をクリックしてケースに関連付けるフィルターを検索したりできます。

#### シグナルおよびセキュリティケースのデフォルト動作の管理 {#manage-default-behavior-for-signals-and-security-cases}

Cloud SIEM の[セキュリティケース][13]設定ページでは、シグナルとセキュリティケースのデフォルト動作を管理できるため、シグナルとセキュリティケースを手動または自動で相互に関連付ける際の時間を節約できます。選択した設定は、今後作成されるすべてのシグナルおよびセキュリティケースに対して直ちに有効になります。過去に遡って適用されることはありません。

- **ケースプロジェクト設定**

  デフォルトの Cloud SIEM セキュリティケースプロジェクトと、選択可能なその他のセキュリティプロジェクトを選択します。
  - **デフォルトの SIEM セキュリティケースプロジェクト**: セキュリティケースをプロジェクトに関連付ける際に、デフォルトで表示されるプロジェクトを選択します。このプロジェクトは、Cloud SIEM の [Cases] ページでデフォルトのプロジェクトとしても表示されます。
  - **セキュリティケースのプロジェクトスコープ**: セキュリティケースの関連付け先として選択できるセキュリティケースプロジェクトを最大 20 個まで選択します。

- **ケース作成のデフォルト**

  1 つ以上のシグナルからケースを作成する際、ケースフィールドに応じて、シグナルの値をケースに使用する、値を空のままにする、または固定値を割り当てるかを選択できます。
  <div class="alert alert-tip"><strong>Show signal to case correlation scheme</strong> をクリックして、Datadog がシグナルのステータスをケースのステータスに、シグナルの重大度をケースの優先度にどのようにマッピングするかを確認します。</div>

- **シグナルの添付設定**

  シグナルをケースに添付する際、それらのシグナルに割り当てるデフォルト値を選択します。
  <div class="alert alert-tip"><strong>Show case to signal archive reason mapping</strong> をクリックして、Datadog がケースの解決理由をシグナルのアーカイブ理由にどのようにマッピングするかを確認します。</div>

  - **ケースに添付される際**:
    - **シグナルのステータス**および **シグナルの担当者**: シグナルをケースに添付する際、シグナルのステータスと担当者を維持するか、特定の値を割り当てるかを選択します。
    - **上書きを許可**: このトグルをオンにすると、これらのフィールドの既存の値を上書きできるようになります。このトグルがオフの場合、選択したステータスと担当者は、それらのフィールドが空の場合にのみ適用されます。
  - **ケースを更新する際**:
    - **シグナルのステータス**: ケースに対応するステータスをシグナルに割り当てるか、そのままにするかを選択します。

### インシデントを宣言する {#declare-an-incident}

単一のシグナルに基づく場合でも、ケースの調査後であっても、特定の悪意のあるアクティビティには対応が必要です。Datadog でインシデントを宣言することで、開発チーム、運用チーム、セキュリティチームを集め、重大なセキュリティイベントに対処できます。[Incident Management][7] は、チームがインシデントを効果的に特定し、軽減するためのフレームワークとワークフローを提供します。

シグナルパネルでインシデントを宣言するには:

1. {{< ui >}}Next Steps{{< /ui >}} セクションで {{< ui >}}Declare Incident{{< /ui >}} をクリックします。
1. インシデントテンプレートに入力します。

シグナルをインシデントに追加する場合は、{{< ui >}}Declare Incident{{< /ui >}} の横にある下向き矢印をクリックし、シグナルを追加するインシデントを選択します。{{< ui >}}Confirm{{< /ui >}}をクリックします。

### 脅威インテリジェンス {#threat-intelligence}

Datadog Cloud SIEM は、脅威インテリジェンスパートナーが提供する脅威インテリジェンスを統合して提供します。これらのフィードは、既知の不審なアクティビティ (悪意のあるアクターが使用していることが判明している IP アドレスなど) に関するデータを含むよう常に更新されるため、対処すべき潜在的な脅威を迅速に特定できます。

Datadog は、脅威インテリジェンスフィードから取得した侵害指標 (IOC) を使用して、取り込まれたすべてのログを自動的にエンリッチメントします。ログに既知の IOC との一致が含まれている場合、利用可能なインテリジェンスに基づく追加の洞察を提供するために、`threat_intel` 属性がログイベントに追加されます。

Security Signals エクスプローラーですべての脅威インテリジェンスの一致を確認するためのクエリは `@threat_intel.indicators_matched:*` です。脅威インテリジェンスをクエリするための追加属性は次のとおりです。

- `@threat_intel.results.category`: attack、corp_vpn、cryptomining、malware、residential_proxy、tor、scanner
- `@threat_intel.results.intention`: malicious、suspicious、benign、unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="residential proxy、corp_vpn、cryptomining、malware の脅威インテリジェンスカテゴリー別に分類されたシグナルの棒グラフを表示する Signals Explorer" style="width:80%;" >}}

脅威インテリジェンスフィードの詳細については、[脅威インテリジェンス][10]のドキュメントを参照してください。

### ネットワーク IP 属性で検索 {#search-by-network-ip-attributes}

ログから不審なアクティビティが検出されたら、そのネットワーク IP を検索して、不審なアクターがシステムとやり取りしたかどうかを判断します。Log Explorer で IP 属性を使用して検索するには、次のクエリを使用します: `@network.ip.list:<IP address>`。このクエリは、タグ、属性、エラー、メッセージフィールドなど、ログ内のあらゆる場所にある IP を検索します。

このクエリはシグナルパネルから直接起動することもできます。
1. {{< ui >}}IPS{{< /ui >}} セクションの IP アドレスをクリックします。
2. {{< ui >}}View Logs with @network.client.ip:<ip_address>{{< /ui >}} を選択します。

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="選択した IP アドレスの脅威オプションを表示するシグナルパネル" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/rules/
[2]: /ja/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /ja/account_management/rbac/
[4]: /ja/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /ja/incident_response/work_management/
[7]: /ja/incident_response/incident_management/
[8]: /ja/actions/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /ja/security/cloud_security_management/workflows/
[10]: /ja/security/threat_intelligence
[11]: /ja/security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases
[13]: https://app.datadoghq.com/security/configuration/siem/case-management
[14]: /ja/bits_ai/bits_security_analyst/