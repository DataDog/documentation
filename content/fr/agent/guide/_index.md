---
cascade:
  algolia:
    category: Guide
    rank: 70
    subcategory: Guides de l'Agent
description: Collection de guides complets couvrant la configuration, l'installation,
  le dépannage et les fonctions avancées de l'Agent Datadog.
disable_toc: true
private: true
title: Guides de l'Agent
---

{{< header-list header="Configuration guides" >}}
    {{< nextlink href="agent/guide/setup_remote_config" >}}Mettre en place une configuration à distance pour Fleet Automation{{< /nextlink >}}
    {{< nextlink href="agent/guide/environment-variables" >}}Variables d'environnement de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/datadog-disaster-recovery" >}}Reprise après sinistre de Datadog{{< /nextlink >}}

    {{< nextlink href="agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity" >}}Installation de Agent sur un serveur avec une connectivité internet limitée{{< /nextlink >}}
    {{< nextlink href="agent/guide/ansible_standalone_role/" >}}Mettre en place Ansible en utilisant un rôle Datadog autonome{{< /nextlink >}}
    {{< nextlink href="agent/guide/how-do-i-uninstall-the-agent" >}}Comment désinstaller l'Agent ?{{< /nextlink >}}
    {{< nextlink href="agent/guide/Linux-key-rotation-2024" >}}Rotation des clés Linux 2024{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Windows guides" >}}
    {{< nextlink href="agent/guide/datadog-agent-manager-windows" >}}Datadog Agent Manager pour Windows{{< /nextlink >}}
    {{< nextlink href="agent/guide/windows-agent-ddagent-user" >}}Utilisateur de l'Agent Datadog pour Windows{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Cloud infrastructure guides" >}}
    {{< nextlink href="agent/guide/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/" >}}Est-il possible de configurer le check dd-agent/MySQL sur mon Google Cloud SQL ?{{< /nextlink >}}
    {{< nextlink href="/agent/guide/heroku-ruby" >}}Instrumenter une application Ruby on Rails sur Heroku avec Datadog{{< /nextlink >}}
    {{< nextlink href="agent/guide/heroku-troubleshooting/" >}}Dépannage du buildpack Datadog-Heroku{{< /nextlink >}}
    {{< nextlink href="agent/guide/private-link" >}}Transmettre de façon sécurisée vos données de télémétrie via AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="agent/guide/azure-private-link" >}}Se connecter à Datadog via Liaison Privée Azure{{< /nextlink >}}
    {{< nextlink href="agent/guide/why-should-i-install-the-agent-on-my-cloud-instances" >}}Pourquoi installer l'Agent Datadog sur mes instances cloud ?{{< /nextlink >}}
    {{< nextlink href="agent/guide/gcp-private-service-connect" >}}Se connecter à Datadog via GCP Private Service Connect{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Integration guides" >}}
    {{< nextlink href="agent/guide/use-community-integrations" >}}Utiliser les intégrations de la communauté{{< /nextlink >}}
    {{< nextlink href="agent/guide/integration-management" >}}Gestion des intégrations{{< /nextlink >}}
{{< /header-list >}}

{{< whatsnext desc="Agent versioning guides:" >}}
    {{< nextlink href="agent/guide/version_differences" >}}Différences des versions de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_agent_fleet_automation" >}} Mettez à jour votre Agent Datadog {{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-v6-python-3" >}}Gestion des versions de Python : Utiliser Python 3 avec l’Agent v6 de Datadog{{< /nextlink >}}
    {{< nextlink href="agent/guide/python-3" >}}Migration de checks custom de Python 2 vers Python 3{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 6 guides" >}}
    {{< nextlink href="agent/guide/install-agent-6" >}}Installer la version 6 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-commands" >}}Commandes la version 6 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-configuration-files" >}}Fichiers de configuration de la version 6 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-log-files" >}}Fichiers de log de la version 6 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_to_agent_6" >}}Mise à niveau vers la version 6 de l'Agent{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 5 guides" >}}
    {{< nextlink href="agent/guide/agent-5-architecture" >}}Architecture de la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-commands" >}}Commandes de la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-configuration-files" >}}Fichiers de configuration de la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-log-files" >}}Fichiers de log de la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/install-agent-5" >}}Installer la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-ports" >}}Ports de la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-proxy" >}}Configuration du proxy pour la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-flare" >}}Envoyer un flare avec la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-autodiscovery" >}}Autodiscovery dans la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-kubernetes-basic-agent-usage" >}}Utilisation basique de l'Agent avec Kubernetes pour la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-check-status" >}}Dépannage un check de l'Agent avec la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-permissions-issues" >}}Problèmes d'autorisation avec la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-debug-mode" >}}Mode de débogage avec la version 5 de l'Agent{{< /nextlink >}}
    {{< nextlink href="agent/guide/dogstream" >}}Dogstream{{< /nextlink >}}
{{< /header-list >}}