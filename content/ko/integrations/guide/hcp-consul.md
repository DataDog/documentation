---
further_reading:
- link: /integrations/consul/
  tag: 설명서
  text: Consul 통합에 대해 알아보기
title: Datadog으로 HCP Consul 모니터링
---

## 개요

[Datadog Consul 통합][1]은 Consul 클라이언트를 통해 HCP Consul 환경에 대한 정보를 수집할 수 있습니다. HCP Consul은 [HashiCorp Cloud Platform][10]에서 컨트롤 플레인을 관리하는 Consul 버전입니다.

## 설정

Consul 메트릭 수집을 시작하려면:

1. [HCP Consul 시작하기 문서][2]에 따라 HCP Consul을 설정했는지 확인하세요.
2. [Consul 클라이언트][3]에 Datadog Agent를 설치합니다.
3. [Agent의 설정 디렉터리][5] 루트의 `conf.d/` 폴더에 있는 [`consul.d/conf.yaml` 파일][4]을 편집하고 `url` 설정 옵션을 Consul 클라이언트 URL로 설정합니다.
5. [Agent][6]를 재시작합니다.

## 수집된 메트릭

HCP Consul과 함께 Datadog Consul 통합을 사용하면 다음을 포함하여 [서버 상태][8]와 관련되지 않은 Consul 통합의 [기본 메트릭][7] 하위 집합을 수집합니다.

- Consul 노드에 대한 정보
- 네트워크 좌표(데이터 센터 간 및 데이터 센터 내부 지연 시간)
- [클러스터 상태][9] 메트릭

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/consul/?tab=host
[2]: https://developer.hashicorp.com/consul/tutorials/get-started-hcp
[3]: https://developer.hashicorp.com/hcp/docs/consul/usage/clients
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: /ko/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /ko/integrations/consul/?tab=host#metrics
[8]: https://www.consul.io/docs/agent/telemetry#server-health
[9]: https://www.consul.io/docs/agent/telemetry#cluster-health
[10]: https://developer.hashicorp.com/hcp/docs/consul