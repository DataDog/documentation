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

1. Créer des incidents ou des événements avec un contexte détaillé dans ServiceNow à partir d'alertes Datadog
2. Synchroniser des métadonnées importantes telles que des services métier à partir de votre CMDB avec Datadog, et de vous en servir comme de tags dans l'ensemble de la plateforme Datadog pour regrouper et filtrer ainsi que pour créer des alertes
3. Créer des composants du système d'information (configuration items ou CI) dans la CMDB, pour les hosts découverts récemment à partir de Datadog


Datadog peut être intégré aux outils ServiceNow suivants :

- ITOM
- ITSM
- CMDB

**Remarque** : vous pouvez utiliser chacune des fonctionnalités de l'intégration de manière indépendante.


## Implémentation

Installez le dernier [ensemble de mise à jour Datadog][2] sur votre instance ServiceNow pour personnaliser les données que vous recevez sur ServiceNow et effectuer des transformations personnalisées de vos tables. Concrètement, l'[ensemble de mise à jour Datadog][2] crée :

* Un ensemble de tables temporaires pour vos notifications Datadog et les données de configuration à envoyer.
* Des [Transform Maps][4] vous permettant de contrôler comment les données sont mappées aux autres tables.

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

Importez l'[ensemble de mise à jour XML Datadog][2] fourni.

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="intégration servicenow" responsive="true">}}

Une fois le fichier XML téléchargé, l'état *Loaded* s'affiche. Cliquez sur le nom de l'ensemble de mise à jour pour afficher un aperçu et réaliser un commit du code dans le système.

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="intégration servicenow" responsive="true">}}

Affichez un aperçu de l'ensemble de mise à jour pour vérifier l'absence d'erreurs :

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="intégration servicenow" responsive="true">}}

Sélectionnez *Commit Update Set* pour fusionner l'application avec votre système :

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="intégration servicenow" responsive="true">}}

Vous devriez maintenant être en mesure de rechercher *Datadog* dans le menu de navigation et de voir les tables s'afficher :

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="intégration servicenow" responsive="true">}}

#### Ajouter Datadog comme source de découverte

Datadog doit être ajouté comme source de découverte pour être en mesure de faire correspondre et d'ajouter des CI dans la CMDB.
Accédez à *System Definition* > *Choice Lists* et créez une nouvelle entrée avec les valeurs suivantes :
 - **Table** : Configuration Item [cmdb_ci]
 - **Element** : discovery_source
 - **Label** : Datadog
 - **Value** : Datadog

{{< img src="integrations/servicenow/servicenow-cmdb-add-discovery-source.png" alt="Ajouter une source de découverte" responsive="true">}}

#### Vérifier les Transform Maps de l'Import Set

Datadog propose des Transform Maps qui créent des incidents et des composants du système d'information de CMDB. Chaque CMDB pouvant être différente, vérifiez la correspondance par défaut requise par votre CMDB.

Pour accéder aux Transform Maps :

1. Recherchez « Datadog Tables » ou « Import hosts ».
2. Choisissez une table dans la barre latérale.
3. Cliquez sur *Transform Maps* sous *Related Links*.

{{< img src="integrations/servicenow/servicenow-cmdb-navigate-to-transform-maps.png" alt="Accéder aux Transform Maps" responsive="true">}}

**Transform Maps pour les tables « Datadog Incident » et « Datadog Event »**

Les tables « Datadog Incident » et « Datadog Event » utilisent une Transform Map pour transformer les événements Datadog en incidents et événements correspondants dans ServiceNow.

**Transform Maps pour la table « Import hosts »**

La table « Import hosts » possède deux Transform Maps, une pour chaque profil pouvant être créé. Si vous utilisez Linux, le profil `cmdb_ci_linux_server` est créé (ou mis en correspondance avec un CI existant). Sinon, le profil `cmdb_ci_server` est utilisé comme solution alternative. Des Transform Maps supplémentaires peuvent être créées pour veiller à ce que le bon profil de configuration soit utilisé.

{{< img src="integrations/servicenow/servicenow-cmdb-transform-maps.png" alt="Transform Maps" responsive="true">}}

**Pour en savoir plus sur la modification ou la création de mappings et de transformations supplémentaires**, consultez la section « Définir des mappings personnalisés ».

### Entrer vos informations ServiceNow dans le carré d'intégration Datadog/ServiceNow

- Dans Datadog, accédez à la [page Integrations](https://app.datadoghq.com/account/settings#integrations) et localisez le [carré de l'intégration Datadog/ServiceNow][5].
- Ajoutez le nom de l'instance, à savoir uniquement le sous-domaine : *<NOM_INSTANCE>.service-now.com*.
- Ajoutez le nom d'utilisateur et le mot de passe de votre instance ServiceNow. Notez que vous pouvez créer un utilisateur limité dédié à Datadog dans ServiceNow.
- Dans le menu déroulant, sélectionnez la table intermédiaire vers à laquelle vous souhaitez envoyer les notifications.

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow" responsive="true">}}

#### Configurer les paramètres d'intégration Datadog pour CMDB

Pour activer la partie CMDB de l'intégration, vous devez suivre les étapes suivantes :

1. Accédez à votre compte ServiceNow.
2. Recherchez l'intégration Datadog.
3. Dans le menu, cliquez sur *Datadog Integration Settings*.
4. Activez l'option « Enable adding Datadog hosts into ServiceNow CMDB ».

Cela permet à Datadog d'envoyer les données de configuration à la CMDB ServiceNow. Vous pouvez ajouter des tags aux hosts qui ont été associés aux CI de la CMDB ServiceNow dans Datadog. Veuillez noter que l'option « Enable adding Datadog hosts into ServiceNow CMDB » doit être activée pour que la fonctionnalité de synchronisation de tag fonctionne.

Par défaut, aucun tag n'est synchronisé entre ServiceNow et Datadog. Trois sources de données différentes peuvent être utilisées comme tags :

- Les tags d'étiquette
- Les services métier liés au CI
- La liste des attributs des CI

Dans l'exemple de configuration ci-dessous, les tags d'étiquette et les services métier sont ajoutés comme tags, ainsi que les attributs `sys_id` et `sys_class_name`.

{{< img src="integrations/servicenow/servicenow-cmdb-dd-configuration-settings-2.png" alt="Paramètres de configuration de l'intégration" responsive="true">}}

**Règle AutoFlush de la table Import Host Datadog**

Pour empêcher la table Import Set « x_datad_datadog_import_host » d'accumuler un nombre trop important de lignes, une règle AutoFlush a été ajoutée dans le nettoyeur de table afin de conserver uniquement les données des dernières 24 heures. Ce paramètre de configuration peut être modifié en fonction de vos besoins. Pour ce faire, accédez à « sys_auto_flush_list.do », dans le navigateur de filtres, puis à la règle de la table « x_datad_datadog_import_host ». Vous pouvez alors modifier la valeur du champ « Age in seconds ».

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="Paramètres de configuration de l'intégration" responsive="true">}}

### Définir des mappings personnalisés

Cliquez sur *Datadog Incident Tables* (par exemple) et localisez le lien vers la Transform Map associée en bas de la page :

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="intégration servicenow" responsive="true">}}

#### Comprendre le mapping

Cliquez sur le nom de la Transform Map pour en afficher les détails :

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="intégration servicenow" responsive="true">}}

Deux champs importants se trouvent en haut de la page : *Source table* et *Target table*.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="intégration servicenow" responsive="true">}}

**Remarques :**

* La source désigne la table Import Set que vous avez sélectionnée (tables Datadog Incident), tandis que la cible (target) correspond à la table Incident (ou la table Event) dans laquelle les événements sont réellement stockés.

* Les mappings de champ se trouvent en bas de la page. Certains mappings de base sont compris. C'est à cet endroit que vous pouvez sélectionner les champs à inclure, définir le format et sélectionner les champs cibles dans votre instance ServiceNow.

#### Ajouter un nouveau mapping de champ

Cliquez sur *New* :

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="intégration servicenow" responsive="true">}}

Sélectionnez les champs source et cible pour les mappings un-à-un :

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="intégration servicenow" responsive="true">}}

Sinon, cochez la case *Use source script* et définissez les transformations :

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="intégration servicenow" responsive="true">}}

#### Définir plusieurs mappings rapidement

Utilisez *Mapping Assist* (sous Related Links) pour mapper plusieurs champs source et cible :

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="intégration servicenow" responsive="true">}}

#### Autorisations

L'utilisateur ServiceNow doit avoir les rôles *x_datad_datadog.user*, *import_set_loader* et *import_transformer* pour être en mesure d'accéder aux tables d'importation et d'appliquer correctement les Transform Maps.

Si vous utilisez l'ancienne méthode consistant à envoyer les notifications directement dans une table *Incident* ou *Event*, les autorisations *itil* et *evt_mgmt_integration* sont alors nécessaires.

### Validation

Pour vérifier que l'intégration est correctement configurée, ajoutez `@servicenow` dans une notification de monitor ou d'événement. Les données brutes remplissent les lignes dans la table temporaire et sont transmises à la table ServiceNow spécifiée dans les mappings et les transformations que vous avez créés.

## Dépannage

Si vous ne voyez pas d'événements dans vos tables ServiceNow :

- Si vous voyez un message d'erreur dans votre carré d'intégration Datadog ou une notification *Error while trying to post your ServiceNow instance* :
      - Vérifiez que vous avez uniquement utilisé le sous-domaine lorsque vous avez entré votre nom d'instance.
      - Vérifiez que l'utilisateur que vous avez créé bénéficie des autorisations nécessaires.
      - Vérifiez attentivement que le nom d'utilisateur et le mot de passe sont corrects.
- L'intégration est configurée, une alerte se déclenche, mais aucun ticket n'est créé :
     - Vérifiez que les données ont bien été envoyées dans la table temporaire. Si c'est bien le cas, le problème est lié aux mappings et aux transformations. Vous pouvez débuguer davantage vos mappings et vos scripts en accédez à *Transform Errors* dans ServiceNow.
      - Vérifiez que vous utilisez la table temporaire spécifiée dans le carré de l'intégration.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][6].

## Base de connaissances

### Générer des tickets d'assistance automatiquement à partir des alertes Datadog

Une fois que ServiceNow est connecté à votre compte Datadog, les alertes reçues peuvent automatiquement créer des tickets d'assistance et les envoyer dans la file d'attente de tickets ServiceNow. Votre équipe d'assistance est alors informée des problèmes à l'aide des workflows de communication que vous avez déjà établis dans ServiceNow. Mentionnez `@servicenow` dans le message d'alerte ou ajoutez `@servicenow` à la liste de notifications pour ce monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" responsive="true">}}

### Utiliser des variables dans la charge utile de ticket et les mappings de champ

Des variables peuvent être utilisées dans le corps de vos alertes ou dans les mappings de champ pour s'assurer que les détails de l'événement sont inclus dans ServiceNow. Par exemple, il est possible d'inclure le titre et la sévérité dans le champ ServiceNow approprié, ou encore d'ajouter un lien permettant de revenir vers l'incident spécifique dans Datadog directement depuis le ticket ServiceNow.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="Variables ServiceNow" responsive="true">}}

### Automatiser le workflow de résolution des tickets d'assistance

Une fois que l'état normal du monitor est rétabli, le ticket d'assistance associé est automatiquement considéré comme résolu.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="Ticket ServiceNow résolu" responsive="true">}}

### Envoyer des graphiques Datadog à ServiceNow

Outre l'automatisation de la création et de la résolution de tickets, vous pouvez également utiliser Datadog pour créer des tickets ServiceNow ponctuels lorsque vous identifiez un problème dans Datadog nécessitant l'attention de l'équipe. Cliquez sur l'icône en forme d'appareil photo pour partager un snapshot de n'importe quel graphique de timeboard, ajoutez du contexte dans la zone de commentaires pour aider vos collègues à interpréter le graphique et mentionnez @servicenow pour envoyer le graphique et vos commentaires à ServiceNow.

{{< img src="integrations/servicenow/servicenow-04-mention-servicenow.png" alt="annotation" responsive="true">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/monitors/notifications/?tab=is_alertis_warning#notification
[2]: https://s3.amazonaws.com/dd-servicenow-update-sets/Datadog-SNow_Update_Set_v2.0.0.xml
[3]: https://docs.servicenow.com/bundle/london-application-development/page/build/system-update-sets/concept/system-update-sets.html
[4]: https://docs.servicenow.com/bundle/london-platform-administration/page/script/server-scripting/concept/c_CreatingNewTransformMaps.html
[5]: https://app.datadoghq.com/account/settings#integrations/servicenow
[6]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}