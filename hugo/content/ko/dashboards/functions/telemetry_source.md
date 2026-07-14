---
aliases:
- /ko/graphing/functions/telemetry_source/
description: 메트릭 쿼리가 쿼리된 메트릭만 사용하는지 아니면 이에 대응하는 Datadog 및 OpenTelemetry 메트릭을 함께 사용할지를
  제어하세요.
further_reading:
- link: /metrics/open_telemetry/query_metrics
  tag: 설명서
  text: 통합된 Datadog과 OpenTelemetry 메트릭에서 쿼리하기
title: 텔레메트리 소스
---
텔레메트리 소스 쿼리 수정자는 메트릭 쿼리에서 쿼리된 메트릭만 사용할지, 아니면 이에 대응하는 Datadog 및 OpenTelemetry 메트릭을 함께 사용할지를 제어합니다. 통합된 두 소스에서 쿼리하는 방법에 대한 자세한 내용은 [통합된 Datadog과 OpenTelemetry 메트릭에서 쿼리하기][1]를 참조하세요.

쿼리 편집기에서 **Modify**를 선택한 다음 **Telemetry sources** 섹션에서 옵션을 선택하세요.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Combined telemetry가 선택된 화면을 보여주는 텔레메트리 소스 쿼리 수정자." style="width:75%;" >}}

| UI 옵션 | JSON 값 | 동작 |
|---|---|---|
| **네이티브 텔레메트리**(기본값) | `"semantic_mode": "native"` | 쿼리된 메트릭만 반환합니다. 다른 텔레메트리 소스에서 동등한 메트릭이 제공되는 경우에는 이를 포함하지 않습니다. |
| **통합된 텔레메트리** | `"semantic_mode": "combined"` | 동등한 Datadog 및 OpenTelemetry 메트릭을 단일 쿼리 결과로 통합합니다. |

JSON 편집기에서 텔레메트리 소스를 설정하려면 쿼리 객체에 `semantic_mode` 키를 추가하세요.

{{< highlight json "hl_lines=6" >}}
"queries": [
    {
        "name": "query1",
        "data_source": "metrics",
        "query": "sum:go.goroutine.count{*}",
        "semantic_mode": "combined"
    }
]
{{< /highlight >}}

## 기타 함수 {#other-functions}

{{< whatsnext desc="다른 사용 가능한 함수는 다음을 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 이상 또는 이상치 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 산술 연산을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}개수 계산: 0이 아닌 값 또는 null이 아닌 값의 수를 셉니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위 매기기: 메트릭의 부분 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭에 대한 맞춤형 도함수를 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 머신러닝 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 사용되는 원시 데이터 포인트의 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}스무딩: 메트릭 변동을 부드럽게 합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}베타: 메트릭의 롤링 평균을 계산합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/open_telemetry/query_metrics