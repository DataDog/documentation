---
title: Proxy Your Mobile RUM Data
kind: guide
aliases:
  - /real_user_monitoring/faq/proxy_mobile_rum_data/
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

## Overview

The RUM Mobile SDKs can be configured to send requests through a proxy.

Proxies use [OkHttpClient Proxy and Authenticator][2] on Android and [URLSessionConfiguration.connectionProxyDictionary][3] on iOS.

## HTTP/HTTPS proxy

### Prerequisite proxy setup

To successfully forward a request to Datadog, your proxy must support [HTTP CONNECT][1] requests.

### Recommended SDK setup

{{< tabs >}}
{{% tab "Android" %}}

When initializing the Android SDK, specify the following proxy configuration:

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.HTTP, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

For more information, see the [OkHttpClient Proxy and Authenticator][2] documentation.

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}

When initializing the iOS SDK, specify the following proxy configuration:
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    proxyConfiguration: [
        kCFNetworkProxiesHTTPEnable: true,
        kCFNetworkProxiesHTTPPort: <123>,
        kCFNetworkProxiesHTTPProxy: "<www.example.com>",
        kCFProxyUsernameKey: "<proxy user>",
        kCFProxyPasswordKey: "<proxy password>"
    ]
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.proxyConfiguration = @{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @<123>,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"<www.example.com>",
    (NSString *)kCFProxyUsernameKey: @"<proxyuser>",
    (NSString *)kCFProxyPasswordKey: @"<proxypass>"
};

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}

For more information, see the [URLSessionConfiguration.connectionProxyDictionary][3] documentation.

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

When initializing the React Native SDK, specify the following proxy configuration:

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.HTTPS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## SOCKS proxy

### Prerequisite proxy setup

To successfully forward a request to Datadog, your proxy must support [SOCKS5 proxying][4].

### Recommended SDK setup

{{< tabs >}}
{{% tab "Android" %}}
When initializing the Android SDK, specify the following proxy configuration:

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.SOCKS, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

For more information, see the [OkHttpClient Proxy and Authenticator][2] documentation.

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}
When initializing the iOS SDK, specify the following proxy configuration:
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    proxyConfiguration: [
        kCFNetworkProxiesSOCKSEnable: true,
        kCFNetworkProxiesSOCKSPort: <123>,
        kCFNetworkProxiesSOCKSProxy: "<www.example.com>",
        kCFProxyUsernameKey: "<proxy user>",
        kCFProxyPasswordKey: "<proxy password>"
    ]
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.proxyConfiguration = @{
    (NSString *)kCFNetworkProxiesSOCKSEnable: @YES,
    (NSString *)kCFNetworkProxiesSOCKSPort: @<123>,
    (NSString *)kCFNetworkProxiesSOCKSProxy: @"<www.example.com>",
    (NSString *)kCFProxyUsernameKey: @"<proxyuser>",
    (NSString *)kCFProxyPasswordKey: @"<proxypass>"
};

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}

For more information, see the [URLSessionConfiguration.connectionProxyDictionary][3] documentation.

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

When initializing the React Native SDK, specify the following proxy configuration:

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.SOCKS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc9110#CONNECT
[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html
[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[4]: https://datatracker.ietf.org/doc/html/rfc1928
