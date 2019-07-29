---
title: Utiliser Autodiscovery avec Kubernetes et Docker
kind: documentation
aliases:
  - /fr/guides/servicediscovery/
  - /fr/guides/autodiscovery/
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/autodiscovery/ad_identifiers
    tag: Documentation
    text: Associer un conteneur au modèle d'intégration correspondant
  - link: /agent/autodiscovery/management
    tag: Documentation
    text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
  - link: /agent/autodiscovery/tag
    tag: Documentation
    text: Assigner et recueillir dynamiquement des tags depuis votre application
  - link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
    tag: faq
    text: "Configuration d'intégration pour ECS\_Fargate"
---
## Démarrage rapide

Cette page aborde la fonctionnalité Autodiscovery avec l'Agent version 6 uniquement. [Reportez-vous à la documentation dédiée afin de configurer Autodiscovery avec l'Agent version 5][1].

Cette vidéo de 5 minutes (en anglais) offre une présentation générale de la fonction Autodiscovery avec l'Agent Datadog v6.

{{< wistia mlxx0j6txw >}}

## Fonctionnement

Dans un environnement traditionnel sans conteneur, la configuration de l'Agent Datadog est statique, tout comme l'environnement dans lequel il fonctionne. L'Agent analyse les fichiers de configuration des checks au démarrage, et il exécute continuellement chaque check configuré aussi longtemps qu'il s'exécute.
Les fichiers de configuration sont statiques, et les options réseau configurées dans ces fichiers servent à identifier les instances spécifiques d'un certain service surveillé (p. ex., une instance Redis sur 10.0.0.61:6379). Lorsqu'un check de l'Agent ne parvient pas à se connecter au service en question, les métriques ne sont pas recueillies jusqu'au dépannage du problème. Le check de l'Agent répète ses tentatives de connexion jusqu'à ce qu'un administrateur rétablisse le service surveillé ou répare la configuration du check.

**Une fois la fonctionnalité Autodiscovery activée, l'Agent exécute les checks différemment.**

Le fonctionnement général de la fonction Autodiscovery de l'Agent Datadog est le suivant :

1. **Création et chargement du modèle d'intégration** : lorsque l'Agent démarre avec Autodiscovery activé, il charge les modèles d'intégration ainsi que les [identifiants de conteneur Autodiscovery][3] depuis l'ensemble des [sources disponibles][2]. Les fichiers de configuration statiques ne conviennent pas aux checks qui recueillent des données en provenance d'endpoints réseau qui changent constamment, comme le host ou les ports. Autodiscovery utilise donc des [**Template Variables**][4] pour la configuration du modèle d'intégration. Ces configurations de modèle d'intégration peuvent être chargées dans l'Agent de quatre façons différentes :

  * [Utiliser un fichier de configuration monté dans l'Agent][5]
  * [Utiliser une base de données clé/valeur][6]
  * [Utiliser les annotations Kubernetes][7]
  * [Utiliser les étiquettes Docker][8]

2. **Application d'un modèle d'intégration à un conteneur spécifique** : contrairement à une implémentation classique de l'Agent, l'Agent n'exécute pas tous les checks tout le temps : il détermine les checks à activer en examinant les conteneurs exécutés sur le même host que l'Agent et les modèles d'intégration chargés correspondants. L'Agent recherche alors les événements Kubernetes/Docker (création, destruction, démarrage et arrêt de conteneur) avant d'activer, de désactiver et de régénérer les configurations de check statiques lors de ces événements. Lorsque l'Agent inspecte les conteneurs en cours d'exécution, il vérifie si chaque conteneur correspond à l'un des [identifiants de conteneur Autodiscovery][3] présents dans les modèles d'intégration chargés. À chaque correspondance, l'Agent génère une configuration de check statique en remplaçant les [Template Variables][9] par les valeurs spécifiques du conteneur correspondant. Il active ensuite le check avec la configuration statique.

## Configuration

Si vous exécutez l'Agent en tant que binaire sur un host, activez Autodiscovery en suivant les instructions de l'onglet [Agent Host](?tab=hostagent). Si vous exécutez l'Agent en tant que conteneur, activez Autodiscovery en suivant les instructions de l'onglet [Agent conteneurisé](?tab=containerizedagent).

### Autodiscovery avec Docker

{{< tabs >}}
{{% tab "Agent Host" %}}

Pour activer Autodiscovery sur les conteneurs Docker, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour activer automatiquement Autodiscovery sur les conteneurs Docker, montez `/var/run/docker.sock` dans l'Agent conteneurisé.

{{% /tab %}}
{{< /tabs >}}

### Autodiscovery avec Kubernetes

{{< tabs >}}
{{% tab "Agent Host" %}}

Pour activer Autodiscovery sur les conteneurs dans Kubernetes, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # nécessaire pour prendre en charge les anciens modèles de configuration d'étiquette docker
  - name: docker
    polling: true
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour activer Autodiscovery sur les conteneurs dans Kubernetes, ajoutez la variable d'environnement suivante lors du démarrage de l'Agent conteneurisé :

```
KUBERNETES=true
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : pour les utilisateurs de Kubernetes, une [intégration CRI][10] et une [intégration CRI-O][11] sont disponibles.

### Autodiscovery avec ECS Fargate

{{< tabs >}}
{{% tab "Agent Host" %}}

ECS Fargate ne peut pas être surveillé lorsque l'Agent Datadog est exécuté en tant que binaire sur un host. Consultez les instructions de l'onglet [Agent conteneurisé](?tab=containerizedagent#autodiscovery-avec-ecs-fargate).

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour activer Autodiscovery sur les conteneurs dans ECS Fargate, ajoutez la variable d'environnement suivante lors du démarrage de l'Agent conteneurisé :

```
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/agent-5-autodiscovery
[2]: /fr/agent/autodiscovery/integrations
[3]: /fr/agent/autodiscovery/ad_identifiers
[4]: /fr/agent/autodiscovery/template_variables
[5]: /fr/agent/autodiscovery/integrations/?tab=file#configuration
[6]: /fr/agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[7]: /fr/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[8]: /fr/agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[9]: /fr/agent/autodiscovery/template_variables
[10]: /fr/integrations/cri
[11]: /fr/integrations/crio