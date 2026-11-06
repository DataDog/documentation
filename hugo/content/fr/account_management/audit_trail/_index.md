---
aliases:
- /fr/account_management/audit_logs/
description: Surveillez l'activité des utilisateurs, les requêtes API et les changements
  de ressources Datadog grâce à une journalisation d'audit complète pour la conformité,
  la sécurité et la gouvernance.
further_reading:
- link: /account_management/audit_trail/events/
  tag: Documentation
  text: En savoir plus sur les événements Audit Trail
- link: /account_management/org_settings/
  tag: Documentation
  text: En savoir plus sur les paramètres d'organisation
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Conformité PCI DSS
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec Datadog Audit Trail
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: Blog
  text: Surveiller des ressources et configurations essentielles Datadog avec Audit
    Trail
- link: /account_management/delete_data/
  tag: Documentation
  text: Supprimez les données de Datadog
title: Datadog Audit Trail
---
## Présentation {#overview}

En tant qu'administrateur ou membre de l'équipe de sécurité, vous pouvez utiliser [Datadog Audit Trail][1] pour voir qui utilise Datadog au sein de votre organisation et le contexte dans lequel ils utilisent Datadog. En tant qu'individu, vous pouvez également voir un flux de vos propres actions.

Il existe deux types d'événements qui peuvent se produire au sein d'une piste d'audit : **événements de requête**, qui traduisent toutes les requêtes effectuées vers l'API de Datadog en enregistrements clients, ou **événements spécifiques au produit**.

Par exemple, suivez les **événements de requête** afin de voir quels appels API ont conduit à l'événement. Ou, si vous êtes un administrateur d'entreprise ou de facturation, utilisez les événements de piste d'audit pour suivre les événements utilisateur qui modifient l'état de votre infrastructure.

Dans ce contexte, les événements d'audit vous aident à consulter des événements spécifiques à un produit. Vous pouvez par exemple découvrir :

  -  Quand quelqu'un a modifié la rétention d'un index parce que le volume de logs a changé et que, par conséquent, la facture mensuelle a changé.

  - Qui a modifié les processeurs ou les pipelines, et quand ils ont été modifiés, car un dashboard ou un monitor est désormais dysfonctionnel et doit être réparé.

  - Qui a modifié un filtre d'exclusion parce que le volume d'indexation a augmenté ou diminué et que les logs sont introuvables ou que votre facture a augmenté.

Pour les administrateurs de sécurité ou les équipes InfoSec, les événements de piste d'audit facilitent les contrôles de conformité et le maintien de pistes d'audit sur qui a fait quoi, et quand, pour vos ressources Datadog. Par exemple, maintenir une piste d'audit :

- Chaque fois qu'une personne met à jour ou supprime un dashboard critique, un monitor ou une autre ressource Datadog.

- Pour les connexions des utilisateurs, les changements de compte ou de rôle dans votre organisation.

Vous pouvez également analyser les événements Audit Trail avec [Cloud SIEM][15] pour détecter les menaces et générer des signaux de sécurité. Consultez [Débuter avec Cloud SIEM][16] pour plus d'informations.

**Remarque** : Les outils et politiques de Datadog sont conformes à la norme PCI v4.0. Pour plus d'informations, consultez [PCI DSS Compliance][2].

## Configuration {#setup}

Pour activer Datadog Audit Trail, accédez à vos [Organization Settings][3] et sélectionnez {{< ui >}}Audit Trail Settings{{< /ui >}} sous {{< ui >}}COMPLIANCE{{< /ui >}}. Cliquez sur le bouton {{< ui >}}Enable{{< /ui >}}.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="La page des paramètres Audit Trail indiquant qu'il est désactivé" style="width:85%;">}}

Pour vérifier l'identité de la personne qui a activé Audit Trail :
1. Accédez à [Events Explorer][4].
2. Saisissez `Datadog Audit Trail was enabled by` dans la barre de recherche. Vous devrez peut-être sélectionner une plage horaire plus large pour capturer l'événement.
3. L'événement le plus récent intitulé « A user enabled Datadog Audit Trail » indique qui a activé Audit Trail en dernier.

## Configuration {#configuration}


### Autorisations{#permissions}
Seuls les utilisateurs disposant de l'autorisation `Audit Trail Write` peuvent activer ou désactiver Audit Trail. De plus, les utilisateurs ont besoin de l'autorisation `Audit Trail Read` pour afficher les événements d'audit à l'aide d'Audit Explorer.

### Archivage {#archiving}

L'archivage est une fonctionnalité optionnelle pour Audit Trail. Vous pouvez utiliser l'archivage pour écrire vers Amazon S3, Google Cloud Storage ou Azure Storage et permettre à votre système SIEM d'y lire les événements. Après avoir créé ou mis à jour vos configurations d'archivage, il peut s'écouler plusieurs minutes avant que le prochain téléversement d'archive ne soit tenté. Les événements sont téléversés vers l'archive toutes les 15 minutes ; vérifiez donc votre compartiment de stockage dans 15 minutes pour vous assurer que les archives sont correctement téléversées depuis votre compte Datadog.

Pour activer l'archivage pour Audit Trail, accédez à vos [Organization Settings][3] et sélectionnez {{< ui >}}Audit Trail Settings{{< /ui >}} sous {{< ui >}}Compliance{{< /ui >}}. Faites défiler jusqu'à Archiving et cliquez sur le bouton {{< ui >}}Store Events{{< /ui >}} pour activer.

### Retention {#retention}

La conservation des événements est une fonctionnalité optionnelle pour Audit Trail. Dans la section {{< ui >}}Retention Period{{< /ui >}}, cliquez sur {{< ui >}}Change retention period{{< /ui >}} pour sélectionner une durée de conservation adaptée à votre cas d'utilisation.

Lorsque Audit Trail est activé, la période de conservation par défaut pour un événement Audit Trail est de 90 jours. Vous pouvez définir la période de conservation sur : 3, 7, 15, 30 ou 90 jours.

Lorsque Audit Trail est désactivé, la période de conservation est réinitialisée à la valeur par défaut de 7 jours.

{{< img src="account_management/audit_logs/retention_period.png" alt="Configuration de la conservation Audit Trail dans Datadog" style="width:80%;">}}

## Explorer les événements d'audit {#explore-audit-events}

Pour explorer un événement d'audit, accédez à la section [Audit Trail][1], également accessible depuis vos [Organization Settings][3] dans Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Paramètres de l'Audit Trail dans le menu Organization Settings" style="width:30%;">}}

Les événements de l'Audit Trail ont la même fonctionnalité que les logs dans le [Log Explorer][5] :

- Filtrez pour inspecter les événements de l'audit trail par noms d'événement (Dashboards, Monitors, Authentification, et plus), attributs d'authentification (Acteur, ID de clé d'API, e-mail de l'utilisateur, et plus), `Status` (`Error`, `Warn`, `Info`), méthode (`POST`, `GET`, `DELETE`), et d'autres facettes.

- Inspectez les événements d'audit trail associés en sélectionnant un événement et en accédant à l'onglet des attributs d'événement. Sélectionnez un attribut spécifique pour filtrer ou exclure de votre recherche, tel que `http.method`, `usr.email`, `client.ip` et plus encore.

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Trail dans le menu Paramètres de l'organisation" style="width:50%;">}}


### Requêtes en langage naturel {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
Cette fonctionnalité n'est pas prise en charge pour le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

Utilisez les requêtes en langage naturel (NLQ) pour décrire ce que vous recherchez en anglais simple. Datadog traduit automatiquement votre requête en une requête d'audit trail structurée, ce qui facilite l'exploration des événements d'audit sans avoir à écrire de syntaxe complexe.

Le système traduit les entrées en langage naturel en requêtes Datadog et comprend le contexte tel que les utilisateurs, les actions, les ressources et les plages temporelles. Il détecte également automatiquement les champs pertinents, par exemple : « Qui a modifié le dashboard de paiement la semaine dernière » ou « Afficher tous les changements de rôle au cours des 24 dernières heures. »

{{< img src="account_management/audit_logs/audit_trail_nlq_light.mp4" alt="Requête en langage naturel dans l'Audit Trail montrant comment rechercher des événements d'audit à l'aide d'expressions en anglais courant." video=true >}}

### Vues enregistrées {#saved-views}

Un dépannage efficace nécessite que vos données soient dans le périmètre approprié pour permettre l'exploration, que vous ayez accès à des options de visualisation pour faire ressortir des informations significatives, et que des facettes pertinentes soient répertoriées pour permettre l'analyse. Le dépannage est contextuel, et Saved Views permet à vous et à vos collaborateurs de passer plus facilement d'un contexte de dépannage à un autre. Vous pouvez accéder à Saved Views dans le coin supérieur gauche de l'Audit Trail Explorer.

En dehors de votre vue enregistrée par défaut, toutes les vues enregistrées sont partagées avec toute votre organisation :

* {{< ui >}}Integration saved views{{< /ui >}} sont fournis prêts à l'emploi avec Audit Trail. Ces vues sont en lecture seule et identifiées par le logo Datadog.
* {{< ui >}}Custom saved views{{< /ui >}} sont créées par les utilisateurs. Elles sont modifiables par tout utilisateur de votre organisation (à l'exception des [utilisateurs en lecture seule][6]), et identifiées par l'avatar de l'utilisateur qui les a créées. Cliquez sur le bouton {{< ui >}}Save{{< /ui >}} pour créer une nouvelle vue enregistrée personnalisée à partir du contenu actuel de votre Explorer.

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue enregistrée dans le volet des vues :

* {{< ui >}}Load{{< /ui >}} ou {{< ui >}}reload{{< /ui >}} une vue enregistrée.
* {{< ui >}}Update{{< /ui >}} une vue enregistrée avec la configuration de la vue actuelle.
* {{< ui >}}Rename{{< /ui >}} ou {{< ui >}}delete{{< /ui >}} une vue enregistrée.
* {{< ui >}}Share{{< /ui >}} une vue enregistrée via un lien court.
* {{< ui >}}Star{{< /ui >}} (ajouter aux favoris) une vue enregistrée afin qu'elle apparaisse en haut de votre liste de vues enregistrées et soit accessible directement depuis le menu de navigation.

**Remarque :** Les actions de mise à jour, de renommage et de suppression sont désactivées pour les vues enregistrées d'intégration et pour les [utilisateurs en lecture seule][6].


### Vue par défaut {#default-view}

{{< img src="logs/explorer/saved_views/default.png" alt="Vue par défaut" style="width:50%;" >}}

La fonctionnalité de vue par défaut vous permet de définir un ensemble de requêtes ou de filtres par défaut que vous voyez toujours lorsque vous ouvrez l'Audit Trail Explorer. Vous pouvez revenir à votre vue par défaut en ouvrant le panneau Vues et en cliquant sur le bouton de rechargement.

Votre vue actuelle de l'Audit Trail Explorer est votre vue enregistrée par défaut. Cette configuration n'est accessible et visible que par vous, et la mise à jour de cette configuration n'a aucun impact sur votre organisation. Vous pouvez **temporairement** remplacer votre vue enregistrée par défaut en effectuant n'importe quelle action dans l'interface utilisateur ou en ouvrant des liens vers l'Audit Trail Explorer qui intègrent une configuration différente.

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue par défaut dans le volet des vues :

* {{< ui >}}Reload{{< /ui >}} votre vue par défaut en cliquant sur l'entrée.
* {{< ui >}}Update{{< /ui >}} votre vue par défaut avec les paramètres actuels.
* {{< ui >}}Reset{{< /ui >}} votre vue par défaut aux paramètres par défaut de Datadog pour un nouveau redémarrage.

### Événements notables {#notable-events}

Les événements notables sont un sous-ensemble d'événements d'audit qui indiquent des changements de configuration critiques potentiels pouvant avoir un impact sur la facturation ou des implications en matière de sécurité, tels qu'identifiés par Datadog . Cela permet aux administrateurs d'organisation de se concentrer sur les événements les plus importants parmi les nombreux événements générés, sans avoir à connaître tous les événements disponibles et leurs propriétés .

{{< img src="account_management/audit_logs/notable_events.png" alt="Le panneau des facettes des événements d'audit affichant les événements notables sélectionnés" style="width:30%;">}}

Les événements renvoyés par les requêtes suivantes sont considérés comme notables. Vous pouvez également récupérer tous les événements notables en utilisant la requête `is_notable_event:true`.

| Description de l'événement d'audit                                          | Requête dans l'Audit Explorer                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| Modifications des métriques basées sur les logs | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Modifications des filtres d'exclusion d'index de Log Management | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Modifications des index de Log Management | `@evt.name:"Log Management" @asset.type:index` |
| Modifications des filtres de rétention APM | `@evt.name:APM @asset.type:retention_filter` |
| Modifications des métriques personnalisées APM | `@evt.name:APM @asset.type:custom_metrics` |
| Modifications des tags de métriques | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| Créations et suppressions d'applications RUM | `@evt.name:"Real User Monitoring" @asset.type:rum_application @action:(created OR deleted)` |
| Modifications des groupes d'analyse du Sensitive Data Scanner | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Création ou suppression de tests Synthetic | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| Activation, désactivation et modification de Product Analytics pour les applications | `@evt.name:"Product Analytics" @asset.type:product_analytics @action:(enabled OR disabled OR modified)` |

### Afficher l'activité complète d'un utilisateur, y compris les actions déléguées à un agent {#view-a-users-full-activity-including-agent-delegated-actions}

Lorsqu'un agent IA Datadog agit au nom d'un utilisateur, les informations de l'agent remplissent `@usr.*` pour cet événement, tandis que les informations de l'utilisateur d'origine remplissent `@delegator.*` à la place. La recherche uniquement sur `@usr.id:<USER_ID>` renvoie les actions qu'un utilisateur a effectuées directement, et n'inclut pas les actions qu'un agent IA Datadog a effectuées en son nom.

| Description de l'événement d'audit                                                                        | Requête dans l'Audit Explorer                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Actions effectuées directement par un utilisateur                                                                    | `@usr.id:<USER_ID>`                                           |
| Toutes les actions attribuées à un utilisateur, y compris les actions effectuées par un agent IA Datadog en son nom     | `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`               |

Consultez [Suivre l'utilisation des agents dans votre organisation][18] pour plus d'informations sur le filtrage et l'affichage des événements d'audit générés par des agents.

### Inspecter les modifications (Diff) {#inspect-changes-diff}

L'onglet Inspecter les modifications (Diff) dans le panneau des détails de l'événement d'audit compare les modifications de configuration apportées à ce qui était défini précédemment. Il affiche les modifications apportées aux configurations des dashboards, des notebooks et des monitors, qui sont représentées sous forme d'objets JSON.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="Le panneau latéral de l'événement d'audit montrant les modifications apportées à une configuration de monitor composite, où le texte surligné en vert correspond à ce qui a été modifié et le texte surligné en rouge à ce qui a été supprimé." style="width:70%;">}}

## Filtrer les événements d'audit en fonction des tables de référence {#filter-audit-events-based-on-reference-tables}

<div class="alert alert-danger">Les tables de référence contenant plus de 1 000 000 de lignes ne peuvent pas être utilisées pour filtrer les événements. Consultez <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Ajouter des métadonnées personnalisées avec des tables de référence</a> pour plus d'informations sur la création et la gestion des tables de référence. </div>

Les tables de référence vous permettent de combiner des métadonnées avec des événements d'audit, fournissant ainsi plus d'informations pour enquêter sur le comportement des utilisateurs Datadog. Ajoutez un filtre de requête basé sur une Reference Table pour effectuer des requêtes de recherche. Pour plus d'informations sur l'activation et la gestion de cette fonctionnalité, consultez le guide [Tables de référence][2].

Pour appliquer un filtre de requête avec des tables de référence, cliquez sur le bouton {{< ui >}}\+ Add{{< /ui >}} à côté de l'éditeur de requête et sélectionnez {{< ui >}}Join with Reference Table{{< /ui >}}. Dans l'exemple suivant, le filtre de requête de Reference Table est utilisé pour rechercher les dashboards modifiés par des utilisateurs accédant à Datadog depuis des adresses IP non autorisées :

{{< img src="account_management/audit_logs/reference_tables.png" alt="Le Datadog Audit Trail Explorer avec les options de recherche par Reference Table mises en surbrillance" border="true" popup="true" style="width:100%;" >}}

### Audit de clé d'API {#api-key-auditing}

Les utilisateurs de la gestion des logs peuvent auditer l'utilisation des clés d'API avec Audit Trail. Pour l'audit des clés d'API, les logs ont un tag `datadog.api_key_uuid` qui contient l'UUID de la clé d'API utilisée pour collecter ces logs. Utilisez ces informations pour déterminer :
- Comment les clés d'API sont utilisées dans votre organisation et vos sources de télémétrie.
- Rotation et gestion des clés d'API.

## Créer un monitor {#create-a-monitor}

Pour créer un monitor sur un type d'événement Audit Trail ou par des attributs Audit Trail spécifiques, consultez la [documentation du monitor Audit Trail][7]. Par exemple, définissez un monitor qui se déclenche lorsqu'un utilisateur spécifique se connecte, ou définissez un monitor pour chaque suppression de dashboard.

## Créer un dashboard ou un graphique {#create-a-dashboard-or-a-graph}

Donnez plus de contexte visuel à vos événements de piste d'audit avec des dashboards. Pour créer un dashboard d'audit :

1. Créez un [nouveau dashboard][8] dans Datadog.
2. Sélectionnez votre visualisation. Vous pouvez visualiser les événements d'audit sous forme de [top lists][9], de [séries temporelles][10] et de [listes][11].
3. [Représentez graphiquement vos données][12] : En mode édition, sélectionnez *Événements d'audit* comme source de données, et créez une requête. Les événements d'audit sont filtrés par nombre et peuvent être regroupés par différentes facettes. Sélectionnez une facette et une limite.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Définissez Audit Trail comme source de données pour représenter graphiquement vos données" style="width:100%;">}}
4. Définissez vos préférences d'affichage et donnez un titre à votre graphique. Cliquez sur le bouton *Enregistrer* pour créer le dashboard.

## Envoyer un rapport planifié {#send-out-a-scheduled-report}

Vous pouvez enregistrer votre requête Audit Trail en tant que dashboard et envoyer un rapport planifié. Ces rapports peuvent être utiles pour une surveillance régulière de l'utilisation de la plateforme Datadog. Par exemple, vous pouvez envoyer un e-mail hebdomadaire du nombre de connexions d'utilisateurs Datadog uniques par pays. Cette requête vous permet de surveiller une activité de connexion anormale ou de recevoir des informations automatisées sur l'utilisation.

Pour créer un rapport planifié :

1. Accédez à [Audit Trail][1], saisissez votre requête pour filtrer vos événements d'audit.
1. Cliquez sur {{< ui >}}More{{< /ui >}} et sélectionnez {{< ui >}}Save to dashboard{{< /ui >}}.
    - Vous pouvez soit enregistrer sur un dashboard existant, soit créer un nouveau dashboard.
1. Sur votre dashboard, cliquez sur {{< ui >}}Share{{< /ui >}} et sélectionnez {{< ui >}}Schedule report{{< /ui >}}.
1. Suivez les instructions dans [Planifier un rapport][17] pour configurer votre rapport.

## Télécharger les événements d'audit au format CSV {#download-audit-events-as-csv}

Datadog Audit Trail vous permet de télécharger localement jusqu'à 100 000 événements d'audit sous forme de fichier CSV. Ces événements peuvent ensuite être analysés localement, téléchargés vers un autre outil pour une analyse plus approfondie, ou partagés avec les membres appropriés de l'équipe dans le cadre d'un exercice de sécurité et de conformité.

Pour exporter des événements d'audit au format CSV :
1. Exécutez la requête de recherche appropriée qui capture les événements qui vous intéressent
2. Ajoutez les champs d'événement en tant que colonnes dans la vue que vous souhaitez inclure dans le CSV
3. Cliquez sur {{< ui >}}Download as CSV{{< /ui >}}
4. Sélectionnez le nombre d'événements à exporter et exportez au format CSV

## Dashboard prêt à l'emploi {#out-of-the-box-dashboard}

Datadog Audit Trail est fourni avec un [dashboard prêt à l'emploi][13] qui affiche divers événements d'audit, tels que les modifications de la rétention d'index, les modifications du pipeline de logs, les modifications de dashboard, et plus encore. Clonez ce dashboard pour personnaliser les requêtes et les visualisations selon vos besoins d'audit.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Dashboard Audit Trail" style="width:100%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /fr/data_security/pci_compliance/
[3]: https://app.datadoghq.com/organization-settings/
[4]: https://app.datadoghq.com/event/explorer
[5]: /fr/logs/explorer/
[6]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/?tab=ui#general-permissions
[7]: /fr/monitors/types/audit_trail/
[8]: /fr/dashboards/
[9]: /fr/dashboards/widgets/top_list/
[10]: /fr/dashboards/widgets/timeseries/
[11]: /fr/dashboards/widgets/list/
[12]: /fr/dashboards/querying/#define-the-metric/
[13]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true
[15]: /fr/security/cloud_siem/
[16]: /fr/getting_started/cloud_siem/
[17]: /fr/dashboards/sharing/scheduled_reports/#schedule-a-report
[18]: /fr/account_management/audit_trail/guides/track_agentic_usage_in_your_organization/