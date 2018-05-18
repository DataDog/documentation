---
title: AWS
type: apicontent
order: 14.1
external_redirect: /api/#aws
---

## AWS

Configurer votre intégration Datadog-AWS directement via l'API Datadog.  
[En apprendre plus sur l'intégration Datadog-AWS][1]

##### ARGUMENTS

* **`account_id`** [*obligatoire*]:  
    Votre identifiant de compte AWS sans tirets.
    [Consultez notre intégration Datadog- AWS pour en savoir plus][2] sur votre AWS account ID.

* **`role_name`** [*obligatoire*]:  
    Votre nom de délégation de rôle Datadog.
    [Consultez notre intégration Datadog- AWS pour en savoir plus][3] sur votre nom de Rôle AWS account.

* **`filter_tags`** [*optionnel*, *défaut*=**None**]:  
    Un tableau de balises EC2 (sous la forme `key:value`) définit un filtre utilisé par Datadog lors de la collecte de métriques à partir de EC2. Les wildcards, tels que `?` (Pour les caractères uniques) et `*` (pour les caractères multiples) peuvent également être utilisés.
    Seuls les hôtes correspondant à l'un des tags définis seront importés dans Datadog. Le reste sera ignoré. L'hôte correspondant à un tag donné peut également être exclu en ajoutant `!` Avant le tag.
    e.x. `env:production,instance-type:c1.*,!region:us-east-1`  
    [En savoir plus sur le tagging EC2 dans la documentation de taggin AWS][4].

* **`host_tags`** [*optionnel*, *défaut*=**None**]: 
    Tableau de tags (sous la forme `key:value`) à ajouter à tous les hosts et les métriques rapportant via cette intégration.

* **`account_specific_namespace_rules`** [*optionnel*, *défaut*=**None**]:
    Un objet (sous la forme `{"namespace1":True/False, "namespace2":True/False}`) qui active ou désactive la collecte de métriques pour des namespaces AWS spécifiques pour ce compte AWS uniquement. Une liste de namespaces peut être trouvée sur l'endpoint  `https://api.datadoghq.com/api/v1/integration/aws/available_namespace_rules`.

[1]: /integrations/amazon_web_services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#configuration
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
