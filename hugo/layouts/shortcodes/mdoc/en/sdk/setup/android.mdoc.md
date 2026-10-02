<!--
This partial contains setup instructions for the Android SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your Android applications with the Datadog Android SDK.

The Android SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Session Replay][3], and [Product Analytics][4]. It works with Android 6.0+ (API level 23) and supports the Android ecosystem and Android-based operating systems, including Android TV, Android Automotive OS, and Amazon Fire OS.

## Setup

**Choose your setup method:**

- **[Agentic Onboarding (in Preview)][5]**: Use AI coding agents (Cursor, Claude Code) to automatically instrument your application with one prompt. The agent detects your project structure and configures the RUM SDK for you.
- **Manual setup** (below): Follow the step-by-step instructions to manually add and configure the SDK.

### Manual setup

{% stepper level="h4" %}

{% step title="Add the dependencies" %}
Declare [dd-sdk-android-rum][6] and the [Gradle plugin][7] as dependencies in your **application module's** `build.gradle` file.

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x"
    //(...)
}

```
{% /step %}

{% step title="Initialize the SDK" %}

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `APP_VARIANT_NAME` specifies the variant of the application that generates data. For more information, see [Using Tags][8].

Add the remote configuration ID of your RUM application with `setRemoteConfigurationId()` to update SDK settings from Datadog without deploying a new version of your application. For more information, see [RUM Remote Configuration][9]. See [other configuration options][10] to initialize the library.

{% site-region region="us" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
        )
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="eu" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.EU1)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.EU1)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="us3" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.US3)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.US3)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="us5" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.US5)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.US5)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.US1_FED)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.US1_FED)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov2" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.US2_FED)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.US2_FED)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="ap1" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.AP1)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.AP1)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="ap2" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.AP2)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.AP2)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="uk1" %}
{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                clientToken = "<CLIENT_TOKEN>",
                env = "<ENV_NAME>",
                variant = "<APP_VARIANT_NAME>"
            )
            .useSite(DatadogSite.UK1)
            .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
            .build()

        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
                        .useSite(DatadogSite.UK1)
                        .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
                        .build();

        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```

{% /tab %}
{% /tabs %}
{% /site-region %}

The initialization credentials require your application's variant name and use the value of `BuildConfig.FLAVOR`. With the variant, the SDK can match the errors reported from your application to the mapping files uploaded by the Gradle plugin. If you do not have variants, the credentials use an empty string.

The Gradle plugin automatically uploads the appropriate ProGuard `mapping.txt` file at build time so you can view deobfuscated error stack traces. For more information, see [Upload debug symbols][11].
{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

To be compliant with the GDPR regulation, the SDK requires the tracking consent value upon initialization.

Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or events.

To **update the tracking consent** after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.
{% /step %}

{% step title="Enable RUM to start sending data" %}

To start sending RUM data, see [Enable the Datadog RUM module][12].
{% /step %}

{% /stepper %}

## Sending data when device is offline

The Android SDK keeps data available when your user device is offline. In case of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches.

Each batch follows the intake specification. Batches are sent as soon as the network is available, and the battery is high enough that the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost. To keep the SDK from using too much disk space, the data on the disk is automatically discarded if it gets too old.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/android
[3]: /session_replay/mobile/
[4]: /product_analytics/
[5]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
[6]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[7]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[8]: /getting_started/tagging/using_tags/#rum--session-replay
[9]: /real_user_monitoring/remote_configuration/
[10]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=android#initialization-parameters
[11]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=android#upload-debug-symbols-to-get-deobfuscated-stack-traces
[12]: /real_user_monitoring/setup/enable_rum/?platform=android
