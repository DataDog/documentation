<!--
This partial contains advanced configuration instructions for the iOS SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the RUM iOS SDK yet, follow the [in-app setup instructions][2] or see the [RUM iOS setup documentation][1].

## Initialization parameters

You can use the following properties in `Datadog.Configuration` when creating the Datadog configuration to initialize the library:

`backgroundTasksEnabled`
: This flag determines if the `UIApplication` methods `beginBackgroundTask(expirationHandler:)` and `endBackgroundTask:` are used to perform background uploads. Enabling this flag might increase the amount of time that the app operates in the background by 30 seconds. Tasks are normally stopped when there's nothing to upload or when encountering a blocker to uploading, such as having no internet connection or having a low battery. By default, this flag is set to `false`.

`batchProcessingLevel`
: Batch processing level defines the maximum number of batches processed sequentially without a delay within one reading/uploading cycle. The default value is `.medium`.

`batchSize`
: Sets the preferred size of batched data uploaded to Datadog. This value impacts the size and number of requests performed by the RUM iOS SDK (small batches mean more requests, but each request becomes smaller in size). Available values include: `.small`, `.medium`, and `.large`.

`bundle`
: The bundle object that contains the current executable.

`clientToken`
: Either the RUM client token (which supports RUM, Logging, and APM) or the regular client token (which supports Logging and APM).

`encryption`
: Data encryption to use for on-disk data persistency by providing an object that complies with the `DataEncryption` protocol.

`env`
: The environment name that is sent to Datadog. This can be used to filter events by different environments (such as `staging` or `production`).

`proxyConfiguration`
: A proxy configuration attribute which can be used to enable a custom proxy for uploading tracked data to Datadog's intake.

`remoteConfiguration`
: (Optional) The remote configuration ID to use for managing supported SDK settings from Datadog. For more information, see [Remote Configuration][10].

`serverDateProvider`
: A custom NTP synchronization interface. By default, the Datadog SDK synchronizes with dedicated NTP pools provided by the [NTP Pool Project][8]. Using different pools or setting a no operation `ServerDateProvider` implementation results in a de-synchronization of the SDK instance and the Datadog servers. This can lead to significant time shifts in RUM sessions or distributed traces.

`service`
: The service name associated with data sent to Datadog. The default value is the application bundle identifier.

`site`
: The Datadog server endpoint that data is sent to. The default value is `.us1`.

`uploadFrequency`
: The preferred frequency of uploading data to Datadog. Available values include: `.frequent`, `.average`, and `.rare`.

### RUM configuration

You can use the following properties in `RUM.Configuration` when enabling RUM:

`actionEventMapper`
: Sets the data scrubbing callback for actions. This can be used to modify or drop action events before they are sent to Datadog. For more information, see [Modify or Drop RUM Events][3].

`appHangThreshold`
: Sets the threshold for reporting when an app hangs. The minimum allowed value for this option is `0.1` seconds. To disable reporting, set this value to `nil`. For more information, see [Add app hang reporting][7].

`applicationID`
: The RUM application identifier.

`collectAccessibility`
: Determines whether accessibility settings are collected and included in RUM view events. By default, this is set to `false`.

`customEndpoint`
: A custom server URL for sending RUM data.

`errorEventMapper`
: The data scrubbing callback for errors. This can be used to modify or drop error events before they are sent to Datadog. For more information, see [Modify or Drop RUM Events][3].

`longTaskEventMapper`
: The data scrubbing callback for long tasks. This can be used to modify or drop long task events before they are sent to Datadog. For more information, see [Modify or Drop RUM Events][3].

`longTaskThreshold`
: The threshold for RUM long tasks tracking (in seconds). By default, this is set to `0.1` seconds.

`networkSettledResourcePredicate`
: The predicate used to classify "initial" resources for the Time-to-Network-Settled (TNS) view timing calculation.

`nextViewActionPredicate`
: The predicate used to classify the "last" action for the Interaction-to-Next-View (INV) timing calculation.

`onSessionStart`
: (Optional) The method that gets called when RUM starts the session.

`resourceEventMapper`
: The data scrubbing callback for resources. This can be used to modify or drop resource events before they are sent to Datadog. For more information, see [Modify or Drop RUM Events][3].

`sessionSampleRate`
: The sampling rate for RUM sessions. The `sessionSampleRate` value must be between `0.0` and `100.0`. A value of `0.0` means no sessions are sent, while `100.0` means that all sessions are sent to Datadog. The default value is `100.0`. For more information, see [Manage Sessions][9].

`telemetrySampleRate`
: The sampling rate for the SDK internal telemetry utilized by Datadog. This rate controls the number of requests reported to the tracing system. This must be a value between `0` and `100`. By default, this is set to `20`.

`trackAnonymousUser`
: When enabled, the SDK generates a unique, non-personal anonymous user ID that is persisted across app launches. This ID is attached to each RUM Session, allowing you to link sessions originating from the same user/device without collecting personal data. By default, this is set to `true`.

`trackBackgroundEvents`
: Determines whether RUM events are tracked when no view is active. By default, this is set to `false`.

`trackFrustrations`
: Determines whether automatic tracking of user frustrations is enabled. By default, this is set to `true`.

`trackMemoryWarnings`
: Determines whether automatic tracking of memory warnings is enabled. By default, this is set to `true`.

`trackWatchdogTerminations`
: Determines whether the SDK should track application terminations performed by Watchdog. The default setting is `false`.

`uiKitActionsPredicate`
: Enables tracking user interactions (taps) as RUM actions. You can use the default implementation of `predicate` by setting the `DefaultUIKitRUMActionsPredicate` or implement [your own `UIKitRUMActionsPredicate`][4] customized for your app.

`uiKitViewsPredicate`
: Enables tracking `UIViewControllers` as RUM views. You can use default implementation of `predicate` by setting the `DefaultUIKitRUMViewsPredicate` or implement [your own `UIKitRUMViewsPredicate`][5] customized for your app.

`urlSessionTracking`
: Enables tracking `URLSession` tasks (network requests) as RUM resources. The `firstPartyHostsTracing` parameter defines hosts that are categorized as `first-party` resources (if RUM is enabled) and have tracing information injected (if tracing feature is enabled). The `resourceAttributesProvider` parameter defines a closure to provide custom attributes for intercepted resources that is called for each resource collected by the RUM iOS SDK. This closure is called with task information and may return custom resource attributes or `nil` if no attributes should be attached. The `disallowList` parameter defines [URL patterns to exclude from tracking][6].

`viewEventMapper`
: The data scrubbing callback for views. This can be used to modify view events before they are sent to Datadog. For more information, see [Modify or Drop RUM Events][3].

`vitalsUpdateFrequency`
: The preferred frequency for collecting mobile vitals. Available values include: `.frequent` (every 100ms), `.average` (every 500ms), and `.rare` (every 1s). Set to `nil` to disable vitals monitoring.

## Enrich RUM data

To add custom attributes, user information, account information, and other context to your RUM events, see [Enrich RUM Data][11].

[1]: /real_user_monitoring/setup/install/?platform=ios
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=ios
[4]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=ios#automatically-track-user-interactions
[5]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=ios#automatically-track-views
[6]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=ios#exclude-urls-from-rum-resource-tracking
[7]: /error_tracking/frontend/mobile/ios/#add-app-hang-reporting
[8]: https://www.ntppool.org/en/
[9]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=ios
[10]: /real_user_monitoring/remote_configuration/
[11]: /real_user_monitoring/enrich_rum_data/
