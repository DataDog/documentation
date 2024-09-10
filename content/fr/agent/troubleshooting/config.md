---
title: Gestion de la configuration du runtime de l'Agent
further_reading:
  - link: /agent/troubleshooting/debug_mode/
    tag: Dépannage de l'Agent
    text: Mode debugging de l'Agent
---
Si vous utilisez l'Agent 6.19+/7.19+, vous avez la possibilité de modifier certains paramètres de façon dynamique, sans qu'un redémarrage de l'Agent ne soit nécessaire pour appliquer ces modifications.

**Remarque** : les modifications apportées de façon dynamique ne sont que temporaires. Elles seront perdues au prochain redémarrage de l'Agent.

Utilisez la commande `config list-runtime` pour afficher la liste des paramètres de configuration qui peuvent être modifiés pendant l'exécution de l'Agent. Consultez le tableau ci-dessous pour obtenir la commande complète en fonction de votre plateforme.

| Plateforme   | Commande                                                |
|------------|--------------------------------------------------------|
| Docker     | `docker exec datadog-agent agent config list-runtime`  |
| macOS      | `datadog-agent config list-runtime`                    |
| CentOS     | `sudo datadog-agent config list-runtime`               |
| Debian     | `sudo datadog-agent config list-runtime`               |
| Kubernetes | `kubectl exec <NOM_POD> agent config list-runtime`    |
| Fedora     | `sudo datadog-agent config list-runtime`               |
| Redhat     | `sudo datadog-agent config list-runtime`               |
| Suse       | `sudo datadog-agent config list-runtime`               |
| Source     | `sudo datadog-agent config list-runtime`               |
| Windows    | Consultez la [documentation relative à Windows][1]       |

Le niveau de journalisation fait partie des paramètres qui peuvent être modifiés pendant l'exécution de l'Agent. Cela peut s'avérer particulièrement utile pour effectuer des opérations de debugging dans un environnement conteneurisé, où toute modification de la configuration de l'Agent nécessite de détruire puis de recréer son conteneur. Pour choisir d'enregistrer les logs de debugging de façon dynamique sur un déploiement Kubernetes, utilisez la commande suivante :

```text
kubectl exec <NOM_POD> agent config set log_level debug
```

Vous pouvez obtenir la valeur actuelle d'un paramètre modifiable à la volée en utilisant la commande `config get <PARAMÈTRE>`. Par exemple, pour connaître le niveau de journalisation actuel sur un système Linux, utilisez :

```text
sudo datadog-agent config get log_level
```

La configuration complète du runtime peut également être affichée en utilisant la commande `config`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage/windows/#agent-v6