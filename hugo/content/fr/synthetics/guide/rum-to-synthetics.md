---
further_reading:
- link: https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/
  tag: Blog
  text: Créez des tests de navigateur directement à partir d'une Session Replay Datadog
    RUM
- link: synthetics/browser_tests
  tag: Documentation
  text: Configurer un test de navigateur
- link: real_user_monitoring/application_monitoring/browser
  tag: Documentation
  text: Surveillance Browser avec RUM
title: Générez des tests de navigateur Synthetic à partir d'une Session Replay RUM
  de Datadog
---
## Présentation {#overview}

[Real User Monitoring (RUM)][1] vous offre une visibilité de bout en bout sur l'activité et l'expérience en temps réel des utilisateurs individuels. Les [tests de navigateur Synthetic][2] vous permettent d'observer les performances de vos systèmes et applications à l'aide de requêtes et d'actions simulées provenant du monde entier.

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Générez un test de navigateur avec votre modal Session Replay" style="width:70%" >}}

Vous pouvez créer des tests de navigateur Synthetic à partir de vos Session Replays dans RUM pour suivre les performances en fonction du comportement réel des utilisateurs.

## Générez un test à partir d'une Session Replay {#generate-a-test-from-a-session-replay}

Accédez à l'[Explorer RUM][3] et sélectionnez une session avec une [Session Replay][4] disponible à partir de laquelle vous souhaitez créer un test de navigateur. Cliquez sur {{< ui >}}Generate Synthetic Browser Test{{< /ui >}} au-dessus de la chronologie des événements. 

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="Une session utilisateur dans l'Explorer RUM" style="width:100%" >}}

Cela clone automatiquement les événements capturés lors d'une Session Replay, tels que les clics utilisateur et les chargements de page, en étapes individuelles pour un nouveau test de navigateur. 

Par exemple, dans la capture d'écran suivante, le test de navigateur généré a cloné la session d'un utilisateur sur la page d'achat, y compris sa navigation vers celle-ci et son clic sur le bouton {{< ui >}}Add to cart{{< /ui >}}. 

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="Enregistreur de test de navigateur rempli automatiquement avec les données RUM" style="width:100%" >}}

Personnalisez davantage vos tests et vos étapes de test pour répondre à vos besoins, tout comme vous le feriez pour [n'importe quel autre test de navigateur][6]. Par exemple, vous pouvez ajouter des [étapes de test][5] supplémentaires (telles que des assertions), ajuster la fréquence d'exécution de votre test et personnaliser sa notification.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: /fr/synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /fr/session_replay/
[5]: /fr/synthetics/browser_tests/test_steps
[6]: /fr/synthetics/browser_tests/?tab=requestoptions#test-configuration