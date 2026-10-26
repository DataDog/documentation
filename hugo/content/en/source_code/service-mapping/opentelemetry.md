---
title: Embed Git Information with OpenTelemetry SDKs
description: Set Git information as OpenTelemetry resource attributes to link services instrumented with OpenTelemetry SDKs to source code.
type: multi-code-lang
code_lang: opentelemetry
code_lang_weight: 65
further_reading:
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "Learn about OpenTelemetry in Datadog"
- link: "https://opentelemetry.io/docs/languages/sdk-configuration/declarative-configuration/"
  tag: "External Site"
  text: "OpenTelemetry declarative configuration"
---

## Overview

If you instrument your services with an OpenTelemetry SDK, or a distribution built on one, set the Git information as OpenTelemetry resource attributes:

| Resource attribute         | Value                                                               |
|----------------------------|---------------------------------------------------------------------|
| `vcs.repository.url.full`  | Your repository URL, for example `git-provider.example/me/my-repo`. |
| `vcs.ref.head.revision`    | The commit SHA used to build your application.                      |

If you use a Datadog SDK, including with the OpenTelemetry API, follow the [instructions for your language][1] instead.

## Prerequisites

- Your services are instrumented with an OpenTelemetry SDK. See [Instrument Your Applications][5].
- Your OpenTelemetry data reaches Datadog. See [Send OpenTelemetry Data to Datadog][2].

## Set the resource attributes

Retrieve the commit SHA by running `git rev-parse HEAD` at build time, then embed it in your image. Choose the option that matches how you configure your SDK:

| Your setup | Option |
|---|---|
| You configure your SDK with an OpenTelemetry configuration file | [Add the Git information to your configuration file](#add-the-git-information-to-your-configuration-file-recommended) (recommended) |
| You don't use a configuration file yet, and your SDK supports one | [Migrate to a configuration file](#migrate-to-a-configuration-file), then add the Git information to it |
| Your SDK doesn't support configuration files, or you can't migrate | [Use an alternative option](#if-you-cant-use-a-configuration-file) |

### Add the Git information to your configuration file (recommended)

Use this option if you configure your SDK with an OpenTelemetry [declarative configuration][6] file.

1. Add the following entries to the `resource.attributes` section of your configuration file:

   ```yaml
   resource:
     attributes:
       - name: vcs.repository.url.full
         value: ${VCS_REPOSITORY_URL_FULL}
       - name: vcs.ref.head.revision
         value: ${VCS_REF_HEAD_REVISION}
   ```

1. Add the following lines to your application's Dockerfile:

   ```dockerfile
   ARG VCS_REPOSITORY_URL_FULL
   ARG VCS_REF_HEAD_REVISION
   ENV VCS_REPOSITORY_URL_FULL=${VCS_REPOSITORY_URL_FULL} \
       VCS_REF_HEAD_REVISION=${VCS_REF_HEAD_REVISION}
   ```

1. Add the following arguments to your Docker build command:

   ```shell
   docker build . \
     -t my-application \
     --build-arg VCS_REPOSITORY_URL_FULL=<git-provider.example/me/my-repo> \
     --build-arg VCS_REF_HEAD_REVISION=$(git rev-parse HEAD)
   ```

### Migrate to a configuration file

If your SDK supports declarative configuration but you configure it with environment variables, migrate to a configuration file first:

1. Check that your SDK supports declarative configuration in the [OpenTelemetry compliance matrix][7]. Support is experimental in some SDKs.
1. Follow the OpenTelemetry [migration instructions][8]. The migration configuration file maps the environment variables you already use to the configuration file format.
1. [Add the Git information to your configuration file](#add-the-git-information-to-your-configuration-file-recommended).

### If you can't use a configuration file

Use one of the following options if your SDK doesn't support configuration files yet, or if you can't migrate your SDK configuration to a file.

Both options require your SDK to read the `OTEL_RESOURCE_ATTRIBUTES` environment variable. Auto-instrumentation and default SDK setups read it. If you configure the SDK resource manually, include the environment resource detector.

{{% collapse-content title="Add resource attributes at startup" level="h4" %}}
Use this option to embed the Git information in your image at build time. A startup script adds it to `OTEL_RESOURCE_ATTRIBUTES` when the container starts, so it is kept when `OTEL_RESOURCE_ATTRIBUTES` is also set at runtime, for example in your pod spec or by the [OpenTelemetry Operator][3].

This option requires a shell in your image. Images without a shell, such as distroless or `scratch` images, can't run the script. If you use the OpenTelemetry Operator with these images, use annotations instead.

1. Save the following script as `otel-env.sh` next to your Dockerfile:

   ```sh
   #!/bin/sh
   # Add Git information to OTEL_RESOURCE_ATTRIBUTES, then start the application.
   # Attributes already set in OTEL_RESOURCE_ATTRIBUTES are kept.
   set -e
   add() {
     [ -n "$2" ] || return 0
     case ",${OTEL_RESOURCE_ATTRIBUTES}," in *",$1="*) return 0 ;; esac
     # Percent-encode "%", "," and "=" as the OpenTelemetry specification requires.
     v=$(printf '%s' "$2" | sed -e 's/%/%25/g' -e 's/,/%2C/g' -e 's/=/%3D/g')
     OTEL_RESOURCE_ATTRIBUTES="${OTEL_RESOURCE_ATTRIBUTES:+$OTEL_RESOURCE_ATTRIBUTES,}$1=$v"
   }
   add vcs.repository.url.full "$VCS_REPOSITORY_URL_FULL"
   add vcs.ref.head.revision "$VCS_REF_HEAD_REVISION"
   export OTEL_RESOURCE_ATTRIBUTES
   exec "$@"
   ```

1. Add the following lines to your application's Dockerfile. Prepend `/otel-env.sh` to your existing entrypoint:

   ```dockerfile
   ARG VCS_REPOSITORY_URL_FULL
   ARG VCS_REF_HEAD_REVISION
   ENV VCS_REPOSITORY_URL_FULL=${VCS_REPOSITORY_URL_FULL} \
       VCS_REF_HEAD_REVISION=${VCS_REF_HEAD_REVISION}
   COPY --chmod=755 otel-env.sh /otel-env.sh
   ENTRYPOINT ["/otel-env.sh", "<your application entrypoint>"]
   ```

1. Add the following arguments to your Docker build command:

   ```shell
   docker build . \
     -t my-application \
     --build-arg VCS_REPOSITORY_URL_FULL=<git-provider.example/me/my-repo> \
     --build-arg VCS_REF_HEAD_REVISION=$(git rev-parse HEAD)
   ```

**Note**: If your Kubernetes pod spec sets `command`, it replaces the image's `ENTRYPOINT`. In that case, add `/otel-env.sh` as the first element of `command`.
{{% /collapse-content %}}

{{% collapse-content title="Set resource attributes with OpenTelemetry Operator annotations" level="h4" %}}
Use this option if you instrument your Kubernetes workloads with the [OpenTelemetry Operator][3] and your deployment tooling knows the commit SHA at deploy time.

Add the following [annotations][4] to your pod template:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-application
spec:
  template:
    metadata:
      annotations:
        resource.opentelemetry.io/vcs.repository.url.full: "<git-provider.example/me/my-repo>"
        resource.opentelemetry.io/vcs.ref.head.revision: "<commitSha>"
```

Replace `<git-provider.example/me/my-repo>` with your repository URL, and have your deployment tooling replace `<commitSha>` with the commit SHA of the deployed build. The Operator copies annotation values into `OTEL_RESOURCE_ATTRIBUTES` without encoding them, so percent-encode any `%`, `,`, or `=` in your repository URL as `%25`, `%2C`, or `%3D`.

**Note**: The Operator ignores these annotations for attributes that are already set in the container's `OTEL_RESOURCE_ATTRIBUTES` environment variable.
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /source_code/service-mapping/#embed-git-information-in-your-build-artifacts
[2]: /opentelemetry/setup/
[3]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[4]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/#configure-resource-attributes-with-annotations
[5]: /opentelemetry/instrument/
[6]: https://opentelemetry.io/docs/languages/sdk-configuration/declarative-configuration/
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#declarative-configuration
[8]: https://opentelemetry.io/docs/languages/sdk-configuration/declarative-configuration/#migration-configuration
