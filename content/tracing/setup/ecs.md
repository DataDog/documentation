---
title: Tracing ECS Applications
kind: Documentation
aliases:
- /tracing/ecs/
further_reading:
- link: "integrations/amazon_ecs/"
  tag: "Documentation"
  text: "AWS ECS setup"
- link: "https://github.com/DataDog/datadog-trace-agent"
  tag: "Github"
  text: "Trace Agent source code"
---

## Setup

### Installation

Follow the [AWS ECS / EC2 installation instructions][1] to install the Datadog Agent.

To enable the [datadog-trace-agent][2], set the following in the task definition for the `datadog/agent` container:

- Port mapping: Host / Container port `8126`, Protocol `tcp`
- Env Variables: `DD_APM_ENABLED=true`, `DD_APM_NON_LOCAL_TRAFFIC=true` (enable trace collection from other containers)

### Application container

[Amazon’s EC2 metadata endpoint][3] allows discovery of the private IP address for each underlying instance your containers are running on. Setting this IP address as your Trace Agent Hostname in your application container allows traces to be shipped to the Agent.

To get the private IP address for each host, curl the following URL, and set the result as your Trace Agent Hostname environment variable for each application container shipping to APM:

```
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

Alternatively, you can set the hostname in your application's source code. For example:

{{< tabs >}}
{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace')
const request = require('request')

request('http://169.254.169.254/latest/meta-data/local-ipv4', function (error, resp, body)  {
  tracer.init({hostname: body})
})
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_ecs/#installation
[2]: https://github.com/DataDog/datadog-trace-agent
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
