---
title: Tracing ECS Applications
kind: Documentation
further_reading:
    - link: "/agent/amazon_ecs/logs/"
      tag: "Documentation"
      text: "Collect your application logs"
    - link: "/agent/amazon_ecs/tags/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
---

## Setup

After following the [Amazon ECS agent installation instructions][1], enable trace collection per the instructions below.

1. Set the following parameters in the task definition for the `gcr.io/datadoghq/agent` container. Set the `portMappings` host / container port to `8126` with protocol `tcp`:

    {{< code-block lang="json" >}}
    containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "gcr.io/datadoghq/agent:latest",
      "cpu": 10,
      "memory": 256,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 8126,
          "protocol": "tcp",
          "containerPort": 8126
        }
      ],
      ...
    {{< /code-block >}}

    For **Agent v7.17 or lower**, add the following environment variables:

    {{< code-block lang="json" >}}
    ...
          "environment": [
            ...
          {
            "name": "DD_APM_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_APM_NON_LOCAL_TRAFFIC",
            "value": "true"
          },
          ...
          ]
    ...
    {{< /code-block >}}

    [See all environment variables available for Agent trace collection][1].

2. Assign the private IP address for each underlying instance your containers are running in your application container to the `DD_AGENT_HOST` environment variable. This allows your application traces to be shipped to the Agent. The [Amazon’s EC2 metadata endpoint][2] allows discovery of the private IP address. To get the private IP address for each host, curl the following URL:

    {{< code-block lang="curl" >}}
    curl http://169.254.169.254/latest/meta-data/local-ipv4
    {{< /code-block >}}

    Set the result as your Trace Agent hostname environment variable for each application container shipping to APM:

    {{< code-block lang="curl" >}}
    os.environ['DD_AGENT_HOST'] = <EC2_PRIVATE_IP>
    {{< /code-block >}}

## Launch time variables

In cases where variables on your ECS application are set at launch time, you **must** set the hostname as an environment variable with `DD_AGENT_HOST`. Otherwise, you can set the hostname in your application's source code for Python, Javascript, or Ruby. For Java and .NET, you can set the hostname in the ECS task. For example:

{{< tabs >}}
{{% tab "Python" %}}

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

For more examples of setting the Agent hostname in other languages, refer to the [change agent hostname documentation][1].


[1]: https://docs.datadoghq.com/tracing/setup/python/#change-agent-hostname
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace').init();
const request = require('request');
request('http://169.254.169.254/latest/meta-data/local-ipv4', function(
    error,
    resp,
    body
) {
    tracer.setUrl(`http://${hostname}:8126`)
});
```

For more examples of setting the Agent hostname in other languages, refer to the [change agent hostname documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/nodejs/#change-agent-hostname
{{% /tab %}}

{{% tab "Ruby" %}}

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{% /tab %}}

{{% tab "Go" %}}

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
        bodyBytes, err := ioutil.ReadAll(resp.Body)
        host := string(bodyBytes)
  if err == nil {
        //set the output of the curl command to the DD_Agent_host env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
```

{{% /tab %}}

{{% tab "Java" %}}

Copy this script into the `entryPoint` field of your ECS task definition, updating the values with your application jar and argument flags.

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <APPLICATION_ARG_FLAGS> -jar <APPLICATION_JAR_FILE/WAR_FILE>"
]
```

For more examples of setting the Agent hostname in other languages, refer to the [change agent hostname documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/java/#change-agent-hostname
{{% /tab %}}

{{% tab ".NET" %}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/apm/#docker-apm-agent-environment-variables
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
