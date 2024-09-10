---
aliases:
- /ko/network_performance_monitoring/devices/data/
disable_toc: true
title: 수집된 NDM 데이터
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">네트워크 기기 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 이벤트

네트워크 장치 모니터링에는 이벤트가 포함되지 않습니다.

## 서비스 검사

{{< get-service-checks-from-git "snmp" >}}

## 메트릭

네트워크 디바이스 모니터링은 `snmp.*` 네임스페이스 아래에 지정된 메트릭을 제출합니다. 수집된 메트릭은 `[configured profile]`에 의해 결정됩니다.
원하는 메트릭이 다음 목록에 없으면 [글로벌 OID 참조 데이터베이스][1]에서 OID와 OID의 이름을 검색하여 프로필에 추가합니다.

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com