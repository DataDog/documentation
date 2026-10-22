---
aliases:
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 문서
  text: 런타임 메트릭 활성화
title: Docker에서 Single Step APM Instrumentation 사용
type: multi-code-lang
---
## 개요 {#overview}

Docker Linux 컨테이너에서 APM용 단일 단계 계측(SSI)을 사용하면 별도의 구성없이 한 번에 Datadog Agent를 설치하고 애플리케이션을 [계측][14]할 수 있습니다. 

{{< skill-callout
    title="에이전트를 사용해 APM 설정하기"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## 애플리케이션에서 APM 활성화 {#enable-apm-on-your-applications}

<div class="alert alert-info">계속 진행하기 전에 <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 호환성 가이드를 검토하여 환경이 호환되는지 확인하세요.</a></div>

Docker Linux 환경에서 Datadog Agent를 설치하고 SSI를 활성화하려면 애플리케이션 컨테이너 내부가 아닌 Docker 호스트에서 다음 명령을 실행하세요.

1. 호스트 Agent를 설치하지 않고 Docker 계측 구성 요소를 설치합니다.

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker \
   DD_NO_AGENT_INSTALL=true \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

1. Agent 컨테이너를 실행하거나 재배포합니다. `<YOUR_DD_API_KEY>`를 [Datadog API 키][1]로 바꿉니다.

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_SITE="{{< region-param key="dd_site" >}}" \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     registry.datadoghq.com/agent:7
   ```

   **Note**: Run only one Datadog Agent per node. If a Datadog Agent container already exists, update its definition (or your Docker Compose file) with these settings and recreate it, rather than starting a second Agent. For rootless Docker, set the correct Docker socket in `docker_config.yaml`.

1. Recreate your application containers.

   Instrumentation is applied when a container is created, so restarting an existing container with `docker stop` and `docker start` does not instrument it. Remove your application containers and run them again.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Docker][15] page. In the {{< ui >}}Customize my agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}. Then copy and run the generated command.

{{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="Docker에 Datadog Agent 설치를 위한 인앱 지침의 'Agent 설치 명령 사용자 지정' 섹션" style="width:100%;" >}}

## SDK 트레이서 버전 설정 {#set-sdk-tracer-versions}

기본적으로 단일 단계 계측은 Datadog SDK의 최신 메이저 버전을 설치하며, 새로운 마이너 업데이트가 제공되면 자동으로 적용합니다.

특정 버전을 고정하려면 쉼표로 구분된 `language:major` 쌍을 포함하는 `DD_APM_INSTRUMENTATION_LIBRARIES` 변수를 구성 요소 설치 명령에 추가합니다. 사용 가능한 버전은 각 언어의 소스 리포지토리에 나열되어 있습니다.

- [Java][8](`java`)
- [Node.js][9] (`js`)
- [Python][10](`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12](`ruby`)
- [PHP][13](`php`)

Datadog의 드롭다운에서 버전을 선택할 수도 있습니다. [Docker에 Datadog Agent 설치][15] 페이지에서 {{< ui >}}APM Instrumentation{{< /ui >}}을 켠 다음 {{< ui >}}Customize library versions{{< /ui >}}를 클릭합니다.

{{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="Docker에 Datadog Agent 설치를 위한 지침의 '라이브러리 버전 사용자 지정' 드롭다운" style="width:100%;" >}}

##  설치 검증 {#verify-the-installation}

1. Docker 데몬이 Datadog 런타임을 사용하고 있는지 확인합니다.

   ```shell
   docker system info --format '{{.DefaultRuntime}}'
   ```

   The output must be `dd-shim`. If it is `runc` or anything else, the instrumentation components did not install successfully, and your applications are not instrumented regardless of whether the Agent is healthy. Re-run the installation command, and confirm that the Docker daemon was running when you ran it.

1. Confirm the Agent container is running:

   ```shell
   docker ps --filter name=dd-agent
   ```

1. Agent가 정상적으로 작동하고 APM Agent가 실행 중인지 확인합니다.

   ```shell
   docker exec dd-agent agent status
   ```

   출력의 **APM Agent** 섹션을 확인합니다.

1. 애플리케이션 컨테이너가 Datadog 런타임을 사용하고 있는지 확인합니다. `<CONTAINER_NAME>`을 애플리케이션 컨테이너 중 하나의 이름으로 바꿉니다.

   ```shell
   docker inspect <CONTAINER_NAME> --format '{{.HostConfig.Runtime}}'
   ```

1. After your applications receive traffic, confirm your services appear on the [APM Services page][18]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][17].

## Configure Unified Service Tags 

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features 

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

제품을 활성화하려면 애플리케이션 구성에서 [환경 변수를 설정][3]합니다.

## Agent에서 단일 단계 APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

특정 서비스, 호스트, VM 또는 컨테이너의 트레이스 데이터를 수집하지 않고자 하는 경우, 다음 단계를 따르세요.

### 특정 서비스의 계측 제거 {#remove-instrumentation-for-specific-services}

특정 서비스에서 APM 계측을 제거하고 트레이스 전송을 중단하려면 다음 단계를 따르세요.

1. 서비스 시작 명령에 `DD_INSTRUMENT_SERVICE_WITH_APM` 환경 변수를 추가합니다.
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. 서비스를 다시 시작합니다.

### 인프라의 모든 서비스에 대하여 APM 제거 {#remove-apm-for-all-services-on-the-infrastructure}

트레이스 생성을 중단하려면 APM을 제거하고 인프라를 재시작:

1. 다음을 실행합니다.
   ```shell
   dd-container-install --uninstall
   ```
2. Docker를 다시 시작합니다.
   ```shell
   systemctl restart docker
   ```
   또는 사용 중인 환경에 해당하는 명령을 사용합니다.

## 문제 해결 {#troubleshooting}

SSI를 사용하여 APM을 활성화하는 과정에서 문제가 발생하면 [SSI 문제 해결 가이드][17]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/tracing/trace_collection/library_config/
[3]: /ko/tracing/trace_collection/library_config/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /ko/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[16]: /ko/getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[17]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[18]: https://app.datadoghq.com/apm/services