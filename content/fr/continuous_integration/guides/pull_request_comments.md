---
description: Découvrez comment générer automatiquement des résumés des résultats de
  test dans les pull requests GitHub.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: GitHub
  text: Surveiller les workflows des actions GitHub avec CI Visibility Datadog
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
kind: guide
title: Activer les résumés des tests dans les pull requests GitHub
---

## Présentation

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Si vous utilisez la solution Test Visibility, Datadog peut être intégré à GitHub de façon à afficher les résumés des résultats de test directement dans vos pull requests. Le résumé affiche un aperçu des exécutions de test, des informations sur les tests irréguliers ainsi que des messages d'erreur pour les tests ayant échoué.
Ce rapport permet aux développeurs de recevoir instantanément des informations sur leurs résultats de test, et ainsi de débuguer les tests irréguliers ou ceux ayant échoué sans jamais quitter la pull request.

{{< img src="ci/github_comments_light.png" alt="Aperçu d'un commentaire Datadog sur une pull request GitHub" style="width:100%;">}}

### Compatibilité

Cette intégration est uniquement disponible pour les services de test hébergés sur `github.com`.

## Activer les résumés des tests

Pour activer les résumés des tests dans les pull requests, suivez ces étapes :

1. Installez l'[intégration GitHub][1] :
   1. Accédez à l'onglet **Configuration** dans le [carré d'intégration GitHub][2] et cliquez sur **+ Create GitHub App**.
   2. Accordez à l'application un accès en lecture et en écriture sur les pull requests.
2. Activez les résumés des tests pour un ou plusieurs services de test. Pour ce faire, rendez-vous sur la [page Test Service Settings][3] ou sur la page du commit/de la branche.

### Page Test Service Settings

1. Accédez à la [page Test Service Settings][3] et recherchez le référentiel ou le service de test qui vous intéresse.
2. Cliquez sur le bouton en dessous de la colonne **GitHub Comments** correspondant au service de votre choix.

{{< img src="ci/enable-settings-github-comments.png" alt="Onglet Test Service Settings dans Datadog, avec les commentaires GitHub activés pour un service de test" style="width:100%;">}}

### Page du commit ou de la branche

1. Accédez à la page du commit ou de la branche correspondant au service de test pour lequel vous voulez activer les commentaires GitHub.
2. Cliquez sur l'icône des paramètres et sélectionnez **View Test Service Settings**.
3. Sélectionnez **Enable GitHub Comments** pour que les commentaires s'affichent sur les nouvelles pull requests. Ce changement peut prendre quelques minutes à être appliqué.

{{< img src="ci/enable-github-comments.png" alt="Menu déroulant d'activation des commentaires GitHub" style="width:100%;">}}

Les commentaires apparaissent uniquement sur les pull requests qui ont été ouvertes avant l'exécution du test et qui ont exécuté au moins un test pour l'un des services de test activés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/github/
[2]: https://app.datadoghq.com/integrations/github
[3]: https://app.datadoghq.com/ci/settings/test-service