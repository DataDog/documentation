---
categories:
- cloud
dependencies: []
description: Recueille des métriques sur les connecteurs et les clusters Kafka depuis
  Confluent Cloud.
doc_link: https://docs.datadoghq.com/integrations/confluent_cloud/
draft: false
git_integration_title: confluent_cloud
has_logo: true
integration_id: ''
integration_title: Confluent Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: confluent_cloud
public_title: Intégration Datadog/Confluent Cloud
short_description: Recueille des métriques sur les connecteurs et les clusters Kafka
  depuis Confluent Cloud.
team: web-integrations
version: '1.0'
---

## Présentation

{{< site-region region="gov" >}}
**L'intégration Confluent Cloud n'est pas prise en charge pour le site {{< region-param key="dd_site_name" >}} Datadog**.
{{< /site-region >}}


Associez Datadog à Confluent Cloud pour visualiser les métriques sur les clusters Kafka par rubrique ainsi que les métriques sur les connecteurs Kafka. Vous pouvez créer des monitors et des dashboards à partir de ces métriques.

## Configuration

### Installation

Installez l'intégration avec le [carré d'intégration Confluent Cloud de Datadog][1].

### Configuration

1. Dans le carré d'intégration, accédez à l'onglet **Configuration**.
2. Cliquez sur **+ Add API Key** pour saisir votre [clé d'API et votre secret d'API Confluent Cloud](#clé-et-secret-d-api).
3. Cliquez sur **Save**. Datadog recherche alors tous les comptes associés aux informations fournies.
4. Ajoutez votre [ID de cluster](id-de-cluster) ou votre [ID de connecteur](#id-de-connecteur) Confluent Cloud. Datadog récupère les métriques Confluent Cloud et les affiche après quelques minutes.

#### Clé et secret d'API

Pour créer votre clé et votre secret d'API Confluent Cloud, consultez la rubrique [Ajouter le rôle MetricsViewer à un nouveau compte de service dans l'interface][2] (en anglais).

#### ID de cluster

Pour récupérer votre ID de cluster Confluent Cloud, procédez comme suit :

1. Dans Confluent Cloud, accédez à **Environment Overview** et sélectionnez le cluster à surveiller.
2. Depuis la navigation de gauche, cliquez sur **Cluster overview** > **Cluster settings**.
3. Sous **Identification**, copiez l'ID de cluster commençant par `lkc`.

#### ID de connecteur

Pour récupérer votre ID de connecteur Confluent Cloud, procédez comme suit :

1. Dans Confluent Cloud, accédez à **Environment Overview** et sélectionnez le cluster à surveiller.
2. Depuis la navigation de gauche, cliquez sur **Data integration** > **Connectors**.
3. Sous **Connectors**, copiez l'ID de connecteur commençant par `lcc`.

## Dashboards

Une fois l'intégration configurée, utilisez le dashboard Confluent Cloud prêt à l'emploi pour consulter une vue d'ensemble de vos métriques sur les clusters et connecteurs Kafka.

Par défaut, toutes les métriques recueillies à partir de Confluent Cloud sont affichées.

## Données collectées

### Métriques
{{< get-metrics-from-git "confluent_cloud" >}}


### Événements

L'intégration Confluent Cloud n'inclut aucun événement.

### Checks de service

L'intégration Confluent Cloud n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://app.datadoghq.com/account/settings#integrations/confluent-cloud
[2]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/