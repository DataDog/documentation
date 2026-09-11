---
aliases:
- /ja/sensitive_data_scanner/investigate_sensitive_data_issues/
- /ja/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: ドキュメント
  text: Set up Sensitive Data Scanner for Telemetry Data
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: ドキュメント
  text: Set up Sensitive Data Scanner for Cloud Storage
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーを使用して、機密データの問題を大規模に発見、トリアージ、そして修復する
title: 機密データの問題を調査
---

## 概要

Datadog の Sensitive Data Scanner は、機密データを特定・分類し、必要に応じてマスキングすることで、機密データの漏えい防止とコンプライアンス違反リスクの低減に役立ちます。機密データの問題が見つかった場合、次のような疑問が生じるかもしれません。

- 漏洩したのはどのような機密データか？
- 今回の機密データ漏洩はどれくらいの優先度で取り扱うべきか？
- データの拡散や量の面で問題はどの程度深刻か？
- 機密データはどこから来たものか？

機密データスキャナーの [Summary][1] ページでは、機密データに関する問題が分類・優先順位付けされ、調査、共同作業、発見事項の文書化を行い、それらの質問に答えることができます。

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="The summary page showing an overview of sensitive issues broken down by priority" style="width:100%;" >}}

## 機密データに関する問題のトリアージ

[Summary][1] ページに移動し、選択した期間内のすべての機密データ関連の問題を確認して、調査を開始します。

{{< tabs >}}
{{% tab "テレメトリー データ" %}}

**Sensitive Data Issues** セクションで優先度でフィルタリングすると、**Issues Overview** セクションにその優先度の問題のみが表示されます。**Cases** セクションでケースのステータスでフィルタリングすると、そのステータスを持つケースに関連する問題が **Issues Overview** セクションに表示されます。

問題を調査するには:

1. **Issues Overview** で問題をクリックします。
2. 問題パネルで、**View Recent Changes** をクリックして [Audit Trail][3] に移動し、最近行われた構成の変更で機密データの問題の原因となったものがないかを確認します。
3. 以下のオプションを使用して、クエリに一致するさまざまなタイプのデータを検索します。
    a. Log Explorer でクエリに関連するすべてのログを表示するには、**View All Logs** をクリックします。<br>
    b. Trace Explorer でクエリに一致するすべての APM スパンを表示するには、**View All APM Spans** をクリックします。<br>
    c. クエリに一致するすべての RUM イベントを表示するには、**View All RUM Events** をクリックします。<br>
    d. クエリに一致するすべてのイベントを表示するには、**View All Events** をクリックします。
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="visa カードスキャナーの重大な問題が表示された問題パネル" style="width:50%;">}}
4. **Blast Radius** セクションで:<br>
    a. この機密データの問題の影響を受けた上位 10 個のサービス、ホスト、環境を確認します。<br>
    b. サービスをクリックすると、**Software Catalog** で当該サービスの詳細を確認できます。<br>
   c. ホストをクリックすると、ホストの詳細情報が Infrastructure List ページに表示されます。
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="影響を受けた上位 10 個のサービスが表示された問題パネル" style="width:50%;">}}
機密データの問題の検出に使用されたスキャンルールを修正する場合は、パネル上部の **Modify Rule** をクリックします。

また、以下のことが可能です。
- [Case Management][1] を使用して問題の追跡、トリアージ、調査を行うには、パネル上部の **Create Case** をクリックします。関連するケースが Summary ページに表示されます。
- [Incident Management][2] を使用してインシデントを作成し、既存のインシデントに問題を追加するか、新しいインシデントを宣言できます。既存のインシデントに問題を追加するには、**Declare Incident** のドロップダウン メニューをクリックします。新しいインシデントを宣言するには、**Declare Incident** をクリックします。
- [Audit Trail][3] を使用して、Datadog 内で誰がこの機密データにアクセスした可能性があるかを確認できます。**Users who accessed these events** セクションで **View in Audit Trail** をクリックします。

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="セキュリティの問題、ケースの担当者および作成者に関する情報とイベントのタイムラインが表示されたケースページ" style="width:60%;">}}

[1]: /ja/service_management/case_management/
[2]: /ja/service_management/incident_management/
[3]: /ja/account_management/audit_trail

{{% /tab %}}
{{% tab "クラウド ストレージ" %}}

**Datastores with Sensitive Data** タブをクリックすると、クラウド ストレージの機密データに関するすべての問題が表示されます。

**Datastores with Sensitive Data** セクションで、任意のドロップダウン メニューをクリックして、機密データの種類、アカウント、リージョン、チームなどでデータストアをフィルタリングします。

データストアを調査するには:

1. データストアをクリックします。
1. 機密データが検出されたファイルを表示し、ファイルをクリックして AWS で検査することができます。
  Datadog は、以下の作業を行うことを推奨しています。
    - 分類の精度を把握するために、いくつかのファイルを確認する。
    - サイド パネルに記載されているチームまたはサービス オーナーに、機密データをそのバケットに含める想定かどうかを確認します。
      - バケット内にあるべきでない場合は、ファイルを削除するか、適切なバケットに移動します。
      - バケット内にあることが想定されている場合は、以下の手順を実施してセキュリティ ポスチャを改善します。
        1. サイド パネルの **Security** タブをクリックし、**Misconfigurations** セクションを確認します。
        1. 構成ミスをクリックして、Cloud Security で詳細を確認します。
        1. **Next Steps** セクションで:
            1. **Triage** で、ドロップダウン メニューをクリックしてシグナルのトリアージ ステータスを変更します。デフォルトのステータスは `OPEN` です。
            1. **Assign Signal** をクリックして、自分自身または他の Datadog ユーザーにシグナルを割り当てます。
            1. **See remediation** をクリックすると、問題の修復方法について詳細が表示されます。
            1. **More Actions** では、Jira の課題を追加したり、ワークフローを実行したり、コメントを追加したりすることができます。
        ワークフローを実行するには、**Run Workflow** を選択し、ワークフロー ブラウザで実行するワークフローを検索して選択します。詳細については、[Workflow Automation を使用してセキュリティ ワークフローを自動化する][1]を参照してください。
          1. 各タブをクリックすると、問題の深刻度の内訳、関連ログ、タイムラインが表示されます。

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="S3 バケットは Block Public Access を有効化すべきという誤構成が表示されたデータストア問題のサイド パネル" style="width:90%;">}}

[1]: /ja/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary