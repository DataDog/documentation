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

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog Feature Flags are not available for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

A relay proxy sits between your application and Datadog. The Feature Flag SDK sends requests to a URL on your domain, and your proxy forwards them to Datadog.

Two types of requests must be forwarded:

1. **Flag configuration requests**: POST to the Datadog CDN to fetch precomputed flag assignments. The SDK sends the evaluation context in the request body. Your proxy forwards the body and headers unchanged.
2. **Event requests** (exposures and evaluations): POST to Datadog intake endpoints. Mobile SDKs send to fixed paths on the Datadog API. The Browser SDK uses a `ddforward` query parameter that encodes the target path and parameters, which your proxy must decode and use to construct the final Datadog URL.

The examples below use the Datadog site selected in the site dropdown on this page. The reference table shows the intake origins for each site:

| Datadog site | Flag CDN origin | Mobile intake origin | Browser intake origin |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |
| AP2 | `preview.ff-cdn.ap2.datadoghq.com` | `api.ap2.datadoghq.com` | `browser-intake-ap2-datadoghq.com` |
| UK1 | `preview.ff-cdn.uk1.datadoghq.com` | `api.uk1.datadoghq.com` | `browser-intake-uk1-datadoghq.com` |

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
    # ssl_certificate     /etc/ssl/certs/proxy.example.com.crt;
    # ssl_certificate_key /etc/ssl/private/proxy.example.com.key;

    # Flag configuration relay (all platforms)
    location /precompute-assignments {
        proxy_pass https://preview.ff-cdn.{{< region-param key="dd_site" code="true" >}}/precompute-assignments;
        proxy_ssl_server_name on;
        proxy_set_header Host preview.ff-cdn.{{< region-param key="dd_site" code="true" >}};
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: exposures
    location /api/v2/exposures {
        proxy_pass {{< region-param key="dd_api" code="true" >}}/api/v2/exposures;
        proxy_ssl_server_name on;
        proxy_set_header Host api.{{< region-param key="dd_site" code="true" >}};
        proxy_pass_request_body on;
    }

    # Mobile SDK event relay: evaluations
    location /api/v2/flagevaluation {
        proxy_pass {{< region-param key="dd_api" code="true" >}}/api/v2/flagevaluation;
        proxy_ssl_server_name on;
        proxy_set_header Host api.{{< region-param key="dd_site" code="true" >}};
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

            -- Compute browser intake host from Datadog site
            local site = "{{< region-param key="dd_site" code="true" >}}"
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

Set the browser SDK `proxy` option to route events through this endpoint:

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: '{{< region-param key="dd_site" code="true" >}}',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloudflare Worker" %}}

A Cloudflare Worker handles all request types in a single script and runs at the edge with no infrastructure to manage.

Create a Worker in your Cloudflare dashboard and deploy the following script. Update `DATADOG_SITE` if your Datadog site is not US1.

{{< code-block lang="javascript" filename="worker.js" >}}
const DATADOG_SITE = '{{< region-param key="dd_site" code="true" >}}';
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

Create three API routes: one for flag configuration, one for mobile events, and one for browser events.

### Flag configuration route

{{< code-block lang="typescript" filename="app/api/flag-config/route.ts" >}}
const FLAG_CDN = `https://preview.ff-cdn.{{< region-param key="dd_site" code="true" >}}/precompute-assignments`;

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

### Mobile event route

A catch-all route handles both `/api/v2/exposures` and `/api/v2/flagevaluation` and forwards each to the Datadog mobile intake.

{{< code-block lang="typescript" filename="app/api/v2/[...path]/route.ts" >}}
import { NextRequest } from 'next/server';

const SITE = '{{< region-param key="dd_site" code="true" >}}';
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

### Browser event route

{{< code-block lang="typescript" filename="app/api/intake/route.ts" >}}
import { NextRequest, NextResponse } from 'next/server';

const SITE = '{{< region-param key="dd_site" code="true" >}}';
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

After deploying, set the SDK options as follows (replace `proxy.example.com` with your Vercel domain):

| SDK option | Value |
|---|---|
| Flag config | `https://proxy.example.com/api/flag-config` |
| Exposures (mobile) | `https://proxy.example.com/api/v2/exposures` |
| Evaluations (mobile) | `https://proxy.example.com/api/v2/flagevaluation` |
| Browser events (`proxy`) | `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://openresty.org/
[3]: https://github.com/ledgetech/lua-resty-http
