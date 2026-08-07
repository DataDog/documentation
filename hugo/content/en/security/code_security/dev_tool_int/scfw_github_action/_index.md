---
title: Supply Chain Firewall GitHub Action
description: Keep malicious packages out of your CI/CD runners with Datadog's GitHub Action for Supply Chain Firewall.
is_beta: true
disable_toc: false
further_reading:
- link: "https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/"
  tag: "Blog"
  text: "Introducing Supply-Chain Firewall: Protecting Developers from Malicious Open Source Packages"
- link: "/security/code_security/#supply-chain-security-preview"
  tag: "Documentation"
  text: "Supply Chain Security"
---

The Supply Chain Firewall GitHub Action installs Datadog's [Supply Chain Firewall][1] (SCFW) and configures it to intercept supported package manager commands in all subsequent workflow steps. When active, SCFW inspects each supported package manager command before allowing it to run.

<div class="alert alert-info">This action supports Linux and macOS runners only.</div>

## Usage

```yaml
steps:
  - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      version: '3.1.0'
      package-managers: npm,pip

  # npm and pip commands are inspected by SCFW before they run.
  # Flagged packages are blocked; other installs proceed normally.
  - run: pip install -r requirements.txt
  - run: npm install
```

### Configure the Supply Chain Security integration

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Join the Preview!">}}
Use this form to submit your request to join the Supply Chain Security Preview.
{{< /callout >}}

```yaml
steps:
  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      dd-codesec-logger: 'true'
      dd-api-key: ${{ secrets.DD_API_KEY }}
      dd-app-key: ${{ secrets.DD_APP_KEY }}
      dd-site: {{< region-param key="dd_site" >}}
```

### Cache the `SCFW_HOME` directory

Caching `SCFW_HOME` avoids re-fetching verifier data on each run:

```yaml
steps:
  - uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
    with:
      path: ~/.scfw
      key: scfw-${{ runner.os }}

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      scfw-home: ~/.scfw
```

## How it works

1. **Install**: The Supply Chain Firewall CLI is installed with `pipx` in an isolated Python environment so it does not interfere with the project's dependencies.

2. **Wrap**: For each requested package manager, the action writes a thin wrapper script to a temporary directory and prepends that directory to `PATH`. All subsequent steps that invoke those package managers are automatically routed through Supply Chain Firewall.

   Each wrapper resolves the real binary at call time by removing its own directory from `PATH` before searching for the binary, then passes the resolved path to `scfw run --executable`. This helps ensure that Supply Chain Firewall calls the real binary and does not re-invoke the wrapper.

   Activating a Python virtual environment, such as with `source .venv/bin/activate`, takes precedence over the Supply Chain Firewall wrappers for the remainder of that step. Use `scfw run pip install ...` explicitly for any commands that run inside virtual environments.

3. **Configure**: Relevant environment variables, such as `DD_API_KEY` and `SCFW_HOME`, are written to `GITHUB_ENV` so they are available to subsequent steps.

   Environment variables written to `GITHUB_ENV` are accessible to all subsequent steps in the job, including any third-party actions that run after this one. If you supply `dd-api-key` or `dd-app-key`, audit the actions that follow in your workflow for suspicious behavior or signs of compromise.

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `version` | The version of SCFW to install. Use `"latest"` or pin to a specific release (for example, `"3.1.0"`). | `latest` |
| `package-managers` | Comma-separated list of package managers to intercept. Supported: `npm`, `pip`, `poetry`. | `npm,pip,poetry` |
| `error-on-block` | Fail the workflow step with a non-zero exit code when an installation is blocked. | `true` |
| `dd-api-key` | Datadog API key for forwarding firewall events to the Datadog HTTP or Code Security API. Use `${{ secrets.DD_API_KEY }}`. | — |
| `dd-app-key` | Datadog application key for forwarding firewall events to the Datadog Code Security API. Use `${{ secrets.DD_APP_KEY }}`. | — |
| `dd-api-logger` | When `"true"`, enables SCFW's Datadog HTTP API logger. Requires `dd-api-key`. | `false` |
| `dd-codesec-logger` | When `"true"`, enables SCFW's Datadog Code Security logger. Requires `dd-api-key` and `dd-app-key`. | `false` |
| `dd-site` | Your Datadog site ({{< region-param key="dd_site" code="true" >}}). Used by both `dd-api-logger` and `dd-codesec-logger`. | `datadoghq.com` |
| `dd-log-level` | Controls which firewall events are forwarded to Datadog. `ALLOW` logs all events; `BLOCK` logs only blocked events. | `ALLOW` |
| `scfw-home` | Directory for SCFW's local cache. Point this at a cached directory to speed up verifier data fetches across runs. | — |
| `on-warning` | Action that SCFW should take on warning-level findings: `ALLOW` or `BLOCK`. Defaults to `BLOCK` in non-interactive environments. | — |
| `package-minimum-age` | Minimum age, in hours, that a package version must reach before installation is allowed. | `24` |
| `dd-env` | Datadog environment tag attached to all forwarded firewall events. | `ci` |
| `dd-log-attributes` | A JSON object of custom attributes to attach to all forwarded Datadog log events (for example, `'{"team":"security"}'`). | — |

## Outputs

| Output | Description |
|--------|-------------|
| `scfw-version` | The installed version of Supply Chain Firewall. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/supply-chain-firewall
