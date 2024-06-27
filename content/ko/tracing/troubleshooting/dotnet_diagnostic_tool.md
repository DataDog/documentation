---
kind: 설명서
title: .NET 진단 도구를 사용하여 트러블슈팅하기
---

.NET 트레이서를 설치한 후에도 애플리케이션이 트레이스를 생성하지 않는 경우, 본 페이지에서 설명하는 진단 도구 `dd-dotnet`을 실행하여 기본적인 트러블슈팅을 할 수 있습니다. 누락된 환경 변수, 불완전 설치 또는 연결할 수 없는 에이전트 등의 설정 문제를 확인하도록 도와드립니다.

진단 도구 `dd-dotnet`는 2.42.0 버전부터 추적 라이브러리와 함께 번들로 제공됩니다. 추적 라이브러리 설치 폴더에서 확인할 수 있으며, 시스템 `PATH`에 자동으로 추가되어 어디서든 호출할 수 있습니다.

## `dd-trace` 설치

**본 섹션은 2.42.0. 이전 버전 트레이서에 적용됩니다.**

트레이서 이전 버전에는 `dd-dotnet` 도구가 포함되어 있지 않습니다. 대신 `dd-trace` 도구를 설치할 수 있습니다. 해당 도구의 기능과 구문은 `dd-dotnet`과 비슷합니다.

다음 방법 중 하나로 `dd-trace`를 설치합니다.

- 명령을 실행하여 .NET SDK 사용
   ```
   dotnet tool install -g dd-trace
   ```
- 적합한 버전 다운로드:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]

- 또는 [GitHub 릴리스 페이지][4]에서 다운로드하세요.

다음 섹션에서 명령을 호출할 때는 `dd-dotnet`을 `dd-trace`로 교체해야 합니다.

## 프로세스 진단

애플리케이션 대부분의 경우 프로세스 진단을 활용하여 문제점을 찾을 수 있습니다.

1. 애플리케이션이 실행 중인지 확인하고 프로세스 ID(pid)를 받습니다. 

   윈도우즈(Windows) 프로세스의 pid를 받으려면 작업 관리자를 연 다음 **세부정보** 탭에서 PID 컬럼을 찾습니다. `tasklist /FI "IMAGENAME eq target.exe"` 명령을 실행할 수도 있습니다. 여기서 `target.exe`는 프로세스 이름입니다.

   Linux에서 프로세스 pid를 받으려면 `ps aux | grep target` 명령을 실행합니다. 여기서 `target`은 프로세스 이름입니다. pid는 도커(Docker) 컨테이너에서 실행되는 경우 일반적으로 `1`입니다.

2. 다음과 같이 pid를 dd-dotnet 툴로 전달합니다.
   ```
   dd-dotnet check process <pid>
   ```
   본 작업은 기본 설정 점검을 실행하고 문제가 발견되면 권고 사항을 출력합니다.

오류가 없는 경우의 출력 예시입니다.
```bash
$ dd-dotnet check process 35888

Running checks on process 35888
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\..' and the
directory was found correctly.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_32 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_64 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable CORECLR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: No issue found with the target process.
```

오류가 발생한 경우의 출력 예시입니다.
```bash
$ dd-dotnet check process 4464

Running checks on process 4464
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [WARNING]: The native loader library is not loaded into the process
 [WARNING]: The native tracer library is not loaded into the process
 [WARNING]: Tracer is not loaded into the process
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [WARNING]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' but the directory does not exist.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_32 is set to C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_64 is set to C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [FAILURE]: The environment variable CORECLR_ENABLE_PROFILING should be set to '1' (current value: not set)
6. Checking if process tracing configuration matches Installer or Bundler:
Installer/MSI related documentation:
https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#install-the-tracer
 [FAILURE]: Unable to find Datadog .NET Tracer program, make sure the tracer has been properly installed with the MSI.
 [WARNING]: The registry key SOFTWARE\Classes\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is missing. If
using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 [WARNING]: The registry key SOFTWARE\Classes\Wow6432Node\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is
missing. If using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 ```


## IIS 진단

IIS 애플리케이션의 경우 다음 명령을 사용하여 보다 자세하게 진단할 수 있습니다. 여기서 `<FULL SITE NAME>`은 IIS의 사이트 이름으로, 다음과 같이 IIS의 사이트 이름 뒤에 애플리케이션 이름이 옵니다.

```
dd-dotnet check iis "<FULL SITE NAME>"
```

IIS에서는 애플리케이션 풀이 천천히 실행되므로 명령을 실행하기 전에 사이트가 요청을 하나 이상 수신했는지 확인하세요.

**이름에 공백이 있는 경우 꼭 따옴표 처리해 주어야 합니다.**

예를 들어, 하단 애플리케이션의 전체 사이트 이름은 `Default Web Site/WebApplication1`입니다.

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS 관리자">}}

본 애플리케이션에서 IIS 진단을 실행하는 명령입니다.
```
dd-dotnet check iis "Default Web Site/WebApplication1"
```

사이트의 루트 애플리케이션을 계측하려면 다음을 실행하세요.
```
dd-dotnet check iis "Default Web Site"
```

본 `check iis` 명령은 진단 프로세스를 포함합니다. 기본 설정 점검을 실행하고 문제가 발견되면 권고 사항을 출력합니다.

오류가 없는 경우의 출력 예시입니다.
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 39852

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
Found Datadog.Trace version 2.42.0.0 in the GAC
 [SUCCESS]: No issue found with the IIS site.
```

오류가 발생한 경우의 출력 예시입니다.
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 35152

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [FAILURE]: The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed
with the MSI.
```

## 에이전트 연결 진단하기

특정 애플리케이션에 관해 점검을 실행하지 않고 에이전트 연결만 테스트하려는 경우 다음을 실행하세요.
```
dd-dotnet check agent <url>
```

본 명령은 에이전트에 요청을 보내고 오류를 찾아냅니다. 옵션 `url` 파라미터가 생략된 경우 에이전트 의 위치는 환경 변수로 결정됩니다. 지원하는 프로토콜은 `http://` 또는 `unix://`(도메인 소켓의 경우)입니다.

오류가 없는 경우의 출력 예시입니다.
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: Connected successfully to the Agent.
```

오류가 발생한 경우의 출력 예시입니다.
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
 [FAILURE]: Error connecting to Agent at http://127.0.0.1:8126/: System.Net.Http.HttpRequestException: No connection
could be made because the target machine actively refused it. (127.0.0.1:8126)
```

에이전트 연결 문제에 대한 자세한 내용을 확인하려면 [연결 오류][5] 항목을 참조하세요.


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /ko/tracing/troubleshooting/connection_errors/?code-lang=dotnet#