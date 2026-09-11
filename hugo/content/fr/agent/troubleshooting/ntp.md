---
title: Problèmes liés au protocole NTP
aliases:
  - /fr/agent/faq/network-time-protocol-ntp-offset-issues
---
Si vous rencontrez l'un des problèmes suivants, il se peut que la cause soit liée au décalage NTP par rapport aux hosts qui transmettent des métriques via l'Agent :

* Déclencheurs d'alertes non valides
* Retards de métriques
* Intervalles vides dans les graphiques de métriques

Pour vérifier le décalage NTP par rapport à un host, lancez la [commande status][1] de l'Agent en suivant les instructions pour votre système d'exploitation, et cherchez la section Clocks :

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

Tout décalage significatif peut avoir des conséquences néfastes. Afin d'éviter les problèmes liés au NTP, utilisez le monitor Datadog dédié au décalage NTP pour être alerté lorsque le host se désynchronise du serveur, grâce à [l'intégration NTP][2].
Vous pouvez également accéder au [sommaire des checks][3] de Datadog et consulter le check `ntp.in_sync` pour visualiser la liste des hosts qui rencontrent des problèmes liés au NTP.

**Remarque** : le trafic UDP sortant au niveau du port `123` doit être autorisé pour que l'Agent puisse vérifier que l'heure du serveur local est relativement exacte, d'après les serveurs NTP de Datadog.

## Pour aller plus loin

{{< whatsnext desc="Les instructions relatives à la synchronisation de l'horloge système via NTP varient selon le système d'exploitation utilisé :">}}
    {{< nextlink href="https://support.microsoft.com/fr-fr/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}Configuration d'un serveur de temps de référence dans Windows Server{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}Comment forcer la mise à jour d'une horloge via NTP{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}Synchronisation d'une horloge via NTP{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/agent/guide/agent-commands/#agent-status-and-information
[2]: /fr/integrations/ntp/
[3]: https://app.datadoghq.com/check/summary