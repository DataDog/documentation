---
title: Tracing ECS Applications
kind: Documentation
aliases:
  - /agent/amazon_ecs/apm
further_reading:
    - link: "/agent/amazon_ecs/logs/"
      tag: "Documentation"
      text: "Collect your application logs"
    - link: "/agent/amazon_ecs/tags/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
---

## Overview

To collect traces from your ECS containers, update your Agent's and your application container's Task Definitions with the instructions below.

This can be done by modifying the previously used [Task Definition file][4] and [registering your updated Task Definition][5]. Alternatively you can edit the Task Definition directly from the Amazon Web UI.

Once enabled, the Datadog Agent container collects the traces emitted from the other application containers on the same host as itself.

## Configure the Datadog Agent to accept traces
To collect all logs from your running ECS containers, update your Agent's Task Definition from the [original ECS Setup][6] with the configuration below.

Use [datadog-agent-ecs-apm.json][3] as a reference point for the required base configuration. In the Task Definition for Datadog Agent container, set the `portMappings` for a host to container port on `8126` with the protocol `tcp`.

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "cpu": 100,
      "memory": 256,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 8126,
          "protocol": "tcp",
          "containerPort": 8126
        }
      ],
      (...)
    }
  ]
}
```

For **Agent v7.17 or lower**, add the following environment variables:
```json
"environment": [
  (...)
  {
    "name": "DD_APM_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_NON_LOCAL_TRAFFIC",
    "value": "true"
  }
]
```

If you have a local file for your Agent's Task Definition you can repeat the steps to [register your updated Task Definition][5]. This creates a new revision for you. You can then reference this updated revision in the Daemon Service for the Datadog Agent.

## Configure your application container to submit traces to Datadog Agent

First consult the [setup instructions for installing the Datadog Tracer][2] per language. For ECS install the Datadog Tracer into your application's container image.

After this, provide the Tracer with the private IP address of the underlying EC2 instance that the application container is running on. This address is the hostname of the Tracer endpoint. The Datadog Agent container on the same host (with the host port enabled) receives these traces.

### Get the private IP address

{{< tabs >}}
{{% tab "EC2 metadata endpoint" %}}

The [Amazon’s EC2 metadata endpoint (IMDSv1)][1] allows discovery of the private IP address. To get the private IP address for each host, curl the following URL:

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}

If you are using Version 2 of the [Instance Metadata Service (IMDSv2)][2]:

{{< code-block lang="curl" >}}
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
{{% /tab %}}
{{% tab "ECS container metadata file" %}}

The [Amazon's ECS container metadata file][1] allows discovery of the private IP address. To get the private IP address for each host, run the following command:

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq -r .HostPrivateIPv4Address
{{< /code-block >}}
    
[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

Provide the result of this request to the Tracer through the environment variable `DD_AGENT_HOST` for each application container sending APM traces.

### Configure the trace agent endpoint

In cases where variables on your ECS application are set at launch time (Java, .NET, and PHP), you **must** set the hostname of the tracer endpoint as an environment variable with `DD_AGENT_HOST` using one of the above methods. The examples below use the IMDSv1 metadata endpoint, but the configuration can be interchanged if needed. If you have a startup script as your entrypoint this can be included in there, otherwise this can be added to the ECS Task Definition's `entryPoint`.

For the other languages (Python, Javascript, Ruby, and Go) you can alternatively set the hostname in your application's source code.

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substitute with your `<Python Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Python Startup Command>"
]
```
For Python the startup command is generally `ddtrace-run python my_app.py` but may vary depending on the framework used.

#### Code
```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

For more examples of setting the Agent hostname in other languages, see the [change Agent hostname][1] documentation.


[1]: https://docs.datadoghq.com/tracing/setup/python/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substitute with your `<NodeJS Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <NodeJS Startup Command>"
]
```

#### Code
```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

For more examples of setting the Agent hostname in other languages, see the [change Agent hostname documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/nodejs/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substitute with your `<Ruby Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Ruby Startup Command>"
]
```

#### Code
```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Code
```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
    bodyBytes, err := ioutil.ReadAll(resp.Body)
    host := string(bodyBytes)
    if err == nil {
        //set the output of the curl command to the DD_AGENT_HOST env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
    }
    //...
}
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following. Substitute with your necessary argument flags and application `.jar` or `.war` file.

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <APPLICATION_ARG_FLAGS> -jar <APPLICATION_JAR_FILE/WAR_FILE>"
]
```

For more examples of setting the Agent hostname in other languages, see the [change Agent hostname documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/java/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following. Substitute with your `APP_PATH` if not set:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following.

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); php-fpm -F"
]
```

#### Apache

For Apache and `mod_php` in VirtualHost or server configuration file, use `PassEnv` to set `DD_AGENT_HOST` and other environment variables, such as the variables for [Unified Service Tagging][1] like the below example:

```
PassEnv DD_AGENT_HOST
PassEnv DD_SERVICE
PassEnv DD_ENV
PassEnv DD_VERSION
```

#### PHP fpm

When the ini param is set as `clear_env=on`, in the pool workers file `www.conf` you must also configure environment variables to be read from the host. Use this to also set `DD_AGENT_HOST` and other environment variables, such as the variables for [Unified Service Tagging][1] like the below example:

```
env[DD_AGENT_HOST] = $DD_AGENT_HOST
env[DD_SERVICE] = $DD_SERVICE
env[DD_ENV] = $DD_ENV
env[DD_VERSION] = $DD_VERSION
```

[1]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

##### IMDSv2
When using IMDSv2 the equivalent `entryPoint` configuration would look like the following. Substitute `<Startup Command>` with the appropriate command based on your language like the examples above.

```json
"entryPoint": [
  "sh",
  "-c",
  "export TOKEN=$(curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"); export DD_AGENT_HOST=$(curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/local-ipv4); <Startup Command>"
]
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /container/amazon_ecs/
[2]: /tracing/trace_collection/
[3]: /resources/json/datadog-agent-ecs-apm.json
[4]: /containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[5]: /containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[6]: /containers/amazon_ecs/?tab=awscli#setup
