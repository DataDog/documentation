---
further_reading:
- link: /account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량 설정
title: 시간별 및 월별 사용량 속성 API로 마이그레이션하기
---

## 요약

이 가이드는 v1 사용량 속성 API에서 v2 API로 마이그레이션하기 위한 지침을 제공합니다. v1 API는
더 이상 사용되지 않으며, 월간
API([사용량 속성 가져오기][1])와 파일 
기반 API([사용 가능한 일일 커스텀 보고서 목록 가져오기][2], [지정된 일일 커스텀 보고서 가져오기][3], 
[사용 가능한 월간 커스텀 보고서 목록 가져오기][4] 및
[지정된 월간 커스텀 보고서 가져오기][5]) 중 두 가지 유형이 존재합니다. 이 가이드를 사용하려면 현재 사용 중인 v1 API에 대한 아래 섹션을 찾은 뒤 지침에 따라 해당 v2 API로 마이그레이션하세요.

**참고**: 본 문서의 v1, v2에 대한 언급은 URL 경로의 버전을 의미하지 않습니다. 본 문서에 명시된 모든 API는 개별 경로가 존재하는 첫 번째 버전이므로 URL 경로에 `v1`을 사용합니다.

## 월간 API

### [사용량 속성 가져오기][6]

이 API는 월간 사용량 속성을 제공합니다.

v2 월간 사용량 속성 API[월간 사용량 속성 가져오기][7]도 월간 사용량 속성을 제공하고, 태그 조합으로 쿼리를 지원합니다.

v1 및 v2 API의 차이점과 v2 API로 마이그레이션하기 위한 권장 사항은 아래 섹션을 참조하세요.

#### 페이지 지정

v1 API에서는 쿼리 파라미터 `offset` 및 `limit`을(를) 통해 페이지 지정을 설정합니다. `metadata.pagination.total_number_of_records`의
값은 모든 페이지의 총 기록 수를 제공합니다.

v2 API에서는 `next_record_id` 쿼리 파라미터를 통해 페이지 지정을 설정합니다. 다음 페이지의 시작 값은
`metadata.pagination.next_record_id`에 반환됩니다. 응답에는 총 기록 수가 없습니다.

v2 API로 마이그레이션하려면 `next_record_id`을(를) 사용하여 API 가이드 페이지에 설명된 페이지를 통해 진행해야 합니다.

#### 태그 분류

v1 API에서 사용량 데이터는 동일한 응답에서 각 태그에 맞춰 개별적으로 분류됩니다. 이로 인해 동일한 리소스가 `a`, `b` 및 `c`와 같은 여러 태그에 의해 개별적으로 카운트되는 중복 데이터가 생성됩니다.

v2 API에서는 `tag_breakdown_keys` 파라미터에 태그 설정을 제공하여 태그 분류를 선택할 수 있습니다. 한 번에 하나의 태그를 지정하거나 쉼표로 구분된 목록으로 여러 태그를 지정할 수 있습니다. 여러 태그를 제공하면 해당 태그의 조합으로 필터링된 사용량이 반환됩니다.

v2 API로 이전하려면 `tag_breakdown_keys` 파라미터에서 사용할 태그를 지정하세요. v1 API와 동일한 분류를
얻으려면 각 태그에 대해 별도의 요청을 수행하세요.

#### 집계

v1 API의 `aggregates` 섹션에는 가능한 모든 기록의 합계가 포함되며, 3개의 서로 다른 태그에 걸쳐 데이터가 3배로 처리되므로 실제 합계는 3배가 됩니다. 예시는 다음과 같습니다.

```json
{
  "field": "infra_host_usage",
  "value": 293880,
  "agg_type": "sum"
},
```

v2 API의 `aggregates` 섹션에는 사용된 태그 조합에 대한 기록 합계만 포함됩니다. 예시는 다음과 같습니다.

```
{
"field": "infra_host_usage",
"value": 97960,
"agg_type": "sum"
},
```

v2 API로 마이그레이션하려면 집계를 사용하세요. 해당 값은 요청된 달에 발생한 조직의 총 사용량을 나타냅니다.

#### 십진수 값

v1 API에서 일부 사용량은 십진수 정밀도로 반환됩니다. 예는 다음과 같습니다.
`"cws_containers_usage": 1105642.92`

v2 API에서 사용량은 정수 정밀도로 반환됩니다. 예시는 다음과 같스빈다.
`"cws_containers_usage": 1105643`

정수 값에서 십진수 값으로 변환할 수 없습니다. 정수 값은 반올림된 십진수 값에 해당합니다.

#### 제품군

v1 API에서 서버리스 모니터링 사용량은 다음과 같습니다.

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

v2 API에서 서버리스 모니터링 사용량은 다음과 같습니다.

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

이러한 사용량 유형은 기능적으로 동일합니다. 유일한 차이점은 새 필드 이름입니다.

## 파일 기반 API

이 API 세트는 사용량 속성 데이터의 zip 파일을 일일 및 월간 단위로 다운로드할 수 있는 링크를 제공합니다.

### [사용 가능한 일일 커스텀 보고서 목록 가져오기][2]

이 API는 사용 가능한 다운로드 목록을 생성합니다. 파일 다운로드가 더 이상 사용되지 않으므로, 이 API를
대체할 수 없습니다.

### [지정된 일일 커스텀 보고서 가져오기][3]

이 API는 지정된 날짜의 모든 제품에 대한 사용량 속성 데이터의 zip 파일을 다운로드할 수 있는 링크를 반환합니다. zip
파일에는 각 제품에 대한 탭으로 구분된 값(TSV) 파일이 포함되어 있습니다.

[시간별 사용량 속성 가져오기][8] API는
이와 동일한 데이터를 제공합니다.

v1 및 v2 API의 차이점과 v2 API로 마이그레이션하기 위한 권장 사항은 아래 섹션을 참조하세요.

#### 응답 형식

v1 API의 응답에는 제품당 TSV 파일이 포함된 ZIP 파일에 대한 링크가 포함되어 있습니다.

v2 API의 응답은 JSON 형식의 사용 특성 데이터를 반환합니다.

v2 API로 마이그레이션하려면 프로세스에서 JSON 형식의 데이터를 처리해야 합니다. 필요에 따라 JSON 데이터에
변환을 적용하여 가장 적합한 형식을 생성할 수 있습니다.

#### 태그 분류

v1 API에서 사용량 데이터는 선택한 모든 태그로 분류됩니다.

v2 API에서는 `tag_breakdown_keys`의 태그 설정을 쉼표로 구분된 목록으로 제공하여 태그 분류를 선택할 수 있습니다.

v2 API로 마이그레이션하려면 `tag_breakdown_keys` 쿼리 파라미터에서 선택한 모든 태그를 지정합니다.

#### 태그 키

v1 API에서 선택한 태그 키는 TSV 파일의 헤더로 표시됩니다. 예는 다음과 같습니다.

```
public_id       formatted_timestamp     env     service total_usage
abc123          2022-01-01 00:00:00     prod    web     100
...
```

v2 API에서 선택한 태그는 응답의 사용량 배열에 있는 각 항목의 `tags` 오브젝트에 있는 키를 가리킵니다. 예는 다음과 같습니다.

```
...
  "tags": {
    "service": [
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

v2 API로 마이그레이션하려면 각 응답 행의 `tags` 오브젝트에서 검색하세요.

#### 태그 값

v1 API에서 리소스에 동일한 태그가 여러 개 있는 경우 이는 태그 열에 파이프(`|`)로 구분된 문자열
형태로 표시됩니다.

예시:

```
public_id       formatted_timestamp     env     service               total_usage
abc123          2022-01-01 00:00:00     prod    authentication|web    100
...
```

v2 API에서 `tags` 오브젝트의 각 태그 키에 해당하는 값은 배열입니다. 리소스에 동일한 태그가 여러 개 있으면 
이는 해당 목록에 여러 항목이 있음을 나타냅니다.

예시:

```
...
  "tags": {
    "service": [
      "authentication",
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

v2 API로 마이그레이션하려면 프로세스에서 동일한 태그가 여러 개 적용된 리소스를 처리해야 합니다.
v2 응답 배열의 태그 값은 v1 응답의 파이프로 구분된 문자열에 나타나는 것과 동일한 순서로 나타나므로 
파이프 문자로 배열을 결합하여 v1 응답과 동일한 태그 값을 생성할 수 있습니다.

#### 총 사용량

v1 API에서 총 사용량은 CSV 헤더에서 `total_usage`(이)라고 합니다.

v2 API에서 총 사용량은 `total_usage_sum`(이)라고 하며 사용량 배열의 각 오브젝트에 있는 키에 해당합니다.

v2 API로 마이그레이션하려면 `total_usage_sum` 키를 사용하여 사용량 값을 추출합니다.

#### 총 사용량 데이터 유형

v1 API는 데이터 유형을 지정할 방법이 없는 CSV를 사용합니다(총 사용량은 항상 숫자임).

v2 API에서 총 사용량은 정수입니다.

v2 API로 마이그레이션하려면 총 사용량을 정수로 처리하세요.

#### 시간 형식

v1 API에서 시간 형식은 `YYYY-MM-DD hh:mm:ss`입니다.

v2 API에서 시간 형식은 `YYYY-MM-DDThh`입니다.

v1 형식의 데이터는 항상 분과 초 값이 `0`입니다(데이터는 시간 단위임). v2 형식의 데이터는 v1 형식의 파스된 시간과 동일하게 파스 및 처리될 수 있습니다.

#### 하위 조직

v1 API의 파일에는 상위 조직에 설정된 태그 설정에 대한 데이터만 포함됩니다. 태그 설정이 하위 조직에도 적용되기 때문에 여기에는 상위 조직에 속하는 모든 하위 조직이 포함됩니다.

v2 API에서 `include_descendants=true` 파라미터가 제공되면(기본값임), 응답에 상위 조직 및 상위 조직에 속하는 모든 하위에 대한 데이터가 포함됩니다. 여기에는 상위 조직에서 하위 조직으로 전달된 태그 설정의 모든 데이터가 포함되며 해당 하위 조직에 직접 설정된 모든 태그 설정도 포함됩니다. 지정된 태그 설정의 출처는 `tag_config_source` 필드에서 식별할 수 있습니다.

v2 API로 이전하려면 `include_descendants=true` 파라미터를 전달하세요. v1 응답과 
동일한 값을 얻으려면 상위 조직에서 태그 설정의 
`tag_config_source`와(과) 일치하지 않는 
응답의 모든 기록을 필터링하세요.

#### 데이터 범위

v1 API에서는 한 번에 하루 동안의 데이터가 반환됩니다. 날짜는 요청의 `record_id` 파라미터에 
지정됩니다.

v2 API에서 `start_hr` 및 `end_hr` 파라미터를 사용하여 한 번에 최대 24시간까지에 달하는 
임의의 시간 범위에 대한 데이터를 검색할 수 있습니다.

v2 API로 마이그레이션하려면 `start_hr`을(를) 원하는 날짜의 자정(`00`시)으로, `end_hr`을(를) 다음 날 자정으로 하여 데이터를 요청합니다.

#### 페이지 지정

v1 API에서는 데이터에 페이지가 지정되지 않습니다. 이로 인해 매우 큰 파일이 생성될 수 있습니다.

v2 API의 데이터에는 페이지가 지정됩니다. 응답이 두 페이지 이상을 차지하는 경우 
`metadata.pagination.next_record_id` 필드에 다음 페이지를 가져오기 위한 ID가 제공됩니다. 이는 다음 페이지를 검색하기 위해 
쿼리 파라미터 `next_record_id`에 제공될 수 있습니다.

v2 API로 마이그레이션하려면 지정된 날짜의 모든 페이지를 검색하세요.

#### 데이터 카디널리티

v1 API에서 데이터는 세 개의 태그로 분류됩니다.

v2 API에서 데이터는 쿼리 파라미터 `tag_breakdown_keys`에 지정된 대로 분류됩니다.

v2 API로 마이그레이션하려면 `tag_breakdown_keys` 파라미터에서 선택한 모든 태그를 제공하세요.

#### 사용량 유형 이름

v1 API에서 파일 이름은 `daily_<product>_<date>.tsv`입니다.

v2 API의 사용량 유형에는 항상 `_usage` 접미사가 있습니다.

v2 API로 마이그레이션하려면 모든 사용량 유형에 `_usage` 접미사를 제공하세요.

#### 이름이 변경된 사용량 유형

v1 API에는 다음에 대한 파일이 포함되어 있습니다.

* `apm`
* `infra`
* `lambda_invocations`
* `lambda_functions`
* `profiled_containers`
* `npm`
* `profiled_hosts`

v2 API에서의 해당 사용량 유형은 다음과 같습니다.

* `apm_host_usage`
* `infra_host_usage`
* `invocations_usage`
* `functions_usage`
* `profiled_container_usage`
* `npm_host_usage`
* `profiled_host_usage`

v2 API로 마이그레이션하려면 지정된 사용량 유형을 업데이트된 이름에 매핑하세요.

#### 시계열 사용량 유형

v1 API에서 시계열 파일에는 표준 시계열과 커스텀 시계열 모두에 대한 사용량이 포함되어 있습니다.

v2 API에는 하나의 `custom_timeseries_usage` 사용량 유형이 있습니다.

Datadog은 커스텀 시계열 사용량에 대해서만 요금을 청구하므로 표준 시계열 사용량은 필요하지 않습니다.

#### 신서틱 사용량 유형

v1 API에서 신서틱 파일에는 API 및 브라우저 테스트 모두에서의 사용량이 포함됩니다.

v2 API에는 `api_usage` 및 `browser_usage`라는 두 가지 신서틱 사용량 유형이 있습니다.

v2 API로 마이그레이션하려면 신서틱 사용량을 검색하기 위한 새로운 사용량 유형을 사용하세요.

### [사용 가능한 월간 커스텀 보고서 목록 가져오기](https://docs.datadoghq.com/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports)

이 API는 사용 가능한 다운로드 목록을 생성합니다. 파일 다운로드는 더 이상 사용되지 않으므로 이 API를 
대체할 수 없습니다.

### [지정된 월간 커스텀 보고서 가져오기][5]

이 API는 지정된 달의 모든 제품에 대한 사용량 속성 데이터가 담긴 ZIP 파일을 다운로드할 수 있는 링크를 반환합니다. ZIP
파일에는 각 제품에 대한 TSV 파일과 각 태그에 대한 요약 파일이 포함되어 있습니다. 두 가지 유형의 파일을 복제하는 방법은 아래에 설명되어 있습니다.

### 제품 파일별 시간별 데이터

시간별 데이터 파일은 `monthly_<product>_<date>.tsv`라는 명명 형식을 사용합니다. 각 제품 파일은
[지정된 일일 커스텀 보고서 가져오기][3]에서
사용할 수 있는 일일 zip 파일의 연결된 버전입니다
.

[시간별 사용량 속성 가져오기][8] API는
이와 동일한 데이터를 제공합니다.

시간별 데이터 파일은 
[지정된 일일 커스텀 보고서 가져오기][3]에서 
사용할 수 있는 파일과 매우 유사하므로,  시간 범위에 대한 권장 사항을 제외하고는
동일한 가이드가 적용됩니다. v1 월간 파일에서 마이그레이션하려면 해당 월의 매일 모든 페이지를 요청하세요. 요청은 v2 API에서 24시간에 한 번으로 제한됩니다.

### 태그 파일별 월간 요약

월간 요약 파일은 이름 지정 형식 `summary_<tag>_<date>.tsv`을(를) 사용합니다. 각 태그에 대해 한 달 동안에 속하는 
모든 사용량에 대한 롤업을 제공합니다. [월간 사용량 속성 가져오기][7]
 API는 이와 동일한 데이터를 제공합니다.

v1 API와 v2 API의 차이점과 v2 API로 마이그레이션하기 위한 권장 사항은 아래 섹션을 참조하세요.

#### 응답 형식

v1 API 응답에는 선택한 각 태그의 TSV 파일이 포함된 ZIP 파일에 대한 링크가 포함되어 있습니다.

v2 API 응답은 JSON 형식으로 사용량 속성 데이터를 반환합니다.

v2 API로 마이그레이션하려면 프로세스에서 JSON 형식의 데이터를 처리해야 합니다. 필요에 따라 JSON 데이터에
변환을 적용하여 가장 적합한 형식을 생성할 수 있습니다.

#### 태그 분류

v1 API에는 선택한 각 태그에 해당하는 별도의 TSV 파일이 있습니다.

v2 API에서는 `tag_breakdown_keys`에 태그 설정을 쉼표로 구분된 목록으로 제공하여 태그 분류를 선택할 수 있습니다.

v2 API로 마이그레이션하려면 `tag_breakdown_keys`에 개별적으로 지정된 각 태그를 사용하여 요청하세요.

#### 태그 값

v1 API에서 리소스가 동일한 태그로 여러 번 태그되면 태그 열에 
파이프(`|`)로 구분된 문자열의 형태로 나타납니다.

예시:

```
month   public_id       team        infra_host_usage ....
2022-01 abc123          billing|sre 100
...
```

v2 API에서 `tags` 오브젝트의 각 태그 키에 해당하는 값은 배열입니다. 리소스에 동일한 태그가 
여러 번 지정되면 이 목록에 여러 항목이 존재합니다.

예시:

```
...
  "tags": {
    "team": [
      "billing",
      "sre"
    ]
  },
...
```

v2 API로 마이그레이션하려면 프로세스에서 동일한 태그가 여러 개 적용된 리소스를 처리해야 합니다.
v2 응답 배열의 태그 값은 v1 응답의 파이프로 구분된 문자열에 나타나는 것과 동일한 순서로 나타나므로 
파이프 문자로 배열을 결합하여 v1 응답과 동일한 태그 값을 생성할 수 있습니다.

#### 총 사용량

v1 API에서 파일의 두 번째 행에는 모든 태그에 대한 집계 사용량이 포함됩니다.

v2 API에서 응답의 `metadata.aggregates` 섹션에는 모든 태그에 대한 집계 사용량이 포함됩니다.

v2 API로 마이그레이션하려면 `metadata.aggregates` 섹션에서 총 사용량을 검색하세요.

#### 사용량 데이터 유형

v1 API에서 일부 사용법은 십진수 정밀도로 반환됩니다. 예는 다음과 같습니다.

```
container_usage
55.4
```

v2 API에서 사용량은 정수 정밀도로 반환됩니다. 예는 다음과 같습니다.
`"container_usage": 55`

정수 값에서 십진수 값으로 변환할 수 없습니다. 정수 값은 반올림된 십진수 값에 해당합니다.

#### 하위 조직

v1 API에서 파일에는 상위 조직에 설정된 태그 설정의 데이터만 포함됩니다. 태그 설정이 하위 조직에도 
적용되기 때문에 여기에는 상위 조직에 속하는 모든 하위 조직이 포함됩니다.

v2 API에서 `include_descendants=true` 파라미터가 제공되면(기본값임) 응답에 상위 조직 및 상위 조직에 속하는 모든 하위에 대한 데이터가 포함됩니다. 여기에는 상위 조직에서 하위 조직으로 전달된 태그 설정의 
모든 데이터가 포함되며 해당 하위 조직에 직접 설정된 모든 태그 설정도 포함됩니다. 지정된 태그 설정의 출처는 `tag_config_source` 필드에서 식별할 수 있습니다.


#### 서버리스 모니터링 사용

v1 API에서 서버리스 모니터링 사용량은 다음 이름을 사용합니다.

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

v2 API에서 서버리스 모니터링 사용량은 다음 이름을 사용합니다.

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

v2 API로 마이그레이션하려면 업데이트된 필드 이름 아래에서 서버리스 모니터링 사용량을 찾으세요. 이러한 사용량 유형은 기능적으로 동일합니다. 유일한 차이점은 새 필드 이름입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/usage-metering/#get-usage-attribution
[2]: /ko/api/latest/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: /ko/api/latest/usage-metering/#get-specified-daily-custom-reports
[4]: /ko/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports
[5]: /ko/api/latest/usage-metering/#get-specified-monthly-custom-reports
[6]: /ko/api/latest/usage-metering/#get-usage-attribution
[7]: /ko/api/latest/usage-metering/#get-monthly-usage-attribution
[8]: /ko/api/latest/usage-metering/#get-hourly-usage-attribution