---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /fr/service_management/mobile/
description: Surveillez votre infrastructure en déplacement avec l'application mobile
  Datadog pour iOS et Android, qui propose des tableaux de bord, des alertes, des
  incidents et la gestion des astreintes.
further_reading:
- link: /mobile/shortcut_configurations/
  tag: Documentation
  text: Configurations des raccourcis
- link: /monitors/
  tag: Documentation
  text: En savoir plus sur les monitors et les alertes
- link: /dashboards/
  tag: Documentation
  text: En savoir plus sur les dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Gagnez en flexibilité grâce aux widgets de dashboards mobiles Datadog
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: Blog
  text: Prise en main de l'application mobile Datadog
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: Blog
  text: Réduisez votre temps moyen de réparation avec l'application mobile Datadog
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Comment nous avons conçu des sons d'alerte empathiques pour les ingénieurs
    d'astreinte
title: Application mobile Datadog
---
L'application mobile Datadog vous permet de consulter les alertes de Datadog sur votre appareil mobile. Lorsque vous recevez une alerte via On-Call, Slack ou par e-mail, vous pouvez examiner les problèmes en ouvrant les graphiques de monitor et les tableaux de bord sur votre appareil mobile.

## Installation {#installing}

Téléchargez l'application depuis l'[App Store Apple][1] pour votre appareil iOS ou depuis [Google Play][2] pour votre appareil Android.

### Connexion {#logging-in}

Vous pouvez vous connecter à l'aide de l'authentification standard, de l'authentification Google ou du protocole [SAML][3], que ce soit sur le site américain ou sur le site européen.

#### Activation de SAML {#enabling-saml}

La connexion SAML nécessite que vous configuriez et authentifiiez votre fournisseur SAML auprès de Datadog en utilisant votre navigateur iOS/Android par défaut. Pour une connexion initiée par le fournisseur d'identité (IdP) SAML, reportez-vous à la fin de cette section. Pour authentifier SAML :

1. Dans l'application mobile, sélectionnez votre région de centre de données (par exemple, US1) dans le coin supérieur droit.
2. Appuyez sur le bouton de connexion.
3. Cliquez sur « Using Single Sign-On (SAML)? » lien.
4. Saisissez votre adresse e-mail professionnelle et envoyez l'e-mail.
5. Depuis votre appareil mobile, ouvrez l'e-mail et cliquez sur le lien indiqué via votre navigateur par défaut.
6. Saisissez les identifiants SAML de votre organisation pour être redirigé vers une session authentifiée de l'application mobile Datadog.

Si vous le souhaitez, vous pouvez également vous authentifier à l'aide d'un code QR ou d'une saisie manuelle, tel que décrit ci-dessous.

##### Code QR {#qr-code}

1. Dans un navigateur, accédez à votre page [Datadog account Personal Settings Organizations][4] et cliquez sur {{< ui >}}Log in to Mobile App{{< /ui >}} pour l'organisation sur laquelle vous êtes actuellement connecté. Cela fait apparaître un code QR.
2. Utilisez l'application appareil photo par défaut de votre téléphone pour scanner le code QR, puis appuyez sur le lien suggéré pour ouvrir l'application Datadog. Vous serez automatiquement connecté.

**Remarque** : Si vous cliquez sur le bouton {{< ui >}}Log in to Mobile App{{< /ui >}} d'une organisation sur laquelle vous n'êtes pas actuellement connecté, l'UUID de l'organisation est automatiquement inséré dans l'écran de connexion. Vous devez toujours fournir une authentification en utilisant votre méthode standard.

##### Saisie manuelle {#manual-entry}

1. Pour saisir manuellement l'ID SAML, ouvrez l'application mobile Datadog et appuyez sur le bouton {{< ui >}}Using Single Sign-On (SAML)?{{< /ui >}}.
2. Appuyez sur le bouton {{< ui >}}Use another method to login{{< /ui >}} et saisissez l'ID SAML manuellement.

En cliquant sur {{< ui >}}Authorize{{< /ui >}} lors de la connexion, vous associez l'appareil mobile que vous utilisez à votre compte. Pour des raisons de sécurité, vous devrez effectuer cette procédure une fois par mois.

##### Connexion initiée par le fournisseur d'identité SAML {#saml-idp-initiated-login}

Si vous continuez à rencontrer des erreurs lors de votre connexion avec SAML, il se peut que votre fournisseur d'identité impose une connexion IdP-initiée. Pour plus d'informations sur l'activation du SAML initié par le fournisseur d'identité, veuillez consulter notre page [IdP Initiated SAML page][5]

##### Connexion par sous-domaine {#subdomain-login}

1. Appuyez sur sous-domaine et saisissez votre [sous-domaine][29] personnalisé.
2. Suivez les étapes de connexion comme indiqué.

### Changer d'organisation {#switch-organizations}

Pour changer d'organisation, accédez à la page {{< ui >}}Settings{{< /ui >}} sur l'application mobile et cliquez sur {{< ui >}}Organization{{< /ui >}}.

**Remarque** : Vous devrez peut-être vous réauthentifier lorsque vous changez d'organisation.

### Se déconnecter {#log-out}
Pour vous déconnecter, accédez à la page {{< ui >}}Settings{{< /ui >}} sur l'application mobile et cliquez sur {{< ui >}}Log Out{{< /ui >}}. Confirmez {{< ui >}}Yes{{< /ui >}} que vous êtes sûr.

## On-Call {#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page On-call iOS affichant les quarts de travail, les plannings et les options d'escalade">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page On-call Android affichant les quarts de travail, les plannings et les options d'escalade">}}

{{% /tab %}}
{{< /tabs >}}

La page On-Call offre une vue complète des quarts de travail, des plannings, des pages et des politiques d'escalade. Vous pouvez filtrer les informations par utilisateur, équipe, urgence, statut ou date pour trouver rapidement les détails pertinents. Appuyez sur {{< ui >}}Escalate{{< /ui >}} pour confirmer l'escalade au niveau de la politique suivant. Appuyez sur {{< ui >}}Declare Incident{{< /ui >}} pour saisir un titre et fournir les attributs d'incident pertinents.

Vous pouvez envoyer une page à une personne ou à une équipe, et également remplacer un quart de travail existant en appuyant sur celui que vous souhaitez annuler. Vous pouvez consulter les enquêtes du monitor Bits Investigation pour obtenir les premières constatations et conclusions. Pour plus d'informations, consultez [Datadog On-Call][20].

Pour configurer les notifications On-Call sur votre appareil mobile, consultez le guide [Configurer votre appareil mobile pour Datadog On-Call][21].

<div class="alert alert-info">
Si vous avez uniquement besoin d'accéder à On-Call sur mobile et que vous souhaitez restreindre l'accès aux données de télémétrie sensibles sur les appareils mobiles, contactez le support Datadog.
</div>

## Incidents {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/incident_may_2025.png" alt="Page Incidents dans l'application mobile Datadog On-call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Incident.png" alt="Page Incidents dans l'application mobile Datadog On-call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Incidents, vous pouvez afficher, rechercher et filtrer tous les incidents auxquels vous avez accès dans votre compte Datadog pour assurer une réponse et une résolution depuis n'importe où. Vous pouvez également déclarer et modifier des incidents, et communiquer en toute transparence avec vos équipes grâce aux intégrations avec Slack, Zoom et bien d'autres. Pour plus d'informations sur les incidents, consultez [Datadog Incident Management][12].

### Créer un incident {#create-an-incident}

1. Accédez à la liste des incidents en appuyant sur l'onglet {{< ui >}}Incidents{{< /ui >}} dans la barre inférieure.
2. Appuyez sur le bouton {{< ui >}}\+{{< /ui >}} dans le coin supérieur droit.
3. Donnez un titre, une gravité et un commandant à votre incident.

## Centre de notifications {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/ios_notification_center.png" alt="Centre de notifications iOS dans l'application mobile Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/android_notification_center.png" alt="Centre de notifications Android dans l'application mobile Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Le Centre de notifications répertorie toutes les notifications push reçues afin que le contexte de notification ne soit jamais perdu. Vous pouvez filtrer par type de notification.

## Dashboards {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de tableau de bord iOS affichant la liste des tableaux de bord avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de tableau de bord Android affichant la liste des tableaux de bord avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des tableaux de bord, vous pouvez afficher et rechercher tous les tableaux de bord auxquels vous avez accès dans votre organisation Datadog, et les filtrer en utilisant les mêmes variables de modèle que celles configurées dans l'application Web Datadog. Filtrez rapidement vos tableaux de bord à l'aide des vues enregistrées des variables de modèle. Pour plus d'informations sur les vues enregistrées des variables de modèle, consultez [Saved Views du dashboard][9]. Cliquez sur un tableau de bord individuel pour l'afficher. Cliquez sur la période en bas à droite pour personnaliser la plage du tableau de bord.

**Note** :
- Pour configurer ou modifier un tableau de bord, vous devez [vous connecter à l'application de navigateur Datadog][10]. Pour plus d'informations, consultez [tableaux de bord][11].
- Les liens du dashboard configurés en UTC s'ouvrent en UTC sur l'application mobile. Pour plus d'informations, consultez [Configurations du dashbord][24].
- Tous les types de widgets ne sont pas disponibles, ce qui signifie qu'ils n'affichent pas de données sur l'application mobile. Cela inclut la carte topologique, le widget Liste (toutes les sources de données), le widget Treemap hérité et le widget Résumé SLO.

## monitors {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des monitors iOS affichant la liste des monitors avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des monitors Android affichant la liste des monitors avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page monitors, vous pouvez afficher et rechercher tous les monitors auxquels vous avez accès dans votre organisation Datadog. Vous pouvez spécifier par nom de champ et créer des requêtes de recherche spécifiques basées sur votre stratégie de marquage. Pour plus d'informations sur la recherche, consultez la [section Gestion de la recherche des monitors][6].

Par exemple, pour filtrer sur les monitors de métriques liés à l'équipe SRE qui est alertée, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur des alertes individuelles pour en voir les détails, qui peuvent être filtrés par type et par heure d'alerte. Vous pouvez également mettre l'alerte en sourdine. Vos dix recherches les plus récentes sont enregistrées afin que vous ayez un accès plus rapide aux requêtes précédentes. De plus, vous pouvez filtrer votre liste de monitors à l'aide de vues enregistrées, qui apparaissent lorsque vous activez la barre de recherche. Vous pouvez également afficher et exécuter des tests Synthetic lorsque vous consultez vos monitors synthétiques.

**Remarque** : Pour configurer ou modifier des monitors, des notifications ou des vues enregistrées, vous devez utiliser l'[application Web Datadog][7]. Tous les monitors configurés dans l'application Web sont visibles dans l'application mobile. Pour plus d'informations, consultez [Création de monitors][8].

## Notebooks {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des notebooks iOS affichant la liste des notebooks avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des notebooks Android affichant la liste des notebooks avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Notebooks, vous pouvez afficher et rechercher tous les notebooks auxquels vous avez accès dans votre organisation Datadog, et les filtrer par tags. Les tags de notebook vous permettent de filtrer par favoris, équipe et type. Consultez [notebook tags][19] pour plus d'informations.

**Remarque** : Pour configurer ou modifier un notebook, vous devez [vous connecter à l'application de navigateur Datadog][10]. Pour plus d'informations, consultez [Notebooks][18].

## Traces {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des traces iOS affichant la liste des traces avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des traces Android affichant la liste des traces avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Traces, vous pouvez afficher et rechercher toutes les traces auxquelles vous avez accès dans votre organisation Datadog. Vous pouvez restreindre la liste via des vues enregistrées ou créer des requêtes de recherche spécifiques basées sur votre stratégie de tag. Pour plus d'informations sur la recherche, consultez [Trace Explorer Query Syntax][16].

Par exemple, pour filtrer sur les traces avec le tag `#env:prod` ou le tag `#test`, utilisez la requête `"env:prod" OR test`. Cliquez sur des services individuels pour développer les spans associés, et sélectionnez des spans pour afficher les informations, les erreurs et les logs associés. Vous pouvez également ouvrir des traces à partir de services et de logs.

**Uniquement disponible sur iOS** : Les Watchdog Insights indiquent les valeurs aberrantes de latence et les valeurs aberrantes d'erreur. Pour plus d'informations, consultez [Watchdog Insights][26].


## Logs {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des logs iOS affichant la liste des logs avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des logs Android affichant la liste des logs avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Logs, vous pouvez afficher et rechercher tous les logs ou logs Flex auxquels vous avez accès dans votre organisation Datadog. Vous pouvez restreindre la liste via des vues enregistrées ou des filtres de requête. Pour plus d'informations sur la recherche, consultez [Log Search Syntax][23].

Vous pouvez également effectuer un regroupement par modèles de logs et sélectionner différents attributs de logs pour le clustering ou le regroupement des résultats. Pour plus d'informations sur les modèles de logs, consultez [Regrouper les logs en modèles][22].

**Remarque** : Pour activer les logs Flex, accédez à la liste des logs et appuyez en haut à droite pour sélectionner enable flex logs.

**Uniquement disponible sur iOS** : Watchdog Insights signale les anomalies et les valeurs aberrantes dans les logs. Pour plus d'informations, consultez [Watchdog Insights pour les logs][25].


## Services {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des services iOS affichant la liste des services avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des services Android affichant la liste des services avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Services, vous pouvez afficher, rechercher et filtrer tous les services auxquels vous avez accès dans votre compte Datadog depuis l'application mobile Datadog pour garantir la santé de votre service où que vous soyez. Vous pouvez également consulter les déploiements récents, les ressources, les SLO et les monitors associés à ce service. Pour plus d'informations sur les outils d'investigation pour vos services, consultez [manage Catalog][17].

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="/mobile/bits_chat_ios_2026.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de chat Bits AI dans l'application mobile Datadog pour iOS avec une requête utilisateur concernant un service">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/bits_chat_android_2026.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de chat Bits AI dans l'application mobile Datadog pour Android avec une requête utilisateur concernant un service">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page d'accueil de Bits AI, vous pouvez poser des questions sur votre système ou un incident actif par commande vocale ou par texte. Bits Chat dispose d'un contexte sur la documentation publique, la télémétrie et la propriété de Datadog. Pour plus d'informations, consultez [Bits Chat][27].

### Bits Investigation {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Résultats de Bits Investigation affichés sur une page On-Call">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Résultats de Bits Investigation affichés sur une page On-Call">}}

{{% /tab %}}
{{< /tabs >}}

Lorsqu'elle est activée, Bits Investigation lance des investigations directement sur les pages On-Call. Ces enquêtes présentent des conclusions et des résultats initiaux pour aider les intervenants à identifier les causes profondes potentielles et les prochaines étapes. Pour plus d'informations, consultez [Bits Investigation][28].

## Foire aux questions {#frequently-asked-question}
### Comment rester connecté à l'application mobile ? {#how-do-i-remain-logged-into-the-mobile-app}
Une fois l'authentification à l'application mobile réussie, vous resterez connecté pendant 90 jours.

**Remarque** : Si vous avez activé les notifications, des notifications proactives seront envoyées 10 jours avant l'expiration du jeton.

### Vais-je toujours recevoir des notifications si je suis automatiquement déconnecté ? {#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
Si vous êtes automatiquement déconnecté pendant la période de validité du jeton de 90 jours, vous pourrez toujours recevoir des notifications et serez invité à vous reconnecter.

**Remarque** : Si vous vous déconnectez manuellement de l'application, vous cesserez de recevoir des notifications.

### Pourquoi ne reçois-je pas de notifications ? {#why-am-i-not-receiving-notifications}
Vérifiez que vous avez activé les notifications pour l'application Datadog dans les paramètres de votre appareil. Si vous souhaitez vous assurer que les notifications contournent le mode Ne pas déranger, vérifiez que Critical Alerts est activé.

### Vais-je recevoir des notifications pour toutes les organisations auxquelles je suis connecté ? {#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
Oui, quelle que soit l'organisation vers laquelle vous basculez, vous recevez des notifications pour toutes les organisations auxquelles vous êtes connecté. Cela inclut les notifications push critiques.

### Que se passe-t-il si un utilisateur est désactivé ? {#what-happens-if-a-user-is-disabled}
Le jeton de l'application mobile sera invalide et forcera l'utilisateur à se déconnecter.

## Dépannage {#troubleshooting}

Pour obtenir de l'aide concernant le dépannage, [contactez le support Datadog][13]. Vous pouvez également envoyer un message sur le canal [#mobile-app][15] du [Datadog public Slack][14].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /fr/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /fr/account_management/saml/mobile-idp-login/
[6]: /fr/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /fr/monitors/types
[9]: /fr/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /fr/dashboards/
[12]: /fr/monitors/incident_management
[13]: /fr/help/
[14]: https://chat.datadoghq.com/
[15]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: /fr/tracing/trace_explorer/query_syntax/
[17]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/set_up/
[18]: https://docs.datadoghq.com/fr/notebooks/
[19]: https://docs.datadoghq.com/fr/notebooks/#notebook-tags
[20]: https://docs.datadoghq.com/fr/incident_response/on-call/
[21]: /fr/incident_response/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[22]: https://docs.datadoghq.com/fr/logs/explorer/analytics/patterns/
[23]: https://docs.datadoghq.com/fr/logs/explorer/search_syntax/
[24]: /fr/dashboards/configure/#configuration-actions
[25]: /fr/logs/explorer/watchdog_insights/
[26]: /fr/watchdog/insights/?tab=logmanagement
[27]: /fr/bits_ai/bits_chat/
[28]: /fr/bits_ai/bits_investigation/
[29]: /fr/account_management/multi_organization/#custom-sub-domains