import { z } from 'zod';

// Snake case strings, all lowercase
export const IDENTIFIER_REGEX = /^[a-z0-9]+(_[a-z0-9]+)*$/;

export const ContentVariableOptionSchema = z
    .object({
        // The value of the option, to be used in routes and params
        id: z.string().regex(IDENTIFIER_REGEX),
        // The display name of the option in the UI
        display_name: z.string()
    })
    .strict();

export type ContentVariableOption = z.infer<typeof ContentVariableOptionSchema>;

export const ContentVariableSchema = z
    .object({
        // The unique ID of the variable
        id: z.string().regex(IDENTIFIER_REGEX),
        // The display name of the variable in the UI
        display_name: z.string(),
        default_value: z.string().regex(IDENTIFIER_REGEX),
        options: z.array(ContentVariableOptionSchema),
        syncs_with_user_attribute: z.string().regex(IDENTIFIER_REGEX).optional()
    })
    .strict();

export type ContentVariable = z.infer<typeof ContentVariableSchema>;

export const ContentVariablesSchema = z.record(ContentVariableSchema);
export type ContentVariables = z.infer<typeof ContentVariablesSchema>;

// YAML variable config schema -- validates the YAML
// configuration file that defines the content variables
export const YAMLVariableConfigSchema = z.record(
    ContentVariableSchema.omit({ id: true, default_value: true })
        .extend({
            options: z
                .array(
                    ContentVariableOptionSchema.extend({
                        display_name: z.union([z.number(), z.string()]),
                        default: z.boolean().optional(),
                        id: z.union([z.number(), z.string().regex(IDENTIFIER_REGEX)])
                    })
                )
                // verify that one and only one option is marked as default
                .refine((options) => {
                    const defaultOptions = options.filter((option) => option.default);
                    if (defaultOptions.length > 1) {
                        console.error('Only one option can be marked as default');
                        return false;
                    } else if (defaultOptions.length === 0) {
                        console.error('One option must be marked as default');
                        return false;
                    }
                    return true;
                })
        })
        .strict()
);

export type YAMLVariableConfig = z.infer<typeof YAMLVariableConfigSchema>;

export const ParamConfigSchema = z
    .object({
        name: z.string().regex(IDENTIFIER_REGEX),
        options_source: z.string().regex(IDENTIFIER_REGEX),
        default_value: z.string().regex(IDENTIFIER_REGEX).optional()
    })
    .strict();

export type ParamConfig = z.infer<typeof ParamConfigSchema>;

export const ParamsConfigSchema = z.array(ParamConfigSchema).refine((paramsConfig) => {
    // Param names must be unique
    const paramNames = paramsConfig.map((param) => param.name);
    const uniqueParamNames = new Set(paramNames);
    if (paramNames.length !== uniqueParamNames.size) {
        return false;
    }

    // Bracketed references must refer to a valid param name
    // that has been defined earlier in the list
    const definedParamNames = new Set();
    for (const param of paramsConfig) {
        definedParamNames.add(param.name);
        const bracketedPlaceholders = param.name.match(/\[([a-z0-9_]+)\]/g);
        if (bracketedPlaceholders) {
            for (const placeholder of bracketedPlaceholders) {
                const paramName = placeholder.slice(1, -1);
                if (!definedParamNames.has(paramName)) {
                    return false;
                }
            }
        }
    }

    return true;
});

export type ParamsConfig = z.infer<typeof ParamsConfigSchema>;

export const PageDataManifestSchema = z.object({
    resolvedUrl: z.string().url(),
    valuesByParamName: z.record(z.string()),
    selectionDisplayTextByParamName: z.record(z.string()),
    contentVariables: ContentVariablesSchema,
    paramToVarMapping: z.record(z.string())
});

export type PageDataManifest = z.infer<typeof PageDataManifestSchema>;
