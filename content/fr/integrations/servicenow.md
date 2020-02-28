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
1. Synchroniser des métadonnées importantes telles que des services métier à partir de votre CMDB avec Datadog, et de vous en servir comme de tags dans l'ensemble de la plateforme Datadog pour regrouper et filtrer ainsi que pour créer des alertes
1. Créer des éléments de configuration (configuration items ou CI)  serveur dans la CMDB, pour les hosts découverts récemment à partir de Datadog

Datadog peut être intégré aux outils ServiceNow suivants :

- ITOM
- ITSM
- CMDB

**Remarque** : chacun de ces modules ServiceNow peut être utilisé de façon indépendante avec l'intégration. Par exemple, vous pouvez utiliser ITSM sans CMDB.

## Implémentation

Pour utiliser l'un des modules, commencez par installer le dernier [ensemble de mise à jour de Datadog][1] sur votre instance ServiceNow, puis configurez le carré d'intégration ServiceNow dans Datadog.

1. [Installer le dernier ensemble de mise à jour Datadog](#install-the-datadog-update-set)
1. [Définir les autorisations du compte Datadog](#permissions)
1. [Instructions pour CMDB](#configuring-integration-for-use-with-the-cmdb)
1. [Instructions pour ITOM et ITSM](#configuring-for-use-with-itom-and-itsm-modules)

### Installer l'ensemble de mise à jour Datadog

Dans ServiceNow :

- Recherchez _Update Set_.
- Cherchez _Retrieved Update Sets_ dans le menu.
- Importez manuellement le fichier `Datadog-SNow_Update_Set_vX.X.X.xml`.

Importez l'[ensemble de mise à jour XML Datadog][1] fourni.

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="intégration servicenow" >}}

Une fois le fichier XML téléchargé, l'état _Loaded_ s'affiche. Cliquez sur le nom de l'ensemble de mise à jour pour afficher un aperçu et réaliser un commit du code dans le système.

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="intégration servicenow" >}}

Affichez un aperçu de l'ensemble de mise à jour pour vérifier l'absence d'erreurs :

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="intégration servicenow" >}}

Sélectionnez _Commit Update Set_ pour fusionner l'application avec votre système :

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="intégration servicenow" >}}

Vous devriez maintenant être en mesure de rechercher _Datadog_ dans le menu de navigation et de voir les tables s'afficher :

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="intégration servicenow" >}}

### Autorisations

Pour accéder aux tables d'importation et appliquer des transform maps, l'utilisateur ServiceNow doit disposer des autorisations suivantes :

- _x_datad_datadog.user_
- _import_set_loader_
- _import_transformer_

Pour les utilisateurs d'ITOM et ITSM :

Si vous souhaitez envoyer des notifications directement dans une table _Incident_ ou _Event_, les rôles _ITIL_ et _evt_mgmt_integration_ sont alors nécessaires.

### Configuration de l'intégration pour CMDB

Nous partons du principe que vous avez déjà installé le dernier ensemble de mise à jour Datadog. Si ce n'est pas le cas, consultez les instructions d'[installation du dernier ensemble de mise à jour](#installer-le-dernier-ensemble-de-mise-à-jour-Datadog).

**Ajoutez Datadog en tant que source de découverte afin d'associer les CI et de les ajouter à la CMDB.**

1. Dans ServiceNow, accédez à _System Definitions > Choice Lists_ et créez une nouvelle entrée avec les valeurs suivantes :

    - **Table** : Configuration Item [cmdb_ci]
    - **Element** : discovery_source
    - **Label** : Datadog
    - **Value** : Datadog

    {{< img src="integrations/servicenow/servicenow-cmdb-add-discovery-source.png" alt="Ajouter une source de découverte" >}}

2. Recherchez l'intégration Datadog, puis cliquez sur _Datadog Integration Settings_ dans le menu.
3. Activez le paramètre suivant : _Enable adding Datadog hosts into ServiceNow CMDB_.

    - Cela permet à Datadog d'envoyer les données de configuration à la CMDB ServiceNow. Vous pouvez ajouter des tags aux hosts qui ont été associés aux CI de la CMDB ServiceNow dans Datadog. **Remarque** : l'option « Enable adding Datadog hosts into ServiceNow CMDB » doit être activée pour que la fonctionnalité de synchronisation de tag fonctionne.

    - Par défaut, aucun tag n'est synchronisé entre ServiceNow et Datadog. Trois sources de données différentes peuvent être utilisées pour les tags :

      - Labels
      - Business Services
      - Configuration Item (CI) attributes

    - Dans l'exemple de configuration ci-dessous, les étiquettes et les services métiers sont ajoutés en tant que tags, ainsi que les attributs `sys_id` and `sys_class_name`

    {{< img src="integrations/servicenow/servicenow-cmdb-dd-configuration-settings-2.png" alt="Paramètres de configuration de l'intégration" >}}

4. Vous pouvez personnaliser la fréquence d'écriture des données sur votre CMDB en [modifiant votre règle Autoflush](#regle-autoflush-de-la-table-import-host-datadog).
5. Il est également possible de personnaliser les entrées dans la CMDB en [configurant des transform maps personnalisées](#personnaliser-les-donnees-avec-des-transform-maps).
6. [Configurer le carré d'intégration ServiceNow dans Datadog](#configure-the-servicenow-tile-in-datadog)

### Configuration pour l'utilisation des modules ITOM et ITSM

Les notifications Datadog mentionnant @servicenow remplissent les tables intermédiaires sélectionnées dans votre carré ServiceNow. Veuillez noter que pour les étapes décrites ci-dessous, nous partons du principe que vous avez déjà configuré le carré d'intégration dans la page d'intégrations Datadog. Procédez ainsi comme suit :

1. Depuis la liste déroulante, sélectionnez la table intermédiaire vers laquelle vous souhaitez envoyer les notifications.
2. Pour vérifier que l'intégration est correctement configurée, ajoutez @servicenow dans une notification de monitor ou dans un commentaire d'événement. Les données brutes remplissent les lignes de la table temporaire et sont transmises à la table ServiceNow spécifiée dans les mappings et les transformations que vous avez créés.
3. [Utilisez des transform maps](#personnaliser-les-donnees-avec-des-transform-maps) pour personnaliser le format des données envoyées aux tables.
4. [Configurer le carré d'intégration ServiceNow dans Datadog](#configure-the-servicenow-tile-in-datadog)

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow">}}

### Configurer le carré d'intégration ServiceNow dans Datadog

1. Accédez au [carré d'intégration ServiceNow][2] Datadog, depuis la page Integrations.
2. Ajoutez le nom de l'instance, à savoir le sous-domaine de votre domaine ServiceNow : `<NOM_INSTANCE>.service-now.com`.
3. Ajoutez le nom d"utilisateur et le mot de passe de votre instance ServiceNow. Si vous utilisez le module ITSM ou ITOM et souhaitez envoyer des notifications à une table intermédiaire, sélectionnez-la dans la liste déroulante.

**Remarque** : vous pouvez créer un utilisateur limité dédié à Datadog dans ServiceNow.

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow">}}

### Personnaliser les données avec des transform maps

**Pour CMDB**

Datadog propose des transform maps qui créent des incidents et des éléments de configuration de la CMDB. Chaque CMDB pouvant être différente, vérifiez la correspondance par défaut requise par votre CMDB.

Pour accéder aux transform maps :

1. Recherchez _Datadog Tables_ ou _Import hosts_.
2. Choisissez une table dans la barre latérale.
3. Cliquez sur _Transform Maps_ sous _Related Links_.

{{< img src="integrations/servicenow/servicenow-cmdb-navigate-to-transform-maps.png" alt="Accéder aux transform maps" >}}

La table « Import hosts » possède deux transform maps, une pour chaque profil pouvant être créé. Si vous utilisez Linux, le profil `cmdb_ci_linux_server` est créé (ou mis en correspondance avec un CI existant). Sinon, le profil `cmdb_ci_server` est utilisé comme solution alternative. Des transform maps supplémentaires peuvent être créées pour veiller à ce que le bon profil de configuration soit utilisé.

{{< img src="integrations/servicenow/servicenow-cmdb-transform-maps.png" alt="Transform maps" >}}

Pour en savoir plus sur la modification ou la création de mappings et de transformations supplémentaires, consultez la section [Définir des mappings personnalisés](#definir-des-mappings-personnalises).

**Pour ITOM et ITSM**

Les tables _Datadog Incident_ et _Datadog Event_ utilisent une transform map pour transformer les événements Datadog en incidents et événements correspondants dans ServiceNow.

## Dépannage

Si aucun événement n'apparaît dans vos tables ServiceNow, et que :

- Vous voyez un message d'erreur dans votre carré d'intégration Datadog ou une notification _Error while trying to post your ServiceNow instance_ :

  - Vérifiez que seul le sous-domaine a été indiqué pour le nom de votre instance.
  - Vérifiez que l'utilisateur créé dispose des autorisations requises.
  - Vérifiez que le nom d'utilisateur et le mot de passe sont corrects.

- L'intégration est configurée, une alerte se déclenche, mais aucun ticket n'est créé :

  - Vérifiez que la table temporaire contient bien les données. Si c'est bien le cas, le problème est lié aux mappings et aux transformations. Vous pouvez débuguer vos mappings et scripts en accédant à _Transform Errors_ dans ServiceNow.
  - Vérifiez que vous utilisez la table intermédiaire spécifiée dans le carré.

  L'utilisateur ServiceNow doit posséder les rôles rest_service et x_datad_datadog.user afin de pouvoir accéder aux tables d'importation. Si vous utilisez l'ancienne méthode consistant à envoyer les notifications directement à la table Incident ou Event, les autorisations itil et evt_mgmt_integration sont alors nécessaires.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][3].

## Base de connaissances

### Règle Autoflush de la table Import Host

Pour empêcher la table Import Set _x_datad_datadog_import_host_ d'accumuler un nombre trop important de lignes, une règle AutoFlush a été ajoutée dans le nettoyeur de table afin de conserver uniquement les données des dernières 24 heures. Ce paramètre de configuration peut être modifié en fonction de vos besoins. Pour ce faire, accédez à _sys_auto_flush_list.do_ dans le navigateur de filtres, puis à la règle de la table _x_datad_datadog_import_host_. Vous pouvez alors modifier la valeur du champ *Age in seconds*.

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="Paramètres de configuration de l'intégration" >}}

### Générer des tickets d'assistance automatiquement à partir des alertes Datadog

Une fois que ServiceNow est connecté à votre compte Datadog, les alertes reçues peuvent automatiquement créer des tickets d'assistance et les envoyer dans la file d'attente de tickets ServiceNow. Votre équipe d'assistance est alors informée des problèmes à l'aide des workflows de communication que vous avez déjà établis dans ServiceNow. Mentionnez `@servicenow` dans le message d'alerte ou ajoutez `@servicenow` à la liste de notifications pour ce monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### Utiliser des variables dans la charge utile de ticket et les mappings de champ

Des variables peuvent être utilisées dans le corps de vos alertes ou dans les mappings de champ pour s'assurer que les détails de l'événement sont inclus dans ServiceNow. Par exemple, il est possible d'inclure le titre et la sévérité dans le champ ServiceNow approprié, ou encore d'ajouter un lien permettant de revenir vers l'incident spécifique dans Datadog directement depuis le ticket ServiceNow.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="Variables ServiceNow" >}}

### Automatiser le workflow de résolution des tickets d'assistance

Une fois que l'état normal du monitor est rétabli, le ticket d'assistance associé est automatiquement considéré comme résolu.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="Ticket ServiceNow résolu" >}}

### Envoyer des graphiques Datadog à ServiceNow

Outre l'automatisation de la création et de la résolution de tickets, vous pouvez utiliser Datadog pour créer des tickets ServiceNow ponctuels lorsque vous identifiez un problème dans Datadog nécessitant l'attention de l'équipe. Cliquez sur l'icône en forme d'appareil photo pour partager un snapshot de n'importe quel graphique de timeboard, ajoutez du contexte dans la zone de commentaires et mentionnez @servicenow pour envoyer le graphique et vos commentaires à ServiceNow.

{{< img src="integrations/servicenow/servicenow-04-mention-servicenow.png" alt="annotation" >}}

### Définir des mappings personnalisés

Cliquez sur _Datadog Incident Tables_ (par exemple) et localisez le lien vers la Transform Map associée en bas de la page :

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="intégration servicenow" >}}

### Comprendre le mapping

Cliquez sur le nom de la transform map pour en afficher les détails :

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="intégration servicenow" >}}

Deux champs importants se trouvent en haut de la page : _Source table_ et _Target table_.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="intégration servicenow" >}}

**Remarques :**

- La source désigne la table Import Set que vous avez sélectionnée (tables Datadog Incident), tandis que la cible (target) correspond à la table Incident (ou la table Event) dans laquelle les événements sont réellement stockés.
- Les mappings de champ se trouvent en bas de la page. Certains mappings de base sont compris. C'est à cet endroit que vous pouvez sélectionner les champs à inclure, définir le format et sélectionner les champs cibles dans votre instance ServiceNow.

### Ajouter un nouveau mapping de champ

Cliquez sur _New_ :

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="intégration servicenow" >}}

Sélectionnez les champs source et cible pour les mappings un à un :

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="intégration servicenow" >}}

Sinon, cochez la case _Use source script_ et définissez les transformations :

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="intégration servicenow" >}}

### Définir plusieurs mappings

Utilisez _Mapping Assist_ (sous Related Links) pour mapper plusieurs champs source et cible :

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="intégration servicenow" >}}

### Validation

Pour vérifier que l'intégration est correctement configurée, ajoutez `@servicenow` dans une notification de monitor ou d'événement. Les données brutes remplissent les lignes dans la table temporaire et sont transmises à la table ServiceNow spécifiée dans les mappings et les transformations que vous avez créés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://s3.amazonaws.com/dd-servicenow-update-sets/Datadog-SNow_Update_Set_v2.0.0.xml
[2]: https://app.datadoghq.com/account/settings#integrations/servicenow
[3]: https://docs.datadoghq.com/fr/help