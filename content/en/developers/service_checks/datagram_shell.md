---
title: Datagram Format and Shell Usage for Service Checks
kind: documentation
description: Overview of the datagram format used by DogStatsD as well as (advanced) shell usage.
aliases:
- /developers/dogstatsd/datagram_shell
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

This section specifies the raw datagram format for Service Checks that DogStatsD accepts. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send Service Checks, then read on.

## Service Checks Datagram Format

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| Parameter                             | Required   | Description                                                                                                                                    |
| ------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                 | Yes        | the datagram must begin with `_sc`                                                                                                             |
| `<NAME>`                              | Yes        | Service check name.                                                                                                                            |
| `<STATUS>`                            | Yes        | Integer corresponding to the check status (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3).                                                    |
| `d:<TIMESTAMP>`                       | No         | Add a timestamp to the check. Default is the current Unix epoch timestamp.                                                                     |
| `h:<HOSTNAME>`                        | No         | Add a hostname to the event. No default.                                                                                                       |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`  | No         | The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default.                         |
| `m:<SERVICE_CHECK_MESSAGE>`           | No         | Add a message describing the current state of the Service Check. *This field MUST be positioned last among the metadata fields.* No default.   |

Here's an example datagram:

```
# Send a CRITICAL status for a remote connection
_sc|Redis connection|2|#redis_instance:10.0.0.16:6379|m:Redis connection timed out after 10s
```

## Send Service Checks using DogStatsD and the shell

TO DO

[1]: /developers/libraries/#api-and-dogstatsd-client-libraries
