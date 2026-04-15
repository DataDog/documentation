---
title: Secure Embedded Dashboards
description: Embed Datadog dashboards in authenticated websites using backend-generated tokens without exposing credentials to the browser.
further_reading:
- link: "/dashboards/sharing/shared_dashboards/"
  tag: "Documentation"
  text: "Shared Dashboards"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
---

## Overview

Secure embedded dashboards allow you to embed Datadog dashboards in external, authenticated websites without making the dashboard publicly accessible. Unlike [standard embedded dashboards][1], secure embedded dashboards use a backend-generated token to authenticate each page load. Your application server holds the credential and generates a unique iFrame URL per session—the credential is never sent to the browser.

If a URL is copied or reused outside of the intended session or application, it is no longer valid. This helps ensure the dashboard remains accessible only within your authenticated environment.

Use secure embedded dashboards when you need to:
- Embed dashboards in customer-facing or authenticated applications where public access is not acceptable.
- Support browsers that block third-party cookies, such as Safari.

## Prerequisites

- A Datadog dashboard you want to embed
- A backend server where you can store the credential and generate iFrame URLs dynamically for each page load
- Embed sharing enabled in [**Organization Settings > Public Sharing > Settings**][3]
- An organization role with embed sharing permissions, configured in [**Organization Settings > Roles**][4]

## Create a secure embed

1. From the dashboard you want to embed, click **Share** in the upper-right corner.
2. Select **Share dashboard**.
3. Select the **Embed** option.
4. Toggle **Secure** under **Embed Type**.
5. Configure name, default time frame, and theme options.
6. Click **Share Dashboard**.

After creating the secure embed, Datadog displays your **base URL** and **credential**. Copy and store the credential securely on your backend; it is only shown once. Treat the credential like an API key: anyone with access to it can generate valid embed URLs for this dashboard.

The base URL is visible in the sharing modal at any time, but the credential is masked after initial creation.

<div class="alert alert-info">You cannot change the share type of an existing shared dashboard to or from Secure Embed. To switch share types, delete the current shared dashboard and create a new one.</div>

## Generate the iFrame URL

Each time a browser user loads a page that includes the embedded dashboard, your backend must generate a unique, short-lived iFrame URL. The URL includes a login token signed with your credential using HMAC-SHA256.

**Never expose the credential in frontend code.** Anyone who obtains it can generate valid embed URLs for your dashboard.

### URL format

```
<BASE_URL>?token=<LOGIN_TOKEN>&nonce=<NONCE>&ts=<TIMESTAMP>
```

| Parameter     | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| `BASE_URL`    | The base URL from your secure embed configuration.                            |
| `LOGIN_TOKEN` | An HMAC-SHA256 hex digest of `NONCE\|TIMESTAMP`, signed with your credential. |
| `NONCE`       | A unique, randomly generated value for each request.                          |
| `TIMESTAMP`   | The current UNIX timestamp in seconds.                                        |

Datadog validates the login token on each request. A token is valid for 30 minutes from its timestamp and can only be used once. After a successful validation, the browser gains access to the embedded dashboard for 30 days.

### Backend code examples

The following examples show how to generate a secure embed URL on your backend server. Provide the credential from your secure credential store and the base URL from your secure embed configuration.

{{< programming-lang-wrapper langs="python,javascript,ruby,go" >}}

{{< programming-lang lang="python" >}}
```python
import hmac
import hashlib
import time
import secrets
from urllib.parse import urlencode

def generate_secure_embed_url(
    credential: str,
    base_url: str,
) -> str:
    nonce = secrets.token_hex(16)
    timestamp = int(time.time())

    # Message used to derive the token
    msg = f"{nonce}|{timestamp}".encode("utf-8")

    login_token = hmac.new(
        key=credential.encode("utf-8"),
        msg=msg,
        digestmod=hashlib.sha256,
    ).hexdigest()

    query = urlencode({
        "token": login_token,
        "nonce": nonce,
        "ts": str(timestamp),
    })

    return f"{base_url}?{query}"
```
{{< /programming-lang >}}

{{< programming-lang lang="javascript" >}}
```javascript
const crypto = require('crypto');
const querystring = require('querystring');

function generateSecureEmbedUrl(credential, baseUrl) {
  const nonce = crypto.randomBytes(16).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000);
  const msg = `${nonce}|${timestamp}`;
  const loginToken = crypto
    .createHmac('sha256', credential)
    .update(msg)
    .digest('hex');
  const query = querystring.stringify({
    token: loginToken,
    nonce: nonce,
    ts: String(timestamp),
  });
  return `${baseUrl}?${query}`;
}
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'openssl'
require 'securerandom'
require 'uri'

def generate_secure_embed_url(credential, base_url)
  nonce = SecureRandom.hex(16)
  timestamp = Time.now.to_i
  msg = "#{nonce}|#{timestamp}"
  login_token = OpenSSL::HMAC.hexdigest('SHA256', credential, msg)
  query = URI.encode_www_form(token: login_token, nonce: nonce, ts: timestamp.to_s)
  "#{base_url}?#{query}"
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "crypto/hmac"
    "crypto/rand"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "net/url"
    "strconv"
    "time"
)

func generateSecureEmbedURL(credential, baseURL string) string {
    nonceBytes := make([]byte, 16)
    rand.Read(nonceBytes)
    nonce := hex.EncodeToString(nonceBytes)
    timestamp := time.Now().Unix()

    msg := fmt.Sprintf("%s|%d", nonce, timestamp)
    mac := hmac.New(sha256.New, []byte(credential))
    mac.Write([]byte(msg))
    loginToken := hex.EncodeToString(mac.Sum(nil))

    params := url.Values{}
    params.Set("token", loginToken)
    params.Set("nonce", nonce)
    params.Set("ts", strconv.FormatInt(timestamp, 10))

    return fmt.Sprintf("%s?%s", baseURL, params.Encode())
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Embed the iFrame

How you integrate the iFrame depends on whether your application renders HTML on the client or server side.

**Client-side rendering**: Your backend exposes an API endpoint that returns the secure URL. Your frontend fetches the URL and renders the iFrame dynamically.

Backend API endpoint (Python/Flask example):
```python
# Optional: Replace '*' with your application's origin to restrict cross-origin requests.
@app.get("/api/embed-url")
@cross_origin(origins="*", methods=["GET", "OPTIONS"], allow_headers=["Content-Type"])
def embed_url():
    credential = get_credential_from_secure_store()
    base_url = get_base_url_from_secure_store()
    iframe_url = generate_secure_embed_url(credential, base_url)
    return jsonify({"iframeUrl": iframe_url})
```

Frontend (vanilla JavaScript):
```html
<div id="container">Loading...</div>
<script>
  async function renderEmbed() {
    const container = document.getElementById("container");
    try {
      const res = await fetch("/api/embed-url");
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const { iframeUrl } = await res.json();

      const iframe = document.createElement("iframe");
      iframe.src = iframeUrl;
      iframe.style.width = "100%";
      iframe.style.height = "85vh";
      iframe.style.border = "0";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer";
      iframe.allow = "fullscreen";
      iframe.title = "Secure Embedded Dashboard";

      container.innerHTML = "";
      container.appendChild(iframe);
    } catch (e) {
      container.textContent = `Error loading embed: ${e.message}`;
    }
  }

  renderEmbed();
</script>
```

**Server-side rendering**: Generate the secure URL on the server and render it directly into the HTML response.

Backend (Python/Flask example):
```python
@app.get("/dashboard")
def dashboard():
    credential = get_credential_from_secure_store()
    base_url = get_base_url_from_secure_store()
    iframe_url = generate_secure_embed_url(credential, base_url)
    return render_template("dashboard.html", iframe_url=iframe_url)
```

HTML template:
```html
<iframe
  src="{{ iframe_url }}"
  style="width: 100%; height: 85vh; border: 0;"
  referrerpolicy="no-referrer"
  loading="lazy"
  allow="fullscreen"
></iframe>
```

## Multi-tenancy

To serve multiple tenants from a single source dashboard, create one secure embed per tenant. Set `selectable_template_vars` with `visible_tags` scoped to each tenant's resources. Each tenant gets a unique credential and base URL, which your backend stores and retrieves when generating iFrame URLs.

```text
Dashboard
  └── Secure Embed 1: Tenant A  →  visible_tags scoped to Tenant A
  └── Secure Embed 2: Tenant B  →  visible_tags scoped to Tenant B
  └── Secure Embed 3: Tenant C  →  visible_tags scoped to Tenant C
```

### Manage tenant embeds

The following example uses the [Secure Embed API][5] to create, update, and delete embeds per tenant.

Before using this code, implement the following helper functions for your environment:

- `get_org_id_for_tenant(tenant_id)`: returns the org ID for the tenant
- `get_hosts_for_tenant(tenant_id)`: returns the list of hosts for the tenant
- `is_new_tenant(tenant_id)`, `is_existing_tenant(tenant_id)`, `is_offboarding_tenant(tenant_id)`: tenant lifecycle checks
- `save_tenant_credentials(tenant_id, token, base_url, credential)`: stores the tenant's share token, base URL, and credential in your secret store
- `get_secure_embed_token_for_tenant(tenant_id)`: retrieves the share token for a tenant from your secret store
- `get_base_url_for_tenant(tenant_id)`: retrieves the base URL for a tenant from your secret store
- `get_credential_for_tenant(tenant_id)`: retrieves the credential for a tenant from your secret store
- `get_tenant_id_for_user(user_id)`: maps an authenticated user to their tenant ID
- `delete_tenant_credentials(tenant_id)`: removes the tenant's credentials from your secret store

```python
import requests

DD_API_URL = "https://api.datadoghq.com"
DASHBOARD_ID = "abc-def-ghi"
HEADERS = {
    "Content-Type": "application/vnd.api+json",
    "DD-API-KEY": DD_API_KEY,
    "DD-APPLICATION-KEY": DD_APP_KEY,
}


def build_selectable_template_vars(tenant_id: str) -> list[dict]:
    return [
        {
            "name": "org_id",
            "prefix": "org_id",
            "default_values": [get_org_id_for_tenant(tenant_id)],
            "visible_tags": [get_org_id_for_tenant(tenant_id)],
        },
        {
            "name": "host",
            "prefix": "host",
            "default_values": get_hosts_for_tenant(tenant_id),
            "visible_tags": get_hosts_for_tenant(tenant_id),
        },
    ]


def onboard_tenant(tenant_id: str) -> dict:
    resp = requests.post(
        f"{DD_API_URL}/api/v2/dashboard/{DASHBOARD_ID}/shared/secure-embed",
        headers=HEADERS,
        json={
            "data": {
                "type": "secure_embed_request",
                "attributes": {
                    "status": "active",
                    "title": f"Dashboard - Tenant {tenant_id}",
                    "global_time_selectable": False,
                    "selectable_template_vars": build_selectable_template_vars(tenant_id),
                    "viewing_preferences": {"high_density": False, "theme": "system"},
                    "global_time": {"live_span": "1h"},
                },
            }
        },
    )
    resp.raise_for_status()
    data = resp.json()["data"]["attributes"]

    # The credential is only returned on creation. Store it in a secret store.
    return {
        "token": data["token"],
        "base_url": data["url"],
        "credential": data["credential"],
    }


def update_tenant(tenant_id: str, share_token: str):
    resp = requests.patch(
        f"{DD_API_URL}/api/v2/dashboard/{DASHBOARD_ID}/shared/secure-embed/{share_token}",
        headers=HEADERS,
        json={
            "data": {
                "type": "secure_embed_update_request",
                "attributes": {
                    "selectable_template_vars": build_selectable_template_vars(tenant_id),
                },
            }
        },
    )
    resp.raise_for_status()


def offboard_tenant(share_token: str):
    resp = requests.delete(
        f"{DD_API_URL}/api/v2/dashboard/{DASHBOARD_ID}/shared/secure-embed/{share_token}",
        headers=HEADERS,
    )
    resp.raise_for_status()


def manage_tenant(tenant_id: str):
    if is_new_tenant(tenant_id):
        result = onboard_tenant(tenant_id)
        save_tenant_credentials(
            tenant_id, result["token"], result["base_url"], result["credential"]
        )

    elif is_existing_tenant(tenant_id):
        token = get_secure_embed_token_for_tenant(tenant_id)
        update_tenant(tenant_id, token)

    elif is_offboarding_tenant(tenant_id):
        token = get_secure_embed_token_for_tenant(tenant_id)
        offboard_tenant(token)
        delete_tenant_credentials(tenant_id)
```

### Generate the iFrame URL

The iFrame URL generation follows the same pattern as single-tenant setups. The difference is that your backend looks up the correct credential and base URL for the requesting user's tenant.

```python
@app.get("/api/embed-url")
@cross_origin(origins="*", methods=["GET", "OPTIONS"], allow_headers=["Content-Type"])
def embed_url():
    user_id = get_authenticated_user_id()
    tenant_id = get_tenant_id_for_user(user_id)
    credential = get_credential_for_tenant(tenant_id)
    base_url = get_base_url_for_tenant(tenant_id)
    iframe_url = generate_secure_embed_url(credential, base_url)
    return jsonify({"iframeUrl": iframe_url})
```

Because `visible_tags` is scoped to each tenant at embed creation time, the URL enforces data isolation: each tenant can only see the template variable values assigned to them.

## Limitations

**No credential rotation**
: If your credential is lost or leaked, delete the secure embed and create a new one. Consider disabling the Embed share type in your organization's [Public Sharing Settings][2] while you do so.

**No per-session revocation**
: To revoke all browser access to a secure embed, delete the shared dashboard. All active sessions are invalidated on deletion.

**Share type is not editable**
: You cannot change an existing shared dashboard to or from the Secure Embed type. Delete the shared dashboard and create a new one to switch share types.

## Troubleshooting

### CORS errors on the `/api/embed-url` fetch

If you are using client-side rendering and see CORS errors when your frontend fetches the embed URL, check the following:

- Your backend must set `Access-Control-Allow-Origin` to either `*` (all origins) or the exact origin of the requesting website.
- If your frontend fetch includes `credentials: 'include'`, the wildcard `*` is not valid for `Access-Control-Allow-Origin`. Your backend must respond with the exact requesting origin and also include the header `Access-Control-Allow-Credentials: true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/sharing/shared_dashboards/#embedded-shared-dashboards
[2]: https://app.datadoghq.com/organization-settings/public-sharing
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: /api/latest/dashboard-secure-embed/
