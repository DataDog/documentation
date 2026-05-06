---
aliases:
- /fr/graphing/infrastructure/hostmap/
- /fr/infrastructure/containermap/
- /fr/guides/hostmap
further_reading:
- link: https://www.datadoghq.com/blog/datadog-host-map
  tag: GitHub
  text: Une nouvelle carte des hôtes pour une infrastructure moderne
- link: /infrastructure/livecontainers/
  tag: Documentation
  text: Consulter en temps réel tous les conteneurs de votre environnement
- link: /infrastructure/process/
  tag: Documentation
  text: Découvrir ce qui se passe à tous les niveaux de votre système
title: La Hostmap
---
La [carte des hôtes][1] de Datadog visualise vos hôtes, pods, conteneurs et clusters, vous aidant à comprendre et à diagnostiquer votre infrastructure.

{{< img src="infrastructure/hostmap/new-host-map.png" alt="La carte des hôtes montrant les hôtes regroupés par zone de disponibilité et colorés par utilisation du CPU. Les cellules hexagonales vont du vert (faible utilisation) à l'orange-rouge (forte utilisation). Les groupes comprennent une catégorie pour les hôtes sans zone de disponibilité (395 hôtes), eastus (183), eastus-1 (153), ainsi que de nombreuses autres régions." style="width:100%;" >}}

## Utilisation {#usage}

{{< img src="infrastructure/hostmap/query-selector.png" alt="Le menu déroulant du sélecteur de requêtes affiche une liste de requêtes suggérées, telle que « Quelle est l'utilisation du CPU sur mes hôtes ? » et « Combien d'erreurs sont consignées dans mon infrastructure ? », ainsi que les requêtes personnalisées enregistrées. Un bouton Créer et un champ de recherche pour filtrer les vues se trouvent en haut." style="width:60%;" >}}

Utilisez le menu déroulant en haut à gauche pour voir les requêtes suggérées, ou les requêtes personnalisées enregistrées par vous ou quelqu'un d'autre dans votre organisation. Pour écrire une requête personnalisée, cliquez sur {{< ui >}}Create{{< /ui >}}.

{{< img src="infrastructure/hostmap/draft-query.png" alt="L'éditeur de requête brouillon avec deux niveaux. L'objet parent est défini sur Hôte avec Remplir par utilisation du CPU. L'objet enfant est défini sur Pod avec Fill by Readiness." style="width:100%;" >}}

- {{< ui >}}Parent/Child Object{{< /ui >}} : Sélectionnez des ressources ({{< ui >}}Host{{< /ui >}}, {{< ui >}}Pod{{< /ui >}}, {{< ui >}}Container{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}) à afficher. Les objets Parent et Enfant ont des relations hiérarchiques.
- {{< ui >}}Fill by{{< /ui >}} : Par défaut, la couleur de chaque objet représente l'utilisation du CPU, où la couleur varie du vert (0 % utilisé) à l'orange (100 % utilisé). Utilisez le menu déroulant {{< ui >}}Fill by{{< /ui >}} pour colorer vos objets selon divers indicateurs ou signaux, tels que la mémoire ou les journaux d'erreurs.
- {{< ui >}}Size by{{< /ui >}} : Si vous ne spécifiez pas d'objet Enfant, vous pouvez utiliser le sélecteur {{< ui >}}Size by{{< /ui >}} pour dimensionner chaque objet selon un indicateur ou un signal.
  {{< img src="infrastructure/hostmap/size-by.png" alt="L'éditeur de requête de la carte des hôtes avec l'objet Parent défini sur Hôte, Remplir par défini sur utilisation du CPU, et Taille par définie sur journaux d'erreurs. La carte ci-dessous montre 1,61k hôtes sous forme d'hexagones de tailles et de couleurs variées, avec une info-bulle sur un hôte affichant une utilisation moyenne du CPU de 88 %." style="width:85%;" >}}
- {{< ui >}}Group by{{< /ui >}} : Disposez spatialement vos objets en groupes. Vous pouvez utiliser plusieurs regroupements. Par exemple, si vous regroupez par `tags.availability-zone` `tags.instance-type`, vos objets sont d'abord organisés par zone de disponibilité, puis subdivisés par type d'instance.

  {{< img src="infrastructure/hostmap/group-by.png" alt="La carte des hôtes regroupée par les tags.availability-zone et tags.instance-type. Les hôtes sont d'abord organisés en sections de zones de disponibilité telles que us-east-1a et us-east-1b, puis subdivisés par type d'instance, tels que m5a.2xlarge et t2.micro. Les cellules sont colorées en fonction de l'utilisation du CPU, allant du vert à l'orange-rouge." style="width:85%;" >}}
- {{< ui >}}Filter{{< /ui >}} : Limitez la carte des hôtes à un sous-ensemble spécifique de votre infrastructure. Par exemple, vous pouvez filtrer par `production` pour ne voir que vos ressources de production. L'entrée {{< ui >}}Filter{{< /ui >}} prend en charge les opérateurs logiques (`AND`, `NOT`, `OR`) et les caractères génériques (`*`). Par exemple : `(tags.availability-zone:ap* OR tags.availability-zone:eu*) NOT tags.agent_version:5.3*`.

## Cas d'utilisation {#use-cases}

### Résoudre les problèmes de performance des serveurs dégradés {#troubleshoot-degraded-server-performance}

Identifiez si les problèmes de performance proviennent d'hôtes surchargés, de pods non sains, de redémarrages de conteneurs ou de goulets d'étranglement au niveau du cluster. Vérifiez les `kubernetes_state.pod.status:unready` ou `system.cpu.user > 80` et utilisez des vues hiérarchiques pour isoler la cause profonde.

### Identifiez les points chauds de coût {#identify-cost-hotspots}
Identifiez les clusters, nœuds ou charges de travail contribuant de manière disproportionnée aux dépenses cloud en interrogeant des tags comme `tags.kube_node_instance_type`, `tags.cloud_provider` ou des tags d'allocation personnalisés. Combinez cela avec les signaux CPU et mémoire des conteneurs/hôtes pour détecter un provisionnement insuffisant ou excessif.

### Gestion de l'Agent Datadog à l'échelle de la flotte {#fleet-wide-datadog-agent-management}

Trouvez des hôtes ou des conteneurs exécutant des versions obsolètes de l'Agent Datadog à l'aide de requêtes comme `tags.agent_version < 7.50`. Ensuite, regroupez par zone de disponibilité, cluster ou service pour planifier le déploiement.

### Surveillez les déploiements Kubernetes ou les migrations d'infrastructure {#monitor-kubernetes-rollouts-or-infrastructure-migrations}

Visualisez la distribution et la santé des pods, des nœuds et des clusters pendant un déploiement ou une migration. Visualisez vos clusters, imbriqués avec des pods, et observez les changements en temps réel pour détecter les régressions.

### Vérifiez l'étiquetage et l'hygiène des métadonnées {#verify-tagging-and-metadata-hygiene}

Utilisez des opérateurs logiques pour valider si vos hôtes et pods sont correctement étiquetés pour la propriété, l'environnement, la région ou l'allocation des coûts. Par exemple, `tags.env:prod AND NOT (tags.team:*)` pour mettre en évidence les ressources non attribuées ou mal étiquetées.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/
[2]: /fr/integrations/
[3]: /fr/infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /fr/agent/
[7]: /fr/agent/docker/