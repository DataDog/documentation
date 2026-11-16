---
title: Supply Chain Firewall
description: Block malicious and recently published open source packages at install time with Datadog's Supply Chain Firewall.
disable_toc: false
further_reading:
- link: "https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/"
  tag: "Blog"
  text: "Introducing Supply-Chain Firewall: Protecting Developers from Malicious Open Source Packages"
---

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Join the Preview!">}}
Supply Chain Firewall is in preview. Preview access is required to use the SCFW CLI, Explorer, and organization policies.
{{< /callout >}}

Supply Chain Firewall (SCFW) prevents malicious open source packages from entering your development environments at the point of installation, before they reach repositories or CI/CD pipelines.

SCFW wraps supported package manager commands (`npm`, `pip`, and `poetry`). SCFW evaluates each package in an installation command against the Datadog Security Research [threat intelligence feed][1] of known-malicious and compromised open source packages. SCFW also evaluates each package against [custom allow and block policies](#organization-policies) you configure for your organization.

<!-- TODO: Confirm that this is the full list of Datadog checks on each package:
- Datadog threat intelligence feed (malicious packages)
- Vulnerability advisories (GHSA and DDSA)
Sources: SCFW README v4.1.0, demo org SCFW Explorer. -->

Based on these checks, SCFW produces one of three outcomes for the command:

- **Allow**: No issues are found, and the installation proceeds normally.
- **Warn**: Reports non-critical findings and prompts you to confirm whether to proceed.
- **Block**: Reports a critical finding, generally indicating that a package is known to be malicious, and blocks the installation with an actionable message explaining why.

## Install the CLI

Install the SCFW CLI locally so package manager commands can be inspected before packages are installed. 

SCFW is distributed as a single Go binary with no runtime dependencies, and runs on macOS and common Linux distributions. Windows is not supported.

You can install SCFW 4.0.0 and later with Go or with a GitHub release. 

To inspect package manager commands in CI instead of locally, see the [Supply Chain Firewall GitHub Action][3].

### Install with Go

Use `go install` if you have Go 1.26 and you want the fastest path to a working CLI.

```bash
go install github.com/DataDog/supply-chain-firewall/scfw@latest
```

This installs the `scfw` binary to `$(go env GOPATH)/bin`. Add that directory to your `PATH` if it isn't already there.

### Install with a GitHub release

Install with a GitHub release if you don't have Go installed, or if you want to pin and verify a specific release.

Download the binary for your operating system and architecture from the [latest GitHub release][2]. Before running these commands, replace the value of `scfw_expected_checksum` with the checksum published for that binary on the release page.

```bash
# Replace this placeholder with the checksum from the release page.
scfw_expected_checksum="<expected-sha256-checksum>"

# Detect the operating system used in the release artifact name.
case "$(uname -s)" in
    Darwin) scfw_os=darwin ;;
    Linux)  scfw_os=linux ;;
    *) echo "Unsupported operating system: $(uname -s)" >&2; exit 1 ;;
esac

# Detect the CPU architecture used in the release artifact name.
case "$(uname -m)" in
    x86_64)        scfw_arch=amd64 ;;
    arm64|aarch64) scfw_arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

# Download the binary for the detected platform.
scfw_binary="scfw-${scfw_os}-${scfw_arch}"
curl -fLO "https://github.com/DataDog/supply-chain-firewall/releases/latest/download/${scfw_binary}"

# Calculate the downloaded binary's checksum and compare it against the published value.
scfw_actual_checksum=$(sha256sum "${scfw_binary}" | awk '{print $1}')
if [ "${scfw_actual_checksum}" != "${scfw_expected_checksum}" ]; then
    echo "Checksum verification failed" >&2
    exit 1
fi

# Install the verified binary in a directory on PATH.
chmod +x "${scfw_binary}"
sudo install "${scfw_binary}" /usr/local/bin/scfw
```

## Configure your environment

Configure SCFW to store your Datadog credentials and set up shell aliases so that supported package manager commands are automatically routed through SCFW.

```bash
scfw configure \
    --dd-api-key=<DD_API_KEY> \
    --dd-app-key=<DD_APP_KEY> \
    --dd-site=<DD_SITE> \
    --alias-npm \
    --alias-pip \
    --alias-poetry
```

The configuration command performs several distinct steps:

- Stores your API and application keys securely in your system's keychain.

   <div class="alert alert-tip">You can provide your Datadog credentials and site with the <code>DD_API_KEY</code>, <code>DD_APP_KEY</code>, and <code>DD_SITE</code> environment variables instead of passing them as flags. Environment variables take precedence over credentials stored in the system keychain.</div>

- Adds SCFW's alias configuration to your shell's rc files (whichever of `.bashrc`, `.bash_profile`, `.zshrc`, and `.zprofile` already exist). Restart your shell, or source the relevant rc file, for the aliases to take effect.

   <div class="alert alert-tip">Alias options are additive: aliases added by an earlier run remain in place unless you pass the corresponding <code>--remove-alias-*</code> option. The command manages a clearly delimited, SCFW-managed block in your shell rc files, and doesn't touch anything else in those files.</div>

- Enables log forwarding to Datadog. See [Supply Chain Firewall integration][4] for details.

The configuration command accepts these options:

| Option | Description |
| --- | --- |
| `--dd-api-key` | Datadog API key used for policy evaluation and reporting. |
| `--dd-app-key` | Datadog application key used for policy evaluation and reporting. |
| `--dd-site` | Datadog site parameter used for policy evaluation and reporting (default: `datadoghq.com`). |
| `--alias-npm` | Add a shell alias to run all npm commands through SCFW. |
| `--remove-alias-npm` | Remove the npm shell alias managed by SCFW. |
| `--alias-pip` | Add shell aliases to run all pip/pip3 commands through SCFW. |
| `--remove-alias-pip` | Remove the pip/pip3 shell aliases managed by SCFW. |
| `--alias-poetry` | Add a shell alias to run all poetry commands through SCFW. |
| `--remove-alias-poetry` | Remove the poetry shell alias managed by SCFW. |
| `--scfw-home` | Directory SCFW can use as a local cache. |
| `--remove` | Remove all SCFW-managed configuration. |

To check whether your credentials and aliases are configured correctly, run:

```bash
scfw doctor
```

## Organization policies

Organization policies adapt SCFW to your security requirements. For example, a policy can block a package version your team doesn't trust, or allow a package your team has vetted.

Each Datadog organization has one organization policy, defined in the same organization as the SCFW API and application keys. Editing the organization policy is optional, and an admin typically sets the policy once for the whole organization.

<!-- TODO: Confirm that the SCFW GitHub Action uses the organization policy from the same organization as its API and application keys. -->

The organization policy adds to the checks Datadog runs on each package. When the organization policy and a Datadog check disagree about a package, the organization policy takes precedence. For example, a Datadog check might flag a package as malicious while the organization policy has an allow rule for the package. In that case, SCFW allows the installation.

<!-- TODO: Confirm which rule wins when a package matches both an allow rule and a block rule in the same organization policy. -->

Organization policies control two kinds of settings:

- **Behaviors**: How SCFW handles warning-level findings in non-interactive environments, and how SCFW treats recently published packages.
- **Rules**: Package versions SCFW blocks or allows, for npm and PyPI packages.

### Edit the organization policy

Edit the organization policy to block or allow specific package versions, and to change how SCFW handles warnings and recently published packages.

<!-- TODO: Confirm which Datadog permission is required to edit the organization policy. No permission mentions SCFW or Supply Chain Firewall. -->

1. In the organization with your SCFW API and application keys, open {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Supply Chain Firewall Settings{{< /ui >}}.
1. In the {{< ui >}}Policy Configuration{{< /ui >}} editor, edit the policy YAML. For details about available fields, see the [Policy schema](#policy-schema) section.

   To discard your edits and restore the default policy, click {{< ui >}}Reset to Default{{< /ui >}}.

1. Click {{< ui >}}Save Configuration{{< /ui >}}.

### Policy schema

Organization policies follow the published [SCFW policy schema][5].

The `behaviours` and `recent_packages_behaviour` keys use British spelling.

| Field | Description |
| --- | --- |
| `schema-version` | Required. The schema version. Must be `1`. |
| `behaviours.non_interactive_block_on_warning` | (Default: `true`) Whether SCFW blocks commands with only warning-level findings in non-interactive environments, such as CI pipelines. Set to `false` to allow those commands. |
| `behaviours.recent_packages_behaviour` | (Default: `block`) What SCFW does with packages published less than `recent_package_timeout` seconds ago. Accepts `block`, `warn`, or `allow`. |
| `behaviours.recent_package_timeout` | (Default: `86400`) Number of seconds after publication during which SCFW treats a package as recent. The default is 24 hours. |
| `policies.block` | List of rules for package versions SCFW blocks. |
| `policies.allow` | List of rules for package versions SCFW allows. |

<!-- TODO: Confirm: in non-interactive environments such as CI, does behaviours.non_interactive_block_on_warning override --allow-on-warning, --block-on-warning, and SCFW_ON_WARNING?
Evidence: in the CLI code (v4.1.0), the CLI options apply only when Datadog returns WARN. In the demo org, with this setting at false, Datadog returned ALLOW. -->

Each rule in `policies.block` or `policies.allow` accepts these fields:

| Field | Description |
| --- | --- |
| `ecosystem` | Required. The package ecosystem. Accepts `npm` or `pypi`. |
| `package_name` | Required. The package name. |
| `package_version` | Required. A glob matching the package versions the rule applies to, such as `*` for all versions. |

<!-- TODO: Confirm the glob syntax for package_version. For example, does "2.31.*" match 2.31.0 and 2.31.5? -->

### Example policy

An example policy shows how behaviors and rules fit together in one organization policy. Start from the example instead of an empty editor, and replace the placeholder package names with your own.

This example policy warns about packages published in the last 48 hours. The example also blocks every version of one npm package and allows a range of versions of one PyPI package:

```yaml
schema-version: 1
behaviours:
  non_interactive_block_on_warning: true
  recent_packages_behaviour: warn
  # 48 hours, in seconds
  recent_package_timeout: 172800
policies:
  block:
    - ecosystem: npm
      package_name: <NPM_PACKAGE_NAME>
      package_version: "*"
  allow:
    - ecosystem: pypi
      package_name: <PYPI_PACKAGE_NAME>
      package_version: "2.31.*"
```

## Inspect a package during install

After you install and configure SCFW, `npm`, `pip`, and `poetry` commands are automatically routed through SCFW. 

To inspect a command manually instead, prepend `scfw run --`:

```bash
scfw run -- npm install react
scfw run -- pip install -r requirements.txt
```

The `scfw run` command supports these options:

| Option | Description |
| --- | --- |
| `--executable` | Package manager executable to use for running commands (default: environmentally determined). |
| `--error-on-block` | Treats blocked commands as errors, meaning exit non-zero. Useful for scripting and CI. |
| `--allow-on-warning` | Non-interactively allows commands with only warning-level findings. |
| `--block-on-warning` | Non-interactively blocks commands with only warning-level findings. |

The `SCFW_ON_WARNING` environment variable (`allow` or `block`) has the same effect as `--allow-on-warning` or `--block-on-warning`, and takes precedence when set. An environment variable is useful for enforcing a consistent policy across a CI environment without changing every invocation. In non-interactive contexts with no terminal, SCFW can't prompt for confirmation, so it blocks warning-level results by default unless `--allow-on-warning`, `--block-on-warning`, or `SCFW_ON_WARNING` is set.

## Investigate installation outcomes

SCFW might block a package your team needs, or allow a package you expected SCFW to block. The SCFW Explorer shows which Datadog checks and organization policy rules decided each outcome.

The SCFW Explorer includes every installation command inspected by an SCFW CLI configured with Datadog credentials.

1. Open the {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Supply Chain Firewall{{< /ui >}} tab.

   Each row shows the outcome, the time, the package name and version, the host, and the repository.

1. (Optional) Filter installations by {{< ui >}}Outcome{{< /ui >}}, {{< ui >}}Ecosystem{{< /ui >}}, {{< ui >}}Library name{{< /ui >}}, or {{< ui >}}Host name{{< /ui >}}.
1. Click an installation to open its details.
1. In {{< ui >}}Triggered policies{{< /ui >}}, review the result of each check SCFW ran on the package. Results come from two sources:
   - **Datadog checks**: Show whether Datadog flagged the package, and the advisory behind the flag. Warnings don't have their own outcome. When a Datadog check warns about a package, the outcome indicates whether SCFW allowed or blocked the installation.
   - **Organization policy**: Shows the rule or behavior that matched, such as `policies.block: pypi/pygame@2.6.1` or `behaviours.non_interactive_block_on_warning: false`.

## Compatibility

SCFW supports these package manager versions and subcommands:

| Package manager | Supported versions | Inspected subcommands |
|------------------|--------------------|-------------------------|
| npm | 7.0 and later | `install` (including aliases) |
| pip | 22.2 and later | `install` |
| poetry | 1.7 and later | `add`, `install`, `sync`, `update` |

Subcommands other than those specified always run without inspection.

If a package manager version is below its minimum supported version, SCFW refuses to run inspected subcommands for it, rather than allowing them to run uninspected. This fail-closed behavior is intended to block known-malicious installs. Upgrade to a supported version to inspect commands normally.

## Uninstall SCFW

Uninstalling SCFW removes the CLI and the configuration it manages from your environment.

Before removing the binary, run `scfw configure --remove` to remove SCFW-managed configuration from your environment:

```bash
scfw configure --remove
```

Then remove the `scfw` binary, for example by deleting it from `/usr/local/bin`, or from `$(go env GOPATH)/bin` if you installed it with `go install`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://github.com/DataDog/supply-chain-firewall/releases/latest
[3]: /security/code_security/dev_tool_int/scfw_github_action/
[4]: /integrations/supply-chain-firewall/
[5]: https://raw.githubusercontent.com/DataDog/schema/main/code-security/scfw/v1.0/schema.json
