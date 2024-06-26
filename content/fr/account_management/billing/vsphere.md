---
title: Facturation de l'intégration vSphere
---
## Présentation

Datadog facture chaque Agent installé sur un serveur vCenter et chaque machine virtuelle surveillée.

## Exclusion des VM vSphere

Utilisez le fichier `vsphere.yaml` pour filtrer vos machines virtuelles surveillées par Datadog à l'aide d'une expression régulière. Consultez le [fichier d'exemple vsphere.d/conf.yaml][1].

Lorsque vous appliquez des limites à des machines virtuelles existantes, les machines virtuelles précédemment identifiées peuvent rester dans la [liste d'infrastructures][2] jusqu'à 24 heures. Durant cette période de transition, les machines virtuelles affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][3].

Pour toute question concernant la facturation, contactez votre [chargé de compte][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /fr/infrastructure/
[3]: /fr/help/
[4]: mailto:success@datadoghq.com