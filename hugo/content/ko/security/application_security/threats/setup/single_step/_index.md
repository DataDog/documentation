---
external_redirect: /security/application_security/threats/threat_detection/
title: 단일 단계 계측을 사용하여 AAP 위협 탐지 및 보호 활성화
---

<div class="alert alert-info">단일 단계 계측을 사용한 AAP 위협 탐지 및 보호  활성화 기능은 현재 Preview 단계입니다.</div>

## 필수 조건

- **최소 Agent 버전 7.53.0**
- **최소 Helm 버전 3.62.0**(Kubernetes 배포용)
- **언어 및 아키텍처**: 단일 단계 AAP 계측은 `x86_64` 및 `arm64` 아키텍처에서 Java, Python, Node.js, .NET Core 서비스 추적만 지원합니다.
- **운영체제**: Linux VM(Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, Linux 컨테이너 기반 Kubernetes 클러스터.

## 단 한 단계만으로 활성화

**Enable Threat Protection(신규)** 옵션을 선택한 상태로 [Datadog Agent를 설치하거나 업데이트][1]하면, APM이 활성화된 상태로 Agent가 설치 및 구성됩니다. 이 경우 추가 설치나 구성 단계 없이 애플리케이션을 자동으로 계측할 수 있습니다. 해당 계측이 활성화되도록 서비스를 재시작합니다.


{{< img src="/security/application_security/single_step/asm_single_step_threat_detection_2.png" alt="APM 계측 및 Threat Protection 활성화 토글이 강조 표시된 Ubuntu 설정 페이지 계정 설정." style="width:100%;" >}}

다음은 각 인프라 유형에서 어떻게 작동하는지 보여주는 예시입니다.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

단 하나의 명령으로 Agent를 설치, 구성 및 시작하고 AAP로 서비스를 계측할 수 있습니다.

Ubuntu 호스트의 경우:

1. 한 줄 설치 명령을 실행합니다.

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. [Datadog API 키][4]를 `<YOUR_DD_API_KEY>`로 바꿉니다.

   b. [Datadog 사이트][3]를 `<YOUR_DD_SITE>`로 바꿉니다.
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. 현재 셸 세션을 종료합니다.
3. 셸 세션을 시작하세요.
4. 호스트나 VM에서 서비스를 재시작합니다.
5. [Datadog에서 서비스 성능 Observability에 대해 알아보세요][5].

**참고:** AAP Threat Protection와 Code Security 모두 단일 단계로 구성하려면 한 줄 설치 명령에 환경 변수 `DD_APPSEC_ENABLED=true`, `DD_IAST_ENABLED=true`를 추가합니다.

### 추적 라이브러리 버전 지정 {#lib-linux}

기본적으로 서버에서 APM을 활성화하면 Java, Python, Node.js, .NET Core 서비스용 지원이 설치됩니다. 해당 언어의 일부로만 구현된 서비스가 있는 경우 한 줄 설치 명령에 `DD_APM_INSTRUMENTATION_LIBRARIES`를 설정합니다.

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

언어 이름 뒤에 콜론을 붙이고 추적 라이브러리 버전을 지정하여 추적 라이브러리의 버전 번호를 옵션으로 제공할 수 있습니다. 버전을 지정하지 않으면 기본값으로 최신 버전이 사용됩니다. 언어 이름은 쉼표로 구분합니다.

지원되는 언어는 다음과 같습니다.

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- PHP (`php`)

**참고**: Node.js 추적 라이브러리의 경우, Node.js 버전에 따라 호환되는 Node.js 추적 라이브러리 버전이 다릅니다. 자세한 내용은 [DataDog/dd-trace-js: JavaScript APM Tracer][6]를 참조하세요.

### 환경별로 Observability 데이터 태그 지정 {#env-linux}

Linux 한 줄 설치 명령에 `DD_ENV`를 설정하면, Agent를 거치는 계측된 서비스 및 기타 텔레메트리를 특정 환경으로 자동 태그 지정할 수 있습니다. 예를 들어, 스테이징 환경에 Agent가 설치되어 있는 경우 `DD_ENV=staging`을 설정하여 Observability 데이터를 `staging`과 연결합니다.

예시:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /ko/agent/remote_config
[3]: /ko/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ko/software_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

Docker Linux 컨테이너의 경우:

1. 라이브러리 인젝터를 설치합니다.
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_NO_AGENT_INSTALL=true DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Docker에서 Agent를 구성합니다.
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APPSEC_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   [Datadog API 키][5]를 `<YOUR_DD_API_KEY>`로 바꿉니다.
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Docker 컨테이너를 재시작합니다.
4. [Datadog에서 서비스 성능 Observability에 대해 알아보세요][6].

### 추적 라이브러리 버전 지정 {#lib-docker}

기본적으로 서버에서 APM을 활성화하면 Java, Python, Node.js, .NET 서비스용 지원이 설치됩니다. 해당 언어의 일부로만 구현된 서비스가 있는 경우 설치 스크립트 실행 시  `DD_APM_INSTRUMENTATION_LIBRARIES`를 설정합니다.

예를 들어, Java 추적 라이브러리 v1.25.0 및 최신 Python 추적 라이브러리만 지원하도록 설치하려면 설치 명령에 다음을 추가합니다.

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

언어 이름 뒤에 콜론을 붙이고 추적 라이브러리 버전을 지정하여 추적 라이브러리의 버전 번호를 옵션으로 제공할 수 있습니다. 버전을 지정하지 않으면 기본적값으로 최신 버전이 사용됩니다. 언어 이름은 쉼표로 구분합니다.

지원되는 언어는 다음과 같습니다.

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)
- PHP (`php`)

**참고**: Node.js 추적 라이브러리의 경우, Node.js 버전에 따라 호환되는 Node.js 추적 라이브러리 버전이 다릅니다. 자세한 내용은 [DataDog/dd-trace-js: JavaScript APM Tracer][7]를 참조하세요.

### 환경별로 Observability 데이터 태그 지정 {#env-docker}

Docker용 라이브러리 인젝터 설치 명령에 `DD_ENV`를 설정하면, Agent를 거치는 계측된 서비스 및 기타 텔레메트리를 특정 환경으로 자동 태그 지정할 수 있습니다. 예를 들어, 스테이징 환경에 Agent가 설치되어 있는 경우 `DD_ENV=staging`을 설정하여 Observability 데이터를 `staging`과 연결합니다.

예시:

{{< highlight shell "hl_lines=5" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_APPSEC_ENABLED=true \
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ko/software_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

Datadog Helm 차트로 Agent를 설치하여 APM을 활성화할 수 있습니다. 이렇게 하면 DaemonSet이 적용된 Linux 기반 Kubernetes 클러스터의 모든 노드에 Datadog Agent가 배포됩니다.

**참고**: 단일 단계 계측은 Datadog Agent를 설치한 네임스페이스의 애플리케이션을 계측하지 않습니다. 애플리케이션을 실행하지 않는 클러스터의 별도 네임스페이스에 Agent를 설치할 것을 권장합니다.

### 필수 조건

- [Helm][13]이 설치되어 있는지 확인합니다.

### 설치

Helm으로 단일 단계 계측을 사용하는 방법

1. Helm Datadog 리포지토리를 추가합니다.

    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Datadog [API 키][10]를 저장할 Kubernetes 시크릿을 생성합니다.

   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /ko/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services
{{% /tab %}}
{{< /tabs >}}
## Agent에서 단일 단계 APM 및 AAP 계측을 제거합니다.
특정 서비스, 호스트, VM 또는 컨테이너용 트레이스 데이터를 수집하지 않으려면 다음 단계를 완료합니다.
### 특정 서비스에 대한 계측 제거
다음 명령을 실행하고 서비스를 다시 시작하여 서비스에 라이브러리 삽입을 중지하고, 해당 서비스에서 추적 생성을 중지합니다.
{{< tabs >}}
{{% tab "Linux host or VM" %}}
1. 서비스 시작 명령에 `DD_INSTRUMENT_SERVICE_WITH_APM` 환경 변수를 추가합니다.
   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. 서비스를 다시 시작합니다.
3. AAP를 비활성화하려면 애플리케이션 설정에서 `DD_APPSEC_ENABLED=true` 환경 변수를 삭제하고 서비스를 다시 시작합니다.
{{% /tab %}}
{{% tab "Docker" %}}
1. 서비스 시작 명령에 `DD_INSTRUMENT_SERVICE_WITH_APM` 환경 변수를 추가합니다.
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. 서비스를 다시 시작합니다.
3. AAP를 비활성화하려면 애플리케이션 설정에서 `DD_APPSEC_ENABLED=true` 환경 변수를 삭제하고 서비스를 다시 시작합니다.
{{% /tab %}}
{{% tab "Kubernetes" %}}
1. 포드 사양에서 `admission.datadoghq.com/enabled:` 레이블을 `"false"`로 설정합니다.
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
{{% /tab %}}
{{< /tabs >}}
### 인프라의 모든 서비스에서 APM 제거하기
추적 생성을 중지하려면 라이브러리 인젝터를 제거하고 인프라를 다시 시작합니다.
{{< tabs >}}
{{% tab "Linux host or VM" %}}
1. 실행:
   ```shell
   dd-host-install --uninstall
   ```
2. 호스트를 다시 시작합니다.
{{% /tab %}}
{{% tab "Docker" %}}
1. 로걸 라이브러리 인젝터 설치 삭제 방법
   ```shell
   dd-container-install --uninstall
   ```
2. Docker를 다시 시작합니다.
   ```shell
   systemctl restart docker
   ```
   또는 사용자 환경에 맞는 동일한 방법을 사용하세요.
{{% /tab %}}
{{% tab "Kubernetes" %}}
1. `apm:`에서 `instrumentation:`을 제거하고 `datadog-values.yaml`에서 다음 구성을 모두 제거합니다.
2. `asm:`에서 `threats:`을 제거하고 `datadog-values.yaml`에서 다음 구성을 모두 제거합니다.
3. 다음 명령을 실행합니다:
   ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
{{% /tab %}}
{{< /tabs >}}
[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/remote_config