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
Supply Chain Firewall is in preview.
{{< /callout >}}

Supply Chain Firewall (SCFW) prevents malicious open source packages from entering your development environments at the point of installation, before they reach repositories or CI/CD pipelines.

SCFW wraps supported package manager commands (`npm`, `pip`, and `poetry`). When you run an installation command through SCFW, it evaluates the package against Datadog Security Research's [threat intelligence feed][1] of known-malicious and compromised open source packages as well as custom allow and block policies you configure for your organization.

Based on these checks, SCFW produces one of three outcomes for the command:

- **Allow**: No issues are found, and the installation proceeds normally.
- **Warn**: Reports non-critical findings and prompts you to confirm whether to proceed.
- **Block**: Reports a critical finding, generally indicating that a package is known to be malicious, and blocks the installation with an actionable message explaining why.

## Install the CLI

Install the SCFW CLI locally so package manager commands can be inspected before packages are installed. 

SCFW is distributed as a single Go binary with no runtime dependencies, and runs on macOS and common Linux distributions. Windows is not supported.

You can install SCFW with Go or with a GitHub release. 

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

   <div class="alert alert-tip">You can provide your Datadog credentials and site with the `DD_API_KEY`, `DD_APP_KEY`, and `DD_SITE` environment variables instead of passing them as flags. Environment variables take precedence over credentials stored in the system keychain.</div>

- Adds SCFW's alias configuration to your shell's rc files (whichever of `.bashrc`, `.bash_profile`, `.zshrc`, and `.zprofile` already exist). Restart your shell, or source the relevant rc file, for the aliases to take effect.

   <div class="alert alert-tip">Alias options are additive: aliases added by an earlier run remain in place unless you pass the corresponding `--remove-alias-*` option. The command manages a clearly delimited, SCFW-managed block in your shell rc files, and doesn't touch anything else in those files.</div>

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
