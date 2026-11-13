---
description: Détectez les problèmes de périphériques réseau et corrélez-les avec les
  changements de configuration dans NDM.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: Documentation
  text: Network Configuration Management
- link: /bits_ai/bits_investigation/
  tag: Documentation
  text: Bits Investigation
- link: /network_monitoring/devices/troubleshooting
  tag: Documentation
  text: Dépannage du NDM
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: Blog
  text: Résolvez les problèmes réseau de la couche 7 à la couche 1 avec Datadog
title: Device Health
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-remediation-with-bits/" btn_hidden="false" header="Device Health est en préversion">}}
{{< /callout >}}

## Présentation {#overview}

[Device Health][1] met en évidence les problèmes de périphériques réseau dans votre infrastructure et vous aide à les corréler avec les changements de configuration Utilisez Device Health pour :

- Identifiez les périphériques dégradés et les métriques affectées dans tout votre parc
- Corrélez les anomalies de métriques avec les changements de configuration sur une chronologie partagée
- Lancez [Bits Investigation][2] pour identifier les causes profondes
- Agissez en annulant les changements de configuration directement depuis le flux d'investigation

Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Devices{{< /ui >}} > {{< ui >}}Health{{< /ui >}}][1] pour une vue à l'échelle du parc de tous les problèmes de périphériques. Pour voir les problèmes actifs d'un périphérique spécifique, sélectionnez-le dans la liste [Devices][3] ou dans n'importe quelle visualisation NDM pour ouvrir les problèmes actifs dans le panneau latéral du périphérique.

## Étudiez un problème {#investigate-an-issue}

Sélectionnez un problème pour ouvrir le panneau des problèmes, qui affiche :

- Un résumé en langage clair de ce qui s'est passé
- Un graphique de la métrique affectée montrant quand le problème a commencé et sa gravité
- Une superposition chronologique montrant quand les changements de configuration ont eu lieu sur le périphérique, afin que vous puissiez corréler les anomalies de métriques avec des changements spécifiques

{{< img src="network_device_monitoring/health/investigate-issue.png" alt="Un problème d'état de santé du périphérique montrant une baisse de l'utilisation de la bande passante sur l'interface ge0/0, avec un résumé de la cause profonde, un graphique de séries temporelles avec des marqueurs de changement de configuration, et un bouton pour approfondir l'investigation avec Bits Investigation." style="width:100%;" >}}

### Lancez Bits Investigation {#launch-a-bits-investigation}

À partir d'un problème sélectionné, vous pouvez déclencher une [Bits Investigation][2]. Bits Investigation analyse le problème et fournit :

- Un résumé étape par étape de l'investigation et de ses conclusions
- Une analyse de la cause première en langage clair

Pour lancer Bits Investigation, cliquez sur {{< ui >}}Investigate further with Bits{{< /ui >}}. Cliquez sur {{< ui >}}View full investigation{{< /ui >}} pour ouvrir l'investigation complète dans un nouvel onglet. Pour plus d'informations, consultez [Bits Investigation][2].

### Appliquer un correctif proposé {#apply-a-proposed-fix}

Agissez directement depuis le panneau des problèmes en appliquant le correctif proposé (comme le rétablissement de la configuration à la dernière version fiable). Consultez un diff de la modification de configuration exacte à appliquer.

{{< img src="network_device_monitoring/health/proposed-fix.png" alt="Un panneau de correctif proposé montrant un rétablissement à une version de configuration précédente, avec un bouton Appliquer le correctif et un diff côte à côte de la configuration actuelle en cours d'exécution et du correctif suggéré." style="width:100%;" >}}

### Afficher les périphériques impactés et les dépendances {#view-impacted-devices-and-dependencies}

Le panneau des problèmes affiche également d'autres périphériques et dépendances potentiellement affectés par le même problème, ce qui vous aide à évaluer l'étendue de l'impact sur votre réseau. Pour enquêter davantage, sélectionnez n'importe quel périphérique dans le diagramme ou dans la liste des périphériques affectés pour ouvrir sa page Device.

{{< img src="network_device_monitoring/health/affected-devices-and-dependencies.png" alt="Une carte des dépendances pour le périphérique ny-edge montrant les périphériques connectés, et une liste de neuf périphériques affectés, tous marqués comme dégradés." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/health
[2]: /fr/bits_ai/bits_investigation/
[3]: https://app.datadoghq.com/devices