---
title: Scopes
disable_sidebar: true
---

## Overview

Scope is an authorization mechanism that allows you to limit and define the granular access that applications have to an organization’s Datadog data. When authorized access on behalf of a user or service account, applications can access only the information explicitly requested and nothing more.

The best practice for scoping applications is to maintain the minimal privileges and most restrictive scopes necessary for an application to function as intended. This gives users fine-grained access control of applications and transparency into how an application is using their data. For example, a third-party application that only reads dashboard data does not need permissions to delete or manage users in an organization.

Ways to use scopes with Datadog:
- Add scopes to OAuth2 clients for your [Datadog Apps][1]
- Add scopes for your application keys

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/developers/datadog_apps/#oauth-api-access
