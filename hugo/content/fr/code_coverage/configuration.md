---
description: Configurez le comportement de la couverture de code avec un fichier de
  configuration dans votre dépôt.
further_reading:
- link: /code_coverage
  tag: Documentation
  text: Couverture de code
- link: /code_coverage/setup
  tag: Documentation
  text: Configurer la couverture de code
- link: /code_coverage/flags
  tag: Documentation
  text: Organisez les données de couverture avec flags
title: Configuration de la couverture de code
---
## Aperçu

Vous pouvez configurer le comportement de la couverture de code en créant un fichier de configuration nommé `code-coverage.datadog.yml` ou `code-coverage.datadog.yaml` à la racine de votre dépôt.

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
```

## Configuration des services

<div class="alert alert-info">Utiliser l'intégration <a href="/code_coverage/monorepo_support#software-catalog-integration">Catalogue de logiciels</a> est l'approche recommandée pour définir des services, car les emplacements de code configurés dans le Catalogue de logiciels peuvent être utilisés par plusieurs produits Datadog. Utilisez la configuration manuelle uniquement lorsque l'intégration du Catalogue de logiciels n'est pas disponible.</div>

Vous pouvez définir des services dans votre fichier de configuration pour diviser les données de couverture par service dans les monorepos. Ceci est utile lorsque plusieurs projets ou équipes partagent un seul dépôt et que vous souhaitez voir les métriques de couverture pour chaque service de manière indépendante.

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

- `schema-version` (obligatoire) : Doit être `v1`
- `services` : Liste des définitions de services
  - `id` (obligatoire) : Identifiant unique pour le service
  - `paths` (obligatoire) : Liste des motifs de chemin qui appartiennent à ce service (voir [Syntaxe des motifs](#pattern-syntax))

Pour des détails complets sur le support des monorepos, y compris l'intégration du Catalogue de logiciels et le découpage basé sur le propriétaire du code, voir [Support des monorepos][1].

### Exemples

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

{{% collapse-content title="Monorepo multilingue" level="h4" %}}
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

## Ignorer les chemins

Vous pouvez exclure des fichiers ou des répertoires spécifiques du rapport de couverture de code en utilisant le champ `ignore`. Ceci est utile pour exclure les fichiers de test, le code généré, les dépendances de fournisseurs et d'autres fichiers qui ne devraient pas être inclus dans les métriques de couverture. Les motifs de chemin prennent en charge les correspondances glob, regex et préfixe (voir [Syntaxe des motifs](#pattern-syntax)).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Exceptions

Ajoutez `!` avant un motif pour créer une exception à vos règles d'exclusion. Cela vous permet d'inclure des fichiers ou des dossiers spécifiques qui seraient autrement exclus.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Important** : Les motifs négatifs ont la priorité sur les motifs positifs. Si un motif négatif correspond à un chemin de fichier, ce chemin n'est _pas_ ignoré.

### Exemples

{{% collapse-content title="Exclure les fichiers de test et le code généré" level="h4" %}}

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="Exclure avec exceptions" level="h4" %}}

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="Types de motifs mixtes" level="h4" %}}

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

## Portes PR

Vous pouvez définir des [Portes PR][2] dans le fichier de configuration pour imposer des seuils de couverture de code sur les demandes de tirage. Si des portes sont également configurées dans l'[interface utilisateur Datadog][2], Datadog évalue à la fois les règles du fichier de configuration et les règles de l'interface utilisateur lorsqu'une PR est ouverte ou mise à jour.

<div class="alert alert-info">Si le fichier de configuration et l'interface utilisateur Datadog définissent des portes pour le même périmètre, la demande de tirage doit respecter chaque seuil défini.</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

Chaque porte a les champs suivants :

- `type` (obligatoire) : Le type de porte de couverture. Valeurs prises en charge :
  - `total_coverage_percentage` : Le pourcentage minimum de couverture globale pour le dépôt (ou pour les services ou propriétaires de code ciblés).
  - `patch_coverage_percentage` : Le pourcentage minimum de couverture sur le code modifié dans la demande de tirage.
- `config` (obligatoire) : Options de configuration de la gate. Valeurs prises en charge :
  - `threshold` (obligatoire) : Le pourcentage minimum de couverture (0-100).
  - `services` : (facultatif) Une liste de modèles de noms de services pour limiter la gate. Utilisez `*` comme caractère générique. Préfixez une valeur avec `!` pour exclure les services correspondants. Lorsqu'il est défini, la couverture est évaluée séparément pour chaque service correspondant.
  - `codeowners` : (facultatif) Une liste de modèles de propriétaires de code pour limiter la gate. Utilisez `*` comme caractère générique. Préfixez une valeur avec `!` pour exclure les propriétaires de code correspondants. Lorsqu'il est défini, la couverture est évaluée séparément pour chaque propriétaire de code correspondant.
  - `flags` : (facultatif) Une liste de modèles de noms de [flag][3] pour limiter la porte. Utilisez `*` comme caractère générique. Préfixez une valeur avec `!` pour exclure les drapeaux correspondants. Lorsqu'il est défini, la couverture est évaluée séparément pour chaque drapeau correspondant.

### Exemples

{{% collapse-content title="Portes de couverture totale et de patch sans périmètre" level="h4" %}}
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

{{% collapse-content title="Portes limitées aux services" level="h4" %}}
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

{{% collapse-content title="Portes limitées aux propriétaires de code" level="h4" %}}
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

{{% collapse-content title="Portes limitées aux flags" level="h4" %}}
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

{{% collapse-content title="Exclusion par négation" level="h4" %}}
Utilisez le préfixe `!` pour exclure des services, des propriétaires de code ou des flags spécifiques d'une porte. Par exemple, pour appliquer la couverture à tous les services sauf ceux expérimentaux, et à tous les flags sauf les tests nocturnes :
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

## Syntaxe des motifs

Les options de configuration qui acceptent des chemins de fichiers prennent en charge trois types de motifs :

- `regex`
- `glob`
- `path_prefix`

Le type de motif est automatiquement détecté en fonction de la syntaxe que vous utilisez.

### Motifs regex

Les motifs contenant des caractères spécifiques aux regex (`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`) sont traités comme des expressions régulières :

- `".*\\.pb\\.go$"` - Correspond aux fichiers se terminant par `.pb.go`
- `"^generated/.*"` - Correspond aux fichiers dans le répertoire généré
- `".*_test\\.go$"` - Correspond aux fichiers de test

**Note** : Les motifs regex sont automatiquement ancrés avec `^...$` pour une correspondance de chemin complet. Utilisez des barres obliques (`/`) comme séparateurs de chemin dans les motifs regex.

### Motifs glob

Les motifs contenant des caractères spécifiques aux glob (`*`, `?`, `[`, `]`) sont traités comme des motifs glob :

- `"**/*.java"` - Correspond à tous les fichiers Java
- `"src/test/**/*"` - Correspond à tous les fichiers sous src/test
- `"*.pb.go"` - Correspond aux fichiers protobuf dans n'importe quel répertoire

**Remarque** : Utilisez `**` pour correspondre aux répertoires de manière récursive. Le modèle `folder/*` ne correspond qu'aux enfants directs, tandis que `folder/**/*` correspond à tous les descendants.

### Motifs de préfixe

Les préfixes de chemin simples sans caractères spéciaux sont traités comme des correspondances de préfixe :

- `"vendor/"` - Correspond à tous les fichiers sous le répertoire vendor
- `"third_party/"` - Correspond au code tiers
- `"generated/"` - Correspond au code généré

## Lecture complémentaire

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /fr/code_coverage/flags