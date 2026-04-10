---
description: Découvrir la surcharge liée à l'intégration de l'Agent Datadog avec votre
  base de données
title: Surcharge liée à l'intégration de l'Agent DBM
---

## Présentation

Database Monitoring s'exécute par-dessus l'Agent Datadog de base. Par défaut, il est configuré avec des paramètres de performance optimaux afin de minimiser l'impact sur votre système. Vous avez toutefois la possibilité d'ajuster des paramètres tels que la fréquence de collecte des données et l'échantillonnage des requêtes pour mieux répondre à vos charges de travail.

Cette page présente les résultats des tests de surcharge d'intégration effectués sur des bases de données avec Datadog Database Monitoring activé.

## Résultats des tests de surcharge

{{< tabs >}}
{{% tab "Postgres" %}}
Les tests de surcharge de l'intégration Postgres ont été effectués sur une instance Amazon EC2 `c5.xlarge` (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance PostgreSQL 14.10 fonctionnant sur une instance Amazon RDS `db.m5.large` (2 vCPU, 8 Go de RAM). La base de données exécutait une charge de travail TPC-C avec 20 entrepôts.

| Paramètre                           | Intervalle de collecte |
| --------------------------------- | ------------------- |
| Vérifier lʼintervalle de collecte minimal     | 15 s                 |
| Intervalle de collecte de métriques de requêtes | 10 s                 |
| Intervalle de collecte dʼéchantillons de requêtes | 10 s                 |
| Intervalle de collecte des paramètres      | 600 s                |
| Intervalle de collecte de schéma        | 600 s                |

* Version de lʼAgent testé : `7.50.2`
* Processeur : ~1 % du processeur utilisé en moyenne
* Mémoire : ~300 MiB de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~30 KB/s ▼ | 30 KB/s ▲
* Charge système de la requête de lʼAgent sur la base de données : ~1 % du temps du processeur

**Remarque** : la bande passante réseau correspond à la somme du trafic entrant et sortant entre l'Agent et la base de données surveillée d'une part, et le backend Datadog d'autre part. {{% /tab %}}

{{% tab "MySQL" %}}
Les tests de surcharge de l'intégration MySQL ont été effectués sur une instance Amazon EC2 `c5.xlarge` (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance MySQL 8.0 fonctionnant sur une instance Amazon RDS `db.m5.large` (2 vCPU, 8 Go de RAM). La base de données exécutait une charge de travail TPC-C avec 20 entrepôts.

| Paramètre                              | Intervalle de collecte |
| ------------------------------------ | ------------------- |
| Vérifier lʼintervalle de collecte minimal        | 15 s                 |
| Intervalle de collecte de métriques de requêtes    | 10 s                 |
| Intervalle de collecte de activités de requêtes | 10 s                 |
| Intervalle de collecte dʼéchantillons de requêtes    | 1s                  |
| Intervalle de collecte des paramètres         | 600 s                |

* Version de lʼAgent testé : `7.50.2`
* CPU : ~2 % du CPU utilisé en moyenne
* Mémoire : ~300 MiB de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~40 KB/s ▼ | 30 KB/s ▲
* Charge système de la requête de lʼAgent sur la base de données : ~1 % du temps du processeur

**Remarque** : la bande passante réseau correspond à la somme du trafic entrant et sortant entre l'Agent et la base de données surveillée d'une part, et le backend Datadog d'autre part. {{% /tab %}}

{{% tab "SQL Server" %}}
Les tests de surcharge de l'intégration SQL Server ont été effectués sur une instance Amazon EC2 `c5.xlarge` (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance SQL Server 2019 Standard Edition fonctionnant sur une instance Amazon RDS `db.m5.large` (2 vCPU, 8 Go de RAM). La base de données exécutait une charge de travail TPC-C avec 20 entrepôts.

| Paramètre                              | Intervalle de collecte |
| ------------------------------------ | ------------------- |
| Vérifier lʼintervalle de collecte minimal        | 15 s                 |
| Intervalle de collecte de métriques de requêtes    | 60 s                 |
| Intervalle de collecte de activités de requêtes | 10 s                 |
| Intervalle de collecte des paramètres         | 600 s                |

* Version de lʼAgent testé : `7.50.2`
* Processeur : ~1 % du processeur utilisé en moyenne
* Mémoire : ~300 MiB de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~40 KB/s ▼ | 30 KB/s ▲
* Charge système de la requête de lʼAgent sur la base de données : ~1 % du temps du processeur

**Remarque** : la bande passante réseau correspond à la somme du trafic entrant et sortant entre l'Agent et la base de données surveillée d'une part, et le backend Datadog d'autre part. {{% /tab %}}

{{% tab "Oracle" %}}
Les tests de surcharge de l'intégration Oracle ont été effectués sur une instance Amazon EC2 `c5.xlarge` (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance Oracle 19c fonctionnant sur une instance Amazon RDS `db.m5.large` (2 vCPU, 8 Go de RAM). La base de données exécutait une charge de travail TPC-C avec 20 entrepôts.

| Paramètre                              | Intervalle de collecte |
| ------------------------------------ | ------------------- |
| Vérifier lʼintervalle de collecte minimal        | 10 s                 |
| Intervalle de collecte de métriques de requêtes    | 60 s                 |
| Intervalle de collecte de activités de requêtes | 10 s                 |

* Version de l'Agent testée : `7.53.0`
* CPU : ~0,2 % du CPU utilisé en moyenne
* Mémoire : ~270 Mio de RAM utilisés (mémoire RSS) 
* Bande passante réseau : ~6 Ko/s ▼ | 4 Ko/s ▲
* Surcharge des requêtes de l'Agent sur la base de données : ~0,2 % du temps CPU

**Remarque** : la bande passante réseau correspond à la somme du trafic entrant et sortant entre l'Agent et la base de données surveillée d'une part, et le backend Datadog d'autre part.
{{% /tab %}}
{{< /tabs >}}