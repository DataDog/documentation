---
aliases:
- /ja/security/vulnerability_pipeline/mute
further_reading:
- link: /security/automation_pipelines
  tag: ドキュメント
  text: 自動化パイプライン
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: ブログ
  text: Datadog IaC Security を使用して、クラウドの誤構成が本番環境に影響することを防ぐ
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
title: ミュートルール
---
{{< product-availability >}}

ミュートルールを構成して、緊急度の低い検出結果を自動的にフィルターすることで、セキュリティアラートを効率化します。このアプローチは、既知の誤検知や許容されたリスクによるノイズを減らし、最も重大な脅威への対処に集中できるようにします。

## ミュートルールの作成 {#create-a-mute-rule}

1. Datadog で、**Security** > **Settings** > [Findings Automation][2] に移動します。**Add a New Rule** をクリックし、**Mute** を選択します。[Create a New Rule] ページが開きます。
1. **Rule name** の欄に、ルールの説明的な名前を入力します (例: 「account payment-prod の補完的コントロールが有効」)。
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
1. ルールに重大度基準を追加するには、**重大度の追加**をクリックします。
1. ミュートの理由と期間を指定します。
    - **Reason for muting**: 検出結果をミュートする理由。利用可能な理由は以下のとおりです。
      - False Positive
      - Risk Accepted
      - Pending fix
      - No Fix
      - Duplicate
      - Other
    - **Rule expiration**: ルールが期限切れになる日付。
    - **Further description for muting reason**: 追加の詳細を入力するための任意の入力欄。
1. **Save** をクリックします。このルールは新しい検知結果に直ちに適用され、既存の検知結果に対しては 1 時間以内にチェックを開始します。

[API][3] または [`datadog_security_findings_mute_rule`][4] Terraform リソースを使用してミュートルールを作成することもできます。

## ルールの一致順序 {#rule-matching-order}

Datadog が検出結果を特定すると、その検出結果をミュートルールのシーケンスに沿って評価します。最初のルールから順に評価し、一致するものがあれば、Datadog は指定された期間その検出結果をミュートし、それ以降の評価を停止します。一致するものがない場合、Datadog は次のルールに進みます。このプロセスは、一致が見つかるか、すべてのルールがチェックされ、一致するものがなくなるまで続きます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=mute
[3]: /ja/api/latest/security-monitoring/create-a-mute-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_mute_rule