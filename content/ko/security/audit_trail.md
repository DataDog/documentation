---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: 설명서
  text: Audit Trail에 대해 자세히 알아보기
- link: /account_management/audit_trail/events/
  tag: 설명서
  text: 오딧 트레일 이벤트에 대해 알아보기
products:
- icon: siem
  name: 클라우드 SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: 클라우드 보안
  url: /security/cloud_security_management/
- icon: app-sec
  name: 앱 및 API 보호
  url: /security/application_security/
title: Datadog 보안 이벤트 감사
---

{{< product-availability >}}

관리자 또는 보안 팀 구성원은 [감사 추적][1]을 사용하여 Datadog 보안에서 팀이 수행한 작업을 확인할 수 있습니다. 개개인은 자신의 작업을 확인할 수 있습니다. 보안 관리자 또는 InfoSec 팀의 경우, 감사 추적 이벤트를 통해 규정을 준수하고 Datadog 리소스 작업자, 작업 기록 및 시점을 확인하는 데 도움을 얻을 수 있습니다.

Datadog 보안에서 수행한 작업으로 생성된 감사 로그를 보려면 Datadog의 [**감사 추적**][2] 페이지로 이동합니다. 다음 제품별 이벤트는 Datadog 보안에서 사용할 수 있습니다:

## 클라우드 보안 플랫폼

{{% audit-trail-security-platform %}}

## 앱 및 API 보호

{{% audit-trail-asm %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/audit_trail
[2]: https://app.datadoghq.com/audit-trail