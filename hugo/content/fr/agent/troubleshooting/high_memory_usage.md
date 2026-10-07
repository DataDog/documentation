---
disable_toc: false
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Dépannage de l'Agent
  text: Envoyer un flare avec l'Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Dépannage de l'Agent
  text: Obtenir le statut d'un check de l'Agent
title: Utilisation intensive du processeur ou de la mémoire
---

Plusieurs facteurs peuvent entraîner une utilisation intensive du processeur ou de la mémoire de lʼAgent. Si les étapes ci-dessous ne vous permettent toujours pas de régler votre problème, [contactez lʼassistance Datadog pour quʼelle vous vienne en aide](#contacter-l-assistance-datadog).

### Causes courantes dʼune utilisation intensive du processeur ou de la mémoire

- Une intégration renvoie des centaines de métriques ou exécute un grand nombre dʼinstances de checks. Vous pouvez voir un résumé des instances de checks en cours dʼexécution, ainsi que le nombre de métriques collectées, à lʼaide de [la commande CLI `status`][2], puis en consultant la section **Collector**.
- Le runtime Python ou Go de lʼAgent entraîne une utilisation intensive des ressources. Activez [la surveillance des processus en direct][3] pour vérifier si le processus de lʼAgent entraîne une utilisation inhabituellement élevée de la mémoire ou du processeur. Vous pouvez également utiliser le gestionnaire dʼactivité de votre système dʼexploitation pour consulter lʼutilisation des ressources faite par le processus de lʼAgent.
- LʼAgent surveille un grand nombre de processus. Ceci est configuré dans le [fichier de configuration Check de processus][4].
- Le comportement de lʼagent déclenche lʼantivirus ou lʼanti-malware de Windows, ce qui entraîne une utilisation intensive du processeur.
- LʼAgent transmet un très grand nombre de lignes de logs ou de métriques DogStatsD.

### Réglages permettant de réduire lʼutilisation des ressources

Voici quelques réglages de la configuration de votre Agent permettant de réduire lʼutilisation des ressources :

- Pour les intégrations dotées dʼun grand nombre dʼinstances ou qui collectent de nombreuses métriques, ajustez lʼintervalle `min_collection_interval` dans le fichier `conf.yaml` de lʼintégration. Généralement, lʼAgent exécute chaque instance de check toutes les 10 à 15 secondes. Si vous indiquez une valeur de 60 secondes ou plus pour `min_collection_interval`, cela vous permettra de réduire votre utilisation des ressources. Pour en savoir plus sur lʼintervalle de collecte de checks, référez-vous à [la documentation relatives aux checks personnalisés de lʼAgent][5].
- Vérifiez si une intégration est configurée de façon à utiliser Autodiscovery, ou si une intégration utilise un wildcard (`*`) pouvant être filtré plus précisément. Pour en savoir plus sur Autodiscovery, consultez la section [Fonction Autodiscovery de l'Agent][6].

## Contacter l'assistance Datadog

Si aucune de ces solutions ne permet de régler votre problème, [contactez lʼassistance de Datadog][1]. Assurez-vous dʼavoir activé la [surveillance des live processes][3] pour confirmer que le processus de lʼAgent utilise la mémoire et le processeur de façon trop intensive.

Lorsque vous ouvrez un ticket, ajoutez des informations sur ce qui vous permet de confirmer le problème et sur les opérations que vous avez déjà effectuées. En fonction de votre capacité ou non à attribuer le problème à une seule intégration, ajoutez des informations dʼune des sections suivantes.

### Utilisation intensive attribuée à une seule intégration

Si une seule intégration utilise de la mémoire de façon très intensive, envoyez un flare de debugging avec le résultat du profil de mémoire Python :
1. Pour activer le mode debugging, [référez-vous à la documentation dédiée][7].
1. Pour envoyer un profil, ajoutez le flag --profile 30` à la commande de flare :
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   La commande met environ 30 secondes à sʼexécuter pendant quʼelle recueille les informations du profil.

1. Pour le profil de mémoire Python, enregistrez la sortie de cette commande :
   {{< code-block lang="shell">}}sudo -u dd-agent -- datadog-agent check <check name> -m -t 10{{< /code-block >}}

### Utilisation intensive non associée à une seule intégration

Si lʼutilisation intensive de la mémoire nʼest pas associée à une seule intégration, envoyez un flare de debugging avec un profil, recueilli alors que lʼAgent utilisait plus de mémoire ou davantage le processeur quʼhabituellement :
1. Pour activer le mode debugging, [référez-vous à la documentation dédiée][7].
1. Pour envoyer un profil, ajoutez le flag --profile 30` à la commande de flare :
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   La commande met environ 30 secondes à sʼexécuter pendant quʼelle recueille les informations du profil.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/agent/basic_agent_usage/#cli
[3]: /fr/infrastructure/process/
[4]: /fr/integrations/process/#configuration
[5]: /fr/developers/write_agent_check/#collection-interval
[6]: /fr/getting_started/containers/#enable-autodiscovery
[7]: /fr/agent/troubleshooting/debug_mode/