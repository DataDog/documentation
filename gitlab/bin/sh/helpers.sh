tag_successful_pipeline() {
    start_step
    echo "---------"
    current_sha=$(git rev-parse HEAD)
    last_tag=$(git describe --tags --abbrev=0 --match="${CI_COMMIT_REF_NAME}*") || last_tag=0
    last_tag_commit=$(git rev-list -n 1 ${last_tag})
    # only tag new commits
    if [ ${current_sha} != ${last_tag_commit} ]; then
        new_tag="${last_tag#*${CI_COMMIT_REF_NAME}}"
        new_tag="${CI_COMMIT_REF_NAME}$((${new_tag}+1))"
        echo "Tagging ${current_sha} with ${new_tag}"
        post_data='{"ref": "refs/tags/'${new_tag}'", "sha": "'${current_sha}'"}'
        curl --header "Authorization: token $(get_secret 'github_token')" \
            --data "${post_data}" \
            https://api.github.com/repos/DataDog/documentation/git/refs
        notify_slack "All checks passed for ${CI_COMMIT_REF_NAME}. Branch has been tagged: ${new_tag}."
    fi
    pass_step  "${FUNCNAME}"
}

# post URL to preview site as status to Github
github_preview_status() {
    start_step

    echo "---------"
    echo "Posting preview URL to Github status" # https://www.netlifycms.org/blog/2019/02/deploy-preview-links

    post_data='{"state": "success", "description": "Deploy Preview Ready!", "context": "guacbot/preview", "target_url": "https://docs-staging.datadoghq.com/'${CI_COMMIT_REF_NAME}'"}'

    curl --header "Authorization: token $(get_secret 'github_token')" \
        --data "${post_data}" \
        https://api.github.com/repos/DataDog/documentation/statuses/${CI_COMMIT_SHA}

    pass_step  "${FUNCNAME}"
}

show_pipeline_slack() {
    # No-op if it's not a per-user feature branch
    if [[ ${CI_COMMIT_REF_NAME} == *"/"* ]]; then
      url="$CI_PIPELINE_URL"
      user="${CI_COMMIT_REF_NAME%%/*}"
      channel="@${user}"
      text="Your GitLab pipeline is now running for branch *${CI_COMMIT_REF_NAME}*. Follow along at ${url}"
      curl -X POST --data-urlencode "payload={\"text\": \"${text}\", \"channel\": \"${channel}\", \"link_names\": 1}" ${SLACK_URL}
    fi
}

check_missing_tms() {
    start_step

    ARTIFACT_NAME="${CI_COMMIT_SHORT_SHA}.tar.gz"
    tar -xzf "${ARTIFACT_NAME}"

    keywords=("Logging without Limits" "Traces without Limits" "Metrics without Limits" "Log Rehydration")

    #variable used to determine if step has passed or failed
    missing_tms=false

    IFS=$'\n'
    html_files=($(find "dist" -type f -name \*.html -not -path "**/meta/*"))

    #create temp directory for html files without tags and only body
    mkdir formatted_html

    echo "Formatting html for processing..."
    for file in "${html_files[@]}"
    do
        mkdir -p formatted_html/"$file" && touch formatted_html/"$file"/index.html
        #remove newlines so it is easier to process with sed
        tr '\n' ' ' < "$file" > formatted_html/"$file"/index.html
        #remove everything before <h1
        sed -i -e 's/^.*\(<body.*\).*/\1/' formatted_html/"$file"/index.html
        #add newlines after each closing script tag to avoid sed's greedy matching
        sed -i -e 's/<\/script>/&\n/g' formatted_html/"$file"/index.html
        #remove scripts
        sed -i -e 's/<script.*<\/script>//g' formatted_html/"$file"/index.html
        #remove rest of html tags
        sed -i -e 's/<[^>]*>//g' formatted_html/"$file"/index.html
    done

    echo "formatting finished, Checking for Trademarks..."

    for keyword in "${keywords[@]}"
    do
        echo "Checking for $keyword trademarks"
        #variables for the dd_event
        description="Missing ™ on \"${keyword}\" in the following files: "
        missing_files=""

        for file in "${html_files[@]}"
        do
            #get first occurrence target word and characters after
            target_word=$(grep -iEh -o -m1 "${keyword}.{0,7}" formatted_html/$file/index.html | head -1 || true)
            if [[ "${target_word}" != '' ]]; then
                #check three possible trademarks
                trademark_symbol="${target_word: -7:-6}"
                html_trademark_no_space="${target_word: -7:-1}"
                html_trademark_space="${target_word: -6}"
                #if last character is not TM, create a dd event description with the file names
                if [[ "${trademark_symbol}" == '™' ]] || [[ "${html_trademark_no_space}" == '&trade' ]] || [[ "${html_trademark_space}" == '&trade' ]]; then
                    echo "$file contains trademark! Moving on..."
                else
                    if [[ ${missing_files} == "" ]]; then
                        missing_files="${file}"
                    else
                        missing_files="${missing_files}, ${file}"
                    fi

                    #fail step if missing a tm
                    missing_tms=true
                fi
            fi
	    done

        #send dd_event if missing a tm for given keyword
        if [[ ${missing_files} != "" ]]; then
            description="${description}${missing_files}"
            dog --config "$HOME/.dogrc" event post "Missing ™ on ${keyword} for documentation deploy ${CI_COMMIT_REF_NAME}" "Build ${CI_PROJECT_URL}/pipelines/${CI_PIPELINE_ID} is ${description}" --alert_type "warning" --tags="${DEFAULT_TAGS}"
        fi
    done

    #remove temporary directory
    rm -rf formatted_html

    if [[ ${missing_tms} == true ]]; then
        echo "FAILED, check the docs4docs wiki on how to fix this"
        fail_step "${FUNCNAME}"
    else
        echo "PASSED!"
        pass_step "${FUNCNAME}"
    fi
}

pa11y_test() {
	start_step
    IFS=$'\n'
    numA11yIssues=($(node gitlab/bin/js/pa11y.js))
    # get last output from node pa11y script (num pa11y errors)
    echo "Num a11y issues: " ${numA11yIssues[0]}
    dog --config "$HOME/.dogrc" metric post "documentation.pa11y.num_errors" ${numA11yIssues[0]} --tags="${DEFAULT_TAGS},step_name:pa11y_test,step_status:success"
    aws s3 cp --content-type "text/csv; charset=utf-8" --acl "public-read" --cache-control "no-cache" ${CI_PROJECT_DIR}/pa11y-output.csv s3://origin-static-assets/pa11y-output-docs/
    pass_step  "${FUNCNAME}"
}
