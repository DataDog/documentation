---
title: Integrations
description: Integration-specific setup, access controls, and behavior for actions that work with third-party services.
disable_toc: false
further_reading:
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Connections"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "/actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions"
---

## Overview

Many actions in Workflow Automation and App Builder run against third-party services, such as posting a message to Slack. The pages in this section describe how actions work with specific services: how they authenticate, and what controls who can run them.

## How integration actions get access

Every integration action depends on two things:

Authentication
: The credentials an action uses to sign in to the service. Credentials come from the integration tile, a [connection][1], or an [integration connection][2], which pairs the integration tile's credentials with a connection's access controls.

Authorization
: Which Datadog users can run which actions, against which targets. When an action uses integration tile credentials, anyone who can use that integration's actions in Workflows or App Builder can run it. A connection restricts use to people with access to the connection. Some integrations also support execution policies. An execution policy stores no credentials. Instead, it names exactly which users can run which actions on which targets, such as specific private Slack channels.

## Available integrations

| Integration | Authentication | Access controls |
|---|---|---|
| [Slack][3] | Slack integration tile | Slack execution policies for private channels |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/connections/
[2]: /actions/connections/integration/
[3]: /actions/integrations/slack/
