---
private: true
title: Profiling용 Single Step Instrumentation
---

<div class="alert alert-info">Single Step Instrumentation을 사용한 Profiling 활성화는 현재 Preview 단계입니다.</div>

## 개요

진행하기 전에 [Single Step APM Instrumentation][1](SSI)에 대해 숙지하세요.

[Continuous Profiler][3]을 SSI 설정의 일부로 활성화할 수 있습니다. 이 페이지에서 설정
지침을 확인하세요.

## 지원되는 운영 체제 및 환경

SSI는 `x86_64` 및 `arm64`(ARM v8) 아키텍처 모두 Linux만 지원합니다. 
SSI 사용 Continuous Profiler는 Preview 버전은 호스트, 컨테이너, Kubernetes 배포에 사용할 수 있습니다.

다음 언어에서 SSI를 사용하여 Continuous Profiler를 활성화할 수 있습니다.

| 언어           | 트레이서 라이브러리 버전 |
|--------------------|------------------------|
| 자바(Java)               | 1.37.0+                |
| .NET (x86_64만) | 3.3.1+                 |
| Node.js            | 4.39.0+, 5.15.0+       |

Kubernetes 배포에는 최소 Datadog Agent 7.57.0 이상이 필요합니다. 호스트 및 컨테이너 배포는
Datadog Agent 7.56.x 버전을 사용할 수 있습니다.

## SSI로 Continuous Profiler 활성화

다음 단계에 따라 Continuous Profiler를 SSI 설정의 일부로 활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Host and container" %}}

1. [Agent Installation Page][2]로 이동하여 Linux 플랫폼 또는 Docker 중 하나를 선택합니다.
1. "Enable APM Instrumentation" 스위치를 토글합니다. (스위치가 없는 경우 해당 플랫폼은 SSI를 지원하지 않습니다.) 스위치를 토글하면 설치 명령에 `DD_APM_INSTRUMENTATION_ENABLED=` 환경 변수가 추가되고. 설치된 Agent가 프로세스에 트레이서 라이브러리를 삽입하도록 구성합니다.
1. 설치 명령을 텍스트 편집기에 복사합니다.
1. 복사한 명령의 `DD_APM_INSTRUMENTATION_ENABLED` 뒤에 `DD_PROFILING_ENABLED=auto`를 추가 환경 변수로 추가합니다. 이렇게 하면 프로파일링이 필요한 모든 새 프로세스에 자동 프로파일러를 사용 설정할 수 있습니다.
1. 수정한 설치 명령을 사용하여 나머지 설치 지침에 따라 진행합니다.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Helm Chart" %}}

1. [Agent Installation Page][2]로 이동하여 Kubernetes를 선택한 다음 Helm Chart를 선택합니다.
1. APM 드롭다운 메뉴를 열어 Enable APM Instrumentation 스위치를 토글합니다.
1. 설치 페이지에 표시된 값 외에 하단의 값을 `datadog-values.yaml`에 추가합니다. `datadog.profiling.enabled: auto` 설정은 프로파일링이 필요한 새로운 프로세스에서
자동 프로파일러를 활성화합니다.
1. 나머지 설치 지침에 따라 진행합니다.

```
agents:
  image:
    tag: latest
clusterAgent:
  image:
    tag: latest
datadog:
  profiling:
    enabled: auto
```

Datadog Helm Chart가 이미 있는 경우, 최소 버전 3.71.0 이상으로 업데이트되었는지 확인하세요.
프로파일링을 지원하는 최신 Agent 버전을 설치하려면 '최신' 이미지 태그를 사용합니다.
Datadog Helm Chart는 이전 Agent 버전으로 기본 설정되어 있습니다.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Datadog Operator" %}}

1. [Agent Installation Page][2]로 이동하여 Kubernetes를 선택한 다음 Operator를 선택합니다.
1. APM 드롭다운 메뉴를 열고 APM Instrumentation 활성화 스위치를 토글합니다.
1. 설치 페이지에 표시된 값 외에 하단의 값을 `datadog-values.yaml`에 추가합니다. Cluster Agent의 `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED=auto` 환경 변수는
프로파일링이 필요한 새로운 프로세스에서 자동 프로파일러를 활성화합니다.
1. 나머지 설치 지침에 따라 진행합니다.

```
spec:
  override:
    nodeAgent:
      image:
        tag: latest
    clusterAgent:
      image:
        tag: latest
      env:
        - name: DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED
          value: "auto"
```

프로파일링을 지원하는 최신 Agent 버전을 설치하려면 '최신' 이미지 태그를 사용합니다.
Datadog Operator는 이전 Agent 버전으로 기본 설정되어 있습니다.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{< /tabs >}}

## SSI를 사용한 프로파일링은 어떻게 작동하나요?

설치 후, 모든 새 프로세스는  `DD_PROFILING_ENABLED=auto`
환경 변수로 실행됩니다. 실행 중인 프로세스는 영향을 받지 않습니다. Datadog 라이브러리는
프로파일링에 적합한 프로세스에서 프로파일러를 동적 활성화합니다.

적합한 프로세스를 식별하는 로직은 언어에 따라 다릅니다. Java의 경우, 모든 프로세스가
프로파일링됩니다. Java 애플리케이션은 일반적으로 호스트에 단일 Java 프로세스로 배포되기 때문입니다. Node
와 Python의 경우, 애플리케이션이 30초 이상 실행 중이고
하나 이상의 트레이싱 스팬을 생성한 경우에만 프로파일러가 활성화됩니다.

`auto` 대신 `true` 값을 사용하여 각 프로세스에 프로파일링을 삽입하도록
SSI를 구성할 수도 있습니다.

**참고**: Datadog은 중요하지 않은 프로세스의 프로파일링을 피하기 위해 `auto` 설정을 사용할 것을 권장합니다.

# 되돌리기

[Single Step APM Instrumentation][1] 페이지에는 모든 계측을 삭제하는 지침이 포함되어 있습니다.
계측을 삭제하면 프로파일링도 삭제됩니다.

아울러, 다음 단계 중 하나를 실행하여 프로파일링을 비활성화할 수 있습니다.
* `auto` 대신 `false` 값을 사용하여 설치 지침 실행을 반복합니다.
* 호스트 및 컨테이너 배포의 경우, 호스트의 `/etc/environment` 파일에서 `DD_PROFILING_ENABLED` 설정을 삭제합니다.

마지막으로, 명령줄에서 `DD_PROFILING_ENABLED=false`를 명시적으로 직접 설정하여 프로세스별로 프로파일링을 비활성화할 수 있습니다.

## Systemd 서비스에 대한 특별 고려 사항

호스트 설치의 경우 `DD_PROFILING_ENABLED` 환경 변수는 `/etc/environment` 파일에 저장됩니다.
대부분의 Linux 시스템에서는 이 파일을 통해 모든 프로세스가 자동으로 해당 변수를 인식합니다.
이 파일을 무시하는 systemd 서비스는 예외입니다. systemd 서비스로 배포된 애플리케이션의 경우,
애플리케이션 `.service` 파일에 다음 줄을 추가해야 합니다.
```
EnvironmentFile=/etc/environment
```
호스트에서
systemd 서비스가 아닌 형태로 배포된 애플리케이션이나, 컨테이너로 배포된 애플리케이션은
이 추가 단계를 진행하지 않아도 됩니다.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm
[3]: /ko/profiler/