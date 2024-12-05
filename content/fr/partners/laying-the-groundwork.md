---
description: Découvrez comment vous lancer ainsi que les décisions clés à prendre
  dès le début.
private: true
title: Préparation du terrain
---

Cette partie du guide aborde les décisions clés que vous devez prendre au début de votre parcours en tant que prestataire de services gérés Datadog.

## Considérations clés pour les prestataires de services gérés

La meilleure façon de se lancer en tant que prestataire de services Datadog dépend de votre modèle commercial et de votre modèle opérationnel :
- **Modèle commercial** : Vous devez impérativement déterminer si vous souhaitez donner à vos clients un accès direct à Datadog ou non. Si vous choisissez de laisser vos clients accéder à Datadog, configurez un compte multi-organisations pour que les données de chaque client restent séparées et privées.
- **Modèle opérationnel** : Demandez-vous également si votre clientèle est constituée de nombreux clients homogènes, auquel cas la gestion automatique de nombreuses organisations Datadog de même nature sera l'aspect le plus important, ou si vous travaillez avec des clients plus restreints ou plus hétérogènes.
Après avoir répondu aux questions ci-dessus, vous pouvez procéder à la configuration de Datadog en tant que prestataire de services gérés.
## Prérequis

Avant d'implémenter Datadog en tant que prestataire de services, nous vous conseillons de suivre la <a href="https://partners.datadoghq.com/prm/English/c/technical_content" target="_blank">formation Technical Specialist de Datadog</a>.

La formation et la certification vous aideront à vous familiariser avec un grand nombre des sujets abordés dans les chapitres suivants, et vous pourrez ainsi vous lancer sans attendre.

## Configuration de l'organisation

En tant que prestataire de services, vous devez d'abord déterminer comment vous souhaitez configurer les comptes Datadog de vos clients, également appelés « organisations ». Si un utilisateur peut être associé à plusieurs organisations, ce n'est pas le cas des ressources surveillées, qui sont propres à chaque organisation. En choisissant la structure qui vous convient le mieux dès le départ, vous pourrez générer de la valeur ajoutée plus rapidement pour vous et vos clients.

### Organisation unique ou compte multi-organisations

Datadog offre la possibilité de gérer plusieurs organisations enfant à partir d'une seule organisation parent. Ce modèle de déploiement est généralement privilégié par les prestataires de services gérés, car il permet d'empêcher que les clients aient accès aux données des autres. Dans une structure multi-organisations, une organisation enfant est créée pour chaque client, et le client a uniquement accès à sa propre organisation enfant. 

Optez pour une organisation unique si vous ne comptez pas donner à vos clients accès à Datadog et que vous n'avez pas besoin de séparer les données de chaque client.

Pour en savoir plus sur la gestion des organisations, consultez la section [Gestion des comptes multi-organisations][1].

### Faut-il utiliser des organisations séparées pour les environnements de développement, de test et de production ?

Les prestataires de services se demandent souvent s'il est préférable de configurer des organisations Datadog distinctes pour gérer les ressources de développement, de test et de production au sein de leurs environnements.

Datadog vous déconseille de séparer vos ressources de développement, de test et de production. La méthode recommandée est de gérer toutes vos ressources depuis la même organisation Datadog et d'utiliser des tags pour faire la distinction entre vos différents environnements. Pour en savoir plus, consultez la section [Stratégie de tagging](#strategie-de-tagging).

## Sous-domaines personnalisés

Si vous gérez un vaste nombre d'organisations, utilisez la fonctionnalité de sous-domaines personnalisés pour améliorer votre expérience Datadog.

Par défaut, l'accès aux différentes organisations Datadog se fait via les pages [https://app.datadoghq.com][2] et [https://app.datadoghq.eu][3]. Toutefois, vous pouvez configurer des sous-domaines personnalisés afin de définir une URL unique pour chaque sous-organisation. Exemple : `https://compte-a.datadoghq.com`. 

Pour en savoir plus, consultez la section [Sous-domaines personnalisés][4].

## Rôles utilisateur et contrôle d'accès à base de rôles (RBAC)

L'expérience a montré que les utilisateurs internes au prestataire de services et les utilisateurs des différents clients ne correspondent pas toujours clairement à l'un des trois [rôles par défaut de Datadog][5]. Il est conseillé de créer des rôles personnalisés pour limiter l'accès des utilisateurs aux sections qui les concernent.

Pour en savoir plus, consultez les ressources suivantes :
- [Rôles personnalisés][6]
- [Contrôle d'accès à base de rôles (RBAC)][7]

## Considérations relatives à l'authentification unique (SSO)

En tant que prestataire de services, il existe deux aspects de l'authentification unique (SSO) à prendre compte :
- Authentification unique pour votre organisation
- Authentification unique pour vos clients

Outre les avantages évidents d'un mécanisme d'authentification unifié, l'utilisation de l'authentification unique SAML simplifie considérablement le processus de provisionnement d'utilisateurs. SAML vous permet d'utiliser le provisionnement juste à temps (JiT) des utilisateurs, éliminant ainsi le besoin de créer des utilisateurs manuellement ou via un système automatisé.

L'authentification SAML peut être est activée au niveau de chaque organisation ou sous-organisation Datadog, ce qui signifie que vous pouvez configurer des fournisseurs SAML différents pour chaque sous-organisation. Sachez toutefois que si vous avez deux groupes d'utilisateurs avec des fournisseurs SAML différents, ces utilisateurs devront faire partie d'organisations distinctes. Assurez-vous de prendre en compte l'authentification SAML durant la planification de votre structure multi-organisations.

Pour en savoir plus, consultez les ressources suivantes :
- [Configurer SAML][8] pour les comptes multi-organisations
- [Authentification unique avec SAML][9]

## Gestion des utilisateurs

### Création des utilisateurs

Datadog offre plusieurs façons de provisionner rapidement des utilisateurs pour leurs organisations respectives :

- [Ajouter des groupes d'utilisateurs depuis l'interface][10]
- [Créer des utilisateurs via l'API][11]
- Utiliser un service d'authentification comme SAML avec le [provisionnement juste à temps (JiT)][12]

### Formation des utilisateurs

L'objectif de Datadog est de proposer un service intuitif et simple d'utilisation. L'expérience a montré que la plupart des utilisateurs apprécient découvrir le produit par eux-mêmes au fur et à mesure.

Si toutefois certains utilisateurs préfèrent se former sur les aspects essentiels du produit, voici quelques ressources utiles :

- [Chaîne YouTube de Datadog][13] : La chaîne propose des vidéos de présentation des nouvelles fonctionnalités, des conseils et astuces ainsi que des recommandations. Il s'agit d'un excellent moyen de découvrir le fonctionnement général du produit.
- [Centre d'apprentissage de Datadog][14] : Le centre d'apprentissage Datadog est idéal pour se familiariser avec la plateforme en profondeur. Lorsqu'un utilisateur rejoint le centre d'apprentissage, un environnement sandbox Datadog est automatiquement et gratuitement mis à sa disposition, lui permettant ainsi d'expérimenter avec le produit sans crainte de casser quoi que ce soit.
- [Blog de Datadog][15] : Avec plus de 700 articles publiés, le blog est une source d'informations essentielle pour découvrir comment surveiller les services, outils et technologies clés qui composent les environnements de vos clients avec Datadog, ainsi que pour rester au courant des nouveaux produits proposés.
- [Portail du réseau de partenaires Datadog][16] : Le portail permet aux prestataires de services qui travaillent en partenariat avec Datadog d'accéder à des formations vidéo à destination du personnel commercial et technique.

Contactez votre représentant Datadog si vous envisagez de créer vos propres supports de formation pour vos clients et que vous souhaitez recommander du contenu à ajouter.

## Et ensuite ?

La partie suivante du guide, [Ingestion de données][17], s'intéresse à l'envoi de données à Datadog.

[1]: /fr/account_management/multi_organization/
[2]: https://app.datadoghq.com
[3]: https://app.datadoghq.eu
[4]: /fr/account_management/multi_organization/#custom-sub-domains
[5]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[7]: /fr/account_management/rbac/
[8]: /fr/account_management/multi_organization/#set-up-saml
[9]: /fr/account_management/saml/
[10]: /fr/account_management/users/#add-new-members-and-manage-invites
[11]: /fr/api/latest/users/#create-a-user
[12]: /fr/account_management/saml/#just-in-time-jit-provisioning
[13]: https://www.youtube.com/user/DatadogHQ
[14]: https://learn.datadoghq.com/
[15]: https://www.datadoghq.com/blog/
[16]: https://partners.datadoghq.com/
[17]: /fr/partners/data-intake/