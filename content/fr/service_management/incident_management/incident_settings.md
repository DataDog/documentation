---
aliases:
- /fr/monitors/incident_management/notification_rules
- /fr/monitors/incident_management/incident_settings
description: Configurer et personnaliser l'expérience de gestion des incidents
title: Paramètres d'incident
---

## Présentation

Les [paramètres d'incident][1] vous permettent de personnaliser l'expérience de gestion des incidents pour l'ensemble de votre organisation. Les paramètres sont répartis en quatre sous-sections. Les principales catégories de paramètres sont General, Notifications et Remediation.

## General

La sous-section General des paramètres d'incident sert à définir les niveaux de gravité et les niveaux de statut de votre organisation, mais également à spécifier le texte d'assistance des incidents.

### Information

{{< img src="service_management/incidents/severity_settings.jpeg" alt="Paramètres de niveau de gravité des incidents" style="width:80%;">}}

Utilisez les paramètres de niveau de gravité pour :

1. Définir votre niveau de gravité le plus critique en tant que `SEV-0` ou `SEV-1` (valeur par défaut : `SEV-1`)
2. Personnaliser les sous-étiquettes des niveaux de gravité (**valeurs par défaut** : Critical, High, Moderate, Low, Minor)
3. Personnaliser les descriptions des niveaux de gravité
4. Ajouter ou supprimer des niveaux de gravité à l'aide de l'option en bas de la liste (pas moins de 3 niveaux et pas plus de 10)

**Remarque** : si vous tentez de supprimer un niveau de gravité qui est utilisé dans une règle de notification, vous êtes invité à confirmer votre décision. Si vous choisissez de confirmer la suppression, les règles de notification concernées sont alors désactivées, car elles ne sont plus valides. La suppression d'un niveau de gravité ou la modification d'un premier niveau de gravité n'entraînent pas la mise à jour automatique des requêtes [Incident Management Analytics][2].

{{< img src="service_management/incidents/status_settings.jpeg" alt="Paramètres de niveau de statut des incidents" style="width:80%;">}}

Utilisez les paramètres de niveau de statut pour :

1. Personnaliser les descriptions des statuts
2. Choisir d'activer ou non le statut facultatif `Completed`

**Remarque** : la suppression du statut `Completed` n'entraîne pas la mise à jour automatique des incidents possédant le statut `Completed` ou des requêtes [Incident Management Analytics][2] utilisant ce statut. Les règles de notification utilisant le statut `Completed` sont désactivées, car elles ne sont plus valides.

{{< img src="service_management/incidents/helper_text_settings.jpeg" alt="Paramètres de texte d'assistance pour la déclaration d'incident" style="width:80%;">}}

Les paramètres de texte d'assistance pour la déclaration d'incident vous permettent de modifier le texte qui accompagne les descriptions des niveaux de gravité et de statut dans la [fenêtre de création d'incident][3]. Ce texte prend en charge le format Markdown, ce qui vous permet d'ajouter des listes indentées, de mettre en forme le texte et d'ajouter des liens vers d'autres ressources pertinentes pour les intervenants.

{{< img src="service_management/incidents/incident_settings/private_incidents_delete_incidents.png" alt="Paramètres d'activation et de suppression d'incidents" style="width:80%;" >}}

Vous pouvez autoriser les utilisateurs de votre organisation à rendre un incident privé ou à supprimer un incident. Les incidents privés permettent de limiter l'accès à des informations sensibles. Ainsi, seuls les intervenants d'un incident privé peuvent consulter ses détails. Les règles de notification créées précédemment n'envoient aucune alerte pour un incident privé. La fonctionnalité de suppression d'incident permet de supprimer des incidents directement depuis l'interface Datadog, y compris depuis les analyses. Par défaut, cette fonctionnalité est désactivée.

### Champs de propriété

{{< img src="service_management/incidents/property_field_settings.jpeg" alt="Paramètres de champ de propriété" style="width:80%;">}}

Les champs de propriété sont des éléments clés de métadonnées que vous pouvez ajouter à vos incidents. Ils permettent de rechercher plus facilement des sous-ensembles d'incidents spécifiques sur la [page d'accueil][4] et d'améliorer l'efficacité de vos requêtes pour [l'analyse de la gestion des incidents][2]. Cinq champs de propriété sont proposés par défaut :

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`
5. `Summary`

Si vous avez configuré la solution [APM Datadog][5], le champ de propriété `Services` utilise automatiquement vos noms de service APM. Pour modifier les valeurs de `Services`, importez un fichier CSV composé des valeurs à associer à chaque champ. Vous devez indiquer le nom de votre champ dans la première ligne du fichier, puis les valeurs de votre choix dans la ligne suivante.

Le champ de propriété `Teams` récupère automatiquement les noms des [équipes][6] définies au sein de votre organisation.

Vous pouvez ajouter d'autres champs de propriété dans vos paramètres en sélectionnant l'un de vos [tags de métrique][7] au format `key:value`. La clé de votre champ de propriété correspond au nom de la clé du tag de métrique (chaque mot est écrit en majuscules et est séparé par une espace). Les valeurs de votre champ de propriété correspondent aux valeurs transmises par le tag de métrique.

Les champs de propriété sont organisés au sein de trois tableaux, en fonction de leur emplacement dans la [section Overview][8] de la page Incident Details :

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Vous pouvez déplacer des champs de propriété d'un tableau à un autre. Pour modifier l'ordre des champs dans un tableau, faites glisser un champ et déposez-le à l'aide de la poignée de glissement. Cliquez sur le bouton **Preview** situé en haut à droite pour afficher un aperçu de vos champs de propriété.

#### Champs de propriété requis et personnalisés

En plus des cinq champs par défaut et des champs basés sur les tags de métrique, vous pouvez également créer des champs de propriété personnalisés et faire en sorte qu'ils soient requis lors de la création d'un incident. Vous pouvez créer quatre types de champs personnalisés :

1. *Single-Select* : ce champ affiche une liste déroulante permettant à l'utilisateur de choisir une seule valeur à la fois par incident. Les valeurs peuvent être prédéfinies en les saisissant depuis l'interface ou importées à l'aide d'un fichier CSV.
2. *Multi-Select* : ce champ affiche une liste déroulante permettant à l'utilisateur de choisir plusieurs valeurs à la fois par incident. Les valeurs peuvent être prédéfinies en les saisissant depuis l'interface ou importées à l'aide d'un fichier CSV.
3. *Text Area* : ce champ affiche une zone de texte libre. L'intervenant saisit une valeur en fonction de l'incident.
4. *Number* : ce champ affiche une zone de texte qui accepte uniquement des chiffres et un point pour délimiter les décimales. L'intervenant saisit une valeur en fonction de l'incident.

Pour simplifier le filtrage des incidents, les champs personnalisés de type *Single-Select*, *Multi-Select* et *Number* constituent des facettes recherchables depuis la [page d'accueil des incidents][4] et la [page Incident Management Analytics][2]. Les champs de type *Number* peuvent être utilisés comme des mesures sur la page Incident Management Analytics et être représentés dans des [dashboards][9] et des [notebooks][10].

### Types d'intervenants

<div class="alert alert-warning">
Cette fonctionnalité est disponible en version bêta.
</div>

{{< img src="service_management/incidents/responder_types_settings.png" alt="La section des paramètres relative à la création de types d'intervenants personnalisés" style="width:80%;">}}

Les paramètres relatifs aux types d'intervenants vous permettent de créer des rôles personnalisés afin de les [attribuer aux intervenants de vos incidents][11]. Vous pouvez également spécifier si un rôle personnalisé doit être attribué à une seule personne ou à plusieurs pour chaque incident. Ces rôles diffèrent complètement des rôles du système [RBAC][12]. Les types permettent aux intervenants d'identifier clairement leurs responsabilités vis-à-vis d'un incident, en fonction du processus de réponse mis en place. Par défaut, il existe deux rôles différents :

1. `Incident Commander` : la personne responsable de diriger l'équipe d'intervention
2. `Responder` : une personne qui contribue activement à l'analyse d'un incident et à la résolution du problème sous-jacent

**Remarque** : le type d'intervenant `Incident Commander` est affiché dans les paramètres des incidents afin que vous puissiez personnaliser sa description. Il est impossible de supprimer ce type d'intervenant, de modifier son nom, ni de modifier son paramètre `One person role`. Le rôle `Responder` est un rôle basique qui est attribué en dernier cours à un intervenant. Il n'est pas affiché dans les paramètres des incidents.

Pour créer un type d'intervenant personnalisé, procédez comme suit :

1. Cliquez sur le bouton **+ Add Responder Type** sous le tableau.
2. Attribuez un nom au nouveau type.
3. Choisissez le paramètre `One person role` ou `Multi person role` pour votre nouveau type. L'option `One person role` indique que le rôle ne peut être attribué qu'à une seule par incident, tandis que le rôle `Multi person role` peut être attribué à autant de personnes que vous le souhaitez.
4. Rédigez une description pour le type d'intervenant. Celle-ci s'affiche dans l'interface de sélection d'un rôle.
5. Cliquez sur **Save**.

### Intégrations

Les paramètres d'intégration permettent de modifier davantage la configuration des fonctionnalités d'Incident Management liées à [Slack][13] et à [Microsoft Teams][14]. Pour modifier ces paramètres, accédez à [**Incidents > Settings**, puis sélectionnez **Integrations**][15].

Activez l'option **Automatically create a channel for each new incident** pour bénéficier des fonctionnalités suivantes :
- Création automatique de canaux Slack ou Microsoft Teams pour chaque nouvel incident, avec paramétrage du modèle de nom de ces canaux
- Canal de mise à jour des incidents

Configurez l'un de ces paramètres afin d'utiliser un espace de travail Slack ou Microsoft Teams configuré dans le [carré d'intégration][16] de votre organisation. Le *canal de mise à jour des incidents* envoie un message chaque fois qu'un incident est déclaré ou qu'il change de statut, de gravité ou de responsable.

#### Options liées aux modèles des noms de canaux
<div class="alert alert-info">Datadog vous conseille de limiter la taille de vos préfixes : en effet, Slack applique une limite de 80 caractères pour ses noms de canaux. </div>

Lorsque vous modifiez un modèle de nom de canal, les noms des canaux d'incident existants ne sont pas modifiés. Le nouveau modèle s'applique uniquement aux futurs canaux. Par défaut, les canaux dédiés aux incidents suivent le modèle de nom `incident-{public_id}`. Ajoutez des options de titre supplémentaires pour simplifier leur compréhension :
- Le préfixe `incident` peut être remplacé par n'importe quelle chaîne composée de lettres *en minuscules*, de chiffres et de tirets.
- Cochez la case **Incident ID** pour empêcher la création de canaux avec des noms identiques.
- Cochez la case **Title of Incident** pour autoriser l'application Datadog/Slack à renommer automatiquement un canal si le titre de l'incident en question est modifié.

#### Fonctionnalités Slack

Vous pouvez utiliser les fonctionnalités suivantes avec l'intégration Slack Incident Management. Pour activer ou configurer ces options, accédez à **[Service Management > Incidents > Settings > Integrations][15]**.
- Dupliquez les messages du canal Slack, afin d'importer et de conserver toutes les conservations Slack dans la chronologie d'un incident. **Remarque** : avec cette fonctionnalité, chaque personne publiant des commentaires Slack est considérée comme un utilisateur mensuel actif. Sinon, publiez les messages épinglés dans la chronologie afin de créer un système d'entrées pour toutes les conversations liées à des incidents.
- Vous pouvez également ajouter automatiquement des [membres d'équipe][6] à un canal d'incident Slack lorsqu'une équipe est ajoutée à un incident. Seuls les membres qui ont associé leur compte Slack à leur compte Datadog, en exécutant la commande « /datadog connect » dans Slack, sont ajoutés au canal.
- Archivez automatiquement un canal Slack après une certaine période.

## Section Notifications

### Modèles de message

{{< img src="service_management/incidents/message_templates_settings.jpeg" alt="Paramètres des modèles de message" style="width:80%;">}}

Les modèles de message vous permettent d'utiliser des messages dynamiques et réutilisables dans les [notifications manuelles des incidents][17] ou dans les règles de notification automatisée. Les modèles de message utilisent des template variables, tels que `{{incident.severity}}`, pour injecter de façon dynamique des valeurs pertinentes à partir de l'incident associé à la notification. Les modèles de message prennent en charge le format Markdown. Les notifications d'incident peuvent donc inclure du texte mis en forme, des tableaux, des listes indentées et des hyperliens. Pour pouvoir organiser facilement un grand nombre de modèles de message, vous devez spécifier une catégorie lors de la création d'un modèle.

Pour créer un modèle de message :

1. Cliquez sur le bouton **+ New Message Template**.
2. Donnez un nom au modèle.
3. Attribuez-le à une catégorie nouvelle ou existante.
4. Attribuez un objet au modèle (pour les e-mails).
5. Rédigez le message du modèle.
6. Cliquez sur **Save**.

**Remarque** : les template variables sont prises en charge dans le titre et le corps du message.

### Règles

{{< img src="service_management/incidents/notification_rules_example.jpeg" alt="Exemple de règle de notification" style="width:80%;">}}

Grâce aux règles de notification, vous pouvez définir des situations pour lesquelles vous souhaitez informer automatiquement les parties prenantes en cas d'incident. Ces règles vous permettent d'informer les principaux responsables lorsqu'un incident urgent se produit, de prévenir des systèmes externes chaque fois qu'un nouvel incident est déclaré ou mis à jour, ou d'informer des intervenants particuliers lorsqu'un service ou une équipe spécifique est touché(e) par un incident.

**Exemple** : définissez une règle de notification afin d'envoyer automatiquement une notification aux parties prenantes chaque fois qu'un incident de niveau SEV-1 ou SEV-2 est déclaré pour `service:web-store` ET `application:purchasing` et chaque fois que cet incident change d'état.

Pour configurer une nouvelle règle de notification, procédez comme suit :

1. Cliquez sur **New Rule**.
2. Sous **For incidents matching...**, sélectionnez les paires `key:value` du champ de propriété de l'incident pour lesquelles vous souhaitez envoyer des notifications. Par défaut, ces filtres sont vides, et une règle envoie des notifications pour chaque incident.
3. **Notify** : sélectionnez les destinataires de la notification. Les notifications peuvent être envoyées à n'importe quelle [intégration de notification][18] existante de Datadog. Si vous souhaitez envoyer une notification sur l'appareil mobile d'un destinataire, sélectionnez l'option correspondant à son nom qui inclut **(Mobile Push Notification)**. Pour que cette option soit disponible, le destinataire doit avoir activé les notifications dans l'[application mobile Datadog][19].
4. **With Template** : sélectionnez le modèle de message que la règle de notification doit utiliser.
5. **Renotify on updates to** : sélectionnez les propriétés de l'incident qui déclenchent l'envoi de notifications. Une nouvelle notification est envoyée à chaque changement d'une ou plusieurs des propriétés sélectionnées. **Remarque** : les propriétés qui figurent déjà dans vos filtres (voir l'étape 2) sont automatiquement incluses dans ces règles.
6. Cliquez sur **Save**.

Vous pouvez effectuer les opérations suivantes pour gérer vos règles de notification.

- *Recherche* : filtrez votre liste de règles de notification en fonction des destinataires.
- *Activation/Désactivation* : activez ou désactivez n'importe quelle règle de notification à l'aide du bouton situé sur la droite de la ligne dans la liste des règles.
- *Copie* : passez le curseur sur une règle de notification et cliquez sur le bouton de l'icône **Copy** en regard du bouton d'activation ou de désactivation.
- *Suppression* : passez le curseur sur une règle de notification et cliquez sur le bouton de l'icône **Delete** en regard du bouton d'activation ou de désactivation.

{{< img src="service_management/incidents/notification_rules_list.jpeg" alt="Liste des règles de notification" style="width:80%;">}}

## Section Remediation

### Modèles d'analyse post-mortem

{{< img src="service_management/incidents/postmortem_template_settings.jpeg" alt="Paramètres des modèles d'analyse post-mortem" style="width:80%;">}}

Les modèles d'analyse post-mortem sont des ressources dynamiques et réutilisables. Ils vous permettant de créer un [notebook Datadog][10] qui comporte automatiquement les informations relatives à un incident une fois que ce dernier a été résolu. Les modèles d'analyse post-mortem utilisent des template variables, tels que `{{incident.severity}}`, pour injecter de façon dynamique une valeur pertinente à partir de l'incident pour lequel l'analyse a été créée. Les modèles d'analyse post-mortem prennent en charge le format Markdown. Les notebooks générés peuvent donc inclure du texte mis en forme, des tableaux, des listes indentées et des hyperliens.

Pour créer un modèle d'analyse post-mortem :

1. Cliquez sur le bouton **+ New Postmortem Template**.
2. Donnez un nom au modèle.
3. Rédigez le contenu du modèle (les template variables disponibles sont répertoriées à droite de la zone de texte).
4. (Facultatif) Définissez le modèle comme modèle par défaut.
5. Cliquez sur **Save**.

[1]: https://app.datadoghq.com/incidents/settings
[2]: /fr/service_management/incident_management/analytics
[3]: /fr/service_management/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /fr/tracing/
[6]: /fr/account_management/teams/
[7]: /fr/getting_started/tagging/using_tags/?tab=assignment#metrics
[8]: /fr/service_management/incident_management/incident_details/#overview-section
[9]: /fr/dashboards/
[10]: /fr/notebooks/
[11]: /fr/service_management/incident_management/incident_details/#response-team-section
[12]: /fr/account_management/rbac/?tab=datadogapplication#pagetitle
[13]: /fr/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[14]: /fr/integrations/microsoft_teams/#datadog-incident-management-in-microsoft-teams
[15]: https://app.datadoghq.com/incidents/settings#Integrations
[16]: https://app.datadoghq.com/account/settings#integrations
[17]: /fr/service_management/incident_management/incident_details/#notifications-section
[18]: /fr/monitors/notifications/?tab=is_alert#notify-your-team
[19]: /fr/service_management/mobile/