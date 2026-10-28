---
aliases:
- /ko/logs/search
description: 로그를 필터링해 찾고자 하는 로그의 하위 세트로 범위를 좁히거나, 넓히거나, 전환할 수 있습니다.
further_reading:
- link: logs/explorer/analytics
  tag: 설명서
  text: 로그를 그룹화하는 방법 알아보기
- link: logs/explorer/visualize
  tag: 설명서
  text: 로그에서 시각화 생성
- link: /logs/explorer/export
  tag: 설명서
  text: Log Explorer에서 보기 내보내기
title: 로그 검색
---
## 개요 {#overview}

[Log Explorer][1]를 사용하면 개별 로그를 검색하고 목록으로 조회할 수 있습니다. 하지만 가장 가치 있는 인사이트는 대규모로 로그를 집계할 때 얻을 수 있는 경우가 많습니다. 검색 기능을 사용하면 로그를 필터링하고 시계열 차트, 상위 목록, 트리 맵, 파이 차트 또는 표로 시각화하여 로그 데이터 전반의 트렌드, 패턴 및 이상치를 더 잘 이해할 수 있습니다.

## 자연어 쿼리 {#natural-language-queries}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
자연어 쿼리는 <a href="/getting_started/site">Datadog 사이트</a>에서 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}
자연어 쿼리(NLQ)를 사용하여 찾고 있는 내용을 쉬운 영어로 설명하세요. Datadog은 사용자의 요청을 구조화된 로그 쿼리로 자동 변환하므로 복잡한 구문을 작성할 필요 없이 더 쉽게 로그를 탐색할 수 있습니다. 이 기능에 액세스하려면 검색 필드에서 {{< ui >}}Ask{{< /ui >}}를 클릭하세요.

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="쉬운 영어 문구를 사용하여 로그를 검색하는 방법을 보여주는 Log Explorer의 자연어 쿼리" video=true >}}

시스템은 자연어 입력을 Datadog 쿼리로 변환하며 서비스, 특성, 태그, 시간 범위와 같은 컨텍스트를 이해합니다. 또한 관련 필드를 자동으로 탐지하고 사용자가 간단한 설명(예: 'Top 20 services by errors' 또는 'Show errors from service X in the past 24 hours')을 사용하여 시각화를 생성할 수 있도록 합니다.

NLQ를 비활성화하려면 [`org_management` 권한][2]이 있어야 합니다. [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}}][3]로 이동하고 자연어 쿼리 기능을 끄세요.

## 검색 쿼리 {#search-query}

Log Explorer 검색은 시간 범위와 검색 쿼리로 구성되며, `key:value` 및 [전체 텍스트 검색][4]을 결합합니다. Log Explorer 오른쪽 상단에 있는 시간 범위 선택기를 사용하여 검색할 기간을 선택할 수 있습니다. 사용자 지정 시간 범위 설정에 대한 자세한 내용은 [사용자 지정 시간 프레임 설명서][5]를 참조하세요.

지난 15분 동안 웹 스토어 서비스에서 생성된 로그(오류 상태 포함)를 필터링하려면 `service:payment status:error rejected`와 같은 사용자 지정 쿼리를 생성하고 시간 범위를 `Past 15 minutes`로 설정하세요.

{{< img src="logs/explorer/search_filter.png" alt="Log Explorer에서 웹 스토어 서비스의 거부된 결제에 대한 오류 로그를 필터링하는 검색 쿼리 생성" style="width:100%;" >}}

[인덱싱된 로그][6]는 [전체 텍스트 검색][4]과 `key:value` 검색 쿼리를 모두 지원합니다.

**참고**: `key:value` 쿼리를 사용하기 전에 [패싯을 선언][7]할 필요가 **없습니다**.

전체 쿼리 구문 참조는 [검색 구문 설명서][8]를 참조하세요.

## 검색 창 기능 {#search-bar-features}

Log Explorer 검색 창에는 쿼리를 더 효율적이고 정확하게 작성할 수 있도록 돕는 여러 기능이 포함되어 있습니다.

### 구문 강조 표시 및 오류 검증 {#syntax-highlighting-and-error-validation}

구문 강조 표시는 입력 유형(키, 값, 자유 텍스트, 제어 문자)을 명확하게 구분합니다. 예를 들어, `service` 및 `status`는 키이고, `auth-dotnet` 및 `error`는 값이며, `500` 및 `check-token`은 자유 텍스트이고, 괄호는 제어 문자입니다. 상태 특성은 상태별로 색상이 지정됩니다(빨간색은 `error`, 파란색은 `info`).

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="구분 가능한 구문 강조 표시와 함께 'service:auth-dotnet status:error 500 (check-token OR create-user)'를 쿼리로 보여주는 Log Explorer 검색 창" style="width:100%;">}}

오류 검증은 구문 오류를 식별하고 `key:value` 쌍의 누락된 값, 불완전한 범위 쿼리 또는 닫히지 않은 괄호와 같은 수정 사항을 제안합니다.

{{< img src="logs/explorer/search/log_error_states.png" alt="'Missing closing parenthesis character' 메시지와 함께 'service:(web-store OR auth-dotnet'을 쿼리로 보여주는 Log Explorer 검색 창" style="width:50%;">}}

### 자동 완성 {#autocomplete}

검색 창의 자동 완성 기능은 로그에 있는 기존 키와 값, 최근 검색어, 저장된 보기를 사용하여 쿼리를 완성하도록 도와줍니다.

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="'service:'를 쿼리로, emailer, balancer-checker, ad-server, vpc를 자동 완성 옵션으로 보여주는 Log Explorer 검색 창" style="width:80%;">}}

자동 완성은 입력 내용을 기반으로 패싯과 값을 제안하며, [패싯 패널][7]에 나타나는 순서대로 표시됩니다. 패싯을 선택하고 `:`을 입력하면 지난 15분 동안의 로그 수에 따라 내림차순으로 값이 나타납니다.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="'network'를 쿼리로, 패싯 @network.bytes_written, @network.client.ip, @network.interface를 자동 완성 옵션으로 보여주는 Log Explorer 검색 창" style="width:80%;">}}

최근 검색어 100개가 유지되며 입력 시 제안됩니다. 쿼리와 일치하는 저장된 보기도 제안되며, Saved Views 패널과 동일한 순서로 표시됩니다.

{{< img src="logs/explorer/search/log_recent_searches.png" alt="'service:web-store status:error'를 쿼리로, 다양한 웹 스토어 서비스 오류에 대한 최근 검색어를 자동 완성 옵션으로 보여주는 로그 검색 창" style="width:80%;">}}


## 검색 창에서 스타일링 및 자동 완성 비활성화 {#disable-styling-and-autocomplete-for-search-bar}

검색 창 오른쪽에 있는 버튼을 클릭해 원시 모드에서 검색하세요. 그러면 구문 강조 표시, 둥근 모서리 모양 스타일링, 자동 완성 기능이 모두 제거됩니다.

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="원시 검색 모드에서 'service:auth-dotnet status:error 500 (check-token OR create-user)'를 쿼리로 보여주는 로그 검색 창" style="width:100%;">}}

검색 창은 마우스와 키보드 명령으로 상호작용할 수 있습니다. 예를 들어, 텍스트를 선택하려면 `CMD-A`를, 텍스트를 복사하려면 `CMD-C`를, 텍스트를 잘라내려면 `CMD-X`를, 텍스트를 붙여넣으려면 `CMD-V`를 사용하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/
[2]: /ko/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/preferences
[4]: /ko/logs/explorer/search_syntax/#full-text-search
[5]: /ko/dashboards/guide/custom_time_frames
[6]: /ko/logs/indexes
[7]: /ko/logs/explorer/facets/
[8]: /ko/logs/search-syntax