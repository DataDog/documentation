---
further_reading:
- link: /api/v1/events/
  tag: Documentation
  text: API d'événements Datadog
- link: /dashboards/widgets/event_stream/
  tag: Documentation
  text: Ajouter un widget Flux d'événements à un dashboard
kind: documentation
title: Flux d'événements
---
<div class="alert alert-warning">
  Le flux d'événements a été remplacé par l'Event Explorer. Le flux d'événements n'est plus disponible depuis le 5 mai 2022. Consultez cet <a href="https://www.datadoghq.com/blog/datadog-events/">article de blog</a> pour en savoir plus.
</div>

Le [flux d'événements][1] affiche les événements les plus récents générés par votre infrastructure et les monitors associés.

## Rechercher

### Texte intégral

La recherche en texte intégral fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche en texte intégral examine le texte, le titre et les tags de l'événement, les utilisateurs qui ont commenté l'événement ainsi que les hostnames et les appareils liés à l'événement.

### Exemples de filtre

Ciblez des propriétés d'événements spécifiques à l'aide des exemples de préfixe suivants :

`sources:github,chef`           
: Affiche les événements de GitHub OU Chef.

`tags:env-prod,db`              
: Affiche les événements avec le tag #env-prod OU #db.

`hosts:i-0ade23e6,db.myapp.com` 
: Affiche les événements provenant de `i-0ade23e6` OU de `db.myapp.com`.

`status:error`                  
: Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning` et `success`).

`priority:low`                  
: Affiche seulement les événements non prioritaires (valeurs autorisées : `low` ou `normal` ; `all` par défaut).

**Remarque** : les filtres effectuent une recherche de correspondance exacte et ne prennent pas en compte les chaînes de caractères partielles.

### Exemples avec le langage de requête d'événement

Pour effectuer une recherche plus avancée, utilisez le langage de requête d'événement Datadog, par exemple :

`tags:env-prod OR db`                             
: Affiche les événements avec le tag `#env-prod` OU `#db`.

`tags:security-group:sg-123 AND role:common-node` 
: Affiche les événements avec les tags `#security-group:sg-123` ET `#role:common-node`.

`cloud_provider:* NOT "azure"`                    
: Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».

Utilisez la recherche de tags pour trouver tous les événements dotés du même de clé, par exemple :

`tags:<KEY>:<VALUE>` 
: Affiche les événements avec le tag `<KEY>:<VALUE>`.

`<KEY>:*`            
: Affiche tous les événements avec le tag `<KEY>` lié.

`<KEY>:<REGEX>`    
: Affiche tous les événements avec le tag `<KEY>:<VALUE>`, où `<VALUE>` correspond à `<REGEX>`.

`tags:<KEY>`         
: Cette recherche n'est pas valide.

`<KEY>:<VALUE>`      
: Cette recherche n'est pas valide.

Pour combiner plusieurs termes dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

`AND`    
: **Intersection** : les deux termes sont compris dans les événements sélectionnés (`AND` est défini par défaut pour les tags en l'absence d'opérateur).        
: **Exemple** : `redis_* AND down`

`OR`     
: **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                               
: **Exemple** : `sources:nagios,chef directory OR Mixlib`

`NOT`    
: **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères. Utilisez `-` devant les tags. 
: **Exemple** : `-tags:<KEY>:<VALUE> NOT "<STRING>"`

**Remarque** : certaines des fonctionnalités avancées du langage de requête, comme la logique booléenne, fonctionnent uniquement dans la page de flux d'événements et ne sont pas disponibles dans les carrés de graphiques ou dans les widgets des dashboards.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, pour trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez :

```text
sources:nagios,chef status:error cassandra
```

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche de texte intégral.

## Agrégation

Par défaut, les événements affichés dans le flux d'événements sont agrégés. Pour afficher les événements non agrégés, décochez la case **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="events/event_stream_aggregated.png" alt="Flux d'événements agrégés" style="width:50%;" >}}

## Notifications

Vous pouvez utiliser la syntaxe `@notifications` dans Datadog pour envoyer des notifications.

`@support-datadog`                      
: Crée un ticket d'assistance Datadog lorsque cette mention est ajoutée directement dans vos événements (y compris dans les commentaires).

`@all`                                  
: Envoie une notification à tous les membres de votre organisation.

`@john`                                 
: Envoie une notification à l'utilisateur `john`.

`@test@example.com`                     
: Envoie un e-mail à `test@example.com`.

`@slack-<COMPTE_SLACK>-<NOM_CANAL>` 
: Publie l'événement ou le graphique sur la chaîne Slack spécifiée.

`@webhook`                              
: Envoie une alerte ou déclenche le webhook. Consultez l'[article de blog sur les webhooks][2] (en anglais) pour en savoir plus.

`@pagerduty`                            
: Envoie une alerte à Pagerduty. Vous pouvez également utiliser `@pagerduty-acknowledge` et `@pagerduty-resolve`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/stream
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio