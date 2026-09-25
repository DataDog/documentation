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
  text: Work Management
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
title: チケットの作成ルール
---
{{< product-availability >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
新しい検出結果が見つかったときに、Jira、Linear、または Work Management でチケットを自動的に作成するために、チケットの作成ルールを設定します。このアプローチにより、手動でのトリアージなしで既存のエンジニアリングワークフロー内のセキュリティ問題を追跡できるため、チームは新しい脅威に迅速かつ大規模に対応できます。セキュリティの検出結果とチケット連携の詳細については、[チケット連携][3] を参照してください。
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
新しい検出結果が見つかったときに、Jira または Work Management でチケットを自動的に作成するために、チケットの作成ルールを設定します。このアプローチにより、手動でのトリアージなしで既存のエンジニアリングワークフロー内のセキュリティ問題を追跡できるため、チームは新しい脅威に迅速かつ大規模に対応できます。セキュリティの検出結果とチケット連携の詳細については、[チケット連携][3] を参照してください。
{{< /site-region >}}

## チケットの作成ルールを作成する {#create-a-ticket-creation-rule}

1. Datadog で、**Security** > **Settings** > [Findings Automation][2] に移動します。**新しいルールの追加**をクリックし、**チケットの作成**を選択します。新しいルールを作成するページが開きます。
1. **ルール名**の下に、ルールの説明的な名前を入力します (例:「エンジニアリングチームに関する重大な脆弱性」)。
1. 以下のフィールドにルール条件を追加します。
    - **Any of these types**: ルールがチェックする検出結果のタイプ。利用可能なタイプには以下が含まれます。
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secret
      - Infrastructure as Code
      - コンテナイメージの脆弱性
      - ホストの脆弱性
      - 誤構成
      - 攻撃パス
      - アイデンティティリスク
      - API セキュリティ
      - ワークロードアクティビティ
    - **これらのタグまたは属性のいずれか**: ルールを適用するために一致する必要があるリソースタグまたは属性。
1. ルールに重大度基準を追加するには、**重大度の追加**をクリックします。
1. チケットシステムを選択し、チケットの送信先を設定します。
  {{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
  {{< tabs >}}
  {{% tab "Jira" %}}
  - **Jira アカウント**: 使用する Atlassian インスタンスを選択します。このアカウントで [Jira Webhook][5] が設定されていることを確認します。
  - **スペース**: Jira プロジェクトを選択します。
  - **チケットタイプ**: 作成する Jira 課題のタイプを選択します (例: **タスク**)。
  - **担当者** (オプション): 自動作成されたチケットを割り当てるユーザーを指定します。
  - Datadog が作成する Jira チケットにフィールドを追加するには、**オプションフィールドの追加**を使用します。
  - データ同期設定****を展開して、リンクされた Work Management プロジェクトと双方向同期の設定を確認または更新します。

  [5]: /integrations/jira/#configure-a-jira-webhook
  {{% /tab %}}
  {{% tab "Linear" %}}
  - **Linear アカウント**: 使用する Linear アカウントを選択します。このアカウントで [Linear Webhook][6] が設定されていることを確認してください。
  - **チーム**: 問題を作成する Linear チームを選択します。
  - **プロジェクト** (オプション): 自動作成される問題に関連付ける Linear プロジェクトを選択します。
  - **ラベル** (オプション): 自動作成される問題に適用するラベルを選択します。
  - **担当者** (オプション): 自動作成される問題を割り当てるユーザーを指定します。
  - データ同期設定****を展開して、リンクされた Work Management プロジェクトと双方向同期の設定を確認または更新します。

  [6]: /integrations/linear/#configure-a-linear-webhook
  {{% /tab %}}
  {{% tab "Work Management" %}}
  - **Work Management Project**: 既存の Work Management プロジェクトを選択するか、新規作成します。
  - **担当者** (オプション): 自動作成されるケースを割り当てるユーザーを指定します。
  {{% /tab %}}
  {{< /tabs >}}
  {{< /site-region >}}
  {{< site-region region="gov,gov2" >}}
  {{< tabs >}}
  {{% tab "Jira" %}}
  - **Jira アカウント**: 使用する Atlassian インスタンスを選択します。このアカウントで [Jira Webhook][5] が設定されていることを確認します。
  - **スペース**: Jira プロジェクトを選択します。
  - **チケットタイプ**: 作成する Jira 課題のタイプを選択します (例: **タスク**)。
  - **担当者** (オプション): 自動作成されたチケットを割り当てるユーザーを指定します。
  - Datadog が作成する Jira チケットにフィールドを追加するには、**オプションフィールドの追加**を使用します。
  - データ同期設定****を展開して、リンクされた Work Management プロジェクトと双方向同期の設定を確認または更新します。

  [5]: /integrations/jira/#configure-a-jira-webhook
  {{% /tab %}}
  {{% tab "Work Management" %}}
  - **Work Management Project**: 既存の Work Management プロジェクトを選択するか、新規作成します。
  - **担当者** (オプション): 自動作成されるケースを割り当てるユーザーを指定します。
  {{% /tab %}}
  {{< /tabs >}}
  {{< /site-region >}}
1. レート制限****で、このルールが UTC の 1 日あたりに作成できる[チケットの最大数](#daily-ticket-limit)を入力します。
1. 保存前にルールをテストするには、**ルールをテスト**をクリックし、一致する検出結果を選択して、**テストを実行**をクリックします。テストが完了すると、作成されたチケットを表示したり、テストチケットを検出結果から切り離したりできます。
1. **保存**をクリックします。このルールは新しい検出結果にのみ適用されます。検出結果が特定されてから対応するチケットが作成されるまでに数分かかる場合があります。

**注**: チケット作成ルールは、新しい検出結果に対してのみチケットを作成します。ルールを作成しても、Datadog は既存の検出結果に対して遡及的にチケットを作成することはありません。

## 自動作成されたチケットを識別する {#identify-automatically-created-tickets}

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="自動化ルールによって作成されたケースを示す稲妻アイコンと、同じルールから作成されたチケットを持つすべてのケースを表示するリンクが表示されている Work Management チケットのポップアップ" style="width:60%;" >}}

ルールによって作成されたチケットには、検出結果のサイドパネルおよびエクスプローラー表示で稲妻のインジケーターが表示されます。インジケーターにカーソルを合わせると、そのチケットを作成した自動化ルールが表示され、ルールへのリンクが提供されます。

## ルールの一致順序 {#rule-matching-order}

Datadog が検出結果を特定すると、その検出結果をチケット作成ルールのシーケンスに沿って評価します。最初のルールから順に評価し、一致するものがあれば、Datadog はそのルールの構成を使用してチケットを作成し、それ以降の評価を停止します。一致するものがない場合、Datadog は次のルールに進みます。このプロセスは、一致が見つかるか、すべてのルールがチェックされて一致するものがなくなるまで続きます。

## 1 日のチケット上限 {#daily-ticket-limit}

各ルールには、UTC の深夜 0 時にリセットされる設定可能な 1 日のチケット上限があります。上限に達すると、Datadog は同じプロジェクト内に、そのルールが 1 日の上限に達したことを説明する最後のチケットを 1 つ作成し、その日の残りの期間はチケットの作成を停止します。上限を超えた検出結果は、上限がリセットされたときに遡ってチケット化されることはありませんが、手動でチケットを作成することは可能です。

## 壊れたルール {#broken-rules}

プロジェクトの構成エラーによりチケットを作成できない場合 (例: 接続されている Jira プロジェクトが無効になった場合など)、Datadog は自動的にそのルールを無効にし、壊れたルールとしてマークします。

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="「チケット連携エラーのためルールが自動無効化されました」という警告ツールチップが表示されたチケット作成ルールを示す Pipelines リスト" style="width:100%;" >}}

自動チケット作成を再開するには、プロジェクトの構成を修正し、ルールを再度有効にしてください。

## 無効化または削除されたルール {#disabled-or-deleted-rules}

チケット作成ルールを無効化または削除しても、そのルールによって以前に作成されたチケットは検出結果に紐付いたままになります。それらは切り離されたり削除されたりしません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /ja/security/ticketing_integrations/