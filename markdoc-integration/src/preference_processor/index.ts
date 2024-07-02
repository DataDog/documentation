import {
    ContentVariables,
    YAMLVariableConfig,
    ParamsConfig,
    PageDataManifest,
    ContentVariablesSchema,
    PageDataManifestSchema,
    YAMLVariableConfigSchema
} from './schemas';

import yaml from 'js-yaml';

function loadVarsYamlFromStr(yamlFileContent: string): YAMLVariableConfig {
    const parsedYaml = yaml.load(yamlFileContent) as YAMLVariableConfig;
    return YAMLVariableConfigSchema.parse(parsedYaml);
}

export async function buildContentVariablesFromStr(yamlStr: string): Promise<ContentVariables> {
    // Load and validate the YAML definition file
    const validatedYAML = loadVarsYamlFromStr(yamlStr);

    // Populate the content variables object
    const contentVariables: ContentVariables = {};
    for (const [variableID, variableConfig] of Object.entries(validatedYAML)) {
        const defaultOption = variableConfig.options.find((option) => option.default);

        if (!defaultOption) {
            throw new Error(`No default value found for variable ${variableID} during YAML parse.`);
        }

        contentVariables[variableID] = {
            id: variableID,
            display_name: variableConfig.display_name,
            syncs_with_user_attribute: variableConfig.syncs_with_user_attribute,
            options: variableConfig.options.map((option) => ({
                id: option.id.toString(),
                display_name: option.display_name.toString()
            })),
            default_value: defaultOption.id.toString()
        };
    }

    // Validate the content variables object
    ContentVariablesSchema.parse(contentVariables);

    return contentVariables;
}

// TODO: Run some validations only in development mode
const BRACKETED_PLACEHOLDER_REGEX = /<([a-z0-9_]+)>/;
const GLOBAL_BRACKETED_PLACEHOLDER_REGEX = /<([a-z0-9_]+)>/g;
export function buildPageDataManifest(p: {
    paramsConfig: ParamsConfig;
    contentVariables: ContentVariables;
    url: URL;
}): PageDataManifest {
    const pageDataManifest: PageDataManifest = {
        resolvedUrl: JSON.parse(JSON.stringify(p.url.origin + p.url.pathname)) + '?',
        paramToVarMapping: {},
        valuesByParamName: {},
        selectionDisplayTextByParamName: {},
        contentVariables: {}
    };

    // Assign values to variables, and build the chooser data
    p.paramsConfig.forEach((param) => {
        // Replace any bracketed placeholders with the actual param value
        let variableIdentifier = JSON.parse(JSON.stringify(param.options_source));

        // TODO: Verify ALL possible outcomes for the placeholder as valid content variables.
        // Since the referenced param could also have a placeholder, this should be a recursive process.

        variableIdentifier = variableIdentifier.replace(
            GLOBAL_BRACKETED_PLACEHOLDER_REGEX,
            (_match: string, paramName: string) => {
                const value = pageDataManifest.valuesByParamName[paramName];
                if (!value) {
                    throw new Error(
                        `The placeholder [${paramName}] is invalid. Make sure that '${paramName}' is spelled correctly, and that the '${paramName}' parameter is defined in the params list before it is referenced as [${paramName}].`
                    );
                }
                return value;
            }
        );

        // Validate that the variable exists and has a default value
        // TODO: This logic should be part of a separate validation process
        // that doesn't run every time the page is loaded
        const variable = p.contentVariables[variableIdentifier];
        if (!variable || !variable.default_value) {
            throw new Error(`No default value found for variable ${variableIdentifier}`);
        }

        // If a VALID value is available in the provided URL, use it
        const optionId = p.url.searchParams.get(param.name);
        let resolvedValue: string;
        if (optionId && variable.options.map((option) => option.id).includes(optionId)) {
            resolvedValue = optionId;
            // Or, if a VALID local default value was set by the page, use that
        } else if (param.default_value && variable.options.map((option) => option.id).includes(param.default_value)) {
            resolvedValue = param.default_value;
            // Otherwise use the sitewide default value for the variable
        } else {
            resolvedValue = variable.default_value;
        }

        pageDataManifest.valuesByParamName[param.name] = resolvedValue;

        // Populate the selection display text
        pageDataManifest.selectionDisplayTextByParamName[param.name] =
            variable.options.find((option) => option.id === resolvedValue)?.display_name || '';

        pageDataManifest.resolvedUrl += `${pageDataManifest.resolvedUrl.endsWith('?') ? '' : '&'}${param.name}=${
            pageDataManifest.valuesByParamName[param.name]
        }`;
        pageDataManifest.paramToVarMapping[param.name] = variableIdentifier;
        pageDataManifest.contentVariables[variableIdentifier] = variable;
    });

    // Validate the page data manifest
    PageDataManifestSchema.parse(pageDataManifest);

    return pageDataManifest;
}
