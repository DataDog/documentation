---
description: Apprenez à résoudre les problèmes courants liés à Code Analysis et à
  contacter l'assistance.
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
title: Dépannage de Code Analysis
---

## Présentation

Si vous rencontrez des problèmes lors de la configuration ou de l'utilisation de Code Analysis de Datadog, utilisez cette page pour commencer le dépannage. Si le problème persiste, [contactez l'assistance Datadog][1].

## Analyse statique

Pour les problèmes liés au Datadog Static Analyzer, incluez les éléments suivants dans votre rapport de bug à l'assistance ainsi qu'à votre Customer Success Manager.

- Votre fichier `static-analysis.datadog.yml` 
- La sortie de votre outil d'analyse statique (comme une CLI), exécuté localement ou dans un pipeline CI/CD
- Le fichier SARIF généré (le cas échéant)
- L'URL de votre référentiel (public ou privé)
- Le nom de la branche sur laquelle l'analyse a été exécutée
- La ligne de commande exacte utilisée pour exécuter le Datadog Static Analyzer

### Problèmes de performance

Si vous rencontrez des problèmes de performances, vous pouvez activer le paramètre `--performance-statistics` lors de l'exécution de l'outil en ligne de commande.

Pour les problèmes de performance, ajoutez les informations suivantes :

- Votre fichier `static-analysis.datadog.yml` 
- La sortie de votre outil d'analyse statique (comme une CLI), exécuté localement ou dans un pipeline CI/CD
- L'URL de votre référentiel (public ou privé)

**Remarque :** si vous utilisez [Static Analysis avec GitHub Actions][2], définissez le paramètre [`enable_performance_statistics`][3] sur true.

### Problèmes bloquants

Si vous rencontrez des problèmes autres que de performance, ou si le Datadog Static Analyzer ne se termine pas correctement, exécutez-le avec les options `--debug true --performance-statistics`.

### Erreur 403 lors de l'exécution de l'analyseur

Assurez-vous que les variables `DD_APP_KEY`, `DD_API_KEY` et `DD_SITE` sont correctement définies lors de l'exécution de l'analyseur et de `datadog-ci`.

### Problèmes de téléversement SARIF

<div class="alert alert-info">
  L'importation au format SARIF a été testée pour Snyk, CodeQL, Semgrep, Checkov, Gitleaks et Sysdig. Veuillez contacter l'<a href="/help">assistance Datadog</a> si vous rencontrez des problèmes avec des outils compatibles avec le format SARIF.
</div>

Lorsque vous téléversez des résultats provenant d'outils tiers d'analyse statique dans Datadog, assurez-vous qu'ils sont au format [SARIF (Static Analysis Results Interchange Format)][5]. Node.js version 14 ou ultérieure est requis.

Pour téléverser un rapport SARIF, suivez les étapes ci-dessous :

1. Vérifiez que les [variables `DD_API_KEY` et `DD_APP_KEY` sont définies][4].
2. Définissez éventuellement une variable [`DD_SITE`][7] (par défaut `datadoghq.com`).
3. Installez l'utilitaire `datadog-ci` :

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Exécutez l'outil d'analyse statique tiers sur votre code et générez les résultats au format SARIF.
5. Importez les résultats dans Datadog :

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

### Message d'erreur `GLIBC_X.YY not found`

Si vous exécutez l'analyseur statique dans votre pipeline CI et que vous obtenez un message d'erreur de ce type :

```
version `GLIBC_X.YY' not found
```

Cela signifie que vous :

- exécutez votre pipeline CI sur une distribution Linux utilisant une ancienne version de glibc. Dans ce cas, Datadog recommande de passer à la dernière version. L'analyseur fonctionne toujours avec les dernières versions des systèmes basés sur Ubuntu/Debian.
- exécutez votre pipeline CI sur une distribution Linux qui ne repose pas sur glibc (comme Alpine Linux). Dans ce cas,
  utilisez plutôt une distribution compatible avec la version récente de glibc, comme la version stable d'Ubuntu.

### Les résultats ne s'affichent pas dans l'interface Datadog

**Si vous exécutez Code Analysis sur un référentiel non GitHub**, assurez-vous que la première analyse est lancée sur votre branche par défaut (par exemple
`master`, `main`, `prod` ou `production`). Une fois un commit effectué sur la branche par défaut, les autres branches sont analysées. Vous pouvez configurer la branche par défaut dans l'application, dans les [paramètres du référentiel][4].

Si vous utilisez l'analyseur Datadog, la [détection de changements][6] est activée par défaut. Si vous exécutez l'outil dans votre pipeline CI, vérifiez que `datadog-ci` est lancé **à la racine** du référentiel analysé.


## Software Composition Analysis

Pour les problèmes liés à Software Composition Analysis, incluez les éléments suivants dans votre rapport de bug à l'assistance ainsi qu'à votre Customer Success Manager.

- La sortie de votre outil SCA (comme une CLI), exécuté localement ou dans un pipeline CI/CD
- Le fichier SBOM généré (le cas échéant)
- L'URL de votre référentiel (public ou privé)
- Le nom de la branche sur laquelle l'analyse a été exécutée
- La liste des fichiers de dépendances présents dans votre référentiel (par exemple `package-lock.json`, `requirements.txt` ou `pom.xml`)

### Problèmes lors du téléversement d'un SBOM
Bien que [le générateur SBOM de Datadog][7] soit recommandé, Datadog prend en charge l'ingestion de tout fichier SBOM. Assurez-vous que vos fichiers respectent les formats Cyclone-DX 1.4 ou 1.5.

L'ingestion des fichiers SBOM a été vérifiée avec les outils tiers suivants :
- [osv-scanner][7]
- [trivy][8]

Pour ingérer un fichier SBOM dans Datadog :

1. Installez la CLI `datadog-ci` (nécessite Node.js).
2. Assurez-vous que les variables d'environnement `DD_SITE`, `DD_API_KEY` et `DD_APP_KEY` sont définies.
3. Utilisez l'outil pour téléverser le fichier vers Datadog.
L'installation et l'exécution de l'outil se font avec ces deux commandes :
```bash
# Installer datadog-ci
npm install -g @datadog/datadog-ci

# Téléverser un fichier SBOM
datadog-ci sbom upload /path/to/sbom-file.json
```

### Les résultats ne s'affichent pas dans l'interface Datadog

**Si vous exécutez Code Analysis sur un référentiel non GitHub**, assurez-vous que la première analyse est lancée sur votre branche par défaut (par exemple 
`master`, `main`, `prod` ou `production`). Une fois un commit effectué sur la branche par défaut, les autres branches sont analysées.

Vous pouvez configurer la branche par défaut dans l'application, dans les [paramètres du référentiel][4].

### Aucun paquet détecté pour les projets C#

Le générateur SBOM ([`osv-scanner`][7]) extrait les dépendances à partir d'un fichier `packages.lock.json`. Si ce fichier
est absent, vous pouvez mettre à jour la définition de votre projet pour qu'il soit généré. Suivez [ces instructions][9] pour générer un fichier `packages.lock.json`.

Le fichier lock généré est utilisé par [`osv-scanner`][7] pour extraire les dépendances et générer un SBOM.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/code_analysis/static_analysis/github_actions
[3]: /fr/code_analysis/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/fr/code_analysis/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file