---
title: Facturation de l'intégration Alibaba
---
## Présentation

Datadog facture chaque machine virtuelle Alibaba surveillée dans Datadog, que l'Agent Datadog y soit installé ou non. **Vous n'êtes pas facturé en double** si vous exécutez l'Agent sur une machine virtuelle Alibaba reconnue par l'intégration Alibaba.

Les autres ressources Alibaba (CDN, instances d'Express Connect, bases de données Aspara, etc.) ne sont pas prises en compte dans votre facture mensuelle.

## Exclure des machines virtuelles Alibaba

Utilisez le [carré d'intégration Datadog/Alibaba][1] pour filtrer vos machines virtuelles surveillées par Datadog en fonction de [tags host][2]. Accédez à l'onglet **Configuration** et modifiez un compte existant ou ajoutez-en un autre. Pour appliquer un filtre à un compte, cliquez sur ce dernier et renseignez le champ **Optionally limit metrics collection to hosts with tag** :

{{< img src="account_management/billing/alibaba_filter.png" alt="Filtre de machine virtuelle Alibaba" >}}

Lorsque vous ajoutez des limites à des comptes Alibaba existants depuis le carré d'intégration, les machines virtuelles précédemment identifiées peuvent rester dans la [liste des infrastructures][3] jusqu'à 24 heures. Durant cette période de transition, les machines virtuelles affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les machines virtuelles sur lesquelles un Agent est exécuté s'affichent toujours et sont prises en compte dans votre facture. L'application de limites concerne donc uniquement les machines virtuelles sur lesquelles aucun Agent n'est exécuté.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /fr/getting_started/tagging/using_tags/#integrations
[3]: /fr/infrastructure/
[4]: /fr/help/
[5]: mailto:success@datadoghq.com