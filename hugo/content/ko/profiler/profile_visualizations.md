---
aliases:
- /ko/tracing/profiling/search_profiles/
- /ko/tracing/profiler/search_profiles/
- /ko/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 Continuous Profiler 활성화
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: 학습 센터
  text: Continuous Profiler로 코드 성능 문제 진단
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: 학습 센터
  text: Profiling Timeline으로 요청 지연 시간 최적화
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: 블로그
  text: Datadog에서 상시 프로덕션 프로파일링 도입
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: 블로그
  text: Continuous Profiler의 타임라인 보기를 사용해 런타임 및 코드 비효율성 진단
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: 블로그
  text: 접근 가능한 프로파일링 시각화
title: 프로필 시각화
---
## 프로필 검색 {#search-profiles}

{{< img src="profiler/search_profiles4.mp4" alt="태그별 프로필 검색" video=true >}}

{{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}}로 이동하여 서비스를 선택하면 해당 프로필을 조회할 수 있습니다.

[환경 트레이싱 구성][1]에서 설정한 인프라 태그 또는 애플리케이션 태그에 따라 필터링할 수 있습니다. 기본적으로 다음 패싯을 사용할 수 있습니다.

| 패싯   | 정의                                                                |
| ------- | ------------------------------------------------------------------------- |
| 환경     | 애플리케이션이 실행 중인 환경(`production`, `staging`)입니다. |
| 서비스 | 코드가 실행 중인 [서비스][2]의 이름입니다.                        |
| 버전 | 코드의 버전입니다.                                                 |
| 호스트    | 프로파일링된 프로세스가 실행 중인 호스트 이름입니다.                         |
| 런타임 | 프로파일링된 프로세스가 실행 중인 런타임 유형(`JVM`, `CPython`)입니다.   |

## 시각화 {#visualizations}

### 플레임(Flame) 그래프 {#flame-graph}

플레임(Flame) 그래프는 Continuous Profiler의 기본 시각화 도구입니다. 아래 그래프는 각 메서드가 사용한 CPU 양과 각 메서드가 호출된 방식을 보여줍니다. 언어에 따라 다른 [프로필 유형][4]을 사용할 수 있습니다.

{{< img src="profiler/profiling_viz-flamegraph2.png" alt="플레임(Flame) 그래프" >}}

예를 들어, 이전 이미지의 첫 번째 행부터 시작하여 `Thread.run()`이 `Thread.runWith(Object, Runnable)`을 호출하고, 다시 `ThreadPoolExecutor$Worker.run()`을 호출하는 식으로 이어집니다.

프레임의 너비는 전체 CPU 소모량에서 해당 프레임이 차지하는 비중을 나타냅니다. 오른쪽에서는 다른 메서드를 호출하지 않고 메서드가 CPU에서 소비한 시간인 셀프 타임(self time)만 고려하는 {{< ui >}}CPU time by Method{{< /ui >}} 상위 목록을 볼 수 있습니다.

기본적으로 더 어두운 프레임은 더 높은 CPU 사용량을, 더 밝은 프레임은 더 낮은 사용량을 나타내며, 가장 리소스를 많이 사용하는 메서드는 플레임 그래프의 가장 왼쪽에 그룹화됩니다.

플레임 그래프는 [프로파일링 플레임 그래프 위젯][5]을 사용하여 대시보드 및 Notebooks에 포함할 수 있습니다. 노트북으로 내보낸 프로파일링 데이터는 1년 동안 보관됩니다.

### 타임라인 보기 {#timeline-view}

타임라인 보기는 플레임 그래프와 동일하며, [단일 프로필](#single-profile), [프로파일링 탐색기][7]의 단일 프로세스 및 [트레이스][6] 기간에 걸친 시간 기반 패턴과 작업 분포를 보여줍니다.

플레임 그래프와 비교하여 타임라인 보기는 다음을 수행하는 데 도움이 될 수 있습니다.

- 스파이키 메서드를 격리합니다.
- 스레드 간 복잡한 상호 작용을 분류합니다.
- 프로세스에 영향을 미치는 런타임 활동을 표시합니다.

{{< img src="profiler/profiling_viz-timeline3.png" alt="타임라인" >}}

타임라인 보기에 액세스하려면 다음 단계를 따르세요.

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][7]로 이동합니다.
2. {{< ui >}}Visualize as{{< /ui >}} 옵션을 {{< ui >}}Thread Timeline{{< /ui >}}으로 설정합니다.

런타임과 언어에 따라 타임라인 레인은 다양할 수 있습니다.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
각 레인은 **스레드**를 나타냅니다. 공통 풀의 스레드는 함께 그룹화됩니다. 풀을 확장하여 각 스레드에 대한 세부 정보를 볼 수 있습니다.

상단의 레인은 성능에 영향을 줄 수 있는 런타임 활동입니다.

타임라인을 사용하여 느린 p95 요청 또는 시간 초과를 디버깅하는 방법에 대한 자세한 내용은 [프로파일링을 통한 요청 지연 시간 이해][1] 블로그 게시물을 참조하세요.

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
Python에 대해 이 기능을 활성화하는 방법을 알아보려면 [전제 조건][1]을 참조하세요.

각 레인은 **스레드**를 나타냅니다. 공통 풀의 스레드는 함께 그룹화됩니다. 풀을 확장하여 각 스레드에 대한 세부 정보를 볼 수 있습니다.

[1]: /ko/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Go에 대해 이 기능을 활성화하는 방법을 알아보려면 [전제 조건][1]을 참조하세요.

각 레인은 **goroutine**을 나타냅니다. 동일한 `go` 문으로 생성된 goroutine은 함께 그룹화됩니다. 그룹을 확장하여 각 goroutine에 대한 세부 정보를 볼 수 있습니다.

상단의 레인은 성능에 영향을 줄 수 있는 런타임 활동입니다.

타임라인을 사용하여 느린 p95 요청 또는 시간 초과를 디버깅하는 방법에 대한 자세한 내용은 [Datadog의 프로파일링 타임라인으로 Go 요청 지연 시간 디버깅하기][2] 블로그 게시물을 참조하세요.

[1]: /ko/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Ruby에 대해 이 기능을 활성화하는 방법을 알아보려면 [전제 조건][1]을 참조하세요.

각 레인은 **스레드**를 나타냅니다. 공통 풀의 스레드는 함께 그룹화됩니다. 풀을 확장하여 각 스레드에 대한 세부 정보를 볼 수 있습니다.

스레드 ID는 `native-thread-id (ruby-object-id)`로 표시되며, 여기서 네이티브 스레드 ID는 `Thread#native_thread_id`(사용 가능한 경우)이고 Ruby 객체 ID는 `Thread#object_id`입니다.

**참고**: Ruby VM 또는 운영 체제에서 네이티브 스레드 ID를 재사용할 수 있습니다.

[1]: /ko/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Node.js에 대해 이 기능을 활성화하는 방법을 알아보려면 [전제 조건][1]을 참조하세요.

JavaScript **스레드**에 대한 레인이 하나 있습니다.

DNS 요청 및 TCP 연결 작업으로 구성된 다양한 **비동기 활동**을 시각화하는 레인도 있을 수 있습니다. 레인 수는
이러한 활동의 ​​최대 동시 실행 수와 일치하므로 중복 없이 시각화할 수 있습니다.

상단의 레인은 요청에 추가 지연 시간을 발생시킬 수 있는 가비지 컬렉터 **런타임 활동**입니다.

[1]: /ko/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
각 레인은 **스레드**를 나타냅니다. 이름이 같은 스레드는 함께 그룹화됩니다. 그룹을 확장하여 각 스레드에 대한 세부 정보를 볼 수 있습니다. 코드에 의해 명시적으로 생성된 스레드는 _관리형 스레드_ 아래에 그룹화된다는 점에 유의하세요.

상단의 레인은 GC 활동과 같이 성능에 영향을 줄 수 있는 런타임 활동입니다.

스레드 ID는 `<unique-id> [#OS-thread-id]`로 표시됩니다.

**참고**: 운영 체제에서 스레드 ID를 재사용할 수 있습니다.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
PHP에 대해 이 기능을 활성화하는 방법을 알아보려면 [전제 조건][1]을 참조하세요.

각 PHP **스레드**마다 하나의 레인이 있습니다(PHP NTS의 경우 프로세스당 스레드가 하나뿐이므로 레인도 하나입니다).
이 **스레드**에서 실행되는 파이버는 동일한 레인에 표시됩니다.

상단의 레인은 파일 컴파일 및 가비지 컬렉션으로 인해 요청에 추가 지연 시간을 발생시킬 수 있는 런타임 활동입니다.

[1]: /ko/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
타임라인 보기는 현재 Full Host 프로파일링을 지원하지 않습니다.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 시계열 및 표 {#timeseries-and-table}

각 런타임에 대해 [시계열별로 나열된][3] 다양한 메트릭을 확인할 수 있습니다.

### 호출 그래프 {#call-graph}

호출 그래프는 플레임 그래프에 사용된 것과 동일한 프로파일링 데이터를 사용하지만, 각 메서드를 단일 노드로 한 번만 표시하고 메서드 간 호출 관계를 에지로 나타냅니다.

에지의 두께는 다른 메서드를 호출하는 데 소요된 시간을 나타내며, 색상과 크기는 셀프 타임을 나타냅니다.

{{< img src="profiler/profiling_viz-callgraph.png" alt="호출 그래프" >}}

### 단일 프로필 {#single-profile}

기본적으로 프로필은 1분에 한 번 업로드됩니다. 언어에 따라 이러한 프로세스는 15~60초 동안 프로파일링됩니다.

특정 프로필을 보려면 {{< ui >}}Visualize as{{< /ui >}} 옵션을 {{< ui >}}Profile List{{< /ui >}}로 설정하고 목록에서 항목을 클릭하세요.

{{< img src="profiler/profiling_single-profile2.png" alt="단일 프로필 선택" >}}

헤더에는 프로필을 생성한 서비스나 프로필과 관련된 환경 및 코드 버전과 같이 프로필과 관련된 정보가 포함되어 있습니다.

프로필 헤더 아래에는 네 개의 탭이 있습니다.

| 탭                    | 정의                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프로필               | 현재 보고 있는 프로필의 플레임 그래프 및 요약 표입니다. 프로필 유형을 전환할 수 있습니다(예: `CPU`, `Memory allocation`). |
| 인사이트               | 코드의 잠재적인 문제나 개선 영역을 제안하는 휴리스틱 세트입니다.                                                            |
| 메트릭                | 동일한 서비스의 모든 프로필에서 제공되는 프로파일러 메트릭입니다.                                                                                     |
| 런타임 정보      | 지원되는 언어의 런타임 속성 및 프로필 태그입니다.                                                                                       |
| 관련 프로세스 | 프로필과 관련된 프로세스입니다.                                                                                                                  |

**참고**: 각 프로필의 오른쪽 상단 모서리에는 다음을 수행할 수 있는 옵션이 있습니다.

- 이 프로필을 다른 프로필과 비교합니다.
- 리포지토리 커밋을 조회합니다.
- 동일한 프로세스 및 시간 프레임의 트레이스를 조회합니다.
- 프로필을 다운로드합니다.
- 전체 페이지에서 프로필을 엽니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/send_traces/#configure-your-environment
[2]: /ko/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /ko/profiler/profile_types/
[5]: /ko/dashboards/widgets/profiling_flame_graph
[6]: /ko/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline