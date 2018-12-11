---
title: My Azure VM is powered down... why is it still listed in my infrastructure list?
kind: faq
---

When you power down your VMs in Azure, your Azure integration will still continue to collect one metric for that VM, specifically azure.vm.status, which gets tagged by status:running or status:not_running.

This is intended, but one side effect is that the VM will remain listed on your infrastructure list page so long as even this one metric is being reported for your VM. If your VM reports only this metric, it will not count towards your billable host-count. (See our [Billing FAQs][1] for more info on billing matters)

Only if you destroy your Azure VM will it then phase out of your infrastructure list 3 hours later.

[1]: /account_management/faq
