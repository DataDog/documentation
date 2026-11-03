---
description: Capturez, organisez et réutilisez le contexte important lors de vos investigations
  sur les logs dans Log Explorer.
further_reading:
- link: logs/explorer/
  tag: Documentation
  text: Recherchez et analysez vos logs dans Log Explorer.
- link: logs/explorer/saved_views/
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
- link: bits_ai/bits_chat/
  tag: Documentation
  text: Posez des questions sur vos données avec le chat Bits AI
- link: notebooks/
  tag: Documentation
  text: Créez et partagez des investigations avec Notebooks.
private: false
title: Findings
---
## Présentation {#overview}

Findings vous aide à capturer, organiser et réutiliser le contexte important lors de vos investigations dans [Log Explorer][1].

Utilisez Findings pour collecter des preuves, comparer des résultats et constituer un contexte au fur et à mesure que votre investigation évolue. Enregistrez Findings en tant que points de contrôle afin de pouvoir revenir en arrière ou retourner à des requêtes et des logs utiles. Organisez Findings pour visualiser et mémoriser votre parcours d'investigation, et ajoutez des notes à Findings pour enregistrer vos observations. Vous pouvez également utiliser Findings comme contexte pour [Ask Bits][2], ou les ajouter à un [Notebook][3] pour un rapport à partager avec d'autres.

Enregistrez des lignes de logs, des visualisations et des requêtes en tant que Findings avec le bouton **Add Finding** ou le raccourci clavier **Cmd**/**Ctrl** + **S**. **Double-cliquez** ou utilisez **Open in Log Explorer** pour revenir à Findings dans Log Explorer. Abordez de nouvelles questions sans perdre le fil de vos observations antérieures ni de vos pistes d'investigation.

{{< img src="logs/explorer/findings_demo-2.mp4" alt="Démo de Findings dans Log Explorer." video=true style="width:100%;" >}}

## Findings panel {#findings-panel}

Findings apparaissent dans le panneau latéral à gauche de Log Explorer. Pour l'ouvrir :

1. Accédez à [Log Explorer][1].
2. Cliquez sur l'onglet **Findings** en haut à gauche.

Le panneau Findings est l'endroit où vous travaillez avec Findings : organisez-les, rouvrez-les dans Log Explorer et sélectionnez-les pour les envoyer ailleurs. Le panneau conserve Findings et leur mise en page lors des rechargements de page et des sessions de navigateur jusqu'à ce que vous les supprimiez.

## Capture a Finding {#capture-a-finding}

Ajoutez un Finding depuis n'importe où dans Log Explorer en appuyant sur **Cmd**/**Ctrl** + **S**. Ceci capture la requête, la page vers laquelle revenir et la plage temporelle absolue que vous consultiez. Pour renommer le titre par défaut, cliquez sur {{< ui >}}Edit{{< /ui >}} dans le coin supérieur droit de la carte Findings dans le panneau Findings. Vous pouvez également ajouter des notes à chaque Finding en bas de la carte Findings.

### Requêtes et visualisations {#queries-and-visualizations}

Dans la barre d'outils au-dessus de vos résultats, cliquez sur le bouton {{< ui >}}Add Finding{{< /ui >}} ou appuyez sur **Cmd**/**Ctrl** + **S**. Vous pouvez également cliquer sur {{< ui >}}Add current page as a finding{{< /ui >}} dans le panneau Findings.

Le bouton **Add Finding** apparaît au même endroit pour chaque visualisation.

Findings enregistre votre requête de recherche, la plage temporelle et la [visualization][4], y compris tout regroupement et agrégation que vous avez configurés.

{{< img src="logs/explorer/findings/add_finding_timeseries_viz.png" alt="Le bouton Add Finding dans la barre d'outils des résultats, avec une info-bulle indiquant le raccourci clavier." style="width:80%;" >}}

### Événements de logs individuels {#individual-log-events}

Cliquez sur un événement de log dans vos résultats pour ouvrir le [log side panel][5]. Survolez la section **Log Message** et cliquez sur le bouton {{< ui >}}Add a finding{{< /ui >}}, ou appuyez sur **Cmd**/**Ctrl** + **S**. Ceci capture l'intégralité du panneau latéral de l'événement de log pour y revenir plus tard.

La capture de l'événement de log capture également la requête ayant généré le panneau latéral de log. Le retour à un Finding rouvre le panneau latéral de log avec la requête correspondante en arrière-plan.

{{< img src="logs/explorer/findings/add_finding_log_message.png" alt="Le bouton Add Finding dans la section Log Message du panneau latéral de log." style="width:80%;" >}}

### Texte spécifique dans un log message ou dans les attributs {#specific-text-in-a-log-message-or-attributes}

Pour capturer une partie d'un log message, sélectionnez le texte dans la section **Log Message** et appuyez sur **Cmd**/**Ctrl** + **S**. Vous pouvez également sélectionner {{< ui >}}Add Finding{{< /ui >}} dans le menu contextuel qui apparaît avec le texte sélectionné.

Pour capturer des valeurs d'attribut, sélectionnez le texte et appuyez sur **Cmd**/**Ctrl** + **S**.

Dans les deux cas, Findings enregistre le texte sélectionné. Vous pouvez utiliser Findings pour revenir au panneau latéral de l'événement de log.

## Return to a Finding {#return-to-a-finding}

**Double-cliquez** sur un Finding pour y revenir dans Log Explorer, ou survolez-le et cliquez sur {{< ui >}}Open in Explorer{{< /ui >}}. Log Explorer recharge la requête, la plage temporelle et la visualisation avec lesquelles les Findings ont été capturés.

Chaque Finding conserve la requête et la plage temporelle absolue. Dans Log Explorer, vous pouvez modifier votre recherche aussi souvent que nécessaire. Revenez à n'importe quel Finding précédent sans reconstruire la requête.

## Send Findings to Bits AI and Notebooks {#send-findings-to-bits-ai-and-notebooks}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Bits AI n'est pas disponible sur le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}). Vous pouvez toujours ajouter Findings à un Notebook.
</div>
{{% /site-region %}}

Sélectionnez un ou plusieurs Findings pour agir sur eux ensemble :

- Pour poser une question à [Bits Chat][2] à leur sujet, saisissez votre question dans la barre de sélection et cliquez sur {{< ui >}}Ask Bits{{< /ui >}}. Vous pouvez également cliquer sur {{< ui >}}Ask Bits{{< /ui >}} dans le menu en bas du panneau Findings après avoir sélectionné les Findings. Bits Chat s'ouvre avec les Findings sélectionnés joints en tant que contexte.
- Pour ajouter des Findings à un [Notebook][3], cliquez sur {{< ui >}}Open in Notebooks{{< /ui >}}. Choisissez un Notebook nouveau ou existant. 

Envoyez uniquement les Findings qui se rapportent à votre question. Par exemple, si trois des huit Findings de votre panneau couvrent l'erreur sur laquelle vous vous interrogez, sélectionnez ces trois-là. Les notes sur les Findings sont également envoyées.

## Organisez vos Findings {#organize-your-findings}

Faites glisser un Finding pour le déplacer ou le redimensionner. Datadog enregistre la mise en page que vous avez créée, de sorte que l'agencement reste identique la prochaine fois que vous ouvrirez le panneau Findings.

Pour réinitialiser votre agencement, utilisez l'option d'auto-organize, qui regroupe les Findings par la requête dont ils proviennent. Si vous avez créé différentes visualisations à partir de la même requête ou enregistré des lignes de logs spécifiques à partir de cette requête, ces Findings sont regroupés. Déplacer, redimensionner ou supprimer un Finding supprime l'indication de regroupement visuel en arrière-plan.

## Delete Findings {#delete-findings}

Pour supprimer un Finding, survolez-le et cliquez sur le bouton de suppression dans le coin supérieur droit de la carte Findings. Vous pouvez également sélectionner le Finding et appuyer sur la touche **Delete**. Pour en supprimer plusieurs à la fois, sélectionnez-les et appuyez sur **Delete**. Pour sélectionner tous les Findings, appuyez sur **Cmd**/**Ctrl** + **A**.

Le bouton Clear All dans le panneau Findings supprime tous les Findings.

Pour restaurer un Finding après l'avoir supprimé, cliquez sur {{< ui >}}Undo{{< /ui >}} dans le message affiché, ou appuyez sur **Cmd**/**Ctrl** + **Z**.

## Raccourcis clavier {#keyboard-shortcuts}

| Action | Raccourci |
| ------ | -------- |
| Add a Finding | **Cmd**/**Ctrl** + **S** |
| Select all Findings | **Cmd**/**Ctrl** + **A** |
| Delete selected Findings | **Delete** |
| Undo | **Cmd**/**Ctrl** + **Z** |
| Redo | **Cmd**/**Ctrl** + **Shift** + **Z** |
| Pan | **Space** + **drag** |
| Auto-organize (by query) | **Cmd**/**Ctrl** + **O** |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/
[2]: /fr/bits_ai/bits_chat/
[3]: /fr/notebooks/
[4]: /fr/logs/explorer/visualize/
[5]: /fr/logs/explorer/side_panel/