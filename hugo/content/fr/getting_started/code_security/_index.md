---
aliases:
- /fr/getting_started/code_analysis/
description: Sécurisez vos applications avec des outils SAST, SCA et IAST pour détecter
  les vulnérabilités dans le code de première partie et les bibliothèques open source.
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: Centre d'apprentissage
  text: Écrivez du code sécurisé avec Datadog Code Security
title: Prise en main de Code Security
---
## Présentation {#overview}

Datadog Code Security vous aide à sécuriser et à maintenir le code de première partie et les bibliothèques open source de vos applications, du développement à la production.

Il propose une suite d'outils pour vous aider à sécuriser votre code tout au long du cycle de vie du développement logiciel :

- **Static Code Analysis (SAST)** utilise une méthode Static Application Security Testing pour analyser vos dépôts à la recherche de problèmes de sécurité et de qualité dans le code de première partie, en fournissant des suggestions de correctifs pour empêcher ces problèmes d'atteindre la production.
- **Software Composition Analysis (SCA)** détecte les bibliothèques open source vulnérables présentes dans vos dépôts et affectant vos services lors de l'exécution, vous aidant ainsi à sécuriser et à maintenir votre chaîne d'approvisionnement logicielle.
- **Runtime Code Analysis (IAST)** utilise une méthode Interactive Application Security Testing pour détecter les vulnérabilités affectant vos services lors de l'exécution.

## Configurer Code Security {#set-up-code-security}

### Bibliothèques open source {#open-source-libraries}

Datadog Software Composition Analysis détecte les vulnérabilités des bibliothèques et répertorie les dépendances au sein de votre base de code et de vos services en cours d'exécution.

Consultez [Software Composition Analysis][1] pour configurer la détection des vulnérabilités des bibliothèques de manière statique et/ou lors de l'exécution.

### Code de première partie {#first-party-code}

{{< whatsnext desc="Il existe deux façons de sécuriser et de maintenir votre code de première partie avec Datadog :">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}Configuration de Static Code Analysis (SAST){{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}Configuration de Runtime Code Analysis (IAST){{< /nextlink >}}
{{< /whatsnext >}}

## Intégrations d'outils de développement {#developer-tool-integrations}

### Activer les commentaires sur les pull requests {#enable-pull-request-comments}

Datadog peut agir comme un réviseur de code automatique pour signaler les vulnérabilités et les violations de qualité dans les pull requests GitHub. Pour plus d'informations, consultez [GitHub Pull Requests][2].

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="Revue de code Datadog dans GitHub" style="width:100%;" >}}

### Installez les intégrations IDE {#install-ide-integrations}

Installez les [plugins IDE Datadog][5] pour identifier les problèmes de sécurité du code directement dans votre éditeur de code. Selon votre IDE, les plugins prennent en charge les fonctionnalités suivantes :

- Static Code Analysis (SAST)
- Software Composition Analysis (SCA)
- Runtime Code Analysis (IAST)
- Secret Scanning
- Infrastructure as Code (IaC) Scanning

{{< whatsnext desc="Pour les instructions de configuration et les détails sur les fonctionnalités prises en charge, consultez la documentation de votre éditeur de code préféré :">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}<u>IDE JetBrains</u> : IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm et PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}

### Personnalisez les paramètres de votre dépôt {#customize-your-repository-settings}
Dans les [paramètres de Code Security][3], vous pouvez gérer les dépôts pour lesquels les commentaires de PR sont activés, ainsi que [personnaliser la configuration][11] des règles de Static Code Analysis (SAST) appliquées à travers ou au sein des dépôts. Pour toutes les règles par défaut fournies par Datadog, consultez les [Règles SAST][4].

### Configurez les portes de PR {#set-up-pr-gates}

Datadog fournit des [Portes de PR][6] en tant que fonctionnalité de plateforme pour vous aider à maintenir et à appliquer des normes de sécurité et de qualité pour les modifications apportées à votre base de code. Pour plus d'informations, consultez la [configuration des portes de PR][7].

## Priorisez les vulnérabilités avec le contexte d'exécution {#prioritize-vulnerabilities-with-runtime-context}

Code Security offre des **vues centrées sur les vulnérabilités** de toutes les vulnérabilités dans les bibliothèques et le code détectées à la fois par l'analyse statique des dépôts et par la détection des services en cours d'exécution.

### Explorez les vulnérabilités {#explore-vulnerabilities}

Pour les vulnérabilités de bibliothèque, chaque ligne du tableau représente une vulnérabilité spécifique affectant une version de bibliothèque. Selon que vous avez activé la détection statique ou au moment de l'exécution, la colonne {{< ui >}}Detected In{{< /ui >}} affiche les dépôts et/ou services spécifiques affectés par cette vulnérabilité.

Dans le panneau latéral pour une vulnérabilité de bibliothèque unique dans SCA, en plus des détails sur la vulnérabilité, Datadog affiche :

- Un {{< ui >}}Severity breakdown{{< /ui >}} de l'instance de plus haute gravité de cette vulnérabilité observée dans vos dépôts et vos services. Pour chaque emplacement détecté de la vulnérabilité dans vos dépôts et/ou services, Datadog ajuste le score de gravité de base de la vulnérabilité en fonction de facteurs environnementaux. Pour en savoir plus, consultez [Score de gravité Datadog][8].
- Un {{< ui >}}Repositories{{< /ui >}} tableau de toutes les instances où la vulnérabilité a été détectée dans vos dépôts. Pour chaque instance, Datadog indique si la dépendance est classée comme directe ou transitive, le statut de remédiation de la vulnérabilité, ainsi que les étapes de remédiation spécifiques.
- Un {{< ui >}}Impacted Services{{< /ui >}} tableau de tous les services en cours d'exécution affectés par cette vulnérabilité de bibliothèque. Un service est affecté par une vulnérabilité de bibliothèque si la bibliothèque a été chargée au moment de l'exécution et détectée par les SDK d'application de Datadog.

 Les niveaux de gravité sont évalués comme suit :
| Score CVSS    | Évaluation qualitative
| --------------| -------------------|
|   `0.0`         | Aucun                |
|   `0.1 - 3.9`   | Faible                 |
|   `4.0 - 6.9`   | Moyen              |
|   `7.0 - 8.9`   | Élevé                |
|   `9.0 - 10.0`  | Critique            |

### Explorer les résultats par dépôt {#explore-results-per-repository}

Code Security propose également des **vues centrées sur les dépôts** des résultats d'analyse statique, prenant en charge un filtrage granulaire sur toutes les branches et tous les commits pour les dépôts analysés.

Cliquez sur un dépôt sur la page {{< ui >}}Repositories{{< /ui >}} pour accéder à une vue plus détaillée où vous pouvez personnaliser la requête de recherche par branche (la branche par défaut apparaissant en premier) et par commit (en commençant par le plus récent).

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

Vous pouvez utiliser les facettes prêtes à l'emploi suivantes pour créer une requête de recherche afin d'identifier et de résoudre les mauvaises pratiques de codage dans l'onglet {{< ui >}}Code Quality{{< /ui >}} ou les risques de sécurité dans l'onglet {{< ui >}}Code Vulnerabilities{{< /ui >}}.

| Nom de la facette                        | Description                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| État du résultat                     | Filtre les résultats en fonction de l'état d'achèvement de l'analyse.         |
| ID de la règle                           | Règles spécifiques ayant déclenché les résultats.                             |
| Nom de l'outil                         | Détermine quels outils ont contribué à l'analyse.                     |
| CWE (Common Weakness Enumeration) | Filtre les résultats par catégories de vulnérabilités reconnues.                |
| Correctifs disponibles                         | Filtre les problèmes pour lesquels des correctifs suggérés sont disponibles.                 |
| Message de résultat                    | Contient des descriptions ou des messages concis associés aux résultats. |
| Description de la règle                  | Contient la justification de chaque règle.                                |
| Fichier source                       | Contient les fichiers où des problèmes ont été détectés.                          |
| Version de l'outil                      | Filtre les résultats par la version des outils utilisés.                       |

Vous pouvez accéder aux correctifs suggérés directement depuis les résultats pour remédier aux vulnérabilités de sécurité ou améliorer les pratiques de qualité du code.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Un correctif de code suggéré sur l'onglet Correctifs d'un résultat d'analyse de code" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Vous pouvez utiliser les facettes prêtes à l'emploi suivantes pour créer une requête de recherche afin d'identifier et de traiter les risques de sécurité dans les bibliothèques tierces dans l'onglet {{< ui >}}Library Vulnerabilities{{< /ui >}} ou pour examiner votre inventaire de bibliothèques dans l'onglet {{< ui >}}Library Catalog{{< /ui >}}.

| Nom de la facette         | Description                                                    |
|--------------------|----------------------------------------------------------------|
| Nom de la dépendance    | Identifie les bibliothèques par leur nom.                              |
| Version de la dépendance | Filtre par versions spécifiques de bibliothèques.                     |
| Langage           | Trie les bibliothèques par langage de programmation.                   |
| Score              | Trie le score de risque ou de qualité des dépendances.           |
| Gravité           | Filtre les vulnérabilités en fonction de leur niveau de gravité.        |
| Plateforme           | Distingue les bibliothèques selon la plateforme à laquelle elles sont destinées. |

Vous pouvez accéder aux rapports de vulnérabilité et localiser les fichiers sources où la vulnérabilité a été découverte dans vos projets, ainsi que des informations sur les propriétaires du code du fichier.

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="Un lien vers le code source directement dans GitHub à partir d'une vulnérabilité de bibliothèque détectée" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Notifier, corriger et signaler {#notify-remediate-and-report}

Code Security vous aide à configurer des workflows pour suivre et gérer la correction des résultats :

- Configurez des [règles de notification][9] pour informer votre ou vos équipes des nouveaux résultats via Slack, Jira, e‑mail, et plus encore
- Suivez les vulnérabilités par service et par équipe sur la page {{< ui >}}Code Security Summary{{< /ui >}}.

## Liez les résultats aux services et équipes Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/software_composition_analysis/
[2]: /fr/security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /fr/security/code_security/static_analysis/static_analysis_rules/
[5]: /fr/security/code_security/dev_tool_int/ide_plugins/
[6]: /fr/pr_gates/
[7]: /fr/pr_gates/setup
[8]: /fr/security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /fr/account_management/teams/
[11]: /fr/security/code_security/static_analysis/setup/#customize-your-configuration