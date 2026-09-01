---
title: Supply Chain Firewall
description: Block malicious and recently published open source packages at install time with Datadog's Supply Chain Firewall.
is_beta: true
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

SCFW wraps supported package manager commands (`npm`, `pip`, and `poetry`). When install commands are run through SCFW, packages are verified against:

- Datadog Security Research's public [malicious packages dataset][1]
- [OSV.dev][2] advisories for known malicious packages and vulnerabilities
- Package registry metadata, to flag packages published within a configurable recency threshold

Based on these checks, SCFW produces one of three outcomes for the command:

- **Allow**: No issues are found, and the installation proceeds normally.
- **Warn**: A verifier reports non-critical findings. SCFW displays the findings and prompts the user to confirm whether to proceed.
- **Block**: A verifier reports a critical finding, generally indicating that a package is known to be malicious. SCFW blocks the installation and displays an actionable message explaining why.

## Install and use the CLI

Install the SCFW CLI locally so package manager commands can be inspected before packages are installed.

The recommended method to install SCFW is with `pipx`, which installs `scfw` in its own isolated Python environment, separate from your project dependencies, while still putting the SCFW command on your system `PATH`:

```bash
pipx install scfw
```

Alternatively, you can install SCFW with `pip install scfw` directly in an active Python environment.

Either way, confirm the installation succeeded:

```bash
scfw --version
```

To inspect package manager commands in CI instead of locally, see the [Supply Chain Firewall GitHub Action][3].

### Configure your environment

Set up shell aliases so that supported package manager commands are automatically routed through SCFW without having to prepend `scfw run`. `scfw configure` also enables log forwarding to Datadog; see [Supply Chain Firewall integration][4] for details.

Run `scfw configure` with no arguments for an interactive walkthrough of available options:

```bash
scfw configure
```

Alternatively, you can set options by passing them directly. For example, to alias `npm` and `pip`:

```bash
scfw configure --alias-npm --alias-pip
```

Configuration writes settings to a clearly delimited, SCFW-managed block in your `~/.bashrc` and `~/.zshrc`. Don't edit this block by hand, because SCFW needs to be able to maintain it. You can rerun `scfw configure` at any time to update your settings, or run `scfw configure --remove` to remove all SCFW-managed configuration, for example before uninstalling.

### Inspect a package during install

Route `npm`, `pip`, or `poetry` installs through SCFW so they're checked against threat data before installation. 

```bash
scfw run npm install react
scfw run pip install -r requirements.txt
```

### Audit installed packages

Check previously installed packages, or packages installed outside of `scfw run`, against SCFW threat data.

```bash
scfw audit npm
scfw audit --executable venv/bin/pip pip
```

### Compatibility

SCFW runs on macOS and common Linux distributions. Windows is not supported.

SCFW supports these package manager versions and subcommands:

| Package manager | Supported versions | Inspected subcommands |
|------------------|--------------------|-------------------------|
| npm | 7.0 and later | `install` (including aliases) |
| pip | 22.2 and later | `install` |
| poetry | 1.7 and later | `add`, `install`, `sync`, `update` |

Subcommands other than those specified always run without inspection. 

If a package manager version is below its minimum supported version, SCFW refuses to run inspected subcommands for it, rather than allowing them to run uninspected. This fail-closed behavior aligns with SCFW's goal of blocking 100% of known-malicious installs. Upgrade to a supported version to inspect commands normally, or pass `--allow-unsupported` to `scfw run` to skip verification and allow the command to run anyway.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://osv.dev
[3]: /security/code_security/dev_tool_int/scfw_github_action/
[4]: /integrations/supply-chain-firewall/
