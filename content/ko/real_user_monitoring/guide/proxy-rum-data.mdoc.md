---
aliases:
- /ko/real_user_monitoring/faq/proxy_rum_data/
content_filters:
- label: SDK source
  option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_proxying_options
  trait_id: rum_browser_sdk_version
description: SDK 소스 옵션 및 버전별 설정을 사용하여 브라우저 RUM 데이터 프록시를 구성하고, 맞춤형 네트워크 라우팅을 설정합니다.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Real User Monitoring에 대해 알아보기
title: 브라우저 RUM 데이터 프록시 구성하기
---
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
프록시 구성의 보안 취약점을 피하기 위해 브라우저 SDK `4.34.0` 이상으로 업그레이드하십시오.
{% /alert %}
{% /if %}

## 개요 {% #overview %}

RUM 브라우저 SDK는 요청을 프록시를 통해 전송하도록 구성할 수 있습니다. SDK의 `proxy` [초기화 매개변수][1]를 `https://www.example-proxy.com/any-endpoint`와 같은 URL로 설정하면 모든 RUM 데이터가 POST 방법을 사용하여 해당 URL로 전송됩니다. RUM 데이터는 여전히 프록시에서 Datadog으로 전달되어야 합니다.

## 필수 프록시 설정 {% #prerequisite-proxy-setup %}

요청을 Datadog으로 성공적으로 전달하려면 프록시가 다음을 수행해야 합니다.

1. [Datadog 수집 URL을 구축합니다](#build-the-datadog-intake-url).
2. 정확한 geoIP를 위해 요청 클라이언트 IP 주소를 포함하는 `X-Forwarded-For` 헤더를 추가하십시오.
3. POST 방법을 사용하여 요청을 Datadog 수집 URL로 전달하십시오.
4. 요청 본문은 변경하지 마세요.

{% alert level="warning" %}
- 보안상의 이유로 `cookie` 헤더와 같이 민감한 정보를 포함할 수 있는 HTTP 헤더를 제거하십시오.
- 요청 본문은 이진 데이터를 포함할 수 있으며 문자열로 변환되지 않아야 합니다. 프록시 구현이 변환 없이 원시 본문을 전달하는지 확인하십시오.
- 프록시 구현이 악의적인 행위자가 다른 서버에 요청을 보내지 않도록 허용하지 않는지 확인하십시오. 예: `https://browser-intake-datadoghq.com.malicious.com`.
{% /alert %}

### Datadog 수집 URL {% #build-the-datadog-intake-url %}을 구축하십시오.

귀하의 Datadog 수집 URL은 `<INTAKE_ORIGIN>/<PATH><PARAMETERS>` 형식을 가져야 하며 (예: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`)입니다.

{% table %}
---
* 수집 출처
* 
    Datadog 수집 출처는 귀하의 `site` [초기화 매개변수][1]에 해당합니다. 귀하의 사이트 매개변수에 해당하는 Datadog 수집 출처는 프록시 구현에서 정의되어야 합니다.

    {% site-region region="us" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-datadoghq.com`입니다.
    {% /site-region %}

    {% site-region region="us3" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-us3-datadoghq.com`입니다.
    {% /site-region %}

    {% site-region region="us5" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-us5-datadoghq.com`입니다.
    {% /site-region %}

    {% site-region region="eu" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-datadoghq.eu`입니다.
    {% /site-region %}

    {% site-region region="ap1" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-ap1-datadoghq.com`입니다.
    {% /site-region %}

    {% site-region region="ap2" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-ap2-datadoghq.com`입니다.
    {% /site-region %}

    {% site-region region="gov" %}
    귀하의 Datadog 사이트에 대한 수집 출처는 `https://browser-intake-ddog-gov.com`입니다.
    {% /site-region %}
---
* 경로
* 
    경로에는 API 버전과 제품이 포함되어 있습니다(예: RUM 데이터의 경우 `/api/v2/rum` 또는 세션 리플레이 데이터의 경우 `/api/v2/replay`). 
    
    각 요청의 경로는 요청의 `ddforward` 매개변수에서 접근할 수 있습니다(예: `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* 매개변수
* 
    요청 매개변수 (예: `ddsource=browser&...`)는 요청의 `ddforward` 매개변수를 통해 접근할 수 있습니다 (예: `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

{% /table %}

## SDK 설정 {% #sdk-setup %}

<!-- SDK version >4.34.0 이상 -->
{% if includes($rum_browser_sdk_version, ["gte_5_4_0", "gte_4_34_0"]) %}

`proxy` 초기화 매개변수에서 프록시의 URL을 구성하십시오:

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: '<YOUR_PROXY_URL>',
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```

{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```
{% /if %}
<!-- end CDN sync -->

RUM 브라우저 SDK는 모든 요청에 `ddforward` 쿼리 매개변수를 추가합니다. 이 쿼리 매개변수에는 모든 데이터가 전달되어야 하는 URL 경로와 매개변수가 포함되어 있습니다.

예를 들어, `site`가 `datadoghq.eu`로 설정되고 `proxy`가 `https://example.org/datadog-intake-proxy`로 설정되면, RUM 브라우저 SDK는 다음과 같은 URL로 요청을 보냅니다: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. 프록시는 요청을 `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`로 전달합니다.

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### `proxy` 초기화 매개변수에 함수를 전달하기 {% #passing-a-function-to-the-proxy-initialization-parameter %}

`proxy` 초기화 매개변수는 함수 입력도 지원합니다. 이 함수는 경로와 매개변수가 프록시 URL에 추가되는 방식을 더 잘 제어할 수 있게 해줍니다.

이 함수는 다음 속성을 가진 객체를 받습니다:

- `path`: Datadog 요청의 경로 (예: `/api/v2/rum`)
- `parameters`: Datadog 요청의 매개변수 (예: `ddsource=browser&...`)

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```
{% /if %}
<!-- end CDN sync -->

**참고:**
- 일부 개인 정보 차단기가 이미 수집 [URL 패턴][2]을 대상으로 하고 있으므로, 프록시 URL을 구축할 때 이를 고려하는 것이 좋습니다.
- 각 요청에 대해 `proxy` 함수가 호출되므로, 무거운 계산을 피해야 합니다.
- **JSP 웹 애플리케이션**은 이러한 매개변수를 브라우저에 올바르게 전파하기 위해 `\` 이스케이프 문자를 사용해야 합니다. 예:
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0 이상 -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
브라우저 SDK v4.34.0 이전에는 `proxyUrl` 초기화 매개변수가 사용되었으며, Datadog 수집 출처가 `ddforward` 속성에 포함되었습니다. 프록시 구현은 이 호스트를 검증하는 책임이 있었으며, 검증에 실패하면 다양한 취약점이 발생했습니다.

Datadog 수집 출처는 보안을 보장하기 위해 프록시 구현에서 정의되어야 합니다.

**보안 취약점을 피하기 위해, 브라우저 SDK `4.34.0` 이상으로 업그레이드해야 합니다.**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /ko/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840