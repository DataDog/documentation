---
title: Log Locations
kind: faq
customnav: agentnav
---

## Mac OS X

Logs for the subsystems are in the following files:

* /var/log/supervisor/datadog-supervisord.log (since 3.8.0) /var/log/datadog/collector.log
* /var/log/datadog/dogstatsd.log
* /var/log/datadog/forwarder.log

## Debian/Ubuntu

Logs for the subsystems are in the following files:

* /var/log/datadog/supervisord.log (since 3.8.0)
* /var/log/datadog/collector.log
* /var/log/datadog/dogstatsd.log
* /var/log/datadog/forwarder.log

## RHEL/CentOS/Fedora/Amazon Linux

Logs for the subsystems are in the following files:

* /var/log/supervisor/datadog-supervisord.log (since 3.8.0)
* /var/log/datadog/collector.log
* /var/log/datadog/dogstatsd.log
* /var/log/datadog/forwarder.log

## SmartOS

Logs for the subsystems are in the following files:

* /opt/local/datadog/logs/supervisord/collector.log
* /opt/local/datadog/logs/supervisord/dogstatsd.log
* /opt/local/datadog/logs/supervisord/forwarder.log

## Source

Logs for the subsystems are in the following files:

* ~/.datadog-agent/supervisord/logs/supervisord.log
* ~/.datadog-agent/supervisord/logs/collector.log
* ~/.datadog-agent/supervisord/logs/dogstatsd.log
* ~/.datadog-agent/supervisord/logs/forwarder.log

## Windows

### For version >= 3.9.1

For Windows Server 2003, XP or older: 

* c:\Documents and Settings\All Users\Application Data\Datadog\logs\collector.log
* c:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log
* c:\Documents and Settings\All Users\Application Data\Datadog\logs\dogstatsd.log
* c:\Documents and Settings\All Users\Application Data\Datadog\logs\forwarder.log

For Windows Server 2008, Vista and newer:

* C:\ProgramData\Datadog\logs\collector.log
* C:\ProgramData\Datadog\logs\ddagent.log
* C:\ProgramData\Datadog\logs\dogstatsd.log
* C:\ProgramData\Datadog\logs\forwarder.log 

### For version < 3.9.1

Logs for the subsystems are available in the Windows Event Viewer, under Windows Logs → Application.