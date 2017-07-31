---
title: Datadog-ssh Integration
integration_title: ssh
kind: integration
doclevel: basic
git_integration_title: ssh
---

## Overview 

Capture SSH activity into Datadog to:

* Visualize your SSH performance in real-time
* Detect any protocol failure or network outage

## Installation

1. To capture SSH metrics you need to install the Datadog Agent.

2. Configure the Agent to connect to your SSH host
Edit `conf.d/ssh_check.yaml`
{{< highlight yaml >}}
init_config:

instances:
  - host: <SOME_REMOTE_HOST>  # required
    username: <SOME_USERNAME> # required
    password: <SOME_PASSWORD> # or use private_key_file
#   private_key_file: <PATH_TO_PRIVATE_KEY>
#   private_key_type:         # rsa or ecdsa; default is rsa      
#   port: 22                  # default is port 22
#   sftp_check: False         # set False to disable SFTP check; default is True
#   add_missing_keys: True    # default is False
{{< /highlight >}}

3. Restart the Agent

{{< insert-example-links conf="ssh_check" check="ssh_check" >}}

## Validation

Run the Agent's `info` subcommand and look for `ssh_check` under the Checks section:
{{< highlight shell >}}
Checks
======
[...]

ssh_check
-------
  - instance #0 [OK]
  - Collected 1 metric, 0 events & 2 service check

[...]
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

## Service checks

`ssh.can_connect`:

Returns CRITICAL if the Agent cannot open an SSH session, otherwise OK.

`sftp.can_connect`:

Returns CRITICAL if the Agent cannot open an SFTP session, otherwise OK.
