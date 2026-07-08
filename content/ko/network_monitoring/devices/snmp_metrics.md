---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: Network Device Monitoring을 통해 프로필 사용
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: 지식 센터
  text: SNMP 모니터링 개요
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링
title: SNMP 메트릭
---
## 설치 {#installation}

Network Device Monitoring은 [Datadog Agent][1] 패키지에 포함된 SNMP 통합에 의존하며, SNMP의 세 가지 버전 `SNMPv1`, `SNMPv2`, `SNMPv3`를 모두 지원합니다. 탐색 중에 SNMP 포트(기본값 161)가 폴링됩니다. 응답이 있고 일치하는 프로필이 있는 경우 기기는 발견된 것으로 간주됩니다.

## 사전 요구 사항 {#pre-requisites}

Agent v7.32+

## 작동 방식 {#how-it-works}

다음 다이어그램은 Datadog Agent와 모니터링되는 기기 간의 기본 포트 및 프로토콜을 보여줍니다. SNMP 메트릭의 경우, Datadog Agent는 Autodiscovery 또는 수동 기기 IP 구성에 따라 기기를 폴링합니다. NDM으로 구성되고 온프레미스 또는 클라우드에 배포된 Datadog Agent는 네트워크에서 수집된 모든 기기 및 네트워크 데이터를 통합하여 포트 `443`에서 HTTPS를 통해 Datadog에 전송합니다. 이는 메트릭, 로그, 트레이스, 모니터링, 대시보드의 통합된 전체 스택 가시성을 제공합니다.

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="NDM 다이어그램은 SNMP 기기 폴링 흐름을 보여줍니다." style="width:90%;" >}}

## 다음 단계 {#next-steps}

아래 지침에 따라 Datadog을 구성하여 네트워크 기기에서 SNMP 메트릭을 수집하세요.

## 구성 {#configuration}

Datadog Network Device Monitoring은 전체 서브넷에 있는 개별 기기나 자동 검색 기기(고유한 IP 주소)에서 메트릭 수집을 지원합니다.

네트워크에 있는 기기 수에 따라 수집 전략을 고르세요. 또한 네트워크의 역동성(기기 추가 또는 제거 빈도)를 고려해야 합니다.

[개별 기기 모니터링](#monitoring-individual-devices)
: 작고 대부분 정적인 네트워크의 경우.

[Autodiscovery](#autodiscovery)
: 더 크거나 동적인 네트워크의 경우.

수집 전략에 관계없이 Datadog의 [sysObjectID 매핑된 기기 프로필][2]을 활용해 자동으로 기기에서 관련 메트릭을 수집합니다.

### 개별 기기 모니터링 {#monitoring-individual-devices}

개별 기기 모니터링 방법:

- IP 주소와 추가 기기 메타데이터(태그로)를 `snmp.d/conf.yaml` 파일에 포함한 후, 이를 [Agent's configuration directory][3]의 루트에 있는 `conf.d/` 폴더에 배치하세요. 사용 가능한 모든 구성 옵션은 [샘플 snmp.d/conf.yaml][4]을 참조하세요.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- SNMPv2의 경우, 기기의 IP 주소와 _커뮤니티 문자열_을 지정하는 인스턴스를 구성하세요.

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

- SNMPv3의 경우, 기기의 IP 주소와 적절한 SNMPv3 자격 증명을 지정하는 인스턴스를 구성하세요. 예를 들어, `user`, `authProtocol`, `authKey`, `privProtocol`, `privKey`와 같이 설정할 수 있습니다.

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

- [Agent를 재시작][5]하세요.

설정 후 Agent가 기기를 [Datadog 지원 기기 프로필][6] 중 하나와 일치시켜 관련 메트릭을 수집합니다.

설정을 확장하는 방법:

* 네트워크의 더 많은 기기로부터 메트릭을 수집하기 위해 인스턴스를 추가하세요.
* 동적 네트워크 전반의 많은 기기에서 메트릭을 수집해야 하는 경우, [Autodiscovery](#autodiscovery)를 사용하세요.

### Autodiscovery {#autodiscovery}

개별 기기를 지정하는 대신 Autodiscovery를 사용해 네트워크에서 모든 기기를 자동 탐지할 수 있습니다.

Autodiscovery는 구성된 서브넷의 각 IP를 폴링하고 기기로부터 응답을 확인합니다. 그 후, Datadog Agent는 발견된 기기의 `sysObjectID`를 조회하고 이를 [Datadog의 지원 기기 프로필][6] 중 하나에 매핑합니다. 프로필에는 다양한 유형의 기기에 대해 수집할 미리 정의된 메트릭 목록이 포함되어 있습니다.

Network Device Monitoring 및 Autodiscovery를 사용하려면 다음 단계를 따르세요.

1. Datadog Agent를 v7.27+로 설치하거나 업그레이드합니다. 플랫폼별 지침은 [Datadog Agent][7] 문서를 참조하세요.

2. [`datadog.yaml`][8] Agent 구성 파일을 수정하여 Datadog이 스캔할 모든 서브넷을 포함합니다. 다음 샘플 구성은 Autodiscovery를 위한 필수 파라미터, 기본값 및 예제를 제공합니다.

3. 필요 시, Agent의 Autodiscovery 중에 기기의 [중복 제거][11]를 활성화합니다. 이 기능은 기본적으로 비활성화되어 있으며 Agent 버전 `7.67+`이 필요합니다.

   ```yaml
   network_devices:
     autodiscovery:
       use_deduplication: true
   ```

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
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
    ## use_deduplication - boolean - optional - default: false
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

**참고**: Datadog Agent는 발견된 각 IP에 대해 SNMP 검사를 자동으로 구성합니다. 발견된 기기는 SNMP를 사용하여 폴링할 때 성공적으로 응답하는 IP입니다.

**참고**: 이 구문을 사용하려면 Agent 7.54+여야 합니다. 이전 버전은 [이전 config_template.yaml][9]을 참조하세요.

### 인터페이스 속도 재정의 {#override-interface-speed}

기본적으로 SNMP 검사는 기기에서 감지된 인터페이스 속도를 보고합니다. 물리적 포트 속도가 실제 회선 대역폭과 다를 경우, 예를 들어 50 Mbps 회선에 대해 프로비저닝된 1 Gbps 물리적 포트의 경우, `interface_configs`를 사용하여 특정 인터페이스의 수신 및 송신 속도를 재정의할 수 있습니다.

인스턴스 구성에 `interface_configs`를 `snmp.d/conf.yaml`에 추가하세요.

```yaml
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    interface_configs:
      - match_field: name      # match by interface name or ifIndex
        match_value: eth0      # case-sensitive
        in_speed: 50000000     # inbound speed in bytes per second (50 Mbps)
        out_speed: 50000000    # outbound speed in bytes per second (50 Mbps)
```

사용 가능한 모든 `interface_configs` 옵션은 [샘플 snmp.d/conf.yaml][4]을 참조하세요.

## 유효성 검사 {#validation}

[Agent의 상태 하위 명령을 실행][10]한 후, 검사 섹션에서 `snmp`를 찾으세요.

## 추가 자료 {#further-reading}

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
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L4036