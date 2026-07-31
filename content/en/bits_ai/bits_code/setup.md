---
title: Bits Code Setup
aliases:
- /bits_ai/bits_ai_dev_agent/setup/
disable_toc: false
---

## Overview

[Bits Code][8] integrates with [source code providers][11] to open, update, and iterate on pull or merge requests based on issues detected in Datadog. After completing setup, you can [start using Bits Code][7].

## Prerequisites

To set up Bits Code, you need the **Bits Code Write** (`bits_dev_write`) permission. This permission is included in managed Datadog roles such as the Datadog Standard Role.

If your organization uses custom roles, an admin must add this permission manually. For details, see [Access Control][1].

## Setup

Set up Bits Code for one of the [supported source code providers][11].

{{< tabs >}}

{{% tab "GitHub" %}}
1. Install the [GitHub integration][1]. For full installation and configuration steps, see the [GitHub integration guide][2].
1. In your GitHub account, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} to configure GitHub permissions.
   1. To enable basic Bits Code functionality, set the following permissions:
      - {{< ui >}}Repository permissions{{< /ui >}}
        - Repository contents: Read & write
        - Pull requests: Read & write
      - {{< ui >}}Subscribe to events{{< /ui >}}
        - Push
   1. (Optional) To allow Bits Code to use CI logs when iterating on pull requests, you must send CI logs to Datadog and enable the [auto-push](#enable-auto-push) feature. This requires additional permissions:  
       - {{< ui >}}Repository permissions{{< /ui >}}
         - Checks: Read  
         - Commit statuses: Read only 
       - {{< ui >}}Subscribe to events{{< /ui >}}
         - Check run
         - Check suite  
         - Issue comment  
         - Status

[1]: https://app.datadoghq.com/integrations/github
[2]: /integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
1. Install the [GitLab Source Code integration][1]. For full installation and configuration steps, see the [GitLab Source Code integration guide][2].
1. Verify that the GitLab [service account][3] meets the following requirements:
   - The service account must have the [Developer role][4] on the project. This role can be inherited from a [group][5].
   - The service account's [personal access token][7] must have the following [scopes][6]: `api`, `write_repository`, and `read_user`. 

   <div class="alert alert-warning">You can't modify the scopes of an existing GitLab personal access token. If you need to create a token that includes the scopes above, add <a href="/integrations/gitlab-source-code/#required-gitlab-scopes">all scopes required</a> by other Datadog products that use the GitLab Source Code integration.</div>

[1]: https://app.datadoghq.com/integrations/gitlab-source-code
[2]: /integrations/gitlab-source-code/
[3]: https://docs.gitlab.com/user/profile/service_accounts/
[4]: https://docs.gitlab.com/user/permissions/#default-roles
[5]: https://docs.gitlab.com/user/permissions/#groups
[6]: https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
[7]: https://docs.gitlab.com/user/profile/personal_access_tokens/
{{% /tab %}}

{{< /tabs >}}

## Additional configuration  

These optional configurations help you get the most out of Bits Code.

### Configure telemetry tagging

Bits Code uses the `service` and `version` telemetry tags to match detected issues (such as errors or vulnerabilities) to the version of code that was running at the time.  

To configure telemetry tagging, see [Tag your APM telemetry with Git information][4]. 

You can also configure service-to-repository mapping manually in Bits Code settings under [{{< ui >}}Repositories{{< /ui >}}][5] > {{< ui >}}Service Repository Mapping{{< /ui >}}.

### Enable auto-push

Auto-push allows Bits Code to create branches, push code, and open PRs or MRs when it detects something it can help you with. Auto-push only opens PRs or MRs and pushes changes; it never merges code. When auto-push is disabled, you must review code in Datadog before it gets pushed.

To enable auto-push, navigate to **Bits Code** > **Settings** > [**General**][6].


#### Security considerations

Allowing any AI-based tool to read untrusted data can let attackers influence its output. Auto-push behavior depends on the type of data Bits Code works with: code-only workflows operate on source code the Agent can inspect directly, while telemetry-based workflows (such as errors or traces) may include untrusted runtime inputs.

To balance safety and automation, you can configure auto-push behavior in [Datadog][6] (for example, limiting auto-push to code-only workflows or requiring review when telemetry is involved). Datadog scans all Agent-generated code before pushing changes, but these safeguards are not foolproof.

### Configure custom instructions

Bits Code ingests custom instruction files from your repository, including:

- `AGENTS.md`
- `CLAUDE.md`
- `agent.md`
- `.cursorrules`
- `.windsurfrules`
- `copilot-instructions.md`

You can also define global custom instructions that apply to all Bits Code sessions in **Bits Code** > **Settings** > [**General**][6], in the **Global Agent Instructions** section.

A custom instruction file is a good place to mention [custom skills][12] you'd like Bits Code to use.

## Environment setup

Configure Bits Code's runtime environment, including network access policies and repository-specific tooling.

### Configure internet access

By default, Bits Code has **no internet access** during agent execution. To configure which external domains agents can reach, navigate to **Bits Code** > **Settings** > [**General**][6], and find the **Internet Access** section. Choose from the following access policies: **No Internet Access**, **Default Allowlist**, **Custom + Default Allowlist**, or **Custom Allowlist**.

The default allowlist includes the following domains. This list will evolve over time based on user feedback and ecosystem changes. To avoid changes, configure a custom allowlist.

| Language | Domains |
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`, `proxy.golang.org`, `sum.golang.org`, `vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org`, `registry.yarnpkg.com` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Python | `files.pythonhosted.org`, `pypi.org`, `pypi.python.org`, `pythonhosted.org` |
| Ruby | `api.rubygems.org`, `index.rubygems.org`, `rubygems.org` |
| Rust | `index.crates.io`, `static.crates.io` |
| Ubuntu | `archive.ubuntu.com`, `ports.ubuntu.com`, `security.ubuntu.com` |

### Configure repository environment

Configure a custom environment for Bits Code to install dependencies, formatters, linters, and build tools that are needed for your codebase. Each repository runs in its own isolated sandbox, and the environment defines the settings for that sandbox. 

To configure a repository environment:

1. Go to {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Repositories{{< /ui >}}][5], and find the {{< ui >}}Environments{{< /ui >}} section.
1. Click {{< ui >}}Add Environment{{< /ui >}} to create a repository configuration:
   1. Select a repository from the dropdown.
   1. (Optional) Under {{< ui >}}Pre-installed Languages{{< /ui >}}, click {{< ui >}}Select Versions{{< /ui >}} to specify the language versions the sandbox should use.
   1. (Optional) Define environment variables and secrets. Environment variables are available during both environment setup and Bits Code execution. Secrets are available as environment variables only during environment setup.
   1. (Optional) Add a shell script with setup commands to execute (for example: `pip install -r requirements.txt`).
1. Run the setup command to ensure it runs successfully.
1. Save the configuration.

Bits Code runs the setup command at startup and can use any tools installed in your environment. The setup command runs with network access enabled to download dependencies. After setup is complete, your [internet access](#configure-internet-access) policy controls outbound network access during agent execution. Because setup commands execute against code in your repository, enable them only if you trust the repository's code.

**Note**: For best results, add a [custom instructions file](#configure-custom-instructions) (like `claude.md`) to your repository with instructions on how to build and test your code.

## Troubleshooting

### Creation of GitHub PRs fails unexpectedly

In some cases, especially in repositories with many branches, GitHub does not run the permission check when creating a branch for the session. If you use a custom GitHub App, you can work around this issue by adding the `workflows:write` permission to your app in the [GitHub integration][2].

**Note**: This permission allows Bits AI to create workflows in your repository and has security implications.

[1]: /account_management/rbac/permissions/#bits-ai
[2]: https://app.datadoghq.com/integrations/github
[4]: /integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[5]: https://app.datadoghq.com/code/settings?tab=repositories
[6]: https://app.datadoghq.com/code/settings
[7]: /bits_ai/bits_code/#start-a-session
[8]: /bits_ai/bits_code/
[11]: /bits_ai/bits_code/#supported-source-code-providers
[12]: /bits_ai/bits_code/#custom-agent-skills-and-instructions
