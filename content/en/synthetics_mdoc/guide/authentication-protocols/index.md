---
title: Use Authentication In API And Multistep API Tests
description: >-
  Learn how to ensure your Synthetic API and multistep API tests can log in to
  your applications.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Authentication In API And Multistep API Tests
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/authentication-protocols/index.html
---

# Use Authentication In API And Multistep API Tests

## Overview{% #overview %}

[API tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) allow you to send requests to your applications' API endpoints to verify responses and defined conditions, such as overall response time, expected status code, header, or body content. [Multistep API tests](https://docs.datadoghq.com/synthetics/multistep/) allow you to chain requests to proactively monitor sophisticated journeys on your key services, and ensure they are available at any time and from any managed or private location.

This guide discusses the various authentication protocols available for Synthetic API and multistep API tests. For more information about authentication in browser tests, see [Running Tests On An Application That Requires Authentication](https://docs.datadoghq.com/synthetics/guide/app-that-requires-login/).

## Authentication methods{% #authentication-methods %}

If your endpoint requires authentication, you can add your credentials when [creating an API](https://app.datadoghq.com/synthetics/create?subtype=http) or [multistep API test](https://app.datadoghq.com/synthetics/multi-step/create). API and multistep API tests support the following authentication protocols: Basic Access Authentication, Digest Access Authentication, OAuth2.0, NTLM, AWS Sigv4, and client certificates.

In the **Define the request** section, click **Advanced Options** > **Authentication** and select an authentication method:

{% tab title="Basic Access" %}
Click **HTTP Basic Auth** and enter a username and password. Basic access authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/), [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/), and [WebSocket tests](https://docs.datadoghq.com/synthetics/api_tests/websocket_tests/).
{% /tab %}

{% tab title="Digest Access" %}
Click **Digest Auth** and enter a username and password. Digital access authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) and [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/).
{% /tab %}

{% tab title="AWS Signature" %}
Click **AWS Signature** and enter an Access Key ID and Secret Access Key. Optionally, enter a region, service name, and session token. AWS Signature authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) and [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/).
{% /tab %}

{% tab title="NTLM" %}
Click **NTLM**, enter a username and password, and optionally, a domain and work station. NTLM authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) and [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/).
{% /tab %}

{% tab title="Kerberos" %}
Click **Kerberos** and fill in the **Domain** field. See [Kerberos Authentication for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/kerberos-authentication) for more information.
{% /tab %}

{% tab title="OAuth 2.0" %}
Click **OAuth 2.0**, select a grant type (**Client Credentials** or **Resource Password**), and enter an Access Token URL, Client ID, and Client Secret. Select a token API authentication method (**Send as Basic Auth header** or **Send client credentials in body**). Optionally, include an audience, resource, and scope. OAuth 2.0 authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) and [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/).
{% /tab %}

{% tab title="Client Certificate" %}
Click **Upload File** to upload a private key file and a certificate file. Client Certificate authentication is supported in [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/), [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/), [SSL tests](https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/), and [gRPC tests](https://docs.datadoghq.com/synthetics/api_tests/grpc_tests/).
{% /tab %}

## Account security{% #account-security %}

If you want to hide user credentials from your test results and configuration, you can use global and local variables when [creating an API](https://app.datadoghq.com/synthetics/create?subtype=http) or [multistep API test](https://app.datadoghq.com/synthetics/multi-step/create).

### Global variables{% #global-variables %}

By storing your credentials as global variables, you can:

- Easily reuse them across multiple tests.
- Hide their values from test results and configurations by selecting **Hide and obfuscate variable value**.
- Restrict their access to a subset of your organization's users by using [custom roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#create-a-custom-role).

### Local variables{% #local-variables %}

By storing your credentials as local variables, your credentials are scoped to a unique test. In order to hide their values from test results and configurations, select **Hide and obfuscate variable value**.

For more information about data security, see [Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics).

## Further Reading{% #further-reading %}

- [Learn about Synthetics Data Security](https://docs.datadoghq.com/data_security/synthetics)
- [Create an API test](https://docs.datadoghq.com/synthetics/api_tests)
- [Create a multistep API test](https://docs.datadoghq.com/synthetics/multistep)
