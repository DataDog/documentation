---
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Github
  text: dd-sdk-roku 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
- link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  tag: 블로그
  text: Datadog RUM으로 Roku 채널 모니터링
is_beta: true
kind: 설명서
title: RUM Roku 채널 모니터링
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku용 실제 사용자 모니터링(RUM)은 US1-FED Datadog 사이트에서 이용할 수 없습니다.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku용 RUM은 베타 버전입니다.</div>
{{< /site-region >}}

## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 채널 개별 사용자의 실시간 성능과 사용자 여정을 시각화하고 분석할 수 있습니다.

Datadog Roku SDK는 Roku OS 10 이상 BrightScript 채널을 지원합니다.

## 설정

1. SDK를 종속성으로 선언합니다.
2. Datadog에서 애플리케이션 세부사항을 지정합니다.
3. 라이브러리를 초기화합니다.
4. 채널을 계측합니다.

### SDK를 종속성으로 선언

#### ROPM 사용 (권장)

`ROPM`는 Roku 플랫폼(NPM 기반)의 패키지 관리자입니다. Roku 프로젝트에서 `ROPM`를 아직 사용하지 않는 경우 [시작 가이드][1]를 읽어 보세요. 프로젝트가 `ROPM`를 사용하도록 설정되면 다음 명령을 사용하여 Datadog 종속성을 설치할 수 있습니다:

```shell
ropm install datadog-roku
```

### 수동 설정

프로젝트에서 `ROPM`를 사용하지 않는 경우 [Roku SDK][2] zip 아카이브를 다운로드하여 프로젝트의 루트 폴더에서 압축을 풀어 수동으로 라이브러리를 설치하세요.


프로젝트의 `components` 폴더와 `source` 폴더 모두에 `roku_modules/datadogroku` 하위 폴더가 있는지 확인하세요.

### Datadog에서 애플리케이션 세부사항 지정

1. [**UX Monitoring** > **RUM Applications**> **New Applications**][3]로 이동합니다.
2. 애플리케이션 유형으로 **Roku**를 선택하고 애플리케이션 이름을 입력하여 고유 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성합니다.
3. 클라이언트 IP 또는 지리적 위치 데이터에 대해 자동 사용자 데이터 수집을 비활성화하려면 해당 설정에 대한 체크박스에서 선택을 취소합니다. 자세한 내용은 [수집된 RUM Roku 데이터][4]를 참조하세요.

   {{< img src="real_user_monitoring/roku/roku-new-application.png" alt="Datadog에서 Roku용 RUM 애플리케이션 만들기" style="width:90%;">}}

데이터의 안전을 위해 클라이언트 토큰을 사용해야 합니다. `dd-sdk-roku` 라이브러리를 설정할 때 [Datadog API 키][5]만 사용했다면 해당 키는 Roku 채널의 BrightScript 코드에서 클라이언트 측에 노출됩니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][6]를 참조하세요.

### 라이브러리 초기화

초기화 스니펫에서 환경 이름을 설정합니다. 자세한 내용은 [태그 사용하기][7]를 참조하세요.

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

### 채널 계측

모든 리소스를 자동으로 추적하려면 [**RUM 리소스 추적**][8]을, 이벤트에 커스텀 글로벌 또는 사용자 정보를 추가하려면 [**사용자 세션 강화**][9]를 참조하세요.

#### RUM 보기 추적

[사용자 세션][4]을 논리적 단계로 분할하려면 다음 코드를 사용하여 수동으로 보기를 시작합니다. 채널 내의 새 화면을 탐색할 때마다 새로운 RUM 보기에 해당해야 합니다.

```brightscript
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

#### RUM 액션 추적

RUM 액션은 사용자가 채널과 갖는 상호작용을 나타냅니다. 다음과 같이 Datadog에 액션을 전달할 수 있습니다:

```brightscript
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom" 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

#### RUM 오류 추적

예외가 발생할 수 있는 작업을 수행할 때마다 다음과 같이 Datadog에 오류를 전달할 수 있습니다:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```




## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/rokucommunity/ropm
[2]: https://github.com/DataDog/dd-sdk-roku
[3]: https://app.datadoghq.com/rum/application/create
[4]: /ko/real_user_monitoring/roku/data_collected/
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: /ko/account_management/api-app-keys/#client-tokens
[7]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[8]: /ko/real_user_monitoring/roku/advanced_configuration/#track-rum-resources
[9]: /ko/real_user_monitoring/roku/advanced_configuration/#enrich-user-sessions