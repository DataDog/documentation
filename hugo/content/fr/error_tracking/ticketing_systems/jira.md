---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentation
  text: Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentation
  text: États des problèmes dans Error Tracking
- link: /integrations/jira/
  tag: Documentation
  text: Intégration Jira
is_beta: false
private: false
site_support_id: jira_error_tracking
title: Intégrer Jira à Error Tracking
---
## Vue d'ensemble {#overview}

Intégrez Jira à Error Tracking pour créer et lier des tickets Jira aux problèmes Error Tracking. Avec Jira pour Error Tracking, vous pouvez :

- Créer des tickets Jira directement depuis le panneau du problème Error Tracking
- Regrouper plusieurs problèmes Error Tracking dans un seul ticket
- Acheminer automatiquement les problèmes Error Tracking vers des tableaux Jira spécifiques à l'aide de règles d'automatisation
- Créez automatiquement des tickets Jira pour les problèmes Error Tracking correspondant à des critères spécifiques.

## Prérequis {#prerequisites}

<div class="alert alert-info">La création de tickets à partir d'un problème Error Tracking est disponible pour Jira Cloud et Data Center. La synchronisation bidirectionnelle entre Jira et Error Tracking est uniquement disponible pour Jira Cloud.</div>

1. Configurez l'[intégration Jira pour Datadog][7].
2. Assurez-vous de disposer des [autorisations][1] suivantes :
   - Lecture Error Tracking
   - Écriture des problèmes Error Tracking
   - Lecture des cas
   - Écriture des cas
   - Lecture des intégrations

## Créer un ticket à partir d'un problème {#create-a-ticket-from-an-issue}

Vous pouvez créer un ticket Jira directement depuis le panneau du problème pour regrouper les efforts d'investigation sur ce problème :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau du problème, dans le menu déroulant {{< ui >}}Actions{{< /ui >}}, cliquez sur {{< ui >}}Add Jira ticket{{< /ui >}}.
4. Choisissez le compte Jira et le projet dans lesquels le ticket doit être créé. Ensuite, choisissez le type de ticket que vous souhaitez créer.
5. Optionnellement, accédez aux paramètres de Data Sync pour configurer la manière dont les données doivent être synchronisées entre Datadog et Jira.
6. Cliquez sur {{< ui >}}Create{{< /ui >}} pour créer le ticket.

{{< img src="error_tracking/create-ticket.png" alt="Créer un ticket Jira à partir d'un problème Error Tracking" style="width:100%;" >}}

Une fois créé, le ticket est lié au problème Error Tracking. Le lien du ticket apparaît dans le panneau du problème, et le statut du problème passe automatiquement à {{< ui >}}REVIEWED{{< /ui >}}.

Lorsqu'un problème est lié à un ticket, son état, son responsable et ses commentaires sont synchronisés de manière bidirectionnelle. Consultez [Synchronisation bidirectionnelle de l'état entre les problèmes et les tickets](#state-dual-way-sync-between-issues-and-tickets) pour plus d'informations sur la façon dont l'état du problème et le statut du ticket sont synchronisés.

## Regrouper plusieurs problèmes dans un seul ticket {#group-multiple-issues-into-a-single-ticket}

Vous pouvez joindre plusieurs problèmes Error Tracking à un seul ticket Jira pour regrouper les problèmes corrélés en une seule unité de travail :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau du problème, dans le menu déroulant {{< ui >}}Actions{{< /ui >}}, cliquez sur {{< ui >}}Add Jira ticket{{< /ui >}}.
4. Dans l'onglet {{< ui >}}Add to Existing{{< /ui >}}, collez l'URL du ticket dans lequel vous souhaitez regrouper vos problèmes.
5. Optionnellement, accédez aux paramètres de Data Sync pour configurer la manière dont les données doivent être synchronisées entre Datadog et Jira.
6. Cliquez sur {{< ui >}}Link to Issue{{< /ui >}} pour joindre le problème au ticket.
7. Répétez ces actions sur tous les problèmes que vous souhaitez ajouter à ce groupe.

{{< img src="error_tracking/add-to-existing-ticket.png" alt="Ajouter un problème Error Tracking à un ticket Jira existant" style="height:300px;" >}}

Lorsque plusieurs problèmes sont liés à un seul ticket, leur état, leur responsable et leurs commentaires sont synchronisés de manière bidirectionnelle. Consultez [Synchronisation bidirectionnelle des états entre les problèmes et les tickets](#state-dual-way-sync-between-issues-and-tickets) pour plus d'informations sur la manière dont les états des problèmes et le statut des tickets sont synchronisés.

La relation entre les tickets et les problèmes est une relation 1:N. Un seul ticket peut être lié à plusieurs problèmes, mais un problème ne peut être lié qu'à un seul ticket Jira.

## Synchronisation bidirectionnelle des états entre les problèmes et les tickets {#state-dual-way-sync-between-issues-and-tickets}

Si la synchronisation bidirectionnelle est activée et configurée entre les projets Datadog et Jira, les états des problèmes Error Tracking et des tickets Jira sont mis en miroir. Si vous rencontrez un comportement inattendu lors de cette synchronisation des états, consultez la section [Dépannage](#troubleshooting) pour savoir comment corriger votre configuration.

### Problème Error Tracking unique lié à un ticket Jira unique {#single-error-tracking-issue-linked-to-single-jira-ticket}

Lorsqu'un problème Error Tracking unique est lié à un ticket Jira, son état est synchronisé de manière bidirectionnelle. Le mappage entre ces états peut être configuré dans les paramètres de synchronisation des données des formulaires de création de ticket ou de règle d'automatisation :

{{< img src="error_tracking/jira-status-mapping.png" alt="Mapper les états des problèmes Error Tracking aux statuts des tickets Jira" style="width:100%;" >}}

### Plusieurs problèmes Error Tracking liés à un ticket Jira unique {#multiple-error-tracking-issues-linked-to-single-jira-ticket}

Lorsque plusieurs problèmes Error Tracking sont liés au même ticket Jira, il existe également une synchronisation entre leurs états, selon la situation. Si vous mettez à jour le statut du ticket, tous les problèmes liés sont mis à jour pour refléter cet état conformément à votre mappage.

En supposant que votre mappage soit défini comme suit :

| Groupe de statuts Work Management | Statut du ticket Jira |
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Si vous mettez à jour l'état d'un problème, l'état résultant des autres problèmes liés et du ticket Jira suit ces règles :

| État initial                                                      | Action                                                 | État résultant                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| Le ticket est {{< ui >}}Done{{< /ui >}} et tous les problèmes sont {{< ui >}}Resolved{{< /ui >}}.                | Vous mettez à jour un problème vers {{< ui >}}For Review{{< /ui >}}.                  | Le ticket est {{< ui >}}To Do{{< /ui >}} mais tous les autres problèmes restent {{< ui >}}Resolved{{< /ui >}}.                                      |
| Le ticket est {{< ui >}}To Do{{< /ui >}} et tous les problèmes sont {{< ui >}}For Review{{< /ui >}}.             | Vous mettez à jour un problème vers {{< ui >}}Resolved{{< /ui >}}.                    | Le ticket est {{< ui >}}To Do{{< /ui >}}, un problème est {{< ui >}}Resolved{{< /ui >}}, tous les autres problèmes restent {{< ui >}}For Review{{< /ui >}}.              |
| Le ticket est {{< ui >}}Done{{< /ui >}} et vous avez un problème non lié {{< ui >}}For Review{{< /ui >}}. | Vous liez le {{< ui >}}For Review{{< /ui >}} problème à votre ticket {{< ui >}}Done{{< /ui >}}. | Le ticket est {{< ui >}}Done{{< /ui >}} et tous les problèmes sont {{< ui >}}Resolved{{< /ui >}} (y compris le problème nouvellement lié).             |
| Le ticket est {{< ui >}}To Do{{< /ui >}} et vous avez un problème {{< ui >}}Resolved{{< /ui >}} non lié.  | Vous liez le {{< ui >}}Resolved{{< /ui >}} problème à votre ticket {{< ui >}}To Do{{< /ui >}}.  | Le ticket est {{< ui >}}To Do{{< /ui >}} et tous les problèmes sont {{< ui >}}For Review{{< /ui >}}, sauf le nouveau qui reste {{< ui >}}Resolved{{< /ui >}}. |

## Règles d'automatisation {#automation-rules}

Vous pouvez configurer des règles pour faire correspondre des problèmes spécifiques à des tableaux Jira. Lorsqu'un problème correspond à une règle, tout ticket créé manuellement ou automatiquement pour ce problème sera affecté par défaut au tableau spécifié par votre règle.

### Configuration {#setup}

Pour créer des règles d'automatisation pour vos problèmes Error Tracking, vous avez besoin de l'une (1) des [autorisations][1] suivantes :
- Écriture Error Tracking
- Écriture des paramètres Error Tracking

### Créer une règle d'automatisation {#create-an-automation-rule}

Pour créer une règle d'automatisation pour Jira :

1. Accédez à [Error Tracking Settings][3], dans la section {{< ui >}}Ticketing & Automation{{< /ui >}}.
2. Cliquez sur {{< ui >}}New Rule{{< /ui >}}.
3. Configurez la règle :
    - {{< ui >}}Match Criteria{{< /ui >}} : Définissez les conditions que les problèmes doivent remplir pour déclencher la règle
    - {{< ui >}}Destination{{< /ui >}} : Sélectionnez le compte et le projet Jira de destination lorsque des tickets sont créés à partir de problèmes correspondant à la règle. Sélectionnez le type de ticket que vous souhaitez créer et fournissez des valeurs pour tous les champs obligatoires du ticket.
    - {{< ui >}}Auto-create{{< /ui >}} : Activez éventuellement la création automatique de tickets lorsque les problèmes correspondent
4. Cliquez sur {{< ui >}}Save Rule{{< /ui >}}.

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Créer une règle d'automatisation Jira" style="width:100%;" >}}

### Critères de correspondance {#match-criteria}

Configurez les règles en fonction des attributs suivants :

- {{< ui >}}Service{{< /ui >}} : Faites correspondre les problèmes provenant de services spécifiques (par exemple, `service:web-store`)
- {{< ui >}}Team{{< /ui >}} : Faites correspondre les problèmes en fonction de [l'appartenance à l'équipe du problème][4] (par exemple, `team:Shopist`)

Vous pouvez combiner plusieurs critères pour créer des règles de routage précises. La requête de correspondance des problèmes prend en charge les opérateurs suivants :

- `AND` : ET logique (par exemple, `service:web-store AND team:Shopist`)
- `OR` : OU logique (par exemple, `service:web-store OR team:Shopist`)
- `-` : NON logique (par exemple, `service:web-store -team:Shopist`)

<div class="alert alert-info">Les règles sont ordonnées. La première règle qui correspond à un problème est appliquée.</div>

### Création automatique de tickets {#automatic-ticket-creation}

Lors de l'ajout d'une règle d'automatisation, vous pouvez activer la création automatique de tickets Jira pour les problèmes correspondant à votre règle.

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="Activer la création automatique de cas" style="height:300px;" >}}

Lorsqu'un nouveau problème Error Tracking est créé, les règles sont évaluées et la première règle qui correspond est appliquée. Si la création automatique de tickets est activée sur cette règle correspondante, un nouveau ticket Jira sera créé sur le tableau Jira spécifié dans votre règle et attaché au problème correspondant.

## Dépannage {#troubleshooting}

Si vous rencontrez des comportements inattendus lors de l'utilisation de systèmes de tickets avec Error Tracking, les étapes de dépannage suivantes peuvent vous aider à résoudre le problème rapidement. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][5].

### La synchronisation est interrompue entre Jira et Error Tracking {#sync-is-broken-between-jira-and-error-tracking}

Si vous rencontrez des problèmes de synchronisation entre vos tickets Jira et les problèmes Error Tracking correspondants (par exemple, si l'état du ticket n'est pas mis à jour lorsque vous fermez le ticket Jira), vérifiez que les étapes suivantes sont toutes correctement configurées :

1. Dans le panneau des issues, assurez-vous que l'issue est correctement liée au ticket Jira.
2. Un élément de travail Work Management a été automatiquement créé par Datadog pour servir de point de liaison entre l'issue Error Tracking et le ticket Jira. Vous pouvez accéder à cet élément de travail depuis le panneau des issues pour trouver le projet Work Management dans lequel il a été créé. Dans les paramètres de Work Management, assurez-vous que l'intégration Jira est activée pour ce projet et que le compte et le tableau Jira corrects sont configurés.

3. Dans les paramètres de Work Management, assurez-vous que la synchronisation entre Work Management et Jira est activée pour ce projet. Vérifiez que les champs que vous souhaitez synchroniser sont configurés pour une synchronisation bidirectionnelle entre Datadog et Jira.

4. Un webhook doit être configuré pour synchroniser automatiquement les mises à jour entre Datadog et Jira. Dans vos paramètres Jira, vérifiez la présence de ce webhook. Si le webhook est manquant, suivez [ces étapes][6] pour l'ajouter et corriger la synchronisation entre Datadog et Jira.

### Le Reporter sur les tickets Jira est le mauvais utilisateur {#reporter-on-jira-tickets-is-the-wrong-user}

Lorsqu'un ticket Jira est créé à partir d'une issue Error Tracking, le champ {{< ui >}}Reporter{{< /ui >}} du ticket est défini sur l'utilisateur Datadog qui a configuré l'intégration Jira, et non sur l'utilisateur qui a déclenché la création du ticket. Il s'agit d'une limitation connue de l'intégration Jira pour Datadog qui s'applique à chaque ticket créé à partir d'une issue Error Tracking. Pour modifier le Reporter sur un ticket spécifique, mettez-le à jour directement dans Jira après sa création.

### Un nouveau projet Work Management est créé pour chaque ticket Jira {#a-new-work-management-project-is-created-for-each-jira-ticket}

Datadog Work Management mappe chaque type d'issue Jira à un projet Work Management différent. Lorsque vous créez un ticket à partir d'une issue Error Tracking en utilisant un type d'issue Jira qui n'a pas été utilisé auparavant, un nouveau projet Work Management est automatiquement créé pour lier l'issue Error Tracking et le ticket Jira. Ce comportement signifie que la création de tickets avec plusieurs types d'issue Jira au fil du temps produit plusieurs projets Work Management, un par type d'issue.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /fr/error_tracking/issue_team_ownership/
[5]: /fr/help/
[6]: /fr/integrations/jira/#configure-a-jira-webhook
[7]: /fr/integrations/jira/#setup