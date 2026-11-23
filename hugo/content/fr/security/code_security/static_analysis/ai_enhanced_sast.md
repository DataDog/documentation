---
aliases:
- /fr/security/code_security/static_analysis/malicious_pr_protection/
description: Utilisez l'IA pour améliorer la prise de décision en matière de sécurité
  tout au long du cycle de vie de l'analyse statique.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/open-source-ai-sast/
  tag: Blog
  text: Présentation de notre SAST open source natif à l'IA
- link: https://www.datadoghq.com/blog/ai-native-sast-detect-llm-vulnerabilities/
  tag: Blog
  text: Détectez les vulnérabilités dans les applications LLM avec le SAST open source
    natif à l'IA de Datadog
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives
  tag: Blog
  text: Utiliser des LLMs pour filtrer les faux positifs de l'analyse de code statique
- link: https://www.datadoghq.com/blog/sast-triage-agentic-evaluation-bits-memories/
  tag: Blog
  text: Réduisez les faux positifs du SAST avec l'évaluation agentique et Bits Memories
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Présentation de Bits Code pour Code Security
title: Analyse de code statique optimisée par l'IA
---
L'analyse de code statique (SAST) utilise l'IA pour automatiser la détection, la validation et la remédiation tout au long du cycle de vie de la gestion des vulnérabilités.

| Phase du cycle de vie | Fonctionnalité                                                                                                                  | Point de déclenchement                            | Impact                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| Détection       | [La protection contre les PR malveillantes](#malicious-pr-protection) détecte les changements potentiellement malveillants ou les diffs suspects.                                        | Au moment de la PR                                | Signale les PR introduisant du nouveau code risqué.                                       |
| Détection               | [SAST natif par IA](#ai-native-sast) utilise l'analyse de contamination basée sur les LLM pour détecter les vulnérabilités de sécurité avec une plus grande précision.                          | Au moment de l'analyse (scans hébergés par Datadog uniquement)  | Identifie les vulnérabilités contextuellement complexes manquées par l'analyse basée sur des règles. |
| Validation     | [Le filtrage des faux positifs](#false-positive-filtering) dépriorise les résultats à faible probabilité.                                                            | Après l'analyse                                | Réduit le bruit, permet de se concentrer sur le problème réel.                                   |
| Validation | [Le filtrage agentique des faux positifs](#agentic-false-positive-filtering) dépriorise les résultats à faible probabilité pour un sous-ensemble de règles liées à l'injection en utilisant le contexte inter-fichiers. | Après l'analyse                        | Réduit les faux positifs qui dépendent du comportement inter-fichiers, pour les catégories de règles prises en charge. |
| Remédiation                  | [La remédiation](#remediation) utilise Bits Code pour générer des correctifs suggérés manuellement ou automatiquement.        | Après l'analyse                                | Réduit l'effort des développeurs, accélère le cycle de correction.                              |

## Détection {#detection}

Les capacités de détection incluent l'identification d'intentions potentiellement malveillantes dans les pull requests, et l'utilisation des LLM pour rechercher des vulnérabilités dans votre code source. 

### Protection contre les PR malveillantes {#malicious-pr-protection}

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
La protection contre les PR malveillantes est en préversion et ne prend en charge que les dépôts GitHub.
{{< /callout >}}

La protection contre les PR malveillantes utilise des LLM pour analyser les PR soumises aux branches par défaut de vos dépôts à la recherche de modifications de code malveillantes, notamment :

- Injection de code
- Tentatives d'exfiltration de secrets
- Push de paquets malveillants
- Compromission de workflow CI

Pour des exemples, consultez la [violation concernant tj-actions/changed-files (mars 2025)][2], les [packages npm malveillants obfusqués (septembre 2025)][3] et l'[article de blog annonçant la protection contre les PR malveillantes][1].

Dans le [Security Signals Explorer][4], trouvez les détections de PR malveillantes en restreignant la facette {{< ui >}}Source{{< /ui >}} ou {{< ui >}}Scope{{< /ui >}} à `datadog-code-security`. Filtrez par verdict malveillant ou bénin en utilisant la facette {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Scan Verdict{{< /ui >}}, ou effectuez une recherche directe :

- `source:datadog-code-security`
- `@pr_security.scan.verdict:malicious`
- `@pr_security.scan.verdict:benign`

Pour toute vulnérabilité donnée, vous pouvez assigner des signaux pour l'investigation, créer un cas de sécurité, déclarer un incident ou exécuter un workflow.
  
### SAST natif par IA {#ai-native-sast}

Le SAST natif par IA est disponible uniquement pour les analyses hébergées par Datadog.

Le SAST natif par IA utilise des LLM pour détecter les vulnérabilités de sécurité en raisonnant sur la manière dont les données circulent dans votre code. Contrairement à l'analyse statique basée sur des règles, le SAST natif par IA peut identifier contextuellement les vulnérabilités en utilisant une approche en deux phases :

1. **Détection** : Un LLM analyse chaque fichier et raisonne sur la possibilité que des données contrôlées par l'utilisateur atteignent une opération dangereuse sans être assainies.
2. **Vérification** : Un second LLM réévalue indépendamment chaque résultat candidat par analyse de contamination, confirmant ou rejetant chaque résultat afin de réduire les faux positifs.

Pour activer le SAST natif par IA, dans les paramètres d'intégration de votre gestion de code source, activez {{< ui >}}Enable AI SAST{{< /ui >}}. Vous pouvez l'activer pour tous les dépôts ou pour des dépôts spécifiques.

S'il est activé, le SAST natif par IA s'exécute en parallèle de l'analyse statique basée sur des règles, et ses résultats ont la priorité pour les types de vulnérabilités couverts par les deux méthodes.

Le SAST natif par IA est pris en charge pour ces langages :

- C#
- C++
- Dart
- Elixir
- Go
- Java
- JavaScript
- Kotlin
- PHP
- Python
- Ruby
- Rust
- Swift
- TypeScript

{{% collapse-content title="CWEs prises en charge" level="h4" expanded=false id="ai-native-sast-cwes" %}}
Le SAST natif par IA détecte ces types de vulnérabilités :

- [CWE-89 : Injection SQL](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78 : Injection de commande](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-79 : Cross-Site Scripting (XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643 : Injection XPath](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22 : Traversal de chemin](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-73 : Zip Slip](https://cwe.mitre.org/data/definitions/73.html)
- [CWE-74 : Gestion incorrecte des sorties](https://cwe.mitre.org/data/definitions/74.html)
- [CWE-502 : Désérialisation non sécurisée](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327 : Cryptographie défaillante](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328 : Hachage faible](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330 : Aléatoire faible](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614 : Cookie non sécurisé](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90 : Injection LDAP](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94 : Injection de code](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-117 : Injection de logs](https://cwe.mitre.org/data/definitions/117.html)
- [CWE-190 : Dépassement ou bouclage d'entier](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-200 : Divulgation d'informations sensibles](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-209 : Exposition d'informations via un message d'erreur](https://cwe.mitre.org/data/definitions/209.html)
- [CWE-250 : Autorisations excessives](https://cwe.mitre.org/data/definitions/250.html)
- [CWE-501 : Violation de la limite de confiance](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284 : Contrôle d'accès défaillant (IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-345 : Empoisonnement de données et de modèles](https://cwe.mitre.org/data/definitions/345.html)
- [CWE-349 : Faiblesses des vecteurs et des plongements](https://cwe.mitre.org/data/definitions/349.html)
- [CWE-400 : Consommation illimitée](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-540 : Fuite de l'invite système](https://cwe.mitre.org/data/definitions/540.html)
- [CWE-601 : Redirection ouverte](https://cwe.mitre.org/data/definitions/601.html)
- [CWE-829 : Vulnérabilité de la chaîne d'approvisionnement](https://cwe.mitre.org/data/definitions/829.html)
- [CWE-1321 : Pollution de prototype](https://cwe.mitre.org/data/definitions/1321.html)
- [CWE-1426 : Désinformation](https://cwe.mitre.org/data/definitions/1426.html)
- [CWE-1427 : Injection de prompt](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

Le SAST natif par IA utilise des ensembles de règles spécifiques au langage (par exemple, `python-ai_sast`) dans la configuration Code Security `sast`. Pour obtenir la liste complète des noms d'ensembles de règles et savoir comment les sélectionner ou les exclure pour les analyses hébergées par Datadog, consultez [Static Code Analysis (SAST) Configuration][15].

## Validation {#validation}

Le filtrage des faux positifs s'effectue une fois l'analyse terminée. Deux niveaux de filtrage sont disponibles : le filtrage de base des faux positifs et le filtrage agentique qui rassemble un contexte inter-fichiers pour un sous-ensemble de règles.

### Filtrage des faux positifs {#false-positive-filtering}

[Bits AI][9] examine les résultats de l'analyse SAST, évalue s'il s'agit probablement de vrais ou de faux positifs et inclut une brève explication de son raisonnement.

Pour affiner votre liste de tri dans [Code Security SAST Vulnerabilities][6], activez {{< ui >}}Filter out false positives{{< /ui >}}, qui applique la requête `-bitsAssessment:"False Positive"`.

### Filtrage agentique des faux positifs {#agentic-false-positive-filtering}

Le filtrage agentique des faux positifs est une version améliorée du filtrage de base des faux positifs. Au lieu d'évaluer uniquement le code qui lui est présenté, Bits AI rassemble un contexte inter-fichiers. Il lit les fichiers associés, recherche des symboles et inspecte la structure des répertoires à proximité.

Le filtrage agentique des faux positifs s'applique uniquement aux règles SAST liées aux injections, telles que l'injection SQL et l'injection de commandes. 

### Contexte personnalisé {#custom-context}

*Le contexte personnalisé* vous permet d'ajouter des conseils spécifiques aux règles que Bits AI utilise lors de l'évaluation des résultats pour tout filtrage des faux positifs. Utilisez le contexte personnalisé pour décrire les frameworks, les sanitizers, les modèles de validation ou les détails de la base de code spécifiques à votre organisation.

Le contexte personnalisé s'applique au niveau de l'organisation et des règles, et uniquement aux règles de la catégorie de sécurité SAST dans les ensembles de règles par défaut de Datadog, pas aux règles personnalisées. Examinez ou ajoutez le contexte personnalisé dans le panneau latéral pour les règles SAST.

## Remédiation {#remediation}

[Bits Code][10] génère des correctifs de code pour les vulnérabilités, soit sous forme de correctif unique, soit sous forme d'automatisation.

1. Dans [Code Security SAST Vulnerabilities][6], sélectionnez une vulnérabilité pour ouvrir un panneau latéral contenant des détails sur la découverte et le code affecté.
2. Dans la barre latérale {{< ui >}}Next Steps{{< /ui >}}, cliquez sur {{< ui >}}Remediate with AI{{< /ui >}}, puis choisissez une option :
    - {{< ui >}}Single fix{{< /ui >}} : Examinez un diff proposé, posez des questions de suivi, modifiez le correctif et créez une pull request pour remédier à une vulnérabilité unique. Si un correctif a déjà été généré, sélectionnez {{< ui >}}View fix and create PR{{< /ui >}} pour afficher la session de remédiation existante.
    - {{< ui >}}Create automation{{< /ui >}} : Générez des correctifs automatiquement au fur et à mesure qu'ils sont trouvés ou selon un planning. La sélection de cette option ouvre une fenêtre modale avec l'action {{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} pré-remplie. Remplissez le formulaire, notamment en spécifiant un déclencheur et une sortie, puis cliquez sur {{< ui >}}Create Automation{{< /ui >}}. 

Vous pouvez examiner et valider les modifications avant la fusion en consultant les détails de la session, notamment :

- La découverte de sécurité initiale et la modification de code proposée.
- Une explication de la manière et de la raison pour lesquelles Bits Code a généré le correctif.
- Les résultats de CI (si activés) pour valider que le correctif est sûr à déployer.
- Des options pour affiner le correctif ou {{< ui >}}Create PR{{< /ui >}} pour appliquer les modifications à votre dépôt de code source.

<div class="alert alert-tip">Affichez les détails de la session en examinant les vulnérabilités. Affichez toutes les sessions Bits Code dans {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Sessions{{< /ui >}}. Affichez toutes les automatisations Bits Code dans {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}.</div>


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[6]: https://app.datadoghq.com/security/code-security/sast
[9]: /fr/bits_ai/
[10]: /fr/bits_ai/bits_code
[15]: /fr/security/code_security/static_analysis/configuration/#configure-ai-native-sast