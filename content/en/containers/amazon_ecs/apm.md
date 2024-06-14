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

To collect traces from your ECS containers, update the Task Definitions for both your Agent and your application container as described below.

One option for doing this is to modify the previously used [Task Definition file][4] and [register your updated Task Definition][5]. Alternatively, you can edit the Task Definition directly from the Amazon Web UI.

Once enabled, the Datadog Agent container collects the traces emitted from the other application containers on the same host as itself.

## Configure the Datadog Agent to accept traces
1. To collect all traces from your running ECS containers, update your Agent's Task Definition from the [original ECS Setup][6] with the configuration below.

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

2. For **Agent v7.17 or lower**, add the following environment variables:
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

3. If you are updating a local file for your Agent's Task Definition, [register your updated Task Definition][5]. This creates a new revision. You can then reference this updated revision in the daemon service for the Datadog Agent.

## Configure your application container to submit traces to Datadog Agent

### Install the tracing library
Follow the [setup instructions for installing the Datadog tracing library][2] for your application's language. For ECS install the tracer into your application's container image.

### Provide the private IP address for the EC2 instance
Provide the tracer with the private IP address of the underlying EC2 instance that the application container is running on. This address is the hostname of the tracer endpoint. The Datadog Agent container on the same host (with the host port enabled) receives these traces.

Use one of the following methods to dynamically get the private IP address:

{{< tabs >}}
{{% tab "EC2 metadata endpoint" %}}

The [Amazon's EC2 metadata endpoint (IMDSv1)][1] allows discovery of the private IP address. To get the private IP address for each host, curl the following URL:

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

Provide the result of this request to the tracer by setting the `DD_AGENT_HOST` environment variable for each application container that sends traces.

### Configure the Trace Agent endpoint

In cases where variables on your ECS application are set at launch time (Java, .NET, and PHP), you **must** set the hostname of the tracer endpoint as an environment variable with `DD_AGENT_HOST` using one of the above methods. The examples below use the IMDSv1 metadata endpoint, but the configuration can be interchanged if needed. If you have a startup script as your entry point, include this call as part of the script, otherwise add it to the ECS Task Definition's `entryPoint`.

For other supported languages (Python, JavaScript, Ruby, and Go) you can alternatively set the hostname in your application's source code.

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substituting your `<Python Startup Command>`:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Python Startup Command>"
]
```
For Python the startup command is generally `ddtrace-run python my_app.py` but may vary depending on the framework used, for example, using [uWSGI][1] or instrumenting your [code manually with `patch_all`][2].

#### Code
You can alternatively update your code to have the tracer set the hostname explicitly:

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#uwsgi
[2]: https://ddtrace.readthedocs.io/en/stable/basic_usage.html#patch-all
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substituting your `<Node.js Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Node.js Startup Command>"
]
```

#### Code
You can alternatively update your code to have the tracer set the hostname explicitly:

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substituting your `<Ruby Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Ruby Startup Command>"
]
```

#### Code
You can alternatively update your code to have the tracer set the hostname explicitly:

```ruby
require 'datadog' # Use 'ddtrace' if you're using v1.x
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following, substituting your `<Go Startup Command>`:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Go Startup Command>"
]
```

#### Code
You can alternatively update your code to have the tracer set the hostname explicitly:

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
Update the Task Definition's `entryPoint` with the following, substituting your `<Java Startup Command>`:

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Java Startup Command>"
]
```
The Java startup command should include your `-javaagent:/path/to/dd-java-agent.jar`, see the [Java tracing docs for adding the tracer to the JVM][1] for further examples.

[1]: /tracing/trace_collection/dd_libraries/java/?tab=containers#add-the-java-tracer-to-the-jvm
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Launch time variable
Update the Task Definition's `entryPoint` with the following. Substituting your `APP_PATH` if not set:

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
Update the Task Definition's `entryPoint` with the following:

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

#### IMDSv2
When using IMDSv2, the equivalent `entryPoint` configuration looks like the following. Substitute `<Startup Command>` with the appropriate command based on your language, as in the examples above.

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
