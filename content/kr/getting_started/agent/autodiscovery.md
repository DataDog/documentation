---
aliases:
- /kr/agent/autodiscovery/basic_autodiscovery
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
- link: /agent/guide/ad_identifiers/
  tag: 설명서
  text: 컨테이너를 상응하는 통합 템플릿과 매치하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 Agent 자동탐지를 포함하도록 관리하기
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 애플리케이션에서 동적으로 태그를 할당하고 수집하기
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: ECS Fargate 통합 설정
- link: /agent/guide/secrets-management/
  tag: 설명서
  text: 시크릿 관리
kind: 설명서
title: 기본 Agent 자동탐지
---

## 개요

컨테이너화된 인프라스트럭처를 모니터링하는 경우, 컨테이너가 한 호스트에서 다른 호스트로 이동할 수 있다는 문제가 발생합니다. 컨테이너화된 시스템의 동적인 성질을 고려하면 수동으로 모니터링하기가 어렵습니다.

Datadog의 자동탐지 기능을 사용하여 특정 컨테이너에서 실행되고 있는 서비스를 자동으로 식별하고 해당 서비스에서 데이터를 수집하면 이 문제를 해결할 수 있습니다. 컨테이너가 시작될 때마다 Datadog Agent는 새로운 컨테이너에서 실행되는 서비스를 식별하고, 대응하는 모니터링 설정을 찾아 메트릭 수집을 시작합니다.

자동탐지를 사용하면 Agent 점검의 설정 템플릿을 정의하고 각 점검 템플릿을 어떤 컨테이너에 적용할지 지정할 수 있습니다.

Agent는 컨테이너 생성, 파기, 시작, 정지 등의 이벤트를 감시합니다. 또한, Agent는 이벤트 발생 시 정적 점검 설정을 활성화, 비활성화 또는 재생성합니다. Agent에서 실행 중인 각 컨테이너를 점검할 때는 불러온 템플릿 중 [자동탐지 컨테이너 식별자][1]에 해당 컨테이너가 일치하는지를 확인합니다. Agent에서 식별자와 컨테이너의 일치 사례를 발견하면, 일치한 컨테이너의 특정 값을 [템플릿 변수][2]에 대입하여 정적 점검 설정을 생성합니다. 이러한 정적 구성은 점검을 유효하게 하는 데 사용됩니다.

## 작동 방식

{{< img src="agent/autodiscovery/ad_1.png" alt="자동탐지 개요" style="width:80%;">}}

위 그림에서는 Redis 팟(Redis pod)과 Agent 팟(Agent pod)을 포함하여 3개의 팟을 가진 호스트 노드가 있습니다. 컨테이너를 스케줄링하는 Kubelet은 이 노드에서 바이너리로 실행되며, 엔드포인트 `/metrics` 및 `/pods`를 공개합니다. 10초마다 Agent는 `/pods`를 쿼리하고 Redis 스펙을 찾습니다. 또한 Redis 팟 자체에 대한 정보도 표시할 수 있습니다.

이번 사례의 Redis 스펙에는 다음의 어노테이션이 포함됩니다.

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

위의 사례에서 `tags.datadoghq.com` 라벨은 Redis 팟에서 발생(emit)하는 모든 로그와 메트릭의 태그로 `env`, `service` 또는 `version`을 설정합니다. 이러한 표준 라벨은 통합 서비스 태깅의 일부입니다. Datadog에서는 태그 및 환경 변수 설정 시 통합 서비스 태깅을 사용하시길 권장합니다.

`check_names`는 실행할 점검의 이름입니다. `init_configs`에는 최소 수집 간격 등의 설정 파라미터가 포함됩니다. `instances`는 점검의 한 인스턴스에서 실행되는 설정을 나타냅니다. **참조**: 이번 사례에서 `%%host%%`는 컨테이너 IP에서 동적으로 생성되는 템플릿 변수입니다.

이제 Agent가 정적 점검 설정을 생성합니다.

## 구성

인프라스트럭처용 자동탐지를 설정하려면 2단계 절차를 거쳐야 합니다.

1. Datadog Agent에서 [자동탐지를 활성화합니다](#enable-autodiscovery)
2. 모니터링하고자 하는 서비스마다 [통합별 설정 템플릿](#integration-templates)을 생성합니다. **참조**: Datadog는 Apache 및 Redis를 포함하여 [널리 쓰이는 일부 컨테이너화 서비스][4]를 대상으로 자동 설정 템플릿을 지원합니다.

### 자동탐지 활성화

#### 호스트 상의 Agent를 사용하는 경우

{{< tabs >}}
{{% tab "Docker" %}}

`datadog.yaml` [설정 파일][1]에 다음 설정 블록을 추가하세요.

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /kr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Kubernetes" %}}

`datadog.yaml` [설정 파일][1]에 다음 설정 블록을 추가하세요.

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # needed to support legacy docker label config templates
  - name: docker
    polling: true
```

[1]: /kr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "ECS Fargate" %}}

ECS Fargate는 호스트에서 바이너리로 실행된 Datadog Agent로 모니터링할 수 없다는 점에 유의하세요.

{{% /tab %}}
{{< /tabs >}}

#### 컨테이너로 Agent를 사용하는 경우

{{< tabs >}}
{{% tab "Docker" %}}

Docker 컨테이너에서 자동적으로 자동탐지를 활성화하려면 `/var/run/docker.sock`을 컨테이너화 Agent에 마운트하세요. Windows의 경우에는 `\\.\pipe\docker_engine`를 마운트하세요.

{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스(Kubernetes)에서는 자동탐지가 기본으로 활성화되어 있습니다.

이를 검증하려면 다음의 환경 변수가 설정되었는지 확인하세요.

```shell
KUBERNETES=yes
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

쿠버네티스(Kubernetes) 내 컨테이너에 자동탐지를 활성화하려면, 컨테이너화 Agent를 시작할 때 다음의 환경 변수를 추가하세요.

```shell
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

### 통합 템플릿

자동탐지를 활성화하면 Datadog Agent가 자동으로 여러 [서비스][4]에 자동탐지를 시도합니다. 탐지 시도 대상에는 Apache와 Redis 등이 포함되며, 기본 자동탐지 설정 파일을 기반으로 작동합니다.

통합 템플릿은 쿠버네티스(Kubernetes) 팟 어노테이션, 도커(Docker) 라벨, Agent 내에 마운트된 설정 파일, ConfigMap, 키-값(Key-Value) 스토어(Store)를 비롯하여 다양한 형식으로 정의할 수 있습니다.

다음 예시에서는 팟 데이터에 `env`, `service`, `version` 태그를 설정하는 용도로 `tags.datadoghq.com` 쿠버네티스 라벨을 사용했습니다.

Redis 통합 템플릿은 쿠버네티스 팟 어노테이션을 통해 정의됩니다. 여기에는 사용자 설정된 `password` 파라미터가 포함되며, 정확한 `source`의 로그 전체에 태그를 지정합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  ## name of your Pod
  name: my-redis
  labels:
    ## set standard labels for unified service tagging
    tags.datadoghq.com/redis.env: prod
    tags.datadoghq.com/redis.service: my-redis
    tags.datadoghq.com/redis.version: "6.0.3"
  annotations:
    ## names of check; matches name in integrations_core repo
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ## some configs, like minimum collection interval
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        ## config to run for one instance of check
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ## setup for logs collection
    ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

다른 서비스에서 자동탐지를 사용하려면 모니터링하고자 하는 서비스용 템플릿을 정의하세요. 자세한 정보는 [자동탐지 통합 템플릿][5] 설명서를 참조하시기 바랍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/agent/guide/ad_identifiers/
[2]: /kr/agent/faq/template_variables/
[3]: /kr/getting_started/tagging/unified_service_tagging
[4]: /kr/agent/faq/auto_conf/
[5]: /kr/agent/kubernetes/integrations/