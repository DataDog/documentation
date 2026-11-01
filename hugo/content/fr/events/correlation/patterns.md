---
aliases:
- /fr/service_management/events/correlation/patterns/
further_reading:
- link: events/correlation/triage_and_notify
  tag: Documentation
  text: Découvrez comment trier et notifier les éléments de travail
title: Corrélation basée sur des modèles
---
## Présentation {#overview}

La corrélation basée sur des modèles vous permet de contrôler la manière dont les événements sont corrélés. Datadog utilise également l'apprentissage automatique pour enrichir automatiquement votre modèle avec des événements Datadog Monitor associés, en utilisant la télémétrie sous-jacente recueillie au sein de Datadog et d'autres heuristiques.

Pour vous aider à démarrer, Datadog suggère automatiquement des [correlations basées sur des modèles][1] en fonction de votre environnement. Cliquez sur l'une des recommandations pour ouvrir la configuration du modèle recommandé. Les champs de configuration sont pré-remplis.

## Créer un modèle {#create-a-pattern}

Pour créer un modèle :
1. Accédez à [Correlation][1].
1. Cliquez sur {{< ui >}}\+ Add a Pattern{{< /ui >}}, en haut du tableau des modèles. Cela ouvre une page de configuration de modèle qui affiche les modèles suggérés prêts à l'emploi sur le côté gauche, et un aperçu de la sortie du modèle sur le côté droit. 
1. Vous pouvez ajuster un modèle suggéré en cliquant sur {{< ui >}}\+ Continue With Pattern{{< /ui >}}. Cela vous dirige vers la page de configuration pré-remplie pour un ajustement supplémentaire. Ou bien, vous pouvez choisir de créer votre propre modèle en cliquant sur {{< ui >}}\+ Personalize From Scratch{{< /ui >}}

Tout d'abord, les événements sont dédoublonnés pour générer une alerte en fonction de la clé d'agrégation d'événements. Ensuite, les alertes sont corrélées à un élément de travail en fonction de la configuration. 
{{< img src="events/correlation/correlation_helper.mp4" alt="Lorsque les événements correspondent aux sources et au filtre définis, ils sont dédoublonnés en alertes. Les alertes sont corrélées en fonction des attributs de regroupement, et leurs événements sont dédoublonnés dans la fenêtre temporelle définie avant que le processus ne se répète dans un nouvel élément de travail. Vous pouvez modifier ces configurations dans les paramètres" video=true >}}
Pour plus d'informations sur la façon d'envoyer des événements avec une clé d'agrégation, consultez [envoyer des événements à Datadog][5]. Les événements sans clé d'agrégation sont dédoublonnés en une seule alerte dans le délai imparti.

### Modèles suggérés {#suggested-patterns}
Les modèles suggérés sont recommandés en fonction de vos tags de service et d'environnement couramment utilisés pour vous aider à démarrer rapidement avec la corrélation d'événements. 

### Configuration {#configuration}
Depuis la [page de configuration de la corrélation][2]
1. Sélectionnez la source d'événement sur laquelle vous souhaitez effectuer le regroupement dans la liste déroulante.
1. Pour exclure des événements de la source définie ci-dessus, ajoutez une requête d'événement dans {{< ui >}}Filter by these events or tags{{< /ui >}} pour les filtrer.
1. Ajoutez des événements associés pour associer des changements ou d'autres événements supplémentaires afin de faciliter l'investigation des éléments de travail. Les événements associés seront ajoutés à un élément de travail mais ne créeront pas de nouveaux éléments de travail.
1. Définissez les tags de regroupement. Les tags de regroupement sont des facettes d'événement. Consultez la section [paramètres avancés](#advanced-settings-optional) ci-dessous si vous ne voyez pas le tag dans la liste déroulante. 
**Remarque** : vous pouvez créer des facettes à la fois sur un attribut d'événement et sur un tag. Pour en savoir plus, consultez la documentation sur les [facettes][4]. 

### Paramètres avancés (facultatif) {#advanced-settings-optional}
1. Cliquez sur {{< ui >}}Show Advanced Settings{{< /ui >}}.
1. Vous pouvez ajouter des tags de regroupement pour corréler les événements et personnaliser le titre de l'élément de travail.
   
   Ajouter des tags de regroupement
   : pour ajouter de nouveaux tags de regroupement, la procédure est identique à l'ajout d'une [nouvelle facette d'événement][3].

   Personnaliser le titre de l'élément de travail
   : pour créer un modèle afin de remplacer le titre de l'élément de travail généré automatiquement. Vous pouvez référencer des variables de modèle de tag en utilisant la syntaxe handlebars, par exemple «{{tag.service}} », pour inclure une liste de valeurs de tag séparées par des virgules.
   
1. Sous {{< ui >}}Correlator Logic{{< /ui >}}, configurez le moment de création d'un élément de travail et la durée de corrélation des alertes et de déduplication des événements :

   {{< img src="events/correlation/pattern/correlator_logic_advanced_settings.png" alt="Onglet Logique de corrélation dans Paramètres avancés affichant les options de nombre minimal d'alertes, durée de corrélation, fermeture automatique, déduplication d'événements et déduplication étendue" style="width:100%;" >}}

   Nombre minimal d'alertes
   : le nombre minimal d'alertes corrélées requis pour créer un élément de travail. Si le minimum est de un, la première alerte corrélée crée l'élément de travail.

   Fenêtre de corrélation
   : la durée maximale pendant laquelle de nouvelles alertes peuvent être ajoutées au même élément de travail. Cette fenêtre commence lorsque la première alerte est corrélée.

   Créer un nouvel élément de travail après la fermeture automatique
   : lorsqu'elle est activée, une alerte correspondante crée un nouvel élément de travail après la fermeture automatique de l'élément de travail précédent.

   Fenêtre de déduplication
   : la durée pendant laquelle des événements supplémentaires provenant d'une alerte déjà présente dans l'élément de travail sont associés à cette alerte. Cette fenêtre commence lorsque la première alerte est corrélée.

   Étendre la fenêtre de déduplication jusqu'à la résolution de toutes les alertes
   : lorsqu'elle est activée, les alertes non résolues déjà présentes dans l'élément de travail peuvent continuer à recevoir des événements après l'expiration de la fenêtre de déduplication, pendant une durée maximale de 30 jours. Ce paramètre n'étend pas la fenêtre de corrélation pour l'ajout de nouvelles alertes.

   Par exemple, considérez un modèle avec un nombre minimal d'alertes de un, une fenêtre de corrélation de 48 heures et une fenêtre de déduplication de 48 heures :
   - L'alerte A est corrélée à 9h00 le lundi. Elle crée un élément de travail et les deux fenêtres commencent.
   - L'alerte B est corrélée à 10h00 le lundi et est ajoutée au même élément de travail. Des événements supplémentaires provenant de l'alerte A ou de l'alerte B pendant la fenêtre de déduplication sont associés à leurs alertes existantes.
   - Les deux fenêtres configurées expirent à 9h00 le mercredi.
   - L'alerte C est corrélée à 10h00 le mercredi. Parce que la fenêtre de corrélation est terminée, elle ne peut pas rejoindre l'élément de travail existant et crée un nouvel élément de travail, indépendamment du paramètre **Créer un nouvel élément de travail après la fermeture automatique**.

   Si **Étendre la fenêtre de déduplication jusqu'à la résolution de toutes les alertes** est activé, les événements de l'alerte A ou de l'alerte B non résolues peuvent continuer à mettre à jour la corrélation existante après 9h00 le mercredi, pendant une durée maximale de 30 jours. L'alerte C ne peut toujours pas rejoindre l'élément de travail existant car il s'agit d'une nouvelle alerte.

   Un élément de travail se ferme automatiquement uniquement lorsque toutes ses alertes sont résolues. Si la déduplication se termine alors que des alertes ne sont pas encore résolues, la corrélation s'arrête et l'élément de travail reste ouvert, sauf s'il est fermé manuellement.

   Un élément de travail peut contenir jusqu'à 500 alertes, et chaque alerte peut conserver jusqu'à 100 événements. Une fois qu'une alerte atteint 100 événements, le corrélateur ignore tous les événements suivants pour cette alerte, y compris son événement de récupération. L'alerte ne peut pas être résolue, donc l'élément de travail reste ouvert, sauf s'il est fermé manuellement.

   Lorsqu'un élément de travail cesse d'être traité avant que ses alertes ne soient résolues, il affiche un {{< ui >}}Ended incomplete{{< /ui >}} badge. Survolez le badge pour voir pourquoi le traitement s'est arrêté.

   L'élément de travail peut afficher plus de 100 événements correspondants car sa liste d'événements récupère les événements correspondants indépendamment. Le nombre d'événements affiché peut différer du nombre d'événements conservés et traités par le corrélateur.


## Prévisualiser la sortie du modèle {#preview-pattern-output}

Prévisualisez les modèles et les éléments de travail possibles que votre configuration créerait potentiellement. Le panneau de prévisualisation affiche 
- le nombre total d'événements ingérés (limité aux 1000 premiers événements).
- le nombre d'alertes qui seraient dédoublonnées à partir des événements.
- le nombre d'éléments de travail qui seraient créés en fonction de la configuration. 

Utilisez ces données pour prévisualiser l'impact de vos corrélations et comprendre le résultat attendu d'un motif.

**Remarques** : le titre par défaut dans l'élément de travail de prévisualisation est la première alerte de la corrélation. Après avoir enregistré un motif, le titre de l'élément de travail de gestion des événements est généré intelligemment. 

## Sélectionnez une destination de gestion du travail {#select-a-work-management-destination}

1. Dans le menu déroulant {{< ui >}}Project{{< /ui >}}, sélectionnez un élément de travail existant vers lequel envoyer vos événements regroupés.
1. (Facultatif) Ajoutez un tag aux éléments de travail résultants.
1. Cliquez sur {{< ui >}}Save and Activate{{< /ui >}} pour activer ce motif et regrouper les événements dans des éléments de travail.

## Mettre à jour le modèle existant {#update-existing-pattern}
Après avoir mis à jour un modèle existant, tous les éléments de travail en cours cesseront d'être traités. Les nouveaux événements correspondant au modèle créeront un nouvel élément de travail. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new 
[3]: /fr/events/explorer/facets/#create-a-facet
[4]: /fr/events/explorer/facets
[5]: /fr/events/ingest/