---
algolia:
  tags:
  - profiler
aliases:
- /ko/tracing/profiling/
- /ko/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 연속 프로파일러 사용
- link: getting_started/profiler
  tag: 설명서
  text: 지속적 프로파일러 시작하기
- link: profiler/profile_visualizations
  tag: 설명서
  text: 사용 가능한 프로파일 유형에 대해 자세히 알아보기
- link: /extend/guide/data-collection-resolution/
  tag: 설명서
  text: 데이터 수집 및 해결
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: 블로그
  text: Continuous Profiler의 소스 코드 미리 보기로 중요한 코드에 집중
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: 블로그
  text: DataDog에서 상시 운영 환경 프로파일링 도입
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: 블로그
  text: 지속적 취약성 분석을 위한 Datadog GitHub 작업
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: 블로그
  text: Datadog 프로파일 비교를 통한 코드 비교 및 최적화
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: 블로그
  text: Datadog의 Continuous Profiler를 사용해 Akka 애플리케이션을 최적화하는 방법
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: 블로그
  text: Datadog Continuous Profiler를 통해 루비(Ruby) 코드 성능 분석
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: 블로그
  text: Cloud SIEM 팀이 Continuous Profiler와 컨텍스트 속성을 활용하여 중요한 성능 인사이트를 확보하는 방법
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: 블로그
  text: 모든 수준의 엔지니어가 프로파일링 시각화를 쉽게 활용할 수 있도록 지원하기
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: 블로그
  text: 지속적 프로파일링이 observability의 네 번째 축인 이유
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: 블로그
  text: Kubernetes 오퍼레이터 모니터링하여 애플리케이션을 원활하게 운영하기
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠르게 문제 해결하기
title: Continuous Profiler
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

CPU, 메모리 및 IO 병목 현상을 찾고 메서드 이름, 클래스 이름 및 라인 개수별로 상세 내역을 확인하여 최종 사용자 지연과 인프라 비용을 크게 줄일 수 있습니다.

### 프로덕션에서 미치는 적은 영향 {#low-impact-in-production}

Continuous Profiler는 JDK Flight Recorder와 같은 기술을 활용하여 모든 서비스의 프로덕션에서 실행되므로 호스트의 CPU 및 메모리 사용량에 최소한의 영향만 미칩니다.

## 시작하기 {#getting-started}

서비스를 프로파일링하여 한 곳에서 스택 트레이스를 시각화하는 데 단 몇 분이면 됩니다.

### 애플리케이션 계측 {#instrument-your-application}

{{< partial name="profiling/profiling-languages.html" >}}

## 프로파일러 사용 가이드 {#guide-to-using-the-profiler}

[프로파일러 시작하기][1] 가이드는 성능 문제를 포함하는 샘플 서비스를 제공하여 Continuous Profiler를 사용하여 문제를 이해하고 해결하는 방법을 보여줍니다.

## Datadog 프로파일러 탐색 {#explore-datadog-profiler}

애플리케이션을 구성하여 프로파일을 Datadog로 전송한 후 코드 성능에 대한 인사이트를 받을 수 있습니다.

기본적으로 프로파일은 8일 동안 보존되며 프로파일 데이터에서 생성된 메트릭은 한 달 동안 보관됩니다.

{{< learning-center-callout header="학습 센터에서 코드 성능 문제 진단 시도하기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  Datadog 학습 센터에는 이 주제에 관해 배워 보는 데 도움이 되는 실습 과정이 많습니다. Datadog Continuous Profiler를 사용해 프로덕션 환경의 애플리케이션 코드 성능을 조사하고 개선하는 방법을 무료로 학습하세요.
{{< /learning-center-callout >}}

### 프로파일 유형 {#profile-types}

각 지원되는 언어에 대해 수집되는 프로파일 유형에 대한 설명은 [프로파일 유형][6]을 참조하세요.

{{< img src="profiler/profile-types2.png" alt="Java 애플리케이션을 위해 수집된 프로파일 유형 목록" style="width:100%;" >}}

### 태그별 프로파일 검색 {#search-profiles-by-tags}

특정 호스트, 서비스, 버전 또는 조합을 포함하는 모든 차원에서 [태그를 사용하여 프로파일을 검색합니다][2].

{{< img src="profiler/search_profiles4.mp4" alt="태그별 프로파일 검색" video=true >}}

### 배포 환경에서 함수 성능 추적 {#track-function-performance-over-deployments}

메서드별 상위 CPU 사용량, 스레드별 상위 메모리 할당, 버전별 CPU 사용량 등 서비스의 핵심 프로파일링 메트릭을 획득하여 대시보드에서 시각화합니다.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="대시보드에 프로파일링 메트릭 추가하기" video=true >}}

### 프로파일링 데이터에 트레이스 연결 {#connect-traces-to-profiling-data}

[APM 분산 트레이싱][3]과 활성화된 지속적 프로파일러를 모두 포함하는 애플리케이션 프로세스는 자동으로 연결되므로, [프로파일 탭][4]의 스팬 정보에서 프로파일링 데이터로 직접 이동하여 성능 문제와 관련된 구체적인 코드 라인을 찾을 수 있습니다.

{{< img src="profiler/profiles_tab.png" alt="프로파일 탭은 APM 트레이스 스팬에 대한 프로파일링 정보를 보여줍니다." >}}

### 프로파일 비교를 통해 성능 변화 찾기 {#find-changes-in-performance-by-comparing-profiles}

다양한 시간, 환경 또는 배포에서 유사한 프로파일을 비교하면 성능 문제의 가능한 원인과 해결책을 이해하는 데 도움이 될 수 있습니다. Datadog 프로파일러는 시간 프레임이나 범위로 지정한 태그를 기반으로 프로파일 간 차이를 이해할 수 있도록 [비교 시각화][5]를 제공합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/profiler/
[2]: /ko/profiler/search_profiles
[3]: /ko/tracing/
[4]: /ko/profiler/connect_traces_and_profiles/
[5]: /ko/profiler/compare_profiles/
[6]: /ko/profiler/profile_types/