---
aliases:
- /ko/agent/docker/tag
further_reading:
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: Datadog에서 태그 활용하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
title: 도커(Docker) 태그 추출
---

## 개요

Datadog 에이전트는 라벨 또는 환경 변수를 기반으로 컨테이너에서 내보낸 모든 메트릭, 트레이스 및 로그에 태그를 생성하고 할당할 수 있습니다.

에이전트를 호스트에서 바이너리로 실행 중인 경우, [에이전트](?tab=agent) 탭 지침을 사용하여 태그 추출을 설정합니다. 에이전트를 컨테이너로 실행 중인 경우 [컨테이너화된 에이전트](?tab=containerizedagent) 탭 지침을 사용하여 태그 추출을 설정합니다.

### 즉시 사용 가능한 태깅

에이전트는 컨테이너에서 내보낸 모든 데이터에 태그를 자동 검색하고 첨부할 수 있습니다. 첨부된 태그 목록은 에이전트 [카디널리티 설정][1]에 따라 다릅니다.

| 태그                 | 카디널리티  | 요구 사항                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | 높음         | N/A<br/> **참고**: 컨테이너 런타임에는 포함되지 않습니다.                                         |
| `container_id`       | 높음         | N/A                                         |
| `rancher_container`  | 높음         | 랜처 환경                         |
| `mesos_task`         | 오케스트레이터 | 메소스 환경                           |
| `docker_image`       | 낮음          | N/A<br/> **참고**: 컨테이너화된 런타임에는 포함되지 않습니다.                                         |
| `image_name`         | 낮음          | N/A                                         |
| `short_image`        | 낮음          | N/A                                         |
| `image_tag`          | 낮음          | N/A                                         |
| `swarm_service`      | 낮음          | 스웜 환경                           |
| `swarm_namespace`    | 낮음          | 스웜 환경                           |
| `rancher_stack`      | 낮음          | 랜처 환경                         |
| `rancher_service`    | 낮음          | 랜처 환경                         |
| `env`                | 낮음          | [통합 서비스 태깅][2] 활성화됨        |
| `version`            | 낮음          | [통합 서비스 태깅][2] 활성화됨        |
| `service`            | 낮음          | [통합 서비스 태깅][2] 활성화됨        |
| `marathon_app`       | 낮음          | 마라톤 환경                        |
| `chronos_job`        | 낮음          | 메소스 환경                           |
| `chronos_job_owner`  | 낮음          | 메소스 환경                           |
| `nomad_task`         | 낮음          | 노마드 환경                           |
| `nomad_job`          | 낮음          | 노마드 환경                           |
| `nomad_group`        | 낮음          | 노마드 환경                           |
| `git.commit.sha`     | 낮음          | [org.opencontainers.image.revision][3] 사용됨 |
| `git.repository_url` | 낮음          | [org.opencontainers.image.source][3] 사용됨   |

### 통합 서비스 태깅

컨테이너화된 환경의 모범 사례로, Datadog에서는 태그를 할당할 때 통합 서비스 태깅 사용을 권장합니다. 통합 서비스 태깅은 `env`, `service` 및 `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 결합합니다.  통합 태깅으로 환경 설정하는 방법을 자세히 알아보려면 [통합 서비스 태깅 설명서][2]를 참조하세요.

## 라벨을 태그로 추출

에이전트 v6.0+ 부터는 에이전트가 지정된 컨테이너에 대한 라벨을 수집하고, 이 컨테이너에서 내보내는 모든 데이터에 첨부할 태그로 사용할 수 있습니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

지정된 컨테이너 라벨 `<LABEL_NAME>`을 추출하고 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 다음 환경 변수를 Datadog 에이전트에 추가하세요: 

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<LABEL_NAME>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**참고**: `<LABEL_NAME>`은 대소문자를 구분하지 않습니다. 예를 들어, `foo`와 `FOO`라는 라벨이 있고, `DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'`를 설정하면, 는 `foo`와 `FOO` 둘다 `bar`에 매핑됩니다.

**참고**: `DD_CONTAINER_LABELS_AS_TAGS`는 기존의 `DD_DOCKER_LABELS_AS_TAGS`, 그리고 `DD_CONTAINER_ENV_AS_TAGS`는`DD_DOCKER_ENV_AS_TAGS`와 같습니다.

{{% /tab %}}
{{% tab "Agent" %}}

지정된 컨테이너 라벨 `<LABEL_NAME>`을 추출하고 Datadog 내에서 태그 키`<TAG_KEY>`로 변환하려면 [에이전트 `datadog.yaml`설정 파일][1]에 다음 설정 블록을 추가하세요:

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 환경 변수를 태그로 추출

Datadog은 [도커(Docker), 쿠버네티스(Kubernetes), ECS, 스웜, 메소스, 노마드 및 랜처][4]에서 공통 태그를 자동으로 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수               | 설명                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | 컨테이너 라벨 추출                |
| `DD_CONTAINER_ENV_AS_TAGS`         | 컨테이너 환경 변수 추출 |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | 팟 라벨을 추출합니다.                      |
| `DD_CHECKS_TAG_CARDINALITY`        | 메트릭 확인을 위한 태그 추가               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | 커스텀 메트릭에 태그 추가              |

에이전트 v7.20+부터, 컨테이너화된 에이전트는 컨테이너 라벨에서 태그를 자동 검색할 수 있습니다. 이 프로세스를 통해 에이전트는 에이전트 `datadog.yaml` 파일을 수정하지 않고 컨테이너에서 내보낸 모든 데이터에 커스텀 태그를 연결할 수 있도록 합니다.

다음 형식을 사용하여 태그를 추가해야 합니다:

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

에이전트 v6.0+에서는 에이전트가 지정된 컨테이너에 대한 환경 변수를 수집하고 이 컨테이너에서 내보낸 모든 데이터에 첨부하기 위한 태그로 사용할 수 있습니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

지정된 컨테이너 환경 변수`<ENVVAR_NAME>`을 추출하고 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 다음 환경 변수를 Datadog 에이전트에 추가하세요:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

지정된 컨테이너 환경 변수`<ENVVAR_NAME>`를 추출하고 Datadog 내에서 태그 키`<TAG_KEY>`로 변환하려면 [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가하세요:

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /ko/agent/docker/?tab=standard#tagging