---
description: Datadog Feature Flag SDK のリクエストを独自のドメインから Datadog に転送するようにリレープロキシを構成します。
further_reading:
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: ガイド
  text: Feature Flag SDK トラフィックのプロキシ
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: ガイド
  text: ブラウザの RUM データをプロキシする
title: Feature Flag SDK トラフィック用のプロキシサーバーをセットアップする
---
## 概要{#overview}

リレープロキシは、アプリケーションと Datadog の間に配置されます。Feature Flag SDK は独自のドメイン上の URL にリクエストを送信し、プロキシがそのリクエストを Datadog に転送します。

2 種類のリクエストを転送する必要があります。

1. **フラグ構成リクエスト**: 事前に計算されたフラグの割り当てを取得するための Datadog CDN への POST。SDK はリクエストボディに評価コンテキストを含めて送信します。プロキシはボディとヘッダーを変更せずに転送します。
2. **イベントリクエスト** (エクスポージャーおよび評価): Datadog インテークエンドポイントへの POST。モバイル SDK は Datadog API 上の固定パスに送信します。Browser SDK は、ターゲットパスとパラメーターをエンコードした `ddforward` クエリパラメーター使用します。プロキシはこのパラメーターをデコードし、最終的な Datadog URL の構築に使用する必要があります。

<div class="alert alert-info">このページのコードサンプルでは、US1 サイト (<code>datadoghq.com</code>) を例として使用しています。Datadog オリジンを <a href="/getting_started/site/">Datadog サイト</a>の対応する値に置き換えてください。</div>


| Datadog サイト | フラグ CDN オリジン | モバイルインテークオリジン | ブラウザインテークオリジン |
|---|---|---|---|
| US1 | `preview.ff-cdn.datadoghq.com` | `api.datadoghq.com` | `browser-intake-datadoghq.com` |
| EU1 | `preview.ff-cdn.datadoghq.eu` | `api.datadoghq.eu` | `browser-intake-datadoghq.eu` |
| US3 | `preview.ff-cdn.us3.datadoghq.com` | `api.us3.datadoghq.com` | `browser-intake-us3-datadoghq.com` |
| US5 | `preview.ff-cdn.us5.datadoghq.com` | `api.us5.datadoghq.com` | `browser-intake-us5-datadoghq.com` |
| AP1 | `preview.ff-cdn.ap1.datadoghq.com` | `api.ap1.datadoghq.com` | `browser-intake-ap1-datadoghq.com` |
| AP2 | `preview.ff-cdn.ap2.datadoghq.com` | `api.ap2.datadoghq.com` | `browser-intake-ap2-datadoghq.com` |
| UK1 | `preview.ff-cdn.uk1.datadoghq.com` | `api.uk1.datadoghq.com` | `browser-intake-uk1-datadoghq.com` |

## プロキシの実装を選択する {#choose-a-proxy-implementation}

{{< tabs >}}

{{% tab "NGINX" %}}

NGINX は、クラウド VM、Kubernetes、Docker、ベアメタルなど、あらゆるインフラストラクチャーでリレープロキシとして機能します。

### フラグ構成およびモバイルイベントリレー{#flag-configuration-and-mobile-event-relay}

以下の `server` ブロックを NGINX 構成に追加します。

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

デプロイ後、SDK オプションを次のように設定します。

| SDK オプション | 値 |
|---|---|
| フラグ構成 (`useCustomFlagEndpoint` / `customFlagsEndpoint`) | `https://proxy.example.com/precompute-assignments` |
| エクスポージャー (`useCustomExposureEndpoint` / `customExposureEndpoint`) | `https://proxy.example.com/api/v2/exposures` |
| 評価 (`useCustomEvaluationEndpoint` / `customEvaluationEndpoint`) | `https://proxy.example.com/api/v2/flagevaluation` |

### ブラウザイベントリレー {#browser-event-relay}

Browser SDK は、URL エンコードされたターゲットパスを含む `ddforward` クエリパラメーターを付加します。標準の NGINX では、`proxy_pass` ディレクティブ内のこのパラメーターをデコードできません。[OpenResty][1] を使用してブラウザイベントを処理します。OpenResty は NGINX を Lua スクリプティングで拡張します。

上記の標準 NGINX ブロックとともに、このロケーションブロックを OpenResty サーバー構成に追加します。Lua コードには [`lua-resty-http`][2] ライブラリが必要です。

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

このエンドポイント経由でイベントをルーティングするように、ブラウザ SDK の `proxy` オプションを設定します。

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

Cloudflare Worker は、すべてのリクエストタイプを 1 つのスクリプトで処理し、管理するインフラストラクチャーなしでエッジで実行されます。

Cloudflare ダッシュボードで Worker を作成し、以下のスクリプトをデプロイします。Datadog サイトが US1 でない場合は、`DATADOG_SITE` を更新してください。

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

デプロイ後、Worker のカスタムドメインを設定し (例: `proxy.example.com`)、SDK オプションを次のように設定します。

| SDK オプション | 値 |
|---|---|
| フラグ構成 | `https://proxy.example.com/precompute-assignments` |
| エクスポージャー (モバイル)| `https://proxy.example.com/api/v2/exposures` |
| 評価 (モバイル)| `https://proxy.example.com/api/v2/flagevaluation` |
| ブラウザイベント (`proxy`)| `https://proxy.example.com/intake` |

{{% /tab %}}

{{% tab "Next.js (Vercel)" %}}

Next.js API ルートは、Vercel または任意の Node.js ホスティングプラットフォームにデプロイされた場合、リレープロキシとして機能します。

フラグ構成用、モバイルイベント用、ブラウザイベント用の 3 つの API ルートを作成します。

### フラグ構成ルート {#flag-configuration-route}

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

### モバイルイベントルート {#mobile-event-route}

キャッチオールルートが `/api/v2/exposures` と `/api/v2/flagevaluation` の両方を処理し、それぞれを Datadog モバイルインテークに転送します。

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

### ブラウザイベントルート {#browser-event-route}

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

デプロイ後に、SDK オプションを次のように設定します (`proxy.example.com` を Vercel ドメインに置き換えてください)。

| SDK オプション | 値 |
|---|---|
| フラグ構成 | `https://proxy.example.com/api/flag-config` |
| エクスポージャー (モバイル)| `https://proxy.example.com/api/v2/exposures` |
| 評価 (モバイル)| `https://proxy.example.com/api/v2/flagevaluation` |
| ブラウザイベント (`proxy`)| `https://proxy.example.com/api/intake` |

{{% /tab %}}

{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}