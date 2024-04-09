---
aliases:
- /ko/network_performance_monitoring/devices/profiles/
further_reading:
- link: /network_monitoring/devices/data
  tag: 설명서
  text: 네트워크 장치 모니터링과 함께 수집된 데이터
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링하기
kind: 설명서
title: NDM 프로필
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">네트워크 기기 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

네트워크 장치 모니터링은 프로필을 사용하여 수집할 메트릭과 관련 태그를 Datadog 에이전트에 알려줍니다. 프로필은 장치와 연결된 OID 컬렉션입니다.

## 설정

기본적으로 에이전트 설정 디렉토리의 모든 프로필이 로드됩니다. 수집할 특정 프로필을 사용자 지정하려면 `definition_file` 아래에 파일 이름으로 명시적으로 참조하거나 `definition`의 인라인 목록을 제공합니다. Datadog 프로필은 이름별로 나열할 수 있습니다. 추가 커스텀 프로필은 구성의 파일 경로에서 참조하거나 설정 디렉토리에 배치할 수 있습니다.

**참고**: 일반 프로필은 [generic-device.yaml][1]이며, 라우터, 스위치 등을 지원합니다.

### sysOID 매핑된 장치

프로필을 통해 네트워크 장치 모니터링은 여러 장치 유형 또는 인스턴스에서 메트릭 정의를 재사용할 수 있습니다. 프로필은 설정 파일의 인라인 또는 별도 파일의 인스턴스와 동일한 방법으로 메트릭을 정의합니다. 각 인스턴스는 단일 프로필만 일치시킬 수 있습니다. 예를 들어 다음 `init_config` 섹션에서 프로필을 정의할 수 있습니다:

```yaml
init_config:
  profiles:
    my-profile:
      definition:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
          index: 1
      sysobjectid: '1.3.6.1.4.1.8072.3.2.10'
```

그런 다음 이름으로 명시적으로 참조하거나 sysObjectID 감지를 사용합니다:

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile
   - ip_address: 192.168.34.11
     # Don't need anything else here, the check will query the sysObjectID
     # and use the profile if it matches.
```

필요한 경우 인스턴스에서 추가 메트릭을 정의할 수 있습니다. 이러한 메트릭은 프로필에 있는 메트릭과 함께 수집됩니다.

### 프로필에 의한 메트릭 정의

프로필은 상호 교환하여 사용할 수 있습니다. 즉, MIB 종속성을 공유하는 장치는 동일한 프로필을 재사용할 수 있습니다. 예를 들어 [Cisco c3850 프로필][2]은 여러 Cisco 스위치에서 사용할 수 있습니다.

Datadog에서 제공하는 프로필에 대한 자세한 내용은 [GitHub 저장소][3]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml
[3]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/default_profiles