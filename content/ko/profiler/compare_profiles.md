---
aliases:
- /ko/tracing/profiler/compare_profiles/
further_reading:
- link: profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 연속 프로파일러 사용
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: 블로그
  text: DataDog에서 상시 운영 환경 프로파일링 도입
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: 블로그
  text: Datadog 프로파일 비교를 통한 코드 비교 및 최적화
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: 블로그
  text: Datadog의 지속적 프로파일러를 사용해 Akka 애플리케이션을 최적화하는 방법
title: 프로파일 비교
---

지속적 프로파일러는 두 개의 프로파일 또는 프로파일 집계를 비교하여 코드 성능 개선 사항, 퇴보 및 구조적 변경을 식별할 수 있도록 해줍니다. 다음에 대해 프로파일을 비교할 수 있습니다.

- 각기 다른 시간에 수집된 프로파일
- 시간에 따른 서비스 프로파일 평균
- 각기 다른 세트의 Datadog 태그(예: 환경, 버전, 또는 데이터 센터)를 포함하는 프로파일

이를 통해 서비스에 시간이 많이 소요되는지, 메모리를 더 많거나 적게 사용하는지, 할당이 더 많거나 적은지, 예외를 더 적거나 많이 생산하는지, 과거보다 코드와 호출이 더 적거나 더 많이 포함되는지 확인할 수 있습니다. 

## 비교 시나리오

비교는 애플리케이션이 과거 대비 유사한 워크로드(총 요청)를 보일 때 가장 잘 작동합니다.

비교를 사용하는 일반적인 몇몇 시나리오를 소개합니다.

- 두 개의 최신 배포를 비교합니다. 예를 들어 최신 배포 항목이 메서드에 지정된 것보다 더 적은 수의 메모리 할당을 수정하는지 확인합니다.

- 두 개의 별도 기간을 비교합니다. 예를 들어 지난주 대비 오늘의 CPU 소비를 계산합니다. CPU 소비 측면에서 메서드가 더 나은지 더 낫지 않은지 확인합니다.

- 두 개의 서로 다른 태그 세트를 비교합니다. 예를 들어 각기 다른 환경, 가용성 영역, 포드, 카나리, 기타 커스텀 Datadog 태그 간 프로파일을 비교합니다.

## 비교 보기 액세스하기

UI의 각기 다른 위치에서 서로 다른 유형의 비교를 열 수 있습니다.

### 이전 기간에 대해 프로필 비교

프로파일러 검색 보기에서 목록에 있는 프로파일을 선택합니다. **비교**를 클릭해 비교 보기를 엽니다. 기본적으로 선택한 프로파일은 프로파일 B에 표시됩니다. 프로파일 A의 경우 집계 시간 프레임, 태그 또는 특정 프로파일 ID를 선택합니다.

비교하려는 메트릭(코드 언어에 따라 목록 다양)을 선택합니다. 예를 들어 CPU 프로파일 조사 중 할당 증가를 찾을 때 유용할 수 있습니다.

{{< img src="profiler/compare_time_frames.mp4" alt="시간 프레임 동안의 프로파일을 집계와 비교하기 위한 비교 보기 열기" video="true">}}

범례 색상을 기억해 둡니다. 색상은 다음을 의미합니다.
 - 짙어지는 빨간색은 프로파일 B에서 더 많은 시간이 소요된 메서드입니다.
 - 짙어지는 녹색은 프로파일 B에서 더 적은 시간이 소요된 메서드입니다.
 - 파란색은 프로파일 A에만 있는 메서드입니다.
 - 보라색은 프로파일 B에만 있는 메서드입니다. 

이러한 색상은 버전, 기간, 카나리 간 코드에서의 구조적 변화를 식별하고 성능에 미치는 영향을 파악하는 데 도움을 줍니다.

{{< img src="profiler/comparison_legend.png" alt="프로파일 비교를 위한 범례" >}}

프로파일에서 메서드를 마우스로 가리켜 비교 프로파일 대비 더 많거나 적은 시간이 소요되거나, 더 많거나 적은 할당을 한 메서드에 대한 구체적인 메트릭을 확인할 수 있습니다.

{{< img src="profiler/compare_hover.png" alt="메트릭 비교를 확인하려면 프로파일에서 메서드를 마우스로 가리킵니다." >}}

### 최신 버전 비교

집계 보기에서 서비스를 선택하여 선택한 시간 프레임에 대한 특정 메트릭(예: 실제 시간(wall time)의 집계 프로파일을 확인합니다. 그런 다음 **비교**를 클릭해 또 다른 버전의 집계 프로파일과 해당 정보를 비교합니다.

{{< img src="profiler/compare_recent_versions.mp4" alt="두 버전에 대한 비교 보기 열기" video="true">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}