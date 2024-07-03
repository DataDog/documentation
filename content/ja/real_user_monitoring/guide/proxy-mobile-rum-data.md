---
aliases:
- /ja/real_user_monitoring/faq/proxy_mobile_rum_data/
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn about Real User Monitoring
title: Proxy Your Mobile RUM Data
---

## 概要

RUM モバイル SDK は、プロキシを介してリクエストを送信するように構成できます。

プロキシは、Android では [OkHttpClient Proxy and Authenticator][2] を、iOS では [URLSessionConfiguration.connectionProxyDictionary][3] を使用します。

## HTTP/HTTPS プロキシ

### Prerequisite proxy setup

リクエストを Datadog に正常に転送するには、プロキシが [HTTP CONNECT][1] をサポートしている必要があります。

### Recommended SDK setup

{{< tabs >}}
{{% tab "Android" %}}

Android SDK の初期化時に、以下のプロキシ構成を指定します。

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.HTTP, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

詳細については、[OkHttpClient の Proxy と Authenticator][2]のドキュメントを参照してください。

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}

iOS SDK の初期化時に、以下のプロキシ構成を指定します。

#### Swift
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

#### Objective C
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

詳しくは、[URLSessionConfiguration.connectionProxyDictionary][3] のドキュメントを参照してください。

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

React Native SDK の初期化時に、以下のプロキシ構成を指定します。

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.HTTPS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## SOCKS プロキシ

### Prerequisite proxy setup

リクエストを Datadog に正常に転送するには、プロキシが [SOCKS5 プロキシ][4]をサポートしている必要があります。

### Recommended SDK setup

{{< tabs >}}
{{% tab "Android" %}}
Android SDK の初期化時に、以下のプロキシ構成を指定します。

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.SOCKS, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

詳細については、[OkHttpClient の Proxy と Authenticator][2]のドキュメントを参照してください。

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}
iOS SDK の初期化時に、以下のプロキシ構成を指定します。

#### Swift
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

#### Objective C
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

詳しくは、[URLSessionConfiguration.connectionProxyDictionary][3] のドキュメントを参照してください。

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

React Native SDK の初期化時に、以下のプロキシ構成を指定します。

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.SOCKS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc9110#CONNECT
[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html
[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[4]: https://datatracker.ietf.org/doc/html/rfc1928