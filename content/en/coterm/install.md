---
title: Install Datadog CoTerm
---

1. Install Datadog CoTerm by running:

   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://update.coscreen.org/install-ddcoterm.sh' | bash
   ```

   This command downloads the latest version of CoTerm to `~/.ddcoterm/bin/ddcoterm` and updates your PATH in `.bashrc`.

2. Restart your terminal or source your profile. (For example, run `source ~/.bashrc`.) If you are using a shell other than Bash or Zsh, add `path/to/.ddcoterm/bin` to your PATH manually.

3. Initialize your configuration file by running:

   ```shell
   ddcoterm init
   ```

4. Select one of the following ways to authorize CoTerm to access your Datadog account:
   - **OAuth**: Opens a browser for you to log in with OAuth
   - **API Key + App Key**: Prompts you to set your [Datadog API key][1] and [application key][2] in `~/.ddcoterm/config.yaml`.
   - **API Key Only**: Prompts you to set your Datadog API key in `~/.ddcoterm/config.yaml`.

   <div class="alert alert-info">If you select the <strong>API Key Only</strong> option, you cannot give <a href="/coterm/usage#approvals">approvals</a>.</div>

After you complete these steps, you are ready to [use CoTerm][3].

## Configure

The `~/.ddcoterm/config.yaml` file contains your CoTerm configurations. Edit this file to enable/disable telemetry or change your authentication method, or... This file also contains...

<!-- tk -->
<!-- for non-us1, do you have to set that here? -->

## Next steps

<!-- tk -->

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /coterm/usage