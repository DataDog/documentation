---
aliases:
- /fr/code_analysis/troubleshooting/
disable_toc: false
title: Dépannage
---
Si vous rencontrez des problèmes lors de l'installation ou de la configuration de Datadog Code Security, utilisez cette page pour commencer le dépannage. Si les problèmes persistent, [contactez le support Datadog][1].

## Analyse de code statique (SAST) {#static-code-analysis-sast}

Pour les problèmes liés à l'analyseur statique Datadog, incluez les informations suivantes dans un rapport de bug adressé au support Datadog.

- Votre fichier `code-security.datadog.yaml` (ou l'ancien `static-analysis.datadog.yml`)
- La sortie de votre outil d'analyse statique (tel qu'une CLI) exécuté localement ou dans un pipeline CI/CD
- Le fichier SARIF produit (s'il y en a un de disponible)
- L'URL de votre dépôt (public ou privé)
- Le nom de la branche sur laquelle vous avez exécuté l'analyse
- La ligne de commande exacte utilisée pour exécuter l'analyseur statique Datadog

### Problèmes de performance {#performance-issues}

Si vous rencontrez des problèmes de performance, vous pouvez activer le flag `--performance-statistics` lors de l'exécution de l'outil d'analyse statique depuis la ligne de commande.

Pour les problèmes de performance, incluez les informations suivantes :

- Votre fichier `code-security.datadog.yaml` (ou l'ancien `static-analysis.datadog.yml`)
- La sortie de votre outil d'analyse statique (tel qu'une CLI) exécuté localement ou dans un pipeline CI/CD
- L'URL de votre dépôt (public ou privé)

**Remarque :** Si vous utilisez [Static Analysis and GitHub Actions][2], définissez le paramètre [`enable_performance_statistics`][3] sur true.

### Problèmes bloquants {#blocking-issues}

Si vous rencontrez des problèmes non liés aux performances ou si l'analyseur statique Datadog ne parvient pas à se fermer, exécutez l'analyseur statique Datadog avec le flag `--debug true --performance-statistics`.

### Obtention d'une erreur 403 lors de l'exécution de l'analyseur {#getting-a-403-error-when-running-the-analyzer}

Assurez-vous que les variables suivantes sont correctement spécifiées : `DD_APP_KEY`, `DD_API_KEY` et `DD_SITE` lors de l'exécution de l'analyseur et `datadog-ci`.

### Problèmes avec les téléchargements SARIF {#issues-with-sarif-uploads}

<div class="alert alert-info">
  L'importation SARIF a été testée pour Snyk, CodeQL, Semgrep, Checkov, Gitleaks et Sysdig. Veuillez contacter le <a href="/help">support Datadog</a> si vous rencontrez des problèmes avec d'autres outils compatibles SARIF.
</div>

Lors du téléchargement de résultats provenant d'outils d'analyse statique tiers vers Datadog, assurez-vous qu'ils sont au format [Static Analysis Results Interchange Format (SARIF)][5]. Node.js version 14 ou ultérieure est requis.

Pour télécharger un rapport SARIF, suivez les étapes ci-dessous :

1. Assurez-vous que les variables [`DD_API_KEY` et `DD_APP_KEY` sont définies][4].
2. Optionnellement, définissez une [`DD_SITE` variable][24] (la valeur par défaut est `datadoghq.com`).
3. Installez l'utilitaire `datadog-ci` :

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Exécutez l'outil d'analyse statique tiers sur votre code et générez les résultats au format SARIF.
5. Téléversez les résultats vers Datadog :

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

Si les rapports sont manquants dans Datadog, veuillez définir les variables d'environnement suivantes avant d'appeler datadog-ci :
- `DD_GIT_REPOSITORY_URL` : URL du dépôt
- `DD_GIT_BRANCH` : branche vers laquelle le commit est effectué
- `DD_GIT_COMMIT_SHA` : sha du commit

### Fichier SARIF trop volumineux {#sarif-file-too-large}

Nous filtrons les fichiers SARIF trop volumineux. Si votre code n'est pas analysé parce que votre fichier SARIF
est trop volumineux, envisagez les options suivantes :

 - Mettez à jour votre configuration pour n'analyser que des répertoires spécifiques.
 - Configurez l'analyseur pour n'exécuter que les ensembles de règles nécessaires à votre base de code.

Mettez à jour la configuration via l'application Datadog ou en modifiant le fichier `code-security.datadog.yaml`.

### Aucun commentaire de PR ni aucune porte de PR pour les téléchargements SARIF tiers {#no-pr-comments-or-pr-gates-for-third-party-sarif-uploads}

[Commentaires de PR][25] et [portes de PR][26] ne sont pris en charge que pour les résultats produits par les outils d'analyse statique officiels de Datadog :

- [`datadog-static-analyzer`](https://github.com/DataDog/datadog-static-analyzer)
- [`datadog-saist`](https://github.com/DataDog/datadog-saist)

Si vous téléchargez des résultats SARIF à partir d'un outil tiers, les conclusions apparaissent dans l'interface utilisateur de Datadog mais ne déclenchent pas de commentaires de PR ni d'évaluations de porte de PR.

### `GLIBC_X.YY not found` message d'erreur {#glibc-xyy-not-found-error-message}

Si vous exécutez l'analyseur statique dans votre pipeline CI et obtenez un message d'erreur similaire à la ligne suivante :

```
version `GLIBC_X.YY' not found
```

Cela signifie que vous êtes soit :

- exécutez votre pipeline CI avec une distribution Linux contenant une ancienne version de glibc. Dans ce cas, Datadog recommande une mise à niveau vers la dernière version. L'analyseur s'exécute toujours avec la dernière version des systèmes basés sur Ubuntu/Debian.
- exécutez votre pipeline CI avec une distribution Linux qui ne repose pas sur glibc (comme Alpine Linux). Au lieu de cela,
  exécutez votre pipeline CI avec une distribution qui prend en charge la dernière version de glibc (comme la version stable d'Ubuntu).

### Les services ou les équipes dans le SAST Explorer ou la vue Repositories ne se mettent pas à jour {#services-or-teams-in-the-sast-explorer-or-repositories-view-are-not-updating}

Les résultats pour les services et les équipes dans l'analyse de code statique (SAST) sont basés sur les fichiers `entity.datadog.yml` ou `CODEOWNERS` de la branche par défaut de votre dépôt.
Si vous avez apporté des modifications à ces fichiers dans une branche de fonctionnalité, ces mises à jour ne sont pas reflétées dans la vulnérabilité pour cette branche.

Après avoir mis à jour l'un ou l'autre fichier sur votre branche par défaut, il peut s'écouler jusqu'à six heures avant que les modifications n'apparaissent dans les résultats d'analyse ultérieurs.

### Les résultats ne sont pas affichés dans l'interface utilisateur de Datadog {#results-are-not-being-surfaced-in-the-datadog-ui}

**Si vous exécutez Code Security sur un dépôt non-GitHub**, assurez-vous que la première analyse est effectuée sur votre branche par défaut. Si votre branche par défaut n'est pas l'une des suivantes : `master`, `main`, `default`, `stable`, `source`, `prod` ou `develop`, vous devez tenter un téléchargement SARIF pour votre dépôt, puis remplacer manuellement la branche par défaut dans l'application sous [{{< ui >}}Repository Settings{{< /ui >}}][4]. Ensuite, les téléchargements depuis vos branches non par défaut réussiront.

Si vous utilisez l'analyseur de Datadog, l'[analyse différentielle][21] est activée par défaut. Si vous exécutez l'outil au sein de votre pipeline CI, assurez-vous que `datadog-ci` s'exécute **à la racine** du dépôt analysé.

### L'analyse différentielle ne fonctionne pas {#diff-aware-is-not-working}

Si l'analyse différentielle ne fonctionne pas avec l'analyseur statique, assurez-vous que :
 1. La branche par défaut est spécifique à votre dépôt.
 2. Au moins une révision avec la même configuration (par exemple, mêmes ensembles de règles, mêmes arguments ou flags only/ignore) a été poussée vers la branche par défaut du dépôt.
 3. L'utilisateur actuel peut lire les métadonnées du dépôt. S'ils ne disposent pas des autorisations appropriées, exécutez cette commande : `git config --global --add safe.directory <repo-path>`.

Vous pouvez également exécuter datadog-static-analyzer avec l'option `--debug` pour obtenir plus d'informations.

**Remarque** : L'analyse différentielle ne fonctionne que sur les branches de fonctionnalité. Pour plus d'informations, découvrez les [détails de l'implémentation de l'analyse différentielle][13].

## Software Composition Analysis (SCA) {#software-composition-analysis-sca}

Pour tout problème avec Datadog Software Composition Analysis (SCA) de Datadog, incluez les informations suivantes dans un rapport de bug destiné au support Datadog.

- La sortie de votre outil SCA (tel que CLI) exécuté localement ou dans un pipeline CI/CD
- Le fichier SBOM produit (s'il y en a un de disponible)
- L'URL de votre dépôt (public ou privé)
- Le nom de la branche sur laquelle vous avez exécuté l'analyse
- La liste des fichiers de dépendances dans votre dépôt (tels que `package-lock.json`, `requirements.txt` ou `pom.xml`)

### Analyser les répertoires JAR Java {#scan-java-jar-directories}

Certains projets Java s'appuient sur des fichiers JAR tiers enregistrés dans le dépôt — par exemple, dans un répertoire `lib/` — plutôt que sur un manifeste Maven ou Gradle complet. Lorsque votre build extrait des dépendances directement de ces JAR, ou lorsque vos manifestes de dépendances sont incomplets ou désynchronisés par rapport à ce que votre build utilise réellement, vous pouvez analyser les fichiers JAR directement et les traiter comme source de vérité.

Le générateur SBOM de Datadog inclut un analyseur optionnel qui extrait les métadonnées Maven intégrées dans chaque fichier JAR et signale chaque artefact détecté comme un composant Maven dans le SBOM résultant. Utilisez cette approche lorsque les JAR sur le disque constituent l'enregistrement le plus fiable de ce dont dépend votre build. Pour les projets avec des manifestes Maven ou Gradle standard, analysez plutôt les manifestes pris en charge — ils vous fournissent les dépendances transitives et la correspondance des fichiers sources que l'analyseur JAR ne peut pas offrir.

#### Prérequis {#requirements}

- `datadog-sbom-generator` version `1.10.2` ou ultérieure. Consultez la [page des versions sur GitHub][27].
- Chaque JAR doit inclure des métadonnées Maven dans `META-INF/maven/<groupId>/<artifactId>/pom.properties`. Les JAR sans ces métadonnées sont ignorés avec un avertissement, et l'analyse se poursuit.

Pour confirmer que l'analyseur JAR est disponible dans votre version installée, exécutez :

```shell
datadog-sbom-generator parsers list
```

Recherchez `jar` dans la sortie.

#### Activer l'analyseur JAR {#enable-the-jar-parser}

L'analyseur JAR ne fait pas partie de l'ensemble d'analyseurs par défaut. Activez-le explicitement avec `--enable-parsers jar` :

```shell
datadog-sbom-generator scan --enable-parsers jar /path/to/lib
```

Remplacez `/path/to/lib` par le répertoire qui contient vos fichiers JAR. Le scanner parcourt le répertoire et lit les métadonnées de chaque fichier avec une extension `.jar`.

<div class="alert alert-warning"><code>--enable-parsers</code> remplace l'ensemble d'analyseurs par défaut. Pour analyser des JAR et des manifestes standard lors de la même exécution, listez tous les analyseurs dont vous avez besoin. Sinon, exécutez des analyses distinctes.</div>

Pour analyser simultanément des fichiers JAR et des manifestes Maven :

```shell
datadog-sbom-generator scan --enable-parsers jar,maven /path/to/repository
```

#### Téléversez le SBOM vers Datadog {#upload-the-sbom-to-datadog}

Enregistrez le SBOM dans un fichier, puis téléversez-le avec `datadog-ci` :

```shell
datadog-sbom-generator scan \
    --enable-parsers jar \
    --output sbom.json \
    /path/to/lib

datadog-ci sbom upload sbom.json
```

Définissez `DD_API_KEY`, `DD_APP_KEY` et `DD_SITE` dans votre environnement CI avant d'exécuter le téléversement.

#### Comment l'analyseur JAR identifie les composants {#how-the-jar-parser-identifies-components}

Lorsque Maven crée un package JAR, il intègre un fichier `pom.properties` à :

```text
META-INF/maven/<groupId>/<artifactId>/pom.properties
```

L'analyseur lit le `groupId`, le `artifactId` et le `version` à partir de ce fichier et émet un composant Maven par entrée détectée. Un seul JAR peut contenir plus d'une entrée `pom.properties` — l'analyseur émet un composant pour chacune.

Les composants détectés de cette manière comportent deux propriétés SBOM :

| Propriété | Valeur | Signification |
|---|---|---|
| `datadog:opaque` | `true` | Le composant a été détecté à partir d'un binaire, et non d'un manifeste source. |
| `datadog:is-direct` | `true` | Chaque JAR présent sur le disque est traité comme une dépendance directe. |

#### Limitations {#limitations}

L'analyseur JAR est intentionnellement limité. Utilisez-le en gardant ces contraintes à l'esprit :

- Seuls les fichiers avec une extension `.jar` sont analysés. Les autres archives basées sur ZIP, y compris `.war` et `.ear`, ne sont pas analysées.
- Les JAR sans `META-INF/maven/.../pom.properties` sont ignorés. Les composants sans métadonnées Maven intégrées ne sont pas signalés.
- Les dépendances transitives ne sont pas résolues. Chaque JAR détecté est signalé comme une dépendance directe.
- La correspondance des fichiers sources n'est pas disponible pour les composants détectés via l'analyseur JAR.

Si vous avez besoin d'une résolution transitive, d'une correspondance de source ou d'un contexte de dépendance plus riche, analysez plutôt les manifestes Maven ou Gradle standard. L'analyseur JAR est l'outil approprié lorsque votre build ne dispose pas d'un manifeste fiable à analyser.

### Problèmes avec le téléversement de SBOM {#issues-with-sbom-uploads}
Bien que le [générateur SBOM Datadog][7] soit recommandé, Datadog prend en charge l'ingestion de tout fichier SBOM. Veuillez vous assurer que vos fichiers respectent les formats Cyclone-DX 1.4 ou Cyclone-DX 1.5.

L'ingestion de fichiers SBOM est vérifiée pour les outils tiers suivants :
- [trivy][8]

Pour ingérer votre fichier SBOM dans Datadog, suivez les étapes ci-dessous :

1. Installez l'interface de ligne de commande `datadog-ci` (nécessite que Node.js soit installé).
2. Assurez-vous que vos variables d'environnement `DD_SITE`, `DD_API_KEY` et `DD_APP_KEY` sont définies.
3. Appelez l'outil pour téléverser le fichier vers Datadog.
L'installation et l'appel de l'outil peuvent être effectués à l'aide de ces deux commandes :

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload /path/to/sbom-file.json
```

### Les services ou les équipes dans les bibliothèques SCA ne sont pas mis à jour {#services-or-teams-in-sca-libraries-are-not-updating}

Les résultats pour les services et les équipes dans SCA sont basés sur les fichiers `entity.datadog.yml` ou `CODEOWNERS` de la branche par défaut de votre dépôt.
Si vous avez apporté des modifications à ces fichiers dans une branche de fonctionnalité, ces mises à jour ne sont pas reflétées dans les données de vulnérabilité ou de bibliothèque pour cette branche.

Après avoir mis à jour l'un ou l'autre fichier sur votre branche par défaut, il peut s'écouler jusqu'à six heures avant que les modifications n'apparaissent dans les résultats d'analyse ultérieurs.

### Les résultats ne sont pas affichés dans l'interface utilisateur de Datadog {#results-are-not-being-surfaced-in-the-datadog-ui-1}

**Si vous exécutez Code Security sur un dépôt non-GitHub**, assurez-vous que la première analyse est effectuée sur votre branche par défaut. Si votre branche par défaut n'est pas l'une des suivantes : `master`, `main`, `default`, `stable`, `source`, `prod` ou `develop`, vous devez tenter un téléversement de SBOM pour votre dépôt, puis remplacer manuellement la branche par défaut dans l'application sous [{{< ui >}}Repository Settings{{< /ui >}}][4]. Ensuite, les téléchargements depuis vos branches non par défaut réussiront.

### Aucun paquet détecté pour les projets C# {#no-package-detected-for-c-projects}

Le générateur de SBOM Datadog, ([`datadog-sbom-generator`][7]), extrait les dépendances d'un fichier `packages.lock.json`. Si vous n'avez pas
ce fichier, vous pouvez mettre à jour la définition de votre projet pour le générer. Suivez ces [instructions pour mettre à jour la définition de votre projet][9] afin de générer un fichier `packages.lock.json`.

Le fichier de verrouillage généré est utilisé par [`datadog-sbom-generator`][7] pour extraire les dépendances et générer une SBOM.

### Aucun résultat des analyses hébergées par Datadog {#no-results-from-datadog-hosted-scans}

Les analyses SCA hébergées par Datadog ne prennent **pas** en charge les dépôts qui :

- Utilisent [Git Large File Storage][18] (`git-lfs`)
- Contiennent des chemins de fichiers non valides ou réservés (tels que `/` ou `\\`)
- Contiennent des chemins de fichiers avec traversée de répertoire parent (`..`)
- Contiennent des noms de fichiers de plus de 255 caractères

Si l'une de ces conditions s'applique à votre dépôt et que vous ne pouvez pas mettre à jour votre dépôt pour tenir compte de ces contraintes, [configurez l'analyse dans un pipeline CI][19] pour exécuter SCA et téléverser les résultats vers Datadog.

### Bibliothèques manquantes {#missing-libraries}

Pour garantir la qualité des données, Datadog applique des règles de validation lors du traitement de la SBOM. Les bibliothèques répondant à l'un des critères suivants sont exclues :

- **Version manquante** : La bibliothèque ne spécifie pas de version.
- **Nom non-ASCII** : Le nom de la bibliothèque contient des caractères en dehors du jeu de caractères ASCII.
- **Purl vide** : Le champ d'URL du package (purl) est manquant ou vide.
- **Purl invalide** : L'URL du package est présente mais n'est pas dans un format purl valide.
- **Langage non pris en charge** : La bibliothèque est associée à un langage de programmation que Datadog ne prend pas en charge.

### Aucune vulnérabilité détectée par Software Composition Analysis {#no-vulnerabilities-detected-by-software-composition-analysis}

Une série d'étapes doit s'exécuter avec succès pour que les informations sur les vulnérabilités apparaissent dans la vue [Catalog][16] {{< ui >}}Security{{< /ui >}} ou dans le [Vulnerabilities Explorer][12]. Il est important de vérifier chaque étape lors de l'examen de ce problème.

#### Confirmer que la détection au moment de l'exécution est activée {#confirming-runtime-detection-is-enabled}

Si vous avez activé Software Composition Analysis (SCA) au moment de l'exécution sur vos services, vous pouvez utiliser la métrique `datadog.appsec.risk_management.sca.host_instance` pour vérifier si elle est en cours d'exécution.

1. Accédez à {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} dans Datadog.
2. Recherchez la métrique `datadog.appsec.risk_management.sca.host_instance`. Si la métrique n'existe pas, aucun service n'exécute Software Composition Analysis (SCA) au moment de l'exécution. Si la métrique existe, les services sont signalés avec les tags de métrique `host` et `service`.
3. Sélectionnez la métrique et, dans la section {{< ui >}}Tags{{< /ui >}}, recherchez `service` pour voir quels services exécutent AAP.

Si vous ne voyez pas `datadog.appsec.risk_management.sca.host_instance`, vérifiez les [instructions dans l'application][3] pour confirmer que toutes les étapes de la configuration initiale sont terminées.

Les données de sécurité des applications au moment de l'exécution sont envoyées avec les traces APM. Consultez le [dépannage APM][22] pour [confirmer la configuration d'APM][23] et vérifier les [erreurs de connexion][6].

#### Confirmer que les versions du traceur sont mises à jour {#confirm-tracer-versions-are-updated}

Consultez la documentation de configuration du produit Application Security pour valider que vous utilisez la bonne version du SDK. Ces versions minimales sont requises pour commencer à envoyer des données de télémétrie incluant des informations sur la bibliothèque.

#### Assurez la communication des données de télémétrie {#ensure-the-communication-of-telemetry-data}

Assurez-vous que la variable d'environnement `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` pour Node.js) est définie sur `true`, ou que la propriété système correspondante pour votre langage est activée. Par exemple en Java : `-Ddd.instrumentation.telemetry.enabled=true`.

### La remédiation Bits Code échoue ou produit des correctifs incomplets {#bits-code-remediation-fails-or-produces-incomplete-fixes}

Bits Code nécessite un accès à Internet pour appliquer les mises à niveau de bibliothèque lors de la remédiation des résultats SCA. Si Bits Code ne parvient pas à générer un correctif ou produit un correctif incomplet, confirmez que votre politique d'accès à Internet permet à Bits Code d'atteindre les registres de paquets requis pour votre langage (par exemple, `registry.npmjs.org` pour JavaScript ou `pypi.org` pour Python). Voir [Configurer l'accès à Internet][30] pour plus d'informations.

## Runtime Code Analysis (IAST) {#runtime-code-analysis-iast}

### Confirmez que l'IAST est activé {#confirm-iast-is-enabled}
Assurez-vous que la variable d'environnement `DD_IAST_ENABLED` est définie sur `true` ou que la propriété système correspondante pour votre langage est activée.

Si vous avez activé l'analyse de code en temps réel (IAST) sur vos services, vous pouvez utiliser la métrique `datadog.appsec.risk_management.iast.host_instance` pour vérifier si elle est en cours d'exécution.

1. Accédez à {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} dans Datadog.
2. Recherchez la métrique `datadog.appsec.risk_management.iast.host_instance`. Si la métrique n'existe pas, aucun service n'exécute l'analyse de code en temps réel (IAST). Si la métrique existe, les services sont signalés avec les tags de métrique `host` et `service`.
3. Sélectionnez la métrique et, dans la section {{< ui >}}Tags{{< /ui >}}, recherchez `service` pour voir quels services exécutent AAP.

Si vous ne voyez pas `datadog.appsec.risk_management.iast.host_instance`, vérifiez les [instructions dans l'application][20] pour confirmer que toutes les étapes de la configuration initiale sont terminées.

Les données de sécurité des applications au moment de l'exécution sont envoyées avec les traces APM. Consultez le [dépannage APM][22] pour [confirmer la configuration d'APM][23] et vérifier les [erreurs de connexion][6].

### Problèmes avec l'instrumentation Python et Flask {#issues-with-python-and-flask-instrumentation}
Si vous exécutez une application Flask, assurez-vous d'appeler la fonction `ddtrace_iast_flask_patch()` au niveau supérieur du module et avant d'appeler `app.run()`. Pour plus d'informations, consultez la [documentation d'intégration Flask][19].

## Secret Scanning {#secret-scanning}

### Un résultat d'historique Git est toujours ouvert après la suppression du secret {#a-git-history-finding-is-still-open-after-i-removed-the-secret}

Après l'analyse initiale de l'historique Git, les analyses n'examinent que le dernier commit et ne ferment pas les résultats liés uniquement à l'historique. La réécriture de l'historique Git ne ferme pas non plus ces résultats. Faites pivoter ou révoquez l'identifiant exposé auprès de son fournisseur, puis [mute the finding][31].

## Comment les contributeurs sont calculés pour Code Security {#how-committers-are-calculated-for-code-security}
Un **contributeur** est un contributeur Git actif identifié par le champ `author_email` dans les métadonnées des commits Git.

Un contributeur est comptabilisé pour la facturation s'il effectue **au moins trois commits au cours d'un mois civil** dans des dépôts où Code Security est activé.

Plusieurs commits avec la même `author_email` comptent comme un seul contributeur. Par défaut, les commits avec des adresses e-mail différentes sont comptés séparément. Pour les dépôts GitHub qui répondent aux exigences de [Déduplication des contributeurs entre plusieurs adresses e-mail](#deduplicating-committers-across-email-addresses), plusieurs adresses e-mail appartenant au même utilisateur GitHub sont comptabilisées comme un seul contributeur.

### Comment les adresses e-mail sont comptabilisées en tant que contributeurs {#how-email-addresses-are-counted-as-committers}
Les contributeurs sont identifiés sur la base de la valeur `author_email` normalisée dans les métadonnées des commits Git.

Les commits finalisés par des comptes système GitHub connus tels que `noreply@github.com` et `actions@github.com` ne sont pas comptabilisés.

Les commits utilisant `@users.noreply.github.com` ne sont pas automatiquement exclus. Ces adresses sont couramment utilisées par les développeurs qui choisissent de masquer leur adresse e-mail publique sur GitHub. Si le commit peut être attribué à un développeur individuel, il est comptabilisé.

Pour obtenir des précisions sur la manière dont les contributeurs sont comptabilisés dans votre environnement, [contactez le support Datadog][1].

### Déduplication des contributeurs entre plusieurs adresses e-mail {#deduplicating-committers-across-email-addresses}
Dans certains cas, les commits d'un même développeur peuvent être répartis entre plusieurs adresses e-mail d'auteur Git. Par exemple, un développeur peut définir une adresse e-mail différente avec `git config user.email` dans différents dépôts. Si plus d'une de ces adresses e-mail dépasse le seuil de facturation de trois commits, chacune est comptabilisée comme un contributeur distinct.

Pour les dépôts hébergés sur GitHub, Datadog peut mapper chaque adresse e-mail d'auteur Git à l'utilisateur GitHub sous-jacent afin que le développeur ne soit compté qu'une seule fois, même lorsqu'il effectue des push avec des adresses e-mail différentes. Cela nécessite que le Datadog [GitHub App][28] soit installé sur les dépôts concernés avec l'autorisation `Contents: Read`.

Ce mappage est disponible uniquement pour les dépôts GitHub. Les dépôts hébergés sur GitLab, Azure DevOps ou Bitbucket ne sont pas dédoublonnés.

Si votre nombre de contributeurs semble plus élevé que prévu pour les dépôts GitHub, vérifiez que le Datadog [GitHub App] est installé sur ces dépôts avec l'autorisation `Contents: Read`. Vous pouvez examiner votre installation depuis la [tuile d'intégration GitHub][29].

## Désactivation des fonctionnalités de Code Security {#disabling-code-security-capabilities}
### Désactivation de l'analyse statique des dépôts {#disabling-static-repository-scanning}
Pour désactiver l'analyse statique du code (SAST) ou l'analyse statique de la composition logicielle :
- Si vous analysez vos dépôts via l'analyse hébergée par Datadog, accédez à Code Security [{{< ui >}}Setup{{< /ui >}}][17], cliquez sur {{< ui >}}Enable scanning for your repositories{{< /ui >}} et désactivez les commutateurs précédemment activés pour l'analyse de tous les dépôts connectés ou de chaque dépôt.
- Si vous analysez des dépôts de code source via vos pipelines CI, supprimez le ou les jobs concernés de vos pipelines CI.

### Désactivation de SCA au runtime sur vos services {#disabling-runtime-sca-on-your-services}

SCA peut être activé sur vos services en cours d'exécution en utilisant l'une des deux méthodes suivantes :
- Depuis l'interface utilisateur Datadog.
- Manuellement, en utilisant la variable d'environnement `DD_APPSEC_SCA_ENABLED`.

Pour désactiver SCA, vous devez utiliser la *même méthode* que celle utilisée pour activer SCA.

{{< tabs >}}
{{% tab "Activé dans l'interface utilisateur" %}}
<div class="alert alert-danger">
Si vous avez activé SCA via la <code>DD_APPSEC_SCA_ENABLED</code> variable d'environnement, vous ne pouvez pas le désactiver via l'interface utilisateur.
</div>

Pour désactiver SCA via l'interface utilisateur, vous pouvez :

* Accédez à la [Code Security Setup page][1] et sélectionnez {{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}}. Dans ce tableau, vous pouvez désactiver les services qui étaient précédemment activés.

ou

* Accédez à [Services][2], sélectionnez {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}. Sous {{< ui >}}Coverage{{< /ui >}}, survolez l'icône SCA d'un service, puis cliquez sur {{< ui >}}Deactivate{{< /ui >}}.
* Pour désactiver Software Composition Analysis sur vos services en masse, cochez la case dans l'en-tête de la liste, puis sous {{< ui >}}Bulk Actions{{< /ui >}} sélectionnez {{< ui >}}Deactivate Software Composition Analysis (SCA) on x services{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://app.datadoghq.com/security/code-security/inventory/services
{{% /tab %}}
{{% tab "Activé à l'aide d'une variable d'environnement" %}}
<div class="alert alert-danger">
Si vous avez activé SCA via l'interface utilisateur, vous ne pouvez pas le désactiver en supprimant la <code>DD_APPSEC_SCA_ENABLED</code> variable d'environnement.
</div>

* Supprimez la variable d'environnement `DD_APPSEC_SCA_ENABLED=true` de la configuration de votre application et redémarrez votre service. Ceci ne s'applique pas aux applications PHP.

{{% /tab %}}

{{< /tabs >}}

### Désactivation de l'analyse de code en temps réel (IAST) {#disabling-runtime-code-analysis-iast}

Pour désactiver l'IAST, supprimez la variable d'environnement `DD_IAST_ENABLED=true` de la configuration de votre application ou réglez-la sur `false` comme `DD_IAST_ENABLED=false`, puis redémarrez votre service.

[1]: /fr/help/
[2]: /fr/security/code_security/static_analysis/github_actions
[3]: /fr/security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/source-code/repositories
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: /fr/tracing/troubleshooting/connection_errors/
[7]: https://github.com/DataDog/datadog-sbom-generator
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[13]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/diff-aware.md
[17]: https://app.datadoghq.com/security/configuration/code-security/setup
[16]: https://app.datadoghq.com/services?&lens=Security
[18]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[19]: /fr/tracing/trace_collection/dd_libraries/python/
[20]: /fr/security/configuration/code-security/setup?steps=iast
[21]: /fr/security/code_security/static_analysis/setup/#diff-aware-scanning
[22]: /fr/tracing/troubleshooting/
[23]: /fr/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[24]: /fr/getting_started/site/
[25]: /fr/security/code_security/dev_tool_int/pull_request_comments/
[26]: /fr/pr_gates/
[27]: https://github.com/DataDog/datadog-sbom-generator/releases
[28]: /fr/integrations/github/
[29]: https://app.datadoghq.com/integrations/github/
[30]: /fr/bits_ai/bits_code/setup/#configure-internet-access
[31]: /fr/security/code_security/secret_scanning/#mute-findings