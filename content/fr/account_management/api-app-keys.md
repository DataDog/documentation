---
algolia:
  tags:
  - api key
aliases:
- /fr/account_management/faq/how-do-i-reset-my-application-keys/
- /fr/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /fr/account_management/faq/api-app-key-management/
title: Clés d'API et clés d'application
---

## Clés d'API

Les clés d'API sont uniques à votre organisation. Une [clé d'API][1] est requise par l'Agent Datadog pour envoyer des métriques et des événements à Datadog.

## Clés d'application

Les [clés d'application][2] sont utilisées conjointement avec la clé d'API de votre organisation afin de donner aux utilisateurs un accès complet à l'API de programmation de Datadog. Les clés d'application sont associées au compte utilisateur qui les a créées. Par défaut, elles possèdent les autorisations et les portées de cet utilisateur.

### Portées

Afin de mieux protéger et sécuriser vos applications, vous avez la possibilité d'appliquer des [portées d'autorisation][3] à vos clés d'application, de façon à définir des autorisations plus granulaires et à limiter les données auxquelles les applications ont accès. Vous pourrez ainsi contrôler les accès de vos applications avec plus de précision et réduire les failles de sécurité en limitant les accès superflus. Par exemple, une application qui se contente de lire des dashboards n'a pas besoin de pouvoir gérer les utilisateurs ou de supprimer les données de votre organisation.

Lorsque vous appliquez des portées à des clés d'application, il est recommandé d'accorder uniquement les privilèges et les autorisations dont l'application a besoin pour fonctionner correctement. Seules les portées spécifiées par l'utilisateur sont appliquées à la clé d'application : aucune autre autorisation n'est accordée. Vous pouvez modifier la portée d'autorisation d'une clé d'application à tout moment, mais il est essentiel de réfléchir à l'impact que ces modifications auront sur le fonctionnement de votre application et les données auxquelles elle pourra accéder.

**Remarques :**

- Les utilisateurs ou les comptes de service qui disposent des [autorisations][4] pour créer ou modifier des clés d'application peuvent également définir des portées de clés d'application. L'utilisateur doit disposer de l'autorisation `user_app_keys` pour appliquer une portée à ses propres clés d'application, ou de l'autorisation `org_app_keys_write` pour appliquer une portée aux clés d'application des autres utilisateurs de son organisation. L'utilisateur doit disposer de l'autorisation `service_account_write` pour appliquer une portée aux clés d'application des comptes de service.
- Le propriétaire d'une application ne peut pas autoriser une application s'il ne dispose pas de l'ensemble des autorisations requises, même s'il applique une portée d'autorisation qu'il ne possède pas à une clé d'application.
- En cas d'autorisation manquante lors de l'écriture d'une clé d'application ou de l'autorisation d'une application, une erreur `403 Forbidden` est renvoyée. Pour en savoir plus sur les différentes erreurs pouvant être renvoyées, consultez la documentation de l'[API Datadog][5].
- Si le rôle ou les autorisations d'un utilisateur changent, les portées d'autorisation pour ses clés d'application restent identiques.

## Tokens client

Pour des raisons de sécurité, vous ne pouvez pas utiliser de clés d'API pour envoyer des données depuis une application pour navigateur, mobile ou téléviseur : celles-ci seraient exposées côté client. Les applications conçues pour les utilisateurs finaux reposent donc sur des tokens client pour transmettre des données à Datadog.

 Plusieurs types de clients doivent utiliser un token client pour envoyer des données. Par exemple :
- Les collecteurs de logs pour les [navigateurs Web][6], [Android][12], [iOS][13], [React Native][14], [Flutter][15], et [Roku][16], qui envoient des logs.
- Les applications [Real User Monitoring][7], qui envoient des événements et des logs

Les tokens client sont uniques à votre organisation. Pour les gérer, accédez à **Organization Settings**, puis cliquez sur l'onglet **Client Tokens**.

**Remarque** : lorsqu'un utilisateur ayant créé un token client est désactivé, le token client demeure valide.

## Ajouter une clé d'API ou un token client

Pour ajouter une clé d'API Datadog ou un token client, procédez comme suit :

1. Accédez aux paramètres d'organisation, puis cliquez sur l'onglet **API keys** ou **Client Tokens**.
2. Cliquez sur le bouton **New Key** ou **New Client Token**, en fonction de l'élément à créer.
3. Attribuez un nom à votre clé ou à votre token.
4. Cliquez sur **Create API key** ou **Create Client Token**.

**Remarques :**

- Votre organisation doit posséder entre une et 50 clés d'API.
- Les noms de clé doivent être uniques au sein de votre organisation.

## Supprimer des clés d'API ou des tokens client

Pour supprimer une clé d'API ou un token client Datadog, accédez à la liste des clés ou tokens, puis cliquez sur l'icône en forme de **corbeille** de l'option **Revoke** en regard de la clé ou du token à supprimer.

## Ajouter des clés d'application

Pour ajouter une clé d'application Datadog, accédez à **Organization Settings** > **Application Keys**. Cliquez ensuite sur **New Key**. Cette option s'affiche uniquement si vous disposez de l'[autorisation][4] requise pour créer des clés d'application.

**Remarques :**

- Les noms de clé d'application ne peuvent pas être vides.

## Supprimer des clés d'application

Pour supprimer une clé d'application Datadog, accédez à **Organization Settings** > **Application Keys**. Vos clés d'application s'affichent alors. Cliquez ensuite sur l'option **Revoke** en regard de la clé à révoquer. Cette option s'affiche uniquement si vous disposez de l'[autorisation][4] requise pour créer et gérer des clés d'application. Si vous êtes autorisé à gérer toutes les clés d'application de votre organisation, vous pouvez rechercher la clé à révoquer, puis cliquer sur l'option **Revoke** correspondante.

## Appliquer une portée à des clés d'application

Pour appliquer des [portées d'autorisation][3] à des clés d'application, créez ou modifiez une clé d'application via l'[API Datadog][5] ou depuis l'interface. Il est possible d'appliquer une portée aux clés d'application appartenant à [l'utilisateur actuel][8] ou à un [compte de service][9]. Si ce champ n'est pas spécifié, par défaut, la portée de la clé d'application correspondra aux autorisations de l'utilisateur qui l'a créée.

**Remarques :**

- Les noms des portées sont sensibles à la casse.

## Utilisation de plusieurs clés d'API

Pensez à configurer plusieurs clés d'API pour votre organisation. Par exemple, utilisez des clés d'API différentes pour chacune de vos méthodes de déploiement : une pour le déploiement d'un Agent sur Kubernetes dans AWS, une pour le déploiement sur site avec Chef, une pour les scripts Terraform qui automatisent vos dashboards ou monitors, et une pour les développeurs qui réalisent des déploiements localement.

L'utilisation de plusieurs clés d'API vous permet d'effectuer une rotation des clés dans le cadre de vos mesures de sécurité ou de révoquer une clé spécifique si elle est exposée par inadvertance ou si vous cessez d'utiliser le service auquel elle est associée.

Si la limite de 50 clés d'API est insuffisante pour votre organisation, contactez l'[assistance][10] pour demander d'augmenter ce nombre.

## Désactiver un compte utilisateur

Si le compte d'un utilisateur est désactivé, les clés d'application créées par cet utilisateur sont révoquées. Les clés d'API créées par le compte désactivé ne sont pas supprimées et restent valides.

## Transferts de clé

Pour des raisons de sécurité, Datadog ne permet pas le transfert d'une clé d'application d'un utilisateur à un autre. Si vous avez besoin de partager une clé d'application, utilisez un [compte de service][11].

## Que faire en cas d'exposition d'une clé d'API ou d'application

Si une clé privée a été compromise ou exposée publiquement, vous devez prendre des mesures pour sécuriser votre compte aussi vite que possible. Le fait de supprimer le fichier contenant la clé d'un site public comme GitHub ne garantit **pas** qu'un tiers n'y a pas déjà accédé.

Suivez ces étapes pour protéger votre compte :

**Remarque :** la révocation d'une clé active peut affecter le fonctionnement de vos services. Si la portée de la clé est vaste ou inconnue, nous vous conseillons de suivre les étapes 2 à 5 **avant** de révoquer la clé affectée.

1. Révoquez la clé affectée.
2. Supprimez le code contenant la clé privée de tous les fichiers accessibles publiquement :
    - Publiez le fichier corrigé sur votre dépôt public.
    - Supprimez les données sensibles de votre historique de commits.
3. Créez une nouvelle clé.
4. Mettez à jour la clé pour les services affectés.
5. Vérifiez que votre compte n'a fait l'objet d'aucun accès non autorisé :
    - Utilisateurs récemment ajoutés
    - Nouvelles ressources
    - Modifications apportées aux rôles ou aux autorisations

Si vous avez identifié une activité inhabituelle ou que vous avez besoin d'aide pour sécuriser votre compte, contactez l'[assistance Datadog][10].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[3]: /fr/api/latest/scopes/
[4]: /fr/account_management/rbac/permissions
[5]: /fr/api/latest/key-management/
[6]: /fr/logs/log_collection/javascript/
[7]: /fr/real_user_monitoring/
[8]: /fr/api/latest/key-management/#create-an-application-key-for-current-user
[9]: /fr/api/latest/service-accounts/
[10]: /fr/help/
[11]: /fr/account_management/org_settings/service_accounts/
[12]: /fr/logs/log_collection/android/
[13]: /fr/logs/log_collection/ios/
[14]: /fr/logs/log_collection/reactnative/
[15]: /fr/logs/log_collection/flutter/
[16]: /fr/logs/log_collection/roku/