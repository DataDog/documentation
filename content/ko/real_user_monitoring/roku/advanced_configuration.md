---
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: GitHub
  text: dd-sdk-roku 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
is_beta: true
kind: 설명서
title: RUM Roku 고급 설정
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku용 실제 사용자 모니터링(RUM)은 US1-FED Datadog 사이트에서 이용할 수 없습니다.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku용 RUM은 베타 버전입니다.</div>
{{< /site-region >}}

## 개요

SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [Roku RUM 설정 설명서][2]를 참조하세요.

## RUM 리소스 추적

### `roUrlTransfer`

`roUrlTransfer` 노드로 직접 이루어진 네트워크 요청은 반드시 추적해야 합니다.

*동기 요청*의 경우 Datadog의 `datadogroku_DdUrlTransfer` 래퍼를 사용하여 리소스를 자동으로 추적할 수 있습니다. 이 래퍼는 `roUrlTransfer` 구성 요소의 대부분의 기능을 지원하지만 비동기 네트워크 호출과 관련된 것은 지원하지 않습니다.

예를 들어, 다음은 `GetToString`을 호출하는 방법입니다:

```brightscript
    ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
    ddUrlTransfer.SetUrl(url)
    ddUrlTransfer.EnablePeerVerification(false)
    ddUrlTransfer.EnableHostVerification(false)
    result = ddUrlTransfer.GetToString()
```

*비동기 요청*의 경우 자동 계측이 지원되지 않습니다. 따라서, 리소스를 수동으로 추적해야 합니다. 다음 코드 스니펫은 요청을 RUM 리소스로 보고하는 방법을 보여줍니다:

```brightscript
sub performRequest()

    m.port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    ' setup the node url, headers, ...

    timer = CreateObject("roTimespan")
    timer.Mark()
    request.AsyncGetToString()

    while (true)
        msg = wait(1000, m.port)
        if (msg <> invalid)
            msgType = type(msg)
            if (msgType = "roUrlEvent")
                if (msg.GetInt() = 1) ' transfer complete
                    durationMs& = timer.TotalMilliseconds()
                    transferTime# = datadogroku_millisToSec(durationMs&)
                    httpCode = msg.GetResponseCode()
                    status = "ok"
                    if (httpCode < 0)
                        status = msg.GetFailureReason()
                    end if
                    resource = {
                        url: requestUrl
                        method: "GET"
                        transferTime: transferTime#
                        httpCode: httpCode
                        status: status
                    }
                    m.global.datadogRumAgent.callfunc("addResource", resource)
                end if
            end if
        end if
    end while
end sub
```

### 스트리밍 리소스

`Video` 또는 `Audio` 노드를 사용하여 미디어를 스트리밍할 때마다 다음과 같이 수신한 모든 `roSystemLogEvent`를 Datadog에 전달할 수 있습니다:

```brightscript 
    sysLog = CreateObject("roSystemLog")
    sysLog.setMessagePort(m.port)
    sysLog.enableType("http.error")
    sysLog.enableType("http.complete")

    while(true)
        msg = wait(0, m.port)
        if (type(msg) = "roSystemLogEvent")
            m.global.datadogRumAgent.callfunc("addResource", msg.getInfo())
        end if
    end while
```

## 사용자 세션 강화

Roku 채널이 RUM과 함께 계측된 후에는 사용자 세션 정보를 더욱 강화하고, 커스텀 이벤트를 추적하여 수집한 속성을 보다 세밀하게 제어할 수 있습니다.

RUM Roku SDK가 자동으로 캡처하는 기본 속성 외에도 커스텀 속성과 같은 추가 컨텍스트 정보를 로그 및 RUM 이벤트에 추가하도록 선택하여 Datadog 내에서 관찰 가능성을 강화할 수 있습니다. 커스텀 속성을 사용하면 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그, 네트워크 상태)를 사용하여 관찰된 사용자 행동에 대한 정보(예: 장바구니 값, 판매자 계층, 광고 캠페인)를 필터링하고 그룹화할 수 있습니다.

### 사용자 식별하기

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:
* 지정된 사용자의 여정을 따라갈 수 있습니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자의 성능을 모니터링합니다.

다음 속성은 **선택 사항**이지만, 이 중에서 **적어도 하나**를 제공해야 합니다:

| 속성 | 유형   | 설명                                                                                              |
| --------- | ------ | -------------------------------------------------------------------------------------------------------- |
| id        | 문자열 | 고유한 사용자 식별자.                                                                                  |
| name      | 문자열 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름.                                                  |
| email     | 문자열 | 사용자 이메일. 사용자 이름이 없는 경우 RUM UI에 표시됨. Gravatars를 가져오는 데 사용되기도 함.  |

사용자 세션을 확인하려면 SDK를 초기화한 후 다음과 같이 `datadogUserInfo` 글로벌 필드를 사용하세요. 

```brightscript
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```

### 커스텀 글로벌 속성 추적

SDK가 자동으로 캡처하는 기본 속성 외에도 커스텀 속성과 같은 추가 컨텍스트 정보를 로그 및 RUM 이벤트에 추가하도록 선택하여 Datadog 내에서 관찰 가능성을 강화할 수 있습니다. 커스텀 속성을 사용하면 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그, 네트워크 상태)를 사용하여 관찰된 사용자 행동에 대한 정보(예: 장바구니 값, 판매자 계층, 광고 캠페인)를 필터링하고 그룹화할 수 있습니다.

```brightscript
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/roku


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}