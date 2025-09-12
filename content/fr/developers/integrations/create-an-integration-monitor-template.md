---
aliases:
- /fr/developers/integrations/create-an-integration-recommended-monitor
description: Découvrez comment créer un monitor pour votre intégration.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentation
  text: Configurer des monitors
title: Créer un modèle de monitor pour l'intégration
---
## Section Overview

Ce guide présente les étapes de création d’un modèle de monitor ainsi que les bonnes pratiques à suivre pendant le processus.

Les [monitors Datadog][1] permettent de suivre les métriques clés afin de surveiller efficacement votre infrastructure et vos intégrations. Datadog fournit un ensemble de monitors prêts à l'emploi pour de nombreuses fonctionnalités et intégrations. Consultez ces monitors dans votre [liste de modèles de monitors][2].

Créez un monitor prêt à l'emploi pour aider les utilisateurs à tirer parti de votre intégration Datadog. Pour créer une intégration Datadog, consultez la section [Créer une intégration][3].

## Créer un monitor
Dans votre sandbox Datadog, créez un monitor.

{{< img src="developers/integrations/new_monitor.png" alt="La liste des modèles de monitors dans Datadog" style="width:100%;" >}}


Suivez les [bonnes pratiques](#bonnes-pratiques-de-configuration) décrites dans ce guide pour configurer correctement votre monitor.

## Importer votre monitor 
Dans votre intégration, sur la plateforme de développement d'intégrations, accédez à l'onglet Content. À partir de là, sélectionnez **import monitor** pour choisir parmi les monitors disponibles. Vous pouvez en inclure jusqu'à 10 avec votre intégration.

{{< img src="developers/integrations/content_tab.png" alt="L'onglet Content dans la plateforme de développement d'intégrations" style="width:100%;" >}}


## Vérifier votre monitor en production

Pour afficher le monitor prêt à l'emploi :
1. Recherchez la règle de détection dans la liste des modèles de monitors et cliquez dessus pour l'ouvrir.
2. Vérifiez que les logos s'affichent correctement.
3. Assurez-vous que le monitor est bien activé.

Recherchez votre monitor dans la [liste de modèles de monitors][2]. Vérifiez que les logos s'affichent correctement sur la page de cette liste.

## Bonnes pratiques de configuration

Outre la définition du monitor, les champs [Title](#title), [Description](#description) et Tags doivent obligatoirement être renseignés. Attribuez le tag « integration:<app_id> ». D'autres tags de monitors sont disponibles [ici][8]. Pour plus d'informations, consultez la documentation sur la [configuration d'un monitor][7].

### Titre

Le titre permet aux utilisateurs de comprendre rapidement le mode de défaillance couvert par l'alerte.
- Utilisez la voix active et commencez par un objet suivi d'un verbe.
- N'utilisez pas de template variables.

| À revoir                                       | Amélioré                                 | Optimal                                        |
| -----------                                          | -----------                            | -----------                                 |
|Un grand nombre de messages non accusés détecté sur {{host.name}}| Un grand nombre de messages non accusés détecté  |Le nombre de messages non accusés est supérieur à la normale|

### Rôle

Ajoutez du contexte sur le mode de défaillance et son impact possible sur le système. L'objectif est de permettre à l'utilisateur de déterminer rapidement s'il est pertinent de créer un monitor à partir de ce modèle.

- Ce champ ne doit pas reprendre le titre à l'identique. 
- Expliquez précisément le problème mentionné dans le titre.
- Justifiez pourquoi ce comportement doit faire l'objet d'une alerte.
- Décrivez les effets potentiels de cette défaillance.

| À revoir                                         | Amélioré                                       | Optimal                                    |
| -----------                                          | -----------                                  | -----------                             |
|Alertez votre équipe si le nombre de messages non accusés est élevé. | Les messages non accusés sont ceux qui ont été remis à un consommateur mais n'ont pas été confirmés comme traités. Ce monitor suit le ratio de ces messages.|Les messages non accusés sont ceux qui ont été remis à un consommateur mais pas confirmés comme traités. Ce monitor suit leur ratio pour anticiper les goulots d'étranglement pouvant entraîner des retards dans le traitement des messages.| 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/fr/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/fr/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/fr/monitors/configuration/
[8]: https://docs.datadoghq.com/fr/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace