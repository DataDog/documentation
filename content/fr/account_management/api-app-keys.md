---
title: Clés d'API et clés d'application
kind: faq
aliases:
  - /fr/account_management/faq/how-do-i-reset-my-application-keys/
  - /fr/agent/faq/how-do-i-reset-my-datadog-api-keys/
  - /fr/account_management/faq/api-app-key-management/
---
## Clés d'API

Les clés d'API sont uniques à votre organisation. Une [clé d'API][1] est requise par l'Agent Datadog pour envoyer des métriques et des événements à Datadog.

## Clés d'application

Les [clés d'application][2] sont utilisées conjointement avec la clé d'API de votre organisation afin de donner aux utilisateurs un accès complet à l'API de programmation de Datadog. Les clés d'application sont associées au compte utilisateur qui les a créées et possèdent les autorisations et capacités de l'utilisateur de cet utilisateur.

## Tokens client

Pour gérer vos tokens client, accédez à la section `Client Tokens` de la [page de configuration des API Datadog][1], comme illustré ici :

{{< img src="account_management/api_app_keys/client_tokens.png" style="width:80%;" alt="Tokens client"  >}}

Les tokens client sont uniques à votre organisation. Un token client est requis par le [collecteur de logs du navigateur Web][3] pour envoyer des logs à Datadog, et par la fonctionnalité [Real User Monitoring][4] pour envoyer des événements et des logs à Datadog.

Pour des raisons de sécurité, vous ne pouvez pas utiliser les clés d'API pour envoyer des données à un navigateur : celles-ci seraient exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un token client.

## Ajouter une clé d'API ou un token client

Pour ajouter une clé d'API ou un token client Datadog, accédez à [Integration -> APIs][1], entrez un nom pour votre clé ou token, puis cliquez sur **Create API key** ou **Create Client Token**.

**Remarque** :

* Votre organisation doit posséder entre une et 50 clés d'API.
* Les noms de clé doivent être uniques au sein de votre organisation.

## Supprimer des clés d'API ou des token client

Pour supprimer une clé d'API ou un token client Datadog, accédez à [Integration -> APIs][1] et cliquez sur l'option **Revoke** en regard de la clé ou du token à supprimer :

{{< img src="account_management/api_app_keys/api_keys_revoke.png" alt="Revoquer des clés d'API"  >}}

## Ajouter des clés d'application

Pour ajouter une clé d'application Datadog, accédez à [Teams -> Application Keys][2]. Cliquez ensuite sur **New Key**. Cette option s'affiche uniquement si vous disposez de l'[autorisation][5] requise pour créer des clés d'application.

{{< img src="account_management/api_app_keys/application_keys_new_key.png" alt="Créer des clés d'application"  >}}

**Remarques** :

* Les noms de clé d'application ne peuvent pas être vides.

## Supprimer des clés d'application

Pour supprimer une clé d'application Datadog, accédez à [Teams -> Application Keys][2]. Vos clés d'application s'affichent alors. Cliquez ensuite sur l'option **Revoke** en regard de la clé à révoquer. Cette option s'affiche uniquement si vous disposez de l'[autorisation][5] requise pour créer et gérer des clés d'application. Si vous êtes autorisé à gérer toutes les clés d'application de votre organisation, vous pouvez rechercher la clé à révoquer, puis cliquer sur l'option **Revoke** correspondante :

{{< img src="account_management/api_app_keys/application_keys_revoke.png" alt="Révoquer des clés d'application"  >}}

## Utilisation de plusieurs clés d'API

Pensez à configurer plusieurs clés d'API pour votre organisation. Par exemple, utilisez des clés d'API différentes pour chacune de vos méthodes de déploiement : une pour le déploiement d'un Agent sur Kubernetes dans AWS, une pour le déploiement sur site avec Chef, une pour les scripts Terraform qui automatisent vos dashboards ou monitors, et une pour les développeurs qui réalisent des déploiements localement.

L'utilisation de plusieurs clés d'API vous permet d'effectuer une rotation des clés dans le cadre de vos mesures de sécurité ou de révoquer une clé spécifique si elle est exposée par inadvertance ou si vous cessez d'utiliser le service auquel elle est associée.

Si la limite de 50 clés d'API est insuffisante pour votre organisation, contactez l'[assistance][6] pour demander d'augmenter ce nombre.

## Désactiver un compte utilisateur

Si le compte d'un utilisateur est désactivé, les clés d'application créées par l'utilisateur sont supprimées. Les clés d'API créées par le compte désactivé ne sont pas supprimées et restent valides.

## Transferts de clé

Pour des raisons de sécurité, Datadog ne permet pas le transfert d'une clé d'API ou d'application d'un utilisateur à un autre. Nous vous conseillons de garder la trace de vos clés d'API/d'application et de les renouveler lorsqu'un utilisateur quitte la société. De cette façon, un utilisateur qui a quitté la société ne peut plus accéder à votre compte ni à l'API Datadog. Le transfert de clé d'API ou d'application permettrait à un utilisateur qui ne fait plus partie de la société de continuer à envoyer et à recevoir des données via l'API Datadog. Certains clients ont également demandé à changer le handle auquel les clés d'API et d'application sont associées. Toutefois, cette méthode ne permet pas de résoudre le problème de fond : un utilisateur qui ne fait plus partie de la société pourra toujours envoyer et récupérer des données à partir de l'API Datadog.

Par ailleurs, plusieurs organisations ont également demandé à créer un « compte de service » afin de gérer leurs clés d'API et d'application. Bien que cette méthode soit appropriée dans de nombreux cas, il ne doit pas s'agir d'un simple compte partagé accessible à tout le monde. Si vous prévoyez d'utiliser un « compte de service », assurez-vous de sécuriser le stockage de ses identifiants (par exemple, en utilisant un gestionnaire de mots de passe et en appliquant le principe du moindre privilège). Pour éviter toute fuite accidentelle des identifiants du compte de service, l'accès à ce compte doit être restreint à un petit nombre de personnes (idéalement, aux personnes en charge de la gestion du compte uniquement).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/access/application-keys
[3]: /fr/logs/log_collection/javascript/
[4]: /fr/real_user_monitoring/
[5]: /fr/account_management/rbac/permissions/
[6]: /fr/help/