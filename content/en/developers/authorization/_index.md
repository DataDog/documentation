---
title: Authorization
type: documentation
further_reading:
- link: "/developers/integrations/oauth_for_data_integrations"
  tag: "documentation"
  text: "Implement OAuth for your Data Integration"
- link: "/developers/authorization/oauth2_in_datadog/"
  tag: "documentation"
  text: "Learn more about OAuth2 in Datadog"
- link: "/developers/authorization/oauth2_endpoints"
  tag: "api reference"
  text: "OAuth2 Authorization Endpoints Reference"
---

## Overview

Datadog uses the [OAuth 2.0 (OAuth2) Authorization Framework][1] to allow users to securely authorize third-party applications' access to restricted Datadog resources on behalf of the user. The access that applications have is determined by [scopes][2], which enable users to grant explicit consent for a specific set of granular permissions requested by the application. 

### Clients
An OAuth2 client is the component of an application that enables users to authorize the application access to Datadog resources on the user's behalf. OAuth2 defines two types of clients: public clients and confidential clients. 

Public clients are typically used for browser-based applications and are not capable of storing confidential information. Examples of public clients include OAuth clients for [Datadog Apps][3]. [Confidential clients][4] have the ability to store sensitive data and require an additional `client_secret` to make authorization requests. OAuth clients for data integrations are confidential clients. 

### Client credentials
When you create an OAuth client, a set of client credentials is issued in the form of a Client ID, and optionally, a Client Secret for confidential clients. The Client ID is used to identify your client when making requests to the authorization and token endpoints. The Client Secret, if issued, is used to authenticate the client when making requests to the authorization endpoints. The Client Secret should be immediately copied and stored securely as it is a confidential password exposed only once upon client creation. 

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/api/latest/scopes/
[3]: https://docs.datadoghq.com/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
