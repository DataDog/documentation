---
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: /tracing/troubleshooting
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 트러블슈팅
title: 컴파일된 언어에 대한 네이티브 프로파일러 트러블슈팅
type: multi-code-lang
---

<div class="alert alert-warning">
<code>ddprof</code>는 베타 버전입니다. Datadog에서는 프로덕션에 배포하기 전 민감하지 않은 환경에서 프로파일러를 평가할 것을 권장합니다.
</div>

## 프로필 검색 페이지에서 누락된 프로필

프로파일러를 설정했고 프로파일 검색 페이지에서 프로파일을 확인할 수 없는 경우 verbose 로깅(`-l debug`)을 켜고 [지원 티켓을 엽니다][1]. 지원 티켓에서 다음 정보와 함께 로그 파일을 포함합니다.

- Linux 커널 버전(`uname -r`)
- libc 버전(`ldd --version`)
- `/proc/sys/kernel/perf_event_paranoid` 값
- 프로파일러와 애플리케이션 인수를 포함해 명령줄을 완료합니다.

아래 섹션은 잠재적은 설정 문제를 보여줍니다.

### "\<ERROR\> Error calling perfopen on watcher"

이 오류는 프로파일러를 사용할 수 있는 충분한 권한이 없을 때 일반적으로 발생합니다. 가장 흔한 원인은 필수 운영 체제 기능이 비활성화되었기 때문입니다. 이 경우 프로파일링이 실패합니다. 일반적으로 호스트 수준 설정으로, 개별 포드나 컨테이너 수준에서 설정할 수 없습니다.

분포에 따라 재시작 동안 지속될 수 있도록 `perf_event_paranoid`를 설정합니다. 진단 단계에서 다음을 따릅니다.

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid
```

**참고**: `/proc/sys/kernel/perf_event_paranoid` 개체가 존재하고 작성 가능한 마운트 네임스페이스에서 실행되어야 합니다. 컨테이너 내에서 이 설정은 호스트에서 상속됩니다.

두 가지 기능을 `perf_event_paranoid` 값을 덮어쓰는 데 사용할 수 있습니다.
- `CAP_SYS_ADMIN`: 많은 권한을 추가합니다. 그러므로 권장되지 않을 수 있습니다.
- `CAP_PERFMON`: BPF 및 `perf_event_open` 기능을 추가합니다(Linux v5.8 이상에서 사용 가능).

몇몇 덜 일반적인 권한 문제는 다음과 같습니다.
- 프로파일러가 `perf_event_open()` syscall에 의존하며 이는 일부 컨테이너 런타임에서 허용되지 않습니다. 적합한 설명서를 확인해 이것이 원인인지 확인하세요.
- 일부 seccomp 프로파일은 `perf_event_open()`을 금지합니다. 시스템이 그러한 설정을 실행하는 경우 프로파일러를 실행하지 못할 수 있습니다.

### "\<ERROR\> Could not mmap memory for watcher

프로파일러를 운영하려면 고정된 메모리가 필요합니다. 이러한 유형의 메모리는 커널 설정의 제약을 받습니다. `ulimit -l`를 사용해 현재 설정을 확인할 수 있습니다. 이러한 제한을 우회하는 데 다음 기능을 사용할 수 있습니다.
- `CAP_IPC_LOCK`: 잠긴 메모리 사용을 허용합니다(호출 예외 메모리).

### "\<WARNING\> Could not finalize watcher"

시스템에서 프로파일러에 충분한 잠긴 메모리를 할당할 수 없을 때 이 경고가 나타납니다. 가장 일반적으로 제공된 호스트에서 활성 상태의 프로파일러 인스턴스가 너무 많을 경우 발생합니다. 많은 컨테이너화된 서비스는 동일한 호스트에서 개별적으로 계측되기 때문입니다. `mlock()` 메모리 제한을 늘리거나 계측된 애플리케이션 수를 줄여 이 문제를 해결할 수 있습니다. 

다른 프로파일링 도구가 동일한 제한에 기여할 수 있습니다.

### "\<WARNING\> Failure to establish connection"

이 오류는 보통 프로파일러가 Datadog 에이전트에 연결할 수 없음을 나타냅니다. 설정 로깅(`--show_config`) to identify the hostname and port number used by the profiler for uploads. Additionally, the content of the error message may relay the hostname and port used. Compare these values to your Agent configuration. Check the profiler's help section (`ddprof --help`)을 활성화하여 에이전트의 URL 설정 방법에 대해 자세히 알아보세요.

## 프로파일이 비어 있거나 희소함

프로파일 루트가 애플리케이션 바이너리로 주석이 달린 프레임입니다. 이 프레임에서 상당한 CPU 시간을 표시하지만 하위 프레임이 없는 경우 다음을 고려합니다.
- 스트립트 바이너리에는 사용 가능한 기호가 없습니다. 넌스트립트 바이너리를 사용해보거나 비축소 컨테이너 이미지를 사용해 보세요.
- 특정 애플리케이션과 바이너리는 설치된 디버그 패키지의 도움을 받을 수 있습니다. 리포지토리의 패키지 관리자 등을 통해 설치된 서비스도 마찬가지입니다.

기능 이름 대신 `Anonymous`이 보이면 번역된 또는 JIT된 언어를 사용하고 있을 수 있습니다. perf 맵이나 JIT 덤프 정보 활성화를 고려해 보세요.

프로파일이 비어있거나("보고된 CPU 시간 없음) 프레임이 거의 없습니다. 애플리케이션이 동일한 로드 하에 있는지 확인해 보세요. 프로파일러는 계측된 애플리케이션이 해당 CPU에서 예약된 경우에만 활성화됩니다.

## 공유 라이브러리 로딩 오류

다이내믹 라이브러리처럼 컴파일된 언어로 지속적 프로파일러를 사용하는 경우 애플리케이션 시작 시 다음 오류가 발생할 수 있습니다.

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

애플리케이션이 `libdd_profiling.so`를 종속성으로 빌드된 경우 발생합니다. 하지만 해당 항목은 종속성 조정 동안 가동 시간에서 찾을 수 없습니다. 다음 중 하나를 수행해 이 문제를 해결할 수 있습니다. 

- 고정 라이브러리를 사용해 애플리케이션을 다시 빌드합니다. 일부 빌드 시스템에서는 다이내믹 라이브러리와 고정 라이브러리 사이에서 선택하는 것이 어려울 수 있습니다. 그러므로 `ldd`를 사용해 결과 바이너리가 원치 않는 `libdd_profiling.so` 종속성을 포함하는지 확인합니다.
- `libdd_profiling.so`를 다이내믹 링커의 검색 경로에 있는 디렉터리 중 하나에 복사합니다. 대부분의 Linux 시스템에서 `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n`를 실행하여 이러한 디렉터리 목록을 얻을 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/