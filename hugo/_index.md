---
aliases:
- /ko/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: /continuous_integration/pipelines/
  tag: 문서
  text: 파이프라인 데이터를 탐색하여 빌드 문제 해결하기
- link: /account_management/billing/ci_visibility
  tag: 문서
  text: CI Visibility 청구 시 고려 사항 알아보기
- link: /continuous_integration/tests/
  tag: 문서
  text: 테스트 데이터를 탐색하여 문제 테스트를 찾고 수정하기
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 CircleCI 환경 모니터링하기
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터로 파이프라인 알림 구성하기
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: 블로그
  text: CI/CD 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: 블로그
  text: CI/CD 소프트웨어 테스트 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: 블로그
  text: Datadog CI Pipeline Visibility로 CI/CD 현대화 모니터링하기
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: 블로그
  text: Datadog을 DaC(Detection as Code)로 사용하는 방법
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: 블로그
  text: CI/CD Pipeline에서 안전하고 효율적으로 캐시를 삭제하는 패턴
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠르게 문제 해결하기
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: 블로그
  text: 플랫폼 엔지니어링 팀을 위한 성공 메트릭
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인! (앱 로그인 필요)
title: Continuous Integration Visibility
---
{{< callout url=# btn_hidden="true" header="CI Visibility는 CI/CD Optimization의 일부입니다">}}CI/CD Optimization은 CI Visibility와 Test Optimization을 하나의 통합 인터페이스로 결합합니다. 이 페이지는 CI Visibility를 다룹니다. Test Optimization과 공유되는 기능은 [CI/CD Optimization][1]을 참조하세요.

[1]: /ko/cicd/
{{< /callout >}}

{{< learning-center-callout header="활성화 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  CI Visibility 소개 세션에 참여하여 Datadog CI Visibility가 CI 파이프라인의 효율성을 높이는 방법과 Testing Visibility 및 Pipeline Visibility 제품을 구성하는 방법을 알아보세요. 
{{< /learning-center-callout >}}

## 개요 {#overview}

<div class="alert alert-info">이 페이지는 Continuous Integration(CI) 메트릭과 데이터를 Datadog Dashboards로 가져오는 방법을 설명합니다. CI Pipeline에서 Continuous Testing 테스트를 실행하려면 <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing 및 CI/CD</a> 섹션을 참조하세요.</div>

Datadog Continuous Integration(CI) Visibility는 CI 환경 전반의 파이프라인 결과, 성능, 추세 및 안정성을 통합적으로 보여줍니다. Datadog을 CI Pipeline과 통합하면 모니터를 생성하고, [Datadog Dashboards][1] 및 [Notebooks][2]에 데이터를 표시하고, 조직의 CI 상태를 시각화할 수 있습니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility는 개발자가 파이프라인 중단의 원인을 파악하고 파이프라인 실행 시간의 추세를 모니터링하는 데 도움이 됩니다. 또한 빌드 엔지니어가 조직 전반의 CI 상태와 시간에 따른 파이프라인 성능을 파악할 수 있도록 인사이트를 제공합니다.

## 파이프라인 안정성 향상 및 트레이스 생성 {#improve-pipeline-reliability-and-create-traces}

CI Visibility는 개발 과정에서 발생한 주요 장애를 해당 장애의 원인이 된 커밋과 연결하여 파이프라인 오류와 빌드 실패 문제를 해결하는 데 도움이 됩니다. 파이프라인을 계측하고 실행 과정을 트레이싱하여 파이프라인 성능을 더욱 심층적으로 분석할 수 있습니다.

## 원활한 통합을 통한 효율성 향상 {#increase-efficiency-through-seamless-integrations}

Datadog은 다양한 CI 공급자와 통합되어 커밋부터 배포까지 CI 파이프라인의 성능을 추적하는 메트릭을 수집합니다. 이러한 메트릭은 성능 추세와 개선 기회를 식별하는 데 사용됩니다.

{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="AWS CodePipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="Azure DevOps 확장 프로그램" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="Buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="CircleCI orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="Codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="GitHub Actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="GitLab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="Jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="TeamCity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="기타 CI 공급자" >}}
{{< /card-grid >}}

`datadog-ci` CLI를 사용하면 [명령을 트레이싱][8]하고 [사용자 지정 태그 및 측정값][9]을 추가할 수 있습니다. 이를 통해 파이프라인 트레이스에 사용자 정의 텍스트 태그 및 숫자 태그를 추가할 수 있습니다.

## 시작할 준비가 되셨나요? {#ready-to-start}

호환성 요구 사항과 데이터 수집 구성 단계를 비롯하여 CI 제공업체에서 CI Visibility를 설정하는 방법은 [Pipeline Visibility][3]를 참조하세요. 그런 다음 [CI Visibility Explorer][7]에서 파이프라인 실행에 대한 세부 정보를 살펴보고 검색 쿼리를 [CI Pipeline Monitor][6]로 내보내세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ko/continuous_integration/pipelines/
[4]: /ko/continuous_integration/tests/
[6]: /ko/monitors/types/ci/
[7]: /ko/continuous_integration/explorer/
[8]: /ko/continuous_integration/pipelines/custom_commands/
[9]: /ko/continuous_integration/pipelines/custom_tags_and_measures/