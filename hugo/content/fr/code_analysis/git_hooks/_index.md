---
description: Empêcher la fusion de code contenant des erreurs
further_reading:
- link: /code_analysis/
  tag: Documentation
  text: En savoir plus sur Code Analysis
- link: /code_analysis/static_analysis/
  tag: Documentation
  text: En savoir plus sur Static Analysis
- link: /code_analysis/software_composition_analysis/
  tag: Documentation
  text: En savoir plus sur Software Composition Analysis
title: Hooks Git
---

## Présentation

Un [hook Git](https://git-scm.com/docs/githooks) est un programme exécuté avant qu'un utilisateur procède à un commit de code vers un référentiel ou à un push de code vers un emplacement distant. Un hook Git sert généralement à effectuer des vérifications et à faire respecter certaines exigences à propos du code avant son push vers une branche distante.

La solution Code Analysis de Datadog fournit un hook Git pour vérifier si l'analyse statique a détecté des violations ou des secrets avant le push ou le commit du code. Le hook Git de Code Analysis analyse le code du dernier commit et de la dernière branche, et affiche les erreurs détectées.

Le hook Git Datadog avertit les développeurs avant qu'ils ne push du code contenant des erreurs de codage, des vulnérabilités ou des secrets. Lorsqu'un commit contient une erreur, un message similaire à ce qui suit s'affiche dans le terminal de l'utilisateur :

{{< img src="code_analysis/git_hooks/git_hook.png" alt="Hook Git Datadog détectant des vulnérabilités" style="width:100%;">}}

## Configuration

1. Téléchargez le programme `datadog-git-hook` à partir de la page des versions ou des [versions du Static Analyzer
de Datadog](https://github.com/DataDog/datadog-static-analyzer/releases).
2. Installez le programme sur votre ordinateur.
3. Ajoutez un fichier `.git/hooks/pre-push` dans le référentiel comprenant le script ci-dessous. **Remarque :** le script suppose que le binaire `datadog-static-analyzer-git-hook` se trouve dans `/usr/local/bin/datadog-static-analyzer-git-hook`.

```bash
#!/bin/sh

# Obtenir le chemin racine du référentiel
repo_path=$(git rev-parse --show-toplevel)

# Vérifier que l'utilisateur peut fournir des données
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --static-analysis --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

Le programme accepte les paramètres suivants :

 - `--confirmation` : demande.à l'utilisateur de confirmer avant d'ignorer le check du hook Git.
 - `--default-branch` : spécifie le nom de la branche par défaut.
 - `--static-analysis` ; active l'analyse statique.
 - `--secrets` : active la détection des secrets (bêta privée).
 - `--output <file>` : exporte les résultats du commit dans un fichier SARIF. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}