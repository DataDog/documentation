---
description: Apprenez à utiliser le processeur Remap to OCSF pour mapper les logs
  vers des événements Open Cybersecurity Schema Framework (OCSF).
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Remap to OCSF
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez ce processeur pour remapper les logs vers des événements Open Cybersecurity Schema Framework (OCSF). Les classes d'événements du schéma OCSF sont définies pour une source et un type de log spécifiques. Vous pouvez ajouter plusieurs mappings à un seul processeur. **Remarque** : Datadog recommande que le processeur OCSF soit le dernier processeur de votre pipeline, afin que le remapping soit effectué après que les logs ont été traités par tous les autres processeurs.

## Configuration {#setup}

Pour configurer ce processeur :

Cliquez sur {{< ui >}}Manage mappings{{< /ui >}}. Cela ouvre une fenêtre modale :

- Si vous avez déjà ajouté des mappings, cliquez sur un mapping dans la liste pour le modifier ou le supprimer. Vous pouvez utiliser la barre de recherche pour trouver un mapping par son nom. Cliquez sur {{< ui >}}Add Mapping{{< /ui >}} si vous souhaitez ajouter un autre mapping. Sélectionnez {{< ui >}}Library Mapping{{< /ui >}} ou {{< ui >}}Custom Mapping{{< /ui >}} et cliquez sur {{< ui >}}Continue{{< /ui >}}.
- Si vous n'avez pas encore ajouté de mappings, sélectionnez {{< ui >}}Library Mapping{{< /ui >}} ou {{< ui >}}Custom Mapping{{< /ui >}}. Cliquez sur {{< ui >}}Continue{{< /ui >}}.

{{% collapse-content title="Mappage de bibliothèque" level="h3" expanded=false id="library_mapping" %}}

### Ajouter un mapping {#add-a-mapping}

1. Sélectionnez le type de log dans le menu déroulant.
1. Définissez une requête de filtre. Seuls les logs qui correspondent à la requête de filtre spécifiée sont remappés. Tous les logs, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][1] pour plus d'informations.
1. Examinez l'exemple de log source et le résultat OCSF obtenu.
1. Cliquez sur {{< ui >}}Save Mapping{{< /ui >}}.

### Mappages de bibliothèque {#library-mappings}

Voici les mappages de bibliothèque disponibles :

| Source de log             | Type de log                                      | Catégorie OCSF                 | Versions OCSF prises en charge|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | Type : Gestion<br>Nom de l'événement : ChangePassword | Changement de compte (3001)         | 1.3.0<br>1.1.0         |
| AWS GuardDuty          | Tous les types de résultats                             | Résultat de détection (2004)      | 1.3.0                  |
| AWS WAF                | WebACL                                        | Activité HTTP (4002)          | 1.3.0                  |
| GitHub                 | Créer un utilisateur                                   | Changement de compte (3001)         | 1.1.0                  |
| Audit Google Cloud     | CreateBucket                                  | Changement de compte (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateSink                                    | Changement de compte (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | SetIamPolicy                                  | Changement de compte (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | UpdateSync                                    | Changement de compte (3001)         | 1.3.0<br>1.1.0         |
| Administrateur Google Workspace | addPrivilege                                   | Gestion de compte utilisateur (3005)| 1.1.0                   |
| Infoblox               | Audit API                                     | Activité de l'API (6003)           | 1.3.0                  |
| Infoblox               | Audit Authentication                          | Authentification (3002)         | 1.3.0                  |
| Infoblox               | DHCP                                          | Activité DHCP (4004)          | 1.3.0                  |
| Infoblox               | Requête DNS                                     | Activité DNS (4003)           | 1.3.0                  |
| Infoblox               | Port                                          | Événement de base (0)                | 1.3.0                  |
| Microsoft 365 Defender | Incident                                      | Résultat d'incident (2005)        | 1.3.0<br>1.1.0 |
| Okta                   | Début de session utilisateur                            | Authentification (3002)         | 1.1.0                  |
| Palo Alto Networks     | Menace                                        | Activité réseau (4001)       | 1.3.0                  |
| Palo Alto Networks     | Trafic                                        | Activité réseau (4001)       | 1.1.0                  |
| Zscaler ZPA            | Activité utilisateur                          | Activité réseau (4001)       | 1.3.0                  |
| Zscaler ZPA            | Statut utilisateur                            | Authentification (3002)         | 1.3.0                  |

{{% /collapse-content %}}

{{% collapse-content title="Mappage personnalisé" level="h3" expanded=false id="custom_mapping" %}}

Lorsque vous configurez un mappage personnalisé, si vous essayez de fermer ou de quitter la fenêtre modale, vous êtes invité à exporter votre mappage. Datadog vous recommande d'exporter votre mappage pour enregistrer ce que vous avez configuré jusqu'à présent. Le mappage exporté est enregistré sous forme de fichier JSON.

Pour configurer un mappage personnalisé :

1. Facultativement, ajoutez un nom pour le mappage. Le nom par défaut est `Custom Authentication`.
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont remappés.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
1. Sélectionnez la catégorie d'événement OCSF dans le menu déroulant.
1. Sélectionnez la classe d'événement OCSF dans le menu déroulant.
1. Entrez un exemple de log afin de pouvoir vous y référer lors de l'ajout de champs.
1. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Sélectionnez les profils OCSF que vous souhaitez ajouter. Consultez [OCSF Schema Browser][1] pour plus d'informations.
1. Tous les champs obligatoires sont affichés. Saisissez les {{< ui >}}Source Logs Fields{{< /ui >}} et {{< ui >}}Fallback Values{{< /ui >}} requis pour ceux-ci. Si vous souhaitez ajouter manuellement des champs supplémentaires, cliquez sur {{< ui >}}+ Field{{< /ui >}}. Cliquez sur l'icône de corbeille pour supprimer un champ. **Remarque** : Les champs requis ne peuvent pas être supprimés.
    - La valeur de repli est utilisée pour le champ OCSF si le log ne contient pas le champ de log source.
    - Vous pouvez ajouter plusieurs champs pour {{< ui >}}Source Log Fields{{< /ui >}}. Par exemple, les logs `user.system.start` d'Okta contiennent soit le champ `eventType`, soit le champ `legacyEventType`. Vous pouvez mapper les deux champs sur le même champ OCSF.
    - Si vous avez vos propres mappages OCSF au format JSON ou si vous avez enregistré un mappage précédent que vous souhaitez utiliser, cliquez sur {{< ui >}}Import Configuration File{{< /ui >}}.
1. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Certaines valeurs de source de log doivent être mappées sur des valeurs OCSF. Par exemple, les valeurs du champ de gravité d'un log source mappé sur le champ `severity_id` de l'OCSF doivent être mappées sur les valeurs `severity_id` de l'OCSF. Consultez `severity_id` dans [Authentication][2] pour obtenir une liste des valeurs OCSF. Un exemple de mappage des valeurs de gravité :
    | Valeur de log source | Valeur OCSF      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. Toutes les valeurs qui doivent être mappées sur une valeur OCSF sont répertoriées. Cliquez sur {{< ui >}}+ Add Row{{< /ui >}} si vous souhaitez mapper des valeurs supplémentaires.
1. Cliquez sur {{< ui >}}Save Mapping{{< /ui >}}.

[1]: https://schema.ocsf.io/
[2]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=

{{% /collapse-content %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][3] et les [métriques de tampon de processeur][4] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][5]. Pour filtrer ou regrouper par métriques de processeur OCSF Mapper, utilisez le tag `component_type:ocsf_mapper`.

[1]: /fr/observability_pipelines/search_syntax/logs/
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/