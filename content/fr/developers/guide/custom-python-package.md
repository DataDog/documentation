---
title: Ajouter un paquet Phyton personnalisé à l'Agent
kind: documentation
aliases:
  - /fr/agent/custom_python_package
  - /fr/agent/faq/custom_python_package
further_reading:
  - link: /logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process/
    tag: Documentation
    text: Recueillir vos processus
  - link: /tracing/
    tag: Documentation
    text: Recueillir vos traces
---
{{< tabs >}}
{{% tab "Linux" %}}

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Les paquets Python peuvent être installés grâce au `pip` intégré :

```shell
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install <NOM_PAQUET>
```

{{% /tab %}}
{{% tab "macOS" %}}

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Les paquets Python peuvent être installés grâce au `pip` intégré :

```shell
sudo /opt/datadog-agent/embedded/bin/pip install <NOM_PAQUET>
```

{{% /tab %}}

{{% tab "Windows" %}}

Pour installer un paquet Python personnalisé grâce au Python intégré dans l'Agent, utilisez la commande PowerShell suivante :

Pour les versions <= 6.11 de l'Agent :

```powershell
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded\python -m pip install <NOM_PACKAGE>
```

Pour les versions >= 6.12 de l'Agent :

```powershell
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<VERSION_MAJEURE_PYTHON>\python -m pip install <NOM_PACKAGE>
```

Le paquet peut également être ajouté dans le dossier compressé de la bibliothèque, que vous trouverez dans

```powershell
%PROGRAMFILES%\Datadog\Datadog Agent\files
```

Ensuite, [redémarrez votre Agent][1].

{{< img src="agent/windows_python_package.png" alt="Paquet python pour windows" >}}

[1]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}