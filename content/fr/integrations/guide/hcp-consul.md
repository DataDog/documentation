---
further_reading:
- link: /integrations/consul/
  tag: Documentation
  text: En savoir plus sur l'intégration Consul

title: Surveillance de HCP Consul avec Datadog
---

## Présentation

Lʼ[intégration Datadog/Consul][1] peut collecter des informations sur votre environnement HCP Consul par l'intermédiaire d'un client Consul. HCP Consul est une version de Consul dans laquelle le plan de contrôle est géré par [HashiCorp Cloud Platform][10].

## Implémentation

Pour commencer à recueillir vos métriques Consul, procédez comme suit :

1. Vérifiez que vous avez configuré HCP Consul conformément aux instructions de la [documentation relative à la présentation de HCP Consul][2] (en anglais).
2. Installez l'Agent Datadog sur votre [client Consul][3].
3. Modifiez le [fichier `consul.d/conf.yaml`][4] dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] et définissez l'option de configuration `url` sur l'URL de votre client Consul.
5. Redémarrez l'[Agent][6].

## Métriques collectées

L'utilisation de l'intégration Datadog/Consul avec HCP Consul permet de recueillir un sous-ensemble de [métriques par défaut][7] de l'intégration Consul. Ces métriques ne portent pas sur la [santé du serveur][8], mais fournissent les éléments suivants :

- Des informations sur les nœuds Consul
- Des coordonnées réseau (latences entre les centres de données et au sein de ces derniers)
- Des métriques de [santé du cluster][9]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/consul/?tab=host
[2]: https://developer.hashicorp.com/consul/tutorials/get-started-hcp
[3]: https://developer.hashicorp.com/hcp/docs/consul/usage/clients
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /fr/integrations/consul/?tab=host#metrics
[8]: https://www.consul.io/docs/agent/telemetry#server-health
[9]: https://www.consul.io/docs/agent/telemetry#cluster-health
[10]: https://developer.hashicorp.com/hcp/docs/consul