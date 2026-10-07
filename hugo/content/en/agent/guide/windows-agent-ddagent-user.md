---
title: Datadog Windows Agent User
description: Guide to the ddagentuser account used by the Windows Agent, covering installation, permissions, security policies, and integration considerations.
aliases:
  - /agent/faq/windows-agent-ddagent-user/
algolia:
  tags: ['windows agent user', 'windows user', 'ddagentuser', 'group policy']
---

## Overview

The core Datadog Agent and integrations—including Python checks, custom checks, and JMXFetch—run as the selected Windows account. By default, the Agent runs under a standard Windows account, not an administrator account. Additional configuration may be required to grant the Agent access to some resources.

Components that require elevated privileges run separately. For example, System Probe runs as `LocalSystem`, and some features use kernel drivers. These components do not change the permissions of the core Agent or integrations.

## Choose an Agent account

Select an account based on host security policies and access requirements.
Use a dedicated service account, not an interactive user account. The installer changes the selected account's user rights and service configuration.
For domain environments, use a gMSA when possible to avoid managing and rotating a password manually.

{{< tabs >}}
{{% tab "Local account" %}}

By default, the installer creates the local account `ddagentuser` with a generated password.

To use a different local account, enter its name as `.\<USERNAME>` during installation. You can also use `<HOSTNAME>\<USERNAME>`. The installer creates the account if it does not exist. If you omit the password, the installer generates one and sets it on the account.

Domain controllers do not have local accounts. For more information, see [Domain environments](#domain-environments).

{{% /tab %}}
{{% tab "gMSA" %}}

Choose a group Managed Service Account (gMSA) when the Agent needs a domain identity. A gMSA provides automatic password management through Active Directory, so you do not need to provide or rotate the password manually. Create the gMSA, authorize the host to retrieve its password, and enter the account as `<DOMAIN>\<USERNAME>$`.

Do not provide a password for a gMSA. The installer verifies that Windows recognizes the account as a managed service account.

For Active Directory configuration steps, see [Getting started with group Managed Service Accounts][11].

[11]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts

{{% /tab %}}
{{% tab "Domain account" %}}

Choose a dedicated domain account when the Agent needs a domain identity. Create the account before installing on a domain-joined member host.

Enter the account as `<DOMAIN>\<USERNAME>` and provide its password for the initial installation.

{{% /tab %}}
{{% tab "LocalSystem" %}}

Choose `LocalSystem` to avoid managing a separate local account or to comply with policies that prohibit local user accounts. Enter `LocalSystem` as the username and omit the password.

With `LocalSystem`, the core Agent and integrations run with elevated local privileges. When accessing network resources, the Agent uses the computer account.

{{% /tab %}}
{{< /tabs >}}

### Pass account details to the installer

{{< tabs >}}
{{% tab "Executable" %}}

Set these environment variables before running the executable installer:

```powershell
$env:DD_AGENT_USER_NAME = '<USERNAME>'
$env:DD_AGENT_USER_PASSWORD = '<PASSWORD>'
```

{{% /tab %}}
{{% tab "MSI" %}}

Pass these public properties to `msiexec`:

```text
DDAGENTUSER_NAME="<USERNAME>" DDAGENTUSER_PASSWORD="<PASSWORD>"
```

The `DDAGENTUSER_PASSWORD` property cannot contain a semicolon (`;`).

{{% /tab %}}
{{< /tabs >}}

The username portion must contain 20 characters or fewer to comply with the Microsoft [sAMAccountName attribute requirements][1].

### Agent account password handling

Beginning with [Agent 7.66][14], the installer stores the provided Agent account password as an encrypted Local Security Authority (LSA) private data object. Only local administrators can access it. For more information, see Microsoft's documentation on [storing private data][15] and [private data objects][16]. The installer uses the stored password for later manual or Fleet Automation upgrades, so you do not need to provide the password again. Uninstalling the Agent removes the stored password.

When upgrading a host that uses a custom domain account from Agent 7.65 or earlier, provide the account password during the upgrade to store it for subsequent Fleet Automation upgrades.

## Permissions configured by the installer

During installation, the installer adds the Agent account to these local groups:

* {{< ui >}}Performance Monitor Users{{< /ui >}} to access WMI information and performance counter data
* {{< ui >}}Event Log Readers{{< /ui >}} to read Windows event logs
* {{< ui >}}Performance Log Users{{< /ui >}} to use Event Tracing for Windows

The installer does not add the Agent account directly to the built-in {{< ui >}}Users{{< /ui >}} group. Windows normally provides this access through default group memberships. If your organization changes these memberships, grant the Agent account access to required resources directly or add it to the group.

The installer also configures these user rights:

* {{< ui >}}Log on as a service{{< /ui >}}
* {{< ui >}}Deny access to this computer from the network{{< /ui >}}
* {{< ui >}}Deny log on locally{{< /ui >}}
* {{< ui >}}Deny log on through Remote Desktop Services{{< /ui >}}

The {{< ui >}}Deny access to this computer from the network{{< /ui >}} right applies to incoming connections. If you use one domain account for the Agent on multiple hosts, this right can prevent an Agent from accessing network resources on another Agent host. To allow this access with Agent 7.85 and later, pass the `DDAGENTUSER_KEEP_RIGHTS=1` install-time option when installing or upgrading the Agent on the target host, and remove the deny-network-logon right. The installer stores this option and does not reapply the three deny-logon rights during later installations or upgrades. The installer always grants the log-on-as-a-service right.

Domain Group Policy can override local group membership and user-rights assignments. Configure the applicable policy to grant the log-on-as-a-service right and required resource access.

## Domain environments

### Domain-joined member hosts

On a domain-joined member host, the installer can create a local account or use an existing local, domain, gMSA, or built-in service account. Create a domain account before installation because a member host cannot create one.

For the initial installation with a standard domain account, provide the password. A gMSA does not require a password.

### Writable domain controllers

Domain controllers do not have local accounts. Select an existing domain account or gMSA, or provide a username and password for the installer to create a standard account in the domain. To use a gMSA or an account from a parent domain, create the account before installation.

### Read-only domain controllers

On a read-only domain controller, use an existing domain account or gMSA. The installer cannot create the account or change its group memberships. Before installation, grant the account the required groups and user rights through Active Directory or Group Policy.

## Change the Agent account or password

To change the Agent account or its password, rerun the executable or MSI installer and pass the Agent username and password install-time options.

Do not change the Windows service configuration manually. Editing the account in the Windows Services app or with `sc.exe` updates only the logon identity, not the group memberships, user rights, file and service ACLs, or stored password, which can leave the Agent unable to start or collect data.

Use a gMSA to avoid manual password rotation. If you use a standard domain account and its password changes in Active Directory, the Agent's stored credentials become stale, which can leave the Agent unable to start or collect data. Restore access by rerunning the installer with the new password.

## Upgrades

Agent 7.25 and later retain the Agent username during upgrades when you do not provide one. The installer uses the stored password for an existing local or domain account when available. You can change the Agent username during an upgrade by providing the new username and required password.

The installer reapplies its default group memberships and user-rights assignments during installation and upgrades. With Agent 7.85 and later, set `DDAGENTUSER_KEEP_RIGHTS=1` to preserve customized deny-logon rights.

## Grant access to monitored resources

The installer configures the [group memberships and user rights](#permissions-configured-by-the-installer), but it does not grant access to every monitored resource. Python and custom checks run as the Agent account and can access only the files, registry keys, environment variables, network resources, and processes available to that account. Grant the account any additional permissions required by integrations.

### Integration authentication

Integrations run as the Agent account, but some integrations support separate credentials for monitored resources. Without explicit credentials, the integration accesses the resource as the Agent account.

For example, the [SQL Server integration][12] can use the Agent account for Windows Authentication or use configured credentials. The [Disk integration][13] can access network shares as the Agent account or use configured credentials. See each integration's documentation for supported authentication options and configuration steps.

### Files, directories, and logs

Grant the Agent account read access to files and directories monitored by integrations. Grant the same access to log files collected by the Agent.

### Windows services

The Windows Service integration cannot report the status of a service when its access control list prevents the Agent account from querying it. This can occur with services such as DHCP Server (`DHCPServer`) and Active Directory Domain Services (`NTDS`). Grant the Agent account `Read` access to each restricted service you want to monitor. For configuration and troubleshooting steps, see [Windows Service permissions][17].

### JMX-based integrations

JMX-based integrations, such as [ActiveMQ][2], [ActiveMQ XML][3], [Cassandra][4], [JMX][5], [Presto][6], [Solr][7], [Tomcat][8], and [Kafka][9], use JMXFetch, which runs as the Agent account. When an integration uses `process_name_regex`, JMXFetch uses the Attach API and can attach only to JVMs running as the same account.

Use JMX Remote by configuring the integration with `host` and `port` instead. For configuration details, see [JMX integration management][5].

### Process check

An unprivileged Agent account cannot read the full command line or owner of every process running as another user. As a result, the Process check cannot reliably use:

* `exact_match` set to `false`
* `user` filters for processes owned by other accounts

Select `LocalSystem` as the Agent account when these process details are required and the broader local privileges meet the host's security policy.

### Cassandra Nodetool integration

For the [Cassandra Nodetool integration][4]:

* Grant the Agent account access to the Nodetool installation directory.
* Set the environment variables of the Nodetool installation directory (`CASSANDRA_HOME` and `DSCINSTALLDIR`) as system-wide variables.

### Windows Security event log

The Agent account must belong to the {{< ui >}}Event Log Readers{{< /ui >}} group to collect the Security event log. The installer adds this membership except on a read-only domain controller, where you must configure it before installation.

If Group Policy removes the membership, update the policy or add the account to an allowed domain group that has access to the Security event log. For configuration details, see the [Win32 Event Log integration][10].

## Configuration management

If you use Chef and the official `datadog` cookbook to deploy the Agent on Windows hosts, use cookbook version 2.18.0 or later so the Agent configuration files receive the correct permissions.

[1]: https://learn.microsoft.com/en-us/windows/win32/adschema/a-samaccountname
[2]: /integrations/activemq/
[3]: /integrations/activemq/#activemq-xml-integration
[4]: /integrations/cassandra/
[5]: /integrations/java/
[6]: /integrations/presto/
[7]: /integrations/solr/
[8]: /integrations/tomcat/
[9]: /integrations/kafka/
[10]: /integrations/win32_event_log/
[11]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts
[12]: /integrations/sqlserver/
[13]: /integrations/disk/
[14]: https://github.com/DataDog/datadog-agent/releases/tag/7.66.0
[15]: https://learn.microsoft.com/en-us/windows/win32/secmgmt/storing-private-data
[16]: https://learn.microsoft.com/en-us/windows/win32/secmgmt/private-data-object
[17]: /integrations/windows-service/#service-permissions
