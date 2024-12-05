---
description: Convertissez certains éléments des noms de métriques StatsD en tags grâce
  aux règles de mappage de DogStatsD.
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Mapper DogStatsD
---

Depuis la version 7.17 de l'Agent, le Mapper DogstatsD vous permet de convertir des éléments du nom d'une métrique transmise à DogStatsD en des tags. Cette création de tags passe par l'utilisation de règles de mappage, qui reposent sur des wildcards et des regex. Vous pouvez ainsi convertir la métrique suivante :

- `airflow.job.duration.<TYPE_TÂCHE>.<NOM_TÂCHE>`

en la métrique `airflow.job.duration`, avec les deux tags :

- `job_type:<TYPE_TÂCHE>`
- `job_name:<NOM_TÂCHE>`.

Pour créer une règle de mappage :

1. [Ouvrez votre fichier `datadog.yaml`][1].
2. Ajoutez un [bloc de configuration de règle de mappage](#configuration-de-la-regle-de-mappage) sous le paramètre `dogstatsd_mapper_profiles`.

## Configuration de la règle de mappage

Un bloc de règle de mappage dispose des éléments suivants :

```yaml
dogstatsd_mapper_profiles:
    - name: '<NOM_PROFIL>'
      prefix: '<PRÉFIXE_PROFIL>'
      mappings:
          - match: '<MÉTRIQUE_À_RECHERCHER>'
            match_type: '<TYPE_DE_CORRESPONDANCE>'
            name: '<NOM_MÉTRIQUE_MAPPÉE>'
            tags:
                '<CLÉ_TAG>': '<VALEUR_TAG_À_RÉUTILISER>'
```

Voici l'explication des paramètres fictifs de la commande :

| Paramètre fictif             |  Définition                                                                                                                               | Obligatoire                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|  `<NOM_PROFIL>`       | Le nom du profil de la règle de mappage.                                                                                              | oui                     |
| `<PRÉFIXE_PROFIL>`      | Le préfixe du nom de métrique associé au profil.                                                                                        | oui                     |
| `<MÉTRIQUE_À_RECHERCHER>`     | Le nom de métrique à utiliser pour extraire des groupes, que ce soit avec une une [recherche wildcard](#correspondance-avec-wildcard) ou une [regex](#correspondance-avec-regex).         | oui                     |
| `<TYPE_CORRESPONDANCE>`          | Le type de correspondance à appliquer à `<MÉTRIQUE_À_RECHERCHER>`. Valeurs autorisées : [`wildcard`](#correspondance-avec-wildcard) ou [`regex`](#correspondance-avec-regex).    | non, valeur par défaut : `wildcard` |
| `<NOM_MÉTRIQUE_MAPPÉE>`  | Le nom de la nouvelle métrique à envoyer à Datadog, avec les tags définis dans le même groupe.                                                           | oui                     |
| `<CLÉ_TAG>`             | La clé de tag à appliquer aux tags recueillis.                                                                                           | non                      |
| `<VALEUR_TAG_À_RÉUTILISER>` | Les tags recueillis avec la correspondance `<MATCH_TYPE>` à ajouter.                                                                                     | non                      |

## Correspondance avec wildcard

La correspondance avec wildcard renvoie des noms de métriques séparés par des points à l'aide du wildcard `*`. Pour que cette expression fonctionne, les noms des métriques doivent uniquement être composés de caractères alphanumériques, ainsi que des caractères `.` et `_`. Les groupes extraits peuvent être réutilisés en suivant l'un des formats ci-dessous :

- Format `$n` : `$1`, `$2`, `$3`, etc.
- Format `${n}` : `${1}`, `${2}`, `${3}`, etc.

Imaginons que vous disposiez de la métrique `custom_metric.process.value_1.value_2`, avec la configuration de groupe de mappage suivante :

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

Cela envoie la métrique `custom_metric.process` à Datadog, avec les tags `tag_key_1:value_1` et `tag_key_2:value_2`.

## Correspondance avec regex

La correspondance avec regex renvoie des noms de métriques à l'aide d'une expression régulière. Contrairement à la correspondance avec wildcard, il est possible de récupérer des groupes contenant le caractère `.`. Les groupes extraits peuvent être réutilisés en suivant l'un des formats ci-dessous :

- Format `$n` : `$1`, `$2`, `$3`, etc.
- Format `${n}` : `${1}`, `${2}`, `${3}`, etc.

Imaginons que vous disposiez de la métrique `custom_metric.process.value_1.value.with.dots._2`, avec la configuration de groupe de mappage suivante :

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric\.process\.([\w_]+)\.(.+)'
            match_type: regex
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

Cela envoie la métrique `custom_metric.process` à Datadog, avec les tags `tag_key_1:value_1` et `tag_key_2:value.with.dots._2`.

## Réutiliser un groupe dans un nom de métrique

Pour les correspondances de type `regex` et `wildcard`, le groupe recueilli peut être réutilisé en tant que valeur de tag, avec une clé de tag associée, tel que décrit dans la section précédente. Il peut également être utilisé dans le paramètre `name` de la métrique. Prenons l'exemple d'une métrique `custom_metric.process.value_1.value_2` avec la configuration de groupe de mappage suivante :

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: 'custom_metric.process.prod.$1.live'
            tags:
                tag_key_2: '$2'
```

Cela envoie la métrique `custom_metric.process.prod.value_1.live` à Datadog, avec le tag `tag_key_2:value_2`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file