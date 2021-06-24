---
title: Custom Checks
kind: documentation
description: Setting up a custom check with Datadog
---

## Overview 

Custom checks, also known as custom Agent checks, enable you to collect metrics and other data from your custom systems or applications and send them to Datadog. By creating and configuring a new check file in your `conf.d` directory, you can configure the Datadog Agent to collect data emitted from your application. Custom checks are considered low effort compared to writing a Datadog integration. They impact your billing because Metrics emitted through custom checks are considered custom metrics, which have a cost associated depending on your subscription plan.

**Note**: A custom check is different from a service check. Service checks monitor the up or down status of a service. For more information, see the [service check documentation][1]

### Should you write a custom Agent check or an Integration?

Use custom checks to collect metrics from custom applications or unique systems. However, if you are trying to gather metrics from a generally available application, public service, or open source project, Datadog recommends that you [create a full-fledged Agent Integration][2]. For more information about deciding how best to send your data, see the [Developing on Datadog overview page][3], and for more information on how to write an integration, see [Creating New Integrations][2].

## Getting started

{{< whatsnext >}}
    {{< nextlink href="/developers/custom_checks/write_agent_check/" >}}To quickly get started, see the Writing an Agent Check docs page. {{< /nextlink >}}
    {{< nextlink href="/developers/custom_checks/prometheus/" >}}If you have more advanced needs than the generic check (for example, metrics preprocessing), you can write a custom Open Metrics check.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /developers/service_checks/
[2]: /developers/integrations/new_check_howto/
[3]: /developers/
