---
description: Configurez un proxy relais pour transférer les requêtes du SDK Datadog
  Feature Flag depuis votre propre domaine vers Datadog.
further_reading:
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guide
  text: Proxy du trafic du SDK Feature Flag
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: Guide
  text: Proxy pour les données RUM de navigateur
title: Configurer un serveur proxy pour le trafic du SDK Feature Flag
---
## Présentation {#overview}

Un proxy relais se situe entre votre application et Datadog. Le SDK Feature Flag envoie des requêtes vers une URL sur votre domaine, et votre proxy les transfère à Datadog.

Deux types de requêtes doivent être transférés :

1. **Requêtes de configuration des flags** : POST vers le CDN Datadog pour récupérer les attributions de flags précalculées. Le SDK envoie le contexte d'évaluation dans le corps de la requête. Votre proxy transfère le corps et les en-têtes sans modification.
2. **Requêtes d'événements** (expositions et évaluations) : POST vers les endpoints d'ingestion Datadog. Les SDK mobiles envoient vers des chemins fixes sur Datadog API. Le SDK navigateur utilise un paramètre de requête `ddforward` qui encode le chemin cible et les paramètres, que votre proxy doit décoder et utiliser pour construire l'URL finale de Datadog.

<div class="alert alert-info">Les exemples de code sur cette page utilisent le site US1 (<code>datadoghq.com</code>) comme exemple. Remplacez les origines Datadog par les valeurs correspondantes pour votre <a href="/getting_started/site/">site Datadog</a>.</div>


| Site Datadog | Origine CDN des flags | Origine d'ingestion mobile | Origine d'ingestion navigateur |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |
| AP2 | `preview.ff-cdn.ap2.datadoghq.com` | `api.ap2.datadoghq.com` | `browser-intake-ap2-datadoghq.com` |
| UK1 | `preview.ff-cdn.uk1.datadoghq.com` | `api.uk1.datadoghq.com` | `browser-intake-uk1-datadoghq.com` |

## Choisissez une implémentation de proxy {#choose-a-proxy-implementation}

{{< tabs >}}

{{% tab "NGINX" %}}

NGINX fonctionne comme un proxy relais sur n'importe quelle infrastructure : machines virtuelles cloud, Kubernetes, Docker ou bare metal.

### Configuration des flags et relais d'événements mobiles {#flag-configuration-and-mobile-event-relay}

Ajoutez le bloc `server` suivant à votre configuration NGINX.

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

Après le déploiement, définissez les options du SDK comme suit :

| Option SDK | Valeur |
|---|---|
| Configuration des flags (`useCustomFlagEndpoint` / `customFlagsEndpoint`) | `https://proxy.example.com/precompute-assignments` |
| Expositions (`useCustomExposureEndpoint` / `customExposureEndpoint`) | `https://proxy.example.com/api/v2/exposures` |
| Évaluations (`useCustomEvaluationEndpoint` / `customEvaluationEndpoint`) | `https://proxy.example.com/api/v2/flagevaluation` |

### Relais d'événements du navigateur {#browser-event-relay}

Le SDK navigateur ajoute un paramètre de requête `ddforward` contenant le chemin cible encodé en URL. Le NGINX standard ne peut pas décoder ce paramètre dans une directive `proxy_pass`. Utilisez [OpenResty][1], qui étend NGINX avec des scripts Lua, pour gérer les événements du navigateur.

Ajoutez ce bloc location à la configuration du serveur OpenResty aux côtés des blocs NGINX standard ci-dessus. Le code Lua nécessite la bibliothèque [`lua-resty-http`][2].

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

Définissez l'option `proxy` du SDK navigateur pour acheminer les événements via cet endpoint :

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

Un Cloudflare Worker gère tous les types de requêtes dans un seul script et s'exécute en périphérie sans infrastructure à gérer.

Créez un Worker dans votre dashboard Cloudflare et déployez le script suivant. Mettez à jour `DATADOG_SITE` si votre site Datadog n'est pas US1.

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

Après le déploiement, configurez un domaine personnalisé pour votre Worker (par exemple, `proxy.example.com`) et définissez les options du SDK comme suit :

| Option SDK | Valeur |
|---|---|
| Configuration des flags | `https://proxy.example.com/precompute-assignments` |
| Expositions (mobile) | `https://proxy.example.com/api/v2/exposures` |
| Évaluations (mobile) | `https://proxy.example.com/api/v2/flagevaluation` |
| Événements de navigateur (`proxy`) | `https://proxy.example.com/intake` |

{{% /tab %}}

{{% tab "Next.js (Vercel)" %}}

Les routes API Next.js fonctionnent comme un proxy relais lorsqu'elles sont déployées sur Vercel ou toute plateforme d'hébergement Node.js.

Créez trois routes API : une pour la configuration des flags, une pour les événements mobiles et une pour les événements de navigateur.

### Route de configuration des flags {#flag-configuration-route}

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

### Route des événements mobiles{#mobile-event-route}

Une route fourre-tout gère à la fois `/api/v2/exposures` et `/api/v2/flagevaluation` et transmet chacun d'eux à l'ingestion mobile Datadog.

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

### Route des événements de navigateur{#browser-event-route}

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

Après le déploiement, configurez les options du SDK comme suit (remplacez `proxy.example.com` par votre domaine Vercel) :

| Option SDK | Valeur |
|---|---|
| Configuration des flags | `https://proxy.example.com/api/flag-config` |
| Expositions (mobile) | `https://proxy.example.com/api/v2/exposures` |
| Évaluations (mobile) | `https://proxy.example.com/api/v2/flagevaluation` |
| Événements de navigateur (`proxy`) | `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}