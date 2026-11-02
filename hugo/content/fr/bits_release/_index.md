---
description: Découvrez comment Bits Release valide vos pull requests en production
  après le déploiement et indique si le changement s'est comporté comme prévu.
further_reading:
- link: https://www.datadoghq.com/blog/bits-release/
  tag: Blog
  text: Validez chaque version en production avec Bits Release
- link: /bits_ai/bits_code/
  tag: Documentation
  text: Automatisez les correctifs de code avec Bits Code
- link: /integrations/github/
  tag: Documentation
  text: Configurez la Datadog GitHub App
- link: /source_code/service-mapping/
  tag: Documentation
  text: Associez vos services au code source avec le mappage de services
title: Bits Release
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-release/" >}}
  Bits Release est en Preview. Cliquez sur {{< ui >}}Request Access{{< /ui >}} pour rejoindre le programme Preview.
{{< /callout >}}

Bits Release valide qu'une pull request fusionnée se comporte comme prévu en production. Il détermine ce que votre changement était censé faire, surveille le service une fois ce changement déployé et communique son verdict sur la pull request et dans Slack.

Les checks standard lors d'une mise en production couvrent rarement le comportement spécifique visé par un changement. Un dashboard surveillé pendant quelques minutes montre que le service est opérationnel, et une alerte peut ne jamais se déclencher pour la fonctionnalité que vous avez modifiée. Ainsi, un changement déployé alors qu'il est défectueux ou sans aucun effet peut passer inaperçu pendant des jours. Bits Release vérifie ce comportement directement, à chaque fusion.

Bits Release ne modifie pas votre code et n'ajoute pas d'instrumentation permanente. Il lit les données d'observabilité que vous envoyez déjà à Datadog. Lorsqu'un check doit s'exécuter dans la durée, il crée des ressources temporaires et les supprime une fois la validation terminée.

{{< img src="bits_release/bits_release_demo.mp4" alt="Vidéo présentant une validation Bits Release : une pull request fusionnée est déployée en production, la validation démarre et un verdict arrive avec les preuves à l'appui." video="true" style="width:100%;" >}}

## Comment fonctionne Bits Release {#how-bits-release-works}

1. **Détecter la fusion**: Bits Release détecte une pull request lorsqu'elle est fusionnée dans la branche par défaut d'un dépôt concerné.
2. **Analyser le changement**: Il lit le changement de code ainsi que vos données de production pour déterminer l'objectif du changement : l'effet qu'il devrait avoir en production une fois déployé (impact attendu) et le comportement qu'il devrait laisser intact (risque de régression attendu).
3. **Attente du déploiement**: La validation attend que Bits Release confirme que les modifications de votre pull request sont exécutées en production.
4. **Évaluation de la production**: Bits Release compare le comportement observé en production au comportement attendu jusqu'à ce qu'il parvienne à un verdict. Il communique ensuite le verdict sous forme de commentaire sur la pull request, de notification Slack et de rapport complet dans Datadog.

La validation s'exécute sur votre environnement de production.

### Sources de données pour Bits Release {#data-sources-for-bits-release}

Bits Release ne nécessite pas de source de données dédiée. Il valide votre modification à l'aide des données de télémétrie de base que vos services envoient déjà à Datadog, principalement les [logs][3] et les traces [APM][4] pour les services backend, ainsi que les données [RUM][5] pour les interfaces web, et s'adapte aux fonctionnalités activées pour chaque service.

La couverture suit votre instrumentation. Une modification du backend d'un service doté d'APM et de logs fournit des preuves plus solides qu'une modification du frontend d'une application sans RUM.

## Verdicts {#verdicts}

Une validation aboutit à l'un des quatre verdicts suivants. **Passed** et **Failed** sont des conclusions concernant votre modification. **Not enough data** et **Inconclusive** signifient que Bits Release n'a pas pu tirer de conclusion et nécessitent votre attention.

| Verdict | Signification |
| ------- | ------- |
| **Passed** | Votre service est sain après le déploiement. Si votre modification était censée produire certains effets, Bits Release a également constaté qu'au moins l'un d'eux s'est produit. Un service sain ne suffit pas à lui seul pour valider une modification censée avoir un effet visible. Pour une modification sans effet précis à rechercher, un service sain suffit. |
| **Failed** | Bits Release dispose de preuves claires que quelque chose ne va pas : votre modification a provoqué une régression, ou le code modifié a été exécuté et l'effet souhaité est absent ou a évolué dans le mauvais sens. Par exemple, le bug que vous avez corrigé se produit toujours, la latence ou le taux d'erreur que vous vouliez améliorer n'a pas diminué, ou une nouvelle fonctionnalité génère des erreurs. |
| **Not enough data** | La production n'a pas fourni assez d'informations à Bits Release pour juger. Soit aucune télémétrie pertinente n'est arrivée, soit trop peu de requêtes ont atteint le code modifié pour tirer une conclusion. Cela couvre également le cas d'un service sain pour lequel rien n'a confirmé l'effet attendu, par exemple parce que votre modification a été déployée pendant les heures creuses, se trouve derrière un Feature Flag toujours désactivé ou concerne un chemin qui n'a reçu aucun trafic pendant la surveillance de Bits Release. |
| **Inconclusive** | Il y avait suffisamment de données, mais elles pointent dans des directions différentes, ou il est impossible d'attribuer avec certitude ce qu'elles révèlent à votre modification plutôt qu'à un autre événement survenu au même moment. |

Pendant qu'une validation est en cours, elle s'affiche comme **In Progress**. Elle s'affiche comme **Pending** lorsque Bits Release a déjà une réponse provisoire mais la retient, car la fenêtre de surveillance est encore courte ou un signal dont il a besoin n'est pas arrivé. Dans les deux cas, Bits Release poursuit la surveillance et vous informe dès qu'il dispose de plus d'informations.

Bits Release signale comment la production se comporte après une modification. Il n'identifie pas le code à corriger. Utilisez le contexte recueilli lors de la validation (l'impact attendu, les preuves étayant le verdict et la télémétrie lue) comme point de départ pour une correction. Transmettez le verdict à [Bits Code][1] pour qu'il mène l'enquête et ouvre une pull request, ou utilisez ce contexte dans vos propres outils de codage IA.

## Prérequis {#prerequisites}

Bits Release lit le code que vous avez fusionné et détecte quand ce code est en production. Il ne prend en charge que les dépôts GitHub. Les dépôts hébergés sur GitLab, Azure DevOps ou Bitbucket ne sont pas pris en charge.

### Requis {#required}

| Exigence | Pourquoi c'est nécessaire |
| ----------- | ---------------- |
| La [GitHub App][2] de Datadog installée sur les dépôts concernés, avec `Contents: Read` et `Pull Requests: Write` | `Contents: Read`, permet à Bits Release de lire la modification de code qu'il valide. `Pull Requests: Write` lui permet de publier le plan de validation et le verdict sur la pull request, là où la plupart des développeurs voient le résultat. |
| Un tag `version` sur les services concernés | Identifie chaque déploiement, afin que Bits Release puisse détecter tout nouveau déploiement. Les services le signalent avec leur télémétrie [APM][4] ou [RUM][5]. |
| Le SHA du commit déployé à chaque déploiement | Relie un déploiement au code que vous avez fusionné, ce qui déclenche la validation. Signalez-le soit sous forme de tag `git.commit.sha` dans la télémétrie du service, soit sous forme de SHA contenu dans le tag `version`. Consultez le [mappage de services][8] pour configurer cela. |

### Recommandé {#recommended}

| Exigence | Ce qu'il ajoute |
| ----------- | ------------ |
| [Intégration Slack][6] | Avertit directement l'auteur de la pull request lorsqu'un verdict est prêt, au lieu de compter sur lui pour consulter le commentaire de la pull request. |
| Un [test Synthetic][7] existant pour le domaine de votre application | Permet à Bits Release de valider une modification en appelant activement votre application plutôt qu'en attendant du trafic réel. Il réutilise le point d'entrée et la méthode de connexion que votre test existant établit déjà. |

## Où les résultats apparaissent {#where-results-appear}

- **Commentaires de pull request**: Bits Release publie le plan de validation après analyse, puis un commentaire séparé avec le verdict une fois l'évaluation terminée, afin que le verdict génère une nouvelle notification pour l'auteur.
- **Slack**: L'auteur de la pull request est averti lorsqu'un verdict est prêt.
- **Bits Release dans Datadog**: La page Bits Release contient le rapport complet : la liste des validations, la chronologie du cycle de vie de chaque plan, le verdict et sa justification, les impacts attendus et les éléments qui les étayent, ainsi que des graphiques de métriques annotés avec le marqueur de déploiement. Pendant la Preview, accédez-y via le lien dans le commentaire de votre pull request. Elle n'est pas disponible dans la navigation latérale de Datadog.

## Facturation {#billing}

Bits Release est gratuit pendant la Preview. Il ne consomme pas d'[AI Credits][9], et les ressources temporaires qu'il crée lors de la validation d'un changement ne sont pas facturées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_code/
[2]: /fr/integrations/github/
[3]: /fr/logs/
[4]: /fr/tracing/trace_collection/
[5]: /fr/real_user_monitoring/
[6]: /fr/integrations/slack/
[7]: /fr/synthetics/
[8]: /fr/source_code/service-mapping/
[9]: /fr/account_management/billing/ai_credits/