---
description: SNMP 트랩 수신을 사용하도록 설정합니다.
further_reading:
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
title: SNMP 트랩
---

## 개요

SNMP 트랩은 SNMP 사용 장치에서 SNMP 관리자에게 보내는 알림입니다. 네트워크 장치에서 장비의 상태가 갑자기 변경되는 등 비정상적인 작업이 발생하면 장치가 SNMP 트랩 이벤트를 트리거합니다.

SNMP 트랩 모니터링을 사용하면 장치 불안정으로 인해 눈에 띄지 않을 수 있는 문제를 포착할 수 있습니다. 예를 들어 인터페이스가 15초마다 사용 가능한 상태와 고장난 상태 사이를 오가는 경우 60초마다 실행되는 폴링에 의존하면 네트워크 불안 정도를 잘못 판단할 수 있습니다. 또한 트랩은 장치 배터리 또는 섀시 상태와 같은 특정 하드웨어 구성 요소의 가시성 격차를 메울 수 있습니다.

Datadog 에이전트 v7.37+는 SNMP 트랩 수신을 지원하므로 특정 트랩 이벤트에 대해 [모니터][1]를 설정할 수 있습니다.

## 설정

SNMP 트랩 수신을 사용하도록 설정하려면 다음을 `datadog.yaml`에 추가합니다:

```yaml
network_devices:
  namespace: <NAMESPACE> # optional, defaults to "default".
  snmp_traps:
    enabled: true
    port: 9162 # on which ports to listen for traps
    community_strings: # which community strings to allow for v2 traps
      - <STRING_1>
      - <STRING_2>
    bind_host: 0.0.0.0
    users: # limited to only a single v3 user
      - username: 'user'
        authKey: 'fakeKey'
        authProtocol: 'SHA' # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        privKey: 'fakePrivKey'
        privProtocol: 'AES' # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
```

**참고**: 여러 v3 사용자 및 암호는 지원되지 않습니다. 사용자 환경의 요구 사항일 경우 [Datadog 지원팀][2]에 문의하세요.

## 장치 네임스페이스

[네트워크 장치 모니터링][3]에서와 같이 네임스페이스를 태그로 사용하여 동일한 개인 IP를 공유하는 여러 네트워크 장치를 구분할 수 있습니다. 예를 들어 뉴욕에 있는 라우터와 파리에 있는 라우터 두 대가 동일한 개인 IP를 공유하는 경우를 생각해 보겠습니다. 뉴욕 데이터 센터에 한 에이전트가 있고, 파리 데이터 센터에는 다른 에이전트가 있어야 합니다. 이때 각각 `namespace: nyc` 및 `namespace: paris`로 태그를 지정할 수 있습니다.

그런 다음 네임스페이스를 사용하여 SNMP 트랩에서 이미터(emitte) 장치로 또는 이미터(emitter) 장치에서 SNMP 트랩으로 고유하게 피벗할 수 있습니다.

여러 에이전트 설정 간에 일관성을 유지하는 것이 중요합니다. 예를 들어 두 개의 에이전트 (예: 트랩 수집용과 메트릭용) 를 설정한 경우 네임스페이스가 두 위치에 모두 존재하는지 확인해야 합니다. 또는 네임스페이스가 둘 중 어느 곳에도 존재하지 않는지 확인합니다.

## 해결책

각 SNMP 트랩에는 특정 OID 기반 형식이 있습니다. Datadog 에이전트는 _해결_ 단계를 수행하여 OID를 보다 읽기 쉬운 문자열로 변환합니다.

SNMP 트랩은 다음으로 구성됩니다:
- 이미터(Emitter) 정보 (예: 장치의 IP)
- 트랩 유형을 정의하는 OID
- "변수"—즉, 트랩에 대한 추가 컨텍스트를 제공하는 쌍(`OID:value`)의 목록입니다.

디코딩은 `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/dd_traps_db.json.gz`에서 디스크에 저장된 매핑을 사용하여 에이전트 측에서 수행됩니다. Datadog은 11,000개 이상의 다양한 관리 정보 기반(MIB)을 지원합니다.

### 매핑 형식

매핑은 TrapsDB 파일로 저장되며 YAML 또는 JSON일 수 있습니다.

#### 예시

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### 에이전트 확장

에이전트의 기능을 확장하려면 고유한 매핑을 만들어 `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/` 디렉토리에 배치합니다.

이러한 매핑을 수기로 작성하거나 Datadog의 개발자 툴킷 [`ddev`][4]을 사용하여 MIB 목록에서 매핑을 생성할 수 있습니다.

#### MIB 목록에서 TrapsDB 파일 생성

**필수 조건**:
- 파이썬 3
- [`ddev`][4] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][5] (`pip3 install pysmi`)

모든 MIB를 전용 폴더에 넣고 다음을 실행합니다:`ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...`

MIB에 종속성이 있는 경우, 발견되면  `ddev`는 온라인에서 종속성을 가져옵니다. 또는 모든 종속성을 별도의 폴더에 넣고 `--mib-sources` 파라미터를 사용하여 이 폴더를 지정합니다.



[1]: /ko/monitors/
[2]: /ko/help/
[3]: /ko/network_monitoring/devices
[4]: /ko/developers/integrations/new_check_howto/?tab=configurationtemplate#developer-toolkit
[5]: https://pypi.org/project/pysmi/