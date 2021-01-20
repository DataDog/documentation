---
title: Can I limit the number of VMs that are pulled in via the VMWare integration?
kind: faq
---

Yes. You can configure this with regex in your `vsphere.yaml` file. Refer to the `resource_filters` parameter section in the [example configuration][1] for more information.

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
