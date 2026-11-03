---
aliases:
- /ko/real_user_monitoring/error_tracking/maui
- /ko/error_tracking/frontend/mobile/maui/
code_lang: maui
code_lang_weight: 55
description: .NET MAUI 애플리케이션 Error Tracking을 설정하세요.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: 설명서
  text: Error Tracking 시작하기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: Explorer에서 Error Tracking 데이터 시각화
title: .NET MAUI 충돌 보고 및 Error Tracking
type: multi-code-lang
---
## 개요 {#overview}

Error Tracking은 .NET MAUI SDK에서 수집된 오류를 처리합니다.

.NET MAUI 충돌 보고 및 Error Tracking을 활성화하여 포괄적인 충돌 보고서, 네이티브 iOS 스택 트레이스 심볼화, iOS 및 Android 전반의 오류 추세를 확인합니다. 충돌 보고서는 [{{< ui >}}Error Tracking{{< /ui >}}][1]에서 확인할 수 있습니다.

### C# 오류 추적 {#c-error-tracking}

C# 오류 추적은 RUM을 활성화하는 즉시 자동으로 활성화되며 추가 구성은 필요하지 않습니다. SDK는 다음을 캡처합니다.

- 처리되지 않은 C# 예외(`AppDomain.UnhandledException`)
- 관찰되지 않은 작업 예외(`TaskScheduler.UnobservedTaskException`)

또한 `DdRum.AddError`를 사용하여 수동으로 오류를 보고할 수 있습니다.

### 네이티브 충돌 보고(선택 사항) {#native-crash-reporting-optional}

`NativeCrashReportEnabled`는 네이티브 iOS 또는 Android 코드에서 발생하는 충돌(예: iOS의 Objective-C/Swift 충돌이나 Android의 JNI/Kotlin 충돌)을 추가로 캡처하려는 경우에만 **필요합니다.** C# 오류 추적은 이 기능을 적용하지 않아도 작동합니다.

네이티브 충돌 보고를 활성화하려면 SDK 구성에서 `NativeCrashReportEnabled = true`를 설정합니다.

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

{% alert level="info" %}
`NativeCrashReportEnabled = true`인 경우, 애플리케이션 충돌을 유발하는 처리되지 않은 C# 예외가 **두 번** 보고됩니다. 한 번은 `AppDomain.UnhandledException`에 의해 캡처된 C# 오류, 다른 한 번은 플랫폼의 충돌 보고기에 의해 캡처된 네이티브 iOS 또는 Android 충돌로 보고됩니다. 두 이벤트는 동일한 RUM 세션 및 보기를 공유하므로 탐색기에서 상호 연결할 수 있습니다.

둘 중 하나만 유지하려면 [`ErrorEventMapper`][5]를 사용하여 워크플로에 적합하지 않은 복사본을 삭제합니다(예: `Source` 또는 `Stacktrace` 콘텐츠 기준 필터링).
{% /alert %}

## 설정 {#setup}

.NET MAUI SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [.NET MAUI 설정 설명서][3]를 참조하세요.

## 심볼화된 스택 트레이스 가져오기 {#get-symbolicated-stack-traces}

네이티브 iOS 충돌 보고서에서 메서드 이름과 크래시 주소를 확인하려면 앱의 `.dSYM` 번들을 Datadog에 업로드합니다. 그러면 각 충돌 이벤트에서 서버 측 심볼화가 수행됩니다.

| 스택 트레이스 유형 | 심볼 파일 | 해결 방법 |
|---|---|---|
| 네이티브 iOS 충돌(및 AOT 컴파일된 C# 메서드 이름) | `.dSYM` 번들 | Datadog에 업로드됨, 각 충돌 이벤트에서 서버 측 해결 |

iOS `.dSYM` 번들은 SDK가 업로드하는 유일한 심볼 파일입니다. Android R8/ProGuard 매핑 파일 및 Portable PDB 파일은 업로드되지 않습니다. [제한 사항](#limitations)을 참조하세요.

### `datadog-ci` {#upload-symbols-with-datadog-ci}를 통한 심볼 업로드

`Datadog.Maui` NuGet 패키지는 `dotnet publish`의 일부로 Datadog에 심볼을 자동으로 업로드하는 MSBuild 대상을 제공합니다. 이를 활성화하려면 다음 단계를 따르세요.

#### 1. 설치`datadog-ci` {#1-install-datadog-ci}

```bash
npm install -g @datadog/datadog-ci
```

`datadog-ci version`을 사용하여 설치를 확인합니다.

#### 2. Datadog API 키 설정 {#2-set-your-datadog-api-key}

`dotnet publish`를 실행하는 셸에서 키를 내보냅니다.

```bash
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
```

CI 환경의 경우, 러너에서 `DATADOG_API_KEY`를 보호/시크릿 환경 변수로 설정합니다. 키를 소스 제어에 커밋하지 마세요.

로컬 테스트의 경우, 키를 MSBuild 속성(`-p:DatadogApiKey=...`)으로 전달할 수 있지만, **`DatadogApiKey`를 `.csproj`**에 설정해선 안 됩니다(해당 파일은 체크인됨).

#### 3. 업로드 활성화 {#3-enable-the-upload}

`DatadogUploadSymbols=true`를 `<PropertyGroup>`의 `.csproj` 항목으로 설정하거나 `dotnet publish` 명령줄에서 설정합니다. MSBuild 대상은 게시 후 자동으로 실행되며 `datadog-ci`가 없거나 API 키가 설정되지 않은 경우 자동으로 건너뜁니다.

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true
```

`.dSYM``.app` 옆에 생성된 번들이 업로드됩니다. dSYM은 기기 빌드(`-r ios-arm64`)에 대해서만 생성되며, 시뮬레이터 빌드(`iossimulator-arm64`)는 업로드를 건너뜁니다.

### 구성 {#configuration}

모든 구성은 MSBuild 속성을 통해 완료되며, 이는 `.csproj` `<PropertyGroup>` 내에서 또는 `dotnet publish` 명령줄에서 `-p:`를 통해 설정할 수 있습니다.

| 속성 | (필수) | 기본값 | 설명 |
|---|---|---|---|
| `DatadogUploadSymbols` | 예 | `false` | 게시 후 심볼 업로드를 활성화하려면 `true`로 설정합니다. |
| `DatadogServiceName` | 아니요 | `$(AssemblyName)` | Datadog에서 앱을 식별하는 데 사용되는 서비스 이름입니다. 런타임에 `Service`로 전달하는 `DdSdkConfiguration`과 일치해야 합니다. |
| `DatadogSite` | 아니요 | `datadoghq.com` | 업로드를 수신하는 Datadog 사이트입니다(예: `datadoghq.eu`, `us5.datadoghq.com`). `Site`에 설정된 `DdSdkConfiguration` 값과 일치해야 합니다. |
| `DatadogApiKey` | 아니요 | — | 직접 전달되는 API 키입니다. 설정하지 않으면 `DATADOG_API_KEY` 환경 변수가 대신 사용됩니다. |

```xml
<PropertyGroup>
  <DatadogServiceName>my-maui-app</DatadogServiceName>
  <DatadogSite>datadoghq.eu</DatadogSite>
</PropertyGroup>
```

`dotnet publish`가 기본적으로 사용하는 터미널 로거는 정보성 출력을 숨깁니다. Datadog 업로드 메시지를 확인하려면 `-v n -tl:off`를 추가합니다.

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

업로드 후 심볼을 처리하는 데 최대 5분이 소요됩니다. [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4]에서 수신 여부를 확인할 수 있습니다.

## 제한 사항 {#limitations}

### 관리형 C# 스택 트레이스 {#managed-c-stack-traces}

관리형 C# 예외 스택 트레이스는 메서드 이름으로만 해석됩니다. 파일 이름과 줄 번호는 아직 사용할 수 없습니다.

.NET MAUI 릴리스 빌드는 배포 전에 C#을 AOT 컴파일하므로, 기기 런타임에서 프레임을 소스 위치로 다시 매핑할 수 없습니다.
- iOS의 경우, 최소 런타임에서 Portable PDB 파일을 전혀 읽을 수 없습니다. 
- Android의 경우, AOT 컴파일된 프레임은 `Unknown Source`를 보고합니다. 
이러한 프레임을 해석하려면 앱의 Portable PDB(`.pdb`)와 서버 측의 플랫폼 네이티브 디버그 정보를 결합해야 하는데, 이 기능은 지원되지 않습니다. Portable PDB 파일은 Datadog에 업로드되지 않으며, 이를 앱에 번들로 포함해도 보고된 스택 트레이스에 파일/줄 정보가 추가되지 않습니다.

### Android 심볼 업로드 {#android-symbol-upload}

Android 빌드에서는 심볼 업로드가 지원되지 않습니다. R8/ProGuard `mapping.txt` 파일은 업로드되지 않으므로, Android 충돌 보고서의 난독화된 Java/Kotlin 프레임은 난독화가 해제되지 않습니다. Android 충돌은 계속해서 수집 및 보고되며, 난독화 해제 단계만 사용할 수 없습니다.

### 파일 크기 {#file-sizing}

dSYM 번들(iOS)은 각각 최대 **2 GB**까지 가능합니다.

### 수집 {#collection}

SDK는 다음 동작으로 충돌 보고를 처리합니다.

- SDK가 초기화된 후에만 충돌을 감지할 수 있습니다. `MauiProgram.CreateMauiApp`에서 최대한 빨리 SDK를 초기화합니다.
- RUM 충돌은 RUM 조회에 연결해야 합니다. RUM 조회 페이지가 표시되기 전(또는 사용자가 앱을 백그라운드로 전환한 후)에 충돌이 발생하면, 해당 충돌은 음소거되어 보고되지 않습니다. 이를 완화하려면 `DdRumConfiguration`에서 `TrackBackgroundEvents = true`를 설정합니다.
- 샘플링된 세션에서 발생한 충돌만 보관됩니다.

### Android NDK 충돌 심볼 {#android-ndk-crash-symbols}

`NativeCrashReportEnabled = true` 시, `dd-sdk-android-ndk`에 의해 캡처된 네이티브(C/C++) 충돌을 심볼화하기 위해서는 스트립되지 않은 `.so` 파일이 필요합니다.

MAUI 앱에서 네이티브 `.so` 파일은 일반적으로 .NET 런타임(`libmonosgen-2.0.so`, `libmonodroid.so`) 및 Datadog 자체 NDK 라이브러리를 통해 제공됩니다. Datadog은 이를 서버 측에서 해석하므로 둘 다 수동으로 업로드할 필요가 없습니다. 사용자 지정 네이티브 C/C++ 라이브러리를 배포하는 경우 `datadog-ci dsyms upload <path-to-so-directory>`를 사용하여 해당 심볼을 수동으로 업로드합니다.

## 구현 테스트 {#test-your-implementation}

충돌 보고 및 Error Tracking 구성을 검증하려면 충돌을 유발하고 Datadog에서 오류가 나타나는지 확인해야 합니다.

1. 실제 기기나 에뮬레이터에서 애플리케이션을 실행합니다(dSYM은 iOS의 기기 빌드에 대해서만 생성됩니다).
2. 처리되지 않은 예외를 발생시키는 코드를 실행합니다. 예를 들면 다음과 같습니다.

   ```csharp
   void OnButtonClicked(object sender, EventArgs e)
   {
       throw new InvalidOperationException("Crash the app");
   }
   ```

3. 충돌이 발생한 후 애플리케이션을 다시 시작하고 SDK가 충돌 보고서를 업로드할 때까지 기다립니다.
4. [{{< ui >}}Error Tracking{{< /ui >}}][1]에서 이벤트를 확인합니다. 기기 빌드에서 발생한 네이티브 iOS 충돌의 경우 프레임 심볼화가 수행됩니다.

## 문제 해결 {#troubleshooting}

**`Skipping symbol upload — datadog-ci is not installed`**
`npm install -g @datadog/datadog-ci`를 실행하고 `datadog-ci version`로 확인합니다.

**`Skipping symbol upload — DATADOG_API_KEY is not set`**
셸에서 키를 내보냅니다. `export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>`. `echo $DATADOG_API_KEY`로 확인합니다.

**`Skipping dSYM upload — file not found`**
dSYM은 기기 빌드에 대해서만 생성됩니다(`-r ios-arm64`). 시뮬레이터 빌드는 dSYM을 생성하지 않습니다.

**게시 중에는 Datadog 출력이 표시되지 않습니다**
터미널 로거는 정보성 메시지를 숨깁니다. `-v n -tl:off`를 `dotnet publish` 명령에 추가합니다.

**업로드는 완료되었으나 Datadog에 심볼이 나타나지 않습니다**
심볼을 처리하는 데 최대 5분이 소요됩니다. [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4]를 검사합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/real_user_monitoring/application_monitoring/maui/setup
[4]: https://app.datadoghq.com/source-code/setup/symbols
[5]: /ko/real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events