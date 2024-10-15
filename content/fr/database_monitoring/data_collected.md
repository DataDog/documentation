---
title: "Données recueillies par la solution Database\_Monitoring"
description: "Informations concernant les données recueillies par la solution Database\_Monitoring."
further_reading: null
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Lorsque vous configurez la solution Database Monitoring, l'Agent recueille toutes les métriques décrites dans la documentation relative à l'intégration correspondante. Celles-ci incluent les métriques sur l'état de la base de données, les événements, les failovers, les connexions et les pools de buffer, ainsi que les métriques sur les performances des requêtes recueillies par la solution Database Monitoring.

Il s'agit de métriques Datadog standards que vous pouvez utiliser dans des [dashboards][1], [monitors][2], [notebooks][3] et dans toutes les autres fonctionnalités qui prennent en charge les métriques.

Pour voir la liste complète des métriques recueillies, consultez la documentation relative aux données recueillies par l'intégration pour votre système de gestion de base de données :

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

Les principales métriques utilisées pour les vues Database Monitoring sont les suivantes :
- **MySQL** : `mysql.queries.*`
- **Postrgres** : `postgresql.queries.*`

## Informations sensibles

L'Agent Database Monitoring procède à l'obfuscation de tous les paramètres de liaison de requête envoyés à l'endpoint d'admission de Datadog. De ce fait, les mots de passe, les informations personnelles et d'autres informations potentiellement sensibles qui sont stockées dans votre base de données ne seront pas visibles dans les métriques de requêtes, les échantillons de requêtes ou les plans d'exécution.

Certains risques d'exposition des données demeurent toutefois, notamment via les sources suivantes :

### Schéma de base de données

Si des informations sensibles sont présentes dans les noms de table, les noms de colonne, les index, les noms de base de données ou tout autre schéma, ces données ne seront pas obfusquées. Le schéma d'une base de données est rarement considéré comme sensible, mais il est important de savoir que ces types de données ne font l'objet d'aucune obfuscation.

### Logs de base de données

Si vous envoyez des logs à Datadog à partir de votre base de données, sachez que certains logs contiennent le texte de requête SQL complet, y compris les paramètres de liaison de requête. Passez en revue les [règles de sécurité des logs][4] et appliquez-les conformément aux exigences de votre organisation.

### Commentaires de requête

Les commentaires de requête SQL peuvent être recueillis par l'Agent et envoyés à Datadog sans obfuscation. Même s'ils ne contiennent généralement pas de données sensibles, les commentaires extraits à partir de la requête SQL ne feront pas l'objet d'une obfuscation.

## Requêtes suivies

La solution Database Monitoring de Datadog recueille des métriques pour chacune des 200 requêtes normalisées les plus courantes, c'est-à-dire celles qui enregistrent les temps d'exécution les plus importants sur le host. Cette limite s'applique uniquement à chaque intervalle de collecte (par défaut, 10 secondes), ce qui fait que le nombre total de requêtes surveillées peut dépasser la limite configurée sur des périodes plus longues.

Pour les échantillons de requêtes, le nombre de requêtes normalisées uniques surveillées n'est soumis à aucune limite, mais l'échantillonnage privilégie les requêtes lentes ou fréquentes. Il peut arriver qu'un échantillon de requêtes soit sélectionné, mais qu'il ne présente aucune métrique de requête. Ce cas de figure se présente lorsque la requête était lente ou fréquente pendant une courte période, mais pas de façon suffisamment soutenue pour qu'elle devienne une requête courante.

## Autres requêtes

La catégorie _Other Queries_ correspond aux métriques des requêtes qui ne figurent pas dans la liste des 200 requêtes les plus courantes. Étant donné qu'une requête peut être considérée comme courante pendant un certain temps uniquement, il est possible que les métriques soient surveillées pour une requête normalisée distincte à certains moments, mais qu'elles soient prises en compte dans la catégorie Other Queries à d'autres.


[1]: /fr/dashboards/
[2]: /fr/monitors/
[3]: /fr/notebooks/
[4]: /fr/security/logs/