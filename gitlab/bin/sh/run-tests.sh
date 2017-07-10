#!/usr/bin/env sh

ARTIFACT_NAME=${ARTIFACT_NAME:="public"}
URL=${URL:="http://localhost:1313/"}

i=0
while [[ ! $(curl -sI localhost:1313 | tac | head -n 1 | cut -d$' ' -f2)  ]]
do
	printf "\e[9${i}m.\033[0m" && sleep 1
	if [ $i == 6 ]; then
		i=1
	else
		i=$((${i} + 1))
	fi
done

echo "READY!"

find ${ARTIFACT_NAME} -name '*.html' -type f -exec grep -vl 'http-equiv="refresh"' {} /dev/null \; | \
        sed -ne "s@${ARTIFACT_NAME}@.$(pwd)/${ARTIFACT_NAME}@p" | \
        cat > ${ARTIFACT_NAME}/digest.txt

echo "checking images"
check_links.py "images" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" \
		--check_all "True" --verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5 || exit 1

echo "checking static asset links"
check_links.py "static" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" \
		--check_all "True" --verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5 || exit 1

echo "checking internal and external page links"
check_links.py "links" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" \
		--check_all "True" --verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5 || exit 1
