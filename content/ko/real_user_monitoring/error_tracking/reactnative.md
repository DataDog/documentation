---
description: React Native 프로젝트 오류 추적을 설정합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative 소스 코드
- link: real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: 블로그
  text: 이제 RUM은 React Native 충돌 보고 및 오류 추적을 제공합니다.
kind: 설명서
title: React Native 충돌 보고 및 오류 추적
---

## 개요

React Native 충돌 보고 및 오류 추적을 활성화하고 실제 사용자 모니터링을 사용하여 종합적인 충돌 보고와 오류 동향을 확보할 수 있습니다. 이 기능을 사용하면 다음에 액세스할 수 있습니다.

-   총 React Native 충돌 대시보드 및 속성
-   심볼화된 React Native(자바스크립트(Javascript) 및 네이티브 iOS 또는 Android) 충돌 보고서
-   React Native 오류 추적을 사용한 동향 분석

스택 트레이스를 심볼화하려면 매핑 파일을 수동으로 Datadog에 업로드하세요.

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

RUM React Native SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [React Native RUM 설정 설명서][[3]를 참조하세요.

### 충돌 보고 추가

초기화 스니펫을 업데이트하여 네이티브 자바스크립트(Javascript) 충돌 보고서를 활성화하세요.

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true // enable JavaScript crash reporting
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

## 한계

{{< site-region region="us,us3,us5,eu" >}}
Datadog can accept uploads up to **300** MB.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
Datadog can accept uploads up to **50** MB.
{{< /site-region >}}

소스 맵과 번들의 크기를 계산하려면 다음 명령을 실행하세요.

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

`build` 디렉터리가 아직 존재하지 않는 경우 `mkdir build`를 실행하여 먼저 생성합니다. 그런 다음 위 명령을 실행하세요.

## 충돌 보고서 심볼화 

애플리케이션 크기를 더 작게 만들려면 릴리스용으로 빌드할 때 코드를 최소화해야 합니다. 실제 코드에 오류를 연결하려면 다음 심볼화 파일을 업로드해야 합니다.

-   iOS 자바스크립트(Javascript) 번들용 자바스크립트 소스 맵
-   Android 자바스크팁트 번들용 자바스크립트 소스 맵
-   iOS 네이티브 코드용 dSYM
-   Android 네이티브 코드용 코드 난독화를 활성화한 경우 Proguard 매핑 파일

심볼화 파일을 자동으로 전송하도록 프로젝트를 설정하려면 `npx datadog-react-native-wizard`를 실행합니다.

옵션은 마법사 [공식 설명서][13]를 참조하세요. 

## 업로드용 통과 옵션

### `datadog-sourcemaps.gradle` 스크립트를 사용하는 Android

각기 다른 서비스 이름을 지정하려면 `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` 줄 전에 다음 코드를 `android/app/build.gradle` 파일에 추가합니다.

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

### `datadog-ci react-native xcode` 명령을 사용하는 iOS

`datadog-ci react-native xcode` 명령 옵션은 [명령 설명서 페이지][12]에서 사용할 수 있습니다.

## 충돌 보고서를 위해 구현 환경을 테스트하세요.

소스맵이 올바르게 전송되고 애플리케이션과 연결되어 있는지 확인하려면 [`react-native-performance-limiter`][14] 패키지를 사용해 충돌을 생성할 수 있습니다.

yarn 또는 npm을 사용해 설치한 다음 포드를 다시 설치합니다.

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

앱의 자바스크립트(Javascript) 스레드 충돌:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

릴리스용 애플리케이션을 다시 빌드하여 새로운 소스맵을 전송하고, 충돌을 트리거한 다음 오류가 나타날 때까지 [오류 추적][1] 페이지에서 기다립니다.

dSYM과 Proguard 매핑 파일 업로드를 테스트하려면 대신 네이티브 기본 스레드를 충돌시킵니다.

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## `datadog-react-native-wizard`의 대안

`datadog-react-native-wizard`를 사용해 성공하지 못했거나 각 릴리스에서 심볼화 파일이 자동으로 업로드되지 않게 하려면 다음 단계에 따라 충돌 보고서를 심볼화합니다.

### iOS 빌드에서 자바스크립트(Javascript) 소스 맵 업로드

`@datadog/datadog-ci`를 프로젝트의 개발 종속성(dev dependency)으로 설치해야 합니다.

```bash
yarn add -D @datadog/datadog-ci
# or
npm install --save-dev @datadog/datadog-ci
```

#### 각 릴리스 빌드에서 자동(React Native >= 0.69)

각 릴리스 빌드에서 소스 맵을 수동으로 업로드하는 데에는 시간이 소요되고 오류가 발생하기 쉽습니다. Datadog는 릴리스 빌드를 실행할 때마다 자동으로 소스 맵을 전송하는 것을 권장합니다.

다음을 포함하는 프로젝트 루트에서 `datadog-sourcemaps.sh`라는 이름의 스크립트 파일을 생성합니다.

```shell
#!/bin/sh
set -e

DATADOG_XCODE="../node_modules/.bin/datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE"
```

이 스크립트는 모든 올바른 파라미터를 포함하는 소스 맵의 업로드를 담당하는 명령을 실행합니다. 자세한 정보는 [datadog-ci 설명서][12]를 참조하세요.

Xcode를 사용해 `.xcworkspace`를 연 다음 프로젝트 > 빌드 구문 > 번들 React Native 코드 및 이미지를 선택합니다. 스크립트를 편집해 다음과 같이 만듭니다. 

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# Add these two lines
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map

# Edit the next line
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

업로드가 작동하려면 Datadog API 키를 제공해야 합니다. 명령줄 도구나 외부 서비스를 사용하는 경우 `DATADOG_API_KEY` 환경 변수를 지정할 수 있습니다. Xcode에서 빌드를 실행하는 경우 API 키를 포함하는 프로젝트 루트에서 `datadog-ci.json` 파일을 생성합니다.

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

또한 Datadog 사이트(`datadoghq.eu` 등)를 `DATADOG_SITE` 환경 변수로 지정하거나 `datadog-ci.json` 파일의 `datadogSite` 키로 지정할 수 있습니다.

#### 각 릴리스 빌드에서 자동(React Native < 0.69)

Xcode를 사용해 `.xcworkspace`를 연 다음 프로젝트 > 빌드 구문 > React Native 코드 및 이미지 번들을 선택합니다. 스크립트를 편집해 다음과 같이 만듭니다. 

```shell
set -e

export NODE_BINARY=node
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map
../node_modules/.bin/datadog-ci react-native xcode
```

이 스크립트는 모든 올바른 파라미터를 포함하는 소스 맵의 업로드를 담당하는 명령을 실행합니다. 자세한 정보는 [datadog-ci 설명서][12]를 참조하세요.

업로드가 작동하려면 Datadog API 키를 제공해야 합니다. 명령줄 도구나 외부 서비스를 사용하는 경우 `DATADOG_API_KEY` 환경 변수를 지정할 수 있습니다. Xcode에서 빌드를 실행하는 경우 API 키를 포함하는 프로젝트 루트에서 `datadog-ci.json` 파일을 생성합니다.

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

또한 Datadog 사이트(`datadoghq.eu` 등)를 `DATADOG_SITE` 환경 변수로 지정하거나 `datadog-ci.json` 파일의 `datadogSite` 키로 지정할 수 있습니다.

#### 각 빌드에서 수동

소스 맵을 출력하려면 Xcode 빌드 구문 "React Native 코드 및 이미지 번들"을 편집해야 합니다.

1. Xcode에서 `ios/YourAppName.xcworkspace` 파일을 엽니다.
2. 왼쪽 패널에서 "파일" 아이콘을 선택한 다음 프로젝트에서 클릭합니다.
3. 중앙 패널의 상단 바에서 "구문 빌드"를 선택합니다.

`set -e`줄 이후 이를 추가하여 스크립트를 변경합니다. 

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- 소스 맵을 출력하려면 이 줄 추가
# 스크립트 나머지 부분 변경 안 함
```

향후 모든 iOS 빌드에서 번들에 대한 소스 맵을 찾을 수 있습니다.

XCode에서 번들에 대한 경로를 찾으려면 Xcode의 보고서 탐색기를 표시하거나 해당 위치를 `BUNDLE_FILE`별로 필터링합니다.

보통 위치는 `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle`로 여기에서 `YourAppName`은 앱의 이름이고 `verylonghash`는 28자 해시입니다.

소스 맵을 업로드하려면 React Native 프로젝트에서 이를 실행합니다.

```bash
export DATADOG_API_KEY= # API 키로 채움
export SERVICE=com.myapp # 서비스 이름으로 대체
export VERSION=1.0.0 # XCode 앱 버전으로 대체
export BUILD=100 # XCode 앱 빌드로 대체
export BUNDLE_PATH= # 번들 경로로 채움

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

#### 각 빌드에서 수동(React Native용 Hermes < 0.71)

React Native 버전 0.71까지는 버그가 있어, Hermes 사용 시 잘못된 소스 맵을 생성합니다.

이를 해결하려면 빌드 구문 **맨 마지막에** 더 많은 줄을 추가해 올바른 소스 맵 파일을 생성할 수 있습니다.

빌드 구문을 다음과 같이 편집합니다.

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- 소스 맵 출력을 위해 이 줄 추가
# React Native 0.70의 경우, USE_HERMES를 소스 맵에 대해 참으로 설정해야 생성딤
export USE_HERMES=true

# 나머지 스크립트 변경 안 함

# 이들 줄을 추가해 패키저와 컴파일러 소스 맵을 단일 파일로 작성
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # RN 0.70 이전, 스트립트 이름: find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

소스 맵을 업로드하려면 React Native 프로젝트 루트에서 이를 실행합니다.

```bash
export DATADOG_API_KEY= # API 키로 채움
export SERVICE=com.myapp # 서비스 이름으로 대체
export VERSION=1.0.0 # XCode 앱 버전으로 대체
export BUILD=100 # XCode 앱 빌드로 대체
export BUNDLE_PATH= # 번들 경로로 채움

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

### Android 빌드에서 자바스크립트(Javascript) 소스 맵 업로드

#### 각 릴리스 빌드에서 자동(React Native >= 0.71)

`android/app/build.gradle` 파일에서 `apply plugin: "com.facebook.react"` 줄 이후 다음을 추가합니다.

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

업로드가 작동하려면 Datadog API 키를 제공해야 합니다 .이를 `DATADOG_API_KEY` 환경 변수로 지정하거나 API 키를 포함하는 프로젝트 루트에서 `datadog-ci.json` 파일을 생성할 수 있습니다.

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

또한 Datadog 사이트(`datadoghq.eu` 등)를 `DATADOG_SITE` 환경 변수로 지정하거나 `datadog-ci.json` 파일의 `datadogSite` 키로 지정할 수 있습니다.

#### 각 릴리스 빌드에서 자동(React Native < 0.71)

`android/app/build.gradle` 파일에서 `apply from: "../../node_modules/react-native/react.gradle"` 줄 이후 다음을 추가합니다.

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

업로드가 작동하려면 Datadog API 키를 제공해야 합니다 .이를 `DATADOG_API_KEY` 환경 변수로 지정하거나 API 키를 포함하는 프로젝트 루트에서 `datadog-ci.json` 파일을 생성할 수 있습니다.

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

또한 Datadog 사이트(`datadoghq.eu` 등)를 `DATADOG_SITE` 환경 변수로 지정하거나 `datadog-ci.json` 파일의 `datadogSite` 키로 지정할 수 있습니다.

#### 각 빌드에서 수동

Android에서 소스 맵 파일은 `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map` 위치에 있습니다. 
번들 파일 위치는 RN(React Native ) 및 AGP(Android Gradle Plugin) 버전에 따라 다릅니다. 

-   RN >= 0.71 및 AGP >= 7.4.0: `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN >= 0.71 및 AGP < 7.4.0: `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN < 0.71: `android/app/build/generated/assets/react/release/index.android.bundle`

Android Gradle Plugin 버전은 `com.android.tools.build:gradle` 아래의 `android/build.gradle` 파일에서 지정되어 있습니다. 예: `classpath("com.android.tools.build:gradle:7.3.1")`

애플리케이션에 보다 포괄적인 변형이 있는 경우 경로의 변형 이름으로 `release`를 대체합니다.
`android/app/build.gradle`에 있는 React 설정에서 `bundleAssetName`을 지정한 경우 `index.android.bundle`을 해당 값으로 대체합니다.

빌드를 실행한 후 React Native 프로젝트 루트에서 이를 실행하여 소스 맵을 업로드합니다.

```bash
export DATADOG_API_KEY= # API 키로 채움
export SERVICE=com.myapp # 서비스 이름으로 대체
export VERSION=1.0.0 # android/app/build.gradle 버전 이름으로 대체
export BUILD=100 # android/app/build.gradle 버전 코드로 대체
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

### iOS dSYM 파일 업로드

#### 각 빌드에서 수동

자세한 내용은 [iOS 충돌 보고 및 오류 추적 설명서][4]를 참조하세요.

### Android Proguard 매핑 파일 업로드

먼저 Proguard 최소화가 프로젝트에서 활성화되어 있는지 확인합니다. 기본적으로 이 기능은 React Native 프로젝트에서 활성화되어 있지 않습니다.

자세한 정보는 [React Native Proguard 설명서][5]를 참조하세요.

여전히 불확실한 경우 `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` 실행이 아무것도 반환하지 않는지 확인할 수 있습니다. 이 경우 최소화가 활성화된 것입니다.

#### 각 빌드에서 수동

`android/app/build.gradle` 파일에서 [플러그인 최신 버전][15]을 추가하고 이를 **파일 맨 위로** 설정합니다.  

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}

datadog {
    checkProjectDependencies = "none" // React Native 프로젝트의 경우 필요
}
```

업로드가 작동하려면 Datadog API 키를 제공해야 합니다 .이를 `DATADOG_API_KEY` 환경 변수로 지정하거나 API 키를 포함하는 프로젝트 루트에서 `datadog-ci.json` 파일을 생성할 수 있습니다.

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

또한 Datadog 사이트(`datadoghq.eu` 등)를 `DATADOG_SITE` 환경 변수로 지정하거나 `datadog-ci.json` 파일의 `datadogSite` 키로 지정할 수 있습니다.
자세한 정보는 [Datadog Android SDK Gradle Plugin][6]을 참조하세요.

빌드 이후 플러그인을 실행하려면 `(cd android && ./gradlew app:uploadMappingRelease)`를 실행합니다.

#### 각 빌드에서 업로드 자동화

이전 단계에서와 마찬가지로 플러그인을 설치합니다.

`android/app/build.gradle` 파일에서 `applicationVariants` 루프를 찾습니다. `applicationVariants.all { variant ->`와 같은 형태입니다.

루프 안에 다음 스니펫을 추가합니다.

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**참고**: 소스 맵을 다시 업로드할 때 버전이 변경되지 않으면 이전 소스 맵을 다시 쓰지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/real_user_monitoring/reactnative/
[4]: /ko/real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter
[15]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin