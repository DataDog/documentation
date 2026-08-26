---
title: Set Up a Proxy Server for Feature Flag SDK Traffic
description: Configure a relay proxy to forward Datadog Feature Flag SDK requests from your own domain to Datadog.
further_reading:
- link: "/feature_flags/guide/proxy_sdk_traffic/"
  tag: "Guide"
  text: "Proxy Feature Flag SDK Traffic"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/guide/proxy-rum-data/"
  tag: "Guide"
  text: "Proxy Browser RUM Data"
---

## Overview

A relay proxy sits between your application and Datadog. The Feature Flag SDK sends requests to a URL on your domain, and your proxy forwards them to Datadog.

Two types of requests must be forwarded:

1. **Flag configuration requests**: POST to the Datadog CDN to fetch precomputed flag assignments. The SDK sends the evaluation context in the request body. Your proxy forwards the body and headers unchanged.
2. **Event requests** (exposures and evaluations): POST to Datadog intake endpoints. Mobile SDKs send to fixed paths on the Datadog API. The Browser SDK uses a `ddforward` query parameter that encodes the target path and parameters, which your proxy must decode and use to construct the final Datadog URL.

The examples below use the US1 Datadog site (`datadoghq.com`). Replace the intake origins with the values for your [Datadog site][1] if needed:

| Datadog site | Flag CDN origin | Mobile intake origin | Browser intake origin |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |

## Choose a proxy implementation

{{< tabs >}}

{{% tab "NGINX" %}}

NGINX works as a relay proxy on any infrastructure: cloud VMs, Kubernetes, Docker, or bare metal.

### Flag configuration and mobile event relay

Add the following `server` block to your NGINX configuration.

{{< code-block lang="nginx" filename="nginx.conf" >}}
server {
    listen 443 ssl;
    server_name proxy.example.com;

    # Flag configuration relay (all platforms)
    location /precompute-assignments {
        proxy_pass https://preview.ff-cdn.datadoghq.com/precompute-assignments;
        proxy_ssl_server_name on;
        proxy_set_header Host preview.ff-cdn.datadoghq.com;
        proxy_pass_request_headers on;
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: exposures
    location /api/v2/exposures {
        proxy_pass https://api.datadoghq.com/api/v2/exposures;
        proxy_ssl_server_name on;
        proxy_set_header Host api.datadoghq.com;
        proxy_pass_request_headers on;
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: evaluations
    location /api/v2/flagevaluation {
        proxy_pass https://api.datadoghq.com/api/v2/flagevaluation;
        proxy_ssl_server_name on;
        proxy_set_header Host api.datadoghq.com;
        proxy_pass_request_headers on;
        proxy_pass_request_body on;
    }
}
{{< /code-block >}}

After deploying, set the SDK options as follows:

| SDK option | Value |
|---|---|
| Flag config (`useCustomFlagEndpoint` / `customFlagsEndpoint`) | `https://proxy.example.com/precompute-assignments` |
| Exposures (`useCustomExposureEndpoint` / `customExposureEndpoint`) | `https://proxy.example.com/api/v2/exposures` |
| Evaluations (`useCustomEvaluationEndpoint` / `customEvaluationEndpoint`) | `https://proxy.example.com/api/v2/flagevaluation` |

### Browser event relay

The Browser SDK appends a `ddforward` query parameter containing the URL-encoded target path. Standard NGINX cannot decode this parameter in a `proxy_pass` directive. Use [OpenResty][2], which extends NGINX with Lua scripting, to handle browser events.

Add this location block to the OpenResty server configuration alongside the standard NGINX blocks above. The Lua code requires the [`lua-resty-http`][3] library.

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

            local target = "https://browser-intake-datadoghq.com" .. ddforward

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

Set the browser SDK `proxy` option to route events through this endpoint:

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloudflare Worker" %}}

A Cloudflare Worker handles all request types in a single script and runs at the edge with no infrastructure to manage.

Create a Worker in your Cloudflare dashboard and deploy the following script. Update `DATADOG_SITE` if your Datadog site is not US1.

{{< code-block lang="javascript" filename="worker.js" >}}
const DATADOG_SITE = 'datadoghq.com';
const FLAG_CDN_ORIGIN = `preview.ff-cdn.${DATADOG_SITE}`;
const MOBILE_INTAKE_ORIGIN = `api.${DATADOG_SITE}`;
const BROWSER_INTAKE_ORIGIN = `browser-intake-${DATADOG_SITE.replace('.', '-')}.${DATADOG_SITE.split('.').pop()}`;

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

After deploying, configure a custom domain for your Worker (for example, `proxy.example.com`) and set the SDK options as follows:

| SDK option | Value |
|---|---|
| Flag config | `https://proxy.example.com/precompute-assignments` |
| Exposures (mobile) | `https://proxy.example.com/api/v2/exposures` |
| Evaluations (mobile) | `https://proxy.example.com/api/v2/flagevaluation` |
| Browser events (`proxy`) | `https://proxy.example.com/intake` |

{{% /tab %}}

{{% tab "Next.js (Vercel)" %}}

Next.js API routes work as a relay proxy when deployed on Vercel or any Node.js hosting platform.

Create one API route for flag configuration and one for events. Update `DATADOG_SITE` if your Datadog site is not US1.

### Flag configuration route

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

### Event route (mobile and browser)

{{< code-block lang="typescript" filename="app/api/intake/route.ts" >}}
import { NextRequest, NextResponse } from 'next/server';

const MOBILE_INTAKE = 'https://api.datadoghq.com';
const BROWSER_INTAKE = 'https://browser-intake-datadoghq.com';

export async function POST(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const ddforward = searchParams.get('ddforward');
  const clientIp =
    req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '';

  let targetUrl: string;

  if (ddforward) {
    // Browser SDK event: decode ddforward and forward to browser intake
    targetUrl = `${BROWSER_INTAKE}${ddforward}`;
  } else if (pathname.startsWith('/api/v2/')) {
    // Mobile SDK event: forward to mobile intake
    targetUrl = `${MOBILE_INTAKE}${pathname}`;
  } else {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const forwardedHeaders: HeadersInit = {
    'Content-Type': req.headers.get('Content-Type') ?? 'application/octet-stream',
    'X-Forwarded-For': clientIp,
  };

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: forwardedHeaders,
    body: req.body,
    // @ts-ignore
    duplex: 'half',
  });

  return new Response(response.body, { status: response.status });
}
{{< /code-block >}}

After deploying, set the SDK options as follows (replace `proxy.example.com` with your Vercel domain):

| SDK option | Value |
|---|---|
| Flag config | `https://proxy.example.com/api/flag-config` |
| Exposures (mobile) | `https://proxy.example.com/api/intake/api/v2/exposures` |
| Evaluations (mobile) | `https://proxy.example.com/api/intake/api/v2/flagevaluation` |
| Browser events (`proxy`) | `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://openresty.org/
[3]: https://github.com/ledgetech/lua-resty-http
