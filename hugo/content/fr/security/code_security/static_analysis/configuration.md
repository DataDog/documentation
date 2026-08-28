---
description: Documentation de référence pour la configuration de Datadog Static Code
  Analysis (SAST), couvrant la sélection d'ensembles de règles, la personnalisation
  des règles, les gravités et les chemins.
title: Configuration de l'analyse de code statique (SAST)
---
Par défaut, l'analyse de code statique (SAST) de Datadog analyse vos dépôts avec les [ensembles de règles par défaut de Datadog][6] pour chaque langage de programmation. Vous pouvez personnaliser les ensembles de règles et les règles qui sont exécutés, ainsi que les niveaux de gravité, les chemins et d'autres paramètres. Configurez ces paramètres sous la clé `sast` dans la configuration Code Security, soit dans Datadog, soit dans un fichier `code-security.datadog.yaml`.

Pour plus d'informations sur les emplacements de configuration, la priorité et la fusion, consultez la [Référence de configuration de Code Security][26].

## Ensembles de règles par défaut {#default-rulesets}

Par défaut, Datadog active les ensembles de règles par défaut pour les langages de programmation de votre dépôt (`use-default-rulesets: true`). Pour modifier les ensembles de règles activés :

- **Ajouter des ensembles de règles** : Listez-les sous `use-rulesets`
- **Désactiver des ensembles de règles spécifiques** : Listez-les sous `ignore-rulesets`
- **Désactiver tous les ensembles de règles par défaut** : Définissez `use-default-rulesets: false`, puis listez les ensembles de règles souhaités sous `use-rulesets`

Pour obtenir la liste complète des ensembles de règles par défaut, consultez [Règles d'analyse de code statique (SAST)][6].

## Configurer le SAST natif pour l'IA {#configure-ai-native-sast}

Le SAST natif par IA utilise la même configuration `sast` que les autres règles d'analyse de code statique et n'est disponible que pour les analyses hébergées par Datadog. La configuration `sast` contrôle quels ensembles de règles SAST natifs pour l'IA sont exécutés ; elle n'active pas l'analyse hébergée par Datadog et ne donne pas accès au SAST natif pour l'IA.

Lorsque le SAST natif pour l'IA est activé, ses ensembles de règles par défaut sont exécutés pour les langages pris en charge détectés dans le dépôt. Les noms des ensembles de règles SAST natifs pour l'IA utilisent le format `<language>-ai_sast` :

| Langage | Ensemble de règles |
| --- | --- |
| C# | `csharp-ai_sast` |
| Dart | `dart-ai_sast` |
| Elixir | `elixir-ai_sast` |
| Go | `go-ai_sast` |
| Java | `java-ai_sast` |
| JavaScript | `javascript-ai_sast` |
| Kotlin | `kotlin-ai_sast` |
| PHP | `php-ai_sast` |
| Python | `python-ai_sast` |
| Ruby | `ruby-ai_sast` |
| Rust | `rust-ai_sast` |
| Swift | `swift-ai_sast` |
| TypeScript | `typescript-ai_sast` |

Le paramètre `use-default-rulesets` s'applique aux ensembles de règles SAST traditionnels et SAST natifs pour l'IA. Si vous définissez `use-default-rulesets: false`, incluez tous les ensembles de règles SAST traditionnels et natifs pour l'IA que vous souhaitez exécuter. Par exemple, la configuration suivante exécute les ensembles de règles de sécurité Ruby et SAST natifs pour l'IA :

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - ruby-security
    - ruby-ai_sast
{{< /code-block >}}

Pour désactiver un ensemble de règles SAST natif pour l'IA spécifique tout en conservant les autres ensembles de règles par défaut, ajoutez-le à `ignore-rulesets` :

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  ignore-rulesets:
    - ruby-ai_sast
{{< /code-block >}}

## Format de configuration {#configuration-format}

Le format de configuration suivant s'applique à tous les emplacements de configuration : au niveau de l'organisation, au niveau du dépôt et au niveau du dépôt (fichier).

Le fichier de configuration doit commencer par un `schema-version` pris en charge (`v1.0`, `v1.1`, `v1.2`, `v1.3` ou `v1.4`), suivi d'une clé `sast` contenant la configuration de l'analyse. Utilisez `v1.4` pour toutes les nouvelles configurations. La configuration est structurée comme indiqué ci-dessous :

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
{{< /code-block >}}

La clé `sast` prend en charge les champs suivants :

| **Propriété** | **Type** | **Description** | **Par défaut** |
| --- | --- | --- | --- |
| `use-default-rulesets` | Booléen | Indique s'il faut activer les ensembles de règles par défaut de Datadog. | `true` |
| `use-rulesets` | Tableau | Une liste de noms d'ensembles de règles à activer. | Aucun |
| `ignore-rulesets` | Tableau | Une liste de noms d'ensembles de règles à désactiver. Prévaut sur `use-rulesets` et `use-default-rulesets`. | Aucun |
| `ruleset-configs` | Objet | Une correspondance du nom d'un ensemble de règles à sa configuration. | Aucun |
| `global-config` | Objet | Paramètres globaux pour le dépôt. | Aucun |

## Configuration de l'ensemble de règles {#ruleset-configuration}

Chaque entrée dans le mappage `ruleset-configs` configure un ensemble de règles spécifique. Un ensemble de règles n'a pas besoin d'être répertorié dans `use-rulesets` pour que sa configuration s'applique ; la configuration est utilisée chaque fois que l'ensemble de règles est activé, y compris via `use-default-rulesets`.

| **Propriété** | **Type** | **Description** | **Par défaut** |
| --- | --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. Seuls les fichiers correspondant à ces modèles sont traités pour cet ensemble de règles. | Aucun |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure de l'analyse pour cet ensemble de règles. | Aucun |
| `rule-configs` | Objet | Une correspondance du nom de la règle à sa configuration. | Aucun |

## Configuration de la règle {#rule-configuration}

Chaque entrée dans la carte `rule-configs` d'un ensemble de règles configure une règle spécifique :

| **Propriété** | **Type** | **Description** | **Par défaut** |
| --- | --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. La règle est appliquée uniquement aux fichiers correspondant à ces modèles. | Aucun |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure. La règle n'est pas appliquée aux fichiers correspondant à ces modèles. | Aucun |
| `arguments` | Objet | Paramètres et valeurs pour la règle. Les valeurs peuvent être scalaires ou définies par chemin. | Aucun |
| `severity` | Chaîne ou Objet | La sévérité de la règle. Valeurs valides : `ERROR`, `WARNING`, `NOTICE`, `NONE`. Peut être une valeur unique ou définie par chemin. | Aucun |
| `category` | Chaîne | La catégorie de la règle. Valeurs valides : `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, `SECURITY`. | Aucun |

## Configuration des arguments et de la sévérité {#argument-and-severity-configuration}

Les arguments et la sévérité peuvent être définis selon l'un des deux formats suivants :

1. **Valeur unique :** S'applique à l'ensemble du dépôt.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name: value
   severity: ERROR
   {{< /code-block >}}

2. **Mappage par chemin:** Valeurs différentes pour différents sous-arbres. Le préfixe de chemin correspondant le plus long s'applique. Utilisez `/` comme valeur par défaut globale.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   {{< /code-block >}}

   | **Clé** | **Type** | **Description** | **Par défaut** |
   | --- | --- | --- | --- |
   | `/` | Tout | La valeur par défaut lorsqu'aucun chemin spécifique ne correspond. | Aucun |
   | `specific path` | Tout | La valeur pour les fichiers correspondant au chemin ou au motif glob spécifié. | Aucun |

Le champ `category` accepte une seule valeur de chaîne pour l'ensemble du dépôt.

## Configuration globale {#global-configuration}

L'objet `global-config` contrôle les paramètres à l'échelle du dépôt:

| **Propriété** | **Type** | **Description** | **Par défaut** |
| --- | --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. Seuls les fichiers correspondants sont analysés. | Aucun |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure. Les fichiers correspondants ne sont pas analysés. | Aucun |
| `use-gitignore` | Booléen | Indique s'il faut inclure les entrées du fichier `.gitignore` dans `ignore-paths`. | `true` |
| `ignore-generated-files` | Booléen | Indique s'il faut inclure les modèles de fichiers générés courants dans `ignore-paths`. | `true` |
| `max-file-size-kb` | Nombre | Taille maximale de fichier (en ko) à analyser. Les fichiers plus volumineux sont ignorés. | `200` |

Exemple de configuration :

Comme cet exemple désactive les ensembles de règles par défaut, il inclut explicitement `python-ai_sast` pour conserver l'analyse SAST native par IA pour Python :

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - python-ai_sast
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
{{< /code-block >}}

## Configuration héritée {#legacy-configuration}

L'analyse de code statique (SAST) de Datadog utilisait précédemment un fichier de configuration (`static-analysis.datadog.yml`) et un schéma différents. Ce schéma est obsolète et ne reçoit plus de nouvelles mises à jour, mais il est [documenté][25] dans le dépôt `datadog-static-analyzer`.

Si les deux fichiers sont présents, `code-security.datadog.yaml` prévaut sur `static-analysis.datadog.yml`.

### Ignorer les violations {#ignoring-violations}

#### Ignorer pour un dépôt {#ignore-for-a-repository}

Ajoutez une configuration de règle dans votre fichier `code-security.datadog.yaml`. L'exemple suivant ignore la règle `javascript-express/reduce-server-fingerprinting` pour tous les répertoires.

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
{{< /code-block >}}

#### Ignorer pour un fichier ou un répertoire {#ignore-for-a-file-or-directory}

Ajoutez une configuration de règle dans votre fichier `code-security.datadog.yaml`. L'exemple suivant ignore la règle `javascript-express/reduce-server-fingerprinting` pour un fichier spécifique. Pour plus d'informations sur la façon d'ignorer par chemin, consultez [Personnalisez votre configuration](#customize-your-configuration).

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
{{< /code-block >}}

#### Ignorer pour une instance spécifique {#ignore-for-a-specific-instance}

Pour ignorer une instance spécifique d'une violation, commentez `no-dd-sa` au-dessus de la ligne de code. Les violations supprimées avec `no-dd-sa` sont affichées comme **supprimées**, plutôt qu'omises entièrement, afin que vous puissiez les rechercher et les auditer.

Sur la [page Dépôts][1], les violations supprimées apparaissent avec `is_suppressed: true`. Dans le [Vulnerabilities explorer][2], elles apparaissent avec `status: muted` et `workflow.mute.reason: muted_in_code`.

Par exemple, dans l'extrait de code Python suivant, la ligne `foo = 1` serait supprimée lors des analyses de code statique.

{{< code-block lang="python" >}}
#no-dd-sa
foo = 1
bar = 2
{{< /code-block >}}

Vous pouvez également utiliser `no-dd-sa` pour supprimer uniquement une règle particulière, plutôt que de supprimer toutes les règles. Pour ce faire, spécifiez le nom de la règle que vous souhaitez désactiver à la place de `<rule-name>` en utilisant ce modèle :

`no-dd-sa:<rule-name>`

Par exemple, dans l'extrait de code JavaScript suivant, la ligne `my_foo = 1` est supprimée uniquement pour la règle `javascript-code-style/assignment-name`, mais toutes les autres règles l'analysent toujours.

{{< code-block lang="javascript" >}}
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
{{< /code-block >}}

[1]: https://app.datadoghq.com/security/code-security/repositories
[2]: https://app.datadoghq.com/security/code-security/sca
[6]: /fr/security/code_security/static_analysis/static_analysis_rules
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[26]: /fr/security/code_security/guides/configuration/