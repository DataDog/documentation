---
title: Install Datadog CoTerm
description: "Install CoTerm on macOS and Linux, configure authorization with Datadog, and set up your CoTerm configuration settings."
further_reading:
- link: "/coterm"
  tag: "documentation"
  text: "Datadog CoTerm"
- link: "/coterm/usage"
  tag: "documentation"
  text: "Using CoTerm"
- link: "/coterm/rules"
  tag: "documentation"
  text: "CoTerm Configuration Rules"
---

CoTerm is supported on macOS and Linux.

1. Install Datadog CoTerm with Homebrew or curl:

   **brew** (macOS only)
   ```shell
   brew install coterm
   ```
  
   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```
   
   This command downloads the latest version of CoTerm to `.ddcoterm/bin/ddcoterm` and updates your PATH in `.bashrc` and `.zshrc`. Restart your terminal or source your profile. If you are using a shell other than Bash or Zsh, add `path/to/.ddcoterm/bin` to your PATH manually.

2. If your [Datadog site][6] is not `https://app.datadoghq.com`, set your site in `.ddcoterm/config.yaml` under `connection_config.host`:
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Initialize your configuration file by running:

   ```shell
   ddcoterm init
   ```

   Select your settings. You can change these settings in the [`~/.ddcoterm/config.yaml` file](#configure-your-coterm-settings).

## Authorize CoTerm to connect to Datadog

During initialization, you can choose one of the following ways to authorize CoTerm to access your Datadog Account:
- **OAuth**: Opens a browser for you to log in with OAuth.
- **API Key + App Key**: Prompts you to set your [Datadog API key][1] and [application key][2] in `~/.ddcoterm/config.yaml`.
- **API Key Only**: Prompts you to set your Datadog API key in `~/.ddcoterm/config.yaml`.

<div class="alert alert-info">If you select the <strong>API Key Only</strong> option, you cannot <a href="/coterm/usage/#require-approval-for-commands">require approvals with Case Management</a>.</div>

## Configure your CoTerm settings

The `~/.ddcoterm/config.yaml` file contains your CoTerm configurations:

`process_config`
: Configure CoTerm to act as a linter and take certain actions when it intercepts a command that matches a rule. See [CoTerm Configuration Rules][4].

`enable_telemetry`
: Enable or disable sending telemetry to Datadog. Defaults to `false`.

`enable_ptrace`
: Enable or disable experimental `ptrace`-based process monitoring on Linux. Defaults to `false`.

`connection_config`
: 
  `host`
  : Host for connecting to Datadog. Defaults to `https://app.datadoghq.com`.

  `port`
  : Port for connecting to Datadog. Defaults to `443`.

  `api_key`
  : If you are not using OAuth, your [Datadog API key][1]. If you have enabled OAuth, CoTerm defaults to using OAuth and ignores `api_key`.

  `app_key`
  : If you are not using OAuth, your [Datadog application key][2]. <br/>**Note**: To [require approvals with Case Management][5], you must use OAuth _or_ specify both your API key and application key in this file.

## Next steps

- Run `ddcoterm` to start a recorded terminal session.
- Learn more about [using CoTerm][3].

## Uninstall

To uninstall CoTerm, delete the `.ddcoterm` folder.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /coterm/usage
[4]: /coterm/rules
[5]: /coterm/usage/#require-approval-for-commands
[6]: /getting_started/site/
