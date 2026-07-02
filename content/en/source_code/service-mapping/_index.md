---
title: Service Mapping for Source Code Integration
description: "Tag your APM telemetry with Git information to link services to source code."
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn about APM"
- link: "/tracing/trace_collection/dd_libraries/"
  tag: "Documentation"
  text: "Learn about Datadog SDKs"
---

## Overview

Your telemetry must be tagged with Git information that ties the running application version with a particular repository and commit.

For supported languages, Datadog recommends [embedding Git information](#embed-git-information-in-your-build-artifacts) in the deployed artifacts, which is then extracted by the [Datadog SDKs][1] automatically. For other languages and configurations, see [Other Languages](/source_code/service-mapping/other/).

<div class="alert alert-info">If you have <a href="/tracing/">APM</a> set up already, navigate to <a href="https://app.datadoghq.com/source-code/setup/apm">{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Link Source Code{{< /ui >}}</a> and configure the source code integration for your backend services.</div>

## Embed Git information in your build artifacts

You can embed the repository URL and commit hash in your build artifact. The [Datadog SDKs][1] use this information to automatically add the right tags to your APM service telemetry.

Select one of the following languages that supports embedding git information:

{{< card-grid >}}
  {{< image-card href="/source_code/service-mapping/go/" src="integrations_logos/go-metro.png" alt="Go" title="Go" >}}
  {{< image-card href="/source_code/service-mapping/python/" src="integrations_logos/python.png" alt="Python" title="Python" >}}
  {{< image-card href="/source_code/service-mapping/dotnet/" src="integrations_logos/dotnet-core.png" alt=".NET" title=".NET" >}}
  {{< image-card href="/source_code/service-mapping/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" title="Node.js" >}}
  {{< image-card href="/source_code/service-mapping/ruby/" src="integrations_logos/ruby.png" alt="Ruby" title="Ruby" >}}
  {{< image-card href="/source_code/service-mapping/java/" src="integrations_logos/java.png" alt="Java" title="Java" >}}
  {{< image-card href="/source_code/service-mapping/php/" src="integrations_logos/php.png" alt="PHP" title="PHP" >}}
  {{< image-card href="/source_code/service-mapping/other/" title="Other Languages" >}}
{{< /card-grid >}}

## Build inside a Docker container

If your build process is executed in CI within a Docker container, use a [named context][2] to make your `.git` folder available at build time:

1. Add your `.git` folder as a named build context:

   ```shell
   docker build [...] --build-context dotgit=<path to your local .git folder>
   ```

2. In your `Dockerfile`, mount the `.git` folder before running your build:

   ```dockerfile
   RUN --mount=from=dotgit,target=<path to where you expect .git to be in your build container> <your build command>
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/
[2]: https://docs.docker.com/build/concepts/context/#named-contexts
