---
description: Single Step Instrumentation에서 인젝터가 어떻게 작동하여 수동 구성 없이 런타임에 애플리케이션을 자동으로
  계측하는지 알아보세요.
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: 설명서
  text: 단일 단계 APM 계측
title: 단일 단계 계측 시의 인젝터 동작 이해
---
## 개요 {#overview}

인젝터는 런타임에 애플리케이션을 자동으로 계측하는 공유 라이브러리입니다. [단일 단계 계측][1]을 사용하면 인젝터가 환경 설정 및 추적기 초기화를 자동화하므로 수동 구성이 필요하지 않습니다.

## 인젝터가 로드되는 방식 {#how-the-injector-is-loaded}

### Linux {#linux}

Linux 시스템에서, 인젝터는 UNIX 계열 환경의 동적 연결 기능인 `LD_PRELOAD` 메커니즘을 사용하여 모든 동적 연결 프로세스에 자체적으로 로드됩니다. 인젝터 로드 방식은 두 가지입니다.
- 명시적으로, `LD_PRELOAD` 환경 변수를 설정하여 로드됩니다.
- 묵시적으로, 시스템 전체의 `/etc/ld.so.preload` 파일을 수정하여 로드됩니다.

### Docker {#docker}

Docker 환경에서, 인젝터는 Linux 호스트에서 사용하는 것과 동일한 `LD_PRELOAD` 메커니즘을 사용하여 런타임에 애플리케이션 프로세스로 로드됩니다. 그래서 애플리케이션이 시작되기 전에 추적 로직을 초기화하고 환경 변수를 수정할 수 있습니다.

이를 활성화하기 위해 Datadog은 Docker의 기본 컨테이너 런타임을 대체하는 사용자 지정 `runc` 심(shim)을 제공합니다. 심은 다음과 같은 역할을 합니다.
1. 공유 라이브러리(인젝터)를 컨테이너에 인젝션합니다.
1. `LD_PRELOAD` 환경 변수를 설정하여 인젝터가 컨테이너 내부의 모든 동적 연결 프로세스에 로드되게 합니다.

### Kubernetes {#kubernetes}

Kubernetes 환경에서는 변형 승인 웹훅(mutating admission webhook)을 사용하는 Datadog Admission Controller가 인젝션을 담당합니다. 포드가 예약되면 컨트롤러는 다음 작업을 수행합니다.

1. 구성된 선택기(네임스페이스, 레이블 또는 특정 포드 속성 등)를 기반으로 포드를 계측해야 하는지 평가합니다.
1. 포드 사양을 다음과 같이 변형합니다.
   - init 컨테이너 또는 Datadog CSI 드라이버를 사용하여 인젝터와 SDK 전달
   - 환경 변수(`LD_PRELOAD` 등) 설정
   - 인젝션된 라이브러리를 유지하기 위해 볼륨 마운트

기본적으로 SSI는 클러스터에 가장 적합한 전달 방법을 선택합니다. [인젝션 모드][2]를 명시적으로 선택할 수도 있습니다.

### Windows {#windows}

Windows에서 인젝터는 DLL로 전달됩니다. Datadog 커널 드라이버는 인젝터 DLL을 모든 신규 프로세스에 로드하며, DLL의 `DllMain` 함수가 애플리케이션의 엔트리 포인트보다 먼저 실행됩니다. 로드된 인젝터는 [인젝터 동작](#injector-behavior)에 설명된 것과 동일한 흐름을 따릅니다. Windows는 Java와 .NET만 지원합니다. Windows의 런타임 감지는 구현 방식이 Linux와 다르지만, 결과적인 계측 동작은 동일합니다.

## 인젝터 동작 {#injector-behavior}

인젝터가 프로세스의 메모리 공간에 로드된 후에는 플랫폼에 관계없이 다음을 수행합니다.
- 애플리케이션의 런타임(Python, Node.js, PHP, Java, .NET, Ruby 또는 NGINX 등)을 감지합니다.
- 프로세스를 계측해야 하는지 평가합니다. 일부 프로세스는 기본적으로 제외됩니다. [Linux][3], [Kubernetes][4] 및 [Windows][5]에서 워크로드별로 인젝션을 허용하거나 거부하도록 계측 규칙을 정의할 수도 있습니다.
- 적절한 트레이서 SDK를 로드하기 위해 환경 변수나 명령줄 인수를 수정합니다.
- 상태를 보고하고 디버깅을 지원하기 위해 텔레메트리를 내보냅니다.

인젝션에 실패하거나 지원되는 런타임이 감지되지 않으면 애플리케이션은 계측 없이 계속 실행됩니다. 이는 구성에 따라 프로세스가 제외된 경우에도 동일하게 적용됩니다.

**참고**: 인젝터는 SDK가 환경 변수를 평가하기 전에 실행되므로 `DD_TRACE_ENABLED=false` 값을 설정해도 SSI가 SDK를 로드하는 것을 막을 수 없습니다. SSI를 비활성화하거나 제거하려면 사용 중인 플랫폼의 [단일 단계 APM 계측][1] 설정 페이지를 참조하세요.

## 인젝터 수명 주기 {#injector-life-cycle}

인젝터는 애플리케이션의 `main` 함수가 실행되기 전에 작업을 완료합니다. 이는 애플리케이션과 함께 실행되는 백그라운드 프로세스나 스레드가 아닙니다.

인젝터가 필요한 환경 변수나 명령줄 인수를 설정하고 나면 애플리케이션이 정상적으로 진행됩니다. 그 시점부터 프로세스 내의 유일한 Datadog 코드는 애플리케이션이 자체적으로 해당 구성을 사용하여 로드하는 트레이서 SDK입니다.

## 런타임별 계측 {#per-runtime-instrumentation}

인젝터는 애플리케이션 프로세스에 대한 환경 변수를 설정하거나 명령줄 인수를 수정하여 적절한 트레이서 SDK를 로드합니다. 메커니즘은 런타임에 따라 다릅니다.

| 런타임  | 메커니즘 |
|----------|-----------|
| Java     | `JAVA_TOOL_OPTIONS`에 `-javaagent:<path-to-dd-java-agent.jar>` 값을 설정합니다. |
| Python   | `PYTHONPATH`를 트레이서 설치 디렉터리로 설정합니다. |
| Node.js  | `NODE_OPTIONS`에 `--require`(CommonJS) 또는 `--import`(ECMAScript 모듈) 값을 설정합니다. |
| Ruby     | `RUBYOPT`에 `-r <path-to-Datadog-host-inject-script>` 값을 설정합니다. |
| .NET     | .NET CLR 프로파일러 환경 변수(`CORECLR_ENABLE_PROFILING`, `CORECLR_PROFILER`, `CORECLR_PROFILER_PATH` 및 관련 변수)를 설정합니다. |
| PHP      | `PHP_INI_SCAN_DIR`을 Datadog에서 제공하는 로더 디렉터리로 설정합니다. |
| NGINX    | Datadog 모듈을 로드하기 위해 추가된 명령줄 인수(예: `-g "load_module <path-to-Datadog-module>;"`)를 사용하여 NGINX 바이너리를 다시 실행합니다. |

## 권한 및 범위 {#privileges-and-scope}

### 인젝션 범위 {#injection-scope}

SSI는 사용자 공간 동적 연결(Linux의 `LD_PRELOAD` 또는 Windows의 DLL 인젝션 등)을 사용하여 애플리케이션 프로세스에 트레이서나 프로파일러를 로드하는 방식으로 애플리케이션을 계측합니다. 커널 모듈을 설치하거나, 커널을 패치하거나, 시스템 호출을 후킹하거나, eBPF를 사용하지 않습니다. 인젝터와 트레이서 또는 프로파일러는 애플리케이션 프로세스와 동일한 OS 권한으로 실행됩니다. [런타임 권한](#runtime-privileges)을 참조하세요.

인젝션된 코드는 애플리케이션 프로세스 내부에서 실행되지만, 일부 배포 모드는 인젝터가 자동으로 로드되도록 OS 또는 런타임 구성을 다음과 같이 업데이트합니다.

- **Kubernetes 어드미션 컨트롤러 인젝션**: 포드 사양을 변경하여 인젝터를 마운트하고(init 컨테이너 또는 [Datadog CSI 드라이버][2] 사용) 환경 변수를 설정합니다. 이는 호스트 OS 수정이 아니라 Kubernetes API 작업입니다.
- **Linux 호스트 인젝션**: 모든 신규 동적 연결 프로세스가 인젝션 런처를 로드하도록 동적 로더를 구성합니다(일반적으로 `/etc/ld.so.preload`를 통해). 이는 OS 수준의 구성 변경이지만 커널 코드가 아니라 사용자 공간 동적 연결로 유지됩니다.
- **Docker 런타임 인젝션**: Docker가 래퍼 런타임을 사용하도록 구성하여 트레이서가 마운트되고 구성된 상태로 컨테이너가 시작되게 합니다(일반적으로 `LD_PRELOAD` 환경 변수를 컨테이너에 인젝션하여 수행). 이는 Docker 데몬 구성을 수정합니다.
- **Windows 인젝션**: 새 프로세스에 인젝터 DLL을 로드하는 커널 드라이버를 설치합니다. 드라이버는 OS 수준에서 실행됩니다. 각 애플리케이션 프로세스 내부에서 실행되는 인젝션된 코드는 여전히 사용자 공간에 남아 있습니다.

### 런타임 권한 {#runtime-privileges}

인젝터, 트레이서, 프로파일러는 모두 애플리케이션 프로세스 내부에서 실행되며 해당 프로세스와 동일한 OS 권한을 상속받습니다. 그러나 추가 권한은 획득하지 않습니다. 애플리케이션이 제한된 사용자로 실행되는 경우에는 인젝터, 트레이서, 프로파일러도 해당 사용자의 권한으로 제한됩니다.

### 설치 권한 {#installation-privileges}

설치 시 필요한 권한은 배포 모드에 따라 다릅니다.

#### Kubernetes 어드미션 컨트롤러 {#kubernetes-admission-controller}

- **클러스터 측 구성 요소**(Datadog Cluster Agent 및 어드미션 컨트롤러)는 일반적으로 웹훅을 등록하고 포드를 변경하기 위해 클러스터 수준의 권한이 필요합니다.
- **애플리케이션 포드**는 Datadog에서 높은 수준의 OS 권한을 필요로 하지 않지만, 보안이 강화된 클러스터에서는 다음을 허용해야 할 수 있습니다.
  - Agent와 통신하는 데 사용되는 볼륨 마운트(일반적으로는 소켓 디렉터리에 대한 `hostPath` 마운트)
  - 특정 `SecurityContext` 또는 SCC 허용

  정책이 필요한 마운트를 허용하는 한, 인젝션된 init 컨테이너와 애플리케이션 컨테이너를 제한된 상태(루트 사용자 아님, 기능 제거, 권한 상승 없음)로 유지할 수 있습니다.

#### Linux 호스트 {#linux-host}

- 설치 시 패키지를 설치하고 시스템 전체의 로더 구성 및 서비스 구성을 수정할 수 있기 때문에 일반적으로 루트(또는 이에 상응하는) 권한이 필요합니다.
- 설치 후, Datadog Agent 서비스는 자체 서비스 사용자(일반적으로 `dd-agent`)로 실행되며, 인젝션된 코드는 애플리케이션 사용자의 권한으로 실행됩니다.

#### 호스트의 Docker 런타임 {#docker-runtime-on-a-host}

- 설치 및 구성 시 Docker 데몬 구성을 수정하기 때문에 일반적으로 루트 권한이 필요합니다.
- 런타임에, 인젝터와 트레이서는 해당 컨테이너 사용자의 권한으로 컨테이너의 애플리케이션 프로세스 내부에서 실행됩니다.

#### Windows {#windows-1}

- Windows에 Datadog Agent를 설치하려면 관리자 권한(서비스 설치 및 시스템 전체 구성)이 필요합니다.
- 애플리케이션 계측(예: .NET)의 경우, 프로파일러가 대상 프로세스 컨텍스트에서 실행됩니다. 시스템 전체 구성 변경을 통해 프로세스 및 서비스에 대한 프로파일러를 활성화할 수 있지만, 프로파일러에 추가 권한이 부여되지는 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/#configure-injection-modes
[3]: /ko/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules
[4]: /ko/tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
[5]: /ko/tracing/trace_collection/single-step-apm/windows/#define-instrumentation-rules