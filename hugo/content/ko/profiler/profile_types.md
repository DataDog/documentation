---
further_reading:
- link: profiler/enabling
  tag: 설명서
  text: 애플리케이션에 대해 연속 프로파일러 사용
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tags: 블로그
  text: DataDog에 상시 가동 프로덕션 프로파일링 도입
title: 프로파일 유형
---


**Profiles** 탭에서 지정된 언어에 사용할 수 있는 모든 프로파일 유형을 볼 수 있습니다. 언어 및 버전에 따라 프로파일에 대해 수집된 정보가 다릅니다.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof" >}}
{{< programming-lang lang="java" >}}

프로파일링이 활성화되면 [지원되는 Java 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:


CPU
: 각 메서드가 CPU에서 실행되는 데 걸린 시간입니다. 여기에는 JVM에서 실행되는 코드 (예: Java, Kotlin)가 포함되지만  JVM 작업이나 JVM 내에서 호출되는 네이티브 코드는 포함되지 않습니다.

Allocations
: 이후에 해제된 할당량을 포함해 각 메서드에서 수행한 힙 할당 수입니다.

Allocated Memory
: 이후에 해제된 할당량을 포함하여 각 메서드에 의해 할당된 힙 메모리의 양입니다.

Heap Live Objects
: 각 메서드가 힙 메모리에 할당한 개체 중 아직 가비지 수집으로 처리되지 않은 개체 수입니다. 이는 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Java 11_<br />
_최소 버전: 1.17.0_

Heap Live Size
: 각 메서드에 의해 할당된 힙 메모리 중 아직 가비지 수집으로 처리되지 않은 메모리의 양입니다. 이 기능은 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Java 11_<br />
_최소 버전: 1.17.0_

Wall Time in Native Code
: 네이티브 코드에서 소요된 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 메서드가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다. 이 프로파일에는 일반적으로 애플리케이션 코드의 대부분을 차지하는 JVM 바이트코드를 실행하는 데 소요된 시간은 포함되지 않습니다.

Class Load
: 각 메서드에 의해 로드된 클래스 수입니다.

Thrown Exceptions
: 각 메서드에서 발생한 오류 및 예외의 수와 그 유형입니다.

File I/O
: 각 메서드가 파일을 읽고 쓰는 데 걸린 시간입니다.

Lock
: 각 메서드가 잠금을 대기하는 데 걸린 시간입니다.

Socket I/O
: 각 메서드가 소켓 I/O를 읽고 쓰는 데 걸린 시간입니다.

[1]: /ko/profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

프로파일링이 실행되면 [Python 버전][1]에 따라 다음 프로파일 유형이 수집됩니다:


Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.<br />
_필요 사항: Python 2.7+_

Lock Wait Time
: 각 함수가 잠금을 대기하는 데 걸린 시간입니다.<br />
_필요 사항: Python 2.7+_

Locked Time
: 각 함수가 잠금을 유지하는 데 걸린 시간입니다.<br />
_필요 사항: Python 2.7+_

Lock Acquires
: 각 함수가 잠금을 획득한 횟수입니다.<br />
_필요 사항: Python 2.7+_

Lock Releases
: 각 함수가 잠금을 해제한 횟수입니다.<br />
_필요 사항: Python 2.7+_

CPU
: Python 및 네이티브 코드를 포함하여 각 함수가 CPU에서 실행되는 데 걸린 시간입니다.<br />
_필요 사항: Python 2.7+, POSIX 플랫폼_

Heap Live Size
: 각 함수에 의해 할당된 힙 메모리 중 아직 가비지 수집으로 처리되지 않은 메모리 양입니다. 이 기능은 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.<br />
_필요 사항: Python 3.5+_

Allocated Memory
: 이후에 해제된 할당량을 포함하여 각 함수에 의해 할당된 힙 메모리의 양입니다.<br />
_필요 사항: Python 3.5+_

Allocations
: 이후에 해제된 할당량을 포함하여 각 함수에서 수행한 힙 할당 수입니다.<br />
_필요 사항: Python 3.5+_

Thrown Exceptions
: 각 함수에 의해 제기된 탐지되거나 탐지되지 않은 예외의 수와 그 유형입니다.<br />
_필요 사항: Python 3.7+, POSIX 플랫폼_


[1]: /ko/profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

프로파일링을 실행하면 지원되는 [Go 버전][3]에 대해 다음 프로파일 유형이 수집됩니다:


CPU Time
: CPU에서 각 함수가 실행되는 데 소요된 시간입니다. 네트워킹, 채널, 뮤텍스 및 절전 대기와 같은  Off-CPU 시간은 이 프로파일에 캡처되지 않습니다. 뮤텍스 및 블록 프로파일을 확인하세요.

Allocations
: 프로파일링 기간(기본값: 60초) 동안 힙 메모리에서 각 함수에 의해 할당된 개체 수이며 이후에 해제된 할당량도 포함됩니다. Go는 `alloc_objects`를 호출하며, 스택 할당량은 추적되지 않습니다. 이는 가비지 수집 부하를 조사하는 데 유용합니다. 이 측정값이 [Delta 프로파일](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대해 참고 사항을 확인하세요.

Allocated Memory
: 프로파일링 기간(기본값: 60초) 동안 각 함수에서 할당한 힙 메모리 양입니다. 여기에는 나중에 해제된 할당량도 포함됩니다. Go는 `alloc_space`를 호출하며, 스택 할당량은 추적되지 않습니다. 이는 가비지 수집 부하를 조사하는 데 유용합니다. 이 측정값이 [Delta 프로파일](#delta-profiles) `1.33.0` 버전에서 어떻게 변경되는지에 대해 참고 사항을 확인하세요.

Heap Live Objects
: 힙 메모리에서 각 함수에 의해 할당된 개체 중 아직 가비지 수집으로 처리되지 않은 개체 수입니다. Go는 `inuse_objects`를 호출합니다. 이 기능은 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.

Heap Live Size
: 각 함수에 의해 할당된 힙 메모리 중 아직 가비지 수집으로 처리되지 않은 메모리 양입니다.Go는 `inuse_space`를 호출합니다. 이 기능은 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.

Mutex
: 프로파일링 기간(기본값: 60초) 동안 뮤텍스에서 시간 함수가 대기하고 있습니다. 이 프로파일의 스택 트레이스(stack trace)는 뮤텍스에서 차단된 다른 goroutine이 계속 진행되도록 허용한 `Unlock()` 작업을 가리킵니다. 스핀락을 사용하는 짧은 뮤텍스 경합은 이 프로파일에서는 캡처되지 않지만 CPU 프로파일에서는 볼 수 있습니다. 또한 [Delta 프로파일](#delta-profiles) `1.33.0`버전에서 이 측정값이 어떻게 변경되는지에 대해 참고 사항을 확인하세요.

Block
: 프로파일링 기간(기본값: 60초) 동안 뮤텍스 및 채널 작업에서 시간 함수가 대기하고 있습니다. 절전, GC, 네트워크 및 Syscall 작업은 이 프로파일에 캡처되지 않습니다. 차단 작업은 차단이 해제된 후에만 캡처되므로 이 프로파일은 중단된 것으로 보이는 애플리케이션을 디버깅하는 데 사용할 수 없습니다. 뮤텍스 경합의 경우 이 프로파일의 스택 트레이스(stack trace)는 차단된 `Lock()` 작업을 가리킵니다. 이렇게 하면 프로그램이 차단되는 위치를 알 수 있고, 뮤텍스 프로파일은 프로그램의 어떤 부분이 경합을 유발하는지 알 수 있습니다. 자세한 내용은 Datadog의 [Go에서 블록 프로파일링][1] 연구 자료를 참조하세요. 또한 [Delta 프로파일](#delta-profiles) `1.33.0` 버전에서 이 측정값이 어떻게 변경되는지에 대해 참고 사항을 확인하세요. **참고**: 블록 프로파일러는 프로덕션 워크로드에 상당한 오버헤드를 초래할 수 있습니다. 프로덕션에서 사용하는 경우 가급적 높은 속도 (예: 100 밀리초인 `100000000`)를 사용하고, 지연 시간이나 CPU 사용률 증가의 징후가 있는지 확인하세요.

Goroutines
: 현재 동일한 함수 (on-CPU 및 대기 중인 off-CPU)를 실행 중인 goroutines 수의 스냅 샷입니다. 스냅샨 간의 goroutines 증가는 프로그램에서 goroutines가 누출되었음을 나타냅니다. 대부분의 정상적인 애플리케이션에서 이 프로파일은 작업자 풀과 goroutines 사용 수에 의해 지배됩니다. 지연의 영향을 받기 쉽고 대량의 goroutines (10.000개 이상)을 사용하는 애플리케이션에서 이 프로파일을 사용하려면 stop-the-world 일시 중지가 필요합니다. 일시 중지는 모든 프로파일링 기간 (기본값 60초) 동안에 한 번만 발생하며, 일반적으로 goroutine 당 약 `1μsec` 동안 지속됩니다. p99 지연 시간 SLO가 약 `100ms`인 애플리케이션은 일반적으로 이 경고를 무시할 수 있습니다. 자세한 내용은 Datadog의 [Go에서의 Goroutine 프로파일링][2] 연구 자료를 참조하세요.

#### 델타 프로파일
<div class="alert alert-info"><strong>참고</strong>: Go 프로파일러<code> 1.33.0 </code>이전 버전에서는 <em>프로파일링 기간 동안</em>이 아닌 <em>프로세스가 시작된 이후 누적된</em> 측정값으로 Allocations, Allocated Memory, Mutex, 및 Block 메트릭이 표시됩니다. 변경된 버전 <code>1.33.0</code>의 델타 프로파일에서는 누적되지 않고 변하는 값을 확인할 수 있습니다. 델타 프로파일링은 기본적으로 설정되어 있습니다. 프로파일러 버전 <code>1.35.0</code>을 사용하면<code> WithDeltaProfiles</code> 옵션을 사용하여 델타 프로파일을 사용하지 않도록 설정할 수 있습니다.<br/><br/> 프로파일러 버전 <code>1.37.0</code>부터는 업로드 대역폭 사용량을 줄이기 위해 델타 프로파일링 사용 시 누적된 프로파일이 더 이상 업로드되지 않습니다. 누적된 전체 프로파일이 반드시 필요한 경우 <a href="/help/">지원팀에 문의</a>하시기 바랍니다.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /ko/profiler/enabling/go#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

프로파일링을 실행하면 [지원되는 Ruby 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:

CPU
: Ruby 및 네이티브 코드를 포함하여 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.

Wall Time
: 각 함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

[1]: /ko/profiler/enabling/ruby/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

프로파일링을 실행하면 [지원되는 Node.js 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:

벽 시간
: 각 기능/함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 기능/함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

Heap Live Size
: 가각 함수에 의해 할당된 힙 메모리의 양 중 가비지 수집으로 처리되지 않은 메모리 양입니다. 이 함수는 서비스의 전체 메모리 사용량을 조사하고 잠재적인 메모리 누수를 식별하는 데 유용합니다.

[1]: /ko/profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

프로파일링을 실행하면 [지원되는 .NET 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:

Wall Time
: 관리되는 메서드에서 소요된 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 메서드가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

CPU(v2.15+)
: 각 메서드가 CPU에서 실행되는 데 걸린 시간입니다.

Thrown Exceptions (v2.31+)
: 각 메서드에 의해 제기된 탐지되거나 탐지되지 않은 예외의 수와 그 유형 및 메시지입니다.

Allocations (beta, v2.18+)
: 각 메서드별로 할당된 개체의 수와 크기 및 개체 유형입니다.<br />
_필요 사항: .NET 6+_

Lock (v2.31+)
: 스레드가 잠금을 대기하는 횟수와 시간입니다.<br />
_필요 사항: .NET 5+_

Live Heap (beta, v2.22+)
: 할당된 개체 (클래스 이름 포함) 중 메모리에 남아 있는 하위 집합입니다.<br />
_필요 사항: .NET 7+_

[1]: /ko/profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

프로파일링이 활성화되면 [지원되는 PHP 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:

벽 시간
: 각 기능/함수가 사용한 경과 시간입니다. 경과 시간에는 CPU에서 코드가 실행 중이거나 I/O를 기다리는 시간 및 기능/함수가 실행되는 동안 발생하는 기타 모든 시간이 포함됩니다.

CPU
: 각 함수가 CPU에서 실행되는 데 소요된 시간을 표시합니다.

Allocations (v0.88+)
: 프로파일링 기간 (기본값: 67초) 동안 각 함수별 할당 횟수 (이후 해제된 할당 포함)입니다. 스택 할당은 추적되지 않습니다.<br />
_참고: JIT가 활성화된 경우 사용할 수 없습니다._


Allocated memory (v0.88+)
: 프로파일링 기간(기본값: 67초) 동안 각 함수에 할당된 힙 메모리의 양(이후 해제된 할당량 포함)입니다. 스택 할당은 추적되지 않습니다.<br />
_참고: JIT가 활성화된 경우 사용할 수 없습니다._

[1]: /ko/profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

프로파일링을 실행하면 [지원되는 언어 및 버전][1]에 대해 다음 프로파일 유형이 수집됩니다:

CPU
: 각 함수가 CPU에서 실행되는 데 소요된 시간입니다.

Allocations
: 프로파일링 기간 (기본값: 59초) 동안 각 함수별 할당 수이며, 이후에 해제된 할당량도 포함합니다. 스택 할당량이 추적되지 않습니다.

Allocated memory
: 프로파일링 기간 (기본값: 59초) 동안 각 함수에 의해 할당된 힙 메모리의 양이며, 이후에 해제된 할당량도 포함됩니다. 스택 할당량이 추적되지 않습니다.

[1]: /ko/profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}