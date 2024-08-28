---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
title: Collecte de logs Google Cloud avec un abonnement Pub/Sub Push
---

<div class="alert alert-danger">
Cette page décrit les fonctionnalités obsolètes et les informations de configuration relatives aux abonnements Pub/Sub Push antérieurs, utiles pour dépannage ou pour modifier les configurations antérieures. Utilisez un abonnement <strong>Pull</strong> avec le modèle de Datadog Dataflow pour transférer vos logs Google Cloud à Datadog à la place. Référez-vous à la section <a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">Collecte de logs</a> sur la page de lʼintégration Google Cloud intégration pour connaître la marche à suivre.
</div>

## Présentation

Ce guide décrit comment transférer des logs depuis vos services Google Cloud vers  Datadog via un abonnement **Push** à un sujet [Google Cloud Pub/Sub][1].

Vous pouvez également utiliser [lʼAgent Datadog][2] pour recueillir des logs à partir d'applications exécutées dans GCE ou GKE, .

**Remarque** : si vous avez un [VPC Google Cloud][3] dans votre environnement Google Clou , l'abonnement **Push** ne peut pas accéder aux endpoints en dehors du VPC.

## Configuration

### Prérequis

Lʼ[intégration Google Cloud Platform][4] est installée avec succès.

### Créer un sujet Cloud Pub/Sub

1. Accédez à la [console Cloud Pub/Sub][5] et créez un sujet.

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="Créer un sujet sans abonnement par défaut" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur *Create*.

**Avertissement** : les Pub/subs sont inclus dans les [quotas et limitations de Google Cloud][6]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs](#surveiller-la-redirection-de-logs) pour découvrir comment configurer des notifications de monitor si vous vous approchez de ces limites.

### Transférer des logs vers Datadog avec un abonnement Cloud Pub/Sub

1. Dans la [console Cloud Pub/Sub][5], sélectionnez **Subscriptions** dans le menu de navigation de gauche. Cliquez sur **Create Subscription**.
2. Créez un ID d'abonnement et sélectionnez le sujet que vous venez de créer.
3. Sélectionnez la méthode `Push`, puis saisissez la commande suivante, en prenant soin de remplacer `<DATADOG_API_KEY>` par la valeur d'une [clé d'API Datadog valide][7] :
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**Remarque** : assurez-vous que le sélecteur de `Datadog site` à droite de la page est défini sur votre [site Datadog][8] avant de copier la commande ci-dessus.

4. Configurez des options supplémentaires si vous le souhaitez, telles que **Subscription expiration**, **Acknowledgment deadline**, **Message retention duration** ou **Dead lettering**.
5. Sous **Retry policy**, sélectionnez **Retry after exponential backoff delay**.
6. Cliquez sur **Create** en bas.

Le Pub/Sub peut désormais recevoir des logs de Google Cloud Logging et les transmettre à Datadog.

### Exporter des logs depuis Google Cloud

1. Accédez à [la page Google Cloud Logs Explorer][9] et filtrez les logs à exporter.
2. Depuis lʼonglet **Log Router**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez **Cloud Pub/Sub** comme destination et sélectionnez le pub/sub créé à cet effet.
   **Remarque** : le pub/sub peut être situé dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Cliquez sur **Create Sink** et patientez jusqu'à ce que le message de confirmation apparaisse.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même Pub/Sub en utilisant plusieurs récepteurs.

## Surveiller la redirection de logs

Les Pub/Sub sont inclus dans les [quotas et limitations de Google Cloud][6]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets, en utilisant différents filtres.

Pour recevoir automatiquement une alerte lorsque vous atteignez ces quotas, activez [l'intégration Pub/Sub][10] et configurez un monitor sur la métrique `gcp.pubsub.subscription.num_outstanding_messages`. Filtrez ensuite ce monitor sur l'abonnement qui exporte les logs vers Datadog. L'exemple ci-dessous permet de s'assurer que le nombre de logs ne dépasse jamais 1 000 :

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Surveillance Pub Sub" style="width:80%;">}}

### Échantillonner des logs

Vous avez la possibilité d'échantillonner les logs interrogés grâce à la [fonction sample][11]. Par exemple, pour inclure uniquement 10 % des logs, utilisez `sample(insertId, 0.1)`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/pubsub/docs/overview
[2]: /fr/agent/
[3]: https://cloud.google.com/vpc
[4]: /fr/integrations/google_cloud_platform/#installation
[5]: https://console.cloud.google.com/cloudpubsub/topicList
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[8]: /fr/getting_started/site/
[9]: https://console.cloud.google.com/logs/viewer
[10]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub/
[11]: https://cloud.google.com/logging/docs/view/logging-query-language#sample