---
title: What are Kubernetes pause containers and will they impact my bill?
kind: faq
customnav: accountmanagementnav
---

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod.
 
We exclude all pause containers from your quota and we don't charge for them (requires agent 5.8 or newer). You can learn more about how containers affect your bill [here](/account_management/faq/how-do-you-charge-for-containers).