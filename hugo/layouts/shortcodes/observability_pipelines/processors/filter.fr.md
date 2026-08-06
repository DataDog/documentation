Ce processeur filtre les logs qui correspondent à la requête de filtrage spécifiée et ignore tous les logs qui ne correspondent pas. Si un log est ignoré par ce processeur, aucun des processeurs inférieurs ne le reçoit. Ce processeur peut filtrer les logs inutiles, tels que les logs de débogage ou d'avertissement.

Pour configurer le processeur de filtre :
- Définissez une **requête de filtre**. La [requête](#syntaxe-de-requete-de-filtre) que vous spécifiez filtre et ne transmet que les logs qui lui correspondent, en laissant de côté tous les autres logs.