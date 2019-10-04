---
title: "Facturation des intégrations Google\_Cloud"
kind: faq
---
## Présentation

Datadog facture les hosts qui exécutent l'Agent Datadog et toutes les instances GCE récupérées par l'intégration Google Cloud. Vous n'êtes pas facturé(e) en double si vous exécutez l'Agent sur une instance GCE récupérée par l'intégration de Google Cloud.

Les autres ressources Google Cloud (CloudSQL, Google App Engine, Pub/Sub, etc.) ne font pas partie de la facturation mensuelle.

### Exclusion de métriques

Utilisez le [carré d'intégration Google Cloud][1] pour contrôler la collecte de métriques. Allez à l'onglet **Configuration** et sélectionnez un projet ou ajoutez un nouveau projet. Chaque projet est contrôlé dans **Optionally limit metrics collection** aux hosts avec tag. Limitez les métriques par [tag de host][2] :

{{< img src="account_management/billing/google-cloud01.png" alt="Google Cloud" responsive="true">}}

Lorsque vous ajoutez des limites à des projets Google Cloud dans le carré d'intégration, les instances précédemment découvertes peuvent rester dans la [liste d'infrastructure][3] jusqu'à 24 heures. Durant cette période de transition, les instances GCE affichent le statut `???`. Elles ne s'ajoutent pas à votre facturation.

Les hosts avec un Agent en cours d'exécution s'affichent toujours et sont inclus dans la facturation. L'utilisation de l'option de limite s'applique uniquement aux instances GCE sans Agent en cours d'exécution.

## Dépannage
Pour des questions techniques, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /fr/tagging/using_tags/#integrations
[3]: /fr/graphing/infrastructure
[4]: /fr/help
[5]: mailto:success@datadoghq.com