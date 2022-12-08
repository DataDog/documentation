---
kind: guide
title: Activer les résumés des tests dans les commentaires des pull requests GitHub
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog peut être intégré à GitHub afin d'afficher les résumés des résultats de test ainsi que les messages d'erreur en cas d'échec d'un test dans les commentaires des pull requests.

### Compatibilité
Cette intégration est uniquement disponible pour les services de test hébergés sur `github.com`.

<div class="alert alert-info"><strong>Remarque</strong> : l'intégration n'est pas encore disponible pour les actions GitHub déclenchées par l'événement <code>pull_request*</code>. </div>

{{< img src="ci/github_comments_light.png" alt="Aperçu d'un commentaire Datadog sur une pull request GitHub" style="width:100%;">}}

### Activation
Pour activer l'intégration des commentaires GitHub :

1. Accédez au [carré de l'intégration GitHub Apps][1] et installez l'intégration [Datadog/GitHub Apps][2].
2. Accordez à l'application un accès en lecture et en écriture sur les pull requests.

Dans l'interface, cette étape peut être effectuée depuis la page des paramètres ou depuis la page du commit ou de la branche.

#### Page des paramètres des tests CI

1. Accédez à la [page CI Test Service Settings][3] et recherchez le référentiel ou le service de test qui vous intéresse.
2. Activez la colonne `GitHub Comments` pour le service de votre choix.

{{< img src="ci/enable-settings-github-comments.png" alt="Onglet Test Service Settings dans Datadog, avec les commentaires GitHub activés pour un service de test" style="width:100%;">}}

#### Page du commit ou de la branche

1. Accédez à la page du commit ou de la branche correspondant au service de test pour lequel vous souhaitez activer les commentaires GitHub.
2. Cliquez sur l'icône des paramètres en haut à droite.
3. Sélectionnez `Enable GitHub Comments` pour que les commentaires s'affichent sur les nouvelles pull requests. Notez que ce changement peut prendre quelques minutes à être appliqué.

{{< img src="ci/enable-github-comments.png" alt="Menu déroulant d'activation des commentaires GitHub" style="width:100%;">}}

Les commentaires apparaissent uniquement sur les pull requests qui ont été ouvertes avant l'exécution du test et qui ont exécuté au moins un test pour l'un des services de test activés.

[1]: https://app.datadoghq.com/integrations/github-apps
[2]: /fr/integrations/github_apps/
[3]: https://app.datadoghq.com/ci/settings/test-service