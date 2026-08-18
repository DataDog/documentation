---
description: Découvrez comment CD Visibility détecte les rollbacks de déploiement.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
title: Détection des rollbacks
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

L'identification des rollbacks pour des déploiements spécifiques présente différents avantages :
- Cela permet de surveiller la stabilité des déploiements et la fréquence de rollback de l'ensemble de vos services.
- Cela permet de détecter des tendances à propos des problèmes de déploiement qui entraînent des rollbacks.

Pour détecter les rollbacks, Datadog compare la version actuelle d'un déploiement avec les versions précédentes déployées pour le même service et le même environnement. Datadog considère qu'un rollback a lieu lorsque les deux affirmations suivantes sont vérifiées :
- La version actuelle est différente de la version précédente. Cela garantit que le redéploiement de la même version ne constitue pas un rollback.
- La version actuelle correspond à une version précédemment déployée.

Vous pouvez rechercher les déploiements en rollback sur la page [Deployment Executions][1] à l'aide du tag `@deployment.is_rollback` :

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Indicateur de rollback sur la page Deployment Executions" style="width:100%;">}}

Vous pouvez également consulter des informations plus précises dans les détails de l'événement :

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Détails d'un rollback" style="width:100%;">}}

## Prérequis

La détection des rollbacks fonctionne pour les déploiements qui présentent tous les éléments suivants :
- Un service (`@deployment.service`)
- Un environnement (`@deployment.env`)
- Un identifiant de version (`@deployment.version`)

### Version pour les fournisseurs de CI
Pour les fournisseurs de CI, Datadog utilise le paramètre `--revision` que vous passez à la commande `datadog ci`. Ce paramètre doit contenir l'identifiant de version de votre déploiement (tel qu'un SHA de commit, un tag d'image ou un numéro de version).

### Version pour Argo CD
Pour les déploiements Argo CD, Datadog utilise la version des images corrélées pour détecter les rollbacks. Datadog identifie l'image « principale » de votre déploiement et en extrait le tag de version.

Pour activer la détection des rollbacks pour les déploiements Argo CD, vous devez corréler vos images avec les commits à l'aide de la commande [`datadog-ci deployment correlate-image` [2], comme expliqué dans la [documentation sur la surveillance d'Argo CD][3].

Lorsque les images sont correctement corrélées, Datadog récupère un tag de version à partir des métadonnées de l'image. Ce tag est alors utilisé pour la détection des rollbacks.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /fr/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines