---
algolia:
  tags:
  - api key
aliases:
- /fr/account_management/faq/how-do-i-reset-my-application-keys/
- /fr/agent/faq/how-do-i-reset-my-datadog-api-keys/
- /fr/account_management/faq/api-app-key-management/
description: Gérez les clés API, les clés d'application et les jetons clients pour
  les applications web avec des fonctionnalités de sécurité.
title: Clés d'API et clés d'application
---
## Clés API {#api-keys}

Les clés API sont uniques à votre organisation. Une [clé API][1] est requise par l'Agent Datadog pour soumettre des métriques et des événements à Datadog.

## Clés d'application {#application-keys}

Les [clés d'application][2], en conjonction avec la clé API de votre organisation, permettent aux utilisateurs d'accéder à l'API programmatique de Datadog. Les clés d'application sont associées au compte utilisateur qui les a créées et, par défaut, ont les permissions de l'utilisateur qui les a créées.

### Mode de lecture unique {#one-time-read-mode}

Le mode de lecture unique (OTR) est une fonctionnalité de sécurité qui limite la visibilité des secrets de clé d'application uniquement au moment de leur création. Lorsque le mode OTR est activé, les secrets de clé d'application ne sont affichés qu'une seule fois lors de leur création et ne peuvent pas être récupérés ultérieurement pour des raisons de sécurité.

#### Pour les nouvelles organisations {#for-new-organizations}

Toutes les clés d'application pour les nouvelles organisations parentes (et leurs organisations enfants) créées après le 20 août 2025 ont le mode OTR activé par défaut. Ce paramètre est permanent et ne peut pas être modifié.

#### Pour les organisations existantes {#for-existing-organizations}

Les administrateurs d'organisation peuvent activer ou désactiver le mode OTR depuis [**Paramètres de l'organisation** > **Clés d'application**][2]. Après avoir activé le mode OTR :

- Les secrets de clé d'application ne sont visibles qu'une seule fois, au moment de leur création
- Ils ne peuvent plus être récupérés via l'interface utilisateur ou l'API
- Le paramètre peut être activé ou désactivé par les administrateurs d'organisation pendant 3 mois après l'activation
- Après 3 mois d'activation continue, le mode OTR devient permanent et l'option de basculement est supprimée.

**Permissions** : Les utilisateurs doivent avoir à la fois les permissions `org_app_keys_write` et `org_management` pour activer ou désactiver le mode OTR pour leur organisation.

### Scopes {#scopes}

Pour mieux protéger et sécuriser vos applications, vous pouvez spécifier des portées d'autorisation pour vos clés d'application afin de définir des permissions plus granulaires et de minimiser l'accès que les applications ont à vos données Datadog. Cela vous donne un contrôle d'accès granulaire sur vos applications et minimise les vulnérabilités de sécurité en limitant l'accès superflu. Par exemple, une application qui ne fait que lire des tableaux de bord n'a pas besoin de droits administratifs pour gérer des utilisateurs ou supprimer des données de votre organisation.

La meilleure pratique recommandée pour définir les clés d'application consiste à leur accorder les privilèges minimaux et les permissions minimales nécessaires pour que l'application fonctionne comme prévu. Les clés d'application définies ne reçoivent que les portées spécifiées par l'utilisateur, et aucune autre permission supplémentaire. Bien que vous puissiez modifier les portées d'autorisation de vos clés d'application à tout moment, considérez comment ces modifications peuvent affecter la fonctionnalité ou l'accès existants de votre application.

**Notes :**

- Les utilisateurs ou comptes de service disposant de [permissions][3] pour créer ou modifier des clés d'application peuvent définir des portées pour les clés d'application. Un utilisateur doit avoir la permission `user_app_keys` pour définir ses propres clés d'application, ou la permission `org_app_keys_write` pour définir des clés d'application appartenant à tout utilisateur de son organisation. Un utilisateur doit avoir la permission `service_account_write` pour définir des clés d'application pour des comptes de service.
- Les propriétaires d'application ne peuvent pas autoriser une application s'ils manquent de permissions requises, même s'ils définissent une clé d'application avec des portées d'autorisation qu'ils ne possèdent pas.
- Les erreurs dues à des permissions manquantes lors de l'écriture de clés d'application ou de l'autorisation d'applications affichent une erreur `403 Forbidden`. Plus d'informations sur les différentes réponses d'erreur peuvent être trouvées dans la documentation de l'[API Datadog][4].
- Si le rôle ou les permissions d'un utilisateur changent, les portées d'autorisation spécifiées pour ses clés d'application restent inchangées.

### Accès à l'API Actions {#actions-api-access}

Les API d'actions incluent :
- [App Builder][5]
- [Actions Connections][6]
- [Automatisation des flux de travail][7]

Pour utiliser des clés d'application avec ces API, vous devez activer l'accès à l'API Actions sur la clé d'application. Cela peut être fait [via l'interface utilisateur][2] ou [l'API][21]. Par défaut, les clés d'application ne peuvent pas être utilisées avec ces API.

{{< img src="account_management/click-enable-actions-api-access.png" alt="Cliquez sur Activer l'accès à l'API Actions" style="width:80%;" >}}

**Remarque** : La section {{< ui >}}Last used{{< /ui >}} n'apparaît que si [le journal d'audit est activé][22] dans le compte et que vous avez la permission [`Audit Trail Read`][23].

## Jetons clients {#client-tokens}

Pour des raisons de sécurité, les clés API ne peuvent pas être utilisées pour envoyer des données depuis un navigateur, une application mobile ou une application TV, car elles seraient exposées côté client. Au lieu de cela, les applications destinées aux utilisateurs finaux utilisent des jetons clients pour envoyer des données à Datadog.

 Plusieurs types de clients doivent utiliser un token client pour envoyer des données. Par exemple :
- Les collecteurs de journaux pour [navigateur web][8], [Android][9], [iOS][10], [React Native][11], [Flutter][12] et [Roku][13] soumettent des journaux.
- Les applications de [Surveillance des utilisateurs réels][14] soumettent des événements et des journaux.

Les jetons clients sont uniques à votre organisation. Pour gérer vos jetons clients, allez à {{< ui >}}Organization Settings{{< /ui >}}, puis cliquez sur l'onglet {{< ui >}}Client Tokens{{< /ui >}}.

**Remarque** : Lorsqu'un utilisateur qui a créé un jeton client est désactivé, le jeton client reste actif.

## Ajoutez une clé API ou un jeton client {#add-an-api-key-or-client-token}

Pour ajouter une clé d'API Datadog ou un token client, procédez comme suit :

1. Accédez aux paramètres de l'organisation, puis cliquez sur l'onglet [**Clés API**][1] ou [**Jetons clients**][15].
2. Cliquez sur le bouton {{< ui >}}New Key{{< /ui >}} ou {{< ui >}}New Client Token{{< /ui >}}, selon celui que vous créez.
3. Entrez un nom pour votre clé ou votre jeton.
4. Cliquez sur {{< ui >}}Create API key{{< /ui >}} ou {{< ui >}}Create Client Token{{< /ui >}}.

{{< img src="account_management/api-key.png" alt="Accédez à la page des clés API pour votre organisation dans Datadog." style="width:80%;" >}}

**Notes :**

- Votre organisation doit avoir au moins une clé API et au maximum 50 clés API.
- Les noms de clés doivent être uniques au sein de votre organisation.

## Supprimez les clés API ou les jetons clients {#remove-api-keys-or-client-tokens}

Pour supprimer une clé API ou un jeton client Datadog, accédez à la liste des clés ou des jetons, puis cliquez sur le {{< ui >}}Delete{{< /ui >}} {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icône à côté de la clé ou du jeton que vous souhaitez supprimer.

## Ajouter des clés d'application {#add-application-keys}

Pour ajouter une clé d'application Datadog, accédez à [**Paramètres de l'organisation** > **Clés d'application**][2]. Si vous avez la [permission][3] de créer des clés d'application, cliquez sur {{< ui >}}New Key{{< /ui >}}.

{{< img src="account_management/app-key.png" alt="Accédez à la page des clés d'application pour votre organisation dans Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Assurez-vous de stocker en toute sécurité votre clé d'application immédiatement après sa création, car le secret de la clé ne peut pas être récupéré ultérieurement.</div>
{{< /site-region >}}

<div class="alert alert-info">Si votre organisation a le mode Lecture Unique (OTR) activé, assurez-vous de stocker en toute sécurité votre clé d'application immédiatement après sa création, car le secret de la clé ne peut pas être récupéré ultérieurement.</div>

**Notes :**

- Les noms de clés d'application ne peuvent pas être vides.

## Supprimer des clés d'application {#remove-application-keys}

Pour supprimer une clé d'application Datadog, accédez à [**Paramètres de l'organisation** > **Clés d'application**][2]. Si vous avez la [permission][3] de créer et de gérer des clés d'application, vous pouvez voir vos propres clés et cliquer sur {{< ui >}}Revoke{{< /ui >}} à côté de la clé que vous souhaitez révoquer. Si vous avez la permission de gérer toutes les clés d'application de l'organisation, vous pouvez rechercher la clé que vous souhaitez révoquer et cliquer sur {{< ui >}}Revoke{{< /ui >}} à côté de celle-ci.

## Délai de propagation des clés et cohérence éventuelle {#key-propagation-delay-and-eventual-consistency}

Les clés API et d'application de Datadog suivent un modèle de cohérence éventuelle. En raison de la nature distribuée des systèmes de Datadog, les mises à jour des clés, telles que la création et la révocation, peuvent prendre quelques secondes pour se propager complètement.

En conséquence :

- N'utilisez pas immédiatement de nouvelles clés API ou d'application dans des workflows critiques. Laissez un bref délai (quelques secondes) pour la propagation. Vous pouvez mettre en œuvre une stratégie de réessai avec un court délai exponentiel pour gérer les erreurs transitoires pendant la fenêtre de propagation.
- Pour valider si une clé API est active et utilisable, appelez le point de terminaison [/api/v1/validate][16].
- Pour vérifier qu'une clé d'application est active, utilisez le point de terminaison `/api/v2/validate_keys` avec la paire de clés appropriée.

L'utilisation d'une clé nouvellement créée avant sa propagation complète peut entraîner des erreurs d'authentification temporaires, telles que 403 Forbidden ou 401 Unauthorized.

## Définir la portée des clés d'application {#scope-application-keys}

Pour spécifier des portées d'autorisation pour les clés d'application, [faites une demande à l'API Datadog][4] ou à l'interface utilisateur pour créer ou modifier une clé d'application. Des portées peuvent être spécifiées pour les clés d'application appartenant à [l'utilisateur actuel][17] ou à un [compte de service][18]. Si ce champ n'est pas spécifié, les clés d'application ont par défaut toutes les mêmes portées et permissions que l'utilisateur qui les a créées.

**Remarques :**

- Les noms de portée sont sensibles à la casse.

## Utilisation de plusieurs clés API {#using-multiple-api-keys}

Envisagez de configurer plusieurs clés API pour votre organisation. Par exemple, utilisez différentes clés API pour chacune de vos différentes méthodes de déploiement : une pour déployer un Agent sur Kubernetes dans AWS, une pour le déployer sur site avec Chef, une pour les scripts Terraform qui automatisent vos tableaux de bord ou vos moniteurs, et une pour les développeurs déployant localement.

L'utilisation de plusieurs clés d'API vous permet d'effectuer une rotation des clés dans le cadre de vos mesures de sécurité ou de révoquer une clé spécifique si elle est exposée par inadvertance ou si vous cessez d'utiliser le service auquel elle est associée.

Si votre organisation a besoin de plus que la limite intégrée de 50 clés API, contactez [Support][19] pour demander une augmentation de votre limite.

## Désactivation d'un compte utilisateur {#disabling-a-user-account}

Si le compte d'un utilisateur est désactivé, toutes les clés d'application que l'utilisateur a créées sont révoquées. Toutes les clés API qui ont été créées par le compte désactivé ne sont pas supprimées et restent valides.

## Transfert de clés {#transferring-keys}

Pour des raisons de sécurité, Datadog ne transfère pas les clés d'application d'un utilisateur à un autre. Si vous devez partager une clé d'application, utilisez un [compte de service][20].

## Que faire si une clé API ou d'application a été exposée {#what-to-do-if-an-api-or-application-key-was-exposed}

Si une clé privée a été compromise ou exposée publiquement, des mesures doivent être prises le plus rapidement possible pour garantir la sécurité de votre compte. Supprimer le fichier contenant la clé d'un site public tel que GitHub **ne** garantit pas qu'il n'a pas déjà été consulté par une autre partie.

Suivez ces étapes pour protéger votre compte :

**Remarque :** Révoquer une clé active peut avoir un impact sur vos services. Si l'étendue de l'utilisation est large ou indéterminée, envisagez les étapes 2-5 **avant** de révoquer la clé concernée.

1. Révoquez la clé concernée.
2. Supprimez le code contenant la clé privée de tous les fichiers accessibles publiquement :
    - Publiez le fichier assaini dans votre dépôt public.
    - Supprimez les données sensibles de votre historique de commits.
3. Créez une nouvelle clé.
4. Mettez à jour les services concernés avec la nouvelle clé.
5. Examinez votre compte pour tout accès non approuvé :
    - Utilisateurs récemment ajoutés
    - Nouvelles ressources
    - Changements de rôles ou de permissions

Si une activité inhabituelle est identifiée, ou si vous avez besoin d'aide supplémentaire pour sécuriser votre compte, contactez [Datadog support][19].

## Dépannage {#troubleshooting}

Besoin d'aide ? Contactez [Datadog support][19].

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