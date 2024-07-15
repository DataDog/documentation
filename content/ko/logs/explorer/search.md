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
  text: 로그 탐색기에서 보기 내보내기
kind: 설명서
title: 로그 검색
---

## 개요

개별 로그를 목록화해서 정보를 보는 것도 좋지만 로그를 집계했을 때 유용한 정보가 나타나는 경우도 있습니다. 이와 같이 정보를 보려면 [Log Explorer][5]에서 로그를 검색하고 시계열, 상위 목록, 트리맵 차트, 파이 차트, 또는 테이블로 표시하세요.

Log Explorer의 검색 기능은 시간 범위, 검색 쿼리, `key:value` 및 전체 텍스트 검색을 혼합하여 사용합니다.

## 쿼리 검색

예를 들어 지난 30분 간 웹 스토어 서비스에서 오류 상태가 된 로그를 필터링하려면 `service:payment status:error rejected`와 같은 커스텀 쿼리를 만들고 시간 범위를 `Past 15 minutes`로 설정하세요.

{{< img src="logs/explorer/search_filter.png" alt="Log Explorer에서 웹 스토어 서비스 내 결제 거부 오류 로그를 필터링하는 검색 쿼리 쿼리 생성" style="width:100%;" >}}

[인덱싱된 로그][1]는 전체 컨텍스트 검색과 `key:value` 검색 쿼리를 모두 지원합니다.

**참고**: `key:value` 쿼리를 사용하기 전에 [패싯을 선언][2]할 필요가 **없습니다**.

## 자동 완성

검색 창의 자동 완성 기능을 통해 다음을 사용하여 쿼리를 완성할 수 있습니다. 
- 로그의 기존 키와 값
- 나의 최근 검색(다른 사용자의 최근 검색은 표시되지 않음)
- 저장된 페이지

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="쿼리가 service이고 emailer, balancer-checker, ad-server, vpc가 자동 완성 옵션으로 표시된 로그 검색 창" style="width:80%;">}}

### 패싯 및 값 자동 완성

검색 창은 검색 창 입력 내역을 기반으로 패싯을 자동 제안합니다. 이 패싯은 [패싯 패널][5] 위치와 같은 순서로 표시됩니다. 패싯에 정의된 표시 이름이 있을 경우 드롭다운 메뉴 우측에 표시됩니다. 패싯 패널에 표시되도록 구성하지 않은 패싯은 검색 창에 자동 제안되지 않습니다.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="`network`가 쿼리이고 @network.bytes_written, @network.client.ip, @network.interface가 자동 완성 옵션 패싯으로 표시된 로그 검색 창" style="width:80%;">}}

패싯을 선택하고 `:` 문자를 입력하면 검색 창이 자동으로 값을 제안합니다. 이 값은 지난 15분간 `facet:value` 쌍을 포함하는 로그 수에 따라 내림차순으로 표시됩니다. 해당 값을 포함하는 예상 로그 수가 드롭다운 메뉴 우측에 표시됩니다. 예를 들어 `balance-checker` 서비스의 값이 `2.66M`이므로 `service` 패싯 값의 자동 제안 목록의 첫 번째에 위치하고 있으며 로그 개수가 가장 많다는 것을 알 수 있습니다.

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="쿼리가 `service:`이고 values balance-checker, ad-server, fraud-detector, trade-executor가 자동 완성 옵션으로 표시된 로그 검색 창" style="width:80%;">}}

### 최근 검색 자동 완성 기능

Log Explorer에는 가장 최근에 검색한 기록 100개가 남습니다. 다른 사용자의 최근 검색 기록은 저장되지 않고 나타나지 않습니다. 검색 창은 입력 기록과 일치하는 최근 기록 네 개를 자동 제안하며 가장 최근 검색 기록이 맨 처음에 표시됩니다. 또 최근 검색한 각 항목을 언제 검색했는지도 표시됩니다. 예를 들어 검색 창에 `service:web-store status:error`를 입력하면 이 용어를 포함한 최근 검색 항목 네 개가 시간 순서에 따라 표시되며, 각 항목과 연결된 오류도 표시됩니다.

{{< img src="logs/explorer/search/log_recent_searches.png" alt="쿼리가 `service:web-store status:error`이고 다른 웹 스토어 서비스 오류가 자동 완성 옵션으로 표시된 로그 검색 창" style="width:80%;">}}

### 저장된 보기 자동 완성

Log Explorer에서 저장된 보기를 생성해 향후에 사용할 수 있도록 쿼리와 추가 컨텍스트를 저장하여 중앙에서 액세스를 할 수 있습니다. 검색 창에서 이전에 검색한 내역과 일치하는 저장된 보기를 자동 제안합니다. 이때 저장된 보기 패널에 있는 위치와 동일한 순서로 표시되고 즐겨 찾기 표시한 보기가 맨 먼저 표시됩니다. 드롭다운 메뉴에는 저장된 보기 이름, 저장된 쿼리, 가장 최근에 업데이트한 사용자 프로필 사진이 표시됩니다. 저장된 보기 쿼리가 드롭다운에 표시하기에 너무 길 경우, 마우스 커서를 도구 설명에 올리면 전체 쿼리가 나타납니다. 저장된 보기를 가장 최근에 업데이트한 사용자 이메일과 프로필 사진도 마우스 커서를 올렸을 때 함께 표시됩니다.

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="쿼리가 `service:web-store status:error`이고 웹 스토어 서비스 오류 여러 개가 자동 완성 옵션으로 표시된 로그 검색 창" style="width:80%;">}}

## 검색 구문

구문을 강조 표시하여 키(예: `@merchant_name` 속성), 값(예: 특정 판매자 이름), 일반 텍스트(예: `responded 500` 등 로그 메시지의 키워드), 제어 문자(예: 괄호와 콜론)를 구분할 수 있습니다. 상태 속성도 색으로 강조 표시되어 상태를 나타냅니다(예: `error`는 빨강, `info`는 파랑).

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="`service:auth-dotnet status:error 500 (check-token OR create-user)`이고 구문을 구분하기 위해 강조 표시된 로그 검색 창" style="width:100%;">}}

정확한 오류 상태를 통해 구문의 어떤 부분에 구문 오류가 포함되어 있으며 어떻게 해결할 수 있는지 알 수 있습니다. 다음 예를 참고하세요.
- 값을 넣지 않은 상태에서 `service:` 쿼리를 입력하면 쿼리에 마우스 커서를 올릴 때 메시지 "Missing value in key:value pair"가 나타납니다.
- 범위 쿼리에 괄호를 입력했는데 높은 값과 낮은 값을 넣지 않으면 메시지 "Expected term but end of input found"가 나타납니다. 
- 로그 필드에 여러 값을 입력했는데 괄호 문자를 누락하면(예: `service:(web-store OR auth-dotnet`) 메시지 `Missing closing parenthesis character`가 나타납니다.

{{< img src="logs/explorer/search/log_error_states.png" alt="쿼리가 `service:(web-store OR auth-dotnet`이고 메시지 `Missing closing parenthesis character`가 표시된 로그 검색 창" style="width:50%;">}}

Log Explorer에서 로그를 검색하고 시간 프레임을 사용자 조정하려면 [구문 검색 설명서][3]와 [커스텀 시간 프레임 설명서][4]를 참고하세요.

## 검색 창에서 스타일과 자동 완료 기능 비활성화하기

검색 창 옆에 있는 버튼을 클릭해 원시 모드에서 검색하세요. 그러면 구문 강조 표시, 둥근 모서리 모양 스타일링, 자동 완성 기능이 모두 제거됩니다.

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="쿼리가 `service:auth-dotnet status:error 500 (check-token OR create-user)`이고 원시 모드인 로그 검색 창" style="width:100%;">}}

마우스나 키보드 명령으로 검색 창을 탐색할 수 있습니다. 예를 들어 `CMD-A`를 사용해 텍스트를 선택하고, `CMD-C`를 사용해 텍스트를 복사하고, `CMD-X`를 사용해 텍스트를 잘라내고, `CMD-V`를 사용해 텍스트를 붙여 넣을 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/indexes
[2]: /ko/logs/explorer/facets/
[3]: /ko/logs/search-syntax
[4]: /ko/dashboards/guide/custom_time_frames
[5]: /ko/logs/explorer/