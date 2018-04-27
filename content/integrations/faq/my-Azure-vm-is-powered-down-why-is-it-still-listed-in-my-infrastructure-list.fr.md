---
title: Ma machine virtuelle Azure est down ... pourquoi est-elle toujours répertoriée dans ma page infrastructure list?
kind: faq
---

Lorsque vous éteignez vos machines virtuelles dans Azure, votre intégration Azure continuera à collecter une métrique pour cette machine virtuelle, plus précisément azure.vm.status, qui est taggée par status:running ou status:not_running.

This is intended, but one side effect is that the VM will remain listed on your infrastructure list page so long as even this one metric is being reported for your VM. If your VM reports only this metric, it will not count towards your billable host-count. (See our [Billing FAQs](/account_management/faq/) for more info on billing matters)

Only if you destroy your Azure VM will it then phase out of your infrastructure list 3 hours later.

