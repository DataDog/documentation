---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 트러블슈팅
title: .NET 프로파일러 트러블슈팅
type: multi-code-lang
---

## 프로필 검색 페이지에서 누락된 프로필

프로파일러를 설정하였고 프로파일 검색 페이지에서 프로파일을 확인할 수 없는 경우, 운영 체제에 따라 다음 사항을 확인해 보세요.

{{< tabs >}}

{{% tab "Linux" %}}

1. 에이전트가 설치되어 있고 실행되는지 확인합니다.

2. 프로파일러가 로더 로그에서 로딩되었는지 확인합니다.

   1. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<pid>` 로그 파일을 엽니다.

   2. 끝 부분 근처에서 `CorProfiler::Initialize: Continuous Profiler initialized successfully.`를 찾습니다, 메시지가 표시되지 않으면 애플리케이션에 대한 `DD_TRACE_DEBUG` 환경 변수를 설정하여 디버그 로그를 활성화합니다.

   3. 애플리케이션을 다시 시작합니다.

   4. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<pid>` 로그 파일을 엽니다.

   5. `#Profiler` 입력 항목을 찾습니다.

   6. 다음 줄을 확인하여 프로파일러 라이브러리가 로딩되도록 합니다.
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=/opt/datadog/linux-x64/./Datadog.Tracer.Native.so]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: /opt/datadog/linux-x64/./Datadog.Tracer.Native.so
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. 프로파일 내보내기 결과를 확인합니다.

   1. 2.2단계에서 디버그 로그가 활성화되지 않은 경우 애플리케이션에서 `DD_TRACE_DEBUG` 환경 변수를 `true`로 설정한 다음 다시 시작합니다.

   2. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다. 

   3. `libddprof error: Failed to send profile.` 입력 항목을 찾습니다. 이 메시지는 에이전트에 연결할 수 없음을 의미합니다. `DD_TRACE_AGENT_URL`이 올바른 에이전트 URL로 설정되어 있는지 확인합니다. 자세한 정보는 [.NET 프로파일러 설정]을 참조하세요.

   4. `Failed to send profile` 메시지가 보이지 않으면 `The profile was sent. Success?` 입력 항목을 찾습니다.

      다음 메시지는 프로파일이 성공적으로 전송되었음을 나타냅니다.
      ```
      true, Http code: 200
      ```

   5. 잘못된 API 키에 대한 403 등의 오류가 발생하면 기타 HTTP 코드를 확인합니다.

4. 누락된 CPU 시간 또는 경과 시간(Wall time) 프로파일의 경우에만 스택 워크에 대한 Datadog 신호 핸들러가 교체되지 않았는지 확인합니다. 

   1. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다. 

   2. 다음 두 메시지를 찾습니다.
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. 이러한 메시지 중 하나가 표시되면 애플리케이션 코드 또는 타사 코드가 Datadog 신호 핸들러 대신 자체적인 신호 핸들러를 반복적으로 재설치하고 있음을 의미합니다. 이러한 충돌을 피하려면 CPU 및 경과 시간 프로파일러가 비활성화해야 합니다.

   다음 메시지가 표시될 수 있지만 Datadog 프로파일링에는 영향을 미치지 않으니 참고하세요. `Profiler signal handler has been replaced. Restoring it.` 이 메시지는 Datadog 신호 핸들러가 재정의되었을 때 다시 설치되었음을 알려주는 역할만 합니다.

[1]: /ko/profiler/enabling/dotnet/?tab=linux#configuration

{{< /tabs >}}

{{% tab "Windows" %}}

기본 프로파일러 로그 디렉터리는 `%ProgramData%\Datadog .NET Tracer\logs\`. Prior to v2.24이며 기본 디렉터리는 `%ProgramData%\Datadog-APM\logs\DotNet`입니다.

1. 에이전트가 설치되어 실행 중이며 윈도우즈(Windows) 서비스 패널에서 표시되는지 확인합니다.

2. 프로파일러가 로더 로그에서 로딩되었는지 확인합니다.

   1. 기본 로그 폴더에서 `dotnet-native-loader-<Application Name>-<pid>` 로그 파일을 엽니다.

   2. 끝 부분 근처에서 `CorProfiler::Initialize: Continuous Profiler initialized successfully.`를 찾습니다. `initialized successfully` 메시지가 표시되지 않으면 애플리케이션에서 `DD_TRACE_DEBUG` 환경 변수를 설정하여 디버그 로그를 활성화합니다.

   3. 애플리케이션을 다시 시작합니다.

   4. 기본 로그 폴더에서 `dotnet-native-loader-<Application Name>-<pid>` 로그 파일을 엽니다.

   5. `#Profiler` 입력 항목을 찾습니다.

   6. 다음 줄을 확인하여 프로파일러 라이브러리가 로딩되도록 합니다.
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. 프로파일 내보내기 결과를 확인합니다.

   1. 2.2단계에서 디버그 로그가 활성화되지 않은 경우 애플리케이션에서 `DD_TRACE_DEBUG` 환경 변수를 `true`로 설정한 다음 다시 시작합니다.

   2. 기본 로그 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   3. `libddprof error: Failed to send profile.` 입력 항목을 찾습니다. 이 메시지는 에이전트에 연결할 수 없음을 나타냅니다. `DD_TRACE_AGENT_URL`은 올바른 에이전트 URL로 설정되었는지 확인합니다. 자세한 정보는 [.NET 프로파일러-설정][1]을 참조하세요.

   4. `Failed to send profile` 메시지가 보이지 않으면 `The profile was sent. Success?` 입력 항목을 찾습니다.

      다음 메시지는 프로파일이 성공적으로 전송되었음을 나타냅니다.
      ```
      true, Http code: 200
      ```

   5. 잘못된 API 키에 대한 403 등의 오류가 발생하면 기타 HTTP 코드를 확인합니다.

[1]: /ko/profiler/enabling/dotnet/?tab=linux#configuration

{{< /tabs >}}

{{< /tabs >}}

또는 [디버그 모드][1]를 켜고 디버그 파일 및 다음 정보를 사용해 [지원 티켓을 엽니다][2].
- 운영 체제 유형 및 버전(예: 윈도우즈 서버 2019(Windows Server 2019) 또는 우분투(Ubuntu) 20.04)
- 런타임 유형 및 버전(예: NET Framework 4.8 또는 .NET Core 6.0)
- 애플리케이션 유형(예: IIS에서 실행되는 웹 애플리케이션)


## 프로파일러를 사용해 오버헤드 절감

[각기 다른 프로파일 유형][3]에는 고정 CPU 및 메모리 오버헤드가 있으므로 *애플리케이션이 더 많을 수록 오버헤드가 높아집니다.*

### 기기 전체에서 프로파일러 활성화 방지

Datadog는 모든 IIS 애플리케이션 풀에 대해 기기 수준에서 프로파일러를 활성화하는 것을 권장하지 않습니다. 프로파일러가 사용하는 리소스 양을 줄이려면 다음을 수행하세요.
- CPU 코어 증가 등 할당된 리소스를 늘립니다.
- 직접 애플리케이션을 실행하는 대신 배치 파일로 환경을 설정하여 특정 애플리케이션만 프로파일링합니다.
- 프로파일링되는 IIS 풀의 개수를 줄입니다(IIS 10 이상에서만 가능).
- `DD_PROFILING_WALLTIME_ENABLED=0` 설정을 사용해 경과 시간 프로파일링을 비활성화합니다.

### Linux 컨테이너

실제 값은 달라질 수 있으나 고정 오버헤드 비용은 프로파일러의 상대적 오버헤드가 매우 소규모 컨테이너에서 중요할 수 있음을 의미합니다. 이러한 상황을 방지하기 위해 1개 미만의 코어에서 컨테이너가 비활성화되어 있습니다. `DD_PROFILING_MIN_CORES_THRESHOLD` 환경 변수를 1 미만의 값으로 설정하여 단일 코어 임계값을 재정의할 수 있습니다. 예를 들어 `0.5` 값을 통해 프로파일러를 최소 0.5개 코어가 있는 컨테이너에서 실행할 수 있습니다.
하지만 해당 경우, 유휴 서비스에 대해서도 CPU 사용량이 증가하게 됩니다. 프로파일러 스레드가 항상 애플리케이션 스레드를 검사하기 때문입니다. 사용 가능한 코어가 적을 수록 CPU 사용량이 증가하게 됩니다.

`DD_PROFILING_WALLTIME_ENABLED=0`를 설정하여 경과 시간 프로파일러를 비활성화하면 CPU 사용량이 줄어듭니다. 이것으로 충분하지 않으면 컨테이너에서 사용 가능한 CPU 코어를 늘리세요.

### 프로파일러 비활성화하기

애플리케이션 성능 모니터링(APM) 추적은 또한 CLR 프로파일링 API에 의존하므로, .NET 프로파일 수집을 중단하지만 계속 .NET 트레이스를 수집하려면 다음 환경 변수를 설정하여 프로파일링만 비활성화합니다.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Linux의 애플리케이션이 처리되지 않아 CPU 및 경과 시간 없음

Linux에서 애플리케이션이 처리되지 않거나 달리 응답하지 않아 더 이상 CPU 시간 또는 경과 시간 샘플을 사용할 수 없는 경우, 다음 단계를 따릅니다.

1. `/var/log/datadog/dotnet` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

2. `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`를 찾습니다. 이 메시지가 표시되지 않으면 나머지 항목을 적용할 수 없습니다.

3. 메시지가 표시되면 스택 워킹 메커니즘이 데드락 상태일 수 있음을 의미합니다. 문제를 조사하려면 애플리케이션에 있는 모든 스레드의 콜 스택을 제거합니다. 예를 들어 gdb 디버거를 사용해 이를 수행합니다.

   1. gdb를 설치합니다.

   2. 다음 명령을 실행합니다:
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. [Datadog 지원][2]에 결과 출력을 전송합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/troubleshooting/#tracer-debug-logs
[2]: /ko/help/
[3]: /ko/profiler/profile_types/?code-lang=dotnet