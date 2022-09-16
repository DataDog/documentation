---
aliases:
- /kr/cloud-siem/getting_started/
- /kr/security_monitoring/getting_started/
- /kr/security_platform/security_monitoring/
- /kr/security_platform/security_monitoring/getting_started
- /kr/security_platform/getting_started/
description: Datadog Cloud SIEM의 주요 개념, 위협 탐지를 활성화하는 방법, 바로 사용할 수 있는 위협 탐지 규칙을 알아봅니다.
further_reading:
- link: /security_platform/default_rules
  tag: 설명서
  text: 기본 탐지 규칙 살펴보기
- link: /security_platform/explorer
  tag: 설명서
  text: 보안 시그널 익스플로러 알아보기
- link: /security_platform/guide/aws-config-guide-for-cloud-siem/
  tag: 설명서
  text: Cloud SIEM용 AWS 설정 가이드
kind: 설명서
title: Cloud SIEM 시작하기
---

Datadog Cloud SIEM(보안 정보 및 이벤트 관리)를 시작하려면 다음의 절차를 따라주세요.

- [로그 입력](#ingest-logs)
- [탐지 규칙 검토](#review-detection-rules)
- [보안 시그널 확인](#explore-security-signals)
- [더 알아보기](#further-reading)

AWS CloudTrail 로그에서 위협 탐지를 시작하는 방법을 단계별로 알아보려면 [Cloud SIEM용 AWS 설정 가이드][1]를 참조하시기 바랍니다.

## 로그 입력

이미 로그 소스가 있다면 [앱 내 온보딩][2] 가이드를 따라 소스에서 로그를 수집하세요.

Datadog의 [로그 수집 설명서][3]를 읽어보면 다양한 소스에서 Datadog로 로그를 가져오는 방법을 자세히 알아볼 수 있습니다. 입력된 모든 로그는 먼저 파싱하여 보강 과정을 거칩니다. 실시간으로 탐지 규칙(Detection Rules)이 처리된 모든 로그에 적용되어 기존에 로그 데이터 인덱스화에 따르던 성능이나 비용 문제 없이도 탐지 범위를 최대화합니다. [Datadog의 LimitsTM 없이 로그 처리하기 가이드를 더 읽어보세요][4].

{{< img src="security_platform/security_monitoring/getting_started/ingest_logs_overview.png" alt="로그 입력" >}}

## 탐지 규칙 검토

Datadog는 바로 사용할 수 있는 [탐지 규칙][5]을 제공합니다. 탐지 규칙은 사용자 환경에서 즉시 위협을 감지할 수 있습니다. 기본으로 활성화된 탐지 규칙은 이미 알려진 모범 사례에 따라 위협 요소를 검출합니다. 성숙도가 높은 보안 조직에서는 더 까다로운 위협을 탐지하기 위해 탐지 규칙을 추가하고자 할 수 있습니다. 또한, 고급 템플릿이 포함되어 커스텀 애플리케이션에서 위협을 탐지하는 방법을 알려드립니다. 더 자세한 정보는 [탐지 규칙 설명서][6]를 참조하시기 바랍니다.

## 보안 시그널 확인

탐지 규칙으로 위협 요소를 검출한 경우 보안 시그널(Security Signal)이 생성됩니다. 보안 시그널은 [보안 시그널 익스플로러(Security Signals Explorer)][7]에서 상관 관계를 파악하고 선별할 수 있습니다. 자세한 정보는 [보안 시그널 익스플로러][8] 설명서를 참조해주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/security_platform/guide/aws-config-guide-for-cloud-siem
[2]: https://app.datadoghq.com/security/onboarding
[3]: /kr/logs/log_collection/
[4]: https://www.datadoghq.com/blog/logging-without-limits/
[5]: /kr/security_platform/default_rules/#cat-cloud-siem
[6]: /kr/security_monitoring/detection_rules/
[7]: https://app.datadoghq.com/security
[8]: /kr/security_monitoring/explorer/