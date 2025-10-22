---
title: Enabling Datadog Agent Access to Windows Remote and Mapped Drives
private: true
---

## Overview
This guide will cover the configuration of the Datadog Agent's [Disk check][1] in order to monitor Remote and Local Drives in **Windows** such as:
* Cloud
* Physical Drives

By default, the Datadog Agent monitors local drives on the host where it’s installed. There are times when additional configuration is required in order to monitor shared or mapped network drives - such as those mounted from remote servers or cloud storage services like Azure Storage Accounts. This is because Windows often restricts access to mapped drives for system services like the Agent, meaning OOTB metrics (i.e. `system.disk.*`) and custom log tailing won’t be collected automatically.

### Symptoms of Unmounted Drives
* Permisson Issues
* Logs not being tailed
* Missing Metrics

## Next Steps
### Pre-Check
Before we start configuring mounts, it is worth verifying what drives the Agent is able to monitor. 
We can do this byrunning the following python script using the Agent's embedded python:
```
import psutil

for p in psutil.disk_partitions(all=True):
  print(p)
 ```
You can find the Agent's embedded python here (Agent versions >= `6.12`):
`& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python"`

### Configuration
To create mounts in the Agent, we can edit the `disk.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample disk.d/conf.yaml][3] for all available configuration options.

#### Examples

| Setup Type                                  | Example     | Configuration                                                                                                                                                                                                                         |
|----------------------------                 |-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Remote Host**                               |             |      |
| **Remote Drive**                               |             |      |
|                                             |             |      |
|                                             |             |      |

#### Parameters
* `mountpoint`: This is the drive letter assigned to the shared drive (`Z:\`).
* `type`: This indicates the type of network share in use. Various share types are available (e.g., `NFS`, `SMB`, `iSCSI`), and specifying this value helps the agent connect to the share.
* `user`: The username configured for the share (not the OS username).
* `password`: The password associated with the share (not the OS password).
* `host`: The IP address or domain of the share to connect to.
* `share`: Most shares have a designated name, which the customer should typically already know.

### Verify
#### Logs
You can check the Agent status command to see if your logs are being tailed - you should see `Bytes read:` and no permission errors.

#### Metrics
You can review if metrics are being created for your drive by running the `--check-rate` command on the Disk check. This command will reveal the assosicated metric values and tags. Look out for the `device_name` tag to see if your drive is being accounted for.

## Troubleshooting
Need help? Contact [Datadog support][8].



[1]: /integrations/disk/
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default

[8]: https://docs.datadoghq.com/help/
