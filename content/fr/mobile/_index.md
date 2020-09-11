---
title: Application mobile Datadog
kind: documentation
further_reading:
  - link: /monitors/
    tag: Documentation
    text: Alertes
  - link: /dashboards/
    tag: Documentation
    text: Dashboards
---
L'application mobile Datadog vous permet de consulter les alertes Datadog sur votre appareil mobile. Lorsque vous recevez une alerte sur Slack, par e-mail, sur Pagerduty ou sur d'autres applications de pager, vous pouvez étudier les problèmes en ouvrant les dashboards et graphiques de suivi sur votre appareil mobile.

## Installation

Téléchargez l'application depuis l'[App Store Apple][1] pour votre appareil iOS ou depuis [Google Play][2] pour votre appareil Android.

### Connexion

Vous pouvez vous connecter à l'aide de l'authentification standard, de l'authentification Google ou du protocole [SAML][3], que ce soit sur le site américain ou sur le site européen.

#### Activation du protocole SAML

La connexion via le protocole SAML nécessite la configuration et l'authentification de votre fournisseur SAML auprès de Datadog. Avant d'essayer de vous connecter via le protocole SAML, suivez ces étapes :

1. Connectez-vous tout d'abord à la [page de profil de votre compte Datadog][4] dans un navigateur et cliquez sur le bouton **Link mobile device** de l'organisation à laquelle vous voulez vous connecter. Un code QR s'affiche alors.
    {{< img src="mobile/link-device.png" alt="page monitors">}}
2. Utilisez l'appareil photo de votre téléphone pour scanner le code QR, puis appuyez sur le lien suggéré pour ouvrir l'application Datadog. L'UDID de l'organisation est automatiquement inséré sur l'écran de connexion.
3. Vous pouvez aussi saisir manuellement l'ID SAML en ouvrant l'application mobile Datadog et en cliquant sur **login with SAML**.
4. Connectez-vous ensuite en suivant le processus de connexion SAML normal. En cliquant sur **Authorize** lors de la connexion, vous reliez votre appareil mobile à votre compte. Pour des raisons de sécurité, vous devrez effectuer ce processus une fois par mois.

**Remarque** : l'application mobile ne prend pas actuellement en charge la connexion initiée par IdP (authentification à partir du fournisseur d'identité SAML). Contactez [l'assistance Datadog][5] pour en savoir plus ou si vous avez des problèmes avec l'authentification SAML.

## Monitors

{{< img src="mobile/monitors_doc2.png" alt="page monitors">}}

Sur la page Monitors, vous pouvez consulter et rechercher tous les monitors auxquels vous avez accès dans votre organisation Datadog. Vos requêtes de recherche peuvent reposer sur un nom de champ ou un build, selon votre stratégie de tagging. Pour en savoir plus sur les recherches, consultez la [section Gérer les monitors][6]. Par exemple, pour filtrer les monitors de métrique associés à l'équipe SRE qui reçoit les alertes, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur une alerte pour voir ses détails. Vous pouvez filtrer les alertes par type et par heure. Il est également possible de désactiver une alerte. Vos dix recherches les plus récentes sont enregistrées, afin que vous puissiez accéder rapidement à vos dernières requêtes.

**Remarque :** pour configurer ou modifier des monitors et des notifications, vous devez accéder à l'[application Web Datadog][7]. Tous les monitors configurés dans l'application Web sont visibles dans l'application mobile. Pour en savoir plus, consultez la section [Créer des monitors][8].

## Dashboards

{{< img src="mobile/dashboards_doc.png" alt="page dashboards">}}

Sur la page Dashboards, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog, et les filtrer à l'aide des template variables définies dans l'application Web Datadog. Cliquez sur un dashboard pour l'afficher.

**Remarque :** pour configurer ou modifier un dashboard, vous devez [passer par un navigateur][9]. Pour en savoir plus, consultez la section [Dashboards][5].

## Compte

Changez d'organisation ou déconnectez-vous sur la page Account.

## Dépannage

Si vous avez besoin d'aide pour le dépannage, [contactez l'assistance Datadog][10]. Vous pouvez aussi envoyer un message sur le canal [Slack public de Datadog][11] [#application-mobile][12]. 

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /fr/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /fr/dashboards/
[6]: /fr/monitors/manage_monitor/#search
[7]: https://app.datadoghq.com/monitors
[8]: /fr/monitors/monitor_types/
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /fr/help/
[11]: https://chat.datadoghq.com/
[12]: https://datadoghq.slack.com/archives/C0114D5EHNG