---
title: Créer une intégration AWS
type: apicontent
order: 15.02
external_redirect: '/api/#creer-une-integration-aws'
---
## Créer une intégration AWS

Créer une intégration Datadog/Amazon Web Services.

**Remarque** : la méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle déjà existante dans votre organisation Datadog.

**ARGUMENTS**:

* **`account_id`** [*obligatoire*] :

    Votre identifiant de compte AWS sans les tirets.
   [Consultez l'intégration Datadog/AWS pour en savoir plus][1] sur l'identifiant de votre compte AWS.

* **`access_key_id`** [*facultatif*, *défaut*=**None**] :

    Si votre compte AWS est un compte GovCloud ou Chine, saisissez l'ID de la clé d'accès correspondant.

* **`role_name`** [*obligatoire*] :

    Le nom de votre délégation de rôle Datadog.
   [Consultez les informations sur la configuration de l'intégration Datadog/AWS][2] pour en savoir plus sur le nom de rôle de votre compte AWS.

* **`filter_tags`** [*facultatif*, *défaut*=**None**] :

   Le tableau de tags EC2 (sous la forme `key:value`) définit un filtre, qui est utilisé par Datadog lors de la collecte des métriques de EC2. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés.
    Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog. Les autres hosts sont ignorés. Ajoutez `!` devant un tag pour exclure le host correspondant à ce tag.
    Exemple ; `env:production,instance-type:c1.*,!region:us-east-1`.
   Lisez la [documentation relative aux tags AWS][3] pour en savoir plus sur l'ajout de tags EC2.

* **`host_tags`** [*facultatif*, *défaut*=**None**] :

    Tableau de tags (sous la forme `key:value`) à ajouter à tous les hosts et toutes les métriques transmettant des données via cette intégration.

* **`account_specific_namespace_rules`** [*facultatif*, *défaut*=**None**] :

   Un objet (sous la forme `{"namespace1":true/false, "namespace2":true/false}`) qui permet d'activer ou de désactiver la collecte de métriques de certains espaces de nommage AWS, uniquement pour ce compte AWS. La liste des espaces de nommage est disponible dans l'endpoint `/v1/integration/aws/available_namespace_rules`.

[1]: /fr/integrations/amazon_web_services/#configuration
[2]: /fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html