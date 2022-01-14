---
title: Sécurité de l'Agent
kind: documentation
description: Mesures de sécurité de l'Agent Datadog
aliases:
  - /fr/agent/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Consulter les principales catégories de données envoyées à Datadog
---
<div class="alert alert-info">Cette page est consacrée à la sécurité de Datadog ; si vous recherchez le produit Cloud SIEM product, consultez la section <a href="/security_platform/cloud_siem" target="_blank"></a>.</div>

Cet article fait partie d'une [série d'articles sur la sécurité des données][1].

Les clients peuvent envoyer des données au service de Datadog à l'aide d'un [Agent][2] installé localement ou via notre [API HTTP][3]. Bien qu'il ne soit pas obligatoire d'utiliser l'Agent Datadog, la grande majorité des utilisateurs ont décidé d'en tirer profit sur Datadog. Cet article décrit les principales fonctionnalités en matière de sécurité proposées aux utilisateurs afin de garantir la sécurité de leur environnement.

## Distribution de l'Agent

Les référentiels officiels et/ou packages binaires de l'Agent sont signés. Vérifiez la chaîne de distribution en comparant la signature à l'une des clés publiques suivantes :

- Packages DEB Linux et métadonnées du référentiel :
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][4]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][5]
- Packages RPM Linux et métadonnées du référentiel :
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][6]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][7]
  - [60A389A44A0C32BAE3C03F0B069B56F54172A230][8] (Agent 6 et ultérieur uniquement)
- MSI Windows :
  - Empreinte digitale du certificat DigiCert `21fe8679bdfb16b879a87df228003758b62abf5e`
- PKG macOS :
  - Empreinte digitale du certificat Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

## Sécurité des données

Par défaut, l'Agent Datadog transmet les données à Datadog via une connexion TCP avec chiffrement TLS. Depuis la version 6, vous pouvez configurer l'Agent afin d'exécuter TLS 1.2 lors de la connexion à Datadog. Les clients qui exigent l'utilisation de critères de cryptographie renforcés, par exemple pour répondre aux exigences de la norme PCI, doivent utiliser l'Agent v6 et définir le paramètre `force_tls_12: true` dans le fichier de configuration de l'Agent.

## Mise en réseau et proxy

Datadog est un produit SaaS : les clients doivent établir une connexion sortante depuis leur réseau vers l'Internet public pour envoyer des données de surveillance. Par défaut, le trafic est toujours initié par l'Agent vers Datadog via une connexion TCP avec chiffrement TLS. Les sessions ne sont jamais initiées par Datadog vers l'Agent. Consultez la page [de réseau][9] de l'Agent pour obtenir plus d'informations sur la configuration des pare-feu permettant d'autoriser les domaines et ports Datadog requis. En outre, les clients qui surveillent des hosts sans connexion directe à l'Internet public ou avec un trafic sortant limité doivent envoyer les données de surveillance via un [proxy][10].

## Obfuscation des logs de l'Agent

L'Agent Datadog génère des logs locaux afin de prendre en charge le [dépannage de l'Agent][11], si nécessaire. Par mesure de sécurité, ces logs locaux sont filtrés afin que certains mots-clés et patterns évitent d'indiquer des informations d'identification (p. ex., une clé d'API, un mot de passe, les mots-clés de tokens, etc.). Ils sont ainsi obfusqués avant d'être écrits sur le disque.

## Serveur HTTPS local

L'Agent v6 expose une API HTTPS locale pour faciliter la communication entre un Agent en cours d'exécution et des outils d'Agent (par ex., les commandes `datadog-agent`). Le serveur d'API n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`), et l'authentification est exécutée par un token qui est seulement lisible par l'utilisateur avec lequel l'Agent s'exécute. La communication vers l'API HTTPS est chiffrée pendant l'envoi afin d'éviter les écoutes clandestines sur `localhost`.

## Interface graphique de l'Agent

L'Agent v6 est fourni avec une interface graphique par défaut, qui se lance dans votre navigateur Web configuré par défaut. L'interface graphique n'apparaît que si l'utilisateur qui l'exécute dispose des bonnes autorisations utilisateur. Il doit notamment pouvoir ouvrir le fichier de configuration de l'Agent. L'interface graphique n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`). Enfin, les cookies de l'utilisateur doivent être activés, car l'interface graphique génère et enregistre un token utilisé pour l'authentification de toutes les communications avec le serveur de l'interface graphique, ainsi que pour la protection contre la falsification de requête intersites. L'interface graphique peut également être désactivée, si besoin.

## Analyses de la sécurité de l'Agent

Le programme de gestion de la vulnérabilité de Datadog comprend des évaluations régulières des composants de l'application et de l'infrastructure de prise en charge, et notamment des analyses actives des principaux services de soutien. Les équipes de sécurité Datadog effectuent des analyses mensuelles pour identifier les vulnérabilités de logiciel et de configuration et surveiller les mesures de correction qui en découlent, conformément à la politique de gestion de la vulnérabilité de Datadog.

Plus particulièrement, pour l'Agent de conteneur, Datadog effectue régulièrement des analyses statiques de vulnérabilité à l'aide de [Clair de CoreOS][12] et de [snyk.io][13]. De plus, Datadog tire profit des analyses de sécurité dans le cadre de ses publications de l'Agent de conteneur sur le registre [Docker Trusted Registry][14] et le [catalogue de conteneurs Red Hat][15]. En plus du programme interne de gestion de la vulnérabilité de Datadog, Datadog collabore également avec des fournisseurs de sécurité pour des conteneurs.

Si vous pensez avoir trouvé un bug dans la sécurité de Datadog, contactez-nous à l'adresse [security@datadoghq.com][16]. Nous vous répondrons dans un délai de 24 heures. Vous pouvez télécharger la [clé PGP][17] de Datadog si jamais vous souhaitez chiffrer vos communications. Merci de ne pas communiquer publiquement le problème tant que nous n'avons pas eu occasion de le traiter.

## Exécution en tant qu'utilisateur sans privilèges

Par défaut, l'Agent s'exécute en tant qu'utilisateur `dd-agent` sur Linux et comme compte `ddagentuser` sur [Windows][18]. Veuillez noter que les services `system-probe` et `security-agent` font figurent d'exception : vous devez les exécuter tant que `root` sous Linux ou `LOCAL_SYSTEM` sous Windows.

## Gestion des secrets

Les clients qui ne peuvent pas stocker de secrets en texte brut dans les fichiers de configuration de l'Agent peuvent utiliser le package de [gestion des secrets][19]. Il permet à l'Agent d'appeler un exécutable fourni par l'utilisateur pour gérer la récupération ou le déchiffrement des secrets, qui sont ensuite chargés en mémoire par l'Agent. Les utilisateurs peuvent concevoir leur exécutable en fonction de leur service de gestion de clés, de leur méthode d'authentification et de leur flux d'intégration continu de leur choix.

Pour en savoir plus, consultez la documentation relative à la [gestion des secrets][20].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/
[2]: /fr/agent/
[3]: /fr/api/
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[5]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[7]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[8]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[9]: /fr/agent/faq/network/
[10]: /fr/agent/proxy/
[11]: /fr/agent/troubleshooting/
[12]: https://coreos.com/clair
[13]: https://snyk.io
[14]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[15]: https://access.redhat.com/containers
[16]: mailto:security@datadoghq.com
[17]: https://www.datadoghq.com/8869756E.asc.txt
[18]: /fr/agent/faq/windows-agent-ddagent-user/
[19]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[20]: /fr/agent/guide/secrets-management/