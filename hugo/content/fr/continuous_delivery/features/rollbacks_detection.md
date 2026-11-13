---
description: Découvrez comment CD Visibility détecte les retours en arrière liés aux
  déploiements.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrez comment interroger et visualiser les déploiements
title: Détection de retour en arrière
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la Preview !" >}}
CD Visibility est en préversion. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Savoir quand des déploiements spécifiques effectuent un retour en arrière est utile pour :
- Comprendre la stabilité des déploiements et la fréquence des retours en arrière sur vos services.
- Identifier les modèles de problèmes de déploiement qui conduisent à des retours en arrière.

Pour détecter les retours en arrière, Datadog compare la version de déploiement actuelle avec les versions précédentes déployées pour le même service et le même environnement. Un retour en arrière est identifié lorsque les deux conditions suivantes sont remplies :
- La version actuelle est différente de la version précédente. Cela garantit que le redéploiement de la même version ne constitue pas un retour en arrière.
- La version actuelle correspond à une version précédemment déployée.

Vous pouvez rechercher les déploiements ayant fait l'objet d'un retour en arrière dans [Deployment Executions][1], en utilisant le tag `@deployment.is_rollback` :

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Indicateur de retour en arrière sur la page Deployment Executions" style="width:100%;">}}

Vous pouvez également voir des informations plus détaillées dans le détail de l'événement :

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Détail du retour en arrière" style="width:100%;">}}

## Prérequis {#requirements}

La détection des retours en arrière fonctionne pour les déploiements qui présentent tous les éléments suivants :
- Un service (`@deployment.service`)
- Un environnement (`@deployment.env`)
- Un identifiant de version (`@deployment.version`)

### Version pour les fournisseurs basés sur le CI {#version-for-ci-based-providers}
Pour les fournisseurs basés sur le CI, Datadog utilise le paramètre `--revision` que vous transmettez à la commande `datadog ci`. Ce paramètre doit contenir l'identifiant de version de votre déploiement (tel qu'un SHA de commit, un tag d'image ou un numéro de version).

### Version pour Argo CD {#version-for-argo-cd}
Pour les déploiements Argo CD, Datadog utilise la version des images corrélées pour détecter les retours en arrière. Datadog identifie l'image « principale » de votre déploiement et en extrait le tag de version.

Pour activer la détection de retour en arrière pour les déploiements Argo CD, vous devez corréler vos images avec des commits en utilisant la [commande `datadog-ci deployment correlate-image`][2] comme expliqué dans la [documentation de surveillance d'Argo CD][3]. La corrélation d'images nécessite Argo CD v3.1.0 ou une version ultérieure.

Lorsque les images sont correctement corrélées, Datadog renseigne un tag de version à partir des métadonnées de l'image, qui est ensuite utilisée pour la détection de retour en arrière.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /fr/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines