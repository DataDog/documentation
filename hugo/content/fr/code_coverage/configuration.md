---
description: Configurez le comportement de Code Coverage avec un fichier de configuration
  dans votre dépôt.
further_reading:
- link: /code_coverage
  tag: Documentation
  text: Code Coverage
- link: /code_coverage/setup
  tag: Documentation
  text: Configurez Code Coverage
- link: /code_coverage/flags
  tag: Documentation
  text: Organisez les données de couverture avec des flags
- link: /code_coverage/carryforward
  tag: Documentation
  text: Maintenez la couverture totale précise avec carryforward.
title: Configuration de Code Coverage
---
## Présentation {#overview}

Vous pouvez configurer le comportement de Code Coverage en créant un fichier de configuration nommé `code-coverage.datadog.yml` ou `code-coverage.datadog.yaml` à la racine de votre dépôt.

Exemple de fichier de configuration :

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
      - backend/.*\.go
ignore:
  - "test/**/*"
  - "**/*.pb.go"
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85
  - type: patch_coverage_percentage
    config:
      threshold: 95
comments:
  enabled: true
  file_breakdown: true
```

## Configuration des services{#services-configuration}

<div class="alert alert-info">L'utilisation de l'<a href="/code_coverage/monorepo_support#software-catalog-integration">intégration Catalog</a> est l'approche recommandée pour définir des services, car les emplacements de code configurés dans Catalog peuvent être utilisés par plusieurs produits Datadog. Utilisez la configuration manuelle uniquement lorsque l'intégration Catalog n'est pas disponible.</div>

Vous pouvez définir des services dans votre fichier de configuration pour diviser les données de couverture par service dans les monorepos. Ceci est utile lorsque plusieurs projets ou équipes partagent un seul dépôt et que vous souhaitez afficher les métriques de couverture pour chaque service indépendamment.

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/**
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
```

- `schema-version` (requis) : Doit être `v1`
- `services` : Liste des définitions de service
  - `id` (requis) : Identifiant unique pour le service
  - `paths` (requis) : Liste des modèles de chemin qui appartiennent à ce service (voir [Syntaxe des modèles](#pattern-syntax))

Pour plus de détails sur la prise en charge des monorepos, y compris l'intégration au Catalogue et la division basée sur les code owners, consultez [Monorepo Support][1].

### Exemples {#examples}

{{% collapse-content title="Monorepo JavaScript/TypeScript" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: web-app
    paths:
      - packages/web/**
      - packages/shared/ui/**
  - id: mobile-app
    paths:
      - packages/mobile/**
      - packages/shared/core/**
  - id: admin-dashboard
    paths:
      - packages/admin/**
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Monorepo multi-langage" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-service
    paths:
      - services/backend/**
      - services/backend/.*\.go
  - id: frontend-web
    paths:
      - services/frontend/**
      - services/frontend/.*\.(ts|tsx)
  - id: data-processing
    paths:
      - services/data/**
      - scripts/.*\.py
{{< /code-block >}}
{{% /collapse-content %}}

## Ignorer les chemins {#ignoring-paths}

Vous pouvez exclure des fichiers ou des répertoires spécifiques des rapports de couverture de code en utilisant le champ `ignore`. Ceci est utile pour exclure les fichiers de test, le code généré, les dépendances de fournisseur et d'autres fichiers qui ne devraient pas être inclus dans les métriques de couverture. Les modèles de chemin prennent en charge la correspondance glob, regex et préfixe (voir [Syntaxe de modèle](#pattern-syntax)).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Exceptions {#exceptions}

Ajoutez `!` avant un modèle pour créer une exception à vos règles d'exclusion. Cela vous permet d'inclure des fichiers ou des dossiers spécifiques qui seraient autrement exclus.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Important** : Les modèles négatifs ont priorité sur les modèles positifs. Si un modèle négatif correspond à un chemin de fichier, ce chemin _n'est pas_ ignoré.

### Exemples{#examples-1}

{{% collapse-content title="Exclure les fichiers de test et le code généré" level="h4" %}}

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="Exclure avec des exceptions" level="h4" %}}

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="Types de modèles mixtes" level="h4" %}}

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

## Portes de PR {#pr-gates}

Vous pouvez définir des [PR Gates][2] dans le fichier de configuration pour appliquer des seuils de couverture de code sur les pull requests. Si des portes sont également configurées dans l'[interface utilisateur Datadog][2], Datadog évalue à la fois les règles du fichier de configuration et les règles de l'interface utilisateur lorsqu'une PR est ouverte ou mise à jour.

<div class="alert alert-info">Si le fichier de configuration et l'interface utilisateur Datadog définissent tous deux des portes pour le même périmètre, la pull request doit respecter chaque seuil défini.</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

Chaque porte possède les champs suivants :

- `type` (requis) : Le type de porte de couverture. Valeurs prises en charge :
  - `total_coverage_percentage` : Le pourcentage de couverture global minimal pour le dépôt (ou pour les services ciblés ou pour les code owners).
  - `patch_coverage_percentage` : Le pourcentage de couverture minimal sur le code modifié dans la pull request.
- `config` (requis) : Options de configuration de la porte. Valeurs prises en charge :
  - `threshold` (requis) : Le pourcentage de couverture minimal (0-100).
  - `services` : (facultatif) Une liste de modèles de noms de service pour limiter la porte. Utilisez `*` comme caractère générique. Faites précéder une valeur de `!` pour exclure les services correspondants. Lorsque cette option est définie, la couverture est évaluée séparément pour chaque service correspondant.
  - `codeowners` : (facultatif) Une liste de modèles de code owners pour limiter la porte. Utilisez `*` comme caractère générique. Faites précéder une valeur de `!` pour exclure les code owners correspondants. Lorsque cette option est définie, la couverture est évaluée séparément pour chaque code owner correspondant.
  - `flags` : (facultatif) Une liste de modèles de noms de [flag][3] pour limiter la porte. Utilisez `*` comme caractère générique. Faites précéder une valeur de `!` pour exclure les indicateurs correspondants. Lorsque cette option est définie, la couverture est évaluée séparément pour chaque indicateur correspondant.

### Exemples {#examples-2}

{{% collapse-content title="Portes de couverture totale et de correctif non limitées" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80

  - type: patch_coverage_percentage
    config:
      threshold: 90
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Portes limitées aux services." level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-api
    paths:
      - backend/api/**
  - id: frontend-web
    paths:
      - frontend/**
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 90
      services:
        - "*"

  - type: total_coverage_percentage
    config:
      threshold: 85
      services:
        - "backend-api"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Portes limitées aux code owners." level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 95
      codeowners:
        - "@DataDog/backend-team"
        - "@DataDog/api-*"

  - type: total_coverage_percentage
    config:
      threshold: 80
      codeowners:
        - "@DataDog/frontend-team"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Portes limitées aux indicateurs." level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      flags:
        - "unit-tests"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "integration-tests"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Exclusion avec négation" level="h4" %}}
Utilisez le préfixe `!` pour exclure des services, des code owners ou des indicateurs spécifiques d'une porte. Par exemple, pour appliquer la couverture sur tous les services sauf les expérimentaux, et sur tous les indicateurs sauf les tests nocturnes :
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      services:
        - "*"
        - "!experimental-*"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "*"
        - "!nightly-*"
{{< /code-block >}}
{{% /collapse-content %}}

## Commentaires de PR {#pr-comments}

Par défaut, Datadog publie un commentaire de résumé de couverture de code sur chaque pull request. Le résumé indique la couverture totale et la couverture de correctif pour la pull request et renvoie à la page Code Coverage dans Datadog.

Le bloc `comments` accepte les champs suivants :

| Champ | Type | Par défaut | Description |
|---|---|---|---|
| `enabled` | Boolean | `true` | Indique si Datadog publie un commentaire de couverture de code sur les pull requests. |
| `file_breakdown` | Boolean | `false` | Indique si le commentaire inclut un tableau par fichier de la couverture totale et de la couverture de correctif. |

Les checks de porte de PR ne sont pas affectés par ces paramètres.

### Désactivation des commentaires de PR {#disabling-pr-comments}

Vous pouvez supprimer le commentaire par dépôt avec le champ `comments.enabled` :

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: false
{{< /code-block >}}

### Répartition par fichier {#per-file-breakdown}

Définissez `comments.file_breakdown` sur `true` pour ajouter au commentaire un tableau listant les fichiers modifiés dans la pull request, ainsi que leur couverture totale et leur couverture de correctif :

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: true
  file_breakdown: true
{{< /code-block >}}

La répartition n'a aucun effet lorsque `comments.enabled` est `false`.

## Carryforward {#carryforward}

{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !">}}Le carryforward est en préversion et est susceptible d'être modifié.{{< /callout >}}

Vous pouvez activer [carryforward][4] dans le fichier de configuration pour réutiliser les données de couverture des commits ancêtres lorsque tous les jobs CI ne s'exécutent pas pour un commit. Le carryforward fonctionne sur les [flag][3], donc chaque rapport impliqué doit être marqué avec `--flags`.

Pour activer le carryforward pour chaque flag dans le dépôt :

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
carryforward: true
{{< /code-block >}}

Pour activer le carryforward uniquement pour des flags spécifiques :

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
flags:
  unit-tests:
    carryforward: true
  integration-tests:
    carryforward: true
{{< /code-block >}}

Le champ de haut niveau `carryforward` accepte les valeurs suivantes :

- `true` : Le carryforward est activé pour chaque flag, sauf si un flag le remplace par `carryforward: false` dans la carte `flags`.
- `false` (par défaut) : Le carryforward est désactivé, sauf si un flag choisit de l'activer avec `carryforward: true` dans la carte `flags`.

La carte `flags` accepte un bloc de configuration par flag. Les champs pris en charge sont :

- `carryforward` : Un booléen qui active ou désactive le carryforward pour le flag nommé. Remplace la valeur de haut niveau `carryforward`.

Pour plus de détails, consultez [Code Coverage Carryforward][4].

## Syntaxe des motifs {#pattern-syntax}

Les options de configuration qui acceptent des chemins de fichiers prennent en charge trois types de motifs :

- `regex`
- `glob`
- `path_prefix`

Le type de motif est automatiquement détecté en fonction de la syntaxe que vous utilisez.

### Motifs Regex {#regex-patterns}

Les motifs contenant des caractères spécifiques aux expressions régulières (`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`) sont traités comme des expressions régulières :

- `".*\\.pb\\.go$"` - Correspond aux fichiers se terminant par `.pb.go`
- `"^generated/.*"` - Correspond aux fichiers dans le répertoire généré
- `".*_test\\.go$"` - Correspond aux fichiers de test

**Remarque** : Les motifs Regex sont automatiquement ancrés avec `^...$` pour une correspondance sur le chemin complet. Utilisez des barres obliques (`/`) comme séparateurs de chemin dans les motifs regex.

### Motifs Glob {#glob-patterns}

Les motifs contenant des caractères spécifiques aux glob (`*`, `?`, `[`, `]`) sont traités comme des motifs glob :

- `"**/*.java"` - Correspond à tous les fichiers Java
- `"src/test/**/*"` - Correspond à tous les fichiers sous src/test
- `"*.pb.go"` - Correspond aux fichiers protobuf dans n'importe quel répertoire

**Note** : Utilisez `**` pour faire correspondre les répertoires de manière récursive. Le modèle `folder/*` ne correspond qu'aux enfants directs, tandis que `folder/**/*` correspond à tous les descendants.

### Modèles de préfixe {#prefix-patterns}

Les préfixes de chemin simples sans caractères spéciaux sont traités comme des correspondances de préfixe :

- `"vendor/"` - Correspond à tous les fichiers sous le répertoire vendor
- `"third_party/"` - Correspond au code tiers
- `"generated/"` - Correspond au code généré

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /fr/code_coverage/flags
[4]: /fr/code_coverage/carryforward