---
description: Informations concernant les données recueillies par la solution Database Monitoring.
further_reading: null
title: Données recueillies par la solution Database Monitoring
---

Lorsque vous configurez Database Monitoring, l'Agent collecte toutes les métriques décrites dans la documentation sur l'intégration correspondante. Cela inclut les métriques relatives à l'état de la base de données, aux événements, aux basculements, aux connexions et aux pools de mémoire tampon, ainsi que les métriques de performance des requêtes utilisées par Database Monitoring.

Il s'agit de métriques Datadog standards que vous pouvez utiliser dans des [dashboards][1], [monitors][2], [notebooks][3] et dans toutes les autres fonctionnalités qui prennent en charge les métriques.

Pour consulter la liste complète des métriques collectées, consultez la section **Données collectées** de la documentation sur l'intégration correspondant à votre produit de base de données :

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

Les vues Database Monitoring affichent principalement les métriques suivantes :
- **MySQL** : `mysql.queries.*`
- **Postgres** : `postgresql.queries.*`
- **SQL Server** : `sqlserver.queries.*`
- **Oracle** : `oracle.queries.*`

## Requêtes normalisées

Afin d'éliminer les informations redondantes et de suivre les tendances de performance, Database Monitoring regroupe les requêtes identiques avec des paramètres différents en obfusquant ces paramètres. Ces groupes de requêtes sont appelés requêtes normalisées et sont parfois désignés sous le terme de résumés de requêtes. Plutôt que d'imposer une limite stricte sur le volume de requêtes, Datadog prend en charge 200 requêtes normalisées par Host de base de données. Ce processus garantit également qu'aucune donnée sensible ne soit transmise aux outils d'observabilité. 

Par exemple, vous pouvez observer de nombreuses requêtes récupérant des données d'une même table par identifiant :

```sql
SELECT * FROM customers WHERE id = 13345;
SELECT * FROM customers WHERE id = 24435;
SELECT * FROM customers WHERE id = 34322;
```

Ces éléments apparaissent ensemble sous la forme d'une requête normalisée qui remplace le paramètre par `?`.

```sql
SELECT * FROM customers WHERE id = ?
```

Les requêtes avec plusieurs paramètres suivent le même schéma :

```sql
SELECT * FROM timeperiods WHERE start >= '2022-01-01' AND end <= '2022-12-31' AND num = 5
```

La requête ci-dessus avec des paramètres spécifiques devient la version obfusquée ci-dessous :

```sql
SELECT * FROM timeperiods WHERE start >= ? AND end <= ? AND num = ?
```

## Informations sensibles

Étant donné que l'Agent Database Monitoring normalise les requêtes, il obfusque tous les paramètres de liaison de requêtes envoyés à l'intake Datadog. Ainsi, les mots de passe, les informations personnellement identifiables (PII) et autres informations potentiellement sensibles stockées dans votre base de données ne sont pas visibles dans les métriques de requêtes, les échantillons de requêtes ou les plans d'exécution.

Certains risques d'exposition des données demeurent toutefois, notamment via les sources suivantes :

### Schéma de base de données

Si des informations sensibles sont présentes dans les noms de table, les noms de colonne, les index, les noms de base de données ou tout autre schéma, ces données ne seront pas obfusquées. Le schéma d'une base de données est rarement considéré comme sensible, mais il est important de savoir que ces types de données ne font l'objet d'aucune obfuscation.

### Logs de base de données

Si vous envoyez des logs à Datadog à partir de votre base de données, sachez que certains logs contiennent le texte de requête SQL complet, y compris les paramètres de liaison de requête. Passez en revue les [règles de sécurité des logs][4] et appliquez-les conformément aux exigences de votre organisation.

### Commentaires de requêtes

Les commentaires de requête SQL peuvent être recueillis par l'Agent et envoyés à Datadog sans obfuscation. Même s'ils ne contiennent généralement pas de données sensibles, les commentaires extraits à partir de la requête SQL ne feront pas l'objet d'une obfuscation.

## Requêtes suivies

La solution Database Monitoring de Datadog recueille des métriques pour chacune des 200 requêtes normalisées les plus courantes, c'est-à-dire celles qui enregistrent les temps d'exécution les plus importants sur le host. Cette limite s'applique uniquement à chaque intervalle de collecte (par défaut, 10 secondes), ce qui fait que le nombre total de requêtes surveillées peut dépasser la limite configurée sur des périodes plus longues.

Pour les échantillons de requêtes, le nombre de requêtes normalisées uniques surveillées n'est soumis à aucune limite, mais l'échantillonnage privilégie les requêtes lentes ou fréquentes. Il peut arriver qu'un échantillon de requêtes soit sélectionné, mais qu'il ne présente aucune métrique de requête. Ce cas de figure se présente lorsque la requête était lente ou fréquente pendant une courte période, mais pas de façon suffisamment soutenue pour qu'elle devienne une requête courante.

## Périodes de rétention des requêtes

Datadog conserve les données de requêtes Database Monitoring en fonction du type de données collectées :

- Les métriques de requêtes sont conservées pendant 15 mois.
- Les échantillons de requêtes sont conservés pendant 15 jours.

Pour en savoir plus, consultez la section [Périodes de rétention des données][5].

## Autres requêtes

La catégorie _Other Queries_ correspond aux métriques des requêtes qui ne figurent pas dans la liste des 200 requêtes les plus courantes. Étant donné qu'une requête peut être considérée comme courante pendant un certain temps uniquement, il est possible que les métriques soient surveillées pour une requête normalisée distincte à certains moments, mais qu'elles soient prises en compte dans la catégorie Other Queries à d'autres.

[1]: /fr/dashboards/
[2]: /fr/monitors/
[3]: /fr/notebooks/
[4]: /fr/data_security/logs/
[5]: /fr/data_security/data_retention_periods/