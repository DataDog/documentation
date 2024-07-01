---
title: RUM CodePush Setup
kind: documentation
description: Learn how to use a client-side React Native module to interact with Appcenter Codepush and Datadog.
aliases:
    - /real_user_monitoring/reactnative/codepush
    - /real_user_monitoring/reactnative-codepush/
code_lang: codepush
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentation
  text: Learn about React Native monitoring

---

## Overview

Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

Each time you release a new [CodePush][1] version for your React Native application, you need to upload the source maps to Datadog to unminify errors.

Datadog recommends using `@datadog/mobile-react-native-code-push` in your app and the [datadog-ci][3] `react-native codepush` command to upload your source maps. This ensures that the `version` is consistent in both reported crashes and uploaded source maps.

If you experience any issues setting up the Datadog SDK with codepush, you can see our [example application][6] as a reference.

## Setup

See the [React Native Monitoring installation steps][2] to install `@datadog/mobile-react-native`.

Then, install `@datadog/mobile-react-native-code-push`.

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-code-push
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-code-push
```

### Initializing with DdSdkReactNative.initialize

Replace `DdSdkReactNative.initialize` by `DatadogCodepush.initialize` in your code:

```js
import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons). You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported
    true, // track XHR resources
    true // track errors
);

await DatadogCodepush.initialize(config);
```

### Initializing with DatadogProvider

Replace `DatadogProvider` by `DatadogCodepushProvider` in your App component:

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

As getting the CodePush version is an asynchronous step that needs to be performed before initializing the Datadog React Native SDK for RUM, there is no difference between `InitializationMode.SYNC` and `InitializationMode.ASYNC` when using `DatadogCodepushProvider`.

## Upload CodePush source maps

Install [`@datadog/datadog-ci`][3] as a development dependency to your project.

To install it with NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

To install it with Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Create a gitignored `datadog-ci.json` file at the root of your project containing your API key and the Datadog site (if not `datadoghq.com`):

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

You can also export them as `DATADOG_API_KEY` and `DATADOG_SITE` environment variables.

When releasing a new CodePush bundle, specify a directory to output the source maps and bundle:

```sh
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

Run the `datadog-ci react-native codepush` command by passing the adequate CodePush `app` and `deployment` arguments.

To run it with NPM:

```sh
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

To run it with Yarn:

```sh
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

## Alternatives

These steps ensure that the `version` matches the format `{commercialVersion}-codepush.{codePushLabel}`, such as `1.2.4-codepush.v3`.

You can also do that by specifying a `versionSuffix` in the SDK configuration:

```js
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
    true, // track XHR Resources
    true // track Errors
);

config.versionSuffix = `codepush.${codepushVersion}`; // will result in "1.0.0-codepush.v2"
```

In order to avoid potential version clashes, the `versionSuffix` adds a dash (`-`) before the suffix.

To obtain the `codepushVersion`, you can hardcode it or use [`CodePush.getUpdateMetadata`][4].

Then, upload your source maps using the [`datadog-ci react-native upload`][5] command, and ensure the `--release-version` argument matches the one set in the SDK configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /real_user_monitoring/reactnative/
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref#codepushgetupdatemetadata
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#upload
[6]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-codepush