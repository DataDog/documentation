---
title: My Azure VM is powered down. Why is it still listed in my infrastructure list?
kind: faq
further_reading:
- link: "/account_management/billing/azure/"
  tag: "FAQ"
  text: "Azure integration billing"
- link: "/integrations/azure/#configuration"
  tag: "Documentation"
  text: "Filter Azure VMs by tag"
---

When you power down your VMs in Azure, the Datadog Azure integration still collects the metric `azure.vm.status` for that VM. This metric is tagged with `status:running`, `status:not_running`, or `status:unknown`.

This is intended, but causes the VM to remain on your infrastructure list. If your VM reports only this metric, it does not count towards your billable host-count. See the Datadog [Billing section][1] for more info on billing matters.

If you destroy your Azure VM, it phases out of your infrastructure list within 3 hours.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/
