---
description: Datadog CD Visibility에서 CI 공급자의 배포를 모니터링하는 방법을 알아보세요.
further_reading:
- link: /continuous_delivery/deployments
  tag: 설명서
  text: Deployment Visibility에 대해 알아보기
- link: /continuous_delivery/explorer
  tag: 설명서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
is_beta: true
title: CI 공급자 배포 모니터링
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

[배포][10]는 Continuous Integration(CI) 파이프라인에서 수행할 수 있습니다. 일반적으로 이러한 파이프라인에는 소스 코드가 테스트되고 이미지가 빌드된 후 실행되는 배포 단계가 포함되어 있습니다.

CI 공급자를 사용하여 배포를 실행하는 경우 Deployment Visibility로 배포를 모니터링할 수 있습니다. 다음 요구 사항이 충족되는지 확인하세요.

1. [Pipeline Visibility][1]를 사용하여 CI 파이프라인을 모니터링하고 있습니다.
2. CI 공급자가 **Custom tags and measures at runtime** 기능을 지원하여 Pipeline Visibility의 파이프라인 및 작업에 [사용자 정의 텍스트 및 숫자 태그][2]를 추가할 수 있습니다.
3. CI 작업(또는 CI 공급자의 [관련 수준][9])에서 배포를 실행하고 있습니다. CI 작업의 개념은 공급자에 따라 다를 수 있습니다. Datadog에서 CI 작업을 정의하는 방법에 대한 자세한 내용은 [용어 섹션][9]을 참조하세요.

## 설정 {#setup}

<div class="alert alert-info">
설정에는 <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>datadog-ci</code> CLI </a> 버전 `2.26.0` 이상이 필요합니다.
</div>

CD Visibility를 설정하려면 배포를 수행하는 CI 작업 내에서 `datadog-ci deployment mark` 명령을 사용하세요.

두 가지 환경 변수가 필요합니다.

1. `DD_API_KEY`: [Datadog API 키][4]를 가리키도록 설정합니다.
2. `DD_BETA_COMMANDS_ENABLED`: 1로 설정합니다.

선택적으로 `DD_SITE` 환경 변수를 특정 [Datadog 사이트][3]로 설정할 수 있습니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

다음 파라미터를 사용하여 `datadog-ci deployment mark` 명령에 의해 생성된 배포 이벤트를 보강할 수 있습니다.

| 파라미터       | 설명                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | 이 배포가 수행되는 환경입니다. 예를 들어, `prod`입니다.                                                             |
| `--service`     | 배포되는 서비스의 이름입니다. 예를 들어, `transaction-service`입니다. 이 옵션에는 `datadog-ci` 버전 `2.31.1` 이상이 필요합니다. |
| `--revision`    | 배포되는 수정 버전 또는 버전입니다. 예를 들어, `1.0.0` 또는 `v123-456`입니다.                                                     |
| `--is-rollback` | 배포가 롤백임을 지정합니다.                                                                                            |
| `--tags`        | `key:value` 형식의 키-값 쌍 배열입니다. 이 태그들은 Datadog에 표시되는 배포 이벤트에 추가됩니다.                   |

`--no-fail`(기본값: `false`)을 사용하여 데이터를 제출하는 동안 문제가 발생해도 배포 명령이 실패하지 않도록 하세요.

GitHub Actions를 CI 공급자로 사용하는 경우, 추가 고려 사항은 [아래 섹션][11]을 참조하세요.

CI 작업에 명령을 추가하면 파이프라인이 실행된 후 [**Deployments** 페이지][5] 및 [Deployment Executions 페이지][6]에 데이터가 채워집니다.
자세한 내용은 [CD Visibility 배포 살펴보기][8]를 참조하세요.

### 예시 {#examples}

이 명령 세트는 CI 작업이 `prod` 환경에 버전 `1.0.0`으로 배포를 실행하도록 지정합니다.

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

이 명령 세트는 CI 작업이 `prod` 환경에 롤백 배포를 수행하도록 지정합니다.

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

이 명령 세트는 CI 작업이 `prod` 환경에 배포를 실행하고 배포 이벤트에 `team:backend` 및 `reason:scheduled` 태그를 추가하도록 지정합니다.

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## GitHub Actions 작업을 배포로 표시{#mark-github-actions-jobs-as-deployments}


`datadog-ci` 버전 `4.1.1`부터는 사용자 지정 이름이나 매트릭스 전략을 사용하는 경우에도 추가 작업이 필요하지 않습니다.

{{% collapse-content title="datadog-ci 4.1.1 이전 버전의 경우" level="h3" expanded=false %}}

`datadog-ci` 버전 `2.29.0`~`4.1.0`을 사용 중이고 작업 이름이 워크플로 구성 파일에 정의된 항목(GitHub [작업 ID][12])과 일치하지 않는 경우, `DD_GITHUB_JOB_NAME` 환경 변수를 노출하여 작업 이름을 가리키도록 해야 합니다. 예시는 다음과 같습니다.

1. [이름 속성][13]을 사용하여 작업 이름을 변경하는 경우:
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. [매트릭스 전략][14]을 사용하는 경우, GitHub가 작업 이름 끝에 매트릭스 값을 추가하여 여러 작업 이름을 생성합니다. 이 매트릭스 값은
   괄호 안에 표시됩니다. 따라서 `DD_GITHUB_JOB_NAME` 환경 변수는 매트릭스 값에 따라 달라져야 합니다.

    ```yaml
    jobs:
      deployment:
        strategy:
          matrix:
            env: [dev, staging]
        env:
          DD_GITHUB_JOB_NAME: deployment (${{ matrix.env }})
        steps:
        - run: datadog-ci deployment mark ...
    ```

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/continuous_integration/pipelines/
[2]: /ko/continuous_integration/pipelines/custom_tags_and_measures/
[3]: /ko/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/ci/deployments
[6]: https://app.datadoghq.com/ci/deployments/executions
[7]: /ko/continuous_delivery/search
[8]: /ko/continuous_delivery/explorer
[9]: /ko/continuous_integration/pipelines/#terminology
[10]: /ko/continuous_delivery/deployments
[11]: /ko/continuous_delivery/deployments/ciproviders#mark-github-actions-jobs-as-deployments
[12]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[13]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[14]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy