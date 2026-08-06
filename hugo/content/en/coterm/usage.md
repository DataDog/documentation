---
title: Using Datadog CoTerm
description: "Learn how to record terminal sessions, create shims for automatic recording, and configure CoTerm to protect against dangerous commands."
further_reading:
- link: "/coterm"
  tag: "documentation"
  text: "Datadog CoTerm"
- link: "/coterm/install"
  tag: "documentation"
  text: "Install Datadog CoTerm"
- link: "/coterm/rules"
  tag: "documentation"
  text: "CoTerm Configuration Rules"
---

## View recorded terminal sessions
At the beginning and end of every recorded terminal session, CoTerm displays a link to view the session in Datadog. You can also [view all recorded terminal sessions][7].

## CoTerm CLI command structure

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

Run `ddcoterm --help` for all options and commands.

## Record a terminal session

CoTerm records terminal sessions that you can play back and review in Datadog. For your security, sensitive data (such as passwords and API keys) are [automatically redacted][1]. Any processes launched in the terminal session are recorded as [events][2].

### Launch and record an interactive terminal session
To manually launch Datadog CoTerm and record the entirety of your terminal session:

```shell
ddcoterm
```

When you end the session, CoTerm stops recording and sends the captured process data to Datadog.

### Record the output of a command
To run an individual command and record its output:

```shell
ddcoterm -- datadog-agent status
```

This launches CoTerm and runs `datadog-agent status`. When the process completes, CoTerm stops recording and sends the captured process data to Datadog.

## Automatically record a command

To configure CoTerm to automatically record all future invocations of a particular command, create a shim:

```shell
ddcoterm shim create datadog-agent
```

After you create a shim, restart your terminal or source your profile. (For example, run `source ~/.bashrc`.) If you are using a shell other than Bash or Zsh, add `path/to/.ddcoterm/overrides` to your PATH manually.

## Protect against dangerous terminal commands

To prevent the accidental execution of designated terminal commands, you can configure CoTerm to act as a linter. For more control, you can use CoTerm with [Datadog Case Management][3] to require approval for designated commands.

### Lint a command

When you try to execute a designated command (for example, `kubectl scale`), CoTerm can display warnings and prompt you for confirmation.

1. Create a shim for your command: `ddcoterm shim create kubectl`

1. Configure a linting rule in your `.ddcoterm/config.yaml` file. For details on how to configure linting in CoTerm, see [CoTerm Configuration Rules][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
   {{< /code-block >}}

With this configuration, CoTerm intercepts any `kubectl scale` command without a `--context` flag.

{{< img src="coterm/linter-warning.png" alt="Command line interface. The user has run 'kubectl scale foo'. The output says 'Warning from CoTerm: No kubectl context specified (effective context: 'minikube'). It is recommended to always explicitly specify the context when running kubectl scale. Do you want to continue? (y/n)'" style="width:70%;" >}}

### Require approval for commands

For even more dangerous commands, CoTerm can require explicit approval by another team member (through Case Management) before running the command.

1. Create a shim for your command: `ddcoterm shim create kubectl`

2. Configure requiring approval in your `.ddcoterm/config.yaml` file. For details, see [CoTerm Configuration Rules][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

With this configuration, when you run a `kubectl scale --context prod` command, CoTerm creates an approval request in [Case Management][3]. If you opt to associate the approval request with an active [incident][5], other incident responders are automatically added as approvers. After this request is approved, your command executes. You can also configure [case automation rules][8] to trigger workflows based on approval requests.

#### Manually require approval

To create an approval request manually, run:

```shell
ddcoterm approve
```

#### Bypass approval

To bypass approval and run your command, set the `COTERM_BREAK_GLASS` environment variable.

For example:

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /sensitive_data_scanner/
[2]: /events/
[3]: /incident_response/case_management/
[4]: /coterm/rules
[5]: /incident_response/incident_management/
[6]: /coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /incident_response/case_management/automation_rules/