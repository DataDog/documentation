---
aliases:
- /ja/sensitive_data_scanner/investigate_sensitive_data_issues/
- /ja/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
- /ja/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
description: 検出結果ページで、ブラスト半径分析、影響を受けるサービス、Case Management、Incident Management のインテグレーションなど、Sensitive
  Data Scanner の検出結果をトリアージして調査します。
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: ドキュメント
  text: テレメトリデータ用に Sensitive Data Scanner をセットアップする
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: ドキュメント
  text: クラウドストレージ用に Sensitive Data Scanner をセットアップする
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: Sensitive Data Scanner で、機密データの問題を大規模に発見し、トリアージし、修復する
title: 機密データの検出結果を調査する
---
## 概要 {#overview}

Datadog の Sensitive Data Scanner を使用すれば、機密データを検出・分類し、必要に応じてマスキングすることで、機密データの漏洩やコンプライアンス違反のリスクを抑えることができます。機密データの検出結果が見つかると、次のような疑問が生じます。

- どのような機密データが公開されているか?
- 機密データ公開の優先度はどのくらいか?
- 拡散範囲と量の観点から、検出結果の深刻度はどの程度か?
- 機密データはどこから発生したか?

Sensitive Data Scanner の[検出結果][1]ページでは、機密データの検出結果が分類され、優先順位が付けられます。その情報を基に、検出結果の調査、共同作業、記録を行い、それらの疑問に答えることができます。

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="ルール別にグループ化された Sensitive Data Scanner の検出結果エクスプローラー。US Passport Scanner ルールが展開され、重大な検出結果、一致数、週次トレンドチャートが表示されています。" style="width:100%;" >}}

## 機密データの検出結果をトリアージする {#triage-sensitive-data-findings}

[検出結果][1]ページに移動して、選択した時間枠内のすべての機密データ検出結果を確認し、その調査を開始します。

{{< tabs >}}
{{% tab "ログ" %}}

ログの検出結果エクスプローラーは、ログの検出結果を調査するための更新されたエクスペリエンスです。ログの検出結果が 1 つでもあると、このエクスプローラーがデフォルトで開きます。APM、RUM、およびイベントの検出結果は、このエクスプローラーでは確認できません。それらの検出結果を確認するには、ページ上部のバナーにある {{< ui >}}Go back{{< /ui >}} をクリックします。

ログの検出結果を調査するには:

1. {{< ui >}}Group by{{< /ui >}} を使用して、検出結果を {{< ui >}}Rule{{< /ui >}}、{{< ui >}}Logs Pattern{{< /ui >}}、または {{< ui >}}Service{{< /ui >}} で整理します。機密データがアクティブに公開されている検出結果を表示するには、{{< ui >}}Match State{{< /ui >}} ファセットの {{< ui >}}Leaking{{< /ui >}} でフィルタリングします。
2. 検出結果をクリックして詳細パネルを開きます。
3. パネルの上部で、{{< ui >}}First Detected{{< /ui >}} と {{< ui >}}Last Detected{{< /ui >}} をチェックして、公開がどのくらいの期間アクティブであったかを調べます。
4. サマリーセクションで、{{< ui >}}Match State{{< /ui >}}、{{< ui >}}Service{{< /ui >}}、{{< ui >}}Environment{{< /ui >}}、および {{< ui >}}Total matches{{< /ui >}} を確認して、公開のスコープを調べます。
5. {{< ui >}}Logs Pattern{{< /ui >}} を確認して、機密データが検出されたログ行の形式を調べます。
6. {{< ui >}}Example Logs{{< /ui >}} セクションで、影響を受けるログの代表的な例を最大 5 つ確認します。ログの例が期限切れになると、一致する次のイベントに置き換えられます。{{< ui >}}Show log{{< /ui >}} をクリックして例を展開し、そのログメッセージ、フィールド、属性をインラインで調査します。デフォルトでは、ログの例は 7 日間保存され、Data Scanner の読み取り権限を持つすべてのユーザーがアクセスできます。これらのログの例を保存する期間を変更するには、[サポート][1]にお問い合わせください。
7. {{< ui >}}Matches Trend{{< /ui >}} を確認して、過去 1 週間に一致量がどのように変化したかを調べます。{{< ui >}}Related Access and Configuration Events{{< /ui >}} を使用して、最近のアクセスイベントやスキャングループまたはスキャンルールの変更が、一致量の変化と揃っているかどうかをチェックします。

さらに、次のことができます。
- {{< ui >}}Apply Targeted Obfuscation{{< /ui >}} を使用して、この検出結果に対する新しいログで以降の機密データの一致を難読化したり、難読化をサービス全体に展開したりできます。マスキングがすでに有効になっている場合は、このセクションを使用して、一致するログがどのように難読化されるかを確認します。
- {{< ui >}}Tune Detection Logic{{< /ui >}} を使用して、スキャンルールのキーワードを編集したり、誤検知やリスク受容データに対する抑制を適用したりできます。
- {{< ui >}}Generate Code Fix{{< /ui >}} を使用して、漏洩の原因となっているログパターンを特定して修正案を提示する [Bits Code][2] セッションを起動できます。修正内容を確認し、セッションから直接プルリクエストを作成します。ソースリポジトリが Bits Code にすでにオンボーディングされている必要があります。

[1]: /ja/help
[2]: /ja/bits_ai/bits_code/

{{% /tab %}}
{{% tab "APM、RUM、イベント" %}}

{{< ui >}}Sensitive Data Rule Findings{{< /ui >}} タブで、機密データの検出結果を優先度ステータス、ケースステータス、およびドメインでフィルタリングできます。

検出結果を調査するには:

1. リストで検出結果をクリックします。
2. 検出結果パネルで、{{< ui >}}View Recent Changes{{< /ui >}} をクリックして [Audit Trail][3] に移動し、機密データの検出結果の原因となった最近の構成変更がないか確認します。
3. 次のオプションを使用して、クエリに一致するさまざまな種類のデータを調査します。
   1. クエリに関連するすべてのログを Log Explorer で確認するには、{{< ui >}}View All Logs{{< /ui >}} をクリックします。
   1. クエリに一致するすべてのトレースを Trace Explorer で確認するには、{{< ui >}}View All APM Spans{{< /ui >}}をクリックします。
   1. クエリに一致するすべての RUM イベントを確認するには、{{< ui >}}View All RUM Events{{< /ui >}} をクリックします。
   1. クエリに一致するすべてのイベントを確認するには、{{< ui >}}View All Events{{< /ui >}} をクリックします。
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="重大な Visa Card Scanner の検出結果が表示された検出結果パネル" style="width:50%;">}}
4. {{< ui >}}Blast Radius{{< /ui >}} セクションで下記を行います。
   1. この機密データの検出結果によって影響を受ける上位 10 個のサービス、ホスト、環境を確認します。
   1. サービスをクリックして、そのサービスに関する詳細情報を {{< ui >}}Catalog{{< /ui >}} で確認します。
   1. ホストをクリックして、そのホストに関する詳細情報を [Infrastructure List] (インフラストラクチャーリスト) ページで確認します。
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="影響を受ける上位 10 個のサービスが表示された検出結果パネル" style="width:50%;">}}

   機密データの検出に使用されたスキャンルールを変更するには、パネル上部の {{< ui >}}Modify Rule{{< /ui >}} をクリックします。

さらに、次のことも可能です。
- [Case Management][1] を使用して検出結果の追跡、トリアージ、調査を行います。パネル上部の {{< ui >}}Create Case{{< /ui >}} をクリックします。関連するケースが検出結果ページに表示されます。
- [Incident Management][2] を使用してインシデントを作成します。既存のインシデントに検出結果を追加するか、新しいインシデントを宣言できます。既存のインシデントに検出結果を追加するには、{{< ui >}}Declare Incident{{< /ui >}} ドロップダウンメニューをクリックします。新しいインシデントを宣言するには、{{< ui >}}Declare Incident{{< /ui >}} をクリックします。
- [Audit Trail][3] を使用して、Datadog 内で誰がこの機密データにアクセスしたかを確認します。{{< ui >}}Users who accessed these events{{< /ui >}} セクションで {{< ui >}}View in Audit Trail{{< /ui >}} をクリックします。

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="セキュリティ検出結果、ケースの担当者と作成者、およびイベントのタイムラインが表示されたケースページ" style="width:60%;">}}

[1]: /ja/incident_response/work_management/
[2]: /ja/incident_response/incident_management/
[3]: /ja/account_management/audit_trail

{{% /tab %}}
{{% tab "クラウドストレージ" %}}

{{< ui >}}Datastores with Sensitive Data{{< /ui >}} タブをクリックすると、クラウドストレージのすべての機密データ検出結果が表示されます。

データストアを調査するには:

1. データストアをクリックします。
1. 機密データが見つかったファイルを表示し、ファイルをクリックして AWS で調査できます。
  Datadog では、次の対応を推奨しています。
    - いくつかのファイルを確認し、分類の精度を把握します。
    - サイドパネルに記載されているチームまたはサービス所有者に連絡し、機密データがそのバケットに含めるべきものかどうかを確認します。
      - そのバケットに含めるべきものでない場合は、ファイルを削除するか、適切なバケットに移動します。
      - そのバケットに含めるべきものである場合は、セキュリティポスチャを改善するために次の手順を実行します。
        1. サイドパネルの {{< ui >}}Security{{< /ui >}} タブをクリックし、{{< ui >}}Misconfigurations{{< /ui >}} セクションを確認します。
        1. 誤構成をクリックして、Cloud Security で詳細を確認します。
        1. {{< ui >}}Next Steps{{< /ui >}} セクションで下記を行います。
            1. {{< ui >}}Triage{{< /ui >}} のドロップダウンをクリックして、シグナルのトリアージステータスを変更します。デフォルトのステータスは `OPEN` です。
            1. 自分自身または他の Datadog ユーザーにシグナルを割り当てるには、{{< ui >}}Assign Signal{{< /ui >}} をクリックします。
            1. 検出結果の修正方法に関する詳細を確認するには、{{< ui >}}See remediation{{< /ui >}} をクリックします。
            1. {{< ui >}}More Actions{{< /ui >}} で、Jira 課題の追加、ワークフローの実行、コメントの追加を行うことができます。
        ワークフローを実行するには、{{< ui >}}Run Workflow{{< /ui >}} を選択し、実行するワークフローをワークフローブラウザで検索して選択します。詳細については、[Workflow Automation によるセキュリティワークフローの自動化][1]を参照してください。
          1. それぞれのタブをクリックして、重大度の内訳、関連ログ、および検出結果のタイムラインを確認します。

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="「S3 buckets should have Block Public Access enabled」の誤構成が表示されたデータストア検出結果のサイドパネル" style="width:90%;">}}

[1]: /ja/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry