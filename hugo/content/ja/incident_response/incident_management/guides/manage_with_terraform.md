---
description: Terraform を使用して、インシデントタイプ、プロパティフィールド、担当者ロール、通知ルール、ポストモーテムテンプレート、通知テンプレートなど、Incident
  Management 構成を管理します。
disable_toc: false
further_reading:
- link: /incident_response/incident_management/
  tag: ドキュメント
  text: Incident Management について
- link: /incident_response/incident_management/guides/test_incidents/
  tag: ドキュメント
  text: トレーニングやテストのためのテストインシデントの使用
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: ドキュメント
  text: Datadog 用 Terraform プロバイダー
title: Terraform による Incident Management の管理
---
## 概要{#overview}

Terraform を使用して、Datadog API 経由で Incident Management 構成を管理できます。このガイドでは、[Terraform レジストリ][1]で利用可能な Incident Management リソースについて説明し、それぞれに対応する Datadog ドキュメントへのリンクを紹介します。

UI でインシデントタイプ、フィールド、ロール、通知ルールを手動で構成することは、少数のチームであれば問題ありません。組織が成長するにつれて、たとえば数百のチーム間で構成を標準化したり、他の Incident Management ツールから移行したりする場合、対応することが困難になります。Terraform を使用すると、この構成をコードとして定義できるため、プログラムで作成および更新し、組織全体で一貫性を保つことができます。

また、既存のインシデントタイプ、通知、ポストモーテムテンプレートの構成を Terraform に[インポート][2]したり、既存の設定を Terraform の[データソース][3]として参照したりすることもできます。

### Terraform で管理できるもの{#what-you-can-manage-with-terraform}

| リソース | 目的 |
| --- | --- |
| [インシデントタイプ](#incident-types) (`datadog_incident_type`) | インシデントのカテゴリ (「セキュリティインシデント」や「顧客への影響」など)。[情報][19]ページのプライベートインシデントやインシデントの削除などの設定も含まれます。このテーブルが他のすべての項目の基準となります。|
| [プロパティフィールド](#property-fields) (`datadog_incident_user_defined_field`) | 根本原因や影響を受けるリージョンなど、担当者がインシデントに対して入力する構造化データ。[情報][19]ページの重大度レベルやステータスレベルの構成にも使用されます。|
| [担当者ロール](#responder-roles) (`datadog_incident_user_defined_role`) | 組み込みのインシデントコマンダーや担当者以外のカスタムロール。|
| [通知ルール](#notification-rules) (`datadog_incident_notification_rule`) | インシデントの変更時に、いつ、誰に通知するかを決定するルール。|
| [ポストモーテムテンプレート](#postmortem-templates) (`datadog_incident_postmortem_template`) | インシデントタイプに対して、ポストモーテムドキュメントをどこでどのように生成するか。|
| [通知テンプレート](#notification-templates) (`datadog_incident_notification_template`) | インシデント通知用の再利用可能なメッセージコンテンツ。|

## Datadog Terraform プロバイダーの設定 {#set-up-the-datadog-terraform-provider}

まだ設定していない場合は、[Datadog Terraform プロバイダー][4]を構成して、Terraform 構成を介して Datadog API とやり取りできるようにしてください。

## インシデントタイプ {#incident-types}

インシデントタイプを使用すると、セキュリティインシデントと顧客に影響を与えるインシデントなど、異なるクラスのインシデントに対して、異なる設定、フィールド、ロール、通知動作を適用できます。このページの他のすべてのリソースはインシデントタイプにスコープされるため、最初にインシデントタイプを定義してください。[インシデントタイプリソース][6]の `configuration` ブロックを使用してインシデントタイプを作成し、[情報][19]ページにあるインシデントの削除、[テストインシデント][7]、[プライベートインシデント][8]などのトグルを設定します。同じく[情報][19]ページにある重大度レベルとステータスレベルは、[インシデントのユーザー定義フィールドリソース][10]で構成されます。

Datadog での仕組みについては、[インシデントタイプ][5]を参照してください。

## プロパティフィールド{#property-fields}

プロパティフィールドを使用すると、担当者はインシデントに関する構造化データ (根本原因や影響を受けるリージョンなど) を記録できます。[インシデントのユーザー定義フィールドリソース][10]を使用してプロパティフィールドを作成し、それらをインシデントタイプにスコープします。

Datadog での仕組みについては、[プロパティフィールド][9]を参照してください。

## 担当者ロール{#responder-roles}

担当者ロールは、インシデント中に担当者に割り当てることができるロールを定義します。例として、インシデントコマンダーや、コミュニケーションリードのようなカスタムロールなどがあります。[インシデントのユーザー定義フィールドリソース][12]を使用して、カスタム担当者ロールを作成します。それぞれをインシデントタイプにスコープします。

Datadog での仕組みについては、[対応者ロール][11]を参照してください。

## 通知ルール{#notification-rules}

通知ルールは、通知がいつ発生するか、誰に送信されるか、どのテンプレートが使用されるかを決定します。[インシデント通知ルールリソース][16]を使用して、インシデントの作成や保存された変更などのトリガーに基づいてルールを作成します。ルールの条件に、重大度や影響を受けるサービスを含めることができます。

Datadog での仕組みについては、[通知ルール][15]を参照してください。

## ポストモーテムテンプレート{#postmortem-templates}

ポストモーテムテンプレートは、インシデントタイプに対してポストモーテムドキュメントがどこで生成されるかを制御します。テンプレートは、ドキュメント内の特定のセクションとヘッダーを定義することにより、ポストモーテム作成者が入力すべきコンテンツを標準化します。[インシデントポストモーテムテンプレートリソース][18]を使用して、インシデントタイプごとに構成してください。

Datadog での仕組みについては、[ポストモーテムテンプレート][17]を参照してください。

## 通知テンプレート{#notification-templates}

通知テンプレートは、インシデント通知用の再利用可能なメッセージコンテンツを定義します。[インシデント通知テンプレートリソース][14]を使用して、インシデントタイプにスコープ設定されたテンプレートを作成します。

Datadog での仕組みについては、[通知テンプレート][13]を参照してください。

## 全体の構成例{#full-configuration-example}

次の例では、これらのリソースのいくつかを 1 つの構成にまとめています。

- インシデントの削除を無効にし、テストインシデントを有効にする `configuration` ブロックを持つ `datadog_incident_type`
- そのタイプにスコープ設定された `datadog_incident_user_defined_field` と `datadog_incident_user_defined_role`
- `datadog_incident_notification_template`
- テンプレートを使用する `datadog_incident_notification_rule`

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"
  configuration = {
    private_incidents            = false
    private_incidents_by_default = false
    allow_workflows              = true
    allow_incident_deletion      = false
    editable_timestamps          = false
    test_incidents               = true
    create_message               = ""
    slug_source                  = "default"
  }
}

resource "datadog_incident_user_defined_field" "root_cause" {
  name          = "root_cause"
  type          = "dropdown"
  incident_type = datadog_incident_type.customer_impacting.id

  valid_value {
    display_name = "Service Bug"
    value        = "service_bug"
  }
}

resource "datadog_incident_user_defined_role" "tech_lead" {
  name          = "Tech Lead"
  incident_type = datadog_incident_type.customer_impacting.id
}

resource "datadog_incident_notification_template" "sev1_alert" {
  name          = "SEV-1 Customer Impact Template"
  subject       = "SEV-1 Incident: {{incident.title}}"
  category      = "alert"
  incident_type = datadog_incident_type.customer_impacting.id
  content       = "SEV-1 declared: {{incident.title}}. Status: {{incident.status}}."
}

resource "datadog_incident_notification_rule" "sev1_sev2_created" {
  enabled               = true
  trigger               = "incident_created_trigger"
  visibility            = "organization"
  handles               = ["@pagerduty-on-call"]
  incident_type         = datadog_incident_type.customer_impacting.id
  notification_template = datadog_incident_notification_template.sev1_alert.id

  conditions {
    field  = "severity"
    values = ["SEV-1", "SEV-2"]
  }
}
{{< /code-block >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /ja/integrations/terraform/
[5]: /ja/incident_response/incident_management/setup_and_configuration/#incident-types
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_type
[7]: /ja/incident_response/incident_management/guides/test_incidents/
[8]: /ja/incident_response/incident_management/setup_and_configuration/information/#private-incidents-incident-visibility
[9]: /ja/incident_response/incident_management/setup_and_configuration/property_fields/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_field
[11]: /ja/incident_response/incident_management/setup_and_configuration/responder_roles/
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_role
[13]: /ja/incident_response/incident_management/setup_and_configuration/templates/#messages
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_template
[15]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_rule
[17]: /ja/incident_response/incident_management/setup_and_configuration/templates/#postmortems
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_postmortem_template
[19]: /ja/incident_response/incident_management/setup_and_configuration/information/