---
title: Datagram Format and Shell Usage for Events
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

This section specifies the raw datagram format for events that DogStatsD accepts. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send events, then read on.

## Events Datagram Format

`_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                            | Required   | Description                                                                                                              |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `_e`                                 | Yes        | The datagram must begin with `_e`                                                                                        |
| `<TITLE>`                            | Yes        | Event title.                                                                                                             |
| `<TEXT>`                             | Yes        | Event text. Insert line breaks with an escaped slash (`\\n`)                                                             |
| `d:<TIMESTAMP>`                      | No         | Add a timestamp to the event. Default is the current Unix epoch timestamp.                                               |
| `h:<HOSTNAME>`                       | No         | Add a hostname to the event. No default.                                                                                 |
| `k:aggregation_key`                  | No         | Add an aggregation key to group the event with others that have the same key. No default.                                |
| `p:<PRIORITY>`                       | No         | Set to 'normal' or 'low'. Default 'normal'.                                                                              |
| `s:source_type_name`                 | No         | Add a source type to the event. No default.                                                                              |
| `t:<ALERT_TYPE>`                     | No         | Set to 'error', 'warning', 'info' or 'success'. Default 'info'.                                                          |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No         | The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default.   |

Here are some example datagrams:

```
## Send an exception
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## Send an event with a newline in the text
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

## Send events using DogStatsD and the shell

For Linux and other Unix-like OS, use Bash. For Windows, you need PowerShell and [PowerShell-statsd][2] (a simple PowerShell function that takes care of the network bits). The idea behind DogStatsD is: create a message that contains information about your metric, and send it to a collector over UDP on port `8125`.

The format for sending events is:

```
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

Here, calculate the size of the event's title and body:

On Linux:

```
vagrant@vagrant-ubuntu-14-04:~$ title="Event from the shell"
vagrant@vagrant-ubuntu-14-04:~$ text="This was sent from Bash!"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

On Windows:

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from PowerShell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.
