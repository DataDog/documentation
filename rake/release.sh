cd ../datadog.github.com
git fetch
git reset --hard origin/master
git rm -rf *
cd -
cp -r output/* ../datadog.github.com/
cd -
git add .
git commit -m "release"
git push
