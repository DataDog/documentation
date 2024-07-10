---
title: Log Collection Troubleshooting Guide

aliases:
  - /logs/faq/log-collection-troubleshooting-guide
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide//logs-not-showing-expected-timestamp/"
  tag: "Guide"
  text: "Why do my logs not have the expected timestamp?"
- link: "/logs/guide/logs-show-info-status-for-warnings-or-errors/"
  tag: "Guide"
  text: "Why do my logs show up with an Info status even for Warnings or Errors?"
---

There are a number of common issues that can get in the way when [sending new logs to Datadog][1] via the log collector in the `dd-agent`. If you experience issues sending new logs to Datadog, this list helps you troubleshoot. If you continue to have trouble, [contact Datadog support][2] for further assistance.

## Restart the Agent

Changes in the configuration of the `datadog-agent` won't be taken into account until you have [restarted the Agent][3].

## Outbound traffic on port 10516 is blocked

The Datadog Agent sends its logs to Datadog over TCP using port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the `agent.log` file to that effect.

You can manually test your connection using OpenSSL, GnuTLS, or another SSL/TLS client. For OpenSSL, run the following command:

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

For GnuTLS, run the following command:

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

And then by sending a log like the following:

```text
<API_KEY> this is a test message
```

- If opening the port 10516 is not an option, it is possible to configure the Datadog Agent to send logs through HTTPS by adding the following in `datadog.yaml`:

```yaml
logs_config:
  force_use_http: true
```

See the [HTTPS log forwarding section][4] for more information.

## Check the status of the Agent

Often, checking the [Agent status command][5] results will help you troubleshoot what is happening.

## No new logs have been written

The Datadog Agent only collects logs that have been written after it has started trying to collect them (whether it be tailing or listening for them). In order to confirm whether log collection has been successfully set up, make sure that new logs have been written.

## Permission issues tailing log files

The Datadog Agent does not run as root (and running as root is not recommended, as a general best practice). When you configure your Agent to tail log files for custom logs or for integrations, you need to take special care to ensure the Agent user has the correct access to the log files.

The default Agent user per operating system:
| Operating system | Default Agent user |
| ---------------  | ------------------ |
| Linux | `datadog-agent` |
| MacOS | `datadog-agent` |
| Windows | `ddagentuser` |

If the Agent does not have the correct permissions, you might see one of the following error messages when checking the [Agent status][5]:
- The file does not exist.
- Access is denied.
- Could not find any file matching pattern `<path/to/filename>`, check that all its subdirectories are executable.

To fix the error, give the Datadog Agent user read and execute permissions to the log file and subdirectories.

{{< tabs >}}
{{% tab "Linux" %}}
1. Run the `namei` command to obtain more information about the file permissions:
   ```
   > namei -m /path/to/log/file
   ```

   In the following example, the Agent user does not have `execute` permissions on the `application` directory or read permissions on the `error.log` file.

   ```
   > namei -m /var/log/application/error.log
   > f: /var/log/application/
   drwxr-xr-x /
   drwxr-xr-x var
   drwxrwxr-x log
   drw-r--r-- application
   -rw-r----- error.log
   ```

1. Make the logs folder and its children readable:

   ```bash
   sudo chmod o+rx /path/to/logs
   ```

**Note**: Make sure that these permissions are correctly set in your log rotation configuration. Otherwise, on the next log rotate, the Datadog Agent might lose its read permissions. Set permissions as `644` in the log rotation configuration to make sure the Agent has read access to the files.

{{% /tab %}}

{{% tab "Windows (cmd)" %}}
1. Use the `icacls` command on the log folder to obtain more information about the file permissions:
   ```
   icacls path/to/logs/file /t
   ```
   The `/t` flag runs the command recursively on files and sub-folders.

   In the following example, the `test` directory and its children are not accessible to `ddagentuser`:

   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)
   ```

1. Use the `icacls` command to grant `ddagentuser` the required permissions (include the quotes):
   ```
   icacls "path\to\folder" /grant "ddagentuser:(OI)(CI)(RX)" /t
   ```

   In case the application uses log rotation, `(OI)` and `(CI)` inheritance rights ensure that any future log files created in the directory inherit the parent folder permissions.

1. Run `icacls` again to check that `ddagentuser` has the correct permissions:
   ```powershell
   icacls path/to/logs/file /t
   ```

   In the following example, `ddagentuser` is listed in the file permissions:
   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ EC2-ABCD\ddagentuser:(OI)(CI)(RX)
          NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)
   Successfully processed 3 files; Failed processing 0 files
   ```

1. Restart the Agent service and check the status to see if the problem is resolved:

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

{{% /tab %}}

{{% tab "Windows (PowerShell)" %}}

1. Retrieve the ACL permissions for the file:
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl

   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```
   In this example, the `application` directory is not executable by the Agent.

1. Run this PowerShell script to give read and execute privileges to `ddagentuser`:
   ```powershell
   $acl = Get-Acl <path\to\logs\folder>
   $AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("ddagentuser","ReadAndExecute","Allow")
   $acl.SetAccessRule($AccessRule)
   $acl | Set-Acl <path\to\logs\folder>
   ```

1. Retrieve the ACL permissions for the file again to check if `ddagentuser` has the correct permissions:
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl
   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : EC2-ABCD\ddagentuser Allow  ReadAndExecute, Synchronize
            NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```

1. Restart the Agent service and check the status to see if the problem is resolved:
   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```


{{% /tab %}}

{{< /tabs >}}

## Permission issue and Journald

When collecting logs from Journald, make sure that the Datadog Agent user is added in the systemd group as shown in the [Journald integration][7].

**Note**: Journald sends an empty payload if the file permissions are incorrect. Accordingly, it is not possible to raise or send an explicit error message in this case.

## Configuration issues

These are a few of the common configuration issues that are worth triple-checking in your `datadog-agent` setup:

1. Check if the `api_key` is defined in `datadog.yaml`.

2. Check if you have `logs_enabled: true` in your `datadog.yaml`

3. By default the Agent does not collect any logs, make sure there is at least one .yaml file in the Agent's `conf.d/` directory that includes a logs section and the appropriate values.

4. You may have some .yaml parsing errors in your configuration files. YAML can be finicky, so when in doubt rely on a [YAML validator][8].

### Check for errors in the Agent logs

There might be an error in the logs that would explain the issue. Run the following command to check for errors:

```shell
sudo grep -i error /var/log/datadog/agent.log
```

## Docker environment

See the [Docker Log Collection Troubleshooting Guide][9]

## Serverless environment

See the [Lambda Log Collection Troubleshooting Guide][10]

## Unexpectedly dropping logs

Check if logs appear in the [Datadog Live Tail][11].

If they appear in the Live Tail, check the Indexes configuration page for any [exclusion filters][12] that could match your logs.
If they do not appear in the Live Tail, they might have been dropped if their timestamp was further than 18 hours in the past. You can check which `service` and `source` may be impacted with the `datadog.estimated_usage.logs.drop_count` metric.

## Truncated logs

Logs above 1MB are truncated. You can check which `service` and `source` are impacted with the `datadog.estimated_usage.logs.truncated_count` and `datadog.estimated_usage.logs.truncated_bytes` metrics.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /help/
[3]: /agent/configuration/agent-commands/#restart-the-agent
[4]: /agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /agent/configuration/agent-commands/#agent-status-and-information
[7]: /integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /logs/indexes/#exclusion-filters
