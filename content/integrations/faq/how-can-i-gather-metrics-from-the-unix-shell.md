---
title: How can I gather metrics from the UNIX shell?
kind: faq
disable_toc: true
further_reading:
- link: "developers/"
  tag: "Documentation"
  text: "Developer Tools"
- link: "developers/integrations/new_check_howto/"
  tag: "Documentation"
  text: "Create a new Integration"
---

To gather metrics from the UNIX command line, try the shell integration.

<div class="alert alert-warning">
Note: This integration is experimental and not actively developed. 
</div>

## Setup

### Installation

Install the shell integration as a [custom Agent check][1]. The integration files are on GitHub:

| File        | Agent Directory |
|-------------|-----------------|
| [YAML][2]   | `conf.d`        |
| [Python][3] | `checks.d`      |

**Note**: The names of the YAML and Python files must match.

### Configuration

Update the [shell YAML file][2] as necessary.

The user that the Agent runs as may need sudo access for the shell command. Sudo access is not required when running the Agent as root (not recommended).

## Use Case

The shell integration is an alternative to creating a custom Agent check. It collects data directly from the UNIX shell, for example: sending a metric with a value of the number of files in a certain directory.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/write_agent_check/#custom-agent-check
[2]: https://github.com/DataDog/Miscellany/blob/master/custom_check_shell/data/shell.yaml
[3]: https://github.com/DataDog/Miscellany/blob/master/custom_check_shell/data/shell.py
