---
aliases:
- /ko/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: 설명서
  text: 커스텀 태그 및 메트릭을 추가하여 Pipeline Visibility 확장
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로 모니터링
title: GitHub Actions 워크플로에 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 Datadog 사이트 ({{< region-param key="dd_site_name" >}})는 지원되지 않습니다.</div>
{{< /site-region >}}

## 호환성
- **지원되는 GitHub 버전**:
  - GitHub.com (SaaS)
  - GitHub Enterprise Server (GHES) 3.5.0 이상
- **Partial pipelines**: 부분 재시도와 다운스트림 파이프라인 실행을 표시합니다

- **Logs correlation**: 파이프라인 스팬과 로그를 상호 연관시키고 [작업 로그 수집을 활성화합니다][10].

- **Infrastructure metric correlation**: 자체 호스팅 GitHub 러너의 파이프라인 작업과 [인프라스트럭처 메트릭을 상호 연관시킵니다][11].


- **Custom tags and metrics at runtime**: 파이프라인 스팬에 대한 런타임에 커스텀 태그 및 메트릭을 설정합니다.

- **Queue time**: 워크플로 작업이 처리되기 전에 대기열에 남아 있는 시간을 표시합니다.

## Datadog 통합 설정

### GitHub App 설정

[GitHub Actions][1] 통합은 개인 [GitHub App][2]을 사용하여 워크플로 정보를 수집합니다. 이미 앱이 있는 경우 다음 섹션으로 건너뛸 수 있습니다.

1. [GitHub 통합 타일][3]로 이동합니다.
2. **Link GitHub Account**를 클릭합니다.
3. 지침서에 따라 개인 또는 조직 계정에 대한 통합을 설정합니다.
4. **Edit Permissions**에서 `Actions: Read` 액세스 권한을 부여합니다.
5. **Create App in GitHub**를 클릭하여 앱 생성 프로세스 GitHub를 완료합니다.
6. 예를 들어, `Datadog CI Visibility`와 같이 앱 이름을 지정합니다.
7. **Install GitHub App**을 클릭하고 GitHub의 지침을 따릅니다.

### GitHub Actions에 대한 트레이스 설정

GitHub App을 만들고 설치한 후 가시성을 확보하려는 계정 및/또는 리포지토리에서 CI Visibility를 활성화합니다.

1. **[Getting Started][4]** 페이지로 이동하여 **GitHub**를 클릭합니다.
2. 활성화할 계정에 대해 **Enable Account**를 클릭합니다.
3. **Enable CI Visibility**를 클릭하여 전체 계정에 대한 CI Visibility를 활성화합니다.
4. 또는 리포지토리 목록을 스크롤하고 **Enable CI Visibility**토글을 클릭하여 개별 리포지토리를 활성화할 수 있습니다.

파이프라인은 계정 또는 리포지토리에 대해 CI Visibility를 사용 설정한 직후에 나타납니다.

### 로그 수집 활성화

또한 GitHub Actions CI Visibility 통합을 통해 워크플로 작업 로그를 [Logs Product][5]로 자동 전달할 수 있습니다.
로그를 사용하려면 다음 단계를 수행합니다:

1. **[CI Visibility settings][6]** 페이지로 이동합니다.
2. 리포지토리를 활성화했거나 활성화한 계정을 클릭합니다.
3. **Enable Job Logs Collection**을 클릭하여 전체 계정에 대한 로그를 활성화합니다.
4. 또는 리포지토리 목록을 스크롤하고 **Enable CI Visibility**토글을 클릭하여 개별 리포지토리를 활성화할 수 있습니다.

로그 수집을 토글한 직후 워크플로 작업 로그가 Datadog Logs로 전달됩니다. 로그는 CI Visibility와 별도로 청구됩니다. 로그 보존, 제외 및 인덱스는 Logs Settings에서 설정됩니다.

1GiB를 초과하는 로그 파일은 잘립니다.

### 인프라스트럭처 메트릭을 작업과 상호 연관시키기

자체 호스팅된 GitHub 러너를 사용하는 경우 실행 중인 호스트와 작업을 연관시킬 수 있습니다. 이를 위해 GitHub 러너 이름이 실행 중인 머신의 호스트 이름과 일치하는지 확인합니다. CI Visibility가 이를 활용하여 인프라스트럭처 메트릭에 연결합니다. 메트릭을 확인하려면 트레이스 보기에서 작업 스팬을 클릭하세요. 창에 호스트 메트릭이 포함된 **Infrastructure**라는 이름의 새 탭이 표시됩니다.

## Datadog에서 파이프라인 데이터 시각화

파이프라인이 완료되면 [Pipelines][7]와 [Pipeline Executions][8] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치에 대한 데이터만 표시됩니다.

## GitHub Actions 트레이스 비활성화

CI Visibility GitHub Actions 통합을 비활성화하려면 GitHub 앱이 더 이상 워크플로 작업 및 워크플로 실행 이벤트에 구독되어 있지 않아야 합니다. 이벤트를 제거하려면 다음을 실행하세요:

1. [GitHub Apps][9] 페이지로 이동합니다.
2. 해당 Datadog GitHub App에서 **Edit > Permission & events**를 클릭합니다 (앱이 여러 개인 경우 각각에 대해 이 과정을 반복해야 합니다).
3. **Subscribe to events** 섹션으로 스크롤하여 **Workflow job** 및 **Workflow run**이 선택되어 있지 않은지 확인합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/integrations/github/
[4]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[5]: https://docs.datadoghq.com/ko/logs/
[6]: https://app.datadoghq.com/ci/settings
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://github.com/settings/apps
[10]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/github/#enable-log-collection
[11]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs