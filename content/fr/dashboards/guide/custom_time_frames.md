---
title: Intervalles personnalisés
---

De nombreuses vues dans Datadog peuvent être filtrées en fonction d'un intervalle de temps spécifique. Les contrôles de temps comprennent une liste d'intervalles de temps courants et un sélecteur de date permettant une sélection rapide.

Pour incrémenter un intervalle par mois, par jour, par année, par heure ou par minute, sélectionnez un élément de l'intervalle de temps et utilisez les touches `[↑]` et `[↓]` :

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="Incrémenter l'intervalle avec les touches fléchées" video="true" width="500" >}}

Vous pouvez également saisir ou coller des dates et timestamps personnalisés, y compris ceux copiés à partir d'autres pages Datadog :

{{< img src="dashboards/guide/custom_time_frames/copy_and_paste.mp4" alt="Copier et coller un intervalle" video="true" >}}

Les intervalles de temps personnalisés fixes et relatifs sont pris en charge :

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="Saisir un intervalle personnalisé fixe" video="true" width="500" >}}

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="Saisir un intervalle personnalisé relatif" video="true" width="500" >}}

**Remarque** : l'exécution des requêtes est basée sur le fuseau UTC, mais la sélection de l'intervalle se fait dans votre navigateur. De plus, vous pouvez choisir d'afficher le fuseau horaire par défaut ou le fuseau UTC dans les [paramètres du dashboard][1].

## Syntaxes prises en charge

### Dates fixes

| Format                       | Exemples                                         |
|------------------------------|--------------------------------------------------|
| `{MMM/MMMM} D`               | Jan 1<br>January 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | Jan 1, 1:00 pm<br>January 1, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | Jan 1, 2019, 1:00 pm<br>January 1, 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| Timestamp en secondes Unix       | 1577883600                                       |
| Timestamp en millisecondes Unix  | 1577883600000                                    |

* N'importe quelle date fixe peut être saisie pour spécifier un intervalle. Exemples :
  * `1577883600 - 1578009540`
  * `Jan 1 - Jan 2`
  * `6:00 am - 1:00 pm`

### Dates relatives

| Format       | Exemples                                                                         | Remarques                                                     |
|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------|
| `N{unit}`    | 3m<br>3 min<br>3h<br>3 hours<br>3d<br>3 days<br>3w<br>3 weeks<br>3mo<br>3 months | Affiche les N dernières unités, par exemple les 3 derniers mois |
| `today`      |                                                                                  | Affiche le jour calendaire en cours           |
| `yesterday`  |                                                                                  | Affiche l'intégralité du jour calendaire précédent                   |
| `this month` |                                                                                  | Affiche le mois calendaire en cours         |
| `last month` |                                                                                  | Affiche l'intégralité du mois calendaire précédent                 |
| `this year`  |                                                                                  | Affiche l'année calendaire en cours          |
| `last year`  |                                                                                  | Affiche l'intégralité de l'année calendaire précédente                  |

* Les chaînes suivantes sont acceptées pour n'importe quelle `{unit}` dans une date relative :
  * Minutes : `m`, `min`, `mins`, `minute`, `minutes`
  * Heures : `h`, `hr`, `hrs`, `hour`, `hours`
  * Jours : `d`, `day`, `days`
  * Semaines : `w`, `week`, `weeks`
  * Mois : `mo`, `mos`, `mon`, `mons`, `month`, `months`
* Les intervalles `today`, `yesterday`, `this month`, `this year` et `last year` sont calculés lors de leur saisie. Ils ne sont pas mis à jour à mesure que le temps passe.

## URL

Vous pouvez transmettre des requêtes temporelles dans l'URL d'un dashboard.

Prenons l'exemple d'URL de dashboard suivant :

```
https://app.datadoghq.com/dash/host/<ID_DASHBOARD>?from_ts=<DÉBUT_REQUÊTE>&to_ts=<FIN_REQUÊTE>&live=true
```

* Le paramètre `from_ts` correspond au timestamp Unix en millisecondes représentant l'heure de début de la requête. Exemple : `1683518770980`.
* Le paramètre `to_ts` correspond au timestamp Unix en millisecondes représentant l'heure de fin de la requête. Exemple : `1683605233205`.
* `live=true` indique que les spécifications temporelles relatives sont conservées lorsqu'une requête est enregistrée ou partagée. Il est également possible de définir ce paramètre sur `live=false`.

[1]: /fr/dashboards/#display-utc-time