---
aliases:
- /ko/continuous_integration/setup_pipelines/circleci
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/pipelines/custom_commands/
  tag: 설명서
  text: 개별 명령을 추적하여 Pipeline Visibility 확장
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: 설명서
  text: 커스텀 태그 및 메트릭을 추가하여 Pipeline Visibility 확장
title: CircleCI 워크플로우에서 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **Partial pipelines**: 부분 및 다운스트림 파이프라인 실행을 표시합니다

- **Custom spans**: 커스텀 스팬을 설정합니다

- **Custom pre-defined tags**: 모든 생성된 파이프라인과 작업 스팬에 [커스텀 태그][6]를 설정합니다

- **Custom tags and metrics at runtime**: 런타임에 [커스텀 태그][7]와 메트릭을 설정합니다

## Datadog 통합 설정

[CircleCI][1]용 Datadog 통합은 [웹후크][2]를 사용해 데이터를 Datadog으로 전송하는 방식으로 작동합니다.

1. 각 프로젝트에 대해 CircleCI의 **Project Settings > Webhooks**로 이동해 새 웹후크를 추가합니다.
   * **Webhook URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> 여기서 `<API_KEY>`는 [Datadog API 키][3]입니다.
   * **Name***: `Datadog CI Visibility` 또는 사용하고자 하는 다른 식별자 이름입니다.
   * **Events**: `Workflow Completed`와 `Job Completed`를 선택합니다.
   * **Certificate verifications**: 이 검사를 활성화합니다.

2. **Add Webhook**를 클릭해 새 웹후크를 저장합니다.

### 커스텀 태그 설정
통합으로 생성된 모든 파이프라인과 작업 스팬에 커스텀 태그를 설정하려면 **Webhook URL**에 쉼표로 구분된 `key:value` 쌍을 사용하여 URL 인코딩된 쿼리 파라미터 `tags`를 추가합니다 키:값 쌍에 쉼표가 포함되어 있으면 따옴표로 묶어야 합니다. 예를 들어, `key1:value1,"key2: value with , comma",key3:value3`를 추가하려면 **Webhook URL**에 다음 문자열을 추가해야 합니다.

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Datadog에서 파이프라인 데이터 시각화

워크플로우가 완료되면 [Pipelines][4]과 [Pipeline Executions][5] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/circleci/#set-custom-tags
[7]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux