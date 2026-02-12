---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
aliases:
- real_user_monitoring/browser/setup/
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
---

## Setup

{{< whatsnext desc="Choose the instrumentation type for the Browser SDK:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding">}}<u>Agentic Onboarding</u>: Instrument your frontend applications with one prompt using LLM coding agents like Cursor or Claude.{{< /nextlink >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument your browser-based web applications, deploy them, configure the initialization parameters you want to track, and use advanced configuration to further manage the data and context that RUM collects.{{< /nextlink >}}
{{< /whatsnext >}}

## How to choose the instrumentation type

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#d4d4e8;">
    <th style="border:1px solid #ccc; background-color:#d4d4e8;"></th>
    <th colspan="2" style="border:1px solid #ccc; border-right:2px solid #999; text-align:center; background-color:#d4d4e8; font-weight:bold; text-transform:uppercase; font-size:1.15em; padding:12px 8px;">
      Automatic Instrumentation
    </th>
    <th style="border:1px solid #ccc; text-align:center; background-color:#d4d4e8; font-weight:bold; text-transform:uppercase; font-size:1.15em; padding:12px 8px;">
      Manual Instrumentation
    </th>
  </tr>
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/real_user_monitoring/application_monitoring/browser/setup/server">Auto-Instrumentation (Preview)</a></th>
    <th style="border:1px solid #ccc; border-right:2px solid #999; text-transform:uppercase; font-weight:bold;"><a href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">Agentic Onboarding (Preview)</a></th>
    <th style="border:1px solid #ccc; text-transform:uppercase; font-weight:bold;"><a href="/real_user_monitoring/application_monitoring/browser/setup/client">Client-Side</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">SDK setup mechanism</td>
    <td style="border:1px solid #ccc;">Automatically add RUM JS to your web app HTML, then manage configurations in the UI.</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Use an AI-guided setup that detects your project's framework and adds the RUM SDK with a single prompt.</td>
    <td style="border:1px solid #ccc;">Manually add the RUM SDK to your application code and manage configurations in code.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Code changes required</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Yes (automated by AI agent)</td>
    <td style="border:1px solid #ccc;">Yes</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Setup complexity</td>
    <td style="border:1px solid #ccc;">Low</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Low</td>
    <td style="border:1px solid #ccc;">Medium</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Supported platforms</td>
    <td style="border:1px solid #ccc;">Apache, IBM HTTP Server, Java Servlet, Nginx, Windows IIS</td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Next.js, React, Svelte, Vue, Vanilla JavaScript</td>
    <td style="border:1px solid #ccc;">All browser-based applications</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">User groups</td>
    <td style="border:1px solid #ccc;">Ideal for <strong>SRE and engineering teams</strong> without access to frontend code or who need centralized management:
      <ul style="margin:0; padding-left:20px; font-size:inherit;">
        <li style="font-size:inherit;">Enable RUM across many apps without code changes</li>
        <li style="font-size:inherit;">Monitor organization-wide frontend performance from a single place</li>
      </ul>
    </td>
    <td style="border:1px solid #ccc; border-right:2px solid #999;">Ideal for <strong>teams using AI coding agents</strong> (such as Cursor or Claude Code):
      <ul style="margin:0; padding-left:20px; font-size:inherit;">
        <li style="font-size:inherit;">Accelerate RUM setup with AI-guided instrumentation</li>
        <li style="font-size:inherit;">Automate framework detection and SDK configuration</li>
        <li style="font-size:inherit;">Reduce time-to-observability for new projects</li>
      </ul>
    </td>
    <td style="border:1px solid #ccc;">Ideal for <strong>frontend engineering, mobile engineering, or product teams</strong> who work directly in application code:
      <ul style="margin:0; padding-left:20px; font-size:inherit;">
        <li style="font-size:inherit;">Support daily engineering workflows (such as live support, troubleshooting, and health checks for downstream services)</li>
        <li style="font-size:inherit;">Power product workflows (such as user flow analysis, segmentation, and feature tracking)</li>
        <li style="font-size:inherit;">Use custom code to track behavior not captured by automatic instrumentation</li>
      </ul>
    </td>
  </tr>
</table>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
