---
aliases:
- /fr/service_management/case_management/settings/
- /fr/incident_response/case_management/settings/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: Documentation
  text: Dépannage des intégrations tierces
- link: /incident_response/work_management/customization
  tag: Documentation
  text: Personnalisation de la gestion du travail
title: Settings
---
## Présentation {#overview}

Dans les paramètres du projet, vous pouvez gérer le contrôle d'accès, configurer les transitions de statut automatiques, mettre en place des intégrations tierces comme Jira et ServiceNow, et plus encore.

## Contrôle d'accès granulaire {#granular-access-control}

Par défaut, l'accès aux projets et aux éléments de travail n'est pas restreint. Le [contrôle d'accès granulaire][1] peut être utilisé pour gérer les autorisations des utilisateurs, des équipes, des rôles ou de votre organisation complète au niveau du projet. Il existe quatre ensembles d'autorisations qui peuvent être utilisés :
- **Gestionnaire** : Les utilisateurs peuvent créer et modifier des éléments de travail, des vues, des paramètres et des autorisations du projet, et peuvent supprimer le projet.
- **Contributeur** : Les utilisateurs peuvent créer, commenter et modifier des éléments de travail. Ils ne peuvent pas modifier les paramètres, les autorisations ou le projet.
- **Lecteur** : Les utilisateurs peuvent voir et surveiller tous les éléments de travail, les vues et les paramètres du projet. Ils ne peuvent pas créer, modifier ou commenter des éléments de travail.
- **Aucun accès** : Les utilisateurs ne peuvent voir aucun élément de travail, aucune vue ni aucun paramètre du projet.

**Remarque** : D'autres produits Datadog qui s'intègrent à Work Management, tels que les Monitors, sont capables de créer automatiquement des éléments de travail au sein d'un projet, indépendamment des paramètres d'accès du projet.

## Transitions de statut {#status-transitions}

Pour réduire le bruit, configurez les éléments de travail pour qu'ils se ferment automatiquement après 7, 14, 30, 90 ou 180 jours d'inactivité depuis la page des transitions de statut des paramètres du projet. L'inactivité est définie comme l'absence d'action initiée par un humain, telle que la mise à jour d'un attribut ou la rédaction d'un commentaire. Une fois par jour, Datadog vérifie les éléments de travail inactifs depuis au moins la période sélectionnée et les clôture.

## Configurer des intégrations{#set-up-integrations}

Work Management propose une gamme d'intégrations natives et tierces, afin que vous puissiez intégrer les solutions Datadog à vos workflows et processus existants. Avec les intégrations Jira, ServiceNow et Linear, vous pouvez résoudre des éléments de travail en utilisant la télémétrie full-stack dans Datadog, tout en conservant un enregistrement de l'investigation dans ces systèmes tiers.

### Monitors {#monitors}

<div class="alert alert-info">Utilisation des identifiants de Monitor <code>@case-&lt;project_handle&gt;</code> terminologie, qui reflète l'ancien nom de Work Management, Case Management.</div>

Accédez à la [page Project Settings][2], cliquez sur **Integrations** > **Datadog Monitors**, puis cliquez sur le commutateur pour obtenir votre @case-<project_handle>.

Les identifiants de projet peuvent être utilisés dans les monitors pour créer automatiquement des éléments de travail. Dans le corps du message du monitor, incluez `@case-<project_handle>`. Datadog suggère un identifiant basé sur le nom du projet. Vous pouvez l'accepter ou le modifier comme vous le souhaitez.

### Intégrations tierces {#third-party-integrations}
Pour configurer des intégrations tierces, accédez à [Créer des notifications et des tickets][3].

## Types de travail et attributs personnalisés {#custom-work-types-and-attributes}

Ajoutez des types de travail et des attributs personnalisés aux projets afin de pouvoir adapter vos éléments de travail à vos besoins organisationnels. Pour plus d'informations, consultez [Work Management Customization][4].


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/granular_access
[2]: https://app.datadoghq.com/work/settings
[3]: /fr/incident_response/work_management/notifications_integrations
[4]: /fr/incident_response/work_management/customization