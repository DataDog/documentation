---
title: NodeJS Applications
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: 'GitHub'
      text: 'NodeJS Datadog Library source code'
---

{{% appsec-getstarted %}}

## Get started

1. **Update or install the latest Datadog NodeJS library package**, at least version 2.2.0, by running:
   ```
   npm install dd-trace
   ```

2. **Enable Application Security in your environment** by setting the following environment variable: 
   ```
   DD_APPSEC_ENABLED=true node app.js
   ```
   How you do this varies depending on where your service runs:
   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command: 

```
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding this in the  environment section:

```
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialize Application Security in your code or set `DD_APPSEC_ENABLED` environment variable to `true` in your service invocation:
```
DD_APPSEC_ENABLED=true node app.js
```

{{% /tab %}}
{{% tab "In code" %}}

The following line must come before you import any instrumented module:
```
const tracer = require('dd-trace').init({
    appsec: true
});
```
{{% /tab %}}
{{< /tabs >}}


{{% appsec-getstarted-2 %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
