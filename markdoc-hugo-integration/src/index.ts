export class MarkdocToHtmlCompiler {
    constructor(p: {
        pagePreferenceOptionsConfigDir: string;
        sitePreferenceConfigFile: string;
        contentDirectory: string;
    }) {
        // ingest site preference config from file
        // validate site preference config
        // ingest page preference options from provided directory
        // validate page preference options config
        // register mdoc partials
        // register mdoc files
    }

    compile() {
        // compile all mdoc files to a corresponding HTML file
    }

    watch() {
        // watch for changes in mdoc files and recompile
    }
}
