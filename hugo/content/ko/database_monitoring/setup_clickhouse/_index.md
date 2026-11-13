---
aliases:
- /ko/database_monitoring/guide/clickhouse/
description: ClickHouse 데이터베이스에 Database Monitoring 설정하기
disable_sidebar: true
further_reading:
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: 설명서
  text: 7.84 이전 Agent 버전에서 ClickHouse 통합 업그레이드하기
- link: https://www.datadoghq.com/blog/database-monitoring-for-clickhouse/
  tag: 블로그
  text: Datadog Database Monitoring으로 ClickHouse 쿼리 성능 모니터링하기
title: ClickHouse 설정하기
---
<div class="alert alert-info">
이 기능은 미리 보기로 제공되며 Datadog Agent v7.78 이상이 필요합니다. Datadog Database Monitoring for ClickHouse 미리 보기에 참여하는 고객은 미리 보기 기간 동안 발생한 사용량에 대해 <strong>요금이 청구되지 않습니다</strong>. 추가 활성화는 필요하지 않습니다. 시작하려면 아래 설정 지침을 따르세요.
</div>

### 지원되는 ClickHouse 버전 {#clickhouse-versions-supported}

|                              | 자체 호스팅 | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |

### 호스팅 유형별 설정 지침 {#setup-instructions-by-hosting-type}

ClickHouse 데이터베이스에서 Database Monitoring을 설정하는 방법을 알아보려면 호스팅 유형을 선택하세요.

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="자체 호스팅" title="자체 호스팅" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse 클라우드" title="ClickHouse 클라우드" >}}
{{< /card-grid >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}