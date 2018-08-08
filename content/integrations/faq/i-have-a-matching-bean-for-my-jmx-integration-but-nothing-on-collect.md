---
title: I Have a Matching Bean for my JMX integration but nothing on Collect !
kind: faq
---

Trouble setting up your JMX integration ? Here are a few great articles to get you started :

* [View jmx data in jConsole and set up your jmx.yaml to collect them][1]
* [jmx.yaml error: Include Section][2]
* [Collecting Composite type JMX attributes][3]
* [How to run JMX commands in Windows?][4]

Now, if everything is set up properly as described in the above articles, and your metric appears in the list_matching_attributes.log but not in the output of  sudo /etc/init.d/datadog-agent jmx collect command, there is probably an issue with the metric_type your using.

Here is the output of the  `list_matching_attributes.log` file :
```
Matching: 0/350. Bean name: Hadoop:service=HBase,name=Master,sub=Server - Attribute name: tag.isActiveMaster  - Attribute type: java.lang.String
```

## How can I solve this?

Go to you jmxfetch.log file and search for errors similar to these ones :

```
2016-12-05 03:08:33,261 | WARN | JMXAttribute | Unable to get metrics from Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster
java.lang.NumberFormatException: For input string: "false"
 [...]
```

This means that your  Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster is returning string values.

Check your `jmx.yaml` file, the following excerpt should show something similar:
{{< img src="integrations/faq/jmx_conf.png" alt="jmx_conf" responsive="true" >}}

The java.lang.String metric_type confirms the issue you were seeing in the logs.

To resolve this issue, use [this gist][5] that we created to update your file accordingly.

That means you'll probably need to change the associated metric_type , and have your jmx.yaml look like this :
{{< img src="integrations/faq/jmx_metric_type.png" alt="jmx_metric_type" responsive="true" >}}

Jmxfetch will know it's a string and will use this rule to transform that into a numeric metric.

Still having issue ? Send over a description of your problem to support@datadoghq.com along with a copy of your logs and config through a flare.

[1]: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them
[2]: /integrations/faq/jmx-yaml-error-include-section
[3]: /integrations/faq/collecting-composite-type-jmx-attributes
[4]: /integrations/faq/how-to-run-jmx-commands-in-windows
[5]: https://github.com/DataDog/jmxfetch/blob/master/src/test/resources/jmx.yaml#L32-L37
