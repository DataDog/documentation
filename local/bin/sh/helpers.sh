#!/usr/bin/env bash


version_static_assets() {
    # ============ compress assets ============ #
    start_step
    if [ -f "gulpfile.js" ]; then  # only compress assets if gulp is installed and configured
        echo "--------"
        test -d "node_modules" || (echo "cp missing node_modules from /etc/node_modules"; cp -r /etc/node_modules .)
        npm install  # make sure everything is uptodate
        if [[ "${BUCKET}" == *"preview"* ]]; then
            gulp build || fail_step "${FUNCNAME}"
        else
            gulp build --production || fail_step "${FUNCNAME}"
        fi
    fi
    pass_step  "${FUNCNAME}"
}


collect_static_assets() {
    # ARTIFACT_RESOURCE (required): folder name to package into an artifact
    # STATIC_BUCKET (required): url for s3 bucket to push artifacts to
    # ============ collect static assets now, we don't want them as part of the artifact ============ #
    start_step
    echo "---------"
    echo "Collecting static assets to s3://${STATIC_BUCKET}/documentation/ from ${ARTIFACT_RESOURCE}/"
    s3cmd sync --encoding=utf-8 --acl-public --guess-mime-type --no-mime-magic --recursive --verbose \
          --add-header="Cache-Control:public, max-age=31536000, immutable" \
          --exclude-from '/etc/long_cache.excludes'  --include-from '/etc/long_cache.includes' \
          "${ARTIFACT_RESOURCE}/" s3://${STATIC_BUCKET}/documentation/ || (echo "failed to collect static to s3://${STATIC_BUCKET}/documentation/" && fail_step "${FUNCNAME}")
    echo "Done collecting static."
    pass_step  "${FUNCNAME}"
}


remove_static_from_repo() {
    # ARTIFACT_RESOURCE (required): path to resource you want to artifact
    start_step
    echo "---------"
    echo "Removing static from repo."
    find "${ARTIFACT_RESOURCE}" -type d -name "images" -print | xargs rm -rf
    echo "Done removing static from repo."
    pass_step  "${FUNCNAME}"
}


create_artifact() {
    # ARTIFACT_RESOURCE (required): path to resource you want to artifact
    # STATIC_BUCKET (required): url for s3 bucket to push artifacts to
    # BRANCH (required)
    # ARTIFACT_NAME (optional): name of artifact
    start_step
    echo "---------"
    echo "Archiving build"
    if [ -n "${ARTIFACT_NAME}" ]; then
        short_hash="${ARTIFACT_NAME}"
    else
        short_hash="$(git rev-parse --short HEAD)"
    fi
    echo "artifact name is ${short_hash}"
    tar -czf "/tmp/${short_hash}.tar.gz" "${ARTIFACT_RESOURCE}" || (echo "artifact build failed. sorry." && fail_step "${FUNCNAME}")
    ls -l /tmp | grep "${short_hash}.tar.gz"
    echo "---------"
    echo "Deploying artifact: ${short_hash}.tar.gz to s3://"${STATIC_BUCKET}"/build_artifacts/documentation/${CI_COMMIT_REF_NAME}/"
    s3cmd put --encoding=utf-8 --acl-public --no-guess-mime-type --stop-on-error \
          "/tmp/${short_hash}.tar.gz" "s3://${STATIC_BUCKET}/build_artifacts/documentation/${CI_COMMIT_REF_NAME}/" || fail_step "${FUNCNAME}"
    echo "removing build"
    rm -rf "${ARTIFACT_RESOURCE}"
    echo "Done."
    pass_step  "${FUNCNAME}"
}


pull_artifact_from_s3() {
    # ARTIFACT_RESOURCE (required): path to resource you want to artifact
    # STATIC_BUCKET (required): url for s3 bucket to push artifacts to
    # BRANCH (required)
    start_step
    if [ -z "${ARTIFACT_NAME}" ]; then
        echo "artifact name not defined. using latest commit artifact."
        short_hash="$(git rev-parse --short HEAD)"
        ARTIFACT_NAME="${short_hash}.tar.gz"
    fi
    echo "artifact name is ${ARTIFACT_NAME}"
    echo "---------"
    s3cmd get s3://${STATIC_BUCKET}/build_artifacts/documentation/${CI_COMMIT_REF_NAME}/${ARTIFACT_NAME} || (echo "artifact missing from s3." && fail_step "${FUNCNAME}")
    echo "unpacking artifact"
    echo "---------"
    tar -xzf "${ARTIFACT_NAME}"  || (echo "artifact unpack failed. sorry." && fail_step "${FUNCNAME}")
    ls -l | grep "${ARTIFACT_RESOURCE}" || fail_step "${FUNCNAME}"
    pass_step  "${FUNCNAME}"
}


build_hugo_site() {
    # builds a static site from a hugo project
    # BUCKET
    # BRANCH
    # CONFIG
    # URL
    # ============ generate hugo config file ============ #
    start_step
    echo "building config for: ${CI_ENVIRONMENT_NAME}"
    if [[ "${CI_ENVIRONMENT_NAME}" == "preview" ]]; then
      printf "User-agent: *\nDisallow: /" >> "static/robots.txt"  # add a robots.txt to the preview site
    fi
    build_config.py -d "${URL}" -b "${CI_COMMIT_REF_NAME}" -p "${ARTIFACT_RESOURCE}" "config.yaml" "${CONFIG}" || fail_step "${FUNCNAME}";
    test -f "build.yaml" || (echo "missing build_config.yaml" && fail_step "${FUNCNAME}")

    # ============ build hugo. we exit on ERROR and WARN messages ============ #
    echo "---------"
    echo "Building hugo with build.yaml based on ${CONFIG}; referencing ${URL}"
    # fail hugo build on WARN or ERROR
    hugo version
    if hugo --config="build.yaml" --verbose 2>&1 | grep -E  "WARN|ERROR" | grep -v "No theme set" > /tmp/hugo.log; then
        echo "done."
    fi
    if [[ -s /tmp/hugo.log ]]; then
      cat /tmp/hugo.log
      echo "Please fix all warnings and errors and try again."
      fail_step "${FUNCNAME}"
    fi
    ls -l
    (test -f "${ARTIFACT_RESOURCE}/index.html" && echo "hugo built without issue.") || (echo "hugo build failed silent." && fail_step "${FUNCNAME}")

    # digest the site
    find "${ARTIFACT_RESOURCE}" -name '*.html' -type f -exec grep -vl 'http-equiv="refresh"' {} /dev/null \; | \
        sed -ne "s@${ARTIFACT_RESOURCE}@$(pwd)/${ARTIFACT_RESOURCE}@p" | \
        cat > ${ARTIFACT_RESOURCE}/digest.txt
    pass_step  "${FUNCNAME}"
}


minify_html() {
    # ============ minify html ============ #
    start_step
    files="$(cat ${ARTIFACT_RESOURCE}/digest.txt)"
    minify_html.py "${files}" || fail_step "${FUNCNAME}";
    pass_step  "${FUNCNAME}"
}


placehold_translations() {
	start_step
    placehold_translations.py -c "config.yaml" -f "content/" || fail_step "${FUNCNAME}";
	pass_step "${FUNCNAME}"
}


sync_integration_metrics() {
	integrations_sync.py --token ${GITHUB_TOKEN}
}

sync_integration_descriptions() {
    start_step
    update_pre_build.py --token ${GITHUB_TOKEN} || fail_step "${FUNCNAME}";
    pass_step  "${FUNCNAME}"
}

push_site_to_s3() {
    # $1: BUCKET
    # $2: BRANCH
    # caching: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html
    # short cache - we want html to have a short cache life-cycle because these files may be updated regularly and are
    # difficult to cache bust.
    # --delete-removed, syncs s3 with the current site of the application, this is how we unpublish
    # --acl-public, readable to everyone
    # --guess-mime-type, use file extension to set mime type
    # --no-mime-magic, disables python-magic mime guessing
    # short cache
    # --add-header, Cache-Control: https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
    #   public:           Indicates that the response MAY be cached by any cache, even if it would normally be non-cacheable
    #                     or cacheable only within a non- shared cache.
    #   must-revalidate:  If the response includes the "must-revalidate" cache-control
    #                     directive, the cache MAY use that response in replying to a
    #                     subsequent request. But if the response is stale, all caches
    #                     MUST first revalidate it with the origin server, using the
    #                     request-headers from the new request to allow the origin server
    #                     to authenticate the new request.
    #   proxy-revalidate: The proxy-revalidate directive has the same meaning as the must- revalidate directive,
    #                     except that it does not apply to non-shared user agent caches. It can be used on a response
    #                     to an authenticated request to permit the user's cache to store and later return the response
    #                     without needing to revalidate it (since it has already been authenticated once by that user),
    #                     while still requiring proxies that service many users to revalidate each time (in order to make
    #                     sure that each user has been authenticated). Note that such authenticated responses also need
    #                     the public cache control directive in order to allow them to be cached at all.
    #   max-age=0:        Forces each cache along the path to the origin server to revalidate its own entry, if any,
    #                     with the next cache or server.
    start_step
    echo "attempting to push to s3://${BUCKET}/$(set_site_destination ${CI_COMMIT_REF_NAME})..."
    # long cache - includes assets that need to be loaded first
    s3cmd sync --encoding=utf-8 --acl-public --guess-mime-type --no-mime-magic --recursive --verbose \
          --quiet --add-header="Cache-Control:public, max-age=31536000, immutable" \
          --exclude-from '/etc/long_cache.excludes'  --include-from '/etc/long_cache.includes' \
          "${ARTIFACT_RESOURCE}/" s3://${BUCKET}/$(set_site_destination "${BUCKET}" "${CI_COMMIT_REF_NAME}")
    # short cache
    s3cmd sync --encoding=utf-8 --delete-removed --acl-public --guess-mime-type --no-mime-magic --recursive \
          --quiet --add-header="Cache-Control:public, must-revalidate, proxy-revalidate, max-age=0" \
          --exclude-from '/etc/short_cache.excludes' --include-from '/etc/short_cache.includes' \
          "${ARTIFACT_RESOURCE}/" s3://${BUCKET}/$(set_site_destination "${BUCKET}" "${CI_COMMIT_REF_NAME}")
    echo "OK. site pushed to s3://${BUCKET}/$(set_site_destination ${CI_COMMIT_REF_NAME})"
    pass_step  "${FUNCNAME}"
}


test_site_links() {
    # TYPE
    # CHECK_ALL (or sample)
    # CHECK_EXTERNAL
    # VERBOSE

    start_step
    filters="$(cat ${ARTIFACT_RESOURCE}/digest.txt)"

    curr_dir=$(pwd)"/${ARTIFACT_RESOURCE}"

	# update links for the branch
    domain=${2}
    if [[ "${CI_ENVIRONMENT_NAME}" == "preview" ]]; then
        domain="${2}${CI_COMMIT_REF_NAME}/"
    fi

    check_links.py "${1}" -p 5 -f "${filters}" -d "${domain}" --check_all "${3}" \
    --verbose "${4}" --src_path "${curr_dir}" --external "${5}" --timeout 5 --ignore "/etc/links.ignore" || fail_step "${1} check failed."

    # update trello with broken external links
	if [[ "${CI_COMMIT_REF_NAME}" == "master" ]]; then
	    echo "updating trello"
	    source /etc/trello_config.sh
	    trello_add_update_card.py --board_id "${TRELLO_BOARD_ID}" --card_name "${card_name}" --card_text "${card_text}" \
	    --list_id "${TRELLO_LIST_ID}" --members "${members}"
	fi

    # update status
    if [[ $? != 0 ]]; then
        fail_step "${1} check failed."
    fi
    pass_step  "${FUNCNAME}"
}


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
        curl --header "Authorization: token ${GITHUB_TOKEN}" \
            --data "${post_data}" \
            https://api.github.com/repos/DataDog/${CI_PROJECT_NAME}/git/refs
        notify_slack "All checks passed for ${CI_COMMIT_REF_NAME}. Branch has been tagged: ${new_tag}." "#31b834"
    fi
    pass_step  "${FUNCNAME}"
}


rollback_env() {
    start_step
    # get last stable tag for environment
    echo "Attempting to rollback ${CI_COMMIT_REF_NAME} env to last stable commit"
    last_tag=$(git describe --tags --abbrev=0 --match="${CI_COMMIT_REF_NAME}*")
    export ARTIFACT_NAME="$(git rev-parse --short ${last_tag}).tar.gz"
    pull_artifact_from_s3
    push_site_to_s3
    notify_slack "Problem encountered :sadpanda: - Production rolled back to ${last_tag}" "#ab0000"
    pass_step  "${FUNCNAME}"
}


###### utils #####
start_step() {
    start_timer
}


pass_step() {
    stop_timer
    echo -e "\e[38;5;198mprocess finished in ${process_stop_time}s\e[0m"
    post_dd_metric "documentation.deploy_step.duration" ${process_stop_time} "${1}" "success"
}


fail_step() {
    # $1: step name
    stop_timer
    post_dd_metric "documentation.deploy_step.duration" ${process_stop_time} "${1}" "failure"
    notify_slack ":weary: \`${1}\` step failed for \`${CI_COMMIT_REF_NAME}\`.\n Details ${CI_PROJECT_URL}/pipelines/${CI_PIPELINE_ID}" "#ab0000"
    exit 1
}



start_timer() {
    export process_start_time=$(date +%s)
}


stop_timer() {
    export process_stop_time=$(($(date +%s) - ${process_start_time}))
}


post_dd_event() {
    # $1: title
    # $2: text
    # $3: success / failure
    dd_post_api.py "event" \
        --title "${1}" \
        --description ${2} \
        --result "${3}"
}

post_dd_metric() {
    # $1: metric name
    # $2: points
    # $3: step_name
    # $4: success / failure
    dd_post_api.py "metric" \
        --metric "${1}" \
        --points ${2} \
        --step_name "${3}" \
        --step_status "${4}"
}



notify_slack() {
    url="${LIVE_DOMAIN}"

    user=""
    channel="${SLACK_CHANNEL}"
    text="${1}"
    status="${2}"
    if [[ ${CI_ENVIRONMENT_NAME} == "preview" ]]; then
      url="${PREVIEW_DOMAIN}${CI_COMMIT_REF_NAME}/"
      user="${CI_COMMIT_REF_NAME%%/*}"
      channel="@${user}"
      text="${1}\nSite: ${url}"
    fi
	attachment="\"fallback\": \"${text}\",\"color\": \"${status}\",\"text\": \"${text}\""
    curl -X POST --data-urlencode "payload={\"attachments\": [{${attachment}}], \"channel\": \"${channel}\", \"link_names\": 1}" ${SLACK_URL}
}


set_site_destination() {
    # $1: bucket name
    # $2: branch name
    if [[ "${1}" == *"preview"* ]]; then
        printf "${2}/"
    fi
}


index_algolia() {
    start_step
    echo "---------"
    echo "Updating Algolia Docs Index"
    echo "---------"
    index_algolia.py --app_id ${ALGOLIA_APPLICATION_ID} --api_key ${ALGOLIA_API_KEY} || fail_step "${FUNCNAME}"
    echo "Done."
    pass_step  "${FUNCNAME}"
}
