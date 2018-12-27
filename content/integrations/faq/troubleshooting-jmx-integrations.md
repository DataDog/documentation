---
title: Troubleshooting JMX Integrations
kind: faq
disable_toc: true
---

To verify you have access to JMX, test using JConsole or equivalent if possible. If you're unable to connect using JConsole [this article][1] may help to get you sorted. Also, if the metrics listed in your YAML aren't 1:1 with those listed in JConsole you'll need to correct this.

<div class="alert alert-warning">
For all versions of <strong>Agent v6</strong>, the <code>jmxterm</code> JAR is not shipped with the agent. To download and use <code>jmxterm</code>, see the <a href="https://github.com/jiaqi/jmxterm">upstream project</a>.
</div>

If you're able to connect using JConsole, run the following:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

If you're able to connect using the command above, run: `beans` and send to the [Datadog support team][2] a copy of the results from above along with the following information:


{{< tabs >}}
{{% tab "Agent v6" %}}

* Content of `/var/log/datadog/agent.log`
* Output of the [info command][1]
* Output of: `ps aux | grep jmxfetch`
* A copy of the YAML integration (send the file)


[1]: /agent/faq/agent-status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

* [Agent logs][1]
* Output of the [info command][2]
* Output of: `ps aux | grep jmxfetch`
* Content of `/var/log/datadog/jmxfetch.log`
* Output of: `sudo /etc/init.d/datadog-agent jmx list_everything`
* A copy of the YAML integration (send the file)

**Note**: if you're able to see some metrics (`jvm.heap_memory`, `jvm.non_heap_memory`, etc.) it is a sign that JMXFetch is properly running. If you're targeting another application and not seeing related metrics, the likely issue is a misconfiguration in your YAML.


[1]: /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
[2]: /agent/faq/agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Agent troubleshooting

{{< tabs >}}
{{% tab "Agent >= v6.2" %}}

These commands are available since v6.2.0:

| Command                                                | Description                                                                                                                                                             |
| :----------------------------------------              | :---                                                                                                                                                                    |
| `sudo -u dd-agent datadog-agent jmx list matching`     | List attributes that match at least one of your instances configuration.                                                                                                |
| `sudo -u dd-agent datadog-agent jmx list limited`      | List attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics that can be collected. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | List attributes that are actually collected by your current instances configuration.                                                                                    |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | List attributes that don't match any of your instances configuration.                                                                                                   |
| `sudo -u dd-agent datadog-agent jmx list everything`   | List every attributes available that has a type supported by JMXFetch.                                                                                                  |
| `sudo -u dd-agent datadog-agent jmx collect`           | Start the collection of metrics based on your current configuration and display them in the console.                                                                    |

By default theses commands run on all the configured jmx checks. If you want to use them for specific checks, specify them using the `--checks` flag :

`sudo datadog-agent jmx list collected --checks tomcat`

{{% /tab %}}
{{% tab "Agent v6.0 and v6.1" %}}

The Agent 6 ships JMXFetch and supports all of its features, except those listed below.

The Agent doesn't have a full featured interface to JMXFetch, so you may have to run some commands manually to debug the list of beans collected, JVMs, etc. A typical manual call will take the following form:

```shell
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check <CHECK_LIST> --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console <COMMAND>
```

where `<COMMAND>` is any of:

- `list_everything`
- `list_collected_attributes`
- `list_matching_attributes`
- `list_not_matching_attributes`
- `list_limited_attributes`
- `list_jvms`

and `<CHECK_LIST>` corresponds to a list of valid `yaml` configurations in
`/etc/datadog-agent/conf.d/`. For instance:

- `cassandra.d/conf.yaml`
- `kafka.d/conf.yaml`
- `jmx.d/conf.yaml`

Example:

```
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check cassandra.d/conf.yaml jmx.d/conf.yaml --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console list_everything
```

Note: the location to the JRE tools.jar (`/usr/lib/jvm/java-8-oracle/lib/tools.jar` in the example) might reside elsewhere in your system. You should be able to easily find it with `sudo find / -type f -name 'tools.jar'`.

**Note**: you may wish to specify alternative JVM heap parameters `-Xmx`, `-Xms`, the values used in the example correspond to the JMXFetch defaults.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Command                                                           | Description                                                                                                                                                             |
| :----------------------------------------                         | :---                                                                                                                                                                    |
| `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`     | List attributes that match at least one of your instance configurations.                                                                                                |
| `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`      | List attributes that do match one of your instance configurations but that are not being collected because it would exceed the number of metrics that can be collected. |
| `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`    | List attributes that are actually collected by your current instance configurations.                                                                                    |
| `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes` | List attributes that don't match any of your instance configurations.                                                                                                   |
| `sudo /etc/init.d/datadog-agent jmx list_everything`              | List every attributes available that has a type supported by JMXFetch.                                                                                                  |
| `sudo /etc/init.d/datadog-agent jmx collect`                      | Start the collection of metrics based on your current configuration and display them in the console.                                                                    |

{{% /tab %}}
{{< /tabs >}}

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /help
