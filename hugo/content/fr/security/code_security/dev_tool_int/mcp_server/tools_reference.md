---
description: Référence détaillée de tous les outils disponibles dans Datadog Code
  Security MCP Server, incluant les paramètres, les binaires requis et les formats
  de sortie.
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: Documentation
  text: Vue d'ensemble et configuration de Datadog Code Security MCP Server.
- link: /security/code_security/dev_tool_int/mcp_server/troubleshooting/
  tag: Documentation
  text: Dépannage de Datadog Code Security MCP Server.
is_beta: true
title: Référence des outils
---
Le [Datadog Code Security MCP Server][1] expose les outils suivants pour les assistants de codage IA et l'utilisation en ligne de commande. Les outils d'analyse encapsulent un ou plusieurs binaires de sécurité Datadog et acceptent des chemins de fichiers ou des répertoires à analyser. `datadog_library_vulnerability_scan` interroge Datadog par URL de paquet et n'analyse pas une arborescence locale.

<div class="alert alert-info">Ce Datadog Code Security MCP Server est distinct du <a href="/mcp_server">Datadog MCP Server</a>, qui fournit un accès basé sur le cloud aux fonctionnalités et aux données Datadog. Datadog Code Security MCP Server s'exécute localement et se concentre sur l'analyse de sécurité au niveau du code. Pour interroger les résultats déjà stockés dans Datadog, consultez <a href="/security/code_security/dev_tool_int/mcp_server/#query-findings-already-in-datadog">Interroger les résultats déjà présents dans Datadog</a>.</div>

## `datadog_code_security_scan` {#datadog-code-security-scan}

Exécutez l'analyse SAST, la détection de secrets, l'analyse SCA et l'analyse IaC en parallèle.

`min_sast_severity` s'applique uniquement à la partie SAST de l'analyse. La valeur par défaut est `LOW`. Les résultats supprimés dans le code source sont exclus. Lorsque certains scanners ne sont pas installés, l'outil renvoie les résultats des scanners qui ont réussi et une erreur pour chaque scanner ayant échoué.

### Paramètres {#parameters}

| Paramètre            | Type            | Requis | Description                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Oui    | Chemins de fichiers ou répertoires à analyser                                                                    |
| `working_dir`        | `string`        |    Non    | Répertoire de base pour la résolution des chemins relatifs (par défaut, le répertoire actuel)                      |
| `min_sast_severity`  | `string`        |    Non    | Gravité SAST minimale à renvoyer : `LOW`, `MEDIUM`, `HIGH` ou `CRITICAL`. Par défaut : `LOW`. SAST uniquement. |

### Binaires requis {#required-binaries}

`datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-security-cli`, `datadog-iac-scanner`

## `datadog_sast_scan` {#datadog-sast-scan}

Exécutez Static Application Security Testing (SAST) pour détecter les vulnérabilités de sécurité dans le code propriétaire.

`min_sast_severity` Par défaut : `LOW`. Les résultats supprimés dans le code source sont exclus.

### Paramètres {#parameters-1}

| Paramètre            | Type            | Requis | Description                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Oui    | Chemins de fichiers ou répertoires à analyser                                                                    |
| `working_dir`        | `string`        |    Non    | Répertoire de base pour la résolution des chemins relatifs                                                          |
| `min_sast_severity`  | `string`        |    Non    | Gravité SAST minimale à renvoyer : `LOW`, `MEDIUM`, `HIGH` ou `CRITICAL`. Par défaut : `LOW`.             |

### Binaire requis {#required-binary}

`datadog-static-analyzer`

## `datadog_secrets_scan` {#datadog-secrets-scan}

Détectez les identifiants, clés d'API, mots de passe et jetons codés en dur dans le code source et les fichiers de configuration.

### Paramètres {#parameters-2}

| Paramètre     | Type            | Requis | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Oui    | Chemins de fichiers ou répertoires à analyser           |
| `working_dir` | `string`        |    Non    | Répertoire de base pour la résolution des chemins relatifs |

### Binaire requis {#required-binary-1}

`datadog-static-analyzer`

## `datadog_sca_scan` {#datadog-sca-scan}

Exécutez l'analyse SCA pour détecter les vulnérabilités connues (CVE) dans les dépendances de votre projet. Cet outil effectue un processus en deux étapes :

1. Génère une nomenclature logicielle (SBOM) à partir des répertoires spécifiés.
2. Analyse la SBOM à la recherche de vulnérabilités connues en utilisant la base de données de vulnérabilités de Datadog.

### Paramètres {#parameters-3}

| Paramètre     | Type            | Requis | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Oui    | Répertoires à analyser pour les dépendances        |
| `working_dir` | `string`        |    Non    | Répertoire de base pour la résolution des chemins relatifs |

### Sortie {#output}

Vulnérabilités avec identifiant CVE, gravité, composant affecté, version et description.

### Binaires requis {#required-binaries-1}

`datadog-sbom-generator`, `datadog-security-cli`

## `datadog_iac_scan` {#datadog-iac-scan}

Détectez les erreurs de configuration, les problèmes de conformité et les vulnérabilités de sécurité dans les fichiers IaC.

### Paramètres {#parameters-4}

| Paramètre     | Type            | Requis | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Oui    | Répertoires contenant les fichiers IaC à analyser    |
| `working_dir` | `string`        |    Non    | Répertoire de base pour la résolution des chemins relatifs |

### Sortie {#output-1}

Résultats de sécurité avec gravité, règle, emplacement du fichier et conseils de remédiation.

### Binaire requis {#required-binary-2}

`datadog-iac-scanner`

### Formats IaC pris en charge {#supported-iac-formats}

- Terraform
- CloudFormation
- Manifestes Kubernetes
- Dockerfiles
- GitHub Actions

## `datadog_generate_sbom` {#datadog-generate-sbom}

Générez une SBOM complète listant tous les composants logiciels, dépendances, versions et licences dans un dépôt.

### Paramètres {#parameters-5}

| Paramètre     | Type     | Requis | Description                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    Non    | Chemin vers le dépôt ou le répertoire à analyser (par défaut, le répertoire actuel) |
| `working_dir` | `string` |    Non    | Répertoire de base pour l'analyse (par défaut, le répertoire actuel)                |

### Sortie {#output-2}

JSON contenant un résumé (total des composants, répartition par langage/gestionnaire de paquets, statistiques de licence) et une liste détaillée des composants (nom, version, type, licence, URL du paquet).

### Gestionnaires de paquets pris en charge {#supported-package-managers}

| Langage   | Gestionnaires de paquets                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Go modules                                |
| Java       | Gradle, Maven                             |
| JavaScript | npm, pnpm, Yarn                            |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">Si le dépôt utilise un gestionnaire de paquets non listé ci-dessus, ou si l'outil renvoie zéro composant, l'assistant IA peut générer une SBOM en lisant les fichiers de verrouillage (<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>, et fichiers similaires) et en extrayant directement les dépendances.</div>

## `datadog_library_vulnerability_scan` {#datadog-library-vulnerability-scan}

Recherchez les vulnérabilités connues pour des bibliothèques spécifiques par URL de paquet (PURL). Cet outil appelle la Datadog API et n'analyse pas une base de code locale. Utilisez [`datadog_sca_scan`](#datadog_sca_scan) lorsque vous souhaitez analyser une arborescence de projet.

Nécessite `DD_API_KEY` et `DD_APP_KEY`.

### Paramètres {#parameters-6}

| Paramètre     | Type            | Requis | Description                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `libraries`   | `array[object]` |   Oui    | Bibliothèques à analyser. Chaque objet utilise les champs du tableau ci-dessous.         |
| `working_dir` | `string`        |    Non    | Répertoire de travail pour la détection du contexte Git (par défaut, le répertoire actuel) |

Chaque entrée dans `libraries` :

| Champ             | Type      | Requis | Description                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   Oui    | URL du paquet, par exemple `pkg:maven/com.cronutils/cron-utils@9.1.2` |
| `is_direct`       | `boolean` |    Non    | Indique s'il s'agit d'une dépendance directe                              |
| `is_dev`          | `boolean` |    Non    | Indique s'il s'agit d'une dépendance de développement uniquement                    |
| `package_manager` | `string`  |    Non    | Gestionnaire de paquets, par exemple `MAVEN`, `NPM` ou `GOLANG`         |

### Sortie {#output-3}

Vulnérabilités avec identifiant CVE, identifiant GHSA, gravité, score CVSS, bibliothèque affectée, remédiation, versions de correctif et disponibilité d'exploitation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/dev_tool_int/mcp_server/