---
aliases:
- /ko/real_user_monitoring/faq/proxy_rum_data/
content_filters:
- label: SDK source
  option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_proxying_options
  trait_id: rum_browser_sdk_version
description: 사용자 지정 네트워크 라우팅을 위해 SDK 소스 옵션 및 버전별 설정을 사용해 브라우저 RUM 데이터 프록시를 구성합니다.
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: Real User Monitoring에 대해 알아보기
title: 브라우저 RUM 데이터 프록시
---
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
프록시 구성의 보안 취약성을 피하려면 브라우저 SDK `4.34.0` 이후 버전으로 업그레이드하세요.
{% /alert %}
{% /if %}

## 개요 {% #overview %}

프록시를 통해 요청을 보내도록 RUM 브라우저 SDK를 구성할 수 있습니다. SDK의 `proxy` [초기화 파라미터][1]를 `https://www.example-proxy.com/any-endpoint`와 같은 URL로 설정하면 모든 RUM 데이터가 POST 메서드를 사용해 해당 URL로 전송됩니다. 그래도 RUM 데이터를 프록시에서 Datadog으로 전달해야 하기는 마찬가지입니다.

## 프록시 설정 전제 조건 {% #prerequisite-proxy-setup %}

Datadog에 요청을 전달하려면 프록시가 충족해야 하는 조건

1. [Datadog 인테이크 URL을 구축합니다](#build-the-datadog-intake-url).
2. 정확한 geoIP에 해당하는 클라이언트 IP 주소를 포함한 `X-Forwarded-For` 헤더를 추가합니다.
3. POST 메서드를 사용하여 요청을 Datadog 인테이크 URL로 전달합니다.
4. 요청 본문은 변경하지 말고 그대로 둡니다.

{% alert level="warning" %}
- 보안상의 이유로, `cookie` 헤더와 같은 민감한 정보를 포함할 가능성이 있는 HTTP 헤더는 모두 제거합니다.
- 요청 본문은 바이너리 데이터를 포함할 수 있으며 문자열로 변환하면 안 됩니다. 프록시 구현이 변환 없이 원시 본문을 전달해야 합니다.
- 프록시 구현이 악성 행위자가 요청을 다른 서버로 보내지 못하도록 해야 합니다. 예: `https://browser-intake-datadoghq.com.malicious.com`.
{% /alert %}

### Datadog 인테이크 URL 구축 {% #build-the-datadog-intake-url %}

Datadog 인테이크 URL의 형식은 `<INTAKE_ORIGIN>/<PATH><PARAMETERS>`여야 합니다(예: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`).

{% table %}
---
* 인테이크 출처
* 
    Datadog 인테이크 출처는 `site` [초기화 파라미터][1]에 해당합니다. 프록시 구현에 사이트 파라미터에 해당하는 Datadog 인테이크 출처를 정의해야 합니다.

    {% site-region region="us" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us3" %}
    The intake origin for your Datadog site is `https://browser-intake-us3-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us5" %}
    The intake origin for your Datadog site is `https://browser-intake-us5-datadoghq.com`.
    {% /site-region %}

    {% site-region region="eu" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.eu`.
    {% /site-region %}

    {% site-region region="ap1" %}
    The intake origin for your Datadog site is `https://browser-intake-ap1-datadoghq.com`.
    {% /site-region %}

    {% site-region region="ap2" %}
    The intake origin for your Datadog site is `https://browser-intake-ap2-datadoghq.com`.
    {% /site-region %}

    {% site-region region="gov" %}
    The intake origin for your Datadog site is `https://browser-intake-ddog-gov.com`.
    {% /site-region %}

    {% site-region region="gov2" %}
    The intake origin for your Datadog site is `https://browser-intake-us2-ddog-gov.com`.
    {% /site-region %}
---
* 경로
* 
    경로는 API 버전 및 제품을 포함합니다(예를 들어 RUM 데이터인 경우 `/api/v2/rum`, 세션 리플레이 데이터인 경우 `/api/v2/replay`). 
    
    The path for each request can be accessed in the request's `ddforward` parameter (for example, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* 파라미터
* 
    요청의 `ddforward` 파라미터(예: `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`)에서 요청 파라미터(예: `ddsource=browser&...`)에 액세스할 수 있습니다.

{% /table %}

## SDK 설정 {% #sdk-setup %}

<!-- SDK version >4.34.0 이상 -->
{% if includes($rum_browser_sdk_version, ["gte_5_4_0", "gte_4_34_0"]) %}

`proxy` 초기화 파라미터에서 프록시의 URL 구성:

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

RUM 브라우저 SDK가 프록시에 대한 모든 요청에 `ddforward` 쿼리 파라미터를 추가합니다. 이 쿼리 파라미터는 URL 경로와 모든 데이터를 전달받아야 하는 파라미터를 포함합니다.

예를 들어 `site`가 `datadoghq.eu`로 설정되고 `proxy`가 `https://example.org/datadog-intake-proxy`로 설정된 경우, RUM 브라우저 SDK는 `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`와 같은 URL로 요청을 보냅니다. 프록시는 해당 요청을 `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`로 전달합니다.

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### 함수를 `proxy` 초기화 파라미터 {% #passing-a-function-to-the-proxy-initialization-parameter %}에 전달

`proxy` 초기화 파라미터는 함수 입력도 지원합니다. 이 함수를 사용하면 프록시 URL에 경로와 파라미터를 추가하는 방식을 사용자가 더 주도적으로 제어할 수 있습니다.

이 함수는 다음과 같은 속성을 포함한 개체를 수신합니다.

- `path`: Datadog 요청에 사용할 경로(예: `/api/v2/rum`)
- `parameters`:Datadog 요청의 파라미터(예: `ddsource=browser&...`)

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
- 일부 개인정보 보호 차단기는 이미 인테이크 [URL 패턴][2]을 대상으로 지정하므로, 프록시 URL을 구축할 때 이 점을 고려하는 것이 좋습니다.
- 각 요청에 대하여 `proxy` 함수를 호출하므로, 복잡한 계산을 피해야 합니다.
- **JSP 웹 애플리케이션**이 `\` 이스케이프 문자를 사용해야 이러한 파라미터를 브라우저에 적절하게 전파할 수 있습니다. 예:
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0 이상 -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
브라우저 SDK v4.34.0 전에는 `proxyUrl` 초기화 파라미터가 사용되었으며, Datadog 인테이크 출처는 `ddforward` 속성에 포함되었습니다. 이 호스트를 검증할 책임은 프록시 구현이 담당했으며, 검증이 실패하면 다양한 취약성이 발생했습니다.

Datadog 인테이크 출처를 프록시 구현에서 정의해야 보안이 보장됩니다.

**보안 취약성을 피하려면 브라우저 SDK `4.34.0` 이후 버전으로 업그레이드해야 합니다.**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /ko/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840