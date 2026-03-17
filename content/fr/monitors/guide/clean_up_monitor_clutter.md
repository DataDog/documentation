---
description: Apprenez à identifier et à nettoyer le désordre des moniteurs en analysant
  les modèles d'utilisation des moniteurs, en identifiant les moniteurs inutilisés
  ou redondants, et en mettant en œuvre les meilleures pratiques pour la gestion des
  moniteurs afin d'améliorer la qualité des alertes et de réduire le bruit.
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentation
  text: Meilleures pratiques pour les moniteurs
- link: monitors/quality
  tag: Documentation
  text: Qualité des moniteurs
title: Nettoyer le désordre des moniteurs
---
## Aperçu

Le désordre des moniteurs s'accumule avec le temps, entraînant du bruit, des alertes dupliquées et une friction opérationnelle accrue. Ce guide décrit une approche claire pour identifier et nettoyer les moniteurs encombrés, avec des cas d'utilisation pour vous aider à rationaliser vos flux de travail d'alerte.

Il fournit également des meilleures pratiques pour maintenir un environnement de surveillance propre, facilitant ainsi l'évolutivité et la gouvernance de votre stratégie de surveillance à mesure que vos systèmes se développent.

### Prérequis

Vous devez avoir les [permissions d'écriture sur les moniteurs][10].

### Cas d'utilisation

Ce guide couvre plusieurs cas d'utilisation clés pour nettoyer le désordre des moniteurs :

- **[Moniteurs muets à long terme](#muted-for-a-long-period-of-time)** : Moniteurs qui ont été réduits au silence pendant de longues périodes—semaines ou même mois.
- **[Moniteurs bloqués en état d'ALERT](#in-the-alerted-state-for-a-long-period-of-time)** : Moniteurs qui sont restés en état "Alerte" pendant une période anormalement longue sans être reconnus ou résolus.
- **[Moniteurs dupliqués](#duplicate-monitors)** : Plusieurs moniteurs déclenchant la même condition, métrique ou service—souvent en raison de silos d'équipe ou d'un manque de coordination.
- **[Moniteurs instables et bruyants](#flappy-and-noisy-monitors)** : Moniteurs qui déclenchent et se résolvent fréquemment (c'est-à-dire, "flap") ou produisent de grands volumes d'alertes de faible valeur.
- **[Moniteurs mal configurés](#misconfigured-monitors)** : Moniteurs avec des liens brisés vers des tableaux de bord, des délais d'évaluation manquants, des constituants d'alerte manquants ou incorrects, ou des balises et conventions de nommage obsolètes.

## Muets pendant une longue période

Les moniteurs servent de système d'alerte précoce pour les pannes, les menaces de sécurité et les problèmes de performance. Cependant, avoir des moniteurs réduits au silence pendant une longue période va à l'encontre de cet objectif, le silence à long terme signale souvent qu'un moniteur est obsolète, non pertinent ou trop bruyant pour être utile. Ces moniteurs doivent être examinés et soit réactivés avec un réglage approprié, soit retirés pour réduire le désordre et éliminer les moniteurs obsolètes de votre environnement d'alerte.

Nettoyez les moniteurs qui ne fournissent pas de valeur et remplacez les silences à long terme par des horaires limités dans le temps :

### 1. Inspectez les moniteurs

Auditez les moniteurs qui ont été réduits au silence pendant une longue période pour comprendre lesquels sont réellement nécessaires ou utiles. Certains moniteurs peuvent être réduits au silence pour une bonne raison et vous souhaitez éviter de les supprimer.

Pour voir ces moniteurs, accédez à la page [Qualité des moniteurs][1] et trouvez la liste des moniteurs qui ont été réduits au silence pendant plus de 60 jours. Vous pouvez également trouver des moniteurs muets sur la [**Liste des moniteurs**][8] avec la requête `muted_elapsed:<number_of_days>d`.

Après avoir obtenu votre liste, vous pouvez soit agir sur chaque moniteur depuis la page Qualité des moniteurs, soit procéder à une suppression en masse des moniteurs avec les étapes 2 et 3.

### 2. Obtenez la liste des ID de moniteurs

Obtenez une liste de vos ID de moniteurs pour automatiser les changements de manière programmatique. Commencez par les moniteurs qui ont été mis en sourdine pendant plus de 60 jours.

La commande CURL suivante récupère cette information :

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("muted_duration_over_sixty_days")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_muted.csv
```

This gives you the details of your monitors in a CSV file for readability. You can refine the query to your specific use case.

### 3. Delete the monitors

With your list of monitors that have been muted for over 60 days (from Step 2), you can delete them with the following script. Before you run the script, put the monitor ID column **first** in the table.

```shell
input_file="monitors_muted.csv"
tail -n +2 "$input_file" | awk -F',' '{print $1}' | while read -r monitor_id; do
    echo "Deleting monitor ID: $monitor_id"

    curl -X DELETE "{{< region-param key=dd_api >}}/api/v1/monitor/${monitor_id}" \
        H "Accept: application/json" \
        H "DDAPIKEY: ${DD_API_KEY}" \
        H "DDAPPLICATIONKEY: ${DD_APP_KEY}"
    echo "Moniteur supprimé : $monitor_id"
fait
```

## In an ALERT state for a long period of time

Persistent alerts suggest one of two problems: either the issue is not actionable, or the monitor threshold is misconfigured. Both cases erode trust in alerts and contribute to alert fatigue. These monitors should be reviewed and edited, or removed.

Here is how to get the list of monitors which have been in ALERT state for more than 60 days:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("alerted_too_long")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_alerted_too_long.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_alerted_too_long.csv`.

## Duplicate monitors

Creating separate monitors that differ only by a tag, can lead to unnecessary duplication. For example, monitoring CPU usage with one monitor for `prod` and another for `staging` increases your monitor count.

Redundant monitors create unnecessary noise and confusion. In many cases, these can be consolidated into a single [**multi-alert** monitor][2] with proper scoping and tagging, reducing duplication and making alerts more manageable.

If you need to send different notifications depending on the tag value that triggered the alert, use [monitor variables][3] to dynamically customize the message based on the tag that breached the threshold.

## Flappy and noisy monitors

Noisy monitors desensitize teams to real issues. Flapping (when a monitor frequently switches between alert and recovery states) often indicates unstable thresholds, missing evaluation delays, or underlying system volatility.

To reduce noise, review the monitor's evaluation aggregation and the threshold configuration. Adjust the settings to stabilize alert behavior, or delete the monitor if it no longer provides value.

Here is how to get a list of monitors that are generating a high volume of alerts:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("noisy_monitor")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > noisy_monitors.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `noisy_monitors.csv`.

## Misconfigured monitors

Misconfigured monitors are active monitors that may have a proper use, but are inefficient because you won't be notified. These misconfigurations undermine the monitor's reliability and make debugging or triaging harder. Cleaning these up ensures your alerts are accurate, actionable, and integrated into your observability workflows.

### Broken handle
Use the [**Monitor Quality page**][4] to visualize which monitors have a broken handle. Notifications from these monitors can't reach its destination.

**Datadog recommends** reviewing the monitors' recipients to ensure proper delivery, or deleting the monitor.

Here is how to get the list of monitors that have misconfigured handles:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("broken_at_handle")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_broken_handle.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_broken_handle.csv`.

### Missing a delay
This issue mainly impacts monitors based on AWS metrics. Because Datadog retrieves AWS metrics through the API, there's often a built-in delay before the data becomes available. If you don't account for this, monitors can trigger false positives due to incomplete or delayed data.

You can find affected monitors in the [Monitor Quality][4] page, where monitors missing an evaluation delay are flagged.

**Datadog recommends** adding a delay to all monitors that use AWS metrics. A delay of 300 seconds (5 minutes) is typically sufficient to account for data ingestion latency.

Here is how to get the list of monitors that are missing a delay:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("crawler_metric_missing_eval_delay")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_delay.csv
```

For more information, see the [AWS Troubleshooting guide][7].

### Missing constituent

Composite monitors evaluate their state based on the logical combination of two or more monitors (called constituents). If any of those constituent monitors are deleted or become unavailable, the composite monitor becomes invalid or unreliable.

A missing constituent typically means that at least one of the original input monitors has been removed after the composite monitor was created. This causes the composite to be incomplete and potentially misleading in alerting behavior.

**Datadog recommends** reviewing the composite monitors to either replace or restore missing constituents, or delete the composite monitor. You can find the list of composite monitors with missing constituents on the [Monitor Quality][4] page.

To programmatically get the list of monitors that are missing constituents:

```bash
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("composite_has_deleted_constituents")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_constituent.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_missing_constituent.csv`.

For more information, see [Composite Monitor][11].

## Best Practices to avoid Monitor Cluttering

| Best Practice | Description | Implementation |
|---------------|-------------|----------------|
| **Eliminate redundancy** | Avoid creating multiple monitors that track the same signal with slightly different scopes (such as by region, team, or environment). | Use **group-by monitors with tags**, which are easier to manage and scale. |
| **Set clear ownership** | Every monitor should have a clear owner to route alerts to the right responders and avoid confusion. | Use `team:` tags and notification handles (`@slack-xyz`, `@pagerduty-twilio`). Use the **Creator** filter on the [Monitors List][8] to audit the most frequent monitor creators. |
| **Review noisy or dormant monitors** | Monitors that alert too often or never alert at all can cause fatigue or signal a misconfiguration. | Use the [**Monitor Quality page**][4] to identify and clean up noisy, broken, or outdated monitors. |
| **Leverage monitor templates** | For common patterns (such as RED metrics or API latency), use templates to reduce duplication and ensure standardization. | Use [reusable templates][5] to reduce duplication and ensure standardization across teams. |
| **Establish a Tagging Policy** | Consistent and meaningful tags allow you to easily filter, group, and route monitors. | Use consistent tags (such as `service:`, `env:`, `team:`) and establish a [Tagging Policy][6]. This enables scoped dashboards, alerts, and compliance tracking. |
| **Monitor Quality Dashboard** | Visualize trends in monitor hygiene across teams, services, and environments to proactively identify gaps and track improvements. | Set up a [**Monitor Quality dashboard**](#template-monitor-quality-dashboard) to track improvements over time and prioritize cleanup efforts at scale. |

## Template Monitor Quality dashboard

To help you get started, import the following JSON dashboard definition directly into your Datadog account.

1. In the app, navigate to [**Dashboards**][9] and click **New Dashboard**.
2. At the top of the page, click **Configure** and select **Import dashboard JSON...**.
3. Copy and paste the following JSON to build out a Monitor Quality dashboard:

```json
{
  "title": "Monitor Quality OOTB Dashboard",
  "description": "",
  "widgets": [
    {
      "id": 8853380235542346,
      "definition": {
        "type": "note",
        "content": "This Monitor Quality dashboard provides a comprehensive view of monitor quality metrics, broken down by `team` and `service`. Its goal is to help you easily analyze and act on monitor quality data, enabling you to schedule reports, download insights as PDFs, and more.\n\n**Key Features:**\n- Team and Service Views: You can filter the dashboard either by team or by service, but not both simultaneously. If you filter by `team`, refer to the [Team Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107838741&to_ts=1732280638741&live=false&tile_focus=4548404374449802) for relevant insights. If you filter by `service`, explore the [Service Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107865224&to_ts=1732280665224&live=false&tile_focus=2841959907422822) for detailed information.\n- Monitor-Level Details: For a deeper dive into specific impacted monitors, navigate to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality).\n- Seamless Navigation: Use the context links provided in the dashboard to jump directly to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality), pre-filtered with the same criteria you've applied on the dashboard.\n\nThis dashboard is designed to give you both a high-level overview and actionable paths to improve your monitoring posture.",
        "background_color": "white",
        "font_size": "14",
        "text_align": "left",
        "vertical_align": "center",
        "show_tick": false,
        "tick_pos": "50%",
        "tick_edge": "left",
        "has_padding": true
      },
      "layout": { "x": 0, "y": 0, "width": 12, "height": 3 }
    },
    {
      "id": 4548404374449802,
      "definition": {
        "title": "General overview - by team",
        "background_color": "blue",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 2449119265341574,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_team` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by team.\n\nUse the `team` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 3001209940385798,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$équipe}}"
                }
              ]
            },
            "disposition": { "x": 5, "y": 0, "largeur": 7, "hauteur": 4 }
          },
          {
            "id": 498569597362654,
            "définition": {
              "titre": "Évolution des améliorations de qualité par type au fil du temps",
              "taille_titre": "16",
              "alignement_titre": "gauche",
              "afficher_légende": faux,
              "disposition_légende": "auto",
              "colonnes_légende": ["moyenne", "min", "max", "valeur", "somme"],
              "temps": { "cacher_données_coût_incomplètes": vrai },
              "type": "série temporelle",
              "demandes": [
                {
                  "formules": [{ "formule": "requête1" }],
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_team{$équipe,$service} par {type_suggestion}"
                    }
                  ],
                  "format_réponse": "séries_temporelles",
                  "style": {
                    "palette": "datadog16",
                    "trier_par": "valeurs",
                    "type_ligne": "solide",
                    "largeur_ligne": "normale"
                  },
                  "type_affichage": "ligne"
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{$équipe}}"
                }
              ]
            },
            "disposition": { "x": 0, "y": 4, "largeur": 12, "hauteur": 4 }
          },
          {
            "id": 1376609088194674,
            "définition": {
              "titre": "Équipes les plus impactées",
              "taille_titre": "16",
              "alignement_titre": "gauche",
              "temps": { "cacher_données_coût_incomplètes": vrai },
              "type": "liste_top",
              "demandes": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_team{!équipe:none,$équipe,$service} par {équipe,type_suggestion}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "nombre": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "affichage": { "type": "empilé", "légende": "automatique" }
              }
            },
            "mise_en_page": { "x": 0, "y": 8, "largeur": 12, "hauteur": 4 }
          },
          {
            "id": 718136447073638,
            "définition": {
              "type": "note",
              "contenu": "Moniteurs avec des destinataires manquants par équipe",
              "couleur_de_fond": "bleu_vif",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "mise_en_page": { "x": 0, "y": 12, "largeur": 6, "hauteur": 1 }
          },
          {
            "id": 2393792996475864,
            "définition": {
              "type": "note",
              "content": "Moniteurs avec des poignées cassées par équipe",
              "background_color": "vert vif",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 4443082314028290,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont les conditions suivantes:\n aucune poignée de notification trouvée dans le corps du moniteur\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 3954366540293996,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont les conditions suivantes:\n la poignée de notification n'est pas valide\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 2546970864549118,
            "définition": {
              "title": "Moniteurs avec des destinataires manquants par équipe",
              "type": "liste_top",
              "demandes": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:missing_at_handle,$team,$service} par {team,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "nombre": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "bleu"
              }
            },
            "layout": { "x": 0, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 3744392131942638,
            "définition": {
              "title": "Moniteurs avec des poignées cassées par équipe",
              "type": "liste_top",
              "demandes": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:broken_at_handle,$team,$service} par {team,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "nombre": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "vert"
              }
            },
            "layout": { "x": 6, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 2751217590574740,
            "définition": {
              "type": "note",
              "content": "Moniteurs muets depuis trop longtemps",
              "background_color": "violet",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "layout": { "x": 0, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 5158165900159898,
            "définition": {
              "type": "note",
              "content": "Moniteurs générant un volume élevé d'alertes",
              "background_color": "vert",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 8032070484951580,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont les conditions suivantes :\n le moniteur a été muet pendant au moins 60 jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4153429942317530,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont les conditions suivantes :\n le moniteur génère le top 5% des alertes au cours des 10 derniers jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4158897740932848,
            "définition": {
              "title": "Moniteurs muets depuis trop longtemps",
              "type": "liste_top",
              "demandes": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {team,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "nombre": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "sémantique"
              }
            },
            "layout": { "x": 0, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 5392245250417816,
            "définition": {
              "title": "Moniteurs générant un volume élevé d'alertes",
              "type": "liste_top",
              "demandes": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_données": "métriques",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:noisy_monitor,$team,$service} by {team,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "nombre": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": { "display": { "type": "empilé" }, "palette": "gris" }
            },
            "layout": { "x": 6, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 1271026446632020,
            "définition": {
              "type": "note",
              "content": "Moniteurs bloqués en état d'alerte",
              "background_color": "jaune_vif",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "layout": { "x": 0, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 6315895116466318,
            "définition": {
              "type": "note",
              "content": "Les moniteurs composites ont des composants supprimés",
              "background_color": "gris",
              "taille_de_police": "18",
              "alignement_du_texte": "centre",
              "alignement_vertical": "centre",
              "afficher_tick": false,
              "position_tick": "50%",
              "bord_tick": "gauche",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 8251226565664096,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont les conditions suivantes :\n le moniteur a été en alerte pendant au moins 60 jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 1329067816249636,
            "définition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le moniteur est un composite et a des composants supprimés\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "alignement_vertical": "centre",
              "show_tick": true,
              "position_tick": "50%",
              "tick_edge": "bas",
              "a_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 7052384595427880,
            "définition": {
              "title": "Moniteurs bloqués en état d'alerte",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:alerted_too_long,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 31, "width": 6, "height": 5 }
          },
          {
            "id": 2768363536962548,
            "definition": {
              "title": "Les moniteurs composites ont des composants supprimés",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:composite_has_deleted_constituents ,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{équipe}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 31, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": { "x": 0, "y": 3, "width": 12, "height": 37 }
    },
    {
      "id": 2841959907422822,
      "definition": {
        "title": "Aperçu général par service",
        "background_color": "rose",
        "show_title": true,
        "type": "groupe",
        "layout_type": "ordonné",
        "widgets": [
          {
            "id": 3801590205295194,
            "definition": {
              "type": "note",
              "content": "Cette section est alimentée par la `datadog.monitor.suggested_monitor_health_by_service` métrique, qui est émise quotidiennement.\n\nLes comptes de moniteurs rapportés dans cette métrique excluent les moniteurs synthétiques.\n\nCes comptes représentent le nombre total de suggestions pour des améliorations de la qualité des moniteurs, ventilées par service.\n\nUtilisez le filtre `service` pour voir des informations spécifiques à votre équipe.\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "blanc",
              "font_size": "14",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": faux,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": vrai
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 8418200284207718,
            "definition": {
              "title": "Distribution des Améliorations de Qualité par Type",
              "title_size": "16",
              "title_align": "gauche",
              "time": { "hide_incomplete_cost_data": vrai },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team,$service} par {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "soleil",
              "cacher_total": faux,
              "légende": { "type": "automatique" },
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "disposition": { "x": 5, "y": 0, "largeur": 7, "hauteur": 4 }
          },
          {
            "id": 8281740697966220,
            "definition": {
              "titre": "Évolution des améliorations de qualité par type au fil du temps",
              "title_size": "16",
              "title_align": "gauche",
              "afficher_légende": faux,
              "disposition_légende": "auto",
              "colonnes_légende": ["moyenne", "min", "max", "valeur", "somme"],
              "time": { "hide_incomplete_cost_data": vrai },
              "type": "série temporelle",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_service{$team, $service} par {suggestion_type}"
                    }
                  ],
                  "format_réponse": "série temporelle",
                  "style": {
                    "palette": "datadog16",
                    "trier_par": "valeurs",
                    "type_ligne": "solide",
                    "largeur_ligne": "normal"
                  },
                  "type_affichage": "ligne"
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "disposition": { "x": 0, "y": 4, "largeur": 12, "hauteur": 4 }
          },
          {
            "id": 5048429332292860,
            "definition": {
              "titre": "Services les plus impactés",
              "title_size": "16",
              "title_align": "gauche",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_service{!service:none,$team,$service} par {service,type_de_suggestion}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "affichage": { "type": "empilé", "légende": "automatique" }
              }
            },
            "disposition": { "x": 0, "y": 8, "largeur": 12, "hauteur": 5 }
          },
          {
            "id": 2233801928907094,
            "definition": {
              "type": "note",
              "contenu": "Moniteurs avec des destinataires manquants par service",
              "couleur_de_fond": "bleu_vif",
              "taille_de_police": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": faux,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": vrai
            },
            "disposition": { "x": 0, "y": 13, "largeur": 6, "hauteur": 1 }
          },
          {
            "id": 7329031300309162,
            "definition": {
              "type": "note",
              "contenu": "Moniteurs avec des poignées cassées par service",
              "couleur_de_fond": "vert_vif",
              "taille_de_police": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": faux,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": vrai
            },
            "disposition": { "x": 6, "y": 13, "largeur": 6, "hauteur": 1 }
          },
          {
            "id": 7627510169738418,
            "definition": {
              "type": "note",
              "contenu": "Les comptes de moniteurs signalés dans cette métrique satisfont les conditions suivantes:\n aucune poignée de notification trouvée dans le corps du moniteur\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "couleur_de_fond": "jaune",
              "font_size": "14",
              "alignement_du_texte": "gauche",
              "vertical_align": "centre",
              "afficher_tick": vrai,
              "tick_pos": "50%",
              "bord_tick": "bas",
              "has_padding": vrai
            },
            "layout": { "x": 0, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 2826082028591748,
            "definition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le gestionnaire de notification n'est pas valide\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "couleur_de_fond": "jaune",
              "font_size": "14",
              "alignement_du_texte": "gauche",
              "vertical_align": "centre",
              "afficher_tick": vrai,
              "tick_pos": "50%",
              "bord_tick": "bas",
              "has_padding": vrai
            },
            "layout": { "x": 6, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 5050954942402816,
            "definition": {
              "title": "Moniteurs avec des destinataires manquants par service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:missing_at_handle,$team,$service} par {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "bleu"
              }
            },
            "layout": { "x": 0, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 7809748805807956,
            "definition": {
              "title": "Moniteurs avec des gestionnaires défectueux par service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:broken_at_handle,$team,$service} par {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "vert"
              }
            },
            "layout": { "x": 6, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 8416588682594596,
            "definition": {
              "type": "note",
              "content": "Moniteurs muets depuis trop longtemps",
              "background_color": "violet",
              "taille_de_police": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": faux,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": vrai
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 4951606729784970,
            "definition": {
              "type": "note",
              "content": "Moniteurs générant un volume élevé d'alertes"
              "background_color": "vert",
              "taille_de_police": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": faux,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": vrai
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 1778359756038190,
            "definition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le moniteur a été mis en sourdine pendant au moins 60 jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "couleur_de_fond": "jaune",
              "font_size": "14",
              "alignement_du_texte": "gauche",
              "vertical_align": "centre",
              "afficher_tick": vrai,
              "tick_pos": "50%",
              "bord_tick": "bas",
              "has_padding": vrai
            },
            "layout": { "x": 0, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 8559060613933804,
            "definition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le moniteur génère les 5 % d'alertes les plus élevées au cours des 10 derniers jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "couleur_de_fond": "jaune",
              "font_size": "14",
              "alignement_du_texte": "gauche",
              "vertical_align": "centre",
              "afficher_tick": vrai,
              "tick_pos": "50%",
              "bord_tick": "bas",
              "has_padding": vrai
            },
            "layout": { "x": 6, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 7041249940897320,
            "definition": {
              "title": "Moniteurs mis en sourdine trop longtemps",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "empilé", "legend": "automatique" },
                "palette": "sémantique"
              }
            },
            "layout": { "x": 0, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 7810615049061724,
            "definition": {
              "title": "Moniteurs générant un volume élevé d'alertes",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:noisy_monitor,$team,$service} by {service,suggestion_type}"
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "Voir la liste des moniteurs",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatique" },
                "palette": "gris"
              }
            },
            "layout": { "x": 6, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 5108940190121326,
            "definition": {
              "type": "note",
              "content": "Moniteurs bloqués en état d'alerte",
              "background_color": "jaune_vif",
              "font_size": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 4931941666409286,
            "definition": {
              "type": "note",
              "content": "Les moniteurs composites ont des composants supprimés",
              "background_color": "gris",
              "font_size": "18",
              "text_align": "centre",
              "vertical_align": "centre",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "gauche",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 6520923360190496,
            "definition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le moniteur a alerté pendant au moins 60 jours\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "vertical_align": "centre",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bas",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 1364025765104008,
            "definition": {
              "type": "note",
              "content": "Les comptes de moniteurs rapportés dans cette métrique satisfont aux conditions suivantes :\n le moniteur est un composite et a des composants supprimés\n le type de moniteur n'est pas `synthetics`\n\n_Vous pouvez utiliser les liens contextuels pour accéder à la liste des moniteurs affectés._",
              "background_color": "jaune",
              "font_size": "14",
              "text_align": "gauche",
              "vertical_align": "centre",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bas",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 3670188762233230,
            "definition": {
              "title": "Moniteurs bloqués dans l'état d'alerte",
              "type": "toplist",
              "requests": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_de_données": "métriques",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$équipe,$service} par {service,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_de_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "compte": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatique" },
                "palette": "orange"
              }
            },
            "disposition": { "x": 0, "y": 32, "largeur": 6, "hauteur": 5 }
          },
          {
            "id": 9006201303765196,
            "definition": {
              "titre": "Les moniteurs composites ont des composants supprimés"
              "type": "toplist",
              "requests": [
                {
                  "requêtes": [
                    {
                      "nom": "requête1",
                      "source_de_données": "métriques",
                      "requête": "somme:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$équipe,$service} par {service,suggestion_type}",
                      "agrégateur": "dernier"
                    }
                  ],
                  "format_de_réponse": "scalaire",
                  "formules": [{ "formule": "requête1" }],
                  "tri": {
                    "compte": 10,
                    "ordonner_par": [
                      { "type": "formule", "index": 0, "ordre": "desc" }
                    ]
                  }
                }
              ],
              "liens_personnalisés": [
                {
                  "étiquette": "Voir la liste des moniteurs",
                  "lien": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatique" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 32, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 40,
        "width": 12,
        "height": 38,
        "is_column_break": true
      }
    }
  ],
  "template_variables": [
    {
      "name": "équipe",
      "prefix": "équipe",
      "available_values": [],
      "default": "*"
    },
    {
      "name": "service",
      "prefix": "service",
      "available_values": [],
      "default": "*"
    }
  ],
  "layout_type": "ordonné",
  "notify_list": [],
  "reflow_type": "fixe"
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/quality
[2]: /fr/monitors/guide/alert_aggregation/#multi-alert
[3]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/monitors/quality?order=desc
[5]: https://app.datadoghq.com/monitors/templates?q=&origination=installed&p=1
[6]: https://app.datadoghq.com/monitors/settings/policies
[7]: /fr/integrations/guide/aws-integration-troubleshooting/#metrics-delayed
[8]: https://app.datadoghq.com/monitors/manage
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /fr/account_management/rbac/permissions/#monitors
[11]: /fr/monitors/types/composite/