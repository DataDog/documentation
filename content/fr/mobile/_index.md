---
further_reading:
- link: /monitors/
  tag: Documentation
  text: Alertes
- link: /dashboards/
  tag: Documentation
  text: Dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Gagnez en flexibilité grâce aux widgets de dashboards mobiles Datadog
kind: documentation
title: Application mobile Datadog
---

L'application mobile Datadog vous permet de consulter les alertes Datadog sur votre appareil mobile. Lorsque vous recevez une alerte sur Slack, par e-mail, sur Pagerduty ou sur d'autres applications de pager, vous pouvez étudier les problèmes en ouvrant les dashboards et graphiques de suivi sur votre appareil mobile.

## Installation

Téléchargez l'application depuis l'[App Store Apple][1] pour votre appareil iOS ou depuis [Google Play][2] pour votre appareil Android.

{{< img src="mobile/mobile_app_qr_code.png" style="width:40%; background:none; border:none; box-shadow:none;" alt="Télécharger l'application mobile Datadog">}}

### Connexion

Vous pouvez vous connecter à l'aide de l'authentification standard, de l'authentification Google ou du protocole [SAML][3], que ce soit sur le site américain ou sur le site européen.

#### Activation du protocole SAML

La connexion via le protocole SAML nécessite la configuration et l'authentification de votre fournisseur SAML auprès de Datadog. Pour la connexion SAML initiée par un fournisseur d'identité, consultez la fin de cette section. Pour procéder à l'authentification SAML :

1. Cliquez sur le bouton « Using Single Sign-On (SAML)? ».
2. Saisissez votre adresse professionnelle, puis envoyez l'e-mail.
3. Sur votre appareil mobile, ouvrez l'e-mail et cliquez sur le lien qu'il contient.
4. Saisissez les identifiants SAML de votre organisation, qui devraient vous rediriger, une fois la connexion réussie, vers une session authentifiée de l'app mobile Datadog.

Si vous le souhaitez, vous pouvez également vous authentifier à l'aide d'un code QR ou d'une saisie manuelle. Ces méthodes sont décrites ci-dessous.

##### Code QR

1. Connectez-vous tout d'abord à la [page de profil de votre compte Datadog][4] dans un navigateur et cliquez sur le bouton **Link mobile device** de l'organisation à laquelle vous voulez vous connecter. Un code QR s'affiche alors.
    {{< img src="mobile/link-device.png" alt="Link mobile device" style="width:80%;">}}
2. Utilisez l'appareil photo de votre téléphone pour scanner le code QR, puis appuyez sur le lien suggéré pour ouvrir l'application Datadog. L'UDID de l'organisation est automatiquement inséré sur l'écran de connexion.

##### Saisie manuelle

1. Pour saisir manuellement l'identifiant SAML, ouvrez l'app mobile Datadog et touchez le bouton « Using Single Sign-On (SAML)?” ».
2. Touchez le bouton « Use another method to login », puis saisissez manuellement l'identifiant SAML.

En cliquant sur **Authorize** lors de la connexion, vous associez l'appareil mobile utilisé à votre compte. Pour des raisons de sécurité, vous devrez effectuer ce processus une fois par mois.

##### Connexion SAML initiée par un fournisseur d'identité

Si vous recevez systématiquement une erreur lorsque vous essayez de vous connecter via SAML, il est possible que votre fournisseur d'identité impose une connexion initiée par un fournisseur d'identité. Pour découvrir comment activer ce type de connexion, consultez notre [page dédiée][5].

## Monitors

{{< img src="mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="page Monitors">}}

Sur la page Monitors, vous pouvez consulter et rechercher tous les monitors auxquels vous avez accès dans votre organisation Datadog. Vos requêtes de recherche peuvent reposer sur un nom de champ ou un build, selon votre stratégie de tagging. Pour en savoir plus sur les recherches, consultez la [section Gérer les monitors][6].

Par exemple, pour filtrer les monitors de métrique associés à l'équipe SRE qui reçoit les alertes, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur une alerte pour afficher ses détails. Vous pouvez filtrer les alertes par type et par heure. Il est également possible de désactiver une alerte. Vos dix recherches les plus récentes sont enregistrées, afin que vous puissiez accéder rapidement à vos dernières requêtes. De plus, vous pouvez filtrer votre liste de monitors en utilisant les vues enregistrées, qui apparaissent lorsque vous utilisez la barre de recherche. Enfin, affichez et exécutez des tests Synthetic lorsque vous consultez des monitors Synthetic.

**Remarque :** pour configurer ou modifier des monitors, des notifications ou des vues enregistrées, vous devez accéder à l'[application Web Datadog][7]. Tous les monitors configurés dans l'application Web sont visibles dans l'application mobile. Pour en savoir plus, consultez la section relative à la [création de monitors][8].

## Dashboards

{{< img src="mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="page Dashboards">}}

Sur la page Dashboards, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog, et les filtrer à l'aide des template variables définies dans l'application Web Datadog. Filtrez rapidement vos dashboards grâce aux vues enregistrées des templates variables. Pour en savoir plus sur les vues enregistrées des templates variables, consultez la [section relative aux vues enregistrées des dashboards][9]. Cliquez sur un dashboard pour l'afficher.

**Remarque :** pour configurer ou modifier un dashboard, vous devez [vous connecter depuis un navigateur][10]. Pour en savoir plus, consultez la section [Dashboards][11].

## Incidents

{{< img src="mobile/incidents.png" alt="page Incidents" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

La page Incidents de l'application mobile Datadog vous permet de consulter, de rechercher et de filtrer tous les incidents accessibles de votre compte Datadog. Vous pouvez ainsi réagir rapidement et résoudre vos problèmes, où que vous soyez. Il est également possible de déclarer et de modifier des incidents, ainsi que de communiquer facilement avec vos équipes grâce aux intégrations Slack, Zoom, etc. Pour en savoir plus sur les incidents, consultez la [documentation relative à la gestion des incidents Datadog][12].

### Créer un incident

1. Cliquez sur l'onglet Incidents dans le menu du bas pour accéder à la liste des incidents.
2. Cliquez sur le bouton « + » dans le coin supérieur droit.
3. Attribuez un titre, une gravité et une personne responsable (commander).

### Recevoir des notifications Push pour les incidents

1. Accédez à **Account**.
2. Cliquez sur **Notifications**.
3. Activez le bouton **Enable Notifications**. (**Remarque** : sur Android, les notifications sont automatiquement activées lorsque vous installez la dernière version de l'application mobile Datadog).
4. Ensuite, dans l'application Web Datadog, accédez à [Incident Notification Rules][13].
5. Créez ou modifiez une règle de notification, puis saisissez votre nom sous **Notify**. Deux options apparaissent alors, vous permettant de recevoir les notifications par e-mail et sur votre appareil mobile.
6. Sélectionnez votre appareil mobile et cliquez sur **Save**.

Pour en savoir plus sur la configuration de règles de notification en cas d'incident, consultez la [documentation relative aux paramètres des incidents][14].

## Widgets

### Widget Open Incidents

{{< img src="mobile/incident_widget.png" alt="Le widget mobile d'incidents Datadog affiché sur des appareils Android et iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Consultez vos [incidents ouverts][12] depuis l'écran d'accueil de votre appareil mobile grâce aux widgets Datadog.

Pour analyser en détail vos problèmes, touchez un incident ouvert dans le widget. Une vue détaillée s'ouvre alors dans l'application mobile Datadog.

Vous pouvez également personnaliser vos widgets Open Incidents en filtrant vos données en fonction des éléments suivants :

- Organisation
- Niveaux de gravité
- Clients concernés
- Ordre

#### Créer un widget Open Incidents

{{< tabs >}}
{{% tab "iOS" %}}

1. Touchez le bouton **+** dans le coin supérieur gauche de l'écran.
2. Recherchez les widgets Datadog.
3. Sélectionnez la taille de votre choix (petit, moyen ou grand).
4. Faites glisser le widget à l'emplacement de votre choix sur l'écran.


{{% /tab %}}
{{% tab "Android" %}}

1. Appuyez longuement sur l'écran d'accueil.
2. Touchez le bouton **Widgets** sur l'éditeur d'écran d'accueil. Si vous avez des raccourcis d'application, cette option peut être remplacée par une simple icône, en haut à droite de la bulle.
3. Faites glisser le widget à l'emplacement de votre choix sur l'écran d'accueil.
4. Modifiez la taille du widget selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Modifier un widget Open Incidents

{{< tabs >}}
{{% tab "iOS" %}}

1. Appuyez longuement sur le widget pour le configurer.
2. Touchez **Modifier le widget**.
2. Touchez **Choose** en regard de l'étiquette **Organization** pour récupérer les incidents ouverts de l'organisation sélectionnée.
3. Touchez **SEV-1 and SEV-2** en regard de l'étiquette Severities pour appliquer des filtres basés sur la gravité.
4. Touchez **Both** en regard de l'étiquette **Customer Impacted** pour appliquer aux incidents ouverts un filtre basé sur les clients concernés.
5. Saisissez un terme dans la zone de texte **Type additional filters** pour ajouter d'autres filtres.
6. Touchez **Ordering** pour indiquer l'ordre dans lequel les incidents s'affichent.
7. Touchez un emplacement en dehors du widget pour enregistrer vos paramètres et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

1. Touchez le titre du widget à configurer.
2. Touchez **Organization** pour récupérer les incidents ouverts de l'organisation sélectionnée.
3. Touchez **Severities** pour appliquer des filtres basés sur la gravité.
4. Touchez **Customer Impacted** pour appliquer aux incidents ouverts un filtre basé sur les clients concernés.
5. Touchez **Query** pour ajouter d'autres filtres.
6. Touchez **Sorted by** pour indiquer l'ordre dans lequel les incidents s'affichent.
7. Touchez **Save** ou **Apply** pour enregistrer vos paramètres et quitter l'écran de configuration.
8. Appuyez longuement sur le widget pour modifier sa taille selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les incidents ouverts de plusieurs organisations

Vous pouvez afficher les incidents ouverts de plusieurs organisations sur l'écran d'accueil de votre appareil mobile.

{{< tabs >}}
{{% tab "iOS" %}}
- Touchez **Choose** en regard de l'étiquette Organization pour récupérer les incidents ouverts de l'organisation sélectionnée.



{{% /tab %}}
{{% tab "Android" %}}

1. Touchez le titre du widget à configurer.
2. Depuis l'écran de configuration, touchez **Organization**.
3. Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
4. Modifiez la taille du widget selon vos préférences.
5. Touchez **Save** ou **Apply**.


{{% /tab %}}
{{< /tabs >}}

#### Supprimer un widget Open Incidents

{{< tabs >}}
{{% tab "iOS" %}}

Pour supprimer un widget, touchez le bouton **-** dans le coin supérieur gauche du widget lorsque vous modifiez votre écran d'accueil. Vous pouvez également appuyer longuement sur le widget, puis sélectionner l'option **Supprimer le widget**.


{{% /tab %}}
{{% tab "Android" %}}

Pour supprimer un widget, appuyez longuement dessus, faites-le glisser et déposez-le sur le bouton de suppression.


{{% /tab %}}
{{< /tabs >}}

### Widget SLO

{{< img src="mobile/slo_widget.png" alt="Les widgets SLO Application Uptime affichés sur des appareils Android et iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Consultez vos [SLO][15] depuis l'écran d'accueil de votre appareil mobile grâce aux widgets Datadog. Vous pouvez ajouter n'importe quel SLO de votre organisation sous la forme d'un widget et définir un intervalle précis.

Choisissez parmi les intervalles suivants :
- 7 jours
- 30 jours
- 90 jours
- Semaine précédente
- Mois précédent
- Semaine en cours
- Mois en cours

Vous pouvez également configurer un dashboard de façon à ce qu'il s'ouvre par défaut lorsque vous touchez un widget SLO. Cette fonctionnalité vous permet d'étudier en quelques secondes certaines métriques.

**Remarque** : si vous n'avez pas configuré l'ouverture par défaut d'un certain dashboard et que vous touchez un widget SLO, l'application Datadog s'ouvre.

#### Créer un widget SLO

{{< tabs >}}
{{% tab "iOS" %}}

- Appuyez longuement sur l'écran d'accueil.
- Touchez le bouton « + » dans le coin supérieur gauche de l'écran.
- Recherchez les widgets Datadog.
- Sélectionnez la taille de votre choix (petit pour un SLO ou moyen pour un SLO et une visualisation de l'évolution de sa santé).
- Faites glisser le widget à l'emplacement de votre choix sur l'écran.


{{% /tab %}}
{{% tab "Android" %}}

- Appuyez longuement sur l'écran d'accueil.
- Touchez le bouton Widgets sur l'éditeur d'écran d'accueil. Si vous avez des raccourcis d'application, cette option peut être remplacée par une simple icône, en haut à droite de la bulle.
- Faites glisser le widget à l'emplacement de votre choix sur l'écran d'accueil.
- Modifiez la taille du widget selon vos préférences. Le widget ne peut pas afficher plus d'un SLO. Si vous redimensionnez le widget de façon à ce qu'il occupe toute la largeur de l'écran d'accueil de votre appareil mobile, il affiche le SLO sélectionné ainsi qu'une visualisation de l'évolution de sa santé.


{{% /tab %}}
{{< /tabs >}}

#### Modifier un widget SLO

{{< tabs >}}
{{% tab "iOS" %}}

- Appuyez longuement sur le widget pour le configurer.
- Touchez Modifier le widget.
- Touchez Choose en regard de l'étiquette SLO pour choisir le SLO que vous souhaitez surveiller.
- Selon le SLO choisi, une étiquette Timeframe peut s'afficher. Si c'est le cas, choisissez Choose en regard de cette étiquette pour choisir l'intervalle du SLO.
- Touchez Choose en regard de l'étiquette Dashboard to open pour choisir le dashboard qui s'ouvre lorsque vous touchez le widget SLO.
- Touchez un emplacement en dehors du widget pour valider vos paramètres et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

- Touchez le titre du widget à configurer.
- Touchez Selected SLO pour choisir le SLO que vous souhaitez surveiller.
- Touchez Selected Time Window pour choisir l'intervalle du SLO.
- Touchez Dashboard to open pour choisir le dashboard qui s'ouvre lorsque vous touchez le widget SLO.
- Touchez Save ou Apply pour valider vos paramètres et quitter l'écran de configuration.
- Appuyez longuement sur le widget pour modifier sa taille selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les SLO de plusieurs organisations

Vous pouvez afficher les SLO de plusieurs organisations sur l'écran d'accueil de votre appareil mobile.

{{< tabs >}}
{{% tab "iOS" %}}

Toutes les organisations auxquelles vous êtes connecté s'affichent dans l'écran de configuration. Si vous ne trouvez pas une de vos organisations, reconnectez-vous à celle-ci.


{{% /tab %}}
{{% tab "Android" %}}

- Touchez le titre du widget à configurer.
- Depuis l'écran de configuration, touchez Organization.
- Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
- Modifiez la taille du widget selon vos préférences.
- Touchez Save ou Apply.


{{% /tab %}}
{{< /tabs >}}

#### Supprimer un widget SLO

{{< tabs >}}
{{% tab "iOS" %}}

Pour supprimer un widget, touchez le bouton « - » dans le coin supérieur gauche du widget lorsque vous modifiez votre écran d'accueil. Vous pouvez également appuyer longuement sur le widget, puis sélectionner l'option Supprimer le widget.


{{% /tab %}}
{{% tab "Android" %}}

Pour supprimer un widget, appuyez longuement dessus, faites-le glisser et déposez-le sur le bouton de suppression.


{{% /tab %}}
{{< /tabs >}}

### Widget Monitors

{{< img src="mobile/monitor_widget.png" alt="Les widgets de monitor configurés affichés sur des appareils Android et iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Consultez vos [monitors][16] depuis l'écran d'accueil grâce aux widgets Datadog. Touchez une cellule pour ouvrir l'écran **Monitor Search** dans l'application, qui est automatiquement filtré sur vos monitors.

**Remarque** : si vous ne disposez d'aucune vue enregistrée de monitor, le widget affiche par défaut tous les monitors.

#### Créer un widget Monitors

{{< tabs >}}
{{% tab "iOS" %}}

- Appuyez longuement sur l'écran d'accueil.
- Touchez le bouton « + » dans le coin supérieur gauche de l'écran.
- Recherchez les widgets Datadog.
- Sélectionnez la taille de votre choix (petit pour deux vues enregistrées, moyen pour trois ou grand pour six).
- Faites glisser le widget à l'emplacement de votre choix sur l'écran.


{{% /tab %}}
{{% tab "Android" %}}

- Appuyez longuement sur l'écran d'accueil.
- Touchez Widgets sur l'éditeur d'écran d'accueil. Si vous avez des raccourcis d'application, cette option peut être remplacée par une simple icône, en haut à droite de la bulle.
- Faites glisser le widget à l'emplacement de votre choix sur l'écran d'accueil.
- Modifiez la taille du widget selon vos préférences. Pour afficher plus de vues enregistrées, agrandissez le widget sur l'écran d'accueil de votre appareil mobile.


{{% /tab %}}
{{< /tabs >}}

#### Modifier un widget Monitors

{{< tabs >}}
{{% tab "iOS" %}}

- Appuyez longuement sur le widget pour le configurer.
- Touchez Edit Widget.
- Touchez la cellule d'une vue enregistrée pour la sélectionner ou la désélectionner.
- Pour modifier l'ordre des vues, faites glisser et déposez chaque cellule.
- Touchez un emplacement en dehors du widget pour valider vos paramètres et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

- Touchez le titre d'un widget pour le configurer.
- Touchez Saved Views.
- Touchez la cellule d'une vue enregistrée pour la sélectionner ou la désélectionner.
- Pour modifier l'ordre des vues, faites glisser et déposez chaque cellule.
- Touchez Save ou Apply pour valider vos paramètres et quitter l'écran de configuration.
- Faites défiler le contenu du widget pour afficher d'autres vues enregistrées. Appuyez longuement sur le widget pour modifier sa taille selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les monitors de plusieurs organisations

Vous pouvez afficher les monitors de plusieurs organisations au sein d'un même widget.

{{< tabs >}}
{{% tab "iOS" %}}

Toutes les organisations auxquelles vous êtes connecté s'affichent dans l'écran de configuration. Si vous ne trouvez pas une certaine organisation, vous devrez peut-être vous reconnecter.


{{% /tab %}}
{{% tab "Android" %}}

- Touchez le titre du widget à configurer.
- Depuis l'écran de configuration, touchez Organization.
- Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
- Modifiez le widget selon vos préférences.
- Touchez Save ou Apply.


{{% /tab %}}
{{< /tabs >}}

#### Supprimer un widget Monitors

{{< tabs >}}
{{% tab "iOS" %}}

Pour supprimer un widget, appuyez sur le bouton « - » dans le coin supérieur gauche du widget lorsque vous modifiez votre écran d'accueil. Vous pouvez également appuyer longuement sur le widget, puis sélectionner l'option Remove Widget.


{{% /tab %}}
{{% tab "Android" %}}

Pour supprimer un widget, appuyez longuement dessus, faites-le glisser et déposez-le sur le bouton de suppression.


{{% /tab %}}
{{< /tabs >}}

## Actions rapides

{{< img src="mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Actions rapides">}}

Appuyez longuement sur l'icône de l'application pour afficher un menu d'actions rapides permettant d'accéder aux cinq dashboards [les plus fréquemment consultés][17] sous iOS (d'après le nombre de vues et l'activité récente), ou aux cinq dashboards les plus ouverts sur mobile sous Android. Appuyez sur un résultat pour ouvrir le dashboard dans l'application.

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

Pour en savoir plus sur les raccourcis et les suggestions Siri, consultez la [documentation Apple dédiée à Siri][18].

## Handoff

**iOS uniquement** : utilisez la fonctionnalité Handoff d'Apple pour continuer une tâche sur vos différents appareils Apple. Lorsque l'application mobile Datadog est en cours d'utilisation, son icône apparaît sur votre Mac à l'extrémité gauche du Dock. Cliquez sur l'icône pour ouvrir votre dashboard ou votre monitor actuel sur votre Mac.

Pour que la fonctionnalité Handoff fonctionne, chaque appareil doit :

- être connecté à iCloud avec le même identifiant Apple ;
- avoir le Bluetooth activé ;
- avoir le Wi-Fi activé 
- avoir Handoff activé.

Pour en savoir plus sur Handoff, consultez la [documentation Apple dédiée à Handoff][19].

## Compte

Changez d'organisation ou déconnectez-vous sur la page Account.

## Dépannage

Si vous avez besoin d'aide pour le dépannage, [contactez l'assistance Datadog][20]. Vous pouvez aussi envoyer un message sur le canal [Slack public de Datadog][21] [#mobile-app][22].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /fr/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /fr/account_management/saml/mobile-idp-login/
[6]: /fr/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /fr/monitors/create/#monitor-types
[9]: /fr/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /fr/dashboards/
[12]: /fr/monitors/incident_management
[13]: https://app.datadoghq.com/incidents/settings#Rules
[14]: /fr/monitors/incident_management/incident_settings/#rules
[15]: /fr/dashboards/widgets/slo/#setup
[16]: /fr/logs/explorer/saved_views/
[17]: https://app.datadoghq.com/dashboard/lists/preset/5
[18]: https://support.apple.com/en-us/HT209055
[19]: https://support.apple.com/en-us/HT209455
[20]: /fr/help/
[21]: https://chat.datadoghq.com/
[22]: https://datadoghq.slack.com/archives/C0114D5EHNG