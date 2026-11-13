<!--
This partial contains advanced configuration instructions for the Android SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, see the [Android setup instructions][1].

## Initialization parameters

You can use the following methods in `Configuration.Builder` when creating the Datadog configuration to initialize the library:

`setFirstPartyHosts()`
: Defines hosts that have tracing enabled and have RUM resources categorized as `first-party`. Each entry accepts a plain hostname (for example, `"example.com"`) or a wildcard pattern with a single `*` (for example, `"*.example.com"`); the wildcard must target a subdomain of a registrable domain, so patterns like `"*.com"` are dropped. **Note**: If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the SDK in use.

`useSite(DatadogSite)`
: Switches target data to EU1, US1, US3, US5, US1_FED, US2_FED, AP1, and AP2 sites.

`setRemoteConfigurationId(String)`
: Sets the remote configuration ID of your RUM application, so you can update supported SDK settings from Datadog without deploying a new version of your application. See [RUM Remote Configuration][10].

`setFirstPartyHostsWithHeaderType`
: Sets the list of first party hosts and specifies the type of HTTP headers used for distributed tracing. Each entry accepts a plain hostname (for example, `"example.com"`) or a wildcard pattern with a single `*` (for example, `"*.example.com"`); the wildcard must target a subdomain of a registrable domain, so patterns like `"*.com"` are dropped.

`setBatchSize([SMALL|MEDIUM|LARGE])`
: Defines the individual batch size for requests sent to Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])`
: Defines the frequency for requests made to Datadog endpoints (if requests are available).

`setBatchProcessingLevel(LOW|MEDIUM|HIGH)`
: Defines the number of batches sent in each upload cycle.

`setAdditionalConfiguration`
: Allows you to provide additional configuration values that can be used by the SDK.

`setProxy`
: Enables a custom proxy for uploading tracked data to Datadog's intake.

`setEncryption(Encryption)`
: Set an encryption function applied to data stored locally on the device.

`setPersistenceStrategyFactory`
: Allows you to use a custom persistence strategy.

`setCrashReportsEnabled(Boolean)`
: Allows you to control whether JVM crashes are tracked or not. The default value is `true`.

`setBackpressureStrategy(BackPressureStrategy)`
: Define the strategy the SDK uses when handling large volumes of data and internal queues are full.

You can use the following methods in `RumConfiguration.Builder` when creating the RUM configuration to enable RUM features:

`trackUserInteractions(Array<ViewAttributesProvider>)`
: Enables tracking user interactions (such as tap, scroll, or swipe). The parameter also allows you to add custom attributes to the RUM Action events based on the widget with which the user interacted. See [Track User Interactions][8].

`disableUserInteractionTracking`
: Disables the user interaction automatic tracker.

`useViewTrackingStrategy(strategy)`
: Defines the strategy used to track views. See [Automatically track views][2] for more information.

`trackLongTasks(durationThreshold)`
: Enables tracking tasks taking longer than `durationThreshold` on the main thread as long tasks in Datadog. See [Automatically track long tasks][3] for more information.

`trackNonFatalAnrs(Boolean)`
: Enables tracking non-fatal ANRs. This is enabled by default on Android API 29 and below, and disabled by default on Android API 30 and above.

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])`
: Sets the preferred frequency for collecting mobile vitals.

`setSessionSampleRate(<sampleRate>)`
: Sets the RUM sessions sample rate. (A value of 0 means no RUM events are sent. A value of 100 means all sessions are kept.) For more information, see [Manage Sessions][4].

`setSessionListener(RumSessionListener)`
: Sets a listener to be notified on when a new RUM Session starts.

`setTelemetrySampleRate`
: The sampling rate for the SDK internal telemetry utilized by Datadog. This must be a value between `0` and `100`. By default, this is set to `20`.

`setViewEventMapper`
: Sets the ViewEventMapper for the RUM ViewEvent. You can use this interface implementation to modify the ViewEvent attributes before serialization.

`setResourceEventMapper`
: Sets the EventMapper for the RUM ResourceEvent. You can use this interface implementation to modify the ResourceEvent attributes before serialization.

`setActionEventMapper`
: Sets the EventMapper for the RUM ActionEvent. You can use this interface implementation to modify the ActionEvent attributes before serialization.

`setErrorEventMapper`
: Sets the EventMapper for the RUM ErrorEvent. You can use this interface implementation to modify the ErrorEvent attributes before serialization.

`setInitialResourceIdentifier`
: Sets a custom identifier for initial network resources used for [Time-to-Network-Settled][5] (TNS) view timing calculation.

`setLastInteractionIdentifier`
: Sets a custom identifier for the last interaction in the previous view used for [Interaction-to-Next-View][6] (INV) timing calculation.

`setLongTaskEventMapper`
: Sets the EventMapper for the RUM LongTaskEvent. You can use this interface implementation to modify the LongTaskEvent attributes before serialization.

`trackBackgroundEvents`
: Enable/disable tracking RUM events when no activity is happening in the foreground. By default, background events are not tracked. Enabling this feature might increase the number of sessions tracked, and therefore your billing. See [Track Background Events][7].

`trackFrustrations`
: Enable/disable tracking of frustration signals.

`useCustomEndpoint`
: Use RUM to target a custom server.

`trackAnonymousUser`
: When enabled, the SDK generates a unique, non-personal anonymous user ID that is persisted across app launches. This ID is attached to each RUM Session, allowing you to link sessions originating from the same user/device without collecting personal data. By default, this is set to `true`.

`collectAccessibility`
: Determines whether accessibility settings are collected and included in RUM view events. By default, this is set to `false`.

## Enrich RUM data

To add custom attributes, user information, account information, feature flags, and more to your RUM events, see [Enrich RUM Data][9].

[1]: /real_user_monitoring/setup/install/?platform=android
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=android#automatically-track-views
[3]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=android#automatically-track-long-tasks
[4]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=android
[5]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=android#time-to-network-settled
[6]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=android#interaction-to-next-view
[7]: /real_user_monitoring/setup/enable_rum/track_background_events/?platform=android
[8]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=android#automatically-track-user-interactions
[9]: /real_user_monitoring/enrich_rum_data/
[10]: /real_user_monitoring/remote_configuration/
