---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
    - deployment visibility
    - deployments
    - deployment executions
disable_sidebar: true
further_reading:
- link: continuous_delivery/deployments
  tag: Documentation
  text: Découvrir comment configurer Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrir les fonctionnalités de CD Visibility
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance CI/CD
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de la livraison de logiciels (connexion à
    l'application requise).
title: Continuous Delivery Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility offre une observabilité sur vos déploiements. CD Visibility intègre les métriques et données de déploiement dans Datadog afin que vous puissiez communiquer l'état de santé de vos déploiements et concentrer vos efforts sur l'amélioration de la capacité de votre équipe à fournir du code de qualité à chaque fois.

Avec CD Visibility, vous pouvez surveiller les déploiements dans les environnements CD en suivant chaque événement de déploiement. Vous pouvez comprendre les modifications déployées et leur impact sur vos services.

## Gagner en efficacité grâce aux intégrations directes

Datadog s'intègre aux [fournisseurs CI][3] et aux fournisseurs CD comme [Argo CD][4] pour suivre les performances d'exécution et les résultats de vos déploiements.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Utilisez les données agrégées au fil du temps pour identifier les tendances et améliorer vos stratégies de déploiement afin d'améliorer l'efficacité opérationnelle.

## Prêt à vous lancer ?

Consultez [Deployment Visibility][1] pour obtenir des instructions sur la configuration de CD Visibility avec vos fournisseurs CD, des informations sur les exigences de compatibilité et les étapes d'instrumentation et de configuration de la collecte de données. Consultez [Explorer les déploiements CD Visibility][2] pour comprendre comment interroger et visualiser les déploiements.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_delivery/deployments
[2]: /fr/continuous_delivery/explorer
[3]: /fr/continuous_delivery/deployments/ciproviders
[4]: /fr/continuous_delivery/deployments/argocd