---
description: Modifications par version pour le binaire BYOC Logs, inclus dans le chart
  Helm datadog/cloudprem.
disable_toc: false
further_reading:
- link: /byoc-logs/operate/updates/
  tag: Documentation
  text: Planifier les mises à jour de BYOC Logs
- link: /byoc-logs/install/
  tag: Documentation
  text: Installer BYOC Logs
- link: /byoc-logs/operate/troubleshooting/
  tag: Documentation
  text: Dépanner BYOC Logs
title: Notes de version de BYOC Logs
---
## Vue d'ensemble {#overview}

Cette page suit les versions du **binaire BYOC (Bring Your Own Cloud) Logs**, distribué sous forme d'image Docker et inclus dans le `datadog/cloudprem` chart Helm. Les nouvelles fonctionnalités et les correctifs sont intégrés dans le binaire ; le chart les regroupe pour le déploiement.

### Vérifiez votre version binaire installée {#check-your-installed-binary-version}

Consultez le champ `image` sur un pod BYOC Logs :

```shell
kubectl get pods -n <BYOC_LOGS_NAMESPACE> \
  -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}' \
  | sort -u
```

Le tag d'image (par exemple, `:v0.1.26`) correspond à la version du binaire. Pour voir quelle version binaire un chart Helm inclut, exécutez :

```shell
helm show chart datadog/cloudprem --version <CHART_VERSION> | grep appVersion
```

### Mise à niveau {#upgrade}

Les mises à niveau binaires sont fournies via le chart Helm. Consultez [Installer BYOC Logs](/byoc-logs/install/) pour la commande de mise à niveau du chart pour votre plateforme.

## Versions {#releases}

### v0.1.33 — 18/08/2026 {#v0133-2026-08-18}

*Inclus dans le chart : `0.5.2`.*
*Validé avec Observability Pipelines Worker : `2.20.x`.*

#### Modifié {#changed}
- Ajoute le clustering de documents pour regrouper les logs similaires et réduire l'empreinte de stockage de 10 % à 20 %. Pour désactiver le clustering de documents, définissez `QW_DISABLE_DOCS_CLUSTERING=true`.
- Ajoute la prise en charge des requêtes group-by d'attributs plats.
- Ajoute des métriques opérationnelles pour l'utilisation des ressources système, la mise hors service, les échecs de PUT S3, l'utilisation du WAL, la capacité du metastore et les résultats des recherches fractionnées.

#### Modifications du chart Helm {#helm-chart-changes}
- **Changement incompatible** : Supprime la taille de pod `medium`. `indexer.podSize` et `searcher.podSize` acceptent `large`, `xlarge`, `2xlarge`, `4xlarge`, `6xlarge` et `8xlarge`.
- Ajuste les demandes et les limites de CPU et de mémoire du pod afin de tenir compte des réservations de nœuds et des modules complémentaires. Cela redimensionne les caches, les files d'attente d'ingestion et les recherches fractionnées simultanées en conséquence.
- Active le clustering de documents par défaut avec `config.docs_clustering`.
- Définit les délais de mise hors service de l'indexeur et du compacteur autonome à 90 % du `terminationGracePeriodSeconds` de chaque charge de travail.
- Ajoute un metastore par défaut `PodDisruptionBudget` et un paramètre DNS global `ndots: 1`.
- Réduit la cible CPU HPA de l'indexeur à 70 % et supprime la fenêtre de stabilisation lors de l'augmentation de l'échelle, afin que les indexeurs puissent être redimensionnés horizontalement sous la charge.

### v0.1.32 — 21/07/2026 {#v0132-2026-07-21}

*Inclus dans le chart : `0.4.6`.*
*Validé avec Observability Pipelines Worker : `2.20.0` (`datadog/observability-pipelines-worker` Helm chart `2.20.0`).*

#### Modifié {#changed-1}
- Ajoute la prise en charge optionnelle des réplicas de lecture du metastore PostgreSQL pour les chemins de lecture de recherche et d'analyse.
- Ajoute un service de compacteur autonome optionnel pour exécuter le travail de fusion en dehors des nœuds d'indexation.
- Réduit le nombre de requêtes DNS inutiles pour S3 en mettant en cache la résolution DNS pour les clients S3.
- Améliore la stabilité du plan de contrôle après les redémarrages d'acteurs et les réponses de surcharge du metastore.

#### Modifications du chart Helm {#helm-chart-changes-1}
- Ajoute les valeurs `metastore_ro` pour déployer un pool de réplicas de metastore en lecture seule afin de mettre à l'échelle les lectures du metastore indépendamment de l'écriture.
- Ajoute `enableStandaloneCompactors` pour exécuter le compactage sur des workers dédiés au lieu des nœuds d'indexation.
- Désactive ingest v1 par défaut avec `QW_DISABLE_INGEST_V1=true` ; remplacez-le par `environment`.
- Achemine les traces du service BYOC vers l'ingestion de télémétrie Datadog lorsque `datadog.byocTelemetry.enabled` est activé.
- Utilise le port dédié `health` pour les sondes de vivacité et de démarrage.

### v0.1.31 — 2026-07-08 {#v0131-2026-07-08}

*Inclus dans le chart : `0.4.5`.*

#### Modifié {#changed-2}
- Corrige les requêtes de préfixe d'expression à jeton unique sur les champs bruts afin que les recherches `match_phrase_prefix` renvoient tous les termes de préfixe correspondants au lieu d'être limitées par `max_expansions`.
- Intersection jusqu'à 3 fois plus rapide pour les requêtes de termes sélectifs avec plage temporelle.

#### Modifications du chart Helm {#helm-chart-changes-2}
- Ajoute les valeurs `indexer.volumeAttributesClass` et `searcher.volumeAttributesClass` pour provisionner les ressources Kubernetes `VolumeAttributesClass` pour les volumes persistants de l'indexeur et du searcher. Utilisez ces valeurs pour ajuster les attributs de volume tels que les IOPS et le débit. Cette fonctionnalité est désactivée par défaut, nécessite Kubernetes 1.31 ou version ultérieure, et nécessite `driverName` lorsqu'elle est activée.
- Corrige l'adresse d'annonce Kubernetes en définissant `KUBERNETES_POD_IP` à partir de l'IP du pod au lieu du nom du pod.
- Désactive `serviceAccount.automountServiceAccountToken` par défaut pour réduire l'exposition des jetons sur les pods qui n'ont pas besoin d'accès à l'API Kubernetes.
- Active `securityContext.readOnlyRootFilesystem` par défaut sur les charges de travail pour un renforcement de la défense en profondeur.

### v0.1.30 — 2026-06-30 {#v0130-2026-06-30}

*Inclus dans le chart : `0.4.3`.*

#### Modifié {#changed-3}
- Réduit le temps CPU de recherche pour les requêtes d'histogramme de date imbriquées jusqu'à 20 %, avec les gains les plus importants sur les fenêtres de sept jours.
- Ajoute un écouteur de vérification de l'état dédié sur le port `7284` pour les sondes de vivacité et de readiness des composants CloudPrem.

#### Modifications du chart Helm {#helm-chart-changes-3}
- Ajoute des valeurs globales `volumes` et `volumeMounts` qui s'appliquent à tous les composants CloudPrem et fusionnent avec les `extraVolumes` et `extraVolumeMounts` existants par composant.
- Ajoute un support global `topologySpreadConstraints`, fusionné avec les contraintes par composant, pour répartir les pods de charge de travail CloudPrem sur les domaines de topologie.
- Met à jour les services CloudPrem et les vérifications de l'état de l'entrée interne AWS ALB pour utiliser le endpoint d'état dédié.

### v0.1.29 — 2026-06-05 {#v0129-2026-06-05}

*Inclus dans le chart : `0.4.2`.*

#### Modifié {#changed-4}
- Exécution plus rapide pour les requêtes d'analyse de logs courantes, incluant des requêtes de plage 2x plus rapides, des agrégations de cardinalité 1,6x plus rapides et des intersections avec des requêtes de plage jusqu'à 6x plus rapides.
- Traite les filtres `field:*` comme des requêtes d'existence et corrige le tri par agrégations de centiles.
- Réduit l'utilisation de la mémoire pour les téléchargements vers Google Cloud Storage afin d'améliorer la stabilité de l'indexation.

#### Modifications du chart Helm {#helm-chart-changes-4}
- Active la télémétrie du service BYOC par défaut avec `datadog.byocTelemetry.enabled` ; cela exporte uniquement les logs et les métriques du service BYOC, et non les logs, métriques ou traces ingérés par le client.
- Obsolète et ignore `cloudprem.index.retention`, et ne définit plus `CP_RETENTION_PERIOD`.

### v0.1.26 — 2026-05-05 {#v0126-2026-05-05}

*Inclus dans le chart : `0.4.0`.*

#### Modifié {#changed-5}
- Agrégations de termes jusqu'à 4 fois plus rapides avec tri par sous-agrégation et agrégations de cardinalité jusqu'à 1,5 fois plus rapides.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}