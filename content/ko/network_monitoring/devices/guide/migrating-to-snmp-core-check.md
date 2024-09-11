---
further_reading:
- link: network_monitoring/devices/setup
  tag: 설명서
  text: NDM 설정에 대해 자세히 알아보기
title: Python 기반 검사에서 SNMP 코어 검사(Go에서)로 마이그레이션하기
---

## 개요

Datadog 에이전트 7.27.0은 SNMP를 사용하여 장치를 모니터링할 때 에이전트의 메모리 및 성능이 모두 향상된 새로운 SNMP 검사 버전을 Go에 도입합니다. 이 가이드는 새 코어 검사로 마이그레이션하는 데 도움이 됩니다.

### 에이전트 v7.27.0 변경 사항

- 자동 탐지는 이제 핵심 에이전트 프로세스이며 `init_config` 아래에 있는 `loader:core`와 함께 기본 SNMP 통합 검사에서 로드되고 기본 Datadog 에이전트 `datadog.yaml`에서 설정되어야 합니다.

- 사람이 읽을 수 있는 이름으로만 MIB를 직접 참조하는 것은 더 이상 지원되지 않습니다. 대신 모든 OID 참조는 숫자 주소와 사람이 읽을 수 있는 이름으로 만들어야 합니다. 제공된 모든 Datadog 프로필이 업데이트되었지만 커스텀 프로필은 업데이트해야 합니다. 마이그레이션의 예는 아래에 나와 있습니다.

- 코어 검사는 프로필로 사용할 MIB를 수동으로 컴파일하는 것을 지원하지 않으므로 다음 파라미터는 더 이상 지원되지 않습니다:
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` - 다른 `GET` 함수를 위해 위해 제거됨

## 설명서

1. 해당하는 에이전트 플랫폼에 대해 Datadog 에이전트 버전 7.27+로 업그레이드하세요.

2. SNMP 검사에서 `init_config`를 업데이트하여 `snmp.d/conf.yaml`에서 새 코어 검사를 참조하도록 합니다.

``` yaml
  init_config:
      loader: core
```
3. 다음 단계는 자동 탐지/서브넷 검색을 사용하는 경우에만 적용됩니다: 각 인스턴스(서브넷)의 설정을 SNMP 검사 설정에서 기본 Datadog 에이전트`datadog.yaml`로 이동합니다.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # number of workers used to discover devices concurrently
  discovery_interval: 3600  # interval between each autodiscovery in seconds
  loader: core  # use core check implementation of SNMP integration. recommended
  use_device_id_as_hostname: true  # recommended
  configs:
    - network_address: 10.10.0.0/24  # CIDR subnet
      snmp_version: 2
      port: 161
      community_string: '***'  # enclose with single quote
      tags:
      - "key1:val1"
      - "key2:val2"
    - network_address: 10.20.0.0/24
      snmp_version: 2
      port: 161
      community_string: '***'
      tags:
      - "key1:val1"
      - "key2:val2"
```

{{< /tabs >}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
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
      privProtocol: 'AES256'  # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
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

### 커스텀 프로필 마이그레이션 (배포와 무관)

SNMP는 더 이상 사람이 읽을 수 있는 이름으로만 OID를 나열하는 것을 지원하지 않습니다. 주소(테이블 이름 및 인덱스) 또는 MIB 항목 주소로 참조할 수 있습니다. 프로필을 직접 작성하거나 기존 프로필을 수정한 경우 새 형식으로 마이그레이션하세요. 다음은 마이그레이션의 예입니다.

#### Scalar 기호

**에이전트 7.27.0 이전 버전:**

{{< code-block lang="yaml" filename="scalar_symbols.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol: hrSystemUptime
{{< /code-block >}}

**에이전트 7.27.0 사용:**

{{< code-block lang="yaml" filename="scalar_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol:
      OID: 1.3.6.1.2.1.25.1.1.0
      name: hrSystemUptime
{{< /code-block >}}

#### 테이블 기호

**에이전트 7.27.0 이전 버전:**

{{< code-block lang="yaml" filename="table_symbols.yaml" >}}

metrics:
  - MIB: HOST-RESOURCES-MIB
    table: hrStorageTable
    symbols:
      - hrStorageAllocationUnits
      - hrStoageSize
    metrics_tags:
      - tag: storagedec
        column: hrStorageDescr

{{< /code-block >}}


**에이전트 7.27.0 사용:**

{{< code-block lang="yaml" filename="table_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    table:
      OID: 1.3.6.1.2.1.25.2.3
      name: hrStorageTable
    symbols:
      - OID: 1.3.6.1.2.1.25.2.3.1.4
        name: hrStorageAllocationUnits
      - OID: 1.3.6.1.2.1.25.2.3.1.5
        name: hrStoageSize
    metrics_tags:
      - tag: storagedec
        column:
          OID: 1.3.6.1.2.1.25.2.3.1.3
          name: hrStorageDescr
{{< /code-block >}}


#### 메트릭 태그

**에이전트 7.27.0 이전 버전:**

{{< code-block lang="yaml" filename="metrics_tags.yaml" >}}
metrics_tags:
  - symbol: sysName
    tag: snmp_host
{{< /code-block >}}

**에이전트 7.27.0 사용:**

{{< code-block lang="yaml" filename="metrics_tags_7_27.yaml" >}}
metrics_tags:
  - OID: 1.3.6.1.2.1.1.5.0
    symbol: sysName
    tag: snmp_host
{{< /code-block >}}