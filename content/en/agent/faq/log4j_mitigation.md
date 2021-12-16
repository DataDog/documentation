---
title: Mitigating the Risk of Remote Code Execution Due to Log4Shell
kind: faq
---

If you are using the Datadog Agent between versions v7.17.0/v6.17.0 and v7.32.2/v6.32.2, you may be impacted by the vulnerability presented by Log4Shell (CVE-2021-44228 and CVE-2021-45046). If you are using an Agent earlier than v7.17.0/v6.17.0, you should not be impacted by the vulnerability unless you configured log4j to log with the JMS Appender (an option that is not supported by the Agent, but if you did it, disable the appender).

**The best way to mitigate the vulnerability is to upgrade your Datadog Agent to v7.32.3 (v6.32.3) or later.** 

If you are not able to upgrade your Agent at this time, you can use these instructions either [delete the JndiLookup.class](#delete-jndilookupclass) or to [implement an environment variable](#set-log4j_format_msg_no_lookups-environment-variable) (`LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` on the JMXFetch process or the Agent process) to partially mitigate the vulnerability. 

# Delete JndiLookup.class

**The best way to mitigate the vulnerability is to upgrade your Datadog Agent to v7.32.3 (v6.32.3) or later.** 

Removing the JndiLookup.class [fully mitigates CVE-2021-44228 and CVE-2021-45046](https://logging.apache.org/log4j/2.x/security.html).

**Note**: This mitigation is not needed for 7.32.3/6.32.3. In these versions, JMXFetch uses log4j v2.12.2, which is not affected by CVE-2021-45046 or CVE-2021-44228.

### Linux and macOS

Save the following code as a bash script, then run the script to patch the provided jmxfetch.jar in place. 

```bash
#!/bin/bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)

TARGET="/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar"
JNDI_CLASS="org/apache/logging/log4j/core/lookup/JndiLookup.class"

set -e

if ! command -v zip &> /dev/null;
then
    if [[ ! -z $YUM_CMD ]]; then
       yum install zip
    elif [[ ! -z $APT_GET_CMD ]]; then
       apt-get update
       apt-get -y install zip
    fi
fi

zip -q -d $TARGET $JNDI_CLASS
```

Check to see that the above step was successful by running the following command. 

```bash
jar tvf /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar | grep JndiLookup.class
```

The command should return no output if the class has successfully been removed.

Finally, restart the Datadog Agent service with `sudo systemctl restart datadog-agent` (Linux systemd-based systems), `sudo restart datadog-agent` (Linux upstart-based systems) or from the Datadog Agent app in the menu bar (macOS).

### Windows

Save the following powershell code as `jndi_cleanup.ps1`. 

```powershell
Param(
    [Parameter(Mandatory=$false)]
    [Switch]$Validate

)

[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression')

$zipfile = "C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar"
$files   = "JndiLookup.class"

$stream = New-Object IO.FileStream($zipfile, [IO.FileMode]::Open)
$update_mode   = [IO.Compression.ZipArchiveMode]::Update
$read_mode   = [IO.Compression.ZipArchiveMode]::Read

if ($Validate -eq $true) {
	$mode = $read_mode
} else {
	$mode = $update_mode
}

$zip    = New-Object IO.Compression.ZipArchive($stream, $mode)

if ($Validate -eq $true) {
	$found = New-Object System.Collections.Generic.List[System.Object]
	($zip.Entries | ? { $files -contains $_.Name }) | % { $found.Add($_.Name) }

    if ($found.Count -eq 0) { 
        Write-Output "The $zipfile is now safe to run." 
    } else { 
        Write-Output "Dangerous file still present, something failed during the JNDI cleanup."
    }
} else {
	($zip.Entries | ? { $files -contains $_.Name }) | % { $_.Delete() }
}

$zip.Dispose()
$stream.Close()
$stream.Dispose()
```

Stop the Datadog Agent service.

```powershell
"$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" stopservice	
```

Remove the JndiLogger.class from the jmxfetch.jar by running:

```powershell
.\jndi_cleanup.ps1 
```

Validate the JndiLogger.class was removed by running:

```powershell
.\jndi_cleanup.ps1 -Validate
```

If the operation was successful the expected out is:

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

Finally, start the Datadog Agent service to apply the changes.

```powershell
"$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" start-service
```

### AIX

`Jmxfetch.jar` is included in the AIX agent install bundle, but there is no code in the AIX agent that runs the `jmxfetch` code. If you are not manually starting the `jmxfetch` process, the `jmxfetch.jar` is not used and can be deleted from `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

# Set LOG4J_FORMAT_MSG_NO_LOOKUPS environment variable

**The best way to mitigate the vulnerability is to upgrade your Datadog Agent to v7.32.3 (v6.32.3) or later.** 

**Note**: If you are running v7.32.2 or v6.32.2, you do not need to perform these steps. The Agent v7.32.2 (and v6.32.2) [starts jmxfetch with a property](https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst#7322--6322) that achieves the same result. In all cases, the best option is to upgrade your Datadog Agent to v7.32.3 (v6.32.3) or later.

**Note**: Setting the LOG4J_FORMAT_MSG_NO_LOOKUPS environment variable to true will reduce the risk of remote code execution but it is not a complete mitigation.

## Host installs

On Linux, the instructions depend on the init system and on the distribution:

### Systemd-based systems:

#### RedHat/CentOS 7 and 8; Amazon Linux 2; SUSE 12+; Ubuntu 16.04+/Debian 8+

1. Create an override file with the following contents at `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf`:
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. Reload the systemd service definitions: `sudo systemctl daemon-reload`
3. Restart the datadog-agent service: `sudo systemctl restart datadog-agent`


### Upstart-based systems 

Instructions are different depending on the Linux distribution:

#### Ubuntu 14.04

1. Create an override file with the following contents at `/etc/init/datadog-agent.override`:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Stop and start the datadog-agent service: `sudo stop datadog-agent && sudo start datadog-agent`

**Note**: Use `start` and `stop`, because `restart` does not pick up the service configuration change.

#### RedHat/Centos 6; Amazon Linux 1:

1. Add the following line at the end of the existing `/etc/init/datadog-agent.conf` file:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Stop and start the datadog-agent service: `sudo stop datadog-agent && sudo start datadog-agent`

**Note**: Use `start` and `stop`, because `restart` does not pick up the service configuration change.

**Note**: The `/etc/init/datadog-agent.conf` file is overwritten when the Agent is re-installed, upgraded, or downgraded, you must run these steps again if you upgrade, downgrade, or reinstall the Agent until you upgrade the Agent to v7.32.3/v6.32.3 or above.

### Windows

1. Run an administrator PowerShell on the machine.
2. Run the following snippet:
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Restart the Datadog Agent service to apply the changes.

**Note**: This applies to all JVMs running on the host.

### AIX

`Jmxfetch.jar` is included in the AIX agent install bundle, but there is no code in the AIX agent that runs the `jmxfetch` code. If you are not manually starting the `jmxfetch` process, the `jmxfetch.jar` is not used and can be deleted from `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

If you are manually running the `jmxfetch.jar`, pass the following flag to the Java process: `‐Dlog4j2.formatMsgNoLookups=True`


## Containerized Agent

**Note**: Setting the LOG4J_FORMAT_MSG_NO_LOOKUPS environment variable to true will reduce the risk of remote code execution but it is not a complete mitigation.

### Docker (Linux and Windows)

Specify the following environment variable when running the datadog-agent container, by adding it to the `docker run` command: `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### Kubernetes

Set the environment variable `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` on the `agent` container, or on all Datadog containers. With the official Datadog Helm chart, add the environment variable to the list under the `datadog.env` value, for example:

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```
