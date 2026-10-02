<!--
This partial contains advanced configuration instructions for the Kotlin Multiplatform SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, see the [Kotlin Multiplatform setup instructions][1].

## Initialization parameters

You can use the following methods in `Configuration.Builder` when creating the Datadog configuration to initialize the library:

`useSite(DatadogSite)`
: Switches target data to EU, US1, US3, US5, US1_FED, US2_FED, AP1, and AP2 sites.

`setBatchSize([SMALL|MEDIUM|LARGE])`
: Defines the individual batch size for requests sent to Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])`
: Defines the frequency for requests made to Datadog endpoints (if requests are available).

`setBatchProcessingLevel(LOW|MEDIUM|HIGH)`
: Defines the number of batches sent in each upload cycle.

`trackCrashes(Boolean)`
: Allows you to control whether JVM/iOS crashes are tracked or not. The default value is `true`.

You can use the following methods in `RumConfiguration.Builder` when creating the RUM configuration to enable RUM features:

### Common configuration methods

`trackLongTasks(durationThreshold)`
: Enables tracking tasks taking longer than `durationThreshold` on the main thread as long tasks in Datadog. See [Automatically track long tasks][2] for more information.

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])`
: Sets the preferred frequency for collecting mobile vitals.

`setSessionSampleRate(<sampleRate>)`
: Sets the RUM sessions sample rate. (A value of 0 means no RUM events are sent. A value of 100 means all sessions are kept.) For more information, see [Manage Sessions][3].

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

`setLongTaskEventMapper`
: Sets the EventMapper for the RUM LongTaskEvent. You can use this interface implementation to modify the LongTaskEvent attributes before serialization.

`trackBackgroundEvents`
: Enable/disable tracking RUM events when no activity is happening in the foreground. By default, background events are not tracked. Enabling this feature might increase the number of sessions tracked, and therefore your billing. See [Track Background Events][4].

`trackFrustrations`
: Enable/disable tracking of frustration signals.

### Android configuration methods

These methods can be accessed only from Android source set.

`trackNonFatalAnrs(Boolean)`
: Enables tracking non-fatal ANRs. This is enabled by default on Android API 29 and below, and disabled by default on Android API 30 and above.

`trackUserInteractions(Array<ViewAttributesProvider>)`
: Enables tracking user interactions (such as tap, scroll, or swipe). The parameter also allows you to add custom attributes to the RUM Action events based on the widget with which the user interacted. See [Track User Interactions][7].

`useViewTrackingStrategy(strategy)`
: Defines the strategy used to track views. See [Automatically track views][5] for more information.

### iOS configuration methods

`trackUiKitViews(UIKitRUMViewsPredicate)`
: Enable automatic tracking of `UIViewController`s as RUM views. See [Automatically track views][5] for more information.

`trackUiKitActions(UIKitRUMActionsPredicate)`
: Enable automatic tracking of `UITouch` events as RUM actions. The predicate implementation should return RUM action parameters if the given interaction should be accepted, or `null` to ignore it. By default, all touches are accepted. See [Track User Interactions][7].

`setAppHangThreshold(Long)`
: Enables app hangs monitoring with the given threshold (in milliseconds). See [Add app hang reporting][6] for more information.

## Enrich RUM data

To add custom attributes, user information, account information, feature flags, and more to your RUM events, see [Enrich RUM Data][8].

[1]: /real_user_monitoring/setup/install/?platform=kotlin_multiplatform
[2]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=kotlin_multiplatform#automatically-track-long-tasks
[3]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=kotlin_multiplatform
[4]: /real_user_monitoring/setup/enable_rum/track_background_events/?platform=kotlin_multiplatform
[5]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=kotlin_multiplatform#automatically-track-views
[6]: /error_tracking/frontend/mobile/ios/#step-5---add-app-hang-reporting
[7]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=kotlin_multiplatform#automatically-track-user-interactions
[8]: /real_user_monitoring/enrich_rum_data/
