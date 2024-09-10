---
description: Oracle Exadata용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: Oracle Exadata에 대한 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 데이터베이스 모니터링이 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
이 페이지에 설명된 기능은 베타 버전입니다. 피드백을 제공하거나 도움을 요청하려면 Customer Success 매니저에게 문의하세요.
</div>

데이터베이스 모니터링은 쿼리 샘플을 노출하여 다양한 워크로드를 프로파일링하고 문제를 진단함으로써 Oracle 데이터베이스에 대한 심층적인 가시성을 제공합니다.

## 설정

데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 완료하세요:

### 다중 노드 Exadata

[Oracle RAC][8]의 지침에 따라 각 노드에 대한 Agent를 설정합니다.

### 단일 노드 Exadata

[자체 호스팅 Oracle 데이터베이스][7]에 대한 지침에 따라 Agent를 설정합니다.

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `oracle-dbm`을 찾아보세요. 시작하려면 Datadog의 [Databases][6] 페이지로 이동하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ko/database_monitoring/setup_oracle/selfhosted
[8]: /ko/database_monitoring/setup_oracle/rac

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}