---
further_reading:
- link: profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 Continuous Profiler 활성화
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: 블로그
  text: DataDog에서 상시 프로덕션 프로파일링 도입
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: 학습 센터
  text: Continuous Profiler로 코드 성능 문제 진단
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: 학습 센터
  text: Profiling Timeline으로 요청 지연 시간 최적화
title: 프로필 유형
---
{{< ui >}}Profiles{{< /ui >}} 탭에서 특정 언어에 사용할 수 있는 모든 프로필 유형을 확인할 수 있습니다. 언어 및 버전에 따라 프로필에 대해 수집되는 정보가 다릅니다.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof,full_host" >}}
{{< programming-lang lang="java" >}}

프로파일링이 활성화되면 [지원되는 Java 버전][1]에 대해 다음 프로필 유형이 수집됩니다.


CPU
: 각 메서드가 CPU에서 실행되는 데 소요된 시간입니다. 여기에는 JVM에서 실행되는 코드(예: Java, Kotlin)가 포함되지만 JVM 작업이나 JVM 내에서 호출되는 네이티브 코드는 포함되지 않습니다.

Allocations
: 이후에 해제된 할당을 포함하여 각 메서드에서 수행한 힙 할당 수입니다.<br />
_필요 사항: Java 11_

Allocated Memory
: 이후에 해제된 할당을 포함하여 각 메서드에 의해 할당된 힙 메모리의 양입니다.<br />
_필요 사항: Java 11_

Live Heap(v1.61.0+)
: 아직 가비지 컬렉션되지 않았으며 각 메서드에 의해 할당된 객체 및 메모리입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다. 프로파일러는 JVM 버전에 사용할 수 있는 가장 정확한 엔진을 자동으로 사용합니다.<br />
_필요 사항: Java 11+_

Wall Time
: 각 메서드에서 소요된 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 메서드가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

Class Load
: 각 메서드에 의해 로드된 클래스 수입니다.

Thrown Exceptions
: 각 메서드에서 발생한 오류 및 예외의 수와 그 유형입니다.

File I/O
: 각 메서드가 파일을 읽고 쓰는 데 소요된 시간입니다.

Lock
: 각 메서드가 잠금을 기다리는 데 소요된 시간입니다.

Socket I/O
: 각 메서드가 소켓 I/O를 읽고 쓰는 데 소요된 시간입니다.

[1]: /ko/profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

프로파일링이 활성화되면 [Python 버전][1]에 따라 다음 프로필 유형이 수집됩니다.


Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.<br />
_필요 사항: Python 2.7+_

Lock Wait Time
: 각 함수가 잠금을 기다리는 데 소요된 시간입니다.<br />
_필요 사항: Python 2.7+_

Locked Time
: 각 함수가 잠금을 유지하는 데 소요된 시간입니다.<br />
_필요 사항: Python 2.7+_

Lock Acquires
: 각 함수가 잠금을 획득한 횟수입니다.<br />
_필요 사항: Python 2.7+_

Lock Releases
: 각 함수가 잠금을 해제한 횟수입니다.<br />
_필요 사항: Python 2.7+_

CPU
: Python 및 네이티브 코드를 포함하여 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.<br />
_필요 사항: Python 2.7+, POSIX 플랫폼_

Heap Live Size
: 아직 가비지 컬렉션되지 않았으며 각 함수에 의해 할당된 힙 메모리의 양입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Python 3.5+_

Allocated Memory
: 이후에 해제된 할당을 포함하여 각 함수에 의해 할당된 힙 메모리의 양입니다.<br />
_필요 사항: Python 3.5+_

Allocations
: 이후에 해제된 할당을 포함하여 각 함수에서 수행한 힙 할당 수입니다.<br />
_필요 사항: Python 3.5+_

[1]: /ko/profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

프로파일링이 활성화되면 지원되는 [Go 버전][3]에 대해 다음 프로필 유형이 수집됩니다.


CPU Time
: 각 함수가 CPU에서 실행되는 데 소요된 시간입니다. 네트워킹, 채널, 뮤텍스 및 절전 대기와 같은 오프 CPU 시간은 이 프로필에서 캡처되지 않습니다. 뮤텍스 및 블록 프로필을 참조하세요.

Allocations
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 60초) 동안 힙 메모리에서 각 함수에 의해 할당된 객체 수입니다. Go는 이 `alloc_objects`를 호출합니다. 스택 할당은 추적되지 않습니다. 이는 가비지 컬렉션 부하를 조사하는 데 유용합니다. 이 측정값이 [Delta 프로필](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대한 참고 사항도 확인하세요.

Allocated Memory
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 60초) 동안 각 함수에 의해 할당된 힙 메모리의 양입니다. Go는 이 `alloc_space`를 호출합니다. 스택 할당은 추적되지 않습니다. 이는 가비지 컬렉션 부하를 조사하는 데 유용합니다. 이 측정값이 [Delta 프로필](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대한 참고 사항도 확인하세요.

Heap Live Objects
: 가비지 컬렉션 후에도 계속 사용 중이며 힙 메모리에서 각 함수에 의해 할당된 객체 수입니다. Go는 이 `inuse_objects`를 호출합니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.

Heap Live Size
: 가비지 컬렉션 후에도 계속 사용 중이며 각 함수에 의해 할당된 힙 메모리의 양입니다. 기본 설정(GOGC=100)에서 이는 일반적으로 프로세스 RSS 사용량의 약 50%를 나타냅니다. Go는 이 `inuse_space`를 호출합니다. 이 메트릭을 사용하여 메모리 소비를 검토하고 [누수 진단][4]을 실시할 수 있습니다. Go의 메모리 관리 방식에 대한 자세한 내용은 [Go 메모리 메트릭의 이해][5] 및 [Go 가비지 컬렉터 가이드][6]를 참조하세요.

Mutex
: 프로파일링 기간(기본값: 60초) 동안 함수가 뮤텍스를 기다린 시간입니다. 이 프로필의 스택 트레이스는 뮤텍스에서 차단된 다른 goroutine이 계속 진행되도록 허용한 `Unlock()` 작업을 가리킵니다. 스핀락을 사용하는 짧은 뮤텍스 경합은 이 프로필에서는 캡처되지 않지만 CPU 프로필에서는 확인할 수 있습니다. 이 측정값이 [Delta 프로필](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대한 참고 사항도 확인하세요.

Block
: 프로파일링 기간(기본값: 60초) 동안 함수가 뮤텍스 및 채널 작업을 기다린 시간입니다. 절전, GC, 네트워크 및 Syscall 작업은 이 프로필에서 캡처되지 않습니다. 차단 작업은 차단이 해제된 후에만 캡처되므로 이 프로필은 중단된 것으로 보이는 애플리케이션을 디버깅하는 데 사용할 수 없습니다. 뮤텍스 경합의 경우, 이 프로필의 스택 트레이스는 차단된 `Lock()` 작업을 가리킵니다. 이를 통해 프로그램이 차단되는 위치를 알 수 있고, 뮤텍스 프로필을 통해서는 프로그램의 어떤 부분이 경합을 유발하는지 알 수 있습니다. 자세한 내용은 Datadog의 [Go에서 블록 프로파일링][1] 연구 자료를 참조하세요. 이 측정값이 [Delta 프로필](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대한 참고 사항도 확인하세요. **참고**: 블록 프로파일러는 프로덕션 워크로드에 상당한 오버헤드를 유발할 수 있습니다. 프로덕션 환경에서 활성화하는 경우, 높은 속도(예: 100밀리초인 `100000000`)를 사용하고, 지연 시간이나 CPU 사용률 증가의 징후가 있는지 확인하세요.

Goroutines
: 현재 동일한 함수를 실행 중인 goroutine 수의 스냅샷입니다(온 CPU 및 오프 CPU 대기 모두). 스냅샷 간의 goroutine 수가 증가하면 프로그램에서 goroutine이 누수되고 있음을 나타낼 수 있습니다. 대부분의 정상적인 애플리케이션의 경우 이 프로필에서는 워커 풀과 해당 풀이 사용하는 goroutine 수가 큰 비중을 차지합니다. 지연 시간에 매우 민감하고 많은 수의 goroutine(10,000개 이상)을 사용하는 애플리케이션에서 이 프로필을 활성화하려면 stop-the-world 일시 중지가 필요합니다. 일시 중지는 모든 프로파일링 기간(기본값: 60초)마다 한 번만 발생하며, 일반적으로 goroutine당 약 `1µsec` 동안 지속됩니다. p99 지연 시간 SLO가 약 `100ms`인 보통 애플리케이션은 일반적으로 이 경고를 무시할 수 있습니다. 자세한 내용은 Datadog의 [Go에서의 Goroutine 프로파일링][2] 연구 자료를 참조하세요.

#### Delta 프로필 {#delta-profiles}
<div class="alert alert-info">Go 프로파일러 <code>1.33.0</code>이전 버전에서는 <em>프로파일링 기간 동안</em>이 아닌 <em>프로세스가 시작된 이후 누적된</em> 측정값으로 Allocations, Allocated Memory, Mutex 및 Block 메트릭이 표시됩니다. 변경된 버전 <code>1.33.0</code> 의 Delta 프로필에서는 누적되지 않고 변하는 측정값을 확인할 수 있습니다. Delta 프로파일링은 기본적으로 설정되어 있습니다. 프로파일러 버전 <code>1.35.0</code> 을 사용하면 <code>WithDeltaProfiles</code> 옵션을 사용하여 Delta 프로필을 비활성화할 수 있습니다. <br/><br/>프로파일러 버전 <code>1.37.0</code>부터는 업로드 대역폭 사용량을 줄이기 위해 Delta 프로파일링이 활성화된 경우 누적된 프로필이 더 이상 업로드되지 않습니다. 누적된 전체 프로필이 필요한 경우 <a href="/help/">지원팀에 문의</a>하여 해당 사용 사례를 논의하시기 바랍니다.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /ko/profiler/enabling/go#requirements
[4]: /ko/profiler/guide/solve-memory-leaks
[5]: https://www.datadoghq.com/blog/go-memory-metrics/
[6]: https://go.dev/doc/gc-guide
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

프로파일링이 활성화되면 [지원되는 Ruby 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

CPU
: Ruby 및 네이티브 코드를 포함하여 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.

Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

Allocations(v2.3.0+)
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 60초) 동안 각 메서드에 의해 할당된 객체 수입니다. 이는 가비지 컬렉션 부하를 조사하는 데 유용합니다.<br />
_필요 사항:_ [수동 활성화][2]

Heap Live Objects(미리 보기, v2.18.0+)
: 아직 가비지 컬렉션되지 않았으며 힙 메모리에서 각 메서드에 의해 할당된 객체 수입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Ruby 3.1+_ 및 [수동 활성화][2]

Heap Live Size(미리 보기, v2.18.0+)
: 아직 가비지 컬렉션되지 않았으며 각 메서드에 의해 할당된 힙 메모리의 양입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Ruby 3.1+_ 및 [수동 활성화][2](현재 Ruby 4와 호환되지 않음)

GVL Profiling(Timeline 내)(v2.11.0+)
: 백그라운드 스레드를 포함하여 다른 '노이즈가 많은 이웃' 스레드로 인해 스레드가 작업을 수행하지 못하는 시간을 기록합니다. 이는 타임라인 시각화를 사용할 때 애플리케이션의 지연 시간 급증을 조사하는 데 유용합니다.<br />
_필요 사항: Ruby 3.2+_

[1]: /ko/profiler/enabling/ruby/#requirements
[2]: /ko/profiler/enabling/ruby/#configuration
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

프로파일링이 활성화되면 [지원되는 Node.js 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

CPU
: JavaScript 및 네이티브 코드를 포함하여 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.<br />
: CPU 프로파일링은 Linux 및 macOS에서 사용할 수 있습니다. 이 기능은 Windows에서 사용할 수 없습니다.

Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

Heap Live Objects
: 아직 가비지 컬렉션되지 않았으며 힙 메모리에서 각 함수에 의해 할당된 객체 수입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.

Heap Live Size
: 아직 가비지 컬렉션되지 않았으며 각 함수에 의해 할당된 힙 메모리의 양입니다. 이는 서비스의 전반적인 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.
: Heap Live Size 프로필의 깊은 스택 트레이스는 64개 프레임으로 잘립니다.

Allocated Memory(미리 보기)
: 이후에 해제된 할당을 포함하여 각 함수에 의해 할당된 힙 메모리의 양입니다.<br />
_필요 사항: Node.js 26+ 및 `DD_PROFILING_ALLOCATION_ENABLED=true`_

Allocations(미리 보기)
: 이후에 해제된 할당을 포함하여 각 함수에서 수행한 힙 할당 수입니다.<br />
_필요 사항: Node.js 26+ 및 `DD_PROFILING_ALLOCATION_ENABLED=true`_

[1]: /ko/profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

프로파일링이 활성화되면 [지원되는 .NET 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

Wall Time
: 관리되는 메서드에서 소요된 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 메서드가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

CPU(v2.15+)
: 각 메서드가 CPU에서 실행되는 데 소요된 시간입니다.

Thrown Exceptions(v2.31+)
: 각 메서드에서 발생한 포착되거나 포착되지 않은 예외의 수와 그 유형 및 메시지입니다.

Allocations(v3.28+)
: 각 메서드별로 할당된 객체의 수와 크기 및 객체 유형입니다.
.NET Framework의 경우 크기를 사용할 수 없습니다.<br />
필요 사항: .NET Framework(Datadog Agent 7.51+ 및 v3.2+ 포함)/.NET 6+. 하지만 Datadog은 더 정확한 샘플링을 위해 .NET 10 이상을 권장합니다.

Lock(v2.49+)
: 스레드가 잠금을 대기하는 횟수와 시간입니다.<br />
_필요 사항:: .NET Framework(Datadog Agent 7.51+ 필수)/.NET 5+_

Live Heap(v3.28+)
: 할당된 객체(클래스 이름 포함) 중 여전히 메모리에 남아 있는 하위 세트입니다.<br />
필요 사항: .NET 7+. 하지만 Datadog은 더 정확한 샘플링을 위해 .NET 10 이상을 권장합니다.

Outgoing HTTP Requests(Timeline 내)(미리 보기, v3.19+)
: 발신 HTTP 요청의 시작 및 끝과 다양한 단계(DNS, 보안 핸드셰이크, 소켓, 요청/응답)의 지속 시간 및 발생 가능한 예기치 않은 리디렉션입니다.<br />
_필요 사항: .NET 7+_

Thread Lifetime(Timeline 내)(v3.19+)
: ThreadPool 고갈 및 수명이 짧은 스레드를 쉽게 탐지하기 위한 스레드 수명의 시작 및 끝입니다.<br />
_필요 사항: .NET Framework(Datadog Agent 7.51+ 및 v3.2+ 포함)/.NET 5+_

Garbage Collector CPU Consumption(v3.19+)
: 가비지 컬렉터의 스레드가 CPU에서 실행되는 데 소요된 시간입니다.<br />
_필요 사항: .NET Framework(Datadog Agent 7.51+ 및 v3.2+ 포함)/.NET 5+_

**참고**: .NET 10 이전에서는 .NET 런타임에 사용되는 샘플링 알고리즘으로 인해 {{< ui >}}Allocations{{< /ui >}} 및 {{< ui >}}Live Heap{{< /ui >}} 프로파일링을 통해 작은 객체보다 큰 객체가 더 많이 표시될 수 있습니다. Datadog은 통계적으로 더 정확한 결과를 위해 .NET 10 이상을 사용할 것을 권장합니다.


[1]: /ko/profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

프로파일링이 활성화되면 [지원되는 PHP 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

CPU
: 각 함수가 CPU에서 실행되는 데 소요된 시간을 표시합니다.

Allocations(v0.88+)
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 67초) 동안의 각 함수별 할당 수입니다. 스택 할당은 추적되지 않습니다.<br />
_참고: PHP `8.0.0`~`8.1.20` 및 `8.2.0`~`8.2.7`_에서 JIT가 활성화된 경우 사용할 수 없습니다.

Allocated Memory(v0.88+)
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 67초) 동안 각 함수에 의해 할당된 힙 메모리의 양입니다. 스택 할당은 추적되지 않습니다.<br />
_참고: PHP `8.0.0`~`8.1.20` 및 `8.2.0`~`8.2.7`_에서 JIT가 활성화된 경우 사용할 수 없습니다.

Thrown Exceptions(v0.92+)
: 각 메서드에서 발생한 포착되거나 포착되지 않은 예외의 수와 그 유형입니다.

File I/O(미리 보기, v1.7.2+)
: 각 메서드가 파일을 읽고 쓰는 데 소요된 시간과 파일에서 읽고 쓴 바이트 양입니다.

Socket I/O(미리 보기, v1.7.2+)
: 각 메서드가 소켓을 읽고 쓰는 데 소요된 시간과 소켓에서 읽고 쓴 바이트 양입니다.

[1]: /ko/profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

프로파일링이 활성화되면 [지원되는 언어 및 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

CPU
: 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.

Allocations
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 59초) 동안의 각 함수별 할당 수입니다. 스택 할당은 추적되지 않습니다.

Allocated Memory
: 이후에 해제된 할당을 포함하여 프로파일링 기간(기본값: 59초) 동안 각 함수에 의해 할당된 힙 메모리의 양입니다. 스택 할당은 추적되지 않습니다.

[1]: /ko/profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< programming-lang lang="full_host" >}}

프로파일링이 활성화되면 [지원되는 언어 및 버전][1]에 대해 다음 프로필 유형이 수집됩니다.

CPU Time(eBPF)
: 각 메서드 또는 함수가 CPU에서 실행되는 데 소요된 시간입니다. 멀티스레드 프로그램에서 CPU 시간은 경과 시간보다 클 수 있습니다. 즉, 2개의 스레드가 각각 45초 동안 실행되는 경우 "eBPF CPU Time, 1m 30s per minute"이 표시됩니다.

[1]: /ko/profiler/enabling/full_host/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}




## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}