---
title: ddagentuser with the Windows Agent 
kind: faq
disable_toc: true
---

**Starting with release `6.11`, the Windows Agent main components (i.e. Core, APM/Trace, and Process) run under the `ddagentuser` account, created at install time, instead of running on prior version under the `LOCAL_SYSTEM` account.**

The user `ddagentuser` is created at install time for the Datadog Windows Agent. When installed on an Active Directory server, the username and password must be provided to the installer. The new user is a non-privileged user. It gains the following rights during installation:

* It can start and stop the APM and Process Agent
* It becomes a member of the “Performance Monitor Users” group
* Necessary to access WMI information
* Necessary to access Windows performance counter data
* It has local login disabled
* It has remote login disabled
* It has network login disabled


## Installation with Group Policy

The installer changes the local group policy to allow the newly created user account, `ddagentuser`, to **run as a service**.  If the domain group policy disallows that, then the installation setting is overridden, and the domain group policy will have to be updated to allow the user to run as a service.

## Installing in a Domain environment

The agent installer creates the `ddagentuser` at install time, and then registers the service (with the randomly generated password). The user is created as a local user, even in a domain environment, so that every machine on which the agent is installed has a unique user and password.

The exception is on domain controllers (primary and backup). There is no notion of a local user on a domain controller. Therefore, the created user becomes a domain user rather than a local one.

To support this environment, the agent installer requires that the administrator provides a username and password under which the agent will run. The username and password are provided as properties on the installation command line, i.e.

```
	Msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNMAE> DDAGENTUSER_PASSWORD=<PASSWORD>
```

**Note**: These options are honored even in a non-domain environment, if the user wishes to supply a username/password to use rather than have the installer generate one.

##Permissions

Every effort has been made to ensure that the transition from `LOCAL_SYSTEM` to `ddagentuser` is seamless. However, there is a class of problems that  requires specific, configuration-specific modification upon installation of the Agent. These problems arise where the Windows agent previously relied on administrator rights that the new Agent lacks by default.

For example, if the directory check is monitoring a directory that has specific access rights, e.g. allowing only members of the Administrators group read access, then the existing agent currently can monitor that directory successfully since `LOCAL_SYSTEM` has administrator rights. Upon upgrading, the administrator must add `ddagentuser` to the access control list for that directory in order for the directory check to function.
