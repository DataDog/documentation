---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Configurez les règles de Datadog Secret Scanning et les fichiers analysés.
title: Configuration
---
Par défaut, Datadog Secret Scanning analyse les dépôts activés avec toutes les [règles de la catégorie Secrets & Credentials du Sensitive Data Scanner][1]. Vous pouvez personnaliser les règles exécutées, modifier les règles par défaut et créer des règles personnalisées sur la [{{< ui >}}Code{{< /ui >}} page de configuration][2] dans SDS.

Les règles, les groupes d'analyse et les règles personnalisées décrits sur cette page sont configurés dans Datadog. Un fichier de configuration dans votre dépôt ajoute un contrôle distinct sur les fichiers analysés. Voir [Configuration des fichiers](#file-configuration).
## Groupes d'analyse {#scanning-groups}
Il existe deux groupes d'analyse qui configurent les règles de Secret Scanning.
### Groupe d'analyse géré {#managed-scanning-group}
Le groupe d'analyse géré est géré par l'équipe de sécurité de Datadog. Il reçoit automatiquement de nouvelles règles et des mises à jour de règles, et est activé par défaut pour toutes les organisations.

{{< img src="/code_security/secret_scanning/managed_scanning_group_not_customized.png" alt="Groupe d'analyse géré" style="width:100%;">}}

### Groupe d'analyse de règles personnalisées{#custom-rule-scanning-group}
Le groupe d'analyse personnalisé est géré par les organisations des utilisateurs. Vous pouvez [créer et tester des règles regex personnalisées][3] ou ajouter des règles depuis la bibliothèque de règles SDS.

{{< img src="/code_security/secret_scanning/custom_scanning_group.png" alt="Groupe d'analyse personnalisé" style="width:100%;">}}

## Configuration des règles{#configuring-rules}
### Personnalisation des règles par défaut{#customizing-default-rules}
Pour personnaliser la gravité et les mots-clés d'une règle par défaut gérée, survolez la règle et cliquez sur l'icône en forme de crayon sur la droite.
{{< img src="/code_security/secret_scanning/customize_default_rule.png" alt="Modifier la règle" style="width:100%;">}}

La boîte de dialogue de modification s'ouvre.
{{< img src="/code_security/secret_scanning/configure_default_rule.png" alt="Fenêtre contextuelle de modification de règle" style="width:100%;">}}

Après avoir modifié la règle et cliqué sur {{< ui >}}Update{{< /ui >}} en bas à droite, la règle modifiée apparaît sous la forme {{< ui >}}Customized{{< /ui >}} dans le groupe d'analyse géré.

{{< img src="/code_security/secret_scanning/disable_rule.png" alt="Règle Secret Scanning personnalisée dans le groupe géré" style="width:100%;">}}

<div class="alert alert-info">Les règles personnalisées ne reçoivent pas automatiquement les mises à jour de gravité/mots-clés par défaut de l'équipe de sécurité de Datadog. Pour restaurer une règle à son état géré, survolez une règle personnalisée et cliquez sur l'icône de restauration à droite. </div>

### Création de règles personnalisées{#creating-custom-rules}
Pour créer une règle personnalisée, accédez au groupe d'analyse personnalisé et cliquez sur {{< ui >}}Add scanning rule{{< /ui >}} en bas ou sur {{< ui >}}Add rule{{< /ui >}} en haut à droite. Créez votre règle regex, puis configurez la gravité et les mots-clés. Une fois activés, vos dépôts sont analysés avec les nouvelles règles lors du prochain commit.

{{< img src="/code_security/secret_scanning/add_to_custom.png" alt="Ajouter une règle au groupe personnalisé" style="width:100%;">}}

Pour mettre à jour une règle personnalisée, survolez la règle et cliquez sur l'icône en forme de crayon à droite.

### Désactivation des règles{#disabling-rules}
Désactivez une règle en cliquant sur le bouton bascule bleu à droite.

<div class="alert alert-info">Une fois qu'une règle spécifique est désactivée, les résultats existants issus de cette règle sont automatiquement fermés dans Secret Scanning lors du prochain commit.</div>

## Configuration des fichiers :{#file-configuration}

Les règles sont configurées dans Datadog comme décrit dans la section [Configuration des règles](#configuring-rules). Les fichiers lus par Secret Scanning sont configurés sous la clé `secrets` dans la configuration de Code Security. Définissez-la dans Datadog, ou dans un fichier `code-security.datadog.yaml` à la racine de votre dépôt.

Pour plus d'informations sur les emplacements de configuration, la priorité et la fusion, consultez [Code Security Configuration Reference][4].

La configuration doit commencer par `schema-version: v1.5`, suivie d'une clé `secrets` contenant un objet `global-config`. L'objet `global-config` contrôle les paramètres à l'échelle du dépôt:

| **Propriété** | **Type** | **Description** | **Par défaut** |
| --- | --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. Seuls les fichiers correspondants sont analysés. | Aucun |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure. Les fichiers correspondants ne sont pas analysés. | Aucun |
| `use-gitignore` | Booléen | Indique s'il faut inclure les entrées du fichier `.gitignore` dans `ignore-paths`. | `true` |
| `ignore-generated-files` | Booléen | Indique s'il faut inclure les modèles de fichiers générés courants dans `ignore-paths`. | `true` |
| `max-file-size-kb` | Nombre | Taille maximale de fichier (en ko) à analyser. Les fichiers plus volumineux sont ignorés. | `10240` |

### Exemple de configuration {#example-configuration}

{{< code-block lang="yaml" >}}
schema-version: v1.5
secrets:
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "src"
      - "**/*.py"
    # Do not analyze the following paths/files
    ignore-paths:
      - "tests"
      - "**/*.lock"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 10240
{{< /code-block >}}

[1]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/code
[3]: /fr/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /fr/security/code_security/guides/configuration/