---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-security-graph/
  tag: Blog
  text: Visualisez les relations de sécurité du cloud avec Datadog Security Graph
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: Blog
  text: Tracez les routes d'exposition entre les ressources avec Datadog Cloud Security
title: Visualisez les relations avec Security Graph
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graph n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

L'un des défis les plus persistants de la sécurité cloud est de comprendre comment les composants de calcul, de stockage, d'identité et de réseau interagissent les uns avec les autres. Avec Security Graph, vous pouvez modéliser votre environnement cloud sous forme de graphe de relations. Visualisez et interrogez les connexions entre vos ressources cloud, telles que les instances EC2, les rôles IAM, les S3 buckets et les groupes de sécurité, en combinant les données de vos analyses cloud Agentless et basées sur l'Agent. Examinez ces relations afin de mettre en évidence les chemins d'accès indirects, d'évaluer les risques liés à l'identité et de répondre de manière plus efficace aux menaces émergentes.

**Remarque** : Security Graph ne prend en charge que les ressources AWS.

{{< img src="security/csm/security_graph.png" alt="Security Graph affichant un exemple d'instance EC2" width="100%">}}

## Sélectionnez ou créez une requête {#select-or-create-a-query}

Il existe deux manières de spécifier les types de ressources et de relations que vous souhaitez voir dans Security Graph :
<!-- - Write a query in natural language (for example, "Non-admin IAM roles that can assume admin IAM roles") -->
- Sélectionnez une requête prédéfinie depuis la page d'accueil.
- Créez votre requête vous-même, en spécifiant les types de ressources et les relations entre elles.

<!-- If you use a natural language or pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results. -->

Si vous utilisez une requête prédéfinie, les détails techniques se remplissent automatiquement dans la requête. Vous pouvez modifier la requête pour affiner vos résultats.

### Créer et modifier des requêtes {#create-and-modify-queries}

Que vous utilisiez une requête générée automatiquement ou que vous en créiez une vous-même, vous pouvez utiliser le générateur de requêtes pour affiner vos résultats.

1. Sous **Créez votre propre requête**, à côté de **Rechercher**, sélectionnez un type de ressource dans la liste.
1. (Facultatif) Pour ajouter des détails supplémentaires sur le type de ressource que vous avez sélectionné, cliquez sur **+**, puis cliquez sur **Où**. Dans le champ qui apparaît, sélectionnez un tag et saisissez une valeur pour ce tag afin d'effectuer un filtrage.
1. (Facultatif) Pour filtrer par un type de ressource supplémentaire, cliquez sur **+**, puis cliquez sur **Celui-ci**. Dans le champ qui s'affiche, sélectionnez une relation que vous souhaitez que le type de ressource supplémentaire entretienne avec celui situé au-dessus. Si un autre champ **Où** apparaît, spécifiez des valeurs de tag supplémentaires pour ce type de ressource.
1. Ajoutez des types de ressources et des valeurs de tag supplémentaires selon vos besoins. Vous pouvez également cliquer sur l'icône **Supprimer** pour supprimer une condition, ou cliquer sur **Effacer la requête** pour recommencer.

À mesure que vous modifiez la requête, Security Graph se met automatiquement à jour pour afficher les ressources pertinentes. À côté de **Afficher**, vous pouvez cliquer sur **Graphe** pour visualiser les ressources dans un graphe de relations, ou cliquer sur **Table** pour les voir dans un tableau à la place.

## En savoir plus sur une ressource {#learn-more-about-a-resource}

- Lorsque vous affichez des ressources dans un graphe, vous pouvez cliquer sur une ressource pour afficher plus d'informations :
  - Copiez les informations clés sur la ressource, comme l'ID, le compte ou l'équipe.
  - Filtrez les ressources de votre requête actuelle par une valeur de tag spécifique.
  - Affichez plus de détails sur la ressource.
  - Affichez les résultats de sécurité associés à la ressource.
- Lorsque vous affichez des ressources dans un tableau, vous pouvez cliquer sur une ressource pour afficher des informations supplémentaires dans le panneau latéral.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}