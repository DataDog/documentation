---
title: HTTP Requests
description: Make custom HTTP requests to endpoints with configurable authentication, methods, headers, and response handling for workflows and apps.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Find out more about connection credentials"
aliases:
- /service_management/app_builder/http_request/
- /service_management/workflows/connections/http/
- /service_management/app_builder/connections/http_request/
---

Use the {{< ui >}}Make request{{< /ui >}} action to make a custom request to an HTTP endpoint. You can control the request method and its contents, how it is authenticated and processed, and how it should respond to scenarios like expired certificates or redirects. If you need to add Datadog IP address ranges to your allowlist so that the HTTP action works as expected, use the IPs listed in the `webhooks` object. See the [IP Ranges API][1] for details.

To add an HTTP Request:

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- In a new workflow, click {{< ui >}}Add step{{< /ui >}} and search for `Make request`. Select the {{< ui >}}Make request{{< /ui >}} action to add it to your workflow.
- In an existing workflow, click {{< ui >}}+{{< /ui >}} and search for `Make request`. Select the {{< ui >}}Make request{{< /ui >}} action to add it to your workflow.

Specify the request method and any necessary [authentication][1]. Read the sections below for further information about the available configuration options. Optionally, the request can wait on conditions that you specify in the {{< ui >}}Conditional wait{{< /ui >}} section, and retry at a given interval if the condition is not satisfied.

[1]: /actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. In your app, under {{< ui >}}Data{{< /ui >}}, click {{< ui >}}+ New{{< /ui >}} and select {{< ui >}}Query{{< /ui >}}
1. Search for `HTTP`, then select the {{< ui >}}Make request{{< /ui >}} action to add it to your app.

Specify the request method and any necessary [authentication][1]. Read the sections below for further information about the available configuration options.

[1]: /actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## Authentication

If you need to authenticate your request, use the action's {{< ui >}}Connection{{< /ui >}} to configure the authentication method. You can either select a preconfigured connection from the dropdown, or create a connection.

### Create an AWS connection

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}AWS{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Account ID{{< /ui >}}, and {{< ui >}}AWS Role Name{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}}.

### Create an Azure connection

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}Azure{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Tenant ID{{< /ui >}}, {{< ui >}}Client ID{{< /ui >}}, and {{< ui >}}Client Secret{{< /ui >}}.
1. Optionally, enter the {{< ui >}}Custom Scope{{< /ui >}} to be requested from Microsoft when acquiring an OAuth 2.0 access token. A resource's scope is constructed using the identifier URI for the resource and `.default`, separated by a forward slash (`/`). For example, `{identifierURI}/.default`. For more information, see [the Microsoft documentation on .default scope][3].
1. Click {{< ui >}}Create{{< /ui >}}.

### Create an HTTP token authentication connection

The Token Auth connection uses a bearer token to authenticate the HTTP request.

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}HTTP{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}.
1. Enter the {{< ui >}}Base URL{{< /ui >}} for authentication.
1. From the {{< ui >}}Authentication Type{{< /ui >}} dropdown, select {{< ui >}}Token Auth{{< /ui >}}.
1. Enter a {{< ui >}}Token Name{{< /ui >}} and {{< ui >}}Token Value{{< /ui >}}. You can enter multiple tokens. To reference your token in a header, parameter, or the request body, use the syntax `{{ secretTokenName }}`.
1. Optionally, add additional {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} and a {{< ui >}}Body{{< /ui >}} to your request.
1. Click {{< ui >}}Create{{< /ui >}}.

### Create an HTTP basic authentication connection

The Basic Auth connection uses an authorization header with a username and password to authenticate the HTTP request.

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}HTTP{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}.
1. Enter the {{< ui >}}Base URL{{< /ui >}} for authentication.
1. From the {{< ui >}}Authentication Type{{< /ui >}} dropdown, select {{< ui >}}Basic Auth{{< /ui >}}.
1. Enter a {{< ui >}}Username{{< /ui >}} and {{< ui >}}Password{{< /ui >}}. The required authorization request header is automatically populated using your username and password.
1. Click {{< ui >}}Create{{< /ui >}}.

### Create a 2 Step HTTP authentication connection

The HTTP 2 step connection allows you to make a preliminary request to retrieve an access token with which to authenticate the HTTP request. This is useful for authenticating JSON Web Token (JWT) and OAuth applications.

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}HTTP{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}.
1. Enter the {{< ui >}}Base URL{{< /ui >}} for authentication.
1. From the {{< ui >}}Authentication Type{{< /ui >}} dropdown, select {{< ui >}}2 Step Auth{{< /ui >}}.

{{< tabs >}}
{{% tab "Token auth" %}}
Configure the preliminary access token query:
1. From the {{< ui >}}Secret Type{{< /ui >}} dropdown, select {{< ui >}}Token Auth{{< /ui >}}.
1. Enter a Token Name and Token Value
1. Enter the {{< ui >}}Request URL{{< /ui >}} and specify the type of request as either {{< ui >}}GET{{< /ui >}} or {{< ui >}}POST{{< /ui >}}.
1. Optionally, add additional {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} and a {{< ui >}}Body{{< /ui >}} to the request.

Get the access token from the response:
1. Under {{< ui >}}Variable Path to Access Token{{< /ui >}}, enter the path to the access token in the response. This is the path through which your access token is returned after making the authentication call. For example, if the access token is returned as the body of the access request, use `body`. If the access token is returned in a property called `token` of the response `body`, use `body.token`. Paths are case sensitive.
1. Optionally, enter a {{< ui >}}Refresh Interval{{< /ui >}}. This is the duration until the access token expires, specified in seconds. When the token expires, the connection automatically requests a new access token. Setting an interval of `0` disables token refresh.

Use your retrieved token to authenticate your connection:
1. Under {{< ui >}}Request Detail{{< /ui >}}, enter {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} and a {{< ui >}}Body{{< /ui >}} to complete your request using the retrieved access token.
1. Click {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}

{{% tab "Basic auth" %}}
Configure the preliminary authentication query:
1. From the {{< ui >}}Secret Type{{< /ui >}} dropdown, select {{< ui >}}Basic Auth{{< /ui >}}.
1. Enter a {{< ui >}}Username{{< /ui >}} and {{< ui >}}Password{{< /ui >}}. The {{< ui >}}Request Headers{{< /ui >}} section is automatically populated using your username and password.

Configure the authentication request:
1. Enter the {{< ui >}}Request URL{{< /ui >}} and specify the type of request as either {{< ui >}}GET{{< /ui >}} or {{< ui >}}POST{{< /ui >}}.
1. Optionally, add additional {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} and a {{< ui >}}Body{{< /ui >}} to the request.

Get the access token from the response:
1. Under {{< ui >}}Variable Path to Access Token{{< /ui >}}, enter the path to the access token in the response. This is the path through which your access token is returned after making the authentication call. For example, if the access token is returned as the body of the access request, use `body`. If the access token is returned in a property called `token` of the response `body`, use `body.token`. Paths are case sensitive.
1. Optionally, enter a {{< ui >}}Refresh Interval{{< /ui >}}. This is the duration until the access token expires, specified in seconds. When the token expires, the connection automatically requests a new access token. Setting an interval of `0` disables token refresh.

Use your retrieved token to authenticate your connection:
1. Under {{< ui >}}Request Detail{{< /ui >}}, enter {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} and a {{< ui >}}Body{{< /ui >}} to complete your request using the retrieved access token.
1. Click {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}
{{< /tabs >}}

### Create an HTTP mTLS connection

The Mutual TLS (mTLS) Auth connection allows you to use a private key and TLS certificate to authenticate the HTTP request.

<div class="alert alert-info">The client certificate (<code>.crt</code>, <code>.pem</code>) and private key (<code>.key</code>, <code>.pem</code>) must use the PEM format.</div>

1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}HTTP{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}.
1. Enter the {{< ui >}}Base URL{{< /ui >}} for authentication.
1. From the {{< ui >}}Authentication Type{{< /ui >}} dropdown, select {{< ui >}}mTLS Auth{{< /ui >}}.
1. Click {{< ui >}}Upload File{{< /ui >}} to upload your {{< ui >}}Private Key{{< /ui >}}.
1. Click {{< ui >}}Upload File{{< /ui >}} to upload your {{< ui >}}Certificate{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}}.

## Inputs

A URL and request method are required for your request. Optionally, you can enter:
- URL parameters
- headers
- the content type
- a request body
- cookies

You can also select whether you want to allow expired certificates, or follow redirects.

### Response options

Under {{< ui >}}Error on Status{{< /ui >}}, enter a comma-delineated list of any status codes on which to return an error. Use the {{< ui >}}Response Parsing{{< /ui >}} dropdown to override the default response parsing method inferred from the headers, and {{< ui >}}Response Encoding{{< /ui >}} if the target server specifies the wrong encoding in its response headers.

## Private actions

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Join the Preview!">}}
Private Actions are in Preview. Use this form to request access today.
{{< /callout >}}

You can use a private HTTP action to interact with services hosted on your private network without exposing your services to the public internet. Private actions make use of a private action runner which you install on a host in your network using Docker and pair with a Datadog Connection. For more information, see [Private Actions][5].

To configure a private HTTP request:
1. Add an HTTP action to your app.
1. In the {{< ui >}}Connection{{< /ui >}} section, click the plus icon ({{< ui >}}+{{< /ui >}}).
1. Select {{< ui >}}HTTP{{< /ui >}}.
1. Enter a {{< ui >}}Connection Name{{< /ui >}}.
1. Enter the {{< ui >}}Base URL{{< /ui >}} for the host in your private network.
1. For {{< ui >}}Type{{< /ui >}}, ensure that {{< ui >}}Private Action Runner{{< /ui >}} is selected.
1. From the {{< ui >}}Private Action Runner{{< /ui >}} dropdown, select your [private action runner][5].
1. From the {{< ui >}}Authentication Type{{< /ui >}} dropdown, select an Authentication type and fill in the required fields. Private HTTP requests support the following authentication types:
   - No authentication
   - [Basic authentication](#create-an-http-basic-authentication-connection)
   - [Token authentication](#create-an-http-token-authentication-connection)

   For information on configuring credentials for Token authentication, see [Handling Private Action Credentials][6].
1. Click {{< ui >}}Next, Confirm Access{{< /ui >}} and configure access to the query.
1. Click {{< ui >}}Create{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** or **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://docs.datadoghq.com/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /actions/private_actions
[6]: /actions/private_actions/private_action_credentials/?tab=httpsaction#credential-files