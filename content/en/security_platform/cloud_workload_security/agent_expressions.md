---
title: Agent Expressions
kind: documentation
description: "Agent expression attributes and operators for Cloud Workload Security Rules"
further_reading:
- link: "/security_platform/cloud_workload_security/getting_started/"
  tag: "Documentation"
  text: "Get started with Datadog Cloud Workload Security"
- link: "/security_platform/cloud_workload_security/getting_started/"
  tag: "Documentation"
  text: "Event attributes for Cloud Workload Security"
---

## Agent Expression Syntax
Rules for Cloud Workload Security (CWS) are first evaluated in the Datadog Agent to decide what system activity to collect. This portion of a CWS rule is called the agent expression. Agent expressions use Datadog's Security Language (SECL). The standard format of a SECL expression is as follows:

```
<trigger>.<event-attribute> <operator> <value> <event-attribute> ...
```

Using this format, an example rule looks like this:
```
open.file.path == "/etc/shadow" && file.path not in ["/usr/sbin/vipw"]
```

## Triggers
Triggers are events that correspond to types of activity seen by the system. The currently supported set of triggers is:

| SECL Event           | Type             |  Definition                           | Agent Version |
|----------------------|------------------|---------------------------------------|---------------|
| `exec`               | Process          | A process was executed or forked      | 7.27          |
| `open`               | File             | A file was opened                     | 7.27          |
| `chmod`              | File             | A file's permissions were changed     | 7.27          |
| `chown`              | File             | A file's owner was changed            | 7.27          |
| `mkdir`              | File             | A directory was created               | 7.27          |
| `rmdir`              | File             | A directory was removed               | 7.27          |
| `rename`             | File             | A file/directory was renamed          | 7.27          |
| `unlink`             | File             | A file was deleted                    | 7.27          |
| `utimes`             | File             | Change file access/modification times | 7.27          |
| `link`               | File             | Create a new name/alias for a file    | 7.27          |
| `setxattr`           | File             | Set exteneded attributes              | 7.27          |
| `removexattr`        | File             | Remove extended attributes            | 7.27          |
| `mount`              | File             | Mount a filesystem                    | 7.27          |
| `unmount`            | File             | Unmount a filesystem                  | 7.27          |

## Attributes
Attributes can be used to specify exact data and behavior for a rule. Attributes are based on [CWS event attributes][1].

## Operators
SECL operators are used to combine event attributes together into a full expression. The following operators are available:

| SECL Operator         | Types            |  Definition                           | Agent Version |
|-----------------------|------------------|---------------------------------------|---------------|
| `==`                  | Process          | Equal                                    | 7.27          |
| `!=`                  | File             | Not equal                                | 7.27          |
| `>`                   | File             | Greater                                  | 7.27          |
| `>=`                  | File             | Greater or equal                         | 7.27          |
| `<`                   | File             | Lesser                                   | 7.27          |
| `<=`                  | File             | Lesser or equal                          | 7.27          |
| `!`                   | File             | Not                                      | 7.27          |
| `^`                   | File             | Binary not                               | 7.27          |
| `in [elem1, ...]`     | File             | Element is contained in list             | 7.27          |
| `not in [elem1, ...]` | File             | Element is not contained in list         | 7.27          |
| `[~pattern, ...]`     | File             | Regex pattern is (not) contained in list | 7.27          |
| `=~`                  | File             | String matching                          | 7.27          |
| `&`                   | File             | Binary and                               | 7.27          |
| `|`                   | File             | Binary or                                | 7.27          |
| `&&`                  | File             | Logical and                              | 7.27          |
| `||`                  | File             | Logical or                               | 7.27          |

## Helpers
Helpers exist in SECL that enable users to write advanced rules without needing to rely on generic techniques such as regex.

### Command line arguments
The *args_flags* and *args_options* are helpers to ease the writing of CWS rules based on command line arguments.

*args_flags* is used to catch arguments that start with either one or two hyphen characters but do not accept any associated value.

Examples:
* `version` is part of *args_flags* for the command `cat --version`
* `l` and `n` both are in *args_flags* for the command `netstat -ln`

	
*args_options* is used to catch arguments that start with either one or two hyphen characters and accepts a value either specified as the same argument but separated by the ‘=’ character or specified as the next argument.

Examples:
* `T=8` and `width=8` both are in *args_options* for the command `ls -T 8 --width=8`
* `exec.args_options ~= [ “s=.*\’” ]` can be used to detect `sudoedit` was launched with `-s` argument and a command that ends with a `\`

### File rights

The *file.rights* attribute can now be used in addition to *file.mode*. *file.mode* can hold values set by the kernel, while the *file.rights* only holds the values set by the user. These rights may be more familiar because they are in the `chmod` commands.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security_platform/cloud_workload_security/event_attributes
