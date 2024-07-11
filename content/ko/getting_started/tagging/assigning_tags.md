---
aliases:
- /ko/agent/tagging
- /ko/getting_started/tagging/assigning_tags
- /ko/tagging/assigning_tags/
description: Datadog에서 태그를 할당하는 방법 알아보기.
further_reading:
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: Datadog 태그 사용법 알아보기
title: 태그 할당
---

## 개요

태깅(태그 설정)은 모니터링하는 머신과 메트릭에 쿼리를 실행하기 위해서 Datadog 전체에서 사용됩니다. 태그를 기준으로 하는 할당 및 필터링 기능이 없으면 환경 내의 문제를 발견하고 범위를 좁혀 근본적인 원인을 찾기가 어려워집니다. 먼저 내용을 자세히 알아보기 전에, Datadog에서 [태그의 정의][1] 방법을 학습하시기 바랍니다.

태그는 다양한 방식으로 설정할 수 있습니다.

- Datadog Agent [설정 파일](#configuration-file)이나 각 개별 통합 설정 파일에서 설정
- Datadog [UI](#ui)로 설정
- Datadog [API](#api)로 설정
- [DogStatsD](#dogstatsd)로 설정

{{< tabs >}}
{{% tab "컨테이너화하지 않은 환경" %}}
비(非) 컨테이너화 환경에서는 Agent가 자동으로 [호스트 태그](#host-tags)를 할당하고 통합에서 태그 설정을 이어받습니다. 이러한 태그는 사용자가 수동으로 추가한 태그와 함께 [Datadog Agent 설정 파일](#configuration-file)에서 설정됩니다.
{{% /tab %}}

{{% tab "컨테이너화 환경" %}}
컨테이너화 환경에서는 Datadog [자동탐지][1]를 통해 자동으로 [통합 서비스 태깅][2]을 사용하시길 권장합니다. 이렇게 하면 모든 Datadog 텔레메트리(원격 계측) 데이터에 걸쳐 단일 설정 지점을 구축할 수 있습니다.

자동탐지의 목표는 Agent 점검을 특정 컨테이너에서 실행할 때 Datadog 통합 설정을 적용하는 것입니다. 자동탐지를 사용하면 Datadog Agent가 자동으로 새 컨테이너에서 어떤 서비스가 실행 중인지 식별하고, 해당하는 모니터링 설정을 찾아 메트릭을 수집합니다. 이후 자동탐지 [설정 템플릿][3]에서 태그를 설정할 수 있습니다.

자동탐지를 사용하지 않는 경우에는 Agent가 자동으로 [호스트 태그](#host-tags)를 할당하고 컨테이너화하지 않은 환경과 동일하게 통합에서 태그 설정을 이어받습니다. 이러한 태그는 수동 추가한 태그와 함께 [Datadog Agent 설정 파일](#configuration-file)에서 설정됩니다.


[1]: /ko/getting_started/agent/autodiscovery/
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## 태그 할당 방법

### 설정 파일

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### 파일 위치

Agent 설정 파일(`datadog.yaml`)은 Datadog Agent가 전송하는 모든 메트릭, 트레이스, 로그에 적용할 호스트 태그를 설정하는 데 사용됩니다.

Agent에 설치된 [통합][1]용 태그는 Agent가 설치된 **conf.d** 디렉터리에 위치한 YAML 파일에 설정됩니다. 설정 파일 위치를 알아보려면 [Agent 설정 파일][2] 페이지를 참조하세요.

#### YAML 형식

YAML 파일에서 `tags` 키가 적용된 스트링 목록을 사용해 일련의 태그를 할당할 수 있습니다. YAML에서 목록은 서로 다르지만 기능적으로는 동일한 형식 두 가지로 정의됩니다.

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

`<KEY>:<VALUE>` 쌍으로 태그를 할당하시길 권장합니다. 단, 키로만 구성된 태그(`<KEY>`) 역시 사용할 수 있습니다. 자세한 정보는 [태그 정의하기][3] 페이지를 참조하시기 바랍니다.

#### 호스트 태그

호스트네임(태그 키 `host`)은 Datadog Agent가 [자동 할당][4]합니다. 호스트네임을 커스텀하려면 Agent 설정 파일 `datadog.yaml`을 사용하세요.

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### 호스트네임 변경하기

* 기존 호스트네임은 UI에 2시간 동안 유지되나, 새 메트릭을 표시하지는 않습니다.
* 기존 호스트네임으로 호스트에서 수집한 데이터는 API로 쿼리할 수 있습니다.
* 기존 및 신규 호스트네임의 메트릭을 하나의 그래프로 정리하려면 [두 메트릭 사이의 수식][5]을 사용하세요.


[1]: /ko/getting_started/integrations/
[2]: /ko/agent/guide/agent-configuration-files/
[3]: /ko/getting_started/tagging/#defining-tags
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ko/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### 파일 위치

Agent 설정 파일(`datadog.conf`)은 Datadog Agent가 전송하는 모든 메트릭, 트레이스, 로그에 적용할 호스트 태그를 설정하는 데 사용됩니다.

Agent에 설치된 [통합][1]용 태그는 Agent가 설치된 **conf.d** 디렉터리에 위치한 YAML 파일에 설정됩니다. 설정 파일 위치를 알아보려면 [Agent 설정 파일][2] 페이지를 참조하세요.

#### YAML 형식

YAML 파일에서 `tags` 키가 적용된 스트링 목록을 사용해 일련의 태그를 할당할 수 있습니다. YAML에서 목록은 서로 다르지만 기능적으로는 동일한 형식 두 가지로 정의됩니다.

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

`<KEY>:<VALUE>` 쌍으로 태그를 할당하시길 권장합니다. 단, 키로만 구성된 태그(`<KEY>`) 역시 사용할 수 있습니다. 자세한 정보는 [태그 정의하기][3] 페이지를 참조하시기 바랍니다.

#### 호스트 태그

호스트네임(태그 키 `host`)은 Datadog Agent가 [자동 할당][4]합니다. 호스트네임을 커스텀하려면 Agent 설정 파일 `datadog.conf`을 사용하세요.

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### 호스트네임 변경하기

* 기존 호스트네임은 UI에 2시간 동안 유지되나, 새 메트릭을 표시하지는 않습니다.
* 기존 호스트네임으로 호스트에서 수집한 데이터는 API로 쿼리할 수 있습니다.
* 기존 및 신규 호스트네임의 메트릭을 하나의 그래프로 정리하려면 [두 메트릭 사이의 수식][5]을 사용하세요.


[1]: /ko/getting_started/integrations/
[2]: /ko/agent/guide/agent-configuration-files/
[3]: /ko/getting_started/tagging/#defining-tags
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ko/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### 통합의 상속

가장 효율적으로 태그를 할당하는 방법은 통합 상속을 활용하는 것입니다. AWS 인스턴스, Chef 레시피 및 기타 통합에 할당한 태그는 Datadog로 전송하는 호스트와 메트릭에서 자동으로 상속합니다.

컨테이너화 환경에서는 [통합 서비스 태깅][2] 가이드에 따라 모든 Datadog 텔레메트리의 설정 단일 지점에서 관리하시길 권장합니다.

##### 클라우드 통합

[클라우드 통합][3]은 인증 기반입니다. Datadog에서는 메인 클라우드 통합 타일(AWS, Azure, Google Cloud 등)을 사용하고, 가능하면 [Agent를 설치][4]할 것을 권장합니다. **참조**: Agent만 사용하기로 선택한 경우, 일부 통합 태그를 이용할 수 없습니다.

##### 웹 통합

[웹 통합][5]은 인증 기반입니다. 메트릭은 API 호출을 통해 수집됩니다. **참조**: `CamelCase` 태그는 Datadog에서 밑줄 표시("_" 기호)로 변환합니다(예: `TestTag`는 `test_tag`가 됩니다).

#### 환경 변수

컨테이너화된 Datadog Agent를 설치한 후에는 Agent 주요 설정 파일에 있는 환경 변수 `DD_TAGS`를 사용하여 호스트 태그를 설정할 수 있습니다.

Datadog는 [도커(Docker), 쿠버네티스(Kubernetes), ECS, Swarm, Mesos, Nomad, Rancher][6]에서 일반적인 태그를 자동으로 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수               | 설명                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | 컨테이너 라벨을 추출합니다. 이 환경은 기존 `DD_DOCKER_LABELS_AS_TAGS` 환경과 동일합니다.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | 컨테이너 환경 변수를 추출합니다. 이 환경은 기존 `DD_DOCKER_ENV_AS_TAGS` 환경과 동일합니다. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | 팟 라벨을 추출합니다.                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | 메트릭을 점검하기 위해 태그를 추가합니다(low, orchestrator, high)                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | 메트릭을 커스텀하기 위해 태그를 추가합니다(low, orchestrator, high)                                                    |

**예시**:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

`DD_KUBERNETES_POD_LABELS_AS_TAGS` 사용 시에는 형식에 와일드카드를 사용할 수 있습니다.

```text
{"foo": "bar_%%label%%"}
```

예를 들어, `{"app*": "kube_%%label%%"}`는 라벨 `application`의 태그명 `kube_application`으로 해결(resolve)됩니다. 또한 `{"*": "kube_%%label%%"}`는 `kube_`로 시작하는 태그로서 모든 팟 라벨을 추가합니다.

`DD_CONTAINER_LABELS_AS_TAGS` 변수를 도커 Swarm `docker-compose.yaml` 파일에서 사용 중일 때는 작은 따옴표("'" 기호)를 삭제하세요. 예를 들면 다음과 같습니다.

```shell
DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

도커 컨테이너에 라벨을 추가할 때는 `labels:` 키워드를 `docker-compose.yaml` 파일 내부에 배치하는 것이 중요합니다. 문제를 방지하려면 [도커 통합 서비스 태깅][2] 가이드를 따라주시기 바랍니다.

설정 외부에서 컨테이너에 라벨을 설정해야 하는 경우 `labels:` 키워드를 `services:` 섹션 **내부**에 배치합니다. `deploy:`섹션 내에 **포함하지 않도록** 주의해주세요. `labels:` 키워드를 `deploy:` 섹션 내에 배치하는 것은 서비스에 라벨을 설정해야 하는 경우에만 가능합니다. 이러한 배치가 올바르지 않으면 Datadog Agent가 컨테이너에서 라벨을 추출할 수 없습니다.

다음은 `docker-compose.yaml` 파일에서 이 설정을 실행하는 경우의 예시를 보여줍니다. 이번 예시에서는 `myapplication:` 섹션, `my.custom.label.project``my.custom.label.version`에 각각 고유값이 할당됩니다. `datadog:` 섹션의 `DD_CONTAINER_LABELS_AS_TAGS` 환경 변수를 사용하여 라벨을 추출하고 `myapplication` 컨테이너용 태그를 생성합니다.

`myapplication` 컨테이너 내부의 라벨은 `my.custom.label.project` 및 `my.custom.label.version`입니다.

Agent가 컨테이너에서 라벨을 추출한 후 태그는
`projecttag:projectA` 
`versiontag:1`입니다.

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
    image: 'gcr.io/datadoghq/agent:latest'
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

변수는 커스텀 `datadog.yaml`에서 정의하거나, 환경 변수의 JSON 맵으로 설정됩니다. 맵 키는 소스(`label/envvar`) 이름, 맵 값은 Datadog 태그 이름입니다.

##### 태그 카디널리티(Cardinality)

태그 카디널리티를 설정하는 환경 변수는 `DD_CHECKS_TAG_CARDINALITY`와 `DD_DOGSTATSD_TAG_CARDINALITY`로 두 가지가 있습니다. DogStatsD의 요금 설정이 다르므로, 이에 따라 DogStatsD 태그 카디널리티도 세밀하게 구성할 수 있도록 나뉘어 있습니다. 그 이외에는 이러한 변수가 동일하게 작동합니다. 사용할 수 있는 값은 `low`, `orchestrator` 또는 `high`입니다. 모두 기본적으로는 `low`로 설정되어 있으며, 호스트 수준의 태그를 가져옵니다.

카디널리티에 따라 [쿠버네티스, OpenShift][7] 및 [도커, Rancher, Mesos][8]에서 서로 다른 태그를 바로 사용할 수 있도록 태그 세트가 준비되어 있습니다. ECS와 Fargate에서는 변수를 `orchestrator`로 설정하면 `task_arn` 태그가 추가됩니다.

#### 트레이스

Datadog 트레이서는 환경 변수, 시스템 속성 또는 코드 내의 설정을 통해 구성할 수 있습니다. 각 트레이서의 태깅 옵션과 설정 정보는 [Datadog 트레이싱 설정][9] 가이드를 참조하시기 바랍니다. [통합 서비스 태깅][2] 가이드에서도 통합 서비스 태깅 트레이서를 설정하는 방법을 확인할 수 있습니다.

어느 트레이서를 사용하든 스팬(span) 메타데이터는 유형화 트리(typed tree) 구조를 고려해야 합니다. 트리의 각 노드는 `.`로 나뉘며, 각 노드는 하나의 유형에만 해당합니다.

예를 들어, 하나의 노드는 동시에 (하위 노드가 있는)오브젝트 유형과 스트링 유형에 해당할 수 없습니다.
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
위의 스팬 메타데이터는 `key` 값이 스트링(`"value"`)과 서브트리(`{"subkey": "value_2"}`)를 참조할 수 없으므로 무효입니다.

### UI

{{< tabs >}}
{{% tab "호스트 맵" %}}

[호스트 맵(Host Map) 페이지][1]를 사용하여 UI에서 호스트 태그를 할당합니다. 페이지 하단에 호스트 오버레이를 표시하려면 육각형(호스트)을 클릭하세요. 그런 다음 *User* 섹션에서 **Edit Tags** 버튼을 클릭합니다. 태그 목록을 쉼표(",")로 구분하여 입력하고 **Save Tags**를 클릭합니다. UI에서 호스트 태그를 변경한 경우, 변경 사항이 적용되기까지 최대 5분이 소요될 수 있습니다.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="호스트 맵 태그" style="width:80%;">}}

[1]: /ko/infrastructure/hostmap/
{{% /tab %}}
{{% tab "인프라스트럭처 목록" %}}

[인프라스트럭처 목록(Infrastructure List) 페이지][1]를 사용하여 UI에서 호스트 태그를 할당합니다. 페이지 오른쪽에 호스트 오버레이를 표시하려면 호스트를 클릭하세요. 그런 다음 *User* 섹션에서 **Edit Tags** 버튼을 클릭합니다. 태그 목록을 쉼표(",")로 구분하여 입력하고 **Save Tags**를 클릭합니다. 태그를 추가한 후에는 UI에서 확인할 수 있는지 먼저 살펴본 다음 다른 태그를 더하세요.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="인프라스트럭처 목록 태그" style="width:80%;">}}

[1]: /ko/infrastructure/
{{% /tab %}}
{{% tab "모니터링" %}}

[모니터링 관리(Manage Monitors)][1] 페이지에서 각 모니터 옆의 체크박스를 선택해 태그를 추가합니다(하나 이상의 모니터를 선택할 수 있습니다). **Edit Tags** 버튼을 클릭하세요. 태그를 입력하거나 이전에 사용했던 태그를 선택합니다. 다음으로 **Add Tag `tag:name`** 또는 **Apply Changes**를 클릭합니다. 태그를 이전에 추가했다면 태그 체크박스를 사용해 여러 태그를 동시에 할당할 수 있습니다.

{{< img src="tagging/assigning_tags/monitortags.png" alt="모니터링 관리 태그" style="width:80%;">}}

모니터링을 생성할 때, 4단계 *Say what's happening*에서 모니터링 태그를 할당하세요.

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="모니터링 태그 만들기" style="width:80%;">}}

[1]: /ko/monitors/manage/
{{% /tab %}}
{{% tab "분포 메트릭" %}}

최대 10개의 태그 허가 목록을 메트릭에 적용하여 [분포 메트릭(Distribution Metrics)][1]에서 백분위 집계를 생성합니다. 그러면 태그 값의 쿼리 가능한 조합으로 시계열이 생성됩니다. 분포 메트릭에서 출력되는 커스텀 메트릭과 시계열을 자세히 알아보려면 [커스텀 메트릭][2] 가이드를 참조하세요.

**태그는 최대 10개까지 적용할 수 있습니다. 제외 태그는 사용할 수 없습니다.**

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="모니터링 태그 만들기" style="width:80%;">}}

[1]: /ko/metrics/distributions/
[2]: /ko/metrics/custom_metrics/
{{% /tab %}}
{{% tab "통합" %}}

[AWS][1] 통합 타일을 사용하면 계정 수준에서 모든 메트릭에 추가 태그를 할당할 수 있습니다. 쉼표(",")로 구분되는 `<KEY>:<VALUE>` 형식의 태그 목록을 사용하세요.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS 태그" style="width:80%;">}}

[1]: /ko/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "서비스 수준 목표" %}}

SLO 설정 시, 3단계 *이름과 태그 추가*에서 태그를 할당하세요.

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="SLO 태그 만들기" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "할당" %}}

태그는 [Datadog API][1]를 사용해 다양한 방법으로 할당할 수 있습니다. 각 섹션의 링크를 정리한 아래 목록을 참조하시기 바랍니다.

* [점검 실행 포스트][1]
* [이벤트 포스트][2]
* [AWS 통합][3]
* [시계열 포인트 포스트][4]
* 모니터링 [생성][5] 또는 [수정][6]
* 호스트 태그 [추가][7] 또는 [업데이트][8]
* [트레이스 전송][9]
* 서비스 수준 목표(SLO) [생성][10] 또는 [업데이트][11]

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

Datadog에서 태깅하기는 메트릭을 수집하는 데 유용한 방법입니다. 빠른 예시를 살펴보려면 웹사이트(example.com)에서 수집한 다음 메트릭의 요약을 찾아보시기 바랍니다.

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog는 태그 `domain:example.com`을 추가하고 호스트네임을 그대로 두시길 권장합니다(Datadog API가 자동으로 호스트네임을 결정합니다).

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

`domain:example.com` 태그와 함께, 페이지 보기 화면에서 여러 호스트를 요약하여 볼 수 있습니다.

```text
sum:page.views{domain:example.com}
```

호스트별로 자세히 정보를 확인하려면 다음을 사용하세요.

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD

[DogStatsD][9]로 전송한 메트릭, 이벤트, 서비스 점검에 태그를 추가하세요. 예를 들어, 타이머 메트릭과 알고리즘 버전을 태깅하여 두 알고리즘의 성능을 비교할 수 있습니다.

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**참조**: 태깅은 StatsD의 [Datadog 전용 확장 프로그램][10]입니다.

DogStatsD 메트릭에 `host` 태그를 할당할 때는 신중하게 결정하셔야 합니다. 호스트 태그 키를 자세히 알아보려면 [DogStatsD 섹션][11]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/#defining-tags
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/integrations/#cat-cloud
[4]: /ko/getting_started/agent/#setup
[5]: /ko/integrations/#cat-web
[6]: /ko/agent/docker/?tab=standard#tagging
[7]: /ko/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /ko/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /ko/tracing/setup/
[10]: /ko/developers/dogstatsd/
[11]: /ko/developers/community/libraries/