---
title: Facturation de l'intégration Azure
kind: faq
---
## Présentation

Datadog facture chaque machine virtuelle Azure surveillée dans Datadog, que l'Agent Datadog y soit installé ou non. **Vous n'êtes pas facturé en double** si vous exécutez l'Agent sur une machine virtuelle Azure reconnue par l'intégration Azure.

Les autres ressources Azure (Azure SQL, Azure App Services, Azure Redis Cache, etc.) ne sont pas prises en compte dans votre facture mensuelle.

### Exclusion de machines virtuelles

Utilisez le [carré d'intégration Datadog/Azure][1] pour filtrer vos machines virtuelles surveillées par Datadog. Accédez à l'onglet **Configuration** et modifiez un locataire existant ou ajoutez-en un autre. Chaque locataire est contrôlé via l'option **Optionally filter to VMs with tag**. Utilisez les [tags de host][2] pour exclure des machines virtuelles :

{{< img src="account_management/billing/azure_vm_filter.png" alt="Filtre de machine virtuelle Azure" responsive="true">}}

Lorsque vous ajoutez des limites à des locataires Azure existants depuis le carré d'intégration, les machines virtuelles précédemment identifiées peuvent rester dans la [liste d'infrastructures][3] jusqu'à 24 heures. Durant cette période de transition, les machines virtuelles affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les machines virtuelles sur lesquelles un Agent est exécuté s'affichent toujours et sont prises en compte dans votre facture. L'application de limites concerne uniquement les machines virtuelles sur lesquelles aucun Agent n'est exécuté.

## Dépannage
Pour toute question technique, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/tagging/using_tags/#integrations
[3]: /fr/graphing/infrastructure
[4]: /fr/help
[5]: mailto:success@datadoghq.com