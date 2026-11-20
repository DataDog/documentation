---
aliases:
- /fr/security/cloud_security_management/iac_scanning/
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentation
  text: Configurez IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentation
  text: Configurez IaC Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentation
  text: Règles de IaC Security
- link: /security/code_security/iac_security/custom_rules/
  tag: Documentation
  text: Règles personnalisées IaC
- link: /pr_gates/
  tag: Documentation
  text: PR Gates
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Empêchez les erreurs de configuration cloud d'atteindre la production avec
    Datadog IaC Security.
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Repérez les erreurs de configuration CI/CD avant que les bots ne le fassent
    : sécurisez GitHub Actions avec Datadog IaC Security.'
title: Sécurité de l'infrastructure en tant que code (IaC)
---
La sécurité de l'infrastructure en tant que code (IaC) de Datadog détecte les erreurs de configuration dans les configurations IaC avant qu'elles ne soient déployées. Elle signale des problèmes tels qu'un chiffrement manquant ou un accès trop permissif dans les fichiers stockés dans vos dépôts GitHub, GitLab ou Azure DevOps connectés. Pour plus d'informations, consultez [Règles IaC Security][13].

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="Panneau latéral d’erreur de configuration IaC affichant les détails du problème de haute gravité IMDSv1 activé, incluant un résumé de sécurité, un extrait de code, des horodatages de détection et des étapes de remédiation." width="100%">}}

## Fonctionnement {#how-it-works}

IaC Security s'intègre à vos dépôts pour analyser en continu les erreurs de configuration et analyse chaque commit sur toutes les branches pour chaque dépôt configuré. Lorsque des violations sont détectées, les constats sont affichés et liés au dépôt, à la branche et au chemin de fichier pertinents. Cela vous aide à identifier, prioriser et corriger les erreurs de configuration directement à la source.

## Fonctionnalités clés {#key-capabilities}

### Examinez et corrigez les violations dans les pull requests {#review-and-fix-violations-in-pull-requests}

Lorsqu'une pull request inclut des modifications d'infrastructure en tant que code, Datadog ajoute des commentaires en ligne pour signaler toute violation. Le cas échéant, il suggère également des corrections de code qui peuvent être appliquées directement dans la pull request. Vous pouvez également ouvrir une nouvelle pull request depuis Datadog pour corriger un constat. Pour plus d'informations, consultez [Pull Request Comments][5].

### Fix with Cursor {#fix-with-cursor}
Vous pouvez confier la remédiation d'un constat IaC à un agent de codage IA tel que Cursor.

1. Sur la page [Code Security Vulnerabilities][3], cliquez sur un constat pour ouvrir son panneau latéral.
2. Dans la section {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}}, cliquez sur {{< ui >}}Remediate with AI{{< /ui >}}.
3. Sélectionnez l'onglet {{< ui >}}Coding agent{{< /ui >}}.
4. Sous {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, cliquez sur {{< ui >}}Open{{< /ui >}} à côté de {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog ouvre Cursor avec une invite de remédiation adaptée à la mauvaise configuration.

Pour utiliser un agent différent, cliquez sur {{< ui >}}Copy{{< /ui >}} à côté de {{< ui >}}Copy fix prompt{{< /ui >}} et collez l'invite dans l'agent de votre choix.

Pour gérer le lien profond Cursor, installez l'extension [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/iac_security/fix-with-cursor.png" alt="La boîte de dialogue Remediate with AI avec l'onglet Coding agent sélectionné, affichant les options Fix with Cursor et Copy fix prompt" style="width:100%;" >}}

### Bloquez automatiquement les modifications risquées avec PR Gates {#automatically-block-risky-changes-with-pr-gates}

Utilisez [PR Gates][11] pour appliquer des normes de sécurité aux modifications d'infrastructure en tant que code avant qu'elles ne soient fusionnées. Datadog analyse les modifications IaC dans chaque pull request, identifie toute vulnérabilité dépassant votre seuil de gravité configuré et signale un statut de réussite ou d'échec à GitHub ou Azure DevOps.

Par défaut, les vérifications sont informatives, mais vous pouvez les rendre bloquantes dans GitHub ou Azure DevOps pour empêcher la fusion lorsque des problèmes critiques sont détectés. Pour obtenir des instructions de configuration, consultez [Set up PR Gate Rules][12].

### Afficher et filtrer les constats {#view-and-filter-findings}

Après avoir configuré Datadog IaC Security, chaque commit dans un dépôt scanné déclenche une analyse. Les constats sont résumés sur la page [Code Security Vulnerabilities][3] et regroupés par dépôt sur la page [Code Security Repositories][6].

Utilisez des filtres pour affiner les constats par :

- Gravité
- Statut (open, muted, fixed)
- Type de ressource
- Fournisseur cloud
- Chemin d'accès au fichier
- Équipe
- Référentiel

Cliquez sur n'importe quel constat pour ouvrir un panneau latéral qui affiche :

- {{< ui >}}Details{{< /ui >}} : Une description et le code pertinent qui a déclenché le constat. (Pour afficher des extraits de code, [installez GitHub App][9].)
- {{< ui >}}Remediation{{< /ui >}} : Si disponibles, des corrections de code suggérées sont fournies pour les constats qui prennent en charge la remédiation.

### Créer des tickets Jira à partir des constats {#create-jira-tickets-from-findings}

Vous pouvez créer un ticket Jira bidirectionnel directement à partir de n'importe quel constat pour suivre et corriger les problèmes dans vos flux de travail existants. Le statut du ticket reste synchronisé entre Datadog et Jira. Pour plus d'informations, consultez [Bidirectional ticket syncing with Jira][4].

### Masquer les résultats {#mute-findings}

Pour masquer un constat, cliquez sur {{< ui >}}Mute{{< /ui >}} dans le panneau de détails du constat. Cela ouvre un workflow où vous pouvez [create a Muting Rule][10] pour un filtrage contextuel par valeurs de tag (par exemple, par `service` ou `environment`). Mettre un constat en mode mute le masque et l'exclut des rapports.

Pour restaurer un constat en mode mute, cliquez sur {{< ui >}}Unmute{{< /ui >}} dans le panneau de détails. Vous pouvez également utiliser le filtre {{< ui >}}Status{{< /ui >}} sur la page [Code Security Vulnerabilities][3] pour examiner les constats en mode mute.

### Exclure certaines règles, certains fichiers ou certaines ressources {#exclude-specific-rules-files-or-resources}

Vous pouvez configurer des exclusions pour empêcher certains constats d'apparaître dans les résultats d'analyse. Les exclusions peuvent être basées sur l'ID de règle, le chemin de fichier, le type de ressource, la gravité ou le tag.

Les exclusions sont gérées via un fichier de configuration ou des commentaires en ligne dans votre code IaC. Pour les formats pris en charge et des exemples d’utilisation, consultez [Configure IaC Security][7].

## Étapes suivantes {#next-steps}

1. [Set up IaC Security][1] dans votre environnement.
2. Configurez [IaC Security][2] pour réduire les faux positifs ou ignorer les résultats attendus.
3. Examinez et triez les constats sur la page [Code Security Vulnerabilities][3].
4. Créez des [IaC Custom Rules][14] pour appliquer des exigences spécifiques à votre organisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/iac_security/setup
[2]: /fr/security/code_security/iac_security/configuration
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /fr/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /fr/security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /fr/security/code_security/iac_security/configuration/
[8]: /fr/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /fr/security/automation_pipelines/
[11]: /fr/pr_gates/
[12]: /fr/pr_gates/setup
[13]: /fr/security/code_security/iac_security/iac_rules
[14]: /fr/security/code_security/iac_security/custom_rules