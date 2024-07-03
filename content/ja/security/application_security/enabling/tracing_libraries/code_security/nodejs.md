---
aliases:
- /ja/security_platform/application_security/getting_started/nodejs
- /ja/security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Adding user information to traces
- link: https://github.com/DataDog/dd-trace-js
  tag: ソースコード
  text: Node.js Datadog library source code
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: OOTB Application Security Management Rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshooting Application Security Management
kind: documentation
title: Enabling ASM for Node.js
type: multi-code-lang
---

You can monitor application security for Node.js apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## コードセキュリティの有効化
If your service runs a [tracing library version that supports code security vulnerability detection][3], enable the capability by setting the `DD_IAST_ENABLED=true` environment variable and restarting your service.


サービスにコードレベルの脆弱性検出機能を活用するには

1. [Update your Datadog Agent][4] to at least version 7.41.1.
2. Update your tracing library to at least the minimum version needed to turn on Code Security. For details, see [ASM capabilities support][3].
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   If you initialize the APM library on the command line using the `--require` option to Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   Then use environment variables to enable ASM:
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   How you do this varies depending on where your service runs:
   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```Dockerfile
ENV DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{< /tabs >}}

4. Restart your service.
5. To see Code Security in action, browse your service and the code-level vulnerabilities will appear in the [Vulnerability Explorer][5]. The `SOURCE` column shows the Code value.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details.mp4" alt="Video showing Vulnerabilities tab, Code source, and inspecting the code-level vulnerability" video="true" >}}

If you need additional assistance, contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/application_security/enabling/compatibility/nodejs
[3]: /ja/security/application_security/enabling/compatibility/nodejs#asm-capabilities-support
[4]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /ja/help