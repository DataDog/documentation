---
aliases:
- /ko/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 Azure 파이프라인 모니터링
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: 설명서
  text: 커스텀 태그 및 메트릭을 추가하여 Pipeline Visibility 확장
title: Azure 파이프라인에서 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트 ({{< region-param key="dd_site_name" >}})에서는 현재 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **런타임에 커스텀 태그 및 메트릭**: 런타임에 [커스텀 태그][6] 및 메트릭 설정

## Datadog 통합 설정

[Azure 파이프라인][1]을 위한 Datadog 통합은 [서비스 후크][2]를 사용해 데이터를 Datadog으로 보내는 방식으로 작동합니다.

1. Azure Marketplace에서 [Datadog CI Visibility][8] 확장을 설치합니다.

2. 각 프로젝트에 대해 Azure DevOps에서 **Project settings > Service hooks**로 이동한 후 초록색 더하기(+) 아이콘을 선택해 구독을 생성합니다.

3. 다음의 각 웹후크 유형에 대해 `Datadog CI Visibility` 서비스에 대한 새 구독을 생성합니다:
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**

4. **Next**를 클릭해 다음 단계로 넘어가 다음을 설정합니다:
    - **Datadog 사이트**: {{< region-param key="dd_site" >}}
    - **Datadog API 키**: 사용자의 [Datadog API 키][3].

5. **Finish**를 클릭합니다.

<div class="alert alert-info">
지원되는 세 가지 이벤트 유형 모두 필수이며, 개별적으로 활성화되어야 합니다.
이벤트가 1개 이상 활성화되어 있지 않으면 설치가 완료되지 않으며, Datadog에서 예기치 않은 동작이 발생할 수 있습니다.
</div>

### 여러 프로젝트를 일괄적으로 설정


많은 또는 모든 Azure 프로젝트에 대해 후크를 활성화하려는 경우, Datadog은 Azure API를 통해 이를 수행할 수 있도록 [스크립트] (https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py)를 제공합니다.

스크립트를 실행하려면 다음이 필요합니다:

-  Azure DevOps 사용자 이름
- Azure DevOps [API 토큰](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat)
- Azure DevOps 조직 이름

스크립트를 사용하려면 Python3와 요청 패키지만 있으면 됩니다. 더 자세한 정보를 위해 다음을 실행하세요:
```shell
./service_hooks.py --help
```

이 스크립트는 환경 변수 `DD_API_KEY`, `DD_SITE`, 그리고 플래그 파라미터 `--dd-api-key` and `--dd-site`를 지원합니다.

다음은 모든 프로젝트에서 후크를 활성화한 예시입니다:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

다음은 특정 프로젝트에서 후크를 활성화한 예시입니다:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```

## Datadog에서 파이프라인 데이터 시각화

워크플로우가 완료되면 [Pipelines][4]과 [Pipeline Executions][5] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ko/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility