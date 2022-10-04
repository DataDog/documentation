---
aliases:
- /fr/agent/faq/upgrade-between-agent-minor-versions
- /fr/agent/guide/upgrade-between-agent-minor-versions
kind: documentation
title: Passer d'une version mineure de l'Agent Datadog à une autre
---

## Passer d'une version mineure de l'Agent 6 à une version mineure de l'Agent 7

{{< tabs >}}
{{% tab "Linux" %}}

Pour passer d'une version mineure de l'Agent 6 à une version mineure de l'Agent 7, il est recommandé d'installer le script `install_script.sh`. Les commandes suivantes fonctionnent sur l'ensemble des distributions Linux.

Passer à une version mineure précise de l'Agent 6 :

: `DD_AGENT_MAJOR_VERSION=6 DD_AGENT_MINOR_VERSION=<version_mineure_cible> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Passer à la dernière version mineure de l'Agent 6 :

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Passer à une version mineure précise de l'Agent 7 :

: `DD_AGENT_MAJOR_VERSION=7 DD_AGENT_MINOR_VERSION=<version_mineure_cible> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Passer à la dernière version mineure de l'Agent 7 :

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

Téléchargez et installez le package d'installation de la version spécifique.

URL permettant de télécharger une version mineure spécifique de l'Agent 6 :

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<version_mineure>.<version_correction>.msi`

URL permettant de télécharger une version mineure spécifique de l'Agent 7 :

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<version_mineure>.<version_correction>.msi`

{{% /tab %}}
{{% tab "macOS" %}}

**Remarque** : il n'est pas possible de passer à une version mineure spécifique.

Commande à utiliser pour passer à la dernière version mineure de l'Agent 6 :

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

Commande à utiliser pour passer à la dernière version mineure de l'Agent 7 :

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}