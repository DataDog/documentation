---
aliases:
- /fr/observability_pipelines/guide/upgrade_to_the_new_search_syntax/
description: Apprenez à mettre à jour vos requêtes de filtre Observability Pipelines
  pour utiliser la nouvelle syntaxe de recherche.
disable_toc: false
further_reading:
- link: /observability_pipelines/search_syntax/logs/
  tag: Documentation
  text: Découvrez-en plus sur la syntaxe de recherche d'Observability Pipelines
title: Mettez à niveau vos requêtes de filtrage vers la nouvelle syntaxe de recherche
---
## Présentation {#overview}

Les versions 2.11 et ultérieures de Worker utilisent une syntaxe de recherche mise à jour. Les pipelines mis à niveau depuis Worker 2.10 ou une version antérieure vers la version 2.11 ou ultérieure continuent d'utiliser l'ancienne syntaxe pour les requêtes existantes. Pour migrer ces requêtes existantes vers un pipeline créé avec Worker 2.11 ou une version ultérieure, effectuez les étapes suivantes :

- [Mettez à niveau les requêtes existantes vers la nouvelle syntaxe](#upgrade-queries-to-the-new-search-syntax)
- Consultez [les nouveautés de la syntaxe de recherche mise à jour](#whats-new-in-the-updated-search-syntax)

## Mettez à niveau les requêtes vers la nouvelle syntaxe de recherche {#upgrade-queries-to-the-new-search-syntax}

Consultez les étapes en fonction de la manière dont vous avez créé le pipeline :

- [Vous avez créé le pipeline dans l'interface utilisateur](#created-the-pipeline-in-the-ui)
- [Vous avez créé le pipeline via l'API ou Terraform](#created-the-pipeline-using-the-api-or-terraform)

### Vous avez créé le pipeline dans l'interface utilisateur {#created-the-pipeline-in-the-ui}

Si vous avez créé votre pipeline dans l'interface utilisateur :

1. [Mise à niveau vers Observability Pipelines Worker][1] version 2.11 ou ultérieure. Après la mise à niveau, le pipeline utilise automatiquement la nouvelle syntaxe de recherche.
1. Accédez à [Observability Pipelines][2]. Sélectionnez le pipeline et mettez à jour les requêtes de filtre vers la nouvelle syntaxe. Consultez la section [Nouveautés de la syntaxe de recherche mise à jour](#whats-new-in-the-updated-search-syntax) pour plus d'informations.
1. Déployez votre pipeline.

### Vous avez créé le pipeline via l'API ou Terraform {#created-the-pipeline-using-the-api-or-terraform}

Si votre pipeline a été créé via l'API publique ou Terraform :
- Dans la même requête que celle que vous effectuez pour mettre à jour vos requêtes de pipeline vers la nouvelle syntaxe de recherche, définissez `use_legacy_search_syntax` sur `false`.

<div class="alert alert-warning">Vous <b>devez</b> définir <code>use_legacy_search_syntax</code> par <code>false</code> lorsque vous mettez à jour vos requêtes. Si <code>use_legacy_search_syntax</code> n'est pas renseigné, il utilise par défaut <code>true</code> dans le Worker.</div>

## Nouveautés de la syntaxe de recherche mise à jour {#whats-new-in-the-updated-search-syntax}

Le tableau suivant répertorie les différences entre l'ancienne et la nouvelle syntaxe de recherche :

| Ancienne syntaxe | Nouvelle syntaxe                        |
| ------------- | ------------------------------- |
| Nécessite le symbole `@` pour la recherche d'attributs, sauf lors du référencement de [champs réservés](#legacy-syntax-reserved-fields). | Ne nécessite pas le symbole `@` pour la recherche d'attributs. |
| Puisque `@` indique une recherche d'attribut, les recherches par tag n'incluent pas de `@` et sont mises en correspondance avec les attributs `tags` et `ddtags`.<br><br>Les requêtes de recherche d'attributs sans symbole `@` sont mises en correspondance avec le tableau `tags` ou `ddtags`.<br><br>Exemple de syntaxe de recherche d'attribut: `env:prod` | La syntaxe des tags doit être saisie explicitement.<br><br>Inspectez vos données avec [Live capture][5] pour déterminer quels champs faire correspondre.<br><br>Exemple de syntaxe de recherche d'attribut: `tags:"env:prod" OR ddtags:"env:prod"`  |
| [Les champs réservés](#legacy-syntax-reserved-fields) ne nécessitent pas le symbole `@`. | Les champs réservés ne nécessitent pas le symbole `@`. |

**Remarque**: La syntaxe de recherche mise à jour ne nécessite pas le symbole `@` pour les recherches d'attributs. Vous n'avez pas besoin de supprimer le symbole `@` des requêtes de filtre existantes, mais Datadog vous recommande de supprimer le symbole `@` de vos requêtes.

Les exemples suivants montrent les logs correspondants, ainsi que l'ancienne syntaxe et la nouvelle syntaxe qui correspondent aux logs.

`{"user": \"firstname.lastname\"}`
: **Syntaxe héritée**: `@user:firstname.lastname`
: **Nouvelle syntaxe**: `user:firstname.lastname`
: **Différence**: La nouvelle syntaxe ne nécessite pas le symbole `@` pour la recherche d'attributs.

`{"message": {\"log_level\": \"ERROR\"}}`
: **Syntaxe héritée**: `@message.log_level:ERROR`
: **Nouvelle syntaxe**: `message.log_level:ERROR`
: **Différence**: La nouvelle syntaxe ne nécessite pas le symbole `@` pour la recherche d'attributs.

`{"status": \"INFO\"}`
: **Syntaxe héritée**: `status:INFO`
: **Nouvelle syntaxe**: `status:INFO`
: **Différence**: Aucun changement car `status` était précédemment un [champ réservé](#legacy-syntax-reserved-fields) qui pouvait être filtré sans utiliser le symbole `@`. La nouvelle syntaxe n'utilise pas le symbole `@` pour les recherches d'attributs.

`{"message": \"Hello, world\" }`<br>`{\"message: \"hello world\"}`<br>`{\"message\": \"Hello-world\"}`
: **Syntaxe héritée**: `message:"hello world"`
: **Nouvelle syntaxe**: `message:"hello world"`
: **Différence**: Il n'y a aucun changement entre la syntaxe héritée et la nouvelle syntaxe car `message` était un champ réservé dans la syntaxe de recherche héritée et ne nécessitait pas le symbole `@`. La nouvelle syntaxe n'utilise pas le symbole `@` pour les recherches d'attributs.

`{"message": "hEllo world"}`
: **Syntaxe héritée**: `HELLO OR hello OR Hello`
: **Nouvelle syntaxe**: `hello`
: **Différence**: Avec la nouvelle syntaxe, la [recherche en texte libre][6] ne tient pas compte de la casse.

`{"user": "name"}`
: **Syntaxe héritée** : `@user:(name OR Name OR nAme)`
: **Nouvelle syntaxe** : `user:(name OR Name OR nAme)`
: **Différence** : Avec la nouvelle syntaxe, la [recherche d'attribut][4] est sensible à la casse et le symbole `@` n'est pas requis pour la recherche d'attribut.

`{"tags": ["env:prod"] }`<br>`{"ddtags": ["env:prod"] }`
: **Syntaxe héritée** : `env:prod`
: **Nouvelle syntaxe** : `tags:"env:prod" OR ddtags:"env:prod"`
: **Différence** : Avec la syntaxe héritée, lorsque la syntaxe ne contient pas le symbole `@` et ne recherche pas un champ réservé, tous les termes correspondent au champ `tags` ou `ddtags`. Avec la nouvelle syntaxe de recherche, il n'y a pas de champs réservés, donc toutes les recherches doivent être saisies explicitement.

`{"tags": ["message.log_level:INFO"] }`<br>`{"ddtags": ["message.log_level:INFO"]}}`
: **Syntaxe héritée** : `message.log_level:INFO`
: **Nouvelle syntaxe** : `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **Différence** : Même raison que pour la requête précédente concernant la requête `env:prod`.

`{"source": "postgres" }`<br>`{"ddsource":"postgres" }`
: **Syntaxe héritée** : `source:postgres`
: **Nouvelle syntaxe** : `source:postgres OR ddsource:postgres`
: **Différence** : Avec la syntaxe héritée, la recherche d'attribut avec le champ `source` correspond aux champs `source` et `ddsource`. La nouvelle syntaxe ne le fait plus, vous devez donc saisir `source` ou `ddsource` explicitement.

**Remarque** : L'utilisation de caractères génériques pour les noms de champs dans la recherche d'attribut n'est prise en charge ni pour la syntaxe héritée ni pour la nouvelle syntaxe. Par exemple, l'utilisation suivante de caractères génériques ne fonctionne pas :

- Syntaxe héritée : `*:something`
- Nouvelle syntaxe : `*:something`

### Champs réservés de la syntaxe héritée {#legacy-syntax-reserved-fields}

Pour la syntaxe héritée, voici les champs réservés :

* host
* source
* status
* service
* trace_id
* message
* timestamp
* tags

Consultez les [Attributs réservés][3] pour plus d'informations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /fr/observability_pipelines/search_syntax/logs/#attribute-search
[5]: /fr/observability_pipelines/live_capture/
[6]: /fr/observability_pipelines/search_syntax/logs/#free-text-search