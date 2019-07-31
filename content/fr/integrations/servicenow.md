---
categories:
  - issue tracking
ddtype: crawler
dependencies: []
description: Faites en sorte que vos alertes Datadog génèrent et mettent à jour automatiquement les tickets.
doc_link: 'https://docs.datadoghq.com/integrations/servicenow/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/'
    tag: Blog
    text: Créer des tickets ServiceNow à partir d'alertes Datadog
git_integration_title: servicenow
has_logo: true
integration_title: ServiceNow
is_public: true
kind: integration
manifest_version: '1.0'
name: servicenow
public_title: Intégration Datadog/ServiceNow
short_description: Faites en sorte que vos alertes Datadog génèrent et mettent à jour automatiquement les tickets.
version: '1.0'
---
## Présentation

ServiceNow est une plateforme de gestion informatique centralisée pour l'enregistrement, le suivi et la gestion des processus informatiques d'entreprise.

L'intégration Datadog/ServiceNow est une intégration bidirectionnelle qui vous permet de :

1. Créer des tickets à partir des monitors déclenchés dans Datadog avec la [fonction @notification][1]. Les *groupes d'affectation* sont automatiquement récupérés en tant que groupes `@notification` distincts lorsque l'intégration Datadog/ServiceNow est activée. Cette intégration vous permet également d'ajouter des commentaires et des graphiques générés par Datadog aux tickets ServiceNow, et de gérer le workflow de résolution depuis Datadog.
2. Envoyer les données de configuration Datadog à la CMDB, ce qui permet d'utiliser Datadog comme source de découverte pour ServiceNow. Des Transform Maps (Cartes de transformation) par défaut sont fournies pour contrôler la manière dont les données de configuration sont mises en relation ou ajoutées à la CMDB. Les Transform Maps peuvent également être personnalisées selon les besoins de la CMDB existante.
3. Récupérer les données de configuration d'éléments de configuration de la CMDB, tels que des attributs (service métier, tags et autres), pour ensuite les ajouter comme tags aux hosts Datadog.

## Implémentation

Installez le dernier [ensemble de mise à jour Datadog][2] sur votre instance ServiceNow pour personnaliser les données que vous recevez sur ServiceNow et effectuer des transformations personnalisées de vos tableaux. Concrètement, l'[ensemble de mise à jour Datadog][2] crée :

* Un ensemble de tableaux temporaires pour vos notifications Datadog et les données de configuration à envoyer.
* Des [Transform Maps][4] vous permettant de contrôler comment les données sont mappées aux autres tableaux.

### Installation

1. Installez l'[ensemble de mise à jour Datadog][2] dans ServiceNow.
2. Ajoutez Datadog comme source de découverte.
3. Vérifiez les Transform Maps de l'Import Set et définissez des mappings et des transformations supplémentaires.
4. Entrez vos informations ServiceNow dans le [carré d'intégration Datadog/ServiceNow][5].
5. Configurez les paramètres de l'intégration Datadog/ServiceNow pour synchroniser vos tags.

#### Installer l'ensemble de mise à jour Datadog

Dans ServiceNow :

- Recherchez *Update Set*.
- Cherchez *Retrieved Update Sets* dans le menu.
- Importez manuellement le fichier `Datadog-SNow_Update_Set_vX.X.X.xml`.

Importez l'[ensemble de mise à jour XML][2] Datadog fourni.
**Remarque :** si vous prévoyez d'utiliser la partie CMDB de l'intégration, contactez l'[équipe d'assistance Datadog](/help) pour recevoir le dernier ensemble de mise à jour XML Datadog.

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="intégration servicenow" responsive="true">}}

Une fois le fichier XML téléchargé, l'état *Loaded* s'affiche. Cliquez sur le nom de l'ensemble de mise à jour pour afficher un aperçu et réaliser un commit du code dans le système.

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="intégration servicenow" responsive="true">}}

Affichez un aperçu de l'ensemble de mise à jour pour vérifier l'absence d'erreurs :

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="intégration servicenow" responsive="true">}}

Sélectionnez *Commit Update Set* pour fusionner l'application avec votre système :

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="intégration servicenow" responsive="true">}}

Vous devriez maintenant être en mesure de rechercher *Datadog* dans le menu de navigation et de voir les tableaux s'afficher :

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="intégration servicenow" responsive="true">}}

#### Ajouter Datadog comme source de découverte

Datadog doit être ajouté comme source de découverte pour être en mesure de faire correspondre et d'ajouter des éléments de configuration dans la CMDB.
Accédez à *System Definition* > *Choice Lists* et créez une nouvelle entrée avec les valeurs suivantes :
 - **Table** : Configuration Item [cmdb_ci]
 - **Element** : discovery_source
 - **Label** : Datadog
 - **Value** : Datadog

{{< img src="integrations/servicenow/servicenow-cmdb-add-discovery-source.png" alt="Ajouter une source de découverte" responsive="true">}}

#### Vérifier les Transform Maps de l'Import Set

Datadog propose des Transform Maps qui créent des incidents et des éléments de configuration de CMDB. Chaque CMDB pouvant être différente, vérifiez correspondance par défaut requise par votre CMDB.

Pour accéder aux Transform Maps :

1. Recherchez « Datadog Tables » ou « Import hosts ».
2. Choisissez un tableau dans la barre latérale.
3. Cliquez sur *Transform Maps* sous *Related Links*.

{{< img src="integrations/servicenow/servicenow-cmdb-navigate-to-transform-maps.png" alt="Accéder aux Transform Maps" responsive="true">}}

**Transform Maps pour les tableaux « Datadog Incident » et « Datadog Event »**

Les tableaux « Datadog Incident » et « Datadog Event » utilisent une Transform Map pour transformer les événements Datadog en incidents et événements correspondants dans ServiceNow.

**Transform Maps pour le tableau « Import hosts »**

Le tableau « Import hosts » présente deux Transform Maps, une pour chaque profil qui peut être créé. Si le système d'exploitation est Linux, le profil `cmdb_ci_linux_server` est créé (ou mis en correspondance avec un élément de configuration existant). Sinon, le profil `cmdb_ci_server` est utilisé comme solution alternative. Des Transform Maps supplémentaires peuvent être créées pour veiller à ce que le bon profil de configuration soit utilisé.

{{< img src="integrations/servicenow/servicenow-cmdb-transform-maps.png" alt="Transform Maps" responsive="true">}}

**Pour en savoir plus sur la modification ou la création de mappings et de transformations supplémentaires**, consultez la section « Définir des mappings personnalisés ».

### Entrer vos informations ServiceNow dans le carré d'intégration Datadog/ServiceNow

- Dans Datadog, accédez à la [page Integrations](https://app.datadoghq.com/account/settings#integrations) et localisez le [carré de l'intégration Datadog/ServiceNow][5].
- Ajoutez le nom de l'instance, c'est-à-dire : *<NOM_INSTANCE>.service-now.com*.
- Ajoutez le nom d'utilisateur et le mot de passe pour votre instance ServiceNow. Notez que vous pouvez créer un utilisateur limité dédié à Datadog dans ServiceNow.
- Dans le menu déroulant, sélectionnez le tableau intermédiaire vers lequel vous souhaitez envoyer les notifications.

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow" responsive="true">}}

#### Configurer les paramètres d'intégration Datadog pour synchroniser les tags

Des tags peuvent être ajoutés aux hosts qui ont été mis en correspondance avec les éléments de configuration de la CMDB ServiceNow depuis Datadog. Pour les configurer :

1. Accédez à votre compte ServiceNow.

2. Recherchez l'intégration Datadog.
3. Dans le menu, cliquez sur *Datadog Integration Settings*.

Par défaut, aucun tag n'est synchronisé de ServiceNow à Datadog. Trois sources de données différentes peuvent être utilisées comme tags :

- Tags d'étiquette
- Les services métier liés à l'élément de configuration
- Une liste des attributs des éléments de configuration

Dans l'exemple de configuration ci-dessous, les tags d'étiquette et les services métier sont ajoutés comme tags. De plus, les attributs `sys_id` et `sys_class_name` seront également ajoutés comme tags.

{{< img src="integrations/servicenow/servicenow-cmdb-dd-configuration-settings.png" alt="Paramètres de configuration de l'intégration" responsive="true">}}


### Définir des mappings personnalisés

Cliquez sur *Datadog Incident Tables* (par exemple) et localisez le lien vers la Transform Map associée en bas de la page :

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="intégration servicenow" responsive="true">}}

#### Comprendre le mapping

Cliquez sur le nom de la Transform Map pour en afficher les détails :

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="intégration servicenow" responsive="true">}}

Deux champs importants se trouvent en haut de la page : *Source table* et *Target table*.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="intégration servicenow" responsive="true">}}

**Remarques :**

* La source est le tableau Import Set que vous avez sélectionné (tableaux Datadog Incident), tandis que la cible est le tableau d'incidents (ou le tableau d'événements) où les événements sont réellement stockés.

* Les mappings de champ se trouvent en bas de la page. Certains mappings de base sont compris. C'est là cet endroit que vous pouvez sélectionner les champs à inclure, définir le format et sélectionner les champs cibles dans votre instance ServiceNow.

#### Ajouter un nouveau mapping de champ

Cliquez sur *New* :

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="intégration servicenow" responsive="true">}}

Sélectionnez les champs source et cible pour les mappings un-à-un :

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="intégration servicenow" responsive="true">}}

Ou cochez la case *Use source script* et définissez les transformations :

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="intégration servicenow" responsive="true">}}

#### Définir plusieurs mappings rapidement

Utilisez *Mapping Assist* (sous Related Links) pour mapper plusieurs champs source et cible :

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="intégration servicenow" responsive="true">}}

#### Autorisations

L'utilisateur ServiceNow doit avoir les rôles *x_datad_datadog.user*, *import_set_loader* et *import_transformer* pour être en mesure d'accéder aux tableaux d'importation et d'appliquer correctement les Transform Maps.

Si vous utilisez l'ancienne méthode consistant à envoyer les notifications directement dans un *Incident Table* ou un *Event Table*, les autorisations *itil* et *evt_mgmt_integration* sont alors nécessaires.

### Validation

Pour vérifier que l'intégration est correctement configurée, ajoutez `@servicenow` dans un monitor ou une notification d'événement. Les donnée brutes remplissent les lignes dans le tableau temporaire et sont renvoyées au tableau ServiceNow spécifié dans les mappings et les transformations que vous avez créés.

## Dépannage

Si vous ne voyez pas d'événements dans vos tableaux ServiceNow :

- Si vous voyez un message d'erreur dans votre carré d'intégration Datadog ou une notification *Error while trying to post your ServiceNow instance* :
      - Vérifiez que vous avez uniquement utilisé le sous-domaine lorsque vous avez entré votre nom d'instance.
      - Vérifiez que l'utilisateur que vous avez créé bénéficie des autorisations nécessaires.
      - Vérifiez attentivement que le nom d'utilisateur et le mot de passe sont corrects.
- L'intégration est configurée, une alerte se déclenche, mais aucun ticket n'est créé :
     - Vérifiez que les données ont bien été envoyées dans le tableau temporaire. Si c'est bien le cas, le problème est lié aux mappings et aux transformations. Vous pouvez débuguer davantage vos mappings et vos scripts en accédez à *Transform Errors* dans ServiceNow.
      - Vérifiez que vous utilisez le tableau temporaire spécifié dans le carré de l'intégration.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][6].

## Base de connaissances

### Générer des tickets d'assistance automatiquement à partir des alertes Datadog

Une fois que ServiceNow est connecté à votre compte Datadog, les alertes reçues peuvent automatiquement créer des tickets d'assistance et les envoyer dans la file d'attente de tickets ServiceNow. Votre équipe d'assistance est alors notifiée des problèmes à l'aide des workflows de communication que vous avez déjà établis dans ServiceNow. Mentionnez `@servicenow` dans le message d'alerte ou ajoutez `@servicenow` à la liste de notification pour ce monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" responsive="true">}}

### Utiliser des variables dans la charge utile de ticket et les mappings de champ

Des variables peuvent être utilisées dans le corps de vos alertes ou dans les mappings de champ pour s'assurer que les détails de l'événement sont inclus dans ServiceNow. Par exemple, il est possible d'inclure le titre et la sévérité dans le champ ServiceNow approprié, ou encore d'ajouter un lien permettant de revenir vers l'incident spécifique dans Datadog directement depuis le ticket ServiceNow.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="Variables ServiceNow" responsive="true">}}

### Automatiser le workflow de résolution du ticket d'assistance

Une fois que le monitor retourne à l'état normal, le ticket d'assistance associé est automatiquement marqué comme « resolved ».

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="Ticket ServiceNow résolu" responsive="true">}}

### Envoyer des graphiques Datadog à ServiceNow

Outre l'automatisation de la création et de la résolution de ticket, vous pouvez également utiliser Datadog pour créer des tickets ServiceNow ponctuels lorsque vous voyez quelque chose dans Datadog qui nécessite l'attention de l'équipe. Cliquez sur l'icône en forme d'appareil photo pour partager un snapshot de n'importe quel graphique de Timeboard, ajoutez du contexte dans la zone de commentaires pour aider vos collègues à interpréter le graphique et mentionnez @servicenow pour envoyer le graphique et vos commentaires à ServiceNow.

{{< img src="integrations/servicenow/servicenow-04-mention-servicenow.png" alt="annotation" responsive="true">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/monitors/notifications/?tab=is_alertis_warning#notification
[2]: https://s3.amazonaws.com/dd-servicenow-update-sets/Datadog-SNow_Update_Set_v1.4.0.xml
[3]: https://docs.servicenow.com/bundle/london-application-development/page/build/system-update-sets/concept/system-update-sets.html
[4]: https://docs.servicenow.com/bundle/london-platform-administration/page/script/server-scripting/concept/c_CreatingNewTransformMaps.html
[5]: https://app.datadoghq.com/account/settings#integrations/servicenow
[6]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}