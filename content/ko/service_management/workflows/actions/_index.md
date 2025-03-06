---
algolia:
  tags:
  - 워크플로우
  - 워크플로우
  - 워크플로우 자동화
aliases:
- /workflows/generic_actions
- /service_management/workflows/actions_catalog/generic_actions/
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: 설명서
  text: 통합에 대해 알아보기
title: 작업
type: 설명서
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 워크플로우 자동화를 지원하지 않습니다.</div>
{{< /site-region >}}

Datadog은 특정 도구 또는 통합과 연결되지 않은 워크플로우 작업의 스위트(suite)를 제공합니다. 다음과 같은 작업을 수행하여 워크플로우를 더 효율적으로 제어할 수 있습니다.
- 워크플로우의 실행 경로를 제어하는 로직을 추가합니다.
- 작업으로 수집한 데이터를 변환합니다.
- 커스텀 HTTP 요청을 수행합니다.

{{< whatsnext desc="일반 작업에 대해 자세히 알아보기:" >}}
    {{< nextlink href="/service_management/workflows/actions/flow_control" >}}로직 작업을 추가하여 중지 간격, 조건 브랜치, 이터레이션(iteration) 사용 등을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/expressions" >}}자바스크립트(Javascript)를 사용하여 워크플로우 내에서 커스텀 데이터 변환을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/http" >}}HTTP 작업을 사용하여 커스텀 엔드포인트에 요청합니다.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/saved_actions" >}}<i>저장한 작업</i>기능으로 작업과 파라미터를 저장 및 재사용합니다.{{< /nextlink >}}
{{< /whatsnext >}}

고객님의 사용 케이스에 통합이나 Datadog의 일반 작업이 적용되지 않는 경우 [신규 작업 또는 전체 통합을 요청][1]할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][2]의 **#workflows** 채널에 참여하세요.

[1]: https://forms.gle/JzPazvxXox7fvA2R8
[2]: https://datadoghq.slack.com/