# Advanced Setup

See the README.md file for more information about how to run the Docker development environment.

To setup a local development environment:

## Install Ruby

Install Rbenv and Ruby 2.3.0:

```
brew install rbenv # or equivalent on linux (if you don't know about brew, go to http://brew.sh)
rbenv install 2.3.0

# From within the documentation directory, set the ruby version:
rbenv local 2.3.0
```

To configure this Ruby to take precedence over the system Ruby, add the following to your `~/.bash_profile` (or similar file for your shell):

```
eval "$(rbenv init -)"
```

Open a new shell or `source` your `~/.bash_profile` to ensure Rbenv is working.

## Install Bundler and gems

Once you have Rbenv and the correct version of Ruby running, install bundler:

```
gem install bundler
```

One dependency of the project - the `therubyracer` gem - requires a specific of the V8 Javascript engine. Install the correct V8 first and then install version `0.12.2` of `therubyracer`:

```
brew tap homebrew/versions
brew install v8-315
brew link --force v8-315
gem install libv8 -- --with-system-v8
gem install therubyracer -v '0.12.2'
```

Then, from the root of the project repo, install all the gems:

```
rbenv exec bundle install
```

## OpenSSL

As of OS X 10.11 (El Capitan), OpenSSL headers are no longer provided. You will need to install OpenSSL prior to running the bundle install.

```
brew install openssl
brew link openssl --force
```

If you are running OS X 10.12 (Sierra), linking OpenSSL as detailed above will throw a warning and the bundle install will fail. To link the OpenSSL headers, run the following after setting the rbenv local version and prior to running the bundle install.

```
brew install openssl
rbenv exec bundle config --local build.eventmachine --with-opt-dir=/usr/local/opt/openssl
```

## Github personal token

Integrations that have metrics will require your Github Personal Token. For more information on generating a token, see [Github's documentation](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). After you've generated a token, add the following line to the `.bash_profile` in your home directory:

```
export github_personal_token=[paste access token here]
```

You should then run `source ~/.bash_profile` to reload the settings.

# Working on Docs

Once your environment is setup, simply run `rake clean && rake` to clean and compile the documentation. The `rake` task should start a Guard process to automatically detect file changes and serve the documentation site locally at http://localhost:3000.
