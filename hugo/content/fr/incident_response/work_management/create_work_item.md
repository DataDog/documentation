---
aliases:
- /fr/service_management/case_management/create_case/
- /fr/incident_response/case_management/create_case/
further_reading:
- link: /incident_response/work_management/view_and_manage
  tag: Documentation
  text: 'Afficher et gérer les éléments de travail :'
- link: /incident_response/work_management/customization
  tag: Documentation
  text: Personnalisation de la gestion du travail
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralisez le travail humain et celui effectué par des agents avec Datadog
    Work Management
title: Créer un élément de travail
---
## Présentation {#overview}

Les éléments de travail peuvent être créés [manuellement](#manual-work-item-creation), [automatiquement](#automatic-work-item-creation) depuis Datadog, ou [par programmation](#api) avec l'API. Il existe deux types d'éléments de travail : standard et sécurité. Les éléments de travail créés à partir de signaux de sécurité et du Sensitive Data Scanner sont automatiquement transformés en cas de sécurité. Le type de travail de sécurité possède toutes les fonctionnalités du type de travail standard, ainsi qu'un champ obligatoire pour spécifier la raison de la clôture d'un élément de travail (test, faux positif ou exception ponctuelle).

## Création manuelle d'un élément de travail {#manual-work-item-creation}

1. Accédez à la [Work Management page][1].
1. Sélectionnez un projet dans lequel créer l'élément de travail. **Remarque** : un élément de travail ne peut appartenir qu'à un seul projet.
1. Cliquez sur **New Work Item**.
1. Saisissez un titre pour l'élément de travail.
1. Sélectionnez un [type de travail](#work-types).
1. (Facultatif) Ajoutez une description.
1. Cliquez sur **Create Work Item** pour terminer.

Vous pouvez également créer des éléments de travail manuellement à partir des produits suivants:

| Product | Instructions |
| ------  | ----------- |
| Monitors | - Sur une [page d'état du monitor][2], définissez éventuellement une plage temporelle et un ou plusieurs groupes de monitors spécifiques. Ensuite, sous **More Actions**, cliquez sur **Create a work item**.<br> - Dans Slack, cliquez sur **Create work item** sous une notification de monitor. |
| Security signals | À côté d'un signal, dans la colonne **Cases**, cliquez sur l'icône **Create Case**. Ensuite, saisissez les détails de l'élément de travail dans la fenêtre **Create Case** qui s'ouvre. |
| Error Tracking | Cliquez sur un problème d'Error Tracking pour ouvrir le panneau latéral. Ensuite, cliquez sur **Actions** et sélectionnez **Add a work item**. |
| Watchdog | Cliquez sur une alerte pour ouvrir son panneau latéral. Cliquez sur le menu déroulant **Actions** et sélectionnez **Create a work item**. |
| Event Management (raw events) | Cliquez sur un événement pour ouvrir son panneau latéral. Cliquez sur le menu déroulant **Actions** et sélectionnez **Create a work item**. |
| Cloud Cost Management | Cliquez sur une recommandation de coûts pour ouvrir le panneau latéral. Ensuite, cliquez sur **Create a work item**. |
| Sensitive Data Scanner | Cliquez sur **Create case** à côté d'un problème de Sensitive Data Scanner.  |
| Slack  | Cliquez sur le bouton **Create Work Item** sous une notification de monitor dans Slack.  |

## Création automatique d'éléments de travail {#automatic-work-item-creation}

Configurez les produits suivants pour créer automatiquement des éléments de travail :
| Produit | Instructions |
| ------  | ----------- |
| Monitors | Accédez à la [page Project Settings][4], cliquez sur **Integrations** > **Datadog Monitors**, puis cliquez sur le bouton bascule pour obtenir votre @case-<project_handle>. <br><br> Lors de la création d'un monitor, incluez `@case-{project_handle}` dans la section **Configure notifications and automations**. Les éléments de travail sont créés automatiquement lorsque le monitor passe à un état différent. Pour créer des éléments de travail uniquement pour certaines transitions de monitor, utilisez des [variables conditionnelles][3]. À titre d'exemple, pour créer des éléments de travail uniquement lorsqu'un monitor se déclenche, entourez la mention `@case` avec "{{#is_alert}}` and `{{/is_alert}}`.<br><br> Activez **Auto-close work items when the monitor group resolves** pour réduire le nettoyage manuel.|
| Event Management (Correlations) | Dans Event Management, les corrélations configurées pour agréger les événements provenant de Datadog et de sources tierces créent automatiquement des éléments de travail.   |
| Workflow Automation | 1. Dans un workflow nouveau ou existant, ajoutez une étape dans le créateur de workflow et recherchez "Case Management".<br> 2. Sélectionnez l'action **Create Case**.<br> 3. Si le workflow est configuré pour s'exécuter en fonction d'un déclencheur de monitor ou de signal de sécurité, ajoutez les déclencheurs de workflow pertinents et assurez-vous d'avoir ajouté le gestionnaire de workflow aux ressources souhaitées. Pour plus d'informations, consultez [Trigger a workflow][6].|
| Error Tracking | Dans Error Tracking, les éléments de travail sont créés automatiquement lorsqu'un problème est commenté ou attribué. |

## Work types {#work-types}

Ajoutez des types de travail lors de la création d'un élément de travail. Tous les types de travail ne sont pas disponibles pour une configuration entre création manuelle et automatique. Par exemple, seuls les types `Standard`, `Security` et `Change Request`, `Event Management` sont disponibles lors de la création manuelle d'éléments de travail.

Pour ajouter et activer des types de travail personnalisés, consultez [Personnalisation de la gestion du travail][7].

| Type de travail  | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Standard         | Un élément de travail polyvalent pour les tâches opérationnelles, les enquêtes, et plus encore.     |
| Change Request   | Utilisé dans les workflows de gestion des changements pour suivre les changements planifiés ou approuvés.   |
| Event Management | Intégré au produit Event Management pour héberger les événements corrélés.    |
| Security         | Utilisé par les équipes et les produits de Security pour gérer les enquêtes ou les alertes.     |
| Error Tracking   | Lié au produit Error Tracking pour suivre et corriger les problèmes d'application. |
| Custom Type      | Ajoutez un type de travail personnalisé. Pour plus d'informations, consultez [Work Management Customization][7]. |

## API {#api}

Créer un élément de travail par le [API endpoint][5].

**Remarque** : Cet endpoint nécessite le périmètre d'autorisation `cases_write`.

<div class="alert alert-info">Les endpoints de l'API Work Management utilisent <code>case-management</code> une terminologie qui reflète l'ancien nom du produit.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /fr/monitors/status/
[3]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/work/settings
[5]: /fr/api/latest/case-management/#create-a-case
[6]: /fr/actions/workflows/trigger/
[7]: /fr/incident_response/work_management/customization