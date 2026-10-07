---
aliases:
- /ko/agent/autodiscovery/basic_autodiscovery
- /ko/getting_started/agent/autodiscovery
- /ko/agent/autodiscovery
description: Datadog Agent Autodiscovery를 사용하여 컨테이너화된 서비스를 자동으로 모니터링합니다. 템플릿을 구성하여
  컨테이너 전반의 서비스를 동적으로 탐지하고 모니터링합니다.
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: Autodiscovery 통합 템플릿 만들기 및 불러오기
- link: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
  tag: 설명서
  text: DatadogInstrumentation CRD로 Autodiscovery 구성
- link: /agent/guide/ad_identifiers/
  tag: 설명서
  text: 컨테이너를 상응하는 통함 템플릿과 매치
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 Agent Autodiscovery를 포함하도록 관리
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 애플리케이션에서 동적으로 태그 할당 및 수집
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: ECS Fargate 통합 설정
- link: /agent/configuration/secrets-management/
  tag: 설명서
  text: 시크릿 관리
title: 기본 Agent Autodiscovery
---
## 개요 {#overview}

컨테이너화된 인프라를 모니터링할 때 발생하는 한 가지 문제는 컨테이너가 호스트 간에 이동할 수 있다는 점입니다. 컨테이너화된 시스템의 동적 특성으로 인해 수동으로 모니터링하기가 어렵습니다.

이 문제를 해결하기 위해 Datadog의 Autodiscovery 기능을 사용하여 특정 컨테이너에서 실행 중인 서비스를 자동으로 식별하고 해당 서비스에서 데이터를 수집할 수 있습니다. 컨테이너가 시작될 때마다 Datadog Agent는 이 새 컨테이너에서 실행 중인 서비스를 식별하고, 해당 모니터링 구성을 찾은 후 메트릭 수집을 시작합니다.

Autodiscovery를 사용하면 Agent 검사에 대한 구성 템플릿을 정의하고 각 검사를 적용할 컨테이너를 지정할 수 있습니다.

Agent는 컨테이너 생성, 삭제, 시작 및 중지와 같은 이벤트를 감시합니다. 그런 다음 Agent는 이러한 이벤트 발생 시 정적 검사 구성을 활성화, 비활성화 및 재생성합니다. Agent는 실행 중인 각 컨테이너를 검사하면서 해당 컨테이너가 로드된 템플릿의 [Autodiscovery 컨테이너 식별자][1]와 일치하는지 확인합니다. 일치하는 항목이 있으면 Agent는 [템플릿 변수][2]를 일치하는 컨테이너의 특정 값으로 대체하여 정적 검사 구성을 생성합니다. 그런 다음 정적 구성을 사용하여 검사를 활성화합니다.

## 작동 방식 {#how-it-works}

{{< img src="agent/autodiscovery/ad_1.png" alt="Autodiscovery 개요" style="width:80%;">}}

위 그림에는 Redis 포드와 Agent 포드를 포함하여 3개의 포드가 있는 호스트 노드가 있습니다. 컨테이너를 예약하는 Kubelet은 이 노드에서 바이너리로 실행되며 `/metrics` 및 `/pods` 엔드포인트를 노출합니다. Agent는 10초마다 `/pods`를 쿼리하여 Redis 사양을 찾습니다. 또한 Redis 포드 자체에 대한 정보도 확인할 수 있습니다.

이 예제의 Redis 사양에는 다음 주석이 포함되어 있습니다.

{{< tabs >}}

{{% tab "AD 주석 v2(Agent 7.36 이상)" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"%%env_REDIS_PASSWORD%%"
          }
        ]
      }
    }
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

위 예시에서 `tags.datadoghq.com` 레이블은 포드의 `redis` 컨테이너에서 내보내는 모든 로그와 메트릭에 대해 `env`, `service`, 심지어 `version`까지 태그로 설정합니다. 이러한 표준 레이블은 [Unified Service Tagging][1]의 일부입니다. 모범 사례로서 Datadog은 태그와 환경 변수를 구성할 때 unified service tagging을 사용할 것을 권장합니다.

검사 구성 주석 키는 `ad.datadoghq.com/<container-name>.checks` 형식을 따릅니다.

`redisdb` 는 실행할 검사의 이름입니다. `init_config`에는 최소 수집 간격과 같은 일부 구성 파라미터가 포함되어 있으며 선택 사항입니다. `instances`의 각 항목은 검사 인스턴스 하나를 실행하기 위한 구성을 나타냅니다. **참고 사항**: 이 예시에서 `%%host%%`는 컨테이너의 IP로 동적으로 채워지는 템플릿 변수입니다.

[1]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "AD 주석 v1" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.check_names: '["redisdb"]'
  ad.datadoghq.com/redis.init_configs: '[{}]'
  ad.datadoghq.com/redis.instances: |
    [
      {
        "host": "%%host%%",
        "port":"6379",
        "password":"%%env_REDIS_PASSWORD%%"
      }
    ]
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

위 예시에서 `tags.datadoghq.com` 레이블은 포드의 `redis` 컨테이너에서 내보내는 모든 로그와 메트릭에 대해 `env`, `service`, 심지어 `version`까지 태그로 설정합니다. 이러한 표준 레이블은 [Unified Service Tagging][1]의 일부입니다. 모범 사례로서 Datadog은 태그와 환경 변수를 구성할 때 unified service tagging을 사용할 것을 권장합니다.

검사 구성 주석 키는 `ad.datadoghq.com/<container-name>.check_names`, `ad.datadoghq.com/<container-name>.init_configs`, `ad.datadoghq.com/<container-name>.instances` 형식을 따릅니다.

`check_names` 에는 실행할 검사 이름이 포함되어 있으며, `init_configs`에는 최소 수집 간격과 같은 일부 구성 파라미터가 포함되어 있습니다. `instances`의 각 항목은 검사 인스턴스 하나를 실행하기 위한 구성을 나타냅니다. **참고 사항**: 이 예시에서 `%%host%%`는 컨테이너의 IP로 동적으로 채워지는 템플릿 변수입니다.

[1]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

이를 통해 Agent는 정적 검사 구성을 생성합니다.

## 설정 {#setup}

인프라용 Autodiscovery를 설정하려면 2단계 절차를 거쳐야 합니다.

Datadog Agent에 대해 1. [Autodiscovery를 활성화합니다](#enable-autodiscovery).
2. 모니터링하려는 각 서비스에 대해 [통합별 구성 템플릿](#integration-templates)을 생성합니다. **참고**: Datadog은 Apache 및 Redis를 포함한 [일부 일반적인 컨테이너화된 서비스][3]에 대한 자동 구성 템플릿을 제공합니다.

### Autodiscovery 활성화 {#enable-autodiscovery}

Agent는 도달 가능한 소켓 및 API 엔드포인트(예: Docker, containerd, Kubernetes API)를 자동으로 탐지할 뿐만 아니라, 사용자를 위해 Autodiscovery를 활성화합니다.

Autodiscovery가 작동하지 않는 경우, `agent status`를 실행하여 탐지된 기능을 확인하세요.

Autodiscovery가 작동하지 않거나 자동으로 탐지된 기능을 비활성화하고자 하는 경우, `datadog.yaml`의 이 설정 파라미터를 사용해 기능을 포함/배제할 수 있습니다.

```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

자동으로 탐지된 기능의 전체 목록은 `datadog.yaml` 템플릿에서 확인할 수 있습니다.

### 통합 템플릿 {#integration-templates}

Autodiscovery를 활성화하면 Datadog Agent가 여러 [서비스][3]에 대해 자동으로 Autodiscovery를 시도합니다. Apache와 Redis를 포함한 여러 서비스가 기본 Autodiscovery 구성 파일을 기반으로 탐지됩니다.

통합 템플릿은 Kubernetes 포드 주석, Docker 라벨, Agent 내에 마운트된 설정 파일, ConfigMap, 키-값 저장소를 비롯하여 다양한 형식으로 정의할 수 있습니다. 자세한 내용은 [Autodiscovery 통합 템플릿][4] 문서를 참조하세요.

Kubernetes에서는 포드 주석 대신 `DatadogInstrumentation` 사용자 지정 리소스를 통해 특정 워크로드에 대한 검사를 설정할 수도 있습니다. [DatadogInstrumentation CRD로 Autodiscovery 구성][5]을 참조하세요.

### 참고 사항 {#notes}

Autodiscovery를 사용 중이고 애플리케이션이 새 노드에 배포된 경우, Datadog에 메트릭이 표시되기까지 다소 지연이 발생할 수 있습니다. 새 노드로 전환하면 Datadog Agent가 애플리케이션에서 메타데이터를 수집하는 데 시간이 걸립니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/ad_identifiers/
[2]: /ko/agent/faq/template_variables/
[3]: /ko/agent/faq/auto_conf/
[4]: /ko/agent/kubernetes/integrations/
[5]: /ko/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/