---
title: Is it possible to have the agent parse several log files and use wildcards for that?
kind: faq
customnav: agentnav
---

Yes, you can have the datadog-agent parse several log files by using the following syntax in the datadog.conf configuration file of the agent:

```
dogstreams: /path/to/log1:/path/to/parsers_module.py:parser_function_name, /path/to/log2:/path/to/other_parsers_module.py:its_parser_function_name
```

Yes, [logfile paths may include wildcard](https://github.com/DataDog/dd-agent/blob/506beb39e43e71dd507635104e96f6c7357917b7/checks/datadog.py#L94) `*` and `?`, so you can have the datadog-agent parse all log files of a given directory for instance:

```
dogstreams: /path/to/logfolder/*.log:/path/to/parsers_module.py:parser_function_name
```

For further questions about setting up log parsing with the agent, you can refer to:

* [Our official documentation](/agent/logs)
* [This step by step very detailed guide](/agent/faq/how-to-collect-metrics-or-events-with-a-custom-log-parser)
 