---
disable_toc: false
private: true
title: Ports de l'Agent 5
---

Cette page couvre les ports utilisés par l'Agent 5. Pour plus d'informations sur la dernière version de l'Agent, consultez la section [Trafic réseau][1].

<div class="alert alert-danger">
Tout le trafic sortant est envoyé via SSL par TCP ou UDP.
<br><br>
Assurez-vous que l'Agent est uniquement accessible par vos applications ou sources réseau de confiance en utilisant une règle de pare-feu ou une restriction réseau similaire. Un accès non fiable peut permettre à des acteurs malveillants d'effectuer plusieurs actions invasives, notamment, mais sans s'y limiter, l'écriture de traces et de métriques sur votre compte Datadog, ou l'obtention d'informations sur votre configuration et vos services.
</div>

Ouvrez les ports suivants pour profiter de toutes les fonctionnalités de l'**Agent** :

#### Trafic sortant

443/tcp
: Port pour la plupart des données de l'Agent (métriques, APM, Live Processes et conteneurs).

123/udp
: Port pour NTP ([plus de détails sur l'importance de NTP][2]).<br>
Voir [cibles NTP par défaut][3].

#### Trafic entrant

6062/tcp
: Port utilisé pour les endpoints de debugging de l'Agent de processus

6162/tcp
: Port utilisé pour la configuration des paramètres de runtime de l'Agent de processus

8125/udp
: Port utilisé pour DogStatsD, sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur localhost : `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port pour le [récepteur APM][4].

17123/tcp
: Forwarder de l'Agent, utilisé pour mettre en mémoire tampon le trafic en cas de division réseau entre l'Agent et Datadog.

17124/tcp
: Adaptateur graphite optionnel.

[1]: /fr/agent/network
[2]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[3]: /fr/integrations/ntp/#overview
[4]: /fr/tracing/