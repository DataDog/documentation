---
title: Troubleshooting JMX Integrations
kind: faq
disable_toc: true
further_reading:
- link: "https://docs.datadoghq.com/integrations/java/"
  tag: "Documentation"
  text: "Java integration"
---

To verify you have access to JMX, test using JConsole or equivalent if possible. If you're unable to connect using JConsole [this article][1] may help to get you sorted. Also, if the metrics listed in your YAML aren't 1:1 with those listed in JConsole you'll need to correct this.

<div class="alert alert-warning">
For all versions of <strong>Agent v6</strong>, the <code>jmxterm</code> JAR is not shipped with the agent. To download and use <code>jmxterm</code>, see the <a href="https://github.com/jiaqi/jmxterm">upstream project</a>.
</div>

If you're able to connect using JConsole, run the following:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

If you're able to connect using the command above, run: `beans` and send to the [Datadog support team][2] a copy of the results from above along with the following information:


{{< tabs >}}
{{% tab "Agent v6" %}}

* Content of `/var/log/datadog/agent.log`
* Output of the [info command][1]
* Output of: `ps aux | grep jmxfetch`
* A copy of the YAML integration (send the file)


[1]: /agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

* [Agent logs][1]
* Output of the [info command][2]
* Output of: `ps aux | grep jmxfetch`
* Content of `/var/log/datadog/jmxfetch.log`
* Output of: `sudo /etc/init.d/datadog-agent jmx list_everything`
* A copy of the YAML integration.

**Note**: if you're able to see some metrics (`jvm.heap_memory`, `jvm.non_heap_memory`, etc.) it is a sign that JMXFetch is properly running. If you're targeting another application and not seeing related metrics, the likely issue is a misconfiguration in your YAML.


[1]: /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
[2]: /agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Agent troubleshooting



## FAQs

### The 350 metric limit

Due to the nature of these integrations, it is possible to submit an extremely high number of metrics directly to Datadog, note that Datadog sets the limit at maximum 350 metrics.
It is recommended to create filters to refine what metrics are collected but if you believe you need more than 350 metrics, contact [Datadog support][3].

### Java Path

The Agent does not come with a bundled JVM, but uses the one installed on your system. Therefore you must make sure that the Java home directory is present in the path of the user running the Agent.

Alternatively, you can specify the JVM path in the integration's configuration file with the `java_bin_path` parameter.


### Monitoring JBoss/WildFly applications

The following instructions work on Agent v5.6.0+.

JBoss/WildFly applications expose JMX over a specific protocol (Remoting JMX) that is not bundled by default with JMXFetch. To allow JMXFetch to connect to these applications, configure it as follows:

* Locate the `jboss-cli-client.jar` file on your JBoss/WildFly server (by default, its path should be `$JBOSS_HOME/bin/client/jboss-cli-client.jar`).
* If JMXFetch is running on a different host than the JBoss/WildFly application, copy `jboss-cli-client.jar` to a location on the host JMXFetch is running on.
* Add the path of the jar to the `init_config` section of your configuration:

```yaml
  # Datadog Agent >= 5.6.0

  init_config:
    custom_jar_paths:
      - /path/to/jboss-cli-client.jar
```

* Specify a custom URL that JMXFetch connects to, in the `instances` section of your configuration:

  ```yaml
  # Datadog Agent >= 5.6.0

  # The jmx_url may be different depending on the version of JBoss/WildFly you're using
  # and the way you've set up JMX on your server
  # Refer to the relevant documentation of JBoss/WildFly for more information
  instances:
    - jmx_url: "service:jmx:remote://localhost:4447"
      name: jboss-application  # Mandatory, but can be set to any value,
                               # is used to tag the metrics pulled from that instance
  ```

* [Restart the Agent][4].

### Monitoring Tomcat with JMX Remote Lifecycle Listener enabled

The following instructions work on Agent v5.6.0+.

If you're using Tomcat with JMX Remote Lifecycle Listener enabled (see the [Tomcat documentation][5] for more information), JMXFetch needs additional setup to be able to connect to your Tomcat application.

* Locate the `catalina-jmx-remote.jar` file on your Tomcat server (by default, its path should be `$CATALINA_HOME/lib`).
* If JMXFetch is running on a different host than the Tomcat application, copy `catalina-jmx-remote.jar` to a location on the host JMXFetch is running on.
* Add the path of the jar to the `init_config` section of your configuration:

```yaml
# Datadog Agent >= 5.6.0

init_config:
  custom_jar_paths:
    - /path/to/catalina-jmx-remote.jar
```

* Specify a custom URL that JMXFetch connects to, in the `instances` section of your configuration:

```yaml
# Datadog Agent >= 5.6.0

# The jmx_url may be different depending on the way you've set up JMX on your Tomcat server
instances:
  - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
    name: tomcat-application  # Mandatory, but can be set to any arbitrary value,
                              # is used to tag the metrics pulled from that instance
```

* [Restart the Agent][4].

### SSL troubleshooting

Once JMX is enabled and your Agent check is successfully sending metrics to Datadog, you can secure the remote connection over an SSL Socket.

**Note**: You cannot secure JMX over SSL without using the JMX remote user/password authentication files. If you are using system level permissions to run your application, add these files and run them at startup.

This example shows the Datadog configuration for the [Tomcat integration][6].

* Establish a certificate and key to apply to your [Java app keystore][7].
* Update your Datadog Tomcat `conf.yaml` file located in `conf.d/tomcat.d`:

```yaml
instances:
  - host: localhost
    port: 9000
    user: tomcat
    password: tomcat
    name: tomcat_webapp
    trust_store_path: <KEYSTORE_PATH>
    trust_store_password: <KEY_PASSWORD>
```

* [Restart the Agent][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /help
[3]: /help
[4]: /agent/guide/agent-commands/#restart-the-agent
[5]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
[6]: https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#SSL_and_Tomcat
[7]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
