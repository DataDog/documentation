---
algolia:
  rank: 65
  tags:
  - mcp
  - mcp server
  - code execution
  - code-exec
description: Exécutez du JavaScript écrit par l'agent via les API Datadog en un seul
  appel d'outil MCP pour enquêter sur des problèmes couvrant plusieurs produits Datadog.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Datadog MCP Server
- link: mcp_server/setup
  tag: Documentation
  text: Configurer Datadog MCP Server
- link: mcp_server/tools
  tag: Documentation
  text: Outils de Datadog MCP Server
title: Exécution de code avec le serveur MCP
---
## Présentation {#overview}

L'ensemble d'outils `code-exec` du Datadog MCP Server permet à votre agent IA d'écrire et d'exécuter du JavaScript via les API Datadog en un seul appel d'outil MCP, au lieu d'un appel d'outil par requête API. Le code généré par l'agent s'exécute dans un bac à sable géré par Datadog. La seule donnée renvoyée à l'agent est la valeur que le code retourne. Cela permet d'éviter d'inclure les réponses API volumineuses dans le contexte du modèle.

Utilisez l'exécution de code pour les investigations qui couvrent plusieurs produits Datadog ou qui nécessitent que l'agent assemble, filtre ou résume des données issues de plusieurs appels. Un exemple est la corrélation des logs d'erreurs avec la latence APM pour le même service et la même fenêtre temporelle.

## Pourquoi utiliser l'exécution de code {#why-use-code-execution}

Sans exécution de code, un agent chargé d'enrichir les services générant le plus d'erreurs avec des données de latence APM nécessite un appel d'outil distinct pour chaque service. Il nécessite également des itérations supplémentaires pour combiner les résultats. Chacun de ces appels et itérations consomme de l'espace dans la fenêtre de contexte.

Avec l'exécution de code, l'agent exprime la même investigation sous la forme d'un script unique :

1. Interroger les logs pour les services ayant le plus grand nombre de logs d'erreurs dans une fenêtre temporelle.
1. Pour chaque service renvoyé, interroger les spans pour obtenir des données de latence.
1. Joindre les deux ensembles de résultats et renvoyer un objet compact.

Le serveur MCP exécute le script et renvoie uniquement le résultat joint. L'agent termine l'investigation en un seul appel d'outil au lieu d'un appel par service.

## Outils disponibles {#available-tools}

L'ensemble d'outils `code-exec` fournit :

- **`execute_code`** : Exécute du JavaScript rédigé par l'agent dans le bac à sable et renvoie un résultat structuré. Consultez [`execute_code`][1] dans la référence des outils du serveur MCP pour les autorisations et des exemples d'invites.
- **`search_datadog_sdk`** : Recherche les fonctions SDK et les méthodes d'API disponibles pour l'agent afin d'écrire des scripts. Consultez [`search_datadog_sdk`][2] dans la référence des outils du serveur MCP.

Le code généré est du JavaScript basé sur le [client Datadog API pour TypeScript][3] public.

## Ce à quoi le bac à sable peut accéder {#what-the-sandbox-can-access}

Le code exécuté par l'ensemble d'outils `code-exec` s'exécute sur les API Datadog en utilisant votre identité utilisateur. Un agent ne peut lire que les données auxquelles vous avez l'autorisation d'accéder. Les autres limitations d'accès incluent :

- Le bac à sable est isolé. Les scripts ne peuvent pas accéder à votre machine locale, au système de fichiers, à des destinations réseau arbitraires ou à des identifiants Datadog bruts.
- Le bac à sable n'expose que des appels de Datadog API en lecture seule. Un agent ne peut pas utiliser `execute_code` pour effectuer des actions d'écriture, telles que la création d'un monitor ou la mise à jour d'un dashboard.
- Les appels d'API effectués à partir d'un script appliquent vos [autorisations de rôle][4] existantes. Si vous n'avez pas accès à un jeu de données, l'agent ne peut pas non plus l'interroger via `execute_code`.
- Les réponses d'API brutes restent dans le bac à sable pendant que le script les traite. La seule donnée renvoyée à l'agent est la valeur que le code retourne. Examinez ce qu'un script renvoie si les données sous-jacentes sont sensibles, comme des données client stockées dans des logs.

## Activer l'exécution de code {#enable-code-execution}

Pour activer l'exécution de code, incluez `code-exec` dans le paramètre de requête `toolsets` lorsque vous connectez votre client IA au Datadog MCP Server. Consultez [Configurer Datadog MCP Server][5] pour des instructions de connexion spécifiques au client.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Par exemple, en fonction de votre [site Datadog][6] sélectionné ({{< region-param key="dd_site_name" >}}), cette URL active l'ensemble d'outils principal ainsi que l'exécution de code :

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,code-exec</code></pre>

`code-exec` est inclus dans `toolsets=all`, vous n'avez donc pas besoin de l'ajouter séparément si vous activez déjà tous les ensembles d'outils généralement disponibles.

[6]: /fr/getting_started/site/
{{< /site-region >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/tools/#execute_code
[2]: /fr/mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /fr/account_management/rbac/permissions/
[5]: /fr/mcp_server/setup