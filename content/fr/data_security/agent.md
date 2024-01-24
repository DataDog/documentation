---
aliases:
- /fr/agent/security/
description: Mesures de sécurité de l'Agent Datadog
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
kind: documentation
title: Sécurité des données de l'Agent
---

<div class="alert alert-info">Cette page est consacrée à la sécurité des données transmises à Datadog. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

Vous pouvez envoyer des données au service de Datadog à l'aide d'un [Agent][1] installé localement ou via notre [API HTTP][2]. Bien qu'il ne soit pas obligatoire d'utiliser l'Agent Datadog, la grande majorité des utilisateurs Datadog en tire profit. Cet article décrit les principales fonctionnalités en matière de sécurité proposées afin de garantir la sécurité de votre environnement.

## Distribution de l'Agent

Les référentiels et packages binaires officiels de l'Agent sont signés. Vérifiez la chaîne de distribution en comparant la signature à l'une des clés publiques suivantes :

- Packages DEB Linux et métadonnées du référentiel :
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][19]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Packages RPM Linux et métadonnées du référentiel :
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][20]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- PKG macOS :
  - Empreinte digitale du certificat Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

Sous Debian et Ubuntu, le package `datadog-agent` présente une dépendance souple au package `datadog-signing-keys`. Ainsi, APT fait confiance aux clés ci-dessus. Maintenez ce package à jour pour vous assurer que les dernières clés de signature sont présentes sur votre système.

### MSI Windows

Pour valider la signature d'un fichier d'installation de l'Agent Datadog sous Windows, redirigez la sortie de `Get-AuthenticodeSignature` via `FormatList` (`fl`) et vérifiez que :
- le statut est valide ;
- le certificat est signé par `Datadog, Inc` ;
- l'émetteur est `DigiCert`.

Par exemple, pour vérifier un fichier .msi `ddagent-cli-7.49.1.msi`, utilisez la commande suivante :
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la commande génère la sortie `A certificate chain could not be built to a trusted root authority`, vous devez peut-être mettre à jour l'autorité de certification racine DigiCert de la machine.

## Sécurité des données

Par défaut, l'Agent Datadog transmet les données à Datadog via une connexion TCP avec chiffrement TLS. Depuis la version 6, vous pouvez configurer l'Agent afin d'imposer une version TLS minimale lors de la connexion à Datadog. Si vous avez besoin d'appliquer des critères de cryptographie renforcés, par exemple pour répondre aux exigences de la norme PCI, vous devez utiliser l'Agent v6 ou v7 et définir le paramètre `min_tls_version: 'tlsv1.2'`, ou `force_tls_12: true` pour une version de l'Agent antérieure à la v6.39.0 ou v7.39.0, dans le fichier de configuration de l'Agent.

## Mise en réseau et proxy

Datadog est un produit SaaS : vous devez donc établir une connexion sortante depuis votre réseau vers l'Internet public pour envoyer vos données de surveillance. Par défaut, le trafic est toujours initié par l'Agent vers Datadog via une connexion TCP avec chiffrement TLS. Les sessions ne sont jamais initiées par Datadog vers l'Agent. Consultez la page relative au [trafic réseau][7] de l'Agent pour obtenir plus d'informations sur la configuration des pare-feu afin d'autoriser les domaines et ports Datadog requis. En outre, si vous souhaitez surveiller des hosts sans connexion directe à l'Internet public ou avec un trafic sortant limité, songez à envoyer les données de surveillance via un [proxy][8].

## Obfuscation des logs de l'Agent

L'Agent Datadog génère des logs locaux afin de faciliter [son dépannage][9], si nécessaire. Par mesure de sécurité, ces logs locaux sont filtrés afin que certains mots-clés et patterns évitent de contenir des informations d'identification (par exemple., une clé d'API, un mot de passe ou encore les mots-clés de tokens). Ils sont ainsi obfusqués avant d'être écrits sur le disque.

## Serveur HTTPS local

L'Agent v6 et v7 expose une API HTTPS locale pour faciliter les communications entre un Agent en cours d'exécution et ses outils (par exemple, les commandes `datadog-agent`). Le serveur d'API n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`), et l'authentification nécessite un token qui est seulement lisible par l'utilisateur avec lequel l'Agent s'exécute. Les communications vers l'API HTTPS sont chiffrées pendant l'envoi afin d'éviter les écoutes clandestines sur `localhost`.

## Interface graphique de l'Agent

L'Agent v6 et v7 est fourni avec une interface graphique par défaut, qui se lance dans votre navigateur Web configuré par défaut. L'interface graphique n'apparaît que si l'utilisateur qui l'exécute dispose des bonnes autorisations utilisateur. Il doit notamment pouvoir ouvrir le fichier de configuration de l'Agent. L'interface graphique n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`). Enfin, les cookies de l'utilisateur doivent être activés, car l'interface graphique génère et enregistre un token utilisé pour l'authentification de toutes les communications avec le serveur de l'interface graphique, ainsi que pour la protection contre la falsification de requête intersites. L'interface graphique peut également être désactivée, si besoin.

## Analyses de la sécurité de l'Agent

Le programme de gestion de la vulnérabilité de Datadog comprend des évaluations régulières des composants de l'application et de l'infrastructure sous-jacente, et notamment des analyses actives des principaux services de soutien. Les équipes de sécurité Datadog effectuent des analyses mensuelles pour identifier les vulnérabilités de logiciel et de configuration et surveiller les mesures de correction qui en découlent, conformément à la politique de gestion de la vulnérabilité de Datadog.

Plus particulièrement, pour l'Agent de conteneur, Datadog effectue régulièrement des analyses statiques de vulnérabilité à l'aide de [Clair de CoreOS][10] et de [snyk.io][11]. En outre, Datadog tire profit des analyses de sécurité réalisées dans le cadre de ses publications de l'Agent de conteneur sur le registre [Docker Trusted Registry][12] et le [catalogue de conteneurs Red Hat][13]. En plus de son programme interne de gestion de la vulnérabilité, Datadog collabore également avec des fournisseurs de solutions de sécurité pour conteneurs.

Si vous pensez avoir trouvé une faille dans la sécurité de Datadog, contactez-nous à l'adresse [security@datadoghq.com][14]. Nous vous répondrons dans un délai de 24 heures. Vous pouvez télécharger la [clé PGP][15] de Datadog si jamais vous souhaitez chiffrer vos communications. Merci de ne pas communiquer publiquement le problème tant que nous n'avons pas eu occasion de le traiter.

## Exécution en tant qu'utilisateur sans privilèges

Par défaut, l'Agent s'exécute en tant qu'utilisateur `dd-agent` sous Linux et en tant que compte `ddagentuser` sous [Windows][16], sauf pour les exceptions suivantes :

- Le `system-probe` s'exécute en tant que `root` sous Linux et en tant que `LOCAL_SYSTEM` sous Windows.
- Le `process-agent` s'exécute en tant que `LOCAL_SYSTEM` sous Windows.
- Le `security-agent` s'exécute en tant que `root` sous Linux.

## Gestion des secrets

Si vous n'êtes pas en mesure de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, vous pouvez vous servir du package de [gestion des secrets][17]. Il permet à l'Agent d'appeler un exécutable fourni par l'utilisateur pour gérer la récupération ou le déchiffrement des secrets, qui sont ensuite chargés en mémoire par l'Agent. Vous pouvez concevoir votre exécutable en fonction du service de gestion de clés, de la méthode d'authentification et du workflow d'intégration continu de votre choix.

Pour en savoir plus, consultez la section [Gestion des secrets][18].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /fr/agent/faq/network/
[8]: /fr/agent/configuration/proxy/
[9]: /fr/agent/troubleshooting/
[10]: https://coreos.com/clair
[11]: https://snyk.io
[12]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[13]: https://access.redhat.com/containers
[14]: mailto:security@datadoghq.com
[15]: https://www.datadoghq.com/8869756E.asc.txt
[16]: /fr/agent/faq/windows-agent-ddagent-user/
[17]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[18]: /fr/agent/configuration/secrets-management/
[19]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[20]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public