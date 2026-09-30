---
title: Windows EC2 hostnames starting with EC2AMAZ-
aliases:
  - /ec2-use-win-prefix-detection # short link for Agent logs (do not remove)
---

## Issue

In the Datadog Agent v6 and v7, the default Agent in-app hostname for UNIX platforms on EC2 is the `instance-id`. 
For Windows hosts, the default Agent in-app hostname is the operating system hostname that starts with `EC2AMAZ-`.

For v6.18.0+ and v7.18.0+, the Agent logs the following warning for Windows hosts on EC2 where the hostname starts with `EC2AMAZ-`:

```
You may want to use the EC2 instance-id for the in-app hostname. For more information: https://docs.datadoghq.com/ec2-use-win-prefix-detection
```

## Resolution

If you see the warning message above, your options are:

* Continue using the in-app hostname (do nothing)
* Use the instance-id by following the instructions below

### EC2 instance-id for Windows host on EC2

For v6.15.0+ and v7.15.0+, the Agent supports the configuration option `ec2_use_windows_prefix_detection` (default: `false`). When set to `true`, the in-app hostname for a Windows EC2 host is the instance-id for:

* New hosts (enabling this option works immediately)
* Hosts already reporting to Datadog. After enabling, message [Datadog support][1] to change the in-app hostname to the EC2 instance-id.

[1]: /help/
