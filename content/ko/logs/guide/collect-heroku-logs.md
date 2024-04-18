---
kind: 지침
title: 헤로쿠(Heroku) 로그 수집
---

헤로쿠(Heroku)는 다음과 같은 3가지 유형의 로그를 제공합니다.

* `App Logs`: 플랫폼에서 푸시한 애플리케이션 출력값입니다.
* `System Logs`: 앱을 대신하여 헤로쿠(Heroku) 플랫폼 인프라스트럭처에서 수행한 작업에 관한 메시지입니다.
* `API Logs`: 앱에서 고객님과 다른 개발자가 구현한 관리형 질문입니다.

[헤로쿠(Heroku) HTTP/S 드레인][1]은 로그 메시지를 버퍼링하고 POST 요청을 통해 메시지 배치를 HTTPS 엔드포인트에 전송합니다.
POST 본문에는 Syslog TCP 프로토콜 옥텟 카운팅 프레임 방식을 활용한 프레임된 Syslog 형식 메시지가 포함됩니다.
Datadog HTTP API는 콘텐츠 헤더 `application/logplex-1`에 정의된 Logplex 표준을 구현 및 이해합니다.

해당 로그를 전부 Datadog에 전송하려면:

* 헤로쿠(Heroku) 프로젝트에 연결합니다.
* 다음 명령어로 HTTPS 드레인을 설정합니다.

```text
heroku drains:add "https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&env=<ENV>&service=<SERVICE>&host=<HOST>" -a <APPLICATION_NAME>
```

* [Datadog API 키][2]를 `<DD_API_KEY>`로 바꿉니다.
* 애플리케이션 [환경][3]을 `<ENV>`으로 바꿉니다.
* 애플리케이션 이름을 `<APPLICATION_NAME>`, `<SERVICE>`로 바꿉니다.
* 원하는 호스트 이름을 `<HOST>`로 바꿉니다.
**참고**:  
   - [호스트 섹션][4]에 따라 메트릭 및 트레이스는 기본 호스트 이름을 Dyno 이름으로 설정합니다. 로그의 호스트 이름으로 Dyno 이름을 동적 설정할 수 없습니다. `dyno`, `dynotype` 태그를 사용하여 메트릭, 트레이스, 로그를 상호 연관시킵니다.
   - 빌드팩은 `dyno` 태그(Dyno 이름을 나타냄. 예:`web.1`) `dynotype`(`run` 또는 `web`과 같은 Dyno 유형)를 자동으로 추가합니다. 자세한 내용을 확인하려면 [태그로 시작하기][3] 지침을 참조하세요.

### 커스텀 속성

애플리케이션 로그에 다음과 같이 드레인의 URL을 변경하여 커스텀 속성을 추가하세요.

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/getting_started/tagging/#introduction
[4]: /ko/agent/basic_agent_usage/heroku/#hostname