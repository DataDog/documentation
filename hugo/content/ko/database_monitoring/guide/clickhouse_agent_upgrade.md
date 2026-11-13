---
aliases:
- /ko/database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: /database_monitoring/
  tag: 문서
  text: Database Monitoring
- link: /database_monitoring/setup_clickhouse/
  tag: 문서
  text: ClickHouse 설정하기
- link: /database_monitoring/troubleshooting/
  tag: 문서
  text: Database Monitoring 문제 해결하기
title: 7.84 이전 Agent 버전에서 ClickHouse 통합 업그레이드하기
---
## 개요 {#overview}

ClickHouse용 Database Monitoring을 사용하려면 Datadog Agent 7.84 이상이 필요합니다. 이전 버전의 Agent와 통합을 설정한 경우 이 가이드에 따라 업그레이드하세요.

Agent 버전 7.84부터 ClickHouse용 Database Monitoring은 클러스터의 어떤 노드에서 각 쿼리를 실행했는지 보여줍니다. 쿼리 메트릭, 쿼리 샘플, 완료된 쿼리 및 쿼리 오류는 해당 쿼리를 처리한 노드로 태그가 지정되므로 다음 작업을 수행할 수 있습니다.

- 노드 간에 동일한 쿼리의 성능 비교
- 느리거나 실패하는 쿼리를 담당하는 노드 찾기
- 클러스터 내 노드 간의 불균형한 부하 파악

노드를 식별하기 위해 Agent는 각 인스턴스가 속한 클러스터와 해당 인스턴스가 ClickHouse Cloud에서 실행되는지 또는 자체 호스팅되는지도 보고합니다. 이 정보는 다음과 같은 태그로 추가됩니다.

| 태그 | 설명 |
|---|---|
| `clickhouse_node` | 쿼리를 실행한 노드입니다. |
| `clickhouse_cluster` | 인스턴스가 속한 ClickHouse 클러스터입니다. |
| `hosting_type` | `clickhouse-cloud` 또는 `self-hosted`입니다. |

Agent가 이전 설정 지침에서 액세스 권한을 부여하지 않았던 ClickHouse 시스템 테이블에서 이 정보를 읽어옵니다. 7.84 이전 버전의 Agent와 통합을 설정한 경우 Agent를 업그레이드하기 전에 아래의 추가 권한을 부여하세요. Agent는 시작할 때만 새로운 권한을 인식하므로, 업그레이드한 다음에 권한을 부여했다면 [Agent를 재시작](#restart-the-agent)하세요.

## 추가 권한 부여 {#grant-the-additional-permissions}

관리자 권한으로 ClickHouse에 연결하고 다음 문을 실행하세요. 모니터링 사용자 이름이 `datadog`이 아니면 이 이름을 사용자 이름으로 바꾸세요.

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

## Agent 재시작 {#restart-the-agent}

Agent는 시작 시 클러스터를 한 번 조회하며 재시작할 때까지 해당 조회 결과를 계속 사용합니다. 업그레이드 전에 권한을 적용했다면 업그레이드 시 Agent가 재시작되므로 추가 작업이 필요하지 않습니다. 업그레이드 후에 적용했다면, [Agent를 재시작][1]하세요.

## 업그레이드 확인 {#verify-the-upgrade}

Agent가 재시작된 후, [Database Monitoring][2]에서 ClickHouse 인스턴스를 열고 다음을 확인하세요.

- 쿼리 데이터에 `clickhouse_node` 태그가 지정되어 있습니다.
- `hosting_type` 태그는 ClickHouse Cloud 서비스의 경우 `clickhouse-cloud`이고, 다른 배포의 경우 `self-hosted`입니다.

`clickhouse_node` 태그가 누락된 경우 다음을 확인하세요.

- [Agent 상태 명령][3]을 실행하고 ClickHouse 검사에서 권한 오류가 있는지 확인하세요.
- 위의 권한이 모든 노드에서 Agent가 연결하는 사용자에게 적용되었는지 확인하세요.
- 클러스터에 `{cluster}` 매크로 또는 Agent가 연결되는 노드를 포함하는 `<remote_servers>` 항목이 정의되어 있는지 확인하세요. 둘 다 구성되지 않은 경우 Agent가 클러스터를 식별할 수 없어 `clickhouse_cluster` 태그가 보고되지 않습니다.

`hosting_type` 태그가 `unknown`이면 Agent가 `system.settings` 또는 `system.table_engines`를 읽을 수 없습니다. 두 테이블에 대해 `GRANT SELECT` 문이 적용되었는지 확인한 다음 [Agent를 재시작][1]하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/databases
[3]: /ko/agent/configuration/agent-commands/#agent-status-and-information