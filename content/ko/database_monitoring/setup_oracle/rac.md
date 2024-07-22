---
description: Oracle RAC용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: Oracle RAC용 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 데이터베이스 모니터링이 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
이 페이지에 설명된 기능은 비공개 베타 버전입니다. 피드백을 제공하거나 도움을 요청하려면 Customer Success Manager에게 문의하세요.
</div>

데이터베이스 모니터링은 쿼리 샘플을 노출하여 다양한 워크로드를 프로파일링하고 문제를 진단함으로써 Oracle 데이터베이스에 대한 심층적인 가시성을 제공합니다.

<div class="alert alert-danger">
아래 단계를 완료하기 전에 데이터베이스 모니터링에 대한 <a href="/database_monitoring/setup_oracle/?tab=linux#prerequisites">사전 요구 사항</a>을 충족했는지 확인하세요.
</div>

## 설정

데이터베이스 모니터링을 활성화하려면 다음 단계를 완료하세요:

[자체 호스팅 Oracle 데이터베이스][7]에 대한 지침에 따라 각 RAC 노드에 대한 Agent를 설정합니다.

에이전트는 `V$` 뷰를 쿼리하여 모든 노드에서 개별적으로 정보를 수집하므로 각 실제 애플리케이션 클러스터(RAC)노드에 대해  Agent를 설정해야 합니다.  Agent는 상호 연결 트래픽 생성을 방지하기 위해 `GV$` 뷰를 쿼리하지 않습니다. 각 RAC 노드에서 수집된 데이터는 프론트엔드에서 집계됩니다.

```yaml
init_config:
instances:
  - server: '<RAC_NODE_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # 선택 사항
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RAC_NODE_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # 선택 사항
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Agent는 CDB에만 연결합니다. CDB에 연결되어 있는 동안 PDB에 대한 정보를 쿼리합니다. 개별 PDB에 대한 연결은 생성하지 마세요.

`rac_cluster` 설정 파라미터를 RAC 클러스터 이름이나 사용자에게 익숙한 별칭으로 설정합니다. `rac_cluster` 필터는 [DBM Oracle Database Overview 대시보드][8]에서 모든 RAC 노드를 선택하는 데 도움이 됩니다. 원하는 데이터베이스에 대해 추가 필터를 설정할 수 있습니다.

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `oracle-dbm`을 찾습니다. 시작하려면 Datadog의 [Databases][6] 페이지로 이동하세요.

## 커스텀 쿼리

데이터베이스 모니터링은 Oracle 데이터베이스에 대한 커스텀 쿼리를 지원합니다. 사용 가능한 구성 옵션에 대해 자세히 알아보려면 [conf.yaml.example][11]을 참조하세요.

<div class="alert alert-warning">커스텀 쿼리를 실행하면 Oracle에서 부과하는 추가 비용 또는 수수료가 발생할 수 있습니다.</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ko/database_monitoring/setup_oracle/selfhosted
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}