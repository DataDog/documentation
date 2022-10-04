---
aliases:
- /fr/monitors/incident_management/notification_rules
description: Configurer et personnaliser l'expérience de gestion des incidents
kind: documentation
title: Paramètres d'incident
---

## Présentation

Les [paramètres d'incident][1] vous permettent de personnaliser l'expérience de gestion des incidents pour l'ensemble de votre organisation. Les paramètres sont répartis en quatre sous-sections. Les principales catégories de paramètres sont General, Notifications et Remediation.

## General

### Information

La sous-section Information des paramètres d'incident sert à définir les niveaux de gravité et les niveaux de statut de votre organisation, mais également à définir le texte d'assistance des incidents.

{{< img src="monitors/incidents/severity_settings.jpeg" alt="Paramètres de niveau de gravité des incidents" style="width:80%;">}}

Utilisez les paramètres de niveau de gravité pour :

1. Définir votre niveau de gravité le plus critique en tant que `SEV-0` ou `SEV-1` (valeur par défaut : `SEV-1`)
2. Personnaliser les sous-étiquettes des niveaux de gravité (**valeurs par défaut** : Critical, High, Moderate, Low, Minor)
3. Personnaliser les descriptions des niveaux de gravité
4. Ajouter ou supprimer des niveaux de gravité à l'aide de l'option en bas de la liste (pas moins de 3 niveaux et pas plus de 10)

**Remarque** : si vous tentez de supprimer un niveau de gravité qui est utilisé dans une règle de notification, vous êtes invité à confirmer votre décision. Si vous choisissez de confirmer la suppression, les règles de notification concernées sont alors désactivées, car elles ne sont plus valides. La suppression d'un niveau de gravité ou la modification d'un premier niveau de gravité n'entraînent pas la mise à jour automatique des requêtes [Incident Management Analytics][2].

{{< img src="monitors/incidents/status_settings.jpeg" alt="Paramètres de niveau de statut des incidents" style="width:80%;">}}

Utilisez les paramètres de niveau de statut pour :

1. Personnaliser les descriptions des statuts
2. Choisir d'activer ou non le statut facultatif `Completed`

**Remarque** : la suppression du statut `Completed` n'entraîne pas la mise à jour automatique des incidents possédant le statut `Completed` ou des requêtes [Incident Management Analytics][2] utilisant ce statut. Les règles de notification utilisant le statut `Completed` sont désactivées, car elles ne sont plus valides.

{{< img src="monitors/incidents/helper_text_settings.jpeg" alt="Paramètres de texte d'assistance pour la déclaration d'incident" style="width:80%;">}}

Les paramètres de texte d'assistance pour la déclaration d'incident vous permettent de modifier le texte qui accompagne les descriptions des niveaux de gravité et de statut dans la [fenêtre de création d'incident][3]. Ce texte prend en charge le format Markdown, ce qui vous permet d'ajouter des listes indentées, de mettre en forme le texte et d'ajouter des liens vers d'autres ressources pertinentes pour les intervenants.

### Champs de propriété

{{< img src="monitors/incidents/property_field_settings.jpeg" alt="Paramètres de champ de propriété" style="width:80%;">}}

Les champs de propriété sont des éléments clés de métadonnées que vous pouvez ajouter à vos incidents. Ils permettent de rechercher plus facilement des sous-ensembles d'incidents spécifiques sur la [page d'accueil][4] et d'améliorer l'efficacité de vos requêtes pour [l'analyse de la gestion des incidents][2]. Cinq champs de propriété sont proposés par défaut :

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`
5. `Summary`

Si vous avez configuré l'[APM Datadog][5], le champ de propriété `Services` utilise automatiquement vos noms de service APM. Pour modifier les valeurs de `Services` ou `Teams`, importez un fichier CSV composé des valeurs à associer à chaque champ. Vous devez indiquer le nom de votre champ dans la première ligne du fichier, puis les valeurs de votre choix dans les lignes suivantes.

Vous pouvez ajouter d'autres champs de propriété dans vos paramètres en sélectionnant l'un de vos [tags de métrique][6] au format `key:value`. La clé de votre champ de propriété correspond au nom de la clé du tag de métrique (chaque mot est écrit en majuscules et est séparé par une espace). Les valeurs de votre champ de propriété correspondent aux valeurs transmises par la métrique de tag.

Les champs de propriété sont organisés au sein de trois tableaux, en fonction de leur emplacement dans la [section Overview][12] de la page Incident Details :

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Vous pouvez déplacer des champs de propriété d'un tableau à un autre. Pour modifier l'ordre des champs dans un tableau, faites glisser un champ et déposez-le à l'aide de la poignée de glissement. Cliquez sur le bouton **Preview** situé en haut à droite pour afficher un aperçu de vos champs de propriété.

#### Champs de propriété requis et personnalisés

<div class="alert alert-warning">
Cette fonctionnalité est disponible en version bêta.
</div>

En plus des cinq champs par défaut et des champs basés sur les tags de métrique, vous pouvez également créer des champs de propriété personnalisés et faire en sorte qu'ils soient requis lors de la création d'un incident. Vous pouvez créer quatre types de champs personnalisés :

1. *Single-Select* : ce champ affiche une liste déroulante permettant à l'utilisateur de choisir une seule valeur à la fois par incident. Les valeurs peuvent être prédéfinies en les saisissant depuis l'interface ou importées à l'aide d'un fichier CSV.
2. *Multi-Select* : ce champ affiche une liste déroulante permettant à l'utilisateur de choisir plusieurs valeurs à la fois par incident. Les valeurs peuvent être prédéfinies en les saisissant depuis l'interface ou importées à l'aide d'un fichier CSV.
3. *Text Area* : ce champ affiche une zone de texte libre. L'intervenant saisit une valeur en fonction de l'incident.
4. *Number* : ce champ affiche une zone de texte qui accepte uniquement des chiffres et un point pour délimiter les décimales. L'intervenant saisit une valeur en fonction de l'incident.

Pour simplifier le filtrage des incidents, les champs personnalisés de type *Single-Select*, *Multi-Select* et *Number* constituent des facettes recherchables depuis la [page d'accueil des incidents][4] et la [page Incident Management Analytics][2]. Les champs de type *Number* peuvent être utilisés comme des mesures sur la page Incident Management Analytics et être représentés dans des [dashboards][13] et des [notebooks][11].

### Intégrations

{{< img src="monitors/incidents/integration_settings.jpeg" alt="Paramètres d'intégration" style="width:80%;">}}

Les paramètres d'intégration vous permettent de configurer des fonctionnalités de gestion des incidents supplémentaires pour l'[application Slack][7] Datadog. Deux paramètres sont configurables :

1. L'activation de la création automatique de canaux Slack pour chaque nouvel incident et le modèle de nom de ces canaux
2. L'activation du canal de mise à jour des incidents

Vous pouvez configurer l'un de ces paramètres pour l'un des espaces de travail que vous avez définis dans le [carré d'intégration Slack][8] de votre organisation.

Par défaut, le nom des canaux dédiés aux incidents inclut `incident-{public_id}`. 

Le préfixe `incident` peut être remplacé par n'importe quelle chaîne composée de lettres *minuscules*, de chiffres et de tirets. Datadog vous conseille d'utiliser un préfixe court, car les noms de canaux Slack ne peuvent pas dépasser 80 caractères. Outre la variable `{public_id}`, vous pouvez également ajouter `{date_created}` et `{title}` dans le modèle de nom des canaux.

**Remarques :**

- Si vous modifiez votre modèle de nom, les canaux d'incidents existants ne sont pas renommés. Le nouveau modèle est uniquement appliqué aux prochains canaux.
- Si vous choisissez de décocher `{public_id}`, il est possible que deux incidents distincts génèrent des canaux au nom identique. Si c'est le cas, l'application Slack Datadog ajoute automatiquement une lettre minuscule ou un chiffre aléatoire à la fin du nom du canal, afin d'éviter que le processus de création du canal échoue.
- Si vous choisissez de cocher `{title}`, l'application Slack Datadog renomme automatiquement un canal si le titre de l'incident en question est modifié.

Le canal de mise à jour des incidents envoie un message chaque fois qu'un incident est déclaré ou qu'il change de statut, de gravité ou de responsable.

## Notifications

### Modèles de message

{{< img src="monitors/incidents/message_templates_settings.jpeg" alt="Paramètres des modèles de message" style="width:80%;">}}

Les modèles de message vous permettent d'utiliser des messages dynamiques et réutilisables dans les [notifications manuelles des incidents][9] ou dans les règles de notification automatisée. Les modèles de message utilisent des template variables, tels que `{{incident.severity}}`, pour injecter de façon dynamique des valeurs pertinentes à partir de l'incident associé à la notification. Les modèles de message prennent en charge le format Markdown. Les notifications d'incident peuvent donc inclure du texte mis en forme, des tableaux, des listes indentées et des hyperliens. Pour pouvoir organiser facilement un grand nombre de modèles de message, vous devez spécifier une catégorie lors de la création d'un modèle.

Pour créer un modèle de message :

1. Cliquez sur le bouton **+ New Message Template**.
2. Donnez un nom au modèle.
3. Attribuez-le à une catégorie nouvelle ou existante.
4. Attribuez un objet au modèle (pour les e-mails).
5. Rédigez le message du modèle.
6. Cliquez sur **Save**.

**Remarque** : les template variables sont prises en charge dans le titre et le corps du message.

### Règles

{{< img src="monitors/incidents/notification_rules_example.jpeg" alt="Exemple de règle de notification" style="width:80%;">}}

Grâce aux règles de notification, vous pouvez définir des situations pour lesquelles vous souhaitez informer automatiquement les parties prenantes en cas d'incident. Ces règles vous permettent d'informer systématiquement les principaux responsables lorsqu'un incident urgent se produit, de prévenir des systèmes externes chaque fois qu'un nouvel incident est déclaré ou mis à jour ou d'informer des intervenants spécifiques lorsqu'un service ou une équipe spécifique est touché(e) par un incident.

**Exemple** : définissez une règle de notification afin d'envoyer automatiquement une notification aux parties prenantes chaque fois qu'un incident de niveau SEV-1 ou SEV-2 est déclaré pour `service:web-store` ET `application:purchasing` et chaque fois que cet incident change d'état.

Pour configurer une nouvelle règle de notification, procédez comme suit :

1. Cliquez sur **New Rule**.
2. Sélectionnez les paires `key:value` du champ de propriété de l'incident pour lesquelles vous souhaitez envoyer des notifications. Par défaut, une règle envoie une notification aux destinataires pour chaque incident.
3. Sélectionnez les destinataires de la notification. Les notifications peuvent être envoyés à n'importe quelle [intégration de notification][10] existante de Datadog. **Remarque** : si vous souhaitez envoyer une notification sur l'appareil mobile d'un destinataire, sélectionnez l'option qui inclut **(Mobile Push Notification)**. Pour que cette option soit disponible, le destinataire doit avoir activé les notifications dans l'[application mobile Datadog][14].
4. Sélectionnez le modèle de message que la règle de notification doit utiliser.
5. Indiquez si vous souhaitez que les destinataires reçoivent une notification lorsqu'un incident change de statut.
6. Cliquez sur **Save**.

**Remarque** : les règles de notification envoient des messages uniquement si le statut d'un incident change (y compris lors de la déclaration initiale de l'incident). Les valeurs du champ de propriété correspondant au filtre des règles sont ajoutées aux messages sous la forme de tags.

Vous pouvez effectuer les opérations suivantes pour gérer vos règles de notification.

- *Recherche* : filtrez votre liste de règles de notification en fonction des destinataires.
- *Activation/Désactivation* : activez ou désactivez n'importe quelle règle de notification à l'aide du bouton situé sur la droite de la ligne dans la liste des règles.
- *Copie* : passez le curseur sur une règle de notification et cliquez sur le bouton de l'icône **Copy** en regard du bouton d'activation ou de désactivation.
- *Suppression* : passez le curseur sur une règle de notification et cliquez sur le bouton de l'icône **Delete** en regard du bouton d'activation ou de désactivation.

{{< img src="monitors/incidents/notification_rules_list.jpeg" alt="Liste de règles de notification" style="width:80%;">}}

## Remediation

### Modèles d'analyse post-mortem

{{< img src="monitors/incidents/postmortem_template_settings.jpeg" alt="Paramètres des modèles d'analyse post-mortem" style="width:80%;">}}

Les modèles d'analyse post-mortem sont des ressources dynamiques et réutilisables. Elles vous permettant de créer un [notebook Datadog][11] qui comporte automatiquement les informations relatives à un incident une fois que ce dernier a été résolu. Les modèles d'analyse post-mortem utilisent des template variables, tels que `{{incident.severity}}`, pour injecter de façon dynamique une valeur pertinente à partir de l'incident pour lequel l'analyse a été créée. Les modèles d'analyse post-mortem prennent en charge le format Markdown. Les notebooks générés peuvent donc inclure du texte mis en forme, des tableaux, des listes indentées et des hyperliens.

Pour créer un modèle d'analyse post-mortem :

1. Cliquez sur le bouton **+ New Postmortem Template**.
2. Donnez un nom au modèle.
3. Rédigez le contenu du modèle (les template variables disponibles sont répertoriées à droite de la zone de texte).
4. (Facultatif) Définissez le modèle comme modèle par défaut.
5. Cliquez sur **Save**.

[1]: https://app.datadoghq.com/incidents/settings
[2]: /fr/monitors/incident_management/analytics
[3]: /fr/monitors/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /fr/tracing/
[6]: /fr/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /fr/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[8]: https://app.datadoghq.com/account/settings#integrations/slack
[9]: /fr/monitors/incident_management/incident_details/#notifications-section
[10]: /fr/monitors/notifications/?tab=is_alert#notify-your-team
[11]: /fr/notebooks/
[12]: /fr/monitors/incident_management/incident_details/#overview-section
[13]: /fr/dashboards/
[14]: /fr/mobile/