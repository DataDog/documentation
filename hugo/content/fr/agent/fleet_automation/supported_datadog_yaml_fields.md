---
description: Référence des champs de configuration de l'Agent pris en charge par Fleet
  Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: Documentation
  text: Configurer les Agents
- link: /api/latest/fleet-automation/
  tag: Documentation
  text: API Fleet Automation
site_support_id: fleet-automation-standard-features
title: Champs de configuration de datadog.yaml pris en charge
---
Fleet Automation prend en charge un sous-ensemble de `datadog.yaml` champs lorsque vous [configurez des Agents][1]. Chaque modification que vous fournissez est validée par rapport à un schéma, et tout champ non répertorié ici est rejeté avec une erreur de validation de schéma.

Développez une section ci-dessous pour voir chaque champ pris en charge avec son type, sa description et ses valeurs valides.

{{% fa-config-fields %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/fleet_automation/configure_agents/