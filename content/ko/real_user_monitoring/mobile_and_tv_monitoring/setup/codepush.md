---
aliases:
- /ko/real_user_monitoring/reactnative/codepush
- /ko/real_user_monitoring/reactnative-codepush/
code_lang: codepush
code_lang_weight: 50
description: 클라이언트 측 React Native 모듈을 사용하여 Appcenter Codepush 및 Datadog과 상호 작용하는 방법에
  대해 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative를 위한 소스 코드
- link: real_user_monitoring/reactnative/
  tag: 설명서
  text: React Native 모니터링에 대해 알아보기
title: RUM CodePush 설정
type: multi-code-lang
---

## 개요

React Native 크래시 보고서 및 오류 추적을 사용하면 실제 사용자 모니터링에서 포괄적인 크래시 보고서 및 오류 동향을 얻을 수 있습니다.

React Native 애플리케이션의 새 [CodePush][1] 버전을 릴리스할 때마다 소스 맵을 Datadog에 업로드하여 오류를 최소화해야 합니다.

Datadog은 앱에서 `@datadog/mobile-react-native-code-push`와 [datadog-ci][3] `react-native codepush` 명령을 사용하여 소스 맵을 업로드할 것을 권장합니다. 이렇게 하면 보고된 크래시와 업로드된 소스 맵 모두에서 일관된`version`을 가질 수 있습니다.

codepush로 Datadog SDK를 설정하는 데 문제가 발생하는 경우 [예제 애플리케이션][6]을 참조하세요.

## 설정

`@datadog/mobile-react-native`를 설치하려면 [React Native 모니터링 설치 단계][2]를 참조하세요.

그런 다음 `@datadog/mobile-react-native-code-push`를 설치하세요.

NPM으로 설치하려면 다음을 실행하세요:

```sh
npm install @datadog/mobile-react-native-code-push
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-native-code-push
```

### DdSdkReactNative.initialize로 초기화하기

코드에서 `DdSdkReactNative.initialize`를 `DatadogCodepush.initialize`로 교체하세요.

```js
import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼을 누름)을 추적합니다. 'accessibilityLabel' 요소 속성을 사용하여 탭 액션에 이름을 지정합니다. 그렇지 않으면 요소 유형이 보고됩니다.
    true, // XHR 리소스 추적
    true // 오류 추적
);

await DatadogCodepush.initialize(config);
```

### DatadogProvider로 초기화하기

App 구성 요소에서 `DatadogProvider`를 `DatadogCodepushProvider`로 교체합니다.

```js
import { DatadogCodepushProvider } from '@datadog/mobile-react-native-code-push';

export default function App() {
    return (
        <DatadogCodepushProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogCodepushProvider>
    );
}
```

CodePush 버전을 사용하는 것은 RUM용 Datadog React Native SDK를 초기화하기 전에 수행해야 하는 비동기적인 단계이기 때문에 `DatadogCodepushProvider` 사용 시 `InitializationMode.SYNC`와 `InitializationMode.ASYNC`간의 차이가 없습니다.

## CodePush 소스 맵 업로드

[`@datadog/datadog-ci`][3]를 프로젝트의 개발 종속성으로 설치합니다.

NPM으로 설치하려면:

```sh
npm install @datadog/datadog-ci --save-dev
```

Yarn으로 설치하려면:

```sh
yarn add -D @datadog/datadog-ci
```

프로젝트의 루트에서 API 키와 Datadog 사이트(`datadoghq.com`이 아닐 경우)가 포함된 gitignored`datadog-ci.json` 파일을 만듭니다.

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

`DATADOG_API_KEY`및 `DATADOG_SITE` 환경 변수로 내보낼 수도 있습니다.

새 CodePush 번들을 릴리스할 때 소스 맵과 번들을 출력할 디렉토리를 지정합니다:

```sh
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

적절한 CodePush `app`및 `deployment`인수를 전달하여 `datadog-ci react-native codepush` 명령을 실행합니다.

NPM으로 실행하려면:

```sh
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

Yarn으로 실행하려면:

```sh
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

## 대안

이 단계를 수행하면 `1.2.4-codepush.v3`과 같이 `version`과 `{commercialVersion}-codepush.{codePushLabel}`형식이 일치합니다.

SDK 설정에서 `versionSuffix`를 지정하여 이를 수행할 수도 있습니다:

```js
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용 추적(예: 버튼을 누름. accessibilityLabel' 요소 속성을 사용하여 탭 액션에 이름을 지정할 수 있습니다. 그렇지 않으면 요소 유형이 보고됩니다.)
    true, // XHR 리소스 추적
    true // 오류 추적
);

config.versionSuffix = `codepush.${codepushVersion}`; // "1.0.0-codepush.v2"가 됩니다.
```

잠재적인 버전 충돌을 방지하기 위해 `versionSuffix`는 접미사 앞에 대시(`-`)를 추가합니다.

`codepushVersion`을 얻으려면 하드코딩하거나 [`CodePush.getUpdateMetadata`][4]를 사용하세요.

그런 다음 [`datadog-ci react-native upload`][5] 명령을 사용하여 소스 맵을 업로드하고 `--release-version` 인수가 SDK 설정에 설정된 것과 일치하는지 확인합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /ko/real_user_monitoring/reactnative/
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref#codepushgetupdatemetadata
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#upload
[6]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-codepush