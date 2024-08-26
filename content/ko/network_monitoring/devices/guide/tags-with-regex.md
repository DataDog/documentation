---
aliases:
- /ko/network_performance_monitoring/devices/guide/tags-with-regex/
further_reading:
- link: /network_monitoring/devices/setup
  tag: 설명서
  text: 네트워크 장치 모니터링 설정
- link: /getting_started/tagging
  tag: 설명서
  text: 태그 시작하기
title: 정규식으로 NDM 태그
---

Datadog 네트워크 장치 모니터링(NDM)은 형식 `<KEY>:<VALUE>`에서 메트릭 태그를 생성하기 위해 정규식을 지원합니다.

## 구성

### 설치

[설정 설명서][1]에 따라 Datadog NDM을 설치합니다.

### 설정

[SNMP conf.yaml][2]에서 OID로부터 `metric_tags`를 지정할 수 있습니다. 장치에 대한 여러 태그를 만들려면 정규식을 사용하여 결과 값을 여러 태그로 구분하거나 일반 [Python 엔진][3]을 사용하여 하위 문자열을 가져옵니다.

#### OID

아래 예시에서는 OID 값에 정규식 일치를 사용하여 두 개의 태그를 만듭니다. 따라서 OID 값이 `41ba948911b9`인 경우 `host_prefix:41` 및 `host:ba948911b9`태그가 해당 메트릭에 추가됩니다.

```yaml
    metric_tags:
     - # From an OID:
       symbol:
          OID: 1.3.6.1.2.1.1.5.0
          name: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

아래 예시에서는 테이블에 정규식을 사용하여 태그를 생성합니다:

```yaml
metrics:
  - MIB: IF-MIB
    table:
      OID: 1.3.6.1.2.1.2.2
      name: ifTable
    symbols:
      - OID: 1.3.6.1.2.1.2.2.1.10
        name: ifInOctets
    metric_tags:
      - column':
          OID: 1.3.6.1.2.1.2.2.1.2
          name: ifDescr
        match: '(\w)(\w+)'
        tags:
         - prefix: '\1' 
         - suffix: '\2'
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/network_monitoring/devices/setup
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html