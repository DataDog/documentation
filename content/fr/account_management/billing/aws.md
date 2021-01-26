---
title: Facturation des intégrations d'AWS
kind: documentation
aliases:
  - /fr/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---
## Présentation

Datadog facture les hosts AWS qui exécutent l'Agent Datadog et toutes les instances EC2 récupérées par l'intégration Datadog/AWS. **Vous n'êtes pas facturé(e) en double** si vous exécutez l'Agent sur une instance EC2 récupérée par l'intégration d'AWS.

Les autres ressources AWS (ELB, EBS, RDS, Dynamo, etc.) ne font pas partie de la facturation mensuelle et les exclusions de configuration ne s'appliquent pas.

## Exclusion de ressources AWS

Utilisez le [carré d'intégration Datadog/AWS][1] pour contrôler la collecte de métriques. Accédez à l'onglet **Configuration** et sélectionnez un compte ou ajoutez-en un autre. Chaque compte est contrôlé via l'option **Optionally limit resource collection**. Limitez les métriques par [tag de host][2], par tag Lambda ou par espace de nommage :

{{< img src="account_management/billing/aws02.png" alt="AWS" >}}

**Remarque** : Datadog ne facture pas les métriques ELB, car elles ne peuvent pas être exclues par filtrage.

Lorsque vous appliquez des limites à des comptes AWS existants depuis le carré d'intégration, les instances précédemment identifiées peuvent rester dans la [liste d'infrastructures][3] jusqu'à 2 heures. Durant cette période de transition, les instances EC2 affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les hosts avec un Agent en cours d'exécution s'affichent toujours et sont inclus dans la facturation. L'utilisation de l'option de limite s'applique uniquement aux instances EC2 sans Agent en cours d'exécution.

## Dépannage

Pour des questions techniques, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /fr/getting_started/tagging/using_tags/#integrations
[3]: /fr/infrastructure/
[4]: /fr/help/
[5]: mailto:success@datadoghq.com