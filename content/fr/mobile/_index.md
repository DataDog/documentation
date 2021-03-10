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

La connexion via le protocole SAML nécessite la configuration et l'authentification de votre fournisseur SAML auprès de Datadog. Pour la connexion SAML initiée par le fournisseur d'identité, consultez la remarque à la fin de cette section. Pour procéder à l'authentification SAML :

1. Cliquez sur le bouton « Using Single Sign-On (SAML)? ».
2. Saisissez votre adresse professionnelle, puis envoyez l'e-mail.
3. Sur votre appareil mobile, ouvrez l'e-mail et cliquez sur le lien qu'il contient.
4. Saisissez les identifiants SAML de votre organisation, qui devraient vous rediriger, une fois la connexion réussie, vers une session authentifiée de l'app mobile Datadog.

Si vous le souhaitez, vous pouvez également vous authentifier à l'aide d'un code QR ou d'une saisie manuelle. Ces méthodes sont décrites ci-dessous.

##### Code QR

1. Connectez-vous tout d'abord à la [page de profil de votre compte Datadog][4] dans un navigateur et cliquez sur le bouton **Link mobile device** de l'organisation à laquelle vous voulez vous connecter. Un code QR s'affiche alors.
    {{< img src="mobile/link-device.png" alt="Profils du compte - Link mobile device">}}
2. Utilisez l'appareil photo de votre téléphone pour scanner le code QR, puis appuyez sur le lien suggéré pour ouvrir l'application Datadog. L'UDID de l'organisation est automatiquement inséré sur l'écran de connexion.

##### Saisie manuelle

1. Pour saisir manuellement l'identifiant SAML, ouvrez l'app mobile Datadog et touchez le bouton « Using Single Sign-On (SAML)?” ».
2. Touchez le bouton « Use another method to login », puis saisissez manuellement l'identifiant SAML.

En cliquant sur **Authorize** lors de la connexion, vous associez l'appareil mobile utilisé à votre compte. Pour des raisons de sécurité, vous devrez effectuer ce processus une fois par mois.

**Remarque** : la connexion SAML initiée par un fournisseur d'identité pour l'app mobile est actuellement disponible en version bêta. Contactez l'[assistance Datadog][5] pour exiger un accès à la bêta, ou si vous rencontrez des problèmes lors du processus d'authentification SAML.

## Monitors

{{< img src="mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="page Monitors">}}

Sur la page Monitors, vous pouvez consulter et rechercher tous les monitors auxquels vous avez accès dans votre organisation Datadog. Vos requêtes de recherche peuvent reposer sur un nom de champ ou un build, selon votre stratégie de tagging. Pour en savoir plus sur les recherches, consultez la [section Gérer les monitors][6].

Par exemple, pour filtrer les monitors de métrique associés à l'équipe SRE qui reçoit les alertes, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur une alerte pour afficher ses détails. Vous pouvez filtrer les alertes par type et par heure. Il est également possible de désactiver une alerte. Vos dix recherches les plus récentes sont enregistrées, afin que vous puissiez accéder rapidement à vos dernières requêtes. De plus, vous pouvez filtrer votre liste de monitors en utilisant les vues enregistrées, qui apparaissent lorsque vous utilisez la barre de recherche. Enfin, affichez et exécutez des tests Synthetic lorsque vous consultez des monitors Synthetic.

**Remarque :** pour configurer ou modifier des monitors, des notifications ou des vues enregistrées, vous devez accéder à l'[application Web Datadog][7]. Tous les monitors configurés dans l'application Web sont visibles dans l'application mobile. Pour en savoir plus, consultez la section relative à la [création de monitors][8].

## Dashboards

{{< img src="mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="page Dashboards">}}

Sur la page Dashboards, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog, et les filtrer à l'aide des template variables définies dans l'application Web Datadog. Filtrez rapidement vos dashboards à l'aide des vues enregistrées des templates variables. Pour en savoir plus sur les vues enregistrées des templates variables, consultez la section relative aux[ vues enregistrées des dashboards][9]. Cliquez sur un dashboard pour ces vues.

**Remarque :** pour configurer ou modifier un dashboard, vous devez [vous connecter depuis un navigateur][10]. Pour en savoir plus, consultez la section [Dashboards][11].

## Actions rapides

{{< img src="mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Actions rapides">}}

Appuyez longuement sur l'icône de l'application pour faire apparaître un menu d'actions rapides permettant d'accéder aux cinq dashboards [les plus fréquemment consultés][12] sous iOS (d'après le nombre de vues et l'activité récente), ou les cinq dashboards les plus ouverts sur mobile sous Android. Appuyez sur un résultat pour ouvrir le dashboard dans l'application.

## Recherche depuis l'écran d'accueil

{{< img src="mobile/iphone_search_doc.png" alt="Recherche depuis l'écran d'accueil" style="width:40%;">}}

**iOS uniquement** : dans la recherche iPhone, filtrez et recherchez le nom de n'importe quel dashboard souhaité. Appuyez sur un résultat pour ouvrir la vue du dashboard directement dans l'application mobile ou appuyez sur l'option « Rechercher dans l'app » pour accéder aux résultats de la recherche sur la page de la liste des dashboards dans l'application.

## Raccourcis et suggestions Siri

**Android** : créez des icônes de raccourci vers vos dashboards en appuyant longuement sur l'icône de l'application Datadog. Si l'application propose des raccourcis, une liste s'affiche. Appuyez longuement sur le raccourci souhaité et faites-le glisser à un autre endroit sur votre écran pour créer une icône de raccourci unique.

**iOS** : créez des raccourcis Siri vers des dashboards et des monitors Datadog grâce à l'application Raccourcis. Pour créer un raccourci, vous devez avoir exécuté l'action souhaitée au moins une fois dans l'application. Par exemple, pour créer un raccourci « Ouvrir le dashboard d'aperçu AWS », ouvrez le dashboard d'aperçu AWS dans votre application mobile au moins une fois.

Avec le raccourci, vous pouvez accéder à vos dashboards et à vos monitors de trois façons différentes :

- Épinglez le raccourci à votre écran d'accueil en tant qu'icône. Pour ce faire, accédez à l'application Raccourcis et ouvrez le menu de modification du raccourci vers votre dashboard.
- Commande vocale Siri : dites le nom de votre raccourci, par exemple « Ouvrir l'aperçu AWS », pour que Siri ouvre votre dashboard dans l'application.
- Suggestions Siri : Siri enregistre vos habitudes et vous suggère des raccourcis vers les dashboards dont vous avez le plus besoin. Ces suggestions s'affichent dans un bandeau sur l'écran d'accueil ou l'écran de verrouillage, sur l'écran de recherche iPhone ou dans les widgets de suggestions Siri sur iOS 14.

{{< img src="mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Raccourcis">}}

Pour en savoir plus sur les raccourcis et les suggestions Siri, consultez la [documentation d'Apple dédiée à Siri][13].

## Handoff

**iOS uniquement** : utilisez la fonctionnalité Handoff d'Apple pour continuer une tâche sur vos différents appareils Apple. Lorsque l'application mobile Datadog est en cours d'utilisation, son icône apparaît sur votre Mac à l'extrémité gauche du Dock. Cliquez sur l'icône pour ouvrir votre dashboard ou votre monitor actuel sur votre Mac.

Pour que la fonctionnalité Handoff fonctionne, chaque appareil doit :

- être connecté à iCloud avec le même identifiant Apple ;
- avoir le Bluetooth activé ;
- avoir le Wi-Fi activé 
- avoir Handoff activé.

Pour en savoir plus sur Handoff, consultez la [documentation d'Apple dédiée à Handoff][14].

## Compte

Changez d'organisation ou déconnectez-vous sur la page Account.

## Dépannage

Si vous avez besoin d'aide pour résoudre d'éventuels problèmes, [contactez l'assistance Datadog][5]. Vous pouvez aussi envoyer un message sur le canal [Slack public de Datadog][15] [#mobile-app][16].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /fr/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /fr/help/
[6]: /fr/monitors/manage_monitor/#search
[7]: https://app.datadoghq.com/monitors
[8]: /fr/monitors/monitor_types/
[9]: /fr/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /fr/dashboards/
[12]: https://app.datadoghq.com/dashboard/lists/preset/5
[13]: https://support.apple.com/en-us/HT209055
[14]: https://support.apple.com/en-us/HT209455
[15]: https://chat.datadoghq.com/
[16]: https://datadoghq.slack.com/archives/C0114D5EHNG