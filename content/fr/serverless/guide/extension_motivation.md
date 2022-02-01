---
title: Choisir s'il est pertinent de migrer vers l'extension Lambda Datadog
kind: guide
---
## Est-il pertinent de migrer vers l'extension Lambda Datadog dans votre situation ?

Les extensions AWS Lambda s'exécutent au sein de l'environnement d'exécution Lambda, en même temps que le code de votre fonction Lambda. Datadog s'est associé avec AWS afin de créer l'[extension Lambda Datadog][1]. Il s'agit d'une version légère de l'Agent Datadog capable d'envoyer des métriques custom, des métriques optimisées, des traces et des logs.

Si vous avez configuré les [fonctionnalités sans serveur Datadog][2] avant le lancement officiel de l'extension Lambda Datadog, vous utilisez probablement le [Forwarder Datadog][3] pour envoyer des métriques custom, des métriques optimisées, des traces et des logs.

Il existe d'importantes différences entre l'extension Lambda et le Forwarder. Ainsi, dans certaines situations, il est plus intéressant d'utiliser l'extension plutôt que le Forwarder, et inversement. Cette page décrit les différents aspects à prendre en compte si vous songez à migrer depuis le Forwarder vers l'extension Lambda.

### Différences fonctionnelles

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrumenter des applications sans serveur AWS"  style="width:100%;">}}

L'extension Lambda prend uniquement en charge l'envoi de données de télémétrie sur les fonctions Lambda pour certains runtimes. Le Forwarder doit impérativement recueillir des métadonnées et les ajouter aux logs d'autres services AWS, notamment API Gateway, AppSync et Lambda@Edge.

| Runtime | Prise en charge de l'extension | Prise en charge du Forwarder |
| ------- | ----------------- | ----------------- |
| Python  | {{< X >}}         | {{< X >}}         |
| Node.js | {{< X >}}         | {{< X >}}         |
| Go      | {{< X >}}         | {{< X >}}         |
| Java    |                   | {{< X >}}         |
| .NET    |                   |                   |
| Ruby    |                   |                   |
| PHP     |                   |                   |

L'extension Lambda propose les mêmes fonctionnalités que le Forwarder pour les runtimes Python, Node.js et Go. Elle vous permet d'envoyer des logs Lambda, des traces Lambda générées par `dd-trace` (et non X-Ray), des métriques Lambda optimisées en temps réel et des métriques custom générées par des fonctions Lambda.

### Avantages

L'extension Lambda Datadog présente plusieurs avantages par rapport au Forwarder Datadog :

- **Configuration simplifiée** : le Forwarder nécessite la configuration de déclencheurs pour chaque nouvelle fonction Lambda, alors que l'extension Lambda Datadog peut être ajoutée en tant que couche Lambda. Contrairement au Forwarder, l'extension Lambda ne requiert pas l'attribution d'autorisations pour installer des piles AWS CloudFormation tierces. De plus, l'extension Lambda envoie des données de télémétrie directement à Datadog : vous n'avez donc pas besoin de gérer des abonnements au groupe de logs CloudWatch pour vos fonctions Lambda.
- **Gestion allégée de l'infrastructure** : la configuration simplifiée de l'extension Lambda minimise la gestion de l'infrastructure. Pour les intégrations AWS ne reposant pas sur Lambda, le Forwarder reste obligatoire.
- **Pas de logs CloudWatch** : le Forwarder convertit les logs en métriques et traces, qui sont ensuite envoyées à Datadog. À l'inverse, l'extension Lambda Datadog envoie les traces, métriques et logs directement à Datadog. Cela réduit ainsi vos coûts associés aux logs CloudWatch.

### Contrepartie

L'extension [augmente la charge de vos fonctions Lambda][4] par rapport aux fonctions sans instrumentation. Cette surcharge entraîne une hausse de vos coûts AWS et de votre simultanéité Lambda, et risque de nuire aux performances des démarrages à froid. Dans la plupart des cas, ces ralentissements ne limitent **pas** les performances de votre fonction. D'après les résultats des derniers benchmarks Datadog, la hausse des coûts découlant de l'utilisation de l'extension Lambda demeure inférieure (ou similaire, pour la transmission de données depuis des régions distantes) aux frais supplémentaires liés à l'utilisation du Forwarder.


[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/serverless
[3]: /fr/serverless/libraries_integrations/forwarder/
[4]: /fr/serverless/libraries_integrations/extension/#overhead