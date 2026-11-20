---
aliases:
- /fr/error_tracking/ticketing_systems/case_management/
further_reading:
- link: /error_tracking/explorer/
  tag: Documentation
  text: Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentation
  text: États des problèmes dans Error Tracking
- link: /incident_response/work_management/
  tag: Documentation
  text: Work Management
is_beta: false
private: false
title: Intégrer Work Management avec Error Tracking
---
## Présentation {#overview}

Intégrer Work Management à Error Tracking pour créer et lier des éléments de travail Work Management aux problèmes Error Tracking. Avec Work Management pour Error Tracking, vous pouvez :

- Créer des éléments de travail Work Management directement depuis le panneau des problèmes Error Tracking
- Regrouper plusieurs problèmes Error Tracking dans un seul élément de travail
- Acheminer automatiquement les problèmes vers des projets Work Management spécifiques à l'aide de règles d'automatisation
- Créer automatiquement des éléments de travail Work Management pour les problèmes Error Tracking correspondant à des critères spécifiques.

## Configuration {#setup}

Vous avez besoin des [autorisations][1] suivantes pour utiliser l'intégration Work Management pour Error Tracking :

- Lecture Error Tracking
- Écriture des problèmes Error Tracking
- Lecture des cas
- Écriture des cas

## Créer un élément de travail à partir d'un problème {#create-a-work-item-from-an-issue}

Vous pouvez créer un élément de travail Work Management directement depuis le panneau des problèmes pour regrouper les efforts d'investigation sur ce problème :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau des problèmes, dans le menu déroulant {{< ui >}}Actions{{< /ui >}}, cliquez sur {{< ui >}}Add Case{{< /ui >}}.
4. Choisissez le projet Work Management dans lequel l'élément de travail doit être créé. Par défaut, l'élément de travail sera automatiquement créé dans le projet Error Tracking.
5. Cliquez sur {{< ui >}}Create{{< /ui >}} pour créer l'élément de travail.

Une fois créé, l'élément de travail est lié au problème Error Tracking. Le lien vers l'élément de travail apparaît alors dans le panneau des problèmes, et le statut du problème passe automatiquement à {{< ui >}}REVIEWED{{< /ui >}}.

Lorsqu'un problème est lié à un élément de travail, son état, son responsable et ses commentaires sont synchronisés de manière bidirectionnelle.
Consultez [Synchronisation bidirectionnelle de l'état entre les problèmes et les éléments de travail](#state-dual-way-sync-between-issues-and-work-items) pour plus d'informations sur la façon dont l'état du problème et le statut de l'élément de travail sont synchronisés.

## Regrouper plusieurs problèmes dans un seul élément de travail {#group-multiple-issues-into-a-single-work-item}

Vous pouvez joindre plusieurs problèmes Error Tracking à un seul élément de travail Work Management pour regrouper les problèmes corrélés en une seule unité de travail :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau des problèmes, dans le menu déroulant {{< ui >}}Actions{{< /ui >}}, cliquez sur {{< ui >}}Add Case{{< /ui >}}.
4. Dans l'onglet {{< ui >}}Add to Existing Case{{< /ui >}}, sélectionnez l'élément de travail dans lequel vous souhaitez regrouper vos problèmes.
5. Cliquez sur {{< ui >}}Attach to Case{{< /ui >}} pour joindre le problème à l'élément de travail.
6. Répétez ces actions sur tous les problèmes que vous souhaitez ajouter à ce groupe.

Tous les problèmes Error Tracking liés apparaissent dans la vue de l'élément de travail, offrant une vue consolidée des erreurs associées.

Lorsque plusieurs problèmes sont liés à un élément de travail, leur état, leur responsable et leurs commentaires sont synchronisés de manière bidirectionnelle. Consultez [Synchronisation bidirectionnelle de l'état entre les problèmes et les éléments de travail](#state-dual-way-sync-between-issues-and-work-items) pour plus d'informations sur la façon dont les états des problèmes et le statut des éléments de travail sont synchronisés.

La relation entre les éléments de travail et les problèmes est une relation 1:N. Un seul élément de travail peut être lié à plusieurs problèmes, mais un problème ne peut être lié qu'à un seul élément de travail.

## Synchronisation bidirectionnelle de l'état entre les problèmes et les éléments de travail {#state-dual-way-sync-between-issues-and-work-items}

### Problème Error Tracking unique lié à un élément de travail Work Management unique {#single-error-tracking-issue-linked-to-single-work-management-work-item}

Lorsqu'un problème Error Tracking unique est lié à un élément de travail Work Management, leurs états sont synchronisés de manière bidirectionnelle. L'état du problème est mappé sur
le statut par défaut du groupe de statuts de l'élément de travail correspondant :

| État du problème Error Tracking | Groupe de statuts Work Management |
|----------------------------|------------------------------|
| {{< ui >}}FOR REVIEW{{< /ui >}}  | {{< ui >}}Open{{< /ui >}}        |
| {{< ui >}}REVIEWED{{< /ui >}}    | {{< ui >}}In Progress{{< /ui >}} |
| {{< ui >}}RESOLVED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}IGNORED{{< /ui >}}     | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}EXCLUDED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |

### Plusieurs problèmes Error Tracking liés à un seul élément de travail Work Management {#multiple-error-tracking-issues-linked-to-single-work-management-work-item}

Lorsque plusieurs problèmes Error Tracking sont liés au même élément de travail Work Management, il existe également une synchronisation entre leurs états, selon la situation :
- Si vous mettez à jour le statut de l'élément de travail, tous les problèmes liés sont mis à jour en suivant le mappage d'état décrit dans le paragraphe précédent.
- Si vous mettez à jour l'état d'un problème, l'état résultant des autres problèmes liés et de l'élément de travail suit ces règles :

| État avant                                                       | Action                                                 | État résultant                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Le cas est {{< ui >}}CLOSED{{< /ui >}} et tous les problèmes sont {{< ui >}}RESOLVED{{< /ui >}}.                | Vous mettez à jour un problème vers {{< ui >}}FOR REVIEW{{< /ui >}}.                  | Le cas est {{< ui >}}OPEN{{< /ui >}} mais tous les autres problèmes restent {{< ui >}}RESOLVED{{< /ui >}}.                                      |
| Le cas est {{< ui >}}OPEN{{< /ui >}} et tous les problèmes sont {{< ui >}}FOR REVIEW{{< /ui >}}.                | Vous mettez à jour un problème vers {{< ui >}}RESOLVED{{< /ui >}}.                    | Le cas est {{< ui >}}OPEN{{< /ui >}}, un problème est {{< ui >}}RESOLVED{{< /ui >}}, tous les autres problèmes restent {{< ui >}}FOR REVIEW{{< /ui >}}.              |
| Le cas est {{< ui >}}CLOSED{{< /ui >}} et vous avez un problème non lié {{< ui >}}FOR REVIEW{{< /ui >}}. | Vous liez le problème {{< ui >}}FOR REVIEW{{< /ui >}} à votre cas {{< ui >}}CLOSED{{< /ui >}}. | Le cas est {{< ui >}}CLOSED{{< /ui >}} et tous les problèmes sont {{< ui >}}RESOLVED{{< /ui >}} (y compris le problème nouvellement lié).          |
| Le cas est {{< ui >}}OPEN{{< /ui >}} et vous avez un problème {{< ui >}}RESOLVED{{< /ui >}} non lié.     | Vous liez le problème {{< ui >}}RESOLVED{{< /ui >}} à votre cas {{< ui >}}OPEN{{< /ui >}}.     | Le cas est {{< ui >}}OPEN{{< /ui >}} et tous les problèmes sont {{< ui >}}FOR REVIEW{{< /ui >}} sauf le nouveau qui reste {{< ui >}}RESOLVED{{< /ui >}}. |

## Règles d'automatisation {#automation-rules}

Vous pouvez configurer des règles pour faire correspondre des problèmes spécifiques à des projets Work Management. Par exemple, lorsqu'un problème correspond à une règle, tout élément de travail créé manuellement ou automatiquement pour ce problème est affecté par défaut au projet spécifié par cette règle.

### Configuration {#setup-1}

Pour créer des règles d'automatisation pour vos problèmes Error Tracking, vous avez besoin de l'une (1) des [autorisations][1] suivantes :
- Écriture Error Tracking
- Écriture des paramètres Error Tracking

### Créer une règle d'automatisation {#create-an-automation-rule}

Pour créer une règle d'automatisation pour Work Management :

1. Accédez à [Error Tracking Settings][3], dans la section {{< ui >}}Ticketing & Automation{{< /ui >}}.
2. Cliquez sur {{< ui >}}New Rule{{< /ui >}}.
3. Configurez la règle :
    - {{< ui >}}Match Criteria{{< /ui >}} : Définissez les conditions que les problèmes doivent remplir pour déclencher la règle
    - {{< ui >}}Project{{< /ui >}} : Sélectionnez le projet Work Management de destination lorsque des éléments de travail sont créés à partir de problèmes correspondant à la règle
    - {{< ui >}}Auto-create{{< /ui >}} : Activez éventuellement la création automatique d'éléments de travail lorsque des problèmes correspondent
4. Cliquez sur {{< ui >}}Save Rule{{< /ui >}}.

### Critères de correspondance {#match-criteria}

Configurez les règles en fonction des attributs suivants :

- {{< ui >}}Service{{< /ui >}} : Faites correspondre les problèmes provenant de services spécifiques (par exemple, `service:web-store`)
- {{< ui >}}Team{{< /ui >}} : Faites correspondre les problèmes en fonction de [l'appartenance à l'équipe du problème][4] (par exemple, `team:Shopist`)

Vous pouvez combiner plusieurs critères pour créer des règles de routage précises. La requête de correspondance des problèmes prend en charge les opérateurs suivants :

- `AND` : ET logique (par exemple, `service:web-store AND team:Shopist`)
- `OR` : OU logique (par exemple, `service:web-store OR team:Shopist`)
- `-` : NON logique (par exemple, `service:web-store -team:Shopist`)

<div class="alert alert-info"> Les règles sont ordonnées. La première règle qui correspond à un problème est appliquée.</div>

### Création automatique d'éléments de travail {#automatic-work-item-creation}

Lors de l'ajout d'une règle d'automatisation, vous pouvez activer la création automatique d'éléments de travail pour les problèmes correspondant à votre règle.

Par défaut, lorsqu'un nouveau problème Error Tracking est créé, les règles sont évaluées et la première règle qui correspond est appliquée. Si la création automatique d'éléments de travail est activée sur cette règle correspondante, un nouvel élément de travail Work Management est créé dans le projet spécifié dans votre règle, et joint au problème correspondant.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /fr/error_tracking/issue_team_ownership/