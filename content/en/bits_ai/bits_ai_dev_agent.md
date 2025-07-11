---
title: Bits AI Dev Agent
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-ai-dev-agent/"
    tag: "Blog"
    text: "Automatically identify issues and generate fixes with the Bits AI Dev Agent"
---

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits AI Dev Agent is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent suggesting a fix for an IndexError in a Django app" style="width:100%;">}}

Bits AI Dev Agent is a generative AI coding assistant that uses observability data to detect, diagnose, and fix high-impact issues in your code. It can open production-ready pull requests and iterates on fixes based on developer feedback.

## Key capabilities

- Opens GitHub pull requests with production-ready fixes when high-impact issues are detected.  
- Iterates on code in response to chat messages and review comments.
- Provides a single view of Bits AI Dev Agent-generated pull requests; with filters for status, triggering product, and affected service.

## Supported Datadog products

Bits AI Dev Agent is available for the following Datadog products:

| Product                   | Availability          | Issues Detected                                                    |
|---------------------------|----------------------|--------------------------------------------------------------------|
| [Error Tracking][1]       | Preview              | Crashes, panics, exceptions, unhandled errors                      |
| [Code Security][2]        | Preview              | Security issues in first-party code and open source dependencies   |
| [Continuous Profiler][3]  | Preview              | Code-level performance issues                                      |

## Setup

<div class="alert alert-info">At this time, Bits AI Dev Agent supports GitHub only.</div>

### Enable the GitHub integration

To use Bits AI Dev Agent, you must install the [GitHub integration][4]. For full installation and configuration steps, see the [GitHub integration guide][5].

<div class="alert alert-info">
  To support Bits AI Dev Agent functionality, the GitHub integration must be granted the following permissions:
  <ul style="font-size: inherit; padding-left: 1.25rem; margin-top: 0.5rem;">
    <li style="font-size: inherit;"><strong>Repository contents</strong> (<code>contents: read</code>, <code>contents: write</code>)</li>
    <li style="font-size: inherit;"><strong>Pull requests</strong> (<code>pull_requests: write</code>)</li>
  </ul>
</div> 

### Tag telemetry with service and version

Bits AI Dev Agent uses the `service` and `version` telemetry tags to match issues such as errors or vulnerabilities to the version of your code that was running at the time. To configure telemetry tagging, see the [Tag your telemetry with Git information][6] section of the Datadog Source Code Integration documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: https://app.datadoghq.com/integrations/github
[5]: /integrations/github/
[6]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
