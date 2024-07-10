#!/usr/bin/env python3
import glob
import json
import os
import re
from itertools import chain
from datetime import date
import yaml
import logging
from pathlib import Path
from jinja2 import Environment, Template, select_autoescape, Undefined
from jinja2.loaders import DictLoader

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING)

TEMPLATE = """\
---
{front_matter}
---

{content}
"""


class SilentUndefined(Undefined):
    def _fail_with_undefined_error(self, *args, **kwargs):
        return None

nop = lambda *a, **k: None

def load_templated_file(f):
    # read without the import first line
    f.seek(0)
    content_without_import = ''.join(f.readlines()[1:])
    env = Environment(
        undefined=SilentUndefined,
        loader=DictLoader(dict()),
        autoescape=select_autoescape(),
        variable_start_string="{@",
        variable_end_string="@}"
    )
    template = env.from_string(content_without_import)
    data = yaml.safe_load(template.render(fim={'watch_files': nop}))
    return data

def update_global_aliases(index_path, global_aliases):
    content = ''
    new_yml = {}
    boundary = re.compile(r'^-{3,}$', re.MULTILINE)
    with open(index_path, 'r') as f:
        content = f.read()
    split = boundary.split(content, 2)
    _, fm, content = split
    new_yml = yaml.safe_load(fm)
    fm_aliases = list(set(new_yml.get("aliases", []) + global_aliases))
    new_yml['aliases'] = fm_aliases
    with open(index_path, mode='w', encoding='utf-8') as out_file:
        output_content = TEMPLATE.format(front_matter=yaml.dump(new_yml, default_flow_style=False).strip(),
                        content=content.strip())
        out_file.write(output_content)

def security_rules(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    logger.info("Starting security rules action...")
    global_aliases = []
    source_comment = f"<!--  SOURCED FROM https://github.com/DataDog/{content['repo_name']} -->\n\n"

    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):
        data = None

        if "deprecated" in file_name:
            continue

        if file_name.endswith(".json"):
            with open(file_name, mode="r+") as f:
                try:
                    data = json.loads(f.read())
                except:
                    logger.warn(f"Error parsing {file_name}")
        elif file_name.endswith(".yaml"):
            with open(file_name, mode="r+") as f:
                try:
                    file_text_content = f.read()
                    if 'jinja2' in file_text_content:
                        data = load_templated_file(f)
                    else:
                        data = yaml.safe_load(file_text_content)
                except:
                    logger.warn(f"Error parsing {file_name}")

        if not data:
            continue

        p = Path(f.name)
        message_file_name = p.with_suffix('.docs.md')
        if not message_file_name.exists():
            message_file_name = p.with_suffix('.md')
            if not message_file_name.exists():
                continue

        # get path relative to the repo root for comparisons
        relative_path = str(p.parent).split(f"/{content['repo_name']}/")[1]

        is_enabled = bool(data.get("isEnabled", True))
        is_beta = bool(data.get("isBeta", False))

        # Logic for when to remove a rule.
        # 1. if rule is restricted to orgs as It's likely not public. The exception being if it's a rule in beta
        is_restricted_and_not_beta = (len(data.get('restrictedToOrgs', [])) > 0 and not is_beta)
        # 2. if we past the deprecation date we should remove
        # we don’t set isDeleted to true for 15months either due to the retention period on signals when we deprecate a rule.
        # If we did, the customer’s signals would disappear sooner than the retention time period.
        deprecation_date = data.get('deprecationDate', None)
        is_past_deprecation_date = date(*[int(x) for x in deprecation_date.split('-')]) < date.today() if deprecation_date else False
        # 3. general flags we should respect for removal. At least one true to cause removal
        is_removed = (data.get('isShadowDeployed', False) or data.get('isDeleted', False) or data.get('isDeprecated', False))
        # 4. If rule not enabled and under posture-management/infrastructure-monitoring directory lets remove the rule
        # this is to cover the case where some rules were inherited that haven't been evaluated completely..
        is_disabled_and_infra = not is_enabled and 'posture-management' in relative_path

        if is_restricted_and_not_beta or is_removed or is_past_deprecation_date or is_disabled_and_infra:
            if p.exists():
                logger.info(f"removing file {p.name}")
                global_aliases.append(f"/security/default_rules/{p.stem}")
                p.unlink()
            else:
                logger.info(f"skipping file {p.name}")
            continue

        # The message of a detection rule is located in a Markdown file next to the rule definition
        with open(str(message_file_name), mode="r+") as message_file:
            message = source_comment + message_file.read()

            # strip out [text] e.g "[CIS Docker] Ensure that.." becomes "Ensure that..."
            parsed_title = re.sub(r"\[.+\]\s?(.*)", "\\1", data.get('name', ''), 0, re.MULTILINE)
            page_data = {
                "title": parsed_title,
                "type": "security_rules",
                "disable_edit": True,
                "default_rule_id": data.get('defaultRuleId', '').strip(),
                "aliases": [
                    # f"{data.get('defaultRuleId', '').strip()}",
                    # f"/security_monitoring/default_rules/{data.get('defaultRuleId', '').strip()}",
                    f"/security_monitoring/default_rules/{p.stem.lower()}"
                ],
                "rule_category": [],
                "integration_id": "",
                "is_beta": is_beta
            }

            # lets build up this categorization for filtering purposes

            tags = data.get('tags', [])
            # add to 'rule_category' list
            if any(sub_path in relative_path for sub_path in ['security-monitoring', 'cloud-siem']):
                if 'signal-correlation/production' in relative_path:
                    page_data['rule_category'].append('Cloud SIEM (Signal Correlation)')
                else:
                    page_data['rule_category'].append('Cloud SIEM (Log Detection)')

            if 'posture-management' in relative_path:
                if 'cloud-configuration' in relative_path:

                    if tags and 'dd_rule_type:combination' in tags:
                        page_data['rule_category'].append('Attack Paths')
                    elif tags and 'dd_rule_type:ciem' in tags:
                        page_data['rule_category'].append('CSM Identity Risks')
                    else:
                        page_data['rule_category'].append('CSM Misconfigurations (Cloud)')


                if 'infrastructure-configuration' in relative_path:
                    page_data['rule_category'].append('CSM Misconfigurations (Infra)')

            if 'workload-security' in relative_path:
                page_data['rule_category'].append('CSM Threats')

            if 'application-security' in relative_path:
                page_data['rule_category'].append('Application Security')

            if tags:
                # add 'tags' as frontmatter
                for tag in tags:
                    if ':' in tag:
                        key, value = tag.split(':')
                        page_data[key] = value
                if data.get('source', ''):
                    page_data["source"] = data.get('source', '')
            else:
                # try build up manually
                source = data.get('source', None)
                tech = data.get('framework', {}).get('name', '').replace('cis-', '')
                page_data["source"] = source or tech
                page_data["security"] = "compliance"
                page_data["framework"] = data.get('framework', {}).get('name', '')
                page_data["control"] = data.get('control', '')
                page_data["scope"] = tech

            # Hardcoded rules in cloud siem which can span several different log sources do not include a source tag
            if any(sub_path in relative_path for sub_path in ['security-monitoring', 'cloud-siem']):
                is_hardcoded = not page_data.get("source", None)
                if is_hardcoded:
                    page_data["source"] = "multi Log Sources"

            # lowercase them
            if page_data.get("source", None):
                page_data["source"] = page_data["source"].lower()
            if page_data.get("scope", None):
                page_data["scope"] = page_data["scope"].lower()

            # integration id
            page_data["integration_id"] = page_data.get("scope", None) or page_data.get("source", "")
            cloud = page_data.get("cloud", None)
            if cloud and cloud == 'aws':
                page_data["integration_id"] = "amazon-{}".format(page_data["integration_id"])

            # Deeplinks to in-app rules
            if page_data['rule_category'][0] == "Application Security":
                # App Sec
                page_data["view_rule_url"] = f"https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRuleId%3A{page_data['default_rule_id']}"
                page_data["view_findings_url"] = f"https://app.datadoghq.com/security?query=%40workflow.rule.defaultRuleId%3A{page_data['default_rule_id']}"
            elif page_data['rule_category'][0] in ["Cloud SIEM (Log Detection)", "Cloud SIEM (Signal Correlation)"]:
                # Cloud SIEM
                page_data["view_rule_url"] = f"https://app.datadoghq.com/security/configuration/siem/rules?query=type%3A%28log_detection%20OR%20signal_correlation%29%20defaultRuleId%3A{page_data['default_rule_id']}%20&deprecated=hide&groupBy=tactic&product=siem"
                page_data["view_findings_url"] = f"https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29%20%40workflow.rule.defaultRuleId%3A{page_data['default_rule_id']}%20&column=time&order=desc&product=siem&viz=stream"
            elif page_data['rule_category'][0] == "CSM Threats":
                # CSM Threats
                page_data["view_rule_url"] = f"https://app.datadoghq.com/security/configuration/workload/rules?query=type%3Aworkload_security%20defaultRuleId%3A{page_data['default_rule_id']}%20&deprecated=hide&groupBy=tactic&product=cws&sort=rule_name"
                page_data["view_findings_url"] = f"https://app.datadoghq.com/security?query=%40workflow.rule.defaultRuleId%3A{page_data['default_rule_id']}%20&column=time&order=desc"
            elif page_data['rule_category'][0] in [ "CSM Identity Risks", "CSM Misconfigurations (Cloud)", "CSM Misconfigurations (Infra)", "Attack Paths"]:
                # CSM Identity Risks, CSM Misconfigurations, Attack Paths
                page_data["view_rule_url"] = f"https://app.datadoghq.com/security/configuration/compliance/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29%20defaultRuleId%3A{page_data['default_rule_id']}%20&deprecated=hide&groupBy=framework&product=cspm&sort=rule_name"
                if page_data['rule_category'][0] != "Attack Paths":
                    if "CSM Misconfigurations" in page_data['rule_category'][0]:
                        page_data["view_findings_url"] = f"https://app.datadoghq.com/security/compliance?query=%40workflow.rule.defaultRuleId%3A{page_data['default_rule_id']}%20&aggregation=resources&column=status&order=asc&sort=ruleSeverity%2CfailedResources-desc"
                    else:
                        page_data["view_findings_url"] = f"https://app.datadoghq.com/security/identities?query=%40workflow.rule.defaultRuleId%3A{page_data['default_rule_id']}%20&aggregation=resources&column=status&order=asc&sort=ruleSeverity%2CfailedResources-desc"


            front_matter = yaml.dump(page_data, default_flow_style=False).strip()
            output_content = TEMPLATE.format(front_matter=front_matter, content=message.strip())

            dest_dir = Path(f"{content_dir}{content['options']['dest_path']}")
            dest_dir.mkdir(exist_ok=True)
            dest_file = dest_dir.joinpath(p.name).with_suffix('.md')
            logger.info(dest_file)
            with open(dest_file, mode='w', encoding='utf-8') as out_file:
                out_file.write(output_content)

    # add global aliases from deleted files to _index.md
    if os.environ.get('CI_ENVIRONMENT_NAME', '') in ('live', 'preview'):
        index_path = Path(f"{content_dir}{content['options']['dest_path']}_index.md")
        update_global_aliases(index_path, global_aliases)
