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

After creating the secure embed, Datadog displays your **share token** and **credential**. Copy and store the credential securely on your backend; it is only shown once. Treat the credential like an API key: anyone with access to it can generate valid embed URLs for this dashboard.

The share token is visible in the sharing modal at any time, but the credential is masked after initial creation.

<div class="alert alert-info">You cannot change the share type of an existing shared dashboard to or from Secure Embed. To switch share types, delete the current shared dashboard and create a new one.</div>

## Generate the iFrame URL

Each time a browser user loads a page that includes the embedded dashboard, your backend must generate a unique, short-lived iFrame URL. The URL includes a login token signed with your credential using HMAC-SHA256.

**Never expose the credential in frontend code.** Anyone who obtains it can generate valid embed URLs for your dashboard.

### URL format

```
https://<DOMAIN>/sb/secure-embed/<SHARE_TOKEN>?token=<LOGIN_TOKEN>&nonce=<NONCE>&ts=<TIMESTAMP>
```

| Parameter     | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| `DOMAIN`      | Your Datadog site (for example, `app.datadoghq.com` or `app.datadoghq.eu`).   |
| `SHARE_TOKEN` | The share token from your secure embed configuration.                         |
| `LOGIN_TOKEN` | An HMAC-SHA256 hex digest of `NONCE\|TIMESTAMP`, signed with your credential. |
| `NONCE`       | A unique, randomly generated value for each request.                          |
| `TIMESTAMP`   | The current UNIX timestamp in seconds.                                        |

Datadog validates the login token on each request. A token is valid for 30 minutes from its timestamp and can only be used once. After a successful validation, the browser gains access to the embedded dashboard for 30 days.

### Backend code examples

The following examples show how to generate a secure embed URL on your backend server. Provide the credential from your secure credential store, your share token, and your Datadog site domain.

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
    share_token: str,
    domain: str,
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

    return f"https://{domain}/sb/secure-embed/{share_token}?{query}"
```
{{< /programming-lang >}}

{{< programming-lang lang="javascript" >}}
```javascript
const crypto = require('crypto');
const querystring = require('querystring');

function generateSecureEmbedUrl(credential, shareToken, domain) {
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
  return `https://${domain}/sb/secure-embed/${shareToken}?${query}`;
}
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'openssl'
require 'securerandom'
require 'uri'

def generate_secure_embed_url(credential, share_token, domain)
  nonce = SecureRandom.hex(16)
  timestamp = Time.now.to_i
  msg = "#{nonce}|#{timestamp}"
  login_token = OpenSSL::HMAC.hexdigest('SHA256', credential, msg)
  query = URI.encode_www_form(token: login_token, nonce: nonce, ts: timestamp.to_s)
  "https://#{domain}/sb/secure-embed/#{share_token}?#{query}"
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

func generateSecureEmbedURL(credential, shareToken, domain string) string {
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

    return fmt.Sprintf("https://%s/sb/secure-embed/%s?%s", domain, shareToken, params.Encode())
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
    iframe_url = generate_secure_embed_url(credential, SHARE_TOKEN, DOMAIN)
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
    iframe_url = generate_secure_embed_url(credential, SHARE_TOKEN, DOMAIN)
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
