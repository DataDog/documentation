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
- link: /actions/workflows/build
  tag: Documentation
  text: Créer des workflows
title: Limites
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation est en préversion sur votre site Datadog sélectionné ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

Cette page décrit les limites de débit et les mécanismes de limitation qui s'appliquent à Workflow Automation.

## Limites au niveau du compte {#account-level-limits}

### Comptes payants {#paid-accounts}

Chaque organisation :

* Peut créer jusqu'à 500 workflows par minute.
* Peut exécuter jusqu'à 200 workflows par minute.
* Peut exécuter jusqu'à 50 workflows par minute pour une source (telle qu'un monitor spécifique).
* Peut mettre en mémoire tampon jusqu'à 500 requêtes.

Lorsqu'une organisation dépasse un seuil, les requêtes d'exécution en attente sont mises en file d'attente jusqu'à un maximum de 500 par organisation, puis traitées selon les limites décrites précédemment. Par exemple, si un monitor déclenche 500 exécutions de workflow, seules 50 sont déclenchées la première minute. Les 450 exécutions de workflow restantes sont mises en file d'attente et 50 exécutions de workflow sont déclenchées chaque minute, jusqu'à ce que toutes soient déclenchées.

### Comptes d'essai {#trial-accounts}

Chaque organisation :

* Peut créer jusqu'à 20 workflows par minute.
* Peut exécuter jusqu'à 50 workflows par 20 minutes.
* Peut exécuter jusqu'à 20 workflows par minute pour une source (telle qu'un monitor spécifique).
* Peut mettre en mémoire tampon jusqu'à 100 requêtes.

Lorsqu'une organisation dépasse un seuil, les requêtes d'exécution en attente sont mises en file d'attente jusqu'à un maximum de 100 par organisation, puis traitées selon les limites décrites précédemment. Par exemple, si un monitor déclenche 100 exécutions de workflow, seules 50 sont déclenchées au cours des 20 premières minutes. Les 50 exécutions de workflow restantes sont mises en file d'attente et se déclenchent après 20 minutes.

## Limites au niveau du workflow {#workflow-level-limits}

* Un workflow peut contenir jusqu'à 150 étapes. Si vous avez besoin de plus de 150 étapes dans un workflow, vous pouvez utiliser l'action {{< ui >}}Trigger workflow{{< /ui >}} pour [appeler un workflow enfant][2]. Utilisez les paramètres de sortie pour renvoyer la sortie d'un workflow enfant vers votre workflow principal.
* Un workflow peut s'exécuter pendant une durée maximale de 7 jours. Les workflows se terminent lorsqu'ils tentent de s'exécuter pendant plus de 7 jours.
* Un workflow peut démarrer jusqu'à 60 étapes par minute. Si vous dépassez ce taux, les étapes sont soumises à une limitation de débit et démarrent à un rythme de 60 par minute.
* La somme de toutes les sorties d'étape pour un workflow peut atteindre 150 Mo.
* La taille de sortie d'un workflow peut atteindre 5 Mo.

## Limites des actions {#action-limits}

* L'entrée d'une action peut atteindre 15 Mo.
* La sortie d'une action peut atteindre 15 Mo.
* Le code JavaScript fourni par l'utilisateur peut atteindre 10 Ko.
* Chaque organisation peut exécuter jusqu'à 10 000 actions d'envoi d'e-mail par jour. Si vous dépassez cette limite, l'action échoue avec un message d'erreur.
* L'action [for loop][1] peut s'exécuter jusqu'à 2000 itérations. Si vous avez besoin de plus de 2000 itérations, vous pouvez partitionner votre entrée en ensembles de 2000 et les calculer en parallèle.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][9].

[1]: /fr/actions/workflows/actions/flow_control/#for-loop
[2]: /fr/actions/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://chat.datadoghq.com/