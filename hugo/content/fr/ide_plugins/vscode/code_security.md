---
aliases:
- /fr/developers/ide_plugins/vscode/code_security/
further_reading:
- link: /security/code_security/
  tag: Documentation
  text: En savoir plus sur Code Security
- link: /security/code_security/static_analysis/static_analysis_rules/
  tag: Documentation
  text: Règles dʼanalyse statiques
- link: /security/code_security/secret_scanning/
  tag: Documentation
  text: En savoir plus sur Secret Scanning
- link: /security/code_security/iac_security/
  tag: Documentation
  text: En savoir plus sur IaC Security
title: Code Security
type: documentation
---
## Présentation {#overview}

L'extension Datadog pour VS Code et Cursor vous aide à détecter et à corriger les problèmes de sécurité avant que vous ne validiez vos modifications. [Static Code Analysis](#static-code-analysis) détecte les vulnérabilités, les bugs et les problèmes de maintenabilité. [Secret Scanning](#secret-scanning) trouve les identifiants exposés tels que les clés d'API, les jetons et les mots de passe. [Infrastructure as Code (IaC) Scanning](#infrastructure-as-code-iac-scanning) détecte les erreurs de configuration cloud avant que vous ne les déployiez.

## Static Code Analysis{#static-code-analysis}

L'extension exécute des règles de [Static Code Analysis][1] sur les fichiers sources de votre espace de travail. Elle signale les vulnérabilités de sécurité, les bugs et les problèmes de maintenabilité avant que vous ne validiez vos modifications.

Static Code Analysis prend en charge de nombreux langages de programmation. Pour une liste complète, consultez les [Static Code Analysis Rules][2]. Les problèmes sont affichés dans l'éditeur de code source et vous pouvez appliquer directement les correctifs suggérés.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Aperçu de Static Analysis" style="width:100%" video=true >}}

### Get started with Static Code Analysis {#get-started-with-static-code-analysis}

Lorsque vous ouvrez un fichier source, l'extension recherche [`code-security.datadog.yaml`][3] à la racine de votre dépôt et vous invite à en créer un s'il n'existe pas.

{{< img src="/ide_plugins/vscode/static-analysis-onboard.png" alt="Bannière d'intégration pour la configuration de Static Code Analysis avec des fichiers Python" style="width:75%;" >}}

Une fois le fichier de configuration créé, l'analyseur s'exécute automatiquement en arrière-plan lorsque vous ouvrez un fichier. Pour activer Static Code Analysis pour un langage spécifique, exécutez la commande `Datadog: Configure Static Analysis Languages` depuis la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`).

Pour analyser un dossier ou un espace de travail entier, faites un clic droit sur un dossier dans l'explorateur de fichiers et sélectionnez **Datadog Code Security > Analyze Folder** ou **Analyze Workspace**.

### Rule editor {#rule-editor}

Écrivez et testez des [custom Static Code Analysis rules][4] sans quitter votre IDE. Utilisez Rule editor pour concevoir une logique de détection pour les normes internes, les security patterns ou les vérifications de maintenabilité spécifiques à votre codebase.

Pour ouvrir Rule editor, exécutez la commande `Datadog: New DDSA Rule` depuis la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`), ou faites un clic droit sur un fichier YAML dans l'explorateur de fichiers et sélectionnez **Datadog Code Security > Open in DDSA Rule Editor**.

{{< img src="/ide_plugins/vscode/static-analysis-rule-editor.png" alt="SAST rule editor dans l'extension Datadog pour VS Code" style="width:100%;" >}}

Rule editor fournit les panneaux suivants.

- A **Tree-sitter query editor** pour la correspondance de modèles sur l'arbre de syntaxe abstraite.
- A **JavaScript rule panel** pour exprimer la logique de détection et signaler les violations.
- **Fichiers de test conformes et non conformes** qui s'exécutent par rapport à la règle au fur et à mesure que vous modifiez, avec le nombre de correspondances attendues et réelles affiché en temps réel.
- Une **vue arborescente AST** montrant comment l'analyseur représente votre code de test.

Importez une règle existante depuis le disque, ou exportez une règle terminée et téléchargez-la sur Datadog.

## Secret Scanning {#secret-scanning}

L'extension exécute [Secret Scanning][5] sur les fichiers sources de votre espace de travail. Elle signale les identifiants exposés tels que les clés d'API, les jetons et les mots de passe avant que vous ne validiez vos modifications. Le contenu des fichiers est analysé localement et les résultats sont affichés dans l'éditeur au fur et à mesure que vous tapez.

{{< img src="/ide_plugins/vscode/secret_scanning.mp4" alt="Aperçu de Secret Scanning" style="width:100%" video=true >}}

### Get started with Secret Scanning {#get-started-with-secret-scanning}

Secret Scanning est activé par défaut et s'exécute en arrière-plan chaque fois que vous ouvrez un fichier source. Pour analyser un dossier ou un espace de travail entier, faites un clic droit sur un dossier dans le RUM Session Explorer et sélectionnez **Datadog Code Security > Analyze Folder** ou **Analyze Workspace**.

{{< img src="/ide_plugins/vscode/secret-scanning-batch-analysis.png" alt="Rapport d'analyse par lots avec une section Secret Scanning listant les résultats par fichier" style="width:100%;" >}}

Aucune configuration locale n'est requise ; les règles d'analyse sont récupérées depuis Datadog. Tous les fichiers texte sont analysés et les fichiers binaires sont ignorés.

<div class="alert alert-info">Secret Scanning nécessite que vous soyez connecté à Datadog, car les règles de détection sont récupérées depuis votre organisation Datadog.</div>

### Review findings {#review-findings}

Les secrets détectés sont affichés à trois endroits :

- **En ligne dans l'éditeur** : Chaque résultat apparaît sous forme de soulignement sur le secret détecté, avec une gravité dérivée de la priorité de la règle.
- **Problems panel** : Tous les résultats sont listés avec la source `Datadog`.
- **File Insights view** : Les résultats sont regroupés avec d'autres problèmes de Code Security.

{{< img src="/ide_plugins/vscode/secret-scanning-findings.png" alt="Un secret détecté affiché en ligne dans l'éditeur avec un diagnostic au survol, ainsi que le Problems panel et le File Insights view." style="width:100%;" >}}

### Suppress a finding {#suppress-a-finding}

Pour supprimer une détection individuelle, utilisez le code action pour le flagged secret afin d'insérer un `no-dd-secrets` commentaire sur la ligne au-dessus. Le commentaire supprime tous les résultats de secrets sur la ligne suivante.

### Turn Secret Scanning on or off {#turn-secret-scanning-on-or-off}

Pour basculer Secret Scanning, exécutez la commande `Datadog: Turn on Secret Scanning` ou `Datadog: Turn off Secret Scanning` depuis la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`), ou modifiez le paramètre `datadog.codeSecurity.setup.secretScanning.enabled`.

## Infrastructure as Code (IaC) Scanning {#infrastructure-as-code-iac-scanning}

L'extension exécute les règles [Infrastructure as Code (IaC) Security][6] sur les fichiers IaC pris en charge dans votre espace de travail. Elle détecte les erreurs de configuration cloud, telles qu'un chiffrement manquant ou un accès trop permissif. Les fichiers sont analysés localement au fur et à mesure de vos modifications, et les résultats sont affichés en temps réel.

### Get started with IaC Scanning {#get-started-with-iac-scanning}

IaC Scanning est activé par défaut et s'exécute automatiquement en arrière-plan chaque fois que vous ouvrez ou modifiez un fichier IaC pris en charge. Aucune configuration de scanner distincte n'est requise. L'extension respecte la configuration et les exclusions IaC dans `code-security.datadog.yaml`. Pour les options de configuration, consultez [Configure IaC Security][7]. Pour les règles disponibles, consultez [IaC Security Rules][8].

### Review findings {#review-findings-1}

Les erreurs de configuration IaC sont affichées à trois endroits :

- **En ligne dans l'éditeur** : Chaque résultat est mis en évidence sur la ligne concernée. Survolez-le pour afficher la gravité, la description et la règle.
- **Problems panel** : Tous les résultats sont listés avec la source `Datadog`.
- **File Insights view** : Les findings sont regroupés sous **Infrastructure as Code** aux côtés d'autres Code Security issues.

{{< img src="/ide_plugins/vscode/iac_real_time_analysis.mp4" alt="Plusieurs IaC findings mis en évidence en ligne dans des fichiers Dockerfile et Terraform, avec un diagnostic au survol, une quick fix action pour supprimer un finding avec un commentaire, et les findings correspondants dans le File Insights view et le Problems panel." style="width:100%" video=true >}}

### Suppress a finding {#suppress-a-finding-1}

Pour supprimer les IaC findings sur une ligne, utilisez le code action `Datadog: Ignore IaC violations on this line`. L'extension insère un commentaire `dd-iac-scan ignore-line` au-dessus de la ligne concernée en utilisant la syntaxe de commentaire appropriée pour le fichier.

### Turn IaC Scanning on or off {#turn-iac-scanning-on-or-off}

Pour basculer IaC Scanning, modifiez le paramètre `datadog.iacScanning.setup.enabled`.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/static_analysis/
[2]: /fr/security/code_security/static_analysis/static_analysis_rules/
[3]: /fr/security/code_security/static_analysis/configuration/
[4]: /fr/security/code_security/static_analysis/custom_rules/
[5]: /fr/security/code_security/secret_scanning/
[6]: /fr/security/code_security/iac_security/
[7]: /fr/security/code_security/iac_security/configuration/
[8]: /fr/security/code_security/iac_security/iac_rules/