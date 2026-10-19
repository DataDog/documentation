---
aliases:
- /fr/quality_gates/
- /fr/quality_gates/explorer/
- /fr/quality_gates/explorer/search_syntax/
- /fr/quality_gates/explorer/facets/
- /fr/quality_gates/explorer/saved_views/
- /fr/quality_gates/search/
- /fr/quality_gates/guide/
- /fr/quality_gates/guide/understanding_rule_scopes/
- /fr/pr_gates/explorer/
- /fr/pr_gates/explorer/search_syntax/
- /fr/pr_gates/explorer/facets/
- /fr/pr_gates/explorer/saved_views/
- /fr/pr_gates/search/
- /fr/pr_gates/guide/
- /fr/pr_gates/guide/understanding_rule_scopes/
description: Apprenez à utiliser les PR Gates pour permettre à votre équipe de contrôler
  quel code est déployé en production.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate/
  tag: Documentation
  text: Configurez un New Flaky Test PR Gate.
- link: https://www.datadoghq.com/blog/azure-devops-source-code-integration/
  tag: Blog
  text: Identifiez et corrigez les problèmes de code plus rapidement avec l'intégration
    Source Code Azure DevOps de Datadog.
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Repérez les erreurs de configuration CI/CD avant que les bots ne le fassent
    : sécurisez GitHub Actions avec Datadog IaC Security.'
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: Blog
  text: Améliorez la fiabilité du code avec les Quality Gates de Datadog.
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Utilisez les monitors Datadog comme Quality Gates pour les déploiements GitHub
    Actions.
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: Blog
  text: 'Tests instables : leurs coûts cachés et comment remédier au comportement
    instable'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Empêchez les erreurs de configuration cloud d'atteindre la production avec
    Datadog IaC Security.
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
is_beta: false
title: PR Gates
---
## Présentation {#overview}

Les PR Gates vous permettent de contrôler la sécurité et la qualité des logiciels en configurant des règles pour empêcher la fusion des pull requests (PR) contenant du code non conforme. Empêcher la fusion des pull requests (PR) contenant du code non conforme peut garantir que le code finalement déployé en production respecte des normes organisationnelles élevées, réduisant ainsi les incidents et minimisant les comportements indésirables.

{{< img src="pr_gates/setup/sca_4.png" alt="Une règle SCA qui déclenche un échec si des vulnérabilités de bibliothèque de gravité critique ou élevée sont détectées dans le dépôt." style="width:100%" >}}

Les PR Gates, similaires aux [Datadog Monitors][9], consomment les données et les résultats produits par les produits Datadog compatibles et appliquent des conditions à ces résultats pour déterminer si une PR répond à vos normes organisationnelles. Pour éviter d'impacter inutilement la vélocité de vos développeurs, les PR Gates ne bloquent que les violations introduites par les modifications de code de la PR en question, et non les résultats qui existaient déjà dans votre dépôt avant la création de la PR et de sa branche. Par exemple, si vous configurez les PR Gates pour bloquer les vulnérabilités de code de gravité critique, les PR Gates échouent et bloquent la PR uniquement si un développeur introduit une nouvelle vulnérabilité de code critique dans le cadre de cette PR.

Vous pouvez configurer des règles PR Gates pour les catégories suivantes. Veuillez noter que le produit compatible doit être en cours d'exécution sur vos dépôts souhaités avant que les PR Gates ne puissent commencer à agir sur les PR concernées : 

| Type de source     | Types de conditions |
| --- | ----------- |
| [**Static Code Analysis (SAST)**][1] | - Vulnérabilités de code<br/> - Violations de la qualité du code |
| [**Software Composition Analysis**][2] | - Vulnérabilités de bibliothèque<br/> - Violations de licence de bibliothèque |
| [**Code Coverage**][3] | - Couverture de code globale<br/> - Couverture de code de correctif |
| [**Analyse de l'infrastructure en tant que code**][4] | - Vulnérabilités IaC |
| [**Secret Scanning**][10] | - Secrets divulgués |
| [**Nouveaux tests instables**][11] | - Nouveaux tests instables |

Après avoir créé des règles PR Gates, Datadog crée automatiquement des checks sur vos pull requests en utilisant les intégrations [GitHub][5], [GitLab Source Code][13], [Azure DevOps Source Code][6] ou [Bitbucket Cloud Source Code][14]. Pour appliquer les PR Gates, définissez ces checks comme requis dans GitHub, Azure DevOps ou Bitbucket Cloud lorsque vous êtes prêt à les appliquer. Dans GitLab, définissez le compte de service Datadog comme approbateur requis sur les merge requests. Voir [Configurer les règles PR Gate][15].

Les PR Gates permettent également les réactions par emoji (similaires aux [commentaires de PR][12]). Datadog publie une réaction 👀 sur la description de la PR lorsqu'un produit Datadog doté de PR Gates attend toujours l'arrivée des résultats. Une fois que tous les résultats sont arrivés :
  * Si tous les résultats sont positifs, la réaction est remplacée par 👍.
  * Si au moins une anomalie est détectée, la réaction 👀 est supprimée car le commentaire récapitulatif inclut des détails sur les anomalies à la place.

<div class="alert alert-warning">
  Les PR Gates ne sont pas pris en charge sur les pull requests ciblant une branche de destination située dans un dépôt différent de celui de la branche source (c'est-à-dire les dépôts issus d'un fork essayant de fusionner dans le dépôt principal). Les PR Gates ne peuvent pas être définis comme requis sur les dépôts GitHub utilisant une file d'attente de fusion.
</div>

## Types de règles {#rule-types}

Les PR Gates proposent les types de règles suivants :

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsque les lignes modifiées d'une pull request introduisent au moins une nouvelle vulnérabilité de code ou une violation de la qualité du code d'une certaine gravité.

{{< img src="pr_gates/setup/static_analysis_4.png" alt="Une règle PR Gate qui échoue lorsqu'une ou plusieurs nouvelles violations de la qualité du code de niveau erreur sont contenues dans le dépôt" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis (SCA)" %}}

Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsque les lignes modifiées d'une pull request introduisent au moins une nouvelle vulnérabilité de bibliothèque d'une certaine gravité ou au moins une nouvelle bibliothèque avec une licence interdite.

{{< img src="pr_gates/setup/sca_4.png" alt="Une règle PR Gate qui échoue lorsqu'une ou plusieurs vulnérabilités de bibliothèque de gravité critique ou élevée sont contenues dans le dépôt" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsque les lignes modifiées d'une pull request entraînent une baisse de la couverture de code globale du dépôt en dessous d'un certain pourcentage ou si la couverture de patch de ces lignes est inférieure à un certain seuil.

{{< img src="pr_gates/setup/code_coverage_2.png" alt="Une règle PR Gate qui échoue lorsqu'une ou plusieurs vulnérabilités de bibliothèque de gravité critique ou élevée sont contenues dans le dépôt" style="width:80%" >}}

{{% /tab %}}

{{% tab "Analyse de l'infrastructure en tant que code" %}}
Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsque les lignes modifiées d'une pull request introduisent au moins une nouvelle vulnérabilité d'infrastructure en tant que code (IaC) d'une certaine gravité.

{{< img src="pr_gates/setup/iac_2.png" alt="Une règle PR Gate qui échoue lorsqu'une ou plusieurs vulnérabilités de bibliothèque de gravité critique ou élevée sont contenues dans le dépôt" style="width:80%" >}}

{{% /tab %}}

{{% tab "Secret Scanning" %}}
Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsque les lignes modifiées d'une pull request introduisent au moins un nouveau secret divulgué d'une certaine gravité.

{{< img src="pr_gates/setup/secret_scanning.png" alt="Une règle PR Gate qui échoue lorsqu'un ou plusieurs secrets divulgués de gravité critique ou élevée sont détectés dans le dépôt." style="width:80%" >}}

{{% /tab %}}

{{% tab "Nouveaux tests instables" %}}
Vous pouvez créer des règles pour empêcher la fusion de modifications de code lorsqu'une pull request introduit au moins un nouveau test instable.

{{< img src="pr_gates/setup/flaky_tests.png" alt="Une règle PR Gate qui échoue lorsqu'une pull request introduit au moins un nouveau test instable." style="width:80%" >}}

Utilisez cette PR Gate avec la [détection précoce des instabilités][1] pour détecter les nouveaux tests instables.

Lisez [comment configurer une PR Gate pour les nouveaux tests instables][2].

[1]: /fr/tests/flaky_tests/early_flake_detection
[2]: /fr/tests/guides/setup_new_flaky_pr_gate/
{{% /tab %}}
{{< /tabs >}}

Pour créer une règle PR Gate, consultez la [documentation de configuration][7]. 

## Gérer les règles {#manage-rules}

Vous pouvez gérer et mettre à jour les règles PR Gate sur la page [{{< ui >}}PR Gates Rules{{< /ui >}}][8]. Améliorez vos pratiques de sécurité et de qualité en fonction des exigences de votre projet et de vos tolérances au risque. 

Vous pouvez voir toutes les règles définies par l'organisation.

{{< img src="pr_gates/rules_list_3.png" alt="Liste des règles PR Gate dans Datadog" style="width:100%" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/static_analysis
[2]: /fr/security/code_security/software_composition_analysis
[3]: /fr/code_coverage/
[4]: /fr/security/code_security/iac_security/
[5]: /fr/integrations/github/
[6]: /fr/integrations/azure_devops_source_code/
[7]: /fr/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates
[9]: /fr/monitors/
[10]: /fr/security/code_security/secret_scanning/
[11]: /fr/tests/flaky_tests/
[12]: /fr/source_code/features/#pr-comments
[13]: /fr/integrations/gitlab-source-code/
[14]: /fr/integrations/bitbucket-source-code/
[15]: /fr/pr_gates/setup/