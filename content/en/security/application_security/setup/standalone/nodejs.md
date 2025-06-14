---
title: Enabling Application & API Protection for Node.js
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nodejs
  - /security/application_security/getting_started/nodejs
  - /security/application_security/enabling/tracing_libraries/threat_detection/nodejs/
  - /security/application_security/threats/setup/standalone/nodejs
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: "Source Code"
      text: 'Node.js Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App & API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App & API Protection"
---

You can monitor App and API Protection for Node.js apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted-standalone %}}

## Enabling Application & API Protection
### Get started

1. **Update your Datadog Node.js library package** to at least version 5.0.0 (for Node 18+) or 4.0.0 (for Node 16+) or 3.10.0 (for Node.js 14+), by running one of these commands:
   ```shell
   npm install dd-trace@^5
   npm install dd-trace@^4
   npm install dd-trace@^3.10.0
   ```
   Use this [migration guide][1] to assess any breaking changes if you upgraded your library.

   App & API Protection is compatible with Express v4+ and Node.js v14+. For additional information, see [Compatibility][2].

2. **Where you import and initialize the Node.js library for APM, also enable Application & API Protection.** This might be either in your code or with environment variables. If you initialized APM in code, add `{appsec: true}` to your init statement:
      {{< tabs >}}
{{% tab "In JavaScript code" %}}

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init({
  appsec: true,
  tracing: false // To disable APM tracing and use security features only
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
  appsec: true,
  tracing: false // To disable APM tracing and use security features only
}); // initialized in a different file to avoid hoisting.
export default tracer;
```
If the default config is sufficient, or all configuration is done through environment variables, you can also use `dd-trace/init`, which loads and initializes in one step.
```typescript
import `dd-trace/init`;
```
{{% /tab %}}

{{< /tabs >}}

   **Or** if you initialize the APM library on the command line using the `--require` option to Node.js:
   ```shell
   node --require dd-trace/init app.js
   ```
   Then use environment variables to enable Application & API Protection:
   ```shell
   DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false node app.js
   ```
   How you do this varies depending on where your service runs:
   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following arguments in your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable values to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the Application & API Protection env variables:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding these in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialize Application & API Protection in your code or set environment variables in your service invocation:
```shell
DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false node app.js
```

{{% /tab %}}
{{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}


If you need additional assistance, contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /security/application_security/setup/compatibility/nodejs
[4]: /agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /help
