---
description: Surveillez les ordinateurs de bureau et les ordinateurs portables des
  employés pour détecter les problèmes de performance, de connectivité et d'application
  dans toute votre organisation.
further_reading:
- link: https://www.datadoghq.com/blog/auto-detected-endpoint-issues/
  tag: Blog
  text: Détectez et résolvez les problèmes d'endpoint sur l'ensemble de votre parc
    avec Datadog
title: End User Device Monitoring
---
{{< img src="/infrastructure/end_user_device_monitoring/end_user_device_monitoring.png" alt="La page End User Devices affiche quatre appareils sains, des graphiques illustrant les types d'appareils et les systèmes d'exploitation, et un tableau listant les appareils, dont un ordinateur portable signalé pour des plantages système." style="width:100%;" >}}

End User Device Monitoring offre aux équipes informatiques une visibilité sur l'état de santé et les performances des ordinateurs de bureau et d'ordinateurs portables des employés, qu'ils soient physiques ou virtuels. Elle permet d'identifier les problèmes de performance et de connectivité affectant les employés, tout en fournissant une vue unifiée de l'état de santé des dispositifs, du réseau et des applications dans l'ensemble de votre organisation afin de répondre à des questions telles que :
- Pourquoi l'ordinateur portable de cet employé ralentit-il à chaque fois qu'il ouvre une application spécifique ?
- Quels employés sont affectés par un point d'accès Wi-Fi surchargé au bureau ?
- Un appel Zoom, Microsoft Teams ou Google Meet saccadé est-il causé par l'appareil, le réseau ou l'application elle-même ?
- Où, le long du chemin vers une application SaaS, la latence est-elle introduite ?
- Quels appareils subissent un écran bleu de la mort, et à quelle fréquence ?
- Quels logiciels (et quelles versions) sont installés sur l'ensemble du parc, pour la planification de l'inventaire du matériel et des licences ?
- Quels appareils présentent des performances insuffisantes au niveau du processeur, de la mémoire ou du disque, et nécessitent une attention ou un remplacement ?
- Que se passait-il sur un appareil (quels processus, journaux ou événements) juste avant qu'un problème signalé ne survienne ?

## Fonctionnement {#how-it-works}

End User Device Monitoring utilise Datadog Agent pour collecter des données directement à partir des ordinateurs de bureau, des ordinateurs portables et des stations de travail des employés. Datadog Agent recueille des métriques système, des informations réseau et des journaux à partir de chaque appareil et envoie les données à Datadog, où elles peuvent être surveillées et visualisées.

La page [End User Devices][5] fournit des tableaux de bord et des métriques intégrés qui résument l'état de santé et les performances des appareils de votre organisation. Vous pouvez consulter des métriques récapitulatives pour tous les appareils et des métriques détaillées pour chacun d'entre eux, notamment l'utilisation du processeur, de la mémoire et du réseau.

Utilisez [Fleet Automation][6] pour gérer les Datadog Agents installés sur ces appareils, notamment pour vérifier l'état des versions, vérifier la cohérence de la configuration et s'assurer que les intégrations nécessaires sont activées.

## Fonctionnalités clés {#key-capabilities}

| Fonctionnalité                        | Description                                                                                                                                                                                               |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Surveillance des performances des appareils** | Surveillez les métriques de santé globales du système telles que l'utilisation du processeur, de la mémoire, du disque et du réseau pour identifier les appareils peu performants.                                                                             |
| **Performances au démarrage** | Mesurez le temps nécessaire aux appareils pour démarrer et être prêts à l'emploi, et identifiez les appareils dont le démarrage est lent. |
| **Santé de la batterie** | Planifiez les cycles de vie du matériel avec des métriques de batterie telles que la capacité maximale, le nombre de cycles et l'état de charge.                                                                              |
| **Visibilité des processus**            | Utilisez [Live Processes][1] pour surveiller l'utilisation des ressources par processus individuels et identifier les applications affectant les performances des appareils.                                                                         |
| **Collecte de journaux**               | Utilisez [Logs][7] pour collecter et explorer les journaux des appareils et applications des utilisateurs finaux afin de dépanner les plantages, les erreurs et les problèmes de performance.                                                             |
| **Événements** | Examinez les événements de l'appareil sélectionnés manuellement, tels que les blocages et plantages d'applications, les échecs d'installation et les redémarrages inattendus, afin de reconstituer ce qui s'est passé. |
| **Surveillance Wi-Fi**              | Surveillez les métriques Wi-Fi telles que la qualité du signal, le taux de transmission et les transitions de point d'accès avec l'[intégration WiFi/WLAN][2], qui aide à identifier les problèmes de connectivité et les points d'accès surchargés. |
| **Connexions réseau pour les points d'accès** | Visualisez la connexion réseau entre un appareil et le point d'accès auquel il est associé. |
| **Détectez les événements BSOD (Blue Screen of Death) sur les appareils Windows grâce à l'[intégration Windows Crash Detection][3], qui génère des événements Datadog indiquant quand se produisent les plantages du système.**       |                          |
| **Trafic réseau**         | Visualisez le volume de trafic par destination ainsi que la latence et le taux d'erreur.                                                        |
| **Traçage de chemin réseau**         | Utilisez [Network Path][4] pour tracer le trafic réseau depuis un appareil d'utilisateur final jusqu'à sa destination et identifier où les problèmes de latence ou de connectivité se produisent.                                                        |
| **Recensez les applications en cours d'exécution sur l'appareil afin de vérifier les mises à jour de version.**         |                                           |
| **Mappage d'identité**         | Associez les appareils à l'utilisateur final pour l'analyse des modèles et des cohortes.                                          | 

## Workflows en vedette {#featured-workflows}

### Examinez les problèmes de parc dans Command Center {#review-fleet-issues-in-command-center}

Ouvrez [Command Center][5] pour voir les problèmes d'endpoint actifs sur l'ensemble du parc, classés par gravité. Chaque problème inclut les appareils concernés, un résumé de la cause racine provenant de [Bits Investigation][8] et une prochaine étape recommandée. Chaque problème est également un [élément de travail][9], vous permettant ainsi d'assigner un responsable, de définir une priorité et de suivre le problème jusqu'à sa résolution. Lisez [Detect and resolve endpoint issues across your fleet with Datadog][10] pour découvrir ce workflow.

### Ouvrez un point d'accès dans Network Device Monitoring {#open-an-access-point-in-network-device-monitoring}

Depuis un appareil, ouvrez le point d'accès auquel il est connecté dans [Network Device Monitoring][11]. Comparez la connexion de cet appareil avec l'état de santé du point d'accès et les connexions réseau du point d'accès pour déterminer si un problème de connectivité affecte un seul appareil ou tous les appareils associés à ce point d'accès. Les appareils des utilisateurs finaux apparaissent également à côté des périphériques réseau sur la [carte de topologie des appareils][12].

### Tracez les chemins réseau des appareils des utilisateurs vers les applications SaaS {#trace-network-paths-from-user-devices-to-saas-applications}

Lorsque les utilisateurs signalent des performances d'application lentes ou une qualité d'appel vidéo dégradée (par exemple, sur Zoom), le problème peut provenir de l'appareil, d'un point quelconque du chemin réseau ou de l'application elle-même. End User Device Monitoring s'intègre à [Network Path][4] pour tracer l'itinéraire complet depuis l'appareil d'un utilisateur jusqu'à l'application SaaS de destination, vous offrant une visibilité sur les trois couches.

La visualisation du traceroute montre chaque saut le long du chemin, du routeur local et du FAI via l'internet public jusqu'au CDN et aux serveurs de l'application. Chaque saut inclut des données de latence, ce qui vous permet de localiser précisément où un ralentissement est introduit plutôt que de voir uniquement le temps total d'aller-retour.

Avec le traçage de chemin réseau, vous pouvez :

- **Comparer les chemins entre les appareils** : Affichez les traceroutes depuis plusieurs appareils sur le même réseau pour déterminer si un problème affecte un seul utilisateur ou l'ensemble du réseau.
- **Comparer les chemins dans le temps** : Examinez comment le chemin réseau change avant et après un problème signalé pour identifier quand et où la latence a augmenté.


[1]: /fr/infrastructure/process
[2]: /fr/integrations/wlan/
[3]: /fr/integrations/wincrashdetect/
[4]: /fr/network_monitoring/network_path/
[5]: https://app.datadoghq.com/end-user-devices
[6]: /fr/agent/fleet_automation/
[7]: /fr/logs/
[8]: /fr/bits_ai/bits_investigation/
[9]: /fr/incident_response/work_management/view_and_manage/
[10]: https://www.datadoghq.com/blog/auto-detected-endpoint-issues/
[11]: /fr/network_monitoring/devices/
[12]: /fr/network_monitoring/devices/topology/

## Configurez End User Device Monitoring {#set-up-end-user-device-monitoring}

Consultez [Configurez End User Device Monitoring](/infrastructure/end_user_device_monitoring/setup/) pour connaître les plateformes prises en charge et les instructions d'installation spécifiques aux appareils.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}