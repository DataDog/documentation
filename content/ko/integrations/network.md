---
app_id: system
categories:
- network
custom_kind: 통합
description: 바이트 및 패킷 입/출력, 연결 상태, 왕복 시간(RTT)을 추적합니다. and more.
integration_version: 5.3.0
media: []
supported_os:
- linux
- macos
- windows
title: 네트워크
---
![Network Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png)

## 개요

네트워크 점검에서는 호스트 운영 시스템에서 TCP/IP 통계를 수집합니다.

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

네트워크 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

이 통합으로 메트릭을 수집하려면 호스트에 conntrack 모듈이 활성화되어 있는지 확인해야 합니다. 활성화되어 있지 않은 경우에는 다음을 실행하세요.

```shell
sudo modprobe nf_conntrack
```

*참고*: 에이전트 이미지에 conntrack 바이너리 설치가 필요할 수 있습니다.

### 설정

1. Agent는 기본적으로 네트워크 검사를 활성화하나, 검사를 직접 구성하려면 [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `network.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 network.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default)을 참조하세요.

1. [Agent를 다시 시작](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)하여 변경 사항을 적용합니다.

**참고**:

액세스 권한이 있는 conntrack을 실행해야 가져올 수 있는 메트릭이 일부 있을 수 있습니다.

Linux: 이 작업을 진행하려면 다음 sudoers를 구성하세요.

```shell
dd-agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

#### Kubernetes

Kubernetes v1.11 이하, 또는 Kubernetes v1.11+ 이상에서 `host` 네트워킹 모드를 사용하는 경우 기본적으로 Conntrack 메트릭을 사용할 수 있습니다.

[AWS ENA 메트릭](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-network-performance-ena.html) 수집 방법

- `collect_aws_ena_metrics: true`를 사용해 `network` 점검을 업데이트하여 AWS ENA 메트릭을 활성화합니다.
- Agent 컨테이너를 업데이트하여 `host` 네트워크 모드를 사용하고 `NET_ADMIN` 기능을 추가합니다.

Datadog [Helm Chart](https://docs.datadoghq.com/containers/kubernetes/installation/?tab=helm#installation) 배포의 경우, 차트 값을 다음으로 업데이트합니다.

```yaml
datadog:
  # Enable AWS ENA metrics collection for network check
  confd:
    network.yaml: |-
      init_config:
      instances:
        - collect_aws_ena_metrics: true

# Have agent containers use host network with NET_ADMIN capability
agents:
  useHostNetwork: true
  containers:
    agent:
      securityContext:
        capabilities:
          add:
            - NET_ADMIN

```

DaemonSet를 사용해 수동으로 에이전트를 배포한 경우, `datadog` DaemonSet 패치를 적용합니다.

```yaml
spec:
  template:
    spec:
      dnsPolicy: ClusterFirstWithHostNet
      hostNetwork: true
      containers:
        - name: agent
          ports:
          - containerPort: 8125
            hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          securityContext:
            capabilities:
              add:
              - NET_ADMIN
```

**참고**: `hostNetwork: true`의 경우 모든 컨테이너에 적용되기 때문에 DaemonSet의 다른 컨테이너에 `hostPort: 8125`를 추가해야 할 수 있습니다.

### 검증

[Agent `status` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `network`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **system.net.aws.ec2.bw_in_allowance_exceeded** <br>(gauge) | 인바운드 집계 대역폭이 인스턴스의 최대치를 초과하여 조절된(셰이핑된) 패킷 수.<br>_packet 으로 표시됨_ |
| **system.net.aws.ec2.bw_out_allowance_exceeded** <br>(gauge) | 아웃바운드 집계 대역폭이 인스턴스의 최대치를 초과하여 조절된(셰이핑된) 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.aws.ec2.conntrack_allowance_available** <br>(gauge) | 추적 연결 허용치에 도달하기 전까지 생성할 수 있는 추적 연결 수.<br>_connection으로 표시됨_ |
| **system.net.aws.ec2.conntrack_allowance_exceeded** <br>(gauge) | 연결 추적이 인스턴스에 대한 최대치를 초과하여 새 연결을 생성할 수 없기 때문에 조절된(셰이핑된) 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.aws.ec2.linklocal_allowance_exceeded** <br>(gauge) | 로컬 프록시 서비스에 대한 트래픽의 PPS가 네트워크 인터페이스의 최대치를 초과하여 조절된(셰이핑된) 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.aws.ec2.pps_allowance_exceeded** <br>(gauge) | 양방향 PPS가 인스턴스의 최대치를 초과하여 조절된(셰이핑된) 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.iface.mtu** <br>(gauge) | 네트워크 인터페이스의 최대 전송 유닛(MTU)(Linux만 해당).<br>_unit으로 표시됨_ |
| **system.net.iface.tx_queue_len** <br>(gauge) | 네트워크 인터페이스의 전송 대기열 길이(Linux만 해당).<br>_unit으로 표시됨_ |
| **system.net.iface.num_tx_queues** <br>(gauge) | 네트워크 인터페이스의 전송 대기열 수(Linux만 해당).<br>_unit으로 표시됨_ |
| **system.net.iface.num_rx_queues** <br>(gauge) | 네트워크 인터페이스의 수신 대기열 수(Linux만 해당).<br>_unit으로 표시됨_ |
| **system.net.iface.up** <br>(gauge) | 네트워크 인터페이스가 작동 중인지를 나타냄(Linux만 해당).|
| **system.net.bytes_rcvd** <br>(gauge) | 이 장치가 초당 수신한 바이트 수.<br>_byte로 표시됨_ |
| **system.net.bytes_sent** <br>(gauge) | 이 장치가 초당 전송한 바이트 수.<br>_byte로 표시됨_ |
| **system.net.conntrack.acct** <br>(gauge) | 연결 추적 플로 어카운팅(flow accounting)의 활성화 여부를 결정하는 부울. 플로당 64비트 바이트 및 패킷 카운터가 추가됩니다.<br>_unit으로 표시됨_ |
| **system.net.conntrack.buckets** <br>(gauge) | 해시 테이블의 크기.<br>_unit으로 표시됨_ |
| **system.net.conntrack.checksum** <br>(gauge) | 수신 패킷의 체크섬 검증 여부를 결정하는 부울.<br>_unit으로 표시됨_ |
| **system.net.conntrack.count** <br>(gauge) | Conntrack 테이블의 현재 연결 수.<br>_connection으로 표시됨_ |
| **system.net.conntrack.drop** <br>(count) | Conntrack 테이블의 삭제 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.early_drop** <br>(count) | Conntrack 테이블의 초기 삭제 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.error** <br>(count) | Conntrack 테이블의 오류 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.events** <br>(count) | Ctnetlink를 통해 연결 추적 코드가 사용자 공간에 연결 추적 이벤트를 제공할지 여부를 결정하는 부울.<br>_unit으로 표시됨_ |
| **system.net.conntrack.events_retry_timeout** <br>(gauge) | <br>_unit으로 표시됨_ |
| **system.net.conntrack.expect_max** <br>(gauge) | 예상 연결 테이블의 크기.<br>_unit으로 표시됨_ |
| **system.net.conntrack.found** <br>(count) | 현재 할당된 플로 엔트리의 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.generic_timeout** <br>(gauge) | 일반 타임아웃의 기본값. 계층 4의 알 수 없는/지원되지 않는 프로토콜을 나타냅니다.<br>_unit으로 표시됨_ |
| **system.net.conntrack.helper** <br>(gauge) | 자동 Conntrack 도우미 할당 활성화 여부를 결정하는 부울.<br>_unit으로 표시됨_ |
| **system.net.conntrack.icmp_timeout** <br>(gauge) | ICMP 타임아웃의 기본값.<br>_second로 표시됨_ |
| **system.net.conntrack.ignore** <br>(count) | Conntrack 테이블에서 무시된 항목의 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.invalid** <br>(count) | Conntrack 테이블에서 유효하지 않은 항목의 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.insert** <br>(count) | Conntrack 테이블에서 삽입된 항목의 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.insert_failed** <br>(count) | Conntrack 테이블에서 삽입 실패한 항목의 수.<br>_unit으로 표시됨_ |
| **system.net.conntrack.log_invalid** <br>(gauge) | 값으로 지정된 유형의 유효하지 않은 패킷을 로깅합니다.<br>_unit으로 표시됨_ |
| **system.net.conntrack.max** <br>(gauge) | Conntrack 테이블 최대 용량.<br>_connection으로 표시됨_ |
| **system.net.conntrack.search_restart** <br>(count) | <br>_unit으로 표시됨_ |
| **system.net.conntrack.tcp_be_liberal** <br>(gauge) | 윈도우 범위 밖의 RST 세그먼트만 INVALID로 표시하는 부울.<br>_unit으로 표시됨_ |
| **system.net.conntrack.tcp_loose** <br>(gauge) | 이미 설정된 연결을 가져올지 여부를 결정하는 부울.<br>_unit으로 표시됨_ |
| **system.net.conntrack.tcp_max_retrans** <br>(gauge) | 대상에서 (허용 가능한) ACK를 수신하지 않고 재전송할 수 있는 최대 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.conntrack.tcp_timeout_close** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_close_wait** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_established** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_fin_wait** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_last_ack** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_max_retrans** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_syn_recv** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_syn_sent** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_time_wait** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_unacknowledged** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.tcp_timeout_stream** <br>(gauge) | <br>_second로 표시됨_ |
| **system.net.conntrack.timestamp** <br>(gauge) | 연결 추적 플로 타임스탬프 활성화 여부를 결정하는 부울.<br>_unit으로 표시됨_ |
| **system.net.packets_in.count** <br>(gauge) | 인터페이스에서 수신한 데이터 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.packets_in.drop** <br>(gauge) | 장치 드라이버가 감지한 패킷 수신 삭제 수. 이 메트릭은 Linux 또는 Windows에서만 사용할 수 있습니다.<br>_packet으로 표시됨_ |
| **system.net.packets_in.error** <br>(gauge) | 장치 드라이버가 감지한 패킷 수신 오류 수.<br>_error로 표시됨_ |
| **system.net.packets_out.count** <br>(gauge) | 인터페이스가 송신한 데이터 패킷 수.<br>_packet으로 표시됨_ |
| **system.net.packets_out.drop** <br>(gauge) | 장치 드라이버가 감지한 패킷 송신 삭제 수. 이 메트릭은 Linux 또는 Windows에서만 사용할 수 있습니다.<br>_packet으로 표시됨_ |
| **system.net.packets_out.error** <br>(gauge) | 장치 드라이버가 감지한 패킷 송신 오류 수.<br>_error로 표시됨_ |
| **system.net.ip.in_receives** <br>(gauge) | 수신 IP 데이터그램 수(삭제된 데이터그램 포함)(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_receives.count** <br>(count) | 수신 IP 데이터그램 수(삭제된 데이터그램 포함)(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_header_errors** <br>(gauge) | IP 헤더 오류로 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_header_errors.count** <br>(count) | IP 헤더 오류로 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_addr_errors** <br>(gauge) | 유효하지 않은 IP 주소로 인해 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_addr_errors.count** <br>(count) | 유효하지 않은 IP 주소로 인해 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_unknown_protos** <br>(gauge) | 알 수 없는 IP 프로토콜로 인해 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_unknown_protos.count** <br>(count) | 알 수 없는 IP 프로토콜로 인해 폐기한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_discards** <br>(gauge) | 버퍼 문제로 폐기했지만 유효한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_discards.count** <br>(count) | 버퍼 문제로 폐기했지만 유효한 수신 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_delivers** <br>(gauge) | IP 사용자 프로토콜로 전달된 수신 IP 데이터그램의 수(ICMP 포함)(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_delivers.count** <br>(count) | IP 사용자 프로토콜로 전달된 수신 IP 데이터그램의 수(ICMP 포함)(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.out_requests** <br>(gauge) | 출력 IP 데이터그램 수(Linux만 해당)<br>_datagram으로 표시됨_ |
| **system.net.ip.out_requests.count** <br>(count) | 출력 IP 데이터그램 수(Linux만 해당)<br>_datagram으로 표시_ |
| **system.net.ip.out_discards** <br>(gauge) | 버퍼 문제로 폐기했지만 유효한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.out_discards.count** <br>(count) | 버퍼 문제로 폐기했지만 유효한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.out_no_routes** <br>(gauge) | 경로를 찾을 수 없어 폐기한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.out_no_routes.count** <br>(count) | 경로를 찾을 수 없어 폐기한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.forwarded_datagrams** <br>(gauge) | 포워드된 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.forwarded_datagrams.count** <br>(count) | 포워드된 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.reassembly_timeouts** <br>(gauge) | 재조립 중 트리거된 IP 타임아웃 횟수(Linux만 해당).<br>_timeout으로 표시됨_ |
| **system.net.ip.reassembly_timeouts.count** <br>(count) | 재조립 중 트리거된 IP 타임아웃 횟수(Linux만 해당).<br>_timeout으로 표시_ |
| **system.net.ip.reassembly_requests** <br>(gauge) | 재조립이 필요한 수신된 IP 조각의 수(Linux만 해당).|
| **system.net.ip.reassembly_requests.count** <br>(count) | 재조립이 필요한 수신된 IP 조각의 수(Linux만 해당).|
| **system.net.ip.reassembly_oks** <br>(gauge) | 성공적으로 재조립된 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.reassembly_oks.count** <br>(count) | 성공적으로 재조립된 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.reassembly_fails** <br>(gauge) | IP 재조립 중 실패 횟수(Linux만 해당).|
| **system.net.ip.reassembly_fails.count** <br>(count) | IP 재조립 중 실패 횟수(Linux만 해당).|
| **system.net.ip.reassembly_overlaps** <br>(gauge) | 재조립 중 중첩된 입력 IP 조각 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.reassembly_overlaps.count** <br>(count) | 재조립 중 중첩된 입력 IP 조각 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.fragmentation_oks** <br>(gauge) | 성공적으로 조각화한 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.fragmentation_oks.count** <br>(count) | 성공적으로 조각화한 IP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.fragmentation_fails** <br>(gauge) | 조각화할 수 없어서 폐기한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.fragmentation_fails.count** <br>(count) | 조각화할 수 없어서 폐기한 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.fragmentation_creates** <br>(gauge) | IP 조각화 결과로 생성된 출력 IP 조각의 수(Linux만 해당).|
| **system.net.ip.fragmentation_creates.count** <br>(count) | IP 조각화 결과로 생성된 출력 IP 조각의 수(Linux만 해당).|
| **system.net.ip.in_no_routes** <br>(gauge) | 경로를 찾을 수 없어 폐기한 입력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_no_routes.count** <br>(count) | 경로를 찾을 수 없어 폐기한 입력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_truncated_pkts** <br>(gauge) | 실제 크기가 IPv4 헤더의 Total Length 필드보다 작은 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_truncated_pkts.count** <br>(count) | 실제 크기가 IPv4 헤더의 Total Length 필드보다 작은 출력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.ip.in_csum_errors** <br>(gauge) | checksum이 올바르지 않은 입력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.ip.in_csum_errors.count** <br>(count) | checksum이 올바르지 않은 입력 IP 데이터그램의 수(Linux만 해당).<br>_datagram으로 표시_ |
| **system.net.tcp.active_opens** <br>(gauge) | TCP 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp.active_opens.count** <br>(count) | TCP 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp.passive_opens** <br>(gauge) | TCP 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp.passive_opens.count** <br>(count) | TCP 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp.attempt_fails** <br>(gauge) | TCP 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Linux 또는 Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp.attempt_fails.count** <br>(count) | TCP 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Linux 또는 Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp.established_resets** <br>(gauge) | TCP 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp.established_resets.count** <br>(count) | TCP 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Linux 또는 Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp.current_established** <br>(gauge) | 현재 상태가 ESTABLISHED 또는 CLOSE-WAIT인 TCP 연결 수(Linux 또는 Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp.connections** <br>(gauge) | 수신 대기 연결을 제외한 모든 상태의 TCP 연결 수.<br>_segment로 표시됨_ |
| **system.net.tcp.in_errors** <br>(gauge) | 오류(예: 잘못된 TCP checksum) 상태로 수신된 총 세그먼트 수(Linux 또는 Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.in_errors.count** <br>(count) | 오류(예: 잘못된 TCP checksum) 상태로 수신된 총 세그먼트 수(Linux 또는 Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp.out_resets** <br>(gauge) | RST 플래그를 포함하여 전송된 TCP 세그먼트 수(Linux 또는 Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.out_resets.count** <br>(count) | RST 플래그를 포함하여 전송된 TCP 세그먼트 수(Linux 또는 Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp.in_csum_errors** <br>(gauge) | TCP checksum 값이 올바르지 않은 수신 TCP 세그먼트 수(Linux만 해당)<br>_packet으로 표시됨_ |
| **system.net.tcp.in_csum_errors.count** <br>(count) | TCP checksum 값이 올바르지 않은 수신 TCP 세그먼트 수(Linux만 해당)<br>_packet으로 표시_ |
| **system.net.tcp.failed_retransmits** <br>(gauge) | 재전송에 실패한 TCP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.failed_retransmits.count** <br>(count) | 재전송에 실패한 TCP 패킷 수(Linux만 해당).<br>_packet으로 표시_ |
| **system.net.tcp.in_segs** <br>(gauge) | 수신된 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.in_segs.count** <br>(count) | 수신된 총 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.out_segs** <br>(gauge) | 송신된 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.out_segs.count** <br>(count) | 송신된 총 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.rcv_packs** <br>(gauge) | 수신된 TCP 패킷 수(BSD만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.retrans_packs** <br>(gauge) | 재송신된 TCP 패킷 수(BSD만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.retrans_segs** <br>(gauge) | 재송신된 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.retrans_segs.count** <br>(count) | 재송신된 총 TCP 세그먼트 수(Linux, Solaris 또는 Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp.sent_packs** <br>(gauge) | 송신된 TCP 패킷 수(BSD만 해당).<br>_packet으로 표시_ |
| **system.net.tcp.listen_overflows** <br>(gauge) | 연결이 수락 버퍼를 초과한 횟수(Linux만 해당). Agent v5.14.0부터 사용 가능.|
| **system.net.tcp.listen_overflows.count** <br>(count) | 연결이 수락 버퍼를 초과한 총 횟수(Linux만 해당).|
| **system.net.tcp.listen_drops** <br>(gauge) | Listen 상태에서 연결이 삭제된 횟수(Linux만 해당). Agent v5.14.0부터 사용 가능.|
| **system.net.tcp.listen_drops.count** <br>(count) | Listen 상태에서 연결이 삭제된 총 횟수(Linux만 해당).|
| **system.net.tcp.backlog_drops** <br>(gauge) | TCP 백로그에 공간이 부족하여 삭제된 패킷 수(Linux만 해당). Agent v5.14.0부터 사용 가능.<br>_packet으로 표시됨_ |
| **system.net.tcp.backlog_drops.count** <br>(count) | TCP 백로그에 공간이 부족하여 삭제된 총 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.prune_called** <br>(gauge) | TCP prune이 호출된 횟수(Linux만 해당).|
| **system.net.tcp.prune_called.count** <br>(count) | TCP prune이 호출된 총 횟수(Linux만 해당).|
| **system.net.tcp.prune_rcv_drops** <br>(gauge) | 실패한 prune 후 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.prune_rcv_drops.count** <br>(count) | 실패한 prune 후 삭제된 총 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.prune_ofo_called** <br>(gauge) | 순서가 맞지 않는 대기열이 정리된 횟수(Linux만 해당).|
| **system.net.tcp.prune_ofo_called.count** <br>(count) | 순서가 맞지 않는 대기열이 정리된 총 횟수(Linux만 해당).|
| **system.net.tcp.paws_connection_drops** <br>(gauge) | PAWS가 삭제한 SYN-ACK 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.paws_connection_drops.count** <br>(count) | PAWS가 삭제한 SYN-ACK 총 패킷 수(Linux만 해당).|
| **system.net.tcp.paws_established_drops** <br>(gauge) | 설정된 연결에서 PAWS가 삭제한 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.paws_established_drops.count** <br>(count) | 설정된 연결에서 PAWS가 삭제한 총 패킷 수(Linux만 해당).|
| **system.net.tcp.syn_cookies_sent** <br>(gauge) | 전송된 SYN 쿠키 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.syn_cookies_sent.count** <br>(count) | 전송된 총 SYN 쿠키 패킷 수(Linux만 해당).|
| **system.net.tcp.syn_cookies_recv** <br>(gauge) | 수신된 SYN 쿠키 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.syn_cookies_recv.count** <br>(count) | 수신된 총 SYN 쿠키 패킷 수(Linux만 해당).|
| **system.net.tcp.syn_cookies_failed** <br>(gauge) | 검증 실패한 수신 SYN 쿠키 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.syn_cookies_failed.count** <br>(count) | 수신된 실패 SYN 쿠키 패킷 총 횟수(Linux만 해당).|
| **system.net.tcp.abort_on_timeout** <br>(gauge) | 타임아웃으로 인해 닫힌 소켓 수(최대 재송 도달 또는 tcp keepalive 타임아웃)(Linux만 해당).|
| **system.net.tcp.abort_on_timeout.count** <br>(count) | 타임아웃으로 인해 닫힌 소켓 총수(최대 재송 도달 또는 tcp keepalive 타임아웃)(Linux만 해당).|
| **system.net.tcp.syn_retrans** <br>(gauge) | 재송신된 SYN 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp.syn_retrans.count** <br>(count) | 재송신된 총 SYN 패킷 수(Linux만 해당).|
| **system.net.tcp.from_zero_window** <br>(gauge) | 제로 윈도우 상태를 종료하는 소켓 수(Linux만 해당).|
| **system.net.tcp.from_zero_window.count** <br>(count) | 제로 윈도우 상태를 종료하는 총 소켓 수(Linux만 해당).|
| **system.net.tcp.to_zero_window** <br>(gauge) | 제로 윈도우 상태에 진입하는 소켓 수(Linux만 해당).|
| **system.net.tcp.to_zero_window.count** <br>(count) | 제로 윈도우 상태에 진입하는 총 소켓 수(Linux만 해당).|
| **system.net.tcp.tw_reused** <br>(gauge) | 재사용된 TIME_WAIT 소켓 수(Linux만 해당).|
| **system.net.tcp.tw_reused.count** <br>(count) | 재사용된 총 TIME_WAIT 소켓 수(Linux만 해당).|
| **system.net.ip.reverse_path_filter** <br>(gauge) | 역방향 경로 필터가 삭제한 마션 패킷 수(Linux 전용).<br>_packet으로 표시됨_ |
| **system.net.ip.reverse_path_filter.count** <br>(count) | 역방향 경로 필터가 삭제한 총 마션 패킷 수(Linux 전용).<br>_packet으로 표시됨_ |
| **system.net.tcp.recv_q.95percentile** <br>(gauge) | TCP 수신 대기열 크기의 95백분위수.<br>_byte로 표시됨_ |
| **system.net.tcp.recv_q.avg** <br>(gauge) | 평균 TCP 수신 대기열 크기.<br>_byte로 표시됨_ |
| **system.net.tcp.recv_q.count** <br>(rate) | 연결률<br>_connection으로 표시됨_ |
| **system.net.tcp.recv_q.max** <br>(gauge) | 최대 TCP 수신 대기열 크기.<br>_byte로 표시됨_ |
| **system.net.tcp.recv_q.median** <br>(gauge) | TCP 수신 대기열 크기의 중앙값.<br>_byte로 표시됨_ |
| **system.net.tcp.send_q.95percentile** <br>(gauge) | TCP 전송 대기열 크기의 95백분위수.<br>_byte로 표시됨_ |
| **system.net.tcp.send_q.avg** <br>(gauge) | 평균 TCP 전송 대기열 크기.<br>_byte로 표시됨_ |
| **system.net.tcp.send_q.count** <br>(rate) | 연결률<br>_connection으로 표시_ |
| **system.net.tcp.send_q.max** <br>(gauge) | 최대 TCP 전송 대기열 크기.<br>_byte로 표시됨_ |
| **system.net.tcp.send_q.median** <br>(gauge) | TCP 전송 대기열 크기의 중앙값.<br>_byte로 표시됨_ |
| **system.net.tcp4.close** <br>(gauge) | 닫힌 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.close_wait** <br>(gauge) | 종료를 기다리는 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.closing** <br>(gauge) | 연결을 종료하는 TCP IPv4의 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.estab** <br>(gauge) | 열린 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.established** <br>(gauge) | Established 상태인 TCP IPv4 연결의 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.fin_wait_1** <br>(gauge) | 연결 종료 요청 또는 이전에 전송된 연결 종료 요청의 확인을 기다리는 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.fin_wait_2** <br>(gauge) | 연결 종료 요청을 기다리는 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.listen** <br>(gauge) | Listen 상태인 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.listening** <br>(gauge) | Listen 상태인 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.opening** <br>(gauge) | TCP IPv4 개시 연결 수. <br>_connection으로 표시됨_ |
| **system.net.tcp4.syn_recv** <br>(gauge) | 연결 요청 확인을 기다리는 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.syn_sent** <br>(gauge) | 연결 요청 매칭을 기다리는 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.time_wait** <br>(gauge) | 지연 패킷을 대기 중인 종료된 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.unconn** <br>(gauge) | 비연결 상태인 TCP IPv4 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp4.active_opens** <br>(gauge) | TCP IPv4 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp4.active_opens.count** <br>(count) | TCP IPv4 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp4.connections** <br>(gauge) | 수신 대기 연결을 제외한 모든 상태의 TCP 연결 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.passive_opens** <br>(gauge) | TCP IPv4 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp4.passive_opens.count** <br>(count) | TCP IPv4 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp4.attempt_fails** <br>(gauge) | TCP IPv4 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp4.attempt_fails.count** <br>(count) | TCP IPv4 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp4.established_resets** <br>(gauge) | TCP IPv4 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp4.established_resets.count** <br>(count) | TCP IPv4 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp4.current_established** <br>(gauge) | 현재 Established 상태인 TCP IPv4 연결 수(Windows 전용).<br>_segment로 표시됨_ |
| **system.net.tcp4.in_errors** <br>(gauge) | 오류(예: 잘못된 TCP IPv4 checksum) 상태로 수신된 총 세그먼트 수(Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp4.in_errors.count** <br>(count) | 오류(예: 잘못된 TCP IPv4 checksum) 상태로 수신된 총 세그먼트 수(Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp4.out_resets** <br>(gauge) | RST 플래그를 포함하여 전송된 TCP IPv4 세그먼트 수(Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp4.out_resets.count** <br>(count) | RST 플래그를 포함하여 전송된 TCP IPv4 세그먼트 수(Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp4.in_segs** <br>(gauge) | 수신된 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.in_segs.count** <br>(count) | 수신된 총 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.out_segs** <br>(gauge) | 송신된 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.out_segs.count** <br>(count) | 송신된 총 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.retrans_segs** <br>(gauge) | 재송신된 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp4.retrans_segs.count** <br>(count) | 재송신된 총 TCP IPv4 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.close** <br>(gauge) | 닫힌 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.close_wait** <br>(gauge) | 종료를 기다리는 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.closing** <br>(gauge) | 연결을 종료하는 TCP IPv6의 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.estab** <br>(gauge) | 열린 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.established** <br>(gauge) | Established 상태인 TCP IPv6 연결의 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.fin_wait_1** <br>(gauge) | 연결 종료 요청 또는 이전에 전송된 연결 종료 요청의 확인을 기다리는 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.fin_wait_2** <br>(gauge) | 연결 종료 요청을 기다리는 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.listen** <br>(gauge) | Listen 상태인 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.listening** <br>(gauge) | Listen 상태인 TCP IPv6 연결 수. <br>_connection으로 표시됨_ |
| **system.net.tcp6.opening** <br>(gauge) | TCP IPv6 개시 연결 수. <br>_connection으로 표시됨_ |
| **system.net.tcp6.syn_recv** <br>(gauge) | 연결 요청 확인을 기다리는 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.syn_sent** <br>(gauge) | 연결 요청 매칭을 기다리는 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.time_wait** <br>(gauge) | 지연 패킷을 대기 중인 종료된 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.unconn** <br>(gauge) | 비연결 상태인 TCP IPv6 연결 수.<br>_connection으로 표시됨_ |
| **system.net.tcp6.active_opens** <br>(gauge) | TCP IPv6 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp6.active_opens.count** <br>(count) | TCP IPv6 연결이 CLOSED 상태에서 SYN-SENT 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp6.connections** <br>(gauge) | 수신 대기 연결을 제외한 모든 상태의 TCP IPv6 연결 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.passive_opens** <br>(gauge) | TCP IPv6 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp6.passive_opens.count** <br>(count) | TCP IPv6 연결이 LISTEN 상태에서 SYN-RCVD 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp6.attempt_fails** <br>(gauge) | TCP IPv6 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp6.attempt_fails.count** <br>(count) | TCP IPv6 연결이 SYN-SENT 또는 SYN-RCVD 상태에서 CLOSED 상태로 직접 전환된 횟수와 SYN-RCVD 상태에서 LISTEN 상태로 직접 전환된 횟수를 더한 값(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp6.established_resets** <br>(gauge) | TCP IPv6 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시됨_ |
| **system.net.tcp6.established_resets.count** <br>(count) | TCP IPv6 연결이 ESTABLISHED 또는 CLOSE-WAIT 상태에서 CLOSED 상태로 직접 전환된 횟수(Windows만 해당).<br>_connection으로 표시_ |
| **system.net.tcp6.current_established** <br>(gauge) | 현재 Established 상태인 TCP IPv6 연결 수(Windows 전용).<br>_segment로 표시됨_ |
| **system.net.tcp6.in_errors** <br>(gauge) | 오류(예: 잘못된 TCP IPv6 checksum) 상태로 수신된 총 세그먼트 수(Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp6.in_errors.count** <br>(count) | 오류(예: 잘못된 TCP IPv6 checksum) 상태로 수신된 총 세그먼트 수(Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp6.out_resets** <br>(gauge) | RST 플래그를 포함하여 전송된 TCP IPv6 세그먼트 수(Windows만 해당).<br>_packet으로 표시됨_ |
| **system.net.tcp6.out_resets.count** <br>(count) | RST 플래그를 포함하여 전송된 TCP IPv6 세그먼트 수(Windows만 해당).<br>_packet으로 표시_ |
| **system.net.tcp6.in_segs** <br>(gauge) | 수신된 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.in_segs.count** <br>(count) | 수신된 총 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.out_segs** <br>(gauge) | 송신된 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.out_segs.count** <br>(count) | 송신된 총 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.retrans_segs** <br>(gauge) | 재송신된 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.tcp6.retrans_segs.count** <br>(count) | 재송신된 총 TCP IPv6 세그먼트 수(Windows만 해당).<br>_segment로 표시됨_ |
| **system.net.udp.in_datagrams** <br>(gauge) | UDP 사용자에게 전달된 UDP 데이터그램의 비율(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.in_datagrams.count** <br>(count) | UDP 사용자에게 전달된 총 UDP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.in_errors** <br>(gauge) | 대상 포트에 애플리케이션 없음 외의 이유로 전달되지 못한 수신 UDP 데이터그램의 비율(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.in_errors.count** <br>(count) | 대상 포트에 애플리케이션 없음 외의 이유로 전달되지 못한 총 수신 UDP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.no_ports** <br>(gauge) | 대상 포트에 애플리케이션이 없는 수신 UDP 데이터그램의 비율(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.no_ports.count** <br>(count) | 대상 포트에 애플리케이션이 없는 총 수신 UDP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.out_datagrams** <br>(gauge) | 이 엔터티에서 전송된 UDP 데이터그램의 비율(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.out_datagrams.count** <br>(count) | 이 엔터티에서 전송된 총 UDP 데이터그램 수(Linux만 해당).<br>_datagram으로 표시됨_ |
| **system.net.udp.rcv_buf_errors** <br>(gauge) | 수신 버퍼에 공간이 없어 손실된 UDP 데이터그램의 비율(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp.rcv_buf_errors.count** <br>(count) | 수신 버퍼에 공간이 없어 손실된 총 UDP 데이터그램 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp.snd_buf_errors** <br>(gauge) | 전송 버퍼에 공간이 없어 손실된 UDP 데이터그램의 비율(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp.snd_buf_errors.count** <br>(count) | 전송 버퍼에 공간이 없어 손실된 총 UDP 데이터그램 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp.in_csum_errors** <br>(gauge) | checksum 검증에 실패한 UDP 데이터그램의 비율(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp.in_csum_errors.count** <br>(count) | checksum 검증에 실패한 총 UDP 데이터그램의 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.udp4.connections** <br>(gauge) | 현재 열려 있는 UDP IPv4 소켓 수. <br>_connection으로 표시됨_ |
| **system.net.udp6.connections** <br>(gauge) | 현재 열려 있는 UDP IPv6 소켓 수. <br>_connection으로 표시됨_ |
| **system.net.ena.queue.rx_cnt** <br>(count) | 대기열이 수신한 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_bytes** <br>(count) | 대기열에 수신된 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.ena.queue.rx_bad_csum** <br>(count) | 대기열에 수신된 잘못된 checksum이 포함된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_good_csum** <br>(count) | 대기열에 수신된 올바른 checksum이 포함된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_csum_good** <br>(count) | 대기열에 수신된 정상 checksum이 포함된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_csum_unchecked** <br>(count) | 대기열에 수신된 미확인 checksum이 포함된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_rx_copybreak_pkt** <br>(count) | 대기열에 수신된 패킷 중 copybreak 임계값보다 작아 skb 헤더에 복사된 패킷 수(Linux만 해당).<br>_packet으로 표시_ |
| **system.net.ena.queue.rx_refil_partial** <br>(count) | 대기열에 RX 버퍼가 부분 할당된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.rx_page_alloc_fail** <br>(count) | Page 할당 실패 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.rx_skb_alloc_fail** <br>(count) | 소켓 버퍼 할당 실패 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.rx_dma_mapping_err** <br>(count) | RX 대기열의 DMA 매핑 오류 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.rx_bad_desc_num** <br>(count) | 수신된 디스크립터가 너무 많았던 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.rx_bad_req_id** <br>(count) | 수신 대기열에서 요청 ID가 유효하지 않았던 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.rx_empty_rx_ring** <br>(count) | 대기열 RX 링이 비어 있던 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_aborted** <br>(count) | XDP_ABORTED로 태그가 지정된 XPD 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_drop** <br>(count) | XDP_DROP로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_pass** <br>(count) | XDP_PASS로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_tx** <br>(count) | XDP_TX로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_invalid** <br>(count) | XDP_INVALID로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.rx_xdp_redirect** <br>(count) | XDP_REDIRECT로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.tx_cnt** <br>(count) | 대기열에서 전송한 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.tx_bytes** <br>(count) | 대기열에서 전송한 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.ena.queue.tx_dma_mapping_err** <br>(count) | TX 대기열의 DMA 매핑 오류 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.tx_bad_req_id** <br>(count) | 송신 대기열에서 요청 ID가 유효하지 않았던 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_queue_stop** <br>(count) | 송신 대기열이 가득 차서 중단된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_queue_wakeup** <br>(count) | 송신 대기열이 중단되었다가 재개된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_linearize** <br>(count) | 송신 대기열에서 skb가 선형화된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_linearize_failed** <br>(count) | 송신 대기열에서 skb 선형화 실패 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_doorbells** <br>(count) | 송신 대기열에서 Submission queue doorbell이 기록된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.tx_prepare_ctx_err** <br>(count) | 송신 대기열에서 tx 준비가 실패한 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.ena.queue.tx_llq_buffer_copy** <br>(count) | Low Latency Queue를 통해 skb 헤더가 복사된 횟수(Linux만 해당).<br>_time으로 표시됨_. |
| **system.net.ena.queue.tx_missed_tx** <br>(count) | 송신 대기열에서 타임아웃된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.ena.queue.tx_unmask_interrupt** <br>(count) | 송신 대기열에서 인터럽트가 언마스킹된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_napi_comp** <br>(count) | 대기열에서 napi_complete가 호출된 횟수<br>_time으로 표시됨_ |
| **system.net.ena.queue.tx_tx_poll** <br>(count) | 대기열에서 NAPI 핸들러가 실행 예약된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.tx_timeout** <br>(count) | 송신 타임 아웃 발생 횟수(Linux만 해당).<br>_timeout으로 표시됨_ |
| **system.net.ena.suspend** <br>(count) | 장치가 절전 모드(Suspend) 상태가 된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.resume** <br>(count) | 장치가 다시 시작된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.ena.wd_expired** <br>(count) | Watchdog keep-alive 이벤트가 만료된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.virtio_net.queue.rx_drops** <br>(count) | 수신 대기열에서 삭제된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.rx_kicks** <br>(count) | 수신 대기열에서 하이퍼바이저로 킥(kick)을 전송한 횟수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.virtio_net.queue.rx_packets** <br>(count) | 대기열이 수신한 패킷 (Linux만 해당).<br>_packet으로 표시_ |
| **system.net.virtio_net.queue.rx_bytes** <br>(count) | 대기열에 수신된 바이트 수(Linux만 해당).<br>_byte로 표시_ |
| **system.net.virtio_net.queue.rx_xdp_drops** <br>(count) | 수신 대기열에서 XDP_DROP로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.rx_xdp_redirects** <br>(count) | 수신 대기열에서 XDP_REDIRECT로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.rx_xdp_tx** <br>(count) | 수신 대기열에서 XDP_TX로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.tx_kicks** <br>(count) | 송신 대기열에서 하이퍼바이저로 킥(kick)을 전송한 횟수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.virtio_net.queue.tx_packets** <br>(count) | 송신 대기열에서 전송한 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.tx_bytes** <br>(count) | 송신 대기열에서 전송한 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.virtio_net.queue.tx_xdp_tx** <br>(count) | 송신 대기열에서 XDP_TX로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.virtio_net.queue.tx_xdp_tx_drops** <br>(count) | 송신 대기열에서 XDP_DROP으로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.queue.rx_bytes** <br>(count) | 대기열에 수신된 바이트 수(Linux만 해당).<br>_byte로 표시_ |
| **system.net.hv_netvsc.queue.rx_packets** <br>(count) | 대기열이 수신한 패킷 수(Linux만 해당).<br>_packet으로 표시_ |
| **system.net.hv_netvsc.queue.rx_xdp_drop** <br>(count) | 수신 대기열에서 XDP_DROP로 태그가 지정된 XDP 패킷 수(Linux만 해당).<br>_packet으로 표시_ |
| **system.net.hv_netvsc.queue.tx_bytes** <br>(count) | 대기열에서 전송한 바이트 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.queue.tx_packets** <br>(count) | 대기열에서 전송한 패킷 수(Linux만 해당).<br>_packet으로 표시_ |
| **system.net.hv_netvsc.cpu.rx_packets** <br>(count) | CPU가 처리한 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.cpu.vf_rx_packets** <br>(count) | CPU가 가상 함수(Virtual Function)를 사용해 처리한 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.cpu.rx_bytes** <br>(count) | CPU가 처리한 수신 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.hv_netvsc.cpu.vf_rx_bytes** <br>(count) | CPU가 가상 함수(Virtual Function)를 사용해 처리한 수신 패킷 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.hv_netvsc.cpu.tx_packets** <br>(count) | CPU가 처리한 전송 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.cpu.vf_tx_packets** <br>(count) | CPU가 가상 함수(Virtual Function)를 사용해 처리한 전송 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.cpu.tx_bytes** <br>(count) | CPU가 처리한 전송 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.hv_netvsc.cpu.vf_tx_bytes** <br>(count) | CPU가 가상 함수(Virtual Function)를 사용해 처리한 전송 패킷 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.hv_netvsc.tx_scattered** <br>(count) | 최대 페이지 카운트를 초과하는 송신 횟수. 이 경우 필요한 페이지 수를 줄이기 위해 소켓 버퍼 선형화가 트리거됩니다(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.tx_no_memory** <br>(count) | 할당 오류로 인한 송신 실패 횟수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.tx_no_space** <br>(count) | 링 버퍼가 가득 차서 실패한 송신 횟수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.tx_too_big** <br>(count) | 소켓 버퍼 선형화 이후에도 최대 페이지 카운트를 초과하여 삭제된 전송 횟수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.tx_busy** <br>(count) | 대기열이 혼잡하여 실패한 송신 횟수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.hv_netvsc.tx_send_full** <br>(count) | 전송 버퍼가 가득 찼던 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.hv_netvsc.rx_comp_busy** <br>(count) | 실패한 완료 요청 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.hv_netvsc.rx_no_memory** <br>(count) | 할당 오류로 인한 수신 실패 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.hv_netvsc.stop_queue** <br>(count) | 대기열이 중단된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.hv_netvsc.wake_queue** <br>(count) | 대기열이 재개된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.rx_posted_desc** <br>(count) | 수신 대기열에 게시된 디스크립터 수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.rx_completed_desc** <br>(count) | 수신 대기열에서 완료된 디스크립터 수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.rx_bytes** <br>(count) | 수신 대기열에서 전송한 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.gve.queue.rx_dropped_pkt** <br>(count) | 디스크립터 오류로 인해 삭제된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.rx_copybreak_pkt** <br>(count) | copybreak 임계값보다 작아 소켓 버퍼 헤더에 복사된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.rx_copied_pkt** <br>(count) | 복사된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.rx_queue_drop_cnt** <br>(count) | 삭제된 패킷 수. NIC 통계치(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.rx_no_buffers_posted** <br>(count) | 디스크립터 게시를 위한 가용 버퍼가 없었던 횟수. NIC 통계치(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.rx_drops_packet_over_mru** <br>(count) | Maximum Receive Unit을 초과하여 삭제된 패킷 수. NIC 통계치(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.rx_drops_invalid_checksum** <br>(count) | 유효하지 않은 checksum으로 인해 삭제된 패킷 수. NIC 통계치(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.queue.tx_posted_desc** <br>(count) | 송신 대기열에 게시된 디스크립터 수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.tx_completed_desc** <br>(count) | 송신 대기열에서 완료된 디스크립터 수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.tx_bytes** <br>(count) | 송신 대기열에서 전송한 바이트 수(Linux만 해당).<br>_byte로 표시_ |
| **system.net.gve.queue.tx_wake** <br>(count) | 송신 대기열이 재개된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.tx_stop** <br>(count) | 송신 대기열이 중단된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.queue.tx_event_counter** <br>(count) | 이 송신 대기열의 이벤트 수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.gve.queue.tx_dma_mapping_error** <br>(count) | 송신 대기열의 Direct Memory Access 매핑 오류 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.gve.tx_timeouts** <br>(count) | 송신 대기열이 타임 아웃된 횟수(Linux만 해당).<br>_time으로 표시됨_ |
| **system.net.gve.rx_skb_alloc_fail** <br>(count) | 수신 대기열의 소켓 버퍼 할당 실패 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.gve.rx_buf_alloc_fail** <br>(count) | 수신 대기열의 버퍼 할당 실패 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.gve.rx_desc_err_dropped_pkt** <br>(count) | 디스크립터 오류로 인해 삭제된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.gve.page_alloc_fail** <br>(count) | Page 할당 오류 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.gve.dma_mapping_error** <br>(count) | Direct Memory Access 매핑 오류 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_arfs_err** <br>(count) | 플로 테이블에 추가하지 못한 플로 규칙의 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_buff_alloc_err** <br>(count) | 링 i에서 수신된 패킷(또는 SKB)에 버퍼 할당 실패(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_recover** <br>(count) | RQ가 복구된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_tls_err** <br>(count) | CQE TLS 오프로드에 문제가 발생한 횟수(Linux만 해당)<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_tls_resync_res_retry** <br>(count) | ICOSQ가 가득 찼을 때 드라이버 TLS 재동기화 응답 호출을 재시도한 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_tls_resync_req_skip** <br>(count) | TLS 비동기 재동기화 요청 절차가 시작되었으나 정상 종료되지 않은 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_wqe_err** <br>(count) | 링 i에서 수신된 잘못된 opcode의 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_xdp_tx_err** <br>(count) | RX 링의 XDP_TX 링에서 프레임 길이 초과, 프레임 길이 미달과 같은 XDP_TX 오류가 발생한 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.rx_xdp_tx_full** <br>(count) | XDP_TX 작업으로 인해 해당 포트로 다시 전달되어야 하나 tx 대기열이 가득 차서 삭제된 패킷 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.tx_cqe_err** <br>(count) | 링 i의 SQ에서 발생한 오류 CQE 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.queue.tx_dropped** <br>(count) | 링 i에서 DMA 매핑 실패로 인해 삭제된 송신 패킷(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.queue.tx_recover** <br>(count) | SQ가 복구된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.ch_arm** <br>(count) | NAPI Poll 함수가 완료되어 완료 대기열을 활성화한 횟수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.ch_eq_rearm** <br>(count) | EQ가 복구된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.ch_poll** <br>(count) | NAPI Poll 함수가 호출된 횟수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.link_down_events_phy** <br>(count) | 링크 동작 상태가 Down으로 변경된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.module_bad_shorted** <br>(count) | 모듈 케이블이 쇼트된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.module_bus_stuck** <br>(count) | 모듈 I2C 버스(데이터 또는 클록)에서 배선 단락(short-wire)이 감지된 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.module_high_temp** <br>(count) | 모듈 케이블 온도가 너무 높았던 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.rx_bytes** <br>(count) | 수신된 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.mlx5_core.rx_crc_errors_phy** <br>(count) | 물리 포트에서 FCS(Frame Check Sequence) 오류로 인하여 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_csum_complete** <br>(count) | CHECKSUM_COMPLETE 상태로 수신된 패킷(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_csum_none** <br>(count) | CHECKSUM_NONE 상태로 수신된 패킷(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_csum_unnecessary** <br>(count) | CHECKSUM_UNNECESSARY 상태로 수신된 패킷(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_discards_phy** <br>(count) | 물리 포트의 버퍼 부족으로 삭제된 수신 패킷의 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_fragments_phy** <br>(count) | 물리 포트에서 길이가 64 바이트 미만이고 FCS 오류가 있어 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_in_range_len_errors_phy** <br>(count) | 물리 포트에서 길이/유형 오류로 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_jabbers_phy** <br>(count) | 물리 포트에서 길이가 64 바이트 초과이고 FCS 오류가 있는 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_out_of_buffer** <br>(count) | 어댑터 유입 트래픽을 처리할 소프트웨어 버퍼가 수신 대기열에 할당되지 않은 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.rx_out_of_range_len_phy** <br>(count) | 물리 포트에서 허용 길이를 초과해 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_oversize_pkts_buffer** <br>(count) | RQ에 도달했으나 장치가 유입 트래픽에 할당한 소프트웨어 버퍼 크기를 초과하여 삭제된 수신 패킷 수(Linux만 해당)<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_oversize_pkts_phy** <br>(count) | 물리 포트에서 길이가 MTU 크기를 초과하여 삭제된 수신 패킷 수(Linux만 해당)<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_oversize_pkts_sw_drop** <br>(count) | CQE 데이터가 MTU 크기보다 커서 소프트웨어에서 삭제된 수신 패킷 수(Linux 만 해당)<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_packets** <br>(count) | 수신된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_pp_alloc_empty** <br>(count) | ptr 링이 비어 있어 느린 경로 할당이 강제되어 카운터가 증가함(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.rx_steer_missed_packets** <br>(count) | NIC가 수신했으나 NIC 플로 테이블의 플로와 일치하지 않아 삭제된 패킷 수(Linux만 해당)<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_symbol_err_phy** <br>(count) | 물리 포트의 물리 코딩 오류(심볼 오류)로 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_undersize_pkts_phy** <br>(count) | 물리 포트에서 길이가 64 바이트 미만이어서 삭제된 수신 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_unsupported_op_phy** <br>(count) | 물리 포트에서 지원되지 않는 opcode가 포함된 상태로 수신된 MAC 컨트롤 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_xdp_drop** <br>(count) | XDP 프로그램 XDP_DROP 작업으로 인해 삭제된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.rx_xdp_redirect** <br>(count) | XDP 리다이렉트 작업이 트리거된 횟수(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.rx_xdp_tx_err** <br>(count) | RX 링의 XDP_TX 링에서 프레임 길이 초과, 프레임 길이 미달과 같은 XDP_TX 오류가 발생한 횟수(Linux만 해당).<br>_error로 표시_ |
| **system.net.mlx5_core.rx_xsk_buff_alloc_err** <br>(count) | XSK RQ 컨텍스트에서 skb 또는 XSK 버퍼 할당에 실패한 횟수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.tx_bytes** <br>(count) | 전송된 바이트 수(Linux만 해당).<br>_byte로 표시됨_ |
| **system.net.mlx5_core.tx_discards_phy** <br>(count) | 오류가 감지되지 않았어도 송신 중 폐기된 패킷의 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.tx_errors_phy** <br>(count) | 물리 포트에서 길이가 MTU 크기를 초과하여 삭제된 송신 패킷 수(Linux만 해당)<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.tx_packets** <br>(count) | 전송된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.tx_queue_dropped** <br>(count) | DMA 매핑 실패로 인해 삭제된 송신 패킷(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.tx_queue_stopped** <br>(count) | SQ가 가득 찼던 이벤트(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.tx_queue_wake** <br>(count) | SQ가 가득 찼다가 다시 여유 공간이 생긴 이벤트(Linux만 해당).<br>_event로 표시됨_ |
| **system.net.mlx5_core.tx_xdp_err** <br>(count) | (XDP 리다이렉트로 인해) 인터페이스로 리다이렉트되었으나 프레임 길이 초과, 프레임 길이 미달과 같은 오류로 인해 삭제된 패킷 수(Linux만 해당).<br>_packet으로 표시됨_ |
| **system.net.mlx5_core.tx_xsk_err** <br>(count) | 데이터 크기가 MTU 크기를 초과하는 경우 등, XSK zerocopy 모드에서 발생한 오류 수(Linux만 해당).<br>_error로 표시됨_ |
| **system.net.mlx5_core.tx_xsk_full** <br>(count) | SQ가 가득 찼을 때 XSK zerocopy 모드에서 doorbell이 발생한 횟수(Linux만 해당).<br>_error로 표시됨_ |

**참고**: `system.net.conntrack` 메트릭은 Agent v6.12+에서 사용할 수 있습니다. 자세한 내용은 [CHANGELOG](https://github.com/DataDog/integrations-core/blob/master/network/CHANGELOG.md#1110--2019-05-14)를 참고하세요.

### 이벤트

네트워크 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

네트워크 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

- [Datadog API로 TCP/UDP 호스트 메트릭 전송하기](https://docs.datadoghq.com/integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/)

## 참고 자료

- [HTTP 점검 기반 네트워크 모니터 구축하기](https://docs.datadoghq.com/monitors/monitor_types/network/)