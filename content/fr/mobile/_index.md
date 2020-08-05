---
title: Application mobile On-call Datadog
kind: documentation
beta: true
further_reading:
  - link: /monitors/
    tag: Documentation
    text: Alertes
  - link: /dashboards/
    tag: Documentation
    text: Dashboards
---
<div class="alert alert-warning"> Ce service est en bêta publique. Pour participer à cette version bêta, suivez les instructions d'installation. Elle n'est actuellement pas disponible pour les clients utilisant l’authentification SAML. Si vous souhaitez nous faire part de vos remarques, <a href="/help">contactez l'assistance Datadog</a>.</div>

L'application On-call Datadog permet aux ingénieurs en service de consulter les alertes Datadog sur leur appareil mobile. Lorsque vous recevez une alerte sur Slack, par e-mail, sur Pagerduty ou sur d'autres applications de pager, vous pouvez étudier les problèmes en ouvrant les dashboards et graphiques de suivi sur votre appareil mobile.

## Installation

L'application On-call Datadog est actuellement en version bêta et n'est donc pas disponible dans les boutiques d'applications. Pour la télécharger, utilisez les liens d'invitation fournis dans ces instructions.

### iOS

1. Installez l'[application Testflight][1] sur l'App Store.
2. Ouvrez ce lien d'invitation sur votre iPhone : [https://apple.co/2xEC5ke][2]. Autorisez le lien à s'ouvrir dans l'application Testflight. Vous serez redirigé vers une page sur laquelle vous pourrez télécharger l'application Datadog.
3. Une fois l'application téléchargée, ouvrez-la, choisissez le site américain ou européen, puis connectez-vous à l'aide de vos identifiants Datadog.

### Android

1. Pour installer l'application Android, ouvrez ce lien d'invitation sur votre appareil Android : [https://play.google.com/apps/testing/com.datadog.app][3]. Vous serez redirigé vers une page sur laquelle vous pourrez télécharger l'application Datadog.
2. Une fois l'application téléchargée, ouvrez-la, choisissez le site américain ou européen, puis connectez-vous à l'aide de vos identifiants Datadog.

### Connexion

Vous pouvez vous connecter à l'aide de l'authentification standard ou avec Google. La connexion [SAML][4] n'est actuellement pas prise en charge. Si vous avez activé l'authentification SAML sans l'imposer, vous pouvez accéder à l'application mobile en créant une adresse de messagerie standard. Un administrateur de l'organisation devra approuver ce nouveau compte.


## Monitors

{{< img src="mobile/monitors.jpg" alt="page monitor" style="width:50%;">}}

Sur la page Monitors, vous pouvez consulter et rechercher tous les monitors auxquels vous avez accès dans votre organisation Datadog. Vos requêtes de recherche peuvent reposer sur un nom de champ ou un build, selon votre stratégie de tagging. Pour en savoir plus sur les recherches, consultez la [section Gérer les monitors][5]. Par exemple, pour filtrer les monitors de métrique associés à l'équipe SRE qui reçoit les alertes, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur une alerte pour voir ses détails. Vous pouvez filtrer les alertes par type et par heure. Il est également possible de désactiver une alerte. Vos dix recherches les plus récentes sont enregistrées, afin que vous puissiez accéder rapidement à vos dernières requêtes.

**Remarque :** pour configurer ou modifier des monitors et des notifications, vous devez accéder à l'[application Web Datadog][6]. Tous les monitors configurés dans l'application Web sont visibles dans l'application mobile. Pour en savoir plus, consultez la section [Créer des monitors][7].

## Dashboards

Sur la page Dashboards, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog. Cliquez sur un dashboard pour l'afficher.

**Remarque :** pour configurer ou modifier un dashboard, vous devez [passer par un navigateur][8]. Pour en savoir plus, consultez la section [Dashboards][9].

## Compte

Changez d'organisation et déconnectez-vous sur la page Account.

## Dépannage et problèmes connus

- La connexion [SAML][4] n'est actuellement pas prise en charge. Vous pouvez vous connecter à l'aide de l'authentification standard ou avec Google. Si vous avez activé l'authentification SAML sans l'imposer, vous pouvez accéder à l'application mobile en créant une adresse de messagerie standard. Un administrateur de l'organisation devra approuver ce nouveau compte.
- Le changement d'organisation ne fonctionne pas toujours correctement, surtout si la nouvelle organisation exige une authentification Google OAuth.

## Commentaires

Si vous avez des commentaires concernant la version bêta, [contactez l'assistance Datadog][10]. Vous pouvez aussi envoyer un message sur le canal [Slack public de Datadog][11] [#application-mobile][12]. 

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/us/app/testflight/id899247664
[2]: https://apple.co/2xEC5ke
[3]: https://play.google.com/apps/testing/com.datadog.app
[4]: /fr/account_management/saml/#pagetitle
[5]: /fr/monitors/manage_monitor/#search
[6]: https://app.datadoghq.com/monitors
[7]: /fr/monitors/monitor_types/
[8]: https://app.datadoghq.com/dashboard/lists
[9]: /fr/dashboards/
[10]: /fr/help/
[11]: https://chat.datadoghq.com/
[12]: https://datadoghq.slack.com/archives/C0114D5EHNG