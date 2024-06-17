---
kind: documentation
title: Facturation de l'intégration Google Cloud
---

## Présentation

Datadog facture les hosts qui exécutent l'Agent Datadog et toutes les instances de GCE identifiées par l'intégration Google Cloud. Les services hors CGE, comme [Dataflow][6], peuvent créer des hosts CGE facturables dans Datadog. Vous n'êtes pas facturé en double si vous exécutez l'Agent sur une instance GCE reconnue par l'intégration Google Cloud.

Les autres ressources de Google Cloud (CloudSQL, Google App Engine, Pub/Sub et autres) ne sont pas prises en compte pour votre facturation mensuelle. Pour savoir quels hosts sont facturés, accédez à la page relative à GCE dans la console Google Cloud et consultez la liste des hosts en cours d'exécution. À moins d'être exclus via des tags avec [lʼexclusion de métriques de Google Cloud](#google-cloud-exclusion-de-metriques), les hosts répertoriés sur cette page envoient des données à Datadog et sont facturés en tant que hosts.

## Exclusion des métriques Google Cloud

Utilisez le [carré d'intégration Google Cloud][1] pour contrôler la collecte de métriques. Accédez à l'onglet **Configuration** et sélectionnez un projet ou ajoutez-en un autre. Chaque projet est contrôlé via l'option **Optionally Limit Metrics Collection to hosts with tag**. Limitez les métriques par [tag de host][2] :

{{< img src="account_management/billing/google_cloud_metric_filter.png" alt="La page Google Cloud dans Datadog, sur lʼonglet Général, avec lʼoption permettant de limiter la collecte de métriques mise en évidence" >}}

Lorsque vous appliquez des limites à des projets Google Cloud depuis le carré d'intégration, les instances précédemment identifiées peuvent rester dans la [liste d'infrastructures][3] jusqu'à 2 heures. Durant cette période de transition, les instances GCE affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les hosts sur lesquels un Agent est exécuté s'affichent toujours et sont pris en compte dans votre facture. L'application de limites concerne uniquement les instances GCE sur lesquelles aucun Agent n'est exécuté.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /fr/getting_started/tagging/using_tags/#integrations
[3]: /fr/infrastructure/
[4]: /fr/help/
[5]: mailto:success@datadoghq.com
[6]: https://cloud.google.com/dataflow