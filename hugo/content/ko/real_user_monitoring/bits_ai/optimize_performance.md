---
aliases:
- /ko/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
- /ko/real_user_monitoring/ai_investigations/operation_ai_investigation/
description: Core Web Vitals 및 중요한 사용자 여정의 상태를 개선하려면 RUM 추천 카드에서 Bits Investigation을
  시작합니다.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: 설명서
  text: RUM에서 Bits 사용
- link: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
  tag: 설명서
  text: 성능 최적화
- link: /real_user_monitoring/operations_monitoring/
  tag: 설명서
  text: 운영 모니터링
title: Bits AI로 성능 최적화
---
## 개요 {#overview}

RUM은 세션을 분석하고 페이지와 중요한 사용자 여정 전반에서 개선 효과가 가장 큰 항목을 제시하는 추천 카드를 표시합니다. 어떤 카드에서든 [Bits Investigation][1]을 시작하여 문제를 분석할 수 있으며, 소스 코드 통합이 설정된 경우 문제의 원인이 된 코드도 분석할 수 있습니다.

다음 두 위치에서 조사를 시작할 수 있습니다.

- [최적화 페이지](#optimization-page): 특정 페이지의 Core Web Vitals를 개선하기 위한 조사
- [운영 모니터링](#operations-monitoring): 작업의 성공률을 높이고 지연 시간을 줄이기 위한 조사

## 최적화 페이지 {#optimization-page}

[**최적화** 페이지][2]는 애플리케이션의 각 페이지가 특정 바이탈 지표에서 보이는 성능을 보여줍니다. 각 페이지 및 바이탈 지표에 대해 RUM은 영향도가 높은 순으로 정렬된 추천 카드를 표시합니다. 각 카드는 렌더링 차단 스크립트, 메인 스레드의 장시간 실행 작업, Largest Contentful Paint를 지연시키는 로드 속도가 느린 리소스 등 성능 저하의 잠재적 원인을 설명합니다.

다음 바이탈 지표의 추천 카드에서 Bits Investigation을 시작할 수 있습니다.

| 플랫폼 | 바이탈 지표 |
|---|---|
| 브라우저 | Largest Contentful Paint(LCP), Interaction to Next Paint(INP) |
| 모바일 | Time to Initial Display(TTID) |

### 조사 시작 {#start-an-investigation}

1. [**최적화** 페이지][2]로 이동하여 애플리케이션을 선택합니다.
2. 페이지와 지원되는 바이탈 지표를 선택합니다.
3. 추천 카드에서 **Investigate**를 클릭합니다.

Bits Investigation이 새 탭에서 열리며, 조사 범위는 해당 카드의 페이지, 바이탈 지표 및 시간 범위로 제한됩니다.

{{< img src="real_user_monitoring/bits_ai/optimization-recommendation-cards.png" alt="페이지의 Largest Contentful Paint에 대한 최적화 페이지로, 영향도가 높은 순으로 정렬된 추천 카드와 각 카드의 조사 버튼이 표시된 화면" style="width:100%;" >}}

### Bits가 조사하는 항목 {#what-bits-investigates}

Bits는 페이지 로드가 느린 경우와 빠른 경우를 비교하고, 바이탈 지표가 측정되기 전까지 어떤 리소스가 로드되고 어떤 스크립트가 실행되었으며 어떤 장시간 실행 작업이 메인 스레드를 차단했는지 재구성합니다. 페이지의 요청이 [APM 트레이스와 연결되면][3], Bits는 응답이 느린 요청을 백엔드 서비스까지 추적합니다. [소스 코드 통합][4]이 설정되면 Bits는 문제를 원인이 된 파일 및 함수와 연결합니다.

{{< img src="real_user_monitoring/bits_ai/optimization-bits-investigation.png" alt="최적화 추천 카드에서 시작된 Bits Investigation 화면으로, 히어로 이미지가 늦게 발견되어 홈페이지의 Largest Contentful Paint 성능이 저하되었다는 분석 결과와 함께 영향도, 타임라인 및 권장 후속 조치가 표시됨" style="width:100%;" >}}

## 운영 모니터링 {#operations-monitoring}

[운영 모니터링][5]은 가입, 검색, 결제와 같은 애플리케이션 내 사용자 여정의 성공률과 지연 시간을 추적합니다. 작업을 열면 RUM이 심각도가 높은 순으로 정렬된 추천 카드를 표시합니다. 각 카드는 한 가지 유형의 문제를 다룹니다.

### 조사 시작 {#start-an-investigation-1}

1. [운영 모니터링][5]으로 이동하여 작업을 선택합니다.
2. 추천 카드에서 **Investigate**를 클릭합니다. 작업 표에서 **Investigate with Bits**를 클릭할 수도 있습니다.

Bits Investigation이 새 탭에서 열리며, 조사 범위는 해당 카드의 작업, 문제 유형 및 시간 범위로 제한됩니다.

{{< img src="real_user_monitoring/bits_ai/operations-recommendation-cards.png" alt="운영 모니터링의 작업 페이지로, 심각도가 높은 순으로 정렬된 오류 및 시간 초과 관련 추천 카드와 각 카드의 조사 버튼이 표시된 화면" style="width:100%;" >}}

### Bits가 조사하는 항목 {#what-bits-investigates-1}

Bits는 카드에 표시된 문제 유형에 따라 분석 방식을 조정합니다.

| 문제 유형 | Bits가 분석하는 항목 |
|---|---|
| 오류 | 작업의 실패 유형별 분포와 추세, 실패가 가장 많이 발생한 엔드포인트, 실패한 실행에서 상대적으로 높은 비율로 나타나는 속성, 연결된 백엔드 트레이스 |
| 이탈 | 사용자가 이탈하기 전까지 기다린 시간, 이탈 당시 여전히 로드 중이던 리소스, 이후 이동한 위치, 이탈이 특정 브라우저, 장치, 국가 또는 애플리케이션 버전에 집중되는지 여부 |
| 크래시 | 영향을 받은 세션의 스택 트레이스, 그리고 크래시가 특정 애플리케이션 버전, 장치 또는 운영 체제에 집중되는지 여부 |
| 속도 저하 | 느린 실행과 빠른 실행을 비교하여 백엔드, 프런트엔드 또는 리소스 로딩 중 어디에서 시간이 소요되는지 확인하고, 원인이 되는 백엔드 트레이스나 장시간 실행 작업까지 추적합니다. |
| 시간 초과 | 이름이 변경된 라우트 또는 다시 그룹화된 경로와 더 이상 일치하지 않는 작업 정의와 같이 계측의 공백으로 인해 시간 초과가 발생하는지 여부 Bits는 성능을 조사하기 전에 이를 확인합니다. |

{{< img src="real_user_monitoring/bits_ai/operations-bits-investigation.png" alt="운영 모니터링 추천 카드에서 시작된 Bits Investigation 화면으로, 타사 결제 API의 요청 한도 소진으로 결제 프로세스가 중단되었다는 분석 결과와 함께 영향도, 타임라인 및 권장 후속 조치가 표시됨" style="width:100%;" >}}

## 조사 후 {#after-the-investigation}

RUM에서 시작된 조사는 표준 Bits Investigation입니다. 여기서는 다음을 수행할 수 있습니다.

- 나중에 [Bits Investigations 목록][6]에서 조사 결과를 찾아 팀과 공유합니다.
- Bits가 향후 조사에 반영할 수 있도록 [피드백을 제공합니다][7].
- 조사 결과를 [Bits Code][8]로 전송하여 권장 코드 변경 사항을 생성하거나 풀 리퀘스트를 엽니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_investigation/
[2]: https://app.datadoghq.com/rum/optimization
[3]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /ko/source_code/
[5]: /ko/real_user_monitoring/operations_monitoring/
[6]: https://app.datadoghq.com/bits-ai/investigations
[7]: /ko/bits_ai/bits_investigation/improve_accuracy/
[8]: /ko/bits_ai/bits_code/