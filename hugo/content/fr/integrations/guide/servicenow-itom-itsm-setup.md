---
further_reading:
- link: /integrations/servicenow/
  tag: Documentation
  text: Intégration ServiceNow
title: Configurer ServiceNow ITOM et ITSM
---
L'intégration ITOM/ITSM de ServiceNow vous permet d'envoyer des alertes, des éléments de travail et des incidents générés dans Datadog vers ServiceNow en tant qu'enregistrements dans les tables Incident ou Événement. L'intégration repose sur des tableaux intermédiaires et des transform maps.

Pour utiliser l'intégration, suivez les instructions pour l'installer, puis configurez-la pour chaque produit :
1. [Configurer la tuile ServiceNow](#tile)
1. [Installer l'intégration ITOM/ITSM](#install)
1. Configurer l'intégration
   1. [Configurer les notifications de monitor basées sur des modèles Datadog](#monitor-notifications)
   1. [Configurer Datadog Work Management](#case-management)
   1. [Configurer Datadog Incident Management](#incident-management)
1. [Personnaliser les données avec des transform maps](#transform-maps)

## Configurer la tuile ServiceNow {#tile}

Avant d'installer l'intégration, assurez-vous d'avoir [configuré la tuile ServiceNow][3] avec votre instance ServiceNow dans Datadog.

## Installer l'intégration ITOM/ITSM {#install}

Il existe deux manières d'installer l'intégration :
- Datadog recommande d'installer la dernière version de l'intégration [ITOM/ITSM Integration for Datadog][1] depuis le ServiceNow Store.
- Alternativement, vous pouvez télécharger le dernier Update Set ([Datadog-Snow_Update_Set_v2.7.9.xml][2]) et le charger manuellement dans votre instance ServiceNow.

## Configurer l'intégration{#configure-the-integration}

### Configurer les notifications de monitor basées sur des modèles {#monitor-notifications}

<div class="alert alert-info">Ces fonctionnalités nécessitent l'intégration ITOM/ITSM version 2.6.0 ou ultérieure.</a></div>

#### Configurer le mappage de priorité d'instance {#configure-instance-priority-mapping}

Par défaut, Datadog n'inclut pas les niveaux d'impact et d'urgence de ServiceNow lors de l'envoi d'événements à ServiceNow. Pour chaque configuration ServiceNow, vous pouvez configurer des mappages entre ces niveaux ServiceNow et les niveaux de priorité de monitor de Datadog pour les inclure dans les événements générés par Datadog.

1. Dans Datadog, accédez à la page [paramètres d'intégration ServiceNow][4].
1. Accédez à l'onglet **Configurer**, puis à l'onglet **ITOM/ITSM**, et enfin à l'onglet **monitors**.
1. Sous **Mappage de priorité d'instance pour les modèles**, ouvrez les paramètres de votre instance ServiceNow.
1. Activez le commutateur **Utiliser le mappage de priorité d'instance**.
1. Sous **Urgence ServiceNow** et **Impact ServiceNow**, sélectionnez les niveaux que vous souhaitez faire correspondre aux niveaux de priorité de monitor de Datadog. Exemple :
   - Impact : 4
   - Urgence : 5
1. Cliquez sur **Mettre à jour**.

#### Créer une @-handle ServiceNow personnalisée pour les notifications de monitor {#create-a-custom-servicenow-handle-for-monitor-notifications}

Pour créer un enregistrement ServiceNow à partir d'un monitor, vous devez configurer une @-handle à utiliser dans les règles de notification du monitor ou pour les destinataires de notification.

1. Dans Datadog, accédez à la page [paramètres d'intégration ServiceNow][4].
1. Accédez à l'onglet **Configurer**, puis à l'onglet **ITOM/ITSM**, et enfin à l'onglet **monitors**.
1. À côté de **Modèles**, cliquez sur **+ Nouveau** pour créer un nouveau modèle.
1. Définissez un **Nom** d'@-handle, une **Instance** et une **Tableau cible** pour la notification de monitor à envoyer.
1. (Facultatif) Définissez un **Groupe d'affectation**, un **Service métier** et/ou un **Utilisateur** dans le modèle.<br /> **Remarque** : Si vous définissez à la fois un groupe d'affectation et un utilisateur, l'utilisateur doit appartenir au groupe d'affectation sélectionné pour que la création de l'enregistrement ServiceNow aboutisse.
1. (Facultatif) Développez la section **Personnaliser la charge utile de notification** et cliquez sur **Ajouter un champ** pour ajouter d'autres variables depuis Datadog.
1. Cliquez sur **Enregistrer**.

Pour utiliser le nouveau modèle, ajoutez `@servicenow-<TEMPLATE_NAME>` dans une description de monitor. Lorsque le monitor envoie une alerte, ServiceNow crée également un enregistrement correspondant et le définit automatiquement sur **Résolu** lorsque l'alerte sous-jacente est rétablie.

{{% collapse-content title="Configurer les notifications de monitor héritées" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
Pour configurer les notifications de monitor héritées à l'aide de `@servicenow-<INSTANCE_NAME>` :

1. Dans Datadog, accédez à la page [paramètres d'intégration ServiceNow][4].
1. Accédez à l'onglet **Configurer**, puis à l'onglet **ITOM/ITSM**, et enfin à l'onglet **monitors**.
1. Sous **Gérer les notifications de monitor héritées**, sélectionnez l'instance pour laquelle vous souhaitez configurer les notifications, puis sélectionnez le tableau dans lequel les notifications de monitor héritées doivent être écrites.
1. Pour valider que l'intégration est correctement configurée, ajoutez `@servicenow-<INSTANCE_NAME>` dans une notification de monitor ou d'événement. Vous pouvez définir les valeurs `Impact` et `Urgency` afin que ServiceNow puisse les utiliser pour calculer la priorité de l'incident. Les données brutes remplissent des lignes dans le tableau intermédiaire et sont transmises au tableau ServiceNow spécifiée par l'intégration.
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="Exemple de monitor hérité avec des valeurs d'Impact et d'Urgence définies" style="width:100%;" >}}
1. Utilisez des [transform maps](#transform-maps) dans ServiceNow pour personnaliser la transformation des données envoyées aux tableaux intermédiaires.
1. Personnalisez la charge utile de notification avec les variables Datadog disponibles ou des chaînes personnalisées.

**Remarque** : `Impact` et `Urgency` dans les descriptions de monitor ne fonctionnent que pour les configurations de monitor héritées. Pour les monitors basés sur des modèles, configurez le mappage de priorité d'instance. Le champ `priority` dans les incidents ServiceNow est en lecture seule et ne peut être mis à jour qu'à l'aide de [règles de recherche de priorité][8].
{{% /collapse-content %}}

{{% collapse-content title="Champs de tableau de monitor basés sur des modèles et transform maps" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **Type**: Chaîne<br>
L'action effectuée sur le monitor: `create`, `update`, `acknowledge` ou `resolve`

`additional_information`
: **Type**: Chaîne<br>
**Transformation ITOM**: `additional_info`<br>
Chaîne formatée contenant tous les détails de l'événement

`aggreg_key`
: **Type**: Chaîne<br>
Clé d'agrégation représentant un hachage de l'ID du monitor d'alerte

`alert_cycle_key`
: **Type**: Chaîne<br>
Clé représentant un hachage du cycle d'alerte d'un seul monitor (suit Alerte → Avertissement → Résolution)

`alert_id`
: **Type**: Chaîne<br>
ID du monitor d'alerte

`alert_metric`
: **Type**: Chaîne<br>
**Transformation ITOM**: `metric_name`<br>
Métrique ayant déclenché l'alerte

`alert_query`
: **Type**: Chaîne<br>
Requête ayant déclenché l'alerte

`alert_scope`
: **Type**: Chaîne<br>
Périmètre ayant déclenché l'alerte

`alert_status`
: **Type**: Chaîne<br>
État actuel de l'alerte

`alert_title`
: **Type**: Chaîne<br>
Nom de l'alerte

`alert_transition`
: **Type**: Chaîne<br>
**Transformation ITSM**: (script) -> état<br>
État de transition de l'alerte: `Triggered`, `Warn` ou `Recovered`

`assignment_group_sys_id`
: **Type**: Référence<br>
**Transformation ITSM**: `assignment_group`<br>
**Reference Table**: Groupe<br>
sys_id ServiceNow pour le groupe d'affectation du gestionnaire basé sur un modèle

`business_service_sys_id`
: **Type** : Référence<br>
**Transformation ITSM** : `business_service`<br>
**Reference Table** : Service<br>
sys_id ServiceNow pour le service métier du gestionnaire basé sur un modèle

`custom_fields`
: **Type** : Chaîne<br>
Champs clé-valeur configurés par l'utilisateur formatés sous forme de chaîne convertible en JSON

`datadog_tags`
 : **Type** : Chaîne<br>
Tags Datadog du monitor d'alerte

`description`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `description`<br>
**Transformation ITOM** : `description`<br>
Description sommaire de l'alerte du monitor

`event_details`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `work_notes`<br>
Détails de l'événement avec des liens formatés et cliquables vers Datadog

`event_id`
 : **Type** : Chaîne<br>
ID Datadog de l'événement

`event_link`
 : **Type** : Chaîne<br>
Lien vers l'événement créé à partir de l'alerte du monitor

`event_msg`
 : **Type** : Chaîne<br>
Message de l'événement

`event_title`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `short_description`<br>
Titre de l'événement.

`event_type`
 : **Type** : Chaîne<br>
**Transformation ITOM** : `type`<br>
Type d'événement

`hostname`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `cmdb_ci`<br>
**Transformation ITOM** : `node`<br>
Host du monitor affecté

`impact`
: **Type** : Entier<br>
**Transformation ITSM** : `impact`<br>
Valeur d'impact basée sur le mappage défini par l'utilisateur de la priorité du monitor

`logs_sample`
 : **Type** : Chaîne<br>
Échantillon de logs pertinents

`monitor_priority`
: **Type** : Entier<br>
**Transformation ITOM** : `severity`<br>
Priorité du monitor d'alerte sous forme d'entier

`org_name`
 : **Type** : Chaîne<br>
Nom de l'organisation du monitor d'alerte

`sys_created_by`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `caller_id`<br>
Créateur de l'enregistrement (généralement le compte API ServiceNow configuré)

`ticket_state`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `state`, (script) -> close_code, (script) -> close_notes<br>
**Transformation ITOM** : (script) -> resolution_notes<br>
État de l'enregistrement ServiceNow : `new` ou `resolved`

`u_correlation_id`
 : **Type** : Chaîne<br>
**Transformation ITSM** : `correlation_id`<br>
**Transformation ITOM** : `message_key`<br>
Combinaison de alert_cycle_key et aggreg_key utilisée pour fusionner les enregistrements vers le même incident cible

`urgency`
: **Type** : Entier<br>
**Transformation ITSM** : `urgency`<br>
Urgence définie à partir du mappage défini par l'utilisateur sur la tuile d'intégration en fonction de la priorité définie par le monitor

`user_sys_id`
: **Type** : Référence<br>
**Transformation ITSM** : `assigned_to`<br>
**Reference Table** : Utilisateur <br>
sys_id provenant du handle de modèle transmis pour l'utilisateur.

{{% /collapse-content %}}

### Configurer la gestion du travail Datadog {#case-management}

{{% site-region region="gov2" %}}
<div class="alert alert-warning">
L'intégration de la gestion du travail n'est pas prise en charge dans le {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

Envoyez des éléments de travail de Datadog vers le tableau ITSM Datadog Cases dans ServiceNow. ServiceNow stocke les enregistrements entrants et utilise l'ensemble de mises à jour installé pour transformer les enregistrements dans le tableau Incident. Datadog ne prend pas en charge les charges utiles personnalisées pour ce tableau.

<div class="alert alert-info">L'utilisateur qui configure les paramètres dans ServiceNow doit disposer des deux rôles suivants : <code>x_datad_datadog.user</code> et <code>admin</code> rôles.</a></div>

1. Dans Datadog, accédez à la page [paramètres d'intégration ServiceNow][4].
1. Accédez à l'onglet **Configurer**, puis à l'onglet **ITOM/ITSM**, et enfin à l'onglet **Gestion du travail**.
1. Sous **Synchroniser ServiceNow avec la gestion du travail**, ouvrez les paramètres de votre instance ServiceNow.
1. À côté de **Case Table**, choisissez d'envoyer les éléments de travail vers **Datadog Cases ITSM**. **Remarque** : ITOM n'est pas pris en charge pour la gestion du travail.
1. Accédez à la page [**Gestion du travail > Paramètres**][5] et développez votre projet. Ensuite, [configurez l'intégration ServiceNow][6] pour ce projet.

### Configurez Datadog Incident Management {#incident-management}

L'intégration Datadog ServiceNow vous permet de créer des incidents dans ServiceNow à partir d'incidents Datadog et de [synchroniser les données de manière bidirectionnelle](#sync-bidirectionally) entre les deux plateformes. Cette intégration avec Datadog Incident Management offre une meilleure visibilité, une synchronisation bidirectionnelle automatique de l'état, de la gravité et de toute mise à jour de statut de l'incident, ainsi qu'une prise en charge de vos workflows ServiceNow existants.

Après avoir installé l'intégration, dans Datadog, accédez à la page [Paramètres d'intégration][9]. Cliquez sur la tuile **ServiceNow** pour configurer la création d'incidents ServiceNow.

Pour obtenir des instructions étape par étape sur la configuration de cette intégration pour la gestion des incidents, consultez [Intégrer ServiceNow à Datadog Incident Management][12].

## Synchronisez les données de manière bidirectionnelle entre ServiceNow et Work/Incident Management {#sync-bidirectionally}

Dans ServiceNow, vous pouvez synchroniser l'état, l'impact et l'urgence de manière bidirectionnelle avec la gestion du travail et la Incident Management.

**Remarque** : Les données ne sont synchronisées de ServiceNow vers Datadog que si la modification est effectuée par un utilisateur disposant du rôle ITIL qui **n'est pas** l'utilisateur configuré dans la tuile d'intégration ServiceNow dans Datadog.

1. Dans Datadog, suivez les instructions pour [créer une clé d'application de compte de service][7].<br />**Remarque** : Datadog recommande de créer cette clé plutôt que d'utiliser une clé personnelle, ce qui risquerait d'interrompre la synchronisation ServiceNow si le compte de l'utilisateur est désactivé ou si ses autorisations changent.
1. Dans ServiceNow, cliquez sur l'icône en forme de globe dans le coin supérieur droit, puis assurez-vous que le **Périmètre de l'application** est défini sur **ITOM/ITSM Integration for Datadog**.
1. Dans le menu de navigation en haut à gauche, cliquez sur **All**.
1. Saisissez **ITOM/ITSM Integration for Datadog** dans le filtre.
1. Cliquez sur le lien **Configuration** parmi les résultats filtrés, puis saisissez les paramètres requis :
   1. Sélectionnez votre **centre de données Datadog**.
   1. Collez votre **clé d'API Datadog**.
   1. Collez la **clé d'application de compte de service** que vous avez créée.
   1. Cochez la case **Enabled**.
1. Cliquez sur **Enregistrer**.
1. (Facultatif) Si vous disposez de la version 2.7.0 ou ultérieure de l'intégration ITOM/ITSM, vous pouvez utiliser les informations issues des alertes corrélées pour renseigner des valeurs dans ServiceNow.<br /> Les instructions sur la façon de procéder se trouvent ci-dessous sous **Transform correlated alert data**.



## Personnaliser les données avec des transform maps {#transform-maps}

L'intégration ServiceNow écrit depuis Datadog vers des tables intermédiaires, qui se transforment en enregistrements dans ServiceNow. Pour toute personnalisation (par exemple, [mappages de champs personnalisés](#custom-field-mappings)), vous pouvez étendre les transform maps pour spécifier les champs que vous souhaitez mapper de Datadog vers ServiceNow.

## Options de configuration supplémentaires {#additional-configuration-options}

{{% collapse-content title="Règle de vidage automatique de la table Import Host Datadog" level="h3" expanded=false id="import-host-auto-flush" %}}
Pour éviter que le tableau de jeu d'importation `x_datad_datadog_import_host` n'accumule trop de lignes, une règle de vidage automatique a été ajoutée à l'outil Table Cleaner afin de ne conserver que les dernières 24 heures de données. Ce paramètre de configuration peut être modifié selon les besoins en accédant à `sys_auto_flush_list.do` dans le navigateur de filtres et en allant dans la règle pour le tableau `x_datad_datadog_import_host`. Le champ `Age in seconds` peut être mis à jour en conséquence.
{{% /collapse-content %}}

{{% collapse-content title="Créer des mappages de champs personnalisés dans ServiceNow" level="h3" expanded=false id="custom-field-mappings" %}}
Pour créer un mappage de champ personnalisé dans ServiceNow :

1. Cliquez sur l'un des tableaux (par exemple, **Datadog Monitors ITSM Tables**), puis faites défiler jusqu'en bas de l'enregistrement pour voir le lien vers la transform map associée.
1. Cliquez sur le nom de la transform map pour afficher l'enregistrement :
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Transform map du tableau ServiceNow montrant la Datadog Incident Transform qui mappe le tableau Datadog Incident au tableau Incident." style="width:100%;" >}}
   En haut se trouvent deux champs importants sur l'enregistrement de transformation : <code>Source table</code> et <code>Target table</code>:
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="Transform map Datadog Incident dans ServiceNow montrant le tableau source Datadog Incident mappé au tableau cible Incident [incident]" style="width:100%;" >}}
1. Cliquez sur **New** :
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="Onglet Field Maps dans ServiceNow montrant les mappages de champs source et cible pour la Datadog Incident Transform. Une flèche rose pointe vers le bouton « New » utilisé pour ajouter une nouvelle correspondance de champs." style="width:100%;" >}}
1. Sélectionnez les champs source et cible pour les mappages un à un :
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="Configuration de la Field Map ServiceNow montrant le champ source PRIORITY mappé au champ cible Severity dans la transform map Datadog Incident" style="width:100%;" >}}
   Ou cochez la case <strong>Use source script</strong> et définissez les transformations :
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Script de Field Map ServiceNow dans la Datadog Incident Transform montrant un script source qui mappe les valeurs source.priority vers des niveaux de gravité numériques pour le champ Priority dans le tableau Incident." style="width:100%;" >}}

Pour mapper des champs personnalisés dans la tuile d'intégration, vous pouvez utiliser le script suivant pour les transform maps Datadog Monitors ITOM et Datadog Monitors ITSM. Dans cet exemple, le champ `my_field` est défini comme un champ personnalisé dans la tuile d'intégration :

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**Notes**:
- La source est le tableau de jeu d'importation que vous avez sélectionné (dans cet exemple, Datadog Monitors ITSM Tables) et la cible est votre tableau d'incident (ou tableau d'événement) réel où les événements sont stockés.
- Les mappages de champs se trouvent en bas de l'enregistrement. Certains mappages de base sont inclus. C'est ici que vous sélectionnez les champs à inclure, définissez le format et sélectionnez les champs cibles dans votre instance ServiceNow.
{{% /collapse-content %}}

{{% collapse-content title="Transformer les données d'alerte corrélées" level="h3" expanded=false id="transform-correlated-alert-data" %}}
Pour utiliser les informations issues d'alertes corrélées afin de renseigner des valeurs dans ServiceNow, ajoutez un nouveau script de transformation onBefore sous la transform map du tableau Datadog Cases ITSM/ITOM.

Pour renseigner des données dans l'incident ServiceNow, vous devez modifier votre script afin d'analyser les données envoyées depuis Datadog et stockées dans la colonne EM Correlated Alert, et spécifier les champs de l'incident vers lesquels vous souhaitez envoyer les données analysées. Vous trouverez ci-dessous un exemple de script que vous pouvez personnaliser selon vos besoins :

```
(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
    // We do not need to process non-correlated-alert events
    if (!source.em_correlated_alert_id) {
        return;
    }

    // Create a GlideRecord for the table
    var gr = new GlideRecord('x_datad_datadog_case_incident_table');
    gr.addQuery('case_id', source.case_id);
    gr.addNotNullQuery('em_correlated_alert_id');
    gr.orderByDesc('sys_created_on');
    gr.query();

    // Ensure we process each alert_id only once
    var seenAlert = {};

    // Add relevant correlated alert fields here
    var alertNames = [];


    // Loop through list of correlated_alerts associated with the same case_id
    while (gr.next()) {
        var emAlertId = gr.getValue('em_correlated_alert_id');

        if (!seenAlert.hasOwnProperty(emAlertId)) {
            seenAlert[emAlertId] = true;
            var changeType = gr.getValue('em_change_type');
            if (changeType == "added") {
                var correlatedAlert = gr.getValue("em_correlated_alert");
                var jsonAlert = JSON.parse(correlatedAlert);

                // Get relevant fields from the JSON event
                var alertName = jsonAlert['alert_message'];
                alertNames.push(alertName);
            }
        }
    }

    // Set the corresponding value on the incident table
    // target.impact = 1;

})(source, map, log, target);
```

{{% /collapse-content %}}

## Dépannage {#troubleshooting}

{{% collapse-content title="Message d'erreur dans votre intégration Datadog" level="h3" expanded=false id="troubleshooting-error-messages" %}}
Si vous recevez un message d'erreur dans votre tuile d'intégration Datadog, ou une notification `Error while trying to post to your ServiceNow instance` :
- Vérifiez que seul le sous-domaine a été utilisé lors de la saisie du nom de votre instance.
- Vérifiez que l'utilisateur que vous avez créé dispose des autorisations requises.
- Vérifiez que le nom d'utilisateur et le mot de passe sont corrects.
{{% /collapse-content %}}

{{% collapse-content title="Aucun ticket créé" level="h3" expanded=false id="troubleshooting-no-ticket" %}}
Si l'intégration est configurée et qu'une alerte est déclenchée, mais qu'aucun ticket n'est créé :
- Confirmez que le tableau intermédiaire est rempli. Si c'est le cas, le problème vient des mappages et des transformations. Vous pouvez déboguer davantage vos mappages et scripts en accédant à **Transform Errors** dans ServiceNow.
- Confirmez que vous travaillez avec le tableau intermédiaire que vous avez spécifié dans la tuile.

L'utilisateur ServiceNow a besoin des rôles `rest_service` et `x_datad_datadog.user` pour pouvoir accéder aux tables d'importation. Si vous utilisez l'ancienne méthode consistant à envoyer des notifications directement vers le tableau Incident ou Événement, vous avez besoin des autorisations `itil` et `evt_mgmt_integration`.
{{% /collapse-content %}}

{{% collapse-content title="Aucune mise à jour de ServiceNow vers Datadog" level="h3" expanded=false id="troubleshooting-no-updates" %}}
Si vous voyez des mises à jour de Datadog Work Management vers ServiceNow, mais pas de mises à jour de ServiceNow vers Datadog, il s'agit du comportement attendu pour ServiceNow ITOM. La synchronisation bidirectionnelle avec Work Management n'est prise en charge que pour ServiceNow ITSM.
{{% /collapse-content %}}

{{% collapse-content title="Monitors dupliquant les incidents" level="h3" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
Si un monitor rouvre le même incident au lieu d'en créer un nouveau pour chaque avertissement, assurez-vous qu'il n'est pas défini comme une alerte simple. Convertissez le monitor en [multi-alert][11] en le regroupant à l'aide d'un tag dans la métrique. De cette façon, chaque alerte déclenchera un incident distinct.
{{% /collapse-content %}}

Besoin d'aide supplémentaire ? Contactez le [support Datadog][10].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /fr/resources/xml/Datadog-Snow_Update_Set_v2.7.9.xml
[3]: /fr/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/work/settings
[6]: /fr/incident_response/work_management/notifications_integrations/#servicenow
[7]: /fr/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[8]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /fr/help/
[11]: /fr/monitors/configuration/?tab=thresholdalert#multi-alert
[12]: /fr/incident_response/incident_management/integrations/servicenow