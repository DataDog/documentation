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
Rules for Cloud Workload Security (CWS) are first evaluated in the datadog-agent, to decide what system activity to collect. This portion of a CWS rule is called the agent expression. Agent expressions use Datadog's Security Language (SECL). The standard format of a SECL expression is as follows:

```
<event>.<event-attribute> <operator> <event-attribute....>
```

## Event
Events correspond to types of activity seen by the system. The currently supported set of event types is:

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
Attributes can be used to specify exact data/behavior for a rule. Attributes are based on CWS event attributes which can be found LINK here LINK

## Operators
SECL operators are used to comibine event attributes together into a full expression. The following operators are available:
TBD OPERATORS

## Helpers
TBD HELPERS
