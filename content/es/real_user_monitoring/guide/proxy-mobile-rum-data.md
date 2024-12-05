---
aliases:
- /es/real_user_monitoring/faq/proxy_mobile_rum_data/
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre Real User Monitoring
title: Usar proxy con tus datos RUM móviles
---

## Información general

Los SDK móviles de RUM pueden configurarse para enviar solicitudes a través de proxy.

Los proxies utilizan [OkHttpClient Proxy y Authenticator][2] en Android y [URLSessionConfiguration.connectionProxyDictionary][3] en iOS.

## Proxy HTTP/HTTPS

### Requisito previo de configuración del proxy

Para reenviar correctamente una solicitud a Datadog, tu proxy debe admitir solicitudes [HTTP CONNECT][1].

### Configuración recomendada del SDK

{{< tabs >}}
{{% tab "Android" %}}

Al inicializar el SDK de Android, especifica la siguiente configuración de proxy:

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.HTTP, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

Para obtener más información, consulta la documentación de [OkHttpClient Proxy y Authenticator][2].

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de iOS, especifica la siguiente configuración de proxy:

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

Para más información, consulta la documentación de [URLSessionConfiguration.connectionProxyDictionary][3].

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

Al inicializar el SDK de React Native, especifica la siguiente configuración de proxy:

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.HTTPS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## SOCKS proxy

### Requisito previo de configuración del proxy

Para reenviar correctamente una solicitud a Datadog, tu proxy debe admitir [SOCKS5 proxying][4].

### Configuración recomendada del SDK

{{< tabs >}}
{{% tab "Android" %}}
Al inicializar el SDK de Android, especifica la siguiente configuración de proxy:

```kotlin
val configBuilder = Configuration.Builder(
    clientToken = "<client token>",
    env = "<environment>"
)

val proxy = Proxy(Proxy.Type.SOCKS, InetSocketAddress("<www.example.com>", <123>))
val authenticator = ProxyAuthenticator("<proxy user>", "<proxy password>")

configBuilder.setProxy(proxy, authenticator)
```

Para obtener más información, consulta la documentación de [OkHttpClient Proxy y Authenticator][2].

[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html

{{% /tab %}}
{{% tab "iOS" %}}
Al inicializar el SDK de iOS, especifica la siguiente configuración de proxy:

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

Para más información, consulta la documentación de [URLSessionConfiguration.connectionProxyDictionary][3].

[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary

{{% /tab %}}
{{% tab "React Native" %}}

Al inicializar el SDK de React Native, especifica la siguiente configuración de proxy:

```javascript
import { DatadogProviderConfiguration, ProxyConfiguration, ProxyType } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration('<client token>', '<environment>', '<application id>');

config.proxyConfig = new ProxyConfiguration(ProxyType.SOCKS, '<www.example.com>', <123>, '<proxy user>', '<proxy password>');
```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc9110#CONNECT
[2]: https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html
[3]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[4]: https://datatracker.ietf.org/doc/html/rfc1928