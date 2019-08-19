---
title: Sécurité des données d'APM et du tracing distribué
kind: documentation
aliases:
  - /fr/tracing/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Consulter les principales catégories de données envoyées à Datadog
---
Cet article fait partie d'une [série d'articles sur la sécurité des données][1].

Le produit APM prend en charge de nombreuses bibliothèques et intègre des outils extensibles : nos clients sont ainsi libres d'envoyer presque tous les points de données qu'ils souhaitent. Cet article décrit les principales commandes de filtrage proposées à nos utilisateurs afin de contrôler les données d'APM envoyées à Datadog.

## Filtres par défaut

Plusieurs règles de filtrage sont déjà appliquées afin d'assurer un comportement efficace par défaut. Citons particulièrement les suivantes :

**Les variables d'environnement ne sont pas recueillies par l'Agent**

**Les variables SQL sont filtrées par défaut, même en l'absence de requêtes préparées**

Par exemple, dans l'attribut `sql.query` suivant :
`SELECT data FROM table WHERE key=123 LIMIT 10`
Les variables sont filtrées afin d'obtenir le nom de ressource suivant :
`SELECT data FROM table WHERE key = ? LIMIT ?`

**Les chiffres dans les noms de ressources (par exemple, dans les URL de requête) sont filtrés par défaut**

Par exemple, dans l'attribut `elasticsearch` suivant :
```
Elasticsearch : {
    method : GET,
    url : /user.0123456789/friends/_count
}
```
Les chiffres dans l'URL sont filtrés afin d'obtenir le nom de ressource suivant :
`GET /user.?/friends/_count`

En plus de ces règles par défaut, vous devez vérifier et configurer le déploiement de votre APM (y compris l'ensemble des intégrations et frameworks fournis par les [traceurs pris en charge][2]) afin de contrôler pleinement les données que vous envoyez à Datadog.

## Filtrage de tags

Si vous utilisez la version 6, vous pouvez configurer l'Agent de façon à filtrer les tags associés à des spans en fonction de leur nom et de leur modèle, puis les remplacer par la chaîne de votre choix. Pour empêcher l'envoi de tags spécifiques, utilisez le [paramètre][3] `replace_tags`. Ce paramètre permet la création d'une liste d'une ou plusieurs expressions régulières, qui indique à l'Agent d'effacer les données sensibles dans vos tags.

## Filtrage de ressources

Si vous utilisez la version 6, vous pouvez configurer l'Agent de façon à exclure une ressource spécifique des traces envoyées par l'Agent à l'application Datadog. Pour empêcher l'envoi de ressources spécifiques, utilisez le [paramètre][3] `ignore_resources`. Ce paramètre permet la création d'une liste contenant une ou plusieurs expressions régulières, qui indique à l'Agent de filtrer les traces en fonction du nom de leur ressource.

## Extension de traceurs

Les bibliothèques de tracing sont conçues pour être extensibles. Vous avez la possibilité d'écrire un post-processeur personnalisé pour intercepter des spans et ensuite les ajuster ou les ignorer en conséquence (par exemple, en fonction d'une expression régulière). Les constructions suivantes peuvent par exemple être utilisées à cette fin :

* Java | [Interface TraceInterceptor][4]
* Ruby | [Pipeline de processing][5]
* Python | [Filtrage de traces][6]

## Instrumentation personnalisée

Si vous avez besoin d'une instrumentation personnalisée pour une application spécifique, nous vous conseillons d'utiliser l'API de tracing côté Agent pour sélectionner les spans  spécifiques à inclure les traces envoyées à Datadog. Consultez la [documentation relative à l'API][7] pour en savoir plus.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security
[2]: /fr/tracing/setup
[3]: /fr/tracing/setup/#agent-configuration
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/TraceInterceptor.java
[5]: http://gems.datadoghq.com/trace/docs/#Processing_Pipeline
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#trace-filtering
[7]: /fr/api/?lang=python#tracing