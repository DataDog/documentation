---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/service_management/workflows/limits
description: Limites de débit pour Workflow Automation
disable_toc: false
further_reading:
- link: /service_management/workflows/build
  tag: Documentation
  text: Créer des workflows
title: Limites
---

Cette page décrit les limites de débit et les limitations qui s'appliquent à Workflow Automation.

## Limites au niveau du compte

### Comptes payants

Chaque organisation :

* Peut créer jusqu'à 500 workflows par minute.
* Peut exécuter jusqu'à 200 workflows par minute.
* Peut exécuter jusqu'à 50 workflows par minute pour une source (comme un monitor spécifique).
* Peut mettre en mémoire tampon jusqu'à 500 requêtes.

Lorsqu'une organisation dépasse un seuil, les requêtes d'exécution en attente se mettent en file d'attente jusqu'à un maximum de 500 par organisation, puis sont traitées selon les limites décrites précédemment. Par exemple, si un monitor déclenche 500 exécutions de workflow, seules 50 sont déclenchées dans la première minute. Les 450 exécutions de workflow restantes sont mises en file d'attente et 50 workflows sont déclenchés chaque minute jusqu'à ce que tous les workflows aient été déclenchés.

### Comptes d'essai

Chaque organisation :

* Peut créer jusqu'à 20 workflows par minute.
* Peut exécuter jusqu'à 50 workflows par 20 minutes.
* Peut exécuter jusqu'à 20 workflows par minute pour une source (comme un monitor spécifique).
* Peut mettre en mémoire tampon jusqu'à 100 requêtes.

Lorsqu'une organisation dépasse un seuil, les requêtes d'exécution en attente se mettent en file d'attente jusqu'à un maximum de 100 par organisation, puis sont traitées selon les limites décrites précédemment. Par exemple, si un monitor déclenche 100 exécutions de workflow, seules 50 sont déclenchées dans les 20 premières minutes. Les 50 exécutions de workflow restantes sont mises en file d'attente et se déclenchent après 20 minutes.

## Limites au niveau du workflow

* Un workflow peut contenir jusqu'à 150 étapes. Si vous avez besoin de plus de 150 étapes dans un workflow, vous pouvez utiliser l'action **Trigger workflow** pour [appeler un workflow enfant][2]. Utilisez les paramètres de sortie pour transmettre la sortie d'un workflow enfant à votre workflow principal.
* Un workflow peut s'exécuter pendant jusqu'à 7 jours. Les workflows se terminent lorsqu'ils tentent de s'exécuter pendant plus de 7 jours.
* Un workflow peut démarrer jusqu'à 60 étapes par minute. Si vous dépassez ce débit, les étapes sont limitées et démarrent à un débit de 60 par minute.
* La somme de toutes les sorties d'étape pour un workflow peut atteindre jusqu'à 150 Mo.
* La taille de sortie d'un workflow peut atteindre jusqu'à 5 Mo.

## Limites d'action

* L'entrée d'une action peut atteindre jusqu'à 15 Mo.
* La sortie d'une action peut atteindre jusqu'à 5 Mo.
* Le JavaScript fourni par l'utilisateur peut atteindre jusqu'à 10 Ko.
* Chaque organisation peut exécuter jusqu'à 10 000 actions d'envoi d'e-mail par jour. Si vous dépassez cette limite, l'action échoue avec un message d'erreur.
* L'action [for loop][1] peut s'exécuter jusqu'à 2 000 itérations. Si vous avez besoin de plus de 2 000 itérations, vous pouvez partitionner votre entrée en ensembles de 2 000 et les calculer en parallèle.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][9].

[1]: /fr/service_management/workflows/actions/flow_control/#for-loop
[2]: /fr/service_management/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://datadoghq.slack.com/