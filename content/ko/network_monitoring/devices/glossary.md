---
description: NDM 용어
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: 지식 센터
  text: SNMP 모니터링 개요
title: NDM 용어 및 개념
---

## 개요

Network Device Monitoring은 온프레미스 라우터, 스위치, 방화벽의 상태와 성능에 관한 인사이트를 얻도록 도와드립니다. 
레이어 2 및 레이어 3과 같은 중요한 NDM 용어에 관한 추가 정의와 설명은 기본 [용어집][1]을 참조하세요.

## 용어

간단한 네트워크 관리 프로토콜(SNMP)
: 베어 메탈 네트워킹 장비에 관한 정보를 수집하는 데 사용되는 네트워크 프로토콜입니다.

오브젝트 식별자(OID)
: 폴링 시 해당 값의 응답 코드를 반환하는 장치의 고유 ID 또는 주소입니다. 예를 들어 OID는 CPU 또는 디바이스 팬 속도입니다.

시스템 개체 식별자(sysOID)
: 장치 유형을 정의하는 특정 주소입니다. 모든 장치에는 이를 정의하는 고유 ID가 있습니다. 예를 들어, Meraki 기본 sysOID는 `1.3.6.1.4.1.29671`입니다.

관리 정보 베이스(MIB)
: MIB와 관련된 모든 가능한 OID 및 해당 정의의 데이터베이스 또는 목록입니다. 예를 들어 `IF-MIB`(인터페이스 MIB)에는 장치의 인터페이스 설명 정보에 관한 모든 OID가 포함되어 있습니다.

[프로파일][2]
: 프로파일은 장치와 연결된 OID의 모음입니다. 프로파일을 사용하면 여러 디바이스 유형 또는 인스턴스에서 메트릭 정의를 재사용할 수 있습니다.

소프트웨어 정의 광역 네트워크(SD-WAN)
: 소프트웨어 정의 네트워킹(SDN)을 사용하는 광역 네트워크(WAN)입니다. SD-WAN은 원격 사무실과 데이터 센터를 서로 다른 전송 방식(MPLS, 광대역, 5G 등)으로 상호 연결하는 데 자주 사용됩니다.

[장치 네임스페이스][3]
: 장치의 네임스페이스입니다. 네임스페이스는 동일한 프라이빗 IP를 공유할 수 있는 여러 네트워크 장치를 구분하기 위한 태그로 사용할 수 있습니다.

핑
: 신호가 네트워크를 통해 한 장치에서 다른 장치로 이동했다가 다시 돌아오는 데 걸리는 시간을 측정하는 네트워크 도구입니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/glossary/
[2]: /ko/network_monitoring/devices/profiles
[3]: /ko/network_monitoring/devices/snmp_traps/?tab=yaml#device-namespaces