---
aliases:
- /fr/continuous_integration/guides/github_gating
description: Découvrez comment utiliser les monitors Datadog pour effectuer des contrôles
  de qualité avant le déploiement de vos applications GitHub.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Surveiller les workflows GitHub Actions avec la solution CI Visibility
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/
  tag: Documentation
  text: Activer les résumés des tests dans les pull requests GitHub
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Détecter les checks de qualité ayant échoué avec Datadog et les règles de
    protection de déploiement de GitHub
kind: guide
title: Contrôler la progression de vos déploiements GitHub Actions grâce aux monitors
  Datadog
---

## Présentation

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog possède le statut de partenaire d'intégration en ce qui concerne les [règles de protection de déploiement de GitHub Actions][10]. Nous vous aidons ainsi à fournir des applications de qualité optimale à vos clients finaux. Vous pouvez appliquer des murs de qualité à vos workflows de déploiement GitHub Actions à l'aide des monitors Datadog.

Ces fonctionnalités sont disponibles pour tous les clients Datadog disposant de l'offre Enterprise Cloud GitHub. Elles ne nécessitent pas d'utiliser la solution CI Visibility.

## Activer des règles de protection de déploiement
Pour pouvoir tirer profit de la plateforme Datadog afin d'effectuer des contrôles de qualité sur les déploiements d'application, vous devez avoir activé la fonctionnalité de règles de protection de déploiement pour votre application.

### Configurer une nouvelle application GitHub dans Datadog

Suivez [ces instructions][1] pour créer une application GitHub qui se connecte automatiquement à Datadog. N'oubliez pas de cocher la case **Deployment Protection Rules**.

{{< img src="ci/github_gates_new_app.png" alt="Aperçu d'un commentaire Datadog sur une pull request GitHub" style="width:100%;">}}

Si vous avez déjà configuré une application GitHub et qu'elle est connectée à Datadog, rendez-vous sur le [carré d'intégration GitHub][2] dans l'application pour activer les règles de protection de déploiement.

{{< img src="ci/github_gates_existing_app.png" alt="Aperçu d'un commentaire Datadog sur une pull request GitHub" style="width:100%;">}}

### Configurer des règles de protection de déploiement dans GitHub
1. Activez l'accès en lecture et en écriture pour les déploiements.
2. Activez l'accès en lecture pour les actions.
3. Sous la section **Subscribe to events** d'une application, cochez la case **Deployment protection rule**.
4. Dans un référentiel, cliquez sur **Settings**. Àla section **Code and Automation**, cliquez sur **Environments**. Sous **Deployment Protection Rules**, activez l'application GitHub connectée à l'intégration Datadog.

## Créer des monitors pour contrôler la progression de vos déploiements

Suivez [ces instructions][3] pour créer et configurer un monitor Datadog afin de l'utiliser pour contrôler la progression d'un déploiement GitHub Actions.

Vous pouvez utiliser plusieurs monitors distincts pour effectuer des contrôles de qualité. Toutefois Datadog vous recommande plutôt d'utiliser des [monitors composite][4], car ils vous permettent de contrôler la progression de déploiements basés sur plusieurs signaux à l'aide d'un seul monitor. Pour en savoir plus, consultez la section [Types de monitors][5].

Vous devez appliquer les tags suivants à l'ensemble des monitors qui serviront à créer des murs de qualité :
- `git_env` 
- `git_repo` 

Le tag `git_repo` doit contenir le nom du propriétaire du référentiel au format `<PROPRIÉTAIRE>/<RÉFÉRENTIEL>`. Exemple : `Datadog/my-repo`.

Lorsque vous exécutez un workflow, GitHub Actions envoie une requête à votre monitor Datadog. L'évaluation du monitor donne lieu à l'un des résultats décrits ci-dessous. En fonction de ce résultat, Datadog renvoie un commentaire à GitHub. Celui-ci est inclus dans la section **Comment** correspondant à l'événement et à l'environnement associés au workflow exécuté.
- Si tous les monitors associés à votre déploiement (via les tags d'environnement et de référentiel) possèdent l'état `OK`, Datadog approuve le déploiement.
- Si un monitor associé à votre déploiement ne possède pas l'état `OK` (mais plutôt l'état `ALERT`, `WARN` ou `NODATA`), Datadog rejette le déploiement.

## Exemples de contrôles de qualité
### Performances de l'application
Pour vérifier que le taux d'erreurs et/ou la latence moyenne de votre application ne dépassent pas certains seuils avant un déploiement, vous pouvez utiliser des [monitors APM][7].

### Santé de l'infrastructure de l'environnement
Pour vérifier le niveau d'utilisation du processeur et/ou de la mémoire de votre application ou service avant son déploiement, utilisez une [integration][8] et des [monitors de métrique][9].

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /fr/integrations/github/
[3]: /fr/monitors/configuration/?tab=thresholdalert
[4]: /fr/monitors/types/composite/ 
[5]: /fr/monitors/types/
[6]: /fr/monitors/settings/
[7]: /fr/monitors/types/apm/?tab=apmmetrics
[8]: /fr/monitors/types/integration/?tab=checkalert 
[9]: /fr/monitors/types/metric/?tab=threshold
[10]: https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/