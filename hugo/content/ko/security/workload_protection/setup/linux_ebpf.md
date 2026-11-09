---
aliases:
- /ko/security/workload_protection/setup/agent/linux
description: eBPF 기반 Datadog Agent를 사용하여 Linux 호스트에서 Workload Protection을 활성화하세요.
disable_toc: false
title: Linux에서 Workload Protection 설정하기(eBPF 사용)
---
다음 지침을 따라 Workload Protection을 활성화하세요.

{{< partial name="security-platform/WP-billing-note.html" >}}

## 전제 조건 {#prerequisites}

- Datadog Agent 버전 `7.46` 이상.

## 설치 {#installation}

패키지 기반 배포의 경우, 패키지 관리자를 사용하여 [Datadog 패키지를 설치][6]한 후 `datadog.yaml`, `security-agent.yaml`, `system-probe.yaml` 파일을 업데이트하세요.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
{{< /code-block >}}

**참고**:

- 다음 [Agent 설치 스크립트][5]를 사용하여 잘못된 구성 및 위협 탐지를 자동으로 활성화할 수도 있습니다.

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- 기본적으로 Runtime Security는 비활성화되어 있습니다. 이를 활성화하려면 `security-agent.yaml` 및 `system-probe.yaml` 파일을 모두 업데이트해야 합니다.
- Agent 설치 스크립트를 사용하여 잘못된 구성 및 위협 탐지를 활성화하는 경우, `datadog.yaml` 파일을 수동으로 업데이트하여 잘못된 구성에 대해 `host_benchmarks`를 활성화하고, 컨테이너 Vulnerability Management에 대해 `sbom` 및 `container_image`를 활성화해야 합니다.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```


[5]: /ko/getting_started/agent/#installation
[6]: /ko/agent/?tab=Linux