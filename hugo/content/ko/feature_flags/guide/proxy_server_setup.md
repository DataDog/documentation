---
description: Datadog Feature Flag SDK 요청을 자체 도메인에서 Datadog으로 전달하도록 릴레이 프록시를 구성합니다.
further_reading:
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: 가이드
  text: Feature Flag SDK 트래픽 프록시
- link: /feature_flags/client/
  tag: 문서
  text: 클라이언트 측 Feature Flags
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: 가이드
  text: 브라우저 RUM 데이터 프록시
title: Feature Flag SDK 트래픽을 위한 프록시 서버 설정
---
## 개요 {#overview}

릴레이 프록시는 애플리케이션과 Datadog 사이에 위치합니다. Feature Flag SDK는 사용자의 도메인에 있는 URL로 요청을 보내고, 프록시는 이를 Datadog으로 전달합니다.

2가지 유형의 요청을 전달해야 합니다.

1. **플래그 구성 요청**: 사전 계산된 플래그 할당을 가져오기 위해 Datadog CDN에 POST 요청을 보냅니다. SDK는 요청 본문에 평가 컨텍스트를 보냅니다. 프록시는 본문과 헤더를 변경하지 않고 전달합니다.
2. **이벤트 요청**(노출 및 평가): Datadog 수집 엔드포인트에 POST 요청을 보냅니다. 모바일 SDK는 Datadog API의 고정 경로로 보냅니다. Browser SDK는 대상 경로와 파라미터를 인코딩하는 `ddforward` 쿼리 파라미터를 사용하며, 프록시는 이를 디코딩하여 최종 Datadog URL을 구성하는 데 사용해야 합니다.

<div class="alert alert-info">이 페이지의 코드 샘플은 US1 사이트(<code>datadoghq.com</code>)를 예로 사용합니다. Datadog 출처를 <a href="/getting_started/site/">Datadog 사이트</a>에 해당하는 값으로 바꿉니다.</div>


| Datadog 사이트 | 플래그 CDN 출처 | 모바일 수집 출처 | 브라우저 수집 출처 |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |
| AP2 | `preview.ff-cdn.ap2.datadoghq.com` | `api.ap2.datadoghq.com` | `browser-intake-ap2-datadoghq.com` |
| UK1 | `preview.ff-cdn.uk1.datadoghq.com` | `api.uk1.datadoghq.com` | `browser-intake-uk1-datadoghq.com` |

## 프록시 구현 선택 {#choose-a-proxy-implementation}

{{< tabs >}}

{{% tab "NGINX" %}}

NGINX는 클라우드 VM, Kubernetes, Docker, 베어 메탈 등 모든 인프라에서 릴레이 프록시로 작동합니다.

### 플래그 구성 및 모바일 이벤트 릴레이 {#flag-configuration-and-mobile-event-relay}

다음 `server` 블록을 NGINX 구성에 추가합니다.

{{< code-block lang="nginx" filename="nginx.conf" >}}
server {
    listen 443 ssl;
    server_name proxy.example.com;
    # ssl_certificate     /etc/ssl/certs/proxy.example.com.crt;
    # ssl_certificate_key /etc/ssl/private/proxy.example.com.key;

    # Flag configuration relay (all platforms)
    location /precompute-assignments {
        proxy_pass https://preview.ff-cdn.datadoghq.com/precompute-assignments;
        proxy_ssl_server_name on;
        proxy_set_header Host preview.ff-cdn.datadoghq.com;
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: exposures
    location /api/v2/exposures {
        proxy_pass https://api.datadoghq.com/api/v2/exposures;
        proxy_ssl_server_name on;
        proxy_set_header Host api.datadoghq.com;
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: evaluations
    location /api/v2/flagevaluation {
        proxy_pass https://api.datadoghq.com/api/v2/flagevaluation;
        proxy_ssl_server_name on;
        proxy_set_header Host api.datadoghq.com;
        proxy_pass_request_body on;
    }
}
{{< /code-block >}}

배포 후 SDK 옵션을 다음과 같이 설정합니다.

| SDK 옵션 | 값 |
|---|---|
| 플래그 구성(`useCustomFlagEndpoint`/`customFlagsEndpoint`)| `https://proxy.example.com/precompute-assignments` |
| 노출(`useCustomExposureEndpoint`/`customExposureEndpoint`)| `https://proxy.example.com/api/v2/exposures` |
| 평가(`useCustomEvaluationEndpoint`/`customEvaluationEndpoint`)| `https://proxy.example.com/api/v2/flagevaluation` |

### 브라우저 이벤트 릴레이 {#browser-event-relay}

브라우저 SDK는 URL로 인코딩된 대상 경로를 포함하는 `ddforward` 쿼리 파라미터를 추가합니다. 표준 NGINX는 `proxy_pass` 지시문에서 이 파라미터를 디코딩할 수 없습니다. 브라우저 이벤트를 처리하려면 Lua 스크립팅으로 NGINX를 확장하는 [OpenResty][1]를 사용하세요.

위의 표준 NGINX 블록과 함께 이 위치 블록을 OpenResty 서버 구성에 추가하세요. Lua 코드는 [`lua-resty-http`][2] 라이브러리가 필요합니다.

{{< code-block lang="nginx" filename="nginx.conf" >}}
    # Browser SDK event relay (OpenResty + lua-resty-http required)
    location /intake {
        content_by_lua_block {
            local http = require("resty.http")
            local args = ngx.req.get_uri_args()
            local ddforward = args["ddforward"]
            if not ddforward then
                ngx.status = 400
                ngx.say("missing ddforward")
                return
            end

            -- Compute browser intake host from Datadog site
            local site = "datadoghq.com"
            local parts = {}
            for p in site:gmatch("[^%.]+") do table.insert(parts, p) end
            local tld = table.remove(parts)
            local intake_host = "browser-intake-" .. table.concat(parts, "-") .. "." .. tld
            local target = "https://" .. intake_host .. ddforward

            ngx.req.read_body()
            local httpc = http.new()
            local res, err = httpc:request_uri(target, {
                method  = "POST",
                body    = ngx.req.get_body_data(),
                headers = {
                    ["Content-Type"]    = ngx.var.http_content_type,
                    ["X-Forwarded-For"] = ngx.var.remote_addr,
                },
                ssl_verify = true,
            })
            if err then
                ngx.status = 502
                ngx.say("upstream error")
                return
            end
            ngx.status = res.status
            ngx.print(res.body)
        }
    }
{{< /code-block >}}

이 엔드포인트를 통해 이벤트를 라우팅하도록 브라우저 SDK `proxy` 옵션을 설정하세요.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

[1]: https://openresty.org/
[2]: https://github.com/ledgetech/lua-resty-http

{{% /tab %}}

{{% tab "Cloudflare Worker" %}}

Cloudflare Worker는 단일 스크립트에서 모든 요청 유형을 처리하며 관리할 인프라 없이 엣지에서 실행됩니다.

Cloudflare 대시보드에서 Worker를 생성하고 다음 스크립트를 배포하세요. Datadog 사이트가 US1이 아닌 경우 `DATADOG_SITE`를 업데이트하세요.

{{< code-block lang="javascript" filename="worker.js" >}}
const DATADOG_SITE = 'datadoghq.com';
const FLAG_CDN_ORIGIN = `preview.ff-cdn.${DATADOG_SITE}`;
const MOBILE_INTAKE_ORIGIN = `api.${DATADOG_SITE}`;
const _parts = DATADOG_SITE.split('.');
const _tld = _parts.pop();
const BROWSER_INTAKE_ORIGIN = `browser-intake-${_parts.join('-')}.${_tld}`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Flag configuration relay: forward to Datadog CDN
    if (url.pathname === '/precompute-assignments') {
      const target = `https://${FLAG_CDN_ORIGIN}/precompute-assignments`;
      return fetch(target, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Mobile SDK event relay: forward to Datadog API
    if (url.pathname === '/api/v2/exposures' || url.pathname === '/api/v2/flagevaluation') {
      const target = `https://${MOBILE_INTAKE_ORIGIN}${url.pathname}`;
      return fetch(target, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Browser SDK event relay: decode ddforward and forward to browser intake
    if (url.pathname === '/intake') {
      const ddforward = url.searchParams.get('ddforward');
      if (!ddforward) {
        return new Response('missing ddforward', { status: 400 });
      }
      const target = `https://${BROWSER_INTAKE_ORIGIN}${ddforward}`;
      const forwardedHeaders = new Headers(request.headers);
      forwardedHeaders.set('X-Forwarded-For', request.headers.get('CF-Connecting-IP') || '');
      forwardedHeaders.delete('cookie');
      return fetch(target, {
        method: request.method,
        headers: forwardedHeaders,
        body: request.body,
      });
    }

    return new Response('not found', { status: 404 });
  },
};
{{< /code-block >}}

배포 후 Worker에 대한 사용자 지정 도메인을 구성하고(예: `proxy.example.com`) 다음과 같이 SDK 옵션을 설정하세요.

| SDK 옵션 | 값 |
|---|---|
| 플래그 구성 | `https://proxy.example.com/precompute-assignments` |
| 노출(모바일) | `https://proxy.example.com/api/v2/exposures` |
| 평가(모바일) | `https://proxy.example.com/api/v2/flagevaluation` |
| 브라우저 이벤트(`proxy`) | `https://proxy.example.com/intake` |

{{% /tab %}}

{{% tab "Next.js(Vercel)" %}}

Next.js API 경로는 Vercel 또는 모든 Node.js 호스팅 플랫폼에 배포될 때 릴레이 프록시 역할을 합니다.

플래그 구성용, 모바일 이벤트용, 브라우저 이벤트용으로 총 3개의 API 경로를 만드세요.

### 플래그 구성 경로 {#flag-configuration-route}

{{< code-block lang="typescript" filename="app/api/flag-config/route.ts" >}}
const FLAG_CDN = `https://preview.ff-cdn.datadoghq.com/precompute-assignments`;

export async function POST(req: Request) {
  const headers: HeadersInit = {
    'Content-Type': req.headers.get('Content-Type') ?? 'application/vnd.api+json',
  };

  // Pass through authentication headers from the SDK
  const clientToken = req.headers.get('dd-client-token');
  const appId = req.headers.get('dd-application-id');
  if (clientToken) headers['dd-client-token'] = clientToken;
  if (appId) headers['dd-application-id'] = appId;

  const response = await fetch(FLAG_CDN, {
    method: 'POST',
    headers,
    body: req.body,
    // @ts-ignore – required for streaming request body in Node.js
    duplex: 'half',
  });

  return new Response(response.body, { status: response.status });
}
{{< /code-block >}}

### 모바일 이벤트 경로 {#mobile-event-route}

포괄적인 경로가 `/api/v2/exposures` 및 `/api/v2/flagevaluation`을 모두 처리하고 각각을 Datadog 모바일 수집으로 전달합니다.

{{< code-block lang="typescript" filename="app/api/v2/[...path]/route.ts" >}}
import { NextRequest } from 'next/server';

const SITE = 'datadoghq.com';
const MOBILE_INTAKE = `https://api.${SITE}`;

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const subpath = params.path.join('/');
  const targetUrl = `${MOBILE_INTAKE}/api/v2/${subpath}`;
  const clientIp = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '';

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('Content-Type') ?? 'application/octet-stream',
      'X-Forwarded-For': clientIp,
    },
    body: req.body,
    // @ts-ignore
    duplex: 'half',
  });

  return new Response(response.body, { status: response.status });
}
{{< /code-block >}}

### 브라우저 이벤트 경로 {#browser-event-route}

{{< code-block lang="typescript" filename="app/api/intake/route.ts" >}}
import { NextRequest, NextResponse } from 'next/server';

const SITE = 'datadoghq.com';
const _parts = SITE.split('.');
const _tld = _parts.pop();
const BROWSER_INTAKE = `https://browser-intake-${_parts.join('-')}.${_tld}`;

export async function POST(req: NextRequest) {
  const ddforward = req.nextUrl.searchParams.get('ddforward');
  if (!ddforward) {
    return NextResponse.json({ error: 'missing ddforward' }, { status: 400 });
  }

  const targetUrl = `${BROWSER_INTAKE}${ddforward}`;
  const clientIp = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '';

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('Content-Type') ?? 'application/octet-stream',
      'X-Forwarded-For': clientIp,
    },
    body: req.body,
    // @ts-ignore
    duplex: 'half',
  });

  return new Response(response.body, { status: response.status });
}
{{< /code-block >}}

배포 후, 다음과 같이 SDK 옵션을 설정하세요(`proxy.example.com`을 회원님의 Vercel 도메인으로 교체).

| SDK 옵션 | 값 |
|---|---|
| 플래그 구성 | `https://proxy.example.com/api/flag-config` |
| 노출(모바일) | `https://proxy.example.com/api/v2/exposures` |
| 평가(모바일) | `https://proxy.example.com/api/v2/flagevaluation` |
| 브라우저 이벤트(`proxy`) | `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}