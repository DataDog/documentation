---
aliases:
- /fr/bits_ai/bits_ai_dev_agent/
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: Blog
  text: Identifiez automatiquement les problèmes et générez des correctifs avec Bits
    Code
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Présentation de Bits Code pour Code Security
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits IA
title: Bits Code
---
## Présentation {#overview}

Bits Code est un assistant de codage IA génératif qui utilise les données d'observabilité Datadog pour diagnostiquer et corriger automatiquement les problèmes dans votre code. Il s'intègre aux [fournisseurs de code source](#supported-source-code-providers) pour créer des pull or merge requests prêtes pour la production, puis itère sur les modifications à l'aide des journaux CI et des commentaires des développeurs.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="Un onglet intitulé « Sessions » affiche un champ de texte avec des suggestions en dessous" style="width:100%;" >}}

Chaque fois que Bits Code étudie un problème ou génère un correctif, il crée une [session](#sessions), qui capture l'analyse de l'agent, ses actions et toutes les modifications de code résultantes dans les produits Datadog pris en charge. Configurez des [automatisations][28] pour que Bits Code exécute des sessions selon un calendrier ou en réponse à des signaux provenant d'autres produits Datadog, tels qu'une nouvelle APM Recommendation ou un test irrégulier.

Pour commencer avec Bits Code, [configurez une intégration de code source][6] et effectuez toute configuration supplémentaire. Ensuite, [démarrez votre première session](#start-a-session).

Découvrez comment votre utilisation de Bits Code est facturée sur [AI Credits][27].

## Sessions {#sessions}
Une session capture un segment de travail avec Bits Code, y compris son analyse et ses modifications de code. Démarrez, affichez et gérez vos sessions sur {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="Une session affichant un résumé Bits AI et une liste de tâches à gauche, et une comparaison de code à droite" style="width:100%;" >}}

### Démarrez une session {#start-a-session}
Après avoir [terminé la configuration][6], effectuez l'une des opérations suivantes pour démarrer une session Bits Code :
- Saisissez une invite libre dans [{{< ui >}}Sessions{{< /ui >}}][7] : saisissez une invite personnalisée ou générez-en une en cliquant sur une carte d'invite suggérée
- Faites appel à Bits Code dans un [produit Datadog pris en charge](#supported-datadog-products)
- Configurez une automatisation Bits Code [automation][28]

Une session peut également être créée lorsqu'un autre agent Bits AI (comme [Bits Chat][16] ou [Bits Investigation][17]) transfère une tâche de codage à Bits Code.

### Visibilité de la session {#session-visibility}

Les sessions Bits Code sont partagées par défaut au sein de votre organisation Datadog. Toute personne de votre organisation peut ouvrir une session pour examiner son analyse, ses actions et ses modifications de code, ou pour continuer à travailler avec Bits Code dans celle-ci. Cela facilite le partage du contexte et la reprise du travail en cours d'un coéquipier.

### Afficher et gérer les sessions {#view-and-manage-sessions}
Sur [{{< ui >}}Sessions{{< /ui >}}][7], le panneau {{< ui >}}My Sessions{{< /ui >}} affiche les sessions auxquelles vous participez. Une session apparaît ici si vous l'avez initiée ou si vous avez interagi avec elle d'une manière ou d'une autre, par exemple en participant à la conversation ou en créant une PR ou une MR associée. {{< ui >}}My Sessions{{< /ui >}} est une vue personnalisée, et non une limite de confidentialité ; c'est-à-dire que les autres membres de votre organisation peuvent toujours accéder à ces sessions.

Cliquez sur une session pour afficher ses détails et continuer à travailler avec Bits Code. Pour supprimer une session de votre liste {{< ui >}}My Sessions{{< /ui >}}, cliquez sur l'une des options suivantes :
- <i class="icon-eye-slashed-wui"></i> ({{< ui >}}Unwatch session{{< /ui >}}) : supprime la session uniquement de votre propre liste {{< ui >}}My Sessions{{< /ui >}}. Les autres utilisateurs ne sont pas affectés.
- <i class="icon-archive-wui"></i> ({{< ui >}}Archive for everyone{{< /ui >}}) : archive la session pour tous les utilisateurs de votre organisation.

## Fournisseurs de code source pris en charge {#supported-source-code-providers}
Bits Code prend en charge les fournisseurs de code source suivants :
- **GitHub** : GitHub.com, [GitHub Enterprise Cloud][30], [GitHub Enterprise Cloud with data residency][31] et [GitHub Enterprise Server][38].
- **GitLab** : GitLab.com et GitLab Self-Managed.
- **Azure DevOps Cloud** : [dev.azure.com et *.visualstudio.com][39].

Les plans suivants ne sont pas pris en charge :
- **Azure DevOps Server** : les instances sur site ne sont pas prises en charge par Bits Code ou Datadog [Source Code Integration][37].
- **Bitbucket** : ni Bitbucket.org, ni Bitbucket Data Center, ni Bitbucket Data Server (sur site) ne sont pris en charge par Bits Code. Datadog [Source Code Integration][37] ne prend pas en charge les déploiements Bitbucket sur site.

## Produits Datadog pris en charge {#supported-datadog-products}

Bits Code peut suggérer des améliorations de code au sein de plusieurs produits Datadog, notamment les suivants :

| Produit                   | Fonctionnalités                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Propose des modifications de code pour les [APM Recommendations][21] pertinentes|
| [Bits Investigation][17]         | Génère des remédiations de code basées sur les Bits Investigations |
| [Bits Chat][16]   | Suggère des modifications de code issues des conversations Bits Chat |
| [Cloud Cost][22]          | Génère des modifications de code pour les [Cloud Cost Recommendations][23] |
| [Cloud Security][34]      | Corrige les [misconfiguration findings][35] dans l'IaC qui définit la ressource concernée |
| [Error Tracking][1]       | Diagnostique les problèmes et génère des correctifs de code à la demande ou de manière autonome |
| [Code Security][2]        | Corrige les [SAST vulnerabilities][15], [IaC vulnerabilities][25] et [SCA vulnerabilities][26] (individuellement ou en masse)  |
| [Test Optimization][4]    | Fournit des correctifs de code pour les [flaky tests][24] et vérifie que les tests restent stables  |
| [Continuous Profiler][3]  | Fournit des modifications de code pour les insights [Automated Analysis][10]   |
| [Containers][12]          | Fournit des modifications de code pour les [Kubernetes Remediations][13]  |
| [Sensitive Data Scanner][36] | Génère des correctifs de code pour les journaux provoquant des fuites de données sensibles |

## Fonctionnalités clés {#key-capabilities}

### Correctifs et optimisations de code mis en évidence par les produits Datadog {#code-fixes-and-optimizations-surfaced-by-datadog-products}

À travers les [produits Datadog pris en charge](#supported-datadog-products), utilisez Bits Code pour implémenter des optimisations et des correctifs — par exemple, les [Cloud Cost Recommendations][23], les problèmes d'[Error Tracking][1] et les [SAST vulnerabilities][15]. Dans certains produits, [Bits Chat][16] explore et étudie les problèmes, puis transmet ses conclusions à Bits Code pour implémenter une modification de code.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="Un bouton portant le texte « Fix with Bits. »." style="width:25%" >}}

Vous pouvez demander manuellement à Bits Code d'implémenter des modifications pour une découverte spécifique, ou configurer une [automatisation][28] afin qu'il le fasse de manière autonome. 

### Tâches de codage générales {#general-coding-tasks}

Utilisez le champ de saisie libre à [{{< ui >}}Sessions{{< /ui >}}][7] pour travailler avec Bits Code sur des tâches de codage générales.

### Automations {#automations}

Les [automatisations][28] exécutent automatiquement des sessions Bits Code, selon un calendrier ou en réponse à des signaux provenant de produits Datadog tels que Error Tracking, APM ou Code Security. Une fois la session terminée, Bits Code transmet les résultats sous forme de pull or merge request (éventuellement en mode brouillon) ou de notification Slack.

Vous pouvez créer des automatisations à partir de déclencheurs (une découverte de produit, une invite personnalisée, un planning ou une combinaison) et configurer une ou plusieurs sorties. Des modèles fournis par Datadog sont également disponibles pour vous aider à démarrer. Créez et gérez des automatisations dans {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][29].

### Compétences et instructions personnalisées de l'agent {#custom-agent-skills-and-instructions}

Bits Code peut utiliser des compétences personnalisées définies dans votre dépôt. Il détecte les compétences formatées comme `<skill-name>/SKILL.md` dans les répertoires `.claude/skills/`, `.codex/skills/` et `.gemini/skills/`. Les compétences doivent contenir les clés YAML `name` et `description` en en-tête.

Bits Code invoque automatiquement les compétences appropriées en fonction de leurs valeurs `name` et `description`, et vous pouvez encourager leur utilisation en mentionnant les compétences dans votre [fichier d'instructions personnalisées][33]. Vous pouvez également demander à Bits Code d'utiliser directement une compétence spécifique.

Bits Code intègre également les [instructions personnalisées][33] définies dans votre dépôt et dans les paramètres de Bits Code.

### Collaboration sur les pull requests ou les merge requests {#pull-or-merge-request-collaboration}

Bits Code s'intègre aux [fournisseurs de code source](#supported-source-code-providers) pour :
- Créer des pull requests ou des merge requests en générant des titres et des descriptions à partir du modèle utilisé par votre référentiel
- Itérez sur les pull requests en réponse aux commentaires (GitHub uniquement) ; mentionnez `@Datadog` dans un commentaire pour inviter Bits à effectuer des mises à jour
- Surveillez les logs CI et l'état des pull requests ou merge requests pour corriger les échecs et les blocages de fusion.

Bits Code ne fusionne jamais automatiquement les PR ou les MR. Consultez toutes les PRs ou MRs sur lesquelles Bits Code travaille dans {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7].

## Limitations {#limitations}

- Bits Code est un produit d'IA, ce qui signifie qu'il peut commettre des erreurs. Appliquez les meilleures pratiques lors de la révision et du test du code généré par l'agent.  
- Bits Code ne prend pas en charge les investigations multi-dépôts.
- Lors de l'utilisation de GitLab, la mention de `@Datadog` dans un commentaire pour inviter Bits à effectuer des mises à jour n'est pas prise en charge.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/error_tracking
[2]: /fr/security/code_security
[3]: /fr/profiler/
[4]: /fr/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /fr/bits_ai/bits_code/setup/
[7]: https://app.datadoghq.com/code
[8]: /fr/bits_ai/bits_investigation/
[10]: /fr/profiler/automated_analysis/
[12]: /fr/containers/
[13]: /fr/containers/bits_ai_kubernetes_remediation
[15]: /fr/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /fr/bits_ai/bits_chat/
[17]: /fr/bits_ai/bits_investigation/
[20]: /fr/tracing/
[21]: /fr/tracing/recommendations/
[22]: /fr/cloud_cost_management/
[23]: /fr/cloud_cost_management/recommendations
[24]: /fr/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /fr/security/code_security/iac_security/
[26]: /fr/security/code_security/software_composition_analysis/
[27]: /fr/account_management/billing/ai_credits/
[28]: /fr/bits_ai/bits_code/automations/
[29]: https://app.datadoghq.com/code/automations
[34]: /fr/security/cloud_security_management/
[35]: /fr/security/cloud_security_management/review_remediate/remediate_with_ai/
[36]: /fr/security/sensitive_data_scanner/
[30]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
[31]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud#about-data-residency
[32]: https://docs.gitlab.com/subscriptions/gitlab_dedicated/
[33]: /fr/bits_ai/bits_code/setup/#configure-custom-instructions
[37]: /fr/source_code/source-code-management#source-code-management-providers
[38]: https://docs.github.com/en/enterprise-server@3.17/admin/overview/about-github-enterprise-server
[39]: https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops