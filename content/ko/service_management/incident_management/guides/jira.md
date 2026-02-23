---
disable_toc: false
further_reading:
- link: integrations/jira/
  tag: 설명서
  text: Jira 통합 설치
- link: https://app.datadoghq.com/integrations/jira
  tag: App
  text: 앱 내 Jira 통합 타일
title: Datadog Incident Management와 Jira 통합
---

## 개요

Jira는 소프트웨어 팀을 위한 이슈 및 프로젝트 추적 시스템입니다. Datadog Jira 연동을 통해 Datadog에서 이슈 및 인시던트를 생성하고, Jira에서 생성된 이슈를 Datadog 이벤트로 확인할 수 있습니다.

Datadog Incident Management와 Jira를 통합하면 다음과 같은 이점을 얻을 수 있습니다.
- **가시성 향상**: 모든 이해 관계자에게 인시던트에 대한 즉각적인 정보를 제공하여 신속하게 대응할 수 있습니다.
- **기존 워크플로 지원**: 현재 프로세스와 원활하게 통합되어 Jira를 통한 작업 계획과 우선순위 관리가 더욱 쉬워집니다.
- **쉽고 빠른 맞춤 설정**: 동적 템플릿을 사용하면 Datadog 심각도를 Jira 우선순위에 매핑하고, 사용자 지정 레이블을 추가하며, 동적 담당자를 지정하는 등 다양한 작업을 할 수 있습니다.

## 사전 필수 조건

자동 티켓 생성 기능을 사용하려면 [Jira Integration 타일][1]을 통해 통합을 설치하세요. 자세한 내용은 [Jira 통합][2] 문서를 참고하세요.

## 설정

1. [Integration Settings 페이지][3]에서 Jira 통합을 찾습니다.
2. **Automatically create a Jira Issue** 옵션 토글을 클릭합니다.
3. Jira 이슈를 자동으로 생성할 시기를 정의하는 조건을 추가합니다. 이 조건을 비워 두면 인시던트가 생성될 때 Jira 이슈가 생성됩니다.
4. Jira 티켓의 내용을 구성하기 위해 동적 변수를 사용해 템플릿을 정의합니다. 이 템플릿은 심각도를 Jira 우선순위에 매핑하고, 레이블을 추가하며, 동적 담당자를 지정하는 등의 작업을 수행합니다. 동적 변수는 **문자열** [Jira 필드 유형][5]에만 적용됩니다.

{{< img src="service_management/incidents/guide/jira/incident_jira_template.png" alt="Datadog 인시던트에서 자동으로 생성되는 Jira 티켓 예시 템플릿" style="width:80%;" >}}

인시던트가 생성되면 해당 Jira 인스턴스에도 이슈가 생성됩니다. 이 Jira 이슈는 Datadog의 인시던트에 연결되어 참조할 수 있습니다.
Jira 이슈는 [Integration Settings 페이지][3]에 정의된 템플릿을 기반으로 인시던트와 단방향으로 동기화됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /ko/integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type