---
aliases:
- /ko/real_user_monitoring/unity/advanced_configuration
- /ko/real_user_monitoring/otel
- /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /ko/real_user_monitoring/unity/otel_support/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/unity
description: Unity 모니터링 구성 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: 소스 코드
  text: dd-sdk-unity 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
title: Unity 고급 구성
---
## 개요

RUM용 Datadog Unity SDK를 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [RUM Unity 설정 설명서][2]를 참조하세요. [RUM Unity를 사용해 OpenTelemetry](#opentelemetry-setup)를 설정하는 방법을 알아보세요.

### Advanced Initialization Options

`Custom Endpoint`
: 선택 사항<br/>
**유형**: 문자열<br/>
**기본값**: `true`<br/>
기본 Datadog 엔드포인트 대신 커스텀 엔드포인트에 데이터를 전송합니다. 커스텀 서버로 데이터를 프록싱하는 경우 유용합니다.

`SDK Verbosity`
: 선택 사항<br/>
**유형**: Enum<br/>
**기본값**: `Warn`<br/>
DK Datadog SDK가 출력해야 하는 디버깅 정보의 수준입니다. 수준이 높을수록 더 많은 정보가 출력됩니다. 이 옵션은 예상대로 동작하지 않는 문제 등으로 SDK에서 디버깅 정보를 얻거나 콘솔 로그에서 SDK 관련 디버깅 항목을 제거할 때 유용합니다.

`Telemetry Sample Rate`
: 선택 사항<br/>
**유형**: Double<br/>
**기본값**: `20`
Datadog가 내부 텔레메트리 데이터를 전송하는 속도(%)입니다. 값이 100이면 모든 텔레메트리 데이터가 샘플링되어 Datadog로 전송됨을 의미합니다.

### 자동 보기 추적

`Enable Automatic Scene Tracking`을 선택한 경우, Datadog가 Unity `SceneManager`에 연결하여 씬 로딩 및 언로딩을 감지하고 RUM Views를 시작합니다. `SceneManager` 이외의 방법으로 씬 간 이동하거나 `SceneManager`를 사용하지 않고 보기의 변경 사항을 추적하려면 `DdRum.StartView` 및 `DdRum.StopView`를 사용하여 수동으로 추적할 수 있습니다.

### 사용자 액션 추적

`DdRum.AddAction`을 사용하여 탭, 클릭, 스크롤과 같은 특정 사용자 행동을 추적할 수 있습니다.

`RumActionType.Tap`과 같은 즉각적인 RUM 작업을 수동으로 등록하려면 `DdRum.AddAction()`을 사용합니다. `RumActionType.Scroll`과 같은 지속적인 RUM 작업의 경우 `DdRum.StartAction()` 또는 `DdRum.StopAction()`를 사용합니다.

예시:

```cs
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName,
    );
}
```

`DdRum.StartAction`과 `DdRum.StopAction`을 사용하는 경우 Datadog Unity SDK에서 `type` 작업이 일치해야 작업의 시작과 완료를 매칭할 수 있습니다.

### 리소스 추적

Datadog는 `UnityWebRequest` 대신 `DatadogTrackedWebRequest`를 제공하여 RUM 보기에서 리소스 및 HTTP 호출을 추적할 수 있도록 합니다.

다른 `UnityWebRequest`에서와 같은 방법으로 사용할 수 있습니다.

```cs
var request = DatadogTrackedWebRequest.Get("https://httpbin.org/headers");
yield return request.SendWebRequest();

Debug.Log("Got result: " + request.downloadHandler.text);
```

### 커스텀 리소스 추적

`DatadogTrackedWebRequest를 사용하여 리소스를 자동으로 추적하는 것 외에도 다음 방법을 사용하여 네트워크 요청이나 타사 제공업체 API와 같은 특정 커스텀 리소스를 추적할 수 있습니다.

- `DdRum.StartResource`
- `DdRum.StopResource`
- `DdRum.StopResourceWithError`
- `DdRum.StopResourceWithErrorInfo`

예시:

```cs
// 네트워크 클라이언트에서,

DatadogSdk.Instance.Rum.startResource(
    "resource-key",
    RumHttpMethod.Get,
    url,
);

// 이후

DatadogSdk.Instance.Rum.stopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

두 호출에서 `resourceKey`에 사용된 `string`은 호출하는 리소스에 대해 고유해야만, Unity Datadog SDK에서 리소스의 시작과 완료를 매칭할 수 있습니다.

### 커스텀 오류 추적

특정 오류를 추적할 수 있도록, 예외, 소스및 추가 속성 사용 중 오류가 발생하면 `DdRum`에 알립니다.

```cs
try
{
  // 오류 발생에 취약한 코드
}
catch(Exception e)
{
  DatadogSdk.Instance.Rum.AddError(e, RumErrorSource.Source);
}
```

## 커스텀 글로벌 속성 추적

Datadog Unity SDK에서 자동으로 캡처하는 [기본 RUM 속성][3] 외에도, Datadog에서 관찰 가능성을 강화하기 위해 RUM 이벤트에 추가 컨텍스트 정보(예: 커스텀 속성)를 추가하도록 선택할 수 있습니다.

커스텀 속성을 사용하면 관찰된 사용자 행동에 대한 정보(예: 카트 값, 판매자 계층 또는 광고 캠페인)를 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그 및 네트워크 상태)로 필터링하고 그룹화할 수 있습니다.

### 커스텀 전역 속성 설정

커스텀 전역 속성을 설정하려면 `DdRum.AddAttribute`를 사용합니다.

* 속성을 추가하거나 업데이트하려면 `DdRum.AddAttribute`를 사용합니다.
* 키를 제거하려면 `DdRum.RemoveAttribute`를 사용합니다.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:

* 특정 사용자의 활동 경로를 추적합니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자를 위해 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" style="width:90%" >}}

| 속성   | 유형   | 설명                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | 문자열 | (필수) 고유 사용자 식별자입니다.                                              |
| `usr.name`  | 문자열 | (옵션) RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.              |
| `usr.email` | 문자열 | (옵션) 사용자 이메일로, 사용자 이름이 없는 경우 RUM UI에 표시됩니다. |

사용자 세션을 파악하려면 `DatadogSdk.SetUserInfo`를 사용합니다.

예시:

```cs
DatadogSdk.Instance.SetUserInfo("1234", "John Doe", "john@doe.com");
```

### 커스텀 사용자 속성 추가

사용자 세션에 커스텀 속성을 추가할 수 있습니다. 이 추가 정보는 로그, 추적 및 RUM 이벤트에 자동으로 적용됩니다.

기존 속성을 제거하려면 `null`로 설정합니다.

예시:

```cs
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

## 모든 데이터 삭제

Datadog에 전송되지 않은 모든 데이터를 지우려면 `ClearAllData`를 사용합니다.

```cs
DatadogSdk.instance.ClearAllData();
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/mobile_and_tv_monitoring/unity/setup/
[3]: /ko/real_user_monitoring/mobile_and_tv_monitoring/unity/data_collected/