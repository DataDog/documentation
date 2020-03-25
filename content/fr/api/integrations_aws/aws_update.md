---
title: Mettre à jour une intégration AWS
type: apicontent
order: 15.03
external_redirect: '/api/#mettre-a-jour-une-integration-aws'
---
## Mettre à jour une intégration AWS

Mettre à jour une intégration Datadog/Amazon Web Services.

**PARAMÈTRES DE REQUÊTE** [*cURL uniquement*] :

* **`account_id`** [*obligatoire*] :

    L'ID de votre compte AWS **existant** sans les tirets. Il doit être transmis comme paramètre de requête.
    Uniquement requis pour la configuration de compte basée sur des rôles.
    [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'ID de votre compte AWS.

* **`role_name`** [*obligatoire*] :

    Le nom de votre délégation de rôle Datadog **existante**. Il doit être transmis comme paramètre de requête.
    Uniquement requis pour la configuration de compte basée sur des rôles.
    [Consultez les informations sur la configuration de l'intégration Datadog/AWS pour en savoir plus][2] sur le nom de rôle de votre compte AWS.

* **`access_key_id`** [*obligatoire*] :

    L'ID de votre clé d'accès AWS **existante**. 
    Requis uniquement si votre compte AWS est un compte GovCloud ou Chine. Saisissez l'ID de la clé d'accès correspondante à modifier.
    L'ID doit être transmis comme paramètre de requête.

* **`secret_access_key`** [*obligatoire*] :

    La clé d'accès de votre secret AWS **existant**. 
    Requis uniquement si votre compte AWS est un compte GovCloud ou Chine. Saisissez l'ID de la clé d'accès correspondante.
    L'ID doit être transmis comme paramètre de requête.

**ARGUMENTS SPÉCIFIQUES CURL** :

* **`account_id`** [*facultatif*, *cURL uniquement*] :

    L'ID de votre **nouveau** compte AWS sans les tirets. Il doit être transmis comme argument.
    [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'ID de votre compte AWS.

* **`role_name`** [*facultatif*, *cURL uniquement*] :

    Le nom de votre **nouvelle** délégation de rôle Datadog. Il doit être transmis comme argument.
    [Consultez les informations sur la configuration de l'intégration Datadog/AWS pour en savoir plus][2] sur le nom de rôle de votre compte AWS.

* **`access_key_id`** [*facultatif*, *cURL uniquement*] :

    L'ID de votre **nouvelle** clé d'accès AWS. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

* **`secret_access_key`** [*facultatif*, *cURL uniquement*] :

    La clé d'accès de votre **nouveau** secret AWS. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

**ARGUMENTS** :

* **`account_id`** [*obligatoire*, *Python et Ruby*] :

    L'ID de votre compte AWS **existant** sans les tirets. Il doit être transmis comme argument.
    [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'ID de votre compte AWS.

* **`role_name`** [*obligatoire*, *Python et Ruby*] :

    Le nom de votre délégation de rôle Datadog **existante**. Il doit être transmis comme argument.
    [Consultez les informations sur la configuration de l'intégration Datadog/AWS pour en savoir plus][2] sur le nom de rôle de votre compte AWS.

* **`access_key_id`** [*obligatoire*, *Python et Ruby*] :

    L'ID de votre clé d'accès AWS **existante**. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

* **`secret_access_key`** [*obligatoire*, *Python et Ruby*] :

    La clé d'accès de votre secret AWS **existant**. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

* **`new_account_id`** [*facultatif*, *Python et Ruby*] :

    L'ID de votre compte AWS **existant** sans les tirets. Il doit être transmis comme argument.
    [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'ID de votre compte AWS.

* **`new_role_name`** [*facultatif*, *Python et Ruby*] :

    Le nom de votre **nouvelle** délégation de rôle Datadog. Il doit être transmis comme argument.
    [Consultez les informations sur la configuration de l'intégration Datadog/AWS pour en savoir plus][2] sur le nom de rôle de votre compte AWS.

* **`new_access_key_id`** [*facultatif*, *Python et Ruby*] :

    L'ID de votre **nouvelle** clé d'accès AWS. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

* **`new_secret_access_key`** [*facultatif*, *Python et Ruby*] :

    La clé d'accès de votre **nouveau** secret AWS. 
    Ne s'applique que si votre compte AWS est un compte GovCloud ou Chine.

* **`filter_tags`** [*facultatif*, *valeur par défaut*=**Aucune**] :

    Le tableau de tags EC2 (sous la forme `key:value`) définit un filtre, qui est utilisé par Datadog lors de la collecte des métriques d'EC2. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés.
    Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog. Les autres hosts sont ignorés. Ajoutez `!` devant un tag pour exclure le host correspondant à ce tag.
    Exemple ; `env:production,instance-type:c1.*,!region:us-east-1`.
    Lisez la [documentation relative aux tags AWS][3] pour en savoir plus sur l'ajout de tags EC2.

* **`host_tags`** [*facultatif*, *valeur par défaut*=**Aucune**] :

    Tableau de tags (sous la forme `key:value`) à ajouter à tous les hosts et toutes les métriques transmettant des données via cette intégration.

* **`account_specific_namespace_rules`** [*facultatif*, *valeur par défaut*=**Aucune**] :

    Un objet (sous la forme `{"namespace1":true/false, "namespace2":true/false}`) qui permet d'activer ou de désactiver la collecte de métriques de certains espaces de nommage AWS, uniquement pour ce compte AWS. La liste des espaces de nommage est disponible dans l'endpoint `/v1/integration/aws/available_namespace_rules`.

[1]: /fr/integrations/amazon_web_services/#configuration
[2]: /fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html