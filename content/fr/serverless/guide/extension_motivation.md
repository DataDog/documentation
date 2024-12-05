---
further_reading:
- link: /serverless/configuration/#migrer-vers-l-extension-lambda-datadog
  tag: Documentation
  text: Migration vers l'extension Lambda Datadog

title: Choisir s'il est pertinent de migrer vers l'extension Lambda Datadog
---

## Est-il pertinent de migrer vers l'extension Lambda Datadog dans votre situation ?

Les extensions AWS Lambda s'exécutent au sein de l'environnement d'exécution Lambda, en même temps que le code de votre fonction Lambda. Datadog s'est associé avec AWS afin de créer l'[extension Lambda Datadog][1]. Il s'agit d'une version légère de l'Agent Datadog capable d'envoyer des métriques custom, des métriques optimisées, des traces et des logs.

Si vous avez configuré les [fonctionnalités sans serveur Datadog][2] avant le lancement officiel de l'extension Lambda Datadog, vous utilisez probablement le [Forwarder Datadog][3] pour envoyer des métriques custom, des métriques optimisées, des traces et des logs.

Il existe d'importantes différences entre l'extension Lambda et le Forwarder. Cette page décrit les différents aspects à prendre en compte si vous songez à migrer depuis le Forwarder vers l'extension Lambda.

### Différences fonctionnelles

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrumenter des applications sans serveur AWS" style="width:100%;">}}

Bien qu'il soit désormais recommandé d'utiliser l'extension Lambda à la place du Forwarder pour recueillir des données de télémétrie à partir de fonctions Lambda, seul le Forwarder doit être utilisé pour recueillir des métadonnées et les ajouter aux logs d'autres services AWS, notamment API Gateway, AppSync et Lambda@Edge.

### Avantages

L'extension Lambda Datadog présente plusieurs avantages par rapport au Forwarder Datadog :

- **Pas de logs CloudWatch** : le Forwarder extrait les données de télémétrie des logs, puis les envoie à Datadog. À l'inverse, l'extension Lambda Datadog envoie les données de télémétrie directement à Datadog, ce qui réduit ainsi vos coûts associés aux logs CloudWatch et à la fonction Lambda du Forwarder.
- **Configuration simplifiée** : l'extension Lambda Datadog peut être ajoutée en tant que couche Lambda afin d'envoyer les données de télémétrie directement à Datadog, vous évitant ainsi d'avoir à configurer un filtre d'abonnement pour le groupe de logs CloudWatch de chaque nouvelle fonction Lambda.

### Contrepartie

L'extension [augmente la charge de vos fonctions Lambda][4] par rapport aux fonctions sans instrumentation. en raison du chargement de lʼextension lors de démarrages à froid et à lʼenvoi dʼun grand nombre de données de télémétrie à Datadog. Dans la plupart des cas, ces ralentissements ne limitent **pas** les performances de votre fonction. D'après les résultats des derniers benchmarks Datadog, la hausse des coûts découlant de l'utilisation de l'extension Lambda demeure inférieure aux frais supplémentaires liés à l'utilisation du Forwarder.

### Conclusion

Si vous souhaitez uniquement collecter des logs, en particulier à partir de nombreuses fonctions Lambda il est judicieux de continuer à utiliser le Forwarder de Datadog. Si vous collectez également des métriques et des traces à partir de vos fonctions Lambda, nous vous recommandons de migrer vers l'extension Lambda Datadog.

## Migrer vers l'extension Lambda Datadog

Pour effectuer la migration du Forwarder Datadog à l'extension Lambda Datadog, consultez la [documentation relative à la configuration du sans serveur][5].
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/serverless
[3]: /fr/logs/guide/forwarder/
[4]: /fr/serverless/libraries_integrations/extension/#overhead
[5]: /fr/serverless/configuration/#migrate-to-the-datadog-lambda-extension