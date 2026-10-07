---
description: Créez des automatisations Bits Code qui exécutent des sessions selon
  un calendrier ou en réponse à des signaux Datadog.
disable_toc: false
further_reading:
- link: /bits_ai/bits_ai_dev_agent/
  tag: Documentation
  text: Bits Code
title: Automatisations
---
## Aperçu {#overview}
Créez une automatisation pour que Bits Code démarre une [session][1] lorsqu'un déclencheur se produit, comme une nouvelle découverte de sécurité de code ou un calendrier récurrent, puis livrez les résultats sous forme de pull request ou de notification Slack.

{{< img src="bits_ai/dev_agent/automations/list.png" alt="Sous un titre 'Automatiser avec Bits', un tableau avec des colonnes comme Nom, Auteur et Dernière Exécution comporte quatre lignes." style="width:100%;" >}}

Avec les automatisations Bits Code, vous pouvez :

- Générer des corrections de code selon un calendrier, sans démarrer chaque session manuellement
- Faire en sorte que Bits Code réponde aux signaux d'autres produits Datadog, tels qu'une nouvelle recommandation APM, un test instable ou une découverte de sécurité de code
- Acheminer les modifications de code résultantes directement vers une pull request ou notifier une équipe sur Slack

## Prérequis {#prerequisites}
Pour configurer une automatisation Bits Code, chacune des conditions suivantes doit être remplie :
- Vous avez la permission **Bits Code Write** (`bits_dev_write`) dans Datadog.
- Vous avez complété la [configuration][2] de Bits Code.
- Si vous prévoyez que vos automatisations [génèrent des notifications Slack](#slack-message-output), vous avez configuré l'[intégration Slack][4].

## Créez une automatisation {#create-an-automation}
Vous pouvez [créer une automatisation personnalisée](#create-a-custom-automation), ou [utiliser un modèle d'automatisation fourni par Datadog](#create-an-automation-from-a-template).

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="Sous un titre 'Automatiser avec Bits', un formulaire avec des champs comme 'Invite personnalisée' et 'Chaque semaine le' est affiché." style="width:100%;" >}}

Par défaut, les automatisations nouvellement créées ont un statut **Actif** et apparaissent dans la liste **Mes Automatisations**.

### Créez une automatisation personnalisée {#create-a-custom-automation}
Pour créer une automatisation Bits Code personnalisée :
1. Dans Datadog, accédez à **Bits AI** > **Bits Code** > [**Automatisations**][3].
1. Cliquez sur **Nouvelle automatisation**.
1. Dans le champ **Nom de l'automatisation**, saisissez un nom descriptif pour l'automatisation.
1. Dans la section **Déclencheur**, configurez un [déclencheur](#triggers).
1. Dans la section **Sortie**, configurez une ou plusieurs [sorties](#outputs).
1. Cliquez sur **Créer une automatisation** ou **Créer et exécuter maintenant**.

### Créez une automatisation à partir d'un modèle {#create-an-automation-from-a-template}
Trouvez des modèles d'automatisation fournis par Datadog dans la section **Modèles d'automatisation**. Cela peut inclure :

- **Créer des PR basées sur les recommandations APM** : Génère des pull requests basées sur les recommandations APM pour un service spécifique.
- **Corriger les erreurs fréquentes pour un dépôt** : Utilise le déclencheur [**Invite personnalisée**](#custom-prompt-trigger) pour demander à Bits Code de scanner les 24 dernières heures de journaux, de trouver l'erreur la plus fréquente et d'ouvrir une pull request avec une correction.

Cliquez sur une tuile de modèle pour accéder au nouveau formulaire d'automatisation. Vous devez configurer une [sortie](#outputs) avant de créer l'automatisation.

## Déclencheurs {#triggers}
Un déclencheur définit quand une automatisation s'exécute et sur quoi Bits Code agit. Un déclencheur est composé de jusqu'à trois composants : 

- [Recherche de produit](#product-finding-trigger) : un signal provenant de Datadog, tel qu'un problème de suivi des erreurs
- [Invite personnalisée](#custom-prompt-trigger) : une instruction libre indiquant à Bits Code quoi faire contre un dépôt choisi
- [Planification](#schedule-trigger) : un intervalle de temps récurrent, tel que quotidien ou à des jours spécifiques de la semaine

Cliquez sur **Ajouter un déclencheur** pour ajouter un composant. Vous pouvez combiner une recherche de produit avec un calendrier, une invite personnalisée avec un calendrier, ou utiliser une recherche de produit seule.

Pour limiter le nombre de sessions de Bits Code que l'automatisation peut créer dans une période donnée (par exemple, `5 runs per Week`), cliquez sur **Ajouter un déclencheur** > **Définir le nombre maximum d'exécutions**. Une exécution d'automatisation peut produire plus d'une session. Utilisez ce paramètre pour contrôler le volume de pull requests ou de notifications qu'une automatisation produit.

### Déclencheur de recherche de produit {#product-finding-trigger}
Un déclencheur de recherche de produit exécute l'automatisation en réponse à de nouveaux problèmes dans un autre produit Datadog (par exemple, Suivi des erreurs ou Sécurité du code). Vous pouvez utiliser un déclencheur de recherche de produit seul, qui exécute l'automatisation chaque fois qu'il y a une nouvelle découverte, ou avec un [calendrier](#schedule-trigger) et une fenêtre de retour que vous définissez (dans le champ **Nouvelles découvertes dans**).

<div class="alert alert-info">Bien qu'il soit courant d'utiliser un déclencheur de recherche de produit seul (pour remédier immédiatement aux nouvelles découvertes), le coupler avec un calendrier et une fenêtre de retour vous permet de surveiller les nouvelles découvertes uniquement pendant certaines périodes. Par exemple, si vous déployez chaque semaine le mercredi, vous voudrez peut-être configurer un déclencheur de recommandations APM pour s'exécuter chaque jeudi, en regardant en arrière sur 24 heures.</div>

Lors de la configuration d'un déclencheur de recherche de produit, vous pouvez configurer des filtres supplémentaires, qui varient selon le produit. Exemple :
  - **Tests instables** prend en charge le filtrage par **Dépôt**, **Branche** (par défaut, la branche par défaut du dépôt), et **Statut**.
  - **Sécurité du code (SAST)** prend en charge le filtrage par **Dépôt**, **Sévérité**, **Règle à remédier**, et un commutateur pour **Filtrer les découvertes identifiées comme des faux positifs par Bits AI**.

<div class="alert alert-warning">Chaque découverte qui déclenche une automatisation est liée à une seule session. Plusieurs découvertes ne peuvent pas être corrigées dans une seule session ou pull request.</div>

### Déclencheur d'invite personnalisée {#custom-prompt-trigger}
Une invite personnalisée indique à Bits Code quoi faire chaque fois que l'automatisation s'exécute, en texte libre, contre un dépôt choisi. Utilisez une invite personnalisée pour des tâches de maintenance récurrentes qui ne sont pas liées à un signal Datadog spécifique, comme la mise à jour des dépendances ou le rafraîchissement de la documentation.

### Déclencheur de calendrier {#schedule-trigger}
Un déclencheur de calendrier contrôle quand une automatisation s'exécute. Il peut être utilisé en combinaison avec [une recherche de produit](#product-finding-trigger) ou [une invite personnalisée](#custom-prompt-trigger). Lors de la définition d'une planification, vous pouvez choisir parmi :
  - **Chaque…** : Choisissez un intervalle prédéfini (par exemple, `Every day at 09:00 am`).
  - **Planification personnalisée** : Choisissez des jours spécifiques de la semaine et une heure de la journée (par exemple, `Mo, We, Fr at 03:00 pm`).

## Sorties {#outputs}
Une sortie définit ce que Bits Code fait après qu'une [session][1] soit terminée. Une automatisation peut avoir une ou plusieurs sorties, y compris [l'ouverture d'une demande de tirage](#pull-request-output) et [la génération d'une notification Slack](#slack-message-output).

### Sortie de pull request {#pull-request-output}
Vous pouvez configurer votre automatisation pour :
- **Créer une pull request** : Ouvrir une pull request avec les modifications proposées
- **Rédiger une pull request** : Ouvrir une pull request brouillon avec les modifications proposées

En tant qu'auteur d'une automatisation Bits Code, vous êtes l'auteur de toutes les pull requests qu'elle génère.

### Sortie de message Slack {#slack-message-output}
Vous pouvez configurer votre automatisation pour envoyer un message Slack résumant la [session][1] et les modifications de code. Si vous utilisez une sortie de pull request en plus d'une sortie Slack, Bits Code inclut un lien vers la pull request dans le message Slack.

Lorsque vous ajoutez une sortie de message Slack, par défaut, Bits Code envoie le message au canal configuré pour le service concerné dans [Catalog][5]. Vous pouvez définir un canal Slack de secours, qui est utilisé lorsqu'aucun canal n'est défini dans Catalog.

## Gérer les automatisations {#manage-automations}
Sur [**Automatisations**][3], consultez les automatisations que vous avez créées dans l'onglet **Mes automatisations**. Passez à **Tous** pour voir les automatisations créées par quiconque dans votre organisation.

Vous pouvez mettre en pause ou reprendre toute automatisation, mais vous ne pouvez modifier ou supprimer que les automatisations que vous avez créées.

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_ai_dev_agent/#sessions
[2]: /fr/bits_ai/bits_ai_dev_agent/setup/
[3]: https://app.datadoghq.com/code/automations
[4]: /fr/integrations/slack/
[5]: /fr/internal_developer_portal/catalog/