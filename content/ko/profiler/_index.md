---
aliases:
- /ko/tracing/profiling/
- /ko/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 지속적 프로파일러 사용
- link: getting_started/profiler
  tag: 설명서
  text: 지속적 프로파일러 시작하기
- link: profiler/search_profiles
  tag: 설명서
  text: 사용 가능한 프로파일 유형에 대해 자세히 알아보기
- link: /developers/guide/data-collection-resolution-retention/
  tag: 설명서
  text: 데이터 수집, 해결 및 보존
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
  text: Datadog의 지속적 프로파일러를 사용해 Akka 애플리케이션을 최적화하는 방법
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: 블로그
  text: Datadog 지속적 프로파일러를 통해 루비(Ruby) 코드 성능 분석
title: 지속적 프로파일러
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

</br>

CPU, 메모리 및 IO 병목 현상을 찾고 메서드 이름, 클래스 이름 및 라인 개수별로 상세 내역을 확인하여 최종 사용자 지연과 인프라 비용을 크게 줄일 수 있습니다.

### 프로덕션에 미치는 적은 영향

지속적 프로파일러는 DK Flight Recorder와 같은 기술을 활용하여 모든 서비스의 프로덕션에서 실행되므로 호스트의 CPU 및 메모리 사용량에 최소한의 영향만 미칩니다.

## 시작하기

서비스를 프로파일링하여 한 곳에서 스택 트래이스를 시각화하는 데 단 몇 분이면 됩니다.

### 애플리케이션의 계측

{{< partial name="profiling/profiling-languages.html" >}}

## 프로파일러 사용 가이드

[프로파일러 시작히기][1] 가이드는 성능 문제를 포함하는 샘플 서비스를 제공하여 지속적 프로파일러가 문제를 이해하고 해결하는 방법을 보여줍니다.

## Datadog 프로파일러 탐색

애플리케이션을 설정하여 프로파일을 Datadog로 전송한 후 코드 성능에 대한 인사이트를 받을 수 있습니다.

기본적으로 프로파일은 7일 동안 보존되며 프로파일 데이터에서 생성된 메트릭은 한 달 동안 보관됩니다.

### 프로파일 유형

각 지원되는 언어에 대해 수집되는 프로파일 유형에 대한 설명은 [프로파일 유형][6]을 참조하세요.

{{< img src="profiler/profile-types.png" alt="자바(Java) 애플리케이션에 대해 수집되는 프로파일 유형 목록" style="width:100%;" >}}

### 태그별 프로파일 검색

특정 호스트, 서비스, 버전 또는 조합을 포함하는 모든 차원에서 [태그를 사용하여 프로파일을 검색합니다][2].

{{< img src="profiler/search_profiles2.mp4" alt="태그별 프로파일 검색" video=true >}}

### 배포 환경에서 함수 성능 추적

메서드별 상위 CPU 사용량, 스레드별 상위 메모리 할당, 버전별 CPU 사용량 등 서비스의 핵심 프로파일링 메트릭을 획득하여 대시보드에서 시각화합니다.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="대시보드에 프로파일링 메트릭을 추가합니다." video=true >}}

### 프로파일링 데이터에 트레이스 연결

[APM 분산 트레이싱][3]과 활성화된 지속적 프로파일러 모두를 포함하는 애플리케이션 프로세스는 자동으로 연결되므로 [코드 핫스팟 탭][4]의 스팬(span) 정보에서 프로파일링 데이터로 직접 이동하여 성능 문제와 관련된 구체적인 코드 라인을 찾을 수 있습니다.

{{< img src="profiler/code_hotspots_tab.mp4" alt="APM 트레이스 스팬에 대한 프로파일링 정보를 표시하는 코드 핫스팟 탭" video=true >}}

### 프로파일 비교를 통해 성능 변화 찾기

각기 다른 시간, 환경, 배포 환경에서 유사한 프로파일을 비교하면 성능 문제의 가능한 원인과 해결 방법을 이해할 수 있습니다. Datadog 프로파일러는 [비교 시각화][5]를 제공하여 범위를 구체화한 시간 프레임이나 태그 기준 프로파일에 차이가 있는지를 알 수 있게 해줍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/profiler/
[2]: /ko/profiler/search_profiles
[3]: /ko/tracing/
[4]: /ko/profiler/connect_traces_and_profiles/
[5]: /ko/profiler/compare_profiles/
[6]: /ko/profiler/profile_types/