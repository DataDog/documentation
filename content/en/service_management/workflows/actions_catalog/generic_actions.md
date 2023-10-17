---
title: Generic Actions
kind: documentation
disable_toc: false
disable_sidebar: false
type: documentation
is_beta: true
aliases:
- /workflows/generic_actions
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

Generic actions are workflow actions that are not associated with a tool or integration. If an action you need is missing from the Actions catalog, you might be able to solve your use case with a generic action.

As with all workflow actions, you can use the [context variables][1] tab to access any values available in the workflow context.

You can also [request a new action or entire integration][5].

## HTTP

Use the HTTP action to make a request to a custom endpoint. You can control the request method and its contents, how it is authenticated and processed, and how it should respond to scenarios like expired certificates or redirects. If you need to add Datadog IP address ranges to your allowlist so that the HTTP action works as expected, use the IPs listed in the `webhooks` object. See the [IP Ranges page][2] for details.

Begin by specifying the request method and any necessary [authentication][3]. Read the sections below for further information about the available configuration tabs. Optionally, the request can wait on conditions that you specify in the **Conditional wait** section, and retry itself at a given interval if the condition is not satisfied.

### Authentication

If you need to authenticate your request, use the action's **Connection** to configure the authentication method. You can either select a preconfigured connection from the dropdown, or create a connection.

#### Create an AWS connection

1. In the **Connection** section, click the plus icon (**+**).
1. Select **AWS**.
1. Enter a **Connection Name**, **Account ID**, and **AWS Role Name**.
1. Click **Create**.

#### Create an Azure connection

1. In the **Connection** section, click the plus icon (**+**).
1. Select **Azure**.
1. Enter a **Connection Name**, **Tenant ID**, **Client ID**, and **Client Secret**.
1. Optionally, enter the **Custom Scope** to be requested from Microsoft when acquiring an OAuth 2 access token. A resource's scope is constructed using the identifier URI for the resource and `.default`, separated by a forward slash (`/`). For example, `{identifierURI}/.default`. For more information, see [the Microsoft documentation on .default scope][6].
1. Click **Create**.

#### Create an HTTP basic auth connection

The Basic Auth connection uses an authorization header with a username and password to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. From the **Authentication Type** dropdown, select **Basic Auth**.
1. Enter a **Username** and **Password**.
1. Enter the **Base URL** for authentication. The required authorization request header is automatically populated using your username and password, but you can add additional **Request Headers** if necessary.
1. Optionally, add **URL parameters** and a **Body** to your request.
1. Click **Create**.

#### Create an HTTP token auth connection

The Token Auth connection uses a bearer token to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. From the **Authentication Type** dropdown, select **Token Auth**.
1. Enter a **Token Name** and **Token Value**. You can enter multiple tokens. To reference your token in a header, parameter, or the request body, use the syntax `{{ secretTokenName }}`.
1. Enter the **Base URL** for authentication.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to your request.
1. Click **Create**.

#### Create an HTTP request auth connection

The HTTP Request Auth connection allows you to make a preliminary request to retrieve an access token with which to authenticate the HTTP request.

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. From the **Authentication Type** dropdown, select **HTTP Request Auth**.

Configure the preliminary access token request:
1. In the **Access token request** section, under **Secret Type**, enter a **Token Name** and **Token Value**. You can enter multiple tokens.
1. Under **Request Setup**, enter a **Variable Reference Path**. This is the path through which your access token is returned after making the authentication call. For example, if the access token is returned as the body of the access request, use `body`. If the access token is returned in a property called `token` of the response `body`, use `body.token`. Paths are case sensitive.
1. Optionally, enter a **Refresh Interval**. This is the duration until the access token expires, specified in seconds. When the token expires, the connection automatically requests a new access token. Setting an interval of `0` disables token refresh.
1. Enter the **Request URL** and specify the type of request as either **GET** or **POST**.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to the request.

Configure the authentication request:
1. In the **Request details** section, enter the **Base URL** for the authentication request. To reference your token in a header, parameter, or the request body, use `{{ accessToken }}`. For example: `Authentication: Bearer {{ accessToken }}`.
1. Optionally, add additional **Request Headers**, **URL parameters** and a **Body** to your request.
1. Click **Create**.

#### Create an HTTP mTLS connection

The Mutual TLS (mTLS) Auth connection allows you to use a private key and TLS certificate to authenticate the HTTP request.

<div class="alert alert-info">The client certificate (<code>.crt</code>, <code>.pem</code>) and private key (<code>.key</code>, <code>.pem</code>) must use the PEM format.</div>

1. In the **Connection** section, click the plus icon (**+**).
1. Select **HTTP**.
1. Enter a **Connection Name**.
1. From the **Authentication Type** dropdown, select **mTLS Auth**.
1. Click **Upload File** to upload your **Private Key**.
1. Click **Upload File** to upload your **Certificate**.
1. Click **Create**.

### Inputs

A URL and request method are required for your request. Optionally, you can enter:
- URL parameters
- headers
- the content type
- a request body
- cookies

You can also select whether you want to allow expired certificates, or follow redirects.

#### Response options

Under **Error on Status**, enter a comma-delineated list of any status codes on which to return an error. Use the **Response Parsing** dropdown to override the default response parsing method inferred from the headers, and **Response Encoding** if the target server specifies the wrong encoding in its response headers.

## Data transformation

The **Expression** and **Function** actions perform custom data transformations within your workflows using JavaScript. Use the values of any context variables available within your workflow as inputs for your JavaScript expressions and functions with the syntax `$.Steps.<step_name>.<variable>`. You can also use `_` to make use of [Lodash][4] in your data transformation actions with the same syntax. For example, to reference the HTTP request status variable (`status`) from the HTTP request step (`Make_request`), you'd use the following context variable: 

```
$.Steps.Make_request.status
```

And to apply the `_.includes` Lodash function on an array returned by a previous step `Array_function` to determine if it includes the name `Bits`, you'd use the following syntax:

```
_.includes($.Steps.Array_function.data, "Bits")
```

The data returned by these actions can then be referenced in subsequent steps of the workflow.

### Expression

Use expression actions for data transformations that can be accomplished in a single line of code, and do not require variable assignments or multiple standalone operations. For example:

`[1, 2, 3].filter(x => x < 3)`

### Function

The function action allows for variable assignments and data transformations requiring multiple expressions.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/build/#context-variables
[2]: https://docs.datadoghq.com/api/latest/ip-ranges/#list-ip-ranges
[3]: /service_management/workflows/access/
[4]: https://lodash.com/
[5]: https://forms.gle/JzPazvxXox7fvA2R8
[6]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
