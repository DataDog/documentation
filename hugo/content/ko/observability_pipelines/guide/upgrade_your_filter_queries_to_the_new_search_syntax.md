---
aliases:
- /ko/observability_pipelines/guide/upgrade_to_the_new_search_syntax/
description: Observability Pipelines 필터 쿼리에 새로운 검색 구문을 적용하는 방법을 알아봅니다.
disable_toc: false
further_reading:
- link: /observability_pipelines/search_syntax/logs/
  tag: 설명서
  text: Observability Pipelines 검색 구문에 대해 자세히 알아보기
title: 필터 쿼리를 새로운 검색 구문으로 업그레이드
---
## 개요 {#overview}

Worker 2.11 이상 버전에서는 새로운 검색 구문을 사용합니다. Worker 2.10 이하에서 2.11 이상으로 업그레이드된 파이프라인의 기존 쿼리에는 이전 검색 구문이 계속 적용됩니다. 기존 쿼리를 Worker 2.11 이상 버전에서 생성한 파이프라인으로 마이그레이션하려면 다음 단계를 따르세요.

- [기존 쿼리를 새로운 검색 구문으로 업그레이드](#upgrade-queries-to-the-new-search-syntax)
- 업데이트된 검색 구문의 [변경 사항 검토](#whats-new-in-the-updated-search-syntax)

## 쿼리를 새로운 검색 구문으로 업그레이드 {#upgrade-queries-to-the-new-search-syntax}

파이프라인 생성 방법에 따라 다음 단계를 참조합니다.

- [UI에서 파이프라인 생성](#created-the-pipeline-in-the-ui)
- [API 또는 Terraform을 사용하여 파이프라인 생성](#created-the-pipeline-using-the-api-or-terraform)

### UI에서 파이프라인 생성 {#created-the-pipeline-in-the-ui}

UI에서 파이프라인을 생성한 경우 다음 단계를 따르세요.

1. [Observability Pipelines Worker][1] 2.11 이상 버전으로 업그레이드합니다. 업그레이드 후 파이프라인에 새로운 검색 구문이 자동으로 적용됩니다.
1. [Observability Pipelines][2]로 이동합니다. 파이프라인을 선택하고 필터 쿼리에 새로운 검색 구문을 적용합니다. 자세한 내용은 [업데이트된 검색 구문의 변경 사항](#whats-new-in-the-updated-search-syntax) 섹션을 참조하세요.
1. 파이프라인을 배포합니다.

### API 또는 Terraform을 사용하여 파이프라인 생성 {#created-the-pipeline-using-the-api-or-terraform}

공개 API 또는 Terraform으로 파이프라인을 생성한 경우 다음 단계를 따르세요.
- 파이프라인 쿼리를 새로운 검색 구문으로 업데이트하는 요청에서 `use_legacy_search_syntax`를 `false`로 설정합니다.

<div class="alert alert-warning">쿼리를 업데이트할 때는 <b>반드시</b> <code>use_legacy_search_syntax</code> 값을 <code>false</code> 설정해야 합니다. 값이 <code>use_legacy_search_syntax</code> 지정되지 않은 경우 <code>true</code> Worker에서 기본값으로 설정됩니다.</div>

## 업데이트된 검색 구문의 변경 사항 {#whats-new-in-the-updated-search-syntax}

다음 표에서는 레거시 검색 구문과 새로운 검색 구문의 차이점을 설명합니다.

| 레거시 구문 | 새 구문                        |
| ------------- | ------------------------------- |
| [예약된 필드](#legacy-syntax-reserved-fields)를 참조하는 경우를 제외하고 속성 검색에 `@` 기호가 필요합니다. | 속성 검색에 `@` 기호가 필요하지 않습니다. |
| `@`은 속성 검색을 나타내므로 태그 검색에는 `@`이 포함되지 않으며, `tags` 및 `ddtags` 속성에서 일치 여부를 확인합니다.<br><br>`@` 기호가 없는 속성 검색 쿼리는 `tags` 또는 `ddtags` 배열에서 일치 여부를 확인합니다.<br><br>속성 검색 구문 예시: `env:prod` | 태그 검색 구문은 명시적으로 입력해야 합니다.<br><br>[Live Capture][5]를 사용하여 데이터를 검사하고 일치시킬 필드를 결정합니다.<br><br>속성 검색 구문 예시: `tags:"env:prod" OR ddtags:"env:prod"`  |
| [예약된 필드](#legacy-syntax-reserved-fields)에는 `@` 기호가 필요하지 않습니다. | 예약된 필드에는 `@` 기호가 필요하지 않습니다. |

**참고**: 업그레이드된 검색 구문은 속성 검색에 `@` 기호가 필요하지 않습니다. 기존 필터 쿼리에서 `@` 기호를 제거할 필요는 없지만, Datadog은 쿼리에서 `@` 기호를 제거할 것을 권장합니다.

다음 예시에서는 일치하는 로그와 해당 로그를 검색하는 레거시 구문 및 새로운 구문을 보여줍니다.

`{"user": "firstname.lastname"}`
: **레거시 구문**: `@user:firstname.lastname`
: **새 구문**: `user:firstname.lastname`
: **차이점**: 새 구문은 속성 검색에 `@` 기호가 필요하지 않습니다.

`{"message": {"log_level": "ERROR"}}`
: **레거시 구문**: `@message.log_level:ERROR`
: **새 구문**: `message.log_level:ERROR`
: **차이점**: 새 구문은 속성 검색에 `@` 기호가 필요하지 않습니다.

`{"status": "INFO"}`
: **레거시 구문**: `status:INFO`
: **새 구문**: `status:INFO`
: **차이점**: `status`는 이전에 [예약된 필드](#legacy-syntax-reserved-fields)였으며 `@` 기호를 사용하지 않고 필터링할 수 있었기 때문에 변경 사항이 없습니다. 새 구문은 속성 검색에 `@` 기호를 사용하지 않습니다.

`{"message": "Hello, world" }`<br>`{"message: "hello world"}`<br>`{"message": "Hello-world"}`
: **레거시 구문**: `message:"hello world"`
: **새 구문**: `message:"hello world"`
: **차이점**: 레거시 구문과 새 구문 사이에는 변경 사항이 없습니다. 이는 `message`가 레거시 검색 구문에서 예약된 필드였으며 `@` 기호가 필요하지 않았기 때문입니다. 새 구문은 속성 검색에 `@` 기호를 사용하지 않습니다.

`{"message": "hEllo world"}`
: **레거시 구문**: `HELLO OR hello OR Hello`
: **새 구문**: `hello`
: **차이점**: 새 구문에서는 [자유 텍스트 검색][6]이 대소문자를 구분하지 않습니다.

`{"user": "name"}`
: **레거시 구문**: `@user:(name OR Name OR nAme)`
: **새 구문**: `user:(name OR Name OR nAme)`
: **차이점**: 새 구문에서는 [속성 검색][4]이 대소문자를 구분하며 속성 검색에 `@` 기호가 필요하지 않습니다.

`{"tags": ["env:prod"] }`<br>`{"ddtags": ["env:prod"] }`
: **레거시 구문**: `env:prod`
: **새 구문**: `tags:"env:prod" OR ddtags:"env:prod"`
: **차이점**: 레거시 구문에서는 구문에 `@` 기호가 포함되어 있지 않고 예약된 필드를 검색하지 않는 경우, 모든 용어가 `tags` 또는 `ddtags` 필드와 일치합니다. 새로운 검색 구문에는 예약된 필드가 없으므로 모든 검색 조건을 명시적으로 입력해야 합니다.

`{"tags": ["message.log_level:INFO"] }`<br>`{"ddtags": ["message.log_level:INFO"]}}`
: **레거시 구문**: `message.log_level:INFO`
: **새 구문**: `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **차이점**: 앞서 설명한 `env:prod` 쿼리와 같은 이유입니다.

`{"source": "postgres" }`<br>`{"ddsource":"postgres" }`
: **레거시 구문**: `source:postgres`
: **새 구문**: `source:postgres OR ddsource:postgres`
: **차이점**: 레거시 구문에서는 `source` 필드를 사용한 속성 검색이 `source` 및 `ddsource` 필드 모두와 일치합니다. 새 구문에서는 더 이상 두 필드 모두에 일치하지 않으므로 `source` 또는 `ddsource`를 명시적으로 입력해야 합니다.

**참고**: 속성 검색에서 필드 이름에 와일드카드를 사용하는 것은 레거시 구문과 새 구문 모두에서 지원되지 않습니다. 예를 들어, 다음과 같은 와일드카드 사용은 지원되지 않습니다.

- 레거시 구문: `*:something`
- 새 구문: `*:something`

### 레거시 구문 예약 필드 {#legacy-syntax-reserved-fields}

레거시 구문의 예약된 필드는 다음과 같습니다.

* host
* source
* status
* service
* trace_id
* message
* timestamp
* tags

자세한 내용은 [예약된 속성][3]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /ko/observability_pipelines/search_syntax/logs/#attribute-search
[5]: /ko/observability_pipelines/live_capture/
[6]: /ko/observability_pipelines/search_syntax/logs/#free-text-search