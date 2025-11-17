---
title: Bits AI Dev Agent Setup
disable_toc: false
---

## Overview

Bits AI Dev Agent integrates with GitHub to open, update, and iterate on pull requests based on issues detected in Datadog.  

## Setup

1. Install the [GitHub integration][5]. For full installation and configuration steps, see the [GitHub integration guide][6].

1. In your GitHub account, navigate to **Settings** > **Apps** > **Datadog** to configure GitHub permissions.

   1. To enable basic Dev Agent functionality, set the following permissions:

      - **Repository permissions**
        - Repository contents: Read & write
        - Pull requests: Read & write
      - **Subscribe to events**
        - Push

   1. (Optional) To allow the Dev Agent to use CI logs when iterating on pull requests, you must send CI logs to Datadog and enable the [auto-push](#enable-auto-push) feature. This requires additional permissions:  

       - **Repository permissions**  
         - Checks: Read  
         - Commit statuses: Read only 
       - **Subscribe to events**  
         - Check run
         - Check suite  
         - Issue comment  
         - Status

## Additional configuration  

These optional configurations help you get the most out of Bits AI Dev Agent.

### Configure telemetry tagging

Bits AI Dev Agent uses the `service` and `version` telemetry tags to match detected issues (such as errors or vulnerabilities) to the version of code that was running at the time.  

To configure telemetry tagging, see [Tag your APM telemetry with Git information][7]. 

You can also configure service-to-repository mapping manually in the Bits AI Dev Agent settings under [**Repositories**][11] > **Service Repository Mapping**.

### Enable auto-push
To enable auto-push, so the Dev Agent can push commits directly to a branch, navigate to **Bits AI Dev** > [**Settings**][12], and set the toggle to **Enable**.

**Note**: If auto-push is disabled, you must review and approve code in Datadog before the Dev Agent can push it.

### Configure custom instructions

The Dev Agent ingests custom instruction files from your repository, including:  

- `.cursorrules`  
- `.windsurfrules`  
- `copilot-instructions.md`  
- `claude.md`  
- `agents.md`  
- `agent.md`  


You can also define global custom instructions, which apply to all Dev Agent sessions, in **Bits AI** > **Dev Agent** > [**Settings**][12], in the **Agent Instructions** section. 

### Configure repository environment

Configure a custom environment for the Dev Agent to install dependencies, formatters, linters, and build tools that are needed for your codebase. The setup command runs with network access to download dependencies, then network access is disabled during Agent execution for security.

To configure a repository environment:

1. Go to **Bits AI Dev** > **Settings** > [**Repositories**][11], and find the **Environments** section.
1. Click **Add Environment** to create a repository configuration.
   1. Define any required environment variables or secrets.
   1. Add setup commands to the shell script (for example: `pip install -r requirements.txt`).
1. Run the setup command to ensure it runs successfully.
1. Save the configuration.

When you launch the Dev Agent, it runs the setup command at startup and can use any tools installed in your environment. 

**Note**: For best results, add a [custom instructions file](#configure-custom-instructions) (like `claude.md`) to your repository with instructions on how to build and test your code.

[1]: /error_tracking
[2]: /security/code_security  
[3]: /profiler/
[4]: /tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /integrations/github/
[7]: /integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[8]: https://app.datadoghq.com/metric/summary
[9]: /integrations/github/#troubleshooting
[10]: /help/
[11]: https://app.datadoghq.com/code/settings?tab=repositories
[12]: https://app.datadoghq.com/code/settings
