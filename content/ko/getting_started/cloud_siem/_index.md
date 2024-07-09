---
aliases:
- /ko/cloud-siem/getting_started/
- /ko/security_monitoring/getting_started/
- /ko/security_platform/security_monitoring/
- /ko/security_platform/security_monitoring/getting_started
- /ko/security_platform/getting_started/
- /ko/security_platform/cloud_siem/getting_started/
- /ko/security/cloud_siem/getting_started/
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: 학습 센터
  text: Cloud SIEM 코스 소개
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: 블로그
  text: Datadog 워크플로 및 Cloud SIEM으로 일반적인 보안 작업을 자동화하고 위협에 대비하세요.
- link: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
  tag: App
  text: Workflows 보안 블루프린트로 응답 자동화하기
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: 설명서
  text: Cloud SIEM용 AWS 설정 가이드
- link: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
  tag: 설명서
  text: Cloud SIEM용 Google Cloud 설정 가이드
- link: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem/
  tag: 설명서
  text: Cloud SIEM용 Azure 설정 가이드
- link: /security/notifications/variables/
  tag: 설명서
  text: 알림 변수에 대해 자세히 알아보고 알림을 사용자 지정하세요.
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 보안 및 위협 탐지를 강화하세요.
- link: https://securitylabs.datadoghq.com/
  tag: 보안 연구소
  text: Datadog의 보안 연구소에서 보안 관련 주제에 대해 읽어보세요.
- link: https://www.datadoghq.com/blog/content-packs/
  tag: 블로그
  text: Cloud SIEM Content Packs로 보안 로그를 쉽게 수집하고 모니터링하세요.
title: Cloud SIEM 시작하기
---

## 개요

[Datadog Cloud SIEM][1]은 애플리케이션과 인프라스트럭처에 대한 실시간 위협을 탐지합니다. 이러한 위협에는 표적 공격, 위협 정보 목록에 있는 IP가 시스템과 통신하거나 안전하지 않은 설정이 포함될 수 있습니다. 위협이 감지되면 신호가 생성되고 팀에 알림이 전송됩니다.

이 가이드에서는 Cloud SIEM을 시작하기 위한 모범 사례를 안내합니다.

## 1단계: 설정

1. 소스에서 로그를 수집하도록 [로그 수집][2]을 설정합니다. 또한, [로그 관리 모범 사례][3]를 검토합니다.

   [즉시 사용 가능한 통합 파이프라인][4]을 사용하여 {{< translate key="integration_count" >}} 통합 이상에 대한 로그를 수집하거나 [커스텀 로그 파이프라인을 만들어][5] 전송할 수 있습니다:

    - [Cloud Audit 로그][6]
    - [Identity Provider 로그][7]
    - SaaS 및 Workspace 로그
    - 타사 보안 통합(예: Amazon GuardDuty)

2. [Cloud SIEM][8]을 활성화합니다.

## 2단계: 신호 탐색

1. 사용자 환경에서 위협을 즉시 탐지하기 시작하는 [기본 제공 탐지 규칙][9]을 검토하세요. 탐지 규칙은 처리된 모든 로그에 적용되어 탐지 범위를 최대화합니다. 자세한 내용은 [탐지 규칙][10] 설명서를 참조하세요.

2. [보안 신호][11]를 살펴보세요. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성됩니다. 자세한 내용은 [보안 신호][12] 설명서를 참조하세요.

    - [알림 규칙 설정][13]을 통해 신호가 생성될 때 알림을 받도록 설정합니다. Slack, Jira, 이메일, 웹훅 및 기타 통합을 사용하여 알림을 보낼 수 있습니다. 자세한 내용은 [알림 규칙][14] 설명서를 참조하세요.

## 3단계: 조사

1. 더 빠른 해결을 위해 [Investigator][15]를 살펴보세요. 자세한 내용은 [Investigator][16] 문서를 참조하세요.
2. 조사, 보고 및 모니터링을 위해 [즉시 사용 가능한 대시보드][17]를 사용하거나 [자체 대시보드를 생성합니다][18].

## 4단계: 맞춤 설정

1. 노이즈를 줄이기 위해 [억제 규칙][19]을 설정합니다.
2. [커스텀 탐지 규칙][20]을 생성하고, [탐지 규칙 생성을 위한 모범 사례][21]를 검토하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration
[3]: /ko/logs/guide/best-practices-for-log-management/
[4]: /ko/integrations/
[5]: /ko/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/landing
[9]: /ko/security/default_rules/#cat-cloud-siem-log-detection
[10]: /ko/security/detection_rules/
[11]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[12]: /ko/security/explorer
[13]: https://app.datadoghq.com/security/configuration/notification-rules
[14]: /ko/security/notifications/rules/
[15]: https://app.datadoghq.com/security/investigator/
[16]: /ko/security/cloud_siem/investigator
[17]: https://app.datadoghq.com/dashboard/lists/preset/100
[18]: /ko/dashboards/#overview
[19]: /ko/security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[20]: /ko/security/cloud_siem/log_detection_rules/
[21]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/