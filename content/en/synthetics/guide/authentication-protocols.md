---
title: Use Authentication In API And Multistep API Tests
kind: guide
description: Learn how to ensure your Synthetic API and multistep API tests can log in to your applications. 
further_reading:
- link: '/data_security/synthetics'
  tag: 'Documentation'
  text: 'Learn about Synthetics Data Security'
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Create an API test'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Create a multistep API test'
---

## Overview

[API tests][1] allow you to send requests to your applications' API endpoints to verify responses and defined conditions, such as overall response time, expected status code, header, or body content. [Multistep API tests][2] allow you to chain requests to proactively monitor sophisticated journeys on your key services, and ensure they are available at any time and from any managed or private location.

This guide discusses the various authentication protocols available for Synthetic API and multistep API tests. For more information about authentication in browser tests, see [Running Tests On An Application That Requires Authentication][3].

## Authentication methods

If your endpoint requires authentication, you can add your credentials when [creating an API][4] or [multistep API test][5]. API and multistep API tests support the following authentication protocols: Basic Access Authentication, Digest Access Authentication, OAuth2.0, NTLM, AWS Sigv4, and client certificates. 

In the **Define the request** section, click **Advanced Options** > **Authentication** and select an authentication method: 

{{< tabs >}}
{{% tab "Basic Access" %}}

Click **HTTP Basic Auth** and enter a username and password. Basic access authentication is supported in [HTTP tests][1], [multistep API tests][2], and [WebSocket tests][3].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
[3]: /synthetics/api_tests/websocket_tests/
{{% /tab %}}
{{% tab "Digest Access" %}}

Click **Digest Auth** and enter a username and password. Digital access authentication is supported in [HTTP tests][1] and [multistep API tests][2].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
{{% /tab %}}
{{% tab "OAuth 2.0" %}}

Click **OAuth 2.0**, select a grant type (**Client Credentials** or **Resource Password**), and include an Access Token URL, Client ID, and Client Secret. Select a token API authentication method (**Send as Basic Auth header** or **Send client credentials in body**) and optionally, include an audience, resource, and scope. OAuth 2.0 authentication is supported in [HTTP tests][1] and [multistep API tests][2].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
{{% /tab %}}
{{% tab "NTLM" %}}

Click **NTLM**, enter a username and password, and optionally, a domain and work station. NTLM authentication is supported in [HTTP tests][1] and [multistep API tests][2].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
{{% /tab %}}
{{% tab "AWS Signature" %}}

Click **AWS Signature**, enter an Access Key ID and Secret Access Key, and optionally, a region, service name, and session token. AWS Signature authentication is supported in [HTTP tests][1] and [multistep API tests][2].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
{{% /tab %}}
{{% tab "Client Certificate" %}}

Click **Upload File** to upload a private key file and a certificate file. Client 
Certificate authentication is supported in [HTTP tests][1], [multistep API tests][2], [SSL tests][3], and [gRPC tests][4].

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
[3]: /synthetics/api_tests/ssl_tests/
[4]: /synthetics/api_tests/grpc_tests/
{{% /tab %}}
{{< /tabs >}}

## Account security

If you want to hide user credentials from your test results and configuration, you can use global and local variables when [creating an API][4] or [multistep API test][5].

### Global variables

By storing your credentials as global variables, you can:

- Easily reuse them across multiple tests.
- Hide their values from test results and configurations by selecting **Hide and obfuscate variable value**.
- Restrict their access to a subset of your organization's users by using [custom roles][6].

### Local variables

By storing your credentials as local variables, your credentials are scoped to a unique test. In order to hide their values from test results and configurations, select **Hide and obfuscate variable value**.

For more information about data security, see [Synthetic Monitoring Data Security][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
[3]: /synthetics/guide/app-that-requires-login/
[4]: https://app.datadoghq.com/synthetics/create?subtype=http
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[7]: /data_security/synthetics
[8]: /synthetics/api_tests/grpc_tests