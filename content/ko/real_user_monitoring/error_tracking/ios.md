---
aliases:
- /ko/real_user_monitoring/ios/crash_reporting/
description: iOS 프로젝트 오류 추적 설정
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios 소스 코드
- link: https://datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: 블로그
  text: iOS 충돌 보고 및 오류 추적 소개
- link: real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
kind: 설명서
title: iOS 충돌 보고 및 오류 추적
---
## 개요

iOS 충돌 보고 및 오류 추적을 활성화하면 실제 사용자 모니터링(RUM) 기능을 통해 종합적인 충돌 보고서 및 오류 동향을 확인할 수 있습니다. 이 기능을 사용하면 다음에 액세스할 수 있습니다.

 - 집계된 iOS 충돌 대시보드 및 속성
 - iOS 충돌 보고서 심볼화
 - iOS 오류 추적을 사용한 트렌드 분석

스택 트레이스를 심볼화하려면 .dSYM 파일을 찾아 Datadog에 업로드합니다. 그런 다음 테스트 충돌을 실행하고 애플리케이션을 다시 시작하여 설정을 확인합니다.

충돌 보고서가  [**오류 추적**][8]에 나타납니다.

## 설정

iOS SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [iOS RUM 설정 설명서][2]를 참조하세요.

### 충돌 보고 추가

충돌 보고를 활성화하려면 [RUM][2]이나 [로그][9]를 활성화하는 것을 잊지 마세요. 그런 다음 종속성 관리자에 따라 패키지를 추가하고 초기화 스니펫을 업데이트합니다.

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][4]를 사용해 `dd-sdk-ios`를 설치할 수 있습니다.
```
pod 'DatadogCrashReporting'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple의 Swift 패키지 관리자를 사용하여 통합하려면 다음을 종속 항목으로 `Package.swift`에 추가합니다.
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

프로젝트에서 다음 라이브러리를 연결합니다.
```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][5]를 사용해 `dd-sdk-ios`를 설치할 수 있습니다.
```
github "DataDog/dd-sdk-ios"
```

Xcode에서 다음 프레임워크를 연결합니다.
```
DatadogCrashReporting.xcframework
CrashReporter.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

초기화 스니펫을 업데이트하여 충돌 보고를 포함합니다.

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ), 
  trackingConsent: trackingConsent
)

CrashReporting.enable()
```

## 충돌 보고서 기호화 

충돌 보고서는 원시 형식으로 수집되며 대부분 메모리 주소를 포함합니다. 이러한 주소를 읽을 수 있는 심볼 정보에 매핑하려면 Datadog는 .dSYM 파일을 필요로 합니다. 이 파일은 애플리케이션의 빌드나 분포 프로세스에서 생성됩니다.

### dSYM 파일 찾기

모든 iOS 애플리케이션은 각 애플리케이션 모듈에 대해 .dSYM 파일을 생성합니다. 이러한 파일은 애플리케이션 바이너리 크기를 최소화하고 더 빠른 다운로드 속도를 가능케 합니다. 각 애플리케이션 버전에는 일련의 .dSYM 파일이 포함되어 있습니다.

설정에 따라 App Store Connect에서 `.dSYM` 파일을 다운로드하거나 로컬 기기에서 찾아야 할 수 있습니다.

| Bitcode 활성화됨 | 설명 |
|---|---|
| Yes | `.dSYM` 파일은 [App Store Connect][6]가 애플리케이션 빌드 처리를 완료한 후 사용할 수 있습니다. |
| No | Xcode는 `.dSYM` 파일을 애플리케이션 빌드 마지막에 `$DWARF_DSYM_FOLDER_PATH`로 내보내기 합니다. `DEBUG_INFORMATION_FORMAT` 빌드 설정이 **DWARF 및 dSYM 파일**로 설정되어 있는지 확인합니다. 기본적으로 Xcode 프로젝트는 릴리스 프로젝트 설정에 대해 `DEBUG_INFORMATION_FORMAT`만 *DWARF 및 dSYM 파일**로 설정합니다. |

### dSYM 파일 업로드

.dSYM 파일을 Datadog에 업로드하여 오류 관련 스택 트레이스에서 각 프레임의 줄 수와 파일 경로에 액세스할 수 있습니다.

애플리케이션이 충돌하여 애플리케이션을 다시 시작하면 iOS SDK는 충돌 보고서를 Datadog에 업로드합니다.

**참고**: 소스 맵을 다시 업로드할 때 버전이 변경되지 않으면 이전 소스 맵을 다시 쓰지 않습니다.

#### Datadog CI

명령줄 도구[@datadog/datadog-ci][5]를 사용해 dSYM 파일을 업로드할 수 있습니다.

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**참고**: EU 엔드포인트를 사용하여 도구를 설정하려면 `DATADOG_SITE` 환경 변수를 `datadoghq.eu`로 설정합니다. 유입 엔드포인트의 전체 URL을 덮어쓰려면 `DATADOG_DSYM_INTAKE_URL` 환경 변수를 정의하세요.

대신 워크플로의 Fastlane 또는 GitHub 작업을 사용하는 경우, `datadog-ci` 대신 이러한 통합을 활용할 수 있습니다.

#### Fastlane 플러그인

Datadog 플러그인은 Fastlane 설정에서 dSYM 파일을 Datadog에 업로드할 수 있도록 해줍니다.

1. [`fastlane-plugin-datadog`][3]을 프로젝트에 추가합니다.

   ```sh
   fastlane add_plugin datadog
   ```

2. Fastlane을 설정하여 심볼을 업로드합니다.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

자세한 정보는 [`fastlane-plugin-datadog`][3]를 참조하세요.

#### GitHub 작업

[Datadog 업로드 dSYM GitHub 작업][4]을 사용하면 GitHub 작업에 심볼을 업로드할 수 있습니다.

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

자세한 정보는 [dSYM 명령][7]을 참조하세요.

## 충돌 보고서 확인

iOS 충돌 보고 및 오류 추적 설정을 확인하려면 RUM 애플리케이션에서 충돌 이슈를 만들고 Datadog에서 오류가 나타나는지 체크하세요.

1. iOS 시뮬레이터 또는 실제 기기에서 애플리케이션을 실행합니다. 디버거가 포함되지 않도록 하세요. 그렇지 않으면 Xcode는 충돌을 캡처하고 이후 iOS SDK가 다시 충돌을 캡처합니다.
2. 충돌을 포함하는 코드 실행:

   ```swift
   func didTapButton() {
   fatalError(“Crash the app”)
   }
   ```

3. 충돌이 발생한 후 애플리케이션을 다시 시작하고 iOS SDK가 충돌 보고서를 [**오류 추적**][8]에 업로드할 때까지 기다립니다.

**참고:** RUM은 iOS v14+ arm64 and arm64e 아키텍처의 시스템 심볼 파일의 심볼화를 지원합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/ios
[3]: https://github.com/DataDog/datadog-fastlane-plugin
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://appstoreconnect.apple.com/
[7]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[8]: https://app.datadoghq.com/rum/error-tracking
[9]: https://docs.datadoghq.com/ko/logs/log_collection/ios