---
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: 설명서
  text: 사용자 지정 규칙 생성
title: 버전 기록
---
## 개요 {#overview}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="GitHub OAuth 액세스 토큰 손상에 대한 버전 기록 표시" style="width:80%;" >}}

규칙 버전 기록을 사용하여 다음을 수행할 수 있습니다.

- 탐지 규칙의 이전 버전을 확인하고 시간 경과에 따른 변경 사항을 파악합니다.
- 협업 개선을 위해 누가 변경했는지 확인합니다.
- 버전 간 차이점을 비교하여 수정 사항과 변경의 영향을 분석합니다.

## 규칙의 버전 기록 보기 {#see-version-history-of-a-rule}

규칙의 버전 기록을 보려면 다음을 수행합니다.
1. [Detection Rules][1]로 이동합니다.
1. 관심 있는 규칙을 클릭합니다.
1. 규칙 편집기에서 {{< ui >}}Version History{{< /ui >}}를 클릭하여 과거 변경 사항을 확인합니다.
1. 특정 버전을 클릭하여 어떤 변경 사항이 있었는지 확인합니다.
1. 버전 간 변경 사항을 확인하려면 {{< ui >}}Open Version Comparison{{< /ui >}}을 클릭합니다.
1. 비교할 두 버전을 선택합니다.
    - 빨간색으로 강조 표시된 데이터는 수정되거나 제거된 데이터를 나타냅니다.
    - 녹색으로 강조 표시된 데이터는 추가된 데이터를 나타냅니다.
1. 동일한 패널에서 비교 결과를 보려면 {{< ui >}}Unified{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules