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
3. 중요한 보안 로그 소스에 즉시 사용 가능한 콘텐츠를 제공하는 [콘텐츠 팩][9]을 선택 및 설정합니다.
4. 클라우드 보안 정보와 이벤트 관리(SIEM)에서 분석할 [추가 로그 소스][10]를 선택 및 설정합니다.
5. **활성화**를 클릭합니다. 커스텀 클라우드 보안 정보와 이벤트 관리(SIEM) 로그 인덱스(`cloud-siem-xxxx`)가 생성됩니다.
6. Cloud SIEM 설정 페이지에 '클라우드 SIEM 인덱스가 첫 번째 순서에 위치하지 않습니다'라는 경고가 표시되면, [클라우드 SIEM 인덱스 재정렬](#reorder-the-cloud-siem-index) 섹션의 단계를 따르세요.

### 클라우드 보안 정보와 이벤트 관리(SIEM) 인덱스 재정렬

{{< img src="getting_started/cloud_siem/cloud-siem-setup-warning.png" alt="인덱스 설정에 주의를 기울여야 한다고 알려 주는 노란색 경고 창" style="width:80%;">}}

1. **로그 설정에서 인덱스 재정렬**을 클릭합니다.

2. 모달 제목에 'Move cloud-siem-xxxx to...'라고 표시되고 인덱스 컬럼의 `cloud-siem-xxxx` 텍스트가 연한 보라색인지 확인합니다.

{{< img src="getting_started/cloud_siem/move-index-modal.png" alt="cloud-siem-xxxx 인덱스가 가장 최근 인덱스인 인덱스 목록을 보여주는 이동 cloud-siem-xxxx 모달" style="width:60%;">}}

3. 인덱스의 새 위치를 선택하려면 `cloud-siem-xxxx`을 이동시키려는 인덱스의 맨 윗줄을 클릭합니다. 예를 들어, `cloud-siem-xxxx` 인덱스를 첫 번째 인덱스로 설정하려면 현재 첫 번째 인덱스의 *상위*에 있는 줄을 클릭합니다. 새 위치는 굵은 파란색 선으로 강조 표시됩니다.

{{< img src="getting_started/cloud_siem/move-index-highlight.png" alt="첫 번째 인덱스의 윗 줄이 파란색 줄로 강조 표시된 이동 cloud-siem-xxxx 모달" style="width:65%;">}}

4. 텍스트가 선택된 위치를 확인합니다. '인덱스의 새 위치를 위치 1으로 선택합니다.' 그런 다음 **이동**을 클릭합니다.

5. 경고 문구를 확인합니다. 변경 사항을 확인했다면 **재정렬**을 클릭합니다.

6. 인덱스 순서를 검토하고 `cloud-siem-xxxx` 인덱스가 원하는 위치에 있는지 확인합니다. 인덱스를 이동하려면 **이동** 아이콘을 클릭하고 3 ~ 5단계를 따릅니다.

7. [클라우드 SIEM 상태 페이지][11]로 이동하세요.

이제 클라우드 SIEM 인덱스가 첫 번째 인덱스에 위치해야 합니다. 설정 페이지에 계속해서 인덱스 위치에 대한 경고가 표시된다면 몇 분 정도 기다렸다가 브라우저를 새로 고침하세요.

인덱스가 첫 번째 인덱스 위치로 이동하면 [콘텐츠 팩][11] 및 [기타 로그 소스][11]의 설정 및 상태를 검토합니다. 경고나 오류가 표시되는 각 통합의 경우 해당 통합을 클릭하고 지침에 따라 문제를 해결합니다.

## 2단계: 신호 탐색

1. 사용자 환경에서 위협을 즉시 탐지하기 시작하는 [기본 제공 탐지 규칙][12]을 검토하세요. 탐지 규칙은 처리된 모든 로그에 적용되어 탐지 범위를 최대화합니다. 자세한 내용을 확인하려면 [탐지 규칙][13] 설명서를 참조하세요.

2. [보안 신호][14]를 살펴보세요. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성됩니다. 자세한 내용을 확인하려면 [보안 신호][15] 설명서를 참조하세요.

    - [알림 규칙 설정][16]을 통해 신호가 생성될 때 알림을 받도록 설정합니다. Slack, Jira, 이메일, 웹훅 및 기타 통합을 사용하여 알림을 보낼 수 있습니다. 자세한 내용을 확인하려면 [알림 규칙][17] 설명서를 참조하세요.
    - 주간 [위협 요약][18] 보고서를 구독하면 지난 7일 동안 발견된 가장 중요한 보안 위협에 대한 조사 및 문제 해결 작업을 시작할 수 있습니다.

## 3단계: 조사

1. 더 빠른 해결을 위해 [Investigator][19]를 살펴보세요. 자세한 내용은 [Investigator][20] 문서를 참조하세요.
2. 조사, 보고 및 모니터링을 위해 [즉시 사용 가능한 대시보드][21]를 사용하거나 [자체 대시보드를 생성합니다][22].

## 4단계: 맞춤 설정

1. 노이즈를 줄이기 위해 [억제 규칙][23]을 설정합니다. 
2. [커스텀 탐지 규칙][24]을 생성하고, [탐지 규칙 생성 모범 사례][25]를 검토하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration/siem/log-sources
[3]: /ko/logs/guide/best-practices-for-log-management/
[4]: /ko/integrations/
[5]: /ko/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/landing
[9]: https://app.datadoghq.com/security/content-packs
[10]: https://app.datadoghq.com/security/configuration/siem/log-sources
[11]: https://app.datadoghq.com/security/configuration/siem/setup
[12]: /ko/security/default_rules/#cat-cloud-siem-log-detection
[13]: /ko/security/detection_rules/
[14]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[15]: /ko/security/cloud_siem/investigate_security_signals
[16]: https://app.datadoghq.com/security/configuration/notification-rules
[17]: /ko/security/notifications/rules/
[18]: https://app.datadoghq.com/security/configuration/reports
[19]: https://app.datadoghq.com/security/investigator/
[20]: /ko/security/cloud_siem/investigator
[21]: https://app.datadoghq.com/dashboard/lists/preset/100
[22]: /ko/dashboards/#overview
[23]: /ko/security/cloud_siem/detection_rules/?tab=threshold#advanced-options
[24]: /ko/security/cloud_siem/detection_rules/
[25]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/