---
title: Avis d'abandon des versions de TLS antérieures à la 1.2
---


## Présentation

Transport Layer Security (TLS) est un protocole de sécurité essentiel servant à protéger le trafic Web. Il préserve la confidentialité et l'intégrité des données pendant leur transfert chaque fois que des clients et serveurs échangent des informations. Datadog a abandonné la prise en charge des versions de TLS antérieures à la version 1.2 (SSLv3, TLS v1.0, TLS v1.1) pour les applications Datadog publiques le 30 juin 2022. Si vous utilisez des clients qui ne sont pas pris en charge pour vous connecter à Datadog une fois les anciens protocoles désactivés, vous recevrez des messages d'erreur concernant la connexion.

### Motif de l'abandon

Ces protocoles ne sont plus utilisés afin de veiller à ce que les clients se connectent à Datadog via des canaux de connexion sécurisés. Cette opération respecte les consignes de l'Internet Engineering Task Force (IETF), qui a choisi de ne plus utiliser ces protocoles depuis le 25 mars 2021 ([https://datatracker.ietf.org/doc/rfc8996/][1]).

## Compatibilité des clients

Suivez les instructions de l'[API How's my SSL?][2] pour vérifier la compatibilité du client de votre choix.

## Prise en charge des navigateurs

Les navigateurs modernes prennent en charge la version 1.2 de TLS depuis longtemps. Référez-vous au [tableau de compatibilité][3] du site Can I Use pour vérifier si votre navigateur et la version que vous utilisez sont toujours compatibles.
## Prise en charge de l'Agent

### Agent v6 et v7

Toutes les versions de l'Agent v6 et v7 prennent en charge la version 1.2 de TLS.

### Agent v5

#### Agent v5 packagé ou conteneurisé

Toutes les versions de l'Agent v5 installées avec les éléments suivants prennent en charge la version 1.2 de TLS :

* Les packages DEB/RPM
* Le programme d'installation MSI Windows
* L'image de conteneur officielle


#### Agent v5 installé depuis les sources

Lorsqu'il est installé avec le [script d'installation source][4], l'Agent v5 repose sur les versions de Python et d'OpenSSL du système : la prise en charge de la version 1.2 de TLS dépend donc de ces versions.

Pour déterminer si la version de Python de votre système prend en charge la version 1.2 de TLS (et donc si l'Agent installé depuis les sources prend en charge la version 1.2 de TLS), exécutez cette commande à partir d'un shell système :

`python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` 

Cette commande renvoie `TLS 1.2` si la version 1.2 de TLS est prise en charge. Si ce n'est pas le cas, une version antérieure de TLS ou un message d'erreur est renvoyé. Si la version 1.2 de TLS n'est pas prise en charge, mettez à niveau la version de Python et d'OpenSSL de votre système ou installez l'Agent v7.

## Prise en charge des langages et des outils
### OpenSSL

OpenSSL est une bibliothèque dédiée à la cryptographie générale et aux communications sécurisées. Elle est utilisée par de nombreux autres outils, notamment Python, Ruby, PHP et cURL. La version 1.2 de TLS est prise en charge depuis la version 1.0.1 d'OpenSSL. Consultez le [changelog OpenSSL][5] pour en savoir plus.

### Python

La prise en charge de la version 1.2 de TLS dépend des versions de Python et d'OpenSSL qui sont installées sur le système :

* Python 3.4+ pour les versions 3.x avec OpenSSL 1.0.1+
* Python 2.7.9+ pour les versions 2.x avec OpenSSL 1.0.1+

Vous pouvez exécuter la commande `python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` à partir d'un shell Python. Si la version 1.2 de TLS n'est pas prise en charge, mettez à niveau Python et OpenSSL sur votre système.

### Golang

Si vous utilisez une version récente de Go (1.13 ou ultérieure), Go prend déjà en charge par défaut la version 1.2 de TLS. Aucune modification n'est donc nécessaire.

Si vous utilisez des versions antérieures de Go, définissez la MinVersion de la configuration de votre client TLS de façon à utiliser explicitement la version 1.2 de TLS :

```
TLSClientConfig: &tls.Config{
        MinVersion: tls.VersionTLS12,
    }
```

### Java

Si votre application repose sur les versions 1.7 ou 1.6 de Java (mise à jour 111 ou ultérieure), vous pouvez définir la propriété système `https.protocols` au lancement de la JVM et ainsi activer des protocoles supplémentaires pour les connexions effectuées avec la classe `HttpsURLConnection`. Par exemple, vous pouvez définir `Dhttps.protocols=TLSv1.2`.

Si votre application repose sur la version 1.6 de Java (avec une mise à jour antérieure à la 111), les versions 1.1 et 1.2 de TLS ne sont pas prises en charge. Par conséquent, vous devez mettre à jour la version de Java de votre application.

### .NET

Si vous utilisez un client .NET intégré, lisez le guide de Microsoft sur la [migration vers la version 1.2 de TLS pour différentes versions du framework .NET][6].

### Powershell

La prise en charge de la version 1.2 de TLS par Powershell dépend de la version de .NET installée sur votre système. Lisez le guide de Microsoft sur les [meilleures pratiques du protocole TLS avec .NET][7] pour déterminer les conditions à respecter.

Pour activer les versions récentes de TLS pour la session en cours, utilisez ce qui suit :

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

Il existe également sur GitHub un [module communautaire Powershell][8] capable de gérer cette opération à votre place.

Pour que cette configuration soit permanente, vous pouvez modifier le registre en prenant soin de suivre les instructions de la documentation Microsoft sur [l'activation de TLS dans Office Online Server][9].

Pour le framework .NET 32  bits (version 4+), utilisez ce qui suit :

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

Pour le framework .NET 64  bits (version 4+), utilisez ce qui suit :

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**Remarque** : vous devez redémarrer le système pour appliquer les modifications.

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://www.howsmyssl.com/s/api.html
[3]: https://caniuse.com/tls1-2
[4]: https://github.com/DataDog/dd-agent/blob/5.32.8/packaging/datadog-agent/source/setup_agent.sh
[5]: https://www.openssl.org/news/changelog.html#openssl-101.
[6]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[7]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[8]: https://github.com/markekraus/BetterTls
[9]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server