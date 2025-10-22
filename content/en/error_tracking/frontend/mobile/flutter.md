---
title: Flutter Crash Reporting and Error Tracking
type: multi-code-lang
code_lang: flutter
code_lang_weight: 40
---

## Overview

Enable Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Datadog Flutter SDK for yet, follow the [in-app setup instructions][2] or see the [Flutter setup documentation][3]. Then, follow the steps on this page to enable React Native Crash Reporting and Error Tracking.

### Step 1 - Specify application details in the UI


1. Navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **New Application**][301].
2. Choose `Flutter` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [Flutter Data Collected][302].

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application-1.png" alt="Create an application for Flutter in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][303].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/setup
[301]: https://app.datadoghq.com/error-tracking/settings/setup/client
[302]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/data_collected/#overview
[303]: /account_management/api-app-keys/#client-tokens


<!-- ET DOCS 


[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html
[10]: https://app.datadoghq.com/source-code/setup/rum -->






<!-- RUM LINKS 

[3]: /account_management/api-app-keys/#client-tokens
[4]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[6]: /real_user_monitoring/error_tracking/flutter
[7]: https://pub.dev/packages?q=go_router
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[12]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html

-->