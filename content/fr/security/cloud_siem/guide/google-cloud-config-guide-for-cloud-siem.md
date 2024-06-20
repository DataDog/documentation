---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Explorer les règles de détection par défaut de Cloud SIEM
- link: /security/explorer/
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security/cloud_siem/log_detection_rules/
  tag: Documentation
  text: Créer des règles de détection
- link: /integrations/google_cloud_platform/#collecte-de-logs
  tag: Documentation
  text: Recueillir des logs à partir de la plateforme Google Cloud
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: Blog
  text: Visualiser l'activité de votre environnement Google Cloud avec l'outil Investigator
    de Cloud SIEM Datadog
title: Guide de configuration de Google Cloud pour Cloud SIEM
---

## Présentation

La solution [Cloud SIEM Datadog][1] applique des règles de détection à l'ensemble des logs traités dans Datadog. Cette approche permet de détecter les menaces, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou les modifications de ressources non sécurisées. Les menaces s'affichent sous la forme de signaux de sécurité dans le Security Signals Explorer et peuvent être triées.

Ce guide détaille les étapes à suivre afin de commencer à détecter les menaces à l'aide de vos journaux d'audit Google Cloud :

1. [Activer les journaux d'audit d'accès aux données](#activer-les-journaux-d-audit-d-acces-aux-donnees)
1. [Créer un système Pub/Sub Google Cloud](#creer-un-systeme-pub-sub-google-cloud)
1. [Configurer le Pub/Sub pour transmettre les logs à Datadog](#configurer-le-pub-sub-pour-transmettre-les-logs-a-datadog)
1. [Exporter les logs depuis Google Cloud Logging vers le Pub/Sub](#exporter-les-logs-depuis-google-cloud-logging-vers-le-pub-sub)
1. [Utiliser Cloud SIEM pour trier les signaux de sécurité](#utiliser-cloud-siem-pour-trier-les-signaux-de-securite)

## Activer les journaux d'audit d'accès aux données

1. Accédez à IAM & Admin Console > [Audit Log][6].
1. Sélectionnez les services pour lesquels vous souhaitez activer les journaux d'accès aux données.
1. Dans le volet **Log Types**, activez **Admin Read**, **Data Read** et **Data Write**.
1. Cliquez sur **Save**.

### Modifier la configuration par défaut pour les nouveaux services

Lorsque vous ajoutez un nouveau service Google Cloud, celui-ci applique la [configuration d'audit par défaut][7].

Pour veiller à ce que les journaux d'audit d'accès aux données soient capturés pour les nouveaux services Google Cloud, modifiez votre configuration d'audit par défaut :

1. Accédez à **IAM & Admin Console > [Audit Log][6]**.
1. Activez **Admin Read**, **Data Read** et **Data Write**.
1. Cliquez sur **Save**.

## Créer un système Pub/Sub Google Cloud

1. Accédez à Pub/Sub > [Topics][7].
1. Cliquez sur **Create Topic**.
1. Attribuez un nom au sujet, par exemple `export-audit-logs-to-datadog`.
1. Cliquez sur **Create**.

## Configurer le Pub/Sub pour transmettre les logs à Datadog

1. Accédez à Pub/Sub > [Subscriptions][8].
1. Cliquez sur **Create Subscription**.
1. Attribuez un nom à l'abonnement.
1. Sélectionnez le sujet que vous avez précédemment créé.
1. Sous **Delivery type**, sélectionnez **Push**.
1. Saisissez l'URL d'endpoint suivante, en prenant soin de remplacer `CLÉ_API_DATADOG` par une nouvelle clé d'API Datadog ou une clé d'API existante : https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<CLÉ_API_DATADOG>&dd-protocol=gcp`.
1. Configurez des options supplémentaires selon vos besoins.
1. Cliquez sur **Create**.

Le Pub/Sub peut désormais recevoir des logs de Google Cloud Logging et les transmettre à Datadog.

## Exporter les logs depuis Google Cloud Logging vers le Pub/Sub

1. Accédez à l'[explorateur de journaux Google Cloud][9].
1. Saisissez une requête pour filtrer les logs que vous souhaitez exporter.
1. Sélectionnez **Log Router** dans le menu latéral gauche.
1. Cliquez sur **Create Sink**.
1. Attribuez un nom au récepteur.
1. Cliquez sur **Next**.
1. Dans le menu déroulant **Select Sink Service**, sélectionnez **Cloud Pub/Sub topic**.
1. Sous **Select a Cloud Pub/Sub topic**, sélectionnez le Pub/Sub que vous avez précédemment créé.
1. Cliquez sur **Create Sink**.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même Pub/Sub en utilisant plusieurs récepteurs.

**Avertissement** : les Pub/Sub sont inclus dans les [quotas et limitations de Google Cloud][10]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la rubrique [Surveiller la redirection de logs][11] pour découvrir comment configurer un monitor afin de recevoir une notification lorsque vous vous approchez de ces limites.
## Utiliser Cloud SIEM pour trier les signaux de sécurité

Cloud SIEM applique des règles de détection prêtes à l'emploi à l'ensemble des logs traités, y compris les journaux d'audit Google Cloud que vous avez configurés. Lorsqu'une menace est détectée grâce à une règle, un signal de sécurité est généré. Vous pouvez le consulter dans le Security Signals Explorer.

- Accédez au [Signals Explorer de Cloud SIEM][12] pour visualiser et trier les menaces. Consultez le Security Signals Explorer pour en savoir plus.
- Vous pouvez également vous servir du [dashboard Google Cloud Audit Log][13] pour étudier les activités anormales.
- Consultez les [règles de détection prêtes à l'emploi][14] qui sont appliquées à vos logs.
- Créez des [règles][15] pour détecter les menaces en fonction de vos besoins précis.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/
[2]: https://console.cloud.google.com/apis/credentials
[3]: https://console.cloud.google.com/iam-admin/serviceaccounts
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://app.datadoghq.com/integrations/google-cloud-platform
[6]: https://console.cloud.google.com/iam-admin/audit
[7]: https://console.cloud.google.com/cloudpubsub/topic
[8]: https://console.cloud.google.com/cloudpubsub/subscription
[9]: https://console.cloud.google.com/logs/
[10]: https://cloud.google.com/pubsub/quotas#quotas
[11]: /fr/integrations/google_cloud_platform/#monitor-the-log-forwarding
[12]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[13]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[14]: /fr/security/default_rules/#cat-cloud-siem
[15]: /fr/security/detection_rules/