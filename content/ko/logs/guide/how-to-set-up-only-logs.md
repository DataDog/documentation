---
aliases:
- /ko/logs/faq/how-to-set-up-only-logs
kind: 설명서
title: Datadog 에이전트를 로그 수집용으로만 사용
---

페이로드를 비활성화하려면 에이전트 v6.4+를 실행해야 합니다. 그러면 메트릭 데이터 제출을 비활성화하고 호스트가 Datadog에 표시되지 않습니다. 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "호스트 " %}}

1. [datadog.yaml 구성 파일][1]을 여세요.
2. 다음 설정으로 `enable_payloads` 속성을 추가하세요.

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [에이전트에서 로그를 수집하도록 구성][2]합니다.
4. [Restart the Agent][3].

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/logs/log_collection/
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Docker 컨테이너화된 에이전트를 사용 중인 경우 에이전트 구성 후 `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, `DD_ENABLE_PAYLOADS_SKETCHES` 환경 변수를 `false`로 설정하세요.

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

쿠버네티스에서 에이전트를 배포하는 경우 에이전트 구성 후에 `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, `DD_ENABLE_PAYLOADS_SKETCHES` 환경 변수를 `false`로 설정하세요.

```yaml
 ## 두 번째 로그만
 datadog:
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