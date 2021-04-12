---
categories:
  - issue tracking
  - notification
ddtype: crawler
dependencies: []
description: Faites en sorte que vos alertes Datadog génèrent et mettent à jour automatiquement les tickets.
doc_link: 'https://docs.datadoghq.com/integrations/servicenow/'
draft: false
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
1. Créer des éléments de configuration (configuration items ou CI) de serveur dans CMDB pour les hosts découverts récemment à partir de Datadog à l'aide du [Service Graph Connector pour Datadog][1].

Datadog peut être intégré aux outils ServiceNow suivants :

- ITOM
- ITSM
- CMDB

## Configuration de la CMDB

### Configuration du Service Graph Connector

Le [Service Graph Connector pour Datadog][1] peut remplir automatiquement les éléments de configuration (CI) de serveur et de base de données dans la CMDB pour les nouvelles ressources découvertes par Datadog. Le Service Graph Connector est disponible dans le [ServiceNow Store][2].

Pour la configuration, suivez les instructions détaillées du Service Graph Connector.

Types d'éléments de configuration pris en charge :
* Serveur
* Amazon RDS

Les remarques ci-dessous s'appliquent uniquement si vous avez déjà configuré l'intégration pour ServiceNow ITOM/ITSM : 

* Le Service Graph Connector n'utilise pas les valeurs `Target table` et `Custom table` provenant du carré de configuration. Vous pouvez enregistrer l'intégration avec les valeurs Target table par défaut.
* Le même utilisateur ITOM/ITSM peut être utilisé pour le Service Graph Connector en accordant à cet utilisateur le rôle cmdb_import_api_admin, comme décrit dans les instructions de configuration du Service Graph Connector.

## Configuration d'ITOM et ITSM

Pour utiliser l'un des modules, commencez par installer le dernier [ensemble de mise à jour de Datadog][3] sur votre instance ServiceNow, puis configurez le carré d'intégration ServiceNow dans Datadog.

1. [Installer le dernier ensemble de mise à jour Datadog](#install-the-datadog-update-set)
1. [Définir les autorisations du compte Datadog](#permissions)
1. [Instructions pour ITOM et ITSM](#configuring-for-use-with-itom-and-itsm-modules)

### Installer l'ensemble de mise à jour Datadog

Dans ServiceNow :

- Recherchez **Update Set**.
- Cherchez **Retrieved Update Sets** dans le menu.
- Importez manuellement le fichier `Datadog-SNow_Update_Set_vX.X.X.xml`.

Importez l'[ensemble de mise à jour XML Datadog][3] fourni.

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="intégration servicenow" >}}

Une fois le fichier XML importé, l'état `Loaded` s'affiche. Cliquez sur le nom de l'ensemble de mise à jour pour afficher un aperçu et réaliser un commit du code dans le système.

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="intégration servicenow" >}}

Affichez un aperçu de l'ensemble de mise à jour pour vérifier l'absence d'erreurs :

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="intégration servicenow" >}}

Sélectionnez **Commit Update Set** pour fusionner l'application avec votre système :

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="intégration servicenow" >}}

Vous devriez maintenant être en mesure de rechercher **Datadog** dans le menu de navigation et de voir les tables s'afficher :

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="intégration servicenow" >}}

### Autorisations

Pour accéder aux tables d'importation et appliquer des transform maps, l'utilisateur ServiceNow doit disposer des autorisations suivantes :

- `x_datad_datadog.user`
- `import_set_loader`
- `import_transformer`

Si vous souhaitez envoyer des notifications directement dans une table **Incident** ou **Event**, les rôles `ITIL` et `evt_mgmt_integration` sont alors nécessaires.

### Configuration de Datadog pour l'utilisation des modules ITOM et ITSM

Les notifications Datadog mentionnant @servicenow remplissent les tables intermédiaires sélectionnées dans votre carré ServiceNow. Veuillez noter que pour les étapes décrites ci-dessous, nous partons du principe que vous avez déjà configuré le carré d'intégration dans la page d'intégrations Datadog. Procédez ainsi comme suit :

1. Depuis la liste déroulante, sélectionnez la table intermédiaire vers laquelle vous souhaitez envoyer les notifications.
1. Pour vérifier que l'intégration est correctement configurée, ajoutez `@servicenow` dans une notification de monitor ou d'événement. Les données brutes remplissent les lignes dans la table temporaire et sont transmises à la table ServiceNow spécifiée dans les mappages et les transformations que vous avez créés.
1. [Utilisez des transform maps](#personnaliser-les-donnees-avec-des-transform-maps) pour personnaliser le format des données envoyées aux tables.
1. [Configurer le carré d'intégration ServiceNow dans Datadog](#configure-the-servicenow-tile-in-datadog)

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow">}}

### Configurer le carré d'intégration ServiceNow dans Datadog pour ITOM/ITSM

1. Accédez au [carré d'intégration ServiceNow][4] Datadog, depuis la page Integrations.
1. Ajoutez le nom de l'instance, à savoir le sous-domaine de votre domaine ServiceNow : `<NOM_INSTANCE>.service-now.com`.
1. Ajoutez le nom d"utilisateur et le mot de passe de votre instance ServiceNow. Si vous utilisez le module ITSM ou ITOM et souhaitez envoyer des notifications à une table intermédiaire, sélectionnez-la dans la liste déroulante.

**Remarque** : vous pouvez créer un utilisateur limité dédié à Datadog dans ServiceNow.

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="intégration servicenow">}}

### Personnaliser les données avec des transform maps

Les tables **Datadog Incident** et **Datadog Event** utilisent une transform map pour transformer les événements Datadog en incidents et événements correspondants dans ServiceNow.

## Dépannage

Si aucun événement n'apparaît dans vos tables ServiceNow, et que :

- Vous voyez un message d'erreur dans votre carré d'intégration Datadog ou une notification `Error while trying to post to your ServiceNow instance` :

  - Vérifiez que seul le sous-domaine a été indiqué pour le nom de votre instance.
  - Vérifiez que l'utilisateur créé dispose des autorisations requises.
  - Vérifiez que le nom d'utilisateur et le mot de passe sont corrects.

- L'intégration est configurée, une alerte se déclenche, mais aucun ticket n'est créé :

  - Vérifiez que la table temporaire contient bien les données. Si c'est bien le cas, le problème est lié aux mappages et aux transformations. Vous pouvez débuguer davantage vos mappages et scripts en accédant à **Transform Errors** dans ServiceNow.
  - Vérifiez que vous utilisez la table intermédiaire spécifiée dans le carré.

  L'utilisateur ServiceNow doit posséder les rôles `rest_service` et `x_datad_datadog.user` afin de pouvoir accéder aux tables d'importation. Si vous utilisez l'ancienne méthode consistant à envoyer les notifications directement à la table Incident ou Event, les autorisations `itil` et `evt_mgmt_integration` sont alors nécessaires.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][5].

## Base de connaissances

### Règle Autoflush de la table Import Host

Pour empêcher la table Import Set `x_datad_datadog_import_host` d'accumuler un nombre trop important de lignes, une règle AutoFlush a été ajoutée dans le nettoyeur de table afin de conserver uniquement les données des dernières 24 heures. Ce paramètre de configuration peut être modifié en fonction de vos besoins. Pour ce faire, accédez à `sys_auto_flush_list.do` dans le navigateur de filtres, puis à la règle de la table `x_datad_datadog_import_host`. Vous pouvez alors modifier la valeur du champ `Age in seconds`.

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="Paramètres de configuration de l'intégration" >}}

### Générer des tickets d'assistance automatiquement à partir des alertes Datadog

Une fois que ServiceNow est connecté à votre compte Datadog, les alertes reçues peuvent automatiquement créer des tickets d'assistance et les envoyer dans la file d'attente de tickets ServiceNow. Votre équipe d'assistance est alors informée des problèmes à l'aide des workflows de communication que vous avez déjà établis dans ServiceNow. Mentionnez `@servicenow` dans le message d'alerte ou ajoutez `@servicenow` à la liste de notifications pour ce monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### Utiliser des variables dans la charge utile des tickets et les mappages de champ

Des variables peuvent être utilisées dans le corps de vos alertes ou dans les mappages de champ pour s'assurer que les détails de l'événement sont inclus dans ServiceNow. Par exemple, il est possible d'inclure le titre et la gravité dans le champ ServiceNow approprié, ou encore d'ajouter un lien permettant de revenir vers l'incident spécifique dans Datadog directement depuis le ticket ServiceNow.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="Variables ServiceNow" >}}

### Automatiser le workflow de résolution des tickets d'assistance

Une fois que l'état normal du monitor est rétabli, le ticket d'assistance associé est automatiquement considéré comme résolu.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="Ticket ServiceNow résolu" >}}

### Définir des mappages personnalisés

Cliquez sur **Datadog Incident Tables** (par exemple) et accédez au lien vers la transform map associée en bas de la page :

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="intégration servicenow" >}}

### Comprendre le mappage

Cliquez sur le nom de la transform map pour en afficher les détails :

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="intégration servicenow" >}}

Deux champs importants se trouvent en haut de la page : `Source table` et `Target table`.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="intégration servicenow" >}}

**Remarques** :

- La source désigne la table Import Set que vous avez sélectionnée (tables Datadog Incident), tandis que la cible (target) correspond à la table Incident (ou la table Event) dans laquelle les événements sont réellement stockés.
- Les mappages de champ se trouvent en bas de la page. Certains mappages de base sont compris. C'est à cet endroit que vous pouvez sélectionner les champs à inclure, définir le format et sélectionner les champs cibles dans votre instance ServiceNow.

### Ajouter un nouveau mappage de champ

Cliquez sur **New** :

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="intégration servicenow" >}}

Sélectionnez les champs source et cible pour les mappages un à un :

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="intégration servicenow" >}}

Sinon, cochez la case **Use source script** et définissez les transformations :

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="intégration servicenow" >}}

**Remarque** : pour mapper n'importe quel champ personnalisé dans le carré d'intégration, vous pouvez utiliser le script de mappage suivant pour les transform maps Datadog Event ou Datadog Incident. Dans cet exemple, le champ `my_field` a été défini en tant que champ personnalisé dans le carré d'intégration :
```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.custom_my_field;
})(source);
``` 

### Définir plusieurs mappages

Utilisez **Mapping Assist** (sous Related Links) pour mapper plusieurs champs source et cible :

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="intégration servicenow" >}}

### Validation

Pour vérifier que l'intégration est correctement configurée, ajoutez `@servicenow` dans une notification de monitor ou d'événement. Les données brutes remplissent les lignes dans la table temporaire et sont transmises à la table ServiceNow spécifiée dans les mappages et les transformations que vous avez créés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/26b85b762f6a1010b6a0d49df699b6fe/1.0.4?referer=%2Fstore%2Fsearch%3Flistingtype%3Dallintegrations%25253Bancillary_app%25253Bcertified_apps%25253Bcontent%25253Bindustry_solution%25253Boem%25253Butility%26q%3Ddatadog&sl=sh
[2]: https://store.servicenow.com/
[3]: https://s3.amazonaws.com/dd-servicenow-update-sets/Datadog-SNow_Update_Set_v2.2.2.xml
[4]: https://app.datadoghq.com/account/settings#integrations/servicenow
[5]: https://docs.datadoghq.com/fr/help/