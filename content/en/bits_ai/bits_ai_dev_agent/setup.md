---
title: Bits AI Dev Agent Setup
disable_toc: false
---

## Overview

Bits AI Dev Agent integrates with GitHub to open, update, and iterate on pull requests based on issues detected in Datadog.  

<div class="alert alert-info">Bits AI Dev Agent supports GitHub only.</div>

## Setup

The following steps are required to get started with Bits AI Dev Agent.

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

## Additional configuration  

These optional configurations help you get the most out of Bits AI Dev Agent.

### Configure telemetry tagging

Bits AI Dev Agent uses the `service` and `version` telemetry tags to match detected issues (such as errors or vulnerabilities) to the version of code that was running at the time.  

To configure telemetry tagging, see [Tag your telemetry with Git information][7]. You can also configure service-to-repository mapping manually in **Settings**.

### Enable Auto-push

Enabling Auto-Push allows the Dev Agent to push commits directly to a branch. With Auto-Push, the Dev Agent can:  
- Open merge-ready pull requests that fix errors, vulnerabilities, and other issues.  
- Update pull requests in response to your comments in GitHub.  
- Resolve CI failures automatically.  

If Auto-Push is disabled, you must review and approve code in Datadog before it is pushed. 

### Configure custom instructions

The Dev Agent ingests custom instruction files from your repository, including:  

- `.cursorrules`  
- `.windsurfrules`  
- `copilot-instructions.md`  
- `claude.md`  
- `agents.md`  
- `agent.md`  

You can also define global custom instructions in **Settings**, which apply to all Dev Agent sessions.  

### Configure repository environment

Configure a custom environment for the Dev Agent to install dependencies, formatters, linters, and build tools that are needed for your codebase. The setup command runs with network access to download dependencies, then network access is disabled during agent execution for security.

To configure a repository environment:

1. Go to **Bits AI Dev** > **Settings** > **Repositories**.
1. Create a repository configuration.
   - Define any required environment variables or secrets.
   - Add setup commands to the shell script (for example: `pip install -r requirements.txt`).
1. Test the setup command to ensure it runs successfully.
1. Save the configuration.

When you launch the Dev Agent, it runs the setup command at startup and can use any tools installed in your environment. 

**Note**: For best results, add a `CLAUDE.md` file to your repository with instructions on how to build and test your code.

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
