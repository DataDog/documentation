---
aliases:
- /fr/code_analysis/
disable_toc: false
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: Centre d'apprentissage
  text: Écrivez du code sécurisé avec Datadog Code Security
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Sécurité CI/CD : comment sécuriser votre écosystème GitHub'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Présentation de Bits Code pour Code Security
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: Blog
  text: Corrigez plus rapidement les vulnérabilités transitives avec Datadog Software
    Composition Analysis
- link: https://www.datadoghq.com/blog/audit-reports-datadog-sheets
  tag: Blog
  text: Générez des rapports de vulnérabilité et de conformité prêts pour l'audit
    avec Datadog Sheets
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration GitLab Source Code
    dans Datadog
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
- link: https://www.datadoghq.com/blog/code-security-ai-capabilities
  tag: Blog
  text: Sécurisez votre code à grande échelle avec une gestion des vulnérabilités
    pilotée par l'IA
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifier les risques de sécurité courants dans les serveurs MCP
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: Blog
  text: Utiliser des LLMs pour filtrer les faux positifs de l'analyse de code statique
title: Code Security
---
Code Security analyse votre code de première partie et les bibliothèques open source utilisées dans vos applications, à la fois dans vos dépôts et dans vos services en cours d'exécution, offrant une visibilité de bout en bout du développement à la production. Il englobe les capacités suivantes :

- [Analyse de code statique (SAST)][1] pour identifier les problèmes de sécurité et de qualité dans votre code de première partie
- [Software Composition Analysis (SCA)][2] pour identifier les dépendances open source dans vos dépôts et vos services
- [Runtime Code Analysis (IAST)][3] pour identifier les vulnérabilités dans le code de première partie au sein de vos services
- [Secret Scanning][8] pour identifier et valider les secrets divulgués
- [Infrastructure as Code (IaC) Security][10] pour identifier les erreurs de configuration de sécurité dans l'IaC stocké dans vos dépôts
- [Supply Chain Security](#supply-chain-security-preview) pour empêcher les paquets malveillants d'entrer dans votre environnement de développement et vos dépôts de code

Code Security aide les équipes à mettre en œuvre le DevSecOps dans toute l'organisation :
- **Développeurs :** détection précoce des vulnérabilités, améliorations de la qualité du code, développement plus rapide car les développeurs passent moins de temps à déboguer et à corriger.
- **Administrateurs de sécurité :** posture de sécurité renforcée, gestion améliorée des correctifs en réponse aux alertes précoces de vulnérabilité et surveillance de la conformité.
- **Ingénieurs de fiabilité de site (SRE) :** checks de sécurité automatisés tout au long du workflow CI/CD, conformité de sécurité et résilience du système. SAST réduit la charge manuelle pour les SRE et garantit que chaque version est minutieusement testée pour détecter les vulnérabilités.

Les fonctionnalités de gestion des vulnérabilités suivantes sont disponibles dans Code Security :
- [Intégrations d'outils de développement][16] pour signaler les vulnérabilités dans l'IDE et les commentaires de pull request, et empêcher la fusion de vulnérabilités dans votre base de code de production
- [Intégrations de ticketing][13] avec Jira et Datadog Case Management, avec synchronisation bidirectionnelle
- [Notifications][14]
- [Pipelines d'automatisation][15] pour ignorer automatiquement les vulnérabilités et attribuer des dates d'échéance par gravité
- [Serveur MCP][17] pour exécuter des analyses Code Security directement depuis des assistants de codage IA (en préversion)

## Analyse de code statique (SAST) {#static-code-analysis-sast}
L'analyse de code statique (SAST) analyse le code de pré-production pour identifier les problèmes de sécurité et de qualité. Vous pouvez intégrer les meilleures pratiques de sécurité et de développement tout au long du cycle de vie du développement logiciel avec :
- Intégration IDE pour signaler les violations en temps réel avec des correctifs suggérés déterministes
- Commentaires de pull request en ligne avec des correctifs suggérés déterministes et une analyse incrémentale/diff-aware
- Possibilité d'ouvrir une pull request pour corriger une violation directement depuis Datadog 

Les analyses peuvent être exécutées via vos pipelines CI/CD ou directement dans Datadog avec l'analyse hébergée.  
Consultez [Configuration de l'analyse de code statique][6] pour commencer.

L'analyse de code statique peut également analyser vos pull requests à grande échelle pour détecter et empêcher les modifications de code malveillantes. Cela permet à Datadog non seulement de vérifier les vulnérabilités de code connues, mais aussi de détecter une intention potentiellement malveillante dans les PR soumises aux branches par défaut de vos dépôts. [Demander l'accès à la préversion][12].

## Software Composition Analysis {#software-composition-analysis}
Software Composition Analysis (SCA) analyse les bibliothèques open source dans vos dépôts et vos services en cours d'exécution. Vous pouvez suivre et gérer les dépendances tout au long du cycle de vie du développement logiciel avec :
- Intégration IDE pour signaler les vulnérabilités affectant les bibliothèques exécutées sur vos services
- Possibilité d'ouvrir une pull request pour corriger une vulnérabilité de bibliothèque directement depuis Datadog
- Priorisation des vulnérabilités en fonction de l'exécution avec le score de gravité Datadog

SCA prend en charge la détection des dépendances statiques et à l'exécution.  
Pour l'analyse statique, vous pouvez effectuer une analyse via vos pipelines CI/CD ou directement via Datadog avec l'analyse hébergée. Consultez [configuration statique][4] pour commencer.  
Pour la détection des vulnérabilités lors de l'exécution, vous pouvez facilement activer SCA sur vos services instrumentés avec Datadog APM. Consultez [configuration d'exécution][5] pour commencer.

## Runtime Code Analysis (IAST) {#runtime-code-analysis-iast}
Runtime Code Analysis (IAST) identifie les vulnérabilités au niveau du code dans vos services en cours d'exécution. Elle repose sur l'inspection du trafic applicatif légitime, contrairement aux tests externes qui nécessitent souvent une configuration supplémentaire ou une planification périodique. L'IAST fournit une vue actualisée de votre surface d'attaque en :
- Surveillant les interactions de votre code avec d'autres composants de votre pile (tels que les bibliothèques et l'infrastructure)
- Fournissant une couverture de 100 % du Top 10 de l'OWASP
- Priorisation des vulnérabilités en fonction de l'exécution avec le score de gravité Datadog

Vous pouvez activer l'IAST sur vos services instrumentés avec Datadog APM. Consultez la [configuration de l'IAST][3] pour commencer.

## Secret Scanning {#secret-scanning}
Secret Scanning identifie et valide les identifiants exposés, les clés d'API et d'autres secrets sensibles dans votre base de code. Vous pouvez empêcher la fuite de secrets tout au long de votre cycle de vie de développement logiciel grâce à :
- Des hooks de pré-commit pour empêcher les secrets d'être validés localement avant même qu'ils n'atteignent votre dépôt
- Des contrôles de pull request pour empêcher les secrets divulgués d'atteindre votre branche par défaut
- Une validation par des tiers pour confirmer si un secret détecté est actif et exploitable, réduisant ainsi le bruit généré par des identifiants obsolètes ou invalides
- [Analyse de l'historique Git][22] pour trouver des secrets qui ont été supprimés du code mais qui peuvent encore être récupérés à partir de commits antérieurs

Les analyses peuvent être exécutées via vos pipelines CI/CD ou directement dans Datadog avec l'analyse hébergée. Consultez la [configuration de Secret Scanning][9] pour commencer.

## Infrastructure as Code Security (IaC Security) {#infrastructure-as-code-security-iac-security}
IaC Security analyse l'infrastructure en tant que code pour détecter les erreurs de configuration avant qu'elles ne soient provisionnées dans votre environnement cloud. Vous pouvez sécuriser votre infrastructure et votre CI/CD grâce à :
- Commentaires de pull request en ligne avec des correctifs suggérés déterministes et une analyse incrémentale/diff-aware
- Contrôles de pull request pour empêcher les erreurs de configuration à haute gravité d'atteindre votre environnement de production
- Des centaines de détections sur Terraform, CloudFormation, Kubernetes, GitHub Actions, et plus encore

Avec [Cloud Security Management (CSM)][18], vous pouvez voir les erreurs de configuration dans IaC Security directement à partir des résultats d'exécution. Consultez la [configuration de IaC Security][17] pour commencer.

## Supply Chain Security (Aperçu) {#supply-chain-security-preview}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Rejoignez la Preview !">}}
Utilisez ce formulaire pour soumettre votre demande de participation à l'aperçu de Supply Chain Security.
{{< /callout >}}

Supply Chain Security empêche les paquets open source malveillants d'entrer dans vos environnements de développement au moment de l'installation, avant qu'ils n'atteignent vos dépôts ou vos pipelines CI/CD.

Contrairement au SCA, qui analyse les dépendances déjà présentes dans votre base de code, le Datadog Supply Chain Firewall (SCFW) intercepte les commandes du gestionnaire de paquets (`npm`, `pip`, `poetry`) en temps réel et bloque les paquets malveillants ou récemment publiés avant qu'ils ne soient installés.

Supply Chain Security évalue chaque installation de paquet par rapport au flux de paquets malveillants de Datadog (propulsé par [GuardDog][21]), aux avis de vulnérabilité connus et aux seuils de récence configurables. Si un paquet correspond à l'un de ces contrôles, le SCFW bloque immédiatement l'installation et affiche un message clair et exploitable sur les ordinateurs portables des développeurs et les [CI runners][20].

En plus de protéger les machines individuelles des développeurs ou les pipelines CI, le SCFW fournit une observabilité des événements pour rechercher, filtrer et auditer les événements AUTORISER, AVERTIR et BLOQUER sur les machines des développeurs et les systèmes CI dans un flux d'événements unifié.

## Code Security MCP Server (Aperçu) {#code-security-mcp-server-preview}
Le [Code Security MCP Server][19] est un serveur Model Context Protocol (MCP) local qui intègre l'analyse SAST, la détection de secrets, l'analyse SCA, l'analyse IaC et la génération de SBOM directement dans les assistants de codage IA tels que Cursor, Claude Desktop et VS Code. Lisez la [documentation du serveur MCP][17] pour commencer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/static_analysis/
[2]: /fr/security/code_security/software_composition_analysis/
[3]: /fr/security/code_security/iast/
[4]: /fr/security/code_security/software_composition_analysis/setup_static/
[5]: /fr/security/code_security/software_composition_analysis/setup_runtime/
[6]: /fr/security/code_security/static_analysis/setup/
[7]: /fr/security/code_security/iast/setup/
[8]: /fr/security/code_security/secret_scanning/
[9]: /fr/security/code_security/secret_scanning/#set-up-secret-scanning
[10]: /fr/security/code_security/iac_security
[12]: https://www.datadoghq.com/product-preview/malicious-pr-protection/
[13]: /fr/security/ticketing_integrations
[14]: /fr/security/notifications/
[15]: /fr/security/automation_pipelines/
[16]: /fr/security/code_security/dev_tool_int/
[17]: /fr/security/code_security/iac_security/setup/?tab=github
[18]: /fr/security/cloud_security_management/
[19]: /fr/security/code_security/dev_tool_int/mcp_server/
[20]: /fr/security/code_security/dev_tool_int/scfw_github_action/
[21]: https://github.com/DataDog/guarddog
[22]: /fr/security/code_security/secret_scanning/#detect-secrets-in-git-history