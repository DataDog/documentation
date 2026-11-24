---
description: Mettez à niveau à distance les SDK qui alimentent APM, le Profiler et
  Dynamic Instrumentation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
site_support_id: fleet-automation-standard-features
title: Mettre à niveau les SDK
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-upgrade-of-sdk-versions/" btn_hidden="false" header="Rejoignez la Preview !" >}}
Mettez à niveau à distance les SDK qui alimentent APM, le Profiler, Dynamic Instrumentation et plus encore. Demandez l'accès pour participer à la préversion.
{{< /callout >}}

Fleet Automation peut gérer de manière centralisée les mises à niveau à distance des SDK qui alimentent APM, le Continuous Profiler, Dynamic Instrumentation et plus encore. Maintenir à jour les versions des SDK de vos services vous permet de bénéficier des dernières fonctionnalités, des améliorations de performances, des corrections de bogues et des mises à jour de sécurité.

<div class="alert alert-info">
La planification des mises à niveau des SDK n'est pas prise en charge.
</div>

## Prérequis {#prerequisites}

- Les services doivent être instrumentés avec [Single Step Instrumentation (SSI)][1].
- Les services doivent s'exécuter sur des VM Linux ou Windows. La mise à niveau à distance des SDK dans des environnements conteneurisés ou Kubernetes n'est pas prise en charge.

## Mettre à niveau les versions des SDK {#upgrade-sdk-versions}

1. Dans Fleet Automation, ouvrez l'onglet [Upgrades][2] et cliquez sur {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="L'onglet Upgrades avec le bouton Upgrade Now." style="width:100%;" >}}

1. Sélectionnez {{< ui >}}SDK language{{< /ui >}} et {{< ui >}}version{{< /ui >}}. Vous pouvez mettre à jour un SDK de langage à la fois.

   {{< img src="agent/fleet_automation/sdk-upgrade-language.png" alt="Menu déroulant de sélection de la langue et de la version du SDK." style="width:100%;" >}}

1. Sélectionnez les hosts à mettre à niveau. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.

   {{< img src="agent/fleet_automation/sdk-upgrade-hosts.png" alt="Écran de sélection des services avec des options de filtrage pour restreindre la liste des services à mettre à niveau." style="width:100%;" >}}

1. Examinez le plan de déploiement et cliquez sur {{< ui >}}Upgrade Hosts{{< /ui >}} pour lancer la mise à niveau.

   {{< img src="agent/fleet_automation/sdk-upgrade-plan.png" alt="Vue du plan de déploiement affichant la liste des services prêts pour la mise à niveau des SDK." style="width:100%;" >}}

1. Redémarrez les services pour commencer à utiliser les SDK mis à niveau.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: https://app.datadoghq.com/fleet/agent-upgrades