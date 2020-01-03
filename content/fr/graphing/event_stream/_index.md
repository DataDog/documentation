---
title: Flux d'événements
kind: documentation
aliases:
  - /fr/guides/eventsemail
  - /fr/guides/eventcorrelation/
  - /fr/guides/markdown/
---
Le [flux d'événements][1] affiche les événements les plus récents générés par votre infrastructure et les monitors associés.

## Langage de requête d'événement

Vous pouvez affiner votre recherche en filtrant certaines propriétés d'événement. Consultez la liste des filtres ci-dessous pour obtenir plus de détails.
**Remarque** : les filtres effectuent une recherche de correspondance exacte et ne prennent pas en compte les chaînes de caractères partielles.

| Filtre                                            | Description                                                                              |
| --------                                          | -------------                                                                            |
| `sources:github,chef`                             | Affiche les événements provenant de GitHub OU Chef.                                                         |
| `tags:env-prod OR db`                             | Affiche les événements qui comportent les tags #env-prod OU #db.                                                |
| `tags:security-group:sg-123 AND role:common-node` | Affiche les événements qui comportent les tags `#security-group:sg-123` ET `#role:common-node`.                |
| `hosts:i-0ade23e6,db.myapp.com`                   | Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.                                             |
| `status:error`                                    | Affiche les événements avec un statut d'erreur (valeurs autorisées : **error**, **warning**, **success**).           |
| `priority:low`                                    | Affiche seulement les événements non prioritaires (valeurs autorisées : **low** ou **normal** ; valeur par défaut : **all**).    |
| `cloud_provider:* NOT "azure"`                    | Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».                             |

La recherche plein texte fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche plein texte examine le texte, le titre et les tags de l'événement, les utilisateurs qui ont commenté l'événement ainsi que les hostnames et les appareils liés à l'événement.

Utilisez la recherche de tags pour trouver tous les événements dotés du même tag de clé avec la requête suivante :

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
| `AND`    | **Intersection** : les deux termes sont inclus dans les événements sélectionnés (pour les tags, `AND` est défini par défaut en l'absence d'opérateur).                        | `redis_* AND down`                  |
| `OR`     | **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                                                    | `sources:nagios,chef directory OR Mixlib`    |
| `NOT`    | **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). | `-tags:<KEY>:<VALUE> NOT "<STRING>"` |


**Remarque** : certaines des fonctionnalités avancées du langage de requête (par exemple, la logique booléenne) fonctionnent uniquement dans la page de flux d'événements et ne sont pas disponibles dans les carrés de graphiques ou dans les widgets des dashboard.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, si vous souhaitez trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez une recherche de ce type :

`sources:nagios,chef status:error cassandra`

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche plein texte.

## Afficher des événements non agrégés

 Pour afficher les événements non agrégés de votre flux d'événements, décochez **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="graphing/events/event_stream_aggregated.png" alt="Flux d'événements agrégés"  style="width:50%;" >}}

## E-mail pour les événements

Lorsque vous souhaitez intégrer une application ou un système à Datadog, vous disposez de plusieurs options. La première consiste à utiliser l'une des [intégrations Datadog][2] existantes.
Elles vous permettent d'accéder à de nombreuses métriques et à différents événements avec une configuration minimale et sans effort de votre part. Si votre application ne fait pas partie des applications intégrées, créez [un check custom à l'aide de l'Agent][3]. Cette opération nécessite toutefois davantage de connaissances sur le fonctionnement de l'application et de Datadog.
Vous pouvez envoyer les e-mails à Datadog si votre application ne dispose pas d’une [intégration Datadog][2] active, et si vous ne souhaitez pas créer le [check d’Agent][3]. Il existe deux façons différentes d'utiliser les événements par e-mail, selon que l'application vous offre ou non la possibilité de personnaliser le format du corps de l'e-mail envoyé.
Si vous n'utilisez pas une application disposant d'une intégration, et si vous ne souhaitez pas créer un check d'Agent, une autre solution existe. Vous pouvez vous baser sur l'envoi d'un e-mail par votre application ou votre système. Il existe deux façons différentes d'utiliser les événements par e-mail, selon que l'application vous offre ou non la possibilité de personnaliser le format du corps de l'e-mail envoyé.

<div class="alert alert-info">
<b>Format JSON et texte brut :</b> <br>
Si vous gérez parfaitement les e-mails envoyés par l'application à Datadog, nous vous recommandons de configurer votre message à envoyer au format JSON.
Cela vous permet de définir l'ensemble des éléments de l'événement qui apparaissent dans votre flux
d'événements. Vous trouverez ci-dessous un exemple de chaque type d'e-mail :</div>

### E-mail en texte brut
#### E-mail source

Dans l'e-mail en texte brut source, vous ne pouvez contrôler que trois champs : l'adresse e-mail de l'expéditeur (obligatoire), l'objet (obligatoire) et le corps (facultatif).

```
Sender's email: Matt@Datadog
Subject: Env:Test - System at 50% CPU - #test
Body: il s'agit d'un message texte indiquant que env:test est à 50 % du processeur - #test
```

#### Événement Datadog

{{< img src="graphing/events/plain-event.png" alt="événement en texte brut"  >}}

Le titre de l'événement correspond à l'objet de l'e-mail et le corps de l'événement correspond au corps de l'e-mail. Bien qu'un tag semble apparaître à la fin du titre et du corps de l'événement, il ne s'agit pas d'un réel tag. L'expéditeur de l'e-mail apparaît également en bas de l'événement.

### E-mail JSON
#### E-mail source

Dans l'e-mail au format JSON source, les champs suivants peuvent être contrôlés : 

- Adresse e-mail de l'expéditeur
- Tous les arguments provenant de l’[API des événements Datadog][4]

**Remarque** : si votre fichier JSON n'est pas correctement mis en forme, ou si votre e-mail est envoyé sans un objet, l'événement n'apparaîtra pas dans votre flux d'événements.

#### Événement Datadog

{{< img src="graphing/events/json-event.png" alt="événement json"  >}}

Dans un e-mail au format JSON, l'objet de l'e-mail n'est pas pertinent, car il est remplacé par le titre du JSON dans le corps de l'e-mail. Toutes les données qui apparaissent dans l'événement sont définies dans le JSON du corps de l'e-mail. Ce JSON doit être bien mis en forme, sans quoi le message est ignoré. Cela signifie qu'il doit inclure des paires key/value séparées par des virgules, mais également être uniquement composé de JSON.
**Remarque** : si vous testez un e-mail avec un client de messagerie standard, le corps peut être converti en HTML pour améliorer la lecture du destinataire. Cela engendre une altération du format JSON. L'e-mail est donc ignoré par Datadog.


### Configuration de l'adresse e-mail

Pour configurer l'e-mail, connectez-vous d'abord à votre [compte Datadog][5]. À partir du menu *Integrations*, sélectionnez **APIs**, puis faites défiler vers le bas jusqu'à **Events API Emails**. Cette section affiche tous les e-mails disponibles de vos applications ainsi que leurs créateurs. Sélectionnez le format de vos messages dans la liste déroulante « Format », puis cliquez sur **Create API Email**.

## Format markdown dans des événements
Le texte de l'événement Datadog prend en charge le format [Markdown][6].
**Remarque** : l'intégration du format HTML dans le markdown n'est pas prise en charge dans Datadog.

Pour utiliser le format Markdown dans le texte de l'événement, vous devez ajouter `%%%\n` au début du bloc de texte et `\n %%%` à la fin du bloc.

**Exemple** :
```json
{
      "title": "Vous avez entendu la nouvelle ?",
      "text": "%%% \n [un exemple de lien](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

**Remarque** : si vous ajoutez un lien dans un bloc Markdown, assurez-vous que l'URL est correctement encodée.

**Exemple** :
```
# Non encodé
http://catchpoint.com/session_id:123456
# Encodé
http://catchpoint.com/session_id%3A123456
```

## Notifications « @ »

* `@support-datadog` : crée un ticket d'assistance Datadog lors d'une publication directement dans votre flux d'événements (y compris les commentaires).
* `@all` : envoie une notification à tous les membres de votre organisation.
* `@nomdonné` : envoie une notification à l'utilisateur 'nomdonné'.
* `@test@exemple.com` envoie un e-mail à `test@exemple.com`.
* Si vous échangez sur Slack, Webhooks, Pagerduty ou VictorOps, utilisez :
    * `@slack-<COMPTE_SLACK>-<NOM_CHAÎNE>` : publie l'événement ou le graphique sur cette chaîne.
    * `@webhook` : déclenche une alerte ou prévient l'élément associé à ce webhook. Consultez [notre article de blog sur les webhooks][7].
    * `@pagerduty` : envoie une alerte à Pagerduty. Vous pouvez également utiliser `@pagerduty-acknowledge` et `@pagerduty-resolve`.


[1]: https://app.datadoghq.com/event/stream
[2]: /fr/integrations
[3]: /fr/agent/agent_checks
[4]: /fr/api/#events
[5]: https://app.datadoghq.com
[6]: http://daringfireball.net/projects/markdown/syntax#lin
[7]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio