---
categories:
- monitoring
- network
- cloud
ddtype: crawler
dependencies: []
description: Recueillez des événements de la plateforme Salesforce en temps réel et
  convertissez-les en logs Datadog.
doc_link: https://docs.datadoghq.com/integrations/salesforce/
draft: false
git_integration_title: salesforce
has_logo: true
integration_id: ''
integration_title: Salesforce
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: salesforce
public_title: Salesforce
short_description: Recueillez des événements de la plateforme Salesforce en temps
  réel et convertissez-les en logs Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Salesforce fournit des services de gestion de la relation client ainsi qu'une suite d'applications professionnelles complémentaires axées sur le service client, l'automatisation marketing, l'analytique et le développement d'applications. Intégrez Salesforce à Datadog pour : 

- Consulter et parser vos logs à l'aide des [fonctionnalités de logs de Datadog][1]
- Définir des [monitors][2] sur les [événements][3] de votre plateforme Salesforce
- Tirer profit de la [plateforme de sécurité][4] de Datadog afin de surveiller et de détecter les menaces dans toute votre plateforme Salesforce
- Surveiller votre utilisation de l'API Salesforce afin de vérifier que vous respectez les limites associées

## Configuration

### Installation

Aucune installation n'est requise.

### Procédure à suivre

Pour configurer Salesforce de façon à envoyer des données à Datadog, vous devez accéder à la fonctionnalité de [surveillance des événements Salesforce][5], activer le stockage de vos événements Salesforce, puis connecter votre organisation Salesforce à Datadog.

#### Activer le stockage des événements

1. [Connectez-vous][6] à votre compte Salesforce (à l'aide de l'interface Lightning).
2. Recherchez « Event Manager ».
3. Depuis la page Event Manager, pour chaque événement à recueillir, cliquez sur la flèche vers la droite, puis choisissez Enable Storage.

#### Connecter votre organisation

1. Cliquez sur **Connect a Salesforce org** depuis l'onglet Configuration du [carré d'intégration Salesforce][7].
2. Vous êtes alors redirigé vers la page de connexion de Salesforce, afin d'accorder des autorisations d'accès à Datadog. Suivez les instructions affichées à l'écran.
3. Une fois cette étape terminée, revenez au [carré d'intégration Salesforce][7] dans Datadog. Vous devriez à présent voir que l'installation est installée et que votre organisation est connectée avec les tags fournis par défaut :
    {{< img src="integrations/salesforce/salesforce.png" alt="L'écran confirmant que l'organisation Salesforce a été configurée sur Datadog" popup="true">}}
4. Répétez les étapes précédentes pour chacune des organisations que vous souhaitez connecter. Vous devez avoir accès aux différentes organisations avec les identifiants que vous utilisez pour vous connecter.

**Remarque** : un tag par défaut est ajouté à votre ID d'organisation Salesforce. Vous pouvez néanmoins [modifier les tags][8] afin d'afficher des informations plus pertinentes pour votre entreprise.

#### Résultats

Patientez cinq minutes le temps que les [logs][1] soient transmis depuis la source `salesforce`.

## Données collectées

### Métriques
{{< get-metrics-from-git "salesforce" >}}


### Événements

Pour découvrir la liste complète des événements de log, consultez la section [Stockage des données de la surveillance des événements en temps réel][10] (en anglais).

### Checks de service

L'intégration Salesforce n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: /fr/logs/
[2]: /fr/monitors/monitor_types/
[3]: /fr/events/
[4]: /fr/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://login.salesforce.com/
[7]: https://app.datadoghq.com/account/settings#integrations/salesforce
[8]: /fr/getting_started/tagging/using_tags/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/salesforce/salesforce_metadata.csv
[10]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[11]: https://docs.datadoghq.com/fr/help/