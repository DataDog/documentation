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
  text: Découvrez comment configurer Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrez comment interroger et visualiser les déploiements
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrez les fonctionnalités de CD Visibility
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance CI/CD
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
title: Continuous Delivery Visibility
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility offre une visibilité sur vos déploiements. CD Visibility intègre les métriques et les données de déploiement dans Datadog afin que vous puissiez rendre compte de l'état de vos déploiements et concentrer vos efforts sur l'amélioration de la capacité de votre équipe à livrer systématiquement du code de qualité.

Avec CD Visibility, vous pouvez surveiller les déploiements dans les environnements de CD en suivant chaque événement de déploiement. Vous pouvez comprendre les changements déployés et leur impact sur vos services.

## Gagnez en efficacité grâce à des intégrations fluides {#increase-efficiency-through-seamless-integrations}

Datadog s'intègre aux [fournisseurs CI][3] et aux fournisseurs de CD comme [Argo CD][4] pour suivre les performances d'exécution et les résultats de vos déploiements.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Utilisez les données agrégées au fil du temps pour identifier les tendances et améliorer vos stratégies de déploiement afin d'accroître l'efficacité opérationnelle.

## Prêt à commencer ? {#ready-to-start}

Consultez [Deployment Visibility][1] pour obtenir des instructions sur la configuration de CD Visibility avec vos fournisseurs de CD, des informations sur les exigences de compatibilité ainsi que les étapes à suivre pour instrumenter et configurer la collecte des données. Consultez [Explore CD Visibility Deployments][2] pour comprendre comment interroger et visualiser les déploiements.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_delivery/deployments
[2]: /fr/continuous_delivery/explorer
[3]: /fr/continuous_delivery/deployments/ciproviders
[4]: /fr/continuous_delivery/deployments/argocd