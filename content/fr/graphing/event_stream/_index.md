---
title: Flux d'événements
kind: documentation
aliases:
  - /fr/guides/eventsemail
  - /fr/guides/eventcorrelation/
  - /fr/guides/markdown/
---
## Langage de requête d'événement

Vous pouvez affiner votre recherche en filtrant certaines propriétés d'événement. Consultez la liste des filtres ci-dessous pour obtenir plus de détails.
Attention : les filtres effectuent une recherche de correspondance exacte et ne fonctionnent pas avec des chaînes de caractères partielles.

| Filtres                                            | Description                                                                              |
| --------                                          | -------------                                                                            |
| `user:pup@datadoghq.com`                          | Trouve tous les événements avec des commentaires publiés par pup@datadoghq.com.                                      |
| `sources:github,chef`                             | Affiche les événements provenant de GitHub OU Chef.                                                         |
| `tags:env-prod OR db`                             | Affiche les événements qui comportent les tags #env-prod OU #db.                                                |
| `tags:security-group:sg-123 AND role:common-node` | Affiche les événements qui comportent les tags `#security-group:sg-123` ET `#role:common-node`.                |
| `hosts:i-0ade23e6,db.myapp.com`                   | Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.                                             |
| `status:error`                                    | Affiche les événements avec un statut d'erreur (valeurs autorisées : **error**, **warning**, **success**).           |
| `priority:low`                                    | Affiche seulement les événements non prioritaires (valeurs autorisées : **low** ou **normal** ; valeur par défaut : **all**).    |
| `cloud_provider:* NOT "azure"`                    | Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».                             |

La recherche plein texte fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche plein texte examine le texte, le titre et les tags de l'événement, les utilisateurs qui ont commenté l'événement ainsi que les hostnames et les appareils liés à l'événement.

Utilisez la recherche de tags pour trouver tous les événements dotés du même tag de clé avec une des requêtes suivantes :

| Filtre               | Description                                                                    |
| ----                 | ---                                                                            |
| `tags:<KEY>:<VALUE>` | Affiche tous les événements avec le tag `<KEY>:<VALUE>`.                                     |
| `tags:<VALUE>`       | Affiche tous les événements avec le tag `<VALUE>` lié, quel que soit `<KEY>`.            |
| `<KEY>:*`            | Affiche tous les événements avec le tag `<KEY>` lié.                                    |
| `<KEY>`:`<REGEX>`    | Affiche tous les événements avec le tag `<KEY>:<VALUE>` où `<VALUE>` correspond à `<REGEX>`.|
| `tags:<KEY>`         | Ne renvoie rien.                                                       |
| `<KEY>:<VALUE>`      | Ne renvoie rien.                                                       |

Pour combiner plusieurs termes dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

| Opérateur | Description                                                                                                                      | Exemple                             |
| ----     | ----                                                                                                                             | -----                               |
| `AND`    | **Intersection** : les deux termes sont dans les événements sélectionnés (l'opérateur `AND` est défini par défaut en l'absence d'opérateur).                        | `redis_* AND down`                  |
| `OR`     | **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                                                    | `sources:nagios,chef directory OR Mixlib`    |
| `NOT`    | **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). | `-tags:<KEY>:<VALUE> NOT "<STRING>"` |

Dans l'exemple ci-dessous, une recherche plein texte est effectuée dans le but de rechercher toutes les erreurs Chef ou Nagios ouvertes qui mentionnent une ou plusieurs instances Redis actuellement en panne.

`sources:nagios,chef status:error redis_* AND down`

**Remarque** : certaines des fonctionnalités avancées du langage de requête (par exemple, la logique booléenne) fonctionnent uniquement dans la page de flux d'événements et ne fonctionnent pas dans les carrés de graphiques ou dans les widgets des screenboards.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, si vous souhaitez trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez une recherche de ce type :

`sources:nagios,chef status:error cassandra`

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche plein texte.

## Afficher des événements non agrégés

 Pour afficher les événements non agrégés de votre flux d'événements, décochez **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="graphing/events/event_stream_aggregated.png" alt="Flux d'événements agrégés" responsive="true" style="width:50%;" >}}

## E-mail pour les événements

Lorsque vous souhaitez intégrer une application ou un système à Datadog, vous disposez de plusieurs options. La première consiste à utiliser l'une des [intégrations Datadog][1] existantes.
Elles vous permettent d'accéder à de nombreuses métriques et à différents événements avec une configuration minimale et sans effort de votre part. Si votre application ne fait pas partie des applications intégrées, créez [un check custom à l'aide de l'Agent][2]. Cette opération nécessite toutefois davantage de connaissances sur le fonctionnement de l'application et de Datadog.

Si vous n'utilisez pas une application disposant d'une intégration, et si vous ne souhaitez pas créer un check d'Agent, une autre solution existe. Vous pouvez vous baser sur l'envoi d'un e-mail par votre application ou votre système. Il existe deux façons différentes d'utiliser les événements par e-mail, selon que l'application vous offre ou non la possibilité de personnaliser le format du corps de l'e-mail envoyé.

<div class="alert alert-info">
<b>Format JSON et texte brut :</b> <br>
Si vous gérez parfaitement les e-mails envoyés par l'application à Datadog, nous vous recommandons de configurer votre message à envoyer au format JSON.
Cela vous permet de définir l'ensemble des éléments de l'événement qui apparaissent dans votre flux
d'événements. Vous trouverez ci-dessous un exemple de chaque type d'e-mail :</div>

### E-mail en texte brut
#### E-mail source

Dans l'e-mail en texte brut source, vous ne pouvez contrôler que trois champs : l'adresse e-mail de l'expéditeur (obligatoire), l'objet (obligatoire) et le corps (facultatif).

{{< img src="graphing/events/plain-email.png" alt="e-mail en texte brut" responsive="true" >}}

#### Événement Datadog

{{< img src="graphing/events/plain-event.png" alt="événement en texte brut" responsive="true" >}}

Notez que le titre de l'événement correspond à l'objet de l'e-mail et que le corps de l'événement correspond au corps de l'e-mail. Bien qu'un tag semble apparaître à la fin du titre et du corps de l'événement, il ne s'agit pas d'un réel tag. L'expéditeur de l'e-mail apparaît également en bas de l'événement. Vous pouvez donc en profiter pour identifier l'application d'envoi.

### E-mail JSON
#### E-mail source

Vous disposez dans l'e-mail au format JSON de 10 champs contrôlables : « sender email address » et jusqu'à 9 clés JSON : title, text, priority, tags, alert type, data happened, host, aggregation key et source type name.
**Remarque : si votre fichier JSON n'est pas correctement formaté, ou si votre e-mail est envoyé avec un objet, l'événement n'apparaîtra pas dans votre flux d'événements.**

{{< img src="graphing/events/json-email.png" alt="e-mail json" responsive="true" >}}

#### Événement Datadog

{{< img src="graphing/events/json-event.png" alt="événement json" responsive="true" >}}

Dans un e-mail au format JSON, l'objet de l'e-mail n'est pas pertinent, car il est remplacé par le titre du JSON dans le corps de l'e-mail. Toutes les données qui apparaissent dans l'événement sont définies dans le JSON du corps de l'e-mail. Ce JSON doit être bien formaté, sans quoi le message est ignoré. Cela signifie qu'il doit non seulement inclure des paires clé/valeur séparées par des virgules, mais également être uniquement composé de JSON.
Si vous testez un e-mail avec un client de messagerie standard, le corps peut être converti en HTML pour améliorer la lecture du destinataire. Cela engendre une altération du format JSON. L'e-mail est donc ignoré par Datadog.

Les clés JSON admissibles se trouvent dans la [documentation relative à l'API des événements][3].

### Configuration de l'adresse e-mail

Pour configurer l'e-mail, connectez-vous d'abord à votre compte Datadog à l'adresse [https://app.datadoghq.com][4]. À partir du menu *Integrations*, sélectionnez *APIs*, puis faites défiler vers le bas jusqu'à *Events API Emails*. Cette section affiche tous les e-mails disponibles de vos applications ainsi que leurs créateurs. Sélectionnez le format de vos messages dans la liste déroulante « Format: », puis cliquez sur *Create API Email*.

{{< img src="graphing/events/event-email-api.png" alt="API e-mail événement JSON" responsive="true" >}}


## Format markdown dans des événements
Le texte de l'événement Datadog prend en charge le format markdown ([syntaxe de Markdown détaillée][5]).
Remarque : l'intégration du format HTML dans le markdown n'est pas prise en charge dans Datadog.

Pour utiliser le format Markdown dans le texte de l'événement, vous devez ajouter `%%%\n` au début du bloc de texte et `\n %%%` à la fin du bloc.

Voici un exemple :
```json
{
      "title": "Vous avez entendu la nouvelle ?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

Remarque : si vous ajoutez un lien dans un bloc Markdown, assurez-vous que l'URL est correctement encodée.

Par exemple, l'URL suivante : `http://catchpoint.com/session_id:123456`

Doit être encodée afin d'obtenir l'URL : `http://catchpoint.com/session_id%3A123456`

## Notifications « @ »

* `@support-datadog` : envoie un message à l'assistance Datadog directement depuis votre flux.
* `@all` : envoie une notification à tous les membres de votre organisation.
* `@nomdonné` : envoie une notification à l'utilisateur 'nomdonné'.
* `@test@exemple.com` envoie un e-mail à `test@exemple.com`.
* Si vous échangez sur HipChat, Slack, Webhooks, Pagerduty ou VictorOps, utilisez :
    * `@hipchat-[nom-room]` ou `@slack-[nom-room]` : affiche l'événement ou le graphique dans cette room de conversation.
    * `@webhook` : déclenche une alerte ou prévient l'élément associé à ce webhook. Consultez [notre article de blog sur les webhooks][6].
    * `@pagerduty` : envoie une alerte à Pagerduty. Vous pouvez également utiliser `@pagerduty-acknowledge` et `@pagerduty-resolve`.


[1]: /fr/integrations
[2]: /fr/agent/agent_checks
[3]: /fr/api/#events
[4]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio