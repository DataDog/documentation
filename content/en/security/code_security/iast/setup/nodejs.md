---
title: Enabling Code Security for Node.js
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nodejs
  - /security/application_security/getting_started/nodejs
further_reading:
  - link: "/security/code_security/iast/#code-level-vulnerabilities-list"
    tag: "Documentation"
    text: "Supported code-level vulnerabilities list"
  - link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
    tag: "Blog"
    text: "Enhance application security in production with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/application-code-vulnerability-detection/"
    tag: "Blog"
    text: "Find vulnerabilities in your code with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
    tag: "Blog"
    text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting Application Security"
---

You can detect code-level vulnerabilities and monitor application security in Node.js applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Code Security in your service:

1. [Update your Datadog Agent][4] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][3] page.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   If you initialize the APM library on the command line using the `--require` option to Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   Then use environment variables to enable AAP:
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
5. To see Code Security in action, browse your service and the code-level vulnerabilities appear in the [Vulnerability Explorer][5].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support][6].

## Bundling with esbuild

`dd-trace` provides an esbuild plugin. Starting in `dd-trace@5.69.0`, the plugin also supports IAST for CommonJS bundled applications. Starting in `dd-trace@5.78.0`, support is extended to applications using ESM.

Here's an example of how one might use dd-trace with esbuild:

```javascript
// esbuild/esbuilder.js

const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  sourcemap: true, // required for correct vulnearability location
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node18'],
  external: [
    '@datadog/native-iast-taint-tracking' // required for Datadog IAST features
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

To enable IAST during bundling, set the `DD_IAST_ENABLED` environment variable:

```sh
DD_IAST_ENABLED=true node esbuild/esbuilder.js
```

Because the tracer uses native modules, you must list them in `external` and ship a `node_modules` directory alongside the bundled app. Native modules used by `dd-trace` are published under the `@datadog/*` scope.

To generate a minimal `node_modules` directory that contains only the required native modules and their dependencies:

1. Determine the required package versions.
2. Install them into a temporary directory.
3. Copy the resulting `node_modules` directory to the application's output directory.

```sh
cd path/to/project
npm ls @datadog/native-iast-taint-tracking
# dd-trace@5.69.0
# └── @datadog/native-iast-taint-tracking@4.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-iast-taint-tracking@4.0.0
cp -R ./node_modules path/to/bundle
```

### Unsupported IAST features

IAST support for bundled applications has the following limitations:

- Detection of hardcoded passwords and hardcoded secrets is not supported.
- Security Controls is not supported.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /security/code_security/iast/setup/nodejs/
[3]: /security/code_security/iast/setup/
[4]: /agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /help
