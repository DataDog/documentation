---
description: Analysez les problèmes d'Error Tracking avec Bits Investigation pour
  déterminer la cause première et l'impact d'une erreur.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentation
  text: Découvrez Bits Investigation
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: Documentation
  text: Discussion avec Bits Investigation
- link: /bits_ai/bits_code/
  tag: Documentation
  text: Générez des correctifs de code avec Bits Code
- link: /source_code/
  tag: Documentation
  text: Configurez Source Code Integration
title: Étudiez les erreurs avec Bits AI
---
{{< callout url="#" btn_hidden="true" header="Preview" >}}
Bits Investigation dans Error Tracking est en Preview.
{{< /callout >}}

## Présentation {#overview}

[Bits Investigation][1] est un agent IA autonome qui étudie les problèmes de production. Lorsque vous démarrez une investigation à partir d'un problème d'Error Tracking, Bits analyse l'erreur, y compris sa trace de pile et la télémétrie associée. Si vous configurez [Source Code Integration][3], Bits analyse également votre code source. Il rapporte ensuite la cause première probable et l'impact du problème.

Pour lister toutes les investigations déclenchées depuis Error Tracking, ouvrez [Investigations][9] et filtrez sur {{< ui >}}Source{{< /ui >}} : {{< ui >}}Error Tracking Issue{{< /ui >}}.

## Prérequis {#prerequisites}

- Pour afficher les investigations, vous avez besoin de l'[autorisation {{< ui >}}Bits Investigations Read{{< /ui >}}][2]. Pour démarrer des investigations, vous avez besoin de l'[autorisation {{< ui >}}Bits Investigations Write{{< /ui >}}][2].
- Pour permettre à Bits de lire le code qui s'exécutait lorsque l'erreur s'est produite, configurez [Source Code Integration][3]. Bits peut enquêter sans accès au code source, mais l'analyse de la cause première est moins précise.
- Pour générer des correctifs de code, configurez [Bits Code][8], qui nécessite un accès en écriture à votre dépôt et l'[autorisation {{< ui >}}Bits Code Write{{< /ui >}}][2].

## Étudier un problème d'Error Tracking {#investigate-an-error-tracking-issue}

Pour étudier un problème d'Error Tracking avec Bits Investigation :

1. Dans l'[Error Tracking Explorer][4], cliquez sur un problème pour ouvrir le panneau du problème.
1. Dans l'onglet {{< ui >}}Review{{< /ui >}}, cliquez sur {{< ui >}}Investigate this issue{{< /ui >}} dans la bannière {{< ui >}}Bits Investigation{{< /ui >}}.

   {{< img src="error_tracking/bits_investigation/start_investigation.png" alt="La bannière Bits Investigation dans l'onglet Review d'un problème d'Error Tracking, avec le bouton Investigate this issue." style="width:100%;" >}}

   Pendant le déroulement de l'investigation, la bannière affiche sa progression et qui l'a déclenchée. Une investigation prend généralement quelques minutes.
1. Une fois l'investigation terminée, examinez les conclusions dans la bannière :

   - **Root cause** : la cause la plus probable de l'erreur, d'après les éléments recueillis par Bits.
   - **Impact** : la façon dont l'erreur affecte vos utilisateurs et vos services.

   Pour une investigation terminée, la bannière affiche la cause première et l'impact côte à côte :

   {{< img src="error_tracking/bits_investigation/investigation_summary.png" alt="L'onglet Review d'un problème d'Error Tracking, montrant la cause première et l'impact trouvés par Bits Investigation." style="width:100%;" >}}

   Si les données disponibles sont insuffisantes pour étayer une conclusion, Bits marque l'investigation comme non concluante.
1. (Facultatif) Pour voir l'investigation complète, cliquez sur {{< ui >}}View Investigation{{< /ui >}} dans la bannière.

   La page d'investigation affiche la conclusion, les prochaines étapes suggérées et une chronologie des preuves :

   {{< img src="error_tracking/bits_investigation/investigation_report.png" alt="La page Bits Investigation d'un problème d'Error Tracking, affichant la conclusion, la cause première, l'impact, une prochaine étape suggérée et la chronologie." style="width:100%;" >}}

Pour poser des questions complémentaires sur l'investigation, utilisez Bits Chat. Pour plus d'informations, consultez [Discussion avec Bits Investigation][6].

Pour plus d'informations sur la façon dont Bits parvient à sa conclusion et sur la manière d'explorer les étapes de l'investigation, consultez [Comment Bits Investigation enquête][5] dans Examinez les problèmes.

## Corrigez le problème dans le code {#fix-the-issue-in-code}

Lorsque la cause première se trouve dans votre code, Bits Investigation utilise [Bits Code][7] pour générer un correctif. Le correctif apparaît comme une prochaine étape suggérée sur la page d'investigation, avec un résumé de la modification et son diff.

Une prochaine étape proposant un correctif de code comprend des actions permettant d'ouvrir une pull request ou de continuer à travailler sur le correctif :

{{< img src="error_tracking/bits_investigation/code_fix_next_step.png" alt="Une prochaine étape suggérée avec un correctif de code généré par Bits Code, affichant un résumé, un diff et les boutons Create PR et View in Bits Code." style="width:100%;" >}}

Depuis la prochaine étape, vous pouvez :

- Cliquez sur {{< ui >}}Create PR{{< /ui >}} pour ouvrir une pull request avec le correctif.
- Cliquez sur {{< ui >}}View Full Diff{{< /ui >}} pour examiner tous les fichiers modifiés.
- Cliquez sur {{< ui >}}View in Bits Code{{< /ui >}} pour retravailler le correctif dans une session Bits Code.

Bits Code ne fusionne jamais les modifications automatiquement. Examinez et testez le code généré avant de le fusionner.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_investigation/
[2]: /fr/account_management/rbac/permissions/#bits-ai
[3]: /fr/source_code/
[4]: https://app.datadoghq.com/error-tracking
[5]: /fr/bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /fr/bits_ai/bits_investigation/chat_bits_investigation/
[7]: /fr/bits_ai/bits_code/
[8]: /fr/bits_ai/bits_code/setup/
[9]: https://app.datadoghq.com/bits-ai/investigations