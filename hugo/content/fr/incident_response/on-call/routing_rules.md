---
aliases:
- /fr/service_management/on-call/processing_rules/
- /fr/service_management/on-call/routing_rules/
further_reading:
- link: /incident_response/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Règles de routage
---
## Présentation {#overview}

Les règles de routage déterminent la manière dont les alertes sont dirigées au sein de votre équipe. Au lieu d'envoyer toutes les alertes via une politique d'escalade unique, vous pouvez créer des règles qui acheminent les alertes en fonction de métadonnées telles que la priorité, les tags, le statut du monitor ou l'heure de la journée.

Les règles de routage sont configurées par Team. Il n'existe pas de règles de routage à l'échelle de l'organisation ; chaque Team définit donc les siennes.

## Créer une règle de routage {#create-a-routing-rule}

Les règles sont évaluées de haut en bas. La dernière règle doit être une règle de repli qui achemine toutes les alertes ne correspondant à aucune règle vers une politique d'escalade.

Pour créer une règle de routage :

1. Accédez à [**On-Call** > **Teams**][1] et sélectionnez une équipe.
1. Recherchez la section **Page Routing** et cliquez sur **Edit**. La fenêtre **Configure Page Routing** s'ouvre.
 
   {{< img src="incident_response/on-call/routing_rules/configure-page-routing2.png" alt="La fenêtre Configure Page Routing dans Datadog On-Call, affichant les champs de condition de routage et les options de configuration de la cible" style="width:100%;" >}}

1. Cliquez sur **Add Conditions** pour ajouter une règle de routage. 
1. Définissez une requête de correspondance en utilisant la [syntaxe des règles de routage](#routing-rule-syntax).
1. Optionnellement, configurez les [heures de support](#support-hours) :

   1. Activez **Use support hours**.
   1. Cliquez sur **Add** pour ajouter un intervalle de temps. Pour chaque intervalle, sélectionnez un fuseau horaire et les jours de la semaine, puis définissez les heures de début et de fin.
   1. Si nécessaire, activez le commutateur **Outside support hours, hold escalation policy notifications until the next window**.

   {{< img src="incident_response/on-call/routing_rules/page-routing-support-hours.png" alt="Le panneau de configuration des heures de support sur une condition de routage, affichant les champs d'intervalle de temps et l'option de suspendre les notifications de la politique d'escalade en dehors des heures de support" style="width:60%;" >}}

1. Sous **Set targets**, cliquez sur **Add** et sélectionnez un type de cible. Le type de cible détermine ce qui se passe lorsqu'une alerte correspond à la règle :
   - **Page escalation policy** : sélectionnez une [politique d'escalade][3] et définissez l'urgence sur `DYNAMIC` (selon le statut de l'alerte), `HIGH` ou `LOW`.
   - **Send Slack message** : sélectionnez un espace de travail et un canal Slack.
   - **Send Microsoft Teams message** : sélectionnez un locataire Teams, une équipe et un canal.
   - **Run Workflow** : sélectionnez un [Workflow][4] existant.
   - **Sync with a ServiceNow Incident** (Preview) : sélectionnez une connexion ServiceNow. Datadog crée un incident ServiceNow pour chaque Page et le maintient synchronisé. Consultez [Intégrer ServiceNow à Datadog On-Call][5].

1. Si vous avez sélectionné **Page escalation policy**, vous pouvez également configurer [Acknowledgment timeout](#acknowledgment-timeout) :
   1. Activez **Acknowledgment timeout**.
   1. Définissez la durée du délai d'attente.

1. Ajoutez d'autres règles si nécessaire, puis cliquez sur **Save**.

### Syntaxe des règles de routage {#routing-rule-syntax}

Les règles de routage utilisent la [syntaxe de requête Datadog][2] et prennent en charge plusieurs `if/else` conditions.

<div class="alert alert-info">La syntaxe des règles de routage est sensible à la casse. Par exemple, <code>tags.env:Prod</code> ne correspond pas à <code>tags.env:prod</code>.</div>

**Attributs pris en charge :**

| Attribut      | Description                                                                 | Exemple                               |
|----------------|-----------------------------------------------------------------------------|---------------------------------------|
| `tags`         | Tags sur l'alerte entrante                                                  | `tags.env:prod`                       |
| `groups`       | Noms des groupes de monitors                                                         | `groups.service:checkout-service`     |
| `priority`     | Priorité du monitor (1–5)                                                      | `priority:(1 OR 2)`                   |
| `alert_status` | Statut du monitor (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`        |

### Heures de support {#support-hours}

Les heures de support définissent quand une politique d'escalade peut notifier les intervenants.

Lorsqu'une règle de routage inclut des heures de support, Datadog compare l'heure actuelle aux intervalles configurés et procède comme suit :
- **Pendant les heures de support** : Datadog exécute immédiatement la politique d'escalade et notifie les intervenants.
- **En dehors des heures de support** :
  - Si **Outside support hours, hold escalation policy notifications until the next window** est activé, Datadog crée immédiatement la Page, mais reporte les notifications de la politique d'escalade jusqu'au début de la prochaine fenêtre de support. Datadog ajoute une entrée dans la chronologie pour enregistrer le délai.
  - Si cette option est désactivée, Datadog ignore la règle de routage et ne crée pas de Page. Il évalue ensuite la règle correspondante suivante.

#### Exemples de configurations d'heures de support {#example-support-hour-configurations}

**Remarque** : les exemples suivants supposent que l'option **Outside support hours, hold escalation policy notifications until the next window** est activée.

{{% collapse-content title="Heures de bureau standard" level="h5" %}}

Ajoutez un intervalle : sélectionnez du lundi au vendredi, définissez la plage horaire de 9 h à 17 h et sélectionnez le fuseau horaire `America/New_York`. Les Pages en dehors de cette fenêtre sont reportées à 9 h le lundi suivant.

{{< img src="incident_response/on-call/routing_rules/support-hours-biz.png" alt="La fenêtre modale des heures de support avec un intervalle de temps défini de 9 h à 17 h du lundi au vendredi" style="width:60%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="Horaires de support fractionnés (matin et après-midi)" level="h5" %}}

Ajoutez deux intervalles : un de 9 h à 12 h et un de 14 h à 18 h, en sélectionnant du lundi au vendredi pour chacun. Les Pages qui arrivent entre 12 h et 14 h sont reportées jusqu'à l'ouverture de la fenêtre de l'après-midi.

{{% /collapse-content %}}

### Acknowledgment timeout {#acknowledgment-timeout}

Lorsque vous ajoutez une politique d'escalade en tant que cible, vous pouvez activer **Acknowledgment timeout**. Lorsque cette option est activée, si une Page a fait l'objet d'un accusé de réception mais n'est pas résolue dans le délai configuré, Datadog la remet à l'état déclenché et notifie à nouveau le responsable d'astreinte actif.

Pour configurer le délai d'accusé de réception :

1. Sous **Set targets**, sélectionnez **Page escalation policy** comme type de cible.
1. Activez **Acknowledgment timeout**.
1. Définissez la durée du délai d'attente.

### Pages dans Slack et Microsoft Teams {#pages-in-slack-and-microsoft-teams}

{{< img src="incident_response/on-call/routing_rules/page_in_slack_or_ms_teams.png" alt="Un exemple de règle de routage, qui achemine toutes les Pages entrantes vers Slack et Microsoft Teams" style="width:100%;" >}}

Lorsque vous acheminez des Pages vers Slack ou Microsoft Teams, Datadog envoie une notification au canal configuré et crée une Page. Les membres de l'équipe peuvent utiliser des boutons pour accuser réception de la Page, la faire remonter ou la résoudre.

{{< img src="incident_response/on-call/routing_rules/page_representation_in_slack.png" alt="Une notification de Page dans Slack avec des boutons pour en accuser réception, la faire remonter ou la résoudre" style="width:70%;" >}}

Lorsqu'un membre de l'équipe accuse réception d'une Page ou la résout dans Slack ou Teams, Datadog met à jour la notification d'origine sans envoyer de messages supplémentaires. Cela minimise le volume de notifications et permet de garder le statut actuel de la Page visible dans le fil de discussion d'origine.

## Exemples de règles de routage {#routing-rule-examples}

- **Acheminez les alertes selon leur priorité :**
  - Envoyez les alertes de **priorité 1** à votre politique d'escalade principale.
  - Envoyez les alertes de **priorité 2–4** vers Slack ou Microsoft Teams.

- **Acheminez les alertes selon l'heure de la journée :**
  - Pendant les heures de bureau, acheminez les alertes vers une politique d'escalade.
  - En dehors des heures de bureau, acheminez les alertes critiques vers une politique d'escalade et les alertes non critiques vers un canal Slack ou Teams.

- **Différez l'escalade en dehors des heures de support :**
  - Définissez des [heures de support](#support-hours) dans une condition d'acheminement pour suspendre les notifications de la politique d'escalade jusqu'à la prochaine fenêtre active.

- **Utilisez l'urgence `DYNAMIC` pour définir l'urgence en fonction du statut de l'alerte du monitor :** 
  - Si l'alerte du monitor a le statut `warn`, définissez l'urgence sur `LOW`.
  - Si l'alerte du monitor a le statut `error`, définissez l'urgence sur `HIGH`.

  L'urgence détermine comment les intervenants sont notifiés en fonction de leurs préférences de notification.

## Bonnes pratiques {#best-practices}

- **Conciliez visibilité et urgence :**
  - Utilisez le paging et les politiques d'escalade pour les alertes critiques qui nécessitent une action immédiate.
  - Utilisez Slack ou Teams pour les problèmes de moindre gravité qui doivent être signalés, mais ne justifient pas une intervention d'astreinte.

- **Utilisez les heures de support pour protéger les intervenants des notifications en dehors des heures de travail :**
  - Pour les alertes non critiques, configurez les heures de support pour qu'elles correspondent aux heures de travail de votre équipe. Datadog crée la Page immédiatement mais ne notifie les intervenants que pendant les fenêtres actives.
  - Pour les alertes critiques qui nécessitent une attention immédiate quelle que soit l'heure, ne configurez pas d'heures de support sur la règle d'acheminement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/teams
[2]: /fr/tracing/trace_explorer/query_syntax/
[3]: /fr/incident_response/on-call/escalation_policies/
[4]: /fr/actions/workflows/
[5]: /fr/incident_response/on-call/integrations/servicenow/