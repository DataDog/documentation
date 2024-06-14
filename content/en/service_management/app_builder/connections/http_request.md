---
title: HTTP Requests
kind: Documentation
disable_toc: false
aliases:
- service_management/app_builder/http_request/
further_reading:
- link: "/service_management/app_builder/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials for App Builder"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="" btn_hidden="true" header="Try the Beta!">}}
App Builder is in beta. Access it from the <a href="https://app.datadoghq.com/app-builder/">App Builder</a> page in Datadog.
{{< /callout >}}

Use the **Make request** action to make a custom request to an HTTP endpoint. You can control the request method and its contents, how it is authenticated and processed, and how it should respond to scenarios like expired certificates or redirects. If you need to add Datadog IP address ranges to your allowlist so that the HTTP action works as expected, use the IPs listed in the `webhooks` object. See the [IP Ranges API][1] for details.

To add an HTTP request:

1. In your app, under **Queries**, click **+** (plus) and search for `HTTP`.
1. Select the **Make request** action to add it to your app.

Specify the request method and any necessary [authentication][2]. Read the sections below for further information about the available configuration options.

## Authentication

If you need to authenticate your request, use the action's **Connection** to configure the authentication method. You can either select a preconfigured connection from the dropdown, or create a connection.

### Create an AWS connection

1. In the **Connection** section, click the plus icon (**+**).
1. Select **AWS**.
1. Enter a **Connection Name**, **Account ID**, and **AWS Role Name**.
1. Click **Create**.

### Create an Azure connection

1. In the **Connection** section, click the plus icon (**+**).
1. Select **Azure**.
1. Enter a **Connection Name**, **Tenant ID**, **Client ID**, and **Client Secret**.
1. Optionally, enter the **Custom Scope** to be requested from Microsoft when acquiring an OAuth 2 access token. A resource's scope is constructed using the identifier URI for the resource and `.default`, separated by a forward slash (`/`). For example, `{identifierURI}/.default`. For more information, see [the Microsoft documentation on .default scope][3].
1. Click **Create**.

### Create an HTTP token authentication connection

The Token Auth connection uses a bearer token to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. Enter the **Base URL** for authentication.
1. For Type, ensure that **Datadog** is selected.
1. From the **Authentication Type** dropdown, select **Token Auth**.
1. Enter a **Token Name** and **Token Value**. You can enter multiple tokens. To reference your token in a header, parameter, or the request body, use the syntax `{{ secretTokenName }}`.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to your request.
1. Click **Create**.

### Create an HTTP basic authentication connection

The Basic Auth connection uses an authorization header with a username and password to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. Enter the **Base URL** for authentication.
1. 1. For Type, ensure that **Datadog** is selected.
1. From the **Authentication Type** dropdown, select **Basic Auth**.
1. Enter a **Username** and **Password**. The required authorization request header is automatically populated using your username and password.
1. Click **Create**.

### Create a 2 Step HTTP authentication connection

The HTTP 2 step connection allows you to make a preliminary request to retrieve an access token with which to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. Enter the **Base URL** for authentication.
1. For Type, ensure that **Datadog** is selected.
1. From the **Authentication Type** dropdown, select **2 Step Auth**.

{{< tabs >}}
{{% tab "Token auth" %}}
Configure the preliminary access token query:
1. From the **Secret Type** dropdown, select **Token Auth**.
1. Enter a Token Name and Token Value
1. Enter the **Request URL** and specify the type of request as either **GET** or **POST**.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to the request.

Get the access token from the response:
1. Under **Variable Path to Access Token**, enter the path to the access token in the response. This is the path through which your access token is returned after making the authentication call. For example, if the access token is returned as the body of the access request, use `body`. If the access token is returned in a property called `token` of the response `body`, use `body.token`. Paths are case sensitive.
1. Optionally, enter a **Refresh Interval**. This is the duration until the access token expires, specified in seconds. When the token expires, the connection automatically requests a new access token. Setting an interval of `0` disables token refresh.

Use your retrieved token to authenticate your connection:
1. Under **Request Detail**, enter **Request Headers**, **URL parameters** and a **Body** to complete your request using the retrieved access token.
1. Click **Create**.
{{% /tab %}}

{{% tab "Basic auth" %}}
Configure the preliminary authentication query:
1. From the **Secret Type** dropdown, select **Basic Auth**.
1. Enter a **Username** and **Password**. The **Request Headers** section is automatically populated using your username and password.

Configure the authentication request:
1. Enter the **Request URL** and specify the type of request as either **GET** or **POST**.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to the request.

Get the access token from the response:
1. Under **Variable Path to Access Token**, enter the path to the access token in the response. This is the path through which your access token is returned after making the authentication call. For example, if the access token is returned as the body of the access request, use `body`. If the access token is returned in a property called `token` of the response `body`, use `body.token`. Paths are case sensitive.
1. Optionally, enter a **Refresh Interval**. This is the duration until the access token expires, specified in seconds. When the token expires, the connection automatically requests a new access token. Setting an interval of `0` disables token refresh.

Use your retrieved token to authenticate your connection:
1. Under **Request Detail**, enter **Request Headers**, **URL parameters** and a **Body** to complete your request using the retrieved access token.
1. Click **Create**.
{{% /tab %}}
{{< /tabs >}}

### Create an HTTP mTLS connection

The Mutual TLS (mTLS) Auth connection allows you to use a private key and TLS certificate to authenticate the HTTP request.

<div class="alert alert-info">The client certificate (<code>.crt</code>, <code>.pem</code>) and private key (<code>.key</code>, <code>.pem</code>) must use the PEM format.</div>

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. Enter the **Base URL** for authentication.
1. For Type, ensure that **Datadog** is selected.
1. From the **Authentication Type** dropdown, select **mTLS Auth**.
1. Click **Upload File** to upload your **Private Key**.
1. Click **Upload File** to upload your **Certificate**.
1. Click **Create**.

## Inputs

A URL and request method are required for your request. Optionally, you can enter:
- URL parameters
- headers
- the content type
- a request body
- cookies

You can also select whether you want to allow expired certificates, or follow redirects.

### Response options

Under **Error on Status**, enter a comma-delineated list of any status codes on which to return an error. Use the **Response Parsing** dropdown to override the default response parsing method inferred from the headers, and **Response Encoding** if the target server specifies the wrong encoding in its response headers.

## Private actions

{{< callout url="https://google.com" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
{{< /callout >}}

You can use a private HTTP action to interact with services hosted on your private network without exposing your services to the public internet. Private actions make use of a private action runner which you install on a host in your network and pair with a Datadog Connection. For more information, see [Private Actions][5].

To configure a private HTTP request:
1. Add an HTTP query to your app.
1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. Enter the **Base URL** for the host in your private network.
1. For Type, ensure that **Private Action Runner** is selected.
1. From the **Private Action Runner** drop-down, select your [private action runner][5].
1. From the **Authentication Type** dropdown, select an Authentication type and fill in the required fields. Private HTTP requests support the following authentication types:
   - No authentication
   - [Basic authentication](#create-an-http-basic-authentication-connection)
   - [Token authentication](#create-an-http-token-authentication-connection)
   
   For information on configuring credentials for Token authentication, see [Handling Private Action Credentials][6].
1. Click **Next, Confirm Access** and configure access to the query.
1. Click **Create**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://docs.datadoghq.com/api/latest/ip-ranges/#list-ip-ranges
[2]: /service_management/app_builder/auth/
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://datadoghq.slack.com/
[5]: /service_management/app_builder/private_actions
[6]: /service_management/workflows/guide/private_action_credentials/?tab=httpsaction#credential-files
