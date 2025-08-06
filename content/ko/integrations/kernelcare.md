---
app_id: kernelcare
categories:
- OS & 시스템
- security
custom_kind: 통합
description: Kernelcare 서버 활동 및 상태 메트릭을 모니터링하세요.
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Kernelcare
---
## 개요

[KernelCare](https://www.kernelcare.com) is a live patching system that automatically applies security patches to Linux kernel vulnerabilities, with no reboots. It's used on over 500,000 servers, and has been used to patch servers running for 6+ years for Dell, Zoom, and other enterprise companies. It works with all major Linux distributions, such as RHEL, CentOS, Amazon Linux, and Ubuntu, and interoperates with common vulnerability scanners, cloud monitoring tools, and patch management solutions.

이 통합을 사용하면 Datadog Agent를 통해 Kernelcare 메트릭을 전달할 수 있습니다.

## 설정

The Kernelcare check is not included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you need to install it.

### 설치

For Agent v7.21+ / v6.21+, follow the instructions below to install the Kernelcare check on your host. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) to install with the Docker Agent or earlier versions of the Agent.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

1. Configure your integration similar to core [integrations](https://docs.datadoghq.com/getting_started/integrations/).

### 설정

1. Edit the `kernelcare.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kernelcare performance data. See the [sample kernelcare.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

Run the [Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `kernelcare` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kernelcare.uptodate** <br>(gauge) | The number of uptodate servers|
| **kernelcare.outofdate** <br>(gauge) | The number of outofdate servers|
| **kernelcare.unsupported** <br>(gauge) | The number of unsupported servers|
| **kernelcare.inactive** <br>(gauge) | The number of inactive servers|

### 이벤트

Kernelcare 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**kernelcare.can_connect**

Returns `Critical` if the Agent cannot connect to Kernelcare to collect metrics, returns `OK` otherwise.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.