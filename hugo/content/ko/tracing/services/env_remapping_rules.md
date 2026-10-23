---
description: 트레이서 구성을 변경하거나 코드를 재배포하지 않고도 환경 재매핑 규칙을 사용하여 APM 스팬의 환경 이름을 변경하거나 환경을
  병합 또는 분할할 수 있습니다.
further_reading:
- link: /tracing/services/service_remapping_rules/
  tag: 설명서
  text: 서비스 재매핑 규칙
title: 환경 재매핑 규칙
---
{{< callout url="https://www.datadoghq.com/product-preview/env-remapping/" header="미리 보기에 참여하세요!" >}}
환경 재매핑은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 이 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

환경 재매핑 규칙을 사용하면 Datadog에서 환경을 이름 변경, 병합 또는 분할할 수 있습니다. 이 규칙은 트레이서 구성을 변경하거나 코드를 재배포하지 않고도 APM 스팬의 `env` 값을 업데이트합니다.

## 사전 요구 사항 {#prerequisites}

환경 재매핑 규칙을 생성, 편집 또는 삭제하려면 **APM Service Remapping Write** 권한(`apm_service_renaming_write`)이 필요합니다. [Datadog 역할 권한][1]을 참조하세요.

## 환경 재매핑 규칙 생성 {#create-an-env-remapping-rule}

1. Datadog에서 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > {{< ui >}}Service Tags Remapping{{< /ui >}}으로 이동합니다.
1. {{< ui >}}Add Env Rule{{< /ui >}}을 클릭합니다.
1. 검색 창을 사용하여 재매핑할 환경을 하나 이상 선택합니다.
1. 텍스트 상자에 고유한 환경 이름을 입력합니다. 입력하는 동안 환경 이름의 미리보기가 표시됩니다.

    태그를 기반으로 환경 이름을 지정하려면 `{{tagName}}` 구문을 사용하세요. 태그 값이 특정 패턴을 따르는 경우, 정규 표현식을 적용하여 이름에 사용할 부분만 추출하세요.

    **Note**: When a tag has several values, the preview shows only those with the most spans.

1. 필요시 나중에 재매핑 규칙을 식별할 수 있도록 설명이 포함된 이름을 입력합니다.
1. 재매핑 규칙을 검토하고 저장합니다.

규칙을 저장한 후 적용되기까지 약 1분이 소요될 수 있습니다.

## 환경 재매핑 규칙의 동작 방식{#env-remapping-rules-behavior}

환경 재매핑 규칙은 수집 시 `env` 태그를 재정의합니다. 규칙을 생성해도 환경 이름을 지정하는 기존 구성은 변경되지 않습니다. 환경 재매핑 규칙은 다른 모든 환경 이름 구성보다 우선합니다.

- **영향을 받는 데이터**: 환경 재매핑은 APM 스팬에만 적용됩니다.
- **과거 데이터**: 환경 재매핑 규칙은 규칙이 활성화된 동안 수집된 스팬에만 적용됩니다. 과거 데이터는 소급하여 업데이트되지 않습니다. 규칙을 삭제하거나 수정하면 새 스팬에 적용되는 것이 중단되지만, 이전에 수집된 데이터는 업데이트되지 않습니다.
- **규칙 처리 순서**: 환경 재매핑 규칙은 생성된 순서대로 적용됩니다. 환경 재매핑 목록에서 위에 있는 규칙은 아래에 있는 규칙보다 우선합니다. 규칙의 순서를 변경할 수 있습니다.
- **정규 표현식**: 정규 표현식을 사용하여 새 환경 이름을 정의하세요. 캡처 그룹 내에서는 탐욕 정량자를 사용할 수 없습니다.
- **서비스 재매핑 규칙과의 상호 작용**: 환경 재매핑 규칙은 [서비스 재매핑 규칙][2] 이후에 적용됩니다. 서비스 재매핑 규칙이 `service` 태그를 수정하면, 환경 재매핑은 환경 재매핑 규칙을 적용할 때 업데이트된 서비스 이름을 사용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: /ko/tracing/services/service_remapping_rules/