---
title: Processing Configuration
description: Learn how to configure your processing pipelines in CloudPrem
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "CloudPrem Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
---

## Overview

CloudPrem includes a processing feature that allows you to parse and enrich logs. It automatically parses logs formatted in JSON. You can define pipelines and processors to extract meaningful information or attributes from semi-structured text, which can then be used for aggregations. This processing is designed to be equivalent to [Datadog SaaS Pipelines](https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source). Supported and unsupported processors are documented in the last section.

You configure log processing pipelines using a JSON file that adheres to the same format as Datadog SaaS pipeline configurations.

## Setting up processing

1. Retrieve from SaaS (Optional): If you have existing pipelines in Datadog SaaS, you can fetch their configuration using the API:

```bash
curl -X GET "https://api.datadoghq.com/api/v1/logs/config/pipelines" \
 -H "Accept: application/json" \
 -H "DD-API-KEY: ${DD_API_KEY}" \
 -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > my-pipelines_config.json
```

This JSON file can be used directly with CloudPrem.

2. Set in Helm Chart: Provide the path to your JSON configuration file using the pipelinesConfig parameter in the CloudPrem Helm chart.

```bash
helm repo update
helm upgrade <release-name> -n <namespace> --set-file pipelinesConfig=./pipelines_config.json -f <custom_values_file.yaml>
```

CloudPrem will log an informational message (`Successfully read pipeline config file`) upon successfully reading the file. Any processors listed in the configuration that are not supported by CloudPrem will be ignored during startup.
**Helm limitation**: Be aware that Helm imposes a 1 MB size limit on the configuration file due to its underlying etcd storage.  

## Configuration file format

The configuration is a JSON array, where each element represents a processor or a nested pipeline.  
The order of elements in the array defines the sequential execution order of the processors.  The structure mirrors the output of the Datadog API endpoint `api/v1/logs/config/pipelines`.


```json
[
 {...processor1},
 {...processor2}
]
```

```json
[
    {
            "type": "pipeline",
            "id": "U73LOMZ9QG2iM-04OcXypA",
            "name": "cluster agent logs parsing",
            "enabled": true,
            "filter": {
                "query": "service:cluster-agent"
            },
            "processors": [
                {
                    "type": "grok-parser",
                    "id": "xn2WAzysQ1asaasdfakjf",
                    "enabled": true,
                    "grok": {
                        "supportRules": "",
                        "matchRules": "agent_rule %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\) \\|( %{data::keyvalue(\":\")} \\|)?( - \\|)?( \\(%{notSpace:pyFilename}:%{number:pyLineno}\\) \\|)?%{data}\nagent_rule_pre_611 %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\)%{data}\njmxfetch_rule     %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level}\\s+\\| %{word:class} \\| %{data}"
                    }
                },
                {
                    "id": "xnsd5oanXq2893utcsQ",
                    "type": "status-remapper",
                    "enabled": true,
                    "sources": ["level"]
                },
                {
                    "type": "date-remapper",
                    "id": "xn2WAzysQ1asdjJsb9dfb",
                    "enabled": true,
                    "sources": ["timestamp"]
                }
            ]
    }
]
```

## Compatibility with Datadog SaaS Pipelines

CloudPrem processing aims for parity with Datadog SaaS, allowing direct use of existing SaaS pipeline configurations by ignoring unknown or faulty processors. However, some differences currently exist:
Some filter queries can’t be parsed: e.g. combining wildcards `@data.message:+*`
Filter on `message` has a different matching behaviour (also affects e.g. category processor)
The current implementation is using a regex to grep the word, but it should tokenize the text and try to match the tokens. Phrases are also ignored currently.
Some grok syntax differs in behaviour: Groks are using regular expressions internally. The regex engines may have slightly different matching behavior.
Some grok patterns can’t be parsed (e.g. `%{?>notSpace:db.severity}`)

Ignored processors will appear as a warning in the indexer logs.

### Supported Processors:
- attribute-remapper (overrideOnConflict is unsupported)
- category-processor
- date-remapper
- grok-parser (currently 80% compatibility)
- message-remapper
- pipeline
- service-remapper
- status-remapper
- string-builder-processor
- trace-id-remapper

### Unsupported Processors:
- arithmetic-processor
- geo-ip-parser
- lookup-processor
- url-parser
- user-agent-parser

## Further reading

{{< partial name="whats-next/whats-next.html" >}} 