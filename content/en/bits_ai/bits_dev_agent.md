---
title: Bits Dev Agent
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Bits Dev Agent is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits Dev Agent is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits Dev Agent suggesting a fix for an IndexError in a Django app" style="width:100%;">}}

Bits Dev Agent is a generative AI coding assistant that uses observability data to detect, diagnose, and fix high-impact issues in your code. It opens production-ready pull requests and iterates on fixes based on developer feedback.

## Key capabilities

- Opens GitHub pull requests with production-ready fixes when high-impact issues are detected.  
- Iterates on code in response to review comments, including changes to logic or additional logging.  
- Provides a single view of Dev Agent-generated pull requests, with filters for status, triggering product, and affected service.

## Supported Datadog products

Bits Dev Agent is available for the following Datadog products:

| Product                | Availability          | Issues Detected                                                                |
|------------------------|----------------------|---------------------------------------------------------------------------------|
| [Error Tracking][1]    | General Availability | Crashes, panics, exceptions, unhandled errors                                   |
| [Code Security][2]     | Preview              | Security issues in first-party code and open source dependencies                |
| [Profiler][3]          |                      | Performance bottlenecks identified through span and profile analysis            |

## Setup

<div class="alert alert-info">At this time, Bits Dev Agent supports GitHub only.</div>

### Enable the GitHub integration

To use Bits Dev Agent, you must install the [GitHub integration][4]. For full installation and configuration steps, see the [GitHub integration guide][5].

<div class="alert alert-info">
  To support Bits Dev Agent functionality, the GitHub integration must be granted the following permissions:
  <ul style="font-size: inherit; padding-left: 1.25rem; margin-top: 0.5rem;">
    <li style="font-size: inherit;"><strong>Repository contents</strong> (<code>contents: read</code>, <code>contents: write</code>)</li>
    <li style="font-size: inherit;"><strong>Pull requests</strong> (<code>pull_requests: write</code>)</li>
  </ul>
</div> 

### Tag telemetry with service and version

Bits Dev Agent uses the `service` and `version` telemetry tags to match issues such as errors or vulnerabilities to the version of your code that was running at the time. To configure telemetry tagging, see the [Tag your telemetry with Git information][6] section of the Datadog Source Code Integration documentation.

### Enable Bits Dev Agent

To activate Bits Dev Agent, go to a supported product page (such as Error Tracking or Code Security) and click **Enable Dev Agent**. If any required configuration is missing, Datadog prompts you to complete the remaining setup before activation.

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: https://app.datadoghq.com/integrations/github
[5]: /integrations/github/
[6]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information