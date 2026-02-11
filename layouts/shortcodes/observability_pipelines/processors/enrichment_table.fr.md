Utilisez ce processeur pour enrichir vos journaux avec des informations provenant d'une table de référence, qui peut être un fichier local ou une base de données.

Pour configurer le processeur de table d'enrichissement :
1. Définissez une **requête de filtre**. Seuls les journaux qui correspondent à la [requête de filtre](#filter-query-syntax) spécifiée sont traités. Tous les journaux, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline.
2. Entrez l'attribut source du journal. La valeur de l'attribut source est ce que vous souhaitez trouver dans la table de référence.
3. Entrez l'attribut cible. La valeur de l'attribut cible stocke, sous forme d'objet JSON, les informations trouvées dans la table de référence.
4. Sélectionnez le type de table de référence que vous souhaitez utiliser, **Fichier** ou **GeoIP**.
   - Pour le type **Fichier** :
        1. Entrez le chemin du fichier.<br>note Tous les chemins de fichiers sont relatifs au répertoire de données de configuration, qui est `/var/lib/observability-pipelines-worker/config/` par défaut. Voir [Configurations avancées des travailleurs][10172] pour plus d'informations. Le fichier doit être possédé par l'utilisateur `observability-pipelines-worker group` et `observability-pipelines-worker`, ou au moins lisible par le groupe ou l'utilisateur.
        1. Entrez le nom de la colonne. Le nom de la colonne dans la table d'enrichissement est utilisé pour faire correspondre la valeur de l'attribut source. Voir l'[exemple de fichier d'enrichissement](#enrichment-file-example).
   - Pour le type **GeoIP**, entrez le chemin GeoIP.

##### Exemple de fichier d'enrichissement

Pour cet exemple, `merchant_id` est utilisé comme attribut source et `merchant_info` comme attribut cible.

Ceci est la table de référence d'exemple que le processeur d'enrichissement utilise :

| merch_id | nom_du_commerçant   | ville      | `state`    |
| -------- | --------------- | --------- | -------- |
| 803      | Ottomans d'Andy | Boise     | Idaho    |
| 536      | Canapés de Cindy | Boulder   | Colorado |
| 235      | Bancs de Debra | Las Vegas | Nevada   |

`merch_id` est défini comme le nom de colonne que le processeur utilise pour trouver la valeur de l'attribut source. note La valeur de l'attribut source n'a pas besoin de correspondre au nom de la colonne.

Si le processeur d'enrichissement reçoit un journal avec `"merchant_id":"536"`:

- Le processeur recherche la valeur `536` dans la colonne `merch_id` de la table de référence.
- Après avoir trouvé la valeur, il ajoute l'ensemble de la ligne d'informations de la table de référence à l'attribut `merchant_info` sous forme d'objet JSON:

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->