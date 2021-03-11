---
title: Datadog Windows Agent User
kind: faq
---

Starting with release `6.11.0`, the Core and APM/Trace components of the Windows Agent run under the `ddagentuser` account, created at install time, instead of running under the `LOCAL_SYSTEM` account, as was the case on prior versions. If enabled, the Live Process component still runs under the `LOCAL_SYSTEM` account.

The user `ddagentuser` is created at install time for the Datadog Windows Agent. When installed on an Active Directory server, the username and password must be provided to the installer. The new user is a non-privileged user. It gains the following rights during installation:

* It can start and stop the APM and Process Agent
* It becomes a member of the “Performance Monitor Users” group
  * Necessary to access WMI information
  * Necessary to access Windows performance counter data
* It becomes a member of the “Event Log Readers” group
* It has local login disabled
* It has remote login disabled
* It has network login disabled

## Installation

### Installation with group policy

The installer changes the local group policy to allow the newly created user account, `ddagentuser`, to **run as a service**.  If the domain group policy disallows that, then the installation setting is overridden, and the domain group policy has to be updated to allow the user to run as a service.

### Installation in a domain environment

The Agent installer creates the `ddagentuser` at install time, and then registers the service (with the randomly generated password). The user is created as a local user, even in a domain environment, so that every machine on which the Agent is installed has a unique user and password.

The exception is on domain controllers (primary and backup). There is no notion of a local user on a domain controller. Therefore, the created user becomes a domain user rather than a local one.

To support this environment, the Agent installer requires that the administrator provides a username and password under which the Agent run. The username and password are provided as properties on the installation command line, i.e.

```shell
Msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

For installs on a domain controller, the `<USERNAME>` and `<PASSWORD>` supplied should **never** be an existing "real" (human) user. The installation process changes the rights of the user and they are denied login access. The installer currently does not support passwords containing `;`.

Additionally, the installer adds the user to the following groups:

* Performance Monitoring
* Event Log Viewer

**Note**: These options are honored even in a non-domain environment, if the user wishes to supply a username/password to use rather than have the installer generate one.

**Note**: The `<USERNAME>` must be 20 characters or less in order to comply with Microsoft's [Active Directory Schema (AD Schema) SAM-Account-Name attribute][1].

**Note**: When upgrading the Datadog Agent on a domain controller or host where the user has supplied a username for the Agent, you need to supply the `<DDAGENTUSER_NAME>` but not the `<DDAGENTUSER_PASSWORD>`:

**Note**: If encountering permission issues with system and winproc checks upon installing, make sure the `ddagentuser` is a member of the Performance Monitoring and Event Log Viewer groups.

```shell
Msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME>
```

### Installation with Chef

If you use Chef and the official `datadog` cookbook to deploy the Agent on Windows hosts, **use version 2.18.0 or above** of the cookbook to ensure that the Agent’s configuration files have the correct permissions

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
