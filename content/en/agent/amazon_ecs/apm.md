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
    ...
  {{< /code-block >}}

    {{< site-region region="us3,eu,gov" >}} 
  To ensure the Agent sends data to the right Datadog location, set the following environment variable, where `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}}:

  ```json
  "environment": [
       ...
     {
       "name": "DD_SITE",
       "value": "<DATADOG_SITE>"
     },
     ...
     ]
   ...
  ```
  {{< /site-region >}}
  For **Agent v7.17 or lower**, add the following environment variables:
   ```json
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
   ```

   [See all environment variables available for Agent trace collection][1].

2. Assign the private IP address for each underlying instance your containers are running in your application container to the `DD_AGENT_HOST` environment variable. This allows your application traces to be shipped to the Agent. 

{{< tabs >}}
{{% tab "EC2 metadata endpoint" %}}

The [Amazon’s EC2 metadata endpoint][1] allows discovery of the private IP address. To get the private IP address for each host, curl the following URL:

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}


[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
{{% /tab %}}
{{% tab "ECS container metadata file" %}}

The [Amazon's ECS container metadata file][1] allows discovery of the private IP address. To get the private IP address for each host, run the following command:

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq .HostPrivateIPv4Address
{{< /code-block >}}

    
[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

Set the result as your Trace Agent hostname environment variable for each application container shipping to APM:

{{< code-block lang="curl" >}}
os.environ['DD_AGENT_HOST'] = <EC2_PRIVATE_IP>
{{< /code-block >}}
    
    

## Launch time variables

In cases where variables on your ECS application are set at launch time, you **must** set the hostname as an environment variable with `DD_AGENT_HOST`. Otherwise, you can set the hostname in your application's source code for Python, Javascript, or Ruby. For Java and .NET, you can set the hostname in the ECS task. For example:

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

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
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

For more examples of setting the Agent hostname in other languages, refer to the [change agent hostname documentation][1].


[1]: https://docs.datadoghq.com/tracing/setup/nodejs/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

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

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

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
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/amazon_ecs/
