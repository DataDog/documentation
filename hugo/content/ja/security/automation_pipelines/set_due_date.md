---
further_reading:
- link: /security/automation_pipelines
  tag: ドキュメント
  text: 自動化パイプライン
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
title: 期日ルールを設定
---
{{< product-availability >}}

期日ルールを構成して、指定した SLO の時間枠内に検出結果が確実に対処されるようにします。これらの期日を設定することで、責任の明確化を自動化し、コンプライアンス要件を満たし、セキュリティ問題の迅速な修復を優先させ、潜在的な悪用を防ぐことができます。

## 期日ルールの作成 {#create-a-due-date-rule}

1. Datadog で、**Security** > **Settings** > [Findings Automation][2] に移動します。**Add a New Rule** をクリックし、**Set Due Date** を選択します。[Create a New Rule] ページが開きます。
1. Under **Rule name** に、ルールの説明的な名前を入力します (例:「Cloud インフラストラクチャー 異常警告」)。
1. 以下のフィールドにルール条件を追加します。
    - **Any of these types**: ルールがチェックする検知結果のタイプ。利用可能なタイプは以下のとおりです。
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
1. 期日が必要な深刻度レベルごとに期日を設定します。
1. ルールに CVE ベースの検出結果タイプ (Library、Container Image、または Host の脆弱性) が含まれている場合は、**Calculate due dates from** の下で、SLA クロックの基準日を選択します。
   - **First Seen Date**: Datadog が最初に検出結果を検出した時点から SLA クロックを開始します。
   - **Fix-Available Date**: 脆弱性のパッチが公開された時点から SLA クロックを開始します。まだ修復できないアドバイザリでチームが SLA に違反しないようにしたい場合に便利です。

   その他のすべての検出結果タイプについては、常に First Seen Date が使用されます。
1. **Save** をクリックします。このルールは新しい検知結果に直ちに適用され、既存の検知結果に対しては 1 時間以内にチェックを開始します。

[API][3] または [`datadog_security_findings_due_date_rule`][4] Terraform リソースを使用して期日ルールを作成することもできます。

## 期日が表示される場所 {#where-due-dates-appear}

検出結果に期日が設定されている場合、以下の場所で確認できます。

- エクスプローラー ファセット
- Findings サイドパネル
- Notifications
- Jira チケットの説明
- 最も期日超過の脆弱性が多いチームやリポジトリを特定するためのレポート用メトリクス ("overdue" ブール値)

## ルールの一致順序 {#rule-matching-order}

Datadog が検出結果を特定すると、その検出結果を期日ルールのシーケンスに沿って評価します。最初のルールから順に評価し、一致するものがあれば、Datadog は指定された期間で検出結果に期日を設定し、それ以降の評価を停止します。一致するものがない場合、Datadog は次のルールに進みます。このプロセスは、一致が見つかるか、すべてのルールがチェックされ、一致するものがなくなるまで続きます。

## 期日の削除 {#removing-due-dates}

検出結果を管理する際、以下のようなさまざまな条件下で期日を削除できます。

- 検出結果をトリガーした検出ルールが正常に通過した場合。
- 検出結果が、手動またはミュートルールによって自動的にミュートされた場合。
- 検出結果に関連付けられている期日ルールが無効化または削除された場合。
- 関連付けられている期日ルールが変更され、その条件が検出結果と一致しなくなった場合。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=set_due_date
[3]: /ja/api/latest/security-monitoring/create-a-due-date-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_due_date_rule