---
aliases:
- /ko/developers/faq/using-postman-with-datadog-apis
- /ko/getting_started/using-postman-with-datadog-apis
- /ko/developers/guide/using-postman-with-datadog-apis
title: Datadog API와 Postman의 사용
---

## 개요

Datadog API를 사용하면 Datadog와 데이터를 주고받을 수 있습니다. Datadog API는 리소스 지향 URL과 상태 코드를 사용하여 요청의 성공/실패 여부를 표시하고 모든 요청에서 JSON을 반환합니다.

이번 가이드에서는 Postman을 사용하여 Datadog에 API 호출을 수행하는 방법을 설명합니다. Datadog API 내에서 사용 가능한 액션을 보여드리는 한편, Postman을 사용하여 `GET`, `POST`, `PUT`, `DELETE`를 수행하는 방법을 간략하게 안내하겠습니다.

## 전제 조건

먼저 갖추어야 할 요소는 다음과 같습니다.

- 활성화된 Datadog 통합.
- Datadog [API 및 애플리케이션 키][2]의 액세스 권한.
- API 구조와 JSON 포맷팅과 관련된 기초 지식.
- [무료 Postman 계정][3].

## 구성

### Postman에서 Datadog 컬렉션 가져오기

먼저 [Postman에 로그인][4]해주세요. Datadog에서는 [Postman 애플리케이션을 다운로드][5]하시길 권장합니다.

</br>
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="20651290-809b13c1-4ada-46c1-af65-ab276c434068"
data-postman-collection-url="entityId=20651290-809b13c1-4ada-46c1-af65-ab276c434068&entityType=collection&workspaceId=bf049f54-c695-4e91-b879-0cad1854bafa"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

</br>이 컬렉션은 웹용 Postman 또는 Postman 애플리케이션에서 작동합니다. 불러오는 데 몇 초 정도 소요될 수 있습니다.

**참고**: API 및 애플리케이션 키 값을 사용하여 Datadog API 컬렉션의 **컬렉션 변수**를 설정합니다.

### Postman 환경 설정

Postman 컬렉션을 불러왔다면 사용 가능한 Datadog API 호출의 전체 목록이 Postman 왼쪽 화면에 폴더별로 구성됩니다.

#### Go

인증을 위해 Datadog API 및 애플리케이션 키를 [컬렉션 변수][6]에 추가합니다.

다음 절차를 따라 환경 설정을 완료해주세요.

1. Datadog API Collection을 선택합니다.

2. **Variables** 탭을 클릭합니다.

3. 유효한 Datadog API 및 애플리케이션 키 값을 각각 `api_key` 및 `application_key` 변수의 **Current value** 필드에 추가합니다.

4. **저장**을 클릭합니다.

{{< img src="getting_started/postman/collection_variables.png" alt="api_key 및 application_key 컬렉션 변수가 설정된 Datadog API Collection" style="width:100%;">}}

#### API 엔드포인트 변경하기

Datadog 사이트를 `https://api.datadoghq.com`이 아닌 다른 주소로 액세스 중이라면 Postman 컬렉션이 다른 엔드포인트 URL에 액세스하도록 변경해야 합니다.

다음 절차를 따라 원하는 사이트({{< region-param key="dd_site_name" >}})로 인스턴스를 업데이트하세요.

1. 왼쪽 화면의 Datadog API 컬렉션 폴더에서 점 세 개로 표시된 메뉴를 클릭하고 **Edit**을 선택합니다.

    {{< img src="getting_started/postman/view-more-actions.png" alt="액션 더 보기">}}

2. **Variables** 탭에서 `datadoghq.com` 값을 가진 `site` 변수 선택을 해제하고 {{< region-param key="dd_site" code="true" >}} 값을 가진 `site`를 선택합니다.

3. **Update**를 클릭합니다.

## 컬렉션 사용하기

설정이 완료되면 언제든지 API를 호출할 수 있습니다. Postman -> Datadog 폴더에는 [Datadog API 레퍼런스][7]에 나열된 API 카테고리 유형별로 하위 폴더가 있습니다. 하위 폴더를 확장하면 HTTP 메소드와 API 호출명을 확인할 수 있습니다.

### 빌더

컬렉션 내의 API 호출을 클릭하면 오른쪽 `Builder` 화면으로 로딩됩니다. 이 화면에서 API 호출을 전송하고 반환 상태, 응답 시간, API 응답 코드를 확인할 수 있습니다.

{{< img src="getting_started/postman/apiGetCalls.png" alt="postman_api_반응" style="width:70%;">}}

### 설명

엔드포인트 이름을 클릭하면 엔드포인트 설명과 필수/선택 파라미터가 전부 표시되어 요청을 구성하도록 도와줍니다.

{{< img src="getting_started/postman/description.mp4" alt="Postman 설명" video="true" >}}

### Params

**Params** 탭에는 API 호출에 존재하는 모든 파라미터와 값이 표시됩니다. 여기서 파라미터와 값을 추가할 수도 있습니다. 사용 가능한 인수는 [Datadog API 문서][8]의 해당 섹션에서 확인하시기 바랍니다.

{{< img src="getting_started/postman/parameters.png" alt="postman_param" style="width:70%;">}}

이 탭은 API 호출의 `param1:value1&param2:value2` 구조를 표시하는 대신 사용할 수도 있습니다.

**참고**:

- params 테이블에 앰퍼샌드(&)와 콜론(:)을 넣을 필요가 없습니다. Postman에서 기호를 삽입해줍니다.
- 모든 플레이스홀더는 `<PLACEHOLDER>` 형식을 따릅니다. 플레이스홀더는 쿼리를 실행하기 전에 교체해야 합니다.

[1]: https://www.postman.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://identity.getpostman.com/signup
[4]: https://identity.getpostman.com/login
[5]: https://www.postman.com/downloads/
[6]: https://learning.postman.com/docs/sending-requests/variables/variables/#defining-collection-variables
[7]: /ko/api/latest/#api-reference
[8]: /ko/api/