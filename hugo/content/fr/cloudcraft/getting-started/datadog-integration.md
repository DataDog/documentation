---
title: Intégration Datadog
---

## Présentation

L'intégration entre Datadog et Cloudcraft fournit aux utilisateurs un workflow simplifié pour la surveillance et la visualisation de leur infrastructure cloud.

En tirant parti de la puissante plateforme de surveillance de Datadog, vous pouvez vous connecter à Cloudcraft avec votre compte Datadog, passer aisément de n'importe quelle ressource dans Cloudcraft aux vues correspondantes dans Datadog, et ajouter automatiquement à Cloudcraft les comptes cloud qui ont déjà été configurés dans Datadog.

## Authentification unique (SSO) Datadog

Vous pouvez vous inscrire et vous connecter à Cloudcraft à l'aide de votre compte Datadog. Cette intégration offre une expérience unifiée en associant vos données de surveillance Datadog à vos diagrammes d'architecture Cloudcraft.

### S'inscrire avec le SSO Datadog

Pour commencer, choisissez l'option **Sign up with Datadog** lors de votre inscription à Cloudcraft. Une fois l'inscription terminée, vous pouvez vous connecter à Cloudcraft à l'aide de vos identifiants Datadog. Cela simplifie le processus de connexion et permet d'intégrer les deux plateformes.

En utilisant le SSO Datadog, vous bénéficiez automatiquement des avantages suivants :

- **Fonctionnalités multiplateforme** : basculez facilement entre Cloudcraft et Datadog pour analyser votre infrastructure cloud et ses performances.
- **Intégration automatisée des comptes cloud** : les comptes cloud configurés dans Datadog sont automatiquement ajoutés à Cloudcraft, ce qui vous permet de visualiser l'ensemble de votre infrastructure sur les deux plateformes.

### Activer le SSO Datadog pour des comptes existants

Si, lors de votre inscription initiale, vous avez utilisé une autre méthode de connexion, par exemple le SSO Google ou un nom d'utilisateur et un mot de passe standard, vous n'avez pas accès à l'ensemble des fonctionnalités d'intégration de Datadog. Pour utiliser plutôt le SSO Datadog, [contactez l'équipe d'assistance Cloudcraft][1] afin qu'elle vous aide à convertir votre compte.

## Intégration des comptes cloud

<div class="alert alert-info">Cette fonctionnalité prend uniquement en charge les comptes Amazon Web Services (AWS). La synchronisation avec Azure ou avec d'autres fournisseurs cloud n'est pour l'instant pas disponible.</div>

L'intégration entre Cloudcraft et Datadog simplifie la gestion des comptes cloud, en ajoutant automatiquement à Cloudcraft les comptes déjà configurés dans Datadog. Aucune configuration supplémentaire n'est requise dans Cloudcraft.

Par défaut, ces comptes sont partagés avec tous les membres de votre équipe Cloudcraft, ce qui facilite l'accès de tous.

{{< img src="cloudcraft/getting-started/datadog-integration/manage-aws-accounts.png" alt="L'interface Manage AWS Accounts dans Cloudcraft avec l'intégration Datadog." responsive="true" style="width:100%;">}}

Pour visualiser et schématiser des ressources dans Cloudcraft, [assurez-vous que la collecte des ressources est activée sur Datadog][2]. Lorsque c'est le cas, Datadog recueille des informations sur vos ressources AWS en effectuant des appels d'API en lecture seule sur votre compte AWS. Cloudcraft s'appuie sur ces informations pour représenter votre infrastructure. Sans la collecte des ressources, vos comptes AWS sont ajoutés à Cloudcraft, mais aucune ressource n'est disponible pour les diagrammes.

Si la plateforme Datadog ne contient aucun compte AWS, vous devez d'abord ajouter un ou plusieurs comptes AWS. Suivez les instructions indiquées dans le [guide sur l'intégration AWS][3].

### Gérer les comptes AWS ajoutés à Cloudcraft

Dans Cloudcraft, sous l'onglet **Live**, les comptes AWS ajoutés depuis Datadog sont identifiés par le logo de Datadog (Bits).

{{< img src="cloudcraft/getting-started/datadog-integration/bits-icon.png" alt="L'outil de sélection de comptes cloud affichant les comptes AWS gérés dans l'intégration entre Cloudcraft et Datadog." responsive="true" style="width:100%;">}}

Si vous disposez d'un grand nombre de comptes, mais que vous souhaitez visualiser seulement certains d'entre eux, vous pouvez utiliser les paramètres de visibilité pour masquer des comptes spécifiques depuis l'outil de sélection de comptes de l'onglet **Live**.

Pour gérer les paramètres de visibilité de ces comptes, procédez comme suit :

1. Accédez à **User > AWS Accounts**.
2. Sélectionnez l'option **Edit** (représentée par une icône de crayon en regard du nom du compte).
3. Activez l'option **Visibility on Live** pour choisir si le compte est ou non visible par l'équipe.

Pour gérer le nom du compte, procédez comme suit :

1. Accédez à **User > AWS Accounts**.
2. Sélectionnez l'option **Edit** (représentée par une icône de crayon en regard du nom du compte).
3. Modifiez le nom du compte dans le champ **Name**.

<div class="alert alert-info">Les modifications apportées au nom ou aux paramètres de visibilité n'auront pas d'incidence sur le compte dans la plateforme Datadog.</div>

### Avantages en termes de performances

Comparés aux comptes AWS ajoutés directement dans Cloudcraft, les comptes AWS ajoutés depuis Datadog offrent de meilleures performances lors de la création de diagrammes. En effet, Cloudcraft utilise des données qui ont déjà été recueillies par Datadog, plutôt que de faire appel aux API AWS.

## Menu Bits

Le menu Bits de Cloudcraft vous permet d'accéder aux informations pertinentes de Datadog à partir de n'importe quelle ressource de votre diagramme d'architecture. Que vous ayez besoin de consulter des logs, d'afficher des traces APM ou d'analyser des métriques, vous pouvez utiliser le menu Bits pour naviguer facilement de Cloudcraft à Datadog en un seul clic, sans perdre le contexte.

Pour plus d'informations sur l'utilisation du menu Bits, reportez-vous à la [documentation pertinente][4].

[1]: https://app.cloudcraft.co/app/support
[2]: /fr/integrations/amazon_web_services/#resource-collection
[3]: /fr/integrations/amazon_web_services/
[4]: /fr/cloudcraft/getting-started/using-bits-menu/