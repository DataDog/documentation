---
aliases:
- /fr/bits_ai/bits_ai_sre/configure/
title: Configurez les intégrations et les paramètres
---
Configurez des intégrations pour étendre les capacités de Bits Investigation :
- [Intégrez des plateformes d'observabilité et de SCM tierces](#integrate-with-third-party-observability-and-scm-platforms) pour enrichir les investigations avec de la télémétrie externe et du contexte de code.
- [Envoyez les résultats d'investigation vers des plateformes ITSM et de collaboration](#send-investigation-findings-to-itsm-and-collaboration-platforms) pour rationaliser la réponse aux incidents.
- [Extrayez du contexte depuis des bases de connaissances](#pull-context-from-knowledge-bases) pour intégrer des runbooks et de la documentation dans les investigations.

## Intégrez des plateformes d'observabilité et de SCM tierces {#integrate-with-third-party-observability-and-scm-platforms}

Bits Investigation s'intègre à GitHub, Grafana, Dynatrace, Splunk, Sentry et ServiceNow pour incorporer des données d'observabilité et du code source dans les investigations. L'accès au code source est également requis pour que Bits Code génère une correction de code lorsque Bits Investigation identifie un problème pouvant être résolu dans le code.

### GitHub {#github}
Pour configurer GitHub :
1. Installez l'[intégration GitHub][13].
1. [Taguez votre télémétrie APM avec des informations Git][14] pour lier les versions d'application en cours d'exécution à des dépôts et des commits spécifiques.

## Envoyez les résultats d'investigation vers des plateformes ITSM et de collaboration {#send-investigation-findings-to-itsm-and-collaboration-platforms}

Par défaut, toutes les investigations sont listées sur la page [Bits Investigations][1].

Pour les investigations d'alertes de monitor, un résumé des résultats est disponible sur la page d'état du monitor. Si votre monitor a déjà `@slack`, `@case` ou `@oncall` [notifications][2] configurées, Bits publie automatiquement ses résultats vers ces destinations. Sinon, vous pouvez configurer ces intégrations en suivant les instructions ci-dessous.


### Slack {#slack}

1. Assurez-vous que l'[application Slack Datadog][3] est installée dans votre espace de travail Slack.
1. Dans votre monitor, accédez à {{< ui >}}Configure notifications and automations{{< /ui >}} et ajoutez le handle `@slack-{channel-name}`. Ceci envoie des notifications de monitor à votre canal Slack choisi.
1. Enfin, accédez à [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][4] et connectez votre espace de travail Slack. Cela permet à Bits d'écrire ses résultats directement sous la notification de monitor dans Slack.

<div class="alert alert-info">Chaque espace de travail Slack ne peut être connecté qu'à une seule organisation Datadog.</div>

### Microsoft Teams (Préversion) {#microsoft-teams-preview}

1. [Connectez votre tenant Microsoft à Datadog][12].
1. Dans votre monitor, accédez à {{< ui >}}Configure notifications and automations{{< /ui >}} et ajoutez le handle `@teams-{handle-name}`. Ceci envoie des notifications de monitor à votre canal MS Teams choisi. Bits ajoutera ses résultats à ces notifications.

<div class="alert alert-info">
L'intégration Microsoft Teams avec Bits Investigation est en préversion pour tous les clients.</div>

### Datadog Work Management {#datadog-work-management}

Datadog Work Management fournit un espace de travail centralisé pour trier, suivre et corriger les problèmes détectés par Datadog et les intégrations tierces. Bits Investigation transmet automatiquement ses résultats d'investigation à Jira et ServiceNow via Work Management.

Pour configurer Work Management, ainsi que les intégrations Jira et ServiceNow :
1. Créez un [projet Work Management][5] pour votre équipe.
1. Dans Datadog, accédez à [{{< ui >}}Work Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][6]. Dans la liste des projets, développez votre projet, accédez à {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog Monitors{{< /ui >}}, et activez le commutateur {{< ui >}}Enable Datadog Monitors integration for this project{{< /ui >}}. Ceci génère le handle unique de votre projet: `@case-{project_name}`.
1. Sur la même page, sous {{< ui >}}Integrations{{< /ui >}}, configurez les intégrations Work Management Jira et/ou ServiceNow. Lorsqu'un nouvel élément de travail est créé, Work Management peut ouvrir automatiquement le ticket Jira ou l'incident ServiceNow correspondant.
1. Dans votre monitor, accédez à {{< ui >}}Configure notifications and automations{{< /ui >}} et ajoutez le handle `@case-{project_name}`. Lorsque le monitor se déclenche :
   - Datadog crée automatiquement un nouvel élément de travail
   - L'élément de travail crée un ticket Jira ou un incident ServiceNow lié
   - Bits écrit ses conclusions d'investigation directement dans l'élément de travail, qui est ajouté à Jira en tant que commentaire de chronologie ou à ServiceNow en tant que note de travail

### Datadog On-Call {#datadog-on-call}

Datadog On-Call est une solution d'appel qui unifie la surveillance, l'appel et la réponse aux incidents sur une plateforme unique.

Pour configurer On-Call, dans votre monitor, accédez à {{< ui >}}Configure notifications and automations{{< /ui >}} et ajoutez le handle `@oncall-{team}`. Les conclusions de Bits peuvent ensuite apparaître sur la page On-Call dans l'application mobile Datadog, aidant vos équipes à trier les problèmes lors de leurs déplacements.

## Extrayez le contexte des bases de connaissances {#pull-context-from-knowledge-bases}

### Confluence {#confluence}
Bits Investigation s'intègre à Confluence pour :
- Trouver la documentation et les runbooks pertinents pour étayer ses investigations sur les alertes de monitor
- Vous permettre d'interagir directement avec votre contenu Confluence via le chat

Pour configurer Bits Investigation afin d'utiliser Confluence :

1. Connectez votre compte Confluence Cloud en suivant les instructions dans la [tuile d'intégration Confluence][7].
1. Optionnellement, activez l'exploration de compte pour faire de Confluence une source de données dans l'interface de chat de Bits. Si vous n'activez pas l'exploration de compte, Bits peut toujours utiliser Confluence pour éclairer son plan d'investigation.
1. Ajoutez un lien vers une page Confluence dans le message de votre monitor. Bits lit la page pour extraire les liens de télémétrie Datadog et d'autres informations contextuelles lors de l'élaboration de son plan d'investigation.
1. Vous pouvez consulter tous les comptes Confluence connectés sur la [page Paramètres Bits][4].

## Configurer les autorisations {#configure-permissions}

Il existe deux autorisations RBAC qui s'appliquent à Bits Investigation :

| Nom                                                    | Description                            | Rôle par défaut           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Lecture des investigations Bits (`bits_investigations_read`)   | Lire les investigations Bits.              | Rôle Datadog Read Only |
| Écriture des investigations Bits (`bits_investigations_write`) | Exécuter et configurer les investigations Bits. | Rôle standard Datadog  |

Ces autorisations sont ajoutées par défaut aux rôles gérés. Si votre organisation utilise des rôles personnalisés ou a précédemment modifié les rôles par défaut, un administrateur disposant de l'autorisation de gestion des accès utilisateur doit ajouter manuellement ces autorisations aux rôles appropriés. Pour plus de détails, consultez [Access Control][8].

### Désactiver Bits Investigation {#disable-bits-investigation}

Pour empêcher votre organisation d'utiliser Bits Investigation, un administrateur disposant de l'autorisation de gestion des accès utilisateur doit supprimer les autorisations `bits_investigations_read` et `bits_investigations_write` de tous les rôles. Pour plus de détails, consultez [Access Control][8].

Ou bien, un administrateur peut désactiver tous les produits IA facturables via des crédits IA en utilisant le bouton de bascule au niveau de l'organisation dans [Forfait et utilisation > Crédits IA][16]. Pour plus de détails, consultez [Contrôles administrateur pour les crédits IA][17].

## Configurer les limites de débit {#configure-rate-limits}

Les limites de débit définissent le nombre maximal d'investigations automatiques que Bits peut exécuter sur une période glissante de 24 heures. Une fois qu'une limite de débit est atteinte, vous pouvez continuer à déclencher des [investigations manuelles][9].

### Types de limites de débit {#types-of-rate-limits}

Limite par monitor
: Contrôle la fréquence à laquelle les investigations sont déclenchées automatiquement à partir d'un seul monitor sur une période glissante de 24 heures.
: **Par défaut :** Chaque monitor peut déclencher une investigation automatique par période de 24 heures.

Limite de l'organisation
: Définit le nombre total d'investigations automatiques que Bits peut exécuter dans l'ensemble de votre organisation sur une période de 24 heures.
: **Par défaut :** Aucune limite.

### Définir une limite de débit {#set-a-rate-limit}

Pour définir une limite de débit :
1. Accédez à [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Rate Limits{{< /ui >}}][10].
2. Activez la limite de débit que vous souhaitez utiliser.
3. Définissez le nombre maximal d'investigations que vous souhaitez exécuter sur une période glissante de 24 heures.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="bits_ai/rate_limits.png" alt="Options pour définir une limite de débit" style="width:60%;" >}}

## Audit Trail {#audit-trail}

Vous pouvez surveiller les actions initiées par les utilisateurs avec [Audit Trail][11]. Les événements sont envoyés lorsque :
- Un utilisateur lance manuellement une investigation et lorsque l'investigation se termine
- Un appel d'outil est exécuté dans une investigation manuelle
- Un utilisateur active ou désactive les investigations automatiques pour un monitor
- Un utilisateur modifie la limite de débit du monitor

## Actions {#actions}

Bits Investigation fournit trois [Actions][15] :
- Déclencher une investigation
- Obtenir une investigation
- Lister les investigations

Vous pouvez utiliser ces Actions pour créer des Workflows, des Agents et des Applications adaptés à votre cas d'utilisation.

## API {#api}

Vous pouvez déclencher et récupérer des investigations par programmation [via API][18].

[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /fr/monitors/notify
[3]: https://docs.datadoghq.com/fr/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /fr/incident_response/work_management/projects
[6]: https://app.datadoghq.com/work/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /fr/account_management/rbac
[9]: /fr/bits_ai/bits_investigation/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /fr/account_management/audit_trail/events/#bits-ai-sre
[12]: /fr/integrations/microsoft-teams/?tab=datadogapprecommended
[13]: /fr/integrations/github/
[14]: /fr/source_code/service-mapping
[15]: /fr/actions/workflows/actions/
[16]: https://app.datadoghq.com/billing/bill-overview?detail_bd=ai_credits
[17]: /fr/account_management/billing/ai_credits/#admin-controls
[18]: /fr/api/latest/bits-ai/