---
algolia:
  tags:
  - api key
aliases:
- /fr/account_management/faq/how-do-i-reset-my-application-keys/
- /fr/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /fr/account_management/faq/api-app-key-management/
description: Gérez les clés d'API, les clés d'application et les jetons client pour
  les applications de navigateur avec des fonctionnalités de sécurité.
title: Clés d'API et clés d'application
---
## Clés d'API {#api-keys}

Les clés d'API sont uniques à votre organisation. Une [clé d'API][1] est requise par Datadog Agent pour soumettre des métriques et des événements à Datadog.

## Clés d'application {#application-keys}

Les [clés d'application][2], conjointement avec la clé d'API de votre organisation, donnent aux utilisateurs accès à l'API programmatique de Datadog. Les clés d'application sont associées au compte utilisateur qui les a créées et possèdent par défaut les autorisations de l'utilisateur qui les a créées. Certaines API nécessitent un accès supplémentaire sur la clé d'application avant que vous puissiez l'utiliser. Voir [Accès à l'API Actions](#actions-api-access).

### Mode Lecture unique {#one-time-read-mode}

Le mode Lecture unique (OTR) est une fonctionnalité de sécurité qui limite la visibilité des secrets des clés d'application au moment de leur création uniquement. Lorsque le mode OTR est activé, les secrets des clés d'application ne sont affichés qu'une seule fois lors de la création et ne peuvent pas être récupérés ultérieurement pour des raisons de sécurité.

#### Pour les nouvelles organisations {#for-new-organizations}

Toutes les clés d'application pour les nouvelles organisations parentes (et leurs organisations enfants) créées après le 20 août 2025 ont le mode OTR activé par défaut. Ce paramètre est permanent et ne peut pas être modifié.

#### Pour les organisations existantes {#for-existing-organizations}

Les administrateurs d'organisation peuvent activer ou désactiver le mode OTR depuis [**Paramètres de l'organisation** > **Clés d'application**][2]. Après l'activation du mode OTR :

- Les secrets des clés d'application ne sont visibles qu'une seule fois, au moment de la création
- Ils ne sont plus récupérables via l'interface utilisateur ou l'API
- Le paramètre peut être activé ou désactivé par les administrateurs de l'organisation pendant 3 mois après son activation
- Après 3 mois d'activation continue, le mode OTR devient permanent et le bouton bascule est supprimé

**Permissions** : Les utilisateurs doivent disposer à la fois des permissions `org_app_keys_write` et `org_management` pour activer ou désactiver le mode OTR pour leur organisation.

### Portées {#scopes}

Pour mieux protéger et sécuriser vos applications, vous pouvez spécifier des portées d'autorisation pour vos clés d'application afin de définir des permissions plus granulaires et de minimiser l'accès que les applications ont à vos données Datadog. Cela vous donne un contrôle d'accès précis sur vos applications et minimise les vulnérabilités de sécurité en limitant les accès superflus. Par exemple, une application qui lit uniquement les dashboards n'a pas besoin de droits d'administrateur pour gérer les utilisateurs ou supprimer l'une des données de votre organisation.

La meilleure pratique recommandée pour définir la portée des clés d'application consiste à accorder à vos clés les privilèges minimaux et les permissions minimales nécessaires au fonctionnement prévu d'une application. Les clés d'application à portée définie ne reçoivent que les portées spécifiées par l'utilisateur, et aucune autre permission supplémentaire. Bien que vous puissiez modifier les portées d'autorisation de vos clés d'application à tout moment, réfléchissez à la manière dont ces changements pourraient affecter la fonctionnalité ou l'accès existant de votre application.

**Remarques :**

- Les utilisateurs ou les comptes de service disposant des [permissions][3] pour créer ou modifier des clés d'application peuvent définir la portée des clés d'application. Un utilisateur doit disposer de la permission `user_app_keys` pour définir la portée de ses propres clés d'application, ou de la permission `org_app_keys_write` pour définir la portée des clés d'application appartenant à n'importe quel utilisateur de son organisation. Un utilisateur doit disposer de la permission `service_account_write` pour définir la portée des clés d'application pour les comptes de service.
- Les propriétaires d'application ne peuvent pas autoriser une application s'il leur manque des permissions requises, même s'ils définissent une clé d'application avec des portées d'autorisation qu'ils ne possèdent pas.
- Les erreurs dues à des permissions manquantes lors de l'écriture de clés d'application ou de l'autorisation d'applications affichent une erreur `403 Forbidden`. Plus d'informations sur les diverses réponses d'erreur sont disponibles dans la documentation de [Datadog API][4].
- Si le rôle ou les permissions d'un utilisateur changent, les portées d'autorisation spécifiées pour ses clés d'application restent inchangées.

### Accès à l'API Actions {#actions-api-access}

Les API d'action incluent :
- [App Builder][5]
- [Actions Connections][6]
- [Workflow Automation][7]

Afin d'utiliser des clés d'application avec ces API, vous devez activer l'accès à l'API Actions sur la clé d'application. Cela peut être fait [through the UI][2] ou [API][21]. Par défaut, les clés d'application ne peuvent pas être utilisées avec ces API.

{{< img src="account_management/click-enable-actions-api-access.png" alt="Cliquez sur Enable pour l'accès à l'API Actions" style="width:80%;" >}}

**Remarque** : Le {{< ui >}}Last used{{< /ui >}} horodatage est visible par tous les clients. [Audit Trail][22] étend la période de disponibilité de ces informations.

## Jetons client {#client-tokens}

Pour des raisons de sécurité, les clés d'API ne peuvent pas être utilisées pour envoyer des données depuis un navigateur, une application mobile ou une application TV, car elles seraient exposées côté client. Au lieu de cela, les applications destinées aux utilisateurs finaux utilisent des jetons client pour envoyer des données à Datadog.

 Plusieurs types de clients doivent utiliser un token client pour envoyer des données. Par exemple :
- Les collecteurs de logs pour [navigateur web][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] et [Roku][13] soumettent des logs.
- Les applications [Real User Monitoring][14] soumettent des événements et des logs.

Les jetons client sont uniques à votre organisation. Pour gérer vos jetons client, accédez à {{< ui >}}Organization Settings{{< /ui >}}, puis cliquez sur l'onglet {{< ui >}}Client Tokens{{< /ui >}}.

**Remarque** : Lorsqu'un utilisateur ayant créé un jeton client est désactivé, le jeton client reste actif.

## Ajouter une clé d'API ou un jeton client {#add-an-api-key-or-client-token}

Pour ajouter une clé Datadog API ou un token client, procédez comme suit :

1. Accédez aux paramètres de l'organisation, puis cliquez sur l'onglet [**API keys**][1] ou [**Client Tokens**][15].
2. Cliquez sur le bouton {{< ui >}}New Key{{< /ui >}} ou {{< ui >}}New Client Token{{< /ui >}}, selon ce que vous créez.
3. Saisissez un nom pour votre clé ou votre jeton.
4. Cliquez sur {{< ui >}}Create API key{{< /ui >}} ou {{< ui >}}Create Client Token{{< /ui >}}.

{{< img src="account_management/api-key.png" alt="Accédez à la page des clés d'API de votre organisation dans Datadog" style="width:80%;" >}}

**Remarques :**

- Votre organisation doit disposer d'au moins une clé d'API, et jusqu'à 50 clés d'API par défaut. Si vous en avez besoin de plus, [contact Support][19] pour demander une limite plus élevée. Les clés d'API gérées, marquées avec une étiquette {{< ui >}}Managed{{< /ui >}} dans la colonne Nom, sont créées et contrôlées par une intégration ou un service Datadog plutôt que par vous, et ne sont pas comptabilisées dans cette limite. Vous pouvez voir qu'une clé d'API gérée existe et la révoquer, mais vous ne pouvez pas voir sa valeur ni modifier son nom.
- Les noms des clés doivent être uniques au sein de votre organisation.

## Révoquer des clés d'API ou supprimer des jetons client {#revoke-api-keys-or-remove-client-tokens}

Pour révoquer une clé Datadog API, accédez à la liste des clés et cliquez sur l'icône {{< ui >}}Revoke{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icône à côté de la clé. Pour supprimer un jeton client, accédez à la liste des jetons et cliquez sur l'icône {{< ui >}}Delete{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} à côté du jeton.

Une clé d'API révoquée reste dans la liste avec un statut {{< ui >}}Revoked{{< /ui >}} pendant 7 jours, période durant laquelle vous pouvez la restaurer. Consultez [Annuler la révocation d'une clé d'API](#unrevoke-an-api-key). Les jetons client ne prennent pas en charge cette fenêtre de restauration ; une fois qu'un jeton client est supprimé, il ne peut pas être récupéré.

## Annuler la révocation d'une clé d'API {#unrevoke-an-api-key}

Si vous révoquez une clé d'API par erreur, vous pouvez la restaurer dans les 7 jours suivant la révocation. Après 7 jours, une clé d'API révoquée est définitivement supprimée et ne peut pas être récupérée.

Pour annuler la révocation d'une clé d'API :

1. Accédez aux paramètres de l'organisation, puis cliquez sur l'onglet [**Clés d'API**][1].
2. Dans le filtre {{< ui >}}Status{{< /ui >}}, sélectionnez {{< ui >}}Revoked{{< /ui >}}.
3. Localisez la clé que vous souhaitez restaurer.
4. Cliquez sur l'icône {{< ui >}}Unrevoke{{< /ui >}} à côté de la clé.

{{< img src="account_management/unrevoke-api-key.png" alt="La page Clés d'API filtrée sur le statut Révoqué, avec l'icône Annuler la révocation mise en surbrillance à côté d'une clé révoquée" style="width:80%;" >}}

La clé retrouve son statut {{< ui >}}Active{{< /ui >}} avec son nom, son ID et sa valeur d'origine inchangés.

L'annulation de la révocation d'une clé d'API n'est disponible que dans l'UI ; il n'existe aucun endpoint d'API public pour cela.

## Ajouter des clés d'application {#add-application-keys}

Pour ajouter une clé d'application Datadog, accédez à [**Organization Settings** > **Application Keys**][2]. Si vous disposez de l'[autorisation][3] de créer des clés d'application, cliquez sur {{< ui >}}New Key{{< /ui >}}.

{{< img src="account_management/app-key.png" alt="Accédez à la page Clés d'application de votre organisation dans Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Assurez-vous de stocker votre clé d'application en toute sécurité immédiatement après sa création. Le secret de la clé ne pourra pas être récupéré ultérieurement.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Si votre organisation a activé le mode Lecture unique (OTR), assurez-vous de stocker votre clé d'application en toute sécurité immédiatement après sa création. Le secret de la clé ne pourra pas être récupéré ultérieurement.</div>
{{< /site-region >}}

Comme les clés d'API et les clés d'application ont une longue durée de vie et aucune expiration intégrée, stockez-les dans un gestionnaire de secrets, tel qu'AWS Secrets Manager, HashiCorp Vault ou Azure Key Vault, plutôt que dans le code source ou des fichiers d'environnement. AWS Secrets Manager prend en charge la [rotation gérée pour les clés d'API et les clés d'application Datadog][24].

**Remarques :**

- Les noms des clés d'application ne peuvent pas être vides.

## Supprimez les clés d'application {#remove-application-keys}

Pour supprimer une clé d'application Datadog, accédez à [**Paramètres de l'organisation** > **Clés d'application**][2]. Si vous disposez de l'[autorisation][3] de créer et de gérer des clés d'application, vous pouvez voir vos propres clés et cliquer sur {{< ui >}}Revoke{{< /ui >}} à côté de la clé que vous souhaitez révoquer. Si vous disposez de l'autorisation de gérer toutes les clés d'application de l'organisation, vous pouvez rechercher la clé que vous souhaitez révoquer et cliquer sur {{< ui >}}Revoke{{< /ui >}} à côté de celle-ci.

**Remarque** : La révocation d'une clé d'application est permanente. La fenêtre de restauration de 7 jours décrite dans [Annuler la révocation d'une clé d'API](#unrevoke-an-api-key) s'applique uniquement aux clés d'API.

## Délai de propagation des clés et cohérence éventuelle {#key-propagation-delay-and-eventual-consistency}

Les clés d'API et d'application de Datadog suivent un modèle de cohérence éventuelle. En raison de la nature distribuée des systèmes de Datadog, les mises à jour des clés, telles que la création et la révocation, peuvent prendre quelques secondes pour se propager complètement.

En conséquence :

- N'utilisez pas immédiatement les nouvelles clés d'API ou d'application dans des flux de travail critiques. Laissez une courte période (quelques secondes) pour la propagation. Vous pouvez mettre en œuvre une stratégie de nouvelle tentative avec un backoff exponentiel court pour gérer les erreurs transitoires pendant la fenêtre de propagation.
- Pour valider si une clé d'API est active et utilisable, appelez l'endpoint [/api/v1/validate][16].
- Pour vérifier qu'une clé d'application est active, utilisez l'endpoint `/api/v2/validate_keys` avec la paire de clés appropriée.

L'utilisation d'une clé nouvellement créée avant sa propagation complète peut entraîner des erreurs d'authentification temporaires, telles que 403 Forbidden ou 401 Unauthorized.

## Définir la portée des clés d'application {#scope-application-keys}

Pour spécifier les portées d'autorisation des clés d'application, [effectuez une requête auprès de Datadog API][4] ou utilisez l'interface utilisateur pour créer ou modifier une clé d'application. Les portées peuvent être spécifiées pour les clés d'application appartenant à [l'utilisateur actuel][17] ou à un [compte de service][18]. Si ce champ n'est pas spécifié, les clés d'application héritent par défaut de toutes les portées et autorisations de l'utilisateur qui les a créées.

**Remarques :**

- Les noms de portée sont sensibles à la casse.

## Utilisation de plusieurs clés d'API {#using-multiple-api-keys}

Envisagez de configurer plusieurs clés d'API pour votre organisation. Par exemple, utilisez des clés d'API différentes pour chacune de vos méthodes de déploiement : une pour déployer un Agent sur Kubernetes dans AWS, une pour le déployer sur site avec Chef, une pour les scripts Terraform qui automatisent vos dashboards ou vos monitors, et une pour les développeurs qui déploient localement.

L'utilisation de plusieurs clés d'API vous permet d'effectuer une rotation des clés dans le cadre de vos mesures de sécurité ou de révoquer une clé spécifique si elle est exposée par inadvertance ou si vous cessez d'utiliser le service auquel elle est associée.

Si votre organisation a besoin de plus que la limite intégrée de 50 clés d'API, contactez le [support][19] pour demander une augmentation de votre limite.

## Désactivation d'un compte utilisateur {#disabling-a-user-account}

Si le compte d'un utilisateur est désactivé, toutes les clés d'application créées par cet utilisateur sont révoquées. Toutes les clés d'API créées par le compte désactivé ne sont pas supprimées et restent valides.

## Transfert de clés {#transferring-keys}

Pour des raisons de sécurité, Datadog ne transfère pas les clés d'application d'un utilisateur à un autre. Si vous devez partager une clé d'application, utilisez un [compte de service][20].

## Que faire si une clé d'API ou d'application a été exposée {#what-to-do-if-an-api-or-application-key-was-exposed}

Si une clé privée a été compromise ou exposée publiquement, des mesures doivent être prises aussi rapidement que possible pour garantir la sécurité de votre compte. La suppression du fichier contenant la clé d'un site public tel que GitHub **ne garantit pas** qu'il n'a pas déjà été consulté par une tierce partie.

Suivez ces étapes pour protéger votre compte :

**Remarque :** La révocation d'une clé active peut avoir un impact sur vos services. Si l'étendue de l'utilisation est vaste ou indéterminée, envisagez les étapes 2 à 5 **avant** de révoquer la clé concernée.

1. Révoquez la clé concernée.
2. Supprimez le code contenant la clé privée de tout fichier accessible au public :
    - Publiez le fichier nettoyé dans votre dépôt public.
    - Supprimez les données sensibles de votre historique des commits.
3. Créez une nouvelle clé.
4. Mettez à jour les services concernés avec la nouvelle clé.
5. Vérifiez si votre compte a fait l'objet d'accès non approuvés :
    - Utilisateurs récemment ajoutés
    - Nouvelles ressources
    - Modifications de rôles ou d'autorisations

Si une activité inhabituelle est identifiée, ou si vous avez besoin d'aide supplémentaire pour sécuriser votre compte, contactez le [support Datadog][19].

## Dépannage {#troubleshooting}

Besoin d'aide ? Contactez le [support Datadog][19].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /fr/account_management/rbac/permissions
[4]: /fr/api/latest/key-management/
[5]: /fr/api/latest/app-builder/
[6]: /fr/api/latest/action-connection/
[7]: /fr/api/latest/workflow-automation/
[8]: /fr/logs/log_collection/javascript/
[9]: /fr/logs/log_collection/android/
[10]: /fr/logs/log_collection/ios/
[11]: /fr/logs/log_collection/reactnative/
[12]: /fr/logs/log_collection/flutter/
[13]: /fr/logs/log_collection/roku/
[14]: /fr/real_user_monitoring/
[15]: https://app.datadoghq.com/organization-settings/client-tokens
[16]: /fr/api/latest/authentication/#validate-api-key
[17]: /fr/api/latest/key-management/#create-an-application-key-for-current-user
[18]: /fr/api/latest/service-accounts/
[19]: /fr/help/
[20]: /fr/account_management/org_settings/service_accounts/
[21]: /fr/api/latest/action-connection/#register-a-new-app-key
[22]: /fr/account_management/audit_trail/#setup
[23]: /fr/account_management/rbac/permissions/#compliance
[24]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/