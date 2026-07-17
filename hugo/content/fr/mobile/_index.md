---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /fr/service_management/mobile/
description: Surveillez votre infrastructure en déplacement avec l'application mobile
  Datadog pour iOS et Android, qui propose des tableaux de bord, des alertes, des
  incidents et une gestion des astreintes.
further_reading:
- link: /mobile/shortcut_configurations/
  tag: Documentation
  text: Configurations de raccourcis
- link: /monitors/
  tag: Documentation
  text: Découvrez les Moniteurs et les Alertes
- link: /dashboards/
  tag: Documentation
  text: En savoir plus sur les dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Gagnez en flexibilité grâce aux widgets de dashboards mobiles Datadog
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: Blog
  text: Premiers pas avec l'application mobile Datadog
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: Blog
  text: Réduisez votre temps moyen de réparation avec l'application mobile Datadog
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Comment nous avons conçu des sons d'alerte empathiques pour les ingénieurs
    d'astreinte
title: Application mobile Datadog
---
L'application mobile Datadog vous permet de consulter les alertes de Datadog sur votre appareil mobile. Lors de la réception d'une alerte via On-Call, Slack ou email, vous pouvez enquêter sur les problèmes en ouvrant des graphiques de moniteur et des tableaux de bord sur votre appareil mobile.

## Installation {#installing}

Téléchargez l'application depuis l'[App Store Apple][1] pour votre appareil iOS ou depuis [Google Play][2] pour votre appareil Android.

### Connexion {#logging-in}

Vous pouvez vous connecter à l'aide de l'authentification standard, de l'authentification Google ou du protocole [SAML][3], que ce soit sur le site américain ou sur le site européen.

#### Activation de SAML {#enabling-saml}

La connexion SAML nécessite que vous configuriez et authentifiiez votre fournisseur SAML avec Datadog en utilisant votre navigateur iOS/Android par défaut. Pour la connexion SAML initiée par l'IdP, reportez-vous à la fin de cette section. Pour authentifier SAML :

1. Dans l'application mobile, sélectionnez votre région de centre de données (par exemple, US1) dans le coin supérieur droit.
2. Appuyez sur le bouton de connexion.
3. Cliquez sur "Utiliser l'authentification unique (SAML) ?" lien.
4. Entrez votre email professionnel et envoyez l'email.
5. Sur votre appareil mobile, ouvrez l'email et cliquez sur le lien indiqué via votre navigateur par défaut.
6. Entrez les identifiants SAML de votre organisation pour être redirigé vers une session authentifiée de l'application mobile Datadog.

Si vous le souhaitez, vous pouvez également vous authentifier à l'aide d'un code QR ou d'une saisie manuelle, tel que décrit ci-dessous.

##### Code QR {#qr-code}

1. Dans un navigateur, accédez à votre page [Paramètres personnels des organisations de votre compte Datadog][4] et cliquez sur **Se connecter à l'application mobile** pour l'organisation dans laquelle vous êtes actuellement connecté. Cela fait apparaître un code QR.
2. Utilisez l'application appareil photo par défaut de votre téléphone pour scanner le code QR, puis appuyez sur le lien suggéré pour ouvrir l'application Datadog. Vous serez automatiquement connecté.

**Remarque** : Si vous cliquez sur le bouton **Se connecter à l'application mobile** d'une organisation à laquelle vous n'êtes pas actuellement connecté, l'UUID de l'organisation est automatiquement inséré dans l'écran de connexion. Vous devez toujours fournir une authentification en utilisant votre méthode standard.

##### Saisie manuelle {#manual-entry}

1. Pour entrer manuellement l'ID SAML, ouvrez l'application mobile Datadog et appuyez sur "Utiliser l'authentification unique (SAML) ?" bouton.
2. Appuyez sur le bouton "Utiliser une autre méthode de connexion" et entrez l'ID SAML manuellement.

En cliquant sur **Autoriser** lors de la connexion, vous liez l'appareil mobile que vous utilisez à votre compte. Pour des raisons de sécurité, vous devrez suivre ce processus une fois par mois.

##### Connexion initiée par l'IdP SAML {#saml-idp-initiated-login}

Si vous continuez à rencontrer des erreurs lors de la connexion avec SAML, votre fournisseur d'identité peut imposer une connexion initiée par l'IdP. Pour plus d'informations concernant l'activation de la connexion SAML initiée par l'IdP, veuillez consulter notre [IdP Initiated SAML page][5].

##### Connexion par sous-domaine {#subdomain-login}

1. Appuyez sur le sous-domaine et entrez votre [sous-domaine][29] personnalisé.
2. Procédez avec les étapes de connexion comme indiqué.

### Changer d'organisation {#switch-organizations}

Pour changer d'organisation, accédez à la page **Paramètres** de l'application mobile et cliquez sur **Organisation**. 

**Remarque** : Vous devrez peut-être vous réauthentifier lorsque vous changez d'organisation.

### Se déconnecter {#log-out}
Pour se déconnecter, accédez à la page **Paramètres** de l'application mobile et cliquez sur **Se déconnecter**. Confirmez **Oui** que vous êtes sûr. 

## Sur appel {#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page sur appel iOS montrant les shifts, les horaires et les options d'escalade">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page sur appel Android montrant les shifts, les horaires et les options d'escalade">}}

{{% /tab %}}
{{< /tabs >}}

La page Sur appel fournit une vue d'ensemble complète des shifts, des horaires, des pages et des politiques d'escalade. Vous pouvez filtrer les informations par utilisateur, équipe, urgence, statut ou date pour trouver rapidement les détails pertinents. Appuyer sur **Escalader** vous invite à confirmer l'escalade au niveau de politique suivant. Appuyer sur **Déclarer un incident** vous invite à entrer un titre et à fournir les attributs d'incident pertinents.

Vous pouvez initier une page à un individu ou une équipe, et également remplacer des shifts existants en appuyant sur le shift que vous souhaitez remplacer. Vous pouvez consulter les investigations du moniteur Bits Investigation pour obtenir les constats initiaux et les conclusions. Pour plus d'informations, consultez [Datadog Sur appel][20].

Pour configurer les notifications Sur appel sur votre appareil mobile, consultez le guide pour [Configurer votre appareil mobile pour Datadog Sur appel][21].

<div class="alert alert-info">
Si vous avez seulement besoin d'accéder à Sur appel sur mobile et souhaitez restreindre l'accès aux données de télémétrie sensibles sur les appareils mobiles, contactez le support Datadog.
</div>

## Incidents {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/incident_may_2025.png" alt="Page des incidents dans l'application mobile Datadog Sur appel" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Incident.png" alt="Page des incidents dans l'application mobile Datadog Sur appel" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des Incidents, vous pouvez consulter et rechercher tous les incidents auxquels vous avez accès dans votre compte Datadog, afin d'assurer une réponse et une résolution quelle que soit votre localisation. Vous pouvez également déclarer et modifier des incidents, et communiquer de manière transparente avec vos équipes grâce à des intégrations avec Slack, Zoom, et bien d'autres. Pour plus d'informations sur les Incidents, consultez [Gestion des Incidents Datadog][12].

### Créer un incident {#create-an-incident}

1. Accédez à la liste des incidents en appuyant sur l'onglet Incidents dans la barre inférieure.
2. Appuyez sur le bouton **+** dans le coin supérieur droit.
3. Donnez à votre incident un titre, une gravité et un commandant.

## Centre de Notifications {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_notification_center.png" alt="Centre de notifications iOS dans l'application mobile Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_notification_center.png" alt="Centre de notifications Android dans l'application mobile Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

Le Centre de notifications répertorie toutes les notifications push reçues afin que le contexte des notifications ne soit jamais perdu. Vous pouvez filtrer par type de notification.

## Tableaux de bord {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de tableau de bord iOS affichant la liste des tableaux de bord avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page de tableau de bord Android affichant la liste des tableaux de bord avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des tableaux de bord, vous pouvez consulter et rechercher tous les tableaux de bord auxquels vous avez accès dans votre organisation Datadog, et les filtrer en utilisant les mêmes variables de modèle que vous avez configurées dans l'application web Datadog. Filtrez rapidement vos tableaux de bord en utilisant des vues enregistrées de variables de modèle. Pour plus d'informations sur les vues enregistrées de variables de modèle, consultez [Vues Enregistrées de Tableau de Bord][9]. Cliquez sur un tableau de bord individuel pour le visualiser. Cliquez sur la période en bas à droite pour personnaliser la plage du tableau de bord. 

**Remarque** : 
- Pour configurer ou modifier un tableau de bord, vous devez [vous connecter à l'application Datadog dans le navigateur][10]. Pour plus d'informations, consultez [tableaux de bord][11].
- Les liens de tableau de bord configurés en UTC s'ouvrent en UTC sur l'application mobile. Pour plus d'informations, consultez [configurations de tableau de bord][24].
- Tous les types de widgets ne sont pas disponibles, ce qui signifie qu'ils ne montrent pas de données sur l'application mobile. Cela inclut la carte de topologie, le widget de liste (toutes les sources de données), le widget de treemap hérité et le widget de résumé SLO.

## Moniteurs {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des moniteurs iOS affichant la liste des moniteurs avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des moniteurs Android affichant la liste des moniteurs avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des Moniteurs, vous pouvez consulter et rechercher tous les moniteurs auxquels vous avez accès dans votre organisation Datadog. Vous pouvez spécifier par nom de champ et construire des requêtes de recherche spécifiques à la build en fonction de votre stratégie de balisage. Pour plus d'informations sur la recherche, consultez la [section Gérer la recherche des moniteurs][6].

Par exemple, pour filtrer sur les moniteurs de métriques liés à l'équipe SRE qui est alertée, utilisez la requête `"status:Alert type:Metric team:sre"`. Cliquez sur des alertes individuelles pour voir les détails, qui peuvent être filtrés par type et par heure d'alerte. Vous pouvez également mettre l'alerte en sourdine. Vos dix recherches les plus récentes sont enregistrées afin que vous ayez un accès plus rapide aux requêtes précédentes. De plus, vous pouvez filtrer votre liste de moniteurs en utilisant des vues enregistrées, qui apparaissent lorsque vous activez la barre de recherche. Vous pouvez également voir et exécuter des tests synthétiques lorsque vous consultez vos moniteurs synthétiques.

**Remarque** : Pour configurer ou modifier des moniteurs, des notifications ou des vues enregistrées, vous devez utiliser l'[application web Datadog][7]. Tous les moniteurs configurés dans l'application web Datadog sont visibles dans l'application mobile. Pour plus d'informations, consultez [Creating monitors][8].

## Notebooks {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page iOS Notebooks affichant la liste des Notebooks avec des options de recherche et de filtrage.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page Android Notebooks affichant la liste des Notebooks avec des options de recherche et de filtrage.">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page Notebooks, vous pouvez consulter et rechercher tous les Notebooks auxquels vous avez accès dans votre Datadog org, et les filtrer par tags. Les notebook tags vous permettent de filtrer par favorites, team et type. Consultez [notebook tags][19] pour plus d'informations.

**Note** : Pour configurer ou modifier un notebook, vous devez [vous connecter à l'application web Datadog][10]. Pour plus d'informations, consultez [Notebooks][18].

## Traces {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des traces iOS affichant la liste des traces avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des traces Android affichant la liste des traces avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des Traces, vous pouvez consulter et rechercher toutes les traces auxquelles vous avez accès dans votre organisation Datadog. Vous pouvez affiner la liste grâce à des vues enregistrées ou créer des requêtes de recherche spécifiques en fonction de votre stratégie d'étiquetage. Pour plus d'informations sur la recherche, voir [Syntaxe de requête de l'explorateur de traces][16].

Par exemple, pour filtrer les traces avec l'étiquette `#env:prod` ou l'étiquette `#test`, utilisez la requête `"env:prod" OR test`. Cliquez sur des services individuels pour développer les spans associés, et sélectionnez des spans pour voir les informations, les erreurs et les journaux associés. Vous pouvez également ouvrir des traces à partir de services et de journaux.

**Disponible uniquement sur iOS** : Les insights Watchdog indiquent les anomalies de latence et les anomalies d’erreur. Pour plus d'informations, consultez [Watchdog Insights][26].


## Journaux {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des journaux iOS affichant la liste des journaux avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des journaux Android affichant la liste des journaux avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des Logs, vous pouvez consulter et rechercher tous les Logs ou flex logs auxquels vous avez accès dans votre Datadog org. Vous pouvez affiner la liste grâce à des vues enregistrées ou des filtres de requête. Pour plus d'informations sur la recherche, consultez [Log Search Syntax][23].

Vous pouvez également regrouper par log patterns et sélectionner différents attributs de Logs pour le clustering ou le grouping des résultats. Pour plus d'informations sur les motifs de journaux, consultez [Grouping Logs Into Patterns][22].

**Note** : Pour activer flex logs, accédez à la liste des Logs et appuyez en haut à droite pour sélectionner enable flex logs.

**Disponible uniquement sur iOS** : Les insights Watchdog signalent les anomalies et les valeurs aberrantes des journaux. Pour plus d'informations, consultez [Watchdog Insights for Logs][25].


## Services {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des services iOS affichant la liste des services avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Page des services Android affichant la liste des services avec des options de recherche et de filtrage">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page des services, vous pouvez consulter, rechercher et filtrer tous les services auxquels vous avez accès dans votre compte Datadog depuis l'application mobile Datadog pour garantir la santé de votre service de n'importe où. Vous pouvez également consulter les déploiements récents, les ressources, les SLO et les moniteurs associés à ce service. Pour plus d'informations sur les outils d'investigation pour vos services, consultez [manage Catalog][17].

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Interface de chatbot Bits AI sur iOS où un utilisateur pose des questions sur un service.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Interface de chatbot Bits AI sur Android où un utilisateur pose des questions sur un service">}}

{{% /tab %}}
{{< /tabs >}}

Sur la page d'accueil de Bits AI, vous pouvez poser des questions sur la santé du système de votre organisation. Bits AI prend en charge les requêtes en langage naturel pour les journaux et les traces APM. Pour plus d'informations, voir [Bits Chat][27].

### Enquête Bits {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Résultats de l'enquête Bits affichés sur une page On-Call.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Résultats de l'enquête Bits affichés sur une page On-Call.">}}

{{% /tab %}}
{{< /tabs >}}

Lorsqu'il est activé, Bits Investigation lance des enquêtes directement sur les pages On-Call. Ces enquêtes présentent des résultats et des conclusions initiales pour aider les intervenants à identifier les causes profondes potentielles et les prochaines étapes. Pour plus d'informations, voir [Bits Investigation][28].

## Question fréquemment posée {#frequently-asked-question}
### Comment rester connecté à l'application mobile ? {#how-do-i-remain-logged-into-the-mobile-app}
Après une authentification réussie à l'application mobile, vous resterez connecté pendant 90 jours.  

**Remarque** : Si vous avez activé les notifications, des notifications proactives seront envoyées 10 jours avant l'expiration du jeton.

### Vais-je toujours recevoir des notifications si je suis déconnecté automatiquement ? {#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
Si vous êtes déconnecté automatiquement pendant la période de jeton de 90 jours, vous pourrez toujours recevoir des notifications et serez invité à vous reconnecter.

**Remarque** : Si vous vous déconnectez manuellement de l'application, vous cesserez de recevoir des notifications.

### Pourquoi ne reçois-je pas de notifications ? {#why-am-i-not-receiving-notifications}
Vérifiez que vous avez activé les notifications pour l'application Datadog dans les paramètres de votre appareil. Si vous souhaitez vous assurer que les notifications contournent le mode Ne pas déranger, vérifiez que Critical Alerts est activé.

### Vais-je recevoir des notifications pour toutes les organisations auxquelles je suis connecté ? {#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
Oui, peu importe l'organisation vers laquelle vous passez, vous recevez des notifications pour toutes les organisations auxquelles vous êtes connecté. Cela inclut des notifications push critiques. 

### Que se passe-t-il si un utilisateur est désactivé ? {#what-happens-if-a-user-is-disabled}
Le jeton de l'application mobile sera invalide et forcera l'utilisateur à se déconnecter.

## Dépannage {#troubleshooting}

Pour obtenir de l'aide concernant le dépannage, [contactez le support Datadog][13]. Vous pouvez également envoyer un message dans le canal [Slack public de Datadog][14] [#mobile-app][15].

## Lectures complémentaires {#further-reading}

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
[27]: /fr/bits_ai/bits_assistant/
[28]: /fr/bits_ai/bits_ai_sre/
[29]: /fr/account_management/multi_organization/#custom-sub-domains