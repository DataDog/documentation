---
aliases:
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: 설명서
  text: 단일 단계 APM 계측
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: 학습 센터
  text: 호스트에서 APM 계측 문제 해결하기
title: 단일 단계 APM 문제 해결하기
---
## 개요 {#overview}

Single Step Instrumentation(SSI)은 애플리케이션 프로세스에 Datadog SDK를 자동으로 로드하여 애플리케이션을 계측할 수 있도록 지원합니다. SSI는 Linux 호스트, Kubernetes 및 Docker와 같은 컨테이너 환경에서 실행되는 애플리케이션과 Windows IIS에서 서비스되는 .NET 애플리케이션에 대해 애플리케이션 종속성이나 이미지를 변경할 필요 없이 작동합니다. SSI로 APM을 활성화하는 데 문제가 발생하면 이 가이드를 사용하여 일반적인 문제의 원인을 파악하고 해결하세요. 추가로 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.

## 문제 해결 방법 {#troubleshooting-methods}

Datadog UI의 Fleet Automation을 사용하거나 컨테이너 수준에서 수동으로 주입 문제를 조사할 수 있습니다. 인젝터가 각 프로세스에 대해 내린 결정을 더 낮은 수준에서 확인하려면 [인젝터 디버그 로그](#injector-debug-logs)를 참조하세요.

### Datadog Fleet Automation에서 주입 문제 해결 {#troubleshoot-injection-in-datadog-fleet-automation}


Fleet Automation은 SSI에 대해 두 가지 유형의 계측 인사이트를 제공합니다.
- **프로세스 수준 인사이트**는 개별 호스트 또는 컨테이너에 대한 계측 상태와 SDK 설치 세부정보를 보여줍니다.
- **Kubernetes 클러스터 인사이트**를 사용하면 클러스터 전반의 계측을 상위 수준에서 확인하고, 대규모 환경에서 SSI 구성 및 주입이 어떻게 적용되는지 파악할 수 있습니다.

이 두 화면을 통해 프로세스 및 클러스터 관점에서 주입 문제를 진단할 수 있습니다.

#### 전제 조건 {#prerequisites}

이 기능은 다음 환경에서 사용할 수 있습니다.

- **언어**: Python, Java, Node.js, PHP, .NET
- **환경**: Linux 호스트, 컨테이너, Kubernetes
- Datadog Agent v7.68.2+

#### 프로세스 수준 인사이트 조회 {#view-process-level-insights}

프로세스 수준 인사이트를 사용하여 SSI가 애플리케이션 프로세스에 올바르게 적용되었는지 확인하고 주입 실패를 식별합니다.

1. [Fleet Automation][9]으로 이동합니다.
1. 패싯을 사용하여 관련 호스트만 표시하도록 필터링합니다.
   - `single_step_instrumentation`은 SSI가 활성화되거나 비활성화된 호스트를 표시합니다.
   - `single_step_instrumentation_status`는 서비스 계측에 문제가 발생한 호스트를 표시합니다.
1. 호스트를 선택하여 Agent 세부정보 패널을 엽니다.
1. Agent 패널에서 {{< ui >}}Services{{< /ui >}} 탭으로 이동합니다.
1. 호스트에서 SSI가 활성화된 경우 탭에 다음 항목이 표시됩니다.
   - 'Single Step Instrumentation is enabled on this host.'라는 메시지가 포함된 배너
   - 문제 해결이 필요한 문제가 있는 경우 표시되는 {{< ui >}}SDK Installations{{< /ui >}} 섹션

#### Kubernetes 클러스터 인사이트 조회 {#view-kubernetes-cluster-insights}

클러스터 수준 인사이트를 사용하여 Kubernetes 클러스터 전반에서 SSI가 어떻게 구성되고 작동하는지 파악합니다. 이러한 인사이트를 통해 개별 프로세스뿐만 아니라 클러스터 수준까지 문제 해결 범위를 확장하여 워크로드에 계측이 어떻게 적용되는지 확인할 수 있습니다.

1. [{{< ui >}}Fleet Automation{{< /ui >}}][9] > {{< ui >}}View Agents{{< /ui >}}로 이동한 다음 오른쪽 상단에서 {{< ui >}}Kubernetes Clusters{{< /ui >}}를 선택합니다.
1. 클러스터를 선택하여 다음을 포함한 세부정보를 확인합니다.
   - 클러스터가 Helm 또는 Datadog Operator에 의해 관리되는지 여부
   - Cluster Agent 및 Node Agent 버전
   - 각 호스트에서 실행 중인 통합 및 서비스
1. {{< ui >}}Single Step Instrumentation{{< /ui >}} 탭을 열어 다음을 확인합니다.
   - 클러스터의 SSI 구성(YAML 보기)
   - 클러스터 구성 또는 포드 수준 주석에 따라 계측 대상으로 식별된 포드
   - 계측 성공 여부를 포함한 각 대상 포드의 상태
   - 언어 및 버전을 포함하여 각 포드에 주입된 SDK
   - 계측된 각 워크로드가 트레이스를 생성하고 있는지 여부 
1. 상태 아이콘 위로 마우스를 가져가면 계측 또는 트레이스 수집 상태에 대한 컨텍스트 세부정보를 확인할 수 있습니다. 

{{< img src="tracing/trace_collection/k8s-ssi-tab.png" alt="SSI 구성 YAML과 계측된 포드 목록이 표시된 Kubernetes 클러스터의 Single Step Instrumentation 탭" style="width:100%;" >}}

### 애플리케이션 컨테이너에서 주입 수동 확인 {#manually-verify-injection-in-the-application-container}

Datadog UI에 계측 문제가 표시되지 않거나 단일 서비스 또는 컨테이너의 문제를 해결하는 경우, 주입이 예상대로 이루어졌는지 수동으로 확인할 수 있습니다. 이 방법은 중앙 집중식 가시성이 제한된 환경에서 디버깅하거나 특정 서비스가 트레이스를 보고하지 않을 때 유용합니다.

컨테이너 수준에서 주입을 확인하려면 다음 사항을 확인합니다.

1. `/etc/ld.so.preload`에는 다음 항목이 포함되어 있습니다. 
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ``` 
2. `LD_PRELOAD` 환경 변수가 동일한 값으로 설정되어 있습니다.
3. 디렉터리 `/opt/datadog-packages/datadog-apm-inject`가 존재하며, `stable` 및 `$version` 하위 디렉터리가 있습니다.
4. 언어별 디렉터리가 있습니다(예: Java의 경우 `/opt/datadog/apm/library/java/`).

수동 확인 중에 디버그 로그를 활성화하려면 다음 단계를 따르세요.

1. 포드 사양에 다음을 설정합니다.
 
   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
   env:
     - name: DD_TRACE_DEBUG    # debug logging for the SDK
       value: "true"
     - name: DD_APM_INSTRUMENTATION_DEBUG    # debug logging for the injector
       value: "true"
   {{< /code-block >}}
   
2. 주입 중에 디버그 로그를 활성화하려면 포드를 삭제합니다.


## 인젝터 디버그 로그 {#injector-debug-logs}

인젝터 디버그 로그는 각 프로세스에서 주입이 성공했는지, 거부되었는지 또는 건너뛰었는지와 그 이유 등 인젝터가 내린 결정을 보여줍니다. [Fleet Automation](#troubleshoot-injection-in-datadog-fleet-automation)에서 실패 원인을 확인할 수 없거나, 호스트 또는 컨테이너 수준에서 문제를 진단하거나, [Datadog 지원][1]에 제공할 정보를 수집할 때 활성화합니다.

인젝터 디버그 로그는 트레이서 디버그 로그와 별개입니다. 인젝터 로그를 사용하여 트레이서의 주입 여부와 주입 방식을 진단하고, 주입 후에는 [트레이서 디버그 로그][13]를 사용하여 프로세스 내부에서 실행 중인 트레이서를 진단합니다.

### 디버그 모드 활성화 {#enable-debug-mode}

계측하려는 프로세스에 다음 환경 변수를 설정합니다.

```
DD_APM_INSTRUMENTATION_DEBUG=true
```

이렇게 하면 인젝터 로그 수준을 `DEBUG`로 높이고 `stderr`을 로그 싱크로 추가합니다.

이 변수는 주입된 프로세스가 상속받는 환경에 설정해야 합니다.

#### 호스트 {#host}

프로세스를 시작하기 전에 변수를 내보냅니다.

```sh
export DD_APM_INSTRUMENTATION_DEBUG=true
./my-service
```

#### Docker {#docker}

애플리케이션 컨테이너에 환경 변수를 추가합니다.

```sh
docker run -e DD_APM_INSTRUMENTATION_DEBUG=true my-image
```

디버그 출력은 컨테이너 로그(`docker logs <container>`)에 나타납니다.

#### Kubernetes {#kubernetes}

포드 템플릿의 컨테이너 사양에 변수를 추가합니다.

{{< code-block lang="yaml" disable_copy="true" >}}
spec:
  containers:
    - name: my-app
      env:
        - name: DD_APM_INSTRUMENTATION_DEBUG
          value: "true"
{{< /code-block >}}

또는 컨테이너 사양을 편집하지 않고 디버그 모드를 활성화하려면 다음 포드 주석을 추가합니다.

{{< code-block lang="yaml" disable_copy="true" >}}
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.debug: "true"
{{< /code-block >}}

디버그 출력은 애플리케이션 포드 로그(`kubectl logs <pod>`)에 나타납니다.

### 디버그 로그 검토 {#review-debug-logs}

#### 로그 위치 {#where-to-find-the-logs}

디버그 모드가 활성화되면 인젝터는 계측된 프로세스의 `stderr`에 로그를 기록합니다.

| 환경 | 확인할 위치 |
| --- | --- |
| 호스트 또는 셸 | 프로세스의 터미널 또는 `stderr`이 리디렉션되는 위치 |
| Docker | `docker logs <container>` |
| Kubernetes | `kubectl logs <pod>` (Cluster Agent가 아닌 애플리케이션 포드) |

**참고**: 디버그 출력을 `stderr` 대신 파일로 전송하려면 `DD_APM_INSTRUMENTATION_OUTPUT_PATHS`를 절대 경로로 설정합니다.

#### 주입 성공 {#successful-injection}

주입이 이루어졌는지 확인하려면 실행 파일이 런타임과 일치하는 로그 블록을 찾습니다. 다음 예시는 Node.js 주입이 성공한 경우를 보여줍니다.

```
<DEBUG> ... [linux/process.c:405] process_exe: 'node'
<DEBUG> ... [linux/process.c:443] Main executable path: '/usr/local/bin/node'
<DEBUG> ... [workload_selection.c:147] Workload selection allowed injection: continuing
<DEBUG> ... [workload_selection.c:90] Succesfully loaded policy: 'requirements.bin from SDK policies' from '/opt/datadog-packages/datadog-apm-inject/0.67.0/requirements/nodejs/requirements.bin' [size: 3864]
<DEBUG> ... [languages.c:71] detected language: 'nodejs'
<DEBUG> ... [languages.c:72] detected language version: '20.20.2'
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TELEMETRY_FORWARDER_PATH=/opt/datadog-packages/datadog-apm-inject/0.67.0/inject/process
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TAGS=_dd.injection.mode:k8s
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_INJECTION_ENABLED=tracer
<DEBUG> ... [linux/env_injector.c:38] injection config: NODE_OPTIONS=--require /opt/datadog/apm/library/js/node_modules/dd-trace/init.js
<INFO>  ... [./libinject.c:81] injection duration: 1.066500 ms
<DEBUG> ... [injection_metadata.c:101] sending injection-metadata telemetry: result='0', result_reason='injection completed successfully'
<DEBUG> ... [./libinject.c:231] injector finished
```

| 로그 라인 | 의미 |
| --- | --- |
| `process_exe: '<exe>'` / `Main executable path: '<path>'` | 평가 중인 프로세스입니다. |
| `Workload selection allowed injection: continuing` | 정책에 따라 주입이 허용되었습니다. |
| `Succesfully loaded policy: 'requirements.bin...'` | 탐지된 런타임에 대한 언어 요구 사항 정책이 로드되었습니다. |
| `detected language: '<lang>'` / `detected language version: '<version>'` | 런타임이 식별되었으며(`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`) 해당 버전을 확인했습니다. |
| `injection config: <VAR>=<value>` | 인젝터가 설정한 각 환경 변수 `DD_INJECTION_ENABLED=tracer`와 언어별 변수(예: `NODE_OPTIONS` 또는 `JAVA_TOOL_OPTIONS`)가 함께 표시되면 트레이싱 SDK가 로드되었음을 확인할 수 있습니다. |
| `injection duration: <N> ms` | 주입이 완료되었으며 경과 시간이 표시됩니다. |
| `injection completed successfully` (`result='0'`) | 인젝터가 주입 성공을 텔레메트리에 보고했습니다. 0이 아닌 `result`와 다른 `result_reason`이 함께 표시되면 실패를 의미합니다. |
| `injector finished` | 인젝터 생성자가 반환되었습니다. |

#### 일반적인 로그 메시지 {#common-log-messages}

**주입 비활성화됨**

`DD_INSTRUMENT_SERVICE_WITH_APM=false`이거나 다른 이유로 주입이 비활성화된 경우

```
<DEBUG> ... [libinject.c:115] disabled flag set, not injecting
```

인젝터가 로드되었지만 주입은 의도적으로 건너뛰었습니다. 주입을 허용하려면 `DD_INSTRUMENT_SERVICE_WITH_APM=false`를 제거하거나 `true`로 설정합니다.

**런타임이 탐지되지 않음**

프로세스가 지원되는 언어 런타임이 아닌 경우:

```
<DEBUG> ... [libinject.c:175] No known runtime was detected - not injecting!
```

인젝터가 실행되었지만 해당 프로세스는 계측 대상이 아닙니다(`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`). 이는 비애플리케이션 프로세스에서 예상되는 동작입니다.

**워크로드 선택 거부됨**

```
<DEBUG> ... [workload_selection.c:149] Workload selection denied injection
```

정책에 의해 이 프로세스에 대한 주입이 차단되었습니다. 앞의 `Evaluating '<policy-name>'`줄에는 어떤 규칙이 일치했는지와 비교한 값이 표시됩니다.

**재실행 탐지됨**

```
<DEBUG> ... [libinject.c:102] Re-exec detected!
```

주입된 환경 변수가 적용되도록 프로세스가 자체적으로 재실행되었습니다. 이는 예상된 동작입니다. 재실행된 프로세스에서 주입이 계속되며, 해당 프로세스는 자체 디버그 로그 행을 생성합니다.

## 주입에 영향을 주는 구성 옵션 {#configuration-options-that-affect-injection}

주입 동작을 차단하거나 변경할 수 있는 여러 구성 메커니즘이 있습니다.

### 스토리지 요구 사항 {#storage-requirements}

SSI는 각 호스트에 언어 SDK와 인젝터 패키지를 다운로드합니다. 필요한 디스크 공간의 양은 사용 중인 언어 수와 계측 중인 포드 수에 따라 다릅니다. 대략적인 추정치는 다음과 같습니다.

<div style="text-align:center;">
  <pre><code>[sum of the language library sizes]
+
[injector package size] * [number of injected pods per host]</code></pre>
</div>

라이브러리 패키지는 자주 업데이트되며 새로운 언어 버전에 대한 지원이 추가되면 크기가 커질 수 있으므로, 디스크 사용량은 시간이 지남에 따라 달라질 수 있습니다. 환경의 디스크 공간이 제한적인 경우 패키지 크기를 모니터링하고 주입 실패를 방지할 수 있도록 추가 용량을 확보합니다.

### 인젝터 버전 {#injector-version}

인젝터 버전을 설정하려면 다음 단계를 따르세요.
- 클러스터 수준:
  
  `datadog.apm.instrumentation.injector.imageTag` 아래의 `values.yaml`에서 설정합니다.

- 포드 수준:
 
  `admission.datadoghq.com/apm-inject.version` 주석을 사용하여 설정합니다.


호스트 또는 Docker 주입의 경우 `auto_inject` 버전을 수정하는 것은 권장되지 않습니다. 

### 허용 및 거부 목록 {#allow-and-deny-lists}

#### 기본 거부 목록 {#default-deny-list}

Datadog은 특정 프로세스(예: IDE 또는 데이터베이스)에 대한 주입을 방지하기 위해 내부 거부 목록을 유지 관리합니다. 프로세스 명령 또는 진입점이 이 목록에 있으면 인젝터가 주입을 건너뜁니다.  

#### Linux 계측 규칙 {#linux-instrumentation-rules}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="미리 보기에 참여하세요!">}}
계측 규칙은 Linux 기반 앱에 대해 제한적인 미리 보기로 제공되고 있습니다. 프로세스 주입에 대한 허용 또는 거부 규칙을 구성하려면 미리 보기 이용을 신청합니다.
{{< /callout >}}

#### Kubernetes 계측 규칙 {#kubernetes-instrumentation-rules}

계측 규칙을 사용하면 Kubernetes 레이블 및 선택기를 기반으로 주입할 수 있습니다. 고려할 규칙은 다음과 같습니다.

1. `disabledNamespaces`이 항상 우선 적용됩니다.
2. 포드가 초기화되면 대상 목록을 위에서 아래로 확인합니다. 포드당 첫 번째 일치 규칙만 적용됩니다.

#### 보안 스캐너에서 플래그가 지정된 주입 컨테이너 {#injection-container-flagged-by-security-scanners}

보안 도구는 `apm-inject` 컨테이너가 시작 시 실행 파일을 실행하는 동작이 악성 소프트웨어와 유사해 플래그를 지정할 수 있습니다. 

컨테이너의 동작은 정상적이고 안전하며, 실행 파일은 자동 계측을 위한 환경을 구성합니다.

Datadog은 보안 모범 사례를 준수하며 보안 공급업체와 협력하여 이 컨테이너를 허용 목록에 추가하고 있습니다.

### 엄격한 포드 보안 설정이 적용된 환경 {#environments-with-strict-pod-security-settings}

포드 보안 규칙이 Datadog 초기화 컨테이너를 차단하는 경우 다음과 같은 오류가 발생할 수 있습니다.

```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

이 문제를 해결하려면 다음 Cluster Agent 옵션 중 하나를 설정합니다.
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

값은 Datadog 초기화 컨테이너에 필요한 보안 컨텍스트를 적용하는 JSON 문자열이어야 합니다.  

### 사용자 지정 계측 {#custom-instrumentation}

사용자 지정 계측을 사용하려면 여전히 SDK를 가져와야 합니다. .NET의 `DD_TRACE_METHODS`와 같은 구성 변수는 사용자 지정 스팬을 정의하는 데 계속 사용할 수 있습니다.

## 일반 문제 해결 {#general-troubleshooting}

### DD_TRACE_ENABLED=false 설정 후에도 SSI가 계속 실행됨 {#ssi-continues-running-after-setting-dd-trace-enabledfalse}

`DD_TRACE_ENABLED=false`를 설정해도 SSI가 SDK를 로드하는 것을 막지는 못합니다. [인젝터][11]는 SDK가 환경 변수를 평가하기 전에 실행되므로, SDK 수준의 환경 변수는 SSI에 영향을 주지 않습니다. SSI를 비활성화하거나 제거하려면 플랫폼의 [SSI 설정 페이지][12]를 참조하세요.

## 환경별 문제 해결 {#environment-specific-troubleshooting}

### 호스트 및 Docker 환경 {#host-and-docker-environments}

#### 호스트 주입은 기존 프로세스에 적용되지 않음 {#host-injection-does-not-apply-to-existing-processes}

프리로드 라이브러리는 새로 시작된 프로세스에만 주입됩니다. 계측을 적용하려면 새 셸 세션을 시작하거나 로그아웃 후 다시 로그인합니다.

**참고:** Docker 기반 주입에는 이러한 제한이 없습니다.

#### 소규모 인스턴스 유형에서 주입 실패 {#injection-fails-on-small-instance-types}

프리로드 라이브러리는 분석기가 작업을 완료할 수 있도록 1초의 시간을 허용합니다. 여러 서비스를 실행하는 소형 VM 인스턴스(예: `t2.micro`)에서는 이 시간 제한이 초과될 수 있습니다. 이 문제를 해결하려면 `t2.small`과 같이 더 큰 인스턴스 유형을 사용합니다.

#### Agent 파일을 수동으로 제거한 후 발생하는 오류 {#errors-after-manual-uninstallation-of-agent-files}

Agent 파일을 수동으로 삭제하면 다음과 같은 오류가 발생할 수 있습니다.

```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

SSI를 올바르게 제거하려면 다음 플랫폼별 지침을 따르세요.

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][4]

#### 루트리스 Docker에서 주입이 작동하지 않음 {#injection-not-working-with-rootless-docker}

루트리스 Docker를 사용할 때는 `/etc/datadog-agent/inject/docker_config.yaml`에서 `docker_socket`을 현재 사용자의 Docker 소켓 경로(일반적으로 `/run/user/$UID/docker.sock`)로 설정합니다. 재부팅은 필요하지 않습니다.

#### 정적으로 링크된 런처에서 주입 실패 {#injection-fails-with-statically-linked-launchers}

사용자 지정 런처가 정적으로 링크된 경우(Go에서 흔함), 프리로드 라이브러리가 호출되지 않을 수 있습니다. 다음과 같은 경우에도 주입이 성공할 수 있습니다.
- 런처의 명령줄에 언어 이름이 포함됨
- 런처가 동적으로 링크된 중간 프로그램을 실행함

그러나 정적으로 링크된 바이너리에서 직접 시작된 프로세스에는 주입이 이루어지지 않습니다.

### Kubernetes 환경 {#kubernetes-environments}

Datadog Admission Controller는 애플리케이션 포드가 생성되기 전에 배포 및 구성되어야 합니다. 기존 포드는 수정할 수 없습니다.

Admission Controller 문제를 해결하려면 다음 단계를 따르세요.

1. Cluster Agent 포드의 상태를 확인합니다.
   ```
   kubectl get pods
   kubectl get deployments
   ```
1. Cluster Agent 리더 로그에서 Admission Controller가 성공적으로 시작되었음을 나타내는 `INFO` 메시지가 있는지 확인합니다. 예를 들면 다음과 같습니다.

   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. 다음 중 하나를 수행하여 Admission Controller 상태를 확인합니다.

   - Cluster Agent 포드 내에서 `agent status`를 실행하여 실시간 상태 출력을 확인합니다.
   - 사후에 문제를 조사하는 경우 flare 내의 `status.log`를 확인합니다. flare가 생성되면 시스템에서 `agent status`를 실행하고 출력을 `status.log`에 저장합니다.

   두 경우 모두 Admission Controller 및 Webhooks 섹션을 찾아 다음 사항을 확인합니다.
   - 필요한 모든 `MutatingWebhookConfiguration` 리소스가 나열되어 있습니다(자동 계측, 구성 주입 및 태그 주입용).
   - 웹훅 구성이 올바른 Secret을 참조합니다.
   - CA 번들 다이제스트가 구성 전체에서 일치합니다.

1. `telemetry.log` 또는 다음 명령의 출력에서 주입 시도를 확인합니다.

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```

   `admission_webhooks_library_injection_attempts`를 찾아 언어별 주입 시도를 확인합니다.

#### DatadogInstrumentation 구성이 적용되지 않음 {#datadoginstrumentation-configuration-is-not-applied}

SSI를 활성화하기 위해 `DatadogInstrumentation` 리소스를 사용하는 경우:

1. Agent 및 Cluster Agent의 버전이 v7.85 이상이고 CRD에 `spec.config.apm`이 포함되어 있는지 확인합니다. Datadog Operator v1.31 이상에는 APM 스키마가 포함되어 있습니다.

   ```shell
   kubectl explain datadoginstrumentation.spec.config.apm
   ```

1. 리소스 상태를 확인합니다.

   ```shell
   kubectl describe datadoginstrumentation <RESOURCE_NAME> -n <WORKLOAD_NAMESPACE>
   ```

   사유가 `Configured`인 `APMReady=True`를 확인합니다. 사유가 `UnsupportedLanguage` 또는 `InvalidTracerConfig`인 경우 구성을 수정해야 합니다. SDK 언어 식별자는 지원되는 식별자여야 하며, `ddTraceConfigs` 이름은 `DD_`로 시작해야 합니다.

1. 리소스와 워크로드가 동일한 네임스페이스에 있는지 확인하고, `targetRef`가 지원되는 워크로드의 API 버전, 종류 및 이름과 일치하는지 확인합니다.
1. DDI 컨트롤러와 Admission Controller가 활성화되어 있는지 확인합니다. 승인 옵트인 레이블이 없는 포드의 경우, `DatadogAgent` 리소스에서 `features.admissionController.mutateUnlabelled: true`를 설정합니다. 네임스페이스 제외 항목과 포드의 `admission.datadoghq.com/enabled` 레이블을 확인합니다.
1. DDI보다 우선 적용되는 포드 SDK 선택 주석이 있는지 확인합니다. 구성을 적용한 후 워크로드의 포드를 교체합니다. `APMReady=True`는 구성이 수락되었음을 나타낼 뿐, 실행 중인 포드가 계측되었음을 의미하지는 않습니다.

설정 단계 및 우선순위 규칙은 [DatadogInstrumentation으로 APM 활성화][14]를 참조하세요.

#### 변경 실패 {#failed-mutations}

Cluster Agent는 일반적으로 `admission/server.go`에서 발생한 주입 실패와 관련된 경고 및 오류를 기록합니다. `valueFrom`를 사용하여 `JAVA_TOOL_OPTIONS`를 설정하면 경고가 표시될 수 있습니다.

추가 디버깅을 위해 `datadog.cluster_agent.admission_webhooks.library_injection_errors` 메트릭을 사용합니다.

##### 언어 주석을 적용할 수 없음 {#language-annotation-cannot-be-applied}

설정 중에 SSI는 서비스의 애플리케이션 언어를 탐지하고 `internal.dd.datadoghq.com/service-name.detected_langs` 형식의 서비스 레이블을 적용합니다. 레이블을 적용할 수 없으면 주입이 실패합니다.

서비스 이름이 Kubernetes 문자열 제한([63자][6])을 초과하여 레이블 지정 오류가 발생하는 경우가 있습니다. 예를 들면 다음과 같습니다.

```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

[Unified Service Tagging][8]을 통해 서비스 태그를 명시적으로 설정하지 않으면 기본 이미지 이름이 사용되므로 문자열 길이 제한을 위반하는 경우가 많습니다.

##### 주입은 성공한 것으로 보이지만 트레이스가 없음 {#injection-appears-successful-but-traces-are-missing}

로그에 문제가 없는데도 트레이스가 없는 경우 애플리케이션 측 구성 오류가 원인일 수 있습니다. 다음 사항을 확인하세요.
- 필수 주석 및 레이블이 존재합니다.
- [Unified Service Tagging][8]이 올바르게 설정되었습니다.
- 계측 규칙에 대한 허용 및 거부 목록이 올바르게 정의되었습니다.

## 언어별 문제 해결 {#language-specific-troubleshooting}

### Java {#java}

#### `JAVA_TOOL_OPTIONS`가 너무 김 {#java-tool-options-is-too-long}

`JAVA_TOOL_OPTIONS` 환경 변수에는 JVM에서 적용하는 1,024자 길이 제한이 있습니다. 주입 중에 Datadog은 트레이싱을 활성화하기 위해 이 변수에 `-javaagent` 플래그를 추가합니다. 결합된 값이 제한을 초과하면 JVM이 경고를 내보내고 변수를 무시하여 주입을 방지합니다.

이 문제를 방지하려면 영향을 받는 프로세스를 주입 대상에서 제외합니다.

####  `JAVA_TOOL_OPTIONS` 프로그램 출력을 변경함 {#java-tool-options-changes-program-output}

`JAVA_TOOL_OPTIONS`가 설정되면 JVM은 `Picked up JAVA_TOOL_OPTIONS: -Xmx1024m`과 같은 메시지를 stdout에 출력합니다. 프로세스가 이 출력을 읽고 이에 의존하는 경우 영향을 받을 수 있습니다.

버전 0.12.2부터는 출력을 구문 분석하는 프로세스를 방해하지 않도록 `java -version`에 대한 주입을 건너뜁니다.

#### 여러 Java 사이트가 동일한 서비스 이름으로 보고됨 {#multiple-java-sites-report-under-the-same-service-name}

기본적으로 Single Step은 `DD_SERVICE` 환경 변수를 설정하여 동일한 서버(Tomcat 또는 WebLogic 등)에서 실행되는 모든 웹 애플리케이션에 동일한 서비스 이름을 적용합니다. 결과적으로 모든 사이트가 동일한 이름으로 보고됩니다.

각 사이트가 서로 다른 이름으로 보고되도록 **split-by-tags**를 활성화하려면 다음 옵션 중 하나를 사용합니다.
- JVM 시스템 속성: `-Ddd.trace.split-by-tags=servlet.context`
- 환경 변수: `DD_TRACE_SPLIT_BY_TAGS=servlet.context`

#### 트레이서가 이미 존재함 {#tracer-already-exists}

SSI는 `-javaagent` 옵션이나 기타 트레이싱 구성을 이미 사용하는 애플리케이션에는 주입하지 않습니다.

### Ruby {#ruby}

Ruby 주입은 Datadog SDK를 추가하기 위해 `Gemfile`을 수정합니다. 나중에 주입 지원이 제거되면 누락된 종속성으로 인해 애플리케이션이 시작되지 않을 수 있습니다.

이를 해결하려면 원래 `Gemfile`을 복원합니다. 주입을 제거한 후에도 APM을 계속 사용하려면 `bundle install`을 실행하여 gem을 다운로드합니다.

### Python {#python}

2.7.5 이하 버전에는 시스템 라이브러리와 충돌할 수 있는 미리 패키징된 protobuf 종속성이 포함되어 있습니다.

### .NET {#net}

#### SSI가 적용되었지만 .NET 트레이스가 Agent에 도달하지 않음 {#ssi-is-applied-but-no-net-traces-reach-the-agent}

SSI 주석과 초기화 컨테이너가 포드에 있지만 .NET 트레이스가 수신되지 않는 경우 다른 프로파일러가 우선 적용될 수 있습니다. 메인 컨테이너에서 `CORECLR_PROFILER`를 확인합니다. 값이 `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`(Datadog .NET 트레이서 CLSID)이 아니면 Datadog 대신 다른 프로파일러가 로드된 것입니다.

충돌하는 `CORECLR_*` 환경 변수(및 다른 프로파일러를 참조하는 모든 `LD_PRELOAD` 항목)를 주입한 소스인 다른 공급업체의 오퍼레이터, 초기화 컨테이너, 포드 템플릿 또는 Helm 값에서 제거합니다. 그런 다음 포드를 순차적으로 재시작합니다. [.NET CLR 프로파일링 API는 프로세스당 하나의 구독자만 허용합니다][10].

## 지원팀에 제공할 진단 정보 수집 {#collect-diagnostic-information-for-support}

주입 문제와 관련하여 지원팀에 문의할 때 문제 해결에 도움이 되도록 다음 정보를 수집합니다.

1. 호스트 주입, Docker 주입 또는 둘 다 사용 중이십니까?
1. `/opt/datadog-packages/datadog-apm*` 디렉터리가 있는지 확인합니다.
1. 호스트 주입의 경우 `/etc/ld.so.preload`의 존재 여부와 권한을 확인합니다.

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   `root`가 소유자여야 하며 `644` 권한(`-rw-r--r--`)이 설정되어 있어야 합니다.

1. 인젝터 디버그 로그를 활성화하고 출력을 수집합니다. 방법은 [인젝터 디버그 로그](#injector-debug-logs)를 참조하세요.

1. Agent flare를 제공합니다.

### Kubernetes 기반 주입에 대한 추가 정보 {#additional-information-for-kubernetes-based-injection}

Kubernetes 환경에서 주입 문제를 해결하는 경우 다음 세부정보를 수집합니다.

- Cluster Agent를 배포하는 데 사용된 방법(예: Helm, Datadog Operator 또는 kubectl 명령)
- 애플리케이션 포드의 배포 파일
- Node Agent와 Cluster Agent 양쪽의 flare(가급적 `DEBUG` 모드가 활성화된 상태)
- 다음 명령의 출력:
  ```
  kubectl describe pod <app pod>
  ```
- 애플리케이션 포드의 인젝터 디버그 로그(Cluster Agent 제외) 방법은 [인젝터 디버그 로그](#injector-debug-logs)를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[2]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[3]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[4]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[5]: /ko/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[6]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[7]: https://datatracker.ietf.org/doc/html/rfc1035
[8]: /ko/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/fleet
[10]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[11]: /ko/tracing/guide/injectors/
[12]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/#instrument-sdks-across-applications
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/
[14]: /ko/tracing/trace_collection/single-step-apm/kubernetes/?tab=datadoginstrumentationcrdrecommended#enable-apm-with-datadoginstrumentation