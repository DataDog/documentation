---
aliases:
- /kr/graphingjson/
- /kr/graphing/miscellaneous/graphingjson
- /kr/graphing/graphing_json/
further_reading:
- link: /dashboards/widgets/
  tag: 설명서
  text: 위젯
- link: /dashboards/graphing_json/request_json/
  tag: 설명서
  text: 요청 JSON 스키마
kind: 설명서
title: JSON으로 그래프화하기
---

[대시보드 API][2]를 통해 [Datadog 타임보드][1]를 쿼리하면 그 결과는 다음 레이아웃의 JSON 오브젝트와 같습니다.

```text
DASHBOARD_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "layout_type": {"enum": ["ordered", "free"]},
        "is_read_only": {"type": "boolean"},
        "template_variables": {"type": "array", "items": TEMPLATE_VARIABLE_SCHEMA},
        "notify_list": {"type": "array", "items": {"type": "string"}},
        "widgets": {
            "type": "array",
            "items": WIDGET_SCHEMA
        }
    },
    "required": ["title", "layout_type", "widgets"],
}
```

| 파라미터            | 유형             | 설명                                                                                                                               |
|----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `title`              | 스트링           | 대시보드 타이틀.                                                                                                                  |
| `description`        | 스트링           | Description of the dashboard.                                                                                                             |
| `layout_type`        | enum             | 대시보드의 레이아웃 유형. 사용 가능한 값은 `ordered` 또는 `free`입니다.               |
| `is_read_only`       | 불          | 이 대시보드의 읽기 전용 여부. `true`인 경우 대시보드 작성자 및 액세스 관리 권한이 있는 사용자(`user_access_manage`)만 수정할 수 있습니다.                     |
| `template_variables` | 오브젝트 배열  | 이 대시보드의 템플릿 변수 목록. 자세한 내용은 [템플릿 변수 스키마 지침](#template-variable-schema)을 참조하세요. |
| `notify_list`        | 스트링 배열 | 이 대시보드가 변경될 때 알림을 받을 사용자 핸들 목록.                                                               |
| `widgets`            | 오브젝트 배열  | 대시보드에 표시할 위젯 목록. `WIDGET_SCHEMA`을(를) 빌드하려면 전용 [위젯 JSON 스키마 지침][3]을 참조하세요.        |

## 템플릿 변수 스키마

대시보드 템플릿 변수는 대시보드에 있는 하나 이상의 그래프에 새 범위를 적용합니다. 이를 통해 특정 태그 대신 변수를 사용하여 상이한 태그 집합에서 메트릭을 동적으로 탐색할 수 있습니다. 대시보드 API를 통해 설정하려면 다음 레이아웃을 사용하세요.

```text
TEMPLATE_VARIABLE_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "default": {"type": "string"},
        "prefix": {"type": "string"},
    },
    "additionalProperties": false,
    "required": ["name"]
}
```

| 파라미터 | 유형   | 설명                               |
|-----------|--------|-------------------------------------------|
| `name`    | 스트링 | 템플릿 변수의 이름.           |
| `default` | 스트링 | 템플릿 변수의 기본값. |
| `prefix`  | 스트링 | 템플릿 변수의 태그 키.       |

[Datadog UI의 템플릿 변수에 대해 자세히 알아보세요][4].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/#timeboards
[2]: /kr/api/v1/dashboards/
[3]: /kr/dashboards/graphing_json/widget_json/
[4]: /kr/dashboards/template_variables/