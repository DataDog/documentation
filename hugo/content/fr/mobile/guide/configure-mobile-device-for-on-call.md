---
description: Configurez votre appareil mobile pour des notifications d'astreinte fiables
  avec des alertes critiques, le contournement du mode « Ne pas déranger » et la configuration
  des contacts téléphoniques.
further_reading:
- link: https://docs.datadoghq.com/incident_response/on-call/
  tag: Documentation
  text: Documentation On-Call
- link: https://docs.datadoghq.com/mobile/
  tag: Documentation
  text: Documentation de l'application mobile
title: Configurez votre appareil mobile pour Datadog On-Call
---
<div class="alert alert-info">
Si vous avez uniquement besoin d'accéder à On-Call sur mobile et que vous souhaitez restreindre l'accès aux données de télémétrie sensibles sur les appareils mobiles, contactez le support Datadog.
</div>

Être d'astreinte nécessite des notifications fiables et opportunes pour garantir que vous puissiez répondre aux incidents efficacement. Ce guide vous accompagne dans les étapes de configuration de votre appareil mobile pour des performances optimales avec [Datadog On-Call][5].

1. Installez l'[application mobile Datadog][1].
2. [Configurez les notifications push](#set-up-push-notifications) : Autorisez votre appareil à recevoir des notifications de l'application mobile Datadog.
3. [Contournez le mode silencieux et « Ne pas déranger »](#circumvent-mute-and-do-not-disturb-mode-for-on-call) : Recevez des notifications push, des appels vocaux et des SMS pendant que votre appareil est en mode « Ne pas déranger ».

## Configurer les notifications push {#set-up-push-notifications}
<div class="alert alert-info">
Lorsque vous vous connectez à l'application mobile Datadog pour la première fois, un flux d'intégration prend en charge les paramètres de notification et les autorisations.
</div>

Cependant, par défaut, l'application mobile n'est pas autorisée à vous envoyer des notifications. Pour recevoir des notifications push : 

{{< tabs >}}
{{% tab "iOS" %}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Trouvez les paramètres de notification dans la version iOS de l'application mobile Datadog." style="width:35%;" >}}

2. Activez le commutateur {{< ui >}}Allow Notifications{{< /ui >}}. S'il s'agit de votre première activation des notifications, cela ouvre une invite d'autorisation. Accordez l'autorisation, puis touchez à nouveau {{< ui >}}Enable Notifications{{< /ui >}} pour accéder aux paramètres système iOS.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configurez les paramètres de notification système de votre appareil iOS." style="width:100%;" >}}

3. Dans les paramètres système iOS, assurez-vous d'activer le commutateur {{< ui >}}Allow Notifications{{< /ui >}}. Datadog recommande vivement d'activer également les commutateurs {{< ui >}}Sound{{< /ui >}} et {{< ui >}}Badges{{< /ui >}}.

Assurez-vous d'accorder à l'application mobile les autorisations nécessaires.
{{% /tab %}}

{{% tab "Android" %}}
1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Trouvez les paramètres de notification dans la version Android de l'application mobile Datadog." style="width:35%;" >}}

2. Activez le commutateur {{< ui >}}Allow notifications{{< /ui >}}. Datadog vous recommande vivement d'activer également {{< ui >}}Sound and vibration{{< /ui >}} et {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configurez les paramètres de notification système de votre appareil Android." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Sons personnalisés {#custom-sounds}
Sur iOS comme sur Android, vous avez la possibilité de remplacer les sons de notification système par défaut. L'application Datadog est fournie avec une sélection de sons personnalisés.  

## Contourner le mode silencieux et le mode Ne pas déranger pour On-Call {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Vous pouvez remplacer le volume système et le mode Ne pas déranger de votre appareil pour les notifications push (depuis l'application mobile Datadog) et les notifications téléphoniques (telles que les appels vocaux et les SMS).

### Notifications push critiques {#critical-push-notifications}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil iOS." style="width:100%;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Activez le commutateur {{< ui >}}Critical Alerts{{< /ui >}}. Les alertes critiques ignorent le commutateur de sourdine et le mode Ne pas déranger. Si vous activez les alertes critiques, le système joue le son d'une alerte critique indépendamment des paramètres de sourdine ou de mode Ne pas déranger de l'appareil.

3. Dans les paramètres système iOS, assurez-vous d'activer le commutateur {{< ui >}}Critical Alerts{{< /ui >}}. Assurez-vous d'accorder à l'application mobile les autorisations nécessaires.

4. Sélectionnez votre appareil pour {{< ui >}}High Urgency Notifications{{< /ui >}} et/ou {{< ui >}}Low Urgency Notifications{{< /ui >}} dans la section Préférences de notification.

5. Testez la configuration de votre notification push critique en appuyant sur {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%;" >}}

2. Si les autorisations de notification sont manquantes, appuyez sur {{< ui >}}Bypass Do Not Disturb{{< /ui >}} et activez {{< ui >}}Allow notifications{{< /ui >}} dans les paramètres système.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%;" >}}

3. Appuyez ensuite sur {{< ui >}}Bypass Do Not Disturb{{< /ui >}} et activez {{< ui >}}Override Do Not Disturb{{< /ui >}} dans les paramètres système pour les alertes On-Call de haute urgence.

   **Sur les appareils Samsung** : Allez dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Sélectionnez Datadog et autorisez-le à contourner le mode Ne pas déranger.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%;" >}}

4. Pour remplacer le volume du système, appuyez sur {{< ui >}}Override system volume{{< /ui >}} et autorisez {{< ui >}}Mode access{{< /ui >}} dans les paramètres système afin d'activer {{< ui >}}Override system volume{{< /ui >}}.

5. Sur le web, configurez les préférences de notification pour {{< ui >}}High Urgency Notifications{{< /ui >}} et/ou {{< ui >}}Low Urgency Notifications{{< /ui >}}.

6. Testez la configuration de votre notification push critique en appuyant sur {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
Sur Android, l'application mobile Datadog ne peut pas contourner les paramètres de volume système ou le mode Ne pas déranger lorsqu'elle est utilisée dans un Work Profile. Datadog recommande d'installer l'application mobile Datadog sur votre profil personnel, sous réserve des politiques de votre organisation.
</div>

{{% /tab %}}
{{< /tabs >}}
### Sons et volume personnalisés pour les notifications push critiques {#custom-sounds-and-volume-for-critical-push}
Pour les notifications de haute urgence, Datadog recommande vivement de personnaliser les paramètres de son et de volume de votre système. Cela garantit que les alertes sont non seulement plus distinctes et reconnaissables, mais aussi plus efficaces pour attirer l'attention. Testez vos préférences de notification pour confirmer qu'elles se comportent comme prévu.

### Canaux de téléphonie (appels vocaux et SMS) {#telephony-channels-voice-calls-and-sms}

Pour plus de fiabilité, Datadog utilise un ensemble rotatif de numéros de téléphone pour vous contacter. Pour aider votre téléphone à reconnaître les appels et les messages de Datadog On-Call, vous pouvez créer une carte de contact numérique. Cette carte se met automatiquement à jour avec les derniers numéros de téléphone de Datadog. Vous pouvez attribuer des autorisations spéciales à ce contact dans vos paramètres système pour une fonctionnalité améliorée, telle que le contournement du mode Ne pas déranger.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/ios_sync_card_may_2025.png" alt="Contournez le mode « Ne pas déranger » de votre appareil iOS pour les SMS et les appels vocaux." style="width:100%;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Activez {{< ui >}}Automatic Contact Card Sync{{< /ui >}}. Cela crée un contact nommé « Datadog On-Call », qui se met régulièrement à jour avec les derniers numéros de téléphone de Datadog.

3. Une fois ce contact créé, ouvrez les paramètres de votre système iOS et accédez à {{< ui >}}Focus{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}.

4. Sous {{< ui >}}People{{< /ui >}}, autorisez les notifications du contact Datadog On-Call. Si vous avez activé les alertes critiques pour les applications push Datadog, l'application mobile Datadog apparaît également sous **Apps**.

5. Pour contourner le mode silencieux, accédez au contact Datadog On-Call >> appuyez sur {{< ui >}}Ringtone{{< /ui >}} >> activez {{< ui >}}Emergency Bypass{{< /ui >}}.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/android_sync_card_may_2025.png" alt="Remplacez le mode « Ne pas déranger » de votre appareil Android pour les SMS et les appels vocaux." style="width:100%;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Sous {{< ui >}}Phone & SMS{{< /ui >}}, activez {{< ui >}}Automatic Contact Card Sync{{< /ui >}}. Cela crée un contact nommé « Datadog On-Call », qui se met régulièrement à jour avec les derniers numéros de téléphone de Datadog.

3. Une fois ce contact créé, marquez-le comme favori.

4. Ouvrez les paramètres de votre système Android et accédez à {{< ui >}}Sound & vibration{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}. Créez une exception pour le contact Datadog On-Call.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Téléchargez la version actuelle de la fiche de contact Datadog On-Call</a>. <strong>Remarque</strong> : La fiche de contact est susceptible d'être modifiée à tout moment.
</div>

## Widgets mobiles On-Call {#on-call-mobile-widgets}
Ajoutez des widgets On-Call sur votre écran d'accueil et votre écran de verrouillage pour accéder à vos pages et à vos gardes.

### Widget d'écran d'accueil On-Call {#on-call-home-screen-widget}

Consultez vos On-Call shifts et vos On-Call pages sur votre écran d'accueil mobile avec les widgets Datadog.

Vous pouvez personnaliser vos widgets On-Call shift en filtrant par :

- Organisation
- Période

Vous pouvez personnaliser les widgets de votre page On-Call en filtrant par :

- Organisation
- Équipe
- Ordre

**Remarque** : Vous pouvez ajouter des filtres supplémentaires pour le widget On-Call pages.

#### Modifier un widget On-Call shift {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="Widgets On-Call shift configurés sur l'écran d'accueil affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour le configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}} pour afficher l'écran de configuration.
3. Sélectionnez {{< ui >}}Organization{{< /ui >}} et {{< ui >}}Period{{< /ui >}} pour lesquels vous souhaitez voir vos On-Call shifts.
4. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Widgets On-Call shift configurés sur l'écran d'accueil affichés sur les écrans Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le widget pour configurer.
2. Sélectionnez {{< ui >}}Organization{{< /ui >}} et {{< ui >}}Time Period{{< /ui >}} pour lesquels vous souhaitez voir vos On-Call shifts.
3. Appuyez sur {{< ui >}}✓{{< /ui >}} pour enregistrer la configuration.
4. Appuyez longuement et redimensionnez le widget selon vos préférences.

{{% /tab %}}
{{< /tabs >}}

### Widget On-Call pour écran de verrouillage {#on-call-lock-screen-widget}

Le widget On-Call pour écran de verrouillage affiche votre statut On-Call. Les widgets d'écran de verrouillage ne sont disponibles que sur iOS.

1. Appuyez longuement sur votre écran de verrouillage.
2. Appuyez sur {{< ui >}}Customize{{< /ui >}}, puis sur {{< ui >}}Lock Screen{{< /ui >}}.
3. Appuyez sur l'espace réservé aux widgets de l'écran de verrouillage pour afficher la carte {{< ui >}}Add Widgets{{< /ui >}}.
4. Faites défiler jusqu'à l'application {{< ui >}}Datadog{{< /ui >}} et appuyez dessus.
4. Appuyez sur le widget On-Call pour écran de verrouillage.
5. Appuyez sur le widget de l'écran de verrouillage pour afficher le panneau de configuration.
6. Sélectionnez l'organisation pour laquelle vous souhaitez afficher votre statut On-Call.

**Remarque** : Vous devez disposer d'un espace vide sur votre écran de verrouillage pour ajouter un nouveau widget. Vous pouvez supprimer des widgets de l'écran de verrouillage en appuyant sur le bouton {{< ui >}}\-{{< /ui >}} en haut à gauche du widget que vous souhaitez supprimer.

## Dépannage {#troubleshooting}
Pour obtenir de l'aide concernant le dépannage, [contactez le support Datadog][2]. Vous pouvez également envoyer un message dans le canal [#mobile-app][4] du [Slack public de Datadog][3].

[1]: /fr/mobile/?tab=ios
[2]: /fr/help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
[5]: /fr/incident_response/on-call/