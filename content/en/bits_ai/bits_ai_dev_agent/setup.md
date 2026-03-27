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
To enable auto-push, so the Dev Agent can push commits directly to a branch, navigate to [**Bits AI Dev** > **Settings** > **General**][12] , and set the toggle to **Enable**.

**Note**: If auto-push is disabled, you must review and approve code in Datadog before the Dev Agent can push it.

### Configure internet access

To configure which external domains agents can reach during agent execution, navigate to **Bits AI Dev** > [**Settings**][12] > **General**, and find the **Domain Allowlist** section. Choose from the following access policies: **No Internet Access**, **Default Allowlist**, **Custom + Default Allowlist**, or **Custom Allowlist**.

The default allowlist includes the following domains:

| Language | Domains |
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`, `proxy.golang.org`, `vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Python | `files.pythonhosted.org`, `pypi.org`, `pypi.python.org`, `pythonhosted.org` |
| Rust | `index.crates.io`, `static.crates.io` |

### Configure custom instructions

The Dev Agent ingests custom instruction files from your repository, including:  

- `.cursorrules`  
- `.windsurfrules`  
- `copilot-instructions.md`  
- `CLAUDE.md`  
- `AGENTS.md`  
- `agent.md`  


You can also define global custom instructions, which apply to all Dev Agent sessions, in **Bits AI Dev** > [**Settings**][12] > **General**, in the **Global Agent Instructions** section. 

### Configure repository environment

Configure a custom environment for the Dev Agent to install dependencies, formatters, linters, and build tools that are needed for your codebase. Each repository runs in its own isolated sandbox, and the environment defines the settings for that sandbox. 

To configure a repository environment:

1. Go to **Bits AI Dev** > **Settings** > [**Repositories**][11], and find the **Environments** section.
1. Click **Add Environment** to create a repository configuration:
   1. Select a repository from the dropdown.
   1. (Optional) Under **Pre-installed Languages**, click **Select Versions** to specify the language versions the sandbox should use.
   1. (Optional) Define environment variables and secrets. Environment variables are available during both environment setup and Dev Agent execution. Secrets are available as environment variables only during environment setup.
   1. (Optional) Add a shell script with setup commands to execute (for example: `pip install -r requirements.txt`).
1. Run the setup command to ensure it runs successfully.
1. Save the configuration.

The Dev Agent runs the setup command at startup and can use any tools installed in your environment. The setup command runs with network access enabled to download dependencies. After setup is complete, your [domain allowlist](#configure-domain-allowlist) policy controls outbound network access during agent execution. Because setup commands execute against code in your repository, enable them only if you trust the repository's code.

**Note**: For best results, add a [custom instructions file](#configure-custom-instructions) (like `claude.md`) to your repository with instructions on how to build and test your code.

## Troubleshooting

### Creation of PRs fails unexpectedly

In some cases, especially in repositories with many branches, GitHub does not run the permission check when creating a branch for the session. If you use a custom GitHub App, you can work around this issue by adding the `workflows:write` permission to your app in [Source Code Integration][5].

**Note**: This permission allows Bits AI to create workflows in your repository and has security implications.

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
