---
aliases:
- /ko/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: 설명서
  text: 사용자 지정 태그 및 측정값을 추가하여 Pipeline Visibility 확장
title: GitLab CI Visibility 설정
---
## 개요 {#overview}

[GitLab][18]은 통합 CI/CD 기능으로 소프트웨어 개발 수명 주기를 자동화하여 내장된 보안 제어를 통해 애플리케이션의 자동화된 지속적 배포를 가능하게 하는 DevOps 플랫폼입니다.

GitLab에 대한 CI Visibility 설정하여 파이프라인 실행에 대한 데이터를 수집하고, 성능 병목 현상을 분석하며, 운영 문제를 해결하고, 배포 워크플로우를 최적화합니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [실행 중인 파이프라인][24] | 실행 중인 파이프라인 | 실행 중인 파이프라인 실행을 표시합니다. 대기열에 있거나 대기 중인 파이프라인은 Datadog에서 '실행 중' 상태로 표시됩니다. |
| [실행 중인 작업][32] | 실행 중인 작업 | 현재 실행 중인 작업 실행을 표시합니다. |
| [CI 작업 실패 분석][28] | CI 작업 실패 분석 | 관련 로그에 LLM 모델을 사용하여 실패한 CI 작업의 근본 원인을 분석합니다. |
| [임계 경로의 CI 작업 필터링][29] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [부분 재시도][19] | 부분 파이프라인 | 부분적으로 재시도된 파이프라인 실행을 표시합니다. |
| [자동 작업 재시도][31] | 자동 작업 재시도 | Datadog은 AI 오류 모델에 의해 일시적인 것으로 분류된 실패 작업을 재시도합니다. |
| [수동 단계][20] | 수동 단계 | 수동으로 트리거된 파이프라인을 표시합니다. |
| [대기 시간][21] | 대기 시간 | 파이프라인의 작업이 처리되기 전에 대기열에 남아있는 시간을 표시합니다. |
| 로그 상관관계 | 로그 상관관계 |  파이프라인 스팬과 로그를 상호 연관시키고 [작업 로그 수집][12]을 활성화합니다. |
| 인프라 메트릭 상관관계 | 인프라 메트릭 상관관계 | 자체 호스팅 GitLab 러너에 대해 작업을 [인프라 호스트 메트릭][14]과 상호 연관시킵니다. |
| Custom pre-defined tags | Custom pre-defined tags | 모든 생성된 파이프라인, 스테이지 및 작업 스팬에 [사용자 지정][10]를 설정합니다. |
| [런타임 시][15] [사용자 지정 태그 및 측정값][16] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][13]을 구성합니다. |
| 파라미터 | 파라미터 | 파이프라인이 트리거될 때 사용자 지정 `env` 또는 `service` 파라미터를 설정합니다. |
| [파이프라인 실패 원인][11] | 파이프라인 실패 원인 | [오류 메시지][15]에서 파이프라인 실패 원인을 파악합니다. |
| [승인 대기 시간][22] | 승인 대기 시간  | 작업 및 파이프라인이 수동 승인을 기다리는 시간을 확인합니다. |
| [실행 시간][23] | 실행 시간  | 파이프라인이 작업을 실행하는 데 걸린 시간을 확인합니다. GitLab은 이 메트릭을 `duration`(으)로 지칭합니다. GitLab의 기간과 실행 시간은 서로 다른 값을 표시할 수 있습니다. GitLab은 특정 유형의 실패(예: 러너 시스템 실패)로 인해 실패한 작업은 고려하지 않습니다. |
| [사용자 지정 스팬][25] | 사용자 지정 스팬 | 파이프라인에 대한 사용자 지정 스팬을 구성합니다. |

다음 GitLab 버전이 지원됩니다.

- GitLab.com(SaaS)
- GitLab >= 14.1(자체 호스팅)
- GitLab >= 13.7.0(자체 호스팅), `datadog_ci_integration` Feature Flag 활성화됨

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 GitLab 간의 개념 매핑을 보여줍니다.

| Datadog                    | GitLab   |
|----------------------------|----------|
| 파이프라인                   | 파이프라인 |
| 스테이지                      | 스테이지    |
| 작업                        | 작업      |
| _Datadog에서 사용할 수 없음_ | 스크립트   |

## Datadog 통합 구성 {#configure-the-datadog-integration}

{{< tabs >}}
{{% tab "GitLab.com" %}}

계측하려는 각 프로젝트 또는 그룹에 대해 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}으로 이동하여 [프로젝트][101] 또는 [그룹][102]에 대해 통합을 구성합니다.


통합 구성 설정을 입력합니다.

{{< ui >}}Active{{< /ui >}}
: 통합을 활성화합니다.

{{< ui >}}Datadog site{{< /ui >}}
: 데이터를 보낼 [Datadog 사이트][103]를 지정합니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (선택 사항)
: 데이터를 직접 보내는 데 사용되는 API URL을 재정의할 수 있으며, 고급 시나리오에서만 사용됩니다.<br/>
**기본**: (비어 있음, 재정의 없음)

{{< ui >}}API key{{< /ui >}}
: 데이터를 보낼 때 사용할 [Datadog API 키][104]를 지정합니다.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: 파이프라인 추적, 임계 경로 계산 및 성능 모니터링을 포함한 CI Visibility 기능의 활성화 여부를 제어합니다. 이러한 기능을 활성화하려면 이 상자를 선택해야 합니다.

{{< ui >}}Service{{< /ui >}} (선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 서비스 이름을 지정합니다. GitLab 인스턴스간에 구분하는 데 사용합니다.<br/>
**기본**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 환경(`env` 태그)을 지정합니다. GitLab 인스턴스 그룹(예: 스테이징 또는 프로덕션)을 구분하는 데 사용합니다.<br/>
**기본값**: `none`

{{< ui >}}Tags{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 사용자 지정 태그를 지정합니다. `key:value` 형식으로 줄당 하나의 태그를 제공합니다.<br/>
**기본**: (비어 있음, 추가 태그 없음)<br/>
**참고**: GitLab.com 및 GitLab 14.8 이상 자체 호스팅 환경에서만 사용할 수 있습니다.

{{< ui >}}Test settings{{< /ui >}} 버튼으로 통합을 테스트할 수 있습니다(프로젝트에서 통합을 구성할 때만 사용 가능). 성공하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하여 통합 설정을 완료합니다. 버튼이 실패하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하고 아래 '최근 이벤트' 섹션의 기록을 확인하여 전송된 첫 번째 웹훅이 성공했는지 확인합니다.

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /ko/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

계측하려는 각 프로젝트 또는 그룹에 대해 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}으로 이동하여 [프로젝트][101] 또는 [그룹][102]에 대해 통합을 구성합니다. {{< ui >}}Admin{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}로 이동하여 GitLab [인스턴스][103] 수준에서 통합을 활성화할 수도 있습니다.

통합 구성 설정을 입력합니다.

{{< ui >}}Active{{< /ui >}}
: 통합을 활성화합니다.

{{< ui >}}Datadog site{{< /ui >}}
: 데이터를 보낼 [Datadog 사이트][104]를 지정합니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (선택 사항)
: 데이터를 직접 보내는 데 사용되는 API URL을 재정의할 수 있으며, 고급 시나리오에서만 사용됩니다.<br/>
**기본**: (비어 있음, 재정의 없음)

{{< ui >}}API key{{< /ui >}}
: 데이터를 보낼 때 사용할 [Datadog API 키][105]를 지정합니다.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: 파이프라인 추적, 임계 경로 계산 및 성능 모니터링을 포함한 CI Visibility 기능의 활성화 여부를 제어합니다. 이러한 기능을 활성화하려면 이 상자를 선택해야 합니다. GitLab 17.7부터 제공되며 이전 버전에서는 필요하지 않습니다.

{{< ui >}}Service{{< /ui >}} (선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 서비스 이름을 지정합니다. GitLab 인스턴스간에 구분하는 데 사용합니다.<br/>
**기본**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 환경(`env` 태그)을 지정합니다. GitLab 인스턴스 그룹(예: 스테이징 또는 프로덕션)을 구분하는 데 사용합니다.<br/>
**기본값**: `none`

{{< ui >}}Tags{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 사용자 지정 태그를 지정합니다. `key:value` 형식으로 줄당 하나의 태그를 제공합니다.<br/>
**기본**: (비어 있음, 추가 태그 없음)<br/>
**참고**: GitLab.com 및 GitLab 14.8 이상 자체 호스팅 환경에서만 사용할 수 있습니다.

{{< ui >}}Test settings{{< /ui >}} 버튼으로 통합을 테스트할 수 있습니다(프로젝트에서 통합을 구성할 때만 사용 가능). 성공하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하여 통합 설정을 완료합니다. 버튼이 실패하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하고 아래 '최근 이벤트' 섹션의 기록을 확인하여 전송된 첫 번째 웹훅이 성공했는지 확인합니다.

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /ko/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [Feature Flag*][101]를 사용하여 통합을 활성화합니다.

설치 유형에 따라 GitLab의 [Rails Runner][102]를 사용하는 다음 명령 중 하나를 실행합니다.

**Omnibus 설치**의 경우:

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**소스 설치**의 경우:

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes 설치**의 경우:

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

그런 다음, 계측하려는 각 프로젝트에 대해 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}으로 이동하여 [프로젝트][103]에서 통합을 구성합니다.

<div class="alert alert-warning">GitLab 초기 버전의 <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">버그</a>로 인해, GitLab UI에서 옵션을 사용할 수 있더라도 <strong>GitLab 버전 < 14.1</strong>에서는 <strong>그룹 또는 인스턴스</strong> 수준에서 Datadog 통합을 활성화할 수 없습니다.</div>


통합 구성 설정을 입력합니다.

{{< ui >}}Active{{< /ui >}}
: 통합을 활성화합니다.

{{< ui >}}Datadog site{{< /ui >}}
: 데이터를 보낼 [Datadog 사이트][104]를 지정합니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (선택 사항)
: 데이터를 직접 보내는 데 사용되는 API URL을 재정의할 수 있으며, 고급 시나리오에서만 사용됩니다.<br/>
**기본**: (비어 있음, 재정의 없음)

{{< ui >}}API key{{< /ui >}}
: 데이터를 보낼 때 사용할 [Datadog API 키][105]를 지정합니다.

{{< ui >}}Service{{< /ui >}} (선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 서비스 이름을 지정합니다. GitLab 인스턴스간에 구분하는 데 사용합니다.<br/>
**기본**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 환경(`env` 태그)을 지정합니다. GitLab 인스턴스 그룹(예: 스테이징 또는 프로덕션)을 구분하는 데 사용합니다.<br/>
**기본값**: `none`

{{< ui >}}Tags{{< /ui >}}(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 사용자 지정 태그를 지정합니다. `key:value` 형식으로 줄당 하나의 태그를 제공합니다.<br/>
**기본**: (비어 있음, 추가 태그 없음)<br/>
**참고**: GitLab.com 및 GitLab 14.8 이상 자체 호스팅 환경에서만 사용할 수 있습니다.

{{< ui >}}Test settings{{< /ui >}} 버튼으로 통합을 테스트할 수 있습니다(프로젝트에서 통합을 구성할 때만 사용 가능). 성공하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하여 통합 설정을 완료합니다. 버튼이 실패하면 {{< ui >}}Save changes{{< /ui >}}를 클릭하고 아래 '최근 이벤트' 섹션의 기록을 확인하여 전송된 첫 번째 웹훅이 성공했는지 확인합니다.

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /ko/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab &lt; 13.7" %}}

<div class="alert alert-danger">웹훅을 통한 직접 지원은 개발 중이 아닙니다. 예기치 않은 문제가 발생할 수 있습니다. 대신 GitLab을 업데이트하는 것이 좋습니다.</div>

이전 버전의 GitLab의 경우 [웹훅][101]을 사용하여 파이프라인 데이터를 Datadog으로 보낼 수 있습니다.

리포지토리(또는 GitLab 인스턴스 설정)에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}}로 이동하여 새 웹훅을 추가합니다.

- {{< ui >}}URL{{< /ui >}}: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> 여기서 `<API_KEY>`은 [Datadog API 키][102]입니다.
- {{< ui >}}Secret Token{{< /ui >}}: 이 필드는 비워 둡니다.
- {{< ui >}}Trigger{{< /ui >}}: `Job events` 및 `Pipeline events`를 선택합니다.

사용자 지정 `env` 또는 `service` 파라미터를 설정하려면 웹훅 URL에 쿼리 파라미터를 추가합니다. 예를 들어, `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`입니다.

### 사용자 지정 태그 설정 {#set-custom-tags}

통합에 의해 생성된 모든 파이프라인 및 작업 스팬에 사용자 지정 태그를 설정하려면 쉼표로 구분된 `tags` 쌍을 포함하는 URL 인코딩된 쿼리 파라미터 `key:value`을 URL에 추가합니다.

키:값 쌍에 쉼표가 포함된 경우 따옴표로 묶습니다. 예를 들어 `key1:value1,"key2: value with , comma",key3:value3`을 추가하려면 다음 문자열을 {{< ui >}}Webhook URL{{< /ui >}}에 추가해야 합니다: `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 고급 구성 {#advanced-configuration}

### 파이프라인 이름 설정 {#set-a-pipeline-name}

기본적으로 Datadog은 GitLab 프로젝트 경로를 파이프라인 이름으로 사용합니다. 결과적으로 동일한 프로젝트에서 [`trigger`][33] 키워드로 트리거된 모든 다운스트림(자식) 파이프라인은 Datadog에서 동일한 이름으로 표시됩니다.

파이프라인에 더 의미 있는 이름을 지정하려면 `.gitlab-ci.yml`에서 GitLab의 [`workflow:name`][34] 키워드를 사용합니다. 예를 들어, 다운스트림 파이프라인을 트리거한 작업의 이름을 따서 명명하려면 다음과 같이 수행합니다.

```yaml
trigger-job:
  trigger:
    include:
      - local: path/to/child-pipeline.yml
  variables:
    CHILD_PIPELINE_NAME: $CI_JOB_NAME
```

자식 파이프라인의 `.gitlab-ci.yml`(또는 포함된 파일)에서 전달된 변수를 사용하여 파이프라인 이름을 설정합니다.

```yaml
workflow:
  name: '$CHILD_PIPELINE_NAME'
```

**참고**: 위의 예시는 파이프라인 이름에 변수 확장을 사용하며, 이는 GitLab 16.3 이상이 필요합니다. `workflow:name` 자체는 일반 문자열 이름의 경우 GitLab 15.11부터 사용할 수 있습니다. 파이프라인 이름은 파이프라인 웹훅 페이로드에 추가된 GitLab 16.1부터 Datadog에서만 볼 수 있습니다.

### 사용자 지정 태그 설정 {#set-custom-tags-1}

추적성을 향상하기 위해 GitLab 프로젝트의 모든 파이프라인 및 작업 스팬에 대해 사용자 지정 태그를 설정할 수 있습니다. 자세한 내용은 [사용자 지정 태그 및 측정값][13]을 참조하세요.

#### Datadog Teams와 통합 {#integrate-with-datadog-teams}

파이프라인과 연결된 팀을 표시하고 필터링하려면 `team:<your-team>`를 사용자 지정 태그로 추가합니다. 사용자 지정 태그 이름은 [Datadog Teams][16] 팀 핸들과 정확히 일치해야 합니다.

### 인프라 메트릭을 작업과 상호 연관시키기 {#correlate-infrastructure-metrics-to-jobs}

자체 호스팅 GitLab 러너를 사용하는 경우, 작업을 실행 중인 인프라와 작업을 상호 연관시킬 수 있습니다.

Datadog 인프라 상호 연관은 다양한 방법을 사용하여 가능합니다.

{{< tabs >}}
{{% tab "자동 스케일링되지 않는 실행기" %}}
GitLab 러너는 `host:<hostname>` 형식의 태그를 가지고 있어야 합니다. 태그는 [새 러너를 등록][1]할 때 추가할 수 있습니다. 결과적으로, 이 방법은 러너가 직접 작업을 실행할 때만 사용할 수 있습니다.

이는 작업을 실행하기 위해 인프라를 자동 스케일링하는 실행기(Kubernetes, Docker Autoscaler 또는 인스턴스 실행기 등)는 제외되는데, 해당 러너에는 태그를 동적으로 추가할 수 없기 때문입니다.

기존 러너의 경우:

- GitLab >= 15.8: {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}}로 이동하여 적절한 러너를 편집함으로써 UI를 통해 태그를 추가합니다.

- GitLab < 15.8: 러너의 `config.toml`을 업데이트하여 태그를 추가합니다. 또는 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}}으로 이동하여 적절한 러너를 편집해 UI를 통해 태그를 추가합니다.

이러한 단계를 거친 후 CI Visibility는 각 작업에 호스트 이름을 추가합니다. 메트릭을 보려면 트레이스 조회에서 작업 스팬을 클릭합니다. 드로어에 호스트 메트릭을 포함하는 {{< ui >}}Infrastructure{{< /ui >}}라는 새 탭이 나타납니다.

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility는 로그 기반 상관관계를 통해 "Docker Autoscaler" 실행기에 대한 인프라 메트릭을 지원합니다. 이를 활성화하려면 Datadog이 작업을 호스트에 연결할 수 있도록 GitLab 작업 로그가 인덱싱되어 있는지, 그리고 로그에 `Instance <hostname> connected` 형식의 메시지가 포함되어 있는지 확인하세요. GitLab 작업 로그에는 [로그 인덱스][2] 필터에서 사용할 수 있는 `datadog.product:cipipeline` 및 `source:gitlab` 태그가 포함되어 있습니다. 이 시나리오에서 인프라 데이터를 보려면 사용자에게 [로그 읽기 권한][3]도 필요합니다. 자세한 내용은 [GitLab 작업과 인프라 메트릭 상관관계 가이드][1]를 참조하세요.

[1]: /ko/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /ko/logs/indexes/
[3]: /ko/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "인스턴스" %}}
CI Visibility는 로그 기반 상관관계를 통해 'Instance' 실행기에 대한 인프라 메트릭을 지원합니다. 이를 활성화하려면 Datadog이 작업을 호스트에 연결할 수 있도록 GitLab 작업 로그가 인덱싱되어 있는지, 그리고 로그에 `Instance <hostname> connected` 형식의 메시지가 포함되어 있는지 확인하세요. GitLab 작업 로그에는 [로그 인덱스][2] 필터에서 사용할 수 있는 `datadog.product:cipipeline` 및 `source:gitlab` 태그가 포함되어 있습니다. 이 시나리오에서 인프라 정보를 보려면 사용자에게 [로그 읽기 권한][3]이 필요합니다. 자세한 내용은 [GitLab 작업과 인프라 메트릭 상관관계 가이드][1]를 참조하세요.

[1]: /ko/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /ko/logs/indexes/
[3]: /ko/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility는 Kubernetes 실행자에 대한 인프라 메트릭을 지원합니다. 이를 위해서는 Datadog Agent가 Kubernetes GitLab 인프라를 모니터링해야 합니다. Kubernetes 클러스터에 Datadog Agent를 설치하려면 [Kubernetes에 Datadog Agent 설치][1]를 참조하세요.

Datadog Agent의 제한 사항으로 인해 Datadog Agent의 최소 수집 간격보다 짧은 작업은 인프라 상관관계 메트릭이 항상 표시되지 않을 수 있습니다. 이 값을 조정하려면 [Agent 구성 파일][2]에서 `min_collection_interval`을 15초 미만으로 설정합니다.

[1]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "기타 실행기" %}}
CI Visibility는 다른 실행기에 대한 인프라 메트릭을 지원하지 않습니다.
{{% /tab %}}

{{< /tabs >}}

### 파이프라인 실패에 대한 오류 메시지 보기 {#view-error-messages-for-pipeline-failures}

실패한 GitLab 파이프라인 실행의 경우 특정 파이프라인 실행 내 {{< ui >}}Errors{{< /ui >}} 탭 아래에 있는 각 오류에 GitLab의 오류 유형과 관련된 메시지가 표시됩니다.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab 실패 이유" style="width:100%;">}}

#### CI 작업 실패 분석 {#ci-jobs-failure-analysis}

작업 로그 수집이 활성화된 경우, CI Visibility는 LLM 모델을 사용하여 GitLab에서 제공하는 관련 로그를 기반으로 실패한 CI 작업을 분석합니다.

PR 댓글에 작업 실패 분석을 추가할 수도 있습니다. [PR 댓글 사용][30]에 대한 가이드를 참조하세요.

자세한 내용은 [CI 작업 실패 분석 사용][28] 가이드를 참조하세요.

#### GitLab에서 제공하는 오류 {#errors-provided-by-gitlab}

오류 메시지는 GitLab 버전 15.2.0 이상에서 지원됩니다.

GitLab에서 제공하는 오류 정보는 `error.provider_message` 및 `error.provider_domain` 태그에 저장됩니다.

다음 표는 각 오류 유형과 관련된 메시지 및 도메인을 설명합니다. 나열되지 않은 오류 유형은 `Job failed` 오류 메시지와 `unknown` 오류 도메인을 반환합니다.

| 오류 유형                       | 오류 도메인 | 오류 메시지                                              |
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | 알 수 없음      | 알 수 없는 이유로 인한 실패.                             |
| `config_error`                   | 사용자         | CI/CD 설정 파일 오류로 인한 실패.           |
| `external_validation_failure`    | 알 수 없음      | 외부 파이프라인 유효성 검사로 인한 실패.                |
| `user_not_verified`              | 사용자         | 사용자가 인증되지 않아 파이프라인이 실패했습니다.    |
| `activity_limit_exceeded`        | 공급자     | 파이프라인 활동 한도 초과.                  |
| `size_limit_exceeded`            | 공급자     | 파이프라인 크기 한도 초과.                      |
| `job_activity_limit_exceeded`    | 공급자     | 파이프라인 작업 활동 한도 초과.              |
| `deployments_limit_exceeded`     | 공급자     | 파이프라인 배포 한도 초과.               |
| `project_deleted`                | 공급자     | 해당 파이프라인과 관련된 프로젝트가 삭제됨.     |
| `api_failure`                    | 공급자     | API 실패.                                               |
| `stuck_or_timeout_failure`       | 알 수 없음      | 파이프라인이 멈췄거나 시간 초과됨.                            |
| `runner_system_failure`          | 공급자     | 러너 시스템 실패로 인한 실패.                       |
| `missing_dependency_failure`     | 알 수 없음      | 종속성 누락으로 인한 실패.                          |
| `runner_unsupported`             | 공급자     | 지원되지 않는 러너로 인한 실패.                          |
| `stale_schedule`                 | 공급자     | 오래된 일정으로 인한 실패.                              |
| `job_execution_timeout`          | 알 수 없음      | 작업 시간 초과로 인한 실패.                                |
| `archived_failure`               | 공급자     | 아카이브 실패.                                         |
| `unmet_prerequisites`            | 알 수 없음      | 전제조건이 충족되지 않아 실패.                          |
| `scheduler_failure`              | 공급자     | 일정 실패로 인한 실패.                            |
| `data_integrity_failure`         | 공급자     | 데이터 무결성으로 인한 실패.                              |
| `forward_deployment_failure`     | 알 수 없음      | 배포 실패.                                        |
| `user_blocked`                   | 사용자         | 사용자에 의해 차단됨.                                           |
| `ci_quota_exceeded`              | 공급자     | CI 할당량 초과.                                         |
| `pipeline_loop_detected`         | 사용자         | 파이프라인 루프가 탐지됨.                                    |
| `builds_disabled`                | 사용자         | 빌드가 비활성화됨.                                            |
| `deployment_rejected`            | 사용자         | 배포 거부.                                      |
| `protected_environment_failure`  | 공급자     | 환경 실패.                                       |
| `secrets_provider_not_found`     | 사용자         | 비밀 공급자를 찾을 수 없음.                                 |
| `reached_max_descendant_pipelines_depth` | 사용자   | 최대 하위 파이프라인 수에 도달했습니다.                        |
| `ip_restriction_failure`          | 공급자     | IP 제한 실패.                                    |

### 작업 로그 수집 {#collect-job-logs}

다음 GitLab 버전은 작업 로그 수집을 지원합니다.

* GitLab.com(SaaS)
* GitLab >= 15.3 (자체 호스팅)은 [작업 로그를 저장하는 개체 스토리지][7]를 사용하는 경우에만 해당됩니다.
* GitLab >= 14.8 (자체 호스팅)은 `datadog_integration_logs_collection` Feature Flag를 활성화하여 사용합니다.

작업 로그는 [Log Management][9]에서 수집되며, CI Visibility 내에서 GitLab 파이프라인과 자동으로 상관관계가 설정됩니다. 1GiB를 초과하는 로그 파일은 잘립니다.

작업 로그 수집을 실행하려면:

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. GitLab 통합 ({{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}})에서 {{< ui >}}Enable job logs collection{{< /ui >}} 확인란을 클릭합니다.
2. {{< ui >}}Save changes{{< /ui >}}를 클릭합니다.
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog은 사전 서명된 임시 URL을 사용하여 GitLab 로그 <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">개체 스토리지</a>에서 직접 로그 파일을 다운로드합니다.
즉, Datadog 서버가 스토리지에 액세스하려면 스토리지에 네트워크 제한이 없어야 합니다.
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">엔드포인트</a>가 설정된 경우 공개적으로 액세스할 수 있는 URL로 확인되어야 합니다.</div>

1. GitLab 통합({{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}})에서 {{< ui >}}Enable job logs collection{{< /ui >}} 확인란을 클릭합니다.
2. {{< ui >}}Save changes{{< /ui >}}를 클릭합니다.

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog은 사전 서명된 임시 URL을 사용하여 GitLab 로그 <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">개체 스토리지</a>에서 직접 로그 파일을 다운로드합니다.
즉, Datadog 서버가 스토리지에 액세스하려면 스토리지에 네트워크 제한이 없어야 합니다.
<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">엔드포인트</a>가 설정된 경우 공개적으로 액세스할 수 있는 URL로 확인되어야 합니다.</div>

1. GitLab에서 `datadog_integration_logs_collection` [Feature Flag][1]를 활성화합니다. 이렇게 하면 GitLab 통합({{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}})에서 {{< ui >}}Enable job logs collection{{< /ui >}} 확인란을 볼 수 있습니다.
2. {{< ui >}}Enable job logs collection{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Save changes{{< /ui >}}를 클릭합니다.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

로그는 CI Visibility와 별도로 청구됩니다. 로그 보존, 제외 및 인덱스는 [Log Management][6]에서 구성됩니다. GitLab 작업에 대한 로그는 `datadog.product:cipipeline` 및 `source:gitlab` 태그로 식별할 수 있습니다.

GitLab 통합에서 수집된 작업 로그 처리에 대한 자세한 내용은 [프로세서 문서][17]를 참조하세요.

## 부분 및 다운스트림 파이프라인 조회 {#view-partial-and-downstream-pipelines}

다음 필터를 사용하여 [CI Visibility 탐색기][26]에서 검색 쿼리를 사용자 지정할 수 있습니다.

{{< img src="ci/partial_retries_search_tags.png" alt="검색 쿼리에 Partial Pipeline:retry가 입력된 Pipelines 실행 페이지" style="width:100%;">}}

| 패싯 이름 | 패싯 ID | 가능한 값 |
|---|---|---|
| 다운스트림 파이프라인 | `@ci.pipeline.downstream` | `true`, `false` |
| 수동 트리거 | `@ci.is_manual` | `true`, `false` |
| 부분 파이프라인 | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

페이지 왼쪽의 패싯 패널을 사용하여 이러한 필터를 적용할 수도 있습니다.

{{< img src="ci/partial_retries_facet_panel.png" alt="Partial Pipeline 패싯이 확장되고 값 Retry가 선택되어 있고, Partial Retry 패싯이 확장되고 true 값이 선택된 패싯 패널" style="width:20%;">}}

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

통합이 성공적으로 설정된 후 파이프라인이 완료되면 [**CI Pipeline List**][4] 및 [**Executions**][5] 페이지가 데이터로 채워집니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI Pipelines 검색 및 관리][27]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ko/logs/guide/best-practices-for-log-management/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /ko/logs/
[10]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /ko/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[14]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /ko/account_management/teams/
[17]: /ko/logs/log_configuration/processors/
[18]: https://about.gitlab.com/
[19]: /ko/glossary/#partial-retry
[20]: /ko/glossary/#manual-step
[21]: /ko/glossary/#queue-time
[22]: /ko/glossary/#approval-wait-time
[23]: /ko/glossary/#pipeline-execution-time
[24]: /ko/glossary/#running-pipeline
[25]: /ko/glossary/#custom-span
[26]: /ko/continuous_integration/explorer
[27]: /ko/continuous_integration/search/#search-for-pipelines
[28]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[29]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[30]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[31]: /ko/continuous_integration/pipelines/automatic_retries/
[32]: /ko/glossary/#running-job
[33]: https://docs.gitlab.com/ee/ci/yaml/#trigger
[34]: https://docs.gitlab.com/ee/ci/yaml/#workflowname