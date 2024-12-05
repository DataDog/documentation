---
aliases:
- /fr/account_management/audit_logs/
further_reading:
- link: /account_management/audit_trail/events/
  tag: Documentation
  text: En savoir plus sur les événements du journal d'audit
- link: /account_management/org_settings/
  tag: Documentation
  text: En savoir plus sur les paramètres d'organisation
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec le journal d'audit Datadog
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: Blog
  text: Surveiller des ressources et configurations essentielles Datadog grâce au
    journal d'audit
title: Journal d'audit Datadog
---

## Présentation

Le [journal d'audit Datadog][1] permet aux administrateurs ou aux membres des équipes de sécurité de visualiser les utilisateurs de leur organisation qui utilisent Datadog, ainsi que le contexte associé à cette utilisation. Les utilisateurs ne disposant pas de tels rôles peuvent également consulter le flux de leurs propres actions.

Deux types d'événements sont enregistrés dans un journal d'audit : les **événements de requête**, qui convertissent toutes les requêtes transmises à l'API Datadog en données client, et les **événements propres aux produits**.

Par exemple, vous pouvez surveiller les **événements de requête** afin de consulter les appels d'API qui ont entraîné les événements en question. Un administrateur d'entreprise ou de facturation peut également étudier les événements du journal d'audit pour surveiller les événements utilisateur qui modifient le statut de l'infrastructure.

Dans ce contexte, les événements d'audit vous aident à consulter des événements spécifiques à un produit. Vous pouvez par exemple découvrir :

  -  À quel moment un utilisateur a changé la rétention d'un index, si jamais le volume de logs a évolué (entraînant ainsi une modification de vos coûts mensuels)

  - Les utilisateurs qui ont modifié des processeurs ou des pipelines, ainsi que la date de ces modifications, si jamais un dashboard ou un monitor ne fonctionne plus et doit être réparé

  - Les utilisateurs qui ont modifié un filtre d'exclusion, si jamais votre volume d'indexation a augmenté ou diminué et que vous ne trouvez pas vos logs ou que vos coûts ont augmenté

Pour les administrateurs de sécurité ou les équipes InfoSec, les événements de journal d'audit simplifient l'exécution des checks de conformité et permettent de conserver un historique à des fins d'audit. Ce dernier détaille les actions effectuées sur les ressources Datadog, la date de ces actions et la personne à leur origine. Par exemple, vous pouvez consigner un événement dans un journal d'audit :

- chaque fois qu'un utilisateur met à jour ou supprime des dashboards importants, des monitors essentiels ou d'autres ressources Datadog ;

- pour les connexions utilisateur, les modifications de compte ou de rôle dans votre organisation.

## Configuration

Pour activer le journal d'audit Datadog, accédez aux [paramètres de votre organisation][2] et sélectionnez *Audit Trail Settings* sous *Security*. Cliquez ensuite sur le bouton **Enable**.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="La page Audit Trail Settings indiquant que le journal d'audit est désactivé" style="width:85%;">}}

Pour vérifier l'identité de la personne qui a activé le journal d'audit :
1. Accédez à l'[Events Explorer][3].
2. Saisissez `Datadog Audit Trail was enabled by` dans la barre de recherche. Vous devrez peut-être élargir l'intervalle pour inclure l'événement en question.
3. Le dernier événement dont le titre est « A user enabled Datadog Audit Trail » indique l'identité de la dernière personne a avoir activé le journal d'audit.

## Configuration


### Archivage

Vous n'êtes pas obligé de configurer l'archivage de votre journal d'audit. Cette fonctionnalité vous permet d'écrire vos logs sur Amazon S3, Google Cloud Storage ou Stockage Azure. Votre système SIEM peut également lire les événements à partir de ces solutions. Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. Les événements sont importés vers l'archive toutes les 15 minutes. Par conséquent, attendez 15 minutes avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog.

Pour activer l'archivage du journal d'audit, accédez aux [paramètres de votre organisation][2] et sélectionnez *Audit Trail Settings* sous *Compliance*. Faites défiler vers le bas jusqu'à atteindre la section Archiving, puis cliquez sur le bouton Store Events pour activer le stockage des événements.

### Rétention

Vous n'êtes pas obligé de configurer la rétention des événements pour le journal d'audit. Faites défiler vers le bas jusqu'à atteindre la section *Retention*, puis cliquez sur le bouton *Retain Audit Trail Events* pour activer cette fonctionnalité.

Par défaut, la période de rétention des événements de journal d'audit est définie sur 7 jours. Elle peut varier entre 3 et 90 jours.

{{< img src="account_management/audit_logs/retention_period.png" alt="Configuration de la rétention pour le journal d'audit dans Datadog" style="width:80%;">}}

## Explorer les événements d'audit

Pour explorer un événement d'audit, accédez à la section [Audit Trail][1], qui est également disponible depuis vos [paramètres d'organisation][2] dans Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Section Audit Trail dans le menu Organization Settings" style="width:30%;">}}

Les événements du journal d'audit fonctionnent de la même manière que les logs du [Log Explorer][4] :

- Vous pouvez filtrer vos événements de journal d'audit en fonction de noms d'événement (Dashboards, Monitors, Authentication, etc.), d'attributs d'authentification (acteur, ID de clé d'API, e-mail d'utilisateur, etc.), de `Status` (`Error`, `Warn`, `Info`), de méthode (`POST`, `GET`, `DELETE`) et d'autres facettes.

- Pour étudier des événements de journal d'audit connexes, sélectionnez un événement et accédez à l'onglet des attributs d'événement. Choisissez un attribut spécifique, comme `http.method`, `usr.email` ou encore `client.ip`, afin d'appliquer un filtre basé sur cet attribut ou d'exclure ce filtre de votre recherche.

{{< img src="account_management/audit_logs/attributes.png" alt="Section Audit Trail dans le menu Organization Settings" style="width:50%;">}}


### Vues enregistrées

Afin de résoudre efficacement vos problèmes, vous devez disposer du contexte approprié. Ce dernier vous permet d'explorer vos données, d'accéder aux options de visualisation pour afficher des informations intéressantes et d'utiliser des facettes pertinentes qui facilitent l'analyse. La résolution de problèmes dépend du contexte. Les vues enregistrées permettent à tous les membres de votre équipe de passer facilement d'un contexte à un autre. Vous pouvez accéder aux vues enregistrées dans le coin supérieur gauche de l'explorateur de journal d'audit.

En dehors de votre vue enregistrée par défaut, toutes les vues enregistrées sont partagées avec toute votre organisation :

* Les **vues enregistrées des intégrations** sont fournies par défaut avec le journal d'audit. Elles peuvent uniquement être consultées et sont identifiées par le logo Datadog.
* Les **vues enregistrées personnalisées** sont créées par les utilisateurs. Elles peuvent être modifiées par n'importe quel utilisateur de votre organisation (à l'exception des [utilisateurs en lecture seule][5]) et sont identifiées par l'avatar de l'utilisateur qui les a créées. Cliquez sur le bouton **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre explorateur.

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue enregistrée dans le volet des vues :

* **Charger** ou **recharger** une vue enregistrée.
* **Mettre à jour** une vue enregistrée avec la configuration de la vue actuelle.
* **Renommer** ou **supprimer** une vue enregistrée.
* **Partager** une vue enregistrée à l'aide d'un lien simplifié.
* **Ajouter une étoile** à une vue enregistrée pour qu'elle fasse partie de vos favoris. Les vues enregistrées favorites s'affichent en haut de votre liste de vues enregistrées et sont directement accessibles à partir du menu de navigation.

**Remarque** : les actions de mise à jour, de renommage et de suppression sont désactivées pour les vues enregistrées des intégrations et les [utilisateurs en lecture seule][5].


### Vue par défaut

{{< img src="logs/explorer/saved_views/default.png" alt="Vue par défaut" style="width:50%;" >}}

Grâce à la fonctionnalité de vue par défaut, vous pouvez définir un ensemble de requêtes ou filtres par défaut à toujours afficher lorsque vous ouvrez l'explorateur du journal d'audit pour la première fois. Pour revenir à la vue par défaut, ouvrez le volet Views et cliquez sur le bouton d'actualisation.

La vue actuelle de l'explorateur de journal d'audit constitue votre vue enregistrée par défaut. Vous êtes la seule personne à pouvoir consulter cette vue. Les modifications que vous apportez aux paramètres ne sont pas partagées avec le reste de votre organisation. Vous pouvez remplacer **temporairement** votre vue enregistrée par défaut en effectuant une action dans l'interface ou en ouvrant des liens vers l'explorateur de journal d'audit comportant des paramètres différents.

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue par défaut dans le volet des vues :

* **Recharger** votre vue par défaut en cliquant sur l'entrée.
* **Mettre à jour** votre vue par défaut avec les paramètres actuels.
* **Rétablir** votre vue par défaut sur les valeurs par défaut de Datadog, afin de repartir de zéro.

### Événements notables

Les événements notables désignent un sous-ensemble d'événements d'audit identifiés par Datadog qui reflètent des modifications de configuration potentiellement importantes susceptibles d'augmenter vos coûts ou de remettre en cause votre sécurité. Les administrateurs d'organisation peuvent ainsi se focaliser sur les événements les plus importants, sans avoir à étudier tous les autres événements générés ni leurs propriétés respectives.

{{< img src="account_management/audit_logs/notable_events.png" alt="Le volet des facettes d'événement d'audit ; les événements notables sont sélectionnés" style="width:30%;">}}

Les événements renvoyés par les requêtes suivantes sont considérés comme notables.

| Description de l'audit d'événement                                          | Requête dans l'explorateur de journal d'audit                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| Modifications apportées aux métriques basées sur des logs | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Modifications apportées aux filtres d'exclusion d'index Log Management | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Modifications apportées aux index Log Management | `@evt.name:"Log Management" @asset.type:index` |
| Modifications apportées aux filtres de rétention APM | `@evt.name:APM @asset.type:retention_filter` |
| Modifications apportées aux métriques custom APM | `@evt.name:APM @asset.type:custom_metrics` |
| Modifications apportées aux tags des métriques | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| Créations et suppressions d'applications RUM | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| Modifications apportées aux groupes d'analyse du scanner de données sensibles  | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Créations et suppressions de tests Synthetic | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |

### Onglet Inspect Changes (Diff)

L'onglet Inspect Changes (Diff) du volet de détails des événements d'audit vous permet de comparer une nouvelle configuration à la configuration précédente. Il indique les changements apportés aux configurations des dashboards, notebooks et monitors, qui sont représentés par des objets JSON.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="Le volet latéral des événements d'audit, avec les modifications apportées à la configuration des monitors composite. Le texte surligné en vert correspond au contenu modifié, tandis que le texte surligné en rouge correspond au contenu supprimé." style="width:70%;">}}


## Créer un monitor

Pour créer un monitor afin de surveiller un type d'événement de journal d'audit ou des attributs de journal spécifique, consultez la section [Monitor de journal d'audit][6]. Vous pouvez par exemple créer un monitor qui se déclenche lorsqu'un certain utilisateur se connecte, ou encore lorsqu'un dashboard est supprimé.

## Créer un dashboard ou un graphique

Créez des dashboards pour apporter de nouveaux éléments de contexte visuels à vos événements de journal d'audit. Pour créer un dashboard d'audit, procédez comme suit :

1. Créez un [dashboard][7] dans Datadog.
2. Sélectionnez une visualisation. Vous pouvez représenter les événements d'audit sous la forme de [top lists][8], de [séries temporelles][9] et de [listes][10].
3. [Représentez vos données][11] : sous l'onglet Edit, sélectionnez la source de données *Audit Events*, puis créez une requête. Les événements d'audit sont filtrés par nombre et peuvent être regroupés en fonction de plusieurs facettes. Sélectionnez une facette ainsi qu'une limite.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Définir la source de données Audit Trail pour représenter vos données" style="width:100%;">}}
4. Définissez vos préférences d'affichage et attribuez un titre à votre graphique. Cliquez sur le bouton *Save* pour créer le dashboard.

## Créer un rapport planifié

Avec la fonctionnalité de journal d'audit Datadog, vous pouvez planifier l'envoi régulier d'e-mails contenant des vues d'analyse d'audit. Ces rapports facilitent la surveillance continue de l'utilisation de la plateforme Datadog. Par exemple, vous pouvez choisir de recevoir un rapport hebdomadaire portant sur le nombre de connexions d'utilisateurs Datadog uniques par pays. Cette requête vous permet de surveiller les activités de connexion anormales ou de recevoir automatiquement des statistiques d'utilisation. 

Pour exporter une requête d'analyse d'audit sous la forme d'un rapport, créez une série temporelle, une top list ou une requête de table, puis cliquez sur **More...** > **Export as scheduled report** pour commencer l'exportation de cette requête et l'envoi de rapports planifiés.

{{< img src="account_management/audit_logs/scheduled_report_export.png" alt="Option « Export as scheduled report » du menu déroulant More…" style="width:90%;" >}}

1. Attribuez un nom au dashboard, qui est créé à l'aide du widget de requête. Un dashboard est créé pour chaque rapport planifié. Vous pouvez faire référence à ces dashboards, puis les modifier plus tard si vous avez besoin de changer le contenu du rapport ou son calendrier de publication. 
2. Pour planifier l'envoi des courriels contenant le rapport, personnalisez la fréquence du rapport et la période.
3. Ajoutez les destinataires de votre choix.
4. Ajoutez, si vous le souhaitez, un message personnalisé supplémentaire à inclure dans l'e-mail du rapport.
5. Cliquez sur **Create Dashboard and Schedule Report**.

{{< img src="account_management/audit_logs/export_workflow.png" alt="Exporter une vue d'analyse d'audit au sein d'un e-mail planifié" style="width:80%;" >}}

## Dashboard prêt à l'emploi

Le journal d'audit Datadog comprend un [dashboard prêt à l'emploi][12] qui représente divers événements d'audit, notamment les modifications de la rétention des index, les changements apportés aux pipelines de log, les modifications de dashboard, etc. Dupliquez ce dashboard pour personnaliser les requêtes et visualisations en fonction de vos besoins d'audit.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Dashboard du journal d'audit" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://app.datadoghq.com/event/explorer
[4]: /fr/logs/explorer/
[5]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/?tab=ui#general-permissions
[6]: /fr/monitors/types/audit_trail/
[7]: /fr/dashboards/
[8]: /fr/dashboards/widgets/top_list/
[9]: /fr/dashboards/widgets/timeseries/
[10]: /fr/dashboards/widgets/list/
[11]: /fr/dashboards/querying/#define-the-metric/
[12]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true