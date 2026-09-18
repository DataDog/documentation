---
description: Ajoutez des widgets Datadog à votre écran d'accueil ou de verrouillage
  mobile pour accéder rapidement aux SLOs, incidents, dashboards, monitors et informations
  d'astreinte.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Gagnez en flexibilité grâce aux widgets de dashboards mobiles Datadog
title: Widgets pour appareils mobiles
---
L'application mobile Datadog prend en charge les widgets SLO, Incident, Dashboard, On-Call et Monitor sur l'écran d'accueil ou de verrouillage de votre appareil. 

## Widgets de l'écran d'accueil {#home-screen-widgets}
Ajoutez des widgets sur votre écran d'accueil pour accéder rapidement à des informations critiques en temps réel directement depuis votre écran d'accueil sans jamais avoir à ouvrir l'application mobile Datadog.

{{< tabs >}}
{{% tab "iOS" %}}
1. Appuyez longuement sur votre écran d'accueil.
2. Appuyez sur {{< ui >}}Edit{{< /ui >}}, puis appuyez sur le bouton {{< ui >}}Add Widget{{< /ui >}} dans le coin supérieur gauche de l'écran.
2. Recherchez les widgets « Datadog ».
3. Appuyez sur le widget souhaité et sur la taille de votre choix (petit, moyen ou grand).
4. Appuyez sur {{< ui >}}Add Widget{{< /ui >}} et configurez les champs du widget. Lors de l'accès à l'application mobile depuis le widget, ce sont les champs qui seront interrogés dans l'application.
5. Faites glisser, réduisez ou agrandissez le widget pour personnaliser son emplacement et sa taille sur votre écran d'accueil.

{{% /tab %}}
{{% tab "Android" %}}
1. Appuyez longuement sur votre écran d'accueil.
2. Appuyez sur le bouton {{< ui >}}Widgets{{< /ui >}} sur votre éditeur d'écran d'accueil. Si vous avez des raccourcis d'application, il peut apparaître uniquement sous forme d'icône dans le coin supérieur droit de la bulle.
3. Recherchez les widgets « Datadog ».
4. Appuyez sur le widget souhaité et appuyez sur {{< ui >}}Add{{< /ui >}}.
4. Redimensionnez le widget selon vos préférences.
5. Appuyez sur le widget pour configurer les champs du widget. Lors de l'accès à l'application mobile depuis le widget, ce sont les champs qui seront interrogés dans l'application.

{{% /tab %}}
{{< /tabs >}}

**Remarque** : les widgets se rafraîchissent toutes les 30 minutes. Déclenchez manuellement le rafraîchissement en appuyant sur la période située en haut à gauche du widget.

### Widgets d'incidents {#incident-widgets}
Affichez vos [incidents ouverts][1] depuis votre écran d'accueil mobile avec les widgets Datadog. Pour analyser en détail vos problèmes, touchez un incident ouvert dans le widget. Une vue détaillée s'ouvre alors dans l'application mobile Datadog.

Vous pouvez également personnaliser vos widgets Open Incidents en filtrant vos données en fonction des éléments suivants :

- Organisation
- Niveaux de gravité
- Clients impactés
- Tri

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_incident_widget_may_2025.png" alt="Widget d'incident mobile Datadog affiché sur les appareils iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}}.
2. Appuyez sur {{< ui >}}Choose{{< /ui >}} à côté de l'étiquette {{< ui >}}Organization{{< /ui >}} pour récupérer les incidents ouverts de l'organisation sélectionnée.
3. Appuyez sur {{< ui >}}SEV-1 and SEV-2{{< /ui >}} à côté de l'étiquette Niveaux de gravité pour spécifier les filtres de gravité.
4. Appuyez sur {{< ui >}}Both{{< /ui >}} à côté de l'étiquette {{< ui >}}Customer Impacted{{< /ui >}} pour filtrer les incidents ouverts ayant eu un impact sur les clients.
5. Saisissez dans la zone de texte {{< ui >}}Type additional filters{{< /ui >}} pour spécifier tout filtrage supplémentaire.
6. Appuyez sur {{< ui >}}Ordering{{< /ui >}} pour spécifier l'ordre dans lequel les incidents sont listés.
7. Appuyez en dehors du widget pour enregistrer votre sélection et quitter l'écran de configuration.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_incidents_widget_may_2025.png" alt="Widget d'incident mobile Datadog affiché sur Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le titre du widget pour configurer.
2. Appuyez sur {{< ui >}}Organization{{< /ui >}} pour récupérer les incidents ouverts de l'organisation sélectionnée.
3. Appuyez sur {{< ui >}}Severities{{< /ui >}} pour spécifier les filtres de gravité.
4. Appuyez sur {{< ui >}}Customer impacted{{< /ui >}} pour filtrer les incidents ouverts ayant eu un impact sur les clients.
5. Appuyez sur {{< ui >}}Query{{< /ui >}} pour spécifier tout filtrage supplémentaire.
6. Appuyez sur {{< ui >}}Sorted by{{< /ui >}} pour spécifier l'ordre dans lequel les incidents sont listés.
7. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}} pour enregistrer votre sélection et quitter l'écran de configuration.
8. Appuyez longuement et redimensionnez le widget selon vos préférences.

{{% /tab %}}
{{< /tabs >}}

#### Afficher les incidents ouverts de plusieurs organisations {#display-open-incidents-from-multiple-organizations}

Vous pouvez afficher les incidents ouverts de plusieurs organisations sur l'écran d'accueil de votre appareil mobile.

{{< tabs >}}
{{% tab "iOS" %}}
- Appuyez sur {{< ui >}}Choose{{< /ui >}} à côté de l'étiquette Organisation pour récupérer les incidents ouverts de l'organisation sélectionnée.


{{% /tab %}}
{{% tab "Android" %}}

1. Appuyez sur le titre du widget pour configurer.
2. Depuis l'écran de configuration, appuyez sur {{< ui >}}Organization{{< /ui >}}.
3. Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
4. Redimensionnez le widget selon vos préférences.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### Widget SLOs {#slos-widget}

Affichez vos [SLOs][2] depuis votre écran d'accueil mobile avec les widgets Datadog. Vous pouvez ajouter n'importe quel SLO de votre organisation en tant que widget, accompagné d'une période.

Les options de période sont :
- 7 jours
- 30 jours
- 90 jours
- Semaine précédente
- Mois précédent
- Semaine en cours
- Mois en cours

Vous pouvez également configurer un dashboard de façon à ce qu'il s'ouvre par défaut lorsque vous touchez un widget SLO. Cette fonctionnalité vous permet d'étudier en quelques secondes certaines métriques.

**Remarque** : Si vous ne spécifiez pas de dashboard qui s'ouvre par défaut, appuyez sur un widget SLOs pour ouvrir l'application Datadog.

#### Modifier un widget SLOs {#edit-an-slos-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_slo_widget_may_2025.png" alt="Widgets SLO de disponibilité des applications affichés sur les appareils iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour le configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}}.
3. Appuyez sur {{< ui >}}Choose{{< /ui >}} à côté de l'étiquette SLO pour choisir un SLO à suivre.
4. Selon le SLO choisi, une étiquette {{< ui >}}Timeframe{{< /ui >}} peut apparaître. Appuyez sur {{< ui >}}Choose{{< /ui >}} à côté de l'étiquette {{< ui >}}Timeframe{{< /ui >}} pour choisir la période du SLO.
5. Appuyez sur {{< ui >}}Choose{{< /ui >}} à côté de l'étiquette {{< ui >}}Dashboard to open{{< /ui >}} pour choisir un dashboard qui s'ouvre lorsque vous appuyez sur le widget SLOs.
6. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_slo_widget_may_2025.png" alt="Widgets SLO de disponibilité des applications affichés sur Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le titre du widget pour configurer.
2. Appuyez sur {{< ui >}}Selected SLO{{< /ui >}} pour choisir un SLO à suivre.
3. Appuyez sur {{< ui >}}Selected Time Window{{< /ui >}} pour choisir la période du SLO.
4. Appuyez sur {{< ui >}}Dashboard to open{{< /ui >}} pour choisir un dashboard qui s'ouvre lorsque vous appuyez sur le widget SLOs.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}} pour valider votre sélection et quitter l'écran de configuration.
6. Appuyez longuement et redimensionnez le widget selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les SLOs de plusieurs organisations {#display-slos-from-multiple-organizations}

Vous pouvez afficher les SLO de plusieurs organisations sur l'écran d'accueil de votre appareil mobile.

{{< tabs >}}
{{% tab "iOS" %}}

Toutes les organisations auxquelles vous vous êtes connecté sont affichées dans l'écran de configuration. Si vous ne voyez pas votre organisation, reconnectez-vous.


{{% /tab %}}
{{% tab "Android" %}}

1. Appuyez sur le titre du widget pour configurer.
2. Depuis l'écran de configuration, appuyez sur {{< ui >}}Organization{{< /ui >}}.
3. Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
4. Redimensionnez le widget selon vos préférences.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### Widget de monitors {#monitors-widget}

Affichez vos [monitors][3] depuis votre écran d'accueil avec les widgets Datadog. Appuyez sur n'importe quelle cellule pour ouvrir l'écran {{< ui >}}Monitor Search{{< /ui >}} dans l'application, avec vos monitors déjà renseignés.

**Remarque** : Si vous n'avez aucune vue de monitor enregistrée, le widget affiche tous les monitors par défaut.

#### Modifier un widget de monitors {#edit-a-monitors-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_monitor_widget_may_2025.png" alt="Widgets de monitors configurés affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour le configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}}.
3. Appuyez sur la cellule de vue enregistrée individuelle pour sélectionner et désélectionner.
4. Réorganisez les vues en faisant glisser et déposer chaque cellule.
5. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_monitor_widget_may_2025.png" alt="Widgets de monitors configurés affichés sur Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le titre du widget pour configurer.
2. Appuyez sur {{< ui >}}Saved Views{{< /ui >}}.
3. Appuyez sur la cellule de vue enregistrée individuelle pour sélectionner et désélectionner.
4. Réorganisez les vues en faisant glisser et déposer chaque cellule.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}} pour valider votre sélection et quitter l'écran de configuration.
6. Faites défiler l'intérieur du widget pour voir plus de vues enregistrées. Appuyez longuement sur le widget pour modifier sa taille selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les monitors de plusieurs organisations {#display-monitors-from-multiple-organizations}

Vous pouvez afficher les monitors de plusieurs organisations au sein d'un même widget.

{{< tabs >}}
{{% tab "iOS" %}}

Toutes les organisations auxquelles vous êtes connecté sont affichées dans l'écran de configuration. Si vous ne voyez pas votre organisation, vous devrez peut-être vous reconnecter.


{{% /tab %}}
{{% tab "Android" %}}

1. Appuyez sur le titre du widget pour configurer.
2. Depuis l'écran de configuration, appuyez sur {{< ui >}}Organization{{< /ui >}}.
3. Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
4. Modifiez le widget selon vos préférences.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

### Widget de Dashboard {#dashboard-widget}

Affichez votre [dashboard][4] depuis votre écran d'accueil avec les widgets Datadog. Appuyez sur n'importe quelle cellule pour ouvrir l'écran {{< ui >}}dashboard search{{< /ui >}} dans l'application, avec votre dashboard déjà chargé.

#### Modifier un widget de dashboard {#edit-a-dashboard-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_dashboard_widget_may_2025.png" alt="Widgets de dashboard configurés affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour le configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}}.
3. Depuis l'écran de configuration, appuyez sur {{< ui >}}Dashboard{{< /ui >}} et sélectionnez un dashboard.
4. Appuyez sur {{< ui >}}Widget{{< /ui >}} pour sélectionner un widget spécifique à partir du dashboard sélectionné.
5. Sélectionnez un {{< ui >}}Period{{< /ui >}} pour la requête du widget.
6. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_dashboard_widget_may_2025.png" alt="Widgets de dashboard configurés affichés sur Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le titre du widget pour configurer.
2. Appuyez sur {{< ui >}}Saved Views{{< /ui >}}.
3. Appuyez sur la cellule de vue enregistrée individuelle pour sélectionner et désélectionner.
4. Réorganisez les vues en faisant glisser et déposer chaque cellule.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}} pour valider votre sélection et quitter l'écran de configuration.
6. Faites défiler l'intérieur du widget pour voir plus de vues enregistrées. Appuyez longuement sur le widget pour modifier sa taille selon vos préférences.


{{% /tab %}}
{{< /tabs >}}

#### Afficher les dashboards de plusieurs organisations {#display-dashboards-from-multiple-organizations}

Vous pouvez afficher des dashboards provenant de plusieurs organisations sur votre écran d'accueil mobile.

{{< tabs >}}
{{% tab "iOS" %}}

Toutes les organisations auxquelles vous vous êtes connecté sont affichées dans l'écran de configuration. Si vous ne voyez pas votre organisation, reconnectez-vous.


{{% /tab %}}
{{% tab "Android" %}}

1. Appuyez sur le titre du widget pour configurer.
2. Depuis l'écran de configuration, appuyez sur {{< ui >}}Organization{{< /ui >}}.
3. Sélectionnez une nouvelle organisation (vous devrez peut-être vous connecter).
4. Redimensionnez le widget selon vos préférences.
5. Appuyez sur {{< ui >}}Save{{< /ui >}} ou {{< ui >}}Apply{{< /ui >}}.
   
{{% /tab %}}
{{< /tabs >}}

### Widget On-Call {#on-call-widget}

Consultez vos On-Call shifts et vos On-Call pages sur votre écran d'accueil mobile avec les widgets Datadog.

Vous pouvez personnaliser vos widgets On-Call shifts en filtrant par :

- Organisation
- Période temporelle

Vous pouvez personnaliser vos widgets On-Call pages en filtrant par :

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
3. Sélectionnez les {{< ui >}}Organization{{< /ui >}} et {{< ui >}}Period{{< /ui >}} pour lesquels vous souhaitez voir vos On-Call shifts.
4. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Widgets On-Call shift configurés sur l'écran d'accueil affichés sur les écrans Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le widget pour configurer.
2. Sélectionnez les {{< ui >}}Organization{{< /ui >}} et {{< ui >}}Time Period{{< /ui >}} pour lesquels vous souhaitez voir vos On-Call shifts.
3. Appuyez sur {{< ui >}}✓{{< /ui >}} pour enregistrer la configuration.
4. Appuyez longuement et redimensionnez le widget selon vos préférences.

{{% /tab %}}
{{< /tabs >}}

#### Modifier un widget On-Call pages {#edit-an-on-call-pages-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_pages_widget_may_2025.png" alt="Widgets On-Call page configurés sur l'écran d'accueil affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez longuement sur le widget pour le configurer.
2. Appuyez sur {{< ui >}}Edit Widget{{< /ui >}} pour afficher l'écran de configuration.
3. Sélectionnez les {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}} et {{< ui >}}Order{{< /ui >}} dans lesquels vous souhaitez voir les On-Call pages.
4. Saisissez des filtres supplémentaires et appuyez sur {{< ui >}}Done{{< /ui >}}.
5. Appuyez en dehors du widget pour valider votre sélection et quitter l'écran de configuration.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_pages_widget_may_2025.png" alt="Widgets On-Call page configurés sur l'écran d'accueil affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Appuyez sur le widget pour configurer.
2. Sélectionnez les {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}} et {{< ui >}}Sort by{{< /ui >}} dans lesquels vous souhaitez voir les On-Call pages.
3. Appuyez pour saisir des {{< ui >}}Additional Filter{{< /ui >}} et appuyez sur {{< ui >}}Save{{< /ui >}}.
4. Appuyez sur {{< ui >}}✓{{< /ui >}} une fois les configurations terminées
5. Appuyez longuement et redimensionnez le widget selon vos préférences.

{{% /tab %}}
{{< /tabs >}}


## Widgets de l'écran de verrouillage {#lock-screen-widgets}
{{< img src="mobile/widgets/lockscreen_widget_may_2025.png" alt="Widgets de l'écran de verrouillage configurés affichés sur les écrans iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Les widgets de l'écran de verrouillage pour On-Call, Monitors, SLO, Incidents et Dashboards sont pris en charge sur iOS.

1. Appuyez longuement sur votre écran de verrouillage.
2. Appuyez sur {{< ui >}}Customize{{< /ui >}}, puis sur {{< ui >}}Lock Screen{{< /ui >}}.
3. Appuyez sur l'espace réservé aux widgets de l'écran de verrouillage pour afficher la carte {{< ui >}}Add Widgets{{< /ui >}}.
4. Faites défiler jusqu'à l'application {{< ui >}}Datadog{{< /ui >}} et appuyez dessus.
4. Appuyez sur le widget de l'écran de verrouillage que vous souhaitez ajouter.
5. Appuyez sur le widget de l'écran de verrouillage pour afficher le panneau de configuration.
6. Configurez le widget en fonction des champs spécifiés pour le widget sélectionné.
7. Faites glisser, réduisez ou agrandissez le widget pour personnaliser son emplacement et sa taille sur votre écran de verrouillage.

**Remarque** : Vous devez disposer d'un espace vide sur votre écran de verrouillage pour ajouter un nouveau widget. Vous pouvez supprimer un widget de l'écran de verrouillage en appuyant sur le bouton {{< ui >}}\-{{< /ui >}} en haut à gauche du widget que vous souhaitez supprimer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/incident_management
[2]: /fr/dashboards/widgets/slo/#setup
[3]: /fr/monitors/
[4]: /fr/dashboards/
[5]: /fr/incident_response/on-call/