---
further_reading:
- link: /continuous_integration/pipelines
  tag: 문서
  text: 파이프라인 실행 결과 및 성능 탐색하기
- link: /continuous_integration/pipelines/github/
  tag: 문서
  text: GitHub Actions용 CI Visibility 설정하기
- link: /continuous_integration/pipelines/gitlab/
  tag: 문서
  text: GitLab용 CI Visibility 설정하기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
title: 자동 작업 재시도
---
## 개요 {#overview}

자동 작업 재시도는 네트워크 시간 초과, 인프라 오류 또는 불안정한 테스트와 같이 일시적으로 발생했을 수 있는 실패를 다시 실행하여 개발자의 시간을 절약합니다. 실제 코드 결함은 재시도되지 않습니다. Datadog은 AI 기반 오류 분류기를 통해 실패한 각 작업을 실행합니다. 실패가 재시도 가능한 실패로 식별되면 Datadog은 사람의 개입 없이 CI 공급자의 API를 통해 재시도를 트리거합니다.

자동 재시도는 개발자가 수동으로 다시 실행하는 파이프라인의 수를 줄이고, 피드백 루프를 단축하며, 파이프라인 성공 메트릭이 지속적인 실패에 집중되도록 합니다.

<div class="alert alert-info">자동 작업 재시도는 <a href="/continuous_integration/pipelines/github/">GitHub Actions</a> 및 <a href="/continuous_integration/pipelines/gitlab/">GitLab</a>에 사용할 수 있습니다.</div>

## 자동 작업 재시도가 작동하는 방식 {#how-automatic-job-retries-work}

CI 파이프라인의 작업이 실패하는 경우 Datadog은 다음 작업을 수행합니다.
1. Datadog의 AI 오류 분류기가 작업 로그와 오류 컨텍스트를 검사하여 실패가 일시적인지 확인합니다.
   - 이는 [로그 분석][6]에서 사용하는 것과 동일한 AI 오류 분류기로, 관련 작업 로그를 읽어 실패가 일시적인지 판단합니다.
1. 실패가 재시도 가능한 실패로 분류되면 Datadog은 공급자의 API를 통해 재시도를 요청합니다.
1. Datadog은 무한 재시도 루프를 방지하기 위해 각 실패 작업을 (Datadog에서 설정한) 최대 횟수까지 재시도합니다. 재시도는 커밋당 작업별로 계산됩니다. 동일한 작업이 새 커밋에서 다시 실패하면 카운터가 재설정됩니다.
1. Datadog은 CI Visibility의 원래 파이프라인에 재시도 결과를 기록합니다.

## 전제 조건 {#prerequisites}

자동 작업 재시도를 사용하려면 다음 단계를 따르세요.
- [GitHub Actions][1] 또는 [GitLab][2] 통합에 CI Visibility가 활성화되어 있어야 합니다.
- GitHub Actions의 경우 [Datadog GitHub 앱][8]에 **Actions: Write** 권한이 있어야 합니다.
- 자동 재시도를 사용하려는 리포지토리에 대해 [Datadog 소스 코드 통합][3]이 구성되어 있어야 합니다.
- 자동 재시도를 사용하려는 리포지토리에 대해 로그 분석을 구성해야 합니다([GitHub Actions용 로그 분석][4] 또는 [GitLab용 로그 분석][5] 참조).
- 이 기능을 활성화하려면 Datadog에서 **CI 공급자 설정 쓰기** 권한이 있어야 합니다.

## 자동 작업 재시도 활성화 {#enable-automatic-job-retries}

전제 조건이 충족되면 CI/CD 최적화 설정에서 자동 작업 재시도를 활성화합니다.

1. [**CI/CD Optimization** > **Settings** > **Repositories**][7]를 엽니다.
1. 설정을 적용할 위치를 선택합니다.
   - 모든 리포지토리에 대해 기본적으로 Auto Job Retries를 활성화하려면 **Organization** 탭을 선택하세요.
   - 단일 리포지토리에 대해 Auto Job Retries를 활성화하려면 **Repository-specific** 탭을 선택하세요. 여러 리포지토리에 한 번에 적용하려면 해당 리포지토리를 선택하고 **Bulk Apply Settings**을 사용하세요.
1. **Mitigation**에서 **Auto Job Retries**를 켭니다.

{{< img src="continuous_integration/auto_job_retries_settings.png" alt="CI/CD 설정의 Auto Job Retries 토글" style="width:100%" >}}

## 공급자별 동작 {#provider-specific-behavior}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

### GitHub Actions 자동 작업 재시도 {#github-actions-automatic-job-retries}

GitHub Actions에는 재시도가 작동하는 방식에 영향을 주는 2가지 공급자 수준 제한이 있습니다.

- **재시도는 워크플로가 완료된 후에 발생합니다.** GitHub API는 워크플로의 나머지 부분이 실행되는 동안 개별 작업 재시도를 허용하지 않습니다. Datadog은 재시도를 실행하기 전에 워크플로가 최종 상태에 도달할 때까지 기다립니다.
- **재시도 불가능으로 분류된 작업을 포함하여 모든 실패한 작업이 함께 재시도됩니다.** GitHub API는 워크플로의 다른 작업도 실패한 경우 단일 작업 재시도를 지원하지 않습니다. Datadog은 단일 GitHub API 호출을 통해 워크플로의 모든 실패한 작업을 다시 실행합니다. 이로 인해 GitHub Actions 컴퓨팅 사용량이 증가할 수 있습니다.

### 보호된 브랜치 {#protected-branches}

Datadog GitHub 앱의 기본 권한은 보호된 브랜치에서의 재시도를 허용하지 않습니다. 보호된 브랜치(예: 기본 브랜치)에서 자동 재시도를 활성화하려면 앱에 조직 전체의 관리자 수준 액세스 권한을 부여하세요. 권한을 확장하기 전에 조직의 정책을 검토하세요.

{{% /tab %}}
{{% tab "GitLab" %}}

### GitLab 자동 작업 재시도 {#gitlab-automatic-job-retries}

GitLab에서 작업이 실패하는 즉시 Datadog은 해당 특정 작업을 다시 실행합니다(재시도 가능으로 분류된 경우). 다른 실패한 작업(재시도 가능으로 분류되지 않은 작업) 및 통과한 작업은 영향을 받지 않습니다. 재시도된 작업 외에 추가적인 CI 비용은 발생하지 않습니다.

자동 작업 재시도는 SaaS(GitLab.com) 및 자체 호스팅 GitLab 인스턴스 모두에서 작동합니다.

{{% /tab %}}
{{< /tabs >}}

## 실패한 작업이 재시도되지 않는 경우는 언제입니까? {#when-is-a-failed-job-not-retried}

다음과 같은 경우에 실패한 작업이 재시도되지 않습니다.

- AI 분류기가 실패를 재시도 불가능으로 분류한 경우(예: 컴파일 오류 또는 테스트 실패)
- 작업이 수동으로 또는 공급자 기본 재시도 규칙에 따라 이미 재시도된 경우

**참고:** GitHub Actions에서 재시도 불가능한 실패 작업은 동일한 워크플로의 다른 작업이 재시도 가능으로 분류된 경우 다시 실행될 수 있습니다. Datadog은 단일 '실패한 작업 재실행' GitHub API 호출을 발행하며, 이 호출은 재시도 불가능한 실패한 작업을 포함하여 워크플로의 모든 실패한 작업을 다시 실행합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/pipelines/github/
[2]: /ko/continuous_integration/pipelines/gitlab/
[3]: /ko/integrations/guide/source-code-integration/
[4]: /ko/continuous_integration/pipelines/github/#logs-analysis
[5]: /ko/continuous_integration/pipelines/gitlab/#logs-analysis
[6]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /ko/continuous_integration/pipelines/github/#configure-a-github-app