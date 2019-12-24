---
title: Android Log Collection
kind: documentation
aliases:
  - /logs/log_collection/android
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---


Send logs to Datadog from Android applications thanks to Datadog's `dd-sdk-android` client-side Kotlin logging library.

With the `dd-sdk-android` library, you can send logs directly to Datadog from Android applications and leverage the following features:

* Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
* Add `context` and extra custom attributes to each log sent.
* Forward Java/Kotlin caught exceptions.
* Record real client IP addresses and user agents.
* Optimized network usage with automatic bulk posts.

## Get a Client Token

For security reasons, [API keys][1] cannot be used to configure the `dd-sdk-android` library, as they would be exposed client-side in the Android application APK bytecode. To collect logs from Android applications, a [client token][2] must be used. For more information about setting up a client tolken, see the [Client tokens documentation][2].

## Configure the Android logger

### Add the Gradle dependency

The project is hosted in Datadog's Maven repository. You can declare it as a dependency in your `build.gradle` as follow:

```
repositories {
    maven { url "https://dl.bintray.com/datadog/datadog-maven" }
}

dependencies {
    implementation "com.datadoghq:dd-sdk-android:x.x.x"
}
```

### Initialize the library

Before using the SDK, you need to setup the library with your application context and your API token (**only client tokens can be used in this library**)

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

### Configure the Android logger

You can create different loggers, which can be convenient when several teams are working on the same project.

The following parameters can be used to configure the library to send logs to Datadog:

| Method        | Description           |  Example  |
| ------------- | ------------- |  ----- |
| `setNetworkInfoEnabled(shouldEnable)` | adds `network.client.connectivity` field from all events. The data logged by default is `connectivity` (Wifi, 3G, 4G...) and `carrier_name` (AT&T - US). `Carrier_name` is only available for Android API level 28 and above                                                                     | `true` |
| `setServiceName(serviceName)`         | Set the logger and the application name in the `service` standard attribute.                                                                                                | `my_android_application`|
| `setLogcatLogsEnabled(shouldEnable)`  | Enable to have the library use Logcat as logger  | `true` |
| `setDatadogLogsEnabled(shouldEnable)` | Enable to have the library send logs to Datadog  | `true` |
| `setLoggerName(myLoggerName)`         | Define the `logger.name` attribute               | `appLogger` |
| `build()`                             | Build a new logger instance with all options set | |

The logger adds the following information by default:

* `http.useragent` and its extracted `device` and `OS` properties
* `network.client.ip` and its extracted geographical properties (`country`, `city`)

## Send a custom log entry

Send a custom log entry directly to Datadog with one of the following functions:

```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning…")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
```

### Logging Errors

Exceptions caught can be sent with a message as follow:

```kotlin
    try {
        doSomething()
    } catch (e : IOException) {
        logger.e("Error while doing something", e)
    }
```

> Note: All logging methods can have a throwable attached to them.

## Adding context

### Tags

Tags take the form of a single String, but can also represent key-value pairs when using a colon, and are
You can add tags to a specific logger as follow:

```kotlin
    // This will add a tag "build_type:debug" or "build_type:release" accordingly
    logger.addTag("build_type", BuildConfig.BUILD_TYPE)

    // This will add a tag "android"
    logger.addTag("android")
```

You can remove tags from a specific logger as follow:

```kotlin
    // This will remove any tag starting with "build_type:"
    logger.removeTagsWithKey("build_type")

    // This will remove the tag "android"
    logger.removeTag("android")
```

### Attributes

Attributes are always in the form of a key-value pair. The value can be any primitive, String or Date.
You can add attributes to a specific logger as follow:

```kotlin
    // This will add an attribute "version_code" with an integer value
    logger.addAttribute("version_code", BuildConfig.VERSION_CODE)
    // This will add an attribute "version_name" with a String value
    logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

You can remove attributes from a specific logger as follow:

```kotlin
    logger.removeAttribute("version_code")
    logger.removeAttribute("version_name")
```

### Local Attributes

Sometimes, you might want to log a message with attributes only for that specific message. You can
do so by providing a map alongside the message, each entry being added as an attribute.

```kotlin
    logger.i("onPageStarted", attributes = mapOf("http.url", url))
```

In Java you can do so as follow:
```java
    mLogger.d(
            "onPageStarted",
            null,
            new HashMap<String, Object>() {{
                put("http.url", url);
            }}
    );
```

## Setting the Library's verbosity

If you need to get information about the Library, you can set the verbosity
level as follow:

```kotlin
    Datadog.setVerbosity(Log.INFO)
```

All the internal messages in the library with a priority equal or higher than
the provided level will be logged to Android's LogCat.

**Example:**

```java
...
// Add extra fields for all elogs sent to Datadog
      logger.addAttribute("string","some piece of text");
      logger.addAttribute("float",1.337);
      logger.addAttribute("custom_date",new Date());
...
      mLogger.w(
            "onPageStarted",
            null,
            new HashMap<String, Object>() {{
                put("business.sales", 37);
            }}
    );
...
```

This gives the following result:

```
{
	"id": "AQAAAW84EiGl6N3HsgAAAABBVzg0RWlHbDk3UGYtR1d5UldLWg",
	"content": {
		"timestamp": "2019-12-24T13:21:49.989Z",
		"tags": [
			"source:mobile"
		],
		"service": "com.example.app.android",
		"message": "onPageStarted",
		"attributes": {
			"service": "com.example.app.android",
			"logger": {
				"thread_name": "main",
				"name": "testApp"
			},
			"http": {
				"useragent": "Dalvik/2.1.0 (Linux; U; Android 9; ONEPLUS A5000 Build/PKQ1.180716.001)",
				"useragent_details": {
					"os": {
						"family": "Android",
						"major": "9"
					},
					"browser": {
						"family": "Other"
					},
					"device": {
						"family": "OnePlus ONEPLUS A5000",
						"model": "ONEPLUS A5000",
						"category": "Mobile",
						"brand": "OnePlus"
					}
				}
			},
			"sales": 37,
			"network": {
				"client": {
					"geoip": {
						"continent": {
							"name": "Europe",
							"code": "EU"
						},
						"country": {
							"name": "France",
							"iso_code": "FR"
						},
						"subdivision": {
							"name": "Paris",
							"iso_code": "75"
						},
						"city": {
							"name": "Paris"
						},
						"ipAddress": "92.184.X.X"
					},
					"ip": "92.184.X.X",
					"connectivity": "network_4g",
					"sim_carrier": {
						"name": "T-Mobile - US",
						"id": 1
					}
				}
			},
			"status": "INFO",
			"date": "2019-12-24T14:20:48.591+0100",
			"string": "some piece of text",
			"custom_date": 1577193638052,
			"float": 1.337,
			"build_type": "debug"
		}
	}
}
```

## Supported Android versions

The `dd-sdk-android` library supports all Android versions from API level 21 (Lollipop)

## Source code
https://github.com/DataDog/dd-sdk-android

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
