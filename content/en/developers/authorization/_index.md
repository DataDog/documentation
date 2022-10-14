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

[1]: https://datatracker.ietf.org/doc/html/rfc6749
