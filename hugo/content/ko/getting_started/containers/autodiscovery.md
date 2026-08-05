---
aliases:
- /ko/agent/autodiscovery/basic_autodiscovery
- /ko/getting_started/agent/autodiscovery
- /ko/agent/autodiscovery
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
- link: /agent/guide/ad_identifiers/
  tag: 설명서
  text: 컨테이너를 상응하는 통함 템플릿과 매치하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 에이전트 자동탐지를 포함하도록 관리하기
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 애플리케이션에서 동적으로 태그를 할당하고 수집하기
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: ECS Fargate 통합 설정
- link: /agent/configuration/secrets-management/
  tag: 설명서
  text: 시크릿 관리
title: 기본 에이전트 자동탐지
---

## 개요

컨테이너화된 인프라스트럭처를 모니터링하는 경우, 컨테이너가 한 호스트에서 다른 호스트로 이동할 수 있다는 문제가 발생합니다. 컨테이너화된 시스템의 동적인 성질로 인하여 수동 모니터링이 어려워집니다.

Datadog의 자동탐지 기능을 사용하여 특정 컨테이너에서 실행되고 있는 서비스를 자동으로 식별하고 해당 서비스에서 데이터를 수집하면 이 문제를 해결할 수 있습니다. 컨테이너가 시작될 때마다 Datadog 에이전트는 새로운 컨테이너에서 실행되는 서비스를 식별하고, 대응하는 모니터링 설정을 찾아 메트릭 수집을 시작합니다.

자동탐지를 사용하면 에이전트 점검의 설정 템플릿을 정의하고 각 점검 템플릿을 어떤 컨테이너에 적용할지 지정할 수 있습니다.

에이전트는 컨테이너 생성, 파기, 시작, 정지 등의 이벤트를 감시합니다. 또한, 에이전트는 이벤트 발생 시 정적 점검 설정을 활성화, 비활성화 또는 재생성합니다. 에이전트에서 실행 중인 각 컨테이너를 점검할 때는 불러온 템플릿 중 [자동탐지 컨테이너 식별자][1]에 해당 컨테이너가 일치하는지를 확인합니다. 에이전트에서 식별자와 컨테이너의 일치 사례를 발견하면, 일치한 컨테이너의 특정 값을 [템플릿 변수][2]에 대입하여 정적 점검 설정을 생성합니다. 이러한 정적 구성은 점검을 유효하게 하는 데 사용됩니다.

## 작동 방식

{{< img src="agent/autodiscovery/ad_1.png" alt="자동탐지 개요" style="width:80%;">}}

위 그림에서는 Redis 팟(Redis pod)과 에이전트 팟(에이전트 pod)을 포함하여 3개의 팟을 가진 호스트 노드가 있습니다. 컨테이너를 스케줄링하는 Kubelet은 이 노드에서 바이너리로 실행되며, 엔드포인트 `/metrics` 및 `/pods`를 공개합니다. 10초마다 에이전트는 `/pods`를 쿼리하고 Redis 스펙을 찾습니다. 또한 Redis 팟 자체에 대한 정보도 표시할 수 있습니다.

이번 사례의 Redis 스펙에는 다음 주석이 포함됩니다.

{{< tabs >}}

{{% tab "AD Annotations v2(에이전트 7.36+)" %}}
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

위의 사례에서 `tags.datadoghq.com` 라벨은 Redis 팟에서 발생(emit)하는 모든 로그와 메트릭의 태그로 `env`, `service` 또는 `version`을 설정합니다. 이러한 표준 라벨은 [통합 서비스 태깅][1]의 일부입니다. Datadog에서는 태그 및 환경 변수 설정 시 통합 서비스 태깅을 사용하시길 권장합니다.

`redisdb`는 실행할 점검의 이름입니다. `init_configs`에는 최소 수집 간격 등의 설정 파라미터가 포함됩니다. `instances`는 점검의 한 인스턴스에서 실행되는 설정을 나타냅니다. **참조**: 이번 사례에서 `%%host%%`는 컨테이너 IP에서 동적으로 생성되는 템플릿 변수입니다.

[1]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "AD Annotations v1" %}}
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

위의 사례에서 `tags.datadoghq.com` 라벨은 Redis 팟에서 발생(emit)하는 모든 로그와 메트릭의 태그로 `env`, `service` 또는 `version`을 설정합니다. 이러한 표준 라벨은 [통합 서비스 태깅][1]의 일부입니다. Datadog에서는 태그 및 환경 변수 설정 시 통합 서비스 태깅을 사용하시길 권장합니다.

`check_names`는 실행할 점검의 이름입니다. `init_configs`에는 최소 수집 간격 등의 설정 파라미터가 포함됩니다. `instances`는 점검의 한 인스턴스에서 실행되는 설정을 나타냅니다. **참조**: 이번 사례에서 `%%host%%`는 컨테이너 IP에서 동적으로 생성되는 템플릿 변수입니다.

[1]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

이제 에이전트가 정적 점검 설정을 생성합니다.

## 설정

인프라스트럭처용 자동탐지를 설정하려면 2단계 절차를 거쳐야 합니다.

1. Datadog 에이전트에서 [자동탐지를 활성화합니다](#enable-autodiscovery)
2. 모니터링하고자 하는 서비스마다 [통합별 설정 템플릿](#integration-templates)을 생성합니다. **참조**: Datadog는 Apache 및 Redis를 포함하여 [널리 쓰이는 일부 컨테이너화 서비스][3]를 대상으로 자동 설정 템플릿을 지원합니다.

### 자동탐지 활성화

에이전트에서 자동으로 도달 가능(reachable) 소켓과 API 엔드포인트(도커, 컨테이너화, 쿠버네티스 API 등)를 탐지할 뿐만 아니라, 사용자를 위해 자동탐지를 활성화합니다.

자동탐지가 작동하지 않는 경우에는 `agent status`를 실행해 탐지된 기능을 확인해보세요.

자동탐지가 작동하지 않거나 자동탐지 기능을 비활성화하고자 하는 경우, `datadog.yaml`의 이 설정 파라미터를 사용해 기능을 포함/배제할 수 있습니다.
```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

자동 탐지된 기능의 전체 목록은 `datadog.yaml` 템플릿에서 찾아볼 수 있습니다.

### 템플릿 통합

자동탐지를 활성화하면 Datadog 에이전트가 자동으로 여러 [서비스][3]에 자동탐지를 시도합니다. 탐지 시도 대상에는 Apache와 Redis 등이 포함되며, 기본 자동탐지 설정 파일을 기반으로 작동합니다.

통합 템플릿은 Kubernetes Pod 주석, Docker 레이블, 에이전트 내에 연결된 설정 파일, ConfigMap, 키 값 스토어를 비롯해 다양한 형식으로 정의할 수 있습니다. 자세한 정보는 [자동탐지 통합 템플릿][4] 가이드를 참고하세요.

### 참고

자동탐지를 사용하고 애플리케이션이 새 노드에 배포된 경우, Datadog에 메트릭이 표시되는 데 약간의 지연이 발생할 수 있습니다. 새 노드로 전환하면, Datadog 에이전트가 애플리케이션에서 메타데이터를 수집하는 데 시간이 걸립니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/ad_identifiers/
[2]: /ko/agent/faq/template_variables/
[3]: /ko/agent/faq/auto_conf/
[4]: /ko/agent/kubernetes/integrations/