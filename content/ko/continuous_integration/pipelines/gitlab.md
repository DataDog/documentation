---
aliases:
- /ko/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: 설명서
  text: 커스텀 태그 및 메트릭을 추가하여 Pipeline Visibility 확장
title: GitLab 파이프라인에서 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **지원되는 GitLab 버전**:
- GitLab.com (SaaS)
 - GitLab >= 14.1 (자체 호스팅)
- `datadog_ci_integration` 기능 플래그를 활성화한  GitLab >= 13.7.0 (자체 호스팅)

- **Partial pipelines**: [부분 재시도][11] 및 다운스트림 파이프라인 실행 표시

- **Manual steps**: 수동으로 트리거된 파이프라인 표시

- **Queue time**: 파이프라인 작업이 처리되기 전 대기열에서 대기하는 시간 표시

- **Logs correlation**: 파이프라인 스팬을 로그와 상호 연관 시키고 [작업 로그 수집 활성화][12]

- **Infrastructure metric correlation**: 자체 호스팅 GitLab 러너를 위해 파이프라인을 [인프라스트럭처 호스트 메트릭][14]과 상호 연관 시킴

- **Custom pre-defined tags**: 생성된 모든 파이프라인, 단계 및 작업 스팬에 [커스텀 태그][10] 설정

- **Custom tags and metrics at runtime**: 런타임에 [커스텀 태그][13] 및 메트릭 설정

- **Parameters**: 커스텀 `env` 또는 `service` 파라미터 설정

- **Pipeline failure reasons**: [오류 메시지][15]에서 파이프라인 오류 원인 파악

## Datadog 통합 설정

{{< tabs >}}
{{% tab "GitLab.com" %}}

계측하려는 각 프로젝트 또는 그룹에 대해 **Settings > Integrations > Datadog**으로 이동하여 [프로젝트][1] 또는 [그룹][2]에서 통합을 설정합니다.

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

계측하려는 각 프로젝트 또는 그룹에 대해 **Settings > Integrations > Datadog**으로 이동하여 [프로젝트][1] 또는 [그룹][2]에서 통합을 설정합니다.

또는 **Admin > Settings > Integrations > Datadog**으로 이동하여 GitLab [인스턴스][3] 레벨에서 통합을 활성화할 수도 있습니다.

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [기능 플래그][1]를 활성화하여 통합을 설정합니다. 설치 유형에 따라 GitLab의 [RailsRunner][2]를 사용하여 다음 명령 중 하나를 실행합니다:

**Omnibus 설치**

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**소스 설치로부터*

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes 설치**

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name>-- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

그런 다음 계측할 각 프로젝트에 대해 **Settings > Integrations > Datadog**으로 이동하여 [프로젝트][3]에 대한 통합을 설정합니다.

<div class="alert alert-warning"><strong>참고</strong>: 초기 버전의 GitLab <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">버그</a>로 인해, GitLab의 UI에서 옵션을 사용할 수 있더라도 <strong>GitLab versions < 14.1</strong>에서는 <strong>그룹 또는 인스턴스</strong> 레벨에서 Datadog 통합을 활성화할 수 없습니다.</div>


[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
[2]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
{{% /tab %}}
{{< /tabs >}}

통합 구성 설정을 입력합니다:

**Active**
: 통합을 활성화합니다.

**Datadog site**
: 데이터를 보낼 [Datadog site][1]를 지정합니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (선택 사항)
: 데이터를 직접 전송하는 데 사용되는 API URL을 재정의할 수 있으며, 고급 시나리오에서만 사용됩니다..<br/>
**기본값**: (공백, 재정의 없음)

**API key**
: 데이터를 보낼 때 사용할 API 키를 지정합니다. Datadog의 통합 섹션에 있는 [APIs 탭][2]에서 생성할 수 있습니다.

**Service** (선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 서비스 이름을 지정합니다. 이를 통해 GitLab 인스턴스를 구분할 수 있습니다.<br/>
**기본값**: `gitlab-ci`

**Env**(선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 환경 (`env` 태그)을 지정합니다. 이를 통해 GitLab 인스턴스 그룹을 구분할 수 있습니다 (예: 스테이징 또는 프로덕션).<br/>
**기본값**: `none`

**Tags** (선택 사항)
: 통합에 의해 생성된 각 스팬에 연결할 커스텀 태그를 지정합니다. `key:value` 형식의 태그를 한 줄에 하나씩 입력합니다.<br/>
**기본값**: (공백, 추가 태그 없음)<br/>
**참고**: GitLab.com 및 GitLab > = 14.8 자체 호스팅에서만 사용 가능.

**Test settings** 버튼을 사용하여 (프로젝트에서 통합을 설정하는 경우에만 사용 가능) 통합을 테스트할 수 있습니다.성공적으로 완료되면 **Save changes**를 클릭하여 통합 설정을 완료합니다.

## 웹후크를 통한 통합

네이티브 Datadog 통합을 사용하는 대신 [웹후크][3]를 사용하여 파이프라인 데이터를 Datadog으로 전송할 수 있습니다.

<div class="alert alert-info"><strong>참고</strong>: 네이티브 Datadog 통합은 권장되는 접근 방식이며 현재 개발 중인 옵션입니다.</div>

리포지토리 (또는 GitLab 인스턴스 설정)에서 **Settings > Webhooks**로 이동하여 새 웹후크를 추가합니다:

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> 여기서 `<API_KEY>`는 [Datadog API 키][2]입니다.
- **Secret Token**: 비워둠
- **Trigger**: `Job events` 및 `Pipeline events`를 선택합니다.

커스텀 `env` 또는 `service` 파라미터를 설정하려면 웹후크 URL에 쿼리 파라미터를 추가합니다:`&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

### 커스텀 태그 설정

통합으로 생성된 모든 파이프라인과 작업 스팬에 커스텀 태그를 설정하려면 **URL**에 쉼표로 구분된 `key:value` 쌍을 사용하여 URL 인코딩된 쿼리 파라미터 `tags`를 추가합니다 키:값 쌍에 쉼표가 포함되어 있으면 따옴표로 묶어야 합니다. 예를 들어, `key1:value1,"key2: value with , comma",key3:value3`를 추가하려면 **Webhook URL**에 다음 문자열을 추가해야 합니다:

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Datadog에서 파이프라인 데이터 시각화

통합이 성공적으로 설정된 후 파이프라인이 완료되면 [Pipelines][4]와 [Pipeline Executions][5] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치에 대한 데이터만 표시됩니다.

### 부분 및 다운스트림 파이프라인

**Pipeline Executions** 페이지의 검색창에서 아래 필터를 사용할 수 있습니다:

`Downstream Pipeline`
: 가능한 값: `true`,`false`

`Manually Triggered`
: 가능한 값: `true`,`false`

`Partial Pipeline`
: 가능한 값: `retry`,`paused`,`resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="The Pipeline executions page with Partial Pipeline:retry entered in the search query" style="width:100%;">}}

이러한 필터는 페이지 왼쪽의 패싯 패널을 통해 적용할 수도 있습니다.
{{< img src="ci/partial_retries_facet_panel.png" alt="The facet panel with Partial Pipeline facet expanded and the value Retry selected, the Partial Retry facet expanded and the value true selected" style="width:40%;">}}


### 인프라스트럭처 메트릭을 작업과 상호 연관시키기

자체 호스팅 GitLab 러너를 사용하는 경우 실행 중인 인프라스트럭처와 작업을 상호 연관시킬 수 있습니다. 이 기능이 작동하려면 GitLab 러너에 `host:<hostname>` 양식의 태그가 있어야 합니다. [새 러너를 등록][6]하는 동안 태그를 추가할 수 있습니다. 기존 러너의 경우, 러너의 `config.toml`를 업데이트하여 태그를 추가하거나, **Settings > CI/CD > Runners**로 이동해 적절한 러너를 편집하여 UI를 통해 태그를 추가하세요.

이러한 단계가 끝나면 CI Visibility가 각 작업에 호스트 이름을 추가합니다. 메트릭을 보려면 트레이스 보기에서 작업 스팬을 클릭하세요. 드로어에 호스트 메트릭이 포함된 **Infrastructure**라는 이름의 새 탭이 나타납니다.

### 파이프라인 실패에 대한 오류 메시지 보기

오류 메시지는 GitLab 버전 15.2.0 이상에서 지원됩니다.

실패한 GitLab 파이프라인 실행의 경우 특정 파이프라인 실행 내 `Errors` 탭 아래에 있는 각 오류에 GitLab의 오류 유형과 관련된 메시지가 표시됩니다.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab Failure Reason" style="width:100%;">}}

각 오류 유형과 관련된 메시지 및 도메인은 아래 표를 참조하세요. 나열되지 않은 오류 유형은 `Job failed`의 오류 메시지와 `unknown`의 오류 도메인으로 이어집니다.

| 오류 유형 | 오류 메시지 | 오류 도메인 |
| :---  |    :----:   |  ---: |
|  unknown_failure  |  알 수 없는 이유로 인한 실패  |  알 수 없음
|  config_error  |  CI/CD 설정 파일 오류로 인한 실패 |  사용자
|  external_validation_failure  |  외부 파이프라인 유효성 검사로 인한 실패  |  알 수 없음
|  user_not_verified  |  사용자가 확인되지 않아 파이프라인 실패  |  사용자
|  activity_limit_exceeded  |  파이프라인 활동 한도 초과  |  프로바이더
|  size_limit_exceeded  |  파이프라인 크기 제한 초과  |  프로바이더
|  job_activity_limit_exceeded  |  파이프라인 작업 활동 한도 초과  |  프로바이더
|  deployments_limit_exceeded  |  파이프라인 배포 제한 초과  |  프로바이더
|  project_deleted  |  해당 파이프라인과 관련된 프로젝트가 삭제됨  |  프로바이더
|  api_failure  |  API 실패  |  프로바이더
|  stuck_or_timeout_failure  |  파이프라인이 멈췄거나 시간 초과됨  |  알 수 없음
|  runner_system_failure  |  러너 시스템 실패로 인한 실패  |  프로바이더
|  missing_dependency_failure  |  종속성 누락으로 인한 실패  |  알 수 없음
|  runner_unsupported  |  지원되지 않는 러너로 인한 실패  |  프로바이더
|  stale_schedule  |  오래된 스케줄로 인한 실패  |  프로바이더
|  job_execution_timeout  |  작업 시간 초과로 인한 실패  |  알 수 없음
|  archived_failure  |  보관된 실패  |  프로바이더
|  unmet_prerequisites  |  전제조건이 충족되지 않아 실패  |  알 수 없음
|  scheduler_failure  |  스케줄 실패로 인한 실패  |  프로바이더
|  data_integrity_failure  |  데이터 무결성으로 인한 실패  |  프로바이더
|  forward_deployment_failure  |  디플로이먼트 실패  |  알 수 없음
|  user_blocked  |  사용자에 의해 차단  |  사용자
|  ci_quota_exceeded  |  CI 할당량 초과  |  프로바이더
|  pipeline_loop_detected  |  파이프라인 루프가 감지됨  |  사용자
|  builds_disabled  |  빌드 비활성화  |  사용자
|  deployment_rejected  |  디플로이먼트 거부됨  |  사용자
|  protected_environment_failure  |  환경 실패  |  프로바이더
|  secrets_provider_not_found  |  비밀 프로바이더를 찾을 수 없음  |  사용자
|  reached_max_descendant_pipelines_depth  |  최대 하위 파이프라인에 도달  |  사용자
|  ip_restriction_failure  |  IP 제한 실패  |  프로바이더

<!-- | ---------- | ---------- | ---------- | -->
<!-- | :---        |    :----:   |          ---: | -->

## 작업 로그 수집 활성화

다음 GitLab 버전은 작업 로그 수집을 지원합니다:
* GitLab.com (SaaS)
* GitLab > = 14.8 (자체 호스팅)은 [작업 로그를 저장하는 개체 스토리지][7]를 사용하는 경우에만 해당

작업 로그 수집을 실행하려면:

1. GitLab 자체 호스팅 또는 GitLab.com 계정에서 `datadog_integration_logs_collection` [기능 플래그][8]를 활성화합니다. 그러면 Datadog 통합에서 `Enable logs collection` 옵션이 표시됩니다.
2. `Enable logs collection` 옵션을 활성화하고 변경 내용을 저장합니다.

작업 로그는 [Logs][9] 제품에서 수집되며 CI Visibility 내에서 GitLab 파이프라인과 자동으로 연결됩니다.

<div class="alert alert-info"><strong>참고</strong>: Logs는 CI Visibility과 별도로 청구됨</div>

1GiB를 초과하는 로그 파일은 잘립니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.gitlab.com/runner/register/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /ko/logs/
[10]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: http://docs.datadoghq.com/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /ko/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /ko/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[14]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /ko/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures