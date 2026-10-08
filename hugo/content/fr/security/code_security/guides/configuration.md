---
description: Référence pour la configuration de Datadog Code Security, incluant le
  schéma, les emplacements de configuration et l'ordre de priorité.
disable_toc: false
further_reading:
- link: /security/code_security/static_analysis/configuration/
  tag: Documentation
  text: Configuration de l'analyse de code statique (SAST)
- link: /security/code_security/software_composition_analysis/configuration/
  tag: Documentation
  text: Configuration de Software Composition Analysis (SCA)
- link: /security/code_security/iac_security/configuration/
  tag: Documentation
  text: Configuration de la sécurité de l'infrastructure en tant que code (IaC)
- link: /security/code_security/secret_scanning/configuration/
  tag: Documentation
  text: Configuration de Secret Scanning
title: Référence de la configuration de Code Security
---
Datadog Code Security peut être configuré dans Datadog, dans un fichier à la racine de votre dépôt, ou aux deux emplacements.

## Schéma de configuration {#configuration-schema}

Le fichier de configuration doit commencer par une clé `schema-version`, suivie des clés de premier niveau pour chaque produit que vous souhaitez configurer. Utilisez la version du schéma qui correspond aux produits que vous souhaitez configurer :

| Version du schéma | Produits pris en charge |
|---|---|
| `v1.0` | SAST |
| `v1.1` | SAST, SCA |
| `v1.2` | SAST, SCA, IaC Security |
| `v1.3` | SAST, SCA, IaC Security |
| `v1.4` | SAST, SCA, IaC Security |
| `v1.5` | SAST, SCA, IaC Security, Secret Scanning |

Utilisez `schema-version: v1.5` pour toutes les nouvelles configurations. Il prend en charge les mêmes produits que `v1.4` et ajoute Secret Scanning. La version `v1.4` a ajouté `arguments` par règle pour les règles IaC, et `v1.3` a ajouté des options de configuration IaC telles que la définition de périmètre par chemin de règle, les remplacements de sévérité par règle et les filtres de plateforme. Consultez [Infrastructure as Code (IaC) Security Configuration][3] pour les champs spécifiques à IaC et [Secret Scanning Configuration][4] pour les champs spécifiques aux secrets.

L'exemple suivant montre la structure de haut niveau :

```yaml
schema-version: v1.5
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
iac:
  # Infrastructure as Code (IaC) Security configuration
secrets:
  # Secret Scanning configuration
```

Les sections `sast`, `sca`, `iac` et `secrets` sont facultatives. Tout emplacement de configuration, y compris le niveau de l'organisation, le niveau du dépôt ou le fichier du dépôt, peut inclure une ou plusieurs sections. La section `sast` contrôle également les ensembles de règles SAST natifs de l'IA pour les analyses hébergées par Datadog. La section `secrets` contrôle quels fichiers sont analysés pour les secrets ; les règles elles-mêmes sont configurées dans Datadog. Pour le schéma complet de chaque section, consultez [Configuration de l'analyse de code statique (SAST)][1], [Configuration de Software Composition Analysis (SCA)][2], [Configuration de la sécurité de l'infrastructure en tant que code (IaC)][3] et [Secret Scanning Configuration][4]. La page SAST répertorie également les noms des ensembles de règles SAST natifs de l'IA.

## Où définir les configurations {#where-to-define-configurations}

Il existe trois niveaux de configuration :

* Configuration au niveau de l'organisation (Datadog)
* Configuration au niveau du dépôt (Datadog)
* Configuration au niveau du dépôt (fichier du dépôt)

Ces trois emplacements utilisent le même schéma YAML et sont fusionnés dans l'ordre (voir [Comment les configurations fusionnent](#how-configurations-merge)).

### Configuration au niveau de l'organisation {#org-level-configuration}

{{< img src="/security/code_security/org-level-configuration.png" alt="L'éditeur de configuration au niveau de l'organisation de Datadog Code Security." style="width:100%;" >}}

Les configurations au niveau de l'organisation s'appliquent à tous les dépôts de votre organisation. Utilisez les configurations au niveau de l'organisation pour définir des règles à l'échelle de l'organisation et spécifier les chemins ou fichiers globaux à ignorer.

### Configuration au niveau du dépôt {#repository-level-configuration}

{{< img src="/security/code_security/repo-level-configuration.png" alt="L'éditeur de configuration au niveau du dépôt de Datadog Code Security." style="width:100%;" >}}

Les configurations au niveau du dépôt s'appliquent uniquement au dépôt sélectionné et prévalent sur les configurations au niveau de l'organisation. Ils sont fusionnés avec la configuration de l'organisation, les paramètres du dépôt remplaçant les valeurs par défaut de l'organisation. Utilisez les configurations au niveau du dépôt pour définir des remplacements spécifiques au dépôt ou ajouter des règles qui ne s'appliquent qu'à ce dépôt.

### Configuration au niveau du dépôt (fichier) {#repository-level-configuration-file}

Le fichier `code-security.datadog.yaml` stocke la configuration à la racine d'un dépôt. Il prévaut sur les configurations au niveau de l'organisation et au niveau du dépôt définies dans Datadog.

## Comment les configurations fusionnent {#how-configurations-merge}

Les configurations sont fusionnées dans l'ordre suivant, de la priorité la plus basse à la plus élevée :

1. **Au niveau de l'organisation**
1. **Au niveau du dépôt**
1. **Fichier au niveau du dépôt** (`code-security.datadog.yaml`)

Pour chaque champ d'une configuration, le comportement de fusion dépend du type de champ :

| Type de champ | Comportement de fusion | Exemples de champs |
|---|---|---|
| Listes | Concaténées, avec suppression des doublons | `use-rulesets`, `ignore-rulesets`, `ignore-rules`, `ignore-paths`, `only-paths`, `ignore-platforms`, `only-platforms` |
| Valeurs scalaires (chaînes, nombres, booléens) | La valeur issue de la configuration ayant la priorité la plus élevée est utilisée | `use-default-rulesets`, `use-gitignore`, `max-file-size-kb`, `category` |
| Maps | Fusionnées de manière récursive | `ruleset-configs`, `rule-configs`, `arguments` |

Pour obtenir la liste complète des champs, consultez [Configuration de l'analyse de code statique (SAST)][1], [Configuration de Software Composition Analysis (SCA)][2] et [Configuration de la sécurité de l'infrastructure en tant que code (IaC)][3].

L'exemple suivant montre comment les configurations sont fusionnées :

#### Niveau organisation {#org-level}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
sca:
  ignore-paths:
    - "vendor/"
iac:
  ignore-rules:
    - A
  global-config:
    ignore-paths:
      - "examples/"
```

#### Au niveau du dépôt {#repo-level}

```yaml
schema-version: v1.4
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "third_party/"
iac:
  ignore-rules:
    - B
  global-config:
    ignore-paths:
      - "generated/"
```

#### Résultat fusionné {#merged-result}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "vendor/"
    - "third_party/"
iac:
  ignore-rules:
    - A
    - B
  global-config:
    ignore-paths:
      - "examples/"
      - "generated/"
```

L'exemple illustre chaque règle de fusion du tableau ci-dessus :

- **Les listes sont concaténées** : `use-rulesets` fusionne avec `[A, B]` ; le SCA `ignore-paths` fusionne avec `["vendor/", "third_party/"]` ; l'IaC `ignore-rules` fusionne avec `[A, B]`.
- **Les scalaires utilisent la valeur de priorité la plus élevée** : `maxCount: 22` (niveau dépôt) remplace `maxCount: 10` (niveau organisation).
- **Les cartes fusionnent de manière récursive** : La règle `foo` de configuration conserve `ignore-paths` du niveau de l'organisation tout en appliquant `maxCount: 22` du niveau dépôt. De nouvelles entrées comme `bar` sont ajoutées au niveau du dépôt.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/static_analysis/configuration/
[2]: /fr/security/code_security/software_composition_analysis/configuration/
[3]: /fr/security/code_security/iac_security/configuration/
[4]: /fr/security/code_security/secret_scanning/configuration/