---
title: I Have a Matching Bean for my JMX integration but nothing on Collect !

---

Trouble setting up your JMX integration ? Here are a few great articles to get you started :

* [Troubleshooting JMX integration][1]
* [View jmx data in jConsole and set up your jmx.yaml to collect them][2]
* [jmx.yaml error: Include Section][3]
* [Collecting Composite type JMX attributes][4]
* [Running JMX commands in Windows][5]

If everything is set up properly as described in the above articles, *and* your metric appears in the [Agent log file][6] (but *not* in the [status command][1]), then there is probably an issue with the `metric_type` that you're using.

Here is the output of the  `list_matching_attributes.log` file :

```text
Matching: 0/350. Bean name: Hadoop:service=HBase,name=Master,sub=Server - Attribute name: tag.isActiveMaster  - Attribute type: java.lang.String
```

## How can I solve this?

Go to your [Agent Log file][6] and search for errors similar to the following:

```text
2016-12-05 03:08:33,261 | WARN | JMXAttribute | Unable to get metrics from Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster
java.lang.NumberFormatException: For input string: "false"
 [...]
```

This means that your `Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster` is returning string values.

Check your `jmx.yaml` file, the following excerpt should show something similar:

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: java.lang.String
```

The `java.lang.String` metric_type confirms the issue you were seeing in the logs.

To resolve this issue, change the associated metric_type, and ensure that your `jmx.yaml` file has the following configuration (note the changes in the last four lines):

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: gauge
              values:
                true: 1
                false: 0
              # Note: If using Agent 6, boolean keys must be in quotes values: {"true": 1, "false": 0, default: 0}
```

Jmxfetch then knows it's a string and uses this rule to transform that into a numeric metric.

Reach out to [Datadog Support team][7] if you are still having issues.

[1]: /integrations/faq/troubleshooting-jmx-integrations/
[2]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[3]: /integrations/faq/jmx-yaml-error-include-section/
[4]: /integrations/guide/collecting-composite-type-jmx-attributes/
[5]: /integrations/guide/running-jmx-commands-in-windows/
[6]: /agent/guide/agent-log-files/
[7]: /help/
