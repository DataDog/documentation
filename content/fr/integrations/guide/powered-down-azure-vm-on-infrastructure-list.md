---
aliases:
- /fr/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
further_reading:
- link: /account_management/billing/azure/
  tag: FAQ
  text: Facturation de l'intégration Azure
- link: /account_management/billing/azure/#azure-vm-exclusion
  tag: Documentation
  text: Filtrer les machines virtuelles Azure par tag

title: Machines virtuelles Azure hors tension dans la liste dʼinfrastructure
---

Lorsque vous éteignez vos machines virtuelles dans Azure, lʼintégration Datadog/Azure collecte toujours les métriques `azure.vm.status` qui leur sont associées. Cette métrique porte les tags `status:running`, `status:not_running` ou `status:unknown`.

Ceci est volontaire, mais, en conséquence, la machine virtuelle reste sur la liste de votre infrastructure. Si votre machine virtuelle ne communique que cette métrique, elle n'est pas prise en compte dans le décompte de vos hosts facturables. Consultez la [section sur la facturation][1] de Datadog pour en savoir plus à ce sujet.

Si vous détruisez votre machine virtuelle Azure, elle est retirée de votre liste dʼinfrastructure dans les 3 heures.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/