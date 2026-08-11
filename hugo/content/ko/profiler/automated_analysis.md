---
description: 상황별 인사이트와 다음 단계 추천을 제시하고 중대 오류를 자동으로 표시
further_reading:
- link: profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 지속적 프로파일러 사용
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: 블로그
  text: DataDog에 상시 가동 프로덕션 프로파일링 도입
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: 블로그
  text: Continuous Profiler의 타임라인 뷰를 사용해 런타임 및 코드 비효율성 진단
title: Automated Analysis
---
{{< callout url="https://www.datadoghq.com/product-preview/automated-analysis/" btn_hidden="false" header="체험판 신청하기" >}}
Automated Analysis는 현재 체험판 버전입니다.
{{< /callout >}}

## 개요
Automated Analysis는 Continuous Profiler 데이터를 사용하여 애플리케이션의 성능 문제를 자동으로 감지하고 실행 가능한 해결 인사이트를 제공합니다. 문제가 감지되면 Automated Analysis는 다음을 제공합니다.

- 문제와 해당 문제가 중요한 이유를 설명하는 개괄적 요약
- 프로파일링 데이터에서 얻은 상황별 인사이트(예: 영향을 받는 메서드, 패키지 또는 프로세스)
- 문제 해결에 도움이 되는 다음 단계 권장 사항

발견하지 못할 수도 있는 애플리케이션의 성능 문제를 식별하고 이를 해결하는 데 필요한 프로파일링 전문성을 줄입니다.

{{< img src="profiler/profiling_automated_analysis_thread_timeline.png" alt="발생 예외 인사이트가 표시된 Profiler 스레드 타임라인" style="width:100%;" >}}

## 인사이트 살펴보기
[Profile Explorer][1]에서 Automated Analysis에 액세스합니다. 다음 인사이트가 표시됩니다.

- 특정 서비스로 범위가 지정되면 Page 상단의 **Top Insights** 배너에서 다음을 확인할 수 있습니다.
{{< img src="profiler/profiling_automated_analysis_section.png" alt="Automated Analysis 배너, 지정된 서비스에 대해 탐지된 인사이트가 표시됨" style="width:100%;">}}

- 플레임 그래프 보기 내에서는 다음과 같이 표시됩니다.
{{< img src="profiler/profiling_automated_analysis_flamegraph.png" alt="Automated Analysis 열, 플레임 그래프 내의 지정된 서비스와 관련하여 탐지된 인사이트가 표시됨" style="width:100%;">}}

- 타임라인 보기 내에서는 다음과 같이 표시됩니다.
{{< img src="profiler/profiling_automated_analysis_thread_timeline.png" alt="Automated Analysis 열, 타임라인 내 지정된 서비스에 대해 탐지된 인사이트가 표시됨" style="width:100%;">}}

인사이트를 클릭하면 문제를 설명하는 개괄적 요약, 프로파일링 데이터의 상황별 인사이트, 권장 다음 단계를 확인할 수 있습니다.
{{< img src="profiler/profiling_automated_analysis_detail.png" alt="감지된 문제의 세부 사항을 보여주는 확장 프로파일링 인사이트" style="width:100%;">}}

## 지원되는 인사이트

Automated Analysis는 다음 인사이트를 확인할 수 있도록 지원합니다.

| 이름                      | 심각도 | 설명 |
|---------------------------|----------|-------------|
| 중복 플래그          | Info     | 런타임에 중복 플래그가 입력된 경우 트리거됩니다(예: `-Xmx2g -Xmx5g`). 이는 예상 효과가 나타나지 않는 변경으로 이어질 수 있으므로 문제가 됩니다. |
| 명시적 GC               | Info     | System.gc() 호출이 있는 경우 트리거됩니다. |
| GC 일시 중지 피크 지속 시간    | Info     | 하나 이상의 GC 일시 중지가 1초 이상 소요될 경우 트리거됩니다. |
| GC 설정                  | Info     | 멀티코어 머신에서 시리얼 GC가 사용된 경우, 단일 코어 머신에서 병렬 GC가 사용된 경우, 사용 가능한 코어보다 많은 GC 스레드가 구성된 경우, 또는 병렬 GC가 1개의 스레드로 실행되도록 구성된 경우 중 하나가 발생하면 트리거됩니다. |
| HOL 차단     | Info     | 큐 이벤트가 지정된 활동 뒤에서 멈춘 경우 트리거됩니다. |
| 기본 값 박싱    | Info     | 기본 값<>오브젝트 값 간의 변환에 CPU 시간의 5% 이상이 소모된 경우 트리거됩니다. |
| 교착 상태의 스레드 감지 | 경고   | 쿼리 컨텍스트에 대한 최대 교착 상태 스레드 수가 0보다 클 경우 트리거됩니다. |
| GC 일시 중지                 | 경고     | GC 일시 중지에 10% 이상의 시간을 소모한 경우 트리거됩니다. |
| 옵션                   | 경고     | 문서화되지 않았거나 사용 중단되었거나 권장되지 않는 옵션 플래그가 감지되면 트리거됩니다. |
| 스택 깊이 설정        | 경고     | 잘린 스택트레이스가 있는 이벤트 때문에 프로파일링 데이터를 이해하기 어려우면 트리거됩니다. |
| 발생 예외(Thrown Exceptions)         | 경고     | 1분당 발생하는 발생 예외(처리된 예외 및 처리되지 않은 예외)의 비율이 임계값(기본값: 1만 건)을 초과하면 트리거됩니다. |
| VMOperation 피크 지속 시간 | 경고     | 차단성 VM 작업(또는 시간상 가까운 여러 작업의 조합)이 2초를 초과해 실행될 경우 트리거됩니다. 가장 오래 걸린 작업과 관련한 세부 정보가 보고됩니다. |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/explorer
