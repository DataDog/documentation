---
description: Terraform을 사용하여 인시던트 유형, 속성 필드, 대응자 역할, 알림 규칙, 포스트모템 템플릿 및 알림 템플릿을 포함한
  Incident Management 구성을 관리하세요.
disable_toc: false
further_reading:
- link: /incident_response/incident_management/
  tag: 문서
  text: Incident Management에 관해 자세히 알아보기
- link: /incident_response/incident_management/guides/test_incidents/
  tag: 문서
  text: 교육 및 테스트 목적으로 테스트 인시던트 사용하기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: 문서
  text: Datadog용 Terraform 공급자
title: Terraform으로 Incident Management 관리하기
---
## 개요 {#overview}

Terraform을 사용하여 Datadog API를 통해 Incident Management 구성을 관리할 수 있습니다. 이 가이드는 [Terraform registry][1]에서 사용할 수 있는 Incident Management 리소스를 다루며 각 리소스에 대한 해당 Datadog 문서 연결 링크를 제공합니다.

UI에서 인시던트 유형, 필드, 역할 및 알림 규칙을 수동으로 구성하는 것은 소수의 팀인 경우에는 효과적입니다. 하지만 조직이 성장함에 따라, 예를 들어, 수백 개의 팀에 걸쳐 구성을 표준화하거나 다른 인시던트 관리 도구에서 마이그레이션하는 경우 확장하기가 더 어려워집니다. Terraform을 사용하면 이 구성을 코드로 정의할 수 있으므로 프로그래밍 방식으로 생성 및 업데이트하고 조직 전체에서 일관되게 유지할 수 있습니다.

또한 기존 인시던트 유형, 알림 및 포스트모템 템플릿 구성을 Terraform으로 [가져오기][2]하고 기존 구성을 Terraform [데이터 소스][3]로 참조할 수 있습니다.

### Terraform으로 관리할 수 있는 항목 {#what-you-can-manage-with-terraform}

| 리소스 | 목적 |
| --- | --- |
| [인시던트 유형](#incident-types) (`datadog_incident_type`) | 인시던트 카테고리(예: '보안 인시던트' 또는 '고객 영향')입니다. 또한 프라이빗 인시던트 및 인시던트 삭제와 같은 [정보][19] 페이지의 설정도 포함됩니다. 이 표의 다른 모든 항목의 기준이 됩니다. |
| [속성 필드](#property-fields) (`datadog_incident_user_defined_field`) | 근본 원인이나 영향을 받는 지역 등 대응자가 인시던트에 대해 작성하는 구조화된 데이터입니다. 또한 [정보][19] 페이지에서 심각도 및 상태 수준을 구성하는 데 사용됩니다. |
| [대응자 역할](#responder-roles) (`datadog_incident_user_defined_role`) | 내장 Incident Commander 및 Responder 외의 사용자 지정 역할입니다. |
| [알림 규칙](#notification-rules) (`datadog_incident_notification_rule`) | 인시던트가 변경될 때 알림을 받을 대상과 시기를 결정하는 규칙입니다. |
| [포스트모템 템플릿](#postmortem-templates) (`datadog_incident_postmortem_template`) | 인시던트 유형에 대한 포스트모템 문서가 생성되는 위치 및 방법입니다. |
| [알림 템플릿](#notification-templates) (`datadog_incident_notification_template`) | 인시던트 알림을 위한 재사용 가능한 메시지 콘텐츠입니다. |

## Datadog Terraform 공급자 설정 {#set-up-the-datadog-terraform-provider}

아직 설정하지 않은 경우, Terraform 구성을 통해 Datadog API와 상호 작용할 수 있도록 [Datadog Terraform 공급자][4]를 설정합니다.

## 인시던트 유형 {#incident-types}

인시던트 유형을 사용하면 보안 인시던트와 고객 영향 인시던트와 같이 서로 다른 인시던트 클래스에 대해 서로 다른 설정, 필드, 역할 및 알림 동작을 적용할 수 있습니다. 이 페이지의 다른 모든 리소스는 인시던트 유형으로 범위가 지정되므로 인시던트 유형을 먼저 정의하세요. [인시던트 유형 리소스][6]에서 `configuration` 블록을 사용하여 인시던트 유형을 생성하고 인시던트 삭제, [테스트 인시던트][7], [프라이빗 인시던트][8]와 같이 [정보][19] 페이지에 있는 토글을 설정합니다. 또한 [정보][19] 페이지에서 찾을 수 있는 심각도 및 상태 수준은 [인시던트 사용자 정의 필드 리소스][10]로 구성됩니다.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [인시던트 유형][5]을 참조하세요.

## 속성 필드 {#property-fields}

속성 필드를 사용하면 대응자가 근본 원인이나 영향을 받는 지역과 같은 인시던트에 대한 구조화된 데이터를 캡처할 수 있습니다. [인시던트 사용자 정의 필드 리소스][10]를 사용하여 속성 필드를 생성하고 인시던트 유형으로 범위를 지정하세요.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [속성 필드][9]를 참조하세요.

## 대응자 역할 {#responder-roles}

대응자 역할은 인시던트 발생 시 사람들에게 할당할 수 있는 역할을 정의합니다. 예를 들어, Incident Commander나 Comms Lead와 같은 사용자 지정 역할이 있습니다. [인시던트 사용자 정의 역할 리소스][12]를 사용하여 사용자 지정 대응자 역할을 생성하세요. 각 역할을 인시던트 유형으로 범위를 지정하세요.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [대응자 역할][11]을 참조하세요.

## 알림 규칙 {#notification-rules}

알림 규칙은 알림이 언제 발생하고, 누구에게 전송되며, 어떤 템플릿을 사용하는지 결정합니다. [인시던트 알림 규칙 리소스][16]를 사용하여 인시던트 생성 또는 저장된 변경 사항과 같은 트리거를 기반으로 규칙을 생성하세요. 규칙의 조건에는 심각도 또는 영향을 받는 서비스가 포함될 수 있습니다.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [알림 규칙][15]을 참조하세요.

## 포스트모템 템플릿 {#postmortem-templates}

포스트모템 템플릿은 인시던트 유형에 대해 포스트모템 문서가 생성되는 위치를 제어합니다. 템플릿은 문서 내 특정 섹션과 헤더를 정의하여 포스트모템 작성자가 채워야 할 내용을 표준화합니다. [인시던트 포스트모템 템플릿 리소스][18]를 사용하여 인시던트 유형별로 이를 구성하세요.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [포스트모템 템플릿][17]을 참조하세요.

## 알림 템플릿 {#notification-templates}

알림 템플릿은 인시던트 알림을 위한 재사용 가능한 메시지 콘텐츠를 정의합니다. [인시던트 알림 템플릿 리소스][14]를 사용하여 인시던트 유형으로 범위가 지정된 템플릿을 만드세요.

Datadog에서 이 기능이 작동하는 방식을 알아보려면 [알림 템플릿][13]을 참조하세요.

## 전체 구성 예시 {#full-configuration-example}

다음 예시는 이러한 리소스 중 몇 가지를 하나의 구성으로 결합합니다.

- 인시던트 삭제를 비활성화하고 테스트 인시던트를 활성화하는 `configuration` 블록이 포함된 `datadog_incident_type`
- 해당 유형으로 범위가 지정된 `datadog_incident_user_defined_field` 및 `datadog_incident_user_defined_role`
- `datadog_incident_notification_template`
- 템플릿을 사용하는 `datadog_incident_notification_rule`

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

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /ko/integrations/terraform/
[5]: /ko/incident_response/incident_management/setup_and_configuration/#incident-types
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_type
[7]: /ko/incident_response/incident_management/guides/test_incidents/
[8]: /ko/incident_response/incident_management/setup_and_configuration/information/#private-incidents-incident-visibility
[9]: /ko/incident_response/incident_management/setup_and_configuration/property_fields/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_field
[11]: /ko/incident_response/incident_management/setup_and_configuration/responder_roles/
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_role
[13]: /ko/incident_response/incident_management/setup_and_configuration/templates/#messages
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_template
[15]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_rule
[17]: /ko/incident_response/incident_management/setup_and_configuration/templates/#postmortems
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_postmortem_template
[19]: /ko/incident_response/incident_management/setup_and_configuration/information/