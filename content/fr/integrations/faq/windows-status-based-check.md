---
kind: faq
title: Check basé sur le statut Windows
---
Ce guide décrit le processus de création d'un check basé sur le statut Windows.

1. Configurez lʼAgent à l'aide dʼAgent Manager : modifiez la configuration « Windows service » dans Agent Manager.

2. [Redémarrez l'Agent][1] à l'aide de l'Agent Manager (ou redémarrez le service).

3. Consultez la page d'information dans Agent Manager et vérifiez que le check dʼintégration est validé. Une section similaire à celle-ci devrait s'afficher :

    ```
    Checks
    ======

    [...]

    windows_service
    ---------------
        - instance #0 [OK]
        - Collected 0 metrics 0 events & 1 service check
    ```

4. Installez lʼintégration en cliquant sur « Install » [sur la page dédiée à votre application Datadog][2] :

5. Suivez [ces étapes][3] pour créer un monitor dʼintégration.

Vous devriez maintenant avoir un monitor basé sur votre intégration Windows Service.


[1]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#integrations/windows_service
[3]: /fr/monitors/types/integration/