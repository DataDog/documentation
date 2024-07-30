---
aliases:
- /ko/security_monitoring/
- /ko/security_platform/cloud_siem/security_home/
- /ko/security_platform/cloud_siem/
- /ko/security/cloud_siem/security_home/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: 블로그
  text: Datadog Case Management를 통해 문제를 사전에 추적, 분류 및 할당
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: 블로그
  text: Datadog 워크플로 및 Cloud SIEM으로 일반적인 보안 작업을 자동화하고 위협에 대비
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 빌드
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: 블로그
  text: Stratus Red Team 및 Datadog Cloud SIEM을 사용한 AWS 위협 에뮬레이션 및 탐지 검증
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password 모니터링
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에 대한 충분한 보안 커버리지 구축
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: 블로그
  text: 네트워크 및 보안 분석에 대한 DNS 모니터링
title: Cloud SIEM
---
## 개요

Datadog Cloud SIEM(보안 정보 및 이벤트 관리)은 개발자, 운영 및 보안 팀을 하나의 플랫폼을 통해 통합합니다. 단일 대시보드를 사용하여 DevOps 콘텐츠, 비즈니스 메트릭 및 보안 콘텐츠를 표시합니다. 표적 공격, 시스템과 통신하는 위협 정보 목록 IP 또는 안전하지 않은 설정과 같은 위협을 실시간으로 애플리케이션 및 인프라스트럭처에서 탐지하고 이메일, Slack, Jira, PagerDuty 또는 웹훅을 통해 팀에 알립니다.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="중요한 신호, 의심스러운 행위자, 영향을 받은 리소스, 위협 정보, 신호 추세에 대한 위젯이 포함된 Security Overview 섹션을 보여주는 Cloud SIEM 홈페이지" >}}

위협은 Datadog에 보안 신호로 표시되며 [Security Signals Explorer][1]에서 상관 관계를 파악하고 분류할 수 있습니다. 보안 신호는 [탐지 규칙[2]을 사용하여 Datadog Cloud SIEM에 의해 생성됩니다. 탐지 규칙은 다양한 소스에서 위협을 탐지하고 즉시 사용할 수 있도록 제공됩니다. 제공된 탐지 규칙을 복제하여 설정을 변경할 수 있습니다. 또는 특정 사용 사례에 맞게 처음부터 [새 규칙][3]을 추가할 수도 있습니다.

## 시작하기

{{< whatsnext desc="Cloud SIEM을 시작하려면 다음 문서를 참조하세요:" >}}
  {{< nextlink href="/getting_started/cloud_siem/">}}Cloud SIEM 시작을 위한 가이드{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/">}}Cloud SIEM을 위한 AWS 설정{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/">}}Cloud SIEM을 위한 Google Cloud 설정{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/">}}Cloud SIEM을 위한 Azure 설정{{< /nextlink >}}
  {{< nextlink href="/integrations/">}}특정 통합을 검색하여 로그 수집 설정{{< /nextlink >}}
  {{< nextlink href="/security/default_rules#cat-cloud-siem-log-detection">}}기본 Cloud SIEM 감지 규칙 사용{{< /nextlink >}}
  {{< nextlink href="/security/detection_rules">}}나만의 맞춤형 감지 규칙 만들기{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/investigate_security_signals
[2]: /ko/security/default_rules#cat-cloud-siem
[3]: /ko/security/detection_rules