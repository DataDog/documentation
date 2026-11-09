---
aliases:
- /ko/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: 문서
  text: 파이프라인 실행 결과 및 성능 탐색하기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
- link: /continuous_integration/search/
  tag: 문서
  text: CI 파이프라인 검색 및 관리하기
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility를 사용하여 AWS CodePipeline에서 CI/CD 모니터링 및 개선하기
title: CI Visibility를 위한 AWS CodePipeline 설정
---
## 개요 {#overview}

[AWS CodePipeline][1]은 빠르고 안정적인 애플리케이션 및 인프라 업데이트를 위해 릴리스 파이프라인을 자동화하도록 지원하는 완전 관리형 지속적 전달 서비스입니다.

파이프라인 실행에 대한 데이터를 수집하고, 성능 병목 현상이나 운영 문제를 분석하며, 배포 워크플로를 모니터링하도록 AWS CodePipeline용 CI Visibility를 설정할 수 있습니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [부분 재시도][14] | 부분 파이프라인 | 부분적으로 재시도된 파이프라인 실행을 확인합니다. |
| *[실행 중인 파이프라인][15] | 실행 중인 파이프라인 | 실행 중인 파이프라인 실행을 조회합니다. 대기열에 있거나 대기 중인 파이프라인은 Datadog에서 '실행 중' 상태로 표시됩니다. |
| **로그 상관관계 | 로그 상관관계	| 파이프라인 및 작업 스팬을 로그에 상호 연관시킵니다. [로그 스토리지](#logs-storage)가 필요합니다. |
| [승인 대기 시간][17] | 승인 대기 시간  | 작업 및 파이프라인이 수동 승인을 기다리는 시간을 조회합니다. |
| [사용자 지정 스팬][18] | 사용자 지정 스팬 | 파이프라인에 대한 사용자 지정 스팬을 구성합니다. |
| [임계 경로의 CI 작업 필터링][19] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [실행 시간][20] | 실행 시간  | 파이프라인이 작업을 실행하는 데 걸린 시간을 조회합니다. |

*AWS CodePipeline에서 실행 중인 파이프라인은 완료될 때까지 Git 정보가 없습니다.\
**AWS CodePipeline 로그 상관관계는 AWS CodeBuild 작업에만 사용할 수 있습니다.

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 AWS CodePipeline 간의 개념 매핑 관계를 보여줍니다.

| Datadog  | AWS CodePipeline |
|----------|------------------|
| 파이프라인 | 파이프라인         |
| 스테이지    | 스테이지            |
| 작업      | 액션           |

## Datadog 통합 구성 {#configure-the-datadog-integration}

[AWS CodePipeline][1]과 Pipeline Visibility 간의 통합을 설정하려면 AWS 리소스 2개를 생성합니다.

[API 목적지][2]
: Datadog의 수집을 가리키는 HTTP 엔드포인트입니다.

[AWS EventBridge 규칙][3]
: CodePipeline 이벤트를 API 목적지로 전달하는 규칙입니다.

이러한 리소스는 EventBridge 규칙 생성 과정 중에 별도로 생성하거나 동시에 생성할 수 있습니다.
파이프라인 이벤트 모니터링에 대한 자세한 내용은 [공식 AWS 가이드][4]를 참조하세요.

## API 목적지 생성 {#create-the-api-destination}

1. AWS 콘솔에서 {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}API destinations{{< /ui >}}로 이동한 다음 {{< ui >}}Create API destination{{< /ui >}}을 클릭합니다.
2. API 목적지의 이름(예: `datadog-ci-visibility-api`)을 선택하고 필요시 설명을 추가합니다.
3. {{< ui >}}API destination endpoint{{< /ui >}}에서 <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>값을 입력합니다.
4. {{< ui >}}HTTP method{{< /ui >}}에서 {{< ui >}}POST{{< /ui >}}를 선택합니다.
5. Connection type에서 {{< ui >}}Create a new connection{{< /ui >}}을 선택합니다.
   1. 연결 이름(예: `datadog-ci-visibility-connection`)을 선택하고 필요시 설명을 추가합니다.
   2. {{< ui >}}Destination type{{< /ui >}}에서 {{< ui >}}Other{{< /ui >}}를 선택합니다.
   3. {{< ui >}}Authorization type{{< /ui >}}에서 {{< ui >}}API key{{< /ui >}}를 선택합니다. `DD-API-KEY`를 {{< ui >}}API key name{{< /ui >}}으로 입력하고 {{< ui >}}Value{{< /ui >}} 필드에 [Datadog API 키][5]를 추가합니다.
6. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## EventBridge 규칙 생성 {#create-the-eventbridge-rule}

1. AWS 콘솔에서 {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}Rules{{< /ui >}}로 이동한 다음 {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.
2. 규칙의 이름(예: `datadog-ci-visibility-integration`)을 선택하고 필요시 설명을 추가합니다.
3. 이벤트 버스를 {{< ui >}}default{{< /ui >}}로 두고 {{< ui >}}Rule Type{{< /ui >}}에서 {{< ui >}}Rule with an event pattern{{< /ui >}}을 선택합니다. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
4.  {{< ui >}}Event Source{{< /ui >}}에서 {{< ui >}}AWS events or EventBridge partner events{{< /ui >}}를 선택합니다.
5.  {{< ui >}}Creation Method{{< /ui >}}에서 {{< ui >}}Custom pattern (JSON editor){{< /ui >}}을 선택합니다. 그런 다음 {{< ui >}}Event Pattern{{< /ui >}} 아래에 다음과 같이 입력합니다.

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   위의 JSON은 모든 파이프라인에 대한 통합을 설정합니다. 파이프라인 세트를 제한하려면
   아래의 [특정 파이프라인만 모니터링 섹션](#only-monitor-specific-pipelines)의 설명을 따르세요.

6.  {{< ui >}}Next{{< /ui >}}를 클릭합니다.
7.  {{< ui >}}Target Types{{< /ui >}}에서 {{< ui >}}EventBridge API destination{{< /ui >}}을 선택합니다. 그런 다음 {{< ui >}}Use an existing API Destination{{< /ui >}}을 선택하고 이전 단계에서 생성한 API 목적지를 선택합니다. 또는 [API 목적지 만들기 섹션](#create-the-api-destination)에 설명된 단계에 따라 API 목적지를 만들 수도 있습니다.
8. {{< ui >}}Headers Parameters{{< /ui >}}에서 {{< ui >}}Add header parameter{{< /ui >}}를 클릭합니다. 키로 `DD-CI-PROVIDER-AWSCODEPIPELINE`를 입력하고 값으로 `true`를 입력합니다.
9. {{< ui >}}Create a new role for this specific resource{{< /ui >}}를 선택합니다(아니면 기존 항목 사용).
10. 정보가 올바른지 검토하고 규칙을 만드세요.

규칙을 만들었으면 Datadog에서 파이프라인을 모니터링할 수 있습니다.

## 고급 구성 {#advanced-configuration}

### 특정 파이프라인만 모니터링 {#only-monitor-specific-pipelines}

필요시 Pipeline Visibility에서 모니터링되는 파이프라인을 제한할 수 있습니다.
이렇게 하려면 EventBridge 규칙을 생성할 때 정의된 규칙 이벤트 패턴에 `detail.pipeline` 필터를 추가하세요. 예시는 다음과 같습니다.

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

이벤트 패턴은 `first-pipeline` 및 `second-pipeline` 파이프라인에 대해서만 통합을 설정합니다.

### 파이프라인과 테스트 상호 연관{#correlate-pipelines-with-tests}

[Test Optimization][8]을 사용 중이고 파이프라인에 테스트를 실행하기 위한 [AWS CodeBuild][9] 작업이 하나 이상 포함된 경우 Datadog Pipeline Visibility 내에서 테스트를 관련 파이프라인과 상호 연관시킬 수 있습니다. 지침은 [파이프라인 실행 ID 추가](#add-the-pipeline-execution-id-as-an-environment-variable)를 참조하세요.

### 로그 스토리지 {#logs-storage}

AWS CodePipeline 통합은 **CodeBuild** 작업을 해당하는 각 작업 및 파이프라인 스팬과 상호 연관시킬 수 있도록 지원합니다. CodeBuild 작업에 대해 로그 스토리지를 활성화하려면 [AWS 로그 전달 가이드][16]를 참조하세요.

<div class="alert alert-warning">CodeBuild 작업에 사용자 지정 CloudWatch 로그 그룹 또는 로그 스트림 이름을 사용하는 경우, Datadog이 사용자 지정 로그 그룹 및 스트림 구성을 해석할 수 있도록 AWS 통합에서 <a href="/integrations/amazon_web_services/#resource-collection">클라우드 리소스 수집</a>을 활성화합니다.</div>

로그 스토리지는 CI Visibility와 별도로 청구됩니다. 로그 보존, 제외 및 인덱스는 [Log Management][21]에서 구성됩니다. AWS CodeBuild용 로그는 `source:codebuild` 및 `sourcecategory:aws` 태그로 식별할 수 있습니다.

### 파이프라인 실행 ID를 환경 변수로 추가{#add-the-pipeline-execution-id-as-an-environment-variable}

파이프라인 실행 ID는 Datadog이 파이프라인 실행을 고유하게 식별하는 데 필요한 식별자입니다. 파이프라인을 테스트 및 사용자 지정 명령과 상호 연관시키려면 다음 단계를 수행하세요.

1. AWS 콘솔에서 파이프라인 구성으로 이동하여 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
2. AWS CodeBuild 작업이 포함된 스테이지로 이동하고 {{< ui >}}Edit Stage{{< /ui >}}를 클릭한 다음 관련 작업을 편집합니다.
3. {{< ui >}}Environment variables{{< /ui >}}에서 환경 변수를 추가합니다.
변수 이름을 `DD_PIPELINE_EXECUTION_ID`로, 값을 `#{codepipeline.PipelineExecutionId}`로 지정합니다. 유형은 _Plaintext_로 두세요.
4. {{< ui >}}Done{{< /ui >}}을 클릭하여 변경 사항을 저장합니다.

위 단계를 통해 파이프라인 실행 ID를 CodeBuild 작업 환경 변수에 추가할 수 있습니다. 변수 작업에 대한 자세한 내용은 [공식 AWS 가이드][10]를 참조하세요.

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

파이프라인이 완료된 후 [**CI 파이프라인 목록**][11] 및 [**실행**][12] 페이지에서 데이터를 조회합니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리하기][13]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /ko/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: /ko/continuous_integration/search/#search-for-pipelines
[14]: /ko/glossary/#partial-retry
[15]: /ko/glossary/#running-pipeline
[16]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /ko/glossary/#approval-wait-time
[18]: /ko/glossary/#custom-span
[19]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /ko/glossary/#pipeline-execution-time
[21]: /ko/logs/guide/best-practices-for-log-management/