---
description: Datadog 통합 준비 시 필요한 여러 에셋에 대해 알아봅니다.
further_reading:
- link: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
  tag: 소스 코드
  text: 설명서 사이트 지침 제공
- link: /developers/integrations/
  tag: 설명서
  text: 에이전트 또는 API 기반 통합 생성에 대해 알아보기
- link: /developers/integrations/oauth_for_integrations/
  tag: 설명서
  text: 통합용 OAuth 사용에 대해 알아보기
kind: 설명서
title: 통합 에셋 참조
---
## 개요

이 페이지에서는 [**Integration** 페이지][12] 또는 [**Marketplace** 페이지][9]에서 제공 사항을 생성하기 위해 필요한 파일을 설명합니다.

## 설정 파일

새로운 통합을 준비할 때 필요한 옵션과 적절한 기본값을 포함하는 예제 설정을 포함해야 합니다. 다음 예제 설정 파일은 `<CHECK_NAME>/datadog_checks/<CHECK_NAME>/data/conf.yaml.example`에 있습니다. 여기에는 최상위 요소 `init_config`및 `instances`가 있습니다.

`init_config` 설정은 전체적으로 통합에 적용되며 통합의 모든 인스턴스 생성에 사용되는 반면 `instances`안에 있는 모든 것은 지정된 인스턴스화에만 해당됩니다.

각 섹션의 설정 블록은 다음과 같은 형식입니다.

```yaml
## @<COMMAND> [- <ARGS>]
## <DESCRIPTION LINE 1>
## <DESCRIPTION LINE 2>
#
<KEY>: <VALUE>
```

구성 블록은 다음과 같은 지침을 따릅니다.

- 설명은 비워둘 수 없습니다.
- 자리표시자는 항상 `<THIS_IS_A_PLACEHOLDER>` 형식을 사용해야 합니다. 자세한 내용은 [설명서 사이트 지침][1]을 참고하세요.
- 모든 필수 파라미터는 기본적으로 주석 처리되지 **않습니다**.
- 선택 사항인 파라미터는 모두 기본적으로 주석 처리됩니다.
- 자리표시자에 통합 기본값(예: 통합 상태 엔드포인트)이 있는 경우, 일반적인 자리표시자 대신 해당 값을 사용할 수 있습니다.

### `@param` 사양

`@param` 명령을 사용하여 설정 블록을 설명하고 설정에 대한 설명서를 제공할 수 있습니다.

`@param`은 다음 형식 중 하나를 사용하여 구현됩니다.

```text
@param <name> - <type> - required
@param <name> - <type> - optional
@param <name> - <type> - optional - default: <defval>
```

**인수**:

- `name`: `search_string`와 같은 파라미터의 이름 (필수).
- `type`: 파라미터 값의 데이터 유형 (필수).
          사용 가능한 값: _boolean_, _string_, _integer_, _double_, _float_, _dictionary_, _list\*_, and _object\*_.
- `defval`: 파라미터의 기본값으로, 비워둘 수 있음(선택 사항).

`list` 및 `object` 변수는 여러 줄에 걸쳐 있고 특별한 규칙이 있습니다.

- `list`에서 개별 요소는 `@param` 사양과 함께 문서화되지 않습니다.
- `object`에서는 `@param` 사양을 사용하여 요소를 개별적으로 문서화하거나 개체 자체의 사양에 따라 공통 최상위 설명을 갖도록 선택할 수 있습니다.

### 선택 사항인 파라미터

선택 사항인 파라미터는 기본적으로 주석을 달아야 합니다. 파라미터가 걸쳐있는 모든 줄 앞에 `@param` 사양과 동일한 들여쓰기와 함께 `#`를 추가합니다.

### 블록 주석

다음 규칙을 사용하여 설정 파일의 임의 위치에 블록 주석을 추가할 수 있습니다.

- 주석은 `##`로 시작합니다.
- 주석은 다른 변수처럼 들여쓰기를 해야 합니다(하이픈은 미포함).

YAML 구문에 대한 자세한 내용은 [YAML 위키피디아 문서][2]를 참고하세요. [온라인 YAML 파서][3]를 살펴볼 수도 있습니다.

## 매니페스트 파일

[**Integration** 페이지][4] 또는 [**Marketplace** 페이지][11]의 모든 제공 사항에는 `manifest.json` 파일이 포함되어 있습니다. 이 파일은 운영 파라미터, Datadog 통합 에코시스템 전체 내 포지셔닝, 추가 메타데이터를 정의합니다.

{{% integration-assets-reference %}}

### Classifier 태그

`classifier_tags` 파라미터를 사용하여 여러 카테고리를 설정하고 통합에 전송되거나 쿼리된 데이터 유형을 정의할 수 있습니다.

아래에서 `manifest.json` 파일에 대한 classifier 태그의 전체 목록을 찾을 수 있습니다:

{{% integration_categories %}}

## 서비스 검사 파일

`service_check.json` 파일은 통합에서 실행하는 서비스 검사를 설명합니다.

아래에서 `service_checks.json` 파일의 필수 특성 전체 목록을 확인할 수 있습니다.

| 속성       | 설명                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `agent_version` | 지원되는 최소 에이전트 버전입니다.                                                                                           |
| `integration`   | 서비스 검사를 내보내는 통합의 이름입니다. `manifest.json`으로부터 비정규화된 `tile.title` 형식이어야 합니다.   |
| `check`         | 서비스 검사의 이름입니다. 고유한 이름이어야 합니다.                                                                               |
| `statuses`      | `ok`,`warning` 및 `critical` 는 검사의 상태를 나타냅니다. `unknown`을 선택할 수도 있습니다.   |
| `groups`        | 서비스 검사와 함께 전송되는 [태그][8]입니다.                                                                                     |
| `name`          | 서비스 검사의 표시된 이름입니다. 표시되는 이름은 모든 통합에 걸쳐 고유하고 설명 가능한 이름이어야 합니다.       |
| `description`   | 서비스 검사에 대한 설명입니다.                                                                                           |


## 메트릭 메타데이터 파일

`metadata.csv` 파일은 통합을 통해 수집할 수 있는 모든 메트릭을 설명합니다.

`metadata.csv` 파일의 필수 속성과 선택 속성의 전체 목록은 아래에서 확인할 수 있습니다.

| 열 이름     | 필수 사항 또는 선택 사항 | 설명                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_name`   | 필수 사항          | 메트릭의 이름입니다.                                                                                                                                                                                                                                                                                                                     |
| `metric_type`   | 필수 사항          | 메트릭의 유형입니다. 사용 가능한 메트릭 제출 유형 목록은 [메트릭 유형][6]을 참고하세요.                                                                                                                                                                                                                                                                                                                |
| `interval`      | 선택 사항           | 메트릭의 수집 간격(초)입니다.                                                                                                                                                                                                                                                                                            |
| `unit_name`     | 선택 사항           | 메트릭의 단위입니다. 지원되는 단위의 전체 목록은 [메트릭 단위][7]를 참조하세요.                                                                                                                                                                                                                                                                              |
| `per_unit_name` | 선택 사항           | `request per second`와 같은 단위 하위 구분이 있는 경우입니다.                                                                                                                                                                                                                                                                               |
| `description`   | 선택 사항           | 메트릭에 대한 설명입니다.                                                                                                                                                                                                                                                                                                              |
| `orientation`   | 필수 사항          | 메트릭이 `myapp.turnover`와 같이 증가해야 하는 경우  `1`로 설정합니다. 메트릭 변동이 관련이 없는 경우, `0`으로 설정합니다. ` if the metric should go down, such as `myapp.latency' 일 경우, '-1'로 설정합니다.                                                                                                                                                         |
| `integration`   | 필수 사항          | 메트릭을 내보내는 통합의 이름입니다. `manifest.json`파일의 `tile.title`는 표준화된  버전이어야 합니다. 문자, 밑줄, 대시 및 숫자를 제외한 모든 문자는 밑줄로 변환됩니다. 예: `Openstack Controller`->`openstack_controller`, `ASP.NET`-> `asp_net`, `CRI-o`->`cri-o`. |
| `short_name`    | 필수 사항          | 메트릭의 명시적인 고유 ID입니다.                                                                                                                                                                                                                                                                                                      |
| `curated_metric`| 선택 사항           | 특정 유형 (`cpu`및 `memory` 둘 다 허용됨)에 대해 주목할 만한 통합 메트릭을 표시합니다. 이러한 항목은 다른 통합 메트릭 위의 UI에 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md#code-substitution
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/ko/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/ko/metrics/types/#metric-types
[7]: https://docs.datadoghq.com/ko/metrics/units/#unit-list
[8]: https://docs.datadoghq.com/ko/getting_started/tagging/
[9]: https://app.datadoghq.com/marketplace/
[10]: https://docs.datadoghq.com/ko/developers/datadog_apps/
[11]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering
[12]: https://app.datadoghq.com/integrations