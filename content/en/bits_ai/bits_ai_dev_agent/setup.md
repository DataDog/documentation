---
title: Bits AI Dev Agent Setup
disable_toc: false
---

## Overview

Bits AI Dev Agent integrates with GitHub to open, update, and iterate on pull requests based on issues detected in Datadog.  

<div class="alert alert-info">Bits AI Dev Agent supports GitHub only.</div>

## Setup

### Step 1: Enable the GitHub integration

Install the [GitHub integration][5]. For full installation and configuration steps, see the [GitHub integration guide][6].

### Step 2: Configure GitHub permissions

The GitHub integration must be granted the following permissions to enable basic Dev Agent functionality:

- **Repository Permissions**
  - `Contents: Read & Write`
  - `Pull Requests: Read & Write`
- **Subscribe to Events**
  - `Push`

#### Additional permissions for CI integration

To allow the Dev Agent to use CI logs when iterating on pull requests, you must send CI logs to Datadog and enable the Auto-commit feature. This requires additional permissions:  

- **Repository permissions**  
  - `Checks: Read`  
  - `Commit statuses: Read only`  
- **Subscribe to events**  
  - `Check run`  
  - `Check suite`  
  - `Issue comment`  
  - `Status`  

### Step 3: Configure telemetry tagging

Bits AI Dev Agent uses the `service` and `version` telemetry tags to match detected issues (such as errors or vulnerabilities) to the version of code that was running at the time.  

To configure telemetry tagging, see [Tag your telemetry with Git information][7]. You can also configure service-to-repository mapping manually in **Settings**.

### Step 4: (Optional) Enable Auto-push

Enabling Auto-Push allows the Dev Agent to push commits directly to a branch. With Auto-Push, the Dev Agent can:  
- Open merge-ready pull requests that fix errors, vulnerabilities, and other issues.  
- Update pull requests in response to your comments in GitHub.  
- Resolve CI failures automatically.  

If Auto-Push is disabled, you must review and approve code in Datadog before it is pushed. 

### Step 5: Configure custom instructions

The Dev Agent ingests custom instruction files from your repository, including:  

- `.cursorrules`  
- `.windsurfrules`  
- `copilot-instructions.md`  
- `claude.md`  
- `agents.md`  
- `agent.md`  

You can also define global custom instructions in **Settings**, which apply to all Dev Agent sessions.  

## Troubleshooting

If you encounter issues during setup:

- **GitHub integration not connecting**: Verify your GitHub account has the necessary permissions and that the integration is properly configured.
- **Missing telemetry data**: Ensure your applications are properly instrumented and sending data to Datadog with the required tags.
- **Dev Agent not creating pull requests**: Check that Auto-Push is enabled (if desired) and that the GitHub integration has the required repository permissions.

For additional help, see the [GitHub integration troubleshooting guide][9] or contact [Datadog support][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking
[2]: /security/code_security  
[3]: /profiler/
[4]: /tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /integrations/github/
[7]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[8]: https://app.datadoghq.com/metric/summary
[9]: /integrations/github/#troubleshooting
[10]: /help/
