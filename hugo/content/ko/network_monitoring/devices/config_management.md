---
description: NDM에서 장치 구성 변경 사항을 조회하고 비교합니다.
further_reading:
- link: /network_monitoring/devices/config_management_rollback
  tag: 설명서
  text: Network Configuration Management 롤백
- link: /network_monitoring/devices/troubleshooting
  tag: 설명서
  text: NDM 문제 해결
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: 블로그
  text: Datadog으로 L7부터 L1까지 네트워크 문제 해결하기
site_support_id: network_config_management
title: Network Configuration Management
---
## 개요 {#overview}

Network Configuration Management(NCM)는 [Network Device Monitoring(NDM)][1]을 확장하여 구성 인식 및 변경 사항 추적 기능을 포함합니다. NCM을 사용하면 다음 작업을 수행할 수 있습니다.

- 시간에 따른 장치 구성 변경 사항 모니터링
- 두 구성 버전을 나란히 비교
- AI 생성 요약을 사용하여 인시던트 중 변경 사항 및 잠재적 영향 파악
- [장치를 이전 구성으로 롤백][8]

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_ndm_view.png" alt="최신 구성과 변경 사항에 대한 AI 요약을 보여주는 Network Device Management 구성 탭" style="width:100%;" >}}

## 사전 요구 사항 {#prerequisites}

- [Network Device Monitoring][3](NDM)이 장치에 구성되어 있어야 합니다.

## 설정 {#setup}

1. Agent의 루트 구성 디렉터리인 `conf.d/network_config_management.d/`에 `conf.yaml` 파일을 생성하고 다음과 같이 구성합니다.

   ```yaml
   init_config:
     ## @param namespace - string - optional - default: default
     ## The namespace should match namespaces of devices being monitored
     namespace: default
     ## @param min_collection_interval - integer - optional - default: 900 (15 minutes)
     min_collection_interval: 900
     ## @param ssh - object - optional
     ## Global SSH configuration that applies to all device instances unless 
     ## overridden at the device level. 
     ssh:
       ## @param timeout - duration - optional - default: 30 (seconds)
       ## Maximum time for the SSH client to establish a TCP connection.
       timeout: 30
       ## @param known_hosts_path - string - required (unless insecure_skip_verify is true)
       ## Path to the known_hosts file containing public keys of servers to 
       ## verify the identity of remote hosts. Required for secure connections.
       known_hosts_path: /path/to/known_hosts
       ## @param insecure_skip_verify - boolean - optional - default: false
       ## Skip host key verification. This is INSECURE and should only be used
       ## for development/testing purposes.
       insecure_skip_verify: false 
   instances:
     ## ip_address - string - required
     ## The IP address of the network device to collect configurations from.
   - ip_address: <IP_ADDRESS>
     ## @param auth - object - required
     ## Authentication credentials to connect to the network device.
     auth:
       ## @param username - string - required
       ## Username to authenticate to the network device.
       username: <USERNAME>
       ## @param password - string - required (if private_key_file is not provided)
       ## Password to authenticate to the network device.
       ## Used as a fallback after private key authentication if both are provided.
       password: <PASSWORD>
       ## @param private_key_file - string - optional
       ## Path to the SSH private key file for authentication.
       ## At least one of password or private_key_file must be provided.
       private_key_file: /path/to/private_key
   ```

2. 필요시 장치에 특정 SSH 알고리즘이 요구되는 경우 다음 구성을 사용합니다.

   ```yaml
   init_config:
     ## To confirm a possible value of algorithms, see the constants described in the golang document.
     ## https://pkg.go.dev/golang.org/x/crypto/ssh#pkg-constants
     ##
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```
   
3. 구성 변경 사항을 적용하려면 Agent를 다시 시작합니다.

## 구성 조회 {#viewing-configurations}

Network Configuration Management는 Network Device Monitoring의 NDM 장치 조회 화면에서 액세스할 수 있습니다.

1. [Network Device Monitoring][3]으로 이동합니다.
2. 장치 목록이나 [Device Geomap][4] 또는 [Device Topology][5] 맵과 같은 NDM 시각화 도구에서 장치를 선택합니다.
3. NDM 장치 조회 화면에서 {{< ui >}}Configuration{{< /ui >}} 탭을 엽니다.

   {{< img src="/network_device_monitoring/config_mgmt/config_tab.png" alt="‘Configuration’ 탭이 강조 표시된 NDM 장치 조회 화면" style="width:100%;" >}}

   ‘Configuration’ 탭에서 구성 목록에 표시되는 내용을 필터링할 수 있습니다.
   - {{< ui >}}All{{< /ui >}}: 실행 중인 구성과 시작 구성을 모두 표시
   - {{< ui >}}Running{{< /ui >}}: 장치에 현재 적용되어 실행 중인 구성
   - {{< ui >}}Startup{{< /ui >}}: 장치 부팅 시 로드되는 저장된 구성

### 시간 선택기 및 보존 {#time-picker-and-retention}

페이지 상단의 시간 제어를 통해 조회할 구성 기록을 선택할 수 있습니다. 이 범위를 확장하여 보존 기간 한도(1년)까지 이전 버전을 조회할 수 있습니다.

타임라인과 구성 버전 목록은 선택한 시간 범위에 따라 자동으로 업데이트됩니다.

**참고**: 구성 기록은 계정에서 NCM이 활성화된 시점부터 시작됩니다. 활성화 이전의 기록 데이터는 사용할 수 없습니다.

### 특정 시점의 구성 조회 {#view-a-configuration-at-a-point-in-time}

타임라인이나 목록에서 구성 이벤트를 선택하면 해당 시점의 장치 상태를 보여주는 단일 구성 조회 화면이 열립니다.

단일 구성 조회 화면에는 다음 항목이 표시됩니다.

- 선택한 타임스탬프에 해당하는 전체 구성
- 시간 및 장치 식별 정보를 포함한 장치 메타데이터

구성을 스크롤하여 인시던트 발생 중의 장치 상태를 조사하거나, 시간 범위를 조정하여 다른 기간의 구성을 조회할 수 있습니다.

### 구성 버전 비교 {#compare-configuration-versions}

구성 버전 간의 변경 사항을 확인하려면 다음 단계를 따르세요.

1. 확인란을 사용하여 기록 목록이나 타임라인에서 두 개의 구성을 선택합니다. 
2. {{< ui >}}Compare Two Configs{{< /ui >}}를 클릭하여 비교 조회 화면을 엽니다.

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_3.png" alt="Compare Two Configs 옵션이 강조 표시된 Network Device Management 구성 탭" style="width:100%;" >}}

구성 조회 화면에는 변경된 줄을 강조 표시하는 인라인 차이점과 함께 두 구성이 나란히 표시됩니다. 비교 조회 화면을 닫지 않고도 서로 다른 구성 쌍 간에 전환할 수 있습니다.

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_3.png" alt="분할 보기에서 두 버전을 비교하는 Network Device Management 구성 탭" style="width:90%;" >}}

### 이전 구성으로 롤백 {#roll-back-to-a-previous-configuration}

구성 변경으로 인해 문제가 발생하면 Datadog에서 직접 장치를 이전 구성으로 복원할 수 있습니다. 롤백은 Private Action Runner를 사용하여 선택한 구성을 장치에 복원합니다

설정 및 사용 지침은 [Network Configuration Management Rollbacks][8]를 참조하세요.

## AI 요약 {#ai-summaries}

Network Configuration Management에는 구성 변경 사항을 자연어 설명으로 변환하는 AI 기반 요약 패널이 포함되어 있습니다.

두 구성 버전을 비교하면 AI 요약이 자동으로 다음 작업을 수행합니다.

- 변경 사항을 사람이 이해하기 쉬운 용어로 설명합니다.
- 인시던트 조사 또는 위험 분석과 관련이 있을 수 있는 변경 사항을 강조 표시합니다

## 지원되는 장치 프로필 {#supported-device-profiles}

NCM은 장치 프로필을 사용하여 SSH를 통해 네트워크 장치에서 구성을 수집합니다. 프로필은 Datadog Agent와 함께 번들로 제공되며, 장치의 운영 체제를 기반으로 자동으로 일치하고 Agent 릴리스를 통해 업데이트됩니다.

| 공급업체 | OS | 프로필 | 최소 Agent 버전 | 실행 중 | 시작 |
|---|---|---|---|---|---|
| Arista | EOS | `eos` | 7.77.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-CX | `aoscx` | 7.76.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-W | `aosw` | 7.75.0 | {{< X >}} | |
| Cisco | IOS | `cisco-ios` | 7.73.0 | {{< X >}} | {{< X >}} |
| Cisco | NX-OS | `nxos` | 7.76.0 | {{< X >}} | {{< X >}} |
| Dell | DellOS10 | `dellos10` | 7.77.0 | {{< X >}} | {{< X >}} |
| F5 | TMOS | `tmos` | 7.76.0 | {{< X >}} | |
| FortiGate | FortiOS | `fortios` | 7.77.0 | {{< X >}} | |
| Juniper | JunOS | `junos` | 7.74.0 | {{< X >}} | |
| Palo Alto | PAN-OS | `pan-os` | 7.75.0 | {{< X >}} | |

### 구성 검색 명령 {#configuration-retrieval-commands}

각 프로필은 SSH를 통해 장치 구성을 수집하기 위해 다음 명령을 사용합니다. 전체 명령 정의는 [default_profiles.go][9]를 참조하세요.

| 공급업체 | OS | 실행 중인 구성 명령 | 시작 구성 명령 |
|---|---|---|---|
| Arista | EOS | `show running-config \| no-more \| exclude ! Time:` | `show startup-config \| no-more \| exclude ! Time:` |
| Aruba | AOS-CX | `show running-config` | `show startup-config` |
| Aruba | AOS-W | `show running-config` | |
| Cisco | IOS | `show running-config` | `show startup-config` |
| Cisco | NX-OS | `show running-config` | `show startup-config` |
| Dell | DellOS10 | `show running-configuration` | `show startup-configuration` |
| F5 | TMOS | `cat /config/partitions/*/bigip*.conf` | |
| FortiGate | FortiOS | `show full-configuration` | |
| Juniper | JunOS | `show configuration \| display omit` | |
| Palo Alto | PAN-OS | `show config running` | |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/devices/
[2]: /ko/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /ko/network_monitoring/devices/geomap
[5]: /ko/network_monitoring/devices/topology
[6]: /ko/network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
[8]: /ko/network_monitoring/devices/config_management_rollback
[9]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkconfigmanagement/profile/default_profiles.go