---
title: Container Image Scanning in CI/CD
disable_toc: false
further_reading:
- link: "/security/cloud_security_management/vulnerabilities"
  tag: "Documentation"
  text: "Cloud Security Vulnerabilities"
- link: "/infrastructure/containers/container_images"
  tag: "Documentation"
  text: "Viewing Container Images"
- link: "/security/cloud_security_management/setup/agent"
  tag: "Documentation"
  text: "Setting up the Datadog Agent for Cloud Security"
---

## Overview

Cloud Security Management (CSM) enables you to scan container images for vulnerabilities during CI/CD, before images are deployed to production. By integrating vulnerability scanning directly into your pipelines, you can detect and remediate security issues early in the development lifecycle.

To support CI/CD-based container image scanning, Datadog provides the **Datadog Security CLI**. The CLI is designed to be run directly inside your CI jobs, giving teams full control over when and how scans are executed as part of their pipelines.

**Note**: For vulnerability management in production environments, see [Cloud Security Vulnerabilities][1].

## Get started

To get started with container image scanning in CI/CD:

1. [Configure Datadog credentials](#authentication)
2. [Install the Datadog Security CLI](#installation-and-scans) in your CI/CD pipeline
3. View scan results in the [Cloud Security Vulnerabilities][3] page
4. Optionally, [set up local development](#run-local-scans-during-development) for faster iteration

## Authentication

To upload scan results to Datadog, configure the following environment variables in your CI pipeline:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][4] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key, created by your [Datadog organization][5], should include the `appsec_vm_read` scope and be stored as a secret.    | Yes      |                 |
| `DD_SITE`    | The [Datadog site][6] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

<div class="alert alert-info">
Store your API and application keys as secrets in your CI/CD platform to protect sensitive credentials.
</div>

## Setup instructions

<div class="alert alert-info">Pre-built integrations for specific CI providers (GitHub Actions, GitLab CI/CD, Azure DevOps, etc.) are coming soon. For now, use the customizable script approach below, which works with any CI/CD platform.</div>

Container image scanning works with all major CI/CD platforms including:
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- Other CI providers that can execute shell scripts

The customizable script approach gives you full control over when and how scans are executed in your pipelines.

## Installation and scans

<div class="alert alert-info">The Datadog Security CLI is in Preview and available to install from Datadog package repositories.</div>

The Datadog Security CLI can be installed on Debian/Ubuntu, Red Hat/CentOS, and macOS systems. Choose your installation method below.

### Install the Datadog Security CLI

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

### Install from package repository

```bash
# Import Datadog APT signing key
DD_APT_KEY_URL="https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public"
curl -fsSL "$DD_APT_KEY_URL" | sudo gpg --dearmor -o /usr/share/keyrings/datadog-archive-keyring.gpg

# Add Datadog repository
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable datadog-security-cli" \
| sudo tee /etc/apt/sources.list.d/datadog-security-cli.list

# Update package list and install
sudo apt update
sudo apt install datadog-security-cli
```

{{% /tab %}}
{{% tab "Red Hat/CentOS" %}}

### Install from package repository

```bash
# Import Datadog RPM signing key
sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public

# Add Datadog repository
sudo tee /etc/yum.repos.d/datadog-security-cli.repo > /dev/null <<'EOF'
[datadog-security-cli]
name=Datadog Security CLI
baseurl=https://yum.datadoghq.com/stable/datadog-security-cli/\$basearch/
enabled=1
gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
repo_gpgcheck=1
EOF

# Install the CLI
sudo yum install datadog-security-cli
```

{{% /tab %}}
{{% tab "macOS" %}}

### Install with Homebrew

```bash
# Install via Homebrew
brew install --cask datadog-security-cli
```

{{% /tab %}}
{{< /tabs >}}

### Run your first scan

After installing the Datadog Security CLI, configure your Datadog credentials and scan a container image:

```bash
# Configure Datadog credentials
export DD_API_KEY=<your_api_key>
export DD_APP_KEY=<your_app_key>
export DD_SITE={{< region-param key="dd_site" >}}

# Scan your container image
datadog-security-cli image myimage:tag
```

The CLI outputs scan results directly to your terminal, showing:
- Image information (name, digest, operating system)
- Total number of vulnerabilities found
- Severity breakdown (Critical, High, Medium, Low)
- Detailed table of vulnerabilities with CVE IDs, affected packages, and available fixes

{{< img src="security/vulnerabilities/csm-vm-cli-output.png" alt="Datadog Security CLI output showing vulnerability scan results for a container image" style="width:100%;" >}}

You can also view your scan results in Datadog's [Cloud Security Vulnerabilities][3] explorer.

## Run local scans during development

For faster iteration before committing to CI, install the Datadog Security CLI locally using the same installation methods described in the [installation section](#install-the-datadog-security-cli) above.

### Local scanning without persisting results

When testing locally, scan images without uploading results to Datadog using the `--no-persist` flag:

```bash
# Scan locally without sending results to Datadog
datadog-security-cli image myapp:latest --no-persist
```

This is useful for:
- Testing the CLI functionality without affecting your Datadog data
- Validating container images during local development
- Iterating quickly on image builds before committing to CI

## Scan options

The Datadog Security CLI supports various options to customize your container image scans:

### Configure severity thresholds

```bash
# Fail the build if critical vulnerabilities are found
datadog-security-cli image myapp:latest --fail-on critical

# Fail on high or critical vulnerabilities
datadog-security-cli image myapp:latest --fail-on high
```

### Output formats

```bash
# Output results in JSON format
datadog-security-cli image myapp:latest --output json
```

## View scan results

After running your first scan, results appear in the [Cloud Security Vulnerabilities][3] page within minutes. You can:

- **Filter by resource type**: View vulnerabilities specific to container images scanned in CI/CD
- **Prioritize by severity**: Focus on critical and high-severity vulnerabilities first
- **Track remediation**: Assign vulnerabilities to team members and track resolution
- **Set up notifications**: Get alerted when new critical vulnerabilities are detected

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="The Cloud Security Vulnerabilities Findings page" width="100%">}}

## Troubleshooting

### Authentication errors

If you encounter authentication errors:
1. Verify your `DD_API_KEY` and `DD_APP_KEY` are correctly set
2. Ensure the application key has the `appsec_vm_read` scope
3. Check that your `DD_SITE` matches your Datadog organization's site

### Image not found errors

If the CLI cannot find your image:
1. Verify the image exists locally: `docker images`
2. Use the full image name including registry if applicable
3. Ensure the image is built before scanning

### Network connectivity issues

If scans fail due to network issues:
1. Verify your CI environment can reach the Datadog site
2. Check for proxy or firewall restrictions
3. Ensure outbound HTTPS connections are allowed

For additional help, see the [Cloud Security troubleshooting guide][12] or contact [Datadog support][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/vulnerabilities
[2]: /security/code_security/software_composition_analysis/
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /account_management/api-app-keys/#api-keys
[5]: /account_management/api-app-keys/#application-keys
[6]: /getting_started/site/
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /integrations/guide/source-code-integration
[9]: /security/code_security/dev_tool_int/github_pull_requests
[10]: /integrations/gitlab-source-code/#setup
[11]: /integrations/azure-devops-source-code/#setup
[12]: /security/cloud_security_management/troubleshooting/vulnerabilities/
[13]: /help/
