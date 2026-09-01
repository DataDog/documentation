---
title: Supply Chain Firewall
description: Block malicious and recently published open source packages at install time with Datadog's Supply Chain Firewall.
is_beta: true
disable_toc: false
further_reading:
- link: "/security/code_security/dev_tool_int/scfw_github_action/"
  tag: "Documentation"
  text: "Supply Chain Firewall GitHub Action"
- link: "/integrations/supply-chain-firewall/"
  tag: "Documentation"
  text: "Supply Chain Firewall Integration"
- link: "https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/"
  tag: "Blog"
  text: "Introducing Supply-Chain Firewall: Protecting Developers from Malicious Open Source Packages"
---

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Join the Preview!">}}
Use this form to submit your request to join the Supply Chain Security Preview.
{{< /callout >}}

Supply Chain Firewall (SCFW) prevents malicious open source packages from entering your development environments at the point of installation, before they reach your repositories or CI/CD pipelines.

[Software Composition Analysis (SCA)][1]'s static and runtime modes scan dependencies already present in your codebase or running services. SCFW instead intercepts package manager commands as developers and CI systems run them, blocking malicious or recently published packages before they are installed.

## How it works

SCFW wraps supported package manager commands (`npm`, `pip`, and `poetry`). When someone runs an installation command through SCFW, it collects every package that the command would install and verifies each one against:

- Datadog Security Research's public [malicious packages dataset][2]
- [OSV.dev][3] advisories for known malicious packages and vulnerabilities
- Package registry metadata, to flag packages published within a configurable recency threshold

Based on these checks, SCFW produces one of three outcomes for the command:

- **Allow**: No issues are found, and the installation proceeds normally.
- **Warn**: A verifier reports non-critical findings. SCFW displays the findings and prompts the user to confirm whether to proceed.
- **Block**: A verifier reports a critical finding, generally indicating that a package is known to be malicious. SCFW blocks the installation and displays an actionable message explaining why.

## Install and use the CLI

Install Supply Chain Firewall with [`pipx`][4]:

```bash
pipx install scfw
```

You can also install it with `pip install scfw` directly into an active Python environment. Confirm the installation succeeded:

```bash
scfw --version
```

After installation, run `scfw configure` to set up your environment so that supported package manager commands are automatically routed through SCFW, and to enable Datadog logging.

### Inspect a package manager command

Prepend `scfw run` to any supported package manager command to inspect it before it runs:

```bash
scfw run npm install react
scfw run pip install -r requirements.txt
```

### Audit installed packages

Use `scfw audit` to run SCFW's verifiers against packages that are already installed:

```bash
scfw audit npm
scfw audit --executable venv/bin/pip pip
```

### Compatibility

| Package manager | Supported versions | Inspected subcommands |
|------------------|--------------------|-------------------------|
| npm | 7.0 and later | `install` (including aliases) |
| pip | 22.2 and later | `install` |
| poetry | 1.7 and later | `add`, `install`, `sync`, `update` |

Any other subcommands for these package managers always run without inspection. By default, SCFW refuses to run inspected subcommands with an unsupported version of a supported package manager.

<div class="alert alert-info">SCFW runs on macOS and common Linux distributions. Windows is not supported.</div>

## Related setup

- To inspect package manager commands in CI, see the [Supply Chain Firewall GitHub Action][5].
- To forward SCFW logs to Datadog, see the [Supply Chain Firewall integration][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/software_composition_analysis/
[2]: https://github.com/DataDog/malicious-software-packages-dataset
[3]: https://osv.dev
[4]: https://pipx.pypa.io/
[5]: /security/code_security/dev_tool_int/scfw_github_action/
[6]: /integrations/supply-chain-firewall/
