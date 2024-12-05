---
aliases:
- /fr/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
title: Dépannage du Network Device Monitoring
---

## Présentation

Utilisez les informations ci-dessous pour dépanner la fonctionnalité Network Device Monitoring de Datadog. Contactez [l'assistance Datadog][1] si vous avez besoin d'une aide supplémentaire.

## Termes

SNMP (Simple Network Management Protocol)
: Protocole réseau utilisé pour recueillir des informations sur les périphériques réseau physiques.

OID (Object Identifier)
: Identifiant ou adresse unique d'un périphérique qui, lorsqu'il/elle est interrogé(e), renvoie le code de réponse de la valeur correspondante. Par exemple, la charge processeur ou la vitesse du ventilateur du périphérique peut être un OID.

sysOID (System Object Identifier)
: Adresse spécifique qui définit le type de périphérique. Tous les périphériques ont un identifiant unique qui les définit. Par exemple, le sysOID de base de Meraki est `1.3.6.1.4.1.29671`.

MIB (Managed Information Base)
: Base de données ou liste de tous les OID possibles, et leurs définitions, qui sont liés à la MIB. Par exemple, la `IF-MIB` (interface MIB) contient tous les OID correspondant aux informations descriptives sur l'interface d'un périphérique.

## FAQ

#### Quelles sont les versions du protocole SNMP prises en charge par Datadog ?

Datadog prend en charge les trois versions du protocole SNMP : SNMPv1, SNMPv2 et SNMPv3.

#### Quel est le protocole utilisé par Datadog pour découvrir les périphériques ?

Datadog utilise le protocole SNMP pour découvrir les périphériques. Lors de la découverte, le port SNMP (161 par défaut) est interrogé. En cas de réponse et de profil correspondant, un périphérique est considéré comme découvert.

#### Est-ce que Datadog effectue la certification des MIB ? Dois-je vous envoyer tous mes MIB ? Comment convertir mes MIB avec Python ?

L'Agent Datadog fonctionne sans MIB, ce qui signifie que vous n'avez rien à faire concernant vos MIB. Toutes les métriques recueillies avec les profils de périphérique Datadog fonctionnent automatiquement sans MIB.

Pour ajouter des métriques ou une configuration personnalisée, indiquez le nom de la MIB, le nom de la table, l'OID de la table, le symbole et l'OID du symbole. Par exemple :

```yaml
- MIB: EXAMPLE-MIB
    table:
      # Identification de la table de laquelle proviennent les métriques.
      OID: 1.3.6.1.4.1.10
      name: exampleTable
    symbols:
      # Liste des symboles ('columns') à récupérer
      # Même format que pour un OID unique.
      # Chaque ligne de la table envoie ces métriques.
      - OID: 1.3.6.1.4.1.10.1.1
        name: exampleColumn1
```

#### Est-il possible d'utiliser la fonction Network Device Monitoring même si ma paire périphérique-modèle n'est pas prise en charge ?

Datadog recueille des métriques génériques par défaut auprès de chaque périphérique. Si certaines métriques ne sont pas prises en charge par la MIB d'un fournisseur, vous pouvez écrire un profil personnalisé ou envoyer une demande d'ajout de fonctionnalité à [l'assistance Datadog][1].

Si vous envoyez une demande d'ajout de fonctionnalité, l'assistance Datadog aura besoin d'un `snmpwalk` du périphérique concerné. Exécutez ce qui suit et envoyez le résultat :

```
snmpwalk -O bentU -v 2c -c <CHAÎNE_COMMUNITY> <ADRESSE_IP>:<PORT> 1.3.6
```

#### Seule une métrique est recueillie pour mes réseaux, et il s'agit du nombre de périphériques recueillis (zéro). Pourquoi ?

1. Essayez d'assouplir les règles relatives aux ACL et aux pare-feu pour vos périphériques.
2. Exécutez `snmpwalk -O bentU -v 2c -c <CHAÎNE_COMMUNITY> <ADRESSE_IP>:<PORT> 1.3.6` à partir du host sur lequel s'exécute votre Agent. Si le délai d'attente expire sans réponse, quelque chose empêche probablement l'Agent Datadog de recueillir les métriques de votre périphérique.

#### Que faire si Datadog prend en charge un fournisseur ou un type de périphérique, mais pas le modèle spécifique qui m'intéresse ?

- Contactez l'[assistance Datadog][1] pour demander la prise en charge de votre modèle.
- Complétez vos profils de façon à prendre en charge des valeurs `sysobjectid` supplémentaires. 
    Par exemple, si vous souhaitez surveiller un autre type de Cisco CSR, vous pouvez modifier directement le profil ISR pour indiquer un autre `sysobjectid`, comme indiqué ci-dessous :

    ```
        snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
    ```

**Remarque** : si vous ne connaissez pas le `sysobjectid` de votre périphérique, essayez de le trouver en ligne. Sinon, exécutez `snmpwalk` sur un host qui peut communiquer avec votre périphérique, et utilisez la sortie de cette commande pour répertorier le profil pertinent.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/help