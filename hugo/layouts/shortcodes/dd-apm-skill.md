{{- partial "skill-callout.html" (dict
    "title" "Set up APM with an agent"
    "text" "Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    "command" "npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y"
    "action_name" "copy_dd_apm_skill_install_cmd"
) -}}
