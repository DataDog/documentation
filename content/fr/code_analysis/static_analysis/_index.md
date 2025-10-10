---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - code quality
  - SAST
aliases:
- /fr/continuous_integration/static_analysis
- /fr/static_analysis
description: Découvrez comment la fonctionnalité Static Analysis de Datadog vous permet
  de détecter les problèmes de qualité ainsi que les vulnérabilités de sécurité de
  votre code avant qu'il ne soit déployé en production.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Surveiller tous vos pipelines CI avec Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source
is_beta: false
title: Analyse statique (SAST)
---

{{< callout url="#" btn_hidden="true" header="Profitez de l'aperçu !" >}}
L'aperçu de Code Analysis est disponible.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}


## Présentation

L'analyse statique (SAST) est une technique de test de logiciels qui analyse le code de préproduction d'un programme sans qu'il soit nécessaire de l'exécuter, ce qui signifie que le programme est statique parce qu'il ne s'exécute pas. 

L'analyse statique vous aide à identifier les problèmes de maintenabilité et les failles de sécurité dès le début du cycle de vie du développement logiciel (SDLC), afin de garantir que seul le code de la plus haute qualité et le plus sûr soit mis en production. Les outils d'analyse statique qui recherchent les failles de sécurité sont aussi communément appelés outils de test statique de la sécurité des applications (SAST).

L'utilisation de l'analyse statique offre aux organisations les avantages suivants :

* L'analyse statique élimine les incertitudes liées au respect des normes de code de l'entreprise, ce qui permet à l'équipe de développement de livrer un code conforme sans que cela n'impacte le temps des développeurs de manière significative.
* Les applications d'une organisation sont moins vulnérables aux failles de sécurité au fil du temps, car les nouvelles vulnérabilités sont détectées par les analyses SAST avant que le code n'atteigne la production.
* Les nouveaux développeurs d'une organisation sont capables de s'intégrer plus rapidement car l'analyse statique permet à une organisation de maintenir une base de code plus lisible au fil du temps.
* Le logiciel d'une organisation devient plus fiable au fil du temps, car le code est plus facile à maintenir et le risque qu'un développeur introduise de nouveaux défauts dans le code est minimisé.

## Mettre en place l'analyse statique

L'analyse statique permet de rechercher les mauvaises pratiques de codage et les failles de sécurité dans les langages et technologies suivants :

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br> 

Pour commencer, vous pouvez configurer l'analyse statique sur la page [**Code Analysis**][1] ou consulter la [documentation sur l'installation][9].

## Intégrer l'analyse statique dans le cycle de développement de vos logiciels

### Fournisseurs de CI
{{< whatsnext desc="Vous pouvez exécuter une analyse statique sur n'importe quel fournisseur de plateforme CI de votre choix. Consultez la documentation spécifique au fournisseur pour configurer l'analyse statique dans vos pipelines CI :">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Autres fournisseurs de CI{{< /nextlink >}}
{{< /whatsnext >}}

### Gestion du code source
{{< whatsnext desc="Lors des revues de code sur GitHub, Datadog peut automatiquement signaler les non conformités de l'analyse statique dans les pull requests en ajoutant des commentaires de revue en ligne sur les lignes de code concernées. Le cas échéant, Datadog fournit également des correctifs suggérés pouvant être appliqués directement dans la pull request. Vous pouvez aussi ouvrir une pull request directement depuis Datadog pour corriger une vulnérabilité ou un problème de qualité." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Pull Requests GitHub{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="Vous pouvez identifier des vulnérabilités dans le code en temps réel lors de l'édition d'un fichier dans votre environnement de développement intégré (IDE). Consultez la documentation spécifique à l'intégration pour plus d'informations :">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Module Datadog pour les IDE JetBrains{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Extension Datadog pour Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Extension Datadog pour Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Recherche et filtrage des résultats

Après avoir configuré vos pipelines CI pour exécuter l'analyseur statique Datadog, les non conformités sont résumées par référentiel sur la page [**Code Analysis Repositories**][1]. Cliquez sur un référentiel pour analyser les résultats de **Code Vulnerabilities** et de **Code Quality** de l'analyse statique. 

* L'onglet **Code Vulnerabilities** contient les non conformités trouvées par les règles de Datadog dans la [catégorie Security][2].
* L'onglet **Code Quality** contient les non conformités trouvées par les règles de Datadog dans les catégories [Best Practices, Code Style, Error Prone ou Performance][3].

Pour filtrer vos résultats, utilisez les facettes situées à gauche de la liste ou effectuez une recherche. Les résultats peuvent être filtrés par facettes de service ou d'équipe. Pour plus d'informations sur la façon dont les résultats sont liés aux services et équipes Datadog, consultez la section [Débuter avec Code Analysis][11].

Chaque ligne représente une non conformité. Chaque non conformité est associée au commit spécifique et à la branche sélectionnée dans les filtres en haut de la page (par défaut, les résultats sont affichés pour le dernier commit sur la branche par défaut du référentiel que vous consultez).

Cliquez sur une non conformité pour ouvrir un panneau latéral contenant des informations sur la portée de la non conformité et son origine.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="Panneau latéral pour une non conformité de l'analyse statique" style="width:80%;">}} 

Le contenu de la non conformité est affiché dans des onglets :

- **Details** : une description de la non conformité et les lignes de code qui l'ont causée. Pour voir l'extrait de code en question, configurez [l'app Datadog GitHub][4].
- **Remediation** : un ou plusieurs correctifs de code qui peuvent résoudre la non conformité, avec des options de remédiation.
- **Event** : métadonnées JSON concernant l'événement de non conformité de l'analyse statique.

### Utilisation des corrections suggérées
{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="Onglet Fixes d'une non conformité de l'analyse statique" style="width:80%;">}}

Dans Datadog Static Analysis, il existe deux types de suggestions de correction :

1. **Correctif suggéré par défaut :** pour les non conformités simples telles que les problèmes de linting, l'analyseur de règles fournit automatiquement des modèles de correction.
2. **Correctifs suggérés par l'IA :** pour les non conformités complexes, les corrections ne sont généralement pas disponibles à l'avance. A la place, vous pouvez utiliser les corrections suggérées par l'IA, qui utilisent le GPT-4 d'OpenAI pour générer une suggestion de correction. Vous pouvez choisir entre les correctifs "Text" et "Unified Diff", qui génèrent respectivement des instructions en texte clair ou une modification du code pour résoudre la non conformité.

Les deux types de correctifs sont distingués visuellement dans l'interface utilisateur par des tags différents.

*Corrections suggérées par défaut :*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="Indicateur visuel d'un correctif suggéré par défaut de l'analyse statique" style="width:60%;">}}

*Corrections suggérées par l'IA :*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="Indicateur visuel d'un correctif suggéré par l'IA de l'analyse statique" style="width:60%;">}}

<div class="alert alert-danger">Les corrections suggérées par l'IA sont en avant-première. Pour en demander l'accès, contactez le service d'assistance <a href="/help/">.</div>

### Correction d'une vulnérabilité ou d'un problème de qualité directement depuis Datadog
{{< img src="ci/sast_one_click_light.png" alt="Exemple de correction en un clic pour Code Analysis" style="width:90%;" >}}

Vous pouvez pousser une modification de code pour corriger un problème détecté par Code Analysis directement depuis un résultat dans Datadog, de deux manières.

#### Ouvrir une pull request 
Si l'autorisation **Pull Requests** de votre application GitHub est définie sur **Read & Write**, la correction en un clic est activée pour toutes les détections de Static Analysis disposant d'un correctif suggéré. Pour plus d'informations sur la configuration de l'intégration GitHub, consultez la section relative aux [Pull Requests GitHub][10].

Suivez ces étapes pour corriger une vulnérabilité et ouvrir une pull request :
1. Visualisez un résultat spécifique dans Code Analysis.
2. Cliquez sur **Fix Violation** dans le panneau latéral du résultat. 
3. Sélectionnez **Open a Pull Request**.
4. Entrez un titre pour la pull request et un message pour le commit.
5. Cliquez sur **Create PR**.

#### Valider directement dans la branche actuelle
Vous pouvez également corriger une vulnérabilité en validant directement dans la branche où le résultat a été détecté.

Pour valider un correctif suggéré :

1. Visualisez un résultat spécifique dans Code Analysis.
2. Cliquez sur **Fix Violation** dans le panneau latéral du résultat.
3. Cliquez sur **Commit to current branch**.

### Personnaliser votre configuration

Pour personnaliser les règles de Static Analysis configurées dans vos référentiels, consultez la [documentation relative à la configuration][8].

### Signaler des faux positifs
Si vous pensez qu'une non conformité spécifique est un faux positif, vous pouvez la signaler comme tel en indiquant la raison du signalement, ce qui envoie un rapport à Datadog. Les soumissions sont examinées régulièrement afin d'améliorer la qualité du jeu de règles au fil du temps.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="Bouton pour signaler une non conformité de Static Analysis comme faux positif" style="width:60%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /fr/code_analysis/static_analysis_rules?categories=Security
[3]: /fr/code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /fr/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /fr/code_analysis/static_analysis/setup/#customize-your-configuration
[9]: /fr/code_analysis/static_analysis/setup
[10]: /fr/code_analysis/github_pull_requests/
[11]: /fr/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries