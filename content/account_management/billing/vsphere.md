---
title: vSphere integration billing
kind: faq
---

## Overview

Datadog bills for each Agent installed on a vCenter server.

### VM exclusion

Use the `vsphere.yaml` file to filter your VMs monitored by Datadog by using regex. See the [sample vsphere.d/conf.yaml][1] for an example. 

When adding limits to existing VMs, the previously discovered VMs could stay in the [Infrastructure List][3] up to 24 hours. During the transition period, VMs display a status of `???`. This does not count towards your billing.

## Troubleshooting
For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /tagging/using_tags/#integrations
[3]: /graphing/infrastructure
[4]: /help
[5]: mailto:success@datadoghq.com
