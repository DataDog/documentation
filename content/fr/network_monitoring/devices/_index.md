---
algolia:
  tags:
  - Surveillance de périphériques réseau
aliases:
- /fr/network_performance_monitoring/devices/
description: Bénéficiez d'une visibilité optimale sur les périphériques connectés
  à votre réseau, tels que les routeurs, les switchs, les serveurs et les pare-feu.
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centre de connaissances
  text: Présentation de la surveillance SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: Blog
  text: Surveiller Cisco Meraki avec Datadog
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: Blog
  text: Surveiller des datacenters et des périphériques réseau avec Datadog
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: Blog
  text: Présentation de la fonctionnalité Network Device Monitoring
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performance réseau avec des interruptions
    SNMP
title: Network Device Monitoring
---

## Présentation

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

La fonctionnalité Network Device Monitoring vous offre une visibilité optimale sur vos périphériques réseau virtuels et physiques, tels que les routeurs, les switchs, et les pare-feu. Identifiez automatiquement les périphériques connectés à n'importe quel réseau, recueillez instantanément diverses métriques comme la bande passante utilisée ou le nombre d'octets envoyés, et déterminez la disponibilité des périphériques.

## Prise en main

1. Installez l'Agent Datadog (généralement sur un serveur qui n'est pas un appareil surveillé).
2. Configurez l'intégration SNMP en [surveillant des périphériques spécifiques][1] ou en utilisant la fonction [Autodiscovery][2].
3. Commencez à surveiller l'ensemble de votre infrastructure réseau sur la page des [périphériques réseau][3].
4. Visualisez les métriques recueillies sur les dashboards prêts à l'emploi de Datadog :
    - [Vue d'ensemble de tous les périphériques surveillés][4]
    - [Performances sur toutes les interfaces][5]
5. Identifiez les problèmes avant même qu'ils ne se produisent grâce à la surveillance proactive sur n'importe quelle [métrique SNMP][6].

## Périphériques pris en charge

### Profil générique

Le profil générique recueille des métriques pour tous les périphériques non pris en charge par un profil fournisseur. Il s'agit notamment de métriques TCP, UDP, IP et d'interface comme la bande passante utilisée, le nombre d'octets envoyés/reçus, etc.

### SD-WAN

Datadog offre une surveillance SD-WAN (Software-Defined Wide Area Network) pour certains fournisseurs. Le SD-WAN est un type de technologie de réseau qui utilise les principes du réseau défini par logiciel (SDN) pour gérer et optimiser les performances des réseaux étendus (WAN). Cette technologie est principalement utilisée pour interconnecter les bureaux distants et les centres de données à travers différents transports (MPLS, Broadband, 5G, etc.). Le SD-WAN bénéficie de l'équilibrage automatique de la charge et de la détection des défaillances entre ces transports. 

Datadog prend en charge les fournisseurs suivants pour la surveillance de réseau SD-WAN :

- [Meraki SD-WAN][7] (version Bêta publique)
- [Cisco SD-WAN][800] (version Bêta privée)

### Profils fournisseur

Les périphériques suivants sont pris en charge via des profils dédiés. Si un fournisseur/type de périphérique est pris en charge mais que le modèle spécifique ne l'est pas, vous pouvez :
  - personnaliser votre propre profil YAML (consultez la [page des questions/réponses pour le dépannage de NDM][8] pour savoir comment)
  - créer de nouveaux [profils][9] pour commencer à surveiller de nouveaux modèles d'appareils

| Fournisseur | Fichiers de configuration |
| ---  | ----------- |
| 3com | [3com.yaml][10] <br> |
| TP-Link | [tp-link.yaml][11] <br> |
| A10 | [a10.yaml][12] <br> |
| Alcatel-lucent | [alcatel-lucent.yaml][13] <br> |
| Anue | [anue.yaml][14] <br> |
| Apc | [_apc.yaml][15] <br>[apc_ups.yaml][16] <br> |
| [Arista][17] | [arista.yaml][18] <br>[_arista.yaml][19] <br> |
| [Aruba][20] | [aruba-switch.yaml][21] <br>[_aruba-base.yaml][22] <br>[aruba-access-point.yaml][23] <br>[aruba.yaml][24] <br> |
| Audiocodes | [audiocodes-mediant-sbc.yaml][25] <br> |
| Avaya | [avaya.yaml][26] <br> |
| Avocent | [avocent-acs.yaml][27] <br> |
| Avtech | [avtech.yaml][28] <br> |
| [Barracuda][200] | [barracuda.yaml][29]<br> |
| Bluecat | [bluecat-server.yaml][30] <br> |
| Brocade | [brocade.yaml][31] <br> |
| Brother | [brother.yaml][32] <br> |
| [Chatsworth][201] | [chatsworth_pdu.yaml][33] <br> |
| Checkpoint | [checkpoint.yaml][34] <br>[checkpoint-firewall.yaml][35] <br> |
| Chrysalis | [chrysalis.yaml][36] <br> |
| [Cisco][202] </br> [Cisco ACI][203] </br> [Cisco ASA][204] </br> Cisco ASR </br> Cisco Catalyst </br> Cisco ICM </br> [Cisco ISE][205] </br> Cisco ISR </br> Cisco Nexus </br> Cisco SB </br> Cisco UCS  </br> Cisco WLC | [cisco-3850.yaml][37]</br> [cisco-asa.yaml][38]  </br>[cisco-asa-5525.yaml][39]  </br>[cisco-asr.yaml][40]  </br>[cisco-catalyst-wlc.yaml][41]  </br>[cisco-catalyst.yaml][42]  </br>[cisco-csr1000v.yaml][43]  </br>[cisco_icm.yaml][44]  </br>[cisco-ise.yaml][45]  </br>[cisco-isr.yaml][46]  </br>[cisco_isr_4431.yaml][47]  </br>[cisco-nexus.yaml][48]  </br>[cisco-sb.yaml][49]  </br>[cisco-ucs.yaml][50]  </br>[_cisco-metadata.yaml][51]  </br>[_cisco-wlc.yaml][52] </br>[cisco-legacy-wlc.yaml][53]  </br>[cisco_uc_virtual_machine.yaml][54] |
| Citrix | [citrix.yaml][55] <br> |
| Cradlepoint | [cradlepoint.yaml][56] <br> |
| Cyberpower | [cyberpower-pdu.yaml][57] <br> |
| [Dell][206] | [dell-poweredge.yaml][58] <br>[_dell.yaml][59] <br>[idrac.yaml][60] <br>[isilon.yaml][61] <br> |
| Dialogic | [dialogic-media-gateway.yaml][62] <br> |
| Dlink | [dlink.yaml][63] <br> |
| Eaton | [eaton-epdu.yaml][64] <br> |
| Exagrid | [exagrid.yaml][65] <br> |
| Extreme Networks | [extreme-switching.yaml][66] <br> |
| [F5][207] | [f5-big-ip.yaml][67] <br> |
| Fireeye | [fireeye.yaml][68] <br> |
| [Fortinet][208] | [fortinet.yaml][70] <br>[fortinet-fortigate.yaml][71] <br> |
| Gigamon | [gigamon.yaml][72] <br> |
| [HP][209] | [hp-ilo4.yaml][73] <br>[_hp.yaml][74] <br>[hpe-proliant.yaml][75] <br> |
| Huawei | [_huawei.yaml][76] <br> |
| iXsystems | [ixsystems-truenas.yaml][77] <br> |
| IBM | [ibm.yaml][78] <br> |
| Infinera | [infinera-coriant-groove.yaml][79] <br> |
| [Infoblox][213] | [infoblox-ipam.yaml][80] <br> |
| [Juniper Networks][210] | [_juniper.yaml][81] <br>[juniper-ex.yaml][82] <br>[_juniper-junos-generic.yaml][83] <br>[juniper-mx.yaml][84]
| Linksys | [linksys.yaml][87] <br> |
| McAfee | [mcafee-web-gateway.yaml][88] <br> |
| [Meraki][7] | [meraki-cloud-controller.yaml][89] <br>[meraki.yaml][90] <br> |
| Mikrotik | [mikrotik-router.yaml][91] <br> |
| Nasuni | [nasuni-filer.yaml][92] <br> |
| NEC | [nec-univerge.yaml][93] <br> |
| NetApp | [netapp.yaml][94] <br> |
| Netgear | [netgear.yaml][95] <br> |
| Nvidia | [nvidia.yaml][96] <br> |
| Omron | [omron-cj-ethernet-ip.yaml][97] <br> |
| Opengear | [_opengear.yaml][98] <br> |
| [Palo Alto Networks][222] | [palo-alto.yaml][100] <br>[_palo-alto.yaml][101] <br> |
| Peplink | [peplink.yaml][102] <br> |
| [pfSense][212] | [pf-sense.yaml][103] <br> |
| Raritan | [raritan-dominion.yaml][104] <br> |
| Riverbed | [riverbed.yaml][105] <br> |
| Ruckus | [ruckus.yaml][106] <br> |
| Server Iron | [server-iron-switch.yaml][107] <br> |
| Servertech | [servertech.yaml][108] <br> |
| Silverpeak | [silverpeak-edgeconnect.yaml][109] <br> |
| Sinetica | [sinetica-eagle-i.yaml][110] <br> |
| Sophos | [sophos-xgs-firewall.yaml][111] <br> |
| Synology | [synology-disk-station.yaml][112] <br> |
| Tripplite | [tripplite.yaml][113] <br> |
| Ubiquiti | [_ubiquiti.yaml][114] <br> |
| Velocloud | [velocloud-edge.yaml][115] <br> |
| Vertiv | [_vertiv.yaml][116] <br> |
| VMware | [vmware-esx.yaml][117] <br> |
| Watchguard | [watchguard.yaml][118] <br> |
| Western Digital | [western-digital-mycloud-ex2-ultra.yaml][119] <br> |
| Zebra | [zebra-printer.yaml][120] <br> |
| Zyxel | [zyxel-switch.yaml][121] <br> |



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /fr/network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/devices
[4]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[5]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[6]: /fr/monitors/types/metric/
[7]: /fr/integrations/meraki/
[8]: /fr/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[9]: /fr/network_monitoring/devices/profiles/
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml
[17]: https://docs.datadoghq.com/fr/integrations/snmp_arista/
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml
[20]: https://docs.datadoghq.com/fr/integrations/snmp_aruba/
[21]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml
[22]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml
[23]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml
[24]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml
[25]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml
[26]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml
[27]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml
[28]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml
[29]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml
[30]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml
[31]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml
[32]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml
[33]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml
[34]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml 
[35]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml
[36]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml
[37]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml  
[38]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml
[39]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml 
[40]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml
[41]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml
[42]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml
[43]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml
[44]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml
[45]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml
[46]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml
[47]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml
[48]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml
[49]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml
[50]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml 
[51]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml 
[52]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml
[53]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml 
[54]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml
[55]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml
[56]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml
[57]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml
[58]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml 
[59]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml
[60]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml
[61]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml
[62]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml
[63]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml
[64]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml
[65]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml
[66]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml
[67]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml
[68]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml
[70]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml
[71]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml
[72]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml 
[73]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo4.yaml
[74]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml
[75]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml
[76]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_huawei.yaml
[77]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml
[78]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml
[79]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml
[213]:https://docs.datadoghq.com/fr/integrations/rapdev_infoblox/
[80]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml
[81]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper.yaml
[82]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml
[83]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml
[84]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml
[85]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-srx.yaml
[86]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/kyocera-printer.yaml
[87]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml
[88]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml
[89]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml
[90]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml
[91]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml
[92]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml
[93]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml
[94]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml
[95]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml
[96]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml
[97]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml
[98]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml
[100]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml 
[101]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_palo-alto.yaml
[102]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml
[103]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml
[104]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml
[105]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml
[106]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus.yaml
[107]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml
[108]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml
[109]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml
[110]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sinetica-eagle-i.yaml
[111]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml
[112]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml
[113]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite.yaml
[114]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml
[115]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml
[116]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml
[117]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml
[118]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml
[119]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml
[120]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml
[121]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml
[200]: https://docs.datadoghq.com/fr/integrations/crest_data_systems_barracuda_waf/
[201]: https://docs.datadoghq.com/fr/integrations/snmp_chatsworth_products/
[202]: https://docs.datadoghq.com/fr/integrations/snmp_cisco/
[203]: https://docs.datadoghq.com/fr/integrations/cisco_aci/?tab=host
[204]: https://docs.datadoghq.com/fr/integrations/crest_data_systems_cisco_asa/
[205]: https://docs.datadoghq.com/fr/integrations/crest_data_systems_cisco_ise/
[206]: https://docs.datadoghq.com/fr/integrations/snmp_dell/
[207]: https://docs.datadoghq.com/fr/integrations/snmp_f5/
[208]: https://docs.datadoghq.com/fr/integrations/snmp_fortinet/
[209]: https://docs.datadoghq.com/fr/integrations/snmp_hewlett_packard_enterprise/
[210]: https://docs.datadoghq.com/fr/integrations/snmp_juniper/
[211]: https://docs.datadoghq.com/fr/integrations/pan_firewall/
[212]: https://docs.datadoghq.com/fr/integrations/crest_data_systems_pfsense/
[222]: https://docs.datadoghq.com/fr/integrations/pan_firewall/
[800]: https://docs.datadoghq.com/fr/integrations/cisco_sdwan/