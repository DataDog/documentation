---
further_reading:
- link: /security/automation_pipelines
  tag: ドキュメント
  text: 自動化パイプライン
- link: /security/ticketing_integrations
  tag: ドキュメント
  text: チケット連携
- link: /incident_response/work_management
  tag: ドキュメント
  text: Case Management
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
site_support_id: case_management
title: チケット作成ルール
---
{{< product-availability >}}

新しい結果が検出されたときに Jira または Case Management でチケットが自動的に作成されるように、チケット作成ルールを構成します。この方法では、手動でのトリアージなしで既存のエンジニアリングワークフロー内のセキュリティの問題を追跡できるため、チームが新しい脅威に迅速かつ大規模に対応できるようになります。セキュリティの検出結果とのチケット連携の詳細については、「[チケット連携][3]」を参照してください。

## チケット作成ルールを作成する {#create-a-ticket-creation-rule}

1. Datadog で、[[**Security**](セキュリティ) > [**Settings**](設定) > [Findings Automation](検出の自動化)][2] に移動します。[**Add a New Rule**](新規ルールを追加) をクリックし、[**Create Ticket**](チケットを作成) を選択します。[Create a New Rule](新規ルールの作成) ページが開きます。
1. [**Rule name**](ルール名) で、ルールの内容を表す名前を入力します (例:「エンジニアリングチームの重大な脆弱性」)。
1. 以下のフィールドにルールの条件を追加します。
    - **[Any of these types]**(次のいずれかのタイプ): ルールでチェックする検出結果のタイプ。利用可能なタイプは次のとおりです。
      - ランタイムコードの脆弱性
      - 静的コードの脆弱性
      - ライブラリの脆弱性
      - シークレット
      - Infrastructure as Code
      - コンテナイメージの脆弱性
      - ホストの脆弱性
      - 設定ミス
      - 攻撃経路
      - アイデンティティリスク
      - API のセキュリティ
      - ワークロードアクティビティ
    - **[Any of these tags or attributes]**(次のいずれかのタグまたは属性): ルールを適用するために一致する必要があるソースのタグまたは属性。
1. ルールに重大度基準を追加するには、[**Add Severity**](重大度を追加) をクリックしてください。
1. チケットシステムを選択し、チケットの送信先を設定します。
   - **Jira**
     - **[Jira Account]**(Jira アカウント): 使用する Atlassian インスタンスを選択します。
     - **[Space]**(スペース): Jira プロジェクトを選択します。このスペースが [Jira Webhook][5] に追加されていることを確認します。
     - **[Ticket Type]**(チケットタイプ): 作成する Jira 課題のタイプを選択します (例: [**Task**](タスク))。
     - **[Assignee]**(割り当て先) (オプション): 自動作成されたチケットの割り当て先のユーザーを指定します。
     - Datadog が作成する Jira チケットにフィールドを追加するには、[**Add Optional Field**](オプションフィールドを追加) を使用します。
     - [**Data Sync Settings**](データ同期設定) を展開して、リンクされた Case Management プロジェクトと双方向同期設定を確認または更新します。
   - **Case Management**
     - **[Case Management Project]**(Case Management プロジェクト): 既存の Case Management プロジェクトを選択するか、新規に作成します。
     - **[Assignee]**(割り当て先) (オプション): 自動作成されたケースの割り当て先のユーザーを指定します。
1. [**Rate limit**](レート制限) で、このルールで UTC 1 日あたりに作成できる[チケットの最大数](#daily-ticket-limit)を入力します。
1. 保存前にルールをテストするには、[**Test Rule**](ルールをテスト) をクリックし、一致する検出結果を選択して、[**Run Test**](テストを実行) をクリックします。テストが完了したら、作成されたチケットを表示するか、テストチケットを検出結果から分離することができます。
1. [**Save**](保存) をクリックします。このルールは新しい検出結果にのみ適用されます。検出結果が検知されてから対応するチケットが作成されるまでには、数分かかる場合があります。

**注**: チケット作成ルールでは、新しい検出結果に対するチケットのみが作成されます。ルールの作成時に存在していた検出結果に対し、Datadog が遡及的にチケットを作成することはありません。

## 自動的に作成されたチケットを特定する {#identify-automatically-created-tickets}

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="自動化ルールによって作成されたケースが表示されている Case Management チケットのポップアップ。稲妻のアイコンが付けられており、同じルールから作成されたチケットのすべての検出結果を表示できるリンクが表示されています。" style="width:60%;" >}}

ルールによって作成されたチケットには、検出結果のサイドパネルおよびエクスプローラービューで稲妻のインジケーターが付けられます。インジケーターにカーソルを合わせると、そのチケットが作成される原因となった自動化ルールが表示され、ルールへのリンクが示されます。

## ルールの照合順序 {#rule-matching-order}

Datadog は検出結果を特定すると、一連のチケット作成ルールに照らして検出結果を評価します。最初のルールから順番に評価し、一致が検出された場合は、Datadog はそのルールの構成を使用してチケットを作成し、それ以降の評価を停止します。一致が検出されない場合は、Datadog は次のルールに進みます。このプロセスは、一致が検出されるか、一致が検出されないまますべてのルールがチェックされるまで続行されます。

## 1 日のチケット上限 {#daily-ticket-limit}

各ルールには、UTC の深夜 0 時にリセットされる、設定可能な 1 日のチケット上限があります。上限に達すると、Datadog は同じプロジェクト内に、そのルールの 1 日の上限に達したことを示す最後のチケットを 1 件作成し、その日はそれ以上チケットの作成を行いません。上限がリセットされたときに、上限を超えた検出結果に対して遡及的にチケットが作成されることはありません。ただし、手動でチケットを作成することはできます。

## 無効なルール {#broken-rules}

プロジェクトの設定エラーによってチケットが作成できなかった場合 (接続されている Jira プロジェクトが無効になっていた場合など)、Datadog はそのルールを自動的に無効にし、無効とマークします。

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="チケット作成ルールが表示されている自動化パイプラインリスト。[Rule auto-disabled due to a ticketing integration error](チケット連携エラーが原因で自動で無効にされたルール) という警告ツールチップが示されています。" style="width:100%;" >}}

チケットの自動作成を再開するには、プロジェクト構成を修正し、ルールを再度有効にしてください。

## 無効化または削除されたルール {#disabled-or-deleted-rules}

チケット作成ルールを無効化または削除しても、そのルールによって以前に作成されたチケットと検出結果との関連付けはそのまま残ります。関連付けが解除されたり、削除されたりすることはありません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /ja/security/ticketing_integrations/
[5]: /ja/integrations/jira/#configure-a-jira-webhook