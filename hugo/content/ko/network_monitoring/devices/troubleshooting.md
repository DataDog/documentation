---
aliases:
- /ko/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링
- link: /network_monitoring/devices/glossary
  tag: 문서
  text: NDM 용어 및 개념
title: NDM 트러블슈팅
---
## 개요 {#overview}

아래 정보를 사용하여 Datadog Network Device Monitoring 문제를 해결하세요. 추가 지원이 필요하면 [Datadog 지원][1]에 문의하세요.

## Datadog에서 장치가 보이지 않음 {#device-not-visible-in-datadog}

다음은 Datadog Agent v7.61.0 이상을 실행 중이라고 가정합니다.

[장치][2] 페이지에 장치가 보이지 않는 경우:

1. [datadog-agent 상태][3] 명령을 실행하고 장치의 모니터링 IP가 포함된 SNMP 섹션을 찾으세요. Agent를 시작한 후 NDM이 개별적으로 구성된 장치를 검색하는 데 최대 1분이 소요될 수 있습니다. Agent가 많은 수의 장치를 스캔하도록 설정된 경우 더 오래 걸릴 수 있습니다.
출력은 다음과 유사해야 합니다.

   ```
   snmp
   ----
     Instance ID: snmp:default:1.2.3.4.1:9a2df638d3ba38d6 [ERROR]
     Configuration Source: file:/etc/datadog-agent/conf.d/snmp.d/conf.yaml
     Total Runs: 1
     Metric Samples: Last Run: 6, Total: 6
     Events: Last Run: 0, Total: 0
     Network Devices Metadata: Last Run: 1, Total: 1
     Service Checks: Last Run: 1, Total: 1
     Average Execution Time : 0s
     Last Execution Date : 2024-11-13 13:12:09 PST / 2024-11-13 21:12:09 UTC (1731532329000)
     Last Successful Execution Date : Never
     Error: <ERROR MESSAGE>
     No traceback
   ```

2. 장치가 목록에 없고 Autodiscovery를 사용 중이라면, Agent가 장치에 연결하지 못했을 가능성이 높습니다.

   - `datadog-agent status` 명령을 실행하고 `autodiscovery` 섹션에서 가능한 모든 장치 IP가 스캔되었다고 보고할 때까지 기다리세요. 대규모 네트워크에서는 몇 분 정도 걸릴 수 있습니다. 출력은 다음과 유사해야 합니다.

    ```
    Autodiscovery
    =============
    Subnet 127.0.0.1/24 is queued for scanning.
    No IPs found in the subnet.
    Scanning subnet 127.0.10.1/30... Currently scanning IP 127.0.10.2, 4 IPs out of 4 scanned.
    Found the following IP(s) in the subnet:
       - 127.0.10.1
       - 127.0.10.2
    Subnet 127.0.10.1/30 scanned.
    No IPs found in the subnet.
    ```

    If Autodiscovery completed and your device is still not appearing on the [Devices][2] page, it means the Agent could not connect to your device.

   - 장치의 관리자 IP에서 `snmp walk`를 실행하여 Agent가 장치에 연결할 수 없는 이유를 확인하세요.

      **참고**: 보안 인증을 CLI에 직접 제공하세요. 보안 인증이 제공되지 않으면 Agent는 실행 중인 Agent 구성 파일에서 보안 인증을 찾으려고 시도합니다. 
      
      이러한 명령 실행에 대한 자세한 내용은 공급업체별 설명서를 참조하세요.

      {{< tabs >}}
      {{% tab "Linux" %}}

   SNMP v2:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
   ```

   SNMP v3:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
   ```

      {{% /tab %}}
      {{% tab "Windows" %}}

   Agent 설치 디렉터리로 이동하세요.

   ```shell
   cd "c:\Program Files\Datadog\Datadog Agent\bin"
   ```

   SNMP v2의 경우 다음을 실행하세요.

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <community-string> <IP-Address>:<port>
   ```

   SNMP v3의 경우 다음을 실행하세요.

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH-PROTOCOL> -A <AUTH-KEY> -x <PRIV-PROTOCOL> -X <PRIV-KEY> <IP-Address>:<port>
   ```

   **참고**: 다음 오류를 방지하려면 Agent 설치 디렉터리에서 관리자 권한으로 명령을 실행하세요.

   ```shell
   Error: unable to read artifact: open C:\ProgramData\Datadog\auth_token: Access is denied.
   ```

      {{% /tab %}}
      {{< /tabs >}}

## SNMP 오류 문제 해결 {#troubleshooting-snmp-errors}

SNMP 상태 또는 Agent walk에서 오류가 표시되면 다음 문제 중 하나를 나타낼 수 있습니다.

### 권한 거부됨 {#permission-denied}

Agent 로그에서 포트 바인딩 중 권한 거부 오류가 표시되는 경우, 지정한 포트 번호에 높은 권한이 필요할 수 있습니다. 1024 미만의 포트 번호에 바인딩하려면 [기본 SNMP 트랩 포트 162 사용][8]을 참조하세요.

### 장치에 연결할 수 없거나 잘못 구성됨: {#unreachable-or-misconfigured-device}

   **오류**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **해결 방법**:

   1. 장치에 로그인하여 SNMP가 활성화되어 있고 포트 161에서 노출되는지 확인하세요.
   2. 수집기 방화벽이 송신을 허용하는지 확인하세요.

   3. 선택 사항, Linux 전용:

      `iptables -L OUTPUT`을 실행하고 거부 규칙이 없는지 확인하세요.

      ```shell
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. 커뮤니티 문자열이 일치하는지 확인하세요.

### 잘못된 SNMPv2 보안 인증 {#incorrect-snmpv2-credentials}

   **오류**:
   ```
   Error: an authentication method needs to be provided
   ```

   **해결 방법**:

   SNMPv2를 사용하는 경우 커뮤니티 문자열이 설정되어 있는지 확인하세요.

### 잘못된 SNMPv3 개인 정보 보호 프로토콜 {#incorrect-snmpv3-privacy-protocol}

   **오류**:
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   또는

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **해결 방법**:

   다음 SNMPv3 구성 매개변수가 올바른지 확인하세요.
   - 사용자
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### 트랩 또는 플로우가 전혀 수신되지 않음 {#traps-or-flows-not-being-received-at-all}

SNMP 트랩이나 NetFlow 트래픽이 누락된 경우, 일반적인 원인은 방화벽 규칙이 Agent에 도달하기 전에 UDP 패킷을 차단하는 것입니다. SNMP 트랩과 NetFlow는 모두 UDP를 기반으로 하며 [datadog.yaml][9] 구성에 정의된 포트를 사용합니다.

<div class="alert alert-info">UFW(Uncomplicated Firewall)와 같은 로컬 방화벽은 허용 설정으로 구성된 경우에도 트래픽을 차단할 수 있습니다. 시스템 로그에서 차단된 패킷 항목을 검사하세요. 이는 일반적으로 트래픽이 네트워크 인터페이스에는 도달했지만 운영 체제에 도달하기 전에 차단되었음을 나타냅니다.</div>

다음 플랫폼별 명령어를 사용하여 Agent에 트래픽이 도달하지 못하게 차단하는 방화벽 규칙이 있는지 검사하세요.

{{< tabs >}}
{{% tab "Linux" %}}

Linux에는 `iptables`, `nftables`, `ufw`과 같은 여러 유형의 방화벽이 있습니다. 사용 중인 방화벽에 따라 다음 명령어를 사용할 수 있습니다.

- `sudo iptables -S`

- `sudo nft list ruleset`

- `sudo ufw status`

구성된 포트에서 UDP 트래픽을 차단하는 규칙이 있는지 검사하세요.

{{% /tab %}}
{{% tab "Windows" %}}

버전 `7.67`부터 Agent의 `agent.exe diagnose` 명령은 차단하는 방화벽 규칙을 자동으로 검사하고, 발견되면 경고를 표시합니다.

방화벽 규칙을 수동으로 검사하려면:

```powershell
Get-NetFirewallRule -Action Block | ForEach-Object {
    $rule = $_
    Get-NetFirewallPortFilter -AssociatedNetFirewallRule $rule | Select-Object
        @{Name="Name"; Expression={$rule.Name}},
        @{Name="DisplayName"; Expression={'"' + $rule.DisplayName + '"'}},
        @{Name="Direction"; Expression={$rule.Direction}},
        @{Name="Protocol"; Expression={$_.Protocol}},
        @{Name="LocalPort"; Expression={$_.LocalPort}},
        @{Name="RemotePort"; Expression={$_.RemotePort}}
} | Format-Table -AutoSize
```

다음 조건의 규칙을 찾으세요.
- **방향**이 인바운드인 경우
- **프로토콜**이 UDP인 경우
- **로컬 포트**가 구성된 포트 중 하나와 일치하는 경우

{{% /tab %}}
{{% tab "MacOS" %}}

다음 명령어를 실행하여 Packet Filter(pf) 규칙을 검사하세요.

```shell
sudo pfctl -sr
```

구성된 포트에서 UDP 트래픽을 차단하는 규칙이 있는지 검사하세요. 예: `block drop in proto udp from any to any port = <CONFIG_PORT>`.
{{% /tab %}}
{{< /tabs >}}

### 장치에 대한 트랩이 수신되지 않음{#traps-not-being-received-for-devices}

1. Datadog `agent.log` 파일을 확인하여 트랩 포트에 바인딩할 수 있는지 검사하세요. 다음 오류는 트랩 포트에 바인딩할 수 없음을 나타냅니다.

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **해결 방법**:
   Agent 바이너리에 net bind 기능을 추가하면 Agent가 예약된 포트에 바인딩할 수 있습니다.

   ```shell
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

### 트랩 형식이 잘못됨 {#traps-incorrectly-formatted}

1. NDM의 문제 해결 Dashboard로 이동하세요.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="Network Device Monitoring 페이지에 Dashboard 드롭다운이 표시되며, 그 안에 NDM Troubleshooting dashboard가 강조되어 있습니다." style="width:80%;" >}}

2. 아래로 스크롤하여 Traps 위젯으로 이동한 다음 {{< ui >}}Traps incorrectly formatted{{< /ui >}} 그래프를 확인하세요. 이 값이 0이 아니라면 NDM 수집기와 장치의 인증 정보가 일치하지 않을 가능성이 높습니다.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="Traps 위젯 섹션이 표시된 NDM Troubleshooting dashboard입니다." style="width:100%;" >}}

   **해결 방법**:

     Verify that the following configurations in the `datadog.yaml` file align with the trap settings on the devices from which traps are missing:

   ```
    ## @param community_strings - list of strings - required
    ## A list of known SNMP community strings that devices can use to send traps to the Agent.
    ## Traps with an unknown community string are ignored.
    ## Enclose the community string with single quote like below (to avoid special characters being interpreted).
    ## Must be non-empty.
    #
    # community_strings:
    #   - '<COMMUNITY_1>'
    #   - '<COMMUNITY_2>'

    ## @param users - list of custom objects - optional
    ## List of SNMPv3 users that can be used to listen for traps.
    ## Each user can contain:
    ##  * user         - string - The username used by devices when sending Traps to the Agent.
    ##  * authKey      - string - (Optional) The passphrase to use with the given user and authProtocol
    ##  * authProtocol - string - (Optional) The authentication protocol to use when listening for traps from this user.
    ##                            Available options are: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
    ##                            Defaults to MD5 when authKey is set.
    ##  * privKey      - string - (Optional) The passphrase to use with the given user privacy protocol.
    ##  * privProtocol - string - (Optional) The privacy protocol to use when listening for traps from this user.
    ##                            Available options are: DES, AES (128 bits), AES192, AES192C, AES256, AES256C.
    ##                            Defaults to DES when privKey is set.
    #
    # users:
    # - user: <USERNAME>
    #   authKey: <AUTHENTICATION_KEY>
    #   authProtocol: <AUTHENTICATION_PROTOCOL>
    #   privKey: <PRIVACY_KEY>
    #   privProtocol: <PRIVACY_PROTOCOL>
    ```

## Further Reading 

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/help
[2]: https://app.datadoghq.com/devices
[3]: /ko/agent/configuration/agent-commands/#agent-information
[4]: /ko/api/latest/network-device-monitoring/
[5]: /ko/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /ko/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /ko/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /ko/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
[9]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file