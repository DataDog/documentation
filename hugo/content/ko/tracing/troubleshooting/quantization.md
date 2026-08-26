---
further_reading:
- link: /tracing/trace_collection/custom_instrumentation/
  tag: 설명서
  text: 커스텀 계측
- link: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
  tag: 설명서
  text: 스팬에서 태그 교체하기
- link: /tracing/trace_collection/library_config/
  tag: 설명서
  text: 라이브러리 구성 추적하기
title: APM 데이터 양자화
---

## 개요

Datadog에서는 데이터 수집 중 APM 데이터의 [스팬][1]이나 [리소스][2] 이름에 임의의 전역 고유 ID(GUID), 숫자 ID, 쿼리 파라미터 값과 같은 _양자화_를 적용합니다. 이와 같이 정규화하면 분석할 때 스팬과 리소스를 같은 이름으로 한 데 묶을 수 있어 임의 패턴으로 인해 이름이 정리되지 않는 사태를 예방할 수 있습니다.

리소스나 스팬 이름의 특정 패턴이 다음과 같은 고정 문자열로 대체됩니다.
- GUID: `{guid}`
- 숫자 ID(영숫자 외 문자로 둘러싸인 6자리 이상 수 또는 문자열 마지막에 있는 경우): `{num}`
- 쿼리 파라미터 값: `{val}`

이와 같이 교체되면 다음에 영향을 미칩니다.
- 트레이스 메트릭 이름,
- 해당 메트릭의 리소스 이름 태그,
- 수집된 스팬 모두의 리소스와 스팬 이름

### 양자화 예시

예를 들어, _스팬 이름_이 `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84`이면, 이름이 `find_user_{guid}`로 변경되고 트레이스 메트릭은 다음과 같이 됩니다. 
- `trace.find_user_guid`
- `trace.find_user_guid.hits`
- `trace.find_user_guid.errors`
- `trace.find_user_guid.duration`
- `trace.find_user_guid.apdex`(서비스에 Apdex가 구성된 경우)

트레이스 검색에서 이 스팬을 검색하려면 `operation_name:"find_user_{guid}"` 쿼리를 사용합니다.

_리소스 이름_이 `SELECT ? FROM TABLE temp_128390123`인 경우, 이름이 `SELECT ? FROM TABLE temp_{num}`로 바뀌고, 메트릭 정규화된 태그는 `resource_name:select_from_table_temp_num`이 됩니다.

트레이스 검색에서 이 스팬을 찾으려면 `resource_name:"SELECT ? FROM TABLE temp_{num}"` 쿼리를 사용합니다.

## 계측을 변경해 기본 양자화 예방하기

**참고**: 계측 업스트림이나 에이전트에서 스팬과 리소스 이름을 변경하면 새 메트릭과 태그가 생성됩니다. 양자화된 데이터에서 쿼리를 사용하는 경우, 새 이름으로 쿼리를 업데이트해야 합니다.

### 코드 내 계측

에이전트 없는 설정에서 애플리케이션을 실행 중이거나 코드에서 직접 계측을 변경하고 싶을 경우, [내 애플리케이션 런타임 트레이서 설명서][3]를 참고해 스팬 이름과 리소스 이름의 커스텀 구성을 생성하는 방법을 알아보세요.

### 에이전트 구성

Go 호환 regex에서 `replace_tags` YAML 구성 옵션을 사용해 나만의 대체 문자열을 설정할 수 있습니다.

```yaml
apm_config:
  replace_tags:
    # Replace tailing numeric IDs in span names with "x":
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # Replace numeric IDs in resource paths:
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

또는 JSON 문자열을 값으로 `DD_APM_REPLACE_TAGS` 환경 변수를 사용할 수도 있습니다.

```bash
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get_id_[0-9]+", "repl": "get_id_x"}, {...}, ...]'
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#spans
[2]: /ko/tracing/glossary/#resources
[3]: /ko/tracing/trace_collection/custom_instrumentation/