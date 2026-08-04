---
aliases:
- /ko/real_user_monitoring/error_tracking/unity
code_lang: Unity
code_lang_weight: 50
description: Error Tracking을 사용해 Unity 오류를 추적하는 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: 소스 코드
  text: dd-sdk-unity 소스 코드
- link: real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
title: Unity Crash Reporting 및 Error Tracking
type: multi-code-lang
---
## 개요

Crash Reporting 및 Error Tracking을 활성화하고 Real User Monitoring으로 종합 충돌 보고서와 오류 트렌드를 확인하세요.

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

Datadog Unity SDK를 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [Flutter 설정 설명서][3]를 따르세요.

### Unity 로그에서 캡처되지 않은 예외 포워딩하기

Unity는 캡처되지 않은 모든 예외를 `Debug.LogException`를 사용하여 로거에 포워딩합니다. 해당 예외를 Datadog에 보고하려면 Datadog 프로젝트 설정에서 "Forward Unity Logs" 옵션을 선택하세요.

### 네이티브 충돌 보고

모든 Datadog Unity SDK 프로젝트의 네이티브 충돌 보고가 활성화됩니다.

애플리케이션에 치명적인 충돌이 발생한 경우, 애플리케이션을 다시 시작한 *후* Datadog Unity SDK가 Datadog에 충돌 보고서를 업로드합니다. 치명적이지 않은 오류나 예외의 경우, Datadog Unity SDK가 다른 RUM 데이터와 함께 해당 오류나 예외를 업로드합니다.

## 난독화 해제 및 심볼화된 스택 트레이스 가져오기

매핑 파일은 스택 트레이스의 난독화를 해제하고 심볼화하는 데 사용되므로, 오류를 디버깅하는 데 도움이 됩니다. Datadog은 생성된 고유 빌드 ID를 사용하여 올바른 스택 트레이스를 해당 매핑 파일과 자동 매치시킵니다. 이렇게 하면 매핑 파일이 업로드된 시점(프리 프로덕션 또는 프로덕션 빌드 중)에 관계없이, Datadog에 보고된 충돌 및 오류를 검토할 때 효율적인 QA 프로세스를 위해 올바른 정보를 사용할 수 있습니다.

### IL2CPP를 통한 파일 및 코드 라인 매핑

IL2CPP 백엔드(iOS 기본값)를 사용하는 경우 Unity의 C# 스택 트레이스에는 파일 또는 코드 라인 정보가 없습니다. 본 정보는 C# 스택 트레이스가 네이티브 스택에 매핑되어 있는 경우, 네이티브 심볼 파일과 IL2CPP 매핑 파일에서 검색할 수 있습니다. 활성화하려면 Unity 프로젝트 설정의 Datadog 섹션에서 'Perform Native Stack Mapping' 옵션을 선택하고, 하단에 설명된 대로 심볼 및 IL2CPP 매핑 파일을 업로드합니다.

**참고**: 해당 옵션을 선택한 경우에도 Native Stack Mapping은 비개발 빌드에서만 활성화됩니다.

### Datadog에 심볼 파일 업로드

네이티브 충돌 보고가 원시 형식으로 수집되며 대부분은 메모리 주소를 포함합니다. 이들 주소를 적격 심볼 정보에 매핑하기 위해서는 iOS `.dSYM` 파일, NDK `.so` 파일, Android Proguard Mapping 파일 및/또는 IL2CPP 매핑 파일을 업로드해야 하며, 해당 파일은 애플리케이션 빌드 프로세스에서 생성됩니다.

[@datadog/datadog-ci][4] 명령줄 도구는 모든 필수 파일(dSYMs, sos, Android Proguard Mapping, IL2CPP Mapping 파일)을 하나의 명령으로 업로드할 수 있도록 지원합니다.

먼저 위 지침에서 `datadog-ci` 도구를 설치하고 프로젝트 루트에 API 키 및 Datadog 사이트(선택 사항)를 포함하는 `datadog-ci.json` 파일을 생성합니다.
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

이러한 파일은 API 키를 포함하므로 버전 제어에 체크인해서는 안 됩니다.

대신 `DATADOG_API_KEY` 및 `DATADOG_SITE` 환경 변수를 설정할 수 있습니다.

그러면 다음 명령을 사용해 충돌 보고서 심볼화와 난독화 해제에 필요한 모든 필수 파일을 업로드할 수 있습니다.
```sh
# From your build output directory
datadog-ci unity-symbols upload --ios
```

Android의 경우 APK를 직접 빌드하는 대신 Android 프로젝트를 내보내고 내보낸 프로젝트를 사용하여 빌드합니다. 내보낸 프로젝트 디렉토리에서 datadog-ci를 실행할 수 있습니다.
```sh
# From your exported project directory
datadog-ci unity-symbols upload --android
```

**참고**: 소스 맵을 다시 업로드할 때 빌드 ID가 변경되지 않으면 기존 소스 맵을 다시 쓰지 않습니다.

옵션 전체 목록의 경우 `datadog-ci` [Unity Symbol 설명서][5]를 참조하세요.

### 업로드된 심볼 파일 목록

업로드된 모든 심볼을 보려면 [RUM Debug Symbol][6] 페이지를 참조하세요.

## 한계

{{< site-region region="us,us3,us5,eu,gov" >}}
소스 맵과 dSYM 파일은 각각 **500**MB로 제한됩니다.
{{< /site-region >}}
{{< site-region region="ap1" >}}
소스 맵과 dSYM 파일은 각각 **500**MB로 제한됩니다.
{{< /site-region >}}

## 구현 테스트

Unity Crash Reporting 및 Error Tracking 설정을 확인하려면, 애플리케이션에서 충돌 이슈를 만들고 Datadog에서 오류가 나타나는지 확인하세요.

1. 개발 빌드를 실행하고 있지 않은지 확인합니다. Unity의 빌드 설정에서 'Development Build'란을 해제합니다.
2. 시뮬레이터, 에뮬레이터 또는 실제 기기에서 애플리케이션을 실행합니다. iOS에서 실행하는 경우 디버거가 포함되지 않도록 합니다. 그렇지 않으면 Datadog SDK가 충돌을 캡처하기 전에 Xcode가 먼저 충돌을 캡처합니다.
3. 오류 또는 충돌이 포함된 코드를 실행합니다. 예시:

   ```cs
   void ThrowError() {
    throw new Exception("My Exception")
   }
   ```

4. 충돌을 일으키지 않는 난독화된 오류 보고서의 경우 [**Error Tracking**][1]에서 심볼화 및 난독화 해제를 확인할 수 있습니다.
5. 충돌의 경우, 충돌이 발생한 후 애플리케이션을 다시 시작하고 Unity SDK가 충돌 보고서를 [**Error Tracking**][1]에 업로드할 때까지 기다립니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/unity#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum