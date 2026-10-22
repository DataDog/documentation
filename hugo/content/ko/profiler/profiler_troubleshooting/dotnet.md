---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: 문서
  text: 애플리케이션 성능 모니터링(APM) 문제 해결하기
title: .NET 프로파일러 문제 해결하기
type: multi-code-lang
---
## 프로필 검색 페이지에서 누락된 프로필 {#missing-profiles-in-the-profile-search-page}

프로파일러를 설정하였고 프로필 검색 페이지에서 프로필을 확인할 수 없는 경우, 운영 체제에 따라 다음 사항을 확인해 보세요.

{{< tabs >}}

{{% tab "Single Step APM Instrumentation을 사용하는 Linux" %}}

1. Agent가 설치되어 있고 실행 중인지 확인합니다.

2. 프로파일러가 로더 로그에서 로딩되었는지 확인합니다.

   1. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<pid>` 로그 파일을 엽니다.

   2. 끝부분 근처에서 `CorProfiler::Initialize: Continuous Profiler initialized successfully.`를 찾습니다. 해당 메시지가 없으면 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 설정하여 디버그 로그를 활성화합니다.

   3. 애플리케이션을 다시 시작합니다.

   4. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<pid>` 로그 파일을 엽니다.

   5. `#Profiler` 항목을 찾습니다.

   6. 다음 줄을 확인하여 프로파일러 라이브러리가 로딩되었는지 확인합니다.
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

3. 프로필 내보내기 결과를 확인합니다.

   1. 2.2단계에서 디버그 로그가 활성화되지 않은 경우 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 `true`로 설정한 후 다시 시작합니다.

   2. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   3. `libddprof error: Failed to send profile.` 항목을 찾습니다. 이 메시지는 Agent에 연결할 수 없음을 의미합니다. `DD_TRACE_AGENT_URL`이 올바른 Agent URL로 설정되어 있는지 확인합니다. 자세한 내용은 [.NET 프로파일러-구성 활성화][4]를 참조하세요.

   4.  `Failed to send profile` 메시지가 없으면 `The profile was sent. Success?` 항목을 찾습니다.

      다음 메시지는 프로필이 성공적으로 전송되었음을 나타냅니다.
      ```
      true, Http code: 200
      ```

   5. 잘못된 API 키에 대한 403 등의 오류가 발생하면 기타 HTTP 코드를 확인합니다.

4. 누락된 CPU 시간 또는 경과 시간(Wall time) 프로필의 경우에만 스택 워크에 대한 Datadog 신호 핸들러가 교체되지 않았는지 확인합니다.

   1. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   2. 다음 두 메시지를 찾습니다.
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. 이러한 메시지 중 하나가 있으면 애플리케이션 코드나 타사 코드가 Datadog 신호 핸들러 위에 자체 신호 핸들러를 반복적으로 재설치하고 있음을 의미합니다. 추가적인 충돌을 방지하기 위해 CPU 및 Wall time 프로파일러가 비활성화됩니다.

   다음 메시지가 표시될 수 있지만 Datadog 프로파일링에는 영향을 미치지 않습니다. `Profiler signal handler has been replaced. Restoring it.` 이 메시지는 Datadog 신호 핸들러가 재정의되었을 때 다시 설치되었음을 알려주기만 합니다.

5. 다음 환경 변수가 설정되어 있지 않은지 확인합니다.
   - `CORECLR_ENABLE_PROFILING`
   - `CORECLR_PROFILER`
   - `CORECLR_PROFILER_PATH`
   - `LD_PRELOAD` 내 `Datadog.Linux.ApiWrapper.x64.so`를 가리키는 값
   
   이러한 변수가 설정되어 있다면 스크립트나 Dockerfile에서 제거합니다. 그렇지 않으면 이전에 수동으로 설치된 프로파일러 버전이 사용됩니다.

6.  `DD_PROFILING_ENABLED`의 값이 `1` 또는 `Auto`로 설정되어 있는지 확인합니다. `Auto`로 설정된 경우 다음 두 가지 조건이 모두 충족될 때만 프로파일러가 프로필을 생성합니다.
   - 트레이스가 생성되었음
   - 애플리케이션이 30초 이상 실행되었음
다른 값으로 설정되어 있거나 아예 설정되지 않은 경우 프로파일러가 비활성화됩니다.

[4]: /ko/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}
{{% tab "Linux" %}}

1. Agent가 설치되어 있고 실행 중인지 확인합니다.

2. 프로파일러가 로더 로그에서 로딩되었는지 확인합니다.

   1. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<PID>` 로그 파일을 엽니다.

   2. 끝부분 근처에서 `CorProfiler::Initialize: Continuous Profiler initialized successfully.`를 찾습니다. 해당 메시지가 없으면 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 설정하여 디버그 로그를 활성화합니다.

   3. 애플리케이션을 다시 시작합니다.

   4. `/var/log/datadog` 폴더에서 `dotnet-native-loader-dotnet-<pid>` 로그 파일을 엽니다.

   5. `#Profiler` 항목을 찾습니다.

   6. 다음 줄을 확인하여 프로파일러 라이브러리가 로딩되었는지 확인합니다.
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

3.  `DD_PROFILING_ENABLED`의 값이 `1`로 설정되어 있는지 확인합니다. 설정되어 있지 않거나 다른 값으로 설정된 경우 프로파일러가 비활성화됩니다.

4. 프로필 내보내기 결과를 확인합니다.

   1. 2.b 단계에서 디버그 로그가 활성화되지 않은 경우 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 `true`로 설정한 후 다시 시작합니다.

   2. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   3. `libddprof error: Failed to send profile.` 항목을 찾습니다. 이 메시지는 Agent에 연결할 수 없음을 의미합니다. `DD_TRACE_AGENT_URL`이 올바른 Agent URL로 설정되어 있는지 확인합니다. 자세한 내용은 [.NET 프로파일러-구성 활성화][4]를 참조하세요.

   4.  `Failed to send profile` 메시지가 없으면 `The profile was sent. Success?` 항목을 찾습니다.

      다음 메시지는 프로필이 성공적으로 전송되었음을 나타냅니다.
      ```
      true, Http code: 200
      ```

   5. 잘못된 API 키에 대한 403 등의 오류가 발생하면 기타 HTTP 코드를 확인합니다.

5. 누락된 CPU 시간 또는 경과 시간(Wall time) 프로필의 경우에만 스택 워크에 대한 Datadog 신호 핸들러가 교체되지 않았는지 확인합니다.

   1. `/var/log/datadog` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   2. 다음 두 메시지를 찾습니다.
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. 이러한 메시지 중 하나가 있으면 애플리케이션 코드나 타사 코드가 Datadog 신호 핸들러 위에 자체 신호 핸들러를 반복적으로 재설치하고 있음을 의미합니다. 추가적인 충돌을 방지하기 위해 CPU 및 Wall time 프로파일러가 비활성화됩니다.

   다음 메시지가 표시될 수 있지만 Datadog 프로파일링에는 영향을 미치지 않습니다. `Profiler signal handler has been replaced. Restoring it.` 이 메시지는 Datadog 신호 핸들러가 재정의되었을 때 다시 설치되었음을 알려주기만 합니다.

[4]: /ko/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

기본 프로파일러 로그 디렉터리는 `%ProgramData%\Datadog .NET Tracer\logs\`입니다. v2.24 이전에서 기본 디렉터리는 `%ProgramData%\Datadog-APM\logs\DotNet`였습니다.

1. Agent가 설치되어 실행 중이며 Windows Services 패널에서 표시되는지 확인합니다.

2. 프로파일러가 로더 로그에서 로딩되었는지 확인합니다.

   1. 기본 로그 폴더에서 `dotnet-native-loader-<Application Name>-<pid>` 로그 파일을 엽니다.

   2. 끝부분 근처에서 `CorProfiler::Initialize: Continuous Profiler initialized successfully.`를 찾습니다. `initialized successfully` 메시지가 없으면 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 설정하여 디버그 로그를 활성화합니다.

   3. 애플리케이션을 다시 시작합니다.

   4. 기본 로그 폴더에서 `dotnet-native-loader-<Application Name>-<pid>` 로그 파일을 엽니다.

   5. `#Profiler` 항목을 찾습니다.

   6. 다음 줄을 확인하여 프로파일러 라이브러리가 로딩되었는지 확인합니다.
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

3.  `DD_PROFILING_ENABLED`의 값이 `1`로 설정되어 있는지 확인합니다. 설정되어 있지 않거나 다른 값으로 설정된 경우 프로파일러가 비활성화됩니다.

4. 프로필 내보내기 결과를 확인합니다.

   1. 2.b 단계에서 디버그 로그가 활성화되지 않은 경우 애플리케이션에 대해 `DD_TRACE_DEBUG` 환경 변수를 `true`로 설정한 후 다시 시작합니다.

   2. 기본 로그 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

   3.  `libddprof error: Failed to send profile.` 항목을 찾습니다. 이 메시지는 Agent에 연결할 수 없음을 의미합니다. `DD_TRACE_AGENT_URL`이 올바른 Agent URL로 설정되어 있는지 확인합니다. 자세한 내용은 [.NET 프로파일러-구성 활성화][5]를 참조하세요.

   4.  `Failed to send profile` 메시지가 없으면 `The profile was sent. Success?` 항목을 찾습니다.

      다음 메시지는 프로필이 성공적으로 전송되었음을 나타냅니다.
      ```
      true, Http code: 200
      ```

   5. 잘못된 API 키에 대한 403 등의 오류가 발생하면 기타 HTTP 코드를 확인합니다.

[5]: /ko/profiler/enabling/dotnet/#configuration

{{% /tab %}}

{{< /tabs >}}

또는 [디버그 모드][1]를 켜고 디버그 파일 및 다음 정보를 사용해 [지원 티켓을 엽니다][2].
- 운영 체제 유형 및 버전(예: Windows Server 2019 또는 Ubuntu 20.04)
-  런타임 유형 및 버전(예: .NET Framework 4.8 또는 .NET Core 6.0)
-  애플리케이션 유형(예: IIS에서 실행되는 웹 애플리케이션)


## 프로파일러를 사용해 오버헤드 절감 {#reduce-overhead-when-using-the-profiler}

### 장치 전체에서 프로파일러 활성화 방지 {#avoid-enabling-the-profiler-machine-wide}

[서로 다른 프로필 유형][3]은 애플리케이션당 고정된 CPU 및 메모리 오버헤드를 발생시킵니다. 호스트의 모든 프로세스를 프로파일링하면 총 리소스 사용량이 증가합니다. 모든 플랫폼에서 오버헤드를 줄이려면 할당된 리소스(예: CPU 코어)를 늘리거나 `DD_PROFILING_WALLTIME_ENABLED=0`을 설정하세요.

{{< tabs >}}

{{% tab "Single Step APM Instrumentation을 사용하는 Linux" %}}

여러 프로세스를 프로파일링할 때 오버헤드를 줄이려면 다음 단계를 따르세요.

- 호스트 전체에서 프로파일링을 활성화할 때는 `true` 대신 `DD_PROFILING_ENABLED=auto`를 사용하세요. `auto`를 사용하면 애플리케이션이 30초 이상 실행되고 **동시에** 최소 하나의 트레이스가 생성된 경우에만 프로파일링이 시작됩니다.
- [계측 규칙][6]을 사용하여 SSI를 수신할 프로세스를 제한하세요.
- 특정 프로세스 환경에서 `DD_PROFILING_ENABLED=false`를 설정하여 해당 프로세스의 프로파일링을 제외하세요. 트레이싱은 영향을 받지 않습니다.

[6]: /ko/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules

{{% /tab %}}
{{% tab "Linux" %}}

여러 프로세스를 프로파일링할 때 오버헤드를 줄이려면 다음 단계를 따르세요.

- 프로파일링하려는 애플리케이션의 시작 스크립트나 systemd 유닛에만 프로파일러 환경 변수를 설정하세요. `/etc/environment` 또는 `systemctl set-environment`와 같은 공유 호스트 구성에서는 설정하지 마세요.
- Docker에서는 특정 애플리케이션의 컨테이너 정의(Dockerfile 또는 compose 파일)에 프로파일러 변수를 설정하세요. 관련 없는 서비스에 프로파일러 변수를 내보내는 전사적 기본 이미지나 셸 프로필은 피하세요.

{{% /tab %}}
{{% tab "Windows" %}}

여러 프로세스를 프로파일링할 때 오버헤드를 줄이려면 다음 단계를 따르세요.

- 머신 수준이 아닌 배치 파일에서 환경 변수를 설정하여 특정 애플리케이션만 프로파일링하세요.
- 프로파일링되는 IIS 풀의 개수를 줄이세요(IIS 10 이상에서만 가능).

{{% /tab %}}

{{< /tabs >}}

### Linux Containers {#linux-containers}

정확한 값은 다를 수 있지만 고정 오버헤드 비용으로 인해 작은 컨테이너에서는 프로파일러의 상대적 오버헤드가 상당할 수 있습니다. 이러한 상황을 방지하기 위해 코어가 1개 미만인 컨테이너에서는 프로파일러가 비활성화됩니다. `DD_PROFILING_MIN_CORES_THRESHOLD` 환경 변수를 1보다 작은 값으로 설정하여 단일 코어 임계값을 재정의할 수 있습니다. 예를 들어, 값 `0.5`를 설정하면 프로파일러가 최소 0.5 코어가 있는 컨테이너에서 실행될 수 있습니다. 그러나 이 경우 프로파일러 스레드가 항상 애플리케이션의 스레드를 스캔하기 때문에 유휴 서비스의 경우에도 CPU 소비가 증가합니다. 사용 가능한 코어가 적을수록 CPU 소비가 더 많이 증가합니다.

`DD_PROFILING_WALLTIME_ENABLED=0` 설정으로 경과 시간 프로파일러를 비활성화하면 프로파일러에 의한 CPU 소비가 감소합니다. 이것으로 충분하지 않으면 컨테이너에 사용 가능한 CPU 코어를 늘리세요.

### 프로파일러 비활성화 {#disabling-the-profiler}

애플리케이션 성능 모니터링(APM) 추적은 또한 CLR 프로파일링 API에 의존하므로, .NET 프로필 수집을 중단하지만 계속 .NET 트레이스를 수집하려면 다음 환경 변수를 설정하여 프로파일링만 비활성화합니다.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Linux의 애플리케이션이 처리되지 않아 CPU 및 경과 시간 없음 {#no-cpu-or-wall-time-because-the-application-on-linux-is-hung}

Linux에서 애플리케이션이 중단되거나 그 밖의 이유로 응답하지 않아 더 이상 CPU 시간 또는 경과 시간 샘플을 사용할 수 없는 경우, 다음 단계를 따릅니다.

1. `/var/log/datadog/dotnet` 폴더에서 `DD-DotNet-Profiler-Native-<Application Name>-<pid>` 로그 파일을 엽니다.

2. `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`를 찾습니다. 이 메시지가 없으면 나머지는 적용되지 않습니다.

3. 메시지가 있으면 스택 워킹 메커니즘이 교착 상태일 수 있음을 의미합니다. 문제를 조사하려면 애플리케이션의 모든 스레드에 대한 호출 스택을 덤프합니다. 예를 들어, gdb 디버거로 이렇게 하려면 다음 단계를 따르세요.

   1. gdb를 설치합니다.

   2. 다음 명령을 실행합니다.
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. [Datadog 지원][2]에 결과 출력을 전송합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/troubleshooting/#debugging-and-logging
[2]: /ko/help/
[3]: /ko/profiler/profile_types/?code-lang=dotnet