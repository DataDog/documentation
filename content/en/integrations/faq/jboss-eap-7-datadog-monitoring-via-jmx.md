---
title: JBoss EAP 7 & Datadog monitoring via JMX
kind: faq
---

## Overview

These are the instructions created to install and configure Datadog on the KP JBoss EAP 7 cloud image and monitor a JVM via JMX.

## Setup

### Prerequisites

To install Datadog and integrate it with the JBoss EAP 7, ensure the following conditions have been met:

* KP’s JBoss EAP 7/RHEL7.5 bundle image (C2C or BTO) has been installed.
* JBoss EAP 7 has been configured and is functioning.
* NTPD has been installed and configured, and is running on each of the systems to be used.

### Datadog Agent installation

[Follow the Agent installations for CentOS/RedHat][1]

### JBoss EAP 7 edits

Add the following lines to the `domain.xml` file:

Be sure to add these lines within the profile being used:

For `<subsystem xmlns="urn:jboss:domain:jmx:1.3">`, add:

```text
<remoting-connector use-management-endpoint="false"/>
```

For `<subsystem xmlns="urn:jboss:domain:remoting:4.0">`, add:

```text
<connector name="remoting-connector" socket-binding="remoting" securityrealm="ApplicationRealm"/>
```

For `<socket-binding-group name="full-ha-sockets" default-interface="public">`, add:

```text
<socket-binding name="remoting" port="4447"/>
```

Add an application user for the Application Realm:

```text
JBoss_EAP_INSTALL_DIR/bin/add_user.sh
```

**Note**: Be sure to add to the Application Realm.

Start/Restart the jboss processes. Look for the following message in the `server.log` file:

```text
2018-08-08 16:01:53,354 INFO [org.jboss.as.remoting] (MSC service thread 1-4) WFLYRMT0001: Listening on
xx.xx.xx.xx:4447
```

Assuming a domain configuration, be sure the
`JBoss_EAP_INSTALL_DIR/domain/configuration/application.keystore` has read access by the Datadog ID (perms of 644 or higher)

###Datadog Edits

Edit the `/etc/datadog-agent/datadog.yaml` file to enable process collection:

```yaml
process_config:
  enabled: "true"
```

Edit `/etc/datadog-agent/conf.d/jmx.d/conf.yaml` file to activate the jmx integration:

```yaml
init_config:

  custom_jar_paths:
    - JBoss_EAP_INSTALL_LOCATION/bin/client/jboss-cli-client.jar

instances:
  - jmx_url: "service:jmx:remote://{FQDN or IP}:4447"
    user: xxxxxxxx (userid created via jboss add_user.sh)
    password: yyyyyyyy (created via jboss add_user.sh)
    java_bin_path: /etc/alternatives/java
    name: jboss_jmx_instance
    trust_store_path: /apps/jboss/jboss-eap-7.1/domain/configuration/application.keystore
    trust_store_password: password (use password found in domain.xml)
    conf:
      - include:
        domain: my_domain
        bean:
```

Then [`Start/restart` the Datadog Agent][2].

Finally, run the [Datadog Agent status command][3] to ensure Datadog can connect to the JBoss JVM via JMX. You should get the following output:

```text
========
JMXFetch
========
 Initialized checks
08/10/2018 4
 ==================
 jmx
 instance_name : jboss_jmx_instance
 message :
 metric_count : 13
 service_check_count : 0
 status : OK
 Failed checks
 =============
 no checks
```

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: /agent/guide/agent-commands/#agent-status-and-information
