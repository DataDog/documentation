---
title: Événements
kind: documentation
aliases:
  - /fr/guides/eventcorrelation/
  - /fr/guides/markdown/
  - /fr/graphing/event_stream/
further_reading:
  - link: /api/v1/events/
    tag: Documentation
    text: API d'événements Datadog
  - link: /dashboards/widgets/event_stream/
    tag: Documentation
    text: Ajouter un widget Flux d'événements à un dashboard
---
Un événement représente n'importe quelle activité pouvant s'avérer pertinente pour les équipes d'ingénierie (devs, ops et responsables de la sécurité). Consultez la documentation consacrée aux développeurs pour en savoir plus sur l'[envoi d'événements][1] à Datadog.

{{< site-region region="us" >}}
## Flux d'événements

Le [flux d'événements][2] affiche les événements les plus récents générés par votre infrastructure et les monitors associés.

[2]: https://app.datadoghq.com/event/stream

{{< /site-region >}}
{{< site-region region="eu" >}}
## Flux d'événements

Le [flux d'événements][3] affiche les événements les plus récents générés par votre infrastructure et les monitors associés.

[3]: https://app.datadoghq.eu/event/stream
{{< /site-region >}}
{{< site-region region="gov" >}}
## Event Explorer

L'[Event Explorer][4] affiche les événements les plus récents générés par votre infrastructure et les monitors associés. Vous pouvez personnaliser les colonnes affichées à l'aide du bouton **Options** situé en haut à droite des événements.


[4]: https://app.ddog-gov.com/event/explorer
{{< /site-region >}}
{{< site-region region="us3" >}}
## Events explorer

L'[Event Explorer][5] affiche les événements les plus récents générés par votre infrastructure et les monitors associés. Vous pouvez personnaliser les colonnes affichées à l'aide du bouton **Options** situé en haut à droite des événements.


[5]: https://us3.datadoghq.com/event/explorer
{{< /site-region >}}

### Recherche

#### Texte intégral

La recherche en texte intégral fonctionne sur tous les mots-clés fournis dans la requête de recherche après l'application des filtres. La recherche en texte intégral examine le texte, le titre et les tags de l'événement, les utilisateurs qui ont commenté l'événement ainsi que les hostnames et les appareils liés à l'événement.

#### Filtres

Ciblez des propriétés d'événements spécifiques à l'aide des préfixes suivants :


{{< site-region region="us" >}}


`sources:github,chef`           
: Affiche les événements de GitHub OU Chef.

`tags:env-prod,db`              
: Affiche les événements avec le tag #env-prod OU #db.

`hosts:i-0ade23e6,db.myapp.com` 
: Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.

`status:error`                  
: Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning` et `success`).

`priority:low`                  
: Affiche seulement les événements non prioritaires (valeurs autorisées : `low` ou `normal` ; `all` par défaut).

{{< /site-region >}}
{{< site-region region="eu" >}}

`sources:github,chef`           
: Affiche les événements de GitHub OU Chef.

`tags:env-prod,db`              
: Affiche les événements avec le tag #env-prod OU #db.

`hosts:i-0ade23e6,db.myapp.com` 
: Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.

`status:error`                  
: Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning` et `success`).

`priority:low`                  
: Affiche seulement les événements non prioritaires (valeurs autorisées : `low` ou `normal` ; `all` par défaut).

{{< /site-region >}}
{{< site-region region="gov" >}}

`source:github,chef`           
: Affiche les événements de GitHub OU Chef.

`host:i-0ade23e6,db.myapp.com`
: Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.

`service:kafka`                
: Affiche les événements du service `kafka`.

`status:error`                 
: Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning` et `success`).

`role:`                        
: 

`availability-zone:us-east-1a` 
: Affiche les événements de la zone d'accessibilité AWS `us-east-1a`.

`container_id:foo`             
: Affiche les événements provenant du conteneur avec l'ID `foo`.

`@evt.name:foo`                
: Affiche l'événement ayant comme nom `foo`.

{{< /site-region >}}
{{< site-region region="us3" >}}

`source:github,chef`           
: Affiche les événements de GitHub OU Chef.

`host:i-0ade23e6,db.myapp.com`
: Affiche les événements provenant de i-0ade23e6 OU de db.myapp.com.

`service:kafka`                
: Affiche les événements du service `kafka`.

`status:error`                 
: Affiche les événements avec un statut d'erreur (valeurs autorisées : `error`, `warning` et `success`).

`role:`                        
: 

`availability-zone:us-east-1a` 
: Affiche les événements de la zone d'accessibilité AWS `us-east-1a`.

`container_id:foo`             
: Affiche les événements provenant du conteneur avec l'ID `foo`.

`@evt.name:foo`                
: Affiche l'événement ayant comme nom `foo`.

{{< /site-region >}}

**Remarque** : les filtres effectuent une recherche de correspondance exacte et ne prennent pas en compte les chaînes de caractères partielles.

{{< site-region region="gov" >}}
#### Contexte

Créez un contexte pour explorer vos événements sur votre page Event Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer vos événements et vos analyses.

#### Facettes et mesures

Une fois recueillis, les attributs de vos événements peuvent être indexés en tant que facettes ou mesures. À gauche de la vue, vous pouvez utiliser les facettes et les mesures pour filtrer vos résultats. Vous pouvez créer des facettes ou des mesures à partir d'attributs ou de tags d'événement existants.

Une **facette** présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher. Pour utiliser un attribut en tant que facette, cliquez sur cet attribut, puis sur l'option **Create facet**. La valeur de l'attribut est stockée pour tous les nouveaux événements.

Une **mesure** est un attribut doté d'une valeur numérique associé à votre événement. Pour commencer à utiliser un attribut en tant que mesure, cliquez sur cet attribut numérique, puis sur l'option **Create measure**. La valeur de l'attribut est stockée pour tous les nouveaux événements.

#### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Event Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations. Consultez la [section relative aux vues enregistrées][5] pour en savoir plus.


[5]: logs/explorer/saved_views/
{{< /site-region >}}
{{< site-region region="us3" >}}
#### Contexte

Créez un contexte pour explorer vos événements sur votre page Event Explorer. Commencez par sélectionner l'intervalle approprié, puis utilisez la barre de recherche pour filtrer vos événements et vos analyses.

#### Facettes et mesures

Une fois recueillis, les attributs de vos événements peuvent être indexés en tant que facettes ou mesures. À gauche de la vue, vous pouvez utiliser les facettes et les mesures pour filtrer vos résultats. Vous pouvez créer des facettes ou des mesures à partir d'attributs ou de tags d'événement existants.

Une **facette** présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher. Pour utiliser un attribut en tant que facette, cliquez sur cet attribut, puis sur l'option **Create facet**. La valeur de l'attribut est stockée pour tous les nouveaux événements.

Une **mesure** est un attribut doté d'une valeur numérique associé à votre événement. Pour commencer à utiliser un attribut en tant que mesure, cliquez sur cet attribut numérique, puis sur l'option **Create measure**. La valeur de l'attribut est stockée pour tous les nouveaux événements.

#### Vues enregistrées

Utilisez les vues enregistrées pour configurer automatiquement votre Event Explorer avec un ensemble présélectionné de facettes, de mesures, de recherches, d'intervalles et de visualisations. Consultez la [section relative aux vues enregistrées][6] pour en savoir plus.


[6]: logs/explorer/saved_views/
{{< /site-region >}}

{{< site-region region="us" >}}
#### Réglages avancés

Pour effectuer une recherche plus avancée, utilisez le langage de requête d'événement Datadog, par exemple :

`tags:env-prod OR db`                             
: Affiche les événements avec le tag #env-prod OU #db.

`tags:security-group:sg-123 AND role:common-node` 
: Affiche les événements avec les tags `#security-group:sg-123` ET `#role:common-node`.

`cloud_provider:* NOT "azure"`                    
: Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».

Utilisez la recherche de tags pour trouver tous les événements dotés du même de clé, par exemple :

`tags:<KEY>:<VALUE>` 
: Affiche les événements avec le tag `<KEY>:<VALUE>`.

`<KEY>:*`            
: Affiche tous les événements avec le tag `<KEY>` lié.

`<KEY>`:`<REGEX>`    
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
: **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). 
: **Exemple** : `-tags:<KEY>:<VALUE> NOT "<STRING>"`

**Remarque** : certaines des fonctionnalités avancées du langage de requête, comme la logique booléenne, fonctionnent uniquement dans la page de flux d'événements et ne sont pas disponibles dans les carrés de graphiques ou dans les widgets des dashboards.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, pour trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez :

```text
sources:nagios,chef status:error cassandra
```

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche plein texte.
{{< /site-region >}}

{{< site-region region="eu" >}}
#### Réglages avancés

Pour effectuer une recherche plus avancée, utilisez le langage de requête d'événement Datadog, par exemple :

`tags:env-prod OR db`                             
: Affiche les événements avec le tag #env-prod OU #db.

`tags:security-group:sg-123 AND role:common-node` 
: Affiche les événements avec les tags `#security-group:sg-123` ET `#role:common-node`.

`cloud_provider:* NOT "azure"`                    
: Affiche tous les fournisseurs de cloud à l'exception de ceux dotés du tag « azure ».

Utilisez la recherche de tags pour trouver tous les événements dotés du même de clé, par exemple :

`tags:<KEY>:<VALUE>` 
: Affiche les événements avec le tag `<KEY>:<VALUE>`.

`<KEY>:*`            
: Affiche tous les événements avec le tag `<KEY>` lié.

`<KEY>`:`<REGEX>`    
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
: **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). 
: **Exemple** : `-tags:<KEY>:<VALUE> NOT "<STRING>"`

**Remarque** : certaines des fonctionnalités avancées du langage de requête, comme la logique booléenne, fonctionnent uniquement dans la page de flux d'événements et ne sont pas disponibles dans les carrés de graphiques ou dans les widgets des dashboards.

Combinez des préfixes afin d'effectuer des recherches plus complexes. Par exemple, pour trouver toutes les erreurs `chef` ou `nagios` ouvertes qui mentionnent `cassandra`, utilisez :

```text
sources:nagios,chef status:error cassandra
```

**Remarque** : n'ajoutez pas d'espace après deux-points ou une virgule dans ces listes. Tout le contenu qui n'est pas lié à un préfixe fait l'objet d'une recherche plein texte.
{{< /site-region >}}

{{< site-region region="gov" >}}
#### Réglages avancés

Pour effectuer une recherche plus avancée, utilisez le langage de requête de log Datadog. Pour en savoir plus, consultez la section relative à la [syntaxe de recherche de log][6].

Pour combiner plusieurs termes dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

`AND`    
: **Intersection** : les deux termes sont compris dans les événements sélectionnés (`AND` est défini par défaut pour les tags en l'absence d'opérateur).        
: **Exemple** : `redis_* AND down`

`OR`     
: **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                               
: **Exemple** : `sources:nagios,chef directory OR Mixlib`

`NOT`    
: **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). 
: **Exemple** : `-tags:<KEY>:<VALUE> NOT "<STRING>"`

[6]: /fr/logs/search_syntax/

{{< /site-region >}}
{{< site-region region="us3" >}}
#### Réglages avancés

Pour effectuer une recherche plus avancée, utilisez le langage de requête de log Datadog. Pour en savoir plus, consultez la section relative à la [syntaxe de recherche de log][7].

Pour combiner plusieurs termes dans une requête complexe, utilisez l'un des opérateurs booléens suivants :

`AND`    
: **Intersection** : les deux termes sont compris dans les événements sélectionnés (`AND` est défini par défaut pour les tags en l'absence d'opérateur).        
: **Exemple** : `redis_* AND down`

`OR`     
: **Union** : un des deux termes est inclus dans les événements sélectionnés. Utilisez une virgule (`,`) pour les tags.                               
: **Exemple** : `sources:nagios,chef directory OR Mixlib`

`NOT`    
: **Exclusion** : le terme suivant n'est PAS inclus dans l'événement. Cet opérateur fonctionne uniquement avec les chaînes de caractères (utilisez `-` devant les tags). 
: **Exemple** : `-tags:<KEY>:<VALUE> NOT "<STRING>"`

[7]: /fr/logs/search_syntax/

{{< /site-region >}}

{{< site-region region="us" >}}
### Agrégation

Par défaut, les événements associés sont agrégés lorsqu'ils sont affichés dans le flux d'événements. Pour afficher les événements non agrégés, décochez la case **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="events/event_stream_aggregated.png" alt="Flux d'événements agrégés"  style="width:50%;" >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
### Agrégation

Par défaut, les événements associés sont agrégés lorsqu'ils sont affichés dans le flux d'événements. Pour afficher les événements non agrégés, décochez la case **Aggregate related events** dans le coin supérieur droit de votre flux d'événements :

{{< img src="events/event_stream_aggregated.png" alt="Flux d'événements agrégés"  style="width:50%;" >}}
{{< /site-region >}}

### Notifications

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
: Envoie une alerte ou déclenche le webhook. Consultez l'[article de blog sur les webhooks][7] (en anglais) pour en savoir plus.

`@pagerduty`                            
: Envoie une alerte à Pagerduty. Vous pouvez également utiliser `@pagerduty-acknowledge` et `@pagerduty-resolve`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/guides/
[2]: https://app.datadoghq.com/event/stream
[3]: https://app.datadoghq.eu/event/stream
[4]: https://gov.datadoghq.com/event/stream
[5]: /fr/logs/explorer/saved_views/
[6]: /fr/logs/search_syntax/
[7]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio