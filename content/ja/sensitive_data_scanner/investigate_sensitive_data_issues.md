---
further_reading:
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: 機密データスキャナーのセットアップ
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーで、機密データの問題を大規模に発見し、トリアージし、修復する
title: 機密データ問題を調査する
---

## 概要

機密データスキャナーは、機密データの特定、タグ付け、そしてオプションで編集またはハッシュ化のために使用される、ストリームベースのパターンマッチングサービスです。機密データの問題が発見された場合、次のような疑問が生じるかもしれません。

- 漏洩したのはどのような機密データか？
- 今回の機密データ漏洩はどれくらいの優先度で取り扱うべきか？
- データの拡散や量の面で問題はどの程度深刻か？
- 機密データはどこから来たものか？

機密データスキャナーの [Summary][1] ページでは、機密データに関する問題が分類・優先順位付けされ、調査、共同作業、発見事項の文書化を行い、それらの質問に答えることができます。

{{<img src="sensitive_data_scanner/sds_summary_12_01_24.png" alt="機密データの問題の数、有効なスキャンルールの数、問題のリストが表示された機密データスキャナーの summary ページ" style="width:80%;">}}

## 機密データに関する問題のトリアージ

[Summary][1] ページを使用して、選択した時間枠内のすべての機密データ関連の問題を確認し、問題の調査を開始します。

**Sensitive Data Issues** セクションで優先度でフィルタリングすると、**Issues Overview** セクションにその優先度の問題のみが表示されます。**Cases** セクションでケースのステータスでフィルタリングすると、そのステータスを持つケースに関連する問題が **Issues Overview** セクションに表示されます。

問題を調査するには:

1. **Issues Overview** で問題をクリックします。
2. 問題パネルで、**View Recent Changes** をクリックして[監査証跡][4] に移動し、最近行われた構成の変更で機密データの問題の原因となったものがないかを確認します。
3. **View All Logs** をクリックすると、クエリに一致するすべてのログがログエクスプローラーに表示されます。
**View All APM Spans** をクリックすると、クエリに一致するすべてのトレースがトレースエクスプローラーに表示されます。
**View All RUM Events** をクリックすると、クエリに一致するすべての RUM イベントがRUM エクスプローラーに表示されます。
**View All Events** をクリックすると、クエリに一致するすべてのイベントがイベントエクスプローラーに表示されます。
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="visa カードスキャナーの重大な問題が表示された問題パネル" style="width:50%;">}}
4. **Blast Radius** セクションで、
   a. この機密データの問題の影響を受けた上位 10 個のサービス、ホスト、環境を確認します。
   b. サービスをクリックすると、サービスの詳細が**サービス カタログ**に表示されます。  
   c. ホストをクリックすると、ホストの詳細情報が Infrastructure List ページに表示されます。
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="影響を受けた上位 10 個のサービスが表示された問題パネル" style="width:50%;">}}
機密データの問題の検出に使用されたスキャンルールを修正する場合は、パネル上部の **Modify Rule** をクリックします。

また、以下のことが可能です。
- [ケース管理][2]を使用して問題の追跡、トリアージ、調査を行うには、パネル上部の **Create Case** をクリックします。関連するケースが Summary ページに表示されます。
- [インシデント管理][3]を使用してインシデントを作成し、既存のインシデントに問題を追加するか、新しいインシデントを宣言できます。既存のインシデントに問題を追加するには、**Declare Incident** ドロップダウンメニューをクリックします。新しいインシデントを宣言するには、**Declare Incident** をクリックします。
- [監査証跡][4]を使用して、Datadog 内で誰がこの機密データにアクセスした可能性があるかを確認できます。**Users who accessed these events** セクションの **View in Audit Trail** を使用します。

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="セキュリティの問題、ケースの担当者および作成者に関する情報とイベントのタイムラインが表示されたケースページ" style="width:60%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[2]: /ja/service_management/case_management/
[3]: /ja/service_management/incident_management/
[4]: /ja/account_management/audit_trail