---
"assets":
  "dashboards":
    "Superwise": assets/dashboards/superwise.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- monitoring
- MLOps
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/superwise/README.md"
"display_name": "Superwise"
"draft": false
"git_integration_title": "superwise"
"guid": "2d2737e3-d201-4076-84e7-5455db0b5582"
"integration_id": "superwise"
"integration_title": "Superwise"
"integration_version": ""
"is_public": true
"kind": "integration"
"maintainer": "support@superwise.ai"
"manifest_version": "1.0.0"
"metric_prefix": "superwise."
"metric_to_check": "superwise.metric.overall.quantity"
"name": "superwise"
"public_title": "Intégration Datadog/Superwise"
"short_description": "Plateforme d'observation de machine learning en production"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation
[Superwise][1] fournit des services d'observation de modèles pour les opérations de machine learning à grande échelle. La solution d'observation de modèles Superwise vous permet de gagner en visibilité et en contexte sur les comportements de vos modèles. Vous pouvez ainsi facilement surveiller les risques des modèles en fonction de différents scénarios. Grâce à Superwise, vos équipes de data science, d'ingénierie ML et d'opérations métier peuvent surveiller des modèles sans recevoir une montagne d'alertes. Cela améliore ainsi la fiabilité de votre gestion de modèles.

![Dashboard Superwise][2]

L'intégration Superwise qui gère les incidents et les métriques relatifs aux modèles transmet directement à Datadog des métriques clés en main sur les modèles, notamment sur la dérive, les activités et les incidents, ainsi que des métriques custom. Vous pouvez ainsi identifier les modèles dont les prédictions ne correspondent pas aux résultats attendus. Il est possible de filtrer les informations présentées afin d'afficher uniquement les données d'un scénario, d'une logique, d'une segmentation, d'un seuil ou d'une sensibilité précis.

L'intégration Datadog dans Superwise envoie des métriques sur les modèles standard à Datadog. Cela permet aux utilisateurs de consulter des dashboards d'observation des modèles dans Datadog. Vous pouvez configurer la stratégie de votre choix pour les incidents et métriques relatifs aux modèles, et transmettre ces données à Datadog. Vous bénéficiez alors d'une observabilité des modèles adaptée à vos besoins.

## Configuration

1. Accédez au [portail Superwise][3] et sélectionnez **Integrations**.

2. Cliquez sur **Create a new channel** et sélectionnez **Datadog**.

    ![Superwise - Ajouter la nouvelle intégration][4]

3. Saisissez vos clés d'application et d'API Datadog, puis cliquez sur **Test**. Un test de requête est envoyé à votre compte Datadog pour valider l'intégration. Si l'envoi de la requête a fonctionné, un message indique dans Superwise que le test a bien été effectué. Pour finir la configuration, cliquez sur **Create channel**.

    ![Superwise - Ajouter le nouveau canal Datadog][5]

4. Une fois la configuration terminée, le nouveau widget d'intégration Datadog est disponible :

    ![intégration Superwise][6]

### Validation
Dans Datadog, accédez au **Metrics Explorer** et recherchez la métrique `superwise.integration.test` pour vérifier que l'intégration Datadog/Superwise fonctionne.

![Graphique superwise.integration.test dans Datadog][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "superwise" >}}


### Événements

L'intégration Superwise n'inclut aucun événement.

### Checks de service

L'intégration Superwise n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Consultez la [documentation Superwise][9] (en anglais).


[1]: https://www.superwise.ai/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/5.png
[3]: https://portal.superwise.ai/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/2.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/6.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/3.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/4.png
[8]: https://github.com/DataDog/integrations-core/blob/master/check/metadata.csv
[9]: https://docs.superwise.ai

