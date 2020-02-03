---
title: Événements
kind: documentation
aliases:
  - /fr/guides/eventcorrelation/
  - /fr/guides/markdown/
  - /fr/graphing/event_stream/
further_reading:
  - link: '/api/#evenements'
    tag: Documentation
    text: API d'événements Datadog
---
Un événement représente n'importe quelle activité pouvant s'avérer pertinente pour les équipes d'ingénierie (dev, op et responsables de la sécurité). Consultez la documentation consacrée au développeur pour en savoir plus sur l'[envoi d'événements][1] à Datadog.

## Flux d'événements

Le [flux d'événements][2] affiche les événements les plus récents générés par votre infrastructure et les monitors associés.

### Rechercher des monitors

#### Texte intégral

La recherche en texte intégral fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche en texte intégral examine le texte, le titre et les tags de l'événement, les utilisateurs qui ont commenté l'événement ainsi que les hostnames et les appareils liés à l'événement.

#### Filtres

Ciblez des propriétés d'événements spécifiques à l'aide des préfixes suivants :

| Filtre                          | Description                                                                    |
|---------------------------------|--------------------------------------------------------------------------------|
| `sources:github,chef`           | Affiche les événements provenant de GitHub OU Chef.                                               |
| `tags:env-prod,db`              | Affiche les événements qui comportent les tags #env-prod OU #db.                                      |
| `hosts:i-0ade23e6,db.myapp.com` | Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.                                   |
| `status:error`                  | Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning`, `success`).    |
| `priority:low`                  | Affiche seulement les événements non prioritaires (valeurs autorisées : `low` ou `normal`, valeur par défaut : `all`). |

**Remarque** : les filtres effectuent une recherche de correspondance exacte et ne prennent pas en compte les chaînes de caractères partielles.

#### Avancée

Pour effectuer une recherche plus avancée, utilisez le langage de requête d'événement Datadog, par exemple :

| Filtre                                            | Description                                                               |
|---------------------------------------------------|---------------------------------------------------------------------------|
| `tags:env-prod OR db`                             | Affiche les événements qui comportent les tags #env-prod OU #db.                                 |
| `tags:security-group:sg-123 AND role:common-node` | Affiche les événements qui comportent les tags `#security-group:sg-123` ET `#role:common-node`. |
| `cloud_provider:* NOT "azure"`                    | Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».             |

Utilisez la recherche de tags pour trouver tous les événements dotés du même de clé, par exemple :

| Filtre               | Description                                                                          |
|----------------------|--------------------------------------------------------------------------------------|
| `tags:<KEY>:<VALUE>` | Affiche tous les événements avec le tag `<KEY>:<VALUE>`.                                           |
| `<KEY>:*`            | Affiche tous les événements avec le tag `<KEY>` lié.                                          |
| `<KEY>`:`<REGEX>`    | Affiche tous les événements avec le tag `<KEY>:<VALUE>` où `<VALUE>` correspond à `<REGEX>`. |
| `tags:<KEY>`         | Il ne s'agit pas d'une recherche valide.                                                          |
| `<KEY>:<VALUE>`      | Il ne s'agit pas d'une recherche valide.                                                          |

Pour combiner plusieurs termes dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

| Opérateur | Description                                                                                                           | Exemple                                   |
|----------|-----------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| `AND`    | **Intersection** : les deux termes sont inclus dans les événements sélectionnés (pour les tags, `AND` est défini par défaut en l'absence d'opérateur).        | `redis_* AND down`                        |
| `OR`     | **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                               | `sources:nagios,chef directory OR Mixlib` |
| `NOT`    | **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). | `-tags:<KEY>:<VALUE> NOT "<STRING>"`      |

**Remarque** : certaines des fonctionnalités avancées du langage de requête, comme la logique booléenne, fonctionnent uniquement dans la page de flux d'événements et ne sont pas disponibles dans les carrés de graphiques ou dans les widgets des dashboards.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, pour trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez :

```text
sources:nagios,chef status:error cassandra
```

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche plein texte.

### Agrégation

Par défaut, les événements associés sont agrégés lorsqu'ils sont affichés dans le flux d'événements. Pour afficher les événements non agrégés, décochez la case **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="events/event_stream_aggregated.png" alt="Flux d'événements agrégés" style="width:50%;" >}}

### Notifications

Datadog prend en charge `@notifications` dans le flux d'événements, par exemple :

| Exemple                                 | Description                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------|
| `@support-datadog`                      | Crée un ticket d'assistance Datadog lors d'une publication directement dans votre flux d'événements (y compris les commentaires). |
| `@all`                                  | Envoie une notification à tous les membres de votre organisation.                                        |
| `@john`                                 | Envoie une notification à l'utilisateur `john`.                                                                  |
| `@test@exemple.com`                     | Envoie un e-mail à `test@exemple.com`.                                                            |
| `@slack-<COMPTE_SLACK>-<NOM_CHAÎNE>` | Publie l'événement ou le graphique sur la chaîne Slack spécifiée.                                         |
| `@webhook`                              | Déclenche une alerte ou prévient l'élément associé à ce webhook. Consultez l'[article de blog sur les webhooks][3].                              |
| `@pagerduty`                            | Envoie une alerte à Pagerduty. Vous pouvez également utiliser `@pagerduty-acknowledge` et `@pagerduty-resolve`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/events/
[2]: https://app.datadoghq.com/event/stream
[3]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio