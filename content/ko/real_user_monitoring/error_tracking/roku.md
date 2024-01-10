---
description: Roku 채널을 위한 오류 추적 설정
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: 오류 추적
  text: 오류 추적 시작하기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: 익스플로러에서 오류 추적 데이터 시각화
kind: 도움말
title: Roku Crash 보고 및 오류 추적
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku용 실제 사용자 모니터링(RUM)은 US1-FED Datadog 사이트에서 이용할 수 없습니다.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku용 RUM은 베타 버전입니다.</div>
{{< /site-region >}}

## 개요

오류 추적은 RUM Roku SDK에서 수집된 오류를 처리합니다.

Roku Crash 보고 및 오류 추적을 활성화하면 실제 사용자 모니터링(RUM) 기능을 통해 종합적인 충돌 보고서와 오류 트렌드를 확인할 수 있습니다. 또한, 다음에 액세스할 수 있습니다.

- 집계된 Roku 충돌 대시보드 및 속성
- Roku 오류 추적을 사용한 트렌드 분석

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

Roku SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [Roku RUM 설정 설명서][3]를 참조하세요.

1. 최신 버전의 [RUM Roku SDK][4]를 ROPM 종속성에 추가하거나 Zip 아카이브를 다운로드하세요.
2. [SDK 시작 시][5] 애플리케이션의 `env`를 설정하세요.

오류마다 관련 스택 트레이스의 각 프레임에 대한 파일 경로, 줄 번호 및 코드 스니펫에 액세스할 수 있습니다.

## Datadog에 오류 전달

예외를 호출할 수 있는 작업을 수행하는 경우 다음 코드 스니펫을 추가하여 Datadog에 해당 오류를 전달할 수 있습니다.

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/roku/#setup
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}