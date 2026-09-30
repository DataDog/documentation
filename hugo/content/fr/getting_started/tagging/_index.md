---
algolia:
  tags:
  - tagging
aliases:
- /fr/getting_started/getting_started_with_tags
- /fr/guides/getting_started/tagging/
- /fr/developers/getting_started/tagging/
- /fr/tagging
- /fr/guides/tagging/
- /fr/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Découvrez comment assigner et utiliser des tags dans Datadog.
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: Documentation
  text: Apprendre à assigner des tags
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Apprendre à configurer le tagging de service unifié
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Apprendre à assigner des tags
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur le tagging efficace avec Datadog
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog
- link: https://learn.datadoghq.com/courses/tagging-best-practices
  tag: Centre d'apprentissage
  text: Meilleures pratiques de balisage
title: Débuter avec les tags
---
## Aperçu {#overview}

Les étiquettes sont un moyen d'ajouter des dimensions aux télémetries de Datadog afin qu'elles puissent être filtrées, agrégées et comparées dans les visualisations de Datadog. [L'utilisation d'étiquettes][1] vous permet d'observer la performance agrégée sur plusieurs hôtes et (optionnellement) de restreindre davantage l'ensemble en fonction d'éléments spécifiques. En résumé, l'étiquetage est une méthode pour observer des points de données agrégés.

Une étiquette peut être formatée comme `<key>:<value>` ou `<value>`. Datadog recommande d'utiliser le format `<key>:<value>`, car il est souvent sémantiquement plus clair et permet des capacités de requête plus riches (par exemple, le regroupement par clé). Lors de l'utilisation d'une paire `<key>:<value>` :

- L'étiquette **clé** est l'identifiant. Les clés d'étiquette couramment utilisées sont `env`, `instance` et `name`.
- L'étiquette **valeur** est les données ou informations spécifiques associées à la clé. Les valeurs d'étiquette ne sont pas uniques par ressource et peuvent être utilisées sur de nombreuses ressources dans une paire `<key>:<value>`.

L'étiquetage lie différents types de données dans Datadog, permettant la corrélation et les appels à l'action entre les métriques, les traces et les journaux. Cela est réalisé avec des clés d'étiquette **réservées** :
| Clé d'étiquette   | Permet de                                                             |
|-----------|------------------------------------------------------------------------|
| `host`    | Corrélation entre les métriques, les traces, les processus et les journaux.              |
| `device`  | Séparation des métriques, des traces, des processus et des journaux par appareil ou disque. |
| `source`  | Filtrage des spans et création automatisée de pipelines pour la gestion des journaux.     |
| `service` | Définition des données spécifiques à l'application à travers les métriques, les traces et les journaux. |
| `env`     | Définition des données spécifiques à l'application à travers les métriques, les traces et les journaux. |
| `version` | Définition des données spécifiques à l'application à travers les métriques, les traces et les journaux. |
| `team`    | Attribution de la propriété à toutes les ressources.                                  |

Datadog recommande d'examiner les conteneurs, les machines virtuelles et l'infrastructure cloud au niveau `service` dans son ensemble. Par exemple, examinez l'utilisation du CPU à travers un ensemble d'hôtes représentant un service, plutôt que l'utilisation du CPU pour le serveur A ou le serveur B séparément.

Puisque les conteneurs et les environnements cloud changent régulièrement de hosts, il est important d'utiliser des tags pour agréger vos métriques.

## Définir des étiquettes {#define-tags}

Les chaînes d'étiquettes (c'est-à-dire, le contenu entier de `<key>:<value>` ou `<value>`) doivent répondre aux exigences suivantes :

- Les chaînes d'étiquettes doivent **commencer par une lettre** (cela s'applique indépendamment du fait que l'étiquette utilise le format `<key>:<value>` ou `<value>`). Après la lettre initiale, la chaîne d'étiquette peut contenir les caractères énumérés ci-dessous :

    - Lettres (toutes les lettres Unicode sont prises en charge—par exemple, a, ó, 気, 녕, ك, et ดี)
    - Chiffres
    - Underscores (les underscores en début et en fin sont supprimés, et les underscores contigus sont réduits à un seul)
    - Tirets
    - Deux-points
    - Points
    - Barres obliques
    - (Uniquement pour les étiquettes sur les journaux [ingérées via HTTP][28]) signes @ (`@`)

    Tous les autres caractères (y compris les virgules, les émojis, les barres obliques inverses et les espaces) sont convertis en underscores.
    
    **Remarques** :
    - Une étiquette qui commence par un chiffre peut être acceptée dans certains contextes, tels que les étiquettes `env` définies au niveau de l'Agent. Cependant, les balises qui ne respectent pas les règles de nommage standard peuvent ne pas fonctionner de manière cohérente dans tous les produits Datadog et peuvent augmenter la cardinalité des balises. Commencez les balises par une lettre, sauf si un produit spécifique le prend explicitement en charge.
    - La variable d'environnement `DD_TAGS` utilise des espaces comme séparateur entre les balises. Les espaces dans les valeurs `DD_TAGS` ne sont **pas** convertis en underscores. Par exemple, `DD_TAGS="test:this is a test"` produit quatre balises distinctes : `test:this`, `is`, `a` et `test`. Pour définir une valeur de balise contenant des espaces, utilisez un fichier de configuration YAML ou des annotations d'intégration, où les espaces sont convertis en underscores.

- Les balises peuvent avoir une longueur allant jusqu'à **200 caractères**. Si la balise a le format `<key>:<value>`, la clé, `:`, et la valeur comptent toutes pour la limite de caractères.
- [Les balises de span][26] et les balises de métriques sont normalisées en minuscules, donc évitez d'utiliser le camel case dans les clés de balises. Les fournisseurs de cloud normalisent le camel case de manière incohérente. Par exemple, AWS convertit `TestTag` en `testtag`, tandis qu'Alibaba Cloud convertit `TestTag` en `test_tag`.
    - Contrairement aux balises, [les attributs de span][27] et les attributs de log sont sensibles à la casse et ne sont pas normalisés.
- Lors de l'utilisation du format `<key>:<value>`, la clé précède toujours le premier deux-points de la définition de balise globale. Exemple :
    
    | Balise                | Clé           | Valeur          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

- Les balises ne doivent pas provenir de sources non bornées, telles que des horodatages d'époque, des identifiants d'utilisateur ou des identifiants de requête. Cela peut entraîner une croissance illimitée de votre nombre de [métriques][2].


## Attribuer des balises {#assign-tags}

### Méthodes de balisage {#tagging-methods}

Vous pouvez utiliser l'une (ou l'ensemble) des méthodes suivantes pour assigner des tags.

| Méthode                   | Attribuer des balises                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Fichiers de configuration][3] | Manuellement dans vos fichiers de configuration principaux de l'Agent ou d'intégration. |
| [UI][4]                  | Sur le site de Datadog.                                             |
| [API][5]                 | Lors de l'utilisation de l'API de Datadog.                                        |
| [DogStatsD][6]           | Lors de la soumission de métriques avec DogStatsD.                          |

Pour en savoir plus, consultez la section [Assigner des tags][7].

#### Étiquetage de service unifié {#unified-service-tagging}

En tant que meilleure pratique, Datadog recommande d'utiliser l'étiquetage de service unifié lors de l'attribution des étiquettes. L'étiquetage de service unifié relie la télémétrie de Datadog grâce à l'utilisation de trois étiquettes standard : `env`, `service` et `version`. Pour apprendre à configurer votre environnement avec l'étiquetage unifié, consultez [Étiquetage de service unifié][8].

### Héritage des étiquettes {#tag-inheritance}

Toutes les métriques, journaux, traces et intégrations passent par un processus d'`host-tag` héritage lors de l'ingestion des données dans Datadog. Étant donné que les données sont associées à un nom d'hôte donné, ces composants héritent de toutes les `host-level` étiquettes associées à cet hôte. Ces étiquettes sont visibles dans la [liste d'infrastructure][12] pour un hôte donné, provenant soit du fournisseur de cloud, soit de l'Agent Datadog. Consultez [les étiquettes `host-level` manquantes sur les nouveaux hôtes ou nœuds][25] pour plus d'informations.

Parce que les étiquettes peuvent être héritées de plusieurs sources, choisissez des noms de clés uniques et spécifiques pour éviter de les dupliquer entre les sources. Par exemple, si vous avez défini une clé `service` sur un hôte (`service:my-host`) et une clé `service` sur un pod s'exécutant sur cet hôte (`service:my-service`), vos données héritent des deux étiquettes. Optez pour des noms de clés plus différenciés (comme `infra_service`) pour éviter les clés d'étiquettes en double.

### Priorité des étiquettes {#tag-precedence}

L'Agent Datadog ne **pas** impose un ordre de priorité pour les étiquettes définies à partir de différentes sources. Au lieu de cela, l'Agent collecte toutes les étiquettes de chaque source disponible, stocke chaque valeur unique pour une clé d'étiquette donnée et les émet toutes avec la télémétrie.

Cela signifie qu'une seule clé d'étiquette peut avoir plusieurs valeurs si elle est configurée différemment entre les sources. Par exemple, si l'étiquette `service` est définie sur `payments` dans une variable d'environnement, `checkout` dans le YAML de l'Agent, et `orders` dans une configuration de client de traçage, la télémétrie pour ce service pourrait inclure :

```
service:payments
service:checkout
service:orders
```

Les filtres ou tableaux de bord en aval doivent explicitement filtrer sur la valeur souhaitée si vous n'en attendez qu'une seule.

## Utilisation {#usage}

Après avoir [attribué des étiquettes][7] au niveau de l'hôte et de l'[intégration][9], commencez à les utiliser pour filtrer et regrouper vos métriques, traces et journaux. Les étiquettes sont utilisées dans les domaines suivants de votre plateforme Datadog.

| Domaine                 | Utilisez des étiquettes pour                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Événements][10]         | Filtrer le flux d'événements.                                                                          |
| [Tableaux de bord][11]     | Filtrer et regrouper les métriques sur les graphiques.                                                               |
| [Infrastructure][12] | Filtrer et regrouper sur la carte des hôtes, la liste des infrastructures, les conteneurs actifs et les processus actifs. |
| [Moniteurs][13]       | Gérer les moniteurs, créer des moniteurs ou gérer les temps d'arrêt.                                             |
| [Métriques][14]        | Filtrer et regrouper avec le Metric Explorer.                                                        |
| [Intégrations][15]   | Limiter, si besoin, les métriques pour AWS, Google Cloud et Azure.                                        |
| [APM][16]            | Filtrer les services, traces et profils, ou naviguer vers d'autres zones avec le Service Map.           |
| [RUM & Session Replay][17] | Filtrer la recherche d'événements, les analyses, les patterns, les replays et les problèmes avec le RUM Explorer.        |
| [Synthetic Monitoring & Continuous Testing][18]     | Filtrer et regrouper les tests synthétiques ou ceux exécutés dans les pipelines CI avec le Synthetic Monitoring & Testing Results Explorer.   |
| [Notebooks][19]      | Filtrer et regrouper les métriques sur les graphiques.                                                               |
| [Logs][20]           | Filtrer la recherche de logs, les analyses, les patterns, le live tail et les pipelines.                                |
| [SLOs][21]           | Rechercher des SLOs, des SLOs basés sur des métriques regroupées et des SLOs basés sur des monitors regroupés.                       |
| [Developers][22]     | Extraire des informations ou configurer différentes zones dans l'UI avec l'API.                                |
| [Facturation][23]        | Faire un rapport sur l'utilisation de Datadog en choisissant jusqu'à trois tags, par exemple : `env`, `team` et `account_id`. |
| [CI Visibility][24]  | Filtrer et regrouper les exécutions de tests ou de pipelines avec le CI Visibility Explorer. |

Pour en savoir plus, consultez la section [Utiliser les tags][1].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/using_tags/
[2]: /fr/metrics/
[3]: /fr/getting_started/tagging/assigning_tags/#configuration-files
[4]: /fr/getting_started/tagging/assigning_tags/#ui
[5]: /fr/getting_started/tagging/assigning_tags/#api
[6]: /fr/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /fr/getting_started/tagging/assigning_tags/
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/integrations/
[10]: /fr/getting_started/tagging/using_tags/#events
[11]: /fr/getting_started/tagging/using_tags/#dashboards
[12]: /fr/getting_started/tagging/using_tags/#infrastructure
[13]: /fr/getting_started/tagging/using_tags/#monitors
[14]: /fr/getting_started/tagging/using_tags/#metrics
[15]: /fr/getting_started/tagging/using_tags/#integrations
[16]: /fr/getting_started/tagging/using_tags/#apm
[17]: /fr/getting_started/tagging/using_tags/#rum--session-replay
[18]: /fr/getting_started/tagging/using_tags/#synthtics
[19]: /fr/getting_started/tagging/using_tags/#notebooks
[20]: /fr/getting_started/tagging/using_tags/#logs
[21]: /fr/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /fr/getting_started/tagging/using_tags/#developers
[23]: /fr/account_management/billing/usage_attribution/
[24]: /fr/getting_started/tagging/using_tags/#ci-visibility
[25]: /fr/containers/troubleshooting/log-collection?tab=datadogoperator#missing-host-level-tags-on-new-hosts-or-nodes
[26]: /fr/tracing/trace_collection/tracing_naming_convention/#span-tags
[27]: /fr/tracing/trace_collection/tracing_naming_convention/#span-attributes
[28]: /fr/api/latest/logs/#send-logs