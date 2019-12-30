---
title: Android Log Collection
kind: documentation
further_reading:
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: "Github"
  text: "dd-sdk-android Source code"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

Send logs to Datadog from your Android applications with [Datadog's `dd-sdk-android` client-side Kotlin logging library][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Add `context` and extra custom attributes to each log sent.
* Forward Java/Kotlin caught exceptions automatically.
* Record real client IP addresses and User Agent.
* Optimized network usage with automatic bulk posts.

**Note**: The `dd-sdk-android` library supports all Android versions from API level 21 (Lollipop).

## Setup

1. Add the Gradle dependency by declaring the libbrary as a dependency in your `build.gradle` file:

    ```conf
    repositories {
        maven { url "https://dl.bintray.com/datadog/datadog-maven" }
    }

    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. Initialize the library with your application context and your Datadog Client token. A [Datadog client token][2] is used here for security reasons, [Datadog API keys][3] cannot be used to configure the `dd-sdk-android` library as they would be exposed client-side in the Android application APK bytecode. For more information about setting up a client token, see the [Client token documentation][2]:

    {{< tabs >}}
    {{% tab "US" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Datadog.initialize(this, BuildConfig.DD_CLIENT_TOKEN)
    }
}
```

    {{% /tab %}}
    {{% tab "EU" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Datadog.initialize(this, BuildConfig.DD_CLIENT_TOKEN, Datadog.DATADOG_EU)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

3. Send a custom log entry directly to Datadog with one of the following functions:

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning…")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

    Exceptions caught can be sent with a message as follow:

    ```kotlin
    try {
        doSomething()
    } catch (e : IOException) {
        logger.e("Error while doing something", e)
    }
    ```

    **Note**: All logging methods can have a throwable attached to them.

4. (Optional) - Provide a map alongside your log message to add attributes to the emitted log. Each entry of the map is added as an attribute.

    ```kotlin
    logger.i("onPageStarted", attributes = mapOf("http.url", url))
    ```

    In java you would have:

    ```java
    Logger.d(
            "onPageStarted",
            null,
            new HashMap<String, Object>() {{
                put("http.url", url);
            }}
    );
    ```

## Advanced logging

### Initialization

The following parameters can be used when initializing the logger to send logs to Datadog:

| Method                           | Description                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Add `network.client.connectivity` attribute to all log. The data logged by default is `connectivity` (`Wifi`, `3G`, `4G`...) and `carrier_name` (`AT&T - US`). `Carrier_name` is only available for Android API level 28 and above. |
| `setServiceName(<SERVICE_NAME>)` | Set `<SERVICE_NAME>` as value for the `service` [standard attribute][4] attached to all log sent to Datadog.                                                 |
| `setLogcatLogsEnabled(true)`     | Set to `true` to use Logcat as logger.                                                                                                                                                                                              |
| `setDatadogLogsEnabled(true)`    | Set to `true` to send logs to Datadog.                                                                                                                                                                                              |
| `setLoggerName(<LOGGER_NAME>)`   | Set `<LOGGER_NAME>` as value for the `logger.name` attribute attached to all log sent to Datadog.                                                                                                                                   |
| `setVerbosity(Log.INFO)`         | Set the verbosity of the logger. All internal messages in the library with a priority equal or higher than the provided level will be logged to Android's LogCat.                                                                   |
| `build()`                        | Build a new logger instance with all options set.                                                                                                                                                                                   |

### Global configuration

Find below functions to add/remove tags and attributes to all logs sent by a given logger.

#### Global Tags

##### Add Tags

Use the `addTag("<TAG_KEY>","<TAG_VALUE>")` function to add tags to all logs sent by a specific logger:

```kotlin
// This adds a tag "build_type:debug" or "build_type:release" accordingly
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// This adds a tag "device:android"
logger.addTag("device", "android")
```

**Note**: `<TAG_VALUE>` must be a String.

##### Remove Tags

Use the `removeTagsWithKey("<TAG_KEY>")` function to remove tags from all logs sent by a specific logger:

```kotlin
// This removes any tag starting with "build_type"
logger.removeTagsWithKey("build_type")
```

[Learn more about Datadog tags][5].

#### Global Attributes

##### Add attributes

By default, the following attributes are added to all logs send by a logger:

* `http.useragent` and its extracted `device` and `OS` properties
* `network.client.ip` and its extracted geographical properties (`country`, `city`)

Use the `addAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` function to add a custom attribute to all logs sent by a specific logger:

```kotlin
// This adds an attribute "version_code" with an integer value
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// This adds an attribute "version_name" with a String value
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

**Note**: `<ATTRIBUTE_VALUE>` can be any primitive, String, or Date.

##### Remove attributes

Use the `removeAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` function to remove a custom attribute from all logs sent by a specific logger:

```kotlin
// This removes the attribute "version_code" from all further log send.
logger.removeAttribute("version_code")

// This removes the attribute "version_name" from all further log send.
logger.removeAttribute("version_name")
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/logs/processing/attributes_naming_convention/
[5]: https://docs.datadoghq.com/tagging/
