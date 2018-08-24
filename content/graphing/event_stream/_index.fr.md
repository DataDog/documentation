---
title: Flux d'événements
kind: documentation
aliases:
  - /fr/guides/eventsemail
  - /fr/guides/eventcorrelation/
  - /fr/guides/markdown/
---
## Langage de requête d'événements

Vous pouvez affiner votre recherche en filtrant certaines propriétés des événements. Voir la liste des filtres ci-dessous pour plus de détails.
Notez cependant que les filtres effectuent une recherche de correspondance exacte et ne fonctionnent pas avec des chaines de caractères partielles.

| Filter                                          | Description                                                                      |
| --------                                        | -------------                                                                    |
| user:pup@datadoghq.com                          | Trouver tous les évènements avec des commentaires écrits par pup@datadoghq.com.                              |
| sources:github,chef                             | Montrer les évènements Github OU Chef.                                                 |
| tags:env-prod OR db                             | Montre les évènements taggués #env-prod OU #db.                                        |
| tags:security-group:sg-123 AND role:common-node | Montre les évènements taggués #security-group:sg-123 ET #role:common-node.            |
| hosts:i-0ade23e6,db.myapp.com                   | Montre les évènements en provenance de i-0ade23e6 OU db.myapp.com.                                     |
| status:error                                    | Montre les évènements avec les statuts en erreur. (supporte : 'error', 'warning', 'success')         |
| priority:low                                    | Montre les évènements basse-priorité. (supporte : 'low' et 'normal', par défaut: 'all')  |
| incident:claimed                                | Montre seulement les incidents réclamés. (supporte : 'open', 'claimed', 'resolved', ou 'all') |

La recherche en texte intégral fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche en texte intégral examine le texte de l'événement, le titre, les tags, les utilisateurs qui ont commenté l'événement, les noms d'hosts et les périphériques liés à l'événement.

Vous pouvez utiliser la recherche textuelle pour trouver tous les événements avec les mêmes mots-clés. Par exemple, pour afficher tous les événements avec la clé #service, recherchez #service.

Dans l'exemple ci-dessous, une recherche de texte intégral est effectuée pour rechercher toutes les erreurs de chef ou de Nagios qui mentionnent une ou plusieurs instances Redis actuellement en panne.

`sources:nagios,chef status:error redis_* AND down`

Notez que certaines des fonctionnalités du langage de requête avancées (par exemple, la logique booléenne) fonctionnent uniquement dans la page de flux d'événements et ne fonctionnent pas dans les mosaïques de graphiques ou dans les widgets des screenboards.

Les préfixes peuvent facilement être combinés pour effectuer des recherches beaucoup plus complexes. Par exemple, si vous vouliez trouver toutes les erreurs de chef ou de nagios qui mentionnent cassandra, vous auriez une recherche comme:

`sources:nagios,chef status:error cassandra`

Note: aucun espace après les deux points ou des virgules dans ces listes et tout ce qui n'est pas attaché à un préfixe va dans la recherche de texte intégral.

## Afficher les événements non agrégé

Remplacez le paramètre "aggregate_up" dans l'URL par "false".
Pour supprimer l'événement d'agrégat de plus haut niveau, configurez `use_date_happened` par true. [Voici un lien d'exemple][3]

## Evénements par Email

Lorsque vous avez besoin d'intégrer une application ou un système avec Datadog, vous avez peu de choix. Le premier utilise l'une de nos nombreuses [intégrations][integrations] existantes. Cela vous donne accès à une grande variété de métriques et d'événements avec un minimum d'effort de configuration de votre part. Si votre application n'est pas présente dans la liste d'intégrations, vous pouvez choisir de créer [check pour l'Agent][agentcheck]. Cela nécessite beaucoup plus d'efforts et potentiellement plus de connaissances sur la façon dont l'application et Datadog fonctionnent.

Une autre option est disponible si vous n'utilisez pas une application via une intégration et que vous ne souhaitez pas créer de check d'Agent. Vous pouvez vous appuyer sur l'application ou le système envoyant un email à la place. Il existe deux manières différentes d'utiliser les événements par e-mail, selon que l'application vous offre la possibilité de personnaliser le format du corps de l'e-mail envoyé ou non.

<div class="alert alert-info">
<b>JSON-Formatted vs texte brute:</b> <br>
Si vous avez un contrôle total sur l'e-mail envoyé par l'application à Datadog, vous souhaiterez probablement envoyer un message au format JSON
Cela vous permet de tout définir dans l'événement qui apparaît dans votre flux.
</div>

### Email de texte brut
#### Email Source

Dans le texte de l'e-mail source, vous ne devez controller que de trois champs: l'expéditeur: email address (obligatoire), subject (obligatoire), and body (obligatoire).

{{< img src="graphing/events/plain-email.png" alt="plain email" responsive="true" >}}

#### Evénement Datadog

{{< img src="graphing/events/plain-event.png" alt="plain event" responsive="true" >}}

Notez que le sujet de l'email devient le titre de l'événement et le corps de l'email devient le corps de l'événement .Bien qu'il semble qu'un tag apparaisse à la fin du titre et du corps de l'événement, aucune des deux instances ne sont en fait des tags. L'expéditeur de l'e-mail apparaît également en bas de l'événement. Vous pouvez donc en profiter pour identifier l'application d'envoi.

### Email JSON
#### Email Source

Dans l'e-mail au format JSON, vous avez 10 champs que vous pouvez contrôler: expéditeur adresse e-mail et jusqu'à 9 clés JSON. Ces clés sont le titre, le texte, la priorité, les balises, le type d'alerte, la date d'arrivée, l'hôte, la clé d'agrégation et le nom du type de source.
**Note: Si votre fichier JSON n'est pas correctement formaté ou si votre e-mail est envoyé avec un sujet, l'événement n'apparaîtra pas dans votre flux d'événements.**

{{< img src="graphing/events/json-email.png" alt="json email" responsive="true" >}}

#### Evénement Datadog

{{< img src="graphing/events/json-event.png" alt="json event" responsive="true" >}}

Dans un e-mail au format JSON, l'objet de l'e-mail n'est pas pertinent car il est remplacé par le titre du JSON dans le corps de l'email. Toutes les données qui apparaissent dans l'événement sont définies dans le JSON du corps de l'e-mail. Ce JSON doit être bien formaté ou alors le message est ignoré.  
Si vous testez un email avec un client de messagerie standard, le corps peut être converti en HTML pour améliorer la lecture du destinataire. Cela a pour conséquence une altération du format JSON et donc sera ignoré par Datadog.

Trouvez les clés JSON autorisées dans la documentation sur [l'API d'événements][eventsapi].

### Configuration de l'adresse e-mail

Pour configurer l'e-mail, connectez-vous d'abord à votre compte Datadog à l'adresse [https://app.datadoghq.com][dd-app]. Dans le menu *Integrations*, choisissez *API*, puis descendez jusqu'à *Events API Emails*. Cette section vous montre tous les emails disponibles pour vos applications et qui les a créés. Choisissez le format de vos messages dans la liste déroulante "Format":, puis cliquez sur *Create API Email*.

{{< img src="graphing/events/event-email-api.png" alt="JSON Event Email API" responsive="true" >}}

[integrations]: /integrations
[agentcheck]: /agent/agent_checks
[eventsapi]: /api/#events
[dd-app]: https://app.datadoghq.com

## Markdown événements
Le texte d'un événement Datadog supporte le markdown ([Syntaxe détaillée markdown](http://daringfireball.net/projects/markdown/syntax#lin)).
Notez que l'incorporation de HTML dans le markdown n'est pas prise en charge dans Datadog.

Pour utiliser Markdown dans le texte de l'événement, vous devez commencer le bloc de texte par ` %%% \n` et terminer le bloc de texte par `\n %%%`

An exemple ci-dessous:
```json
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

Note: si vous incorporez un lien dans un bloc Markdown, assurez-vous que l'URL est encodée correctement.

Par exemple, l'URL suivante: `http://catchpoint.com/session_id:123456`

Devrait être codé en: `http://catchpoint.com/session_id%3A123456`

## @ notifications

* `@support-datadog` – Envoie un message au support Datadog directement depuis votre flux.
* `@all` – Envoie une notification à tous les membres de votre organisation.
* `@yourname` – Avertit l'utilisateur spécifique nommé 'yourname'.
* `@test@example.com` Envoie un courriel à `test@example.com`.
* Si vous avez HipChat, Slack, Webhooks, Pagerduty ou VictorOps vous pouvez utiliser:
    * `@hipchat-[room-name]` ou `@slack-[room-name]` – affiche l'événement ou le graphique dans cette room de conversation.
    * `@webhook` – Alertez ou déclenchez tout ce qui est attaché à ce webhook. Découvrez [notre article de blog sur les Webhooks][events-1]!
    * `@pagerduty` – Envoie une alerte à Pagerduty. Vous pouvez aussi utiliser `@pagerduty-acknowledge` and `@pagerduty-resolve`.

[events-1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio

[1]: /monitors/
[2]: /graphing/event_stream
[3]: https://app.datadoghq.com/event/stream?show_private=true&aggregate_up=false&use_date_happened=true&per_page=30&display_timeline=true&from_ts=1418047200000&to_ts=1418050800000&incident=true&codemirror_editor=true&live=true&bucket_size=60000