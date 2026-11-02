---
description: CD Visibility가 코드 변경 사항을 탐지하는 방법을 알아보세요.
further_reading:
- link: /continuous_delivery/deployments/
  tag: 설명서
  text: Deployment Visibility에 대해 알아보기
- link: /continuous_delivery/explorer
  tag: 설명서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
title: 코드 변경 탐지
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

코드 변경 탐지를 사용하면 Datadog에서 배포의 일부로 도입된 커밋을 식별할 수 있습니다. 이는 특히 다음 경우에 유용합니다.
- 업데이트가 `production` 환경에 도달하는 시점을 추적하는 등 특정 변경 사항이 배포된 위치를 파악할 때.
- 도입된 정확한 변경 사항을 확인하여 배포와 관련된 인시던트를 진단할 때. 이를 통해 팀은 잠재적인 근본 원인을 신속하게 파악하고 문제 해결을 가속화할 수 있습니다.

배포된 코드 변경 사항을 탐지하기 위해 Datadog은 현재 배포 커밋 SHA와 이전 배포 커밋 SHA 간의 [`git log`][1]를 실행합니다. 병합 커밋은 계산에서 제외됩니다.

배포된 코드 변경 사항은 [Deployment Executions 페이지][2]의 모든 배포 실행 내에서 확인할 수 있습니다. {{< ui >}}Code Changes{{< /ui >}} 탭에는 고려된 이전 배포와 두 배포 간에 탐지된 코드 변경 사항이 표시됩니다.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="변경 탐지 기능에 대한 Code Changes 탭" style="width:100%;">}}

또한 [Recent Code Changes][3] 페이지의 {{< ui >}}Deployments{{< /ui >}} 열에는 특정 커밋이 포함된 모든 배포에 대한 서비스 및 환경 세부 정보가 표시됩니다. 이 뷰를 통해 코드 변경 사항이 배포되었는지, 어디에 배포되었는지 빠르게 파악할 수 있습니다.
서비스 값 위에 마우스를 올리면 서비스가 일반적으로 배포되는 위치를 기준으로 배포가 예상되는 모든 환경에 도달했는지 확인할 수 있습니다.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Recent Code Changes 페이지의 배포 표시" style="width:100%;">}}

코드 변경 사항은 다음 배포에 대해서만 탐지됩니다.
- Catalog에 파일 경로 사양이 정의된 서비스(`@deployment.service`)가 있습니다(자세한 내용은 [설정 지침](#specify-service-file-path-patterns) 참조).
- 환경(`@deployment.env`)이 있습니다.
- 리포지토리 URL(`@deployment.git.repository_url`) 및 커밋 SHA(`@deployment.git.commit.sha`)가 있습니다.

## 설정 {#setup}

배포에 대해 코드 변경 탐지를 사용하려면 다음 2단계를 거쳐야 합니다.
1. [리포지토리 메타데이터를 Datadog과 동기화합니다](#synchronize-repository-metadata-to-datadog).
2. [서비스의 소스 코드 파일 경로를 지정합니다](#specify-service-file-path-patterns).

### 리포지토리 메타데이터를 Datadog과 동기화 {#synchronize-repository-metadata-to-datadog}

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> 트리거</a>를 실행하는 GitHub 워크플로는 GitHub 통합에서 지원되지 않습니다.
현재 <code>pull_request</code> 트리거를 사용 중이면 대체 방법을 사용하세요.
</div>

[GitHub 통합][1]이 이미 설치되어 있지 않은 경우, [GitHub 통합 타일][2]에서 설치하세요.

GitHub 앱을 구성할 때:
1. 최소한 {{< ui >}}Read{{< /ui >}} 리포지토리 권한에 대해 {{< ui >}}Contents{{< /ui >}} 및 {{< ui >}}Pull Requests{{< /ui >}} 권한을 선택하세요.
2. 최소한 {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} 및 {{< ui >}}PullRequestReview{{< /ui >}} 이벤트를 구독하세요.

설정이 유효한지 확인하려면 [GitHub 통합 타일][2]에서 GitHub 앱을 선택하고 {{< ui >}}Datadog Features{{< /ui >}} 표에서 {{< ui >}}Pull Request Information{{< /ui >}} 기능이 유효한 것으로 표시되는지 확인하세요.

[1]: https://docs.datadoghq.com/ko/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

[인앱 온보딩][1]에 따라 GitLab 소스 코드 통합을 설정하세요.

**참고**: 서비스 계정의 개인 액세스 토큰 범위는 최소 `read_api` 이상이어야 합니다.

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "기타 Git 공급자" %}}

[`datadog-ci git-metadata upload`][1] 명령을 사용하여 Git 리포지토리 메타데이터를 업로드할 수 있습니다.
이 명령이 실행되면 Datadog은 리포지토리 URL, 현재 브랜치의 커밋 SHA, 추적된 파일 경로 목록을 수신합니다.

새 커밋마다 CI에서 이 명령을 실행하세요. 특정 커밋 SHA에 대해 배포가 실행되는 경우, 배포 이벤트가 전송되기 **전**에 해당 커밋에 대해 `datadog-ci git-metadata upload` 명령을 실행하세요.

<div class="alert alert-danger">
이 <code>--no-gitsync</code> 옵션을 <code>datadog-ci git-metadata upload</code> 명령에 추가하지 마세요.
해당 옵션이 포함되면 커밋 정보가 Datadog으로 전송되지 않으며 변경 사항이 탐지되지 않습니다.
</div>

명령 출력에서 명령의 설정이 올바른지 확인할 수 있습니다. 올바른 출력 예시는 다음과 같습니다.

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### 서비스 파일 경로 패턴 지정 {#specify-service-file-path-patterns}

배포로 인해 도입된 코드 변경 사항을 올바르게 이해하려면 배포 중인 특정 서비스에 영향을 미치는 커밋만 고려해야 합니다.

이는 [Catalog][5]에서 관심 있는 서비스에 대해 [서비스 정의][4] 내에 소스 코드 glob 파일 경로 패턴을 지정하여 수행할 수 있습니다.

서비스 정의에 애플리케이션 폴더를 가리키는 **전체** GitHub 또는 GitLab URL이 포함되어 있으면, 단일 경로 패턴이 자동으로 사용됩니다. 링크 유형은 **repo**여야 하며, 링크 이름은 "Source" 또는 서비스의 이름(아래 예시의 `shopist`)이어야 합니다.

리포지토리에 단일 서비스만 포함되어 있고 모든 디렉터리의 코드 변경 사항을 고려하려는 경우 이 단계를 건너뛸 수 있습니다. 리포지토리에서 두 개 이상의 서비스를 배포하는 경우 소스 코드 경로 패턴을 지정해야 합니다.

**예시(스키마 버전 v2.2):**

{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

{{% /tab %}}

{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```

{{% /tab %}}
{{< /tabs >}}

`shopist` 서비스 배포에 대한 코드 변경 탐지는 `src/apps/shopist/**` 경로 내의 변경 사항을 포함하는 Git 커밋만 고려합니다. `extensions[datadoghq.com/cd-visibility]` 또는 `extensions[datadoghq.com/dora-metrics]`를 사용하여 더 세밀한 제어를 구성할 수 있습니다. 두 확장이 모두 탐지되면 `extensions[datadoghq.com/cd-visibility]`가 사용됩니다.**예시(스키마 버전 v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

`shopist` 서비스 배포에 대한 코드 변경 탐지는 `src/apps/shopist/**` 또는 `src/libs/utils/**` 경로 내의 변경 사항을 포함하는 Git 커밋만 고려합니다.

서비스의 소스 코드 패턴이 링크와 확장 모두에 정의된 경우, 커밋을 필터링할 때는 확장만 고려됩니다.

#### 서비스 파일 경로 패턴을 사용하여 전체 리포지토리의 변경 사항 추적 {#use-service-file-path-patterns-to-track-changes-across-the-entire-repository}
전체 리포지토리에 걸친 변경 사항을 탐지하려면 적절한 파일 경로 패턴을 사용하세요. 예를 들어, `"**"`는 모든 파일과 일치합니다.**예시(스키마 버전 v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

이 경우, `shopist` 서비스 배포에 대한 코드 변경 탐지는 전체 리포지토리 트리의 변경 사항을 포함하는 Git 커밋을 고려합니다.

<div class="alert alert-danger">패턴이 정확히 <code>**</code> 이거나 이 패턴으로 시작하는 경우, 따옴표로 묶어야 합니다. YAML에서 <code>*</code> 는 앵커에 사용하도록 예약되어 있기 때문입니다.</div>


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /ko/internal_developer_portal/catalog/entity_model/
[5]: /ko/internal_developer_portal/catalog/