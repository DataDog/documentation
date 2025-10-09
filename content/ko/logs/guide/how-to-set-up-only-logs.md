---
aliases:
- /ko/logs/faq/how-to-set-up-only-logs
further_reading:
- link: /containers/docker/log/?tab=containerinstallation
  tag: 설명서
  text: 도커(Docker) 로그 수집
- link: /containers/kubernetes/log/
  tag: 설명서
  text: Kubenetes 로그 수집
title: Datadog 에이전트를 로그 수집용으로만 사용
---

<div class="alert alert-warning">인프라스트럭처 모니터링은 애플리케이션 성능 모니터링(APM) 사용의 전제 조건입니다. 애플리케이션 성능 모니터링(APM) 고객이시라면 메트릭 수집을 비활성화하지 마시기 바랍니다. 그렇지 않으면 중요한 텔레메트리 및 메트릭 수집 정보가 손실될 수 있습니다.</div>

페이로드를 비활성화하려면 에이전트 v6.4 이상을 실행 중이어야 합니다. 이렇게 하면 메트릭 데이터 제출(커스텀 메트릭 포함)이 비활성화되어 호스트가 Datadog에 표시되지 않습니다. 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "Host " %}}

1. [datadog.yaml 구성 파일][1]을 여세요.
2. 다음 설정을 사용하여 설정 파일의 임의 위치에 `enable_payloads`을 최상위 속성으로 추가합니다.

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [에이전트에서 로그를 수집하도록 구성][2]합니다.
4. [에이전트를 다시 시작합니다][3].

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/logs/log_collection/
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

도커(Docker) 컨테이너화된 에이전트를 사용하는 경우 다음 환경 변수를 `false`로 설정합니다.
- `DD_ENABLE_PAYLOADS_EVENTS`
- `DD_ENABLE_PAYLOADS_SERIES`
- `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`
- `DD_ENABLE_PAYLOADS_SKETCHES`

다음은 도커(Docker) 실행 명령에 해당 설정을 포함시키는 방법의 예시입니다.

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false \
           -e DD_ENABLE_PAYLOADS_SERIES=false \
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
           -e DD_ENABLE_PAYLOADS_SKETCHES=false \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스(Kubernetes)에 에이전트를 배포하는 경우 에이전트 설정과 Helm 차트에서 다음과 같이 변경합니다.

```yaml
 ## Send logs only
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}