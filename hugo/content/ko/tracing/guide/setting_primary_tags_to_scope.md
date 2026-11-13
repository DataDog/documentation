---
aliases:
- /ko/tracing/advanced/setting_primary_tags_to_scope/
description: 다양한 환경, 서비스 및 버전에 걸쳐 APM 데이터를 범위 지정 및 필터링하여 더 나은 구성을 할 수 있도록 기본 태그를 설정하는
  방법을 알아보세요.
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: 설명서
  text: 로그 및 트레이스를 연결
- link: /tracing/manual_instrumentation/
  tag: 설명서
  text: 애플리케이션을 수동 계측하여 트레이스를 생성합니다.
- link: /tracing/opentracing/
  tag: 설명서
  text: 애플리케이션 전반에 걸쳐 오픈트레이싱을 구현하세요.
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
title: 기본 태그를 설정하여 범위 좁히기
---
## 정의 {#definition}

전체 Datadog APM 애플리케이션의 범위를 지정하는 데 사용할 수 있는 여러 디멘션이 있습니다. 여기에는 집계 통계(예: 초당 요청 수, 지연 시간, 오류율, Apdex 점수)와 표시되는 [트레이스][1]가 포함됩니다. 이러한 디멘션은 애플리케이션 동작을 더 세밀하게 파악할 수 있게 하는 기본 태그를 통해 설정됩니다. 기본 태그의 사용 사례로는 환경, 가용성 영역, 데이터 센터 등이 있습니다.

기본 태그는 반드시 기존 [Datadog 태그][2] 규칙과는 다른 규칙을 따라야 합니다.

## 설정 {#setup}

### 환경 {#environment}

기본적이고 필수적인 기본 태그는 트레이스가 수집되는 환경입니다. 태그 키는 `env`이며, 태그가 지정되지 않은 데이터의 기본값은 `env:none`입니다.

#### 트레이서 환경 {#tracer-environment}

`env`를 설정하도록 SDK를 구성하는 것이 좋습니다. 또한 `env`의 정의가 서비스의 실제 런타임 내에 있기 때문에 유연성이 더 크게 향상됩니다.

`DD_ENV`가 서비스 프로세스에 노출되면 SDK가 이를 자동으로 사용합니다. `DD_ENV` 및 기타 표준 서비스 환경 변수 설정에 대한 자세한 내용은 [Unified Service Tagging][3]을 참조하세요.

코드에서 SDK의 전역 태그로 `env`를 수동으로 설정할 수도 있습니다. 자세한 내용은 [애플리케이션 성능 모니터링(APM) 설정][4]을 참조하세요.

#### 에이전트 환경 {#agent-environment}

`env` 태그는 에이전트 구성에서 설정할 수 있습니다.
**트레이서와 에이전트에 서로 다른 `env` 태그를 설정하지 마세요. 이로 인해 [트레이스 메트릭][5]에 중복 태그가 지정될 수 있습니다.**

옵션:

1. 최상위 수준 에이전트 설정:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Containerized environments**: The Agent also supports configuration of the top-level `env` through the environment variable `DD_ENV`.

2. 에이전트 호스트 태그:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Containerized environments**: The Agent also supports configuration of top-level `tags` through the environment variable `DD_TAGS`.

#### 환경별 데이터 {#data-by-environment}

환경은 APM 페이지 상단에 표시됩니다. `env` 드롭다운을 사용하여 현재 페이지에 표시되는 데이터의 범위를 지정하세요.

## Datadog에서 추가 기본 태그 추가 {#add-additional-primary-tags-in-datadog}

추가 디멘션에서 트레이스 메트릭을 집계해야 하는 경우, Datadog은 필수 기본 태그 `env:<ENVIRONMENT>` 외에 추가 기본 태그를 설정할 것을 권장합니다. 구성되면 {{< ui >}}Catalog Performance{{< /ui >}} 탭에서 두 번째 드롭다운을 사용할 수 있습니다. 

[애플리케이션 성능 모니터링(APM) 설정][6] 페이지로 이동하여 기본 태그를 정의, 변경 또는 삭제합니다.

**참고**:

* 조직 관리자만 해당 페이지에 액세스할 수 있습니다.
* 변경 사항이 UI에 반영되려면 최대 2시간이 소요될 수도 있습니다.
* SDK는 항상 `resource`, `name`, `service` 태그를 스팬에 추가합니다. Datadog은 혼동을 피하기 위해 이를 호스트 수준의 태그로 추가하지 않을 것을 권장합니다.
* 추가 기본 태그는 태그당 최대 100개의 고유 값을 지원합니다. 자세한 내용은 [애플리케이션 성능 모니터링(APM) 데이터 볼륨 지침][9]을 참조하세요.
* 추가 기본 태그는 호스트 또는 컨테이너 태그일 수 있습니다. SDK에 의해 추가된 스팬 수준 태그는 기본 태그로 사용할 수 없습니다.

기존에 설정한 기본 태그를 변경하는 경우 다음 사항에 유의하세요.

* 이전에 설정한 태그로 집계한 과거 애플리케이션 성능 모니터링(APM) 데이터에 더 이상 액세스할 수 없습니다.
* 이전 태그로 범위가 지정된 모든 APM 모니터가 {{< ui >}}No Data{{< /ui >}} 상태를 표시합니다.

## 컨테이너 기반 추가 기본 태그 {#container-based-additional-primary-tags}

Linux 기반 플랫폼의 Docker 컨테이너 및 Kubernetes 포드 메타데이터에서 도출된 태그에 기반하여 트레이스 메트릭을 인덱싱할 수 있습니다.

컨테이너 기반 기본 태그는 Datadog Agent 버전 7.65.0 이상에서 기본적으로 활성화됩니다. [APM 설정][6] 페이지로 이동하여 사용할 추가 기본 태그를 선택하세요. 이 설정 변경 사항이 적용되기까지 최대 2시간이 소요될 수 있습니다.

[카탈로그][7]에서 컨테이너화된 서비스가 전송하는 태그별로 서비스를 필터링할 수 있습니다. Dashboards 및 Monitors 에서 사용하는 트레이스 메트릭도 컨테이너 기본 태그별로 집계할 수 있습니다.

**참고**: 기본 태그 값에는 대문자나 특수 문자(밑줄, 빼기, 콜론, 마침표, 슬래시 제외)를 포함해서는 안 됩니다. 포함된 경우 일부 기능이 제대로 작동하지 않을 수 있습니다.

### 컨테이너 기반 기본 태그 비활성화 {#disable-container-based-primary-tags}

컨테이너 기반 기본 태그를 끄려면 `disable_cid_stats` APM 기능을 설정하고 에이전트를 다시 시작하세요. `DD_APM_FEATURES`이 이미 설정된 경우, 쉼표로 구분된 목록에 `disable_cid_stats`을 추가하세요. 절차는 Agent 설치 방식에 따라 다릅니다.

{{< tabs >}}
{{% tab "Helm" %}}

값 파일에 다음을 추가하세요.

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}

{{% tab "(Helm을 사용하지 않는) Kubernetes" %}}

Agent DaemonSet에서 다음 환경 변수를 사용하세요. Agent 프로세스별 컨테이너를 실행 중인 경우, 모든 컨테이너에 환경 변수를 추가하세요. 그렇지 않은 경우, Agent 컨테이너에 추가하세요.

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

[docker-compose.yml][1] 파일에 다음을 추가합니다.

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES=disable_cid_stats
```


[1]: /ko/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "환경 변수" %}}

Docker 및 ECS 설치에서 흔히 찾아볼 수 있는 것처럼, 환경 변수를 사용하여 에이전트를 설정하는 경우, 트레이스 에이전트에 다음 환경 변수를 전달합니다.

```
DD_APM_FEATURES=disable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

### 커스텀 레이블을 태그로 지정 {#custom-labels-as-tags}

아직 설정하지 않았다면 [태그 할당][8]을 통해 트레이스에 대한 사용자 정의 태그를 할당하여 컨테이너 또는 Pod 레이블을 전송하도록 에이전트를 설정할 수도 있습니다.

## 기본 태그별로 데이터 확인 {#view-data-by-primary-tag}

기본 태그는 APM 페이지 상단에 표시됩니다. 현재 페이지에 표시되는 데이터를 필터링하려면 이 선택기를 사용하세요. 기본 태그와 관계없이 모든 데이터를 보려면 드롭다운에서 `<TAG_NAME>:*`을 선택하세요.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="두 번째 기본 태그로 범위를 선택하기 위한 옵션을 보여주는 드롭다운 메뉴" style="width:90%;">}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#trace
[2]: /ko/getting_started/tagging/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/getting_started/tagging/assigning_tags/#traces
[5]: /ko/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings/default-settings
[7]: https://app.datadoghq.com/services
[8]: /ko/getting_started/tagging/assigning_tags
[9]: /ko/tracing/troubleshooting/#data-volume-guidelines