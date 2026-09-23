---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - code quality
  - SAST
aliases:
- /fr/code_analysis/static_analysis
description: Découvrez Datadog Static Code Analysis pour analyser votre code à la
  recherche de problèmes de qualité et de vulnérabilités de sécurité avant qu'il n'atteigne
  la production.
further_reading:
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Sécurité CI/CD : comment sécuriser votre écosystème GitHub'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Présentation de Bits Code pour Code Security
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: Blog
  text: Utiliser des LLMs pour filtrer les faux positifs de l'analyse de code statique
is_beta: false
title: Static Code Analysis (SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security n'est pas disponible pour le {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}


## Présentation {#overview}

Static Code Analysis est la fonctionnalité de Static Application Security Testing (SAST) de Datadog. Le SAST est une technique de test logiciel en boîte blanche qui analyse le code pré-production d'un programme sans avoir besoin de l'exécuter.

Static Code Analysis vous aide à identifier les vulnérabilités de sécurité et les problèmes de maintenabilité tôt dans le cycle de vie du développement logiciel (SDLC) pour garantir que seul le code le plus sécurisé et de la plus haute qualité arrive en production. Elle offre aux organisations les avantages suivants :

* Les applications sont moins vulnérables aux failles de sécurité au fil du temps, car les nouvelles vulnérabilités sont détectées par les analyses SAST avant que le code n'atteigne la production.
* Élimine les incertitudes liées au respect des normes de code d'une organisation, permettant à votre équipe de développement de livrer du code conforme sans impact significatif sur la vélocité des développeurs.
* Intégrez les développeurs plus rapidement, car Static Code Analysis permet à une organisation de maintenir une base de code plus lisible au fil du temps.

## Configurer Static Code Analysis {#set-up-static-code-analysis}

Static Code Analysis prend en charge la recherche de vulnérabilités de sécurité et de mauvaises pratiques de codage dans les langages et technologies suivants :

{{< card-grid card_width="130px" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Python" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=JavaScript" src="integrations_logos/javascript_large.png" alt="javascript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=TypeScript" src="integrations_logos/typescript_large.svg" alt="typescript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Java" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=CSharp" src="integrations_logos/dotnet_avatar.svg" alt="c sharp" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Go" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Ruby" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="60" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=PHP" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Docker" src="integrations_logos/docker_avatar.svg" alt="docker" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=YAML" src="integrations_logos/yaml.png" alt="yaml" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Kotlin" src="integrations_logos/kotlin.png" alt="kotlin" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Elixir" src="integrations_logos/elixir.png" alt="elixir" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Apex" src="integrations_logos/salesforce_large.svg" alt="apex" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Swift" src="integrations_logos/swift_large.svg" alt="swift" >}}
  {{< image-card href="/security/code_security/static_analysis/setup/?tab=circleciorbs#upload-third-party-static-analysis-results-to-datadog" src="integrations_logos/datadog_avatar.svg" alt="autre" >}}
{{< /card-grid >}}

Les analyses peuvent être exécutées via vos pipelines CI/CD ou directement dans Datadog avec l'analyse hébergée.  
Pour commencer, accédez à la [{{< ui >}}Code Security{{< /ui >}} page de configuration][12] ou consultez la [documentation de configuration][9].

## Intégrer au cycle de vie du développement {#integrate-into-the-development-lifecycle}

### Gestion du code source {#source-code-management}
{{< whatsnext desc="Lors des revues de code, Datadog peut automatiquement signaler les violations de Static Code Analysis dans les pull requests en ajoutant des commentaires de revue en ligne sur la ou les lignes de code concernées. Ceci est pris en charge pour les dépôts GitHub, GitLab et Azure DevOps (hébergés dans le cloud). Le cas échéant, Datadog fournit également des suggestions de correctifs qui peuvent être appliquées directement dans la pull request." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Pull requests{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs {#ides}
{{< whatsnext desc="Vous pouvez identifier les vulnérabilités du code en temps réel lorsque vous modifiez un fichier dans votre environnement de développement intégré (IDE). Consultez la documentation spécifique à l'intégration pour plus d'informations :">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}Plugin Datadog pour les IDE JetBrains{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}Extension Datadog pour Visual Studio Code et Cursor{{< /nextlink >}}
{{< /whatsnext >}}

## Rechercher et filtrer les résultats {#search-and-filter-results}
Après la configuration de Static Code Analysis, une analyse est effectuée à chaque commit sur un dépôt analysé. Les violations sont résumées par dépôt sur la [{{< ui >}}Code Security Repositories{{< /ui >}} page][1]. Cliquez sur un dépôt pour analyser les résultats {{< ui >}}Code Vulnerabilities{{< /ui >}} et {{< ui >}}Code Quality{{< /ui >}} de Static Code Analysis.

* L'onglet {{< ui >}}Code Vulnerabilities{{< /ui >}} contient les violations trouvées par les règles de Datadog dans la [catégorie Security][2].
* L'onglet {{< ui >}}Code Quality{{< /ui >}} contient les violations trouvées par les règles de Datadog dans les [catégories Best Practices, Code Style, Error Prone ou Performance][3].

Pour filtrer vos résultats, utilisez les facettes à gauche de la liste, ou effectuez une recherche. Les résultats peuvent être [filtrés par facettes de service ou d'équipe][13].

Chaque ligne représente une violation. Chaque violation est associée au commit et à la branche spécifiques sélectionnés dans les filtres en haut de la page (par défaut, les résultats sont affichés pour le dernier commit sur la branche par défaut du dépôt que vous consultez).

Cliquez sur une violation pour ouvrir un panneau latéral contenant des informations sur l'étendue de la violation et son origine.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Panneau latéral pour une violation d'analyse statique" style="width:80%;">}}  -->

Le contenu de la violation est réparti dans plusieurs onglets :

- {{< ui >}}Details{{< /ui >}} : Une description de la violation et des lignes de code qui l'ont provoquée. Pour voir l'extrait de code incriminé, configurez l'intégration de code source appropriée pour votre fournisseur ([GitHub][4], [GitLab][5], Azure[6]).
- {{< ui >}}Remediation{{< /ui >}} : Une ou plusieurs corrections de code permettant de résoudre la violation, avec des options de remédiation.
- {{< ui >}}Event{{< /ui >}} : Métadonnées JSON concernant la violation.

### Exclure les faux positifs {#filter-out-false-positives}
Pour un sous-ensemble de vulnérabilités SAST, Bits AI peut examiner le contexte et évaluer s'il s'agit plus probablement d'un vrai ou d'un faux positif, accompagné d'une brève explication du raisonnement. 

Pour plus d'informations, consultez [Static Code Analysis amélioré par l'IA][17].

## Personnalisez votre configuration {#customize-your-configuration}
Pour personnaliser les règles de Static Code Analysis configurées dans vos dépôts ou dans l'ensemble de votre organisation, consultez la [documentation de configuration][8].

## Liez les résultats aux services et équipes Datadog {#link-findings-to-datadog-services-and-teams}
Pour lier les résultats aux services et équipes Datadog, consultez la [documentation de configuration][13].

## Appliquer les corrections suggérées {#apply-suggested-fixes}
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Onglet Corrections d'une violation d'analyse statique" style="width:80%;">}} -->

Dans Datadog Static Code Analysis, il existe deux types de corrections suggérées :

1. **Correction suggérée déterministe :** Pour les violations simples comme les problèmes de linting, l'analyseur de règles fournit automatiquement des corrections basées sur des modèles.
2. **Correctif suggéré par l'IA :** Pour les violations complexes, les correctifs ne sont généralement pas disponibles à l'avance. Au lieu de cela, vous pouvez utiliser les correctifs suggérés par l'IA, qui utilisent GPT-4 d'OpenAI pour générer un correctif suggéré. Vous pouvez choisir entre les correctifs {{< ui >}}Text{{< /ui >}} et {{< ui >}}Unified Diff{{< /ui >}}, qui produisent respectivement des instructions en texte brut ou une modification de code pour résoudre la violation.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="Indicateur visuel d'un correctif suggéré par l'analyse statique par défaut" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="Indicateur visuel d'un correctif suggéré par l'analyse statique par IA" style="width:60%;">}} -->

### Corrigez une vulnérabilité ou un problème de qualité directement depuis Datadog {#fix-a-vulnerability-or-quality-issue-directly-from-datadog}

<!-- {{< img src="ci/sast_one_click_light.png" alt="Exemple de remédiation en un clic pour Code Security" style="width:90%;" >}} -->

Si GitHub est votre gestionnaire de code source, vous pouvez envoyer une modification de code pour corriger un problème SAST directement depuis Datadog de deux manières.

#### Ouvrez une pull request {#open-a-pull-request}
Si l'autorisation {{< ui >}}Pull Requests{{< /ui >}} de votre application GitHub est définie sur {{< ui >}}Read & Write{{< /ui >}}, la remédiation en un clic est activée pour toutes les violations de Static Code Analysis disposant d'un correctif suggéré.

Suivez ces étapes pour corriger une vulnérabilité et ouvrir une pull request :
1. Affichez un résultat SAST spécifique dans Code Security.
2. Cliquez sur {{< ui >}}Fix Violation{{< /ui >}} dans le panneau latéral du résultat.
3. Sélectionnez {{< ui >}}Open a Pull Request{{< /ui >}}.
4. Saisissez un titre de pull request et un message de validation.
5. Cliquez sur {{< ui >}}Create PR{{< /ui >}}.

#### Validez directement sur la branche actuelle {#commit-directly-to-the-current-branch}
Vous pouvez également corriger une vulnérabilité en validant directement sur la branche où le résultat a été trouvé.

Pour valider un correctif suggéré :

1. Affichez un résultat SAST spécifique dans Code Security.
2. Cliquez sur {{< ui >}}Fix Violation{{< /ui >}} dans le panneau latéral du résultat.
3. Cliquez sur {{< ui >}}Commit to current branch{{< /ui >}}.

### Fix with Cursor {#fix-with-cursor}
Vous pouvez confier la remédiation d'une violation SAST à un agent de codage IA tel que Cursor.

1. Affichez un résultat SAST spécifique dans Code Security.
2. Dans la section {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} du panneau latéral, cliquez sur {{< ui >}}Remediate with AI{{< /ui >}}.
3. Sélectionnez l'onglet {{< ui >}}Coding agent{{< /ui >}}.
4. Sous {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, cliquez sur {{< ui >}}Open{{< /ui >}} à côté de {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog ouvre Cursor avec une invite de remédiation adaptée à la violation. Examinez les modifications suggérées avant de les valider.

Pour utiliser un autre agent de codage IA, cliquez sur {{< ui >}}Copy{{< /ui >}} à côté de {{< ui >}}Copy fix prompt{{< /ui >}} et collez l'invite dans l'agent de votre choix.

Pour gérer le lien profond Cursor, installez l'extension [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/static_analysis/fix-with-cursor.png" alt="La boîte de dialogue Remediate with AI avec l'onglet Coding agent sélectionné, affichant les options Fix with Cursor et Copy fix prompt" style="width:100%;" >}}

## Signaler des faux positifs {#report-false-positives}
Si vous pensez qu'une violation spécifique est un faux positif, vous pouvez la signaler comme telle en indiquant le motif, ce qui envoie un rapport directement à Datadog. Les soumissions sont examinées régulièrement afin d'améliorer la qualité de l'ensemble des règles au fil du temps.

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Bouton pour signaler une violation de Static Code Analysis comme faux positif" style="width:60%;">}} -->

## <!-- Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /fr/security/code_security/static_analysis_rules?categories=Security
[3]: /fr/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /fr/integrations/github/
[5]: /fr/integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /fr/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /fr/security/code_security/static_analysis/setup
[10]: /fr/security/code_security/dev_tool_int/github_pull_requests/
[11]: /fr/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: /fr/security/code_security/static_analysis/setup/?tab=github#link-findings-to-datadog-services-and-teams
[14]: /fr/account_management/teams/
[15]: /fr/integrations/github/#connect-github-teams-to-datadog-teams
[16]: /fr/integrations/azure-devops-source-code/
[17]: /fr/security/code_security/static_analysis/ai_enhanced_sast/