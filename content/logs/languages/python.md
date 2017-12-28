---
title: Python log collection
kind: documentation
further_reading:
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: "FAQ"
  text: Log Collection Troubleshooting Guide
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview
We use the two following loggers for JSON formatting: 

- https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
- https://github.com/madzak/python-json-logger 


- As we did for Java, add a section Configure the Datadog-Agent with the following `python.d/conf.yaml` file:

```
init_config:

instances:
    [{}]

#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/python/log.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}