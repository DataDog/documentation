---
description: Datadog Feature Flag SDK 네트워크 요청을 사용자 도메인의 프록시를 통해 라우팅합니다.
further_reading:
- link: /feature_flags/guide/proxy_server_setup/
  tag: 가이드
  text: Feature Flag SDK 트래픽을 위한 프록시 서버 설정
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: 가이드
  text: 브라우저 RUM 데이터 프록시
title: Feature Flag SDK 트래픽 프록시
---
## 개요 {#overview}

Datadog Feature Flag SDK는 애플리케이션에서 다음과 같은 두 가지 유형의 아웃바운드 네트워크 요청을 수행합니다.

1. **플래그 구성 다운로드**: SDK는 시작 시와 평가 컨텍스트가 변경될 때 Datadog CDN에서 미리 계산된 플래그 할당을 가져옵니다. 이 요청은 어떤 플래그 변형이 애플리케이션으로 반환되는지 결정합니다.
2. **이벤트 업로드**: SDK는 노출 및 평가 이벤트 데이터를 Datadog 수집 엔드포인트로 보냅니다.

이러한 요청 유형 중 하나 또는 둘 다를 사용자 도메인의 프록시를 통해 라우팅할 수 있습니다. 프록시를 사용하는 일반적인 이유는 다음과 같습니다.

- 클라이언트 장치에서 타사 도메인으로의 직접 액세스를 제한하는 네트워크 정책
- 데이터 상주 또는 컴플라이언스 요구 사항
- 브라우저 애플리케이션의 광고 차단기 회피

<div class="alert alert-info">이 페이지의 코드 샘플은 US1 사이트(<code>datadoghq.com</code>)를 예로 사용합니다. Datadog 도메인을 <a href="/getting_started/site/">Datadog 사이트</a>에 해당하는 값으로 바꿉니다.</div>

## 프록시 설정 {#configure-the-proxy}

{{< tabs >}}

{{% tab "Android" %}}

`Flags.enable()`을 호출하기 전에 `FlagsConfiguration.Builder`에 사용자 지정 엔드포인트 URL을 전달합니다.

### 플래그 구성 프록시 {#flag-configuration-proxy}

플래그 구성 다운로드를 프록시를 통해 라우팅하려면 프록시가 노출하는 전체 URL을 사용하여 `useCustomFlagEndpoint`를 호출합니다. SDK는 평가 컨텍스트를 본문에 포함하여 이 URL로 POST 요청을 보냅니다.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

프록시는 이 요청을 Datadog CDN(`https://preview.ff-cdn.datadoghq.com/precompute-assignments`)으로 전달해야 합니다. 하위 도메인은 [Datadog 사이트][1]에 따라 필요에 맞게 바꿉니다. 요청 본문과 모든 헤더를 변경하지 않고 그대로 전달하세요.

### 이벤트 업로드 프록시 {#event-upload-proxy}

노출 및 평가 이벤트 업로드를 프록시를 통해 라우팅하려면 프록시의 전체 엔드포인트 URL을 사용하여 해당 빌더 메서드를 호출합니다.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .useCustomExposureEndpoint("https://proxy.example.com/api/v2/exposures")
    .useCustomEvaluationEndpoint("https://proxy.example.com/api/v2/flagevaluation")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

프록시는 각 요청을 [Datadog 사이트][1]에 해당하는 Datadog intake 엔드포인트로 전달해야 합니다. 다음 표에서는 US1 사이트를 예로 사용합니다.

| 프록시 경로 | 전달 대상 |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /ko/getting_started/site/

{{% /tab %}}

{{% tab "iOS" %}}

`Flags.enable(with:)`을 호출하기 전에 `Flags.Configuration`에서 사용자 지정 엔드포인트 URL을 설정합니다.

### 플래그 구성 프록시 {#flag-configuration-proxy-1}

플래그 구성 다운로드를 프록시를 통해 라우팅하려면 `customFlagsEndpoint`를 프록시가 노출하는 전체 URL로 설정합니다. SDK는 평가 컨텍스트를 본문에 포함하여 이 URL로 POST 요청을 보냅니다.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

프록시는 이 요청을 Datadog CDN(`https://preview.ff-cdn.datadoghq.com/precompute-assignments`)으로 전달해야 합니다. 하위 도메인은 [Datadog 사이트][1]에 따라 필요에 맞게 바꿉니다. 요청 본문과 모든 헤더를 변경하지 않고 그대로 전달하세요.

플래그 구성 요청에 추가 HTTP 헤더를 첨부하려면(예: 프록시에서의 인증을 위해) `customFlagsHeaders`를 설정합니다.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customFlagsHeaders: ["X-Proxy-Token": "<YOUR_PROXY_TOKEN>"]
)
{{< /code-block >}}

### 이벤트 업로드 프록시 {#event-upload-proxy-1}

노출 및 평가 이벤트 업로드를 프록시를 통해 라우팅하려면 `customExposureEndpoint` 및 `customEvaluationEndpoint`를 설정합니다.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customExposureEndpoint: URL(string: "https://proxy.example.com/api/v2/exposures"),
    customEvaluationEndpoint: URL(string: "https://proxy.example.com/api/v2/flagevaluation")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

프록시는 각 요청을 [Datadog 사이트][1]에 해당하는 Datadog intake 엔드포인트로 전달해야 합니다. 다음 표에서는 US1 사이트를 예로 사용합니다.

| 프록시 경로 | 전달 대상 |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /ko/getting_started/site/

{{% /tab %}}

{{% tab "React Native" %}}

`FlagsConfiguration` 객체를 `DdFlags.enable()`에 전달합니다.

### 플래그 구성 프록시 {#flag-configuration-proxy-2}

플래그 구성 다운로드를 프록시를 통해 라우팅하려면 `customFlagsEndpoint`를 프록시의 기본 URL로 설정합니다. SDK는 이 값에 `/precompute-assignments`를 자동으로 추가하고 평가 컨텍스트를 본문에 포함하여 POST 요청을 보냅니다.

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

프록시는 이 요청을 Datadog CDN(`https://preview.ff-cdn.datadoghq.com/precompute-assignments`)으로 전달해야 합니다. 하위 도메인은 [Datadog 사이트][1]에 따라 필요에 맞게 바꿉니다. 요청 본문과 모든 헤더를 변경하지 않고 그대로 전달하세요.

### 이벤트 업로드 프록시 {#event-upload-proxy-2}

노출 이벤트 업로드를 프록시를 통해 라우팅하려면 `customExposureEndpoint`를 프록시의 기본 URL로 설정합니다. SDK는 이 값에 `/api/v2/exposures`를 자동으로 추가합니다.

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

프록시는 노출 요청을 [Datadog 사이트][1]에 해당하는 Datadog intake 엔드포인트로 전달해야 합니다. 예를 들어 US1 사이트의 경우 `https://api.datadoghq.com/api/v2/exposures`를 사용하세요.

<div class="alert alert-info">React Native SDK는 <code>customEvaluationEndpoint</code> 옵션을 노출하지 않습니다. 평가 이벤트는 기본 네이티브 Android 또는 iOS SDK를 통해 전송되며 사용자 지정 프록시 엔드포인트를 통해 라우팅할 수 없습니다.</div>

[1]: /ko/getting_started/site/

{{% /tab %}}

{{% tab "브라우저" %}}

`DatadogBrowserFlagging.init()`에 설정 옵션을 전달합니다.

### 플래그 구성 프록시 {#flag-configuration-proxy-3}

플래그 구성 다운로드를 프록시를 통해 라우팅하려면 `flaggingProxy`를 프록시 엔드포인트의 URL로 설정합니다. SDK는 평가 컨텍스트가 포함된 본문과 함께 POST 요청을 이 URL로 직접 전송하여 기본 Datadog CDN 엔드포인트를 대체합니다.

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
});
{{< /code-block >}}

프록시는 이 요청을 Datadog CDN(`https://preview.ff-cdn.datadoghq.com/precompute-assignments`)으로 전달해야 합니다. 하위 도메인은 [Datadog 사이트][1]에 따라 필요에 맞게 바꿉니다. 요청 본문과 헤더를 변경하지 않고 그대로 전달합니다. SDK는 `dd-client-token` 및 `dd-application-id` 헤더를 자동으로 포함합니다.

플래그 구성 요청에 사용자 지정 헤더를 추가하려면(예: 프록시 인증용), `customHeaders`를 사용합니다.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### 이벤트 업로드 프록시 {#event-upload-proxy-3}

브라우저 플래그 이벤트 데이터(노출 및 평가)는 표준 브라우저 SDK 수집 파이프라인을 통해 전송됩니다. 이 트래픽을 프록시를 통해 라우팅하려면 `proxy` 옵션을 도메인의 URL로 설정합니다.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

SDK는 프록시로 전송되는 각 요청에 `ddforward` 쿼리 파라미터를 추가합니다. 이 파라미터에는 프록시가 전달해야 하는 URL 인코딩된 경로와 쿼리 문자열이 포함되어 있습니다. 예:

```
POST https://proxy.example.com/intake?ddforward=%2Fapi%2Fv2%2Fexposures%3Fddsource%3Dbrowser...
```

프록시는 `ddforward` 값을 디코딩하고 Datadog 수집 URL을 구성합니다:

```
https://browser-intake-datadoghq.com/api/v2/exposures?ddsource=browser...
```

Datadog 수집 출처는 [Datadog 사이트][1]에 따라 다릅니다. 예를 들어, `datadoghq.eu`의 경우 `https://browser-intake-datadoghq.eu`입니다. 정확한 지리적 위치를 파악하려면 POST 본문을 변경하지 않고 그대로 전달하고 클라이언트 IP가 포함된 `X-Forwarded-For` 헤더를 추가합니다. 전달하기 전에 `cookie`와 같은 민감한 헤더를 제거합니다.

`proxy` 옵션은 디코딩된 `path` 및 `parameters`을 수신하고 전체 프록시 URL을 반환하는 함수도 허용합니다. 전체 함수 서명은 [브라우저 RUM 데이터 프록시][2]를 참조하세요.

[1]: /ko/getting_started/site/
[2]: /ko/real_user_monitoring/guide/proxy-rum-data/

{{% /tab %}}

{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}