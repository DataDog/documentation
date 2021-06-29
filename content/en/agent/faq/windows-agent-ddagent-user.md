---
title: Datadog Windows Agent User
kind: faq
---

Starting with release `6.11.0`, the Core and APM/Trace components of the Windows Agent run under a dedicated user account, instead of running under the `LOCAL_SYSTEM` account, as was the case on prior versions. If enabled, the Live Process component still runs under the `LOCAL_SYSTEM` account.

The Agent installer creates a new account by default (`ddagentuser`) but it can also use a user-supplied account.
The account is assigned to the following groups during installation:

* It becomes a member of the “Performance Monitor Users” group
  * Necessary to access WMI information
  * Necessary to access Windows performance counter data
* It becomes a member of the “Event Log Readers” group

**Note**: The installer doesn't add the account it creates to the `Users` groups by default. In rare cases, you may encounter permission issues. If so, manually add the created user to the `Users` group.

Additionally the following security policies are applied to the account during installation:
* Deny access to this computer from the network
* Deny log on locally
* Deny log on through Remote Desktop Services
* Log on as a service

**Important**: Since the account is modified during installation to restrict its privileges, including login privileges, make sure it is not a 'real' user account but an account solely dedicated to run the Datadog Agent.

## Installation

If no user account is specified on the command line, the installer will attempt to create a local user account named `ddagentuser` with a randomly generated password.

If a user account is specified on the command line, but this user account is not found on the system, the installer will attempt to create it.
If a password was specified, the installer will use that password, otherwise it will generate a random password.

To specify the optional username and password on the command line pass the following properties to the `msiexec` command:

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

**Note**: The `<USERNAME>` must be 20 characters or fewer, to comply with Microsoft's [Active Directory Schema (AD Schema) SAM-Account-Name attribute][1].

**Note**: Due to a restriction in the MSI installer, the `DDAGENTUSER_PASSWORD` property cannot contain the semicolon character `;`.

**Note**: If you encounter permission issues with `system` and `winproc` checks upon installing, make sure the `ddagentuser` is a member of the Performance Monitoring and Event Log Viewer groups.

### Installation with group policy

The installer changes the local group policy to allow the newly created user account to **run as a service**.
If the domain group policy disallows that, then the installation setting is overridden, and you must update the domain group policy to allow the user account to run as a service.

### Installation in a domain environment

#### Domain joined machines

On domain joined machines, the Agent installer can use a user supplied account, whether it is a domain or local one, or create a local account.

If a domain account is specified on the command line, it must exist prior to the installation since only domain controllers can create domain accounts.

If a user account is specified on the command line, but this user account is not found on the system, the installer will attempt to create it. If a password was specified, the installer will use that password. Otherwise it will generate a random password.

To specify a username from a domain account, use the following form for the `DDAGENTUSER_NAME` property:

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

The `<DOMAIN>` can either be a fully-qualified domain name (in the form `mydomain.com`) or the NETBIOS name (the pre-Windows 2000 name).
It must be separated from the `<USERNAME>` with a backslash `\`.

**Note**: The `<USERNAME>` must be 20 characters or fewer, to comply with Microsoft's [Active Directory Schema (AD Schema) SAM-Account-Name attribute][1].

**Note**: Due to a restriction in the MSI installer, the `DDAGENTUSER_PASSWORD` property cannot contain the semicolon character `;`.

#### Domain controllers

##### Primary and backup domain controllers

When installing the Agent on a domain controller, there is no notion of local user account. So if the installer creates a user account, it will be a domain user rather than a local one.

If a user account is specified on the command line, but this user account is not found in the domain, the installer will attempt to create it. If a password was specified, the installer will use that password. Otherwise it will generate a random password.

If the specified user account is from a parent domain, the installer will use that user account.
If the user account doesn't exist, it will create the user account in the child domain (the domain that the controller is joined to).
The installer will never create a user account in the parent domain.

##### Read-only domain controllers

The installer can use only an existing domain account when installing on a read-only domain controller.

### Installation with Chef

If you use Chef and the official `datadog` cookbook to deploy the Agent on Windows hosts, **use version 2.18.0 or above** of the cookbook to ensure that the Agent’s configuration files have the correct permissions

## Upgrade

For Agent version < `7.25.0` when you upgrade the Datadog Agent on a domain controller or host where the user has supplied a username for the Agent, you must supply the `DDAGENTUSER_NAME` but not the `DDAGENTUSER_PASSWORD`.

Starting with Agent version `7.25.0` the installer will retain the username used to install the Agent and re-use it during upgrades.
It is still possible to override the saved value with `DDAGENTUSER_NAME`.

## Agent integrations

### General permissions

Every effort has been made to ensure that the transition from `LOCAL_SYSTEM` to `ddagentuser` is seamless. However, there is a class of problems that requires specific, configuration-specific modification upon installation of the Agent. These problems arise where the Windows Agent previously relied on administrator rights that the new Agent lacks by default.

For example, if the directory check is monitoring a directory that has specific access rights, e.g. allowing only members of the Administrators group read access, then the existing Agent currently can monitor that directory successfully since `LOCAL_SYSTEM` has administrator rights. Upon upgrading, the administrator must add `ddagentuser` to the access control list for that directory in order for the directory check to function.

**Note**: For Windows Server OS, the Windows Service integration cannot check against the DHCP Server service due to the special ACL for the `DHCPServer` service. The check returns `UNKNOWN` in such case.

**Note**: The same considerations apply to the log files that may be monitored by the Logs Collection features of the Agent.

### JMX-based integrations

The change to `ddagentuser` affects your JMX-based integrations if the Agent’s JMXFetch is configured to connect to the monitored JVMs through the Attach API, i.e. if:

1. You’re using a JMX-based integration, i.e. one of the following integrations:
   * [ActiveMQ][2]
   * [ActiveMQ_XML][3]
   * [Cassandra][4]
   * [JMX][5]
   * [Presto][6]
   * [Solr][7]
   * [Tomcat][8]
   * [Kafka][9]

2. **AND** you’ve configured the integration with the `process_name_regex` setting instead of the `host` and `port` settings.

If you’re using the Attach API, the change in user context means that the Agent’s JMXFetch is only be able to connect to the JVMs that also run under the `ddagentuser` user context. In most cases, it's recommended that you switch JMXFetch to using JMX Remote by enabling JMX Remote on your target JVMs and configuring your JMX integrations using `host` and `port`. For more information, refer to the [JMX documentation][5].

### Process check

In v6.11 +, the Agent runs as `ddagentuser` instead of `Local System`. Because of this, it does not have access to the full command line of processes running under other users and to the user of other users’ processes. This causes the following options of the check to not work:

* `exact_match` when set to `false`
* `user`, which allows selecting processes that belong to a specific user

To restore the old behavior and run the Agent as `Local System` (not recommended) open an Administrator console and run the following command: `sc.exe config "datadogagent" obj= LocalSystem`. Alternatively, open the Service Manager, go to DataDog Agent > Properties and specify Log On as `Local System`.

### Cassandra Nodetool integration

For the Cassandra Nodetool integration to continue working, apply the following changes to your environment:

* Grant access to the Nodetool installation directory to the `ddagentuser`.
* Set the environment variables of the Nodetool installation directory (e.g. `CASSANDRA_HOME` and `DSCINSTALLDIR`) as system-wide variables instead of variables only for the user doing the Nodetool installation.

## Security logs channel

If you are using the [Datadog- Win 32 event log Integration][10], the Datadog user `ddagentuser` must be added to the Event Log Reader Group to collect logs from the Security logs channel:

1. Open Run with *Windows+R* hotkeys, type `compmgmt.msc`.
2. Navigate to *System Tools* -> *Local Users and Groups* -> *Groups*.
3. Right-click **Event Log Readers** and select *Properties*.
4. Click *Add* and enter `ddagentuser` -> *Check Names*.
5. Click *OK* and *Apply*.

[1]: https://docs.microsoft.com/en-us/windows/win32/adschema/a-samaccountname?redirectedfrom=MSDN
[2]: /integrations/activemq/
[3]: /integrations/activemq/#activemq-xml-integration
[4]: /integrations/cassandra/
[5]: /integrations/java/
[6]: /integrations/presto/
[7]: /integrations/solr/
[8]: /integrations/tomcat/
[9]: /integrations/kafka/
[10]: /integrations/win32_event_log/
