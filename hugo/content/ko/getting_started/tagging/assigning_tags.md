---
aliases:
- /ko/agent/tagging
- /ko/tagging/assigning_tags/
description: Datadog에서 태그를 할당하는 방법 알아보기.
further_reading:
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: Datadog에서 태그를 사용하는 방법 알아보기
title: 태그 할당
---
## 개요 {#overview}

태깅은 Datadog 전반에서 사용되며, 모니터링하는 시스템과 메트릭을 조회하는 데 활용됩니다. 태그를 할당하고 이를 기준으로 필터링할 수 없다면, 환경에서 문제를 찾고 원인을 좁혀 실제 근본 원인을 발견하는 것이 어려울 수 있습니다. 계속 진행하기 전에 Datadog에서 [태그 정의][1] 방법을 알아보세요.

태그는 다음과 같은 여러 방식으로 구성할 수 있습니다.

- Datadog Agent [구성 파일](#configuration-file) 또는 개별 통합 구성 파일에서
- Datadog [UI](#ui)를 통해
- Datadog [API](#api)를 통해
- [DogStatsD](#dogstatsd)를 통해

{{< tabs >}}
{{% tab "비컨테이너화된 환경" %}}
비컨테이너화된 환경에서는 Agent가 자동으로 [호스트 태그](#host-tags)를 할당하고 통합으로부터 태그를 상속받습니다. 이러한 태그와 사용자가 수동으로 추가하는 태그는 [Datadog Agent 구성 파일](#configuration-file)에서 구성됩니다.
{{% /tab %}}

{{% tab "컨테이너화된 환경" %}}
컨테이너화된 환경에서는 Datadog [Autodiscovery][1]를 통해 [unified service tagging][2]을 사용하길 권장합니다. 이렇게 하면 Datadog의 모든 텔레메트리에 대해 단일 구성 지점을 구축할 수 있습니다.

Autodiscovery의 목적은 특정 컨테이너에 대해 Agent 검사를 실행할 때 Datadog 통합 구성을 자동으로 적용하는 것입니다. Autodiscovery를 사용하는 경우 Datadog Agent는 새 컨테이너에서 실행 중인 서비스를 자동으로 식별하고, 해당 모니터링 구성을 찾은 후 메트릭 수집을 시작합니다. 이후 태그는 Autodiscovery [구성 템플릿][3] 내에서 구성할 수 있습니다.

Autodiscovery를 사용하지 않는 경우 Agent는 비컨테이너화된 환경과 동일하게 자동으로 [호스트 태그](#host-tags)를 할당하고 통합으로부터 태그를 상속받습니다. 이러한 태그와 수동으로 추가한 태그는 [Datadog Agent 구성 파일](#configuration-file)에서 구성됩니다.


[1]: /ko/getting_started/agent/autodiscovery/
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## 태그 할당 방법 {#methods-to-assign-tags}

### 구성 파일 {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 및 v7" %}}

#### 파일 위치 {#file-location}

Agent 구성 파일(`datadog.yaml`)은 Datadog Agent가 전달하는 모든 메트릭, 트레이스 및 로그에 적용되는 호스트 태그를 설정하는 데 사용됩니다.

Agent와 함께 설치된 [통합][1]의 태그는 Agent 설치 디렉터리의 **conf.d** 디렉터리에 위치한 YAML 파일을 사용하여 구성됩니다. 구성 파일 위치를 확인하려면 [Agent 구성 파일][2]을 참조하세요.

#### YAML 형식 {#yaml-format}

YAML 파일에서는 `tags` 키 아래에 문자열 목록을 사용하여 태그 목록을 할당합니다. YAML에서 목록은 기능적으로 동일한 다음 두 가지 형식으로 정의할 수 있습니다.

```yaml
tags: ["<KEY_1>:<VALUE_1>", "<KEY_2>:<VALUE_2>", "<KEY_3>:<VALUE_3>"]
```

또는

```yaml
tags:
    - "<KEY_1>:<VALUE_1>"
    - "<KEY_2>:<VALUE_2>"
    - "<KEY_3>:<VALUE_3>"
```

태그는 `<KEY>:<VALUE>` 쌍으로 지정하는 것이 권장되지만, 키만 포함된 태그(`<KEY>`)도 허용됩니다. 자세한 내용은 [태그 정의][3]를 참조하세요.

#### 호스트 태그 {#host-tags}

호스트 이름(태그 키 `host`)은 Datadog Agent에 의해 [자동 할당][4]됩니다. 호스트 이름을 사용자 지정하려면 Agent 구성 파일 `datadog.yaml`을 사용하세요.

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### 호스트 이름 변경 {#changing-the-hostname}

* 기존 호스트 이름은 UI에 2시간 동안 남아 있지만 새로운 메트릭은 표시하지 않습니다.
* 기존 호스트 이름의 호스트 데이터는 API를 통해 조회할 수 있습니다.
* 기존 호스트 이름과 새 호스트 이름의 메트릭을 하나의 그래프에 표시하려면 [두 메트릭 간 산술 연산][5]을 사용하세요.


[1]: /ko/getting_started/integrations/
[2]: /ko/agent/configuration/agent-configuration-files/
[3]: /ko/getting_started/tagging/#define-tags
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ko/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### 파일 위치 {#file-location-1}

Agent 구성 파일(`datadog.conf`)은 Datadog Agent가 전달하는 모든 메트릭, 트레이스 및 로그에 적용되는 호스트 태그를 설정하는 데 사용됩니다.

Agent와 함께 설치된 [통합][1]의 태그는 Agent 설치 디렉터리의 **conf.d** 디렉터리에 위치한 YAML 파일을 사용하여 구성됩니다. 구성 파일 위치를 확인하려면 [Agent 구성 파일][2]을 참조하세요.

#### YAML 형식 {#yaml-format-1}

YAML 파일에서는 `tags` 키 아래에 문자열 목록을 사용하여 태그 목록을 할당합니다. YAML에서 목록은 기능적으로 동일한 다음 두 가지 형식으로 정의할 수 있습니다.

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

태그는 `<KEY>:<VALUE>` 쌍으로 지정하는 것이 권장되지만, 키만 포함된 태그(`<KEY>`)도 허용됩니다. 자세한 내용은 [태그 정의][3]를 참조하세요.

#### 호스트 태그 {#host-tags-1}

호스트 이름(태그 키 `host`)은 Datadog Agent에 의해 [자동 할당][4]됩니다. 호스트 이름을 사용자 지정하려면 Agent 구성 파일 `datadog.conf`을 사용하세요.

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### 호스트 이름 변경 {#changing-the-hostname-1}

* 기존 호스트 이름은 UI에 2시간 동안 유지되지만 새로운 메트릭은 표시되지 않습니다.
* 기존 호스트 이름의 호스트 데이터는 API를 통해 조회할 수 있습니다.
* 기존 호스트 이름과 새 호스트 이름의 메트릭을 하나의 그래프에 표시하려면 [두 메트릭 간 산술 연산][5]을 사용하세요.


[1]: /ko/getting_started/integrations/
[2]: /ko/agent/configuration/agent-configuration-files/
[3]: /ko/getting_started/tagging/#define-tags
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ko/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### 통합 상속 {#integration-inheritance}

태그를 할당하는 가장 효율적인 방법은 통합 상속을 활용하는 것입니다. AWS 인스턴스, Chef 레시피 및 기타 통합에 할당한 태그는 Datadog으로 전송되는 호스트와 메트릭에 자동으로 상속됩니다.

컨테이너화된 환경에서는 [unified service tagging][2] 설명서에 따라 모든 Datadog 텔레메트리의 구성 단일 지점에서 관리하시길 권장합니다.

##### 클라우드 통합 {#cloud-integrations}

[클라우드 통합][3]은 인증 기반으로 동작합니다. Datadog은 가능하면 기본 클라우드 통합 타일(AWS, Azure, Google Cloud 등)을 사용하고 [Agent 설치][4]를 함께 수행할 것을 권장합니다. **참고**: Agent만 사용하는 경우 일부 통합 태그는 사용할 수 없습니다.

##### 웹 통합 {#web-integrations}

[웹 통합][5]은 인증 기반으로 동작합니다. 메트릭은 API 호출을 통해 수집됩니다. **참고**: Datadog은 `CamelCase` 태그를 밑줄(_)로 변환합니다. 예: `TestTag` --> `test_tag`.

#### 환경 변수 {#environment-variables}

컨테이너화된 Datadog Agent를 설치한 후 Agent의 기본 구성 파일에서 환경 변수 `DD_TAGS`를 사용하여 호스트 태그를 설정할 수 있습니다. 여러 태그를 지정하는 경우 각 태그는 공백으로 구분합니다.

**참고**: `DD_TAGS` 환경 변수는 공백을 사용하여 태그를 구분합니다. 예를 들어 `DD_TAGS="key1:val1 key2:val2"`는 두 개의 태그를 설정합니다. 반면 `DD_TAGS="test:this is a test"`와 같은 값은 네 개의 개별 태그(`test:this`, `is`, `a`, `test`)를 생성합니다. 공백으로 구분된 각 토큰이 독립적인 태그로 처리되기 때문입니다. 태그 값에 공백을 포함해야 하는 경우에는 대신 YAML 구성 또는 통합 주석을 통해 태그를 구성하세요. 이 방법들은 공백을 밑줄(_)로 변환합니다(예: `test:this is a test` → `test:this_is_a_test`).

Datadog은 [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad 및 Rancher][6]에서 일반적으로 사용되는 태그를 자동으로 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수               | 설명                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | 컨테이너 레이블을 추출합니다. 이 환경 변수는 기존의 `DD_DOCKER_LABELS_AS_TAGS` 환경 변수와 동일한 기능을 수행합니다.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | 컨테이너 환경 변수를 추출합니다. 이 환경 변수는 기존의 `DD_DOCKER_ENV_AS_TAGS` 환경 변수와 동일한 기능을 수행합니다. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | 포드 레이블을 추출합니다.                                                                                     |
| `DD_CHECKS_TAG_CARDINALITY`        | 검사 메트릭에 태그를 추가합니다(low, orchestrator, high).                                                    |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | 사용자 지정 메트릭에 태그를 추가합니다(low, orchestrator, high).                                                   |

**예시:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

`DD_KUBERNETES_POD_LABELS_AS_TAGS`를 사용할 때는 다음 형식의 와일드카드를 사용할 수 있습니다.

```text
{"foo": "bar_%%label%%"}
```

예를 들어 `{"app*": "kube_%%label%%"}`은 레이블 `application`에 대해 태그 이름 `kube_application`으로 해석됩니다. 또한 `{"*": "kube_%%label%%"}`는 모든 포드 레이블을 `kube_` 접두사를 붙인 태그로 추가합니다.

Docker Swarm의 `docker-compose.yaml` 파일 내에서 `DD_CONTAINER_LABELS_AS_TAGS` 변수를 사용하는 경우에는 아포스트로피를 제거해야 합니다. 예를 들면 다음과 같습니다.

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Docker 컨테이너에 레이블을 추가할 때는 `docker-compose.yaml` 파일 내에서 `labels:` 키워드의 위치가 중요합니다. 문제를 방지하려면 [Docker unified service tagging][2] 설명서를 따르세요.

컨테이너에 이 구성 외부에서 레이블을 지정해야 하는 경우, `labels:` 키워드는 `services:` 섹션의 **내부**에 배치해야 하며, `deploy:` 섹션 내부에 두어서는 **안 됩니다**. 서비스에 레이블을 지정해야 하는 경우에만 `labels:` 키워드를 `deploy:` 섹션 내부에 배치하세요. 이와 같이 배치하지 않으면 Datadog Agent는 컨테이너에서 추출할 레이블을 찾을 수 없습니다.

아래는 이러한 레이블 배치 방식을 보여주는 정상 동작 예시 `docker-compose.yaml` 파일입니다. 아래 예시에서 `myapplication:` 섹션의 레이블 `my.custom.label.project` 및 `my.custom.label.version`는 각각 고유한 값을 가집니다. `datadog:` 섹션에서 `DD_CONTAINER_LABELS_AS_TAGS` 환경 변수를 사용하면 레이블이 추출되어 `myapplication` 컨테이너에 대해 다음 태그가 생성됩니다.

`myapplication` 컨테이너 내부의 레이블은 `my.custom.label.project` 및 `my.custom.label.version`입니다.

Agent가 컨테이너에서 레이블을 추출한 후 생성되는 태그는 다음과 같습니다.
`projecttag:projectA`
`versiontag:1`

**샘플 docker-compose.yaml:**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<DATADOG_API_KEY>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'registry.datadoghq.com/agent:latest'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
  myapplication:
    image: 'myapplication'
    labels:
      my.custom.label.project: 'projectA'
      my.custom.label.version: '1'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
```

변수를 사용자 지정 `datadog.yaml`에 정의하거나 해당 환경 변수에 JSON 맵 형식으로 설정할 수 있습니다. 맵의 키는 소스(`label/envvar`) 이름이며, 값은 Datadog 태그 이름입니다.

##### 태그 카디널리티 {#tags-cardinality}

태그 카디널리티를 설정하는 환경 변수는 `DD_CHECKS_TAG_CARDINALITY`와 `DD_DOGSTATSD_TAG_CARDINALITY` 두 가지입니다. DogStatsD는 과금 방식이 다르므로 보다 세밀한 구성을 제공하기 위해 DogStatsD 태그 카디널리티 설정이 별도로 분리되어 있습니다. 그 외에는 두 변수 모두 동일하게 동작하며, 값으로 `low`, `orchestrator`, `high`를 사용할 수 있습니다. 기본값은 모두 `low`이며, Kubernetes 클러스터 수준 태그를 수집합니다.

각 카디널리티 설정은 다음 대상을 기준으로 합니다.
* `low`: Kubernetes 클러스터 수준 태그(예: `kube_namespace`).
* `orchestrator`: 포드 수준 태그(예: `pod_name`).
* `high`: 컨테이너 수준 태그(예: `container_id`).

카디널리티 설정에 따라 [Kubernetes 및 OpenShift][7], [Docker, Rancher 및 Mesos][8]에서 제공되는 기본 태그 세트가 달라집니다. ECS 및 Fargate에서는 변수를 `orchestrator`로 설정하면 `task_arn` 태그가 추가됩니다.

**참고**:
- DogStatsD 메트릭에 컨테이너 태그를 전송하면 메트릭 수가 증가할 수 있습니다(호스트당 하나가 아니라 컨테이너당 하나). 이는 사용자 지정 메트릭 과금에 영향을 줄 수 있습니다.
- 메트릭에서는 타임스탬프가 가장 가까운 초 단위로 반올림됩니다. 타임스탬프가 동일한 데이터 포인트가 여러 개 있는 경우 최신 데이터 포인트가 이전 포인트를 덮어씁니다. 더 높은 카디널리티를 설정하면 이러한 문제를 방지하는 데 도움이 될 수 있습니다.

#### 트레이스 {#traces}

Datadog SDK는 환경 변수, 시스템 속성 또는 코드 내 구성을 통해 구성할 수 있습니다. 각 SDK의 태그 지정 옵션 및 구성에 대한 정보는 [Datadog 트레이싱 구성][9] 설명서를 참조하세요. 또한 [unified service tagging][2] 설명서를 참고하여 SDK를 unified service tagging용으로 구성할 수 있습니다.

사용하는 SDK와 관계없이 스팬 메타데이터는 유형이 지정된 트리 구조를 따라야 합니다. 트리의 각 노드는 `.`로 구분되며 하나의 유형만 가질 수 있습니다..

예를 들어 하나의 노드는 객체(하위 노드 포함)이면서 동시에 문자열일 수 없습니다.

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

위의 스팬 메타데이터 예시는 유효하지 않습니다. `key` 값은 문자열(`"value"`)을 참조하면서 동시에 하위 트리(`{"subkey": "value_2"}`)를 참조할 수 없기 때문입니다.

### UI {#ui}

{{< tabs >}}
{{% tab "호스트 맵" %}}

[Host Map 페이지][1]를 사용하여 UI에서 호스트 태그를 할당할 수 있습니다. 페이지에서 육각형(호스트)을 클릭하면 화면 하단에 호스트 오버레이가 표시됩니다. 그런 다음 *User* 섹션에서 **Add Tags** 버튼을 클릭합니다. 태그를 쉼표로 구분하여 입력한 후 **Save Tags**를 클릭합니다. UI에서 변경한 호스트 태그는 적용되기까지 최대 5분이 걸릴 수 있습니다.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Add Tags 버튼이 강조 표시된 호스트 상세 정보가 열린 호스트 맵 화면" style="width:80%;">}}


[1]: /ko/infrastructure/hostmap/
{{% /tab %}}
{{% tab "인프라 목록" %}}

[Infrastructure List 페이지][1]를 사용하여 UI에서 호스트 태그를 할당할 수 있습니다. 호스트를 클릭하면 페이지 오른쪽에 호스트 오버레이가 표시됩니다. 그런 다음 *User* 섹션에서 **Add Tags** 버튼을 클릭합니다. 태그를 쉼표로 구분하여 입력한 후 **Save Tags**를 클릭합니다. UI에서 변경한 호스트 태그는 적용되기까지 최대 5분이 걸릴 수 있습니다. 태그를 추가한 후에는 추가 태그를 입력하기 전에 해당 태그가 UI에 표시되는지 확인하세요.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Add Tags 버튼이 강조 표시된 Infrastructure 상세 패널이 열린 Infrastructure List 화면" style="width:80%;">}}


[1]: /ko/infrastructure/
{{% /tab %}}
{{% tab "모니터" %}}

[모니터 관리][1] 페이지에서 태그를 추가할 모니터 옆의 체크박스를 선택합니다(하나 또는 여러 개 선택 가능). **Edit Tags** 버튼을 클릭합니다. 태그를 입력하거나 이전에 사용한 태그를 선택합니다. 그런 다음 **Add Tag`tag:name`** 또는 **Apply Changes**를 클릭합니다. 이미 태그가 추가되어 있는 경우 태그 체크박스를 사용하여 여러 태그를 한 번에 할당할 수 있습니다. 자세한 내용은 [모니터 관리 설명서][2]를 참조하세요.

모니터를 생성할 때는 4단계 *Say what's happening* 또는 *Notify your Team* 아래에서 모니터 태그를 지정합니다.

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="정책 태그 구성 화면. '정책 태그' 아래의 '값 선택' 드롭다운 옆에 cost_center, product_id, env의 세 가지 태그 예시가 있습니다." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /ko/monitors/manage/
{{% /tab %}}
{{% tab "분포 메트릭" %}}

[Distribution Metrics][1]에서 메트릭에 최대 10개의 태그 허용 목록을 적용하여 백분위수 집계를 생성할 수 있습니다. 이렇게 하면 조회 가능한 모든 태그 값 조합에 대해 시계열이 생성됩니다. Distribution Metrics에서 생성되는 사용자 지정 메트릭 및 시계열 계산 방식에 대한 자세한 내용은 [Custom Metrics][2]를 참조하세요.

**최대 10개의 태그를 적용할 수 있습니다. 제외 태그는 허용되지 않습니다**.

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="모니터 태그 생성" style="width:80%;">}}

[1]: /ko/metrics/distributions/
[2]: /ko/metrics/custom_metrics/
{{% /tab %}}
{{% tab "통합" %}}

[AWS][1] 통합 타일을 사용하면 계정 수준의 모든 메트릭과 [자동 구독 트리거][2]를 통해 전송되는 로그에 추가 태그를 할당할 수 있습니다. `<KEY>:<VALUE>` 형식의 태그를 쉼표로 구분하여 사용하세요.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS 태그" style="width:80%;">}}

[1]: /ko/integrations/amazon_web_services/
[2]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

SLO를 생성할 때 3단계 **Add name and tags**에서 태그를 할당합니다.

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="SLO 태그 생성" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "할당" %}}

태그는 [Datadog API][1]를 통해 다양한 방식으로 할당할 수 있습니다. 관련 섹션 링크는 다음과 같습니다.

* [검사 실행 게시][1]
* [이벤트 게시][2]
* [AWS 통합][3]
* [시계열 포인트 게시][4]
* 모니터 [생성][5] 또는 [편집][6]
* 호스트 태그 [추가][7] 또는 [업데이트][8]
* [트레이스 전송][9]
* Service Level Objectives [생성][10] 또는 [업데이트][11]

[1]: /ko/api/v1/service-checks/#submit-a-service-check
[2]: /ko/api/v1/events/#post-an-event
[3]: /ko/api/v1/aws-integration/
[4]: /ko/api/v1/metrics/#submit-metrics
[5]: /ko/api/v1/monitors/#create-a-monitor
[6]: /ko/api/v1/monitors/#edit-a-monitor
[7]: /ko/api/v1/tags/#add-tags-to-a-host
[8]: /ko/api/v1/tags/#update-host-tags
[9]: /ko/tracing/guide/send_traces_to_agent_by_api/
[10]: /ko/api/v1/service-level-objectives/#create-a-slo-object
[11]: /ko/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "예시" %}}

Datadog에서 태그 지정은 메트릭을 집계하는 강력한 방법입니다. 간단한 예를 들어, 웹사이트(example.com)에서 전송되는 다음 메트릭들의 합계를 확인하려고 한다고 가정해 보겠습니다.

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog은 `domain:example.com` 태그를 추가하고 호스트 이름은 생략할 것을 권장합니다(Datadog API가 호스트 이름을 자동으로 결정함).

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

`domain:example.com` 태그를 사용하면 페이지 조회 수를 여러 호스트에 걸쳐 합산할 수 있습니다.

```text
sum:page.views{domain:example.com}
```

호스트별로 세분화하여 확인하려면 다음을 사용합니다.

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD {#dogstatsd}

[DogStatsD][10]로 전송하는 모든 메트릭, 이벤트 또는 서비스 검사에 태그를 추가할 수 있습니다. 예를 들어 알고리즘 버전 태그를 타이머 메트릭에 추가하여 두 알고리즘의 성능을 비교할 수 있습니다.

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**참고**: 태깅은 StatsD에 대한 [Datadog 전용 확장 기능][11]입니다.

DogStatsD 메트릭에 `host` 태그를 할당할 때는 특별한 주의가 필요합니다. 호스트 태그 키에 대한 자세한 내용은 [메트릭 제출: DogStatsD][12] 설명서를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/#define-tags
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/integrations/#cat-cloud
[4]: /ko/getting_started/agent/#setup
[5]: /ko/integrations/#cat-web
[6]: /ko/agent/docker/?tab=standard#tagging
[7]: /ko/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /ko/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /ko/tracing/setup/
[10]: /ko/extend/dogstatsd/
[11]: /ko/extend/community/libraries/
[12]: /ko/metrics/dogstatsd_metrics_submission/#host-tag