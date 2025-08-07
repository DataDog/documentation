---
aliases:
- /ko/observability_pipelines/production_deployment_overview/aggregator_architecture
- /ko/observability_pipelines/aggregator_architecture/
- /ko/observability_pipelines/architecture/
title: (레거시) OPW Aggregator 아키텍처 모범 사례
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">
이 가이드는 대규모 프로덕션 레벨 배포를 위한 것입니다..
</div>

## 개요

OPW(Observability Pipelines Worker) Aggregator 아키텍처는 중앙화된 데이터 프로세싱과 라우팅을 위해 독립실행형 서비스로 OPW를 배포합니다.

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role2.png" alt="네트워크 로드 밸런서를 보여주는 다이어그램, 다양한 소스로부터 데이터를 수신하여 여러 가용성 영역에 다수의 Worker를 두고 여러 싱크에 데이터를 전송하는 Observability Pipelines Worker Aggregator로 데이터를 전송" style="width:100%;" >}}

데이터 인터셉트와 데이터 조작이 가능한 기타 서비스와 마찬가지로, Observability Pipelines Worker를 인프라스트럭처에 배포한 다음 목적지로 포워드하세요. 각 Observability Pipelines Worker 인스턴스는 독립적으로 작동하므로 아키텍처를 단순한 로드 밸런서로 확장할 수 있습니다.

이 가이드에서는 새 Observability Pipelines Worker 사용자를 위한 권장 Aggregator 아키텍처를 소개합니다. 특히 다음과 같은 주제를 포함합니다.

- Observability Pipelines Worker Aggregator를 수평적으로 확장할 수 있는 [인스턴스 최적화][3] 방법
- Observability Pipelines Worker [용량 계획 및 확장][4]을 위해 리소스 용량을 추정하는 시작점 제공
- Observability Pipelines Worker를 위해 [네트워크 토폴로지 및 설정][5]을 구성하는 방법
- [높은 지속성][6] 및 [높은 가용성](#high-availability)을 확보하는 방법
- Observability Pipelines Worker를 [재해 복구][7]의 일부로 사용하는 방법
- 다양한 Aggregator를 배포하여 더 [향상된 설정][8], 게시-구독 시스템, 글로벌 집계를 사용하는 방법

[3]: /ko/observability_pipelines/legacy/architecture/optimize
[4]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling
[5]: /ko/observability_pipelines/legacy/architecture/networking
[6]: /ko/observability_pipelines/legacy/architecture/preventing_data_loss
[7]: /ko/observability_pipelines/legacy/architecture/availability_disaster_recovery
[8]: /ko/observability_pipelines/legacy/architecture/advanced_configurations