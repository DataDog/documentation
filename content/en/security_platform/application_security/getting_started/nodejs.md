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

1. **Update or install the latest Datadog NodeJS library package**, at least version 2.0.0, by running:
   ```
   npm install dd-trace
   ```
   or to update from a previously installed 1.x version:
   ```
   npm install dd-trace@2
   ```

2. **Import and initialize the library** either in code or via command line arguments. The NodeJS library must be imported and initialized before **any other module**.
      {{< tabs >}}
{{% tab "In JavaScript code" %}}

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init({
  appsec: true
})
```

{{% /tab %}}
{{% tab "In TypeScript code" %}}

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file in order to maintain correct load order.
```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init({
  appsec: true
}); // initialized in a different file to avoid hoisting.
export default tracer;
```
If the default config is sufficient, or all configuration is done through environment variables, you can also use `dd-trace/init`, which loads and initializes in one step.
```typescript
import `dd-trace/init`;
```
{{% /tab %}}
{{% tab "On the command line" %}}

To load initialize the library in one step on the command line, use the `--require` option to Node.js
```sh
node --require dd-trace/init app.js
```
**Note:** This approach requires using environment variables for all configuration of the library.
{{% /tab %}}
{{< /tabs >}}

3. **Enable Application Security in your environment** by setting the following environment variable: 
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
{{< /tabs >}}

{{% appsec-getstarted-2 %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
