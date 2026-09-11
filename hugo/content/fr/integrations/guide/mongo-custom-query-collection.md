---
further_reading:
- link: /integrations/mongo/
  tag: Documentation
  text: En savoir plus sur l'intégration MongoDB
title: Recueillir des métriques custom MongoDB
---

## Présentation

Pour recueillir des métriques custom avec l'intégration [Datadog/MongoDB][8], utilisez l'option `custom_queries` dans le fichier `conf.d/mongo.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le fichier d'exemple [mongo.d/conf.yaml][2] pour en savoir plus.

## Configuration

`custom_queries` dispose des options suivantes :

* **`metric_prefix`** : chaque métrique commence par le préfixe défini.
* **`query`** : il s'agit de la requête [Mongo runCommand][3] à exécuter en tant qu'objet JSON. **Remarque** : l'Agent prend uniquement en charge les requêtes `count`, `find` et `aggregates`.
* **`database`** : Il s'agit de la base de données MongoDB à partir de laquelle les métriques sont collectées.
* **`fields`** : option ignorée pour les requêtes `count`. Il s'agit d'une liste représentant chaque champ sans aucun ordre spécifique. Ignore les champs non spécifiés et manquants. Chaque `fields` doit comporter trois informations :
  * `field_name` : le nom du champ à partir duquel récupérer les données.
  * `name` : le suffixe ajouté à la valeur metric_prefix pour former le nom complet de la métrique. Si le `type` est `tag`, cette colonne est traitée en tant que tag et appliquée à chaque métrique recueillie par cette requête spécifique.
  * `type` : la méthode d'envoi (`gauge`, `count`, `rate`, etc.). Cette option peut également être définie sur `tag` pour ajouter chaque métrique à la ligne avec le nom et la valeur de l'élément dans cette colonne. Vous pouvez utiliser le type `count` pour effectuer une agrégation pour les requêtes qui renvoient plusieurs lignes avec les mêmes tags ou sans aucun tag.
* **`tags`** : la liste de tags à appliquer à chaque métrique (tel que spécifié ci-dessus).
* **`count_type`** : pour des requêtes `count` uniquement. Il s'agit de la méthode d'envoi (`gauge`, `count`, `rate`, etc.) du résultat du count. Option ignorée pour les requêtes autres que count.

## Exemples

Pour les exemples ci-dessous, la méthode de collecte Mongo `user_collection` est utilisée :

```text
{ name: "foo", id: 12345, active: true, age:45, is_admin: true}
{ name: "bar", id: 67890, active: false, age:25, is_admin: true}
{ name: "foobar", id: 16273, active: true, age:35, is_admin: false}
```

Choisissez le type de requête pour lequel vous souhaitez voir un exemple :

{{< tabs >}}
{{% tab "Count" %}}

Pour surveiller le nombre d'utilisateurs actifs à un moment donné, voici la [commande count Mongo][1] à utiliser :

```text
db.runCommand( {count: user_collection, query: {active:true}})
```

Cela correspond à la configuration YAML `custom_queries` suivante dans votre fichier `mongo.d/conf.yaml` :

```yaml
custom_queries:
  - metric_prefix: mongo.users
    query: {"count": "user_collection", "query": {"active":"true"}}
    count_type: gauge
    tags:
      - user:active
```

Cela génère une métrique `gauge` `mongo.users` avec le tag `user:active`.

**Remarque** : le [type de métrique][2] est défini sur `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/count/#dbcmd.count
[2]: /fr/metrics/types/
{{% /tab %}}
{{% tab "Find" %}}

Pour surveiller l'âge des utilisateurs, utilisez la [commande find Mongo][1] suivante :

```text
db.runCommand( {find: user_collection, filter: {active:true} )
```

Cela correspond à la configuration YAML `custom_queries` suivante dans votre fichier `mongo.d/conf.yaml` :

```yaml
custom_queries:
  - metric_prefix: mongo.example2
    query: {"find": "user_collection", "filter": {"active":"true"}}
    fields:
      - field_name: name
        name: name
        type: tag
      - field_name: age
        name: user.age
        type: gauge

```

Cela génère une métrique `gauge` `mongo.example2.user.age` avec deux tags : `name:foo` et `name:foobar`.

**Remarque** : le [type de métrique][2] est défini sur `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/find/#dbcmd.find
[2]: /fr/metrics/types/
{{% /tab %}}
{{% tab "Aggregate" %}}

Pour surveiller l'âge moyen d'un administrateur et d'un utilisateur non-administrateur, utilisez la [commande aggregate Mongo][1] suivante :

```text
db.runCommand(
              {
                'aggregate': "user_collection",
                'pipeline': [
                  {"$match": {"active": "true"}},
                  {"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}
                ],
                'cursor': {}
              }
            )
```

Cela correspond à la configuration YAML `custom_queries` suivante dans votre fichier `mongo.d/conf.yaml` :

```yaml
custom_queries:
  - metric_prefix: mongo.example3
    query: {"aggregate": "user_collection","pipeline": [{"$match": {"active": "true"}},{"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}],"cursor": {}}
    fields:
      - field_name: age_avg
        name: user.age
        type: gauge
      - field_name: _id
        name: is_admin
        type: tag
    tags:
      - test:mongodb
```

Cela génère une métrique `gauge` `mongo.example3.user.age` avec deux tags : `is_admin:true` et `is_admin:false`. Ces tags représentent l'âge moyen des utilisateurs pour chaque rôle.

[1]: https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate
{{% /tab %}}
{{< /tabs >}}

**Remarque** : après avoir mis à jour le fichier YAML Mongo, [redémarrez l'Agent Datadog][4].

### Validation

Pour vérifier le résultat, recherchez les métriques à l'aide du [Metrics Explorer][5].

### Debugging

[Lancez la sous-commande status de l'Agent][6] et cherchez `mongo` dans la section Checks. Par ailleurs, les [logs de l'Agent][7] peuvent également fournir des informations utiles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
[5]: /fr/metrics/explorer/
[6]: /fr/agent/guide/agent-commands/#agent-status-and-information
[7]: /fr/agent/guide/agent-log-files/
[8]: /fr/integrations/mongodb