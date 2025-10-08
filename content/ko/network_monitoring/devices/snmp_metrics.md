---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: 네트워크 장치 모니터링 프로필 사용
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: 센터 지식
  text: SNMP 모니터링 개요
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog와 SNMP 모니터링하기
title: SNMP 메트릭
---

## 설치

Network Device Monitoring은 [Datadog Agent][1] 패키지에 포함된 SNMP 통합에 기반하며, 세 가지 버전의 SNMP(`SNMPv1`, `SNMPv2`, `SNMPv3`)를 모두 지원합니다. 탐지 중 SNMP 포트(기본값 161)를 폴링합니다. 응답이 있고 일치하는 프로필이 있으면 장치가 탐지된 것으로 간주합니다.

## 사전 요구 사항

Agent v7.32+

## 작동 방식

다음 다이어그램은 Datadog Agent와 모니터링되는 장치간의 기본 포트와 프로토콜을 나타냅니다. SNMP 메트릭의 경우, Datadog Agent는 Autodiscovery를 사용하거나 수동 장치 IP 구성에 기반하여 장치를 폴링합니다. NDM이 설정되고 온프레미스 또는 클라우드 환경에 배포한 Datadog Agent는 네트워크에서 수집한 모든 장치 및 네트워크 데이터를 통합하여 포트 `443`의 HTTPS를 통해 Datadog에 전송합니다. 이러한 작업으로 메트릭, 로그, 트레이스, 모니터, 대시보드에 대한 통합 풀스택 가시성을 제공합니다.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="장치 폴링 플로를 보여주는 NDM 다이어그램." style="width:90%;" >}}

## 다음 단계

아래 지침에 따라 Datadog을 구성하여 네트워크 장치에서 SNMP 메트릭을 수집하세요.

## 구성

Datadog 네트워크 장치 모니터링은 전체 서브넷에 있는 개별 장치나 자동 검색 장치(고유한 IP 주소)에서 메트릭 수집을 지원합니다.

네트워크에 있는 장치 수에 따라 수집 전략을 고르세요. 또한 네트워크의 역동성(장치 추가 또는 제거 빈도)를 고려해야 합니다.

[개별 장치 모니터링](#monitoring-individual-devices)
: 소규모이며 대부분 정적인 네트워크에 적합합니다.

[Autodiscovery](#autodiscovery)
: 대규모 또는 동적 네트워크에 적합합니다.

수집 전략에 관계없이 Datadog의 [sysObjectID 매핑된 장치 프로필][2]을 활용해 자동으로 장치에서 관련 메트릭을 수집합니다.

### 개별 장치 모니터링

개별 장치 모니터링 방법:

-  [에이전트 설정 디렉터리][3] 루트에 있는 `conf.d/` 폴더의 `snmp.d/conf.yaml` 파일에 IP 주소 및 기타 장치 메타테이터(태그 등)을 포함하세요. 사용 가능한 모든 설정 옵션을 보려면 [샘플 snmp.d/conf.yaml][4]을 참조하세요.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- SNMPv2의 경우 IP 주소와 장치의 _커뮤니티 문자열_을 지정하는 인스턴스를 설정하세요.

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      community_string: 'sample-string'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- SNMPv3의 경우 장치의 IP 주소와 SNMPv3 자격 증명을 지정하는 인스턴스를 설정하세요(적절한 경우). 예를 들어 `user`, `authProtocol`, `authKey`, `privProtocol`, `privKey`를 설정합니다.

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      snmp_version: 3  # optional, if omitted which version of SNMP you are using is auto-detected
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{< /tabs >}}

- [에이전트를 재시작하세요][5].

설정 후 Agent가 장치를 [Datadog 지원 장치 프로필][6] 중 하나와 일치시켜 관련 메트릭을 수집합니다.

설정을 확장하는 방법:

* 네트워크의 더 많은 장치에서 메트릭 수집을 위한 더 많은 인스턴스를 추가합니다.
* 동적 네트워크 전반의 많은 장치에서 메트릭을 수집해야 한다면 [자동탐지](#autodiscovery)를 사용하세요.

### 자동탐지

개별 장치를 지정하는 대신 Autodiscovery를 사용해 네트워크에서 모든 장치를 자동 탐지할 수 있습니다.

Autodiscovery는 구성된 서브넷의 각 IP를 폴링하고 장치의 응답을 확인합니다. 그런 다음 Datadog Agent는 검색된 장치의 `sysObjectID`를 찾고 [Datadog 지원 장치 프로필][6] 중 하나에 매핑합니다. 이러한 프로필은 다양한 유형의 장치를 수집하기 위해 사전 정의된 메트릭 목록을 포함합니다.

네트워크 장치 모니터링과 자동탐지를 사용하는 방법:

1. Datadog 에이전트 버전 v7.27 이상을 설치하거나 이러한 버전으로 업그레이드하세요. [Datadog 에이전트][7] 설명서를 참조하세요.

2. [`datadog.yaml`][8] 에이전트 설정 파일을 편집하여 Datadog의 모든 서브넷을 검사하도록 포함합니다. 다음 샘플 설정은 자동탐지를 위한 필수 파라미터, 기본값 및 예시를 제공합니다.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'  # enclose with single quote
        tags:
        - "key1:val1"
        - "key2:val2"
      - network_address: 10.20.0.0/24
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'
        tags:
        - "key1:val1"
        - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # enclose with single quote
        privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # enclose with single quote
        tags:
          - 'key1:val1'
          - 'key2:val2'
      - network_address: 10.20.0.0/24
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'
        authKey: 'fakeKey'
        privProtocol: 'AES256'
        privKey: 'fakePrivKey'
        tags:
          - 'key1:val1'
          - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

**참고**: Datadog 에이전트는 자동으로 검색된 각 IP와 함께 SNMP 점검을 설정합니다. SNMP를 사용해 수집되는 경우 검색된 장치는 대응되는 IP입니다.

**참고**: 이 구문을 사용하려면 Agent 7.54 이상 버전을 사용 중인지 확인하세요. 이전 버전의 경우 [이전 config_template.yaml][9]을 참조하세요.

## 검증

[Agent 상태 하위 명령을 실행][10]하고 Checks 섹션에서 `snmp`를 찾으세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices
[7]: /ko/agent
[8]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855
[10]: /ko/agent/configuration/agent-commands/#agent-status-and-information