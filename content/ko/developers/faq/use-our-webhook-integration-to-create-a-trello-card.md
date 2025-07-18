---
kind: faq
title: Trello 카드를 생성할 때 웹후크 통합 사용
---

[@-알림 기능][2]으로 Trello 카드를 바로 생성하는 [웹후크 통합][1]을 사용할 수 있습니다.

이 플로우에서는 Trello REST POST 카드 API 엔드포인트를 이용해 관련 Trello 목록에 @알림을 게시합니다.

## 개요

* Trello 앱 키와 토큰을 찾습니다.

* 보드에서 카드를 제출할 목록을 찾습니다.

* 웹후크를 설정합니다.

## Trello 앱 키와 토큰 가져오기

Trello에 로그인해 [Trello 앱 키와 토큰][3]을 가져옵니다.

**참고**: Trello API 키는 URL에 언급되어 있습니다. 이 문서에서는 API와 앱 키가 한 개이며 동일합니다.

{{< img src="developers/faq/developer_api_key.png" alt="developer_api_key" >}}

토큰을 가져오려면 상단에 있는 토큰 링크 (초록색 화살표)를 클릭하고, 로그인한 Trello 계정으로 토큰에 권한을 부여한 후, 다음 링크로 토큰을 가져옵니다:
{{< img src="developers/faq/trello_api_key.png" alt="trello_api_key" >}}

## Trello 목록 지정

목록에서 카드를 추가하고 싶은 카드를 클릭합니다. URL에 `.json`을 추가하고 해당 URL로 이동합니다. 
{{< img src="developers/faq/card_url.png" alt="card_url" >}}

이동한 페이지에서 `idList` 값을 찾습니다:
{{< img src="developers/faq/id_list.png" alt="id_list" >}}

## 웹후크 설정

[Trello 카드용 API 설명서][4] 및 Datadog [웹후크 통합][1]을 참고하세요.

이 설정에서:

* "name"은 이 후크를 참조하는 별칭입니다 (@webhook-NAME)

* "URL"은 `https://api.trello.com/1/cards`입니다.

커스텀 페이로드를 활성화하고 다음과 같은 JSON 개체를 작성합니다:

```json
{
  "name": "$USER : $EVENT_TITLE",
  "desc": "$EVENT_MSG",
  "key": "{APP_KEY}",
  "token": "{TOKEN_KEY}",
  "pos": "bottom",
  "idList": "{ID_LIST_VALUE}"
}
```

* **name**: 카드 제목
* **desc**: 카드 설명
* **key**: 애플리케이션 키
* **token**: 토큰 키
* **pos**: 목록에서 카드의 상대적 위치 
* **idList**: 목록 ID

다음은 완료된 설정의 예시입니다:
{{< img src="developers/faq/integration_config.png" alt="integration_config" >}}

## 고려할 사항

이 플로우는 Trello가 애플리케이션에 대한 서버 토큰을 생성하는 것을 포함합니다. 이는 토큰 고지 사항에서 확인할 수 있습니다:
{{< img src="developers/faq/trello_disclaimer.png" alt="trello_disclaimer" >}}

토큰은 보드와 팀 전체에 읽기/쓰기 액세스를 제공하기 때문에 이와 같은 액세스를 부여하고 싶지 않을 경우에는 문제가 될 수 있습니다.

이를 방지하려면 지정한 보드에만 가입할 수 있는 특정 Trello 사용자를 생성하는 것이 좋습니다. 해당 사용자가 서버 토큰을 받도록 합니다.

[1]: /ko/integrations/webhooks/
[2]: /ko/monitors/notify/
[3]: https://trello.com/app-key
[4]: https://trello.com/guide