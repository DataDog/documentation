---
title: Set Up Deployment Gates
description: "Compare inline and preconfigured Deployment Gates and follow the setup walkthrough for your chosen configuration source."
further_reading:
- link: "https://www.datadoghq.com/blog/deployment-gates/"
  tag: "Blog"
  text: "Catch incidents and pause faulty deployments automatically with Datadog Deployment Gates"
- link: "/api/latest/deployment-gates"
  tag: "API Reference"
  text: "Deployment Gates API reference"
---

Choose where your Deployment Gates are defined, then follow the setup instructions. For a comparison of the two configuration sources, see [Configuration sources][1].

{{< whatsnext desc="Set up Deployment Gates:" >}}
    {{< nextlink href="/deployment_gates/setup/inline" >}}<u>Inline</u>: Define gates and rules in your deployment configuration, with no setup in Datadog.{{< /nextlink >}}
    {{< nextlink href="/deployment_gates/setup/preconfigured" >}}<u>Preconfigured</u>: Create gates and rules in Datadog with the UI, API, or Terraform.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /deployment_gates/#configuration-sources
