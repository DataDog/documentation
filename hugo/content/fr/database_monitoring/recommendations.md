---
description: Consulter des recommandations pour traiter proactivement les problèmes
  de votre système
further_reading:
- link: https://www.datadoghq.com/blog/database-monitoring-index-recommendations/
  tag: blog
  text: Analyse approfondie des recommandations d'index de Database Monitoring
- link: https://www.datadoghq.com/blog/database-monitoring-query-regressions/
  tag: Blog
  text: Détecter et analyser les régressions de requêtes avec Datadog Database Monitoring
title: Recommandations
---

Les recommandations de Database Monitoring (DBM) attirent l'attention sur les optimisations potentielles et les zones problématiques de votre parc de bases de données.

{{< img src="database_monitoring/recommendations-page.png" alt="La page Recommendations dans Datadog" style="width:90%;" >}}

## Fonctionnement

Datadog analyse les métriques et les données d'échantillons de DBM pour identifier les problèmes les plus prioritaires de vos systèmes. Un indicateur de sévérité est calculé pour chaque recommandation, mettant en évidence les domaines les plus importants sur lesquels se concentrer. Les recommandations de sévérité élevée peuvent indiquer des problèmes immédiats ou imminents, tandis que les recommandations de sévérité inférieure peuvent être traitées de manière asynchrone pour maintenir proactivement l'état de santé de la base de données.

## Types de recommandations pris en charge

| Type de recommandation     | Rôle                                                                                                                                            | MongoDB                     | MySQL                       | Oracle                      | PostgreSQL                  | SQL Server                  |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|
| **Function in Filter**  | La requête appelle une fonction sur les colonnes filtrées, entraînant des analyses séquentielles coûteuses qui ne peuvent pas tirer parti des index standard basés sur les colonnes. |                             |                             |                             | <i class='icon-check-bold'> |                             |
| **High Disk Queue Depth** | L'instance de base de données subit une attente d'E/S excessive pouvant ralentir les charges de travail et affecter le débit global. <br><br>**Remarque** : Disponible uniquement sur Amazon RDS.  |              | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **High Impact Blocker** | La requête génère un temps d'attente significatif pour les requêtes bloquées.                                                                         |                             |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **High Row Count**      | La requête renvoie un grand nombre de lignes dans son ensemble de résultats.                                                                                            |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Long Running Query**  | La durée de la requête a dépassé un seuil de 30 secondes.                                                                                   |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Low Disk Space**      | L'instance de base de données manque d'espace disque. <br><br>**Remarque** : Disponible uniquement sur Amazon RDS.                                                    |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Missing Index**       | Le plan d'exécution de la requête effectue des analyses séquentielles coûteuses. Lorsque cela est détecté, Datadog recommande d'utiliser un index pour accélérer la requête.                | <i class='icon-check-bold'> | <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Query Regression**       | La durée totale de la requête a connu une augmentation significative.                |                             |  <i class='icon-check-bold'>    |                             | <i class='icon-check-bold'> |                             |
| **Unused Index**        | L'index n'a été utilisé dans aucun plan d'exécution récemment.                                                                                           | <i class='icon-check-bold'> |  <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}