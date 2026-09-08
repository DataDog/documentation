---
aliases:
- /ko/security/cloud_siem/content_packs
disable_toc: true
further_reading:
- link: /security/cloud_siem/detection_rules
  tag: 설명서
  text: 로그 탐지 규칙 생성
- link: security/cloud_siem/investigator
  tag: 설명서
  text: Investigator에 대해 자세히 알아보기
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: 설명서
  text: Security 신호 조사
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: 블로그
  text: 'Cloud SIEM 콘텐츠 팩의 새로운 기능: 2024년 9월'
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: 블로그
  text: 공격자가 Microsoft 365 서비스를 악용하는 방법
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: 블로그
  text: Datadog Cloud SIEM을 사용하여 Google Workspace 앱에서 악성 활동 탐지
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: 블로그
  text: Datadog Cloud SIEM에서 OCSF Common Data Model을 사용한 데이터 정규화
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하다'
- link: https://www.datadoghq.com/blog/oci-content-pack
  tag: 블로그
  text: Datadog Cloud SIEM을 사용한 OCI 감사 로그 모니터링
title: 콘텐츠 팩
---
## 개요 {#overview}

[Cloud SIEM 콘텐츠 팩][1]은 주요 보안 통합을 위한 즉시 사용 가능한 콘텐츠를 제공합니다. 통합에 따라 콘텐츠 팩에는 다음이 포함될 수 있습니다.

- [탐지 규칙][2]을 통해 환경에 대한 포괄적인 커버리지 제공
- 콘텐츠 팩에 대한 로그 및 보안 신호 상태에 대한 자세한 인사이트를 제공하는 대화형 대시보드
- [Investigator][3], 사용자 또는 리소스의 의심스러운 활동을 조사하기 위한 대화형 그래픽 인터페이스
- [Workflow Automation][4], 액션을 자동화하고 문제 조사 및 해결을 가속화
- 구성 가이드
- [OCSF 파이프라인][5], 통합의 로그를 Open Cybersecurity Schema Framework 공통 데이터 모델로 정규화
- Cloud SIEM Security 신호에 매핑된 통합에서 제공하는 타사 경보

다음 유형별로 콘텐츠 팩을 필터링할 수 있습니다.
- **콘텐츠 팩**: 탐지 규칙, Security Orchestration, Automation, and Response(SOAR)워크플로, 사용자 지정 도구와 같은 보안 관련 콘텐츠가 포함된 통합 패키지
- **인리치먼트 팩**: 조사 개선을 위해 취약점이나 타사 인사이트와 같이 SIEM 분석에 유용한 컨텍스트를 추가하는 콘텐츠
- **통합 팩**: Cloud SIEM과 함께 사용하기 적합하도록 Datadog 카탈로그에서 선별된 콘텐츠
<!-- - **Entity Packs**: Integrations and bundled content that power UEBA (User and Entity Behavior Analytics) by modeling normal activity for users and entities and surfacing risky anomalies in Cloud SIEM -->

이 페이지에 나열된 콘텐츠 팩 외에도 Cloud SIEM에는 **상시 콘텐츠 팩**이 포함되어 있습니다. 이는 Datadog이 설치나 구성 없이 로그 및 보안 신호에 자동으로 적용하는 위협 인텔리전스 강화 기능입니다.

{{% cloud-siem-content-packs %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/content-packs
[2]: /ko/security/detection_rules/
[3]: /ko/security/cloud_siem/triage_and_investigate/investigator
[4]: /ko/actions/workflows/
[5]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/