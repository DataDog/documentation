---
description: Documentation de référence pour Datadog Software Composition Analysis
  (SCA) de Datadog, incluant l'exclusion de chemins, d'écosystèmes et de paquets.
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: Documentation
  text: Référence de la configuration de Code Security
title: Configuration de Software Composition Analysis (SCA)
---
Datadog Software Composition Analysis (SCA) de Datadog détecte les bibliothèques open source et leurs vulnérabilités dans votre code. Vous pouvez exclure des chemins, des écosystèmes ou des paquets spécifiques de l'analyse SCA statique. Configurez ces paramètres sous la clé `sca` dans la configuration de Code Security, soit dans Datadog, soit dans un fichier `code-security.datadog.yaml`.

La clé `sca` a été introduite dans `schema-version: v1.1` et prend en charge les champs suivants. Chaque champ a son propre `schema-version` minimum, utilisez donc la version la plus élevée requise par les champs que vous configurez :

| **Propriété** | **Type** | **Description** | **Par défaut** | **Minimum `schema-version`** |
| --- | --- | --- | --- | --- |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure de l'analyse SCA statique. | Aucun | `v1.1` |
| `ignore-ecosystems` | Tableau | Écosystèmes, tels que `npm`, `Go`, `PyPI`, à exclure de l'analyse SCA statique. | Aucun | `v1.7` |
| `ignore-packages` | Tableau | Paquets à exclure de l'analyse SCA statique, indépendamment de la version. Chaque entrée utilise le format `<ecosystem>:<name>`, tel que `npm:lodash`. | Aucun | `v1.7` |

Exemple :

{{< code-block lang="yaml" >}}
schema-version: v1.7
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
  ignore-ecosystems:
    - "npm"
  ignore-packages:
    - "Go:golang.org/x/text"
{{< /code-block >}}

<div class="alert alert-warning">Les noms d'écosystèmes et de paquets dans <code>ignore-ecosystems</code> et <code>ignore-packages</code> sont comparés en tenant compte de la casse. Par exemple, <code>go:golang.org/x/text</code> ne correspond pas au <code>Go</code> écosystème, et <code>npm:Lodash</code> ne correspond pas au <code>lodash</code> paquet.</div>

Si vous exécutez le scanner SCA directement depuis l'interface de ligne de commande, les indicateurs `--exclude`, `--exclude-ecosystem` et `--exclude-package` équivalents sont combinés avec les exclusions configurées ci-dessus.

Pour plus d'informations sur les emplacements de configuration, la priorité et la fusion, consultez la [Référence de configuration de Code Security][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/guides/configuration/