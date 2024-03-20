---
aliases:
- /ko/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
kind: 가이드
title: SQL 서버 통합에서 메트릭을 더 수집하는 방법
---

## 개요

기본적으로 SQL Server 통합에서는 [설명서 페이지에 안내된 메트릭 목록][1]에 있는 메트릭만 수집합니다. 그러나 [예시 구문 파일][2]에 따라 `sqlserver.d/conf.yaml`을 구성하면 SQL Server 통합에서 추가 메트릭을 수집할 수 있습니다(이는 "init_config" 아래에 수집됨).

다른 카운터 테이블에서 [WMI를 사용해 메트릭을 노출][4]할 수 있지만, 현재 Datadog sqlserver 점검에서는 [sys.dm_os_performance_counters][3] 테이블에서만 데이터를 쿼리합니다. 특정 데이터를 수집하려면 `counter_name`를 찾고, 가능할 경우에는 수집하고자 하는 메트릭과 연관된  `instance_name`도 찾습니다. [PowerShell의 sqlcmd][5]를 통해 서버에 액세스하면 다음과 유사한 쿼리를 실행해 SQL Server 내 해당 테이블에서 사용할 수 있는 `count_names` 목록을 얻을 수 있습니다.

**참고**: 반환되는 목록이 기니 참고하세요.

```text
1> SELECT counter_name, instance_name, cntr_value, cntr_type FROM sys.dm_os_performance_counters;
2> go
```

여기에서 원하는 counter_names를 선택하고, sqlserver.yaml의 커스텀 메트릭 섹션 내 "counter_name" 옵션에 추가한 후, "- name:" 옵션에 적절한 메트릭 이름을 넣으세요(시작은 다른 sqlserver 메트릭과 동일하게 "sqlserver"로 시작하는 것이 좋음). 

## 예시

CLR Execution, Queued reqeusts, Active requests 속성을 위해 메트릭을 수집하고 싶을 경우 `sqlserver.d/conf.yaml`이 다음 예시와 같이 나타납니다.

```yaml
init_config:

  custom_metrics:

    - name: sqlserver.clr.execution
      counter_name: CLR Execution
    - name: sqlserver.requests.queued
      counter_name: Queued requests
      instance_name: internal
    - name: sqlserver.requests.active
      counter_name: Active requests
      instance_name: internal

instances:
  - host: 127.0.0.1,1433
    username: datadog
    password: *******
    tags:
      - test:sqlserver
```

[1]: /ko/integrations/sqlserver/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://msdn.microsoft.com/en-us/library/ms187743.aspx
[4]: /ko/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/
[5]: https://msdn.microsoft.com/en-us/library/ms188247.aspx