---
further_reading:
- link: https://www.datadoghq.com/blog/oauth/
  tag: Blog
  text: Authorize your Datadog integrations with OAuth
- link: /developers/integrations/oauth_for_integrations
  tag: Documentation
  text: Implement OAuth for your integration
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentation
  text: Learn more about OAuth2 in Datadog
- link: /developers/authorization/oauth2_endpoints
  tag: API
  text: OAuth2 Authorization Endpoints Reference
title: Authorization
type: documentation
---

## Overview

Datadog uses the [OAuth 2.0 (OAuth2) Authorization Framework][1] to allow users to securely authorize third-party applications' access to restricted Datadog resources on behalf of the user. The access that applications have is determined by [scopes][2], which enable users to grant explicit consent for a specific set of granular permissions requested by the application. 

## Clients and credentials

An OAuth2 client is the component of an application that enables users to authorize the application access to Datadog resources on the user's behalf. OAuth2 defines two types of clients: public and [confidential][3]. 

Public Clients
: Typically used for browser-based applications and are not capable of storing confidential information.
<!--Examples of public clients include OAuth clients for [UI Extensions][4]. -->

Confidential Clients
: Capable of storing sensitive data and requires an additional `client_secret` to make authorization requests. OAuth clients for integrations are confidential clients. 

When you create an OAuth client, a set of client credentials is issued in the form of a client ID, and optionally, a client secret for confidential clients. 

Client ID 
: Used to identify your client when making requests to the authorization and token endpoints. 

Client Secret 
: If issued, used to authenticate the client when making requests to the authorization endpoints. Immediately copy and store the client secret securely as it is a confidential password exposed only once upon client creation. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/ja/api/latest/scopes/
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[4]: https://docs.datadoghq.com/ja/developers/ui_extensions/#oauth-api-access