---
description: Edit Fields 프로세서를 사용하여 로그 데이터 내 필드를 추가 또는 삭제하고, 이름을 변경하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: 설명서
  text: 예약된 속성 재매핑
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Edit Fields 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

Edit Fields 프로세서를 통해 개별 로그 데이터 내 필드를 추가 또는 삭제하거나 이름을 변경할 수 있습니다. 이 프로세서를 사용하여 로그에 컨텍스트를 추가하고, 가치가 낮은 필드를 삭제해 볼륨을 줄이고, 중요한 속성 전반에 걸쳐 명명 규칙을 표준화하세요. 시작하려면 드롭다운 메뉴에서 {{< ui >}}add field{{< /ui >}}, {{< ui >}}drop field{{< /ui >}}, {{< ui >}}rename field{{< /ui >}}를 선택합니다.

Edit Fields 프로세서로 속성을 다시 매핑하는 방법은 [예약된 속성 재매핑][1] 가이드를 참조하세요.

## 설정 {#setup}

### 필드 추가 {#add-field}
{{< ui >}}add field{{< /ui >}}를 사용하여 로그에 새 키값 필드를 추가합니다.

필드 추가 프로세서 설정하기:
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 자세한 내용은 [검색 구문][2]을 참조하세요.
1. 추가하려는 필드와 값을 입력합니다. 키에 중첩 필드를 지정하려면 [경로 표기법](#path-notation-example-remap)을 사용합니다. `<OUTER_FIELD>.<INNER_FIELD>` 모든 값은 문자열 형식으로 저장됩니다.
    **참고**: 추가하려는 필드가 이미 존재하는 경우, Worker는 오류를 기록하며 기존 필드는 변경되지 않습니다.

### 필드 삭제 {#drop-field}

{{< ui >}}drop field{{< /ui >}}을 사용하여 아래에서 지정한 필터와 일치하는 로깅 데이터에서 필드를 삭제합니다. 객체를 삭제할 수 있으므로, 이 프로세서를 사용하여 중첩 키를 삭제할 수 있습니다.

필드 삭제 프로세서 설정하기:
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 자세한 내용은 [검색 구문][2]을 참조하세요.
1. 삭제하려는 필드의 키를 입력합니다. 지정한 키에 중첩 필드를 지정하려면 [경로 표기법](#path-notation-example-remap)을 사용합니다. `<OUTER_FIELD>.<INNER_FIELD>`.
    **참고**: 지정한 키가 존재하지 않으면 로그에 아무런 영향을 미치지 않습니다.

### 필드 이름 변경 {#rename-field}

로그 내 필드의 이름을 변경하려면 {{< ui >}}rename field{{< /ui >}}을 사용합니다.

필드 이름 변경 프로세서 설정하기:
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 자세한 내용은 [검색 구문][2]을 참조하세요.
1. {{< ui >}}Source field{{< /ui >}}에 이름을 변경할 필드의 이름을 입력합니다. 키에 중첩 필드를 지정하려면 [경로 표기법](#path-notation-example-remap)을 사용합니다. `<OUTER_FIELD>.<INNER_FIELD>` 이름을 변경한 후, 아래에 설명된 {{< ui >}}Preserve source tag{{< /ui >}} 확인란을 활성화하지 않을 경우 기존 필드가 삭제됩니다.<br>**참고**: 지정한 소스 키가 존재하지 않으면 대상에 기본 `null`값이 적용됩니다.
1. {{< ui >}}Target field{{< /ui >}}에 소스 필드의 새 이름을 입력합니다. 지정한 키에 중첩 필드를 지정하려면 [경로 표기법](#path-notation-example-remap)을 사용합니다. `<OUTER_FIELD>.<INNER_FIELD>`.<br>**참고**: 지정한 대상 필드가 이미 존재하는 경우, Worker는 오류를 기록하며 기존 대상 필드를 덮어쓰지 않습니다.
1. 필요시 기존 소스 필드를 유지하고 소스 키 정보를 지정한 대상 키로 복제하려면 {{< ui >}}Preserve source tag{{< /ui >}} 상자에 체크 표시합니다. 이 상자에 체크 표시를 하지 않으면 소스 키는 이름 변경 후 삭제됩니다.

### 경로 표기법 예시 {#path-notation-example-remap}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][3] 및 [프로세서 버퍼 메트릭][4]은 [파이프라인 사용량 메트릭][5] 설명서를 참조하세요. Edit Fields 프로세서 메트릭 기준으로 필터링하거나 그룹화하려면 구성한 작업에 따라 `component_type:add_fields`, `component_type:remove_fields` 또는 `component_type:rename_fields` 태그를 사용합니다.

[1]: /ko/observability_pipelines/guide/remap_reserved_attributes
[2]: /ko/observability_pipelines/search_syntax/logs/
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}