---
description: Utilisez des syntaxes de période personnalisées, y compris des dates
  fixes, des dates relatives et des périodes alignées sur le calendrier dans les tableaux
  de bord Datadog.
title: Intervalles personnalisés
---
## Aperçu {#overview}

<div class="alert alert-info">Les requêtes sont exécutées en temps UTC, mais la période de requête est sélectionnée selon le <strong>fuseau horaire de votre navigateur</strong>. Alternez entre l'affichage du fuseau horaire par défaut ou de l'UTC à partir de l'action de configuration du tableau de bord. Pour plus d'informations, consultez la <a href="/dashboards/configure/#configuration-actions">documentation de configuration du tableau de bord</a>.</div>

De nombreuses vues dans Datadog peuvent être limitées à une période spécifique. Les contrôles de temps incluent une liste de périodes courantes et un sélecteur de calendrier pour une sélection rapide.

Les périodes peuvent être :

- **Glissantes** : Le début et la fin avancent simultanément au fur et à mesure que le temps passe (par exemple, `5h` affiche toujours les 5 heures les plus récentes).
- **Croissantes** : Un début fixe avec la fin suivant "maintenant" (par exemple, `since Jun 1` montre tout depuis le 1er juin jusqu'à l'heure actuelle).
- **Fixées** : Le début et la fin sont figés à des points spécifiques dans le temps (par exemple, `Jan 1 - Jan 2`).

Pour incrémenter par mois, jour, an, heure ou minute, mettez en surbrillance une partie de la période et utilisez les touches `[↑]` et `[↓]` :

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="Incrémentez le temps avec les touches fléchées" video="true" width="500" >}}

## Syntaxes prises en charge {#supported-syntaxes}

### Dates fixes {#fixed-dates}

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="Tapez une période fixe personnalisée" video="true" width="500" >}}

| Format                       | Exemples                                         |
| ---------------------------- | ------------------------------------------------ |
| `{MMM/MMMM} D`               | 1er janv.<br>1er janvier                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | 1er janv., 13h00<br>1er janvier, 13h00             |
| `{MMM/MMMM} D, YYYY, h:mm a` | 1er janv. 2019, 13h00<br>1er janvier 2019, 13h00 |
| `h:mm a`                     | 13h00                                          |
| Horodatage en secondes Unix       | 1577883600                                       |
| Horodatage en millisecondes Unix  | 1577883600000                                    |

Toute date fixe peut être saisie dans le cadre d'une plage. Exemple :

- `1577883600 - 1578009540`
- `Jan 1 - Jan 2`
- `6:00 am - 1:00 pm`

### Dates relatives {#relative-dates}

Les dates relatives se mettent à jour avec le temps ; elles sont calculées à partir de l'heure actuelle.

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="Tapez une période de temps relative personnalisée" video="true" width="500" >}}

| Format                                             | Description                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N{unit}` | Affiche une fenêtre glissante des N unités passées. Les unités acceptées sont listées ci-dessous. Le début et la fin avancent avec le temps. Par exemple, **3 mois** (les 3 derniers mois). Pour créer une fenêtre croissante où la fin reste à « maintenant », utilisez la syntaxe `to now` (par exemple, `10am to now`). Pour plus d'informations, consultez [Fenêtres temporelles croissantes](#growing-time-frames). |

Les chaînes suivantes sont acceptées pour tout `{unit}` dans une date relative :

- Minutes : `m`, `min`, `mins`, `minute`, `minutes`
- Heures : `h`, `hr`, `hrs`, `hour`, `hours`
- Jours : `d`, `day`, `days`
- Semaines : `w`, `week`, `weeks`
- Mois : `mo`, `mos`, `mon`, `mons`, `month`, `months`

### Fenêtres temporelles croissantes {#growing-time-frames}

Les fenêtres temporelles croissantes ont un début fixe et s'étendent automatiquement jusqu'à l'heure actuelle (« maintenant »). Elles sont utiles lorsque vous souhaitez voir toute l'activité depuis un point spécifique dans le temps.

{{< img src="dashboards/guide/custom_time_frames/custom_growing_time_frame.mp4" alt="Saisissez une fenêtre temporelle croissante personnalisée" video="true" width="500" >}}

| Format          | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `{date} to now` | Une fenêtre temporelle croissante de `{date}` jusqu'à maintenant. Par exemple, **1er janv. jusqu'à maintenant**.                                    |
| `{date} - now`  | Équivalent à `{date} to now`. Par exemple, **1er janv. - maintenant**.                                                |
| `since {date}`  | Équivalent à `{date} to now`. Par exemple, **depuis le 1er juin**, **depuis 5h**, **depuis 1549116000**.            |
| `from {date}`   | Équivalent à `{date} to now`. Par exemple, **depuis le 1er juin**, **depuis 5h**.                                    |

Le `{date}` dans les deux formats accepte l'un des éléments suivants :

- Abréviations relatives (par exemple, `5h`, `2d`, `3w`)
- Dates fixes (par exemple, `Jun 1`, `Feb 2 2pm`, `1/15/2024`)
- Les timestamps Unix en secondes ou millisecondes (par exemple, `1549116000`, `1549116000000`)

### Dates alignées sur le calendrier {#calendar-aligned-dates}

Les dates alignées sur le calendrier s'alignent sur les limites du calendrier (comme minuit, le début de la semaine et le début du mois) et se mettent à jour en conséquence au fur et à mesure que le temps passe.

| Format            | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `today`           | Le jour calendaire actuel jusqu'à présent                                                |
| `yesterday`       | Le jour calendaire complet précédent                                                        |
| `week to date`    | La semaine actuelle de 00h00 lundi jusqu'à présent                                       |
| `month to date`   | Le mois actuel du 1er jusqu'à présent                                          |
| `year to date`    | L'année actuelle du 1er janvier jusqu'à présent                                         |
| `this {unit}`     | L'unité calendaire actuelle jusqu'à présent. Par exemple, **ce mois-ci**, **cette année**   |
| `last {unit}`     | L'unité calendaire complète précédente. Par exemple, **le mois dernier**, **l'année dernière**           |
| `previous {unit}` | Équivalent à `last {unit}`. Par exemple, **la semaine précédente**, **le mois précédent**       |
| `N {units} ago`   | L'unité calendaire complète N périodes en arrière. Par exemple, **il y a 2 semaines**, **il y a 3 mois** |

## URLs {#urls}

Vous pouvez transmettre des requêtes temporelles dans l'URL d'un dashboard.

Prenons l'exemple d'URL de dashboard suivant :

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

- Le paramètre `from_ts` est le timestamp Unix en millisecondes du début de la requête. Par exemple, `1683518770980`.
- Le paramètre `to_ts` est le timestamp Unix en millisecondes de la fin de la requête. Par exemple, `1683605233205`.
- `live=true` indique que les spécifications de temps relatives sont conservées lorsqu'une requête est enregistrée ou partagée. Vous pouvez également utiliser `live=false`.