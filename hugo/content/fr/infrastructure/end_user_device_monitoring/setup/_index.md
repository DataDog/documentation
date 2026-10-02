---
description: Configurez End User Device Monitoring pour collecter des données de performance
  et de connectivité à partir des ordinateurs de bureau et portables des employés.
further_reading:
- link: /infrastructure/end_user_device_monitoring/
  tag: Documentation
  text: End User Device Monitoring
title: Configurez End User Device Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring est en version préliminaire. Pour vous inscrire, cliquez sur <b>Request Access</b>.
{{< /callout >}}

Configurez Datadog Agent sur les ordinateurs de bureau et portables des employés pour collecter des [données End User Device Monitoring][11].

<div class="alert alert-danger">Vous devez recevoir une confirmation de l'accès à la version préliminaire avant que les données n'apparaissent dans Datadog. Après avoir soumis votre demande, attendez une confirmation d'accès avant d'effectuer les étapes de configuration ci-dessous.</div>

## Plateformes prises en charge {#supported-platforms}

- Windows 10 et versions ultérieures
- macOS 11 et versions ultérieures

## Configurez Datadog Agent {#set-up-the-datadog-agent}

1. Confirmez que vous avez reçu l'accès à la version préliminaire avant de continuer. Si vous n'avez pas reçu de confirmation, [Request Access][12] et attendez l'approbation.

2. Suivez les instructions de configuration pour votre plateforme :
    - [macOS][14]
    - [Windows][15]

## Étapes suivantes {#next-steps}

Pour collecter des données supplémentaires à partir des périphériques surveillés, activez une ou plusieurs des fonctionnalités ou intégrations suivantes :

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN integration][8]
- [Windows Crash Detection integration][9]
- [Windows Event Log][13]

## Mise en route {#getting-started}
Une fois que les périphériques commencent à apparaître, commencez à explorer les périphériques des utilisateurs finaux en :
1. **Mappez les périphériques aux utilisateurs finaux à l'aide d'une Reference Table.** Sur la page Paramètres, cliquez sur Modifier pour téléverser un mapping entre les identifiants de périphérique, tels que le nom d'hôte, et les attributs utilisateur tels que le nom, l'e-mail et l'équipe.
2. **Interrogez Bits sur l'état et les tendances des périphériques.** Ouvrez [Bits Chat][16] et posez des questions sur le parc en langage naturel. Par exemple, demandez quels périphériques utilisent le plus de CPU, quels ordinateurs portables ont une faible capacité de batterie, ou quels utilisateurs ont perdu la connectivité.
3. **Interrogation des données de périphérique avec le Datadog MCP Server.** Connectez un client IA, tel que Cursor ou Claude, au [Datadog MCP Server][17] pour récupérer les métriques, les logs et la télémétrie associée des périphériques via ce client. Consultez [Set up the Datadog MCP Server][18] pour commencer.
4. **Examinez l'état de la batterie.** Créez un dashboard avec les [métriques de batterie][20] telles que la capacité maximale, le nombre de cycles et l'état de charge pour identifier les ordinateurs portables à remplacer :
5. **Suivez la latence vers les destinations.** Configurez [Network Path][7] sur les périphériques surveillés pour mesurer la latence d'un périphérique vers une destination, telle qu'une application SaaS, et trouver le saut où le délai est introduit. Lisez [Trace network paths from user devices to SaaS applications][19] pour des exemples.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: /fr/infrastructure/process/
[6]: /fr/logs/
[7]: /fr/network_monitoring/network_path/setup/
[8]: /fr/integrations/wlan/
[9]: /fr/integrations/wincrashdetect/
[11]: /fr/infrastructure/end_user_device_monitoring/
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /fr/integrations/event-viewer/?tab=logs
[14]: /fr/infrastructure/end_user_device_monitoring/setup/macos/
[15]: /fr/infrastructure/end_user_device_monitoring/setup/windows/
[16]: /fr/bits_ai/bits_chat/
[17]: /fr/mcp_server/
[18]: /fr/mcp_server/setup/
[19]: /fr/infrastructure/end_user_device_monitoring/#trace-network-paths-from-user-devices-to-saas-applications
[20]: /fr/integrations/battery/#data-collected