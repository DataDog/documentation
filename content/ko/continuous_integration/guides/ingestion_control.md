---
description: CI Visibility에서 특정 이벤트를 처리하지 않도록 제외하는 조건을 어떻게 정의하는지 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: 블로그
  text: Datadog Intelligent Test Runner로 CI 테스트 간소화
- link: /continuous_integration/pipelines
  tag: 설명서
  text: Pipeline Visibility에 대해 알아보기
kind: 가이드
title: CI Visibility용 수집 제어 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility는 현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

제외 필터를 사용하면 Datadog이 처리하는 특정 이벤트를 제외할 하나 이상의 조건을 정의할 수 있어 CI Visibility 예산을 세밀하게 제어할 수 있습니다.

### 호환성
Pipeline Visibility에 필터를 사용할 수 있습니다.

## 제외 필터 추가하기
 Pipeline Visibility를 설정할 때 제외 필터는 필요하지 않습니다. 기본적으로 모든 데이터가 수집 및 처리됩니다.

조직에 대한 필터를 만들려면 사용자 계정에 `ci_ingestion_control_write` [권한][1]이 있어야 합니다.

1. Datadog에서 **CI** > **Settings** > **Ingestion Settings**로 이동합니다.
2. **Add an Exclusion Filter**를 선택합니다.

{{< img src="ci/add-ci-exclusion-filter.png" alt="Add an Exclusion Filter button" style="width:90%;">}}

3. 필터의 이름을 지정하고 쿼리를 정의합니다. 쿼리를 정의하면 입력 필드 위의 미리 보기에 쿼리와 일치하는 수집된 데이터가 표시됩니다. 필터를 생성하고 활성화하면 미리 보기에 표시된 것과 같은 이벤트는 수집에서 제외됩니다.

{{< img src="ci/exclusion-filter-pipeline.png" alt="Creating an exclusion filter for a specific pipeline" style="width:100%;">}}

필터를 추가하면 이 페이지의 각 행이 표시됩니다:
- **Filter name** - 필터의 이름
- **Exclusion query** - 해당 필터에 대해 정의된 쿼리
- [enable/disable the filter](#enabling-and-disabling-filters)로 전환 - 새로 만든 필터는 기본적으로 활성화되어있습니다.

하나 이상의 필터와 일치하는 모든 스팬은 Datadog에서 수집되거나 처리되지 않습니다.

## 제외 필터에 대한 쿼리 정의하기
필터는 쿼리 편집기 인터페이스를 통해 유연하게 정의할 수 있습니다. [태그][3]와 속성을 사용하여 필터를 만들 수 있습니다.

### 제외 필터 예시
다음 예시는 제외 필터가 CI Visibility 사용량 및 청구 최적화에 어떻게 도움이 되는지 보여줍니다.

#### git 작성자 이메일 주소로 필터링
git 작성자 이메일 주소(`@git.commit.author.email`)로 필터를 정의하여 하나 이상의 특정 커미터를 모니터링 대상에서 제외할 수 있습니다. 아래 스크린샷은 특정 git 작성자 이메일의 커밋과 관련된 모든 스팬이 수집되지 않는 필터를 보여줍니다.

{{< img src="ci/exclusion-filter-email.png" alt="Ingestion control exclusion filter for email address" style="width:100%;">}}

#### git 작성자 이메일 도메인으로 필터링
이메일 도메인별로 한 번에 많은 커미터를 제외할 수도 있습니다 (예: 모니터링되는 리포지토리에 커밋하는 외부 컨트리뷰터를 제외할 수 있음). 아래 스크린샷은 쿼리의 이메일 주소 도메인과 일치하지 않는 커밋과 관련된 모든 스팬이 수집되지 않는 필터를 보여줍니다.

{{< img src="ci/exclusion-filter-domain.png" alt="Ingestion control exclusion filter for email domain" style="width:100%;">}}

#### 리포지토리별로 필터링하기
리포지토리 이름(`@git.repository.name`) 또는 ID(`@git.repository.id`)로 필터를 정의하여 특정 리포지토리(예: 내부 테스트 리포지토리)를 모니터링 대상에서 제외할 수 있습니다. 아래 스크린샷은 이 리포지토리에 대한 커밋과 관련된 모든 스팬이 수집되지 않는 필터를 보여줍니다.

{{< img src="ci/exclusion-filter-repo.png" alt="Ingestion control exclusion filter for repository" style="width:100%;">}}

## 제외 필터 업데이트하기
제외 필터는 `ci_ingestion_control_write` [권한][4]이 있는 사용자가 활성화/비활성화, 업데이트 및 삭제할 수 있습니다. 제외 필터는 조직 레벨에서 적용됩니다. Datadog [Audit Trail][5]을 사용하여 제외 필터를 수정한 사용자에 대한 자세한 정보를 볼 수 있습니다.

### 필터 활성화 및 비활성화하기
각 필터의 오른쪽에 있는 토글을 사용하여 언제든지 필터를 활성화 및 비활성화할 수 있습니다. 새로 만든 필터는 기본적으로 활성화되어 있습니다.

**참고**: 대부분의 경우 필터는 활성화된 후 1초 이내(p95)에 수집된 데이터에 적용됩니다. 그러나 활성화된 필터가 적용되기까지 최대 몇 분 정도 걸릴 수 있습니다.


### 필터 업데이트하기 
**Ingestion Settings** 페이지에서 언제든지 필터의 이름을 변경하거나 제외 필터의 쿼리를 수정할 수 있습니다.

{{< img src="ci/exclusion-filter-edit.png" alt="Ingestion control edit exclusion filter button" style="width:90%;">}}

### 필터 삭제하기
삭제 아이콘을 클릭하여 필터를 삭제할 수 있습니다.

{{< img src="ci/exclusion-filter-delete.png" alt="Ingestion control delete exclusion filter button" style="width:90%;">}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#ci-visibility
[3]: /ko/getting_started/tagging/
[4]: /ko/account_management/rbac/permissions/#ci-visibility
[5]: /ko/account_management/audit_trail/events/#ci-visibility-events
[6]: /ko/monitors/types/apm/