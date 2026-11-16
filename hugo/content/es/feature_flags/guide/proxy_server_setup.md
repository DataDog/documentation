---
description: Configure un proxy de retransmisión para reenviar las solicitudes del
  SDK de Datadog Feature Flag desde su propio dominio a Datadog.
further_reading:
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guía
  text: Proxy para el tráfico del SDK de Feature Flag
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: Guía
  text: Proxy para datos de RUM del navegador
title: Configure un servidor proxy para el tráfico del SDK de Feature Flag
---
## Descripción general {#overview}

Un proxy de retransmisión se sitúa entre su aplicación y Datadog. El SDK de Datadog Feature Flag envía solicitudes a una URL en su dominio, y su proxy las reenvía a Datadog.

Se deben reenviar dos tipos de solicitudes:

1. **Solicitudes de configuración de Datadog Feature Flag**: POST a la CDN de Datadog para obtener las asignaciones precalculadas de Datadog Feature Flag. El SDK de Datadog Feature Flag envía el contexto de evaluación en el cuerpo de la solicitud. Su proxy reenvía el cuerpo y los encabezados sin cambios.
2. **Solicitudes de evento** (exposiciones y evaluaciones): POST a los puntos de conexión de ingesta de Datadog. Los SDK móviles envían a rutas fijas en Datadog API. El SDK de navegador utiliza un parámetro de consulta `ddforward` que codifica la ruta de destino y los parámetros, los cuales su proxy debe decodificar y utilizar para construir la URL final de Datadog.

<div class="alert alert-info">Los ejemplos de código en esta página utilizan el sitio US1 (<code>datadoghq.com</code>) como ejemplo. Reemplace los orígenes de Datadog con los valores correspondientes para su <a href="/getting_started/site/">sitio de Datadog</a>.</div>


| Sitio de Datadog | Origen de CDN de Datadog Feature Flag | Origen de ingesta móvil | Origen de ingesta de navegador |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |
| AP2 | `preview.ff-cdn.ap2.datadoghq.com` | `api.ap2.datadoghq.com` | `browser-intake-ap2-datadoghq.com` |
| UK1 | `preview.ff-cdn.uk1.datadoghq.com` | `api.uk1.datadoghq.com` | `browser-intake-uk1-datadoghq.com` |

## Elija una implementación de proxy {#choose-a-proxy-implementation}

{{< tabs >}}

{{% tab "NGINX" %}}

NGINX funciona como un proxy de retransmisión en cualquier infraestructura: máquinas virtuales en la nube, Kubernetes, Docker o bare metal.

### Configuración de Datadog Feature Flag y retransmisión de eventos móviles {#flag-configuration-and-mobile-event-relay}

Añada el siguiente bloque `server` a su configuración de NGINX.

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

Después de implementar, establezca las opciones del SDK de Datadog Feature Flag de la siguiente manera:

| Opción del SDK | Valor |
|---|---|
| Configuración de Datadog Feature Flag (`useCustomFlagEndpoint` / `customFlagsEndpoint`) | `https://proxy.example.com/precompute-assignments` |
| Exposiciones (`useCustomExposureEndpoint` / `customExposureEndpoint`) | `https://proxy.example.com/api/v2/exposures` |
| Evaluaciones (`useCustomEvaluationEndpoint` / `customEvaluationEndpoint`) | `https://proxy.example.com/api/v2/flagevaluation` |

### Retransmisión de evento del navegador {#browser-event-relay}

El SDK del navegador añade un parámetro de consulta `ddforward` que contiene la ruta de destino codificada en URL. El NGINX estándar no puede decodificar este parámetro en una directiva `proxy_pass`. Utilice [OpenResty][1], que extiende NGINX con scripts de Lua, para gestionar los eventos del navegador.

Añada este bloque de ubicación a la configuración del servidor OpenResty junto a los bloques de NGINX estándar anteriores. El código Lua requiere la biblioteca [`lua-resty-http`][2].

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

Establezca la opción `proxy` del SDK del navegador para enrutar eventos a través de este punto de conexión:

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

Un Cloudflare Worker gestiona todos los tipos de solicitudes en un solo script y se ejecuta en el borde sin infraestructura que administrar.

Cree un Worker en su panel de control de Cloudflare e implemente el siguiente script. Actualice `DATADOG_SITE` si su sitio de Datadog no es US1.

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

Después de implementar, configure un dominio personalizado para su Worker (por ejemplo, `proxy.example.com`) y establezca las opciones del SDK de Datadog Feature Flag de la siguiente manera:

| Opción del SDK | Valor |
|---|---|
| Configuración de Datadog Feature Flag | `https://proxy.example.com/precompute-assignments` |
| Exposiciones (móvil) | `https://proxy.example.com/api/v2/exposures` |
| Evaluaciones (móvil) | `https://proxy.example.com/api/v2/flagevaluation` |
| Eventos de navegador (`proxy`) | `https://proxy.example.com/intake` |

{{% /tab %}}

{{% tab "Next.js (Vercel)" %}}

Las rutas de API de Next.js funcionan como un proxy de retransmisión cuando se implementan en Vercel o en cualquier plataforma de alojamiento de Node.js.

Cree tres rutas de API: una para la configuración de Datadog Feature Flag, una para eventos móviles y una para eventos de navegador.

### Ruta de configuración de Datadog Feature Flag {#flag-configuration-route}

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

### Ruta de eventos móviles {#mobile-event-route}

Una ruta general maneja tanto `/api/v2/exposures` como `/api/v2/flagevaluation` y reenvía cada uno a la ingesta móvil de Datadog.

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

### Ruta de eventos de navegador {#browser-event-route}

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

Después de implementar, configure las opciones del SDK de Datadog Feature Flag de la siguiente manera (reemplace `proxy.example.com` con su dominio de Vercel):

| Opción del SDK | Valor |
|---|---|
| Configuración de Datadog Feature Flag | `https://proxy.example.com/api/flag-config` |
| Exposiciones (móvil) | `https://proxy.example.com/api/v2/exposures` |
| Evaluaciones (móvil) | `https://proxy.example.com/api/v2/flagevaluation` |
| Eventos del navegador (`proxy`) | `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}