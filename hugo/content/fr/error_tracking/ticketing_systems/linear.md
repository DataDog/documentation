---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentation
  text: Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: Documentation
  text: États des problèmes dans Error Tracking
- link: /integrations/linear/
  tag: Documentation
  text: Intégration Linear
is_beta: false
private: false
site_support_id: linear_error_tracking
title: Intégrez Linear avec Error Tracking
---
## Présentation {#overview}

Intégrez Linear avec Error Tracking pour créer et lier des problèmes Linear à des problèmes Error Tracking. Avec cette intégration, vous pouvez :

- Créer des problèmes Linear directement depuis le panneau des problèmes Error Tracking
- Regrouper plusieurs problèmes Error Tracking dans un seul problème Linear

## Prérequis {#prerequisites}

1. Configurez l'[intégration Linear pour Datadog][7].
2. Assurez-vous de disposer des [autorisations][1] suivantes :
   - Lecture Error Tracking
   - Écriture des problèmes Error Tracking
   - Lecture des cas
   - Écriture des cas
   - Lecture des intégrations

## Créer un problème Linear à partir d'un problème Error Tracking {#create-a-linear-issue-from-an-error-tracking-issue}

Créez un problème Linear directement depuis le panneau des problèmes pour regrouper les efforts d'investigation sur ce problème :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau des problèmes, dans le menu déroulant **Actions**, cliquez sur **Ajouter un problème Linear**.
4. Choisissez l'espace de travail et l'équipe Linear pour le nouveau problème Linear.
5. Optionnellement, ouvrez les paramètres de synchronisation des données pour configurer la manière dont les données se synchronisent entre Datadog et Linear.
6. Cliquez sur **Créer** pour créer le problème Linear.

{{< img src="error_tracking/create-linear-issue.png" alt="Créer un problème Linear à partir d'un problème Error Tracking" style="width:100%;" >}}

Une fois le problème Linear créé, il est lié au problème Error Tracking et apparaît dans le panneau des problèmes. Le statut du problème Error Tracking passe automatiquement à **REVIEWED**.

Lorsqu'un problème Error Tracking est lié à un problème Linear, l'état, le responsable et les commentaires sont synchronisés de manière bidirectionnelle. Pour plus de détails, consultez [Synchronisation bidirectionnelle de l'état entre les problèmes Error Tracking et les problèmes Linear](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

## Regrouper plusieurs problèmes Error Tracking dans un seul problème Linear {#group-multiple-error-tracking-issues-into-a-single-linear-issue}

Attachez plusieurs problèmes Error Tracking à un seul problème Linear pour regrouper les problèmes corrélés en une seule unité de travail :

1. Accédez à l'[Error Tracking Explorer][2].
2. Cliquez sur un problème pour ouvrir le panneau du problème.
3. Dans le panneau des problèmes, dans le menu déroulant **Actions**, cliquez sur **Ajouter un problème Linear**.
4. Dans l'onglet **Ajouter à l'existant**, collez l'URL du problème Linear dans lequel vous souhaitez regrouper vos problèmes Error Tracking.
5. Optionnellement, ouvrez les paramètres de synchronisation des données pour configurer la manière dont les données se synchronisent entre Datadog et Linear.
6. Cliquez sur **Lier au problème** pour lier le problème Error Tracking au problème Linear.
7. Répétez ces actions sur tous les problèmes Error Tracking que vous souhaitez ajouter à ce groupe.

{{< img src="error_tracking/add-to-existing-linear-issue.png" alt="Ajouter un problème Error Tracking à un problème Linear existant" style="height:300px;" >}}

Lorsque plusieurs problèmes Error Tracking sont liés à un seul problème Linear, l'état, le responsable et les commentaires sont synchronisés de manière bidirectionnelle. Pour plus de détails, consultez [Synchronisation bidirectionnelle de l'état entre les problèmes Error Tracking et les problèmes Linear](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

La relation entre les problèmes Linear et les problèmes Error Tracking est une relation 1:N. Un seul problème Linear peut être lié à plusieurs problèmes Error Tracking, mais un problème Error Tracking ne peut être lié qu'à un seul problème Linear.

## Synchronisation bidirectionnelle de l'état entre les problèmes Error Tracking et les problèmes Linear {#state-two-way-sync-between-error-tracking-issues-and-linear-issues}

Si la synchronisation bidirectionnelle est activée et configurée entre les équipes Datadog et Linear, les états des problèmes Error Tracking et des problèmes Linear sont mis en miroir. Si vous rencontrez un comportement inattendu, consultez la section [Dépannage](#troubleshooting) pour savoir comment corriger votre configuration.

### Problème Error Tracking unique lié à un problème Linear unique {#single-error-tracking-issue-linked-to-single-linear-issue}

Lorsqu'un seul problème Error Tracking est lié à un problème Linear, leurs états sont synchronisés de manière bidirectionnelle. Le mappage entre ces états peut être configuré dans les paramètres de synchronisation des données du formulaire de création de problèmes Linear :

{{< img src="error_tracking/linear-status-mapping.png" alt="Mapper les états des problèmes Error Tracking aux états des problèmes Linear" style="width:100%;" >}}

### Plusieurs problèmes Error Tracking liés à un seul problème Linear {#multiple-error-tracking-issues-linked-to-single-linear-issue}

Lorsque plusieurs problèmes Error Tracking sont liés au même problème Linear, leurs états se synchronisent en fonction de l'action que vous effectuez. Si vous mettez à jour le statut du problème Linear, tous les problèmes Error Tracking liés sont mis à jour pour refléter cet état en fonction de votre mappage.

En supposant que votre mappage soit défini comme suit :

| Groupe de statut de gestion du travail | État du problème Linear |
|------------------------------|--------------------|
| `Open`                       | `Todo`             |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Si vous mettez à jour l'état d'un problème Error Tracking, l'état résultant des autres problèmes Error Tracking liés et du problème Linear suit ces règles :

| État initial | Action | État résultant |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Le problème Linear est `Done` et tous les problèmes Error Tracking liés sont `Resolved`. | Mettez à jour un problème Error Tracking vers `For Review`.                | Le problème Linear passe à `Todo`. Les autres problèmes Error Tracking liés restent `Resolved`.         |
| Le problème Linear est `Todo` et tous les problèmes Error Tracking liés sont `For Review`. | Mettez à jour un problème Error Tracking vers `Resolved`.                  | Le problème Linear reste `Todo`. Le problème Error Tracking mis à jour est `Resolved` ; les autres restent `For Review`. |
| Le problème Linear est `Done`, et un problème Error Tracking non lié est `For Review`. | Liez le problème Error Tracking `For Review` au problème Linear. | Le problème Linear reste `Done`. Tous les problèmes Error Tracking liés sont `Resolved`, y compris celui nouvellement lié. |
| Le problème Linear est `Todo`, et un problème Error Tracking non lié est `Resolved`. | Liez le problème Error Tracking `Resolved` au problème Linear.   | Le problème Linear reste `Todo`. Les autres problèmes Error Tracking liés restent `For Review`, et celui nouvellement lié reste `Resolved`. |

## Dépannage {#troubleshooting}

Si vous rencontrez des comportements inattendus lors de l'utilisation de systèmes de gestion des tickets avec Error Tracking, consultez les étapes de dépannage suivantes. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][5].

### La synchronisation est interrompue entre Linear et Error Tracking {#sync-is-broken-between-linear-and-error-tracking}

Si vous rencontrez des problèmes de synchronisation entre vos problèmes Linear et les problèmes Error Tracking correspondants (par exemple, si l'état du problème Error Tracking n'est pas mis à jour lorsque vous fermez le problème Linear), vérifiez que les étapes suivantes sont toutes correctement configurées :

1. Dans le panneau du problème, assurez-vous que le problème Error Tracking est correctement lié au problème Linear.
2. Vérifiez que Work Management est correctement configuré pour se synchroniser avec Linear.

   Datadog crée automatiquement un élément de travail Work Management pour lier les problèmes Error Tracking et les problèmes Linear. Pour vérifier la configuration :
   - Depuis le panneau du problème, ouvrez l'élément de travail Work Management lié pour trouver son projet.
   - Dans les paramètres de Work Management, vérifiez que l'intégration Linear est activée pour ce projet.
   - Vérifiez que l'espace de travail et l'équipe Linear corrects sont configurés.

3. Dans les paramètres de Work Management, assurez-vous que la synchronisation entre Work Management et Linear est activée pour ce projet. Vérifiez que les champs que vous souhaitez synchroniser sont configurés pour une synchronisation bidirectionnelle entre Datadog et Linear.

4. Dans vos paramètres Linear, vérifiez qu'un webhook est configuré pour synchroniser automatiquement les mises à jour entre Datadog et Linear. Si le webhook est manquant, [ajoutez un webhook Linear][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[5]: /fr/help/
[6]: /fr/integrations/linear/#configure-a-linear-webhook
[7]: /fr/integrations/linear/