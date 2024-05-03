---
aliases:
- /ko/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링하기
kind: 설명서
title: NDM 트러블슈팅
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">네트워크 기기 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog 네트워크 장치 모니터링 문제를 해결하려면 아래 정보를 활용하세요. 추가적인 도움이 필요한 경우 [Datadog 지원팀][1]에 문의하세요.

## 용어

SNMP - 간단한 네트워크 관리 프로토콜
: 베어 메탈 네트워킹 장비에 대한 정보를 수집하는 데 사용되는 네트워크 프로토콜입니다.

OID - 개체 식별자
: 폴링 시 해당 값의 응답 코드를 반환하는 장치의 고유 ID 또는 주소입니다. 예를 들어 OID는 CPU 또는 디바이스 팬 속도입니다.

sysOID - 시스템 개체 식별자
: 장치 유형을 정의하는 특정 주소입니다. 모든 장치에는 이를 정의하는 고유 ID가 있습니다. 예를 들어, Meraki 베이스 sysOID 는 `1.3.6.1.4.1.29671`입니다.

MIB - 관리 정보 기반
: MIB와 관련된 모든 가능한 OID 및 해당 정의의 데이터베이스 또는 목록입니다. 예를 들어 `IF-MIB`(인터페이스 MIB)에는 장치의 인터페이스 정보에 관한 모든 OID가 포함되어 있습니다.

## FAQ

#### Datadog가 지원하는 SNMP 버전은 무엇입니까?

Datadog은 SNMPv1, SNMPv2, SNMPv3 세 가지 버전 모두를 지원합니다.

#### Datadog은 어떤 프로토콜을 사용하여 장치를 검색합니까?

Datadog은 SNMP를 사용하여 장치를 검색합니다. 검색 중에 SNMP 포트(기본값 161)가 폴링됩니다. 일치시킬 응답과 프로필이 있으면 검색된 장치로 간주됩니다.

#### Datadog은 MIB 인증을 합니까? MIB를 모두 보내야 합니까?  MIB을 파이썬(Python)으로 변환하려면 어떻게 해야 합니까?

Datadog 에이전트는 MIB가 없으므로 MIB로 아무것도 할 필요가 없습니다. Datadog 장치 프로필로 수집된 모든 메트릭은 MIB 없이 자동으로 작동합니다.

메트릭 또는 커스텀 설정을 추가하려면 다음과 같이 MIB 이름, 테이블 이름, 테이블 OID, 심볼 및 심볼 OID를 나열합니다:

```yaml
- MIB: EXAMPLE-MIB
    table:
      # Identification of the table which metrics come from.
      OID: 1.3.6.1.4.1.10
      name: exampleTable
    symbols:
      # List of symbols ('columns') to retrieve.
      # Same format as for a single OID.
      # Each row in the table emits these metrics.
      - OID: 1.3.6.1.4.1.10.1.1
        name: exampleColumn1
```

#### 장치-모델 쌍이 지원되지 않는 경우에도 네트워크 장치 모니터링을 사용할 수 있습니까?

Datadog은 모든 장치에서 일반 기준이 되는 메트릭을 수집합니다. 벤더 MIB에서 지원되지 않는 메트릭이 있는 경우 커스텀 프로필을 작성하거나 [Datadog 지원팀][1]에 기능 요청을 보낼 수 있습니다.

기능 요청을 보내는 경우 Datadog 지원팀은 요청된 장치에서 `snmpwalk`가 필요합니다. 다음을 실행하고 출력을 전송합니다:

```
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

#### 내 네트워크에 대해 수집된 메트릭이 하나만 표시되고 수집된 장치의 수가 0으로 표시되는 이유는 무엇입니까?

1. 장치에 대한 ACL/방화벽 규칙을 완화해 보세요.
2. 에이전트가 실행 중인 호스트에서 `snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6`를 실행합니다. 응답 없이 시간이 초과되면 Datadog 에이전트가 장치에서 메트릭을 수집하지 못하도록 차단하는 무언가가 있을 수 있습니다.

#### Datadog이 벤더 또는 장치 유형은 지원하지만 특정 모델을 지원하지 않는 경우에 어떻게 해야 합니까?

- [Datadog 지원팀][1]에 문의하여 특정 모델을 지원 요청을 제출하세요.
- 프로필을 확장하여 추가 `sysobjectid` 값을 지원합니다.
   예를 들어 다른 유형의 Cisco CSR을 모니터링하려는 경우 ISR 프로필을 직접 수정하여 다음과 같이 다른`sysobjectid`을 나열할 수 있습니다:

    ```
        snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
    ```

**참고**: 장치의 `sysobjectid`를 모르는 경우 인터넷 검색을 하거나 장치에 연결할 수 있는 호스트에서 `snmpwalk`를 실행합니다. 출력을 사용하여 일치시킬 프로필을 나열합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/help