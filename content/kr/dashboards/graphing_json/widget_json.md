---
aliases:
- /kr/graphing/graphing_json/widget_json/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/graphing_json/request_json/
  tag: 설명서
  text: JSON 스키마 요청
kind: 설명서
title: 위젯 JSON 스키마
---

GUI 편집기에 대한 자세한 내용은 [graphing editor][1] 문서를 참조하세요.

## Y축 스키마

Datadog Y축 관리 기능을 사용하면 다음과 같이 할 수 있습니다.

*   Y축을 특정 범위로 자르기
*   백분율 또는 절대값을 지정하여 시리즈를 필터링
*   Y축 스케일을 선형에서 로그,  제곱근 또는 파워 스케일로 변경

해당 스키마는 다음과 같습니다.

```text
AXIS_SCHEMA = {
    "type": "object",
    "properties": {
        "scale":        {"type": "string"},
        "min":          {"type": "string"},
        "max":          {"type": "string"},
        "include_zero": {"type": "boolean"}
    },
    "additionalProperties": false
}
```

| 파라미터      | 유형    | 설명                                                                                           | 기본  |
|----------------|---------|-------------------------------------------------------------------------------------------------------|----------|
| `scale`        | 스트링  | 특정 스케일 유형. 가능한 값은 `linear`, `log`, `sqrt`, `pow##`(예: `pow2`, `pow0.5`) 등이 있습니다.  | `linear` |
| `min`          | 스트링  | Y축에 표시할 최소값을 지정합니다. 숫자가 필요하거나 기본 동작의 경우 `auto`이(가) 필요합니다.     | `auto`   |
| `max`          | 스트링  | Y축에 표시할 최대값을 지정합니다. 숫자가 필요하거나 기본 동작의 경우 `auto`이(가) 필요합니다. | `auto`   |
| `include_zero` | 불 |                                                                                                       |          |

## 이벤트 스키마

Datadog의 모든 이벤트를 오버레이할 수 있습니다. 일반적인 `events` 형식은 다음과 같습니다.

```text
EVENTS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "q": {"type": "string"},
        },
        "required": ["q"],
        "additionalProperties": false
    }
}
```

쿼리 구문에 대한 자세한 내용은 [이벤트 탐색기 가이드][2]를 참조하세요.

### 예시

예를 들어, 호스트 X 및 태그 Y의 이벤트를 필요로 한다는 것을 나타내려면 다음과 같이 하세요.

```text
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

또는 모든 오류를 표시하고 싶을 때에는 다음과 같이 합니다.

```text
"events": [
  {
    "q": "status:error"
  }
]
```

## 마커 스키마

마커를 사용하면 그래프에 시각적 조건부 형식을 추가할 수 있습니다. `markers` 형식은 다음과 같습니다.

```text
MARKERS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "value":        {"type": "string"},
            "display_type": {"type": "string"},
            "label":        {"type": "string"}
        },
        "required": ["value"],
        "additionalProperties": false
    }
}
```

| 파라미터      | 유형   | 설명                                                                                                           |
|----------------|--------|-----------------------------------------------------------------------------------------------------------------------|
| `value`        | 스트링 | 적용할 값에 해당합니다. 이는 단일 값 `y = 15` 또는 `0 < y < 10` 값 범위일 수 있습니다.                                      |
| `display_type` | 스트링 |  <br>- 중요도(`error`, `warning`, `ok` 또는 `info`) <br> - 선 유형( `dashed`, `solid` 또는 `bold`)의 조합입니다. |
| `label`        | 스트링 | 마커 위에 표시할 라벨입니다.                                                                                     |

### 예시:

다음의 마커에 대해서는 아래 내용을 참조하세요.

{{< img src="dashboards/graphing_json/markers.png" alt="마커" style="width:80%;">}}

위 마커는 다음의 설정과 함께 적용됩니다.

```text
{ (...)
  "widgets": [
    {
      "definition": {
        "markers": [
          {
            "display_type": "ok dashed",
            "label": "OK",
            "value": "0 < y < 50"
          },
          {
            "display_type": "error dashed",
            "label": "ALERT",
            "value": "y > 80"
          },
          {
            "display_type": "warning dashed",
            "label": "WARNING",
            "value": "50 < y < 80"
          }
        ],
        "requests": [(...)],
        "title": "CPU with markers",
        "type": "timeseries"
      },
(...)
},
```

## 조건부 형식 스키마

조건부 형식을 사용하면 데이터에 적용된 규칙에 따라 위젯 콘텐츠 또는 배경의 색상을 설정할 수 있습니다.

```text
CONDITIONAL_FORMATS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "comparator":      {"enum": [">", ">=", "<", "<="]},
            "value":           {"type": "number"},
            "palette":         {"enum": ["blue","custom_bg","custom_image","custom_text","gray_on_white","green","green_on_white","grey","orange","red","red_on_white","white_on_gray","white_on_green","white_on_red","white_on_yellow","yellow_on_white",
            ]},
            "custom_bg_color": {"type": "string"},
            "custom_fg_color": {"type": "string"},
            "image_url":       {"type": "string", "format": "uri"},
        },
        "required": ["comparator", "value", "palette"],
        "additionalProperties": false
    }
}
```

| 파라미터         | 유형   | 설명                                                                                                                                                                                                                                                             |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `comparator`      | enum   | `>`, `>=`, `<` 또는 `<=` 등에 적용할 비교기                                                                                                                                                                                                                       |
| `value`           | double | 비교기를 위한 값입니다.                                                                                                                                                                                                                                               |
| `palette`         | 스트링 | 적용할 색상 팔레트입니다. `blue`, `custom_bg`, `custom_image`, `custom_text`, `gray_on_white`, `green`, `green_on_white`, `grey`, `orange`, `red`, `red_on_white`, `white_on_gray`, `white_on_green`, `white_on_red`, `white_on_yellow`, 또는 `yellow_on_white` 중에서 선택합니다. |
| `custom_bg_color` | 스트링 | 배경에 적용할 색상 팔레트로서, 팔레트와 동일한 값을 사용할 수 있습니다.                                                                                                                                                                                             |
| `custom_fg_color` | 스트링 | 전경에 적용할 색상 팔레트로서, 팔레트와 동일한 값을 사용할 수 있습니다.                                                                                                                                                                                             |
| `image_url`       | 스트링 | 이미지를 배경으로 표시합니다.                                                                                                                                                                                                                                    |
## 시간 스키마

사용 가능한 시간 프레임은 사용 중인 위젯에 따라 다르지만, `time`의 일반적인 형식은 다음과 같습니다.

```text
TIME_SCHEMA = {
    "type": "object",
    "properties": {
        "live_span": {"enum": [
            '1m',
            '5m',
            '10m',
            '15m',
            '30m',
            '1h',
            '4h',
            '1d',
            '2d',
            '1w',
            '1mo',
            '3mo',
            '6mo',
            '1y',
            'alert'
        ]}
    },
    "additionalProperties": false
}
```

| 파라미터   | 유형   | 설명                                                                                                                                                                                                                                                                                                                                                                                                    |
|-------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `live_span` | 스트링 | 시간 프레임 값을 나타내는 약칭입니다. 사용 가능한 값은 <br> -`1m`: 1 분, <br> -`5m`: 5분, <br> -`10m`: 10분, <br> -`15m`: 15분, <br> -`30m`: 30분,<br> -`1h`: 1시간, <br> -`4h`: 4시간,<br> -`1d`: 1일, <br> -`2d`: 2일, <br> -`1w`: 1주, <br> -`1mo`: 1개월, <br> -`3mo`: 3개월, <br> -`6mo`: 6개월, <br> -`1y`: 1년, <br> -`alert` 등입니다. 이들은 `alert_graph` 위젯에서만 사용됩니다. |

### 예시

예를 들어, 10분의 시간 프레임을 필요로 한다는 것을 나타내려면 다음을 사용하세요.

```text
"time": {
  "live_span": "10m"
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/querying/#graphing-editor
[2]: /kr/events/