---
aliases:
- /ko/tracing/profiler/connect_traces_and_profiles/
further_reading:
- link: 추적
  tag: 설명서
  text: APM 분산 추적
- link: /profiler/enabling
  tag: 설명서
  text: 애플리케이션을 위한 지속적인 프로파일러 활성화
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
title: 느린 트레이스 또는 엔드포인트 조사
---

애플리케이션이 프로덕션에서 성능 문제를 보이는 경우 프로파일링에서 코드 스택 트레이스 벤치마크를 사용해 분산된 트레이싱을 통합하는 것은 성능 병목 현상을 파악하기 위한 좋은 방법입니다. 활성화된 APM 분산 트레이싱 및 지속적인 프로파일러 모두를 포함하는 애플리케이션 프로세스는 자동으로 연결됩니다.

스팬(span) 정보에서 코드 핫스팟 탭의 프로파일링 데이터로 바로 이동하고 성능 문제와 관련된 구체적인 코드 라인을 찾을 수 있습니다. 마찬가지로 또한 프로파일링 UI에서 리소스를 소비하는 느린 엔드포인트를 디버깅할 수 있습니다.

## 느린 트레이스에서 코드 핫스팟 식별

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Code Hotspots tab shows profiling information for a APM trace span" video=true >}}

### 전제 조건

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[자바(Java) 서비스 프로파일링을 켜면][1] 코드 핫스팟 식별은 기본적으로 활성화되어 있습니다. 수동적으로 측정된 코드의 경우 지속적인 프로파일러가 스팬(span) 범위 활성화를 필요로 합니다.

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // mandatory for Datadog continuous profiler to link with span
    // worker thread impl
  } finally {
    // Step 3: Finish Span when work is complete
    span.finish();
  }

```

<div class="alert alert-warning">
JFR(Java Flight Recorder) 대신 <a href="/profiler/enabling/java/?tab=datadog#requirements">Datadog 프로파일러</a>를 사용하는 것이 적극 권장됩니다.
</div>

[1]: /ko/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[파이썬(Python) 서비스에 대한 프로파일링을 켜면][1] 기본적으로 코드 핫스팟 식별이 활성화되어 있습니다.

`dd-trace-py` 버전 0.44.0+이 필요합니다.

[1]: /ko/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[루비(Ruby) 서비스 프로파일링을 켜면][1] 기본적으로 코드 핫스팟 식별이 활성화됩니다.

`dd-trace-rb` 버전 0.49.0+이 필요합니다.

[1]: /ko/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[고(Go) 서비스에 대한 프로파일링을 켜면][1] 기본적으로 코드 핫스팟 식별이 활성화됩니다.

새로운 [타임라인 기능](#span-execution-timeline-view)(베타)을 활성화하려면 아래 환경 변수를 설정하세요.

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

이러한 변수를 설정하면 실행 추적 데이터의 최대 1분(또는 MiB)을 [15분마다][2] 기록합니다.

실행 트레이스를 기록하는 동안 애플리케이션은 쓰레기 수집과 유사한 CPU 사용량 증가를 관측할 수 있습니다. 대부분의 애플리케이션에 미치는 영향은 미미하지만 향후 go1.21 릴리스는 이 오버헤드를 제거하는 [패치][3]를 포함합니다.

이러한 기능은 `dd-trace-go` 버전 1.37.0+(타임라인 베타의 경우 1.52.0+)을 필요로 하며 고(Go) 버전 1.18 이상에서 가장 잘 작동합니다.

[1]: /ko/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET 서비스의 프로파일링을 켜면][1] 코드 핫스팟 식별은 기본적으로 활성화됩니다.

이 기능에는 `dd-trace-dotnet` 버전 2.30.0+이 필요합니다.

[1]: /ko/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP 서비스에 대한 프로파일링을 켜면][1] 기본적으로 코드 핫스팟 식별이 활성화됩니다.

`dd-trace-php` 버전 0.71+이 필요합니다.

[1]: /ko/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 스팬 실행 상세 내역

각 트레이스의 보기에서 코드 핫스팟 탭은 선택한 스팬 범위에 대한 프로파일링 데이터를 강조 표시합니다.

왼쪽에 있는 값은 선택한 스팬 동안 메서드 호출에서 소비된 시간을 보여줍니다. 런타임과 언어에 따라 범주는 다양할 수 있습니다.
{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **동기화**는 모니터에서 대기하는 데 소요된 시간을 표시합니다. 스레드가 종료된 시간과 중지된 시간을 보여줍니다.
- **VM 작업**은 VM 작업(예: 쓰레기 수집, 컴파일링, 세이프포인트, 힙 덤프)에 대기한 시간을 보여줍니다.
- **File I/O**는 디스크 읽기/쓰기 작업 실행을 위해 대기한 시간을 보여줍니다.
- **소켓 I/O**는 네트워크 읽기/쓰기 작업이 실행되는 데 소요된 시간을 보여줍니다.
- **모니터 입력**은 스레드가 잠금으로 차단된 시간을 보여줍니다.
- **분류 안 됨**은 이전 범주로 구분될 수 없는 스팬에 실행된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **잠금 대기**는 스레드가 잠금으로 차단된 시간을 보여줍니다.
- **분류 안 됨**은 이전 범주로 구분될 수 없는 스팬에 실행된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **분류 안 됨**은 이전 범주로 구분될 수 없는 스팬에 실행된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **CPU 꺼짐**은 CPU가 실행되지 않는 스팬 실행에 소요된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **잠금 대기**는 스레드가 잠금으로 차단된 시간을 보여줍니다.
- **분류 안 됨**은 이전 범주로 구분될 수 없는 스팬에 실행된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
- **CPU**는 CPU 작업을 실행하는 데 소요된 시간을 보여줍니다.
- **분류 안 됨**은 이전 범주로 구분될 수 없는 스팬에 실행된 시간을 보여줍니다.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

플러스 아이콘 `+`을 클릭하여 스택 트레이스를 해당 메서드 **역방향순으로** 확장합니다. 값 위를 마우스로 가리켜 범주별로 설명된 시간 비율을 확인합니다.

### 스팬 실행 타임라인 보기

{{< img src="profiler/code_hotspots_tab-timeline.mp4" alt="시간 및 스레드에 대한 상세 실행 내역을 보여주는 코드 핫스팟 탭 타임라인 보기" video=true >}}

**타임라인** 보기는 시간 기반 패턴과 스팬 기간 동안의 작업 분포를 보여줍니다.

스팬 **타임라인** 보기에서 다음을 할 수 있습니다.

- 시간을 소비하는 메서드를 분리합니다.
- 스레드 간 복잡한 상호 작용을 분류합니다.
- 요청에 영향을 미치는 런타임 활동을 표시합니다.

런타임과 언어에 따라 레인은 다양할 수 있습니다.

{{< programming-lang-wrapper langs="java,go,dotnet" >}}
{{< programming-lang lang="java" >}}
각 레인은 **스레드**를 나타냅니다. 일반적인 풀의 스레드는 함께 그룹화됩니다. 풀을 확대하여 각 스레드의 상세 정보를 볼 수 있습니다.

상위 레인은 추가 지연을 더할 수 있는 런타임 활동입니다. 이러한 활동은 요청과는 무관할 수 있습니다.
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
각 레인은 **goroutine**을 나타냅니다. 선택한 스팬에서 시작한 goroutine을 비롯해 생성된 goroutine과 하위 항목 모두를 포함합니다. 동일한 `go`문으로 생성한 goroutine은 함께 그룹화됩니다. 그룹을 확대해 각 goroutine에 대한 상세 정보를 볼 수 있습니다. 

상위 레인은 추가 지연을 더할 수 있는 런타임 활동입니다. 이러한 활동은 요청과는 무관할 수 있습니다.
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
각 레인은 **스레드**를 나타냅니다. 일반적인 풀의 스레드는 함께 그룹화됩니다, 풀을 확대해 각 스레드에 대한 상세 정보를 볼 수 있습니다.

상위 레인은 추가 지연을 더할 수 있는 런타임 활동입니다. 이러한 활동은 요청과는 무관할 수 있습니다.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 트레이스에서 프로파일 보기

{{< img src="profiler/flamegraph_view-1.mp4" alt="불꽃 그래프에서 프로파일 보기 열기" video=true >}}

상세 내역의 각 유형의 경우 **전체 페이지에서 보기**를 클릭해 새 페이지에서 동일한 데이터를 열 수 있습니다. 해당 페이지에서 시각화를 불꽃 그래프로 바꿀 수 있습니다.
"집중** 선택기를 클릭해 데이터 범위를 정의하세요.

- **스팬 및 하위 항목**은 프로파일링 데이터를 선택한 스팬과 동일한 서비스의 모든 하위 스팬으로 범위를 좁힙니다.
- **스팬만**은 프로파일링 데이터를 이전에 선택한 스팬으로 좁힙니다.
- **스팬 시간 기간**은 프로파일링 데이터를 스팬이 활성화되는 기간 동안의 모든 스레드로 범위를 좁힙니다.
- **전체 프로파일**은 데이터를 이전에 선택한 스팬에서 실행된 전체 서비스 프로세서의 60초 동안으로 좁힙니다.

## API 엔드포인트별 상세 코드 성능 내역

### 전제 조건

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[자바(Java) 서비스 프로파일링을 켜면][1] 엔드포인트 프로파일링이 기본적으로 활성화되어 있습니다.

[Datadog 프로파일러][2] 사용이 필요합니다. JFR은 지원되지 않습니다.

[1]: /ko/profiler/enabling/java
[2]: /ko/profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[파이썬(Python) 서비스에 대한 프로파일링을 켜면][1] 기본적으로 엔드포인트 프로파일링이 활성화되어 있습니다.

`dd-trace-py` 버전 0.54.0+이 필요합니다.

[1]: /ko/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[고(Go) 서비스 프로파일링을 켜면][1] 엔드포인트 프로파일링이 기본적으로 활성화되어 있습니다.

`dd-trace-go` 버전 1.37.0+이 필요하며 고 버전 1.18 이상에서 가장 잘 작동합니다.

[1]: /ko/profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[루비(Ruby) 서비스에 대한 프로파일링을 켜면][1] 기본적으로 엔드포인트 프로파일링이 활성화되어 있습니다.

`dd-trace-rb` 버전 0.54.0+이 필요합니다.

[1]: /ko/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET 서비스에 대한 프로파일링을 켜면][1] 기본적으로 엔드포인트 프로파일링이 활성화되어 있습니다.

`dd-trace-dotnet` 버전 2.15.0+이 필요합니다.

[1]: /ko/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP 서비스에 대한 프로파일링을 켜면][1] 기본적으로 엔드포인트 프로파일링이 활성화되어 있습니다.

`dd-trace-php` 버전 0.79.0+이 필요합니다.

[1]: /ko/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 엔드포인트 프로파일링

엔드포인트 프로파일링을 사용하면 웹 서비스 엔드포인트별로 불꽃 그래프를 범위화하고 느리고 지연을 야기하며 낮은 최종 사용자 경험을 가져오는 엔드포인트를 찾을 수 있습니다. 이러한 엔드포인트는 디버깅하거나 느린 이유를 알기 어렵습니다. 지연은 엔드포인트가 많은 CPU 주기를 소비하는 등 예기치 못한 많은 리소스 소비에 의한 것일 수 있습니다. 

엔드포인트 프로파일링을 통해 다음을 할 수 있습니다.

- 엔드포인트의 전반적인 반응 시간을 지연시키는 병목 현상 메서드를 식별합니다.
- CPU, 메모리, 예외 등 가치 있는 리소스의 소비를 담당하는 상위 엔드포인트를 분리합니다. 일반적으로 성능 향상을 위해 서비스를 최적화하는 경우 이 방법은 특히 유용합니다.
- 타사 코드나 런타임 라이브러리가 엔드포인트 지연이나 리소스 소비 상승을 부추기고 있지 않은지 확인합니다.

{{< img src="profiler/endpoint_agg.mp4" alt="엔드포인트 집계를 통한 느린 엔드포인트 트러블슈팅" video=true >}}

### 가장 많은 리소스를 소비하는 엔드포인트 추적

CPU 및 실제 시간(wall time) 등 가치 있는 리소스를 소비하는 상위 엔드포인트를 추적하는 것은 중요합니다. 이 목록은 엔드포인트가 퇴행하고 있거나 너무 많은 리소스를 소비하는 새로운 엔드포인트를 도입하여 전반적인 서비스 속도가 둔화되는 경우 이를 파악하는 데 도움을 줍니다.

다음 이미지는 `GET /store_history`가 CPU의 20%를 소비하여 이 서비스에 정기적으로 영향을 주는 것을 보여줍니다.

{{< img src="profiler/endpoint_metric.png" alt="리소스 소비 기준 상위 엔드포인트 그래프화" >}}

### 요청당 평균 리소스 소비 추적

시간에 따라 트래픽이 전환되더라도 동작의 변화를 확인하려면 `Per endpoint call`를 선택합니다. 점진적인 롤아웃 상태 확인이나 일일 트래픽 패턴 분석에 유용합니다.

다음 동영상은 `/GET train`에 대해 요청당 CPU가 2배 상승한 것을 보여줍니다.

{{< img src="profiler/endpoint_per_request.mp4" alt="요청당 더 많은 리소스 사용을 시작한 엔드포인트 트러블슈팅" video=true >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}