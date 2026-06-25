---
title: CoTerm Configuration Rules
description: "Configure CoTerm with Lua-based lints and rules to validate commands, require approvals, and control actions for specific terminal commands."
further_reading:
- link: "/coterm"
  tag: "documentation"
  text: "Datadog CoTerm"
- link: "/coterm/install"
  tag: "documentation"
  text: "Install Datadog CoTerm"
- link: "/coterm/usage"
  tag: "documentation"
  text: "Using CoTerm"
---

You can configure CoTerm to take specific actions when it intercepts certain commands by adding lints and rules to your `.ddcoterm/config.yaml` file under `process_config`.

These lints and rules are written in [Lua][1]. For syntax and further details, see [Lua's documentation][2].

## Lints

{{< highlight yaml "hl_lines=5-8" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
{{< / highlight >}}

Each item under `lints` is a Lua snippet that can return a string. Lints are evaluated in order. If a lint returns a string, that string is shown to the user as a warning prompt:

{{< img src="coterm/linter-warning.png" alt="Command line interface. The user has run 'kubectl scale foo'. The output says 'Warning from CoTerm: No kubectl context specified (effective context: 'minikube'). It is recommended to always explicitly specify the context when running kubectl scale. Do you want to continue? (y/n)'" style="width:70%;" >}}

The user then has the option to continue or abort.

## Rules

{{< highlight yaml "hl_lines=5-18" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local k8s_context = flags.context or k8s_current_context or "unknown"
            local matches = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return matches, user_message, approver_message
          actions: ["record", "process_info", "approval"]
        # Record all other executions of kubectl scale, but don't require approval and don't bother with messages for users+approvers
        - rule: has_arg("scale")
          actions: ["record", "process_info"]
        # For all other kubectl commands, just run the command with ~zero overhead; no recording, no requiring approval
        - rule: true
          actions: []
{{< / highlight >}}

Rules are more powerful than lints. For each item under `rules`, set `rule`, a Lua snippet that returns 1-3 values; and `actions`, a list of actions for CoTerm to take.

### Rule return values

Each `rule` returns 1-3 values: `boolean, [string], [string]`.

1. (required) A Boolean, whether the rule matches.
2. (optional) A string, containing a message for the user. This string provides context to the user. It is only displayed if the first return value is `true`.
3. (optional) A string, containing a message for the approver. If the first return value is `true` and the corresponding `actions` field contains `approval`, this string is displayed in the approval request in Datadog.

### Actions

CoTerm can take the following actions when `rule` returns `true`:

- `record`: Record the terminal session and send it to Datadog.
- `process_info`: Record all processes launched inside the terminal session and generate an event for each process.
- `approval`: Require approval before running the command.
- `incidents`: Associate the recording with the [Datadog Incident][6] that the user is responding to, if any. If the user is responding to more than one incident, they are prompted to pick one.

To take no action (other than running the command) when `rule` returns `true`, set `actions: []`.

### Rule evaluation

Rules are evaluated in order. CoTerm runs the actions specified for the first rule that evaluates to `true`, and does not evaluate any further rules.

## Action hierarchy

You can specify actions for CoTerm to take in a number of different ways. CoTerm decides which actions to take according to the following hierarchy:

1. **CLI flags**: If you specify actions in CLI flags (such as `--save-level`, `--approval`), CoTerm takes only the actions specified through these CLI flags. This overrides all other configurations.
2. **Lua configuration file**: If no CLI flags specify actions, but a Lua rule in `.ddcoterm/config.yaml` evaluates to `true`, CoTerm takes the actions specified with the first rule that evaluates to `true`. Overrides all configurations other than CLI flags.
3. **`process_config.default_actions`**: If no CLI flags specify actions, and no Lua rules match, CoTerm takes the actions specified in `process_config.default_actions` in `.ddcoterm/config.yaml`, if any.
4. **Default actions**: If no CLI flags specify actions, no Lua rules match, and `process_config.default_actions` is not set, CoTerm takes the following actions: `["record", "process_info"]`.

## Lua environment and helper functions

All Lua snippets are executed inside a sandboxed [Luau][3] runtime. CoTerm injects the following variables and functions into the runtime:

### Global variables

`executable` - string
: The executable in your command. <br/>For `kubectl foo bar`, `executable` is `kubectl`.

`args` - array&lt;string&gt;
: The arguments in your command. <br/>For `kubectl foo --bar=baz`, `args` is `["foo", "--bar=baz"]`.

`flags` - table
: A [table][4] of any `--` key-value flags in your command. <br/>For `command foo --bar baz` or `command foo --bar=baz`, `flags` has one entry where `key` is `bar` and `value` is `baz`. That is, `flags.bar = baz`.

`k8s_current_context` - string
: The `current-context` value from `~./kube/config`. If this value is not found, `k8s_current_context` is [nil][5].

### Helper functions

`has_arg(<string>)`
: Returns `true` if argument is present. <br/>For `kubectl foo bar`, `has_arg("bar")` returns `true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Lua_(programming_language)
[2]: https://lua.org/docs.html
[3]: https://luau.org/
[4]: https://www.lua.org/pil/2.5.html
[5]: https://www.lua.org/pil/2.1.html
[6]: /incident_response/incident_management/