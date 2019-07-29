---
title: Clés d'API et clés d'application
kind: faq
aliases:
  - /fr/account_management/faq/how-do-i-reset-my-application-keys/
  - /fr/agent/faq/how-do-i-reset-my-datadog-api-keys/
  - /fr/account_management/faq/api-app-key-management/
---
## Clés d'API

Les clés d'API sont uniques à votre organisation. Une clé d'API est requise par l'Agent Datadog pour envoyer des métriques et des événements à Datadog.

## Clés d'application

Les clés d'application sont utilisées conjointement avec la clé d'API de votre organisation afin de vous donner un accès complet à l'API de programmation de Datadog. Les clés d'application sont associées au compte utilisateur qui les a créées et doivent être nommées. La clé d'application est utilisée pour loguer toutes les requêtes effectuées via l'API.

## Jetons client

<div class="alert alert-warning">
Les jetons client sont en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin d'activer cette fonctionnalité pour votre compte.
</div>

Les jetons client sont uniques à votre organisation. Un jeton client est requis par le [collecteur de logs de navigateur Web][1] pour envoyer des logs à Datadog.
Ces jetons ne peuvent être utilisés que pour envoyer des logs de navigateur Web à Datadog.

## Ajouter une clé ou un jeton

Pour ajouter une clé d'API, une clé d'application ou un jeton client Datadog, accédez à [Integration -> APIs][2], saisissez le nom de votre clé ou jeton et cliquez sur **Create API key**, **Create Application Key** ou **Create Client Token**.

**Remarque** :

* Votre organisation doit posséder au moins une clé d'API et au plus cinq clés d'API.
* Les noms de clé doivent être uniques au sein de votre organisation.
* Les noms de clé d'application ne peuvent pas être vides.

## Supprimer une clé ou un jeton

Pour supprimer une clé d'API, une clé d'application ou un jeton client Datadog, accédez à [Integration -> APIs][2] et sélectionnez le bouton **Revoke** correspondant à la clé ou au jeton que vous souhaitez supprimer :

{{< img src="account_management/api_app_keys/application_keys.png" alt="Clés d'application" responsive="true" >}}

## Transferts de clé d'API ou d'application
Pour des raisons de sécurité, Datadog ne permet pas le transfert d'une clé d'API ou d'application d'un utilisateur à un autre. Nous vous conseillons de garder la trace de vos clés d'API/d'application et de les renouveler lorsqu'un utilisateur quitte la société. De cette façon, un utilisateur qui a quitté la société ne peut plus accéder à votre compte ni à l'API Datadog. Le transfert de clé d'API ou d'application permettrait à un utilisateur qui ne fait plus partie de la société de continuer à envoyer et à recevoir des données via l'API Datadog. Certains clients ont également demandé à changer le handle auquel les clés d'API et d'application sont associées. Toutefois, cette méthode ne permet pas de résoudre le problème de fond : un utilisateur qui ne fait plus partie de la société pourra toujours envoyer et récupérer des données à partir de l'API Datadog.

Par ailleurs, plusieurs organisations ont également demandé à créer un « compte de service » afin de gérer leurs clés d'API et d'application. Bien que cette méthode soit appropriée dans de nombreux cas, il ne doit pas s'agir d'un simple compte partagé accessible à tout le monde. Si vous prévoyez d'utiliser un « compte de service », assurez-vous de sécuriser le stockage de ses identifiants (par exemple, en utilisant un gestionnaire de mots de passe et en appliquant le principe du moindre privilège). Pour éviter toute fuite accidentelle des identifiants du compte de service, l'accès à ce compte doit être restreint à un petit nombre de personnes (idéalement, aux personnes en charge de la gestion du compte uniquement).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/logs/log_collection/javascript
[2]: https://app.datadoghq.com/account/settings#api
[3]: /fr/help