---
app_id: external-dns
categories:
- network
custom_kind: integration
description: Surveillez toutes vos métriques ExternalDNS avec Datadog.
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: ExternalDNS
---
## Section Overview

Recueillez des métriques sur le service ExternalDNS en temps réel pour visualiser et surveiller les métriques recueillies avec le plug-in Prometheus ExternalDNS pour Kubernetes.

Pour plus d'informations sur le DNS externe, voir le [Github repo] (https://github.com/kubernetes-incubator/external-dns).

## Configuration

### Installation

La vérification du DNS externe est incluse dans le paquet [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest), vous n'avez donc pas besoin d'installer quoi que ce soit d'autre sur vos serveurs.

### Configuration

Modifiez le fichier `external_dns.d/conf.yaml`, dans le dossier `conf.d/` à la racine de votre [Agent's configuration directory](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory), pour qu'il pointe vers votre serveur et votre port, et pour que les maîtres soient Monitor. Consultez l'[exemple external_dns.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example) pour connaître toutes les options de configuration disponibles.

#### Utilisation de la découverte de services

Si vous utilisez un pod Agent Datadog pour chaque nœud worker Kubernetes, utilisez les exemples d'annotation ci-dessous sur votre pod external-dns pour récupérer automatiquement les données :

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- Le tag `externaldns-pod` correspond à l'IP du pod DNS cible. Les autres tags sont associés à l'Agent Datadog qui interroge les informations à l'aide de la fonctionnalité Autodiscovery de l'Agent.
- Les annotations Autodiscovery doivent être effectuées sur le pod. Pour réaliser un déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle.

### Validation

[Exécutez la sous-commande `status` de Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) et recherchez `external_dns` dans la section Checks.

## Données collectées

### Métriques

| | |
| --- | --- |
| **external_dns.controller.last_sync** <br>(gauge) | Date de la dernière synchronisation réussie avec le fournisseur de DNS<br>_Affichée en secondes_. |
| **external_dns.registry.endpoints.total** <br>(gauge) | Nombre de points d'extrémité du registre<br>_Consulter la ressource_. |
| **external_dns.registry.errors.total** <br>(jauge) | Nombre d'erreurs de registre<br>_Affichage de l'erreur_. |
| **external_dns.source.endpoints.total** <br>(gauge) | Nombre de points d'aboutissement source<br> _Constitué de resource_ |
| **external_dns.source.errors.total** <br>(gauge) | Nombre d'erreurs source<br> _Affichage de l'erreur_. |

### Événements

Le check ExternalDNS n'inclut aucun événement.

### Checks de service

**external_dns.prometheus.health**

Renvoie `CRITICAL` si le contrôle ne peut pas accéder au point de terminaison des métriques, sinon renvoie `OK`.

Etat : ok, critique

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).