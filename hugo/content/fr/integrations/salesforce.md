---
categories:
- cloud
- network
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
custom_kind: integration
manifest_version: '1.0'
name: salesforce
public_title: Salesforce
short_description: Recueillez des événements de la plateforme Salesforce en temps
  réel et convertissez-les en logs Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Salesforce fournit des services de gestion de la relation client ainsi qu'une suite d'applications professionnelles complémentaires axées sur le service client, l'automatisation marketing, l'analytique et le développement d'applications.

Intégrez Salesforce à Datadog pour :

- Consulter et parser vos logs à l'aide de la solution [Log Management de Datadog][1]
- Définir des [monitors][2] sur les [événements][3] de votre plateforme Salesforce
- Tirer profit de la [plateforme de sécurité][4] de Datadog afin de surveiller et de détecter les menaces dans toute votre plateforme Salesforce
- Surveiller votre utilisation de l'API Salesforce afin de vérifier que vous respectez les limites associées

## Implémentation

### Installation

Aucune installation n'est requise.

### Configuration

Pour configurer Salesforce de façon à envoyer des données à Datadog, vous devez accéder à la fonctionnalité de [surveillance des événements Salesforce][5], activer le stockage de vos événements Salesforce, puis connecter votre organisation Salesforce à Datadog.

#### Autorisations

Si vous utilisez [Salesforce Shield][6], vous disposez des autorisations requises pour tous les événements. Si vous n'utilisez pas Shield, vous aurez besoin de l'[extension de surveillance des événements][7].

#### Activer le stockage des événements

Si vous comptez utiliser la plateforme ou les événements en temps réel, vous devez activer cette option dans le gestionnaire des événements. Cette étape n'est pas requise pour les événements issus des fichiers journaux d'événements.

1. [Connectez-vous][8] à votre compte Salesforce (à l'aide de l'interface Lightning).
2. Recherchez **Event Manager**.
3. Sur la page Event Manager, pour chaque événement que vous souhaitez recueillir, faites un clic droit et sélectionnez **Enable Storage**. Il n'est pas nécessaire de sélectionner **Enable Streaming**.
La liste des événements pris en charge est disponible dans la section **Platform Events** depuis l'onglet **Configuration** du [carré d'intégration Salesforce][9].

#### Connecter votre organisation

1. Créez un compte système unique dans votre organisation Salesforce.
2. Cliquez sur **New Production Org** ou **New Sandbox Org** depuis l'onglet **Configuration** du [carré d'intégration Salesforce][9].
3. Définissez les tags personnalisés que vous souhaitez associer à ces événements sous forme de liste séparée par des virgules. Vous pouvez choisir les événements à activer.

    {{< img src="integrations/salesforce/salesforce-1.png" alt="L'écran confirmant que l'organisation Salesforce a été configurée sur Datadog" popup="true" style="width:90%" >}}

4. Cliquez sur **Save**. Vous êtes alors invité à vous connecter à votre compte Salesforce et à accorder les autorisations d'accès à Datadog. 
5. Une fois le processus de connexion terminé, retournez sur le [carré d'intégration Salesforce][9] dans Datadog. Votre organisation inclut des tags par défaut prêts à l'emploi.

    {{< img src="integrations/salesforce/salesforce-default-tags.png" alt="L'écran confirmant que l'organisation Salesforce a été configurée sur Datadog" popup="true" style="width:90%" >}}

6. Sélectionnez les tags que vous souhaitez utiliser et cliquez sur **Connect**. 
7. Répétez ces étapes pour connecter vos autres organisations. Vous devez avoir accès aux organisations que vous souhaitez ajouter.

**Remarque** : un tag par défaut est ajouté à votre ID d'organisation Salesforce. Vous pouvez néanmoins [modifier les tags][10] afin d'afficher des informations plus pertinentes pour votre entreprise.

#### Résultats

Après un certain temps, les [logs][1] commencent à apparaître depuis la source `salesforce`. Salesforce écrit les fichiers journaux d'événements à intervalles peu réguliers, ce qui signifie qu'il peut s'écouler une heure ou plus avant que les événements basés sur les fichiers journaux d'événements n'apparaissent dans Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "salesforce" >}}


### Événements

Pour découvrir la liste complète des événements de log, consultez les sections [Stockage des données de la surveillance des événements en temps réel][12] et [Événements EventLogFile][13] (en anglais).

### Checks de service

L'intégration Salesforce n'inclut aucun check de service.

## Dépannage

Si l'erreur `The authenticated connection does not have access` s'affiche dans l'onglet Configuration, vous ne disposez peut-être pas des autorisations d'accès aux événements demandés. Vous pouvez temporairement activer les autorisations admin pour le rôle Datadog dans Salesforce afin de vérifier qu'il vous manque bien des autorisations.

Besoin d'aide ? Contactez [l'assistance Datadog][14].

[1]: /fr/logs/
[2]: /fr/monitors/monitor_types/
[3]: /fr/events/
[4]: /fr/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://www.salesforce.com/editions-pricing/platform/shield
[7]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[8]: https://login.salesforce.com/
[9]: https://app.datadoghq.com/account/settings#integrations/salesforce
[10]: /fr/getting_started/tagging/using_tags/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/salesforce/salesforce_metadata.csv
[12]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[13]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[14]: https://docs.datadoghq.com/fr/help/