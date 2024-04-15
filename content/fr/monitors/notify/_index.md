---
aliases:
- /fr/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /fr/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /fr/developers/faq/what-do-notifications-do-in-datadog
- /fr/monitors/notifications/
description: Envoyer des notifications à vos équipes lorsque des monitors déclenchent
  des alertes
further_reading:
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors

title: Notifications
---

## Présentation

Les notifications constituent un outil clé des monitors. Elles vous permettent de tenir votre équipe informée des problèmes et de faciliter leur résolution. Lorsque vous [créez un monitor][1], prenez le temps de remplir les sections **Say what's happening** et **Notify your team**.

## Say what's happening

Cette section vous permet de configurer les notifications envoyées à votre équipe.

### Titre

Vous devez ajouter un titre unique à votre monitor. Pour les monitors à alertes multiples, certains tags permettant d'identifier votre contexte de déclenchement sont automatiquement ajoutés. Vous pouvez également utiliser des [variables de tags][2].

### Message

Le champ de message prend en charge le [format Markdown][3] standard ainsi que des [variables][4]. Utilisez des [variables conditionnelles][5] pour ajuster le texte de la notification envoyé aux différents contacts avec la [syntaxe @notifications](#notifications).

Le message du monitor inclut généralement des étapes détaillées permettant de résoudre le problème. Exemple :

```text
Étapes à suivre pour libérer de l'espace disque :
1. Supprimer les paquets non utilisés
2. Vider le cache APT
3. Désinstaller les applications superflues
4. Supprimer les fichiers en double
```

### Tags

Ajoutez des tags à votre monitor. Les tags de monitors ne fonctionnent pas de la même manière que les tags de métriques. Ils servent à regrouper les monitors et à effectuer des recherches depuis l'interface. Si des politiques de tagging sont configurées, il est nécessaire d'ajouter les tags requis ainsi que les valeurs associées. Pour en savoir plus, consultez la section [Politiques de tagging][6].

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="Vue d'une configuration de politique de tagging. En dessous de 'Policy tags' se trouvent trois exemples de tag, cost_center, product_id et env, à côté d'un menu déroulant 'Select value'." style="width:100%;" >}}

### Renvoi de notifications

Activez le renvoi de notifications (facultatif) pour rappeler à votre équipe qu'un problème n'a pas été résolu.

  {{< img src="monitors/notifications/renotify_options.png" alt="Activer le renvoi de notifications" style="width:90%;" >}}

Configurez l'intervalle de renvoi de notifications et les états à partir desquels le monitor renvoie des notifications (valeurs autorisées :  `alert`, `no data` et `warn`). Vous avez également la possibilité de limiter le nombre de nouvelles notifications envoyées.

Appliquez par exemple au monitor la configuration `stop renotifying after 1 occurrence` pour recevoir un seul message de réaffectation après l'alerte principale.
**Remarque :** les [variables d'attribut et de tag][7] dans la nouvelle notification sont automatiquement renseignées avec les données dont dispose le monitor durant la période de la nouvelle notification.

Si le renvoi de notifications est activé, vous pouvez définir un message de réaffectation. Celui-ci est envoyé lorsque le monitor conserve l'un des états indiqués pendant la période de votre choix.


Le message de réaffectation peut être ajouté de plusieurs façons :

* Dans le bloc `{{#is_renotify}}` du message de la notification d'origine (recommandé)
* Dans le champ *Renotification message* de la section `Say what's happening`.
* Avec l'attribut `escalation_message` dans l'API

Si vous utilisez le bloc `{{#is_renotify}}`, sachez que le message de notification d'origine est également inclus dans la nouvelle notification. Pour cette raison :

1. Ne répétez pas le contenu du message d'origine : ajoutez uniquement des informations supplémentaires dans le bloc `{{#is_renotify}}`.
2. Envoyez le message de réaffectation à un sous-ensemble de groupes.

Consultez la [section Exemples][8] pour découvrir comment configurer vos monitors pour ces scénarios.

### Priorité

Vous avez la possibilité d'ajouter une priorité à vos monitors. Les valeurs autorisées vont de P1 à P5 : P1 correspond à la plus haute priorité, et P5 à la plus faible. Pour ignorer la priorité du monitor dans le message de notification, utilisez `{{override_priority 'Pi'}}`, en remplaçant `Pi` par une priorité de P1 à P5.

Par exemple, vous pouvez définir plusieurs priorités pour les notifications `alert` et `warning` :

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}

{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

## Informer votre équipe

Utilisez cette section pour envoyer des notifications à votre équipe par e-mail, Slack, PagerDuty, etc. La liste déroulante vous permet de rechercher des membres d'équipe et des intégrations connectées. Lorsqu'une `@notification` est ajoutée à cette section, celle-ci est automatiquement ajoutée au champ de [message](#message).

**Remarque** : vous devez inclure une espace entre le dernier caractère de la ligne et la `@notification`. Exemple :

```text
Espace disque faible @ops-team@company.com
```

### Notifications

Vous pouvez envoyer des `@notifications` de différentes façons :

#### E-mail

{{% notifications-email %}}

#### Intégrations

{{% notifications-integrations %}}

### Choisir le contenu supplémentaire à afficher

Les notifications de monitor incluent diverses informations telles que la requête du monitor, les mentions « @ » utilisées, les snapshots de métrique (pour les monitors de métrique) et les liens renvoyant aux pages pertinentes dans Datadog. Vous pouvez choisir le contenu que vous souhaitez inclure ou exclure des notifications pour un monitor donné.

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Définir un préréglage de monitor" style="width:70%;" >}}

Les options disponibles sont :

- **Default** : aucun contenu n'est masqué.
- **Hide Query** : supprime la requête du monitor du message de notification.
- **Hide Handles** : supprime les mentions « @ » utilisées dans le message de notification.
- **Hide All** : le message de notification n'inclut pas la requête ni aucun handle, snapshot (pour les monitors de métrique) ou lien supplémentaire en bas.

**Remarque** : selon l'intégration utilisée, une partie du contenu peut ne pas être affichée par défaut.

### Modifications

Chaque fois qu'un monitor est créé, modifié, désactivé ou supprimé, un [événement][9] est généré. Définissez l'option `Notify` pour envoyer des notifications aux membres de vos équipes, aux services de discussion et au créateur du monitor à propos de ces événements.

### Autorisations

Tous les utilisateurs peuvent lire l'ensemble des monitors, indépendamment du rôle auquel ils ont été associés.

Par défaut, seuls les utilisateurs associés à des rôles disposant de l'[autorisation monitor_write][10] peuvent modifier les monitors. Le [rôle Admin Datadog et le rôle Standard Datadog][11] disposent par défaut de cette autorisation. Si votre organisation utilise des [rôles personnalisés][12], vous pouvez attribuer cette autorisation aux rôles de votre choix.

Vous pouvez restreindre encore davantage l'accès au monitor en spécifiant une liste de [rôles][13] autorisés à le modifier. Le créateur du monitor, quant à lui, peut toujours le modifier.

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="Monitor avec une restriction RBAC" style="width:90%;" >}}

Il est notamment possible de modifier la configuration du monitor, de supprimer le monitor et de désactiver ses notifications pendant la durée souhaitée.

**Remarque** : les limites s'appliquent à la fois à l'IU et à l'API.

Pour en savoir plus sur la configuration du RBAC pour les monitors et découvrir comment passer du paramètre locked aux restrictions de rôles pour vos monitors, consultez la section [Configuration du RBAC pour les monitors][14].

## Notifications de test

Les notifications de test sont prises en charge pour les [types de monitors][15] suivants : host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check uniquement), process (check uniquement), network (check uniquement), custom check, event et composite.

### Effectuer le test

1. Après avoir défini votre monitor, testez les notifications à l'aide du bouton **Test Notifications** situé en bas de la page du monitor.

2. Dans la fenêtre contextuelle des notifications de test, choisissez le scénario de monitor à tester. Vous pouvez uniquement tester les états disponibles dans la configuration du monitor, pour les seuils indiqués dans les conditions d'alerte. Les [seuils de rétablissement][16] sont la seule exception. En effet, Datadog envoie une notification de rétablissement lorsque le monitor n'est plus en alerte ou lorsqu'il ne possède aucune condition d'avertissement.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Tester les notifications de ce monitor" style="width:70%;" >}}

3. Cliquez sur **Run Test** pour envoyer des notifications aux personnes et services répertoriés dans le monitor.

### Événements

Les notifications de test créent des événements qui peuvent faire l'objet de recherches dans l'Events Explorer. Ces notifications indiquent la personne à l'origine du test dans le corps du message. La mention `[TEST]` est ajoutée au titre de la notification.

Les variables de tags sont uniquement insérées dans le texte des événements enfants de Datadog. L'événement parent affiche seulement un résumé des agrégations.

### Variables {#notification-test-variables}

Les variables de message se remplissent automatiquement à partir d'un groupe disponible, sélectionné au hasard, en fonction du contexte de la définition de votre monitor. Exemple :

```text
{{#is_alert}}
{{host.name}} <-- est fourni automatiquement
{{/is_alert}}
```
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration
[2]: /fr/monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /fr/monitors/notify/variables/
[5]: /fr/monitors/notify/variables/#conditional-variables
[6]: /fr/monitors/settings/
[7]: /fr/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[8]: /fr/monitors/notify/variables/?tab=is_renotify#examples
[9]: /fr/events/
[10]: /fr/account_management/rbac/permissions/#monitors
[11]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /fr/account_management/rbac/?tab=datadogapplication
[14]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /fr/monitors/types
[16]: /fr/monitors/guide/recovery-thresholds/
