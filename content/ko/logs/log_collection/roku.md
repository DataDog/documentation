---
description: Roku 채널에서 로그를 수집합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: GitHub
  text: dd-sdk-roku Source code
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
kind: 설명서
title: Roku 로그 수집
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku 로그 수집은 US1-FED Datadog 사이트에서 이용할 수 없습니다.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku 로그 수집은 베타 서비스입니다.</div>
{{< /site-region >}}

[Datadog의 `dd-sdk-roku` 로깅 라이브러리][1]를 사용해 Roku  채널에서 Datadog으로 로그를 전송하고 다음 기능을 활용해 보세요.

* JSON 네이티브 형식으로 Datadog에 로그인하세요.
* `context` 및 그외 커스텀 속성을 전송된 각 로그에 추가합니다.
* 실제 클라이언트 IP 주소와 User-Agents를 기록합니다.
* 자동 대량 포스트로 네트워크 사용량을 최적화했습니다.

## 설정

1. `ROPM`를 사용하여 프로젝트에 종속성을 추가하거나 [최신 zip 아카이브][7]를 다운로드하여 프로젝트에서 파일 압축을 풉니다.

    ```shell
    ropm install datadog-roku
    ```

2. [Datadog 클라이언트 토큰][2]과 Datadog UI에서 새 RUM 애플리케이션 생성 시 만들어진 애플리케이션 ID로 라이브러리를 초기화합니다(자세한 내용을 확인하려면 [Roku RUM 수집 시작하기][6] 참조). 보안상의 이유로 반드시 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][3]를 사용하여 `dd-sdk-roku` 라이브러리를 설정할 수 없습니다. Roku 채널의 패키지의 클라이언트-사이드가 노출될 수 있기 때문입니다.

   클라이언트 토큰을 설정하는 방법에 관한 자세한 내용을 확인하려면 [클라이언트 토큰 설명서][2]를 참고하세요.

   {{< site-region region="us" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "eu1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us3",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us5",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "ap1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
          launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}


3. (옵션) 애플리케이션을 작성할 때 글로벌 로드의 `datadogVerbosity` 속성을 설정하여 개발 로그를 활성화할 수 있습니다. 우선 순위가 해당 수준 이상이거나 동일한 라이브러리의 내부 메시지 전체가 다음과 같이 Roku 장치 텔넷 아웃풋에 로깅됩니다.

   ```brightscript
   ' 0 = none; 1 = error; 2 = warning; 3 = info; 4 = verbose;
   m.globalNode.addFields({ datadogVerbosity: 2 }) 
   ```

4. 다음 함수 중 하나를 사용해 커스텀 로그 항목을 Datadog로 바로 보냅니다.

    ```brightscript
    msg = "A log message"
    m.global.datadogLogsAgent.callfunc("logOk", msg, {})
    m.global.datadogLogsAgent.callfunc("logDebug", msg, {})
    m.global.datadogLogsAgent.callfunc("logInfo", msg, {})
    m.global.datadogLogsAgent.callfunc("logNotice", msg, {})
    m.global.datadogLogsAgent.callfunc("logWarn", msg, {})
    m.global.datadogLogsAgent.callfunc("logError", msg, {})
    m.global.datadogLogsAgent.callfunc("logCritical", msg, {})
    m.global.datadogLogsAgent.callfunc("logAlert", msg, {})
    m.global.datadogLogsAgent.callfunc("logEmergency", msg, {})
    ```


5. (옵션) 전송하는 로그에 속성을 추가하기 위해 로그 메시지에 관련 어레이(Associative Array)를 제공하세요. AssocArray의 각 항목이 속성으로 추가됩니다.

   ```brightscript
    m.global.datadogLogsAgent.callfunc(
        "logInfo", 
        "Video started", 
        { video_id: 42, video_type: "advert"}
    )
   ```

## 일괄 처리 수집

모든 로그는 먼저 배치로 로컬 디바이스에 저장됩니다. 각 배치는 수신 사양을 따릅니다. 네트워크가 사용 가능하면 즉시 전송됩니다. 채널이 열려 있는데 네트워크를 사용할 수 없거나 데이터 업로드가 실패하면 배치는 전송에 성공할 때까지 대기 상태로 보관됩니다.

SDK가 너무 많은 디스크 공간을 사용하지 않도록 디스크의 데이터는 오랜 시간이 경과하면 자동으로 폐기됩니다.

**참고**: 데이터가 Datadog에 업로드되기 전 해당 데이터는 채널의 [캐시 디렉토리][8]에 일반 텍스트로 저장되므로 다른 애플리케이션에서 이를 읽을 수 없습니다. OS는 언제든지 데이터를 삭제할 수 있으며, 이로 인해 드물게 데이터가 손실될 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-roku
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/logs/processing/attributes_naming_convention/
[5]: /ko/tagging/
[6]: /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/?tab=us
[7]: https://github.com/DataDog/dd-sdk-roku/releases
[8]: https://developer.roku.com/fr-fr/docs/developer-program/getting-started/architecture/file-system.md#cachefs