---
description: AlphaSOC Findings 팩에 대해 자세히 알아보세요.
title: AlphaSOC Findings
---
## 개요 {#overview}

{{< img src="observability_pipelines/packs/alphasoc_findings.png" alt="AlphaSOC Findings 팩" style="width:25%;" >}}

AlphaSOC 발견 결과는 네트워크 전반에서 탐지된 DNS 및 IP 위협에 플래그를 지정합니다.

이 팩의 기능은 다음과 같습니다.

- 위협 범주, 점수 및 소스 IP를 추출합니다.
- AlphaSOC 심각도 점수를 로그 상태에 매핑합니다.
- 점수가 3 미만인 신뢰도가 낮은 발견 결과를 제외합니다.