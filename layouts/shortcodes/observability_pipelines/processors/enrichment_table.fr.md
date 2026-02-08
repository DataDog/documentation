Utilisez ce processeur pour enrichir vos journaux avec des informations provenant d'une table de référence, qui peut être un fichier local ou une base de données.

Pour configurer le processeur de table d'enrichissement :
1. Définissez une **Filter Query**. Seuls les journaux correspondant à la [Filter Query](#filter-query-syntax) spécifiée sont traités. Tous les journaux, qu'ils correspondent ou non à la requête du filtre, sont envoyés à l'étape suivante du pipeline.
2. Entrez l'attribut source du journal. La valeur de l'attribut source correspond à ce que vous souhaitez trouver dans la table de référence.
3. Entrez target attribute. La valeur de l'target attribute stocke, sous forme d'objet JSON, les informations trouvées dans la table de référence.
4. Sélectionnez le type de table de référence que vous souhaitez utiliser, **File** ou **GeoIP**.
   - Pour le type **de File**:
        1. Entrez le chemin d'accès au file.<br>note Tous les chemins d'accès aux fichiers sont relatifs au répertoire de données de configuration, qui est par défaut `/var/lib/observability-pipelines-worker/config/`. Pour plus d'informations, consultez la section [Advanced Worker Configurations][10172]. Le fichier doit appartenir aux utilisateurs `observability-pipelines-worker group` et `observability-pipelines-worker`, ou au moins être lisible par le groupe ou l'utilisateur.
        1. Entrez le nom de la colonne. Le nom de la colonne dans la table d'enrichissement est utilisé pour faire correspondre la valeur de l'attribut source. Voir [l'exemple de fichier d'enrichissement](#enrichment-file-example).
   - Pour le type **GeoIP**, entrez le chemin d'accès GeoIP.

##### Exemple de fichier d'enrichissement

Dans cet exemple, `merchant_id` est utilisé comme attribut source et `merchant_info` comme attribut cible.

Voici l'exemple de table de référence utilisé par le processeur d'enrichissement :

| merch_id | merchant_name   | ville      | \`state\`    |
| -------- | --------------- | --------- | -------- |
| 803      | Les poufs d'Andy | Boise     | Idaho    |
| 536      | Les canapés de Cindy | Boulder   | Colorado |
| 235      | Les bancs de Debra | Las Vegas | Nevada   |

`merch_id` est défini comme nom de colonne utilisé par le processeur pour trouver la valeur de l'attribut source. note La valeur de l'attribut source ne doit pas nécessairement correspondre au nom de la colonne.

Si le processeur d'enrichissement reçoit un journal contenant l'`"merchant_id":"536"`:

- Le processeur recherche la valeur `536` dans la colonne `merch_id` de la table de référence.
- Une fois la valeur trouvée, il ajoute toute la ligne d'informations du tableau de référence à l'attribut `merchant_info` sous forme d'objet JSON :

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->