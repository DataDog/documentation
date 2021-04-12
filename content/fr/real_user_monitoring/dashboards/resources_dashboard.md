---
title: Dashboard de ressources RUM
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Explorer vos vues dans Datadog
---
Le dashboard de ressources fournit des informations sur les ressources de vos applications. Il est divisé en quatre sections :

- **Resources overview** :
    visualisez les ressources qui sont le plus fréquemment chargées, leur code de statut associé et leur taille répartie par type de ressource.
- **First party resources** :
    obtenez des informations sur vos ressources internes. Pour en savoir plus sur la catégorisation des ressources, consultez la [documentation relative aux ressources][1].
- **Third party resources** :
    obtenez des informations sur vos ressources tierces. Pour en savoir plus sur la catégorisation des ressources, consultez la [documentation relative aux ressources][1].
- **Resource load timings** :
    surveillez l'évolution des [temps de chargement des ressources][2] recueillis via l'API du navigateur.

{{< img src="real_user_monitoring/dashboards/resources_dashboard.png" alt="Dashboard de ressources" >}}

Pour en savoir plus sur les informations affichées, consultez la [documentation Données RUM collectées][3]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/resource/
[2]: https://www.w3.org/TR/resource-timing-1/
[3]: /fr/real_user_monitoring/data_collected/