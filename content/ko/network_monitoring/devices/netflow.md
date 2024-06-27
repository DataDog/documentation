---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: 네트워크 장치 모니터링 프로필 사용
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: 블로그
  text: Datadog로 NetFlow 트래픽 데이터 모니터링
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
is_beta: true
title: NetFlow 모니터링
---

## 개요

Datadog에서 NetFlow 모니터링을 사용해 Netflow 지원 장치의 기록을 모니터링하고 시각화하세요.

## 설치

네트워크 장치 모니터링과 NetFlow 모니터링을 사용하려면 [에이전트[1] 버전 7.45 이상을 사용하고 있는지 확인하세요.

**참고**: [네트워크 모니터링을 통한 메트릭 수집][2]을 설정하는 것은 NetFlow 데이터 전송을 위한 필수 요건은 아닙니다. 하지만 이는 강력한 권장 사항입니다. 이 추가 데이터가 장치 이름, 모델, 공급사 및 인바운드/아웃바운드 인터페이스 이름 등의 정보를 통해 기록을 더 풍부하게 만들어줄 수 있기 때문입니다.

## 설정

NetFlow, sFlow 또는 IPFIX를 에이전트 NetFlow 서버로 전송하도록 장치를 설정하려면, 장치가 특히 `flow_type` 및 `port`를 포함해 Datadog 에이전트가 설치된 IP 주소에 트래픽을 전송하도록 설정되어 있어야 합니다.

NetFlow를 활성화하려면 [`datadog.yaml`][3] 에이전트 설정 파일을 편집합니다.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices must send traffic to this port
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

변경 사항을 저장한 후 [에이전트트 재시작][4]합니다.

## 집계

Datadog 에이전틑 자동으로 수신한 NetFlow 데이터를 집계하여 플랫폼에 전송되는 기록의 수를 제한하는 한편 대부분의 정보를 유지합니다. 기본적으로 동일한 식별 정보(원본 및 대상 주소와 포트, 프로토콜 등)를 공유하는 기록이 함께 집계되는 동안 5분의 간격이 있습니다. 또한 Datadog 에이전트는 임시 포트를 탐지하고 제거할 수 있습니다. 그 결과 `port:*` 포함 흐름을 볼 수 있습니다.

## 보강

NetFlow 데이터는 Datadog 백엔드에서 처리되고 장치와 인터페이스의 가용 메타데이터로 보강됩니다. 보강은 NetFlow 내보내기 주체 IP 및 인터페이스 인덱스를 기준으로 합니다. 재사용된 사설 IP 간 충돌을 막기 위해 각 에이전트 구성 파일(`network_devices.namespace` 설정 사용)에 대해 각기 다른 `namespace`를 설정할 수 있습니다.

NetFlow 내보내기 주체 IP가 장치 IP 중 하나이지만 SNMP 통합에서 설정되지 않았다면 Datadog는 내보내기 주체 IP가 속한 장치를 찾으려 시도합니다. 일치 항목이 고유한 경우에 한해 이 정보로 NetFlow 데이터를 보강할 수 있습니다.

## 시각화

[네트워크 장치 페이지][5]에서 NetFlow 페이지를 찾을 수 있습니다.
{{< img src="network_device_monitoring/netflow/netflow_page.png" alt="NetFlow Page" >}}

더 정확한 쿼리와 기타 데이터 원본과의 연계를 위해 이 데이터를 대시보드와 노트북 등에서도 사용할 수 있습니다.
{{< img src="network_device_monitoring/netflow/notebook.png" alt="Notebook" >}}

## 보존

NetFlow 데이터는 기본적으로 30일 동안 보존됩니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ko/network_monitoring/devices/snmp_metrics/
[3]: /ko/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/infrastructure/devices?facets=&viewTab=netflow