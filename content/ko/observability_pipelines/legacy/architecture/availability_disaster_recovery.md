---
aliases:
- /ko/observability_pipelines/architecture/availability_disaster_recovery/
title: (레거시) 고가용성 및 장애 복구
---

<div class="alert alert-info">
본 지침은 대규모 프로덕션 수준 배포용입니다.
</div>

관측성 파이프라인의 맥락에서 고가용성이란 시스템 문제가 발생하더라도 관측성 파이프라인 작업자를 계속 사용할 수 있는 상태를 의미합니다.

{{< img src="observability_pipelines/production_deployment_overview/high_availability.png" alt="로드 밸런서 1이 오프라인이고 두 에이전트가 로드 밸런서 2로 데이터를 전송한 후, 작업자 1과 작업자 2로 전송하는 가용성 영역 1을 나타내는 다이어그램. 가용성 영역 2에서 작업자 3이 다운되었으므로 두 로드 밸런서가 모두 작업자 N으로 데이터를 전송하고 있습니다." style="width:65%;" >}}

고가용성을 달성하기 위해 다음을 수행합니다.

1. 각 가용성 영역에 최소 두 개의 관측성 파이프라인 작업자 인스턴스를 배포합니다.
2. 최소 두 개의 가용성 영역에 관측성 파이프라인 작업자를 배포합니다.
3. 관측성 파이프라인 작업자 인스턴스 간의 트래픽을 밸런싱하는 로드 밸런서를 사용하여 관측성 파이프라인 작업자 인스턴스를 프론트로 가져옵니다. 자세한 내용은 [용량 계획 및 확장][1]을 참조하세요.

## 장애 시나리오 완화

### 관측성 파이프라인 작업자 프로세스 문제 처리하기

시스템 프로세스 문제를 완화하려면, 관측성 파이프라인 작업자를 다중 노드 전반에 분산시키고, 필요에 따라 트래픽을 다른 관측성 파이프라인 작업자 인스턴스로 리디렉션할 수 있는 네트워크 로드 밸런서로 프론트로 가져옵니다. 또한 플랫폼 수준의 자동화 자체 복구를 실시하면 결국 프로세스를 다시 시작하거나 노드를 교체해야 합니다.

{{< img src="observability_pipelines/production_deployment_overview/process_failure.png" alt="각각 관측성 파이프라인 작업자가 있는 노드 세 개를 표시하는 다이어그램." style="width:45%;" >}}

### 노드 장애 완화

노드 문제를 완화하려면, 관측성 파이프라인 작업자를 다중 노드 전반에 분산시키고, 트래픽을 다른 관측성 파이프라인 작업자 노드로 리디렉션할 수 있는 네트워크 로드 밸런서로 프론트로 가져옵니다. 또한 플랫폼 수준의 자동화 자체 복구를 실시하면 결국 노드를 교체해야 합니다.

{{< img src="observability_pipelines/production_deployment_overview/node_failure.png" alt="노드 1의 로드 밸런서로 이동하는 데이터를 나타내는 다이어그램이나 노드 1에서 관측성 파이프라인 작업자가 다운되어 데이터가 노드 2와 노드 N의 작업자로 전송됩니다." style="width:40%;" >}}

### 가용성 영역 장애 처리하기

가용성 영역의 문제를 완화하려면 다중 가용성 영역에 관측성 파이프라인 작업자를 배포합니다.

{{< img src="observability_pipelines/production_deployment_overview/availability_zone_failure.png" alt="가용성 영역 1에서 로드 밸런서와 관측성 파이프라인 작업자가 다운되었음을 나타내는 다이어그램이나 영역 N의 로드 밸런서와 작업자는 데이터를 수신 및 전송하고 있습니다." style="width:45%;" >}}

### 리전 장애 완화

관측성 파이프라인 작업자는 내부 관측성 데이터를 라우팅하도록 설계되었으므로 다른 리전으로 장애 조치해서는 안 됩니다. 대신 관측성 파이프라인 작업자는 모든 리전에 배포되어야 합니다. 따라서 네트워크 또는 리전 전체에서 장애가 발생하면 관측성 파이프라인 작업자도 장애가 발생합니다. 자세한 내용은 [네트워킹][2]을 참조하세요.

## 장애 복구

### 내부 장애 복구

관측성 파이프라인 작업자는 내부 관측성 데이터를 라우팅하도록 설계된 인프라스트럭처 수준의 도구입니다. 해당 도구는 공유되지 않는 아키텍처를 구현하며, 장애 복구(DR) 사이트로 복제하거나 전송해야 하는 상태를 관리하지 않습니다. 따라서 전체 리전에 장애가 발생하면 관측성 파이프라인 작업자도 장애가 발생합니다. 따라서 보다 폭넓은 DR 플랜의 일환으로 DR 사이트에 관측성 파이프라인 작업자를 설치해야 합니다.

### 외부 장애 복구

Datadog와 같은 관리 대상을 사용하는 경우, 관측성 파이프라인 작업자는 서킷 프레이커 기능을 사용하여 Datadog DR 사이트로 데이터를 자동으로 라우팅할 수 있습니다.

{{< img src="observability_pipelines/production_deployment_overview/external_disaster_recovery.png" alt="다양한 영역의 관측성 파이프라인 작업자를 표시하는 다이어그램으로, 모든 작업자가 동일한 장애 복구 대상에 데이터를 전송합니다. " style="width:75%;" >}}

[1]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling
[2]: /ko/observability_pipelines/legacy/architecture/networking