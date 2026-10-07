---
description: Configurez les notifications push sur iOS et Android pour les alertes
  d'astreinte, les incidents et les mises à jour de workflow avec des paramètres d'alerte
  critique.
further_reading:
- link: /incident_response/on-call/
  tag: Documentation
  text: Documentation On-Call
- link: /incident_response/incident_management/notification/
  tag: Documentation
  text: Documentation sur les règles de notification d'incident
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Documentation sur Workflow Automation
title: Configurer les notifications push sur l'application mobile
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Seules les notifications push Incident Management sont prises en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
Recevez des notifications push mobiles pour les [alertes On-Call](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call), les [incidents](#incident-notifications) et les [mises à jour d'automatisation des workflows](#workflow-automation-notifications), afin de rester informé en temps réel depuis l'application mobile Datadog.

## Configurer les notifications push {#set-up-push-notifications}

Par défaut, l'application mobile n'est pas autorisée à vous envoyer des notifications. Pour recevoir des notifications push : 

{{< tabs >}}
{{% tab "iOS" %}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Trouvez les paramètres de notification dans la version iOS de l'application mobile Datadog." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Activez le commutateur {{< ui >}}Allow Notifications{{< /ui >}}. S'il s'agit de votre première activation des notifications, cela ouvre une invite d'autorisation. Accordez l'autorisation, puis touchez à nouveau {{< ui >}}Enable Notifications{{< /ui >}} pour accéder aux paramètres système iOS.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configurez les paramètres de notification système de votre appareil iOS." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Dans les paramètres système iOS, assurez-vous d'activer le commutateur {{< ui >}}Allow Notifications{{< /ui >}}. Datadog vous recommande également d'activer les commutateurs {{< ui >}}Sound{{< /ui >}} et {{< ui >}}Badges{{< /ui >}}.

Assurez-vous d'accorder à l'application mobile les autorisations nécessaires.

### Sons personnalisés {#custom-sounds}

Vous pouvez remplacer les sons de notification système par défaut par des sons personnalisés préchargés dans l'application mobile Datadog.

Pour personnaliser les sons de notification :

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
2. Sélectionnez la catégorie de notification que vous souhaitez personnaliser.
3. Sélectionnez un son parmi les options disponibles.

{{% /tab %}}

{{% tab "Android" %}}
1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Trouvez les paramètres de notification dans la version Android de l'application mobile Datadog." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Activez le commutateur {{< ui >}}Allow notifications{{< /ui >}}. Datadog vous recommande vivement d'activer également {{< ui >}}Sound and vibration{{< /ui >}} et {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configurez les paramètres de notification système de votre appareil Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

### Sons personnalisés {#custom-sounds-1}

Vous pouvez remplacer les sons de notification système par défaut par des sons personnalisés préchargés dans l'application mobile Datadog.

Pour personnaliser les sons de notification :

1. Accédez à {{< ui >}}Device Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Advanced Settings{{< /ui >}}.
2. Sélectionnez {{< ui >}}Manage notification categories for each app{{< /ui >}} et assurez-vous que Datadog est sélectionné.
3. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
4. Sélectionnez la catégorie de notification que vous souhaitez personnaliser.
5. Sélectionnez un son parmi les options disponibles.

**Remarque** : Le volume des notifications push est déterminé par les paramètres de volume du système de votre appareil.

{{% /tab %}}
{{< /tabs >}}

## Contourner le mode silencieux et le mode Ne pas déranger pour On-Call {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Vous pouvez remplacer le volume système et le mode Ne pas déranger de votre appareil pour les notifications push (depuis l'application mobile Datadog) et les notifications téléphoniques (telles que les appels vocaux et les SMS).

Pour plus d'informations, consultez le [guide sur la configuration de votre appareil mobile pour On-Call][4].

### Notifications push critiques {#critical-push-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">On-Call n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ("{{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
<div class="alert alert-info">
Les notifications push critiques ne sont disponibles que pour On-Call. Si vous configurez On-Call sur l'application mobile Datadog pour la première fois, un flux d'intégration prend en charge les paramètres de notification et les autorisations.
</div>
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil iOS." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Activez le commutateur {{< ui >}}Critical Alerts{{< /ui >}}. Les alertes critiques ignorent le commutateur de sourdine et le mode Ne pas déranger. Si vous activez les alertes critiques, le système joue le son d'une alerte critique indépendamment des paramètres de sourdine ou de mode Ne pas déranger de l'appareil.

3. Dans les paramètres système iOS, assurez-vous d'activer le commutateur {{< ui >}}Critical Alerts{{< /ui >}}. Assurez-vous d'accorder à l'application mobile les autorisations nécessaires.

4. Sélectionnez votre appareil pour {{< ui >}}High Urgency Notifications{{< /ui >}} et/ou {{< ui >}}Low Urgency Notifications{{< /ui >}} dans la section Préférences de notification.

5. Testez la configuration de votre notification push critique en appuyant sur {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Dans l'application mobile Datadog, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

2. Si les autorisations de notification sont manquantes, appuyez sur {{< ui >}}Bypass Do Not Disturb{{< /ui >}} et activez {{< ui >}}Allow notifications{{< /ui >}} dans les paramètres système.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Appuyez ensuite sur {{< ui >}}Bypass Do Not Disturb{{< /ui >}} et activez {{< ui >}}Override Do Not Disturb{{< /ui >}} dans les paramètres système pour les alertes On-Call de haute urgence.

   **Sur les appareils Samsung** : Allez dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Sélectionnez Datadog et autorisez-le à contourner le mode Ne pas déranger.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Remplacez le volume système et le mode Ne pas déranger de votre appareil Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

4. Afin de remplacer le volume système, appuyez sur {{< ui >}}Override system volume{{< /ui >}} puis, dans les paramètres système, autorisez {{< ui >}}Mode access{{< /ui >}} à activer {{< ui >}}Override system volume{{< /ui >}}.

5. Sélectionnez votre appareil pour {{< ui >}}High Urgency Notifications{{< /ui >}} et/ou {{< ui >}}Low Urgency Notifications{{< /ui >}} dans la section Préférences de notification.

6. Testez la configuration de votre notification push critique en appuyant sur {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
Sur Android, l'application mobile Datadog ne peut pas contourner les paramètres de volume système ou le mode Ne pas déranger lorsqu'elle est utilisée dans un Work Profile. En guise de solution de contournement, installez l'application mobile Datadog sur votre profil personnel.
</div>

<div class="alert alert-info">
Vous devez être connecté pour accuser réception et agir sur les On-Call pages. Cependant, vous recevez toujours des notifications push On-Call lorsque vous êtes déconnecté de l'application mobile Datadog.
</div>

{{% /tab %}}
{{< /tabs >}}

### Sons et volume personnalisés pour les notifications push critiques {#custom-sounds-and-volume-for-critical-push}

<div class="alert alert-info">Les commandes de volume et de son ne sont disponibles que pour les notifications On-Call. Les notifications d'incident et de workflow utilisent les paramètres système par défaut de votre appareil. </div>

Pour les notifications de haute urgence, Datadog recommande vivement de personnaliser les paramètres de son et de volume de votre système. Cela garantit que les alertes sont non seulement plus distinctes et reconnaissables, mais aussi plus efficaces pour attirer l'attention. Testez vos préférences de notification push critique pour confirmer qu'elles se comportent comme prévu.

## Notifications d'incident {#incident-notifications}
Recevez des mises à jour sur le statut de vos incidents actifs en configurant des [Règles de notification pour les incidents sur le Web][2]. 

1. Dans Incidents, accédez à {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Notification Rules{{< /ui >}}][1].
2. Cliquez sur le bouton {{< ui >}}+ New Rule{{< /ui >}} en haut à droite.
3. Saisissez les champs de condition souhaités pour {{< ui >}}When an incident is...{{< /ui >}} et {{< ui >}}And meets the following conditions...{{< /ui >}}. Par défaut, ces filtres sont vides et une règle de notification se déclenche pour tout incident.
4. Sous {{< ui >}}Notify...{{< /ui >}} sélectionnez votre destinataire de notification. Si vous souhaitez notifier l'appareil mobile d'un destinataire, sélectionnez l'option correspondant à son nom qui inclut {{< ui >}}(Mobile Push Notification){{< /ui >}}. Le destinataire doit avoir activé les notifications dans l'application mobile Datadog pour que cette option apparaisse.
5. {{< ui >}}With Template:{{< /ui >}} Sélectionnez le modèle de message que la règle de notification doit utiliser.
6. {{< ui >}}Renotify on updates to:{{< /ui >}} Sélectionnez les propriétés d'incident qui déclenchent les notifications. Une nouvelle notification est envoyée chaque fois qu'une ou plusieurs des propriétés sélectionnées changent.
7. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Par défaut, si vous avez activé les notifications push et que vous êtes désigné comme commandant pour un incident, vous recevez automatiquement une notification push pour cet incident.

## Notifications d'automatisation de workflows {#workflow-automation-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'automatisation des workflows n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Créez des [automatisations de workflows][3] qui envoient des notifications push mobiles.

1. Sur le canevas de workflow, cliquez sur l'icône {{< ui >}}\+{{< /ui >}}.
2. Recherchez {{< ui >}}Send mobile push notification{{< /ui >}}.
3. Sous {{< ui >}}To{{< /ui >}} , sélectionnez votre destinataire de notification. Le destinataire doit avoir activé les notifications dans l'application mobile Datadog pour que cette option apparaisse.
4. Saisissez le message {{< ui >}}Body{{< /ui >}}.

### Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules/
[3]: https://docs.datadoghq.com/fr/getting_started/workflow_automation/
[4]: /fr/incident_response/on-call/guides/configure-mobile-device-for-on-call