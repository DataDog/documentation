---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
aliases:
- real_user_monitoring/browser/setup/
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
- link: "https://learn.datadoghq.com/courses/configure-rum-javascript"
  tag: "Learning Center"
  text: "Configure Real User Monitoring (RUM) for JavaScript web applications"
---

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
RUM Auto-Instrumentation is not available for the selected site ({% region-param key="dd_site_name" /%}). Use [Client-Side instrumentation][1] instead.
{% /alert %}
{% /site-region %}

## Overview

The Datadog Browser SDK enables Real User Monitoring (RUM) for your web applications, providing visibility into user experience and application performance. With RUM, you can monitor page load times, user interactions, resource loading, and application errors in real time.

There are three ways to instrument your browser-based web applications with the Browser SDK:

- [**Manual client-side setup**][1]: Instrument your browser-based web applications, deploy them, configure the initialization parameters you want to track, and use advanced configuration to further manage the data and context that RUM collects.
- [**Agentic Onboarding**][2]: Instrument your frontend applications with one prompt using LLM coding agents such as Cursor or Claude.
- [**Auto-Instrumentation**][3]: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.

## How to choose the instrumentation type

| | [Manual client-side setup][1] | [Agentic Onboarding (Preview)][2] | [Auto-Instrumentation (Preview)][3] |
|---|---|---|---|
| **SDK setup mechanism** | Manually add the RUM SDK to your application code and manage configurations in code. | Use an AI-guided setup that detects your project's framework and adds the RUM SDK with a single prompt. | Automatically add RUM JS to your web app HTML, then manage configurations in the UI. |
| **Code changes required** | Yes | Yes (automated by AI agent) | No |
| **Setup complexity** | Medium | Low | Low |
| **Supported platforms** | All browser-based applications | Next.js, React, Svelte, Vue, Vanilla JavaScript | Apache, IBM HTTP Server, Java Servlet, NGINX, Windows IIS |
| **User groups** | Frontend, mobile engineering, or product teams who work directly in application code | Teams using AI coding agents such as Cursor or Claude Code | SRE and engineering teams without frontend access who need centralized management |

{% partial file="sdk/setup/browser.mdoc.md" /%}

[1]: /real_user_monitoring/application_monitoring/browser/setup/client
[2]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
[3]: /real_user_monitoring/application_monitoring/browser/setup/server
