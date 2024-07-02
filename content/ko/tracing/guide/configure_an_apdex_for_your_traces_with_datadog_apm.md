---
aliases:
- /ko/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
- /ko/tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
title: 서비스별 애플리케이션 성능지표(Apdex) 점수 설정
---
{{< jqmath-vanilla >}}

[애플리케이션 성능지표(Apdex)][1]는 애플리케이션 성능을 리포트, 벤치마킹, 추적하는 표준 방법을 정의하는, 기업 연합이 개발한 개방형 표준입니다. 웹 애플리케이션 및 서비스의 응답 시간을 측정하여 사용자 경험 만족도를 기반으로 정의하며 극단적인 데이터 포인트가 있을 때 잘못 측정될 수 있는 응답 시간 평균과 백분위수를 상쇄하는 역할을 합니다.

## 정의

애플리케이션 성능지표(Apdex)는 엔터프라이즈 웹 애플리케이션의 성능에 대한 사용자 만족도를 수치화하여 측정한 것입니다. 여러 측정값을 [0;1] 간격의 스케일로 단일화하여 하나의 숫자로 변환합니다.

* 0 = 만족한 사용자 없음
* 1 = 모든 사용자가 만족함

애플리케이션 성능지표(Apdex)를 정의하려면 Datadog 계정의 관리자여야 합니다. 먼저 웹 애플리케이션 또는 서비스에서 만족스러운 응답 시간과 불만족스러운 응답 시간을 구분하는 임계값 **T** 시간을 정의합니다. 그런 다음 해당 임계값을 사용하여 다음 세 가지 범주를 정의할 수 있습니다.

* 만족스러운 요청 응답 시간은 **T** 미만입니다.
* 허용되는 요청 응답 시간은 **T**이거나 그 이상, **4T**이거나 그 이하입니다.
* 실패한 요청의 응답 시간은 **4T**를 초과하거나 오류를 반환하는 경우입니다.

임계값이 정의되고 요청이 카테고리화되면 다음과 같이 애플리케이션 성능지표(Apdex)가 정의됩니다.

$$\bo\text"Apdex"=({\bo\text"Satisfied"\text" requests" + {{\bo\text"Tolerated"\text" requests"}
 / 2}})/{\bo\text"Total"\text" requests"} $$

실패한 요청은 '정상'보다 4배 느리기 때문에 올바른 임계값을 선택하는 것이 중요합니다. T=3인 경우, 사용자는 페이지가 로드될 때까지 3초를 기다리지만 12초 동안 기다리지는 않습니다.

애플리케이션 성능지표(Apdex) 임계값은 애플리케이션 성능지표(Apdex) 점수가 계산되기 전에 관리자가 서비스별로 반드시 설정해야 합니다.

## 트레이스용 애플리케이션 성능지표(Apdex)를 설정합니다.

웹 애플리케이션 또는 서비스 애플리케이션 성능지표(Apdex)를 시각화하려면:

1. [서비스 카탈로그][3]에서 웹 서비스를 클릭합니다. 오른쪽 상단 그래프에서 레이턴시 대신 애플리케이션 성능지표(Apdex)를 선택합니다. 해당 옵션이 표시되지 않으면 다음과 같이 웹 서비스를 클릭했는지 확인합니다.

   {{< img src="tracing/faq/apdex_selection.png" alt="애플리케이션 성능지표(Apdex) 섹션" >}}

2. 위젯 왼쪽 상단의 연필 아이콘을 사용하여 애플리케이션 성능지표(Apdex)(이 아이콘이 표시되려면 관리자여야 함)를 설정합니다.

   {{< img src="tracing/faq/apdex_edit.png" alt="애플리케이션 성능지표(Apdex) 편집" >}}

3. 요청 분포를 시각화하려면 임계값을 직접 입력합니다.

   {{< img src="tracing/faq/apdex_update.png" alt="애플리케이션 성능지표(Apdex) 업데이트" >}}

4. 위젯을 저장하여 시간에 따라 애플리케이션 성능지표(Apdex)가 변화하는 모습을 추적합니다.

   {{< img src="tracing/faq/apm_save.png" alt="애플리케이션 성능지표(Apdex) 저장" >}}

## 서비스 카탈로그에 애플리케이션 성능지표(Apdex) 표시하기

[서비스 카탈로그][2]에 애플리케이션 성능지표(Apdex) 점수를 표시하려면 페이지 오른쪽 상단의 설정 메뉴에서 해당 점수를 선택합니다.

{{< img src="tracing/faq/apdex_service_list.png" alt="Apdex 서비스 카탈로그" >}}

[1]: https://www.apdex.org/
[2]: https://app.datadoghq.com/services
[3]: https://app.datadoghq.com/services?query=type%3Aweb